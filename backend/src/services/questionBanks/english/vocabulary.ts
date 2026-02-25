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
    options: [{ label: 'A', value: 'do' }, { label: 'B', value: 'make' }, { label: 'C', value: 'take' }, { label: 'D', value: 'get' }],
    correctAnswer: 'make', points: 1, orderIndex: 41, tags: ['collocations', 'daily life']
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'The weather was so bad that we had to ___ the picnic.',
    options: [{ label: 'A', value: 'cancel' }, { label: 'B', value: 'stop' }, { label: 'C', value: 'close' }, { label: 'D', value: 'break' }],
    correctAnswer: 'cancel', points: 1, orderIndex: 42, tags: ['weather', 'daily life']
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Can you ___ me a favour and post this letter?',
    options: [{ label: 'A', value: 'make' }, { label: 'B', value: 'give' }, { label: 'C', value: 'do' }, { label: 'D', value: 'have' }],
    correctAnswer: 'do', points: 1, orderIndex: 43, tags: ['collocations', 'requests']
  },

  // ============================================================
  // B1 — Intermediate (4 questions)
  // ============================================================
  {
    language: 'English', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'The company decided to ___ 200 new employees this year.',
    options: [{ label: 'A', value: 'fire' }, { label: 'B', value: 'hire' }, { label: 'C', value: 'retire' }, { label: 'D', value: 'resign' }],
    correctAnswer: 'hire', points: 1, orderIndex: 44, tags: ['business', 'employment']
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'She\'s very ___ — she always thinks about other people\'s feelings.',
    options: [{ label: 'A', value: 'sensible' }, { label: 'B', value: 'sensitive' }, { label: 'C', value: 'senseless' }, { label: 'D', value: 'sentimental' }],
    correctAnswer: 'sensitive', points: 1, orderIndex: 45, tags: ['personality', 'adjectives']
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'The hotel has excellent ___ — a swimming pool, gym, and spa.',
    options: [{ label: 'A', value: 'facilities' }, { label: 'B', value: 'furniture' }, { label: 'C', value: 'equipment' }, { label: 'D', value: 'appliances' }],
    correctAnswer: 'facilities', points: 1, orderIndex: 46, tags: ['travel', 'nouns']
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'I\'m afraid I can\'t ___ to buy a new car right now.',
    options: [{ label: 'A', value: 'afford' }, { label: 'B', value: 'allow' }, { label: 'C', value: 'offer' }, { label: 'D', value: 'provide' }],
    correctAnswer: 'afford', points: 1, orderIndex: 47, tags: ['money', 'verbs']
  },

  // ============================================================
  // B2 — Upper Intermediate (4 questions)
  // ============================================================
  {
    language: 'English', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'The government has ___ new regulations to protect the environment.',
    options: [{ label: 'A', value: 'introduced' }, { label: 'B', value: 'invented' }, { label: 'C', value: 'discovered' }, { label: 'D', value: 'produced' }],
    correctAnswer: 'introduced', points: 1, orderIndex: 48, tags: ['government', 'formal']
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'The documentary shed light on the ___ consequences of pollution.',
    options: [{ label: 'A', value: 'devastating' }, { label: 'B', value: 'devoting' }, { label: 'C', value: 'devoted' }, { label: 'D', value: 'developed' }],
    correctAnswer: 'devastating', points: 1, orderIndex: 49, tags: ['environment', 'adjectives']
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'She has a great ___ of humour and always makes people laugh.',
    options: [{ label: 'A', value: 'sense' }, { label: 'B', value: 'feeling' }, { label: 'C', value: 'meaning' }, { label: 'D', value: 'taste' }],
    correctAnswer: 'sense', points: 1, orderIndex: 50, tags: ['collocations', 'personality']
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'The committee ___ the proposal unanimously.',
    options: [{ label: 'A', value: 'approved' }, { label: 'B', value: 'improved' }, { label: 'C', value: 'proved' }, { label: 'D', value: 'applied' }],
    correctAnswer: 'approved', points: 1, orderIndex: 51, tags: ['business', 'formal']
  },

  // ============================================================
  // C1 — Advanced (2 questions)
  // ============================================================
  {
    language: 'English', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'The politician\'s speech was deliberately ___ to avoid committing to any position.',
    options: [{ label: 'A', value: 'ambiguous' }, { label: 'B', value: 'ambitious' }, { label: 'C', value: 'anonymous' }, { label: 'D', value: 'analogous' }],
    correctAnswer: 'ambiguous', points: 1, orderIndex: 52, tags: ['politics', 'advanced adjectives']
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Her ___ attention to detail makes her the ideal candidate for the role.',
    options: [{ label: 'A', value: 'meticulous' }, { label: 'B', value: 'malicious' }, { label: 'C', value: 'miraculous' }, { label: 'D', value: 'mischievous' }],
    correctAnswer: 'meticulous', points: 1, orderIndex: 53, tags: ['work', 'advanced adjectives']
  },

  // ============================================================
  // C2 — Proficiency (2 questions)
  // ============================================================
  {
    language: 'English', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'The artist\'s work is a ___ blend of tradition and innovation.',
    options: [{ label: 'A', value: 'seamless' }, { label: 'B', value: 'seaming' }, { label: 'C', value: 'seemly' }, { label: 'D', value: 'seeming' }],
    correctAnswer: 'seamless', points: 1, orderIndex: 54, tags: ['art', 'advanced adjectives']
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'The professor\'s ___ explanation left even the advanced students struggling to follow.',
    options: [{ label: 'A', value: 'convoluted' }, { label: 'B', value: 'consolidated' }, { label: 'C', value: 'contemplated' }, { label: 'D', value: 'congregated' }],
    correctAnswer: 'convoluted', points: 1, orderIndex: 55, tags: ['academic', 'advanced adjectives']
  },
]
