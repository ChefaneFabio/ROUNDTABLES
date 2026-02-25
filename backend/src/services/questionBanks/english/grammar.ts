import { MultiSkillQuestionData } from '../types'

// English Grammar MCQ Questions — 40 questions from Jean's placement test (Q1-Q40)
// Distributed across A1-C2 levels

export const englishGrammarQuestions: MultiSkillQuestionData[] = [
  // ============================================================
  // A1 — Beginner (8 questions)
  // ============================================================
  {
    language: 'English', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'She ___ a student.',
    options: [{ label: 'A', value: 'am' }, { label: 'B', value: 'is' }, { label: 'C', value: 'are' }, { label: 'D', value: 'be' }],
    correctAnswer: 'is', points: 1, orderIndex: 1, tags: ['verb to be']
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'They ___ from Brazil.',
    options: [{ label: 'A', value: 'is' }, { label: 'B', value: 'am' }, { label: 'C', value: 'are' }, { label: 'D', value: 'be' }],
    correctAnswer: 'are', points: 1, orderIndex: 2, tags: ['verb to be']
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'I ___ two brothers.',
    options: [{ label: 'A', value: 'has' }, { label: 'B', value: 'have' }, { label: 'C', value: 'having' }, { label: 'D', value: 'am have' }],
    correctAnswer: 'have', points: 1, orderIndex: 3, tags: ['have']
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '___ you like coffee?',
    options: [{ label: 'A', value: 'Does' }, { label: 'B', value: 'Do' }, { label: 'C', value: 'Are' }, { label: 'D', value: 'Is' }],
    correctAnswer: 'Do', points: 1, orderIndex: 4, tags: ['present simple', 'questions']
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'He ___ to school every day.',
    options: [{ label: 'A', value: 'go' }, { label: 'B', value: 'goes' }, { label: 'C', value: 'going' }, { label: 'D', value: 'gone' }],
    correctAnswer: 'goes', points: 1, orderIndex: 5, tags: ['present simple', 'third person']
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'There ___ a book on the table.',
    options: [{ label: 'A', value: 'is' }, { label: 'B', value: 'are' }, { label: 'C', value: 'am' }, { label: 'D', value: 'be' }],
    correctAnswer: 'is', points: 1, orderIndex: 6, tags: ['there is/are']
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'This is ___ umbrella.',
    options: [{ label: 'A', value: 'a' }, { label: 'B', value: 'an' }, { label: 'C', value: 'the' }, { label: 'D', value: '--' }],
    correctAnswer: 'an', points: 1, orderIndex: 7, tags: ['articles']
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'We ___ TV right now.',
    options: [{ label: 'A', value: 'watch' }, { label: 'B', value: 'watches' }, { label: 'C', value: 'are watching' }, { label: 'D', value: 'watched' }],
    correctAnswer: 'are watching', points: 1, orderIndex: 8, tags: ['present continuous']
  },

  // ============================================================
  // A2 — Elementary (8 questions)
  // ============================================================
  {
    language: 'English', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'She ___ to the cinema last night.',
    options: [{ label: 'A', value: 'go' }, { label: 'B', value: 'goes' }, { label: 'C', value: 'went' }, { label: 'D', value: 'gone' }],
    correctAnswer: 'went', points: 1, orderIndex: 9, tags: ['past simple']
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'He is ___ than his brother.',
    options: [{ label: 'A', value: 'tall' }, { label: 'B', value: 'taller' }, { label: 'C', value: 'tallest' }, { label: 'D', value: 'more tall' }],
    correctAnswer: 'taller', points: 1, orderIndex: 10, tags: ['comparatives']
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'I ___ never ___ sushi before.',
    options: [{ label: 'A', value: 'have / eaten' }, { label: 'B', value: 'has / eaten' }, { label: 'C', value: 'have / eat' }, { label: 'D', value: 'did / eat' }],
    correctAnswer: 'have / eaten', points: 1, orderIndex: 11, tags: ['present perfect']
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'They ___ football when it started raining.',
    options: [{ label: 'A', value: 'played' }, { label: 'B', value: 'were playing' }, { label: 'C', value: 'play' }, { label: 'D', value: 'are playing' }],
    correctAnswer: 'were playing', points: 1, orderIndex: 12, tags: ['past continuous']
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'You ___ smoke in the hospital.',
    options: [{ label: 'A', value: 'must' }, { label: 'B', value: 'mustn\'t' }, { label: 'C', value: 'don\'t have to' }, { label: 'D', value: 'should' }],
    correctAnswer: 'mustn\'t', points: 1, orderIndex: 13, tags: ['modals', 'obligation']
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'I\'m going ___ my grandmother tomorrow.',
    options: [{ label: 'A', value: 'visit' }, { label: 'B', value: 'visiting' }, { label: 'C', value: 'to visit' }, { label: 'D', value: 'visited' }],
    correctAnswer: 'to visit', points: 1, orderIndex: 14, tags: ['going to', 'future']
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '___ you ever been to London?',
    options: [{ label: 'A', value: 'Did' }, { label: 'B', value: 'Have' }, { label: 'C', value: 'Do' }, { label: 'D', value: 'Were' }],
    correctAnswer: 'Have', points: 1, orderIndex: 15, tags: ['present perfect', 'experience']
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'The book ___ by millions of people.',
    options: [{ label: 'A', value: 'read' }, { label: 'B', value: 'is read' }, { label: 'C', value: 'reads' }, { label: 'D', value: 'reading' }],
    correctAnswer: 'is read', points: 1, orderIndex: 16, tags: ['passive voice']
  },

  // ============================================================
  // B1 — Intermediate (8 questions)
  // ============================================================
  {
    language: 'English', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'If I ___ rich, I would travel the world.',
    options: [{ label: 'A', value: 'am' }, { label: 'B', value: 'was' }, { label: 'C', value: 'were' }, { label: 'D', value: 'be' }],
    correctAnswer: 'were', points: 1, orderIndex: 17, tags: ['second conditional']
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'She said she ___ coming to the party.',
    options: [{ label: 'A', value: 'is' }, { label: 'B', value: 'was' }, { label: 'C', value: 'will be' }, { label: 'D', value: 'has been' }],
    correctAnswer: 'was', points: 1, orderIndex: 18, tags: ['reported speech']
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'I wish I ___ more time to study.',
    options: [{ label: 'A', value: 'have' }, { label: 'B', value: 'had' }, { label: 'C', value: 'has' }, { label: 'D', value: 'having' }],
    correctAnswer: 'had', points: 1, orderIndex: 19, tags: ['wish']
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'The man ___ car was stolen called the police.',
    options: [{ label: 'A', value: 'who' }, { label: 'B', value: 'whose' }, { label: 'C', value: 'which' }, { label: 'D', value: 'whom' }],
    correctAnswer: 'whose', points: 1, orderIndex: 20, tags: ['relative clauses']
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'By the time we arrived, the film ___.',
    options: [{ label: 'A', value: 'started' }, { label: 'B', value: 'has started' }, { label: 'C', value: 'had started' }, { label: 'D', value: 'starts' }],
    correctAnswer: 'had started', points: 1, orderIndex: 21, tags: ['past perfect']
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'He suggested ___ to the new restaurant.',
    options: [{ label: 'A', value: 'go' }, { label: 'B', value: 'to go' }, { label: 'C', value: 'going' }, { label: 'D', value: 'went' }],
    correctAnswer: 'going', points: 1, orderIndex: 22, tags: ['gerund', 'verb patterns']
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'You ___ have told me earlier!',
    options: [{ label: 'A', value: 'must' }, { label: 'B', value: 'should' }, { label: 'C', value: 'can' }, { label: 'D', value: 'would' }],
    correctAnswer: 'should', points: 1, orderIndex: 23, tags: ['modals', 'criticism']
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'I\'ve been living here ___ 2015.',
    options: [{ label: 'A', value: 'for' }, { label: 'B', value: 'since' }, { label: 'C', value: 'from' }, { label: 'D', value: 'during' }],
    correctAnswer: 'since', points: 1, orderIndex: 24, tags: ['present perfect continuous', 'for/since']
  },

  // ============================================================
  // B2 — Upper Intermediate (8 questions)
  // ============================================================
  {
    language: 'English', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Not only ___ late, but he also forgot the documents.',
    options: [{ label: 'A', value: 'he was' }, { label: 'B', value: 'was he' }, { label: 'C', value: 'he is' }, { label: 'D', value: 'did he' }],
    correctAnswer: 'was he', points: 1, orderIndex: 25, tags: ['inversion']
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'If I had studied harder, I ___ the exam.',
    options: [{ label: 'A', value: 'would pass' }, { label: 'B', value: 'would have passed' }, { label: 'C', value: 'will pass' }, { label: 'D', value: 'had passed' }],
    correctAnswer: 'would have passed', points: 1, orderIndex: 26, tags: ['third conditional']
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'The project ___ by the end of next month.',
    options: [{ label: 'A', value: 'will complete' }, { label: 'B', value: 'will be completed' }, { label: 'C', value: 'will have completed' }, { label: 'D', value: 'will be completing' }],
    correctAnswer: 'will be completed', points: 1, orderIndex: 27, tags: ['future passive']
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'He denied ___ the window.',
    options: [{ label: 'A', value: 'break' }, { label: 'B', value: 'to break' }, { label: 'C', value: 'breaking' }, { label: 'D', value: 'broke' }],
    correctAnswer: 'breaking', points: 1, orderIndex: 28, tags: ['gerund', 'reporting verbs']
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '___ the weather had been better, we would have gone hiking.',
    options: [{ label: 'A', value: 'If' }, { label: 'B', value: 'Had' }, { label: 'C', value: 'Unless' }, { label: 'D', value: 'Should' }],
    correctAnswer: 'Had', points: 1, orderIndex: 29, tags: ['inversion', 'conditional']
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'It\'s high time we ___ a decision.',
    options: [{ label: 'A', value: 'make' }, { label: 'B', value: 'made' }, { label: 'C', value: 'making' }, { label: 'D', value: 'will make' }],
    correctAnswer: 'made', points: 1, orderIndex: 30, tags: ['it\'s time', 'subjunctive']
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'She must ___ the bus; she\'s always on time.',
    options: [{ label: 'A', value: 'miss' }, { label: 'B', value: 'have missed' }, { label: 'C', value: 'be missing' }, { label: 'D', value: 'to miss' }],
    correctAnswer: 'have missed', points: 1, orderIndex: 31, tags: ['modal perfect']
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'The more you practice, ___ you\'ll become.',
    options: [{ label: 'A', value: 'better' }, { label: 'B', value: 'the better' }, { label: 'C', value: 'the best' }, { label: 'D', value: 'best' }],
    correctAnswer: 'the better', points: 1, orderIndex: 32, tags: ['double comparatives']
  },

  // ============================================================
  // C1 — Advanced (4 questions)
  // ============================================================
  {
    language: 'English', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Hardly ___ the house when it started to rain.',
    options: [{ label: 'A', value: 'I had left' }, { label: 'B', value: 'had I left' }, { label: 'C', value: 'I left' }, { label: 'D', value: 'did I leave' }],
    correctAnswer: 'had I left', points: 1, orderIndex: 33, tags: ['inversion', 'hardly']
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Were it not for his help, I ___ in serious trouble.',
    options: [{ label: 'A', value: 'would be' }, { label: 'B', value: 'will be' }, { label: 'C', value: 'am' }, { label: 'D', value: 'had been' }],
    correctAnswer: 'would be', points: 1, orderIndex: 34, tags: ['inversion', 'conditional']
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'The report is believed ___ several errors.',
    options: [{ label: 'A', value: 'to contain' }, { label: 'B', value: 'containing' }, { label: 'C', value: 'it contains' }, { label: 'D', value: 'that contains' }],
    correctAnswer: 'to contain', points: 1, orderIndex: 35, tags: ['passive reporting']
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'By this time tomorrow, we ___ for 24 hours straight.',
    options: [{ label: 'A', value: 'will work' }, { label: 'B', value: 'will be working' }, { label: 'C', value: 'will have been working' }, { label: 'D', value: 'are working' }],
    correctAnswer: 'will have been working', points: 1, orderIndex: 36, tags: ['future perfect continuous']
  },

  // ============================================================
  // C2 — Proficiency (4 questions)
  // ============================================================
  {
    language: 'English', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'So ___ was the damage that the building had to be demolished.',
    options: [{ label: 'A', value: 'extensive' }, { label: 'B', value: 'extent' }, { label: 'C', value: 'extended' }, { label: 'D', value: 'extending' }],
    correctAnswer: 'extensive', points: 1, orderIndex: 37, tags: ['so...that', 'inversion']
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Under no circumstances ___ to leave the building during the drill.',
    options: [{ label: 'A', value: 'are employees permitted' }, { label: 'B', value: 'employees are permitted' }, { label: 'C', value: 'permitted employees are' }, { label: 'D', value: 'employees permitted are' }],
    correctAnswer: 'are employees permitted', points: 1, orderIndex: 38, tags: ['negative inversion']
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'The government is thought ___ the new policy last year.',
    options: [{ label: 'A', value: 'to introduce' }, { label: 'B', value: 'to have introduced' }, { label: 'C', value: 'introducing' }, { label: 'D', value: 'having introduced' }],
    correctAnswer: 'to have introduced', points: 1, orderIndex: 39, tags: ['passive reporting', 'perfect infinitive']
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Little ___ that the decision would have such far-reaching consequences.',
    options: [{ label: 'A', value: 'they realized' }, { label: 'B', value: 'did they realize' }, { label: 'C', value: 'they did realize' }, { label: 'D', value: 'realized they' }],
    correctAnswer: 'did they realize', points: 1, orderIndex: 40, tags: ['negative inversion']
  },
]
