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
    options: [{ label: 'À côté de l\'école', value: 'à côté de l\'école' }, { label: 'À côté du supermarché', value: 'à côté du supermarché' }, { label: 'À côté du parc', value: 'à côté du parc' }, { label: 'À côté de l\'hôpital', value: 'à côté de l\'hôpital' }],
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
    ttsScript: 'Le chat est sur la table.',
    ttsLanguageCode: 'fr-FR',
    questionText: 'Écrivez exactement ce que vous entendez.',
    correctAnswer: 'Le chat est sur la table.', points: 1, orderIndex: 7, tags: ['dictée'], timeSuggested: 30
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
  }
]
