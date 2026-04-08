import { MultiSkillQuestionData } from '../types'

// English Vocabulary-in-Context Questions — 15 questions (Q41-Q55 from Jean's test)
// Multiple choice: choose the word that best fits the context

export const englishVocabularyQuestions: MultiSkillQuestionData[] = [
  // ============================================================
  // A2 — Elementary (3 questions)
  // ============================================================
  {
    language: 'English', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'I need to ___ an appointment with the dentist.',
    options: [{ label: 'do', value: 'do' }, { label: 'make', value: 'make' }, { label: 'take', value: 'take' }, { label: 'get', value: 'get' }],
    correctAnswer: 'make', points: 1, orderIndex: 41, tags: ['collocations', 'daily life']
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'The weather was so bad that we had to ___ the picnic.',
    options: [{ label: 'cancel', value: 'cancel' }, { label: 'stop', value: 'stop' }, { label: 'close', value: 'close' }, { label: 'break', value: 'break' }],
    correctAnswer: 'cancel', points: 1, orderIndex: 42, tags: ['weather', 'daily life']
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Can you ___ me a favour and post this letter?',
    options: [{ label: 'make', value: 'make' }, { label: 'give', value: 'give' }, { label: 'do', value: 'do' }, { label: 'have', value: 'have' }],
    correctAnswer: 'do', points: 1, orderIndex: 43, tags: ['collocations', 'requests']
  },

  // ============================================================
  // B1 — Intermediate (4 questions)
  // ============================================================
  {
    language: 'English', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'The company decided to ___ 200 new employees this year.',
    options: [{ label: 'fire', value: 'fire' }, { label: 'hire', value: 'hire' }, { label: 'retire', value: 'retire' }, { label: 'resign', value: 'resign' }],
    correctAnswer: 'hire', points: 1, orderIndex: 44, tags: ['business', 'employment']
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'She\'s very ___ — she always thinks about other people\'s feelings.',
    options: [{ label: 'sensible', value: 'sensible' }, { label: 'sensitive', value: 'sensitive' }, { label: 'senseless', value: 'senseless' }, { label: 'sentimental', value: 'sentimental' }],
    correctAnswer: 'sensitive', points: 1, orderIndex: 45, tags: ['personality', 'adjectives']
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'The hotel has excellent ___ — a swimming pool, gym, and spa.',
    options: [{ label: 'facilities', value: 'facilities' }, { label: 'furniture', value: 'furniture' }, { label: 'equipment', value: 'equipment' }, { label: 'appliances', value: 'appliances' }],
    correctAnswer: 'facilities', points: 1, orderIndex: 46, tags: ['travel', 'nouns']
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'I\'m afraid I can\'t ___ to buy a new car right now.',
    options: [{ label: 'afford', value: 'afford' }, { label: 'allow', value: 'allow' }, { label: 'offer', value: 'offer' }, { label: 'provide', value: 'provide' }],
    correctAnswer: 'afford', points: 1, orderIndex: 47, tags: ['money', 'verbs']
  },

  // ============================================================
  // B2 — Upper Intermediate (4 questions)
  // ============================================================
  {
    language: 'English', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'The government has ___ new regulations to protect the environment.',
    options: [{ label: 'introduced', value: 'introduced' }, { label: 'invented', value: 'invented' }, { label: 'discovered', value: 'discovered' }, { label: 'produced', value: 'produced' }],
    correctAnswer: 'introduced', points: 1, orderIndex: 48, tags: ['government', 'formal']
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'The documentary shed light on the ___ consequences of pollution.',
    options: [{ label: 'devastating', value: 'devastating' }, { label: 'devoting', value: 'devoting' }, { label: 'devoted', value: 'devoted' }, { label: 'developed', value: 'developed' }],
    correctAnswer: 'devastating', points: 1, orderIndex: 49, tags: ['environment', 'adjectives']
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'She has a great ___ of humour and always makes people laugh.',
    options: [{ label: 'sense', value: 'sense' }, { label: 'feeling', value: 'feeling' }, { label: 'meaning', value: 'meaning' }, { label: 'taste', value: 'taste' }],
    correctAnswer: 'sense', points: 1, orderIndex: 50, tags: ['collocations', 'personality']
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'The committee ___ the proposal unanimously.',
    options: [{ label: 'approved', value: 'approved' }, { label: 'improved', value: 'improved' }, { label: 'proved', value: 'proved' }, { label: 'applied', value: 'applied' }],
    correctAnswer: 'approved', points: 1, orderIndex: 51, tags: ['business', 'formal']
  },

  // ============================================================
  // C1 — Advanced (2 questions)
  // ============================================================
  {
    language: 'English', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'The politician\'s speech was deliberately ___ to avoid committing to any position.',
    options: [{ label: 'ambiguous', value: 'ambiguous' }, { label: 'ambitious', value: 'ambitious' }, { label: 'anonymous', value: 'anonymous' }, { label: 'analogous', value: 'analogous' }],
    correctAnswer: 'ambiguous', points: 1, orderIndex: 52, tags: ['politics', 'advanced adjectives']
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Her ___ attention to detail makes her the ideal candidate for the role.',
    options: [{ label: 'meticulous', value: 'meticulous' }, { label: 'malicious', value: 'malicious' }, { label: 'miraculous', value: 'miraculous' }, { label: 'mischievous', value: 'mischievous' }],
    correctAnswer: 'meticulous', points: 1, orderIndex: 53, tags: ['work', 'advanced adjectives']
  },

  // ============================================================
  // C2 — Proficiency (2 questions)
  // ============================================================
  {
    language: 'English', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'The artist\'s work is a ___ blend of tradition and innovation.',
    options: [{ label: 'seamless', value: 'seamless' }, { label: 'seaming', value: 'seaming' }, { label: 'seemly', value: 'seemly' }, { label: 'seeming', value: 'seeming' }],
    correctAnswer: 'seamless', points: 1, orderIndex: 54, tags: ['art', 'advanced adjectives']
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'The professor\'s ___ explanation left even the advanced students struggling to follow.',
    options: [{ label: 'convoluted', value: 'convoluted' }, { label: 'consolidated', value: 'consolidated' }, { label: 'contemplated', value: 'contemplated' }, { label: 'congregated', value: 'congregated' }],
    correctAnswer: 'convoluted', points: 1, orderIndex: 55, tags: ['academic', 'advanced adjectives']
  },

  // ============================================================
  // NEW QUESTIONS 16-60 (45 additional, ~8 per level)
  // orderIndex starts at 16 (vocabulary section numbering)
  // ============================================================

  // ============================================================
  // A1 — Beginner (8 questions)
  // ============================================================
  {
    language: 'English', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'I drink ___ every morning.',
    options: [{ label: 'water', value: 'water' }, { label: 'chair', value: 'chair' }, { label: 'book', value: 'book' }, { label: 'pen', value: 'pen' }],
    correctAnswer: 'water', points: 1, orderIndex: 16, tags: ['food and drink', 'basic nouns']
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'The opposite of "big" is ___.',
    options: [{ label: 'tall', value: 'tall' }, { label: 'small', value: 'small' }, { label: 'fast', value: 'fast' }, { label: 'old', value: 'old' }],
    correctAnswer: 'small', points: 1, orderIndex: 17, tags: ['adjectives', 'opposites']
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'A ___ is a person who teaches students.',
    options: [{ label: 'doctor', value: 'doctor' }, { label: 'teacher', value: 'teacher' }, { label: 'driver', value: 'driver' }, { label: 'waiter', value: 'waiter' }],
    correctAnswer: 'teacher', points: 1, orderIndex: 18, tags: ['jobs', 'basic nouns']
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'We sleep in a ___.',
    options: [{ label: 'kitchen', value: 'kitchen' }, { label: 'bedroom', value: 'bedroom' }, { label: 'garden', value: 'garden' }, { label: 'bathroom', value: 'bathroom' }],
    correctAnswer: 'bedroom', points: 1, orderIndex: 19, tags: ['house', 'rooms']
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Today is very ___. I need a jacket.',
    options: [{ label: 'hot', value: 'hot' }, { label: 'cold', value: 'cold' }, { label: 'happy', value: 'happy' }, { label: 'tired', value: 'tired' }],
    correctAnswer: 'cold', points: 1, orderIndex: 20, tags: ['weather', 'adjectives']
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'She is my sister. She is part of my ___.',
    options: [{ label: 'school', value: 'school' }, { label: 'family', value: 'family' }, { label: 'office', value: 'office' }, { label: 'team', value: 'team' }],
    correctAnswer: 'family', points: 1, orderIndex: 21, tags: ['family', 'basic nouns']
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'I use a ___ to write.',
    options: [{ label: 'cup', value: 'cup' }, { label: 'pen', value: 'pen' }, { label: 'bag', value: 'bag' }, { label: 'shoe', value: 'shoe' }],
    correctAnswer: 'pen', points: 1, orderIndex: 22, tags: ['school supplies', 'basic nouns']
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Apples and bananas are types of ___.',
    options: [{ label: 'vegetables', value: 'vegetables' }, { label: 'fruit', value: 'fruit' }, { label: 'meat', value: 'meat' }, { label: 'bread', value: 'bread' }],
    correctAnswer: 'fruit', points: 1, orderIndex: 23, tags: ['food', 'categories']
  },

  // ============================================================
  // A2 — Elementary (8 questions, adding 5 more to existing 3)
  // ============================================================
  {
    language: 'English', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'I need to ___ the bus to get to the city center.',
    options: [{ label: 'catch', value: 'catch' }, { label: 'hold', value: 'hold' }, { label: 'bring', value: 'bring' }, { label: 'carry', value: 'carry' }],
    correctAnswer: 'catch', points: 1, orderIndex: 24, tags: ['transport', 'collocations']
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'She put on her ___ because it was raining outside.',
    options: [{ label: 'scarf', value: 'scarf' }, { label: 'raincoat', value: 'raincoat' }, { label: 'hat', value: 'hat' }, { label: 'gloves', value: 'gloves' }],
    correctAnswer: 'raincoat', points: 1, orderIndex: 25, tags: ['clothes', 'weather']
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Could you ___ the light, please? It\'s too dark in here.',
    options: [{ label: 'turn on', value: 'turn on' }, { label: 'turn off', value: 'turn off' }, { label: 'turn up', value: 'turn up' }, { label: 'turn down', value: 'turn down' }],
    correctAnswer: 'turn on', points: 1, orderIndex: 26, tags: ['phrasal verbs', 'daily life']
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'My grandfather is 80 years old. He is very ___.',
    options: [{ label: 'young', value: 'young' }, { label: 'elderly', value: 'elderly' }, { label: 'tiny', value: 'tiny' }, { label: 'quick', value: 'quick' }],
    correctAnswer: 'elderly', points: 1, orderIndex: 27, tags: ['people', 'adjectives']
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'The ___ at the restaurant brought us the menu.',
    options: [{ label: 'chef', value: 'chef' }, { label: 'waiter', value: 'waiter' }, { label: 'manager', value: 'manager' }, { label: 'customer', value: 'customer' }],
    correctAnswer: 'waiter', points: 1, orderIndex: 28, tags: ['restaurant', 'jobs']
  },

  // ============================================================
  // B1 — Intermediate (8 questions, adding 4 more to existing 4)
  // ============================================================
  {
    language: 'English', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'The flight was ___ due to bad weather conditions.',
    options: [{ label: 'delayed', value: 'delayed' }, { label: 'deleted', value: 'deleted' }, { label: 'denied', value: 'denied' }, { label: 'declined', value: 'declined' }],
    correctAnswer: 'delayed', points: 1, orderIndex: 29, tags: ['travel', 'verbs']
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'He has a lot of ___ in the IT industry — he has worked there for 15 years.',
    options: [{ label: 'experiment', value: 'experiment' }, { label: 'experience', value: 'experience' }, { label: 'explanation', value: 'explanation' }, { label: 'expectation', value: 'expectation' }],
    correctAnswer: 'experience', points: 1, orderIndex: 30, tags: ['work', 'confusing words']
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'We need to ___ a solution to this problem as soon as possible.',
    options: [{ label: 'find', value: 'find' }, { label: 'lose', value: 'lose' }, { label: 'miss', value: 'miss' }, { label: 'search', value: 'search' }],
    correctAnswer: 'find', points: 1, orderIndex: 31, tags: ['problem solving', 'collocations']
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'The manager gave a clear ___ of the new project to the team.',
    options: [{ label: 'description', value: 'description' }, { label: 'prescription', value: 'prescription' }, { label: 'subscription', value: 'subscription' }, { label: 'inscription', value: 'inscription' }],
    correctAnswer: 'description', points: 1, orderIndex: 32, tags: ['work', 'nouns']
  },

  // ============================================================
  // B2 — Upper Intermediate (8 questions, adding 4 more to existing 4)
  // ============================================================
  {
    language: 'English', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'The new evidence ___ the theory that had been accepted for decades.',
    options: [{ label: 'undermined', value: 'undermined' }, { label: 'underlined', value: 'underlined' }, { label: 'understood', value: 'understood' }, { label: 'undertook', value: 'undertook' }],
    correctAnswer: 'undermined', points: 2, orderIndex: 33, tags: ['academic', 'verbs']
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'After years of negotiations, the two countries finally reached a ___.',
    options: [{ label: 'compromise', value: 'compromise' }, { label: 'competition', value: 'competition' }, { label: 'complaint', value: 'complaint' }, { label: 'combination', value: 'combination' }],
    correctAnswer: 'compromise', points: 2, orderIndex: 34, tags: ['politics', 'abstract nouns']
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'The situation is ___ — we need to act immediately.',
    options: [{ label: 'urgent', value: 'urgent' }, { label: 'casual', value: 'casual' }, { label: 'gradual', value: 'gradual' }, { label: 'optional', value: 'optional' }],
    correctAnswer: 'urgent', points: 2, orderIndex: 35, tags: ['abstract', 'adjectives']
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'The study revealed a strong ___ between exercise and mental health.',
    options: [{ label: 'correlation', value: 'correlation' }, { label: 'celebration', value: 'celebration' }, { label: 'collection', value: 'collection' }, { label: 'circulation', value: 'circulation' }],
    correctAnswer: 'correlation', points: 2, orderIndex: 36, tags: ['academic', 'research']
  },

  // ============================================================
  // C1 — Advanced (8 questions, adding 6 more to existing 2)
  // ============================================================
  {
    language: 'English', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'The CEO tried to ___ the scandal, but the press had already uncovered the truth.',
    options: [{ label: 'conceal', value: 'conceal' }, { label: 'reveal', value: 'reveal' }, { label: 'appeal', value: 'appeal' }, { label: 'repeal', value: 'repeal' }],
    correctAnswer: 'conceal', points: 2, orderIndex: 37, tags: ['business', 'advanced verbs']
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'His remarks were so ___ that nobody could tell if he was joking or serious.',
    options: [{ label: 'sardonic', value: 'sardonic' }, { label: 'sympathetic', value: 'sympathetic' }, { label: 'sentimental', value: 'sentimental' }, { label: 'systematic', value: 'systematic' }],
    correctAnswer: 'sardonic', points: 2, orderIndex: 38, tags: ['personality', 'advanced adjectives']
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'The charity aims to ___ poverty in developing countries.',
    options: [{ label: 'alleviate', value: 'alleviate' }, { label: 'aggravate', value: 'aggravate' }, { label: 'allocate', value: 'allocate' }, { label: 'abbreviate', value: 'abbreviate' }],
    correctAnswer: 'alleviate', points: 2, orderIndex: 39, tags: ['social issues', 'advanced verbs']
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'She has a ___ for languages — she speaks five fluently.',
    options: [{ label: 'flair', value: 'flair' }, { label: 'flare', value: 'flare' }, { label: 'flaw', value: 'flaw' }, { label: 'flame', value: 'flame' }],
    correctAnswer: 'flair', points: 2, orderIndex: 40, tags: ['idiomatic', 'easily confused']
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'The new policy is designed to ___ innovation within the company.',
    options: [{ label: 'foster', value: 'foster' }, { label: 'hinder', value: 'hinder' }, { label: 'feign', value: 'feign' }, { label: 'fumble', value: 'fumble' }],
    correctAnswer: 'foster', points: 2, orderIndex: 41, tags: ['business', 'advanced verbs']
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Don\'t beat around the ___. Just tell me the truth.',
    options: [{ label: 'bush', value: 'bush' }, { label: 'tree', value: 'tree' }, { label: 'corner', value: 'corner' }, { label: 'garden', value: 'garden' }],
    correctAnswer: 'bush', points: 2, orderIndex: 42, tags: ['idiomatic expressions']
  },

  // ============================================================
  // C2 — Proficiency (8 questions, adding 6 more to existing 2)
  // ============================================================
  {
    language: 'English', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'The author\'s ___ style makes his novels both challenging and deeply rewarding.',
    options: [{ label: 'labyrinthine', value: 'labyrinthine' }, { label: 'laconic', value: 'laconic' }, { label: 'luminous', value: 'luminous' }, { label: 'litigious', value: 'litigious' }],
    correctAnswer: 'labyrinthine', points: 2, orderIndex: 43, tags: ['literary', 'advanced adjectives']
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'The diplomat\'s ___ response avoided offending either side of the dispute.',
    options: [{ label: 'equivocal', value: 'equivocal' }, { label: 'emphatic', value: 'emphatic' }, { label: 'empirical', value: 'empirical' }, { label: 'endemic', value: 'endemic' }],
    correctAnswer: 'equivocal', points: 2, orderIndex: 44, tags: ['politics', 'nuanced vocabulary']
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Years of corruption had led to the ___ of the entire institution.',
    options: [{ label: 'amelioration', value: 'amelioration' }, { label: 'debacle', value: 'debacle' }, { label: 'renaissance', value: 'renaissance' }, { label: 'proliferation', value: 'proliferation' }],
    correctAnswer: 'debacle', points: 2, orderIndex: 45, tags: ['formal', 'advanced nouns']
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'His ___ wit ensured that his columns were always the most widely read in the newspaper.',
    options: [{ label: 'trenchant', value: 'trenchant' }, { label: 'tentative', value: 'tentative' }, { label: 'taciturn', value: 'taciturn' }, { label: 'transient', value: 'transient' }],
    correctAnswer: 'trenchant', points: 2, orderIndex: 46, tags: ['literary', 'advanced adjectives']
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'The philosopher argued that true knowledge is ___ and can never be fully attained.',
    options: [{ label: 'ephemeral', value: 'ephemeral' }, { label: 'empirical', value: 'empirical' }, { label: 'ethereal', value: 'ethereal' }, { label: 'elusive', value: 'elusive' }],
    correctAnswer: 'elusive', points: 2, orderIndex: 47, tags: ['philosophy', 'nuanced vocabulary']
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'The critic described the film as a ___ masterpiece — beautiful on the surface but hollow underneath.',
    options: [{ label: 'specious', value: 'specious' }, { label: 'spurious', value: 'spurious' }, { label: 'superfluous', value: 'superfluous' }, { label: 'superlative', value: 'superlative' }],
    correctAnswer: 'specious', points: 2, orderIndex: 48, tags: ['art criticism', 'literary vocabulary']
  },
]
