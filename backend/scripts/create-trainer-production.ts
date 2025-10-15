import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

// This script connects to PRODUCTION database directly
const productionDatabaseUrl = process.env.PRODUCTION_DATABASE_URL || process.env.DATABASE_URL

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: productionDatabaseUrl
    }
  }
})

async function main() {
  console.log('👤 Creating trainer user and profile in PRODUCTION database...')
  console.log(`📍 Database: ${productionDatabaseUrl?.substring(0, 50)}...`)

  // Hash password
  const hashedPassword = await bcrypt.hash('Trainer123!', 10)

  // Create user with TRAINER role
  const user = await prisma.user.upsert({
    where: { email: 'jean@trainer.com' },
    update: {
      password: hashedPassword,
      isActive: true
    },
    create: {
      email: 'jean@trainer.com',
      password: hashedPassword,
      name: 'JEAN',
      role: 'TRAINER',
      isActive: true
    }
  })

  console.log('✅ Trainer user created/updated successfully!')

  // Create trainer profile (needed for trainer portal to work)
  const trainer = await prisma.trainer.upsert({
    where: { email: 'jean@trainer.com' },
    update: {
      isActive: true
    },
    create: {
      name: 'JEAN',
      email: 'jean@trainer.com',
      expertise: ['Leadership', 'Team Management', 'Communication', 'Innovation'],
      isActive: true
    }
  })

  console.log('✅ Trainer profile created/updated successfully!')
  console.log('')
  console.log('🔑 Login Credentials:')
  console.log('   Email: jean@trainer.com')
  console.log('   Password: Trainer123!')
  console.log('')
  console.log('🌐 Production URL:')
  console.log('   https://roundtables-frontend-final.vercel.app/login')
  console.log('')
  console.log('✨ The trainer should now be able to log in!')
}

main()
  .catch((e) => {
    console.error('❌ Error creating trainer:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
