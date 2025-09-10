import { Router, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import Joi from 'joi'
import { validateRequest } from '../middleware/validateRequest'

const router = Router()
const prisma = new PrismaClient()

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
router.get('/', async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, search } = req.query

    const skip = (Number(page) - 1) * Number(limit)
    const where = search 
      ? {
          OR: [
            { name: { contains: String(search), mode: 'insensitive' as const } },
            { company: { contains: String(search), mode: 'insensitive' as const } },
            { email: { contains: String(search), mode: 'insensitive' as const } }
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
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params

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
      return res.status(404).json({ success: false, error: 'Client not found' })
    }

    res.json({ success: true, data: client })
  } catch (error) {
    console.error('Error fetching client:', error)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
})

// Create new client
router.post('/', validateRequest(createClientSchema), async (req: Request, res: Response) => {
  try {
    const { name, email, company, description } = req.body

    const existingClient = await prisma.client.findFirst({
      where: { email }
    })

    if (existingClient) {
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

    res.status(201).json({ success: true, data: client })
  } catch (error) {
    console.error('Error creating client:', error)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
})

// Update client
router.put('/:id', validateRequest(updateClientSchema), async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const updates = req.body

    const existingClient = await prisma.client.findUnique({
      where: { id }
    })

    if (!existingClient) {
      return res.status(404).json({ success: false, error: 'Client not found' })
    }

    // Check email uniqueness if email is being updated
    if (updates.email && updates.email !== existingClient.email) {
      const emailExists = await prisma.client.findFirst({
        where: { email: updates.email, NOT: { id } }
      })

      if (emailExists) {
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

    res.json({ success: true, data: client })
  } catch (error) {
    console.error('Error updating client:', error)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
})

// Delete client
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const client = await prisma.client.findUnique({
      where: { id },
      include: { roundtables: true }
    })

    if (!client) {
      return res.status(404).json({ success: false, error: 'Client not found' })
    }

    // Check if client has active roundtables
    const hasActiveRoundtables = client.roundtables.some(
      rt => rt.status !== 'COMPLETED' && rt.status !== 'CANCELLED'
    )

    if (hasActiveRoundtables) {
      return res.status(400).json({ 
        success: false, 
        error: 'Cannot delete client with active roundtables' 
      })
    }

    await prisma.client.delete({ where: { id } })

    res.json({ success: true, message: 'Client deleted successfully' })
  } catch (error) {
    console.error('Error deleting client:', error)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
})

export default router