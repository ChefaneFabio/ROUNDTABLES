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
    options: [{ label: 'A', value: 'faire' }, { label: 'B', value: 'prendre' }, { label: 'C', value: 'donner' }, { label: 'D', value: 'mettre' }],
    correctAnswer: 'prendre', points: 1, orderIndex: 1, tags: ['collocations', 'vie quotidienne']
  },
  {
    language: 'French', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Il fait très froid dehors, n\'oublie pas ton ___.',
    options: [{ label: 'A', value: 'manteau' }, { label: 'B', value: 'chapeau' }, { label: 'C', value: 'pantalon' }, { label: 'D', value: 'maillot' }],
    correctAnswer: 'manteau', points: 1, orderIndex: 2, tags: ['vêtements', 'météo']
  },
  {
    language: 'French', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Pouvez-vous me ___ le chemin pour aller à la gare ?',
    options: [{ label: 'A', value: 'dire' }, { label: 'B', value: 'indiquer' }, { label: 'C', value: 'parler' }, { label: 'D', value: 'montrer' }],
    correctAnswer: 'indiquer', points: 1, orderIndex: 3, tags: ['directions', 'demander']
  },

  // ============================================================
  // B1 — Intermediate (4 questions)
  // ============================================================
  {
    language: 'French', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'L\'entreprise a décidé d\' ___ 50 nouveaux employés cette année.',
    options: [{ label: 'A', value: 'embaucher' }, { label: 'B', value: 'licencier' }, { label: 'C', value: 'démissionner' }, { label: 'D', value: 'renvoyer' }],
    correctAnswer: 'embaucher', points: 1, orderIndex: 4, tags: ['travail', 'emploi']
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Ce restaurant propose une cuisine ___ et variée.',
    options: [{ label: 'A', value: 'saine' }, { label: 'B', value: 'malade' }, { label: 'C', value: 'sûre' }, { label: 'D', value: 'salée' }],
    correctAnswer: 'saine', points: 1, orderIndex: 5, tags: ['alimentation', 'adjectifs']
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Les ___ de cet hôtel sont excellentes : piscine, spa et salle de sport.',
    options: [{ label: 'A', value: 'prestations' }, { label: 'B', value: 'meubles' }, { label: 'C', value: 'équipements' }, { label: 'D', value: 'appareils' }],
    correctAnswer: 'prestations', points: 1, orderIndex: 6, tags: ['tourisme', 'noms']
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Je n\'ai pas les ___ d\'acheter un nouvel appartement en ce moment.',
    options: [{ label: 'A', value: 'moyens' }, { label: 'B', value: 'façons' }, { label: 'C', value: 'manières' }, { label: 'D', value: 'méthodes' }],
    correctAnswer: 'moyens', points: 1, orderIndex: 7, tags: ['argent', 'expressions']
  },

  // ============================================================
  // B2 — Upper Intermediate (4 questions)
  // ============================================================
  {
    language: 'French', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Le gouvernement a ___ de nouvelles mesures pour protéger l\'environnement.',
    options: [{ label: 'A', value: 'mis en place' }, { label: 'B', value: 'inventé' }, { label: 'C', value: 'découvert' }, { label: 'D', value: 'produit' }],
    correctAnswer: 'mis en place', points: 1, orderIndex: 8, tags: ['politique', 'formel']
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Ce reportage met en lumière les conséquences ___ de la pollution.',
    options: [{ label: 'A', value: 'désastreuses' }, { label: 'B', value: 'dévouées' }, { label: 'C', value: 'développées' }, { label: 'D', value: 'déplacées' }],
    correctAnswer: 'désastreuses', points: 1, orderIndex: 9, tags: ['environnement', 'adjectifs']
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Il a un excellent ___ de l\'humour et fait toujours rire son entourage.',
    options: [{ label: 'A', value: 'sens' }, { label: 'B', value: 'sentiment' }, { label: 'C', value: 'goût' }, { label: 'D', value: 'esprit' }],
    correctAnswer: 'sens', points: 1, orderIndex: 10, tags: ['collocations', 'personnalité']
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Le comité a ___ la proposition à l\'unanimité.',
    options: [{ label: 'A', value: 'approuvé' }, { label: 'B', value: 'amélioré' }, { label: 'C', value: 'prouvé' }, { label: 'D', value: 'appliqué' }],
    correctAnswer: 'approuvé', points: 1, orderIndex: 11, tags: ['travail', 'formel']
  },

  // ============================================================
  // C1 — Advanced (2 questions)
  // ============================================================
  {
    language: 'French', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Le discours du politicien était volontairement ___ pour ne s\'engager sur rien.',
    options: [{ label: 'A', value: 'ambigu' }, { label: 'B', value: 'ambitieux' }, { label: 'C', value: 'anonyme' }, { label: 'D', value: 'analogue' }],
    correctAnswer: 'ambigu', points: 1, orderIndex: 12, tags: ['politique', 'adjectifs avancés']
  },
  {
    language: 'French', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Son attention ___ aux détails fait d\'elle la candidate idéale.',
    options: [{ label: 'A', value: 'méticuleuse' }, { label: 'B', value: 'malicieuse' }, { label: 'C', value: 'miraculeuse' }, { label: 'D', value: 'majestueuse' }],
    correctAnswer: 'méticuleuse', points: 1, orderIndex: 13, tags: ['travail', 'adjectifs avancés']
  },

  // ============================================================
  // C2 — Proficiency (2 questions)
  // ============================================================
  {
    language: 'French', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'L\'œuvre de cet artiste est un ___ harmonieux de tradition et d\'innovation.',
    options: [{ label: 'A', value: 'alliage' }, { label: 'B', value: 'alliance' }, { label: 'C', value: 'alignement' }, { label: 'D', value: 'allégorie' }],
    correctAnswer: 'alliage', points: 1, orderIndex: 14, tags: ['art', 'adjectifs avancés']
  },
  {
    language: 'French', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'L\'explication ___ du professeur a laissé même les étudiants avancés perplexes.',
    options: [{ label: 'A', value: 'alambiquée' }, { label: 'B', value: 'consolidée' }, { label: 'C', value: 'contemplée' }, { label: 'D', value: 'conglomérée' }],
    correctAnswer: 'alambiquée', points: 1, orderIndex: 15, tags: ['académique', 'adjectifs avancés']
  },
]
