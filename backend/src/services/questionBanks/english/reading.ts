import { MultiSkillQuestionData } from '../types'

// English Reading Questions — ~8-9 READING per CEFR level (~53 READING + FILL_BLANK/MULTIPLE_CHOICE)
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
    passageTitle: 'Quantum Consciousness',
    passage: 'The Orch-OR theory, proposed by physicist Roger Penrose and anesthesiologist Stuart Hameroff, posits that consciousness arises from quantum computations within microtubules inside neurons. This controversial hypothesis suggests the brain operates at a fundamentally quantum level. Critics contend that the warm, wet environment of the brain would cause quantum decoherence far too rapidly for such processes to be biologically relevant. Nevertheless, recent experiments detecting quantum effects in biological systems have lent some credibility to the notion that quantum mechanics may play a role in biology.',
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
    passageTitle: 'My Desk',
    passage: 'I have a desk at work. It is near the window. The desk is big and white. I have a computer and a phone on my desk. I also have a cup of coffee. I like my desk very much.',
    questionText: 'What is on the desk?',
    options: [{ label: 'Books and papers', value: 'books and papers' }, { label: 'A computer and a phone', value: 'a computer and a phone' }, { label: 'A lamp and a plant', value: 'a lamp and a plant' }, { label: 'Folders and pens', value: 'folders and pens' }],
    correctAnswer: 'a computer and a phone', points: 1, orderIndex: 45, tags: ['office', 'objects']
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
    passageTitle: 'At the Doctor',
    passage: 'Mark went to the doctor because he had a bad cough. The doctor listened to his chest and checked his temperature. She said he had a cold and needed to rest for a few days. She also told him to drink lots of water and take some medicine twice a day.',
    questionText: 'What was wrong with Mark?',
    options: [{ label: 'He broke his arm', value: 'broke arm' }, { label: 'He had a cold', value: 'had a cold' }, { label: 'He had a headache', value: 'headache' }, { label: 'He hurt his leg', value: 'hurt leg' }],
    correctAnswer: 'had a cold', points: 1, orderIndex: 52, tags: ['health', 'doctor']
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

  // ============================================================
  // C2 — Proficiency (77-82)
  // ============================================================
  {
    language: 'English', cefrLevel: 'C2', questionType: 'READING', skill: 'READING',
    passageTitle: 'The Ship of Theseus',
    passage: 'The Ship of Theseus is a thought experiment in the metaphysics of identity. If a ship\'s planks are gradually replaced until none of the original material remains, is it still the same ship? The paradox deepens if the removed planks are reassembled into a second vessel — which ship is the "real" Ship of Theseus? Thomas Hobbes extended this problem to personal identity: given that cells in our bodies are constantly replaced, are we the same person we were a decade ago?',
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
    passageTitle: 'The Banality of Evil',
    passage: 'Hannah Arendt\'s concept of "the banality of evil," formulated during her coverage of the Eichmann trial in Jerusalem, challenged assumptions about moral transgression. Arendt observed that Eichmann was not a monster driven by ideological fervor but a bureaucrat unable or unwilling to think critically about his actions. This "thoughtlessness," she argued, was far more dangerous than malice, enabling ordinary individuals to participate in systemic atrocities without moral conflict.',
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
    language: 'English', cefrLevel: 'C2', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'Hannah Arendt\'s concept of "the banality of evil" was formulated during her coverage of the Eichmann trial in Jerusalem.',
    questionText: 'Arendt formulated her concept during the ___ trial in Jerusalem.',
    correctAnswer: 'Eichmann', points: 2, orderIndex: 81, tags: ['philosophy', 'history']
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Wittgenstein on Language',
    passage: 'In "Philosophical Investigations," Wittgenstein abandoned the picture theory of meaning in favor of a more pragmatic account. He introduced "language games" to illustrate that the meaning of a word is not fixed but rather a function of its use within particular forms of life. The dictum "the meaning of a word is its use in the language" implies that understanding requires grasping the social practices within which words operate. This insight has profoundly influenced pragmatics, sociolinguistics, and the philosophy of mind.',
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
    passage: 'The traditional command-and-control leadership model is increasingly being replaced by collaborative approaches. Transformational leaders inspire teams through compelling vision, driving higher employee engagement. Servant leadership, where the leader supports team members\' growth, has gained popularity in tech companies. However, no single style is universally effective; the best leaders adapt depending on the situation and team maturity. This concept, known as situational leadership, requires emotional intelligence and a deep understanding of team dynamics.',
    questionText: 'According to the article, what does situational leadership require?',
    options: [
      { label: 'A strict set of rules for every situation', value: 'A strict set of rules for every situation' },
      { label: 'Emotional intelligence and understanding of team dynamics', value: 'Emotional intelligence and understanding of team dynamics' },
      { label: 'Experience only in the technology sector', value: 'Experience only in the technology sector' },
      { label: 'A single consistent leadership approach', value: 'A single consistent leadership approach' }
    ],
    correctAnswer: 'Emotional intelligence and understanding of team dynamics', points: 2, orderIndex: 95, tags: ['leadership', 'management']
  },
  // --- B2: Work-life balance trends ---
  {
    language: 'English', cefrLevel: 'B2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Work-Life Balance Trends Across Europe',
    passage: 'A study by the European Foundation for the Improvement of Living and Working Conditions found significant variations in work-life balance across EU member states. Nordic countries rank highest with shorter hours and generous parental leave. Southern European nations report longer hours but stronger family support networks. The study also identified a trend toward four-day work weeks, with pilots in Belgium, Spain, and the UK showing promising results — productivity remained stable or improved, while burnout decreased by 30%. Critics argue such models suit knowledge-based industries and may not work in healthcare or manufacturing.',
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
    passage: 'This proposal outlines a strategy for expanding into the DACH region (Germany, Austria, Switzerland) over 18 months. Market research indicates strong demand for our SaaS platform among mid-sized manufacturers, with an addressable market of €45 million annually. The approach involves a regional sales office in Munich, five local sales representatives, and partnerships with two consulting firms for distribution. Total investment: €1.2 million, with a projected break-even at 14 months. Key risks include regulatory differences and competition from local providers.',
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
    passage: 'Effective cross-cultural negotiation demands understanding of cultural frameworks that shape how trust is built and agreements reached. In high-context cultures like Japan, relationship-building precedes discussion of terms, and silence may signal contemplation rather than disagreement. Low-context cultures, including the US and Germany, prioritise directness and data-driven arguments. Research by Erin Meyer at INSEAD shows that even within Europe, differences exist — French negotiators engage in intellectual debate, while Scandinavians favour consensus-building. Understanding these nuances can determine success or failure.',
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
    passage: 'Corporate social responsibility (CSR) has evolved from a peripheral PR exercise to a strategic imperative for multinationals. Harvard Business School studies show that companies with robust CSR programmes tend to outperform peers financially, partly because they attract talent seeking purpose-driven work. However, "greenwashing" — misleading claims about environmental practices — has led to growing scepticism among consumers and regulators. The EU\'s Corporate Sustainability Reporting Directive (CSRD), effective 2024, requires large companies to disclose detailed ESG data. Critics argue CSR can distract from structural changes needed to address inequality and climate change.',
    questionText: 'What is the main concern raised about "greenwashing" in the passage?',
    options: [
      { label: 'It increases corporate profits unfairly', value: 'It increases corporate profits unfairly' },
      { label: 'It has led to scepticism about the authenticity of CSR claims', value: 'It has led to scepticism about the authenticity of CSR claims' },
      { label: 'It is only practised by small companies', value: 'It is only practised by small companies' },
      { label: 'It is required by EU regulations', value: 'It is required by EU regulations' }
    ],
    correctAnswer: 'It has led to scepticism about the authenticity of CSR claims', points: 2, orderIndex: 100, tags: ['CSR', 'sustainability']
  },
  // --- C1: Talent retention ---
  {
    language: 'English', cefrLevel: 'C1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Talent Retention in Competitive Markets',
    passage: 'In an era of skill shortages and the "Great Resignation," organisations must rethink talent retention. Traditional approaches centred on salaries and bonuses are insufficient, as employees increasingly prioritise purpose, autonomy, and career development. Leading companies are investing in personalised learning pathways and transparent promotion criteria. LinkedIn\'s 2024 Workplace Learning Report found that employees who feel they have opportunities to learn and grow are 3.5 times more likely to stay. However, organisational culture, inclusive leadership, and manager-employee relationships remain the strongest predictors of retention.',
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
    passage: 'The deployment of AI in human resources — from résumé screening to predictive attrition models — raises profound ethical questions. While AI promises to reduce unconscious bias, Amazon\'s discontinued recruitment tool, which downgraded CVs containing "women\'s," showed how algorithms trained on biased data can amplify inequalities. The EU AI Act classifies employment-related AI as "high-risk," requiring transparency, human oversight, and bias auditing. Yet compliance alone is insufficient; organisations must cultivate "algorithmic literacy" — the capacity to critically evaluate AI outputs rather than treating them as objective truths.',
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
    passage: 'The debate between stakeholder capitalism and shareholder primacy is a major fault line in business thought. Milton Friedman\'s 1970 doctrine — that a corporation\'s sole responsibility is to increase profits — dominated for decades. The stakeholder model, championed by Klaus Schwab, contends corporations must balance the interests of shareholders, employees, customers, and the environment. The 2019 Business Roundtable statement, signed by 181 US CEOs, endorsed stakeholder-oriented purpose, yet critics call this largely performative, noting that executive compensation remains tied to share price performance.',
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
    passage: 'The COVID-19 pandemic served as a stress test for organisational resilience, exposing vulnerabilities in supply chains and strategic planning. Organisations with diversified supply networks and adaptive leadership weathered the crisis more effectively than lean, efficiency-maximised models. However, the post-pandemic discourse risks conflating genuine adaptive capacity with mere crisis survival. True resilience encompasses not only recovering from disruption but anticipating threats and transforming in response. Companies that simply restored pre-pandemic operations may be ill-equipped for future uncertainties. Building resilience demands investment in scenario planning and governance that empowers decentralised decision-making.',
    questionText: 'According to the passage, what is the risk in the post-pandemic discourse around resilience?',
    options: [
      { label: 'That companies invest too much in digital infrastructure', value: 'That companies invest too much in digital infrastructure' },
      { label: 'That genuine adaptive capacity is conflated with mere crisis survival', value: 'That genuine adaptive capacity is conflated with mere crisis survival' },
      { label: 'That employees resist returning to the office', value: 'That employees resist returning to the office' },
      { label: 'That supply chains become too diversified', value: 'That supply chains become too diversified' }
    ],
    correctAnswer: 'That genuine adaptive capacity is conflated with mere crisis survival', points: 2, orderIndex: 105, tags: ['organizational resilience', 'strategy']
  },

]
