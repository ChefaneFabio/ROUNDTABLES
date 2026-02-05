import { Router, Request, Response } from 'express'
import Joi from 'joi'
import { prisma } from '../config/database'
import { validateRequest } from '../middleware/validateRequest'
import { authenticate } from '../middleware/auth'
import { requireTeacher, requireLessonAccess } from '../middleware/rbac'
import { apiResponse, handleError } from '../utils/apiResponse'
import { UPLOAD } from '../utils/constants'

const router = Router()

// Validation schemas
const createMaterialSchema = Joi.object({
  lessonId: Joi.string().required(),
  title: Joi.string().min(2).max(200).required(),
  description: Joi.string().max(1000).optional(),
  type: Joi.string().valid('PDF', 'VIDEO', 'LINK', 'IMAGE', 'DOCUMENT', 'AUDIO', 'OTHER').required(),
  url: Joi.string().uri().required(),
  fileSize: Joi.number().integer().min(0).optional(),
  mimeType: Joi.string().max(100).optional()
})

const updateMaterialSchema = Joi.object({
  title: Joi.string().min(2).max(200).optional(),
  description: Joi.string().max(1000).optional().allow(null),
  url: Joi.string().uri().optional(),
  orderIndex: Joi.number().integer().min(0).optional()
})

const reorderMaterialsSchema = Joi.object({
  materialIds: Joi.array().items(Joi.string()).min(1).required()
})

// Get materials for a lesson
router.get('/lesson/:lessonId', authenticate, requireLessonAccess, async (req: Request, res: Response) => {
  try {
    const { lessonId } = req.params

    const materials = await prisma.material.findMany({
      where: { lessonId },
      orderBy: { orderIndex: 'asc' }
    })

    res.json(apiResponse.success(materials))
  } catch (error) {
    handleError(res, error)
  }
})

// Get material by ID
router.get('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const material = await prisma.material.findUnique({
      where: { id },
      include: {
        lesson: {
          select: {
            id: true,
            title: true,
            courseId: true,
            course: { select: { id: true, name: true, schoolId: true } }
          }
        }
      }
    })

    if (!material) {
      return res.status(404).json(apiResponse.error('Material not found', 'NOT_FOUND'))
    }

    // Check access - enrolled students, assigned teachers, school admin
    const course = material.lesson.course
    let canAccess = req.user?.role === 'ADMIN' || req.user?.schoolId === course.schoolId

    if (!canAccess && req.user?.studentId) {
      const enrollment = await prisma.enrollment.findFirst({
        where: { studentId: req.user.studentId, courseId: course.id, status: 'ACTIVE' }
      })
      canAccess = !!enrollment
    }

    if (!canAccess && req.user?.teacherId) {
      canAccess = await prisma.lesson.findFirst({
        where: { id: material.lessonId, teacherId: req.user.teacherId }
      }) !== null
    }

    if (!canAccess) {
      return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
    }

    res.json(apiResponse.success(material))
  } catch (error) {
    handleError(res, error)
  }
})

// Create material
router.post('/', authenticate, requireTeacher, validateRequest(createMaterialSchema), async (req: Request, res: Response) => {
  try {
    const { lessonId, ...data } = req.body

    const lesson = await prisma.lesson.findFirst({
      where: { id: lessonId, deletedAt: null },
      include: {
        course: true,
        _count: { select: { materials: true } }
      }
    })

    if (!lesson) {
      return res.status(404).json(apiResponse.error('Lesson not found', 'NOT_FOUND'))
    }

    // Check access - assigned teacher or school admin
    const canCreate = req.user?.role === 'ADMIN' ||
      (req.user?.role === 'LANGUAGE_SCHOOL' && req.user.schoolId === lesson.course.schoolId) ||
      (req.user?.teacherId === lesson.teacherId)

    if (!canCreate) {
      return res.status(403).json(apiResponse.error('Not authorized to add materials to this lesson', 'FORBIDDEN'))
    }

    // Check material limit
    if (lesson._count.materials >= UPLOAD.MAX_FILES_PER_LESSON) {
      return res.status(400).json(
        apiResponse.error(`Maximum ${UPLOAD.MAX_FILES_PER_LESSON} materials per lesson`, 'MAX_MATERIALS_REACHED')
      )
    }

    const material = await prisma.material.create({
      data: {
        lessonId,
        ...data,
        orderIndex: lesson._count.materials
      }
    })

    res.status(201).json(apiResponse.success(material, 'Material added successfully'))
  } catch (error) {
    handleError(res, error)
  }
})

// Update material
router.put('/:id', authenticate, requireTeacher, validateRequest(updateMaterialSchema), async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const material = await prisma.material.findUnique({
      where: { id },
      include: { lesson: { include: { course: true } } }
    })

    if (!material) {
      return res.status(404).json(apiResponse.error('Material not found', 'NOT_FOUND'))
    }

    // Check access
    const canEdit = req.user?.role === 'ADMIN' ||
      (req.user?.role === 'LANGUAGE_SCHOOL' && req.user.schoolId === material.lesson.course.schoolId) ||
      (req.user?.teacherId === material.lesson.teacherId)

    if (!canEdit) {
      return res.status(403).json(apiResponse.error('Not authorized to edit this material', 'FORBIDDEN'))
    }

    const updated = await prisma.material.update({
      where: { id },
      data: req.body
    })

    res.json(apiResponse.success(updated, 'Material updated successfully'))
  } catch (error) {
    handleError(res, error)
  }
})

// Reorder materials
router.post('/lesson/:lessonId/reorder', authenticate, requireTeacher, validateRequest(reorderMaterialsSchema), async (req: Request, res: Response) => {
  try {
    const { lessonId } = req.params
    const { materialIds } = req.body

    const lesson = await prisma.lesson.findFirst({
      where: { id: lessonId, deletedAt: null },
      include: { course: true }
    })

    if (!lesson) {
      return res.status(404).json(apiResponse.error('Lesson not found', 'NOT_FOUND'))
    }

    // Check access
    const canReorder = req.user?.role === 'ADMIN' ||
      (req.user?.role === 'LANGUAGE_SCHOOL' && req.user.schoolId === lesson.course.schoolId) ||
      (req.user?.teacherId === lesson.teacherId)

    if (!canReorder) {
      return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
    }

    // Verify all materials belong to the lesson
    const materials = await prisma.material.findMany({
      where: { id: { in: materialIds }, lessonId }
    })

    if (materials.length !== materialIds.length) {
      return res.status(400).json(apiResponse.error('Some materials not found in this lesson', 'INVALID_MATERIALS'))
    }

    // Update order indices
    await prisma.$transaction(
      materialIds.map((id: string, index: number) =>
        prisma.material.update({
          where: { id },
          data: { orderIndex: index }
        })
      )
    )

    const updatedMaterials = await prisma.material.findMany({
      where: { lessonId },
      orderBy: { orderIndex: 'asc' }
    })

    res.json(apiResponse.success(updatedMaterials, 'Materials reordered successfully'))
  } catch (error) {
    handleError(res, error)
  }
})

// Delete material
router.delete('/:id', authenticate, requireTeacher, async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const material = await prisma.material.findUnique({
      where: { id },
      include: { lesson: { include: { course: true } } }
    })

    if (!material) {
      return res.status(404).json(apiResponse.error('Material not found', 'NOT_FOUND'))
    }

    // Check access
    const canDelete = req.user?.role === 'ADMIN' ||
      (req.user?.role === 'LANGUAGE_SCHOOL' && req.user.schoolId === material.lesson.course.schoolId) ||
      (req.user?.teacherId === material.lesson.teacherId)

    if (!canDelete) {
      return res.status(403).json(apiResponse.error('Not authorized to delete this material', 'FORBIDDEN'))
    }

    await prisma.material.delete({ where: { id } })

    res.json(apiResponse.success(null, 'Material deleted successfully'))
  } catch (error) {
    handleError(res, error)
  }
})

// Get materials by type for a course
router.get('/course/:courseId/by-type', authenticate, requireCourseAccess, async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params
    const { type } = req.query

    const where: any = { lesson: { courseId, deletedAt: null } }
    if (type) where.type = String(type)

    const materials = await prisma.material.findMany({
      where,
      include: {
        lesson: { select: { id: true, title: true, lessonNumber: true } }
      },
      orderBy: [
        { lesson: { lessonNumber: 'asc' } },
        { orderIndex: 'asc' }
      ]
    })

    res.json(apiResponse.success(materials))
  } catch (error) {
    handleError(res, error)
  }
})

// Bulk create materials for a lesson
router.post('/lesson/:lessonId/bulk', authenticate, requireTeacher, async (req: Request, res: Response) => {
  try {
    const { lessonId } = req.params
    const { materials } = req.body

    if (!materials || !Array.isArray(materials) || materials.length === 0) {
      return res.status(400).json(apiResponse.error('Materials array required', 'VALIDATION_ERROR'))
    }

    const lesson = await prisma.lesson.findFirst({
      where: { id: lessonId, deletedAt: null },
      include: {
        course: true,
        _count: { select: { materials: true } }
      }
    })

    if (!lesson) {
      return res.status(404).json(apiResponse.error('Lesson not found', 'NOT_FOUND'))
    }

    // Check access
    const canCreate = req.user?.role === 'ADMIN' ||
      (req.user?.role === 'LANGUAGE_SCHOOL' && req.user.schoolId === lesson.course.schoolId) ||
      (req.user?.teacherId === lesson.teacherId)

    if (!canCreate) {
      return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
    }

    // Check material limit
    const remainingSlots = UPLOAD.MAX_FILES_PER_LESSON - lesson._count.materials
    if (materials.length > remainingSlots) {
      return res.status(400).json(
        apiResponse.error(`Can only add ${remainingSlots} more materials to this lesson`, 'MAX_MATERIALS_EXCEEDED')
      )
    }

    // Validate each material
    const schema = Joi.array().items(
      Joi.object({
        title: Joi.string().min(2).max(200).required(),
        description: Joi.string().max(1000).optional(),
        type: Joi.string().valid('PDF', 'VIDEO', 'LINK', 'IMAGE', 'DOCUMENT', 'AUDIO', 'OTHER').required(),
        url: Joi.string().uri().required(),
        fileSize: Joi.number().integer().min(0).optional(),
        mimeType: Joi.string().max(100).optional()
      })
    )

    const { error } = schema.validate(materials)
    if (error) {
      return res.status(400).json(apiResponse.error(error.message, 'VALIDATION_ERROR'))
    }

    const created = await prisma.material.createMany({
      data: materials.map((m: any, index: number) => ({
        lessonId,
        ...m,
        orderIndex: lesson._count.materials + index
      }))
    })

    res.status(201).json(apiResponse.success({ count: created.count }, `${created.count} materials added successfully`))
  } catch (error) {
    handleError(res, error)
  }
})

export default router

// Helper function to check course access
async function requireCourseAccess(req: Request, res: Response, next: Function) {
  const { courseId } = req.params

  if (!courseId) return next()

  const course = await prisma.course.findUnique({
    where: { id: courseId },
    select: { schoolId: true }
  })

  if (!course) {
    return res.status(404).json(apiResponse.error('Course not found', 'NOT_FOUND'))
  }

  if (req.user?.role === 'ADMIN' || req.user?.schoolId === course.schoolId) {
    return next()
  }

  // Check if student is enrolled
  if (req.user?.studentId) {
    const enrollment = await prisma.enrollment.findFirst({
      where: { studentId: req.user.studentId, courseId, status: 'ACTIVE' }
    })
    if (enrollment) return next()
  }

  // Check if teacher is assigned
  if (req.user?.teacherId) {
    const assignment = await prisma.courseTeacher.findFirst({
      where: { teacherId: req.user.teacherId, courseId }
    })
    if (assignment) return next()
  }

  return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
}
