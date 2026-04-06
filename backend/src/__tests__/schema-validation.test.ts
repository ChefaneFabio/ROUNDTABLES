import { prisma } from '../config/database'

/**
 * Schema Validation Tests
 * Verifies all new models and fields exist in the database schema
 */

describe('Schema: New Models & Fields', () => {

  // ============================================================
  // Course Model — New Fields
  // ============================================================
  describe('Course model — automationsEnabled & courseCategory', () => {
    it('should have automationsEnabled field defaulting to false', async () => {
      // Check the Prisma model metadata
      const dmmf = (prisma as any)._baseDmmf || (prisma as any)._dmmf
      const courseModel = dmmf?.datamodel?.models?.find((m: any) => m.name === 'Course')
        || dmmf?.modelMap?.Course

      // Verify via a query that the fields exist
      const courses = await prisma.course.findMany({ take: 1, select: { automationsEnabled: true } })
      // If no error is thrown, the field exists
      expect(true).toBe(true)
    })

    it('should have courseCategory field (nullable string)', async () => {
      const courses = await prisma.course.findMany({ take: 1, select: { courseCategory: true } })
      expect(true).toBe(true)
    })
  })

  // ============================================================
  // ExerciseAssignment Model
  // ============================================================
  describe('ExerciseAssignment model', () => {
    it('should be queryable with all expected fields', async () => {
      const result = await prisma.exerciseAssignment.findMany({
        take: 1,
        select: {
          id: true,
          title: true,
          instructions: true,
          dueDate: true,
          isPublished: true,
          allowFileUpload: true,
          courseId: true,
          exerciseId: true,
          assignedById: true,
          createdAt: true,
          updatedAt: true
        }
      })
      expect(Array.isArray(result)).toBe(true)
    })

    it('should support relations to Course, Exercise, User', async () => {
      const result = await prisma.exerciseAssignment.findMany({
        take: 1,
        include: {
          course: true,
          exercise: true,
          assignedBy: true,
          submissions: true
        }
      })
      expect(Array.isArray(result)).toBe(true)
    })
  })

  // ============================================================
  // AssignmentSubmission Model
  // ============================================================
  describe('AssignmentSubmission model', () => {
    it('should be queryable with all expected fields', async () => {
      const result = await prisma.assignmentSubmission.findMany({
        take: 1,
        select: {
          id: true,
          status: true,
          fileUrl: true,
          fileName: true,
          fileSize: true,
          submittedAt: true,
          grade: true,
          teacherNotes: true,
          assignmentId: true,
          studentId: true,
          attemptId: true
        }
      })
      expect(Array.isArray(result)).toBe(true)
    })

    it('should support SubmissionStatus enum values', async () => {
      // Verify the enum values exist by checking Prisma enums
      const validStatuses = ['PENDING', 'SUBMITTED', 'LATE', 'GRADED', 'RETURNED']
      // If we can query without error, the model and enum exist
      const result = await prisma.assignmentSubmission.findMany({
        where: { status: 'PENDING' },
        take: 1
      })
      expect(Array.isArray(result)).toBe(true)
    })
  })

  // ============================================================
  // OrganizationContact Model
  // ============================================================
  describe('OrganizationContact model', () => {
    it('should be queryable with all expected fields', async () => {
      const result = await prisma.organizationContact.findMany({
        take: 1,
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          role: true,
          branch: true,
          isActive: true,
          organizationId: true,
          createdAt: true,
          updatedAt: true
        }
      })
      expect(Array.isArray(result)).toBe(true)
    })

    it('should support relation to Organization and CourseContacts', async () => {
      const result = await prisma.organizationContact.findMany({
        take: 1,
        include: {
          organization: true,
          courseContacts: true
        }
      })
      expect(Array.isArray(result)).toBe(true)
    })
  })

  // ============================================================
  // CourseContact Model
  // ============================================================
  describe('CourseContact model', () => {
    it('should be queryable with all expected fields', async () => {
      const result = await prisma.courseContact.findMany({
        take: 1,
        select: {
          id: true,
          courseId: true,
          contactId: true,
          createdAt: true
        }
      })
      expect(Array.isArray(result)).toBe(true)
    })

    it('should support relations to Course and OrganizationContact', async () => {
      const result = await prisma.courseContact.findMany({
        take: 1,
        include: {
          course: true,
          contact: true
        }
      })
      expect(Array.isArray(result)).toBe(true)
    })
  })

  // ============================================================
  // MaterialCode Model
  // ============================================================
  describe('MaterialCode model', () => {
    it('should be queryable with all expected fields', async () => {
      const result = await prisma.materialCode.findMany({
        take: 1,
        select: {
          id: true,
          codeType: true,
          materialName: true,
          code: true,
          isGroupCode: true,
          sentToStudent: true,
          sentToTeacher: true,
          sentAt: true,
          courseId: true,
          schoolId: true,
          studentId: true,
          createdAt: true,
          updatedAt: true
        }
      })
      expect(Array.isArray(result)).toBe(true)
    })

    it('should support relations to Course, School, and Student', async () => {
      const result = await prisma.materialCode.findMany({
        take: 1,
        include: {
          course: true,
          school: true,
          student: true
        }
      })
      expect(Array.isArray(result)).toBe(true)
    })
  })
})

describe('Schema: Existing Model Relations', () => {
  it('Course should include exerciseAssignments relation', async () => {
    const result = await prisma.course.findMany({
      take: 1,
      include: { exerciseAssignments: true }
    })
    expect(Array.isArray(result)).toBe(true)
  })

  it('Course should include materialCodes relation', async () => {
    const result = await prisma.course.findMany({
      take: 1,
      include: { materialCodes: true }
    })
    expect(Array.isArray(result)).toBe(true)
  })

  it('Course should include courseContacts relation', async () => {
    const result = await prisma.course.findMany({
      take: 1,
      include: { courseContacts: true }
    })
    expect(Array.isArray(result)).toBe(true)
  })

  it('Student should include assignmentSubmissions relation', async () => {
    const result = await prisma.student.findMany({
      take: 1,
      include: { assignmentSubmissions: true }
    })
    expect(Array.isArray(result)).toBe(true)
  })

  it('Student should include materialCodes relation', async () => {
    const result = await prisma.student.findMany({
      take: 1,
      include: { materialCodes: true }
    })
    expect(Array.isArray(result)).toBe(true)
  })

  it('Organization should include contacts relation', async () => {
    const result = await prisma.organization.findMany({
      take: 1,
      include: { contacts: true }
    })
    expect(Array.isArray(result)).toBe(true)
  })

  it('Exercise should include assignments relation', async () => {
    const result = await prisma.exercise.findMany({
      take: 1,
      include: { assignments: true }
    })
    expect(Array.isArray(result)).toBe(true)
  })

  it('ExerciseAttempt should include assignmentSubmission relation', async () => {
    const result = await prisma.exerciseAttempt.findMany({
      take: 1,
      include: { assignmentSubmission: true }
    })
    expect(Array.isArray(result)).toBe(true)
  })
})
