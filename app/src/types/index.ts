// MYTHIC ACADEMY - NEW CHARACTER & LOOT SYSTEM
export interface Companion {
  id: string;
  name: string;
  type: 'dragon' | 'phoenix' | 'unicorn' | 'griffin' | 'direwolf';
  theme: 'fire' | 'rebirth' | 'magic' | 'strength' | 'loyalty';
  stats: {
    power: number;
    wisdom: number;
    speed: number;
    defense: number;
  };
  image: string;
  description: string;
}

export interface LootItem {
  id: string;
  name: string;
  type: 'weapon' | 'armor' | 'accessory' | 'consumable' | 'treasure';
  rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'mythic';
  stats?: {
    power?: number;
    wisdom?: number;
    speed?: number;
    defense?: number;
  };
  effect?: string;
  image: string;
  equipped: boolean;
  equippedTo?: string; // companion id
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

// Game State Types
export interface GameState {
  player: Player;
  progress: Progress;
  settings: Settings;
  companions: Companion[];
  inventory: LootItem[];
  weekly: WeeklyProgress;
}

export interface Player {
  name: string;
  selectedCompanions: string[]; // ids of up to 3 companions
  level: number;
  xp: number;
  xpToNextLevel: number;
  goldCoins: number;
  sparkleStars: number;
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
