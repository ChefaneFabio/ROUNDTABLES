import { Router, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import Joi from 'joi'
import { validateRequest } from '../middleware/validateRequest'
import { authenticate, authorize } from '../middleware/auth'
import { auditLog } from '../services/AuditLogService'
import { sanitizeText, sanitizeEmail, sanitizeId } from '../utils/sanitize'
import { createLimiter } from '../middleware/rateLimiter'

const router = Router()
const prisma = new PrismaClient()

// Require authentication for all client routes
router.use(authenticate)

// Validation schemas
const createClientSchema = Joi.object({
  name: Joi.string().required().min(2).max(100),
  email: Joi.string().email().required(),
  company: Joi.string().required().min(2).max(100),
  description: Joi.string().optional().max(500)
})

const updateClientSchema = Joi.object({
  name: Joi.string().optional().min(2).max(100),
  email: Joi.string().email().optional(),
  company: Joi.string().optional().min(2).max(100),
  description: Joi.string().optional().max(500)
})

// Get all clients
// ADMIN and COORDINATOR can view clients
router.get('/', authorize('ADMIN', 'COORDINATOR'), async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, search } = req.query

    const skip = (Number(page) - 1) * Number(limit)
    const searchTerm = search ? sanitizeText(String(search)) : ''
    const where = searchTerm
      ? {
          OR: [
            { name: { contains: searchTerm, mode: 'insensitive' as const } },
            { company: { contains: searchTerm, mode: 'insensitive' as const } },
            { email: { contains: searchTerm, mode: 'insensitive' as const } }
          ]
        }
      : {}

    const [clients, total] = await Promise.all([
      prisma.client.findMany({
        where,
        skip,
        take: Number(limit),
        include: {
          roundtables: {
            select: {
              id: true,
              name: true,
              status: true,
              createdAt: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.client.count({ where })
    ])

    res.json({
      success: true,
      data: clients,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit))
      }
    })
  } catch (error) {
    console.error('Error fetching clients:', error)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
})

// Get client by ID
// ADMIN and COORDINATOR can view client details
router.get('/:id', authorize('ADMIN', 'COORDINATOR'), async (req: Request, res: Response) => {
  try {
    const id = sanitizeId(req.params.id)

    const client = await prisma.client.findUnique({
      where: { id },
      include: {
        roundtables: {
          include: {
            participants: true,
            sessions: {
              where: { status: { in: ['SCHEDULED', 'IN_PROGRESS'] } },
              select: {
                id: true,
                sessionNumber: true,
                scheduledAt: true,
                status: true,
                topic: { select: { title: true } }
              }
            }
          }
        }
      }
    })

    if (!client) {
      await auditLog.logFromRequest(req, 'read', 'client', 'failure', {
        resourceId: id,
        errorMessage: 'Client not found'
      })
      return res.status(404).json({ success: false, error: 'Client not found' })
    }

    await auditLog.logFromRequest(req, 'read', 'client', 'success', { resourceId: id })

    res.json({ success: true, data: client })
  } catch (error) {
    console.error('Error fetching client:', error)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
})

// Create new client
// ADMIN and COORDINATOR can create clients
router.post('/',
  authorize('ADMIN', 'COORDINATOR'),
  createLimiter,
  validateRequest(createClientSchema),
  async (req: Request, res: Response) => {
    try {
      const name = sanitizeText(req.body.name)
      const email = sanitizeEmail(req.body.email)
      const company = sanitizeText(req.body.company)
      const description = req.body.description ? sanitizeText(req.body.description) : undefined

      const existingClient = await prisma.client.findFirst({
        where: { email }
      })

      if (existingClient) {
        await auditLog.logFromRequest(req, 'create', 'client', 'failure', {
          errorMessage: 'Duplicate email'
        })
        return res.status(400).json({
          success: false,
          error: 'Client with this email already exists'
        })
      }

      const client = await prisma.client.create({
        data: {
          name,
          email,
          company,
          description
        }
      })

      await auditLog.logFromRequest(req, 'create', 'client', 'success', {
        resourceId: client.id
      })

      res.status(201).json({ success: true, data: client })
    } catch (error) {
      console.error('Error creating client:', error)
      await auditLog.logFromRequest(req, 'create', 'client', 'failure', {
        errorMessage: error instanceof Error ? error.message : 'Unknown error'
      })
      res.status(500).json({ success: false, error: 'Internal server error' })
    }
  }
)

// Update client
// ADMIN and COORDINATOR can update clients
router.put('/:id',
  authorize('ADMIN', 'COORDINATOR'),
  validateRequest(updateClientSchema),
  async (req: Request, res: Response) => {
    try {
      const id = sanitizeId(req.params.id)

      const updates: any = {}
      if (req.body.name) updates.name = sanitizeText(req.body.name)
      if (req.body.email) updates.email = sanitizeEmail(req.body.email)
      if (req.body.company) updates.company = sanitizeText(req.body.company)
      if (req.body.description !== undefined) {
        updates.description = req.body.description ? sanitizeText(req.body.description) : null
      }

      const existingClient = await prisma.client.findUnique({
        where: { id }
      })

      if (!existingClient) {
        await auditLog.logFromRequest(req, 'update', 'client', 'failure', {
          resourceId: id,
          errorMessage: 'Client not found'
        })
        return res.status(404).json({ success: false, error: 'Client not found' })
      }

      // Check email uniqueness if email is being updated
      if (updates.email && updates.email !== existingClient.email) {
        const emailExists = await prisma.client.findFirst({
          where: { email: updates.email, NOT: { id } }
        })

        if (emailExists) {
          await auditLog.logFromRequest(req, 'update', 'client', 'failure', {
            resourceId: id,
            errorMessage: 'Duplicate email'
          })
          return res.status(400).json({
            success: false,
            error: 'Client with this email already exists'
          })
        }
      }

      const client = await prisma.client.update({
        where: { id },
        data: updates
      })

      await auditLog.logFromRequest(req, 'update', 'client', 'success', {
        resourceId: id
      })

      res.json({ success: true, data: client })
    } catch (error) {
      console.error('Error updating client:', error)
      res.status(500).json({ success: false, error: 'Internal server error' })
    }
  }
)

// Delete client
// Only ADMIN can delete clients
router.delete('/:id', authorize('ADMIN'), async (req: Request, res: Response) => {
  try {
    const id = sanitizeId(req.params.id)

    const client = await prisma.client.findUnique({
      where: { id },
      include: { roundtables: true }
    })

    if (!client) {
      await auditLog.logFromRequest(req, 'delete', 'client', 'failure', {
        resourceId: id,
        errorMessage: 'Client not found'
      })
      return res.status(404).json({ success: false, error: 'Client not found' })
    }

    // Check if client has active roundtables
    const hasActiveRoundtables = client.roundtables.some(
      rt => rt.status !== 'COMPLETED' && rt.status !== 'CANCELLED'
    )

    if (hasActiveRoundtables) {
      await auditLog.logFromRequest(req, 'delete', 'client', 'failure', {
        resourceId: id,
        errorMessage: 'Has active roundtables'
      })
      return res.status(400).json({
        success: false,
        error: 'Cannot delete client with active roundtables'
      })
    }

    await prisma.client.delete({ where: { id } })

    await auditLog.logFromRequest(req, 'delete', 'client', 'success', {
      resourceId: id
    })

    res.json({ success: true, message: 'Client deleted successfully' })
  } catch (error) {
    console.error('Error deleting client:', error)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
})

export default router