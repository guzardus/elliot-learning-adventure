import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Sparkles, Swords, Brain, Zap, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGameState } from '@/hooks/useGameState';
import { COMPANIONS } from '@/data/companions';
import type { Companion } from '@/types';

interface CompanionSelectProps {
  onComplete: () => void;
}

export function CompanionSelect({ onComplete }: CompanionSelectProps) {
  const { selectCompanions } = useGameState();
  const [selected, setSelected] = useState<string[]>([]);

  const toggleCompanion = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(c => c !== id));
    } else if (selected.length < 3) {
      setSelected([...selected, id]);
    }
  };

  const handleComplete = () => {
    selectCompanions(selected);
    onComplete();
  };

  const getStatIcon = (stat: string) => {
    switch (stat) {
      case 'power': return <Swords className="w-4 h-4" />;
      case 'wisdom': return <Brain className="w-4 h-4" />;
      case 'speed': return <Zap className="w-4 h-4" />;
      case 'defense': return <Shield className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen p-4 md:p-8"
      style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
      }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <Sparkles className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2" style={{ fontFamily: 'Georgia, serif' }}>
            Choose Your Companions
          </h1>
          <p className="text-blue-200 text-lg">
            Select up to 3 mythic creatures to join your adventure
          </p>
          <div className="mt-4 inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
            <span className="text-white">Selected: {selected.length}/3</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {COMPANIONS.map((companion, index) => (
            <CompanionCard
              key={companion.id}
              companion={companion}
              isSelected={selected.includes(companion.id)}
              onToggle={() => toggleCompanion(companion.id)}
              index={index}
              getStatIcon={getStatIcon}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <Button
            onClick={handleComplete}
            disabled={selected.length === 0}
            className="px-12 py-6 text-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl"
          >
            {selected.length === 0 ? 'Select at least 1 companion' : 'Begin Adventure!'}
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}

interface CompanionCardProps {
  companion: Companion;
  isSelected: boolean;
  onToggle: () => void;
  index: number;
  getStatIcon: (stat: string) => React.ReactNode;
}

function CompanionCard({ companion, isSelected, onToggle, index, getStatIcon }: CompanionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={onToggle}
      className={`
        relative cursor-pointer rounded-2xl overflow-hidden transition-all duration-300
        ${isSelected ? 'ring-4 ring-yellow-400 scale-105' : 'hover:scale-102'}
      `}
      style={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)'
      }}
    >
      <div className="aspect-square relative bg-gradient-to-br from-purple-900/50 to-blue-900/50">
        {/* Placeholder for companion image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl">
            {companion.type === 'dragon' && '🐉'}
            {companion.type === 'phoenix' && '🦅'}
            {companion.type === 'unicorn' && '🦄'}
            {companion.type === 'griffin' && '🦁'}
            {companion.type === 'direwolf' && '🐺'}
          </div>
        </div>

        <AnimatePresence>
          {isSelected && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute top-4 right-4 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center"
            >
              <Check className="w-5 h-5 text-purple-900" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-4">
        <h3 className="text-xl font-bold text-white mb-1" style={{ fontFamily: 'Georgia, serif' }}>
          {companion.name}
        </h3>
        <p className="text-sm text-blue-200 mb-3 capitalize">
          The {companion.type}
        </p>
        <p className="text-xs text-white/70 mb-4 line-clamp-2">
          {companion.description}
        </p>

        <div className="grid grid-cols-2 gap-2">
          {Object.entries(companion.stats).map(([stat, value]) => (
            <div key={stat} className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2">
              <span className="text-white/60">{getStatIcon(stat)}</span>
              <span className="text-xs text-white/80 capitalize">{stat}</span>
              <span className="text-sm text-white font-bold ml-auto">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}