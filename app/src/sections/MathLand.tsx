import { motion } from 'framer-motion';
import { ArrowLeft, Plus, Minus, X, Divide, Brain, Ruler, Shapes, BarChart3, DollarSign, PieChart, Binary } from 'lucide-react';
import type { ActivityType } from '@/types';

interface MathLandProps {
  onSelectActivity: (activity: ActivityType) => void;
  onBack: () => void;
}

const mathActivities = [
  {
    id: 'math-addition' as ActivityType,
    title: 'Treasure Hoard',
    description: 'Add up gold coins and treasures!',
    icon: Plus,
    emoji: '💰',
    color: 'from-yellow-400 to-orange-400',
    bgColor: 'bg-yellow-50',
    difficulty: 'Easy to Hard'
  },
  {
    id: 'math-subtraction' as ActivityType,
    title: 'Bridge Repair',
    description: 'Fix broken bridges by finding the difference!',
    icon: Minus,
    emoji: '🌉',
    color: 'from-blue-400 to-cyan-400',
    bgColor: 'bg-blue-50',
    difficulty: 'Easy to Hard'
  },
  {
    id: 'math-multiplication' as ActivityType,
    title: 'Garden Growth',
    description: 'Plant seeds that multiply into flower patches!',
    icon: X,
    emoji: '🌸',
    color: 'from-pink-400 to-rose-400',
    bgColor: 'bg-pink-50',
    difficulty: 'Times Tables to 2-digit'
  },
  {
    id: 'math-division' as ActivityType,
    title: 'Sharing Feast',
    description: 'Share food equally among animal friends!',
    icon: Divide,
    emoji: '🍰',
    color: 'from-green-400 to-emerald-400',
    bgColor: 'bg-green-50',
    difficulty: 'With Remainders'
  },
  {
    id: 'math-wordProblems' as ActivityType,
    title: 'Word Problem Woods',
    description: 'Solve fun story puzzles and adventures!',
    icon: Brain,
    emoji: '🌲',
    color: 'from-purple-400 to-violet-400',
    bgColor: 'bg-purple-50',
    difficulty: 'All Operations'
  },
  {
    id: 'math-measurement' as ActivityType,
    title: 'Measurement Mountain',
    description: 'Time, money, length, and more!',
    icon: Ruler,
    emoji: '⏰',
    color: 'from-orange-400 to-amber-400',
    bgColor: 'bg-orange-50',
    difficulty: 'Real-world Math'
  },
  {
    id: 'math-geometry' as ActivityType,
    title: 'Shape Valley',
    description: 'Explore shapes, symmetry, and space!',
    icon: Shapes,
    emoji: '🔷',
    color: 'from-teal-400 to-cyan-400',
    bgColor: 'bg-teal-50',
    difficulty: '2D & 3D Shapes'
  },
  {
    id: 'math-data' as ActivityType,
    title: 'Data Detective',
    description: 'Read graphs, charts, and solve data puzzles!',
    icon: BarChart3,
    emoji: '📊',
    color: 'from-indigo-400 to-purple-400',
    bgColor: 'bg-indigo-50',
    difficulty: 'Graphs & Charts'
  },
  {
    id: 'math-money' as ActivityType,
    title: 'Money Market',
    description: 'Calculate change and manage your coins!',
    icon: DollarSign,
    emoji: '💵',
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-50',
    difficulty: 'Australian Currency'
  },
  {
    id: 'math-fractions' as ActivityType,
    title: 'Fraction Forest',
    description: 'Share, divide, and compare parts!',
    icon: PieChart,
    emoji: '🍕',
    color: 'from-red-400 to-pink-400',
    bgColor: 'bg-red-50',
    difficulty: 'Parts & Wholes'
  },
  {
    id: 'math-patterns' as ActivityType,
    title: 'Pattern Paradise',
    description: 'Find rules and continue sequences!',
    icon: Binary,
    emoji: '🔢',
    color: 'from-violet-400 to-purple-400',
    bgColor: 'bg-violet-50',
    difficulty: 'Skip Counting & Rules'
  }
];

export function MathLand({ onSelectActivity, onBack }: MathLandProps) {
  return (
    <div 
      className="min-h-screen p-4 md:p-6"
      style={{
        backgroundImage: 'url(/images/treasure-hoard.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Header */}
      <header className="max-w-6xl mx-auto mb-6">
        <div className="flex items-center gap-4">
          <motion.button
            onClick={onBack}
            className="p-3 rounded-full bg-white/90 shadow-md hover:shadow-lg transition-shadow backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-6 h-6 text-charcoal" />
          </motion.button>
          
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-charcoal flex items-center gap-3 drop-shadow-lg">
              <span className="text-4xl">🏰</span>
              Number Kingdom
            </h1>
            <p className="text-charcoal font-medium drop-shadow-md">
              Where math becomes a magical adventure!
            </p>
          </div>
        </div>
      </header>

      {/* Welcome Message with Professor Owl */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="watercolour-card p-6 flex items-center gap-6">
          <img 
            src="/images/professor-owl.png" 
            alt="Professor Paws" 
            className="w-24 h-24 rounded-full object-cover shadow-lg"
          />
          <div>
            <h2 className="text-xl font-bold text-charcoal mb-1">
              Greetings, young mathematician!
            </h2>
            <p className="text-warm-gray">
              I'm Professor Paws. Choose a quest to begin your math adventure!
            </p>
          </div>
        </div>
      </div>

      {/* Activity Grid */}
      <div className="max-w-6xl mx-auto">
        <h3 className="text-lg font-bold text-charcoal mb-4">Choose Your Quest</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {mathActivities.map((activity, index) => (
            <motion.button
              key={activity.id}
              onClick={() => onSelectActivity(activity.id)}
              className={`${activity.bgColor} rounded-2xl p-5 text-left border-2 border-transparent hover:border-white/50 transition-all shadow-md hover:shadow-lg`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${activity.color} flex items-center justify-center text-2xl shadow-md`}>
                  {activity.emoji}
                </div>
                <activity.icon className="w-5 h-5 text-charcoal/50" />
              </div>
              
              <h4 className="text-lg font-bold text-charcoal mb-2">{activity.title}</h4>
              <p className="text-sm text-warm-gray mb-3">{activity.description}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-xs px-2 py-1 rounded-full bg-white/60 text-charcoal/70">
                  {activity.difficulty}
                </span>
                <span className="text-soft-coral text-sm font-medium">Start →</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Fun Fact */}
      <div className="max-w-6xl mx-auto mt-8">
        <div className="watercolour-card p-4 text-center">
          <p className="text-warm-gray text-sm">
            <span className="font-bold text-soft-coral">Did you know?</span>{' '}
            The ancient Egyptians used math to build the pyramids over 4,500 years ago! 🏛️
          </p>
        </div>
      </div>
    </div>
  );
}
