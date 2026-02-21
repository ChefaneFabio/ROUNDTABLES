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

  // Seed multi-skill assessment questions (English)
  const existingMultiSkillCount = await prisma.assessmentQuestion.count({
    where: { language: 'English', skill: { not: null } }
  })

  if (existingMultiSkillCount === 0) {
    console.log('Seeding multi-skill assessment questions...')
    const { englishReadingQuestions } = await import('../src/services/questionBanks/english/reading')
    const { englishListeningQuestions } = await import('../src/services/questionBanks/english/listening')
    const { englishWritingQuestions } = await import('../src/services/questionBanks/english/writing')
    const { englishSpeakingQuestions } = await import('../src/services/questionBanks/english/speaking')

    const allQuestions = [
      ...englishReadingQuestions,
      ...englishListeningQuestions,
      ...englishWritingQuestions,
      ...englishSpeakingQuestions,
    ]

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

    console.log(`✓ Seeded ${allQuestions.length} multi-skill questions (Reading: ${englishReadingQuestions.length}, Listening: ${englishListeningQuestions.length}, Writing: ${englishWritingQuestions.length}, Speaking: ${englishSpeakingQuestions.length})`)
  } else {
    console.log(`→ Multi-skill questions already exist (${existingMultiSkillCount})`)
  }

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
