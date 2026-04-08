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
    questionText: 'He ___ to work every day.',
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

  // ============================================================
  // NEW QUESTIONS 41-100 (60 additional questions, 10 per level)
  // ============================================================

  // ============================================================
  // A1 — Beginner (41-50)
  // ============================================================
  {
    language: 'English', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'She ___ a red car.',
    options: [{ label: 'have', value: 'have' }, { label: 'has', value: 'has' }, { label: 'having', value: 'having' }, { label: 'haves', value: 'haves' }],
    correctAnswer: 'has', points: 1, orderIndex: 41, tags: ['have', 'third person']
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'The colleagues ___ in the meeting room now.',
    options: [{ label: 'talk', value: 'talk' }, { label: 'talks', value: 'talks' }, { label: 'are talking', value: 'are talking' }, { label: 'talked', value: 'talked' }],
    correctAnswer: 'are talking', points: 1, orderIndex: 42, tags: ['present continuous']
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'My manager ___ not like delays.',
    options: [{ label: 'do', value: 'do' }, { label: 'does', value: 'does' }, { label: 'is', value: 'is' }, { label: 'are', value: 'are' }],
    correctAnswer: 'does', points: 1, orderIndex: 43, tags: ['present simple', 'negation']
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'The keys are ___ the table.',
    options: [{ label: 'in', value: 'in' }, { label: 'on', value: 'on' }, { label: 'at', value: 'at' }, { label: 'to', value: 'to' }],
    correctAnswer: 'on', points: 1, orderIndex: 44, tags: ['prepositions']
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'There ___ three meetings today.',
    options: [{ label: 'is', value: 'is' }, { label: 'are', value: 'are' }, { label: 'am', value: 'am' }, { label: 'be', value: 'be' }],
    correctAnswer: 'are', points: 1, orderIndex: 45, tags: ['there is/are']
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'He lives ___ London.',
    options: [{ label: 'on', value: 'on' }, { label: 'at', value: 'at' }, { label: 'in', value: 'in' }, { label: 'to', value: 'to' }],
    correctAnswer: 'in', points: 1, orderIndex: 46, tags: ['prepositions']
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '___ is your name?',
    options: [{ label: 'Who', value: 'Who' }, { label: 'What', value: 'What' }, { label: 'Where', value: 'Where' }, { label: 'When', value: 'When' }],
    correctAnswer: 'What', points: 1, orderIndex: 47, tags: ['question words']
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'I ___ an accountant. I work at a firm.',
    options: [{ label: 'is', value: 'is' }, { label: 'am', value: 'am' }, { label: 'are', value: 'are' }, { label: 'be', value: 'be' }],
    correctAnswer: 'am', points: 1, orderIndex: 48, tags: ['verb to be']
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'She ___ breakfast every morning at 7.',
    options: [{ label: 'eat', value: 'eat' }, { label: 'eats', value: 'eats' }, { label: 'eating', value: 'eating' }, { label: 'eaten', value: 'eaten' }],
    correctAnswer: 'eats', points: 1, orderIndex: 49, tags: ['present simple', 'third person']
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'I go to work ___ bus.',
    options: [{ label: 'in', value: 'in' }, { label: 'on', value: 'on' }, { label: 'by', value: 'by' }, { label: 'with', value: 'with' }],
    correctAnswer: 'by', points: 1, orderIndex: 50, tags: ['prepositions', 'transport']
  },

  // ============================================================
  // A2 — Elementary (51-60)
  // ============================================================
  {
    language: 'English', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'We ___ to the beach last weekend.',
    options: [{ label: 'go', value: 'go' }, { label: 'goes', value: 'goes' }, { label: 'went', value: 'went' }, { label: 'going', value: 'going' }],
    correctAnswer: 'went', points: 1, orderIndex: 51, tags: ['past simple']
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'This is the ___ movie I have ever seen.',
    options: [{ label: 'good', value: 'good' }, { label: 'better', value: 'better' }, { label: 'best', value: 'best' }, { label: 'most good', value: 'most good' }],
    correctAnswer: 'best', points: 1, orderIndex: 52, tags: ['superlatives']
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'She ___ cook very well. Her food is always delicious.',
    options: [{ label: 'can', value: 'can' }, { label: 'must', value: 'must' }, { label: 'should', value: 'should' }, { label: 'will', value: 'will' }],
    correctAnswer: 'can', points: 1, orderIndex: 53, tags: ['modals', 'ability']
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'I ___ my report when my colleague called.',
    options: [{ label: 'did', value: 'did' }, { label: 'was doing', value: 'was doing' }, { label: 'do', value: 'do' }, { label: 'have done', value: 'have done' }],
    correctAnswer: 'was doing', points: 1, orderIndex: 54, tags: ['past continuous']
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'He arrived ___ the airport at 6 o\'clock.',
    options: [{ label: 'in', value: 'in' }, { label: 'on', value: 'on' }, { label: 'at', value: 'at' }, { label: 'to', value: 'to' }],
    correctAnswer: 'at', points: 1, orderIndex: 55, tags: ['prepositions']
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'I ___ see the doctor tomorrow morning.',
    options: [{ label: 'going to', value: 'going to' }, { label: 'am going to', value: 'am going to' }, { label: 'will to', value: 'will to' }, { label: 'go to', value: 'go to' }],
    correctAnswer: 'am going to', points: 1, orderIndex: 56, tags: ['going to', 'future']
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'She has ___ finished her lunch.',
    options: [{ label: 'yet', value: 'yet' }, { label: 'already', value: 'already' }, { label: 'still', value: 'still' }, { label: 'since', value: 'since' }],
    correctAnswer: 'already', points: 1, orderIndex: 57, tags: ['present perfect', 'adverbs']
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'The letter ___ written by my grandfather.',
    options: [{ label: 'is', value: 'is' }, { label: 'was', value: 'was' }, { label: 'were', value: 'were' }, { label: 'are', value: 'are' }],
    correctAnswer: 'was', points: 1, orderIndex: 58, tags: ['passive voice', 'past simple']
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'You ___ wear a helmet when you ride a motorbike.',
    options: [{ label: 'can', value: 'can' }, { label: 'might', value: 'might' }, { label: 'must', value: 'must' }, { label: 'could', value: 'could' }],
    correctAnswer: 'must', points: 1, orderIndex: 59, tags: ['modals', 'obligation']
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'I haven\'t seen her ___ last Monday.',
    options: [{ label: 'for', value: 'for' }, { label: 'since', value: 'since' }, { label: 'from', value: 'from' }, { label: 'ago', value: 'ago' }],
    correctAnswer: 'since', points: 1, orderIndex: 60, tags: ['present perfect', 'for/since']
  },

  // ============================================================
  // B1 — Intermediate (61-70)
  // ============================================================
  {
    language: 'English', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'If it rains tomorrow, we ___ stay at home.',
    options: [{ label: 'would', value: 'would' }, { label: 'will', value: 'will' }, { label: 'would have', value: 'would have' }, { label: 'are', value: 'are' }],
    correctAnswer: 'will', points: 1, orderIndex: 61, tags: ['first conditional']
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'He told me that he ___ the book the day before.',
    options: [{ label: 'bought', value: 'bought' }, { label: 'had bought', value: 'had bought' }, { label: 'has bought', value: 'has bought' }, { label: 'buys', value: 'buys' }],
    correctAnswer: 'had bought', points: 1, orderIndex: 62, tags: ['reported speech', 'past perfect']
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'The woman ___ lives next door is a doctor.',
    options: [{ label: 'who', value: 'who' }, { label: 'which', value: 'which' }, { label: 'whose', value: 'whose' }, { label: 'whom', value: 'whom' }],
    correctAnswer: 'who', points: 1, orderIndex: 63, tags: ['relative clauses']
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'The email ___ sent to all employees yesterday.',
    options: [{ label: 'is', value: 'is' }, { label: 'was', value: 'was' }, { label: 'has', value: 'has' }, { label: 'were', value: 'were' }],
    correctAnswer: 'was', points: 1, orderIndex: 64, tags: ['passive voice', 'past simple']
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'You ___ to study harder if you want to pass the exam.',
    options: [{ label: 'must', value: 'must' }, { label: 'ought', value: 'ought' }, { label: 'should', value: 'should' }, { label: 'can', value: 'can' }],
    correctAnswer: 'ought', points: 1, orderIndex: 65, tags: ['modals', 'advice']
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'She asked me where I ___.',
    options: [{ label: 'live', value: 'live' }, { label: 'lived', value: 'lived' }, { label: 'living', value: 'living' }, { label: 'am live', value: 'am live' }],
    correctAnswer: 'lived', points: 1, orderIndex: 66, tags: ['reported speech', 'questions']
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'I\'ve been waiting here ___ two hours.',
    options: [{ label: 'since', value: 'since' }, { label: 'for', value: 'for' }, { label: 'from', value: 'from' }, { label: 'during', value: 'during' }],
    correctAnswer: 'for', points: 1, orderIndex: 67, tags: ['present perfect continuous', 'for/since']
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'If I ___ you, I would apologize to her.',
    options: [{ label: 'am', value: 'am' }, { label: 'was', value: 'was' }, { label: 'were', value: 'were' }, { label: 'be', value: 'be' }],
    correctAnswer: 'were', points: 1, orderIndex: 68, tags: ['second conditional']
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'The building ___ we had the meeting was very old.',
    options: [{ label: 'who', value: 'who' }, { label: 'where', value: 'where' }, { label: 'which', value: 'which' }, { label: 'whose', value: 'whose' }],
    correctAnswer: 'where', points: 1, orderIndex: 69, tags: ['relative clauses']
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'She is used to ___ early in the morning.',
    options: [{ label: 'wake', value: 'wake' }, { label: 'waking', value: 'waking' }, { label: 'woke', value: 'woke' }, { label: 'waken', value: 'waken' }],
    correctAnswer: 'waking', points: 1, orderIndex: 70, tags: ['gerund', 'used to']
  },

  // ============================================================
  // B2 — Upper Intermediate (71-80)
  // ============================================================
  {
    language: 'English', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'If she ___ the truth, she would have told us.',
    options: [{ label: 'knew', value: 'knew' }, { label: 'had known', value: 'had known' }, { label: 'knows', value: 'knows' }, { label: 'has known', value: 'has known' }],
    correctAnswer: 'had known', points: 2, orderIndex: 71, tags: ['third conditional']
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'He insisted ___ paying for dinner.',
    options: [{ label: 'to', value: 'to' }, { label: 'on', value: 'on' }, { label: 'for', value: 'for' }, { label: 'in', value: 'in' }],
    correctAnswer: 'on', points: 2, orderIndex: 72, tags: ['verb patterns', 'prepositions']
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'The new law, ___ was approved last week, will take effect in January.',
    options: [{ label: 'that', value: 'that' }, { label: 'which', value: 'which' }, { label: 'who', value: 'who' }, { label: 'what', value: 'what' }],
    correctAnswer: 'which', points: 2, orderIndex: 73, tags: ['relative clauses', 'non-defining']
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'She can\'t ___ left already — the meeting doesn\'t start until 3.',
    options: [{ label: 'have', value: 'have' }, { label: 'has', value: 'has' }, { label: 'be', value: 'be' }, { label: 'had', value: 'had' }],
    correctAnswer: 'have', points: 2, orderIndex: 74, tags: ['modal perfect', 'deduction']
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Seldom ___ such a brilliant performance.',
    options: [{ label: 'have I seen', value: 'have I seen' }, { label: 'I have seen', value: 'I have seen' }, { label: 'I saw', value: 'I saw' }, { label: 'did I saw', value: 'did I saw' }],
    correctAnswer: 'have I seen', points: 2, orderIndex: 75, tags: ['inversion']
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'I\'d rather you ___ smoke in here.',
    options: [{ label: 'don\'t', value: 'don\'t' }, { label: 'didn\'t', value: 'didn\'t' }, { label: 'won\'t', value: 'won\'t' }, { label: 'not', value: 'not' }],
    correctAnswer: 'didn\'t', points: 2, orderIndex: 76, tags: ['subjunctive', 'would rather']
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'The report ___ by the time the manager arrives.',
    options: [{ label: 'will finish', value: 'will finish' }, { label: 'will have been finished', value: 'will have been finished' }, { label: 'will be finishing', value: 'will be finishing' }, { label: 'finishes', value: 'finishes' }],
    correctAnswer: 'will have been finished', points: 2, orderIndex: 77, tags: ['future perfect passive']
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'He apologized ___ being late to the meeting.',
    options: [{ label: 'about', value: 'about' }, { label: 'for', value: 'for' }, { label: 'of', value: 'of' }, { label: 'to', value: 'to' }],
    correctAnswer: 'for', points: 2, orderIndex: 78, tags: ['reporting verbs', 'prepositions']
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'No sooner ___ the door than the phone rang.',
    options: [{ label: 'I had opened', value: 'I had opened' }, { label: 'had I opened', value: 'had I opened' }, { label: 'I opened', value: 'I opened' }, { label: 'did I open', value: 'did I open' }],
    correctAnswer: 'had I opened', points: 2, orderIndex: 79, tags: ['inversion', 'no sooner']
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'She demanded that the manager ___ her a full refund.',
    options: [{ label: 'gives', value: 'gives' }, { label: 'give', value: 'give' }, { label: 'gave', value: 'gave' }, { label: 'giving', value: 'giving' }],
    correctAnswer: 'give', points: 2, orderIndex: 80, tags: ['subjunctive', 'demand']
  },

  // ============================================================
  // C1 — Advanced (81-90)
  // ============================================================
  {
    language: 'English', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Not until the results were published ___ the extent of the problem.',
    options: [{ label: 'we realized', value: 'we realized' }, { label: 'did we realize', value: 'did we realize' }, { label: 'we did realize', value: 'we did realize' }, { label: 'realized we', value: 'realized we' }],
    correctAnswer: 'did we realize', points: 2, orderIndex: 81, tags: ['inversion', 'not until']
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'She is thought ___ the company for over a decade before retiring.',
    options: [{ label: 'to lead', value: 'to lead' }, { label: 'to have led', value: 'to have led' }, { label: 'leading', value: 'leading' }, { label: 'to be leading', value: 'to be leading' }],
    correctAnswer: 'to have led', points: 2, orderIndex: 82, tags: ['passive reporting', 'perfect infinitive']
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Had the government acted sooner, the crisis ___ averted.',
    options: [{ label: 'would be', value: 'would be' }, { label: 'could have been', value: 'could have been' }, { label: 'will be', value: 'will be' }, { label: 'can be', value: 'can be' }],
    correctAnswer: 'could have been', points: 2, orderIndex: 83, tags: ['inversion', 'third conditional']
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'The proposal requires that each member ___ a written response.',
    options: [{ label: 'submits', value: 'submits' }, { label: 'submit', value: 'submit' }, { label: 'submitted', value: 'submitted' }, { label: 'will submit', value: 'will submit' }],
    correctAnswer: 'submit', points: 2, orderIndex: 84, tags: ['subjunctive']
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Much ___ I admire her work, I cannot agree with her conclusions.',
    options: [{ label: 'as', value: 'as' }, { label: 'so', value: 'so' }, { label: 'that', value: 'that' }, { label: 'like', value: 'like' }],
    correctAnswer: 'as', points: 2, orderIndex: 85, tags: ['concession', 'much as']
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'She needn\'t ___ worried — the test turned out to be easy.',
    options: [{ label: 'have', value: 'have' }, { label: 'has', value: 'has' }, { label: 'be', value: 'be' }, { label: 'had', value: 'had' }],
    correctAnswer: 'have', points: 2, orderIndex: 86, tags: ['modal perfect', 'needn\'t have']
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'The athlete, ___ record had stood for twenty years, was finally beaten.',
    options: [{ label: 'who', value: 'who' }, { label: 'whose', value: 'whose' }, { label: 'which', value: 'which' }, { label: 'whom', value: 'whom' }],
    correctAnswer: 'whose', points: 2, orderIndex: 87, tags: ['relative clauses', 'non-defining']
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Only after the investigation ___ was the full scale of the fraud revealed.',
    options: [{ label: 'completed', value: 'completed' }, { label: 'was completed', value: 'was completed' }, { label: 'had completed', value: 'had completed' }, { label: 'completing', value: 'completing' }],
    correctAnswer: 'was completed', points: 2, orderIndex: 88, tags: ['inversion', 'passive voice']
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'It is essential that the information ___ kept confidential.',
    options: [{ label: 'is', value: 'is' }, { label: 'be', value: 'be' }, { label: 'was', value: 'was' }, { label: 'will be', value: 'will be' }],
    correctAnswer: 'be', points: 2, orderIndex: 89, tags: ['subjunctive']
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'The new software, ___ to which all data was transferred, proved unreliable.',
    options: [{ label: 'in', value: 'in' }, { label: 'on', value: 'on' }, { label: 'to', value: 'to' }, { label: 'for', value: 'for' }],
    correctAnswer: 'to', points: 2, orderIndex: 90, tags: ['relative clauses', 'prepositions']
  },

  // ============================================================
  // C2 — Proficiency (91-100)
  // ============================================================
  {
    language: 'English', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'At no point ___ the defendant show any remorse for his actions.',
    options: [{ label: 'did', value: 'did' }, { label: 'has', value: 'has' }, { label: 'was', value: 'was' }, { label: 'does', value: 'does' }],
    correctAnswer: 'did', points: 2, orderIndex: 91, tags: ['negative inversion']
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Were the committee to ___ the proposal, it would set a dangerous precedent.',
    options: [{ label: 'accept', value: 'accept' }, { label: 'accepted', value: 'accepted' }, { label: 'accepting', value: 'accepting' }, { label: 'have accepted', value: 'have accepted' }],
    correctAnswer: 'accept', points: 2, orderIndex: 92, tags: ['inversion', 'conditional', 'subjunctive']
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'The manuscript is rumored ___ smuggled out of the country during the war.',
    options: [{ label: 'to be', value: 'to be' }, { label: 'to have been', value: 'to have been' }, { label: 'being', value: 'being' }, { label: 'having been', value: 'having been' }],
    correctAnswer: 'to have been', points: 2, orderIndex: 93, tags: ['passive reporting', 'perfect infinitive']
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Not a single word ___ during the entire proceedings.',
    options: [{ label: 'she uttered', value: 'she uttered' }, { label: 'did she utter', value: 'did she utter' }, { label: 'she did utter', value: 'she did utter' }, { label: 'uttered she', value: 'uttered she' }],
    correctAnswer: 'did she utter', points: 2, orderIndex: 94, tags: ['negative inversion']
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'The board recommended that the CEO ___ with immediate effect.',
    options: [{ label: 'resigns', value: 'resigns' }, { label: 'resign', value: 'resign' }, { label: 'resigned', value: 'resigned' }, { label: 'will resign', value: 'will resign' }],
    correctAnswer: 'resign', points: 2, orderIndex: 95, tags: ['subjunctive']
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Scarcely had the curtain risen ___ the audience erupted in applause.',
    options: [{ label: 'than', value: 'than' }, { label: 'when', value: 'when' }, { label: 'that', value: 'that' }, { label: 'before', value: 'before' }],
    correctAnswer: 'when', points: 2, orderIndex: 96, tags: ['inversion', 'scarcely...when']
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'The sculpture, ___ provenance remains disputed, sold for millions at auction.',
    options: [{ label: 'which', value: 'which' }, { label: 'whose', value: 'whose' }, { label: 'that', value: 'that' }, { label: 'of which', value: 'of which' }],
    correctAnswer: 'whose', points: 2, orderIndex: 97, tags: ['relative clauses']
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'So intricate ___ the argument that few could follow it.',
    options: [{ label: 'is', value: 'is' }, { label: 'was', value: 'was' }, { label: 'has been', value: 'has been' }, { label: 'being', value: 'being' }],
    correctAnswer: 'was', points: 2, orderIndex: 98, tags: ['inversion', 'so...that']
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'He ___ well have known about the fraud, but he chose to look the other way.',
    options: [{ label: 'shall', value: 'shall' }, { label: 'may', value: 'may' }, { label: 'should', value: 'should' }, { label: 'would', value: 'would' }],
    correctAnswer: 'may', points: 2, orderIndex: 99, tags: ['modals', 'speculation']
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Only by understanding the nuances of the language ___ one truly appreciate its literature.',
    options: [{ label: 'could', value: 'could' }, { label: 'can', value: 'can' }, { label: 'should', value: 'should' }, { label: 'would', value: 'would' }],
    correctAnswer: 'can', points: 2, orderIndex: 100, tags: ['inversion', 'only by']
  },

  // ============================================================
  // FILL_BLANK — Grammar (30 questions: 5 per CEFR level)
  // ============================================================

  // A1 — Basic conjugation & articles
  {
    language: 'English', cefrLevel: 'A1', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Complete: She ___ a teacher. (be, present simple)',
    correctAnswer: 'is', points: 1, orderIndex: 101, tags: ['verb to be', 'present simple']
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Complete: They ___ from Italy. (be, present simple)',
    correctAnswer: 'are', points: 1, orderIndex: 102, tags: ['verb to be', 'present simple']
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Complete: I ___ a meeting at 10. (have, present simple)',
    correctAnswer: 'have', points: 1, orderIndex: 103, tags: ['have', 'present simple']
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Complete: He ___ to the office every day. (go, present simple)',
    correctAnswer: 'goes', points: 1, orderIndex: 104, tags: ['present simple', 'third person']
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Complete: There ___ a book on the table. (be, present simple)',
    correctAnswer: 'is', points: 1, orderIndex: 105, tags: ['there is', 'present simple']
  },

  // A2 — Past tense & pronouns
  {
    language: 'English', cefrLevel: 'A2', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Complete: Yesterday I ___ to the cinema. (go, past simple)',
    correctAnswer: 'went', points: 1, orderIndex: 106, tags: ['past simple', 'irregular verbs']
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Complete: She ___ watching TV when I called. (be, past continuous)',
    correctAnswer: 'was', points: 1, orderIndex: 107, tags: ['past continuous', 'verb to be']
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Complete: This book belongs to ___. (I, object pronoun)',
    correctAnswer: 'me', points: 1, orderIndex: 108, tags: ['object pronouns']
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Complete: My sister is ___ than me. (tall, comparative)',
    correctAnswer: 'taller', points: 1, orderIndex: 109, tags: ['comparatives']
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Complete: I have never ___ sushi. (eat, past participle)',
    correctAnswer: 'eaten', points: 1, orderIndex: 110, tags: ['present perfect', 'past participle']
  },

  // B1 — Conditional & modal verbs
  {
    language: 'English', cefrLevel: 'B1', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Complete: If it rains, I ___ stay at home. (will/would)',
    correctAnswer: 'will', points: 1, orderIndex: 111, tags: ['first conditional']
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Complete: You ___ see a doctor. You look terrible. (should/modal advice)',
    correctAnswer: 'should', points: 1, orderIndex: 112, tags: ['modals', 'advice']
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Complete: By the time we arrived, the film ___ started. (have, past perfect)',
    correctAnswer: 'had', points: 1, orderIndex: 113, tags: ['past perfect']
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Complete: She told me she ___ busy the day before. (be, reported speech)',
    correctAnswer: 'had been', points: 1, orderIndex: 114, tags: ['reported speech', 'past perfect']
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Complete: I enjoy ___ with international clients. (work, gerund)',
    correctAnswer: 'working', points: 1, orderIndex: 115, tags: ['gerund', 'verb patterns']
  },

  // B2 — Complex structures
  {
    language: 'English', cefrLevel: 'B2', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Complete: If I had studied harder, I ___ passed the exam. (conditional perfect)',
    correctAnswer: 'would have', points: 2, orderIndex: 116, tags: ['third conditional']
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Complete: The report is said ___ been leaked. (infinitive, passive reporting)',
    correctAnswer: 'to have', points: 2, orderIndex: 117, tags: ['passive reporting', 'perfect infinitive']
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Complete: I wish I ___ more time to travel. (have, subjunctive)',
    correctAnswer: 'had', points: 2, orderIndex: 118, tags: ['wish', 'subjunctive']
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Complete: The house ___ built in 1920. (be, passive voice past simple)',
    correctAnswer: 'was', points: 2, orderIndex: 119, tags: ['passive voice', 'past simple']
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Complete: He denied ___ the window. (break, gerund)',
    correctAnswer: 'breaking', points: 2, orderIndex: 120, tags: ['gerund', 'reporting verbs']
  },

  // C1 — Literary & advanced forms
  {
    language: 'English', cefrLevel: 'C1', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Complete: Not only did she win, ___ she also broke the record. (conjunction)',
    correctAnswer: 'but', points: 2, orderIndex: 121, tags: ['inversion', 'correlative conjunctions']
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Complete: Hardly ___ I sat down when the phone rang. (have, inversion)',
    correctAnswer: 'had', points: 2, orderIndex: 122, tags: ['inversion', 'hardly']
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Complete: The CEO insisted that every employee ___ the training. (attend, subjunctive)',
    correctAnswer: 'attend', points: 2, orderIndex: 123, tags: ['subjunctive', 'insist']
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Complete: She must ___ left already — her car is gone. (have, modal perfect)',
    correctAnswer: 'have', points: 2, orderIndex: 124, tags: ['modal perfect', 'deduction']
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Complete: It is high time we ___ a decision. (make, subjunctive)',
    correctAnswer: 'made', points: 2, orderIndex: 125, tags: ['it\'s time', 'subjunctive']
  },

  // C2 — Subtle distinctions
  {
    language: 'English', cefrLevel: 'C2', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Complete: So remarkable ___ the discovery that it changed the field. (be, inversion)',
    correctAnswer: 'was', points: 2, orderIndex: 126, tags: ['inversion', 'so...that']
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Complete: Were he ___ apologise, I might forgive him. (to, inversion conditional)',
    correctAnswer: 'to', points: 2, orderIndex: 127, tags: ['inversion', 'conditional']
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Complete: The committee demanded that the proposal ___ revised. (be, subjunctive)',
    correctAnswer: 'be', points: 2, orderIndex: 128, tags: ['subjunctive', 'demand']
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Complete: You ___ not have taken the risk — it was unnecessary. (need, modal perfect)',
    correctAnswer: 'need', points: 2, orderIndex: 129, tags: ['modal perfect', 'needn\'t have']
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Complete: Under no circumstances ___ employees to leave early. (be, negative inversion)',
    correctAnswer: 'are', points: 2, orderIndex: 130, tags: ['negative inversion', 'formal register']
  },

  // ============================================================
  // VARIED LANGUAGE REGISTERS — 18 questions (orderIndex 131-148)
  // ============================================================

  // A1 — Varied Registers
  {
    language: 'English', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '[Business Email] "Dear Mr. Lopez, I ___ writing to confirm our meeting on Thursday."',
    options: [{ label: 'am', value: 'am' }, { label: 'is', value: 'is' }, { label: 'are', value: 'are' }, { label: 'be', value: 'be' }],
    correctAnswer: 'am', points: 1, orderIndex: 131, tags: ['verb to be', 'formal register', 'email']
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '[Text Message] "hey, u ___ coming tonight?"',
    options: [{ label: 'is', value: 'is' }, { label: 'are', value: 'are' }, { label: 'am', value: 'am' }, { label: 'be', value: 'be' }],
    correctAnswer: 'are', points: 1, orderIndex: 132, tags: ['verb to be', 'informal register', 'text message']
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '[Spoken Colloquial] "so basically she ___ like, no way!"',
    options: [{ label: 'is', value: 'is' }, { label: 'was', value: 'was' }, { label: 'are', value: 'are' }, { label: 'were', value: 'were' }],
    correctAnswer: 'was', points: 1, orderIndex: 133, tags: ['verb to be', 'colloquial register', 'spoken']
  },

  // A2 — Varied Registers
  {
    language: 'English', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '[Formal Complaint] "I would like to ___ a complaint about the service I received yesterday."',
    options: [{ label: 'make', value: 'make' }, { label: 'do', value: 'do' }, { label: 'put', value: 'put' }, { label: 'give', value: 'give' }],
    correctAnswer: 'make', points: 1, orderIndex: 134, tags: ['collocations', 'formal register', 'complaint']
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '[WhatsApp] "just ___ home, what r u doing?"',
    options: [{ label: 'got', value: 'got' }, { label: 'getted', value: 'getted' }, { label: 'get', value: 'get' }, { label: 'getting', value: 'getting' }],
    correctAnswer: 'got', points: 1, orderIndex: 135, tags: ['past simple', 'informal register', 'chat']
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '[Phone Call] "Could you ___ me through to the sales department, please?"',
    options: [{ label: 'put', value: 'put' }, { label: 'make', value: 'make' }, { label: 'take', value: 'take' }, { label: 'get', value: 'get' }],
    correctAnswer: 'put', points: 1, orderIndex: 136, tags: ['phrasal verbs', 'formal register', 'phone']
  },

  // B1 — Varied Registers
  {
    language: 'English', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '[Corporate Presentation] "As you can see from the data, sales ___ by 15% this quarter."',
    options: [{ label: 'have increased', value: 'have increased' }, { label: 'has increased', value: 'has increased' }, { label: 'are increasing', value: 'are increasing' }, { label: 'increased', value: 'increased' }],
    correctAnswer: 'have increased', points: 1, orderIndex: 137, tags: ['present perfect', 'formal register', 'presentation']
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '[Social Media] "Can\'t believe they ___ the price again!! #inflation"',
    options: [{ label: 'raised', value: 'raised' }, { label: 'have raised', value: 'have raised' }, { label: 'rise', value: 'rise' }, { label: 'raising', value: 'raising' }],
    correctAnswer: 'have raised', points: 1, orderIndex: 138, tags: ['present perfect', 'informal register', 'social media']
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '[News Headline] "Minister ___ to resign amid scandal"',
    options: [{ label: 'expected', value: 'expected' }, { label: 'expects', value: 'expects' }, { label: 'expecting', value: 'expecting' }, { label: 'is expected', value: 'is expected' }],
    correctAnswer: 'expected', points: 1, orderIndex: 139, tags: ['passive voice', 'headline register', 'news']
  },

  // B2 — Varied Registers
  {
    language: 'English', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '[Legal Contract] "The tenant ___ hereby agree to the terms and conditions set forth in this agreement."',
    options: [{ label: 'does', value: 'does' }, { label: 'shall', value: 'shall' }, { label: 'will', value: 'will' }, { label: 'may', value: 'may' }],
    correctAnswer: 'does', points: 2, orderIndex: 140, tags: ['modals', 'legal register', 'contract']
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '[Journalism] "Had it not ___ for the last-minute intervention, the deal would have collapsed entirely."',
    options: [{ label: 'been', value: 'been' }, { label: 'was', value: 'was' }, { label: 'be', value: 'be' }, { label: 'being', value: 'being' }],
    correctAnswer: 'been', points: 2, orderIndex: 141, tags: ['inversion', 'third conditional', 'journalistic register']
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '[Ironic/Sarcastic] "Oh sure, because ___ everyone just loves Monday morning meetings."',
    options: [{ label: 'obviously', value: 'obviously' }, { label: 'apparently', value: 'apparently' }, { label: 'supposedly', value: 'supposedly' }, { label: 'clearly', value: 'clearly' }],
    correctAnswer: 'obviously', points: 2, orderIndex: 142, tags: ['adverbs', 'sarcastic register', 'spoken']
  },

  // C1 — Varied Registers
  {
    language: 'English', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '[Academic Paper] "The findings ___ corroborated by three subsequent peer-reviewed studies."',
    options: [{ label: 'were', value: 'were' }, { label: 'was', value: 'was' }, { label: 'have', value: 'have' }, { label: 'had', value: 'had' }],
    correctAnswer: 'were', points: 2, orderIndex: 143, tags: ['passive voice', 'academic register', 'research']
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '[Diplomatic] "The delegation ___ to express its reservations regarding the proposed amendment."',
    options: [{ label: 'wishes', value: 'wishes' }, { label: 'wants', value: 'wants' }, { label: 'likes', value: 'likes' }, { label: 'needs', value: 'needs' }],
    correctAnswer: 'wishes', points: 2, orderIndex: 144, tags: ['formal verbs', 'diplomatic register', 'politics']
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '[Literary] "Scarcely ___ she spoken when the sky darkened and thunder rolled across the valley."',
    options: [{ label: 'had', value: 'had' }, { label: 'has', value: 'has' }, { label: 'did', value: 'did' }, { label: 'was', value: 'was' }],
    correctAnswer: 'had', points: 2, orderIndex: 145, tags: ['inversion', 'literary register', 'scarcely']
  },

  // C2 — Varied Registers
  {
    language: 'English', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '[Legal Archaic] "Notwithstanding the aforementioned, the party ___ be held liable for any damages incurred."',
    options: [{ label: 'shall', value: 'shall' }, { label: 'will', value: 'will' }, { label: 'can', value: 'can' }, { label: 'may', value: 'may' }],
    correctAnswer: 'shall', points: 2, orderIndex: 146, tags: ['modals', 'legal archaic register', 'liability']
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '[Slang/Dialectal] "She\'s been proper ___ about that exam, ain\'t she?"',
    options: [{ label: 'stressing', value: 'stressing' }, { label: 'stressed', value: 'stressed' }, { label: 'stress', value: 'stress' }, { label: 'stresses', value: 'stresses' }],
    correctAnswer: 'stressing', points: 2, orderIndex: 147, tags: ['present perfect continuous', 'British slang', 'dialectal register']
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '[Rhetorical/Oratory] "Not only ___ we failed, but we have failed spectacularly and without remorse."',
    options: [{ label: 'have', value: 'have' }, { label: 'did', value: 'did' }, { label: 'had', value: 'had' }, { label: 'do', value: 'do' }],
    correctAnswer: 'have', points: 2, orderIndex: 148, tags: ['inversion', 'rhetorical register', 'oratory']
  },
]
