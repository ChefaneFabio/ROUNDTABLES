import { MultiSkillQuestionData } from '../types'

// French Error Correction Questions — 10 questions
// Student reads an erroneous sentence and must type the corrected version
// passage = the sentence with the error
// questionText = instruction
// correctAnswer = the corrected sentence (pipe-separated alternatives)

export const frenchErrorCorrectionQuestions: MultiSkillQuestionData[] = [
  // ============================================================
  // A2 — Elementary (2 questions)
  // ============================================================
  {
    language: 'French', cefrLevel: 'A2', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Elle ne aime pas le chocolat.',
    questionText: 'Trouvez et corrigez l\'erreur dans cette phrase.',
    correctAnswer: 'Elle n\'aime pas le chocolat.',
    points: 1, orderIndex: 1, tags: ['élision', 'négation']
  },
  {
    language: 'French', cefrLevel: 'A2', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Hier, je suis allé au cinéma avec ma amie.',
    questionText: 'Trouvez et corrigez l\'erreur dans cette phrase.',
    correctAnswer: 'Hier, je suis allé au cinéma avec mon amie.',
    points: 1, orderIndex: 2, tags: ['adjectifs possessifs', 'hiatus']
  },

  // ============================================================
  // B1 — Intermediate (3 questions)
  // ============================================================
  {
    language: 'French', cefrLevel: 'B1', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Il faut que je fais attention en traversant la rue.',
    questionText: 'Trouvez et corrigez l\'erreur dans cette phrase.',
    correctAnswer: 'Il faut que je fasse attention en traversant la rue.',
    points: 1, orderIndex: 3, tags: ['subjonctif', 'il faut que']
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Les documents qui j\'ai reçus étaient incomplets.',
    questionText: 'Trouvez et corrigez l\'erreur dans cette phrase.',
    correctAnswer: 'Les documents que j\'ai reçus étaient incomplets.',
    points: 1, orderIndex: 4, tags: ['pronoms relatifs', 'qui/que']
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Si j\'aurais le temps, je viendrais te voir.',
    questionText: 'Trouvez et corrigez l\'erreur dans cette phrase.',
    correctAnswer: 'Si j\'avais le temps, je viendrais te voir.',
    points: 1, orderIndex: 5, tags: ['conditionnel', 'hypothèse']
  },

  // ============================================================
  // B2 — Upper Intermediate (3 questions)
  // ============================================================
  {
    language: 'French', cefrLevel: 'B2', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Malgré qu\'il pleuve, nous sommes sortis.',
    questionText: 'Trouvez et corrigez l\'erreur dans cette phrase.',
    correctAnswer: 'Bien qu\'il pleuve, nous sommes sortis.|Malgré la pluie, nous sommes sortis.',
    points: 1, orderIndex: 6, tags: ['concession', 'malgré/bien que']
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Elle s\'est permise de partir sans prévenir.',
    questionText: 'Trouvez et corrigez l\'erreur dans cette phrase.',
    correctAnswer: 'Elle s\'est permis de partir sans prévenir.',
    points: 1, orderIndex: 7, tags: ['accord participe passé', 'verbes pronominaux']
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'C\'est la raison pour laquelle que je suis parti.',
    questionText: 'Trouvez et corrigez l\'erreur dans cette phrase.',
    correctAnswer: 'C\'est la raison pour laquelle je suis parti.',
    points: 1, orderIndex: 8, tags: ['pronoms relatifs', 'redondance']
  },

  // ============================================================
  // C1 — Advanced (2 questions)
  // ============================================================
  {
    language: 'French', cefrLevel: 'C1', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Après qu\'il soit parti, nous avons rangé la maison.',
    questionText: 'Trouvez et corrigez l\'erreur dans cette phrase.',
    correctAnswer: 'Après qu\'il est parti, nous avons rangé la maison.|Après qu\'il fut parti, nous avons rangé la maison.',
    points: 1, orderIndex: 9, tags: ['après que', 'indicatif/subjonctif']
  },
  {
    language: 'French', cefrLevel: 'C1', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Les trois-cents employés de l\'usine ont été licenciés.',
    questionText: 'Trouvez et corrigez l\'erreur dans cette phrase.',
    correctAnswer: 'Les trois cents employés de l\'usine ont été licenciés.',
    points: 1, orderIndex: 10, tags: ['nombres', 'accord', 'orthographe']
  },

  // ============================================================
  // NOUVELLES QUESTIONS — 20 de plus (orderIndex 11-30)
  // ============================================================

  // A2 (5 questions)
  {
    language: 'French', cefrLevel: 'A2', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Je suis d\'accord avec tu.',
    questionText: 'Trouvez et corrigez l\'erreur dans cette phrase.',
    correctAnswer: 'Je suis d\'accord avec toi.',
    points: 1, orderIndex: 11, tags: ['pronoms toniques']
  },
  {
    language: 'French', cefrLevel: 'A2', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Il y a beaucoup des personnes dans le parc.',
    questionText: 'Trouvez et corrigez l\'erreur dans cette phrase.',
    correctAnswer: 'Il y a beaucoup de personnes dans le parc.',
    points: 1, orderIndex: 12, tags: ['partitif', 'beaucoup de']
  },
  {
    language: 'French', cefrLevel: 'A2', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Nous avons mangé des bon gâteaux.',
    questionText: 'Trouvez et corrigez l\'erreur dans cette phrase.',
    correctAnswer: 'Nous avons mangé de bons gâteaux.',
    points: 1, orderIndex: 13, tags: ['adjectif antéposé', 'partitif']
  },
  {
    language: 'French', cefrLevel: 'A2', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Elle a visitée Paris l\'année dernière.',
    questionText: 'Trouvez et corrigez l\'erreur dans cette phrase.',
    correctAnswer: 'Elle a visité Paris l\'année dernière.',
    points: 1, orderIndex: 14, tags: ['accord participe passé', 'avoir']
  },
  {
    language: 'French', cefrLevel: 'A2', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Je vais au le marché chaque dimanche.',
    questionText: 'Trouvez et corrigez l\'erreur dans cette phrase.',
    correctAnswer: 'Je vais au marché chaque dimanche.',
    points: 1, orderIndex: 15, tags: ['article contracté', 'prépositions']
  },

  // B1 (5 questions)
  {
    language: 'French', cefrLevel: 'B1', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Je me suis rappelé de son nom.',
    questionText: 'Trouvez et corrigez l\'erreur dans cette phrase.',
    correctAnswer: 'Je me suis rappelé son nom.|Je me suis souvenu de son nom.',
    points: 1, orderIndex: 16, tags: ['se rappeler/se souvenir', 'construction verbale']
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Il m\'a dit qu\'il viendra demain.',
    questionText: 'Trouvez et corrigez l\'erreur dans cette phrase.',
    correctAnswer: 'Il m\'a dit qu\'il viendrait le lendemain.|Il m\'a dit qu\'il viendrait demain.',
    points: 1, orderIndex: 17, tags: ['concordance des temps', 'discours indirect']
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Quoique il soit fatigué, il continue à travailler.',
    questionText: 'Trouvez et corrigez l\'erreur dans cette phrase.',
    correctAnswer: 'Quoiqu\'il soit fatigué, il continue à travailler.',
    points: 1, orderIndex: 18, tags: ['élision', 'quoique']
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'C\'est le livre que j\'ai besoin.',
    questionText: 'Trouvez et corrigez l\'erreur dans cette phrase.',
    correctAnswer: 'C\'est le livre dont j\'ai besoin.',
    points: 1, orderIndex: 19, tags: ['pronom relatif', 'dont']
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Elle a demandé à ce que je viens à l\'heure.',
    questionText: 'Trouvez et corrigez l\'erreur dans cette phrase.',
    correctAnswer: 'Elle a demandé à ce que je vienne à l\'heure.|Elle a demandé que je vienne à l\'heure.',
    points: 1, orderIndex: 20, tags: ['subjonctif', 'demander']
  },

  // B2 (5 questions)
  {
    language: 'French', cefrLevel: 'B2', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Il a nié d\'avoir volé l\'argent.',
    questionText: 'Trouvez et corrigez l\'erreur dans cette phrase.',
    correctAnswer: 'Il a nié avoir volé l\'argent.',
    points: 1, orderIndex: 21, tags: ['nier', 'infinitif passé']
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Plus tu pratiques, plus tu t\'améliores plus.',
    questionText: 'Trouvez et corrigez l\'erreur dans cette phrase.',
    correctAnswer: 'Plus tu pratiques, plus tu t\'améliores.',
    points: 1, orderIndex: 22, tags: ['comparatif progressif', 'redondance']
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Je souhaite que tu peux venir à la fête.',
    questionText: 'Trouvez et corrigez l\'erreur dans cette phrase.',
    correctAnswer: 'Je souhaite que tu puisses venir à la fête.',
    points: 1, orderIndex: 23, tags: ['subjonctif', 'souhaiter']
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Elle est une des personnes les plus gentilles que j\'ai connu.',
    questionText: 'Trouvez et corrigez l\'erreur dans cette phrase.',
    correctAnswer: 'Elle est une des personnes les plus gentilles que j\'aie connues.|Elle est une des personnes les plus gentilles que j\'ai connues.',
    points: 1, orderIndex: 24, tags: ['accord participe passé', 'superlatif']
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Il se comporte comme si il était le chef.',
    questionText: 'Trouvez et corrigez l\'erreur dans cette phrase.',
    correctAnswer: 'Il se comporte comme s\'il était le chef.',
    points: 1, orderIndex: 25, tags: ['élision', 'comme si']
  },

  // C1 (5 questions)
  {
    language: 'French', cefrLevel: 'C1', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'À peine il était arrivé que la réunion a commencé.',
    questionText: 'Trouvez et corrigez l\'erreur dans cette phrase.',
    correctAnswer: 'À peine était-il arrivé que la réunion a commencé.',
    points: 1, orderIndex: 26, tags: ['inversion', 'à peine']
  },
  {
    language: 'French', cefrLevel: 'C1', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'La plupart des étudiants pense que l\'examen était facile.',
    questionText: 'Trouvez et corrigez l\'erreur dans cette phrase.',
    correctAnswer: 'La plupart des étudiants pensent que l\'examen était facile.',
    points: 1, orderIndex: 27, tags: ['accord sujet-verbe', 'la plupart']
  },
  {
    language: 'French', cefrLevel: 'C1', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'N\'eût-ce été de son aide, j\'aurais échoué.',
    questionText: 'Trouvez et corrigez l\'erreur dans cette phrase.',
    correctAnswer: 'N\'eût-ce été son aide, j\'aurais échoué.|Sans son aide, j\'aurais échoué.',
    points: 1, orderIndex: 28, tags: ['conditionnel', 'registre soutenu']
  },
  {
    language: 'French', cefrLevel: 'C1', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Le nombre d\'étudiants qui s\'est inscrit cette année a augmenté.',
    questionText: 'Trouvez et corrigez l\'erreur dans cette phrase.',
    correctAnswer: 'Le nombre d\'étudiants qui se sont inscrits cette année a augmenté.',
    points: 1, orderIndex: 29, tags: ['accord sujet-verbe', 'pronom relatif']
  },
  {
    language: 'French', cefrLevel: 'C1', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Il est impératif que chaque employé soumet son rapport vendredi.',
    questionText: 'Trouvez et corrigez l\'erreur dans cette phrase.',
    correctAnswer: 'Il est impératif que chaque employé soumette son rapport vendredi.',
    points: 1, orderIndex: 30, tags: ['subjonctif', 'il est impératif que']
  },
]
