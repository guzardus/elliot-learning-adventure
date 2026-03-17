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
  IconHint,
  IconPlay
} from '@/components/WIcon'
import { getSessionQuestions, MathQuestion } from '@/data/mathQuestions'

// Total bridge sections per session
const TOTAL_SECTIONS = 40

export default function BridgeBuilderPage() {
  const [questions, setQuestions] = useState<MathQuestion[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userAnswer, setUserAnswer] = useState('')
  const [showHint, setShowHint] = useState(false)
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null)
  const [coins, setCoins] = useState(1247)
  const [stars, setStars] = useState(42)
  const [completedBridges, setCompletedBridges] = useState<number[]>([])
  const [streak, setStreak] = useState(0)
  const [showExplanation, setShowExplanation] = useState(false)

  // Load random word problems on mount
  useEffect(() => {
    const sessionQuestions = getSessionQuestions(TOTAL_SECTIONS, 'wordProblem')
    setQuestions(sessionQuestions)
  }, [])

  const question = questions[currentQuestion]

  function handleSubmit() {
    if (!question || !userAnswer) return

    const userNum = parseFloat(userAnswer)
    const correctNum = parseFloat(question.correctAnswer.toString())
    const isCorrect = Math.abs(userNum - correctNum) < 0.01 // Allow small decimal differences

    if (isCorrect) {
      setFeedback('correct')
      setCoins(prev => prev + question.xpReward)
      setCompletedBridges(prev => [...prev, currentQuestion])
      setStreak(prev => prev + 1)
      setShowExplanation(true)
      
      setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(prev => prev + 1)
          setUserAnswer('')
          setShowHint(false)
          setFeedback(null)
          setShowExplanation(false)
        }
      }, 3000)
    } else {
      setFeedback('incorrect')
      setStreak(0)
    }
  }

  function handleKeyPress(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  if (questions.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-jade-green/60 via-moss-wash/40 to-earth-brown/30">
        <div className="text-2xl font-amatic">Preparing the valley...</div>
      </main>
    )
  }

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-jade-green/60 via-moss-wash/40 to-earth-brown/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      {/* Bridge visualization */}
      <div className="absolute bottom-32 left-0 right-0 h-32 pointer-events-none"
      >
        {/* Valley/canyon background */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-earth-brown/60 to-transparent"
          style={{
            clipPath: 'polygon(0% 100%, 20% 40%, 40% 60%, 60% 30%, 80% 50%, 100% 100%)'
          }}
        />
        
        {/* The Bridge */}
        <div className="absolute bottom-24 left-10 right-10 h-4"
        >
          <div className="relative h-full"
          >
            {questions.slice(0, 20).map((_, index) => {
              const isCompleted = completedBridges.includes(index)
              const isCurrent = index === currentQuestion
              
              return (
                <motion.div
                  key={index}
                  className={`absolute h-full rounded ${
                    isCompleted ? 'bg-jade-green' : 
                    isCurrent ? 'bg-gold-accent animate-pulse' : 
                    'bg-ink-grey/30'
                  }`}
                  style={{
                    left: `${(index / 20) * 100}%`,
                    width: `${(1 / 20) * 100 - 1}%`,
                  }}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {/* Bridge pillar */}
                  <div 
                    className={`absolute -bottom-16 left-1/2 -translate-x-1/2 w-2 rounded-b ${
                      isCompleted || isCurrent ? 'bg-earth-brown' : 'bg-ink-grey/20'
                    }`}
                    style={{ height: '64px' }}
                  />
                  
                  {/* Bridge marker */}
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2"
                  >
                    {isCompleted ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-xl"
                      >
                        ✅
                      </motion.div>
                    ) : isCurrent ? (
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="text-2xl"
                      >
                        🏗️
                      </motion.div>
                    ) : (
                      <div className="text-sm text-ink-grey/50"
                      >
                        {index + 1}
                      </div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Mist effect */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(176, 196, 222, 0.4), transparent)',
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8"
      >
        {/* Header */}
        <header className="flex justify-between items-center mb-6"
        >
          <Link href="/worlds/math">
            <WButton variant="secondary" size="sm" icon={<IconArrowLeft size={18} />}
            >
              Back to Mountains
            </WButton>
          </Link>

          <div className="flex items-center gap-3"
          >
            <WCard variant="default" className="py-2 px-4 flex items-center gap-2"
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
          className="text-center mb-6"
        >
          <motion.div
            className="text-6xl mb-2"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🌉
          </motion.div>
          <h1 className="font-amatic text-5xl font-bold text-ink-black"
          >
            Bridge Builder
          </h1>
          <p className="font-nunito text-ink-grey"
          >
            Solve word problems to connect the peaks
          </p>
        </motion.div>

        {/* Progress */}
        <div className="max-w-md mx-auto mb-8"
        >
          <WProgress 
            value={(completedBridges.length / questions.length) * 100} 
            max={100}
          />
          <p className="font-nunito text-sm text-ink-grey text-center mt-2"
          >
            {completedBridges.length} of {questions.length} bridge sections complete
          </p>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="max-w-2xl mx-auto"
          >
            <WCard variant="world" worldColor="math" className="py-8"
            >
              <div className="mb-6"
              >
                <span className="inline-block px-4 py-1 bg-jade-green/20 rounded-full font-nunito text-sm text-jade-green mb-4"
                >
                  {question?.difficulty === 'easy' ? '★ Apprentice Builder' : 
                   question?.difficulty === 'medium' ? '★★ Master Engineer' : 
                   '★★★ Bridge Architect'}
                </span>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-3xl">{question?.emoji}</span>
                  <h2 className="font-caveat text-2xl font-bold text-ink-black">
                    {question?.context}
                  </h2>
                </div>
              </div>

              {/* Question */}
              <div className="mb-8"
              >
                <div className="font-amatic text-3xl font-bold text-jade-green mb-4 leading-relaxed"
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

                <AnimatePresence>
                  {showExplanation && question?.explanation && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-jade-green/20 rounded-lg p-4 mb-4"
                    >
                      <p className="font-nunito text-ink-grey"
                      >
                        📖 {question.explanation}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Answer Input */}
              <div className="flex flex-col items-center gap-4"
              >
                <div className="flex items-center gap-4"
                >
                  <input
                    type="number"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="?"
                    className="w-40 h-16 text-center font-amatic text-4xl bg-watercolor-white/95 border-2 border-jade-green/30 rounded-lg focus:border-jade-green focus:outline-none text-ink-black"
                    disabled={feedback === 'correct'}
                  />
                </div>

                <AnimatePresence>
                  {feedback === 'correct' && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-green-600 font-caveat text-2xl"
                    >
                      !  Bridge section complete! +{question?.xpReward} coins!
                    </motion.div>
                  )}
                  {feedback === 'incorrect' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-red-500 font-caveat text-xl"
                    >
                      X  The structure isn't stable... Try again!
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex gap-3">
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
                    disabled={!userAnswer || feedback === 'correct'}
                    icon={<IconPlay size={18} />}
                  >
                    Build Section
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
                    <div className="font-nunito text-xs text-ink-grey">Building momentum!</div>
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
