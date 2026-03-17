// ============================================
// GAMIFICATION SYSTEM - Core Types & Interfaces
// ============================================

export interface PlayerState {
  xp: number;
  level: number;
  badges: string[];
  streak: {
    current: number;
    lastLogin: string; // ISO date string
    longest: number;
  };
  dailyChallenges: DailyChallenge[];
  lastChallengeReset: string;
  worldProgress: {
    math: WorldProgress;
    reading: WorldProgress;
    grammar: WorldProgress;
  };
  stats: {
    totalQuestionsAnswered: number;
    totalCorrectAnswers: number;
    totalTimePlayed: number; // in minutes
    sessionsCompleted: number;
  };
}

export interface WorldProgress {
  xp: number;
  activitiesCompleted: number;
  perfectSessions: number;
  highestStreak: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string; // SVG string or icon name
  category: 'math' | 'reading' | 'grammar' | 'general' | 'streak';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  condition: (state: PlayerState) => boolean;
}

export interface DailyChallenge {
  id: string;
  type: 'answer_questions' | 'complete_activity' | 'perfect_score' | 'play_world';
  world?: 'math' | 'reading' | 'grammar';
  target: number;
  current: number;
  xpReward: number;
  completed: boolean;
  description: string;
}

export interface XPReward {
  amount: number;
  reason: string;
  multiplier?: number;
}

// ============================================
// XP CALCULATION
// ============================================

export const XP_PER_LEVEL = 1000;
export const MAX_LEVEL = 100;

export function calculateLevel(xp: number): number {
  const level = Math.floor(xp / XP_PER_LEVEL) + 1;
  return Math.min(level, MAX_LEVEL);
}

export function getXPForNextLevel(currentXP: number): number {
  const currentLevel = calculateLevel(currentXP);
  if (currentLevel >= MAX_LEVEL) return 0;
  return currentLevel * XP_PER_LEVEL - currentXP;
}

export function getLevelProgress(xp: number): number {
  const currentLevel = calculateLevel(xp);
  const xpAtCurrentLevel = (currentLevel - 1) * XP_PER_LEVEL;
  const xpNeededForNext = XP_PER_LEVEL;
  return ((xp - xpAtCurrentLevel) / xpNeededForNext) * 100;
}

// ============================================
// STREAK CALCULATION
// ============================================

export function checkStreak(lastLogin: string): { valid: boolean; reset: boolean } {
  const last = new Date(lastLogin);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return { valid: true, reset: false }; // Already logged in today
  if (diffDays === 1) return { valid: true, reset: false }; // Consecutive day
  return { valid: false, reset: true }; // Streak broken
}

export function getStreakMultiplier(streak: number): number {
  if (streak >= 30) return 2.0;
  if (streak >= 14) return 1.75;
  if (streak >= 7) return 1.5;
  if (streak >= 3) return 1.25;
  return 1.0;
}

// ============================================
// DEFAULT STATE
// ============================================

export function createDefaultPlayerState(): PlayerState {
  return {
    xp: 0,
    level: 1,
    badges: [],
    streak: {
      current: 0,
      lastLogin: new Date().toISOString(),
      longest: 0,
    },
    dailyChallenges: [],
    lastChallengeReset: new Date().toISOString(),
    worldProgress: {
      math: { xp: 0, activitiesCompleted: 0, perfectSessions: 0, highestStreak: 0 },
      reading: { xp: 0, activitiesCompleted: 0, perfectSessions: 0, highestStreak: 0 },
      grammar: { xp: 0, activitiesCompleted: 0, perfectSessions: 0, highestStreak: 0 },
    },
    stats: {
      totalQuestionsAnswered: 0,
      totalCorrectAnswers: 0,
      totalTimePlayed: 0,
      sessionsCompleted: 0,
    },
  };
}
