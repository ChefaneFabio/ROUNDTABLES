import { MultiSkillQuestionData } from '../types'

// French Vocabulary-in-Context Questions — 15 questions
// Multiple choice: choose the word that best fits the context

export const frenchVocabularyQuestions: MultiSkillQuestionData[] = [
  // ============================================================
  // A2 — Elementary (3 questions)
  // ============================================================
  {
    language: 'French', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Je dois ___ un rendez-vous chez le médecin.',
    options: [{ label: 'faire', value: 'faire' }, { label: 'prendre', value: 'prendre' }, { label: 'donner', value: 'donner' }, { label: 'mettre', value: 'mettre' }],
    correctAnswer: 'prendre', points: 1, orderIndex: 1, tags: ['collocations', 'vie quotidienne']
  },
  {
    language: 'French', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Il fait très froid dehors, n\'oublie pas ton ___.',
    options: [{ label: 'manteau', value: 'manteau' }, { label: 'chapeau', value: 'chapeau' }, { label: 'pantalon', value: 'pantalon' }, { label: 'maillot', value: 'maillot' }],
    correctAnswer: 'manteau', points: 1, orderIndex: 2, tags: ['vêtements', 'météo']
  },
  {
    language: 'French', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Pouvez-vous me ___ le chemin pour aller à la gare ?',
    options: [{ label: 'dire', value: 'dire' }, { label: 'indiquer', value: 'indiquer' }, { label: 'parler', value: 'parler' }, { label: 'montrer', value: 'montrer' }],
    correctAnswer: 'indiquer', points: 1, orderIndex: 3, tags: ['directions', 'demander']
  },

  // ============================================================
  // B1 — Intermediate (4 questions)
  // ============================================================
  {
    language: 'French', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'L\'entreprise a décidé d\' ___ 50 nouveaux employés cette année.',
    options: [{ label: 'embaucher', value: 'embaucher' }, { label: 'licencier', value: 'licencier' }, { label: 'démissionner', value: 'démissionner' }, { label: 'renvoyer', value: 'renvoyer' }],
    correctAnswer: 'embaucher', points: 1, orderIndex: 4, tags: ['travail', 'emploi']
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Ce restaurant propose une cuisine ___ et variée.',
    options: [{ label: 'saine', value: 'saine' }, { label: 'malade', value: 'malade' }, { label: 'sûre', value: 'sûre' }, { label: 'salée', value: 'salée' }],
    correctAnswer: 'saine', points: 1, orderIndex: 5, tags: ['alimentation', 'adjectifs']
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Les ___ de cet hôtel sont excellentes : piscine, spa et salle de sport.',
    options: [{ label: 'prestations', value: 'prestations' }, { label: 'meubles', value: 'meubles' }, { label: 'équipements', value: 'équipements' }, { label: 'appareils', value: 'appareils' }],
    correctAnswer: 'prestations', points: 1, orderIndex: 6, tags: ['tourisme', 'noms']
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Je n\'ai pas les ___ d\'acheter un nouvel appartement en ce moment.',
    options: [{ label: 'moyens', value: 'moyens' }, { label: 'façons', value: 'façons' }, { label: 'manières', value: 'manières' }, { label: 'méthodes', value: 'méthodes' }],
    correctAnswer: 'moyens', points: 1, orderIndex: 7, tags: ['argent', 'expressions']
  },

  // ============================================================
  // B2 — Upper Intermediate (4 questions)
  // ============================================================
  {
    language: 'French', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Le gouvernement a ___ de nouvelles mesures pour protéger l\'environnement.',
    options: [{ label: 'mis en place', value: 'mis en place' }, { label: 'inventé', value: 'inventé' }, { label: 'découvert', value: 'découvert' }, { label: 'produit', value: 'produit' }],
    correctAnswer: 'mis en place', points: 1, orderIndex: 8, tags: ['politique', 'formel']
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Ce reportage met en lumière les conséquences ___ de la pollution.',
    options: [{ label: 'désastreuses', value: 'désastreuses' }, { label: 'dévouées', value: 'dévouées' }, { label: 'développées', value: 'développées' }, { label: 'déplacées', value: 'déplacées' }],
    correctAnswer: 'désastreuses', points: 1, orderIndex: 9, tags: ['environnement', 'adjectifs']
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Il a un excellent ___ de l\'humour et fait toujours rire son entourage.',
    options: [{ label: 'sens', value: 'sens' }, { label: 'sentiment', value: 'sentiment' }, { label: 'goût', value: 'goût' }, { label: 'esprit', value: 'esprit' }],
    correctAnswer: 'sens', points: 1, orderIndex: 10, tags: ['collocations', 'personnalité']
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Le comité a ___ la proposition à l\'unanimité.',
    options: [{ label: 'approuvé', value: 'approuvé' }, { label: 'amélioré', value: 'amélioré' }, { label: 'prouvé', value: 'prouvé' }, { label: 'appliqué', value: 'appliqué' }],
    correctAnswer: 'approuvé', points: 1, orderIndex: 11, tags: ['travail', 'formel']
  },

  // ============================================================
  // C1 — Advanced (2 questions)
  // ============================================================
  {
    language: 'French', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Le discours du politicien était volontairement ___ pour ne s\'engager sur rien.',
    options: [{ label: 'ambigu', value: 'ambigu' }, { label: 'ambitieux', value: 'ambitieux' }, { label: 'anonyme', value: 'anonyme' }, { label: 'analogue', value: 'analogue' }],
    correctAnswer: 'ambigu', points: 1, orderIndex: 12, tags: ['politique', 'adjectifs avancés']
  },
  {
    language: 'French', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Son attention ___ aux détails fait d\'elle la candidate idéale.',
    options: [{ label: 'méticuleuse', value: 'méticuleuse' }, { label: 'malicieuse', value: 'malicieuse' }, { label: 'miraculeuse', value: 'miraculeuse' }, { label: 'majestueuse', value: 'majestueuse' }],
    correctAnswer: 'méticuleuse', points: 1, orderIndex: 13, tags: ['travail', 'adjectifs avancés']
  },

  // ============================================================
  // C2 — Proficiency (2 questions)
  // ============================================================
  {
    language: 'French', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'L\'œuvre de cet artiste est un ___ harmonieux de tradition et d\'innovation.',
    options: [{ label: 'alliage', value: 'alliage' }, { label: 'alliance', value: 'alliance' }, { label: 'alignement', value: 'alignement' }, { label: 'allégorie', value: 'allégorie' }],
    correctAnswer: 'alliage', points: 1, orderIndex: 14, tags: ['art', 'adjectifs avancés']
  },
  {
    language: 'French', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'L\'explication ___ du professeur a laissé même les étudiants avancés perplexes.',
    options: [{ label: 'alambiquée', value: 'alambiquée' }, { label: 'consolidée', value: 'consolidée' }, { label: 'contemplée', value: 'contemplée' }, { label: 'conglomérée', value: 'conglomérée' }],
    correctAnswer: 'alambiquée', points: 1, orderIndex: 15, tags: ['académique', 'adjectifs avancés']
  },
]
