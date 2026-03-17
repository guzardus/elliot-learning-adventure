

// ============================================
// CONTENT EXPANSION
// ============================================

// Note: Full expanded content is in readingContentExpansion.ts
// Import and use completePassages for full 500+ question set

// For now, use base content (will be expanded when import is added)
export const completePassages = allPassages
export const completeVocabularySets = vocabularySets
export const completeInferencePuzzles = inferencePuzzles

// Target counts for Phase 3 completion:
// Passages: 50 (20 Grade 3, 20 Grade 4, 10 Grade 5)
// Questions: 500+ (with template variations = unlimited)
// Vocabulary: 40 sets × 10 words = 400 words
// Inference Puzzles: 80 total

export const phase3TargetCounts = {
  targetPassages: 50,
  targetQuestions: 500,
  targetVocabularyWords: 400,
  targetInferencePuzzles: 80,
  currentPassages: allPassages.length,
  currentQuestions: allPassages.reduce((acc, p) => acc + p.questions.length, 0) + inferencePuzzles.length,
  currentVocabularyWords: vocabularySets.reduce((acc, set) => acc + set.words.length, 0),
  currentInferencePuzzles: inferencePuzzles.length
}
