import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check, X, Lightbulb, Volume2, EyeOff, Sparkles, Trophy, Sword } from 'lucide-react';
import { useGameState } from '@/hooks/useGameState';
import { 
  additionQuestions, 
  subtractionQuestions, 
  multiplicationQuestions, 
  divisionQuestions,
  wordProblemQuestions,
  measurementQuestions,
  geometryQuestions,
  dataQuestions,
  patternQuestions,
  moneyQuestions,
  fractionQuestions,
  getRandomQuestions,
  getSurpriseMixQuestions,
  getSpellingWords,
  grammarQuestions,
  punctuationQuestions,
  readingPassages,
} from '@/data/questions';
import type { ActivityType, MathQuestion, EnglishQuestion, SpellingWord } from '@/types';

interface ActivityScreenProps {
  activityType: ActivityType;
  onBack: () => void;
  onComplete: (xpEarned: number) => void;
}

type QuestionType = MathQuestion | EnglishQuestion;

export function ActivityScreen({ activityType, onBack, onComplete }: ActivityScreenProps) {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [showResult, setShowResult] = useState<'correct' | 'incorrect' | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);
  const [coinsEarned, setCoinsEarned] = useState({ gold: 0, stars: 0 });
  const [streak, setStreak] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const { addXp, addCoins, updateSkillProgress } = useGameState();

  // Initialize questions based on activity type
  useEffect(() => {
    let loadedQuestions: QuestionType[] = [];
    
    switch (activityType) {
      case 'math-addition':
        loadedQuestions = getRandomQuestions(additionQuestions, 10);
        break;
      case 'math-subtraction':
        loadedQuestions = getRandomQuestions(subtractionQuestions, 10);
        break;
      case 'math-multiplication':
        loadedQuestions = getRandomQuestions(multiplicationQuestions, 10);
        break;
      case 'math-division':
        loadedQuestions = getRandomQuestions(divisionQuestions, 10);
        break;
      case 'math-wordProblems':
        loadedQuestions = getRandomQuestions(wordProblemQuestions, 8);
        break;
      case 'math-measurement':
        loadedQuestions = getRandomQuestions(measurementQuestions, 10);
        break;
      case 'math-geometry':
        loadedQuestions = getRandomQuestions(geometryQuestions, 10);
        break;
      case 'math-data':
        loadedQuestions = getRandomQuestions(dataQuestions, 8);
        break;
      case 'math-patterns':
        loadedQuestions = getRandomQuestions(patternQuestions, 10);
        break;
      case 'math-money':
        loadedQuestions = getRandomQuestions(moneyQuestions, 8);
        break;
      case 'math-fractions':
        loadedQuestions = getRandomQuestions(fractionQuestions, 8);
        break;
      case 'surprise-mix':
        loadedQuestions = getSurpriseMixQuestions(10);
        break;
      case 'english-grammar':
        loadedQuestions = getRandomQuestions(grammarQuestions, 10);
        break;
      case 'english-punctuation':
        loadedQuestions = getRandomQuestions(punctuationQuestions, 10);
        break;
      case 'english-reading':
        loadedQuestions = getRandomQuestions(readingPassages, 1);
        break;
      default:
        loadedQuestions = getRandomQuestions(additionQuestions, 5);
    }
    
    setQuestions(loadedQuestions);
  }, [activityType]);

  const currentQuestion = questions[currentIndex];

  const handleCheckAnswer = useCallback(() => {
    if (!currentQuestion || !answer.trim()) return;

    const userAnswer = answer.trim().toLowerCase().replace(/\s/g, '');
    const correctAnswer = String(currentQuestion.correctAnswer).toLowerCase().replace(/\s/g, '');
    
    const isCorrect = userAnswer === correctAnswer;
    
    setShowResult(isCorrect ? 'correct' : 'incorrect');
    
    if (isCorrect) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      
      const baseXp = currentQuestion.xpReward;
      const streakBonus = newStreak >= 3 ? Math.floor(baseXp * 0.2) : 0;
      const totalXp = baseXp + streakBonus;
      
      setXpEarned(prev => prev + totalXp);
      
      // Add coins based on activity type
      if (activityType.startsWith('math')) {
        setCoinsEarned(prev => ({ ...prev, gold: prev.gold + 5 }));
      } else {
        setCoinsEarned(prev => ({ ...prev, stars: prev.stars + 5 }));
      }
      
      // Update skill progress
      const skillMap: Record<string, string> = {
        'math-addition': 'math.addition',
        'math-subtraction': 'math.subtraction',
        'math-multiplication': 'math.multiplication',
        'math-division': 'math.division',
        'math-wordProblems': 'math.wordProblems',
        'english-grammar': 'english.grammar',
        'english-punctuation': 'english.punctuation'
      };
      
      const skill = skillMap[activityType];
      if (skill) {
        updateSkillProgress(skill, true, totalXp);
      }
      
      addXp(totalXp, activityType.startsWith('math') ? 'math' : 'english');
    } else {
      setStreak(0);
    }
  }, [answer, currentQuestion, streak, activityType, addXp, updateSkillProgress]);

  const handleNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setAnswer('');
      setShowResult(null);
      setShowHint(false);
    } else {
      setIsComplete(true);
      addCoins(coinsEarned.gold, coinsEarned.stars);
      onComplete(xpEarned);
    }
  }, [currentIndex, questions.length, coinsEarned, xpEarned, addCoins, onComplete]);

  const handleRetry = useCallback(() => {
    setAnswer('');
    setShowResult(null);
    setShowHint(false);
  }, []);

  // Render different activity types
  if (activityType === 'english-spelling') {
    return <SpellingActivity onBack={onBack} onComplete={onComplete} />;
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
        }}
      >
        <div className="text-center">
          <motion.div 
            className="text-4xl mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            ✨
          </motion.div>
          <p className="text-white/60">Summoning your challenge...</p>
        </div>
      </div>
    );
  }

  if (isComplete) {
    return (
      <CompletionScreen 
        xpEarned={xpEarned}
        coinsEarned={coinsEarned}
        onBack={onBack}
      />
    );
  }

  return (
    <div 
      className="min-h-screen p-4 md:p-6"
      style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
      }}
    >
      {/* Header */}
      <header className="max-w-3xl mx-auto mb-6">
        <div className="flex items-center gap-4">
          <motion.button
            onClick={onBack}
            className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-6 h-6" />
          </motion.button>
          
          <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-white/60">
                Challenge {currentIndex + 1} of {questions.length}
              </span>
              {streak > 0 && (
                <span className="text-sm text-orange-400 font-medium flex items-center gap-1">
                  <Sword className="w-4 h-4" /> {streak} streak!
                </span>
              )}
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                initial={{ width: 0 }}
                animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Question Card */}
      <main className="max-w-3xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 md:p-8"
          >
            {/* Question */}
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-white leading-relaxed"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                {currentQuestion.question}
              </h2>
              
              {/* Visual hint for word problems */}
              {currentQuestion.type === 'wordProblem' && (
                <div className="mt-4 p-4 bg-purple-500/20 rounded-xl border border-purple-500/30">
                  <p className="text-sm text-purple-200">
                    <span className="font-bold">💡 Tip:</span> Read carefully and identify what operation you need!
                  </p>
                </div>
              )}
            </div>

            {/* Hint */}
            {showHint && currentQuestion.hint && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mb-6 p-4 bg-yellow-500/20 rounded-xl border border-yellow-500/30 flex items-start gap-3"
              >
                <Lightbulb className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-yellow-100">{currentQuestion.hint}</p>
              </motion.div>
            )}

            {/* Answer Input */}
            <div className="mb-6">
              {currentQuestion.options ? (
                // Multiple choice
                <div className="grid grid-cols-2 gap-3">
                  {currentQuestion.options.map((option, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => setAnswer(option)}
                      disabled={showResult !== null}
                      whileHover={{ scale: showResult ? 1 : 1.02 }}
                      whileTap={{ scale: showResult ? 1 : 0.98 }}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        answer === option
                          ? 'border-purple-500 bg-purple-500/20 text-white'
                          : 'border-white/20 hover:border-purple-500/50 text-white'
                      } ${showResult !== null ? 'opacity-70' : ''}`}
                    >
                      {option}
                    </motion.button>
                  ))}
                </div>
              ) : (
                // Free text input
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !showResult && handleCheckAnswer()}
                  placeholder="Type your answer..."
                  disabled={showResult !== null}
                  className="w-full text-2xl text-center font-bold bg-white/10 border-2 border-white/20 rounded-xl px-6 py-4 text-white placeholder:text-white/40 focus:border-purple-500 focus:outline-none transition-colors"
                  autoFocus
                />
              )}
            </div>

            {/* Result Feedback */}
            <AnimatePresence>
              {showResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`mb-6 p-4 rounded-xl border flex items-center gap-3 ${
                    showResult === 'correct' 
                      ? 'bg-green-500/20 border-green-500/30' 
                      : 'bg-red-500/20 border-red-500/30'
                  }`}
                >
                  {showResult === 'correct' ? (
                    <>
                      <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                        <Check className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-green-400">Correct! ✨</p>
                        <p className="text-sm text-white/60">+{currentQuestion.xpReward} XP</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center">
                        <X className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-red-400">Not quite right</p>
                        <p className="text-sm text-white/60">
                          The answer was: {currentQuestion.correctAnswer}
                        </p>
                      </div>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action Buttons */}
            <div className="flex gap-3">
              {!showResult ? (
                <>
                  {currentQuestion.hint && (
                    <motion.button
                      onClick={() => setShowHint(!showHint)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-3 rounded-xl border-2 border-yellow-500/50 text-yellow-400 font-medium hover:bg-yellow-500/10 transition-colors"
                    >
                      <Lightbulb className="w-5 h-5" />
                    </motion.button>
                  )}
                  <motion.button
                    onClick={handleCheckAnswer}
                    disabled={!answer.trim()}
                    whileHover={{ scale: answer.trim() ? 1.02 : 1 }}
                    whileTap={{ scale: answer.trim() ? 0.98 : 1 }}
                    className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all"
                  >
                    Cast Answer
                  </motion.button>
                </>
              ) : (
                <>
                  {showResult === 'incorrect' && (
                    <motion.button
                      onClick={handleRetry}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-3 rounded-xl border-2 border-orange-500/50 text-orange-400 font-medium hover:bg-orange-500/10 transition-colors"
                    >
                      Try Again
                    </motion.button>
                  )}
                  <motion.button
                    onClick={handleNext}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold rounded-xl transition-all"
                  >
                    {currentIndex < questions.length - 1 ? 'Next Challenge →' : 'Complete Quest! 🏆'}
                  </motion.button>
                </>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

// Spelling Activity Component
function SpellingActivity({ onBack, onComplete }: { onBack: () => void; onComplete: (xp: number) => void }) {
  const [words, setWords] = useState<SpellingWord[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [step, setStep] = useState<'look' | 'say' | 'cover' | 'write' | 'check'>('look');
  const [answer, setAnswer] = useState('');
  const [results, setResults] = useState<boolean[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const { addXp, addCoins, updateSkillProgress } = useGameState();

  useEffect(() => {
    setWords(getSpellingWords(10));
  }, []);

  const currentWord = words[currentIndex];

  const handleNextStep = () => {
    const steps: ('look' | 'say' | 'cover' | 'write' | 'check')[] = ['look', 'say', 'cover', 'write', 'check'];
    const currentStepIndex = steps.indexOf(step);
    
    if (step === 'write') {
      // Check the answer
      const isCorrect = answer.toLowerCase().trim() === currentWord?.word.toLowerCase();
      setResults([...results, isCorrect]);
      
      if (isCorrect) {
        addXp(15, 'english');
        updateSkillProgress('english.spelling', true, 15);
      }
    }
    
    if (currentStepIndex < steps.length - 1) {
      setStep(steps[currentStepIndex + 1]);
    } else {
      // Move to next word or finish
      if (currentIndex < words.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setStep('look');
        setAnswer('');
      } else {
        setIsComplete(true);
        const correctCount = results.filter(r => r).length;
        const totalXp = correctCount * 15;
        addXp(totalXp, 'english');
        addCoins(0, correctCount * 5);
        onComplete(totalXp);
      }
    }
  };

  if (words.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
        }}
      >
        <p className="text-white/60">Summoning words...</p>
      </div>
    );
  }

  if (isComplete) {
    const correctCount = results.filter(r => r).length;
    return (
      <CompletionScreen 
        xpEarned={correctCount * 15}
        coinsEarned={{ stars: correctCount * 5 }}
        onBack={onBack}
      />
    );
  }

  return (
    <div 
      className="min-h-screen p-4 md:p-6"
      style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
      }}
    >
      {/* Header */}
      <header className="max-w-2xl mx-auto mb-6">
        <div className="flex items-center gap-4">
          <motion.button
            onClick={onBack}
            className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-6 h-6" />
          </motion.button>
          
          <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/10">
            <span className="text-sm text-white/60">Rune {currentIndex + 1} of {words.length}</span>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden mt-1">
              <motion.div 
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                initial={{ width: 0 }}
                animate={{ width: `${((currentIndex + 1) / words.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Step Indicator */}
      <div className="max-w-2xl mx-auto mb-6">
        <div className="flex justify-center gap-2">
          {['Look', 'Say', 'Cover', 'Write', 'Check'].map((s, i) => {
            const stepNames = ['look', 'say', 'cover', 'write', 'check'];
            const isActive = step === stepNames[i];
            const isPast = stepNames.indexOf(step) > i;
            return (
              <motion.div 
                key={s}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  isActive ? 'bg-cyan-500 text-white' : 
                  isPast ? 'bg-cyan-500/30 text-cyan-300' : 'bg-white/10 text-white/40'
                }`}
              >
                {s}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Main Card */}
      <main className="max-w-2xl mx-auto">
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-8 text-center">
          {step === 'look' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-white/60 mb-6">Study this ancient rune carefully:</p>
              <div className="text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                {currentWord.word}
              </div>
              <p className="text-lg text-cyan-400 mb-2">{currentWord.phonetic}</p>
              <p className="text-white/60 italic">"{currentWord.sentence}"</p>
            </motion.div>
          )}

          {step === 'say' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-white/60 mb-6">Speak the rune aloud:</p>
              <div className="text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                {currentWord.word}
              </div>
              <motion.button 
                onClick={() => {
                  const utterance = new SpeechSynthesisUtterance(currentWord.word);
                  utterance.rate = 0.8;
                  speechSynthesis.speak(utterance);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-cyan-500/20 hover:bg-cyan-500/30 rounded-xl text-cyan-400 font-medium flex items-center gap-2 mx-auto border border-cyan-500/30"
              >
                <Volume2 className="w-5 h-5" />
                Hear the incantation
              </motion.button>
            </motion.div>
          )}

          {step === 'cover' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-white/60 mb-6">The rune is now hidden. Prepare to inscribe it!</p>
              <div className="w-32 h-20 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 border border-purple-500/30">
                <EyeOff className="w-10 h-10 text-purple-400" />
              </div>
              <p className="text-sm text-white/40">Remember: {currentWord.phonetic}</p>
            </motion.div>
          )}

          {step === 'write' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-white/60 mb-6">Inscribe the rune:</p>
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type here..."
                className="w-full text-3xl text-center font-bold bg-white/10 border-2 border-white/20 rounded-xl px-6 py-4 text-white placeholder:text-white/40 focus:border-cyan-500 focus:outline-none transition-colors"
                autoFocus
              />
            </motion.div>
          )}

          {step === 'check' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {answer.toLowerCase().trim() === currentWord.word.toLowerCase() ? (
                <div className="text-center">
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-10 h-10 text-white" />
                  </div>
                  <p className="text-2xl font-bold text-green-400 mb-2">Perfect! ✨</p>
                  <p className="text-white/60">+15 XP</p>
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <X className="w-10 h-10 text-white" />
                  </div>
                  <p className="text-xl font-bold text-red-400 mb-2">The rune was imperfect</p>
                  <p className="text-white/60 mb-2">The correct rune was:</p>
                  <p className="text-3xl font-bold text-white" style={{ fontFamily: 'Georgia, serif' }}>{currentWord.word}</p>
                  <p className="text-sm text-white/40 mt-2">You inscribed: {answer}</p>
                </div>
              )}
            </motion.div>
          )}

          <motion.button
            onClick={handleNextStep}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-8 w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold rounded-xl transition-all"
          >
            {step === 'check' ? 'Next Rune →' : 'Continue →'}
          </motion.button>
        </div>
      </main>
    </div>
  );
}

function CompletionScreen({ 
  xpEarned, 
  coinsEarned, 
  onBack 
}: { 
  xpEarned: number; 
  coinsEarned: { gold?: number; stars?: number }; 
  onBack: () => void;
}) {
  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
      }}
    >
      <motion.div 
        className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-8 md:p-12 text-center max-w-md w-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <motion.div
          className="text-6xl mb-6"
          animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
          transition={{ repeat: 2, duration: 0.5 }}
        >
          🏆
        </motion.div>
        
        <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Georgia, serif' }}>
          Quest Complete!
        </h2>
        
        <p className="text-white/60 mb-8">Your knowledge grows stronger!</p>
        
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-purple-500/20 rounded-xl p-4 border border-purple-500/30">
            <Sparkles className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">+{xpEarned}</p>
            <p className="text-sm text-white/60">XP Earned</p>
          </div>
          
          <div className="bg-yellow-500/20 rounded-xl p-4 border border-yellow-500/30">
            <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">+{coinsEarned.gold || coinsEarned.stars || 0}</p>
            <p className="text-sm text-white/60">{coinsEarned.gold ? 'Gold' : 'Stars'}</p>
          </div>
        </div>
        
        <motion.button 
          onClick={onBack} 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold rounded-xl transition-all"
        >
          Return to Academy
        </motion.button>
      </motion.div>
    </div>
  );
}