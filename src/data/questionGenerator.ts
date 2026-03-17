// Question Generator for infinite math practice
// Combines hand-crafted "story" questions with algorithmic variations

import { MathQuestion } from './mathQuestions'

// ========== UTILITY FUNCTIONS ==========

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5)
}

// ========== MULTIPLICATION GENERATOR ==========

const multiplicationContexts = [
  { 
    template: 'A dragon has {a} treasure chests, each with {b} gold coins!',
    emoji: '🐉'
  },
  { 
    template: 'A mountain climber packs {a} energy bars per day for {b} days.',
    emoji: '🧗'
  },
  { 
    template: 'A wizard casts {a} spells, each lasting {b} seconds!',
    emoji: '🧙'
  },
  { 
    template: 'A Yeti collects {a} shiny pebbles every day for {b} days!',
    emoji: '❄️'
  },
  { 
    template: 'A cloud factory makes {a} clouds per hour. After {b} hours?',
    emoji: '☁️'
  },
  { 
    template: 'An eagle spotted {a} nests, each with {b} eggs!',
    emoji: '🦅'
  },
  { 
    template: 'A crystal miner finds {a} gems daily for {b} days!',
    emoji: '💎'
  },
  { 
    template: 'A goat has {a} kids, and each kid found {b} shiny pebbles!',
    emoji: '🐐'
  },
  { 
    template: 'A space station has {a} rooms with {b} windows each!',
    emoji: '🚀'
  },
  { 
    template: 'A knight trains {a} hours per day for {b} days!',
    emoji: '⚔️'
  },
]

export function generateMultiplicationQuestion(
  difficulty: 'easy' | 'medium' | 'hard' = 'medium'
): MathQuestion {
  let a: number, b: number, hint: string, explanation: string
  
  switch (difficulty) {
    case 'easy':
      // 2-digit × 1-digit (e.g., 23 × 4)
      a = randomInt(11, 50)
      b = randomInt(2, 9)
      hint = `Try ${a} × ${Math.floor(b/2)} = ${a * Math.floor(b/2)}, then add more!`
      explanation = `${a} × ${b} = ${a * b}`
      break
    case 'medium':
      // 2-digit × 2-digit, round numbers (e.g., 25 × 16)
      const mediums = [
        () => ({ a: 25, b: randomInt(12, 20), hint: '25 × 4 = 100, use that!' }),
        () => ({ a: 15, b: randomInt(12, 20), hint: '×15 is ×10 + ×5' }),
        () => ({ a: randomInt(20, 40), b: randomInt(11, 20), hint: `Break it down: ${a} × 10 + ${a} × ${b-10}` }),
      ]
      const medium = mediums[randomInt(0, mediums.length - 1)]()
      a = medium.a
      b = medium.b
      hint = medium.hint
      explanation = `${a} × ${b} = ${a * b}`
      break
    case 'hard':
      // 2-digit × 2-digit (e.g., 47 × 53)
      a = randomInt(30, 90)
      b = randomInt(30, 90)
      const roundedA = Math.round(a / 10) * 10
      const diffA = a - roundedA
      hint = `Try (${roundedA}${diffA >= 0 ? '+' : ''}${diffA}) × ${b} = ${roundedA}×${b} ${diffA >= 0 ? '+' : ''} ${Math.abs(diffA)}×${b}`
      explanation = `${a} × ${b} = ${a * b}`
      break
  }

  const context = multiplicationContexts[randomInt(0, multiplicationContexts.length - 1)]
  const id = `gen-mul-${Date.now()}-${randomInt(1000, 9999)}`

  return {
    id,
    type: 'multiplication',
    difficulty,
    question: `${context.emoji} ${context.template.replace('{a}', a.toString()).replace('{b}', b.toString())}\n\n${a} × ${b} = ?`,
    correctAnswer: a * b,
    xpReward: difficulty === 'easy' ? 15 : difficulty === 'medium' ? 25 : 35,
    hint,
    explanation,
    context: context.template.replace('{a}', a.toString()).replace('{b}', b.toString()),
    emoji: context.emoji
  }
}

// ========== FRACTION GENERATOR ==========

const fractionContexts = [
  { template: 'A pizza is cut into {denominator} slices. You eat {numerator}. What fraction?', type: 'basic' },
  { template: 'A chocolate bar has {denominator} pieces. You eat {numerator}. What fraction?', type: 'basic' },
  { template: 'A cake is divided into {denominator} equal parts. You take {numerator} parts.', type: 'basic' },
  { template: 'A pack has {denominator} cards. You collect {numerator} rare cards!', type: 'basic' },
]

const fractionToDecimalContexts = [
  { template: 'What is {fraction} as a decimal?', check: ['1/2', '1/4', '3/4', '1/5', '2/5', '3/5', '4/5', '1/8', '3/8', '5/8', '7/8'] },
  { template: 'Convert {fraction} to decimal form.', check: ['1/2', '1/4', '3/4', '1/5', '2/5', '3/5', '4/5', '1/8', '3/8', '5/8', '7/8'] },
]

export function generateFractionQuestion(
  difficulty: 'easy' | 'medium' | 'hard' = 'medium'
): MathQuestion {
  const id = `gen-frac-${Date.now()}-${randomInt(1000, 9999)}`
  
  const fractionTypes = ['basic', 'decimal', 'comparison']
  const type = fractionTypes[randomInt(0, fractionTypes.length - 1)]

  switch (type) {
    case 'basic': {
      const denominator = difficulty === 'easy' ? randomInt(2, 5) : randomInt(2, 10)
      const numerator = randomInt(1, denominator - 1)
      const context = fractionContexts[randomInt(0, fractionContexts.length - 1)]
      
      return {
        id,
        type: 'fractions',
        difficulty,
        question: `🍕 ${context.template.replace('{numerator}', numerator.toString()).replace('{denominator}', denominator.toString())}`,
        correctAnswer: `${numerator}/${denominator}`,
        xpReward: difficulty === 'easy' ? 15 : 25,
        hint: `${numerator} out of ${denominator} = ${numerator}/${denominator}`,
        explanation: `${numerator}/${denominator} is already in simplest form!`,
        context: context.template.replace('{numerator}', numerator.toString()).replace('{denominator}', denominator.toString()),
        emoji: '🍕'
      }
    }
    
    case 'decimal': {
      const commonFractions = [
        { frac: '1/2', dec: '0.5' },
        { frac: '1/4', dec: '0.25' },
        { frac: '3/4', dec: '0.75' },
        { frac: '1/5', dec: '0.2' },
        { frac: '2/5', dec: '0.4' },
        { frac: '3/5', dec: '0.6' },
        { frac: '4/5', dec: '0.8' },
        { frac: '1/8', dec: '0.125' },
        { frac: '3/8', dec: '0.375' },
        { frac: '5/8', dec: '0.625' },
        { frac: '7/8', dec: '0.875' },
        { frac: '1/10', dec: '0.1' },
        { frac: '3/10', dec: '0.3' },
        { frac: '7/10', dec: '0.7' },
        { frac: '9/10', dec: '0.9' },
      ]
      
      const selected = difficulty === 'easy' 
        ? commonFractions.slice(0, 7)[randomInt(0, 6)]
        : commonFractions[randomInt(0, commonFractions.length - 1)]
      
      return {
        id,
        type: 'fractions',
        difficulty,
        question: `💎 What is ${selected.frac} as a decimal?`,
        correctAnswer: selected.dec,
        xpReward: difficulty === 'easy' ? 15 : difficulty === 'medium' ? 25 : 35,
        hint: `Divide ${selected.frac.split('/')[0]} by ${selected.frac.split('/')[1]}`,
        explanation: `${selected.frac} = ${selected.dec}`,
        context: `The ${selected.frac} Gem glows at ${selected.dec} brightness!`,
        emoji: '💎'
      }
    }
    
    case 'comparison': {
      const fractions = [
        { n: 1, d: 2, val: 0.5 },
        { n: 1, d: 3, val: 0.333 },
        { n: 2, d: 3, val: 0.667 },
        { n: 1, d: 4, val: 0.25 },
        { n: 3, d: 4, val: 0.75 },
        { n: 2, d: 5, val: 0.4 },
        { n: 3, d: 5, val: 0.6 },
        { n: 4, d: 5, val: 0.8 },
      ]
      
      const [f1, f2] = shuffleArray(fractions).slice(0, 2)
      const questionType = randomInt(0, 1) // 0 = which is bigger, 1 = which is smaller
      
      return {
        id,
        type: 'fractions',
        difficulty,
        question: questionType === 0 
          ? `⚖️ Which is LARGER: ${f1.n}/${f1.d} or ${f2.n}/${f2.d}?`
          : `⚖️ Which is SMALLER: ${f1.n}/${f1.d} or ${f2.n}/${f2.d}?`,
        correctAnswer: questionType === 0 
          ? (f1.val > f2.val ? `${f1.n}/${f1.d}` : `${f2.n}/${f2.d}`)
          : (f1.val < f2.val ? `${f1.n}/${f1.d}` : `${f2.n}/${f2.d}`),
        xpReward: difficulty === 'easy' ? 15 : 25,
        hint: `Convert to decimals: ${f1.n}/${f1.d} ≈ ${f1.val.toFixed(2)}, ${f2.n}/${f2.d} ≈ ${f2.val.toFixed(2)}`,
        explanation: `${f1.n}/${f1.d} = ${f1.val}, ${f2.n}/${f2.d} = ${f2.val}`,
        context: `The Fraction Scales tip toward the larger value!`,
        emoji: '⚖️'
      }
    }
  }
  
  return generateFractionQuestion(difficulty) // fallback
}

// ========== WORD PROBLEM GENERATOR ==========

const wordProblemTemplates = {
  easy: [
    {
      template: 'You have ${total}. You buy a toy for ${cost1}. How much left?',
      generator: () => {
        const total = randomInt(20, 100)
        const cost1 = randomInt(5, total - 5)
        return {
          text: `You have $${total}. You buy a toy for $${cost1}. How much money do you have left?`,
          answer: total - cost1,
          hint: `Subtract: ${total} - ${cost1}`,
          context: 'Shopping at the Mountain Market!'
        }
      }
    },
    {
      template: 'A train had {total} passengers. {num} got off. How many remain?',
      generator: () => {
        const total = randomInt(50, 200)
        const num = randomInt(10, total - 10)
        return {
          text: `A train had ${total} passengers. At the station, ${num} passengers got off. How many remain?`,
          answer: total - num,
          hint: `Subtract: ${total} - ${num}`,
          context: 'The Mountain Express!'
        }
      }
    },
    {
      template: 'Three bridges: {a}m, {b}m, {c}m. Total length?',
      generator: () => {
        const a = randomInt(100, 300)
        const b = randomInt(100, 300)
        const c = randomInt(100, 300)
        return {
          text: `Three bridges have lengths: ${a}m, ${b}m, and ${c}m. What is the total length?`,
          answer: a + b + c,
          hint: `Add all three: ${a} + ${b} + ${c}`,
          context: 'The Three Bridges of Mathematica!'
        }
      }
    },
  ],
  medium: [
    {
      template: 'School starts at {start} and ends at {end}. How many hours?',
      generator: () => {
        const start = randomInt(7, 9)
        const duration = randomInt(5, 8)
        const end = start + duration
        return {
          text: `School starts at ${start}:00 AM and ends at ${end}:00 PM. How many hours is school?`,
          answer: duration,
          hint: `${end} - ${start} = ${duration} hours`,
          context: 'Mountain School schedule!'
        }
      }
    },
    {
      template: 'You have ${total}. Buy toy (${cost1}) and book (${cost2}). How much left?',
      generator: () => {
        const cost1 = randomInt(10, 40)
        const cost2 = randomInt(10, 40)
        const total = cost1 + cost2 + randomInt(5, 20)
        return {
          text: `You have $${total}. You buy a toy for $${cost1} and a book for $${cost2}. How much money do you have left?`,
          answer: total - cost1 - cost2,
          hint: `First add: $${cost1} + $${cost2} = $${cost1 + cost2}. Then subtract from $${total}`,
          context: 'Shopping trip in the village!'
        }
      }
    },
    {
      template: 'A baker made {total} cookies. Sold {sold1} in morning, {sold2} in afternoon. How many left?',
      generator: () => {
        const total = randomInt(100, 500)
        const sold1 = randomInt(20, 100)
        const sold2 = randomInt(20, 100)
        return {
          text: `A baker made ${total} cookies. She sold ${sold1} in the morning and ${sold2} in the afternoon. How many are left?`,
          answer: total - sold1 - sold2,
          hint: `Add sales: ${sold1} + ${sold2} = ${sold1 + sold2}. Then subtract from ${total}`,
          context: 'The Mountain Bakery!'
        }
      }
    },
  ],
  hard: [
    {
      template: 'Two numbers sum to {sum}. One is {diff} more than the other. Find the smaller.',
      generator: () => {
        const smaller = randomInt(100, 1000)
        const diff = randomInt(50, 200)
        const larger = smaller + diff
        const sum = smaller + larger
        return {
          text: `Two numbers add up to ${sum}. One number is ${diff} more than the other. What is the smaller number?`,
          answer: smaller,
          hint: `If x is the smaller, then x + (x + ${diff}) = ${sum}. So 2x = ${sum - diff}, x = ${smaller}`,
          context: 'The Ancient Number Puzzle!'
        }
      }
    },
    {
      template: 'A rectangle has perimeter {perimeter}. Length is {length}. Find width.',
      generator: () => {
        const width = randomInt(10, 50)
        const length = randomInt(width + 5, width + 30)
        const perimeter = 2 * (length + width)
        return {
          text: `A rectangular field has a perimeter of ${perimeter} meters. The length is ${length} meters. What is the width?`,
          answer: width,
          hint: `Perimeter = 2 × (length + width). So ${perimeter} = 2 × (${length} + width). Width = ${perimeter}/2 - ${length} = ${width}`,
          context: 'The Royal Garden design!'
        }
      }
    },
    {
      template: 'You have ${total}. Buy {n} items at ${cost} each. How much left?',
      generator: () => {
        const n = randomInt(3, 8)
        const cost = randomInt(10, 50)
        const total = n * cost + randomInt(10, 50)
        return {
          text: `You have $${total}. You buy ${n} items at $${cost} each. How much money do you have left?`,
          answer: total - (n * cost),
          hint: `First multiply: ${n} × $${cost} = $${n * cost}. Then subtract from $${total}`,
          context: 'Bulk shopping at the market!'
        }
      }
    },
  ]
}

export function generateWordProblem(
  difficulty: 'easy' | 'medium' | 'hard' = 'medium'
): MathQuestion {
  const id = `gen-wp-${Date.now()}-${randomInt(1000, 9999)}`
  const templates = wordProblemTemplates[difficulty]
  const template = templates[randomInt(0, templates.length - 1)]
  const generated = template.generator()

  return {
    id,
    type: 'wordProblem',
    difficulty,
    question: generated.text,
    correctAnswer: generated.answer,
    xpReward: difficulty === 'easy' ? 20 : difficulty === 'medium' ? 30 : 45,
    hint: generated.hint,
    explanation: generated.hint,
    context: generated.context,
    emoji: '📚'
  }
}

// ========== MASTER GENERATOR ==========

export function generateRandomQuestion(
  type?: 'multiplication' | 'fractions' | 'wordProblem',
  difficulty?: 'easy' | 'medium' | 'hard'
): MathQuestion {
  const types = type ? [type] : ['multiplication', 'fractions', 'wordProblem']
  const selectedType = types[randomInt(0, types.length - 1)]
  
  const difficulties = difficulty ? [difficulty] : ['easy', 'medium', 'hard']
  const selectedDifficulty = difficulties[randomInt(0, difficulties.length - 1)] as 'easy' | 'medium' | 'hard'

  switch (selectedType) {
    case 'multiplication':
      return generateMultiplicationQuestion(selectedDifficulty)
    case 'fractions':
      return generateFractionQuestion(selectedDifficulty)
    case 'wordProblem':
      return generateWordProblem(selectedDifficulty)
    default:
      return generateMultiplicationQuestion(selectedDifficulty)
  }
}

// Generate a batch of questions
export function generateQuestionBatch(
  count: number,
  type?: 'multiplication' | 'fractions' | 'wordProblem',
  difficulty?: 'easy' | 'medium' | 'hard'
): MathQuestion[] {
  return Array.from({ length: count }, () => generateRandomQuestion(type, difficulty))
}

// Generate mixed practice set (balanced across types and difficulties)
export function generateMixedPracticeSet(count: number = 10): MathQuestion[] {
  const questions: MathQuestion[] = []
  const types: ('multiplication' | 'fractions' | 'wordProblem')[] = ['multiplication', 'fractions', 'wordProblem']
  const difficulties: ('easy' | 'medium' | 'hard')[] = ['easy', 'medium', 'hard']
  
  for (let i = 0; i < count; i++) {
    const type = types[i % types.length]
    const difficulty = difficulties[Math.floor(i / types.length) % difficulties.length]
    questions.push(generateRandomQuestion(type, difficulty))
  }
  
  return shuffleArray(questions)
}
