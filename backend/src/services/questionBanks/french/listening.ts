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
    ttsScript: 'La crise de la reproductibilité en psychologie fait référence à la découverte que de nombreux résultats publiés dans ce domaine ne peuvent pas être reproduits par des chercheurs indépendants. Une étude majeure de deux mille quinze a tenté de reproduire cent expériences en psychologie et a constaté que seulement trente-neuf pour cent d\'entre elles donnaient les mêmes résultats. Cela a suscité des appels à une plus grande rigueur méthodologique, à l\'enregistrement préalable des études et au partage des données en libre accès.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Quel pourcentage d\'expériences en psychologie a été reproduit avec succès ?',
    options: [{ label: '25 %', value: '25' }, { label: '39 %', value: '39' }, { label: '50 %', value: '50' }, { label: '65 %', value: '65' }],
    correctAnswer: '39', points: 3, orderIndex: 31, tags: ['science', 'recherche'], timeSuggested: 75
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
    ttsScript: 'Le concept de neuroplasticité — la capacité du cerveau à se réorganiser en formant de nouvelles connexions neuronales — a révolutionné notre compréhension de la rééducation cognitive. Les patients victimes d\'un accident vasculaire cérébral, par exemple, peuvent parfois récupérer des fonctions perdues car les parties saines du cerveau compensent les zones endommagées. Ce processus nécessite toutefois une intervention thérapeutique intensive et soutenue.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Qu\'est-ce que la neuroplasticité ?',
    options: [
      { label: 'La capacité d\'apprendre plusieurs langues', value: 'langues' },
      { label: 'La capacité du cerveau à former de nouvelles connexions neuronales', value: 'nouvelles connexions neuronales' },
      { label: 'Un type de chirurgie cérébrale', value: 'chirurgie' },
      { label: 'L\'amélioration de la mémoire par des médicaments', value: 'médicaments' }
    ],
    correctAnswer: 'nouvelles connexions neuronales', points: 3, orderIndex: 33, tags: ['science'], timeSuggested: 75
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
    ttsScript: 'Les implications philosophiques de l\'intrication quantique sont peut-être plus profondes que ses propriétés physiques. Lorsque deux particules deviennent intriquées, la mesure de l\'état de l\'une détermine instantanément l\'état de l\'autre, quelle que soit la distance qui les sépare. Einstein a célèbrement qualifié cela d\'« action fantasmagorique à distance », pourtant des expériences ultérieures ont définitivement confirmé son existence, remettant en question nos hypothèses les plus fondamentales sur la localité et la causalité.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Comment Einstein a-t-il qualifié l\'intrication quantique ?',
    options: [
      { label: 'Une belle théorie', value: 'belle théorie' },
      { label: 'Une action fantasmagorique à distance', value: 'action fantasmagorique à distance' },
      { label: 'Le principe d\'incertitude', value: 'principe d\'incertitude' },
      { label: 'Une curiosité mathématique', value: 'curiosité mathématique' }
    ],
    correctAnswer: 'action fantasmagorique à distance', points: 3, orderIndex: 36, tags: ['physique'], timeSuggested: 90
  },
  {
    language: 'French', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Les implications philosophiques de l\'intrication quantique sont peut-être plus profondes que ses propriétés physiques. Lorsque deux particules deviennent intriquées, la mesure de l\'état de l\'une détermine instantanément l\'état de l\'autre. Des expériences ultérieures ont définitivement confirmé son existence, remettant en question nos hypothèses les plus fondamentales sur la localité et la causalité.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Quelles hypothèses fondamentales l\'intrication quantique remet-elle en question ?',
    options: [
      { label: 'La gravité et le magnétisme', value: 'gravité et magnétisme' },
      { label: 'La localité et la causalité', value: 'localité et causalité' },
      { label: 'Le temps et l\'espace', value: 'temps et espace' },
      { label: 'L\'énergie et la matière', value: 'énergie et matière' }
    ],
    correctAnswer: 'localité et causalité', points: 3, orderIndex: 37, tags: ['physique'], timeSuggested: 90
  },
  {
    language: 'French', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'La marchandisation des données personnelles a engendré une nouvelle forme de capitalisme de surveillance, dans laquelle l\'extraction et la monétisation des données comportementales constituent le principal modèle de revenus de nombreuses entreprises technologiques. Shoshana Zuboff soutient que cela représente une asymétrie sans précédent de connaissances et de pouvoir, fondamentalement incompatible avec les normes démocratiques.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Selon Zuboff, que crée le capitalisme de surveillance ?',
    options: [
      { label: 'Un accès égal à l\'information', value: 'accès égal' },
      { label: 'Une asymétrie sans précédent de connaissances et de pouvoir', value: 'asymétrie de connaissances et de pouvoir' },
      { label: 'De meilleurs produits de consommation', value: 'meilleurs produits' },
      { label: 'Des marchés plus efficaces', value: 'marchés efficaces' }
    ],
    correctAnswer: 'asymétrie de connaissances et de pouvoir', points: 3, orderIndex: 38, tags: ['technologie', 'philosophie'], timeSuggested: 90
  },
  {
    language: 'French', cefrLevel: 'C2', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'Les ramifications épistémologiques de l\'intelligence artificielle s\'étendent bien au-delà de ses applications pratiques immédiates, soulevant des questions fondamentales sur la nature même de la connaissance.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Écrivez exactement ce que vous entendez.',
    correctAnswer: 'Les ramifications épistémologiques de l\'intelligence artificielle s\'étendent bien au-delà de ses applications pratiques immédiates, soulevant des questions fondamentales sur la nature même de la connaissance.', points: 3, orderIndex: 39, tags: ['dictée'], timeSuggested: 120
  },
  {
    language: 'French', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'La soi-disant « crise de la reproductibilité » ne s\'est pas limitée à la psychologie. La médecine, l\'économie et même certains domaines de la physique ont fait l\'objet d\'un examen similaire. Les causes sous-jacentes sont multiples : un biais de publication favorisant les résultats novateurs et statistiquement significatifs, des échantillons insuffisants, des degrés de liberté du chercheur dans l\'analyse des données et des structures d\'incitation perverses au sein du monde universitaire qui privilégient la quantité de publications à la qualité.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Que favorise le « biais de publication » selon le passage ?',
    options: [
      { label: 'Les résultats reproduits', value: 'reproduits' },
      { label: 'Les résultats novateurs et statistiquement significatifs', value: 'novateurs et significatifs' },
      { label: 'Les études à grande échelle', value: 'grande échelle' },
      { label: 'Les résultats négatifs', value: 'négatifs' }
    ],
    correctAnswer: 'novateurs et significatifs', points: 3, orderIndex: 40, tags: ['science', 'méthodologie'], timeSuggested: 90
  },
  {
    language: 'French', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Le concept d\'humilité épistémique, enraciné dans la philosophie socratique, suggère que reconnaître les limites de ses connaissances est paradoxalement un prérequis pour une compréhension véritable. À une époque de surcharge informationnelle et d\'affirmations péremptoires sur les réseaux sociaux, cultiver une telle humilité est peut-être plus important que jamais, tant pour la cognition individuelle que pour la délibération collective.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Dans quoi l\'humilité épistémique est-elle enracinée ?',
    options: [
      { label: 'La psychologie moderne', value: 'psychologie moderne' },
      { label: 'La philosophie socratique', value: 'philosophie socratique' },
      { label: 'La méditation orientale', value: 'méditation orientale' },
      { label: 'La méthode scientifique', value: 'méthode scientifique' }
    ],
    correctAnswer: 'philosophie socratique', points: 3, orderIndex: 41, tags: ['philosophie'], timeSuggested: 90
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
    ttsScript: 'L\'essor des théories du complot sur les réseaux sociaux pose un défi inédit aux démocraties contemporaines. Les algorithmes de recommandation, conçus pour maximiser l\'engagement, tendent à enfermer les utilisateurs dans des bulles informationnelles qui renforcent leurs convictions préexistantes. Ce phénomène, connu sous le nom d\'« effet de chambre d\'écho », réduit l\'exposition à des points de vue divergents et peut radicaliser les opinions politiques.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Comment s\'appelle le phénomène décrit dans le passage ?',
    options: [
      { label: 'L\'effet papillon', value: 'effet papillon' },
      { label: 'L\'effet de chambre d\'écho', value: 'effet de chambre d\'écho' },
      { label: 'L\'effet boule de neige', value: 'effet boule de neige' },
      { label: 'L\'effet Streisand', value: 'effet Streisand' }
    ],
    correctAnswer: 'effet de chambre d\'écho', points: 2, orderIndex: 63, tags: ['médias', 'société'], timeSuggested: 75
  },
  {
    language: 'French', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'L\'architecture haussmannienne, qui caractérise une grande partie du paysage urbain parisien, résulte des travaux de rénovation entrepris sous le Second Empire par le baron Haussmann entre mille huit cent cinquante-trois et mille huit cent soixante-dix. Ces travaux visaient à moderniser Paris en créant de larges boulevards, des places et des espaces verts, tout en améliorant l\'assainissement. Cependant, cette transformation a aussi entraîné l\'expropriation de milliers de résidents des classes populaires, contribuant à la ségrégation socio-spatiale qui perdure encore aujourd\'hui.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Quelle conséquence négative des travaux haussmanniens est mentionnée ?',
    options: [
      { label: 'La destruction de monuments historiques', value: 'monuments' },
      { label: 'L\'expropriation des résidents populaires et la ségrégation socio-spatiale', value: 'expropriation et ségrégation' },
      { label: 'L\'augmentation de la pollution', value: 'pollution' },
      { label: 'La perte des espaces verts', value: 'espaces verts' }
    ],
    correctAnswer: 'expropriation et ségrégation', points: 2, orderIndex: 64, tags: ['histoire', 'urbanisme'], timeSuggested: 75
  },
  {
    language: 'French', cefrLevel: 'C1', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'La prolifération des données massives soulève des enjeux éthiques considérables, notamment en ce qui concerne le respect de la vie privée et le consentement éclairé des individus.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Écrivez exactement ce que vous entendez.',
    correctAnswer: 'La prolifération des données massives soulève des enjeux éthiques considérables, notamment en ce qui concerne le respect de la vie privée et le consentement éclairé des individus.', points: 2, orderIndex: 65, tags: ['dictée', 'technologie'], timeSuggested: 90
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
    ttsScript: 'L\'hypothèse de Sapir-Whorf, dans sa version forte, postule que la structure d\'une langue détermine fondamentalement la pensée de ses locuteurs. Bien que cette version déterministe ait été largement réfutée, des recherches récentes en linguistique cognitive ont ravivé l\'intérêt pour sa version faible, selon laquelle la langue influencerait — sans le déterminer — le mode de perception et de catégorisation du réel. Des expériences sur la perception des couleurs chez des locuteurs de langues possédant des lexiques chromatiques distincts ont fourni des preuves empiriques en faveur de cette thèse.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Quel domaine de recherche a fourni des preuves pour la version faible de l\'hypothèse ?',
    options: [
      { label: 'La perception du temps', value: 'temps' },
      { label: 'La perception des couleurs', value: 'perception des couleurs' },
      { label: 'La mémoire auditive', value: 'mémoire' },
      { label: 'La résolution de problèmes mathématiques', value: 'mathématiques' }
    ],
    correctAnswer: 'perception des couleurs', points: 2, orderIndex: 68, tags: ['linguistique', 'cognition'], timeSuggested: 90
  },
  {
    language: 'French', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'La notion de « post-vérité », élue mot de l\'année par le dictionnaire Oxford en deux mille seize, désigne un contexte dans lequel les faits objectifs ont moins d\'influence sur la formation de l\'opinion publique que les appels à l\'émotion et aux croyances personnelles. Ce phénomène, amplifié par la viralité des réseaux sociaux et la fragmentation du paysage médiatique, remet en cause les fondements mêmes de la délibération démocratique, qui présuppose un socle commun de réalité partagée.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Que présuppose la délibération démocratique selon le passage ?',
    options: [
      { label: 'Des médias indépendants', value: 'médias indépendants' },
      { label: 'Un socle commun de réalité partagée', value: 'réalité partagée' },
      { label: 'La liberté d\'expression absolue', value: 'liberté expression' },
      { label: 'Un système éducatif performant', value: 'éducation' }
    ],
    correctAnswer: 'réalité partagée', points: 2, orderIndex: 69, tags: ['médias', 'philosophie'], timeSuggested: 90
  },
  {
    language: 'French', cefrLevel: 'C2', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'L\'enchevêtrement des facteurs géopolitiques, économiques et climatiques rend toute prévision à long terme hasardeuse, contraignant les décideurs à naviguer dans un brouillard d\'incertitudes irréductibles.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Écrivez exactement ce que vous entendez.',
    correctAnswer: 'L\'enchevêtrement des facteurs géopolitiques, économiques et climatiques rend toute prévision à long terme hasardeuse, contraignant les décideurs à naviguer dans un brouillard d\'incertitudes irréductibles.', points: 2, orderIndex: 70, tags: ['dictée', 'géopolitique'], timeSuggested: 120
  },
  {
    language: 'French', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Le paradoxe de la tolérance, formulé par Karl Popper en mille neuf cent quarante-cinq, affirme qu\'une société illimitément tolérante finira inévitablement par être submergée par les intolérants. En d\'autres termes, si nous étendons une tolérance illimitée même à ceux qui sont intolérants, et si nous ne sommes pas disposés à défendre une société tolérante contre les assauts de l\'intolérant, alors le tolérant sera détruit et la tolérance avec lui. Popper en concluait que nous devons revendiquer, au nom de la tolérance, le droit de ne pas tolérer l\'intolérance.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Selon Popper, que doit revendiquer une société tolérante ?',
    options: [
      { label: 'Le droit à la liberté absolue', value: 'liberté absolue' },
      { label: 'Le droit de ne pas tolérer l\'intolérance', value: 'ne pas tolérer l\'intolérance' },
      { label: 'Le droit de censurer toute opposition', value: 'censure' },
      { label: 'Le droit d\'imposer ses valeurs', value: 'imposer valeurs' }
    ],
    correctAnswer: 'ne pas tolérer l\'intolérance', points: 2, orderIndex: 71, tags: ['philosophie', 'politique'], timeSuggested: 90
  },
  {
    language: 'French', cefrLevel: 'C2', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'La juxtaposition de paradigmes épistémologiques apparemment irréconciliables constitue l\'un des défis les plus stimulants auxquels se confronte la philosophie des sciences contemporaine.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Écrivez exactement ce que vous entendez.',
    correctAnswer: 'La juxtaposition de paradigmes épistémologiques apparemment irréconciliables constitue l\'un des défis les plus stimulants auxquels se confronte la philosophie des sciences contemporaine.', points: 2, orderIndex: 72, tags: ['dictée', 'philosophie'], timeSuggested: 120
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
]
