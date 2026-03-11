// WIZARD ADVENTURE - SIMPLIFIED LOOT & CRAFTING SYSTEM

export interface LootItem {
  id: string;
  name: string;
  icon: string; // emoji (fallback)
  image: {
    spriteSheet: string;
    x: number; // percentage position (0-100)
    y: number; // percentage position (0-100)
    width: number; // percentage width
    height: number; // percentage height
  };
  rarity: 'common' | 'rare' | 'epic';
  description: string;
}

export interface SuperItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  craftedAt: string;
  recipe: string; // description of what loot was used
}

export interface Boss {
  id: string;
  name: string;
  subject: 'math' | 'english' | 'science';
  difficulty: 'easy' | 'medium' | 'hard';
  health: number;
  maxHealth: number;
  image: string;
  description: string;
  rewards: string[]; // loot item ids
}

export interface WeeklyProgress {
  weekStartDate: string;
  weekNumber: number;
  sessionsCompleted: number;
  lootEarned: string[];
  bossDefeated: boolean;
  bossHealthRemaining: number;
}

// Module Progress
export interface ModuleProgress {
  moduleId: string;
  completed: boolean;
  questionsAnswered: number;
  totalQuestions: number;
  lootEarned?: string;
  lastAttempted?: string;
}

// Game State Types
export interface GameState {
  player: Player;
  progress: Progress;
  settings: Settings;
  inventory: LootItem[]; // Regular loot items
  superItems: SuperItem[]; // Crafted super items
  weekly: WeeklyProgress;
  moduleProgress: Record<string, ModuleProgress>; // Track progress per module
}

export interface Player {
  name: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  streak: Streak;
  badges: Badge[];
}

export interface Streak {
  current: number;
  longest: number;
  lastLogin: string;
  freezesRemaining: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: string;
  category: 'math' | 'english' | 'general';
}

export interface Progress {
  math: MathProgress;
  english: EnglishProgress;
  totalQuestionsAnswered: number;
  totalCorrect: number;
  sessionsCompleted: number;
  timeSpentMinutes: number;
}

export interface MathProgress {
  addition: SkillProgress;
  subtraction: SkillProgress;
  multiplication: SkillProgress;
  division: SkillProgress;
  wordProblems: SkillProgress;
  measurement: SkillProgress;
  geometry: SkillProgress;
}

export interface EnglishProgress {
  spelling: SkillProgress;
  grammar: SkillProgress;
  punctuation: SkillProgress;
  writing: SkillProgress;
  reading: SkillProgress;
}

export interface SkillProgress {
  level: number;
  xp: number;
  questionsAnswered: number;
  correctAnswers: number;
  mastered: boolean;
  lastPracticed: string;
}

export interface Settings {
  soundEnabled: boolean;
  animationsEnabled: boolean;
  dailyGoal: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

// Question Types
export interface MathQuestion {
  id: string;
  type: 'addition' | 'subtraction' | 'multiplication' | 'division' | 'wordProblem' | 'measurement' | 'geometry';
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  visual?: string;
  options?: string[];
  correctAnswer: string | number;
  hint?: string;
  explanation?: string;
  xpReward: number;
}

export interface EnglishQuestion {
  id: string;
  type: 'spelling' | 'grammar' | 'punctuation' | 'vocabulary' | 'comprehension';
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  context?: string;
  options?: string[];
  correctAnswer: string;
  hint?: string;
  explanation?: string;
  xpReward: number;
}

export interface SpellingWord {
  word: string;
  phonetic?: string;
  sentence: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface WritingPrompt {
  id: string;
  type: 'narrative' | 'persuasive';
  prompt: string;
  image?: string;
  hints: string[];
}

// Activity Types
export type ActivityType = 
  | 'math-addition' 
  | 'math-subtraction' 
  | 'math-multiplication' 
  | 'math-division' 
  | 'math-wordProblems'
  | 'math-measurement'
  | 'math-geometry'
  | 'math-data'
  | 'math-money'
  | 'math-fractions'
  | 'math-patterns'
  | 'english-spelling'
  | 'english-grammar'
  | 'english-punctuation'
  | 'english-writing'
  | 'english-reading'
  | 'surprise-mix';

export interface DailyChallenge {
  id: string;
  type: ActivityType;
  description: string;
  target: number;
  completed: boolean;
  xpReward: number;
}

// Session Types
export interface GameSession {
  id: string;
  activityType: ActivityType;
  startTime: string;
  endTime?: string;
  questions: QuestionResult[];
  totalXp: number;
  coinsEarned: number;
}

export interface QuestionResult {
  questionId: string;
  correct: boolean;
  timeSpent: number;
  attempts: number;
}
