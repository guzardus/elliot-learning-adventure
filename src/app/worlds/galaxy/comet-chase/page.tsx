'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import WButton from '@/components/WButton'
import WCard from '@/components/WCard'
import { getRandomQuestions, GrammarQuestion } from '@/data/grammarQuestions'
import { IconArrowLeft, IconStar, IconLightbulb, IconRocket, IconFlame } from '@/components/WIcon'

export default function CometChase() {
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'answered' | 'finished'>('intro')
  const [questions, setQuestions] = useState<GrammarQuestion[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const [answeredIds, setAnsweredIds] = useState<string[]>([])

  const currentQuestion = questions[currentIndex]

  const startGame = () => {
    const newQuestions = getRandomQuestions(10, 'grammar')
    setQuestions(newQuestions)
    setGameState('playing')
    setCurrentIndex(0)
    setScore(0)
    setStreak(0)
    setAnsweredIds([])
  }

  const handleAnswer = (answer: string) => {
    if (gameState !== 'playing') return
    
    setSelectedAnswer(answer)
    setGameState('answered')
    setAnsweredIds(prev => [...prev, currentQuestion.id])
    
    if (answer === currentQuestion.correctAnswer) {
      setScore(s => s + currentQuestion.xpReward)
      setStreak(s => s + 1)
    } else {
      setStreak(0)
    }
  }

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(i => i + 1)
      setSelectedAnswer(null)
      setShowHint(false)
      setGameState('playing')
    } else {
      setGameState('finished')
    }
  }

  // Render intro screen
  if (gameState === 'intro') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-world-galaxy bg-cover bg-center bg-fixed relative"
      >
        <div className="absolute inset-0 bg-black/50" />
        
        <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
          <WCard variant="world" worldColor="galaxy" className="max-w-lg w-full text-center p-8 bg-white/95">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-32 h-32 mx-auto mb-6"
            >
              <img src="/images/galaxy/comet-chase.png" alt="Comet Chase" className="w-full h-full object-contain" />
            </motion.div>
            
            <h1 className="font-amatic text-5xl font-bold text-midnight-indigo mb-4">
              Comet Chase
            </h1>
            
            <p className="font-nunito text-ink-grey mb-6">
              Race through the cosmos collecting correct grammar answers! 
              Catch 10 comets to complete your mission.
            </p>
            
            <div className="space-y-2 mb-6 text-left bg-midnight-indigo/10 rounded-lg p-4">
              <p className="font-patrick text-ink-black">🚀 <strong>10 questions</strong> per mission</p>
              <p className="font-patrick text-ink-black"><IconStar size={16} className="inline" /><strong>15-40 XP</strong> per correct answer</p>
              <p className="font-patrick text-ink-black"><IconFlame size={16} className="inline" /> <strong>Build streaks</strong> for bonus points</p>
            </div>
            
            <div className="flex gap-4">
              <Link href="/worlds/galaxy">
                <WButton variant="secondary">Back</WButton>
              </Link>
              <WButton onClick={startGame} className="flex-1 bg-gradient-to-r from-nebula-purple to-cosmic-teal">
                <span className="flex items-center justify-center gap-2">
                  <IconRocket size={20} />
                  Launch Mission
                </span>
              </WButton>
            </div>
          </WCard>
        </div>
      </motion.div>
    )
  }

  // Render finished screen
  if (gameState === 'finished') {
    const percentage = Math.round((score / (questions.length * 40)) * 100)
    
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-world-galaxy bg-cover bg-center bg-fixed relative"
      >
        <div className="absolute inset-0 bg-black/50" />
        
        <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
          <WCard variant="achievement" className="max-w-lg w-full text-center p-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-6xl mb-4"
            >
              🏆
            </motion.div>
            
            <h1 className="font-amatic text-5xl font-bold text-white mb-4">
              Mission Complete!
            </h1>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white/20 rounded-lg p-4">
                <div className="font-amatic text-4xl font-bold text-meteor-gold">{score}</div>
                <div className="font-nunito text-white/80">Total XP</div>
              </div>
              <div className="bg-white/20 rounded-lg p-4">
                <div className="font-amatic text-4xl font-bold text-cosmic-teal">{percentage}%</div>
                <div className="font-nunito text-white/80">Accuracy</div>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Link href="/worlds/galaxy">
                <WButton variant="secondary">Back to Galaxy</WButton>
              </Link>
              <WButton onClick={startGame} className="flex-1 bg-gradient-to-r from-nebula-purple to-cosmic-teal">
                Fly Again
              </WButton>
            </div>
          </WCard>
        </div>
      </motion.div>
    )
  }

  // Render game screen
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-world-galaxy bg-cover bg-center bg-fixed relative"
    >
      <div className="absolute inset-0 bg-black/40" />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <Link href="/worlds/galaxy">
            <WButton variant="ghost" size="sm" className="text-white">
              <IconArrowLeft size={20} />
            </WButton>
          </Link>
          
          <div className="flex items-center gap-4">
            <WCard variant="default" className="py-2 px-4 flex items-center gap-2 bg-white/90">
              <IconStar size={20} className="text-meteor-gold" />
              <span className="font-caveat text-xl font-bold">{score} XP</span>
            </WCard>
            
            {streak > 2 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-orange-500 text-white px-3 py-1 rounded-full font-caveat font-bold"
              >
                <IconFlame size={20} className="inline" /> {streak} streak
              </motion.div>
            )}
          </div>
        </header>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-white/80 mb-2 font-patrick">
            <span>Question {currentIndex + 1} of {questions.length}</span>
            <span>{Math.round((currentIndex / questions.length) * 100)}% Complete</span>
          </div>
          <div className="h-3 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-nebula-purple to-cosmic-teal"
              initial={{ width: 0 }}
              animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <WCard variant="default" className="max-w-2xl mx-auto p-8 bg-white/95">
          {currentQuestion && (
            <>
              <div className="flex justify-between items-start mb-6">
                <span className={`px-3 py-1 rounded-full text-sm font-patrick ${
                  currentQuestion.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                  currentQuestion.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {currentQuestion.difficulty === 'easy' ? '⭐' : 
                   currentQuestion.difficulty === 'medium' ? '⭐⭐' : '⭐⭐⭐'} {currentQuestion.type}
                </span>
                
                <WButton
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowHint(!showHint)}
                  className="text-ink-grey"
                >
                  <IconLightbulb size={18} />
                </WButton>
              </div>

              <p className="font-patrick text-ink-grey mb-4">{currentQuestion.context}</p>

              <h2 className="font-amatic text-3xl font-bold text-ink-black mb-6">
                {currentQuestion.question}
              </h2>

              <AnimatePresence>
                {showHint && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded"
                  >
                    <p className="font-patrick text-ink-grey"><span className="text-yellow-500">●</span> {currentQuestion.hint}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-3">
                {currentQuestion.options?.map((option, index) => {
                  const isSelected = selectedAnswer === option
                  const isCorrect = option === currentQuestion.correctAnswer
                  const showCorrect = gameState === 'answered' && isCorrect
                  const showWrong = gameState === 'answered' && isSelected && !isCorrect

                  return (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleAnswer(option)}
                      disabled={gameState === 'answered'}
                      className={`w-full p-4 rounded-xl text-left font-nunito transition-all ${
                        showCorrect ? 'bg-green-100 border-2 border-green-500 text-green-800' :
                        showWrong ? 'bg-red-100 border-2 border-red-500 text-red-800' :
                        isSelected ? 'bg-nebula-purple/20 border-2 border-nebula-purple' :
                        'bg-gray-50 border-2 border-gray-200 hover:border-nebula-purple/50'
                      }`}
                    >
                      <span className="font-bold mr-3">{String.fromCharCode(65 + index)}.</span>
                      {option}
                      {showCorrect && <span className="float-right"><span className="text-green-600">✓</span></span>}
                      {showWrong && <span className="float-right">✗</span>}
                    </motion.button>
                  )
                })}
              </div>

              {gameState === 'answered' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-midnight-indigo/10 rounded-lg"
                >
                  <p className="font-patrick text-ink-black">
                    <strong>Explanation:</strong> {currentQuestion.explanation}
                  </p>
                  
                  <WButton onClick={nextQuestion} className="w-full mt-4 bg-gradient-to-r from-nebula-purple to-cosmic-teal">
                    {currentIndex < questions.length - 1 ? 'Next Comet →' : 'Finish Mission'}
                  </WButton>
                </motion.div>
              )}
            </>
          )}
        </WCard>
      </div>
    </motion.div>
  )
}
