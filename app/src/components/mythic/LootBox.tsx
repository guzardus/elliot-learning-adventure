import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Star, Gem, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGameState } from '@/hooks/useGameState';
import { generateRandomLoot } from '@/data/companions';
import type { LootItem } from '@/types';

interface LootBoxProps {
  isOpen: boolean;
  onClose: () => void;
  onLootReceived?: (item: LootItem) => void;
}

export function LootBox({ isOpen, onClose, onLootReceived }: LootBoxProps) {
  const { addLoot } = useGameState();
  const [isOpening, setIsOpening] = useState(false);
  const [revealedItem, setRevealedItem] = useState<LootItem | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);
    
    // Simulate opening animation
    setTimeout(() => {
      const item = generateRandomLoot();
      setRevealedItem(item);
      addLoot(item);
      setShowConfetti(true);
      onLootReceived?.(item);
      
      setTimeout(() => setShowConfetti(false), 2000);
    }, 2000);
  };

  const handleClose = () => {
    setIsOpening(false);
    setRevealedItem(null);
    onClose();
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-500';
      case 'rare': return 'from-blue-400 to-blue-600';
      case 'epic': return 'from-purple-400 to-purple-600';
      case 'legendary': return 'from-orange-400 to-orange-600';
      case 'mythic': return 'from-pink-400 to-pink-600';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case 'common': return <Star className="w-4 h-4" />;
      case 'rare': return <Gem className="w-4 h-4" />;
      case 'epic': return <Sparkles className="w-4 h-4" />;
      case 'legendary': return <Crown className="w-4 h-4" />;
      case 'mythic': return <Crown className="w-4 h-4" />;
      default: return <Star className="w-4 h-4" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative max-w-md w-full"
          >
            <button
              onClick={handleClose}
              className="absolute -top-12 right-0 text-white/60 hover:text-white transition-colors"
            >
              <X className="w-8 h-8" />
            </button>

            {!revealedItem ? (
              <div className="text-center">
                <motion.div
                  animate={isOpening ? { 
                    rotate: [0, -10, 10, -10, 10, 0],
                    scale: [1, 1.1, 1, 1.1, 1]
                  } : {}}
                  transition={{ duration: 0.5, repeat: isOpening ? Infinity : 0 }}
                  className="relative inline-block mb-8"
                >
                  <div className="w-48 h-48 mx-auto relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl blur-xl opacity-50" />
                    <div className="relative w-full h-full bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center border-4 border-yellow-300">
                      <span className="text-8xl">📦</span>
                    </div>
                    
                    {/* Sparkles around chest */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                      className="absolute -top-4 -right-4"
                    >
                      <Sparkles className="w-8 h-8 text-yellow-300" />
                    </motion.div>
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                      className="absolute -bottom-4 -left-4"
                    >
                      <Sparkles className="w-6 h-6 text-yellow-300" />
                    </motion.div>
                  </div>
                </motion.div>

                <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                  Mythic Loot Box
                </h2>
                
                <p className="text-white/70 mb-8">
                  {isOpening ? 'Opening...' : 'You earned a loot box for completing the challenge!'}
                </p>

                {!isOpening && (
                  <Button
                    onClick={handleOpen}
                    className="px-8 py-6 text-lg bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold rounded-xl"
                  >
                    Open Loot Box
                  </Button>
                )}
              </div>
            ) : (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="text-center"
              >
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${getRarityColor(revealedItem.rarity)} mb-6`}>
                  {getRarityIcon(revealedItem.rarity)}
                  <span className="text-white font-bold uppercase text-sm">{revealedItem.rarity}</span>
                </div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mb-6"
                >
                  <div className="w-32 h-32 mx-auto bg-white/10 rounded-2xl flex items-center justify-center mb-4">
                    <span className="text-6xl">
                      {revealedItem.type === 'weapon' && '⚔️'}
                      {revealedItem.type === 'armor' && '🛡️'}
                      {revealedItem.type === 'accessory' && '💍'}
                      {revealedItem.type === 'consumable' && '🧪'}
                      {revealedItem.type === 'treasure' && '💎'}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                    {revealedItem.name}
                  </h3>
                  
                  <p className="text-white/60 capitalize mb-4">
                    {revealedItem.type}
                  </p>

                  {revealedItem.stats && (
                    <div className="flex justify-center gap-4">
                      {Object.entries(revealedItem.stats).map(([stat, value]) => (
                        <div key={stat} className="bg-white/10 rounded-lg px-3 py-2">
                          <span className="text-white/60 text-xs uppercase">{stat}</span>
                          <span className="text-white font-bold ml-2">+{value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>

                <Button
                  onClick={handleClose}
                  className="px-8 py-4 bg-white/20 hover:bg-white/30 text-white rounded-xl"
                >
                  Awesome!
                </Button>
              </motion.div>
            )}

            {/* Confetti effect */}
            {showConfetti && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ 
                      y: -20, 
                      x: Math.random() * 400 - 200,
                      opacity: 1,
                      rotate: 0
                    }}
                    animate={{ 
                      y: 400,
                      rotate: 360,
                      opacity: 0
                    }}
                    transition={{ 
                      duration: 2,
                      delay: Math.random() * 0.5
                    }}
                    className="absolute top-0 left-1/2"
                  >
                    <span className="text-2xl">
                      {['✨', '🎉', '💫', '⭐', '🌟'][Math.floor(Math.random() * 5)]}
                    </span>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}