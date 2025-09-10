import { PrismaClient, RoundtableStatus } from '@prisma/client'

const prisma = new PrismaClient()

export class VotingService {
  
  async getVotingData(roundtableId: string, participantEmail: string) {
    // First, verify the roundtable exists and is in voting phase
    const roundtable = await prisma.roundtable.findUnique({
      where: { id: roundtableId },
      include: {
        client: { select: { name: true, company: true } },
        topics: {
          orderBy: { title: 'asc' }
        },
        participants: {
          where: { email: participantEmail },
          include: {
            topicVotes: { select: { topicId: true } }
          }
        }
      }
    })

    if (!roundtable) {
      throw new Error('Roundtable not found')
    }

    if (roundtable.status !== 'TOPIC_VOTING') {
      throw new Error('Voting is not currently open for this roundtable')
    }

    const participant = roundtable.participants[0]
    if (!participant) {
      throw new Error('You are not registered for this roundtable')
    }

    // Check if participant has already voted
    const hasVoted = participant.topicVotes.length > 0
    const previousVotes = participant.topicVotes.map(v => v.topicId)

    return {
      roundtable: {
        id: roundtable.id,
        name: roundtable.name,
        client: roundtable.client
      },
      participant: {
        name: participant.name,
        email: participant.email,
        hasVoted
      },
      topics: roundtable.topics.map(topic => ({
        id: topic.id,
        title: topic.title,
        description: topic.description,
        isSelected: previousVotes.includes(topic.id)
      })),
      votingInstructions: {
        maxSelections: 8,
        message: 'Please select exactly 8 topics that interest you the most. These will become the focus of your roundtable discussions.'
      }
    }
  }

  async submitVotes(roundtableId: string, participantEmail: string, topicIds: string[]) {
    // Validate voting is still open
    const roundtable = await prisma.roundtable.findUnique({
      where: { id: roundtableId },
      include: {
        participants: { where: { email: participantEmail } },
        topics: { where: { id: { in: topicIds } } }
      }
    })

    if (!roundtable) {
      throw new Error('Roundtable not found')
    }

    if (roundtable.status !== 'TOPIC_VOTING') {
      throw new Error('Voting is no longer open for this roundtable')
    }

    const participant = roundtable.participants[0]
    if (!participant) {
      throw new Error('You are not registered for this roundtable')
    }

    // Validate all topic IDs belong to this roundtable
    if (roundtable.topics.length !== topicIds.length) {
      throw new Error('Some selected topics are not valid for this roundtable')
    }

    // Validate exactly 8 topics selected
    if (topicIds.length !== 8) {
      throw new Error('You must select exactly 8 topics')
    }

    return prisma.$transaction(async (tx) => {
      // Delete any existing votes for this participant
      await tx.topicVote.deleteMany({
        where: {
          participantId: participant.id,
          roundtableId
        }
      })

      // Create new votes
      const votes = await tx.topicVote.createMany({
        data: topicIds.map(topicId => ({
          participantId: participant.id,
          topicId,
          roundtableId
        }))
      })

      return {
        message: 'Your votes have been submitted successfully',
        votesSubmitted: votes.count,
        submittedAt: new Date()
      }
    })
  }

  async getVotingResults(roundtableId: string) {
    const topics = await prisma.topic.findMany({
      where: { roundtableId },
      include: {
        votes: {
          include: {
            participant: { select: { name: true, email: true } }
          }
        }
      }
    })

    // Get participant count for percentage calculation
    const totalParticipants = await prisma.participant.count({
      where: { roundtableId, status: { not: 'DROPPED_OUT' } }
    })

    const votedParticipants = await prisma.participant.count({
      where: {
        roundtableId,
        topicVotes: { some: {} }
      }
    })

    // Sort topics by vote count (descending)
    const sortedTopics = topics
      .map(topic => ({
        id: topic.id,
        title: topic.title,
        description: topic.description,
        voteCount: topic.votes.length,
        percentage: totalParticipants > 0 ? Math.round((topic.votes.length / totalParticipants) * 100) : 0,
        isSelected: topic.isSelected,
        voters: topic.votes.map(vote => ({
          name: vote.participant.name,
          email: vote.participant.email
        }))
      }))
      .sort((a, b) => b.voteCount - a.voteCount)

    return {
      topics: sortedTopics,
      statistics: {
        totalParticipants,
        votedParticipants,
        votingProgress: totalParticipants > 0 ? Math.round((votedParticipants / totalParticipants) * 100) : 0,
        selectedTopics: sortedTopics.filter(t => t.isSelected).length
      },
      top8Topics: sortedTopics.slice(0, 8),
      status: {
        canFinalize: votedParticipants >= Math.ceil(totalParticipants * 0.8) // 80% participation threshold
      }
    }
  }

  async hasParticipantVoted(roundtableId: string, participantEmail: string): Promise<boolean> {
    const participant = await prisma.participant.findFirst({
      where: { 
        roundtableId, 
        email: participantEmail 
      },
      include: {
        topicVotes: { take: 1 }
      }
    })

    return !!participant && participant.topicVotes.length > 0
  }

  async getVotingProgress(roundtableId: string) {
    const [totalParticipants, votedParticipants] = await Promise.all([
      prisma.participant.count({
        where: { roundtableId, status: { not: 'DROPPED_OUT' } }
      }),
      prisma.participant.count({
        where: {
          roundtableId,
          topicVotes: { some: {} }
        }
      })
    ])

    const pendingParticipants = await prisma.participant.findMany({
      where: {
        roundtableId,
        status: { not: 'DROPPED_OUT' },
        topicVotes: { none: {} }
      },
      select: { name: true, email: true }
    })

    return {
      totalParticipants,
      votedParticipants,
      pendingParticipants,
      progress: totalParticipants > 0 ? Math.round((votedParticipants / totalParticipants) * 100) : 0,
      canFinalize: votedParticipants >= Math.ceil(totalParticipants * 0.8)
    }
  }

  async sendVotingReminders(roundtableId: string) {
    const pendingParticipants = await prisma.participant.findMany({
      where: {
        roundtableId,
        status: { not: 'DROPPED_OUT' },
        topicVotes: { none: {} }
      },
      include: {
        roundtable: {
          include: { client: true }
        }
      }
    })

    // Here you would integrate with your email service
    const reminders = pendingParticipants.map(participant => ({
      email: participant.email,
      name: participant.name,
      roundtableName: participant.roundtable.name,
      clientName: participant.roundtable.client.name,
      votingUrl: `/vote/${roundtableId}?email=${encodeURIComponent(participant.email)}`
    }))

    // Log reminders for now (replace with actual email sending)
    console.log(`Sending ${reminders.length} voting reminders for roundtable ${roundtableId}`)

    return {
      remindersSent: reminders.length,
      recipients: reminders.map(r => ({ email: r.email, name: r.name }))
    }
  }
}