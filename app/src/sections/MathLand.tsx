import { motion } from 'framer-motion';
import { ArrowLeft, Plus, Minus, X, Divide, Brain, Ruler, Shapes, BarChart3, DollarSign, PieChart, Binary, Sword, Shield, Castle } from 'lucide-react';
import type { ActivityType } from '@/types';
import { useGameState } from '@/hooks/useGameState';

interface MathLandProps {
  onSelectActivity: (activity: ActivityType) => void;
  onBack: () => void;
}

const mathActivities = [
  {
    id: 'math-addition' as ActivityType,
    title: 'Forge of Numbers',
    description: 'Combine mystical energies through addition!',
    icon: Plus,
    emoji: '🔥',
    gradient: 'from-red-500 to-orange-500',
    difficulty: 'Easy to Hard'
  },
  {
    id: 'math-subtraction' as ActivityType,
    title: 'Shadow Subtraction',
    description: 'Remove dark forces to reveal the truth!',
    icon: Minus,
    emoji: '🌑',
    gradient: 'from-purple-500 to-indigo-500',
    difficulty: 'Easy to Hard'
  },
  {
    id: 'math-multiplication' as ActivityType,
    title: 'Crystal Multiplication',
    description: 'Multiply magical crystals to power your spells!',
    icon: X,
    emoji: '💎',
    gradient: 'from-cyan-500 to-blue-500',
    difficulty: 'Times Tables to 2-digit'
  },
  {
    id: 'math-division' as ActivityType,
    title: 'Ancient Division',
    description: 'Split legendary treasures among your allies!',
    icon: Divide,
    emoji: '⚔️',
    gradient: 'from-amber-500 to-yellow-500',
    difficulty: 'With Remainders'
  },
  {
    id: 'math-wordProblems' as ActivityType,
    title: 'Riddle Realm',
    description: 'Solve mystical riddles and puzzles!',
    icon: Brain,
    emoji: '📜',
    gradient: 'from-emerald-500 to-green-500',
    difficulty: 'All Operations'
  },
  {
    id: 'math-measurement' as ActivityType,
    title: 'Dimensional Gates',
    description: 'Master time, space, and magical distances!',
    icon: Ruler,
    emoji: '🌀',
    gradient: 'from-violet-500 to-purple-500',
    difficulty: 'Real-world Math'
  },
  {
    id: 'math-geometry' as ActivityType,
    title: 'Sacred Geometry',
    description: 'Unlock the secrets of ancient shapes!',
    icon: Shapes,
    emoji: '🔮',
    gradient: 'from-pink-500 to-rose-500',
    difficulty: '2D & 3D Shapes'
  },
  {
    id: 'math-data' as ActivityType,
    title: 'Oracle\'s Charts',
    description: 'Read the signs in magical data!',
    icon: BarChart3,
    emoji: '🌟',
    gradient: 'from-teal-500 to-cyan-500',
    difficulty: 'Graphs & Tables'
  },
  {
    id: 'math-money' as ActivityType,
    title: 'Dragon\'s Hoard',
    description: 'Count the gold of ancient dragons!',
    icon: DollarSign,
    emoji: '🐉',
    gradient: 'from-yellow-500 to-amber-500',
    difficulty: 'Money Math'
  },
  {
    id: 'math-fractions' as ActivityType,
    title: 'Alchemist\'s Portions',
    description: 'Mix magical potions with precise fractions!',
    icon: PieChart,
    emoji: '⚗️',
    gradient: 'from-green-500 to-emerald-500',
    difficulty: 'Parts & Wholes'
  },
  {
    id: 'math-patterns' as ActivityType,
    title: 'Mystic Patterns',
    description: 'Discover the sequences of magic!',
    icon: Binary,
    emoji: '✨',
    gradient: 'from-indigo-500 to-blue-500',
    difficulty: 'Number Patterns'
  },
  {
    id: 'surprise-mix' as ActivityType,
    title: 'Chaos Challenge',
    description: 'Face random trials of mathematical might!',
    icon: Sword,
    emoji: '🎲',
    gradient: 'from-red-600 to-purple-600',
    difficulty: 'Mixed Operations'
  }
];

export function MathLand({ onSelectActivity, onBack }: MathLandProps) {
  const { state } = useGameState();
  const { player } = state;

  return (
    <div className="min-h-screen p-4 md:p-6"
      style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Academy
            </motion.button>
          </div>

          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="inline-flex items-center justify-center w-20 h-20 mb-4 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl"
            >
              <Castle className="w-10 h-10 text-white" />
            </motion.div>

            <h1 className="text-4xl font-bold text-white mb-2" style={{ fontFamily: 'Georgia, serif' }}>
              Math Realm
            </h1>
            
            <p className="text-blue-200 text-lg max-w-2xl mx-auto">
              Welcome, {player.name}! Master the arcane arts of mathematics to strengthen your companions.
            </p>
          </div>
        </motion.header>

        {/* Activities Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {mathActivities.map((activity, index) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              onClick={() => onSelectActivity(activity.id)}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

interface ActivityCardProps {
  activity: typeof mathActivities[0];
  onClick: () => void;
  index: number;
}

function ActivityCard({ activity, onClick, index }: ActivityCardProps) {
  const Icon = activity.icon;

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index }}
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="w-full p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-left group"
    >
      <div className="flex items-start gap-4">
        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${activity.gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
          <Icon className="w-7 h-7 text-white" />
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">{activity.emoji}</span>
            <h3 className="text-lg font-bold text-white" style={{ fontFamily: 'Georgia, serif' }}>
              {activity.title}
            </h3>
          </div>
          
          <p className="text-white/60 text-sm mb-2">
            {activity.description}
          </p>
          
          <div className="flex items-center gap-2">
            <Shield className="w-3 h-3 text-white/40" />
            <span className="text-xs text-white/40">{activity.difficulty}</span>
          </div>
        </div>
      </div>
    </motion.button>
  );
}