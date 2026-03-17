'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import WButton from '@/components/WButton'
import WCard from '@/components/WCard'
import WProgress from '@/components/WProgress'
import { IconArrowLeft, IconBook, IconCheck } from '@/components/WIcon'
import { vocabularySets, VocabularySet, VocabularyWord } from '@/data/readingContent'

type ChallengeType = 'definition' | 'synonym' | 'context' | 'antonym'

interface Challenge {
  word: VocabularyWord
  type: ChallengeType
  options: string[]
  correctAnswer: string
}

const CHEST_COLORS = ['brown', 'yellow', 'blue', 'purple', 'green', 'white']


// SVG Icons
const GemIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#DAA520">
    <path d="M12 2L4 9l8 13 8-13-8-7z"/>
  </svg>
)

const GiftIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#FF6B6B">
    <path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.33 1 1.33L15.38 12 17 10.83 14.92 8H20v6z"/>
  </svg>
)

const BoxIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#8B4513">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/>
  </svg>
)

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#2E8B57">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
  </svg>
)

const FireIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#FF4500">
    <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/>
  </svg>
)

export default function VocabularyTreasuresPage() {
  const [sets, setSets] = useState<VocabularySet[]>([])
  const [currentSetIndex, setCurrentSetIndex] = useState(0)
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null)
  const [collectedChests, setCollectedChests] = useState<number[]>([])
  const [totalCoins, setTotalCoins] = useState(0)
  const [showDefinition, setShowDefinition] = useState(false)
  const [masteredWords, setMasteredWords] = useState<string[]>([])

  // Load vocabulary sets
  useEffect(() => {
    // Shuffle and take 10 sets for session
    const shuffled = [...vocabularySets].sort(() => Math.random() - 0.5).slice(0, 10)
    setSets(shuffled)
  }, [])

  const currentSet = sets[currentSetIndex]
  
  // Generate challenges from current set
  const generateChallenges = (set: VocabularySet): Challenge[] => {
    const challenges: Challenge[] = []
    
    set.words.forEach(word => {
      // Challenge 1: Definition match
      const wrongDefs = vocabularySets
        .flatMap(s => s.words)
        .filter(w => w.word !== word.word)
        .slice(0, 3)
        .map(w => w.definition)
      
      challenges.push({
        word,
        type: 'definition',
        options: [word.definition, ...wrongDefs].sort(() => Math.random() - 0.5),
        correctAnswer: word.definition
      })
      
      // Challenge 2: Synonym match (if synonyms exist)
      if (word.synonyms.length > 0) {
        const allWords = vocabularySets.flatMap(s => s.words.map(w => w.word))
        const wrongSyns = allWords
          .filter(w => w !== word.word && !word.synonyms.includes(w))
          .slice(0, 3)
        
        challenges.push({
          word,
          type: 'synonym',
          options: [word.synonyms[0], ...wrongSyns].sort(() => Math.random() - 0.5),
          correctAnswer: word.synonyms[0]
        })
      }
      
      // Challenge 3: Context clue
      const contextWords = word.contextSentence.split(' ')
      const blankedSentence = word.contextSentence.replace(word.word, '______')
      const wrongWords = vocabularySets
        .flatMap(s => s.words)
        .filter(w => w.word !== word.word)
        .slice(0, 3)
        .map(w => w.word)
      
      challenges.push({
        word,
        type: 'context',
        options: [word.word, ...wrongWords].sort(() => Math.random() - 0.5),
        correctAnswer: word.word
      })
      
      // Challenge 4: Antonym (hard mode, if antonyms exist)
      if (word.antonyms && word.antonyms.length > 0) {
        const wrongAnts = vocabularySets
          .flatMap(s => s.words)
          .filter(w => w.word !== word.word)
          .slice(0, 3)
          .map(w => w.word)
        
        challenges.push({
          word,
          type: 'antonym',
          options: [word.antonyms[0], ...wrongAnts].sort(() => Math.random() - 0.5),
          correctAnswer: word.antonyms[0]
        })
      }
    })
    
    return challenges.sort(() => Math.random() - 0.5).slice(0, 5) // 5 challenges per set
  }

  const [challenges, setChallenges] = useState<Challenge[]>([])
  
  useEffect(() => {
    if (currentSet) {
      setChallenges(generateChallenges(currentSet))
      setCurrentChallengeIndex(0)
      setSelectedAnswer(null)
      setFeedback(null)
      setShowDefinition(false)
    }
  }, [currentSet])

  const currentChallenge = challenges[currentChallengeIndex]

  const handleAnswer = (answer: string) => {
    if (feedback || !currentChallenge) return
    
    setSelectedAnswer(answer)
    const isCorrect = answer === currentChallenge.correctAnswer
    
    if (isCorrect) {
      setFeedback('correct')
      setTotalCoins(prev => prev + 15)
      
      // Track mastered words
      if (!masteredWords.includes(currentChallenge.word.word)) {
        setMasteredWords(prev => [...prev, currentChallenge.word.word])
      }
    } else {
      setFeedback('incorrect')
    }
  }

  const handleNext = () => {
    if (currentChallengeIndex < challenges.length - 1) {
      setCurrentChallengeIndex(prev => prev + 1)
    } else {
      // Completed this set
      setCollectedChests(prev => [...prev, currentSetIndex])
      if (currentSetIndex < sets.length - 1) {
        setCurrentSetIndex(prev => prev + 1)
      }
    }
    
    setSelectedAnswer(null)
    setFeedback(null)
    setShowDefinition(false)
  }

  const getChallengePrompt = (type: ChallengeType) => {
    switch (type) {
      case 'definition': return `What does "${currentChallenge?.word.word}" mean?`
      case 'synonym': return `Which word means the same as "${currentChallenge?.word.word}"?`
      case 'context': return `Fill in the blank: ${currentChallenge?.word.contextSentence.replace(currentChallenge?.word.word, '______')}`
      case 'antonym': return `Which word means the OPPOSITE of "${currentChallenge?.word.word}"?`
    }
  }

  if (sets.length === 0 || !currentSet) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-amatic">Loading treasure chests...</div>
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

      {/* Treasure Chests Decoration */}
      <div className="absolute inset-0 pointer-events-none"
      >
        {sets.slice(0, 12).map((set, index) => {
          const isCollected = collectedChests.includes(index)
          const isCurrent = index === currentSetIndex
          const row = Math.floor(index / 4)
          const col = index % 4
          
          return (
            <motion.div
              key={index}
              className="absolute"
              style={{
                left: `${10 + col * 22}%`,
                top: `${15 + row * 30}%`,
              }}
              animate={{
                scale: isCurrent ? [1, 1.1, 1] : 1,
                opacity: isCollected ? 0.3 : isCurrent ? 1 : 0.6,
              }}
              transition={{ duration: 2, repeat: isCurrent ? Infinity : 0 }}
            >
              <div className={`text-5xl ${isCollected ? 'grayscale' : ''}`}>
                {isCollected ? '<BoxIcon />' : '<GiftIcon />'}
              </div>
              
              {isCurrent && (
                <motion.div
                  className="absolute -top-8 left-1/2 -translate-x-1/2"
                  animate={{ y: [0, -5, 0] }}
                >
                  <span className="text-2xl"><span className="text-blue-500">→</span></span>
                </motion.div>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
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
              <span className="text-xl"><GemIcon /></span>
              <span className="font-caveat text-xl font-bold">{totalCoins}</span>
            </WCard>
            <WCard variant="achievement" className="py-2 px-4 flex items-center gap-2"
            >
              <span className="font-caveat text-lg">{masteredWords.length} Words</span>
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
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <GemIcon />
          </motion.div>
          <h1 className="font-amatic text-5xl font-bold text-white">
            Vocabulary Treasures
          </h1>
          <p className="font-nunito text-green-100">
            Set {currentSetIndex + 1} of {sets.length} • {currentSet.name}
          </p>
        </motion.div>

        {/* Challenge Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentSetIndex}-${currentChallengeIndex}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="max-w-xl mx-auto"
          >
            <WCard className="bg-white/95 backdrop-blur-sm"
            >
              {/* Challenge Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="text-5xl">{currentChallenge?.word.emoji}</div>
                <div className="flex-1">
                  <span className="inline-block px-3 py-1 bg-yellow-200 rounded-full font-nunito text-sm mb-2">
                    {currentChallenge?.type === 'definition' && '<GemIcon /> Definition'}
                    {currentChallenge?.type === 'synonym' && 'Synonym'}
                    {currentChallenge?.type === 'context' && 'Context Clue'}
                    {currentChallenge?.type === 'antonym' && 'Antonym (Hard!)'}
                  </span>
                  
                  <h3 className="font-amatic text-3xl font-bold text-ink-black">
                    {currentChallenge?.word.word}
                  </h3>
                </div>
              </div>

              {/* Challenge Prompt */}
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <p className="font-nunito text-lg text-ink-black">
                  {currentChallenge && getChallengePrompt(currentChallenge.type)}
                </p>
              </div>

              {/* Definition Toggle */}
              <div className="mb-4 text-center">
                <button
                  onClick={() => setShowDefinition(!showDefinition)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  {showDefinition ? 'Hide Definition' : 'Need a hint? Show definition'}
                </button>
                
                <AnimatePresence>
                  {showDefinition && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2 p-3 bg-green-100 rounded-lg"
                    >
                      <p className="font-nunito text-sm">
                        <strong>Definition:</strong> {currentChallenge?.word.definition}
                      </p>
                      <p className="font-nunito text-sm mt-1">
                        <strong>Example:</strong> {currentChallenge?.word.contextSentence}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Answer Options */}
              <div className="grid gap-3 mb-6">
                {currentChallenge?.options.map((option, index) => (
                  <motion.button
                    key={index}
                    className={`p-4 rounded-lg font-nunito text-lg text-left transition-all ${
                      selectedAnswer === option
                        ? 'bg-yellow-500 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-ink-black'
                    } ${
                      feedback === 'correct' && option === currentChallenge.correctAnswer
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
                      <GemIcon /> Correct! +15 gems! Word added to your collection!
                    </div>
                    <WButton onClick={handleNext} className="mt-4">
                      {currentChallengeIndex < challenges.length - 1 
                        ? 'Next Challenge →' 
                        : 'Open Next Chest <GiftIcon />'}
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
                      <span className="text-red-500">✕</span> Not quite. The correct answer was: {currentChallenge?.correctAnswer}
                    </div>
                    <WButton 
                      variant="secondary" 
                      onClick={handleNext}
                      className="mt-4"
                    >
                      Continue
                    </WButton>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Progress */}
              <div className="mt-6">
                <WProgress 
                  value={((currentChallengeIndex + 1) / challenges.length) * 100} 
                  max={100}
                />
                <p className="font-nunito text-sm text-center mt-2 text-ink-grey">
                  Challenge {currentChallengeIndex + 1} of {challenges.length}
                </p>
              </div>
            </WCard>
          </motion.div>
        </AnimatePresence>

        {/* Vocabulary Collection Display */}
        {masteredWords.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 max-w-2xl mx-auto"
          >
            <WCard variant="achievement">
              <h3 className="font-amatic text-2xl font-bold text-center mb-4">
                Your Vocabulary Collection
              </h3>
              
              <div className="flex flex-wrap gap-2 justify-center">
                {masteredWords.map((word, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="inline-block bg-green-100 rounded-full px-3 py-1 font-nunito text-sm"
                  >
                    <CheckIcon /> {word}
                  </motion.span>
                ))}
              </div>
            </WCard>
          </motion.div>
        )}
      </div>
    </main>
  )
}
