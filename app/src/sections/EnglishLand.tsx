import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, PenTool, MessageSquare, Edit3, Sparkles } from 'lucide-react';
import type { ActivityType } from '@/types';

interface EnglishLandProps {
  onSelectActivity: (activity: ActivityType) => void;
  onBack: () => void;
}

const englishActivities = [
  {
    id: 'english-spelling' as ActivityType,
    title: 'Spelling Springs',
    description: 'Master words with Look-Say-Cover-Write-Check!',
    icon: Sparkles,
    emoji: '🌊',
    color: 'from-blue-400 to-cyan-400',
    bgColor: 'bg-blue-50',
    difficulty: 'All Levels'
  },
  {
    id: 'english-grammar' as ActivityType,
    title: 'Grammar Grove',
    description: 'Learn nouns, verbs, adjectives and more!',
    icon: MessageSquare,
    emoji: '🌳',
    color: 'from-green-400 to-emerald-400',
    bgColor: 'bg-green-50',
    difficulty: 'Parts of Speech'
  },
  {
    id: 'english-punctuation' as ActivityType,
    title: 'Punctuation Pond',
    description: 'Master full stops, commas, and apostrophes!',
    icon: Edit3,
    emoji: '🦆',
    color: 'from-yellow-400 to-orange-400',
    bgColor: 'bg-yellow-50',
    difficulty: 'All Marks'
  },
  {
    id: 'english-writing' as ActivityType,
    title: 'Writing Workshop',
    description: 'Create amazing stories and persuasive pieces!',
    icon: PenTool,
    emoji: '✍️',
    color: 'from-purple-400 to-violet-400',
    bgColor: 'bg-purple-50',
    difficulty: 'Creative Writing'
  },
  {
    id: 'english-reading' as ActivityType,
    title: 'Reading River',
    description: 'Read stories and answer comprehension questions!',
    icon: BookOpen,
    emoji: '📚',
    color: 'from-pink-400 to-rose-400',
    bgColor: 'bg-pink-50',
    difficulty: 'Comprehension'
  }
];

export function EnglishLand({ onSelectActivity, onBack }: EnglishLandProps) {
  return (
    <div 
      className="min-h-screen p-4 md:p-6"
      style={{
        backgroundImage: 'url(/images/word-forest.png)',
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
              <span className="text-4xl">🌲</span>
              Word Forest
            </h1>
            <p className="text-charcoal font-medium drop-shadow-md">
              Where words come alive and stories begin!
            </p>
          </div>
        </div>
      </header>

      {/* Welcome Message with Wordy Fox */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="watercolour-card p-6 flex items-center gap-6">
          <img 
            src="/images/wordy-fox.png" 
            alt="Wordy the Fox" 
            className="w-24 h-24 rounded-full object-cover shadow-lg"
          />
          <div>
            <h2 className="text-xl font-bold text-charcoal mb-1">
              Hello, word explorer!
            </h2>
            <p className="text-warm-gray">
              I'm Wordy the Fox. Let's explore the magic of words together!
            </p>
          </div>
        </div>
      </div>

      {/* Activity Grid */}
      <div className="max-w-6xl mx-auto">
        <h3 className="text-lg font-bold text-charcoal mb-4">Choose Your Adventure</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {englishActivities.map((activity, index) => (
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
                <span className="text-sage-green text-sm font-medium">Start →</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Quote of the Day */}
      <div className="max-w-6xl mx-auto mt-8">
        <div className="watercolour-card p-4 text-center">
          <p className="text-warm-gray text-sm italic">
            "The more that you read, the more things you will know. 
            The more that you learn, the more places you'll go." 
            <span className="font-bold text-sage-green"> — Dr. Seuss</span>
          </p>
        </div>
      </div>
    </div>
  );
}
