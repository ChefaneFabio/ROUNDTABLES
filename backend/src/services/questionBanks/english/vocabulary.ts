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
    questionText: 'The weather was so bad that we had to ___ the outdoor meeting.',
    options: [{ label: 'cancel', value: 'cancel' }, { label: 'stop', value: 'stop' }, { label: 'close', value: 'close' }, { label: 'break', value: 'break' }],
    correctAnswer: 'cancel', points: 1, orderIndex: 42, tags: ['weather', 'workplace']
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
    questionText: 'She is my colleague. She is part of my ___.',
    options: [{ label: 'class', value: 'class' }, { label: 'neighbourhood', value: 'neighbourhood' }, { label: 'department', value: 'department' }, { label: 'team', value: 'team' }],
    correctAnswer: 'team', points: 1, orderIndex: 21, tags: ['workplace', 'basic nouns']
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'I use a ___ to write.',
    options: [{ label: 'cup', value: 'cup' }, { label: 'pen', value: 'pen' }, { label: 'bag', value: 'bag' }, { label: 'shoe', value: 'shoe' }],
    correctAnswer: 'pen', points: 1, orderIndex: 22, tags: ['office supplies', 'basic nouns']
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
    questionText: 'She put on her ___ because it was raining outside and she didn\'t want to get wet.',
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
    questionText: 'The philosopher argued that true knowledge is ___ — always just beyond our grasp, no matter how hard we pursue it.',
    options: [{ label: 'ephemeral', value: 'ephemeral' }, { label: 'empirical', value: 'empirical' }, { label: 'elaborate', value: 'elaborate' }, { label: 'elusive', value: 'elusive' }],
    correctAnswer: 'elusive', points: 2, orderIndex: 47, tags: ['philosophy', 'nuanced vocabulary']
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'The critic described the film as a ___ masterpiece — beautiful on the surface but hollow underneath.',
    options: [{ label: 'specious', value: 'specious' }, { label: 'spurious', value: 'spurious' }, { label: 'superfluous', value: 'superfluous' }, { label: 'superlative', value: 'superlative' }],
    correctAnswer: 'specious', points: 2, orderIndex: 48, tags: ['art criticism', 'literary vocabulary']
  },

  // ============================================================
  // FILL_BLANK — Vocabulary (20 questions: 3-4 per CEFR level)
  // ============================================================

  // A1 — Basic opposites & definitions
  {
    language: 'English', cefrLevel: 'A1', questionType: 'FILL_BLANK', skill: 'VOCABULARY',
    questionText: 'The opposite of "hot" is ___.',
    correctAnswer: 'cold', points: 1, orderIndex: 49, tags: ['opposites', 'adjectives']
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'FILL_BLANK', skill: 'VOCABULARY',
    questionText: 'The opposite of "big" is ___.',
    correctAnswer: 'small', points: 1, orderIndex: 50, tags: ['opposites', 'adjectives']
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'FILL_BLANK', skill: 'VOCABULARY',
    questionText: 'A person who helps you when you are ill is a ___.',
    correctAnswer: 'doctor', points: 1, orderIndex: 51, tags: ['definitions', 'jobs']
  },

  // A2 — Collocations & word families
  {
    language: 'English', cefrLevel: 'A2', questionType: 'FILL_BLANK', skill: 'VOCABULARY',
    questionText: 'You ___ a bus to go to work. (take/catch)',
    correctAnswer: 'take', points: 1, orderIndex: 52, tags: ['collocations', 'transport']
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'FILL_BLANK', skill: 'VOCABULARY',
    questionText: 'The noun form of "happy" is ___.',
    correctAnswer: 'happiness', points: 1, orderIndex: 53, tags: ['word families', 'nouns']
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'FILL_BLANK', skill: 'VOCABULARY',
    questionText: 'The opposite of "expensive" is ___.',
    correctAnswer: 'cheap', points: 1, orderIndex: 54, tags: ['opposites', 'adjectives']
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'FILL_BLANK', skill: 'VOCABULARY',
    questionText: 'You use an ___ to keep the rain off. (object)',
    correctAnswer: 'umbrella', points: 1, orderIndex: 55, tags: ['definitions', 'objects']
  },

  // B1 — Synonyms & collocations
  {
    language: 'English', cefrLevel: 'B1', questionType: 'FILL_BLANK', skill: 'VOCABULARY',
    questionText: 'A synonym of "start" is ___.',
    correctAnswer: 'begin', points: 1, orderIndex: 56, tags: ['synonyms', 'verbs']
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'FILL_BLANK', skill: 'VOCABULARY',
    questionText: 'You ___ a decision. (make/do — collocation)',
    correctAnswer: 'make', points: 1, orderIndex: 57, tags: ['collocations', 'make vs do']
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'FILL_BLANK', skill: 'VOCABULARY',
    questionText: 'The adjective form of "danger" is ___.',
    correctAnswer: 'dangerous', points: 1, orderIndex: 58, tags: ['word families', 'adjectives']
  },

  // B2 — Advanced collocations & abstract vocabulary
  {
    language: 'English', cefrLevel: 'B2', questionType: 'FILL_BLANK', skill: 'VOCABULARY',
    questionText: 'The company decided to ___ new staff to meet demand. (employ — formal synonym)',
    correctAnswer: 'recruit', points: 2, orderIndex: 59, tags: ['synonyms', 'business']
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'FILL_BLANK', skill: 'VOCABULARY',
    questionText: 'There is a strong ___ between smoking and lung disease. (link — formal noun)',
    correctAnswer: 'correlation', points: 2, orderIndex: 60, tags: ['academic', 'abstract nouns']
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'FILL_BLANK', skill: 'VOCABULARY',
    questionText: 'The noun form of "resilient" is ___.',
    correctAnswer: 'resilience', points: 2, orderIndex: 61, tags: ['word families', 'abstract nouns']
  },

  // C1 — Nuanced vocabulary
  {
    language: 'English', cefrLevel: 'C1', questionType: 'FILL_BLANK', skill: 'VOCABULARY',
    questionText: 'To ___ a problem means to make it less severe. (ease — formal verb)',
    correctAnswer: 'alleviate', points: 2, orderIndex: 62, tags: ['definitions', 'advanced verbs']
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'FILL_BLANK', skill: 'VOCABULARY',
    questionText: 'A person who is ___ pays very careful attention to detail. (careful — advanced adjective)',
    correctAnswer: 'meticulous', points: 2, orderIndex: 63, tags: ['synonyms', 'advanced adjectives']
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'FILL_BLANK', skill: 'VOCABULARY',
    questionText: 'The government tried to ___ the true cost of the project. (hide — formal verb)',
    correctAnswer: 'conceal', points: 2, orderIndex: 64, tags: ['synonyms', 'formal verbs']
  },

  // C2 — Literary & rare vocabulary
  {
    language: 'English', cefrLevel: 'C2', questionType: 'FILL_BLANK', skill: 'VOCABULARY',
    questionText: 'His ___ wit made his speeches both cutting and memorable. (sharp/mocking — literary adjective)',
    correctAnswer: 'sardonic', points: 2, orderIndex: 65, tags: ['definitions', 'literary adjectives']
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'FILL_BLANK', skill: 'VOCABULARY',
    questionText: 'The negotiation ended in a complete ___. (disaster — formal noun)',
    correctAnswer: 'debacle', points: 2, orderIndex: 66, tags: ['synonyms', 'advanced nouns']
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'FILL_BLANK', skill: 'VOCABULARY',
    questionText: 'The philosopher\'s argument was deliberately ___ — superficially convincing but fundamentally flawed.',
    correctAnswer: 'specious', points: 2, orderIndex: 67, tags: ['definitions', 'literary vocabulary']
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'FILL_BLANK', skill: 'VOCABULARY',
    questionText: 'A ___ analysis cuts straight to the heart of the matter. (sharp/incisive — literary adjective)',
    correctAnswer: 'trenchant', points: 2, orderIndex: 68, tags: ['definitions', 'literary adjectives']
  },

  // ============================================================
  // PHRASAL VERBS — 30 questions (orderIndex 69–98)
  // Mixed MULTIPLE_CHOICE & FILL_BLANK, workplace/professional contexts
  // ============================================================

  // ============================================================
  // A1 — Beginner Phrasal Verbs (3 questions)
  // ============================================================
  {
    language: 'English', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Please ___ the computer before you leave the office.',
    options: [{ label: 'turn on', value: 'turn on' }, { label: 'turn off', value: 'turn off' }, { label: 'turn up', value: 'turn up' }, { label: 'turn down', value: 'turn down' }],
    correctAnswer: 'turn off', points: 1, orderIndex: 69, tags: ['phrasal verbs', 'daily life']
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'FILL_BLANK', skill: 'VOCABULARY',
    questionText: 'Can you ___ ___ that pen from the floor? (collect from the ground)',
    correctAnswer: 'pick up', points: 1, orderIndex: 70, tags: ['phrasal verbs', 'daily life']
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'I ___ at 7 a.m. every day for work.',
    options: [{ label: 'get up', value: 'get up' }, { label: 'get on', value: 'get on' }, { label: 'get off', value: 'get off' }, { label: 'get in', value: 'get in' }],
    correctAnswer: 'get up', points: 1, orderIndex: 71, tags: ['phrasal verbs', 'daily life']
  },

  // ============================================================
  // A2 — Elementary Phrasal Verbs (5 questions)
  // ============================================================
  {
    language: 'English', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'I\'m ___ my glasses. Have you seen them?',
    options: [{ label: 'looking for', value: 'looking for' }, { label: 'looking at', value: 'looking at' }, { label: 'looking up', value: 'looking up' }, { label: 'looking after', value: 'looking after' }],
    correctAnswer: 'looking for', points: 1, orderIndex: 72, tags: ['phrasal verbs', 'daily life']
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'FILL_BLANK', skill: 'VOCABULARY',
    questionText: 'It\'s cold outside. You should ___ ___ a jacket before you go out.',
    correctAnswer: 'put on', points: 1, orderIndex: 73, tags: ['phrasal verbs', 'clothes']
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Please ___ those old files — we don\'t need them anymore.',
    options: [{ label: 'throw away', value: 'throw away' }, { label: 'throw up', value: 'throw up' }, { label: 'throw in', value: 'throw in' }, { label: 'throw out', value: 'throw out' }],
    correctAnswer: 'throw away', points: 1, orderIndex: 74, tags: ['phrasal verbs', 'office']
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'FILL_BLANK', skill: 'VOCABULARY',
    questionText: 'I lent him my book last week. He needs to ___ it ___ tomorrow.',
    correctAnswer: 'give back', points: 1, orderIndex: 75, tags: ['phrasal verbs', 'daily life']
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'What time did you ___ this morning?',
    options: [{ label: 'wake up', value: 'wake up' }, { label: 'wake off', value: 'wake off' }, { label: 'wake out', value: 'wake out' }, { label: 'wake in', value: 'wake in' }],
    correctAnswer: 'wake up', points: 1, orderIndex: 76, tags: ['phrasal verbs', 'daily life']
  },

  // ============================================================
  // B1 — Intermediate Phrasal Verbs (6 questions)
  // ============================================================
  {
    language: 'English', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Let\'s ___ with the meeting — we\'re already behind schedule.',
    options: [{ label: 'carry on', value: 'carry on' }, { label: 'carry out', value: 'carry out' }, { label: 'carry off', value: 'carry off' }, { label: 'carry over', value: 'carry over' }],
    correctAnswer: 'carry on', points: 1, orderIndex: 77, tags: ['phrasal verbs', 'workplace']
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'FILL_BLANK', skill: 'VOCABULARY',
    questionText: 'She decided to ___ ___ the issue of overtime pay at the next team meeting.',
    correctAnswer: 'bring up', points: 1, orderIndex: 78, tags: ['phrasal verbs', 'workplace']
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'How do you ___ difficult clients in your department?',
    options: [{ label: 'deal with', value: 'deal with' }, { label: 'deal in', value: 'deal in' }, { label: 'deal out', value: 'deal out' }, { label: 'deal for', value: 'deal for' }],
    correctAnswer: 'deal with', points: 1, orderIndex: 79, tags: ['phrasal verbs', 'workplace']
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'FILL_BLANK', skill: 'VOCABULARY',
    questionText: 'The IT team will ___ ___ the new software on all office computers next week.',
    correctAnswer: 'set up', points: 1, orderIndex: 80, tags: ['phrasal verbs', 'workplace']
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'I\'m really ___ the company retreat next month.',
    options: [{ label: 'looking forward to', value: 'looking forward to' }, { label: 'looking up to', value: 'looking up to' }, { label: 'looking down on', value: 'looking down on' }, { label: 'looking out for', value: 'looking out for' }],
    correctAnswer: 'looking forward to', points: 1, orderIndex: 81, tags: ['phrasal verbs', 'workplace']
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'FILL_BLANK', skill: 'VOCABULARY',
    questionText: 'Don\'t ___ ___ the report any longer — the deadline is tomorrow.',
    correctAnswer: 'put off', points: 1, orderIndex: 82, tags: ['phrasal verbs', 'workplace']
  },

  // ============================================================
  // B2 — Upper Intermediate Phrasal Verbs (6 questions)
  // ============================================================
  {
    language: 'English', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'The marketing team needs to ___ a new strategy for the product launch.',
    options: [{ label: 'come up with', value: 'come up with' }, { label: 'come down to', value: 'come down to' }, { label: 'come across as', value: 'come across as' }, { label: 'come around to', value: 'come around to' }],
    correctAnswer: 'come up with', points: 2, orderIndex: 83, tags: ['phrasal verbs', 'business']
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'FILL_BLANK', skill: 'VOCABULARY',
    questionText: 'She doesn\'t ___ ___ ___ her new manager — they have very different working styles.',
    correctAnswer: 'get along with', points: 2, orderIndex: 84, tags: ['phrasal verbs', 'business']
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'It\'s hard to ___ all the changes in this fast-moving industry.',
    options: [{ label: 'keep up with', value: 'keep up with' }, { label: 'keep on with', value: 'keep on with' }, { label: 'keep out of', value: 'keep out of' }, { label: 'keep away from', value: 'keep away from' }],
    correctAnswer: 'keep up with', points: 2, orderIndex: 85, tags: ['phrasal verbs', 'business']
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'FILL_BLANK', skill: 'VOCABULARY',
    questionText: 'The board will ___ ___ the feasibility of expanding into Asian markets.',
    correctAnswer: 'look into', points: 2, orderIndex: 86, tags: ['phrasal verbs', 'business']
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'He was offered a promotion but decided to ___ it ___ because of the relocation.',
    options: [{ label: 'turn down', value: 'turn down' }, { label: 'turn off', value: 'turn off' }, { label: 'turn over', value: 'turn over' }, { label: 'turn up', value: 'turn up' }],
    correctAnswer: 'turn down', points: 2, orderIndex: 87, tags: ['phrasal verbs', 'business']
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'FILL_BLANK', skill: 'VOCABULARY',
    questionText: 'I\'d like to ___ ___ that client satisfaction has dropped by 15% this quarter.',
    correctAnswer: 'point out', points: 2, orderIndex: 88, tags: ['phrasal verbs', 'business']
  },

  // ============================================================
  // C1 — Advanced Phrasal Verbs (5 questions)
  // ============================================================
  {
    language: 'English', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'The company plans to ___ its legacy IT systems over the next two years.',
    options: [{ label: 'phase out', value: 'phase out' }, { label: 'phase in', value: 'phase in' }, { label: 'phase off', value: 'phase off' }, { label: 'phase up', value: 'phase up' }],
    correctAnswer: 'phase out', points: 2, orderIndex: 89, tags: ['phrasal verbs', 'formal']
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'FILL_BLANK', skill: 'VOCABULARY',
    questionText: 'The legal team will ___ ___ a new contract before the end of the quarter.',
    correctAnswer: 'draw up', points: 2, orderIndex: 90, tags: ['phrasal verbs', 'formal']
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'The merger ___ at the last minute due to regulatory concerns.',
    options: [{ label: 'fell through', value: 'fell through' }, { label: 'fell out', value: 'fell out' }, { label: 'fell behind', value: 'fell behind' }, { label: 'fell apart', value: 'fell apart' }],
    correctAnswer: 'fell through', points: 2, orderIndex: 91, tags: ['phrasal verbs', 'formal']
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'FILL_BLANK', skill: 'VOCABULARY',
    questionText: 'The budget must ___ ___ unexpected expenses such as equipment repairs.',
    correctAnswer: 'account for', points: 2, orderIndex: 92, tags: ['phrasal verbs', 'formal']
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'We cannot ___ the possibility that the delay was caused by a supplier issue.',
    options: [{ label: 'rule out', value: 'rule out' }, { label: 'rule over', value: 'rule over' }, { label: 'rule off', value: 'rule off' }, { label: 'rule up', value: 'rule up' }],
    correctAnswer: 'rule out', points: 2, orderIndex: 93, tags: ['phrasal verbs', 'formal']
  },

  // ============================================================
  // C2 — Sophisticated Phrasal Verbs (5 questions)
  // ============================================================
  {
    language: 'English', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Management tried to ___ the growing divisions within the leadership team.',
    options: [{ label: 'paper over', value: 'paper over' }, { label: 'paper up', value: 'paper up' }, { label: 'paper through', value: 'paper through' }, { label: 'paper out', value: 'paper out' }],
    correctAnswer: 'paper over', points: 2, orderIndex: 94, tags: ['phrasal verbs', 'literary']
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'FILL_BLANK', skill: 'VOCABULARY',
    questionText: 'The CEO managed to ___ ___ a hostile takeover bid from a rival corporation.',
    correctAnswer: 'fend off', points: 2, orderIndex: 95, tags: ['phrasal verbs', 'literary']
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'After weeks of tense negotiations, the two parties finally ___ a deal.',
    options: [{ label: 'hammered out', value: 'hammered out' }, { label: 'hammered in', value: 'hammered in' }, { label: 'hammered up', value: 'hammered up' }, { label: 'hammered on', value: 'hammered on' }],
    correctAnswer: 'hammered out', points: 2, orderIndex: 96, tags: ['phrasal verbs', 'literary']
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'FILL_BLANK', skill: 'VOCABULARY',
    questionText: 'The board decided to ___ ___ key stakeholders before announcing the restructuring.',
    correctAnswer: 'sound out', points: 2, orderIndex: 97, tags: ['phrasal verbs', 'literary']
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'The government has pledged to ___ public spending to reduce the national debt.',
    options: [{ label: 'rein in', value: 'rein in' }, { label: 'rein out', value: 'rein out' }, { label: 'rein off', value: 'rein off' }, { label: 'rein up', value: 'rein up' }],
    correctAnswer: 'rein in', points: 2, orderIndex: 98, tags: ['phrasal verbs', 'literary']
  },
]
