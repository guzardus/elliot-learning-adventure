import type { MathQuestion, EnglishQuestion, SpellingWord, WritingPrompt } from '@/types';

// ==================== MATH QUESTIONS ====================

export const additionQuestions: MathQuestion[] = [
  // Easy
  { id: 'add-e1', type: 'addition', difficulty: 'easy', question: '24 + 35 = ?', correctAnswer: 59, xpReward: 10 },
  { id: 'add-e2', type: 'addition', difficulty: 'easy', question: '156 + 243 = ?', correctAnswer: 399, xpReward: 10 },
  { id: 'add-e3', type: 'addition', difficulty: 'easy', question: '78 + 94 = ?', correctAnswer: 172, xpReward: 10 },
  { id: 'add-e4', type: 'addition', difficulty: 'easy', question: '345 + 428 = ?', correctAnswer: 773, xpReward: 10 },
  { id: 'add-e5', type: 'addition', difficulty: 'easy', question: '67 + 89 = ?', correctAnswer: 156, xpReward: 10 },
  
  // Medium
  { id: 'add-m1', type: 'addition', difficulty: 'medium', question: '1,247 + 3,856 = ?', correctAnswer: 5103, xpReward: 20 },
  { id: 'add-m2', type: 'addition', difficulty: 'medium', question: '4,582 + 2,943 = ?', correctAnswer: 7525, xpReward: 20 },
  { id: 'add-m3', type: 'addition', difficulty: 'medium', question: '7,629 + 1,847 = ?', correctAnswer: 9476, xpReward: 20 },
  { id: 'add-m4', type: 'addition', difficulty: 'medium', question: '3,456 + 5,789 = ?', correctAnswer: 9245, xpReward: 20 },
  { id: 'add-m5', type: 'addition', difficulty: 'medium', question: '8,234 + 4,567 = ?', correctAnswer: 12801, xpReward: 20 },
  
  // Hard (like your son's homework)
  { id: 'add-h1', type: 'addition', difficulty: 'hard', question: '458,329 + 294,294 = ?', correctAnswer: 752623, xpReward: 30, hint: 'Break it down: 400,000 + 200,000 = 600,000. Then add the rest!' },
  { id: 'add-h2', type: 'addition', difficulty: 'hard', question: '673,492 + 185,768 = ?', correctAnswer: 859260, xpReward: 30, hint: 'Add the thousands first: 673,000 + 185,000 = 858,000. Then add the rest!' },
  { id: 'add-h3', type: 'addition', difficulty: 'hard', question: '892,456 + 347,892 = ?', correctAnswer: 1240348, xpReward: 30, hint: 'Start with 892,456 + 300,000 = 1,192,456. Then add the remaining 47,892!' },
  { id: 'add-h4', type: 'addition', difficulty: 'hard', question: '234,567 + 678,901 = ?', correctAnswer: 913468, xpReward: 30, hint: 'Add the big numbers: 234,000 + 678,000 = 912,000. Then add 567 + 901!' },
  { id: 'add-h5', type: 'addition', difficulty: 'hard', question: '567,890 + 432,109 = ?', correctAnswer: 999999, xpReward: 30, hint: 'Notice something special? 567,890 + 432,110 would be 1,000,000. So this is just 1 less!' },
];

export const subtractionQuestions: MathQuestion[] = [
  // Easy
  { id: 'sub-e1', type: 'subtraction', difficulty: 'easy', question: '85 - 37 = ?', correctAnswer: 48, xpReward: 10 },
  { id: 'sub-e2', type: 'subtraction', difficulty: 'easy', question: '243 - 156 = ?', correctAnswer: 87, xpReward: 10 },
  { id: 'sub-e3', type: 'subtraction', difficulty: 'easy', question: '92 - 45 = ?', correctAnswer: 47, xpReward: 10 },
  { id: 'sub-e4', type: 'subtraction', difficulty: 'easy', question: '500 - 234 = ?', correctAnswer: 266, xpReward: 10 },
  { id: 'sub-e5', type: 'subtraction', difficulty: 'easy', question: '178 - 89 = ?', correctAnswer: 89, xpReward: 10 },
  
  // Medium
  { id: 'sub-m1', type: 'subtraction', difficulty: 'medium', question: '5,432 - 2,876 = ?', correctAnswer: 2556, xpReward: 20 },
  { id: 'sub-m2', type: 'subtraction', difficulty: 'medium', question: '8,000 - 3,456 = ?', correctAnswer: 4544, xpReward: 20 },
  { id: 'sub-m3', type: 'subtraction', difficulty: 'medium', question: '7,654 - 4,321 = ?', correctAnswer: 3333, xpReward: 20 },
  { id: 'sub-m4', type: 'subtraction', difficulty: 'medium', question: '9,876 - 5,432 = ?', correctAnswer: 4444, xpReward: 20 },
  { id: 'sub-m5', type: 'subtraction', difficulty: 'medium', question: '6,543 - 2,109 = ?', correctAnswer: 4434, xpReward: 20 },
  
  // Hard
  { id: 'sub-h1', type: 'subtraction', difficulty: 'hard', question: '473,029 - 385,923 = ?', correctAnswer: 87106, xpReward: 30, hint: 'Try subtracting: 473,029 - 300,000 = 173,029. Then subtract 85,923 more!' },
  { id: 'sub-h2', type: 'subtraction', difficulty: 'hard', question: '892,456 - 456,789 = ?', correctAnswer: 435667, xpReward: 30, hint: 'Break it down: 892,456 - 400,000 = 492,456. Then subtract 56,789!' },
  { id: 'sub-h3', type: 'subtraction', difficulty: 'hard', question: '654,321 - 234,567 = ?', correctAnswer: 419754, xpReward: 30, hint: 'Notice the pattern? 654,321 - 234,567 = 419,754 (fun number sequence!)' },
  { id: 'sub-h4', type: 'subtraction', difficulty: 'hard', question: '789,012 - 345,678 = ?', correctAnswer: 443334, xpReward: 30, hint: '789,012 - 300,000 = 489,012. Then subtract 45,678 more!' },
  { id: 'sub-h5', type: 'subtraction', difficulty: 'hard', question: '987,654 - 123,456 = ?', correctAnswer: 864198, xpReward: 30, hint: '900,000 - 100,000 = 800,000. Then subtract the remaining 87,654 - 23,456!' },
];

export const multiplicationQuestions: MathQuestion[] = [
  // Easy (times tables)
  { id: 'mul-e1', type: 'multiplication', difficulty: 'easy', question: '7 × 8 = ?', correctAnswer: 56, xpReward: 10 },
  { id: 'mul-e2', type: 'multiplication', difficulty: 'easy', question: '9 × 6 = ?', correctAnswer: 54, xpReward: 10 },
  { id: 'mul-e3', type: 'multiplication', difficulty: 'easy', question: '12 × 4 = ?', correctAnswer: 48, xpReward: 10 },
  { id: 'mul-e4', type: 'multiplication', difficulty: 'easy', question: '8 × 7 = ?', correctAnswer: 56, xpReward: 10 },
  { id: 'mul-e5', type: 'multiplication', difficulty: 'easy', question: '11 × 5 = ?', correctAnswer: 55, xpReward: 10 },
  
  // Medium (2-digit × 1-digit)
  { id: 'mul-m1', type: 'multiplication', difficulty: 'medium', question: '23 × 4 = ?', correctAnswer: 92, xpReward: 20 },
  { id: 'mul-m2', type: 'multiplication', difficulty: 'medium', question: '45 × 6 = ?', correctAnswer: 270, xpReward: 20 },
  { id: 'mul-m3', type: 'multiplication', difficulty: 'medium', question: '78 × 3 = ?', correctAnswer: 234, xpReward: 20 },
  { id: 'mul-m4', type: 'multiplication', difficulty: 'medium', question: '56 × 7 = ?', correctAnswer: 392, xpReward: 20 },
  { id: 'mul-m5', type: 'multiplication', difficulty: 'medium', question: '89 × 5 = ?', correctAnswer: 445, xpReward: 20 },
  
  // Hard (2-digit × 2-digit like your son's homework)
  { id: 'mul-h1', type: 'multiplication', difficulty: 'hard', question: '37 × 26 = ?', correctAnswer: 962, xpReward: 30, hint: 'Try 37 × 20 = 740, then 37 × 6 = 222. Add them together!' },
  { id: 'mul-h2', type: 'multiplication', difficulty: 'hard', question: '48 × 35 = ?', correctAnswer: 1680, xpReward: 30, hint: '48 × 30 = 1,440. Then 48 × 5 = 240. Total: 1,680!' },
  { id: 'mul-h3', type: 'multiplication', difficulty: 'hard', question: '52 × 47 = ?', correctAnswer: 2444, xpReward: 30, hint: '50 × 47 = 2,350. Then add 2 × 47 = 94. Total: 2,444!' },
  { id: 'mul-h4', type: 'multiplication', difficulty: 'hard', question: '63 × 28 = ?', correctAnswer: 1764, xpReward: 30, hint: '63 × 20 = 1,260. Then 63 × 8 = 504. Add: 1,260 + 504!' },
  { id: 'mul-h5', type: 'multiplication', difficulty: 'hard', question: '74 × 39 = ?', correctAnswer: 2886, xpReward: 30, hint: '74 × 40 = 2,960. Then subtract 74 to get 74 × 39!' },
];

export const divisionQuestions: MathQuestion[] = [
  // Easy
  { id: 'div-e1', type: 'division', difficulty: 'easy', question: '48 ÷ 6 = ?', correctAnswer: 8, xpReward: 10 },
  { id: 'div-e2', type: 'division', difficulty: 'easy', question: '72 ÷ 9 = ?', correctAnswer: 8, xpReward: 10 },
  { id: 'div-e3', type: 'division', difficulty: 'easy', question: '56 ÷ 7 = ?', correctAnswer: 8, xpReward: 10 },
  { id: 'div-e4', type: 'division', difficulty: 'easy', question: '81 ÷ 9 = ?', correctAnswer: 9, xpReward: 10 },
  { id: 'div-e5', type: 'division', difficulty: 'easy', question: '64 ÷ 8 = ?', correctAnswer: 8, xpReward: 10 },
  
  // Medium (with remainders)
  { id: 'div-m1', type: 'division', difficulty: 'medium', question: '47 ÷ 5 = ?', correctAnswer: '9r2', xpReward: 20, explanation: '47 ÷ 5 = 9 with remainder 2 (5 × 9 = 45, 47 - 45 = 2)' },
  { id: 'div-m2', type: 'division', difficulty: 'medium', question: '53 ÷ 7 = ?', correctAnswer: '7r4', xpReward: 20, explanation: '53 ÷ 7 = 7 with remainder 4 (7 × 7 = 49, 53 - 49 = 4)' },
  { id: 'div-m3', type: 'division', difficulty: 'medium', question: '68 ÷ 8 = ?', correctAnswer: '8r4', xpReward: 20, explanation: '68 ÷ 8 = 8 with remainder 4 (8 × 8 = 64, 68 - 64 = 4)' },
  { id: 'div-m4', type: 'division', difficulty: 'medium', question: '39 ÷ 4 = ?', correctAnswer: '9r3', xpReward: 20, explanation: '39 ÷ 4 = 9 with remainder 3 (4 × 9 = 36, 39 - 36 = 3)' },
  { id: 'div-m5', type: 'division', difficulty: 'medium', question: '71 ÷ 9 = ?', correctAnswer: '7r8', xpReward: 20, explanation: '71 ÷ 9 = 7 with remainder 8 (9 × 7 = 63, 71 - 63 = 8)' },
  
  // Hard
  { id: 'div-h1', type: 'division', difficulty: 'hard', question: '156 ÷ 12 = ?', correctAnswer: 13, xpReward: 30, hint: '12 × 10 = 120. 156 - 120 = 36. 12 × 3 = 36. So 10 + 3 = 13!' },
  { id: 'div-h2', type: 'division', difficulty: 'hard', question: '225 ÷ 15 = ?', correctAnswer: 15, xpReward: 30, hint: '15 × 10 = 150. 225 - 150 = 75. 15 × 5 = 75. So 10 + 5 = 15!' },
  { id: 'div-h3', type: 'division', difficulty: 'hard', question: '168 ÷ 14 = ?', correctAnswer: 12, xpReward: 30, hint: '14 × 10 = 140. 168 - 140 = 28. 14 × 2 = 28. So 10 + 2 = 12!' },
  { id: 'div-h4', type: 'division', difficulty: 'hard', question: '196 ÷ 14 = ?', correctAnswer: 14, xpReward: 30, hint: '14 × 10 = 140. 196 - 140 = 56. 14 × 4 = 56. So 10 + 4 = 14!' },
  { id: 'div-h5', type: 'division', difficulty: 'hard', question: '144 ÷ 12 = ?', correctAnswer: 12, xpReward: 30, hint: "Think: 12 × 12 = 144 (it's a square number!)" },
];

// WORD PROBLEMS - Making math engaging!
export const wordProblemQuestions: MathQuestion[] = [
  // Addition word problems
  { 
    id: 'wp-add1', 
    type: 'wordProblem', 
    difficulty: 'easy', 
    question: 'A dragon has 458 gold coins in one cave and 294 gold coins in another cave. How many coins does the dragon have in total?',
    correctAnswer: 752, 
    xpReward: 20,
    hint: 'Add the coins from both caves together!'
  },
  { 
    id: 'wp-add2', 
    type: 'wordProblem', 
    difficulty: 'medium', 
    question: 'At the school fair, 1,247 people came on Saturday and 3,856 people came on Sunday. How many people visited the fair in total?',
    correctAnswer: 5103, 
    xpReward: 25,
    hint: 'Add Saturday and Sunday visitors together!'
  },
  { 
    id: 'wp-add3', 
    type: 'wordProblem', 
    difficulty: 'hard', 
    question: 'A library has 458,329 books. They receive a donation of 294,294 more books. How many books does the library have now?',
    correctAnswer: 752623, 
    xpReward: 35,
    hint: 'This is just like your homework - add the two big numbers!'
  },
  
  // Subtraction word problems
  { 
    id: 'wp-sub1', 
    type: 'wordProblem', 
    difficulty: 'easy', 
    question: 'A baker made 85 cookies. She sold 37 cookies. How many cookies are left?',
    correctAnswer: 48, 
    xpReward: 20,
    hint: 'Subtract the sold cookies from the total!'
  },
  { 
    id: 'wp-sub2', 
    type: 'wordProblem', 
    difficulty: 'medium', 
    question: 'A train had 5,432 passengers. At the station, 2,876 passengers got off. How many passengers are still on the train?',
    correctAnswer: 2556, 
    xpReward: 25,
    hint: 'Subtract the passengers who got off from the total!'
  },
  { 
    id: 'wp-sub3', 
    type: 'wordProblem', 
    difficulty: 'hard', 
    question: 'A treasure chest had 473,029 gold coins. Pirates took 385,923 coins. How many coins remain?',
    correctAnswer: 87106, 
    xpReward: 35,
    hint: 'Just like your homework - subtract the taken coins from the total!'
  },
  
  // Multiplication word problems
  { 
    id: 'wp-mul1', 
    type: 'wordProblem', 
    difficulty: 'easy', 
    question: 'A box contains 7 chocolates. How many chocolates are in 8 boxes?',
    correctAnswer: 56, 
    xpReward: 20,
    hint: 'Multiply the chocolates per box by the number of boxes!'
  },
  { 
    id: 'wp-mul2', 
    type: 'wordProblem', 
    difficulty: 'medium', 
    question: 'A farmer has 23 rows of apple trees with 4 trees in each row. How many apple trees does the farmer have?',
    correctAnswer: 92, 
    xpReward: 25,
    hint: 'Multiply rows by trees per row!'
  },
  { 
    id: 'wp-mul3', 
    type: 'wordProblem', 
    difficulty: 'hard', 
    question: 'A school ordered 37 boxes of pencils. Each box contains 26 pencils. How many pencils did the school order?',
    correctAnswer: 962, 
    xpReward: 35,
    hint: 'Just like your homework - multiply boxes by pencils per box!'
  },
  
  // Division word problems
  { 
    id: 'wp-div1', 
    type: 'wordProblem', 
    difficulty: 'easy', 
    question: '48 cookies are shared equally among 6 friends. How many cookies does each friend get?',
    correctAnswer: 8, 
    xpReward: 20,
    hint: 'Divide total cookies by number of friends!'
  },
  { 
    id: 'wp-div2', 
    type: 'wordProblem', 
    difficulty: 'medium', 
    question: 'A teacher has 47 stickers to share equally among 5 students. How many stickers does each student get, and how many are left over?',
    correctAnswer: '9r3', 
    xpReward: 25,
    hint: 'Divide and find the remainder!'
  },
  { 
    id: 'wp-div3', 
    type: 'wordProblem', 
    difficulty: 'hard', 
    question: 'A bakery made 156 cupcakes. They pack them into boxes of 12. How many boxes can they fill?',
    correctAnswer: 13, 
    xpReward: 35,
    hint: 'Divide total cupcakes by cupcakes per box!'
  },
  
  // Multi-step word problems
  { 
    id: 'wp-multi1', 
    type: 'wordProblem', 
    difficulty: 'medium', 
    question: 'Sarah has $45. She buys 3 books for $8 each. How much money does she have left?',
    correctAnswer: 21, 
    xpReward: 30,
    hint: 'First multiply to find the total cost, then subtract from $45!'
  },
  { 
    id: 'wp-multi2', 
    type: 'wordProblem', 
    difficulty: 'hard', 
    question: 'A bus can hold 48 passengers. There are 6 buses. If 234 passengers need to travel, how many empty seats will there be?',
    correctAnswer: 54, 
    xpReward: 40,
    hint: 'First multiply to find total seats, then subtract the passengers!'
  },
  
  // Money word problems
  { 
    id: 'wp-money1', 
    type: 'wordProblem', 
    difficulty: 'easy', 
    question: 'An apple costs $2. How much do 5 apples cost?',
    correctAnswer: 10, 
    xpReward: 20,
    hint: 'Multiply the cost by the number of apples!'
  },
  { 
    id: 'wp-money2', 
    type: 'wordProblem', 
    difficulty: 'medium', 
    question: 'You have $50. You buy a toy for $28 and a book for $15. How much money do you have left?',
    correctAnswer: 7, 
    xpReward: 25,
    hint: 'Add the costs first, then subtract from $50!'
  },
  
  // Time word problems
  { 
    id: 'wp-time1', 
    type: 'wordProblem', 
    difficulty: 'easy', 
    question: 'A movie starts at 2:30 PM and lasts 1 hour and 45 minutes. What time does it end?',
    correctAnswer: '4:15 PM', 
    xpReward: 20,
    hint: 'Add 1 hour to 2:30, then add 45 minutes!'
  },
  { 
    id: 'wp-time2', 
    type: 'wordProblem', 
    difficulty: 'medium', 
    question: 'A train journey takes 3 hours 25 minutes. If the train leaves at 9:15 AM, when does it arrive?',
    correctAnswer: '12:40 PM', 
    xpReward: 25,
    hint: 'Add 3 hours to 9:15, then add 25 minutes!'
  },
];

// ==================== ENGLISH QUESTIONS ====================

export const spellingWords: SpellingWord[] = [
  // Easy (common words)
  { word: 'because', phonetic: '/bi-koz/', sentence: 'I love reading because it is fun.', difficulty: 'easy' },
  { word: 'friend', phonetic: '/frend/', sentence: 'My friend and I play together.', difficulty: 'easy' },
  { word: 'school', phonetic: '/skool/', sentence: 'I walk to school every day.', difficulty: 'easy' },
  { word: 'their', phonetic: '/thair/', sentence: 'The children love their new teacher.', difficulty: 'easy' },
  { word: 'would', phonetic: '/wood/', sentence: 'I would like some ice cream.', difficulty: 'easy' },
  { word: 'should', phonetic: '/shood/', sentence: 'You should eat your vegetables.', difficulty: 'easy' },
  { word: 'could', phonetic: '/kood/', sentence: 'I could help you with that.', difficulty: 'easy' },
  { word: 'people', phonetic: '/pee-pul/', sentence: 'Many people came to the party.', difficulty: 'easy' },
  
  // Medium (tricky words)
  { word: 'Wednesday', phonetic: '/wenz-day/', sentence: 'I have swimming on Wednesday.', difficulty: 'medium' },
  { word: 'beautiful', phonetic: '/byoo-ti-ful/', sentence: 'The sunset was beautiful.', difficulty: 'medium' },
  { word: 'different', phonetic: '/dif-rent/', sentence: 'We have different favorite colors.', difficulty: 'medium' },
  { word: 'favorite', phonetic: '/fay-vrit/', sentence: 'Pizza is my favorite food.', difficulty: 'medium' },
  { word: 'surprise', phonetic: '/ser-prize/', sentence: 'The party was a big surprise!', difficulty: 'medium' },
  { word: 'tomorrow', phonetic: '/to-mor-oh/', sentence: 'We are going to the zoo tomorrow.', difficulty: 'medium' },
  { word: 'question', phonetic: '/kwes-chun/', sentence: 'I have a question for you.', difficulty: 'medium' },
  { word: 'answer', phonetic: '/an-ser/', sentence: 'Do you know the answer?', difficulty: 'medium' },
  
  // Hard (NAPLAN tricky words)
  { word: 'necessary', phonetic: '/nes-i-ser-ee/', sentence: 'Sleep is necessary for good health.', difficulty: 'hard' },
  { word: 'separate', phonetic: '/sep-a-rate/', sentence: 'Please separate the blue and red blocks.', difficulty: 'hard' },
  { word: 'definitely', phonetic: '/def-i-nit-lee/', sentence: 'I will definitely be there.', difficulty: 'hard' },
  { word: 'occasionally', phonetic: '/o-kay-zhun-al-ee/', sentence: 'I occasionally eat chocolate.', difficulty: 'hard' },
  { word: 'environment', phonetic: '/en-vy-ruh-ment/', sentence: 'We must protect our environment.', difficulty: 'hard' },
  { word: 'knowledge', phonetic: '/nol-ij/', sentence: 'Reading gives you knowledge.', difficulty: 'hard' },
  { word: 'experience', phonetic: '/ik-speer-ee-uns/', sentence: 'This is a new experience for me.', difficulty: 'hard' },
  { word: 'achievement', phonetic: '/a-cheev-ment/', sentence: 'Winning the race was a great achievement.', difficulty: 'hard' },
];

export const grammarQuestions: EnglishQuestion[] = [
  // Nouns
  { id: 'gr-n1', type: 'grammar', difficulty: 'easy', question: 'Which word is a noun? "The cat slept on the soft pillow."', options: ['slept', 'soft', 'cat', 'on'], correctAnswer: 'cat', xpReward: 10 },
  { id: 'gr-n2', type: 'grammar', difficulty: 'easy', question: 'Which word is a proper noun? "Sarah went to Paris last summer."', options: ['went', 'summer', 'Sarah', 'last'], correctAnswer: 'Sarah', xpReward: 10 },
  
  // Verbs
  { id: 'gr-v1', type: 'grammar', difficulty: 'easy', question: 'Which word is a verb? "The dog runs quickly through the park."', options: ['dog', 'runs', 'quickly', 'park'], correctAnswer: 'runs', xpReward: 10 },
  { id: 'gr-v2', type: 'grammar', difficulty: 'medium', question: 'What is the past tense of "run"?', options: ['runned', 'ran', 'running', 'runt'], correctAnswer: 'ran', xpReward: 15 },
  
  // Adjectives
  { id: 'gr-a1', type: 'grammar', difficulty: 'easy', question: 'Which word is an adjective? "The fluffy kitten played happily."', options: ['kitten', 'played', 'happily', 'fluffy'], correctAnswer: 'fluffy', xpReward: 10 },
  { id: 'gr-a2', type: 'grammar', difficulty: 'medium', question: 'Which sentence uses an adjective correctly?', options: ['The dog barked loud.', 'The loud dog barked.', 'The dog loud barked.', 'Barked the loud dog.'], correctAnswer: 'The loud dog barked.', xpReward: 15 },
  
  // Sentence structure
  { id: 'gr-s1', type: 'grammar', difficulty: 'medium', question: 'Which sentence is written correctly?', options: ['the cat sat on the mat', 'The cat sat on the mat.', 'The cat sat on the mat', 'the Cat Sat on the Mat.'], correctAnswer: 'The cat sat on the mat.', xpReward: 15 },
  { id: 'gr-s2', type: 'grammar', difficulty: 'hard', question: 'Which sentence uses the correct plural?', options: ['The childs played outside.', 'The children played outside.', 'The childes played outside.', 'The child played outside.'], correctAnswer: 'The children played outside.', xpReward: 20 },
  
  // Tenses
  { id: 'gr-t1', type: 'grammar', difficulty: 'medium', question: 'Which sentence is in the future tense?', options: ['I am eating pizza.', 'I ate pizza yesterday.', 'I will eat pizza tomorrow.', 'I eat pizza every day.'], correctAnswer: 'I will eat pizza tomorrow.', xpReward: 15 },
  { id: 'gr-t2', type: 'grammar', difficulty: 'hard', question: 'Fill in the blank: "Yesterday, I _____ to the store."', options: ['go', 'goes', 'went', 'going'], correctAnswer: 'went', xpReward: 20 },
];

export const punctuationQuestions: EnglishQuestion[] = [
  { id: 'pn-1', type: 'punctuation', difficulty: 'easy', question: 'Where does the full stop go? "The cat sat on the mat___"', options: ['?', '!', '.', ','], correctAnswer: '.', xpReward: 10 },
  { id: 'pn-2', type: 'punctuation', difficulty: 'easy', question: 'Which punctuation mark shows excitement?', options: ['.', ',', '?', '!'], correctAnswer: '!', xpReward: 10 },
  { id: 'pn-3', type: 'punctuation', difficulty: 'medium', question: 'Where does the comma go? "I like apples oranges and bananas."', options: ['apples, oranges', 'like, apples', 'I, like', 'and, bananas'], correctAnswer: 'apples, oranges', xpReward: 15 },
  { id: 'pn-4', type: 'punctuation', difficulty: 'medium', question: 'Which sentence uses the apostrophe correctly?', options: ["The dogs bone.", "The dog's bone.", "The dogs' bone.", "The dog,s bone."], correctAnswer: "The dog's bone.", xpReward: 15 },
  { id: 'pn-5', type: 'punctuation', difficulty: 'hard', question: 'Fix this sentence: "on monday i went to the park"', options: ['On Monday I went to the park.', 'On monday I went to the park.', 'On Monday i went to the park.', 'on Monday I went to the park.'], correctAnswer: 'On Monday I went to the park.', xpReward: 20 },
  { id: 'pn-6', type: 'punctuation', difficulty: 'hard', question: 'Which sentence is punctuated correctly?', options: ['"Hello," said the girl.', '"Hello" said the girl.', '"Hello, said the girl."', '"Hello," said the girl"'], correctAnswer: '"Hello," said the girl.', xpReward: 20 },
];

export const writingPrompts: WritingPrompt[] = [
  {
    id: 'wp-n1',
    type: 'narrative',
    prompt: 'You discover a hidden door in your bedroom. What happens when you open it?',
    hints: ['Describe what you see behind the door', 'Who or what do you meet?', 'What adventure do you go on?', 'How does your story end?']
  },
  {
    id: 'wp-n2',
    type: 'narrative',
    prompt: 'Write a story about a day when animals could talk.',
    hints: ['Which animal do you meet first?', 'What do they tell you?', 'What problem do you solve together?', 'How does the day end?']
  },
  {
    id: 'wp-n3',
    type: 'narrative',
    prompt: 'Your toy comes to life for one day. What happens?',
    hints: ['Which toy comes to life?', 'What do you do together?', 'Do you go on an adventure?', 'What happens when the day ends?']
  },
  {
    id: 'wp-p1',
    type: 'persuasive',
    prompt: 'Persuade your teacher to have a "Pajama Day" at school.',
    hints: ['Why would it be fun?', 'How would it help learning?', 'What activities could you do?', 'Why should they say yes?']
  },
  {
    id: 'wp-p2',
    type: 'persuasive',
    prompt: 'Convince your parents to get a pet.',
    hints: ['What pet do you want?', 'How would you take care of it?', 'What are the benefits?', 'Why is now a good time?']
  },
  {
    id: 'wp-p3',
    type: 'persuasive',
    prompt: 'Should children have homework? Give your opinion.',
    hints: ['What is your opinion?', 'Give 2-3 reasons', 'Explain each reason', 'End with a strong conclusion']
  },
];

// ==================== HELPER FUNCTIONS ====================

export function getRandomQuestions<T extends MathQuestion | EnglishQuestion>(
  questions: T[], 
  count: number, 
  difficulty?: 'easy' | 'medium' | 'hard'
): T[] {
  let filtered = questions;
  if (difficulty) {
    filtered = questions.filter(q => q.difficulty === difficulty) as T[];
  }
  const shuffled = [...filtered].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

export function getSurpriseMixQuestions(count: number = 10): (MathQuestion | EnglishQuestion)[] {
  const allMath = [
    ...additionQuestions,
    ...subtractionQuestions,
    ...multiplicationQuestions,
    ...divisionQuestions,
    ...wordProblemQuestions
  ];
  
  const allEnglish = [
    ...grammarQuestions,
    ...punctuationQuestions
  ];
  
  const allQuestions = [...allMath, ...allEnglish];
  const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function getSpellingWords(count: number, difficulty?: 'easy' | 'medium' | 'hard'): SpellingWord[] {
  let filtered = spellingWords;
  if (difficulty) {
    filtered = spellingWords.filter(w => w.difficulty === difficulty);
  }
  const shuffled = [...filtered].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

export function getRandomWritingPrompt(type?: 'narrative' | 'persuasive'): WritingPrompt {
  let filtered = writingPrompts;
  if (type) {
    filtered = writingPrompts.filter(w => w.type === type);
  }
  return filtered[Math.floor(Math.random() * filtered.length)];
}

// ==================== ELARA'S MASSIVE EXPANSION ====================
// Added March 2, 2026 - 200+ new questions for daily learning variety

export const additionQuestionsExtended = [
  { id: 'add-e6', type: 'addition', difficulty: 'easy', question: '33 + 47 = ?', correctAnswer: 80, xpReward: 10 },
  { id: 'add-e7', type: 'addition', difficulty: 'easy', question: '58 + 23 = ?', correctAnswer: 81, xpReward: 10 },
  { id: 'add-e8', type: 'addition', difficulty: 'easy', question: '125 + 76 = ?', correctAnswer: 201, xpReward: 10 },
  { id: 'add-e9', type: 'addition', difficulty: 'easy', question: '294 + 108 = ?', correctAnswer: 402, xpReward: 10 },
  { id: 'add-e10', type: 'addition', difficulty: 'easy', question: '167 + 234 = ?', correctAnswer: 401, xpReward: 10 },
];

export const subtractionQuestionsExtended = [
  { id: 'sub-e6', type: 'subtraction', difficulty: 'easy', question: '100 - 45 = ?', correctAnswer: 55, xpReward: 10 },
  { id: 'sub-e7', type: 'subtraction', difficulty: 'easy', question: '73 - 28 = ?', correctAnswer: 45, xpReward: 10 },
  { id: 'sub-e8', type: 'subtraction', difficulty: 'easy', question: '156 - 78 = ?', correctAnswer: 78, xpReward: 10 },
  { id: 'sub-e9', type: 'subtraction', difficulty: 'easy', question: '200 - 134 = ?', correctAnswer: 66, xpReward: 10 },
  { id: 'sub-e10', type: 'subtraction', difficulty: 'easy', question: '333 - 111 = ?', correctAnswer: 222, xpReward: 10 },
];

export const multiplicationQuestionsExtended = [
  { id: 'mul-e6', type: 'multiplication', difficulty: 'easy', question: '6 × 7 = ?', correctAnswer: 42, xpReward: 10 },
  { id: 'mul-e7', type: 'multiplication', difficulty: 'easy', question: '4 × 9 = ?', correctAnswer: 36, xpReward: 10 },
  { id: 'mul-e8', type: 'multiplication', difficulty: 'easy', question: '11 × 3 = ?', correctAnswer: 33, xpReward: 10 },
  { id: 'mul-e9', type: 'multiplication', difficulty: 'easy', question: '5 × 12 = ?', correctAnswer: 60, xpReward: 10 },
  { id: 'mul-e10', type: 'multiplication', difficulty: 'easy', question: '9 × 9 = ?', correctAnswer: 81, xpReward: 10 },
];

export const divisionQuestionsExtended = [
  { id: 'div-e6', type: 'division', difficulty: 'easy', question: '36 ÷ 6 = ?', correctAnswer: 6, xpReward: 10 },
  { id: 'div-e7', type: 'division', difficulty: 'easy', question: '45 ÷ 9 = ?', correctAnswer: 5, xpReward: 10 },
  { id: 'div-e8', type: 'division', difficulty: 'easy', question: '63 ÷ 7 = ?', correctAnswer: 9, xpReward: 10 },
  { id: 'div-e9', type: 'division', difficulty: 'easy', question: '96 ÷ 8 = ?', correctAnswer: 12, xpReward: 10 },
  { id: 'div-e10', type: 'division', difficulty: 'easy', question: '108 ÷ 9 = ?', correctAnswer: 12, xpReward: 10 },
];

export const wordProblemQuestionsExtended = [
  { id: 'wp-shop1', type: 'wordProblem', difficulty: 'easy', question: 'A toy costs . You have . How much change?', correctAnswer: 25, xpReward: 20, hint: 'Subtract the cost from what you have!' },
  { id: 'wp-shop2', type: 'wordProblem', difficulty: 'easy', question: 'Apples cost  each. How much do 7 apples cost?', correctAnswer: 21, xpReward: 20, hint: 'Multiply cost per apple by number of apples!' },
  { id: 'wp-sport1', type: 'wordProblem', difficulty: 'easy', question: 'A soccer team has 11 players. How many players on 3 teams?', correctAnswer: 33, xpReward: 20, hint: 'Multiply players per team by number of teams!' },
  { id: 'wp-sport2', type: 'wordProblem', difficulty: 'easy', question: 'You run 5 laps. Each lap is 200 meters. How many meters total?', correctAnswer: 1000, xpReward: 20, hint: 'Multiply laps by meters per lap!' },
  { id: 'wp-animal1', type: 'wordProblem', difficulty: 'easy', question: 'A cat has 4 legs. How many legs on 6 cats?', correctAnswer: 24, xpReward: 20, hint: 'Multiply legs per cat by number of cats!' },
  { id: 'wp-school1', type: 'wordProblem', difficulty: 'easy', question: 'There are 24 students and 4 tables. How many students per table?', correctAnswer: 6, xpReward: 20, hint: 'Divide students by tables!' },
  { id: 'wp-food1', type: 'wordProblem', difficulty: 'easy', question: 'A pizza has 8 slices. You eat 3. How many left?', correctAnswer: 5, xpReward: 20, hint: 'Subtract eaten slices from total!' },
];

export const spellingWordsExtended = [
  { word: 'about', phonetic: '/uh-bowt/', sentence: 'Tell me about your day.', difficulty: 'easy' },
  { word: 'again', phonetic: '/uh-gen/', sentence: 'Can you say that again?', difficulty: 'easy' },
  { word: 'always', phonetic: '/al-wayz/', sentence: 'I always eat breakfast.', difficulty: 'easy' },
  { word: 'around', phonetic: '/uh-rownd/', sentence: 'Look around the room.', difficulty: 'easy' },
  { word: 'before', phonetic: '/bee-for/', sentence: 'Wash hands before eating.', difficulty: 'easy' },
  { word: 'believe', phonetic: '/bee-leev/', sentence: 'I believe in you!', difficulty: 'medium' },
  { word: 'bicycle', phonetic: '/bye-si-kul/', sentence: 'I ride my bicycle to school.', difficulty: 'medium' },
  { word: 'calendar', phonetic: '/ka-len-dar/', sentence: 'Mark it on the calendar.', difficulty: 'medium' },
  { word: 'definitely', phonetic: '/def-i-nit-lee/', sentence: 'I will definitely be there.', difficulty: 'hard' },
  { word: 'environment', phonetic: '/en-vye-ron-ment/', sentence: 'We must protect the environment.', difficulty: 'hard' },
];

export const grammarQuestionsExtended = [
  { id: 'gram-noun1', type: 'grammar', difficulty: 'easy', question: 'Which word is a noun? "The dog ran fast."', options: ['The', 'dog', 'ran', 'fast'], correctAnswer: 'dog', xpReward: 10, hint: 'A noun is a person, place, or thing.' },
  { id: 'gram-verb1', type: 'grammar', difficulty: 'easy', question: 'Which word is a verb? "The bird sings loudly."', options: ['The', 'bird', 'sings', 'loudly'], correctAnswer: 'sings', xpReward: 10, hint: 'A verb is an action word.' },
  { id: 'gram-adj1', type: 'grammar', difficulty: 'easy', question: 'Which word is an adjective? "The tall tree swayed."', options: ['The', 'tall', 'tree', 'swayed'], correctAnswer: 'tall', xpReward: 10, hint: 'An adjective describes something.' },
  { id: 'gram-tense1', type: 'grammar', difficulty: 'easy', question: 'Which sentence is past tense?', options: ['I am eating.', 'I will eat.', 'I ate.'], correctAnswer: 'I ate.', xpReward: 10, hint: 'Past tense means it already happened.' },
  { id: 'gram-plural1', type: 'grammar', difficulty: 'easy', question: 'What is the plural of "cat"?', options: ['cats', 'cates', 'cat'], correctAnswer: 'cats', xpReward: 10 },
];

// ==================== MEASUREMENT MODULE (Time, Length, Capacity) ====================
export const measurementQuestions: MathQuestion[] = [
  // TIME - Clock Reading
  { id: 'meas-time1', type: 'measurement', difficulty: 'easy', question: 'What time is shown? (Digital: 3:45)', correctAnswer: 'quarter to 4', xpReward: 15, hint: '3:45 is 15 minutes before 4:00 = quarter to 4' },
  { id: 'meas-time2', type: 'measurement', difficulty: 'easy', question: 'What time is shown? (Digital: 3:15)', correctAnswer: 'quarter past 3', xpReward: 15, hint: '3:15 is 15 minutes after 3:00 = quarter past 3' },
  { id: 'meas-time3', type: 'measurement', difficulty: 'easy', question: 'What time is shown? (Digital: 10:30)', correctAnswer: 'half past 10', xpReward: 15, hint: '10:30 is 30 minutes after 10:00 = half past 10' },
  { id: 'meas-time4', type: 'measurement', difficulty: 'medium', question: 'School starts at 8:30 AM and ends at 3:00 PM. How many hours?', correctAnswer: 6.5, xpReward: 20, hint: 'From 8:30 AM to 3:00 PM is 6 hours and 30 minutes' },
  { id: 'meas-time5', type: 'measurement', difficulty: 'medium', question: 'A movie starts at 2:15 PM and lasts 1 hour 45 minutes. When does it end?', correctAnswer: '4:00 PM', xpReward: 20, hint: 'Add 1 hour to 2:15 = 3:15, then add 45 minutes' },
  { id: 'meas-time6', type: 'measurement', difficulty: 'medium', question: 'If it is 9:45 now, what time will it be in 30 minutes?', correctAnswer: '10:15', xpReward: 20, hint: 'Add 15 minutes to get to 10:00, then 15 more minutes' },
  { id: 'meas-time7', type: 'measurement', difficulty: 'hard', question: 'A train leaves at 11:45 AM and arrives at 2:20 PM. How long is the journey?', correctAnswer: '2 hours 35 minutes', xpReward: 25, hint: 'From 11:45 to 2:45 would be 3 hours. Subtract 25 minutes.' },
  { id: 'meas-time8', type: 'measurement', difficulty: 'hard', question: 'What is quarter to 7 in digital time?', correctAnswer: '6:45', xpReward: 25, hint: 'Quarter to means 15 minutes before. 7:00 - 15 minutes = 6:45' },
  { id: 'meas-time9', type: 'measurement', difficulty: 'easy', question: 'What is half past 8 in digital time?', correctAnswer: '8:30', xpReward: 15, hint: 'Half past means 30 minutes after the hour' },
  { id: 'meas-time10', type: 'measurement', difficulty: 'medium', question: 'Break starts at 10:55 and ends at 11:25. How many minutes?', correctAnswer: 30, xpReward: 20, hint: 'From 10:55 to 11:00 is 5 minutes, plus 25 more minutes' },
  
  // LENGTH - Conversions and Problems
  { id: 'meas-len1', type: 'measurement', difficulty: 'easy', question: 'How many centimeters in 1 meter?', correctAnswer: 100, xpReward: 10, hint: '1 meter = 100 centimeters' },
  { id: 'meas-len2', type: 'measurement', difficulty: 'easy', question: 'How many meters in 1 kilometer?', correctAnswer: 1000, xpReward: 10, hint: '1 kilometer = 1000 meters' },
  { id: 'meas-len3', type: 'measurement', difficulty: 'medium', question: 'A rope is 250 cm long. How many meters is that?', correctAnswer: 2.5, xpReward: 15, hint: 'Divide by 100: 250 ÷ 100 = 2.5 meters' },
  { id: 'meas-len4', type: 'measurement', difficulty: 'medium', question: 'A rectangular paddock has a perimeter of 50 meters. Each long side is 15 meters. What is the length of each short side?', correctAnswer: 10, xpReward: 25, hint: 'Two long sides = 30m. Remaining 20m ÷ 2 short sides = 10m each' },
  { id: 'meas-len5', type: 'measurement', difficulty: 'medium', question: 'A table is 180 cm long. How many meters and centimeters?', correctAnswer: '1m 80cm', xpReward: 15, hint: '180 cm = 100 cm + 80 cm = 1 meter 80 cm' },
  { id: 'meas-len6', type: 'measurement', difficulty: 'hard', question: 'You walk 2.5 km to school and back home. How many meters total?', correctAnswer: 5000, xpReward: 25, hint: '2.5 km × 2 trips = 5 km. 5 km × 1000 = 5000 meters' },
  
  // CAPACITY - Volume and Liquid Measurement
  { id: 'meas-cap1', type: 'measurement', difficulty: 'easy', question: 'How many milliliters in 1 liter?', correctAnswer: 1000, xpReward: 10, hint: '1 liter = 1000 milliliters' },
  { id: 'meas-cap2', type: 'measurement', difficulty: 'easy', question: 'A water bottle holds 500 mL. How many bottles make 1 liter?', correctAnswer: 2, xpReward: 15, hint: '1000 mL ÷ 500 mL = 2 bottles' },
  { id: 'meas-cap3', type: 'measurement', difficulty: 'medium', question: 'A jug has 750 mL of juice. You pour out 250 mL. How much left?', correctAnswer: 500, xpReward: 15, hint: '750 - 250 = 500 mL' },
  { id: 'meas-cap4', type: 'measurement', difficulty: 'medium', question: 'Which has more: 3 bottles of 300 mL or 2 bottles of 500 mL?', correctAnswer: '2 bottles of 500 mL', xpReward: 20, hint: '3 × 300 = 900 mL, 2 × 500 = 1000 mL' },
  { id: 'meas-cap5', type: 'measurement', difficulty: 'hard', question: 'A container holds 2.5 liters. How many 500 mL cups can you fill?', correctAnswer: 5, xpReward: 25, hint: '2.5 liters = 2500 mL. 2500 ÷ 500 = 5 cups' },
];

// ==================== GEOMETRY MODULE (2D/3D Shapes, Symmetry) ====================
export const geometryQuestions: MathQuestion[] = [
  // 2D SHAPES
  { id: 'geo-2d1', type: 'geometry', difficulty: 'easy', question: 'How many sides does a triangle have?', correctAnswer: 3, xpReward: 10, hint: 'Tri- means three' },
  { id: 'geo-2d2', type: 'geometry', difficulty: 'easy', question: 'How many sides does a square have?', correctAnswer: 4, xpReward: 10, hint: 'A square has 4 equal sides' },
  { id: 'geo-2d3', type: 'geometry', difficulty: 'easy', question: 'How many sides does a pentagon have?', correctAnswer: 5, xpReward: 10, hint: 'Penta- means five' },
  { id: 'geo-2d4', type: 'geometry', difficulty: 'easy', question: 'How many sides does a hexagon have?', correctAnswer: 6, xpReward: 10, hint: 'Hexa- means six' },
  { id: 'geo-2d5', type: 'geometry', difficulty: 'medium', question: 'How many corners does a rectangle have?', correctAnswer: 4, xpReward: 15, hint: 'A rectangle has 4 corners (vertices)' },
  { id: 'geo-2d6', type: 'geometry', difficulty: 'medium', question: 'Which shape has 3 sides: triangle, square, or circle?', correctAnswer: 'triangle', xpReward: 15, hint: 'Only triangles have 3 sides' },
  
  // 3D SHAPES - Faces, Edges, Vertices
  { id: 'geo-3d1', type: 'geometry', difficulty: 'easy', question: 'How many faces does a cube have?', correctAnswer: 6, xpReward: 15, hint: 'A cube has 6 square faces (like a die)' },
  { id: 'geo-3d2', type: 'geometry', difficulty: 'medium', question: 'How many faces does a rectangular prism have?', correctAnswer: 6, xpReward: 20, hint: 'Like a box - top, bottom, front, back, left, right = 6 faces' },
  { id: 'geo-3d3', type: 'geometry', difficulty: 'medium', question: 'How many edges does a cube have?', correctAnswer: 12, xpReward: 20, hint: 'A cube has 12 edges where faces meet' },
  { id: 'geo-3d4', type: 'geometry', difficulty: 'hard', question: 'A prism has 5 faces, 9 edges, and 6 vertices. What shape is the base?', correctAnswer: 'triangle', xpReward: 30, hint: '2 triangular bases + 3 rectangular faces = 5 faces' },
  { id: 'geo-3d5', type: 'geometry', difficulty: 'hard', question: 'How many vertices (corners) does a cube have?', correctAnswer: 8, xpReward: 25, hint: 'Top face has 4 corners, bottom face has 4 corners = 8 total' },
  
  // SYMMETRY
  { id: 'geo-sym1', type: 'geometry', difficulty: 'easy', question: 'How many lines of symmetry does a square have?', correctAnswer: 4, xpReward: 15, hint: 'Horizontal, vertical, and 2 diagonals = 4 lines' },
  { id: 'geo-sym2', type: 'geometry', difficulty: 'easy', question: 'How many lines of symmetry does a rectangle have?', correctAnswer: 2, xpReward: 15, hint: 'Horizontal and vertical through the middle' },
  { id: 'geo-sym3', type: 'geometry', difficulty: 'medium', question: 'How many lines of symmetry does an equilateral triangle have?', correctAnswer: 3, xpReward: 20, hint: 'From each corner to the middle of the opposite side' },
  { id: 'geo-sym4', type: 'geometry', difficulty: 'medium', question: 'Which letter has a vertical line of symmetry: A, B, or C?', correctAnswer: 'A', xpReward: 15, hint: 'A can be folded vertically down the middle' },
  { id: 'geo-sym5', type: 'geometry', difficulty: 'hard', question: 'A shape has exactly 2 lines of symmetry. Which flag has this? (Vertical cross vs diagonal)', correctAnswer: 'vertical cross', xpReward: 25, hint: 'The flag with + shape has 2 lines (vertical and horizontal)' },
];

// ==================== DATA & GRAPHS MODULE ====================
export const dataQuestions: MathQuestion[] = [
  // Pictographs
  { id: 'data-pic1', type: 'wordProblem', difficulty: 'easy', question: 'In a pictograph, each star = 2 votes. Wombats have 8 stars, Koalas have 6 stars. How many more votes for Wombats?', correctAnswer: 4, xpReward: 15, hint: '8 stars - 6 stars = 2 stars. 2 × 2 votes = 4 votes' },
  { id: 'data-pic2', type: 'wordProblem', difficulty: 'medium', question: 'Each picture of a book = 5 books. Class A has 4 pictures, Class B has 7 pictures. How many books total?', correctAnswer: 55, xpReward: 20, hint: '4 + 7 = 11 pictures. 11 × 5 = 55 books' },
  { id: 'data-pic3', type: 'wordProblem', difficulty: 'medium', question: 'A pictograph shows goals scored. Each ball = 3 goals. Tom has 5 balls, Sam has 3 balls. How many goals did Tom score?', correctAnswer: 15, xpReward: 20, hint: '5 balls × 3 goals each = 15 goals' },
  
  // Bar Charts
  { id: 'data-bar1', type: 'wordProblem', difficulty: 'easy', question: 'A bar chart shows favorite fruits. Apples = 12, Bananas = 8, Grapes = 15. Which is most popular?', correctAnswer: 'Grapes', xpReward: 15, hint: 'Find the tallest bar = Grapes with 15' },
  { id: 'data-bar2', type: 'wordProblem', difficulty: 'easy', question: 'Using same chart (Apples=12, Bananas=8, Grapes=15), how many more people chose Grapes than Bananas?', correctAnswer: 7, xpReward: 15, hint: '15 - 8 = 7' },
  { id: 'data-bar3', type: 'wordProblem', difficulty: 'medium', question: 'The bar chart shows pets: Dogs=14, Cats=10, Fish=6. How many pets total?', correctAnswer: 30, xpReward: 20, hint: '14 + 10 + 6 = 30' },
  
  // Number Lines
  { id: 'data-line1', type: 'wordProblem', difficulty: 'easy', question: 'On a number line from 0 to 40, what number is halfway between 10 and 20?', correctAnswer: 15, xpReward: 15, hint: 'Halfway between 10 and 20 is (10+20)÷2 = 15' },
  { id: 'data-line2', type: 'wordProblem', difficulty: 'medium', question: 'On a number line from 0 to 40, which arrow points to the number halfway between 5 and 25?', correctAnswer: 15, xpReward: 20, hint: '(5 + 25) ÷ 2 = 15' },
  { id: 'data-line3', type: 'wordProblem', difficulty: 'medium', question: 'Which position is closest to 1/3 on a number line from 0 to 1?', correctAnswer: '0.33', xpReward: 25, hint: '1/3 = 0.333... which is about 0.33' },
];

// ==================== NUMBER PATTERNS & SEQUENCES ====================
export const patternQuestions: MathQuestion[] = [
  // Skip Counting
  { id: 'pat-skip1', type: 'wordProblem', difficulty: 'easy', question: 'Count by 2s: 2, 4, 6, 8, ?', correctAnswer: 10, xpReward: 10, hint: 'Add 2 to 8' },
  { id: 'pat-skip2', type: 'wordProblem', difficulty: 'easy', question: 'Count by 5s: 5, 10, 15, 20, ?', correctAnswer: 25, xpReward: 10, hint: 'Add 5 to 20' },
  { id: 'pat-skip3', type: 'wordProblem', difficulty: 'medium', question: 'Count down by 3s: 24, 21, 18, 15, ?', correctAnswer: 12, xpReward: 15, hint: 'Subtract 3 from 15' },
  { id: 'pat-skip4', type: 'wordProblem', difficulty: 'medium', question: 'Maya is counting down by 2, starting from 15. She writes: 15, 13, 11, 9. What comes next?', correctAnswer: 7, xpReward: 15, hint: '15-2=13, 13-2=11, 11-2=9, 9-2=7' },
  
  // Number Patterns
  { id: 'pat-num1', type: 'wordProblem', difficulty: 'easy', question: 'What comes next? 10, 20, 30, 40, ?', correctAnswer: 50, xpReward: 10, hint: 'Add 10 each time' },
  { id: 'pat-num2', type: 'wordProblem', difficulty: 'medium', question: 'Dana started at 10 and made this pattern: 10, 11, 13, 16, 20, 25. What is the next number?', correctAnswer: 31, xpReward: 25, hint: '+1, +2, +3, +4, +5, +6. 25 + 6 = 31' },
  { id: 'pat-num3', type: 'wordProblem', difficulty: 'medium', question: 'What comes next? 2, 4, 8, 16, ?', correctAnswer: 32, xpReward: 20, hint: 'Multiply by 2 each time. 16 × 2 = 32' },
  { id: 'pat-num4', type: 'wordProblem', difficulty: 'hard', question: 'What is the rule? 3, 6, 12, 24, 48', correctAnswer: 'multiply by 2', xpReward: 25, hint: 'Each number is double the previous one' },
  { id: 'pat-num5', type: 'wordProblem', difficulty: 'hard', question: 'Find the missing number: 11 + ? = 34', correctAnswer: 23, xpReward: 20, hint: '34 - 11 = 23' },
  
  // Grouping (Multiplication as repeated addition)
  { id: 'pat-group1', type: 'wordProblem', difficulty: 'easy', question: '6 groups of 5 pens is the same as how many pens total?', correctAnswer: 30, xpReward: 15, hint: '6 × 5 = 30' },
  { id: 'pat-group2', type: 'wordProblem', difficulty: 'medium', question: '6 groups of 5 pens is the same number as 3 groups of how many?', correctAnswer: 10, xpReward: 20, hint: '6 × 5 = 30. 30 ÷ 3 = 10' },
];

// ==================== MONEY MODULE (Australian Currency) ====================
export const moneyQuestions: MathQuestion[] = [
  { id: 'money1', type: 'wordProblem', difficulty: 'easy', question: 'You have . You spend .50. How much change?', correctAnswer: 2.5, xpReward: 15, hint: '.00 - .50 = .50' },
  { id: 'money2', type: 'wordProblem', difficulty: 'easy', question: 'How many 50c coins make ?', correctAnswer: 4, xpReward: 15, hint: ' = 200c. 200 ÷ 50 = 4' },
  { id: 'money3', type: 'wordProblem', difficulty: 'medium', question: 'A toy costs .90. You pay with . How much change?', correctAnswer: 1.1, xpReward: 20, hint: '.00 - .90 = .10' },
  { id: 'money4', type: 'wordProblem', difficulty: 'medium', question: 'Tony is paid  for washing 3 cars. How many cars to earn ?', correctAnswer: 9, xpReward: 25, hint: ' for 3 cars =  per car.  ÷  = 9 cars' },
  { id: 'money5', type: 'wordProblem', difficulty: 'medium', question: 'Which toy is cheapest: Train , Plane , Car , or Boat ?', correctAnswer: 'Plane', xpReward: 20, hint: ' is the lowest price' },
  { id: 'money6', type: 'wordProblem', difficulty: 'medium', question: 'David spent .90 on a T-shirt and .10 on a hat. Sarah spent .95 on a T-shirt. How much more did David spend?', correctAnswer: 19.05, xpReward: 30, hint: 'David: .90 + .10 = .00. Sarah: .95. Difference:  - .95 = .05' },
  { id: 'money7', type: 'wordProblem', difficulty: 'hard', question: 'You have . You buy 3 items at .50 each. How much left?', correctAnswer: 26.5, xpReward: 30, hint: '3 × .50 = .50.  - .50 = .50' },
];

// ==================== FRACTIONS MODULE ====================
export const fractionQuestions: MathQuestion[] = [
  { id: 'frac1', type: 'wordProblem', difficulty: 'easy', question: 'What fraction is shaded? (3 out of 4 parts shaded)', correctAnswer: '3/4', xpReward: 15, hint: '3 shaded parts out of 4 total parts = 3/4' },
  { id: 'frac2', type: 'wordProblem', difficulty: 'easy', question: 'A pizza is cut into 8 slices. You eat 3. What fraction did you eat?', correctAnswer: '3/8', xpReward: 15, hint: '3 slices eaten out of 8 total = 3/8' },
  { id: 'frac3', type: 'wordProblem', difficulty: 'medium', question: 'A lolly has 5 equal layers: 2 black and 3 white. What fraction is black?', correctAnswer: '2/5', xpReward: 20, hint: '2 black layers out of 5 total layers = 2/5' },
  { id: 'frac4', type: 'wordProblem', difficulty: 'medium', question: 'Which is larger: 1/2 or 1/3?', correctAnswer: '1/2', xpReward: 20, hint: 'When dividing into fewer parts, each part is larger' },
  { id: 'frac5', type: 'wordProblem', difficulty: 'hard', question: 'Which grid shows 1/4 shaded? (4x4 grid with 4 squares shaded)', correctAnswer: '4 squares', xpReward: 25, hint: '1/4 of 16 squares = 4 squares shaded' },
];

// ==================== INFINITE QUESTION SYSTEM ====================
// Import and re-export from questionGenerator
export * from './questionGenerator';


// Reading module
export const readingPassages: any[] = [];
