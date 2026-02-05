import { Router, Request, Response } from 'express'
import Joi from 'joi'
import { validateRequest } from '../middleware/validateRequest'
import { authenticate } from '../middleware/auth'
import { requireSchoolAdmin } from '../middleware/rbac'
import { apiResponse, handleError } from '../utils/apiResponse'
import { certificateService } from '../services/CertificateService'

const router = Router()

// Validation schemas
const generateCertificateSchema = Joi.object({
  courseId: Joi.string().optional(),
  assessmentId: Joi.string().optional()
}).or('courseId', 'assessmentId')

// Get student's certificates
router.get('/my', authenticate, async (req: Request, res: Response) => {
  try {
    if (!req.user?.studentId) {
      return res.status(403).json(apiResponse.error('Only students can view their certificates', 'NOT_STUDENT'))
    }

    const certificates = await certificateService.getStudentCertificates(req.user.studentId)
    return res.json(apiResponse.success(certificates))
  } catch (error) {
    return handleError(res, error)
  }
})

// Verify a certificate (public)
router.get('/verify/:certificateNumber', async (req: Request, res: Response) => {
  try {
    const result = await certificateService.verifyCertificate(req.params.certificateNumber)
    return res.json(apiResponse.success(result))
  } catch (error) {
    return handleError(res, error)
  }
})

// Get certificate by ID
router.get('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const certificate = await certificateService.getCertificate(req.params.id)

    // Verify access
    if (req.user?.role === 'STUDENT' && certificate.studentId !== req.user.studentId) {
      return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
    }

    // Add LinkedIn share URL
    const linkedInUrl = certificateService.getLinkedInShareUrl(certificate)

    return res.json(apiResponse.success({ ...certificate, linkedInShareUrl: linkedInUrl }))
  } catch (error) {
    return handleError(res, error)
  }
})

// Generate certificate for course completion
router.post('/course/:courseId', authenticate, async (req: Request, res: Response) => {
  try {
    if (!req.user?.studentId) {
      return res.status(403).json(apiResponse.error('Only students can request certificates', 'NOT_STUDENT'))
    }

    const certificate = await certificateService.generateCourseCertificate(
      req.user.studentId,
      req.params.courseId
    )

    return res.status(201).json(apiResponse.success(certificate, 'Certificate generated'))
  } catch (error) {
    return handleError(res, error)
  }
})

// Generate certificate for assessment
router.post('/assessment/:assessmentId', authenticate, async (req: Request, res: Response) => {
  try {
    if (!req.user?.studentId) {
      return res.status(403).json(apiResponse.error('Only students can request certificates', 'NOT_STUDENT'))
    }

    const certificate = await certificateService.generateAssessmentCertificate(
      req.user.studentId,
      req.params.assessmentId
    )

    return res.status(201).json(apiResponse.success(certificate, 'Certificate generated'))
  } catch (error) {
    return handleError(res, error)
  }
})

// Download certificate PDF
router.get('/:id/download', authenticate, async (req: Request, res: Response) => {
  try {
    const certificate = await certificateService.getCertificate(req.params.id)

    // Verify access
    if (req.user?.role === 'STUDENT' && certificate.studentId !== req.user.studentId) {
      return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
    }

    const pdf = await certificateService.generatePdf(req.params.id)

    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `attachment; filename=certificate-${certificate.certificateNumber}.pdf`)
    return res.send(pdf)
  } catch (error) {
    return handleError(res, error)
  }
})

// Get school's certificates (school admin)
router.get('/school/all', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  try {
    if (!req.user?.schoolId) {
      return res.status(403).json(apiResponse.error('School profile required', 'NO_SCHOOL'))
    }

    const certificates = await certificateService.getSchoolCertificates(req.user.schoolId)
    return res.json(apiResponse.success(certificates))
  } catch (error) {
    return handleError(res, error)
  }
})

export default router
