import { MultiSkillQuestionData } from '../types'

// English Reading Questions — ~7 per CEFR level (42 total)
// Types: MULTIPLE_CHOICE, FILL_BLANK, SHORT_ANSWER with passages

export const englishReadingQuestions: MultiSkillQuestionData[] = [
  // ============================================================
  // A1 — Beginner (7 questions)
  // ============================================================
  {
    language: 'English', cefrLevel: 'A1', questionType: 'READING', skill: 'READING',
    passageTitle: 'New at the Office',
    passage: 'My name is Anna. I am 28 years old. I have a colleague. His name is Tom. He is 35. We share an office. The office is small. We work in a big company.',
    questionText: 'How old is Anna?',
    options: [{ label: '25', value: '25' }, { label: '28', value: '28' }, { label: '30', value: '30' }, { label: '35', value: '35' }],
    correctAnswer: '28', points: 1, orderIndex: 1, tags: ['workplace', 'numbers']
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'READING', skill: 'READING',
    passageTitle: 'New at the Office',
    passage: 'My name is Anna. I am 28 years old. I have a colleague. His name is Tom. He is 35. We share an office. The office is small. We work in a big company.',
    questionText: 'How old is Tom?',
    options: [{ label: '28', value: '28' }, { label: '30', value: '30' }, { label: '35', value: '35' }, { label: '40', value: '40' }],
    correctAnswer: '35', points: 1, orderIndex: 2, tags: ['workplace', 'numbers']
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'READING',
    passageTitle: 'At the Shop',
    passage: 'I go to the shop. I buy bread and milk. The bread costs two euros. The milk costs one euro. I pay three euros.',
    questionText: 'How much does the bread cost?',
    options: [{ label: 'One euro', value: 'one euro' }, { label: 'Two euros', value: 'two euros' }, { label: 'Three euros', value: 'three euros' }, { label: 'Four euros', value: 'four euros' }],
    correctAnswer: 'two euros', points: 1, orderIndex: 3, tags: ['shopping', 'numbers']
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'I go to the shop. I buy bread and milk. The bread costs two euros. The milk costs one euro. I pay three euros.',
    questionText: 'I buy bread and ___.',
    correctAnswer: 'milk', points: 1, orderIndex: 4, tags: ['shopping']
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'READING', skill: 'READING',
    passageTitle: 'My Work Day',
    passage: 'I wake up at 7 o\'clock. I eat breakfast. Then I go to the office. Work starts at 8:30. I finish at 5 o\'clock. I take the bus home.',
    questionText: 'What time does work start?',
    options: [{ label: '7:00', value: '7:00' }, { label: '8:30', value: '8:30' }, { label: '5:00', value: '5:00' }, { label: '9:00', value: '9:00' }],
    correctAnswer: '8:30', points: 1, orderIndex: 5, tags: ['daily routine', 'time']
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'READING', skill: 'READING',
    passageTitle: 'My Work Day',
    passage: 'I wake up at 7 o\'clock. I eat breakfast. Then I go to the office. Work starts at 8:30. I finish at 5 o\'clock. I take the bus home.',
    questionText: 'How does the person go home?',
    options: [{ label: 'By car', value: 'by car' }, { label: 'By bus', value: 'by bus' }, { label: 'On foot', value: 'on foot' }, { label: 'By train', value: 'by train' }],
    correctAnswer: 'by bus', points: 1, orderIndex: 6, tags: ['daily routine', 'transport']
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'I wake up at 7 o\'clock. I eat breakfast. Then I go to the office.',
    questionText: 'I wake up at 7 ___.  (Write the missing word)',
    correctAnswer: "o'clock", points: 1, orderIndex: 7, tags: ['time']
  },

  // ============================================================
  // A2 — Elementary (7 questions)
  // ============================================================
  {
    language: 'English', cefrLevel: 'A2', questionType: 'READING', skill: 'READING',
    passageTitle: 'A Trip to London',
    passage: 'Last summer, Maria visited London for the first time. She stayed in a hotel near the river Thames. She visited the Tower of London, Big Ben, and Buckingham Palace. The weather was warm and sunny. She took many photos and bought souvenirs for her family.',
    questionText: 'Where did Maria stay in London?',
    options: [{ label: 'In a house', value: 'in a house' }, { label: 'In a hotel near the Thames', value: 'in a hotel near the Thames' }, { label: 'With friends', value: 'with friends' }, { label: 'In an apartment', value: 'in an apartment' }],
    correctAnswer: 'in a hotel near the Thames', points: 1, orderIndex: 8, tags: ['travel', 'past tense']
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'READING', skill: 'READING',
    passageTitle: 'A Trip to London',
    passage: 'Last summer, Maria visited London for the first time. She stayed in a hotel near the river Thames. She visited the Tower of London, Big Ben, and Buckingham Palace. The weather was warm and sunny. She took many photos and bought souvenirs for her family.',
    questionText: 'What was the weather like?',
    options: [{ label: 'Cold and rainy', value: 'cold and rainy' }, { label: 'Warm and sunny', value: 'warm and sunny' }, { label: 'Cloudy', value: 'cloudy' }, { label: 'Windy', value: 'windy' }],
    correctAnswer: 'warm and sunny', points: 1, orderIndex: 9, tags: ['travel', 'weather']
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'READING', skill: 'READING',
    passageTitle: 'The New Restaurant',
    passage: 'A new Italian restaurant opened on Park Street last month. The restaurant is called "Bella Italia." It serves pasta, pizza, and salads. The prices are not expensive. Many people go there on weekends. The restaurant is open from 11 am to 10 pm every day except Monday.',
    questionText: 'When is the restaurant closed?',
    options: [{ label: 'Sunday', value: 'Sunday' }, { label: 'Saturday', value: 'Saturday' }, { label: 'Monday', value: 'Monday' }, { label: 'Tuesday', value: 'Tuesday' }],
    correctAnswer: 'Monday', points: 1, orderIndex: 10, tags: ['food', 'places']
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'A new Italian restaurant opened on Park Street last month. The restaurant is called "Bella Italia."',
    questionText: 'The restaurant is called "Bella ___."',
    correctAnswer: 'Italia', points: 1, orderIndex: 11, tags: ['food', 'places']
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Email to a Friend',
    passage: 'Hi Tom, I hope you are well. I moved to a new apartment last week. It is bigger than my old one. It has two bedrooms, a kitchen, and a nice balcony. The neighborhood is quiet and there is a park nearby. Would you like to visit next weekend? Best, Sarah',
    questionText: 'Why did Sarah write to Tom?',
    options: [{ label: 'To invite him to visit', value: 'to invite him to visit' }, { label: 'To ask for money', value: 'to ask for money' }, { label: 'To say goodbye', value: 'to say goodbye' }, { label: 'To complain', value: 'to complain' }],
    correctAnswer: 'to invite him to visit', points: 1, orderIndex: 12, tags: ['communication', 'housing']
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Email to a Friend',
    passage: 'Hi Tom, I hope you are well. I moved to a new apartment last week. It is bigger than my old one. It has two bedrooms, a kitchen, and a nice balcony. The neighborhood is quiet and there is a park nearby. Would you like to visit next weekend? Best, Sarah',
    questionText: 'How many bedrooms does the new apartment have?',
    options: [{ label: 'One', value: 'one' }, { label: 'Two', value: 'two' }, { label: 'Three', value: 'three' }, { label: 'Four', value: 'four' }],
    correctAnswer: 'two', points: 1, orderIndex: 13, tags: ['housing']
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'Hi Tom, I moved to a new apartment last week. It is bigger than my old one.',
    questionText: 'The new apartment is ___ than the old one.',
    correctAnswer: 'bigger', points: 1, orderIndex: 14, tags: ['comparatives']
  },

  // ============================================================
  // B1 — Intermediate (7 questions)
  // ============================================================
  {
    language: 'English', cefrLevel: 'B1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Working from Home',
    passage: 'The number of people working from home has increased significantly since 2020. Many companies discovered that employees can be just as productive at home as in the office. However, some workers report feeling isolated and miss the social interaction of the workplace. Companies are now trying to find a balance, with many adopting a hybrid model where employees work from home two or three days a week.',
    questionText: 'What is a "hybrid model" according to the text?',
    options: [
      { label: 'Working only from home', value: 'working only from home' },
      { label: 'Working some days at home and some in the office', value: 'working some days at home and some in the office' },
      { label: 'Working only in the office', value: 'working only in the office' },
      { label: 'Working at different offices', value: 'working at different offices' }
    ],
    correctAnswer: 'working some days at home and some in the office', points: 2, orderIndex: 15, tags: ['work', 'modern life']
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Working from Home',
    passage: 'The number of people working from home has increased significantly since 2020. Many companies discovered that employees can be just as productive at home as in the office. However, some workers report feeling isolated and miss the social interaction of the workplace.',
    questionText: 'What problem do some home workers experience?',
    options: [
      { label: 'They earn less money', value: 'they earn less money' },
      { label: 'They feel isolated', value: 'they feel isolated' },
      { label: 'They work longer hours', value: 'they work longer hours' },
      { label: 'They have technical problems', value: 'they have technical problems' }
    ],
    correctAnswer: 'they feel isolated', points: 2, orderIndex: 16, tags: ['work']
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'READING', skill: 'READING',
    passageTitle: 'The Benefits of Exercise',
    passage: 'Regular physical exercise has been proven to have numerous health benefits. It reduces the risk of heart disease, helps control weight, and improves mental health. Studies show that even 30 minutes of moderate exercise, such as walking, five times a week can make a significant difference. Despite this, many adults do not get enough exercise. Common reasons include lack of time, motivation, or access to facilities.',
    questionText: 'How much weekly exercise does the text recommend?',
    options: [
      { label: '30 minutes once a week', value: '30 minutes once a week' },
      { label: '30 minutes five times a week', value: '30 minutes five times a week' },
      { label: 'One hour every day', value: 'one hour every day' },
      { label: 'Two hours three times a week', value: 'two hours three times a week' }
    ],
    correctAnswer: '30 minutes five times a week', points: 2, orderIndex: 17, tags: ['health', 'exercise']
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'Regular physical exercise has been proven to have numerous health benefits. It reduces the risk of heart disease, helps control weight, and improves mental health.',
    questionText: 'Exercise improves ___ health. (What type of health besides physical?)',
    correctAnswer: 'mental', points: 2, orderIndex: 18, tags: ['health']
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Plastic Pollution',
    passage: 'Plastic pollution has become one of the most pressing environmental issues. Every year, millions of tonnes of plastic waste end up in the oceans, harming marine life. Many countries have started banning single-use plastics like bags and straws. Recycling rates have improved, but experts say we need to reduce our plastic consumption overall, not just recycle more.',
    questionText: 'According to experts, what is more important than recycling?',
    options: [
      { label: 'Producing more plastic', value: 'producing more plastic' },
      { label: 'Reducing plastic consumption', value: 'reducing plastic consumption' },
      { label: 'Using different materials', value: 'using different materials' },
      { label: 'Building more factories', value: 'building more factories' }
    ],
    correctAnswer: 'reducing plastic consumption', points: 2, orderIndex: 19, tags: ['environment']
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Plastic Pollution',
    passage: 'Plastic pollution has become one of the most pressing environmental issues. Every year, millions of tonnes of plastic waste end up in the oceans, harming marine life. Many countries have started banning single-use plastics like bags and straws.',
    questionText: 'What examples of single-use plastics are mentioned?',
    options: [
      { label: 'Bottles and cups', value: 'bottles and cups' },
      { label: 'Bags and straws', value: 'bags and straws' },
      { label: 'Containers and wrappers', value: 'containers and wrappers' },
      { label: 'Plates and forks', value: 'plates and forks' }
    ],
    correctAnswer: 'bags and straws', points: 2, orderIndex: 20, tags: ['environment']
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'Plastic pollution has become one of the most pressing environmental issues. Every year, millions of tonnes of plastic waste end up in the oceans.',
    questionText: 'Millions of tonnes of plastic end up in the ___.',
    correctAnswer: 'oceans', points: 2, orderIndex: 21, tags: ['environment']
  },

  // ============================================================
  // B2 — Upper Intermediate (7 questions)
  // ============================================================
  {
    language: 'English', cefrLevel: 'B2', questionType: 'READING', skill: 'READING',
    passageTitle: 'The Gig Economy',
    passage: 'The gig economy has transformed the way millions of people work. Platforms like Uber, Deliveroo, and Fiverr connect freelance workers with customers who need specific services. Supporters argue that it offers flexibility and independence, allowing people to work on their own terms. Critics, however, point out that gig workers often lack benefits such as health insurance, paid leave, and pension contributions. The debate over whether gig workers should be classified as employees or independent contractors continues in courts around the world.',
    questionText: 'What is the main controversy surrounding gig workers?',
    options: [
      { label: 'Whether they should pay more taxes', value: 'whether they should pay more taxes' },
      { label: 'Whether they should be classified as employees or contractors', value: 'whether they should be classified as employees or contractors' },
      { label: 'Whether they are skilled enough', value: 'whether they are skilled enough' },
      { label: 'Whether they work too many hours', value: 'whether they work too many hours' }
    ],
    correctAnswer: 'whether they should be classified as employees or contractors', points: 2, orderIndex: 22, tags: ['work', 'economy']
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'READING', skill: 'READING',
    passageTitle: 'The Gig Economy',
    passage: 'Supporters argue that the gig economy offers flexibility and independence, allowing people to work on their own terms. Critics, however, point out that gig workers often lack benefits such as health insurance, paid leave, and pension contributions.',
    questionText: 'Which benefit is NOT mentioned as lacking for gig workers?',
    options: [
      { label: 'Health insurance', value: 'health insurance' },
      { label: 'Paid leave', value: 'paid leave' },
      { label: 'Training opportunities', value: 'training opportunities' },
      { label: 'Pension contributions', value: 'pension contributions' }
    ],
    correctAnswer: 'training opportunities', points: 2, orderIndex: 23, tags: ['work', 'economy']
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Sleep and Learning',
    passage: 'Recent neuroscience research has revealed a strong connection between sleep and memory consolidation. During deep sleep, the brain replays and strengthens neural pathways formed during waking hours, effectively transferring information from short-term to long-term memory. Students who get adequate sleep after studying perform significantly better on tests than those who stay up late cramming. Furthermore, sleep deprivation impairs cognitive functions such as attention, problem-solving, and creative thinking.',
    questionText: 'According to the passage, what happens during deep sleep?',
    options: [
      { label: 'The brain stops processing information', value: 'the brain stops processing' },
      { label: 'The brain replays and strengthens neural pathways', value: 'the brain replays and strengthens neural pathways' },
      { label: 'New memories are deleted', value: 'new memories are deleted' },
      { label: 'The brain creates new neural pathways', value: 'the brain creates new neural pathways' }
    ],
    correctAnswer: 'the brain replays and strengthens neural pathways', points: 2, orderIndex: 24, tags: ['science', 'education']
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Sleep and Learning',
    passage: 'Students who get adequate sleep after studying perform significantly better on tests than those who stay up late cramming. Furthermore, sleep deprivation impairs cognitive functions such as attention, problem-solving, and creative thinking.',
    questionText: 'What cognitive functions are impaired by lack of sleep?',
    options: [
      { label: 'Memory, speech, and hearing', value: 'memory, speech, and hearing' },
      { label: 'Attention, problem-solving, and creative thinking', value: 'attention, problem-solving, and creative thinking' },
      { label: 'Reading, writing, and speaking', value: 'reading, writing, and speaking' },
      { label: 'Vision, hearing, and balance', value: 'vision, hearing, and balance' }
    ],
    correctAnswer: 'attention, problem-solving, and creative thinking', points: 2, orderIndex: 25, tags: ['science']
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'During deep sleep, the brain replays and strengthens neural pathways formed during waking hours, effectively transferring information from short-term to long-term memory.',
    questionText: 'Sleep helps transfer information from short-term to ___-term memory.',
    correctAnswer: 'long', points: 2, orderIndex: 26, tags: ['science']
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Urban Farming',
    passage: 'Urban farming is gaining popularity in cities around the world as a response to food security concerns and environmental awareness. Rooftop gardens, vertical farms, and community allotments are transforming unused urban spaces into productive food sources. Proponents argue that urban farming reduces transportation costs and emissions, provides fresher produce, and strengthens community bonds. However, challenges remain, including limited space, soil contamination in former industrial areas, and the high cost of setting up indoor growing facilities.',
    questionText: 'What is one challenge of urban farming mentioned in the text?',
    options: [
      { label: 'Too much water', value: 'too much water' },
      { label: 'Soil contamination', value: 'soil contamination' },
      { label: 'Too many farmers', value: 'too many farmers' },
      { label: 'Lack of interest', value: 'lack of interest' }
    ],
    correctAnswer: 'soil contamination', points: 2, orderIndex: 27, tags: ['environment', 'urban']
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'Rooftop gardens, vertical farms, and community allotments are transforming unused urban spaces into productive food sources.',
    questionText: '___ farms are one type of urban farming that uses vertical space.',
    correctAnswer: 'Vertical', points: 2, orderIndex: 28, tags: ['environment']
  },

  // ============================================================
  // C1 — Advanced (7 questions)
  // ============================================================
  {
    language: 'English', cefrLevel: 'C1', questionType: 'READING', skill: 'READING',
    passageTitle: 'The Ethics of AI',
    passage: 'The rapid advancement of artificial intelligence has raised profound ethical questions that society must grapple with. Algorithmic bias, where AI systems perpetuate or amplify existing societal prejudices, has been documented in areas ranging from criminal justice to hiring practices. The opacity of deep learning models — often referred to as the "black box" problem — makes it difficult to understand why an AI system makes particular decisions, raising questions of accountability. Furthermore, the potential displacement of workers through automation poses significant socioeconomic challenges that require proactive policy responses.',
    questionText: 'What does the "black box" problem refer to in the context of AI?',
    options: [
      { label: 'AI systems are expensive', value: 'AI systems are expensive' },
      { label: 'AI decision-making processes are not transparent', value: 'AI decision-making processes are not transparent' },
      { label: 'AI systems frequently break down', value: 'AI systems frequently break down' },
      { label: 'AI hardware is difficult to manufacture', value: 'AI hardware is difficult to manufacture' }
    ],
    correctAnswer: 'AI decision-making processes are not transparent', points: 3, orderIndex: 29, tags: ['technology', 'ethics']
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'READING', skill: 'READING',
    passageTitle: 'The Ethics of AI',
    passage: 'Algorithmic bias, where AI systems perpetuate or amplify existing societal prejudices, has been documented in areas ranging from criminal justice to hiring practices. The opacity of deep learning models makes it difficult to understand why an AI system makes particular decisions, raising questions of accountability.',
    questionText: 'The word "opacity" in the passage is closest in meaning to:',
    options: [
      { label: 'Transparency', value: 'transparency' },
      { label: 'Efficiency', value: 'efficiency' },
      { label: 'Lack of transparency', value: 'lack of transparency' },
      { label: 'Complexity', value: 'complexity' }
    ],
    correctAnswer: 'lack of transparency', points: 3, orderIndex: 30, tags: ['vocabulary', 'technology']
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Language and Thought',
    passage: 'The Sapir-Whorf hypothesis, which posits that the structure of a language influences its speakers\' worldview and cognition, has been a subject of considerable debate in linguistics. The strong version — linguistic determinism — suggests that language determines thought, while the weaker version — linguistic relativity — proposes that language merely influences thought patterns. Contemporary research has largely supported the weaker form, demonstrating that speakers of different languages may perceive time, space, and color differently, though not to the extent that they cannot conceptualize ideas absent in their language.',
    questionText: 'What is the difference between linguistic determinism and linguistic relativity?',
    options: [
      { label: 'Determinism says language determines thought; relativity says it influences thought', value: 'determinism determines, relativity influences' },
      { label: 'They are the same concept with different names', value: 'same concept' },
      { label: 'Determinism is about grammar; relativity is about vocabulary', value: 'grammar vs vocabulary' },
      { label: 'Determinism is newer than relativity', value: 'determinism is newer' }
    ],
    correctAnswer: 'determinism determines, relativity influences', points: 3, orderIndex: 31, tags: ['linguistics', 'philosophy']
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Language and Thought',
    passage: 'Contemporary research has largely supported the weaker form, demonstrating that speakers of different languages may perceive time, space, and color differently, though not to the extent that they cannot conceptualize ideas absent in their language.',
    questionText: 'What has contemporary research concluded about the Sapir-Whorf hypothesis?',
    options: [
      { label: 'The strong version is correct', value: 'strong version correct' },
      { label: 'Both versions are incorrect', value: 'both incorrect' },
      { label: 'The weaker version is largely supported', value: 'weaker version supported' },
      { label: 'The hypothesis has been entirely disproven', value: 'entirely disproven' }
    ],
    correctAnswer: 'weaker version supported', points: 3, orderIndex: 32, tags: ['linguistics']
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'The Sapir-Whorf hypothesis posits that the structure of a language influences its speakers\' worldview and cognition.',
    questionText: 'The Sapir-Whorf hypothesis concerns the relationship between language and ___.',
    correctAnswer: 'cognition', points: 3, orderIndex: 33, tags: ['linguistics']
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Behavioral Economics',
    passage: 'Traditional economic theory assumes that individuals make rational decisions to maximize their utility. Behavioral economics, pioneered by researchers such as Daniel Kahneman and Amos Tversky, challenges this assumption by demonstrating systematic cognitive biases that lead to irrational decision-making. The concept of "loss aversion" — the tendency for people to prefer avoiding losses over acquiring equivalent gains — has profound implications for policy design, marketing, and financial planning.',
    questionText: 'What does "loss aversion" mean?',
    options: [
      { label: 'People prefer to take risks', value: 'people prefer risks' },
      { label: 'People feel losses more strongly than equivalent gains', value: 'losses felt more strongly than gains' },
      { label: 'People avoid making any financial decisions', value: 'avoid financial decisions' },
      { label: 'People always choose the cheapest option', value: 'choose cheapest option' }
    ],
    correctAnswer: 'losses felt more strongly than gains', points: 3, orderIndex: 34, tags: ['economics', 'psychology']
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'Behavioral economics challenges the assumption that individuals make rational decisions to maximize their utility.',
    questionText: 'Behavioral economics demonstrates systematic cognitive ___ that lead to irrational decision-making.',
    correctAnswer: 'biases', points: 3, orderIndex: 35, tags: ['economics']
  },

  // ============================================================
  // C2 — Proficiency (7 questions)
  // ============================================================
  {
    language: 'English', cefrLevel: 'C2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Post-Truth and Epistemic Crisis',
    passage: 'The proliferation of misinformation in the digital age has precipitated what philosophers term an "epistemic crisis" — a fundamental breakdown in society\'s ability to establish shared truths. The phenomenon is exacerbated by algorithmic echo chambers that reinforce existing beliefs, the commodification of attention that incentivizes sensationalism over accuracy, and the erosion of trust in traditional epistemic authorities such as scientific institutions and quality journalism. Some scholars argue that the very notion of objective truth has been supplanted by a "post-truth" paradigm in which emotional resonance and tribal affiliation supersede empirical evidence in shaping public discourse.',
    questionText: 'According to the passage, what contributes to the "epistemic crisis"?',
    options: [
      { label: 'Improved education systems', value: 'improved education' },
      { label: 'Algorithmic echo chambers, attention commodification, and erosion of trust', value: 'echo chambers, attention commodification, trust erosion' },
      { label: 'Increased scientific research funding', value: 'increased research funding' },
      { label: 'Better access to information', value: 'better access to information' }
    ],
    correctAnswer: 'echo chambers, attention commodification, trust erosion', points: 3, orderIndex: 36, tags: ['philosophy', 'media']
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Post-Truth and Epistemic Crisis',
    passage: 'Some scholars argue that the very notion of objective truth has been supplanted by a "post-truth" paradigm in which emotional resonance and tribal affiliation supersede empirical evidence in shaping public discourse.',
    questionText: 'What does "supplanted" mean in this context?',
    options: [
      { label: 'Supported', value: 'supported' },
      { label: 'Replaced', value: 'replaced' },
      { label: 'Questioned', value: 'questioned' },
      { label: 'Improved', value: 'improved' }
    ],
    correctAnswer: 'replaced', points: 3, orderIndex: 37, tags: ['vocabulary']
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Quantum Consciousness',
    passage: 'The Orchestrated Objective Reduction (Orch-OR) theory, proposed by physicist Roger Penrose and anesthesiologist Stuart Hameroff, posits that consciousness arises from quantum computations within microtubules inside neurons. This controversial hypothesis suggests that the brain is not merely a classical computer but operates at a fundamentally quantum level. Critics contend that the warm, wet environment of the brain would cause quantum decoherence far too rapidly for such processes to be biologically relevant. Nevertheless, recent experiments detecting quantum effects in biological systems — such as photosynthesis and avian navigation — have lent some credibility to the broader notion that quantum mechanics may play a role in biological processes.',
    questionText: 'What is the main criticism of the Orch-OR theory?',
    options: [
      { label: 'It lacks mathematical foundations', value: 'lacks math' },
      { label: 'Quantum decoherence would occur too quickly in the brain', value: 'decoherence too rapid' },
      { label: 'Penrose is not a neuroscientist', value: 'not a neuroscientist' },
      { label: 'Microtubules do not exist in neurons', value: 'microtubules do not exist' }
    ],
    correctAnswer: 'decoherence too rapid', points: 3, orderIndex: 38, tags: ['science', 'philosophy']
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Quantum Consciousness',
    passage: 'Recent experiments detecting quantum effects in biological systems — such as photosynthesis and avian navigation — have lent some credibility to the broader notion that quantum mechanics may play a role in biological processes.',
    questionText: 'Which biological processes have shown evidence of quantum effects?',
    options: [
      { label: 'Digestion and respiration', value: 'digestion and respiration' },
      { label: 'Photosynthesis and avian navigation', value: 'photosynthesis and avian navigation' },
      { label: 'Blood circulation and immune response', value: 'blood circulation and immune response' },
      { label: 'Cell division and protein synthesis', value: 'cell division and protein synthesis' }
    ],
    correctAnswer: 'photosynthesis and avian navigation', points: 3, orderIndex: 39, tags: ['science']
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'The Orch-OR theory posits that consciousness arises from quantum computations within microtubules inside neurons.',
    questionText: 'The Orch-OR theory suggests consciousness arises from quantum computations within ___.',
    correctAnswer: 'microtubules', points: 3, orderIndex: 40, tags: ['science']
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Linguistic Relativity Revisited',
    passage: 'The Kuuk Thaayorre people of Cape York Peninsula, Australia, use cardinal directions rather than egocentric spatial terms. Instead of saying "the cup is to your left," they would say "the cup is to the north-northeast." Remarkably, this linguistic practice correlates with an exceptional spatial orientation ability — Kuuk Thaayorre speakers maintain an accurate internal compass at all times, a feat that speakers of languages with egocentric spatial systems find extraordinarily difficult to replicate.',
    questionText: 'What makes the Kuuk Thaayorre spatial system unique?',
    options: [
      { label: 'They use left and right more precisely', value: 'left and right' },
      { label: 'They use cardinal directions instead of relative terms like left/right', value: 'cardinal directions instead of egocentric' },
      { label: 'They do not have words for directions', value: 'no words for directions' },
      { label: 'They only use gestures for directions', value: 'only gestures' }
    ],
    correctAnswer: 'cardinal directions instead of egocentric', points: 3, orderIndex: 41, tags: ['linguistics', 'culture']
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'The Kuuk Thaayorre people use cardinal directions rather than egocentric spatial terms.',
    questionText: 'The Kuuk Thaayorre use ___ directions rather than egocentric spatial terms.',
    correctAnswer: 'cardinal', points: 3, orderIndex: 42, tags: ['linguistics']
  },

  // ============================================================
  // NEW QUESTIONS 43-82 (40 additional, ~7 per level)
  // ============================================================

  // ============================================================
  // A1 — Beginner (43-49)
  // ============================================================
  {
    language: 'English', cefrLevel: 'A1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Office Notice',
    passage: 'OFFICE RULES: No food at desks. No personal calls during meetings. Open from 8 AM to 6 PM. All visitors must sign in at reception.',
    questionText: 'Can you eat at your desk?',
    options: [{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }, { label: 'Only snacks', value: 'only snacks' }, { label: 'Only on Fridays', value: 'only on Fridays' }],
    correctAnswer: 'no', points: 1, orderIndex: 43, tags: ['signs', 'rules']
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Office Notice',
    passage: 'OFFICE RULES: No food at desks. No personal calls during meetings. Open from 8 AM to 6 PM. All visitors must sign in at reception.',
    questionText: 'What time does the office close?',
    options: [{ label: '5 PM', value: '5 PM' }, { label: '6 PM', value: '6 PM' }, { label: '7 PM', value: '7 PM' }, { label: '8 PM', value: '8 PM' }],
    correctAnswer: '6 PM', points: 1, orderIndex: 44, tags: ['signs', 'time']
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'READING', skill: 'READING',
    passageTitle: 'My Desk',
    passage: 'I have a desk at work. It is near the window. The desk is big and white. I have a computer and a phone on my desk. I also have a cup of coffee. I like my desk very much.',
    questionText: 'What is on the desk?',
    options: [{ label: 'Books and papers', value: 'books and papers' }, { label: 'A computer and a phone', value: 'a computer and a phone' }, { label: 'A lamp and a plant', value: 'a lamp and a plant' }, { label: 'Folders and pens', value: 'folders and pens' }],
    correctAnswer: 'a computer and a phone', points: 1, orderIndex: 45, tags: ['office', 'objects']
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'READING', skill: 'READING',
    passageTitle: 'My Desk',
    passage: 'I have a desk at work. It is near the window. The desk is big and white. I have a computer and a phone on my desk. I also have a cup of coffee. I like my desk very much.',
    questionText: 'Where is the desk?',
    options: [{ label: 'Near the door', value: 'near the door' }, { label: 'In the corridor', value: 'in the corridor' }, { label: 'Near the window', value: 'near the window' }, { label: 'In the meeting room', value: 'in the meeting room' }],
    correctAnswer: 'near the window', points: 1, orderIndex: 46, tags: ['office', 'location']
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'READING', skill: 'READING',
    passageTitle: 'An Office Note',
    passage: 'Dear colleagues, I am at the client meeting. There is no toner in the printer. I will buy toner and paper. I will be back at 3. Best, Marco.',
    questionText: 'Where is Marco?',
    options: [{ label: 'At home', value: 'at home' }, { label: 'At a client meeting', value: 'at a client meeting' }, { label: 'At the supermarket', value: 'at the supermarket' }, { label: 'At the bank', value: 'at the bank' }],
    correctAnswer: 'at a client meeting', points: 1, orderIndex: 47, tags: ['notes', 'workplace']
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'READING', skill: 'READING',
    passageTitle: 'An Office Note',
    passage: 'Dear colleagues, I am at the client meeting. There is no toner in the printer. I will buy toner and paper. I will be back at 3. Best, Marco.',
    questionText: 'What will Marco buy?',
    options: [{ label: 'Coffee and cups', value: 'coffee and cups' }, { label: 'Toner and paper', value: 'toner and paper' }, { label: 'Pens and notebooks', value: 'pens and notebooks' }, { label: 'Folders and clips', value: 'folders and clips' }],
    correctAnswer: 'toner and paper', points: 1, orderIndex: 48, tags: ['notes', 'office supplies']
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'Dear colleagues, I am at the client meeting. There is no toner in the printer. I will buy toner and paper. I will be back at 3.',
    questionText: 'Marco will be back at ___.',
    correctAnswer: '3', points: 1, orderIndex: 49, tags: ['notes', 'time']
  },

  // ============================================================
  // A2 — Elementary (50-56)
  // ============================================================
  {
    language: 'English', cefrLevel: 'A2', questionType: 'READING', skill: 'READING',
    passageTitle: 'A Job Advert',
    passage: 'WANTED: Waiter/Waitress for busy restaurant. Part-time, weekends only. Experience preferred but not essential. Must speak English. Good pay and free meals. Call 020-555-1234 to apply.',
    questionText: 'When is the job?',
    options: [{ label: 'Every day', value: 'every day' }, { label: 'Weekdays only', value: 'weekdays only' }, { label: 'Weekends only', value: 'weekends only' }, { label: 'Monday to Friday', value: 'Monday to Friday' }],
    correctAnswer: 'weekends only', points: 1, orderIndex: 50, tags: ['jobs', 'adverts']
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'READING', skill: 'READING',
    passageTitle: 'A Job Advert',
    passage: 'WANTED: Waiter/Waitress for busy restaurant. Part-time, weekends only. Experience preferred but not essential. Must speak English. Good pay and free meals. Call 020-555-1234 to apply.',
    questionText: 'Do you need experience for this job?',
    options: [{ label: 'Yes, it is required', value: 'yes required' }, { label: 'No, but it is preferred', value: 'no but preferred' }, { label: 'Yes, five years minimum', value: 'five years' }, { label: 'No, experience is not mentioned', value: 'not mentioned' }],
    correctAnswer: 'no but preferred', points: 1, orderIndex: 51, tags: ['jobs', 'adverts']
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'READING', skill: 'READING',
    passageTitle: 'At the Doctor',
    passage: 'Mark went to the doctor because he had a bad cough. The doctor listened to his chest and checked his temperature. She said he had a cold and needed to rest for a few days. She also told him to drink lots of water and take some medicine twice a day.',
    questionText: 'What was wrong with Mark?',
    options: [{ label: 'He broke his arm', value: 'broke arm' }, { label: 'He had a cold', value: 'had a cold' }, { label: 'He had a headache', value: 'headache' }, { label: 'He hurt his leg', value: 'hurt leg' }],
    correctAnswer: 'had a cold', points: 1, orderIndex: 52, tags: ['health', 'doctor']
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'READING', skill: 'READING',
    passageTitle: 'At the Doctor',
    passage: 'Mark went to the doctor because he had a bad cough. The doctor listened to his chest and checked his temperature. She said he had a cold and needed to rest for a few days. She also told him to drink lots of water and take some medicine twice a day.',
    questionText: 'How often should Mark take the medicine?',
    options: [{ label: 'Once a day', value: 'once a day' }, { label: 'Twice a day', value: 'twice a day' }, { label: 'Three times a day', value: 'three times' }, { label: 'Every hour', value: 'every hour' }],
    correctAnswer: 'twice a day', points: 1, orderIndex: 53, tags: ['health', 'frequency']
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Team Lunch',
    passage: 'Hi James, Are you free this Friday? Our department is having a team lunch at the Italian restaurant on Park Street. There will be pasta, salads, and dessert. The new project manager is coming too — you met her at the conference last month. It starts at 1 PM. Let me know! Best, Daniel',
    questionText: 'What kind of event is it?',
    options: [{ label: 'A conference', value: 'conference' }, { label: 'A team lunch', value: 'a team lunch' }, { label: 'A training session', value: 'training' }, { label: 'A workshop', value: 'workshop' }],
    correctAnswer: 'a team lunch', points: 1, orderIndex: 54, tags: ['workplace', 'invitations']
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Team Lunch',
    passage: 'Hi James, Are you free this Friday? Our department is having a team lunch at the Italian restaurant on Park Street. There will be pasta, salads, and dessert. The new project manager is coming too — you met her at the conference last month. It starts at 1 PM. Let me know! Best, Daniel',
    questionText: 'When does the team lunch start?',
    options: [{ label: '12 PM', value: '12 PM' }, { label: '1 PM', value: '1 PM' }, { label: '2 PM', value: '2 PM' }, { label: '3 PM', value: '3 PM' }],
    correctAnswer: '1 PM', points: 1, orderIndex: 55, tags: ['workplace', 'time']
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'Hi James, Our department is having a team lunch at the Italian restaurant on Park Street. There will be pasta, salads, and dessert.',
    questionText: 'The team lunch is at the ___ restaurant.',
    correctAnswer: 'Italian', points: 1, orderIndex: 56, tags: ['workplace', 'places']
  },

  // ============================================================
  // B1 — Intermediate (57-63)
  // ============================================================
  {
    language: 'English', cefrLevel: 'B1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Online Shopping',
    passage: 'Online shopping has become increasingly popular over the past decade. Consumers enjoy the convenience of browsing products from home and having them delivered to their door. However, there are drawbacks. Customers cannot try on clothes or test products before buying. Returns can be complicated, and delivery costs sometimes make online prices less competitive. Despite these issues, online retail continues to grow year after year.',
    questionText: 'What is one drawback of online shopping mentioned in the text?',
    options: [
      { label: 'Products are always expensive', value: 'always expensive' },
      { label: 'You cannot try on clothes before buying', value: 'cannot try on clothes' },
      { label: 'Delivery is always free', value: 'delivery always free' },
      { label: 'There are too few products available', value: 'too few products' }
    ],
    correctAnswer: 'cannot try on clothes', points: 1, orderIndex: 57, tags: ['shopping', 'technology']
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Online Shopping',
    passage: 'Online shopping has become increasingly popular over the past decade. Consumers enjoy the convenience of browsing products from home and having them delivered to their door. However, there are drawbacks. Customers cannot try on clothes or test products before buying. Returns can be complicated, and delivery costs sometimes make online prices less competitive.',
    questionText: 'Why might online prices sometimes be less competitive?',
    options: [
      { label: 'Because products are lower quality', value: 'lower quality' },
      { label: 'Because of delivery costs', value: 'delivery costs' },
      { label: 'Because shops offer bigger discounts', value: 'bigger discounts' },
      { label: 'Because taxes are higher online', value: 'higher taxes' }
    ],
    correctAnswer: 'delivery costs', points: 1, orderIndex: 58, tags: ['shopping', 'economics']
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Volunteering Abroad',
    passage: 'More and more young people are choosing to volunteer abroad before starting university. Popular destinations include Southeast Asia, Africa, and South America. Volunteers help with teaching English, building schools, and protecting wildlife. While the experience is rewarding, critics argue that some programs do more harm than good. Unskilled volunteers may take jobs from local workers, and short stays rarely create lasting change.',
    questionText: 'What criticism is made of volunteering abroad?',
    options: [
      { label: 'It is too expensive', value: 'too expensive' },
      { label: 'Unskilled volunteers may take jobs from locals', value: 'take jobs from locals' },
      { label: 'Volunteers learn nothing', value: 'learn nothing' },
      { label: 'There are no popular destinations', value: 'no destinations' }
    ],
    correctAnswer: 'take jobs from locals', points: 1, orderIndex: 59, tags: ['volunteering', 'social issues']
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Volunteering Abroad',
    passage: 'More and more young people are choosing to volunteer abroad before starting university. Popular destinations include Southeast Asia, Africa, and South America. Volunteers help with teaching English, building schools, and protecting wildlife.',
    questionText: 'What do volunteers help with?',
    options: [
      { label: 'Cooking and cleaning', value: 'cooking and cleaning' },
      { label: 'Teaching English and building schools', value: 'teaching and building' },
      { label: 'Farming and fishing', value: 'farming and fishing' },
      { label: 'Selling products', value: 'selling products' }
    ],
    correctAnswer: 'teaching and building', points: 1, orderIndex: 60, tags: ['volunteering']
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Sleep Habits',
    passage: 'Most experts recommend that adults get between seven and nine hours of sleep per night. However, a recent study found that nearly a third of adults in the UK sleep fewer than six hours. Poor sleep can lead to weight gain, a weakened immune system, and difficulty concentrating. Simple changes — such as avoiding screens before bed, keeping a regular schedule, and reducing caffeine intake — can significantly improve sleep quality.',
    questionText: 'How many hours of sleep do experts recommend for adults?',
    options: [
      { label: '5 to 7 hours', value: '5 to 7' },
      { label: '6 to 8 hours', value: '6 to 8' },
      { label: '7 to 9 hours', value: '7 to 9' },
      { label: '8 to 10 hours', value: '8 to 10' }
    ],
    correctAnswer: '7 to 9', points: 1, orderIndex: 61, tags: ['health', 'sleep']
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'Simple changes — such as avoiding screens before bed, keeping a regular schedule, and reducing caffeine intake — can significantly improve sleep quality.',
    questionText: 'Reducing ___ intake can help improve sleep quality.',
    correctAnswer: 'caffeine', points: 1, orderIndex: 62, tags: ['health', 'sleep']
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Sleep Habits',
    passage: 'A recent study found that nearly a third of adults in the UK sleep fewer than six hours. Poor sleep can lead to weight gain, a weakened immune system, and difficulty concentrating.',
    questionText: 'What fraction of UK adults sleep fewer than six hours?',
    options: [
      { label: 'A quarter', value: 'a quarter' },
      { label: 'A third', value: 'a third' },
      { label: 'Half', value: 'half' },
      { label: 'Two thirds', value: 'two thirds' }
    ],
    correctAnswer: 'a third', points: 1, orderIndex: 63, tags: ['health', 'statistics']
  },

  // ============================================================
  // B2 — Upper Intermediate (64-69)
  // ============================================================
  {
    language: 'English', cefrLevel: 'B2', questionType: 'READING', skill: 'READING',
    passageTitle: 'The Future of Work',
    passage: 'Automation and artificial intelligence are expected to transform the labor market significantly over the coming decades. While some jobs will be replaced entirely, others will be augmented — workers will use AI tools to become more productive rather than being displaced. The World Economic Forum estimates that by 2030, 85 million jobs may be displaced by technology, but 97 million new roles could emerge that are better adapted to the new division of labor between humans and machines.',
    questionText: 'According to the World Economic Forum, will technology create or destroy more jobs by 2030?',
    options: [
      { label: 'Destroy more jobs', value: 'destroy more' },
      { label: 'Create more jobs', value: 'create more' },
      { label: 'Have no effect', value: 'no effect' },
      { label: 'The report does not say', value: 'does not say' }
    ],
    correctAnswer: 'create more', points: 2, orderIndex: 64, tags: ['technology', 'work']
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'READING', skill: 'READING',
    passageTitle: 'The Future of Work',
    passage: 'While some jobs will be replaced entirely, others will be augmented — workers will use AI tools to become more productive rather than being displaced.',
    questionText: 'What does "augmented" mean in this context?',
    options: [
      { label: 'Eliminated', value: 'eliminated' },
      { label: 'Enhanced by technology', value: 'enhanced by technology' },
      { label: 'Made more difficult', value: 'more difficult' },
      { label: 'Automated completely', value: 'automated' }
    ],
    correctAnswer: 'enhanced by technology', points: 2, orderIndex: 65, tags: ['vocabulary', 'technology']
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Social Media and Democracy',
    passage: 'Social media has fundamentally changed political communication. Politicians can now reach millions of voters directly, bypassing traditional media gatekeepers. This democratization of communication has enabled grassroots movements to organize more effectively. However, the same platforms have also facilitated the spread of misinformation and deepened political polarization, as algorithms prioritize engaging content over accurate content. Several democracies are now grappling with how to regulate these platforms without undermining free speech.',
    questionText: 'According to the text, what do algorithms prioritize?',
    options: [
      { label: 'Accurate content', value: 'accurate content' },
      { label: 'Engaging content', value: 'engaging content' },
      { label: 'Political content', value: 'political content' },
      { label: 'Educational content', value: 'educational content' }
    ],
    correctAnswer: 'engaging content', points: 2, orderIndex: 66, tags: ['media', 'politics']
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Social Media and Democracy',
    passage: 'Several democracies are now grappling with how to regulate these platforms without undermining free speech. Politicians can now reach millions of voters directly, bypassing traditional media gatekeepers.',
    questionText: 'What challenge do democracies face regarding social media?',
    options: [
      { label: 'Making platforms more expensive', value: 'more expensive' },
      { label: 'Regulating platforms without undermining free speech', value: 'regulating without undermining free speech' },
      { label: 'Banning all political content', value: 'banning political content' },
      { label: 'Replacing social media with traditional media', value: 'replacing' }
    ],
    correctAnswer: 'regulating without undermining free speech', points: 2, orderIndex: 67, tags: ['media', 'democracy']
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'Social media has fundamentally changed political communication. Politicians can now reach millions of voters directly, bypassing traditional media gatekeepers.',
    questionText: 'Politicians can bypass traditional media ___.',
    correctAnswer: 'gatekeepers', points: 2, orderIndex: 68, tags: ['media', 'vocabulary']
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Bilingualism and the Brain',
    passage: 'Research suggests that bilingual individuals may have certain cognitive advantages over monolinguals. Studies have shown that managing two languages strengthens executive function — the mental processes responsible for planning, focusing attention, and switching between tasks. Some researchers also believe that bilingualism may delay the onset of dementia by several years, although this remains a subject of ongoing investigation.',
    questionText: 'What cognitive benefit of bilingualism is mentioned?',
    options: [
      { label: 'Better mathematical skills', value: 'math skills' },
      { label: 'Stronger executive function', value: 'stronger executive function' },
      { label: 'Improved musical ability', value: 'musical ability' },
      { label: 'Faster reading speed', value: 'faster reading' }
    ],
    correctAnswer: 'stronger executive function', points: 2, orderIndex: 69, tags: ['linguistics', 'brain']
  },

  // ============================================================
  // C1 — Advanced (70-76)
  // ============================================================
  {
    language: 'English', cefrLevel: 'C1', questionType: 'READING', skill: 'READING',
    passageTitle: 'The Paradox of Choice',
    passage: 'In "The Paradox of Choice," psychologist Barry Schwartz argues that an abundance of options does not necessarily lead to greater satisfaction. While a certain degree of choice is essential for autonomy, too many options can lead to decision paralysis, increased anxiety, and diminished satisfaction with the choices we do make. Schwartz distinguishes between "maximizers" — those who exhaustively search for the best possible option — and "satisficers" — those who settle for an option that meets their criteria. Research consistently shows that satisficers tend to be happier than maximizers, despite often making objectively similar choices.',
    questionText: 'According to Schwartz, who tends to be happier?',
    options: [
      { label: 'Maximizers', value: 'maximizers' },
      { label: 'Satisficers', value: 'satisficers' },
      { label: 'Both are equally happy', value: 'equally happy' },
      { label: 'Neither — happiness is unrelated to choice', value: 'unrelated' }
    ],
    correctAnswer: 'satisficers', points: 2, orderIndex: 70, tags: ['psychology', 'decision making']
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'READING', skill: 'READING',
    passageTitle: 'The Paradox of Choice',
    passage: 'While a certain degree of choice is essential for autonomy, too many options can lead to decision paralysis, increased anxiety, and diminished satisfaction with the choices we do make.',
    questionText: 'What negative effects of too many choices are mentioned?',
    options: [
      { label: 'Boredom and fatigue', value: 'boredom and fatigue' },
      { label: 'Decision paralysis, anxiety, and diminished satisfaction', value: 'paralysis, anxiety, diminished satisfaction' },
      { label: 'Anger and frustration', value: 'anger and frustration' },
      { label: 'Depression and loneliness', value: 'depression and loneliness' }
    ],
    correctAnswer: 'paralysis, anxiety, diminished satisfaction', points: 2, orderIndex: 71, tags: ['psychology']
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Rewilding',
    passage: 'Rewilding is a conservation strategy that seeks to restore ecosystems by reintroducing species that have been lost, allowing natural processes to resume. The reintroduction of wolves to Yellowstone National Park in 1995 is often cited as a landmark example. The wolves\' presence triggered a trophic cascade: they reduced the elk population, which allowed vegetation to recover along riverbanks, stabilizing the soil and changing the course of rivers. Critics, however, argue that rewilding can create conflicts with agricultural communities and that ecosystems have already adapted to the absence of keystone species.',
    questionText: 'What is a "trophic cascade" as illustrated in the passage?',
    options: [
      { label: 'A type of waterfall', value: 'waterfall' },
      { label: 'A chain reaction through an ecosystem triggered by a predator', value: 'chain reaction through ecosystem' },
      { label: 'A method of planting trees', value: 'planting trees' },
      { label: 'A government environmental policy', value: 'policy' }
    ],
    correctAnswer: 'chain reaction through ecosystem', points: 2, orderIndex: 72, tags: ['environment', 'ecology']
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Rewilding',
    passage: 'Critics argue that rewilding can create conflicts with agricultural communities and that ecosystems have already adapted to the absence of keystone species.',
    questionText: 'What concern do critics of rewilding raise?',
    options: [
      { label: 'It is too expensive', value: 'too expensive' },
      { label: 'Conflicts with agricultural communities', value: 'conflicts with agriculture' },
      { label: 'Animals will go extinct again', value: 'extinction' },
      { label: 'Tourists will damage the ecosystem', value: 'tourists' }
    ],
    correctAnswer: 'conflicts with agriculture', points: 2, orderIndex: 73, tags: ['environment', 'controversy']
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'The reintroduction of wolves to Yellowstone National Park in 1995 is often cited as a landmark example of rewilding.',
    questionText: 'Wolves were reintroduced to ___ National Park in 1995.',
    correctAnswer: 'Yellowstone', points: 2, orderIndex: 74, tags: ['environment', 'facts']
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'READING', skill: 'READING',
    passageTitle: 'The Attention Economy',
    passage: 'In the attention economy, human attention is treated as a scarce commodity. Technology companies compete fiercely to capture and retain users\' attention through persuasive design techniques: infinite scrolling, autoplay videos, push notifications, and variable reward schedules borrowed from slot machine design. Former tech insiders have raised alarms about the psychological consequences, noting that these systems exploit cognitive vulnerabilities to create compulsive usage patterns that many users experience as addictive.',
    questionText: 'What design technique from gambling is mentioned?',
    options: [
      { label: 'Card counting algorithms', value: 'card counting' },
      { label: 'Variable reward schedules from slot machines', value: 'variable reward schedules' },
      { label: 'Poker probability models', value: 'poker models' },
      { label: 'Roulette randomization', value: 'roulette' }
    ],
    correctAnswer: 'variable reward schedules', points: 2, orderIndex: 75, tags: ['technology', 'psychology']
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'READING', skill: 'READING',
    passageTitle: 'The Attention Economy',
    passage: 'Former tech insiders have raised alarms about the psychological consequences, noting that these systems exploit cognitive vulnerabilities to create compulsive usage patterns that many users experience as addictive.',
    questionText: 'What do the systems exploit, according to former tech insiders?',
    options: [
      { label: 'Financial vulnerabilities', value: 'financial' },
      { label: 'Cognitive vulnerabilities', value: 'cognitive vulnerabilities' },
      { label: 'Physical limitations', value: 'physical' },
      { label: 'Social pressures', value: 'social pressures' }
    ],
    correctAnswer: 'cognitive vulnerabilities', points: 2, orderIndex: 76, tags: ['technology', 'psychology']
  },

  // ============================================================
  // C2 — Proficiency (77-82)
  // ============================================================
  {
    language: 'English', cefrLevel: 'C2', questionType: 'READING', skill: 'READING',
    passageTitle: 'The Ship of Theseus',
    passage: 'The Ship of Theseus is a thought experiment in the metaphysics of identity. If a ship\'s planks are gradually replaced, one by one, until none of the original material remains, is it still the same ship? The paradox deepens if we further suppose that the removed planks are reassembled into a second vessel — which ship, if either, is the "real" Ship of Theseus? Thomas Hobbes extended this problem by noting its implications for personal identity: given that the cells in our bodies are constantly being replaced, are we the same person we were a decade ago? The question remains philosophically unresolved, exposing the tension between essentialist and nominalist conceptions of identity.',
    questionText: 'What deepens the paradox of the Ship of Theseus?',
    options: [
      { label: 'The ship sinks', value: 'sinks' },
      { label: 'The removed planks are reassembled into a second ship', value: 'reassembled into second ship' },
      { label: 'Nobody remembers the original ship', value: 'nobody remembers' },
      { label: 'The ship is painted a different color', value: 'different color' }
    ],
    correctAnswer: 'reassembled into second ship', points: 2, orderIndex: 77, tags: ['philosophy', 'identity']
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'READING', skill: 'READING',
    passageTitle: 'The Ship of Theseus',
    passage: 'Thomas Hobbes extended this problem by noting its implications for personal identity: given that the cells in our bodies are constantly being replaced, are we the same person we were a decade ago? The question remains philosophically unresolved, exposing the tension between essentialist and nominalist conceptions of identity.',
    questionText: 'What philosophical tension does the paradox expose?',
    options: [
      { label: 'Between materialism and idealism', value: 'materialism vs idealism' },
      { label: 'Between essentialist and nominalist conceptions of identity', value: 'essentialist vs nominalist' },
      { label: 'Between empiricism and rationalism', value: 'empiricism vs rationalism' },
      { label: 'Between determinism and free will', value: 'determinism vs free will' }
    ],
    correctAnswer: 'essentialist vs nominalist', points: 2, orderIndex: 78, tags: ['philosophy', 'metaphysics']
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'READING', skill: 'READING',
    passageTitle: 'The Banality of Evil',
    passage: 'Hannah Arendt\'s concept of "the banality of evil," formulated during her coverage of the Eichmann trial in Jerusalem, challenged prevailing assumptions about the nature of moral transgression. Arendt observed that Eichmann was not a monster driven by ideological fervor but rather a bureaucrat characterized by an inability or unwillingness to think critically about the moral implications of his actions. This "thoughtlessness," she argued, was far more dangerous than malice, because it enabled ordinary individuals to participate in systemic atrocities without experiencing moral conflict. The concept remains controversial: critics contend that Arendt underestimated Eichmann\'s ideological commitment and that her analysis risks trivializing the deliberate cruelty of the Holocaust.',
    questionText: 'According to Arendt, what made Eichmann dangerous?',
    options: [
      { label: 'His extreme ideology', value: 'extreme ideology' },
      { label: 'His thoughtlessness and failure to think critically', value: 'thoughtlessness' },
      { label: 'His desire for power', value: 'desire for power' },
      { label: 'His violent temperament', value: 'violent temperament' }
    ],
    correctAnswer: 'thoughtlessness', points: 2, orderIndex: 79, tags: ['philosophy', 'ethics', 'history']
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'READING', skill: 'READING',
    passageTitle: 'The Banality of Evil',
    passage: 'Critics contend that Arendt underestimated Eichmann\'s ideological commitment and that her analysis risks trivializing the deliberate cruelty of the Holocaust.',
    questionText: 'What do critics say about Arendt\'s analysis?',
    options: [
      { label: 'It was too harsh on Eichmann', value: 'too harsh' },
      { label: 'It risks trivializing the Holocaust\'s deliberate cruelty', value: 'risks trivializing' },
      { label: 'It was factually inaccurate', value: 'factually inaccurate' },
      { label: 'It was overly emotional', value: 'overly emotional' }
    ],
    correctAnswer: 'risks trivializing', points: 2, orderIndex: 80, tags: ['philosophy', 'ethics']
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'Hannah Arendt\'s concept of "the banality of evil" was formulated during her coverage of the Eichmann trial in Jerusalem.',
    questionText: 'Arendt formulated her concept during the ___ trial in Jerusalem.',
    correctAnswer: 'Eichmann', points: 2, orderIndex: 81, tags: ['philosophy', 'history']
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Wittgenstein on Language',
    passage: 'In his later work, "Philosophical Investigations," Wittgenstein repudiated much of his earlier "Tractatus Logico-Philosophicus," abandoning the picture theory of meaning in favor of a more pragmatic account. He introduced the concept of "language games" to illustrate that the meaning of a word is not a fixed entity but rather a function of its use within particular forms of life. The famous dictum "the meaning of a word is its use in the language" implies that understanding requires not just knowing definitions but grasping the social practices within which words operate. This insight has profoundly influenced pragmatics, sociolinguistics, and the philosophy of mind.',
    questionText: 'What does Wittgenstein\'s concept of "language games" suggest about meaning?',
    options: [
      { label: 'Meaning is fixed and universal', value: 'fixed and universal' },
      { label: 'Meaning is a function of use within forms of life', value: 'function of use' },
      { label: 'Meaning can only be found in dictionaries', value: 'dictionaries' },
      { label: 'Meaning is irrelevant to communication', value: 'irrelevant' }
    ],
    correctAnswer: 'function of use', points: 2, orderIndex: 82, tags: ['philosophy', 'linguistics']
  },

  // ===== PROFESSIONAL / WORKPLACE READING QUESTIONS =====

  // --- A1: Office email about a meeting time change ---
  {
    language: 'English', cefrLevel: 'A1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Meeting Time Change',
    passage: 'Dear Team, The meeting on Wednesday is now at 3:00 PM, not 2:00 PM. The meeting room is Room 5B. Please bring your laptop. Thank you, David.',
    questionText: 'What time is the meeting now?',
    options: [
      { label: '2:00 PM', value: '2:00 PM' },
      { label: '3:00 PM', value: '3:00 PM' },
      { label: '5:00 PM', value: '5:00 PM' },
      { label: '1:00 PM', value: '1:00 PM' }
    ],
    correctAnswer: '3:00 PM', points: 1, orderIndex: 83, tags: ['business email', 'workplace']
  },

  // --- A1: Restaurant menu for a business lunch ---
  {
    language: 'English', cefrLevel: 'A1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Business Lunch Menu',
    passage: 'Today\'s Lunch Menu — Café Roma. Soup of the day: Tomato — €4.50. Grilled chicken with salad — €9.00. Pasta with vegetables — €7.50. Coffee or tea included with every meal.',
    questionText: 'How much is the grilled chicken with salad?',
    options: [
      { label: '€4.50', value: '€4.50' },
      { label: '€7.50', value: '€7.50' },
      { label: '€9.00', value: '€9.00' },
      { label: '€12.00', value: '€12.00' }
    ],
    correctAnswer: '€9.00', points: 1, orderIndex: 84, tags: ['business lunch', 'workplace']
  },

  // --- A1: Hotel check-in information card ---
  {
    language: 'English', cefrLevel: 'A1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Hotel Check-In Card',
    passage: 'Welcome to Grand Hotel. Your room is 412. Breakfast is from 7:00 to 10:00 AM in the restaurant on the first floor. Wi-Fi password: GRAND2024. Check-out is at 11:00 AM.',
    questionText: 'What is the Wi-Fi password?',
    options: [
      { label: 'HOTEL2024', value: 'HOTEL2024' },
      { label: 'GRAND2024', value: 'GRAND2024' },
      { label: 'ROOM412', value: 'ROOM412' },
      { label: 'WELCOME', value: 'WELCOME' }
    ],
    correctAnswer: 'GRAND2024', points: 1, orderIndex: 85, tags: ['business travel', 'hotel']
  },

  // --- A1: Simple work schedule ---
  {
    language: 'English', cefrLevel: 'A1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Weekly Work Schedule',
    passage: 'Work Schedule — Week 12. Monday to Wednesday: 9:00 AM – 5:00 PM. Thursday: Day off. Friday: 9:00 AM – 1:00 PM. Saturday and Sunday: Closed.',
    questionText: 'When is the day off?',
    options: [
      { label: 'Monday', value: 'Monday' },
      { label: 'Wednesday', value: 'Wednesday' },
      { label: 'Thursday', value: 'Thursday' },
      { label: 'Friday', value: 'Friday' }
    ],
    correctAnswer: 'Thursday', points: 1, orderIndex: 86, tags: ['work schedule', 'workplace']
  },

  // --- A2: Job advertisement for a receptionist ---
  {
    language: 'English', cefrLevel: 'A2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Job Advertisement',
    passage: 'We are looking for a receptionist for our office in Milan. You must speak English and Italian. Working hours are Monday to Friday, 8:30 AM to 5:30 PM. Experience with Microsoft Office is required. Please send your CV to hr@globaltech.com before March 30th.',
    questionText: 'What languages must the receptionist speak?',
    options: [
      { label: 'English and French', value: 'English and French' },
      { label: 'English and Italian', value: 'English and Italian' },
      { label: 'Italian and German', value: 'Italian and German' },
      { label: 'English and Spanish', value: 'English and Spanish' }
    ],
    correctAnswer: 'English and Italian', points: 1, orderIndex: 87, tags: ['job advertisement', 'workplace']
  },

  // --- A2: Email declining a meeting invitation ---
  {
    language: 'English', cefrLevel: 'A2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Meeting Decline Email',
    passage: 'Hi Marco, Thank you for the invitation to the sales meeting on Tuesday at 10:00 AM. Unfortunately, I cannot attend because I have a client visit at that time. Could you please send me the meeting notes afterwards? Best regards, Anna Fischer.',
    questionText: 'Why can Anna not attend the meeting?',
    options: [
      { label: 'She is on holiday', value: 'She is on holiday' },
      { label: 'She has a client visit', value: 'She has a client visit' },
      { label: 'She is feeling unwell', value: 'She is feeling unwell' },
      { label: 'She has another meeting with her manager', value: 'She has another meeting with her manager' }
    ],
    correctAnswer: 'She has a client visit', points: 1, orderIndex: 88, tags: ['business email', 'workplace']
  },

  // --- A2: Company holiday notice ---
  {
    language: 'English', cefrLevel: 'A2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Office Closure Notice',
    passage: 'Please note that the office will be closed from December 23rd to January 2nd for the holiday period. The last working day is December 22nd. If you need help during this time, please email support@brightcorp.com. We wish everyone a happy holiday season.',
    questionText: 'What is the last working day before the holidays?',
    options: [
      { label: 'December 20th', value: 'December 20th' },
      { label: 'December 22nd', value: 'December 22nd' },
      { label: 'December 23rd', value: 'December 23rd' },
      { label: 'January 2nd', value: 'January 2nd' }
    ],
    correctAnswer: 'December 22nd', points: 1, orderIndex: 89, tags: ['company notice', 'workplace']
  },

  // --- A2: Instructions for using the office coffee machine ---
  {
    language: 'English', cefrLevel: 'A2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Coffee Machine Instructions',
    passage: 'How to use the coffee machine: 1. Place your cup under the nozzle. 2. Press the blue button for espresso or the green button for cappuccino. 3. Wait 30 seconds. 4. Please clean the drip tray at the end of each day. If the machine shows a red light, contact Facilities at ext. 220.',
    questionText: 'What should you do if you see a red light on the machine?',
    options: [
      { label: 'Press the blue button', value: 'Press the blue button' },
      { label: 'Clean the drip tray', value: 'Clean the drip tray' },
      { label: 'Contact Facilities at ext. 220', value: 'Contact Facilities at ext. 220' },
      { label: 'Wait 30 seconds', value: 'Wait 30 seconds' }
    ],
    correctAnswer: 'Contact Facilities at ext. 220', points: 1, orderIndex: 90, tags: ['office instructions', 'workplace']
  },

  // --- B1: Email about a project deadline extension ---
  {
    language: 'English', cefrLevel: 'B1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Project Update Email',
    passage: 'Dear Team, I am writing to inform you that the deadline for the Q3 report has been extended to October 15th. Several team members have reported challenges with data collection due to the system migration last week. Please use this extra time to ensure accuracy in your submissions. If you have any questions, contact your department lead. Best regards, Sarah Chen, Project Manager.',
    questionText: 'Why was the deadline for the Q3 report extended?',
    options: [
      { label: 'The manager was on holiday', value: 'The manager was on holiday' },
      { label: 'There were problems with data collection due to the system migration', value: 'There were problems with data collection due to the system migration' },
      { label: 'The client requested changes to the report format', value: 'The client requested changes to the report format' },
      { label: 'The team wanted more time for a celebration', value: 'The team wanted more time for a celebration' }
    ],
    correctAnswer: 'There were problems with data collection due to the system migration', points: 1, orderIndex: 91, tags: ['business email', 'workplace']
  },

  // --- B1: Article about remote work vs office work ---
  {
    language: 'English', cefrLevel: 'B1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Remote Work vs Office Work',
    passage: 'A recent survey of 2,000 employees found that 65% prefer a hybrid work model, combining remote and office days. Workers said they are more productive at home because there are fewer interruptions. However, many also said they miss face-to-face interactions with colleagues. Companies are now experimenting with "collaboration days" where teams come to the office on the same days to meet and plan together. Experts say the key is flexibility — letting employees choose what works best for their role.',
    questionText: 'What do most employees prefer according to the survey?',
    options: [
      { label: 'Working fully from home', value: 'Working fully from home' },
      { label: 'A hybrid work model', value: 'A hybrid work model' },
      { label: 'Working only from the office', value: 'Working only from the office' },
      { label: 'Changing jobs every year', value: 'Changing jobs every year' }
    ],
    correctAnswer: 'A hybrid work model', points: 1, orderIndex: 92, tags: ['remote work', 'workplace trends']
  },

  // --- B1: Company newsletter about a new employee benefit ---
  {
    language: 'English', cefrLevel: 'B1', questionType: 'READING', skill: 'READING',
    passageTitle: 'New Employee Benefit Announcement',
    passage: 'We are excited to announce a new wellness benefit for all full-time employees starting January 1st. The company will now cover up to €500 per year for gym memberships, yoga classes, or mental health counselling. To use this benefit, employees must submit receipts through the HR portal within 30 days of payment. This initiative is part of our commitment to supporting employee well-being. For more details, please visit the Benefits section on the company intranet.',
    questionText: 'How can employees use the new wellness benefit?',
    options: [
      { label: 'By asking their manager for approval', value: 'By asking their manager for approval' },
      { label: 'By submitting receipts through the HR portal', value: 'By submitting receipts through the HR portal' },
      { label: 'By visiting the company gym', value: 'By visiting the company gym' },
      { label: 'By attending a mandatory workshop', value: 'By attending a mandatory workshop' }
    ],
    correctAnswer: 'By submitting receipts through the HR portal', points: 1, orderIndex: 93, tags: ['company benefits', 'workplace']
  },

  // --- B1: Travel policy document ---
  {
    language: 'English', cefrLevel: 'B1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Business Travel Policy',
    passage: 'All business travel must be approved by your line manager at least two weeks before the trip. Economy class flights should be booked for trips under five hours. Hotel costs must not exceed €150 per night. Employees should use the company travel portal to book flights and hotels. Meals during travel are reimbursed up to €45 per day. All receipts must be submitted within 10 working days of your return.',
    questionText: 'What is the maximum hotel cost allowed per night?',
    options: [
      { label: '€100', value: '€100' },
      { label: '€120', value: '€120' },
      { label: '€150', value: '€150' },
      { label: '€200', value: '€200' }
    ],
    correctAnswer: '€150', points: 1, orderIndex: 94, tags: ['travel policy', 'workplace']
  },

  // --- B2: Article about leadership styles ---
  {
    language: 'English', cefrLevel: 'B2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Leadership Styles in Modern Companies',
    passage: 'The traditional command-and-control leadership model is increasingly being replaced by more collaborative approaches. Transformational leaders, who inspire and motivate their teams by articulating a compelling vision, have been shown to drive higher levels of employee engagement. Servant leadership, where the leader\'s primary role is to support their team members\' growth and development, has gained popularity in technology companies. However, research suggests that no single style is universally effective; the best leaders adapt their approach depending on the situation, the maturity of the team, and the nature of the task. This concept, known as situational leadership, requires emotional intelligence and a deep understanding of team dynamics.',
    questionText: 'According to the article, what does situational leadership require?',
    options: [
      { label: 'A strict set of rules for every situation', value: 'A strict set of rules for every situation' },
      { label: 'Emotional intelligence and understanding of team dynamics', value: 'Emotional intelligence and understanding of team dynamics' },
      { label: 'Experience only in the technology sector', value: 'Experience only in the technology sector' },
      { label: 'A single consistent leadership approach', value: 'A single consistent leadership approach' }
    ],
    correctAnswer: 'Emotional intelligence and understanding of team dynamics', points: 2, orderIndex: 95, tags: ['leadership', 'management']
  },

  // --- B2: Report on employee satisfaction survey ---
  {
    language: 'English', cefrLevel: 'B2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Employee Satisfaction Survey Results',
    passage: 'The annual employee satisfaction survey, completed by 87% of staff, reveals several notable trends. Overall satisfaction has risen from 72% to 78% compared to last year, driven largely by improvements in management communication and flexible working arrangements. However, career development opportunities remain the lowest-rated category at 58%, with many respondents expressing frustration at the lack of clear promotion pathways. The HR department has proposed a mentorship programme and quarterly career development workshops to address these concerns. Additionally, 40% of respondents highlighted that workload distribution remains uneven across departments.',
    questionText: 'What is the lowest-rated area in the survey?',
    options: [
      { label: 'Management communication', value: 'Management communication' },
      { label: 'Flexible working arrangements', value: 'Flexible working arrangements' },
      { label: 'Career development opportunities', value: 'Career development opportunities' },
      { label: 'Workload distribution', value: 'Workload distribution' }
    ],
    correctAnswer: 'Career development opportunities', points: 2, orderIndex: 96, tags: ['employee survey', 'HR']
  },

  // --- B2: Work-life balance trends ---
  {
    language: 'English', cefrLevel: 'B2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Work-Life Balance Trends Across Europe',
    passage: 'A comprehensive study by the European Foundation for the Improvement of Living and Working Conditions found significant variations in work-life balance across EU member states. Nordic countries consistently rank highest, with shorter average working hours and generous parental leave policies. In contrast, Southern European nations report longer working hours but also benefit from stronger family support networks. The study also identified a growing trend toward four-day work weeks, with pilot programmes in Belgium, Spain, and the UK showing promising results — productivity remained stable or improved, while employee burnout decreased by 30%. Critics argue, however, that such models are primarily suited to knowledge-based industries and may not be feasible in sectors like healthcare or manufacturing.',
    questionText: 'What did pilot programmes for four-day work weeks show?',
    options: [
      { label: 'Productivity dropped significantly', value: 'Productivity dropped significantly' },
      { label: 'Productivity remained stable or improved and burnout decreased', value: 'Productivity remained stable or improved and burnout decreased' },
      { label: 'Employees preferred to work five days', value: 'Employees preferred to work five days' },
      { label: 'Only manufacturing companies benefited', value: 'Only manufacturing companies benefited' }
    ],
    correctAnswer: 'Productivity remained stable or improved and burnout decreased', points: 2, orderIndex: 97, tags: ['work-life balance', 'European trends']
  },

  // --- B2: Business proposal executive summary ---
  {
    language: 'English', cefrLevel: 'B2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Executive Summary: Market Expansion Proposal',
    passage: 'This proposal outlines a strategy for expanding into the DACH region (Germany, Austria, and Switzerland) over the next 18 months. Market research indicates a strong demand for our SaaS platform among mid-sized enterprises in the manufacturing sector, with an estimated addressable market of €45 million annually. The proposed approach involves establishing a regional sales office in Munich, hiring a team of five local sales representatives, and partnering with two established consulting firms for channel distribution. The total investment required is €1.2 million, with a projected break-even point at 14 months. Key risks include regulatory differences across the three markets and competition from established local providers.',
    questionText: 'When is the projected break-even point for this expansion?',
    options: [
      { label: '6 months', value: '6 months' },
      { label: '14 months', value: '14 months' },
      { label: '18 months', value: '18 months' },
      { label: '24 months', value: '24 months' }
    ],
    correctAnswer: '14 months', points: 2, orderIndex: 98, tags: ['business proposal', 'strategy']
  },

  // --- C1: Cross-cultural negotiation strategies ---
  {
    language: 'English', cefrLevel: 'C1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Cross-Cultural Negotiation Strategies',
    passage: 'Effective cross-cultural negotiation requires far more than linguistic proficiency; it demands an understanding of deeply embedded cultural frameworks that shape how trust is built, decisions are made, and agreements are reached. In high-context cultures, such as Japan and many Middle Eastern countries, relationship-building often precedes any discussion of terms, and silence during negotiations may signal contemplation rather than disagreement. Conversely, low-context cultures, including the United States and Germany, tend to prioritise directness, data-driven arguments, and written contracts. Research by Erin Meyer at INSEAD has demonstrated that even within Europe, significant differences exist — French negotiators, for instance, often engage in intellectual debate as part of the process, while Scandinavian counterparts favour consensus-building and may perceive confrontational tactics as counterproductive. Understanding these nuances can mean the difference between a successful partnership and a failed deal.',
    questionText: 'According to the passage, what might silence during negotiations indicate in high-context cultures?',
    options: [
      { label: 'Disagreement with the proposal', value: 'Disagreement with the proposal' },
      { label: 'A desire to end the negotiation', value: 'A desire to end the negotiation' },
      { label: 'Contemplation rather than disagreement', value: 'Contemplation rather than disagreement' },
      { label: 'A lack of preparation', value: 'A lack of preparation' }
    ],
    correctAnswer: 'Contemplation rather than disagreement', points: 2, orderIndex: 99, tags: ['cross-cultural', 'negotiation']
  },

  // --- C1: Corporate social responsibility ---
  {
    language: 'English', cefrLevel: 'C1', questionType: 'READING', skill: 'READING',
    passageTitle: 'The Impact of Corporate Social Responsibility',
    passage: 'Corporate social responsibility (CSR) has evolved from a peripheral public relations exercise to a strategic imperative for many multinational corporations. Studies by Harvard Business School have shown that companies with robust CSR programmes tend to outperform their peers financially over the long term, partly because they attract and retain top talent who increasingly seek purpose-driven work. However, the rise of "greenwashing" — superficial or misleading claims about environmental practices — has led to growing scepticism among consumers and regulators alike. The European Union\'s Corporate Sustainability Reporting Directive (CSRD), which came into effect in 2024, represents a significant regulatory shift, requiring large companies to disclose detailed environmental, social, and governance (ESG) data. Critics of CSR argue that it can distract from the fundamental structural changes needed to address inequality and climate change, while proponents maintain that corporate engagement, however imperfect, is essential to scaling solutions.',
    questionText: 'What is the main concern raised about "greenwashing" in the passage?',
    options: [
      { label: 'It increases corporate profits unfairly', value: 'It increases corporate profits unfairly' },
      { label: 'It has led to scepticism about the authenticity of CSR claims', value: 'It has led to scepticism about the authenticity of CSR claims' },
      { label: 'It is only practised by small companies', value: 'It is only practised by small companies' },
      { label: 'It is required by EU regulations', value: 'It is required by EU regulations' }
    ],
    correctAnswer: 'It has led to scepticism about the authenticity of CSR claims', points: 2, orderIndex: 100, tags: ['CSR', 'sustainability']
  },

  // --- C1: Digital transformation in SMEs ---
  {
    language: 'English', cefrLevel: 'C1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Digital Transformation Challenges in SMEs',
    passage: 'While large enterprises have generally embraced digital transformation with dedicated budgets and specialised teams, small and medium-sized enterprises (SMEs) face a distinct set of challenges. A 2024 report by the OECD found that only 35% of European SMEs had implemented advanced digital tools such as cloud computing, data analytics, or automation. The primary barriers cited were limited financial resources, a shortage of digitally skilled employees, and resistance to change from long-tenured staff accustomed to established workflows. Furthermore, many SME owners expressed uncertainty about which technologies would deliver tangible returns on investment. Government-backed digitalisation programmes have had mixed results; while subsidies have helped some businesses adopt new systems, a lack of ongoing technical support often means that new tools are underutilised. Experts argue that successful digital transformation in SMEs requires not just technology adoption but a fundamental shift in organisational culture and leadership mindset.',
    questionText: 'According to the OECD report, what percentage of European SMEs had adopted advanced digital tools?',
    options: [
      { label: '25%', value: '25%' },
      { label: '35%', value: '35%' },
      { label: '50%', value: '50%' },
      { label: '65%', value: '65%' }
    ],
    correctAnswer: '35%', points: 2, orderIndex: 101, tags: ['digital transformation', 'SMEs']
  },

  // --- C1: Talent retention ---
  {
    language: 'English', cefrLevel: 'C1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Talent Retention in Competitive Markets',
    passage: 'In an era characterised by skill shortages and the so-called "Great Resignation," organisations are being forced to rethink their talent retention strategies. Traditional approaches centred on competitive salaries and annual bonuses are proving insufficient, as employees — particularly millennials and Generation Z — increasingly prioritise purpose, autonomy, and career development over purely financial rewards. Leading companies are responding by investing in personalised learning pathways, internal mobility programmes, and transparent promotion criteria. LinkedIn\'s 2024 Workplace Learning Report found that employees who feel they have opportunities to learn and grow are 3.5 times more likely to stay with their employer. However, retention is not solely about individual incentives; organisational culture, inclusive leadership, and the quality of the manager-employee relationship remain the strongest predictors of whether an employee will stay or leave. Companies that fail to address these systemic factors risk a costly cycle of recruitment and attrition.',
    questionText: 'According to LinkedIn\'s report, what makes employees 3.5 times more likely to stay?',
    options: [
      { label: 'Higher salaries than competitors', value: 'Higher salaries than competitors' },
      { label: 'Having opportunities to learn and grow', value: 'Having opportunities to learn and grow' },
      { label: 'Working fewer hours per week', value: 'Working fewer hours per week' },
      { label: 'Receiving annual bonuses', value: 'Receiving annual bonuses' }
    ],
    correctAnswer: 'Having opportunities to learn and grow', points: 2, orderIndex: 102, tags: ['talent retention', 'HR strategy']
  },

  // --- C2: Ethical AI in HR decisions ---
  {
    language: 'English', cefrLevel: 'C2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Ethical AI Implementation in HR Decisions',
    passage: 'The deployment of artificial intelligence in human resources — from résumé screening algorithms to predictive attrition models — raises profound ethical questions that organisations are only beginning to grapple with. While AI promises to reduce unconscious bias by standardising evaluation criteria, empirical evidence tells a more nuanced story. Amazon\'s now-discontinued recruitment tool, which systematically downgraded CVs containing the word "women\'s," demonstrated how algorithms trained on historically biased data can perpetuate and even amplify existing inequalities. The EU AI Act, adopted in 2024, classifies employment-related AI systems as "high-risk," subjecting them to stringent requirements for transparency, human oversight, and bias auditing. Yet compliance alone is insufficient; organisations must cultivate what scholars term "algorithmic literacy" — the capacity of HR professionals to critically evaluate AI outputs rather than treating them as objective truths. The tension between efficiency gains and ethical responsibility demands not merely technical safeguards but a fundamental reimagining of how human judgement and machine intelligence should interact in decisions that profoundly affect people\'s livelihoods.',
    questionText: 'What does the passage suggest is insufficient on its own when implementing AI in HR?',
    options: [
      { label: 'Technical training for engineers', value: 'Technical training for engineers' },
      { label: 'Regulatory compliance', value: 'Regulatory compliance' },
      { label: 'Increasing the volume of training data', value: 'Increasing the volume of training data' },
      { label: 'Eliminating all human involvement', value: 'Eliminating all human involvement' }
    ],
    correctAnswer: 'Regulatory compliance', points: 2, orderIndex: 103, tags: ['AI ethics', 'HR technology']
  },

  // --- C2: Stakeholder capitalism vs shareholder primacy ---
  {
    language: 'English', cefrLevel: 'C2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Stakeholder Capitalism vs Shareholder Primacy',
    passage: 'The debate between stakeholder capitalism and shareholder primacy represents one of the most consequential ideological fault lines in contemporary business thought. Milton Friedman\'s 1970 doctrine — that a corporation\'s sole social responsibility is to increase its profits — dominated Anglo-American capitalism for decades, providing an intellectually coherent framework for prioritising shareholder returns above all other considerations. The stakeholder model, championed by figures such as Klaus Schwab of the World Economic Forum, contends that corporations must balance the interests of shareholders, employees, customers, communities, and the environment to ensure long-term value creation. The 2019 Business Roundtable statement, signed by 181 CEOs of major US corporations, formally endorsed a stakeholder-oriented purpose, yet critics have characterised this pivot as largely performative, noting that executive compensation structures remain overwhelmingly tied to share price performance. Empirical research on whether stakeholder-oriented companies outperform shareholder-focused ones yields mixed results, complicated by methodological challenges in defining and measuring stakeholder value. What is clear, however, is that the binary framing of the debate obscures the complex interdependencies between financial performance and broader societal outcomes.',
    questionText: 'Why do critics characterise the Business Roundtable\'s 2019 stakeholder commitment as "performative"?',
    options: [
      { label: 'Because the CEOs did not sign the statement voluntarily', value: 'Because the CEOs did not sign the statement voluntarily' },
      { label: 'Because executive compensation remains tied to share price performance', value: 'Because executive compensation remains tied to share price performance' },
      { label: 'Because stakeholder capitalism is illegal in the United States', value: 'Because stakeholder capitalism is illegal in the United States' },
      { label: 'Because the statement was retracted the following year', value: 'Because the statement was retracted the following year' }
    ],
    correctAnswer: 'Because executive compensation remains tied to share price performance', points: 2, orderIndex: 104, tags: ['stakeholder capitalism', 'corporate governance']
  },

  // --- C2: Organizational resilience post-pandemic ---
  {
    language: 'English', cefrLevel: 'C2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Organizational Resilience in the Post-Pandemic Era',
    passage: 'The COVID-19 pandemic served as an unprecedented stress test for organisational resilience, exposing critical vulnerabilities in supply chains, workforce management, and strategic planning. Organisations that had invested in diversified supply networks, digital infrastructure, and adaptive leadership frameworks weathered the crisis more effectively than those reliant on lean, efficiency-maximised models with minimal redundancy. However, the post-pandemic discourse around resilience risks conflating genuine adaptive capacity with mere crisis survival. True organisational resilience, as defined by scholars such as Kathleen Sutcliffe and Karl Weick, encompasses not only the ability to absorb and recover from disruption but also the capacity to anticipate emerging threats and transform in response to fundamentally altered conditions. This distinction is critical: companies that simply restored pre-pandemic operations without reimagining their business models may find themselves ill-equipped for the compounding uncertainties of climate disruption, geopolitical instability, and technological transformation. Building resilience demands sustained investment in scenario planning, psychological safety within teams, and governance structures that empower decentralised decision-making — investments that often compete directly with short-term profitability targets.',
    questionText: 'According to the passage, what is the risk in the post-pandemic discourse around resilience?',
    options: [
      { label: 'That companies invest too much in digital infrastructure', value: 'That companies invest too much in digital infrastructure' },
      { label: 'That genuine adaptive capacity is conflated with mere crisis survival', value: 'That genuine adaptive capacity is conflated with mere crisis survival' },
      { label: 'That employees resist returning to the office', value: 'That employees resist returning to the office' },
      { label: 'That supply chains become too diversified', value: 'That supply chains become too diversified' }
    ],
    correctAnswer: 'That genuine adaptive capacity is conflated with mere crisis survival', points: 2, orderIndex: 105, tags: ['organizational resilience', 'strategy']
  },

  // --- C2: Professional development ROI ---
  {
    language: 'English', cefrLevel: 'C2', questionType: 'READING', skill: 'READING',
    passageTitle: 'The Economics of Professional Development ROI',
    passage: 'Quantifying the return on investment (ROI) of professional development programmes remains one of the most persistent challenges in human capital management. Traditional approaches, such as Kirkpatrick\'s four-level evaluation model, assess training impact through learner satisfaction, knowledge acquisition, behavioural change, and business results — yet each successive level presents escalating measurement difficulties. The causal attribution problem is particularly acute: isolating the impact of a training programme from confounding variables such as market conditions, management quality, and individual motivation requires rigorous experimental designs that most organisations lack the resources or inclination to implement. Jack Phillips\' extension of the Kirkpatrick model to include a fifth level — financial ROI — has gained traction in corporate settings, but critics argue that reducing complex developmental outcomes to monetary figures risks undervaluing intangible benefits such as enhanced innovation capacity, improved organisational culture, and stronger professional networks. Furthermore, the temporal dimension complicates analysis: the most impactful development interventions, such as executive coaching and cross-functional rotations, may not yield measurable results for years, creating a misalignment with quarterly reporting cycles that favour short-term, easily quantifiable training outputs.',
    questionText: 'What is the "causal attribution problem" described in the passage?',
    options: [
      { label: 'The difficulty of finding qualified trainers for professional development', value: 'The difficulty of finding qualified trainers for professional development' },
      { label: 'The challenge of isolating a training programme\'s impact from confounding variables', value: 'The challenge of isolating a training programme\'s impact from confounding variables' },
      { label: 'The problem of employees not attending training sessions', value: 'The problem of employees not attending training sessions' },
      { label: 'The high cost of implementing Kirkpatrick\'s model', value: 'The high cost of implementing Kirkpatrick\'s model' }
    ],
    correctAnswer: 'The challenge of isolating a training programme\'s impact from confounding variables', points: 2, orderIndex: 106, tags: ['professional development', 'ROI', 'HR strategy']
  },
]
