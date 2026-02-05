import { prisma } from '../config/database'
import { AssessmentStatus, AssessmentType } from '@prisma/client'

interface CreateAssessmentInput {
  studentId: string
  language: string
  type?: AssessmentType
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

// CEFR level point ranges for placement test
const CEFR_THRESHOLDS = {
  A1: { min: 0, max: 15 },
  A2: { min: 16, max: 30 },
  B1: { min: 31, max: 45 },
  B2: { min: 46, max: 60 },
  C1: { min: 61, max: 75 },
  C2: { min: 76, max: 100 }
}

const CEFR_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']

export class AssessmentService {
  // Create a new assessment
  async createAssessment(input: CreateAssessmentInput) {
    const { studentId, language, type = 'PLACEMENT' } = input

    // Verify student exists
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

    // Create new assessment
    const assessment = await prisma.assessment.create({
      data: {
        studentId,
        language,
        type,
        status: 'IN_PROGRESS',
        answers: []
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

  // Get questions for assessment (adaptive based on current progress)
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

    const answers = (assessment.answers as unknown as AnswerRecord[]) || []
    const answeredIds = answers.map(a => a.questionId)

    // Determine which CEFR level to pull from based on current performance
    let targetLevel = 'B1' // Start at B1 by default

    if (answers.length > 0) {
      const recentAnswers = answers.slice(-3)
      const correctCount = recentAnswers.filter(a => a.isCorrect).length

      const currentLevelIndex = CEFR_LEVELS.indexOf(targetLevel)

      // Adjust difficulty based on recent performance
      if (correctCount >= 2 && currentLevelIndex < CEFR_LEVELS.length - 1) {
        targetLevel = CEFR_LEVELS[currentLevelIndex + 1]
      } else if (correctCount <= 1 && currentLevelIndex > 0) {
        targetLevel = CEFR_LEVELS[currentLevelIndex - 1]
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
      // No more questions - complete the assessment
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

    const question = await prisma.assessmentQuestion.findUnique({
      where: { id: questionId }
    })

    if (!question) {
      throw new Error('Question not found')
    }

    // Check if already answered
    const answers = (assessment.answers as unknown as AnswerRecord[]) || []
    if (answers.some(a => a.questionId === questionId)) {
      throw new Error('Question already answered')
    }

    // Check answer
    const isCorrect = answer.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim()

    const newAnswer: AnswerRecord = {
      questionId,
      answer,
      isCorrect,
      cefrLevel: question.cefrLevel,
      points: isCorrect ? question.points : 0
    }

    // Update assessment
    const updatedAnswers = [...answers, newAnswer]

    await prisma.assessment.update({
      where: { id: assessmentId },
      data: { answers: updatedAnswers as unknown as any }
    })

    return {
      isCorrect,
      correctAnswer: question.correctAnswer,
      points: newAnswer.points
    }
  }

  // Complete assessment and calculate CEFR level
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

    // Calculate total score
    const totalPoints = answers.reduce((sum, a) => sum + a.points, 0)
    const maxPossiblePoints = answers.length * 1 // Assuming 1 point per question

    // Calculate percentage score (scale to 100)
    const percentageScore = maxPossiblePoints > 0
      ? Math.round((totalPoints / maxPossiblePoints) * 100)
      : 0

    // Determine CEFR level based on performance at each level
    const levelScores: Record<string, { correct: number; total: number }> = {}

    for (const answer of answers) {
      if (!levelScores[answer.cefrLevel]) {
        levelScores[answer.cefrLevel] = { correct: 0, total: 0 }
      }
      levelScores[answer.cefrLevel].total++
      if (answer.isCorrect) {
        levelScores[answer.cefrLevel].correct++
      }
    }

    // Determine highest level where student got at least 60% correct
    let determinedLevel = 'A1'
    for (const level of CEFR_LEVELS) {
      const levelScore = levelScores[level]
      if (levelScore && levelScore.total > 0) {
        const accuracy = levelScore.correct / levelScore.total
        if (accuracy >= 0.6) {
          determinedLevel = level
        } else {
          break // Stop at first level where they didn't pass
        }
      }
    }

    // Update assessment
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

    return {
      assessment: completed,
      result: {
        score: percentageScore,
        cefrLevel: determinedLevel,
        totalQuestions: answers.length,
        correctAnswers: answers.filter(a => a.isCorrect).length,
        levelBreakdown: levelScores
      }
    }
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

  // Seed sample questions for English
  async seedEnglishQuestions() {
    const existingCount = await prisma.assessmentQuestion.count({
      where: { language: 'English' }
    })

    if (existingCount > 0) {
      return { message: 'Questions already exist', count: existingCount }
    }

    const questions = [
      // A1 Level
      { language: 'English', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', questionText: 'What ___ your name?', options: [{ label: 'is', value: 'is' }, { label: 'are', value: 'are' }, { label: 'am', value: 'am' }, { label: 'be', value: 'be' }], correctAnswer: 'is', orderIndex: 1 },
      { language: 'English', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', questionText: 'She ___ a student.', options: [{ label: 'is', value: 'is' }, { label: 'are', value: 'are' }, { label: 'am', value: 'am' }, { label: 'be', value: 'be' }], correctAnswer: 'is', orderIndex: 2 },
      { language: 'English', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', questionText: 'I ___ from Italy.', options: [{ label: 'am', value: 'am' }, { label: 'is', value: 'is' }, { label: 'are', value: 'are' }, { label: 'be', value: 'be' }], correctAnswer: 'am', orderIndex: 3 },
      { language: 'English', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', questionText: 'They ___ my friends.', options: [{ label: 'are', value: 'are' }, { label: 'is', value: 'is' }, { label: 'am', value: 'am' }, { label: 'be', value: 'be' }], correctAnswer: 'are', orderIndex: 4 },
      { language: 'English', cefrLevel: 'A1', questionType: 'FILL_BLANK', questionText: 'Hello! My name ___ Maria. (Write the correct word)', correctAnswer: 'is', orderIndex: 5 },
      { language: 'English', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', questionText: '___ you like coffee?', options: [{ label: 'Do', value: 'Do' }, { label: 'Does', value: 'Does' }, { label: 'Is', value: 'Is' }, { label: 'Are', value: 'Are' }], correctAnswer: 'Do', orderIndex: 6 },
      { language: 'English', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', questionText: 'This is ___ book.', options: [{ label: 'a', value: 'a' }, { label: 'an', value: 'an' }, { label: 'the', value: 'the' }, { label: 'some', value: 'some' }], correctAnswer: 'a', orderIndex: 7 },
      { language: 'English', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', questionText: 'I have ___ apple.', options: [{ label: 'an', value: 'an' }, { label: 'a', value: 'a' }, { label: 'the', value: 'the' }, { label: 'some', value: 'some' }], correctAnswer: 'an', orderIndex: 8 },
      { language: 'English', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', questionText: 'How ___ are you?', options: [{ label: 'old', value: 'old' }, { label: 'many', value: 'many' }, { label: 'much', value: 'much' }, { label: 'big', value: 'big' }], correctAnswer: 'old', orderIndex: 9 },
      { language: 'English', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', questionText: 'Where ___ you live?', options: [{ label: 'do', value: 'do' }, { label: 'does', value: 'does' }, { label: 'is', value: 'is' }, { label: 'are', value: 'are' }], correctAnswer: 'do', orderIndex: 10 },

      // A2 Level
      { language: 'English', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', questionText: 'She ___ to work every day.', options: [{ label: 'goes', value: 'goes' }, { label: 'go', value: 'go' }, { label: 'going', value: 'going' }, { label: 'gone', value: 'gone' }], correctAnswer: 'goes', orderIndex: 1 },
      { language: 'English', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', questionText: 'I ___ watching TV right now.', options: [{ label: 'am', value: 'am' }, { label: 'is', value: 'is' }, { label: 'are', value: 'are' }, { label: 'be', value: 'be' }], correctAnswer: 'am', orderIndex: 2 },
      { language: 'English', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', questionText: 'Yesterday, I ___ to the cinema.', options: [{ label: 'went', value: 'went' }, { label: 'go', value: 'go' }, { label: 'goes', value: 'goes' }, { label: 'going', value: 'going' }], correctAnswer: 'went', orderIndex: 3 },
      { language: 'English', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', questionText: 'There are ___ books on the table.', options: [{ label: 'some', value: 'some' }, { label: 'a', value: 'a' }, { label: 'an', value: 'an' }, { label: 'much', value: 'much' }], correctAnswer: 'some', orderIndex: 4 },
      { language: 'English', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', questionText: 'He is ___ than his brother.', options: [{ label: 'taller', value: 'taller' }, { label: 'tall', value: 'tall' }, { label: 'tallest', value: 'tallest' }, { label: 'more tall', value: 'more tall' }], correctAnswer: 'taller', orderIndex: 5 },
      { language: 'English', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', questionText: 'I ___ never been to Paris.', options: [{ label: 'have', value: 'have' }, { label: 'has', value: 'has' }, { label: 'had', value: 'had' }, { label: 'having', value: 'having' }], correctAnswer: 'have', orderIndex: 6 },
      { language: 'English', cefrLevel: 'A2', questionType: 'FILL_BLANK', questionText: 'I usually ___ breakfast at 7 AM. (eat)', correctAnswer: 'eat', orderIndex: 7 },
      { language: 'English', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', questionText: 'Can you ___ me the time?', options: [{ label: 'tell', value: 'tell' }, { label: 'say', value: 'say' }, { label: 'speak', value: 'speak' }, { label: 'talk', value: 'talk' }], correctAnswer: 'tell', orderIndex: 8 },
      { language: 'English', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', questionText: 'I ___ like to order a coffee.', options: [{ label: 'would', value: 'would' }, { label: 'will', value: 'will' }, { label: 'shall', value: 'shall' }, { label: 'can', value: 'can' }], correctAnswer: 'would', orderIndex: 9 },
      { language: 'English', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', questionText: 'We need to buy ___ milk.', options: [{ label: 'some', value: 'some' }, { label: 'a', value: 'a' }, { label: 'an', value: 'an' }, { label: 'many', value: 'many' }], correctAnswer: 'some', orderIndex: 10 },

      // B1 Level
      { language: 'English', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', questionText: 'If I ___ more time, I would travel more.', options: [{ label: 'had', value: 'had' }, { label: 'have', value: 'have' }, { label: 'has', value: 'has' }, { label: 'having', value: 'having' }], correctAnswer: 'had', orderIndex: 1 },
      { language: 'English', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', questionText: 'By next year, I ___ graduated.', options: [{ label: 'will have', value: 'will have' }, { label: 'will', value: 'will' }, { label: 'have', value: 'have' }, { label: 'had', value: 'had' }], correctAnswer: 'will have', orderIndex: 2 },
      { language: 'English', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', questionText: 'The book ___ by millions of people.', options: [{ label: 'has been read', value: 'has been read' }, { label: 'has read', value: 'has read' }, { label: 'is reading', value: 'is reading' }, { label: 'reads', value: 'reads' }], correctAnswer: 'has been read', orderIndex: 3 },
      { language: 'English', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', questionText: 'She asked me where I ___.', options: [{ label: 'lived', value: 'lived' }, { label: 'live', value: 'live' }, { label: 'living', value: 'living' }, { label: 'lives', value: 'lives' }], correctAnswer: 'lived', orderIndex: 4 },
      { language: 'English', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', questionText: 'I wish I ___ speak Spanish fluently.', options: [{ label: 'could', value: 'could' }, { label: 'can', value: 'can' }, { label: 'will', value: 'will' }, { label: 'would', value: 'would' }], correctAnswer: 'could', orderIndex: 5 },
      { language: 'English', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', questionText: '___ having dinner, we went for a walk.', options: [{ label: 'After', value: 'After' }, { label: 'Before', value: 'Before' }, { label: 'While', value: 'While' }, { label: 'During', value: 'During' }], correctAnswer: 'After', orderIndex: 6 },
      { language: 'English', cefrLevel: 'B1', questionType: 'FILL_BLANK', questionText: 'I\'ve been waiting for two hours. He should ___ arrived by now. (have)', correctAnswer: 'have', orderIndex: 7 },
      { language: 'English', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', questionText: 'The meeting ___ for two hours when I arrived.', options: [{ label: 'had been going on', value: 'had been going on' }, { label: 'has been going on', value: 'has been going on' }, { label: 'was going', value: 'was going' }, { label: 'went', value: 'went' }], correctAnswer: 'had been going on', orderIndex: 8 },
      { language: 'English', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', questionText: 'You ___ better see a doctor about that cough.', options: [{ label: 'had', value: 'had' }, { label: 'have', value: 'have' }, { label: 'would', value: 'would' }, { label: 'should', value: 'should' }], correctAnswer: 'had', orderIndex: 9 },
      { language: 'English', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', questionText: 'He denied ___ the money.', options: [{ label: 'taking', value: 'taking' }, { label: 'to take', value: 'to take' }, { label: 'take', value: 'take' }, { label: 'took', value: 'took' }], correctAnswer: 'taking', orderIndex: 10 },

      // B2 Level
      { language: 'English', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', questionText: 'Had I known about the traffic, I ___ earlier.', options: [{ label: 'would have left', value: 'would have left' }, { label: 'will leave', value: 'will leave' }, { label: 'would leave', value: 'would leave' }, { label: 'had left', value: 'had left' }], correctAnswer: 'would have left', orderIndex: 1 },
      { language: 'English', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', questionText: 'The report ___ by the time you arrive.', options: [{ label: 'will have been completed', value: 'will have been completed' }, { label: 'will complete', value: 'will complete' }, { label: 'completes', value: 'completes' }, { label: 'completed', value: 'completed' }], correctAnswer: 'will have been completed', orderIndex: 2 },
      { language: 'English', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', questionText: 'Not until I arrived ___ the problem.', options: [{ label: 'did I realize', value: 'did I realize' }, { label: 'I realized', value: 'I realized' }, { label: 'I did realize', value: 'I did realize' }, { label: 'realize I', value: 'realize I' }], correctAnswer: 'did I realize', orderIndex: 3 },
      { language: 'English', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', questionText: 'The project is ___ completion.', options: [{ label: 'nearing', value: 'nearing' }, { label: 'near', value: 'near' }, { label: 'nearly', value: 'nearly' }, { label: 'nearest', value: 'nearest' }], correctAnswer: 'nearing', orderIndex: 4 },
      { language: 'English', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', questionText: '___ the circumstances, we had no choice.', options: [{ label: 'Given', value: 'Given' }, { label: 'Giving', value: 'Giving' }, { label: 'Gave', value: 'Gave' }, { label: 'Give', value: 'Give' }], correctAnswer: 'Given', orderIndex: 5 },
      { language: 'English', cefrLevel: 'B2', questionType: 'FILL_BLANK', questionText: 'The more you practice, the ___ you become. (good)', correctAnswer: 'better', orderIndex: 6 },
      { language: 'English', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', questionText: 'She insisted ___ paying for dinner.', options: [{ label: 'on', value: 'on' }, { label: 'in', value: 'in' }, { label: 'at', value: 'at' }, { label: 'for', value: 'for' }], correctAnswer: 'on', orderIndex: 7 },
      { language: 'English', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', questionText: 'Little ___ he know what was about to happen.', options: [{ label: 'did', value: 'did' }, { label: 'does', value: 'does' }, { label: 'was', value: 'was' }, { label: 'had', value: 'had' }], correctAnswer: 'did', orderIndex: 8 },
      { language: 'English', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', questionText: 'The situation calls ___ immediate action.', options: [{ label: 'for', value: 'for' }, { label: 'on', value: 'on' }, { label: 'up', value: 'up' }, { label: 'in', value: 'in' }], correctAnswer: 'for', orderIndex: 9 },
      { language: 'English', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', questionText: 'It\'s high time we ___ a decision.', options: [{ label: 'made', value: 'made' }, { label: 'make', value: 'make' }, { label: 'making', value: 'making' }, { label: 'to make', value: 'to make' }], correctAnswer: 'made', orderIndex: 10 },

      // C1 Level
      { language: 'English', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', questionText: 'Hardly ___ the office when the phone rang.', options: [{ label: 'had I entered', value: 'had I entered' }, { label: 'I had entered', value: 'I had entered' }, { label: 'did I enter', value: 'did I enter' }, { label: 'I entered', value: 'I entered' }], correctAnswer: 'had I entered', orderIndex: 1 },
      { language: 'English', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', questionText: 'The proposal was rejected, ___ was to be expected.', options: [{ label: 'which', value: 'which' }, { label: 'that', value: 'that' }, { label: 'what', value: 'what' }, { label: 'it', value: 'it' }], correctAnswer: 'which', orderIndex: 2 },
      { language: 'English', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', questionText: 'Under no circumstances ___ the building be left unlocked.', options: [{ label: 'should', value: 'should' }, { label: 'shall', value: 'shall' }, { label: 'would', value: 'would' }, { label: 'will', value: 'will' }], correctAnswer: 'should', orderIndex: 3 },
      { language: 'English', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', questionText: 'The decision, ___ controversial, was ultimately accepted.', options: [{ label: 'albeit', value: 'albeit' }, { label: 'although', value: 'although' }, { label: 'despite', value: 'despite' }, { label: 'however', value: 'however' }], correctAnswer: 'albeit', orderIndex: 4 },
      { language: 'English', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', questionText: 'So ___ was the damage that repairs took months.', options: [{ label: 'extensive', value: 'extensive' }, { label: 'extensively', value: 'extensively' }, { label: 'extend', value: 'extend' }, { label: 'extension', value: 'extension' }], correctAnswer: 'extensive', orderIndex: 5 },
      { language: 'English', cefrLevel: 'C1', questionType: 'FILL_BLANK', questionText: 'The company went ___ despite government subsidies. (bankrupt)', correctAnswer: 'bankrupt', orderIndex: 6 },
      { language: 'English', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', questionText: 'His argument, ___ persuasive, failed to convince the jury.', options: [{ label: 'however', value: 'however' }, { label: 'although', value: 'although' }, { label: 'despite', value: 'despite' }, { label: 'whereas', value: 'whereas' }], correctAnswer: 'however', orderIndex: 7 },
      { language: 'English', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', questionText: 'Not only ___ the test, but she also got the highest score.', options: [{ label: 'did she pass', value: 'did she pass' }, { label: 'she passed', value: 'she passed' }, { label: 'she did pass', value: 'she did pass' }, { label: 'passed she', value: 'passed she' }], correctAnswer: 'did she pass', orderIndex: 8 },
      { language: 'English', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', questionText: 'The findings are ___ with previous research.', options: [{ label: 'consistent', value: 'consistent' }, { label: 'consisting', value: 'consisting' }, { label: 'consisted', value: 'consisted' }, { label: 'consistency', value: 'consistency' }], correctAnswer: 'consistent', orderIndex: 9 },
      { language: 'English', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', questionText: '___ it not for your help, I would have failed.', options: [{ label: 'Were', value: 'Were' }, { label: 'Was', value: 'Was' }, { label: 'Had', value: 'Had' }, { label: 'If', value: 'If' }], correctAnswer: 'Were', orderIndex: 10 },

      // C2 Level
      { language: 'English', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', questionText: 'The CEO\'s speech was a ___ of platitudes.', options: [{ label: 'litany', value: 'litany' }, { label: 'literal', value: 'literal' }, { label: 'literature', value: 'literature' }, { label: 'literacy', value: 'literacy' }], correctAnswer: 'litany', orderIndex: 1 },
      { language: 'English', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', questionText: 'The politician\'s ___ remarks offended many.', options: [{ label: 'disparaging', value: 'disparaging' }, { label: 'disparate', value: 'disparate' }, { label: 'disparity', value: 'disparity' }, { label: 'dispatch', value: 'dispatch' }], correctAnswer: 'disparaging', orderIndex: 2 },
      { language: 'English', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', questionText: 'Her ___ knowledge of the subject impressed everyone.', options: [{ label: 'encyclopaedic', value: 'encyclopaedic' }, { label: 'epidemic', value: 'epidemic' }, { label: 'ephemeral', value: 'ephemeral' }, { label: 'equivocal', value: 'equivocal' }], correctAnswer: 'encyclopaedic', orderIndex: 3 },
      { language: 'English', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', questionText: 'The evidence was ___ at best.', options: [{ label: 'circumstantial', value: 'circumstantial' }, { label: 'circumstance', value: 'circumstance' }, { label: 'circumvent', value: 'circumvent' }, { label: 'circumference', value: 'circumference' }], correctAnswer: 'circumstantial', orderIndex: 4 },
      { language: 'English', cefrLevel: 'C2', questionType: 'FILL_BLANK', questionText: 'The judge\'s ruling set a legal ___. (precedent)', correctAnswer: 'precedent', orderIndex: 5 },
      { language: 'English', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', questionText: 'His ___ manner alienated potential allies.', options: [{ label: 'supercilious', value: 'supercilious' }, { label: 'superficial', value: 'superficial' }, { label: 'superfluous', value: 'superfluous' }, { label: 'supernatural', value: 'supernatural' }], correctAnswer: 'supercilious', orderIndex: 6 },
      { language: 'English', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', questionText: 'The treaty was ___ null and void.', options: [{ label: 'rendered', value: 'rendered' }, { label: 'rendering', value: 'rendering' }, { label: 'render', value: 'render' }, { label: 'rend', value: 'rend' }], correctAnswer: 'rendered', orderIndex: 7 },
      { language: 'English', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', questionText: 'The author\'s prose is characterized by its ___.', options: [{ label: 'lucidity', value: 'lucidity' }, { label: 'lucid', value: 'lucid' }, { label: 'ludicrous', value: 'ludicrous' }, { label: 'luminous', value: 'luminous' }], correctAnswer: 'lucidity', orderIndex: 8 },
      { language: 'English', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', questionText: 'The ___ of his argument was immediately apparent.', options: [{ label: 'fallacy', value: 'fallacy' }, { label: 'fallacious', value: 'fallacious' }, { label: 'fallen', value: 'fallen' }, { label: 'fallow', value: 'fallow' }], correctAnswer: 'fallacy', orderIndex: 9 },
      { language: 'English', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', questionText: 'She spoke with ___ authority on the matter.', options: [{ label: 'unimpeachable', value: 'unimpeachable' }, { label: 'impeach', value: 'impeach' }, { label: 'impeachment', value: 'impeachment' }, { label: 'impeachable', value: 'impeachable' }], correctAnswer: 'unimpeachable', orderIndex: 10 }
    ]

    await prisma.assessmentQuestion.createMany({
      data: questions.map(q => ({
        ...q,
        questionType: q.questionType as any,
        points: 1
      }))
    })

    return { message: 'Questions seeded successfully', count: questions.length }
  }
}

export const assessmentService = new AssessmentService()
