import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Swords, Heart, Sparkles, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGameState } from '@/hooks/useGameState';
import { BOSSES } from '@/data/companions';

interface BossBattleProps {
  isOpen: boolean;
  onClose: () => void;
  bossId: string;
}

export function BossBattle({ isOpen, onClose, bossId }: BossBattleProps) {
  const { state, damageBoss, defeatBoss, addLoot, getCompanionStats } = useGameState();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [bossHealth, setBossHealth] = useState(100);
  const [isVictory, setIsVictory] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showDamage, setShowDamage] = useState(false);

  const boss = BOSSES.find(b => b.id === bossId) || BOSSES[0];
  const selectedCompanion = state.companions.find(c => 
    state.player.selectedCompanions.includes(c.id)
  );
  const companionStats = selectedCompanion ? getCompanionStats(selectedCompanion.id) : { power: 5, wisdom: 5, speed: 5, defense: 5 };

  // Sample boss questions
  const questions = [
    {
      question: "What is 8 x 7?",
      options: ['54', '56', '58', '62'],
      correct: 1,
      damage: 25
    },
    {
      question: "If a triangle has angles of 60 and 70 degrees, what is the third angle?",
      options: ['40', '50', '60', '70'],
      correct: 1,
      damage: 25
    },
    {
      question: "What is 3/4 of 20?",
      options: ['12', '15', '16', '18'],
      correct: 1,
      damage: 25
    },
    {
      question: "How many sides does a hexagon have?",
      options: ['5', '6', '7', '8'],
      correct: 1,
      damage: 25
    }
  ];

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    
    setTimeout(() => {
      const isCorrect = index === questions[currentQuestion].correct;
      
      if (isCorrect) {
        const damage = questions[currentQuestion].damage;
        setBossHealth(prev => {
          const newHealth = Math.max(0, prev - damage);
          damageBoss(damage);
          
          if (newHealth <= 0) {
            setIsVictory(true);
            defeatBoss();
            // Add legendary loot reward
            addLoot({
              id: `legendary-${Date.now()}`,
              name: `${boss.name} Scale`,
              type: 'armor',
              rarity: 'legendary',
              stats: { power: 5, defense: 10 },
              image: '/assets/loot/dragon-scale.png',
              equipped: false
            });
          }
          
          return newHealth;
        });
        setShowDamage(true);
        setTimeout(() => setShowDamage(false), 1000);
      }

      setTimeout(() => {
        if (currentQuestion < questions.length - 1 && !isVictory) {
          setCurrentQuestion(prev => prev + 1);
          setSelectedAnswer(null);
        }
      }, 1500);
    }, 500);
  };

  const handleClose = () => {
    setCurrentQuestion(0);
    setBossHealth(100);
    setIsVictory(false);
    setSelectedAnswer(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            background: 'linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)'
          }}
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors z-10"
          >
            <X className="w-8 h-8" />
          </button>

          {!isVictory ? (
            <div className="max-w-2xl w-full">
              {/* Boss Section */}
              <div className="text-center mb-8">
                <motion.div
                  animate={{ 
                    x: showDamage ? [0, -10, 10, -10, 10, 0] : 0,
                    filter: showDamage ? 'brightness(1.5)' : 'brightness(1)'
                  }}
                  className="relative inline-block mb-4"
                >
                  <div className="w-40 h-40 mx-auto bg-gradient-to-br from-red-600 to-orange-600 rounded-full flex items-center justify-center border-4 border-red-400 relative overflow-hidden">
                    <span className="text-8xl">🐉</span>
                    
                    {/* Health bar overlay */}
                    <div className="absolute bottom-0 left-0 right-0 h-3 bg-black/50">
                      <motion.div
                        initial={{ width: '100%' }}
                        animate={{ width: `${bossHealth}%` }}
                        className="h-full bg-gradient-to-r from-red-500 to-green-500"
                      />
                    </div>
                  </div>
                  
                  <AnimatePresence>
                    {showDamage && (
                      <motion.div
                        initial={{ opacity: 1, y: 0, scale: 1 }}
                        animate={{ opacity: 0, y: -50, scale: 1.5 }}
                        exit={{ opacity: 0 }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-yellow-400"
                        style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
                      >
                        -{questions[currentQuestion].damage}!
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                  {boss.name}
                </h2>
                <div className="flex items-center justify-center gap-4">
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-red-400" />
                    <span className="text-white">{bossHealth}/100</span>
                  </div>
                </div>
              </div>

              {/* Question Section */}
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 mb-6"
              >
                <div className="flex items-center gap-2 mb-4 text-white/60">
                  <Sparkles className="w-5 h-5" />
                  <span>Question {currentQuestion + 1} of {questions.length}</span>
                </div>

                <h3 className="text-xl text-white mb-6 font-medium">
                  {questions[currentQuestion].question}
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  {questions[currentQuestion].options.map((option, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => selectedAnswer === null && handleAnswer(index)}
                      disabled={selectedAnswer !== null}
                      className={`
                        p-4 rounded-xl text-lg font-medium transition-all
                        ${selectedAnswer === null 
                          ? 'bg-white/10 hover:bg-white/20 text-white' 
                          : selectedAnswer === index 
                            ? index === questions[currentQuestion].correct 
                              ? 'bg-green-500/50 text-white'
                              : 'bg-red-500/50 text-white'
                            : index === questions[currentQuestion].correct && selectedAnswer !== null
                              ? 'bg-green-500/30 text-white'
                              : 'bg-white/5 text-white/50'
                        }
                      `}
                    >
                      {option}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Companion Stats */}
              {selectedCompanion && (
                <div className="flex items-center justify-center gap-4 bg-white/5 rounded-xl p-4">
                  <span className="text-white/60">{selectedCompanion.name}'s Power:</span>
                  <div className="flex items-center gap-2">
                    <Swords className="w-4 h-4 text-orange-400" />
                    <span className="text-white font-bold">{companionStats.power}</span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            // Victory Screen
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center max-w-md"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5 }}
                className="mb-6"
              >
                <Trophy className="w-24 h-24 text-yellow-400 mx-auto" />
              </motion.div>

              <h2 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                Victory!
              </h2>

              <p className="text-xl text-white/80 mb-6">
                You defeated {boss.name}!
              </p>

              <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl p-6 mb-8">
                <h3 className="text-lg font-bold text-yellow-400 mb-4">Rewards Earned</h3>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-20 h-20 bg-white/10 rounded-xl flex items-center justify-center">
                    <span className="text-4xl">🛡️</span>
                  </div>
                  <div className="text-left">
                    <p className="text-white font-bold">{boss.name} Scale</p>
                    <span className="text-yellow-400 text-sm">Legendary Armor</span>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleClose}
                className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-xl"
              >
                Claim Rewards
              </Button>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}