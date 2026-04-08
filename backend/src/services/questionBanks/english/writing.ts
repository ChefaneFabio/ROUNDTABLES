import { MultiSkillQuestionData } from '../types'

// English Writing Prompts — 2-3 per CEFR level (15 total)
// Progressive complexity: short answer -> paragraph -> essay

export const englishWritingQuestions: MultiSkillQuestionData[] = [
  // A1 — Short answers (20-50 words)
  {
    language: 'English', cefrLevel: 'A1', questionType: 'SHORT_ANSWER', skill: 'WRITING',
    questionText: 'Write about yourself. Include your name, age, where you are from, and one thing you like.',
    correctAnswer: '', points: 1, orderIndex: 1,
    rubric: { minWords: 20, maxWords: 50, criteria: ['basic personal info', 'simple sentences', 'basic vocabulary'] },
    tags: ['personal', 'introduction'], timeSuggested: 180
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'SHORT_ANSWER', skill: 'WRITING',
    questionText: 'Describe your team at work. How many people are in your team? What do they do?',
    correctAnswer: '', points: 1, orderIndex: 2,
    rubric: { minWords: 20, maxWords: 50, criteria: ['workplace vocabulary', 'numbers', 'simple sentences'] },
    tags: ['workplace'], timeSuggested: 180
  },
  // A2 — Short answers (30-60 words)
  {
    language: 'English', cefrLevel: 'A2', questionType: 'SHORT_ANSWER', skill: 'WRITING',
    questionText: 'Describe your daily routine. What do you do in the morning, afternoon, and evening?',
    correctAnswer: '', points: 1, orderIndex: 3,
    rubric: { minWords: 30, maxWords: 60, criteria: ['time expressions', 'present simple', 'sequence words'] },
    tags: ['daily routine'], timeSuggested: 240
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'SHORT_ANSWER', skill: 'WRITING',
    questionText: 'Write about your last holiday. Where did you go? What did you do? Did you enjoy it?',
    correctAnswer: '', points: 1, orderIndex: 4,
    rubric: { minWords: 30, maxWords: 60, criteria: ['past tense', 'travel vocabulary', 'opinions'] },
    tags: ['travel', 'past tense'], timeSuggested: 240
  },
  // B1 — Paragraph (80-150 words)
  {
    language: 'English', cefrLevel: 'B1', questionType: 'SHORT_ANSWER', skill: 'WRITING',
    questionText: 'Do you think it is better to live in a city or in the countryside? Give reasons for your opinion.',
    correctAnswer: '', points: 2, orderIndex: 5,
    rubric: { minWords: 80, maxWords: 150, criteria: ['opinion expression', 'comparative structures', 'supporting reasons', 'paragraph structure'] },
    tags: ['opinion', 'comparatives'], timeSuggested: 360
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'SHORT_ANSWER', skill: 'WRITING',
    questionText: 'Write about the advantages and disadvantages of using social media. Give examples from your experience.',
    correctAnswer: '', points: 2, orderIndex: 6,
    rubric: { minWords: 80, maxWords: 150, criteria: ['advantages/disadvantages structure', 'linking words', 'examples', 'coherent argument'] },
    tags: ['technology', 'opinion'], timeSuggested: 360
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'SHORT_ANSWER', skill: 'WRITING',
    questionText: 'Describe a person who has influenced your life and explain why they are important to you.',
    correctAnswer: '', points: 2, orderIndex: 7,
    rubric: { minWords: 80, maxWords: 150, criteria: ['describing people', 'personal narrative', 'present perfect/past tense', 'emotional vocabulary'] },
    tags: ['personal', 'description'], timeSuggested: 360
  },
  // B2 — Paragraph (100-200 words)
  {
    language: 'English', cefrLevel: 'B2', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'Some people believe that remote work will replace traditional office work in the future. To what extent do you agree or disagree? Support your argument with specific reasons.',
    correctAnswer: '', points: 2, orderIndex: 8,
    rubric: { minWords: 100, maxWords: 200, criteria: ['clear thesis', 'supporting arguments', 'counterargument awareness', 'formal register', 'cohesive devices'] },
    tags: ['work', 'opinion', 'formal'], timeSuggested: 480
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'Write about how technology has changed the way people learn languages. Include both positive and negative effects.',
    correctAnswer: '', points: 2, orderIndex: 9,
    rubric: { minWords: 100, maxWords: 200, criteria: ['balanced argument', 'specific examples', 'cause and effect', 'academic vocabulary'] },
    tags: ['technology', 'education'], timeSuggested: 480
  },
  // C1 — Essay (150-250 words)
  {
    language: 'English', cefrLevel: 'C1', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'Critically evaluate the claim that social media has done more harm than good to democratic discourse. Provide evidence to support your argument.',
    correctAnswer: '', points: 3, orderIndex: 10,
    rubric: { minWords: 150, maxWords: 250, criteria: ['critical analysis', 'evidence-based argument', 'nuanced position', 'sophisticated vocabulary', 'rhetorical devices', 'logical structure'] },
    tags: ['media', 'politics', 'critical thinking'], timeSuggested: 600
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'Discuss the ethical implications of artificial intelligence in healthcare. Should AI systems be allowed to make diagnostic decisions without human oversight?',
    correctAnswer: '', points: 3, orderIndex: 11,
    rubric: { minWords: 150, maxWords: 250, criteria: ['ethical reasoning', 'multiple perspectives', 'academic register', 'conditional structures', 'hedging language'] },
    tags: ['technology', 'ethics', 'health'], timeSuggested: 600
  },
  // C2 — Essay (200-300 words)
  {
    language: 'English', cefrLevel: 'C2', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'The commodification of higher education has fundamentally altered its purpose and value. Discuss this statement, considering both economic and philosophical perspectives.',
    correctAnswer: '', points: 3, orderIndex: 12,
    rubric: { minWords: 200, maxWords: 300, criteria: ['sophisticated argumentation', 'interdisciplinary references', 'abstract reasoning', 'near-native fluency', 'stylistic range', 'nuanced conclusion'] },
    tags: ['education', 'philosophy', 'economics'], timeSuggested: 720
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'To what extent can language shape reality? Discuss with reference to the Sapir-Whorf hypothesis and contemporary research on linguistic relativity.',
    correctAnswer: '', points: 3, orderIndex: 13,
    rubric: { minWords: 200, maxWords: 300, criteria: ['academic argumentation', 'theoretical knowledge', 'critical evaluation of evidence', 'cohesive academic essay structure', 'precise and varied vocabulary'] },
    tags: ['linguistics', 'philosophy'], timeSuggested: 720
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'Analyze the tension between individual privacy and collective security in the digital age. How should democratic societies navigate this dilemma?',
    correctAnswer: '', points: 3, orderIndex: 14,
    rubric: { minWords: 200, maxWords: 300, criteria: ['philosophical depth', 'balanced analysis', 'policy awareness', 'elegant prose', 'logical coherence'] },
    tags: ['technology', 'politics', 'ethics'], timeSuggested: 720
  },

  // ============================================================
  // NEW QUESTIONS — 16 more (orderIndex 15-30)
  // ============================================================

  // A1 (20-50 words)
  {
    language: 'English', cefrLevel: 'A1', questionType: 'SHORT_ANSWER', skill: 'WRITING',
    questionText: 'Write a short postcard to a friend. Tell them where you are and what the weather is like.',
    correctAnswer: '', points: 1, orderIndex: 15,
    rubric: { minWords: 20, maxWords: 50, criteria: ['basic greeting', 'simple sentences', 'weather vocabulary'] },
    tags: ['postcard', 'weather'], timeSuggested: 180
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'SHORT_ANSWER', skill: 'WRITING',
    questionText: 'Describe your house or flat. How many rooms does it have? What is your favourite room?',
    correctAnswer: '', points: 1, orderIndex: 16,
    rubric: { minWords: 20, maxWords: 50, criteria: ['house vocabulary', 'there is/are', 'simple adjectives'] },
    tags: ['home', 'description'], timeSuggested: 180
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'SHORT_ANSWER', skill: 'WRITING',
    questionText: 'Where do you usually have lunch during the workday? What do you usually eat?',
    correctAnswer: '', points: 1, orderIndex: 17,
    rubric: { minWords: 20, maxWords: 50, criteria: ['food vocabulary', 'like/prefer', 'simple sentences'] },
    tags: ['workplace lunch', 'preferences'], timeSuggested: 180
  },

  // A2 (40-80 words)
  {
    language: 'English', cefrLevel: 'A2', questionType: 'SHORT_ANSWER', skill: 'WRITING',
    questionText: 'Write an email to a friend inviting them to a party. Include the date, time, place, and what to bring.',
    correctAnswer: '', points: 1, orderIndex: 18,
    rubric: { minWords: 40, maxWords: 80, criteria: ['email format', 'future plans', 'invitation language', 'details'] },
    tags: ['email', 'invitation'], timeSuggested: 240
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'SHORT_ANSWER', skill: 'WRITING',
    questionText: 'Describe a colleague you work with closely. What is their role? What do you work on together?',
    correctAnswer: '', points: 1, orderIndex: 19,
    rubric: { minWords: 40, maxWords: 80, criteria: ['professional description', 'personality adjectives', 'present simple', 'like + gerund'] },
    tags: ['colleague', 'description'], timeSuggested: 240
  },

  // B1 (80-150 words)
  {
    language: 'English', cefrLevel: 'B1', questionType: 'SHORT_ANSWER', skill: 'WRITING',
    questionText: 'Write a letter of complaint to a hotel manager about a problem you had during your stay.',
    correctAnswer: '', points: 2, orderIndex: 20,
    rubric: { minWords: 80, maxWords: 150, criteria: ['formal letter format', 'complaint language', 'past tense narrative', 'polite requests'] },
    tags: ['complaint', 'formal letter'], timeSuggested: 360
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'SHORT_ANSWER', skill: 'WRITING',
    questionText: 'Do you think flexible working hours improve productivity? Give your opinion with reasons and examples.',
    correctAnswer: '', points: 2, orderIndex: 21,
    rubric: { minWords: 80, maxWords: 150, criteria: ['opinion expression', 'supporting reasons', 'examples', 'paragraph structure'] },
    tags: ['opinion', 'workplace'], timeSuggested: 360
  },

  // B2 (150-250 words)
  {
    language: 'English', cefrLevel: 'B2', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'Write a report on the impact of tourism on local communities. Consider both positive and negative effects and suggest how problems can be addressed.',
    correctAnswer: '', points: 2, orderIndex: 22,
    rubric: { minWords: 150, maxWords: 250, criteria: ['report structure', 'balanced analysis', 'recommendations', 'formal register', 'cohesive devices'] },
    tags: ['report', 'tourism'], timeSuggested: 480
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'Some people believe that competitive sports teach important life skills, while others think they put too much pressure on young people. Discuss both views.',
    correctAnswer: '', points: 2, orderIndex: 23,
    rubric: { minWords: 150, maxWords: 250, criteria: ['clear thesis', 'balanced argument', 'specific examples', 'formal vocabulary', 'logical structure'] },
    tags: ['argumentative', 'sports'], timeSuggested: 480
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'Write an essay discussing whether social media influencers have a positive or negative impact on young people\'s self-esteem and values.',
    correctAnswer: '', points: 2, orderIndex: 24,
    rubric: { minWords: 150, maxWords: 250, criteria: ['argumentative structure', 'counterargument awareness', 'examples', 'academic vocabulary'] },
    tags: ['argumentative', 'social media'], timeSuggested: 480
  },

  // C1 (200-350 words)
  {
    language: 'English', cefrLevel: 'C1', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'Write a proposal for your company or institution suggesting ways to reduce its environmental footprint. Include specific measures and justify their feasibility.',
    correctAnswer: '', points: 3, orderIndex: 25,
    rubric: { minWords: 200, maxWords: 350, criteria: ['proposal format', 'persuasive argumentation', 'feasibility analysis', 'sophisticated vocabulary', 'formal register'] },
    tags: ['proposal', 'environment'], timeSuggested: 600
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'Critically analyse the role of standardised testing in education. Does it measure learning effectively, or does it hinder genuine intellectual development?',
    correctAnswer: '', points: 3, orderIndex: 26,
    rubric: { minWords: 200, maxWords: 350, criteria: ['critical analysis', 'evidence-based argument', 'nuanced position', 'rhetorical devices', 'academic register'] },
    tags: ['critical analysis', 'education'], timeSuggested: 600
  },

  // C2 (250-400 words)
  {
    language: 'English', cefrLevel: 'C2', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'Write a philosophical essay exploring whether moral truths are objective facts or social constructs. Reference at least two philosophical traditions in your argument.',
    correctAnswer: '', points: 3, orderIndex: 27,
    rubric: { minWords: 250, maxWords: 400, criteria: ['philosophical depth', 'interdisciplinary references', 'abstract reasoning', 'near-native fluency', 'elegant prose'] },
    tags: ['philosophy', 'ethics'], timeSuggested: 720
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'Write a literary critique of a novel or play you have read, analysing its themes, narrative techniques, and cultural significance.',
    correctAnswer: '', points: 3, orderIndex: 28,
    rubric: { minWords: 250, maxWords: 400, criteria: ['literary analysis', 'sophisticated argumentation', 'critical evaluation', 'precise vocabulary', 'stylistic range'] },
    tags: ['literary critique', 'culture'], timeSuggested: 720
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'Examine the paradox of tolerance: can a truly tolerant society tolerate intolerance? Discuss with reference to political philosophy and contemporary examples.',
    correctAnswer: '', points: 3, orderIndex: 29,
    rubric: { minWords: 250, maxWords: 400, criteria: ['philosophical reasoning', 'nuanced conclusion', 'academic register', 'counterargument handling', 'logical coherence'] },
    tags: ['philosophy', 'politics'], timeSuggested: 720
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'Is the notion of meritocracy a useful ideal or a dangerous myth? Analyse the sociological and philosophical dimensions of this question.',
    correctAnswer: '', points: 3, orderIndex: 30,
    rubric: { minWords: 250, maxWords: 400, criteria: ['sophisticated argumentation', 'interdisciplinary analysis', 'abstract reasoning', 'elegant expression', 'nuanced position'] },
    tags: ['sociology', 'philosophy', 'economics'], timeSuggested: 720
  }
]
