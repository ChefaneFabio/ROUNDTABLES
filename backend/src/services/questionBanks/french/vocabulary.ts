import { MultiSkillQuestionData } from '../types'

// French Vocabulary-in-Context Questions — 60 questions
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

  // ============================================================
  // A1 — Beginner (8 questions)
  // ============================================================
  {
    language: 'French', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Comment dit-on "apple" en français ?',
    options: [{ label: 'pomme', value: 'pomme' }, { label: 'poire', value: 'poire' }, { label: 'banane', value: 'banane' }, { label: 'orange', value: 'orange' }],
    correctAnswer: 'pomme', points: 1, orderIndex: 16, tags: ['nourriture', 'fruits']
  },
  {
    language: 'French', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Quel mot désigne le contraire de "grand" ?',
    options: [{ label: 'petit', value: 'petit' }, { label: 'gros', value: 'gros' }, { label: 'long', value: 'long' }, { label: 'large', value: 'large' }],
    correctAnswer: 'petit', points: 1, orderIndex: 17, tags: ['adjectifs', 'contraires']
  },
  {
    language: 'French', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Je bois du ___ le matin.',
    options: [{ label: 'café', value: 'café' }, { label: 'pain', value: 'pain' }, { label: 'fromage', value: 'fromage' }, { label: 'poulet', value: 'poulet' }],
    correctAnswer: 'café', points: 1, orderIndex: 18, tags: ['nourriture', 'boissons']
  },
  {
    language: 'French', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Aujourd\'hui, c\'est ___. Demain, c\'est mardi.',
    options: [{ label: 'lundi', value: 'lundi' }, { label: 'mercredi', value: 'mercredi' }, { label: 'vendredi', value: 'vendredi' }, { label: 'dimanche', value: 'dimanche' }],
    correctAnswer: 'lundi', points: 1, orderIndex: 19, tags: ['jours', 'temps']
  },
  {
    language: 'French', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Mon ___ s\'appelle Pierre. C\'est le mari de ma mère.',
    options: [{ label: 'père', value: 'père' }, { label: 'frère', value: 'frère' }, { label: 'fils', value: 'fils' }, { label: 'oncle', value: 'oncle' }],
    correctAnswer: 'père', points: 1, orderIndex: 20, tags: ['famille', 'noms']
  },
  {
    language: 'French', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'De quelle ___ est le ciel ? — Il est bleu.',
    options: [{ label: 'couleur', value: 'couleur' }, { label: 'forme', value: 'forme' }, { label: 'taille', value: 'taille' }, { label: 'hauteur', value: 'hauteur' }],
    correctAnswer: 'couleur', points: 1, orderIndex: 21, tags: ['couleurs', 'noms']
  },
  {
    language: 'French', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'J\'habite dans une ___ avec un jardin.',
    options: [{ label: 'maison', value: 'maison' }, { label: 'voiture', value: 'voiture' }, { label: 'école', value: 'école' }, { label: 'église', value: 'église' }],
    correctAnswer: 'maison', points: 1, orderIndex: 22, tags: ['logement', 'noms']
  },
  {
    language: 'French', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Il ___ du soleil aujourd\'hui. Il fait beau.',
    options: [{ label: 'y a', value: 'y a' }, { label: 'fait', value: 'fait' }, { label: 'est', value: 'est' }, { label: 'pleut', value: 'pleut' }],
    correctAnswer: 'y a', points: 1, orderIndex: 23, tags: ['météo', 'expressions']
  },

  // ============================================================
  // A2 — Elementary (5 more questions, 8 total)
  // ============================================================
  {
    language: 'French', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Elle va au ___ pour acheter du pain et des croissants.',
    options: [{ label: 'boulangerie', value: 'boulangerie' }, { label: 'pharmacie', value: 'pharmacie' }, { label: 'librairie', value: 'librairie' }, { label: 'boucherie', value: 'boucherie' }],
    correctAnswer: 'boulangerie', points: 1, orderIndex: 24, tags: ['commerces', 'vie quotidienne']
  },
  {
    language: 'French', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Le train arrive à la ___ à 15 heures.',
    options: [{ label: 'gare', value: 'gare' }, { label: 'port', value: 'port' }, { label: 'aéroport', value: 'aéroport' }, { label: 'arrêt', value: 'arrêt' }],
    correctAnswer: 'gare', points: 1, orderIndex: 25, tags: ['transport', 'noms']
  },
  {
    language: 'French', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'J\'ai mal à la ___. Je dois aller chez le dentiste.',
    options: [{ label: 'dent', value: 'dent' }, { label: 'tête', value: 'tête' }, { label: 'main', value: 'main' }, { label: 'jambe', value: 'jambe' }],
    correctAnswer: 'dent', points: 1, orderIndex: 26, tags: ['santé', 'corps']
  },
  {
    language: 'French', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Nous ___ en vacances au mois d\'août chaque année.',
    options: [{ label: 'partons', value: 'partons' }, { label: 'prenons', value: 'prenons' }, { label: 'faisons', value: 'faisons' }, { label: 'donnons', value: 'donnons' }],
    correctAnswer: 'partons', points: 1, orderIndex: 27, tags: ['vacances', 'verbes']
  },
  {
    language: 'French', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Ce soir, je vais ___ un film à la télévision.',
    options: [{ label: 'regarder', value: 'regarder' }, { label: 'écouter', value: 'écouter' }, { label: 'lire', value: 'lire' }, { label: 'écrire', value: 'écrire' }],
    correctAnswer: 'regarder', points: 1, orderIndex: 28, tags: ['loisirs', 'verbes']
  },

  // ============================================================
  // B1 — Intermediate (4 more questions, 8 total)
  // ============================================================
  {
    language: 'French', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Le vol a été ___ à cause du mauvais temps.',
    options: [{ label: 'annulé', value: 'annulé' }, { label: 'annoncé', value: 'annoncé' }, { label: 'approuvé', value: 'approuvé' }, { label: 'accéléré', value: 'accéléré' }],
    correctAnswer: 'annulé', points: 1, orderIndex: 29, tags: ['voyage', 'transport']
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Il faut ___ un formulaire pour s\'inscrire à l\'université.',
    options: [{ label: 'remplir', value: 'remplir' }, { label: 'remplier', value: 'remplier' }, { label: 'compléter', value: 'compléter' }, { label: 'finir', value: 'finir' }],
    correctAnswer: 'remplir', points: 1, orderIndex: 30, tags: ['administratif', 'collocations']
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Elle a obtenu une ___ de salaire grâce à ses bons résultats.',
    options: [{ label: 'augmentation', value: 'augmentation' }, { label: 'diminution', value: 'diminution' }, { label: 'réduction', value: 'réduction' }, { label: 'addition', value: 'addition' }],
    correctAnswer: 'augmentation', points: 1, orderIndex: 31, tags: ['travail', 'argent']
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Ce produit est en ___ : il coûte 30 % moins cher cette semaine.',
    options: [{ label: 'promotion', value: 'promotion' }, { label: 'production', value: 'production' }, { label: 'protection', value: 'protection' }, { label: 'proportion', value: 'proportion' }],
    correctAnswer: 'promotion', points: 1, orderIndex: 32, tags: ['achats', 'commerce']
  },

  // ============================================================
  // B2 — Upper Intermediate (4 more questions, 8 total)
  // ============================================================
  {
    language: 'French', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'La situation économique s\'est considérablement ___ au cours du dernier trimestre.',
    options: [{ label: 'détériorée', value: 'détériorée' }, { label: 'déterminée', value: 'déterminée' }, { label: 'déclarée', value: 'déclarée' }, { label: 'démontrée', value: 'démontrée' }],
    correctAnswer: 'détériorée', points: 2, orderIndex: 33, tags: ['économie', 'verbes avancés']
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Les deux entreprises ont décidé de ___ leurs ressources pour ce projet.',
    options: [{ label: 'mutualiser', value: 'mutualiser' }, { label: 'multiplier', value: 'multiplier' }, { label: 'monopoliser', value: 'monopoliser' }, { label: 'minimiser', value: 'minimiser' }],
    correctAnswer: 'mutualiser', points: 2, orderIndex: 34, tags: ['affaires', 'verbes avancés']
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Son discours a suscité une vive ___ dans l\'opinion publique.',
    options: [{ label: 'polémique', value: 'polémique' }, { label: 'politique', value: 'politique' }, { label: 'poétique', value: 'poétique' }, { label: 'pratique', value: 'pratique' }],
    correctAnswer: 'polémique', points: 2, orderIndex: 35, tags: ['société', 'noms abstraits']
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Il a fait preuve d\'une grande ___ en acceptant les critiques sans se plaindre.',
    options: [{ label: 'résilience', value: 'résilience' }, { label: 'résidence', value: 'résidence' }, { label: 'résistance', value: 'résistance' }, { label: 'résonance', value: 'résonance' }],
    correctAnswer: 'résilience', points: 2, orderIndex: 36, tags: ['personnalité', 'noms abstraits']
  },

  // ============================================================
  // C1 — Advanced (6 more questions, 8 total)
  // ============================================================
  {
    language: 'French', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Les négociations ont ___ à cause de divergences fondamentales entre les parties.',
    options: [{ label: 'achoppé', value: 'achoppé' }, { label: 'abouti', value: 'abouti' }, { label: 'accompli', value: 'accompli' }, { label: 'accédé', value: 'accédé' }],
    correctAnswer: 'achoppé', points: 2, orderIndex: 37, tags: ['négociations', 'verbes soutenus']
  },
  {
    language: 'French', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Ce roman est une ___ de la société bourgeoise du XIXe siècle.',
    options: [{ label: 'satire', value: 'satire' }, { label: 'salve', value: 'salve' }, { label: 'synthèse', value: 'synthèse' }, { label: 'symétrie', value: 'symétrie' }],
    correctAnswer: 'satire', points: 2, orderIndex: 38, tags: ['littérature', 'noms avancés']
  },
  {
    language: 'French', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Le rapport souligne la ___ entre les objectifs annoncés et les résultats obtenus.',
    options: [{ label: 'discordance', value: 'discordance' }, { label: 'concordance', value: 'concordance' }, { label: 'décadence', value: 'décadence' }, { label: 'dépendance', value: 'dépendance' }],
    correctAnswer: 'discordance', points: 2, orderIndex: 39, tags: ['formel', 'noms abstraits']
  },
  {
    language: 'French', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Il a ___ toutes les accusations portées contre lui avec des preuves irréfutables.',
    options: [{ label: 'réfuté', value: 'réfuté' }, { label: 'réputé', value: 'réputé' }, { label: 'répudié', value: 'répudié' }, { label: 'réitéré', value: 'réitéré' }],
    correctAnswer: 'réfuté', points: 2, orderIndex: 40, tags: ['juridique', 'verbes soutenus']
  },
  {
    language: 'French', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'La directrice a fait ___ de beaucoup de diplomatie pour résoudre le conflit interne.',
    options: [{ label: 'preuve', value: 'preuve' }, { label: 'part', value: 'part' }, { label: 'face', value: 'face' }, { label: 'place', value: 'place' }],
    correctAnswer: 'preuve', points: 2, orderIndex: 41, tags: ['collocations', 'expressions idiomatiques']
  },
  {
    language: 'French', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Cette mesure est ___ : elle ne résout rien sur le long terme.',
    options: [{ label: 'palliative', value: 'palliative' }, { label: 'punitive', value: 'punitive' }, { label: 'préventive', value: 'préventive' }, { label: 'prohibitive', value: 'prohibitive' }],
    correctAnswer: 'palliative', points: 2, orderIndex: 42, tags: ['politique', 'adjectifs avancés']
  },

  // ============================================================
  // C2 — Proficiency (6 more questions, 8 total)
  // ============================================================
  {
    language: 'French', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Son style d\'écriture, à la fois ___ et incisif, lui a valu le prix Goncourt.',
    options: [{ label: 'ciselé', value: 'ciselé' }, { label: 'censuré', value: 'censuré' }, { label: 'cimenté', value: 'cimenté' }, { label: 'cautionné', value: 'cautionné' }],
    correctAnswer: 'ciselé', points: 2, orderIndex: 43, tags: ['littérature', 'adjectifs littéraires']
  },
  {
    language: 'French', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Le philosophe a développé une pensée d\'une rare ___, défiant toute simplification.',
    options: [{ label: 'acuité', value: 'acuité' }, { label: 'acidité', value: 'acidité' }, { label: 'aménité', value: 'aménité' }, { label: 'antiquité', value: 'antiquité' }],
    correctAnswer: 'acuité', points: 2, orderIndex: 44, tags: ['philosophie', 'noms littéraires']
  },
  {
    language: 'French', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'La ___ de ses propos a choqué l\'assemblée tout entière.',
    options: [{ label: 'virulence', value: 'virulence' }, { label: 'vigilance', value: 'vigilance' }, { label: 'véhémence', value: 'véhémence' }, { label: 'vraisemblance', value: 'vraisemblance' }],
    correctAnswer: 'virulence', points: 2, orderIndex: 45, tags: ['rhétorique', 'noms soutenus']
  },
  {
    language: 'French', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Ce texte est truffé d\'___ qui enrichissent la lecture pour un public averti.',
    options: [{ label: 'allusions', value: 'allusions' }, { label: 'illusions', value: 'illusions' }, { label: 'allocutions', value: 'allocutions' }, { label: 'ablutions', value: 'ablutions' }],
    correctAnswer: 'allusions', points: 2, orderIndex: 46, tags: ['littérature', 'noms avancés']
  },
  {
    language: 'French', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'L\'orateur a usé d\'une ___ redoutable pour convaincre son auditoire.',
    options: [{ label: 'rhétorique', value: 'rhétorique' }, { label: 'romantique', value: 'romantique' }, { label: 'rythmique', value: 'rythmique' }, { label: 'rubrique', value: 'rubrique' }],
    correctAnswer: 'rhétorique', points: 2, orderIndex: 47, tags: ['discours', 'noms soutenus']
  },
  {
    language: 'French', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'L\'artiste a su ___ les codes esthétiques traditionnels pour créer une oeuvre avant-gardiste.',
    options: [{ label: 'transgresser', value: 'transgresser' }, { label: 'transcender', value: 'transcender' }, { label: 'transmettre', value: 'transmettre' }, { label: 'transplanter', value: 'transplanter' }],
    correctAnswer: 'transgresser', points: 2, orderIndex: 48, tags: ['art', 'verbes littéraires']
  },

  // ============================================================
  // Additional A1 — fill to ensure even distribution
  // ============================================================

  // ============================================================
  // Additional mixed levels to reach 60 total
  // ============================================================
  {
    language: 'French', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Le ___ est un animal domestique qui miaule.',
    options: [{ label: 'chat', value: 'chat' }, { label: 'chien', value: 'chien' }, { label: 'oiseau', value: 'oiseau' }, { label: 'poisson', value: 'poisson' }],
    correctAnswer: 'chat', points: 1, orderIndex: 49, tags: ['animaux', 'noms']
  },
  {
    language: 'French', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Je ___ français et anglais.',
    options: [{ label: 'parle', value: 'parle' }, { label: 'mange', value: 'mange' }, { label: 'danse', value: 'danse' }, { label: 'chante', value: 'chante' }],
    correctAnswer: 'parle', points: 1, orderIndex: 50, tags: ['langues', 'verbes']
  },
  {
    language: 'French', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Ma soeur est très ___ : elle aide toujours les autres.',
    options: [{ label: 'gentille', value: 'gentille' }, { label: 'méchante', value: 'méchante' }, { label: 'timide', value: 'timide' }, { label: 'paresseuse', value: 'paresseuse' }],
    correctAnswer: 'gentille', points: 1, orderIndex: 51, tags: ['personnalité', 'adjectifs']
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Il a ___ sa candidature pour le poste de directeur.',
    options: [{ label: 'soumis', value: 'soumis' }, { label: 'soutenu', value: 'soutenu' }, { label: 'suivi', value: 'suivi' }, { label: 'survécu', value: 'survécu' }],
    correctAnswer: 'soumis', points: 1, orderIndex: 52, tags: ['travail', 'collocations']
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'L\'enquête a permis de ___ les causes profondes du dysfonctionnement.',
    options: [{ label: 'élucider', value: 'élucider' }, { label: 'éluder', value: 'éluder' }, { label: 'éliminer', value: 'éliminer' }, { label: 'élargir', value: 'élargir' }],
    correctAnswer: 'élucider', points: 2, orderIndex: 53, tags: ['formel', 'verbes avancés']
  },
  {
    language: 'French', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Le ministre a ___ les rumeurs concernant sa démission prochaine.',
    options: [{ label: 'démenti', value: 'démenti' }, { label: 'démontré', value: 'démontré' }, { label: 'dénoncé', value: 'dénoncé' }, { label: 'déploré', value: 'déploré' }],
    correctAnswer: 'démenti', points: 2, orderIndex: 54, tags: ['politique', 'verbes soutenus']
  },
  {
    language: 'French', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'La ___ du langage dans ce roman postmoderne brouille les frontières entre réel et fiction.',
    options: [{ label: 'déconstruction', value: 'déconstruction' }, { label: 'décomposition', value: 'décomposition' }, { label: 'démonstration', value: 'démonstration' }, { label: 'désinformation', value: 'désinformation' }],
    correctAnswer: 'déconstruction', points: 2, orderIndex: 55, tags: ['littérature', 'noms académiques']
  },
  {
    language: 'French', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Il pleut beaucoup. N\'oublie pas ton ___.',
    options: [{ label: 'parapluie', value: 'parapluie' }, { label: 'parasol', value: 'parasol' }, { label: 'parachute', value: 'parachute' }, { label: 'paravent', value: 'paravent' }],
    correctAnswer: 'parapluie', points: 1, orderIndex: 56, tags: ['météo', 'objets']
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Nous devons ___ un budget réaliste avant de commencer le projet.',
    options: [{ label: 'établir', value: 'établir' }, { label: 'étaler', value: 'étaler' }, { label: 'éteindre', value: 'éteindre' }, { label: 'étendre', value: 'étendre' }],
    correctAnswer: 'établir', points: 1, orderIndex: 57, tags: ['travail', 'collocations']
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Le journaliste a rédigé un article ___ sur les inégalités sociales.',
    options: [{ label: 'percutant', value: 'percutant' }, { label: 'perçant', value: 'perçant' }, { label: 'persistant', value: 'persistant' }, { label: 'perturbant', value: 'perturbant' }],
    correctAnswer: 'percutant', points: 2, orderIndex: 58, tags: ['médias', 'adjectifs avancés']
  },
  {
    language: 'French', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Quel est le chiffre après neuf ?',
    options: [{ label: 'dix', value: 'dix' }, { label: 'huit', value: 'huit' }, { label: 'onze', value: 'onze' }, { label: 'sept', value: 'sept' }],
    correctAnswer: 'dix', points: 1, orderIndex: 59, tags: ['chiffres', 'nombres']
  },
  {
    language: 'French', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'En hiver, il fait ___.',
    options: [{ label: 'froid', value: 'froid' }, { label: 'chaud', value: 'chaud' }, { label: 'beau', value: 'beau' }, { label: 'bon', value: 'bon' }],
    correctAnswer: 'froid', points: 1, orderIndex: 60, tags: ['météo', 'saisons']
  },
]
