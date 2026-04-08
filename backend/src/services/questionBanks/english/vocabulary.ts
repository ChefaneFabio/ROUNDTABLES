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
]
