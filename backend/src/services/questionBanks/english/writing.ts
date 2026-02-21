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
    questionText: 'Describe your family. How many people are in your family? What are their names?',
    correctAnswer: '', points: 1, orderIndex: 2,
    rubric: { minWords: 20, maxWords: 50, criteria: ['family vocabulary', 'numbers', 'simple sentences'] },
    tags: ['family'], timeSuggested: 180
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
  }
]
