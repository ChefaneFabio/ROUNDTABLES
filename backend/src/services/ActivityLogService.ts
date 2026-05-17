import { prisma } from '../config/database'

export type ActivityAction =
  | 'USER_REGISTERED'
  | 'USER_LOGGED_IN'
  | 'USER_LOGGED_OUT'
  | 'LEARNER_INVITED'
  | 'ASSESSMENT_REQUESTED'
  | 'ASSESSMENT_REQUEST_APPROVED'
  | 'ASSESSMENT_REQUEST_DENIED'
  | 'ASSESSMENT_ASSIGNED'
  | 'ASSESSMENT_STARTED'
  | 'ASSESSMENT_PAUSED'
  | 'ASSESSMENT_RESUMED'
  | 'ASSESSMENT_RESTARTED'
  | 'ASSESSMENT_CANCELLED'
  | 'ASSESSMENT_COMPLETED'
  | 'SECTION_COMPLETED'
  | 'RETRY_REQUESTED'

export type ActivitySubjectType = 'Assessment' | 'AssessmentSection' | 'Student' | 'Teacher' | 'Organization' | 'User'

interface LogInput {
  action: ActivityAction
  // Either pass userId (we'll look up email/name/role) or pass them denormalized.
  // Use userId: null for SYSTEM events.
  userId?: string | null
  actorEmail?: string
  actorName?: string
  actorRole?: string
  subjectType?: ActivitySubjectType
  subjectId?: string
  metadata?: Record<string, any>
  ipAddress?: string
}

class ActivityLogService {
  /** Fire-and-forget log writer. Never throws — caller doesn't need to await. */
  async log(input: LogInput): Promise<void> {
    try {
      let actorEmail = input.actorEmail
      let actorName = input.actorName
      let actorRole = input.actorRole

      // If userId given but actor fields missing, look them up. Skipped for
      // SYSTEM events (userId === null) and when caller already provided fields.
      if (input.userId && (!actorEmail || !actorName || !actorRole)) {
        const u = await prisma.user.findUnique({
          where: { id: input.userId },
          select: { email: true, name: true, role: true },
        })
        if (u) {
          actorEmail = actorEmail || u.email
          actorName = actorName || u.name
          actorRole = actorRole || u.role
        }
      }

      await prisma.activityLog.create({
        data: {
          userId: input.userId ?? null,
          actorEmail,
          actorName,
          actorRole: actorRole || (input.userId ? undefined : 'SYSTEM'),
          action: input.action,
          subjectType: input.subjectType,
          subjectId: input.subjectId,
          metadata: input.metadata as any,
          ipAddress: input.ipAddress,
        },
      })
    } catch (err) {
      console.error('[ActivityLog] failed to write entry:', err)
    }
  }

  /** Page through entries for the admin viewer. */
  async list(opts: {
    page?: number
    limit?: number
    action?: string
    userId?: string
    dateFrom?: Date
    dateTo?: Date
  } = {}) {
    const page = Math.max(1, opts.page || 1)
    const limit = Math.min(200, Math.max(1, opts.limit || 50))
    const skip = (page - 1) * limit

    const where: any = {}
    if (opts.action) where.action = opts.action
    if (opts.userId) where.userId = opts.userId
    if (opts.dateFrom || opts.dateTo) {
      where.createdAt = {}
      if (opts.dateFrom) where.createdAt.gte = opts.dateFrom
      if (opts.dateTo) where.createdAt.lte = opts.dateTo
    }

    const [items, total] = await Promise.all([
      prisma.activityLog.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.activityLog.count({ where }),
    ])

    return { items, total, page, limit }
  }
}

export const activityLog = new ActivityLogService()
