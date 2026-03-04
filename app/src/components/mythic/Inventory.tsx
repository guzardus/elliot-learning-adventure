import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Swords, Shield, Gem, Sparkles, Backpack, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGameState } from '@/hooks/useGameState';
import type { LootItem } from '@/types';

interface InventoryProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Inventory({ isOpen, onClose }: InventoryProps) {
  const { state, equipItem, unequipItem } = useGameState();
  const { inventory, companions, player } = state;
  const [selectedItem, setSelectedItem] = useState<LootItem | null>(null);
  const [selectedCompanion, setSelectedCompanion] = useState<string | null>(
    player.selectedCompanions[0] || null
  );

  const selectedCompanionData = companions.find(c => c.id === selectedCompanion);

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

  const getItemIcon = (type: string) => {
    switch (type) {
      case 'weapon': return <Swords className="w-5 h-5" />;
      case 'armor': return <Shield className="w-5 h-5" />;
      case 'accessory': return <Gem className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  const handleEquip = () => {
    if (selectedItem && selectedCompanion) {
      equipItem(selectedItem.id, selectedCompanion);
      setSelectedItem(null);
    }
  };

  const handleUnequip = () => {
    if (selectedItem) {
      unequipItem(selectedItem.id);
      setSelectedItem(null);
    }
  };

  const equippedItems = inventory.filter(item => item.equipped);
  const unequippedItems = inventory.filter(item => !item.equipped);

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
            className="w-full max-w-4xl max-h-[90vh] bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-2xl border border-white/10 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-xl flex items-center justify-center">
                  <Backpack className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white" style={{ fontFamily: 'Georgia, serif' }}>
                    Inventory
                  </h2>
                  <p className="text-white/60 text-sm">{inventory.length} items</p>
                </div>
              </div>
              
              <button
                onClick={onClose}
                className="text-white/60 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-col md:flex-row h-[calc(90vh-80px)]">
              {/* Left Panel - Items */}
              <div className="flex-1 p-6 overflow-y-auto">
                {/* Companion Selector */}
                <div className="mb-6">
                  <h3 className="text-white/60 text-sm mb-3">Select Companion</h3>
                  <div className="flex gap-3">
                    {player.selectedCompanions.map((companionId) => {
                      const companion = companions.find(c => c.id === companionId);
                      if (!companion) return null;
                      
                      return (
                        <button
                          key={companionId}
                          onClick={() => setSelectedCompanion(companionId)}
                          className={`px-4 py-2 rounded-xl font-medium transition-all ${
                            selectedCompanion === companionId
                              ? 'bg-white/20 text-white'
                              : 'bg-white/5 text-white/60 hover:bg-white/10'
                          }`}
                        >
                          {companion.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Equipped Items */}
                {equippedItems.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-white/60 text-sm mb-3">Equipped</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {equippedItems.map((item) => (
                        <ItemCard
                          key={item.id}
                          item={item}
                          isSelected={selectedItem?.id === item.id}
                          onClick={() => setSelectedItem(item)}
                          getRarityColor={getRarityColor}
                          getItemIcon={getItemIcon}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Available Items */}
                <div>
                  <h3 className="text-white/60 text-sm mb-3">Available</h3>
                  {unequippedItems.length === 0 ? (
                    <p className="text-white/40 text-center py-8">No items available. Complete quizzes to earn loot!</p>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {unequippedItems.map((item) => (
                        <ItemCard
                          key={item.id}
                          item={item}
                          isSelected={selectedItem?.id === item.id}
                          onClick={() => setSelectedItem(item)}
                          getRarityColor={getRarityColor}
                          getItemIcon={getItemIcon}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Panel - Item Details */}
              <div className="w-full md:w-80 bg-white/5 border-l border-white/10 p-6">
                {selectedItem ? (
                  <div>
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${getRarityColor(selectedItem.rarity)} mb-4`}>
                      <span className="text-white text-xs font-bold uppercase">{selectedItem.rarity}</span>
                    </div>

                    <div className="w-24 h-24 mx-auto bg-white/10 rounded-2xl flex items-center justify-center mb-4">
                      <span className="text-5xl">
                        {selectedItem.type === 'weapon' && '⚔️'}
                        {selectedItem.type === 'armor' && '🛡️'}
                        {selectedItem.type === 'accessory' && '💍'}
                        {selectedItem.type === 'consumable' && '🧪'}
                        {selectedItem.type === 'treasure' && '💎'}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white text-center mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                      {selectedItem.name}
                    </h3>
                    
                    <p className="text-white/60 text-center capitalize mb-4">
                      {selectedItem.type}
                    </p>

                    {selectedItem.stats && (
                      <div className="space-y-2 mb-6">
                        {Object.entries(selectedItem.stats).map(([stat, value]) => (
                          <div key={stat} className="flex justify-between items-center bg-white/5 rounded-lg px-4 py-2">
                            <span className="text-white/60 capitalize">{stat}</span>
                            <span className="text-white font-bold">+{value}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {selectedItem.equipped ? (
                      <Button
                        onClick={handleUnequip}
                        variant="outline"
                        className="w-full py-3 border-white/20 text-white hover:bg-white/10"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Unequip
                      </Button>
                    ) : (
                      <Button
                        onClick={handleEquip}
                        disabled={!selectedCompanion}
                        className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold"
                      >
                        Equip to {selectedCompanionData?.name || 'Companion'}
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <p className="text-white/40 text-center">Select an item to view details</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface ItemCardProps {
  item: LootItem;
  isSelected: boolean;
  onClick: () => void;
  getRarityColor: (rarity: string) => string;
  getItemIcon: (type: string) => React.ReactNode;
}

function ItemCard({ item, isSelected, onClick, getRarityColor, getItemIcon }: ItemCardProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        relative p-4 rounded-xl text-left transition-all
        ${isSelected ? 'ring-2 ring-yellow-400 bg-white/10' : 'bg-white/5 hover:bg-white/10'}
      `}
    >
      {item.equipped && (
        <div className="absolute top-2 right-2 w-2 h-2 bg-green-400 rounded-full"></div>
      )}
      
      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getRarityColor(item.rarity)} flex items-center justify-center text-white mb-2`}>
        {getItemIcon(item.type)}
      </div>
      
      <p className="text-white text-sm font-medium truncate">{item.name}</p>
      <p className="text-white/40 text-xs capitalize">{item.type}</p>
    </motion.button>
  );
}