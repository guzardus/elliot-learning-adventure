'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import WButton from '@/components/WButton'
import WCard from '@/components/WCard'
import WProgress from '@/components/WProgress'
import { 
  IconArrowLeft, 
  IconStar, 
  IconCoin, 
  IconHome,
  IconCheck
} from '@/components/WIcon'
import PeakClimbing from '@/components/PeakClimbing'
import CaveOfFractions from '@/components/CaveOfFractions'
import BridgeBuilder from '@/components/BridgeBuilder'

type Activity = 'hub' | 'peak-climbing' | 'cave-fractions' | 'bridge-builder'
type Difficulty = 'easy' | 'medium' | 'hard' | 'mixed'

interface ActivityProgress {
  completed: number
  total: number
  bestScore: number
  totalXp: number
}

export default function MathMountains() {
  const [currentActivity, setCurrentActivity] = useState<Activity>('hub')
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('mixed')
  const [showDifficultySelect, setShowDifficultySelect] = useState<Activity | null>(null)
  
  // Track progress for each activity
  const [progress, setProgress] = useState<Record<'peak-climbing' | 'cave-fractions' | 'bridge-builder', ActivityProgress>>({
    'peak-climbing': { completed: 0, total: 10, bestScore: 0, totalXp: 0 },
    'cave-fractions': { completed: 0, total: 10, bestScore: 0, totalXp: 0 },
    'bridge-builder': { completed: 0, total: 8, bestScore: 0, totalXp: 0 },
  })

  const activities = [
    {
      id: 'peak-climbing' as Activity,
      name: 'Peak Climbing',
      description: 'Climb mountain peaks by mastering 2-digit multiplication!',
      image: '/images/math/peak-climbing.png',
      color: 'from-blue-400 to-purple-500',
      difficulty: 'Grade 4-5',
      xpRange: '15-40 XP per question',
    },
    {
      id: 'cave-fractions' as Activity,
      name: 'Cave of Fractions',
      description: 'Explore a glowing crystal cave while learning fractions and decimals!',
      image: '/images/math/cave-fractions.png',
      color: 'from-purple-600 to-indigo-800',
      difficulty: 'Grade 4-5',
      xpRange: '15-40 XP per question',
    },
    {
      id: 'bridge-builder' as Activity,
      name: 'Bridge Builder',
      description: 'Build a bridge across the chasm with multi-step word problems!',
      image: '/images/math/bridge-builder.png',
      color: 'from-green-400 to-teal-500',
      difficulty: 'Grade 4-5',
      xpRange: '20-45 XP per question',
    },
  ]

  const handleActivityComplete = (activity: 'peak-climbing' | 'cave-fractions' | 'bridge-builder', score: number, xpEarned: number) => {
    setProgress(prev => ({
      ...prev,
      [activity]: {
        ...(prev as any)[activity],
        completed: (prev as any)[activity].completed + 1,
        bestScore: Math.max((prev as any)[activity].bestScore, score),
        totalXp: (prev as any)[activity].totalXp + xpEarned,
      }
    }))
  }

  const handleStartActivity = (activity: Activity) => {
    setCurrentActivity(activity)
    setShowDifficultySelect(null)
  }

  const handleExitActivity = () => {
    setCurrentActivity('hub')
  }

  // Render activity components
  if (currentActivity === 'peak-climbing') {
    return (
      <PeakClimbing 
        onComplete={(score, xp) => {
          handleActivityComplete('peak-climbing', score, xp)
          handleExitActivity()
        }}
        onExit={handleExitActivity}
        difficulty={selectedDifficulty}
      />
    )
  }

  if (currentActivity === 'cave-fractions') {
    return (
      <CaveOfFractions 
        onComplete={(score, xp) => {
          handleActivityComplete('cave-fractions', score, xp)
          handleExitActivity()
        }}
        onExit={handleExitActivity}
        difficulty={selectedDifficulty}
      />
    )
  }

  if (currentActivity === 'bridge-builder') {
    return (
      <BridgeBuilder 
        onComplete={(score, xp) => {
          handleActivityComplete('bridge-builder', score, xp)
          handleExitActivity()
        }}
        onExit={handleExitActivity}
        difficulty={selectedDifficulty}
      />
    )
  }

  // Difficulty selector modal
  if (showDifficultySelect) {
    const activity = activities.find(a => a.id === showDifficultySelect)
    
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-b from-mountain-purple/30 via-sky-200 to-watercolor-white p-4"
      >
        <div className="max-w-md mx-auto pt-20">
          <WCard variant="world" worldColor="math" className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-6xl mb-4"
            >
              {activity?.image ? (
                <img src={activity.image} alt={activity.name} className="w-24 h-24 object-cover rounded-xl" />
              ) : null}
            </motion.div>
            
            <h2 className="font-amatic text-4xl font-bold text-ink-black mb-2">
              {activity?.name}
            </h2>
            
            <p className="font-patrick text-ink-grey mb-6">
              {activity?.description}
            </p>

            <h3 className="font-caveat text-2xl font-bold text-ink-black mb-4">
              Choose Difficulty
            </h3>

            <div className="space-y-3 mb-6">
              {[
                { id: 'easy', label: 'Easy', desc: 'Warm up with simpler problems', color: 'bg-green-100 text-green-700' },
                { id: 'medium', label: 'Medium', desc: 'Grade-level challenges', color: 'bg-yellow-100 text-yellow-700' },
                { id: 'hard', label: 'Hard', desc: 'Master-level problems', color: 'bg-red-100 text-red-700' },
                { id: 'mixed', label: 'Mixed', desc: 'All difficulties combined', color: 'bg-purple-100 text-purple-700' },
              ].map((diff) => (
                <button
                  key={diff.id}
                  onClick={() => setSelectedDifficulty(diff.id as Difficulty)}
                  className={`w-full p-4 rounded-lg text-left transition-all ${
                    selectedDifficulty === diff.id
                      ? 'ring-2 ring-mountain-purple ' + diff.color
                      : 'bg-watercolor-white hover:bg-gray-50'
                  }`}
                >
                  <div className="font-caveat text-xl font-bold">{diff.label}</div>
                  <div className="font-patrick text-sm text-ink-grey">{diff.desc}</div>
                </button>
              ))}
            </div>

            <div className="flex gap-4">
              <WButton variant="secondary" onClick={() => setShowDifficultySelect(null)}>
                Back
              </WButton>
              <WButton onClick={() => handleStartActivity(showDifficultySelect)}>
                Start Adventure!
              </WButton>
            </div>
          </WCard>
        </div>
      </motion.div>
    )
  }

  // Main hub
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-world-math bg-cover bg-center bg-fixed relative"
    >
      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />
      
      {/* Content */}
      <div className="relative z-10">
      {/* Header */}
      <header className="p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <WButton variant="ghost" size="sm">
              <IconHome size={20} />
            </WButton>
            <div>
              <h1 className="font-amatic text-4xl font-bold text-ink-black">
                Math Mountains
              </h1>
              <p className="font-patrick text-ink-grey">Grade 4-5 Challenge Zone</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <WCard variant="default" className="py-2 px-4 flex items-center gap-2">
              <IconCoin size={20} />
              <span className="font-caveat text-xl font-bold">2,847</span>
            </WCard>
            <WCard variant="achievement" className="py-2 px-4 flex items-center gap-2">
              <IconStar size={20} />
              <span className="font-caveat text-xl font-bold">67</span>
            </WCard>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-12 text-center"
        >
          <h2 className="font-amatic text-5xl font-bold text-ink-black mb-4">
            Welcome to the Peaks! 
          </h2>
          <p className="font-nunito text-xl text-ink-grey max-w-2xl mx-auto">
            Test your skills with challenging multiplication, fractions, and word problems. 
            Each activity brings you closer to becoming a Math Mountain Master!
          </p>
        </motion.div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <WCard
                variant="world"
                worldColor="math"
                className="h-full cursor-pointer group"
                onClick={() => setShowDifficultySelect(activity.id)}
              >
                <div className="text-center">
                  {/* Activity Image */}
                  <motion.div 
                    className="w-28 h-28 mx-auto mb-4 rounded-2xl overflow-hidden border-4 border-white/50 shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <img 
                      src={activity.image} 
                      alt={activity.name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  {/* Name */}
                  <h3 className="font-amatic text-3xl font-bold text-ink-black mb-2">
                    {activity.name}
                  </h3>

                  {/* Description */}
                  <p className="font-patrick text-ink-grey mb-4">
                    {activity.description}
                  </p>

                  {/* Stats */}
                  <div className="flex justify-center gap-4 mb-4 text-sm">
                    <span className="px-3 py-1 bg-mountain-purple/10 rounded-full font-patrick text-mountain-purple">
                      {activity.difficulty}
                    </span>
                    <span className="px-3 py-1 bg-gold-accent/10 rounded-full font-patrick text-gold-accent">
                      {activity.xpRange}
                    </span>
                  </div>

                  {/* Progress */}
                  <div className="mb-4">
                    <WProgress
                      value={(progress as any)[activity.id].completed}
                      max={5}
                      color="math"
                      size="sm"
                      showLabel
                      label={`Sessions: ${(progress as any)[activity.id].completed}`}
                    />
                  </div>

                  {/* Best Score */}
                  {(progress as any)[activity.id].bestScore > 0 && (
                    <div className="text-sm font-patrick text-jade-green mb-4">
                      Best: {(progress as any)[activity.id].bestScore}/{(progress as any)[activity.id].total}
                    </div>
                  )}

                  {/* Start Button */}
                  <WButton variant="primary" className="w-full">
                    {(progress as any)[activity.id].completed > 0 ? 'Play Again' : 'Start Adventure'}
                  </WButton>
                </div>
              </WCard>
            </motion.div>
          ))}
        </div>

        {/* Overall Progress */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <WCard variant="achievement" className="p-8">
            <h3 className="font-caveat text-3xl font-bold text-center text-ink-black mb-6">
              Your Mountain Progress
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="font-amatic text-4xl font-bold text-mountain-purple">
                  {Object.values(progress).reduce((acc, p) => acc + p.completed, 0)}
                </div>
                <div className="font-patrick text-sm text-ink-grey">Sessions Completed</div>
              </div>
              
              <div className="text-center">
                <div className="font-amatic text-4xl font-bold text-gold-accent">
                  {Object.values(progress).reduce((acc, p) => acc + p.totalXp, 0)}
                </div>
                <div className="font-patrick text-sm text-ink-grey">Total XP Earned</div>
              </div>
              
              <div className="text-center">
                <div className="font-amatic text-4xl font-bold text-jade-green">
                  {Math.max(...Object.values(progress).map(p => p.bestScore), 0)}
                </div>
                <div className="font-patrick text-sm text-ink-grey">Best Score</div>
              </div>
              
              <div className="text-center">
                <div className="font-amatic text-4xl font-bold text-purple-600">
                  {activities.length}
                </div>
                <div className="font-patrick text-sm text-ink-grey">Activities Available</div>
              </div>
            </div>
          </WCard>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="p-8 text-center">
        <p className="font-patrick text-ink-grey/60">
          Master the mountains, one problem at a time! 
        </p>
      </footer>
      </div>
    </motion.div>
  )
}
