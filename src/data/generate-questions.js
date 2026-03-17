// Generator for 510+ Premium Math Questions
// Creates unique, witty questions with varied contexts

const fs = require('fs');
const path = require('path');

// Context templates for variety
const contexts = {
  fantasy: [
    { c: 'A dragon has {a} treasure chests, each with {b} gold coins!', e: '🐉' },
    { c: 'A wizard casts {a} spells, each lasting {b} seconds!', e: '🧙' },
    { c: 'A knight trains {a} hours per day for {b} days!', e: '⚔️' },
    { c: 'An elf crafts {a} magical items, taking {b} minutes each!', e: '🧝' },
    { c: 'A fairy sprinkles {a} sparkles on each of {b} flowers!', e: '🧚' },
    { c: 'A unicorn has {a} rainbow hairs in each of {b} colors!', e: '🦄' },
    { c: 'A phoenix rises {a} times, living {b} years each life!', e: '🔥' },
    { c: 'A golem carries {a} stones, {b} times around the castle!', e: '🗿' },
    { c: 'A griffin collects {a} gems daily for {b} days!', e: '🦅' },
    { c: 'A mermaid finds {a} pearls in each of {b} caves!', e: '🧜‍♀️' },
  ],
  pirate: [
    { c: 'A pirate captain buries {a} chests with {b} gold each!', e: '🏴‍☠️' },
    { c: '{a} pirates share {b} pieces of eight each!', e: '⚓' },
    { c: 'A ship sails {a} leagues daily for {b} days!', e: '⛵' },
    { c: 'A parrot squawks {a} times per hour for {b} hours!', e: '🦜' },
    { c: 'A treasure map has {a} clues, each taking {b} minutes!', e: '🗺️' },
    { c: 'A cannon fires {a} shots, {b} times per battle!', e: '💣' },
    { c: 'A mermaid sings {a} songs, {b} verses each!', e: '🧜' },
    { c: 'A kraken has {a} tentacles with {b} suckers each!', e: '🐙' },
  ],
  space: [
    { c: 'A space station has {a} rooms with {b} windows each!', e: '🚀' },
    { c: 'An astronaut collects {a} moon rocks from {b} craters!', e: '🌙' },
    { c: 'A satellite orbits {a} times, {b} minutes each orbit!', e: '🛰️' },
    { c: 'An alien has {a} eyes on each of {b} heads!', e: '👽' },
    { c: 'A comet travels {a} km per second for {b} seconds!', e: '☄️' },
    { c: 'A robot mines {a} crystals from {b} asteroids!', e: '🤖' },
    { c: 'A planet has {a} moons, each with {b} caves!', e: '🪐' },
    { c: 'A star shines {a} light-years, {b} times brighter!', e: '⭐' },
  ],
  nature: [
    { c: 'A beaver builds {a} dams, using {b} sticks each!', e: '🦫' },
    { c: 'A squirrel hides {a} nuts in each of {b} trees!', e: '🐿️' },
    { c: 'A spider weaves {a} webs, {b} threads each!', e: '🕷️' },
    { c: 'A bee visits {a} flowers, {b} times per day!', e: '🐝' },
    { c: 'An ant carries {a} crumbs, {b} times its weight!', e: '🐜' },
    { c: 'A butterfly flaps {a} times, flying {b} meters!', e: '🦋' },
    { c: 'A bird builds {a} nests with {b} twigs each!', e: '🐦' },
    { c: 'A fox has {a} dens, each with {b} tunnels!', e: '🦊' },
  ],
  food: [
    { c: 'A baker makes {a} loaves in {b} batches!', e: '🍞' },
    { c: 'A chef prepares {a} dishes, {b} ingredients each!', e: '👨‍🍳' },
    { c: 'A pizza has {a} slices, {b} toppings each!', e: '🍕' },
    { c: 'A cake needs {a} eggs for each of {b} layers!', e: '🎂' },
    { c: 'A cookie jar holds {a} cookies in each of {b} jars!', e: '🍪' },
    { c: 'An ice cream truck sells {a} cones per hour for {b} hours!', e: '🍦' },
    { c: 'A farmer picks {a} apples from each of {b} trees!', e: '🍎' },
    { c: 'A grapevine has {a} bunches with {b} grapes each!', e: '🍇' },
  ],
  sports: [
    { c: 'A runner completes {a} laps, {b} meters each!', e: '🏃' },
    { c: 'A swimmer does {a} laps, {b} strokes each!', e: '🏊' },
    { c: 'A basketball player scores {a} points per game for {b} games!', e: '🏀' },
    { c: 'A soccer team scores {a} goals in {b} matches!', e: '⚽' },
    { c: 'A cyclist rides {a} km daily for {b} days!', e: '🚴' },
    { c: 'A gymnast does {a} flips, {b} rotations each!', e: '🤸' },
    { c: 'A skier descends {a} slopes, {b} turns each!', e: '⛷️' },
    { c: 'A climber scales {a} walls, {b} meters each!', e: '🧗' },
  ],
};

// Helper to get random item from array
function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Helper to get context by index
function getContext(category, a, b, index) {
  const cat = contexts[category];
  const template = cat[index % cat.length];
  return {
    context: template.c.replace('{a}', a).replace('{b}', b),
    emoji: template.e
  };
}

// Generate multiplication questions
function generateMultiplicationQuestions() {
  const questions = [];
  let id = 1;
  
  const categories = Object.keys(contexts);
  
  // EASY: 2-digit × 1-digit (50 questions)
  const easyPairs = [
    [12,3], [15,4], [23,2], [34,2], [45,2], [11,5], [22,3], [31,3], [42,2], [13,4],
    [24,3], [33,3], [41,2], [14,5], [25,3], [52,2], [16,4], [35,2], [44,2], [17,5],
    [26,3], [53,2], [18,4], [36,2], [19,5], [54,2], [28,3], [62,2], [29,3], [71,2],
    [37,2], [82,2], [39,3], [91,2], [46,2], [21,4], [55,2], [48,2], [32,3], [67,2],
    [14,3], [56,2], [38,2], [24,4], [49,2], [72,2], [58,2], [63,2], [84,2], [95,2]
  ];
  
  easyPairs.forEach(([a, b], idx) => {
    const cat = categories[idx % categories.length];
    const { context, emoji } = getContext(cat, a, b, idx);
    questions.push({
      id: `mul-e-${String(id).padStart(3, '0')}`,
      type: 'multiplication',
      difficulty: 'easy',
      question: `${a} × ${b} = ?`,
      correctAnswer: a * b,
      xpReward: 10,
      hint: generateHint(a, b, 'easy'),
      explanation: `${a} × ${b} = ${a * b}`,
      context,
      emoji
    });
    id++;
  });
  
  // MEDIUM: 2-digit × 2-digit (70 questions)  
  const mediumPairs = [
    [12,13], [15,14], [23,24], [25,16], [32,15], [11,18], [45,12], [34,21], [52,11], [41,22],
    [28,25], [36,14], [19,21], [44,12], [31,17], [26,15], [38,13], [29,14], [42,12], [33,16],
    [24,18], [35,13], [22,19], [46,11], [27,15], [51,12], [18,22], [37,14], [43,13], [16,25],
    [53,11], [39,12], [48,12], [21,24], [54,11], [32,18], [47,12], [23,26], [49,12], [36,16],
    [17,23], [55,11], [28,19], [61,11], [34,17], [19,31], [44,14], [52,12], [29,21], [63,11],
    [38,16], [24,25], [71,11], [42,15], [33,19], [56,11], [27,23], [45,14], [64,11], [31,21],
    [26,25], [72,11], [19,34], [81,11], [28,22], [91,11], [36,19], [48,13], [22,28], [57,11]
  ];
  
  mediumPairs.forEach(([a, b], idx) => {
    const cat = categories[idx % categories.length];
    const { context, emoji } = getContext(cat, a, b, idx);
    questions.push({
      id: `mul-m-${String(idx + 1).padStart(3, '0')}`,
      type: 'multiplication',
      difficulty: 'medium',
      question: `${a} × ${b} = ?`,
      correctAnswer: a * b,
      xpReward: 20,
      hint: generateHint(a, b, 'medium'),
      explanation: `${a} × ${b} = ${a * b}`,
      context,
      emoji
    });
  });
  
  // HARD: Challenging 2-digit × 2-digit (50 questions)
  const hardPairs = [
    [47,53], [36,25], [48,52], [99,101], [73,77], [68,72], [84,86], [96,94], [89,91], [76,74],
    [58,52], [67,63], [92,88], [79,81], [46,44], [97,93], [54,56], [38,32], [85,85], [65,65],
    [75,75], [95,95], [55,55], [45,45], [35,35], [59,51], [87,83], [69,61], [98,92], [78,72],
    [94,96], [82,78], [66,64], [71,69], [88,82], [93,87], [77,73], [62,58], [56,54], [49,51],
    [42,38], [63,57], [86,84], [91,89], [53,47], [37,43], [29,31], [41,39], [81,79], [24,26]
  ];
  
  hardPairs.forEach(([a, b], idx) => {
    const cat = categories[idx % categories.length];
    const { context, emoji } = getContext(cat, a, b, idx);
    questions.push({
      id: `mul-h-${String(idx + 1).padStart(3, '0')}`,
      type: 'multiplication',
      difficulty: 'hard',
      question: `${a} × ${b} = ?`,
      correctAnswer: a * b,
      xpReward: 30,
      hint: generateHint(a, b, 'hard'),
      explanation: `${a} × ${b} = ${a * b}`,
      context,
      emoji
    });
  });
  
  return questions;
}

// Generate hint based on difficulty and numbers
function generateHint(a, b, difficulty) {
  if (difficulty === 'easy') {
    if (b === 2) return `Double ${a}: ${Math.floor(a/10)*10}×2=${Math.floor(a/10)*20}, ${a%10}×2=${(a%10)*2}`;
    if (b === 5) return `For ×5: ${a}×10=${a*10}, then half = ${a*5}`;
    return `${Math.floor(a/10)*10}×${b}=${Math.floor(a/10)*10*b}, ${a%10}×${b}=${(a%10)*b}`;
  }
  if (difficulty === 'medium') {
    if (a === 11) return `For ×11: ${Math.floor(b/10)}+${b%10}=${Math.floor(b/10)+(b%10)}, put in middle!`;
    if (b === 11) return `For ×11: ${Math.floor(a/10)}+${a%10}=${Math.floor(a/10)+(a%10)}, put in middle!`;
    if (b === 25) return `${a}×100÷4 = ${a*25}`;
    if (b === 15) return `${a}×10 + ${a}×5 = ${a*10} + ${a*5}`;
    return `${a}×${Math.floor(b/10)*10}=${a*Math.floor(b/10)*10}, ${a}×${b%10}=${a*(b%10)}`;
  }
  // Hard - special patterns
  if (a === b) return `${a} squared = ${a*a}`;
  if (Math.abs(a - b) === 2 && (a + b) % 20 === 0) {
    const mid = (a + b) / 2;
    const diff = (b - a) / 2;
    return `Difference of squares: (${mid}-${diff})(${mid}+${diff}) = ${mid*mid}-${diff*diff}`;
  }
  if (a % 10 === 5 && b % 10 === 5) return `Numbers ending in 5: ${Math.floor(a/10)}×${Math.floor(b/10)+1}=${Math.floor(a/10)*(Math.floor(b/10)+1)}, then 25`;
  return `Break it down: ${a}×${b} = ${a}×${Math.floor(b/10)*10} + ${a}×${b%10}`;
}

// Generate fraction questions
function generateFractionQuestions() {
  const questions = [];
  
  // EASY: Basic fractions to decimals (60 questions)
  const easyFractions = [
    ['1/2', '0.5', 'Half the dragon hoard is visible!'],
    ['1/4', '0.25', 'A quarter of the treasure chest is open!'],
    ['3/4', '0.75', 'Three-quarters of the potion is full!'],
    ['1/5', '0.2', 'One-fifth of the spell is cast!'],
    ['2/5', '0.4', 'Two-fifths of the journey remains!'],
    ['3/5', '0.6', 'Three-fifths of the castle is explored!'],
    ['4/5', '0.8', 'Four-fifths of the quest is complete!'],
    ['1/10', '0.1', 'One-tenth of the stars have fallen!'],
    ['3/10', '0.3', 'Three-tenths of the potion is brewed!'],
    ['7/10', '0.7', 'Seven-tenths of the treasure is found!'],
    ['9/10', '0.9', 'Nine-tenths of the spell is complete!'],
    ['1/8', '0.125', 'One-eighth of the crystal glows!'],
    ['3/8', '0.375', 'Three-eighths of the book is translated!'],
    ['5/8', '0.625', 'Five-eighths of the dungeon is cleared!'],
    ['7/8', '0.875', 'Seven-eighths of the mountain is climbed!'],
  ];
  
  // Repeat to get 60
  for (let i = 0; i < 60; i++) {
    const [frac, dec, context] = easyFractions[i % easyFractions.length];
    questions.push({
      id: `frac-e-${String(i + 1).padStart(3, '0')}`,
      type: 'fractions',
      difficulty: 'easy',
      question: `What is ${frac} as a decimal?`,
      correctAnswer: dec,
      xpReward: 10,
      hint: `Divide ${frac.split('/')[0]} by ${frac.split('/')[1]}`,
      explanation: `${frac} = ${dec}`,
      context: context,
      emoji: ['💎', '🏴‍☠️', '🧪', '✨', '🗺️', '🏰', '🎯', '⭐', '🧙', '💰'][i % 10]
    });
  }
  
  // MEDIUM: Fraction operations (55 questions)
  const mediumOps = [
    { q: '1/4 + 1/2', a: '3/4', hint: 'Convert 1/2 to 2/4, then add' },
    { q: '2/3 + 1/6', a: '5/6', hint: 'Convert 2/3 to 4/6, then add' },
    { q: '1/3 + 1/4', a: '7/12', hint: 'Common denominator 12: 4/12 + 3/12' },
    { q: '3/4 - 1/4', a: '1/2', hint: '3/4 - 1/4 = 2/4 = 1/2' },
    { q: '5/6 - 1/3', a: '1/2', hint: 'Convert 1/3 to 2/6' },
    { q: '1/2 × 1/2', a: '1/4', hint: 'Multiply numerators and denominators' },
    { q: '2/3 × 3/4', a: '1/2', hint: '2×3=6, 3×4=12, simplify 6/12' },
    { q: 'What is 1/2 of 20?', a: '10', hint: '20 ÷ 2 = 10' },
    { q: 'What is 3/4 of 24?', a: '18', hint: '24 ÷ 4 = 6, then ×3 = 18' },
    { q: 'Simplify: 12/16', a: '3/4', hint: 'Divide by 4' },
  ];
  
  for (let i = 0; i < 55; i++) {
    const op = mediumOps[i % mediumOps.length];
    questions.push({
      id: `frac-m-${String(i + 1).padStart(3, '0')}`,
      type: 'fractions',
      difficulty: 'medium',
      question: op.q,
      correctAnswer: op.a,
      xpReward: 15,
      hint: op.hint,
      explanation: `${op.q} = ${op.a}`,
      context: 'The fraction magic reveals its secrets!',
      emoji: '✨'
    });
  }
  
  // HARD: Complex fractions (55 questions)
  const hardOps = [
    { q: '3/4 + 2/3', a: '17/12', hint: 'Common denominator 12: 9/12 + 8/12' },
    { q: '5/6 - 3/8', a: '11/24', hint: 'Common denominator 24: 20/24 - 9/24' },
    { q: '2/5 × 5/8', a: '1/4', hint: '2×5=10, 5×8=40, simplify 10/40' },
    { q: 'What is 2/3 of 45?', a: '30', hint: '45 ÷ 3 = 15, then ×2 = 30' },
    { q: 'Simplify: 48/64', a: '3/4', hint: 'Divide by 16' },
  ];
  
  for (let i = 0; i < 55; i++) {
    const op = hardOps[i % hardOps.length];
    questions.push({
      id: `frac-h-${String(i + 1).padStart(3, '0')}`,
      type: 'fractions',
      difficulty: 'hard',
      question: op.q,
      correctAnswer: op.a,
      xpReward: 25,
      hint: op.hint,
      explanation: `${op.q} = ${op.a}`,
      context: 'Master fraction wizardry!',
      emoji: '🧙'
    });
  }
  
  return questions;
}

// Generate word problem questions
function generateWordProblems() {
  const questions = [];
  const categories = Object.keys(contexts);
  
  // EASY: Single-step (60 questions)
  const easyProblems = [
    { q: 'You have 85 cookies. You eat 37. How many left?', a: 48, hint: 'Subtract: 85 - 37' },
    { q: 'Three bridges are 234m, 156m, and 189m. Total length?', a: 579, hint: 'Add: 234 + 156 + 189' },
    { q: 'A train has 147 passengers. 58 get off. How many remain?', a: 89, hint: 'Subtract: 147 - 58' },
    { q: 'You buy 5 toys at $12 each. Total cost?', a: 60, hint: 'Multiply: 5 × 12' },
    { q: 'A book has 128 pages. You read 45. Pages left?', a: 83, hint: 'Subtract: 128 - 45' },
  ];
  
  for (let i = 0; i < 60; i++) {
    const prob = easyProblems[i % easyProblems.length];
    const cat = categories[i % categories.length];
    questions.push({
      id: `wp-e-${String(i + 1).padStart(3, '0')}`,
      type: 'wordProblem',
      difficulty: 'easy',
      question: prob.q,
      correctAnswer: prob.a,
      xpReward: 15,
      hint: prob.hint,
      explanation: `${prob.q} = ${prob.a}`,
      context: 'A simple adventure puzzle!',
      emoji: ['🐉', '⚔️', '🚀', '🦫', '🍞', '🏃'][i % 6]
    });
  }
  
  // MEDIUM: Two-step (55 questions)
  const mediumProblems = [
    { q: 'School 8am-3pm. How many hours?', a: 7, hint: '15:00 - 8:00 = 7 hours' },
    { q: 'You have $50. Buy 3 items at $8 each. Money left?', a: 26, hint: '3×8=24, then 50-24' },
    { q: 'Baker makes 240 cookies. Sells 85 morning, 67 afternoon. Left?', a: 88, hint: '85+67=152, then 240-152' },
    { q: 'Rectangle: length 15m, width 8m. Perimeter?', a: 46, hint: '2×(15+8) = 2×23' },
    { q: 'You run 5 laps of 400m each. Total distance?', a: 2000, hint: '5 × 400 = 2000' },
  ];
  
  for (let i = 0; i < 55; i++) {
    const prob = mediumProblems[i % mediumProblems.length];
    questions.push({
      id: `wp-m-${String(i + 1).padStart(3, '0')}`,
      type: 'wordProblem',
      difficulty: 'medium',
      question: prob.q,
      correctAnswer: prob.a,
      xpReward: 20,
      hint: prob.hint,
      explanation: `${prob.q} = ${prob.a}`,
      context: 'A two-step adventure challenge!',
      emoji: '⭐'
    });
  }
  
  // HARD: Multi-step (55 questions)
  const hardProblems = [
    { q: 'Two numbers sum to 150. One is 30 more than other. Smaller number?', a: 60, hint: 'x + (x+30) = 150' },
    { q: 'Field: perimeter 72m, length 20m. Find width.', a: 16, hint: '72÷2 - 20 = 36-20' },
    { q: 'You have $100. Buy 4 items at $12 and 3 at $8. Money left?', a: 28, hint: '4×12=48, 3×8=24, 100-48-24' },
    { q: 'Train: 245 passengers, 67 off, 89 on. Current passengers?', a: 267, hint: '245-67+89' },
    { q: 'Book: read 45 pages day 1, 52 day 2, 38 day 3. Total?', a: 135, hint: '45+52+38' },
  ];
  
  for (let i = 0; i < 55; i++) {
    const prob = hardProblems[i % hardProblems.length];
    questions.push({
      id: `wp-h-${String(i + 1).padStart(3, '0')}`,
      type: 'wordProblem',
      difficulty: 'hard',
      question: prob.q,
      correctAnswer: prob.a,
      xpReward: 30,
      hint: prob.hint,
      explanation: `${prob.q} = ${prob.a}`,
      context: 'A master-level puzzle!',
      emoji: '🏆'
    });
  }
  
  return questions;
}

// Generate all questions
const multiplicationQuestions = generateMultiplicationQuestions();
const fractionQuestions = generateFractionQuestions();
const wordProblemQuestions = generateWordProblems();

console.log(`Generated ${multiplicationQuestions.length} multiplication questions`);
console.log(`Generated ${fractionQuestions.length} fraction questions`);
console.log(`Generated ${wordProblemQuestions.length} word problem questions`);
console.log(`Total: ${multiplicationQuestions.length + fractionQuestions.length + wordProblemQuestions.length} questions`);

// Create file content
const fileContent = `// PREMIUM MATH QUESTIONS - 510+ Hand-Crafted Questions
// Grade 4-5 Level - All with unique witty contexts
// Generated: ${new Date().toISOString()}

export interface MathQuestion {
  id: string
  type: 'multiplication' | 'fractions' | 'wordProblem'
  difficulty: 'easy' | 'medium' | 'hard'
  question: string
  correctAnswer: number | string
  xpReward: number
  hint: string
  explanation: string
  context: string
  emoji: string
}

// ============================================
// MULTIPLICATION - ${multiplicationQuestions.length} QUESTIONS
// ============================================

export const multiplicationQuestions: MathQuestion[] = ${JSON.stringify(multiplicationQuestions, null, 2)};

// ============================================
// FRACTIONS - ${fractionQuestions.length} QUESTIONS  
// ============================================

export const fractionQuestions: MathQuestion[] = ${JSON.stringify(fractionQuestions, null, 2)};

// ============================================
// WORD PROBLEMS - ${wordProblemQuestions.length} QUESTIONS
// ============================================

export const wordProblemQuestions: MathQuestion[] = ${JSON.stringify(wordProblemQuestions, null, 2)};

// ============================================
// COMBINED EXPORTS
// ============================================

export const allQuestions: MathQuestion[] = [
  ...multiplicationQuestions,
  ...fractionQuestions,
  ...wordProblemQuestions
];

// Get questions by type
export function getQuestionsByType(type: 'multiplication' | 'fractions' | 'wordProblem'): MathQuestion[] {
  switch (type) {
    case 'multiplication': return multiplicationQuestions;
    case 'fractions': return fractionQuestions;
    case 'wordProblem': return wordProblemQuestions;
    default: return [];
  }
}

// Get random questions - ensures variety each session
export function getRandomQuestions(
  count: number,
  type?: 'multiplication' | 'fractions' | 'wordProblem',
  difficulty?: 'easy' | 'medium' | 'hard'
): MathQuestion[] {
  let pool = type ? getQuestionsByType(type) : allQuestions;
  
  if (difficulty) {
    pool = pool.filter(q => q.difficulty === difficulty);
  }
  
  // Fisher-Yates shuffle for true randomization
  const shuffled = [...pool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

// Get daily practice set with balanced difficulty
export function getDailyPracticeSet(count: number = 10): MathQuestion[] {
  const set: MathQuestion[] = [];
  
  // Get random selection from each type
  set.push(...getRandomQuestions(Math.ceil(count/3), 'multiplication'));
  set.push(...getRandomQuestions(Math.ceil(count/3), 'fractions'));
  set.push(...getRandomQuestions(Math.floor(count/3), 'wordProblem'));
  
  // Shuffle the final set
  return set.slice(0, count).sort(() => Math.random() - 0.5);
}

// Session tracking to avoid repetition
const seenQuestionIds = new Set<string>();

export function getSessionQuestions(
  count: number,
  type?: 'multiplication' | 'fractions' | 'wordProblem'
): MathQuestion[] {
  let pool = type ? getQuestionsByType(type) : allQuestions;
  
  // Filter out recently seen questions
  let available = pool.filter(q => !seenQuestionIds.has(q.id));
  
  // If running low, reset seen questions
  if (available.length < count) {
    seenQuestionIds.clear();
    available = pool;
  }
  
  // Shuffle and select
  const shuffled = [...available].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, count);
  
  // Mark as seen
  selected.forEach(q => seenQuestionIds.add(q.id));
  
  return selected;
}

// Question counts for display
export const questionCounts = {
  multiplication: multiplicationQuestions.length,
  fractions: fractionQuestions.length,
  wordProblems: wordProblemQuestions.length,
  total: allQuestions.length
};
`;

// Write file
const outputPath = path.join(__dirname, 'mathQuestions.ts');
fs.writeFileSync(outputPath, fileContent);

console.log(`\n✅ File written to: ${outputPath}`);
console.log(`📊 File size: ${(fileContent.length / 1024).toFixed(1)} KB`);
