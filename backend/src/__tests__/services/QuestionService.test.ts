import { QuestionService } from '../../services/QuestionService'
import { RoundtableService } from '../../services/RoundtableService'
import { prisma } from '../setup'

describe('QuestionService', () => {
  let questionService: QuestionService
  let roundtableService: RoundtableService
  let testSessionId: string
  let testTrainerId: string

  beforeAll(async () => {
    questionService = new QuestionService()
    roundtableService = new RoundtableService()

    // Create test data
    const client = await prisma.client.create({
      data: {
        name: 'Test Client',
        email: 'test@example.com',
        company: 'Test Company'
      }
    })

    const trainer = await prisma.trainer.create({
      data: {
        name: 'Test Trainer',
        email: 'trainer@example.com',
        expertise: ['Leadership']
      }
    })
    testTrainerId = trainer.id

    const roundtable = await roundtableService.createRoundtable({
      name: 'Test Roundtable',
      clientId: client.id,
      maxParticipants: 6,
      topics: [{ title: 'Test Topic', description: 'Test Description' }]
    })

    // Get first session
    const sessions = await prisma.session.findMany({
      where: { roundtableId: roundtable.id }
    })
    testSessionId = sessions[0].id

    // Assign trainer to session
    await prisma.session.update({
      where: { id: testSessionId },
      data: { trainerId: testTrainerId }
    })
  })

  afterEach(async () => {
    // Clean up questions between tests
    await prisma.question.deleteMany({
      where: { sessionId: testSessionId }
    })
  })

  describe('submitQuestionsForSession', () => {
    it('should submit 3 questions successfully', async () => {
      const questions = [
        'What is effective leadership?',
        'How do you motivate a team?',
        'What are the key communication skills?'
      ]

      const result = await questionService.submitQuestionsForSession({
        questions,
        trainerId: testTrainerId,
        sessionId: testSessionId
      })

      expect(result.questionsSubmitted).toBe(3)
      expect(result.questions).toHaveLength(3)

      // Verify questions were created in database
      const dbQuestions = await prisma.question.findMany({
        where: { sessionId: testSessionId }
      })
      expect(dbQuestions).toHaveLength(3)
      expect(dbQuestions[0].status).toBe('PENDING')
    })

    it('should replace existing questions', async () => {
      // Submit first set of questions
      const firstQuestions = [
        'Question 1',
        'Question 2', 
        'Question 3'
      ]
      await questionService.submitQuestionsForSession({
        questions: firstQuestions,
        trainerId: testTrainerId,
        sessionId: testSessionId
      })

      // Submit new set of questions
      const newQuestions = [
        'New Question 1',
        'New Question 2',
        'New Question 3'
      ]
      const result = await questionService.submitQuestionsForSession({
        questions: newQuestions,
        trainerId: testTrainerId,
        sessionId: testSessionId
      })

      expect(result.questionsSubmitted).toBe(3)

      // Verify only new questions exist
      const dbQuestions = await prisma.question.findMany({
        where: { sessionId: testSessionId }
      })
      expect(dbQuestions).toHaveLength(3)
      expect(dbQuestions.map(q => q.question)).toEqual(newQuestions)
    })

    it('should reject wrong number of questions', async () => {
      const questions = ['Only one question', 'Only two questions']

      await expect(questionService.submitQuestionsForSession({
        questions,
        trainerId: testTrainerId,
        sessionId: testSessionId
      })).rejects.toThrow('Exactly 3 questions are required per session')
    })

    it('should reject if trainer not assigned to session', async () => {
      const wrongTrainer = await prisma.trainer.create({
        data: {
          name: 'Wrong Trainer',
          email: 'wrong@example.com',
          expertise: ['Wrong']
        }
      })

      const questions = ['Q1', 'Q2', 'Q3']

      await expect(questionService.submitQuestionsForSession({
        questions,
        trainerId: wrongTrainer.id,
        sessionId: testSessionId
      })).rejects.toThrow('You are not assigned to this session')
    })
  })

  describe('reviewQuestions', () => {
    beforeEach(async () => {
      // Create test questions
      await prisma.question.createMany({
        data: [
          { question: 'Test question 1', sessionId: testSessionId },
          { question: 'Test question 2', sessionId: testSessionId },
          { question: 'Test question 3', sessionId: testSessionId }
        ]
      })
    })

    it('should approve questions successfully', async () => {
      const questions = await prisma.question.findMany({
        where: { sessionId: testSessionId }
      })

      const reviews = questions.map(q => ({
        questionId: q.id,
        status: 'APPROVED' as const,
        reviewNotes: 'Good question'
      }))

      const results = await questionService.reviewQuestions(reviews, 'reviewer-id')

      expect(results).toHaveLength(3)
      results.forEach(result => {
        expect(result.status).toBe('APPROVED')
        expect(result.reviewNotes).toBe('Good question')
      })

      // Check session status updated
      const session = await prisma.session.findUnique({
        where: { id: testSessionId }
      })
      expect(session?.status).toBe('QUESTIONS_READY')
    })

    it('should mark questions as needing revision', async () => {
      const questions = await prisma.question.findMany({
        where: { sessionId: testSessionId }
      })

      const reviews = [{
        questionId: questions[0].id,
        status: 'NEEDS_REVISION' as const,
        reviewNotes: 'Please be more specific'
      }]

      await questionService.reviewQuestions(reviews, 'reviewer-id')

      const updatedQuestion = await prisma.question.findUnique({
        where: { id: questions[0].id }
      })
      expect(updatedQuestion?.status).toBe('NEEDS_REVISION')
      expect(updatedQuestion?.reviewNotes).toBe('Please be more specific')
    })
  })

  describe('getQuestionsForSession', () => {
    it('should return session questions with metadata', async () => {
      // Create test questions
      await prisma.question.createMany({
        data: [
          { question: 'Test question 1', sessionId: testSessionId, status: 'APPROVED' },
          { question: 'Test question 2', sessionId: testSessionId, status: 'PENDING' }
        ]
      })

      const result = await questionService.getQuestionsForSession(testSessionId)

      expect(result.session.id).toBe(testSessionId)
      expect(result.questions).toHaveLength(2)
      expect(result.reviewStatus.total).toBe(2)
      expect(result.reviewStatus.approved).toBe(1)
      expect(result.reviewStatus.pending).toBe(1)
    })
  })

  describe('getPendingQuestions', () => {
    it('should return sessions with pending questions', async () => {
      // Create pending questions
      await prisma.question.create({
        data: {
          question: 'Pending question',
          sessionId: testSessionId,
          status: 'PENDING'
        }
      })

      const pendingSessions = await questionService.getPendingQuestions()

      expect(pendingSessions).toHaveLength(1)
      expect(pendingSessions[0].session.id).toBe(testSessionId)
      expect(pendingSessions[0].pendingQuestions).toBe(1)
    })
  })

  describe('getQuestionsDashboard', () => {
    it('should return dashboard statistics', async () => {
      // Create test questions with different statuses
      await prisma.question.createMany({
        data: [
          { question: 'Pending', sessionId: testSessionId, status: 'PENDING' },
          { question: 'Needs revision', sessionId: testSessionId, status: 'NEEDS_REVISION' },
          { question: 'Approved', sessionId: testSessionId, status: 'APPROVED' }
        ]
      })

      const dashboard = await questionService.getQuestionsDashboard()

      expect(dashboard).toHaveProperty('pendingSessions')
      expect(dashboard).toHaveProperty('questionsNeedingRevision')
      expect(dashboard).toHaveProperty('totalQuestions')
      expect(typeof dashboard.pendingSessions).toBe('number')
      expect(dashboard.totalQuestions).toBeGreaterThan(0)
    })
  })
})