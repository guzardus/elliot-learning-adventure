// ============================================
// REACT HOOK - useGamification
// ============================================

import { useState, useEffect, useCallback } from 'react';
import {
  PlayerState,
  DailyChallenge,
  XPReward,
  createDefaultPlayerState,
} from '../utils/gamificationTypes';
import {
  initializeGamification,
  awardXP,
  recordActivityCompletion,
  recordQuestionAnswered,
  updateChallengeProgress,
  getUnlockedBadges,
  getLockedBadges,
  savePlayerState,
} from '../utils/gamification';
import { Badge } from '../data/badges';

export interface GamificationState {
  player: PlayerState;
  isInitialized: boolean;
}

export interface GamificationActions {
  // XP & Leveling
  awardXP: (reward: XPReward, world?: 'math' | 'reading' | 'grammar') => {
    leveledUp: boolean;
    newBadges: string[];
  };
  
  // Activity Tracking
  completeActivity: (
    world: 'math' | 'reading' | 'grammar',
    activityData: {
      score: number;
      perfect: boolean;
      questionsAnswered: number;
      correctAnswers: number;
      timeSpent: number;
    }
  ) => {
    rewards: XPReward[];
    newBadges: string[];
  };
  
  // Question Tracking
  answerQuestion: (
    world: 'math' | 'reading' | 'grammar',
    correct: boolean,
    difficulty?: 'easy' | 'medium' | 'hard'
  ) => number; // returns XP awarded
  
  // Challenges
  updateChallenge: (
    type: DailyChallenge['type'],
    world?: 'math' | 'reading' | 'grammar',
    amount?: number
  ) => DailyChallenge[]; // returns newly completed challenges
  
  // Badges
  getUnlockedBadges: () => Badge[];
  getLockedBadges: () => Badge[];
  
  // Refresh
  refreshState: () => void;
}

export function useGamification(): [GamificationState, GamificationActions] {
  const [state, setState] = useState<GamificationState>({
    player: createDefaultPlayerState(),
    isInitialized: false,
  });

  // Initialize on mount
  useEffect(() => {
    const playerState = initializeGamification();
    setState({
      player: playerState,
      isInitialized: true,
    });
  }, []);

  // XP Award
  const handleAwardXP = useCallback((reward: XPReward, world?: 'math' | 'reading' | 'grammar') => {
    const result = awardXP(state.player, reward, world);
    setState(prev => ({ ...prev, player: result.newState }));
    return {
      leveledUp: result.leveledUp,
      newBadges: result.newBadges,
    };
  }, [state.player]);

  // Activity Completion
  const handleCompleteActivity = useCallback((
    world: 'math' | 'reading' | 'grammar',
    activityData: {
      score: number;
      perfect: boolean;
      questionsAnswered: number;
      correctAnswers: number;
      timeSpent: number;
    }
  ) => {
    const result = recordActivityCompletion(state.player, world, activityData);
    setState(prev => ({ ...prev, player: result.newState }));
    return {
      rewards: result.rewards,
      newBadges: result.newBadges,
    };
  }, [state.player]);

  // Question Answered
  const handleAnswerQuestion = useCallback((
    world: 'math' | 'reading' | 'grammar',
    correct: boolean,
    difficulty: 'easy' | 'medium' | 'hard' = 'medium'
  ) => {
    const result = recordQuestionAnswered(state.player, world, correct, difficulty);
    setState(prev => ({ ...prev, player: result.newState }));
    return result.xpAwarded;
  }, [state.player]);

  // Update Challenge Progress
  const handleUpdateChallenge = useCallback((
    type: DailyChallenge['type'],
    world?: 'math' | 'reading' | 'grammar',
    amount: number = 1
  ) => {
    const result = updateChallengeProgress(state.player, type, world, amount);
    setState(prev => ({ ...prev, player: result.newState }));
    return result.completedChallenges;
  }, [state.player]);

  // Get Badges
  const handleGetUnlockedBadges = useCallback(() => {
    return getUnlockedBadges(state.player);
  }, [state.player]);

  const handleGetLockedBadges = useCallback(() => {
    return getLockedBadges(state.player);
  }, [state.player]);

  // Refresh State
  const handleRefreshState = useCallback(() => {
    const playerState = initializeGamification();
    setState({
      player: playerState,
      isInitialized: true,
    });
  }, []);

  const actions: GamificationActions = {
    awardXP: handleAwardXP,
    completeActivity: handleCompleteActivity,
    answerQuestion: handleAnswerQuestion,
    updateChallenge: handleUpdateChallenge,
    getUnlockedBadges: handleGetUnlockedBadges,
    getLockedBadges: handleGetLockedBadges,
    refreshState: handleRefreshState,
  };

  return [state, actions];
}

// ============================================
// UTILITY HOOKS
// ============================================

export function useXPProgress() {
  const [state] = useGamification();
  
  return {
    xp: state.player.xp,
    level: state.player.level,
    xpForNextLevel: (state.player.level * 1000) - state.player.xp,
    progress: ((state.player.xp % 1000) / 1000) * 100,
  };
}

export function useStreak() {
  const [state] = useGamification();
  
  return {
    current: state.player.streak.current,
    longest: state.player.streak.longest,
    multiplier: state.player.streak.current >= 30 ? 2.0 
      : state.player.streak.current >= 14 ? 1.75 
      : state.player.streak.current >= 7 ? 1.5 
      : state.player.streak.current >= 3 ? 1.25 
      : 1.0,
  };
}

export function useDailyChallenges() {
  const [state] = useGamification();
  
  return {
    challenges: state.player.dailyChallenges,
    completedCount: state.player.dailyChallenges.filter(c => c.completed).length,
    totalCount: state.player.dailyChallenges.length,
    allCompleted: state.player.dailyChallenges.every(c => c.completed),
  };
}

export function useWorldProgress(world: 'math' | 'reading' | 'grammar') {
  const [state] = useGamification();
  
  return state.player.worldProgress[world];
}

export function useStats() {
  const [state] = useGamification();
  
  return {
    totalQuestions: state.player.stats.totalQuestionsAnswered,
    correctAnswers: state.player.stats.totalCorrectAnswers,
    accuracy: state.player.stats.totalQuestionsAnswered > 0 
      ? (state.player.stats.totalCorrectAnswers / state.player.stats.totalQuestionsAnswered) * 100 
      : 0,
    totalTimePlayed: state.player.stats.totalTimePlayed,
    sessionsCompleted: state.player.stats.sessionsCompleted,
  };
}
