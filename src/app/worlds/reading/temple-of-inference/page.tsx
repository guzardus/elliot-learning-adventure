'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import WButton from '@/components/WButton'
import WCard from '@/components/WCard'
import WProgress from '@/components/WProgress'
import { IconArrowLeft, IconKey } from '@/components/WIcon'
import { inferencePuzzles, InferencePuzzle, getInferenceSession } from '@/data/readingContent'

const CHAMBER_NAMES = [
  'Entrance Hall',
  'Torchlit Corridor',
  'Ancient Library',
  'Riddle Room',
  'Mystery Chamber',
  'Secret Passage',
  'Hidden Vault',
  'Treasure Room'
]


// SVG Icons
const TempleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#DAA520">
    <path d="M12 2L2 9l2 1v10h16V10l2-1-10-7zM12 4.5L18.5 9h-13L12 4.5zM7 11h10v8H7v-8z"/>
  </svg>
)

const FlameIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#FF4500">
    <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67z"/>
  </svg>
)

const CrownIcon = () => (
  <svg viewBox="0 0 24 24" className="w-16 h-16" fill="#FFD700">
    <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z"/>
  </svg>
)

const TrophyIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#FFD700">
    <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H8v2h8v-2h-3v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/>
  </svg>
)

export default function TempleOfInferencePage() {
  const [puzzles, setPuzzles] = useState<InferencePuzzle[]>([])
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null)
  const [unlockedChambers, setUnlockedChambers] = useState<number[]>([0])
  const [totalCoins, setTotalCoins] = useState(0)
  const [streak, setStreak] = useState(0)
  const [showTreasure, setShowTreasure] = useState(false)

  // Load puzzles
  useEffect(() => {
    const sessionPuzzles = getInferenceSession(10)
    setPuzzles(sessionPuzzles)
  }, [])

  const currentPuzzle = puzzles[currentPuzzleIndex]

  const handleAnswer = (answer: string) => {
    if (feedback || !currentPuzzle) return
    
    setSelectedAnswer(answer)
    const isCorrect = answer === currentPuzzle.correctAnswer
    
    if (isCorrect) {
      setFeedback('correct')
      setTotalCoins(prev => prev + (currentPuzzle.difficulty === 'hard' ? 30 : currentPuzzle.difficulty === 'medium' ? 20 : 15))
      setStreak(prev => prev + 1)
    } else {
      setFeedback('incorrect')
      setStreak(0)
    }
  }

  const handleNext = () => {
    // Unlock next chamber
    setUnlockedChambers(prev => [...prev, currentPuzzleIndex + 1])
    
    if (currentPuzzleIndex < puzzles.length - 1) {
      setCurrentPuzzleIndex(prev => prev + 1)
    } else {
      // Completed all chambers!
      setShowTreasure(true)
    }
    
    setSelectedAnswer(null)
    setFeedback(null)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-200 text-green-800'
      case 'medium': return 'bg-yellow-200 text-yellow-800'
      case 'hard': return 'bg-red-200 text-red-800'
      default: return 'bg-gray-200'
    }
  }

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '★ Apprentice'
      case 'medium': return '★★ Scholar'
      case 'hard': return '★★★ Master'
    }
  }

  if (puzzles.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-amatic">Unlocking the temple...</div>
      </main>
    )
  }

  return (
    <main className="min-h-screen relative overflow-hidden"
    >
      {/* Dark Temple Background */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, #1a1a2e 0%, #16213e 30%, #0f3460 70%, #1a1a2e 100%)'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      {/* Torch Light Effects */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,147,41,0.3) 0%, transparent 70%)'
        }}
        animate={{
          opacity: [0.5, 0.8, 0.5],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      
      <motion.div
        className="absolute top-40 right-20 w-40 h-40 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,147,41,0.25) 0%, transparent 70%)'
        }}
        animate={{
          opacity: [0.4, 0.7, 0.4],
          scale: [1, 1.15, 1]
        }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
      />

      {/* Chamber Progress */}
      <div className="absolute top-32 left-0 right-0 flex justify-center gap-2 px-4"
      >
        {puzzles.slice(0, 10).map((puzzle, index) => {
          const isUnlocked = unlockedChambers.includes(index)
          const isCurrent = index === currentPuzzleIndex
          
          return (
            <motion.div
              key={index}
              className={`w-8 h-12 rounded-t-lg border-2 ${
                isUnlocked 
                  ? 'bg-yellow-600 border-yellow-400' 
                  : isCurrent 
                    ? 'bg-orange-500 border-yellow-300 animate-pulse'
                    : 'bg-gray-700 border-gray-600'
              }`}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              {isUnlocked && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center justify-center h-full text-lg"
                >
                  <FlameIcon />
                </motion.div>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 pt-40">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <Link href="/worlds/reading">
            <WButton variant="ghost" size="sm">
              ← Back to Rainforest
            </WButton>
          </Link>

          <div className="flex items-center gap-3">
            <WCard variant="default" className="py-2 px-4 flex items-center gap-2 bg-white/90"
            >
              <span className="text-xl"><TempleIcon /></span>
              <span className="font-caveat text-xl font-bold">{totalCoins}</span>
            </WCard>
            
            {streak > 0 && (
              <WCard variant="achievement" className="py-2 px-4 flex items-center gap-2"
              >
                <span><FlameIcon /></span>
                <span className="font-caveat text-lg">{streak} streak</span>
              </WCard>
            )}
          </div>
        </header>

        {/* Chamber Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <motion.div
            className="text-6xl mb-2"
            animate={{ 
              filter: ['brightness(1)', 'brightness(1.3)', 'brightness(1)']
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <TempleIcon />
          </motion.div>
          <h1 className="font-amatic text-4xl font-bold text-yellow-100">
            {CHAMBER_NAMES[currentPuzzleIndex] || `Chamber ${currentPuzzleIndex + 1}`}
          </h1>
          <p className="font-nunito text-blue-200">
            Chamber {currentPuzzleIndex + 1} of {puzzles.length}
          </p>
        </motion.div>

        {/* Puzzle Card */}
        <AnimatePresence mode="wait">
          {!showTreasure ? (
            <motion.div
              key={currentPuzzleIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="max-w-2xl mx-auto"
            >
              <WCard className="bg-gray-900/90 backdrop-blur-sm border-yellow-600/30"
            >
                {/* Difficulty Badge */}
                <div className="flex justify-between items-start mb-6"
                >
                  <span className={`inline-block px-3 py-1 rounded-full font-nunito text-sm ${getDifficultyColor(currentPuzzle?.difficulty || 'easy')}`}
                  >
                    {getDifficultyLabel(currentPuzzle?.difficulty || 'easy')}
                  </span>
                  
                  <div className="text-4xl">{currentPuzzle?.emoji}</div>
                </div>

                {/* Scenario */}
                <div className="bg-blue-900/50 rounded-lg p-6 mb-6 border-l-4 border-yellow-500"
                >
                  <p className="font-patrick text-xl text-blue-100 leading-relaxed"
                  >
                    {currentPuzzle?.scenario}
                  </p>
                </div>

                {/* Question */}
                <div className="mb-6"
                >
                  <h3 className="font-amatic text-3xl font-bold text-yellow-100 mb-4"
                  >
                    {currentPuzzle?.question}
                  </h3>
                </div>

                {/* Hint */}
                <AnimatePresence>
                  {feedback === 'incorrect' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-yellow-900/50 rounded-lg p-4 mb-4 border border-yellow-600"
                    >
                      <p className="font-nunito text-yellow-200">
                        Hint: {currentPuzzle?.hint}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Answer Options */}
                <div className="grid gap-3 mb-6"
                >
                  {currentPuzzle?.options.map((option, index) => (
                    <motion.button
                      key={index}
                      className={`p-4 rounded-lg font-nunito text-lg text-left transition-all ${
                        selectedAnswer === option
                          ? 'bg-yellow-600 text-white'
                          : 'bg-gray-800 hover:bg-gray-700 text-gray-100 border border-gray-600'
                      } ${
                        feedback === 'correct' && option === currentPuzzle.correctAnswer
                          ? 'bg-green-600 text-white border-green-500'
                          : ''
                      } ${
                        feedback === 'incorrect' && selectedAnswer === option
                          ? 'bg-red-600 text-white border-red-500'
                          : ''
                      }`}
                      onClick={() => handleAnswer(option)}
                      whileHover={{ scale: feedback ? 1 : 1.02 }}
                      whileTap={{ scale: feedback ? 1 : 0.98 }}
                      disabled={!!feedback}
                    >
                      {option}
                    </motion.button>
                  ))}
                </div>

                {/* Feedback */}
                <AnimatePresence>
                  {feedback === 'correct' && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-center mb-4"
                    >
                      <div className="text-green-400 font-caveat text-2xl">
                        <TrophyIcon /> Chamber Unlocked! 
                        +{currentPuzzle?.difficulty === 'hard' ? 30 : currentPuzzle?.difficulty === 'medium' ? 20 : 15} coins!
                      </div>
                      <p className="font-nunito text-blue-200 mt-2">
                        {currentPuzzle?.explanation}
                      </p>
                      <WButton onClick={handleNext} className="mt-4"
                      >
                        {currentPuzzleIndex < puzzles.length - 1 
                          ? 'Enter Next Chamber →' 
                          : 'Claim Treasure! <TrophyIcon />'}
                      </WButton>
                    </motion.div>
                  )}
                  
                  {feedback === 'incorrect' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center mb-4"
                    >
                      <div className="text-red-400 font-caveat text-2xl"
                      >
                        <span className="text-red-400">✕</span> The door remains locked...
                      </div>
                      <div className="flex gap-3 justify-center mt-4">
                        <WButton 
                          variant="secondary" 
                          onClick={() => {
                            setFeedback(null)
                            setSelectedAnswer(null)
                          }}
                        >
                          Try Again
                        </WButton>
                        
                        <WButton 
                          variant="ghost"
                          onClick={handleNext}
                        >
                          Skip Chamber
                        </WButton>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </WCard>
            </motion.div>
          ) : (
            /* Treasure Room Celebration */
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-xl mx-auto text-center"
            >
              <WCard className="bg-gradient-to-br from-yellow-600 to-yellow-800 border-yellow-400"
            >
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-8xl mb-6"
                >
                  <CrownIcon />
                </motion.div>
                
                <h2 className="font-amatic text-5xl font-bold text-white mb-4"
                >
                  Temple Conquered!
                </h2>
                
                <p className="font-nunito text-xl text-yellow-100 mb-6"
                >
                  You have unlocked all chambers and claimed the ancient treasure!
                </p>
                
                <div className="bg-white/20 rounded-lg p-6 mb-6"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-3xl font-bold text-white">{totalCoins}</div>
                      <div className="text-yellow-200">Coins Earned</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-white">{streak}</div>
                      <div className="text-yellow-200">Final Streak</div>
                    </div>
                  </div>
                </div>
                
                <Link href="/worlds/reading"
                >
                  <WButton className="w-full"
                  >
                    Return to Rainforest
                  </WButton>
                </Link>
              </WCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}
