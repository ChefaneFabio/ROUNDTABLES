import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🔍 Checking database connection...\n')

  // Get connection info (safely, without exposing full password)
  const dbUrl = process.env.DATABASE_URL || ''
  const dbHost = dbUrl.match(/@([^/]+)/)?.[1] || 'unknown'
  const dbName = dbUrl.match(/\/([^?]+)/)?.[1] || 'unknown'

  console.log(`📍 Current DATABASE_URL points to:`)
  console.log(`   Host: ${dbHost}`)
  console.log(`   Database: ${dbName}`)
  console.log()

  // Check what's in this database
  const trainerCount = await prisma.trainer.count()
  const userCount = await prisma.user.count()
  const sessionCount = await prisma.session.count()
  const roundtableCount = await prisma.roundtable.count()

  console.log(`📊 Database contents:`)
  console.log(`   Trainers: ${trainerCount}`)
  console.log(`   Users: ${userCount}`)
  console.log(`   Sessions: ${sessionCount}`)
  console.log(`   Roundtables: ${roundtableCount}`)
  console.log()

  // List all trainers
  const trainers = await prisma.trainer.findMany()
  console.log(`👥 All trainers:`)
  trainers.forEach(t => {
    console.log(`   - ${t.name} (${t.email})`)
  })

  await prisma.$disconnect()
}

main().catch(console.error)
