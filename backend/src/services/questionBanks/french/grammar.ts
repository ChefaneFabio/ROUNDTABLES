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

  // ============================================================
  // A1 — Beginner (additional 10 questions, orderIndex 41-50)
  // ============================================================
  {
    language: 'French', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Marie est ___ professeur.',
    options: [{ label: 'un', value: 'un' }, { label: 'une', value: 'une' }, { label: 'le', value: 'le' }, { label: 'la', value: 'la' }],
    correctAnswer: 'une', points: 1, orderIndex: 41, tags: ['articles indéfinis', 'genre']
  },
  {
    language: 'French', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Vous ___ de Paris ?',
    options: [{ label: 'est', value: 'est' }, { label: 'êtes', value: 'êtes' }, { label: 'sommes', value: 'sommes' }, { label: 'sont', value: 'sont' }],
    correctAnswer: 'êtes', points: 1, orderIndex: 42, tags: ['être', 'présent', 'interrogation']
  },
  {
    language: 'French', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Les enfants ___ dans le jardin.',
    options: [{ label: 'joue', value: 'joue' }, { label: 'joues', value: 'joues' }, { label: 'jouent', value: 'jouent' }, { label: 'jouons', value: 'jouons' }],
    correctAnswer: 'jouent', points: 1, orderIndex: 43, tags: ['verbes en -er', 'présent', 'pluriel']
  },
  {
    language: 'French', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Il y a ___ livre sur la table.',
    options: [{ label: 'le', value: 'le' }, { label: 'un', value: 'un' }, { label: 'la', value: 'la' }, { label: 'une', value: 'une' }],
    correctAnswer: 'un', points: 1, orderIndex: 44, tags: ['articles indéfinis', 'il y a']
  },
  {
    language: 'French', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Nous ___ au marché le dimanche.',
    options: [{ label: 'va', value: 'va' }, { label: 'vais', value: 'vais' }, { label: 'allons', value: 'allons' }, { label: 'allez', value: 'allez' }],
    correctAnswer: 'allons', points: 1, orderIndex: 45, tags: ['aller', 'présent']
  },
  {
    language: 'French', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Je ne mange ___ de viande.',
    options: [{ label: 'pas', value: 'pas' }, { label: 'plus', value: 'plus' }, { label: 'rien', value: 'rien' }, { label: 'jamais', value: 'jamais' }],
    correctAnswer: 'pas', points: 1, orderIndex: 46, tags: ['négation', 'ne...pas']
  },
  {
    language: 'French', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '___ frère s\'appelle Thomas.',
    options: [{ label: 'Ma', value: 'Ma' }, { label: 'Mon', value: 'Mon' }, { label: 'Mes', value: 'Mes' }, { label: 'Ton', value: 'Ton' }],
    correctAnswer: 'Mon', points: 1, orderIndex: 47, tags: ['adjectifs possessifs']
  },
  {
    language: 'French', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Tu ___ du café le matin ?',
    options: [{ label: 'boit', value: 'boit' }, { label: 'bois', value: 'bois' }, { label: 'buvons', value: 'buvons' }, { label: 'boivent', value: 'boivent' }],
    correctAnswer: 'bois', points: 1, orderIndex: 48, tags: ['boire', 'présent']
  },
  {
    language: 'French', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Je vais ___ France cet été.',
    options: [{ label: 'à', value: 'à' }, { label: 'au', value: 'au' }, { label: 'en', value: 'en' }, { label: 'dans', value: 'dans' }],
    correctAnswer: 'en', points: 1, orderIndex: 49, tags: ['prépositions', 'pays']
  },
  {
    language: 'French', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '___ heure est-il ?',
    options: [{ label: 'Quel', value: 'Quel' }, { label: 'Quelle', value: 'Quelle' }, { label: 'Quelles', value: 'Quelles' }, { label: 'Quels', value: 'Quels' }],
    correctAnswer: 'Quelle', points: 1, orderIndex: 50, tags: ['interrogatifs', 'accord', 'heure']
  },

  // ============================================================
  // A2 — Elementary (additional 10 questions, orderIndex 51-60)
  // ============================================================
  {
    language: 'French', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Il ___ beaucoup quand nous étions en vacances.',
    options: [{ label: 'a plu', value: 'a plu' }, { label: 'pleuvait', value: 'pleuvait' }, { label: 'pleut', value: 'pleut' }, { label: 'pleuvra', value: 'pleuvra' }],
    correctAnswer: 'pleuvait', points: 1, orderIndex: 51, tags: ['imparfait', 'météo']
  },
  {
    language: 'French', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Je ___ levé tôt ce matin.',
    options: [{ label: 'ai', value: 'ai' }, { label: 'suis', value: 'suis' }, { label: 'me suis', value: 'me suis' }, { label: 'me', value: 'me' }],
    correctAnswer: 'me suis', points: 1, orderIndex: 52, tags: ['verbes pronominaux', 'passé composé']
  },
  {
    language: 'French', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Cette robe est plus ___ que l\'autre.',
    options: [{ label: 'belle', value: 'belle' }, { label: 'beau', value: 'beau' }, { label: 'belles', value: 'belles' }, { label: 'beaux', value: 'beaux' }],
    correctAnswer: 'belle', points: 1, orderIndex: 53, tags: ['comparatif', 'adjectifs', 'accord']
  },
  {
    language: 'French', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Nous ___ déjà visité ce musée.',
    options: [{ label: 'sommes', value: 'sommes' }, { label: 'avons', value: 'avons' }, { label: 'ont', value: 'ont' }, { label: 'êtes', value: 'êtes' }],
    correctAnswer: 'avons', points: 1, orderIndex: 54, tags: ['passé composé', 'avoir']
  },
  {
    language: 'French', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Elle ne boit ___ d\'alcool.',
    options: [{ label: 'pas', value: 'pas' }, { label: 'jamais', value: 'jamais' }, { label: 'plus', value: 'plus' }, { label: 'rien', value: 'rien' }],
    correctAnswer: 'jamais', points: 1, orderIndex: 55, tags: ['négation', 'ne...jamais']
  },
  {
    language: 'French', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Demain, nous ___ chez nos grands-parents.',
    options: [{ label: 'allons', value: 'allons' }, { label: 'irons', value: 'irons' }, { label: 'allions', value: 'allions' }, { label: 'irions', value: 'irions' }],
    correctAnswer: 'irons', points: 1, orderIndex: 56, tags: ['futur simple', 'aller']
  },
  {
    language: 'French', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Ce gâteau est ___ meilleur de la pâtisserie.',
    options: [{ label: 'plus', value: 'plus' }, { label: 'le', value: 'le' }, { label: 'très', value: 'très' }, { label: 'aussi', value: 'aussi' }],
    correctAnswer: 'le', points: 1, orderIndex: 57, tags: ['superlatif']
  },
  {
    language: 'French', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Tu ___ donnes ton numéro ? (à moi)',
    options: [{ label: 'me', value: 'me' }, { label: 'te', value: 'te' }, { label: 'lui', value: 'lui' }, { label: 'nous', value: 'nous' }],
    correctAnswer: 'me', points: 1, orderIndex: 58, tags: ['pronoms COI']
  },
  {
    language: 'French', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Les enfants se sont ___ dans le parc.',
    options: [{ label: 'amusé', value: 'amusé' }, { label: 'amusés', value: 'amusés' }, { label: 'amusées', value: 'amusées' }, { label: 'amuser', value: 'amuser' }],
    correctAnswer: 'amusés', points: 1, orderIndex: 59, tags: ['verbes pronominaux', 'accord', 'passé composé']
  },
  {
    language: 'French', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Il faisait beau ___ nous sommes partis en promenade.',
    options: [{ label: 'donc', value: 'donc' }, { label: 'mais', value: 'mais' }, { label: 'car', value: 'car' }, { label: 'ou', value: 'ou' }],
    correctAnswer: 'donc', points: 1, orderIndex: 60, tags: ['connecteurs logiques', 'cause-conséquence']
  },

  // ============================================================
  // B1 — Intermediate (additional 10 questions, orderIndex 61-70)
  // ============================================================
  {
    language: 'French', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Je souhaite que vous ___ à l\'heure.',
    options: [{ label: 'venez', value: 'venez' }, { label: 'veniez', value: 'veniez' }, { label: 'viendrez', value: 'viendrez' }, { label: 'viendriez', value: 'viendriez' }],
    correctAnswer: 'veniez', points: 1, orderIndex: 61, tags: ['subjonctif', 'souhaiter']
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Si nous avions le temps, nous ___ au musée.',
    options: [{ label: 'allons', value: 'allons' }, { label: 'irons', value: 'irons' }, { label: 'irions', value: 'irions' }, { label: 'allions', value: 'allions' }],
    correctAnswer: 'irions', points: 1, orderIndex: 62, tags: ['conditionnel', 'hypothèse irréelle']
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Le livre ___ j\'ai besoin est à la bibliothèque.',
    options: [{ label: 'que', value: 'que' }, { label: 'qui', value: 'qui' }, { label: 'dont', value: 'dont' }, { label: 'lequel', value: 'lequel' }],
    correctAnswer: 'dont', points: 1, orderIndex: 63, tags: ['pronoms relatifs', 'dont', 'avoir besoin de']
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Après ___ mangé, il est sorti.',
    options: [{ label: 'a', value: 'a' }, { label: 'être', value: 'être' }, { label: 'avoir', value: 'avoir' }, { label: 'ayant', value: 'ayant' }],
    correctAnswer: 'avoir', points: 1, orderIndex: 64, tags: ['infinitif passé', 'après + infinitif']
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Il est important ___ tu comprennes cette règle.',
    options: [{ label: 'de', value: 'de' }, { label: 'à', value: 'à' }, { label: 'que', value: 'que' }, { label: 'pour', value: 'pour' }],
    correctAnswer: 'que', points: 1, orderIndex: 65, tags: ['subjonctif', 'il est important que']
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Je me demande ___ il viendra demain.',
    options: [{ label: 'est-ce que', value: 'est-ce que' }, { label: 'si', value: 'si' }, { label: 'que', value: 'que' }, { label: 'quand', value: 'quand' }],
    correctAnswer: 'si', points: 1, orderIndex: 66, tags: ['interrogation indirecte', 'si']
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Elle a dit qu\'elle ___ le lendemain.',
    options: [{ label: 'partira', value: 'partira' }, { label: 'partirait', value: 'partirait' }, { label: 'part', value: 'part' }, { label: 'partait', value: 'partait' }],
    correctAnswer: 'partirait', points: 1, orderIndex: 67, tags: ['discours indirect', 'concordance']
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Il travaille ___ gagner de l\'argent.',
    options: [{ label: 'à', value: 'à' }, { label: 'de', value: 'de' }, { label: 'pour', value: 'pour' }, { label: 'en', value: 'en' }],
    correctAnswer: 'pour', points: 1, orderIndex: 68, tags: ['prépositions', 'but', 'pour + infinitif']
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Avant que tu ___, j\'ai quelque chose à te dire.',
    options: [{ label: 'pars', value: 'pars' }, { label: 'partes', value: 'partes' }, { label: 'partiras', value: 'partiras' }, { label: 'partirais', value: 'partirais' }],
    correctAnswer: 'partes', points: 1, orderIndex: 69, tags: ['subjonctif', 'avant que']
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'C\'est le restaurant ___ nous avons dîné hier.',
    options: [{ label: 'que', value: 'que' }, { label: 'qui', value: 'qui' }, { label: 'dont', value: 'dont' }, { label: 'où', value: 'où' }],
    correctAnswer: 'où', points: 1, orderIndex: 70, tags: ['pronoms relatifs', 'où', 'lieu']
  },

  // ============================================================
  // B2 — Upper Intermediate (additional 10 questions, orderIndex 71-80)
  // ============================================================
  {
    language: 'French', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'À peine ___ -il arrivé que le téléphone sonna.',
    options: [{ label: 'est', value: 'est' }, { label: 'fut', value: 'fut' }, { label: 'était', value: 'était' }, { label: 'a', value: 'a' }],
    correctAnswer: 'fut', points: 2, orderIndex: 71, tags: ['inversion', 'à peine', 'passé antérieur']
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Quoiqu\'il ___ des efforts, ses résultats restent insuffisants.',
    options: [{ label: 'fait', value: 'fait' }, { label: 'fasse', value: 'fasse' }, { label: 'fera', value: 'fera' }, { label: 'ferait', value: 'ferait' }],
    correctAnswer: 'fasse', points: 2, orderIndex: 72, tags: ['subjonctif', 'quoique', 'concession']
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'C\'est un problème ___ la solution n\'est pas évidente.',
    options: [{ label: 'que', value: 'que' }, { label: 'qui', value: 'qui' }, { label: 'dont', value: 'dont' }, { label: 'duquel', value: 'duquel' }],
    correctAnswer: 'dont', points: 2, orderIndex: 73, tags: ['pronoms relatifs', 'dont']
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Le projet ___ achevé d\'ici la fin du mois.',
    options: [{ label: 'sera', value: 'sera' }, { label: 'serait', value: 'serait' }, { label: 'aura été', value: 'aura été' }, { label: 'a été', value: 'a été' }],
    correctAnswer: 'aura été', points: 2, orderIndex: 74, tags: ['futur antérieur', 'voix passive']
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Tout intelligent qu\'il ___, il a échoué à l\'examen.',
    options: [{ label: 'est', value: 'est' }, { label: 'soit', value: 'soit' }, { label: 'était', value: 'était' }, { label: 'serait', value: 'serait' }],
    correctAnswer: 'soit', points: 2, orderIndex: 75, tags: ['subjonctif', 'concession', 'tout...que']
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Elle a agi comme si rien ne s\'___ passé.',
    options: [{ label: 'est', value: 'est' }, { label: 'était', value: 'était' }, { label: 'avait', value: 'avait' }, { label: 'eût', value: 'eût' }],
    correctAnswer: 'était', points: 2, orderIndex: 76, tags: ['comme si', 'plus-que-parfait', 'hypothèse']
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Le contrat a été signé ___ les deux parties.',
    options: [{ label: 'de', value: 'de' }, { label: 'par', value: 'par' }, { label: 'avec', value: 'avec' }, { label: 'pour', value: 'pour' }],
    correctAnswer: 'par', points: 2, orderIndex: 77, tags: ['voix passive', 'complément d\'agent']
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Il se pourrait qu\'elle ___ déjà partie.',
    options: [{ label: 'est', value: 'est' }, { label: 'soit', value: 'soit' }, { label: 'serait', value: 'serait' }, { label: 'a', value: 'a' }],
    correctAnswer: 'soit', points: 2, orderIndex: 78, tags: ['subjonctif passé', 'il se pourrait que']
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Non seulement il est arrivé en retard, ___ il n\'avait pas préparé son exposé.',
    options: [{ label: 'mais aussi', value: 'mais aussi' }, { label: 'mais encore', value: 'mais encore' }, { label: 'et aussi', value: 'et aussi' }, { label: 'cependant', value: 'cependant' }],
    correctAnswer: 'mais encore', points: 2, orderIndex: 79, tags: ['connecteurs', 'non seulement...mais encore']
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '___ vous fassiez, faites-le bien.',
    options: [{ label: 'Ce que', value: 'Ce que' }, { label: 'Quoi que', value: 'Quoi que' }, { label: 'Quel que', value: 'Quel que' }, { label: 'Quelque', value: 'Quelque' }],
    correctAnswer: 'Quoi que', points: 2, orderIndex: 80, tags: ['subjonctif', 'quoi que', 'concession']
  },

  // ============================================================
  // C1 — Advanced (additional 10 questions, orderIndex 81-90)
  // ============================================================
  {
    language: 'French', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Ils ___ de longs mois avant que justice ne fût rendue.',
    options: [{ label: 'attendaient', value: 'attendaient' }, { label: 'attendirent', value: 'attendirent' }, { label: 'ont attendu', value: 'ont attendu' }, { label: 'attendent', value: 'attendent' }],
    correctAnswer: 'attendirent', points: 2, orderIndex: 81, tags: ['passé simple', 'narration littéraire']
  },
  {
    language: 'French', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Pour peu qu\'il ___ un effort, il réussirait.',
    options: [{ label: 'fait', value: 'fait' }, { label: 'fasse', value: 'fasse' }, { label: 'ferait', value: 'ferait' }, { label: 'fera', value: 'fera' }],
    correctAnswer: 'fasse', points: 2, orderIndex: 82, tags: ['subjonctif', 'pour peu que']
  },
  {
    language: 'French', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Toutes affaires ___, il décida de prendre sa retraite.',
    options: [{ label: 'cessant', value: 'cessant' }, { label: 'cessantes', value: 'cessantes' }, { label: 'cessées', value: 'cessées' }, { label: 'cessé', value: 'cessé' }],
    correctAnswer: 'cessantes', points: 2, orderIndex: 83, tags: ['participe présent', 'accord', 'expression figée']
  },
  {
    language: 'French', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Il ne se passa guère de jour sans qu\'il ne lui ___.',
    options: [{ label: 'écrit', value: 'écrit' }, { label: 'écrivît', value: 'écrivît' }, { label: 'écrive', value: 'écrive' }, { label: 'écrivait', value: 'écrivait' }],
    correctAnswer: 'écrivît', points: 2, orderIndex: 84, tags: ['subjonctif imparfait', 'sans que', 'concordance']
  },
  {
    language: 'French', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'La lettre que j\'ai ___ écrire était urgente.',
    options: [{ label: 'fait', value: 'fait' }, { label: 'faite', value: 'faite' }, { label: 'faits', value: 'faits' }, { label: 'faites', value: 'faites' }],
    correctAnswer: 'fait', points: 2, orderIndex: 85, tags: ['faire + infinitif', 'accord participe passé']
  },
  {
    language: 'French', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Encore ___ -il prouver ses dires.',
    options: [{ label: 'faut', value: 'faut' }, { label: 'faudrait', value: 'faudrait' }, { label: 'fallait', value: 'fallait' }, { label: 'faudra', value: 'faudra' }],
    correctAnswer: 'faudrait', points: 2, orderIndex: 86, tags: ['conditionnel', 'inversion', 'encore faudrait-il']
  },
  {
    language: 'French', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Les décisions ___ il a été fait mention sont irrévocables.',
    options: [{ label: 'que', value: 'que' }, { label: 'dont', value: 'dont' }, { label: 'desquelles', value: 'desquelles' }, { label: 'auxquelles', value: 'auxquelles' }],
    correctAnswer: 'dont', points: 2, orderIndex: 87, tags: ['pronoms relatifs', 'dont', 'faire mention de']
  },
  {
    language: 'French', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'C\'est la raison pour ___ il a démissionné.',
    options: [{ label: 'que', value: 'que' }, { label: 'quoi', value: 'quoi' }, { label: 'laquelle', value: 'laquelle' }, { label: 'dont', value: 'dont' }],
    correctAnswer: 'laquelle', points: 2, orderIndex: 88, tags: ['pronoms relatifs composés', 'pour laquelle']
  },
  {
    language: 'French', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '___ grandes que soient les difficultés, nous persévérerons.',
    options: [{ label: 'Aussi', value: 'Aussi' }, { label: 'Si', value: 'Si' }, { label: 'Quelque', value: 'Quelque' }, { label: 'Tout', value: 'Tout' }],
    correctAnswer: 'Si', points: 2, orderIndex: 89, tags: ['concession', 'si...que + subjonctif']
  },
  {
    language: 'French', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Les documents ___ vous avez fait allusion sont confidentiels.',
    options: [{ label: 'dont', value: 'dont' }, { label: 'desquels', value: 'desquels' }, { label: 'auxquels', value: 'auxquels' }, { label: 'que', value: 'que' }],
    correctAnswer: 'auxquels', points: 2, orderIndex: 90, tags: ['pronoms relatifs composés', 'faire allusion à']
  },

  // ============================================================
  // C2 — Proficiency (additional 10 questions, orderIndex 91-100)
  // ============================================================
  {
    language: 'French', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Il n\'eût pas ___ qu\'on le prît en défaut.',
    options: [{ label: 'voulu', value: 'voulu' }, { label: 'fallu', value: 'fallu' }, { label: 'souffert', value: 'souffert' }, { label: 'permis', value: 'permis' }],
    correctAnswer: 'souffert', points: 2, orderIndex: 91, tags: ['subjonctif plus-que-parfait', 'souffrir que']
  },
  {
    language: 'French', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Quelque habiles qu\'___ ces artisans, ils ne purent achever l\'ouvrage.',
    options: [{ label: 'étaient', value: 'étaient' }, { label: 'fussent', value: 'fussent' }, { label: 'soient', value: 'soient' }, { label: 'seraient', value: 'seraient' }],
    correctAnswer: 'fussent', points: 2, orderIndex: 92, tags: ['subjonctif imparfait', 'quelque...que', 'concession']
  },
  {
    language: 'French', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Elle mourut sans que personne ne s\'en ___.',
    options: [{ label: 'aperçoive', value: 'aperçoive' }, { label: 'aperçût', value: 'aperçût' }, { label: 'apercevait', value: 'apercevait' }, { label: 'aperçut', value: 'aperçut' }],
    correctAnswer: 'aperçût', points: 2, orderIndex: 93, tags: ['subjonctif imparfait', 'sans que', 'concordance']
  },
  {
    language: 'French', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Plût au ciel qu\'il ___ raison !',
    options: [{ label: 'a', value: 'a' }, { label: 'ait', value: 'ait' }, { label: 'eût', value: 'eût' }, { label: 'aurait', value: 'aurait' }],
    correctAnswer: 'eût', points: 2, orderIndex: 94, tags: ['subjonctif plus-que-parfait', 'plût au ciel']
  },
  {
    language: 'French', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Après qu\'il ___ son discours, l\'assemblée se leva.',
    options: [{ label: 'eut terminé', value: 'eut terminé' }, { label: 'eût terminé', value: 'eût terminé' }, { label: 'ait terminé', value: 'ait terminé' }, { label: 'avait terminé', value: 'avait terminé' }],
    correctAnswer: 'eut terminé', points: 2, orderIndex: 95, tags: ['passé antérieur', 'après que + indicatif']
  },
  {
    language: 'French', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Il craignait que la nouvelle ne ___ trop tôt.',
    options: [{ label: 'se répandît', value: 'se répandît' }, { label: 'se répande', value: 'se répande' }, { label: 'se répandait', value: 'se répandait' }, { label: 'se répandit', value: 'se répandit' }],
    correctAnswer: 'se répandît', points: 2, orderIndex: 96, tags: ['subjonctif imparfait', 'craindre que', 'ne explétif']
  },
  {
    language: 'French', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Ce ne sont pas tant les résultats qui importent ___ la méthode employée.',
    options: [{ label: 'mais', value: 'mais' }, { label: 'que', value: 'que' }, { label: 'sinon', value: 'sinon' }, { label: 'comme', value: 'comme' }],
    correctAnswer: 'que', points: 2, orderIndex: 97, tags: ['ne...pas tant...que', 'corrélation']
  },
  {
    language: 'French', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'N\'___ été son intervention, la situation eût dégénéré.',
    options: [{ label: 'eût', value: 'eût' }, { label: 'eut', value: 'eut' }, { label: 'aurait', value: 'aurait' }, { label: 'avait', value: 'avait' }],
    correctAnswer: 'eût', points: 2, orderIndex: 98, tags: ['subjonctif plus-que-parfait', 'n\'eût été', 'condition']
  },
  {
    language: 'French', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Il exigea que chacun ___ à sa place avant l\'aube.',
    options: [{ label: 'soit', value: 'soit' }, { label: 'fût', value: 'fût' }, { label: 'serait', value: 'serait' }, { label: 'est', value: 'est' }],
    correctAnswer: 'fût', points: 2, orderIndex: 99, tags: ['subjonctif imparfait', 'exiger que', 'concordance']
  },
  {
    language: 'French', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Tant s\'en ___ qu\'il acceptât cette proposition.',
    options: [{ label: 'faut', value: 'faut' }, { label: 'fallut', value: 'fallut' }, { label: 'fallait', value: 'fallait' }, { label: 'fît', value: 'fît' }],
    correctAnswer: 'fallut', points: 2, orderIndex: 100, tags: ['tant s\'en faut', 'passé simple', 'expression littéraire']
  },
]
