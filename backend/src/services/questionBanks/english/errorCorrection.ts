import { MultiSkillQuestionData } from '../types'

// English Error Correction Questions — 10 questions (Section 4 from Jean's test)
// Student reads an erroneous sentence and must type the corrected version
// passage = the sentence with the error
// questionText = instruction
// correctAnswer = the corrected sentence (pipe-separated alternatives)

export const englishErrorCorrectionQuestions: MultiSkillQuestionData[] = [
  // ============================================================
  // A2 — Elementary (2 questions)
  // ============================================================
  {
    language: 'English', cefrLevel: 'A2', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'She don\'t like deadlines.',
    questionText: 'Find and correct the error in this sentence.',
    correctAnswer: 'She doesn\'t like deadlines.|She does not like deadlines.',
    points: 1, orderIndex: 1, tags: ['present simple', 'negation']
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'He goed to the office yesterday.',
    questionText: 'Find and correct the error in this sentence.',
    correctAnswer: 'He went to the office yesterday.',
    points: 1, orderIndex: 2, tags: ['past simple', 'irregular verbs']
  },

  // ============================================================
  // B1 — Intermediate (3 questions)
  // ============================================================
  {
    language: 'English', cefrLevel: 'B1', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'I have been living here since five years.',
    questionText: 'Find and correct the error in this sentence.',
    correctAnswer: 'I have been living here for five years.',
    points: 1, orderIndex: 3, tags: ['for/since', 'present perfect continuous']
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Despite of the rain, we went for a walk.',
    questionText: 'Find and correct the error in this sentence.',
    correctAnswer: 'Despite the rain, we went for a walk.|In spite of the rain, we went for a walk.',
    points: 1, orderIndex: 4, tags: ['despite', 'prepositions']
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'If I will see him, I will tell him.',
    questionText: 'Find and correct the error in this sentence.',
    correctAnswer: 'If I see him, I will tell him.',
    points: 1, orderIndex: 5, tags: ['first conditional']
  },

  // ============================================================
  // B2 — Upper Intermediate (3 questions)
  // ============================================================
  {
    language: 'English', cefrLevel: 'B2', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'The informations you gave me were very useful.',
    questionText: 'Find and correct the error in this sentence.',
    correctAnswer: 'The information you gave me was very useful.',
    points: 1, orderIndex: 6, tags: ['uncountable nouns']
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'He suggested me to take a different route.',
    questionText: 'Find and correct the error in this sentence.',
    correctAnswer: 'He suggested that I take a different route.|He suggested taking a different route.|He suggested I take a different route.',
    points: 1, orderIndex: 7, tags: ['suggest', 'verb patterns']
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'I\'m used to get up early in the morning.',
    questionText: 'Find and correct the error in this sentence.',
    correctAnswer: 'I\'m used to getting up early in the morning.',
    points: 1, orderIndex: 8, tags: ['used to', 'gerund']
  },

  // ============================================================
  // C1 — Advanced (2 questions)
  // ============================================================
  {
    language: 'English', cefrLevel: 'C1', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Neither the manager nor the employees was aware of the change.',
    questionText: 'Find and correct the error in this sentence.',
    correctAnswer: 'Neither the manager nor the employees were aware of the change.',
    points: 1, orderIndex: 9, tags: ['subject-verb agreement', 'neither/nor']
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'The research, along with its implications, have been widely discussed.',
    questionText: 'Find and correct the error in this sentence.',
    correctAnswer: 'The research, along with its implications, has been widely discussed.',
    points: 1, orderIndex: 10, tags: ['subject-verb agreement', 'parenthetical']
  },

  // ============================================================
  // NEW QUESTIONS — 20 more (orderIndex 11-30)
  // ============================================================

  // A2 — Elementary (5 questions)
  {
    language: 'English', cefrLevel: 'A2', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'I am agree with you.',
    questionText: 'Find and correct the error in this sentence.',
    correctAnswer: 'I agree with you.',
    points: 1, orderIndex: 11, tags: ['verb patterns', 'agree']
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'There is many employees in the department.',
    questionText: 'Find and correct the error in this sentence.',
    correctAnswer: 'There are many employees in the department.',
    points: 1, orderIndex: 12, tags: ['there is/are', 'subject-verb agreement']
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'She can to manage a team very well.',
    questionText: 'Find and correct the error in this sentence.',
    correctAnswer: 'She can manage a team very well.',
    points: 1, orderIndex: 13, tags: ['modal verbs', 'infinitive']
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'I have visited Paris last year.',
    questionText: 'Find and correct the error in this sentence.',
    correctAnswer: 'I visited Paris last year.',
    points: 1, orderIndex: 14, tags: ['present perfect vs past simple']
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'He always is late for meetings.',
    questionText: 'Find and correct the error in this sentence.',
    correctAnswer: 'He is always late for meetings.',
    points: 1, orderIndex: 15, tags: ['adverb position', 'frequency']
  },

  // B1 — Intermediate (5 questions)
  {
    language: 'English', cefrLevel: 'B1', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'I am used to wake up early every morning.',
    questionText: 'Find and correct the error in this sentence.',
    correctAnswer: 'I am used to waking up early every morning.',
    points: 1, orderIndex: 16, tags: ['used to', 'gerund']
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'He told me that he will come tomorrow.',
    questionText: 'Find and correct the error in this sentence.',
    correctAnswer: 'He told me that he would come the next day.|He told me that he would come tomorrow.',
    points: 1, orderIndex: 17, tags: ['reported speech', 'tense shift']
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'I look forward to hear from you.',
    questionText: 'Find and correct the error in this sentence.',
    correctAnswer: 'I look forward to hearing from you.',
    points: 1, orderIndex: 18, tags: ['phrasal verbs', 'gerund']
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Although it was raining, but we went out.',
    questionText: 'Find and correct the error in this sentence.',
    correctAnswer: 'Although it was raining, we went out.|It was raining, but we went out.',
    points: 1, orderIndex: 19, tags: ['conjunctions', 'although/but']
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'She suggested him to take a taxi.',
    questionText: 'Find and correct the error in this sentence.',
    correctAnswer: 'She suggested that he take a taxi.|She suggested taking a taxi.|She suggested he take a taxi.',
    points: 1, orderIndex: 20, tags: ['suggest', 'verb patterns']
  },

  // B2 — Upper Intermediate (5 questions)
  {
    language: 'English', cefrLevel: 'B2', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'He denied to have stolen the money.',
    questionText: 'Find and correct the error in this sentence.',
    correctAnswer: 'He denied having stolen the money.|He denied stealing the money.',
    points: 1, orderIndex: 21, tags: ['deny', 'gerund']
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'The more you practice, more you improve.',
    questionText: 'Find and correct the error in this sentence.',
    correctAnswer: 'The more you practice, the more you improve.',
    points: 1, orderIndex: 22, tags: ['comparative', 'the...the']
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'I wish I can speak French fluently.',
    questionText: 'Find and correct the error in this sentence.',
    correctAnswer: 'I wish I could speak French fluently.',
    points: 1, orderIndex: 23, tags: ['wish', 'subjunctive']
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'She is one of the kindest person I have ever met.',
    questionText: 'Find and correct the error in this sentence.',
    correctAnswer: 'She is one of the kindest people I have ever met.',
    points: 1, orderIndex: 24, tags: ['plural', 'superlative']
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Despite of being tired, she continued working.',
    questionText: 'Find and correct the error in this sentence.',
    correctAnswer: 'Despite being tired, she continued working.|In spite of being tired, she continued working.',
    points: 1, orderIndex: 25, tags: ['despite', 'prepositions']
  },

  // C1 — Advanced (5 questions)
  {
    language: 'English', cefrLevel: 'C1', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Hardly he had arrived when the meeting started.',
    questionText: 'Find and correct the error in this sentence.',
    correctAnswer: 'Hardly had he arrived when the meeting started.',
    points: 1, orderIndex: 26, tags: ['inversion', 'hardly']
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'The committee have not yet reached their decision, despite they have been deliberating for hours.',
    questionText: 'Find and correct the error in this sentence.',
    correctAnswer: 'The committee have not yet reached their decision, despite having been deliberating for hours.|The committee has not yet reached its decision, despite having been deliberating for hours.',
    points: 1, orderIndex: 27, tags: ['despite', 'gerund clause']
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Were it not for his help, I would have been failed the exam.',
    questionText: 'Find and correct the error in this sentence.',
    correctAnswer: 'Were it not for his help, I would have failed the exam.',
    points: 1, orderIndex: 28, tags: ['conditional', 'inversion', 'passive']
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'The number of applicants who has applied this year has increased significantly.',
    questionText: 'Find and correct the error in this sentence.',
    correctAnswer: 'The number of applicants who have applied this year has increased significantly.',
    points: 1, orderIndex: 29, tags: ['subject-verb agreement', 'relative clause']
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'It is essential that every employee submits their report by Friday.',
    questionText: 'Find and correct the error in this sentence.',
    correctAnswer: 'It is essential that every employee submit their report by Friday.',
    points: 1, orderIndex: 30, tags: ['subjunctive', 'mandative']
  },
]
