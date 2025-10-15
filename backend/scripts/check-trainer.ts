import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function check() {
  console.log('Checking for jean@trainer.com...\n')

  const user = await prisma.user.findUnique({
    where: { email: 'jean@trainer.com' }
  })
  console.log('User:', user ? `✅ Found: ${user.name} (${user.role})` : '❌ Not found')

  const trainer = await prisma.trainer.findUnique({
    where: { email: 'jean@trainer.com' }
  })
  console.log('Trainer:', trainer ? `✅ Found: ${trainer.name}` : '❌ Not found')

  // Check database connection
  const trainersCount = await prisma.trainer.count()
  console.log(`\nTotal trainers in database: ${trainersCount}`)

  await prisma.$disconnect()
}

check().catch(console.error)
