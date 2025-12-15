import { Router, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { getErrorMessage } from '../utils/errorHandler'

const router = Router()
const prisma = new PrismaClient()

// GET /api/email-templates - Get all email templates
router.get('/', async (req: Request, res: Response) => {
  try {
    const {
      type,
      category,
      language,
      isActive,
      search,
      page = 1,
      limit = 50
    } = req.query

    const pageNum = parseInt(page as string)
    const limitNum = parseInt(limit as string)
    const skip = (pageNum - 1) * limitNum

    // Build where clause
    const where: any = {}

    if (type && type !== 'all') {
      where.type = type
    }

    if (category && category !== 'all') {
      where.category = category
    }

    if (language && language !== 'all') {
      where.language = language
    }

    if (isActive !== undefined) {
      where.isActive = isActive === 'true'
    }

    if (search) {
      const searchTerm = search as string
      where.OR = [
        { name: { contains: searchTerm, mode: 'insensitive' } },
        { subject: { contains: searchTerm, mode: 'insensitive' } },
        { description: { contains: searchTerm, mode: 'insensitive' } }
      ]
    }

    const [templates, total] = await Promise.all([
      prisma.emailTemplate.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { updatedAt: 'desc' }
      }),
      prisma.emailTemplate.count({ where })
    ])

    res.json({
      success: true,
      data: templates,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum)
      }
    })
  } catch (error) {
    console.error('Error fetching email templates:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch email templates',
      error: getErrorMessage(error)
    })
  }
})

// GET /api/email-templates/stats/overview - Get email template statistics
router.get('/stats/overview', async (req: Request, res: Response) => {
  try {
    const [total, active, inactive] = await Promise.all([
      prisma.emailTemplate.count(),
      prisma.emailTemplate.count({ where: { isActive: true } }),
      prisma.emailTemplate.count({ where: { isActive: false } })
    ])

    res.json({
      success: true,
      data: {
        total,
        active,
        inactive
      }
    })
  } catch (error) {
    console.error('Error fetching email template stats:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch email template statistics',
      error: getErrorMessage(error)
    })
  }
})

// GET /api/email-templates/:id - Get specific email template
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const template = await prisma.emailTemplate.findUnique({
      where: { id }
    })

    if (!template) {
      return res.status(404).json({
        success: false,
        message: 'Email template not found'
      })
    }

    res.json({
      success: true,
      data: template
    })
  } catch (error) {
    console.error('Error fetching email template:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch email template',
      error: getErrorMessage(error)
    })
  }
})

// POST /api/email-templates - Create new email template
router.post('/', async (req: Request, res: Response) => {
  try {
    const {
      name,
      type,
      subject,
      content,
      category,
      language = 'en',
      description,
      tags = [],
      isActive = true,
      isDefault = false
    } = req.body

    if (!name || !type || !subject || !content || !category) {
      return res.status(400).json({
        success: false,
        message: 'Required fields: name, type, subject, content, category'
      })
    }

    // Extract variables from content
    const variableRegex = /\{\{([^}]+)\}\}/g
    const variables: string[] = []
    let match
    while ((match = variableRegex.exec(content)) !== null) {
      const varName = match[1].trim()
      if (!variables.includes(varName)) {
        variables.push(varName)
      }
    }

    const template = await prisma.emailTemplate.create({
      data: {
        name,
        type,
        subject,
        content,
        category,
        language,
        description,
        tags,
        variables,
        isActive,
        isDefault,
        createdBy: 'system'
      }
    })

    res.status(201).json({
      success: true,
      data: template,
      message: 'Email template created successfully'
    })
  } catch (error) {
    console.error('Error creating email template:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to create email template',
      error: getErrorMessage(error)
    })
  }
})

// PUT /api/email-templates/:id - Update email template
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const existing = await prisma.emailTemplate.findUnique({ where: { id } })

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: 'Email template not found'
      })
    }

    // Extract variables if content is being updated
    let variables = existing.variables
    if (req.body.content) {
      const variableRegex = /\{\{([^}]+)\}\}/g
      variables = []
      let match
      while ((match = variableRegex.exec(req.body.content)) !== null) {
        const varName = match[1].trim()
        if (!variables.includes(varName)) {
          variables.push(varName)
        }
      }
    }

    const template = await prisma.emailTemplate.update({
      where: { id },
      data: {
        ...req.body,
        variables
      }
    })

    res.json({
      success: true,
      data: template,
      message: 'Email template updated successfully'
    })
  } catch (error) {
    console.error('Error updating email template:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to update email template',
      error: getErrorMessage(error)
    })
  }
})

// DELETE /api/email-templates/:id - Delete email template
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const existing = await prisma.emailTemplate.findUnique({ where: { id } })

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: 'Email template not found'
      })
    }

    if (existing.isDefault) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete default template'
      })
    }

    await prisma.emailTemplate.delete({ where: { id } })

    res.json({
      success: true,
      message: 'Email template deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting email template:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to delete email template',
      error: getErrorMessage(error)
    })
  }
})

// POST /api/email-templates/:id/preview - Preview template with sample data
router.post('/:id/preview', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { sampleData } = req.body

    const template = await prisma.emailTemplate.findUnique({ where: { id } })

    if (!template) {
      return res.status(404).json({
        success: false,
        message: 'Email template not found'
      })
    }

    let previewSubject = template.subject
    let previewContent = template.content

    if (sampleData) {
      Object.keys(sampleData).forEach(key => {
        const regex = new RegExp(`\\{\\{\\s*${key}\\s*\\}\\}`, 'g')
        previewSubject = previewSubject.replace(regex, sampleData[key])
        previewContent = previewContent.replace(regex, sampleData[key])
      })
    }

    res.json({
      success: true,
      data: {
        subject: previewSubject,
        content: previewContent,
        variables: template.variables,
        missingVariables: template.variables.filter(v => !sampleData || !(v in sampleData))
      }
    })
  } catch (error) {
    console.error('Error generating template preview:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to generate template preview',
      error: getErrorMessage(error)
    })
  }
})

export default router
