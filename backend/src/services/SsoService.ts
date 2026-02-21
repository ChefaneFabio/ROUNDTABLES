import { prisma } from '../config/database'
import crypto from 'crypto'
import { generateTokens } from '../middleware/auth'

interface SsoConfigInput {
  schoolId: string
  provider: 'SAML' | 'OIDC'
  entityId: string
  ssoUrl: string
  certificate: string
  metadata?: any
}

interface SamlAssertion {
  nameId: string
  email: string
  firstName?: string
  lastName?: string
  attributes?: Record<string, any>
}

export class SsoService {
  // Create or update SSO configuration
  async configureSso(input: SsoConfigInput) {
    const { schoolId, provider, entityId, ssoUrl, certificate, metadata } = input

    // Verify school exists
    const school = await prisma.school.findUnique({
      where: { id: schoolId }
    })

    if (!school) {
      throw new Error('School not found')
    }

    // Upsert SSO config
    const ssoConfig = await prisma.ssoConfig.upsert({
      where: { schoolId },
      update: {
        provider,
        entityId,
        ssoUrl,
        certificate,
        metadata,
        updatedAt: new Date()
      },
      create: {
        schoolId,
        provider,
        entityId,
        ssoUrl,
        certificate,
        metadata,
        isActive: true
      }
    })

    return ssoConfig
  }

  // Get SSO configuration for a school
  async getSsoConfig(schoolId: string) {
    const config = await prisma.ssoConfig.findUnique({
      where: { schoolId },
      include: {
        school: { select: { name: true, email: true } }
      }
    })

    if (!config) {
      throw new Error('SSO not configured for this school')
    }

    return config
  }

  // Generate SAML login URL
  async generateSamlLoginUrl(schoolId: string, returnUrl?: string) {
    const config = await this.getSsoConfig(schoolId)

    if (!config.isActive) {
      throw new Error('SSO is not active for this school')
    }

    // Generate a request ID for tracking
    const requestId = `_${crypto.randomBytes(16).toString('hex')}`

    // In production, this would generate a proper SAML AuthnRequest
    // For now, return the SSO URL with basic parameters
    const params = new URLSearchParams({
      SAMLRequest: Buffer.from(JSON.stringify({
        id: requestId,
        issuer: `https://makalmc.com/sso/${schoolId}`,
        destination: config.ssoUrl,
        timestamp: new Date().toISOString()
      })).toString('base64'),
      RelayState: returnUrl || '/'
    })

    return {
      loginUrl: `${config.ssoUrl}?${params.toString()}`,
      requestId
    }
  }

  // Process SAML callback and authenticate user
  async processSamlCallback(schoolId: string, samlResponse: string, relayState?: string) {
    const config = await this.getSsoConfig(schoolId)

    // In production, validate SAML response signature with certificate
    // Decode and parse the SAML assertion
    let assertion: SamlAssertion

    try {
      // This is a simplified parsing - production would use passport-saml or similar
      const decoded = Buffer.from(samlResponse, 'base64').toString('utf-8')
      assertion = JSON.parse(decoded) as SamlAssertion
    } catch (error) {
      throw new Error('Invalid SAML response')
    }

    if (!assertion.email) {
      throw new Error('Email not provided in SAML assertion')
    }

    // Find or create user
    let user = await prisma.user.findUnique({
      where: { email: assertion.email },
      include: {
        studentProfile: true,
        teacherProfile: true
      }
    })

    if (!user) {
      // Create new user as student
      const result = await prisma.$transaction(async (tx) => {
        const newUser = await tx.user.create({
          data: {
            email: assertion.email,
            name: `${assertion.firstName || ''} ${assertion.lastName || ''}`.trim() || assertion.email,
            password: crypto.randomBytes(32).toString('hex'), // Random password (won't be used)
            role: 'STUDENT'
          }
        })

        const student = await tx.student.create({
          data: {
            userId: newUser.id,
            schoolId
          }
        })

        return { user: newUser, student }
      })

      user = result.user as any
    } else {
      // Verify user belongs to this school
      const hasSchoolAccess =
        user.studentProfile?.schoolId === schoolId ||
        user.teacherProfile?.schoolId === schoolId

      if (!hasSchoolAccess) {
        throw new Error('User is not associated with this school')
      }
    }

    // Update last login
    await prisma.user.update({
      where: { id: user!.id },
      data: { lastLoginAt: new Date() }
    })

    // Generate tokens
    const tokens = generateTokens(user as any)

    // Store refresh token
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 7)

    await prisma.refreshToken.create({
      data: {
        token: tokens.refreshToken,
        userId: user!.id,
        expiresAt
      }
    })

    return {
      user: this.sanitizeUser(user as any),
      ...tokens,
      relayState
    }
  }

  // Toggle SSO active status
  async toggleSsoStatus(schoolId: string, isActive: boolean) {
    const config = await prisma.ssoConfig.update({
      where: { schoolId },
      data: { isActive }
    })

    return config
  }

  // Delete SSO configuration
  async deleteSsoConfig(schoolId: string) {
    await prisma.ssoConfig.delete({
      where: { schoolId }
    })

    return { success: true }
  }

  // Get all schools with SSO configured (admin)
  async getAllSsoConfigs() {
    return prisma.ssoConfig.findMany({
      include: {
        school: { select: { id: true, name: true, email: true } }
      },
      orderBy: { createdAt: 'desc' }
    })
  }

  private sanitizeUser(user: any) {
    const { password, ...sanitized } = user
    return sanitized
  }
}

export const ssoService = new SsoService()
