import { MultiSkillQuestionData } from '../types'

// French Writing Prompts — 2-3 per CEFR level (14 total)
// Progressive complexity: short answer -> paragraph -> essay

export const frenchWritingQuestions: MultiSkillQuestionData[] = [
  // A1 — Réponses courtes (20-50 mots)
  {
    language: 'French', cefrLevel: 'A1', questionType: 'SHORT_ANSWER', skill: 'WRITING',
    questionText: 'Écrivez quelques phrases sur vous. Donnez votre nom, votre âge, d\'où vous venez et une chose que vous aimez.',
    correctAnswer: '', points: 1, orderIndex: 1,
    rubric: { minWords: 20, maxWords: 50, criteria: ['informations personnelles de base', 'phrases simples', 'vocabulaire de base'] },
    tags: ['personnel', 'présentation'], timeSuggested: 180
  },
  {
    language: 'French', cefrLevel: 'A1', questionType: 'SHORT_ANSWER', skill: 'WRITING',
    questionText: 'Décrivez votre famille. Combien de personnes y a-t-il dans votre famille ? Comment s\'appellent-elles ?',
    correctAnswer: '', points: 1, orderIndex: 2,
    rubric: { minWords: 20, maxWords: 50, criteria: ['vocabulaire de la famille', 'nombres', 'phrases simples'] },
    tags: ['famille'], timeSuggested: 180
  },
  // A2 — Réponses courtes (30-60 mots)
  {
    language: 'French', cefrLevel: 'A2', questionType: 'SHORT_ANSWER', skill: 'WRITING',
    questionText: 'Décrivez votre routine quotidienne. Que faites-vous le matin, l\'après-midi et le soir ?',
    correctAnswer: '', points: 1, orderIndex: 3,
    rubric: { minWords: 30, maxWords: 60, criteria: ['expressions temporelles', 'présent de l\'indicatif', 'mots de séquence'] },
    tags: ['routine quotidienne'], timeSuggested: 240
  },
  {
    language: 'French', cefrLevel: 'A2', questionType: 'SHORT_ANSWER', skill: 'WRITING',
    questionText: 'Écrivez à propos de vos dernières vacances. Où êtes-vous allé(e) ? Qu\'avez-vous fait ? Avez-vous aimé ?',
    correctAnswer: '', points: 1, orderIndex: 4,
    rubric: { minWords: 30, maxWords: 60, criteria: ['passé composé', 'vocabulaire du voyage', 'expressions d\'opinion'] },
    tags: ['voyage', 'passé composé'], timeSuggested: 240
  },
  // B1 — Paragraphe (80-150 mots)
  {
    language: 'French', cefrLevel: 'B1', questionType: 'SHORT_ANSWER', skill: 'WRITING',
    questionText: 'Pensez-vous qu\'il est préférable de vivre en ville ou à la campagne ? Donnez des raisons pour justifier votre opinion.',
    correctAnswer: '', points: 2, orderIndex: 5,
    rubric: { minWords: 80, maxWords: 150, criteria: ['expression de l\'opinion', 'structures comparatives', 'raisons à l\'appui', 'structure de paragraphe'] },
    tags: ['opinion', 'comparatifs'], timeSuggested: 360
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'SHORT_ANSWER', skill: 'WRITING',
    questionText: 'Écrivez sur les avantages et les inconvénients de l\'utilisation des réseaux sociaux. Donnez des exemples tirés de votre expérience.',
    correctAnswer: '', points: 2, orderIndex: 6,
    rubric: { minWords: 80, maxWords: 150, criteria: ['structure avantages/inconvénients', 'mots de liaison', 'exemples', 'argumentation cohérente'] },
    tags: ['technologie', 'opinion'], timeSuggested: 360
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'SHORT_ANSWER', skill: 'WRITING',
    questionText: 'Décrivez une personne qui a influencé votre vie et expliquez pourquoi elle est importante pour vous.',
    correctAnswer: '', points: 2, orderIndex: 7,
    rubric: { minWords: 80, maxWords: 150, criteria: ['description de personnes', 'récit personnel', 'passé composé/imparfait', 'vocabulaire émotionnel'] },
    tags: ['personnel', 'description'], timeSuggested: 360
  },
  // B2 — Paragraphe (100-200 mots)
  {
    language: 'French', cefrLevel: 'B2', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'Certaines personnes pensent que le télétravail remplacera le travail de bureau traditionnel à l\'avenir. Dans quelle mesure êtes-vous d\'accord ou pas d\'accord ? Appuyez votre argumentation avec des raisons précises.',
    correctAnswer: '', points: 2, orderIndex: 8,
    rubric: { minWords: 100, maxWords: 200, criteria: ['thèse claire', 'arguments à l\'appui', 'prise en compte des contre-arguments', 'registre formel', 'connecteurs logiques'] },
    tags: ['travail', 'opinion', 'formel'], timeSuggested: 480
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'Écrivez sur la façon dont la technologie a changé la manière dont les gens apprennent les langues. Incluez les effets positifs et négatifs.',
    correctAnswer: '', points: 2, orderIndex: 9,
    rubric: { minWords: 100, maxWords: 200, criteria: ['argumentation équilibrée', 'exemples précis', 'cause et conséquence', 'vocabulaire académique'] },
    tags: ['technologie', 'éducation'], timeSuggested: 480
  },
  // C1 — Essai (150-250 mots)
  {
    language: 'French', cefrLevel: 'C1', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'Évaluez de manière critique l\'affirmation selon laquelle les réseaux sociaux ont fait plus de mal que de bien au discours démocratique. Fournissez des preuves pour étayer votre argumentation.',
    correctAnswer: '', points: 3, orderIndex: 10,
    rubric: { minWords: 150, maxWords: 250, criteria: ['analyse critique', 'argumentation fondée sur des preuves', 'position nuancée', 'vocabulaire soutenu', 'procédés rhétoriques', 'structure logique'] },
    tags: ['médias', 'politique', 'pensée critique'], timeSuggested: 600
  },
  {
    language: 'French', cefrLevel: 'C1', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'Discutez des implications éthiques de l\'intelligence artificielle dans le domaine de la santé. Les systèmes d\'IA devraient-ils être autorisés à prendre des décisions diagnostiques sans supervision humaine ?',
    correctAnswer: '', points: 3, orderIndex: 11,
    rubric: { minWords: 150, maxWords: 250, criteria: ['raisonnement éthique', 'perspectives multiples', 'registre académique', 'structures conditionnelles', 'langage de nuance'] },
    tags: ['technologie', 'éthique', 'santé'], timeSuggested: 600
  },
  // C2 — Essai (200-300 mots)
  {
    language: 'French', cefrLevel: 'C2', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'La marchandisation de l\'enseignement supérieur a fondamentalement modifié sa finalité et sa valeur. Discutez de cette affirmation en tenant compte des perspectives économiques et philosophiques.',
    correctAnswer: '', points: 3, orderIndex: 12,
    rubric: { minWords: 200, maxWords: 300, criteria: ['argumentation sophistiquée', 'références interdisciplinaires', 'raisonnement abstrait', 'aisance quasi native', 'éventail stylistique', 'conclusion nuancée'] },
    tags: ['éducation', 'philosophie', 'économie'], timeSuggested: 720
  },
  {
    language: 'French', cefrLevel: 'C2', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'Dans quelle mesure la langue peut-elle façonner la réalité ? Discutez en vous référant à l\'hypothèse de Sapir-Whorf et aux recherches contemporaines sur la relativité linguistique.',
    correctAnswer: '', points: 3, orderIndex: 13,
    rubric: { minWords: 200, maxWords: 300, criteria: ['argumentation académique', 'connaissances théoriques', 'évaluation critique des preuves', 'structure cohérente d\'essai académique', 'vocabulaire précis et varié'] },
    tags: ['linguistique', 'philosophie'], timeSuggested: 720
  },
  {
    language: 'French', cefrLevel: 'C2', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'Analysez la tension entre la vie privée individuelle et la sécurité collective à l\'ère numérique. Comment les sociétés démocratiques devraient-elles naviguer dans ce dilemme ?',
    correctAnswer: '', points: 3, orderIndex: 14,
    rubric: { minWords: 200, maxWords: 300, criteria: ['profondeur philosophique', 'analyse équilibrée', 'connaissance des politiques publiques', 'prose élégante', 'cohérence logique'] },
    tags: ['technologie', 'politique', 'éthique'], timeSuggested: 720
  }
]
