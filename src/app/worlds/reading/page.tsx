'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import WButton from '@/components/WButton'
import WCard from '@/components/WCard'
import WProgress from '@/components/WProgress'
import { IconBook, IconLeaf, IconTree, IconPlayerPlay } from '@/components/WIcon'

const ACTIVITIES = [
  {
    id: 'story-vines',
    name: 'Story Vines',
    description: 'Swing through the jungle reading passages and answering questions',
    image: '/images/reading-rainforest/story-vines.png',
    color: 'jade',
    progress: 0,
    locked: false
  },
  {
    id: 'vocabulary-treasures',
    name: 'Vocabulary Treasures',
    description: 'Discover hidden words and build your vocabulary collection',
    image: '/images/reading-rainforest/vocab-treasures.png',
    color: 'gold',
    progress: 0,
    locked: false
  },
  {
    id: 'temple-of-inference',
    name: 'Temple of Inference',
    description: 'Solve puzzles in the ancient temple to unlock secrets',
    image: '/images/reading-rainforest/temple-inference.png',
    color: 'stone',
    progress: 0,
    locked: false
  }
]

const ACHIEVEMENTS = [
  { image: '/images/reading-rainforest/badge-bookworm.png', name: 'Book Worm', desc: 'Read 10 passages' },
  { image: '/images/reading-rainforest/badge-wordcollector.png', name: 'Word Collector', desc: 'Learn 50 words' },
  { image: '/images/reading-rainforest/badge-detective.png', name: 'Detective', desc: 'Solve 20 inference puzzles' },
]

const BookIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/>
  </svg>
)

const StarIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
)

export default function ReadingRainforestPage() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Generated Jungle Background */}
      <motion.div
        className="absolute inset-0 bg-world-rainforest bg-cover bg-center bg-fixed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <Link href="/worlds">
            <WButton variant="ghost" size="sm" className="text-white">
              <span className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                </svg>
                Back to Worlds
              </span>
            </WButton>
          </Link>

          <div className="flex items-center gap-4">
            <WCard variant="default" className="py-2 px-4 flex items-center gap-2 bg-white/90">
              <BookIcon />
              <span className="font-caveat text-xl font-bold">1,247</span>
            </WCard>
            <WCard variant="achievement" className="py-2 px-4 flex items-center gap-2">
              <StarIcon />
              <span className="font-caveat text-xl font-bold">42</span>
            </WCard>
          </div>
        </header>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          {/* Reading Ranger Character */}
          <motion.div
            className="relative inline-block mb-6"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <img 
              src="/images/reading-rainforest/reading-ranger.png" 
              alt="Reading Ranger"
              className="w-32 h-32 object-contain drop-shadow-2xl"
            />
          </motion.div>

          <h1 className="font-amatic text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Reading Rainforest
          </h1>
          <p className="font-nunito text-xl text-green-100 max-w-2xl mx-auto drop-shadow">
            Join the Reading Ranger on a jungle adventure! 
            Discover stories, collect vocabulary treasures, 
            and unlock the secrets of the ancient temple.
          </p>
        </motion.div>

        {/* Activities Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {ACTIVITIES.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <Link href={`/worlds/reading/${activity.id}`}>
                <WCard
                  variant="world"
                  worldColor="rainforest"
                  className={`h-full cursor-pointer transition-all hover:scale-105 ${
                    activity.locked ? 'opacity-60' : ''
                  }`}
                >
                  <div className="text-center py-6">
                    {/* Activity Image */}
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-24 h-24 mx-auto mb-4 rounded-2xl overflow-hidden border-4 border-white/50 shadow-lg"
                    >
                      <img src={activity.image} alt={activity.name} className="w-full h-full object-cover" />
                    </motion.div>
                    
                    <h3 className="font-amatic text-3xl font-bold text-ink-black mb-2">
                      {activity.name}
                    </h3>
                    <p className="font-nunito text-ink-grey mb-4">
                      {activity.description}
                    </p>

                    {activity.locked ? (
                      <div className="flex items-center justify-center gap-2 text-ink-grey">
                        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                          <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                        </svg>
                        <span className="text-sm">Complete previous activity to unlock</span>
                      </div>
                    ) : (
                      <>
                        <WProgress 
                          value={activity.progress} 
                          max={100}
                          className="mb-2"
                        />
                        <WButton size="sm" className="w-full">
                          <span className="flex items-center justify-center gap-2">
                            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                            {activity.progress > 0 ? 'Continue' : 'Start'}
                          </span>
                        </WButton>
                      </>
                    )}
                  </div>
                </WCard>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Progress Overview */}
        <WCard variant="default" className="mb-8 bg-white/95">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-amatic text-3xl font-bold text-ink-black">
              Your Reading Journey
            </h2>
            <span className="font-nunito text-ink-grey">
              Level 1 • 0/500 questions
            </span>
          </div>
          
          <WProgress value={0} max={100} />
          
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-2">
                <svg viewBox="0 0 24 24" fill="#2E8B57">
                  <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/>
                </svg>
              </div>
              <div className="font-caveat text-2xl font-bold">0</div>
              <div className="font-nunito text-sm text-ink-grey">Passages Read</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-2">
                <svg viewBox="0 0 24 24" fill="#DAA520">
                  <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                </svg>
              </div>
              <div className="font-caveat text-2xl font-bold">0</div>
              <div className="font-nunito text-sm text-ink-grey">Words Collected</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-2">
                <svg viewBox="0 0 24 24" fill="#696969">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                  <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" fill="currentColor"/>
                </svg>
              </div>
              <div className="font-caveat text-2xl font-bold">0</div>
              <div className="font-nunito text-sm text-ink-grey">Temples Explored</div>
            </div>
          </div>
        </WCard>

        {/* Achievements */}
        <div className="text-center">
          <h3 className="font-amatic text-2xl font-bold text-white mb-4 drop-shadow-lg">
            Reading Ranger Badges
          </h3>
          
          <div className="flex justify-center gap-4">
            {ACHIEVEMENTS.map((achievement, index) => (
              <motion.div
                key={achievement.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-2 opacity-50 grayscale">
                  <img src={achievement.image} alt={achievement.name} className="w-full h-full object-contain" />
                </div>
                <div className="font-caveat text-lg font-bold text-white">{achievement.name}</div>
                <div className="font-nunito text-xs text-green-100">{achievement.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
