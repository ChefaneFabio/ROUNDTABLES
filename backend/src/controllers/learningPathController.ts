import { Router, Request, Response } from 'express'
import Joi from 'joi'
import { prisma } from '../config/database'
import { validateRequest } from '../middleware/validateRequest'
import { authenticate } from '../middleware/auth'
import { requireSchoolAdmin } from '../middleware/rbac'
import { apiResponse, handleError } from '../utils/apiResponse'
import { PAGINATION } from '../utils/constants'

const router = Router()

// ─── VALIDATION ────────────────────────────────────

const createPathSchema = Joi.object({
  name: Joi.string().required().max(200),
  description: Joi.string().max(2000).optional().allow(''),
  language: Joi.string().optional(),
  targetLevel: Joi.string().valid('A1', 'A2', 'B1', 'B2', 'C1', 'C2').optional(),
  difficulty: Joi.string().valid('beginner', 'intermediate', 'advanced').optional(),
  thumbnailUrl: Joi.string().uri().optional().allow('', null),
  estimatedHours: Joi.number().integer().min(1).optional(),
  isPublished: Joi.boolean().optional(),
  courses: Joi.array().items(Joi.object({
    courseId: Joi.string().required(),
    orderIndex: Joi.number().integer().min(0).required(),
    isRequired: Joi.boolean().default(true),
    minScore: Joi.number().integer().min(0).max(100).optional(),
  })).optional(),
})

const updatePathSchema = Joi.object({
  name: Joi.string().max(200).optional(),
  description: Joi.string().max(2000).optional().allow(''),
  language: Joi.string().optional(),
  targetLevel: Joi.string().valid('A1', 'A2', 'B1', 'B2', 'C1', 'C2').optional().allow(null),
  difficulty: Joi.string().valid('beginner', 'intermediate', 'advanced').optional(),
  thumbnailUrl: Joi.string().uri().optional().allow('', null),
  estimatedHours: Joi.number().integer().min(1).optional().allow(null),
  isPublished: Joi.boolean().optional(),
  courses: Joi.array().items(Joi.object({
    courseId: Joi.string().required(),
    orderIndex: Joi.number().integer().min(0).required(),
    isRequired: Joi.boolean().default(true),
    minScore: Joi.number().integer().min(0).max(100).optional(),
  })).optional(),
})

// ─── ADMIN: MANAGE PATHS ───────────────────────────

// GET /api/learning-paths — List all paths (admin sees all, students see published)
router.get('/', authenticate, async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = PAGINATION.DEFAULT_LIMIT } = req.query
    const isAdmin = req.user?.role === 'ADMIN'

    const where: any = {}
    if (isAdmin) {
      where.schoolId = req.user?.schoolId
    } else {
      where.isPublished = true
      where.school = { id: req.user?.schoolId }
    }

    const [paths, total] = await Promise.all([
      prisma.learningPath.findMany({
        where,
        include: {
          courses: {
            include: { course: { select: { id: true, name: true, courseType: true, language: true } } },
            orderBy: { orderIndex: 'asc' },
          },
          _count: { select: { enrollments: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip: (Number(page) - 1) * Number(limit),
        take: Number(limit),
      }),
      prisma.learningPath.count({ where }),
    ])

    res.json(apiResponse.paginated(paths, { page: Number(page), limit: Number(limit), total }))
  } catch (error) {
    handleError(res, error)
  }
})

// POST /api/learning-paths — Create path
router.post('/', authenticate, requireSchoolAdmin, validateRequest(createPathSchema), async (req: Request, res: Response) => {
  try {
    const { courses, ...data } = req.body

    const path = await prisma.learningPath.create({
      data: {
        ...data,
        schoolId: req.user!.schoolId!,
        courses: courses?.length ? {
          create: courses.map((c: any) => ({
            courseId: c.courseId,
            orderIndex: c.orderIndex,
            isRequired: c.isRequired ?? true,
            minScore: c.minScore ?? 70,
          })),
        } : undefined,
      },
      include: {
        courses: {
          include: { course: { select: { id: true, name: true } } },
          orderBy: { orderIndex: 'asc' },
        },
      },
    })

    res.status(201).json(apiResponse.success(path, 'Learning path created'))
  } catch (error) {
    handleError(res, error)
  }
})

// GET /api/learning-paths/:id — Get path detail
router.get('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const path = await prisma.learningPath.findUnique({
      where: { id: req.params.id },
      include: {
        courses: {
          include: {
            course: {
              select: {
                id: true, name: true, description: true, courseType: true,
                language: true, thumbnailUrl: true,
                _count: { select: { lessons: true, enrollments: true } },
              },
            },
          },
          orderBy: { orderIndex: 'asc' },
        },
        _count: { select: { enrollments: true } },
      },
    })

    if (!path) {
      return res.status(404).json(apiResponse.error('Learning path not found'))
    }

    // If student, also include their enrollment progress
    let enrollment: any = null
    if (req.user?.studentId) {
      enrollment = await prisma.pathEnrollment.findUnique({
        where: { studentId_pathId: { studentId: req.user.studentId, pathId: path.id } },
      })

      // Get course-level progress for each course in the path
      if (enrollment) {
        const courseProgress = await prisma.progress.findMany({
          where: {
            studentId: req.user.studentId,
            courseId: { in: path.courses.map(c => c.courseId) },
          },
        })

        const progressMap = Object.fromEntries(courseProgress.map(p => [p.courseId, p]))
        ;(enrollment as any).courseProgress = progressMap
      }
    }

    res.json(apiResponse.success({ ...path, enrollment }))
  } catch (error) {
    handleError(res, error)
  }
})

// PUT /api/learning-paths/:id — Update path
router.put('/:id', authenticate, requireSchoolAdmin, validateRequest(updatePathSchema), async (req: Request, res: Response) => {
  try {
    const { courses, ...data } = req.body

    const existing = await prisma.learningPath.findFirst({
      where: { id: req.params.id, schoolId: req.user!.schoolId! },
    })
    if (!existing) {
      return res.status(404).json(apiResponse.error('Learning path not found'))
    }

    const path = await prisma.$transaction(async (tx) => {
      // Update path fields
      const updated = await tx.learningPath.update({
        where: { id: req.params.id },
        data,
      })

      // Replace courses if provided
      if (courses) {
        await tx.learningPathCourse.deleteMany({ where: { pathId: req.params.id } })
        if (courses.length > 0) {
          await tx.learningPathCourse.createMany({
            data: courses.map((c: any) => ({
              pathId: req.params.id,
              courseId: c.courseId,
              orderIndex: c.orderIndex,
              isRequired: c.isRequired ?? true,
              minScore: c.minScore ?? 70,
            })),
          })
        }
      }

      return tx.learningPath.findUnique({
        where: { id: req.params.id },
        include: {
          courses: {
            include: { course: { select: { id: true, name: true } } },
            orderBy: { orderIndex: 'asc' },
          },
        },
      })
    })

    res.json(apiResponse.success(path, 'Learning path updated'))
  } catch (error) {
    handleError(res, error)
  }
})

// DELETE /api/learning-paths/:id
router.delete('/:id', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  try {
    const existing = await prisma.learningPath.findFirst({
      where: { id: req.params.id, schoolId: req.user!.schoolId! },
    })
    if (!existing) {
      return res.status(404).json(apiResponse.error('Learning path not found'))
    }

    await prisma.learningPath.delete({ where: { id: req.params.id } })
    res.json(apiResponse.success(null, 'Learning path deleted'))
  } catch (error) {
    handleError(res, error)
  }
})

// ─── STUDENT: ENROLL & PROGRESS ────────────────────

// POST /api/learning-paths/:id/enroll — Enroll in a path
router.post('/:id/enroll', authenticate, async (req: Request, res: Response) => {
  try {
    const studentId = req.user?.studentId
    if (!studentId) {
      return res.status(403).json(apiResponse.error('Only students can enroll in paths'))
    }

    const path = await prisma.learningPath.findFirst({
      where: { id: req.params.id, isPublished: true },
      include: { courses: { orderBy: { orderIndex: 'asc' }, include: { course: true } } },
    })

    if (!path) {
      return res.status(404).json(apiResponse.error('Learning path not found'))
    }

    // Check existing enrollment
    const existing = await prisma.pathEnrollment.findUnique({
      where: { studentId_pathId: { studentId, pathId: path.id } },
    })
    if (existing) {
      return res.status(400).json(apiResponse.error('Already enrolled in this path'))
    }

    // Create path enrollment and enroll in first course
    const enrollment = await prisma.$transaction(async (tx) => {
      const pe = await tx.pathEnrollment.create({
        data: { studentId, pathId: path.id, currentCourseIndex: 0 },
      })

      // Auto-enroll in the first course if not already enrolled
      if (path.courses.length > 0) {
        const firstCourse = path.courses[0]
        const courseEnrollment = await tx.enrollment.findFirst({
          where: { studentId, courseId: firstCourse.courseId },
        })
        if (!courseEnrollment) {
          await tx.enrollment.create({
            data: { studentId, courseId: firstCourse.courseId, status: 'ACTIVE' },
          })
        }
      }

      return pe
    })

    res.status(201).json(apiResponse.success(enrollment, 'Enrolled in learning path'))
  } catch (error) {
    handleError(res, error)
  }
})

// GET /api/learning-paths/my/enrolled — Get my enrolled paths
router.get('/my/enrolled', authenticate, async (req: Request, res: Response) => {
  try {
    const studentId = req.user?.studentId
    if (!studentId) {
      return res.status(403).json(apiResponse.error('Only students have path enrollments'))
    }

    const enrollments = await prisma.pathEnrollment.findMany({
      where: { studentId },
      include: {
        path: {
          include: {
            courses: {
              include: { course: { select: { id: true, name: true, courseType: true } } },
              orderBy: { orderIndex: 'asc' },
            },
          },
        },
      },
      orderBy: { startedAt: 'desc' },
    })

    // Enrich with course progress
    for (const enrollment of enrollments) {
      const courseIds = enrollment.path.courses.map(c => c.courseId)
      const progress = await prisma.progress.findMany({
        where: { studentId, courseId: { in: courseIds } },
      })
      const progressMap = Object.fromEntries(progress.map(p => [p.courseId, Number(p.percentage)]));
      (enrollment as any).courseProgress = progressMap

      // Calculate overall path progress
      const totalCourses = enrollment.path.courses.length
      if (totalCourses > 0) {
        const completedCourses = enrollment.path.courses.filter(c => (progressMap[c.courseId] ?? 0) >= 100).length
        enrollment.progress = Math.round((completedCourses / totalCourses) * 100)
      }
    }

    res.json(apiResponse.success(enrollments))
  } catch (error) {
    handleError(res, error)
  }
})

// POST /api/learning-paths/:id/advance — Check and advance to next course
router.post('/:id/advance', authenticate, async (req: Request, res: Response) => {
  try {
    const studentId = req.user?.studentId
    if (!studentId) {
      return res.status(403).json(apiResponse.error('Only students can advance'))
    }

    const enrollment = await prisma.pathEnrollment.findUnique({
      where: { studentId_pathId: { studentId, pathId: req.params.id } },
      include: {
        path: {
          include: { courses: { orderBy: { orderIndex: 'asc' } } },
        },
      },
    })

    if (!enrollment) {
      return res.status(404).json(apiResponse.error('Not enrolled in this path'))
    }

    const currentCourse = enrollment.path.courses[enrollment.currentCourseIndex]
    if (!currentCourse) {
      return res.status(400).json(apiResponse.error('Already completed all courses'))
    }

    // Check if current course meets the minimum score
    const progress = await prisma.progress.findUnique({
      where: { studentId_courseId: { studentId, courseId: currentCourse.courseId } },
    })

    const percentage = Number(progress?.percentage ?? 0)
    const minRequired = currentCourse.minScore ?? 70

    if (percentage < minRequired) {
      return res.status(400).json(apiResponse.error(
        `Need ${minRequired}% on current course (you have ${percentage}%)`,
        'PREREQUISITE_NOT_MET'
      ))
    }

    const nextIndex = enrollment.currentCourseIndex + 1
    const nextCourse = enrollment.path.courses[nextIndex]

    if (!nextCourse) {
      // Path completed!
      await prisma.pathEnrollment.update({
        where: { id: enrollment.id },
        data: { status: 'COMPLETED', progress: 100, completedAt: new Date() },
      })

      return res.json(apiResponse.success({ completed: true }, 'Learning path completed!'))
    }

    // Advance to next course
    await prisma.$transaction(async (tx) => {
      await tx.pathEnrollment.update({
        where: { id: enrollment.id },
        data: {
          currentCourseIndex: nextIndex,
          progress: Math.round((nextIndex / enrollment.path.courses.length) * 100),
        },
      })

      // Auto-enroll in next course
      const existing = await tx.enrollment.findFirst({
        where: { studentId, courseId: nextCourse.courseId },
      })
      if (!existing) {
        await tx.enrollment.create({
          data: { studentId, courseId: nextCourse.courseId, status: 'ACTIVE' },
        })
      }
    })

    res.json(apiResponse.success({
      completed: false,
      nextCourse: nextCourse.courseId,
      currentCourseIndex: nextIndex,
    }, 'Advanced to next course'))
  } catch (error) {
    handleError(res, error)
  }
})

export default router
