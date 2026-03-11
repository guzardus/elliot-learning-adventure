import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Crown, Star, Calendar, Sparkles } from 'lucide-react';
import { useGameState } from '@/hooks/useGameState';

interface CollectionProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Collection({ isOpen, onClose }: CollectionProps) {
  const { state } = useGameState();
  const { superItems } = state;
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const selectedSuperItem = superItems.find(item => item.id === selectedItem);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedItem(null);
              onClose();
            }
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={() => {
                setSelectedItem(null);
                onClose();
              }}
              className="absolute -top-12 right-0 text-white/60 hover:text-white transition-colors z-10"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Main Container */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden">
              {/* Header */}
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'Georgia, serif' }}>
                      Your Collection
                    </h2>
                    <p className="text-white/60 text-sm">
                      {superItems.length} super items crafted
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 max-h-[60vh] overflow-y-auto">
                {superItems.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="w-12 h-12 text-white/20" />
                    </div>
                    <p className="text-white/60 text-lg mb-2">No super items yet</p>
                    <p className="text-white/40 text-sm max-w-sm mx-auto">
                      Collect 10 loot items from adventures and craft them into powerful super items!
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {superItems.map((item, index) => (
                      <motion.button
                        key={item.id}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => setSelectedItem(item.id)}
                        className={`relative p-4 rounded-xl border-2 transition-all text-left ${
                          selectedItem === item.id
                            ? 'border-yellow-500 bg-yellow-500/20'
                            : 'border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10'
                        }`}
                      >
                        <div className="text-4xl mb-3 text-center">{item.icon}</div>
                        <h3 className="text-white font-medium text-sm text-center mb-1" style={{ fontFamily: 'Georgia, serif' }}>
                          {item.name}
                        </h3>
                        <p className="text-white/40 text-xs text-center">
                          {new Date(item.craftedAt).toLocaleDateString()}
                        </p>
                      </motion.button>
                    ))}
                  </div>
                )}
              </div>

              {/* Selected Item Detail */}
              <AnimatePresence>
                {selectedSuperItem && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-white/10 bg-white/5"
                  >
                    <div className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="text-6xl">{selectedSuperItem.icon}</div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-1" style={{ fontFamily: 'Georgia, serif' }}>
                            {selectedSuperItem.name}
                          </h3>
                          <p className="text-white/60 text-sm mb-3">
                            {selectedSuperItem.description}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-white/40">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              Crafted {new Date(selectedSuperItem.craftedAt).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Star className="w-3 h-3" />
                              {selectedSuperItem.recipe}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => setSelectedItem(null)}
                          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        >
                          <X className="w-5 h-5 text-white/60" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}