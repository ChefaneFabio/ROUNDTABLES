import { MultiSkillQuestionData } from '../types'

// English Reading Questions — ~7 per CEFR level (42 total)
// Types: MULTIPLE_CHOICE, FILL_BLANK, SHORT_ANSWER with passages

export const englishReadingQuestions: MultiSkillQuestionData[] = [
  // ============================================================
  // A1 — Beginner (7 questions)
  // ============================================================
  {
    language: 'English', cefrLevel: 'A1', questionType: 'READING', skill: 'READING',
    passageTitle: 'My Family',
    passage: 'My name is Anna. I am 10 years old. I have a brother. His name is Tom. He is 8. We have a dog. The dog is brown. We live in a small house.',
    questionText: 'How old is Anna?',
    options: [{ label: '8', value: '8' }, { label: '10', value: '10' }, { label: '12', value: '12' }, { label: '6', value: '6' }],
    correctAnswer: '10', points: 1, orderIndex: 1, tags: ['family', 'numbers']
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'READING', skill: 'READING',
    passageTitle: 'My Family',
    passage: 'My name is Anna. I am 10 years old. I have a brother. His name is Tom. He is 8. We have a dog. The dog is brown. We live in a small house.',
    questionText: 'What color is the dog?',
    options: [{ label: 'White', value: 'white' }, { label: 'Black', value: 'black' }, { label: 'Brown', value: 'brown' }, { label: 'Grey', value: 'grey' }],
    correctAnswer: 'brown', points: 1, orderIndex: 2, tags: ['family', 'colors']
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
    passageTitle: 'My Day',
    passage: 'I wake up at 7 o\'clock. I eat breakfast. Then I go to school. School starts at 8:30. I come home at 3 o\'clock. I play with my friends.',
    questionText: 'What time does school start?',
    options: [{ label: '7:00', value: '7:00' }, { label: '8:30', value: '8:30' }, { label: '3:00', value: '3:00' }, { label: '9:00', value: '9:00' }],
    correctAnswer: '8:30', points: 1, orderIndex: 5, tags: ['daily routine', 'time']
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'READING', skill: 'READING',
    passageTitle: 'My Day',
    passage: 'I wake up at 7 o\'clock. I eat breakfast. Then I go to school. School starts at 8:30. I come home at 3 o\'clock. I play with my friends.',
    questionText: 'What does the person do after school?',
    options: [{ label: 'Eats dinner', value: 'eats dinner' }, { label: 'Plays with friends', value: 'plays with friends' }, { label: 'Goes shopping', value: 'goes shopping' }, { label: 'Watches TV', value: 'watches TV' }],
    correctAnswer: 'plays with friends', points: 1, orderIndex: 6, tags: ['daily routine']
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'I wake up at 7 o\'clock. I eat breakfast. Then I go to school.',
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
    passageTitle: 'A Sign at the Park',
    passage: 'PARK RULES: No dogs. No bicycles. Open from 8 AM to 6 PM. Children must be with an adult.',
    questionText: 'Can you bring your dog to the park?',
    options: [{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }, { label: 'Only small dogs', value: 'only small dogs' }, { label: 'Only on weekends', value: 'only on weekends' }],
    correctAnswer: 'no', points: 1, orderIndex: 43, tags: ['signs', 'rules']
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'READING', skill: 'READING',
    passageTitle: 'A Sign at the Park',
    passage: 'PARK RULES: No dogs. No bicycles. Open from 8 AM to 6 PM. Children must be with an adult.',
    questionText: 'What time does the park close?',
    options: [{ label: '5 PM', value: '5 PM' }, { label: '6 PM', value: '6 PM' }, { label: '7 PM', value: '7 PM' }, { label: '8 PM', value: '8 PM' }],
    correctAnswer: '6 PM', points: 1, orderIndex: 44, tags: ['signs', 'time']
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'READING', skill: 'READING',
    passageTitle: 'My Pet',
    passage: 'I have a cat. Her name is Mimi. She is white and very small. She sleeps on my bed. She likes milk and fish. I love my cat very much.',
    questionText: 'What does Mimi like to eat?',
    options: [{ label: 'Bread and water', value: 'bread and water' }, { label: 'Milk and fish', value: 'milk and fish' }, { label: 'Rice and chicken', value: 'rice and chicken' }, { label: 'Fruit and vegetables', value: 'fruit and vegetables' }],
    correctAnswer: 'milk and fish', points: 1, orderIndex: 45, tags: ['pets', 'food']
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'READING', skill: 'READING',
    passageTitle: 'My Pet',
    passage: 'I have a cat. Her name is Mimi. She is white and very small. She sleeps on my bed. She likes milk and fish. I love my cat very much.',
    questionText: 'Where does Mimi sleep?',
    options: [{ label: 'On the floor', value: 'on the floor' }, { label: 'On the sofa', value: 'on the sofa' }, { label: 'On the bed', value: 'on the bed' }, { label: 'In the garden', value: 'in the garden' }],
    correctAnswer: 'on the bed', points: 1, orderIndex: 46, tags: ['pets', 'house']
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'READING', skill: 'READING',
    passageTitle: 'A Short Note',
    passage: 'Dear Lisa, I am at the supermarket. There is no bread at home. I will buy bread, eggs, and cheese. I will be home at 5. Love, Mum.',
    questionText: 'Where is Mum?',
    options: [{ label: 'At home', value: 'at home' }, { label: 'At work', value: 'at work' }, { label: 'At the supermarket', value: 'at the supermarket' }, { label: 'At school', value: 'at school' }],
    correctAnswer: 'at the supermarket', points: 1, orderIndex: 47, tags: ['notes', 'shopping']
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'READING', skill: 'READING',
    passageTitle: 'A Short Note',
    passage: 'Dear Lisa, I am at the supermarket. There is no bread at home. I will buy bread, eggs, and cheese. I will be home at 5. Love, Mum.',
    questionText: 'What will Mum buy?',
    options: [{ label: 'Milk, rice, and fruit', value: 'milk, rice, and fruit' }, { label: 'Bread, eggs, and cheese', value: 'bread, eggs, and cheese' }, { label: 'Water and juice', value: 'water and juice' }, { label: 'Meat and vegetables', value: 'meat and vegetables' }],
    correctAnswer: 'bread, eggs, and cheese', points: 1, orderIndex: 48, tags: ['notes', 'shopping']
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'Dear Lisa, I am at the supermarket. There is no bread at home. I will buy bread, eggs, and cheese. I will be home at 5.',
    questionText: 'Mum will be home at ___.',
    correctAnswer: '5', points: 1, orderIndex: 49, tags: ['notes', 'time']
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
    passageTitle: 'Weekend Plans',
    passage: 'Hi James, Are you free this Saturday? My parents are having a barbecue in the garden. There will be burgers, salads, and cake. My cousin is coming too — you met him at my birthday party. It starts at 2 PM. Let me know! Best, Daniel',
    questionText: 'What kind of event is it?',
    options: [{ label: 'A birthday party', value: 'birthday party' }, { label: 'A barbecue', value: 'a barbecue' }, { label: 'A wedding', value: 'wedding' }, { label: 'A dinner party', value: 'dinner party' }],
    correctAnswer: 'a barbecue', points: 1, orderIndex: 54, tags: ['social', 'invitations']
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Weekend Plans',
    passage: 'Hi James, Are you free this Saturday? My parents are having a barbecue in the garden. There will be burgers, salads, and cake. My cousin is coming too — you met him at my birthday party. It starts at 2 PM. Let me know! Best, Daniel',
    questionText: 'When does the barbecue start?',
    options: [{ label: '12 PM', value: '12 PM' }, { label: '1 PM', value: '1 PM' }, { label: '2 PM', value: '2 PM' }, { label: '3 PM', value: '3 PM' }],
    correctAnswer: '2 PM', points: 1, orderIndex: 55, tags: ['social', 'time']
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'Hi James, My parents are having a barbecue in the garden. There will be burgers, salads, and cake.',
    questionText: 'The barbecue is in the ___.',
    correctAnswer: 'garden', points: 1, orderIndex: 56, tags: ['social', 'places']
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
]
