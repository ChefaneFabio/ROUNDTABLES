# 🔔 Daily Notifications System - Complete Specification

**Date**: 15 Ottobre 2025
**Status**: Design Approved - Implementation Pending

---

## 📋 Overview

Sistema di notifiche **GIORNALIERE** per trainers con stop automatico quando salvano domande/feedback per una specifica sessione.

---

## 🎯 Key Requirements

1. ✅ Notifiche inviate **OGNI GIORNO** (non settimanali)
2. ✅ Notifiche si fermano **IMMEDIATAMENTE** quando trainer salva
3. ✅ Tracking **per-session** indipendente
4. ✅ Trainer può salvare senza submit (no notifica coordinator)

---

## 📊 Notification Schedule

### **Questions Reminders**
```
Time: Every day at 09:00
Target: Sessions with questionsStatus = REQUESTED_FROM_COORDINATOR
Stop: When questionsStatus changes to SAVED_BY_TRAINER or higher
```

### **Feedbacks Reminders**
```
Time: Every day at 18:00
Target: Sessions with feedbacksStatus = REQUESTED_FROM_COORDINATOR
Stop: When feedbacksStatus changes to SAVED_BY_TRAINER or higher
```

---

## 🔄 Complete Workflow

### **Questions Workflow**

#### **T-7 Days (10:00)**
```
Job: Daily Questions Request
Action: Check sessions 7 days away
If questionsStatus = NOT_REQUESTED:
  → Set questionsStatus = REQUESTED_FROM_COORDINATOR
  → Send initial request email
```

#### **Every Day (09:00) - Until Saved**
```
Job: Daily Questions Reminders
Query: SELECT * FROM sessions WHERE
       questionsStatus = 'REQUESTED_FROM_COORDINATOR' AND
       scheduledAt > NOW()

For each session:
  → Send reminder email with:
    - Session number & topic
    - Days remaining until session
    - "Save Questions" button link
```

#### **When Trainer Saves**
```
Endpoint: POST /api/trainers/me/sessions/:id/questions/save
Action:
  1. Save questions to database
  2. Set questionsStatus = SAVED_BY_TRAINER
  3. ✅ AUTOMATIC STOP - No more daily reminders for THIS session
  4. Trainer can still edit questions before submitting
```

#### **When Trainer Submits**
```
Endpoint: POST /api/trainers/me/sessions/:id/questions/submit
Action:
  1. Save/update questions
  2. Set questionsStatus = PENDING_APPROVAL
  3. Send notification to coordinator
  4. ✅ No more reminders (already saved/submitted)
```

---

### **Feedbacks Workflow**

#### **When Session Completes (Hourly Check)**
```
Job: Auto-Request Feedbacks
Query: SELECT * FROM sessions WHERE
       status = 'COMPLETED' AND
       feedbacksStatus = 'NOT_REQUESTED' AND
       scheduledAt < NOW()

For each session:
  → Set feedbacksStatus = REQUESTED_FROM_COORDINATOR
  → Send initial feedback request
```

#### **Every Day (18:00) - Until Saved**
```
Job: Daily Feedback Reminders
Query: SELECT * FROM sessions WHERE
       feedbacksStatus = 'REQUESTED_FROM_COORDINATOR' AND
       status = 'COMPLETED'

For each session:
  → Send reminder email with:
    - Session number & topic
    - Days since session
    - "Save Feedback" button link
```

#### **When Trainer Saves**
```
Endpoint: POST /api/trainers/me/sessions/:id/feedback/save
Action:
  1. Save feedback to database
  2. Set feedbacksStatus = SAVED_BY_TRAINER
  3. ✅ AUTOMATIC STOP - No more daily reminders for THIS session
  4. Trainer can still edit feedback before submitting
```

#### **When Trainer Submits**
```
Endpoint: POST /api/trainers/me/sessions/:id/feedback/submit
Action:
  1. Save/update feedback
  2. Set feedbacksStatus = PENDING_APPROVAL
  3. Send notification to coordinator
  4. ✅ No more reminders (already saved/submitted)
```

---

## 🎯 Per-Session Independence

### **Critical Behavior:**

Each session has **independent** tracking:

**Example:**
```
Session 3:
  - questionsStatus = SAVED_BY_TRAINER
  - ✅ NO notifications for Session 3

Session 5:
  - questionsStatus = REQUESTED_FROM_COORDINATOR
  - ⚠️ STILL receives daily notifications

→ Saving Session 3 does NOT affect Session 5 notifications!
```

---

## 📧 Email Templates

### **Daily Questions Reminder**
```
Subject: Daily Reminder: Questions Needed for Session {sessionNumber}

Dear {trainerName},

This is your daily reminder to submit questions for:

Session: {sessionNumber}/10
Topic: {topicTitle}
Scheduled: {scheduledAt}
Days Remaining: {daysUntil}

ACTION REQUIRED:
Please save your 3 questions as soon as possible.

Once you save, these daily reminders will stop automatically for this session.

[Save Questions Now] → {portalLink}

---
To stop these reminders, simply save your questions in the portal.
Even if you're not ready to submit for approval, saving will pause notifications.
```

### **Daily Feedback Reminder**
```
Subject: Daily Reminder: Feedback Needed for Session {sessionNumber}

Dear {trainerName},

This is your daily reminder to submit feedback for:

Session: {sessionNumber}/10
Topic: {topicTitle}
Completed: {scheduledAt}
Days Since Session: {daysSince}

ACTION REQUIRED:
Please save feedback for all {participantCount} participants.

Once you save, these daily reminders will stop automatically for this session.

[Save Feedback Now] → {portalLink}

---
To stop these reminders, simply save your feedback in the portal.
Even if you're not ready to submit for approval, saving will pause notifications.
```

---

## 🤖 Cron Jobs Implementation

### **Job 1: Daily Questions Request**
```javascript
// Schedule: 0 10 * * * (Every day at 10:00)
cron.schedule('0 10 * * *', async () => {
  const sevenDaysFromNow = addDays(new Date(), 7)

  const sessions = await prisma.session.findMany({
    where: {
      questionsStatus: 'NOT_REQUESTED',
      scheduledAt: {
        gte: startOfDay(sevenDaysFromNow),
        lte: endOfDay(sevenDaysFromNow)
      }
    },
    include: { trainer: true, topic: true, roundtable: true }
  })

  for (const session of sessions) {
    await prisma.session.update({
      where: { id: session.id },
      data: { questionsStatus: 'REQUESTED_FROM_COORDINATOR' }
    })

    await notificationService.sendQuestionRequest(session)
  }
})
```

### **Job 2: Daily Questions Reminders**
```javascript
// Schedule: 0 9 * * * (Every day at 09:00)
cron.schedule('0 9 * * *', async () => {
  const sessions = await prisma.session.findMany({
    where: {
      questionsStatus: 'REQUESTED_FROM_COORDINATOR',
      scheduledAt: { gt: new Date() }
    },
    include: { trainer: true, topic: true, roundtable: true }
  })

  for (const session of sessions) {
    const daysUntil = differenceInDays(session.scheduledAt, new Date())
    await notificationService.sendDailyQuestionReminder(session, daysUntil)
  }
})
```

### **Job 3: Auto-Request Feedbacks**
```javascript
// Schedule: 0 * * * * (Every hour)
cron.schedule('0 * * * *', async () => {
  const sessions = await prisma.session.findMany({
    where: {
      status: 'COMPLETED',
      feedbacksStatus: 'NOT_REQUESTED',
      scheduledAt: { lt: new Date() }
    },
    include: { trainer: true, topic: true, roundtable: true }
  })

  for (const session of sessions) {
    await prisma.session.update({
      where: { id: session.id },
      data: { feedbacksStatus: 'REQUESTED_FROM_COORDINATOR' }
    })

    await notificationService.sendFeedbackRequest(session)
  }
})
```

### **Job 4: Daily Feedback Reminders**
```javascript
// Schedule: 0 18 * * * (Every day at 18:00)
cron.schedule('0 18 * * *', async () => {
  const sessions = await prisma.session.findMany({
    where: {
      status: 'COMPLETED',
      feedbacksStatus: 'REQUESTED_FROM_COORDINATOR'
    },
    include: { trainer: true, topic: true, roundtable: true }
  })

  for (const session of sessions) {
    const daysSince = differenceInDays(new Date(), session.scheduledAt)
    await notificationService.sendDailyFeedbackReminder(session, daysSince)
  }
})
```

---

## ✅ Implementation Checklist

### **Backend**
- [ ] Add `POST /api/trainers/me/sessions/:id/questions/save` endpoint
- [ ] Add `POST /api/trainers/me/sessions/:id/feedback/save` endpoint
- [ ] Update scheduler.ts with 4 cron jobs
- [ ] Add notification service methods:
  - `sendQuestionRequest()`
  - `sendDailyQuestionReminder()`
  - `sendFeedbackRequest()`
  - `sendDailyFeedbackReminder()`
- [ ] Test status transitions
- [ ] Test notification stops when saved

### **Frontend**
- [ ] Add "Save Questions" button (separate from "Submit")
- [ ] Add "Save Feedback" button (separate from "Submit")
- [ ] Show 3-column status display
- [ ] Visual indicators for pending actions
- [ ] Update trainer portal with new workflow

### **Testing**
- [ ] Test daily questions reminder (09:00)
- [ ] Test daily feedback reminder (18:00)
- [ ] Test notification stops after save
- [ ] Test per-session independence
- [ ] Test re-editing after save
- [ ] Test submit after save

---

## 📊 Expected Behavior Examples

### **Example 1: Proactive Trainer**
```
Monday T-7 10:00:    Initial request sent
Tuesday T-6 09:00:   Daily reminder #1
Tuesday T-6 14:00:   Trainer saves → STOP
Wednesday T-5:       No notification (saved!)
Thursday T-4:        No notification (saved!)
Friday T-3:          Trainer submits for approval
```
**Result**: Only 1 reminder needed! ✅

### **Example 2: Late Trainer**
```
Monday T-7 10:00:    Initial request
Tuesday T-6 09:00:   Daily reminder #1
Wednesday T-5 09:00: Daily reminder #2
Thursday T-4 09:00:  Daily reminder #3
Friday T-3 09:00:    Daily reminder #4
Saturday T-2 09:00:  Daily reminder #5
Saturday T-2 20:00:  Trainer finally saves → STOP
Sunday T-1:          No notification (saved!)
```
**Result**: 5 reminders until save ⚠️

### **Example 3: Multiple Sessions**
```
Session 3:
  Monday 09:00: Reminder (questionsStatus = REQUESTED)
  Monday 14:00: Trainer saves Session 3 → STOP for Session 3

Session 5:
  Monday 09:00: Reminder (questionsStatus = REQUESTED)
  Tuesday 09:00: Reminder (still not saved)
  Wednesday 09:00: Reminder (still not saved)
  Wednesday 16:00: Trainer saves Session 5 → STOP for Session 5
```
**Result**: Independent tracking works! ✅

---

## 🎯 Success Criteria

1. ✅ Notifications sent EVERY day (not weekly)
2. ✅ Notifications stop IMMEDIATELY after save
3. ✅ Each session tracked independently
4. ✅ Trainer can save without submitting
5. ✅ Trainer can edit after saving
6. ✅ No spam (stops right after save)
7. ✅ Clear indication in UI of pending actions

---

**Status**: Design Complete ✅
**Next**: Implement backend endpoints and cron jobs
**Priority**: HIGH - Core workflow feature
