'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import WButton from '@/components/WButton'
import WCard from '@/components/WCard'
import { getRandomQuestions, GrammarQuestion } from '@/data/grammarQuestions'
import { IconArrowLeft, IconStar, IconLightbulb, IconPlanet } from '@/components/WIcon'

export default function BlackHolePuzzles() {
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'answered' | 'finished'>('intro')
  const [questions, setQuestions] = useState<GrammarQuestion[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const [answeredIds, setAnsweredIds] = useState<string[]>([])
  const [puzzlesSolved, setPuzzlesSolved] = useState(0)

  const currentQuestion = questions[currentIndex]

  const startGame = () => {
    const newQuestions = getRandomQuestions(10, 'punctuation')
    setQuestions(newQuestions)
    setGameState('playing')
    setCurrentIndex(0)
    setScore(0)
    setStreak(0)
    setAnsweredIds([])
    setPuzzlesSolved(0)
  }

  const handleAnswer = (answer: string) => {
    if (gameState !== 'playing') return
    
    setSelectedAnswer(answer)
    setGameState('answered')
    setAnsweredIds(prev => [...prev, currentQuestion.id])
    
    if (answer === currentQuestion.correctAnswer) {
      setScore(s => s + currentQuestion.xpReward)
      setStreak(s => s + 1)
      setPuzzlesSolved(p => p + 1)
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
        <div className="absolute inset-0 bg-black/60" />
        
        <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
          <WCard variant="world" worldColor="galaxy" className="max-w-lg w-full text-center p-8 bg-white/95">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-32 h-32 mx-auto mb-6"
            >
              <img src="/images/galaxy/black-hole.png" alt="Black Hole" className="w-full h-full object-contain" />
            </motion.div>
            
            <h1 className="font-amatic text-5xl font-bold text-midnight-indigo mb-4">
              Black Hole Puzzles
            </h1>
            
            <p className="font-nunito text-ink-grey mb-6">
              Solve punctuation mysteries before they get sucked into the void! 
              Complete 8 puzzles to escape the event horizon.
            </p>
            
            <div className="space-y-2 mb-6 text-left bg-midnight-indigo/10 rounded-lg p-4">
              <p className="font-patrick text-ink-black">🕳️ <strong>10 punctuation puzzles</strong> to solve</p>
              <p className="font-patrick text-ink-black"><IconStar size={16} className="inline" /><strong>20-45 XP</strong> per correct solution</p>
              <p className="font-patrick text-ink-black">⚡ <strong>Don't get sucked in!</strong></p>
            </div>
            
            <div className="flex gap-4">
              <Link href="/worlds/galaxy">
                <WButton variant="secondary">Back</WButton>
              </Link>
              <WButton onClick={startGame} className="flex-1 bg-gradient-to-r from-midnight-indigo to-cosmic-teal">
                <span className="flex items-center justify-center gap-2">
                  <IconPlanet size={20} />
                  Enter the Void
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
    const percentage = Math.round((score / (questions.length * 45)) * 100)
    const escaped = puzzlesSolved >= 6
    
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-world-galaxy bg-cover bg-center bg-fixed relative"
      >
        <div className="absolute inset-0 bg-black/60" />
        
        <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
          <WCard variant="achievement" className="max-w-lg w-full text-center p-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-6xl mb-4"
            >
              {escaped ? '🌟' : '🌀'}
            </motion.div>
            
            <h1 className="font-amatic text-5xl font-bold text-white mb-4">
              {escaped ? 'You Escaped!' : 'Event Horizon Crossed'}
            </h1>
            
            <p className="font-nunito text-white/80 mb-6">
              {escaped 
                ? `Amazing! You solved ${puzzlesSolved} puzzles and escaped the black hole!` 
                : `You solved ${puzzlesSolved} puzzles. The void claims another adventurer...`}
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white/20 rounded-lg p-4">
                <div className="font-amatic text-4xl font-bold text-cosmic-teal">{score}</div>
                <div className="font-nunito text-white/80">XP Earned</div>
              </div>
              <div className="bg-white/20 rounded-lg p-4">
                <div className="font-amatic text-4xl font-bold text-meteor-gold">{puzzlesSolved}/10</div>
                <div className="font-nunito text-white/80">Puzzles Solved</div>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Link href="/worlds/galaxy">
                <WButton variant="secondary">Back to Galaxy</WButton>
              </Link>
              <WButton onClick={startGame} className="flex-1 bg-gradient-to-r from-midnight-indigo to-cosmic-teal">
                {escaped ? 'Escape Again' : 'Try Again'}
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
      <div className="absolute inset-0 bg-black/50" />
      
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
                className="bg-cosmic-teal text-white px-3 py-1 rounded-full font-caveat font-bold"
              >
                ⚡ {streak} streak
              </motion.div>
            )}
          </div>
        </header>

        {/* Progress - Black Hole Visualization */}
        <div className="mb-6">
          <div className="flex justify-between text-white/80 mb-2 font-patrick">
            <span>Puzzle {currentIndex + 1} of {questions.length}</span>
            <span>{puzzlesSolved} solved ✓</span>
          </div>
          <div className="h-4 bg-white/10 rounded-full overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cosmic-teal/30 to-transparent animate-pulse" />
            <motion.div
              className="h-full bg-gradient-to-r from-cosmic-teal via-nebula-purple to-midnight-indigo"
              initial={{ width: '100%' }}
              animate={{ width: `${100 - ((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
          <p className="text-center text-white/60 text-sm mt-2 font-patrick">
            Solve puzzles to resist the pull!
          </p>
        </div>

        {/* Question Card */}
        <WCard variant="default" className="max-w-2xl mx-auto p-8 bg-white/95 border-2 border-cosmic-teal/30">
          {currentQuestion && (
            <>
              <div className="flex justify-between items-start mb-6">
                <span className={`px-3 py-1 rounded-full text-sm font-patrick ${
                  currentQuestion.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                  currentQuestion.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {currentQuestion.difficulty === 'easy' ? '⭐' : 
                   currentQuestion.difficulty === 'medium' ? '⭐⭐' : '⭐⭐⭐'} Punctuation
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
                    className="bg-cosmic-teal/10 border-l-4 border-cosmic-teal p-4 mb-6 rounded"
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
                        isSelected ? 'bg-cosmic-teal/20 border-2 border-cosmic-teal' :
                        'bg-gray-50 border-2 border-gray-200 hover:border-cosmic-teal/50'
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
                  className="mt-6 p-4 bg-cosmic-teal/10 rounded-lg border border-cosmic-teal/30"
                >
                  <p className="font-patrick text-ink-black">
                    <strong>Explanation:</strong> {currentQuestion.explanation}
                  </p>
                  
                  <WButton onClick={nextQuestion} className="w-full mt-4 bg-gradient-to-r from-midnight-indigo to-cosmic-teal">
                    {currentIndex < questions.length - 1 ? 'Next Puzzle →' : 'Final Escape'}
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
