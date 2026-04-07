import { Router, Request, Response } from 'express'
import Joi from 'joi'
import path from 'path'
import fs from 'fs'
import multer from 'multer'
import AdmZip from 'adm-zip'
import { parseStringPromise } from 'xml2js'
import { prisma } from '../config/database'
import { authenticate } from '../middleware/auth'
import { requireSchoolAdmin, requireTeacher } from '../middleware/rbac'
import { validateRequest } from '../middleware/validateRequest'
import { apiResponse, handleError } from '../utils/apiResponse'
import { CertificateService } from '../services/CertificateService'

const certificateService = new CertificateService()

const router = Router()

// ─── Upload config ───────────────────────────────────────────────
const scormDir = path.join(__dirname, '../../uploads/scorm')
if (!fs.existsSync(scormDir)) {
  fs.mkdirSync(scormDir, { recursive: true })
}

const MAX_EXTRACTED_SIZE = 2 * 1024 * 1024 * 1024 // 2GB max extracted size

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, scormDir),
  filename: (_req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
    cb(null, `scorm-${uniqueSuffix}.zip`)
  }
})

const upload = multer({
  storage,
  limits: { fileSize: 500 * 1024 * 1024 }, // 500MB — SCORM packages can be large
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === 'application/zip' ||
        file.mimetype === 'application/x-zip-compressed' ||
        file.originalname.endsWith('.zip')) {
      cb(null, true)
    } else {
      cb(new Error('Only ZIP files are allowed for SCORM packages'))
    }
  }
})

// ─── Validation schemas ──────────────────────────────────────────
const updatePackageSchema = Joi.object({
  title: Joi.string().max(200).optional(),
  description: Joi.string().max(2000).optional().allow(''),
  isPublished: Joi.boolean().optional(),
  passingScore: Joi.number().integer().min(0).max(100).optional().allow(null),
  thumbnailUrl: Joi.string().uri().optional().allow('')
})

const saveRuntimeSchema = Joi.object({
  cmiData: Joi.object().required()
})

// ─── Helpers ─────────────────────────────────────────────────────

/**
 * Validate an entry point path is safe (no traversal, relative only)
 */
function validateEntryPoint(entryPoint: string): boolean {
  if (!entryPoint) return false
  // Must not start with / or contain ..
  if (entryPoint.startsWith('/')) return false
  if (entryPoint.includes('..')) return false
  // Must not be an absolute URL
  if (/^https?:\/\//i.test(entryPoint)) return false
  // Must not contain null bytes
  if (entryPoint.includes('\0')) return false
  return true
}

/**
 * Validate ZIP entries for path traversal before extraction
 */
function validateZipEntries(zip: AdmZip, targetDir: string): { safe: boolean; totalSize: number } {
  const resolvedTarget = path.resolve(targetDir)
  let totalSize = 0

  for (const entry of zip.getEntries()) {
    const resolvedPath = path.resolve(targetDir, entry.entryName)
    if (!resolvedPath.startsWith(resolvedTarget + path.sep) && resolvedPath !== resolvedTarget) {
      return { safe: false, totalSize }
    }
    totalSize += entry.header.size
  }

  return { safe: true, totalSize }
}

/**
 * Parse imsmanifest.xml to extract SCORM version and entry point
 */
async function parseManifest(manifestPath: string): Promise<{
  version: 'SCORM_12' | 'SCORM_2004'
  entryPoint: string
  title: string
}> {
  // Limit manifest size to prevent DoS
  const stats = fs.statSync(manifestPath)
  if (stats.size > 5 * 1024 * 1024) { // 5MB max manifest
    throw new Error('Manifest file too large')
  }

  const xml = fs.readFileSync(manifestPath, 'utf-8')
  const result = await parseStringPromise(xml, { explicitArray: false })

  const manifest = result.manifest
  if (!manifest) throw new Error('Invalid SCORM manifest: no <manifest> root element')

  // Detect version from metadata or namespace
  const xmlStr = xml.toLowerCase()
  const is2004 = xmlStr.includes('adlcp:scormtype') ||
                 xmlStr.includes('2004') ||
                 xmlStr.includes('adlseq') ||
                 xmlStr.includes('adlnav')
  const version = is2004 ? 'SCORM_2004' : 'SCORM_12'

  // Extract entry point — navigate organizations → organization → item → resource
  let entryPoint = ''
  let title = 'SCORM Package'

  const organizations = manifest.organizations
  if (organizations) {
    const org = organizations.organization
    const orgData = Array.isArray(org) ? org[0] : org
    if (orgData) {
      title = orgData.title || title
      const item = Array.isArray(orgData.item) ? orgData.item[0] : orgData.item
      if (item) {
        title = item.title || title
        const identifierref = item.$ && item.$.identifierref
        if (identifierref && manifest.resources) {
          const resources = manifest.resources.resource
          const resourceList = Array.isArray(resources) ? resources : [resources]
          const matched = resourceList.find((r: any) =>
            r.$ && r.$.identifier === identifierref
          )
          if (matched && matched.$.href) {
            entryPoint = matched.$.href
          }
        }
      }
    }
  }

  // Fallback: look for first resource with href
  if (!entryPoint && manifest.resources) {
    const resources = manifest.resources.resource
    const resourceList = Array.isArray(resources) ? resources : [resources]
    const first = resourceList.find((r: any) => r.$ && r.$.href)
    if (first) entryPoint = first.$.href
  }

  if (!entryPoint) throw new Error('Could not find entry point in SCORM manifest')

  // Validate entry point is safe
  if (!validateEntryPoint(entryPoint)) {
    throw new Error('Invalid entry point path in SCORM manifest')
  }

  return { version, entryPoint, title }
}

function getSchoolId(req: Request): string {
  return (req as any).user?.schoolId ||
         (req as any).user?.schoolProfile?.id ||
         (req as any).user?.teacherProfile?.schoolId ||
         (req as any).user?.studentProfile?.schoolId || ''
}

function getUserId(req: Request): string {
  return (req as any).user?.id || ''
}

function getStudentId(req: Request): string | null {
  return (req as any).user?.studentProfile?.id || null
}

/**
 * Verify that a SCORM package belongs to the requesting user's school
 */
async function requirePackageAccess(req: Request, packageId: string): Promise<any> {
  const pkg = await prisma.scormPackage.findUnique({ where: { id: packageId } })
  if (!pkg) return null

  const schoolId = getSchoolId(req)
  if (pkg.schoolId !== schoolId) return null

  return pkg
}

// ─── Routes ──────────────────────────────────────────────────────

/**
 * POST /api/scorm/upload
 * Upload and process a SCORM ZIP package
 */
router.post('/upload', authenticate, requireTeacher, upload.single('file'), async (req: Request, res: Response) => {
  try {
    const file = req.file
    if (!file) {
      return res.status(400).json(apiResponse.error('No file uploaded', 'NO_FILE'))
    }

    const schoolId = getSchoolId(req)
    const userId = getUserId(req)
    if (!schoolId) {
      return res.status(400).json(apiResponse.error('School context required', 'NO_SCHOOL'))
    }

    // Create extraction directory
    const packageId = `pkg-${Date.now()}-${Math.round(Math.random() * 1e9)}`
    const extractDir = path.join(scormDir, packageId)
    fs.mkdirSync(extractDir, { recursive: true })

    try {
      // Validate ZIP entries before extraction (path traversal + size check)
      const zip = new AdmZip(file.path)
      const { safe, totalSize } = validateZipEntries(zip, extractDir)

      if (!safe) {
        throw new Error('ZIP contains entries with path traversal')
      }

      if (totalSize > MAX_EXTRACTED_SIZE) {
        throw new Error(`Extracted size (${Math.round(totalSize / 1024 / 1024)}MB) exceeds limit`)
      }

      // Extract ZIP (safe after validation)
      zip.extractAllTo(extractDir, true)

      // Find and parse imsmanifest.xml
      const manifestPath = path.join(extractDir, 'imsmanifest.xml')
      if (!fs.existsSync(manifestPath)) {
        throw new Error('Invalid SCORM package: imsmanifest.xml not found')
      }

      const { version, entryPoint, title } = await parseManifest(manifestPath)

      // Clean up the original ZIP
      fs.unlinkSync(file.path)

      // Save to database
      const scormPackage = await prisma.scormPackage.create({
        data: {
          title: (req.body.title as string) || title,
          description: req.body.description || null,
          version,
          filename: file.originalname,
          entryPoint,
          storagePath: packageId,
          fileSize: file.size,
          schoolId,
          uploadedById: userId
        }
      })

      res.status(201).json(apiResponse.success(scormPackage))
    } catch (innerError: any) {
      // Clean up on failure
      fs.rmSync(extractDir, { recursive: true, force: true })
      if (fs.existsSync(file.path)) fs.unlinkSync(file.path)
      return res.status(400).json(apiResponse.error(innerError.message || 'SCORM processing failed', 'INVALID_SCORM'))
    }
  } catch (error: any) {
    handleError(res, error)
  }
})

/**
 * GET /api/scorm
 * List all SCORM packages for the school
 */
router.get('/', authenticate, async (req: Request, res: Response) => {
  try {
    const schoolId = getSchoolId(req)
    const { page = '1', limit = '20', search } = req.query

    const where: any = { schoolId }
    if (search) {
      where.title = { contains: search as string, mode: 'insensitive' }
    }

    const [packages, total] = await Promise.all([
      prisma.scormPackage.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (Number(page) - 1) * Number(limit),
        take: Number(limit),
        include: {
          uploadedBy: { select: { id: true, name: true, surname: true } },
          _count: { select: { attempts: true, courseContents: true } }
        }
      }),
      prisma.scormPackage.count({ where })
    ])

    res.json(apiResponse.success({
      packages,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    }))
  } catch (error) {
    handleError(res, error)
  }
})

/**
 * GET /api/scorm/:id
 * Get SCORM package details (school-scoped)
 */
router.get('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const pkg = await requirePackageAccess(req, req.params.id)
    if (!pkg) {
      return res.status(404).json(apiResponse.error('SCORM package not found', 'NOT_FOUND'))
    }

    // Re-fetch with includes
    const full = await prisma.scormPackage.findUnique({
      where: { id: req.params.id },
      include: {
        uploadedBy: { select: { id: true, name: true, surname: true } },
        _count: { select: { attempts: true, courseContents: true } }
      }
    })

    res.json(apiResponse.success(full))
  } catch (error) {
    handleError(res, error)
  }
})

/**
 * PUT /api/scorm/:id
 * Update SCORM package metadata (school-scoped)
 */
router.put('/:id', authenticate, requireTeacher, validateRequest(updatePackageSchema), async (req: Request, res: Response) => {
  try {
    const pkg = await requirePackageAccess(req, req.params.id)
    if (!pkg) {
      return res.status(404).json(apiResponse.error('SCORM package not found', 'NOT_FOUND'))
    }

    const updated = await prisma.scormPackage.update({
      where: { id: req.params.id },
      data: req.body
    })

    res.json(apiResponse.success(updated))
  } catch (error) {
    handleError(res, error)
  }
})

/**
 * DELETE /api/scorm/:id
 * Delete SCORM package and its files (school-scoped)
 */
router.delete('/:id', authenticate, requireSchoolAdmin, async (req: Request, res: Response) => {
  try {
    const pkg = await requirePackageAccess(req, req.params.id)
    if (!pkg) {
      return res.status(404).json(apiResponse.error('SCORM package not found', 'NOT_FOUND'))
    }

    // Delete files from disk
    const extractDir = path.join(scormDir, pkg.storagePath)
    if (fs.existsSync(extractDir)) {
      fs.rmSync(extractDir, { recursive: true, force: true })
    }

    // Delete from DB (cascades to attempts + courseContents)
    await prisma.scormPackage.delete({ where: { id: req.params.id } })

    res.json(apiResponse.success({ message: 'SCORM package deleted' }))
  } catch (error) {
    handleError(res, error)
  }
})

// ─── Runtime Data (SCORM API communication) ──────────────────────

/**
 * GET /api/scorm/:id/attempt
 * Get or create the student's current attempt for a SCORM package
 * Returns runtime data so the SCORM player can restore state
 */
router.get('/:id/attempt', authenticate, async (req: Request, res: Response) => {
  try {
    const studentId = getStudentId(req)
    if (!studentId) {
      return res.status(403).json(apiResponse.error('Student access required', 'NOT_STUDENT'))
    }

    // Verify package belongs to student's school
    const pkg = await requirePackageAccess(req, req.params.id)
    if (!pkg) {
      return res.status(404).json(apiResponse.error('SCORM package not found', 'NOT_FOUND'))
    }

    // Find the most recent active (non-completed) attempt, or create one
    let attempt = await prisma.scormAttempt.findFirst({
      where: {
        scormPackageId: req.params.id,
        studentId,
        status: { in: ['NOT_ATTEMPTED', 'INCOMPLETE'] }
      },
      orderBy: { startedAt: 'desc' }
    })

    if (!attempt) {
      attempt = await prisma.scormAttempt.create({
        data: {
          scormPackageId: req.params.id,
          studentId
        }
      })
    }

    res.json(apiResponse.success(attempt))
  } catch (error) {
    handleError(res, error)
  }
})

/**
 * PUT /api/scorm/:id/attempt/:attemptId/runtime
 * Save SCORM runtime data (called by the SCORM API bridge)
 */
router.put('/:id/attempt/:attemptId/runtime', authenticate, validateRequest(saveRuntimeSchema), async (req: Request, res: Response) => {
  try {
    const { attemptId } = req.params
    const { cmiData } = req.body

    // Verify attempt ownership: must belong to the authenticated student
    const studentId = getStudentId(req)
    if (!studentId) {
      return res.status(403).json(apiResponse.error('Student access required', 'NOT_STUDENT'))
    }

    const existingAttempt = await prisma.scormAttempt.findUnique({
      where: { id: attemptId }
    })

    if (!existingAttempt || existingAttempt.studentId !== studentId) {
      return res.status(403).json(apiResponse.error('Access denied', 'FORBIDDEN'))
    }

    if (existingAttempt.scormPackageId !== req.params.id) {
      return res.status(400).json(apiResponse.error('Attempt does not belong to this package', 'MISMATCH'))
    }

    // Extract key fields from CMI data
    const updateData: any = {
      runtimeData: cmiData,
      updatedAt: new Date()
    }

    // SCORM 1.2 fields
    if (cmiData['cmi.core.lesson_status']) {
      const status = cmiData['cmi.core.lesson_status']
      if (status === 'completed' || status === 'passed') {
        updateData.status = status === 'passed' ? 'PASSED' : 'COMPLETED'
        updateData.completedAt = new Date()
      } else if (status === 'failed') {
        updateData.status = 'FAILED'
        updateData.completedAt = new Date()
      } else if (status === 'incomplete' || status === 'browsed' || status === 'not attempted') {
        updateData.status = 'INCOMPLETE'
      }
    }

    // SCORM 2004 fields
    if (cmiData['cmi.completion_status']) {
      const completion = cmiData['cmi.completion_status']
      const success = cmiData['cmi.success_status']
      if (success === 'passed') {
        updateData.status = 'PASSED'
        updateData.completedAt = new Date()
      } else if (success === 'failed') {
        updateData.status = 'FAILED'
        updateData.completedAt = new Date()
      } else if (completion === 'completed') {
        updateData.status = 'COMPLETED'
        updateData.completedAt = new Date()
      } else if (completion === 'incomplete' || completion === 'not attempted' || success === 'unknown') {
        updateData.status = 'INCOMPLETE'
      }
    }

    // Score (with safe normalization)
    const scoreRaw = cmiData['cmi.core.score.raw'] || cmiData['cmi.score.raw']
    const scoreMin = cmiData['cmi.core.score.min'] || cmiData['cmi.score.min']
    const scoreMax = cmiData['cmi.core.score.max'] || cmiData['cmi.score.max']
    if (scoreRaw !== undefined) {
      const raw = parseFloat(scoreRaw)
      const min = scoreMin ? parseFloat(scoreMin) : 0
      const max = scoreMax ? parseFloat(scoreMax) : 100

      updateData.scoreRaw = raw
      updateData.scoreMin = min
      updateData.scoreMax = max

      // Safe normalization: guard against division by zero and out-of-range
      if (max > min) {
        const normalized = ((raw - min) / (max - min)) * 100
        updateData.score = Math.max(0, Math.min(100, Math.round(normalized)))
      } else {
        updateData.score = Math.max(0, Math.min(100, Math.round(raw)))
      }
    }

    // Time
    const totalTime = cmiData['cmi.core.total_time'] || cmiData['cmi.total_time']
    if (totalTime) updateData.totalTime = totalTime

    // Suspend data (for resuming)
    const suspendData = cmiData['cmi.suspend_data'] || cmiData['cmi.core.suspend_data']
    if (suspendData !== undefined) updateData.suspendData = suspendData

    // Location (bookmark)
    const location = cmiData['cmi.core.lesson_location'] || cmiData['cmi.location']
    if (location !== undefined) updateData.location = location

    const attempt = await prisma.scormAttempt.update({
      where: { id: attemptId },
      data: updateData
    })

    // Auto-generate certificate when SCORM is completed/passed
    if (updateData.status === 'COMPLETED' || updateData.status === 'PASSED') {
      try {
        await certificateService.generateScormCertificate(studentId, req.params.id)
      } catch {
        // Certificate may already exist or score too low — not a critical error
      }
    }

    res.json(apiResponse.success(attempt))
  } catch (error) {
    handleError(res, error)
  }
})

/**
 * GET /api/scorm/:id/attempts
 * Get all attempts for a package (admin/teacher view, school-scoped)
 */
router.get('/:id/attempts', authenticate, requireTeacher, async (req: Request, res: Response) => {
  try {
    const pkg = await requirePackageAccess(req, req.params.id)
    if (!pkg) {
      return res.status(404).json(apiResponse.error('SCORM package not found', 'NOT_FOUND'))
    }

    const attempts = await prisma.scormAttempt.findMany({
      where: { scormPackageId: req.params.id },
      orderBy: { startedAt: 'desc' },
      include: {
        student: {
          include: {
            user: { select: { id: true, name: true, surname: true, email: true } }
          }
        }
      }
    })

    res.json(apiResponse.success(attempts))
  } catch (error) {
    handleError(res, error)
  }
})

/**
 * GET /api/scorm/:id/launch
 * Get launch URL for the SCORM content (school-scoped)
 */
router.get('/:id/launch', authenticate, async (req: Request, res: Response) => {
  try {
    const pkg = await requirePackageAccess(req, req.params.id)
    if (!pkg) {
      return res.status(404).json(apiResponse.error('SCORM package not found', 'NOT_FOUND'))
    }

    // Build the URL to the entry point (entryPoint was validated on upload)
    const launchUrl = `/scorm-content/${pkg.storagePath}/${pkg.entryPoint}`

    res.json(apiResponse.success({
      launchUrl,
      version: pkg.version,
      title: pkg.title,
      packageId: pkg.id
    }))
  } catch (error) {
    handleError(res, error)
  }
})

export default router
