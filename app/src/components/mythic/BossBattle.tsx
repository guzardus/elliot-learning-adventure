import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Swords, Heart, Zap, Trophy, Skull } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGameState } from '@/hooks/useGameState';
import { 
  getRandomQuestions, 
  additionQuestions, 
  subtractionQuestions,
  multiplicationQuestions,
  divisionQuestions,
  wordProblemQuestions,
  grammarQuestions,
  punctuationQuestions
} from '@/data/questions';
import type { MathQuestion, EnglishQuestion } from '@/types';

interface BossBattleProps {
  isOpen: boolean;
  onClose: () => void;
  bossId: string;
}

const BOSS_QUESTIONS = 15;
const DAMAGE_PER_CORRECT = 7; // 15 questions * 7 damage = 105 total (enough to defeat 100 HP boss)

const bosses = [
  {
    id: 'weekly-boss',
    name: 'The Math Dragon',
    description: 'A fearsome beast that guards ancient mathematical secrets!',
    icon: '🐉',
    color: 'from-red-500 to-orange-500',
    subject: 'math' as const
  },
  {
    id: 'weekly-boss-2',
    name: 'The Grammar Golem',
    description: 'A stone creature that challenges your language mastery!',
    icon: '🗿',
    color: 'from-blue-500 to-cyan-500',
    subject: 'english' as const
  }
];

export function BossBattle({ isOpen, onClose, bossId }: BossBattleProps) {
  const { state, damageBoss, defeatBoss, addXp } = useGameState();
  const [questions, setQuestions] = useState<(MathQuestion | EnglishQuestion)[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [showResult, setShowResult] = useState<'correct' | 'incorrect' | null>(null);
  const [bossHealth, setBossHealth] = useState(100);
  const [isComplete, setIsComplete] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [damageDealt, setDamageDealt] = useState(0);
  const [earnedLoot, setEarnedLoot] = useState(false);

  const boss = bosses.find(b => b.id === bossId) || bosses[0];
  const currentQuestion = questions[currentIndex];
  const weeklyBossHealth = state.weekly.bossHealthRemaining;

  // Initialize boss battle questions
  useEffect(() => {
    if (isOpen && !isComplete) {
      // Mix of harder questions
      const mathQs = getRandomQuestions([
        ...additionQuestions.filter(q => q.difficulty !== 'easy'),
        ...subtractionQuestions.filter(q => q.difficulty !== 'easy'),
        ...multiplicationQuestions,
        ...divisionQuestions,
        ...wordProblemQuestions
      ], Math.floor(BOSS_QUESTIONS / 2));
      
      const englishQs = getRandomQuestions([
        ...grammarQuestions.filter(q => q.difficulty !== 'easy'),
        ...punctuationQuestions.filter(q => q.difficulty !== 'easy')
      ], Math.ceil(BOSS_QUESTIONS / 2));
      
      setQuestions([...mathQs, ...englishQs].sort(() => Math.random() - 0.5));
      setBossHealth(weeklyBossHealth);
    }
  }, [isOpen, isComplete, weeklyBossHealth]);

  const handleCheckAnswer = () => {
    if (!currentQuestion || !answer.trim()) return;

    const userAnswer = answer.trim().toLowerCase().replace(/\s/g, '');
    const correctAnswer = String(currentQuestion.correctAnswer).toLowerCase().replace(/\s/g, '');
    
    const isCorrect = userAnswer === correctAnswer;
    setShowResult(isCorrect ? 'correct' : 'incorrect');
    
    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
      const newDamage = damageDealt + DAMAGE_PER_CORRECT;
      setDamageDealt(newDamage);
      setBossHealth(Math.max(0, 100 - newDamage));
      damageBoss(DAMAGE_PER_CORRECT);
      addXp(20, 'general');
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setAnswer('');
      setShowResult(null);
    } else {
      // Battle complete
      const finalHealth = Math.max(0, 100 - damageDealt - (showResult === 'correct' ? DAMAGE_PER_CORRECT : 0));
      if (finalHealth <= 0) {
        defeatBoss();
        // Award special loot for defeating boss
        setEarnedLoot(true);
      }
      setIsComplete(true);
    }
  };

  const handleClose = () => {
    setQuestions([]);
    setCurrentIndex(0);
    setAnswer('');
    setShowResult(null);
    setIsComplete(false);
    setCorrectCount(0);
    setDamageDealt(0);
    setEarnedLoot(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            handleClose();
          }
        }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-2xl"
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute -top-12 right-0 text-white/60 hover:text-white transition-colors"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Battle Container */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden">
            {/* Boss Header */}
            <div className={`p-6 bg-gradient-to-r ${boss.color} relative overflow-hidden`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              
              <div className="relative flex items-center gap-4">
                <div className="text-6xl">{boss.icon}</div>
                <div>
                  <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'Georgia, serif' }}>
                    {boss.name}
                  </h2>
                  <p className="text-white/80 text-sm">{boss.description}</p>
                </div>
              </div>

              {/* Boss Health Bar */}
              <div className="mt-4">
                <div className="flex justify-between text-sm text-white mb-1">
                  <span className="flex items-center gap-1">
                    <Heart className="w-4 h-4" /> Boss Health
                  </span>
                  <span>{Math.max(0, isComplete ? 0 : bossHealth)}/100</span>
                </div>
                <div className="h-4 bg-black/30 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-red-500 to-pink-500"
                    initial={{ width: '100%' }}
                    animate={{ width: `${isComplete ? 0 : bossHealth}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            </div>

            {/* Battle Content */}
            <div className="p-6">
              {!isComplete ? (
                <>
                  {/* Progress */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-white/60 text-sm">
                      Question {currentIndex + 1} of {BOSS_QUESTIONS}
                    </span>
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-yellow-400" />
                      <span className="text-white/60 text-sm">
                        {correctCount} correct
                      </span>
                    </div>
                  </div>

                  <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-6">
                    <motion.div
                      className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentIndex + 1) / BOSS_QUESTIONS) * 100}%` }}
                    />
                  </div>

                  {/* Question */}
                  {currentQuestion && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-white" style={{ fontFamily: 'Georgia, serif' }}>
                        {currentQuestion.question}
                      </h3>

                      {/* Answer Input */}
                      <div>
                        {currentQuestion.options ? (
                          <div className="grid grid-cols-2 gap-3">
                            {currentQuestion.options.map((option, idx) => (
                              <button
                                key={idx}
                                onClick={() => setAnswer(option)}
                                disabled={showResult !== null}
                                className={`p-4 rounded-xl border-2 text-left transition-all ${
                                  answer === option
                                    ? 'border-purple-500 bg-purple-500/20 text-white'
                                    : 'border-white/20 hover:border-purple-500/50 text-white'
                                } ${showResult !== null ? 'opacity-70' : ''}`}
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        ) : (
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

                      {/* Result */}
                      <AnimatePresence>
                        {showResult && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className={`p-4 rounded-xl border ${
                              showResult === 'correct'
                                ? 'bg-green-500/20 border-green-500/30'
                                : 'bg-red-500/20 border-red-500/30'
                            }`}
                          >
                            {showResult === 'correct' ? (
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                                  <Swords className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                  <p className="font-bold text-green-400">Direct Hit! ⚔️</p>
                                  <p className="text-sm text-white/60">-{DAMAGE_PER_CORRECT} HP to boss</p>
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center">
                                  <Skull className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                  <p className="font-bold text-red-400">Missed!</p>
                                  <p className="text-sm text-white/60">Answer: {currentQuestion.correctAnswer}</p>
                                </div>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Action Button */}
                      {!showResult ? (
                        <Button
                          onClick={handleCheckAnswer}
                          disabled={!answer.trim()}
                          className="w-full py-4 text-lg bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:opacity-50"
                        >
                          Attack!
                        </Button>
                      ) : (
                        <Button
                          onClick={handleNext}
                          className="w-full py-4 text-lg bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                        >
                          {currentIndex < questions.length - 1 ? 'Next Attack →' : 'Finish Battle!'}
                        </Button>
                      )}
                    </div>
                  )}
                </>
              ) : (
                /* Battle Complete Screen */
                <div className="text-center py-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-6xl mb-4"
                  >
                    {bossHealth <= 0 ? '🏆' : '⚔️'}
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                    {bossHealth <= 0 ? 'Victory!' : 'Battle Complete'}
                  </h3>
                  
                  <p className="text-white/60 mb-6">
                    {bossHealth <= 0 
                      ? 'You defeated the boss!' 
                      : 'The boss escaped... but you fought bravely!'}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-white">{correctCount}/{BOSS_QUESTIONS}</p>
                      <p className="text-sm text-white/60">Correct Answers</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <Zap className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-white">{correctCount * 20}</p>
                      <p className="text-sm text-white/60">XP Earned</p>
                    </div>
                  </div>

                  {earnedLoot && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6 p-4 bg-yellow-500/20 rounded-xl border border-yellow-500/30"
                    >
                      <p className="text-yellow-400 font-medium">🎁 Bonus Loot Earned!</p>
                      <p className="text-white/60 text-sm">Check your loot box</p>
                    </motion.div>
                  )}

                  <Button
                    onClick={handleClose}
                    className="w-full py-4 text-lg"
                  >
                    Return to Adventure Hub
                  </Button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}