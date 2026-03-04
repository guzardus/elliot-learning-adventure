import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, PenTool, MessageSquare, Edit3, Sparkles, Scroll, Shield } from 'lucide-react';
import type { ActivityType } from '@/types';
import { useGameState } from '@/hooks/useGameState';

interface EnglishLandProps {
  onSelectActivity: (activity: ActivityType) => void;
  onBack: () => void;
}

const englishActivities = [
  {
    id: 'english-spelling' as ActivityType,
    title: 'Arcane Runes',
    description: 'Master the ancient runes of spelling through mystical incantations!',
    icon: Sparkles,
    emoji: '✨',
    gradient: 'from-cyan-500 to-blue-500',
    difficulty: 'All Levels'
  },
  {
    id: 'english-grammar' as ActivityType,
    title: 'Grammar Grimoire',
    description: 'Unlock the secrets of nouns, verbs, and magical sentence structure!',
    icon: MessageSquare,
    emoji: '📜',
    gradient: 'from-purple-500 to-indigo-500',
    difficulty: 'Parts of Speech'
  },
  {
    id: 'english-punctuation' as ActivityType,
    title: 'Punctuation Sigils',
    description: 'Channel the power of commas, periods, and apostrophes!',
    icon: Edit3,
    emoji: '⚡',
    gradient: 'from-yellow-500 to-amber-500',
    difficulty: 'All Marks'
  },
  {
    id: 'english-writing' as ActivityType,
    title: 'Scribe\'s Sanctum',
    description: 'Weave powerful tales and persuasive enchantments!',
    icon: PenTool,
    emoji: '🖋️',
    gradient: 'from-emerald-500 to-green-500',
    difficulty: 'Creative Writing'
  },
  {
    id: 'english-reading' as ActivityType,
    title: 'Tome of Legends',
    description: 'Decode ancient texts and unlock their hidden meanings!',
    icon: BookOpen,
    emoji: '📖',
    gradient: 'from-rose-500 to-pink-500',
    difficulty: 'Comprehension'
  }
];

export function EnglishLand({ onSelectActivity, onBack }: EnglishLandProps) {
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
              className="inline-flex items-center justify-center w-20 h-20 mb-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl"
            >
              <Scroll className="w-10 h-10 text-white" />
            </motion.div>

            <h1 className="text-4xl font-bold text-white mb-2" style={{ fontFamily: 'Georgia, serif' }}>
              English Kingdom
            </h1>
            
            <p className="text-blue-200 text-lg max-w-2xl mx-auto">
              Greetings, {player.name}! Master the linguistic arts to command the power of words.
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
          {englishActivities.map((activity, index) => (
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
  activity: typeof englishActivities[0];
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