# Security Implementation Guide

## ✅ Phase 1 & 2 Complete

This document provides a guide for applying the security patterns implemented in `clientController.ts` to all remaining controllers.

---

## What's Been Implemented

### ✅ Core Security Framework
1. **JWT Authentication** - `backend/src/middleware/auth.ts`
2. **Role-Based Authorization** - `authenticate` and `authorize` middlewares
3. **Rate Limiting** - Multiple rate limiters for different operations
4. **CORS Security** - No wildcards, explicit whitelisting
5. **Security Headers** - Enhanced Helmet configuration
6. **Audit Logging** - Comprehensive audit trail system
7. **Input Sanitization** - Full sanitization utility library
8. **Secure Voting Tokens** - Cryptographically secure voting system

### ✅ Fully Secured Controllers
- ✅ `authController.ts` - Complete with audit logging
- ✅ `auditLogController.ts` - Admin-only, fully protected
- ✅ `clientController.ts` - **Reference implementation**

### 🔄 Controllers Needing Security Updates
- ❌ `roundtableController.ts`
- ❌ `sessionController.ts`
- ❌ `participantController.ts`
- ❌ `topicController.ts` (partially public for voting)
- ❌ `questionController.ts`
- ❌ `dashboardController.ts`
- ❌ `trainerController.ts`
- ❌ `feedbackController.ts`
- ❌ `emailTemplateController.ts`
- ❌ `notificationController.ts`

---

## Reference Implementation: clientController.ts

### Security Pattern Applied

```typescript
// 1. IMPORTS
import { Router, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { authenticate, authorize } from '../middleware/auth'
import { auditLog } from '../services/AuditLogService'
import { sanitizeText, sanitizeEmail, sanitizeId } from '../utils/sanitize'
import { createLimiter } from '../middleware/rateLimiter'

const router = Router()
const prisma = new PrismaClient()

// 2. GLOBAL AUTHENTICATION
// Require authentication for ALL routes in this controller
router.use(authenticate)

// 3. GET ENDPOINTS - Read Access
router.get('/', authorize('ADMIN', 'COORDINATOR'), async (req, res) => {
  try {
    // Sanitize inputs
    const search = req.query.search
    const searchTerm = search ? sanitizeText(String(search)) : ''

    // Business logic...

    res.json({ success: true, data: results })
  } catch (error) {
    // Error handling
  }
})

// 4. GET BY ID - With Audit Logging
router.get('/:id', authorize('ADMIN', 'COORDINATOR'), async (req, res) => {
  try {
    const id = sanitizeId(req.params.id)  // Sanitize ID

    const resource = await prisma.client.findUnique({ where: { id } })

    if (!resource) {
      // Log failure
      await auditLog.logFromRequest(req, 'read', 'client', 'failure', {
        resourceId: id,
        errorMessage: 'Client not found'
      })
      return res.status(404).json({ error: 'Not found' })
    }

    // Log success
    await auditLog.logFromRequest(req, 'read', 'client', 'success', {
      resourceId: id
    })

    res.json({ success: true, data: resource })
  } catch (error) {
    // Error handling
  }
})

// 5. CREATE - With Rate Limiting & Sanitization
router.post('/',
  authorize('ADMIN', 'COORDINATOR'),
  createLimiter,  // Rate limiting
  validateRequest(schema),
  async (req, res) => {
    try {
      // Sanitize all inputs
      const name = sanitizeText(req.body.name)
      const email = sanitizeEmail(req.body.email)

      // Business logic...
      const resource = await prisma.client.create({ data: { ...} })

      // Audit log
      await auditLog.logFromRequest(req, 'create', 'client', 'success', {
        resourceId: resource.id
      })

      res.status(201).json({ success: true, data: resource })
    } catch (error) {
      await auditLog.logFromRequest(req, 'create', 'client', 'failure', {
        errorMessage: error.message
      })
      // Error handling
    }
  }
)

// 6. UPDATE - With Authorization & Audit
router.put('/:id',
  authorize('ADMIN', 'COORDINATOR'),
  validateRequest(schema),
  async (req, res) => {
    try {
      const id = sanitizeId(req.params.id)

      // Sanitize updates
      const updates: any = {}
      if (req.body.name) updates.name = sanitizeText(req.body.name)

      // Check existence
      const existing = await prisma.client.findUnique({ where: { id } })
      if (!existing) {
        await auditLog.logFromRequest(req, 'update', 'client', 'failure', {
          resourceId: id,
          errorMessage: 'Not found'
        })
        return res.status(404).json({ error: 'Not found' })
      }

      // Business logic...
      const updated = await prisma.client.update({ where: { id }, data: updates })

      await auditLog.logFromRequest(req, 'update', 'client', 'success', {
        resourceId: id
      })

      res.json({ success: true, data: updated })
    } catch (error) {
      // Error handling
    }
  }
)

// 7. DELETE - Admin Only
router.delete('/:id', authorize('ADMIN'), async (req, res) => {
  try {
    const id = sanitizeId(req.params.id)

    // Check existence
    const resource = await prisma.client.findUnique({ where: { id } })
    if (!resource) {
      await auditLog.logFromRequest(req, 'delete', 'client', 'failure', {
        resourceId: id,
        errorMessage: 'Not found'
      })
      return res.status(404).json({ error: 'Not found' })
    }

    // Business logic checks (e.g., has dependencies?)

    await prisma.client.delete({ where: { id } })

    await auditLog.logFromRequest(req, 'delete', 'client', 'success', {
      resourceId: id
    })

    res.json({ success: true, message: 'Deleted successfully' })
  } catch (error) {
    // Error handling
  }
})
```

---

## Step-by-Step Application Guide

### For Each Controller:

#### Step 1: Add Imports
```typescript
import { authenticate, authorize } from '../middleware/auth'
import { auditLog } from '../services/AuditLogService'
import { sanitizeText, sanitizeId, sanitizeEmail } from '../utils/sanitize'
import { createLimiter, votingLimiter, emailLimiter } from '../middleware/rateLimiter'
```

#### Step 2: Add Global Authentication
```typescript
// After router initialization, before routes
router.use(authenticate)
```

#### Step 3: Add Authorization to Each Route
```typescript
// Read operations: ADMIN + COORDINATOR (+ TRAINER for some)
router.get('/', authorize('ADMIN', 'COORDINATOR'), async (req, res) => { ... })

// Create/Update: ADMIN + COORDINATOR
router.post('/', authorize('ADMIN', 'COORDINATOR'), createLimiter, async (req, res) => { ... })

// Delete: ADMIN only
router.delete('/:id', authorize('ADMIN'), async (req, res) => { ... })
```

#### Step 4: Sanitize All Inputs
```typescript
// IDs
const id = sanitizeId(req.params.id)

// Text
const name = sanitizeText(req.body.name)

// Emails
const email = sanitizeEmail(req.body.email)

// Search terms
const search = req.query.search ? sanitizeText(String(req.query.search)) : ''
```

#### Step 5: Add Audit Logging
```typescript
// Success
await auditLog.logFromRequest(req, 'action', 'resource', 'success', {
  resourceId: id
})

// Failure
await auditLog.logFromRequest(req, 'action', 'resource', 'failure', {
  resourceId: id,
  errorMessage: 'Error description'
})
```

---

## Controller-Specific Authorization Matrix

| Controller | GET (List) | GET (ID) | POST | PUT | DELETE |
|-----------|-----------|----------|------|-----|--------|
| **clients** | ADMIN, COORDINATOR | ADMIN, COORDINATOR | ADMIN, COORDINATOR | ADMIN, COORDINATOR | ADMIN |
| **roundtables** | ADMIN, COORDINATOR | ADMIN, COORDINATOR, TRAINER* | ADMIN, COORDINATOR | ADMIN, COORDINATOR | ADMIN |
| **sessions** | ADMIN, COORDINATOR, TRAINER* | ADMIN, COORDINATOR, TRAINER* | ADMIN, COORDINATOR | ADMIN, COORDINATOR, TRAINER* | ADMIN |
| **participants** | ADMIN, COORDINATOR | ADMIN, COORDINATOR | ADMIN, COORDINATOR | ADMIN, COORDINATOR | ADMIN |
| **topics** | ADMIN, COORDINATOR | ADMIN, COORDINATOR | ADMIN, COORDINATOR | ADMIN, COORDINATOR | ADMIN |
| **questions** | ADMIN, COORDINATOR, TRAINER* | ADMIN, COORDINATOR, TRAINER | TRAINER* | TRAINER*, COORDINATOR | ADMIN, COORDINATOR |
| **feedback** | ADMIN, COORDINATOR, TRAINER* | ADMIN, COORDINATOR, TRAINER* | TRAINER* | TRAINER*, COORDINATOR | ADMIN |
| **trainers** | ADMIN, COORDINATOR | ADMIN, COORDINATOR | ADMIN | ADMIN, COORDINATOR | ADMIN |
| **email-templates** | ADMIN, COORDINATOR | ADMIN, COORDINATOR | ADMIN, COORDINATOR | ADMIN, COORDINATOR | ADMIN |
| **notifications** | ADMIN, COORDINATOR | ADMIN, COORDINATOR | ADMIN, COORDINATOR | ADMIN, COORDINATOR | ADMIN |
| **dashboard** | ADMIN, COORDINATOR, TRAINER | - | - | - | - |

*\*With ownership checks (can only access their own resources)*

---

## IDOR Protection Pattern

### When to Apply IDOR Protection

Apply ownership checks when:
- Trainers accessing sessions (only their assigned sessions)
- Trainers accessing questions (only for their sessions)
- Trainers submitting feedback (only for their sessions)

### Implementation Pattern

```typescript
router.get('/:id', authorize('ADMIN', 'COORDINATOR', 'TRAINER'), async (req, res) => {
  try {
    const id = sanitizeId(req.params.id)

    const session = await prisma.session.findUnique({
      where: { id },
      include: { trainer: true }
    })

    if (!session) {
      return res.status(404).json({ error: 'Not found' })
    }

    // IDOR Protection: Check ownership
    if (req.user!.role === 'TRAINER') {
      if (session.trainerId !== req.user!.id) {
        await auditLog.logPermissionDenied(req, 'session', id, 'ownership')
        return res.status(403).json({
          success: false,
          error: 'You can only access your own sessions'
        })
      }
    }

    // If ADMIN or COORDINATOR, or if TRAINER owns the resource, allow access
    await auditLog.logFromRequest(req, 'read', 'session', 'success', { resourceId: id })
    res.json({ success: true, data: session })
  } catch (error) {
    // Error handling
  }
})
```

---

## Special Cases

### 1. Voting Endpoints (topicController.ts)
```typescript
// Public endpoints (using tokens instead of auth)
router.get('/vote/:roundtableId', async (req, res) => {
  // Use votingTokenService.verifyToken() instead of authenticate
  const { token } = req.query
  const tokenData = await votingTokenService.verifyToken(token)
  // ...
})

router.post('/vote/:roundtableId', votingLimiter, async (req, res) => {
  // Use token verification
  // Log vote action
  await auditLog.log({
    action: 'vote',
    resource: 'topic',
    result: 'success',
    ipAddress: getIpAddress(req),
    // ...
  })
})
```

### 2. Dashboard (dashboardController.ts)
```typescript
// All roles can view dashboard, but data filtered by role
router.get('/stats', authorize('ADMIN', 'COORDINATOR', 'TRAINER'), async (req, res) => {
  try {
    let stats

    if (req.user!.role === 'TRAINER') {
      // Return only trainer's stats
      stats = await getTrainerStats(req.user!.id)
    } else {
      // Return full stats for ADMIN/COORDINATOR
      stats = await getFullStats()
    }

    res.json({ success: true, data: stats })
  } catch (error) {
    // Error handling
  }
})
```

### 3. Email Templates (emailTemplateController.ts)
```typescript
// Currently uses mock data, needs database integration
// Apply same security pattern as clientController
```

---

## Testing Checklist

For each secured controller, test:

### Authentication Tests
- [ ] Request without token returns 401
- [ ] Request with invalid token returns 401
- [ ] Request with expired token returns 401
- [ ] Request with valid token succeeds

### Authorization Tests
- [ ] ADMIN can access all endpoints
- [ ] COORDINATOR can access appropriate endpoints
- [ ] TRAINER can only access their own resources
- [ ] Unauthorized role returns 403

### IDOR Tests
- [ ] TRAINER cannot access other trainer's resources
- [ ] Direct ID manipulation blocked
- [ ] Proper 403 response for unauthorized access

### Audit Logging Tests
- [ ] Successful operations logged
- [ ] Failed operations logged
- [ ] Permission denials logged
- [ ] Audit logs contain correct metadata

### Rate Limiting Tests
- [ ] Create operations respect rate limits
- [ ] Voting operations respect rate limits
- [ ] Rate limit headers present in responses

### Input Sanitization Tests
- [ ] XSS attempts sanitized
- [ ] SQL injection attempts blocked (Prisma handles)
- [ ] Path traversal attempts blocked
- [ ] Invalid IDs rejected

---

## Deployment Checklist

Before deploying:

- [ ] Run `npm install` (new dependencies added)
- [ ] Run `npx prisma migrate dev --name add_security_features`
- [ ] Run `npx prisma generate`
- [ ] Update all remaining controllers with security patterns
- [ ] Create initial admin user
- [ ] Rotate JWT_SECRET in production
- [ ] Update DATABASE_URL with SSL (`?sslmode=require`)
- [ ] Set proper CORS origins
- [ ] Test authentication flow end-to-end
- [ ] Test authorization for all roles
- [ ] Review audit logs for correct tracking
- [ ] Run security scan (`npm audit`)
- [ ] Test rate limiting behavior
- [ ] Verify HTTPS enforcement
- [ ] Update frontend to use authentication

---

## Migration Script Example

For applying this pattern to remaining controllers, you can use this script template:

```bash
#!/bin/bash
# apply-security.sh

CONTROLLERS=(
  "roundtableController"
  "sessionController"
  "participantController"
  "topicController"
  "questionController"
  "dashboardController"
  "trainerController"
  "feedbackController"
  "emailTemplateController"
  "notificationController"
)

for controller in "${CONTROLLERS[@]}"; do
  echo "Securing $controller.ts..."

  # Add imports at the top
  # Add router.use(authenticate)
  # Add authorize() to each route
  # Add sanitization
  # Add audit logging

  echo "✓ $controller.ts secured"
done

echo "All controllers secured!"
```

---

## Monitoring & Maintenance

### Regular Tasks:
1. **Weekly**: Review audit logs for suspicious activity
2. **Monthly**: Rotate JWT_SECRET
3. **Quarterly**: Review user permissions
4. **Quarterly**: Update dependencies (`npm audit fix`)
5. **Annually**: Security penetration test

### Audit Log Queries:
```typescript
// Failed login attempts
GET /api/audit-logs?action=login_failed&startDate=2025-01-01

// Permission denials
GET /api/audit-logs?action=permission_denied&startDate=2025-01-01

// Suspicious activity
GET /api/audit-logs/suspicious?hours=24

// User activity
GET /api/audit-logs?userId=USER_ID
```

---

## Need Help?

- **Security Issues**: See SECURITY.md
- **Secret Rotation**: See SECRET_ROTATION.md
- **Implementation Summary**: See SECURITY-IMPLEMENTATION-SUMMARY.md
- **Original Analysis**: See analysis output above

---

## Quick Reference Commands

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev --name add_security_features

# Create admin user
npm run db:seed

# Run server
npm run dev

# Check for vulnerabilities
npm audit

# Fix auto-fixable vulnerabilities
npm audit fix
```

---

**Status**: Framework Complete ✅
**Next**: Apply pattern to remaining 10 controllers
**Timeline**: 1-2 hours to secure all controllers
**Priority**: HIGH - Required before production deployment
