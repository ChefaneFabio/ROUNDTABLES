import { Router, Request, Response } from 'express'
import Joi from 'joi'
import { prisma } from '../config/database'
import { validateRequest } from '../middleware/validateRequest'
import { authenticate } from '../middleware/auth'
import { requireTeacher, requireSchoolAdmin } from '../middleware/rbac'
import { apiResponse, handleError } from '../utils/apiResponse'
import { TeacherAvailabilityService } from '../services/TeacherAvailabilityService'
import { AvailabilityStatus, SubstitutionReason } from '@prisma/client'

const router = Router()

// Validation schemas
const setAvailabilitySchema = Joi.object({
  dayOfWeek: Joi.number().integer().min(0).max(6).required(),
  startTime: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/).required(),
  endTime: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/).required(),
  isRecurring: Joi.boolean().optional(),
  specificDate: Joi.date().iso().optional(),
  status: Joi.string().valid(...Object.values(AvailabilityStatus)).optional(),
  notes: Joi.string().max(500).optional()
})

const setWeeklyAvailabilitySchema = Joi.object({
  slots: Joi.array().items(
    Joi.object({
      dayOfWeek: Joi.number().integer().min(0).max(6).required(),
      startTime: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/).required(),
      endTime: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/).required()
    })
  ).required()
})

const blockTimeSchema = Joi.object({
  date: Joi.date().iso().required(),
  startTime: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/).required(),
  endTime: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/).required(),
  status: Joi.string().valid('BUSY', 'VACATION', 'SICK_LEAVE').required(),
  notes: Joi.string().max(500).optional()
})

const substitutionRequestSchema = Joi.object({
  lessonId: Joi.string().required(),
  reason: Joi.string().valid(...Object.values(SubstitutionReason)).required(),
  notes: Joi.string().max(1000).optional()
})

const assignSubstituteSchema = Joi.object({
  substituteTeacherId: Joi.string().required()
})

// ============================================
// TEACHER AVAILABILITY
// ============================================

// Get current teacher's availability
router.get('/my', authenticate, requireTeacher, async (req: Request, res: Response) => {
  try {
    const teacherId = req.user?.teacherId

    if (!teacherId) {
      return res.status(400).json(apiResponse.error('Teacher ID not found', 'INVALID_USER'))
    }

    const availability = await TeacherAvailabilityService.getTeacherAvailability(teacherId)

    res.json(apiResponse.success(availability))
  } catch (error) {
    handleError(res, error)
  }
})

// Get availability for a specific teacher (school admin)
router.get('/teacher/:teacherId', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  try {
    const { teacherId } = req.params
    const { date } = req.query

    const dateObj = date ? new Date(String(date)) : undefined

    const availability = await TeacherAvailabilityService.getTeacherAvailability(teacherId, dateObj)

    res.json(apiResponse.success(availability))
  } catch (error) {
    handleError(res, error)
  }
})

// Set single availability slot
router.post('/', authenticate, requireTeacher, validateRequest(setAvailabilitySchema), async (req: Request, res: Response) => {
  try {
    const teacherId = req.user?.teacherId

    if (!teacherId) {
      return res.status(400).json(apiResponse.error('Teacher ID not found', 'INVALID_USER'))
    }

    const availability = await TeacherAvailabilityService.setAvailability({
      teacherId,
      ...req.body
    })

    res.status(201).json(apiResponse.success(availability, 'Availability set successfully'))
  } catch (error) {
    handleError(res, error)
  }
})

// Set weekly availability (replaces all recurring slots)
router.put('/weekly', authenticate, requireTeacher, validateRequest(setWeeklyAvailabilitySchema), async (req: Request, res: Response) => {
  try {
    const teacherId = req.user?.teacherId

    if (!teacherId) {
      return res.status(400).json(apiResponse.error('Teacher ID not found', 'INVALID_USER'))
    }

    await TeacherAvailabilityService.setWeeklyAvailability(teacherId, req.body.slots)

    const availability = await TeacherAvailabilityService.getTeacherAvailability(teacherId)

    res.json(apiResponse.success(availability, 'Weekly availability updated successfully'))
  } catch (error) {
    handleError(res, error)
  }
})

// Block time (vacation, sick leave, etc.)
router.post('/block', authenticate, requireTeacher, validateRequest(blockTimeSchema), async (req: Request, res: Response) => {
  try {
    const teacherId = req.user?.teacherId
    const { date, startTime, endTime, status, notes } = req.body

    if (!teacherId) {
      return res.status(400).json(apiResponse.error('Teacher ID not found', 'INVALID_USER'))
    }

    const blocked = await TeacherAvailabilityService.blockTime(
      teacherId,
      new Date(date),
      startTime,
      endTime,
      status as AvailabilityStatus,
      notes
    )

    res.status(201).json(apiResponse.success(blocked, 'Time blocked successfully'))
  } catch (error) {
    handleError(res, error)
  }
})

// Delete availability slot
router.delete('/:id', authenticate, requireTeacher, async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const teacherId = req.user?.teacherId

    const slot = await prisma.teacherAvailability.findFirst({
      where: { id, teacherId }
    })

    if (!slot) {
      return res.status(404).json(apiResponse.error('Availability slot not found', 'NOT_FOUND'))
    }

    await prisma.teacherAvailability.delete({ where: { id } })

    res.json(apiResponse.success(null, 'Availability slot deleted'))
  } catch (error) {
    handleError(res, error)
  }
})

// ============================================
// SCHEDULING SUGGESTIONS
// ============================================

// Find available teachers for a time slot
router.get('/find-teachers', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  try {
    const { date, startTime, endTime, expertise } = req.query
    const schoolId = req.user?.schoolId

    if (!schoolId) {
      return res.status(400).json(apiResponse.error('School ID not found', 'INVALID_USER'))
    }

    if (!date || !startTime || !endTime) {
      return res.status(400).json(apiResponse.error('Date, startTime, and endTime are required', 'MISSING_PARAMS'))
    }

    const expertiseArray = expertise ? String(expertise).split(',') : undefined

    const teachers = await TeacherAvailabilityService.findAvailableTeachers(
      schoolId,
      new Date(String(date)),
      String(startTime),
      String(endTime),
      expertiseArray
    )

    res.json(apiResponse.success(teachers))
  } catch (error) {
    handleError(res, error)
  }
})

// Get suggested lesson times for a teacher
router.get('/suggestions/:teacherId', authenticate, async (req: Request, res: Response) => {
  try {
    const { teacherId } = req.params
    const { duration, preferredDays, weeksAhead } = req.query

    const durationMin = Number(duration) || 60
    const weeks = Number(weeksAhead) || 2
    const days = preferredDays ? String(preferredDays).split(',').map(Number) : undefined

    const suggestions = await TeacherAvailabilityService.suggestLessonTimes(
      teacherId,
      durationMin,
      days,
      weeks
    )

    res.json(apiResponse.success(suggestions))
  } catch (error) {
    handleError(res, error)
  }
})

// Check if teacher is available at a specific time
router.get('/check/:teacherId', authenticate, async (req: Request, res: Response) => {
  try {
    const { teacherId } = req.params
    const { date, startTime, endTime } = req.query

    if (!date || !startTime || !endTime) {
      return res.status(400).json(apiResponse.error('Date, startTime, and endTime are required', 'MISSING_PARAMS'))
    }

    const isAvailable = await TeacherAvailabilityService.isTeacherAvailable(
      teacherId,
      new Date(String(date)),
      String(startTime),
      String(endTime)
    )

    res.json(apiResponse.success({ isAvailable }))
  } catch (error) {
    handleError(res, error)
  }
})

// ============================================
// SUBSTITUTION MANAGEMENT
// ============================================

// Request a substitution
router.post('/substitution/request', authenticate, requireTeacher, validateRequest(substitutionRequestSchema), async (req: Request, res: Response) => {
  try {
    const teacherId = req.user?.teacherId

    if (!teacherId) {
      return res.status(400).json(apiResponse.error('Teacher ID not found', 'INVALID_USER'))
    }

    const substitution = await TeacherAvailabilityService.requestSubstitution({
      lessonId: req.body.lessonId,
      originalTeacherId: teacherId,
      reason: req.body.reason,
      notes: req.body.notes
    })

    res.status(201).json(apiResponse.success(substitution, 'Substitution request created'))
  } catch (error) {
    handleError(res, error)
  }
})

// Get pending substitution requests (school admin)
router.get('/substitutions/pending', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  try {
    const schoolId = req.user?.schoolId

    if (!schoolId) {
      return res.status(400).json(apiResponse.error('School ID not found', 'INVALID_USER'))
    }

    const substitutions = await TeacherAvailabilityService.getPendingSubstitutions(schoolId)

    res.json(apiResponse.success(substitutions))
  } catch (error) {
    handleError(res, error)
  }
})

// Find available substitutes for a lesson
router.get('/substitution/:lessonId/available', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  try {
    const { lessonId } = req.params

    const teachers = await TeacherAvailabilityService.findSubstituteTeachers(lessonId)

    res.json(apiResponse.success(teachers))
  } catch (error) {
    handleError(res, error)
  }
})

// Assign substitute teacher
router.post('/substitution/:id/assign', authenticate, requireSchoolAdmin, validateRequest(assignSubstituteSchema), async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { substituteTeacherId } = req.body

    const substitution = await TeacherAvailabilityService.assignSubstitute(id, substituteTeacherId)

    res.json(apiResponse.success(substitution, 'Substitute teacher assigned'))
  } catch (error) {
    handleError(res, error)
  }
})

// Confirm substitution (substitute teacher confirms)
router.post('/substitution/:id/confirm', authenticate, requireTeacher, async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const teacherId = req.user?.teacherId

    // Verify this teacher is the substitute
    const substitution = await prisma.substitution.findFirst({
      where: { id, substituteTeacherId: teacherId }
    })

    if (!substitution) {
      return res.status(403).json(apiResponse.error('Not authorized to confirm this substitution', 'FORBIDDEN'))
    }

    const updated = await TeacherAvailabilityService.confirmSubstitution(id)

    res.json(apiResponse.success(updated, 'Substitution confirmed'))
  } catch (error) {
    handleError(res, error)
  }
})

// Cancel substitution request
router.post('/substitution/:id/cancel', authenticate, async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    // Verify user can cancel (original teacher or school admin)
    const substitution = await prisma.substitution.findUnique({
      where: { id },
      include: {
        lesson: { include: { course: true } }
      }
    })

    if (!substitution) {
      return res.status(404).json(apiResponse.error('Substitution not found', 'NOT_FOUND'))
    }

    const canCancel = req.user?.role === 'ADMIN' ||
      (req.user?.role === 'LANGUAGE_SCHOOL' && req.user.schoolId === substitution.lesson.course.schoolId) ||
      req.user?.teacherId === substitution.originalTeacherId

    if (!canCancel) {
      return res.status(403).json(apiResponse.error('Not authorized to cancel this substitution', 'FORBIDDEN'))
    }

    const updated = await TeacherAvailabilityService.cancelSubstitution(id)

    res.json(apiResponse.success(updated, 'Substitution cancelled'))
  } catch (error) {
    handleError(res, error)
  }
})

export default router
