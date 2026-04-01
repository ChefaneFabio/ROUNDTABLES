import { Router, Request, Response } from 'express'
import Joi from 'joi'
import { prisma } from '../config/database'
import { authenticate } from '../middleware/auth'
import { requireAdmin } from '../middleware/rbac'
import { validateRequest } from '../middleware/validateRequest'
import { apiResponse, handleError } from '../utils/apiResponse'

const router = Router()

const createContactSchema = Joi.object({
  name: Joi.string().min(2).max(200).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().max(50).optional().allow(null),
  role: Joi.string().max(100).optional().allow(null),
  branch: Joi.string().max(200).optional().allow(null)
})

const updateContactSchema = Joi.object({
  name: Joi.string().min(2).max(200).optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().max(50).optional().allow(null),
  role: Joi.string().max(100).optional().allow(null),
  branch: Joi.string().max(200).optional().allow(null),
  isActive: Joi.boolean().optional()
})

// GET /organizations/:orgId/contacts
router.get('/:orgId/contacts', authenticate, async (req: Request, res: Response) => {
  try {
    const { orgId } = req.params

    const contacts = await prisma.organizationContact.findMany({
      where: { organizationId: orgId },
      include: {
        courseContacts: {
          include: {
            course: { select: { id: true, name: true, status: true } }
          }
        }
      },
      orderBy: { name: 'asc' }
    })

    res.json(apiResponse.success(contacts))
  } catch (error) {
    handleError(res, error)
  }
})

// POST /organizations/:orgId/contacts
router.post('/:orgId/contacts', authenticate, requireAdmin, validateRequest(createContactSchema), async (req: Request, res: Response) => {
  try {
    const { orgId } = req.params
    const { name, email, phone, role, branch } = req.body

    const org = await prisma.organization.findUnique({ where: { id: orgId } })
    if (!org) return res.status(404).json(apiResponse.error('Organization not found', 'NOT_FOUND'))

    const contact = await prisma.organizationContact.create({
      data: { organizationId: orgId, name, email, phone, role, branch }
    })

    res.status(201).json(apiResponse.success(contact, 'Contact created'))
  } catch (error) {
    handleError(res, error)
  }
})

// PUT /organizations/:orgId/contacts/:contactId
router.put('/:orgId/contacts/:contactId', authenticate, requireAdmin, validateRequest(updateContactSchema), async (req: Request, res: Response) => {
  try {
    const { orgId, contactId } = req.params

    // Verify contact belongs to this organization
    const existing = await prisma.organizationContact.findFirst({
      where: { id: contactId, organizationId: orgId }
    })
    if (!existing) {
      return res.status(404).json(apiResponse.error('Contact not found in this organization', 'NOT_FOUND'))
    }

    const contact = await prisma.organizationContact.update({
      where: { id: contactId },
      data: req.body
    })

    res.json(apiResponse.success(contact))
  } catch (error) {
    handleError(res, error)
  }
})

// DELETE /organizations/:orgId/contacts/:contactId
router.delete('/:orgId/contacts/:contactId', authenticate, requireAdmin, async (req: Request, res: Response) => {
  try {
    const { orgId, contactId } = req.params

    // Verify contact belongs to this organization
    const existing = await prisma.organizationContact.findFirst({
      where: { id: contactId, organizationId: orgId }
    })
    if (!existing) {
      return res.status(404).json(apiResponse.error('Contact not found in this organization', 'NOT_FOUND'))
    }

    await prisma.courseContact.deleteMany({ where: { contactId } })
    await prisma.organizationContact.delete({ where: { id: contactId } })

    res.json(apiResponse.success(null, 'Contact deleted'))
  } catch (error) {
    handleError(res, error)
  }
})

// POST /organizations/:orgId/contacts/:contactId/courses
router.post('/:orgId/contacts/:contactId/courses', authenticate, requireAdmin, async (req: Request, res: Response) => {
  try {
    const { orgId, contactId } = req.params
    const { courseIds } = req.body as { courseIds: string[] }

    // Verify contact belongs to this organization
    const existing = await prisma.organizationContact.findFirst({
      where: { id: contactId, organizationId: orgId }
    })
    if (!existing) {
      return res.status(404).json(apiResponse.error('Contact not found in this organization', 'NOT_FOUND'))
    }

    if (!courseIds || !Array.isArray(courseIds) || courseIds.length === 0) {
      return res.status(400).json(apiResponse.error('courseIds array is required', 'VALIDATION_ERROR'))
    }

    const created = await prisma.$transaction(
      courseIds.map(courseId =>
        prisma.courseContact.upsert({
          where: { courseId_contactId: { courseId, contactId } },
          create: { courseId, contactId },
          update: {}
        })
      )
    )

    res.json(apiResponse.success(created))
  } catch (error) {
    handleError(res, error)
  }
})

// DELETE /organizations/:orgId/contacts/:contactId/courses/:courseId
router.delete('/:orgId/contacts/:contactId/courses/:courseId', authenticate, requireAdmin, async (req: Request, res: Response) => {
  try {
    const { orgId, contactId, courseId } = req.params

    // Verify contact belongs to this organization
    const existing = await prisma.organizationContact.findFirst({
      where: { id: contactId, organizationId: orgId }
    })
    if (!existing) {
      return res.status(404).json(apiResponse.error('Contact not found in this organization', 'NOT_FOUND'))
    }

    await prisma.courseContact.delete({
      where: { courseId_contactId: { courseId, contactId } }
    })

    res.json(apiResponse.success(null, 'Contact unlinked from course'))
  } catch (error) {
    handleError(res, error)
  }
})

// GET /courses/:courseId/contacts
router.get('/courses/:courseId/contacts', authenticate, async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params

    const courseContacts = await prisma.courseContact.findMany({
      where: { courseId },
      include: { contact: true }
    })

    res.json(apiResponse.success(courseContacts.map(cc => cc.contact)))
  } catch (error) {
    handleError(res, error)
  }
})

export default router
