import { Router, Request, Response } from 'express'
import Joi from 'joi'
import { prisma } from '../config/database'
import { validateRequest } from '../middleware/validateRequest'
import { authenticate } from '../middleware/auth'
import { requireSchoolAdmin, requireCourseAccess } from '../middleware/rbac'
import { apiResponse, handleError } from '../utils/apiResponse'
import { VOTING } from '../utils/constants'

const router = Router()

// Validation schemas
const createModuleSchema = Joi.object({
  courseId: Joi.string().required(),
  title: Joi.string().min(2).max(200).required(),
  description: Joi.string().max(2000).optional()
})

const updateModuleSchema = Joi.object({
  title: Joi.string().min(2).max(200).optional(),
  description: Joi.string().max(2000).optional().allow(null),
  orderIndex: Joi.number().integer().min(0).optional()
})

const reorderModulesSchema = Joi.object({
  moduleIds: Joi.array().items(Joi.string()).min(1).required()
})

// Get modules for a course
router.get('/course/:courseId', authenticate, requireCourseAccess, async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params
    const { includeVotes } = req.query

    const modules = await prisma.module.findMany({
      where: { courseId },
      include: includeVotes === 'true' ? {
        _count: { select: { votes: true } }
      } : undefined,
      orderBy: { orderIndex: 'asc' }
    })

    res.json(apiResponse.success(modules))
  } catch (error) {
    handleError(res, error)
  }
})

// Get module by ID
router.get('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const module = await prisma.module.findUnique({
      where: { id },
      include: {
        course: { select: { id: true, name: true, schoolId: true, status: true } },
        lessons: {
          select: { id: true, title: true, lessonNumber: true, scheduledAt: true, status: true }
        },
        _count: { select: { votes: true } }
      }
    })

    if (!module) {
      return res.status(404).json(apiResponse.error('Module not found', 'NOT_FOUND'))
    }

    res.json(apiResponse.success(module))
  } catch (error) {
    handleError(res, error)
  }
})

// Create module
router.post('/', authenticate, requireSchoolAdmin, validateRequest(createModuleSchema), async (req: Request, res: Response) => {
  try {
    const { courseId, title, description } = req.body

    const course = await prisma.course.findFirst({
      where: { id: courseId, deletedAt: null },
      include: { _count: { select: { modules: true } } }
    })

    if (!course) {
      return res.status(404).json(apiResponse.error('Course not found', 'NOT_FOUND'))
    }

    // Check access
    if (req.user?.role !== 'ADMIN' && req.user?.schoolId !== course.schoolId) {
      return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
    }

    // Check if course already has max modules
    if (course._count.modules >= VOTING.MAX_TOPICS_PER_COURSE) {
      return res.status(400).json(
        apiResponse.error(`Maximum ${VOTING.MAX_TOPICS_PER_COURSE} modules per course`, 'MAX_MODULES_REACHED')
      )
    }

    const module = await prisma.module.create({
      data: {
        courseId,
        title,
        description,
        orderIndex: course._count.modules
      }
    })

    res.status(201).json(apiResponse.success(module, 'Module created successfully'))
  } catch (error) {
    handleError(res, error)
  }
})

// Update module
router.put('/:id', authenticate, requireSchoolAdmin, validateRequest(updateModuleSchema), async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const module = await prisma.module.findUnique({
      where: { id },
      include: { course: true }
    })

    if (!module) {
      return res.status(404).json(apiResponse.error('Module not found', 'NOT_FOUND'))
    }

    // Check access
    if (req.user?.role !== 'ADMIN' && req.user?.schoolId !== module.course.schoolId) {
      return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
    }

    const updated = await prisma.module.update({
      where: { id },
      data: req.body
    })

    res.json(apiResponse.success(updated, 'Module updated successfully'))
  } catch (error) {
    handleError(res, error)
  }
})

// Reorder modules
router.post('/course/:courseId/reorder', authenticate, requireSchoolAdmin, validateRequest(reorderModulesSchema), async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params
    const { moduleIds } = req.body

    const course = await prisma.course.findFirst({
      where: { id: courseId, deletedAt: null }
    })

    if (!course) {
      return res.status(404).json(apiResponse.error('Course not found', 'NOT_FOUND'))
    }

    // Check access
    if (req.user?.role !== 'ADMIN' && req.user?.schoolId !== course.schoolId) {
      return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
    }

    // Verify all modules belong to the course
    const modules = await prisma.module.findMany({
      where: { id: { in: moduleIds }, courseId }
    })

    if (modules.length !== moduleIds.length) {
      return res.status(400).json(apiResponse.error('Some modules not found in this course', 'INVALID_MODULES'))
    }

    // Update order indices
    await prisma.$transaction(
      moduleIds.map((id: string, index: number) =>
        prisma.module.update({
          where: { id },
          data: { orderIndex: index }
        })
      )
    )

    const updatedModules = await prisma.module.findMany({
      where: { courseId },
      orderBy: { orderIndex: 'asc' }
    })

    res.json(apiResponse.success(updatedModules, 'Modules reordered successfully'))
  } catch (error) {
    handleError(res, error)
  }
})

// Get voting data for a course
router.get('/course/:courseId/voting', authenticate, async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params

    const course = await prisma.course.findFirst({
      where: { id: courseId, deletedAt: null, status: 'TOPIC_VOTING' },
      include: { school: { select: { name: true } } }
    })

    if (!course) {
      return res.status(404).json(apiResponse.error('Course not found or not in voting phase', 'NOT_FOUND'))
    }

    const modules = await prisma.module.findMany({
      where: { courseId },
      include: { _count: { select: { votes: true } } },
      orderBy: { orderIndex: 'asc' }
    })

    // Check if student has already voted
    let hasVoted = false
    let studentVotes: string[] = []
    if (req.user?.studentId) {
      const votes = await prisma.topicVote.findMany({
        where: { studentId: req.user.studentId, courseId },
        select: { moduleId: true }
      })
      hasVoted = votes.length > 0
      studentVotes = votes.map(v => v.moduleId)
    }

    res.json(apiResponse.success({
      course: {
        id: course.id,
        name: course.name,
        schoolName: course.school.name
      },
      modules,
      hasVoted,
      studentVotes,
      requiredVotes: VOTING.REQUIRED_TOPICS
    }))
  } catch (error) {
    handleError(res, error)
  }
})

// Submit votes
router.post('/course/:courseId/vote', authenticate, async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params
    const { moduleIds } = req.body

    if (!req.user?.studentId) {
      return res.status(403).json(apiResponse.error('Only students can vote', 'FORBIDDEN'))
    }

    if (!moduleIds || !Array.isArray(moduleIds)) {
      return res.status(400).json(apiResponse.error('Module IDs required', 'VALIDATION_ERROR'))
    }

    if (moduleIds.length !== VOTING.REQUIRED_TOPICS) {
      return res.status(400).json(
        apiResponse.error(`Must select exactly ${VOTING.REQUIRED_TOPICS} modules`, 'INVALID_VOTE_COUNT')
      )
    }

    // Verify course is in voting phase
    const course = await prisma.course.findFirst({
      where: { id: courseId, deletedAt: null, status: 'TOPIC_VOTING' }
    })

    if (!course) {
      return res.status(400).json(apiResponse.error('Course is not accepting votes', 'VOTING_CLOSED'))
    }

    // Verify student is enrolled
    const enrollment = await prisma.enrollment.findFirst({
      where: { studentId: req.user.studentId, courseId, status: 'ACTIVE' }
    })

    if (!enrollment) {
      return res.status(403).json(apiResponse.error('Must be enrolled to vote', 'NOT_ENROLLED'))
    }

    // Verify modules belong to the course
    const modules = await prisma.module.findMany({
      where: { id: { in: moduleIds }, courseId }
    })

    if (modules.length !== moduleIds.length) {
      return res.status(400).json(apiResponse.error('Invalid module selection', 'INVALID_MODULES'))
    }

    // Delete existing votes and create new ones
    await prisma.$transaction(async (tx) => {
      await tx.topicVote.deleteMany({
        where: { studentId: req.user!.studentId!, courseId }
      })

      await tx.topicVote.createMany({
        data: moduleIds.map((moduleId: string) => ({
          studentId: req.user!.studentId!,
          moduleId,
          courseId
        }))
      })
    })

    res.json(apiResponse.success({ voted: moduleIds.length }, 'Vote submitted successfully'))
  } catch (error) {
    handleError(res, error)
  }
})

// Finalize voting (select top modules)
router.post('/course/:courseId/finalize-voting', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params

    const course = await prisma.course.findFirst({
      where: { id: courseId, deletedAt: null, status: 'TOPIC_VOTING' }
    })

    if (!course) {
      return res.status(400).json(apiResponse.error('Course is not in voting phase', 'INVALID_STATUS'))
    }

    // Check access
    if (req.user?.role !== 'ADMIN' && req.user?.schoolId !== course.schoolId) {
      return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
    }

    // Get vote counts
    const modules = await prisma.module.findMany({
      where: { courseId },
      include: { _count: { select: { votes: true } } },
      orderBy: { orderIndex: 'asc' }
    })

    // Sort by vote count and select top N
    const sortedModules = [...modules].sort((a, b) => b._count.votes - a._count.votes)
    const selectedIds = sortedModules.slice(0, VOTING.REQUIRED_TOPICS).map(m => m.id)

    // Update selected modules
    await prisma.$transaction(async (tx) => {
      // Mark selected modules
      await tx.module.updateMany({
        where: { id: { in: selectedIds } },
        data: { isSelected: true }
      })

      // Mark unselected modules
      await tx.module.updateMany({
        where: { courseId, id: { notIn: selectedIds } },
        data: { isSelected: false }
      })

      // Update course status
      await tx.course.update({
        where: { id: courseId },
        data: { status: 'SCHEDULED' }
      })
    })

    const updatedModules = await prisma.module.findMany({
      where: { courseId },
      include: { _count: { select: { votes: true } } },
      orderBy: [{ isSelected: 'desc' }, { orderIndex: 'asc' }]
    })

    res.json(apiResponse.success({
      selectedModules: updatedModules.filter(m => m.isSelected),
      allModules: updatedModules
    }, `Voting finalized. ${selectedIds.length} modules selected.`))
  } catch (error) {
    handleError(res, error)
  }
})

// Delete module
router.delete('/:id', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const module = await prisma.module.findUnique({
      where: { id },
      include: {
        course: true,
        lessons: { select: { id: true } }
      }
    })

    if (!module) {
      return res.status(404).json(apiResponse.error('Module not found', 'NOT_FOUND'))
    }

    // Check access
    if (req.user?.role !== 'ADMIN' && req.user?.schoolId !== module.course.schoolId) {
      return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
    }

    // Can't delete if module is assigned to lessons
    if (module.lessons.length > 0) {
      return res.status(400).json(
        apiResponse.error('Cannot delete module with assigned lessons', 'HAS_LESSONS')
      )
    }

    await prisma.$transaction(async (tx) => {
      // Delete votes for this module
      await tx.topicVote.deleteMany({ where: { moduleId: id } })
      // Delete the module
      await tx.module.delete({ where: { id } })
    })

    res.json(apiResponse.success(null, 'Module deleted successfully'))
  } catch (error) {
    handleError(res, error)
  }
})

export default router
