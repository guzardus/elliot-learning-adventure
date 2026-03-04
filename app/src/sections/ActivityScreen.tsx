import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check, X, Lightbulb, Star, Volume2, EyeOff } from 'lucide-react';
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-warm-gray">Loading your adventure...</p>
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
        backgroundImage: 'url(/images/watercolour-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Header */}
      <header className="max-w-3xl mx-auto mb-6">
        <div className="flex items-center gap-4">
          <motion.button
            onClick={onBack}
            className="p-3 rounded-full bg-white/90 shadow-md hover:shadow-lg transition-shadow backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-6 h-6 text-charcoal" />
          </motion.button>
          
          <div className="flex-1 bg-white/80 backdrop-blur-sm rounded-xl px-4 py-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-warm-gray">
                Question {currentIndex + 1} of {questions.length}
              </span>
              {streak > 0 && (
                <span className="text-sm text-orange-500 font-medium flex items-center gap-1">
                  <span>🔥</span> {streak} streak!
                </span>
              )}
            </div>
            <div className="progress-bar h-2">
              <motion.div 
                className="progress-fill h-2"
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
            className="watercolour-card p-6 md:p-8"
          >
            {/* Question */}
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-charcoal leading-relaxed">
                {currentQuestion.question}
              </h2>
              
              {/* Visual hint for word problems */}
              {currentQuestion.type === 'wordProblem' && (
                <div className="mt-4 p-4 bg-soft-pink/30 rounded-xl">
                  <p className="text-sm text-warm-gray">
                    💡 <span className="font-medium">Tip:</span> Read carefully and identify what operation you need!
                  </p>
                </div>
              )}
            </div>

            {/* Hint */}
            {showHint && currentQuestion.hint && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mb-6 p-4 bg-warm-yellow/30 rounded-xl flex items-start gap-3"
              >
                <Lightbulb className="w-5 h-5 text-warm-yellow flex-shrink-0 mt-0.5" />
                <p className="text-sm text-charcoal">{currentQuestion.hint}</p>
              </motion.div>
            )}

            {/* Answer Input */}
            <div className="mb-6">
              {currentQuestion.options ? (
                // Multiple choice
                <div className="grid grid-cols-2 gap-3">
                  {currentQuestion.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => setAnswer(option)}
                      disabled={showResult !== null}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        answer === option
                          ? 'border-soft-coral bg-soft-coral/10'
                          : 'border-gray-200 hover:border-soft-coral/50'
                      } ${showResult !== null ? 'opacity-70' : ''}`}
                    >
                      {option}
                    </button>
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
                  className="w-full text-2xl text-center font-bold"
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
                  className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${
                    showResult === 'correct' ? 'bg-sage-green/20' : 'bg-red-100'
                  }`}
                >
                  {showResult === 'correct' ? (
                    <>
                      <div className="w-10 h-10 rounded-full bg-sage-green flex items-center justify-center">
                        <Check className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-sage-green">Correct! 🎉</p>
                        <p className="text-sm text-charcoal">+{currentQuestion.xpReward} XP</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center">
                        <X className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-red-600">Not quite right</p>
                        <p className="text-sm text-charcoal">
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
                    <button
                      onClick={() => setShowHint(!showHint)}
                      className="px-4 py-3 rounded-xl border-2 border-warm-yellow text-warm-yellow font-medium hover:bg-warm-yellow/10 transition-colors"
                    >
                      <Lightbulb className="w-5 h-5" />
                    </button>
                  )}
                  <button
                    onClick={handleCheckAnswer}
                    disabled={!answer.trim()}
                    className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Check Answer
                  </button>
                </>
              ) : (
                <>
                  {showResult === 'incorrect' && (
                    <button
                      onClick={handleRetry}
                      className="px-6 py-3 rounded-xl border-2 border-soft-coral text-soft-coral font-medium hover:bg-soft-coral/10 transition-colors"
                    >
                      Try Again
                    </button>
                  )}
                  <button
                    onClick={handleNext}
                    className="flex-1 btn-secondary"
                  >
                    {currentIndex < questions.length - 1 ? 'Next Question →' : 'Finish! 🎉'}
                  </button>
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
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-warm-gray">Loading words...</p>
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
        backgroundImage: 'url(/images/spelling-spring.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Header */}
      <header className="max-w-2xl mx-auto mb-6">
        <div className="flex items-center gap-4">
          <motion.button
            onClick={onBack}
            className="p-3 rounded-full bg-white/90 shadow-md backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-6 h-6 text-charcoal" />
          </motion.button>
          <div className="flex-1 bg-white/80 backdrop-blur-sm rounded-xl px-4 py-2">
            <span className="text-sm text-warm-gray">Word {currentIndex + 1} of {words.length}</span>
            <div className="progress-bar h-2 mt-1">
              <div 
                className="progress-fill h-2"
                style={{ width: `${((currentIndex + 1) / words.length) * 100}%` }}
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
              <div 
                key={s}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  isActive ? 'bg-sage-green text-white' : 
                  isPast ? 'bg-sage-green/30 text-sage-green' : 'bg-gray-200 text-gray-500'
                }`}
              >
                {s}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Card */}
      <main className="max-w-2xl mx-auto">
        <div className="watercolour-card p-8 text-center">
          {step === 'look' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-warm-gray mb-6">Look at this word carefully:</p>
              <div className="text-5xl font-bold text-charcoal mb-4">{currentWord.word}</div>
              <p className="text-lg text-soft-coral mb-2">{currentWord.phonetic}</p>
              <p className="text-warm-gray italic">"{currentWord.sentence}"</p>
            </motion.div>
          )}

          {step === 'say' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-warm-gray mb-6">Say the word out loud:</p>
              <div className="text-4xl font-bold text-charcoal mb-4">{currentWord.word}</div>
              <button 
                onClick={() => {
                  const utterance = new SpeechSynthesisUtterance(currentWord.word);
                  utterance.rate = 0.8;
                  speechSynthesis.speak(utterance);
                }}
                className="px-6 py-3 bg-sky-blue/30 rounded-xl text-sky-blue font-medium flex items-center gap-2 mx-auto"
              >
                <Volume2 className="w-5 h-5" />
                Hear it again
              </button>
            </motion.div>
          )}

          {step === 'cover' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-warm-gray mb-6">The word is now hidden. Get ready to spell it!</p>
              <div className="w-32 h-20 bg-sage-green/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <EyeOff className="w-10 h-10 text-sage-green" />
              </div>
              <p className="text-sm text-warm-gray">Remember: {currentWord.phonetic}</p>
            </motion.div>
          )}

          {step === 'write' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-warm-gray mb-6">Type the word:</p>
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type here..."
                className="text-3xl text-center"
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
                  <div className="w-20 h-20 bg-sage-green rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-10 h-10 text-white" />
                  </div>
                  <p className="text-2xl font-bold text-sage-green mb-2">Correct! 🎉</p>
                  <p className="text-warm-gray">+15 XP</p>
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-20 h-20 bg-soft-coral rounded-full flex items-center justify-center mx-auto mb-4">
                    <X className="w-10 h-10 text-white" />
                  </div>
                  <p className="text-xl font-bold text-soft-coral mb-2">Not quite right</p>
                  <p className="text-warm-gray mb-2">The word was:</p>
                  <p className="text-3xl font-bold text-charcoal">{currentWord.word}</p>
                  <p className="text-sm text-warm-gray mt-2">You wrote: {answer}</p>
                </div>
              )}
            </motion.div>
          )}

          <button
            onClick={handleNextStep}
            className="mt-8 btn-primary w-full"
          >
            {step === 'check' ? 'Next Word →' : 'Continue →'}
          </button>
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
        backgroundImage: 'url(/images/celebration.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <motion.div 
        className="watercolour-card p-8 md:p-12 text-center max-w-md w-full bg-white/95 backdrop-blur-sm"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <motion.div
          className="text-6xl mb-6"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: 2, duration: 0.5 }}
        >
          🎉
        </motion.div>
        
        <h2 className="text-3xl font-bold text-charcoal mb-2">Quest Complete!</h2>
        <p className="text-warm-gray mb-8">Amazing work, adventurer!</p>
        
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-warm-yellow/20 rounded-xl p-4">
            <Star className="w-8 h-8 text-warm-yellow mx-auto mb-2" />
            <p className="text-2xl font-bold text-charcoal">+{xpEarned}</p>
            <p className="text-sm text-warm-gray">XP Earned</p>
          </div>
          <div className="bg-soft-coral/20 rounded-xl p-4">
            <span className="text-3xl">💰</span>
            <p className="text-2xl font-bold text-charcoal mt-1">
              +{coinsEarned.gold || 0}
            </p>
            <p className="text-sm text-warm-gray">Coins</p>
          </div>
        </div>
        
        <button onClick={onBack} className="btn-primary w-full">
          Back to Dashboard
        </button>
      </motion.div>
    </div>
  );
}
