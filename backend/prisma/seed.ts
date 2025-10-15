import { PrismaClient, ParticipantStatus, RoundtableStatus } from '@prisma/client'
import { addDays, addWeeks } from 'date-fns'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Clean existing data (in reverse order due to foreign keys)
  console.log('🧹 Cleaning existing data...')
  await prisma.question.deleteMany()
  await prisma.feedback.deleteMany()
  await prisma.notification.deleteMany()
  await prisma.topicVote.deleteMany()
  await prisma.session.deleteMany()
  await prisma.topic.deleteMany()
  await prisma.participant.deleteMany()
  await prisma.roundtable.deleteMany()
  await prisma.client.deleteMany()
  await prisma.trainer.deleteMany()

  // Create Trainer (JEAN)
  console.log('👤 Creating trainer...')
  const trainer = await prisma.trainer.create({
    data: {
      name: 'JEAN',
      email: 'jean@trainer.com',
      expertise: ['Leadership', 'Team Management', 'Communication', 'Innovation'],
      isActive: true
    }
  })
  console.log(`✅ Trainer created: ${trainer.name} (${trainer.email})`)

  // Create Client
  console.log('🏢 Creating client...')
  const client = await prisma.client.create({
    data: {
      name: 'Hyundai',
      email: 'contact@hyundai.com',
      company: 'Hyundai Motor Company',
      description: 'Leading automotive manufacturer'
    }
  })
  console.log(`✅ Client created: ${client.company}`)

  // Create Roundtable
  console.log('🎯 Creating roundtable...')
  const roundtable = await prisma.roundtable.create({
    data: {
      name: 'Hyundai GROUP 2 - Leadership Development',
      description: 'Advanced leadership training for mid-level managers',
      status: RoundtableStatus.IN_PROGRESS,
      startDate: addDays(new Date(), -14), // Started 2 weeks ago
      maxParticipants: 6,
      clientId: client.id
    }
  })
  console.log(`✅ Roundtable created: ${roundtable.name}`)

  // Create Participants
  console.log('👥 Creating participants...')
  const participants = await Promise.all([
    prisma.participant.create({
      data: {
        name: 'Marco Rossi',
        email: 'marco.rossi@hyundai.com',
        company: 'Hyundai',
        languageLevel: 'B2',
        status: ParticipantStatus.ACTIVE,
        roundtableId: roundtable.id
      }
    }),
    prisma.participant.create({
      data: {
        name: 'Laura Bianchi',
        email: 'laura.bianchi@hyundai.com',
        company: 'Hyundai',
        languageLevel: 'B1',
        status: ParticipantStatus.ACTIVE,
        roundtableId: roundtable.id
      }
    }),
    prisma.participant.create({
      data: {
        name: 'Giuseppe Verdi',
        email: 'giuseppe.verdi@hyundai.com',
        company: 'Hyundai',
        languageLevel: 'C1',
        status: ParticipantStatus.ACTIVE,
        roundtableId: roundtable.id
      }
    }),
    prisma.participant.create({
      data: {
        name: 'Sofia Ferrari',
        email: 'sofia.ferrari@hyundai.com',
        company: 'Hyundai',
        languageLevel: 'B2',
        status: ParticipantStatus.ACTIVE,
        roundtableId: roundtable.id
      }
    }),
    prisma.participant.create({
      data: {
        name: 'Alessandro Romano',
        email: 'alessandro.romano@hyundai.com',
        company: 'Hyundai',
        languageLevel: 'B1',
        status: ParticipantStatus.ACTIVE,
        roundtableId: roundtable.id
      }
    }),
    prisma.participant.create({
      data: {
        name: 'Elena Conti',
        email: 'elena.conti@hyundai.com',
        company: 'Hyundai',
        languageLevel: 'B2',
        status: ParticipantStatus.ACTIVE,
        roundtableId: roundtable.id
      }
    })
  ])
  console.log(`✅ Created ${participants.length} participants`)

  // Create Topics (8 selected topics for sessions)
  console.log('📚 Creating topics...')
  const topics = await Promise.all([
    prisma.topic.create({
      data: {
        title: 'Introduction & Ice Breaker',
        description: 'Getting to know each other and setting expectations',
        isSelected: true,
        roundtableId: roundtable.id
      }
    }),
    prisma.topic.create({
      data: {
        title: 'Effective Communication',
        description: 'Mastering verbal and non-verbal communication in leadership',
        isSelected: true,
        roundtableId: roundtable.id
      }
    }),
    prisma.topic.create({
      data: {
        title: 'Motivating the Team',
        description: 'Techniques for inspiring and motivating team members',
        isSelected: true,
        roundtableId: roundtable.id
      }
    }),
    prisma.topic.create({
      data: {
        title: 'Innovation Mindset',
        description: 'Fostering creativity and innovation in teams',
        isSelected: true,
        roundtableId: roundtable.id
      }
    }),
    prisma.topic.create({
      data: {
        title: 'Conflict Resolution',
        description: 'Handling disagreements and conflicts constructively',
        isSelected: true,
        roundtableId: roundtable.id
      }
    }),
    prisma.topic.create({
      data: {
        title: 'Decision Making',
        description: 'Strategic decision-making frameworks for leaders',
        isSelected: true,
        roundtableId: roundtable.id
      }
    }),
    prisma.topic.create({
      data: {
        title: 'Time Management',
        description: 'Prioritization and productivity techniques',
        isSelected: true,
        roundtableId: roundtable.id
      }
    }),
    prisma.topic.create({
      data: {
        title: 'Leading Change',
        description: 'Managing organizational change and transformation',
        isSelected: true,
        roundtableId: roundtable.id
      }
    }),
    prisma.topic.create({
      data: {
        title: 'Wrap-up & Action Plans',
        description: 'Summary and individual action planning',
        isSelected: true,
        roundtableId: roundtable.id
      }
    })
  ])
  console.log(`✅ Created ${topics.length} topics`)

  // Create Sessions (10 total: 1 intro + 8 topics + 1 wrap-up)
  console.log('📅 Creating sessions...')
  const now = new Date()

  // Session 1: Completed (1 week ago) - with approved questions and feedback
  const session1 = await prisma.session.create({
    data: {
      sessionNumber: 1,
      scheduledAt: addDays(now, -7),
      status: 'COMPLETED',
      questionsStatus: 'SENT_TO_PARTICIPANTS',
      feedbacksStatus: 'SENT_TO_PARTICIPANTS',
      roundtableId: roundtable.id,
      topicId: topics[0].id, // Introduction
      trainerId: trainer.id,
      meetingLink: 'https://meet.google.com/session1'
    }
  })

  // Add questions for session 1 (approved)
  await Promise.all([
    prisma.question.create({
      data: {
        sessionId: session1.id,
        question: 'What are your main expectations from this leadership program?',
        status: 'APPROVED'
      }
    }),
    prisma.question.create({
      data: {
        sessionId: session1.id,
        question: 'Describe a challenging leadership situation you faced recently.',
        status: 'APPROVED'
      }
    }),
    prisma.question.create({
      data: {
        sessionId: session1.id,
        question: 'What leadership qualities do you want to develop?',
        status: 'APPROVED'
      }
    })
  ])

  // Add feedback for session 1 (all sent)
  for (const participant of participants) {
    await prisma.feedback.create({
      data: {
        sessionId: session1.id,
        participantId: participant.id,
        trainerId: trainer.id,
        content: `Great engagement and participation from ${participant.name}. Shows strong potential in leadership communication.`,
        status: 'SENT',
        sentAt: addDays(now, -6)
      }
    })
  }
  console.log('✅ Session 1: Completed with questions and feedback')

  // Session 2: Completed (3 days ago) - NEEDS FEEDBACK
  const session2 = await prisma.session.create({
    data: {
      sessionNumber: 2,
      scheduledAt: addDays(now, -3),
      status: 'COMPLETED',
      questionsStatus: 'SENT_TO_PARTICIPANTS',
      feedbacksStatus: 'REQUESTED_FROM_COORDINATOR',
      roundtableId: roundtable.id,
      topicId: topics[1].id, // Effective Communication
      trainerId: trainer.id,
      meetingLink: 'https://meet.google.com/session2'
    }
  })

  // Add approved questions for session 2
  await Promise.all([
    prisma.question.create({
      data: {
        sessionId: session2.id,
        question: 'How do you adapt your communication style to different team members?',
        status: 'APPROVED'
      }
    }),
    prisma.question.create({
      data: {
        sessionId: session2.id,
        question: 'What non-verbal cues do you pay attention to during conversations?',
        status: 'APPROVED'
      }
    }),
    prisma.question.create({
      data: {
        sessionId: session2.id,
        question: 'Describe a time when miscommunication caused problems in your team.',
        status: 'APPROVED'
      }
    })
  ])
  console.log('✅ Session 2: Completed - NEEDS FEEDBACK from trainer')

  // Session 3: Next week - NEEDS QUESTIONS
  const session3 = await prisma.session.create({
    data: {
      sessionNumber: 3,
      scheduledAt: addDays(now, 7),
      status: 'SCHEDULED',
      questionsStatus: 'REQUESTED_FROM_COORDINATOR',
      feedbacksStatus: 'NOT_REQUESTED',
      roundtableId: roundtable.id,
      topicId: topics[2].id, // Motivating the Team
      trainerId: trainer.id,
      meetingLink: 'https://meet.google.com/session3'
    }
  })
  console.log('✅ Session 3: Next week - NEEDS QUESTIONS from trainer')

  // Session 4: In 2 weeks - questions submitted, pending approval
  const session4 = await prisma.session.create({
    data: {
      sessionNumber: 4,
      scheduledAt: addDays(now, 14),
      status: 'SCHEDULED',
      questionsStatus: 'PENDING_APPROVAL',
      feedbacksStatus: 'NOT_REQUESTED',
      roundtableId: roundtable.id,
      topicId: topics[3].id, // Innovation Mindset
      trainerId: trainer.id,
      meetingLink: 'https://meet.google.com/session4'
    }
  })

  // Add pending questions for session 4
  await Promise.all([
    prisma.question.create({
      data: {
        sessionId: session4.id,
        question: 'How do you encourage creative thinking in your team?',
        status: 'PENDING'
      }
    }),
    prisma.question.create({
      data: {
        sessionId: session4.id,
        question: 'What barriers prevent innovation in your organization?',
        status: 'PENDING'
      }
    }),
    prisma.question.create({
      data: {
        sessionId: session4.id,
        question: 'Share an example of an innovative solution your team implemented.',
        status: 'PENDING'
      }
    })
  ])
  console.log('✅ Session 4: Questions pending coordinator approval')

  // Sessions 5-10: Future sessions (not yet assigned questions)
  const futureSessions = [
    { number: 5, days: 21, topic: topics[4] }, // Conflict Resolution
    { number: 6, days: 28, topic: topics[5] }, // Decision Making
    { number: 7, days: 35, topic: topics[6] }, // Time Management
    { number: 8, days: 42, topic: topics[7] }, // Leading Change
    { number: 9, days: 49, topic: topics[8] }, // Wrap-up
    { number: 10, days: 56, topic: topics[8] } // Final session
  ]

  for (const fs of futureSessions) {
    await prisma.session.create({
      data: {
        sessionNumber: fs.number,
        scheduledAt: addDays(now, fs.days),
        status: 'SCHEDULED',
        questionsStatus: 'NOT_REQUESTED',
        feedbacksStatus: 'NOT_REQUESTED',
        roundtableId: roundtable.id,
        topicId: fs.topic.id,
        trainerId: trainer.id,
        meetingLink: `https://meet.google.com/session${fs.number}`
      }
    })
  }
  console.log('✅ Created future sessions 5-10')

  console.log('')
  console.log('🎉 Database seed completed successfully!')
  console.log('')
  console.log('📋 Summary:')
  console.log(`   - Trainer: ${trainer.name} (${trainer.email})`)
  console.log(`   - Client: ${client.company}`)
  console.log(`   - Roundtable: ${roundtable.name}`)
  console.log(`   - Participants: ${participants.length}`)
  console.log(`   - Topics: ${topics.length}`)
  console.log(`   - Sessions: 10 total`)
  console.log('')
  console.log('🧪 Test Scenarios:')
  console.log('   ✅ Session 1: Completed with feedback sent')
  console.log('   ⚠️  Session 2: Completed - NEEDS FEEDBACK (action required)')
  console.log('   ⚠️  Session 3: Next week - NEEDS QUESTIONS (action required)')
  console.log('   🕐 Session 4: Questions pending approval')
  console.log('   📅 Sessions 5-10: Future sessions')
  console.log('')
  console.log('🔗 Test Login:')
  console.log('   Email: jean@trainer.com')
  console.log('   Go to: http://localhost:3000/trainer/profile')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
