'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { 
  PlayerState, 
  DailyChallenge, 
  XPReward,
  createDefaultPlayerState 
} from '@/utils/gamificationTypes'
import {
  initializeGamification,
  awardXP,
  recordActivityCompletion,
  recordQuestionAnswered,
  updateChallengeProgress,
  getUnlockedBadges,
  getLockedBadges,
} from '@/utils/gamification'
import { Badge } from '@/data/badges'

// ============================================
// GAMIFICATION CONTEXT
// ============================================

interface GamificationContextType {
  player: PlayerState
  isInitialized: boolean
  
  // Actions
  awardXP: (reward: XPReward, world?: 'math' | 'reading' | 'grammar') => {
    leveledUp: boolean
    newBadges: string[]
  }
  completeActivity: (
    world: 'math' | 'reading' | 'grammar',
    activityData: {
      score: number
      perfect: boolean
      questionsAnswered: number
      correctAnswers: number
      timeSpent: number
    }
  ) => {
    rewards: XPReward[]
    newBadges: string[]
  }
  answerQuestion: (
    world: 'math' | 'reading' | 'grammar',
    correct: boolean,
    difficulty?: 'easy' | 'medium' | 'hard'
  ) => number
  updateChallenge: (
    type: DailyChallenge['type'],
    world?: 'math' | 'reading' | 'grammar',
    amount?: number
  ) => DailyChallenge[]
  getUnlockedBadges: () => Badge[]
  getLockedBadges: () => Badge[]
  refreshState: () => void
}

const GamificationContext = createContext<GamificationContextType | null>(null)

export function useGamificationContext() {
  const context = useContext(GamificationContext)
  if (!context) {
    throw new Error('useGamificationContext must be used within GamificationProvider')
  }
  return context
}

// ============================================
// PROVIDER COMPONENT
// ============================================

export function GamificationProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<{
    player: PlayerState
    isInitialized: boolean
  }>({
    player: createDefaultPlayerState(),
    isInitialized: false,
  })

  // Initialize on mount
  useEffect(() => {
    const playerState = initializeGamification()
    setState({
      player: playerState,
      isInitialized: true,
    })
  }, [])

  // XP Award
  const handleAwardXP = (reward: XPReward, world?: 'math' | 'reading' | 'grammar') => {
    const result = awardXP(state.player, reward, world)
    setState(prev => ({ ...prev, player: result.newState }))
    return {
      leveledUp: result.leveledUp,
      newBadges: result.newBadges,
    }
  }

  // Activity Completion
  const handleCompleteActivity = (
    world: 'math' | 'reading' | 'grammar',
    activityData: {
      score: number
      perfect: boolean
      questionsAnswered: number
      correctAnswers: number
      timeSpent: number
    }
  ) => {
    const result = recordActivityCompletion(state.player, world, activityData)
    setState(prev => ({ ...prev, player: result.newState }))
    return {
      rewards: result.rewards,
      newBadges: result.newBadges,
    }
  }

  // Question Answered
  const handleAnswerQuestion = (
    world: 'math' | 'reading' | 'grammar',
    correct: boolean,
    difficulty: 'easy' | 'medium' | 'hard' = 'medium'
  ) => {
    const result = recordQuestionAnswered(state.player, world, correct, difficulty)
    setState(prev => ({ ...prev, player: result.newState }))
    return result.xpAwarded
  }

  // Update Challenge Progress
  const handleUpdateChallenge = (
    type: DailyChallenge['type'],
    world?: 'math' | 'reading' | 'grammar',
    amount: number = 1
  ) => {
    const result = updateChallengeProgress(state.player, type, world, amount)
    setState(prev => ({ ...prev, player: result.newState }))
    return result.completedChallenges
  }

  // Get Badges
  const handleGetUnlockedBadges = () => getUnlockedBadges(state.player)
  const handleGetLockedBadges = () => getLockedBadges(state.player)

  // Refresh State
  const handleRefreshState = () => {
    const playerState = initializeGamification()
    setState({
      player: playerState,
      isInitialized: true,
    })
  }

  const value: GamificationContextType = {
    player: state.player,
    isInitialized: state.isInitialized,
    awardXP: handleAwardXP,
    completeActivity: handleCompleteActivity,
    answerQuestion: handleAnswerQuestion,
    updateChallenge: handleUpdateChallenge,
    getUnlockedBadges: handleGetUnlockedBadges,
    getLockedBadges: handleGetLockedBadges,
    refreshState: handleRefreshState,
  }

  return (
    <GamificationContext.Provider value={value}>
      {children}
    </GamificationContext.Provider>
  )
}
