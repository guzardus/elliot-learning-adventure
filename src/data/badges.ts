// ============================================
// BADGE DEFINITIONS
// ============================================

import { Badge } from '../utils/gamificationTypes';

// Re-export Badge type for components
export type { Badge } from '../utils/gamificationTypes';

export const BADGE_DEFINITIONS: Badge[] = [
  // ============================================
  // MATH BADGES
  // ============================================
  {
    id: 'math_beginner',
    name: 'Math Beginner',
    description: 'Complete your first Math Mountains activity',
    icon: 'mountain',
    category: 'math',
    rarity: 'common',
    condition: (state) => state.worldProgress.math.activitiesCompleted >= 1,
  },
  {
    id: 'math_explorer',
    name: 'Math Explorer',
    description: 'Complete 10 Math activities',
    icon: 'compass',
    category: 'math',
    rarity: 'common',
    condition: (state) => state.worldProgress.math.activitiesCompleted >= 10,
  },
  {
    id: 'math_master',
    name: 'Math Master',
    description: 'Complete 50 Math activities',
    icon: 'abacus',
    category: 'math',
    rarity: 'rare',
    condition: (state) => state.worldProgress.math.activitiesCompleted >= 50,
  },
  {
    id: 'perfect_mathematician',
    name: 'Perfect Mathematician',
    description: 'Get 10 perfect scores in Math Mountains',
    icon: 'gold-star',
    category: 'math',
    rarity: 'epic',
    condition: (state) => state.worldProgress.math.perfectSessions >= 10,
  },
  {
    id: 'math_streak',
    name: 'Math Streak Champion',
    description: 'Get a streak of 20 correct answers in one session',
    icon: 'flame',
    category: 'math',
    rarity: 'rare',
    condition: (state) => state.worldProgress.math.highestStreak >= 20,
  },
  
  // ============================================
  // READING BADGES
  // ============================================
  {
    id: 'reading_beginner',
    name: 'Reading Ranger',
    description: 'Complete your first Reading Rainforest activity',
    icon: 'book',
    category: 'reading',
    rarity: 'common',
    condition: (state) => state.worldProgress.reading.activitiesCompleted >= 1,
  },
  {
    id: 'bookworm',
    name: 'Bookworm',
    description: 'Complete 20 Reading activities',
    icon: 'worm',
    category: 'reading',
    rarity: 'common',
    condition: (state) => state.worldProgress.reading.activitiesCompleted >= 20,
  },
  {
    id: 'story_master',
    name: 'Story Master',
    description: 'Complete 50 Reading activities',
    icon: 'magic-book',
    category: 'reading',
    rarity: 'rare',
    condition: (state) => state.worldProgress.reading.activitiesCompleted >= 50,
  },
  {
    id: 'perfect_reader',
    name: 'Perfect Reader',
    description: 'Get 10 perfect scores in Reading Rainforest',
    icon: 'trophy',
    category: 'reading',
    rarity: 'epic',
    condition: (state) => state.worldProgress.reading.perfectSessions >= 10,
  },
  {
    id: 'vocab_collector',
    name: 'Vocabulary Collector',
    description: 'Master 100 vocabulary words',
    icon: 'gem',
    category: 'reading',
    rarity: 'rare',
    condition: (state) => state.stats.totalCorrectAnswers >= 100,
  },
  
  // ============================================
  // GRAMMAR BADGES
  // ============================================
  {
    id: 'grammar_beginner',
    name: 'Grammar Guardian',
    description: 'Complete your first Grammar Galaxy activity',
    icon: 'shield',
    category: 'grammar',
    rarity: 'common',
    condition: (state) => state.worldProgress.grammar.activitiesCompleted >= 1,
  },
  {
    id: 'spelling_star',
    name: 'Spelling Star',
    description: 'Complete 20 Grammar activities',
    icon: 'star-badge',
    category: 'grammar',
    rarity: 'common',
    condition: (state) => state.worldProgress.grammar.activitiesCompleted >= 20,
  },
  {
    id: 'grammar_guru',
    name: 'Grammar Guru',
    description: 'Complete 50 Grammar activities',
    icon: 'graduate',
    category: 'grammar',
    rarity: 'rare',
    condition: (state) => state.worldProgress.grammar.activitiesCompleted >= 50,
  },
  {
    id: 'perfect_grammar',
    name: 'Grammar Perfectionist',
    description: 'Get 10 perfect scores in Grammar Galaxy',
    icon: 'perfect-circle',
    category: 'grammar',
    rarity: 'epic',
    condition: (state) => state.worldProgress.grammar.perfectSessions >= 10,
  },
  {
    id: 'punctuation_pro',
    name: 'Punctuation Pro',
    description: 'Answer 50 punctuation questions correctly',
    icon: 'exclamation',
    category: 'grammar',
    rarity: 'rare',
    condition: (state) => state.stats.totalCorrectAnswers >= 50,
  },
  
  // ============================================
  // STREAK BADGES
  // ============================================
  {
    id: 'streak_3',
    name: 'Getting Started',
    description: 'Maintain a 3-day streak',
    icon: 'flame-3',
    category: 'streak',
    rarity: 'common',
    condition: (state) => state.streak.current >= 3,
  },
  {
    id: 'streak_7',
    name: 'Week Warrior',
    description: 'Maintain a 7-day streak',
    icon: 'flame-7',
    category: 'streak',
    rarity: 'rare',
    condition: (state) => state.streak.current >= 7,
  },
  {
    id: 'streak_14',
    name: 'Two Week Titan',
    description: 'Maintain a 14-day streak',
    icon: 'flame-14',
    category: 'streak',
    rarity: 'epic',
    condition: (state) => state.streak.current >= 14,
  },
  {
    id: 'streak_30',
    name: 'Monthly Master',
    description: 'Maintain a 30-day streak',
    icon: 'flame-30',
    category: 'streak',
    rarity: 'legendary',
    condition: (state) => state.streak.current >= 30,
  },
  
  // ============================================
  // GENERAL BADGES
  // ============================================
  {
    id: 'first_steps',
    name: 'First Steps',
    description: 'Complete your first activity in any world',
    icon: 'footprints',
    category: 'general',
    rarity: 'common',
    condition: (state) => 
      state.worldProgress.math.activitiesCompleted >= 1 ||
      state.worldProgress.reading.activitiesCompleted >= 1 ||
      state.worldProgress.grammar.activitiesCompleted >= 1,
  },
  {
    id: 'world_traveler',
    name: 'World Traveler',
    description: 'Play all three worlds in one day',
    icon: 'globe',
    category: 'general',
    rarity: 'rare',
    condition: (state) => 
      state.worldProgress.math.activitiesCompleted >= 1 &&
      state.worldProgress.reading.activitiesCompleted >= 1 &&
      state.worldProgress.grammar.activitiesCompleted >= 1,
  },
  {
    id: 'question_hundred',
    name: 'Century Club',
    description: 'Answer 100 questions correctly',
    icon: '100',
    category: 'general',
    rarity: 'common',
    condition: (state) => state.stats.totalCorrectAnswers >= 100,
  },
  {
    id: 'question_five_hundred',
    name: 'Question Master',
    description: 'Answer 500 questions correctly',
    icon: '500',
    category: 'general',
    rarity: 'rare',
    condition: (state) => state.stats.totalCorrectAnswers >= 500,
  },
  {
    id: 'question_thousand',
    name: 'Knowledge Seeker',
    description: 'Answer 1000 questions correctly',
    icon: '1000',
    category: 'general',
    rarity: 'epic',
    condition: (state) => state.stats.totalCorrectAnswers >= 1000,
  },
  {
    id: 'level_5',
    name: 'Rising Star',
    description: 'Reach Level 5',
    icon: 'star-rise',
    category: 'general',
    rarity: 'common',
    condition: (state) => state.level >= 5,
  },
  {
    id: 'level_10',
    name: 'Level 10 Hero',
    description: 'Reach Level 10',
    icon: 'hero',
    category: 'general',
    rarity: 'rare',
    condition: (state) => state.level >= 10,
  },
  {
    id: 'level_25',
    name: 'Legendary Learner',
    description: 'Reach Level 25',
    icon: 'crown',
    category: 'general',
    rarity: 'epic',
    condition: (state) => state.level >= 25,
  },
  {
    id: 'daily_champion',
    name: 'Daily Champion',
    description: 'Complete all 3 daily challenges in one day',
    icon: 'medal',
    category: 'general',
    rarity: 'rare',
    condition: (state) => 
      state.dailyChallenges.filter(c => c.completed).length >= 3,
  },
  {
    id: 'time_invested',
    name: 'Dedicated Student',
    description: 'Play for a total of 5 hours',
    icon: 'clock',
    category: 'general',
    rarity: 'common',
    condition: (state) => state.stats.totalTimePlayed >= 300,
  },
  {
    id: 'perfect_streak_10',
    name: 'Perfectionist',
    description: 'Get 10 questions correct in a row',
    icon: 'diamond',
    category: 'general',
    rarity: 'epic',
    condition: (state) => 
      Math.max(
        state.worldProgress.math.highestStreak,
        state.worldProgress.reading.highestStreak,
        state.worldProgress.grammar.highestStreak
      ) >= 10,
  },
];

// ============================================
// BADGE HELPER FUNCTIONS
// ============================================

export function getBadgeById(id: string): Badge | undefined {
  return BADGE_DEFINITIONS.find(badge => badge.id === id);
}

export function getBadgesByCategory(category: Badge['category']): Badge[] {
  return BADGE_DEFINITIONS.filter(badge => badge.category === category);
}

export function getBadgesByRarity(rarity: Badge['rarity']): Badge[] {
  return BADGE_DEFINITIONS.filter(badge => badge.rarity === rarity);
}

export const TOTAL_BADGES = BADGE_DEFINITIONS.length;
  // ============================================
  // MATH BADGES
  // ============================================
  {
    id: 'math_beginner',
    name: 'Math Beginner',
    description: 'Complete your first Math Mountains activity',
    icon: '🏔️',
    category: 'math',
    rarity: 'common',
    condition: (state) => state.worldProgress.math.activitiesCompleted >= 1,
  },
  {
    id: 'math_explorer',
    name: 'Math Explorer',
    description: 'Complete 10 Math activities',
    icon: '🔢',
    category: 'math',
    rarity: 'common',
    condition: (state) => state.worldProgress.math.activitiesCompleted >= 10,
  },
  {
    id: 'math_master',
    name: 'Math Master',
    description: 'Complete 50 Math activities',
    icon: '🧮',
    category: 'math',
    rarity: 'rare',
    condition: (state) => state.worldProgress.math.activitiesCompleted >= 50,
  },
  {
    id: 'perfect_mathematician',
    name: 'Perfect Mathematician',
    description: 'Get 10 perfect scores in Math Mountains',
    icon: '⭐',
    category: 'math',
    rarity: 'epic',
    condition: (state) => state.worldProgress.math.perfectSessions >= 10,
  },
  {
    id: 'math_streak',
    name: 'Math Streak Champion',
    description: 'Get a streak of 20 correct answers in one session',
    icon: '🔥',
    category: 'math',
    rarity: 'rare',
    condition: (state) => state.worldProgress.math.highestStreak >= 20,
  },
  
  // ============================================
  // READING BADGES
  // ============================================
  {
    id: 'reading_beginner',
    name: 'Reading Ranger',
    description: 'Complete your first Reading Rainforest activity',
    icon: '📚',
    category: 'reading',
    rarity: 'common',
    condition: (state) => state.worldProgress.reading.activitiesCompleted >= 1,
  },
  {
    id: 'bookworm',
    name: 'Bookworm',
    description: 'Complete 20 Reading activities',
    icon: '🐛',
    category: 'reading',
    rarity: 'common',
    condition: (state) => state.worldProgress.reading.activitiesCompleted >= 20,
  },
  {
    id: 'story_master',
    name: 'Story Master',
    description: 'Complete 50 Reading activities',
    icon: '📖',
    category: 'reading',
    rarity: 'rare',
    condition: (state) => state.worldProgress.reading.activitiesCompleted >= 50,
  },
  {
    id: 'perfect_reader',
    name: 'Perfect Reader',
    description: 'Get 10 perfect scores in Reading Rainforest',
    icon: '🏆',
    category: 'reading',
    rarity: 'epic',
    condition: (state) => state.worldProgress.reading.perfectSessions >= 10,
  },
  {
    id: 'vocab_collector',
    name: 'Vocabulary Collector',
    description: 'Master 100 vocabulary words',
    icon: '💎',
    category: 'reading',
    rarity: 'rare',
    condition: (state) => state.stats.totalCorrectAnswers >= 100,
  },
  
  // ============================================
  // GRAMMAR BADGES
  // ============================================
  {
    id: 'grammar_beginner',
    name: 'Grammar Guardian',
    description: 'Complete your first Grammar Galaxy activity',
    icon: '🌌',
    category: 'grammar',
    rarity: 'common',
    condition: (state) => state.worldProgress.grammar.activitiesCompleted >= 1,
  },
  {
    id: 'spelling_star',
    name: 'Spelling Star',
    description: 'Complete 20 Grammar activities',
    icon: '⭐',
    category: 'grammar',
    rarity: 'common',
    condition: (state) => state.worldProgress.grammar.activitiesCompleted >= 20,
  },
  {
    id: 'grammar_guru',
    name: 'Grammar Guru',
    description: 'Complete 50 Grammar activities',
    icon: '🎓',
    category: 'grammar',
    rarity: 'rare',
    condition: (state) => state.worldProgress.grammar.activitiesCompleted >= 50,
  },
  {
    id: 'perfect_grammar',
    name: 'Grammar Perfectionist',
    description: 'Get 10 perfect scores in Grammar Galaxy',
    icon: '✨',
    category: 'grammar',
    rarity: 'epic',
    condition: (state) => state.worldProgress.grammar.perfectSessions >= 10,
  },
  {
    id: 'punctuation_pro',
    name: 'Punctuation Pro',
    description: 'Answer 50 punctuation questions correctly',
    icon: '❗',
    category: 'grammar',
    rarity: 'rare',
    condition: (state) => state.stats.totalCorrectAnswers >= 50,
  },
  
  // ============================================
  // STREAK BADGES
  // ============================================
  {
    id: 'streak_3',
    name: 'Getting Started',
    description: 'Maintain a 3-day streak',
    icon: '🔥',
    category: 'streak',
    rarity: 'common',
    condition: (state) => state.streak.current >= 3,
  },
  {
    id: 'streak_7',
    name: 'Week Warrior',
    description: 'Maintain a 7-day streak',
    icon: '📅',
    category: 'streak',
    rarity: 'rare',
    condition: (state) => state.streak.current >= 7,
  },
  {
    id: 'streak_14',
    name: 'Two Week Titan',
    description: 'Maintain a 14-day streak',
    icon: '💪',
    category: 'streak',
    rarity: 'epic',
    condition: (state) => state.streak.current >= 14,
  },
  {
    id: 'streak_30',
    name: 'Monthly Master',
    description: 'Maintain a 30-day streak',
    icon: '🏆',
    category: 'streak',
    rarity: 'legendary',
    condition: (state) => state.streak.current >= 30,
  },
  
  // ============================================
  // GENERAL BADGES
  // ============================================
  {
    id: 'first_steps',
    name: 'First Steps',
    description: 'Complete your first activity in any world',
    icon: '👣',
    category: 'general',
    rarity: 'common',
    condition: (state) => 
      state.worldProgress.math.activitiesCompleted >= 1 ||
      state.worldProgress.reading.activitiesCompleted >= 1 ||
      state.worldProgress.grammar.activitiesCompleted >= 1,
  },
  {
    id: 'world_traveler',
    name: 'World Traveler',
    description: 'Play all three worlds in one day',
    icon: '🌍',
    category: 'general',
    rarity: 'rare',
    condition: (state) => 
      state.worldProgress.math.activitiesCompleted >= 1 &&
      state.worldProgress.reading.activitiesCompleted >= 1 &&
      state.worldProgress.grammar.activitiesCompleted >= 1,
  },
  {
    id: 'question_hundred',
    name: 'Century Club',
    description: 'Answer 100 questions correctly',
    icon: '💯',
    category: 'general',
    rarity: 'common',
    condition: (state) => state.stats.totalCorrectAnswers >= 100,
  },
  {
    id: 'question_five_hundred',
    name: 'Question Master',
    description: 'Answer 500 questions correctly',
    icon: '🎯',
    category: 'general',
    rarity: 'rare',
    condition: (state) => state.stats.totalCorrectAnswers >= 500,
  },
  {
    id: 'question_thousand',
    name: 'Knowledge Seeker',
    description: 'Answer 1000 questions correctly',
    icon: '🧠',
    category: 'general',
    rarity: 'epic',
    condition: (state) => state.stats.totalCorrectAnswers >= 1000,
  },
  {
    id: 'level_5',
    name: 'Rising Star',
    description: 'Reach Level 5',
    icon: '⭐',
    category: 'general',
    rarity: 'common',
    condition: (state) => state.level >= 5,
  },
  {
    id: 'level_10',
    name: 'Level 10 Hero',
    description: 'Reach Level 10',
    icon: '🦸',
    category: 'general',
    rarity: 'rare',
    condition: (state) => state.level >= 10,
  },
  {
    id: 'level_25',
    name: 'Legendary Learner',
    description: 'Reach Level 25',
    icon: '👑',
    category: 'general',
    rarity: 'epic',
    condition: (state) => state.level >= 25,
  },
  {
    id: 'daily_champion',
    name: 'Daily Champion',
    description: 'Complete all 3 daily challenges in one day',
    icon: '🏅',
    category: 'general',
    rarity: 'rare',
    condition: (state) => 
      state.dailyChallenges.filter(c => c.completed).length >= 3,
  },
  {
    id: 'time_invested',
    name: 'Dedicated Student',
    description: 'Play for a total of 5 hours',
    icon: '⏰',
    category: 'general',
    rarity: 'common',
    condition: (state) => state.stats.totalTimePlayed >= 300,
  },
  {
    id: 'perfect_streak_10',
    name: 'Perfectionist',
    description: 'Get 10 questions correct in a row',
    icon: '💎',
    category: 'general',
    rarity: 'epic',
    condition: (state) => 
      Math.max(
        state.worldProgress.math.highestStreak,
        state.worldProgress.reading.highestStreak,
        state.worldProgress.grammar.highestStreak
      ) >= 10,
  },
];

// ============================================
// BADGE HELPER FUNCTIONS
// ============================================

export function getBadgeById(id: string): Badge | undefined {
  return BADGE_DEFINITIONS.find(badge => badge.id === id);
}

export function getBadgesByCategory(category: Badge['category']): Badge[] {
  return BADGE_DEFINITIONS.filter(badge => badge.category === category);
}

export function getBadgesByRarity(rarity: Badge['rarity']): Badge[] {
  return BADGE_DEFINITIONS.filter(badge => badge.rarity === rarity);
}

export const TOTAL_BADGES = BADGE_DEFINITIONS.length;
