'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import WButton from '@/components/WButton'
import WCard from '@/components/WCard'
import WProgress from '@/components/WProgress'
import { 
  IconArrowLeft, 
  IconStar, 
  IconCheck,
  IconHint,
  IconPlay,
  IconFlame
} from '@/components/WIcon'
import { getSessionQuestions, MathQuestion } from '@/data/mathQuestions'
import { useGamificationContext } from '@/components/GamificationProvider'
import { XPBar } from '@/components/XPBar'
import { Toast, useToast, SingleToast } from '@/components/AchievementToast'

interface Peak {
  id: number
  name: string
  height: number
  question: MathQuestion
  completed: boolean
  unlocked: boolean
}

const PEAK_NAMES = [
  'Base Camp',
  "Scout's Ridge",
  'Pine Needle Point',
  "Cloud Walker's Rest",
  "Eagle's Nest",
  'Misty Summit',
  'Thunder Peak',
  'Starlight Crest',
  'Dragon Spine',
  'The Apex',
  'Sky Tower',
  'Celestial Peak',
  'Olympus Mons',
  'Infinity Summit',
  'Beyond the Clouds'
]

// Total peaks to show (from 510+ question pool)
const TOTAL_PEAKS = 50

export default function PeakClimbingPage() {
  const [questions, setQuestions] = useState<MathQuestion[]>([])
  const [currentPeak, setCurrentPeak] = useState(0)
  const [userAnswer, setUserAnswer] = useState('')
  const [showHint, setShowHint] = useState(false)
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null)
  const [completedPeaks, setCompletedPeaks] = useState<number[]>([])
  const [sessionStreak, setSessionStreak] = useState(0)
  const [sessionStartTime] = useState(Date.now())
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [totalAnswered, setTotalAnswered] = useState(0)
  
  // Gamification
  const { player, answerQuestion, completeActivity, updateChallenge } = useGamificationContext()
  const { toasts, addToast, removeToast, showLevelUp, showBadgeUnlock, showChallengeComplete, showStreakMilestone } = useToast()

  // Load random questions on mount
  useEffect(() => {
    const sessionQuestions = getSessionQuestions(TOTAL_PEAKS, 'multiplication')
    setQuestions(sessionQuestions)
  }, [])

  const peaks: Peak[] = questions.map((q, index) => ({
    id: index,
    name: PEAK_NAMES[index % PEAK_NAMES.length],
    height: (index + 1) * 100,
    question: q,
    completed: completedPeaks.includes(index),
    unlocked: index === 0 || completedPeaks.includes(index - 1)
  }))

  const currentQuestion = peaks[currentPeak]?.question

  // Track activity completion
  useEffect(() => {
    if (completedPeaks.length === TOTAL_PEAKS) {
      // Activity complete!
      const timeSpent = Math.floor((Date.now() - sessionStartTime) / 60000)
      const allCorrect = correctAnswers === totalAnswered && totalAnswered > 0
      
      const result = completeActivity('math', {
        score: Math.round((correctAnswers / Math.max(totalAnswered, 1)) * 100),
        perfect: allCorrect,
        questionsAnswered: totalAnswered,
        correctAnswers: correctAnswers,
        timeSpent: timeSpent,
      })
      
      // Show toast for new badges
      result.newBadges.forEach(badgeId => {
        const badge = getBadgeById(badgeId)
        if (badge) showBadgeUnlock(badge)
      })
      
      // Show completion toast
      addToast({
        type: 'challenge',
        title: 'Session Complete!',
        message: `You conquered all ${TOTAL_PEAKS} peaks!`,
        xp: result.rewards.reduce((sum, r) => sum + r.amount, 0),
      })
    }
  }, [completedPeaks.length, correctAnswers, totalAnswered, sessionStartTime])

  // Helper to get badge by ID
  const getBadgeById = useCallback((id: string) => {
    const { BADGE_DEFINITIONS } = require('@/data/badges')
    return BADGE_DEFINITIONS.find((b: any) => b.id === id)
  }, [])

  function handleSubmit() {
    if (!currentQuestion || !userAnswer) return

    const userNum = parseInt(userAnswer)
    const correctNum = typeof currentQuestion.correctAnswer === 'number' 
      ? currentQuestion.correctAnswer 
      : parseFloat(currentQuestion.correctAnswer)
    const isCorrect = userNum === correctNum

    setTotalAnswered(prev => prev + 1)

    if (isCorrect) {
      setFeedback('correct')
      setCompletedPeaks(prev => [...prev, currentPeak])
      setSessionStreak(prev => {
        const newStreak = prev + 1
        // Show streak milestone toast
        if (newStreak === 5 || newStreak === 10 || newStreak === 20) {
          showStreakMilestone(newStreak)
        }
        return newStreak
      })
      setCorrectAnswers(prev => prev + 1)
      
      // Award XP through gamification system
      const xpResult = answerQuestion(
        'math', 
        true, 
        currentQuestion.difficulty
      )
      
      // Update challenge progress
      const completedChallenges = updateChallenge('answer_questions', 'math', 1)
      completedChallenges.forEach(challenge => {
        showChallengeComplete(challenge.description, challenge.xpReward)
      })
      
      // Show XP toast
      addToast({
        type: 'levelup',
        title: 'Correct!',
        message: `Great answer!`,
        xp: xpResult,
      })
      
      // Auto-advance after delay
      setTimeout(() => {
        if (currentPeak < peaks.length - 1) {
          setCurrentPeak(prev => prev + 1)
          setUserAnswer('')
          setShowHint(false)
          setFeedback(null)
        }
      }, 1500)
    } else {
      setFeedback('incorrect')
      setSessionStreak(0)
      
      // Still award minimal XP for trying
      answerQuestion('math', false, currentQuestion.difficulty)
    }
  }

  function handleKeyPress(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  if (questions.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-mountain-purple/70 via-misty-blue/50 to-dawn-pink/30">
        <div className="text-2xl font-amatic">Loading peaks...</div>
      </main>
    )
  }

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-3">
        {toasts.map((toast: Toast) => (
          <SingleToast 
            key={toast.id} 
            toast={toast} 
            onClose={() => removeToast(toast.id)} 
          />
        ))}
      </div>
      
      {/* Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-mountain-purple/70 via-misty-blue/50 to-dawn-pink/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      {/* Mountain visualization */}
      <div className="absolute bottom-0 left-0 right-0 h-96 pointer-events-none">
        {peaks.slice(0, 15).map((peak, index) => {
          const isCurrent = index === currentPeak
          const isCompleted = completedPeaks.includes(index)
          const isUnlocked = peak.unlocked
          
          return (
            <motion.div
              key={peak.id}
              className="absolute bottom-0"
              style={{ left: `${5 + index * 6.5}%` }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              {/* Peak */}
              <motion.div
                className={`w-12 relative ${
                  isCompleted ? 'bg-green-500/60' : 
                  isCurrent ? 'bg-mountain-purple/80' : 
                  isUnlocked ? 'bg-misty-blue/60' : 'bg-ink-grey/30'
                }`}
                style={{
                  clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                  height: `${60 + index * 15}px`
                }}
                animate={isCurrent ? { 
                  filter: ['brightness(1)', 'brightness(1.3)', 'brightness(1)']
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {/* Peak marker */}
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  {isCompleted ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-xl"
                    >
                      ✓
                    </motion.div>
                  ) : isCurrent ? (
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-8 h-8"
                    >
                      <svg viewBox="0 0 32 32" className="w-full h-full">
                        <defs>
                          <linearGradient id="climberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#D2691E" stopOpacity="0.9" />
                            <stop offset="100%" stopColor="#8B4513" stopOpacity="0.8" />
                          </linearGradient>
                        </defs>
                        <circle cx="16" cy="8" r="4" fill="#F5DEB3" stroke="#D2691E" strokeWidth="1" />
                        <rect x="12" y="12" width="8" height="10" rx="2" fill="url(#climberGrad)" />
                        <path d="M12 14L8 10" stroke="#8B4513" strokeWidth="2" strokeLinecap="round" />
                        <path d="M20 14L24 10" stroke="#8B4513" strokeWidth="2" strokeLinecap="round" />
                        <path d="M14 22L12 28" stroke="#2F4F4F" strokeWidth="2" strokeLinecap="round" />
                        <path d="M18 22L20 28" stroke="#2F4F4F" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </motion.div>
                  ) : (
                    <div className="w-6 h-6 opacity-50">
                      <svg viewBox="0 0 32 32" className="w-full h-full">
                        <defs>
                          <linearGradient id="mtnGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#8B7AA8" stopOpacity="0.9" />
                            <stop offset="50%" stopColor="#6B5B8A" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#4A3D6B" stopOpacity="0.7" />
                          </linearGradient>
                        </defs>
                        <path d="M16 4L4 28H28L16 4Z" fill="url(#mtnGrad)" stroke="#4A3D6B" strokeWidth="1" />
                        <path d="M16 10L10 22H22L16 10Z" fill="white" fillOpacity="0.3" />
                      </svg>
                    </div>
                  )}
                </div>
              </motion.div>
              
              {/* Peak number */}
              <div className="text-center mt-1 font-nunito text-xs text-ink-black">
                {index + 1}
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
            <WButton variant="secondary" size="sm" icon={<IconArrowLeft size={18} />}>
              Back to Mountains
            </WButton>
          </Link>

          <div className="flex items-center gap-3">
            <XPBar compact />
            <WCard variant="achievement" className="py-2 px-4 flex items-center gap-2">
              <IconStar size={20} />
              <span className="font-caveat text-xl font-bold">Lvl {player.level}</span>
            </WCard>
          </div>
        </header>

        {/* Current Peak Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="text-center">
            <motion.div
              className="inline-block w-20 h-20"
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <svg viewBox="0 0 64 64" className="w-full h-full">
                <defs>
                  <linearGradient id="bigMtnGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8B7AA8" stopOpacity="0.9" />
                    <stop offset="50%" stopColor="#6B5B8A" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#4A3D6B" stopOpacity="0.7" />
                  </linearGradient>
                </defs>
                <path d="M32 8L8 56H56L32 8Z" fill="url(#bigMtnGrad)" stroke="#4A3D6B" strokeWidth="2" strokeLinejoin="round" />
                <path d="M32 20L20 44H44L32 20Z" fill="white" fillOpacity="0.4" />
              </svg>
            </motion.div>
            <h1 className="font-amatic text-5xl font-bold text-ink-black mt-2">
              {peaks[currentPeak]?.name}
            </h1>
            <p className="font-nunito text-ink-grey">
              Peak {currentPeak + 1} of {peaks.length} • Elevation: {peaks[currentPeak]?.height}m
            </p>
          </div>
        </motion.div>

        {/* Progress */}
        <div className="max-w-md mx-auto mb-8">
          <WProgress 
            value={(completedPeaks.length / peaks.length) * 100} 
            max={100}
          />
          <p className="font-nunito text-sm text-ink-grey text-center mt-2">
            {completedPeaks.length} of {peaks.length} peaks conquered
          </p>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPeak}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="max-w-xl mx-auto"
          >
            <WCard variant="world" worldColor="math" className="text-center py-8">
              <div className="mb-6">
                <span className="inline-block px-4 py-1 bg-mountain-purple/20 rounded-full font-nunito text-sm text-mountain-purple mb-4">
                  {currentQuestion?.difficulty === 'easy' ? '\u{2B50} Warm Up' : 
                   currentQuestion?.difficulty === 'medium' ? '\u{2B50}\u{2B50} Challenge' : 
                   '\u{2B50}\u{2B50}\u{2B50} Expert'}
                </span>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <h2 className="font-caveat text-2xl font-bold text-ink-black">
                    {currentQuestion?.context}
                  </h2>
                </div>
              </div>

              {/* Question */}
              <div className="mb-8">
                <motion.div 
                  className="font-amatic text-6xl font-bold text-mountain-purple mb-4"
                  animate={feedback === 'incorrect' ? { x: [-5, 5, -5, 5, 0] } : {}}
                >
                  {currentQuestion?.question}
                </motion.div>
                
                <AnimatePresence>
                  {showHint && currentQuestion?.hint && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-gold-accent/20 rounded-lg p-4 mb-4"
                    >
                      <p className="font-patrick text-ink-grey">
                        * {currentQuestion.hint}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Answer Input */}
              <div className="flex flex-col items-center gap-4">
                <div className="flex gap-3">
                  <input
                    type="number"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="?"
                    className="w-32 h-16 text-center font-amatic text-4xl bg-watercolor-white/95 border-2 border-mountain-purple/30 rounded-lg focus:border-mountain-purple focus:outline-none text-ink-black"
                    disabled={feedback === 'correct'}
                  />
                </div>

                {/* Feedback */}
                <AnimatePresence>
                  {feedback === 'correct' && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-green-600 font-caveat text-2xl"
                    >
                      ! Correct! Keep climbing!
                    </motion.div>
                  )}
                  {feedback === 'incorrect' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-red-500 font-caveat text-xl"
                    >
                      X Not quite! Try again!
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
                    Submit Answer
                  </WButton>
                </div>
              </div>
            </WCard>
          </motion.div>
        </AnimatePresence>

        {/* Session Streak indicator */}
        <AnimatePresence>
          {sessionStreak > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed bottom-8 right-8"
            >
              <WCard variant="achievement" className="py-3 px-6">
                <div className="flex items-center gap-2">
                  <IconFlame size={24} className="text-orange-500" />
                  <div>
                    <div className="font-caveat text-xl font-bold">{sessionStreak} Streak!</div>
                    <div className="font-nunito text-xs text-ink-grey">Keep it up!</div>
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

