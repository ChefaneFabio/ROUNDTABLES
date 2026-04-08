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
    passage: 'I regret not studying harder at university.',
    questionText: 'Rewrite beginning with: I wish...',
    correctAnswer: 'I wish I had studied harder at university.',
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

  // ============================================================
  // NEW QUESTIONS — 20 more (orderIndex 11-30)
  // ============================================================

  // A2 (5 questions)
  {
    language: 'English', cefrLevel: 'A2', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'The book is very interesting.',
    questionText: 'Rewrite using: such',
    correctAnswer: 'It is such an interesting book.',
    points: 1, orderIndex: 11, tags: ['such', 'adjectives']
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'She is taller than her brother.',
    questionText: 'Rewrite beginning with: Her brother...',
    correctAnswer: 'Her brother is shorter than her.|Her brother is not as tall as her.|Her brother is shorter than she is.',
    points: 1, orderIndex: 12, tags: ['comparative', 'reversal']
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'They built this house in 1990.',
    questionText: 'Rewrite in the passive voice.',
    correctAnswer: 'This house was built in 1990.',
    points: 1, orderIndex: 13, tags: ['passive voice', 'past simple']
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'It is not allowed to park here.',
    questionText: 'Rewrite using: must not',
    correctAnswer: 'You must not park here.',
    points: 1, orderIndex: 14, tags: ['modals', 'prohibition']
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'I prefer tea to coffee.',
    questionText: 'Rewrite using: rather',
    correctAnswer: 'I would rather have tea than coffee.|I would rather drink tea than coffee.',
    points: 1, orderIndex: 15, tags: ['would rather', 'preference']
  },

  // B1 (5 questions)
  {
    language: 'English', cefrLevel: 'B1', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Someone stole my wallet yesterday.',
    questionText: 'Rewrite in the passive voice.',
    correctAnswer: 'My wallet was stolen yesterday.',
    points: 1, orderIndex: 16, tags: ['passive voice', 'past simple']
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: '"Don\'t touch the painting," the guard said to us.',
    questionText: 'Rewrite in reported speech beginning with: The guard told us...',
    correctAnswer: 'The guard told us not to touch the painting.',
    points: 1, orderIndex: 17, tags: ['reported speech', 'imperative']
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'It is possible that they are at home.',
    questionText: 'Rewrite using a modal verb.',
    correctAnswer: 'They may be at home.|They might be at home.|They could be at home.',
    points: 1, orderIndex: 18, tags: ['modals', 'possibility']
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'He is too young to drive a car.',
    questionText: 'Rewrite using: not old enough',
    correctAnswer: 'He is not old enough to drive a car.',
    points: 1, orderIndex: 19, tags: ['too/enough']
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'She started working here three years ago.',
    questionText: 'Rewrite beginning with: She has...',
    correctAnswer: 'She has worked here for three years.|She has been working here for three years.',
    points: 1, orderIndex: 20, tags: ['present perfect', 'duration']
  },

  // B2 (5 questions)
  {
    language: 'English', cefrLevel: 'B2', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'I last saw him in 2019.',
    questionText: 'Rewrite beginning with: I haven\'t...',
    correctAnswer: 'I haven\'t seen him since 2019.',
    points: 1, orderIndex: 21, tags: ['present perfect', 'since']
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'We couldn\'t go to the beach because it was raining.',
    questionText: 'Rewrite beginning with: If it...',
    correctAnswer: 'If it hadn\'t been raining, we could have gone to the beach.|If it had not been raining, we could have gone to the beach.',
    points: 1, orderIndex: 22, tags: ['third conditional']
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'They say the company will close next year.',
    questionText: 'Rewrite beginning with: The company...',
    correctAnswer: 'The company is said to be closing next year.|The company is said to close next year.',
    points: 1, orderIndex: 23, tags: ['passive reporting']
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'I would prefer to stay at home rather than go to the party.',
    questionText: 'Rewrite using: I\'d rather...',
    correctAnswer: 'I\'d rather stay at home than go to the party.',
    points: 1, orderIndex: 24, tags: ['would rather', 'preference']
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'She didn\'t study hard enough, so she failed the exam.',
    questionText: 'Rewrite beginning with: If she...',
    correctAnswer: 'If she had studied hard enough, she would have passed the exam.|If she had studied harder, she would not have failed the exam.',
    points: 1, orderIndex: 25, tags: ['third conditional']
  },

  // C1 (5 questions)
  {
    language: 'English', cefrLevel: 'C1', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'I didn\'t know she was ill, so I didn\'t visit her.',
    questionText: 'Rewrite beginning with: Had I...',
    correctAnswer: 'Had I known she was ill, I would have visited her.',
    points: 1, orderIndex: 26, tags: ['inversion', 'third conditional']
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'The government should invest more in renewable energy.',
    questionText: 'Rewrite using: It is high time...',
    correctAnswer: 'It is high time the government invested more in renewable energy.',
    points: 1, orderIndex: 27, tags: ['it is high time', 'subjunctive']
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'He only realized the truth after she had left.',
    questionText: 'Rewrite beginning with: Only after...',
    correctAnswer: 'Only after she had left did he realize the truth.',
    points: 1, orderIndex: 28, tags: ['inversion', 'only after']
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'We have never experienced such a severe storm.',
    questionText: 'Rewrite beginning with: Never...',
    correctAnswer: 'Never have we experienced such a severe storm.',
    points: 1, orderIndex: 29, tags: ['inversion', 'never']
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'It is believed that the ancient city was destroyed by an earthquake.',
    questionText: 'Rewrite beginning with: The ancient city...',
    correctAnswer: 'The ancient city is believed to have been destroyed by an earthquake.',
    points: 1, orderIndex: 30, tags: ['passive reporting', 'perfect infinitive']
  },
]
