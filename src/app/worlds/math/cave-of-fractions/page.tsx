'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import WButton from '@/components/WButton'
import WCard from '@/components/WCard'
import WProgress from '@/components/WProgress'
import { 
  IconArrowLeft, 
  IconCoin, 
  IconStar, 
  IconCheck,
  IconHint
} from '@/components/WIcon'
import { getSessionQuestions, MathQuestion } from '@/data/mathQuestions'

interface Gem {
  id: number
  collected: boolean
}

const GEM_COLORS = ['💎', '💠', '🔷', '🔹', '♦️', '💧', '🧊', '⚗️']

// Total gems to show per session
const TOTAL_GEMS = 40

export default function CaveOfFractionsPage() {
  const [questions, setQuestions] = useState<MathQuestion[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showHint, setShowHint] = useState(false)
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null)
  const [coins, setCoins] = useState(1247)
  const [stars, setStars] = useState(42)
  const [collectedGems, setCollectedGems] = useState<number[]>([])
  const [streak, setStreak] = useState(0)
  const [options, setOptions] = useState<string[]>([])

  // Load random fraction questions on mount
  useEffect(() => {
    const sessionQuestions = getSessionQuestions(TOTAL_GEMS, 'fractions')
    setQuestions(sessionQuestions)
  }, [])

  const question = questions[currentQuestion]

  // Generate answer options for the current question
  useEffect(() => {
    if (!question) return
    
    const correct = question.correctAnswer.toString()
    
    // Generate plausible wrong answers based on question type
    let wrongAnswers: string[] = []
    
    if (question.question.includes('decimal')) {
      // For fraction to decimal questions
      wrongAnswers = ['0.1', '0.2', '0.3', '0.4', '0.6', '0.7', '0.9', '1.0', '0.15', '0.35']
    } else if (question.question.includes('fraction')) {
      // For decimal to fraction questions
      wrongAnswers = ['1/2', '1/3', '2/3', '1/4', '3/4', '1/5', '2/5', '3/5', '4/5', '1/6']
    } else {
      // For other fraction operations
      const num = parseFloat(correct) || 0
      wrongAnswers = [
        (num + 0.1).toFixed(2),
        (num - 0.1).toFixed(2),
        (num * 2).toFixed(2),
        (num / 2).toFixed(2),
        (num + 0.25).toFixed(2),
        '1/2', '1/3', '2/3', '3/4', '1/5'
      ]
    }
    
    // Filter out the correct answer and duplicates
    wrongAnswers = wrongAnswers.filter(a => a !== correct)
    
    // Shuffle and pick 3 wrong answers
    const shuffledWrong = [...wrongAnswers].sort(() => Math.random() - 0.5).slice(0, 3)
    
    // Combine and shuffle all options
    const allOptions = [...shuffledWrong, correct].sort(() => Math.random() - 0.5)
    
    setOptions(allOptions)
    setSelectedAnswer(null)
    setFeedback(null)
    setShowHint(false)
  }, [currentQuestion, question])

  function handleSubmit() {
    if (!selectedAnswer || !question) return

    const isCorrect = selectedAnswer === question.correctAnswer.toString()

    if (isCorrect) {
      setFeedback('correct')
      setCoins(prev => prev + question.xpReward)
      setCollectedGems(prev => [...prev, currentQuestion])
      setStreak(prev => prev + 1)
      
      setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(prev => prev + 1)
        }
      }, 1500)
    } else {
      setFeedback('incorrect')
      setStreak(0)
    }
  }

  if (questions.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-midnight-indigo/90 via-midnight-indigo/80 to-ink-black/90">
        <div className="text-2xl font-amatic text-white">Entering the cave...</div>
      </main>
    )
  }

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Dark cave background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-midnight-indigo/90 via-midnight-indigo/80 to-ink-black/90"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      {/* Glowing gems decoration */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 16 }).map((_, index) => {
          const isCollected = collectedGems.includes(index)
          const gemEmoji = GEM_COLORS[index % GEM_COLORS.length]
          return (
            <motion.div
              key={index}
              className="absolute"
              style={{
                left: `${8 + (index % 4) * 24}%`,
                top: `${10 + Math.floor(index / 4) * 25}%`,
              }}
              animate={{
                opacity: isCollected ? [0.5, 1, 0.5] : 0.15,
                scale: isCollected ? [1, 1.3, 1] : 1,
                rotate: isCollected ? [0, 10, -10, 0] : 0,
              }}
              transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
            >
              <div className={`text-3xl ${isCollected ? '' : 'grayscale opacity-50'}`}>
                {gemEmoji}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <Link href="/worlds/math">
            <WButton variant="ghost" size="sm" icon={<IconArrowLeft size={18} />}>
              Back to Mountains
            </WButton>
          </Link>

          <div className="flex items-center gap-3">
            <WCard variant="default" className="py-2 px-4 flex items-center gap-2 bg-white/90"
            >
              <IconCoin size={20} />
              <span className="font-caveat text-xl font-bold">{coins}</span>
            </WCard>
            <WCard variant="achievement" className="py-2 px-4 flex items-center gap-2"
            >
              <IconStar size={20} />
              <span className="font-caveat text-xl font-bold">{stars}</span>
            </WCard>
          </div>
        </header>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            className="text-6xl mb-2"
            animate={{ 
              filter: ['brightness(1)', 'brightness(1.5)', 'brightness(1)'],
              textShadow: ['0 0 20px rgba(147, 112, 219, 0)', '0 0 40px rgba(147, 112, 219, 0.8)', '0 0 20px rgba(147, 112, 219, 0)']
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            💎
          </motion.div>
          <h1 className="font-amatic text-5xl font-bold text-watercolor-white">
            Cave of Fractions
          </h1>
          <p className="font-nunito text-misty-blue">
            Decode the glowing gems to unlock their secrets
          </p>
        </motion.div>

        {/* Progress */}
        <div className="max-w-md mx-auto mb-8"
        >
          <WProgress 
            value={(collectedGems.length / questions.length) * 100} 
            max={100}
          />
          <p className="font-nunito text-sm text-misty-blue text-center mt-2"
          >
            {collectedGems.length} of {questions.length} gems collected
          </p>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="max-w-xl mx-auto"
          >
            <WCard 
              variant="world" 
              worldColor="math" 
              className="text-center py-8 bg-white/95 backdrop-blur-sm"
            >
              <div className="mb-6">
                <motion.div
                  className="text-5xl mb-4"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {question?.emoji || '💎'}
                </motion.div>
                <span className="inline-block px-4 py-1 bg-nebula-purple/20 rounded-full font-nunito text-sm text-midnight-indigo mb-4"
                >
                  {question?.difficulty === 'easy' ? '★ Glow Worm' : 
                   question?.difficulty === 'medium' ? '★★ Crystal Finder' : 
                   '★★★ Gem Master'}
                </span>
                <h2 className="font-caveat text-2xl font-bold text-ink-black mb-2">
                  {question?.context}
                </h2>
              </div>

              {/* Question */}
              <div className="mb-8">
                <div className="font-amatic text-4xl font-bold text-midnight-indigo mb-6"
                >
                  {question?.question}
                </div>

                <AnimatePresence>
                  {showHint && question?.hint && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-gold-accent/20 rounded-lg p-4 mb-4"
                    >
                      <p className="font-patrick text-ink-grey"
                      >
                        ● {question.hint}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Answer Options */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {options.map((option, index) => (
                    <motion.button
                      key={index}
                      className={`p-4 rounded-lg font-caveat text-2xl font-bold transition-all ${
                        selectedAnswer === option
                          ? 'bg-mountain-purple text-white'
                          : 'bg-misty-blue/20 text-ink-black hover:bg-misty-blue/40'
                      } ${
                        feedback === 'correct' && option === question?.correctAnswer.toString()
                          ? 'bg-green-500 text-white'
                          : ''
                      } ${
                        feedback === 'incorrect' && selectedAnswer === option
                          ? 'bg-red-400 text-white'
                          : ''
                      }`}
                      onClick={() => !feedback && setSelectedAnswer(option)}
                      whileHover={{ scale: feedback ? 1 : 1.05 }}
                      whileTap={{ scale: feedback ? 1 : 0.95 }}
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
                      className="text-green-600 font-caveat text-2xl mb-4"
                    >
                      !  Correct! The gem glows brighter! +{question?.xpReward} coins!
                    </motion.div>
                  )}
                  {feedback === 'incorrect' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-red-500 font-caveat text-xl mb-4"
                    >
                      X  The gem dims... Try again!
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex gap-3 justify-center">
                  <WButton 
                    variant="secondary" 
                    size="sm"
                    onClick={() => setShowHint(!showHint)}
                    icon={<IconHint size={18} />}
                  >
                    {showHint ? 'Hide Hint' : 'Show Hint'}
                  </WButton>
                  
                  <WButton 
                    onClick={handleSubmit}
                    disabled={!selectedAnswer || !!feedback}
                  >
                    Decode Gem
                  </WButton>
                </div>
              </div>
            </WCard>
          </motion.div>
        </AnimatePresence>

        {/* Streak */}
        <AnimatePresence>
          {streak > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed bottom-8 right-8"
            >
              <WCard variant="achievement" className="py-3 px-6"
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">●</span>
                  <div>
                    <div className="font-caveat text-xl font-bold">{streak} Streak!</div>
                    <div className="font-nunito text-xs text-ink-grey">The gems are responding!</div>
                  </div>
                </div>
              </WCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}
