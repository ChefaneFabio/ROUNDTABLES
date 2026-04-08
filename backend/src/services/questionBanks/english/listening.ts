import { MultiSkillQuestionData } from '../types'

// English Listening Questions — ~7 per CEFR level (42 total)
// Types: MULTIPLE_CHOICE after audio, DICTATION
// Each question includes ttsScript for TTS generation

export const englishListeningQuestions: MultiSkillQuestionData[] = [
  // ============================================================
  // A1 — Beginner (7 questions)
  // ============================================================
  {
    language: 'English', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Hello. My name is John. I am from England. I am twenty-five years old. I like football.',
    ttsLanguageCode: 'en-US',
    questionText: 'Where is John from?',
    options: [{ label: 'France', value: 'France' }, { label: 'England', value: 'England' }, { label: 'Spain', value: 'Spain' }, { label: 'Italy', value: 'Italy' }],
    correctAnswer: 'England', points: 1, orderIndex: 1, tags: ['introduction'], timeSuggested: 30
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Hello. My name is John. I am from England. I am twenty-five years old. I like football.',
    ttsLanguageCode: 'en-US',
    questionText: 'How old is John?',
    options: [{ label: '20', value: '20' }, { label: '25', value: '25' }, { label: '30', value: '30' }, { label: '35', value: '35' }],
    correctAnswer: '25', points: 1, orderIndex: 2, tags: ['introduction', 'numbers'], timeSuggested: 30
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Excuse me, where is the bank? Go straight, then turn left. The bank is next to the supermarket.',
    ttsLanguageCode: 'en-US',
    questionText: 'Where is the bank?',
    options: [{ label: 'Next to the school', value: 'next to the school' }, { label: 'Next to the supermarket', value: 'next to the supermarket' }, { label: 'Next to the park', value: 'next to the park' }, { label: 'Next to the hospital', value: 'next to the hospital' }],
    correctAnswer: 'next to the supermarket', points: 1, orderIndex: 3, tags: ['directions'], timeSuggested: 30
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'I like to eat pizza.',
    ttsLanguageCode: 'en-US',
    questionText: 'Write exactly what you hear.',
    correctAnswer: 'I like to eat pizza.', points: 1, orderIndex: 4, tags: ['dictation'], timeSuggested: 30
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Today is Monday. Tomorrow is Tuesday. I have English class on Wednesday.',
    ttsLanguageCode: 'en-US',
    questionText: 'When is the English class?',
    options: [{ label: 'Monday', value: 'Monday' }, { label: 'Tuesday', value: 'Tuesday' }, { label: 'Wednesday', value: 'Wednesday' }, { label: 'Thursday', value: 'Thursday' }],
    correctAnswer: 'Wednesday', points: 1, orderIndex: 5, tags: ['days'], timeSuggested: 30
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Can I have a coffee, please? Of course. That is two euros fifty.',
    ttsLanguageCode: 'en-US',
    questionText: 'How much is the coffee?',
    options: [{ label: '1.50 euros', value: '1.50' }, { label: '2.00 euros', value: '2.00' }, { label: '2.50 euros', value: '2.50' }, { label: '3.00 euros', value: '3.00' }],
    correctAnswer: '2.50', points: 1, orderIndex: 6, tags: ['shopping', 'numbers'], timeSuggested: 30
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'The cat is on the table.',
    ttsLanguageCode: 'en-US',
    questionText: 'Write exactly what you hear.',
    correctAnswer: 'The cat is on the table.', points: 1, orderIndex: 7, tags: ['dictation'], timeSuggested: 30
  },

  // ============================================================
  // A2 — Elementary (7 questions)
  // ============================================================
  {
    language: 'English', cefrLevel: 'A2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'I went to the cinema last night with my sister. We watched a comedy. It was very funny. After the film, we had dinner at an Italian restaurant.',
    ttsLanguageCode: 'en-US',
    questionText: 'What kind of film did they watch?',
    options: [{ label: 'Action', value: 'action' }, { label: 'Comedy', value: 'comedy' }, { label: 'Horror', value: 'horror' }, { label: 'Drama', value: 'drama' }],
    correctAnswer: 'comedy', points: 1, orderIndex: 8, tags: ['entertainment'], timeSuggested: 40
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'I went to the cinema last night with my sister. We watched a comedy. It was very funny. After the film, we had dinner at an Italian restaurant.',
    ttsLanguageCode: 'en-US',
    questionText: 'Who did the speaker go to the cinema with?',
    options: [{ label: 'A friend', value: 'a friend' }, { label: 'Their sister', value: 'their sister' }, { label: 'Their mother', value: 'their mother' }, { label: 'Alone', value: 'alone' }],
    correctAnswer: 'their sister', points: 1, orderIndex: 9, tags: ['entertainment'], timeSuggested: 40
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'The train to Manchester leaves at platform three at nine fifteen. Please have your tickets ready.',
    ttsLanguageCode: 'en-US',
    questionText: 'What platform does the train leave from?',
    options: [{ label: 'Platform 1', value: '1' }, { label: 'Platform 2', value: '2' }, { label: 'Platform 3', value: '3' }, { label: 'Platform 4', value: '4' }],
    correctAnswer: '3', points: 1, orderIndex: 10, tags: ['transport'], timeSuggested: 40
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'She goes to work by bus every morning.',
    ttsLanguageCode: 'en-US',
    questionText: 'Write exactly what you hear.',
    correctAnswer: 'She goes to work by bus every morning.', points: 1, orderIndex: 11, tags: ['dictation'], timeSuggested: 40
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Welcome to the museum. It is open from nine in the morning to five in the afternoon. The tickets cost eight pounds for adults and four pounds for children. There is a café on the second floor.',
    ttsLanguageCode: 'en-US',
    questionText: 'How much is a ticket for an adult?',
    options: [{ label: '4 pounds', value: '4' }, { label: '6 pounds', value: '6' }, { label: '8 pounds', value: '8' }, { label: '10 pounds', value: '10' }],
    correctAnswer: '8', points: 1, orderIndex: 12, tags: ['tourism'], timeSuggested: 40
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'I usually wake up at seven o\'clock. First, I take a shower and get dressed. Then I have breakfast — usually toast and coffee. I leave the house at eight thirty.',
    ttsLanguageCode: 'en-US',
    questionText: 'What does the speaker usually have for breakfast?',
    options: [{ label: 'Cereal and milk', value: 'cereal' }, { label: 'Toast and coffee', value: 'toast and coffee' }, { label: 'Eggs and juice', value: 'eggs' }, { label: 'Nothing', value: 'nothing' }],
    correctAnswer: 'toast and coffee', points: 1, orderIndex: 13, tags: ['daily routine'], timeSuggested: 40
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'We had a wonderful holiday in Spain last year.',
    ttsLanguageCode: 'en-US',
    questionText: 'Write exactly what you hear.',
    correctAnswer: 'We had a wonderful holiday in Spain last year.', points: 1, orderIndex: 14, tags: ['dictation'], timeSuggested: 40
  },

  // ============================================================
  // B1 — Intermediate (7 questions)
  // ============================================================
  {
    language: 'English', cefrLevel: 'B1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Good morning. I would like to make an appointment to see Doctor Williams, please. I have been having headaches for about a week now. The earliest available slot is next Thursday at two thirty. Would that work for you?',
    ttsLanguageCode: 'en-US',
    questionText: 'Why is the person calling?',
    options: [
      { label: 'To cancel an appointment', value: 'cancel' },
      { label: 'To make a doctor\'s appointment', value: 'make appointment' },
      { label: 'To ask about medication', value: 'medication' },
      { label: 'To complain about the service', value: 'complain' }
    ],
    correctAnswer: 'make appointment', points: 2, orderIndex: 15, tags: ['health', 'appointments'], timeSuggested: 45
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Good morning. I would like to make an appointment to see Doctor Williams, please. I have been having headaches for about a week now. The earliest available slot is next Thursday at two thirty.',
    ttsLanguageCode: 'en-US',
    questionText: 'When is the earliest appointment available?',
    options: [
      { label: 'Monday at 2:00', value: 'monday 2:00' },
      { label: 'Wednesday at 3:00', value: 'wednesday 3:00' },
      { label: 'Thursday at 2:30', value: 'thursday 2:30' },
      { label: 'Friday at 10:00', value: 'friday 10:00' }
    ],
    correctAnswer: 'thursday 2:30', points: 2, orderIndex: 16, tags: ['appointments'], timeSuggested: 45
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'According to a recent survey, seventy percent of young people aged eighteen to twenty-five check their phones within the first ten minutes of waking up. Experts warn that this habit can increase stress levels and reduce productivity throughout the day.',
    ttsLanguageCode: 'en-US',
    questionText: 'What percentage of young people check their phones soon after waking?',
    options: [{ label: '50%', value: '50' }, { label: '60%', value: '60' }, { label: '70%', value: '70' }, { label: '80%', value: '80' }],
    correctAnswer: '70', points: 2, orderIndex: 17, tags: ['technology', 'health'], timeSuggested: 45
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'The company has decided to introduce flexible working hours for all employees starting next month.',
    ttsLanguageCode: 'en-US',
    questionText: 'Write exactly what you hear.',
    correctAnswer: 'The company has decided to introduce flexible working hours for all employees starting next month.', points: 2, orderIndex: 18, tags: ['dictation', 'work'], timeSuggested: 60
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Attention passengers. The twelve fifteen flight to Barcelona has been delayed by approximately forty-five minutes due to bad weather. We apologize for the inconvenience. Please check the departure board for updates.',
    ttsLanguageCode: 'en-US',
    questionText: 'Why is the flight delayed?',
    options: [
      { label: 'Technical problems', value: 'technical' },
      { label: 'Bad weather', value: 'bad weather' },
      { label: 'Staff shortage', value: 'staff' },
      { label: 'Security check', value: 'security' }
    ],
    correctAnswer: 'bad weather', points: 2, orderIndex: 19, tags: ['travel'], timeSuggested: 45
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'The new community center will open in March. It will have a swimming pool, a gym, and several meeting rooms. Membership costs thirty pounds per month for adults. There are discounts for students and senior citizens.',
    ttsLanguageCode: 'en-US',
    questionText: 'Who can get discounts on membership?',
    options: [
      { label: 'Children and teachers', value: 'children and teachers' },
      { label: 'Students and senior citizens', value: 'students and seniors' },
      { label: 'Families and couples', value: 'families' },
      { label: 'Everyone', value: 'everyone' }
    ],
    correctAnswer: 'students and seniors', points: 2, orderIndex: 20, tags: ['community'], timeSuggested: 45
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'Although the weather was terrible, we still managed to enjoy our day at the beach.',
    ttsLanguageCode: 'en-US',
    questionText: 'Write exactly what you hear.',
    correctAnswer: 'Although the weather was terrible, we still managed to enjoy our day at the beach.', points: 2, orderIndex: 21, tags: ['dictation'], timeSuggested: 60
  },

  // ============================================================
  // B2 — Upper Intermediate (7 questions)
  // ============================================================
  {
    language: 'English', cefrLevel: 'B2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'The research team at Oxford University has published findings suggesting that regular meditation can physically alter the structure of the brain. Participants who meditated for thirty minutes daily over eight weeks showed increased gray matter density in areas associated with memory and emotional regulation, while areas linked to stress showed a decrease in density.',
    ttsLanguageCode: 'en-US',
    questionText: 'What happened to the stress-related areas of the brain?',
    options: [
      { label: 'They increased in size', value: 'increased' },
      { label: 'They showed decreased density', value: 'decreased density' },
      { label: 'They were unaffected', value: 'unaffected' },
      { label: 'They improved in function', value: 'improved' }
    ],
    correctAnswer: 'decreased density', points: 2, orderIndex: 22, tags: ['science', 'health'], timeSuggested: 60
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'The research team at Oxford University has published findings suggesting that regular meditation can physically alter the structure of the brain. Participants who meditated for thirty minutes daily over eight weeks showed increased gray matter density in areas associated with memory and emotional regulation.',
    ttsLanguageCode: 'en-US',
    questionText: 'How long did participants meditate each day?',
    options: [{ label: '10 minutes', value: '10' }, { label: '20 minutes', value: '20' }, { label: '30 minutes', value: '30' }, { label: '60 minutes', value: '60' }],
    correctAnswer: '30', points: 2, orderIndex: 23, tags: ['science'], timeSuggested: 60
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Many people assume that multitasking makes them more productive, but neuroscience research tells a different story. When we switch between tasks, our brains need time to reorient, which actually reduces efficiency. Studies suggest that what we call multitasking is really rapid task-switching, and it can reduce productivity by up to forty percent.',
    ttsLanguageCode: 'en-US',
    questionText: 'According to the passage, multitasking can reduce productivity by up to:',
    options: [{ label: '10%', value: '10' }, { label: '20%', value: '20' }, { label: '30%', value: '30' }, { label: '40%', value: '40' }],
    correctAnswer: '40', points: 2, orderIndex: 24, tags: ['productivity'], timeSuggested: 60
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'Despite the economic downturn, the company managed to increase its profits by diversifying its product range and expanding into new markets.',
    ttsLanguageCode: 'en-US',
    questionText: 'Write exactly what you hear.',
    correctAnswer: 'Despite the economic downturn, the company managed to increase its profits by diversifying its product range and expanding into new markets.', points: 2, orderIndex: 25, tags: ['dictation', 'business'], timeSuggested: 90
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'The city council has announced plans to convert the abandoned factory on Riverside Drive into a mixed-use development. The project will include affordable housing, retail space, and a public park. Construction is expected to begin in the spring and should be completed within two years. Local residents have expressed mixed feelings — some welcome the development, while others are concerned about increased traffic and noise.',
    ttsLanguageCode: 'en-US',
    questionText: 'What concern do some residents have?',
    options: [
      { label: 'Higher taxes', value: 'taxes' },
      { label: 'Increased traffic and noise', value: 'traffic and noise' },
      { label: 'Loss of green space', value: 'green space' },
      { label: 'Crime rates', value: 'crime' }
    ],
    correctAnswer: 'traffic and noise', points: 2, orderIndex: 26, tags: ['community', 'urban'], timeSuggested: 60
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'The concept of universal basic income has gained traction in recent years, particularly following the economic disruption caused by automation. Proponents argue that providing every citizen with a guaranteed minimum income would reduce poverty and give people the freedom to pursue education or entrepreneurship. Skeptics worry about the cost and potential effects on work incentives.',
    ttsLanguageCode: 'en-US',
    questionText: 'What concern do skeptics have about universal basic income?',
    options: [
      { label: 'It would be too complicated to administer', value: 'complicated' },
      { label: 'The cost and potential effects on work incentives', value: 'cost and work incentives' },
      { label: 'It would increase inequality', value: 'inequality' },
      { label: 'It would reduce education standards', value: 'education' }
    ],
    correctAnswer: 'cost and work incentives', points: 2, orderIndex: 27, tags: ['economics', 'politics'], timeSuggested: 60
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'The government has pledged to invest heavily in renewable energy infrastructure over the next decade.',
    ttsLanguageCode: 'en-US',
    questionText: 'Write exactly what you hear.',
    correctAnswer: 'The government has pledged to invest heavily in renewable energy infrastructure over the next decade.', points: 2, orderIndex: 28, tags: ['dictation', 'politics'], timeSuggested: 90
  },

  // ============================================================
  // C1 — Advanced (7 questions)
  // ============================================================
  {
    language: 'English', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'The phenomenon of cognitive dissonance, first described by Leon Festinger in nineteen fifty-seven, occurs when individuals hold two contradictory beliefs simultaneously. Rather than tolerating the discomfort, people tend to modify one of the beliefs or rationalize the inconsistency. This has significant implications for understanding political polarization, as individuals may reject credible evidence that contradicts their existing worldview.',
    ttsLanguageCode: 'en-US',
    questionText: 'How do people typically respond to cognitive dissonance?',
    options: [
      { label: 'They accept both contradictory beliefs', value: 'accept both' },
      { label: 'They modify a belief or rationalize the inconsistency', value: 'modify or rationalize' },
      { label: 'They seek professional help', value: 'seek help' },
      { label: 'They ignore both beliefs', value: 'ignore both' }
    ],
    correctAnswer: 'modify or rationalize', points: 3, orderIndex: 29, tags: ['psychology'], timeSuggested: 75
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Longitudinal studies tracking children from early childhood to adulthood have consistently shown that socioeconomic status at birth is one of the strongest predictors of educational attainment and lifetime earnings. However, interventions such as high-quality early childhood education and mentoring programs have shown promise in mitigating these disparities, particularly when implemented before age five.',
    ttsLanguageCode: 'en-US',
    questionText: 'At what age are interventions most effective according to the research?',
    options: [
      { label: 'Before age 5', value: 'before 5' },
      { label: 'Between 5 and 10', value: '5 to 10' },
      { label: 'During adolescence', value: 'adolescence' },
      { label: 'In early adulthood', value: 'early adulthood' }
    ],
    correctAnswer: 'before 5', points: 3, orderIndex: 30, tags: ['education', 'sociology'], timeSuggested: 75
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'The replication crisis in psychology refers to the discovery that many published findings in the field cannot be replicated by independent researchers. A landmark study in twenty fifteen attempted to reproduce one hundred psychology experiments and found that only thirty-nine percent yielded the same results. This has prompted calls for greater methodological rigor, pre-registration of studies, and open data sharing.',
    ttsLanguageCode: 'en-US',
    questionText: 'What percentage of psychology experiments were successfully replicated?',
    options: [{ label: '25%', value: '25' }, { label: '39%', value: '39' }, { label: '50%', value: '50' }, { label: '65%', value: '65' }],
    correctAnswer: '39', points: 3, orderIndex: 31, tags: ['science', 'research'], timeSuggested: 75
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'The unprecedented rate of technological change has fundamentally altered the nature of work, requiring continuous adaptation and lifelong learning.',
    ttsLanguageCode: 'en-US',
    questionText: 'Write exactly what you hear.',
    correctAnswer: 'The unprecedented rate of technological change has fundamentally altered the nature of work, requiring continuous adaptation and lifelong learning.', points: 3, orderIndex: 32, tags: ['dictation'], timeSuggested: 90
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'The concept of neuroplasticity — the brain\'s ability to reorganize itself by forming new neural connections — has revolutionized our understanding of cognitive rehabilitation. Patients who have suffered strokes, for instance, can sometimes recover lost functions because healthy parts of the brain compensate for the damaged areas. This process, however, requires intensive and sustained therapeutic intervention.',
    ttsLanguageCode: 'en-US',
    questionText: 'What is neuroplasticity?',
    options: [
      { label: 'The ability to learn multiple languages', value: 'languages' },
      { label: 'The brain\'s ability to form new neural connections', value: 'new neural connections' },
      { label: 'A type of brain surgery', value: 'surgery' },
      { label: 'Memory improvement through medication', value: 'medication' }
    ],
    correctAnswer: 'new neural connections', points: 3, orderIndex: 33, tags: ['science'], timeSuggested: 75
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'The concept of the circular economy represents a paradigm shift from the traditional linear model of production and consumption. Rather than following a take-make-dispose pattern, the circular economy aims to keep resources in use for as long as possible, extract maximum value from them, and then recover and regenerate products and materials at the end of their service life.',
    ttsLanguageCode: 'en-US',
    questionText: 'What is the traditional economic model described as?',
    options: [
      { label: 'Circular', value: 'circular' },
      { label: 'Take-make-dispose', value: 'take-make-dispose' },
      { label: 'Sustainable', value: 'sustainable' },
      { label: 'Regenerative', value: 'regenerative' }
    ],
    correctAnswer: 'take-make-dispose', points: 3, orderIndex: 34, tags: ['economics', 'environment'], timeSuggested: 75
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'Notwithstanding the considerable progress made in renewable energy, the transition away from fossil fuels remains fraught with economic and political challenges.',
    ttsLanguageCode: 'en-US',
    questionText: 'Write exactly what you hear.',
    correctAnswer: 'Notwithstanding the considerable progress made in renewable energy, the transition away from fossil fuels remains fraught with economic and political challenges.', points: 3, orderIndex: 35, tags: ['dictation'], timeSuggested: 90
  },

  // ============================================================
  // C2 — Proficiency (7 questions)
  // ============================================================
  {
    language: 'English', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'The philosophical implications of quantum entanglement are perhaps more profound than its physical properties. When two particles become entangled, measuring the state of one instantaneously determines the state of the other, regardless of the distance separating them. Einstein famously derided this as "spooky action at a distance," yet subsequent experiments have definitively confirmed its existence, challenging our most fundamental assumptions about locality and causality.',
    ttsLanguageCode: 'en-US',
    questionText: 'What did Einstein call quantum entanglement?',
    options: [
      { label: 'A beautiful theory', value: 'beautiful theory' },
      { label: 'Spooky action at a distance', value: 'spooky action at a distance' },
      { label: 'The uncertainty principle', value: 'uncertainty principle' },
      { label: 'A mathematical curiosity', value: 'mathematical curiosity' }
    ],
    correctAnswer: 'spooky action at a distance', points: 3, orderIndex: 36, tags: ['physics'], timeSuggested: 90
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'The philosophical implications of quantum entanglement are perhaps more profound than its physical properties. When two particles become entangled, measuring the state of one instantaneously determines the state of the other. Subsequent experiments have definitively confirmed its existence, challenging our most fundamental assumptions about locality and causality.',
    ttsLanguageCode: 'en-US',
    questionText: 'What fundamental assumptions does quantum entanglement challenge?',
    options: [
      { label: 'Gravity and magnetism', value: 'gravity and magnetism' },
      { label: 'Locality and causality', value: 'locality and causality' },
      { label: 'Time and space', value: 'time and space' },
      { label: 'Energy and matter', value: 'energy and matter' }
    ],
    correctAnswer: 'locality and causality', points: 3, orderIndex: 37, tags: ['physics'], timeSuggested: 90
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'The commodification of personal data has engendered a new form of surveillance capitalism, in which the extraction and monetization of behavioral data constitutes the primary revenue model for many technology companies. Shoshana Zuboff argues that this represents an unprecedented asymmetry of knowledge and power, fundamentally incompatible with democratic norms.',
    ttsLanguageCode: 'en-US',
    questionText: 'According to Zuboff, what does surveillance capitalism create?',
    options: [
      { label: 'Equal access to information', value: 'equal access' },
      { label: 'An unprecedented asymmetry of knowledge and power', value: 'asymmetry of knowledge and power' },
      { label: 'Better consumer products', value: 'better products' },
      { label: 'More efficient markets', value: 'efficient markets' }
    ],
    correctAnswer: 'asymmetry of knowledge and power', points: 3, orderIndex: 38, tags: ['technology', 'philosophy'], timeSuggested: 90
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'The epistemological ramifications of artificial intelligence extend far beyond its immediate practical applications, raising fundamental questions about the nature of knowledge itself.',
    ttsLanguageCode: 'en-US',
    questionText: 'Write exactly what you hear.',
    correctAnswer: 'The epistemological ramifications of artificial intelligence extend far beyond its immediate practical applications, raising fundamental questions about the nature of knowledge itself.', points: 3, orderIndex: 39, tags: ['dictation'], timeSuggested: 120
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'The so-called "replication crisis" has not been confined to psychology. Medicine, economics, and even some areas of physics have faced similar scrutiny. The underlying causes are multifaceted: publication bias favoring novel and statistically significant results, insufficient sample sizes, researcher degrees of freedom in data analysis, and perverse incentive structures within academia that prioritize quantity of publications over quality.',
    ttsLanguageCode: 'en-US',
    questionText: 'What does "publication bias" favor according to the passage?',
    options: [
      { label: 'Replicated results', value: 'replicated' },
      { label: 'Novel and statistically significant results', value: 'novel and significant' },
      { label: 'Large-scale studies', value: 'large-scale' },
      { label: 'Negative findings', value: 'negative' }
    ],
    correctAnswer: 'novel and significant', points: 3, orderIndex: 40, tags: ['science', 'methodology'], timeSuggested: 90
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'The concept of epistemic humility, rooted in Socratic philosophy, suggests that acknowledging the limits of one\'s knowledge is paradoxically a prerequisite for genuine understanding. In an age of information overload and confident assertions on social media, cultivating such humility may be more important than ever for both individual cognition and collective deliberation.',
    ttsLanguageCode: 'en-US',
    questionText: 'What is epistemic humility rooted in?',
    options: [
      { label: 'Modern psychology', value: 'modern psychology' },
      { label: 'Socratic philosophy', value: 'Socratic philosophy' },
      { label: 'Eastern meditation', value: 'eastern meditation' },
      { label: 'Scientific method', value: 'scientific method' }
    ],
    correctAnswer: 'Socratic philosophy', points: 3, orderIndex: 41, tags: ['philosophy'], timeSuggested: 90
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'Notwithstanding the ostensible democratization of information through digital technologies, access to high-quality, reliable knowledge remains deeply stratified along socioeconomic lines.',
    ttsLanguageCode: 'en-US',
    questionText: 'Write exactly what you hear.',
    correctAnswer: 'Notwithstanding the ostensible democratization of information through digital technologies, access to high-quality, reliable knowledge remains deeply stratified along socioeconomic lines.', points: 3, orderIndex: 42, tags: ['dictation'], timeSuggested: 120
  },

  // ============================================================
  // NEW QUESTIONS 43-72 (30 additional, 5 per level)
  // Mix: ~70% MULTIPLE_CHOICE, ~30% DICTATION
  // ============================================================

  // ============================================================
  // A1 — Beginner (43-47)
  // ============================================================
  {
    language: 'English', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'I have a red bag. My bag is big. I put my books in my bag. I take my bag to school every day.',
    ttsLanguageCode: 'en-US',
    questionText: 'What color is the bag?',
    options: [{ label: 'Blue', value: 'blue' }, { label: 'Red', value: 'red' }, { label: 'Green', value: 'green' }, { label: 'Yellow', value: 'yellow' }],
    correctAnswer: 'red', points: 1, orderIndex: 43, tags: ['colors', 'possessions'], timeSuggested: 30
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'I have a red bag. My bag is big. I put my books in my bag. I take my bag to school every day.',
    ttsLanguageCode: 'en-US',
    questionText: 'Where does the person take the bag?',
    options: [{ label: 'To work', value: 'to work' }, { label: 'To school', value: 'to school' }, { label: 'To the park', value: 'to the park' }, { label: 'To the shop', value: 'to the shop' }],
    correctAnswer: 'to school', points: 1, orderIndex: 44, tags: ['school', 'daily routine'], timeSuggested: 30
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'My sister likes fruit. She eats an apple every day. She also likes oranges and bananas. She does not like grapes.',
    ttsLanguageCode: 'en-US',
    questionText: 'Which fruit does the sister NOT like?',
    options: [{ label: 'Apples', value: 'apples' }, { label: 'Oranges', value: 'oranges' }, { label: 'Bananas', value: 'bananas' }, { label: 'Grapes', value: 'grapes' }],
    correctAnswer: 'grapes', points: 1, orderIndex: 45, tags: ['food', 'preferences'], timeSuggested: 30
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'She has two brothers and one sister.',
    ttsLanguageCode: 'en-US',
    questionText: 'Write exactly what you hear.',
    correctAnswer: 'She has two brothers and one sister.', points: 1, orderIndex: 46, tags: ['dictation', 'family'], timeSuggested: 30
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Good morning! The time is nine o\'clock. It is a sunny day. The temperature is twenty degrees.',
    ttsLanguageCode: 'en-US',
    questionText: 'What is the temperature?',
    options: [{ label: '10 degrees', value: '10' }, { label: '15 degrees', value: '15' }, { label: '20 degrees', value: '20' }, { label: '25 degrees', value: '25' }],
    correctAnswer: '20', points: 1, orderIndex: 47, tags: ['weather', 'numbers'], timeSuggested: 30
  },

  // ============================================================
  // A2 — Elementary (48-52)
  // ============================================================
  {
    language: 'English', cefrLevel: 'A2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Last weekend, I went to a friend\'s birthday party. There were about twenty people. We ate cake and danced. The party finished at midnight. I had a great time.',
    ttsLanguageCode: 'en-US',
    questionText: 'What time did the party finish?',
    options: [{ label: '10 PM', value: '10 PM' }, { label: '11 PM', value: '11 PM' }, { label: 'Midnight', value: 'midnight' }, { label: '1 AM', value: '1 AM' }],
    correctAnswer: 'midnight', points: 1, orderIndex: 48, tags: ['social', 'time'], timeSuggested: 40
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Last weekend, I went to a friend\'s birthday party. There were about twenty people. We ate cake and danced. The party finished at midnight. I had a great time.',
    ttsLanguageCode: 'en-US',
    questionText: 'How many people were at the party?',
    options: [{ label: 'About 10', value: '10' }, { label: 'About 20', value: '20' }, { label: 'About 30', value: '30' }, { label: 'About 50', value: '50' }],
    correctAnswer: '20', points: 1, orderIndex: 49, tags: ['social', 'numbers'], timeSuggested: 40
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Excuse me, I would like to return this shirt. I bought it yesterday, but it is too small. Do you have a larger size? Yes, we do. Would you like to try a medium or a large?',
    ttsLanguageCode: 'en-US',
    questionText: 'Why does the customer want to return the shirt?',
    options: [{ label: 'It is too expensive', value: 'too expensive' }, { label: 'It is the wrong color', value: 'wrong color' }, { label: 'It is too small', value: 'too small' }, { label: 'It is damaged', value: 'damaged' }],
    correctAnswer: 'too small', points: 1, orderIndex: 50, tags: ['shopping', 'complaints'], timeSuggested: 40
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'They are going to visit their grandparents next weekend.',
    ttsLanguageCode: 'en-US',
    questionText: 'Write exactly what you hear.',
    correctAnswer: 'They are going to visit their grandparents next weekend.', points: 1, orderIndex: 51, tags: ['dictation', 'family'], timeSuggested: 40
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'The library is on the second floor of the building. It is open from Monday to Saturday, from nine in the morning to seven in the evening. You can borrow up to five books at a time.',
    ttsLanguageCode: 'en-US',
    questionText: 'How many books can you borrow at a time?',
    options: [{ label: '3', value: '3' }, { label: '4', value: '4' }, { label: '5', value: '5' }, { label: '6', value: '6' }],
    correctAnswer: '5', points: 1, orderIndex: 52, tags: ['library', 'rules'], timeSuggested: 40
  },

  // ============================================================
  // B1 — Intermediate (53-57)
  // ============================================================
  {
    language: 'English', cefrLevel: 'B1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'A new study from the University of Cambridge suggests that learning a musical instrument as a child can improve academic performance. Children who had at least two years of music lessons scored higher in reading and mathematics tests compared to those who did not. Researchers believe that music training enhances concentration and working memory.',
    ttsLanguageCode: 'en-US',
    questionText: 'What does music training enhance according to researchers?',
    options: [
      { label: 'Physical fitness', value: 'physical fitness' },
      { label: 'Concentration and working memory', value: 'concentration and working memory' },
      { label: 'Social skills', value: 'social skills' },
      { label: 'Artistic creativity', value: 'artistic creativity' }
    ],
    correctAnswer: 'concentration and working memory', points: 1, orderIndex: 53, tags: ['education', 'music'], timeSuggested: 45
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'A new study from the University of Cambridge suggests that learning a musical instrument as a child can improve academic performance. Children who had at least two years of music lessons scored higher in reading and mathematics tests.',
    ttsLanguageCode: 'en-US',
    questionText: 'How long did children need to study music to show improvement?',
    options: [
      { label: 'At least one year', value: 'one year' },
      { label: 'At least two years', value: 'two years' },
      { label: 'At least three years', value: 'three years' },
      { label: 'At least five years', value: 'five years' }
    ],
    correctAnswer: 'two years', points: 1, orderIndex: 54, tags: ['education', 'research'], timeSuggested: 45
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Good afternoon, and welcome to City Tours. Today\'s walking tour will take approximately two hours. We will visit the old town, the cathedral, and the riverside market. Please stay with the group and feel free to ask questions at any time. We will have a fifteen-minute break at the market where you can buy refreshments.',
    ttsLanguageCode: 'en-US',
    questionText: 'How long will the tour take?',
    options: [
      { label: 'One hour', value: 'one hour' },
      { label: 'Ninety minutes', value: 'ninety minutes' },
      { label: 'Two hours', value: 'two hours' },
      { label: 'Three hours', value: 'three hours' }
    ],
    correctAnswer: 'two hours', points: 1, orderIndex: 55, tags: ['tourism', 'announcements'], timeSuggested: 45
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'If you have any questions about the assignment, please do not hesitate to contact me by email.',
    ttsLanguageCode: 'en-US',
    questionText: 'Write exactly what you hear.',
    correctAnswer: 'If you have any questions about the assignment, please do not hesitate to contact me by email.', points: 1, orderIndex: 56, tags: ['dictation', 'formal'], timeSuggested: 60
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Recent figures show that cycling to work has increased by thirty-five percent in major European cities over the past five years. City planners attribute this growth to improved cycling infrastructure, including dedicated bike lanes and bike-sharing programs. Health experts say this trend could help reduce obesity rates and improve air quality.',
    ttsLanguageCode: 'en-US',
    questionText: 'By how much has cycling to work increased?',
    options: [{ label: '15%', value: '15' }, { label: '25%', value: '25' }, { label: '35%', value: '35' }, { label: '45%', value: '45' }],
    correctAnswer: '35', points: 1, orderIndex: 57, tags: ['transport', 'statistics'], timeSuggested: 45
  },

  // ============================================================
  // B2 — Upper Intermediate (58-62)
  // ============================================================
  {
    language: 'English', cefrLevel: 'B2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'The sharing economy — exemplified by platforms such as Airbnb and car-sharing services — has disrupted traditional business models across multiple sectors. While consumers benefit from lower prices and greater convenience, established businesses complain of unfair competition, arguing that sharing economy platforms often operate in regulatory gray areas. Governments are now struggling to create frameworks that protect consumers and workers without stifling innovation.',
    ttsLanguageCode: 'en-US',
    questionText: 'What complaint do established businesses have?',
    options: [
      { label: 'Sharing platforms are too expensive', value: 'too expensive' },
      { label: 'Sharing platforms operate in regulatory gray areas', value: 'regulatory gray areas' },
      { label: 'Sharing platforms offer poor quality', value: 'poor quality' },
      { label: 'Sharing platforms do not advertise enough', value: 'not enough advertising' }
    ],
    correctAnswer: 'regulatory gray areas', points: 2, orderIndex: 58, tags: ['economics', 'technology'], timeSuggested: 60
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'A growing body of research indicates that prolonged exposure to social media can have detrimental effects on mental health, particularly among adolescents. Studies have linked heavy social media use to increased rates of anxiety, depression, and poor self-image. However, some researchers caution against oversimplifying the relationship, noting that social media can also provide valuable social support and a sense of community for marginalized groups.',
    ttsLanguageCode: 'en-US',
    questionText: 'What positive aspect of social media is mentioned?',
    options: [
      { label: 'It improves academic performance', value: 'academic performance' },
      { label: 'It provides social support for marginalized groups', value: 'social support for marginalized groups' },
      { label: 'It helps people earn money', value: 'earn money' },
      { label: 'It replaces the need for therapy', value: 'replaces therapy' }
    ],
    correctAnswer: 'social support for marginalized groups', points: 2, orderIndex: 59, tags: ['mental health', 'social media'], timeSuggested: 60
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Microplastics — tiny particles of plastic less than five millimeters in diameter — have been found in virtually every environment on Earth, from the deep ocean to Arctic ice. Recent studies have even detected them in human blood and lung tissue. While the long-term health implications remain unclear, scientists are calling for urgent research into the potential risks of microplastic accumulation in the human body.',
    ttsLanguageCode: 'en-US',
    questionText: 'Where have microplastics been detected recently?',
    options: [
      { label: 'Only in the ocean', value: 'only ocean' },
      { label: 'In human blood and lung tissue', value: 'human blood and lung tissue' },
      { label: 'Only in food products', value: 'only food' },
      { label: 'Only in rivers', value: 'only rivers' }
    ],
    correctAnswer: 'human blood and lung tissue', points: 2, orderIndex: 60, tags: ['environment', 'health'], timeSuggested: 60
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'Although the initial findings were promising, further research is needed before any definitive conclusions can be drawn.',
    ttsLanguageCode: 'en-US',
    questionText: 'Write exactly what you hear.',
    correctAnswer: 'Although the initial findings were promising, further research is needed before any definitive conclusions can be drawn.', points: 2, orderIndex: 61, tags: ['dictation', 'academic'], timeSuggested: 90
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'The concept of emotional intelligence, popularized by Daniel Goleman in the nineteen nineties, refers to the ability to recognize, understand, and manage both one\'s own emotions and those of others. Research suggests that emotional intelligence is at least as important as cognitive intelligence in predicting professional success, particularly in leadership roles.',
    ttsLanguageCode: 'en-US',
    questionText: 'Who popularized the concept of emotional intelligence?',
    options: [
      { label: 'Howard Gardner', value: 'Howard Gardner' },
      { label: 'Daniel Goleman', value: 'Daniel Goleman' },
      { label: 'Abraham Maslow', value: 'Abraham Maslow' },
      { label: 'Carl Rogers', value: 'Carl Rogers' }
    ],
    correctAnswer: 'Daniel Goleman', points: 2, orderIndex: 62, tags: ['psychology', 'leadership'], timeSuggested: 60
  },

  // ============================================================
  // C1 — Advanced (63-67)
  // ============================================================
  {
    language: 'English', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'The concept of "nudging," developed by behavioral economists Richard Thaler and Cass Sunstein, refers to designing choice architectures that subtly guide people toward better decisions without restricting their freedom. Examples include placing healthier food options at eye level in cafeterias or making organ donation the default option on driver\'s license applications. Critics argue that nudging is paternalistic and manipulative, while proponents contend that it merely corrects for well-documented cognitive biases.',
    ttsLanguageCode: 'en-US',
    questionText: 'What is an example of nudging mentioned in the passage?',
    options: [
      { label: 'Banning unhealthy food', value: 'banning food' },
      { label: 'Making organ donation the default option', value: 'organ donation default' },
      { label: 'Increasing taxes on sugar', value: 'sugar tax' },
      { label: 'Requiring exercise in schools', value: 'exercise in schools' }
    ],
    correctAnswer: 'organ donation default', points: 2, orderIndex: 63, tags: ['behavioral economics', 'policy'], timeSuggested: 75
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Impostor syndrome — the persistent feeling that one\'s success is undeserved and that one will eventually be exposed as a fraud — affects an estimated seventy percent of people at some point in their lives. Paradoxically, it tends to be most prevalent among high achievers. Psychologists attribute this to the Dunning-Kruger effect in reverse: the more competent individuals become, the more acutely aware they are of how much they do not know.',
    ttsLanguageCode: 'en-US',
    questionText: 'What percentage of people experience impostor syndrome at some point?',
    options: [{ label: '30%', value: '30' }, { label: '50%', value: '50' }, { label: '70%', value: '70' }, { label: '90%', value: '90' }],
    correctAnswer: '70', points: 2, orderIndex: 64, tags: ['psychology'], timeSuggested: 75
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'The phenomenon known as "brain drain" — the emigration of highly skilled professionals from developing to developed countries — poses a significant challenge to economic development. While remittances sent back by emigrants contribute to the home economy, the loss of doctors, engineers, and scientists diminishes the domestic capacity for innovation and public service delivery. Some nations have attempted to address this through "brain circulation" policies that encourage temporary migration and knowledge transfer.',
    ttsLanguageCode: 'en-US',
    questionText: 'What are "brain circulation" policies designed to encourage?',
    options: [
      { label: 'Permanent emigration', value: 'permanent emigration' },
      { label: 'Temporary migration and knowledge transfer', value: 'temporary migration and knowledge transfer' },
      { label: 'Banning skilled workers from leaving', value: 'banning departure' },
      { label: 'Reducing university enrollment', value: 'reducing enrollment' }
    ],
    correctAnswer: 'temporary migration and knowledge transfer', points: 2, orderIndex: 65, tags: ['economics', 'migration'], timeSuggested: 75
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'The interdisciplinary nature of the research necessitates collaboration between experts in fields as diverse as neuroscience, philosophy, and computer science.',
    ttsLanguageCode: 'en-US',
    questionText: 'Write exactly what you hear.',
    correctAnswer: 'The interdisciplinary nature of the research necessitates collaboration between experts in fields as diverse as neuroscience, philosophy, and computer science.', points: 2, orderIndex: 66, tags: ['dictation', 'academic'], timeSuggested: 90
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'The Overton window — a concept from political theory — describes the range of policies that are considered politically acceptable at any given time. Ideas that fall outside this window are deemed too radical for mainstream discourse. However, the window can shift dramatically in response to crises, social movements, or technological change. What was once unthinkable can become common sense within a generation.',
    ttsLanguageCode: 'en-US',
    questionText: 'What can cause the Overton window to shift?',
    options: [
      { label: 'Only elections', value: 'only elections' },
      { label: 'Crises, social movements, or technological change', value: 'crises, movements, or technology' },
      { label: 'Only academic research', value: 'only research' },
      { label: 'Only economic growth', value: 'only growth' }
    ],
    correctAnswer: 'crises, movements, or technology', points: 2, orderIndex: 67, tags: ['politics', 'theory'], timeSuggested: 75
  },

  // ============================================================
  // C2 — Proficiency (68-72)
  // ============================================================
  {
    language: 'English', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'The concept of "moral luck," introduced by philosophers Bernard Williams and Thomas Nagel, challenges the intuition that moral judgments should be based solely on factors within an agent\'s control. Consider two equally reckless drivers: one arrives home safely, while the other kills a pedestrian. Despite identical choices and intentions, we judge the latter far more harshly. This asymmetry suggests that our moral assessments are influenced by outcomes that are, by definition, beyond the agent\'s control — a conclusion that sits uncomfortably with foundational principles of moral responsibility.',
    ttsLanguageCode: 'en-US',
    questionText: 'What does the concept of "moral luck" challenge?',
    options: [
      { label: 'The idea that all people are equally moral', value: 'equally moral' },
      { label: 'The intuition that moral judgments should depend only on factors within one\'s control', value: 'judgments based on controllable factors' },
      { label: 'The belief that luck does not exist', value: 'luck does not exist' },
      { label: 'The principle that laws should be fair', value: 'fair laws' }
    ],
    correctAnswer: 'judgments based on controllable factors', points: 2, orderIndex: 68, tags: ['philosophy', 'ethics'], timeSuggested: 90
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'The phenomenon of semantic satiation — whereby a word temporarily loses its meaning through rapid repetition — offers a window into the neurological underpinnings of language processing. When a word is repeated thirty or more times in quick succession, speakers report that it begins to feel like a meaningless sound. Neurolinguists hypothesize that this occurs because the neural pathways connecting phonological form to semantic content become temporarily fatigued, disrupting the automatic retrieval of meaning.',
    ttsLanguageCode: 'en-US',
    questionText: 'What causes semantic satiation according to neurolinguists?',
    options: [
      { label: 'Damage to the language centers of the brain', value: 'damage' },
      { label: 'Temporary fatigue of neural pathways connecting sound to meaning', value: 'neural pathway fatigue' },
      { label: 'Loss of hearing sensitivity', value: 'hearing loss' },
      { label: 'Emotional overload', value: 'emotional overload' }
    ],
    correctAnswer: 'neural pathway fatigue', points: 2, orderIndex: 69, tags: ['linguistics', 'neuroscience'], timeSuggested: 90
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Gödel\'s incompleteness theorems, published in nineteen thirty-one, demonstrated that any sufficiently powerful formal mathematical system contains true statements that cannot be proven within the system itself. This result shattered the ambitions of the formalist program championed by David Hilbert, which sought to establish mathematics on a complete and consistent axiomatic foundation. The implications extend beyond mathematics: the theorems suggest fundamental limits to what can be known through formal reasoning alone.',
    ttsLanguageCode: 'en-US',
    questionText: 'Whose program did Gödel\'s theorems undermine?',
    options: [
      { label: 'Bertrand Russell', value: 'Russell' },
      { label: 'David Hilbert', value: 'David Hilbert' },
      { label: 'Albert Einstein', value: 'Einstein' },
      { label: 'Alan Turing', value: 'Turing' }
    ],
    correctAnswer: 'David Hilbert', points: 2, orderIndex: 70, tags: ['mathematics', 'philosophy'], timeSuggested: 90
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'The juxtaposition of the protagonist\'s outward composure with her inner turmoil exemplifies the narrative technique of unreliable focalization.',
    ttsLanguageCode: 'en-US',
    questionText: 'Write exactly what you hear.',
    correctAnswer: 'The juxtaposition of the protagonist\'s outward composure with her inner turmoil exemplifies the narrative technique of unreliable focalization.', points: 2, orderIndex: 71, tags: ['dictation', 'literary criticism'], timeSuggested: 120
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'The philosophical zombie thought experiment — conceived by David Chalmers — posits a being physically identical to a conscious human but entirely devoid of subjective experience. If such a being is conceivable, Chalmers argues, then consciousness cannot be reduced to physical processes alone. This constitutes what he calls the "hard problem of consciousness" — explaining why and how physical processes give rise to subjective experience. Physicalists counter that conceivability does not entail metaphysical possibility.',
    ttsLanguageCode: 'en-US',
    questionText: 'What is the "hard problem of consciousness"?',
    options: [
      { label: 'Building artificial intelligence', value: 'building AI' },
      { label: 'Explaining why physical processes give rise to subjective experience', value: 'why physical processes create experience' },
      { label: 'Understanding how the brain stores memories', value: 'memory storage' },
      { label: 'Measuring intelligence accurately', value: 'measuring intelligence' }
    ],
    correctAnswer: 'why physical processes create experience', points: 2, orderIndex: 72, tags: ['philosophy', 'consciousness'], timeSuggested: 90
  },
]
