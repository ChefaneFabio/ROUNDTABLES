import { MultiSkillQuestionData } from '../types'

// French Grammar MCQ Questions — 40 questions
// Distributed across A1-C2 levels

export const frenchGrammarQuestions: MultiSkillQuestionData[] = [
  // ============================================================
  // A1 — Beginner (8 questions)
  // ============================================================
  {
    language: 'French', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Je ___ étudiant.',
    options: [{ label: 'A', value: 'suis' }, { label: 'B', value: 'es' }, { label: 'C', value: 'est' }, { label: 'D', value: 'être' }],
    correctAnswer: 'suis', points: 1, orderIndex: 1, tags: ['être', 'présent']
  },
  {
    language: 'French', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Nous ___ un chat et un chien.',
    options: [{ label: 'A', value: 'a' }, { label: 'B', value: 'avons' }, { label: 'C', value: 'avez' }, { label: 'D', value: 'ont' }],
    correctAnswer: 'avons', points: 1, orderIndex: 2, tags: ['avoir', 'présent']
  },
  {
    language: 'French', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Elle habite ___ Paris.',
    options: [{ label: 'A', value: 'en' }, { label: 'B', value: 'à' }, { label: 'C', value: 'au' }, { label: 'D', value: 'dans' }],
    correctAnswer: 'à', points: 1, orderIndex: 3, tags: ['prépositions', 'villes']
  },
  {
    language: 'French', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'J\'achète ___ pain à la boulangerie.',
    options: [{ label: 'A', value: 'le' }, { label: 'B', value: 'du' }, { label: 'C', value: 'un' }, { label: 'D', value: 'de' }],
    correctAnswer: 'du', points: 1, orderIndex: 4, tags: ['articles partitifs']
  },
  {
    language: 'French', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Ils ___ au restaurant le samedi.',
    options: [{ label: 'A', value: 'va' }, { label: 'B', value: 'allons' }, { label: 'C', value: 'vont' }, { label: 'D', value: 'allez' }],
    correctAnswer: 'vont', points: 1, orderIndex: 5, tags: ['aller', 'présent']
  },
  {
    language: 'French', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '___ est ton numéro de téléphone ?',
    options: [{ label: 'A', value: 'Qui' }, { label: 'B', value: 'Quel' }, { label: 'C', value: 'Que' }, { label: 'D', value: 'Comment' }],
    correctAnswer: 'Quel', points: 1, orderIndex: 6, tags: ['interrogatifs']
  },
  {
    language: 'French', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Ce sont ___ amies de Sophie.',
    options: [{ label: 'A', value: 'le' }, { label: 'B', value: 'la' }, { label: 'C', value: 'les' }, { label: 'D', value: 'des' }],
    correctAnswer: 'les', points: 1, orderIndex: 7, tags: ['articles définis']
  },
  {
    language: 'French', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Tu ___ français et anglais.',
    options: [{ label: 'A', value: 'parle' }, { label: 'B', value: 'parles' }, { label: 'C', value: 'parlons' }, { label: 'D', value: 'parler' }],
    correctAnswer: 'parles', points: 1, orderIndex: 8, tags: ['verbes en -er', 'présent']
  },

  // ============================================================
  // A2 — Elementary (8 questions)
  // ============================================================
  {
    language: 'French', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Hier, nous ___ au cinéma.',
    options: [{ label: 'A', value: 'avons allé' }, { label: 'B', value: 'sommes allés' }, { label: 'C', value: 'avons allés' }, { label: 'D', value: 'sont allés' }],
    correctAnswer: 'sommes allés', points: 1, orderIndex: 9, tags: ['passé composé', 'être']
  },
  {
    language: 'French', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Quand j\'étais petit, je ___ à la campagne.',
    options: [{ label: 'A', value: 'ai habité' }, { label: 'B', value: 'habite' }, { label: 'C', value: 'habitais' }, { label: 'D', value: 'habiterai' }],
    correctAnswer: 'habitais', points: 1, orderIndex: 10, tags: ['imparfait', 'description']
  },
  {
    language: 'French', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Je ___ ai parlé hier. (à mes parents)',
    options: [{ label: 'A', value: 'les' }, { label: 'B', value: 'leur' }, { label: 'C', value: 'eux' }, { label: 'D', value: 'leurs' }],
    correctAnswer: 'leur', points: 1, orderIndex: 11, tags: ['pronoms COI']
  },
  {
    language: 'French', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Elle a mangé ___ la tarte. (toute la tarte)',
    options: [{ label: 'A', value: 'le' }, { label: 'B', value: 'la' }, { label: 'C', value: 'toute' }, { label: 'D', value: 'tout' }],
    correctAnswer: 'toute', points: 1, orderIndex: 12, tags: ['pronoms COD', 'tout/toute']
  },
  {
    language: 'French', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Il pleuvait quand je ___ de la maison.',
    options: [{ label: 'A', value: 'suis sorti' }, { label: 'B', value: 'sortais' }, { label: 'C', value: 'sors' }, { label: 'D', value: 'sortirai' }],
    correctAnswer: 'suis sorti', points: 1, orderIndex: 13, tags: ['passé composé', 'imparfait']
  },
  {
    language: 'French', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Tu as vu ce film ? — Oui, je ___ ai vu la semaine dernière.',
    options: [{ label: 'A', value: 'le' }, { label: 'B', value: 'la' }, { label: 'C', value: 'l\'' }, { label: 'D', value: 'lui' }],
    correctAnswer: 'l\'', points: 1, orderIndex: 14, tags: ['pronoms COD', 'élision']
  },
  {
    language: 'French', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Nous allons ___ vacances en Italie cet été.',
    options: [{ label: 'A', value: 'à' }, { label: 'B', value: 'de' }, { label: 'C', value: 'en' }, { label: 'D', value: 'aux' }],
    correctAnswer: 'en', points: 1, orderIndex: 15, tags: ['prépositions', 'vacances']
  },
  {
    language: 'French', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Elle s\'est ___ ce matin à 7 heures.',
    options: [{ label: 'A', value: 'réveillé' }, { label: 'B', value: 'réveillée' }, { label: 'C', value: 'réveillés' }, { label: 'D', value: 'réveiller' }],
    correctAnswer: 'réveillée', points: 1, orderIndex: 16, tags: ['verbes pronominaux', 'accord']
  },

  // ============================================================
  // B1 — Intermediate (8 questions)
  // ============================================================
  {
    language: 'French', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Il faut que tu ___ tes devoirs avant de sortir.',
    options: [{ label: 'A', value: 'fais' }, { label: 'B', value: 'fasses' }, { label: 'C', value: 'faire' }, { label: 'D', value: 'ferais' }],
    correctAnswer: 'fasses', points: 1, orderIndex: 17, tags: ['subjonctif', 'il faut que']
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Si j\'avais de l\'argent, j\' ___ une maison.',
    options: [{ label: 'A', value: 'achète' }, { label: 'B', value: 'achèterais' }, { label: 'C', value: 'achèterai' }, { label: 'D', value: 'ai acheté' }],
    correctAnswer: 'achèterais', points: 1, orderIndex: 18, tags: ['conditionnel', 'hypothèse']
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'La fille ___ je t\'ai parlé est ma voisine.',
    options: [{ label: 'A', value: 'que' }, { label: 'B', value: 'qui' }, { label: 'C', value: 'dont' }, { label: 'D', value: 'où' }],
    correctAnswer: 'dont', points: 1, orderIndex: 19, tags: ['pronoms relatifs', 'dont']
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Je doute qu\'il ___ la vérité.',
    options: [{ label: 'A', value: 'dit' }, { label: 'B', value: 'dise' }, { label: 'C', value: 'dira' }, { label: 'D', value: 'dirait' }],
    correctAnswer: 'dise', points: 1, orderIndex: 20, tags: ['subjonctif', 'douter']
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'C\'est la ville ___ je suis né.',
    options: [{ label: 'A', value: 'que' }, { label: 'B', value: 'qui' }, { label: 'C', value: 'dont' }, { label: 'D', value: 'où' }],
    correctAnswer: 'où', points: 1, orderIndex: 21, tags: ['pronoms relatifs', 'où']
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Si tu m\'avais prévenu, je ___ venu.',
    options: [{ label: 'A', value: 'serais' }, { label: 'B', value: 'serai' }, { label: 'C', value: 'suis' }, { label: 'D', value: 'étais' }],
    correctAnswer: 'serais', points: 1, orderIndex: 22, tags: ['conditionnel passé', 'hypothèse']
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Bien qu\'il ___ fatigué, il a continué à travailler.',
    options: [{ label: 'A', value: 'est' }, { label: 'B', value: 'soit' }, { label: 'C', value: 'était' }, { label: 'D', value: 'serait' }],
    correctAnswer: 'soit', points: 1, orderIndex: 23, tags: ['subjonctif', 'bien que']
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Il m\'a demandé ___ je voulais manger.',
    options: [{ label: 'A', value: 'qu\'est-ce que' }, { label: 'B', value: 'ce que' }, { label: 'C', value: 'que' }, { label: 'D', value: 'quoi' }],
    correctAnswer: 'ce que', points: 1, orderIndex: 24, tags: ['interrogation indirecte']
  },

  // ============================================================
  // B2 — Upper Intermediate (8 questions)
  // ============================================================
  {
    language: 'French', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Quand je suis arrivé, elle ___ déjà partie.',
    options: [{ label: 'A', value: 'a' }, { label: 'B', value: 'est' }, { label: 'C', value: 'était' }, { label: 'D', value: 'avait' }],
    correctAnswer: 'était', points: 1, orderIndex: 25, tags: ['plus-que-parfait']
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Cette maison ___ en 1850.',
    options: [{ label: 'A', value: 'a construit' }, { label: 'B', value: 'a été construite' }, { label: 'C', value: 'est construite' }, { label: 'D', value: 'construisait' }],
    correctAnswer: 'a été construite', points: 1, orderIndex: 26, tags: ['voix passive', 'passé composé']
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Il m\'a dit qu\'il ___ le lendemain.',
    options: [{ label: 'A', value: 'viendra' }, { label: 'B', value: 'viendrait' }, { label: 'C', value: 'vient' }, { label: 'D', value: 'venait' }],
    correctAnswer: 'viendrait', points: 1, orderIndex: 27, tags: ['discours indirect', 'concordance']
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Je cherche quelqu\'un qui ___ parler trois langues.',
    options: [{ label: 'A', value: 'peut' }, { label: 'B', value: 'puisse' }, { label: 'C', value: 'pourra' }, { label: 'D', value: 'pourrait' }],
    correctAnswer: 'puisse', points: 1, orderIndex: 28, tags: ['subjonctif', 'antécédent indéterminé']
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '___ tu aies raison, je ne suis pas d\'accord.',
    options: [{ label: 'A', value: 'Bien que' }, { label: 'B', value: 'Parce que' }, { label: 'C', value: 'Puisque' }, { label: 'D', value: 'Pendant que' }],
    correctAnswer: 'Bien que', points: 1, orderIndex: 29, tags: ['subjonctif', 'concession']
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Si j\'avais su, je ne ___ pas venu.',
    options: [{ label: 'A', value: 'serai' }, { label: 'B', value: 'serais' }, { label: 'C', value: 'suis' }, { label: 'D', value: 'aurais' }],
    correctAnswer: 'serais', points: 1, orderIndex: 30, tags: ['conditionnel passé', 'irréel du passé']
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Les lettres ___ par le facteur chaque matin.',
    options: [{ label: 'A', value: 'distribuent' }, { label: 'B', value: 'sont distribuées' }, { label: 'C', value: 'ont distribué' }, { label: 'D', value: 'distribués' }],
    correctAnswer: 'sont distribuées', points: 1, orderIndex: 31, tags: ['voix passive', 'présent']
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Elle a affirmé qu\'elle ___ déjà ___ ce livre.',
    options: [{ label: 'A', value: 'a / lu' }, { label: 'B', value: 'avait / lu' }, { label: 'C', value: 'aura / lu' }, { label: 'D', value: 'aurait / lu' }],
    correctAnswer: 'avait / lu', points: 1, orderIndex: 32, tags: ['discours indirect', 'plus-que-parfait']
  },

  // ============================================================
  // C1 — Advanced (4 questions)
  // ============================================================
  {
    language: 'French', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Il ___ la porte et entra sans frapper.',
    options: [{ label: 'A', value: 'ouvra' }, { label: 'B', value: 'ouvrit' }, { label: 'C', value: 'a ouvert' }, { label: 'D', value: 'ouvrait' }],
    correctAnswer: 'ouvrit', points: 1, orderIndex: 33, tags: ['passé simple']
  },
  {
    language: 'French', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Quoi qu\'il ___, je ne changerai pas d\'avis.',
    options: [{ label: 'A', value: 'dit' }, { label: 'B', value: 'dise' }, { label: 'C', value: 'dira' }, { label: 'D', value: 'a dit' }],
    correctAnswer: 'dise', points: 1, orderIndex: 34, tags: ['subjonctif', 'quoi que']
  },
  {
    language: 'French', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Il aurait fallu que vous ___ plus tôt.',
    options: [{ label: 'A', value: 'partiez' }, { label: 'B', value: 'partez' }, { label: 'C', value: 'partirez' }, { label: 'D', value: 'partiriez' }],
    correctAnswer: 'partiez', points: 1, orderIndex: 35, tags: ['subjonctif', 'il aurait fallu']
  },
  {
    language: 'French', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Elle ___ pendant des heures avant de trouver la solution.',
    options: [{ label: 'A', value: 'cherchait' }, { label: 'B', value: 'chercha' }, { label: 'C', value: 'a cherché' }, { label: 'D', value: 'cherche' }],
    correctAnswer: 'chercha', points: 1, orderIndex: 36, tags: ['passé simple', 'narration']
  },

  // ============================================================
  // C2 — Proficiency (4 questions)
  // ============================================================
  {
    language: 'French', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Eût-il ___ la vérité, il n\'aurait rien changé.',
    options: [{ label: 'A', value: 'su' }, { label: 'B', value: 'sait' }, { label: 'C', value: 'sachant' }, { label: 'D', value: 'savoir' }],
    correctAnswer: 'su', points: 1, orderIndex: 37, tags: ['subjonctif plus-que-parfait', 'inversion']
  },
  {
    language: 'French', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Il parla d\'une voix si basse que nul ne l\' ___.',
    options: [{ label: 'A', value: 'entendit' }, { label: 'B', value: 'entendît' }, { label: 'C', value: 'entendait' }, { label: 'D', value: 'a entendu' }],
    correctAnswer: 'entendît', points: 1, orderIndex: 38, tags: ['subjonctif imparfait', 'concordance des temps']
  },
  {
    language: 'French', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Dussé-je y passer la nuit, je ___ ce travail.',
    options: [{ label: 'A', value: 'finirai' }, { label: 'B', value: 'finirais' }, { label: 'C', value: 'finis' }, { label: 'D', value: 'finisse' }],
    correctAnswer: 'finirai', points: 1, orderIndex: 39, tags: ['subjonctif imparfait inversé', 'concession']
  },
  {
    language: 'French', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Il eût été souhaitable qu\'elle ___ avant la fin de la séance.',
    options: [{ label: 'A', value: 'intervienne' }, { label: 'B', value: 'intervînt' }, { label: 'C', value: 'intervenait' }, { label: 'D', value: 'interviendrait' }],
    correctAnswer: 'intervînt', points: 1, orderIndex: 40, tags: ['subjonctif imparfait', 'concordance des temps']
  },
]
