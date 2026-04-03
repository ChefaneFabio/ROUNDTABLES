import { Router, Request, Response } from 'express'
import Joi from 'joi'
import path from 'path'
import fs from 'fs'
import multer from 'multer'
import { prisma } from '../config/database'
import { authenticate } from '../middleware/auth'
import { requireRole } from '../middleware/rbac'
import { validateRequest } from '../middleware/validateRequest'
import { apiResponse, handleError } from '../utils/apiResponse'

const router = Router()

// File upload config for assignment submissions
const uploadDir = path.join(__dirname, '../../uploads/assignments')
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
    const ext = path.extname(file.originalname)
    cb(null, `submission-${uniqueSuffix}${ext}`)
  }
})

const upload = multer({
  storage,
  limits: { fileSize: 25 * 1024 * 1024 }, // 25MB
  fileFilter: (_req, file, cb) => {
    const allowed = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg', 'image/png', 'image/gif',
      'audio/mpeg', 'audio/wav', 'audio/webm', 'audio/ogg',
      'text/plain'
    ]
    if (allowed.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error(`File type ${file.mimetype} not allowed`))
    }
  }
})

// Validation schemas
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

// ============================================================
// TEACHER/ADMIN ENDPOINTS
// ============================================================

// POST / - Create an exercise assignment for a course
router.post('/', authenticate, requireRole('TEACHER', 'ADMIN'), validateRequest(createAssignmentSchema), async (req: Request, res: Response) => {
  try {
    const { courseId, exerciseId, title, instructions, dueDate, isPublished, allowFileUpload } = req.body

    const assignment = await prisma.exerciseAssignment.create({
      data: {
        courseId,
        exerciseId,
        assignedById: (req as any).user.id,
        title,
        instructions,
        dueDate: new Date(dueDate),
        isPublished: isPublished ?? false,
        allowFileUpload: allowFileUpload ?? false
      },
      include: {
        exercise: { select: { id: true, title: true, type: true } },
        course: { select: { id: true, name: true } }
      }
    })

    res.status(201).json(apiResponse.success(assignment, 'Assignment created'))
  } catch (error) {
    handleError(res, error)
  }
})

// GET /course/:courseId - List assignments for a course
router.get('/course/:courseId', authenticate, async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params
    const user = (req as any).user

    const where: any = { courseId }
    if (user.role === 'STUDENT') {
      where.isPublished = true
    }

    const assignments = await prisma.exerciseAssignment.findMany({
      where,
      include: {
        exercise: { select: { id: true, title: true, type: true, language: true, cefrLevel: true } },
        assignedBy: { select: { id: true, name: true } },
        submissions: user.role === 'STUDENT'
          ? { where: { student: { userId: user.id } } }
          : { include: { student: { include: { user: { select: { name: true, email: true } } } } } }
      },
      orderBy: { dueDate: 'asc' }
    })

    res.json(apiResponse.success(assignments))
  } catch (error) {
    handleError(res, error)
  }
})

// PUT /:id - Update an assignment
router.put('/:id', authenticate, requireRole('TEACHER', 'ADMIN'), validateRequest(updateAssignmentSchema), async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const assignment = await prisma.exerciseAssignment.update({
      where: { id },
      data: req.body,
      include: {
        exercise: { select: { id: true, title: true, type: true } }
      }
    })

    res.json(apiResponse.success(assignment))
  } catch (error) {
    handleError(res, error)
  }
})

// DELETE /:id - Delete an assignment
router.delete('/:id', authenticate, requireRole('TEACHER', 'ADMIN'), async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    await prisma.assignmentSubmission.deleteMany({ where: { assignmentId: id } })
    await prisma.exerciseAssignment.delete({ where: { id } })
    res.json(apiResponse.success(null, 'Assignment deleted'))
  } catch (error) {
    handleError(res, error)
  }
})

// GET /:id/submissions - Get all submissions for an assignment (teacher view)
router.get('/:id/submissions', authenticate, requireRole('TEACHER', 'ADMIN'), async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const submissions = await prisma.assignmentSubmission.findMany({
      where: { assignmentId: id },
      include: {
        student: { include: { user: { select: { id: true, name: true, email: true } } } },
        attempt: { select: { id: true, score: true, maxScore: true, percentage: true, status: true } }
      },
      orderBy: { createdAt: 'desc' }
    })

    res.json(apiResponse.success(submissions))
  } catch (error) {
    handleError(res, error)
  }
})

// PUT /submissions/:submissionId/grade - Grade a submission
router.put('/submissions/:submissionId/grade', authenticate, requireRole('TEACHER', 'ADMIN'), validateRequest(gradeSubmissionSchema), async (req: Request, res: Response) => {
  try {
    const { submissionId } = req.params
    const { grade, teacherNotes } = req.body

    const submission = await prisma.assignmentSubmission.update({
      where: { id: submissionId },
      data: { grade, teacherNotes, status: 'GRADED' }
    })

    res.json(apiResponse.success(submission))
  } catch (error) {
    handleError(res, error)
  }
})

// ============================================================
// STUDENT ENDPOINTS
// ============================================================

// POST /:id/submit - Submit an assignment (with optional file upload)
router.post('/:id/submit', authenticate, upload.single('file'), async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const user = (req as any).user

    const student = await prisma.student.findUnique({ where: { userId: user.id } })
    if (!student) return res.status(403).json(apiResponse.error('Student profile not found', 'FORBIDDEN'))

    const assignment = await prisma.exerciseAssignment.findUnique({ where: { id } })
    if (!assignment) return res.status(404).json(apiResponse.error('Assignment not found', 'NOT_FOUND'))

    const now = new Date()
    const isLate = now > assignment.dueDate
    const file = req.file

    const submission = await prisma.assignmentSubmission.upsert({
      where: { assignmentId_studentId: { assignmentId: id, studentId: student.id } },
      create: {
        assignmentId: id,
        studentId: student.id,
        status: isLate ? 'LATE' : 'SUBMITTED',
        fileUrl: file ? `/uploads/assignments/${file.filename}` : null,
        fileName: file ? file.originalname : null,
        fileSize: file ? file.size : null,
        submittedAt: now
      },
      update: {
        status: isLate ? 'LATE' : 'SUBMITTED',
        ...(file && {
          fileUrl: `/uploads/assignments/${file.filename}`,
          fileName: file.originalname,
          fileSize: file.size
        }),
        submittedAt: now
      }
    })

    res.json(apiResponse.success(submission))
  } catch (error) {
    handleError(res, error)
  }
})

// GET /:id/submission/download - Download own submission file
router.get('/:id/submission/download', authenticate, async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const user = (req as any).user

    const student = await prisma.student.findUnique({ where: { userId: user.id } })
    if (!student) return res.status(403).json(apiResponse.error('Student profile not found', 'FORBIDDEN'))

    const submission = await prisma.assignmentSubmission.findUnique({
      where: { assignmentId_studentId: { assignmentId: id, studentId: student.id } }
    })

    if (!submission?.fileUrl) {
      return res.status(404).json(apiResponse.error('No file found for this submission', 'NOT_FOUND'))
    }

    const filePath = path.join(__dirname, '../..', submission.fileUrl)
    if (!fs.existsSync(filePath)) {
      return res.status(404).json(apiResponse.error('File not found on server', 'NOT_FOUND'))
    }

    return res.download(filePath, submission.fileName || 'submission')
  } catch (error) {
    handleError(res, error)
  }
})

// GET /submissions/:submissionId/download - Teacher download of student submission
router.get('/submissions/:submissionId/download', authenticate, requireRole('TEACHER', 'ADMIN'), async (req: Request, res: Response) => {
  try {
    const { submissionId } = req.params

    const submission = await prisma.assignmentSubmission.findUnique({
      where: { id: submissionId }
    })

    if (!submission?.fileUrl) {
      return res.status(404).json(apiResponse.error('No file found', 'NOT_FOUND'))
    }

    const filePath = path.join(__dirname, '../..', submission.fileUrl)
    if (!fs.existsSync(filePath)) {
      return res.status(404).json(apiResponse.error('File not found on server', 'NOT_FOUND'))
    }

    return res.download(filePath, submission.fileName || 'submission')
  } catch (error) {
    handleError(res, error)
  }
})

// GET /my/assignments - Get all assignments for the logged-in student
router.get('/my/assignments', authenticate, async (req: Request, res: Response) => {
  try {
    const user = (req as any).user
    const student = await prisma.student.findUnique({ where: { userId: user.id } })
    if (!student) return res.status(403).json(apiResponse.error('Student profile not found', 'FORBIDDEN'))

    const enrollments = await prisma.enrollment.findMany({
      where: { studentId: student.id, status: 'ACTIVE' },
      select: { courseId: true }
    })
    const courseIds = enrollments.map(e => e.courseId)

    const assignments = await prisma.exerciseAssignment.findMany({
      where: { courseId: { in: courseIds }, isPublished: true },
      include: {
        exercise: { select: { id: true, title: true, type: true } },
        course: { select: { id: true, name: true } },
        submissions: { where: { studentId: student.id } }
      },
      orderBy: { dueDate: 'asc' }
    })

    res.json(apiResponse.success(assignments))
  } catch (error) {
    handleError(res, error)
  }
})

export default router
