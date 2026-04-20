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
    speakingPrompt: 'Last Saturday, I went to a conference with my colleagues. The hotel was modern and comfortable. We attended three workshops and met new clients. It was a productive day.',
    correctAnswer: '', points: 1, orderIndex: 3,
    rubric: { criteria: ['clear pronunciation', 'appropriate pace', 'intonation', 'past tense pronunciation'], maxDuration: 45 },
    tags: ['read aloud', 'past tense'], timeSuggested: 45
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Describe your typical business lunch. Where do you go? What do you usually order? Speak for about 30 seconds.',
    speakingPrompt: 'Tell me about your typical business lunch.',
    correctAnswer: '', points: 1, orderIndex: 4,
    rubric: { criteria: ['descriptive vocabulary', 'simple sentences', 'relevant content', 'basic fluency'], maxDuration: 45 },
    tags: ['describe', 'business'], timeSuggested: 45
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
  },

  // ============================================================
  // NEW QUESTIONS — 16 more (orderIndex 15-30)
  // ============================================================

  // A1 — Introduce yourself, describe pictures
  {
    language: 'English', cefrLevel: 'A1', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Look at the picture and describe what you see. Use simple words.',
    speakingPrompt: 'Describe the picture: There are people in an office. What are they doing?',
    correctAnswer: '', points: 1, orderIndex: 15,
    rubric: { criteria: ['basic vocabulary', 'simple sentences', 'comprehensible speech'], maxDuration: 30 },
    tags: ['describe picture', 'office'], timeSuggested: 30
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Tell me about yourself. Speak for about 15-20 seconds.',
    speakingPrompt: 'What is your job? Where do you work? Do you like your job?',
    correctAnswer: '', points: 1, orderIndex: 16,
    rubric: { criteria: ['comprehensible response', 'basic vocabulary', 'relevant content'], maxDuration: 30 },
    tags: ['introduction', 'work'], timeSuggested: 30
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Answer the following question. Speak for about 15-20 seconds:',
    speakingPrompt: 'What is your daily commute like? How do you get to work?',
    correctAnswer: '', points: 1, orderIndex: 17,
    rubric: { criteria: ['basic vocabulary', 'simple sentences', 'comprehensible speech'], maxDuration: 30 },
    tags: ['simple question', 'commute'], timeSuggested: 30
  },

  // A2 — Describe routines, tell a story
  {
    language: 'English', cefrLevel: 'A2', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Describe your morning routine. Speak for about 30 seconds.',
    speakingPrompt: 'What do you do every morning? Tell me from when you wake up to when you leave home.',
    correctAnswer: '', points: 1, orderIndex: 18,
    rubric: { criteria: ['time expressions', 'present simple', 'sequence words', 'clear pronunciation'], maxDuration: 45 },
    tags: ['routine', 'daily life'], timeSuggested: 45
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Describe a recent activity. Speak for about 30 seconds.',
    speakingPrompt: 'Describe what you did at work or at home yesterday. Mention the time, the place, and at least three actions.',
    correctAnswer: '', points: 1, orderIndex: 19,
    rubric: { criteria: ['past tense', 'time expressions', 'sequence words', 'clear pronunciation'], maxDuration: 45 },
    tags: ['routine', 'past tense'], timeSuggested: 45
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Look at the image and describe what you see. Speak for about 45 seconds.',
    speakingPrompt: 'Describe the image: what is happening, who is in it, where it might be, and what you think happens next.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Open_office_at_Stack_Exchange.jpg/640px-Open_office_at_Stack_Exchange.jpg',
    correctAnswer: '', points: 1, orderIndex: 22,
    rubric: { criteria: ['descriptive vocabulary', 'present continuous', 'spatial language', 'speculation (might / could / probably)'], maxDuration: 60 },
    tags: ['image description', 'workplace'], timeSuggested: 50
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Look at the image and describe and interpret it. Speak for about 45-60 seconds.',
    speakingPrompt: 'Describe the scene in detail and explain what story it tells. What emotions does it convey? What might have happened just before?',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Fronalpstock_big.jpg/640px-Fronalpstock_big.jpg',
    correctAnswer: '', points: 1, orderIndex: 23,
    rubric: { criteria: ['rich descriptive vocabulary', 'interpretation', 'speculation', 'fluency without long pauses'], maxDuration: 75 },
    tags: ['image description', 'landscape'], timeSuggested: 60
  },

  // B1 — Give opinions, explain plans
  {
    language: 'English', cefrLevel: 'B1', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Talk about the following topic for about 45-60 seconds. Give your opinion.',
    speakingPrompt: 'Do you think employees should be allowed to work from home? How often? Why or why not?',
    correctAnswer: '', points: 1, orderIndex: 20,
    rubric: { criteria: ['coherent opinion', 'supporting reasons', 'linking words', 'fluency'], maxDuration: 60 },
    tags: ['opinion', 'technology'], timeSuggested: 60
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Explain your plans for the future. Speak for about 45-60 seconds.',
    speakingPrompt: 'What are your plans for the next five years? What would you like to achieve and why?',
    correctAnswer: '', points: 1, orderIndex: 21,
    rubric: { criteria: ['future tenses', 'conditional structures', 'coherent plan', 'appropriate vocabulary'], maxDuration: 60 },
    tags: ['plans', 'future'], timeSuggested: 60
  },

  // B2 — Debate topics, analyse situations
  {
    language: 'English', cefrLevel: 'B2', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Discuss the following topic for about 60-90 seconds. Present multiple perspectives.',
    speakingPrompt: 'Should university education be free for everyone? What are the economic and social implications?',
    correctAnswer: '', points: 2, orderIndex: 22,
    rubric: { criteria: ['balanced discussion', 'sophisticated vocabulary', 'discourse markers', 'fluency and coherence'], maxDuration: 90 },
    tags: ['debate', 'education'], timeSuggested: 90
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Analyse the following situation. Speak for about 60-90 seconds.',
    speakingPrompt: 'Many companies are adopting a four-day working week. Analyse the possible effects on productivity, employee wellbeing, and the economy.',
    correctAnswer: '', points: 2, orderIndex: 23,
    rubric: { criteria: ['analysis', 'cause and effect', 'examples', 'coherent argument', 'pronunciation accuracy'], maxDuration: 90 },
    tags: ['analysis', 'work'], timeSuggested: 90
  },

  // C1 — Present arguments, discuss abstract ideas
  {
    language: 'English', cefrLevel: 'C1', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Present and defend a position. Speak for about 90-120 seconds.',
    speakingPrompt: 'Is economic growth compatible with environmental sustainability, or must one be sacrificed for the other? Justify your position with evidence.',
    correctAnswer: '', points: 2, orderIndex: 24,
    rubric: { criteria: ['sophisticated argumentation', 'nuanced position', 'hedging and qualification', 'academic vocabulary', 'sustained fluency'], maxDuration: 120 },
    tags: ['argumentation', 'environment', 'economics'], timeSuggested: 120
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Discuss the following abstract idea. Speak for about 90-120 seconds.',
    speakingPrompt: 'What role does empathy play in effective leadership? Can empathy be taught, or is it an innate quality?',
    correctAnswer: '', points: 2, orderIndex: 25,
    rubric: { criteria: ['critical thinking', 'abstract reasoning', 'complex sentence structures', 'idiomatic language', 'coherent extended speech'], maxDuration: 120 },
    tags: ['abstract', 'leadership'], timeSuggested: 120
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Analyse and discuss. Speak for about 90-120 seconds.',
    speakingPrompt: 'To what extent has the digital revolution widened or narrowed the gap between developed and developing nations? Provide concrete examples.',
    correctAnswer: '', points: 2, orderIndex: 26,
    rubric: { criteria: ['critical analysis', 'specific examples', 'academic register', 'sustained argumentation', 'natural intonation'], maxDuration: 120 },
    tags: ['analysis', 'technology', 'inequality'], timeSuggested: 120
  },

  // C2 — Philosophical discussion, nuanced argumentation
  {
    language: 'English', cefrLevel: 'C2', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Discuss the following philosophical question in depth. Speak for about 2 minutes.',
    speakingPrompt: 'Can a society that prioritises individual freedom ever achieve true equality? Explore the inherent tensions between liberty and equality.',
    correctAnswer: '', points: 2, orderIndex: 27,
    rubric: { criteria: ['philosophical depth', 'abstract reasoning', 'near-native fluency', 'sophisticated register', 'rhetorical skill'], maxDuration: 150 },
    tags: ['philosophy', 'politics', 'abstract'], timeSuggested: 150
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Present a nuanced argument on the following topic. Speak for about 2 minutes.',
    speakingPrompt: 'Is the concept of "progress" culturally relative, or are there universal measures by which we can judge whether humanity is moving forward?',
    correctAnswer: '', points: 2, orderIndex: 28,
    rubric: { criteria: ['intellectual depth', 'cross-cultural references', 'precise vocabulary', 'natural discourse flow', 'elegant expression'], maxDuration: 150 },
    tags: ['abstract', 'culture', 'philosophy'], timeSuggested: 150
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Respond to the following ethical dilemma. Speak for about 2 minutes.',
    speakingPrompt: 'Should there be limits to scientific research in fields such as genetic engineering and human enhancement? Where should those limits lie and who should set them?',
    correctAnswer: '', points: 2, orderIndex: 29,
    rubric: { criteria: ['ethical reasoning', 'counterargument consideration', 'eloquent expression', 'sustained argument', 'natural prosody'], maxDuration: 150 },
    tags: ['ethics', 'science', 'abstract'], timeSuggested: 150
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Discuss the following topic with philosophical depth. Speak for about 2 minutes.',
    speakingPrompt: 'Does the pursuit of happiness as a life goal lead to a meaningful existence, or is meaning found through suffering and sacrifice? Discuss with reference to philosophical traditions.',
    correctAnswer: '', points: 2, orderIndex: 30,
    rubric: { criteria: ['philosophical reasoning', 'literary/philosophical references', 'sophisticated register', 'sustained fluency', 'nuanced conclusion'], maxDuration: 150 },
    tags: ['philosophy', 'abstract', 'existentialism'], timeSuggested: 150
  }
]
