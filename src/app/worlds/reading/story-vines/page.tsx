'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import WButton from '@/components/WButton'
import WCard from '@/components/WCard'
import WProgress from '@/components/WProgress'
import { IconArrowLeft, IconBook, IconHint, IconCheck } from '@/components/WIcon'
import { getSessionPassages, ReadingPassage, ReadingQuestion } from '@/data/readingContent'

const VINE_NAMES = [
  'Jungle Entrance',
  'Vine Crossing',
  'Canopy Platform',
  'Ancient Tree',
  'Hidden Grove',
  'Monkey Bridge',
  'Parrot Perch',
  'Waterfall View',
  'Misty Clearing',
  'Temple Approach'
]

// SVG Icons replacing emojis
const ClimbingRangerSVG = () => (
  <svg viewBox="0 0 100 100" className="w-24 h-24 mx-auto">
    <circle cx="50" cy="25" r="12" fill="#F5DEB3" />
    <rect x="38" y="38" width="24" height="30" rx="5" fill="#2E8B57" />
    <line x1="30" y1="45" x2="20" y2="60" stroke="#F5DEB3" strokeWidth="6" strokeLinecap="round" />
    <line x1="70" y1="45" x2="80" y2="60" stroke="#F5DEB3" strokeWidth="6" strokeLinecap="round" />
    <line x1="42" y1="68" x2="35" y2="90" stroke="#8B4513" strokeWidth="6" strokeLinecap="round" />
    <line x1="58" y1="68" x2="65" y2="85" stroke="#8B4513" strokeWidth="6" strokeLinecap="round" />
    <ellipse cx="50" cy="12" rx="15" ry="8" fill="#8B4513" />
  </svg>
)

const LightbulbSVG = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 inline-block mr-2" fill="#FFD700">
    <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6A4.997 4.997 0 0 1 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"/>
  </svg>
)

const CelebrationSVG = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 inline-block mr-2" fill="#FF6B6B">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
    <circle cx="9" cy="10" r="1.5" fill="#FFD93D"/>
    <circle cx="15" cy="10" r="1.5" fill="#FFD93D"/>
    <path d="M12 17.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" fill="#FF6B6B"/>
  </svg>
)

const CrossSVG = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 inline-block mr-2" fill="#DC143C">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
  </svg>
)

const LeafSVG = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 inline-block" fill="#2E8B57">
    <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"/>
  </svg>
)

export default function StoryVinesPage() {
  const [passages, setPassages] = useState<ReadingPassage[]>([])
  const [currentPassageIndex, setCurrentPassageIndex] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showHint, setShowHint] = useState(false)
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null)
  const [completedPlatforms, setCompletedPlatforms] = useState<number[]>([0])
  const [totalCoins, setTotalCoins] = useState(0)
  const [showPassage, setShowPassage] = useState(true)

  // Load passages on mount
  useEffect(() => {
    const sessionPassages = getSessionPassages(10)
    setPassages(sessionPassages)
  }, [])

  const currentPassage = passages[currentPassageIndex]
  const currentQuestion = currentPassage?.questions[currentQuestionIndex]

  const handleAnswer = (answer: string) => {
    if (feedback || !currentQuestion) return
    
    setSelectedAnswer(answer)
    const isCorrect = answer === currentQuestion.correctAnswer.toString()
    
    if (isCorrect) {
      setFeedback('correct')
      setTotalCoins(prev => prev + currentQuestion.xpReward)
    } else {
      setFeedback('incorrect')
    }
  }

  const handleNext = () => {
    if (!currentPassage) return

    // Move to next question or next passage
    if (currentQuestionIndex < currentPassage.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    } else {
      // Completed this passage, move to next
      setCompletedPlatforms(prev => [...prev, currentPassageIndex + 1])
      if (currentPassageIndex < passages.length - 1) {
        setCurrentPassageIndex(prev => prev + 1)
        setCurrentQuestionIndex(0)
        setShowPassage(true)
      }
    }
    
    setSelectedAnswer(null)
    setFeedback(null)
    setShowHint(false)
  }

  if (passages.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-amatic">Loading jungle passages...</div>
      </main>
    )
  }

  return (
    <main className="min-h-screen relative overflow-hidden"
    >
      {/* Jungle Background */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, #0d3328 0%, #1a4d3a 30%, #2d6a4f 70%, #1a3a2a 100%)'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      {/* Vine Network Visualization */}
      <div className="absolute top-20 left-0 right-0 h-24 pointer-events-none">
        <svg className="w-full h-full">
          {passages.slice(0, 10).map((_, index) => {
            const isCompleted = completedPlatforms.includes(index)
            const isCurrent = index === currentPassageIndex
            const isUnlocked = index <= currentPassageIndex
            
            return (
              <g key={index}>
                {/* Vine line */}
                {index < 9 && (
                  <line
                    x1={`${10 + index * 10}%`}
                    y1="50%"
                    x2={`${10 + (index + 1) * 10}%`}
                    y2="50%"
                    stroke={isCompleted ? '#2E8B57' : '#8FBC8F'}
                    strokeWidth="4"
                    strokeDasharray={isCompleted ? '0' : '5,5'}
                  />
                )}
                {/* Platform */}
                <circle
                  cx={`${10 + index * 10}%`}
                  cy="50%"
                  r="20"
                  fill={isCompleted ? '#2E8B57' : isCurrent ? '#DAA520' : isUnlocked ? '#8FBC8F' : '#4a5568'}
                  stroke="white"
                  strokeWidth="2"
                />
                {/* Number */}
                <text
                  x={`${10 + index * 10}%`}
                  y="55%"
                  textAnchor="middle"
                  fill="white"
                  fontSize="14"
                  fontWeight="bold"
                >
                  {index + 1}
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 pt-32">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <Link href="/worlds/reading">
            <WButton variant="ghost" size="sm">
              ← Back to Rainforest
            </WButton>
          </Link>

          <div className="flex items-center gap-3">
            <WCard variant="default" className="py-2 px-4 flex items-center gap-2 bg-white/90">
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor"><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/></svg>
              <span className="font-caveat text-xl font-bold">{totalCoins}</span>
            </WCard>
          </div>
        </header>

        {/* Current Location */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <div className="inline-block">
            <motion.div
              className="text-6xl mb-2"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ClimbingRangerSVG />
            </motion.div>
          </div>
          <h1 className="font-amatic text-4xl font-bold text-white">
            {VINE_NAMES[currentPassageIndex] || `Platform ${currentPassageIndex + 1}`}
          </h1>
          <p className="font-nunito text-green-100">
            Passage {currentPassageIndex + 1} of {passages.length} • Question {currentQuestionIndex + 1} of {currentPassage?.questions.length}
          </p>
        </motion.div>

        {/* Main Content Card */}
        <AnimatePresence mode="wait">
          {showPassage ? (
            <motion.div
              key="passage"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className="max-w-3xl mx-auto mb-6"
            >
              <WCard className="bg-white/95 backdrop-blur-sm"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">{currentPassage?.emoji}</span>
                  <div>
                    <h2 className="font-amatic text-3xl font-bold text-ink-black">{currentPassage?.title}</h2>
                    <p className="font-nunito text-sm text-ink-grey">
                      {currentPassage?.wordCount} words • Grade {currentPassage?.gradeLevel}
                    </p>
                  </div>
                </div>

                <div className="font-patrick text-lg text-ink-black leading-relaxed mb-6 whitespace-pre-wrap"
                >
                  {currentPassage?.content}
                </div>

                <div className="flex gap-2 flex-wrap">
                  {currentPassage?.vocabulary.map((word, idx) => (
                    <motion.div
                      key={idx}
                      className="inline-flex items-center gap-1 bg-green-100 rounded-full px-3 py-1 cursor-pointer hover:bg-green-200"
                      whileHover={{ scale: 1.05 }}
                      title={`${word.word}: ${word.definition}`}
                    >
                      <span>{word.emoji}</span>
                      <span className="font-nunito text-sm font-bold">{word.word}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <WButton onClick={() => setShowPassage(false)}>
                    Start Questions
                  </WButton>
                </div>
              </WCard>
            </motion.div>
          ) : (
            <motion.div
              key="question"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="max-w-2xl mx-auto"
            >
              <WCard className="bg-white/95 backdrop-blur-sm"
              >
                <div className="mb-6">
                  <span className="inline-block px-4 py-1 bg-green-200 rounded-full font-nunito text-sm text-green-800 mb-4"
                  >
                    {currentQuestion?.difficulty === 'easy' ? '★ Beginner' : 
                     currentQuestion?.difficulty === 'medium' ? '★★ Explorer' : 
                     '★★★ Ranger'}
                  </span>

                  <h3 className="font-caveat text-2xl font-bold text-ink-black mb-2">
                    {currentQuestion?.context}
                  </h3>
                  
                  <div className="font-amatic text-3xl text-ink-black">
                    {currentQuestion?.question}
                  </div>
                </div>

                <AnimatePresence>
                  {showHint && currentQuestion?.hint && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-yellow-100 rounded-lg p-4 mb-4"
                    >
                      <p className="font-patrick text-ink-grey">
                        {currentQuestion.hint}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Answer Options */}
                <div className="grid gap-3 mb-6">
                  {currentQuestion?.options?.map((option, index) => (
                    <motion.button
                      key={index}
                      className={`p-4 rounded-lg font-nunito text-lg text-left transition-all ${
                        selectedAnswer === option
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-100 hover:bg-gray-200 text-ink-black'
                      } ${
                        feedback === 'correct' && option === currentQuestion.correctAnswer.toString()
                          ? 'bg-green-600 text-white'
                          : ''
                      } ${
                        feedback === 'incorrect' && selectedAnswer === option
                          ? 'bg-red-400 text-white'
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
                      <div className="text-green-600 font-caveat text-2xl">
                        <CelebrationSVG /> Correct! +{currentQuestion?.xpReward} points!
                      </div>
                      <p className="font-nunito text-ink-grey mt-2">
                        {currentQuestion?.explanation}
                      </p>
                      <WButton onClick={handleNext} className="mt-4">
                        {currentQuestionIndex < (currentPassage?.questions.length || 0) - 1 
                          ? 'Next Question →' 
                          : 'Next Passage <LeafSVG />'}
                      </WButton>
                    </motion.div>
                  )}
                  
                  {feedback === 'incorrect' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center mb-4"
                    >
                      <div className="text-red-500 font-caveat text-2xl">
                        <CrossSVG /> Not quite. Try again!
                      </div>
                      <WButton 
                        variant="secondary" 
                        onClick={() => {
                          setFeedback(null)
                          setSelectedAnswer(null)
                        }}
                        className="mt-4"
                      >
                        Try Again
                      </WButton>
                    </motion.div>
                  )}
                </AnimatePresence>

                {!feedback && (
                  <div className="flex justify-center gap-3">
                    <WButton 
                      variant="secondary" 
                      size="sm"
                      onClick={() => setShowHint(!showHint)}
                    >
                      <LightbulbSVG /> {showHint ? 'Hide Hint' : 'Show Hint'}
                    </WButton>
                    
                    <WButton 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setShowPassage(true)}
                    >
                      Reread Passage
                    </WButton>
                  </div>
                )}
              </WCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}
