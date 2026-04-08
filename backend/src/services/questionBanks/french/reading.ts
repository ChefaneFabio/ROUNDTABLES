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
  },

  // ============================================================
  // ADDITIONAL QUESTIONS — 40 more (orderIndex 43–82)
  // ============================================================

  // ---- A1 — Débutant (7 questions) ----
  {
    language: 'French', cefrLevel: 'A1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Le menu du café',
    passage: 'Café : 2 euros. Thé : 2 euros. Jus d\'orange : 3 euros. Croissant : 1 euro. Sandwich jambon-fromage : 5 euros. Salade : 4 euros.',
    questionText: 'Combien coûte un jus d\'orange ?',
    options: [{ label: '2 euros', value: '2 euros' }, { label: '3 euros', value: '3 euros' }, { label: '4 euros', value: '4 euros' }, { label: '5 euros', value: '5 euros' }],
    correctAnswer: '3 euros', points: 1, orderIndex: 43, tags: ['nourriture', 'nombres']
  },
  {
    language: 'French', cefrLevel: 'A1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Le menu du café',
    passage: 'Café : 2 euros. Thé : 2 euros. Jus d\'orange : 3 euros. Croissant : 1 euro. Sandwich jambon-fromage : 5 euros. Salade : 4 euros.',
    questionText: 'Quel est le produit le moins cher ?',
    options: [{ label: 'Le café', value: 'le café' }, { label: 'Le croissant', value: 'le croissant' }, { label: 'La salade', value: 'la salade' }, { label: 'Le thé', value: 'le thé' }],
    correctAnswer: 'le croissant', points: 1, orderIndex: 44, tags: ['nourriture', 'nombres']
  },
  {
    language: 'French', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'READING',
    passageTitle: 'Panneau à la gare',
    passage: 'Train pour Lyon : départ 10h15, quai 3. Train pour Marseille : départ 11h00, quai 7. Train pour Bordeaux : départ 12h30, quai 5. Attention : le train pour Nice est annulé.',
    questionText: 'À quelle heure part le train pour Marseille ?',
    options: [{ label: '10h15', value: '10h15' }, { label: '11h00', value: '11h00' }, { label: '12h30', value: '12h30' }, { label: '13h00', value: '13h00' }],
    correctAnswer: '11h00', points: 1, orderIndex: 45, tags: ['transport', 'heure']
  },
  {
    language: 'French', cefrLevel: 'A1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Panneau à la gare',
    passage: 'Train pour Lyon : départ 10h15, quai 3. Train pour Marseille : départ 11h00, quai 7. Train pour Bordeaux : départ 12h30, quai 5. Attention : le train pour Nice est annulé.',
    questionText: 'Quel train est annulé ?',
    options: [{ label: 'Le train pour Lyon', value: 'le train pour Lyon' }, { label: 'Le train pour Bordeaux', value: 'le train pour Bordeaux' }, { label: 'Le train pour Nice', value: 'le train pour Nice' }, { label: 'Le train pour Marseille', value: 'le train pour Marseille' }],
    correctAnswer: 'le train pour Nice', points: 1, orderIndex: 46, tags: ['transport']
  },
  {
    language: 'French', cefrLevel: 'A1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Ma chambre',
    passage: 'Ma chambre est petite mais jolie. Il y a un lit, une table et une chaise. Sur la table, il y a un ordinateur. Les murs sont bleus. La fenêtre est grande. J\'aime ma chambre.',
    questionText: 'De quelle couleur sont les murs ?',
    options: [{ label: 'Blancs', value: 'blancs' }, { label: 'Bleus', value: 'bleus' }, { label: 'Verts', value: 'verts' }, { label: 'Jaunes', value: 'jaunes' }],
    correctAnswer: 'bleus', points: 1, orderIndex: 47, tags: ['maison', 'couleurs']
  },
  {
    language: 'French', cefrLevel: 'A1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Ma chambre',
    passage: 'Ma chambre est petite mais jolie. Il y a un lit, une table et une chaise. Sur la table, il y a un ordinateur. Les murs sont bleus. La fenêtre est grande. J\'aime ma chambre.',
    questionText: 'Qu\'est-ce qu\'il y a sur la table ?',
    options: [{ label: 'Un livre', value: 'un livre' }, { label: 'Un ordinateur', value: 'un ordinateur' }, { label: 'Un téléphone', value: 'un téléphone' }, { label: 'Une lampe', value: 'une lampe' }],
    correctAnswer: 'un ordinateur', points: 1, orderIndex: 48, tags: ['maison', 'objets']
  },
  {
    language: 'French', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'READING',
    passageTitle: 'Un message',
    passage: 'Bonjour Paul, je suis malade aujourd\'hui. Je ne vais pas au bureau. Peux-tu envoyer le rapport au client ? Merci. À demain. Julie.',
    questionText: 'Pourquoi Julie n\'est pas au bureau ?',
    options: [{ label: 'Elle est en vacances', value: 'elle est en vacances' }, { label: 'Elle est malade', value: 'elle est malade' }, { label: 'Elle est en retard', value: 'elle est en retard' }, { label: 'Elle est en réunion', value: 'elle est en réunion' }],
    correctAnswer: 'elle est malade', points: 1, orderIndex: 49, tags: ['communication', 'santé']
  },

  // ---- A2 — Élémentaire (7 questions) ----
  {
    language: 'French', cefrLevel: 'A2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Annonce de location',
    passage: 'À louer : appartement 3 pièces au centre-ville. Deuxième étage avec ascenseur. Cuisine équipée, salle de bain moderne. Proche des commerces et du métro. Loyer : 850 euros par mois, charges comprises. Animaux acceptés. Disponible à partir du 1er mars. Contacter M. Dupont au 06 12 34 56 78.',
    questionText: 'Combien coûte le loyer par mois ?',
    options: [{ label: '750 euros', value: '750 euros' }, { label: '800 euros', value: '800 euros' }, { label: '850 euros', value: '850 euros' }, { label: '900 euros', value: '900 euros' }],
    correctAnswer: '850 euros', points: 1, orderIndex: 50, tags: ['logement', 'nombres']
  },
  {
    language: 'French', cefrLevel: 'A2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Annonce de location',
    passage: 'À louer : appartement 3 pièces au centre-ville. Deuxième étage avec ascenseur. Cuisine équipée, salle de bain moderne. Proche des commerces et du métro. Loyer : 850 euros par mois, charges comprises. Animaux acceptés. Disponible à partir du 1er mars. Contacter M. Dupont au 06 12 34 56 78.',
    questionText: 'Est-ce qu\'on peut avoir un animal dans cet appartement ?',
    options: [{ label: 'Oui, les animaux sont acceptés', value: 'oui' }, { label: 'Non, les animaux sont interdits', value: 'non' }, { label: 'Seulement les chats', value: 'seulement les chats' }, { label: 'Ce n\'est pas mentionné', value: 'pas mentionné' }],
    correctAnswer: 'oui', points: 1, orderIndex: 51, tags: ['logement']
  },
  {
    language: 'French', cefrLevel: 'A2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Programme du week-end',
    passage: 'Samedi matin : marché de la place Saint-Pierre de 8h à 13h. Samedi après-midi : match de football au stade municipal à 15h. Dimanche matin : randonnée en forêt, départ à 9h devant la mairie. Dimanche soir : concert gratuit au parc central à 20h. Inscription obligatoire pour la randonnée.',
    questionText: 'Quelle activité nécessite une inscription ?',
    options: [{ label: 'Le marché', value: 'le marché' }, { label: 'Le match de football', value: 'le match de football' }, { label: 'La randonnée', value: 'la randonnée' }, { label: 'Le concert', value: 'le concert' }],
    correctAnswer: 'la randonnée', points: 1, orderIndex: 52, tags: ['loisirs', 'planification']
  },
  {
    language: 'French', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'READING',
    passageTitle: 'Programme du week-end',
    passage: 'Samedi matin : marché de la place Saint-Pierre de 8h à 13h. Samedi après-midi : match de football au stade municipal à 15h. Dimanche matin : randonnée en forêt, départ à 9h devant la mairie. Dimanche soir : concert gratuit au parc central à 20h. Inscription obligatoire pour la randonnée.',
    questionText: 'À quelle heure est le concert ?',
    options: [{ label: '15h', value: '15h' }, { label: '18h', value: '18h' }, { label: '20h', value: '20h' }, { label: '21h', value: '21h' }],
    correctAnswer: '20h', points: 1, orderIndex: 53, tags: ['loisirs', 'heure']
  },
  {
    language: 'French', cefrLevel: 'A2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Carte postale de vacances',
    passage: 'Cher Antoine, je suis en Bretagne avec ma famille. Nous sommes arrivés lundi. L\'hôtel est très confortable et la plage est à cinq minutes à pied. Hier, nous avons visité un vieux château. La nourriture est délicieuse, surtout les crêpes ! Il pleut un peu mais nous nous amusons bien. On rentre dimanche. Bisous, Claire.',
    questionText: 'Où est Claire en vacances ?',
    options: [{ label: 'En Provence', value: 'en Provence' }, { label: 'En Bretagne', value: 'en Bretagne' }, { label: 'En Normandie', value: 'en Normandie' }, { label: 'En Alsace', value: 'en Alsace' }],
    correctAnswer: 'en Bretagne', points: 1, orderIndex: 54, tags: ['voyage', 'correspondance']
  },
  {
    language: 'French', cefrLevel: 'A2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Carte postale de vacances',
    passage: 'Cher Antoine, je suis en Bretagne avec ma famille. Nous sommes arrivés lundi. L\'hôtel est très confortable et la plage est à cinq minutes à pied. Hier, nous avons visité un vieux château. La nourriture est délicieuse, surtout les crêpes ! Il pleut un peu mais nous nous amusons bien. On rentre dimanche. Bisous, Claire.',
    questionText: 'Quelle spécialité culinaire Claire mentionne-t-elle ?',
    options: [{ label: 'Les galettes', value: 'les galettes' }, { label: 'Les crêpes', value: 'les crêpes' }, { label: 'Les croissants', value: 'les croissants' }, { label: 'Le fromage', value: 'le fromage' }],
    correctAnswer: 'les crêpes', points: 1, orderIndex: 55, tags: ['voyage', 'nourriture']
  },
  {
    language: 'French', cefrLevel: 'A2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Horaires de la bibliothèque',
    passage: 'La bibliothèque municipale est ouverte du mardi au samedi. Horaires : mardi à vendredi de 9h à 18h, samedi de 10h à 16h. Fermée le dimanche et le lundi. Prêt de livres gratuit avec la carte de la bibliothèque. Maximum 5 livres pour 3 semaines. Section enfants au rez-de-chaussée, section adultes au premier étage.',
    questionText: 'Combien de livres peut-on emprunter au maximum ?',
    options: [{ label: '3 livres', value: '3 livres' }, { label: '4 livres', value: '4 livres' }, { label: '5 livres', value: '5 livres' }, { label: '10 livres', value: '10 livres' }],
    correctAnswer: '5 livres', points: 1, orderIndex: 56, tags: ['lieux', 'services']
  },

  // ---- B1 — Intermédiaire (7 questions) ----
  {
    language: 'French', cefrLevel: 'B1', questionType: 'READING', skill: 'READING',
    passageTitle: 'La cuisine française en évolution',
    passage: 'La cuisine française, longtemps considérée comme la référence mondiale de la gastronomie, connaît une transformation importante. Les jeunes chefs s\'inspirent de plus en plus des cuisines du monde entier, intégrant des saveurs asiatiques, africaines et sud-américaines dans leurs plats. Parallèlement, le mouvement « locavore » encourage l\'utilisation de produits locaux et de saison. Les restaurants étoilés proposent désormais des menus végétariens, ce qui aurait été impensable il y a vingt ans.',
    questionText: 'Comment la cuisine française évolue-t-elle selon le texte ?',
    options: [
      { label: 'Elle devient plus traditionnelle', value: 'elle devient plus traditionnelle' },
      { label: 'Elle s\'ouvre aux influences internationales et aux tendances modernes', value: 'elle s\'ouvre aux influences internationales' },
      { label: 'Elle perd en qualité', value: 'elle perd en qualité' },
      { label: 'Elle se concentre uniquement sur la viande', value: 'elle se concentre sur la viande' }
    ],
    correctAnswer: 'elle s\'ouvre aux influences internationales', points: 1, orderIndex: 57, tags: ['gastronomie', 'culture']
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'READING', skill: 'READING',
    passageTitle: 'La cuisine française en évolution',
    passage: 'La cuisine française, longtemps considérée comme la référence mondiale de la gastronomie, connaît une transformation importante. Les jeunes chefs s\'inspirent de plus en plus des cuisines du monde entier, intégrant des saveurs asiatiques, africaines et sud-américaines dans leurs plats. Parallèlement, le mouvement « locavore » encourage l\'utilisation de produits locaux et de saison. Les restaurants étoilés proposent désormais des menus végétariens, ce qui aurait été impensable il y a vingt ans.',
    questionText: 'Qu\'est-ce que le mouvement « locavore » encourage ?',
    options: [
      { label: 'L\'importation de produits exotiques', value: 'l\'importation de produits exotiques' },
      { label: 'L\'utilisation de produits locaux et de saison', value: 'l\'utilisation de produits locaux et de saison' },
      { label: 'La restauration rapide', value: 'la restauration rapide' },
      { label: 'Les repas surgelés', value: 'les repas surgelés' }
    ],
    correctAnswer: 'l\'utilisation de produits locaux et de saison', points: 1, orderIndex: 58, tags: ['gastronomie', 'environnement']
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Lettre au directeur',
    passage: 'Monsieur le Directeur, je vous écris pour exprimer mon inquiétude concernant la fermeture prévue de la piscine municipale. Cette installation est utilisée quotidiennement par des centaines de personnes, notamment des enfants qui apprennent à nager et des personnes âgées qui font de l\'aquagym. La piscine est le seul équipement sportif accessible à tous dans notre quartier. Sa fermeture obligerait beaucoup de familles à se déplacer en voiture vers la ville voisine. Je vous prie de reconsidérer cette décision.',
    questionText: 'Pourquoi l\'auteur écrit-il cette lettre ?',
    options: [
      { label: 'Pour remercier le directeur', value: 'pour remercier le directeur' },
      { label: 'Pour protester contre la fermeture de la piscine', value: 'pour protester contre la fermeture de la piscine' },
      { label: 'Pour demander un emploi', value: 'pour demander un emploi' },
      { label: 'Pour proposer la construction d\'une piscine', value: 'pour proposer la construction' }
    ],
    correctAnswer: 'pour protester contre la fermeture de la piscine', points: 1, orderIndex: 59, tags: ['communication', 'société']
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Lettre au directeur',
    passage: 'Monsieur le Directeur, je vous écris pour exprimer mon inquiétude concernant la fermeture prévue de la piscine municipale. Cette installation est utilisée quotidiennement par des centaines de personnes, notamment des enfants qui apprennent à nager et des personnes âgées qui font de l\'aquagym. La piscine est le seul équipement sportif accessible à tous dans notre quartier. Sa fermeture obligerait beaucoup de familles à se déplacer en voiture vers la ville voisine.',
    questionText: 'Quels groupes de personnes utilisent la piscine ?',
    options: [
      { label: 'Uniquement des sportifs professionnels', value: 'des sportifs professionnels' },
      { label: 'Des enfants et des personnes âgées entre autres', value: 'des enfants et des personnes âgées' },
      { label: 'Seulement des adultes', value: 'seulement des adultes' },
      { label: 'Des touristes', value: 'des touristes' }
    ],
    correctAnswer: 'des enfants et des personnes âgées', points: 1, orderIndex: 60, tags: ['société', 'sport']
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Les transports en commun',
    passage: 'La ville de Strasbourg est souvent citée comme un exemple réussi de politique de transports en commun. Depuis l\'introduction du tramway en 1994, le nombre de voitures dans le centre-ville a diminué de 30 %. Le réseau de pistes cyclables a également été considérablement développé. Les habitants bénéficient d\'un abonnement mensuel à prix réduit qui couvre le bus, le tramway et le vélo en libre-service. Cette politique a amélioré la qualité de l\'air et rendu le centre-ville plus agréable pour les piétons.',
    questionText: 'Quel a été l\'effet du tramway sur la circulation automobile ?',
    options: [
      { label: 'Elle a augmenté de 30 %', value: 'elle a augmenté' },
      { label: 'Elle a diminué de 30 %', value: 'elle a diminué de 30 %' },
      { label: 'Elle n\'a pas changé', value: 'elle n\'a pas changé' },
      { label: 'Elle a doublé', value: 'elle a doublé' }
    ],
    correctAnswer: 'elle a diminué de 30 %', points: 1, orderIndex: 61, tags: ['transport', 'urbanisme']
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Le bénévolat chez les jeunes',
    passage: 'Une étude récente montre que de plus en plus de jeunes Français s\'engagent dans des activités bénévoles. Les associations humanitaires, environnementales et sportives sont les plus populaires. Les motivations sont variées : aider les autres, acquérir de l\'expérience professionnelle, ou simplement rencontrer des gens. Cependant, beaucoup de jeunes disent qu\'ils aimeraient faire plus de bénévolat mais qu\'ils manquent de temps à cause de leurs études ou de leur travail.',
    questionText: 'Quel est le principal obstacle au bénévolat chez les jeunes ?',
    options: [
      { label: 'Le manque d\'intérêt', value: 'le manque d\'intérêt' },
      { label: 'Le manque de temps', value: 'le manque de temps' },
      { label: 'Le manque d\'argent', value: 'le manque d\'argent' },
      { label: 'Le manque d\'associations', value: 'le manque d\'associations' }
    ],
    correctAnswer: 'le manque de temps', points: 1, orderIndex: 62, tags: ['société', 'jeunesse']
  },
  {
    language: 'French', cefrLevel: 'B1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Le bénévolat chez les jeunes',
    passage: 'Une étude récente montre que de plus en plus de jeunes Français s\'engagent dans des activités bénévoles. Les associations humanitaires, environnementales et sportives sont les plus populaires. Les motivations sont variées : aider les autres, acquérir de l\'expérience professionnelle, ou simplement rencontrer des gens.',
    questionText: 'Quels types d\'associations attirent le plus les jeunes ?',
    options: [
      { label: 'Politiques et religieuses', value: 'politiques et religieuses' },
      { label: 'Humanitaires, environnementales et sportives', value: 'humanitaires, environnementales et sportives' },
      { label: 'Culturelles et artistiques', value: 'culturelles et artistiques' },
      { label: 'Financières et commerciales', value: 'financières et commerciales' }
    ],
    correctAnswer: 'humanitaires, environnementales et sportives', points: 1, orderIndex: 63, tags: ['société', 'jeunesse']
  },

  // ---- B2 — Intermédiaire supérieur (7 questions) ----
  {
    language: 'French', cefrLevel: 'B2', questionType: 'READING', skill: 'READING',
    passageTitle: 'La déconnexion numérique',
    passage: 'Face à l\'omniprésence des écrans dans notre quotidien, un nombre croissant de personnes choisissent de pratiquer la « déconnexion numérique ». Cette tendance consiste à s\'éloigner volontairement des appareils connectés pendant une période déterminée. Des études en psychologie ont montré que l\'utilisation excessive des réseaux sociaux peut entraîner des troubles de l\'anxiété, une baisse de l\'estime de soi et des difficultés de concentration. Certaines entreprises françaises ont d\'ailleurs instauré un « droit à la déconnexion » pour leurs employés, leur interdisant d\'envoyer ou de recevoir des courriels professionnels en dehors des heures de travail.',
    questionText: 'Qu\'est-ce que le « droit à la déconnexion » permet aux employés ?',
    options: [
      { label: 'De travailler uniquement de chez eux', value: 'travailler de chez eux' },
      { label: 'De ne pas être contactés par courriel en dehors des heures de travail', value: 'ne pas être contactés en dehors des heures de travail' },
      { label: 'D\'utiliser les réseaux sociaux au bureau', value: 'utiliser les réseaux sociaux au bureau' },
      { label: 'De choisir leurs horaires de travail', value: 'choisir leurs horaires' }
    ],
    correctAnswer: 'ne pas être contactés en dehors des heures de travail', points: 2, orderIndex: 64, tags: ['technologie', 'travail']
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'READING', skill: 'READING',
    passageTitle: 'La déconnexion numérique',
    passage: 'Face à l\'omniprésence des écrans dans notre quotidien, un nombre croissant de personnes choisissent de pratiquer la « déconnexion numérique ». Cette tendance consiste à s\'éloigner volontairement des appareils connectés pendant une période déterminée. Des études en psychologie ont montré que l\'utilisation excessive des réseaux sociaux peut entraîner des troubles de l\'anxiété, une baisse de l\'estime de soi et des difficultés de concentration.',
    questionText: 'Quels effets négatifs des réseaux sociaux sont mentionnés ?',
    options: [
      { label: 'Perte de poids et insomnie', value: 'perte de poids et insomnie' },
      { label: 'Anxiété, baisse de l\'estime de soi et difficultés de concentration', value: 'anxiété, estime de soi, concentration' },
      { label: 'Problèmes de vue et maux de dos', value: 'problèmes de vue et maux de dos' },
      { label: 'Isolement social et dépression', value: 'isolement et dépression' }
    ],
    correctAnswer: 'anxiété, estime de soi, concentration', points: 2, orderIndex: 65, tags: ['technologie', 'santé']
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Le patrimoine industriel',
    passage: 'La reconversion des sites industriels abandonnés en espaces culturels est devenue un phénomène majeur dans de nombreuses villes européennes. D\'anciennes usines sont transformées en musées, galeries d\'art ou salles de spectacle. Ce mouvement répond à un double objectif : préserver la mémoire ouvrière et revitaliser des quartiers en déclin. Le Lieu Unique à Nantes, installé dans une ancienne biscuiterie, illustre parfaitement cette tendance. Toutefois, certains critiques dénoncent un processus de gentrification qui chasse les habitants les plus modestes de ces quartiers rénovés.',
    questionText: 'Quelle critique est formulée contre la reconversion des sites industriels ?',
    options: [
      { label: 'Les bâtiments sont trop vieux', value: 'bâtiments trop vieux' },
      { label: 'Elle entraîne une gentrification qui déplace les habitants modestes', value: 'gentrification et déplacement des habitants' },
      { label: 'Les musées ne sont pas rentables', value: 'musées pas rentables' },
      { label: 'Les ouvriers perdent leur emploi', value: 'ouvriers perdent leur emploi' }
    ],
    correctAnswer: 'gentrification et déplacement des habitants', points: 2, orderIndex: 66, tags: ['urbanisme', 'culture']
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Le patrimoine industriel',
    passage: 'La reconversion des sites industriels abandonnés en espaces culturels est devenue un phénomène majeur dans de nombreuses villes européennes. D\'anciennes usines sont transformées en musées, galeries d\'art ou salles de spectacle. Ce mouvement répond à un double objectif : préserver la mémoire ouvrière et revitaliser des quartiers en déclin. Le Lieu Unique à Nantes, installé dans une ancienne biscuiterie, illustre parfaitement cette tendance.',
    questionText: 'Quels sont les deux objectifs de la reconversion des sites industriels ?',
    options: [
      { label: 'Créer des emplois et attirer des touristes', value: 'emplois et touristes' },
      { label: 'Préserver la mémoire ouvrière et revitaliser les quartiers', value: 'préserver la mémoire et revitaliser les quartiers' },
      { label: 'Construire des logements et des bureaux', value: 'logements et bureaux' },
      { label: 'Protéger l\'environnement et réduire la pollution', value: 'environnement et pollution' }
    ],
    correctAnswer: 'préserver la mémoire et revitaliser les quartiers', points: 2, orderIndex: 67, tags: ['urbanisme', 'société']
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'READING', skill: 'READING',
    passageTitle: 'L\'éducation bilingue',
    passage: 'Les recherches en neurolinguistique ont démontré que le bilinguisme offre des avantages cognitifs significatifs au-delà de la simple maîtrise de deux langues. Les personnes bilingues font preuve d\'une meilleure flexibilité mentale, d\'une capacité accrue de résolution de problèmes et d\'une plus grande résistance au déclin cognitif lié à l\'âge. Cependant, les programmes d\'éducation bilingue restent controversés dans certains pays. Les opposants craignent que l\'apprentissage simultané de deux langues ne retarde le développement linguistique de l\'enfant, bien que cette hypothèse ait été largement réfutée par la recherche scientifique.',
    questionText: 'Selon la recherche, que se passe-t-il quand un enfant apprend deux langues simultanément ?',
    options: [
      { label: 'Son développement linguistique est retardé', value: 'développement retardé' },
      { label: 'Il développe des avantages cognitifs, contrairement aux craintes', value: 'avantages cognitifs, craintes réfutées' },
      { label: 'Il oublie sa langue maternelle', value: 'oublie la langue maternelle' },
      { label: 'Il a des difficultés scolaires', value: 'difficultés scolaires' }
    ],
    correctAnswer: 'avantages cognitifs, craintes réfutées', points: 2, orderIndex: 68, tags: ['éducation', 'linguistique']
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Le commerce équitable',
    passage: 'Le commerce équitable vise à garantir une rémunération juste aux producteurs des pays en développement tout en promouvant des pratiques durables. En France, le marché du commerce équitable a connu une croissance annuelle de 22 % ces dernières années, le café et le chocolat restant les produits les plus vendus. Pourtant, des voix critiques s\'élèvent. Certains économistes soutiennent que le système crée des distorsions de marché et que seule une faible proportion du prix final revient effectivement aux producteurs. D\'autres estiment que le label « équitable » est devenu un outil marketing plus qu\'un véritable engagement éthique.',
    questionText: 'Quelle critique les économistes formulent-ils contre le commerce équitable ?',
    options: [
      { label: 'Les produits sont de mauvaise qualité', value: 'mauvaise qualité' },
      { label: 'Il crée des distorsions de marché et peu de profit revient aux producteurs', value: 'distorsions de marché et faible retour aux producteurs' },
      { label: 'Il est trop cher pour les consommateurs', value: 'trop cher' },
      { label: 'Il ne concerne pas assez de pays', value: 'pas assez de pays' }
    ],
    correctAnswer: 'distorsions de marché et faible retour aux producteurs', points: 2, orderIndex: 69, tags: ['économie', 'éthique']
  },
  {
    language: 'French', cefrLevel: 'B2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Le commerce équitable',
    passage: 'Le commerce équitable vise à garantir une rémunération juste aux producteurs des pays en développement tout en promouvant des pratiques durables. En France, le marché du commerce équitable a connu une croissance annuelle de 22 % ces dernières années, le café et le chocolat restant les produits les plus vendus.',
    questionText: 'Quels sont les deux produits équitables les plus vendus en France ?',
    options: [
      { label: 'Le thé et le sucre', value: 'le thé et le sucre' },
      { label: 'Le café et le chocolat', value: 'le café et le chocolat' },
      { label: 'Les bananes et le riz', value: 'les bananes et le riz' },
      { label: 'Le coton et le cacao', value: 'le coton et le cacao' }
    ],
    correctAnswer: 'le café et le chocolat', points: 2, orderIndex: 70, tags: ['économie', 'consommation']
  },

  // ---- C1 — Avancé (6 questions) ----
  {
    language: 'French', cefrLevel: 'C1', questionType: 'READING', skill: 'READING',
    passageTitle: 'La mémoire collective',
    passage: 'Le sociologue Maurice Halbwachs a développé le concept de « mémoire collective » pour désigner la manière dont les groupes sociaux construisent et entretiennent un souvenir partagé du passé. Selon Halbwachs, la mémoire individuelle est toujours socialement encadrée : nous nous souvenons en fonction des cadres fournis par nos appartenances familiales, religieuses et nationales. Cette théorie a profondément influencé les études sur la commémoration et le rapport des sociétés à leur histoire. Pierre Nora a prolongé cette réflexion avec son concept de « lieux de mémoire », montrant comment certains espaces, symboles et rituels cristallisent l\'identité nationale.',
    questionText: 'Quelle est la thèse centrale de Halbwachs sur la mémoire ?',
    options: [
      { label: 'La mémoire est purement biologique', value: 'mémoire biologique' },
      { label: 'La mémoire individuelle est toujours socialement encadrée', value: 'mémoire socialement encadrée' },
      { label: 'Les sociétés n\'ont pas de mémoire', value: 'pas de mémoire' },
      { label: 'La mémoire collective est identique à l\'histoire officielle', value: 'identique à l\'histoire officielle' }
    ],
    correctAnswer: 'mémoire socialement encadrée', points: 2, orderIndex: 71, tags: ['sociologie', 'philosophie']
  },
  {
    language: 'French', cefrLevel: 'C1', questionType: 'READING', skill: 'READING',
    passageTitle: 'La mémoire collective',
    passage: 'Pierre Nora a prolongé cette réflexion avec son concept de « lieux de mémoire », montrant comment certains espaces, symboles et rituels cristallisent l\'identité nationale. Le sociologue Maurice Halbwachs a développé le concept de « mémoire collective » pour désigner la manière dont les groupes sociaux construisent et entretiennent un souvenir partagé du passé.',
    questionText: 'Que sont les « lieux de mémoire » selon Pierre Nora ?',
    options: [
      { label: 'Des bibliothèques et des archives', value: 'bibliothèques et archives' },
      { label: 'Des espaces, symboles et rituels qui cristallisent l\'identité nationale', value: 'espaces, symboles et rituels identitaires' },
      { label: 'Des monuments historiques classés', value: 'monuments classés' },
      { label: 'Des musées nationaux', value: 'musées nationaux' }
    ],
    correctAnswer: 'espaces, symboles et rituels identitaires', points: 2, orderIndex: 72, tags: ['sociologie', 'histoire']
  },
  {
    language: 'French', cefrLevel: 'C1', questionType: 'READING', skill: 'READING',
    passageTitle: 'L\'obsolescence programmée',
    passage: 'L\'obsolescence programmée désigne la stratégie par laquelle un fabricant conçoit délibérément un produit dont la durée de vie est limitée afin de stimuler le renouvellement des achats. Ce phénomène, documenté dès les années 1930 avec le cartel Phoebus qui limita volontairement la durée de vie des ampoules électriques, suscite aujourd\'hui un débat d\'une acuité particulière dans le contexte de la crise environnementale. La France est devenue en 2015 le premier pays au monde à criminaliser l\'obsolescence programmée, la rendant passible de deux ans d\'emprisonnement et de 300 000 euros d\'amende. Néanmoins, les poursuites judiciaires restent rares en raison de la difficulté à prouver l\'intention délibérée du fabricant.',
    questionText: 'Pourquoi les poursuites judiciaires contre l\'obsolescence programmée sont-elles rares en France ?',
    options: [
      { label: 'La loi n\'existe pas encore', value: 'loi inexistante' },
      { label: 'Il est difficile de prouver l\'intention délibérée du fabricant', value: 'difficulté de prouver l\'intention' },
      { label: 'Les amendes sont trop faibles', value: 'amendes trop faibles' },
      { label: 'Les consommateurs ne portent pas plainte', value: 'pas de plaintes' }
    ],
    correctAnswer: 'difficulté de prouver l\'intention', points: 2, orderIndex: 73, tags: ['économie', 'droit']
  },
  {
    language: 'French', cefrLevel: 'C1', questionType: 'READING', skill: 'READING',
    passageTitle: 'L\'obsolescence programmée',
    passage: 'L\'obsolescence programmée désigne la stratégie par laquelle un fabricant conçoit délibérément un produit dont la durée de vie est limitée afin de stimuler le renouvellement des achats. Ce phénomène, documenté dès les années 1930 avec le cartel Phoebus qui limita volontairement la durée de vie des ampoules électriques, suscite aujourd\'hui un débat d\'une acuité particulière dans le contexte de la crise environnementale.',
    questionText: 'Quel exemple historique d\'obsolescence programmée est cité ?',
    options: [
      { label: 'Les premiers téléphones portables', value: 'téléphones portables' },
      { label: 'Le cartel Phoebus et les ampoules électriques', value: 'cartel Phoebus et ampoules' },
      { label: 'Les automobiles Ford', value: 'automobiles Ford' },
      { label: 'Les premiers ordinateurs IBM', value: 'ordinateurs IBM' }
    ],
    correctAnswer: 'cartel Phoebus et ampoules', points: 2, orderIndex: 74, tags: ['histoire', 'économie']
  },
  {
    language: 'French', cefrLevel: 'C1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Le paradoxe de la tolérance',
    passage: 'Karl Popper a formulé le « paradoxe de la tolérance » dans La Société ouverte et ses ennemis en 1945 : une société infiniment tolérante sera inévitablement détruite par les intolérants si elle ne se réserve pas le droit de limiter la tolérance envers ceux qui prônent l\'intolérance. Ce paradoxe a acquis une pertinence renouvelée dans les débats contemporains sur la liberté d\'expression, la modération des contenus en ligne et la montée des mouvements extrémistes. Les philosophes politiques continuent de débattre sur les critères qui devraient déterminer où tracer la frontière entre expression protégée et discours intolérable.',
    questionText: 'En quoi consiste le paradoxe de la tolérance selon Popper ?',
    options: [
      { label: 'La tolérance mène toujours à la paix', value: 'tolérance mène à la paix' },
      { label: 'Une tolérance illimitée permet aux intolérants de détruire la société ouverte', value: 'tolérance illimitée détruit la société ouverte' },
      { label: 'L\'intolérance est toujours justifiable', value: 'intolérance justifiable' },
      { label: 'La tolérance et l\'intolérance sont identiques', value: 'identiques' }
    ],
    correctAnswer: 'tolérance illimitée détruit la société ouverte', points: 2, orderIndex: 75, tags: ['philosophie', 'politique']
  },
  {
    language: 'French', cefrLevel: 'C1', questionType: 'READING', skill: 'READING',
    passageTitle: 'La neuroplasticité',
    passage: 'Pendant longtemps, la neuroscience a considéré le cerveau adulte comme un organe essentiellement figé, incapable de changements structurels significatifs après l\'enfance. La découverte de la neuroplasticité a bouleversé ce paradigme en démontrant que le cerveau conserve la capacité de se réorganiser tout au long de la vie en formant de nouvelles connexions synaptiques. Cette propriété a des implications thérapeutiques considérables : la rééducation après un accident vasculaire cérébral, le traitement de certains troubles psychiatriques et même l\'apprentissage de nouvelles compétences à un âge avancé reposent sur cette capacité d\'adaptation neuronale.',
    questionText: 'Qu\'est-ce que la neuroplasticité a remis en question ?',
    options: [
      { label: 'L\'existence des neurones', value: 'existence des neurones' },
      { label: 'L\'idée que le cerveau adulte est figé et incapable de changements structurels', value: 'cerveau adulte figé' },
      { label: 'L\'importance de l\'enfance pour le développement', value: 'importance de l\'enfance' },
      { label: 'La fonction de la mémoire à court terme', value: 'mémoire à court terme' }
    ],
    correctAnswer: 'cerveau adulte figé', points: 2, orderIndex: 76, tags: ['science', 'neurosciences']
  },

  // ---- C2 — Maîtrise (6 questions) ----
  {
    language: 'French', cefrLevel: 'C2', questionType: 'READING', skill: 'READING',
    passageTitle: 'L\'absurde chez Camus',
    passage: 'Dans Le Mythe de Sisyphe, Albert Camus définit l\'absurde comme la confrontation entre l\'appel humain vers le sens et le silence déraisonnable du monde. L\'absurde naît précisément de ce divorce entre l\'homme qui interroge et l\'univers qui ne répond pas. Contrairement à une lecture superficielle qui associerait l\'absurde au nihilisme, Camus y voit une invitation à vivre pleinement : c\'est justement parce que la vie n\'a pas de sens transcendant qu\'il faut l\'embrasser dans toute son immanence. La célèbre conclusion — « il faut imaginer Sisyphe heureux » — résume cette éthique de la révolte joyeuse face à la condition humaine.',
    questionText: 'Comment Camus distingue-t-il l\'absurde du nihilisme ?',
    options: [
      { label: 'Il ne les distingue pas, ce sont des synonymes', value: 'synonymes' },
      { label: 'L\'absurde invite à vivre pleinement plutôt qu\'à renoncer au sens', value: 'vivre pleinement plutôt que renoncer' },
      { label: 'Le nihilisme est plus optimiste que l\'absurde', value: 'nihilisme plus optimiste' },
      { label: 'L\'absurde concerne uniquement la religion', value: 'concerne la religion' }
    ],
    correctAnswer: 'vivre pleinement plutôt que renoncer', points: 2, orderIndex: 77, tags: ['littérature', 'philosophie']
  },
  {
    language: 'French', cefrLevel: 'C2', questionType: 'READING', skill: 'READING',
    passageTitle: 'L\'absurde chez Camus',
    passage: 'Dans Le Mythe de Sisyphe, Albert Camus définit l\'absurde comme la confrontation entre l\'appel humain vers le sens et le silence déraisonnable du monde. L\'absurde naît précisément de ce divorce entre l\'homme qui interroge et l\'univers qui ne répond pas. La célèbre conclusion — « il faut imaginer Sisyphe heureux » — résume cette éthique de la révolte joyeuse face à la condition humaine.',
    questionText: 'Que signifie « il faut imaginer Sisyphe heureux » dans la pensée de Camus ?',
    options: [
      { label: 'Le travail répétitif rend heureux', value: 'travail répétitif' },
      { label: 'On peut trouver la joie dans l\'acceptation lucide d\'une condition sans sens transcendant', value: 'joie dans l\'acceptation lucide' },
      { label: 'Sisyphe a réussi à échapper à sa punition', value: 'échapper à la punition' },
      { label: 'Le bonheur est une illusion', value: 'bonheur illusion' }
    ],
    correctAnswer: 'joie dans l\'acceptation lucide', points: 2, orderIndex: 78, tags: ['littérature', 'philosophie']
  },
  {
    language: 'French', cefrLevel: 'C2', questionType: 'READING', skill: 'READING',
    passageTitle: 'La déconstruction derridienne',
    passage: 'Jacques Derrida a élaboré la déconstruction non pas comme une méthode d\'analyse textuelle mais comme une mise en évidence des hiérarchies implicites qui structurent la pensée occidentale. Toute opposition binaire — nature/culture, parole/écriture, présence/absence — dissimule selon Derrida une valorisation du premier terme au détriment du second. La déconstruction consiste à montrer que cette hiérarchie n\'est ni naturelle ni inévitable, puis à explorer les conséquences de son renversement. Le concept de « différance », néologisme combinant différence et report, illustre l\'impossibilité d\'un sens fixe et définitif : la signification est toujours en mouvement, toujours différée.',
    questionText: 'Que révèle la déconstruction à propos des oppositions binaires ?',
    options: [
      { label: 'Elles sont naturelles et universelles', value: 'naturelles et universelles' },
      { label: 'Elles dissimulent une hiérarchie implicite qui n\'est ni naturelle ni inévitable', value: 'hiérarchie implicite non naturelle' },
      { label: 'Elles sont inutiles à la pensée', value: 'inutiles' },
      { label: 'Elles sont le fondement de toute vérité', value: 'fondement de la vérité' }
    ],
    correctAnswer: 'hiérarchie implicite non naturelle', points: 2, orderIndex: 79, tags: ['philosophie', 'linguistique']
  },
  {
    language: 'French', cefrLevel: 'C2', questionType: 'READING', skill: 'READING',
    passageTitle: 'La déconstruction derridienne',
    passage: 'Le concept de « différance », néologisme combinant différence et report, illustre l\'impossibilité d\'un sens fixe et définitif : la signification est toujours en mouvement, toujours différée. Jacques Derrida a élaboré la déconstruction non pas comme une méthode d\'analyse textuelle mais comme une mise en évidence des hiérarchies implicites qui structurent la pensée occidentale.',
    questionText: 'Que signifie le néologisme « différance » chez Derrida ?',
    options: [
      { label: 'Une simple faute d\'orthographe de « différence »', value: 'faute d\'orthographe' },
      { label: 'Un concept combinant différence et report, montrant que le sens est toujours différé', value: 'différence et report, sens différé' },
      { label: 'Un synonyme de « contradiction »', value: 'synonyme de contradiction' },
      { label: 'Une catégorie grammaticale', value: 'catégorie grammaticale' }
    ],
    correctAnswer: 'différence et report, sens différé', points: 2, orderIndex: 80, tags: ['philosophie', 'linguistique']
  },
  {
    language: 'French', cefrLevel: 'C2', questionType: 'READING', skill: 'READING',
    passageTitle: 'L\'anthropocène et ses critiques',
    passage: 'La notion d\'anthropocène, proposée par le chimiste Paul Crutzen en 2000, désigne une nouvelle ère géologique dans laquelle l\'activité humaine est devenue la force dominante façonnant le système terrestre. Si le concept a été largement adopté dans les discours environnementaux, il fait l\'objet de critiques épistémologiques et politiques. Certains chercheurs lui reprochent de présenter « l\'humanité » comme un agent homogène, occultant les responsabilités différenciées entre pays industrialisés et pays du Sud. Des alternatives ont été proposées, comme le « capitalocène » de Jason Moore, qui situe la cause première de la crise écologique non dans l\'espèce humaine en soi mais dans les rapports de production capitalistes.',
    questionText: 'Pourquoi certains chercheurs critiquent-ils le terme « anthropocène » ?',
    options: [
      { label: 'Il n\'est pas scientifiquement fondé', value: 'pas fondé scientifiquement' },
      { label: 'Il présente l\'humanité comme un agent homogène en occultant les responsabilités différenciées', value: 'humanité homogène, responsabilités occultées' },
      { label: 'Il est trop récent pour être validé', value: 'trop récent' },
      { label: 'Il ne concerne que les pays du Sud', value: 'seulement les pays du Sud' }
    ],
    correctAnswer: 'humanité homogène, responsabilités occultées', points: 2, orderIndex: 81, tags: ['environnement', 'philosophie']
  },
  {
    language: 'French', cefrLevel: 'C2', questionType: 'READING', skill: 'READING',
    passageTitle: 'L\'anthropocène et ses critiques',
    passage: 'Des alternatives ont été proposées, comme le « capitalocène » de Jason Moore, qui situe la cause première de la crise écologique non dans l\'espèce humaine en soi mais dans les rapports de production capitalistes. La notion d\'anthropocène, proposée par le chimiste Paul Crutzen en 2000, désigne une nouvelle ère géologique dans laquelle l\'activité humaine est devenue la force dominante façonnant le système terrestre.',
    questionText: 'Que propose le concept de « capitalocène » de Jason Moore ?',
    options: [
      { label: 'Que le capitalisme est la seule solution à la crise écologique', value: 'capitalisme solution' },
      { label: 'Que la crise écologique est causée par les rapports de production capitalistes, non par l\'humanité en soi', value: 'rapports capitalistes, pas l\'humanité en soi' },
      { label: 'Que l\'ère géologique actuelle est terminée', value: 'ère terminée' },
      { label: 'Que seuls les pays capitalistes sont responsables', value: 'seuls les pays capitalistes' }
    ],
    correctAnswer: 'rapports capitalistes, pas l\'humanité en soi', points: 2, orderIndex: 82, tags: ['environnement', 'économie']
  },

  // ===== QUESTIONS PROFESSIONNELLES / MILIEU DE TRAVAIL =====

  // --- A1 : E-mail de bureau sur un changement d'horaire de réunion ---
  {
    language: 'French', cefrLevel: 'A1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Changement d\'horaire de réunion',
    passage: 'Bonjour à tous, La réunion de mercredi est maintenant à 15h00, pas à 14h00. La salle est la salle 3A. Merci d\'apporter votre ordinateur portable. Cordialement, Philippe.',
    questionText: 'À quelle heure est la réunion maintenant ?',
    options: [
      { label: '14h00', value: '14h00' },
      { label: '15h00', value: '15h00' },
      { label: '16h00', value: '16h00' },
      { label: '13h00', value: '13h00' }
    ],
    correctAnswer: '15h00', points: 1, orderIndex: 83, tags: ['e-mail professionnel', 'travail']
  },

  // --- A1 : Menu de restaurant pour un déjeuner d'affaires ---
  {
    language: 'French', cefrLevel: 'A1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Menu du déjeuner d\'affaires',
    passage: 'Menu du jour — Brasserie du Parc. Soupe du jour : Légumes — 5,00 €. Poulet grillé avec salade — 10,50 €. Pâtes aux champignons — 8,50 €. Café ou thé inclus avec chaque plat.',
    questionText: 'Combien coûte le poulet grillé avec salade ?',
    options: [
      { label: '5,00 €', value: '5,00 €' },
      { label: '8,50 €', value: '8,50 €' },
      { label: '10,50 €', value: '10,50 €' },
      { label: '12,00 €', value: '12,00 €' }
    ],
    correctAnswer: '10,50 €', points: 1, orderIndex: 84, tags: ['déjeuner d\'affaires', 'travail']
  },

  // --- A1 : Carte d'information d'hôtel ---
  {
    language: 'French', cefrLevel: 'A1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Carte d\'accueil de l\'hôtel',
    passage: 'Bienvenue à l\'Hôtel Central. Votre chambre est la 307. Le petit-déjeuner est de 7h00 à 10h00 au restaurant du rez-de-chaussée. Mot de passe Wi-Fi : CENTRAL2024. Le départ est à 11h00.',
    questionText: 'Quel est le mot de passe Wi-Fi ?',
    options: [
      { label: 'HOTEL2024', value: 'HOTEL2024' },
      { label: 'CENTRAL2024', value: 'CENTRAL2024' },
      { label: 'CHAMBRE307', value: 'CHAMBRE307' },
      { label: 'BIENVENUE', value: 'BIENVENUE' }
    ],
    correctAnswer: 'CENTRAL2024', points: 1, orderIndex: 85, tags: ['voyage d\'affaires', 'hôtel']
  },

  // --- A1 : Planning de travail simple ---
  {
    language: 'French', cefrLevel: 'A1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Planning de la semaine',
    passage: 'Planning de travail — Semaine 14. Lundi à mercredi : 9h00 – 17h00. Jeudi : Jour de repos. Vendredi : 9h00 – 13h00. Samedi et dimanche : Fermé.',
    questionText: 'Quel jour est le jour de repos ?',
    options: [
      { label: 'Lundi', value: 'Lundi' },
      { label: 'Mercredi', value: 'Mercredi' },
      { label: 'Jeudi', value: 'Jeudi' },
      { label: 'Vendredi', value: 'Vendredi' }
    ],
    correctAnswer: 'Jeudi', points: 1, orderIndex: 86, tags: ['planning', 'travail']
  },

  // --- A2 : Offre d'emploi pour un(e) réceptionniste ---
  {
    language: 'French', cefrLevel: 'A2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Offre d\'emploi',
    passage: 'Nous recherchons un(e) réceptionniste pour notre bureau à Lyon. Vous devez parler français et anglais. Les horaires sont du lundi au vendredi, de 8h30 à 17h30. Une expérience avec Microsoft Office est nécessaire. Envoyez votre CV à rh@eurotech.fr avant le 30 mars.',
    questionText: 'Quelles langues le/la réceptionniste doit-il/elle parler ?',
    options: [
      { label: 'Français et allemand', value: 'Français et allemand' },
      { label: 'Français et anglais', value: 'Français et anglais' },
      { label: 'Anglais et espagnol', value: 'Anglais et espagnol' },
      { label: 'Français et italien', value: 'Français et italien' }
    ],
    correctAnswer: 'Français et anglais', points: 1, orderIndex: 87, tags: ['offre d\'emploi', 'travail']
  },

  // --- A2 : E-mail pour décliner une invitation à une réunion ---
  {
    language: 'French', cefrLevel: 'A2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Refus de réunion',
    passage: 'Bonjour Sophie, Merci pour l\'invitation à la réunion commerciale de mardi à 10h00. Malheureusement, je ne peux pas y assister car j\'ai une visite client à ce moment-là. Pourriez-vous m\'envoyer le compte-rendu après ? Cordialement, Thomas Müller.',
    questionText: 'Pourquoi Thomas ne peut-il pas assister à la réunion ?',
    options: [
      { label: 'Il est en vacances', value: 'Il est en vacances' },
      { label: 'Il a une visite client', value: 'Il a une visite client' },
      { label: 'Il est malade', value: 'Il est malade' },
      { label: 'Il a une autre réunion avec son directeur', value: 'Il a une autre réunion avec son directeur' }
    ],
    correctAnswer: 'Il a une visite client', points: 1, orderIndex: 88, tags: ['e-mail professionnel', 'travail']
  },

  // --- A2 : Avis de fermeture du bureau ---
  {
    language: 'French', cefrLevel: 'A2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Fermeture du bureau',
    passage: 'Veuillez noter que le bureau sera fermé du 23 décembre au 2 janvier pour les fêtes. Le dernier jour de travail est le 22 décembre. Si vous avez besoin d\'aide pendant cette période, envoyez un e-mail à support@lumicorp.fr. Bonnes fêtes à tous.',
    questionText: 'Quel est le dernier jour de travail avant les fêtes ?',
    options: [
      { label: 'Le 20 décembre', value: 'Le 20 décembre' },
      { label: 'Le 22 décembre', value: 'Le 22 décembre' },
      { label: 'Le 23 décembre', value: 'Le 23 décembre' },
      { label: 'Le 2 janvier', value: 'Le 2 janvier' }
    ],
    correctAnswer: 'Le 22 décembre', points: 1, orderIndex: 89, tags: ['avis d\'entreprise', 'travail']
  },

  // --- A2 : Instructions pour la machine à café ---
  {
    language: 'French', cefrLevel: 'A2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Instructions pour la machine à café',
    passage: 'Comment utiliser la machine à café : 1. Placez votre tasse sous la buse. 2. Appuyez sur le bouton bleu pour un expresso ou le bouton vert pour un cappuccino. 3. Attendez 30 secondes. 4. Nettoyez le bac d\'égouttage à la fin de chaque jour. Si la machine affiche un voyant rouge, contactez le service technique au poste 220.',
    questionText: 'Que faut-il faire si la machine affiche un voyant rouge ?',
    options: [
      { label: 'Appuyer sur le bouton bleu', value: 'Appuyer sur le bouton bleu' },
      { label: 'Nettoyer le bac d\'égouttage', value: 'Nettoyer le bac d\'égouttage' },
      { label: 'Contacter le service technique au poste 220', value: 'Contacter le service technique au poste 220' },
      { label: 'Attendre 30 secondes', value: 'Attendre 30 secondes' }
    ],
    correctAnswer: 'Contacter le service technique au poste 220', points: 1, orderIndex: 90, tags: ['instructions bureau', 'travail']
  },

  // --- B1 : E-mail sur une prolongation de délai ---
  {
    language: 'French', cefrLevel: 'B1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Mise à jour du projet',
    passage: 'Cher(e)s collègues, Je vous informe que la date limite pour le rapport du troisième trimestre est repoussée au 15 octobre. Plusieurs membres de l\'équipe ont signalé des difficultés avec la collecte de données en raison de la migration du système la semaine dernière. Veuillez profiter de ce délai supplémentaire pour garantir l\'exactitude de vos soumissions. Pour toute question, contactez votre responsable de département. Cordialement, Claire Dubois, Cheffe de projet.',
    questionText: 'Pourquoi la date limite du rapport a-t-elle été repoussée ?',
    options: [
      { label: 'La cheffe de projet était en vacances', value: 'La cheffe de projet était en vacances' },
      { label: 'Il y a eu des difficultés de collecte de données à cause de la migration du système', value: 'Il y a eu des difficultés de collecte de données à cause de la migration du système' },
      { label: 'Le client a demandé des modifications', value: 'Le client a demandé des modifications' },
      { label: 'L\'équipe voulait plus de temps pour célébrer', value: 'L\'équipe voulait plus de temps pour célébrer' }
    ],
    correctAnswer: 'Il y a eu des difficultés de collecte de données à cause de la migration du système', points: 1, orderIndex: 91, tags: ['e-mail professionnel', 'travail']
  },

  // --- B1 : Article sur le télétravail ---
  {
    language: 'French', cefrLevel: 'B1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Télétravail ou bureau ?',
    passage: 'Une enquête récente auprès de 2 000 salariés a révélé que 65 % préfèrent un modèle hybride, combinant jours à domicile et jours au bureau. Les travailleurs ont déclaré être plus productifs chez eux grâce à moins d\'interruptions. Cependant, beaucoup ont aussi dit regretter les échanges en personne avec leurs collègues. Les entreprises expérimentent désormais des « journées de collaboration » où les équipes viennent au bureau les mêmes jours pour se réunir et planifier ensemble. Les experts estiment que la clé est la flexibilité.',
    questionText: 'Que préfèrent la majorité des salariés selon l\'enquête ?',
    options: [
      { label: 'Travailler uniquement de chez eux', value: 'Travailler uniquement de chez eux' },
      { label: 'Un modèle hybride', value: 'Un modèle hybride' },
      { label: 'Travailler uniquement au bureau', value: 'Travailler uniquement au bureau' },
      { label: 'Changer d\'emploi chaque année', value: 'Changer d\'emploi chaque année' }
    ],
    correctAnswer: 'Un modèle hybride', points: 1, orderIndex: 92, tags: ['télétravail', 'tendances']
  },

  // --- B1 : Newsletter d'entreprise sur un nouvel avantage ---
  {
    language: 'French', cefrLevel: 'B1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Nouvel avantage bien-être',
    passage: 'Nous avons le plaisir d\'annoncer un nouvel avantage bien-être pour tous les employés à temps plein à partir du 1er janvier. L\'entreprise prendra désormais en charge jusqu\'à 500 € par an pour des abonnements sportifs, des cours de yoga ou des consultations psychologiques. Pour bénéficier de cet avantage, les employés doivent soumettre leurs reçus via le portail RH dans les 30 jours suivant le paiement. Cette initiative s\'inscrit dans notre engagement en faveur du bien-être des collaborateurs.',
    questionText: 'Comment les employés peuvent-ils bénéficier du nouvel avantage ?',
    options: [
      { label: 'En demandant l\'accord de leur manager', value: 'En demandant l\'accord de leur manager' },
      { label: 'En soumettant leurs reçus via le portail RH', value: 'En soumettant leurs reçus via le portail RH' },
      { label: 'En s\'inscrivant à la salle de sport de l\'entreprise', value: 'En s\'inscrivant à la salle de sport de l\'entreprise' },
      { label: 'En participant à un atelier obligatoire', value: 'En participant à un atelier obligatoire' }
    ],
    correctAnswer: 'En soumettant leurs reçus via le portail RH', points: 1, orderIndex: 93, tags: ['avantages sociaux', 'travail']
  },

  // --- B1 : Politique de voyage d'affaires ---
  {
    language: 'French', cefrLevel: 'B1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Politique de déplacements professionnels',
    passage: 'Tout déplacement professionnel doit être approuvé par votre responsable hiérarchique au moins deux semaines avant le voyage. Les vols en classe économique doivent être réservés pour les trajets de moins de cinq heures. Les frais d\'hôtel ne doivent pas dépasser 150 € par nuit. Les employés doivent utiliser le portail de voyage de l\'entreprise pour réserver vols et hôtels. Les repas en déplacement sont remboursés jusqu\'à 45 € par jour. Tous les reçus doivent être soumis dans les 10 jours ouvrables suivant votre retour.',
    questionText: 'Quel est le montant maximum autorisé par nuit d\'hôtel ?',
    options: [
      { label: '100 €', value: '100 €' },
      { label: '120 €', value: '120 €' },
      { label: '150 €', value: '150 €' },
      { label: '200 €', value: '200 €' }
    ],
    correctAnswer: '150 €', points: 1, orderIndex: 94, tags: ['politique voyage', 'travail']
  },

  // --- B2 : Article sur les styles de leadership ---
  {
    language: 'French', cefrLevel: 'B2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Les styles de leadership dans les entreprises modernes',
    passage: 'Le modèle traditionnel de leadership autoritaire est de plus en plus remplacé par des approches collaboratives. Les leaders transformationnels, qui inspirent et motivent leurs équipes en articulant une vision convaincante, favorisent un engagement accru des employés. Le leadership serviteur, où le rôle principal du dirigeant est de soutenir le développement de ses collaborateurs, gagne en popularité dans les entreprises technologiques. Cependant, les recherches suggèrent qu\'aucun style unique n\'est universellement efficace ; les meilleurs leaders adaptent leur approche en fonction de la situation, de la maturité de l\'équipe et de la nature de la tâche. Ce concept, appelé leadership situationnel, exige intelligence émotionnelle et compréhension profonde des dynamiques d\'équipe.',
    questionText: 'Selon l\'article, que requiert le leadership situationnel ?',
    options: [
      { label: 'Un ensemble strict de règles pour chaque situation', value: 'Un ensemble strict de règles pour chaque situation' },
      { label: 'Intelligence émotionnelle et compréhension des dynamiques d\'équipe', value: 'Intelligence émotionnelle et compréhension des dynamiques d\'équipe' },
      { label: 'Une expérience uniquement dans le secteur technologique', value: 'Une expérience uniquement dans le secteur technologique' },
      { label: 'Une approche de leadership unique et constante', value: 'Une approche de leadership unique et constante' }
    ],
    correctAnswer: 'Intelligence émotionnelle et compréhension des dynamiques d\'équipe', points: 2, orderIndex: 95, tags: ['leadership', 'management']
  },

  // --- B2 : Résultats d'une enquête de satisfaction ---
  {
    language: 'French', cefrLevel: 'B2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Résultats de l\'enquête de satisfaction des employés',
    passage: 'L\'enquête annuelle de satisfaction, remplie par 87 % du personnel, révèle plusieurs tendances notables. La satisfaction globale est passée de 72 % à 78 % par rapport à l\'année dernière, principalement grâce aux améliorations de la communication managériale et des modalités de travail flexible. Cependant, les opportunités de développement de carrière restent la catégorie la moins bien notée à 58 %, de nombreux répondants exprimant leur frustration face au manque de parcours de promotion clairs. Le département RH a proposé un programme de mentorat et des ateliers trimestriels de développement de carrière. Par ailleurs, 40 % des répondants ont souligné que la répartition de la charge de travail reste inégale entre les départements.',
    questionText: 'Quel est le domaine le moins bien noté dans l\'enquête ?',
    options: [
      { label: 'La communication managériale', value: 'La communication managériale' },
      { label: 'Les modalités de travail flexible', value: 'Les modalités de travail flexible' },
      { label: 'Les opportunités de développement de carrière', value: 'Les opportunités de développement de carrière' },
      { label: 'La répartition de la charge de travail', value: 'La répartition de la charge de travail' }
    ],
    correctAnswer: 'Les opportunités de développement de carrière', points: 2, orderIndex: 96, tags: ['enquête satisfaction', 'RH']
  },

  // --- B2 : Tendances de l'équilibre vie professionnelle-vie personnelle ---
  {
    language: 'French', cefrLevel: 'B2', questionType: 'READING', skill: 'READING',
    passageTitle: 'L\'équilibre vie professionnelle-vie personnelle en Europe',
    passage: 'Une étude approfondie de la Fondation européenne pour l\'amélioration des conditions de vie et de travail a révélé des variations significatives dans l\'équilibre travail-vie personnelle à travers les États membres de l\'UE. Les pays nordiques se classent systématiquement en tête, avec des heures de travail moyennes plus courtes et des politiques de congé parental généreuses. En revanche, les pays d\'Europe du Sud affichent des heures de travail plus longues mais bénéficient de réseaux de soutien familial plus solides. L\'étude a également identifié une tendance croissante vers la semaine de quatre jours, avec des programmes pilotes en Belgique, en Espagne et au Royaume-Uni montrant des résultats prometteurs — la productivité est restée stable ou a augmenté, tandis que l\'épuisement professionnel a diminué de 30 %.',
    questionText: 'Qu\'ont montré les programmes pilotes de semaine de quatre jours ?',
    options: [
      { label: 'La productivité a baissé considérablement', value: 'La productivité a baissé considérablement' },
      { label: 'La productivité est restée stable ou a augmenté et l\'épuisement a diminué', value: 'La productivité est restée stable ou a augmenté et l\'épuisement a diminué' },
      { label: 'Les employés préféraient travailler cinq jours', value: 'Les employés préféraient travailler cinq jours' },
      { label: 'Seules les entreprises industrielles en ont bénéficié', value: 'Seules les entreprises industrielles en ont bénéficié' }
    ],
    correctAnswer: 'La productivité est restée stable ou a augmenté et l\'épuisement a diminué', points: 2, orderIndex: 97, tags: ['équilibre travail-vie', 'tendances européennes']
  },

  // --- B2 : Résumé exécutif d'une proposition commerciale ---
  {
    language: 'French', cefrLevel: 'B2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Résumé exécutif : Proposition d\'expansion',
    passage: 'Cette proposition présente une stratégie d\'expansion dans la région DACH (Allemagne, Autriche et Suisse) sur les 18 prochains mois. L\'étude de marché indique une forte demande pour notre plateforme SaaS parmi les PME du secteur manufacturier, avec un marché adressable estimé à 45 millions d\'euros par an. L\'approche proposée comprend l\'ouverture d\'un bureau commercial régional à Munich, le recrutement d\'une équipe de cinq commerciaux locaux et un partenariat avec deux cabinets de conseil établis. L\'investissement total requis est de 1,2 million d\'euros, avec un point d\'équilibre prévu à 14 mois. Les principaux risques incluent les différences réglementaires entre les trois marchés et la concurrence des fournisseurs locaux établis.',
    questionText: 'Quand est prévu le point d\'équilibre de cette expansion ?',
    options: [
      { label: '6 mois', value: '6 mois' },
      { label: '14 mois', value: '14 mois' },
      { label: '18 mois', value: '18 mois' },
      { label: '24 mois', value: '24 mois' }
    ],
    correctAnswer: '14 mois', points: 2, orderIndex: 98, tags: ['proposition commerciale', 'stratégie']
  },

  // --- C1 : Stratégies de négociation interculturelle ---
  {
    language: 'French', cefrLevel: 'C1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Stratégies de négociation interculturelle',
    passage: 'Une négociation interculturelle efficace exige bien plus qu\'une maîtrise linguistique ; elle nécessite une compréhension des cadres culturels profondément ancrés qui façonnent la construction de la confiance, la prise de décisions et la conclusion d\'accords. Dans les cultures à contexte élevé, comme le Japon et de nombreux pays du Moyen-Orient, l\'établissement de relations précède souvent toute discussion sur les termes, et le silence pendant les négociations peut signifier la réflexion plutôt que le désaccord. À l\'inverse, les cultures à contexte faible, notamment les États-Unis et l\'Allemagne, tendent à privilégier la franchise, les arguments fondés sur les données et les contrats écrits. Les recherches d\'Erin Meyer à l\'INSEAD ont démontré que même au sein de l\'Europe, des différences significatives existent — les négociateurs français, par exemple, s\'engagent souvent dans un débat intellectuel dans le cadre du processus, tandis que leurs homologues scandinaves favorisent la recherche de consensus.',
    questionText: 'Selon le passage, que peut signifier le silence pendant une négociation dans les cultures à contexte élevé ?',
    options: [
      { label: 'Un désaccord avec la proposition', value: 'Un désaccord avec la proposition' },
      { label: 'Un souhait de mettre fin à la négociation', value: 'Un souhait de mettre fin à la négociation' },
      { label: 'La réflexion plutôt que le désaccord', value: 'La réflexion plutôt que le désaccord' },
      { label: 'Un manque de préparation', value: 'Un manque de préparation' }
    ],
    correctAnswer: 'La réflexion plutôt que le désaccord', points: 2, orderIndex: 99, tags: ['interculturel', 'négociation']
  },

  // --- C1 : Responsabilité sociale des entreprises ---
  {
    language: 'French', cefrLevel: 'C1', questionType: 'READING', skill: 'READING',
    passageTitle: 'L\'impact de la responsabilité sociale des entreprises',
    passage: 'La responsabilité sociale des entreprises (RSE) est passée d\'un exercice périphérique de relations publiques à un impératif stratégique pour de nombreuses multinationales. Des études de la Harvard Business School ont montré que les entreprises dotées de programmes RSE robustes tendent à surperformer financièrement leurs pairs sur le long terme, en partie parce qu\'elles attirent et retiennent les meilleurs talents, qui recherchent de plus en plus un travail porteur de sens. Cependant, la montée de l\'« écoblanchiment » — des déclarations superficielles ou trompeuses sur les pratiques environnementales — a engendré un scepticisme croissant chez les consommateurs et les régulateurs. La directive européenne sur le reporting de durabilité des entreprises (CSRD), entrée en vigueur en 2024, impose aux grandes entreprises de divulguer des données détaillées sur les critères environnementaux, sociaux et de gouvernance (ESG). Les détracteurs de la RSE estiment qu\'elle peut détourner l\'attention des changements structurels fondamentaux nécessaires.',
    questionText: 'Quelle est la principale préoccupation soulevée à propos de l\'« écoblanchiment » ?',
    options: [
      { label: 'Il augmente injustement les bénéfices des entreprises', value: 'Il augmente injustement les bénéfices des entreprises' },
      { label: 'Il a engendré un scepticisme sur l\'authenticité des engagements RSE', value: 'Il a engendré un scepticisme sur l\'authenticité des engagements RSE' },
      { label: 'Il ne concerne que les petites entreprises', value: 'Il ne concerne que les petites entreprises' },
      { label: 'Il est imposé par la réglementation européenne', value: 'Il est imposé par la réglementation européenne' }
    ],
    correctAnswer: 'Il a engendré un scepticisme sur l\'authenticité des engagements RSE', points: 2, orderIndex: 100, tags: ['RSE', 'développement durable']
  },

  // --- C1 : Transformation numérique des PME ---
  {
    language: 'French', cefrLevel: 'C1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Les défis de la transformation numérique des PME',
    passage: 'Alors que les grandes entreprises ont généralement adopté la transformation numérique avec des budgets dédiés et des équipes spécialisées, les petites et moyennes entreprises (PME) font face à un ensemble distinct de défis. Un rapport de l\'OCDE de 2024 a révélé que seules 35 % des PME européennes avaient mis en œuvre des outils numériques avancés tels que le cloud computing, l\'analyse de données ou l\'automatisation. Les principaux freins cités étaient les ressources financières limitées, le manque d\'employés ayant des compétences numériques et la résistance au changement du personnel expérimenté habitué aux flux de travail établis. De plus, de nombreux dirigeants de PME ont exprimé leur incertitude quant aux technologies offrant un retour sur investissement tangible. Les programmes de numérisation soutenus par les pouvoirs publics ont obtenu des résultats mitigés ; si les subventions ont aidé certaines entreprises à adopter de nouveaux systèmes, le manque de support technique continu fait que les nouveaux outils sont souvent sous-utilisés.',
    questionText: 'Selon le rapport de l\'OCDE, quel pourcentage de PME européennes avaient adopté des outils numériques avancés ?',
    options: [
      { label: '25 %', value: '25 %' },
      { label: '35 %', value: '35 %' },
      { label: '50 %', value: '50 %' },
      { label: '65 %', value: '65 %' }
    ],
    correctAnswer: '35 %', points: 2, orderIndex: 101, tags: ['transformation numérique', 'PME']
  },

  // --- C1 : Rétention des talents ---
  {
    language: 'French', cefrLevel: 'C1', questionType: 'READING', skill: 'READING',
    passageTitle: 'La rétention des talents dans un marché compétitif',
    passage: 'À une époque caractérisée par les pénuries de compétences et la « Grande Démission », les organisations sont contraintes de repenser leurs stratégies de rétention des talents. Les approches traditionnelles centrées sur des salaires compétitifs et des primes annuelles s\'avèrent insuffisantes, car les employés — en particulier les milléniaux et la génération Z — privilégient de plus en plus le sens, l\'autonomie et le développement de carrière plutôt que les récompenses purement financières. Les entreprises leaders investissent dans des parcours d\'apprentissage personnalisés, des programmes de mobilité interne et des critères de promotion transparents. Le rapport LinkedIn 2024 sur l\'apprentissage en entreprise a révélé que les employés qui estiment avoir des opportunités d\'apprentissage et de croissance sont 3,5 fois plus susceptibles de rester chez leur employeur. Toutefois, la rétention ne se résume pas aux incitations individuelles ; la culture organisationnelle, le leadership inclusif et la qualité de la relation manager-employé restent les meilleurs prédicteurs.',
    questionText: 'Selon le rapport LinkedIn, qu\'est-ce qui rend les employés 3,5 fois plus susceptibles de rester ?',
    options: [
      { label: 'Des salaires plus élevés que la concurrence', value: 'Des salaires plus élevés que la concurrence' },
      { label: 'Des opportunités d\'apprentissage et de croissance', value: 'Des opportunités d\'apprentissage et de croissance' },
      { label: 'Moins d\'heures de travail par semaine', value: 'Moins d\'heures de travail par semaine' },
      { label: 'Des primes annuelles', value: 'Des primes annuelles' }
    ],
    correctAnswer: 'Des opportunités d\'apprentissage et de croissance', points: 2, orderIndex: 102, tags: ['rétention talents', 'stratégie RH']
  },

  // --- C2 : IA éthique dans les décisions RH ---
  {
    language: 'French', cefrLevel: 'C2', questionType: 'READING', skill: 'READING',
    passageTitle: 'L\'IA éthique dans les décisions RH',
    passage: 'Le déploiement de l\'intelligence artificielle dans les ressources humaines — des algorithmes de tri de CV aux modèles prédictifs d\'attrition — soulève des questions éthiques profondes que les organisations commencent à peine à appréhender. Si l\'IA promet de réduire les biais inconscients en standardisant les critères d\'évaluation, les données empiriques racontent une histoire plus nuancée. L\'outil de recrutement d\'Amazon, désormais abandonné, qui pénalisait systématiquement les CV contenant le mot « femmes », a démontré comment des algorithmes entraînés sur des données historiquement biaisées peuvent perpétuer et même amplifier les inégalités existantes. Le règlement européen sur l\'IA, adopté en 2024, classe les systèmes d\'IA liés à l\'emploi comme « à haut risque », les soumettant à des exigences strictes de transparence, de supervision humaine et d\'audit des biais. Pourtant, la conformité seule est insuffisante ; les organisations doivent cultiver ce que les chercheurs appellent la « littératie algorithmique » — la capacité des professionnels RH à évaluer de manière critique les résultats de l\'IA plutôt que de les traiter comme des vérités objectives.',
    questionText: 'Selon le passage, qu\'est-ce qui est insuffisant à lui seul lors de l\'implémentation de l\'IA en RH ?',
    options: [
      { label: 'La formation technique des ingénieurs', value: 'La formation technique des ingénieurs' },
      { label: 'La conformité réglementaire', value: 'La conformité réglementaire' },
      { label: 'L\'augmentation du volume de données d\'entraînement', value: 'L\'augmentation du volume de données d\'entraînement' },
      { label: 'La suppression de toute intervention humaine', value: 'La suppression de toute intervention humaine' }
    ],
    correctAnswer: 'La conformité réglementaire', points: 2, orderIndex: 103, tags: ['IA éthique', 'technologie RH']
  },

  // --- C2 : Capitalisme des parties prenantes vs primauté actionnariale ---
  {
    language: 'French', cefrLevel: 'C2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Capitalisme des parties prenantes vs primauté actionnariale',
    passage: 'Le débat entre le capitalisme des parties prenantes et la primauté actionnariale représente l\'une des lignes de fracture idéologiques les plus conséquentes de la pensée économique contemporaine. La doctrine de Milton Friedman de 1970 — selon laquelle la seule responsabilité sociale d\'une entreprise est d\'accroître ses profits — a dominé le capitalisme anglo-américain pendant des décennies. Le modèle des parties prenantes, défendu par des figures telles que Klaus Schwab du Forum économique mondial, soutient que les entreprises doivent équilibrer les intérêts des actionnaires, des employés, des clients, des communautés et de l\'environnement pour assurer la création de valeur à long terme. La déclaration du Business Roundtable de 2019, signée par 181 PDG de grandes entreprises américaines, a formellement adopté une finalité orientée vers les parties prenantes. Pourtant, les critiques ont qualifié ce virage de largement performatif, notant que les structures de rémunération des dirigeants restent massivement liées à la performance boursière.',
    questionText: 'Pourquoi les critiques qualifient-ils l\'engagement du Business Roundtable de 2019 de « performatif » ?',
    options: [
      { label: 'Parce que les PDG n\'ont pas signé la déclaration volontairement', value: 'Parce que les PDG n\'ont pas signé la déclaration volontairement' },
      { label: 'Parce que la rémunération des dirigeants reste liée à la performance boursière', value: 'Parce que la rémunération des dirigeants reste liée à la performance boursière' },
      { label: 'Parce que le capitalisme des parties prenantes est illégal aux États-Unis', value: 'Parce que le capitalisme des parties prenantes est illégal aux États-Unis' },
      { label: 'Parce que la déclaration a été retirée l\'année suivante', value: 'Parce que la déclaration a été retirée l\'année suivante' }
    ],
    correctAnswer: 'Parce que la rémunération des dirigeants reste liée à la performance boursière', points: 2, orderIndex: 104, tags: ['capitalisme parties prenantes', 'gouvernance']
  },

  // --- C2 : Résilience organisationnelle post-pandémie ---
  {
    language: 'French', cefrLevel: 'C2', questionType: 'READING', skill: 'READING',
    passageTitle: 'La résilience organisationnelle à l\'ère post-pandémique',
    passage: 'La pandémie de COVID-19 a constitué un test de résistance sans précédent pour la résilience organisationnelle, révélant des vulnérabilités critiques dans les chaînes d\'approvisionnement, la gestion des effectifs et la planification stratégique. Les organisations ayant investi dans des réseaux d\'approvisionnement diversifiés, des infrastructures numériques et des cadres de leadership adaptatif ont mieux traversé la crise que celles reposant sur des modèles allégés, optimisés pour l\'efficience avec une redondance minimale. Cependant, le discours post-pandémique autour de la résilience risque de confondre véritable capacité d\'adaptation et simple survie à la crise. La véritable résilience organisationnelle, telle que définie par des chercheurs comme Kathleen Sutcliffe et Karl Weick, englobe non seulement la capacité d\'absorber les chocs et de s\'en remettre, mais aussi la capacité d\'anticiper les menaces émergentes et de se transformer face à des conditions fondamentalement modifiées. Cette distinction est cruciale : les entreprises qui ont simplement rétabli leurs opérations pré-pandémiques sans repenser leur modèle économique risquent de se retrouver mal préparées face aux incertitudes cumulées.',
    questionText: 'Selon le passage, quel est le risque du discours post-pandémique sur la résilience ?',
    options: [
      { label: 'Que les entreprises investissent trop dans l\'infrastructure numérique', value: 'Que les entreprises investissent trop dans l\'infrastructure numérique' },
      { label: 'Que la véritable capacité d\'adaptation soit confondue avec la simple survie à la crise', value: 'Que la véritable capacité d\'adaptation soit confondue avec la simple survie à la crise' },
      { label: 'Que les employés résistent au retour au bureau', value: 'Que les employés résistent au retour au bureau' },
      { label: 'Que les chaînes d\'approvisionnement deviennent trop diversifiées', value: 'Que les chaînes d\'approvisionnement deviennent trop diversifiées' }
    ],
    correctAnswer: 'Que la véritable capacité d\'adaptation soit confondue avec la simple survie à la crise', points: 2, orderIndex: 105, tags: ['résilience organisationnelle', 'stratégie']
  },

  // --- C2 : ROI du développement professionnel ---
  {
    language: 'French', cefrLevel: 'C2', questionType: 'READING', skill: 'READING',
    passageTitle: 'L\'économie du retour sur investissement de la formation professionnelle',
    passage: 'Quantifier le retour sur investissement (ROI) des programmes de développement professionnel reste l\'un des défis les plus persistants de la gestion du capital humain. Les approches traditionnelles, comme le modèle d\'évaluation à quatre niveaux de Kirkpatrick, mesurent l\'impact de la formation à travers la satisfaction des apprenants, l\'acquisition de connaissances, le changement comportemental et les résultats commerciaux — mais chaque niveau successif présente des difficultés de mesure croissantes. Le problème d\'attribution causale est particulièrement aigu : isoler l\'impact d\'un programme de formation des variables confondantes telles que les conditions du marché, la qualité du management et la motivation individuelle nécessite des protocoles expérimentaux rigoureux que la plupart des organisations n\'ont ni les moyens ni la volonté de mettre en place. L\'extension du modèle de Kirkpatrick par Jack Phillips pour inclure un cinquième niveau — le ROI financier — a gagné du terrain, mais les critiques soutiennent que réduire des résultats développementaux complexes à des chiffres monétaires risque de sous-évaluer des bénéfices intangibles comme la capacité d\'innovation accrue et le renforcement des réseaux professionnels.',
    questionText: 'Qu\'est-ce que le « problème d\'attribution causale » décrit dans le passage ?',
    options: [
      { label: 'La difficulté de trouver des formateurs qualifiés', value: 'La difficulté de trouver des formateurs qualifiés' },
      { label: 'Le défi d\'isoler l\'impact d\'une formation des variables confondantes', value: 'Le défi d\'isoler l\'impact d\'une formation des variables confondantes' },
      { label: 'Le problème des employés qui n\'assistent pas aux formations', value: 'Le problème des employés qui n\'assistent pas aux formations' },
      { label: 'Le coût élevé de la mise en œuvre du modèle de Kirkpatrick', value: 'Le coût élevé de la mise en œuvre du modèle de Kirkpatrick' }
    ],
    correctAnswer: 'Le défi d\'isoler l\'impact d\'une formation des variables confondantes', points: 2, orderIndex: 106, tags: ['développement professionnel', 'ROI', 'stratégie RH']
  },
]
