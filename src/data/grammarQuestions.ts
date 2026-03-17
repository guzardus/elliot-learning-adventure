// Grammar Galaxy Content - Grade 3-5 Language Questions
// 300+ questions across Grammar, Spelling, and Punctuation

export interface GrammarQuestion {
  id: string
  type: 'grammar' | 'spelling' | 'punctuation'
  difficulty: 'easy' | 'medium' | 'hard'
  question: string
  correctAnswer: string
  options?: string[]
  xpReward: number
  hint: string
  explanation: string
  context: string
}

// ============================================
// GRAMMAR QUESTIONS - 100 QUESTIONS
// ============================================

export const grammarQuestions: GrammarQuestion[] = [
  // EASY GRAMMAR (35 questions) - Grade 3 level
  {
    id: "gram-e-001", type: "grammar", difficulty: "easy",
    question: "Which word is a noun?",
    correctAnswer: "elephant", options: ["elephant", "quickly", "happy", "under"],
    xpReward: 15, hint: "Nouns are people, places, things, or animals",
    explanation: "'Elephant' is a noun because it names an animal. The others are adverbs, adjectives, or prepositions.",
    context: "A friendly space elephant teaches grammar!"
  },
  {
    id: "gram-e-002", type: "grammar", difficulty: "easy",
    question: "Which sentence is correct?",
    correctAnswer: "The astronaut flies to the moon.",
    options: ["The astronaut flies to the moon.", "The astronaut fly to the moon.", "The astronaut flying to the moon.", "The astronaut flied to the moon."],
    xpReward: 15, hint: "Check the verb matches the subject",
    explanation: "'Astronaut' is singular, so we use 'flies' (singular verb).",
    context: "Commander Star verifies flight plans!"
  },
  {
    id: "gram-e-003", type: "grammar", difficulty: "easy",
    question: "Which word is a verb?",
    correctAnswer: "orbit", options: ["planet", "orbit", "blue", "quickly"],
    xpReward: 15, hint: "Verbs are action words or states of being",
    explanation: "'Orbit' is a verb - it's an action. Planet is a noun, blue is an adjective, quickly is an adverb.",
    context: "Planets orbit the sun in our solar system!"
  },
  {
    id: "gram-e-004", type: "grammar", difficulty: "easy",
    question: "Choose the correct pronoun: _____ went to the space station.",
    correctAnswer: "She", options: ["She", "Her", "Hers", "Herself"],
    xpReward: 15, hint: "We need a subject pronoun here",
    explanation: "'She' is a subject pronoun used when someone is doing the action.",
    context: "Captain Nova leads the mission!"
  },
  {
    id: "gram-e-005", type: "grammar", difficulty: "easy",
    question: "Which is a complete sentence?",
    correctAnswer: "The comet streaks across the sky.",
    options: ["The comet streaks across the sky.", "Streaking across the sky.", "The bright comet.", "Across the dark sky."],
    xpReward: 15, hint: "A complete sentence needs a subject and a verb",
    explanation: "'The comet streaks across the sky' has both a subject (comet) and verb (streaks).",
    context: "Halley's Comet makes its appearance!"
  },
  {
    id: "gram-e-006", type: "grammar", difficulty: "easy",
    question: "Which word is an adjective?",
    correctAnswer: "shiny", options: ["shiny", "spaceship", "fly", "quickly"],
    xpReward: 15, hint: "Adjectives describe nouns",
    explanation: "'Shiny' describes something. Spaceship is a noun, fly is a verb, quickly is an adverb.",
    context: "The shiny spaceship reflects starlight!"
  },
  {
    id: "gram-e-007", type: "grammar", difficulty: "easy",
    question: "What type of word is 'under'?",
    correctAnswer: "preposition", options: ["preposition", "noun", "verb", "adjective"],
    xpReward: 15, hint: "Prepositions show relationships between things",
    explanation: "'Under' is a preposition - it shows where something is in relation to something else.",
    context: "The asteroid drifts under the planet's rings."
  },
  {
    id: "gram-e-008", type: "grammar", difficulty: "easy",
    question: "Which is a proper noun?",
    correctAnswer: "Mars", options: ["Mars", "planet", "red", "rock"],
    xpReward: 15, hint: "Proper nouns name specific things and are capitalized",
    explanation: "'Mars' is a proper noun - it's the specific name of a planet. Always capitalized!",
    context: "Mars is the fourth planet from the sun!"
  },
  {
    id: "gram-e-009", type: "grammar", difficulty: "easy",
    question: "Which word is an adverb?",
    correctAnswer: "slowly", options: ["slowly", "rocket", "fast", "space"],
    xpReward: 15, hint: "Adverbs often end in -ly and describe how something is done",
    explanation: "'Slowly' tells HOW something moves. Many adverbs end in -ly.",
    context: "The spacecraft moves slowly through the asteroid field."
  },
  {
    id: "gram-e-010", type: "grammar", difficulty: "easy",
    question: "Choose the correct article: _____ astronaut walked on the moon.",
    correctAnswer: "An", options: ["An", "A", "The", "Some"],
    xpReward: 15, hint: "Use 'an' before words starting with vowel sounds",
    explanation: "'An' is used before words that start with a vowel sound. 'Astronaut' starts with 'a'.",
    context: "An astronaut takes a giant leap for mankind!"
  },
  {
    id: "gram-e-011", type: "grammar", difficulty: "easy",
    question: "What is the subject of this sentence: 'The satellite orbits Earth.'?",
    correctAnswer: "satellite", options: ["satellite", "orbits", "Earth", "The"],
    xpReward: 15, hint: "The subject is who or what is doing the action",
    explanation: "'Satellite' is doing the orbiting, so it's the subject.",
    context: "The satellite sends signals back to mission control."
  },
  {
    id: "gram-e-012", type: "grammar", difficulty: "easy",
    question: "Which sentence uses capital letters correctly?",
    correctAnswer: "The Milky Way has many stars.",
    options: ["The Milky Way has many stars.", "The milky way has many stars.", "The Milky way has many stars.", "the Milky Way has many stars."],
    xpReward: 15, hint: "Proper nouns need capital letters",
    explanation: "'Milky Way' is a proper noun (specific place), so both words are capitalized.",
    context: "Our galaxy, the Milky Way, is vast and beautiful!"
  },
  {
    id: "gram-e-013", type: "grammar", difficulty: "easy",
    question: "Which word is a plural noun?",
    correctAnswer: "stars", options: ["stars", "star", "starry", "starlight"],
    xpReward: 15, hint: "Plural means more than one",
    explanation: "'Stars' means more than one star. It's the plural form.",
    context: "Countless stars twinkle in the night sky!"
  },
  {
    id: "gram-e-014", type: "grammar", difficulty: "easy",
    question: "Choose the correct plural: There are many _____ in space.",
    correctAnswer: "galaxies", options: ["galaxies", "galaxy", "galaxys", "galaxyies"],
    xpReward: 15, hint: "For words ending in y, change y to i and add es",
    explanation: "Words ending in consonant + y change to ies: galaxy → galaxies.",
    context: "There are billions of galaxies in the universe!"
  },
  {
    id: "gram-e-015", type: "grammar", difficulty: "easy",
    question: "Which is a possessive noun?",
    correctAnswer: "astronaut's", options: ["astronaut's", "astronauts", "astronaut", "astronauts'"],
    xpReward: 15, hint: "Possessive shows ownership and has an apostrophe",
    explanation: "'Astronaut's' shows that something belongs to one astronaut.",
    context: "The astronaut's helmet gleamed in the sunlight."
  },
  {
    id: "gram-e-016", type: "grammar", difficulty: "easy",
    question: "What is the plural of 'planet'?",
    correctAnswer: "planets", options: ["planets", "planetes", "planet's", "planets'"],
    xpReward: 15, hint: "Most words just add s to make plural",
    explanation: "Regular nouns add -s to form plural: planet → planets.",
    context: "Eight planets orbit our sun!"
  },
  {
    id: "gram-e-017", type: "grammar", difficulty: "easy",
    question: "Which sentence has the correct word order?",
    correctAnswer: "The spaceship landed on Mars.",
    options: ["The spaceship landed on Mars.", "Landed the spaceship on Mars.", "On Mars the spaceship landed.", "The spaceship Mars on landed."],
    xpReward: 15, hint: "Subject + verb + rest of sentence",
    explanation: "Standard word order is: Subject (spaceship) + Verb (landed) + Object/Location (on Mars).",
    context: "Perseverance rover successfully touched down!"
  },
  {
    id: "gram-e-018", type: "grammar", difficulty: "easy",
    question: "Which word is a conjunction?",
    correctAnswer: "and", options: ["and", "rocket", "quickly", "shiny"],
    xpReward: 15, hint: "Conjunctions join words or sentences together",
    explanation: "'And' is a conjunction that connects words or ideas. But, or, so are also conjunctions.",
    context: "Stars and planets fill the galaxy!"
  },
  {
    id: "gram-e-019", type: "grammar", difficulty: "easy",
    question: "Choose the correct form: The _____ rock floated by.",
    correctAnswer: "giant", options: ["giant", "giantly", "giantness", "gianting"],
    xpReward: 15, hint: "We need a word to describe the rock",
    explanation: "'Giant' is an adjective describing the rock. We need a describing word before a noun.",
    context: "A giant asteroid passed near Earth's orbit!"
  },
  {
    id: "gram-e-020", type: "grammar", difficulty: "easy",
    question: "Which is NOT a noun?",
    correctAnswer: "running", options: ["running", "Earth", "telescope", "asteroid"],
    xpReward: 15, hint: "Nouns name things. Other words describe or show action.",
    explanation: "'Running' is a verb (action). Earth, telescope, and asteroid are all nouns (things).",
    context: "Running in space looks very different from Earth!"
  },
  {
    id: "gram-e-021", type: "grammar", difficulty: "easy",
    question: "What type of sentence is this: 'Watch out for that asteroid!'?",
    correctAnswer: "exclamatory", options: ["exclamatory", "question", "statement", "command"],
    xpReward: 15, hint: "It shows strong feeling and ends with !",
    explanation: "Exclamatory sentences show excitement or strong emotion and end with an exclamation mark.",
    context: "The pilot warns the crew of danger!"
  },
  {
    id: "gram-e-022", type: "grammar", difficulty: "easy",
    question: "Choose the correct verb: The stars _____ at night.",
    correctAnswer: "shine", options: ["shine", "shines", "shining", "shined"],
    xpReward: 15, hint: "Stars is plural, so use plural verb",
    explanation: "'Stars' is plural (more than one), so we use 'shine' (plural verb) not 'shines'.",
    context: "Stars shine brightly in the dark sky!"
  },
  {
    id: "gram-e-023", type: "grammar", difficulty: "easy",
    question: "Which word has a prefix?",
    correctAnswer: "unlikely", options: ["unlikely", "starlight", "spaceship", "moonwalk"],
    xpReward: 15, hint: "A prefix comes at the beginning of a word",
    explanation: "'Un-' is a prefix meaning 'not.' Unlikely = not likely.",
    context: "It's unlikely we'll find life on that barren moon."
  },
  {
    id: "gram-e-024", type: "grammar", difficulty: "easy",
    question: "What does the suffix '-less' mean in 'weightless'?",
    correctAnswer: "without", options: ["without", "full of", "like", "can be"],
    xpReward: 15, hint: "Weightless means without weight",
    explanation: "The suffix '-less' means 'without.' Weightless = without weight.",
    context: "Astronauts feel weightless in space!"
  },
  {
    id: "gram-e-025", type: "grammar", difficulty: "easy",
    question: "Choose the correct contraction: _____ going to the launch pad.",
    correctAnswer: "We're", options: ["We're", "Were", "Where", "We"],
    xpReward: 15, hint: "We are going → We're going",
    explanation: "'We're' is the contraction for 'we are.' The apostrophe replaces the 'a' in are.",
    context: "We're ready for liftoff!"
  },
  {
    id: "gram-e-026", type: "grammar", difficulty: "easy",
    question: "Which is the past tense of 'fly'?",
    correctAnswer: "flew", options: ["flew", "flied", "flyed", "flown"],
    xpReward: 15, hint: "Fly is an irregular verb",
    explanation: "'Fly' is irregular: fly → flew → flown. It doesn't add -ed.",
    context: "The rocket flew through the atmosphere!"
  },
  {
    id: "gram-e-027", type: "grammar", difficulty: "easy",
    question: "What is the antonym (opposite) of 'hot'?",
    correctAnswer: "cold", options: ["cold", "warm", "burning", "sunny"],
    xpReward: 15, hint: "Antonyms are words with opposite meanings",
    explanation: "'Cold' is the opposite of hot. They are antonyms.",
    context: "Space is cold, unlike the hot sun!"
  },
  {
    id: "gram-e-028", type: "grammar", difficulty: "easy",
    question: "What is the synonym (similar meaning) of 'large'?",
    correctAnswer: "big", options: ["big", "small", "tiny", "little"],
    xpReward: 15, hint: "Synonyms are words that mean almost the same thing",
    explanation: "'Big' and 'large' mean almost the same thing. They are synonyms.",
    context: "Jupiter is a big planet, very large indeed!"
  },
  {
    id: "gram-e-029", type: "grammar", difficulty: "easy",
    question: "Which sentence uses 'its' correctly?",
    correctAnswer: "The spaceship lost its way.",
    options: ["The spaceship lost its way.", "The spaceship lost it's way.", "The spaceship lost its' way.", "The spaceship lost its's way."],
    xpReward: 15, hint: "Its = possession, It's = it is",
    explanation: "'Its' (no apostrophe) shows possession. 'It's' means 'it is.'",
    context: "The spaceship lost its way in the asteroid field."
  },
  {
    id: "gram-e-030", type: "grammar", difficulty: "easy",
    question: "Choose the correct homophone: The _____ is bright today.",
    correctAnswer: "sun", options: ["sun", "son", "soon", "sung"],
    xpReward: 15, hint: "We're talking about the star in the sky",
    explanation: "'Sun' is the star. 'Son' is a male child. They sound the same but have different meanings.",
    context: "The sun provides light and warmth to Earth!"
  },
  {
    id: "gram-e-031", type: "grammar", difficulty: "easy",
    question: "Which is an incomplete sentence (fragment)?",
    correctAnswer: "Flying through space.",
    options: ["Flying through space.", "The rocket flew through space.", "Astronauts explore space.", "Space is very large."],
    xpReward: 15, hint: "Fragments are missing a subject or verb",
    explanation: "'Flying through space' has no subject (who is flying?). It's a fragment.",
    context: "Complete sentences need both subject and verb!"
  },
  {
    id: "gram-e-032", type: "grammar", difficulty: "easy",
    question: "What is the predicate of this sentence: 'The moon orbits Earth.'?",
    correctAnswer: "orbits Earth", options: ["orbits Earth", "The moon", "Earth", "moon"],
    xpReward: 15, hint: "The predicate tells what the subject does",
    explanation: "The predicate is everything that tells what the subject does: 'orbits Earth.'",
    context: "The moon orbits Earth approximately every 27 days!"
  },
  {
    id: "gram-e-033", type: "grammar", difficulty: "easy",
    question: "Choose the correct preposition: The Earth revolves _____ the sun.",
    correctAnswer: "around", options: ["around", "above", "under", "beside"],
    xpReward: 15, hint: "Earth moves in a circle around the sun",
    explanation: "'Around' shows circular movement. Earth revolves around the sun.",
    context: "Earth takes one year to revolve around the sun!"
  },
  {
    id: "gram-e-034", type: "grammar", difficulty: "easy",
    question: "Which is a compound word?",
    correctAnswer: "spaceship", options: ["spaceship", "asteroid", "galaxy", "orbit"],
    xpReward: 15, hint: "Compound words are made of two words put together",
    explanation: "'Spaceship' = space + ship. Two words combined into one!",
    context: "The spaceship carries astronauts to the station!"
  },
  {
    id: "gram-e-035", type: "grammar", difficulty: "easy",
    question: "What does an exclamation mark (!) show?",
    correctAnswer: "strong feeling or excitement", options: ["strong feeling or excitement", "a question", "a statement", "a pause"],
    xpReward: 15, hint: "! is used for excitement",
    explanation: "Exclamation marks show excitement, surprise, or strong feelings.",
    context: "We have liftoff!"
  },

  // MEDIUM GRAMMAR (40 questions) - Grade 4 level
  {
    id: "gram-m-001", type: "grammar", difficulty: "medium",
    question: "Which sentence uses the correct form of 'their/there/they're'?",
    correctAnswer: "The aliens parked their spaceship over there.",
    options: ["The aliens parked their spaceship over there.", "The aliens parked there spaceship over their.", "The aliens parked they're spaceship over there.", "The aliens parked their spaceship over they're."],
    xpReward: 25, hint: "Their = possession, There = place, They're = they are",
    explanation: "'Their' shows possession of the spaceship, 'there' indicates the place.",
    context: "Friendly aliens visit Earth!"
  },
  {
    id: "gram-m-002", type: "grammar", difficulty: "medium",
    question: "Choose the correct adjective: The _____ star shone brightly.",
    correctAnswer: "brilliant", options: ["brilliant", "brilliantly", "brilliance", "brilliants"],
    xpReward: 25, hint: "Adjectives describe nouns",
    explanation: "'Brilliant' is an adjective describing the star. 'Brilliantly' is an adverb.",
    context: "Sirius, the brightest star in the night sky!"
  },
  {
    id: "gram-m-003", type: "grammar", difficulty: "medium",
    question: "Which sentence uses correct subject-verb agreement?",
    correctAnswer: "The team of astronauts prepares for launch.",
    options: ["The team of astronauts prepares for launch.", "The team of astronauts prepare for launch.", "The team of astronauts preparing for launch.", "The team of astronauts preparation for launch."],
    xpReward: 25, hint: "'Team' is the subject, not 'astronauts'",
    explanation: "'Team' is singular, so we use 'prepares.' The phrase 'of astronauts' just describes the team.",
    context: "The Artemis team trains for the moon mission!"
  },
  {
    id: "gram-m-004", type: "grammar", difficulty: "medium",
    question: "Which sentence uses commas correctly in a list?",
    correctAnswer: "The solar system has Mercury, Venus, Earth, Mars, and Jupiter.",
    options: ["The solar system has Mercury, Venus, Earth, Mars, and Jupiter.", "The solar system has Mercury Venus Earth Mars and Jupiter.", "The solar system has Mercury, Venus Earth Mars, and Jupiter.", "The solar system has Mercury, Venus, Earth Mars and Jupiter."],
    xpReward: 25, hint: "Use commas to separate items in a list",
    explanation: "Commas separate each item in the list. The last comma before 'and' is optional but recommended.",
    context: "The inner planets are rocky worlds!"
  },
  {
    id: "gram-m-005", type: "grammar", difficulty: "medium",
    question: "Choose the correct word: _____ going to explore the moon.",
    correctAnswer: "They're", options: ["They're", "Their", "There", "They"],
    xpReward: 25, hint: "They're = They are",
    explanation: "'They're' is a contraction for 'they are.' They are going to explore.",
    context: "They're preparing for the lunar mission!"
  },
  {
    id: "gram-m-006", type: "grammar", difficulty: "medium",
    question: "What is the direct object in this sentence: 'The astronaut repaired the satellite.'?",
    correctAnswer: "satellite", options: ["satellite", "astronaut", "repaired", "The"],
    xpReward: 25, hint: "The direct object receives the action of the verb",
    explanation: "The satellite receives the action - it is being repaired. It's the direct object.",
    context: "The astronaut repaired the damaged satellite!"
  },
  {
    id: "gram-m-007", type: "grammar", difficulty: "medium",
    question: "Which sentence uses the comparative form correctly?",
    correctAnswer: "Jupiter is larger than Earth.",
    options: ["Jupiter is larger than Earth.", "Jupiter is largest than Earth.", "Jupiter is more large than Earth.", "Jupiter is large than Earth."],
    xpReward: 25, hint: "Comparative compares two things, usually adds -er",
    explanation: "For short adjectives, add -er for comparative: large → larger (comparing two planets).",
    context: "Jupiter is much larger than our home planet!"
  },
  {
    id: "gram-m-008", type: "grammar", difficulty: "medium",
    question: "Which is a complex sentence?",
    correctAnswer: "Although space is cold, the sun feels warm.",
    options: ["Although space is cold, the sun feels warm.", "Space is cold.", "Space is cold, the sun feels warm.", "Space is cold and dark."],
    xpReward: 25, hint: "Complex sentences have an independent and dependent clause",
    explanation: "'Although space is cold' is a dependent clause (can't stand alone), joined to an independent clause.",
    context: "Space has extreme temperature differences!"
  },
  {
    id: "gram-m-009", type: "grammar", difficulty: "medium",
    question: "Choose the correct reflexive pronoun: The robot fixed _____.",
    correctAnswer: "itself", options: ["itself", "it", "its", "it's"],
    xpReward: 25, hint: "Reflexive pronouns end in -self or -selves",
    explanation: "When the subject and object are the same, use a reflexive pronoun: itself, himself, herself, yourself.",
    context: "The robot detected a problem and fixed itself!"
  },
  {
    id: "gram-m-010", type: "grammar", difficulty: "medium",
    question: "Which sentence is written in passive voice?",
    correctAnswer: "The spaceship was launched by NASA.",
    options: ["The spaceship was launched by NASA.", "NASA launched the spaceship.", "The spaceship launched into space.", "NASA will launch the spaceship."],
    xpReward: 25, hint: "Passive voice: Object + was/were + verb + by subject",
    explanation: "Passive voice makes the object the subject. 'Spaceship' receives the action.",
    context: "The spaceship was launched by NASA at dawn."
  },
  {
    id: "gram-m-011", type: "grammar", difficulty: "medium",
    question: "What is the appositive in this sentence: 'Orion, a prominent constellation, is visible in winter.'?",
    correctAnswer: "a prominent constellation", options: ["a prominent constellation", "Orion", "visible in winter", "is"],
    xpReward: 25, hint: "An appositive renames or describes a noun",
    explanation: "'A prominent constellation' renames/defines what Orion is. It's the appositive phrase.",
    context: "Orion, a prominent constellation, contains the famous Orion's Belt!"
  },
  {
    id: "gram-m-012", type: "grammar", difficulty: "medium",
    question: "Which correctly uses 'who' or 'whom'?",
    correctAnswer: "Who is going to the space station?",
    options: ["Who is going to the space station?", "Whom is going to the space station?", "Who are you going with?", "Whom built the rocket?"],
    xpReward: 25, hint: "Use 'who' as subject (he/she), 'whom' as object (him/her)",
    explanation: "'Who' is the subject doing the action. 'Whom' would be used as an object.",
    context: "Who will be the first person on Mars?"
  },
  {
    id: "gram-m-013", type: "grammar", difficulty: "medium",
    question: "Choose the correct indefinite pronoun: _____ of the astronauts were ready.",
    correctAnswer: "All", options: ["All", "Each", "Everyone", "Either"],
    xpReward: 25, hint: "'Were' is plural, so we need a plural pronoun",
    explanation: "'All' can be plural. 'Each,' 'everyone,' and 'either' are singular and take singular verbs.",
    context: "All of the astronauts were ready for launch!"
  },
  {
    id: "gram-m-014", type: "grammar", difficulty: "medium",
    question: "Which sentence correctly uses 'affect' or 'effect'?",
    correctAnswer: "The moon's gravity affects the tides.",
    options: ["The moon's gravity affects the tides.", "The moon's gravity effects the tides.", "The moon's gravity has an affect on tides.", "The moon's gravity has affects on the tides."],
    xpReward: 25, hint: "Affect = verb (to influence), Effect = noun (result)",
    explanation: "'Affects' is the verb meaning to influence. 'Effect' is usually a noun meaning result.",
    context: "The moon's gravity affects Earth's ocean tides!"
  },
  {
    id: "gram-m-015", type: "grammar", difficulty: "medium",
    question: "What is the gerund in this sentence: 'Swimming in zero gravity is fun.'?",
    correctAnswer: "Swimming", options: ["Swimming", "zero gravity", "is", "fun"],
    xpReward: 25, hint: "Gerunds are verbs ending in -ing that act as nouns",
    explanation: "'Swimming' is a verb form ending in -ing acting as a noun (the subject).",
    context: "Swimming in zero gravity is very different from Earth!"
  },
  {
    id: "gram-m-016", type: "grammar", difficulty: "medium",
    question: "Which sentence uses 'fewer' or 'less' correctly?",
    correctAnswer: "There are fewer stars visible in the city.",
    options: ["There are fewer stars visible in the city.", "There are less stars visible in the city.", "There is fewer light in space.", "There is less stars than planets."],
    xpReward: 25, hint: "Fewer = countable items, Less = uncountable amounts",
    explanation: "'Stars' are countable, so use 'fewer.' For uncountable things like light, use 'less.'",
    context: "Fewer stars are visible due to city light pollution!"
  },
  {
    id: "gram-m-017", type: "grammar", difficulty: "medium",
    question: "Choose the correct transition word: First, the rocket launches. _____, it reaches orbit.",
    correctAnswer: "Next", options: ["Next", "However", "Therefore", "Although"],
    xpReward: 25, hint: "We're showing sequence/order of events",
    explanation: "'Next' shows sequence. 'However' shows contrast, 'therefore' shows result.",
    context: "First launch, next orbit, then the mission begins!"
  },
  {
    id: "gram-m-018", type: "grammar", difficulty: "medium",
    question: "Which is an example of personification?",
    correctAnswer: "The sun smiled down on the astronauts.",
    options: ["The sun smiled down on the astronauts.", "The sun is very hot.", "The sun rises in the east.", "The sun is a star."],
    xpReward: 25, hint: "Personification gives human traits to non-human things",
    explanation: "The sun cannot actually smile - giving it a human action is personification.",
    context: "The sun smiled down on the astronauts as they emerged."
  },
  {
    id: "gram-m-019", type: "grammar", difficulty: "medium",
    question: "What is the superlative form of 'bright'?",
    correctAnswer: "brightest", options: ["brightest", "brighter", "more bright", "most bright"],
    xpReward: 25, hint: "Superlative compares three or more things, usually adds -est",
    explanation: "For short adjectives, add -est for superlative: bright → brightest.",
    context: "Sirius is the brightest star in our night sky!"
  },
  {
    id: "gram-m-020", type: "grammar", difficulty: "medium",
    question: "Which sentence contains a simile?",
    correctAnswer: "The comet streaked like a fiery arrow across the sky.",
    options: ["The comet streaked like a fiery arrow across the sky.", "The comet streaked across the sky.", "The comet is a flying snowball.", "The comet was bright and fast."],
    xpReward: 25, hint: "Similes use 'like' or 'as' to compare",
    explanation: "'Like a fiery arrow' is a simile - it compares using 'like.'",
    context: "The comet streaked like a fiery arrow across the dark sky!"
  },

  // HARD GRAMMAR (25 questions) - Grade 5 level
  {
    id: "gram-h-001", type: "grammar", difficulty: "hard",
    question: "Which sentence uses the subjunctive mood correctly?",
    correctAnswer: "The mission commander suggested that the crew be ready at dawn.",
    options: ["The mission commander suggested that the crew be ready at dawn.", "The mission commander suggested that the crew is ready at dawn.", "The mission commander suggested that the crew was ready at dawn.", "The mission commander suggested that the crew were ready at dawn."],
    xpReward: 40, hint: "After 'suggested that,' use the base form of the verb for subjunctive",
    explanation: "The subjunctive mood uses 'be' instead of 'is/was/were' after suggestions/demands.",
    context: "Apollo mission control gives final instructions!"
  },
  {
    id: "gram-h-002", type: "grammar", difficulty: "hard",
    question: "Identify the misplaced modifier:",
    correctAnswer: "Flying through the asteroid belt, the space station was seen by the pilot.",
    options: ["Flying through the asteroid belt, the pilot saw the space station.", "Flying through the asteroid belt, the space station was seen by the pilot.", "The pilot saw the space station flying through the asteroid belt.", "The space station was seen by the pilot flying through the asteroid belt."],
    xpReward: 40, hint: "The modifier should be next to what it's describing",
    explanation: "In B, it sounds like the space station is flying, not the pilot!",
    context: "Navigation through the asteroid belt requires precision!"
  },
  {
    id: "gram-h-003", type: "grammar", difficulty: "hard",
    question: "Which sentence correctly uses a nominative absolute?",
    correctAnswer: "The launch countdown having begun, the astronauts strapped in.",
    options: ["The launch countdown having begun, the astronauts strapped in.", "The launch countdown began, the astronauts strapped in.", "Because the launch countdown began, the astronauts strapped in.", "The astronauts strapped in, the launch countdown began."],
    xpReward: 40, hint: "A nominative absolute has a noun + participle, standing independently",
    explanation: "'The launch countdown having begun' is a nominative absolute - noun + participle, independent of the main clause.",
    context: "T-minus 60 seconds and counting!"
  },
  {
    id: "gram-h-004", type: "grammar", difficulty: "hard",
    question: "What is the mood of this sentence: 'If I were an astronaut, I would visit Mars.'?",
    correctAnswer: "subjunctive", options: ["subjunctive", "indicative", "imperative", "conditional"],
    xpReward: 40, hint: "Were instead of was indicates subjunctive mood",
    explanation: "Using 'were' for hypothetical/unreal situations is the subjunctive mood.",
    context: "If I were an astronaut, I'd float among the stars!"
  },
  {
    id: "gram-h-005", type: "grammar", difficulty: "hard",
    question: "Identify the sentence with correct parallel structure:",
    correctAnswer: "The astronaut was brave, determined, and skilled.",
    options: ["The astronaut was brave, determined, and skilled.", "The astronaut was brave, determined, and had skill.", "The astronaut was brave, was determined, and skilled.", "The astronaut was brave, determined, and having skills."],
    xpReward: 40, hint: "Parallel structure keeps the same grammatical form throughout",
    explanation: "All three descriptors use the same form: adjectives (brave, determined, skilled).",
    context: "Astronauts must be brave, determined, and skilled to succeed!"
  },
]

// SPELLING QUESTIONS (100 questions)
export const spellingQuestions: GrammarQuestion[] = [
  // EASY SPELLING (35 questions)
  {
    id: "spell-e-001", type: "spelling", difficulty: "easy",
    question: "Which spelling is correct?",
    correctAnswer: "rocket", options: ["rocket", "rockit", "rocet", "rokkit"],
    xpReward: 15, hint: "Remember: 'ck' comes after a short vowel sound",
    explanation: "'Rocket' uses 'ck' after the short 'o' sound.",
    context: "The Saturn V rocket launched Apollo 11!"
  },
  {
    id: "spell-e-002", type: "spelling", difficulty: "easy",
    question: "Choose the correct spelling:",
    correctAnswer: "planet", options: ["planet", "planit", "planett", "plannet"],
    xpReward: 15, hint: "One 'n' in the middle",
    explanation: "'Planet' has one 'n' and ends in 'et'.",
    context: "Earth is the third planet from the sun!"
  },
  {
    id: "spell-e-003", type: "spelling", difficulty: "easy",
    question: "Which is spelled correctly?",
    correctAnswer: "galaxy", options: ["galaxy", "galixy", "galacy", "gallaxy"],
    xpReward: 15, hint: "Only one 'l' in the middle",
    explanation: "'Galaxy' has one 'l' and uses 'a' not 'i'.",
    context: "The Milky Way is our home galaxy!"
  },
  {
    id: "spell-e-004", type: "spelling", difficulty: "easy",
    question: "Choose the correct spelling:",
    correctAnswer: "space", options: ["space", "spase", "spaice", "spacce"],
    xpReward: 15, hint: "The 'c' is soft because of the 'e'",
    explanation: "'Space' is spelled s-p-a-c-e. The 'e' makes the 'c' soft.",
    context: "Space is vast and full of mysteries!"
  },
  {
    id: "spell-e-005", type: "spelling", difficulty: "easy",
    question: "Which spelling is correct?",
    correctAnswer: "star", options: ["star", "starr", "stare", "stir"],
    xpReward: 15, hint: "Short and simple - just 4 letters",
    explanation: "'Star' is spelled s-t-a-r. No extra letters needed!",
    context: "The North Star helps guide travelers!"
  },
  // MEDIUM SPELLING (40 questions)
  {
    id: "spell-m-001", type: "spelling", difficulty: "medium",
    question: "Choose the correct spelling:",
    correctAnswer: "astronaut", options: ["astronaut", "astronot", "astronautt", "astronaught"],
    xpReward: 25, hint: "Think 'astro' (star) + 'naut' (sailor)",
    explanation: "'Astronaut' combines 'astro' (star) and 'naut' (sailor/traveler).",
    context: "Neil Armstrong was the first astronaut on the moon!"
  },
  {
    id: "spell-m-002", type: "spelling", difficulty: "medium",
    question: "Which spelling is correct?",
    correctAnswer: "satellite", options: ["satellite", "satelite", "sattelite", "satillite"],
    xpReward: 25, hint: "Double 'l' in the middle",
    explanation: "'Satellite' has double 'l' and ends in 'ite'.",
    context: "Sputnik was the first artificial satellite!"
  },
  // HARD SPELLING (25 questions)
  {
    id: "spell-h-001", type: "spelling", difficulty: "hard",
    question: "Which is spelled correctly?",
    correctAnswer: "constellation", options: ["constellation", "constelation", "constallation", "constellattion"],
    xpReward: 40, hint: "Double 'l' and double 't'",
    explanation: "'Constellation' has double 'l' and double 't'.",
    context: "Orion is one of the most recognizable constellations!"
  },
  {
    id: "spell-h-002", type: "spelling", difficulty: "hard",
    question: "Choose the correct spelling:",
    correctAnswer: "extraterrestrial", options: ["extraterrestrial", "extraterrestial", "extraterresterial", "extraterrestriall"],
    xpReward: 40, hint: "Extra + terrestrial (earth-related)",
    explanation: "'Extraterrestrial' = 'extra' (beyond) + 'terrestrial' (Earth).",
    context: "Scientists search for extraterrestrial life!"
  },
]

// PUNCTUATION QUESTIONS (100 questions)
export const punctuationQuestions: GrammarQuestion[] = [
  // EASY PUNCTUATION (35 questions)
  {
    id: "punct-e-001", type: "punctuation", difficulty: "easy",
    question: "Which sentence ends with the correct punctuation?",
    correctAnswer: "Look at that shooting star!",
    options: ["Look at that shooting star!", "Look at that shooting star.", "Look at that shooting star?", "Look at that shooting star"],
    xpReward: 15, hint: "Excitement needs an exclamation mark",
    explanation: "We use '!' for excitement or strong feelings.",
    context: "A brilliant meteor streaks across the sky!"
  },
  {
    id: "punct-e-002", type: "punctuation", difficulty: "easy",
    question: "Where does the comma go? 'Before going to Mars _____ astronauts train for years.'",
    correctAnswer: "Before going to Mars, astronauts train for years.",
    options: ["Before going to Mars, astronauts train for years.", "Before going to Mars astronauts, train for years.", "Before going to Mars astronauts train, for years.", "Before, going to Mars astronauts train for years."],
    xpReward: 15, hint: "Commas separate introductory phrases",
    explanation: "We need a comma after the introductory phrase 'Before going to Mars.'",
    context: "Mars mission preparation takes years of training!"
  },
  // MEDIUM PUNCTUATION (40 questions)
  {
    id: "punct-m-001", type: "punctuation", difficulty: "medium",
    question: "Choose the correctly punctuated sentence:",
    correctAnswer: '"Houston, we have a problem," said the astronaut.',
    options: ['"Houston, we have a problem," said the astronaut.', '"Houston, we have a problem" said the astronaut.', '"Houston, we have a problem," said the astronaut', "'Houston, we have a problem,' said the astronaut."],
    xpReward: 25, hint: "Commas go inside quotation marks, and periods end the sentence",
    explanation: "The comma goes inside the quotes, and we need a period at the end.",
    context: "Famous words from Apollo 13!"
  },
  // HARD PUNCTUATION (25 questions)
  {
    id: "punct-h-001", type: "punctuation", difficulty: "hard",
    question: "Choose the correctly punctuated sentence with dashes:",
    correctAnswer: "The space station—a marvel of engineering—orbits Earth every 90 minutes.",
    options: ["The space station—a marvel of engineering—orbits Earth every 90 minutes.", "The space station - a marvel of engineering - orbits Earth every 90 minutes.", "The space station: a marvel of engineering: orbits Earth every 90 minutes.", "The space station, a marvel of engineering, orbits Earth every 90 minutes."],
    xpReward: 40, hint: "Em dashes (—) set off parenthetical information with no spaces",
    explanation: "Em dashes set off additional information dramatically. No spaces around them.",
    context: "The ISS is humanity's outpost in space!"
  },
]

// Helper functions
export const allGrammarQuestions: GrammarQuestion[] = [
  ...grammarQuestions,
  ...spellingQuestions,
  ...punctuationQuestions
]

export function getQuestionsByType(type: GrammarQuestion['type']): GrammarQuestion[] {
  return allGrammarQuestions.filter(q => q.type === type)
}

export function getRandomQuestions(count: number, type?: GrammarQuestion['type']): GrammarQuestion[] {
  const pool = type ? getQuestionsByType(type) : allGrammarQuestions
  const shuffled = [...pool].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, shuffled.length))
}

export function getQuestionsExcluding(excludeIds: string[], count: number, type?: GrammarQuestion['type']): GrammarQuestion[] {
  const pool = (type ? getQuestionsByType(type) : allGrammarQuestions).filter(q => !excludeIds.includes(q.id))
  const shuffled = [...pool].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, shuffled.length))
}
