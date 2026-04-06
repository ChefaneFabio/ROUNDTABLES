import Joi from 'joi'

/**
 * Validation Schema Tests
 * Tests the Joi validation schemas used in new controllers
 */

// Reproduce the schemas from our controllers for testing
const createAssignmentSchema = Joi.object({
  courseId: Joi.string().required(),
  exerciseId: Joi.string().required(),
  title: Joi.string().max(200).optional().allow(null),
  instructions: Joi.string().max(2000).optional().allow(null),
  dueDate: Joi.date().iso().required(),
  isPublished: Joi.boolean().optional(),
  allowFileUpload: Joi.boolean().optional()
})

const updateAssignmentSchema = Joi.object({
  title: Joi.string().max(200).optional().allow(null),
  instructions: Joi.string().max(2000).optional().allow(null),
  dueDate: Joi.date().iso().optional(),
  isPublished: Joi.boolean().optional(),
  allowFileUpload: Joi.boolean().optional()
})

const gradeSubmissionSchema = Joi.object({
  grade: Joi.number().integer().min(0).max(100).required(),
  teacherNotes: Joi.string().max(2000).optional().allow(null)
})

const createContactSchema = Joi.object({
  name: Joi.string().min(2).max(200).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().max(50).optional().allow(null),
  role: Joi.string().max(100).optional().allow(null),
  branch: Joi.string().max(200).optional().allow(null)
})

const createCodeSchema = Joi.object({
  courseId: Joi.string().required(),
  codeType: Joi.string().valid('BOOK', 'MEL', 'PLATFORM_ACCESS', 'OTHER').required(),
  materialName: Joi.string().max(200).required(),
  code: Joi.string().max(500).required(),
  studentId: Joi.string().optional().allow(null),
  isGroupCode: Joi.boolean().optional()
})

const bulkCreateSchema = Joi.object({
  courseId: Joi.string().required(),
  codeType: Joi.string().valid('BOOK', 'MEL', 'PLATFORM_ACCESS', 'OTHER').required(),
  materialName: Joi.string().max(200).required(),
  codes: Joi.array().items(
    Joi.object({
      code: Joi.string().max(500).required(),
      studentEmail: Joi.string().email().optional().allow(null),
      isGroupCode: Joi.boolean().optional()
    })
  ).min(1).required()
})

const updateCourseSchema = Joi.object({
  name: Joi.string().min(2).max(200).optional(),
  description: Joi.string().max(2000).optional().allow(null),
  courseType: Joi.string().valid('LIVE', 'SELF_PACED').optional(),
  isPublic: Joi.boolean().optional(),
  language: Joi.string().max(50).optional().allow(null),
  startDate: Joi.date().iso().optional().allow(null),
  endDate: Joi.date().iso().optional().allow(null),
  maxStudents: Joi.number().integer().min(1).max(100).optional(),
  price: Joi.number().precision(2).min(0).optional().allow(null),
  currency: Joi.string().length(3).optional(),
  thumbnailUrl: Joi.string().uri().optional().allow(null),
  automationsEnabled: Joi.boolean().optional(),
  courseCategory: Joi.string().max(50).optional().allow(null)
})

// ============================================================
// ASSIGNMENT VALIDATION
// ============================================================
describe('Exercise Assignment Validation', () => {
  describe('createAssignmentSchema', () => {
    it('should validate a valid assignment', () => {
      const { error } = createAssignmentSchema.validate({
        courseId: 'course-123',
        exerciseId: 'exercise-456',
        dueDate: '2026-04-15T23:59:59.000Z',
        title: 'Homework Week 3',
        instructions: 'Complete all questions',
        isPublished: true,
        allowFileUpload: true
      })
      expect(error).toBeUndefined()
    })

    it('should require courseId', () => {
      const { error } = createAssignmentSchema.validate({
        exerciseId: 'ex-1',
        dueDate: '2026-04-15T23:59:59.000Z'
      })
      expect(error).toBeDefined()
      expect(error!.details[0].path).toContain('courseId')
    })

    it('should require exerciseId', () => {
      const { error } = createAssignmentSchema.validate({
        courseId: 'c-1',
        dueDate: '2026-04-15T23:59:59.000Z'
      })
      expect(error).toBeDefined()
      expect(error!.details[0].path).toContain('exerciseId')
    })

    it('should require dueDate', () => {
      const { error } = createAssignmentSchema.validate({
        courseId: 'c-1',
        exerciseId: 'ex-1'
      })
      expect(error).toBeDefined()
      expect(error!.details[0].path).toContain('dueDate')
    })

    it('should reject invalid ISO date', () => {
      const { error } = createAssignmentSchema.validate({
        courseId: 'c-1',
        exerciseId: 'ex-1',
        dueDate: 'not-a-date'
      })
      expect(error).toBeDefined()
    })

    it('should allow optional fields to be null', () => {
      const { error } = createAssignmentSchema.validate({
        courseId: 'c-1',
        exerciseId: 'ex-1',
        dueDate: '2026-04-15T00:00:00Z',
        title: null,
        instructions: null
      })
      expect(error).toBeUndefined()
    })
  })

  describe('gradeSubmissionSchema', () => {
    it('should validate a valid grade', () => {
      const { error } = gradeSubmissionSchema.validate({ grade: 85 })
      expect(error).toBeUndefined()
    })

    it('should accept grade 0', () => {
      const { error } = gradeSubmissionSchema.validate({ grade: 0 })
      expect(error).toBeUndefined()
    })

    it('should accept grade 100', () => {
      const { error } = gradeSubmissionSchema.validate({ grade: 100 })
      expect(error).toBeUndefined()
    })

    it('should reject grade > 100', () => {
      const { error } = gradeSubmissionSchema.validate({ grade: 101 })
      expect(error).toBeDefined()
    })

    it('should reject grade < 0', () => {
      const { error } = gradeSubmissionSchema.validate({ grade: -1 })
      expect(error).toBeDefined()
    })

    it('should reject non-integer grade', () => {
      const { error } = gradeSubmissionSchema.validate({ grade: 85.5 })
      expect(error).toBeDefined()
    })

    it('should require grade', () => {
      const { error } = gradeSubmissionSchema.validate({})
      expect(error).toBeDefined()
    })

    it('should accept optional teacherNotes', () => {
      const { error } = gradeSubmissionSchema.validate({
        grade: 90,
        teacherNotes: 'Excellent work!'
      })
      expect(error).toBeUndefined()
    })
  })
})

// ============================================================
// ORGANIZATION CONTACT VALIDATION
// ============================================================
describe('Organization Contact Validation', () => {
  describe('createContactSchema', () => {
    it('should validate a valid contact', () => {
      const { error } = createContactSchema.validate({
        name: 'Maria Rossi',
        email: 'maria@company.it',
        phone: '+39 02 123456',
        role: 'HR Manager',
        branch: 'Milano'
      })
      expect(error).toBeUndefined()
    })

    it('should require name', () => {
      const { error } = createContactSchema.validate({
        email: 'test@test.com'
      })
      expect(error).toBeDefined()
    })

    it('should require valid email', () => {
      const { error } = createContactSchema.validate({
        name: 'Test',
        email: 'not-an-email'
      })
      expect(error).toBeDefined()
    })

    it('should require name min 2 chars', () => {
      const { error } = createContactSchema.validate({
        name: 'A',
        email: 'test@test.com'
      })
      expect(error).toBeDefined()
    })

    it('should allow optional fields to be null', () => {
      const { error } = createContactSchema.validate({
        name: 'Test Contact',
        email: 'test@test.com',
        phone: null,
        role: null,
        branch: null
      })
      expect(error).toBeUndefined()
    })

    it('should allow minimal required fields only', () => {
      const { error } = createContactSchema.validate({
        name: 'Test Contact',
        email: 'test@test.com'
      })
      expect(error).toBeUndefined()
    })
  })
})

// ============================================================
// MATERIAL CODE VALIDATION
// ============================================================
describe('Material Code Validation', () => {
  describe('createCodeSchema', () => {
    it('should validate a valid BOOK code', () => {
      const { error } = createCodeSchema.validate({
        courseId: 'course-1',
        codeType: 'BOOK',
        materialName: 'English File',
        code: 'BOOK-ABC-123'
      })
      expect(error).toBeUndefined()
    })

    it('should validate a valid MEL code', () => {
      const { error } = createCodeSchema.validate({
        courseId: 'course-1',
        codeType: 'MEL',
        materialName: 'My English Lab Group',
        code: 'MEL-GROUP-001',
        isGroupCode: true
      })
      expect(error).toBeUndefined()
    })

    it('should validate PLATFORM_ACCESS type', () => {
      const { error } = createCodeSchema.validate({
        courseId: 'course-1',
        codeType: 'PLATFORM_ACCESS',
        materialName: 'Platform Login',
        code: 'ACCESS-XYZ'
      })
      expect(error).toBeUndefined()
    })

    it('should reject invalid codeType', () => {
      const { error } = createCodeSchema.validate({
        courseId: 'course-1',
        codeType: 'INVALID',
        materialName: 'Test',
        code: 'TEST'
      })
      expect(error).toBeDefined()
    })

    it('should require courseId', () => {
      const { error } = createCodeSchema.validate({
        codeType: 'BOOK',
        materialName: 'Test',
        code: 'TEST'
      })
      expect(error).toBeDefined()
    })

    it('should require materialName', () => {
      const { error } = createCodeSchema.validate({
        courseId: 'c-1',
        codeType: 'BOOK',
        code: 'TEST'
      })
      expect(error).toBeDefined()
    })

    it('should require code', () => {
      const { error } = createCodeSchema.validate({
        courseId: 'c-1',
        codeType: 'BOOK',
        materialName: 'Test'
      })
      expect(error).toBeDefined()
    })
  })

  describe('bulkCreateSchema', () => {
    it('should validate bulk code creation', () => {
      const { error } = bulkCreateSchema.validate({
        courseId: 'course-1',
        codeType: 'BOOK',
        materialName: 'English File',
        codes: [
          { code: 'BOOK-001' },
          { code: 'BOOK-002', studentEmail: 'student@test.com' },
          { code: 'MEL-GROUP', isGroupCode: true }
        ]
      })
      expect(error).toBeUndefined()
    })

    it('should require at least 1 code', () => {
      const { error } = bulkCreateSchema.validate({
        courseId: 'course-1',
        codeType: 'BOOK',
        materialName: 'Test',
        codes: []
      })
      expect(error).toBeDefined()
    })

    it('should require code field in each entry', () => {
      const { error } = bulkCreateSchema.validate({
        courseId: 'course-1',
        codeType: 'BOOK',
        materialName: 'Test',
        codes: [{ studentEmail: 'test@test.com' }]
      })
      expect(error).toBeDefined()
    })

    it('should validate studentEmail format', () => {
      const { error } = bulkCreateSchema.validate({
        courseId: 'course-1',
        codeType: 'BOOK',
        materialName: 'Test',
        codes: [{ code: 'TEST', studentEmail: 'not-email' }]
      })
      expect(error).toBeDefined()
    })
  })
})

// ============================================================
// COURSE UPDATE VALIDATION (new fields)
// ============================================================
describe('Course Update Validation — new fields', () => {
  it('should accept automationsEnabled boolean', () => {
    const { error } = updateCourseSchema.validate({ automationsEnabled: true })
    expect(error).toBeUndefined()
  })

  it('should accept automationsEnabled=false', () => {
    const { error } = updateCourseSchema.validate({ automationsEnabled: false })
    expect(error).toBeUndefined()
  })

  it('should reject non-boolean automationsEnabled', () => {
    const { error } = updateCourseSchema.validate({ automationsEnabled: 'yes' })
    expect(error).toBeDefined()
  })

  it('should accept courseCategory string', () => {
    const { error } = updateCourseSchema.validate({ courseCategory: 'workshop' })
    expect(error).toBeUndefined()
  })

  it('should accept courseCategory null', () => {
    const { error } = updateCourseSchema.validate({ courseCategory: null })
    expect(error).toBeUndefined()
  })

  it('should reject courseCategory > 50 chars', () => {
    const { error } = updateCourseSchema.validate({
      courseCategory: 'a'.repeat(51)
    })
    expect(error).toBeDefined()
  })

  it('should accept combined update with old + new fields', () => {
    const { error } = updateCourseSchema.validate({
      name: 'Updated Course',
      automationsEnabled: true,
      courseCategory: 'intensive'
    })
    expect(error).toBeUndefined()
  })
})
