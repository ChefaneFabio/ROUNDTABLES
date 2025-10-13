# Security Documentation - Roundtable Management Platform

## Overview

This document outlines the security measures implemented in the Roundtable Management Platform and provides guidelines for maintaining security in production.

---

## Critical Security Updates Implemented

### 1. Authentication & Authorization

#### JWT Authentication
- **Implementation**: `backend/src/middleware/auth.ts`
- **Token Expiration**: 24 hours
- **Algorithm**: HS256
- **Features**:
  - Secure password hashing with bcrypt (12 salt rounds)
  - Token-based authentication
  - Role-based access control (RBAC)
  - Account activation/deactivation

#### User Roles
- **ADMIN**: Full system access, can create users, manage all resources
- **COORDINATOR**: Manage roundtables, sessions, participants
- **TRAINER**: Access assigned sessions, submit feedback

#### Authentication Endpoints
```
POST /api/auth/register      - Create new user (Admin only)
POST /api/auth/login         - User login
GET  /api/auth/me            - Get current user info
POST /api/auth/change-password - Change password
POST /api/auth/logout        - Logout (audit trail)
GET  /api/auth/users         - List users (Admin only)
PATCH /api/auth/users/:id/toggle-active - Enable/disable user
```

### 2. Secure Voting System

#### Voting Tokens
- **Implementation**: `backend/src/services/VotingTokenService.ts`
- **Security Features**:
  - Cryptographically secure random tokens (32 bytes)
  - Single-use tokens
  - Time-limited (7 days default, configurable)
  - Per-participant tokens
  - Auto-expiration and cleanup

#### Voting Flow
1. Admin starts topic voting for roundtable
2. System generates unique tokens for each participant
3. Participants receive email with secure voting link containing token
4. Token is verified and validated before voting
5. Token is marked as used after successful vote
6. Expired/used tokens cannot be reused

#### Token Management
```
- createVotingTokensForRoundtable() - Generate tokens for all participants
- verifyToken() - Validate and retrieve token data
- markTokenAsUsed() - Invalidate token after use
- revokeTokensForRoundtable() - Cancel all tokens
- cleanupExpiredTokens() - Periodic cleanup (run via cron)
```

### 3. Rate Limiting

#### Rate Limit Configurations
```typescript
// General API: 100 requests per 15 minutes
apiLimiter: 100 req/15min

// Authentication: 5 login attempts per 15 minutes
authLimiter: 5 req/15min (only counts failed attempts)

// Voting: 10 submissions per hour
votingLimiter: 10 req/hour

// Email operations: 20 requests per hour
emailLimiter: 20 req/hour

// Create operations: 30 requests per hour
createLimiter: 30 req/hour
```

#### Implementation
- Location: `backend/src/middleware/rateLimiter.ts`
- Uses `express-rate-limit` package
- Returns rate limit info in response headers
- Blocks excessive requests with 429 status

### 4. CORS Configuration

#### Secure CORS Settings
- **No wildcards**: Explicit origin whitelisting only
- **Allowed Origins**:
  - `https://roundtables-frontend-final.vercel.app` (production)
  - `http://localhost:3000` (development)
  - `http://localhost:5173` (Vite development)
  - Environment-specific preview deployments via `VERCEL_PREVIEW_ORIGIN`

#### CORS Configuration
```typescript
origin: (origin, callback) => {
  if (!origin || allowedOrigins.includes(origin)) {
    callback(null, true)
  } else {
    callback(new Error('Not allowed by CORS'))
  }
}
```

### 5. Security Headers (Helmet)

#### Implemented Headers
- **Content Security Policy**: Restricts resource loading
- **HSTS**: Forces HTTPS connections
  - Max age: 1 year
  - includeSubDomains: true
  - preload: true
- **X-Frame-Options**: Prevents clickjacking
- **X-Content-Type-Options**: Prevents MIME sniffing
- **X-XSS-Protection**: XSS filter
- **Referrer-Policy**: Controls referrer information

### 6. Dependency Security

#### Updated Vulnerable Packages
- **nodemailer**: Updated from 6.9.7 to 7.0.9
  - Fixed: Email to unintended domain vulnerability (GHSA-mm7p-fcc7-pg87)
- **xlsx**: Updated to latest secure version
  - Fixed: Prototype pollution vulnerability (GHSA-4r6h-8v6p-xvw6)

#### Additional Security Packages
- `validator`: Input validation
- `xss`: XSS prevention
- `express-rate-limit`: Rate limiting

---

## Database Schema Updates

### User Model
```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String   // Bcrypt hashed
  name      String
  role      Role     @default(ADMIN)
  isActive  Boolean  @default(true)
  lastLogin DateTime?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### VotingToken Model
```prisma
model VotingToken {
  id           String   @id @default(cuid())
  token        String   @unique
  roundtableId String
  participantId String
  expiresAt    DateTime
  usedAt       DateTime?
  createdAt    DateTime @default(now())
}
```

---

## Environment Variables

### Required Secrets
```bash
# Database
DATABASE_URL="postgresql://user:pass@host:5432/db?sslmode=require"

# JWT
JWT_SECRET="your-super-secure-jwt-secret-minimum-32-characters-long"

# SMTP
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"

# Frontend
FRONTEND_URL="https://your-frontend-domain.com"
VERCEL_PREVIEW_ORIGIN="https://specific-preview.vercel.app" # Optional

# Application
NODE_ENV="production"
PORT=5000
```

### Secret Rotation Guidelines
1. **JWT_SECRET**:
   - Rotate every 90 days
   - Minimum 32 characters
   - Use cryptographically secure random generator
   - After rotation, all users must re-authenticate

2. **Database Credentials**:
   - Rotate every 180 days
   - Use strong passwords (16+ characters)
   - Always use SSL/TLS for connections

3. **SMTP Credentials**:
   - Use app-specific passwords
   - Rotate when personnel changes occur
   - Monitor for unauthorized access

---

## Security Best Practices

### For Administrators

#### Initial Setup
1. Create first admin user via database seed:
   ```typescript
   // Run database seed to create initial admin
   npm run db:seed
   ```

2. Immediately change default admin password:
   ```bash
   POST /api/auth/login
   POST /api/auth/change-password
   ```

3. Create additional users with appropriate roles:
   ```bash
   POST /api/auth/register (requires admin auth)
   ```

#### User Management
- Review active users quarterly
- Disable accounts immediately when employees leave
- Use principle of least privilege (assign minimal required role)
- Monitor last login times for suspicious activity

#### Voting Security
- Generate voting tokens only when ready to start voting
- Set appropriate expiration times (shorter for sensitive votes)
- Revoke tokens if voting needs to be restarted
- Monitor token usage statistics

### For Developers

#### Code Security
- Never commit `.env` files (use `.env.example` only)
- Always use parameterized queries (Prisma handles this)
- Validate all user input
- Sanitize output to prevent XSS
- Never log sensitive data (passwords, tokens, etc.)

#### API Development
- Always apply authentication middleware to protected routes
- Use role-based authorization where appropriate
- Implement rate limiting on new endpoints
- Return generic error messages (prevent information disclosure)

#### Testing
- Test authentication and authorization thoroughly
- Test rate limiting behavior
- Verify token expiration logic
- Test CORS with different origins

---

## Remaining Vulnerabilities & Roadmap

### High Priority (In Progress)
1. **IDOR Protection**: Add ownership checks to all endpoints
2. **Input Sanitization**: Implement XSS prevention for all user inputs
3. **Audit Logging**: Log all security-relevant events
4. **CSRF Protection**: Add CSRF tokens for state-changing operations

### Medium Priority
1. **Session Management**: Implement token refresh mechanism
2. **MFA**: Add two-factor authentication option
3. **Password Policies**: Enforce complexity requirements
4. **Account Lockout**: Implement after failed login attempts

### Low Priority
1. **Data Encryption**: Encrypt sensitive fields at rest
2. **File Upload Security**: Implement secure file handling
3. **Security Monitoring**: Integrate SIEM solution
4. **Penetration Testing**: Regular security audits

---

## Incident Response

### If Security Breach Detected

1. **Immediate Actions**:
   - Revoke all JWT tokens (rotate JWT_SECRET)
   - Disable affected user accounts
   - Review audit logs
   - Identify breach scope

2. **Investigation**:
   - Collect evidence
   - Determine attack vector
   - Assess data exposure
   - Document timeline

3. **Remediation**:
   - Patch vulnerabilities
   - Rotate all credentials
   - Notify affected users
   - Update security measures

4. **Post-Incident**:
   - Conduct post-mortem
   - Update security documentation
   - Implement additional controls
   - Train team on lessons learned

---

## Compliance

### GDPR Considerations
- User consent tracking (to be implemented)
- Right to be forgotten (to be implemented)
- Data minimization (partially implemented)
- Audit trails (to be implemented)
- Data encryption (to be implemented)

### Data Protection
- All passwords hashed with bcrypt (12 rounds)
- JWT tokens expire after 24 hours
- Voting tokens expire after 7 days
- Database connections use SSL in production
- HTTPS enforced via HSTS headers

---

## Monitoring & Alerts

### Recommended Monitoring
1. **Failed Login Attempts**: Alert after 10 failures in 1 hour
2. **Rate Limit Hits**: Alert if rate limits frequently exceeded
3. **Invalid Token Attempts**: Alert on suspicious token usage
4. **Database Errors**: Monitor for SQL errors or connection issues
5. **Server Errors**: Track 500 errors and investigate causes

### Log Analysis
- Review security logs weekly
- Investigate suspicious patterns
- Monitor for unusual access times/locations
- Track privilege escalation attempts

---

## Contact

For security issues or concerns:
- Email: security@makaitalia.com
- Report: Create issue on GitHub (for non-sensitive matters)
- Emergency: Contact system administrator directly

---

## Changelog

### 2025-01-XX - Initial Security Implementation
- Implemented JWT authentication
- Added role-based authorization
- Created secure voting token system
- Added rate limiting
- Fixed CORS vulnerabilities
- Updated vulnerable dependencies
- Enhanced security headers

---

*This documentation should be reviewed and updated quarterly*
