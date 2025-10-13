import { PrismaClient } from '@prisma/client'
import { Request } from 'express'

const prisma = new PrismaClient()

export type AuditAction =
  | 'login'
  | 'login_failed'
  | 'logout'
  | 'register'
  | 'password_change'
  | 'user_create'
  | 'user_update'
  | 'user_delete'
  | 'user_activate'
  | 'user_deactivate'
  | 'create'
  | 'read'
  | 'update'
  | 'delete'
  | 'vote'
  | 'vote_failed'
  | 'token_generate'
  | 'token_verify'
  | 'export'
  | 'permission_denied'

export type AuditResource =
  | 'user'
  | 'client'
  | 'roundtable'
  | 'session'
  | 'participant'
  | 'topic'
  | 'vote'
  | 'question'
  | 'feedback'
  | 'trainer'
  | 'notification'
  | 'email_template'
  | 'voting_token'

export interface AuditLogEntry {
  userId?: string
  action: AuditAction
  resource: AuditResource
  resourceId?: string
  ipAddress?: string
  userAgent?: string
  result: 'success' | 'failure'
  errorMessage?: string
  metadata?: any
}

export class AuditLogService {

  /**
   * Log an audit event
   */
  async log(entry: AuditLogEntry): Promise<void> {
    try {
      await prisma.auditLog.create({
        data: {
          userId: entry.userId,
          action: entry.action,
          resource: entry.resource,
          resourceId: entry.resourceId,
          ipAddress: entry.ipAddress,
          userAgent: entry.userAgent,
          result: entry.result,
          errorMessage: entry.errorMessage,
          metadata: entry.metadata ? JSON.parse(JSON.stringify(entry.metadata)) : null
        }
      })
    } catch (error) {
      // Don't throw errors from audit logging - it shouldn't break the main flow
      console.error('Failed to write audit log:', error)
    }
  }

  /**
   * Log from Express request context
   */
  async logFromRequest(
    req: Request,
    action: AuditAction,
    resource: AuditResource,
    result: 'success' | 'failure',
    options?: {
      resourceId?: string
      errorMessage?: string
      metadata?: any
    }
  ): Promise<void> {
    await this.log({
      userId: req.user?.id,
      action,
      resource,
      resourceId: options?.resourceId,
      ipAddress: this.getIpAddress(req),
      userAgent: req.headers['user-agent'],
      result,
      errorMessage: options?.errorMessage,
      metadata: options?.metadata
    })
  }

  /**
   * Log successful login
   */
  async logLogin(userId: string, req: Request): Promise<void> {
    await this.log({
      userId,
      action: 'login',
      resource: 'user',
      resourceId: userId,
      ipAddress: this.getIpAddress(req),
      userAgent: req.headers['user-agent'],
      result: 'success'
    })
  }

  /**
   * Log failed login attempt
   */
  async logLoginFailed(email: string, req: Request, reason?: string): Promise<void> {
    await this.log({
      action: 'login_failed',
      resource: 'user',
      ipAddress: this.getIpAddress(req),
      userAgent: req.headers['user-agent'],
      result: 'failure',
      errorMessage: reason,
      metadata: { email } // Log email for investigation, but carefully
    })
  }

  /**
   * Log user creation
   */
  async logUserCreate(createdUserId: string, createdBy: string, req: Request): Promise<void> {
    await this.log({
      userId: createdBy,
      action: 'user_create',
      resource: 'user',
      resourceId: createdUserId,
      ipAddress: this.getIpAddress(req),
      userAgent: req.headers['user-agent'],
      result: 'success'
    })
  }

  /**
   * Log permission denied
   */
  async logPermissionDenied(
    req: Request,
    resource: AuditResource,
    resourceId?: string,
    requiredPermission?: string
  ): Promise<void> {
    await this.log({
      userId: req.user?.id,
      action: 'permission_denied',
      resource,
      resourceId,
      ipAddress: this.getIpAddress(req),
      userAgent: req.headers['user-agent'],
      result: 'failure',
      metadata: { requiredPermission, userRole: req.user?.role }
    })
  }

  /**
   * Log data export
   */
  async logExport(
    userId: string,
    resource: AuditResource,
    req: Request,
    exportType: string
  ): Promise<void> {
    await this.log({
      userId,
      action: 'export',
      resource,
      ipAddress: this.getIpAddress(req),
      userAgent: req.headers['user-agent'],
      result: 'success',
      metadata: { exportType }
    })
  }

  /**
   * Get audit logs with filtering
   */
  async getAuditLogs(filters: {
    userId?: string
    action?: AuditAction
    resource?: AuditResource
    result?: 'success' | 'failure'
    startDate?: Date
    endDate?: Date
    page?: number
    limit?: number
  }) {
    const page = filters.page || 1
    const limit = Math.min(filters.limit || 50, 100) // Max 100 per page
    const skip = (page - 1) * limit

    const where: any = {}

    if (filters.userId) where.userId = filters.userId
    if (filters.action) where.action = filters.action
    if (filters.resource) where.resource = filters.resource
    if (filters.result) where.result = filters.result

    if (filters.startDate || filters.endDate) {
      where.createdAt = {}
      if (filters.startDate) where.createdAt.gte = filters.startDate
      if (filters.endDate) where.createdAt.lte = filters.endDate
    }

    const [logs, total] = await Promise.all([
      prisma.auditLog.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.auditLog.count({ where })
    ])

    return {
      logs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    }
  }

  /**
   * Get audit statistics
   */
  async getAuditStatistics(startDate?: Date, endDate?: Date) {
    const where: any = {}

    if (startDate || endDate) {
      where.createdAt = {}
      if (startDate) where.createdAt.gte = startDate
      if (endDate) where.createdAt.lte = endDate
    }

    const [
      totalLogs,
      failedActions,
      loginAttempts,
      failedLogins,
      permissionDenied,
      recentActivity
    ] = await Promise.all([
      prisma.auditLog.count({ where }),
      prisma.auditLog.count({ where: { ...where, result: 'failure' } }),
      prisma.auditLog.count({ where: { ...where, action: { in: ['login', 'login_failed'] } } }),
      prisma.auditLog.count({ where: { ...where, action: 'login_failed' } }),
      prisma.auditLog.count({ where: { ...where, action: 'permission_denied' } }),
      prisma.auditLog.findMany({
        where,
        take: 10,
        orderBy: { createdAt: 'desc' },
        select: {
          action: true,
          resource: true,
          result: true,
          createdAt: true,
          userId: true
        }
      })
    ])

    // Get activity by action
    const actionBreakdown = await prisma.auditLog.groupBy({
      by: ['action'],
      where,
      _count: true
    })

    // Get activity by resource
    const resourceBreakdown = await prisma.auditLog.groupBy({
      by: ['resource'],
      where,
      _count: true
    })

    return {
      totalLogs,
      failedActions,
      loginAttempts,
      failedLogins,
      permissionDenied,
      successRate: totalLogs > 0 ? ((totalLogs - failedActions) / totalLogs * 100).toFixed(2) : '100.00',
      actionBreakdown: actionBreakdown.map(a => ({
        action: a.action,
        count: a._count
      })),
      resourceBreakdown: resourceBreakdown.map(r => ({
        resource: r.resource,
        count: r._count
      })),
      recentActivity
    }
  }

  /**
   * Get suspicious activity
   */
  async getSuspiciousActivity(hours: number = 24) {
    const since = new Date(Date.now() - hours * 60 * 60 * 1000)

    const [
      repeatedFailures,
      permissionDenials,
      unusualActivity
    ] = await Promise.all([
      // Users/IPs with multiple failed login attempts
      prisma.auditLog.groupBy({
        by: ['ipAddress'],
        where: {
          action: 'login_failed',
          createdAt: { gte: since }
        },
        _count: true,
        having: {
          ipAddress: {
            _count: {
              gt: 3 // More than 3 failures
            }
          }
        }
      }),
      // Users with multiple permission denials
      prisma.auditLog.groupBy({
        by: ['userId'],
        where: {
          action: 'permission_denied',
          createdAt: { gte: since },
          userId: { not: null }
        },
        _count: true,
        having: {
          userId: {
            _count: {
              gt: 5 // More than 5 denials
            }
          }
        }
      }),
      // Unusual high-volume activity
      prisma.auditLog.groupBy({
        by: ['userId'],
        where: {
          createdAt: { gte: since },
          userId: { not: null }
        },
        _count: true,
        having: {
          userId: {
            _count: {
              gt: 100 // More than 100 actions in the time period
            }
          }
        }
      })
    ])

    return {
      repeatedFailedLogins: repeatedFailures,
      excessivePermissionDenials: permissionDenials,
      highVolumeUsers: unusualActivity,
      timeWindow: `Last ${hours} hours`
    }
  }

  /**
   * Clean up old audit logs (retention policy)
   */
  async cleanupOldLogs(retentionDays: number = 365): Promise<number> {
    const cutoffDate = new Date(Date.now() - retentionDays * 24 * 60 * 60 * 1000)

    const result = await prisma.auditLog.deleteMany({
      where: {
        createdAt: { lt: cutoffDate }
      }
    })

    console.log(`Cleaned up ${result.count} audit logs older than ${retentionDays} days`)
    return result.count
  }

  /**
   * Extract IP address from request
   */
  private getIpAddress(req: Request): string {
    // Check for proxied requests
    const forwarded = req.headers['x-forwarded-for']

    if (forwarded) {
      // x-forwarded-for can contain multiple IPs, take the first one
      const ips = typeof forwarded === 'string' ? forwarded.split(',') : forwarded
      return ips[0].trim()
    }

    return req.ip || req.socket.remoteAddress || 'unknown'
  }
}

// Export singleton instance
export const auditLog = new AuditLogService()
