import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Star, Gem, Crown, Hammer, Backpack, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGameState } from '@/hooks/useGameState';
import { craftSuperItem as getCraftedSuperItem } from '@/data/loot';
import type { LootItem, SuperItem } from '@/types';

interface LootBoxProps {
  isOpen: boolean;
  onClose: () => void;
}

// Component to render a sprite from the sprite sheet
function SpriteLoot({ item, className = '' }: { item: LootItem; className?: string }) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        backgroundImage: `url(${item.image.spriteSheet})`,
        backgroundPosition: `${item.image.x}% ${item.image.y}%`,
        backgroundSize: `${100 * (100 / item.image.width)}% ${100 * (100 / item.image.height)}%`,
        imageRendering: 'pixelated',
      }}
    />
  );
}

export function LootBox({ isOpen, onClose }: LootBoxProps) {
  const { state, craftSuperItem, canCraftSuperItem } = useGameState();
  const [activeTab, setActiveTab] = useState<'inventory' | 'craft'>('inventory');
  const [selectedLoot, setSelectedLoot] = useState<string[]>([]);
  const [craftedItem, setCraftedItem] = useState<SuperItem | null>(null);
  const [showCraftAnimation, setShowCraftAnimation] = useState(false);

  const { inventory, superItems } = state;

  const handleSelectLoot = (lootId: string) => {
    if (selectedLoot.includes(lootId)) {
      setSelectedLoot(selectedLoot.filter(id => id !== lootId));
    } else if (selectedLoot.length < 10) {
      setSelectedLoot([...selectedLoot, lootId]);
    }
  };

  const handleCraft = () => {
    if (selectedLoot.length !== 10) return;
    
    const selectedItems = inventory.filter(item => selectedLoot.includes(item.id));
    const result = getCraftedSuperItem(selectedItems);
    
    if (result) {
      setShowCraftAnimation(true);
      setTimeout(() => {
        craftSuperItem(result, selectedLoot);
        setCraftedItem(result);
        setSelectedLoot([]);
        setShowCraftAnimation(false);
      }, 2000);
    }
  };

  // Group loot by rarity
  const groupedLoot = {
    common: inventory.filter(item => item.rarity === 'common'),
    rare: inventory.filter(item => item.rarity === 'rare'),
    epic: inventory.filter(item => item.rarity === 'epic')
  };

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
              setActiveTab('inventory');
              setSelectedLoot([]);
              setCraftedItem(null);
              onClose();
            }
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={() => {
                setActiveTab('inventory');
                setSelectedLoot([]);
                setCraftedItem(null);
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
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                      <Backpack className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'Georgia, serif' }}>
                        Your Loot Box
                      </h2>
                      <p className="text-white/60 text-sm">
                        {inventory.length} items • {superItems.length} super items crafted
                      </p>
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveTab('inventory')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      activeTab === 'inventory'
                        ? 'bg-white/20 text-white'
                        : 'text-white/60 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    Inventory
                  </button>
                  <button
                    onClick={() => setActiveTab('craft')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                      activeTab === 'craft'
                        ? 'bg-white/20 text-white'
                        : 'text-white/60 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Hammer className="w-4 h-4" />
                    Craft
                    {canCraftSuperItem() && (
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    )}
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 max-h-[50vh] overflow-y-auto">
                {activeTab === 'inventory' ? (
                  <div className="space-y-6">
                    {/* Inventory Grid */}
                    {inventory.length === 0 ? (
                      <div className="text-center py-12">
                        <Backpack className="w-16 h-16 text-white/20 mx-auto mb-4" />
                        <p className="text-white/60">Your loot box is empty</p>
                        <p className="text-white/40 text-sm mt-2">Complete adventures to earn loot!</p>
                      </div>
                    ) : (
                      <>
                        {/* Epic Items */}
                        {groupedLoot.epic.length > 0 && (
                          <div>
                            <h3 className="text-purple-400 font-medium mb-3 flex items-center gap-2">
                              <Star className="w-4 h-4" /> Epic ({groupedLoot.epic.length})
                            </h3>
                            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                              {groupedLoot.epic.map((item) => (
                                <LootItemCard key={item.id} item={item} />
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Rare Items */}
                        {groupedLoot.rare.length > 0 && (
                          <div>
                            <h3 className="text-blue-400 font-medium mb-3 flex items-center gap-2">
                              <Gem className="w-4 h-4" /> Rare ({groupedLoot.rare.length})
                            </h3>
                            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                              {groupedLoot.rare.map((item) => (
                                <LootItemCard key={item.id} item={item} />
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Common Items */}
                        {groupedLoot.common.length > 0 && (
                          <div>
                            <h3 className="text-gray-400 font-medium mb-3 flex items-center gap-2">
                              <Sparkles className="w-4 h-4" /> Common ({groupedLoot.common.length})
                            </h3>
                            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                              {groupedLoot.common.map((item) => (
                                <LootItemCard key={item.id} item={item} />
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Crafting Tab */}
                    {craftedItem ? (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-center py-8"
                      >
                        <motion.div
                          animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                          transition={{ repeat: 3, duration: 0.5 }}
                          className="text-6xl mb-4"
                        >
                          {craftedItem.icon}
                        </motion.div>
                        <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                          {craftedItem.name}
                        </h3>
                        <p className="text-white/60 mb-4">{craftedItem.description}</p>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full border border-yellow-500/30">
                          <Crown className="w-4 h-4 text-yellow-400" />
                          <span className="text-yellow-400 text-sm">Super Item Crafted!</span>
                        </div>
                        <Button
                          onClick={() => setCraftedItem(null)}
                          className="mt-6 w-full"
                          variant="outline"
                        >
                          Craft Another
                        </Button>
                      </motion.div>
                    ) : showCraftAnimation ? (
                      <div className="text-center py-12">
                        <motion.div
                          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 1 }}
                          className="text-6xl mb-4"
                        >
                          ✨
                        </motion.div>
                        <p className="text-white/60">Crafting your super item...</p>
                      </div>
                    ) : (
                      <>
                        {/* Crafting Instructions */}
                        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                          <h3 className="text-white font-medium mb-2 flex items-center gap-2">
                            <Hammer className="w-5 h-5 text-yellow-400" />
                            How to Craft
                          </h3>
                          <p className="text-white/60 text-sm">
                            Select 10 loot items to craft a Super Item. Different combinations create different items!
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2 text-xs">
                            <span className="px-2 py-1 bg-gray-500/20 rounded text-gray-400">10 Common → Apprentice Wand</span>
                            <span className="px-2 py-1 bg-blue-500/20 rounded text-blue-400">10 Rare → Sorcerer's Staff</span>
                            <span className="px-2 py-1 bg-purple-500/20 rounded text-purple-400">10 Epic → Legendary Tome</span>
                          </div>
                        </div>

                        {/* Selection Progress */}
                        <div className="flex items-center justify-between">
                          <span className="text-white/60">
                            Selected: {selectedLoot.length}/10
                          </span>
                          <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-yellow-500"
                              initial={{ width: 0 }}
                              animate={{ width: `${(selectedLoot.length / 10) * 100}%` }}
                            />
                          </div>
                        </div>

                        {/* Selectable Loot Grid */}
                        {inventory.length === 0 ? (
                          <div className="text-center py-8">
                            <p className="text-white/60">No loot to craft with</p>
                          </div>
                        ) : (
                          <div className="grid grid-cols-5 sm:grid-cols-8 gap-2">
                            {inventory.map((item) => (
                              <button
                                key={item.id}
                                onClick={() => handleSelectLoot(item.id)}
                                disabled={!selectedLoot.includes(item.id) && selectedLoot.length >= 10}
                                className={`relative aspect-square rounded-xl border-2 transition-all p-1 ${
                                  selectedLoot.includes(item.id)
                                    ? 'border-yellow-500 bg-yellow-500/20 scale-105'
                                    : selectedLoot.length >= 10
                                    ? 'border-white/10 opacity-50'
                                    : 'border-white/10 hover:border-white/30 hover:bg-white/5'
                                }`}>
                                <SpriteLoot item={item} className="w-full h-full" />
                                {selectedLoot.includes(item.id) && (
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center"
                                  >
                                    <Check className="w-3 h-3 text-white" />
                                  </motion.div>
                                )}
                              </button>
                            ))}
                          </div>
                        )}

                        {/* Craft Button */}
                        <Button
                          onClick={handleCraft}
                          disabled={selectedLoot.length !== 10}
                          className="w-full py-6 text-lg bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Hammer className="w-5 h-5 mr-2" />
                          {selectedLoot.length === 10 ? 'Craft Super Item!' : `Select ${10 - selectedLoot.length} more`}
                        </Button>
                      </>
                    )}
                  </div>
                )}
              </div>
              
              {/* Footer - Return Button */}
              <div className="p-4 border-t border-white/10 bg-white/5">
                <Button
                  onClick={() => {
                    setActiveTab('inventory');
                    setSelectedLoot([]);
                    setCraftedItem(null);
                    onClose();
                  }}
                  className="w-full py-4 text-lg bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold rounded-xl"
                >
                  Return to Adventure Hub
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function LootItemCard({ item }: { item: LootItem }) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div className={`aspect-square rounded-xl border p-2 flex items-center justify-center ${
        item.rarity === 'epic' ? 'bg-purple-500/20 border-purple-500/30' :
        item.rarity === 'rare' ? 'bg-blue-500/20 border-blue-500/30' :
        'bg-gray-500/20 border-gray-500/30'
      }`}>
        <SpriteLoot item={item} className="w-full h-full" />
      </div>
      
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-black/90 rounded-lg text-xs whitespace-nowrap z-10"
          >
            <p className="text-white font-medium">{item.name}</p>
            <p className="text-white/60 capitalize">{item.rarity}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}