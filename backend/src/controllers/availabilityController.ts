import { Router, Request, Response } from 'express'
import Joi from 'joi'
import { prisma } from '../config/database'
import { validateRequest } from '../middleware/validateRequest'
import { authenticate } from '../middleware/auth'
import { requireTeacher, requireSchoolAdmin } from '../middleware/rbac'
import { apiResponse, handleError } from '../utils/apiResponse'

const router = Router()

// ─── VALIDATION SCHEMAS ────────────────────────────

const createSlotSchema = Joi.object({
  dayOfWeek: Joi.number().integer().min(0).max(6).required(), // 0=Sun ... 6=Sat
  startTime: Joi.string().pattern(/^\d{2}:\d{2}$/).required(), // HH:MM
  endTime: Joi.string().pattern(/^\d{2}:\d{2}$/).required(),
  isRecurring: Joi.boolean().default(true),
  specificDate: Joi.date().iso().optional().allow(null),
  status: Joi.string().valid('AVAILABLE', 'BUSY', 'TENTATIVE', 'VACATION', 'SICK_LEAVE').default('AVAILABLE'),
  notes: Joi.string().max(500).optional().allow(''),
})

const updateSlotSchema = Joi.object({
  dayOfWeek: Joi.number().integer().min(0).max(6).optional(),
  startTime: Joi.string().pattern(/^\d{2}:\d{2}$/).optional(),
  endTime: Joi.string().pattern(/^\d{2}:\d{2}$/).optional(),
  isRecurring: Joi.boolean().optional(),
  specificDate: Joi.date().iso().optional().allow(null),
  status: Joi.string().valid('AVAILABLE', 'BUSY', 'TENTATIVE', 'VACATION', 'SICK_LEAVE').optional(),
  notes: Joi.string().max(500).optional().allow(''),
})

const bulkSetSchema = Joi.object({
  slots: Joi.array().items(Joi.object({
    dayOfWeek: Joi.number().integer().min(0).max(6).required(),
    startTime: Joi.string().pattern(/^\d{2}:\d{2}$/).required(),
    endTime: Joi.string().pattern(/^\d{2}:\d{2}$/).required(),
    status: Joi.string().valid('AVAILABLE', 'BUSY', 'TENTATIVE').default('AVAILABLE'),
  })).required(),
})

// ─── TEACHER: MANAGE OWN AVAILABILITY ──────────────

// GET /api/availability/my — Get my availability
router.get('/my', authenticate, requireTeacher, async (req: Request, res: Response) => {
  try {
    const teacherId = req.user!.teacherId
    if (!teacherId) {
      return res.status(403).json(apiResponse.error('Teacher profile not found'))
    }

    const slots = await prisma.teacherAvailability.findMany({
      where: { teacherId },
      orderBy: [{ dayOfWeek: 'asc' }, { startTime: 'asc' }],
    })

    res.json(apiResponse.success(slots))
  } catch (error) {
    handleError(res, error)
  }
})

// POST /api/availability — Create a slot
router.post('/', authenticate, requireTeacher, validateRequest(createSlotSchema), async (req: Request, res: Response) => {
  try {
    const teacherId = req.user!.teacherId
    if (!teacherId) {
      return res.status(403).json(apiResponse.error('Teacher profile not found'))
    }

    const data = req.body

    // Validate time range
    if (data.startTime >= data.endTime) {
      return res.status(400).json(apiResponse.error('Start time must be before end time'))
    }

    // Check for overlapping slots on the same day
    const overlap = await prisma.teacherAvailability.findFirst({
      where: {
        teacherId,
        dayOfWeek: data.dayOfWeek,
        isRecurring: data.isRecurring ?? true,
        OR: [
          { startTime: { lt: data.endTime }, endTime: { gt: data.startTime } },
        ],
      },
    })

    if (overlap) {
      return res.status(400).json(apiResponse.error(
        `Overlaps with existing slot ${overlap.startTime}-${overlap.endTime}`,
        'OVERLAP'
      ))
    }

    const slot = await prisma.teacherAvailability.create({
      data: { ...data, teacherId },
    })

    res.status(201).json(apiResponse.success(slot, 'Availability slot created'))
  } catch (error) {
    handleError(res, error)
  }
})

// PUT /api/availability/bulk — Replace all recurring slots (weekly schedule)
router.put('/bulk', authenticate, requireTeacher, validateRequest(bulkSetSchema), async (req: Request, res: Response) => {
  try {
    const teacherId = req.user!.teacherId
    if (!teacherId) {
      return res.status(403).json(apiResponse.error('Teacher profile not found'))
    }

    const { slots } = req.body

    // Validate all time ranges
    for (const slot of slots) {
      if (slot.startTime >= slot.endTime) {
        return res.status(400).json(apiResponse.error(`Invalid time range: ${slot.startTime}-${slot.endTime}`))
      }
    }

    // Replace all recurring slots in a transaction
    const result = await prisma.$transaction(async (tx) => {
      await tx.teacherAvailability.deleteMany({
        where: { teacherId, isRecurring: true },
      })

      if (slots.length > 0) {
        await tx.teacherAvailability.createMany({
          data: slots.map((s: any) => ({
            teacherId,
            dayOfWeek: s.dayOfWeek,
            startTime: s.startTime,
            endTime: s.endTime,
            status: s.status || 'AVAILABLE',
            isRecurring: true,
          })),
        })
      }

      return tx.teacherAvailability.findMany({
        where: { teacherId },
        orderBy: [{ dayOfWeek: 'asc' }, { startTime: 'asc' }],
      })
    })

    res.json(apiResponse.success(result, 'Weekly schedule updated'))
  } catch (error) {
    handleError(res, error)
  }
})

// PATCH /api/availability/:id — Update a slot
router.patch('/:id', authenticate, requireTeacher, validateRequest(updateSlotSchema), async (req: Request, res: Response) => {
  try {
    const teacherId = req.user!.teacherId
    const slot = await prisma.teacherAvailability.findFirst({
      where: { id: req.params.id, teacherId },
    })

    if (!slot) {
      return res.status(404).json(apiResponse.error('Slot not found'))
    }

    const updated = await prisma.teacherAvailability.update({
      where: { id: req.params.id },
      data: req.body,
    })

    res.json(apiResponse.success(updated, 'Slot updated'))
  } catch (error) {
    handleError(res, error)
  }
})

// DELETE /api/availability/:id — Delete a slot
router.delete('/:id', authenticate, requireTeacher, async (req: Request, res: Response) => {
  try {
    const teacherId = req.user!.teacherId
    const slot = await prisma.teacherAvailability.findFirst({
      where: { id: req.params.id, teacherId },
    })

    if (!slot) {
      return res.status(404).json(apiResponse.error('Slot not found'))
    }

    await prisma.teacherAvailability.delete({ where: { id: req.params.id } })
    res.json(apiResponse.success(null, 'Slot deleted'))
  } catch (error) {
    handleError(res, error)
  }
})

// ─── ADMIN: VIEW TEACHER AVAILABILITY ──────────────

// GET /api/availability/teacher/:teacherId — Admin view of a teacher's availability
router.get('/teacher/:teacherId', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  try {
    const { teacherId } = req.params

    const teacher = await prisma.teacher.findFirst({
      where: { id: teacherId, deletedAt: null },
      include: { user: { select: { name: true, email: true } } },
    })

    if (!teacher) {
      return res.status(404).json(apiResponse.error('Teacher not found'))
    }

    const slots = await prisma.teacherAvailability.findMany({
      where: { teacherId },
      orderBy: [{ dayOfWeek: 'asc' }, { startTime: 'asc' }],
    })

    // Also get upcoming scheduled lessons for this teacher
    const upcomingLessons = await prisma.lesson.findMany({
      where: {
        teacherId,
        deletedAt: null,
        scheduledAt: { gte: new Date() },
        status: { notIn: ['CANCELLED', 'COMPLETED'] },
      },
      select: {
        id: true,
        scheduledAt: true,
        duration: true,
        title: true,
        course: { select: { name: true } },
      },
      orderBy: { scheduledAt: 'asc' },
      take: 50,
    })

    res.json(apiResponse.success({
      teacher: { id: teacher.id, name: teacher.user.name, email: teacher.user.email },
      availability: slots,
      upcomingLessons,
    }))
  } catch (error) {
    handleError(res, error)
  }
})

// GET /api/availability/check — Check if a teacher is available at a specific time
router.get('/check', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  try {
    const { teacherId, date, duration } = req.query

    if (!teacherId || !date) {
      return res.status(400).json(apiResponse.error('teacherId and date are required'))
    }

    const lessonDate = new Date(date as string)
    const lessonDuration = Number(duration) || 60
    const dayOfWeek = lessonDate.getDay()
    const timeStr = `${String(lessonDate.getHours()).padStart(2, '0')}:${String(lessonDate.getMinutes()).padStart(2, '0')}`
    const endMinutes = lessonDate.getHours() * 60 + lessonDate.getMinutes() + lessonDuration
    const endTimeStr = `${String(Math.floor(endMinutes / 60)).padStart(2, '0')}:${String(endMinutes % 60).padStart(2, '0')}`

    // Check recurring availability
    const availableSlot = await prisma.teacherAvailability.findFirst({
      where: {
        teacherId: teacherId as string,
        dayOfWeek,
        status: 'AVAILABLE',
        startTime: { lte: timeStr },
        endTime: { gte: endTimeStr },
      },
    })

    // Check for conflicting lessons
    const lessonEnd = new Date(lessonDate.getTime() + lessonDuration * 60000)
    const conflictingLesson = await prisma.lesson.findFirst({
      where: {
        teacherId: teacherId as string,
        deletedAt: null,
        status: { notIn: ['CANCELLED'] },
        scheduledAt: { lt: lessonEnd },
        // lesson ends after our start
        AND: {
          scheduledAt: {
            gte: new Date(lessonDate.getTime() - 180 * 60000), // max 3hr lesson overlap window
          },
        },
      },
      select: {
        id: true,
        scheduledAt: true,
        duration: true,
        title: true,
        course: { select: { name: true } },
      },
    })

    // More precise conflict check using duration
    let hasConflict = false
    let conflictDetails: typeof conflictingLesson | null = null
    if (conflictingLesson) {
      const existingEnd = new Date(conflictingLesson.scheduledAt.getTime() + conflictingLesson.duration * 60000)
      if (conflictingLesson.scheduledAt < lessonEnd && existingEnd > lessonDate) {
        hasConflict = true
        conflictDetails = conflictingLesson
      }
    }

    res.json(apiResponse.success({
      teacherId,
      requestedTime: { date: lessonDate, duration: lessonDuration },
      isAvailable: !!availableSlot && !hasConflict,
      hasAvailabilitySlot: !!availableSlot,
      hasConflict,
      conflictDetails,
    }))
  } catch (error) {
    handleError(res, error)
  }
})

export default router
