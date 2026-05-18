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
    options: [{ label: 'Next to the post office', value: 'next to the post office' }, { label: 'Next to the supermarket', value: 'next to the supermarket' }, { label: 'Next to the station', value: 'next to the station' }, { label: 'Next to the hospital', value: 'next to the hospital' }],
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
    ttsScript: 'The report is on the desk.',
    ttsLanguageCode: 'en-US',
    questionText: 'Write exactly what you hear.',
    correctAnswer: 'The report is on the desk.', points: 1, orderIndex: 7, tags: ['dictation'], timeSuggested: 30
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
    ttsScript: 'In recent years, many companies have moved away from the annual performance review in favour of continuous feedback: short conversations between manager and team member every couple of weeks. The point is not to talk more, but to talk sooner. A small adjustment in March prevents an issue from becoming irreparable by December. The shift, however, demands more from managers, who must develop active-listening skills that many have never really practised.',
    ttsLanguageCode: 'en-US',
    questionText: 'What is the main purpose of continuous feedback?',
    options: [
      { label: 'To address small issues before they grow serious', value: 'address before serious' },
      { label: 'To give employees more frequent praise', value: 'more frequent praise' },
      { label: 'To replace the role of Human Resources', value: 'replace HR' },
      { label: 'To monitor productivity in real time', value: 'monitor productivity' }
    ],
    correctAnswer: 'address before serious', points: 3, orderIndex: 31, tags: ['workplace', 'management'], timeSuggested: 75
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
    ttsScript: 'Research on talent retention shows that the first ninety days of a new hire\'s experience are decisive. During that period, employees form beliefs that will shape their engagement for years to come: whether to stay, how to relate to colleagues, how much emotional energy to invest in projects. Yet many organisations confine onboarding to the first week — a laptop, a handbook, an HR meeting — and then leave the new person to figure things out alone.',
    ttsLanguageCode: 'en-US',
    questionText: 'Why are the first ninety days so critical?',
    options: [
      { label: 'Beliefs are formed that influence long-term engagement', value: 'beliefs shape engagement' },
      { label: 'Because most resignations happen in the first week', value: 'first-week resignations' },
      { label: 'Because performance reviews begin at ninety days', value: 'reviews at ninety days' },
      { label: 'Because work permits expire during that window', value: 'permits expire' }
    ],
    correctAnswer: 'beliefs shape engagement', points: 3, orderIndex: 33, tags: ['workplace', 'HR'], timeSuggested: 75
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
    ttsScript: 'The paradox of modern collaboration is that the more we collaborate, the less actual work gets done. Time-use studies show that knowledge workers now spend an average of twenty-three hours a week in meetings — a figure that has doubled over the last fifteen years. Meetings have become the default way to demonstrate commitment, share responsibility, and avoid making lonely decisions. But every hour in a meeting is an hour subtracted from focused work, and the cost of context switching after each one is now well documented.',
    ttsLanguageCode: 'en-US',
    questionText: 'Why have meetings multiplied so dramatically?',
    options: [
      { label: 'They allow people to share responsibility and signal commitment', value: 'share responsibility and commitment' },
      { label: 'They have completely replaced email', value: 'replaced email' },
      { label: 'Companies measure work in meeting hours', value: 'measure in meeting hours' },
      { label: 'Employees prefer working in groups', value: 'group preference' }
    ],
    correctAnswer: 'share responsibility and commitment', points: 3, orderIndex: 36, tags: ['workplace', 'management'], timeSuggested: 90
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'When a key employee resigns, the instinctive reaction is the counter-offer. The data, however, show that this strategy works in the short term — most people accept — but two thirds leave anyway within a year. The reason is structural: the decision to leave is rarely about money. It is about the absence of growth prospects, conflict with a manager, the sense of not being valued. The counter-offer treats the symptom, not the cause. Companies that genuinely retain talent invest in conversations long before a resignation letter ever appears.',
    ttsLanguageCode: 'en-US',
    questionText: 'Why do counter-offers often fail?',
    options: [
      { label: 'They treat the symptom but not the underlying reason for leaving', value: 'symptom not cause' },
      { label: 'The salaries offered are too low', value: 'low salaries' },
      { label: 'The employee asks for more after a few months', value: 'asks for more' },
      { label: 'The law does not allow retroactive offers', value: 'law forbids' }
    ],
    correctAnswer: 'symptom not cause', points: 3, orderIndex: 37, tags: ['workplace', 'retention'], timeSuggested: 90
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'In a large internal study on what makes teams effective, Google identified one dominant factor: psychological safety. That is, the sense that one can voice opinions, admit mistakes, or ask questions without fearing professional consequences. Teams with high psychological safety produce more innovation, learn faster from errors, and retain people better. But you cannot build it with corporate policies: it is built by what the manager says when someone admits a mistake, and by what they do not say in the moments of silence.',
    ttsLanguageCode: 'en-US',
    questionText: 'How is psychological safety built, according to the passage?',
    options: [
      { label: 'Through the manager\'s day-to-day behaviour, not through formal policies', value: 'daily manager behaviour' },
      { label: 'Through corporate ethics regulations', value: 'ethics regulations' },
      { label: 'By training new managers in communication techniques', value: 'training new managers' },
      { label: 'By punishing mistakes severely to prevent recurrence', value: 'punish mistakes' }
    ],
    correctAnswer: 'daily manager behaviour', points: 3, orderIndex: 38, tags: ['workplace', 'team'], timeSuggested: 90
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'The true indicator of a manager\'s success is not the number of decisions they make every day, but the quality of decisions their team members make autonomously.',
    ttsLanguageCode: 'en-US',
    questionText: 'Write exactly what you hear.',
    correctAnswer: 'The true indicator of a manager\'s success is not the number of decisions they make every day, but the quality of decisions their team members make autonomously.', points: 3, orderIndex: 39, tags: ['dictation', 'workplace'], timeSuggested: 120
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Research on cognitive work converges on a counter-intuitive truth: it is not the length of work that limits productivity, but its fragmentation. Every time we switch from one task to another — a notification, a chat message, an unexpected meeting — the brain takes between fifteen and twenty-five minutes to fully recover the previous level of concentration. In a typical day with thirty interruptions, this means that much of the time worked produces no real value. Some companies have started introducing protected blocks of two or three hours with no meetings at all.',
    ttsLanguageCode: 'en-US',
    questionText: 'Why are protected blocks of time important?',
    options: [
      { label: 'The brain takes a long time to recover focus after each interruption', value: 'long recovery from interruption' },
      { label: 'Because employees are asking for more breaks', value: 'more breaks' },
      { label: 'Because long meetings are tiring', value: 'tiring meetings' },
      { label: 'Because notifications are now banned by law', value: 'notifications banned' }
    ],
    correctAnswer: 'long recovery from interruption', points: 3, orderIndex: 40, tags: ['workplace', 'productivity'], timeSuggested: 90
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Giving feedback in an international team is one of the most underestimated tasks in modern management. What some cultures consider direct and helpful — pointing out a mistake during a meeting, for instance — other cultures read as a public attack. The opposite is also true: feedback that one culture finds perfectly clear may be so softened, from another culture\'s perspective, that it is not perceived as criticism at all. The most effective managers do not adopt a single style: they adapt the delivery to the recipient and verify that the message has landed as intended.',
    ttsLanguageCode: 'en-US',
    questionText: 'What does an effective manager do in an international team?',
    options: [
      { label: 'Adapt the feedback style and check that it has been understood', value: 'adapt and verify' },
      { label: 'Always use the most direct style possible', value: 'always direct' },
      { label: 'Delegate feedback to local HR', value: 'delegate to HR' },
      { label: 'Avoid difficult conversations', value: 'avoid conversations' }
    ],
    correctAnswer: 'adapt and verify', points: 3, orderIndex: 41, tags: ['workplace', 'cross-cultural communication'], timeSuggested: 90
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
    ttsScript: 'I have a black laptop. My laptop is new. I put my files on my laptop. I take my laptop to work every day.',
    ttsLanguageCode: 'en-US',
    questionText: 'What color is the laptop?',
    options: [{ label: 'Blue', value: 'blue' }, { label: 'Black', value: 'black' }, { label: 'Silver', value: 'silver' }, { label: 'White', value: 'white' }],
    correctAnswer: 'black', points: 1, orderIndex: 43, tags: ['colors', 'possessions'], timeSuggested: 30
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'I have a black laptop. My laptop is new. I put my files on my laptop. I take my laptop to work every day.',
    ttsLanguageCode: 'en-US',
    questionText: 'Where does the person take the laptop?',
    options: [{ label: 'To work', value: 'to work' }, { label: 'To the gym', value: 'to the gym' }, { label: 'To the cafe', value: 'to the cafe' }, { label: 'To the shop', value: 'to the shop' }],
    correctAnswer: 'to work', points: 1, orderIndex: 44, tags: ['workplace', 'daily routine'], timeSuggested: 30
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'My colleague likes coffee. She drinks a cup every morning. She also likes green tea and water. She does not like juice.',
    ttsLanguageCode: 'en-US',
    questionText: 'Which drink does the colleague NOT like?',
    options: [{ label: 'Coffee', value: 'coffee' }, { label: 'Green tea', value: 'green tea' }, { label: 'Water', value: 'water' }, { label: 'Juice', value: 'juice' }],
    correctAnswer: 'juice', points: 1, orderIndex: 45, tags: ['drinks', 'preferences'], timeSuggested: 30
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'She has two meetings and one presentation.',
    ttsLanguageCode: 'en-US',
    questionText: 'Write exactly what you hear.',
    correctAnswer: 'She has two meetings and one presentation.', points: 1, orderIndex: 46, tags: ['dictation', 'workplace'], timeSuggested: 30
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
    ttsScript: 'Last weekend, I went to a colleague\'s farewell dinner. There were about twenty people from the office. We had a nice meal and gave speeches. The dinner finished at midnight. I had a great time.',
    ttsLanguageCode: 'en-US',
    questionText: 'What time did the dinner finish?',
    options: [{ label: '10 PM', value: '10 PM' }, { label: '11 PM', value: '11 PM' }, { label: 'Midnight', value: 'midnight' }, { label: '1 AM', value: '1 AM' }],
    correctAnswer: 'midnight', points: 1, orderIndex: 48, tags: ['social', 'time'], timeSuggested: 40
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Last weekend, I went to a colleague\'s farewell dinner. There were about twenty people from the office. We had a nice meal and gave speeches. The dinner finished at midnight. I had a great time.',
    ttsLanguageCode: 'en-US',
    questionText: 'How many people were at the dinner?',
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
    ttsScript: 'They are going to attend the conference next weekend.',
    ttsLanguageCode: 'en-US',
    questionText: 'Write exactly what you hear.',
    correctAnswer: 'They are going to attend the conference next weekend.', points: 1, orderIndex: 51, tags: ['dictation', 'business travel'], timeSuggested: 40
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
    ttsScript: 'A new study from the University of Cambridge suggests that regular exercise during the workday can improve employee productivity. Workers who exercised for at least thirty minutes during lunch breaks reported higher concentration and better problem-solving abilities compared to those who did not. Researchers believe that physical activity enhances focus and mental clarity.',
    ttsLanguageCode: 'en-US',
    questionText: 'What does exercise during work enhance according to researchers?',
    options: [
      { label: 'Physical fitness', value: 'physical fitness' },
      { label: 'Focus and mental clarity', value: 'focus and mental clarity' },
      { label: 'Social skills', value: 'social skills' },
      { label: 'Artistic creativity', value: 'artistic creativity' }
    ],
    correctAnswer: 'focus and mental clarity', points: 1, orderIndex: 53, tags: ['workplace', 'health'], timeSuggested: 45
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'A new study from the University of Cambridge suggests that regular exercise during the workday can improve employee productivity. Workers who exercised for at least thirty minutes during lunch breaks reported higher concentration and better problem-solving abilities.',
    ttsLanguageCode: 'en-US',
    questionText: 'How long did workers need to exercise to show improvement?',
    options: [
      { label: 'At least fifteen minutes', value: 'fifteen minutes' },
      { label: 'At least thirty minutes', value: 'thirty minutes' },
      { label: 'At least forty-five minutes', value: 'forty-five minutes' },
      { label: 'At least one hour', value: 'one hour' }
    ],
    correctAnswer: 'thirty minutes', points: 1, orderIndex: 54, tags: ['workplace', 'research'], timeSuggested: 45
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
    ttsScript: 'Asynchronous work — communicating in writing without expecting an immediate reply — has become the norm in many distributed teams. The advantages are obvious: people in different time zones collaborate without losing sleep, and writing forces clearer thinking than improvised meetings. But there is a cost: a message dashed off in a hurry can lose its tone and create unintended tension. Teams that work well together invest time in explicit communication norms: when to use chat, when email, when video.',
    ttsLanguageCode: 'en-US',
    questionText: 'What is a drawback of asynchronous work?',
    options: [
      { label: 'Tone can be misread and cause tension', value: 'tone misread' },
      { label: 'Everyone has to be online at the same time', value: 'all online' },
      { label: 'Documents cannot be shared', value: 'no document sharing' },
      { label: 'People end up working fewer hours', value: 'fewer hours' }
    ],
    correctAnswer: 'tone misread', points: 2, orderIndex: 63, tags: ['workplace', 'communication'], timeSuggested: 75
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'The right to disconnect, already law in several European countries, establishes that an employee is not obliged to read or reply to messages outside working hours. The principle sounds simple, but applying it is complex: in international teams, evening for one person is morning for another, and many managers do not realise they are setting an implicit expectation when they message at eleven at night. Some companies have introduced automatic delays: messages sent in the evening are delivered the following morning.',
    ttsLanguageCode: 'en-US',
    questionText: 'Why is the right to disconnect hard to apply in international teams?',
    options: [
      { label: 'Evening for one person is morning for another', value: 'evening one morning another' },
      { label: 'The law differs from country to country', value: 'different laws' },
      { label: 'Managers refuse to comply with it', value: 'managers refuse' },
      { label: 'Technology does not allow it', value: 'technology limits' }
    ],
    correctAnswer: 'evening one morning another', points: 2, orderIndex: 64, tags: ['workplace', 'work-life balance'], timeSuggested: 75
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'The role of the modern manager has changed profoundly. The era of the boss who issued orders and checked execution is over. Today\'s most effective managers act as coaches: they ask more questions than they give answers, they help their team members find solutions themselves, and they grow talent through delegation rather than control. It is a counter-intuitive shift for people raised in hierarchical cultures, and many managers feel less productive at first — until they see their team grow.',
    ttsLanguageCode: 'en-US',
    questionText: 'What characterises the modern manager as coach?',
    options: [
      { label: 'They ask more questions than they give answers', value: 'more questions than answers' },
      { label: 'They check every step of the work', value: 'check every step' },
      { label: 'They always work side by side with the team', value: 'side by side' },
      { label: 'They decide without consulting anyone', value: 'decide alone' }
    ],
    correctAnswer: 'more questions than answers', points: 2, orderIndex: 65, tags: ['workplace', 'management'], timeSuggested: 75
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
    ttsScript: 'The expression "quiet quitting," which went viral in twenty twenty-two, does not describe actual resignations but a specific behaviour: doing exactly what the contract requires, no more and no less. Refusing to read emails after hours, declining to volunteer, withholding emotional investment from extra projects. The phenomenon is read in two opposite ways: either as a healthy reaction to widespread burnout, or as a symptom of a deeper engagement crisis. The data are uncomfortable: in many companies, the share of employees who describe themselves as disengaged exceeds sixty percent.',
    ttsLanguageCode: 'en-US',
    questionText: 'How is the quiet quitting phenomenon interpreted?',
    options: [
      { label: 'Either as a healthy response to limits, or as a sign of widespread disengagement', value: 'healthy or disengagement' },
      { label: 'As genuine mass resignations', value: 'mass resignations' },
      { label: 'As a typically generational phenomenon', value: 'generational' },
      { label: 'As a strategy to negotiate a pay rise', value: 'pay-rise strategy' }
    ],
    correctAnswer: 'healthy or disengagement', points: 2, orderIndex: 68, tags: ['workplace', 'engagement'], timeSuggested: 90
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Hybrid work has become the most divisive topic in companies since twenty twenty. The productivity data are contradictory: some studies show an increase, others a decline, depending on the type of work and how the transition has been managed. But the truly interesting question is not where people work, but how they are led. Hybrid mode exposes weaknesses that the physical office used to hide: managers who supervised by physical presence, processes that depended on casual corridor conversations, decisions that excluded anyone not in the room.',
    ttsLanguageCode: 'en-US',
    questionText: 'Why is hybrid work a test for leadership?',
    options: [
      { label: 'It exposes practices that only worked thanks to physical presence', value: 'exposes presence-based practices' },
      { label: 'It forces managers to learn new technologies', value: 'learn technologies' },
      { label: 'It doubles the effective working hours', value: 'doubles hours' },
      { label: 'It requires more meetings than in-office work', value: 'more meetings' }
    ],
    correctAnswer: 'exposes presence-based practices', points: 2, orderIndex: 69, tags: ['workplace', 'leadership'], timeSuggested: 90
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'In organisations of a certain size, the most underestimated problem is not a lack of talent or strategy: it is the alignment between functions. Sales promises features that the product team never planned, product builds things that marketing cannot work out how to position, finance approves budgets that operations cannot deliver. Each function behaves rationally on its own, but the sum of individual rationalities produces an irrational organisation. The solution is not more meetings or more reports: it is short, frequent conversations between heads of function, with the freedom to challenge commitments without losing face.',
    ttsLanguageCode: 'en-US',
    questionText: 'What is the structural cause of cross-functional misalignment?',
    options: [
      { label: 'Each function is rational on its own but the sum produces incoherence', value: 'rational alone incoherent together' },
      { label: 'People do not read the internal reports', value: 'no reading reports' },
      { label: 'The company does not have enough managers', value: 'too few managers' },
      { label: 'The technology does not share data', value: 'technology silos' }
    ],
    correctAnswer: 'rational alone incoherent together', points: 2, orderIndex: 70, tags: ['workplace', 'organisation'], timeSuggested: 90
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'The long-term sustainability of an organisation depends on its ability to balance the pressure for short-term results with investments that will only produce value in the future.',
    ttsLanguageCode: 'en-US',
    questionText: 'Write exactly what you hear.',
    correctAnswer: 'The long-term sustainability of an organisation depends on its ability to balance the pressure for short-term results with investments that will only produce value in the future.', points: 2, orderIndex: 71, tags: ['dictation', 'workplace'], timeSuggested: 120
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'The annual performance review — that one-to-five scale on which managers ranked their team members — entered crisis about a decade ago, and many companies have abandoned it. The reasons are well documented: ratings demotivate those who receive low scores, they are influenced by recency bias (managers remember the last three months, not the full year), and they create unhealthy competition between colleagues. What replaces them is more demanding: frequent development conversations, separated from pay decisions, in which the goal is growth rather than classification. It is harder work for the manager, but it produces more lasting results.',
    ttsLanguageCode: 'en-US',
    questionText: 'Why have annual performance ratings been abandoned?',
    options: [
      { label: 'They distort behaviour and reflect recent bias more than the full year', value: 'distort and recent bias' },
      { label: 'They are too expensive to implement', value: 'too expensive' },
      { label: 'Trade unions no longer allow them', value: 'unions forbid' },
      { label: 'They are illegal in most countries', value: 'illegal' }
    ],
    correctAnswer: 'distort and recent bias', points: 2, orderIndex: 72, tags: ['workplace', 'performance'], timeSuggested: 90
  },

  // ============================================================
  // VARIED SPOKEN CONTEXTS — 12 questions (orderIndex 73-84)
  // ============================================================

  // A1 — Varied Spoken Contexts
  {
    language: 'English', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    questionText: '[Voicemail] You hear a voicemail from a colleague. What time is the meeting?',
    ttsScript: 'Hi, it\'s Sarah from the office. I\'m calling to confirm our meeting tomorrow at nine thirty. Please bring the report. See you then!',
    ttsLanguageCode: 'en-US',
    options: [{ label: '9:00', value: '9:00' }, { label: '9:30', value: '9:30' }, { label: '10:00', value: '10:00' }, { label: '10:30', value: '10:30' }],
    correctAnswer: '9:30', points: 1, orderIndex: 73, tags: ['voicemail', 'workplace', 'register-varied'], timeSuggested: 30
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    questionText: '[Airport Announcement] You hear an announcement at the airport. Which gate should passengers go to?',
    ttsScript: 'Attention passengers on flight BA two four seven to Madrid. Your flight is now boarding at gate fourteen. Please proceed to gate fourteen immediately.',
    ttsLanguageCode: 'en-US',
    options: [{ label: 'Gate 4', value: 'Gate 4' }, { label: 'Gate 14', value: 'Gate 14' }, { label: 'Gate 24', value: 'Gate 24' }, { label: 'Gate 7', value: 'Gate 7' }],
    correctAnswer: 'Gate 14', points: 1, orderIndex: 74, tags: ['airport', 'announcement', 'register-varied'], timeSuggested: 30
  },

  // A2 — Varied Spoken Contexts
  {
    language: 'English', cefrLevel: 'A2', questionType: 'LISTENING', skill: 'LISTENING',
    questionText: '[Phone Reservation] You hear someone making a restaurant reservation. For how many people?',
    ttsScript: 'Good evening, I\'d like to book a table for this Saturday, please. It would be for four people, around eight o\'clock. Do you have anything available on the terrace?',
    ttsLanguageCode: 'en-US',
    options: [{ label: '2 people', value: '2 people' }, { label: '4 people', value: '4 people' }, { label: '6 people', value: '6 people' }, { label: '8 people', value: '8 people' }],
    correctAnswer: '4 people', points: 1, orderIndex: 75, tags: ['restaurant', 'reservation', 'register-varied'], timeSuggested: 40
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'LISTENING', skill: 'LISTENING',
    questionText: '[Client Message] You hear a message left for a client. What does the caller want to reschedule?',
    ttsScript: 'Hello, this is David from Greenfield Associates. I\'m calling about our appointment on Wednesday. Unfortunately, I need to reschedule the delivery. Could we move it to Friday afternoon instead? Please call me back at your earliest convenience.',
    ttsLanguageCode: 'en-US',
    options: [{ label: 'A meeting', value: 'A meeting' }, { label: 'A delivery', value: 'A delivery' }, { label: 'A payment', value: 'A payment' }, { label: 'A presentation', value: 'A presentation' }],
    correctAnswer: 'A delivery', points: 1, orderIndex: 76, tags: ['client', 'message', 'register-varied'], timeSuggested: 40
  },

  // B1 — Varied Spoken Contexts
  {
    language: 'English', cefrLevel: 'B1', questionType: 'LISTENING', skill: 'LISTENING',
    questionText: '[Radio Ad] You hear a radio advertisement. What is being promoted?',
    ttsScript: 'Tired of struggling with grammar? Want to speak with confidence in meetings? Join LinguaPro, the online language school trusted by over fifty thousand professionals worldwide. Sign up this week and get your first month free! Visit linguapro dot com.',
    ttsLanguageCode: 'en-US',
    options: [{ label: 'A translation service', value: 'A translation service' }, { label: 'An online language school', value: 'An online language school' }, { label: 'A grammar textbook', value: 'A grammar textbook' }, { label: 'A business conference', value: 'A business conference' }],
    correctAnswer: 'An online language school', points: 1, orderIndex: 77, tags: ['radio', 'advertisement', 'register-varied'], timeSuggested: 45
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'LISTENING', skill: 'LISTENING',
    questionText: '[Office Meeting] You hear an excerpt from a team meeting. What is the main concern discussed?',
    ttsScript: 'OK team, before we wrap up, I want to address the deadline for the Henderson project. We\'re currently two weeks behind schedule, and the client is expecting the first deliverable by March fifteenth. We need to reallocate resources. Any suggestions?',
    ttsLanguageCode: 'en-US',
    options: [{ label: 'Budget overruns', value: 'Budget overruns' }, { label: 'Being behind schedule', value: 'Being behind schedule' }, { label: 'Staff turnover', value: 'Staff turnover' }, { label: 'Client complaints', value: 'Client complaints' }],
    correctAnswer: 'Being behind schedule', points: 1, orderIndex: 78, tags: ['meeting', 'office', 'register-varied'], timeSuggested: 45
  },

  // B2 — Varied Spoken Contexts
  {
    language: 'English', cefrLevel: 'B2', questionType: 'LISTENING', skill: 'LISTENING',
    questionText: '[Podcast] You hear an excerpt from a podcast about career change. What does the speaker say is the biggest obstacle?',
    ttsScript: 'When I coach people through career transitions, the number one thing that holds them back isn\'t a lack of skills or qualifications. It\'s fear. Fear of the unknown, fear of financial instability, and honestly, fear of what other people will think. Once you address that, everything else falls into place.',
    ttsLanguageCode: 'en-US',
    options: [{ label: 'Lack of skills', value: 'Lack of skills' }, { label: 'Financial problems', value: 'Financial problems' }, { label: 'Fear', value: 'Fear' }, { label: 'Age discrimination', value: 'Age discrimination' }],
    correctAnswer: 'Fear', points: 2, orderIndex: 79, tags: ['podcast', 'career', 'register-varied'], timeSuggested: 60
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'LISTENING', skill: 'LISTENING',
    questionText: '[News Report] You hear a news report on the economy. What has the central bank decided?',
    ttsScript: 'In a widely anticipated move, the European Central Bank has announced a quarter-point interest rate cut, bringing the benchmark rate to three point five percent. Analysts say this signals growing concern over sluggish growth in the eurozone, particularly in manufacturing sectors.',
    ttsLanguageCode: 'en-US',
    options: [{ label: 'To raise interest rates', value: 'To raise interest rates' }, { label: 'To cut interest rates', value: 'To cut interest rates' }, { label: 'To freeze interest rates', value: 'To freeze interest rates' }, { label: 'To eliminate interest rates', value: 'To eliminate interest rates' }],
    correctAnswer: 'To cut interest rates', points: 2, orderIndex: 80, tags: ['news', 'economy', 'register-varied'], timeSuggested: 60
  },

  // C1 — Varied Spoken Contexts
  {
    language: 'English', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    questionText: '[TED Talk] You hear an excerpt from a talk about innovation. According to the speaker, what is the real driver of innovation?',
    ttsScript: 'We tend to romanticize the lone genius in a garage, but the data tells a very different story. Innovation is fundamentally a social phenomenon. It thrives at the intersection of diverse perspectives, where ideas collide and recombine. The real driver isn\'t individual brilliance; it\'s the density and quality of human connections within an ecosystem.',
    ttsLanguageCode: 'en-US',
    options: [{ label: 'Individual brilliance', value: 'Individual brilliance' }, { label: 'Government funding', value: 'Government funding' }, { label: 'Human connections within an ecosystem', value: 'Human connections within an ecosystem' }, { label: 'Competition between companies', value: 'Competition between companies' }],
    correctAnswer: 'Human connections within an ecosystem', points: 2, orderIndex: 81, tags: ['TED talk', 'innovation', 'register-varied'], timeSuggested: 75
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    questionText: '[Academic Lecture] You hear part of a university lecture. What concept is the professor explaining?',
    ttsScript: 'So what we see in the literature is a shift from the traditional model of linear causation to what scholars now call circular causality. In other words, the effect feeds back into the cause, creating a self-reinforcing loop. This is particularly evident in climate systems, where warming oceans release more carbon dioxide, which in turn accelerates warming.',
    ttsLanguageCode: 'en-US',
    options: [{ label: 'Linear causation', value: 'Linear causation' }, { label: 'Circular causality', value: 'Circular causality' }, { label: 'Random variation', value: 'Random variation' }, { label: 'Static equilibrium', value: 'Static equilibrium' }],
    correctAnswer: 'Circular causality', points: 2, orderIndex: 82, tags: ['lecture', 'academic', 'register-varied'], timeSuggested: 75
  },

  // C2 — Varied Spoken Contexts
  {
    language: 'English', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    questionText: '[Philosophical Debate] You hear part of a debate. What position does the speaker defend?',
    ttsScript: 'I would argue that moral realism is not merely tenable but necessary. If we concede that ethical truths are purely constructed, then we have no grounds upon which to condemn atrocities. The very act of moral outrage presupposes that there exist objective standards against which actions can be measured, irrespective of cultural consensus.',
    ttsLanguageCode: 'en-US',
    options: [{ label: 'Moral relativism', value: 'Moral relativism' }, { label: 'Moral realism', value: 'Moral realism' }, { label: 'Nihilism', value: 'Nihilism' }, { label: 'Utilitarianism', value: 'Utilitarianism' }],
    correctAnswer: 'Moral realism', points: 2, orderIndex: 83, tags: ['debate', 'philosophy', 'register-varied'], timeSuggested: 90
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    questionText: '[Satirical Commentary] You hear a satirical commentary. What is the speaker actually criticizing?',
    ttsScript: 'And in today\'s breaking news, a multinational corporation has generously pledged to become carbon neutral by twenty seventy-five, just in time for the heat death of the universe. The CEO reassured stakeholders that while short-term profits remain the absolute priority, the company is deeply committed to sustainability, provided it doesn\'t cost anything.',
    ttsLanguageCode: 'en-US',
    options: [{ label: 'Environmental regulations', value: 'Environmental regulations' }, { label: 'Corporate greenwashing', value: 'Corporate greenwashing' }, { label: 'Government inaction', value: 'Government inaction' }, { label: 'Consumer behavior', value: 'Consumer behavior' }],
    correctAnswer: 'Corporate greenwashing', points: 2, orderIndex: 84, tags: ['satire', 'commentary', 'register-varied'], timeSuggested: 90
  },

  // ============================================================
  // EVERYDAY DIALOGUES — added per user feedback (more conversation,
  // less abstract monologue). Two-speaker scripts trigger the
  // TtsService dialogue parser and rotate male/female voices.
  // ============================================================

  // ---- A1 dialogues ----
  {
    language: 'English', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Hi, can I have a coffee, please?
SPEAKER_B: Of course. Small or large?
SPEAKER_A: Small, please. How much is it?
SPEAKER_B: One euro eighty.`,
    ttsLanguageCode: 'en-US',
    questionText: 'How much is the coffee?',
    options: [{ label: '1.50 euros', value: '1.50' }, { label: '1.80 euros', value: '1.80' }, { label: '2.50 euros', value: '2.50' }, { label: '2.80 euros', value: '2.80' }],
    correctAnswer: '1.80', points: 1, orderIndex: 85, tags: ['dialogue', 'cafe', 'everyday'], timeSuggested: 40
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Hello. What time do you open tomorrow?
SPEAKER_B: We open at nine in the morning.
SPEAKER_A: And when do you close?
SPEAKER_B: At seven in the evening.`,
    ttsLanguageCode: 'en-US',
    questionText: 'What time does the shop open?',
    options: [{ label: '7am', value: '7am' }, { label: '8am', value: '8am' }, { label: '9am', value: '9am' }, { label: '10am', value: '10am' }],
    correctAnswer: '9am', points: 1, orderIndex: 86, tags: ['dialogue', 'shopping', 'everyday'], timeSuggested: 40
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Where can we meet on Saturday?
SPEAKER_B: Let's meet at the cafe near the park.
SPEAKER_A: At what time?
SPEAKER_B: At three o'clock.`,
    ttsLanguageCode: 'en-US',
    questionText: 'Where do they want to meet?',
    options: [{ label: 'At the park', value: 'park' }, { label: 'At the cafe', value: 'cafe' }, { label: 'At the cinema', value: 'cinema' }, { label: 'At the library', value: 'library' }],
    correctAnswer: 'cafe', points: 1, orderIndex: 87, tags: ['dialogue', 'plans', 'everyday'], timeSuggested: 40
  },
  {
    language: 'English', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: One ticket to the centre, please.
SPEAKER_B: Single or return?
SPEAKER_A: Just single.
SPEAKER_B: That's two euros.`,
    ttsLanguageCode: 'en-US',
    questionText: 'How much is the ticket?',
    options: [{ label: '1 euro', value: '1' }, { label: '2 euros', value: '2' }, { label: '3 euros', value: '3' }, { label: '4 euros', value: '4' }],
    correctAnswer: '2', points: 1, orderIndex: 88, tags: ['dialogue', 'transport', 'everyday'], timeSuggested: 40
  },

  // ---- A2 dialogues ----
  {
    language: 'English', cefrLevel: 'A2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Are you free this weekend? There's a new film at the cinema.
SPEAKER_B: I'm busy on Saturday, but Sunday is fine.
SPEAKER_A: Great. Let's go on Sunday afternoon.
SPEAKER_B: Perfect, see you then.`,
    ttsLanguageCode: 'en-US',
    questionText: 'When are they going to the cinema?',
    options: [{ label: 'Saturday morning', value: 'sat-am' }, { label: 'Saturday afternoon', value: 'sat-pm' }, { label: 'Sunday morning', value: 'sun-am' }, { label: 'Sunday afternoon', value: 'sun-pm' }],
    correctAnswer: 'sun-pm', points: 1, orderIndex: 89, tags: ['dialogue', 'plans', 'everyday'], timeSuggested: 50
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Hello, I'd like to see the doctor. I have a stomach ache.
SPEAKER_B: We have an appointment at four o'clock today.
SPEAKER_A: Is there anything earlier?
SPEAKER_B: I'm afraid not. Four is the only one.`,
    ttsLanguageCode: 'en-US',
    questionText: 'When is the appointment?',
    options: [{ label: '2pm', value: '2pm' }, { label: '3pm', value: '3pm' }, { label: '4pm', value: '4pm' }, { label: '5pm', value: '5pm' }],
    correctAnswer: '4pm', points: 1, orderIndex: 90, tags: ['dialogue', 'health', 'everyday'], timeSuggested: 50
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: How many rooms does the flat have?
SPEAKER_B: It has two bedrooms, a kitchen and a bathroom.
SPEAKER_A: And is there a balcony?
SPEAKER_B: Yes, there's a small one.`,
    ttsLanguageCode: 'en-US',
    questionText: 'How many bedrooms does the flat have?',
    options: [{ label: 'One', value: '1' }, { label: 'Two', value: '2' }, { label: 'Three', value: '3' }, { label: 'Four', value: '4' }],
    correctAnswer: '2', points: 1, orderIndex: 91, tags: ['dialogue', 'housing', 'everyday'], timeSuggested: 50
  },
  {
    language: 'English', cefrLevel: 'A2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Excuse me, I think I left my umbrella here yesterday.
SPEAKER_B: What colour is it?
SPEAKER_A: It's blue, with a wooden handle.
SPEAKER_B: Yes, we have it. I'll bring it now.`,
    ttsLanguageCode: 'en-US',
    questionText: 'What colour is the umbrella?',
    options: [{ label: 'Black', value: 'black' }, { label: 'Red', value: 'red' }, { label: 'Blue', value: 'blue' }, { label: 'Green', value: 'green' }],
    correctAnswer: 'blue', points: 1, orderIndex: 92, tags: ['dialogue', 'lost-found', 'everyday'], timeSuggested: 50
  },

  // ---- B1 dialogues ----
  {
    language: 'English', cefrLevel: 'B1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Hi, it's Marco. I'm going to be about thirty minutes late this morning.
SPEAKER_B: Oh, is everything okay?
SPEAKER_A: Yes, the trains are delayed because of a strike. I'm sorry.
SPEAKER_B: No problem, just let the team know when you arrive.`,
    ttsLanguageCode: 'en-US',
    questionText: 'Why is Marco going to be late?',
    options: [{ label: "He's sick", value: 'sick' }, { label: 'Train strike', value: 'strike' }, { label: 'Traffic jam', value: 'traffic' }, { label: 'He overslept', value: 'overslept' }],
    correctAnswer: 'strike', points: 1, orderIndex: 93, tags: ['dialogue', 'work', 'everyday'], timeSuggested: 60
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Excuse me, my pasta is cold.
SPEAKER_B: Oh, I'm really sorry. I'll take it back to the kitchen straight away.
SPEAKER_A: Could you also bring some water? I've been waiting for ten minutes.
SPEAKER_B: Of course. I apologise.`,
    ttsLanguageCode: 'en-US',
    questionText: 'What two things does the customer complain about?',
    options: [{ label: 'Cold pasta and slow water', value: 'pasta-water' }, { label: 'Wrong dish and noisy table', value: 'wrong-noise' }, { label: 'Cold pasta and wrong bill', value: 'pasta-bill' }, { label: 'Slow service and bad music', value: 'slow-music' }],
    correctAnswer: 'pasta-water', points: 1, orderIndex: 94, tags: ['dialogue', 'restaurant', 'everyday'], timeSuggested: 60
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: How much is the monthly membership?
SPEAKER_B: It's forty euros per month, or three hundred and sixty for the whole year.
SPEAKER_A: So the annual one saves about eighty euros.
SPEAKER_B: Exactly. And it includes two free personal training sessions.`,
    ttsLanguageCode: 'en-US',
    questionText: 'What is included in the annual membership?',
    options: [{ label: 'Free coffee', value: 'coffee' }, { label: 'Two PT sessions', value: 'pt' }, { label: 'A free t-shirt', value: 'tshirt' }, { label: 'Nutrition plan', value: 'nutrition' }],
    correctAnswer: 'pt', points: 1, orderIndex: 95, tags: ['dialogue', 'gym', 'everyday'], timeSuggested: 60
  },
  {
    language: 'English', cefrLevel: 'B1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Should we go to Florence by car or by train?
SPEAKER_B: The train is faster, but the car is cheaper if we share fuel.
SPEAKER_A: I'd prefer the train. We can read or sleep.
SPEAKER_B: Okay, let's book the train then.`,
    ttsLanguageCode: 'en-US',
    questionText: 'Why do they choose the train?',
    options: [{ label: "It's cheaper", value: 'cheap' }, { label: "It's faster and more relaxing", value: 'fast-relax' }, { label: "It's safer", value: 'safe' }, { label: 'It has Wi-Fi', value: 'wifi' }],
    correctAnswer: 'fast-relax', points: 1, orderIndex: 96, tags: ['dialogue', 'travel', 'everyday'], timeSuggested: 60
  },

  // ---- B2 dialogues ----
  {
    language: 'English', cefrLevel: 'B2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: I don't think we'll finish the report by Friday.
SPEAKER_B: How much more time do you need?
SPEAKER_A: Realistically, another week. There are too many open questions with the legal team.
SPEAKER_B: All right, I'll talk to the client and push it to next Friday.`,
    ttsLanguageCode: 'en-US',
    questionText: 'Why does the project need more time?',
    options: [{ label: 'The client is demanding', value: 'client' }, { label: 'Open legal questions', value: 'legal' }, { label: 'Staff are sick', value: 'sick' }, { label: 'Budget cut', value: 'budget' }],
    correctAnswer: 'legal', points: 2, orderIndex: 97, tags: ['dialogue', 'work', 'everyday'], timeSuggested: 70
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Sorry to bother you, but the music last night was really loud until two in the morning.
SPEAKER_B: I'm so sorry, my brother had a birthday party. It won't happen again on a weekday.
SPEAKER_A: I understand it was a special occasion. Just a heads-up next time would be great.
SPEAKER_B: Absolutely, I'll let you know in advance.`,
    ttsLanguageCode: 'en-US',
    questionText: 'What does the neighbour ask for in the future?',
    options: [{ label: 'No more parties', value: 'no-parties' }, { label: 'Advance warning', value: 'warning' }, { label: 'Quieter music', value: 'quieter' }, { label: 'A different day', value: 'day' }],
    correctAnswer: 'warning', points: 2, orderIndex: 98, tags: ['dialogue', 'neighbours', 'everyday'], timeSuggested: 70
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: So, what would you say is your biggest strength?
SPEAKER_B: I think it's the way I handle difficult conversations. I stay calm and I always look for common ground.
SPEAKER_A: Can you give me an example?
SPEAKER_B: Yes — last year I mediated between two teams who weren't speaking to each other.`,
    ttsLanguageCode: 'en-US',
    questionText: 'What strength does the candidate describe?',
    options: [{ label: 'Technical skills', value: 'technical' }, { label: 'Conflict mediation', value: 'mediation' }, { label: 'Public speaking', value: 'speaking' }, { label: 'Time management', value: 'time' }],
    correctAnswer: 'mediation', points: 2, orderIndex: 99, tags: ['dialogue', 'interview', 'everyday'], timeSuggested: 70
  },
  {
    language: 'English', cefrLevel: 'B2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: We have two options for August: a beach in Sicily or a hiking trip in the Dolomites.
SPEAKER_B: Honestly, after such a stressful year, I'd rather not walk uphill for ten days.
SPEAKER_A: Beach it is, then.
SPEAKER_B: Yes, with a book and zero alarms.`,
    ttsLanguageCode: 'en-US',
    questionText: 'Why do they choose the beach?',
    options: [{ label: "It's cheaper", value: 'cheap' }, { label: 'They want to relax', value: 'relax' }, { label: 'The weather is better', value: 'weather' }, { label: 'Family reasons', value: 'family' }],
    correctAnswer: 'relax', points: 2, orderIndex: 100, tags: ['dialogue', 'travel', 'everyday'], timeSuggested: 70
  },

  // ---- C1 dialogues ----
  {
    language: 'English', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Overall I'm very pleased with your year. The one area I'd like you to focus on is delegation.
SPEAKER_B: Yes, I tend to take on too much myself.
SPEAKER_A: Exactly. Trusting the team will free you up for the more strategic work we discussed.
SPEAKER_B: Agreed. I'll start by handing over the weekly reporting.`,
    ttsLanguageCode: 'en-US',
    questionText: 'What is the main development area for the employee?',
    options: [{ label: 'Public speaking', value: 'speaking' }, { label: 'Delegation', value: 'delegation' }, { label: 'Punctuality', value: 'punctuality' }, { label: 'Technical skill', value: 'technical' }],
    correctAnswer: 'delegation', points: 2, orderIndex: 101, tags: ['dialogue', 'work', 'review'], timeSuggested: 80
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: I'm calling because my order was meant to arrive last week and there's still no sign of it.
SPEAKER_B: I do apologise. I can see it's been held up at the warehouse. We can either dispatch a replacement today or refund the full amount.
SPEAKER_A: A replacement would be fine, as long as it ships today.
SPEAKER_B: Absolutely, you'll get the tracking number within the hour.`,
    ttsLanguageCode: 'en-US',
    questionText: 'What does the customer choose?',
    options: [{ label: 'Full refund', value: 'refund' }, { label: 'Partial refund', value: 'partial' }, { label: 'A replacement shipped today', value: 'replacement' }, { label: 'A discount on the next order', value: 'discount' }],
    correctAnswer: 'replacement', points: 2, orderIndex: 102, tags: ['dialogue', 'customer-service', 'everyday'], timeSuggested: 80
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: I noticed in the meeting today that you presented the new framework as your idea.
SPEAKER_B: That wasn't my intention — I assumed everyone knew we worked on it together.
SPEAKER_A: Most people in that room don't, and it matters for my visibility.
SPEAKER_B: You're right. I'll send a follow-up email crediting you properly.`,
    ttsLanguageCode: 'en-US',
    questionText: 'How will the issue be resolved?',
    options: [{ label: 'A formal complaint', value: 'complaint' }, { label: 'A team meeting', value: 'meeting' }, { label: 'Follow-up email crediting the colleague', value: 'email' }, { label: 'Apology to the manager', value: 'apology-mgr' }],
    correctAnswer: 'email', points: 2, orderIndex: 103, tags: ['dialogue', 'work', 'conflict'], timeSuggested: 80
  },
  {
    language: 'English', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: So you mentioned you used to work at a fintech in Berlin?
SPEAKER_B: Yes, for almost six years. I left last spring to start my own consultancy.
SPEAKER_A: Interesting. We're looking for someone who's been on both sides — corporate and founder.
SPEAKER_B: Happy to chat properly next week if you'd like.`,
    ttsLanguageCode: 'en-US',
    questionText: 'Why is the first speaker interested in the second?',
    options: [{ label: 'The Berlin connection', value: 'berlin' }, { label: 'Both corporate and founder experience', value: 'both' }, { label: 'Six years of fintech', value: 'fintech' }, { label: 'They are old friends', value: 'friends' }],
    correctAnswer: 'both', points: 2, orderIndex: 104, tags: ['dialogue', 'networking', 'everyday'], timeSuggested: 80
  },

  // ---- C2 dialogues ----
  {
    language: 'English', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: I'd like to revisit the assumption that Q3 will mirror Q1.
SPEAKER_B: You think the seasonal effect is being underestimated?
SPEAKER_A: I think we're conflating two distinct customer cohorts and the model masks the divergence.
SPEAKER_B: That's a fair concern. Shall we ask analytics to disaggregate the segments before we sign off?`,
    ttsLanguageCode: 'en-US',
    questionText: "What is the first speaker's real concern?",
    options: [{ label: 'Q3 will be worse than expected', value: 'q3-worse' }, { label: 'Two customer cohorts are being conflated', value: 'cohorts' }, { label: 'Analytics is wrong', value: 'analytics' }, { label: 'Seasonality is overestimated', value: 'season-over' }],
    correctAnswer: 'cohorts', points: 2, orderIndex: 105, tags: ['dialogue', 'business', 'nuanced'], timeSuggested: 90
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: We'd love to put your name forward as the keynote speaker.
SPEAKER_B: I'm hugely flattered. Honestly, the timing is the issue — I'm in the final stretch of writing the book and a keynote would derail me.
SPEAKER_A: Of course. Would a panel later in the year work better?
SPEAKER_B: That I could absolutely do.`,
    ttsLanguageCode: 'en-US',
    questionText: 'Why does the second speaker decline the keynote?',
    options: [{ label: 'Not interested in the topic', value: 'not-interested' }, { label: 'Already committed elsewhere', value: 'committed' }, { label: 'Writing a book', value: 'book' }, { label: "Doesn't like keynotes", value: 'dislike' }],
    correctAnswer: 'book', points: 2, orderIndex: 106, tags: ['dialogue', 'professional', 'nuanced'], timeSuggested: 90
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Your written analyses are excellent, but in meetings you tend to hedge.
SPEAKER_B: I know. I'm conscious of not overclaiming.
SPEAKER_A: Healthy instinct, but the pendulum has swung too far. Lead with the conclusion and only then qualify it.
SPEAKER_B: Conclusion first, caveats after. Got it.`,
    ttsLanguageCode: 'en-US',
    questionText: 'What does the mentor suggest?',
    options: [{ label: 'Speak less in meetings', value: 'less' }, { label: 'Lead with the conclusion', value: 'conclusion-first' }, { label: 'Stop using data', value: 'no-data' }, { label: 'Defer to seniors', value: 'defer' }],
    correctAnswer: 'conclusion-first', points: 2, orderIndex: 107, tags: ['dialogue', 'mentoring', 'nuanced'], timeSuggested: 90
  },
  {
    language: 'English', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Engineering keeps blocking us, and product owns the relationship — but I think the real issue is upstream.
SPEAKER_B: Meaning?
SPEAKER_A: The OKRs reward feature shipping, not enabling other teams. So engineering is rationally optimising against helping us.
SPEAKER_B: Right, so until incentives change, individual conversations won't move the needle.`,
    ttsLanguageCode: 'en-US',
    questionText: 'What does the first speaker identify as the root cause?',
    options: [{ label: 'Engineering is hostile', value: 'hostile' }, { label: 'Product mismanages the relationship', value: 'product' }, { label: 'Misaligned OKRs', value: 'okrs' }, { label: 'Lack of meetings', value: 'meetings' }],
    correctAnswer: 'okrs', points: 2, orderIndex: 108, tags: ['dialogue', 'organisational', 'nuanced'], timeSuggested: 90
  },
]
