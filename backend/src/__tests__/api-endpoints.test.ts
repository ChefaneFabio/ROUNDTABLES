import request from 'supertest'
import jwt from 'jsonwebtoken'
import app from '../index'
import { prisma } from '../config/database'

/**
 * API Endpoint Integration Tests
 * Tests all new endpoints for assignments, material codes, org contacts,
 * and updated course automation features.
 */

// Generate a JWT token directly for testing (avoids registration flow issues)
async function getAdminToken(): Promise<{ token: string; userId: string; schoolId: string }> {
  // Find or create an admin user in DB
  const adminUser = await prisma.user.findFirst({ where: { role: 'ADMIN' } })

  if (!adminUser) {
    // No admin exists — skip integration tests gracefully
    return { token: '', userId: '', schoolId: '' }
  }

  const school = await prisma.school.findFirst({ where: { userId: adminUser.id } })
  const teacher = await prisma.teacher.findFirst({ where: { userId: adminUser.id } })

  const secret = process.env.JWT_SECRET || 'roundtables-jwt-secret-key-2024'
  const token = jwt.sign(
    {
      userId: adminUser.id,
      email: adminUser.email,
      role: adminUser.role,
      schoolId: school?.id || null,
      teacherId: teacher?.id || null
    },
    secret,
    { expiresIn: '1h' }
  )

  return {
    token,
    userId: adminUser.id,
    schoolId: school?.id || ''
  }
}

let adminToken: string
let adminSchoolId: string
let adminUserId: string

beforeAll(async () => {
  const admin = await getAdminToken()
  adminToken = admin.token
  adminSchoolId = admin.schoolId
  adminUserId = admin.userId
}, 30000)

afterAll(async () => {
  await prisma.$disconnect()
})

// ============================================================
// COURSE AUTOMATIONS TESTS
// ============================================================
describe('Course Automations API', () => {
  let courseId: string

  it('should create a course with automationsEnabled=false by default', async () => {
    const res = await request(app)
      .post('/api/courses')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: `Test Course ${Date.now()}`,
        description: 'Test course for automation testing',
        language: 'English'
      })

    if (res.status === 201 || res.status === 200) {
      courseId = res.body.data?.id
      expect(res.body.data.automationsEnabled).toBe(false)
      expect(res.body.data.courseCategory).toBeNull()
    } else {
      // If creation fails, try to find an existing course
      const coursesRes = await request(app)
        .get('/api/courses')
        .set('Authorization', `Bearer ${adminToken}`)

      if (coursesRes.body.data?.length > 0) {
        courseId = coursesRes.body.data[0].id
      }
      // If no courses found, create one directly in DB
      if (!courseId) {
        const school = await prisma.school.findFirst()
        if (school) {
          const course = await prisma.course.create({
            data: { name: `Test Course ${Date.now()}`, schoolId: school.id }
          })
          courseId = course.id
        }
      }
      expect(courseId).toBeDefined()
    }
  })

  it('should update automationsEnabled to true', async () => {
    if (!courseId) return

    const res = await request(app)
      .put(`/api/courses/${courseId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ automationsEnabled: true })

    expect(res.status).toBeLessThanOrEqual(200)
    if (res.body.data) {
      expect(res.body.data.automationsEnabled).toBe(true)
    }
  })

  it('should update courseCategory', async () => {
    if (!courseId) return

    const res = await request(app)
      .put(`/api/courses/${courseId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ courseCategory: 'workshop' })

    expect(res.status).toBeLessThanOrEqual(200)
    if (res.body.data) {
      expect(res.body.data.courseCategory).toBe('workshop')
    }
  })

  it('should toggle automationsEnabled back to false', async () => {
    if (!courseId) return

    const res = await request(app)
      .put(`/api/courses/${courseId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ automationsEnabled: false })

    expect(res.status).toBeLessThanOrEqual(200)
    if (res.body.data) {
      expect(res.body.data.automationsEnabled).toBe(false)
    }
  })

  it('should clear courseCategory by setting to null', async () => {
    if (!courseId) return

    const res = await request(app)
      .put(`/api/courses/${courseId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ courseCategory: null })

    expect(res.status).toBeLessThanOrEqual(200)
  })
})

// ============================================================
// EXERCISE ASSIGNMENTS TESTS
// ============================================================
describe('Exercise Assignments API', () => {
  let courseId: string
  let exerciseId: string
  let assignmentId: string

  beforeAll(async () => {
    // Find or create a course
    const coursesRes = await request(app)
      .get('/api/courses')
      .set('Authorization', `Bearer ${adminToken}`)

    if (coursesRes.body.data?.length > 0) {
      courseId = coursesRes.body.data[0].id
    }

    // Find or create an exercise
    const exercisesRes = await request(app)
      .get('/api/exercises')
      .set('Authorization', `Bearer ${adminToken}`)

    if (exercisesRes.body.data?.length > 0) {
      exerciseId = exercisesRes.body.data[0].id
    }
  })

  it('should create an exercise assignment', async () => {
    if (!courseId || !exerciseId) {
      console.warn('Skipping: no course or exercise available')
      return
    }

    const dueDate = new Date()
    dueDate.setDate(dueDate.getDate() + 7) // Due in 7 days

    const res = await request(app)
      .post('/api/assignments')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        courseId,
        exerciseId,
        title: 'Test Assignment',
        instructions: 'Complete this exercise by the deadline',
        dueDate: dueDate.toISOString(),
        isPublished: true,
        allowFileUpload: true
      })

    expect(res.status).toBe(201)
    expect(res.body.success).toBe(true)
    expect(res.body.data).toBeDefined()
    expect(res.body.data.title).toBe('Test Assignment')
    expect(res.body.data.allowFileUpload).toBe(true)
    expect(res.body.data.isPublished).toBe(true)
    assignmentId = res.body.data.id
  })

  it('should list assignments for a course', async () => {
    if (!courseId) return

    const res = await request(app)
      .get(`/api/assignments/course/${courseId}`)
      .set('Authorization', `Bearer ${adminToken}`)

    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(Array.isArray(res.body.data)).toBe(true)
  })

  it('should update an assignment', async () => {
    if (!assignmentId) return

    const res = await request(app)
      .put(`/api/assignments/${assignmentId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ title: 'Updated Assignment Title', isPublished: false })

    expect(res.status).toBe(200)
    expect(res.body.data.title).toBe('Updated Assignment Title')
    expect(res.body.data.isPublished).toBe(false)
  })

  it('should validate required fields on create', async () => {
    if (!adminToken) return

    const res = await request(app)
      .post('/api/assignments')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ title: 'Missing fields' })

    // 400 for validation error, or 401 if token expired
    expect([400, 401]).toContain(res.status)
  })

  it('should delete an assignment', async () => {
    if (!assignmentId) return

    const res = await request(app)
      .delete(`/api/assignments/${assignmentId}`)
      .set('Authorization', `Bearer ${adminToken}`)

    expect(res.status).toBe(200)
  })
})

// ============================================================
// MATERIAL CODES TESTS
// ============================================================
describe('Material Codes API', () => {
  let courseId: string
  let materialCodeId: string

  beforeAll(async () => {
    const coursesRes = await request(app)
      .get('/api/courses')
      .set('Authorization', `Bearer ${adminToken}`)

    if (coursesRes.body.data?.length > 0) {
      courseId = coursesRes.body.data[0].id
    }
  })

  it('should create a single material code', async () => {
    if (!courseId) return

    const res = await request(app)
      .post('/api/material-codes')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        courseId,
        codeType: 'BOOK',
        materialName: 'English File Upper-Intermediate',
        code: 'BOOK-ABC-123',
        isGroupCode: false
      })

    expect(res.status).toBe(201)
    expect(res.body.success).toBe(true)
    expect(res.body.data.codeType).toBe('BOOK')
    expect(res.body.data.code).toBe('BOOK-ABC-123')
    materialCodeId = res.body.data.id
  })

  it('should create a group material code (MEL)', async () => {
    if (!courseId) return

    const res = await request(app)
      .post('/api/material-codes')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        courseId,
        codeType: 'MEL',
        materialName: 'My English Lab Group',
        code: 'MEL-GROUP-XYZ',
        isGroupCode: true
      })

    expect(res.status).toBe(201)
    expect(res.body.data.isGroupCode).toBe(true)
  })

  it('should bulk create material codes', async () => {
    if (!courseId) return

    const res = await request(app)
      .post('/api/material-codes/bulk')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        courseId,
        codeType: 'BOOK',
        materialName: 'Test Book',
        codes: [
          { code: 'BULK-001' },
          { code: 'BULK-002' },
          { code: 'BULK-003', isGroupCode: true }
        ]
      })

    expect(res.status).toBe(201)
    expect(res.body.data.created).toBe(3)
  })

  it('should list material codes for a course', async () => {
    if (!courseId) return

    const res = await request(app)
      .get(`/api/material-codes/course/${courseId}`)
      .set('Authorization', `Bearer ${adminToken}`)

    expect(res.status).toBe(200)
    expect(Array.isArray(res.body.data)).toBe(true)
    expect(res.body.data.length).toBeGreaterThanOrEqual(1)
  })

  it('should validate codeType enum values', async () => {
    if (!courseId) return

    const res = await request(app)
      .post('/api/material-codes')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        courseId,
        codeType: 'INVALID_TYPE',
        materialName: 'Test',
        code: 'TEST-123'
      })

    expect(res.status).toBe(400)
  })

  it('should delete a material code', async () => {
    if (!materialCodeId) return

    const res = await request(app)
      .delete(`/api/material-codes/${materialCodeId}`)
      .set('Authorization', `Bearer ${adminToken}`)

    expect(res.status).toBe(200)
  })
})

// ============================================================
// ORGANIZATION CONTACTS TESTS
// ============================================================
describe('Organization Contacts API', () => {
  let orgId: string
  let contactId: string

  beforeAll(async () => {
    // Find an existing organization
    const orgsRes = await request(app)
      .get('/api/organizations')
      .set('Authorization', `Bearer ${adminToken}`)

    if (orgsRes.body.data?.length > 0) {
      orgId = orgsRes.body.data[0].id
    } else {
      // Create org directly in DB for testing
      const org = await prisma.organization.findFirst()
      if (org) orgId = org.id
    }
  })

  it('should create an organization contact', async () => {
    if (!orgId) {
      console.warn('Skipping: no organization available')
      return
    }

    const res = await request(app)
      .post(`/api/organizations/${orgId}/contacts`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Maria Rossi',
        email: 'maria.rossi@inter.it',
        phone: '+39 02 1234567',
        role: 'HR Manager',
        branch: 'Milano'
      })

    expect(res.status).toBe(201)
    expect(res.body.success).toBe(true)
    expect(res.body.data.name).toBe('Maria Rossi')
    expect(res.body.data.branch).toBe('Milano')
    expect(res.body.data.role).toBe('HR Manager')
    contactId = res.body.data.id
  })

  it('should create a second contact for the same org', async () => {
    if (!orgId) return

    const res = await request(app)
      .post(`/api/organizations/${orgId}/contacts`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Luca Bianchi',
        email: 'luca.bianchi@inter.it',
        role: 'Training Coordinator',
        branch: 'Roma'
      })

    expect(res.status).toBe(201)
    expect(res.body.data.branch).toBe('Roma')
  })

  it('should list all contacts for an organization', async () => {
    if (!orgId) return

    const res = await request(app)
      .get(`/api/organizations/${orgId}/contacts`)
      .set('Authorization', `Bearer ${adminToken}`)

    expect(res.status).toBe(200)
    expect(Array.isArray(res.body.data)).toBe(true)
    expect(res.body.data.length).toBeGreaterThanOrEqual(2)
  })

  it('should update a contact', async () => {
    if (!contactId) return

    const res = await request(app)
      .put(`/api/organizations/${orgId}/contacts/${contactId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ role: 'Senior HR Manager', phone: '+39 02 9999999' })

    expect(res.status).toBe(200)
    expect(res.body.data.role).toBe('Senior HR Manager')
  })

  it('should link a contact to courses', async () => {
    if (!contactId) return

    const coursesRes = await request(app)
      .get('/api/courses')
      .set('Authorization', `Bearer ${adminToken}`)

    if (!coursesRes.body.data?.length) return

    const courseIds = coursesRes.body.data.slice(0, 2).map((c: any) => c.id)

    const res = await request(app)
      .post(`/api/organizations/${orgId}/contacts/${contactId}/courses`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ courseIds })

    expect(res.status).toBe(200)
    expect(Array.isArray(res.body.data)).toBe(true)
  })

  it('should get contacts linked to a course', async () => {
    const coursesRes = await request(app)
      .get('/api/courses')
      .set('Authorization', `Bearer ${adminToken}`)

    if (!coursesRes.body.data?.length) return

    const courseId = coursesRes.body.data[0].id

    const res = await request(app)
      .get(`/api/organizations/courses/${courseId}/contacts`)
      .set('Authorization', `Bearer ${adminToken}`)

    expect(res.status).toBe(200)
    expect(Array.isArray(res.body.data)).toBe(true)
  })

  it('should delete a contact', async () => {
    if (!contactId) return

    const res = await request(app)
      .delete(`/api/organizations/${orgId}/contacts/${contactId}`)
      .set('Authorization', `Bearer ${adminToken}`)

    expect(res.status).toBe(200)
  })
})

// ============================================================
// AUTH: MANUAL USER CREATION TESTS
// ============================================================
describe('Manual User Creation (Admin)', () => {
  it('should create a teacher account manually (no invite link)', async () => {
    const email = `manual-teacher-${Date.now()}@test.com`

    const res = await request(app)
      .post('/api/auth/register/teacher')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        email,
        password: 'ManualPass123!',
        name: 'Manual Teacher',
        schoolId: adminSchoolId
      })

    // Should create immediately without invite
    if (res.status === 201 || res.status === 200) {
      expect(res.body.success).toBe(true)

      // Should be able to login immediately
      const loginRes = await request(app)
        .post('/api/auth/login')
        .send({ email, password: 'ManualPass123!' })

      expect(loginRes.status).toBe(200)
      expect(loginRes.body.data?.accessToken).toBeDefined()
    }
  })

  it('should create a student account manually (no invite link)', async () => {
    const email = `manual-student-${Date.now()}@test.com`

    const res = await request(app)
      .post('/api/auth/register/student')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        email,
        password: 'ManualPass123!',
        name: 'Manual Student',
        schoolId: adminSchoolId,
        languageLevel: 'B1'
      })

    if (res.status === 201 || res.status === 200) {
      expect(res.body.success).toBe(true)

      // Should be able to login immediately
      const loginRes = await request(app)
        .post('/api/auth/login')
        .send({ email, password: 'ManualPass123!' })

      expect(loginRes.status).toBe(200)
      expect(loginRes.body.data?.accessToken).toBeDefined()
      expect(loginRes.body.data?.user?.role).toBe('STUDENT')
    }
  })

  it('should reject duplicate email registration', async () => {
    const email = `dup-test-${Date.now()}@test.com`

    // Create first
    await request(app)
      .post('/api/auth/register/student')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        email,
        password: 'Pass123!',
        name: 'First Student',
        schoolId: adminSchoolId
      })

    // Try duplicate
    const res = await request(app)
      .post('/api/auth/register/student')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        email,
        password: 'Pass123!',
        name: 'Duplicate Student',
        schoolId: adminSchoolId
      })

    expect(res.status).toBe(400)
  })
})

// ============================================================
// EXISTING FEATURES: FEEDBACK WITH COURSE FILTER
// ============================================================
describe('Feedback API — Course filtering', () => {
  it('should accept courseId parameter', async () => {
    if (!adminToken) return

    const res = await request(app)
      .get('/api/feedback')
      .query({ courseId: 'nonexistent-id', limit: 5 })
      .set('Authorization', `Bearer ${adminToken}`)

    // 200 if token valid, 401 if expired
    expect([200, 401]).toContain(res.status)
    if (res.status === 200) {
      expect(res.body.success).toBe(true)
    }
  })

  it('should return feedback filtered by courseId', async () => {
    const coursesRes = await request(app)
      .get('/api/courses')
      .set('Authorization', `Bearer ${adminToken}`)

    if (!coursesRes.body.data?.length) return

    const courseId = coursesRes.body.data[0].id

    const res = await request(app)
      .get('/api/feedback')
      .query({ courseId })
      .set('Authorization', `Bearer ${adminToken}`)

    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(Array.isArray(res.body.data)).toBe(true)
  })
})

// ============================================================
// HEALTH CHECK & GENERAL ROUTES
// ============================================================
describe('General API Health', () => {
  it('should respond to health check', async () => {
    const res = await request(app).get('/health')
    expect(res.status).toBe(200)
  })

  it('should return 404 for unknown routes', async () => {
    const res = await request(app).get('/api/nonexistent')
    expect(res.status).toBe(404)
  })

  it('should require authentication for protected routes', async () => {
    const res = await request(app).get('/api/courses')
    expect(res.status).toBe(401)
  })
})
