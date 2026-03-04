import type { MathQuestion, SpellingWord } from '@/types';

// ==================== INFINITE QUESTION GENERATOR ====================
// Generates unique questions on-the-fly - never repeats!
// Created by Elara - March 2, 2026

// Helper: Random integer between min and max
const randomInt = (min: number, max: number) => 
  Math.floor(Math.random() * (max - min + 1)) + min;

// Helper: Random element from array
const randomChoice = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// ==================== MATH GENERATORS ====================

export const generateAdditionQuestion = (difficulty: 'easy' | 'medium' | 'hard'): MathQuestion => {
  let a: number, b: number, hint: string;
  
  switch (difficulty) {
    case 'easy':
      a = randomInt(10, 99);
      b = randomInt(10, 99);
      hint = `Add the tens: ${Math.floor(a/10)*10} + ${Math.floor(b/10)*10}, then the ones`;
      break;
    case 'medium':
      a = randomInt(100, 9999);
      b = randomInt(100, 9999);
      hint = `Break it down: ${a} + ${Math.floor(b/1000)*1000} first`;
      break;
    case 'hard':
      a = randomInt(100000, 999999);
      b = randomInt(100000, 999999);
      hint = `Add the hundred thousands: ${Math.floor(a/100000)*100000} + ${Math.floor(b/100000)*100000}`;
      break;
  }
  
  return {
    id: `gen-add-${Date.now()}-${randomInt(1, 10000)}`,
    type: 'addition',
    difficulty,
    question: `${a.toLocaleString()} + ${b.toLocaleString()} = ?`,
    correctAnswer: a + b,
    xpReward: difficulty === 'easy' ? 10 : difficulty === 'medium' ? 20 : 30,
    hint
  };
};

export const generateSubtractionQuestion = (difficulty: 'easy' | 'medium' | 'hard'): MathQuestion => {
  let a: number, b: number, hint: string;
  
  switch (difficulty) {
    case 'easy':
      a = randomInt(50, 200);
      b = randomInt(10, a - 10);
      hint = `Start with ${a} and count back ${b}`;
      break;
    case 'medium':
      a = randomInt(1000, 10000);
      b = randomInt(100, a - 100);
      hint = `Subtract ${Math.floor(b/1000)*1000} from ${a} first`;
      break;
    case 'hard':
      a = randomInt(500000, 999999);
      b = randomInt(100000, a - 10000);
      hint = `Break it down: ${Math.floor(a/100000)*100000} - ${Math.floor(b/100000)*100000} first`;
      break;
  }
  
  return {
    id: `gen-sub-${Date.now()}-${randomInt(1, 10000)}`,
    type: 'subtraction',
    difficulty,
    question: `${a.toLocaleString()} - ${b.toLocaleString()} = ?`,
    correctAnswer: a - b,
    xpReward: difficulty === 'easy' ? 10 : difficulty === 'medium' ? 20 : 30,
    hint
  };
};

export const generateMultiplicationQuestion = (difficulty: 'easy' | 'medium' | 'hard'): MathQuestion => {
  let a: number, b: number, hint: string;
  
  switch (difficulty) {
    case 'easy':
      a = randomInt(2, 12);
      b = randomInt(2, 12);
      hint = `Remember: ${a} × ${b} = ${a} groups of ${b}`;
      break;
    case 'medium':
      a = randomInt(10, 99);
      b = randomInt(2, 9);
      hint = `${a} × ${b} = (${Math.floor(a/10)*10} × ${b}) + (${a%10} × ${b})`;
      break;
    case 'hard':
      a = randomInt(10, 99);
      b = randomInt(10, 99);
      hint = `${a} × ${b}: Try ${a} × ${Math.floor(b/10)*10} = ${a * Math.floor(b/10)*10}, then add ${a} × ${b%10}`;
      break;
  }
  
  return {
    id: `gen-mul-${Date.now()}-${randomInt(1, 10000)}`,
    type: 'multiplication',
    difficulty,
    question: `${a} × ${b} = ?`,
    correctAnswer: a * b,
    xpReward: difficulty === 'easy' ? 10 : difficulty === 'medium' ? 20 : 30,
    hint
  };
};

export const generateDivisionQuestion = (difficulty: 'easy' | 'medium' | 'hard'): MathQuestion => {
  let a: number, b: number, answer: number | string, hint: string, explanation: string | undefined;
  
  switch (difficulty) {
    case 'easy':
      b = randomInt(2, 12);
      answer = randomInt(2, 12);
      a = b * (answer as number);
      hint = `${a} ÷ ${b} = ? Think: ${b} × ? = ${a}`;
      break;
    case 'medium':
      b = randomInt(3, 9);
      answer = randomInt(5, 15);
      const remainder = randomInt(1, b - 1);
      a = b * (answer as number) + remainder;
      answer = `${answer}r${remainder}`;
      hint = `${b} × ${Math.floor(a/b)} = ${b * Math.floor(a/b)}, remainder is ${a - (b * Math.floor(a/b))}`;
      explanation = `${a} ÷ ${b} = ${Math.floor(a/b)} with remainder ${a % b}`;
      break;
    case 'hard':
      b = randomInt(11, 25);
      answer = randomInt(5, 20);
      a = b * (answer as number);
      hint = `Try: ${b} × 10 = ${b * 10}. How many more ${b}s to reach ${a}?`;
      break;
  }
  
  return {
    id: `gen-div-${Date.now()}-${randomInt(1, 10000)}`,
    type: 'division',
    difficulty,
    question: `${a} ÷ ${b} = ?`,
    correctAnswer: answer,
    xpReward: difficulty === 'easy' ? 10 : difficulty === 'medium' ? 20 : 30,
    hint,
    explanation
  };
};

export const generateMeasurementQuestion = (difficulty: 'easy' | 'medium' | 'hard'): MathQuestion => {
  
  // Time questions
  const hour = randomInt(1, 12);
  const minute = randomChoice([0, 15, 30, 45]);
  const minuteStr = minute.toString().padStart(2, '0');
  
  let timeAnswer: string;
  let hint: string;
  
  if (minute === 0) {
    timeAnswer = `${hour} o'clock`;
    hint = `Exactly on the hour`;
  } else if (minute === 15) {
    timeAnswer = `quarter past ${hour}`;
    hint = `15 minutes past ${hour}`;
  } else if (minute === 30) {
    timeAnswer = `half past ${hour}`;
    hint = `30 minutes past ${hour}`;
  } else {
    timeAnswer = `quarter to ${hour === 12 ? 1 : hour + 1}`;
    hint = `15 minutes before ${hour === 12 ? 1 : hour + 1}`;
  }
  
  return {
    id: `gen-meas-${Date.now()}-${randomInt(1, 10000)}`,
    type: 'measurement',
    difficulty,
    question: `What time is shown? (Digital: ${hour}:${minuteStr})`,
    correctAnswer: timeAnswer,
    xpReward: difficulty === 'easy' ? 15 : difficulty === 'medium' ? 20 : 25,
    hint
  };
};

// ==================== WORD PROBLEM GENERATORS ====================

const wordProblemTemplates = [
  {
    template: 'You have ${total} apples. You eat ${eat}. How many left?',
    operation: 'sub',
    makeQuestion: () => {
      const total = randomInt(10, 50);
      const eat = randomInt(1, total - 5);
      return {
        q: `You have ${total} apples. You eat ${eat}. How many left?`,
        a: total - eat,
        hint: `${total} - ${eat} = ?`
      };
    }
  },
  {
    template: 'A box has ${perBox} toys. How many toys in ${boxes} boxes?',
    operation: 'mul',
    makeQuestion: () => {
      const perBox = randomInt(3, 12);
      const boxes = randomInt(2, 10);
      return {
        q: `A box has ${perBox} toys. How many toys in ${boxes} boxes?`,
        a: perBox * boxes,
        hint: `${perBox} × ${boxes} = ?`
      };
    }
  },
  {
    template: '${total} cookies shared equally among ${friends} friends. How many each?',
    operation: 'div',
    makeQuestion: () => {
      const friends = randomInt(2, 10);
      const each = randomInt(2, 12);
      const total = friends * each;
      return {
        q: `${total} cookies shared equally among ${friends} friends. How many each?`,
        a: each,
        hint: `${total} ÷ ${friends} = ?`
      };
    }
  },
  {
    template: 'You have ${have}. You find ${find}. How many total?',
    operation: 'add',
    makeQuestion: () => {
      const have = randomInt(10, 100);
      const find = randomInt(5, 50);
      return {
        q: `You have ${have} marbles. You find ${find} more. How many total?`,
        a: have + find,
        hint: `${have} + ${find} = ?`
      };
    }
  }
];

export const generateWordProblem = (difficulty: 'easy' | 'medium' | 'hard'): MathQuestion => {
  const template = randomChoice(wordProblemTemplates);
  const { q, a, hint } = template.makeQuestion();
  
  return {
    id: `gen-wp-${Date.now()}-${randomInt(1, 10000)}`,
    type: 'wordProblem',
    difficulty,
    question: q,
    correctAnswer: a,
    xpReward: difficulty === 'easy' ? 20 : difficulty === 'medium' ? 25 : 35,
    hint
  };
};

// ==================== SPELLING GENERATORS ====================

const spellingPatterns = {
  easy: ['about', 'again', 'always', 'before', 'could', 'friend', 'school', 'their', 'would', 'people'],
  medium: ['because', 'different', 'favorite', 'however', 'special', 'usually', 'beautiful', 'tomorrow'],
  hard: ['necessary', 'definitely', 'separate', 'occasionally', 'convenient', 'restaurant', 'accommodate']
};

export const generateSpellingWord = (difficulty: 'easy' | 'medium' | 'hard'): SpellingWord => {
  const words = spellingPatterns[difficulty];
  const word = randomChoice(words);
  
  return {
    word,
    phonetic: `/${word.slice(0, 2)}-${word.slice(2)}/`,
    sentence: `Can you spell the word ${word}?`,
    difficulty
  };
};

// ==================== BULK GENERATORS ====================

export const generateQuestionSet = (
  type: 'addition' | 'subtraction' | 'multiplication' | 'division' | 'wordProblem' | 'measurement',
  count: number,
  difficulty: 'easy' | 'medium' | 'hard'
): MathQuestion[] => {
  const generators: Record<string, Function> = {
    addition: generateAdditionQuestion,
    subtraction: generateSubtractionQuestion,
    multiplication: generateMultiplicationQuestion,
    division: generateDivisionQuestion,
    wordProblem: generateWordProblem,
    measurement: generateMeasurementQuestion
  };
  
  return Array.from({ length: count }, () => generators[type](difficulty));
};

export const generateMixedPractice = (count: number, difficulty: 'easy' | 'medium' | 'hard'): MathQuestion[] => {
  const generators = [
    generateAdditionQuestion,
    generateSubtractionQuestion,
    generateMultiplicationQuestion,
    generateDivisionQuestion,
    generateWordProblem
  ];
  
  return Array.from({ length: count }, () => {
    const gen = randomChoice(generators);
    return gen(difficulty);
  });
};

// ==================== EXPORT ALL ====================
export const QuestionGenerator = {
  addition: generateAdditionQuestion,
  subtraction: generateSubtractionQuestion,
  multiplication: generateMultiplicationQuestion,
  division: generateDivisionQuestion,
  wordProblem: generateWordProblem,
  measurement: generateMeasurementQuestion,
  set: generateQuestionSet,
  mixed: generateMixedPractice
};

export default QuestionGenerator;
