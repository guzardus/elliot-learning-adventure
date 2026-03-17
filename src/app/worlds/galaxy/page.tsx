'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import WButton from '@/components/WButton'
import WCard from '@/components/WCard'
import WProgress from '@/components/WProgress'
import { IconRocket, IconStar, IconPlanet, IconHome } from '@/components/WIcon'

type Activity = 'hub' | 'comet-chase' | 'nebula-words' | 'black-hole-puzzles'

interface ActivityProgress {
  completed: number
  total: number
  bestScore: number
  totalXp: number
}

export default function GrammarGalaxy() {
  const [currentActivity, setCurrentActivity] = useState<Activity>('hub')
  
  const [progress, setProgress] = useState<Record<'comet-chase' | 'nebula-words' | 'black-hole-puzzles', ActivityProgress>>({
    'comet-chase': { completed: 0, total: 10, bestScore: 0, totalXp: 0 },
    'nebula-words': { completed: 0, total: 10, bestScore: 0, totalXp: 0 },
    'black-hole-puzzles': { completed: 0, total: 8, bestScore: 0, totalXp: 0 },
  })

  const activities: { id: 'comet-chase' | 'nebula-words' | 'black-hole-puzzles'; name: string; description: string; image: string; color: string; difficulty: string; xpRange: string }[] = [
    {
      id: 'comet-chase',
      name: 'Comet Chase',
      description: 'Race through the cosmos collecting correct grammar answers!',
      image: '/images/galaxy/comet-chase.png',
      color: 'from-cosmic-teal to-nebula-purple',
      difficulty: 'Grade 3-5',
      xpRange: '15-40 XP per question',
    },
    {
      id: 'nebula-words',
      name: 'Nebula Words',
      description: 'Navigate colorful nebulae while mastering spelling patterns!',
      image: '/images/galaxy/nebula-words.png',
      color: 'from-meteor-gold to-nebula-purple',
      difficulty: 'Grade 3-5',
      xpRange: '15-40 XP per question',
    },
    {
      id: 'black-hole-puzzles',
      name: 'Black Hole Puzzles',
      description: 'Solve punctuation mysteries before they get sucked into the void!',
      image: '/images/galaxy/black-hole.png',
      color: 'from-midnight-indigo to-cosmic-teal',
      difficulty: 'Grade 3-5',
      xpRange: '20-45 XP per question',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-world-galaxy bg-cover bg-center bg-fixed relative"
    >
      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60" />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="p-4">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link href="/worlds">
                <WButton variant="ghost" size="sm" className="text-white">
                  <IconHome size={20} />
                </WButton>
              </Link>
              <div>
                <h1 className="font-amatic text-4xl font-bold text-white drop-shadow-lg">
                  Grammar Galaxy
                </h1>
                <p className="font-patrick text-white/80">Grade 3-5 Language Adventure</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <WCard variant="default" className="py-2 px-4 flex items-center gap-2 bg-white/90">
                <IconPlanet size={20} />
                <span className="font-caveat text-xl font-bold">1,500</span>
              </WCard>
              <WCard variant="achievement" className="py-2 px-4 flex items-center gap-2">
                <IconStar size={20} />
                <span className="font-caveat text-xl font-bold">35</span>
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
            {/* Space Explorer Character */}
            <motion.div
              className="relative inline-block mb-6"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <img 
                src="/images/galaxy/space-explorer.png" 
                alt="Space Explorer"
                className="w-40 h-40 object-contain drop-shadow-[0_0_30px_rgba(147,112,219,0.5)]"
              />
            </motion.div>

            <h2 className="font-amatic text-5xl font-bold text-white mb-4 drop-shadow-lg">
              Welcome to the Stars! 
            </h2>
            <p className="font-nunito text-xl text-white/90 max-w-2xl mx-auto drop-shadow">
              Blast off on an intergalactic grammar adventure! Master punctuation, spelling, and sentence structure 
              as you explore the far reaches of the galaxy.
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
                <Link href={`/worlds/galaxy/${activity.id.replace('-', '/')}`}>
                  <WCard
                    variant="world"
                    worldColor="galaxy"
                    className="h-full cursor-pointer group bg-white/10 backdrop-blur-sm border-white/20"
                  >
                    <div className="text-center">
                      {/* Activity Image */}
                      <motion.div 
                        className="w-28 h-28 mx-auto mb-4 rounded-2xl overflow-hidden border-4 border-white/30 shadow-[0_0_30px_rgba(147,112,219,0.3)]"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <img 
                          src={activity.image} 
                          alt={activity.name}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>

                      {/* Name */}
                      <h3 className="font-amatic text-3xl font-bold text-white mb-2 drop-shadow-lg">
                        {activity.name}
                      </h3>

                      {/* Description */}
                      <p className="font-patrick text-white/80 mb-4">
                        {activity.description}
                      </p>

                      {/* Stats */}
                      <div className="flex justify-center gap-4 mb-4 text-sm">
                        <span className="px-3 py-1 bg-nebula-purple/30 rounded-full font-patrick text-white border border-white/20">
                          {activity.difficulty}
                        </span>
                        <span className="px-3 py-1 bg-meteor-gold/20 rounded-full font-patrick text-meteor-gold border border-meteor-gold/30">
                          {activity.xpRange}
                        </span>
                      </div>

                      {/* Progress */}
                      <div className="mb-4">
                        <WProgress
                          value={progress[activity.id].completed}
                          max={5}
                          color="galaxy"
                          size="sm"
                          showLabel
                          label={`Sessions: ${progress[activity.id].completed}`}
                        />
                      </div>

                      {/* Best Score */}
                      {progress[activity.id].bestScore > 0 && (
                        <div className="text-sm font-patrick text-cosmic-teal mb-4">
                          Best: {progress[activity.id].bestScore}/{progress[activity.id].total}
                        </div>
                      )}

                      {/* Start Button */}
                      <WButton variant="primary" className="w-full bg-gradient-to-r from-nebula-purple to-cosmic-teal">
                        {progress[activity.id].completed > 0 ? 'Launch Again' : 'Start Mission'}
                      </WButton>
                    </div>
                  </WCard>
                </Link>
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
            <WCard variant="achievement" className="p-8 bg-white/10 backdrop-blur-sm border-white/20">
              <h3 className="font-caveat text-3xl font-bold text-center text-white mb-6 drop-shadow-lg">
                Your Galactic Progress
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="font-amatic text-4xl font-bold text-nebula-purple drop-shadow">
                    {Object.values(progress).reduce((acc, p) => acc + p.completed, 0)}
                  </div>
                  <div className="font-patrick text-sm text-white/70">Missions Completed</div>
                </div>
                
                <div className="text-center">
                  <div className="font-amatic text-4xl font-bold text-meteor-gold drop-shadow">
                    {Object.values(progress).reduce((acc, p) => acc + p.totalXp, 0)}
                  </div>
                  <div className="font-patrick text-sm text-white/70">Total XP Earned</div>
                </div>
                
                <div className="text-center">
                  <div className="font-amatic text-4xl font-bold text-cosmic-teal drop-shadow">
                    {Math.max(...Object.values(progress).map(p => p.bestScore), 0)}
                  </div>
                  <div className="font-patrick text-sm text-white/70">Best Score</div>
                </div>
                
                <div className="text-center">
                  <div className="font-amatic text-4xl font-bold text-white drop-shadow">
                    {activities.length}
                  </div>
                  <div className="font-patrick text-sm text-white/70">Activities Available</div>
                </div>
              </div>
            </WCard>
          </motion.div>
        </main>

          {/* Galaxy Badges */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="max-w-4xl mx-auto mt-12 mb-8"
          >
            <h3 className="font-caveat text-2xl font-bold text-center text-white mb-6 drop-shadow-lg">
              Galaxy Explorer Badges
            </h3>
            
            <div className="flex justify-center gap-6">
              {[
                { image: '/images/galaxy/badge-grammar-master.png', name: 'Grammar Master', desc: 'Complete 10 Comet Chase missions' },
                { image: '/images/galaxy/badge-spelling-star.png', name: 'Spelling Star', desc: 'Collect 50 words in Nebula Words' },
                { image: '/images/galaxy/badge-punctuation-pro.png', name: 'Punctuation Pro', desc: 'Solve 20 Black Hole puzzles' },
              ].map((badge, index) => (
                <motion.div
                  key={badge.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center w-40"
                >
                  <div className="w-16 h-16 mx-auto mb-2 opacity-50 grayscale">
                    <img src={badge.image} alt={badge.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="font-caveat text-lg font-bold text-white">{badge.name}</div>
                  <div className="font-nunito text-xs text-white/70">{badge.desc}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        {/* Footer */}
        <footer className="p-8 text-center">
          <p className="font-patrick text-white/60">
            Explore the grammar cosmos, one star at a time! 
          </p>
        </footer>
      </div>
    </motion.div>
  )
}
