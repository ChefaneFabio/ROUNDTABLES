import { MultiSkillQuestionData } from '../types'

// French Listening Questions — 7 per CEFR level (42 total)
// Types: LISTENING (multiple choice after audio), DICTATION
// Each question includes ttsScript for TTS generation

export const frenchListeningQuestions: MultiSkillQuestionData[] = [
  // ============================================================
  // A1 — Débutant (7 questions)
  // ============================================================
  {
    language: 'French', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Bonjour. Je m\'appelle Jean. Je suis français. J\'ai vingt-cinq ans. J\'aime le football.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'De quel pays est Jean ?',
    options: [{ label: 'L\'Espagne', value: 'l\'Espagne' }, { label: 'La France', value: 'la France' }, { label: 'L\'Italie', value: 'l\'Italie' }, { label: 'L\'Allemagne', value: 'l\'Allemagne' }],
    correctAnswer: 'la France', points: 1, orderIndex: 1, tags: ['présentation'], timeSuggested: 30
  },
  {
    language: 'French', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Bonjour. Je m\'appelle Jean. Je suis français. J\'ai vingt-cinq ans. J\'aime le football.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Quel âge a Jean ?',
    options: [{ label: '20 ans', value: '20' }, { label: '25 ans', value: '25' }, { label: '30 ans', value: '30' }, { label: '35 ans', value: '35' }],
    correctAnswer: '25', points: 1, orderIndex: 2, tags: ['présentation', 'nombres'], timeSuggested: 30
  },
  {
    language: 'French', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Excusez-moi, où est la banque ? Allez tout droit, puis tournez à gauche. La banque est à côté du supermarché.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Où est la banque ?',
    options: [{ label: 'À côté de la poste', value: 'à côté de la poste' }, { label: 'À côté du supermarché', value: 'à côté du supermarché' }, { label: 'À côté de la gare', value: 'à côté de la gare' }, { label: 'À côté de l\'hôpital', value: 'à côté de l\'hôpital' }],
    correctAnswer: 'à côté du supermarché', points: 1, orderIndex: 3, tags: ['directions'], timeSuggested: 30
  },
  {
    language: 'French', cefrLevel: 'A1', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'J\'aime manger de la pizza.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Écrivez exactement ce que vous entendez.',
    correctAnswer: 'J\'aime manger de la pizza.', points: 1, orderIndex: 4, tags: ['dictée'], timeSuggested: 30
  },
  {
    language: 'French', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Aujourd\'hui c\'est lundi. Demain c\'est mardi. J\'ai un cours de français le mercredi.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Quand est le cours de français ?',
    options: [{ label: 'Lundi', value: 'lundi' }, { label: 'Mardi', value: 'mardi' }, { label: 'Mercredi', value: 'mercredi' }, { label: 'Jeudi', value: 'jeudi' }],
    correctAnswer: 'mercredi', points: 1, orderIndex: 5, tags: ['jours'], timeSuggested: 30
  },
  {
    language: 'French', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Je voudrais un café, s\'il vous plaît. Bien sûr. Ça fait deux euros cinquante.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Combien coûte le café ?',
    options: [{ label: '1,50 euros', value: '1,50' }, { label: '2,00 euros', value: '2,00' }, { label: '2,50 euros', value: '2,50' }, { label: '3,00 euros', value: '3,00' }],
    correctAnswer: '2,50', points: 1, orderIndex: 6, tags: ['courses', 'nombres'], timeSuggested: 30
  },
  {
    language: 'French', cefrLevel: 'A1', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'Le dossier est sur le bureau.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Écrivez exactement ce que vous entendez.',
    correctAnswer: 'Le dossier est sur le bureau.', points: 1, orderIndex: 7, tags: ['dictée'], timeSuggested: 30
  },

  // ============================================================
  // A2 — Élémentaire (7 questions)
  // ============================================================
  {
    language: 'French', cefrLevel: 'A2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Hier soir, je suis allé au cinéma avec ma sœur. Nous avons regardé une comédie. C\'était très drôle. Après le film, nous avons dîné dans un restaurant italien.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Quel genre de film ont-ils regardé ?',
    options: [{ label: 'Un film d\'action', value: 'action' }, { label: 'Une comédie', value: 'comédie' }, { label: 'Un film d\'horreur', value: 'horreur' }, { label: 'Un drame', value: 'drame' }],
    correctAnswer: 'comédie', points: 1, orderIndex: 8, tags: ['divertissement'], timeSuggested: 40
  },
  {
    language: 'French', cefrLevel: 'A2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Hier soir, je suis allé au cinéma avec ma sœur. Nous avons regardé une comédie. C\'était très drôle. Après le film, nous avons dîné dans un restaurant italien.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Avec qui la personne est-elle allée au cinéma ?',
    options: [{ label: 'Un ami', value: 'un ami' }, { label: 'Sa sœur', value: 'sa sœur' }, { label: 'Sa mère', value: 'sa mère' }, { label: 'Seul(e)', value: 'seul(e)' }],
    correctAnswer: 'sa sœur', points: 1, orderIndex: 9, tags: ['divertissement'], timeSuggested: 40
  },
  {
    language: 'French', cefrLevel: 'A2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Le train pour Lyon part du quai numéro trois à neuf heures quinze. Veuillez préparer vos billets.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'De quel quai part le train ?',
    options: [{ label: 'Quai 1', value: '1' }, { label: 'Quai 2', value: '2' }, { label: 'Quai 3', value: '3' }, { label: 'Quai 4', value: '4' }],
    correctAnswer: '3', points: 1, orderIndex: 10, tags: ['transport'], timeSuggested: 40
  },
  {
    language: 'French', cefrLevel: 'A2', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'Elle va au travail en bus chaque matin.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Écrivez exactement ce que vous entendez.',
    correctAnswer: 'Elle va au travail en bus chaque matin.', points: 1, orderIndex: 11, tags: ['dictée'], timeSuggested: 40
  },
  {
    language: 'French', cefrLevel: 'A2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Bienvenue au musée. Il est ouvert de neuf heures du matin à dix-sept heures. Les billets coûtent huit euros pour les adultes et quatre euros pour les enfants. Il y a un café au deuxième étage.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Combien coûte un billet pour un adulte ?',
    options: [{ label: '4 euros', value: '4' }, { label: '6 euros', value: '6' }, { label: '8 euros', value: '8' }, { label: '10 euros', value: '10' }],
    correctAnswer: '8', points: 1, orderIndex: 12, tags: ['tourisme'], timeSuggested: 40
  },
  {
    language: 'French', cefrLevel: 'A2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'D\'habitude, je me réveille à sept heures. D\'abord, je prends une douche et je m\'habille. Ensuite, je prends le petit déjeuner — en général des tartines et du café. Je quitte la maison à huit heures et demie.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Que prend la personne habituellement au petit déjeuner ?',
    options: [{ label: 'Des céréales et du lait', value: 'céréales' }, { label: 'Des tartines et du café', value: 'des tartines et du café' }, { label: 'Des œufs et du jus', value: 'œufs' }, { label: 'Rien', value: 'rien' }],
    correctAnswer: 'des tartines et du café', points: 1, orderIndex: 13, tags: ['routine quotidienne'], timeSuggested: 40
  },
  {
    language: 'French', cefrLevel: 'A2', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'Nous avons passé de merveilleuses vacances en Espagne l\'année dernière.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Écrivez exactement ce que vous entendez.',
    correctAnswer: 'Nous avons passé de merveilleuses vacances en Espagne l\'année dernière.', points: 1, orderIndex: 14, tags: ['dictée'], timeSuggested: 40
  },

  // ============================================================
  // B1 — Intermédiaire (7 questions)
  // ============================================================
  {
    language: 'French', cefrLevel: 'B1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Bonjour. Je voudrais prendre rendez-vous avec le docteur Martin, s\'il vous plaît. J\'ai des maux de tête depuis environ une semaine. Le premier créneau disponible est jeudi prochain à quatorze heures trente. Est-ce que cela vous convient ?',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Pourquoi la personne appelle-t-elle ?',
    options: [
      { label: 'Pour annuler un rendez-vous', value: 'annuler' },
      { label: 'Pour prendre un rendez-vous médical', value: 'prendre rendez-vous' },
      { label: 'Pour demander des médicaments', value: 'médicaments' },
      { label: 'Pour se plaindre du service', value: 'se plaindre' }
    ],
    correctAnswer: 'prendre rendez-vous', points: 2, orderIndex: 15, tags: ['santé', 'rendez-vous'], timeSuggested: 45
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Bonjour. Je voudrais prendre rendez-vous avec le docteur Martin, s\'il vous plaît. J\'ai des maux de tête depuis environ une semaine. Le premier créneau disponible est jeudi prochain à quatorze heures trente.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Quand est le premier rendez-vous disponible ?',
    options: [
      { label: 'Lundi à 14h00', value: 'lundi 14h00' },
      { label: 'Mercredi à 15h00', value: 'mercredi 15h00' },
      { label: 'Jeudi à 14h30', value: 'jeudi 14h30' },
      { label: 'Vendredi à 10h00', value: 'vendredi 10h00' }
    ],
    correctAnswer: 'jeudi 14h30', points: 2, orderIndex: 16, tags: ['rendez-vous'], timeSuggested: 45
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Selon une enquête récente, soixante-dix pour cent des jeunes de dix-huit à vingt-cinq ans consultent leur téléphone dans les dix premières minutes après le réveil. Les experts avertissent que cette habitude peut augmenter le niveau de stress et réduire la productivité tout au long de la journée.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Quel pourcentage de jeunes consultent leur téléphone peu après le réveil ?',
    options: [{ label: '50 %', value: '50' }, { label: '60 %', value: '60' }, { label: '70 %', value: '70' }, { label: '80 %', value: '80' }],
    correctAnswer: '70', points: 2, orderIndex: 17, tags: ['technologie', 'santé'], timeSuggested: 45
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'L\'entreprise a décidé d\'introduire des horaires de travail flexibles pour tous les employés à partir du mois prochain.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Écrivez exactement ce que vous entendez.',
    correctAnswer: 'L\'entreprise a décidé d\'introduire des horaires de travail flexibles pour tous les employés à partir du mois prochain.', points: 2, orderIndex: 18, tags: ['dictée', 'travail'], timeSuggested: 60
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Attention, passagers. Le vol de douze heures quinze à destination de Barcelone est retardé d\'environ quarante-cinq minutes en raison du mauvais temps. Nous nous excusons pour la gêne occasionnée. Veuillez consulter le tableau des départs pour les mises à jour.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Pourquoi le vol est-il retardé ?',
    options: [
      { label: 'Des problèmes techniques', value: 'technique' },
      { label: 'Le mauvais temps', value: 'mauvais temps' },
      { label: 'Un manque de personnel', value: 'personnel' },
      { label: 'Un contrôle de sécurité', value: 'sécurité' }
    ],
    correctAnswer: 'mauvais temps', points: 2, orderIndex: 19, tags: ['voyage'], timeSuggested: 45
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Le nouveau centre communautaire ouvrira en mars. Il comprendra une piscine, une salle de sport et plusieurs salles de réunion. L\'abonnement coûte trente euros par mois pour les adultes. Il y a des réductions pour les étudiants et les personnes âgées.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Qui peut bénéficier de réductions sur l\'abonnement ?',
    options: [
      { label: 'Les enfants et les enseignants', value: 'enfants et enseignants' },
      { label: 'Les étudiants et les personnes âgées', value: 'étudiants et personnes âgées' },
      { label: 'Les familles et les couples', value: 'familles' },
      { label: 'Tout le monde', value: 'tout le monde' }
    ],
    correctAnswer: 'étudiants et personnes âgées', points: 2, orderIndex: 20, tags: ['communauté'], timeSuggested: 45
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'Bien que le temps ait été terrible, nous avons quand même réussi à profiter de notre journée à la plage.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Écrivez exactement ce que vous entendez.',
    correctAnswer: 'Bien que le temps ait été terrible, nous avons quand même réussi à profiter de notre journée à la plage.', points: 2, orderIndex: 21, tags: ['dictée'], timeSuggested: 60
  },

  // ============================================================
  // B2 — Intermédiaire supérieur (7 questions)
  // ============================================================
  {
    language: 'French', cefrLevel: 'B2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'L\'équipe de recherche de l\'université de la Sorbonne a publié des résultats suggérant que la méditation régulière peut physiquement modifier la structure du cerveau. Les participants qui ont médité trente minutes par jour pendant huit semaines ont montré une augmentation de la densité de matière grise dans les zones associées à la mémoire et à la régulation émotionnelle, tandis que les zones liées au stress ont montré une diminution de densité.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Qu\'est-il arrivé aux zones du cerveau liées au stress ?',
    options: [
      { label: 'Elles ont augmenté en taille', value: 'augmenté' },
      { label: 'Elles ont montré une diminution de densité', value: 'diminution de densité' },
      { label: 'Elles n\'ont pas été affectées', value: 'pas affectées' },
      { label: 'Elles ont amélioré leur fonctionnement', value: 'amélioré' }
    ],
    correctAnswer: 'diminution de densité', points: 2, orderIndex: 22, tags: ['science', 'santé'], timeSuggested: 60
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'L\'équipe de recherche de l\'université de la Sorbonne a publié des résultats suggérant que la méditation régulière peut physiquement modifier la structure du cerveau. Les participants qui ont médité trente minutes par jour pendant huit semaines ont montré une augmentation de la densité de matière grise dans les zones associées à la mémoire et à la régulation émotionnelle.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Combien de temps les participants ont-ils médité chaque jour ?',
    options: [{ label: '10 minutes', value: '10' }, { label: '20 minutes', value: '20' }, { label: '30 minutes', value: '30' }, { label: '60 minutes', value: '60' }],
    correctAnswer: '30', points: 2, orderIndex: 23, tags: ['science'], timeSuggested: 60
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Beaucoup de gens pensent que le multitâche les rend plus productifs, mais les recherches en neurosciences racontent une tout autre histoire. Lorsque nous passons d\'une tâche à l\'autre, notre cerveau a besoin de temps pour se réorienter, ce qui réduit en fait l\'efficacité. Des études suggèrent que ce que nous appelons le multitâche est en réalité un basculement rapide entre les tâches, et que cela peut réduire la productivité jusqu\'à quarante pour cent.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Selon le passage, le multitâche peut réduire la productivité jusqu\'à :',
    options: [{ label: '10 %', value: '10' }, { label: '20 %', value: '20' }, { label: '30 %', value: '30' }, { label: '40 %', value: '40' }],
    correctAnswer: '40', points: 2, orderIndex: 24, tags: ['productivité'], timeSuggested: 60
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'Malgré le ralentissement économique, l\'entreprise a réussi à augmenter ses bénéfices en diversifiant sa gamme de produits et en s\'étendant sur de nouveaux marchés.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Écrivez exactement ce que vous entendez.',
    correctAnswer: 'Malgré le ralentissement économique, l\'entreprise a réussi à augmenter ses bénéfices en diversifiant sa gamme de produits et en s\'étendant sur de nouveaux marchés.', points: 2, orderIndex: 25, tags: ['dictée', 'affaires'], timeSuggested: 90
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Le conseil municipal a annoncé des plans pour transformer l\'usine abandonnée de la rue du Fleuve en un ensemble à usage mixte. Le projet comprendra des logements abordables, des espaces commerciaux et un parc public. Les travaux devraient commencer au printemps et être achevés en deux ans. Les résidents locaux ont exprimé des sentiments mitigés — certains accueillent favorablement le projet, tandis que d\'autres s\'inquiètent de l\'augmentation du trafic et du bruit.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Quelle inquiétude certains résidents ont-ils ?',
    options: [
      { label: 'Des impôts plus élevés', value: 'impôts' },
      { label: 'L\'augmentation du trafic et du bruit', value: 'trafic et bruit' },
      { label: 'La perte d\'espaces verts', value: 'espaces verts' },
      { label: 'La criminalité', value: 'criminalité' }
    ],
    correctAnswer: 'trafic et bruit', points: 2, orderIndex: 26, tags: ['communauté', 'urbain'], timeSuggested: 60
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Le concept de revenu universel de base a gagné du terrain ces dernières années, notamment à la suite des perturbations économiques causées par l\'automatisation. Les partisans soutiennent qu\'offrir à chaque citoyen un revenu minimum garanti réduirait la pauvreté et donnerait aux gens la liberté de poursuivre des études ou de créer une entreprise. Les sceptiques s\'inquiètent du coût et des effets potentiels sur la motivation au travail.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Quelle inquiétude les sceptiques ont-ils au sujet du revenu universel ?',
    options: [
      { label: 'Ce serait trop compliqué à gérer', value: 'compliqué' },
      { label: 'Le coût et les effets potentiels sur la motivation au travail', value: 'coût et motivation au travail' },
      { label: 'Cela augmenterait les inégalités', value: 'inégalités' },
      { label: 'Cela réduirait les normes éducatives', value: 'éducation' }
    ],
    correctAnswer: 'coût et motivation au travail', points: 2, orderIndex: 27, tags: ['économie', 'politique'], timeSuggested: 60
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'Le gouvernement s\'est engagé à investir massivement dans les infrastructures d\'énergie renouvelable au cours de la prochaine décennie.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Écrivez exactement ce que vous entendez.',
    correctAnswer: 'Le gouvernement s\'est engagé à investir massivement dans les infrastructures d\'énergie renouvelable au cours de la prochaine décennie.', points: 2, orderIndex: 28, tags: ['dictée', 'politique'], timeSuggested: 90
  },

  // ============================================================
  // C1 — Avancé (7 questions)
  // ============================================================
  {
    language: 'French', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Le phénomène de dissonance cognitive, décrit pour la première fois par Léon Festinger en mille neuf cent cinquante-sept, se produit lorsque des individus ont simultanément deux croyances contradictoires. Plutôt que de tolérer l\'inconfort, les gens ont tendance à modifier l\'une des croyances ou à rationaliser l\'incohérence. Cela a des implications importantes pour la compréhension de la polarisation politique, car les individus peuvent rejeter des preuves crédibles qui contredisent leur vision du monde.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Comment les gens réagissent-ils généralement à la dissonance cognitive ?',
    options: [
      { label: 'Ils acceptent les deux croyances contradictoires', value: 'acceptent les deux' },
      { label: 'Ils modifient une croyance ou rationalisent l\'incohérence', value: 'modifient ou rationalisent' },
      { label: 'Ils cherchent une aide professionnelle', value: 'aide professionnelle' },
      { label: 'Ils ignorent les deux croyances', value: 'ignorent les deux' }
    ],
    correctAnswer: 'modifient ou rationalisent', points: 3, orderIndex: 29, tags: ['psychologie'], timeSuggested: 75
  },
  {
    language: 'French', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Des études longitudinales suivant des enfants de la petite enfance à l\'âge adulte ont constamment montré que le statut socio-économique à la naissance est l\'un des prédicteurs les plus puissants du niveau d\'éducation et des revenus au cours de la vie. Cependant, des interventions telles que l\'éducation préscolaire de haute qualité et les programmes de mentorat se sont révélées prometteuses pour atténuer ces disparités, en particulier lorsqu\'elles sont mises en œuvre avant l\'âge de cinq ans.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'À quel âge les interventions sont-elles les plus efficaces selon la recherche ?',
    options: [
      { label: 'Avant 5 ans', value: 'avant 5 ans' },
      { label: 'Entre 5 et 10 ans', value: '5 à 10 ans' },
      { label: 'Pendant l\'adolescence', value: 'adolescence' },
      { label: 'Au début de l\'âge adulte', value: 'début âge adulte' }
    ],
    correctAnswer: 'avant 5 ans', points: 3, orderIndex: 30, tags: ['éducation', 'sociologie'], timeSuggested: 75
  },
  {
    language: 'French', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Ces dernières années, beaucoup d\'entreprises ont abandonné l\'évaluation annuelle au profit du feedback continu : de courtes conversations toutes les deux semaines entre le manager et son collaborateur. L\'idée n\'est pas de parler davantage, mais de parler plus tôt. Un petit ajustement en mars évite qu\'un problème ne devienne irrécupérable en décembre. Ce changement exige toutefois plus d\'engagement de la part des managers, qui doivent développer des capacités d\'écoute active qu\'ils n\'ont souvent jamais exercées.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Quel est l\'objectif principal du feedback continu ?',
    options: [
      { label: 'Détecter de petits problèmes avant qu\'ils ne deviennent graves', value: 'detecter avant que graves' },
      { label: 'Donner des compliments plus fréquents aux collaborateurs', value: 'compliments fréquents' },
      { label: 'Remplacer le rôle des Ressources Humaines', value: 'remplacer RH' },
      { label: 'Surveiller la productivité en temps réel', value: 'surveiller productivité' }
    ],
    correctAnswer: 'detecter avant que graves', points: 3, orderIndex: 31, tags: ['travail', 'management'], timeSuggested: 75
  },
  {
    language: 'French', cefrLevel: 'C1', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'Le rythme sans précédent du changement technologique a fondamentalement modifié la nature du travail, exigeant une adaptation continue et un apprentissage tout au long de la vie.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Écrivez exactement ce que vous entendez.',
    correctAnswer: 'Le rythme sans précédent du changement technologique a fondamentalement modifié la nature du travail, exigeant une adaptation continue et un apprentissage tout au long de la vie.', points: 3, orderIndex: 32, tags: ['dictée'], timeSuggested: 90
  },
  {
    language: 'French', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Les recherches sur la rétention des talents montrent que les quatre-vingt-dix premiers jours d\'un collaborateur dans l\'entreprise sont décisifs. Durant cette période se forment des convictions qui influenceront son engagement pendant des années : rester ou non, comment se comporter avec les collègues, à quel point s\'investir émotionnellement dans les projets. Pourtant, beaucoup d\'organisations limitent l\'intégration à la première semaine — remise de l\'ordinateur, livret d\'accueil, rendez-vous avec les RH — et laissent ensuite la nouvelle recrue se débrouiller seule.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Pourquoi les quatre-vingt-dix premiers jours sont-ils si importants ?',
    options: [
      { label: 'Des convictions qui pèsent sur l\'engagement à long terme s\'y installent', value: 'convictions qui pesent sur engagement' },
      { label: 'Parce que la plupart des démissions ont lieu la première semaine', value: 'demissions premiere semaine' },
      { label: 'Parce que les évaluations de performance commencent à 90 jours', value: 'evaluations a 90 jours' },
      { label: 'Parce que les autorisations de travail expirent à cette période', value: 'autorisations expirent' }
    ],
    correctAnswer: 'convictions qui pesent sur engagement', points: 3, orderIndex: 33, tags: ['travail', 'RH'], timeSuggested: 75
  },
  {
    language: 'French', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Le concept d\'économie circulaire représente un changement de paradigme par rapport au modèle linéaire traditionnel de production et de consommation. Plutôt que de suivre un schéma « extraire, fabriquer, jeter », l\'économie circulaire vise à maintenir les ressources en usage le plus longtemps possible, à en extraire la valeur maximale, puis à récupérer et régénérer les produits et matériaux en fin de vie.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Comment le modèle économique traditionnel est-il décrit ?',
    options: [
      { label: 'Circulaire', value: 'circulaire' },
      { label: 'Extraire, fabriquer, jeter', value: 'extraire, fabriquer, jeter' },
      { label: 'Durable', value: 'durable' },
      { label: 'Régénératif', value: 'régénératif' }
    ],
    correctAnswer: 'extraire, fabriquer, jeter', points: 3, orderIndex: 34, tags: ['économie', 'environnement'], timeSuggested: 75
  },
  {
    language: 'French', cefrLevel: 'C1', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'Nonobstant les progrès considérables réalisés dans le domaine des énergies renouvelables, la transition vers l\'abandon des combustibles fossiles reste semée de défis économiques et politiques.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Écrivez exactement ce que vous entendez.',
    correctAnswer: 'Nonobstant les progrès considérables réalisés dans le domaine des énergies renouvelables, la transition vers l\'abandon des combustibles fossiles reste semée de défis économiques et politiques.', points: 3, orderIndex: 35, tags: ['dictée'], timeSuggested: 90
  },

  // ============================================================
  // C2 — Maîtrise (7 questions)
  // ============================================================
  {
    language: 'French', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Le paradoxe de la collaboration moderne, c\'est que plus nous collaborons, moins nous travaillons vraiment. Les études sur l\'usage du temps montrent qu\'un travailleur du savoir passe en moyenne vingt-trois heures par semaine en réunion : un chiffre qui a doublé en quinze ans. Les réunions sont devenues le moyen de montrer son engagement, de partager la responsabilité et d\'éviter de décider seul. Mais chaque heure de réunion est une heure soustraite au travail concentré, et le coût du changement de contexte après chaque rencontre est désormais bien documenté.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Pourquoi les réunions se sont-elles autant multipliées ?',
    options: [
      { label: 'Elles servent à partager la responsabilité et à montrer son engagement', value: 'partager responsabilite et engagement' },
      { label: 'Parce qu\'elles remplacent totalement l\'email', value: 'remplacent email' },
      { label: 'Parce que les entreprises mesurent le travail en heures de réunion', value: 'mesurent en heures' },
      { label: 'Parce que les salariés préfèrent travailler en groupe', value: 'preference groupe' }
    ],
    correctAnswer: 'partager responsabilite et engagement', points: 3, orderIndex: 36, tags: ['travail', 'management'], timeSuggested: 90
  },
  {
    language: 'French', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Quand un collaborateur clé démissionne, la réaction instinctive est la contre-offre. Les données montrent pourtant que cette stratégie fonctionne à court terme — la plupart acceptent — mais deux tiers partent quand même dans l\'année. La raison est structurelle : la décision de partir concerne rarement l\'argent. Elle porte sur le manque de perspectives d\'évolution, un conflit avec un manager, le sentiment de ne pas être valorisé. La contre-offre soigne le symptôme, pas la cause. Les entreprises qui retiennent leurs talents investissent dans des conversations bien avant qu\'une lettre de démission n\'arrive.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Pourquoi la contre-offre échoue-t-elle souvent ?',
    options: [
      { label: 'Elle traite le symptôme mais pas la cause structurelle de l\'insatisfaction', value: 'traite symptome pas cause' },
      { label: 'Les salaires proposés sont insuffisants', value: 'salaires bas' },
      { label: 'Le collaborateur en redemande après quelques mois', value: 'en redemande' },
      { label: 'La loi interdit les offres rétroactives', value: 'loi interdit' }
    ],
    correctAnswer: 'traite symptome pas cause', points: 3, orderIndex: 37, tags: ['travail', 'rétention'], timeSuggested: 90
  },
  {
    language: 'French', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Dans une vaste enquête interne sur ce qui rend les équipes efficaces, Google a identifié un facteur dominant : la sécurité psychologique. C\'est-à-dire le sentiment de pouvoir exprimer une opinion, reconnaître une erreur ou poser une question sans craindre de conséquences professionnelles. Les équipes à forte sécurité psychologique produisent plus d\'innovation, apprennent plus vite de leurs erreurs et fidélisent mieux. Mais cela ne se construit pas avec des politiques d\'entreprise : cela se construit avec ce que le manager dit quand quelqu\'un admet une erreur, et avec ce qu\'il ne dit pas dans les moments de silence.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Comment se construit la sécurité psychologique selon le passage ?',
    options: [
      { label: 'Par le comportement quotidien du manager, pas par les politiques formelles', value: 'comportement du manager' },
      { label: 'Par des règlements internes sur l\'éthique', value: 'reglements ethiques' },
      { label: 'En formant les nouveaux managers aux techniques de communication', value: 'formation managers' },
      { label: 'En sanctionnant sévèrement les erreurs pour éviter qu\'elles ne se répètent', value: 'sanctionner erreurs' }
    ],
    correctAnswer: 'comportement du manager', points: 3, orderIndex: 38, tags: ['travail', 'équipe'], timeSuggested: 90
  },
  {
    language: 'French', cefrLevel: 'C2', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'Le véritable indicateur du succès d\'un manager n\'est pas le nombre de décisions qu\'il prend chaque jour, mais la qualité des décisions que ses collaborateurs prennent en toute autonomie.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Écrivez exactement ce que vous entendez.',
    correctAnswer: 'Le véritable indicateur du succès d\'un manager n\'est pas le nombre de décisions qu\'il prend chaque jour, mais la qualité des décisions que ses collaborateurs prennent en toute autonomie.', points: 3, orderIndex: 39, tags: ['dictée', 'travail'], timeSuggested: 120
  },
  {
    language: 'French', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Les recherches sur le travail cognitif convergent sur une vérité contre-intuitive : ce n\'est pas la durée du travail qui limite la productivité, mais sa fragmentation. Chaque fois que nous passons d\'une tâche à une autre — une notification, un message dans le chat, une réunion imprévue — le cerveau met entre quinze et vingt-cinq minutes à retrouver pleinement son niveau de concentration précédent. Dans une journée typique avec trente interruptions, cela signifie littéralement qu\'une grande partie du temps travaillé ne produit pas de valeur. Certaines entreprises ont commencé à instaurer des plages protégées de deux ou trois heures sans réunion.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Pourquoi les plages de temps protégées sont-elles importantes ?',
    options: [
      { label: 'Le cerveau met de longues minutes à retrouver sa concentration après chaque interruption', value: 'long retour de concentration' },
      { label: 'Parce que les salariés demandent plus de pauses', value: 'plus de pauses' },
      { label: 'Parce que les longues réunions sont fatigantes', value: 'reunions fatigantes' },
      { label: 'Parce que les notifications sont interdites par la loi', value: 'notifications interdites' }
    ],
    correctAnswer: 'long retour de concentration', points: 3, orderIndex: 40, tags: ['travail', 'productivité'], timeSuggested: 90
  },
  {
    language: 'French', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Donner du feedback dans une équipe internationale est l\'une des tâches les plus sous-estimées du management moderne. Ce qui dans certaines cultures est jugé direct et utile — signaler une erreur en réunion, par exemple — est lu dans d\'autres comme une attaque publique. L\'inverse est également vrai : un feedback clair dans une culture est si feutré pour une autre qu\'il n\'est même pas perçu comme une critique. Les managers les plus efficaces n\'adoptent pas un seul style : ils adaptent leur mode de transmission au destinataire et vérifient que le message a bien été reçu comme prévu.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Que fait un manager efficace dans une équipe internationale ?',
    options: [
      { label: 'Il adapte son style de feedback et vérifie qu\'il a été compris', value: 'adapte style et verifie' },
      { label: 'Il utilise toujours le style le plus direct possible', value: 'style direct' },
      { label: 'Il délègue le feedback aux RH locales', value: 'delegue RH' },
      { label: 'Il évite les conversations difficiles', value: 'evite conversations' }
    ],
    correctAnswer: 'adapte style et verifie', points: 3, orderIndex: 41, tags: ['travail', 'communication interculturelle'], timeSuggested: 90
  },
  {
    language: 'French', cefrLevel: 'C2', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'Nonobstant l\'apparente démocratisation de l\'information par les technologies numériques, l\'accès à un savoir fiable et de haute qualité reste profondément stratifié selon des lignes socio-économiques.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Écrivez exactement ce que vous entendez.',
    correctAnswer: 'Nonobstant l\'apparente démocratisation de l\'information par les technologies numériques, l\'accès à un savoir fiable et de haute qualité reste profondément stratifié selon des lignes socio-économiques.', points: 3, orderIndex: 42, tags: ['dictée'], timeSuggested: 120
  },

  // ============================================================
  // ADDITIONAL QUESTIONS (30 more — orderIndex 43–72)
  // ============================================================

  // --- A1 — Débutant (5 questions) ---
  {
    language: 'French', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Je m\'appelle Marie. J\'habite à Paris. Je travaille chez Renault. Mon poste est assistante de direction.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Où travaille Marie ?',
    options: [{ label: 'Chez Peugeot', value: 'Peugeot' }, { label: 'Chez Renault', value: 'Renault' }, { label: 'Chez Total', value: 'Total' }, { label: 'Chez Airbus', value: 'Airbus' }],
    correctAnswer: 'Renault', points: 1, orderIndex: 43, tags: ['travail', 'présentation'], timeSuggested: 30
  },
  {
    language: 'French', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Il fait beau aujourd\'hui. Le soleil brille. Il fait vingt degrés.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Quelle température fait-il ?',
    options: [{ label: '15 degrés', value: '15' }, { label: '20 degrés', value: '20' }, { label: '25 degrés', value: '25' }, { label: '30 degrés', value: '30' }],
    correctAnswer: '20', points: 1, orderIndex: 44, tags: ['météo', 'nombres'], timeSuggested: 30
  },
  {
    language: 'French', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Ma collègue travaille dans un hôpital. Elle est infirmière. Elle commence à huit heures.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Quel est le métier de la collègue ?',
    options: [{ label: 'Docteur', value: 'docteur' }, { label: 'Infirmière', value: 'infirmière' }, { label: 'Professeur', value: 'professeur' }, { label: 'Secrétaire', value: 'secrétaire' }],
    correctAnswer: 'infirmière', points: 1, orderIndex: 45, tags: ['métiers', 'travail'], timeSuggested: 30
  },
  {
    language: 'French', cefrLevel: 'A1', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'Mon contrat a trois mois.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Écrivez exactement ce que vous entendez.',
    correctAnswer: 'Mon contrat a trois mois.', points: 1, orderIndex: 46, tags: ['dictée', 'travail'], timeSuggested: 30
  },
  {
    language: 'French', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Au marché, je veux acheter des pommes, du pain et du fromage.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Qu\'est-ce que la personne veut acheter ?',
    options: [
      { label: 'Des oranges, du riz et du beurre', value: 'oranges riz beurre' },
      { label: 'Des pommes, du pain et du fromage', value: 'pommes pain fromage' },
      { label: 'Des bananes, du lait et du chocolat', value: 'bananes lait chocolat' },
      { label: 'Des tomates, du poisson et du sel', value: 'tomates poisson sel' }
    ],
    correctAnswer: 'pommes pain fromage', points: 1, orderIndex: 47, tags: ['courses', 'nourriture'], timeSuggested: 30
  },

  // --- A2 — Élémentaire (5 questions) ---
  {
    language: 'French', cefrLevel: 'A2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Le week-end dernier, Sophie est allée à la plage avec ses amis. Ils ont nagé dans la mer et ont joué au volleyball. Le soir, ils ont fait un barbecue.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Qu\'ont-ils fait le soir ?',
    options: [{ label: 'Ils ont regardé un film', value: 'film' }, { label: 'Ils ont fait un barbecue', value: 'barbecue' }, { label: 'Ils sont rentrés chez eux', value: 'rentrés' }, { label: 'Ils ont dîné au restaurant', value: 'restaurant' }],
    correctAnswer: 'barbecue', points: 1, orderIndex: 48, tags: ['loisirs', 'passé composé'], timeSuggested: 40
  },
  {
    language: 'French', cefrLevel: 'A2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Je cherche un appartement. Je voudrais deux chambres, un salon et un balcon. Mon budget est de six cents euros par mois maximum.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Quel est le budget maximum par mois ?',
    options: [{ label: '400 euros', value: '400' }, { label: '500 euros', value: '500' }, { label: '600 euros', value: '600' }, { label: '700 euros', value: '700' }],
    correctAnswer: '600', points: 1, orderIndex: 49, tags: ['logement', 'nombres'], timeSuggested: 40
  },
  {
    language: 'French', cefrLevel: 'A2', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'Il pleut beaucoup en automne dans cette région.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Écrivez exactement ce que vous entendez.',
    correctAnswer: 'Il pleut beaucoup en automne dans cette région.', points: 1, orderIndex: 50, tags: ['dictée', 'météo'], timeSuggested: 40
  },
  {
    language: 'French', cefrLevel: 'A2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Pour aller à la gare, prenez la première rue à droite, puis continuez tout droit pendant cinq minutes. La gare est en face de la pharmacie.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Où se trouve la gare ?',
    options: [
      { label: 'À côté de la boulangerie', value: 'boulangerie' },
      { label: 'Derrière l\'école', value: 'école' },
      { label: 'En face de la pharmacie', value: 'en face de la pharmacie' },
      { label: 'Près du parc', value: 'parc' }
    ],
    correctAnswer: 'en face de la pharmacie', points: 1, orderIndex: 51, tags: ['directions'], timeSuggested: 40
  },
  {
    language: 'French', cefrLevel: 'A2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Ce matin, j\'ai raté mon bus. J\'ai dû marcher jusqu\'au bureau. Je suis arrivé en retard de vingt minutes. Mon chef n\'était pas content.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Pourquoi la personne est-elle arrivée en retard ?',
    options: [
      { label: 'Sa voiture est tombée en panne', value: 'voiture' },
      { label: 'Elle a raté son bus', value: 'raté son bus' },
      { label: 'Le métro était en grève', value: 'métro' },
      { label: 'Elle s\'est réveillée tard', value: 'réveillée tard' }
    ],
    correctAnswer: 'raté son bus', points: 1, orderIndex: 52, tags: ['transport', 'travail'], timeSuggested: 40
  },

  // --- B1 — Intermédiaire (5 questions) ---
  {
    language: 'French', cefrLevel: 'B1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Mesdames et messieurs, bienvenue à bord du TGV numéro huit cent quarante-deux à destination de Marseille. Nous effectuerons un arrêt à Lyon à onze heures quarante-cinq. Le wagon-restaurant se trouve en voiture sept. Nous vous souhaitons un agréable voyage.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'À quelle heure le train s\'arrête-t-il à Lyon ?',
    options: [
      { label: '10h30', value: '10h30' },
      { label: '11h15', value: '11h15' },
      { label: '11h45', value: '11h45' },
      { label: '12h00', value: '12h00' }
    ],
    correctAnswer: '11h45', points: 1, orderIndex: 53, tags: ['transport', 'annonce'], timeSuggested: 45
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'J\'ai travaillé dans cette entreprise pendant cinq ans en tant que comptable. J\'ai décidé de démissionner parce que je voulais changer de carrière. Maintenant, je suis une formation en informatique et j\'espère devenir développeur web.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Que veut devenir cette personne ?',
    options: [
      { label: 'Comptable', value: 'comptable' },
      { label: 'Professeur d\'informatique', value: 'professeur' },
      { label: 'Développeur web', value: 'développeur web' },
      { label: 'Chef de projet', value: 'chef de projet' }
    ],
    correctAnswer: 'développeur web', points: 1, orderIndex: 54, tags: ['carrière', 'travail'], timeSuggested: 45
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'Les résultats de l\'enquête montrent que la majorité des employés préfèrent le télétravail deux jours par semaine.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Écrivez exactement ce que vous entendez.',
    correctAnswer: 'Les résultats de l\'enquête montrent que la majorité des employés préfèrent le télétravail deux jours par semaine.', points: 1, orderIndex: 55, tags: ['dictée', 'travail'], timeSuggested: 60
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'La mairie a organisé une réunion publique hier soir pour discuter de la construction d\'une nouvelle bibliothèque dans le quartier. Environ cent cinquante personnes étaient présentes. La plupart des habitants étaient favorables au projet, mais certains ont soulevé des questions sur le financement et le stationnement.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Quelles préoccupations certains habitants ont-ils soulevées ?',
    options: [
      { label: 'Le bruit et la pollution', value: 'bruit pollution' },
      { label: 'Le financement et le stationnement', value: 'financement et stationnement' },
      { label: 'Les horaires d\'ouverture', value: 'horaires' },
      { label: 'La sécurité du quartier', value: 'sécurité' }
    ],
    correctAnswer: 'financement et stationnement', points: 1, orderIndex: 56, tags: ['communauté', 'urbanisme'], timeSuggested: 45
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Selon un rapport publié ce matin, le nombre de touristes étrangers en France a augmenté de quinze pour cent par rapport à l\'année dernière. Les visiteurs viennent principalement d\'Allemagne, du Royaume-Uni et des États-Unis. Paris reste la destination la plus populaire, suivie de Nice et de Lyon.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Quelle est la deuxième destination la plus populaire ?',
    options: [
      { label: 'Lyon', value: 'Lyon' },
      { label: 'Marseille', value: 'Marseille' },
      { label: 'Nice', value: 'Nice' },
      { label: 'Bordeaux', value: 'Bordeaux' }
    ],
    correctAnswer: 'Nice', points: 1, orderIndex: 57, tags: ['tourisme', 'statistiques'], timeSuggested: 45
  },

  // --- B2 — Intermédiaire supérieur (5 questions) ---
  {
    language: 'French', cefrLevel: 'B2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Une étude menée par l\'INSERM révèle que les personnes qui dorment moins de six heures par nuit ont un risque accru de développer des maladies cardiovasculaires. Les chercheurs recommandent entre sept et huit heures de sommeil pour les adultes. Ils soulignent également que la qualité du sommeil est aussi importante que sa durée, et que l\'utilisation des écrans avant le coucher perturbe significativement le cycle du sommeil.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Combien d\'heures de sommeil les chercheurs recommandent-ils ?',
    options: [
      { label: '5 à 6 heures', value: '5 à 6' },
      { label: '6 à 7 heures', value: '6 à 7' },
      { label: '7 à 8 heures', value: '7 à 8' },
      { label: '8 à 9 heures', value: '8 à 9' }
    ],
    correctAnswer: '7 à 8', points: 2, orderIndex: 58, tags: ['santé', 'science'], timeSuggested: 60
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Le marché de l\'emploi connaît une transformation profonde avec l\'essor de l\'intelligence artificielle. Si certains secteurs voient des suppressions de postes, d\'autres en créent massivement. Les métiers liés à l\'analyse de données, à la cybersécurité et à l\'éthique de l\'IA sont particulièrement recherchés. Les experts estiment que d\'ici cinq ans, trente pour cent des emplois actuels seront significativement modifiés.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Quel pourcentage d\'emplois sera significativement modifié d\'ici cinq ans ?',
    options: [{ label: '10 %', value: '10' }, { label: '20 %', value: '20' }, { label: '30 %', value: '30' }, { label: '50 %', value: '50' }],
    correctAnswer: '30', points: 2, orderIndex: 59, tags: ['emploi', 'technologie'], timeSuggested: 60
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'Les scientifiques ont découvert que la pollution atmosphérique affecte non seulement la santé respiratoire, mais aussi les capacités cognitives des populations urbaines.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Écrivez exactement ce que vous entendez.',
    correctAnswer: 'Les scientifiques ont découvert que la pollution atmosphérique affecte non seulement la santé respiratoire, mais aussi les capacités cognitives des populations urbaines.', points: 2, orderIndex: 60, tags: ['dictée', 'environnement'], timeSuggested: 90
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Le débat sur la semaine de quatre jours prend de l\'ampleur en France. Plusieurs entreprises pilotes ont testé ce modèle pendant un an. Les résultats montrent une augmentation de la productivité de douze pour cent et une réduction significative de l\'absentéisme. Néanmoins, les syndicats insistent sur le fait que la charge de travail ne doit pas être comprimée en quatre jours, mais réellement réduite.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Quelle est la condition posée par les syndicats ?',
    options: [
      { label: 'Une augmentation de salaire', value: 'salaire' },
      { label: 'Que la charge de travail soit réellement réduite', value: 'charge réduite' },
      { label: 'Plus de jours de congé', value: 'congés' },
      { label: 'Le maintien du télétravail', value: 'télétravail' }
    ],
    correctAnswer: 'charge réduite', points: 2, orderIndex: 61, tags: ['travail', 'société'], timeSuggested: 60
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'La gastronomie française a été inscrite au patrimoine culturel immatériel de l\'UNESCO en deux mille dix. Cette reconnaissance concerne non seulement la cuisine elle-même, mais aussi l\'art de la table, la convivialité et le rituel social du repas. Aujourd\'hui, les chefs français s\'efforcent de concilier cette tradition avec les enjeux contemporains : alimentation durable, réduction du gaspillage alimentaire et accessibilité à tous les budgets.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'En quelle année la gastronomie française a-t-elle été inscrite à l\'UNESCO ?',
    options: [{ label: '2005', value: '2005' }, { label: '2008', value: '2008' }, { label: '2010', value: '2010' }, { label: '2015', value: '2015' }],
    correctAnswer: '2010', points: 2, orderIndex: 62, tags: ['culture', 'gastronomie'], timeSuggested: 60
  },

  // --- C1 — Avancé (5 questions) ---
  {
    language: 'French', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Le travail asynchrone — communiquer par écrit, sans attendre de réponse immédiate — est devenu la norme dans beaucoup d\'équipes distribuées. Les avantages sont évidents : des personnes sur des fuseaux horaires différents collaborent sans perdre leur sommeil, et écrire oblige à une pensée plus claire qu\'une réunion improvisée. Mais il y a un coût : un message écrit à la hâte peut perdre son ton et créer des tensions involontaires. Les équipes qui fonctionnent bien investissent du temps dans des règles de communication explicites : quand utiliser le chat, quand l\'email, quand la visio.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Quel est un inconvénient du travail asynchrone ?',
    options: [
      { label: 'Le ton peut être mal interprété et créer des tensions', value: 'ton mal interprete' },
      { label: 'Tout le monde doit être en ligne en même temps', value: 'tous en ligne' },
      { label: 'Les documents ne peuvent pas être partagés', value: 'pas de partage' },
      { label: 'Les gens travaillent moins d\'heures', value: 'moins heures' }
    ],
    correctAnswer: 'ton mal interprete', points: 2, orderIndex: 63, tags: ['travail', 'communication'], timeSuggested: 75
  },
  {
    language: 'French', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Le droit à la déconnexion, déjà inscrit dans la loi de plusieurs pays européens, établit qu\'un salarié n\'est pas tenu de lire ni de répondre à des messages en dehors de ses heures de travail. Le principe paraît simple, mais l\'application est complexe : dans des équipes internationales, le soir pour les uns est le matin pour les autres, et beaucoup de managers ne se rendent pas compte qu\'ils fixent une attente implicite quand ils écrivent à vingt-trois heures. Certaines entreprises ont mis en place des envois différés : les messages écrits le soir ne sont livrés que le lendemain matin.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Pourquoi le droit à la déconnexion est-il difficile à appliquer dans une équipe internationale ?',
    options: [
      { label: 'Le soir pour les uns correspond au matin pour les autres', value: 'soir pour uns matin pour autres' },
      { label: 'La loi change d\'un pays à l\'autre', value: 'loi differente' },
      { label: 'Les managers refusent de le respecter', value: 'managers refusent' },
      { label: 'La technologie ne le permet pas', value: 'tech ne permet pas' }
    ],
    correctAnswer: 'soir pour uns matin pour autres', points: 2, orderIndex: 64, tags: ['travail', 'équilibre pro-perso'], timeSuggested: 75
  },
  {
    language: 'French', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Le rôle du manager moderne a profondément changé. L\'époque du chef qui donnait des ordres et vérifiait l\'exécution est révolue. Aujourd\'hui, les managers les plus efficaces agissent comme des coachs : ils posent plus de questions qu\'ils ne donnent de réponses, ils aident le collaborateur à trouver lui-même la solution, et ils font grandir le talent par la délégation plus que par le contrôle. C\'est un retournement contre-intuitif pour ceux qui ont grandi dans des cultures hiérarchiques, et beaucoup de managers se sentent au début moins productifs — jusqu\'au moment où ils voient leur équipe progresser.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Qu\'est-ce qui caractérise le manager-coach moderne ?',
    options: [
      { label: 'Il pose plus de questions qu\'il ne donne de réponses', value: 'plus de questions que reponses' },
      { label: 'Il contrôle chaque étape du travail', value: 'controle chaque etape' },
      { label: 'Il travaille toujours côte à côte avec l\'équipe', value: 'cote a cote' },
      { label: 'Il décide sans consulter personne', value: 'decide sans consulter' }
    ],
    correctAnswer: 'plus de questions que reponses', points: 2, orderIndex: 65, tags: ['travail', 'management'], timeSuggested: 75
  },
  {
    language: 'French', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Le principe de précaution, inscrit dans la Charte de l\'environnement française depuis deux mille cinq, stipule que l\'absence de certitude scientifique ne doit pas retarder l\'adoption de mesures visant à prévenir un risque de dommage grave et irréversible à l\'environnement. Ce principe fait l\'objet de vifs débats, ses partisans y voyant un garde-fou nécessaire, tandis que ses détracteurs l\'accusent de freiner l\'innovation et le progrès technologique.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Que reprochent les détracteurs au principe de précaution ?',
    options: [
      { label: 'Il coûte trop cher à appliquer', value: 'coût' },
      { label: 'Il freine l\'innovation et le progrès technologique', value: 'freine innovation' },
      { label: 'Il est trop vague juridiquement', value: 'vague' },
      { label: 'Il ne protège pas suffisamment l\'environnement', value: 'insuffisant' }
    ],
    correctAnswer: 'freine innovation', points: 2, orderIndex: 66, tags: ['environnement', 'droit'], timeSuggested: 75
  },
  {
    language: 'French', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Le phénomène de gentrification, observé dans de nombreuses métropoles françaises, se caractérise par l\'installation progressive de populations aisées dans des quartiers populaires, entraînant une hausse des loyers et un déplacement des habitants d\'origine. Si ce processus s\'accompagne souvent d\'une rénovation du bâti et d\'une amélioration des commerces et des services, il contribue néanmoins à une homogénéisation sociale et à l\'effacement des identités culturelles locales.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Quel effet négatif de la gentrification est souligné ?',
    options: [
      { label: 'La dégradation des bâtiments', value: 'dégradation' },
      { label: 'L\'homogénéisation sociale et l\'effacement des identités culturelles', value: 'homogénéisation et effacement culturel' },
      { label: 'L\'augmentation de la criminalité', value: 'criminalité' },
      { label: 'La fermeture des commerces', value: 'fermeture commerces' }
    ],
    correctAnswer: 'homogénéisation et effacement culturel', points: 2, orderIndex: 67, tags: ['sociologie', 'urbanisme'], timeSuggested: 75
  },

  // --- C2 — Maîtrise (5 questions) ---
  {
    language: 'French', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'L\'expression « quiet quitting », ou démission silencieuse, devenue virale en deux mille vingt-deux, ne désigne pas une vraie démission mais un comportement précis : faire exactement ce qui est écrit dans le contrat, ni plus ni moins. Refuser de lire les emails hors horaires, ne pas se porter volontaire, ne pas s\'investir émotionnellement dans des projets supplémentaires. Le phénomène se lit de deux manières opposées : comme une réaction saine au burn-out diffus, ou comme le symptôme d\'une crise plus profonde de l\'engagement. Les chiffres sont inconfortables : dans beaucoup d\'entreprises, la part des salariés qui se déclarent désengagés dépasse soixante pour cent.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Comment le phénomène du quiet quitting est-il interprété ?',
    options: [
      { label: 'Soit comme une réaction saine de mise de limites, soit comme un signe de désengagement généralisé', value: 'saine ou desengagement' },
      { label: 'Comme une vague de démissions massives', value: 'demissions massives' },
      { label: 'Comme un phénomène typiquement générationnel', value: 'phenomene generationnel' },
      { label: 'Comme une stratégie pour obtenir une augmentation', value: 'strategie augmentation' }
    ],
    correctAnswer: 'saine ou desengagement', points: 2, orderIndex: 68, tags: ['travail', 'engagement'], timeSuggested: 90
  },
  {
    language: 'French', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Le travail hybride est devenu le sujet le plus clivant en entreprise depuis deux mille vingt. Les données sur la productivité sont contradictoires : certaines études relèvent une hausse, d\'autres une baisse, selon le type d\'activité et la qualité de la transition. Mais la vraie question intéressante n\'est pas où les gens travaillent, mais comment ils sont managés. Le mode hybride expose des faiblesses que le bureau physique cachait : des managers qui contrôlaient par la présence, des processus qui dépendaient de conversations informelles dans le couloir, des décisions qui excluaient ceux qui n\'étaient pas dans la pièce.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Pourquoi le mode hybride est-il un test de leadership ?',
    options: [
      { label: 'Il révèle des pratiques qui ne tenaient que grâce à la présence physique', value: 'revele pratiques liees a presence' },
      { label: 'Il oblige les managers à apprendre de nouvelles technologies', value: 'apprendre tech' },
      { label: 'Il double les heures de travail effectives', value: 'double heures' },
      { label: 'Il exige plus de réunions que le présentiel', value: 'plus reunions' }
    ],
    correctAnswer: 'revele pratiques liees a presence', points: 2, orderIndex: 69, tags: ['travail', 'leadership'], timeSuggested: 90
  },
  {
    language: 'French', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Dans les organisations d\'une certaine taille, le problème le plus sous-estimé n\'est ni le manque de talent ni le manque de stratégie : c\'est l\'alignement entre les fonctions. Les ventes promettent des fonctionnalités que le produit n\'a pas prévues, le produit construit des choses que le marketing ne sait pas comment positionner, la finance approuve des budgets que les opérations ne parviennent pas à exécuter. Chaque fonction agit de façon rationnelle prise isolément, mais la somme de rationalités individuelles produit une organisation incohérente. La solution n\'est pas plus de réunions ou plus de reportings : ce sont des conversations brèves et fréquentes entre responsables de fonction, avec la liberté de remettre en cause les engagements sans perdre la face.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Quelle est la cause structurelle du désalignement entre fonctions ?',
    options: [
      { label: 'Chaque fonction est rationnelle isolément mais la somme produit de l\'incohérence', value: 'rationnel isole incoherent global' },
      { label: 'Les gens ne lisent pas les rapports internes', value: 'pas lecture rapports' },
      { label: 'L\'entreprise n\'a pas assez de managers', value: 'manque managers' },
      { label: 'La technologie ne partage pas les données', value: 'tech ne partage pas' }
    ],
    correctAnswer: 'rationnel isole incoherent global', points: 2, orderIndex: 70, tags: ['travail', 'organisation'], timeSuggested: 90
  },
  {
    language: 'French', cefrLevel: 'C2', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'La pérennité à long terme d\'une organisation dépend de sa capacité à équilibrer la pression pour les résultats à court terme avec des investissements qui ne produiront de la valeur que dans le futur.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Écrivez exactement ce que vous entendez.',
    correctAnswer: 'La pérennité à long terme d\'une organisation dépend de sa capacité à équilibrer la pression pour les résultats à court terme avec des investissements qui ne produiront de la valeur que dans le futur.', points: 2, orderIndex: 71, tags: ['dictée', 'travail'], timeSuggested: 120
  },
  {
    language: 'French', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Le modèle de l\'évaluation annuelle — cette échelle de un à cinq sur laquelle les managers classaient leurs collaborateurs — est entré en crise il y a une dizaine d\'années, et beaucoup d\'entreprises l\'ont abandonné. Les raisons sont documentées : les notations démotivent ceux qui reçoivent un score bas, elles sont influencées par des biais récents — les managers se souviennent des trois derniers mois, pas de toute l\'année — et elles créent une compétition malsaine entre collègues. Ce qui les remplace est plus exigeant : des conversations de développement fréquentes, séparées des décisions de rémunération, dont l\'objectif est la progression, pas le classement. Pour le manager, c\'est plus fatigant, mais cela produit des résultats plus durables.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Pourquoi les évaluations annuelles ont-elles été abandonnées ?',
    options: [
      { label: 'Elles déforment les comportements et reflètent des biais récents plutôt que l\'année entière', value: 'deforment et biais recents' },
      { label: 'Elles sont trop coûteuses à mettre en place', value: 'trop couteuses' },
      { label: 'Le syndicat ne les autorise plus', value: 'syndicat refuse' },
      { label: 'Elles sont illégales dans la plupart des pays', value: 'illegales' }
    ],
    correctAnswer: 'deforment et biais recents', points: 2, orderIndex: 72, tags: ['travail', 'performance'], timeSuggested: 90
  },

  // ============================================================
  // VARIED SPOKEN CONTEXTS — 12 questions (orderIndex 73-84)
  // ============================================================

  // A1 — Varied Spoken Contexts
  {
    language: 'French', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    questionText: '[Messagerie vocale] Vous entendez un message vocal d\'un collègue. À quelle heure est la réunion ?',
    ttsScript: 'Bonjour, c\'est Marc du service commercial. Je vous appelle pour confirmer notre réunion de demain à dix heures. N\'oubliez pas d\'apporter le dossier. À demain.',
    ttsLanguageCode: 'fr-FR',
    options: [{ label: '9h00', value: '9h00' }, { label: '10h00', value: '10h00' }, { label: '11h00', value: '11h00' }, { label: '14h00', value: '14h00' }],
    correctAnswer: '10h00', points: 1, orderIndex: 73, tags: ['messagerie', 'travail', 'register-varied'], timeSuggested: 30
  },
  {
    language: 'French', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    questionText: '[Annonce aéroport] Vous entendez une annonce à l\'aéroport. Quelle est la destination du vol ?',
    ttsScript: 'Mesdames et messieurs, les passagers du vol Air France trois cent vingt-cinq à destination de Barcelone sont priés de se rendre porte dix-huit. Embarquement immédiat, porte dix-huit.',
    ttsLanguageCode: 'fr-FR',
    options: [{ label: 'Madrid', value: 'Madrid' }, { label: 'Barcelone', value: 'Barcelone' }, { label: 'Lisbonne', value: 'Lisbonne' }, { label: 'Rome', value: 'Rome' }],
    correctAnswer: 'Barcelone', points: 1, orderIndex: 74, tags: ['aéroport', 'annonce', 'register-varied'], timeSuggested: 30
  },

  // A2 — Varied Spoken Contexts
  {
    language: 'French', cefrLevel: 'A2', questionType: 'LISTENING', skill: 'LISTENING',
    questionText: '[Réservation téléphonique] Vous entendez quelqu\'un réserver au restaurant. Pour quel jour ?',
    ttsScript: 'Bonsoir, je voudrais réserver une table pour samedi soir, s\'il vous plaît. Nous serons cinq personnes, vers vingt heures. Est-ce que vous avez une table en terrasse ?',
    ttsLanguageCode: 'fr-FR',
    options: [{ label: 'Vendredi', value: 'Vendredi' }, { label: 'Samedi', value: 'Samedi' }, { label: 'Dimanche', value: 'Dimanche' }, { label: 'Lundi', value: 'Lundi' }],
    correctAnswer: 'Samedi', points: 1, orderIndex: 75, tags: ['restaurant', 'réservation', 'register-varied'], timeSuggested: 40
  },
  {
    language: 'French', cefrLevel: 'A2', questionType: 'LISTENING', skill: 'LISTENING',
    questionText: '[Message pour un client] Vous entendez un message laissé à un client. Que faut-il reporter ?',
    ttsScript: 'Bonjour, c\'est Sophie de la société Duval et fils. Je vous appelle au sujet de notre rendez-vous de mercredi. Malheureusement, je dois reporter la livraison. Serait-il possible de la décaler à vendredi après-midi ? Merci de me rappeler dès que possible.',
    ttsLanguageCode: 'fr-FR',
    options: [{ label: 'Une réunion', value: 'Une réunion' }, { label: 'Une livraison', value: 'Une livraison' }, { label: 'Un paiement', value: 'Un paiement' }, { label: 'Une présentation', value: 'Une présentation' }],
    correctAnswer: 'Une livraison', points: 1, orderIndex: 76, tags: ['client', 'message', 'register-varied'], timeSuggested: 40
  },

  // B1 — Varied Spoken Contexts
  {
    language: 'French', cefrLevel: 'B1', questionType: 'LISTENING', skill: 'LISTENING',
    questionText: '[Publicité radio] Vous entendez une publicité à la radio. Quelle offre est proposée ?',
    ttsScript: 'Vous rêvez de parler anglais couramment ? Avec LinguaPro, l\'école de langues en ligne numéro un en France, c\'est possible. Plus de cinquante mille professionnels nous font déjà confiance. Inscrivez-vous cette semaine et bénéficiez du premier mois gratuit ! Rendez-vous sur linguapro point fr.',
    ttsLanguageCode: 'fr-FR',
    options: [{ label: 'Un voyage offert', value: 'Un voyage offert' }, { label: 'Le premier mois gratuit', value: 'Le premier mois gratuit' }, { label: 'Une réduction de 50%', value: 'Une réduction de 50%' }, { label: 'Un livre gratuit', value: 'Un livre gratuit' }],
    correctAnswer: 'Le premier mois gratuit', points: 1, orderIndex: 77, tags: ['radio', 'publicité', 'register-varied'], timeSuggested: 45
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'LISTENING', skill: 'LISTENING',
    questionText: '[Réunion de bureau] Vous entendez un extrait de réunion. Quel est le problème principal ?',
    ttsScript: 'Bon, avant de terminer, je voudrais aborder le calendrier du projet Mercier. Nous avons actuellement deux semaines de retard, et le client attend la première livraison pour le quinze mars. Il va falloir redistribuer les ressources. Des suggestions ?',
    ttsLanguageCode: 'fr-FR',
    options: [{ label: 'Le budget est dépassé', value: 'Le budget est dépassé' }, { label: 'Le projet est en retard', value: 'Le projet est en retard' }, { label: 'Un employé a démissionné', value: 'Un employé a démissionné' }, { label: 'Le client est mécontent', value: 'Le client est mécontent' }],
    correctAnswer: 'Le projet est en retard', points: 1, orderIndex: 78, tags: ['réunion', 'bureau', 'register-varied'], timeSuggested: 45
  },

  // B2 — Varied Spoken Contexts
  {
    language: 'French', cefrLevel: 'B2', questionType: 'LISTENING', skill: 'LISTENING',
    questionText: '[Podcast] Vous entendez un extrait de podcast sur la reconversion professionnelle. Quel est le principal obstacle selon l\'intervenant ?',
    ttsScript: 'Quand j\'accompagne des gens dans leur reconversion, ce qui les bloque le plus, ce n\'est pas le manque de compétences. C\'est la peur. La peur de l\'inconnu, la peur de l\'instabilité financière, et franchement, la peur du regard des autres. Une fois qu\'on surmonte ça, tout le reste suit naturellement.',
    ttsLanguageCode: 'fr-FR',
    options: [{ label: 'Le manque de compétences', value: 'Le manque de compétences' }, { label: 'Les problèmes financiers', value: 'Les problèmes financiers' }, { label: 'La peur', value: 'La peur' }, { label: 'L\'âge', value: 'L\'âge' }],
    correctAnswer: 'La peur', points: 2, orderIndex: 79, tags: ['podcast', 'carrière', 'register-varied'], timeSuggested: 60
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'LISTENING', skill: 'LISTENING',
    questionText: '[Reportage] Vous entendez un reportage sur l\'économie. Qu\'a décidé la banque centrale ?',
    ttsScript: 'Dans un geste largement anticipé, la Banque centrale européenne a annoncé une baisse des taux d\'intérêt d\'un quart de point, ramenant le taux directeur à trois virgule cinq pour cent. Les analystes estiment que cela traduit une inquiétude croissante face au ralentissement de la croissance dans la zone euro.',
    ttsLanguageCode: 'fr-FR',
    options: [{ label: 'Augmenter les taux', value: 'Augmenter les taux' }, { label: 'Baisser les taux', value: 'Baisser les taux' }, { label: 'Geler les taux', value: 'Geler les taux' }, { label: 'Supprimer les taux', value: 'Supprimer les taux' }],
    correctAnswer: 'Baisser les taux', points: 2, orderIndex: 80, tags: ['reportage', 'économie', 'register-varied'], timeSuggested: 60
  },

  // C1 — Varied Spoken Contexts
  {
    language: 'French', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    questionText: '[Conférence TED] Vous entendez un extrait de conférence sur l\'innovation. Selon l\'orateur, quel est le vrai moteur de l\'innovation ?',
    ttsScript: 'On a tendance à romancer le génie solitaire dans son garage, mais les données racontent une tout autre histoire. L\'innovation est fondamentalement un phénomène social. Elle prospère à l\'intersection de perspectives diverses, là où les idées se heurtent et se recombinent. Le vrai moteur, ce n\'est pas le génie individuel, c\'est la densité des connexions humaines au sein d\'un écosystème.',
    ttsLanguageCode: 'fr-FR',
    options: [{ label: 'Le génie individuel', value: 'Le génie individuel' }, { label: 'Le financement public', value: 'Le financement public' }, { label: 'Les connexions humaines dans un écosystème', value: 'Les connexions humaines dans un écosystème' }, { label: 'La compétition entre entreprises', value: 'La compétition entre entreprises' }],
    correctAnswer: 'Les connexions humaines dans un écosystème', points: 2, orderIndex: 81, tags: ['conférence', 'innovation', 'register-varied'], timeSuggested: 75
  },
  {
    language: 'French', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    questionText: '[Cours universitaire] Vous entendez un extrait de cours. Quel concept le professeur explique-t-il ?',
    ttsScript: 'Ce que l\'on observe dans la littérature, c\'est un glissement du modèle traditionnel de causalité linéaire vers ce que les chercheurs appellent désormais la causalité circulaire. Autrement dit, l\'effet rétroagit sur la cause, créant une boucle auto-renforçante. C\'est particulièrement visible dans les systèmes climatiques, où le réchauffement des océans libère davantage de dioxyde de carbone, ce qui accélère à son tour le réchauffement.',
    ttsLanguageCode: 'fr-FR',
    options: [{ label: 'La causalité linéaire', value: 'La causalité linéaire' }, { label: 'La causalité circulaire', value: 'La causalité circulaire' }, { label: 'La variation aléatoire', value: 'La variation aléatoire' }, { label: 'L\'équilibre statique', value: 'L\'équilibre statique' }],
    correctAnswer: 'La causalité circulaire', points: 2, orderIndex: 82, tags: ['cours', 'académique', 'register-varied'], timeSuggested: 75
  },

  // C2 — Varied Spoken Contexts
  {
    language: 'French', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    questionText: '[Débat philosophique] Vous entendez un extrait de débat. Quelle position l\'orateur défend-il ?',
    ttsScript: 'Je soutiens que le réalisme moral n\'est pas seulement défendable, mais nécessaire. Si nous concédons que les vérités éthiques sont purement construites, alors nous n\'avons aucun fondement pour condamner les atrocités. L\'acte même d\'indignation morale présuppose l\'existence de normes objectives à l\'aune desquelles les actions peuvent être évaluées, indépendamment du consensus culturel.',
    ttsLanguageCode: 'fr-FR',
    options: [{ label: 'Le relativisme moral', value: 'Le relativisme moral' }, { label: 'Le réalisme moral', value: 'Le réalisme moral' }, { label: 'Le nihilisme', value: 'Le nihilisme' }, { label: 'L\'utilitarisme', value: 'L\'utilitarisme' }],
    correctAnswer: 'Le réalisme moral', points: 2, orderIndex: 83, tags: ['débat', 'philosophie', 'register-varied'], timeSuggested: 90
  },
  {
    language: 'French', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    questionText: '[Chronique satirique] Vous entendez une chronique satirique. Que critique réellement le chroniqueur ?',
    ttsScript: 'Et dans l\'actualité du jour, une multinationale a généreusement promis d\'atteindre la neutralité carbone d\'ici deux mille soixante-quinze, juste à temps pour la mort thermique de l\'univers. Le PDG a rassuré les actionnaires en affirmant que si les profits à court terme restent la priorité absolue, l\'entreprise est profondément engagée en faveur du développement durable, à condition que cela ne coûte rien.',
    ttsLanguageCode: 'fr-FR',
    options: [{ label: 'Les réglementations environnementales', value: 'Les réglementations environnementales' }, { label: 'Le greenwashing des entreprises', value: 'Le greenwashing des entreprises' }, { label: 'L\'inaction du gouvernement', value: 'L\'inaction du gouvernement' }, { label: 'Le comportement des consommateurs', value: 'Le comportement des consommateurs' }],
    correctAnswer: 'Le greenwashing des entreprises', points: 2, orderIndex: 84, tags: ['satire', 'chronique', 'register-varied'], timeSuggested: 90
  },

  // ============================================================
  // DIALOGUES QUOTIDIENS — ajoutés sur retour Maka (voix robotique,
  // pas de dialogues). Deux interlocuteurs avec marqueurs SPEAKER_A/B
  // déclenchent l'analyseur de TtsService et alternent voix H/F.
  // ============================================================

  // ---- A1 ----
  {
    language: 'French', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Bonjour, je voudrais un café, s'il vous plaît.
SPEAKER_B: Bien sûr. Petit ou grand ?
SPEAKER_A: Petit, merci. Combien ça coûte ?
SPEAKER_B: Un euro vingt.`,
    ttsLanguageCode: 'fr-FR',
    questionText: 'Combien coûte le café ?',
    options: [{ label: '1,00 €', value: '1,00' }, { label: '1,20 €', value: '1,20' }, { label: '1,50 €', value: '1,50' }, { label: '2,00 €', value: '2,00' }],
    correctAnswer: '1,20', points: 1, orderIndex: 85, tags: ['dialogue', 'café', 'everyday'], timeSuggested: 40
  },
  {
    language: 'French', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Bonjour. À quelle heure ouvrez-vous demain ?
SPEAKER_B: Nous ouvrons à neuf heures du matin.
SPEAKER_A: Et quand fermez-vous ?
SPEAKER_B: À dix-neuf heures.`,
    ttsLanguageCode: 'fr-FR',
    questionText: 'À quelle heure ouvre le magasin ?',
    options: [{ label: '7h', value: '7' }, { label: '8h', value: '8' }, { label: '9h', value: '9' }, { label: '10h', value: '10' }],
    correctAnswer: '9', points: 1, orderIndex: 86, tags: ['dialogue', 'magasin', 'everyday'], timeSuggested: 40
  },
  {
    language: 'French', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Où peut-on se voir samedi ?
SPEAKER_B: Retrouvons-nous au café près du parc.
SPEAKER_A: À quelle heure ?
SPEAKER_B: À trois heures de l'après-midi.`,
    ttsLanguageCode: 'fr-FR',
    questionText: 'Où veulent-ils se retrouver ?',
    options: [{ label: 'Au parc', value: 'parc' }, { label: 'Au café', value: 'café' }, { label: 'Au cinéma', value: 'cinéma' }, { label: 'Au bureau', value: 'bureau' }],
    correctAnswer: 'café', points: 1, orderIndex: 87, tags: ['dialogue', 'plans', 'everyday'], timeSuggested: 40
  },
  {
    language: 'French', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Un billet pour le centre, s'il vous plaît.
SPEAKER_B: Aller simple ou aller-retour ?
SPEAKER_A: Aller simple.
SPEAKER_B: Ça fait deux euros.`,
    ttsLanguageCode: 'fr-FR',
    questionText: 'Combien coûte le billet ?',
    options: [{ label: '1 €', value: '1' }, { label: '2 €', value: '2' }, { label: '3 €', value: '3' }, { label: '4 €', value: '4' }],
    correctAnswer: '2', points: 1, orderIndex: 88, tags: ['dialogue', 'transport', 'everyday'], timeSuggested: 40
  },

  // ---- A2 ----
  {
    language: 'French', cefrLevel: 'A2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Tu es libre ce week-end ? Il y a un nouveau film au cinéma.
SPEAKER_B: Samedi je suis pris, mais dimanche c'est bon.
SPEAKER_A: Parfait. On y va dimanche après-midi ?
SPEAKER_B: D'accord, à dimanche alors.`,
    ttsLanguageCode: 'fr-FR',
    questionText: 'Quand iront-ils au cinéma ?',
    options: [{ label: 'Samedi matin', value: 'sam-mat' }, { label: 'Samedi soir', value: 'sam-soir' }, { label: 'Dimanche après-midi', value: 'dim-pm' }, { label: 'Dimanche soir', value: 'dim-soir' }],
    correctAnswer: 'dim-pm', points: 1, orderIndex: 89, tags: ['dialogue', 'plans', 'everyday'], timeSuggested: 45
  },
  {
    language: 'French', cefrLevel: 'A2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Bonjour, je voudrais réserver une table pour deux personnes.
SPEAKER_B: Pour quand, monsieur ?
SPEAKER_A: Vendredi soir à vingt heures, si possible.
SPEAKER_B: Très bien. Un nom pour la réservation ?`,
    ttsLanguageCode: 'fr-FR',
    questionText: 'Pour combien de personnes est la réservation ?',
    options: [{ label: 'Une', value: '1' }, { label: 'Deux', value: '2' }, { label: 'Trois', value: '3' }, { label: 'Quatre', value: '4' }],
    correctAnswer: '2', points: 1, orderIndex: 90, tags: ['dialogue', 'restaurant', 'everyday'], timeSuggested: 45
  },
  {
    language: 'French', cefrLevel: 'A2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Salut, je suis nouvelle dans l'entreprise. Je travaille au marketing.
SPEAKER_B: Bienvenue ! Moi je suis au commercial. Viens, je te présente l'équipe.
SPEAKER_A: Merci. Tu travailles ici depuis longtemps ?
SPEAKER_B: Je suis là depuis environ trois ans.`,
    ttsLanguageCode: 'fr-FR',
    questionText: 'Dans quel service travaille la nouvelle collègue ?',
    options: [{ label: 'Commercial', value: 'commercial' }, { label: 'Marketing', value: 'marketing' }, { label: 'RH', value: 'rh' }, { label: 'Informatique', value: 'info' }],
    correctAnswer: 'marketing', points: 1, orderIndex: 91, tags: ['dialogue', 'bureau', 'work-life'], timeSuggested: 45
  },
  {
    language: 'French', cefrLevel: 'A2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Excusez-moi, comment je vais à la gare ?
SPEAKER_B: Allez tout droit pendant deux pâtés de maisons, puis tournez à gauche.
SPEAKER_A: À gauche après deux pâtés. C'est loin à pied ?
SPEAKER_B: Environ dix minutes.`,
    ttsLanguageCode: 'fr-FR',
    questionText: 'Combien de temps à pied ?',
    options: [{ label: '5 minutes', value: '5' }, { label: '10 minutes', value: '10' }, { label: '15 minutes', value: '15' }, { label: '20 minutes', value: '20' }],
    correctAnswer: '10', points: 1, orderIndex: 92, tags: ['dialogue', 'directions', 'everyday'], timeSuggested: 45
  },

  // ---- B1 ----
  {
    language: 'French', cefrLevel: 'B1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Alors, vous avez de l'expérience dans le service client. Qu'est-ce qui vous attire dans ce poste ?
SPEAKER_B: J'aimerais évoluer vers un rôle plus stratégique. Ici je pourrais utiliser mes compétences analytiques en plus de la communication.
SPEAKER_A: Je comprends. Comment géreriez-vous un client très mécontent ?
SPEAKER_B: Je l'écouterais attentivement, reconnaîtrais le problème et chercherais une solution concrète avant la fin de la journée.`,
    ttsLanguageCode: 'fr-FR',
    questionText: 'Pourquoi le candidat veut-il ce poste ?',
    options: [{ label: 'Pour un meilleur salaire', value: 'salaire' }, { label: 'Pour un rôle plus stratégique', value: 'stratégique' }, { label: 'Pour télétravailler', value: 'télétravail' }, { label: 'Pour changer de ville', value: 'ville' }],
    correctAnswer: 'stratégique', points: 1, orderIndex: 93, tags: ['dialogue', 'entretien', 'work-life'], timeSuggested: 60
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Je voudrais réserver une chambre pour trois nuits, du quinze au dix-huit mars.
SPEAKER_B: Pour combien de personnes ?
SPEAKER_A: Deux adultes. Vous avez des chambres avec vue sur la mer ?
SPEAKER_B: Oui, une double avec vue à cent soixante euros la nuit. Petit-déjeuner inclus.`,
    ttsLanguageCode: 'fr-FR',
    questionText: 'Combien coûte la chambre par nuit ?',
    options: [{ label: '140 €', value: '140' }, { label: '150 €', value: '150' }, { label: '160 €', value: '160' }, { label: '180 €', value: '180' }],
    correctAnswer: '160', points: 1, orderIndex: 94, tags: ['dialogue', 'hôtel', 'everyday'], timeSuggested: 60
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Bonjour docteur. J'ai mal à la gorge depuis trois jours.
SPEAKER_B: Avez-vous eu de la fièvre ?
SPEAKER_A: Oui, hier j'avais trente-huit et demi. Aujourd'hui c'est redescendu.
SPEAKER_B: Je vous prescris un antibiotique pour sept jours. Deux comprimés par jour après les repas.`,
    ttsLanguageCode: 'fr-FR',
    questionText: 'Combien de jours dure le traitement ?',
    options: [{ label: '3 jours', value: '3' }, { label: '5 jours', value: '5' }, { label: '7 jours', value: '7' }, { label: '10 jours', value: '10' }],
    correctAnswer: '7', points: 1, orderIndex: 95, tags: ['dialogue', 'médecin', 'everyday'], timeSuggested: 60
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: La réunion de demain est avancée à dix heures. Tu peux venir ?
SPEAKER_B: À dix heures j'ai un appel avec le client de Lyon. Je peux rejoindre après ?
SPEAKER_A: Oui, commence en retard, pas de souci. On t'enverra les points clés sur Slack.
SPEAKER_B: Parfait, merci. J'essaie d'arriver pour dix heures trente.`,
    ttsLanguageCode: 'fr-FR',
    questionText: 'Pourquoi le collègue sera-t-il en retard ?',
    options: [{ label: 'Il a un autre rendez-vous', value: 'rdv' }, { label: 'Le train est en retard', value: 'train' }, { label: 'Il est malade', value: 'malade' }, { label: 'Il a oublié', value: 'oublié' }],
    correctAnswer: 'rdv', points: 1, orderIndex: 96, tags: ['dialogue', 'réunion', 'work-life'], timeSuggested: 60
  },

  // ---- B2 ----
  {
    language: 'French', cefrLevel: 'B2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Le client a avancé la deadline à vendredi. On peut livrer à temps ?
SPEAKER_B: Ça va être tendu. Le dev finit mercredi, QA a besoin d'au moins deux jours pleins.
SPEAKER_A: On peut réduire le périmètre ? La partie reporting peut attendre.
SPEAKER_B: Oui, si on repousse le reporting à la prochaine release, on y arrive.`,
    ttsLanguageCode: 'fr-FR',
    questionText: 'Comment respecteront-ils la deadline ?',
    options: [{ label: 'En travaillant la nuit', value: 'nuit' }, { label: 'En repoussant une fonctionnalité', value: 'repousser' }, { label: 'En ajoutant du monde', value: 'monde' }, { label: 'En demandant un report', value: 'report' }],
    correctAnswer: 'repousser', points: 1, orderIndex: 97, tags: ['dialogue', 'projet', 'work-life'], timeSuggested: 75
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Bonjour, je voudrais un remboursement. Le produit reçu est défectueux.
SPEAKER_B: Je suis désolé. Vous avez le reçu et une photo du défaut ?
SPEAKER_A: Oui, je les ai envoyés par email il y a trois jours, mais personne ne m'a répondu.
SPEAKER_B: Je vérifie tout de suite. Je peux autoriser un remboursement intégral aujourd'hui.`,
    ttsLanguageCode: 'fr-FR',
    questionText: 'Que fait l\'opérateur à la fin ?',
    options: [{ label: 'Refuse le remboursement', value: 'refuse' }, { label: 'Demande d\'autres documents', value: 'docs' }, { label: 'Autorise un remboursement intégral', value: 'autorise' }, { label: 'Transfère l\'appel', value: 'transfère' }],
    correctAnswer: 'autorise', points: 1, orderIndex: 98, tags: ['dialogue', 'réclamation', 'work-life'], timeSuggested: 75
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Je voudrais discuter de ma rémunération pour l'an prochain.
SPEAKER_B: Bien sûr. Sachez que le budget est limité, mais je vous écoute.
SPEAKER_A: J'ai pris en charge deux nouveaux projets et géré l'équipe pendant l'absence du responsable. Je cherche une reconnaissance.
SPEAKER_B: Vous avez raison. Je peux proposer une augmentation de six pour cent et un bonus variable sur résultats.`,
    ttsLanguageCode: 'fr-FR',
    questionText: 'Que propose le manager ?',
    options: [{ label: 'Seulement un bonus ponctuel', value: 'bonus' }, { label: 'Seulement une augmentation', value: 'augmentation' }, { label: 'Augmentation plus bonus variable', value: 'deux' }, { label: 'Une promotion', value: 'promotion' }],
    correctAnswer: 'deux', points: 1, orderIndex: 99, tags: ['dialogue', 'négociation', 'work-life'], timeSuggested: 75
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Comment s'est passée la formation la semaine dernière ?
SPEAKER_B: Le contenu était utile, mais le rythme était trop rapide pour ceux qui partent de zéro.
SPEAKER_A: Tu as une suggestion concrète ?
SPEAKER_B: J'ajouterais une session d'introduction optionnelle avant le module avancé.`,
    ttsLanguageCode: 'fr-FR',
    questionText: 'Que suggère l\'employé ?',
    options: [{ label: 'Changer de formateur', value: 'formateur' }, { label: 'Une session d\'intro optionnelle', value: 'intro' }, { label: 'Allonger la durée totale', value: 'allonger' }, { label: 'Supprimer le module avancé', value: 'supprimer' }],
    correctAnswer: 'intro', points: 1, orderIndex: 100, tags: ['dialogue', 'formation', 'work-life'], timeSuggested: 75
  },

  // ---- C1 ----
  {
    language: 'French', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Nous perdons des parts de marché chez les jeunes. Deux options : campagne social agressive, ou revoir le produit.
SPEAKER_B: La campagne donnerait de la visibilité immédiate, mais si le produit ne suit pas, on brûle le budget pour rien.
SPEAKER_A: Donc tu proposes de commencer par le produit ?
SPEAKER_B: Exactement. Trois mois de tests sur un panel restreint, puis le marketing suit avec un message crédible.`,
    ttsLanguageCode: 'fr-FR',
    questionText: 'Avec quoi SPEAKER_B est-il d\'accord ?',
    options: [{ label: 'Lancer la campagne tout de suite', value: 'campagne' }, { label: 'Augmenter le budget marketing', value: 'budget' }, { label: 'Revoir le produit d\'abord', value: 'produit' }, { label: 'Abandonner ce segment', value: 'abandonner' }],
    correctAnswer: 'produit', points: 2, orderIndex: 101, tags: ['dialogue', 'stratégie', 'work-life'], timeSuggested: 90
  },
  {
    language: 'French', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Cette année, tu as atteint trois objectifs sur quatre. Excellent travail sur le projet Alpha.
SPEAKER_B: Merci. Le seul que je n'ai pas atteint, c'est la réduction des temps de réponse de l'équipe.
SPEAKER_A: Oui, et je veux être honnête : ce résultat dépendait aussi de ressources que nous ne t'avons pas données. Je ne le compte pas contre toi.
SPEAKER_B: J'apprécie. L'an prochain je voudrais prendre en charge la planification des ressources.`,
    ttsLanguageCode: 'fr-FR',
    questionText: 'Quelle est la position du manager sur l\'objectif manqué ?',
    options: [{ label: 'Le compte comme un échec total', value: 'échec' }, { label: 'L\'attribue au manque de ressources', value: 'ressources' }, { label: 'Veut remplacer l\'employé', value: 'remplacer' }, { label: 'Baisse le salaire', value: 'salaire' }],
    correctAnswer: 'ressources', points: 2, orderIndex: 102, tags: ['dialogue', 'évaluation', 'work-life'], timeSuggested: 90
  },
  {
    language: 'French', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: La proposition de contrat nous laisse perplexes sur la clause d'exclusivité, elle est très large.
SPEAKER_B: Je comprends. C'est une clause standard pour nos accords enterprise, mais on peut la restreindre à votre secteur.
SPEAKER_A: La restreindre géographiquement à l'Europe pourrait nous convenir.
SPEAKER_B: Combinons : exclusivité limitée à votre secteur principal et au marché européen, sur un an.`,
    ttsLanguageCode: 'fr-FR',
    questionText: 'Sur quoi se mettent-ils d\'accord ?',
    options: [{ label: 'Supprimer l\'exclusivité', value: 'supprime' }, { label: 'Exclusivité mondiale tous secteurs', value: 'mondiale' }, { label: 'Exclusivité limitée secteur + Europe, un an', value: 'limitée' }, { label: 'Reporter la décision', value: 'reporte' }],
    correctAnswer: 'limitée', points: 2, orderIndex: 103, tags: ['dialogue', 'contrat', 'work-life'], timeSuggested: 90
  },
  {
    language: 'French', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Les données du premier trimestre montrent une croissance de douze pour cent, mais la marge a baissé.
SPEAKER_B: Oui, parce qu'on a beaucoup investi dans l'acquisition client. C'est un choix assumé.
SPEAKER_A: Quand peut-on attendre un retour à la marge de l'an dernier ?
SPEAKER_B: Au quatrième trimestre, une fois que la base récurrente couvrira les coûts fixes.`,
    ttsLanguageCode: 'fr-FR',
    questionText: 'Quand la marge devrait-elle se normaliser ?',
    options: [{ label: 'Au T2', value: 'q2' }, { label: 'Au T3', value: 'q3' }, { label: 'Au T4', value: 'q4' }, { label: 'L\'an prochain', value: 'an' }],
    correctAnswer: 'q4', points: 2, orderIndex: 104, tags: ['dialogue', 'finance', 'work-life'], timeSuggested: 90
  },

  // ---- C2 ----
  {
    language: 'French', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: La due diligence a soulevé deux points : un contentieux fiscal en cours et une dépendance technologique concentrée.
SPEAKER_B: Le fiscal, on peut le traiter par un escrow. Le volet techno m'inquiète plus : un seul fournisseur sans plan de sortie.
SPEAKER_A: On pourrait conditionner le prix à la renégociation dans les six mois après le closing.
SPEAKER_B: Ça marche, mais j'ajouterais une clause d'earn-out : si la renégociation échoue, une partie du prix est retenue.`,
    ttsLanguageCode: 'fr-FR',
    questionText: 'Que propose SPEAKER_B pour le risque techno ?',
    options: [{ label: 'Annuler l\'opération', value: 'annule' }, { label: 'Un escrow seulement', value: 'escrow' }, { label: 'Une clause d\'earn-out conditionnelle', value: 'earn-out' }, { label: 'Augmenter le prix', value: 'prix' }],
    correctAnswer: 'earn-out', points: 2, orderIndex: 105, tags: ['dialogue', 'M&A', 'work-life'], timeSuggested: 100
  },
  {
    language: 'French', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Le marché récompense les entreprises capables de croître sans diluer leur culture. Comment vous y arrivez ?
SPEAKER_B: Honnêtement, pas totalement. On croît de trente pour cent par an, et chaque vague d'embauches change le tissu interne.
SPEAKER_A: Quelles parades avez-vous mises en place ?
SPEAKER_B: Du mentorat en cascade et un plafond mensuel d'embauches — on préfère perdre des candidats que diluer les valeurs.`,
    ttsLanguageCode: 'fr-FR',
    questionText: 'Qu\'admet SPEAKER_B ?',
    options: [{ label: 'Que leur culture est parfaite', value: 'parfaite' }, { label: 'Que leur solution a des limites', value: 'limites' }, { label: 'Que la culture ne les intéresse pas', value: 'pas-cult' }, { label: 'Qu\'ils embaucheront moins l\'an prochain', value: 'moins' }],
    correctAnswer: 'limites', points: 2, orderIndex: 106, tags: ['dialogue', 'leadership', 'work-life'], timeSuggested: 100
  },
  {
    language: 'French', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: J'ai lu ton rapport et quelque chose me chiffonne. Les chiffres de rétention client semblent sélectionnés.
SPEAKER_B: C'est juste, j'ai exclu la cohorte de janvier parce qu'elle avait une promotion exceptionnelle.
SPEAKER_A: Je comprends la logique, mais l'exclure sans le signaler dans le rapport remet en cause toute l'analyse.
SPEAKER_B: Tu as raison. Je le réécris avec les deux visualisations et une note méthodologique claire.`,
    ttsLanguageCode: 'fr-FR',
    questionText: 'Quel est le problème soulevé ?',
    options: [{ label: 'Les données sont fausses', value: 'fausses' }, { label: 'L\'exclusion de données n\'est pas déclarée', value: 'exclusion' }, { label: 'Le rapport est trop long', value: 'long' }, { label: 'Les chiffres sont trop bas', value: 'bas' }],
    correctAnswer: 'exclusion', points: 2, orderIndex: 107, tags: ['dialogue', 'feedback', 'work-life'], timeSuggested: 100
  },
  {
    language: 'French', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: La nouvelle réglementation européenne sur la protection des données impose des audits trimestriels pour les fournisseurs critiques.
SPEAKER_B: Donc il faudra revoir tous les contrats. Combien de temps avons-nous ?
SPEAKER_A: La conformité est obligatoire au premier janvier, donc six mois.
SPEAKER_B: D'accord, je propose une task force commune avec le juridique et le vendor management.`,
    ttsLanguageCode: 'fr-FR',
    questionText: 'Combien de temps ont-ils pour se mettre en conformité ?',
    options: [{ label: 'Trois mois', value: '3' }, { label: 'Six mois', value: '6' }, { label: 'Un an', value: '12' }, { label: 'Deux ans', value: '24' }],
    correctAnswer: '6', points: 2, orderIndex: 108, tags: ['dialogue', 'compliance', 'work-life'], timeSuggested: 100
  },
]
