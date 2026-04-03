import { Router, Request, Response } from 'express'
import Joi from 'joi'
import { prisma } from '../config/database'
import { validateRequest } from '../middleware/validateRequest'
import { authenticate } from '../middleware/auth'
import { requireSchoolAdmin, requireCourseAccess, requireTeacher } from '../middleware/rbac'
import { apiResponse, handleError } from '../utils/apiResponse'
import { PAGINATION, VOTING, LESSON, VALID_STATUS_TRANSITIONS } from '../utils/constants'
import { CourseStatus } from '@prisma/client'

const router = Router()

// Validation schemas
const createCourseSchema = Joi.object({
  name: Joi.string().min(2).max(200).required(),
  description: Joi.string().max(2000).optional(),
  courseType: Joi.string().valid('LIVE', 'SELF_PACED').optional(),
  isPublic: Joi.boolean().optional(),
  language: Joi.string().max(50).optional(),
  startDate: Joi.date().iso().optional(),
  endDate: Joi.date().iso().greater(Joi.ref('startDate')).optional(),
  maxStudents: Joi.number().integer().min(1).max(100).optional(),
  price: Joi.number().precision(2).min(0).optional(),
  currency: Joi.string().length(3).optional(),
  automationsEnabled: Joi.boolean().optional(),
  courseCategory: Joi.string().max(50).optional().allow(null),
  schoolId: Joi.string().optional(), // Admin can specify school
  modules: Joi.array().items(
    Joi.object({
      title: Joi.string().min(2).max(200).required(),
      description: Joi.string().max(1000).optional()
    })
  ).min(VOTING.MIN_TOPICS_FOR_COURSE).optional()
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

const updateStatusSchema = Joi.object({
  status: Joi.string().valid(...Object.keys(VALID_STATUS_TRANSITIONS.course)).required()
})

// Get all courses (filtered by access)
router.get('/', authenticate, async (req: Request, res: Response) => {
  try {
    const {
      page = PAGINATION.DEFAULT_PAGE,
      limit = PAGINATION.DEFAULT_LIMIT,
      search,
      status,
      schoolId
    } = req.query

    const pageNum = Math.max(1, Number(page))
    const limitNum = Math.min(PAGINATION.MAX_LIMIT, Math.max(1, Number(limit)))
    const skip = (pageNum - 1) * limitNum

    const where: any = { deletedAt: null }

    // Apply access control
    if (req.user?.role === 'ADMIN') {
      if (schoolId) {
        where.schoolId = String(schoolId)
      } else {
        where.schoolId = req.user.schoolId
      }
    } else if (req.user?.role === 'TEACHER') {
      where.courseTeachers = { some: { teacherId: req.user.teacherId } }
    } else if (req.user?.role === 'STUDENT') {
      where.enrollments = { some: { studentId: req.user.studentId } }
    } else if (req.user?.role === 'ORG_ADMIN') {
      // ORG_ADMIN can see courses they have seat licenses for
      where.seatLicenses = { some: { organizationId: req.user.organizationId } }
    }

    if (search) {
      where.OR = [
        { name: { contains: String(search), mode: 'insensitive' } },
        { description: { contains: String(search), mode: 'insensitive' } }
      ]
    }

    if (status) {
      where.status = String(status)
    }

    const [courses, total] = await Promise.all([
      prisma.course.findMany({
        where,
        skip,
        take: limitNum,
        include: {
          school: { select: { id: true, name: true } },
          courseTeachers: {
            include: { teacher: { include: { user: { select: { name: true } } } } },
            where: { isPrimary: true }
          },
          _count: {
            select: { enrollments: true, lessons: true, modules: true }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.course.count({ where })
    ])

    res.json(apiResponse.paginated(courses, { page: pageNum, limit: limitNum, total }))
  } catch (error) {
    handleError(res, error)
  }
})

// Get course by ID
router.get('/:id', authenticate, requireCourseAccess, async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const course = await prisma.course.findFirst({
      where: { id, deletedAt: null },
      include: {
        school: { select: { id: true, name: true, email: true } },
        courseTeachers: {
          include: {
            teacher: {
              include: { user: { select: { id: true, name: true, email: true } } }
            }
          }
        },
        modules: { orderBy: { orderIndex: 'asc' } },
        lessons: {
          orderBy: { lessonNumber: 'asc' },
          include: {
            teacher: { include: { user: { select: { name: true } } } },
            module: { select: { title: true } },
            _count: { select: { materials: true, attendance: true } }
          }
        },
        enrollments: {
          include: {
            student: {
              include: { user: { select: { id: true, name: true, email: true } } }
            }
          }
        },
        _count: {
          select: { enrollments: true, lessons: true, modules: true }
        }
      }
    })

    if (!course) {
      return res.status(404).json(apiResponse.error('Course not found', 'NOT_FOUND'))
    }

    // Calculate progress
    const completedLessons = course.lessons.filter(l => l.status === 'COMPLETED').length
    const progress = course.lessons.length > 0
      ? Math.round((completedLessons / course.lessons.length) * 100)
      : 0

    res.json(apiResponse.success({ ...course, progress }))
  } catch (error) {
    handleError(res, error)
  }
})

// Create course (school admin only)
router.post('/', authenticate, requireSchoolAdmin, validateRequest(createCourseSchema), async (req: Request, res: Response) => {
  try {
    const { modules, ...courseData } = req.body

    if (!req.user?.schoolId && req.user?.role !== 'ADMIN') {
      return res.status(403).json(apiResponse.error('School profile required', 'NO_SCHOOL_PROFILE'))
    }

    // For admin, use body schoolId or fall back to user's school
    const schoolId = req.user.role === 'ADMIN'
      ? (req.body.schoolId || req.user.schoolId)
      : req.user.schoolId

    if (!schoolId) {
      return res.status(400).json(apiResponse.error('School ID is required', 'VALIDATION_ERROR'))
    }

    const course = await prisma.$transaction(async (tx) => {
      // Create course
      const newCourse = await tx.course.create({
        data: {
          ...courseData,
          schoolId
        }
      })

      // Create modules if provided
      if (modules && modules.length > 0) {
        await tx.module.createMany({
          data: modules.map((m: any, index: number) => ({
            title: m.title,
            description: m.description,
            orderIndex: index,
            courseId: newCourse.id
          }))
        })
      }

      return newCourse
    })

    const created = await prisma.course.findUnique({
      where: { id: course.id },
      include: {
        modules: true,
        school: { select: { name: true } }
      }
    })

    res.status(201).json(apiResponse.success(created, 'Course created successfully'))
  } catch (error) {
    handleError(res, error)
  }
})

// Update course
router.put('/:id', authenticate, requireCourseAccess, validateRequest(updateCourseSchema), async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const course = await prisma.course.findFirst({
      where: { id, deletedAt: null }
    })

    if (!course) {
      return res.status(404).json(apiResponse.error('Course not found', 'NOT_FOUND'))
    }

    // Only school admin can edit
    if (req.user?.role !== 'ADMIN' && req.user?.schoolId !== course.schoolId) {
      return res.status(403).json(apiResponse.error('Only school admin can edit courses', 'FORBIDDEN'))
    }

    const updated = await prisma.course.update({
      where: { id },
      data: req.body,
      include: {
        modules: true,
        _count: { select: { enrollments: true, lessons: true } }
      }
    })

    res.json(apiResponse.success(updated, 'Course updated successfully'))
  } catch (error) {
    handleError(res, error)
  }
})

// Update course status
router.patch('/:id/status', authenticate, requireSchoolAdmin, validateRequest(updateStatusSchema), async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { status } = req.body

    const course = await prisma.course.findFirst({
      where: { id, deletedAt: null },
      include: { modules: true, lessons: true }
    })

    if (!course) {
      return res.status(404).json(apiResponse.error('Course not found', 'NOT_FOUND'))
    }

    // Validate status transition
    const validTransitions = VALID_STATUS_TRANSITIONS.course[course.status as keyof typeof VALID_STATUS_TRANSITIONS.course]
    if (!(validTransitions as readonly string[])?.includes(status)) {
      return res.status(400).json(
        apiResponse.error(
          `Cannot transition from ${course.status} to ${status}`,
          'INVALID_STATUS_TRANSITION'
        )
      )
    }

    // Validate requirements for certain transitions
    if (status === 'TOPIC_VOTING' && course.modules.length < VOTING.MIN_TOPICS_FOR_COURSE) {
      return res.status(400).json(
        apiResponse.error(
          `At least ${VOTING.MIN_TOPICS_FOR_COURSE} modules required for topic voting`,
          'INSUFFICIENT_MODULES'
        )
      )
    }

    if (status === 'IN_PROGRESS' && course.lessons.length === 0) {
      return res.status(400).json(
        apiResponse.error('Course must have scheduled lessons before starting', 'NO_LESSONS')
      )
    }

    const updated = await prisma.course.update({
      where: { id },
      data: { status: status as CourseStatus }
    })

    res.json(apiResponse.success(updated, `Course status updated to ${status}`))
  } catch (error) {
    handleError(res, error)
  }
})

// Assign teachers to course
router.post('/:id/teachers', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { teacherIds, primaryTeacherId } = req.body

    if (!teacherIds || !Array.isArray(teacherIds) || teacherIds.length === 0) {
      return res.status(400).json(apiResponse.error('Teacher IDs required', 'VALIDATION_ERROR'))
    }

    const course = await prisma.course.findFirst({
      where: { id, deletedAt: null }
    })

    if (!course) {
      return res.status(404).json(apiResponse.error('Course not found', 'NOT_FOUND'))
    }

    // Verify all teachers belong to the same school
    const teachers = await prisma.teacher.findMany({
      where: { id: { in: teacherIds }, schoolId: course.schoolId, deletedAt: null }
    })

    if (teachers.length !== teacherIds.length) {
      return res.status(400).json(apiResponse.error('Some teachers not found or not in this school', 'INVALID_TEACHERS'))
    }

    // Remove existing assignments and create new ones
    await prisma.$transaction(async (tx) => {
      await tx.courseTeacher.deleteMany({ where: { courseId: id } })

      await tx.courseTeacher.createMany({
        data: teacherIds.map((teacherId: string) => ({
          courseId: id,
          teacherId,
          isPrimary: teacherId === primaryTeacherId
        }))
      })
    })

    const updated = await prisma.course.findUnique({
      where: { id },
      include: {
        courseTeachers: {
          include: { teacher: { include: { user: { select: { name: true, email: true } } } } }
        }
      }
    })

    res.json(apiResponse.success(updated, 'Teachers assigned successfully'))
  } catch (error) {
    handleError(res, error)
  }
})

// Schedule lessons for course
router.post('/:id/schedule-lessons', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const {
      startDate,
      frequency = 'weekly', // weekly, biweekly, daily
      preferredTime = '10:00',
      skipWeekends = true,
      numberOfLessons = LESSON.LESSONS_PER_COURSE,
      duration = LESSON.DEFAULT_DURATION
    } = req.body

    const course = await prisma.course.findFirst({
      where: { id, deletedAt: null },
      include: { modules: { where: { isSelected: true }, orderBy: { orderIndex: 'asc' } } }
    })

    if (!course) {
      return res.status(404).json(apiResponse.error('Course not found', 'NOT_FOUND'))
    }

    if (!startDate) {
      return res.status(400).json(apiResponse.error('Start date is required', 'VALIDATION_ERROR'))
    }

    // Delete existing lessons if any
    await prisma.lesson.deleteMany({ where: { courseId: id } })

    // Calculate lesson dates
    const lessons: any[] = []
    let currentDate = new Date(startDate)
    const [hours, minutes] = preferredTime.split(':').map(Number)
    currentDate.setHours(hours, minutes, 0, 0)

    const frequencyDays = frequency === 'daily' ? 1 : frequency === 'biweekly' ? 14 : 7

    for (let i = 1; i <= numberOfLessons; i++) {
      // Skip weekends if configured
      while (skipWeekends && (currentDate.getDay() === 0 || currentDate.getDay() === 6)) {
        currentDate.setDate(currentDate.getDate() + 1)
      }

      // Assign module (cycling through selected modules)
      const moduleIndex = i > 1 && i < numberOfLessons
        ? (i - 2) % course.modules.length
        : -1
      const module = moduleIndex >= 0 ? course.modules[moduleIndex] : null

      let title = `Lesson ${i}`
      if (i === 1) title = 'Introduction'
      else if (i === numberOfLessons) title = 'Conclusion'
      else if (module) title = module.title

      lessons.push({
        courseId: id,
        lessonNumber: i,
        title,
        scheduledAt: new Date(currentDate),
        duration,
        moduleId: module?.id || null
      })

      // Move to next date
      currentDate.setDate(currentDate.getDate() + frequencyDays)
    }

    await prisma.lesson.createMany({ data: lessons })

    // Update course dates
    await prisma.course.update({
      where: { id },
      data: {
        startDate: lessons[0].scheduledAt,
        endDate: lessons[lessons.length - 1].scheduledAt
      }
    })

    const updated = await prisma.course.findUnique({
      where: { id },
      include: {
        lessons: { orderBy: { lessonNumber: 'asc' } },
        modules: true
      }
    })

    res.json(apiResponse.success(updated, `${numberOfLessons} lessons scheduled successfully`))
  } catch (error) {
    handleError(res, error)
  }
})

// Delete course (soft delete)
router.delete('/:id', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const course = await prisma.course.findFirst({
      where: { id, deletedAt: null },
      include: { enrollments: { where: { status: 'ACTIVE' } } }
    })

    if (!course) {
      return res.status(404).json(apiResponse.error('Course not found', 'NOT_FOUND'))
    }

    if (course.enrollments.length > 0) {
      return res.status(400).json(
        apiResponse.error('Cannot delete course with active enrollments', 'HAS_ACTIVE_ENROLLMENTS')
      )
    }

    await prisma.course.update({
      where: { id },
      data: { deletedAt: new Date(), status: 'CANCELLED' }
    })

    res.json(apiResponse.success(null, 'Course deleted successfully'))
  } catch (error) {
    handleError(res, error)
  }
})

// =====================================================
// SELF-PACED COURSE CONTENT MANAGEMENT
// =====================================================

const addContentSchema = Joi.object({
  videoId: Joi.string().optional(),
  exerciseId: Joi.string().optional(),
  isRequired: Joi.boolean().optional(),
  isPreview: Joi.boolean().optional(),
}).xor('videoId', 'exerciseId') // exactly one must be provided

const reorderContentSchema = Joi.object({
  contentIds: Joi.array().items(Joi.string()).min(1).required()
})

// Add content to a self-paced course
router.post('/:id/contents', authenticate, requireSchoolAdmin, validateRequest(addContentSchema), async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { videoId, exerciseId, isRequired, isPreview } = req.body

    const course = await prisma.course.findFirst({
      where: { id, deletedAt: null }
    })

    if (!course) {
      return res.status(404).json(apiResponse.error('Course not found', 'NOT_FOUND'))
    }

    if (course.courseType !== 'SELF_PACED') {
      return res.status(400).json(apiResponse.error('Content management is only for self-paced courses', 'INVALID_COURSE_TYPE'))
    }

    // Get max orderIndex
    const maxOrder = await prisma.courseContent.aggregate({
      where: { courseId: id },
      _max: { orderIndex: true }
    })

    const content = await prisma.courseContent.create({
      data: {
        courseId: id,
        videoId: videoId || null,
        exerciseId: exerciseId || null,
        isRequired: isRequired ?? true,
        isPreview: isPreview ?? false,
        orderIndex: (maxOrder._max.orderIndex ?? -1) + 1,
      },
      include: {
        video: { select: { id: true, title: true, duration: true, cefrLevel: true } },
        exercise: { select: { id: true, title: true, type: true, cefrLevel: true } },
      }
    })

    res.status(201).json(apiResponse.success(content, 'Content added successfully'))
  } catch (error) {
    handleError(res, error)
  }
})

// List course contents (ordered)
router.get('/:id/contents', authenticate, requireCourseAccess, async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const contents = await prisma.courseContent.findMany({
      where: { courseId: id },
      orderBy: { orderIndex: 'asc' },
      include: {
        video: { select: { id: true, title: true, description: true, url: true, thumbnailUrl: true, duration: true, cefrLevel: true, language: true } },
        exercise: { select: { id: true, title: true, description: true, type: true, cefrLevel: true, language: true } },
      }
    })

    res.json(apiResponse.success(contents))
  } catch (error) {
    handleError(res, error)
  }
})

// Reorder course contents
router.put('/:id/contents/reorder', authenticate, requireSchoolAdmin, validateRequest(reorderContentSchema), async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { contentIds } = req.body

    await prisma.$transaction(
      contentIds.map((contentId: string, index: number) =>
        prisma.courseContent.update({
          where: { id: contentId },
          data: { orderIndex: index }
        })
      )
    )

    const contents = await prisma.courseContent.findMany({
      where: { courseId: id },
      orderBy: { orderIndex: 'asc' },
      include: {
        video: { select: { id: true, title: true } },
        exercise: { select: { id: true, title: true } },
      }
    })

    res.json(apiResponse.success(contents, 'Content reordered successfully'))
  } catch (error) {
    handleError(res, error)
  }
})

// Toggle preview flag on a content item
router.patch('/:id/contents/:contentId/preview', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  try {
    const { contentId } = req.params
    const { isPreview } = req.body

    if (typeof isPreview !== 'boolean') {
      return res.status(400).json(apiResponse.error('isPreview must be a boolean', 'VALIDATION_ERROR'))
    }

    const content = await prisma.courseContent.update({
      where: { id: contentId },
      data: { isPreview },
      include: {
        video: { select: { id: true, title: true } },
        exercise: { select: { id: true, title: true } },
      },
    })

    res.json(apiResponse.success(content, `Preview ${isPreview ? 'enabled' : 'disabled'}`))
  } catch (error) {
    handleError(res, error)
  }
})

// Remove content from course
router.delete('/:id/contents/:contentId', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  try {
    const { contentId } = req.params

    await prisma.courseContent.delete({ where: { id: contentId } })

    res.json(apiResponse.success(null, 'Content removed successfully'))
  } catch (error) {
    handleError(res, error)
  }
})

export default router
