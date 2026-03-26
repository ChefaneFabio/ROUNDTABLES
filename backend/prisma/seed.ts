import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  const password = await bcrypt.hash('demo123', 10)

  // Upsert admin user
  const corporate = await prisma.user.upsert({
    where: { email: 'admin@demo.com' },
    update: { name: 'School Admin', role: 'ADMIN', password },
    create: {
      email: 'admin@demo.com',
      password,
      name: 'School Admin',
      role: 'ADMIN'
    }
  })
  console.log('✓ Admin user ready:', corporate.email)

  // Ensure school exists for this user
  let school = await prisma.school.findFirst({ where: { userId: corporate.id } })
  if (!school) {
    // Check if school email already exists
    school = await prisma.school.findFirst({ where: { email: 'info@makalanguage.com' } })
    if (school) {
      // Reassign existing school to admin user
      school = await prisma.school.update({
        where: { id: school.id },
        data: { userId: corporate.id }
      })
      console.log('✓ School reassigned to admin user')
    } else {
      school = await prisma.school.create({
        data: {
          name: 'Maka Learning Management Centre',
          email: 'info@makalanguage.com',
          userId: corporate.id,
          isActive: true
        }
      })
      console.log('✓ School created:', school.name)
    }
  } else {
    console.log('→ School exists:', school.name)
  }

  // Upsert teacher user
  const teacherUser = await prisma.user.upsert({
    where: { email: 'teacher@demo.com' },
    update: { name: 'Demo Teacher', role: 'TEACHER', password },
    create: {
      email: 'teacher@demo.com',
      password,
      name: 'Demo Teacher',
      role: 'TEACHER'
    }
  })
  // Ensure teacher profile
  const existingTeacher = await prisma.teacher.findFirst({ where: { userId: teacherUser.id } })
  if (!existingTeacher) {
    await prisma.teacher.create({
      data: {
        userId: teacherUser.id,
        schoolId: school.id,
        expertise: ['English', 'Business English'],
        isActive: true
      }
    })
    console.log('✓ Teacher profile created')
  }
  console.log('✓ Teacher ready:', teacherUser.email)

  // Upsert student user
  const studentUser = await prisma.user.upsert({
    where: { email: 'student@demo.com' },
    update: { name: 'Demo Student', role: 'STUDENT', password },
    create: {
      email: 'student@demo.com',
      password,
      name: 'Demo Student',
      role: 'STUDENT'
    }
  })
  // Ensure student profile
  const existingStudent = await prisma.student.findFirst({ where: { userId: studentUser.id } })
  if (!existingStudent) {
    await prisma.student.create({
      data: {
        userId: studentUser.id,
        schoolId: school.id,
        languageLevel: 'B1',
        isActive: true
      }
    })
    console.log('✓ Student profile created')
  }
  console.log('✓ Student ready:', studentUser.email)

  // Seed multi-skill assessment questions for all languages
  const languages = [
    { name: 'English', dir: 'english', prefix: 'english' },
    { name: 'Spanish', dir: 'spanish', prefix: 'spanish' },
    { name: 'French', dir: 'french', prefix: 'french' },
    { name: 'German', dir: 'german', prefix: 'german' },
    { name: 'Italian', dir: 'italian', prefix: 'italian' },
  ]

  for (const lang of languages) {
    const existingCount = await prisma.assessmentQuestion.count({
      where: { language: lang.name, skill: { not: null } }
    })

    if (existingCount === 0) {
      console.log(`Seeding ${lang.name} multi-skill questions...`)
      try {
        const reading = await import(`../src/services/questionBanks/${lang.dir}/reading`)
        const listening = await import(`../src/services/questionBanks/${lang.dir}/listening`)
        const writing = await import(`../src/services/questionBanks/${lang.dir}/writing`)
        const speaking = await import(`../src/services/questionBanks/${lang.dir}/speaking`)

        const readingQs = reading[`${lang.prefix}ReadingQuestions`] || []
        const listeningQs = listening[`${lang.prefix}ListeningQuestions`] || []
        const writingQs = writing[`${lang.prefix}WritingQuestions`] || []
        const speakingQs = speaking[`${lang.prefix}SpeakingQuestions`] || []

        // Import new 4-section question banks (grammar, vocabulary, errorCorrection, sentenceTransformation)
        let grammarQs: any[] = []
        let vocabularyQs: any[] = []
        let errorCorrectionQs: any[] = []
        let sentenceTransformationQs: any[] = []

        try {
          const grammar = await import(`../src/services/questionBanks/${lang.dir}/grammar`)
          grammarQs = grammar[`${lang.prefix}GrammarQuestions`] || []
        } catch { /* not available for this language yet */ }

        try {
          const vocabulary = await import(`../src/services/questionBanks/${lang.dir}/vocabulary`)
          vocabularyQs = vocabulary[`${lang.prefix}VocabularyQuestions`] || []
        } catch { /* not available for this language yet */ }

        try {
          const errorCorrection = await import(`../src/services/questionBanks/${lang.dir}/errorCorrection`)
          errorCorrectionQs = errorCorrection[`${lang.prefix}ErrorCorrectionQuestions`] || []
        } catch { /* not available for this language yet */ }

        try {
          const sentenceTransformation = await import(`../src/services/questionBanks/${lang.dir}/sentenceTransformation`)
          sentenceTransformationQs = sentenceTransformation[`${lang.prefix}SentenceTransformationQuestions`] || []
        } catch { /* not available for this language yet */ }

        const allQuestions = [
          ...readingQs, ...listeningQs, ...writingQs, ...speakingQs,
          ...grammarQs, ...vocabularyQs, ...errorCorrectionQs, ...sentenceTransformationQs
        ]

        if (allQuestions.length > 0) {
          await prisma.assessmentQuestion.createMany({
            data: allQuestions.map((q: any) => ({
              language: q.language,
              cefrLevel: q.cefrLevel,
              questionType: q.questionType,
              questionText: q.questionText,
              options: q.options || undefined,
              correctAnswer: q.correctAnswer || '',
              passage: q.passage,
              passageTitle: q.passageTitle,
              points: q.points,
              orderIndex: q.orderIndex,
              skill: q.skill,
              ttsScript: q.ttsScript,
              ttsLanguageCode: q.ttsLanguageCode,
              speakingPrompt: q.speakingPrompt,
              rubric: q.rubric || undefined,
              tags: q.tags || [],
              timeSuggested: q.timeSuggested,
            })),
          })
          console.log(`✓ Seeded ${allQuestions.length} ${lang.name} questions (R:${readingQs.length} L:${listeningQs.length} W:${writingQs.length} S:${speakingQs.length} G:${grammarQs.length} V:${vocabularyQs.length} EC:${errorCorrectionQs.length} ST:${sentenceTransformationQs.length})`)
        }
      } catch (err) {
        console.log(`→ Skipping ${lang.name}: question bank files not found`)
      }
    } else {
      console.log(`→ ${lang.name} multi-skill questions already exist (${existingCount})`)
    }
  }

  // Seed gamification badges
  console.log('\nSeeding gamification badges...')
  const { BADGE_DEFINITIONS } = await import('../src/services/GamificationService')
  for (const badge of BADGE_DEFINITIONS) {
    await prisma.badge.upsert({
      where: { slug: badge.slug },
      update: { name: badge.name, description: badge.description, icon: badge.icon, category: badge.category, criteria: badge.criteria, xpReward: badge.xpReward, rarity: badge.rarity },
      create: badge,
    })
  }
  console.log(`✅ Seeded ${BADGE_DEFINITIONS.length} badges`)

  console.log('\n✅ Demo accounts ready!')
  console.log('   Email: admin@demo.com / teacher@demo.com / student@demo.com')
  console.log('   Password: demo123')
}

main()
  .catch((e) => {
    console.error('Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
