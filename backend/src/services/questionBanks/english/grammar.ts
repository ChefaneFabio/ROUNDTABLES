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
    options: [{ label: 'am', value: 'am' }, { label: 'is', value: 'is' }, { label: 'are', value: 'are' }, { label: 'be', value: 'be' }],
    correctAnswer: 'is', points: 1, orderIndex: 1, tags: ['verb to be']
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'They ___ from Brazil.',
    options: [{ label: 'is', value: 'is' }, { label: 'am', value: 'am' }, { label: 'are', value: 'are' }, { label: 'be', value: 'be' }],
    correctAnswer: 'are', points: 1, orderIndex: 2, tags: ['verb to be']
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'I ___ two brothers.',
    options: [{ label: 'has', value: 'has' }, { label: 'have', value: 'have' }, { label: 'having', value: 'having' }, { label: 'am have', value: 'am have' }],
    correctAnswer: 'have', points: 1, orderIndex: 3, tags: ['have']
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '___ you like coffee?',
    options: [{ label: 'Does', value: 'Does' }, { label: 'Do', value: 'Do' }, { label: 'Are', value: 'Are' }, { label: 'Is', value: 'Is' }],
    correctAnswer: 'Do', points: 1, orderIndex: 4, tags: ['present simple', 'questions']
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'He ___ to school every day.',
    options: [{ label: 'go', value: 'go' }, { label: 'goes', value: 'goes' }, { label: 'going', value: 'going' }, { label: 'gone', value: 'gone' }],
    correctAnswer: 'goes', points: 1, orderIndex: 5, tags: ['present simple', 'third person']
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'There ___ a book on the table.',
    options: [{ label: 'is', value: 'is' }, { label: 'are', value: 'are' }, { label: 'am', value: 'am' }, { label: 'be', value: 'be' }],
    correctAnswer: 'is', points: 1, orderIndex: 6, tags: ['there is/are']
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'This is ___ umbrella.',
    options: [{ label: 'a', value: 'a' }, { label: 'an', value: 'an' }, { label: 'the', value: 'the' }, { label: '--', value: '--' }],
    correctAnswer: 'an', points: 1, orderIndex: 7, tags: ['articles']
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'We ___ TV right now.',
    options: [{ label: 'watch', value: 'watch' }, { label: 'watches', value: 'watches' }, { label: 'are watching', value: 'are watching' }, { label: 'watched', value: 'watched' }],
    correctAnswer: 'are watching', points: 1, orderIndex: 8, tags: ['present continuous']
  },

  // ============================================================
  // A2 — Elementary (8 questions)
  // ============================================================
  {
    language: 'English', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'She ___ to the cinema last night.',
    options: [{ label: 'go', value: 'go' }, { label: 'goes', value: 'goes' }, { label: 'went', value: 'went' }, { label: 'gone', value: 'gone' }],
    correctAnswer: 'went', points: 1, orderIndex: 9, tags: ['past simple']
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'He is ___ than his brother.',
    options: [{ label: 'tall', value: 'tall' }, { label: 'taller', value: 'taller' }, { label: 'tallest', value: 'tallest' }, { label: 'more tall', value: 'more tall' }],
    correctAnswer: 'taller', points: 1, orderIndex: 10, tags: ['comparatives']
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'I ___ never ___ sushi before.',
    options: [{ label: 'have / eaten', value: 'have / eaten' }, { label: 'has / eaten', value: 'has / eaten' }, { label: 'have / eat', value: 'have / eat' }, { label: 'did / eat', value: 'did / eat' }],
    correctAnswer: 'have / eaten', points: 1, orderIndex: 11, tags: ['present perfect']
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'They ___ football when it started raining.',
    options: [{ label: 'played', value: 'played' }, { label: 'were playing', value: 'were playing' }, { label: 'play', value: 'play' }, { label: 'are playing', value: 'are playing' }],
    correctAnswer: 'were playing', points: 1, orderIndex: 12, tags: ['past continuous']
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'You ___ smoke in the hospital.',
    options: [{ label: 'must', value: 'must' }, { label: 'mustn\'t', value: 'mustn\'t' }, { label: 'don\'t have to', value: 'don\'t have to' }, { label: 'should', value: 'should' }],
    correctAnswer: 'mustn\'t', points: 1, orderIndex: 13, tags: ['modals', 'obligation']
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'I\'m going ___ my grandmother tomorrow.',
    options: [{ label: 'visit', value: 'visit' }, { label: 'visiting', value: 'visiting' }, { label: 'to visit', value: 'to visit' }, { label: 'visited', value: 'visited' }],
    correctAnswer: 'to visit', points: 1, orderIndex: 14, tags: ['going to', 'future']
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '___ you ever been to London?',
    options: [{ label: 'Did', value: 'Did' }, { label: 'Have', value: 'Have' }, { label: 'Do', value: 'Do' }, { label: 'Were', value: 'Were' }],
    correctAnswer: 'Have', points: 1, orderIndex: 15, tags: ['present perfect', 'experience']
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'The book ___ by millions of people.',
    options: [{ label: 'read', value: 'read' }, { label: 'is read', value: 'is read' }, { label: 'reads', value: 'reads' }, { label: 'reading', value: 'reading' }],
    correctAnswer: 'is read', points: 1, orderIndex: 16, tags: ['passive voice']
  },

  // ============================================================
  // B1 — Intermediate (8 questions)
  // ============================================================
  {
    language: 'English', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'If I ___ rich, I would travel the world.',
    options: [{ label: 'am', value: 'am' }, { label: 'was', value: 'was' }, { label: 'were', value: 'were' }, { label: 'be', value: 'be' }],
    correctAnswer: 'were', points: 1, orderIndex: 17, tags: ['second conditional']
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'She said she ___ coming to the party.',
    options: [{ label: 'is', value: 'is' }, { label: 'was', value: 'was' }, { label: 'will be', value: 'will be' }, { label: 'has been', value: 'has been' }],
    correctAnswer: 'was', points: 1, orderIndex: 18, tags: ['reported speech']
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'I wish I ___ more time to study.',
    options: [{ label: 'have', value: 'have' }, { label: 'had', value: 'had' }, { label: 'has', value: 'has' }, { label: 'having', value: 'having' }],
    correctAnswer: 'had', points: 1, orderIndex: 19, tags: ['wish']
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'The man ___ car was stolen called the police.',
    options: [{ label: 'who', value: 'who' }, { label: 'whose', value: 'whose' }, { label: 'which', value: 'which' }, { label: 'whom', value: 'whom' }],
    correctAnswer: 'whose', points: 1, orderIndex: 20, tags: ['relative clauses']
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'By the time we arrived, the film ___.',
    options: [{ label: 'started', value: 'started' }, { label: 'has started', value: 'has started' }, { label: 'had started', value: 'had started' }, { label: 'starts', value: 'starts' }],
    correctAnswer: 'had started', points: 1, orderIndex: 21, tags: ['past perfect']
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'He suggested ___ to the new restaurant.',
    options: [{ label: 'go', value: 'go' }, { label: 'to go', value: 'to go' }, { label: 'going', value: 'going' }, { label: 'went', value: 'went' }],
    correctAnswer: 'going', points: 1, orderIndex: 22, tags: ['gerund', 'verb patterns']
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'You ___ have told me earlier!',
    options: [{ label: 'must', value: 'must' }, { label: 'should', value: 'should' }, { label: 'can', value: 'can' }, { label: 'would', value: 'would' }],
    correctAnswer: 'should', points: 1, orderIndex: 23, tags: ['modals', 'criticism']
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'I\'ve been living here ___ 2015.',
    options: [{ label: 'for', value: 'for' }, { label: 'since', value: 'since' }, { label: 'from', value: 'from' }, { label: 'during', value: 'during' }],
    correctAnswer: 'since', points: 1, orderIndex: 24, tags: ['present perfect continuous', 'for/since']
  },

  // ============================================================
  // B2 — Upper Intermediate (8 questions)
  // ============================================================
  {
    language: 'English', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Not only ___ late, but he also forgot the documents.',
    options: [{ label: 'he was', value: 'he was' }, { label: 'was he', value: 'was he' }, { label: 'he is', value: 'he is' }, { label: 'did he', value: 'did he' }],
    correctAnswer: 'was he', points: 1, orderIndex: 25, tags: ['inversion']
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'If I had studied harder, I ___ the exam.',
    options: [{ label: 'would pass', value: 'would pass' }, { label: 'would have passed', value: 'would have passed' }, { label: 'will pass', value: 'will pass' }, { label: 'had passed', value: 'had passed' }],
    correctAnswer: 'would have passed', points: 1, orderIndex: 26, tags: ['third conditional']
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'The project ___ by the end of next month.',
    options: [{ label: 'will complete', value: 'will complete' }, { label: 'will be completed', value: 'will be completed' }, { label: 'will have completed', value: 'will have completed' }, { label: 'will be completing', value: 'will be completing' }],
    correctAnswer: 'will be completed', points: 1, orderIndex: 27, tags: ['future passive']
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'He denied ___ the window.',
    options: [{ label: 'break', value: 'break' }, { label: 'to break', value: 'to break' }, { label: 'breaking', value: 'breaking' }, { label: 'broke', value: 'broke' }],
    correctAnswer: 'breaking', points: 1, orderIndex: 28, tags: ['gerund', 'reporting verbs']
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '___ the weather had been better, we would have gone hiking.',
    options: [{ label: 'If', value: 'If' }, { label: 'Had', value: 'Had' }, { label: 'Unless', value: 'Unless' }, { label: 'Should', value: 'Should' }],
    correctAnswer: 'Had', points: 1, orderIndex: 29, tags: ['inversion', 'conditional']
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'It\'s high time we ___ a decision.',
    options: [{ label: 'make', value: 'make' }, { label: 'made', value: 'made' }, { label: 'making', value: 'making' }, { label: 'will make', value: 'will make' }],
    correctAnswer: 'made', points: 1, orderIndex: 30, tags: ['it\'s time', 'subjunctive']
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'She must ___ the bus; she\'s always on time.',
    options: [{ label: 'miss', value: 'miss' }, { label: 'have missed', value: 'have missed' }, { label: 'be missing', value: 'be missing' }, { label: 'to miss', value: 'to miss' }],
    correctAnswer: 'have missed', points: 1, orderIndex: 31, tags: ['modal perfect']
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'The more you practice, ___ you\'ll become.',
    options: [{ label: 'better', value: 'better' }, { label: 'the better', value: 'the better' }, { label: 'the best', value: 'the best' }, { label: 'best', value: 'best' }],
    correctAnswer: 'the better', points: 1, orderIndex: 32, tags: ['double comparatives']
  },

  // ============================================================
  // C1 — Advanced (4 questions)
  // ============================================================
  {
    language: 'English', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Hardly ___ the house when it started to rain.',
    options: [{ label: 'I had left', value: 'I had left' }, { label: 'had I left', value: 'had I left' }, { label: 'I left', value: 'I left' }, { label: 'did I leave', value: 'did I leave' }],
    correctAnswer: 'had I left', points: 1, orderIndex: 33, tags: ['inversion', 'hardly']
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Were it not for his help, I ___ in serious trouble.',
    options: [{ label: 'would be', value: 'would be' }, { label: 'will be', value: 'will be' }, { label: 'am', value: 'am' }, { label: 'had been', value: 'had been' }],
    correctAnswer: 'would be', points: 1, orderIndex: 34, tags: ['inversion', 'conditional']
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'The report is believed ___ several errors.',
    options: [{ label: 'to contain', value: 'to contain' }, { label: 'containing', value: 'containing' }, { label: 'it contains', value: 'it contains' }, { label: 'that contains', value: 'that contains' }],
    correctAnswer: 'to contain', points: 1, orderIndex: 35, tags: ['passive reporting']
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'By this time tomorrow, we ___ for 24 hours straight.',
    options: [{ label: 'will work', value: 'will work' }, { label: 'will be working', value: 'will be working' }, { label: 'will have been working', value: 'will have been working' }, { label: 'are working', value: 'are working' }],
    correctAnswer: 'will have been working', points: 1, orderIndex: 36, tags: ['future perfect continuous']
  },

  // ============================================================
  // C2 — Proficiency (4 questions)
  // ============================================================
  {
    language: 'English', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'So ___ was the damage that the building had to be demolished.',
    options: [{ label: 'extensive', value: 'extensive' }, { label: 'extent', value: 'extent' }, { label: 'extended', value: 'extended' }, { label: 'extending', value: 'extending' }],
    correctAnswer: 'extensive', points: 1, orderIndex: 37, tags: ['so...that', 'inversion']
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Under no circumstances ___ to leave the building during the drill.',
    options: [{ label: 'are employees permitted', value: 'are employees permitted' }, { label: 'employees are permitted', value: 'employees are permitted' }, { label: 'permitted employees are', value: 'permitted employees are' }, { label: 'employees permitted are', value: 'employees permitted are' }],
    correctAnswer: 'are employees permitted', points: 1, orderIndex: 38, tags: ['negative inversion']
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'The government is thought ___ the new policy last year.',
    options: [{ label: 'to introduce', value: 'to introduce' }, { label: 'to have introduced', value: 'to have introduced' }, { label: 'introducing', value: 'introducing' }, { label: 'having introduced', value: 'having introduced' }],
    correctAnswer: 'to have introduced', points: 1, orderIndex: 39, tags: ['passive reporting', 'perfect infinitive']
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Little ___ that the decision would have such far-reaching consequences.',
    options: [{ label: 'they realized', value: 'they realized' }, { label: 'did they realize', value: 'did they realize' }, { label: 'they did realize', value: 'they did realize' }, { label: 'realized they', value: 'realized they' }],
    correctAnswer: 'did they realize', points: 1, orderIndex: 40, tags: ['negative inversion']
  },
]
