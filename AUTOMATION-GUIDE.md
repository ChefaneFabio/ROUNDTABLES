# Roundtable Automation Guide

## Overview

This guide documents the complete automation system for Maka Italia's roundtable workflow. The system eliminates manual, time-consuming tasks while maintaining full control and oversight.

---

## Automated Workflow Comparison

### Before (Manual Process)

| Task | Frequency | Time Required | Risk |
|------|-----------|---------------|------|
| Send trainer reminder | 1 week before each session | 5 min/session | Forget to send |
| Request questions from trainer | After reminder | 5 min/session | Trainer delays |
| Review & approve questions | When received | 10 min/session | Bottleneck |
| Send questions to participants | After approval | 10 min/session | Delay in sending |
| Request feedback from trainer | Day after session | 5 min/session | Forget to request |
| Review & approve feedback | When received | 15 min/session | Bottleneck |
| Send feedback to participants | After approval | 30 min/session (6 emails) | Delay in sending |
| **Total per session** | **Multiple days** | **~80 minutes** | **High** |
| **Total for 10 sessions** | **Weeks** | **~13 hours** | **Very High** |

### After (Automated Process)

| Task | Automation | Coordinator Action | Time Saved |
|------|------------|-------------------|------------|
| Send trainer reminder | ✅ Auto @ 1 week before | None | 5 min |
| Request questions | ✅ Auto if not submitted | None | 5 min |
| Review questions | Manual (with reminders) | Approve in dashboard | Same |
| Send questions | ✅ Auto after approval | None | 10 min |
| Request feedback | ✅ Auto day after session | None | 5 min |
| Review feedback | Manual (with reminders) | Approve in dashboard | Same |
| Send feedback | ✅ Auto after approval | None | 30 min |
| Late reminders | ✅ Auto if overdue | None | 10 min |
| Cost monitoring | ✅ Auto weekly reports | Review alerts | 15 min |
| **Coordinator time per session** | - | **~25 minutes** (approval only) | **~55 minutes saved** |
| **Total for 10 sessions** | - | **~4 hours** | **~9 hours saved** |

**Time savings: 70% reduction in manual work**

---

## Automated Jobs Schedule

### Daily Schedule

```
08:00 Monday    → Weekly cost monitoring report
09:00 Daily     → Trainer reminders (1 week before sessions)
10:00 Daily     → Question requests (if not submitted)
11:00 Daily     → Alert coordinators about pending question approvals
14:00 Daily     → Send questions to participants (if approved)
15:00 Daily     → Alert coordinators about pending feedback approvals
16:00 Daily     → Remind trainers about late question submissions
17:00 Daily     → Critical cost overrun alerts
18:00 Daily     → Request feedback from trainers (day of session)
19:00 Daily     → Remind trainers about late feedback submissions

Every hour       → Auto-update session status based on approvals
Every 30 min     → Auto-send approved feedback to participants
Every 15 min     → Process scheduled notifications

Sunday 02:00     → Database cleanup (old notifications, expired tokens)
```

### Workflow Timeline for Each Session

```
Day -7 (Week Before)
├── 09:00 → Trainer receives reminder email
├── 09:05 → (Optional) Trainer receives Teams notification
└── Status: Session → REMINDER_SENT

Day -6 to Day -4
├── 10:00 → (If no questions) Trainer receives question request
├── 16:00 → (If still no questions) Trainer receives reminder
└── Status: Session → QUESTIONS_REQUESTED

Day -3 (Questions Submitted)
├── Coordinator receives notification
├── Coordinator reviews and approves questions
├── Every hour → System checks approval status
└── Status: Session → QUESTIONS_READY

Day -2 or Day -1
├── 11:00 → (If still pending) Coordinator receives approval reminder
├── 14:00 → (If approved) Participants receive questions email
└── Status: Questions → APPROVED

Day 0 (Session Day)
├── Session happens
├── 18:00 → Trainer receives feedback request
└── Status: Session → COMPLETED

Day +1 (After Session)
├── Trainer submits feedback for each participant
├── Coordinator receives notification
├── Coordinator reviews and approves feedback
└── Status: Session → FEEDBACK_PENDING

Day +2
├── 15:00 → (If still pending) Coordinator receives approval reminder
├── 19:00 → (If no feedback) Trainer receives urgent reminder
├── Every 30 min → System sends approved feedback to participants
└── Status: Feedback → SENT, Session → FEEDBACK_SENT

Day +7 (Week After)
└── All feedback sent, cycle completes for this session
```

---

## Detailed Job Descriptions

### 1. Trainer Reminders (9 AM Daily)

**Purpose**: Remind trainers 1 week before their scheduled sessions

**Trigger**:
- Session scheduled exactly 7 days from now
- Session status: `SCHEDULED`
- Trainer assigned to session

**Actions**:
1. Find all sessions 7 days away
2. Send email to each trainer with:
   - Session details (number, topic, date, client)
   - Request to prepare 3 questions
   - Link to submission form
3. Update session status to `REMINDER_SENT`
4. (Optional) Send Teams notification

**Email Template Variables**:
```javascript
{
  trainerName: string
  sessionNumber: number
  roundtableName: string
  topicTitle: string
  scheduledDate: Date
  clientName: string
  daysUntil: number
}
```

**Example Email**:
```
Subject: Session Reminder - Leadership Skills Roundtable

Dear John,

This is a reminder about your upcoming session:

Session: 3/10
Roundtable: Leadership Skills (Acme Corp)
Topic: The Art of Negotiation
Date: December 15, 2025 at 10:00 AM
In: 7 days

Please prepare 3 discussion questions for this session and submit them
within the next 2 days so we can send them to participants in advance.

Submit questions: https://roundtables.makaitalia.com/trainer/sessions/abc123

Best regards,
The Maka Team
```

---

### 2. Question Requests (10 AM Daily)

**Purpose**: Request questions from trainers who received reminders but haven't submitted

**Trigger**:
- Session scheduled 6-7 days away
- Session status: `REMINDER_SENT`
- No questions submitted yet

**Actions**:
1. Send question request email/Teams message
2. Update session status to `QUESTIONS_REQUESTED`

---

### 3. Question Approval Reminders (11 AM Daily)

**Purpose**: Alert coordinators about questions waiting for approval >2 days

**Trigger**:
- Questions with status `PENDING`
- Created more than 2 days ago

**Actions**:
1. Compile list of pending questions with session details
2. Send summary email to all coordinators
3. Include dashboard link for quick approval

**Example Email**:
```
Subject: ⚠️ 5 Questions Awaiting Approval

Hi,

There are 5 questions that have been pending approval for more than 2 days:

- Session 3: Leadership Skills (John Smith) - Submitted 3 days ago
- Session 5: Team Building (Mary Jones) - Submitted 2 days ago
- ...

Please review and approve these questions so they can be sent to participants.

Dashboard: https://roundtables.makaitalia.com/questions

Best regards,
Roundtable Automation System
```

---

### 4. Send Questions to Participants (2 PM Daily)

**Purpose**: Automatically send approved questions to all participants

**Trigger**:
- Session scheduled tomorrow or in 2 days
- Session status: `QUESTIONS_READY`
- At least 3 questions with status `APPROVED`

**Actions**:
1. Fetch approved questions for session
2. Generate email with all questions formatted
3. Send to all active participants in roundtable
4. Log in notifications table

**Email Format** (matches original template):
```
Subject: FASTWEB | ROUNDTABLE SESSION 3 ON 12/15 – QUESTIONS TO TOPIC "THE ART OF NEGOTIATION"

Hi,

According to a 2021 survey by McKinsey & Company, 80% of executives believe that
effective negotiation skills are critical for driving business success...

Please see below the opening questions for the upcoming discussion on
"The art of negotiation" on 15th December:

1. What do you think makes someone a good negotiator?

2. Research from the Harvard Program on Negotiation shows that 90% of successful
   negotiators focus on understanding the other party's needs rather than just
   their own. Why do you think this approach works well?

3. How important is trust when you are negotiating?

I hope you have a productive and insightful conversation.

Jean
```

---

### 5. Feedback Approval Reminders (3 PM Daily)

**Purpose**: Alert coordinators about feedback waiting for approval >2 days

**Trigger**:
- Feedback with status `PENDING`
- Created more than 2 days ago

**Actions**:
1. Compile list of pending feedback with participant/session details
2. Send summary email to coordinators
3. Include dashboard link

---

### 6. Late Trainer Question Reminders (4 PM Daily)

**Purpose**: Remind trainers who haven't submitted questions 3-4 days before session

**Trigger**:
- Session scheduled 3-7 days away
- Session status: `REMINDER_SENT` or `QUESTIONS_REQUESTED`
- No questions submitted yet

**Actions**:
1. Send reminder email with urgency marker
2. Include days until session
3. (Optional) Send Teams notification with escalated priority

**Example Email**:
```
Subject: ⚠️ REMINDER: Questions Needed - Session 3

Dear John,

This is a reminder that we still need your 3 questions for the upcoming session:

Session: 3/10
Roundtable: Leadership Skills
Topic: The Art of Negotiation
Date: December 15, 2025

The session is in 4 days.

Please submit your questions as soon as possible so we can send them to
participants in time.

Submit here: https://roundtables.makaitalia.com/trainer/questions

Thank you,
The Maka Team
```

---

### 7. Feedback Requests (6 PM Daily)

**Purpose**: Request individual feedback from trainers day of/after session

**Trigger**:
- Session was today
- Session status: `COMPLETED`
- No feedback submitted yet

**Actions**:
1. Send feedback request to trainer
2. Update session status to `FEEDBACK_PENDING`
3. Include list of participants needing feedback

---

### 8. Late Trainer Feedback Reminders (7 PM Daily)

**Purpose**: Remind trainers who haven't submitted feedback 2+ days after session

**Trigger**:
- Session completed 2+ days ago
- Session status: `COMPLETED` or `FEEDBACK_PENDING`
- No feedback submitted

**Actions**:
1. Send urgent reminder email
2. Show how many days late
3. List participants awaiting feedback

**Example Email**:
```
Subject: ⚠️ URGENT: Feedback Needed - Session 3

Dear John,

This is an urgent reminder that we still need individual feedback for each
participant from your recent session:

Session: 3/10
Roundtable: Leadership Skills
Topic: The Art of Negotiation
Date: December 10, 2025 (3 days ago)

Participants: 6

Please submit feedback for all participants as soon as possible.

Submit here: https://roundtables.makaitalia.com/trainer/feedback

Thank you,
The Maka Team
```

---

### 9. Auto-Send Approved Feedback (Every 30 Minutes)

**Purpose**: Automatically send feedback to participants once approved by coordinator

**Trigger**:
- Feedback status: `APPROVED`
- Feedback not yet sent (`sentAt` is NULL)

**Actions**:
1. Fetch all approved, unsent feedback
2. For each feedback:
   - Generate email using feedback template
   - Send to participant
   - Update feedback status to `SENT`
   - Set `sentAt` timestamp
3. Check if all feedback for session is sent
4. If yes, update session status to `FEEDBACK_SENT`

**Email Format** (matches original template):
```
Subject: Feedback from Session 3 - The Art of Negotiation

Hi Maria,

How are you doing?

I am passing along some feedback from John Smith regarding your recent
roundtable discussion on The Art of Negotiation.

John Smith's Feedback:
You effectively connected 'diversity' and 'inclusion,' emphasizing how
inclusive workplaces boost employee satisfaction and engagement, particularly
in technical fields and concerning gender equality. You rightly identified
the salary gap as a significant barrier and stressed the need for dedicated
training. Your points on promoting the value of D&I, implementing regular
assessments and feedback, and creating safe spaces for expression were
well-highlighted and insightful.

I encourage you to broaden your functional vocabulary, enhance your
pronunciation, and utilize intonation more effectively. Your contributions
to the discussion on workplace communication were highly valuable. Continue
to expand your vocabulary, particularly in areas such as expressing opinions,
managing interruptions, acknowledging others' input, and employing persuasive
language.

Well done on your effort!

See you in the next conversation.

Jean
```

---

### 10. Auto-Update Session Status (Every Hour)

**Purpose**: Automatically update session status based on question/feedback approvals

**Trigger (Questions)**:
- Session status: `QUESTIONS_REQUESTED`
- All questions for session have status `APPROVED`
- At least 3 questions exist

**Actions**:
- Update session status to `QUESTIONS_READY`
- Triggers pre-session email to participants

**Trigger (Feedback)**:
- Session status: `FEEDBACK_PENDING`
- All feedback for session has status `SENT`

**Actions**:
- Update session status to `FEEDBACK_SENT`
- Session cycle complete

---

### 11. Voting Token Cleanup (Sunday 2 AM)

**Purpose**: Remove expired voting tokens and sessions to keep database clean

**Actions**:
1. Delete voting tokens where `expiresAt < NOW()`
2. Delete voting sessions where:
   - `expiresAt < NOW()` OR
   - `isUsed = true` AND `usedAt < 7 days ago`
3. Delete old notifications (>90 days, status SENT/FAILED)
4. Log cleanup statistics

---

### 12. Weekly Cost Monitoring (Monday 8 AM)

**Purpose**: Alert coordinators about roundtables approaching/exceeding budget

**Trigger**:
- Every Monday morning
- Analyzes all active roundtables

**Calculations**:
```javascript
Level Test Costs = (tests conducted) × €50
Trainer Session Costs = (sessions completed) × €100
Overhead Costs = (active participants) × €20
Total Costs = Level Tests + Trainer Sessions + Overhead

Estimated Budget = (participants × 10 sessions × €100) + overhead + buffer
Budget Utilization = (Total Costs / Budget) × 100%
```

**Alert Thresholds**:
- 🟡 Warning: >80% budget utilization
- 🔴 Critical: >100% budget (over budget)
- 🔴 High failure rate: >30% level test failures

**Example Report**:
```
💰 Weekly Roundtable Cost Monitoring Report

⚠️ 2 Roundtable(s) Approaching/Exceeding Budget:

🟡 WARNING - Leadership Skills (Acme Corp)
  Budget Utilization: 87.5%
  Total Costs: €1,750.00 / €2,000.00
  Breakdown:
    - Level Tests: €350.00 (7 tests, 1 failed)
    - Trainer Sessions: €1,200.00 (12/10 completed)
    - Overhead: €200.00 (10 participants)

🔴 OVER BUDGET - Team Building (Global Tech)
  Budget Utilization: 112.3%
  Total Costs: €2,246.00 / €2,000.00
  Breakdown:
    - Level Tests: €600.00 (12 tests, 4 failed)
    - Trainer Sessions: €1,400.00 (14/10 completed)
    - Overhead: €246.00 (12 participants)

⚠️ 1 Roundtable(s) with High Level Test Failure Rates:

🔴 Team Building (Global Tech)
  Failure Rate: 33.3% (4/12)
  Extra Costs: €200.00
  ⚡ Action: Review participant selection criteria with client

Dashboard: https://roundtables.makaitalia.com/dashboard/costs

Generated: Monday, January 20, 2025 at 8:00 AM
```

---

### 13. Critical Cost Overrun Alerts (Daily 5 PM)

**Purpose**: Immediate alert when any roundtable exceeds 100% budget

**Trigger**:
- Any roundtable with budget utilization >100%

**Actions**:
1. Send urgent email to coordinators immediately
2. Include specific overrun details
3. Mark as urgent priority

---

## Microsoft Teams Integration

### Setup

1. In Teams, navigate to the channel for roundtable notifications
2. Click **"..."** → **"Connectors"** → **"Incoming Webhook"**
3. Name: "Roundtable Automation"
4. Copy webhook URL
5. Add to `.env`: `TEAMS_WEBHOOK_URL=<copied-url>`

### When Teams Notifications Are Sent

Teams messages are sent as **alternative/complement to email** for:

- Trainer reminders (9 AM daily)
- Question requests (10 AM daily)
- Feedback requests (6 PM daily)
- Late submission reminders (4 PM, 7 PM daily)

### Adaptive Card Format

Teams notifications use rich Adaptive Cards with:
- Color-coded themes (blue, orange, red for urgency)
- Structured facts (session number, topic, date, etc.)
- Action buttons linking to submission forms
- Professional formatting

**Example Teams Card**:
```
[Blue Card]
🔔 Session Reminder: Leadership Skills

Hello John Smith

Session: 3/10
Topic: The Art of Negotiation
Date: December 15, 2025 at 10:00 AM
In: 7 days (Friday)
Client: Acme Corp

Please prepare 3 discussion questions for this session and submit them
within the next 2 days.

[Submit Questions Button] → Opens submission form
```

---

## Cost Monitoring Details

### Cost Categories

**1. Level Test Costs**
- Default: €50 per test
- Includes initial placement tests and retests
- Tracked per participant
- Alerts when failure rate >30%

**2. Trainer Session Costs**
- Default: €100 per session
- Counted only for completed sessions
- Tracks actual vs planned sessions

**3. Overhead Costs**
- Default: €20 per active participant
- Covers coordination, materials, platform costs
- Calculated on active participants only

### Budget Calculation

```
Estimated Budget Formula:
= (Active Participants × 10 Sessions × Trainer Cost)
  + (Active Participants × Overhead Cost)
  + (Total Participants + 2 Buffer) × Level Test Cost

Example for 6 participants:
= (6 × 10 × €100) + (6 × €20) + (6+2) × €50
= €6,000 + €120 + €400
= €6,520
```

### When Costs Exceed Budget

**Reasons**:
1. High level test failure rate → More retests needed
2. Additional sessions beyond 10 → Extra trainer costs
3. Participant dropouts after level tests → Sunk costs

**Automated Actions**:
1. **80% utilization**: Weekly warning in Monday report
2. **100% utilization**: Daily urgent alert at 5 PM
3. **30%+ test failures**: Special alert with recommendations

**Manual Actions Required**:
1. Review participant selection criteria with client
2. Consider adjusting roundtable scope
3. Discuss cost overruns with client
4. Update budget if scope changed

---

## Configuration & Customization

### Environment Variables

All automation thresholds and costs can be configured in `.env`:

```bash
# Notification Timing
# (Cron schedules are in scheduler.ts - requires code change)

# Cost Thresholds
LEVEL_TEST_COST=50                    # EUR per level test
TRAINER_SESSION_COST=100              # EUR per session
OVERHEAD_PER_PARTICIPANT=20           # EUR per participant

# Alert Thresholds (in scheduler.ts)
BUDGET_WARNING_THRESHOLD=80           # % budget utilization
BUDGET_CRITICAL_THRESHOLD=100         # % budget utilization
LEVEL_TEST_FAILURE_THRESHOLD=0.30     # 30% failure rate

# Integration URLs
TEAMS_WEBHOOK_URL=https://...         # Teams incoming webhook
FRONTEND_URL=https://...              # Dashboard URL for links

# Email Recipients
COORDINATOR_EMAILS=training@makaitalia.com,alessia@makaitalia.com
```

### Customizing Email Templates

Email templates are managed in `EmailTemplateService.ts`:

1. **Trainer Reminder**: `generateTrainerReminderData()`
2. **Pre-Session Questions**: `generatePreSessionData()`
3. **Feedback to Participant**: `generateFeedbackData()`
4. **Voting Invitation**: `generateVotingInviteData()`

To customize:
1. Edit template functions in `EmailTemplateService.ts`
2. Restart server to apply changes
3. No database migration needed

### Adjusting Schedules

To change when jobs run, edit `backend/src/jobs/scheduler.ts`:

```javascript
// Change trainer reminders from 9 AM to 8 AM
cron.schedule('0 8 * * *', async () => { // Changed from '0 9 * * *'
  console.log('🔔 Checking for trainer reminders...')
  // ...
})
```

**Cron Format**: `minute hour day month weekday`
- `0 9 * * *` = 9 AM daily
- `0 8 * * 1` = 8 AM every Monday
- `*/15 * * * *` = Every 15 minutes

---

## Monitoring & Troubleshooting

### Checking Automation Status

**View scheduler logs**:
```bash
cd backend
npm run dev

# Look for:
# 🕐 Job scheduler initialized - Maka Roundtables Automation
# 📋 Scheduled jobs:
#   - 09:00: Trainer reminders...
```

**Check if jobs are running**:
- Jobs log their activity to console
- Example: `🔔 Checking for trainer reminders...`
- Example: `✅ Trainer reminder sent for session abc123`

**Database queries** to verify automation:

```sql
-- Check notification history
SELECT type, recipient, status, created_at, sent_at
FROM notifications
WHERE created_at > NOW() - INTERVAL '7 days'
ORDER BY created_at DESC;

-- Check session status progression
SELECT
  s.session_number,
  rt.name as roundtable,
  s.status,
  s.scheduled_at,
  COUNT(DISTINCT q.id) as question_count,
  COUNT(DISTINCT f.id) as feedback_count
FROM sessions s
JOIN roundtables rt ON s.roundtable_id = rt.id
LEFT JOIN questions q ON s.id = q.session_id
LEFT JOIN feedback f ON s.id = f.session_id
WHERE s.scheduled_at > NOW() - INTERVAL '30 days'
GROUP BY s.id, s.session_number, rt.name, s.status, s.scheduled_at
ORDER BY s.scheduled_at;

-- Check pending approvals
SELECT
  'Questions' as type,
  COUNT(*) as pending_count,
  MAX(created_at) as oldest
FROM questions
WHERE status = 'PENDING'
UNION ALL
SELECT
  'Feedback' as type,
  COUNT(*) as pending_count,
  MAX(created_at) as oldest
FROM feedback
WHERE status = 'PENDING';
```

### Common Issues

**1. Notifications not being sent**

**Symptoms**: No emails received, jobs run but nothing happens

**Checks**:
1. Verify SMTP configuration in `.env`
2. Check `NODE_ENV` - emails only sent in `production`
3. Check notification table:
   ```sql
   SELECT * FROM notifications WHERE status = 'FAILED';
   ```
4. Review email logs in console

**Solution**:
```bash
# Test email configuration
cd backend
node -e "
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
});
transporter.verify().then(console.log).catch(console.error);
"
```

**2. Jobs not triggering at expected times**

**Symptoms**: Trainer reminders not sent at 9 AM

**Checks**:
1. Verify server time zone: `date`
2. Check if scheduler is running: Look for initialization message
3. Verify cron syntax in `scheduler.ts`

**Solution**:
- Cron schedules use **server time zone**
- If server is UTC but you want CET (Central European Time):
  - 9 AM CET = 8 AM UTC in winter, 7 AM UTC in summer
  - Adjust cron schedules accordingly

**3. Session status not updating**

**Symptoms**: Session stuck in `QUESTIONS_REQUESTED` even though questions approved

**Checks**:
1. Verify questions actually have `APPROVED` status
2. Check if auto-update job is running (every hour)
3. Review console for errors

**Solution**:
```sql
-- Manually check session
SELECT
  s.id,
  s.status,
  COUNT(q.id) as total_questions,
  COUNT(CASE WHEN q.status = 'APPROVED' THEN 1 END) as approved_questions
FROM sessions s
LEFT JOIN questions q ON s.id = q.session_id
WHERE s.id = 'SESSION_ID_HERE'
GROUP BY s.id, s.status;

-- If all questions approved but status not updated, manually update:
UPDATE sessions
SET status = 'QUESTIONS_READY'
WHERE id = 'SESSION_ID_HERE';
```

**4. Cost monitoring inaccurate**

**Symptoms**: Budget calculations don't match expectations

**Checks**:
1. Verify cost values in `.env`
2. Check participant counts and statuses
3. Review session completion counts

**Solution**:
```bash
# Manually trigger cost report
cd backend
npm run console

> const { CostMonitoringService } = require('./dist/services/CostMonitoringService');
> const costService = new CostMonitoringService();
> costService.calculateRoundtableCosts('ROUNDTABLE_ID').then(console.log);
```

---

## Testing Automation

### Manual Test Triggers

For testing without waiting for scheduled times:

```bash
cd backend
npm run console
```

```javascript
// Test trainer reminder
const { NotificationService } = require('./dist/services/NotificationService');
const notifService = new NotificationService();
await notifService.sendTrainerReminder('SESSION_ID_HERE');

// Test feedback sending
await notifService.sendFeedbackToParticipant('SESSION_ID', 'PARTICIPANT_ID', 'Test feedback content');

// Test cost monitoring
const { CostMonitoringService } = require('./dist/services/CostMonitoringService');
const costService = new CostMonitoringService();
await costService.generateCostAlertMessage().then(console.log);

// Test Teams notification
const { TeamsNotificationService } = require('./dist/services/TeamsNotificationService');
const teamsService = new TeamsNotificationService();
await teamsService.sendTrainerReminder('SESSION_ID');
```

### Integration Testing

Create test data with specific dates to trigger automation:

```sql
-- Create test roundtable
INSERT INTO roundtables (id, name, client_id, status)
VALUES ('test-rt-001', 'Test Roundtable', 'CLIENT_ID', 'IN_PROGRESS');

-- Create test session scheduled 7 days from now
INSERT INTO sessions (id, roundtable_id, session_number, scheduled_at, status, trainer_id)
VALUES (
  'test-session-001',
  'test-rt-001',
  3,
  NOW() + INTERVAL '7 days',
  'SCHEDULED',
  'TRAINER_ID'
);

-- Wait for next day at 9 AM, check if trainer reminder sent
SELECT * FROM notifications
WHERE recipient = 'trainer@example.com'
ORDER BY created_at DESC
LIMIT 1;
```

---

## Performance & Scalability

### Current Limits

- **Roundtables**: Unlimited
- **Sessions per day**: Unlimited
- **Notifications per job**: Unlimited
- **Database queries**: Optimized with indexes

### Resource Usage

**CPU**: Low
- Jobs run briefly (seconds per job)
- Most time spent waiting between cron triggers

**Memory**: Low
- ~50 MB for Node.js process
- PrismaClient connection pooling

**Database**: Low
- Jobs use efficient queries with indexes
- Cleanup job prevents table bloat

### Scaling Considerations

**For 100+ concurrent roundtables**:
- Current architecture supports this
- Consider notification batching (10-20 emails at once)
- Monitor SMTP rate limits

**For 1000+ concurrent roundtables**:
- Use queue system (Bull/BullMQ with Redis)
- Separate notification service
- Consider email service (SendGrid, AWS SES)

---

## Support & Maintenance

### Regular Maintenance Tasks

**Weekly**:
- Review cost monitoring reports (automated)
- Check for failed notifications in dashboard

**Monthly**:
- Review scheduler logs for errors
- Check database size and performance
- Update email templates if needed

**Quarterly**:
- Review and adjust cost thresholds
- Update automation documentation
- Security audit (dependency updates)

### Getting Help

**Logs Location**: Console output (stdout)
**Error Tracking**: Check `notifications` table for `status = 'FAILED'`
**Database Queries**: See "Monitoring & Troubleshooting" section
**Code Changes**: All automation in `backend/src/jobs/scheduler.ts`

---

## Summary: What's Automated vs. What's Manual

### ✅ Fully Automated

1. **Trainer Reminders**: 1 week before sessions
2. **Question Requests**: If trainer doesn't submit
3. **Late Trainer Reminders**: For questions and feedback
4. **Sending Questions to Participants**: After coordinator approves
5. **Feedback Requests**: Day after sessions
6. **Sending Feedback to Participants**: After coordinator approves
7. **Session Status Updates**: Based on approvals
8. **Cost Monitoring Reports**: Weekly and daily alerts
9. **Token Cleanup**: Expired voting tokens/sessions
10. **Coordinator Alerts**: Pending approvals >2 days

### 👤 Manual (Coordinator Actions Required)

1. **Review Questions**: Approve/reject/request changes
2. **Review Feedback**: Approve/reject/request changes
3. **Respond to Cost Alerts**: Adjust budgets or scope
4. **Handle Exceptions**: Late trainers, session cancellations

### 🎯 Result

- **70% time savings** on routine tasks
- **Zero risk** of forgetting to send notifications
- **Full control** over content quality (questions & feedback)
- **Proactive alerts** for bottlenecks and cost issues
- **Audit trail** for all notifications and approvals

---

**Last Updated**: January 2025
**Version**: 1.0.0
**Status**: Production Ready ✅
