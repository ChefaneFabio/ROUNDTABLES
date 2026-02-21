import { MultiSkillQuestionData } from '../types'

// English Speaking Prompts — 2-3 per CEFR level (15 total)
// Types: Read aloud, describe, opinion, argue

export const englishSpeakingQuestions: MultiSkillQuestionData[] = [
  // A1 — Read aloud + simple question
  {
    language: 'English', cefrLevel: 'A1', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Read the following sentence aloud:',
    speakingPrompt: 'Hello, my name is [your name]. I am from [your country]. I like [something you like].',
    correctAnswer: '', points: 1, orderIndex: 1,
    rubric: { criteria: ['pronunciation', 'basic fluency', 'comprehensible speech'], maxDuration: 30 },
    tags: ['read aloud', 'introduction'], timeSuggested: 30
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Answer the following question. Speak for about 15-20 seconds:',
    speakingPrompt: 'What do you usually do on the weekend?',
    correctAnswer: '', points: 1, orderIndex: 2,
    rubric: { criteria: ['comprehensible response', 'basic vocabulary', 'relevant content'], maxDuration: 30 },
    tags: ['simple question', 'daily life'], timeSuggested: 30
  },
  // A2 — Read aloud + describe
  {
    language: 'English', cefrLevel: 'A2', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Read the following text aloud clearly:',
    speakingPrompt: 'Last Saturday, I went to the park with my friends. The weather was sunny and warm. We had a picnic and played football. It was a great day.',
    correctAnswer: '', points: 1, orderIndex: 3,
    rubric: { criteria: ['clear pronunciation', 'appropriate pace', 'intonation', 'past tense pronunciation'], maxDuration: 45 },
    tags: ['read aloud', 'past tense'], timeSuggested: 45
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Describe your favorite food. What is it? Why do you like it? How often do you eat it? Speak for about 30 seconds.',
    speakingPrompt: 'Tell me about your favorite food.',
    correctAnswer: '', points: 1, orderIndex: 4,
    rubric: { criteria: ['descriptive vocabulary', 'simple sentences', 'relevant content', 'basic fluency'], maxDuration: 45 },
    tags: ['describe', 'food'], timeSuggested: 45
  },
  // B1 — Describe situation + opinion
  {
    language: 'English', cefrLevel: 'B1', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Look at the topic below and speak for about 45-60 seconds. Give your opinion and reasons.',
    speakingPrompt: 'Do you think it is important to learn a foreign language? Why or why not? Give at least two reasons.',
    correctAnswer: '', points: 2, orderIndex: 5,
    rubric: { criteria: ['coherent opinion', 'supporting reasons', 'linking words', 'appropriate vocabulary', 'fluency'], maxDuration: 60 },
    tags: ['opinion', 'education'], timeSuggested: 60
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Describe a situation and give your opinion. Speak for about 45-60 seconds.',
    speakingPrompt: 'Tell me about a challenge you faced and how you dealt with it. What did you learn from the experience?',
    correctAnswer: '', points: 2, orderIndex: 6,
    rubric: { criteria: ['narrative structure', 'past tenses', 'reflection', 'coherence', 'fluency'], maxDuration: 60 },
    tags: ['narrative', 'personal experience'], timeSuggested: 60
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Compare two things and give your preference. Speak for about 45-60 seconds.',
    speakingPrompt: 'Compare traveling by plane and traveling by train. Which do you prefer and why?',
    correctAnswer: '', points: 2, orderIndex: 7,
    rubric: { criteria: ['comparative structures', 'preference expression', 'supporting reasons', 'vocabulary range'], maxDuration: 60 },
    tags: ['comparison', 'travel'], timeSuggested: 60
  },
  // B2 — Describe and discuss
  {
    language: 'English', cefrLevel: 'B2', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Discuss the following topic for about 60-90 seconds. Present arguments for and against.',
    speakingPrompt: 'Some people believe that technology makes our lives easier, while others think it creates new problems. Discuss both sides and give your own opinion.',
    correctAnswer: '', points: 2, orderIndex: 8,
    rubric: { criteria: ['balanced discussion', 'sophisticated vocabulary', 'discourse markers', 'fluency and coherence', 'clear position'], maxDuration: 90 },
    tags: ['discussion', 'technology'], timeSuggested: 90
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Describe and analyze. Speak for about 60-90 seconds.',
    speakingPrompt: 'Describe how the way people communicate has changed over the last 20 years. What are the advantages and disadvantages of these changes?',
    correctAnswer: '', points: 2, orderIndex: 9,
    rubric: { criteria: ['analysis', 'cause and effect', 'examples', 'coherent argument', 'pronunciation accuracy'], maxDuration: 90 },
    tags: ['analysis', 'communication'], timeSuggested: 90
  },
  // C1 — Argue a position
  {
    language: 'English', cefrLevel: 'C1', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Present and defend a position on the following topic. Speak for about 90-120 seconds.',
    speakingPrompt: 'To what extent should governments regulate social media platforms? Consider issues of free speech, misinformation, and privacy in your response.',
    correctAnswer: '', points: 3, orderIndex: 10,
    rubric: { criteria: ['sophisticated argumentation', 'nuanced position', 'hedging and qualification', 'academic vocabulary', 'sustained fluency', 'natural intonation'], maxDuration: 120 },
    tags: ['argumentation', 'politics', 'technology'], timeSuggested: 120
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Analyze and discuss. Speak for about 90-120 seconds.',
    speakingPrompt: 'Some argue that globalization has reduced cultural diversity. Others say it has enriched it. What is your view? Provide specific examples.',
    correctAnswer: '', points: 3, orderIndex: 11,
    rubric: { criteria: ['critical thinking', 'specific examples', 'complex sentence structures', 'idiomatic language', 'coherent extended speech'], maxDuration: 120 },
    tags: ['analysis', 'culture', 'globalization'], timeSuggested: 120
  },
  // C2 — Abstract discussion
  {
    language: 'English', cefrLevel: 'C2', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Discuss the following abstract topic in depth. Speak for about 2 minutes.',
    speakingPrompt: 'Is it possible to have true objectivity in journalism, or is all reporting inherently subjective? Explore the philosophical implications of this question.',
    correctAnswer: '', points: 3, orderIndex: 12,
    rubric: { criteria: ['philosophical depth', 'abstract reasoning', 'near-native fluency', 'sophisticated register', 'rhetorical skill', 'nuanced conclusion'], maxDuration: 150 },
    tags: ['abstract', 'philosophy', 'media'], timeSuggested: 150
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Present a nuanced argument on the following topic. Speak for about 2 minutes.',
    speakingPrompt: 'To what degree does the language we speak shape the way we think and perceive the world? Draw on examples from different languages or cultures if possible.',
    correctAnswer: '', points: 3, orderIndex: 13,
    rubric: { criteria: ['intellectual depth', 'cross-cultural references', 'precise vocabulary', 'natural discourse flow', 'elegant expression'], maxDuration: 150 },
    tags: ['abstract', 'linguistics', 'culture'], timeSuggested: 150
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Respond to the following philosophical dilemma. Speak for about 2 minutes.',
    speakingPrompt: 'If an artificial intelligence can produce creative works indistinguishable from human art, does this diminish the value of human creativity? Why or why not?',
    correctAnswer: '', points: 3, orderIndex: 14,
    rubric: { criteria: ['philosophical reasoning', 'counterargument consideration', 'eloquent expression', 'sustained argument', 'natural prosody'], maxDuration: 150 },
    tags: ['abstract', 'AI', 'creativity'], timeSuggested: 150
  }
]
