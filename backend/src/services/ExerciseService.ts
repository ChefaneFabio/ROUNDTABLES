import { prisma } from '../config/database'
import { Prisma, ExerciseType, ExerciseAttemptStatus } from '@prisma/client'

interface CreateExerciseInput {
  title: string
  description?: string
  type: ExerciseType
  language: string
  cefrLevel?: string
  instructions?: string
  timeLimit?: number
  passingScore?: number
  config?: Record<string, any>
  isPublished?: boolean
  createdById: string
  schoolId: string
  lessonId?: string
}

interface CreateItemInput {
  exerciseId: string
  orderIndex?: number
  questionText?: string
  content: Record<string, any>
  correctAnswer: Record<string, any>
  points?: number
  hint?: string
  explanation?: string
  audioUrl?: string
  imageUrl?: string
}

interface SubmitAnswerInput {
  attemptId: string
  itemId: string
  answer: any
}

// Grading functions for different exercise types
const gradeAnswer = (type: ExerciseType, correctAnswer: any, studentAnswer: any): { isCorrect: boolean; partialScore?: number } => {
  switch (type) {
    case 'MULTIPLE_CHOICE':
    case 'TRUE_FALSE':
      return { isCorrect: correctAnswer.value === studentAnswer }

    case 'FILL_BLANKS':
      // correctAnswer: { blanks: ['answer1', 'answer2'] }
      // studentAnswer: ['answer1', 'answer2']
      if (!Array.isArray(correctAnswer.blanks) || !Array.isArray(studentAnswer)) {
        return { isCorrect: false }
      }
      const blanksCorrect = correctAnswer.blanks.every((blank: string, i: number) =>
        blank.toLowerCase().trim() === (studentAnswer[i] || '').toLowerCase().trim()
      )
      if (!blanksCorrect) {
        // Calculate partial score
        const correctCount = correctAnswer.blanks.filter((blank: string, i: number) =>
          blank.toLowerCase().trim() === (studentAnswer[i] || '').toLowerCase().trim()
        ).length
        return {
          isCorrect: false,
          partialScore: correctCount / correctAnswer.blanks.length
        }
      }
      return { isCorrect: true }

    case 'MATCHING':
      // correctAnswer: { pairs: [{ left: 'a', right: '1' }, ...] }
      // studentAnswer: [{ left: 'a', right: '1' }, ...]
      if (!Array.isArray(correctAnswer.pairs) || !Array.isArray(studentAnswer)) {
        return { isCorrect: false }
      }
      const matchingCorrect = correctAnswer.pairs.every((pair: any) =>
        studentAnswer.some((sa: any) => sa.left === pair.left && sa.right === pair.right)
      )
      if (!matchingCorrect) {
        const correctCount = correctAnswer.pairs.filter((pair: any) =>
          studentAnswer.some((sa: any) => sa.left === pair.left && sa.right === pair.right)
        ).length
        return {
          isCorrect: false,
          partialScore: correctCount / correctAnswer.pairs.length
        }
      }
      return { isCorrect: true }

    case 'DRAG_DROP':
      // correctAnswer: { zones: { zone1: ['item1', 'item2'], zone2: ['item3'] } }
      // studentAnswer: { zone1: ['item1', 'item2'], zone2: ['item3'] }
      if (!correctAnswer.zones || !studentAnswer) {
        return { isCorrect: false }
      }
      const zones = Object.keys(correctAnswer.zones)
      let totalItems = 0
      let correctItems = 0
      for (const zone of zones) {
        const correctZoneItems = correctAnswer.zones[zone] || []
        const studentZoneItems = studentAnswer[zone] || []
        totalItems += correctZoneItems.length
        for (const item of correctZoneItems) {
          if (studentZoneItems.includes(item)) correctItems++
        }
      }
      if (correctItems === totalItems) {
        return { isCorrect: true }
      }
      return {
        isCorrect: false,
        partialScore: totalItems > 0 ? correctItems / totalItems : 0
      }

    case 'REORDER':
      // correctAnswer: { order: ['item1', 'item2', 'item3'] }
      // studentAnswer: ['item1', 'item2', 'item3']
      if (!Array.isArray(correctAnswer.order) || !Array.isArray(studentAnswer)) {
        return { isCorrect: false }
      }
      const orderCorrect = correctAnswer.order.every((item: string, i: number) =>
        item === studentAnswer[i]
      )
      if (!orderCorrect) {
        const correctCount = correctAnswer.order.filter((item: string, i: number) =>
          item === studentAnswer[i]
        ).length
        return {
          isCorrect: false,
          partialScore: correctCount / correctAnswer.order.length
        }
      }
      return { isCorrect: true }

    case 'LISTENING':
      // Similar to fill blanks or multiple choice depending on config
      if (correctAnswer.type === 'multiple_choice') {
        return { isCorrect: correctAnswer.value === studentAnswer }
      }
      // Transcription-style
      const transcriptMatch = correctAnswer.text?.toLowerCase().trim() ===
        (studentAnswer || '').toLowerCase().trim()
      return { isCorrect: transcriptMatch }

    default:
      return { isCorrect: false }
  }
}

export class ExerciseService {
  // ==================== Exercise CRUD ====================

  async createExercise(data: CreateExerciseInput) {
    return prisma.exercise.create({
      data: {
        title: data.title,
        description: data.description,
        type: data.type,
        language: data.language,
        cefrLevel: data.cefrLevel,
        instructions: data.instructions,
        timeLimit: data.timeLimit,
        passingScore: data.passingScore ?? 70,
        config: data.config ?? {},
        isPublished: data.isPublished ?? false,
        createdById: data.createdById,
        schoolId: data.schoolId,
        lessonId: data.lessonId
      },
      include: {
        items: { orderBy: { orderIndex: 'asc' } },
        createdBy: { select: { id: true, name: true } },
        _count: { select: { attempts: true } }
      }
    })
  }

  async getExercise(id: string, includeItems: boolean = true) {
    const exercise = await prisma.exercise.findUnique({
      where: { id },
      include: {
        items: includeItems ? { orderBy: { orderIndex: 'asc' } } : false,
        createdBy: { select: { id: true, name: true } },
        lesson: { select: { id: true, title: true } },
        school: { select: { id: true, name: true } },
        _count: { select: { attempts: true } }
      }
    })

    if (!exercise) {
      throw new Error('Exercise not found')
    }

    return exercise
  }

  async getExercises(
    schoolId: string,
    options: {
      type?: ExerciseType
      language?: string
      cefrLevel?: string
      lessonId?: string
      includeUnpublished?: boolean
      page?: number
      limit?: number
    } = {}
  ) {
    const { type, language, cefrLevel, lessonId, includeUnpublished, page = 1, limit = 20 } = options
    const skip = (page - 1) * limit

    const where: Prisma.ExerciseWhereInput = { schoolId }
    if (type) where.type = type
    if (language) where.language = language
    if (cefrLevel) where.cefrLevel = cefrLevel
    if (lessonId) where.lessonId = lessonId
    if (!includeUnpublished) where.isPublished = true

    const [exercises, total] = await Promise.all([
      prisma.exercise.findMany({
        where,
        include: {
          createdBy: { select: { id: true, name: true } },
          _count: { select: { items: true, attempts: true } }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit
      }),
      prisma.exercise.count({ where })
    ])

    return {
      exercises,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    }
  }

  async updateExercise(id: string, data: Partial<CreateExerciseInput>) {
    return prisma.exercise.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        type: data.type,
        language: data.language,
        cefrLevel: data.cefrLevel,
        instructions: data.instructions,
        timeLimit: data.timeLimit,
        passingScore: data.passingScore,
        config: data.config,
        isPublished: data.isPublished,
        lessonId: data.lessonId
      },
      include: {
        items: { orderBy: { orderIndex: 'asc' } },
        createdBy: { select: { id: true, name: true } },
        _count: { select: { attempts: true } }
      }
    })
  }

  async deleteExercise(id: string) {
    return prisma.exercise.delete({
      where: { id }
    })
  }

  // ==================== Exercise Items ====================

  async addItem(data: CreateItemInput) {
    // Get next order index if not provided
    if (data.orderIndex === undefined) {
      const maxOrder = await prisma.exerciseItem.aggregate({
        where: { exerciseId: data.exerciseId },
        _max: { orderIndex: true }
      })
      data.orderIndex = (maxOrder._max.orderIndex ?? -1) + 1
    }

    return prisma.exerciseItem.create({
      data: {
        exerciseId: data.exerciseId,
        orderIndex: data.orderIndex,
        questionText: data.questionText,
        content: data.content,
        correctAnswer: data.correctAnswer,
        points: data.points ?? 1,
        hint: data.hint,
        explanation: data.explanation,
        audioUrl: data.audioUrl,
        imageUrl: data.imageUrl
      }
    })
  }

  async updateItem(id: string, data: Partial<CreateItemInput>) {
    return prisma.exerciseItem.update({
      where: { id },
      data: {
        orderIndex: data.orderIndex,
        questionText: data.questionText,
        content: data.content,
        correctAnswer: data.correctAnswer,
        points: data.points,
        hint: data.hint,
        explanation: data.explanation,
        audioUrl: data.audioUrl,
        imageUrl: data.imageUrl
      }
    })
  }

  async deleteItem(id: string) {
    return prisma.exerciseItem.delete({
      where: { id }
    })
  }

  async reorderItems(exerciseId: string, itemIds: string[]) {
    const updates = itemIds.map((id, index) =>
      prisma.exerciseItem.update({
        where: { id },
        data: { orderIndex: index }
      })
    )
    return prisma.$transaction(updates)
  }

  // ==================== Student - Available Exercises ====================

  async getAvailableExercises(
    schoolId: string,
    studentId: string,
    options: {
      type?: ExerciseType
      language?: string
      cefrLevel?: string
      page?: number
      limit?: number
    } = {}
  ) {
    const { type, language, cefrLevel, page = 1, limit = 20 } = options
    const skip = (page - 1) * limit

    const where: Prisma.ExerciseWhereInput = {
      schoolId,
      isPublished: true
    }
    if (type) where.type = type
    if (language) where.language = language
    if (cefrLevel) where.cefrLevel = cefrLevel

    const [exercises, total] = await Promise.all([
      prisma.exercise.findMany({
        where,
        include: {
          _count: { select: { items: true } },
          attempts: {
            where: { studentId },
            select: {
              id: true,
              status: true,
              score: true,
              percentage: true,
              completedAt: true
            },
            orderBy: { startedAt: 'desc' },
            take: 1
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit
      }),
      prisma.exercise.count({ where })
    ])

    // Transform to include attempt info
    const exercisesWithAttempt = exercises.map(ex => ({
      ...ex,
      lastAttempt: ex.attempts[0] || null,
      attempts: undefined
    }))

    return {
      exercises: exercisesWithAttempt,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    }
  }

  // ==================== Student - Taking Exercises ====================

  async startAttempt(exerciseId: string, studentId: string) {
    // Check for existing in-progress attempt
    const existing = await prisma.exerciseAttempt.findFirst({
      where: {
        exerciseId,
        studentId,
        status: 'IN_PROGRESS'
      }
    })

    if (existing) {
      // Return existing attempt
      const exercise = await this.getExercise(exerciseId)
      return { attempt: existing, exercise }
    }

    // Get exercise with items
    const exercise = await prisma.exercise.findUnique({
      where: { id: exerciseId },
      include: {
        items: {
          orderBy: { orderIndex: 'asc' },
          select: {
            id: true,
            orderIndex: true,
            questionText: true,
            content: true,
            points: true,
            hint: true,
            audioUrl: true,
            imageUrl: true
            // Note: correctAnswer and explanation are NOT included
          }
        }
      }
    })

    if (!exercise) {
      throw new Error('Exercise not found')
    }

    if (!exercise.isPublished) {
      throw new Error('Exercise is not available')
    }

    // Calculate max score
    const maxScore = exercise.items.reduce((sum, item) => sum + item.points, 0)

    // Create attempt
    const attempt = await prisma.exerciseAttempt.create({
      data: {
        exerciseId,
        studentId,
        status: 'IN_PROGRESS',
        maxScore,
        answers: []
      }
    })

    return { attempt, exercise }
  }

  async submitAnswer(data: SubmitAnswerInput) {
    const attempt = await prisma.exerciseAttempt.findUnique({
      where: { id: data.attemptId },
      include: {
        exercise: {
          include: {
            items: true
          }
        }
      }
    })

    if (!attempt) {
      throw new Error('Attempt not found')
    }

    if (attempt.status !== 'IN_PROGRESS') {
      throw new Error('Attempt is not in progress')
    }

    // Find the item
    const item = attempt.exercise.items.find(i => i.id === data.itemId)
    if (!item) {
      throw new Error('Item not found')
    }

    // Grade the answer
    const gradeResult = gradeAnswer(
      attempt.exercise.type,
      item.correctAnswer,
      data.answer
    )

    const pointsEarned = gradeResult.isCorrect
      ? item.points
      : gradeResult.partialScore
        ? Math.round(item.points * gradeResult.partialScore)
        : 0

    // Update answers array
    const answers = (attempt.answers as any[] || []).filter(a => a.itemId !== data.itemId)
    answers.push({
      itemId: data.itemId,
      answer: data.answer,
      isCorrect: gradeResult.isCorrect,
      points: pointsEarned,
      submittedAt: new Date()
    })

    await prisma.exerciseAttempt.update({
      where: { id: data.attemptId },
      data: { answers }
    })

    return {
      isCorrect: gradeResult.isCorrect,
      points: pointsEarned,
      explanation: item.explanation,
      correctAnswer: item.correctAnswer
    }
  }

  async completeAttempt(attemptId: string) {
    const attempt = await prisma.exerciseAttempt.findUnique({
      where: { id: attemptId },
      include: {
        exercise: {
          include: {
            items: true
          }
        }
      }
    })

    if (!attempt) {
      throw new Error('Attempt not found')
    }

    if (attempt.status !== 'IN_PROGRESS') {
      throw new Error('Attempt is not in progress')
    }

    // Calculate final score
    const answers = attempt.answers as any[] || []
    const score = answers.reduce((sum, a) => sum + (a.points || 0), 0)
    const maxScore = attempt.maxScore || attempt.exercise.items.reduce((sum, item) => sum + item.points, 0)
    const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0
    const timeSpent = Math.round((Date.now() - attempt.startedAt.getTime()) / 1000)

    // Update attempt
    const completed = await prisma.exerciseAttempt.update({
      where: { id: attemptId },
      data: {
        status: 'COMPLETED',
        score,
        percentage,
        completedAt: new Date(),
        timeSpent
      }
    })

    const passed = percentage >= attempt.exercise.passingScore

    return {
      attempt: completed,
      score,
      maxScore,
      percentage,
      passed,
      passingScore: attempt.exercise.passingScore,
      timeSpent
    }
  }

  async getAttempt(attemptId: string) {
    const attempt = await prisma.exerciseAttempt.findUnique({
      where: { id: attemptId },
      include: {
        exercise: {
          include: {
            items: true
          }
        }
      }
    })

    if (!attempt) {
      throw new Error('Attempt not found')
    }

    return attempt
  }

  async getStudentAttempts(studentId: string, exerciseId?: string) {
    const where: Prisma.ExerciseAttemptWhereInput = { studentId }
    if (exerciseId) where.exerciseId = exerciseId

    return prisma.exerciseAttempt.findMany({
      where,
      include: {
        exercise: {
          select: {
            id: true,
            title: true,
            type: true,
            language: true,
            cefrLevel: true,
            passingScore: true
          }
        }
      },
      orderBy: { startedAt: 'desc' }
    })
  }

  async abandonAttempt(attemptId: string) {
    return prisma.exerciseAttempt.update({
      where: { id: attemptId },
      data: {
        status: 'ABANDONED',
        completedAt: new Date()
      }
    })
  }

  // ==================== Analytics ====================

  async getExerciseStats(exerciseId: string) {
    const [attemptCount, completedCount, avgScore, avgTime] = await Promise.all([
      prisma.exerciseAttempt.count({ where: { exerciseId } }),
      prisma.exerciseAttempt.count({ where: { exerciseId, status: 'COMPLETED' } }),
      prisma.exerciseAttempt.aggregate({
        where: { exerciseId, status: 'COMPLETED' },
        _avg: { percentage: true }
      }),
      prisma.exerciseAttempt.aggregate({
        where: { exerciseId, status: 'COMPLETED' },
        _avg: { timeSpent: true }
      })
    ])

    return {
      attemptCount,
      completedCount,
      completionRate: attemptCount > 0 ? Math.round((completedCount / attemptCount) * 100) : 0,
      avgScore: Math.round(avgScore._avg.percentage || 0),
      avgTimeSpent: Math.round(avgTime._avg.timeSpent || 0)
    }
  }

  async getStudentExerciseStats(studentId: string) {
    const [totalAttempts, completed, avgScore] = await Promise.all([
      prisma.exerciseAttempt.count({ where: { studentId } }),
      prisma.exerciseAttempt.count({ where: { studentId, status: 'COMPLETED' } }),
      prisma.exerciseAttempt.aggregate({
        where: { studentId, status: 'COMPLETED' },
        _avg: { percentage: true }
      })
    ])

    return {
      totalAttempts,
      completed,
      avgScore: Math.round(avgScore._avg.percentage || 0)
    }
  }
}

export const exerciseService = new ExerciseService()
