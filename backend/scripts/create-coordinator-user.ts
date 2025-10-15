import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('👤 Creating coordinator user for login...')

  // Hash password
  const hashedPassword = await bcrypt.hash('Coordinator123!', 10)

  // Create user with COORDINATOR role
  const user = await prisma.user.upsert({
    where: { email: 'coordinator@roundtables.com' },
    update: {},
    create: {
      email: 'coordinator@roundtables.com',
      password: hashedPassword,
      name: 'Coordinator',
      role: 'COORDINATOR',
      isActive: true
    }
  })

  console.log('✅ Coordinator user created successfully!')
  console.log('')
  console.log('🔑 Login Credentials:')
  console.log('   Email: coordinator@roundtables.com')
  console.log('   Password: Coordinator123!')
  console.log('')
  console.log('🌐 Login URL:')
  console.log('   http://localhost:3000/login')
  console.log('')
  console.log('After login, you will be redirected to:')
  console.log('   http://localhost:3000/dashboard')
}

main()
  .catch((e) => {
    console.error('❌ Error creating user:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
