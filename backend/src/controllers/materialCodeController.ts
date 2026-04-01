import { Router, Request, Response } from 'express'
import Joi from 'joi'
import { prisma } from '../config/database'
import { authenticate } from '../middleware/auth'
import { requireRole } from '../middleware/rbac'
import { validateRequest } from '../middleware/validateRequest'
import { apiResponse, handleError } from '../utils/apiResponse'
import { emailService } from '../services/EmailService'

const router = Router()

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

// GET /course/:courseId - Get all material codes for a course
router.get('/course/:courseId', authenticate, requireRole('TEACHER', 'ADMIN'), async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params

    const codes = await prisma.materialCode.findMany({
      where: { courseId },
      include: {
        student: {
          include: { user: { select: { id: true, name: true, email: true } } }
        }
      },
      orderBy: [{ codeType: 'asc' }, { createdAt: 'asc' }]
    })

    res.json(apiResponse.success(codes))
  } catch (error) {
    handleError(res, error)
  }
})

// POST / - Create a single material code
router.post('/', authenticate, requireRole('ADMIN'), validateRequest(createCodeSchema), async (req: Request, res: Response) => {
  try {
    const { courseId, codeType, materialName, code, studentId, isGroupCode } = req.body

    const course = await prisma.course.findUnique({ where: { id: courseId } })
    if (!course) return res.status(404).json(apiResponse.error('Course not found', 'NOT_FOUND'))

    const materialCode = await prisma.materialCode.create({
      data: {
        courseId,
        schoolId: course.schoolId,
        codeType,
        materialName,
        code,
        studentId: studentId || null,
        isGroupCode: isGroupCode ?? false
      }
    })

    res.status(201).json(apiResponse.success(materialCode, 'Material code created'))
  } catch (error) {
    handleError(res, error)
  }
})

// POST /bulk - Bulk create material codes (with optional student assignment by email)
router.post('/bulk', authenticate, requireRole('ADMIN'), validateRequest(bulkCreateSchema), async (req: Request, res: Response) => {
  try {
    const { courseId, codeType, materialName, codes } = req.body

    const course = await prisma.course.findUnique({ where: { id: courseId } })
    if (!course) return res.status(404).json(apiResponse.error('Course not found', 'NOT_FOUND'))

    const results: any[] = []

    for (const entry of codes) {
      let studentId: string | null = null

      if (entry.studentEmail) {
        const user = await prisma.user.findUnique({ where: { email: entry.studentEmail } })
        if (user) {
          const student = await prisma.student.findUnique({ where: { userId: user.id } })
          if (student) studentId = student.id
        }
      }

      const materialCode = await prisma.materialCode.create({
        data: {
          courseId,
          schoolId: course.schoolId,
          codeType,
          materialName,
          code: entry.code,
          studentId,
          isGroupCode: entry.isGroupCode ?? false
        }
      })

      results.push(materialCode)
    }

    res.status(201).json(apiResponse.success({ created: results.length, codes: results }))
  } catch (error) {
    handleError(res, error)
  }
})

// POST /course/:courseId/auto-assign - Auto-assign unassigned codes to enrolled students
router.post('/course/:courseId/auto-assign', authenticate, requireRole('ADMIN'), async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params

    const unassigned = await prisma.materialCode.findMany({
      where: { courseId, studentId: null, isGroupCode: false }
    })

    const enrollments = await prisma.enrollment.findMany({
      where: { courseId, status: 'ACTIVE' },
      include: { student: true }
    })

    let assigned = 0
    for (const code of unassigned) {
      for (const enrollment of enrollments) {
        const hasCode = await prisma.materialCode.findFirst({
          where: { courseId, codeType: code.codeType, studentId: enrollment.studentId }
        })
        if (!hasCode) {
          await prisma.materialCode.update({
            where: { id: code.id },
            data: { studentId: enrollment.studentId }
          })
          assigned++
          break
        }
      }
    }

    res.json(apiResponse.success({ assigned }))
  } catch (error) {
    handleError(res, error)
  }
})

// POST /course/:courseId/send - Send all unsent codes to students and teachers
router.post('/course/:courseId/send', authenticate, requireRole('ADMIN'), async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params

    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        courseTeachers: {
          where: { isPrimary: true },
          include: { teacher: { include: { user: true } } }
        }
      }
    })
    if (!course) return res.status(404).json(apiResponse.error('Course not found', 'NOT_FOUND'))

    const codes = await prisma.materialCode.findMany({
      where: { courseId },
      include: { student: { include: { user: true } } }
    })

    const groupCodes = codes.filter(c => c.isGroupCode)
    const individualCodes = codes.filter(c => !c.isGroupCode && c.studentId)

    let sentToStudents = 0
    let sentToTeachers = 0

    // Group individual codes by student
    const studentCodeMap = new Map<string, typeof codes>()
    for (const code of individualCodes) {
      if (!code.studentId || code.sentToStudent) continue
      if (!studentCodeMap.has(code.studentId)) studentCodeMap.set(code.studentId, [])
      studentCodeMap.get(code.studentId)!.push(code)
    }

    // Send to each student
    for (const [, studentCodes] of studentCodeMap) {
      const student = studentCodes[0].student
      if (!student?.user) continue

      const allCodes = [...studentCodes, ...groupCodes.filter(gc => !gc.sentToStudent)]

      const codeRows = allCodes.map(c => {
        const label = c.isGroupCode ? `${c.codeType} (Group)` : c.codeType
        return `<tr>
          <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb">${label}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-weight:600">${c.materialName}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-family:monospace;background:#f9fafb">${c.code}</td>
        </tr>`
      }).join('')

      const html = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
        <div style="background:#4f46e5;color:#fff;padding:24px;text-align:center;border-radius:8px 8px 0 0">
          <h1 style="margin:0;font-size:24px">Maka Learning Centre</h1>
          <p style="margin:8px 0 0;opacity:0.9">Material Codes for ${course.name}</p>
        </div>
        <div style="padding:24px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px">
          <p>Dear <strong>${student.user.name}</strong>,</p>
          <p>Here are your material codes for <strong>${course.name}</strong>:</p>
          <table style="width:100%;border-collapse:collapse;margin:16px 0">
            <thead><tr style="background:#f3f4f6">
              <th style="padding:8px 12px;text-align:left;font-size:13px">Type</th>
              <th style="padding:8px 12px;text-align:left;font-size:13px">Material</th>
              <th style="padding:8px 12px;text-align:left;font-size:13px">Code</th>
            </tr></thead>
            <tbody>${codeRows}</tbody>
          </table>
        </div>
      </div>`

      try {
        await emailService.sendEmail({
          to: student.user.email,
          subject: `Your Material Codes — ${course.name}`,
          html
        })
        for (const code of studentCodes) {
          await prisma.materialCode.update({
            where: { id: code.id },
            data: { sentToStudent: true, sentAt: new Date() }
          })
        }
        sentToStudents++
      } catch (error) {
        console.error(`[MaterialCodes] Failed to send to ${student.user.email}:`, error)
      }
    }

    // Mark group codes as sent
    for (const gc of groupCodes) {
      if (!gc.sentToStudent) {
        await prisma.materialCode.update({
          where: { id: gc.id },
          data: { sentToStudent: true, sentAt: new Date() }
        })
      }
    }

    // Send to primary teacher
    const primaryTeacher = course.courseTeachers[0]?.teacher?.user
    if (primaryTeacher) {
      const unsentToTeacher = codes.filter(c => !c.sentToTeacher)
      if (unsentToTeacher.length > 0) {
        const teacherRows = groupCodes.map(c =>
          `<tr>
            <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb">${c.codeType}</td>
            <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-weight:600">${c.materialName}</td>
            <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-family:monospace;background:#f9fafb">${c.code}</td>
          </tr>`
        ).join('')

        const materialNames = [...new Set(codes.map(c => c.materialName))].join(', ')

        const html = `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
          <div style="background:#4f46e5;color:#fff;padding:24px;text-align:center;border-radius:8px 8px 0 0">
            <h1 style="margin:0;font-size:24px">Maka Learning Centre</h1>
            <p style="margin:8px 0 0;opacity:0.9">Teacher Info — ${course.name}</p>
          </div>
          <div style="padding:24px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px">
            <p>Dear <strong>${primaryTeacher.name}</strong>,</p>
            <p>Material info for <strong>${course.name}</strong>:</p>
            <p><strong>Materials:</strong> ${materialNames}</p>
            ${groupCodes.length > 0 ? `
              <p><strong>Group Codes:</strong></p>
              <table style="width:100%;border-collapse:collapse;margin:16px 0">
                <thead><tr style="background:#f3f4f6">
                  <th style="padding:8px 12px;text-align:left;font-size:13px">Type</th>
                  <th style="padding:8px 12px;text-align:left;font-size:13px">Material</th>
                  <th style="padding:8px 12px;text-align:left;font-size:13px">Code</th>
                </tr></thead>
                <tbody>${teacherRows}</tbody>
              </table>
            ` : ''}
          </div>
        </div>`

        try {
          await emailService.sendEmail({
            to: primaryTeacher.email,
            subject: `Material Codes — ${course.name}`,
            html
          })
          for (const code of unsentToTeacher) {
            await prisma.materialCode.update({
              where: { id: code.id },
              data: { sentToTeacher: true }
            })
          }
          sentToTeachers++
        } catch (error) {
          console.error(`[MaterialCodes] Failed to send to teacher ${primaryTeacher.email}:`, error)
        }
      }
    }

    res.json(apiResponse.success({ sentToStudents, sentToTeachers }))
  } catch (error) {
    handleError(res, error)
  }
})

// GET /:id - Get single material code
router.get('/:id', authenticate, requireRole('TEACHER', 'ADMIN'), async (req: Request, res: Response) => {
  try {
    const code = await prisma.materialCode.findUnique({
      where: { id: req.params.id },
      include: {
        course: { select: { name: true } },
        student: { include: { user: { select: { name: true, email: true } } } }
      }
    })
    if (!code) return res.status(404).json(apiResponse.error('Material code not found', 'NOT_FOUND'))
    res.json(apiResponse.success(code))
  } catch (error) {
    handleError(res, error)
  }
})

// PUT /:id - Update material code
router.put('/:id', authenticate, requireRole('ADMIN'), async (req: Request, res: Response) => {
  try {
    const { materialName, code, codeType, isGroupCode } = req.body
    const updated = await prisma.materialCode.update({
      where: { id: req.params.id },
      data: { materialName, code, codeType, isGroupCode }
    })
    res.json(apiResponse.success(updated, 'Material code updated'))
  } catch (error) {
    handleError(res, error)
  }
})

// DELETE /:id - Delete a material code
router.delete('/:id', authenticate, requireRole('ADMIN'), async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    await prisma.materialCode.delete({ where: { id } })
    res.json(apiResponse.success(null, 'Material code deleted'))
  } catch (error) {
    handleError(res, error)
  }
})

export default router
