# Microsoft Forms Integration Guide

## Overview

This platform integrates with Microsoft Forms to provide a familiar voting interface for participants while maintaining robust security through token-based authentication and audit trails.

## Architecture

```
Participant receives email with token
         ↓
Click link: /api/forms/vote/{TOKEN}
         ↓
Backend validates token & creates 30-min session
         ↓
Redirect to Microsoft Forms (pre-filled with session data)
         ↓
Participant selects topics in Microsoft Forms
         ↓
Power Automate webhook sends response to /api/forms/webhook/vote
         ↓
Backend validates session, records votes, marks token as used
```

## Security Features

1. **Token-Based Access**: Only participants with valid voting tokens can access forms
2. **Time-Limited Sessions**: 30-minute session expiry prevents stale submissions
3. **Single-Use Tokens**: Tokens automatically marked as used after successful vote
4. **Webhook Signature Validation**: HMAC SHA256 signature verification for webhooks
5. **Comprehensive Audit Trail**: All actions logged for compliance and security

---

## Part 1: Create Microsoft Form

### Step 1: Access Microsoft Forms
1. Go to https://forms.office.com
2. Sign in with your Microsoft 365 account
3. Click **+ New Form**

### Step 2: Form Configuration

#### Basic Setup
- **Title**: "Roundtable Topic Voting"
- **Description**: "Please select your top 8 topics for discussion"

#### Required Form Fields

**Field 1: Session ID (Hidden)**
- Type: **Text**
- Question: "Session ID"
- Settings:
  - ✅ Required
  - ✅ Hidden (will be pre-filled via URL parameters)
- Field ID: `entry.sessionId`

**Field 2: Participant Name (Hidden)**
- Type: **Text**
- Question: "Your Name"
- Settings:
  - ✅ Required
  - ✅ Hidden (pre-filled from token data)
- Field ID: `entry.participantName`

**Field 3: Participant Email (Hidden)**
- Type: **Text**
- Question: "Your Email"
- Settings:
  - ✅ Required
  - ✅ Hidden (pre-filled from token data)
- Field ID: `entry.participantEmail`

**Field 4: Roundtable ID (Hidden)**
- Type: **Text**
- Question: "Roundtable ID"
- Settings:
  - ✅ Required
  - ✅ Hidden (pre-filled from token data)
- Field ID: `entry.roundtableId`

**Field 5: Roundtable Name (Hidden)**
- Type: **Text**
- Question: "Roundtable Name"
- Settings:
  - ✅ Required
  - ✅ Hidden (pre-filled from token data)
- Field ID: `entry.roundtableName`

**Field 6: Topic Selection (Main Field)**
- Type: **Choice** (Multiple selection)
- Question: "Select your top 8 topics for discussion"
- Options: (These should match your topic list - can be dynamically populated)
  - Topic 1
  - Topic 2
  - Topic 3
  - ... (add all available topics)
- Settings:
  - ✅ Required
  - ✅ Multiple selections allowed
  - ⚠️ Note: Add validation in Power Automate to ensure exactly 8 selections

### Step 3: Form Settings
1. Click **Settings** (⚙️ icon)
2. Configure:
   - ✅ One response per person
   - ✅ Only people in my organization can respond
   - ✅ Record name (automatically)
   - ⚠️ Disable "Allow anonymous responses"

### Step 4: Get Form URL
1. Click **Share**
2. Click **Get a link to the form**
3. Copy the form URL (e.g., `https://forms.office.com/r/abc123xyz`)
4. Save this URL - you'll need it for environment configuration

---

## Part 2: Configure Power Automate Webhook

### Step 1: Create New Flow
1. Go to https://make.powerautomate.com
2. Click **+ Create** → **Automated cloud flow**
3. Flow name: "Roundtable Voting Webhook"
4. Trigger: **Microsoft Forms** → **When a new response is submitted**

### Step 2: Configure Trigger
1. Select your form from the dropdown
2. Click **+ New step**

### Step 3: Get Response Details
1. Add action: **Microsoft Forms** → **Get response details**
2. Form Id: Select your form
3. Response Id: Use dynamic content from trigger

### Step 4: Parse Response Data
1. Add action: **Data Operations** → **Parse JSON**
2. Content: Use `Response` from "Get response details"
3. Schema: (Microsoft Forms will auto-generate this)

### Step 5: Validate Topic Count (Optional but Recommended)
1. Add action: **Control** → **Condition**
2. Check if topic selections count equals 8
3. If not equal to 8, send error notification and terminate

### Step 6: Generate Webhook Signature
1. Add action: **Data Operations** → **Compose**
2. Name this action: "Generate Signature"
3. Inputs:
```
concat(
  'sha256=',
  utcNow(),
  variables('WebhookSecret')
)
```
4. You'll use your `MS_FORMS_WEBHOOK_SECRET` here

### Step 7: Send HTTP Request to Backend
1. Add action: **HTTP** → **HTTP**
2. Configure:
   - **Method**: POST
   - **URI**: `https://your-backend-domain.com/api/forms/webhook/vote`
   - **Headers**:
     - `Content-Type`: `application/json`
     - `x-ms-signature`: (Use signature from previous step)
   - **Body**:
```json
{
  "sessionId": "@{outputs('Get_response_details')?['body/entry.sessionId']}",
  "responses": {
    "topic_selections": @{outputs('Get_response_details')?['body/topicSelections']}
  }
}
```

### Step 8: Handle Response
1. Add action: **Control** → **Condition**
2. Check if HTTP status code = 200
3. **If yes**:
   - Add action: **Send an email (V2)**
   - To: Participant email
   - Subject: "Your votes have been recorded"
   - Body: Success message
4. **If no**:
   - Add action: **Send an email (V2)**
   - To: Administrator email
   - Subject: "Voting webhook failed"
   - Body: Error details

### Step 9: Save and Test Flow
1. Click **Save**
2. Test with a sample form submission
3. Check audit logs in backend to verify webhook received

---

## Part 3: Backend Configuration

### Step 1: Update Environment Variables

Edit your `.env` file:

```bash
# Microsoft Forms Integration
MS_FORMS_VOTING_URL=https://forms.office.com/r/YOUR_FORM_ID
MS_FORMS_WEBHOOK_SECRET=your-secure-webhook-secret-here
```

**Generating Webhook Secret**:
```bash
# Generate a secure random secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 2: Database Migration

Run Prisma migrations to add VotingSession model:

```bash
cd backend
npx prisma migrate dev --name add_microsoft_forms_integration
npx prisma generate
```

### Step 3: Configure Roundtable-Specific Forms (Optional)

If you want different forms for different roundtables:

```typescript
// When creating/updating a roundtable
await prisma.roundtable.update({
  where: { id: roundtableId },
  data: {
    formsUrl: 'https://forms.office.com/r/SPECIFIC_FORM_ID'
  }
})
```

The system will use roundtable-specific URL if configured, otherwise falls back to `MS_FORMS_VOTING_URL`.

---

## Part 4: Email Template for Participants

### Voting Invitation Email

**Subject**: Roundtable Topic Voting - Your Input Needed

**Body**:
```
Dear {{participantName}},

You're invited to vote on topics for the upcoming roundtable: {{roundtableName}}

Please select your top 8 topics by clicking the link below:

{{votingLink}}

This link is valid for 7 days and can only be used once.
When you click the link, you'll be redirected to a Microsoft Forms page
where you can make your selections.

Important:
- You must select exactly 8 topics
- The form session expires after 30 minutes
- Your votes are securely recorded and cannot be changed after submission

If you have any questions, please contact: {{coordinatorEmail}}

Best regards,
Maka Italia Training Team
```

### Voting Link Format

The voting link sent to participants should be:
```
https://your-backend-domain.com/api/forms/vote/{{VOTING_TOKEN}}
```

**Example**:
```
https://api.roundtables.makaitalia.com/api/forms/vote/a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

---

## Part 5: Testing

### Test Checklist

#### Token Generation
- [ ] Create voting tokens for roundtable
- [ ] Verify tokens created in database
- [ ] Check token expiration dates are correct

#### Email Flow
- [ ] Send test voting invitation email
- [ ] Verify email contains correct voting link
- [ ] Check email formatting and placeholders

#### Token Validation & Redirect
- [ ] Click voting link from email
- [ ] Verify redirect to Microsoft Forms
- [ ] Confirm hidden fields are pre-filled correctly:
  - [ ] Session ID present
  - [ ] Participant name correct
  - [ ] Participant email correct
  - [ ] Roundtable ID present
  - [ ] Roundtable name correct

#### Form Submission
- [ ] Select exactly 8 topics
- [ ] Submit form
- [ ] Verify Power Automate flow triggers
- [ ] Check webhook sent to backend

#### Backend Processing
- [ ] Verify votes recorded in database
- [ ] Check voting session marked as used
- [ ] Check voting token marked as used
- [ ] Verify audit log entries created

#### Security Tests
- [ ] Try reusing same voting link (should fail)
- [ ] Try accessing without token (should fail)
- [ ] Try accessing with expired token (should fail)
- [ ] Try webhook without signature (should fail if secret configured)
- [ ] Try selecting wrong number of topics (should fail)

#### Audit Trail
- [ ] Review audit logs for token verification
- [ ] Review audit logs for successful vote
- [ ] Review audit logs for any failures
- [ ] Check suspicious activity detection

---

## Part 6: Troubleshooting

### Common Issues

#### Issue: "Invalid voting token" Error
**Cause**: Token expired, already used, or invalid
**Solution**:
1. Check token expiration date in database
2. Verify token hasn't been used (usedAt should be NULL)
3. Generate new token if needed:
```bash
# Via API
POST /api/roundtables/:roundtableId/generate-tokens
```

#### Issue: Redirect Not Working
**Cause**: Forms URL not configured
**Solution**:
1. Check `.env` file has `MS_FORMS_VOTING_URL`
2. Verify roundtable has formsUrl or fallback exists
3. Check logs for error messages

#### Issue: Webhook Not Received
**Cause**: Power Automate flow not triggered or network issue
**Solution**:
1. Check Power Automate run history
2. Verify webhook URL is correct and accessible
3. Check firewall/network settings
4. Test with curl:
```bash
curl -X POST https://your-backend.com/api/forms/webhook/vote \
  -H "Content-Type: application/json" \
  -H "x-ms-signature: test-signature" \
  -d '{
    "sessionId": "test-session-id",
    "responses": {
      "topic_selections": ["topic1", "topic2", "topic3", "topic4", "topic5", "topic6", "topic7", "topic8"]
    }
  }'
```

#### Issue: "Invalid webhook signature" Error
**Cause**: Signature mismatch or missing secret
**Solution**:
1. Verify `MS_FORMS_WEBHOOK_SECRET` matches in both:
   - Backend `.env` file
   - Power Automate flow
2. Check signature generation logic in Power Automate
3. For testing, temporarily remove signature validation

#### Issue: "Must select exactly 8 topics" Error
**Cause**: Wrong number of topics submitted
**Solution**:
1. Add validation in Microsoft Forms (if possible)
2. Add validation in Power Automate flow
3. Clearly communicate requirement in form description

#### Issue: Session Expired
**Cause**: More than 30 minutes between redirect and submission
**Solution**:
1. Instruct participants to complete form promptly
2. Increase session timeout in `VotingTokenService.ts` (line 273):
```typescript
expiresAt: addMinutes(new Date(), 60), // Increase to 60 minutes
```

---

## Part 7: Security Best Practices

### Production Checklist

#### Environment Security
- [ ] Use strong, random JWT_SECRET (min 32 characters)
- [ ] Use strong, random MS_FORMS_WEBHOOK_SECRET
- [ ] Enable HTTPS for all endpoints
- [ ] Configure SSL for database connection
- [ ] Restrict CORS to known origins only

#### Microsoft Forms Security
- [ ] Disable anonymous responses
- [ ] Require Microsoft 365 authentication
- [ ] Enable "One response per person"
- [ ] Use organization-only access

#### Power Automate Security
- [ ] Store webhook secret in environment variable
- [ ] Use service account with minimal permissions
- [ ] Enable connection security
- [ ] Monitor flow run history regularly

#### Database Security
- [ ] Regular backups of voting data
- [ ] Encrypted connections to database
- [ ] Principle of least privilege for database users
- [ ] Regular security audits

#### Monitoring & Logging
- [ ] Set up alerts for failed webhooks
- [ ] Monitor audit logs daily
- [ ] Set up alerts for suspicious activity
- [ ] Regular review of voting patterns

---

## Part 8: API Reference

### Endpoints

#### GET /api/forms/vote/:token
Validates voting token and redirects to Microsoft Forms

**Parameters**:
- `token` (path): Voting token from email

**Response**:
- **Success**: 302 Redirect to Microsoft Forms
- **Error**: 400/401 JSON error message

**Example**:
```
GET /api/forms/vote/a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

#### POST /api/forms/webhook/vote
Receives form submissions from Power Automate

**Headers**:
- `Content-Type`: application/json
- `x-ms-signature`: HMAC signature (if webhook secret configured)

**Body**:
```json
{
  "sessionId": "abc123",
  "responses": {
    "topic_selections": ["topic_id_1", "topic_id_2", ..., "topic_id_8"]
  }
}
```

**Response**:
```json
{
  "success": true,
  "message": "Votes recorded successfully",
  "data": {
    "participantName": "John Doe",
    "roundtableName": "Leadership Skills",
    "topicsSelected": 8
  }
}
```

#### GET /api/forms/session/:sessionId/status
Check voting session validity

**Parameters**:
- `sessionId` (path): Session ID

**Response**:
```json
{
  "success": true,
  "data": {
    "sessionId": "abc123",
    "isValid": true,
    "isUsed": false,
    "isExpired": false,
    "expiresAt": "2025-01-15T10:30:00Z",
    "participant": {
      "name": "John Doe",
      "email": "john@company.com"
    },
    "roundtable": {
      "name": "Leadership Skills"
    }
  }
}
```

---

## Part 9: Maintenance

### Regular Tasks

#### Weekly
- Review Power Automate flow run history
- Check for failed webhook deliveries
- Review audit logs for anomalies

#### Monthly
- Cleanup expired voting sessions:
```bash
# Run cleanup script
npm run cleanup:expired-sessions
```
- Review and rotate webhook secrets if needed
- Update Microsoft Forms questions if topics changed

#### Quarterly
- Security audit of integration
- Review and update documentation
- Test disaster recovery procedures

### Database Queries

#### Check Token Statistics
```sql
SELECT
  r.name as roundtable_name,
  COUNT(*) as total_tokens,
  COUNT(CASE WHEN used_at IS NOT NULL THEN 1 END) as used_tokens,
  COUNT(CASE WHEN expires_at < NOW() AND used_at IS NULL THEN 1 END) as expired_tokens
FROM voting_tokens vt
JOIN roundtables r ON vt.roundtable_id = r.id
GROUP BY r.name;
```

#### Check Recent Voting Activity
```sql
SELECT
  al.created_at,
  al.action,
  al.result,
  al.metadata->>'participantId' as participant_id,
  al.metadata->>'roundtableId' as roundtable_id
FROM audit_logs al
WHERE al.resource = 'topic'
  AND al.action = 'vote'
  AND al.created_at > NOW() - INTERVAL '7 days'
ORDER BY al.created_at DESC;
```

---

## Part 10: Migration from Direct Voting

If you're migrating from the direct voting system (`/api/topics/vote/:roundtableId`), follow these steps:

### Step 1: Run Both Systems in Parallel
1. Keep existing direct voting endpoint active
2. Deploy Microsoft Forms integration
3. Test with small group first

### Step 2: Update Email Templates
Replace direct voting links with Forms voting links:

**Old**:
```
https://frontend.com/vote?roundtable={{roundtableId}}&token={{token}}
```

**New**:
```
https://api.roundtables.com/api/forms/vote/{{token}}
```

### Step 3: Monitor Both Systems
- Compare vote submission rates
- Check for errors or user confusion
- Gather user feedback

### Step 4: Gradual Rollout
1. Week 1: 10% of roundtables use Forms
2. Week 2: 50% of roundtables use Forms
3. Week 3: 100% migration if successful

### Step 5: Deprecate Old System
After successful migration:
1. Add deprecation warning to old endpoint
2. Remove old voting UI from frontend
3. Archive old voting code

---

## Support

For technical support or questions about this integration:

- **Documentation**: See `/IMPLEMENTATION-GUIDE.md` for security patterns
- **Security Issues**: See `/SECURITY.md` for reporting procedures
- **API Issues**: Check audit logs at `/api/audit-logs` (Admin only)
- **Microsoft Forms Help**: https://support.microsoft.com/en-us/forms
- **Power Automate Help**: https://make.powerautomate.com/support

---

**Last Updated**: January 2025
**Version**: 1.0.0
**Status**: Production Ready ✅
