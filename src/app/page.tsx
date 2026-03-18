'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import WButton from '@/components/WButton'
import WCard from '@/components/WCard'
import { 
  IconCoin, 
  IconStar, 
  IconCompass, 
  IconHome,
  IconMedal,
  IconPlay,
  IconTrophy,
  IconFlame
} from '@/components/WIcon'
import { useGamificationContext } from '@/components/GamificationProvider'
import { XPBar } from '@/components/XPBar'
import { StreakTracker } from '@/components/StreakTracker'
import { DailyChallenges } from '@/components/DailyChallenges'
import { BadgeDisplay } from '@/components/BadgeDisplay'

type World = 'math' | 'rainforest' | 'galaxy'

const worlds = [
  {
    id: 'math' as World,
    name: 'Math Mountains',
    description: 'Climb peaks and master multiplication',
    bgClass: 'bg-world-math',
    worldKey: 'math' as const,
    worldImage: '/images/worlds/world-math.png',
    href: '/worlds/math',
  },
  {
    id: 'rainforest' as World,
    name: 'Reading Rainforest',
    description: 'Explore stories and discover words',
    bgClass: 'bg-world-rainforest',
    worldKey: 'reading' as const,
    worldImage: '/images/worlds/world-rainforest.png',
    href: '/worlds/reading',
  },
  {
    id: 'galaxy' as World,
    name: 'Grammar Galaxy',
    description: 'Navigate space and learn language',
    bgClass: 'bg-world-galaxy',
    worldKey: 'grammar' as const,
    worldImage: '/images/worlds/world-galaxy.png',
    href: '/worlds/galaxy',
  },
]

export default function Home() {
  const [selectedWorld, setSelectedWorld] = useState<World>('math')
  const [showIntro, setShowIntro] = useState(true)
  const { player, getUnlockedBadges } = useGamificationContext()
  
  const unlockedBadges = getUnlockedBadges()
  
  // Calculate total activities
  const totalActivities = 
    player.worldProgress.math.activitiesCompleted +
    player.worldProgress.reading.activitiesCompleted +
    player.worldProgress.grammar.activitiesCompleted

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background based on selected world */}
      <motion.div
        className={`absolute inset-0 ${worlds.find(w => w.id === selectedWorld)?.bgClass || 'bg-world-math'} bg-cover bg-center bg-no-repeat transition-all duration-1000`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
      
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <motion.div 
            className="flex items-center gap-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <WButton variant="icon" size="sm" className="w-12 h-12 flex items-center justify-center">
              <IconHome size={20} />
            </WButton>
            <div>
              <h1 className="font-amatic text-4xl font-bold text-ink-black">
                Elliot's Adventure
              </h1>
              <p className="font-patrick text-ink-grey">Grade 3-5 Learning Journey</p>
            </div>
          </motion.div>

          <motion.div 
            className="flex items-center gap-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* XP Bar */}
            <XPBar compact className="hidden sm:block" />

            {/* Level Badge */}
            <WCard variant="achievement" className="py-2 px-4 flex items-center gap-2">
              <IconStar size={20} className="text-amber-500" />
              <span className="font-caveat text-xl font-bold">Lvl {player.level}</span>
            </WCard>

            <WButton variant="secondary" size="sm">
              <IconCompass size={20} />
            </WButton>
          </motion.div>
        </header>

        {/* Welcome Card */}
        {showIntro && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-8"
          >
            <WCard variant="world" worldColor={selectedWorld} className="max-w-2xl mx-auto">
              <div className="text-center py-8">
                <h2 className="font-amatic text-5xl font-bold mb-4 text-ink-black">
                  Welcome Back, Elliot!
                </h2>
                <p className="font-nunito text-lg text-ink-grey mb-6">
                  {player.streak.current > 0 ? (
                    <>You have a <span className="font-bold text-orange-600">{player.streak.current}-day streak</span>! Keep it up! 🔥</>
                  ) : (
                    "Start your learning adventure today!"
                  )}
                </p>
                
                <div className="flex justify-center gap-4 mb-6">
                  <div className="flex items-center gap-2 bg-white/50 px-4 py-2 rounded-lg">
                    <IconTrophy size={20} className="text-amber-600" />
                    <span className="font-bold">{unlockedBadges.length} Badges Earned</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/50 px-4 py-2 rounded-lg">
                    <IconFlame size={20} className="text-orange-600" />
                    <span className="font-bold">{player.xp.toLocaleString()} XP</span>
                  </div>
                </div>
                
                <div className="flex justify-center gap-4">
                  <WButton onClick={() => setShowIntro(false)} icon={<IconPlay size={20} />}>
                    Continue Adventure
                  </WButton>
                </div>
              </div>
            </WCard>
          </motion.div>
        )}

        {/* Gamification Dashboard */}
        {!showIntro && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
          >
            <XPBar className="md:col-span-2" />
            <StreakTracker />
            <DailyChallenges />
          </motion.section>
        )}

        {/* World Selector */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="font-caveat text-3xl font-bold text-center mb-8 text-ink-black">
            Choose Your World
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {worlds.map((world, index) => {
              const worldProgress = player.worldProgress[world.worldKey]
              return (
                <motion.div
                  key={world.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                >
                  <WCard
                    variant="world"
                    worldColor={world.id}
                    className={`h-full cursor-pointer transition-all duration-300 ${
                      selectedWorld === world.id ? 'ring-4 ring-white/50 scale-105' : 'hover:scale-102'
                    }`}
                    onClick={() => setSelectedWorld(world.id)}
                  >
                    <div className="text-center py-6">
                      {/* World Icon Image */}
                      <motion.div 
                        className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white/30 shadow-lg"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <img 
                          src={world.worldImage} 
                          alt={world.name}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>

                      <h3 className="font-amatic text-3xl font-bold mb-2 text-white drop-shadow-lg">
                        {world.name}
                      </h3>
                      
                      <p className="font-nunito text-white/90 mb-4 drop-shadow">
                        {world.description}
                      </p>

                      {/* Progress */}
                      <div className="bg-black/20 rounded-lg p-3 mb-4">
                        <div className="flex justify-between text-sm text-white/90 mb-1">
                          <span>Activities</span>
                          <span>{worldProgress.activitiesCompleted}</span>
                        </div>
                        <div className="flex justify-between text-sm text-white/90">
                          <span>Perfect Sessions</span>
                          <span>{worldProgress.perfectSessions}</span>
                        </div>
                      </div>

                      <div className="flex justify-center items-center gap-2">
                        <Link href={world.href}>
                          <WButton 
                            variant={selectedWorld === world.id ? 'primary' : 'secondary'}
                            size="sm"
                          >
                            {selectedWorld === world.id ? 'Selected' : 'Explore'}
                          </WButton>
                        </Link>
                      </div>
                    </div>
                  </WCard>
                </motion.div>
              )
            })}
          </div>
        </motion.section>

        {/* Stats Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <h2 className="font-caveat text-3xl font-bold text-center mb-8 text-ink-black">
            Your Progress
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Level', value: player.level.toString(), icon: IconStar },
              { label: 'Total XP', value: player.xp.toLocaleString(), icon: IconCoin },
              { label: 'Badges', value: unlockedBadges.length.toString(), icon: IconMedal },
              { label: 'Activities', value: totalActivities.toString(), icon: IconCompass },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
              >
                <WCard variant="default" className="text-center py-4">
                  <stat.icon size={28} className="mx-auto mb-2" />
                  <div className="font-amatic text-3xl font-bold text-ink-black">
                    {stat.value}
                  </div>
                  <div className="font-nunito text-sm text-ink-grey">
                    {stat.label}
                  </div>
                </WCard>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Badge Collection Preview */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <BadgeDisplay compact />
        </motion.section>

        {/* Footer */}
        <footer className="mt-16 text-center">
          <p className="font-nunito text-ink-grey/60 text-sm">
            Elliot's Learning Adventure - A Living Watercolor Painting
          </p>
        </footer>
      </div>
    </main>
  )
}