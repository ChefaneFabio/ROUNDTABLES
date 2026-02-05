import { Router, Request, Response } from 'express'
import Joi from 'joi'
import { prisma } from '../config/database'
import { validateRequest } from '../middleware/validateRequest'
import { authenticate } from '../middleware/auth'
import { requireSchoolAdmin, requireAdmin } from '../middleware/rbac'
import { apiResponse, handleError } from '../utils/apiResponse'
import { PAGINATION } from '../utils/constants'
import { NotificationStatus, NotificationType } from '@prisma/client'

const router = Router()

// Validation schemas
const createNotificationSchema = Joi.object({
  userId: Joi.string().required(),
  type: Joi.string().valid(
    'TEACHER_REMINDER', 'QUESTIONS_REQUEST', 'FEEDBACK_REQUEST',
    'ENROLLMENT_CONFIRMED', 'LESSON_REMINDER', 'VOTING_INVITE',
    'PAYMENT_REMINDER', 'PAYMENT_RECEIVED', 'COURSE_UPDATE', 'GENERAL'
  ).required(),
  subject: Joi.string().min(2).max(200).required(),
  content: Joi.string().min(10).max(5000).required(),
  scheduledAt: Joi.date().iso().optional(),
  lessonId: Joi.string().optional(),
  metadata: Joi.object().optional()
})

const updateNotificationSchema = Joi.object({
  subject: Joi.string().min(2).max(200).optional(),
  content: Joi.string().min(10).max(5000).optional(),
  scheduledAt: Joi.date().iso().optional()
})

// Get current user's notifications
router.get('/me', authenticate, async (req: Request, res: Response) => {
  try {
    const {
      page = PAGINATION.DEFAULT_PAGE,
      limit = PAGINATION.DEFAULT_LIMIT,
      unreadOnly,
      type
    } = req.query

    const pageNum = Math.max(1, Number(page))
    const limitNum = Math.min(PAGINATION.MAX_LIMIT, Math.max(1, Number(limit)))
    const skip = (pageNum - 1) * limitNum

    const where: any = {
      userId: req.user!.id,
      status: { in: ['SENT', 'READ'] }
    }

    if (unreadOnly === 'true') {
      where.readAt = null
    }

    if (type) {
      where.type = String(type)
    }

    const [notifications, total, unreadCount] = await Promise.all([
      prisma.notification.findMany({
        where,
        skip,
        take: limitNum,
        include: {
          lesson: { select: { id: true, title: true, course: { select: { name: true } } } }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.notification.count({ where }),
      prisma.notification.count({ where: { userId: req.user!.id, readAt: null, status: 'SENT' } })
    ])

    res.json(apiResponse.paginated(notifications, { page: pageNum, limit: limitNum, total }))
  } catch (error) {
    handleError(res, error)
  }
})

// Get unread count
router.get('/me/unread-count', authenticate, async (req: Request, res: Response) => {
  try {
    const count = await prisma.notification.count({
      where: { userId: req.user!.id, readAt: null, status: 'SENT' }
    })

    res.json(apiResponse.success({ unreadCount: count }))
  } catch (error) {
    handleError(res, error)
  }
})

// Mark notification as read
router.post('/:id/read', authenticate, async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const notification = await prisma.notification.findUnique({ where: { id } })

    if (!notification) {
      return res.status(404).json(apiResponse.error('Notification not found', 'NOT_FOUND'))
    }

    if (notification.userId !== req.user!.id) {
      return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
    }

    if (notification.readAt) {
      return res.json(apiResponse.success(notification, 'Already read'))
    }

    const updated = await prisma.notification.update({
      where: { id },
      data: { readAt: new Date(), status: 'READ' }
    })

    res.json(apiResponse.success(updated, 'Marked as read'))
  } catch (error) {
    handleError(res, error)
  }
})

// Mark all as read
router.post('/me/read-all', authenticate, async (req: Request, res: Response) => {
  try {
    const result = await prisma.notification.updateMany({
      where: { userId: req.user!.id, readAt: null, status: 'SENT' },
      data: { readAt: new Date(), status: 'READ' }
    })

    res.json(apiResponse.success({ marked: result.count }, `${result.count} notifications marked as read`))
  } catch (error) {
    handleError(res, error)
  }
})

// Get all notifications (admin view)
router.get('/', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  try {
    const {
      page = PAGINATION.DEFAULT_PAGE,
      limit = PAGINATION.DEFAULT_LIMIT,
      status,
      type,
      userId
    } = req.query

    const pageNum = Math.max(1, Number(page))
    const limitNum = Math.min(PAGINATION.MAX_LIMIT, Math.max(1, Number(limit)))
    const skip = (pageNum - 1) * limitNum

    const where: any = {}

    // Filter by school for non-admin users
    if (req.user?.role !== 'ADMIN') {
      where.user = {
        OR: [
          { schoolProfile: { id: req.user!.schoolId } },
          { teacherProfile: { schoolId: req.user!.schoolId } },
          { studentProfile: { schoolId: req.user!.schoolId } }
        ]
      }
    }

    if (status) where.status = String(status)
    if (type) where.type = String(type)
    if (userId) where.userId = String(userId)

    const [notifications, total] = await Promise.all([
      prisma.notification.findMany({
        where,
        skip,
        take: limitNum,
        include: {
          user: { select: { name: true, email: true, role: true } },
          lesson: { select: { id: true, title: true, course: { select: { name: true } } } }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.notification.count({ where })
    ])

    res.json(apiResponse.paginated(notifications, { page: pageNum, limit: limitNum, total }))
  } catch (error) {
    handleError(res, error)
  }
})

// Get pending/scheduled notifications
router.get('/pending', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  try {
    const where: any = { status: 'PENDING' }

    if (req.user?.role !== 'ADMIN') {
      where.user = {
        OR: [
          { schoolProfile: { id: req.user!.schoolId } },
          { teacherProfile: { schoolId: req.user!.schoolId } },
          { studentProfile: { schoolId: req.user!.schoolId } }
        ]
      }
    }

    const notifications = await prisma.notification.findMany({
      where,
      include: {
        user: { select: { name: true, email: true } },
        lesson: { select: { title: true } }
      },
      orderBy: { scheduledAt: 'asc' }
    })

    res.json(apiResponse.success(notifications))
  } catch (error) {
    handleError(res, error)
  }
})

// Get notification by ID
router.get('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const notification = await prisma.notification.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, name: true, email: true, role: true } },
        lesson: {
          select: { id: true, title: true, course: { select: { id: true, name: true, schoolId: true } } }
        }
      }
    })

    if (!notification) {
      return res.status(404).json(apiResponse.error('Notification not found', 'NOT_FOUND'))
    }

    // Check access
    const canAccess = req.user?.role === 'ADMIN' ||
      notification.userId === req.user!.id ||
      (req.user?.schoolId && notification.lesson?.course?.schoolId === req.user.schoolId)

    if (!canAccess) {
      return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
    }

    res.json(apiResponse.success(notification))
  } catch (error) {
    handleError(res, error)
  }
})

// Create notification (admin/school admin)
router.post('/', authenticate, requireSchoolAdmin, validateRequest(createNotificationSchema), async (req: Request, res: Response) => {
  try {
    const data = req.body

    // Verify user exists
    const user = await prisma.user.findUnique({ where: { id: data.userId } })
    if (!user) {
      return res.status(404).json(apiResponse.error('User not found', 'USER_NOT_FOUND'))
    }

    // Verify lesson if provided
    if (data.lessonId) {
      const lesson = await prisma.lesson.findUnique({ where: { id: data.lessonId } })
      if (!lesson) {
        return res.status(404).json(apiResponse.error('Lesson not found', 'LESSON_NOT_FOUND'))
      }
    }

    const notification = await prisma.notification.create({
      data: {
        ...data,
        status: data.scheduledAt && new Date(data.scheduledAt) > new Date() ? 'PENDING' : 'PENDING'
      },
      include: {
        user: { select: { name: true, email: true } }
      }
    })

    res.status(201).json(apiResponse.success(notification, 'Notification created successfully'))
  } catch (error) {
    handleError(res, error)
  }
})

// Send notification immediately
router.post('/:id/send', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const notification = await prisma.notification.findUnique({
      where: { id },
      include: { user: true }
    })

    if (!notification) {
      return res.status(404).json(apiResponse.error('Notification not found', 'NOT_FOUND'))
    }

    if (notification.status === 'SENT') {
      return res.status(400).json(apiResponse.error('Notification already sent', 'ALREADY_SENT'))
    }

    // TODO: Actually send the notification (email, push, etc.)
    // For now, just mark as sent

    const updated = await prisma.notification.update({
      where: { id },
      data: { status: 'SENT', sentAt: new Date() }
    })

    res.json(apiResponse.success(updated, 'Notification sent'))
  } catch (error) {
    handleError(res, error)
  }
})

// Cancel scheduled notification
router.post('/:id/cancel', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const notification = await prisma.notification.findUnique({ where: { id } })

    if (!notification) {
      return res.status(404).json(apiResponse.error('Notification not found', 'NOT_FOUND'))
    }

    if (notification.status !== 'PENDING') {
      return res.status(400).json(apiResponse.error('Can only cancel pending notifications', 'INVALID_STATUS'))
    }

    const updated = await prisma.notification.update({
      where: { id },
      data: { status: 'CANCELLED' }
    })

    res.json(apiResponse.success(updated, 'Notification cancelled'))
  } catch (error) {
    handleError(res, error)
  }
})

// Update notification (only pending)
router.put('/:id', authenticate, requireSchoolAdmin, validateRequest(updateNotificationSchema), async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const notification = await prisma.notification.findUnique({ where: { id } })

    if (!notification) {
      return res.status(404).json(apiResponse.error('Notification not found', 'NOT_FOUND'))
    }

    if (notification.status !== 'PENDING') {
      return res.status(400).json(apiResponse.error('Can only update pending notifications', 'INVALID_STATUS'))
    }

    const updated = await prisma.notification.update({
      where: { id },
      data: req.body
    })

    res.json(apiResponse.success(updated, 'Notification updated'))
  } catch (error) {
    handleError(res, error)
  }
})

// Delete notification (only pending/cancelled)
router.delete('/:id', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const notification = await prisma.notification.findUnique({ where: { id } })

    if (!notification) {
      return res.status(404).json(apiResponse.error('Notification not found', 'NOT_FOUND'))
    }

    if (!['PENDING', 'CANCELLED'].includes(notification.status)) {
      return res.status(400).json(apiResponse.error('Can only delete pending or cancelled notifications', 'INVALID_STATUS'))
    }

    await prisma.notification.delete({ where: { id } })

    res.json(apiResponse.success(null, 'Notification deleted'))
  } catch (error) {
    handleError(res, error)
  }
})

// Bulk create notifications (e.g., for all students in a course)
router.post('/bulk', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  try {
    const { userIds, type, subject, content, lessonId, scheduledAt } = req.body

    if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
      return res.status(400).json(apiResponse.error('User IDs required', 'VALIDATION_ERROR'))
    }

    // Validate all users exist
    const users = await prisma.user.findMany({
      where: { id: { in: userIds } },
      select: { id: true }
    })

    if (users.length !== userIds.length) {
      return res.status(400).json(apiResponse.error('Some users not found', 'INVALID_USERS'))
    }

    const created = await prisma.notification.createMany({
      data: userIds.map((userId: string) => ({
        userId,
        type: type as NotificationType,
        subject,
        content,
        lessonId: lessonId || null,
        scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
        status: 'PENDING' as NotificationStatus
      }))
    })

    res.status(201).json(apiResponse.success({ count: created.count }, `${created.count} notifications created`))
  } catch (error) {
    handleError(res, error)
  }
})

export default router
