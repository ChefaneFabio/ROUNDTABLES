import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const CEFR_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']

// Sample English questions for placement test
const ENGLISH_QUESTIONS = [
  // A1 Level
  { level: 'A1', text: 'What ___ your name?', options: ['is', 'are', 'am', 'be'], answer: 'is' },
  { level: 'A1', text: 'She ___ a teacher.', options: ['is', 'are', 'am', 'be'], answer: 'is' },
  { level: 'A1', text: 'I ___ from Italy.', options: ['am', 'is', 'are', 'be'], answer: 'am' },
  { level: 'A1', text: 'They ___ students.', options: ['are', 'is', 'am', 'be'], answer: 'are' },
  { level: 'A1', text: '___ you like coffee?', options: ['Do', 'Does', 'Is', 'Are'], answer: 'Do' },
  { level: 'A1', text: 'He ___ to school every day.', options: ['goes', 'go', 'going', 'gone'], answer: 'goes' },
  { level: 'A1', text: 'This is ___ book.', options: ['my', 'I', 'me', 'mine'], answer: 'my' },
  { level: 'A1', text: 'How ___ are you?', options: ['old', 'much', 'many', 'long'], answer: 'old' },
  { level: 'A1', text: 'I have ___ apple.', options: ['an', 'a', 'the', '-'], answer: 'an' },
  { level: 'A1', text: 'She ___ English.', options: ['speaks', 'speak', 'speaking', 'spoken'], answer: 'speaks' },

  // A2 Level
  { level: 'A2', text: 'I ___ to the cinema yesterday.', options: ['went', 'go', 'going', 'gone'], answer: 'went' },
  { level: 'A2', text: 'She has ___ finished her homework.', options: ['already', 'yet', 'still', 'ago'], answer: 'already' },
  { level: 'A2', text: 'There are ___ people in the room.', options: ['some', 'any', 'much', 'a'], answer: 'some' },
  { level: 'A2', text: 'He is ___ than his brother.', options: ['taller', 'more tall', 'tallest', 'most tall'], answer: 'taller' },
  { level: 'A2', text: 'I ___ play tennis when I was young.', options: ['used to', 'use to', 'using to', 'uses to'], answer: 'used to' },
  { level: 'A2', text: 'What ___ you doing now?', options: ['are', 'is', 'do', 'does'], answer: 'are' },
  { level: 'A2', text: 'I have ___ been to Paris.', options: ['never', 'ever', 'always', 'often'], answer: 'never' },
  { level: 'A2', text: 'The book is ___ the table.', options: ['on', 'in', 'at', 'by'], answer: 'on' },
  { level: 'A2', text: 'She ___ TV when I called.', options: ['was watching', 'watched', 'watches', 'watch'], answer: 'was watching' },
  { level: 'A2', text: 'I need ___ information.', options: ['some', 'a', 'an', 'many'], answer: 'some' },

  // B1 Level
  { level: 'B1', text: 'If I ___ rich, I would travel the world.', options: ['were', 'am', 'was', 'be'], answer: 'were' },
  { level: 'B1', text: 'She said she ___ come to the party.', options: ['would', 'will', 'shall', 'can'], answer: 'would' },
  { level: 'B1', text: 'I wish I ___ speak French.', options: ['could', 'can', 'would', 'will'], answer: 'could' },
  { level: 'B1', text: 'The report ___ by tomorrow.', options: ['must be finished', 'must finished', 'must finish', 'must be finish'], answer: 'must be finished' },
  { level: 'B1', text: 'He ___ working here for five years.', options: ['has been', 'is', 'was', 'had'], answer: 'has been' },
  { level: 'B1', text: 'I suggested ___ early.', options: ['leaving', 'to leave', 'leave', 'left'], answer: 'leaving' },
  { level: 'B1', text: 'By next year, I ___ graduated.', options: ['will have', 'have', 'had', 'will'], answer: 'will have' },
  { level: 'B1', text: 'The meeting was put ___ until next week.', options: ['off', 'on', 'in', 'up'], answer: 'off' },
  { level: 'B1', text: 'She is used to ___ early.', options: ['getting up', 'get up', 'got up', 'gets up'], answer: 'getting up' },
  { level: 'B1', text: 'I would rather you ___ smoke here.', options: ["didn't", "don't", "won't", "haven't"], answer: "didn't" },

  // B2 Level
  { level: 'B2', text: 'Had I known, I ___ differently.', options: ['would have acted', 'would act', 'will act', 'acted'], answer: 'would have acted' },
  { level: 'B2', text: 'No sooner had he arrived ___ it started raining.', options: ['than', 'when', 'that', 'then'], answer: 'than' },
  { level: 'B2', text: 'The project, ___ was complex, took months.', options: ['which', 'that', 'what', 'who'], answer: 'which' },
  { level: 'B2', text: 'She denied ___ the money.', options: ['having taken', 'to take', 'took', 'take'], answer: 'having taken' },
  { level: 'B2', text: 'Under no circumstances ___ be late.', options: ['should you', 'you should', 'should', 'you'], answer: 'should you' },
  { level: 'B2', text: 'It is high time we ___ a decision.', options: ['made', 'make', 'making', 'will make'], answer: 'made' },
  { level: 'B2', text: 'The more you practice, ___ you become.', options: ['the better', 'better', 'the best', 'best'], answer: 'the better' },
  { level: 'B2', text: 'I regret ___ you that you failed.', options: ['to inform', 'informing', 'inform', 'informed'], answer: 'to inform' },
  { level: 'B2', text: 'Not until she left ___ realize the truth.', options: ['did I', 'I did', 'I do', 'do I'], answer: 'did I' },
  { level: 'B2', text: 'Little ___ he know what awaited him.', options: ['did', 'does', 'do', 'was'], answer: 'did' },

  // C1 Level
  { level: 'C1', text: 'The proposal, ___ merits notwithstanding, was rejected.', options: ['its', "it's", 'their', 'whose'], answer: 'its' },
  { level: 'C1', text: '___ to his efforts, the project succeeded.', options: ['Thanks', 'Thank', 'Thanking', 'Thanked'], answer: 'Thanks' },
  { level: 'C1', text: 'She is nothing if not ___.', options: ['dedicated', 'dedicating', 'dedicate', 'dedication'], answer: 'dedicated' },
  { level: 'C1', text: 'The theory has yet to be ___.', options: ['substantiated', 'substantiate', 'substantiating', 'substance'], answer: 'substantiated' },
  { level: 'C1', text: 'Be that ___ it may, we must proceed.', options: ['as', 'what', 'how', 'which'], answer: 'as' },
  { level: 'C1', text: 'The findings were, ___, inconclusive.', options: ['at best', 'at worst', 'at least', 'at most'], answer: 'at best' },
  { level: 'C1', text: 'Her argument, ___ compelling, lacked evidence.', options: ['however', 'although', 'despite', 'whereas'], answer: 'however' },
  { level: 'C1', text: '___ circumstances should you reveal this.', options: ['Under no', 'In no', 'At no', 'By no'], answer: 'Under no' },
  { level: 'C1', text: 'The report ___ to several key issues.', options: ['alludes', 'eludes', 'illudes', 'preludes'], answer: 'alludes' },
  { level: 'C1', text: 'It ___ without saying that honesty is crucial.', options: ['goes', 'comes', 'runs', 'stands'], answer: 'goes' },

  // C2 Level
  { level: 'C2', text: 'The implications ___ far-reaching and profound.', options: ['are', 'is', 'being', 'been'], answer: 'are' },
  { level: 'C2', text: 'Her eloquence notwithstanding, the argument was ___.', options: ['specious', 'spacious', 'special', 'species'], answer: 'specious' },
  { level: 'C2', text: 'The nuances of his prose are ___.', options: ['ineffable', 'effable', 'affable', 'fallible'], answer: 'ineffable' },
  { level: 'C2', text: 'Such ___ behavior is unacceptable.', options: ['egregious', 'gregarious', 'ingenious', 'indigenous'], answer: 'egregious' },
  { level: 'C2', text: 'The speaker\'s ___ was captivating.', options: ['perspicacity', 'capacity', 'tenacity', 'audacity'], answer: 'perspicacity' },
  { level: 'C2', text: 'Her argument was ___ at best.', options: ['tendentious', 'contentious', 'pretentious', 'sententious'], answer: 'tendentious' },
  { level: 'C2', text: 'The policy proved ___ in practice.', options: ['untenable', 'tenable', 'attainable', 'obtainable'], answer: 'untenable' },
  { level: 'C2', text: 'His ___ remarks offended everyone.', options: ['disparaging', 'encouraging', 'engaging', 'enraging'], answer: 'disparaging' },
  { level: 'C2', text: 'The evidence is ___ circumstantial.', options: ['wholly', 'holy', 'holey', 'woolly'], answer: 'wholly' },
  { level: 'C2', text: 'Her prose style is notably ___.', options: ['lapidary', 'lapel', 'lapis', 'laptop'], answer: 'lapidary' },
]

async function main() {
  console.log('Seeding assessment questions...')

  // Clear existing questions
  await prisma.assessmentQuestion.deleteMany({
    where: { language: 'English' }
  })

  let orderIndex = 0
  for (const q of ENGLISH_QUESTIONS) {
    await prisma.assessmentQuestion.create({
      data: {
        language: 'English',
        cefrLevel: q.level,
        questionType: 'MULTIPLE_CHOICE',
        questionText: q.text,
        options: q.options.map((opt, i) => ({ label: opt, value: opt })),
        correctAnswer: q.answer,
        points: 1,
        orderIndex: orderIndex++,
        isActive: true
      }
    })
  }

  console.log(`Created ${ENGLISH_QUESTIONS.length} assessment questions`)

  // Create an admin user if none exists
  const adminExists = await prisma.user.findFirst({
    where: { role: 'ADMIN' }
  })

  if (!adminExists) {
    const bcrypt = await import('bcryptjs')
    const hashedPassword = await bcrypt.hash('admin123', 10)

    await prisma.user.create({
      data: {
        email: 'admin@makalmc.com',
        name: 'Admin User',
        password: hashedPassword,
        role: 'ADMIN'
      }
    })
    console.log('Created admin user: admin@makalmc.com / admin123')
  }

  console.log('Seeding complete!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
