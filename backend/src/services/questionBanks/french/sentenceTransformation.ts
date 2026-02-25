import { MultiSkillQuestionData } from '../types'

// French Sentence Transformation Questions — 10 questions
// Student reads the original sentence and rewrites it according to the instruction
// passage = the original sentence
// questionText = the transformation instruction
// correctAnswer = accepted version(s) pipe-separated

export const frenchSentenceTransformationQuestions: MultiSkillQuestionData[] = [
  // ============================================================
  // A2 — Elementary (2 questions)
  // ============================================================
  {
    language: 'French', cefrLevel: 'A2', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'J\'ai commencé à apprendre le français il y a trois ans.',
    questionText: 'Réécrivez en commençant par : J\'apprends...',
    correctAnswer: 'J\'apprends le français depuis trois ans.',
    points: 1, orderIndex: 1, tags: ['depuis', 'il y a']
  },
  {
    language: 'French', cefrLevel: 'A2', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Il n\'est pas nécessaire de porter un uniforme.',
    questionText: 'Réécrivez en utilisant : ne pas être obligé de',
    correctAnswer: 'On n\'est pas obligé de porter un uniforme.|Vous n\'êtes pas obligé de porter un uniforme.|Nous ne sommes pas obligés de porter un uniforme.',
    points: 1, orderIndex: 2, tags: ['obligation', 'nécessité']
  },

  // ============================================================
  // B1 — Intermediate (3 questions)
  // ============================================================
  {
    language: 'French', cefrLevel: 'B1', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'On dit qu\'il est très riche.',
    questionText: 'Réécrivez en commençant par : Il passe pour...',
    correctAnswer: 'Il passe pour être très riche.|Il passe pour quelqu\'un de très riche.',
    points: 1, orderIndex: 3, tags: ['passer pour', 'réputation']
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: '« Je t\'appellerai demain », m\'a-t-elle dit.',
    questionText: 'Réécrivez au discours indirect en commençant par : Elle m\'a dit...',
    correctAnswer: 'Elle m\'a dit qu\'elle m\'appellerait le lendemain.',
    points: 1, orderIndex: 4, tags: ['discours indirect']
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Je regrette de ne pas avoir étudié davantage.',
    questionText: 'Réécrivez en commençant par : J\'aurais aimé...',
    correctAnswer: 'J\'aurais aimé étudier davantage.|J\'aurais aimé avoir étudié davantage.',
    points: 1, orderIndex: 5, tags: ['conditionnel passé', 'regret']
  },

  // ============================================================
  // B2 — Upper Intermediate (3 questions)
  // ============================================================
  {
    language: 'French', cefrLevel: 'B2', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'On pense que les voleurs sont entrés par la fenêtre arrière.',
    questionText: 'Réécrivez à la voix passive en commençant par : Les voleurs...',
    correctAnswer: 'Les voleurs sont supposés être entrés par la fenêtre arrière.|Les voleurs seraient entrés par la fenêtre arrière.',
    points: 1, orderIndex: 6, tags: ['voix passive', 'supposition']
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Le film était si ennuyeux que nous sommes partis avant la fin.',
    questionText: 'Réécrivez en utilisant : tellement... que',
    correctAnswer: 'Le film était tellement ennuyeux que nous sommes partis avant la fin.',
    points: 1, orderIndex: 7, tags: ['si/tellement', 'conséquence']
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Je ne connaissais pas l\'importance de la réunion, donc je n\'y suis pas allé.',
    questionText: 'Réécrivez en commençant par : Si j\'avais...',
    correctAnswer: 'Si j\'avais connu l\'importance de la réunion, j\'y serais allé.',
    points: 1, orderIndex: 8, tags: ['conditionnel passé', 'hypothèse irréelle']
  },

  // ============================================================
  // C1 — Advanced (2 questions)
  // ============================================================
  {
    language: 'French', cefrLevel: 'C1', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Non seulement il a terminé le rapport, mais il a aussi préparé la présentation.',
    questionText: 'Réécrivez en commençant par : Non seulement a-t-il...',
    correctAnswer: 'Non seulement a-t-il terminé le rapport, mais il a aussi préparé la présentation.',
    points: 1, orderIndex: 9, tags: ['inversion', 'non seulement']
  },
  {
    language: 'French', cefrLevel: 'C1', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Il est possible qu\'elle ait raté le train.',
    questionText: 'Réécrivez en utilisant un adverbe de modalité.',
    correctAnswer: 'Elle a peut-être raté le train.|Elle a probablement raté le train.|Elle aurait peut-être raté le train.',
    points: 1, orderIndex: 10, tags: ['modalité', 'adverbes']
  },
]
