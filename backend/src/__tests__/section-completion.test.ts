/**
 * Section Completion Tests
 * Tests the completion reason tracking and CEFR level determination
 */

// Mock Prisma via the database config module
const mockSectionFindUnique = jest.fn()
const mockSectionUpdate = jest.fn()
const mockSectionFindMany = jest.fn()
const mockAssessmentFindUnique = jest.fn()
const mockAssessmentUpdate = jest.fn()
const mockNotificationCreate = jest.fn()
const mockUserFindMany = jest.fn()

const mockStudentUpdate = jest.fn()

jest.mock('../config/database', () => ({
  prisma: {
    assessmentSection: {
      findUnique: (...args: any[]) => mockSectionFindUnique(...args),
      update: (...args: any[]) => mockSectionUpdate(...args),
      findMany: (...args: any[]) => mockSectionFindMany(...args),
    },
    assessment: {
      findUnique: (...args: any[]) => mockAssessmentFindUnique(...args),
      update: (...args: any[]) => mockAssessmentUpdate(...args),
    },
    assessmentQuestion: {
      findMany: jest.fn().mockResolvedValue([]),
      findFirst: jest.fn().mockResolvedValue(null),
    },
    notification: {
      create: (...args: any[]) => mockNotificationCreate(...args),
    },
    user: {
      findMany: (...args: any[]) => mockUserFindMany(...args),
    },
    student: {
      update: (...args: any[]) => mockStudentUpdate(...args),
    },
  },
}))

import { SectionAssessmentService } from '../services/SectionAssessmentService'

describe('Section Completion', () => {
  let service: SectionAssessmentService

  beforeEach(() => {
    jest.clearAllMocks()
    service = new SectionAssessmentService()

    // Default: checkAndCompleteAssessment finds all sections completed
    mockSectionFindMany.mockResolvedValue([
      { id: 's1', status: 'COMPLETED', skill: 'READING' },
    ])
    // Default: assessment lookup for notifications
    mockAssessmentFindUnique.mockResolvedValue({
      id: 'assessment-1',
      language: 'English',
      studentId: 'student-1',
      status: 'IN_PROGRESS',
      student: { user: { name: 'Test Student' } },
    })
    mockAssessmentUpdate.mockResolvedValue({})
    mockNotificationCreate.mockResolvedValue({})
    mockUserFindMany.mockResolvedValue([])
    mockStudentUpdate.mockResolvedValue({})
  })

  const baseSectionData = {
    id: 'section-1',
    assessmentId: 'assessment-1',
    skill: 'READING',
    status: 'IN_PROGRESS',
    targetLevel: 'B1',
    timeLimitMin: 20,
    questionsLimit: 10,
    answers: [
      { questionId: 'q1', answer: 'A', isCorrect: true, cefrLevel: 'A1', points: 1 },
      { questionId: 'q2', answer: 'B', isCorrect: true, cefrLevel: 'A2', points: 1 },
      { questionId: 'q3', answer: 'C', isCorrect: false, cefrLevel: 'B1', points: 0 },
    ],
    assessment: {
      id: 'assessment-1',
      language: 'English',
      studentId: 'student-1',
      student: { user: { name: 'Test Student' } },
    },
  }

  describe('completeSection with reason', () => {
    it('should store INTERRUPTED reason when auto-submitted due to violations', async () => {
      mockSectionFindUnique.mockResolvedValue(baseSectionData)
      mockSectionUpdate.mockResolvedValue({ ...baseSectionData, status: 'COMPLETED', completionReason: 'INTERRUPTED' })

      await service.completeSection('assessment-1', 'section-1', 'INTERRUPTED')

      expect(mockSectionUpdate).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            status: 'COMPLETED',
            completionReason: 'INTERRUPTED',
          }),
        })
      )
    })

    it('should store EXPIRED reason when timer runs out', async () => {
      mockSectionFindUnique.mockResolvedValue(baseSectionData)
      mockSectionUpdate.mockResolvedValue({ ...baseSectionData, status: 'COMPLETED', completionReason: 'EXPIRED' })

      await service.completeSection('assessment-1', 'section-1', 'EXPIRED')

      expect(mockSectionUpdate).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            status: 'COMPLETED',
            completionReason: 'EXPIRED',
          }),
        })
      )
    })

    it('should store null reason for normal completion', async () => {
      mockSectionFindUnique.mockResolvedValue(baseSectionData)
      mockSectionUpdate.mockResolvedValue({ ...baseSectionData, status: 'COMPLETED', completionReason: null })

      await service.completeSection('assessment-1', 'section-1')

      expect(mockSectionUpdate).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            status: 'COMPLETED',
            completionReason: null,
          }),
        })
      )
    })

    it('should not re-complete an already completed section', async () => {
      mockSectionFindUnique.mockResolvedValue({ ...baseSectionData, status: 'COMPLETED' })

      const result = await service.completeSection('assessment-1', 'section-1')

      expect(mockSectionUpdate).not.toHaveBeenCalled()
      expect(result.status).toBe('COMPLETED')
    })

    it('should throw for non-existent section', async () => {
      mockSectionFindUnique.mockResolvedValue(null)

      await expect(
        service.completeSection('assessment-1', 'nonexistent')
      ).rejects.toThrow('Section not found')
    })

    it('should calculate CEFR level on completion', async () => {
      // Student passes A1 (100%) and A2 (100%), fails B1 (0%)
      const sectionWithAnswers = {
        ...baseSectionData,
        answers: [
          { questionId: 'q1', answer: 'A', isCorrect: true, cefrLevel: 'A1', points: 1 },
          { questionId: 'q2', answer: 'B', isCorrect: true, cefrLevel: 'A1', points: 1 },
          { questionId: 'q3', answer: 'C', isCorrect: true, cefrLevel: 'A2', points: 1 },
          { questionId: 'q4', answer: 'D', isCorrect: false, cefrLevel: 'B1', points: 0 },
          { questionId: 'q5', answer: 'E', isCorrect: false, cefrLevel: 'B1', points: 0 },
        ],
      }
      mockSectionFindUnique.mockResolvedValue(sectionWithAnswers)
      mockSectionUpdate.mockImplementation(({ data }: any) => ({
        ...sectionWithAnswers,
        ...data,
      }))

      await service.completeSection('assessment-1', 'section-1')

      expect(mockSectionUpdate).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            cefrLevel: 'A2', // Passed A1 and A2, failed B1
          }),
        })
      )
    })

    it('should apply negative scoring for wrong answers', async () => {
      const sectionWithWrong = {
        ...baseSectionData,
        answers: [
          { questionId: 'q1', answer: 'A', isCorrect: true, cefrLevel: 'A1', points: 1 },
          { questionId: 'q2', answer: 'B', isCorrect: false, cefrLevel: 'A1', points: 0 },
        ],
      }
      mockSectionFindUnique.mockResolvedValue(sectionWithWrong)
      mockSectionUpdate.mockImplementation(({ data }: any) => ({
        ...sectionWithWrong,
        ...data,
      }))

      await service.completeSection('assessment-1', 'section-1')

      const updateCall = mockSectionUpdate.mock.calls[0][0]
      // rawScore should reflect negative scoring: 1 correct - 1/3 penalty
      expect(updateCall.data.rawScore).toBeLessThan(1)
      expect(updateCall.data.rawScore).toBeGreaterThanOrEqual(0)
    })

    it('should set completedAt timestamp', async () => {
      mockSectionFindUnique.mockResolvedValue(baseSectionData)
      mockSectionUpdate.mockImplementation(({ data }: any) => ({
        ...baseSectionData,
        ...data,
      }))

      await service.completeSection('assessment-1', 'section-1')

      const updateCall = mockSectionUpdate.mock.calls[0][0]
      expect(updateCall.data.completedAt).toBeInstanceOf(Date)
    })
  })
})
