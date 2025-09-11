import { Router, Request, Response } from 'express'
import { getErrorMessage } from '../utils/errorHandler'

const router = Router()

interface EmailTemplate {
  id: string
  name: string
  type: 'INVITATION' | 'REMINDER' | 'QUESTIONS' | 'FEEDBACK_REQUEST' | 'FOLLOW_UP' | 'CONFIRMATION' | 'CANCELLATION'
  subject: string
  content: string
  variables: string[]
  isActive: boolean
  isDefault: boolean
  category: 'PARTICIPANT' | 'TRAINER' | 'CLIENT' | 'SYSTEM'
  language: 'en' | 'it' | 'fr' | 'de' | 'es'
  description?: string
  createdAt: string
  updatedAt: string
  createdBy: string
  lastUsed?: string
  useCount: number
  tags: string[]
}

interface EmailTemplateStats {
  total: number
  active: number
  inactive: number
  byType: Record<string, number>
  byCategory: Record<string, number>
  byLanguage: Record<string, number>
  mostUsed: EmailTemplate[]
  recentlyUpdated: EmailTemplate[]
}

// Mock data for development
const mockEmailTemplates: EmailTemplate[] = [
  {
    id: '1',
    name: 'Session Invitation',
    type: 'INVITATION',
    subject: 'Invitation to {{session_title}} - {{roundtable_name}}',
    content: `Dear {{participant_name}},

You are invited to participate in our upcoming session:

**Session:** {{session_title}}
**Date:** {{session_date}}
**Time:** {{session_time}}
**Trainer:** {{trainer_name}}

Please confirm your attendance by clicking the link below:
{{confirmation_link}}

Best regards,
The Maka Roundtables Team`,
    variables: ['participant_name', 'session_title', 'roundtable_name', 'session_date', 'session_time', 'trainer_name', 'confirmation_link'],
    isActive: true,
    isDefault: true,
    category: 'PARTICIPANT',
    language: 'en',
    description: 'Standard invitation template for session participants',
    createdAt: '2023-06-15T10:00:00Z',
    updatedAt: '2024-01-15T14:30:00Z',
    createdBy: 'Admin',
    lastUsed: '2024-01-21T09:00:00Z',
    useCount: 156,
    tags: ['invitation', 'session', 'confirmation']
  },
  {
    id: '2',
    name: 'Question Collection',
    type: 'QUESTIONS',
    subject: 'Please submit your questions for {{session_title}}',
    content: `Dear {{participant_name}},

Our next session "{{session_title}}" is scheduled for {{session_date}}.

To make this session as valuable as possible, please submit your questions and topics of interest:

{{questions_form_link}}

**Deadline:** {{submission_deadline}}

Thank you for your participation!

Best regards,
{{trainer_name}}`,
    variables: ['participant_name', 'session_title', 'session_date', 'questions_form_link', 'submission_deadline', 'trainer_name'],
    isActive: true,
    isDefault: true,
    category: 'PARTICIPANT',
    language: 'en',
    description: 'Template for collecting participant questions before sessions',
    createdAt: '2023-06-15T10:15:00Z',
    updatedAt: '2024-01-10T11:20:00Z',
    createdBy: 'Admin',
    lastUsed: '2024-01-20T16:45:00Z',
    useCount: 89,
    tags: ['questions', 'preparation', 'engagement']
  },
  {
    id: '3',
    name: 'Session Reminder - Italian',
    type: 'REMINDER',
    subject: 'Promemoria: {{session_title}} - Domani alle {{session_time}}',
    content: `Gentile {{participant_name}},

Le ricordiamo che domani si terrà la sessione:

**Sessione:** {{session_title}}
**Data:** {{session_date}}
**Orario:** {{session_time}}
**Trainer:** {{trainer_name}}
**Link:** {{meeting_link}}

La preghiamo di connettersi 5 minuti prima dell'inizio.

Cordiali saluti,
Il Team Maka Roundtables`,
    variables: ['participant_name', 'session_title', 'session_date', 'session_time', 'trainer_name', 'meeting_link'],
    isActive: true,
    isDefault: false,
    category: 'PARTICIPANT',
    language: 'it',
    description: 'Reminder template for Italian-speaking participants',
    createdAt: '2023-07-20T09:30:00Z',
    updatedAt: '2023-12-05T16:15:00Z',
    createdBy: 'Admin',
    lastUsed: '2024-01-19T12:30:00Z',
    useCount: 67,
    tags: ['reminder', 'italian', 'meeting']
  },
  {
    id: '4',
    name: 'Feedback Request',
    type: 'FEEDBACK_REQUEST',
    subject: 'Your feedback on {{session_title}}',
    content: `Dear {{participant_name}},

Thank you for participating in "{{session_title}}" with {{trainer_name}}.

Your feedback is valuable to us. Please take a moment to share your thoughts:

{{feedback_form_link}}

**Session Rating:** {{rating_widget}}
**Key Topics Covered:**
{{session_topics}}

Your input helps us improve future sessions.

Best regards,
The Maka Roundtables Team`,
    variables: ['participant_name', 'session_title', 'trainer_name', 'feedback_form_link', 'rating_widget', 'session_topics'],
    isActive: true,
    isDefault: true,
    category: 'PARTICIPANT',
    language: 'en',
    description: 'Post-session feedback collection template',
    createdAt: '2023-06-15T10:30:00Z',
    updatedAt: '2024-01-08T13:45:00Z',
    createdBy: 'Admin',
    lastUsed: '2024-01-21T17:20:00Z',
    useCount: 134,
    tags: ['feedback', 'post-session', 'rating']
  },
  {
    id: '5',
    name: 'Trainer Assignment',
    type: 'CONFIRMATION',
    subject: 'New Session Assignment: {{session_title}}',
    content: `Dear {{trainer_name}},

You have been assigned to conduct a new session:

**Session:** {{session_title}}
**Roundtable:** {{roundtable_name}}
**Client:** {{client_name}}
**Date:** {{session_date}}
**Time:** {{session_time}}
**Participants:** {{participant_count}}

**Session Details:**
{{session_description}}

**Participant Questions:** {{questions_count}} submitted
{{view_questions_link}}

Please confirm your availability and prepare the session materials.

Best regards,
The Maka Roundtables Team`,
    variables: ['trainer_name', 'session_title', 'roundtable_name', 'client_name', 'session_date', 'session_time', 'participant_count', 'session_description', 'questions_count', 'view_questions_link'],
    isActive: true,
    isDefault: true,
    category: 'TRAINER',
    language: 'en',
    description: 'Template for notifying trainers of new session assignments',
    createdAt: '2023-06-15T11:00:00Z',
    updatedAt: '2023-11-22T10:30:00Z',
    createdBy: 'Admin',
    lastUsed: '2024-01-18T14:15:00Z',
    useCount: 45,
    tags: ['trainer', 'assignment', 'preparation']
  }
]

// GET /api/email-templates - Get all email templates
router.get('/', (req: Request, res: Response) => {
  try {
    const {
      type,
      category,
      language,
      isActive,
      search,
      page = 1,
      limit = 10
    } = req.query

    let filteredTemplates = [...mockEmailTemplates]

    // Apply filters
    if (type && type !== 'all') {
      filteredTemplates = filteredTemplates.filter(t => t.type === type)
    }

    if (category && category !== 'all') {
      filteredTemplates = filteredTemplates.filter(t => t.category === category)
    }

    if (language && language !== 'all') {
      filteredTemplates = filteredTemplates.filter(t => t.language === language)
    }

    if (isActive !== undefined) {
      const activeFilter = isActive === 'true'
      filteredTemplates = filteredTemplates.filter(t => t.isActive === activeFilter)
    }

    if (search) {
      const searchTerm = (search as string).toLowerCase()
      filteredTemplates = filteredTemplates.filter(t =>
        t.name.toLowerCase().includes(searchTerm) ||
        t.subject.toLowerCase().includes(searchTerm) ||
        t.description?.toLowerCase().includes(searchTerm) ||
        t.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      )
    }

    // Sort by last updated (newest first)
    filteredTemplates.sort((a, b) => 
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )

    // Pagination
    const pageNum = parseInt(page as string)
    const limitNum = parseInt(limit as string)
    const startIndex = (pageNum - 1) * limitNum
    const endIndex = startIndex + limitNum
    const paginatedTemplates = filteredTemplates.slice(startIndex, endIndex)

    res.json({
      success: true,
      data: paginatedTemplates,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: filteredTemplates.length,
        pages: Math.ceil(filteredTemplates.length / limitNum)
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch email templates',
      error: getErrorMessage(error)
    })
  }
})

// GET /api/email-templates/:id - Get specific email template
router.get('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const template = mockEmailTemplates.find(t => t.id === id)

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
    res.status(500).json({
      success: false,
      message: 'Failed to fetch email template',
      error: getErrorMessage(error)
    })
  }
})

// POST /api/email-templates - Create new email template
router.post('/', (req: Request, res: Response) => {
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

    // Validation
    if (!name || !type || !subject || !content || !category) {
      return res.status(400).json({
        success: false,
        message: 'Required fields: name, type, subject, content, category'
      })
    }

    // Extract variables from content
    const variableRegex = /\{\{([^}]+)\}\}/g
    const variables = []
    let match
    while ((match = variableRegex.exec(content)) !== null) {
      if (!variables.includes(match[1].trim())) {
        variables.push(match[1].trim())
      }
    }

    const newTemplate: EmailTemplate = {
      id: (mockEmailTemplates.length + 1).toString(),
      name,
      type,
      subject,
      content,
      variables,
      isActive,
      isDefault,
      category,
      language,
      description,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'Admin', // Would be from auth context
      useCount: 0,
      tags
    }

    mockEmailTemplates.push(newTemplate)

    res.status(201).json({
      success: true,
      data: newTemplate,
      message: 'Email template created successfully'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create email template',
      error: getErrorMessage(error)
    })
  }
})

// PUT /api/email-templates/:id - Update email template
router.put('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const templateIndex = mockEmailTemplates.findIndex(t => t.id === id)

    if (templateIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Email template not found'
      })
    }

    // Extract variables from updated content if content is being updated
    let variables = mockEmailTemplates[templateIndex].variables
    if (req.body.content) {
      const variableRegex = /\{\{([^}]+)\}\}/g
      variables = []
      let match
      while ((match = variableRegex.exec(req.body.content)) !== null) {
        if (!variables.includes(match[1].trim())) {
          variables.push(match[1].trim())
        }
      }
    }

    const updatedTemplate = {
      ...mockEmailTemplates[templateIndex],
      ...req.body,
      id, // Ensure ID doesn't change
      variables,
      updatedAt: new Date().toISOString()
    }

    mockEmailTemplates[templateIndex] = updatedTemplate

    res.json({
      success: true,
      data: updatedTemplate,
      message: 'Email template updated successfully'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update email template',
      error: getErrorMessage(error)
    })
  }
})

// DELETE /api/email-templates/:id - Delete email template
router.delete('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const templateIndex = mockEmailTemplates.findIndex(t => t.id === id)

    if (templateIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Email template not found'
      })
    }

    // Check if it's a default template
    if (mockEmailTemplates[templateIndex].isDefault) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete default template'
      })
    }

    const deletedTemplate = mockEmailTemplates.splice(templateIndex, 1)[0]

    res.json({
      success: true,
      data: deletedTemplate,
      message: 'Email template deleted successfully'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete email template',
      error: getErrorMessage(error)
    })
  }
})

// POST /api/email-templates/:id/duplicate - Duplicate template
router.post('/:id/duplicate', (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const template = mockEmailTemplates.find(t => t.id === id)

    if (!template) {
      return res.status(404).json({
        success: false,
        message: 'Email template not found'
      })
    }

    const duplicatedTemplate: EmailTemplate = {
      ...template,
      id: (mockEmailTemplates.length + 1).toString(),
      name: `${template.name} (Copy)`,
      isDefault: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      useCount: 0,
      lastUsed: undefined
    }

    mockEmailTemplates.push(duplicatedTemplate)

    res.status(201).json({
      success: true,
      data: duplicatedTemplate,
      message: 'Email template duplicated successfully'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to duplicate email template',
      error: getErrorMessage(error)
    })
  }
})

// POST /api/email-templates/:id/preview - Preview template with sample data
router.post('/:id/preview', (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { sampleData } = req.body
    
    const template = mockEmailTemplates.find(t => t.id === id)

    if (!template) {
      return res.status(404).json({
        success: false,
        message: 'Email template not found'
      })
    }

    // Replace variables with sample data
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
    res.status(500).json({
      success: false,
      message: 'Failed to generate template preview',
      error: getErrorMessage(error)
    })
  }
})

// GET /api/email-templates/stats/overview - Get email template statistics
router.get('/stats/overview', (req: Request, res: Response) => {
  try {
    const stats: EmailTemplateStats = {
      total: mockEmailTemplates.length,
      active: mockEmailTemplates.filter(t => t.isActive).length,
      inactive: mockEmailTemplates.filter(t => !t.isActive).length,
      byType: {
        INVITATION: mockEmailTemplates.filter(t => t.type === 'INVITATION').length,
        REMINDER: mockEmailTemplates.filter(t => t.type === 'REMINDER').length,
        QUESTIONS: mockEmailTemplates.filter(t => t.type === 'QUESTIONS').length,
        FEEDBACK_REQUEST: mockEmailTemplates.filter(t => t.type === 'FEEDBACK_REQUEST').length,
        FOLLOW_UP: mockEmailTemplates.filter(t => t.type === 'FOLLOW_UP').length,
        CONFIRMATION: mockEmailTemplates.filter(t => t.type === 'CONFIRMATION').length,
        CANCELLATION: mockEmailTemplates.filter(t => t.type === 'CANCELLATION').length
      },
      byCategory: {
        PARTICIPANT: mockEmailTemplates.filter(t => t.category === 'PARTICIPANT').length,
        TRAINER: mockEmailTemplates.filter(t => t.category === 'TRAINER').length,
        CLIENT: mockEmailTemplates.filter(t => t.category === 'CLIENT').length,
        SYSTEM: mockEmailTemplates.filter(t => t.category === 'SYSTEM').length
      },
      byLanguage: {
        en: mockEmailTemplates.filter(t => t.language === 'en').length,
        it: mockEmailTemplates.filter(t => t.language === 'it').length,
        fr: mockEmailTemplates.filter(t => t.language === 'fr').length,
        de: mockEmailTemplates.filter(t => t.language === 'de').length,
        es: mockEmailTemplates.filter(t => t.language === 'es').length
      },
      mostUsed: [...mockEmailTemplates]
        .sort((a, b) => b.useCount - a.useCount)
        .slice(0, 5),
      recentlyUpdated: [...mockEmailTemplates]
        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
        .slice(0, 5)
    }

    res.json({
      success: true,
      data: stats
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch email template statistics',
      error: getErrorMessage(error)
    })
  }
})

export default router