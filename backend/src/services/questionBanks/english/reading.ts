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
  }
]
