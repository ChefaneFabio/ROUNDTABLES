import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('👤 Creating trainer user for login...')

  // Hash password
  const hashedPassword = await bcrypt.hash('Trainer123!', 10)

  // Create user with TRAINER role
  const user = await prisma.user.upsert({
    where: { email: 'jean@trainer.com' },
    update: {},
    create: {
      email: 'jean@trainer.com',
      password: hashedPassword,
      name: 'JEAN',
      role: 'TRAINER',
      isActive: true
    }
  })

  console.log('✅ Trainer user created successfully!')
  console.log('')
  console.log('🔑 Login Credentials:')
  console.log('   Email: jean@trainer.com')
  console.log('   Password: Trainer123!')
  console.log('')
  console.log('🌐 Login URL:')
  console.log('   http://localhost:3000/login')
  console.log('')
  console.log('After login, you will be redirected to:')
  console.log('   http://localhost:3000/trainer/profile')
}

main()
  .catch((e) => {
    console.error('❌ Error creating user:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
