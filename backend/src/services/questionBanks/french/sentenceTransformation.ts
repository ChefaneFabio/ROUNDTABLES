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

  // ============================================================
  // NOUVELLES QUESTIONS — 20 de plus (orderIndex 11-30)
  // ============================================================

  // A2 (5 questions)
  {
    language: 'French', cefrLevel: 'A2', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Le livre est très intéressant.',
    questionText: 'Réécrivez en utilisant : un tel',
    correctAnswer: 'C\'est un tel livre intéressant.|C\'est un livre tellement intéressant.',
    points: 1, orderIndex: 11, tags: ['tellement', 'adjectifs']
  },
  {
    language: 'French', cefrLevel: 'A2', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Elle est plus grande que son frère.',
    questionText: 'Réécrivez en commençant par : Son frère...',
    correctAnswer: 'Son frère est plus petit qu\'elle.|Son frère est moins grand qu\'elle.',
    points: 1, orderIndex: 12, tags: ['comparatif', 'inversion']
  },
  {
    language: 'French', cefrLevel: 'A2', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'On a construit cette maison en 1990.',
    questionText: 'Réécrivez à la voix passive.',
    correctAnswer: 'Cette maison a été construite en 1990.',
    points: 1, orderIndex: 13, tags: ['voix passive', 'passé composé']
  },
  {
    language: 'French', cefrLevel: 'A2', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Il est interdit de stationner ici.',
    questionText: 'Réécrivez en utilisant : ne pas devoir',
    correctAnswer: 'Vous ne devez pas stationner ici.|On ne doit pas stationner ici.',
    points: 1, orderIndex: 14, tags: ['devoir', 'interdiction']
  },
  {
    language: 'French', cefrLevel: 'A2', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Je préfère le thé au café.',
    questionText: 'Réécrivez en utilisant : plutôt',
    correctAnswer: 'Je prendrais plutôt du thé que du café.|Je boirais plutôt du thé que du café.',
    points: 1, orderIndex: 15, tags: ['plutôt', 'préférence']
  },

  // B1 (5 questions)
  {
    language: 'French', cefrLevel: 'B1', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Quelqu\'un a volé mon portefeuille hier.',
    questionText: 'Réécrivez à la voix passive.',
    correctAnswer: 'Mon portefeuille a été volé hier.',
    points: 1, orderIndex: 16, tags: ['voix passive', 'passé composé']
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: '« Ne touchez pas au tableau », nous a dit le gardien.',
    questionText: 'Réécrivez au discours indirect en commençant par : Le gardien nous a dit...',
    correctAnswer: 'Le gardien nous a dit de ne pas toucher au tableau.',
    points: 1, orderIndex: 17, tags: ['discours indirect', 'impératif']
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Il est possible qu\'ils soient à la maison.',
    questionText: 'Réécrivez en utilisant un adverbe.',
    correctAnswer: 'Ils sont peut-être à la maison.|Ils sont probablement à la maison.',
    points: 1, orderIndex: 18, tags: ['adverbe de modalité', 'possibilité']
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Il est trop jeune pour conduire une voiture.',
    questionText: 'Réécrivez en utilisant : pas assez... pour',
    correctAnswer: 'Il n\'est pas assez âgé pour conduire une voiture.',
    points: 1, orderIndex: 19, tags: ['trop/assez']
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Elle a commencé à travailler ici il y a trois ans.',
    questionText: 'Réécrivez en commençant par : Elle travaille...',
    correctAnswer: 'Elle travaille ici depuis trois ans.',
    points: 1, orderIndex: 20, tags: ['depuis', 'durée']
  },

  // B2 (5 questions)
  {
    language: 'French', cefrLevel: 'B2', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'La dernière fois que je l\'ai vu, c\'était en 2019.',
    questionText: 'Réécrivez en commençant par : Je ne l\'ai pas...',
    correctAnswer: 'Je ne l\'ai pas vu depuis 2019.',
    points: 1, orderIndex: 21, tags: ['passé composé', 'depuis']
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Nous n\'avons pas pu aller à la plage parce qu\'il pleuvait.',
    questionText: 'Réécrivez en commençant par : S\'il n\'avait pas...',
    correctAnswer: 'S\'il n\'avait pas plu, nous aurions pu aller à la plage.',
    points: 1, orderIndex: 22, tags: ['conditionnel passé', 'hypothèse irréelle']
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'On dit que l\'entreprise fermera l\'année prochaine.',
    questionText: 'Réécrivez en commençant par : L\'entreprise...',
    correctAnswer: 'L\'entreprise fermerait l\'année prochaine.|L\'entreprise devrait fermer l\'année prochaine.',
    points: 1, orderIndex: 23, tags: ['conditionnel', 'rumeur']
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Je préférerais rester à la maison plutôt qu\'aller à la fête.',
    questionText: 'Réécrivez en utilisant : J\'aimerais mieux...',
    correctAnswer: 'J\'aimerais mieux rester à la maison que d\'aller à la fête.|J\'aimerais mieux rester à la maison plutôt que d\'aller à la fête.',
    points: 1, orderIndex: 24, tags: ['aimer mieux', 'préférence']
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Elle n\'a pas assez étudié, donc elle a échoué à l\'examen.',
    questionText: 'Réécrivez en commençant par : Si elle avait...',
    correctAnswer: 'Si elle avait assez étudié, elle n\'aurait pas échoué à l\'examen.|Si elle avait suffisamment étudié, elle aurait réussi l\'examen.',
    points: 1, orderIndex: 25, tags: ['conditionnel passé', 'hypothèse irréelle']
  },

  // C1 (5 questions)
  {
    language: 'French', cefrLevel: 'C1', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Je ne savais pas qu\'elle était malade, donc je ne lui ai pas rendu visite.',
    questionText: 'Réécrivez en commençant par : Si j\'avais...',
    correctAnswer: 'Si j\'avais su qu\'elle était malade, je lui aurais rendu visite.',
    points: 1, orderIndex: 26, tags: ['conditionnel passé', 'hypothèse irréelle']
  },
  {
    language: 'French', cefrLevel: 'C1', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Le gouvernement devrait investir davantage dans les énergies renouvelables.',
    questionText: 'Réécrivez en utilisant : Il serait grand temps que...',
    correctAnswer: 'Il serait grand temps que le gouvernement investisse davantage dans les énergies renouvelables.',
    points: 1, orderIndex: 27, tags: ['il est temps que', 'subjonctif']
  },
  {
    language: 'French', cefrLevel: 'C1', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Il n\'a compris la vérité qu\'après son départ.',
    questionText: 'Réécrivez en commençant par : Ce n\'est qu\'après...',
    correctAnswer: 'Ce n\'est qu\'après son départ qu\'il a compris la vérité.',
    points: 1, orderIndex: 28, tags: ['restriction', 'ne...que']
  },
  {
    language: 'French', cefrLevel: 'C1', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Nous n\'avons jamais vécu une tempête aussi violente.',
    questionText: 'Réécrivez en commençant par : Jamais...',
    correctAnswer: 'Jamais nous n\'avons vécu une tempête aussi violente.|Jamais n\'avons-nous vécu une tempête aussi violente.',
    points: 1, orderIndex: 29, tags: ['inversion', 'jamais']
  },
  {
    language: 'French', cefrLevel: 'C1', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'On croit que la ville antique a été détruite par un tremblement de terre.',
    questionText: 'Réécrivez en commençant par : La ville antique...',
    correctAnswer: 'La ville antique aurait été détruite par un tremblement de terre.',
    points: 1, orderIndex: 30, tags: ['conditionnel passé', 'supposition']
  },
]
