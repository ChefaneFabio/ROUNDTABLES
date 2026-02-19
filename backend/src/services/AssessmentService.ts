import { prisma } from '../config/database'
import { AssessmentStatus, AssessmentType } from '@prisma/client'
import { englishQuestions } from './questionBanks/englishQuestions'
import { italianQuestions } from './questionBanks/italianQuestions'
import { englishSupplementary } from './questionBanks/englishSupplementary'
import { italianSupplementary } from './questionBanks/italianSupplementary'

const allEnglishQuestions = [...englishQuestions, ...englishSupplementary]
const allItalianQuestions = [...italianQuestions, ...italianSupplementary]

interface CreateAssessmentInput {
  studentId: string
  language: string
  type?: AssessmentType
  questionsLimit?: number
}

interface AssignAssessmentInput {
  studentIds: string[]
  language: string
  type?: AssessmentType
  timeLimitMin?: number
  questionsLimit?: number
  assignedById: string
}

interface ViolationRecord {
  type: string
  timestamp: string
  details?: string
}

interface SubmitAnswerInput {
  assessmentId: string
  questionId: string
  answer: string
}

interface AnswerRecord {
  questionId: string
  answer: string
  isCorrect: boolean
  cefrLevel: string
  points: number
}

const CEFR_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']

// Points weight by level for scoring
const LEVEL_WEIGHTS: Record<string, number> = {
  A1: 1, A2: 1, B1: 2, B2: 2, C1: 3, C2: 3
}

const LEVEL_NAMES: Record<string, string> = {
  A1: 'Beginner', A2: 'Elementary', B1: 'Intermediate',
  B2: 'Upper Intermediate', C1: 'Advanced', C2: 'Proficiency'
}

export class AssessmentService {
  // Create a new assessment
  async createAssessment(input: CreateAssessmentInput) {
    const { studentId, language, type = 'PLACEMENT', questionsLimit = 40 } = input

    const student = await prisma.student.findUnique({
      where: { id: studentId }
    })

    if (!student) {
      throw new Error('Student not found')
    }

    // Check for existing in-progress assessment
    const existingAssessment = await prisma.assessment.findFirst({
      where: {
        studentId,
        language,
        type,
        status: 'IN_PROGRESS'
      }
    })

    if (existingAssessment) {
      return existingAssessment
    }

    const assessment = await prisma.assessment.create({
      data: {
        studentId,
        language,
        type,
        status: 'IN_PROGRESS',
        answers: [],
        targetLevel: 'B1',
        questionsLimit,
        startedAt: new Date()
      }
    })

    return assessment
  }

  // Get assessment by ID
  async getAssessment(assessmentId: string) {
    const assessment = await prisma.assessment.findUnique({
      where: { id: assessmentId },
      include: {
        student: {
          include: {
            user: { select: { name: true, email: true } }
          }
        }
      }
    })

    if (!assessment) {
      throw new Error('Assessment not found')
    }

    return assessment
  }

  // Get student's assessments
  async getStudentAssessments(studentId: string) {
    return prisma.assessment.findMany({
      where: { studentId },
      orderBy: { startedAt: 'desc' }
    })
  }

  // Get next question — adaptive algorithm using persisted targetLevel
  async getNextQuestion(assessmentId: string) {
    const assessment = await prisma.assessment.findUnique({
      where: { id: assessmentId }
    })

    if (!assessment) {
      throw new Error('Assessment not found')
    }

    if (assessment.status !== 'IN_PROGRESS') {
      throw new Error('Assessment is not in progress')
    }

    // Check if timed test has expired
    if (assessment.expiresAt && new Date() > assessment.expiresAt) {
      await this.completeAssessment(assessmentId)
      return { isComplete: true, expired: true, totalAnswered: ((assessment.answers as unknown as AnswerRecord[]) || []).length }
    }

    const answers = (assessment.answers as unknown as AnswerRecord[]) || []
    const answeredIds = answers.map(a => a.questionId)

    // Auto-complete when question limit reached
    if (answers.length >= assessment.questionsLimit) {
      return {
        isComplete: true,
        totalAnswered: answers.length
      }
    }

    // Read persisted target level (not hardcoded!)
    let targetLevel = assessment.targetLevel || 'B1'

    // Adjust level based on last 3 answers
    if (answers.length >= 3) {
      const recentAnswers = answers.slice(-3)
      const correctCount = recentAnswers.filter(a => a.isCorrect).length
      const currentLevelIndex = CEFR_LEVELS.indexOf(targetLevel)

      if (correctCount >= 2 && currentLevelIndex < CEFR_LEVELS.length - 1) {
        targetLevel = CEFR_LEVELS[currentLevelIndex + 1]
      } else if (correctCount === 0 && currentLevelIndex > 0) {
        targetLevel = CEFR_LEVELS[currentLevelIndex - 1]
      }
      // 1 correct → stay at current level

      // Persist updated targetLevel
      if (targetLevel !== assessment.targetLevel) {
        await prisma.assessment.update({
          where: { id: assessmentId },
          data: { targetLevel }
        })
      }
    }

    // Get a question from the target level that hasn't been answered
    let question = await prisma.assessmentQuestion.findFirst({
      where: {
        language: assessment.language,
        cefrLevel: targetLevel,
        isActive: true,
        id: { notIn: answeredIds }
      },
      orderBy: { orderIndex: 'asc' }
    })

    // If no questions at target level, try adjacent levels
    if (!question) {
      question = await prisma.assessmentQuestion.findFirst({
        where: {
          language: assessment.language,
          isActive: true,
          id: { notIn: answeredIds }
        },
        orderBy: { orderIndex: 'asc' }
      })
    }

    if (!question) {
      return {
        isComplete: true,
        totalAnswered: answers.length
      }
    }

    // Return question without the correct answer
    const { correctAnswer, ...safeQuestion } = question
    return {
      isComplete: false,
      question: safeQuestion,
      progress: {
        answered: answers.length,
        total: assessment.questionsLimit,
        currentLevel: targetLevel
      }
    }
  }

  // Submit an answer
  async submitAnswer(input: SubmitAnswerInput) {
    const { assessmentId, questionId, answer } = input

    const assessment = await prisma.assessment.findUnique({
      where: { id: assessmentId }
    })

    if (!assessment) {
      throw new Error('Assessment not found')
    }

    if (assessment.status !== 'IN_PROGRESS') {
      throw new Error('Assessment is not in progress')
    }

    // Check if timed test has expired
    if (assessment.expiresAt && new Date() > assessment.expiresAt) {
      await this.completeAssessment(assessmentId)
      return { isCorrect: false, correctAnswer: '', points: 0, shouldAutoComplete: true, expired: true }
    }

    const question = await prisma.assessmentQuestion.findUnique({
      where: { id: questionId }
    })

    if (!question) {
      throw new Error('Question not found')
    }

    const answers = (assessment.answers as unknown as AnswerRecord[]) || []
    if (answers.some(a => a.questionId === questionId)) {
      throw new Error('Question already answered')
    }

    const isCorrect = answer.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim()

    const newAnswer: AnswerRecord = {
      questionId,
      answer,
      isCorrect,
      cefrLevel: question.cefrLevel,
      points: isCorrect ? question.points : 0
    }

    const updatedAnswers = [...answers, newAnswer]

    await prisma.assessment.update({
      where: { id: assessmentId },
      data: { answers: updatedAnswers as unknown as any }
    })

    // Check if we should auto-complete
    const shouldAutoComplete = updatedAnswers.length >= assessment.questionsLimit

    return {
      isCorrect,
      correctAnswer: question.correctAnswer,
      points: newAnswer.points,
      shouldAutoComplete
    }
  }

  // Complete assessment with weighted CEFR scoring
  async completeAssessment(assessmentId: string) {
    const assessment = await prisma.assessment.findUnique({
      where: { id: assessmentId }
    })

    if (!assessment) {
      throw new Error('Assessment not found')
    }

    if (assessment.status !== 'IN_PROGRESS') {
      throw new Error('Assessment is not in progress')
    }

    const answers = (assessment.answers as unknown as AnswerRecord[]) || []

    // Calculate weighted score
    let totalWeightedPoints = 0
    let maxWeightedPoints = 0

    const levelScores: Record<string, { correct: number; total: number; weightedCorrect: number; weightedTotal: number }> = {}

    for (const answer of answers) {
      const weight = LEVEL_WEIGHTS[answer.cefrLevel] || 1

      if (!levelScores[answer.cefrLevel]) {
        levelScores[answer.cefrLevel] = { correct: 0, total: 0, weightedCorrect: 0, weightedTotal: 0 }
      }
      levelScores[answer.cefrLevel].total++
      levelScores[answer.cefrLevel].weightedTotal += weight

      if (answer.isCorrect) {
        levelScores[answer.cefrLevel].correct++
        levelScores[answer.cefrLevel].weightedCorrect += weight
        totalWeightedPoints += weight
      }
      maxWeightedPoints += weight
    }

    const percentageScore = maxWeightedPoints > 0
      ? Math.round((totalWeightedPoints / maxWeightedPoints) * 100)
      : 0

    // Determine CEFR level: highest level with ≥60% accuracy (skip levels with 0 questions)
    let determinedLevel = 'A1'
    for (const level of CEFR_LEVELS) {
      const levelScore = levelScores[level]
      if (levelScore && levelScore.total > 0) {
        const accuracy = levelScore.correct / levelScore.total
        if (accuracy >= 0.6) {
          determinedLevel = level
        } else {
          break
        }
      }
      // If level has 0 questions (adaptive skipped it), continue checking
    }

    const completed = await prisma.assessment.update({
      where: { id: assessmentId },
      data: {
        status: 'COMPLETED',
        score: percentageScore,
        cefrLevel: determinedLevel,
        completedAt: new Date()
      },
      include: {
        student: {
          include: {
            user: { select: { name: true, email: true } }
          }
        }
      }
    })

    // Update student's language level
    await prisma.student.update({
      where: { id: assessment.studentId },
      data: { languageLevel: determinedLevel as any }
    })

    // Build breakdown with level names
    const levelBreakdown: Record<string, { correct: number; total: number; name: string }> = {}
    for (const level of CEFR_LEVELS) {
      if (levelScores[level]) {
        levelBreakdown[level] = {
          correct: levelScores[level].correct,
          total: levelScores[level].total,
          name: LEVEL_NAMES[level]
        }
      }
    }

    return {
      assessment: completed,
      result: {
        score: percentageScore,
        cefrLevel: determinedLevel,
        cefrName: LEVEL_NAMES[determinedLevel],
        totalQuestions: answers.length,
        correctAnswers: answers.filter(a => a.isCorrect).length,
        levelBreakdown
      }
    }
  }

  // Get detailed results with full question data (for review by student or admin)
  async getDetailedResults(assessmentId: string) {
    const assessment = await prisma.assessment.findUnique({
      where: { id: assessmentId },
      include: {
        student: {
          include: {
            user: { select: { name: true, email: true } }
          }
        }
      }
    })

    if (!assessment) throw new Error('Assessment not found')
    if (assessment.status !== 'COMPLETED') throw new Error('Assessment not yet completed')

    const answers = (assessment.answers as unknown as AnswerRecord[]) || []
    const questionIds = answers.map(a => a.questionId)

    // Fetch all question details in one query
    const questions = await prisma.assessmentQuestion.findMany({
      where: { id: { in: questionIds } }
    })

    const questionMap = new Map(questions.map(q => [q.id, q]))

    // Build detailed answer list
    const detailedAnswers = answers.map(a => {
      const q = questionMap.get(a.questionId)
      return {
        questionId: a.questionId,
        questionText: q?.questionText || 'Question not found',
        questionType: q?.questionType || 'UNKNOWN',
        cefrLevel: a.cefrLevel,
        options: q?.options || null,
        passage: q?.passage || null,
        passageTitle: q?.passageTitle || null,
        studentAnswer: a.answer,
        correctAnswer: q?.correctAnswer || '',
        isCorrect: a.isCorrect,
        points: a.points
      }
    })

    // Build level breakdown
    const levelBreakdown: Record<string, { correct: number; total: number; name: string }> = {}
    for (const a of answers) {
      if (!levelBreakdown[a.cefrLevel]) {
        levelBreakdown[a.cefrLevel] = { correct: 0, total: 0, name: LEVEL_NAMES[a.cefrLevel] || '' }
      }
      levelBreakdown[a.cefrLevel].total++
      if (a.isCorrect) levelBreakdown[a.cefrLevel].correct++
    }

    return {
      assessment: {
        id: assessment.id,
        language: assessment.language,
        type: assessment.type,
        score: assessment.score,
        cefrLevel: assessment.cefrLevel,
        cefrName: LEVEL_NAMES[assessment.cefrLevel || 'A1'] || '',
        startedAt: assessment.startedAt,
        completedAt: assessment.completedAt,
        totalQuestions: answers.length,
        correctAnswers: answers.filter(a => a.isCorrect).length
      },
      student: {
        id: assessment.student.id,
        name: assessment.student.user.name,
        email: assessment.student.user.email
      },
      levelBreakdown,
      answers: detailedAnswers
    }
  }

  // Get assessments for a specific student (admin use)
  async getStudentAssessmentsAdmin(studentId: string) {
    return prisma.assessment.findMany({
      where: { studentId },
      include: {
        student: {
          include: {
            user: { select: { name: true, email: true } }
          }
        }
      },
      orderBy: { startedAt: 'desc' }
    })
  }

  // Get all questions (admin)
  async getAllQuestions(language?: string, cefrLevel?: string) {
    const where: any = { isActive: true }
    if (language) where.language = language
    if (cefrLevel) where.cefrLevel = cefrLevel

    return prisma.assessmentQuestion.findMany({
      where,
      orderBy: [{ language: 'asc' }, { cefrLevel: 'asc' }, { orderIndex: 'asc' }]
    })
  }

  // Create a question (admin)
  async createQuestion(data: {
    language: string
    cefrLevel: string
    questionType: string
    questionText: string
    options?: any
    correctAnswer: string
    passage?: string
    passageTitle?: string
    audioUrl?: string
    imageUrl?: string
    points?: number
    orderIndex?: number
  }) {
    return prisma.assessmentQuestion.create({
      data: {
        ...data,
        questionType: data.questionType as any,
        points: data.points || 1,
        orderIndex: data.orderIndex || 0
      }
    })
  }

  // Assign assessment to students (admin)
  async assignAssessment(input: AssignAssessmentInput) {
    const { studentIds, language, type = 'PLACEMENT', timeLimitMin = 60, questionsLimit = 40, assignedById } = input

    const results: Array<{ studentId: string; skipped?: boolean; reason?: string; assessmentId?: string; assigned?: boolean }> = []
    for (const studentId of studentIds) {
      // Check if student already has an active (ASSIGNED or IN_PROGRESS) test for same language
      const existing = await prisma.assessment.findFirst({
        where: {
          studentId,
          language,
          status: { in: ['ASSIGNED', 'IN_PROGRESS'] }
        }
      })

      if (existing) {
        results.push({ studentId, skipped: true, reason: 'Active assessment exists' })
        continue
      }

      const student = await prisma.student.findUnique({
        where: { id: studentId },
        include: { user: { select: { id: true, name: true } } }
      })

      if (!student) {
        results.push({ studentId, skipped: true, reason: 'Student not found' })
        continue
      }

      const assessment = await prisma.assessment.create({
        data: {
          studentId,
          language,
          type,
          status: 'ASSIGNED',
          answers: [],
          targetLevel: 'B1',
          questionsLimit,
          assignedById,
          assignedAt: new Date(),
          timeLimitMin
        }
      })

      // Create notification for the student
      await prisma.notification.create({
        data: {
          type: 'ASSESSMENT_ASSIGNED',
          subject: `New ${language} Placement Test Assigned`,
          content: `You have been assigned a ${language} placement test. You have ${timeLimitMin} minutes to complete it once started.`,
          status: 'SENT',
          sentAt: new Date(),
          userId: student.user.id,
          metadata: { assessmentId: assessment.id, language, timeLimitMin }
        }
      })

      results.push({ studentId, assessmentId: assessment.id, assigned: true })
    }

    return results
  }

  // Start an assigned assessment (student)
  async startAssignedAssessment(assessmentId: string, studentId: string) {
    const assessment = await prisma.assessment.findUnique({
      where: { id: assessmentId }
    })

    if (!assessment) throw new Error('Assessment not found')
    if (assessment.studentId !== studentId) throw new Error('Access denied')
    if (assessment.status !== 'ASSIGNED') throw new Error('Assessment is not in assigned state')

    const now = new Date()
    const expiresAt = assessment.timeLimitMin
      ? new Date(now.getTime() + assessment.timeLimitMin * 60 * 1000)
      : null

    const updated = await prisma.assessment.update({
      where: { id: assessmentId },
      data: {
        status: 'IN_PROGRESS',
        startedAt: now,
        expiresAt
      }
    })

    return updated
  }

  // Get assigned assessments for a student
  async getAssignedAssessments(studentId: string) {
    return prisma.assessment.findMany({
      where: { studentId, status: 'ASSIGNED' },
      orderBy: { assignedAt: 'desc' }
    })
  }

  // Record a violation
  async recordViolation(assessmentId: string, studentId: string, violation: ViolationRecord) {
    const assessment = await prisma.assessment.findUnique({
      where: { id: assessmentId }
    })

    if (!assessment) throw new Error('Assessment not found')
    if (assessment.studentId !== studentId) throw new Error('Access denied')
    if (assessment.status !== 'IN_PROGRESS') return // silently ignore if not in progress

    const violations = (assessment.violations as unknown as ViolationRecord[]) || []
    violations.push(violation)

    await prisma.assessment.update({
      where: { id: assessmentId },
      data: { violations: violations as unknown as any }
    })
  }

  // Seed English questions (~150)
  async seedEnglishQuestions() {
    const existingCount = await prisma.assessmentQuestion.count({
      where: { language: 'English' }
    })

    if (existingCount > 0) {
      return { message: 'English questions already exist', count: existingCount }
    }

    await prisma.assessmentQuestion.createMany({
      data: allEnglishQuestions.map(q => ({
        ...q,
        questionType: q.questionType as any
      }))
    })

    return { message: 'English questions seeded successfully', count: allEnglishQuestions.length }
  }

  // Seed Italian questions (~150)
  async seedItalianQuestions() {
    const existingCount = await prisma.assessmentQuestion.count({
      where: { language: 'Italian' }
    })

    if (existingCount > 0) {
      return { message: 'Italian questions already exist', count: existingCount }
    }

    await prisma.assessmentQuestion.createMany({
      data: allItalianQuestions.map(q => ({
        ...q,
        questionType: q.questionType as any
      }))
    })

    return { message: 'Italian questions seeded successfully', count: allItalianQuestions.length }
  }

  // Seed all question banks
  async seedAllQuestions() {
    const englishResult = await this.seedEnglishQuestions()
    const italianResult = await this.seedItalianQuestions()

    return {
      english: englishResult,
      italian: italianResult,
      totalCount: allEnglishQuestions.length + allItalianQuestions.length
    }
  }
}

export const assessmentService = new AssessmentService()
