import { MultiSkillQuestionData } from '../types'

// French Reading Questions — 7 per CEFR level (42 total)
// Types: READING, MULTIPLE_CHOICE, FILL_BLANK with passages

export const frenchReadingQuestions: MultiSkillQuestionData[] = [
  // ============================================================
  // A1 — Débutant (7 questions)
  // ============================================================
  {
    language: 'French', cefrLevel: 'A1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Ma famille',
    passage: 'Je m\'appelle Sophie. J\'ai neuf ans. J\'ai un frère. Il s\'appelle Lucas. Il a sept ans. Nous avons un chat. Le chat est noir. Nous habitons dans une petite maison.',
    questionText: 'Quel âge a Sophie ?',
    options: [{ label: 'Sept ans', value: '7' }, { label: 'Neuf ans', value: '9' }, { label: 'Dix ans', value: '10' }, { label: 'Huit ans', value: '8' }],
    correctAnswer: '9', points: 1, orderIndex: 1, tags: ['famille', 'nombres']
  },
  {
    language: 'French', cefrLevel: 'A1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Ma famille',
    passage: 'Je m\'appelle Sophie. J\'ai neuf ans. J\'ai un frère. Il s\'appelle Lucas. Il a sept ans. Nous avons un chat. Le chat est noir. Nous habitons dans une petite maison.',
    questionText: 'De quelle couleur est le chat ?',
    options: [{ label: 'Blanc', value: 'blanc' }, { label: 'Gris', value: 'gris' }, { label: 'Noir', value: 'noir' }, { label: 'Roux', value: 'roux' }],
    correctAnswer: 'noir', points: 1, orderIndex: 2, tags: ['famille', 'couleurs']
  },
  {
    language: 'French', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'READING',
    passageTitle: 'Au magasin',
    passage: 'Je vais au magasin. J\'achète du pain et du lait. Le pain coûte deux euros. Le lait coûte un euro. Je paie trois euros.',
    questionText: 'Combien coûte le pain ?',
    options: [{ label: 'Un euro', value: 'un euro' }, { label: 'Deux euros', value: 'deux euros' }, { label: 'Trois euros', value: 'trois euros' }, { label: 'Quatre euros', value: 'quatre euros' }],
    correctAnswer: 'deux euros', points: 1, orderIndex: 3, tags: ['courses', 'nombres']
  },
  {
    language: 'French', cefrLevel: 'A1', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'Je vais au magasin. J\'achète du pain et du lait. Le pain coûte deux euros. Le lait coûte un euro. Je paie trois euros.',
    questionText: 'J\'achète du pain et du ___.',
    correctAnswer: 'lait', points: 1, orderIndex: 4, tags: ['courses']
  },
  {
    language: 'French', cefrLevel: 'A1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Ma journée',
    passage: 'Je me réveille à sept heures. Je prends le petit déjeuner. Ensuite, je vais à l\'école. L\'école commence à huit heures et demie. Je rentre à la maison à trois heures. Je joue avec mes amis.',
    questionText: 'À quelle heure commence l\'école ?',
    options: [{ label: '7h00', value: '7h00' }, { label: '8h30', value: '8h30' }, { label: '3h00', value: '3h00' }, { label: '9h00', value: '9h00' }],
    correctAnswer: '8h30', points: 1, orderIndex: 5, tags: ['routine', 'heure']
  },
  {
    language: 'French', cefrLevel: 'A1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Ma journée',
    passage: 'Je me réveille à sept heures. Je prends le petit déjeuner. Ensuite, je vais à l\'école. L\'école commence à huit heures et demie. Je rentre à la maison à trois heures. Je joue avec mes amis.',
    questionText: 'Que fait la personne après l\'école ?',
    options: [{ label: 'Elle dîne', value: 'elle dîne' }, { label: 'Elle joue avec ses amis', value: 'elle joue avec ses amis' }, { label: 'Elle fait les courses', value: 'elle fait les courses' }, { label: 'Elle regarde la télé', value: 'elle regarde la télé' }],
    correctAnswer: 'elle joue avec ses amis', points: 1, orderIndex: 6, tags: ['routine']
  },
  {
    language: 'French', cefrLevel: 'A1', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'Je me réveille à sept heures. Je prends le petit déjeuner. Ensuite, je vais à l\'école.',
    questionText: 'Je me réveille à sept ___. (Écrivez le mot manquant)',
    correctAnswer: 'heures', points: 1, orderIndex: 7, tags: ['heure']
  },

  // ============================================================
  // A2 — Élémentaire (7 questions)
  // ============================================================
  {
    language: 'French', cefrLevel: 'A2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Un voyage à Paris',
    passage: 'L\'été dernier, Marie a visité Paris pour la première fois. Elle a logé dans un hôtel près de la Seine. Elle a visité la tour Eiffel, le Louvre et Notre-Dame. Le temps était chaud et ensoleillé. Elle a pris beaucoup de photos et a acheté des souvenirs pour sa famille.',
    questionText: 'Où Marie a-t-elle logé à Paris ?',
    options: [{ label: 'Dans une maison', value: 'dans une maison' }, { label: 'Dans un hôtel près de la Seine', value: 'dans un hôtel près de la Seine' }, { label: 'Chez des amis', value: 'chez des amis' }, { label: 'Dans un appartement', value: 'dans un appartement' }],
    correctAnswer: 'dans un hôtel près de la Seine', points: 1, orderIndex: 8, tags: ['voyage', 'passé composé']
  },
  {
    language: 'French', cefrLevel: 'A2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Un voyage à Paris',
    passage: 'L\'été dernier, Marie a visité Paris pour la première fois. Elle a logé dans un hôtel près de la Seine. Elle a visité la tour Eiffel, le Louvre et Notre-Dame. Le temps était chaud et ensoleillé. Elle a pris beaucoup de photos et a acheté des souvenirs pour sa famille.',
    questionText: 'Quel temps faisait-il ?',
    options: [{ label: 'Froid et pluvieux', value: 'froid et pluvieux' }, { label: 'Chaud et ensoleillé', value: 'chaud et ensoleillé' }, { label: 'Nuageux', value: 'nuageux' }, { label: 'Venteux', value: 'venteux' }],
    correctAnswer: 'chaud et ensoleillé', points: 1, orderIndex: 9, tags: ['voyage', 'météo']
  },
  {
    language: 'French', cefrLevel: 'A2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Le nouveau restaurant',
    passage: 'Un nouveau restaurant italien a ouvert rue du Parc le mois dernier. Le restaurant s\'appelle « Bella Italia ». On y sert des pâtes, des pizzas et des salades. Les prix ne sont pas chers. Beaucoup de gens y vont le week-end. Le restaurant est ouvert de onze heures à vingt-deux heures tous les jours sauf le lundi.',
    questionText: 'Quand le restaurant est-il fermé ?',
    options: [{ label: 'Le dimanche', value: 'le dimanche' }, { label: 'Le samedi', value: 'le samedi' }, { label: 'Le lundi', value: 'le lundi' }, { label: 'Le mardi', value: 'le mardi' }],
    correctAnswer: 'le lundi', points: 1, orderIndex: 10, tags: ['nourriture', 'lieux']
  },
  {
    language: 'French', cefrLevel: 'A2', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'Un nouveau restaurant italien a ouvert rue du Parc le mois dernier. Le restaurant s\'appelle « Bella Italia ».',
    questionText: 'Le restaurant s\'appelle « Bella ___ ».',
    correctAnswer: 'Italia', points: 1, orderIndex: 11, tags: ['nourriture', 'lieux']
  },
  {
    language: 'French', cefrLevel: 'A2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Courriel à un ami',
    passage: 'Salut Thomas, j\'espère que tu vas bien. J\'ai déménagé dans un nouvel appartement la semaine dernière. Il est plus grand que l\'ancien. Il a deux chambres, une cuisine et un joli balcon. Le quartier est calme et il y a un parc à côté. Tu veux venir me voir le week-end prochain ? À bientôt, Sarah',
    questionText: 'Pourquoi Sarah a-t-elle écrit à Thomas ?',
    options: [{ label: 'Pour l\'inviter à venir', value: 'pour l\'inviter à venir' }, { label: 'Pour demander de l\'argent', value: 'pour demander de l\'argent' }, { label: 'Pour dire au revoir', value: 'pour dire au revoir' }, { label: 'Pour se plaindre', value: 'pour se plaindre' }],
    correctAnswer: 'pour l\'inviter à venir', points: 1, orderIndex: 12, tags: ['communication', 'logement']
  },
  {
    language: 'French', cefrLevel: 'A2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Courriel à un ami',
    passage: 'Salut Thomas, j\'espère que tu vas bien. J\'ai déménagé dans un nouvel appartement la semaine dernière. Il est plus grand que l\'ancien. Il a deux chambres, une cuisine et un joli balcon. Le quartier est calme et il y a un parc à côté. Tu veux venir me voir le week-end prochain ? À bientôt, Sarah',
    questionText: 'Combien de chambres a le nouvel appartement ?',
    options: [{ label: 'Une', value: 'une' }, { label: 'Deux', value: 'deux' }, { label: 'Trois', value: 'trois' }, { label: 'Quatre', value: 'quatre' }],
    correctAnswer: 'deux', points: 1, orderIndex: 13, tags: ['logement']
  },
  {
    language: 'French', cefrLevel: 'A2', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'J\'ai déménagé dans un nouvel appartement la semaine dernière. Il est plus grand que l\'ancien.',
    questionText: 'Le nouvel appartement est plus ___ que l\'ancien.',
    correctAnswer: 'grand', points: 1, orderIndex: 14, tags: ['comparatifs']
  },

  // ============================================================
  // B1 — Intermédiaire (7 questions)
  // ============================================================
  {
    language: 'French', cefrLevel: 'B1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Le télétravail',
    passage: 'Le nombre de personnes travaillant à domicile a considérablement augmenté depuis 2020. De nombreuses entreprises ont découvert que les employés peuvent être tout aussi productifs chez eux qu\'au bureau. Cependant, certains travailleurs disent se sentir isolés et regrettent les interactions sociales du lieu de travail. Les entreprises cherchent maintenant un équilibre, et beaucoup adoptent un modèle hybride où les employés travaillent de chez eux deux ou trois jours par semaine.',
    questionText: 'Qu\'est-ce qu\'un « modèle hybride » selon le texte ?',
    options: [
      { label: 'Travailler uniquement de chez soi', value: 'travailler uniquement de chez soi' },
      { label: 'Travailler certains jours à la maison et d\'autres au bureau', value: 'travailler certains jours à la maison et d\'autres au bureau' },
      { label: 'Travailler uniquement au bureau', value: 'travailler uniquement au bureau' },
      { label: 'Travailler dans différents bureaux', value: 'travailler dans différents bureaux' }
    ],
    correctAnswer: 'travailler certains jours à la maison et d\'autres au bureau', points: 2, orderIndex: 15, tags: ['travail', 'vie moderne']
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Le télétravail',
    passage: 'Le nombre de personnes travaillant à domicile a considérablement augmenté depuis 2020. De nombreuses entreprises ont découvert que les employés peuvent être tout aussi productifs chez eux qu\'au bureau. Cependant, certains travailleurs disent se sentir isolés et regrettent les interactions sociales du lieu de travail.',
    questionText: 'Quel problème rencontrent certains télétravailleurs ?',
    options: [
      { label: 'Ils gagnent moins d\'argent', value: 'ils gagnent moins d\'argent' },
      { label: 'Ils se sentent isolés', value: 'ils se sentent isolés' },
      { label: 'Ils travaillent plus longtemps', value: 'ils travaillent plus longtemps' },
      { label: 'Ils ont des problèmes techniques', value: 'ils ont des problèmes techniques' }
    ],
    correctAnswer: 'ils se sentent isolés', points: 2, orderIndex: 16, tags: ['travail']
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Les bienfaits de l\'exercice',
    passage: 'L\'exercice physique régulier a de nombreux bienfaits pour la santé. Il réduit le risque de maladies cardiaques, aide à contrôler le poids et améliore la santé mentale. Des études montrent que même trente minutes d\'exercice modéré, comme la marche, cinq fois par semaine, peuvent faire une différence significative. Malgré cela, beaucoup d\'adultes ne font pas assez d\'exercice. Les raisons les plus courantes sont le manque de temps, de motivation ou d\'accès à des installations sportives.',
    questionText: 'Combien d\'exercice hebdomadaire le texte recommande-t-il ?',
    options: [
      { label: '30 minutes une fois par semaine', value: '30 minutes une fois par semaine' },
      { label: '30 minutes cinq fois par semaine', value: '30 minutes cinq fois par semaine' },
      { label: 'Une heure chaque jour', value: 'une heure chaque jour' },
      { label: 'Deux heures trois fois par semaine', value: 'deux heures trois fois par semaine' }
    ],
    correctAnswer: '30 minutes cinq fois par semaine', points: 2, orderIndex: 17, tags: ['santé', 'exercice']
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'L\'exercice physique régulier a de nombreux bienfaits pour la santé. Il réduit le risque de maladies cardiaques, aide à contrôler le poids et améliore la santé mentale.',
    questionText: 'L\'exercice améliore la santé ___. (Quel type de santé en plus de la santé physique ?)',
    correctAnswer: 'mentale', points: 2, orderIndex: 18, tags: ['santé']
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'READING', skill: 'READING',
    passageTitle: 'La pollution plastique',
    passage: 'La pollution plastique est devenue l\'un des problèmes environnementaux les plus urgents. Chaque année, des millions de tonnes de déchets plastiques finissent dans les océans, nuisant à la vie marine. De nombreux pays ont commencé à interdire les plastiques à usage unique comme les sacs et les pailles. Les taux de recyclage se sont améliorés, mais les experts affirment qu\'il faut réduire notre consommation de plastique dans son ensemble, et pas seulement recycler davantage.',
    questionText: 'Selon les experts, qu\'est-ce qui est plus important que le recyclage ?',
    options: [
      { label: 'Produire plus de plastique', value: 'produire plus de plastique' },
      { label: 'Réduire la consommation de plastique', value: 'réduire la consommation de plastique' },
      { label: 'Utiliser d\'autres matériaux', value: 'utiliser d\'autres matériaux' },
      { label: 'Construire plus d\'usines', value: 'construire plus d\'usines' }
    ],
    correctAnswer: 'réduire la consommation de plastique', points: 2, orderIndex: 19, tags: ['environnement']
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'READING', skill: 'READING',
    passageTitle: 'La pollution plastique',
    passage: 'La pollution plastique est devenue l\'un des problèmes environnementaux les plus urgents. Chaque année, des millions de tonnes de déchets plastiques finissent dans les océans, nuisant à la vie marine. De nombreux pays ont commencé à interdire les plastiques à usage unique comme les sacs et les pailles.',
    questionText: 'Quels exemples de plastiques à usage unique sont mentionnés ?',
    options: [
      { label: 'Les bouteilles et les tasses', value: 'les bouteilles et les tasses' },
      { label: 'Les sacs et les pailles', value: 'les sacs et les pailles' },
      { label: 'Les emballages et les films', value: 'les emballages et les films' },
      { label: 'Les assiettes et les fourchettes', value: 'les assiettes et les fourchettes' }
    ],
    correctAnswer: 'les sacs et les pailles', points: 2, orderIndex: 20, tags: ['environnement']
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'La pollution plastique est devenue l\'un des problèmes environnementaux les plus urgents. Chaque année, des millions de tonnes de déchets plastiques finissent dans les océans.',
    questionText: 'Des millions de tonnes de plastique finissent dans les ___.',
    correctAnswer: 'océans', points: 2, orderIndex: 21, tags: ['environnement']
  },

  // ============================================================
  // B2 — Intermédiaire supérieur (7 questions)
  // ============================================================
  {
    language: 'French', cefrLevel: 'B2', questionType: 'READING', skill: 'READING',
    passageTitle: 'L\'économie des petits boulots',
    passage: 'L\'économie des petits boulots a transformé la façon dont des millions de personnes travaillent. Des plateformes comme Uber, Deliveroo et Malt mettent en relation des travailleurs indépendants avec des clients qui ont besoin de services spécifiques. Les partisans soutiennent que cela offre flexibilité et indépendance, permettant aux gens de travailler selon leurs propres conditions. Les critiques, en revanche, soulignent que ces travailleurs manquent souvent d\'avantages tels que l\'assurance maladie, les congés payés et les cotisations de retraite. Le débat sur le statut de ces travailleurs — salariés ou indépendants — se poursuit devant les tribunaux du monde entier.',
    questionText: 'Quelle est la principale controverse concernant les travailleurs des plateformes ?',
    options: [
      { label: 'S\'ils doivent payer plus d\'impôts', value: 's\'ils doivent payer plus d\'impôts' },
      { label: 'S\'ils doivent être classés comme salariés ou indépendants', value: 's\'ils doivent être classés comme salariés ou indépendants' },
      { label: 'S\'ils sont suffisamment qualifiés', value: 's\'ils sont suffisamment qualifiés' },
      { label: 'S\'ils travaillent trop d\'heures', value: 's\'ils travaillent trop d\'heures' }
    ],
    correctAnswer: 's\'ils doivent être classés comme salariés ou indépendants', points: 2, orderIndex: 22, tags: ['travail', 'économie']
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'READING', skill: 'READING',
    passageTitle: 'L\'économie des petits boulots',
    passage: 'Les partisans soutiennent que l\'économie des petits boulots offre flexibilité et indépendance, permettant aux gens de travailler selon leurs propres conditions. Les critiques, en revanche, soulignent que ces travailleurs manquent souvent d\'avantages tels que l\'assurance maladie, les congés payés et les cotisations de retraite.',
    questionText: 'Quel avantage n\'est PAS mentionné comme manquant pour ces travailleurs ?',
    options: [
      { label: 'L\'assurance maladie', value: 'l\'assurance maladie' },
      { label: 'Les congés payés', value: 'les congés payés' },
      { label: 'Les formations professionnelles', value: 'les formations professionnelles' },
      { label: 'Les cotisations de retraite', value: 'les cotisations de retraite' }
    ],
    correctAnswer: 'les formations professionnelles', points: 2, orderIndex: 23, tags: ['travail', 'économie']
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Le sommeil et l\'apprentissage',
    passage: 'Des recherches récentes en neurosciences ont révélé un lien étroit entre le sommeil et la consolidation de la mémoire. Pendant le sommeil profond, le cerveau rejoue et renforce les connexions neuronales formées pendant l\'éveil, transférant ainsi les informations de la mémoire à court terme vers la mémoire à long terme. Les étudiants qui dorment suffisamment après avoir étudié obtiennent de bien meilleurs résultats aux examens que ceux qui restent debout tard pour réviser. De plus, le manque de sommeil altère les fonctions cognitives telles que l\'attention, la résolution de problèmes et la pensée créative.',
    questionText: 'D\'après le texte, que se passe-t-il pendant le sommeil profond ?',
    options: [
      { label: 'Le cerveau cesse de traiter les informations', value: 'le cerveau cesse de traiter' },
      { label: 'Le cerveau rejoue et renforce les connexions neuronales', value: 'le cerveau rejoue et renforce les connexions neuronales' },
      { label: 'Les nouveaux souvenirs sont effacés', value: 'les nouveaux souvenirs sont effacés' },
      { label: 'Le cerveau crée de nouvelles connexions', value: 'le cerveau crée de nouvelles connexions' }
    ],
    correctAnswer: 'le cerveau rejoue et renforce les connexions neuronales', points: 2, orderIndex: 24, tags: ['science', 'éducation']
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Le sommeil et l\'apprentissage',
    passage: 'Les étudiants qui dorment suffisamment après avoir étudié obtiennent de bien meilleurs résultats aux examens que ceux qui restent debout tard pour réviser. De plus, le manque de sommeil altère les fonctions cognitives telles que l\'attention, la résolution de problèmes et la pensée créative.',
    questionText: 'Quelles fonctions cognitives sont altérées par le manque de sommeil ?',
    options: [
      { label: 'La mémoire, la parole et l\'ouïe', value: 'la mémoire, la parole et l\'ouïe' },
      { label: 'L\'attention, la résolution de problèmes et la pensée créative', value: 'l\'attention, la résolution de problèmes et la pensée créative' },
      { label: 'La lecture, l\'écriture et l\'expression orale', value: 'la lecture, l\'écriture et l\'expression orale' },
      { label: 'La vision, l\'ouïe et l\'équilibre', value: 'la vision, l\'ouïe et l\'équilibre' }
    ],
    correctAnswer: 'l\'attention, la résolution de problèmes et la pensée créative', points: 2, orderIndex: 25, tags: ['science']
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'Pendant le sommeil profond, le cerveau rejoue et renforce les connexions neuronales formées pendant l\'éveil, transférant ainsi les informations de la mémoire à court terme vers la mémoire à long terme.',
    questionText: 'Le sommeil aide à transférer les informations de la mémoire à court terme vers la mémoire à ___ terme.',
    correctAnswer: 'long', points: 2, orderIndex: 26, tags: ['science']
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'READING', skill: 'READING',
    passageTitle: 'L\'agriculture urbaine',
    passage: 'L\'agriculture urbaine gagne en popularité dans les villes du monde entier en réponse aux préoccupations de sécurité alimentaire et à la sensibilisation environnementale. Les jardins sur les toits, les fermes verticales et les jardins partagés transforment des espaces urbains inutilisés en sources de production alimentaire. Les partisans affirment que l\'agriculture urbaine réduit les coûts et les émissions liés au transport, fournit des produits plus frais et renforce les liens communautaires. Cependant, des défis subsistent, notamment l\'espace limité, la contamination des sols dans les anciennes zones industrielles et le coût élevé de l\'installation de cultures en intérieur.',
    questionText: 'Quel défi de l\'agriculture urbaine est mentionné dans le texte ?',
    options: [
      { label: 'Trop d\'eau', value: 'trop d\'eau' },
      { label: 'La contamination des sols', value: 'la contamination des sols' },
      { label: 'Trop d\'agriculteurs', value: 'trop d\'agriculteurs' },
      { label: 'Le manque d\'intérêt', value: 'le manque d\'intérêt' }
    ],
    correctAnswer: 'la contamination des sols', points: 2, orderIndex: 27, tags: ['environnement', 'urbain']
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'Les jardins sur les toits, les fermes verticales et les jardins partagés transforment des espaces urbains inutilisés en sources de production alimentaire.',
    questionText: 'Les fermes ___ sont un type d\'agriculture urbaine qui utilise l\'espace vertical.',
    correctAnswer: 'verticales', points: 2, orderIndex: 28, tags: ['environnement']
  },

  // ============================================================
  // C1 — Avancé (7 questions)
  // ============================================================
  {
    language: 'French', cefrLevel: 'C1', questionType: 'READING', skill: 'READING',
    passageTitle: 'L\'éthique de l\'intelligence artificielle',
    passage: 'L\'avancée rapide de l\'intelligence artificielle a soulevé de profondes questions éthiques auxquelles la société doit faire face. Les biais algorithmiques, par lesquels les systèmes d\'IA perpétuent ou amplifient les préjugés sociétaux existants, ont été documentés dans des domaines allant de la justice pénale aux pratiques d\'embauche. L\'opacité des modèles d\'apprentissage profond — souvent appelée le problème de la « boîte noire » — rend difficile la compréhension des raisons pour lesquelles un système d\'IA prend telle ou telle décision, soulevant des questions de responsabilité. En outre, le déplacement potentiel des travailleurs par l\'automatisation pose des défis socio-économiques considérables qui nécessitent des réponses politiques proactives.',
    questionText: 'À quoi fait référence le problème de la « boîte noire » dans le contexte de l\'IA ?',
    options: [
      { label: 'Les systèmes d\'IA sont coûteux', value: 'les systèmes d\'IA sont coûteux' },
      { label: 'Les processus décisionnels de l\'IA ne sont pas transparents', value: 'les processus décisionnels de l\'IA ne sont pas transparents' },
      { label: 'Les systèmes d\'IA tombent souvent en panne', value: 'les systèmes d\'IA tombent souvent en panne' },
      { label: 'Le matériel informatique est difficile à fabriquer', value: 'le matériel informatique est difficile à fabriquer' }
    ],
    correctAnswer: 'les processus décisionnels de l\'IA ne sont pas transparents', points: 3, orderIndex: 29, tags: ['technologie', 'éthique']
  },
  {
    language: 'French', cefrLevel: 'C1', questionType: 'READING', skill: 'READING',
    passageTitle: 'L\'éthique de l\'intelligence artificielle',
    passage: 'Les biais algorithmiques, par lesquels les systèmes d\'IA perpétuent ou amplifient les préjugés sociétaux existants, ont été documentés dans des domaines allant de la justice pénale aux pratiques d\'embauche. L\'opacité des modèles d\'apprentissage profond rend difficile la compréhension des raisons pour lesquelles un système d\'IA prend telle ou telle décision, soulevant des questions de responsabilité.',
    questionText: 'Le mot « opacité » dans ce passage est le plus proche de :',
    options: [
      { label: 'Transparence', value: 'transparence' },
      { label: 'Efficacité', value: 'efficacité' },
      { label: 'Manque de transparence', value: 'manque de transparence' },
      { label: 'Complexité', value: 'complexité' }
    ],
    correctAnswer: 'manque de transparence', points: 3, orderIndex: 30, tags: ['vocabulaire', 'technologie']
  },
  {
    language: 'French', cefrLevel: 'C1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Langue et pensée',
    passage: 'L\'hypothèse de Sapir-Whorf, selon laquelle la structure d\'une langue influence la vision du monde et la cognition de ses locuteurs, a fait l\'objet de débats considérables en linguistique. La version forte — le déterminisme linguistique — suggère que la langue détermine la pensée, tandis que la version faible — la relativité linguistique — propose que la langue influence simplement les schémas de pensée. La recherche contemporaine a largement soutenu la version faible, démontrant que les locuteurs de langues différentes peuvent percevoir le temps, l\'espace et les couleurs différemment, mais pas au point de ne pouvoir conceptualiser des idées absentes de leur langue.',
    questionText: 'Quelle est la différence entre le déterminisme linguistique et la relativité linguistique ?',
    options: [
      { label: 'Le déterminisme dit que la langue détermine la pensée ; la relativité dit qu\'elle l\'influence', value: 'le déterminisme détermine, la relativité influence' },
      { label: 'Ce sont les mêmes concepts sous des noms différents', value: 'mêmes concepts' },
      { label: 'Le déterminisme concerne la grammaire ; la relativité concerne le vocabulaire', value: 'grammaire vs vocabulaire' },
      { label: 'Le déterminisme est plus récent que la relativité', value: 'le déterminisme est plus récent' }
    ],
    correctAnswer: 'le déterminisme détermine, la relativité influence', points: 3, orderIndex: 31, tags: ['linguistique', 'philosophie']
  },
  {
    language: 'French', cefrLevel: 'C1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Langue et pensée',
    passage: 'La recherche contemporaine a largement soutenu la version faible, démontrant que les locuteurs de langues différentes peuvent percevoir le temps, l\'espace et les couleurs différemment, mais pas au point de ne pouvoir conceptualiser des idées absentes de leur langue.',
    questionText: 'Qu\'a conclu la recherche contemporaine sur l\'hypothèse de Sapir-Whorf ?',
    options: [
      { label: 'La version forte est correcte', value: 'version forte correcte' },
      { label: 'Les deux versions sont incorrectes', value: 'les deux incorrectes' },
      { label: 'La version faible est largement soutenue', value: 'version faible soutenue' },
      { label: 'L\'hypothèse a été entièrement réfutée', value: 'entièrement réfutée' }
    ],
    correctAnswer: 'version faible soutenue', points: 3, orderIndex: 32, tags: ['linguistique']
  },
  {
    language: 'French', cefrLevel: 'C1', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'L\'hypothèse de Sapir-Whorf postule que la structure d\'une langue influence la vision du monde et la cognition de ses locuteurs.',
    questionText: 'L\'hypothèse de Sapir-Whorf concerne la relation entre la langue et la ___.',
    correctAnswer: 'cognition', points: 3, orderIndex: 33, tags: ['linguistique']
  },
  {
    language: 'French', cefrLevel: 'C1', questionType: 'READING', skill: 'READING',
    passageTitle: 'L\'économie comportementale',
    passage: 'La théorie économique traditionnelle suppose que les individus prennent des décisions rationnelles pour maximiser leur utilité. L\'économie comportementale, développée par des chercheurs tels que Daniel Kahneman et Amos Tversky, remet en question cette hypothèse en démontrant des biais cognitifs systématiques qui conduisent à des prises de décision irrationnelles. Le concept d\'« aversion à la perte » — la tendance des gens à préférer éviter les pertes plutôt qu\'à obtenir des gains équivalents — a des implications profondes pour la conception des politiques publiques, le marketing et la planification financière.',
    questionText: 'Que signifie l\'« aversion à la perte » ?',
    options: [
      { label: 'Les gens préfèrent prendre des risques', value: 'les gens préfèrent les risques' },
      { label: 'Les gens ressentent les pertes plus fortement que les gains équivalents', value: 'les pertes ressenties plus fortement que les gains' },
      { label: 'Les gens évitent toute décision financière', value: 'évitent les décisions financières' },
      { label: 'Les gens choisissent toujours l\'option la moins chère', value: 'choisissent le moins cher' }
    ],
    correctAnswer: 'les pertes ressenties plus fortement que les gains', points: 3, orderIndex: 34, tags: ['économie', 'psychologie']
  },
  {
    language: 'French', cefrLevel: 'C1', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'L\'économie comportementale remet en question l\'hypothèse selon laquelle les individus prennent des décisions rationnelles pour maximiser leur utilité.',
    questionText: 'L\'économie comportementale démontre des ___ cognitifs systématiques qui conduisent à des décisions irrationnelles.',
    correctAnswer: 'biais', points: 3, orderIndex: 35, tags: ['économie']
  },

  // ============================================================
  // C2 — Maîtrise (7 questions)
  // ============================================================
  {
    language: 'French', cefrLevel: 'C2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Post-vérité et crise épistémique',
    passage: 'La prolifération de la désinformation à l\'ère numérique a précipité ce que les philosophes appellent une « crise épistémique » — une rupture fondamentale dans la capacité de la société à établir des vérités partagées. Le phénomène est exacerbé par les chambres d\'écho algorithmiques qui renforcent les croyances existantes, la marchandisation de l\'attention qui favorise le sensationnalisme au détriment de l\'exactitude, et l\'érosion de la confiance envers les autorités épistémiques traditionnelles telles que les institutions scientifiques et le journalisme de qualité. Certains chercheurs soutiennent que la notion même de vérité objective a été supplantée par un paradigme de « post-vérité » dans lequel la résonance émotionnelle et l\'affiliation tribale priment sur les preuves empiriques dans la formation du discours public.',
    questionText: 'Selon le texte, qu\'est-ce qui contribue à la « crise épistémique » ?',
    options: [
      { label: 'L\'amélioration des systèmes éducatifs', value: 'amélioration de l\'éducation' },
      { label: 'Les chambres d\'écho algorithmiques, la marchandisation de l\'attention et l\'érosion de la confiance', value: 'chambres d\'écho, marchandisation de l\'attention, érosion de la confiance' },
      { label: 'L\'augmentation du financement de la recherche scientifique', value: 'augmentation du financement' },
      { label: 'Un meilleur accès à l\'information', value: 'meilleur accès à l\'information' }
    ],
    correctAnswer: 'chambres d\'écho, marchandisation de l\'attention, érosion de la confiance', points: 3, orderIndex: 36, tags: ['philosophie', 'médias']
  },
  {
    language: 'French', cefrLevel: 'C2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Post-vérité et crise épistémique',
    passage: 'Certains chercheurs soutiennent que la notion même de vérité objective a été supplantée par un paradigme de « post-vérité » dans lequel la résonance émotionnelle et l\'affiliation tribale priment sur les preuves empiriques dans la formation du discours public.',
    questionText: 'Que signifie « supplantée » dans ce contexte ?',
    options: [
      { label: 'Soutenue', value: 'soutenue' },
      { label: 'Remplacée', value: 'remplacée' },
      { label: 'Questionnée', value: 'questionnée' },
      { label: 'Améliorée', value: 'améliorée' }
    ],
    correctAnswer: 'remplacée', points: 3, orderIndex: 37, tags: ['vocabulaire']
  },
  {
    language: 'French', cefrLevel: 'C2', questionType: 'READING', skill: 'READING',
    passageTitle: 'La conscience quantique',
    passage: 'La théorie de la Réduction Objective Orchestrée (Orch-OR), proposée par le physicien Roger Penrose et l\'anesthésiste Stuart Hameroff, postule que la conscience émerge de calculs quantiques au sein des microtubules à l\'intérieur des neurones. Cette hypothèse controversée suggère que le cerveau n\'est pas simplement un ordinateur classique mais fonctionne à un niveau fondamentalement quantique. Les critiques soutiennent que l\'environnement chaud et humide du cerveau provoquerait une décohérence quantique bien trop rapide pour que de tels processus soient biologiquement pertinents. Néanmoins, des expériences récentes détectant des effets quantiques dans des systèmes biologiques — comme la photosynthèse et la navigation aviaire — ont donné une certaine crédibilité à l\'idée plus large que la mécanique quantique pourrait jouer un rôle dans les processus biologiques.',
    questionText: 'Quelle est la principale critique de la théorie Orch-OR ?',
    options: [
      { label: 'Elle manque de fondements mathématiques', value: 'manque de fondements mathématiques' },
      { label: 'La décohérence quantique serait trop rapide dans le cerveau', value: 'décohérence trop rapide' },
      { label: 'Penrose n\'est pas neuroscientifique', value: 'pas neuroscientifique' },
      { label: 'Les microtubules n\'existent pas dans les neurones', value: 'les microtubules n\'existent pas' }
    ],
    correctAnswer: 'décohérence trop rapide', points: 3, orderIndex: 38, tags: ['science', 'philosophie']
  },
  {
    language: 'French', cefrLevel: 'C2', questionType: 'READING', skill: 'READING',
    passageTitle: 'La conscience quantique',
    passage: 'Des expériences récentes détectant des effets quantiques dans des systèmes biologiques — comme la photosynthèse et la navigation aviaire — ont donné une certaine crédibilité à l\'idée plus large que la mécanique quantique pourrait jouer un rôle dans les processus biologiques.',
    questionText: 'Quels processus biologiques ont montré des preuves d\'effets quantiques ?',
    options: [
      { label: 'La digestion et la respiration', value: 'la digestion et la respiration' },
      { label: 'La photosynthèse et la navigation aviaire', value: 'la photosynthèse et la navigation aviaire' },
      { label: 'La circulation sanguine et la réponse immunitaire', value: 'la circulation sanguine et la réponse immunitaire' },
      { label: 'La division cellulaire et la synthèse des protéines', value: 'la division cellulaire et la synthèse des protéines' }
    ],
    correctAnswer: 'la photosynthèse et la navigation aviaire', points: 3, orderIndex: 39, tags: ['science']
  },
  {
    language: 'French', cefrLevel: 'C2', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'La théorie Orch-OR postule que la conscience émerge de calculs quantiques au sein des microtubules à l\'intérieur des neurones.',
    questionText: 'La théorie Orch-OR suggère que la conscience émerge de calculs quantiques au sein des ___.',
    correctAnswer: 'microtubules', points: 3, orderIndex: 40, tags: ['science']
  },
  {
    language: 'French', cefrLevel: 'C2', questionType: 'READING', skill: 'READING',
    passageTitle: 'La relativité linguistique revisitée',
    passage: 'Le peuple Kuuk Thaayorre de la péninsule du cap York, en Australie, utilise les directions cardinales plutôt que des termes spatiaux égocentriques. Au lieu de dire « la tasse est à ta gauche », ils diraient « la tasse est au nord-nord-est ». De manière remarquable, cette pratique linguistique est corrélée à une capacité exceptionnelle d\'orientation spatiale — les locuteurs du Kuuk Thaayorre maintiennent une boussole interne précise en permanence, un exploit que les locuteurs de langues utilisant des systèmes spatiaux égocentriques trouvent extraordinairement difficile à reproduire.',
    questionText: 'Qu\'est-ce qui rend le système spatial des Kuuk Thaayorre unique ?',
    options: [
      { label: 'Ils utilisent gauche et droite plus précisément', value: 'gauche et droite' },
      { label: 'Ils utilisent les directions cardinales au lieu de termes relatifs comme gauche/droite', value: 'directions cardinales au lieu d\'égocentriques' },
      { label: 'Ils n\'ont pas de mots pour les directions', value: 'pas de mots pour les directions' },
      { label: 'Ils utilisent uniquement des gestes pour les directions', value: 'uniquement des gestes' }
    ],
    correctAnswer: 'directions cardinales au lieu d\'égocentriques', points: 3, orderIndex: 41, tags: ['linguistique', 'culture']
  },
  {
    language: 'French', cefrLevel: 'C2', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'Le peuple Kuuk Thaayorre utilise les directions cardinales plutôt que des termes spatiaux égocentriques.',
    questionText: 'Les Kuuk Thaayorre utilisent les directions ___ plutôt que des termes spatiaux égocentriques.',
    correctAnswer: 'cardinales', points: 3, orderIndex: 42, tags: ['linguistique']
  }
]
