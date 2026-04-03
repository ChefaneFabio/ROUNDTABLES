import { prisma } from '../config/database'
import { Prisma, AssessmentStatus, AssessmentSkill, SectionStatus, AssessmentQuestionType } from '@prisma/client'
import { emailService } from './EmailService'
import { certificateService } from './CertificateService'

const CEFR_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']

const LEVEL_WEIGHTS: Record<string, number> = {
  A1: 1, A2: 1, B1: 2, B2: 2, C1: 3, C2: 3
}

const LEVEL_NAMES: Record<string, string> = {
  A1: 'Beginner', A2: 'Elementary', B1: 'Intermediate',
  B2: 'Upper Intermediate', C1: 'Advanced', C2: 'Proficiency'
}

// Legacy 4-section configuration
const SECTION_CONFIG_V1: Record<string, { timeLimitMin: number; questionsLimit: number; orderIndex: number }> = {
  READING: { timeLimitMin: 20, questionsLimit: 10, orderIndex: 0 },
  LISTENING: { timeLimitMin: 15, questionsLimit: 8, orderIndex: 1 },
  WRITING: { timeLimitMin: 20, questionsLimit: 3, orderIndex: 2 },
  SPEAKING: { timeLimitMin: 15, questionsLimit: 3, orderIndex: 3 }
}

// 8-section granular placement test configuration (legacy, kept for old assessments)
const SECTION_CONFIG_V2: Record<string, { timeLimitMin: number; questionsLimit: number; orderIndex: number }> = {
  GRAMMAR:                 { timeLimitMin: 20, questionsLimit: 40, orderIndex: 0 },
  VOCABULARY:              { timeLimitMin: 8,  questionsLimit: 15, orderIndex: 1 },
  READING:                 { timeLimitMin: 12, questionsLimit: 8,  orderIndex: 2 },
  ERROR_CORRECTION:        { timeLimitMin: 5,  questionsLimit: 10, orderIndex: 3 },
  SENTENCE_TRANSFORMATION: { timeLimitMin: 5,  questionsLimit: 10, orderIndex: 4 },
  WRITING:                 { timeLimitMin: 10, questionsLimit: 2,  orderIndex: 5 },
  LISTENING:               { timeLimitMin: 15, questionsLimit: 8,  orderIndex: 6 },
  SPEAKING:                { timeLimitMin: 15, questionsLimit: 3,  orderIndex: 7 },
}

// Versant-style 4-section configuration — Reading absorbs grammar/vocab/error-correction questions
const SECTION_CONFIG_V3: Record<string, { timeLimitMin: number; questionsLimit: number; orderIndex: number }> = {
  READING:   { timeLimitMin: 25, questionsLimit: 20, orderIndex: 0 },
  LISTENING: { timeLimitMin: 15, questionsLimit: 8,  orderIndex: 1 },
  WRITING:   { timeLimitMin: 15, questionsLimit: 3,  orderIndex: 2 },
  SPEAKING:  { timeLimitMin: 15, questionsLimit: 3,  orderIndex: 3 },
}

// Default to V3 (Versant-style) for new assessments
const SECTION_CONFIG = SECTION_CONFIG_V3

// Jean's scoring grid: total raw score -> CEFR level (for 8-section assessments)
const RAW_SCORE_TO_CEFR: [number, string][] = [
  [116, 'C2'], [106, 'C1'], [96, 'B2+'], [86, 'B2'],
  [76, 'B1+'], [66, 'B1'], [51, 'A2+'], [36, 'A2'],
  [21, 'A1+'], [0, 'A1']
]

function rawScoreToCefr(totalRawScore: number): string {
  for (const [threshold, level] of RAW_SCORE_TO_CEFR) {
    if (totalRawScore >= threshold) return level
  }
  return 'A1'
}

// Normalize extended CEFR (A1+, A2+, B1+, B2+) to standard for DB storage
function normalizeToStandardCefr(level: string): string {
  return level.replace('+', '')
}

interface AnswerRecord {
  questionId: string
  answer: string
  isCorrect: boolean
  cefrLevel: string
  points: number
}

interface CreateMultiSkillInput {
  studentId: string
  language: string
  assignedById?: string
  timeLimitMin?: number
}

// Normalize language to title case (e.g. "english" -> "English") to match question bank format
function normalizeLanguage(lang: string): string {
  if (!lang) return lang
  return lang.charAt(0).toUpperCase() + lang.slice(1).toLowerCase()
}

export class SectionAssessmentService {
  // Create a 4-skills assessment with all sections
  async createMultiSkillAssessment(input: CreateMultiSkillInput) {
    const { studentId, assignedById } = input
    const language = normalizeLanguage(input.language)

    const student = await prisma.student.findUnique({ where: { id: studentId } })
    if (!student) throw new Error('Student not found')

    // Check for existing in-progress multi-skill assessment
    const existing = await prisma.assessment.findFirst({
      where: {
        studentId,
        language,
        isMultiSkill: true,
        status: { in: ['IN_PROGRESS', 'ASSIGNED', 'PAUSED'] }
      },
      include: { sections: true }
    })
    if (existing) {
      // If the assessment is older than 24 hours, abandon it so student can start fresh
      const ageMs = Date.now() - (existing.startedAt?.getTime() || existing.createdAt.getTime())
      const maxAgeMs = 24 * 60 * 60 * 1000
      if (ageMs > maxAgeMs) {
        await prisma.assessment.update({
          where: { id: existing.id },
          data: { status: 'COMPLETED', completedAt: new Date() }
        })
        // Fall through to create a new assessment
      } else {
        return existing
      }
    }

    const sectionSkills = Object.keys(SECTION_CONFIG_V2) as Array<keyof typeof SECTION_CONFIG_V2>
    const totalQuestions = sectionSkills.reduce((sum, skill) => sum + SECTION_CONFIG_V2[skill].questionsLimit, 0)

    const assessment = await prisma.assessment.create({
      data: {
        studentId,
        language,
        type: 'PLACEMENT',
        status: assignedById ? 'ASSIGNED' : 'IN_PROGRESS',
        isMultiSkill: true,
        currentSection: 0,
        answers: [],
        targetLevel: 'B1',
        questionsLimit: totalQuestions,
        startedAt: assignedById ? undefined : new Date(),
        assignedById,
        assignedAt: assignedById ? new Date() : undefined,
        sections: {
          create: sectionSkills.map(skill => ({
            skill: skill as any,
            orderIndex: SECTION_CONFIG_V2[skill].orderIndex,
            status: 'PENDING',
            timeLimitMin: SECTION_CONFIG_V2[skill].timeLimitMin,
            questionsLimit: SECTION_CONFIG_V2[skill].questionsLimit,
            targetLevel: 'B1',
            answers: []
          }))
        }
      },
      include: { sections: { orderBy: { orderIndex: 'asc' } } }
    })

    return assessment
  }

  // Get all sections for an assessment
  async getSections(assessmentId: string) {
    const sections = await prisma.assessmentSection.findMany({
      where: { assessmentId },
      orderBy: { orderIndex: 'asc' }
    })
    return sections
  }

  // Pause an in-progress assessment
  async pauseAssessment(assessmentId: string, studentId: string) {
    const assessment = await prisma.assessment.findUnique({
      where: { id: assessmentId },
      include: { sections: true }
    })
    if (!assessment) throw new Error('Assessment not found')
    if (assessment.studentId !== studentId) throw new Error('Access denied')
    if (assessment.status !== 'IN_PROGRESS') throw new Error('Only in-progress assessments can be paused')

    // Pause any in-progress section (stop its timer)
    const activeSection = assessment.sections.find(s => s.status === 'IN_PROGRESS')
    if (activeSection && activeSection.expiresAt) {
      const remainingMs = Math.max(0, activeSection.expiresAt.getTime() - Date.now())
      await prisma.assessmentSection.update({
        where: { id: activeSection.id },
        data: {
          status: 'PENDING',
          expiresAt: null,
          // Store remaining time so we can resume later
          timeLimitMin: Math.ceil(remainingMs / 60000) || 1
        }
      })
    }

    return prisma.assessment.update({
      where: { id: assessmentId },
      data: { status: 'PAUSED' },
      include: { sections: { orderBy: { orderIndex: 'asc' } } }
    })
  }

  // Resume a paused assessment
  async resumeAssessment(assessmentId: string, studentId: string) {
    const assessment = await prisma.assessment.findUnique({ where: { id: assessmentId } })
    if (!assessment) throw new Error('Assessment not found')
    if (assessment.studentId !== studentId) throw new Error('Access denied')
    if (assessment.status !== 'PAUSED') throw new Error('Only paused assessments can be resumed')

    return prisma.assessment.update({
      where: { id: assessmentId },
      data: { status: 'IN_PROGRESS' },
      include: { sections: { orderBy: { orderIndex: 'asc' } } }
    })
  }

  // Restart: abandon current assessment and create a fresh one
  async restartAssessment(assessmentId: string, studentId: string) {
    const assessment = await prisma.assessment.findUnique({ where: { id: assessmentId } })
    if (!assessment) throw new Error('Assessment not found')
    if (assessment.studentId !== studentId) throw new Error('Access denied')
    if (!['IN_PROGRESS', 'PAUSED', 'COMPLETED'].includes(assessment.status)) {
      throw new Error('Assessment cannot be restarted')
    }

    // Mark old assessment as completed
    await prisma.assessment.update({
      where: { id: assessmentId },
      data: { status: 'COMPLETED', completedAt: assessment.completedAt || new Date() }
    })

    // Create a fresh assessment
    return this.createMultiSkillAssessment({
      studentId,
      language: assessment.language,
    })
  }

  // Start a section (set timer)
  async startSection(assessmentId: string, sectionId: string, studentId: string) {
    const section = await prisma.assessmentSection.findUnique({
      where: { id: sectionId },
      include: { assessment: true }
    })

    if (!section) throw new Error('Section not found')
    if (section.assessment.studentId !== studentId) throw new Error('Access denied')
    if (section.assessmentId !== assessmentId) throw new Error('Section does not belong to this assessment')

    // Check section is in correct state
    if (section.status === 'COMPLETED') throw new Error('Section already completed')
    if (section.status === 'IN_PROGRESS') {
      // Already started, return as-is
      return section
    }

    // Ensure previous sections are completed (enforce order)
    if (section.orderIndex > 0) {
      const previousSections = await prisma.assessmentSection.findMany({
        where: {
          assessmentId,
          orderIndex: { lt: section.orderIndex }
        }
      })
      const allPrevCompleted = previousSections.every(s => s.status === 'COMPLETED' || s.status === 'SKIPPED')
      if (!allPrevCompleted) {
        throw new Error('Previous sections must be completed first')
      }
    }

    // Ensure the assessment is IN_PROGRESS
    if (section.assessment.status === 'ASSIGNED') {
      await prisma.assessment.update({
        where: { id: assessmentId },
        data: { status: 'IN_PROGRESS', startedAt: new Date() }
      })
    }

    const now = new Date()
    const expiresAt = new Date(now.getTime() + section.timeLimitMin * 60 * 1000)

    const updated = await prisma.assessmentSection.update({
      where: { id: sectionId },
      data: {
        status: 'IN_PROGRESS',
        startedAt: now,
        expiresAt
      }
    })

    // Update assessment current section
    await prisma.assessment.update({
      where: { id: assessmentId },
      data: { currentSection: section.orderIndex }
    })

    return updated
  }

  // Get next question for a section (adaptive within section)
  async getNextSectionQuestion(assessmentId: string, sectionId: string) {
    const section = await prisma.assessmentSection.findUnique({
      where: { id: sectionId },
      include: { assessment: true }
    })

    if (!section) throw new Error('Section not found')
    if (section.status !== 'IN_PROGRESS') throw new Error('Section is not in progress')

    // Check if section timer expired
    if (section.expiresAt && new Date() > section.expiresAt) {
      await this.completeSection(assessmentId, sectionId)
      return { isComplete: true, expired: true, totalAnswered: ((section.answers as unknown as AnswerRecord[]) || []).length }
    }

    const answers = (section.answers as unknown as AnswerRecord[]) || []
    const answeredIds = answers.map(a => a.questionId)

    // Auto-complete when question limit reached
    if (answers.length >= section.questionsLimit) {
      return { isComplete: true, totalAnswered: answers.length }
    }

    // Adaptive level adjustment (same algorithm as main assessment)
    let targetLevel = section.targetLevel || 'B1'

    if (answers.length >= 3) {
      const recentAnswers = answers.slice(-3)
      const correctCount = recentAnswers.filter(a => a.isCorrect).length
      const currentLevelIndex = CEFR_LEVELS.indexOf(targetLevel)

      if (correctCount >= 2 && currentLevelIndex < CEFR_LEVELS.length - 1) {
        targetLevel = CEFR_LEVELS[currentLevelIndex + 1]
      } else if (correctCount === 0 && currentLevelIndex > 0) {
        targetLevel = CEFR_LEVELS[currentLevelIndex - 1]
      }

      if (targetLevel !== section.targetLevel) {
        await prisma.assessmentSection.update({
          where: { id: sectionId },
          data: { targetLevel }
        })
      }
    }

    // Map skill to question types and allowed skill tags for querying
    const skillQuestionTypes = this.getQuestionTypesForSkill(section.skill)
    const allowedSkills = this.getSkillsForSection(section.skill)

    // Get a question from the target level that hasn't been answered
    let question = await prisma.assessmentQuestion.findFirst({
      where: {
        language: section.assessment.language,
        cefrLevel: targetLevel,
        isActive: true,
        id: { notIn: answeredIds },
        OR: [
          { skill: { in: allowedSkills } },
          ...(skillQuestionTypes.length > 0
            ? [{ questionType: { in: skillQuestionTypes }, skill: null }]
            : [])
        ]
      },
      orderBy: { orderIndex: 'asc' }
    })

    // Fallback: try any level for this skill
    if (!question) {
      question = await prisma.assessmentQuestion.findFirst({
        where: {
          language: section.assessment.language,
          isActive: true,
          id: { notIn: answeredIds },
          OR: [
            { skill: { in: allowedSkills } },
            ...(skillQuestionTypes.length > 0
              ? [{ questionType: { in: skillQuestionTypes }, skill: null }]
              : [])
          ]
        },
        orderBy: { orderIndex: 'asc' }
      })
    }

    if (!question) {
      // No questions available for this skill — auto-complete the section
      console.warn(`[Assessment] No ${section.skill} questions available for "${section.assessment.language}" (answered: ${answers.length}). Auto-completing section.`)
      if (section.status === 'IN_PROGRESS') {
        await this.completeSection(assessmentId, sectionId)
      }
      return { isComplete: true, totalAnswered: answers.length, noQuestions: true }
    }

    // Return question without the correct answer
    const { correctAnswer, ...safeQuestion } = question
    return {
      isComplete: false,
      question: safeQuestion,
      progress: {
        answered: answers.length,
        total: section.questionsLimit,
        currentLevel: targetLevel
      },
      remainingSeconds: section.expiresAt
        ? Math.max(0, Math.ceil((section.expiresAt.getTime() - Date.now()) / 1000))
        : null
    }
  }

  // Submit an answer for a section question
  async submitSectionAnswer(input: {
    assessmentId: string
    sectionId: string
    questionId: string
    answer: string
  }) {
    const { assessmentId, sectionId, questionId, answer } = input

    const section = await prisma.assessmentSection.findUnique({
      where: { id: sectionId }
    })

    if (!section) throw new Error('Section not found')
    if (section.status !== 'IN_PROGRESS') throw new Error('Section is not in progress')
    if (section.assessmentId !== assessmentId) throw new Error('Section does not belong to this assessment')

    // Check timer
    if (section.expiresAt && new Date() > section.expiresAt) {
      await this.completeSection(assessmentId, sectionId)
      return { isCorrect: false, correctAnswer: '', points: 0, shouldAutoComplete: true, expired: true }
    }

    const question = await prisma.assessmentQuestion.findUnique({ where: { id: questionId } })
    if (!question) throw new Error('Question not found')

    const answers = (section.answers as unknown as AnswerRecord[]) || []
    if (answers.some(a => a.questionId === questionId)) {
      throw new Error('Question already answered')
    }

    // Support pipe-separated multiple accepted answers (for error correction / sentence transformation)
    const studentAnswer = answer.toLowerCase().trim()
    const acceptedAnswers = question.correctAnswer.split('|').map(a => a.toLowerCase().trim())
    const isCorrect = acceptedAnswers.includes(studentAnswer)

    const newAnswer: AnswerRecord = {
      questionId,
      answer,
      isCorrect,
      cefrLevel: question.cefrLevel,
      points: isCorrect ? question.points : 0
    }

    const updatedAnswers = [...answers, newAnswer]

    await prisma.assessmentSection.update({
      where: { id: sectionId },
      data: { answers: updatedAnswers as any }
    })

    const shouldAutoComplete = updatedAnswers.length >= section.questionsLimit

    return {
      isCorrect,
      correctAnswer: question.correctAnswer,
      points: newAnswer.points,
      shouldAutoComplete
    }
  }

  // Submit a writing response
  async submitWritingResponse(input: {
    assessmentId: string
    sectionId: string
    questionId: string
    studentId: string
    responseText: string
  }) {
    const { assessmentId, sectionId, questionId, studentId, responseText } = input

    const section = await prisma.assessmentSection.findUnique({
      where: { id: sectionId },
      include: { assessment: true }
    })

    if (!section) throw new Error('Section not found')
    if (section.skill !== 'WRITING') throw new Error('Not a writing section')
    if (section.assessment.studentId !== studentId) throw new Error('Access denied')

    const wordCount = responseText.trim().split(/\s+/).filter(w => w.length > 0).length

    const response = await prisma.writingResponse.create({
      data: {
        assessmentId,
        sectionId,
        questionId,
        studentId,
        responseText,
        wordCount
      }
    })

    // Track as an answer in the section
    const answers = (section.answers as unknown as AnswerRecord[]) || []
    const updatedAnswers = [...answers, {
      questionId,
      answer: `[Writing Response: ${wordCount} words]`,
      isCorrect: true, // Writing is AI-scored, not auto-graded
      cefrLevel: section.targetLevel,
      points: 0 // Will be scored by AI
    }]

    await prisma.assessmentSection.update({
      where: { id: sectionId },
      data: { answers: updatedAnswers as any }
    })

    return response
  }

  // Submit a speaking response
  async submitSpeakingResponse(input: {
    assessmentId: string
    sectionId: string
    questionId: string
    studentId: string
    audioUrl: string
    duration?: number
  }) {
    const { assessmentId, sectionId, questionId, studentId, audioUrl, duration } = input

    const section = await prisma.assessmentSection.findUnique({
      where: { id: sectionId },
      include: { assessment: true }
    })

    if (!section) throw new Error('Section not found')
    if (section.skill !== 'SPEAKING') throw new Error('Not a speaking section')
    if (section.assessment.studentId !== studentId) throw new Error('Access denied')

    const response = await prisma.speakingResponse.create({
      data: {
        assessmentId,
        sectionId,
        questionId,
        studentId,
        audioUrl,
        duration
      }
    })

    // Track as an answer in the section
    const answers = (section.answers as unknown as AnswerRecord[]) || []
    const updatedAnswers = [...answers, {
      questionId,
      answer: `[Speaking Response: ${duration || 0}s]`,
      isCorrect: true, // Speaking is AI-scored
      cefrLevel: section.targetLevel,
      points: 0 // Will be scored by AI
    }]

    await prisma.assessmentSection.update({
      where: { id: sectionId },
      data: { answers: updatedAnswers as any }
    })

    return response
  }

  // Complete a section and calculate score
  async completeSection(assessmentId: string, sectionId: string) {
    const section = await prisma.assessmentSection.findUnique({
      where: { id: sectionId },
      include: { assessment: true }
    })

    if (!section) throw new Error('Section not found')
    if (section.status === 'COMPLETED') return section

    const answers = (section.answers as unknown as AnswerRecord[]) || []

    // For reading/listening: calculate score from MC/fill-blank answers
    let rawScore = 0
    let maxScore = 0
    let determinedLevel = 'A1'

    const autoScoredSkills = ['READING', 'LISTENING', 'GRAMMAR', 'VOCABULARY', 'ERROR_CORRECTION', 'SENTENCE_TRANSFORMATION']
    if (autoScoredSkills.includes(section.skill)) {
      const levelScores: Record<string, { correct: number; total: number }> = {}

      for (const answer of answers) {
        const weight = LEVEL_WEIGHTS[answer.cefrLevel] || 1
        if (!levelScores[answer.cefrLevel]) {
          levelScores[answer.cefrLevel] = { correct: 0, total: 0 }
        }
        levelScores[answer.cefrLevel].total++
        maxScore += weight

        if (answer.isCorrect) {
          levelScores[answer.cefrLevel].correct++
          rawScore += weight
        }
      }

      // Determine CEFR level: highest level with >= 60% accuracy
      for (const level of CEFR_LEVELS) {
        const ls = levelScores[level]
        if (ls && ls.total > 0 && (ls.correct / ls.total) >= 0.6) {
          determinedLevel = level
        } else if (ls && ls.total > 0) {
          break
        }
      }
    }

    const percentageScore = maxScore > 0 ? Math.round((rawScore / maxScore) * 100) : null

    const updated = await prisma.assessmentSection.update({
      where: { id: sectionId },
      data: {
        status: 'COMPLETED',
        completedAt: new Date(),
        rawScore,
        maxScore,
        percentageScore,
        cefrLevel: determinedLevel
      }
    })

    // Check if all sections are completed -> complete assessment
    await this.checkAndCompleteAssessment(assessmentId)

    return updated
  }

  // Submit teacher score override for writing/speaking sections
  async submitTeacherScore(input: {
    sectionId: string
    teacherUserId: string
    score: Record<string, any>
  }) {
    const { sectionId, teacherUserId, score } = input

    const section = await prisma.assessmentSection.findUnique({ where: { id: sectionId } })
    if (!section) throw new Error('Section not found')
    if (section.skill !== 'WRITING' && section.skill !== 'SPEAKING') {
      throw new Error('Teacher scoring only applies to writing and speaking sections')
    }

    const updated = await prisma.assessmentSection.update({
      where: { id: sectionId },
      data: {
        teacherScore: score as any,
        teacherReviewedBy: teacherUserId,
        teacherReviewedAt: new Date(),
        finalScore: score as any, // Teacher score takes precedence
        cefrLevel: score.cefrLevel || section.cefrLevel
      }
    })

    // Recalculate assessment overall
    await this.checkAndCompleteAssessment(section.assessmentId)

    return updated
  }

  // Get multi-skill results
  async getMultiSkillResults(assessmentId: string) {
    const assessment = await prisma.assessment.findUnique({
      where: { id: assessmentId },
      include: {
        student: { include: { user: { select: { name: true, email: true } } } },
        sections: { orderBy: { orderIndex: 'asc' } },
        writingResponses: true,
        speakingResponses: true
      }
    })

    if (!assessment) throw new Error('Assessment not found')

    const sectionResults = assessment.sections.map(s => ({
      id: s.id,
      skill: s.skill,
      status: s.status,
      cefrLevel: s.cefrLevel,
      cefrName: LEVEL_NAMES[s.cefrLevel || 'A1'] || '',
      percentageScore: s.percentageScore,
      rawScore: s.rawScore,
      maxScore: s.maxScore,
      aiScore: s.aiScore,
      teacherScore: s.teacherScore,
      finalScore: s.finalScore,
      questionsAnswered: ((s.answers as unknown as AnswerRecord[]) || []).length,
      questionsTotal: s.questionsLimit
    }))

    return {
      assessment: {
        id: assessment.id,
        language: assessment.language,
        type: assessment.type,
        status: assessment.status,
        score: assessment.score,
        cefrLevel: assessment.cefrLevel,
        cefrName: LEVEL_NAMES[assessment.cefrLevel || 'A1'] || '',
        isMultiSkill: assessment.isMultiSkill,
        startedAt: assessment.startedAt,
        completedAt: assessment.completedAt,
        readingLevel: assessment.readingLevel,
        listeningLevel: assessment.listeningLevel,
        writingLevel: assessment.writingLevel,
        speakingLevel: assessment.speakingLevel,
        grammarLevel: assessment.grammarLevel,
        vocabularyLevel: assessment.vocabularyLevel,
        errorCorrectionLevel: assessment.errorCorrectionLevel,
        sentenceTransformationLevel: assessment.sentenceTransformationLevel
      },
      student: {
        id: assessment.student.id,
        name: assessment.student.user.name,
        email: assessment.student.user.email
      },
      sections: sectionResults,
      writingResponses: assessment.writingResponses,
      speakingResponses: assessment.speakingResponses
    }
  }

  // Get sections pending teacher review
  async getSectionsForReview() {
    return prisma.assessmentSection.findMany({
      where: {
        skill: { in: ['WRITING', 'SPEAKING'] },
        status: 'COMPLETED',
        NOT: { aiScore: { equals: Prisma.DbNull } },
        teacherScore: { equals: Prisma.DbNull }
      },
      include: {
        assessment: {
          include: {
            student: { include: { user: { select: { name: true, email: true } } } }
          }
        }
      },
      orderBy: { completedAt: 'asc' }
    })
  }

  // ==================== Question Bank CRUD ====================

  async getQuestionBankSummary() {
    const questions = await prisma.assessmentQuestion.groupBy({
      by: ['language', 'skill', 'cefrLevel'],
      where: { isActive: true },
      _count: { id: true }
    })

    const summary: Record<string, Record<string, Record<string, number>>> = {}
    for (const row of questions) {
      const lang = row.language
      const skill = row.skill || 'GENERAL'
      const level = row.cefrLevel
      if (!summary[lang]) summary[lang] = {}
      if (!summary[lang][skill]) summary[lang][skill] = {}
      summary[lang][skill][level] = row._count.id
    }

    return summary
  }

  async getQuestionBank(filters: {
    language?: string
    skill?: string
    cefrLevel?: string
    search?: string
    page?: number
    limit?: number
  }) {
    const { language, skill, cefrLevel, search, page = 1, limit = 20 } = filters

    const where: Prisma.AssessmentQuestionWhereInput = { isActive: true }
    if (language) where.language = language
    if (skill) where.skill = skill as any
    if (cefrLevel) where.cefrLevel = cefrLevel
    if (search) {
      where.questionText = { contains: search, mode: 'insensitive' }
    }

    const [questions, total] = await Promise.all([
      prisma.assessmentQuestion.findMany({
        where,
        orderBy: [{ skill: 'asc' }, { cefrLevel: 'asc' }, { orderIndex: 'asc' }],
        skip: (page - 1) * limit,
        take: limit
      }),
      prisma.assessmentQuestion.count({ where })
    ])

    return {
      questions,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  }

  async getQuestionById(id: string) {
    const question = await prisma.assessmentQuestion.findUnique({ where: { id } })
    if (!question) throw new Error('Question not found')
    return question
  }

  async createMultiSkillQuestion(data: {
    language: string
    cefrLevel: string
    questionType: string
    questionText: string
    correctAnswer: string
    skill?: string
    options?: any
    passage?: string
    passageTitle?: string
    points?: number
    orderIndex?: number
    ttsScript?: string
    ttsLanguageCode?: string
    speakingPrompt?: string
    rubric?: any
    tags?: string[]
    timeSuggested?: number
  }) {
    return prisma.assessmentQuestion.create({
      data: {
        language: data.language,
        cefrLevel: data.cefrLevel,
        questionType: data.questionType as any,
        questionText: data.questionText,
        correctAnswer: data.correctAnswer,
        skill: data.skill as any || null,
        options: data.options || undefined,
        passage: data.passage,
        passageTitle: data.passageTitle,
        points: data.points ?? 1,
        orderIndex: data.orderIndex ?? 0,
        ttsScript: data.ttsScript,
        ttsLanguageCode: data.ttsLanguageCode,
        speakingPrompt: data.speakingPrompt,
        rubric: data.rubric || undefined,
        tags: data.tags || [],
        timeSuggested: data.timeSuggested
      }
    })
  }

  async updateQuestion(id: string, data: Record<string, any>) {
    const existing = await prisma.assessmentQuestion.findUnique({ where: { id } })
    if (!existing) throw new Error('Question not found')

    const updateData: any = {}
    const allowedFields = [
      'language', 'cefrLevel', 'questionType', 'questionText', 'correctAnswer',
      'skill', 'options', 'passage', 'passageTitle', 'points', 'orderIndex',
      'ttsScript', 'ttsLanguageCode', 'speakingPrompt', 'rubric', 'tags',
      'timeSuggested', 'isActive'
    ]

    for (const field of allowedFields) {
      if (data[field] !== undefined) {
        updateData[field] = data[field]
      }
    }

    return prisma.assessmentQuestion.update({ where: { id }, data: updateData })
  }

  async deleteQuestion(id: string) {
    const existing = await prisma.assessmentQuestion.findUnique({ where: { id } })
    if (!existing) throw new Error('Question not found')

    return prisma.assessmentQuestion.update({
      where: { id },
      data: { isActive: false }
    })
  }

  // Private helpers
  private async checkAndCompleteAssessment(assessmentId: string) {
    const sections = await prisma.assessmentSection.findMany({
      where: { assessmentId }
    })

    const allCompleted = sections.every(s => s.status === 'COMPLETED' || s.status === 'SKIPPED')
    if (!allCompleted) return

    // Calculate overall CEFR (lowest of all skills, or weighted average)
    const skillLevels: Record<string, string | null> = {}
    let totalIndex = 0
    let skillCount = 0

    for (const s of sections) {
      if (s.status === 'COMPLETED' && s.cefrLevel) {
        skillLevels[s.skill] = s.cefrLevel
        totalIndex += CEFR_LEVELS.indexOf(s.cefrLevel)
        skillCount++
      }
    }

    // Determine if this is an 8-section assessment
    const is8Section = sections.length >= 8

    let overallLevel: string
    let avgPercentage: number

    if (is8Section) {
      // Use Jean's raw score grid for 8-section assessments
      const totalRawScore = sections
        .filter(s => s.rawScore !== null)
        .reduce((sum, s) => sum + (s.rawScore || 0), 0)
      const extendedLevel = rawScoreToCefr(totalRawScore)
      overallLevel = normalizeToStandardCefr(extendedLevel)

      const totalPercentage = sections
        .filter(s => s.percentageScore !== null)
        .reduce((sum, s) => sum + (s.percentageScore || 0), 0)
      avgPercentage = skillCount > 0 ? Math.round(totalPercentage / skillCount) : 0
    } else {
      // Legacy averaging for 4-section assessments
      const avgIndex = skillCount > 0 ? Math.floor(totalIndex / skillCount) : 0
      overallLevel = CEFR_LEVELS[Math.min(avgIndex, CEFR_LEVELS.length - 1)]

      const totalPercentage = sections
        .filter(s => s.percentageScore !== null)
        .reduce((sum, s) => sum + (s.percentageScore || 0), 0)
      avgPercentage = skillCount > 0 ? Math.round(totalPercentage / skillCount) : 0
    }

    await prisma.assessment.update({
      where: { id: assessmentId },
      data: {
        status: 'COMPLETED',
        completedAt: new Date(),
        score: avgPercentage,
        cefrLevel: overallLevel,
        readingLevel: skillLevels['READING'] || null,
        listeningLevel: skillLevels['LISTENING'] || null,
        writingLevel: skillLevels['WRITING'] || null,
        speakingLevel: skillLevels['SPEAKING'] || null,
        grammarLevel: skillLevels['GRAMMAR'] || null,
        vocabularyLevel: skillLevels['VOCABULARY'] || null,
        errorCorrectionLevel: skillLevels['ERROR_CORRECTION'] || null,
        sentenceTransformationLevel: skillLevels['SENTENCE_TRANSFORMATION'] || null,
      }
    })

    // Update student language level and send results
    const assessment = await prisma.assessment.findUnique({
      where: { id: assessmentId },
      include: {
        student: { include: { user: { select: { name: true, email: true } } } },
        sections: { orderBy: { orderIndex: 'asc' } }
      }
    })
    if (assessment) {
      await prisma.student.update({
        where: { id: assessment.studentId },
        data: { languageLevel: overallLevel as any }
      })

      // Generate certificate
      try {
        await certificateService.generateAssessmentCertificate(assessment.studentId, assessmentId)
      } catch (e) {
        console.error('Failed to generate certificate:', e)
      }

      // Send email with results (async, don't block)
      if (emailService.isConfigured()) {
        try {
          const pdfBuffer = await certificateService.generateMultiSkillResultPdf(assessmentId)
          await emailService.sendMultiSkillResults({
            to: assessment.student.user.email,
            studentName: assessment.student.user.name,
            language: assessment.language,
            overallLevel,
            overallLevelName: LEVEL_NAMES[overallLevel] || overallLevel,
            overallScore: avgPercentage,
            skills: assessment.sections.map(s => ({
              skill: s.skill,
              cefrLevel: s.cefrLevel || '',
              score: s.percentageScore,
              teacherReviewed: s.teacherScore != null
            })),
            pdfBuffer
          })
        } catch (e) {
          console.error('Failed to send multi-skill results email:', e)
        }
      }
    }
  }

  // Maps a section skill to the question types it can pull from the question bank.
  // Reading absorbs grammar, vocabulary, error-correction, and sentence-transformation
  // question types so the 4-section Versant-style test covers all language competencies.
  private getQuestionTypesForSkill(skill: string): AssessmentQuestionType[] {
    switch (skill) {
      case 'READING':
        return ['READING', 'MULTIPLE_CHOICE', 'FILL_BLANK', 'SHORT_ANSWER', 'ERROR_CORRECTION', 'SENTENCE_TRANSFORMATION'] as AssessmentQuestionType[]
      case 'LISTENING':
        return ['LISTENING', 'DICTATION'] as AssessmentQuestionType[]
      case 'WRITING':
        return ['WRITING', 'SHORT_ANSWER', 'ESSAY'] as AssessmentQuestionType[]
      case 'SPEAKING':
        return ['SPEAKING_PROMPT'] as AssessmentQuestionType[]
      case 'GRAMMAR':
        return ['MULTIPLE_CHOICE'] as AssessmentQuestionType[]
      case 'VOCABULARY':
        return ['MULTIPLE_CHOICE', 'FILL_BLANK'] as AssessmentQuestionType[]
      case 'ERROR_CORRECTION':
        return ['ERROR_CORRECTION'] as AssessmentQuestionType[]
      case 'SENTENCE_TRANSFORMATION':
        return ['SENTENCE_TRANSFORMATION'] as AssessmentQuestionType[]
      default:
        return []
    }
  }

  // For the Reading section, also pull questions tagged with grammar/vocab/etc. skills
  private getSkillsForSection(sectionSkill: string): string[] {
    if (sectionSkill === 'READING') {
      return ['READING', 'GRAMMAR', 'VOCABULARY', 'ERROR_CORRECTION', 'SENTENCE_TRANSFORMATION']
    }
    return [sectionSkill]
  }
}

export const sectionAssessmentService = new SectionAssessmentService()
