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
    passage: 'She don\'t like chocolate.',
    questionText: 'Find and correct the error in this sentence.',
    correctAnswer: 'She doesn\'t like chocolate.|She does not like chocolate.',
    points: 1, orderIndex: 1, tags: ['present simple', 'negation']
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'He goed to the store yesterday.',
    questionText: 'Find and correct the error in this sentence.',
    correctAnswer: 'He went to the store yesterday.',
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
    passage: 'Neither the teacher nor the students was aware of the change.',
    questionText: 'Find and correct the error in this sentence.',
    correctAnswer: 'Neither the teacher nor the students were aware of the change.',
    points: 1, orderIndex: 9, tags: ['subject-verb agreement', 'neither/nor']
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'The research, along with its implications, have been widely discussed.',
    questionText: 'Find and correct the error in this sentence.',
    correctAnswer: 'The research, along with its implications, has been widely discussed.',
    points: 1, orderIndex: 10, tags: ['subject-verb agreement', 'parenthetical']
  },
]
