import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  const password = await bcrypt.hash('demo123', 10)

  // Create corporate user with school
  let corporate = await prisma.user.findUnique({ where: { email: 'admin@demo.com' } })

  if (!corporate) {
    corporate = await prisma.user.create({
      data: {
        email: 'admin@demo.com',
        password,
        name: 'School Admin',
        role: 'ADMIN',
        schoolProfile: {
          create: {
            name: 'Maka Learning Management Centre',
            email: 'info@makalanguage.com',
            isActive: true
          }
        }
      },
      include: { schoolProfile: true }
    })
    console.log('✓ Corporate user + school created:', corporate.email)
  } else {
    console.log('→ Corporate user exists:', corporate.email)
  }

  // Get school ID
  const school = await prisma.school.findFirst({ where: { userId: corporate.id } })
  if (!school) {
    console.log('✗ Error: No school found')
    return
  }
  console.log('✓ School:', school.name)

  // Create teacher user
  let teacherUser = await prisma.user.findUnique({ where: { email: 'teacher@demo.com' } })
  if (!teacherUser) {
    teacherUser = await prisma.user.create({
      data: {
        email: 'teacher@demo.com',
        password,
        name: 'Demo Teacher',
        role: 'TEACHER',
        teacherProfile: {
          create: {
            schoolId: school.id,
            expertise: ['English', 'Business English'],
            isActive: true
          }
        }
      }
    })
    console.log('✓ Teacher created:', teacherUser.email)
  } else {
    console.log('→ Teacher exists:', teacherUser.email)
  }

  // Create student user
  let studentUser = await prisma.user.findUnique({ where: { email: 'student@demo.com' } })
  if (!studentUser) {
    studentUser = await prisma.user.create({
      data: {
        email: 'student@demo.com',
        password,
        name: 'Demo Student',
        role: 'STUDENT',
        studentProfile: {
          create: {
            schoolId: school.id,
            languageLevel: 'B1',
            isActive: true
          }
        }
      }
    })
    console.log('✓ Student created:', studentUser.email)
  } else {
    console.log('→ Student exists:', studentUser.email)
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
