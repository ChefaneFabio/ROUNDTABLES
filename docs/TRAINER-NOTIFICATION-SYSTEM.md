# 🔔 Trainer Notification System

## Overview
Automated notification system that sends emails to trainers when they are assigned to roundtable sessions.

**Implementation Date**: October 15, 2025

---

## ✨ Features

### **1. Automatic Notifications on Trainer Assignment**
- ✅ Notification sent immediately when trainer is assigned to a session
- ✅ Works for both individual assignment and bulk auto-assignment
- ✅ Includes all session details and important deadlines
- ✅ Provides direct link to trainer portal

### **2. Comprehensive Email Content**
The notification email includes:
- **Session Details**: Session number, roundtable name, client name, topic
- **Scheduled Date**: When the session will take place
- **Participant Count**: Number of participants in the session
- **Important Deadlines**:
  - Questions: 7 days before session
  - Feedback: 1 day after session
- **Next Steps**: Clear instructions on what to do next
- **Portal Link**: Direct link to trainer portal for easy access

### **3. Two Assignment Methods**

#### **Manual Assignment** (`PATCH /api/sessions/:id/assign-trainer`)
- Coordinator assigns specific trainer to specific session
- Notification sent immediately after assignment
- Used for targeted trainer selection

#### **Auto-Assignment** (`POST /api/sessions/:roundtableId/assign-trainers`)
- System automatically assigns trainers to all sessions (2-9) using round-robin
- Notification sent to each trainer for their assigned sessions
- Useful for quick setup of new roundtables

---

## 🔧 Technical Implementation

### **1. Backend Changes**

#### **NotificationService.ts** (New Method)
Location: `/backend/src/services/NotificationService.ts`

```typescript
async sendTrainerAssignmentNotification(sessionId: string) {
  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: {
      roundtable: {
        include: {
          client: true,
          participants: { where: { status: 'ACTIVE' } }
        }
      },
      topic: true,
      trainer: true
    }
  })

  if (!session?.trainer) return

  const notification = {
    type: 'TRAINER_ASSIGNMENT' as const,
    recipient: session.trainer.email,
    subject: `New Session Assignment - ${session.roundtable.name}`,
    content: this.generateTrainerAssignmentEmail({...})
  }

  return this.createAndSendNotification(notification)
}
```

#### **sessionController.ts** (Updated)
Location: `/backend/src/controllers/sessionController.ts`

**Manual Assignment Endpoint**:
```typescript
// Assign trainer to session
router.patch('/:id/assign-trainer', async (req: Request, res: Response) => {
  // ... existing assignment code ...

  // Send notification to trainer
  if (trainerId) {
    try {
      await notificationService.sendTrainerAssignmentNotification(id)
      console.log(`✅ Assignment notification sent to trainer for session ${id}`)
    } catch (error) {
      console.error('Error sending trainer assignment notification:', error)
      // Don't fail the request if notification fails
    }
  }

  res.json({ success: true, data: session })
})
```

#### **SchedulingService.ts** (Updated)
Location: `/backend/src/services/SchedulingService.ts`

**Auto-Assignment Method**:
```typescript
async autoAssignTrainers(roundtableId: string) {
  // ... existing assignment logic ...

  for (const session of roundtable.sessions) {
    // Assign trainer
    await prisma.session.update({
      where: { id: session.id },
      data: { trainerId: trainer.id }
    })

    // Send notification
    try {
      await this.notificationService.sendTrainerAssignmentNotification(session.id)
      console.log(`✅ Assignment notification sent to ${trainer.name}`)
    } catch (error) {
      console.error(`Error sending assignment notification to ${trainer.name}:`, error)
    }

    trainerIndex++
  }

  return assignments
}
```

#### **Prisma Schema** (Updated)
Location: `/backend/prisma/schema.prisma`

```prisma
enum NotificationType {
  TRAINER_REMINDER
  TRAINER_ASSIGNMENT        // ← NEW
  QUESTIONS_REQUEST
  FEEDBACK_REQUEST
  PARTICIPANT_EMAIL
  VOTING_INVITE
  SESSION_REMINDER
  SESSION_RESCHEDULE        // ← NEW (for reschedule notifications)
}
```

---

## 📧 Email Template

### **Subject**
```
New Session Assignment - [Roundtable Name]
```

### **Content**
```
Dear [Trainer Name],

You have been assigned to a new session!

SESSION DETAILS:
Session: X/10
Roundtable: [Roundtable Name]
Client: [Client Name]
Topic: [Topic Title]
Scheduled Date: [Date and Time]
Participants: [Count]

IMPORTANT DEADLINES:
📝 Submit Questions: By [Date] (7 days before session)
💭 Submit Feedback: By [Date] (1 day after session)

NEXT STEPS:
1. Login to your trainer portal: [URL]/trainer/profile
2. Review the session details and context
3. Prepare 3 questions for the session (at least 1 week before)
4. Conduct the session on the scheduled date
5. Submit individual feedback for all participants (within 1 day)

You will receive automated reminders for question submission and feedback.

If you have any questions or need to reschedule, please contact the coordinator.

Best regards,
The Maka Team
```

---

## 🧪 Testing

### **Prerequisites**
1. Database seeded with trainer data: `npm run db:seed`
2. Trainer user created: `npm run create:trainer-user`
3. Backend server running: `npm run dev`

### **Test Scenario 1: Manual Assignment**

**1. Assign trainer via API:**
```bash
curl -X PATCH http://localhost:5000/api/sessions/[SESSION_ID]/assign-trainer \
  -H "Content-Type: application/json" \
  -d '{"trainerId": "[TRAINER_ID]"}'
```

**2. Expected Result:**
- ✅ Trainer assigned to session
- ✅ Console log: "✅ Assignment notification sent to trainer for session [ID]"
- ✅ Notification created in database with type `TRAINER_ASSIGNMENT`
- ✅ In production: Email sent to trainer's email address

**3. Verify notification:**
```sql
SELECT * FROM notifications
WHERE type = 'TRAINER_ASSIGNMENT'
ORDER BY created_at DESC
LIMIT 1;
```

### **Test Scenario 2: Auto-Assignment**

**1. Auto-assign trainers via API:**
```bash
curl -X POST http://localhost:5000/api/sessions/[ROUNDTABLE_ID]/assign-trainers \
  -H "Content-Type: application/json"
```

**2. Expected Result:**
- ✅ All sessions (2-9) assigned to trainers using round-robin
- ✅ Console logs for each assignment: "✅ Assignment notification sent to [Trainer Name] for session X"
- ✅ Multiple notifications created in database (one per session)
- ✅ In production: Emails sent to all assigned trainers

**3. Verify notifications:**
```sql
SELECT trainer.name, COUNT(*) as assignments
FROM notifications n
JOIN sessions s ON n.session_id = s.id
JOIN trainers trainer ON s.trainer_id = trainer.id
WHERE n.type = 'TRAINER_ASSIGNMENT'
GROUP BY trainer.name;
```

### **Test Scenario 3: Schedule Sessions with Auto-Assign**

**1. Schedule sessions from frontend:**
- Navigate to roundtable details page
- Click "Schedule Sessions" button
- Fill in start date, frequency, duration
- Submit

**2. Then auto-assign trainers:**
- Use the auto-assign endpoint or UI (if implemented)

**3. Expected Result:**
- ✅ 10 sessions created with dates
- ✅ Trainers assigned to sessions 2-9
- ✅ Notifications sent to all assigned trainers

---

## 🔗 API Endpoints

### **1. Assign Trainer to Session**
```
PATCH /api/sessions/:id/assign-trainer
```

**Request Body:**
```json
{
  "trainerId": "trainer_id_here"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "session_id",
    "sessionNumber": 3,
    "scheduledAt": "2025-11-01T14:00:00.000Z",
    "trainer": {
      "name": "JEAN",
      "email": "jean@trainer.com"
    }
  }
}
```

**Side Effects:**
- ✅ Trainer assigned to session
- ✅ Notification sent to trainer's email

### **2. Auto-Assign Trainers to Roundtable**
```
POST /api/sessions/:roundtableId/assign-trainers
```

**Request Body:** None

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "sessionNumber": 2,
      "topic": "Effective Communication",
      "trainer": "JEAN",
      "sessionId": "session_id"
    },
    // ... more sessions
  ]
}
```

**Side Effects:**
- ✅ Trainers assigned to all sessions (2-9) using round-robin
- ✅ Notifications sent to all assigned trainers

---

## 🎯 User Workflow

### **Coordinator Workflow**

1. **Create Roundtable**: Add roundtable with client and participants
2. **Conduct Topic Voting**: Let participants vote on topics
3. **Finalize Topics**: Select top 8 topics
4. **Schedule Sessions**: Set start date and frequency (this creates 10 sessions)
5. **Assign Trainers**:
   - Option A: Manually assign trainers to specific sessions
   - Option B: Use auto-assign for quick setup
6. **Trainers Notified**: System automatically sends emails to assigned trainers

### **Trainer Workflow**

1. **Receive Email**: Get notification about new session assignment
2. **Review Details**: Check session date, topic, participant count
3. **Login to Portal**: Access trainer portal to see full session context
4. **Prepare Questions**: Submit 3 questions at least 7 days before session
5. **Conduct Session**: Lead the roundtable discussion
6. **Submit Feedback**: Provide individual feedback for each participant within 1 day

---

## 🚨 Error Handling

### **Notification Failures**
- Notification errors are caught and logged
- Session assignment still succeeds even if notification fails
- Prevents assignment failure due to email issues

**Example:**
```typescript
try {
  await notificationService.sendTrainerAssignmentNotification(id)
  console.log(`✅ Assignment notification sent`)
} catch (error) {
  console.error('Error sending notification:', error)
  // Assignment still successful, only notification failed
}
```

### **Missing Trainer**
- If trainerId is null, notification is skipped
- No error thrown, graceful handling

**Example:**
```typescript
if (!session?.trainer) return
// Notification only sent if trainer exists
```

---

## 📊 Database Schema

### **Notification Model**
```prisma
model Notification {
  id          String            @id @default(cuid())
  type        NotificationType  // TRAINER_ASSIGNMENT
  recipient   String            // Trainer email
  subject     String            // Email subject
  content     String            // Email body (text)
  status      NotificationStatus @default(PENDING)
  scheduledAt DateTime
  sentAt      DateTime?
  createdAt   DateTime          @default(now())
  updatedAt   DateTime          @updatedAt

  sessionId   String?
  session     Session?          @relation(fields: [sessionId], references: [id])
}
```

### **Query Examples**

**Find all trainer assignment notifications:**
```sql
SELECT * FROM notifications
WHERE type = 'TRAINER_ASSIGNMENT';
```

**Find notifications for specific trainer:**
```sql
SELECT * FROM notifications
WHERE type = 'TRAINER_ASSIGNMENT'
AND recipient = 'jean@trainer.com'
ORDER BY created_at DESC;
```

**Find unsent notifications:**
```sql
SELECT * FROM notifications
WHERE status = 'PENDING'
AND type = 'TRAINER_ASSIGNMENT';
```

---

## 🔄 Integration with Existing Systems

### **Automated Jobs**
The trainer notification system integrates with existing automated jobs:

- **09:00 Daily**: Trainer reminder emails (1 week before session)
- **10:00 Daily**: Question request emails
- **16:00 Daily**: Late question submission reminders
- **18:00 Daily**: Feedback request emails (day of session)
- **19:00 Daily**: Late feedback submission reminders

The assignment notification is **separate** from these automated reminders:
- **Assignment Notification**: Sent immediately when trainer is assigned (one-time)
- **Automated Reminders**: Sent on schedule based on session dates (recurring)

### **Trainer Portal**
- Trainers can access their portal at `/trainer/profile`
- Portal shows all assigned sessions
- Portal displays deadlines and action items
- Assignment notification includes direct link to portal

---

## 🎉 Benefits

1. **Instant Communication**: Trainers know immediately when assigned
2. **Clear Expectations**: Deadlines and requirements clearly communicated
3. **Reduced Coordination**: No manual email sending needed
4. **Better Planning**: Trainers have advance notice to prepare
5. **Professional**: Consistent, well-formatted notification emails
6. **Audit Trail**: All notifications logged in database
7. **Fail-Safe**: Assignment succeeds even if email fails

---

## 🔮 Future Enhancements

### **Potential Improvements**
- [ ] SMS notifications for urgent assignments
- [ ] Microsoft Teams integration for notifications
- [ ] Customizable email templates per client
- [ ] Notification preferences (email, SMS, Teams)
- [ ] Bulk notification for multiple assignments
- [ ] Notification history in trainer portal
- [ ] Resend notification option
- [ ] Read receipts for notifications

---

## ✅ Success Criteria

The trainer notification system is working correctly if:

✅ Notification sent when trainer manually assigned to session
✅ Notification sent for each trainer in auto-assignment
✅ Email contains all required session details
✅ Deadlines calculated correctly (questions: -7 days, feedback: +1 day)
✅ Portal link included in email
✅ Notification saved to database with correct type
✅ Console logs show successful notification sends
✅ System continues working if notification fails
✅ No duplicate notifications sent

---

**Implementation Status**: ✅ Complete and Ready for Testing

**Documentation Date**: October 15, 2025
**Implemented By**: Claude Code
**Related Docs**: TRAINER-PORTAL-TEST-GUIDE.md, AUTOMATION-GUIDE.md
