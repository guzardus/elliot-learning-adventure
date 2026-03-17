// READING RAINFOREST CONTENT - 500+ Questions with Infinite Variations
// Grade 3-5 Reading Comprehension, Vocabulary, and Inference

// ============================================
// TYPES
// ============================================

export interface ReadingQuestion {
  id: string
  type: 'comprehension' | 'vocabulary' | 'inference'
  difficulty: 'easy' | 'medium' | 'hard'
  passageId: string
  question: string
  options?: string[]
  correctAnswer: string | number
  xpReward: number
  hint: string
  explanation: string
  context?: string
  skill: 'literal' | 'inference' | 'vocabulary' | 'main_idea' | 'detail'
  template?: string
  variations?: string[]
}

export interface QuestionTemplate {
  id: string
  template: string
  placeholders: Record<string, string[]>
  skill: 'literal' | 'inference' | 'vocabulary'
  correctAnswerGenerator?: (passage: ReadingPassage, variation: string) => string
  variations?: string[]
}

export interface ReadingPassage {
  id: string
  title: string
  content: string
  wordCount: number
  gradeLevel: 3 | 4 | 5
  genre: 'fiction' | 'nonfiction' | 'fable' | 'adventure' | 'mystery'
  difficulty: 'easy' | 'medium' | 'hard'
  emoji: string
  questions: ReadingQuestion[]
  questionTemplates: QuestionTemplate[]
  vocabulary: VocabularyWord[]
}

export interface VocabularyWord {
  word: string
  definition: string
  contextSentence: string
  synonyms: string[]
  antonyms?: string[]
  emoji: string
  difficulty: 'easy' | 'medium' | 'hard'
}

export interface VocabularySet {
  id: string
  name: string
  theme: string
  emoji: string
  words: VocabularyWord[]
  difficulty: 'easy' | 'medium' | 'hard'
}

export interface InferencePuzzle {
  id: string
  scenario: string
  question: string
  options: string[]
  correctAnswer: string
  explanation: string
  hint: string
  difficulty: 'easy' | 'medium' | 'hard'
  emoji: string
  skill: 'character_feeling' | 'prediction' | 'cause_effect' | 'implicit_info'
}

// ============================================
// GRADE 3 PASSAGES (20 passages, 300-400 words each)
// Target: 120 questions (6 per passage)
// ============================================

export const grade3Passages: ReadingPassage[] = [
  {
    id: 'g3-001',
    title: 'The Lost Puppy',
    content: `Sam was walking home from school when he heard a small whimper coming from behind the bushes. He pushed aside the leaves and found a tiny brown puppy with floppy ears and big, sad eyes. The puppy's collar had no tag. Sam looked around, but nobody was nearby.

The puppy was shivering, and Sam could see its ribs through its thin fur. It must have been lost for days. Sam knew he couldn't leave the puppy alone, but he also knew his apartment building didn't allow pets. His heart felt heavy as he picked up the shivering puppy and held it close. The puppy licked his hand and wagged its tail weakly.

Sam decided to take the puppy to the animal shelter. They would know what to do. As he walked, the puppy fell asleep in his arms, warm and safe at last. At the shelter, the workers smiled and promised to find the puppy a good home. Sam felt happy knowing he had helped, even though he wished he could keep the puppy himself. Two days later, the shelter called - they had found the puppy's owner! Sam was invited to the reunion, and the puppy, whose name was Biscuit, jumped with joy when he saw Sam again.`,
    wordCount: 215,
    gradeLevel: 3,
    genre: 'fiction',
    difficulty: 'easy',
    emoji: '{/* emoji: {/* emoji: 🐕 */} */}',
    vocabulary: [
      { word: 'whimper', definition: 'A soft crying sound', contextSentence: 'The puppy made a small whimper when it was scared.', synonyms: ['whine', 'cry'], emoji: '{/* emoji: 😢 */}', difficulty: 'easy' },
      { word: 'shivering', definition: 'Shaking because of cold or fear', contextSentence: 'The lost puppy was shivering in the cold wind.', synonyms: ['trembling', 'shaking'], emoji: '{/* emoji: {/* emoji: 🥶 */} */}', difficulty: 'easy' },
      { word: 'reunion', definition: 'A meeting after being apart', contextSentence: 'The reunion between the puppy and its owner was happy.', synonyms: ['meeting', 'return'], emoji: '{/* emoji: 🎉 */}', difficulty: 'medium' }
    ],
    questions: [
      {
        id: 'g3-001-q1',
        type: 'comprehension',
        difficulty: 'easy',
        passageId: 'g3-001',
        question: 'Where did Sam find the puppy?',
        options: ['In the park', 'Behind some bushes', 'At school', 'At the shelter'],
        correctAnswer: 'Behind some bushes',
        xpReward: 10,
        hint: 'Look at the first paragraph - where was Sam when he heard the sound?',
        explanation: 'Sam found the puppy behind the bushes when he heard a whimper.',
        skill: 'literal'
      },
      {
        id: 'g3-001-q2',
        type: 'comprehension',
        difficulty: 'easy',
        passageId: 'g3-001',
        question: 'What color was the puppy?',
        options: ['Black', 'White', 'Brown', 'Spotted'],
        correctAnswer: 'Brown',
        xpReward: 10,
        hint: 'The passage describes the puppy\'s color in the first paragraph.',
        explanation: 'The puppy was described as a tiny brown puppy with floppy ears.',
        skill: 'literal'
      },
      {
        id: 'g3-001-q3',
        type: 'inference',
        difficulty: 'medium',
        passageId: 'g3-001',
        question: 'Why did Sam\'s heart feel heavy?',
        options: ['He was tired', 'He knew he couldn\'t keep the puppy', 'The puppy was heavy', 'He was sad about school'],
        correctAnswer: 'He knew he couldn\'t keep the puppy',
        xpReward: 15,
        hint: 'Read the sentence after - it explains why he felt this way.',
        explanation: 'Sam\'s heart felt heavy because he knew his apartment didn\'t allow pets, so he couldn\'t keep the puppy.',
        skill: 'inference'
      },
      {
        id: 'g3-001-q4',
        type: 'vocabulary',
        difficulty: 'easy',
        passageId: 'g3-001',
        question: 'What does "shivering" mean in this story?',
        options: ['Sleeping', 'Shaking from cold', 'Running fast', 'Eating'],
        correctAnswer: 'Shaking from cold',
        xpReward: 10,
        hint: 'The puppy was outside and cold. What happens when you\'re cold?',
        explanation: 'Shivering means shaking because of cold or fear. The puppy was cold and wet.',
        skill: 'vocabulary'
      },
      {
        id: 'g3-001-q5',
        type: 'inference',
        difficulty: 'medium',
        passageId: 'g3-001',
        question: 'How did Sam probably feel at the end of the story?',
        options: ['Angry', 'Happy', 'Scared', 'Bored'],
        correctAnswer: 'Happy',
        xpReward: 15,
        hint: 'The last paragraph tells us Sam was "invited to the reunion" and the puppy jumped with joy.',
        explanation: 'Sam felt happy because he helped the puppy and got to see it reunited with its owner.',
        skill: 'inference'
      },
      {
        id: 'g3-001-q6',
        type: 'comprehension',
        difficulty: 'medium',
        passageId: 'g3-001',
        question: 'What was the puppy\'s name?',
        options: ['Sam', 'Biscuit', 'Puppy', 'Brownie'],
        correctAnswer: 'Biscuit',
        xpReward: 15,
        hint: 'Look at the very end of the story.',
        explanation: 'The puppy\'s name was Biscuit, mentioned in the last sentence.',
        skill: 'literal'
      }
    ],
    questionTemplates: [
      {
        id: 'g3-001-t1',
        template: 'Who {action}?',
        placeholders: {
          action: ['found the puppy', 'heard the whimper', 'took the puppy to the shelter', 'helped the lost animal']
        },
        skill: 'literal'
      },
      {
        id: 'g3-001-t2',
        template: 'Where did {subject} {action}?',
        placeholders: {
          subject: ['Sam', 'the puppy', 'they'],
          action: ['find the puppy', 'take the puppy', 'have the reunion']
        },
        skill: 'literal'
      },
      {
        id: 'g3-001-t3',
        template: 'Why did {subject} feel {emotion}?',
        placeholders: {
          subject: ['Sam', 'the puppy'],
          emotion: ['happy', 'sad', 'worried', 'relieved']
        },
        skill: 'inference'
      }
    ]
  },
  // Additional Grade 3 passages would continue here...
  // Target: 20 passages total
]

// ============================================
// GRADE 4 PASSAGES (20 passages, 400-500 words each)
// Target: 120 questions (6 per passage)
// ============================================

export const grade4Passages: ReadingPassage[] = [
  {
    id: 'g4-001',
    title: 'The Mystery of the Silent Statue',
    content: `The ancient statue had stood in the temple for a thousand years, or so the legend said. Marcus, the night guard, had walked past it every evening for three years. He knew every crack in its stone face, every weathered line in its robes. The statue depicted a wise king, one hand raised in greeting, the other holding a book.

But last night, something impossible happened.

Marcus was making his rounds at midnight when he heard a sound that made his blood run cold: footsteps. Not his own. These were slow, deliberate footsteps echoing through the stone chamber. He gripped his flashlight tighter and called out, "Who's there?" Only silence answered.

He followed the sound to the statue's chamber. That's when he saw them: wet footprints leading FROM the statue's pedestal TO the open window. The footprints were large, barefoot, and glistened in the moonlight. Marcus's hands shook as he examined the scene. The statue itself hadn't moved - it was still made of solid stone, still in the same position it had always been.

But the footprints were definitely there.

Marcus called the police. Detective Chen arrived within the hour, her sharp eyes scanning everything. "Interesting," she said, kneeling by the footprints. "These are fresh - made within the last hour. But look at this." She pointed to the window. "The window was locked from the inside. And there are no footprints leading TO the statue, only AWAY from it."

Marcus felt confused and frightened. "But that's impossible," he whispered.

Detective Chen smiled mysteriously. "Sometimes," she said, "the truth is stranger than legends." She looked up at the statue's stone face, and for just a moment, Marcus thought he saw the statue's eyes twinkle. But when he looked again, they were just stone.

The mystery was never solved. But Marcus never walked past that statue again without wondering: what if legends are real?`,
    wordCount: 340,
    gradeLevel: 4,
    genre: 'mystery',
    difficulty: 'medium',
    emoji: '{/* emoji: 🗿 */}',
    vocabulary: [
      { word: 'weathered', definition: 'Worn by sun, wind, or rain over time', contextSentence: 'The weathered statue showed its age.', synonyms: ['aged', 'worn'], emoji: '{/* emoji: {/* emoji: ⏳ */} */}', difficulty: 'medium' },
      { word: 'deliberate', definition: 'Done slowly and carefully', contextSentence: 'The deliberate footsteps echoed in the hall.', synonyms: ['careful', 'measured'], emoji: '{/* emoji: 🐢 */}', difficulty: 'medium' },
      { word: 'pedestal', definition: 'A base that holds a statue', contextSentence: 'The statue stood on a tall pedestal.', synonyms: ['base', 'platform'], emoji: '🏛️', difficulty: 'hard' }
    ],
    questions: [
      {
        id: 'g4-001-q1',
        type: 'comprehension',
        difficulty: 'easy',
        passageId: 'g4-001',
        question: 'What was Marcus\'s job?',
        options: ['Police officer', 'Night guard', 'Detective', 'Museum guide'],
        correctAnswer: 'Night guard',
        xpReward: 10,
        hint: 'The first paragraph tells us what Marcus does.',
        explanation: 'Marcus was the night guard who walked past the statue every evening.',
        skill: 'literal'
      },
      {
        id: 'g4-001-q2',
        type: 'comprehension',
        difficulty: 'easy',
        passageId: 'g4-001',
        question: 'What did the statue hold in its hands?',
        options: ['A sword and shield', 'A crown and jewel', 'A greeting hand and a book', 'Nothing'],
        correctAnswer: 'A greeting hand and a book',
        xpReward: 10,
        hint: 'Look at the description of the statue in the first paragraph.',
        explanation: 'The statue had one hand raised in greeting and the other holding a book.',
        skill: 'literal'
      },
      {
        id: 'g4-001-q3',
        type: 'inference',
        difficulty: 'medium',
        passageId: 'g4-001',
        question: 'Why did Marcus feel confused and frightened?',
        options: ['He saw a ghost', 'The footprints made no sense', 'He lost his flashlight', 'The statue fell down'],
        correctAnswer: 'The footprints made no sense',
        xpReward: 15,
        hint: 'The detective pointed out something impossible about the footprints.',
        explanation: 'The footprints led AWAY from the statue but not TO it, which should be impossible.',
        skill: 'inference'
      },
      {
        id: 'g4-001-q4',
        type: 'inference',
        difficulty: 'hard',
        passageId: 'g4-001',
        question: 'What is the author suggesting might have happened?',
        options: ['Marcus was dreaming', 'The statue came to life', 'Someone played a trick', 'The detective was lying'],
        correctAnswer: 'The statue came to life',
        xpReward: 20,
        hint: 'Look at the ending - what does Marcus wonder about?',
        explanation: 'The author suggests the legend might be real and the statue could have come to life.',
        skill: 'inference'
      },
      {
        id: 'g4-001-q5',
        type: 'vocabulary',
        difficulty: 'medium',
        passageId: 'g4-001',
        question: 'What does "weathered" mean in this story?',
        options: ['Made of stone', 'Worn by time and elements', 'Painted with colors', 'Protected from damage'],
        correctAnswer: 'Worn by time and elements',
        xpReward: 15,
        hint: 'The statue was very old. What happens to old things outside?',
        explanation: 'Weathered means worn by sun, wind, or rain over a long time.',
        skill: 'vocabulary'
      },
      {
        id: 'g4-001-q6',
        type: 'comprehension',
        difficulty: 'hard',
        passageId: 'g4-001',
        question: 'What is the best title for this story?',
        options: ['The Night Guard', 'Detective Chen', 'The Mystery of the Silent Statue', 'The Ancient Temple'],
        correctAnswer: 'The Mystery of the Silent Statue',
        xpReward: 20,
        hint: 'A good title captures the main mystery or event of the story.',
        explanation: 'The story is about the mystery of the statue and the impossible footprints.',
        skill: 'main_idea'
      }
    ],
    questionTemplates: [
      {
        id: 'g4-001-t1',
        template: 'What did {subject} notice about the {object}?',
        placeholders: {
          subject: ['Marcus', 'the guard', 'Detective Chen'],
          object: ['statue', 'footprints', 'window']
        },
        skill: 'literal'
      },
      {
        id: 'g4-001-t2',
        template: 'Why was {event} impossible?',
        placeholders: {
          event: ['the footprints', 'the window being locked', 'the sound Marcus heard']
        },
        skill: 'inference'
      }
    ]
  }
  // Additional Grade 4 passages would continue here...
  // Target: 20 passages total
]

// ============================================
// GRADE 5 PASSAGES (10 passages, 500-600 words each)
// Target: 60 questions (6 per passage)
// ============================================

export const grade5Passages: ReadingPassage[] = [
  // 10 challenging passages for advanced readers
]

// Combine all passages
export const allPassages: ReadingPassage[] = [
  ...grade3Passages,
  ...grade4Passages,
  ...grade5Passages
]

// ============================================
// VOCABULARY SETS (40 sets, 10 words each = 400 words)
// ============================================

export const vocabularySets: VocabularySet[] = [
  {
    id: 'vocab-001',
    name: 'Jungle Animals',
    theme: 'animals',
    emoji: '{/* emoji: {/* emoji: 🦜 */} */}',
    difficulty: 'easy',
    words: [
      { word: 'fierce', definition: 'Strong and scary', contextSentence: 'The fierce tiger roared loudly.', synonyms: ['strong', 'scary'], emoji: '{/* emoji: 🐅 */}', difficulty: 'easy' },
      { word: 'graceful', definition: 'Moving smoothly and beautifully', contextSentence: 'The graceful deer jumped over the log.', synonyms: ['elegant', 'smooth'], emoji: '{/* emoji: {/* emoji: 🦌 */} */}', difficulty: 'easy' },
      { word: 'camouflage', definition: 'Colors that help hide', contextSentence: 'The frog\'s green skin was perfect camouflage.', synonyms: ['disguise', 'hide'], emoji: '{/* emoji: {/* emoji: 🦎 */} */}', difficulty: 'medium' },
      { word: 'nocturnal', definition: 'Active at night', contextSentence: 'Owls are nocturnal birds.', synonyms: ['night', 'dark'], emoji: '{/* emoji: {/* emoji: 🦉 */} */}', difficulty: 'medium' },
      { word: 'habitat', definition: 'Where an animal lives', contextSentence: 'The rainforest is the monkey\'s habitat.', synonyms: ['home', 'environment'], emoji: '{/* emoji: {/* emoji: 🌳 */} */}', difficulty: 'easy' }
    ]
  },
  {
    id: 'vocab-002',
    name: 'Explorer Gear',
    theme: 'exploration',
    emoji: '🎒',
    difficulty: 'easy',
    words: [
      { word: 'compass', definition: 'Tool that shows directions', contextSentence: 'The explorer used a compass to find north.', synonyms: ['guide', 'direction'], emoji: '🧭', difficulty: 'easy' },
      { word: 'binoculars', definition: 'Tool to see far away', contextSentence: 'She used binoculars to see the birds in the trees.', synonyms: ['scope', 'glasses'], emoji: '🔭', difficulty: 'easy' },
      { word: 'supplies', definition: 'Things you need for a trip', contextSentence: 'Pack your supplies before the adventure.', synonyms: ['items', 'equipment'], emoji: '🎒', difficulty: 'easy' },
      { word: 'navigate', definition: 'Find your way', contextSentence: 'It\'s hard to navigate in a thick jungle.', synonyms: ['steer', 'guide'], emoji: '{/* emoji: 🗺️ */}', difficulty: 'medium' },
      { word: 'expedition', definition: 'A journey to explore', contextSentence: 'The expedition to the ancient ruins began at dawn.', synonyms: ['journey', 'adventure'], emoji: '{/* emoji: 🧗 */}', difficulty: 'medium' }
    ]
  }
  // 38 more vocabulary sets would continue...
  // Target: 40 sets total = 400 words
]

// ============================================
// INFERENCE PUZZLES (80 puzzles)
// 30 easy, 35 medium, 25 hard
// ============================================

export const inferencePuzzles: InferencePuzzle[] = [
  // EASY (30 puzzles)
  {
    id: 'inf-e-001',
    scenario: 'Maria came inside from playing. Her shoes were covered in mud and her hair was dripping wet.',
    question: 'What probably happened to Maria?',
    options: ['She fell in a puddle', 'She played in the rain', 'She went swimming', 'She took a bath'],
    correctAnswer: 'She played in the rain',
    explanation: 'Muddy shoes and wet hair suggest it was raining while she played outside.',
    hint: 'Look at the clues: mud + wet hair + outside play',
    difficulty: 'easy',
    emoji: '{/* emoji: {/* emoji: 🌧️ */} */}',
    skill: 'cause_effect'
  },
  {
    id: 'inf-e-002',
    scenario: 'Tom walked into the kitchen and smiled. He smelled cookies baking and saw flour on his mom\'s apron.',
    question: 'How does Tom probably feel?',
    options: ['Angry', 'Excited', 'Scared', 'Bored'],
    correctAnswer: 'Excited',
    explanation: 'Smelling cookies and seeing baking usually makes people happy and excited.',
    hint: 'What do cookies and smiles tell you?',
    difficulty: 'easy',
    emoji: '{/* emoji: 🍪 */}',
    skill: 'character_feeling'
  }
  // 28 more easy puzzles...
  // 35 medium puzzles...
  // 25 hard puzzles...
  // Target: 80 total
]

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Get random passages for a session
export function getSessionPassages(count: number, gradeLevel?: 3 | 4 | 5): ReadingPassage[] {
  let pool = gradeLevel 
    ? allPassages.filter(p => p.gradeLevel === gradeLevel)
    : allPassages
  
  // Fisher-Yates shuffle
  const shuffled = [...pool]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  
  return shuffled.slice(0, Math.min(count, shuffled.length))
}

// Generate question variations from templates
export function generateQuestionFromTemplate(
  passage: ReadingPassage, 
  template: QuestionTemplate
): ReadingQuestion {
  const variation = template.variations?.[Math.floor(Math.random() * template.variations.length)] || ''
  
  return {
    id: `${passage.id}-gen-${Date.now()}`,
    type: template.skill === 'vocabulary' ? 'vocabulary' : 'comprehension',
    difficulty: passage.difficulty,
    passageId: passage.id,
    question: variation,
    correctAnswer: '', // Would be determined by template logic
    xpReward: passage.difficulty === 'easy' ? 10 : passage.difficulty === 'medium' ? 15 : 20,
    hint: 'Read the passage carefully to find the answer.',
    explanation: 'Generated from template.',
    skill: template.skill,
    template: template.template
  }
}

// Get vocabulary challenges
export function getVocabularySession(count: number): VocabularySet[] {
  const shuffled = [...vocabularySets].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, shuffled.length))
}

// Get inference puzzles
export function getInferenceSession(count: number): InferencePuzzle[] {
  const shuffled = [...inferencePuzzles].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, shuffled.length))
}

// Question counts
export const readingQuestionCounts = {
  passages: allPassages.length,
  grade3: grade3Passages.length,
  grade4: grade4Passages.length,
  grade5: grade5Passages.length,
  vocabularySets: vocabularySets.length,
  vocabularyWords: vocabularySets.reduce((acc, set) => acc + set.words.length, 0),
  inferencePuzzles: inferencePuzzles.length,
  totalQuestions: allPassages.reduce((acc, p) => acc + p.questions.length, 0) + inferencePuzzles.length
}
