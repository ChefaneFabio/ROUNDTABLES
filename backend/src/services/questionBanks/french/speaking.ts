import { MultiSkillQuestionData } from '../types'

// French Speaking Prompts — 2-3 per CEFR level (14 total)
// Types: Read aloud, describe, opinion, argue

export const frenchSpeakingQuestions: MultiSkillQuestionData[] = [
  // A1 — Lire à voix haute + question simple
  {
    language: 'French', cefrLevel: 'A1', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Lisez la phrase suivante à voix haute :',
    speakingPrompt: 'Bonjour, je m\'appelle [votre nom]. Je viens de [votre pays]. J\'aime [quelque chose que vous aimez].',
    correctAnswer: '', points: 1, orderIndex: 1,
    rubric: { criteria: ['prononciation', 'fluidité de base', 'discours compréhensible'], maxDuration: 30 },
    tags: ['lecture à voix haute', 'présentation'], timeSuggested: 30
  },
  {
    language: 'French', cefrLevel: 'A1', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Répondez à la question suivante. Parlez pendant environ 15 à 20 secondes :',
    speakingPrompt: 'Que faites-vous d\'habitude le week-end ?',
    correctAnswer: '', points: 1, orderIndex: 2,
    rubric: { criteria: ['réponse compréhensible', 'vocabulaire de base', 'contenu pertinent'], maxDuration: 30 },
    tags: ['question simple', 'vie quotidienne'], timeSuggested: 30
  },
  // A2 — Lire à voix haute + décrire
  {
    language: 'French', cefrLevel: 'A2', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Lisez le texte suivant à voix haute clairement :',
    speakingPrompt: 'Samedi dernier, je suis allé au parc avec mes amis. Le temps était ensoleillé et chaud. Nous avons fait un pique-nique et joué au football. C\'était une journée formidable.',
    correctAnswer: '', points: 1, orderIndex: 3,
    rubric: { criteria: ['prononciation claire', 'rythme approprié', 'intonation', 'prononciation du passé composé'], maxDuration: 45 },
    tags: ['lecture à voix haute', 'passé composé'], timeSuggested: 45
  },
  {
    language: 'French', cefrLevel: 'A2', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Décrivez votre plat préféré. Qu\'est-ce que c\'est ? Pourquoi l\'aimez-vous ? À quelle fréquence le mangez-vous ? Parlez pendant environ 30 secondes.',
    speakingPrompt: 'Parlez-moi de votre plat préféré.',
    correctAnswer: '', points: 1, orderIndex: 4,
    rubric: { criteria: ['vocabulaire descriptif', 'phrases simples', 'contenu pertinent', 'fluidité de base'], maxDuration: 45 },
    tags: ['décrire', 'nourriture'], timeSuggested: 45
  },
  // B1 — Décrire une situation + opinion
  {
    language: 'French', cefrLevel: 'B1', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Regardez le sujet ci-dessous et parlez pendant environ 45 à 60 secondes. Donnez votre opinion et vos raisons.',
    speakingPrompt: 'Pensez-vous qu\'il est important d\'apprendre une langue étrangère ? Pourquoi ou pourquoi pas ? Donnez au moins deux raisons.',
    correctAnswer: '', points: 2, orderIndex: 5,
    rubric: { criteria: ['opinion cohérente', 'raisons à l\'appui', 'mots de liaison', 'vocabulaire approprié', 'fluidité'], maxDuration: 60 },
    tags: ['opinion', 'éducation'], timeSuggested: 60
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Décrivez une situation et donnez votre opinion. Parlez pendant environ 45 à 60 secondes.',
    speakingPrompt: 'Racontez un défi que vous avez rencontré et comment vous l\'avez surmonté. Qu\'avez-vous appris de cette expérience ?',
    correctAnswer: '', points: 2, orderIndex: 6,
    rubric: { criteria: ['structure narrative', 'temps du passé', 'réflexion', 'cohérence', 'fluidité'], maxDuration: 60 },
    tags: ['récit', 'expérience personnelle'], timeSuggested: 60
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Comparez deux choses et indiquez votre préférence. Parlez pendant environ 45 à 60 secondes.',
    speakingPrompt: 'Comparez voyager en avion et voyager en train. Lequel préférez-vous et pourquoi ?',
    correctAnswer: '', points: 2, orderIndex: 7,
    rubric: { criteria: ['structures comparatives', 'expression de la préférence', 'raisons à l\'appui', 'étendue du vocabulaire'], maxDuration: 60 },
    tags: ['comparaison', 'voyage'], timeSuggested: 60
  },
  // B2 — Décrire et discuter
  {
    language: 'French', cefrLevel: 'B2', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Discutez du sujet suivant pendant environ 60 à 90 secondes. Présentez des arguments pour et contre.',
    speakingPrompt: 'Certaines personnes pensent que la technologie rend notre vie plus facile, tandis que d\'autres estiment qu\'elle crée de nouveaux problèmes. Discutez des deux points de vue et donnez votre propre opinion.',
    correctAnswer: '', points: 2, orderIndex: 8,
    rubric: { criteria: ['discussion équilibrée', 'vocabulaire soutenu', 'marqueurs de discours', 'fluidité et cohérence', 'position claire'], maxDuration: 90 },
    tags: ['discussion', 'technologie'], timeSuggested: 90
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Décrivez et analysez. Parlez pendant environ 60 à 90 secondes.',
    speakingPrompt: 'Décrivez comment la façon dont les gens communiquent a changé au cours des vingt dernières années. Quels sont les avantages et les inconvénients de ces changements ?',
    correctAnswer: '', points: 2, orderIndex: 9,
    rubric: { criteria: ['analyse', 'cause et conséquence', 'exemples', 'argumentation cohérente', 'précision de la prononciation'], maxDuration: 90 },
    tags: ['analyse', 'communication'], timeSuggested: 90
  },
  // C1 — Argumenter une position
  {
    language: 'French', cefrLevel: 'C1', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Présentez et défendez une position sur le sujet suivant. Parlez pendant environ 90 à 120 secondes.',
    speakingPrompt: 'Dans quelle mesure les gouvernements devraient-ils réguler les plateformes de réseaux sociaux ? Considérez les questions de liberté d\'expression, de désinformation et de vie privée dans votre réponse.',
    correctAnswer: '', points: 3, orderIndex: 10,
    rubric: { criteria: ['argumentation sophistiquée', 'position nuancée', 'nuances et réserves', 'vocabulaire académique', 'fluidité soutenue', 'intonation naturelle'], maxDuration: 120 },
    tags: ['argumentation', 'politique', 'technologie'], timeSuggested: 120
  },
  {
    language: 'French', cefrLevel: 'C1', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Analysez et discutez. Parlez pendant environ 90 à 120 secondes.',
    speakingPrompt: 'Certains affirment que la mondialisation a réduit la diversité culturelle. D\'autres disent qu\'elle l\'a enrichie. Quel est votre avis ? Donnez des exemples précis.',
    correctAnswer: '', points: 3, orderIndex: 11,
    rubric: { criteria: ['pensée critique', 'exemples précis', 'structures de phrases complexes', 'langage idiomatique', 'discours prolongé cohérent'], maxDuration: 120 },
    tags: ['analyse', 'culture', 'mondialisation'], timeSuggested: 120
  },
  // C2 — Discussion abstraite
  {
    language: 'French', cefrLevel: 'C2', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Discutez du sujet abstrait suivant en profondeur. Parlez pendant environ 2 minutes.',
    speakingPrompt: 'Est-il possible d\'avoir une véritable objectivité en journalisme, ou tout reportage est-il intrinsèquement subjectif ? Explorez les implications philosophiques de cette question.',
    correctAnswer: '', points: 3, orderIndex: 12,
    rubric: { criteria: ['profondeur philosophique', 'raisonnement abstrait', 'aisance quasi native', 'registre soutenu', 'habileté rhétorique', 'conclusion nuancée'], maxDuration: 150 },
    tags: ['abstrait', 'philosophie', 'médias'], timeSuggested: 150
  },
  {
    language: 'French', cefrLevel: 'C2', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Présentez un argument nuancé sur le sujet suivant. Parlez pendant environ 2 minutes.',
    speakingPrompt: 'Dans quelle mesure la langue que nous parlons façonne-t-elle notre manière de penser et de percevoir le monde ? Appuyez-vous sur des exemples de différentes langues ou cultures si possible.',
    correctAnswer: '', points: 3, orderIndex: 13,
    rubric: { criteria: ['profondeur intellectuelle', 'références interculturelles', 'vocabulaire précis', 'flux discursif naturel', 'expression élégante'], maxDuration: 150 },
    tags: ['abstrait', 'linguistique', 'culture'], timeSuggested: 150
  },
  {
    language: 'French', cefrLevel: 'C2', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Répondez au dilemme philosophique suivant. Parlez pendant environ 2 minutes.',
    speakingPrompt: 'Si une intelligence artificielle peut produire des œuvres créatives indiscernables de l\'art humain, cela diminue-t-il la valeur de la créativité humaine ? Pourquoi ou pourquoi pas ?',
    correctAnswer: '', points: 3, orderIndex: 14,
    rubric: { criteria: ['raisonnement philosophique', 'prise en compte des contre-arguments', 'expression éloquente', 'argumentation soutenue', 'prosodie naturelle'], maxDuration: 150 },
    tags: ['abstrait', 'IA', 'créativité'], timeSuggested: 150
  },

  // ============================================================
  // NOUVELLES QUESTIONS — 16 de plus (orderIndex 15-30)
  // ============================================================

  // A1
  {
    language: 'French', cefrLevel: 'A1', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Regardez l\'image et décrivez ce que vous voyez. Utilisez des mots simples.',
    speakingPrompt: 'Décrivez l\'image : il y a une famille dans une cuisine. Que font-ils ?',
    correctAnswer: '', points: 1, orderIndex: 15,
    rubric: { criteria: ['vocabulaire de base', 'phrases simples', 'discours compréhensible'], maxDuration: 30 },
    tags: ['décrire une image', 'famille'], timeSuggested: 30
  },
  {
    language: 'French', cefrLevel: 'A1', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Parlez de vous. Parlez pendant environ 15-20 secondes.',
    speakingPrompt: 'Quel est votre travail ? Où travaillez-vous ? Aimez-vous votre travail ?',
    correctAnswer: '', points: 1, orderIndex: 16,
    rubric: { criteria: ['réponse compréhensible', 'vocabulaire de base', 'contenu pertinent'], maxDuration: 30 },
    tags: ['présentation', 'travail'], timeSuggested: 30
  },
  {
    language: 'French', cefrLevel: 'A1', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Répondez à la question suivante. Parlez pendant environ 15-20 secondes :',
    speakingPrompt: 'Quelle est votre couleur préférée ? Quels objets avez-vous dans cette couleur ?',
    correctAnswer: '', points: 1, orderIndex: 17,
    rubric: { criteria: ['vocabulaire de base', 'phrases simples', 'discours compréhensible'], maxDuration: 30 },
    tags: ['question simple', 'couleurs'], timeSuggested: 30
  },

  // A2
  {
    language: 'French', cefrLevel: 'A2', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Décrivez votre routine du matin. Parlez pendant environ 30 secondes.',
    speakingPrompt: 'Que faites-vous chaque matin ? Racontez depuis votre réveil jusqu\'à votre départ de la maison.',
    correctAnswer: '', points: 1, orderIndex: 18,
    rubric: { criteria: ['expressions temporelles', 'présent de l\'indicatif', 'mots de séquence', 'prononciation claire'], maxDuration: 45 },
    tags: ['routine', 'vie quotidienne'], timeSuggested: 45
  },
  {
    language: 'French', cefrLevel: 'A2', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Racontez une courte histoire sur quelque chose qui vous est arrivé récemment. Parlez pendant environ 30 secondes.',
    speakingPrompt: 'Racontez-moi quelque chose de drôle ou d\'intéressant qui vous est arrivé la semaine dernière.',
    correctAnswer: '', points: 1, orderIndex: 19,
    rubric: { criteria: ['passé composé', 'séquence narrative', 'fluidité de base', 'contenu pertinent'], maxDuration: 45 },
    tags: ['récit', 'passé composé'], timeSuggested: 45
  },

  // B1
  {
    language: 'French', cefrLevel: 'B1', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Parlez du sujet suivant pendant environ 45-60 secondes. Donnez votre opinion.',
    speakingPrompt: 'Pensez-vous que les enfants devraient avoir un téléphone portable ? À quel âge ? Pourquoi ou pourquoi pas ?',
    correctAnswer: '', points: 1, orderIndex: 20,
    rubric: { criteria: ['opinion cohérente', 'raisons à l\'appui', 'mots de liaison', 'fluidité'], maxDuration: 60 },
    tags: ['opinion', 'technologie'], timeSuggested: 60
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Expliquez vos projets pour l\'avenir. Parlez pendant environ 45-60 secondes.',
    speakingPrompt: 'Quels sont vos projets pour les cinq prochaines années ? Qu\'aimeriez-vous accomplir et pourquoi ?',
    correctAnswer: '', points: 1, orderIndex: 21,
    rubric: { criteria: ['futur simple', 'structures conditionnelles', 'plan cohérent', 'vocabulaire approprié'], maxDuration: 60 },
    tags: ['projets', 'futur'], timeSuggested: 60
  },

  // B2
  {
    language: 'French', cefrLevel: 'B2', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Discutez du sujet suivant pendant environ 60-90 secondes. Présentez plusieurs perspectives.',
    speakingPrompt: 'L\'éducation universitaire devrait-elle être gratuite pour tous ? Quelles sont les implications économiques et sociales ?',
    correctAnswer: '', points: 2, orderIndex: 22,
    rubric: { criteria: ['discussion équilibrée', 'vocabulaire soutenu', 'marqueurs de discours', 'fluidité et cohérence'], maxDuration: 90 },
    tags: ['débat', 'éducation'], timeSuggested: 90
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Analysez la situation suivante. Parlez pendant environ 60-90 secondes.',
    speakingPrompt: 'De nombreuses entreprises adoptent la semaine de quatre jours. Analysez les effets possibles sur la productivité, le bien-être des employés et l\'économie.',
    correctAnswer: '', points: 2, orderIndex: 23,
    rubric: { criteria: ['analyse', 'cause et conséquence', 'exemples', 'argumentation cohérente', 'précision de la prononciation'], maxDuration: 90 },
    tags: ['analyse', 'travail'], timeSuggested: 90
  },

  // C1
  {
    language: 'French', cefrLevel: 'C1', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Présentez et défendez une position. Parlez pendant environ 90-120 secondes.',
    speakingPrompt: 'La croissance économique est-elle compatible avec la durabilité environnementale, ou faut-il sacrifier l\'une pour l\'autre ? Justifiez votre position avec des preuves.',
    correctAnswer: '', points: 2, orderIndex: 24,
    rubric: { criteria: ['argumentation sophistiquée', 'position nuancée', 'nuances et réserves', 'vocabulaire académique', 'fluidité soutenue'], maxDuration: 120 },
    tags: ['argumentation', 'environnement', 'économie'], timeSuggested: 120
  },
  {
    language: 'French', cefrLevel: 'C1', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Discutez de l\'idée abstraite suivante. Parlez pendant environ 90-120 secondes.',
    speakingPrompt: 'Quel rôle joue l\'empathie dans un leadership efficace ? L\'empathie peut-elle s\'enseigner ou est-elle une qualité innée ?',
    correctAnswer: '', points: 2, orderIndex: 25,
    rubric: { criteria: ['pensée critique', 'raisonnement abstrait', 'structures de phrases complexes', 'langage idiomatique', 'discours prolongé cohérent'], maxDuration: 120 },
    tags: ['abstrait', 'leadership'], timeSuggested: 120
  },
  {
    language: 'French', cefrLevel: 'C1', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Analysez et discutez. Parlez pendant environ 90-120 secondes.',
    speakingPrompt: 'Dans quelle mesure la révolution numérique a-t-elle élargi ou réduit le fossé entre les pays développés et les pays en développement ? Donnez des exemples concrets.',
    correctAnswer: '', points: 2, orderIndex: 26,
    rubric: { criteria: ['analyse critique', 'exemples précis', 'registre académique', 'argumentation soutenue', 'intonation naturelle'], maxDuration: 120 },
    tags: ['analyse', 'technologie', 'inégalités'], timeSuggested: 120
  },

  // C2
  {
    language: 'French', cefrLevel: 'C2', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Discutez de la question philosophique suivante en profondeur. Parlez pendant environ 2 minutes.',
    speakingPrompt: 'Une société qui privilégie la liberté individuelle peut-elle jamais atteindre une véritable égalité ? Explorez les tensions inhérentes entre liberté et égalité.',
    correctAnswer: '', points: 2, orderIndex: 27,
    rubric: { criteria: ['profondeur philosophique', 'raisonnement abstrait', 'aisance quasi native', 'registre soutenu', 'habileté rhétorique'], maxDuration: 150 },
    tags: ['philosophie', 'politique', 'abstrait'], timeSuggested: 150
  },
  {
    language: 'French', cefrLevel: 'C2', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Présentez un argument nuancé sur le sujet suivant. Parlez pendant environ 2 minutes.',
    speakingPrompt: 'Le concept de « progrès » est-il culturellement relatif, ou existe-t-il des mesures universelles permettant de juger si l\'humanité avance ?',
    correctAnswer: '', points: 2, orderIndex: 28,
    rubric: { criteria: ['profondeur intellectuelle', 'références interculturelles', 'vocabulaire précis', 'flux discursif naturel', 'expression élégante'], maxDuration: 150 },
    tags: ['abstrait', 'culture', 'philosophie'], timeSuggested: 150
  },
  {
    language: 'French', cefrLevel: 'C2', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Répondez au dilemme éthique suivant. Parlez pendant environ 2 minutes.',
    speakingPrompt: 'Devrait-il y avoir des limites à la recherche scientifique dans des domaines tels que le génie génétique et l\'augmentation humaine ? Où ces limites devraient-elles se situer et qui devrait les fixer ?',
    correctAnswer: '', points: 2, orderIndex: 29,
    rubric: { criteria: ['raisonnement éthique', 'prise en compte des contre-arguments', 'expression éloquente', 'argumentation soutenue', 'prosodie naturelle'], maxDuration: 150 },
    tags: ['éthique', 'science', 'abstrait'], timeSuggested: 150
  },
  {
    language: 'French', cefrLevel: 'C2', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Discutez du sujet suivant avec profondeur philosophique. Parlez pendant environ 2 minutes.',
    speakingPrompt: 'La poursuite du bonheur comme objectif de vie mène-t-elle à une existence significative, ou le sens se trouve-t-il dans la souffrance et le sacrifice ? Discutez en vous référant aux traditions philosophiques.',
    correctAnswer: '', points: 2, orderIndex: 30,
    rubric: { criteria: ['raisonnement philosophique', 'références littéraires/philosophiques', 'registre soutenu', 'fluidité soutenue', 'conclusion nuancée'], maxDuration: 150 },
    tags: ['philosophie', 'abstrait', 'existentialisme'], timeSuggested: 150
  }
]
