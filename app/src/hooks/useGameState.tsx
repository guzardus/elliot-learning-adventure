import React, { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import type { GameState, Player, Badge, LootItem, SuperItem, WeeklyProgress, ModuleProgress } from '@/types';

const defaultPlayer: Player = {
  name: 'Wizard',
  level: 1,
  xp: 0,
  xpToNextLevel: 100,
  streak: {
    current: 0,
    longest: 0,
    lastLogin: new Date().toISOString(),
    freezesRemaining: 1
  },
  badges: []
};

const defaultProgress = {
  math: {
    addition: { level: 1, xp: 0, questionsAnswered: 0, correctAnswers: 0, mastered: false, lastPracticed: '' },
    subtraction: { level: 1, xp: 0, questionsAnswered: 0, correctAnswers: 0, mastered: false, lastPracticed: '' },
    multiplication: { level: 1, xp: 0, questionsAnswered: 0, correctAnswers: 0, mastered: false, lastPracticed: '' },
    division: { level: 1, xp: 0, questionsAnswered: 0, correctAnswers: 0, mastered: false, lastPracticed: '' },
    wordProblems: { level: 1, xp: 0, questionsAnswered: 0, correctAnswers: 0, mastered: false, lastPracticed: '' },
    measurement: { level: 1, xp: 0, questionsAnswered: 0, correctAnswers: 0, mastered: false, lastPracticed: '' },
    geometry: { level: 1, xp: 0, questionsAnswered: 0, correctAnswers: 0, mastered: false, lastPracticed: '' }
  },
  english: {
    spelling: { level: 1, xp: 0, questionsAnswered: 0, correctAnswers: 0, mastered: false, lastPracticed: '' },
    grammar: { level: 1, xp: 0, questionsAnswered: 0, correctAnswers: 0, mastered: false, lastPracticed: '' },
    punctuation: { level: 1, xp: 0, questionsAnswered: 0, correctAnswers: 0, mastered: false, lastPracticed: '' },
    writing: { level: 1, xp: 0, questionsAnswered: 0, correctAnswers: 0, mastered: false, lastPracticed: '' },
    reading: { level: 1, xp: 0, questionsAnswered: 0, correctAnswers: 0, mastered: false, lastPracticed: '' }
  },
  totalQuestionsAnswered: 0,
  totalCorrect: 0,
  sessionsCompleted: 0,
  timeSpentMinutes: 0
};

const getCurrentWeekStart = (): string => {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday
  const diff = now.getDate() - day;
  const weekStart = new Date(now.setDate(diff));
  weekStart.setHours(0, 0, 0, 0);
  return weekStart.toISOString();
};

const defaultWeekly: WeeklyProgress = {
  weekStartDate: getCurrentWeekStart(),
  weekNumber: 1,
  sessionsCompleted: 0,
  lootEarned: [],
  bossDefeated: false,
  bossHealthRemaining: 100
};

const defaultModuleProgress: Record<string, ModuleProgress> = {
  'math-addition': { moduleId: 'math-addition', completed: false, questionsAnswered: 0, totalQuestions: 10 },
  'math-subtraction': { moduleId: 'math-subtraction', completed: false, questionsAnswered: 0, totalQuestions: 10 },
  'math-multiplication': { moduleId: 'math-multiplication', completed: false, questionsAnswered: 0, totalQuestions: 10 },
  'math-division': { moduleId: 'math-division', completed: false, questionsAnswered: 0, totalQuestions: 10 },
  'math-wordProblems': { moduleId: 'math-wordProblems', completed: false, questionsAnswered: 0, totalQuestions: 10 },
  'math-measurement': { moduleId: 'math-measurement', completed: false, questionsAnswered: 0, totalQuestions: 10 },
  'math-geometry': { moduleId: 'math-geometry', completed: false, questionsAnswered: 0, totalQuestions: 10 },
  'english-spelling': { moduleId: 'english-spelling', completed: false, questionsAnswered: 0, totalQuestions: 10 },
  'english-grammar': { moduleId: 'english-grammar', completed: false, questionsAnswered: 0, totalQuestions: 10 },
  'english-punctuation': { moduleId: 'english-punctuation', completed: false, questionsAnswered: 0, totalQuestions: 10 },
  'english-reading': { moduleId: 'english-reading', completed: false, questionsAnswered: 0, totalQuestions: 10 },
};

const defaultState: GameState = {
  player: defaultPlayer,
  progress: defaultProgress as GameState['progress'],
  settings: {
    soundEnabled: true,
    animationsEnabled: true,
    dailyGoal: 20,
    difficulty: 'medium'
  },
  inventory: [],
  superItems: [],
  weekly: defaultWeekly,
  moduleProgress: defaultModuleProgress
};

type GameAction =
  | { type: 'SET_PLAYER'; payload: Player }
  | { type: 'ADD_XP'; payload: { amount: number; category: 'math' | 'english' | 'general' } }
  | { type: 'UPDATE_STREAK' }
  | { type: 'ADD_BADGE'; payload: Badge }
  | { type: 'UPDATE_SKILL_PROGRESS'; payload: { skill: string; correct: boolean; xp: number } }
  | { type: 'SET_NAME'; payload: string }
  | { type: 'ADD_LOOT'; payload: LootItem }
  | { type: 'CRAFT_SUPER_ITEM'; payload: SuperItem }
  | { type: 'UPDATE_MODULE_PROGRESS'; payload: { moduleId: string; questionsAnswered: number; completed: boolean; lootId?: string } }
  | { type: 'UPDATE_BOSS_HEALTH'; payload: number }
  | { type: 'DEFEAT_BOSS' }
  | { type: 'RESET_WEEKLY' }
  | { type: 'LOAD_STATE'; payload: GameState };

function calculateXpToNextLevel(level: number): number {
  return Math.floor(100 * Math.pow(1.2, level - 1));
}

function checkWeeklyReset(state: GameState): GameState {
  const currentWeekStart = getCurrentWeekStart();
  if (state.weekly.weekStartDate !== currentWeekStart) {
    // New week started - reset weekly progress but keep inventory and super items
    return {
      ...state,
      weekly: {
        weekStartDate: currentWeekStart,
        weekNumber: state.weekly.weekNumber + 1,
        sessionsCompleted: 0,
        lootEarned: [],
        bossDefeated: false,
        bossHealthRemaining: 100
      }
    };
  }
  return state;
}

function gameReducer(state: GameState, action: GameAction): GameState {
  // Check for weekly reset on every action
  state = checkWeeklyReset(state);

  switch (action.type) {
    case 'SET_PLAYER':
      return { ...state, player: action.payload };

    case 'ADD_XP': {
      const newXp = state.player.xp + action.payload.amount;
      const xpToNext = state.player.xpToNextLevel;
      
      if (newXp >= xpToNext) {
        const remainingXp = newXp - xpToNext;
        const newLevel = state.player.level + 1;
        return {
          ...state,
          player: {
            ...state.player,
            level: newLevel,
            xp: remainingXp,
            xpToNextLevel: calculateXpToNextLevel(newLevel)
          }
        };
      }
      
      return {
        ...state,
        player: {
          ...state.player,
          xp: newXp
        }
      };
    }

    case 'UPDATE_STREAK': {
      const today = new Date().toDateString();
      const lastLogin = new Date(state.player.streak.lastLogin).toDateString();
      
      if (today === lastLogin) {
        return state;
      }
      
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      let newStreak = state.player.streak.current;
      if (lastLogin === yesterday.toDateString()) {
        newStreak += 1;
      } else if (state.player.streak.freezesRemaining > 0) {
        newStreak += 1;
        return {
          ...state,
          player: {
            ...state.player,
            streak: {
              ...state.player.streak,
              current: newStreak,
              longest: Math.max(newStreak, state.player.streak.longest),
              lastLogin: new Date().toISOString(),
              freezesRemaining: state.player.streak.freezesRemaining - 1
            }
          }
        };
      } else {
        newStreak = 1;
      }
      
      return {
        ...state,
        player: {
          ...state.player,
          streak: {
            ...state.player.streak,
            current: newStreak,
            longest: Math.max(newStreak, state.player.streak.longest),
            lastLogin: new Date().toISOString()
          }
        }
      };
    }

    case 'ADD_BADGE':
      if (state.player.badges.some(b => b.id === action.payload.id)) {
        return state;
      }
      return {
        ...state,
        player: {
          ...state.player,
          badges: [...state.player.badges, action.payload]
        }
      };

    case 'UPDATE_SKILL_PROGRESS': {
      const { skill, correct, xp } = action.payload;
      const [category, subSkill] = skill.split('.') as ['math' | 'english', string];
      
      if (!category || !subSkill) return state;
      
      const categoryData = state.progress[category];
      const currentSkill = categoryData[subSkill as keyof typeof categoryData] as { 
        level: number; 
        xp: number; 
        questionsAnswered: number; 
        correctAnswers: number; 
        mastered: boolean; 
        lastPracticed: string;
      } | undefined;
      
      if (!currentSkill) return state;
      
      const updatedSkill = {
        ...currentSkill,
        xp: currentSkill.xp + xp,
        questionsAnswered: currentSkill.questionsAnswered + 1,
        correctAnswers: currentSkill.correctAnswers + (correct ? 1 : 0),
        lastPracticed: new Date().toISOString()
      };
      
      // Check for mastery (80% accuracy and 20+ questions)
      const accuracy = updatedSkill.correctAnswers / updatedSkill.questionsAnswered;
      if (accuracy >= 0.8 && updatedSkill.questionsAnswered >= 20 && !updatedSkill.mastered) {
        updatedSkill.mastered = true;
      }
      
      // Level up skill every 100 XP
      if (updatedSkill.xp >= 100) {
        updatedSkill.level += 1;
        updatedSkill.xp = updatedSkill.xp % 100;
      }
      
      return {
        ...state,
        progress: {
          ...state.progress,
          [category]: {
            ...categoryData,
            [subSkill]: updatedSkill
          },
          totalQuestionsAnswered: state.progress.totalQuestionsAnswered + 1,
          totalCorrect: state.progress.totalCorrect + (correct ? 1 : 0)
        }
      };
    }

    case 'SET_NAME':
      return {
        ...state,
        player: {
          ...state.player,
          name: action.payload
        }
      };

    case 'ADD_LOOT':
      return {
        ...state,
        inventory: [...state.inventory, action.payload],
        weekly: {
          ...state.weekly,
          lootEarned: [...state.weekly.lootEarned, action.payload.id]
        }
      };

    case 'CRAFT_SUPER_ITEM':
      return {
        ...state,
        superItems: [...state.superItems, action.payload]
      };

    case 'UPDATE_MODULE_PROGRESS':
      return {
        ...state,
        moduleProgress: {
          ...state.moduleProgress,
          [action.payload.moduleId]: {
            ...state.moduleProgress[action.payload.moduleId],
            questionsAnswered: action.payload.questionsAnswered,
            completed: action.payload.completed,
            ...(action.payload.lootId && { lootEarned: action.payload.lootId }),
            lastAttempted: new Date().toISOString()
          }
        }
      };

    case 'UPDATE_BOSS_HEALTH':
      return {
        ...state,
        weekly: {
          ...state.weekly,
          bossHealthRemaining: Math.max(0, state.weekly.bossHealthRemaining - action.payload)
        }
      };

    case 'DEFEAT_BOSS':
      return {
        ...state,
        weekly: {
          ...state.weekly,
          bossDefeated: true
        }
      };

    case 'RESET_WEEKLY':
      return {
        ...state,
        weekly: {
          weekStartDate: getCurrentWeekStart(),
          weekNumber: state.weekly.weekNumber + 1,
          sessionsCompleted: 0,
          lootEarned: [],
          bossDefeated: false,
          bossHealthRemaining: 100
        }
      };

    case 'LOAD_STATE':
      return checkWeeklyReset(action.payload);

    default:
      return state;
  }
}

interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  addXp: (amount: number, category: 'math' | 'english' | 'general') => void;
  updateStreak: () => void;
  addBadge: (badge: Badge) => void;
  updateSkillProgress: (skill: string, correct: boolean, xp: number) => void;
  setName: (name: string) => void;
  addLoot: (item: LootItem) => void;
  craftSuperItem: (superItem: SuperItem, lootToConsume: string[]) => void;
  updateModuleProgress: (moduleId: string, questionsAnswered: number, completed: boolean, lootId?: string) => void;
  damageBoss: (amount: number) => void;
  defeatBoss: () => void;
  getAccuracy: (skill?: string) => number;
  getLevelTitle: (level: number) => string;
  canCraftSuperItem: () => boolean;
  getLootCount: () => number;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const levelTitles = [
  'Novice', 'Apprentice', 'Spellcaster', 'Enchanter',
  'Sorcerer', 'Mage', 'Archmage', 'Wizard', 'Grand Wizard', 'Legend'
];

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, defaultState);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('wizardAdventureState');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        dispatch({ type: 'LOAD_STATE', payload: parsed });
      } catch (e) {
        console.error('Failed to load saved state:', e);
      }
    }
  }, []);

  // Save to localStorage on changes
  useEffect(() => {
    localStorage.setItem('wizardAdventureState', JSON.stringify(state));
  }, [state]);

  const addXp = (amount: number, category: 'math' | 'english' | 'general') => {
    dispatch({ type: 'ADD_XP', payload: { amount, category } });
  };

  const updateStreak = () => {
    dispatch({ type: 'UPDATE_STREAK' });
  };

  const addBadge = (badge: Badge) => {
    dispatch({ type: 'ADD_BADGE', payload: badge });
  };

  const updateSkillProgress = (skill: string, correct: boolean, xp: number) => {
    dispatch({ type: 'UPDATE_SKILL_PROGRESS', payload: { skill, correct, xp } });
  };

  const setName = (name: string) => {
    dispatch({ type: 'SET_NAME', payload: name });
  };

  const addLoot = (item: LootItem) => {
    dispatch({ type: 'ADD_LOOT', payload: item });
  };

  const craftSuperItem = (superItem: SuperItem, lootToConsume: string[]) => {
    // Remove consumed loot from inventory
    const newInventory = [...state.inventory];
    for (const lootId of lootToConsume) {
      const index = newInventory.findIndex(item => item.id === lootId);
      if (index > -1) {
        newInventory.splice(index, 1);
      }
    }
    
    // Update state with new inventory and super item
    dispatch({ type: 'LOAD_STATE', payload: { ...state, inventory: newInventory } });
    dispatch({ type: 'CRAFT_SUPER_ITEM', payload: superItem });
  };

  const updateModuleProgress = (moduleId: string, questionsAnswered: number, completed: boolean, lootId?: string) => {
    dispatch({ type: 'UPDATE_MODULE_PROGRESS', payload: { moduleId, questionsAnswered, completed, lootId } });
  };

  const damageBoss = (amount: number) => {
    dispatch({ type: 'UPDATE_BOSS_HEALTH', payload: amount });
  };

  const defeatBoss = () => {
    dispatch({ type: 'DEFEAT_BOSS' });
  };

  const getAccuracy = (skill?: string): number => {
    if (skill) {
      const [category, subSkill] = skill.split('.') as ['math' | 'english', string];
      const categoryData = state.progress[category];
      const skillData = categoryData?.[subSkill as keyof typeof categoryData] as { 
        questionsAnswered: number; 
        correctAnswers: number;
      } | undefined;
      
      if (skillData && skillData.questionsAnswered > 0) {
        return Math.round((skillData.correctAnswers / skillData.questionsAnswered) * 100);
      }
      return 0;
    }
    if (state.progress.totalQuestionsAnswered > 0) {
      return Math.round((state.progress.totalCorrect / state.progress.totalQuestionsAnswered) * 100);
    }
    return 0;
  };

  const getLevelTitle = (level: number): string => {
    const index = Math.min(Math.floor((level - 1) / 5), levelTitles.length - 1);
    return levelTitles[index];
  };

  const canCraftSuperItem = (): boolean => {
    return state.inventory.length >= 10;
  };

  const getLootCount = (): number => {
    return state.inventory.length;
  };

  return (
    <GameContext.Provider value={{
      state,
      dispatch,
      addXp,
      updateStreak,
      addBadge,
      updateSkillProgress,
      setName,
      addLoot,
      craftSuperItem,
      updateModuleProgress,
      damageBoss,
      defeatBoss,
      getAccuracy,
      getLevelTitle,
      canCraftSuperItem,
      getLootCount
    }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGameState() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGameState must be used within a GameProvider');
  }
  return context;
}