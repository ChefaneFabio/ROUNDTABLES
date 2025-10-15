import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function checkSessions() {
  try {
    const sessions = await prisma.session.findMany({
      select: {
        id: true,
        sessionNumber: true,
        status: true,
        roundtable: {
          select: { name: true }
        }
      }
    })

    console.log('📊 Current Sessions:')
    console.log(`Total sessions: ${sessions.length}`)
    console.log('')

    // Group by status
    const statusGroups: Record<string, number> = {}
    sessions.forEach(s => {
      statusGroups[s.status] = (statusGroups[s.status] || 0) + 1
    })

    console.log('Status Distribution:')
    Object.entries(statusGroups).forEach(([status, count]) => {
      console.log(`  ${status}: ${count}`)
    })

    console.log('')
    console.log('Session Details:')
    sessions.forEach(s => {
      console.log(`  - ${s.roundtable.name} Session ${s.sessionNumber}: ${s.status}`)
    })

  } catch (error) {
    console.error('Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkSessions()
