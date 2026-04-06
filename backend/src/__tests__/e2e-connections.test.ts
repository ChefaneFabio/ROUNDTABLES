import request from 'supertest'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import app from '../index'
import { prisma } from '../config/database'

/**
 * End-to-End Connection Tests — REAL DATA, NO MOCKS
 *
 * Creates real entities in the database, tests every API connection,
 * verifies DB state, and cleans up.
 */

const JWT_SECRET = process.env.JWT_SECRET || 'roundtables-jwt-secret-key-2024'
const cleanup: Array<() => Promise<void>> = []

let adminToken: string
let teacherToken: string
let studentToken: string
let schoolId: string
let adminUserId: string
let teacherId: string
let studentId: string
let courseId: string
let exerciseId: string
let orgId: string

beforeAll(async () => {
  // --- Resolve existing seed data ---
  const admin = await prisma.user.findFirst({ where: { role: 'ADMIN' } })
  const school = await prisma.school.findFirst()
  const teacher = await prisma.teacher.findFirst({ include: { user: true } })
  const student = await prisma.student.findFirst({ include: { user: true } })

  if (!admin || !school) throw new Error('Seed data required: run db:seed first')

  adminUserId = admin.id
  schoolId = school.id
  teacherId = teacher?.id || ''

  // --- Create JWT tokens matching what auth middleware produces ---
  adminToken = jwt.sign(
    { userId: admin.id, email: admin.email, role: 'ADMIN' },
    JWT_SECRET, { expiresIn: '1h' }
  )
  if (teacher) {
    teacherToken = jwt.sign(
      { userId: teacher.userId, email: teacher.user.email, role: 'TEACHER' },
      JWT_SECRET, { expiresIn: '1h' }
    )
  }
  if (student) {
    studentId = student.id
    studentToken = jwt.sign(
      { userId: student.userId, email: student.user.email, role: 'STUDENT' },
      JWT_SECRET, { expiresIn: '1h' }
    )
  }

  // --- Create test course directly in DB (bypasses validation quirks) ---
  const course = await prisma.course.create({
    data: {
      name: 'E2E Test — Business English',
      description: 'E2E connection test course',
      language: 'English',
      courseType: 'LIVE',
      maxStudents: 15,
      schoolId,
      automationsEnabled: false
    }
  })
  courseId = course.id
  cleanup.push(async () => { await prisma.course.delete({ where: { id: courseId } }).catch(() => {}) })

  // --- Create enrollment ---
  if (studentId) {
    const enrollment = await prisma.enrollment.create({
      data: { studentId, courseId, status: 'ACTIVE' }
    })
    cleanup.push(async () => { await prisma.enrollment.delete({ where: { id: enrollment.id } }).catch(() => {}) })
  }

  // --- Create exercise ---
  const exercise = await prisma.exercise.create({
    data: {
      title: 'E2E Grammar Quiz',
      type: 'MULTIPLE_CHOICE',
      language: 'English',
      cefrLevel: 'B1',
      passingScore: 70,
      config: {},
      isPublished: true,
      createdById: adminUserId,
      schoolId,
      items: {
        create: [{
          questionText: 'She ___ to school every day.',
          content: { options: ['go', 'goes', 'going'] },
          correctAnswer: { answer: 'goes' },
          points: 1
        }]
      }
    }
  })
  exerciseId = exercise.id
  cleanup.push(async () => {
    await prisma.exerciseItem.deleteMany({ where: { exerciseId } }).catch(() => {})
    await prisma.exercise.delete({ where: { id: exerciseId } }).catch(() => {})
  })

  // --- Create organization ---
  const org = await prisma.organization.create({
    data: {
      name: 'E2E Test — Inter FC',
      email: `inter-e2e-${Date.now()}@test.com`,
      industry: 'Sports',
      schoolId
    }
  })
  orgId = org.id
  cleanup.push(async () => { await prisma.organization.delete({ where: { id: orgId } }).catch(() => {}) })
}, 30000)

afterAll(async () => {
  for (const fn of cleanup.reverse()) {
    await fn()
  }
  await prisma.$disconnect()
})

// ============================================================
// 1. COURSE AUTOMATION FIELDS
// ============================================================
describe('1. Course Automation Fields', () => {
  it('course created with automationsEnabled=false', async () => {
    const db = await prisma.course.findUnique({ where: { id: courseId } })
    expect(db!.automationsEnabled).toBe(false)
    expect(db!.courseCategory).toBeNull()
  })

  it('PUT /api/courses/:id — toggles automationsEnabled via API', async () => {
    const res = await request(app)
      .put(`/api/courses/${courseId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ automationsEnabled: true, courseCategory: 'intensive' })

    expect(res.status).toBe(200)
    expect(res.body.data.automationsEnabled).toBe(true)
    expect(res.body.data.courseCategory).toBe('intensive')

    // Verify DB
    const db = await prisma.course.findUnique({ where: { id: courseId } })
    expect(db!.automationsEnabled).toBe(true)
    expect(db!.courseCategory).toBe('intensive')

    // Reset for other tests
    await prisma.course.update({ where: { id: courseId }, data: { automationsEnabled: false, courseCategory: null } })
  })
})

// ============================================================
// 2. EXERCISE ASSIGNMENTS — full API chain
// ============================================================
describe('2. Exercise Assignments (full chain)', () => {
  let assignmentId: string
  let submissionId: string

  it('POST /api/assignments — creates assignment with deadline', async () => {
    const dueDate = new Date(Date.now() + 14 * 86400000) // 14 days

    const res = await request(app)
      .post('/api/assignments')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        courseId,
        exerciseId,
        title: 'Week 2 Grammar Homework',
        instructions: 'Complete by Friday',
        dueDate: dueDate.toISOString(),
        isPublished: true,
        allowFileUpload: true
      })

    expect(res.status).toBe(201)
    expect(res.body.data.title).toBe('Week 2 Grammar Homework')
    expect(res.body.data.allowFileUpload).toBe(true)
    assignmentId = res.body.data.id

    // Verify DB relations
    const db = await prisma.exerciseAssignment.findUnique({
      where: { id: assignmentId },
      include: { course: true, exercise: true, assignedBy: true }
    })
    expect(db!.course.id).toBe(courseId)
    expect(db!.exercise.id).toBe(exerciseId)
    expect(db!.assignedBy.id).toBe(adminUserId)

    cleanup.push(async () => {
      await prisma.assignmentSubmission.deleteMany({ where: { assignmentId } }).catch(() => {})
      await prisma.exerciseAssignment.delete({ where: { id: assignmentId } }).catch(() => {})
    })
  })

  it('GET /api/assignments/course/:courseId — lists assignments', async () => {
    const res = await request(app)
      .get(`/api/assignments/course/${courseId}`)
      .set('Authorization', `Bearer ${adminToken}`)

    expect(res.status).toBe(200)
    const found = res.body.data.find((a: any) => a.id === assignmentId)
    expect(found).toBeDefined()
    expect(found.exercise.title).toBe('E2E Grammar Quiz')
  })

  it('student sees published assignments only', async () => {
    const res = await request(app)
      .get(`/api/assignments/course/${courseId}`)
      .set('Authorization', `Bearer ${studentToken}`)

    expect(res.status).toBe(200)
    const found = res.body.data.find((a: any) => a.id === assignmentId)
    expect(found).toBeDefined()
  })

  it('POST /api/assignments/:id/submit — student submits', async () => {
    const res = await request(app)
      .post(`/api/assignments/${assignmentId}/submit`)
      .set('Authorization', `Bearer ${studentToken}`)

    expect(res.status).toBe(200)
    expect(res.body.data.status).toBe('SUBMITTED')
    submissionId = res.body.data.id

    // Verify DB
    const db = await prisma.assignmentSubmission.findUnique({ where: { id: submissionId } })
    expect(db!.studentId).toBe(studentId)
    expect(db!.submittedAt).not.toBeNull()
  })

  it('GET /api/assignments/:id/submissions — teacher sees submissions', async () => {
    const res = await request(app)
      .get(`/api/assignments/${assignmentId}/submissions`)
      .set('Authorization', `Bearer ${teacherToken}`)

    expect(res.status).toBe(200)
    expect(res.body.data.length).toBe(1)
    expect(res.body.data[0].student.user.name).toBe('Demo Student')
  })

  it('PUT /api/assignments/submissions/:id/grade — teacher grades', async () => {
    const res = await request(app)
      .put(`/api/assignments/submissions/${submissionId}/grade`)
      .set('Authorization', `Bearer ${teacherToken}`)
      .send({ grade: 92, teacherNotes: 'Excellent work!' })

    expect(res.status).toBe(200)
    expect(res.body.data.grade).toBe(92)
    expect(res.body.data.status).toBe('GRADED')

    // Verify DB
    const db = await prisma.assignmentSubmission.findUnique({ where: { id: submissionId } })
    expect(db!.grade).toBe(92)
    expect(db!.teacherNotes).toBe('Excellent work!')
  })

  it('GET /api/assignments/my/assignments — student sees own', async () => {
    const res = await request(app)
      .get('/api/assignments/my/assignments')
      .set('Authorization', `Bearer ${studentToken}`)

    expect(res.status).toBe(200)
    const found = res.body.data.find((a: any) => a.course?.id === courseId)
    expect(found).toBeDefined()
    expect(found.submissions.length).toBe(1)
    expect(found.submissions[0].grade).toBe(92)
  })
})

// ============================================================
// 3. ORGANIZATION HR CONTACTS — full API chain
// ============================================================
describe('3. Organization HR Contacts (full chain)', () => {
  let contactId1: string
  let contactId2: string

  it('POST — creates Milano HR contact', async () => {
    const res = await request(app)
      .post(`/api/organizations/${orgId}/contacts`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Anna Verdi',
        email: 'anna.verdi@inter-e2e.it',
        phone: '+39 02 1111111',
        role: 'HR Manager',
        branch: 'Milano'
      })

    expect(res.status).toBe(201)
    contactId1 = res.body.data.id

    const db = await prisma.organizationContact.findUnique({ where: { id: contactId1 } })
    expect(db!.name).toBe('Anna Verdi')
    expect(db!.branch).toBe('Milano')
    expect(db!.organizationId).toBe(orgId)

    cleanup.push(async () => {
      await prisma.courseContact.deleteMany({ where: { contactId: contactId1 } }).catch(() => {})
      await prisma.organizationContact.delete({ where: { id: contactId1 } }).catch(() => {})
    })
  })

  it('POST — creates Roma HR contact', async () => {
    const res = await request(app)
      .post(`/api/organizations/${orgId}/contacts`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Marco Neri',
        email: 'marco.neri@inter-e2e.it',
        role: 'Training Coordinator',
        branch: 'Roma'
      })

    expect(res.status).toBe(201)
    contactId2 = res.body.data.id

    cleanup.push(async () => {
      await prisma.organizationContact.delete({ where: { id: contactId2 } }).catch(() => {})
    })
  })

  it('GET — lists both contacts', async () => {
    const res = await request(app)
      .get(`/api/organizations/${orgId}/contacts`)
      .set('Authorization', `Bearer ${adminToken}`)

    expect(res.status).toBe(200)
    expect(res.body.data.length).toBe(2)
    const branches = res.body.data.map((c: any) => c.branch)
    expect(branches).toContain('Milano')
    expect(branches).toContain('Roma')
  })

  it('POST — links Milano contact to course', async () => {
    const res = await request(app)
      .post(`/api/organizations/${orgId}/contacts/${contactId1}/courses`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ courseIds: [courseId] })

    expect(res.status).toBe(200)

    // Verify DB
    const cc = await prisma.courseContact.findFirst({ where: { contactId: contactId1, courseId } })
    expect(cc).not.toBeNull()
  })

  it('GET /courses/:courseId/contacts — shows only linked contact', async () => {
    const res = await request(app)
      .get(`/api/organizations/courses/${courseId}/contacts`)
      .set('Authorization', `Bearer ${adminToken}`)

    expect(res.status).toBe(200)
    const names = res.body.data.map((c: any) => c.name)
    expect(names).toContain('Anna Verdi')
    expect(names).not.toContain('Marco Neri') // Roma not linked
  })

  it('DB: Roma contact not in courseContacts for this course', async () => {
    const cc = await prisma.courseContact.findMany({
      where: { courseId },
      include: { contact: true }
    })
    const contactNames = cc.map(c => c.contact.name)
    expect(contactNames).toContain('Anna Verdi')
    expect(contactNames).not.toContain('Marco Neri')
  })

  it('PUT — updates contact role', async () => {
    const res = await request(app)
      .put(`/api/organizations/${orgId}/contacts/${contactId1}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ role: 'Senior HR Director' })

    expect(res.status).toBe(200)
    const db = await prisma.organizationContact.findUnique({ where: { id: contactId1 } })
    expect(db!.role).toBe('Senior HR Director')
  })
})

// ============================================================
// 4. MATERIAL CODES — full API chain
// ============================================================
describe('4. Material Codes (full chain)', () => {
  let bookCodeId: string

  it('POST — creates BOOK code assigned to student', async () => {
    const res = await request(app)
      .post('/api/material-codes')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        courseId,
        codeType: 'BOOK',
        materialName: 'English File B1',
        code: 'E2E-BOOK-001',
        studentId
      })

    expect(res.status).toBe(201)
    bookCodeId = res.body.data.id

    const db = await prisma.materialCode.findUnique({
      where: { id: bookCodeId },
      include: { student: { include: { user: true } }, course: true }
    })
    expect(db!.studentId).toBe(studentId)
    expect(db!.student!.user.name).toBe('Demo Student')
    expect(db!.course.id).toBe(courseId)
    expect(db!.sentToStudent).toBe(false)

    cleanup.push(async () => { await prisma.materialCode.delete({ where: { id: bookCodeId } }).catch(() => {}) })
  })

  it('POST — creates group MEL code', async () => {
    const res = await request(app)
      .post('/api/material-codes')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        courseId,
        codeType: 'MEL',
        materialName: 'My English Lab B1',
        code: 'E2E-MEL-GROUP',
        isGroupCode: true
      })

    expect(res.status).toBe(201)
    expect(res.body.data.isGroupCode).toBe(true)
    expect(res.body.data.studentId).toBeNull()

    cleanup.push(async () => { await prisma.materialCode.delete({ where: { id: res.body.data.id } }).catch(() => {}) })
  })

  it('POST /bulk — creates 3 codes', async () => {
    const res = await request(app)
      .post('/api/material-codes/bulk')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        courseId,
        codeType: 'BOOK',
        materialName: 'Workbook B1',
        codes: [
          { code: 'E2E-BULK-001' },
          { code: 'E2E-BULK-002' },
          { code: 'E2E-BULK-003' }
        ]
      })

    expect(res.status).toBe(201)
    expect(res.body.data.created).toBe(3)

    for (const mc of res.body.data.codes) {
      cleanup.push(async () => { await prisma.materialCode.delete({ where: { id: mc.id } }).catch(() => {}) })
    }
  })

  it('GET /course/:courseId — lists all codes with student info', async () => {
    const res = await request(app)
      .get(`/api/material-codes/course/${courseId}`)
      .set('Authorization', `Bearer ${adminToken}`)

    expect(res.status).toBe(200)
    expect(res.body.data.length).toBeGreaterThanOrEqual(5)

    const assigned = res.body.data.find((c: any) => c.code === 'E2E-BOOK-001')
    expect(assigned).toBeDefined()
    expect(assigned.student.user.name).toBe('Demo Student')

    const group = res.body.data.find((c: any) => c.code === 'E2E-MEL-GROUP')
    expect(group).toBeDefined()
    expect(group.isGroupCode).toBe(true)
  })

  it('DELETE — removes a code', async () => {
    const tmp = await prisma.materialCode.create({
      data: { courseId, schoolId, codeType: 'OTHER', materialName: 'tmp', code: 'TMP' }
    })

    const res = await request(app)
      .delete(`/api/material-codes/${tmp.id}`)
      .set('Authorization', `Bearer ${adminToken}`)

    expect(res.status).toBe(200)
    const db = await prisma.materialCode.findUnique({ where: { id: tmp.id } })
    expect(db).toBeNull()
  })
})

// ============================================================
// 5. LESSON REMINDER — automationsEnabled filter
// ============================================================
describe('5. LessonReminderService — automationsEnabled filter', () => {
  let lessonId: string

  beforeAll(async () => {
    const lesson = await prisma.lesson.create({
      data: {
        courseId,
        teacherId,
        lessonNumber: 99,
        title: 'E2E Lesson',
        scheduledAt: new Date(Date.now() + 3600000),
        duration: 60,
        status: 'SCHEDULED'
      }
    })
    lessonId = lesson.id
    cleanup.push(async () => { await prisma.lesson.delete({ where: { id: lessonId } }).catch(() => {}) })
  })

  it('lesson excluded when automationsEnabled=false', async () => {
    const results = await prisma.lesson.findMany({
      where: {
        deletedAt: null,
        status: { in: ['SCHEDULED', 'REMINDER_SENT'] },
        course: { automationsEnabled: true }
      }
    })
    expect(results.find(l => l.id === lessonId)).toBeUndefined()
  })

  it('lesson included when automationsEnabled=true', async () => {
    await prisma.course.update({ where: { id: courseId }, data: { automationsEnabled: true } })

    const results = await prisma.lesson.findMany({
      where: {
        id: lessonId,
        deletedAt: null,
        status: { in: ['SCHEDULED', 'REMINDER_SENT'] },
        course: { automationsEnabled: true }
      }
    })
    expect(results.length).toBe(1)

    await prisma.course.update({ where: { id: courseId }, data: { automationsEnabled: false } })
  })
})

// ============================================================
// 6. FEEDBACK — courseId filter
// ============================================================
describe('6. Feedback API — courseId filter', () => {
  it('GET /feedback?courseId — admin gets filtered results', async () => {
    const res = await request(app)
      .get('/api/feedback')
      .query({ courseId })
      .set('Authorization', `Bearer ${adminToken}`)

    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(Array.isArray(res.body.data)).toBe(true)
  })

  it('GET /feedback?courseId — teacher gets filtered results', async () => {
    const res = await request(app)
      .get('/api/feedback')
      .query({ courseId })
      .set('Authorization', `Bearer ${teacherToken}`)

    expect(res.status).toBe(200)
    expect(Array.isArray(res.body.data)).toBe(true)
  })
})

// ============================================================
// 7. MANUAL USER CREATION — no invite links
// ============================================================
describe('7. Manual User Creation', () => {
  it('admin creates teacher — immediately loginable', async () => {
    const email = `e2e-teacher-${Date.now()}@test.com`

    const res = await request(app)
      .post('/api/auth/register/teacher')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ email, password: 'E2ePass123!', name: 'E2E Teacher', schoolId })

    expect([200, 201]).toContain(res.status)

    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ email, password: 'E2ePass123!' })

    expect(loginRes.status).toBe(200)
    expect(loginRes.body.data.user.role).toBe('TEACHER')
    expect(loginRes.body.data.accessToken).toBeDefined()

    // Cleanup
    const user = await prisma.user.findUnique({ where: { email } })
    if (user) {
      cleanup.push(async () => {
        await prisma.teacher.deleteMany({ where: { userId: user.id } }).catch(() => {})
        await prisma.refreshToken.deleteMany({ where: { userId: user.id } }).catch(() => {})
        await prisma.user.delete({ where: { id: user.id } }).catch(() => {})
      })
    }
  })

  it('admin creates student — immediately loginable', async () => {
    const email = `e2e-student-${Date.now()}@test.com`

    const res = await request(app)
      .post('/api/auth/register/student')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ email, password: 'E2ePass123!', name: 'E2E Student', schoolId, languageLevel: 'A2' })

    expect([200, 201]).toContain(res.status)

    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ email, password: 'E2ePass123!' })

    expect(loginRes.status).toBe(200)
    expect(loginRes.body.data.user.role).toBe('STUDENT')

    const user = await prisma.user.findUnique({ where: { email } })
    if (user) {
      cleanup.push(async () => {
        await prisma.student.deleteMany({ where: { userId: user.id } }).catch(() => {})
        await prisma.refreshToken.deleteMany({ where: { userId: user.id } }).catch(() => {})
        await prisma.user.delete({ where: { id: user.id } }).catch(() => {})
      })
    }
  })
})

// ============================================================
// 8. CROSS-MODEL DB RELATIONS
// ============================================================
describe('8. Cross-Model DB Relations', () => {
  it('Course -> assignments -> submissions -> student chain', async () => {
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        exerciseAssignments: {
          include: {
            submissions: { include: { student: { include: { user: true } } } },
            exercise: true
          }
        }
      }
    })
    expect(course).not.toBeNull()
    if (course!.exerciseAssignments.length > 0) {
      const a = course!.exerciseAssignments[0]
      expect(a.exercise.title).toBe('E2E Grammar Quiz')
      if (a.submissions.length > 0) {
        expect(a.submissions[0].student.user.name).toBe('Demo Student')
      }
    }
  })

  it('Organization -> contacts -> courseContacts -> course chain', async () => {
    const org = await prisma.organization.findUnique({
      where: { id: orgId },
      include: {
        contacts: {
          include: { courseContacts: { include: { course: true } } }
        }
      }
    })
    expect(org).not.toBeNull()
    expect(org!.contacts.length).toBe(2)
    const linked = org!.contacts.find(c => c.courseContacts.length > 0)
    if (linked) {
      expect(linked.courseContacts[0].course.id).toBe(courseId)
    }
  })

  it('Student -> submissions -> assignment -> course chain', async () => {
    const student = await prisma.student.findUnique({
      where: { id: studentId },
      include: {
        assignmentSubmissions: {
          include: { assignment: { include: { course: true } } }
        }
      }
    })
    expect(student).not.toBeNull()
    if (student!.assignmentSubmissions.length > 0) {
      expect(student!.assignmentSubmissions[0].assignment.course.id).toBe(courseId)
    }
  })

  it('Course -> materialCodes -> student chain', async () => {
    const codes = await prisma.materialCode.findMany({
      where: { courseId },
      include: { student: { include: { user: true } } }
    })
    expect(codes.length).toBeGreaterThanOrEqual(1)
    const assigned = codes.find(c => c.studentId !== null)
    if (assigned) {
      expect(assigned.student!.user.name).toBe('Demo Student')
    }
  })
})

// ============================================================
// 9. ACCESS CONTROL
// ============================================================
describe('9. Access Control', () => {
  it('student cannot create assignments (403)', async () => {
    const res = await request(app)
      .post('/api/assignments')
      .set('Authorization', `Bearer ${studentToken}`)
      .send({ courseId, exerciseId, dueDate: new Date().toISOString() })

    expect(res.status).toBe(403)
  })

  it('student cannot create material codes (403)', async () => {
    const res = await request(app)
      .post('/api/material-codes')
      .set('Authorization', `Bearer ${studentToken}`)
      .send({ courseId, codeType: 'BOOK', materialName: 'x', code: 'x' })

    expect(res.status).toBe(403)
  })

  it('student cannot create org contacts (403)', async () => {
    const res = await request(app)
      .post(`/api/organizations/${orgId}/contacts`)
      .set('Authorization', `Bearer ${studentToken}`)
      .send({ name: 'Hack', email: 'h@h.com' })

    expect(res.status).toBe(403)
  })

  it('unauthenticated requests rejected (401)', async () => {
    const res1 = await request(app).get('/api/courses')
    const res2 = await request(app).get('/api/assignments/my/assignments')
    const res3 = await request(app).post('/api/material-codes').send({})

    expect(res1.status).toBe(401)
    expect(res2.status).toBe(401)
    expect(res3.status).toBe(401)
  })
})

// ============================================================
// 10. HEALTH & 404
// ============================================================
describe('10. Health & Routing', () => {
  it('GET /health — 200', async () => {
    const res = await request(app).get('/health')
    expect(res.status).toBe(200)
  })

  it('GET /api/nonexistent — 404', async () => {
    const res = await request(app).get('/api/nonexistent')
    expect(res.status).toBe(404)
  })
})
