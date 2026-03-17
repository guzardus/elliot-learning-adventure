// ============================================
// GAMIFICATION SYSTEM - Core Engine
// ============================================

import {
  PlayerState,
  Badge,
  DailyChallenge,
  XPReward,
  createDefaultPlayerState,
  calculateLevel,
  checkStreak,
  getStreakMultiplier,
} from './gamificationTypes';

const STORAGE_KEY = 'elliot_adventure_player_state';

// ============================================
// STORAGE FUNCTIONS
// ============================================

export function loadPlayerState(): PlayerState {
  if (typeof window === 'undefined') return createDefaultPlayerState();
  
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return createDefaultPlayerState();
  
  try {
    return JSON.parse(saved);
  } catch {
    return createDefaultPlayerState();
  }
}

export function savePlayerState(state: PlayerState): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

// ============================================
// XP AWARD SYSTEM
// ============================================

export function awardXP(
  state: PlayerState, 
  reward: XPReward, 
  world?: 'math' | 'reading' | 'grammar'
): { newState: PlayerState; leveledUp: boolean; newBadges: string[] } {
  const streakMultiplier = getStreakMultiplier(state.streak.current);
  const finalMultiplier = (reward.multiplier || 1) * streakMultiplier;
  const finalXP = Math.floor(reward.amount * finalMultiplier);
  
  const oldLevel = state.level;
  const newXP = state.xp + finalXP;
  const newLevel = calculateLevel(newXP);
  const leveledUp = newLevel > oldLevel;
  
  // Update state
  const newState: PlayerState = {
    ...state,
    xp: newXP,
    level: newLevel,
    worldProgress: world ? {
      ...state.worldProgress,
      [world]: {
        ...state.worldProgress[world],
        xp: state.worldProgress[world].xp + finalXP,
      },
    } : state.worldProgress,
  };
  
  // Check for new badges
  const newBadges = checkForNewBadges(newState);
  newState.badges = Array.from(new Set([...newState.badges, ...newBadges]));
  
  savePlayerState(newState);
  
  return { newState, leveledUp, newBadges };
}

// ============================================
// STREAK MANAGEMENT
// ============================================

export function updateStreak(state: PlayerState): { newState: PlayerState; streakContinued: boolean } {
  const { valid, reset } = checkStreak(state.streak.lastLogin);
  const today = new Date().toISOString();
  
  let newStreak = state.streak.current;
  
  if (reset) {
    newStreak = 1; // Start fresh
  } else if (valid && new Date(state.streak.lastLogin).toDateString() !== new Date().toDateString()) {
    newStreak += 1; // Continue streak
  }
  
  const longest = Math.max(state.streak.longest, newStreak);
  
  const newState: PlayerState = {
    ...state,
    streak: {
      current: newStreak,
      lastLogin: today,
      longest,
    },
  };
  
  savePlayerState(newState);
  
  return { 
    newState, 
    streakContinued: !reset && newStreak > 1 
  };
}

// ============================================
// BADGE SYSTEM
// ============================================

import { BADGE_DEFINITIONS } from '../data/badges';

export function checkForNewBadges(state: PlayerState): string[] {
  const newBadges: string[] = [];
  
  for (const badge of BADGE_DEFINITIONS) {
    if (!state.badges.includes(badge.id) && badge.condition(state)) {
      newBadges.push(badge.id);
    }
  }
  
  return newBadges;
}

export function getUnlockedBadges(state: PlayerState): Badge[] {
  return BADGE_DEFINITIONS.filter(badge => state.badges.includes(badge.id));
}

export function getLockedBadges(state: PlayerState): Badge[] {
  return BADGE_DEFINITIONS.filter(badge => !state.badges.includes(badge.id));
}

// ============================================
// DAILY CHALLENGES
// ============================================

export function generateDailyChallenges(): DailyChallenge[] {
  const challenges: DailyChallenge[] = [
    {
      id: `math_questions_${Date.now()}`,
      type: 'answer_questions',
      world: 'math',
      target: 10,
      current: 0,
      xpReward: 100,
      completed: false,
      description: 'Answer 10 Math questions correctly',
    },
    {
      id: `reading_passages_${Date.now()}`,
      type: 'complete_activity',
      world: 'reading',
      target: 2,
      current: 0,
      xpReward: 150,
      completed: false,
      description: 'Complete 2 Reading activities',
    },
    {
      id: `grammar_perfect_${Date.now()}`,
      type: 'perfect_score',
      world: 'grammar',
      target: 1,
      current: 0,
      xpReward: 200,
      completed: false,
      description: 'Get a perfect score in Grammar Galaxy',
    },
  ];
  
  return challenges;
}

export function resetDailyChallenges(state: PlayerState): PlayerState {
  const newState: PlayerState = {
    ...state,
    dailyChallenges: generateDailyChallenges(),
    lastChallengeReset: new Date().toISOString(),
  };
  
  savePlayerState(newState);
  return newState;
}

export function checkChallengeReset(state: PlayerState): PlayerState {
  const lastReset = new Date(state.lastChallengeReset);
  const now = new Date();
  
  // Check if it's a new day (after midnight)
  if (lastReset.toDateString() !== now.toDateString()) {
    return resetDailyChallenges(state);
  }
  
  return state;
}

export function updateChallengeProgress(
  state: PlayerState,
  type: DailyChallenge['type'],
  world?: 'math' | 'reading' | 'grammar',
  amount: number = 1
): { newState: PlayerState; completedChallenges: DailyChallenge[] } {
  const completedChallenges: DailyChallenge[] = [];
  
  const updatedChallenges = state.dailyChallenges.map(challenge => {
    if (challenge.completed) return challenge;
    if (challenge.type !== type) return challenge;
    if (world && challenge.world !== world) return challenge;
    
    const newCurrent = Math.min(challenge.current + amount, challenge.target);
    const isCompleted = newCurrent >= challenge.target;
    
    if (isCompleted && !challenge.completed) {
      completedChallenges.push({ ...challenge, completed: true });
    }
    
    return {
      ...challenge,
      current: newCurrent,
      completed: isCompleted,
    };
  });
  
  const newState: PlayerState = {
    ...state,
    dailyChallenges: updatedChallenges,
  };
  
  savePlayerState(newState);
  
  return { newState, completedChallenges };
}

// ============================================
// ACTIVITY COMPLETION
// ============================================

export function recordActivityCompletion(
  state: PlayerState,
  world: 'math' | 'reading' | 'grammar',
  activityData: {
    score: number;
    perfect: boolean;
    questionsAnswered: number;
    correctAnswers: number;
    timeSpent: number;
  }
): { newState: PlayerState; rewards: XPReward[]; newBadges: string[] } {
  const rewards: XPReward[] = [];
  
  // Base XP for completing activity
  rewards.push({
    amount: 50,
    reason: 'Activity Completed',
  });
  
  // Bonus for perfect score
  if (activityData.perfect) {
    rewards.push({
      amount: 100,
      reason: 'Perfect Score!',
      multiplier: 1.5,
    });
  }
  
  // Bonus for accuracy
  const accuracy = activityData.questionsAnswered > 0 
    ? activityData.correctAnswers / activityData.questionsAnswered 
    : 0;
  
  if (accuracy >= 0.9) {
    rewards.push({
      amount: 50,
      reason: '90%+ Accuracy',
    });
  }
  
  // Calculate total XP
  const totalXP = rewards.reduce((sum, r) => sum + r.amount * (r.multiplier || 1), 0);
  
  // Update world progress
  const newWorldProgress = { ...state.worldProgress };
  newWorldProgress[world].activitiesCompleted += 1;
  if (activityData.perfect) {
    newWorldProgress[world].perfectSessions += 1;
  }
  
  // Update stats
  const newStats = {
    ...state.stats,
    totalQuestionsAnswered: state.stats.totalQuestionsAnswered + activityData.questionsAnswered,
    totalCorrectAnswers: state.stats.totalCorrectAnswers + activityData.correctAnswers,
    totalTimePlayed: state.stats.totalTimePlayed + activityData.timeSpent,
    sessionsCompleted: state.stats.sessionsCompleted + 1,
  };
  
  let currentState: PlayerState = {
    ...state,
    worldProgress: newWorldProgress,
    stats: newStats,
  };
  
  // Award XP
  const xpResult = awardXP(currentState, { amount: totalXP, reason: 'Activity Rewards' }, world);
  currentState = xpResult.newState;
  
  // Update challenge progress
  const challengeResult = updateChallengeProgress(
    currentState,
    'complete_activity',
    world,
    1
  );
  currentState = challengeResult.newState;
  
  // Award XP for completed challenges
  for (const completed of challengeResult.completedChallenges) {
    const challengeXP = awardXP(currentState, {
      amount: completed.xpReward,
      reason: `Daily Challenge: ${completed.description}`,
    });
    currentState = challengeXP.newState;
  }
  
  savePlayerState(currentState);
  
  return {
    newState: currentState,
    rewards,
    newBadges: xpResult.newBadges,
  };
}

// ============================================
// QUESTION ANSWERED
// ============================================

export function recordQuestionAnswered(
  state: PlayerState,
  world: 'math' | 'reading' | 'grammar',
  correct: boolean,
  difficulty: 'easy' | 'medium' | 'hard' = 'medium'
): { newState: PlayerState; xpAwarded: number } {
  const baseXP = correct ? 20 : 5;
  const difficultyMultiplier = difficulty === 'hard' ? 1.5 : difficulty === 'easy' ? 0.75 : 1;
  const xpAwarded = Math.floor(baseXP * difficultyMultiplier);
  
  const xpResult = awardXP(
    state,
    {
      amount: xpAwarded,
      reason: correct ? 'Correct Answer' : 'Attempted Question',
    },
    world
  );
  
  // Update challenge progress for correct answers
  if (correct) {
    const challengeResult = updateChallengeProgress(
      xpResult.newState,
      'answer_questions',
      world,
      1
    );
    
    // Award challenge XP if completed
    let finalState = challengeResult.newState;
    for (const completed of challengeResult.completedChallenges) {
      const challengeXP = awardXP(finalState, {
        amount: completed.xpReward,
        reason: `Daily Challenge: ${completed.description}`,
      });
      finalState = challengeXP.newState;
    }
    
    savePlayerState(finalState);
    return { newState: finalState, xpAwarded };
  }
  
  savePlayerState(xpResult.newState);
  return { newState: xpResult.newState, xpAwarded };
}

// ============================================
// INITIALIZATION
// ============================================

export function initializeGamification(): PlayerState {
  let state = loadPlayerState();
  state = checkChallengeReset(state);
  const streakResult = updateStreak(state);
  return streakResult.newState;
}
