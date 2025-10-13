# Secret Rotation Guide

This guide provides step-by-step instructions for rotating sensitive credentials in the Roundtable Management Platform.

## Overview

Regular secret rotation is a critical security practice that:
- Limits the window of opportunity for compromised credentials
- Reduces the impact of potential data breaches
- Complies with security best practices and regulations

## Rotation Schedule

| Secret Type | Rotation Frequency | Trigger Events |
|------------|-------------------|----------------|
| JWT_SECRET | Every 90 days | Security breach, personnel changes |
| Database Password | Every 180 days | Security breach, DBA changes |
| SMTP Credentials | As needed | Email compromise, personnel changes |
| API Keys | Every 90 days | Third-party breach, key exposure |

---

## 1. JWT_SECRET Rotation

### Impact
⚠️ **HIGH IMPACT**: All users will be logged out and must re-authenticate.

### Prerequisites
- Maintenance window scheduled
- Users notified in advance
- Rollback plan prepared

### Steps

1. **Generate New Secret**
   ```bash
   # Generate cryptographically secure random string (32+ characters)
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

2. **Update Environment Variables**
   ```bash
   # Production (Render/Vercel/etc.)
   # Update JWT_SECRET in dashboard

   # Development
   # Update backend/.env
   JWT_SECRET="<new-secret-here>"
   ```

3. **Deploy Changes**
   ```bash
   cd backend
   npm run build
   # Deploy to production
   ```

4. **Verify**
   - All existing tokens become invalid immediately
   - Users can log in with new tokens
   - Test login flow thoroughly

5. **Monitor**
   - Watch for authentication errors
   - Check logs for suspicious activity
   - Verify all services restart correctly

### Rollback
If issues occur:
```bash
# Revert to old JWT_SECRET
# Redeploy
# Existing sessions will be restored
```

---

## 2. Database Password Rotation

### Impact
⚠️ **CRITICAL IMPACT**: Brief downtime during rotation.

### Prerequisites
- Database backup completed
- Maintenance window scheduled
- Connection pool settings reviewed

### Steps

1. **Create New Database User** (Recommended approach)
   ```sql
   -- Connect to PostgreSQL
   CREATE USER roundtables_new WITH PASSWORD 'new-secure-password';

   -- Grant same permissions as old user
   GRANT ALL PRIVILEGES ON DATABASE roundtables TO roundtables_new;
   GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO roundtables_new;
   GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO roundtables_new;
   ```

2. **Update Connection String**
   ```bash
   # Old format:
   DATABASE_URL="postgresql://roundtables:old-password@host:5432/roundtables?sslmode=require"

   # New format:
   DATABASE_URL="postgresql://roundtables_new:new-password@host:5432/roundtables?sslmode=require"
   ```

3. **Test Connection**
   ```bash
   cd backend
   npx prisma db pull --schema=./prisma/schema.prisma
   # Should succeed without errors
   ```

4. **Deploy**
   ```bash
   # Update environment variables in production
   # Restart backend services
   ```

5. **Verify**
   ```bash
   # Test database operations
   curl https://api.your-domain.com/health

   # Check connection pool
   # Monitor query performance
   ```

6. **Remove Old User** (After 48 hours of successful operation)
   ```sql
   DROP USER roundtables; -- old user
   ```

### Alternative: Password Change (Shorter downtime)
```sql
-- If you can't create new user, change password
ALTER USER roundtables WITH PASSWORD 'new-secure-password';
-- Update DATABASE_URL immediately
-- Restart services quickly
```

---

## 3. SMTP Credentials Rotation

### Impact
🟡 **MEDIUM IMPACT**: Email notifications temporarily unavailable.

### For Gmail with App Passwords

1. **Revoke Old App Password**
   - Go to Google Account → Security → App passwords
   - Delete old "Roundtables" app password

2. **Generate New App Password**
   - Create new app password
   - Name it "Roundtables - Production - [DATE]"
   - Copy the 16-character password

3. **Update Environment**
   ```bash
   SMTP_PASSWORD="xxxx xxxx xxxx xxxx"  # New app password
   ```

4. **Test Email**
   ```bash
   # Send test notification
   POST /api/notifications/test
   # Or trigger a real notification
   ```

5. **Verify**
   - Check email delivery
   - Monitor SMTP logs
   - Test all notification types

### For Custom SMTP Server

1. **Change Password in Email Server**
2. **Update SMTP_PASSWORD**
3. **Restart backend**
4. **Test thoroughly**

---

## 4. Environment Variable Update Process

### For Render.com

1. Navigate to Dashboard → roundtables-backend → Environment
2. Click on environment variable to edit
3. Update value
4. Click "Save Changes"
5. Render automatically redeploys

### For Vercel

```bash
# Using Vercel CLI
vercel env rm JWT_SECRET production
vercel env add JWT_SECRET production
# Enter new value when prompted

# Or use Vercel Dashboard:
# Project Settings → Environment Variables
```

### For Docker Compose

```bash
# Update docker-compose.yml or .env file
nano docker-compose.yml

# Restart services
docker-compose down
docker-compose up -d
```

### For Local Development

```bash
# Edit backend/.env
nano backend/.env

# Restart development server
npm run dev
```

---

## 5. Emergency Rotation (Security Breach)

### If Credentials are Compromised

**Immediate Actions (Within 1 hour):**

1. **Rotate JWT_SECRET immediately**
   ```bash
   # This logs out all users
   # Generate and deploy new secret
   ```

2. **Disable compromised user accounts**
   ```bash
   PATCH /api/auth/users/:id/toggle-active
   ```

3. **Rotate database password**
   ```bash
   # Follow database rotation steps
   # Prioritize speed over zero-downtime
   ```

4. **Rotate SMTP credentials**

5. **Review audit logs**
   ```bash
   # Check for suspicious activity
   # Identify compromised accounts
   # Document timeline
   ```

6. **Notify stakeholders**
   - Security team
   - System administrators
   - Management (if data exposed)

**Within 24 hours:**

1. **Complete investigation**
2. **Document incident**
3. **Update security measures**
4. **Notify affected users** (if required by law)

---

## 6. Verification Checklist

After any credential rotation:

- [ ] New credentials work in all environments
- [ ] Old credentials no longer work
- [ ] All services restart successfully
- [ ] Database connections stable
- [ ] Email notifications working
- [ ] User authentication functioning
- [ ] No error spikes in logs
- [ ] Monitoring dashboards green
- [ ] Backup systems updated
- [ ] Documentation updated

---

## 7. Rollback Procedures

### JWT_SECRET Rollback
```bash
# Revert to previous JWT_SECRET value
# Redeploy immediately
# Previous sessions will work again
```

### Database Rollback
```bash
# Revert DATABASE_URL to previous user/password
# Redeploy
# Old user must still be active
```

### SMTP Rollback
```bash
# Keep old app password active during transition
# Can switch back if issues occur
# No deployment needed, just env variable change
```

---

## 8. Secret Storage Best Practices

### DO:
✅ Use environment variables for all secrets
✅ Store secrets in secure secret management systems (AWS Secrets Manager, HashiCorp Vault, etc.)
✅ Use different secrets for each environment (dev, staging, production)
✅ Document rotation schedule
✅ Automate rotation where possible

### DON'T:
❌ Store secrets in code
❌ Commit secrets to version control
❌ Share secrets via email/Slack
❌ Use same secret across environments
❌ Store secrets in plain text files

---

## 9. Automated Rotation (Future Enhancement)

### Recommended Implementation

```typescript
// Pseudo-code for automated rotation
class SecretRotationService {
  async rotateJWT() {
    const newSecret = generateSecureSecret()
    await updateEnvironment('JWT_SECRET', newSecret)
    await notifyUsers('jwt-rotation')
    await logRotation('JWT_SECRET')
  }

  async scheduledRotation() {
    // Run via cron: 0 0 1 * * (monthly)
    const secretsToRotate = await checkRotationDue()
    for (const secret of secretsToRotate) {
      await this.rotateSecret(secret)
    }
  }
}
```

---

## 10. Contact for Assistance

If you encounter issues during rotation:

- **Technical Issues**: DevOps Team
- **Security Concerns**: Security Team
- **Production Outage**: On-call Engineer
- **Questions**: See SECURITY.md

---

## Changelog

### 2025-01-XX - Initial Version
- Created rotation procedures for all secrets
- Documented emergency rotation process
- Added verification checklists

---

*Review and update this document quarterly*
