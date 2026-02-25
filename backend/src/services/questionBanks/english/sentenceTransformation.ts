import { MultiSkillQuestionData } from '../types'

// English Sentence Transformation Questions — 10 questions (Section 5 from Jean's test)
// Student reads the original sentence and rewrites it according to the instruction
// passage = the original sentence
// questionText = the transformation instruction
// correctAnswer = accepted version(s) pipe-separated

export const englishSentenceTransformationQuestions: MultiSkillQuestionData[] = [
  // ============================================================
  // A2 — Elementary (2 questions)
  // ============================================================
  {
    language: 'English', cefrLevel: 'A2', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'I started learning English three years ago.',
    questionText: 'Rewrite beginning with: I have...',
    correctAnswer: 'I have been learning English for three years.|I have learnt English for three years.|I have learned English for three years.',
    points: 1, orderIndex: 1, tags: ['present perfect', 'for/ago']
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'It isn\'t necessary to wear a uniform.',
    questionText: 'Rewrite using: don\'t have to',
    correctAnswer: 'You don\'t have to wear a uniform.|We don\'t have to wear a uniform.',
    points: 1, orderIndex: 2, tags: ['modals', 'obligation']
  },

  // ============================================================
  // B1 — Intermediate (3 questions)
  // ============================================================
  {
    language: 'English', cefrLevel: 'B1', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'People say that he is very rich.',
    questionText: 'Rewrite beginning with: He is said...',
    correctAnswer: 'He is said to be very rich.',
    points: 1, orderIndex: 3, tags: ['passive reporting']
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: '"I will call you tomorrow," she said.',
    questionText: 'Rewrite in reported speech beginning with: She said...',
    correctAnswer: 'She said she would call me the next day.|She said that she would call me the following day.|She said she would call me the following day.',
    points: 1, orderIndex: 4, tags: ['reported speech']
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'I regret not studying harder at school.',
    questionText: 'Rewrite beginning with: I wish...',
    correctAnswer: 'I wish I had studied harder at school.',
    points: 1, orderIndex: 5, tags: ['wish', 'past perfect']
  },

  // ============================================================
  // B2 — Upper Intermediate (3 questions)
  // ============================================================
  {
    language: 'English', cefrLevel: 'B2', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'They believe the thieves entered through a back window.',
    questionText: 'Rewrite beginning with: The thieves are believed...',
    correctAnswer: 'The thieves are believed to have entered through a back window.',
    points: 1, orderIndex: 6, tags: ['passive reporting', 'perfect infinitive']
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'The film was so boring that we left halfway through.',
    questionText: 'Rewrite using: such',
    correctAnswer: 'It was such a boring film that we left halfway through.',
    points: 1, orderIndex: 7, tags: ['so/such']
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'I didn\'t realize the importance of the meeting, so I didn\'t attend.',
    questionText: 'Rewrite beginning with: Had I...',
    correctAnswer: 'Had I realized the importance of the meeting, I would have attended.',
    points: 1, orderIndex: 8, tags: ['inversion', 'third conditional']
  },

  // ============================================================
  // C1 — Advanced (2 questions)
  // ============================================================
  {
    language: 'English', cefrLevel: 'C1', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'He not only finished the report but also prepared the presentation.',
    questionText: 'Rewrite beginning with: Not only...',
    correctAnswer: 'Not only did he finish the report but he also prepared the presentation.|Not only did he finish the report, but he also prepared the presentation.',
    points: 1, orderIndex: 9, tags: ['inversion', 'not only']
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'It\'s possible that she missed the train.',
    questionText: 'Rewrite using a modal verb of deduction.',
    correctAnswer: 'She may have missed the train.|She might have missed the train.|She could have missed the train.',
    points: 1, orderIndex: 10, tags: ['modal perfect', 'deduction']
  },
]
