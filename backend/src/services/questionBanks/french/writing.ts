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
    questionText: 'Décrivez votre équipe de travail. Combien de personnes y a-t-il dans votre équipe ? Que font-elles ?',
    correctAnswer: '', points: 1, orderIndex: 2,
    rubric: { minWords: 20, maxWords: 50, criteria: ['vocabulaire professionnel', 'nombres', 'phrases simples'] },
    tags: ['travail'], timeSuggested: 180
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
  },

  // ============================================================
  // NOUVELLES QUESTIONS — 16 de plus (orderIndex 15-30)
  // ============================================================

  // A1 (20-50 mots)
  {
    language: 'French', cefrLevel: 'A1', questionType: 'SHORT_ANSWER', skill: 'WRITING',
    questionText: 'Écrivez une courte carte postale à un ami. Dites-lui où vous êtes et quel temps il fait.',
    correctAnswer: '', points: 1, orderIndex: 15,
    rubric: { minWords: 20, maxWords: 50, criteria: ['formule de salutation', 'phrases simples', 'vocabulaire de la météo'] },
    tags: ['carte postale', 'météo'], timeSuggested: 180
  },
  {
    language: 'French', cefrLevel: 'A1', questionType: 'SHORT_ANSWER', skill: 'WRITING',
    questionText: 'Décrivez votre maison ou votre appartement. Combien de pièces y a-t-il ? Quelle est votre pièce préférée ?',
    correctAnswer: '', points: 1, orderIndex: 16,
    rubric: { minWords: 20, maxWords: 50, criteria: ['vocabulaire du logement', 'il y a', 'adjectifs simples'] },
    tags: ['logement', 'description'], timeSuggested: 180
  },
  {
    language: 'French', cefrLevel: 'A1', questionType: 'SHORT_ANSWER', skill: 'WRITING',
    questionText: 'Qu\'aimez-vous manger et boire ? Écrivez sur vos repas préférés.',
    correctAnswer: '', points: 1, orderIndex: 17,
    rubric: { minWords: 20, maxWords: 50, criteria: ['vocabulaire alimentaire', 'aimer/préférer', 'phrases simples'] },
    tags: ['nourriture', 'préférences'], timeSuggested: 180
  },

  // A2 (40-80 mots)
  {
    language: 'French', cefrLevel: 'A2', questionType: 'SHORT_ANSWER', skill: 'WRITING',
    questionText: 'Écrivez un courriel à un ami pour l\'inviter à une fête. Précisez la date, l\'heure, le lieu et ce qu\'il doit apporter.',
    correctAnswer: '', points: 1, orderIndex: 18,
    rubric: { minWords: 40, maxWords: 80, criteria: ['format de courriel', 'projets futurs', 'langage d\'invitation', 'détails'] },
    tags: ['courriel', 'invitation'], timeSuggested: 240
  },
  {
    language: 'French', cefrLevel: 'A2', questionType: 'SHORT_ANSWER', skill: 'WRITING',
    questionText: 'Décrivez votre meilleur(e) ami(e). À quoi ressemble-t-il/elle ? Qu\'aimez-vous faire ensemble ?',
    correctAnswer: '', points: 1, orderIndex: 19,
    rubric: { minWords: 40, maxWords: 80, criteria: ['description physique', 'adjectifs de personnalité', 'présent de l\'indicatif', 'aimer + infinitif'] },
    tags: ['ami', 'description'], timeSuggested: 240
  },

  // B1 (80-150 mots)
  {
    language: 'French', cefrLevel: 'B1', questionType: 'SHORT_ANSWER', skill: 'WRITING',
    questionText: 'Écrivez une lettre de réclamation au directeur d\'un hôtel à propos d\'un problème que vous avez eu pendant votre séjour.',
    correctAnswer: '', points: 2, orderIndex: 20,
    rubric: { minWords: 80, maxWords: 150, criteria: ['format de lettre formelle', 'langage de réclamation', 'récit au passé', 'demandes polies'] },
    tags: ['réclamation', 'lettre formelle'], timeSuggested: 360
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'SHORT_ANSWER', skill: 'WRITING',
    questionText: 'Pensez-vous que les horaires flexibles améliorent la productivité ? Donnez votre opinion avec des raisons et des exemples.',
    correctAnswer: '', points: 2, orderIndex: 21,
    rubric: { minWords: 80, maxWords: 150, criteria: ['expression de l\'opinion', 'raisons à l\'appui', 'exemples', 'structure de paragraphe'] },
    tags: ['opinion', 'éducation'], timeSuggested: 360
  },

  // B2 (150-250 mots)
  {
    language: 'French', cefrLevel: 'B2', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'Rédigez un rapport sur l\'impact du tourisme sur les communautés locales. Considérez les effets positifs et négatifs et proposez des solutions.',
    correctAnswer: '', points: 2, orderIndex: 22,
    rubric: { minWords: 150, maxWords: 250, criteria: ['structure de rapport', 'analyse équilibrée', 'recommandations', 'registre formel', 'connecteurs logiques'] },
    tags: ['rapport', 'tourisme'], timeSuggested: 480
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'Certains estiment que les sports de compétition enseignent des compétences de vie importantes, tandis que d\'autres pensent qu\'ils mettent trop de pression sur les jeunes. Discutez des deux points de vue.',
    correctAnswer: '', points: 2, orderIndex: 23,
    rubric: { minWords: 150, maxWords: 250, criteria: ['thèse claire', 'argumentation équilibrée', 'exemples précis', 'vocabulaire formel', 'structure logique'] },
    tags: ['argumentatif', 'sport'], timeSuggested: 480
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'Rédigez un essai discutant de l\'impact positif ou négatif des influenceurs des réseaux sociaux sur l\'estime de soi et les valeurs des jeunes.',
    correctAnswer: '', points: 2, orderIndex: 24,
    rubric: { minWords: 150, maxWords: 250, criteria: ['structure argumentative', 'prise en compte des contre-arguments', 'exemples', 'vocabulaire académique'] },
    tags: ['argumentatif', 'réseaux sociaux'], timeSuggested: 480
  },

  // C1 (200-350 mots)
  {
    language: 'French', cefrLevel: 'C1', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'Rédigez une proposition pour votre entreprise ou institution suggérant des moyens de réduire son empreinte écologique. Incluez des mesures spécifiques et justifiez leur faisabilité.',
    correctAnswer: '', points: 3, orderIndex: 25,
    rubric: { minWords: 200, maxWords: 350, criteria: ['format de proposition', 'argumentation persuasive', 'analyse de faisabilité', 'vocabulaire soutenu', 'registre formel'] },
    tags: ['proposition', 'environnement'], timeSuggested: 600
  },
  {
    language: 'French', cefrLevel: 'C1', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'Analysez de manière critique le rôle des examens standardisés dans l\'éducation. Mesurent-ils l\'apprentissage efficacement, ou entravent-ils le développement intellectuel authentique ?',
    correctAnswer: '', points: 3, orderIndex: 26,
    rubric: { minWords: 200, maxWords: 350, criteria: ['analyse critique', 'argumentation fondée sur des preuves', 'position nuancée', 'procédés rhétoriques', 'registre académique'] },
    tags: ['analyse critique', 'éducation'], timeSuggested: 600
  },

  // C2 (250-400 mots)
  {
    language: 'French', cefrLevel: 'C2', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'Rédigez un essai philosophique explorant si les vérités morales sont des faits objectifs ou des constructions sociales. Référez-vous à au moins deux traditions philosophiques.',
    correctAnswer: '', points: 3, orderIndex: 27,
    rubric: { minWords: 250, maxWords: 400, criteria: ['profondeur philosophique', 'références interdisciplinaires', 'raisonnement abstrait', 'aisance quasi native', 'prose élégante'] },
    tags: ['philosophie', 'éthique'], timeSuggested: 720
  },
  {
    language: 'French', cefrLevel: 'C2', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'Rédigez une critique littéraire d\'un roman ou d\'une pièce de théâtre que vous avez lu(e), en analysant ses thèmes, ses techniques narratives et sa portée culturelle.',
    correctAnswer: '', points: 3, orderIndex: 28,
    rubric: { minWords: 250, maxWords: 400, criteria: ['analyse littéraire', 'argumentation sophistiquée', 'évaluation critique', 'vocabulaire précis', 'éventail stylistique'] },
    tags: ['critique littéraire', 'culture'], timeSuggested: 720
  },
  {
    language: 'French', cefrLevel: 'C2', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'Examinez le paradoxe de la tolérance : une société véritablement tolérante peut-elle tolérer l\'intolérance ? Discutez en vous référant à la philosophie politique et à des exemples contemporains.',
    correctAnswer: '', points: 3, orderIndex: 29,
    rubric: { minWords: 250, maxWords: 400, criteria: ['raisonnement philosophique', 'conclusion nuancée', 'registre académique', 'gestion des contre-arguments', 'cohérence logique'] },
    tags: ['philosophie', 'politique'], timeSuggested: 720
  },
  {
    language: 'French', cefrLevel: 'C2', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'La notion de méritocratie est-elle un idéal utile ou un mythe dangereux ? Analysez les dimensions sociologiques et philosophiques de cette question.',
    correctAnswer: '', points: 3, orderIndex: 30,
    rubric: { minWords: 250, maxWords: 400, criteria: ['argumentation sophistiquée', 'analyse interdisciplinaire', 'raisonnement abstrait', 'expression élégante', 'position nuancée'] },
    tags: ['sociologie', 'philosophie', 'économie'], timeSuggested: 720
  }
]
