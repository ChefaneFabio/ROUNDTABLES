import { MultiSkillQuestionData } from '../types'

// French Grammar MCQ Questions — 100 questions
// Distributed across A1-C2 levels (A1:18, A2:18, B1:18, B2:18, C1:14, C2:14)

export const frenchGrammarQuestions: MultiSkillQuestionData[] = [
  // ============================================================
  // A1 — Beginner (8 questions)
  // ============================================================
  {
    language: 'French', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Je ___ étudiant.',
    options: [{ label: 'suis', value: 'suis' }, { label: 'es', value: 'es' }, { label: 'est', value: 'est' }, { label: 'être', value: 'être' }],
    correctAnswer: 'suis', points: 1, orderIndex: 1, tags: ['être', 'présent']
  },
  {
    language: 'French', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Nous ___ un chat et un chien.',
    options: [{ label: 'a', value: 'a' }, { label: 'avons', value: 'avons' }, { label: 'avez', value: 'avez' }, { label: 'ont', value: 'ont' }],
    correctAnswer: 'avons', points: 1, orderIndex: 2, tags: ['avoir', 'présent']
  },
  {
    language: 'French', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Elle habite ___ Paris.',
    options: [{ label: 'en', value: 'en' }, { label: 'à', value: 'à' }, { label: 'au', value: 'au' }, { label: 'dans', value: 'dans' }],
    correctAnswer: 'à', points: 1, orderIndex: 3, tags: ['prépositions', 'villes']
  },
  {
    language: 'French', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'J\'achète ___ pain à la boulangerie.',
    options: [{ label: 'le', value: 'le' }, { label: 'du', value: 'du' }, { label: 'un', value: 'un' }, { label: 'de', value: 'de' }],
    correctAnswer: 'du', points: 1, orderIndex: 4, tags: ['articles partitifs']
  },
  {
    language: 'French', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Ils ___ au restaurant le samedi.',
    options: [{ label: 'va', value: 'va' }, { label: 'allons', value: 'allons' }, { label: 'vont', value: 'vont' }, { label: 'allez', value: 'allez' }],
    correctAnswer: 'vont', points: 1, orderIndex: 5, tags: ['aller', 'présent']
  },
  {
    language: 'French', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '___ est ton numéro de téléphone ?',
    options: [{ label: 'Qui', value: 'Qui' }, { label: 'Quel', value: 'Quel' }, { label: 'Que', value: 'Que' }, { label: 'Comment', value: 'Comment' }],
    correctAnswer: 'Quel', points: 1, orderIndex: 6, tags: ['interrogatifs']
  },
  {
    language: 'French', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Ce sont ___ amies de Sophie.',
    options: [{ label: 'le', value: 'le' }, { label: 'la', value: 'la' }, { label: 'les', value: 'les' }, { label: 'des', value: 'des' }],
    correctAnswer: 'les', points: 1, orderIndex: 7, tags: ['articles définis']
  },
  {
    language: 'French', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Tu ___ français et anglais.',
    options: [{ label: 'parle', value: 'parle' }, { label: 'parles', value: 'parles' }, { label: 'parlons', value: 'parlons' }, { label: 'parler', value: 'parler' }],
    correctAnswer: 'parles', points: 1, orderIndex: 8, tags: ['verbes en -er', 'présent']
  },

  // ============================================================
  // A2 — Elementary (8 questions)
  // ============================================================
  {
    language: 'French', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Hier, nous ___ au cinéma.',
    options: [{ label: 'avons allé', value: 'avons allé' }, { label: 'sommes allés', value: 'sommes allés' }, { label: 'avons allés', value: 'avons allés' }, { label: 'sont allés', value: 'sont allés' }],
    correctAnswer: 'sommes allés', points: 1, orderIndex: 9, tags: ['passé composé', 'être']
  },
  {
    language: 'French', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Quand j\'étais petit, je ___ à la campagne.',
    options: [{ label: 'ai habité', value: 'ai habité' }, { label: 'habite', value: 'habite' }, { label: 'habitais', value: 'habitais' }, { label: 'habiterai', value: 'habiterai' }],
    correctAnswer: 'habitais', points: 1, orderIndex: 10, tags: ['imparfait', 'description']
  },
  {
    language: 'French', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Je ___ ai parlé hier. (à mes parents)',
    options: [{ label: 'les', value: 'les' }, { label: 'leur', value: 'leur' }, { label: 'eux', value: 'eux' }, { label: 'leurs', value: 'leurs' }],
    correctAnswer: 'leur', points: 1, orderIndex: 11, tags: ['pronoms COI']
  },
  {
    language: 'French', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Elle a mangé ___ la tarte. (toute la tarte)',
    options: [{ label: 'le', value: 'le' }, { label: 'la', value: 'la' }, { label: 'toute', value: 'toute' }, { label: 'tout', value: 'tout' }],
    correctAnswer: 'toute', points: 1, orderIndex: 12, tags: ['pronoms COD', 'tout/toute']
  },
  {
    language: 'French', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Il pleuvait quand je ___ de la maison.',
    options: [{ label: 'suis sorti', value: 'suis sorti' }, { label: 'sortais', value: 'sortais' }, { label: 'sors', value: 'sors' }, { label: 'sortirai', value: 'sortirai' }],
    correctAnswer: 'suis sorti', points: 1, orderIndex: 13, tags: ['passé composé', 'imparfait']
  },
  {
    language: 'French', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Tu as vu ce film ? — Oui, je ___ ai vu la semaine dernière.',
    options: [{ label: 'le', value: 'le' }, { label: 'la', value: 'la' }, { label: 'l\'', value: 'l\'' }, { label: 'lui', value: 'lui' }],
    correctAnswer: 'l\'', points: 1, orderIndex: 14, tags: ['pronoms COD', 'élision']
  },
  {
    language: 'French', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Nous allons ___ vacances en Italie cet été.',
    options: [{ label: 'à', value: 'à' }, { label: 'de', value: 'de' }, { label: 'en', value: 'en' }, { label: 'aux', value: 'aux' }],
    correctAnswer: 'en', points: 1, orderIndex: 15, tags: ['prépositions', 'vacances']
  },
  {
    language: 'French', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Elle s\'est ___ ce matin à 7 heures.',
    options: [{ label: 'réveillé', value: 'réveillé' }, { label: 'réveillée', value: 'réveillée' }, { label: 'réveillés', value: 'réveillés' }, { label: 'réveiller', value: 'réveiller' }],
    correctAnswer: 'réveillée', points: 1, orderIndex: 16, tags: ['verbes pronominaux', 'accord']
  },

  // ============================================================
  // B1 — Intermediate (8 questions)
  // ============================================================
  {
    language: 'French', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Il faut que tu ___ tes devoirs avant de sortir.',
    options: [{ label: 'fais', value: 'fais' }, { label: 'fasses', value: 'fasses' }, { label: 'faire', value: 'faire' }, { label: 'ferais', value: 'ferais' }],
    correctAnswer: 'fasses', points: 1, orderIndex: 17, tags: ['subjonctif', 'il faut que']
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Si j\'avais de l\'argent, j\' ___ une maison.',
    options: [{ label: 'achète', value: 'achète' }, { label: 'achèterais', value: 'achèterais' }, { label: 'achèterai', value: 'achèterai' }, { label: 'ai acheté', value: 'ai acheté' }],
    correctAnswer: 'achèterais', points: 1, orderIndex: 18, tags: ['conditionnel', 'hypothèse']
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'La fille ___ je t\'ai parlé est ma voisine.',
    options: [{ label: 'que', value: 'que' }, { label: 'qui', value: 'qui' }, { label: 'dont', value: 'dont' }, { label: 'où', value: 'où' }],
    correctAnswer: 'dont', points: 1, orderIndex: 19, tags: ['pronoms relatifs', 'dont']
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Je doute qu\'il ___ la vérité.',
    options: [{ label: 'dit', value: 'dit' }, { label: 'dise', value: 'dise' }, { label: 'dira', value: 'dira' }, { label: 'dirait', value: 'dirait' }],
    correctAnswer: 'dise', points: 1, orderIndex: 20, tags: ['subjonctif', 'douter']
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'C\'est la ville ___ je suis né.',
    options: [{ label: 'que', value: 'que' }, { label: 'qui', value: 'qui' }, { label: 'dont', value: 'dont' }, { label: 'où', value: 'où' }],
    correctAnswer: 'où', points: 1, orderIndex: 21, tags: ['pronoms relatifs', 'où']
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Si tu m\'avais prévenu, je ___ venu.',
    options: [{ label: 'serais', value: 'serais' }, { label: 'serai', value: 'serai' }, { label: 'suis', value: 'suis' }, { label: 'étais', value: 'étais' }],
    correctAnswer: 'serais', points: 1, orderIndex: 22, tags: ['conditionnel passé', 'hypothèse']
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Bien qu\'il ___ fatigué, il a continué à travailler.',
    options: [{ label: 'est', value: 'est' }, { label: 'soit', value: 'soit' }, { label: 'était', value: 'était' }, { label: 'serait', value: 'serait' }],
    correctAnswer: 'soit', points: 1, orderIndex: 23, tags: ['subjonctif', 'bien que']
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Il m\'a demandé ___ je voulais manger.',
    options: [{ label: 'qu\'est-ce que', value: 'qu\'est-ce que' }, { label: 'ce que', value: 'ce que' }, { label: 'que', value: 'que' }, { label: 'quoi', value: 'quoi' }],
    correctAnswer: 'ce que', points: 1, orderIndex: 24, tags: ['interrogation indirecte']
  },

  // ============================================================
  // B2 — Upper Intermediate (8 questions)
  // ============================================================
  {
    language: 'French', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Quand je suis arrivé, elle ___ déjà partie.',
    options: [{ label: 'a', value: 'a' }, { label: 'est', value: 'est' }, { label: 'était', value: 'était' }, { label: 'avait', value: 'avait' }],
    correctAnswer: 'était', points: 1, orderIndex: 25, tags: ['plus-que-parfait']
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Cette maison ___ en 1850.',
    options: [{ label: 'a construit', value: 'a construit' }, { label: 'a été construite', value: 'a été construite' }, { label: 'est construite', value: 'est construite' }, { label: 'construisait', value: 'construisait' }],
    correctAnswer: 'a été construite', points: 1, orderIndex: 26, tags: ['voix passive', 'passé composé']
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Il m\'a dit qu\'il ___ le lendemain.',
    options: [{ label: 'viendra', value: 'viendra' }, { label: 'viendrait', value: 'viendrait' }, { label: 'vient', value: 'vient' }, { label: 'venait', value: 'venait' }],
    correctAnswer: 'viendrait', points: 1, orderIndex: 27, tags: ['discours indirect', 'concordance']
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Je cherche quelqu\'un qui ___ parler trois langues.',
    options: [{ label: 'peut', value: 'peut' }, { label: 'puisse', value: 'puisse' }, { label: 'pourra', value: 'pourra' }, { label: 'pourrait', value: 'pourrait' }],
    correctAnswer: 'puisse', points: 1, orderIndex: 28, tags: ['subjonctif', 'antécédent indéterminé']
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '___ tu aies raison, je ne suis pas d\'accord.',
    options: [{ label: 'Bien que', value: 'Bien que' }, { label: 'Parce que', value: 'Parce que' }, { label: 'Puisque', value: 'Puisque' }, { label: 'Pendant que', value: 'Pendant que' }],
    correctAnswer: 'Bien que', points: 1, orderIndex: 29, tags: ['subjonctif', 'concession']
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Si j\'avais su, je ne ___ pas venu.',
    options: [{ label: 'serai', value: 'serai' }, { label: 'serais', value: 'serais' }, { label: 'suis', value: 'suis' }, { label: 'aurais', value: 'aurais' }],
    correctAnswer: 'serais', points: 1, orderIndex: 30, tags: ['conditionnel passé', 'irréel du passé']
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Les lettres ___ par le facteur chaque matin.',
    options: [{ label: 'distribuent', value: 'distribuent' }, { label: 'sont distribuées', value: 'sont distribuées' }, { label: 'ont distribué', value: 'ont distribué' }, { label: 'distribués', value: 'distribués' }],
    correctAnswer: 'sont distribuées', points: 1, orderIndex: 31, tags: ['voix passive', 'présent']
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Elle a affirmé qu\'elle ___ déjà ___ ce livre.',
    options: [{ label: 'a / lu', value: 'a / lu' }, { label: 'avait / lu', value: 'avait / lu' }, { label: 'aura / lu', value: 'aura / lu' }, { label: 'aurait / lu', value: 'aurait / lu' }],
    correctAnswer: 'avait / lu', points: 1, orderIndex: 32, tags: ['discours indirect', 'plus-que-parfait']
  },

  // ============================================================
  // C1 — Advanced (4 questions)
  // ============================================================
  {
    language: 'French', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Il ___ la porte et entra sans frapper.',
    options: [{ label: 'ouvra', value: 'ouvra' }, { label: 'ouvrit', value: 'ouvrit' }, { label: 'a ouvert', value: 'a ouvert' }, { label: 'ouvrait', value: 'ouvrait' }],
    correctAnswer: 'ouvrit', points: 1, orderIndex: 33, tags: ['passé simple']
  },
  {
    language: 'French', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Quoi qu\'il ___, je ne changerai pas d\'avis.',
    options: [{ label: 'dit', value: 'dit' }, { label: 'dise', value: 'dise' }, { label: 'dira', value: 'dira' }, { label: 'a dit', value: 'a dit' }],
    correctAnswer: 'dise', points: 1, orderIndex: 34, tags: ['subjonctif', 'quoi que']
  },
  {
    language: 'French', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Il aurait fallu que vous ___ plus tôt.',
    options: [{ label: 'partiez', value: 'partiez' }, { label: 'partez', value: 'partez' }, { label: 'partirez', value: 'partirez' }, { label: 'partiriez', value: 'partiriez' }],
    correctAnswer: 'partiez', points: 1, orderIndex: 35, tags: ['subjonctif', 'il aurait fallu']
  },
  {
    language: 'French', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Elle ___ pendant des heures avant de trouver la solution.',
    options: [{ label: 'cherchait', value: 'cherchait' }, { label: 'chercha', value: 'chercha' }, { label: 'a cherché', value: 'a cherché' }, { label: 'cherche', value: 'cherche' }],
    correctAnswer: 'chercha', points: 1, orderIndex: 36, tags: ['passé simple', 'narration']
  },

  // ============================================================
  // C2 — Proficiency (4 questions)
  // ============================================================
  {
    language: 'French', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Eût-il ___ la vérité, il n\'aurait rien changé.',
    options: [{ label: 'su', value: 'su' }, { label: 'sait', value: 'sait' }, { label: 'sachant', value: 'sachant' }, { label: 'savoir', value: 'savoir' }],
    correctAnswer: 'su', points: 1, orderIndex: 37, tags: ['subjonctif plus-que-parfait', 'inversion']
  },
  {
    language: 'French', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Il parla d\'une voix si basse que nul ne l\' ___.',
    options: [{ label: 'entendit', value: 'entendit' }, { label: 'entendît', value: 'entendît' }, { label: 'entendait', value: 'entendait' }, { label: 'a entendu', value: 'a entendu' }],
    correctAnswer: 'entendît', points: 1, orderIndex: 38, tags: ['subjonctif imparfait', 'concordance des temps']
  },
  {
    language: 'French', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Dussé-je y passer la nuit, je ___ ce travail.',
    options: [{ label: 'finirai', value: 'finirai' }, { label: 'finirais', value: 'finirais' }, { label: 'finis', value: 'finis' }, { label: 'finisse', value: 'finisse' }],
    correctAnswer: 'finirai', points: 1, orderIndex: 39, tags: ['subjonctif imparfait inversé', 'concession']
  },
  {
    language: 'French', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Il eût été souhaitable qu\'elle ___ avant la fin de la séance.',
    options: [{ label: 'intervienne', value: 'intervienne' }, { label: 'intervînt', value: 'intervînt' }, { label: 'intervenait', value: 'intervenait' }, { label: 'interviendrait', value: 'interviendrait' }],
    correctAnswer: 'intervînt', points: 1, orderIndex: 40, tags: ['subjonctif imparfait', 'concordance des temps']
  },
]
