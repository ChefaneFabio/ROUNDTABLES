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
    passage: 'Les enfants qui j\'ai vus jouaient dans le parc.',
    questionText: 'Trouvez et corrigez l\'erreur dans cette phrase.',
    correctAnswer: 'Les enfants que j\'ai vus jouaient dans le parc.',
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
]
