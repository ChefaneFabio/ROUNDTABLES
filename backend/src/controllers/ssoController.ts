import { Router, Request, Response } from 'express'
import Joi from 'joi'
import { validateRequest } from '../middleware/validateRequest'
import { authenticate } from '../middleware/auth'
import { requireSchoolAdmin, requireAdmin } from '../middleware/rbac'
import { apiResponse, handleError } from '../utils/apiResponse'
import { ssoService } from '../services/SsoService'

const router = Router()

// Validation schemas
const configureSsoSchema = Joi.object({
  provider: Joi.string().valid('SAML', 'OIDC').required(),
  entityId: Joi.string().required(),
  ssoUrl: Joi.string().uri().required(),
  certificate: Joi.string().required(),
  metadata: Joi.object().optional()
})

// Get SSO configuration for current school
router.get('/config', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  try {
    if (!req.user?.schoolId) {
      return res.status(403).json(apiResponse.error('School profile required', 'NO_SCHOOL'))
    }

    const config = await ssoService.getSsoConfig(req.user.schoolId)

    // Don't expose the full certificate in response
    const safeConfig = {
      ...config,
      certificate: config.certificate ? '***configured***' : null
    }

    return res.json(apiResponse.success(safeConfig))
  } catch (error) {
    if ((error as Error).message === 'SSO not configured for this school') {
      return res.json(apiResponse.success(null, 'SSO not configured'))
    }
    return handleError(res, error)
  }
})

// Configure SSO for current school
router.post('/config', authenticate, requireSchoolAdmin, validateRequest(configureSsoSchema), async (req: Request, res: Response) => {
  try {
    if (!req.user?.schoolId) {
      return res.status(403).json(apiResponse.error('School profile required', 'NO_SCHOOL'))
    }

    const config = await ssoService.configureSso({
      schoolId: req.user.schoolId,
      ...req.body
    })

    return res.status(201).json(apiResponse.success(config, 'SSO configured successfully'))
  } catch (error) {
    return handleError(res, error)
  }
})

// Update SSO configuration
router.put('/config', authenticate, requireSchoolAdmin, validateRequest(configureSsoSchema), async (req: Request, res: Response) => {
  try {
    if (!req.user?.schoolId) {
      return res.status(403).json(apiResponse.error('School profile required', 'NO_SCHOOL'))
    }

    const config = await ssoService.configureSso({
      schoolId: req.user.schoolId,
      ...req.body
    })

    return res.json(apiResponse.success(config, 'SSO configuration updated'))
  } catch (error) {
    return handleError(res, error)
  }
})

// Toggle SSO status
router.patch('/config/status', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  try {
    if (!req.user?.schoolId) {
      return res.status(403).json(apiResponse.error('School profile required', 'NO_SCHOOL'))
    }

    const { isActive } = req.body
    if (typeof isActive !== 'boolean') {
      return res.status(400).json(apiResponse.error('isActive must be a boolean', 'VALIDATION_ERROR'))
    }

    const config = await ssoService.toggleSsoStatus(req.user.schoolId, isActive)
    return res.json(apiResponse.success(config, `SSO ${isActive ? 'enabled' : 'disabled'}`))
  } catch (error) {
    return handleError(res, error)
  }
})

// Delete SSO configuration
router.delete('/config', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  try {
    if (!req.user?.schoolId) {
      return res.status(403).json(apiResponse.error('School profile required', 'NO_SCHOOL'))
    }

    await ssoService.deleteSsoConfig(req.user.schoolId)
    return res.json(apiResponse.success(null, 'SSO configuration deleted'))
  } catch (error) {
    return handleError(res, error)
  }
})

// ==================== SSO Login Flow ====================

// Initiate SSO login (public - called from login page)
router.get('/login/:schoolId', async (req: Request, res: Response) => {
  try {
    const { returnUrl } = req.query
    const result = await ssoService.generateSamlLoginUrl(
      req.params.schoolId,
      returnUrl as string
    )

    // In production, redirect to the IdP
    // For now, return the URL
    return res.json(apiResponse.success(result))
  } catch (error) {
    return handleError(res, error)
  }
})

// SSO callback (called by IdP after authentication)
router.post('/callback/:schoolId', async (req: Request, res: Response) => {
  try {
    const { SAMLResponse, RelayState } = req.body

    if (!SAMLResponse) {
      return res.status(400).json(apiResponse.error('SAML response required', 'VALIDATION_ERROR'))
    }

    const result = await ssoService.processSamlCallback(
      req.params.schoolId,
      SAMLResponse,
      RelayState
    )

    // In production, redirect to frontend with tokens
    // For now, return the authentication result
    return res.json(apiResponse.success(result, 'SSO login successful'))
  } catch (error) {
    return handleError(res, error)
  }
})

// ==================== Admin Routes ====================

// Get all SSO configurations (admin)
router.get('/admin/all', authenticate, requireAdmin, async (req: Request, res: Response) => {
  try {
    const configs = await ssoService.getAllSsoConfigs()

    // Don't expose certificates
    const safeConfigs = configs.map(c => ({
      ...c,
      certificate: c.certificate ? '***configured***' : null
    }))

    return res.json(apiResponse.success(safeConfigs))
  } catch (error) {
    return handleError(res, error)
  }
})

// Get SSO config for specific school (admin)
router.get('/admin/:schoolId', authenticate, requireAdmin, async (req: Request, res: Response) => {
  try {
    const config = await ssoService.getSsoConfig(req.params.schoolId)
    return res.json(apiResponse.success(config))
  } catch (error) {
    return handleError(res, error)
  }
})

export default router
