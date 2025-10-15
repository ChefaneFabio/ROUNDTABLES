# 📊 Session 3-Column Design

## Overview
Nuovo design delle sessioni con 3 colonne separate per Status, Questions e Feedbacks.

**Data Implementazione**: 15 Ottobre 2025

---

## 🎯 Obiettivo

Separare lo stato generale della sessione dagli stati specifici di Questions e Feedbacks per:
1. ✅ Migliore tracciamento del workflow
2. ✅ Notifiche più precise
3. ✅ UI più chiara per coordinatori e trainer

---

## 📋 Le 3 Colonne

### **1. Colonna STATUS** (SessionStatus)
Stato generale della sessione

| Stato | Descrizione | Trigger |
|-------|-------------|---------|
| `SCHEDULED` | Sessione programmata | Default quando creata |
| `IN_PROGRESS` | Sessione in corso | Manuale/Automatico quando inizia |
| `COMPLETED` | Sessione completata | Manuale/Automatico quando finisce |
| `CANCELLED` | Sessione cancellata | Manuale |

---

### **2. Colonna QUESTIONS** (QuestionsStatus)
Workflow delle domande

| Stato | Descrizione | Trigger | Chi |
|-------|-------------|---------|-----|
| `NOT_REQUESTED` | Nessuna richiesta ancora | Default iniziale | Sistema |
| `REQUESTED_FROM_COORDINATOR` | Richiesta inviata al trainer | **Automatico 1 settimana prima** | Sistema |
| `SAVED_BY_TRAINER` | Trainer ha salvato le domande | Trainer clicca "Salva" | Trainer |
| `PENDING_APPROVAL` | In attesa approvazione | Trainer clicca "Submit" | Trainer |
| `SENT_TO_PARTICIPANTS` | Inviate ai partecipanti | **Manuale: Coordinator invia email** | Coordinator |

---

### **3. Colonna FEEDBACKS** (FeedbacksStatus)
Workflow dei feedback

| Stato | Descrizione | Trigger | Chi |
|-------|-------------|---------|-----|
| `NOT_REQUESTED` | Nessuna richiesta ancora | Default iniziale | Sistema |
| `REQUESTED_FROM_COORDINATOR` | Richiesta inviata al trainer | **Automatico dopo fine sessione** | Sistema |
| `SAVED_BY_TRAINER` | Trainer ha salvato feedback | Trainer clicca "Salva" | Trainer |
| `PENDING_APPROVAL` | In attesa approvazione | Trainer clicca "Submit" | Trainer |
| `SENT_TO_PARTICIPANTS` | Inviati ai partecipanti | **Manuale: Coordinator invia email** | Coordinator |

---

## 🔄 Workflow Completo

### **Timeline Sessione**

```
T-7 giorni (1 settimana prima)
├─ AUTOMATICO: questionsStatus → REQUESTED_FROM_COORDINATOR
├─ AUTOMATICO: Notifica inviata al trainer (10:00)
└─ Trainer riceve email reminder

T-6 giorni → T-1 giorno
├─ AUTOMATICO: Notifiche ripetute OGNI GIORNO (09:00)
├─ Trainer salva domande → questionsStatus: SAVED_BY_TRAINER
└─ ✅ Notifiche si fermano IMMEDIATAMENTE quando salva

Trainer Submit Questions
├─ Trainer clicca "Submit for Approval"
└─ questionsStatus → PENDING_APPROVAL

Coordinator Approva
├─ Coordinator rivede domande
└─ questionsStatus → Rimane PENDING_APPROVAL

Coordinator Invia
├─ Coordinator clicca "Send to Participants"
├─ questionsStatus → SENT_TO_PARTICIPANTS
└─ Email inviate ai learner

T=0 (Giorno sessione)
├─ status → IN_PROGRESS (quando inizia)
└─ Sessione si svolge

T=0 (Fine sessione)
├─ status → COMPLETED
├─ AUTOMATICO: feedbacksStatus → REQUESTED_FROM_COORDINATOR
└─ AUTOMATICO: Notifica inviata al trainer

T+1 giorno
├─ Trainer salva feedback → feedbacksStatus: SAVED_BY_TRAINER
└─ Trainer submit → feedbacksStatus: PENDING_APPROVAL

Coordinator Approva e Invia
├─ Coordinator rivede feedback
├─ Coordinator clicca "Send to Participants"
├─ feedbacksStatus → SENT_TO_PARTICIPANTS
└─ Email inviate ai partecipanti
```

---

## 🔔 Sistema Notifiche

### **Notifiche Questions**

#### **1. Richiesta Iniziale (T-7 giorni)**
```
Trigger: Automatico quando questionsStatus → REQUESTED_FROM_COORDINATOR
Frequenza: Una volta
Quando: 1 settimana prima sessione
```

#### **2. Reminder GIORNALIERI (Ogni Giorno)**
```
Trigger: questionsStatus = REQUESTED_FROM_COORDINATOR
Frequenza: OGNI GIORNO (09:00)
Quando: Fino a quando trainer salva
Stop: Quando questionsStatus → SAVED_BY_TRAINER (o superiore)
```

**Esempio:**
```
Lunedì T-7:  📧 Richiesta iniziale
Martedì T-6: ⚠️ Reminder giornaliero (se non salvato)
Mercoledì T-5: ⚠️ Reminder giornaliero (se non salvato)
Giovedì T-4: ⚠️ Reminder giornaliero (se non salvato)
Giovedì sera: Trainer salva domande
Venerdì T-3: ✅ Nessuna notifica (salvato!)
```

**IMPORTANTE:**
- Notifiche vengono inviate OGNI GIORNO alle 09:00
- Si fermano IMMEDIATAMENTE quando trainer clicca "Salva"
- Ogni sessione ha tracking indipendente
- Se trainer salva Session 3, continua a ricevere per Session 5 (se richieste)

---

### **Notifiche Feedbacks**

#### **1. Richiesta Feedback (T+0)**
```
Trigger: Automatico quando feedbacksStatus → REQUESTED_FROM_COORDINATOR
Frequenza: Una volta
Quando: Subito dopo fine sessione (stesso giorno)
```

#### **2. Reminder GIORNALIERI Feedbacks**
```
Trigger: feedbacksStatus = REQUESTED_FROM_COORDINATOR
Frequenza: OGNI GIORNO (18:00)
Quando: Dal giorno dopo sessione fino a quando salva
Stop: Quando feedbacksStatus → SAVED_BY_TRAINER (o superiore)
```

**Esempio:**
```
Venerdì 17 Oct:  Sessione si svolge
Venerdì 18:00:  📧 Richiesta feedback
Sabato 18:00:   ⚠️ Reminder giornaliero (se non salvato)
Domenica 18:00: ⚠️ Reminder giornaliero (se non salvato)
Lunedì 10:00:   Trainer salva feedback
Lunedì 18:00:   ✅ Nessuna notifica (salvato!)
```

**IMPORTANTE:**
- Feedback reminders ogni giorno alle 18:00
- Si fermano quando trainer salva
- Tracking per-session indipendente

---

## 💾 Database Schema

### **Session Model**

```prisma
model Session {
  id              String              @id @default(cuid())
  sessionNumber   Int
  scheduledAt     DateTime

  // LE 3 COLONNE
  status          SessionStatus       @default(SCHEDULED)
  questionsStatus QuestionsStatus     @default(NOT_REQUESTED)
  feedbacksStatus FeedbacksStatus     @default(NOT_REQUESTED)

  // ... altri campi
}
```

### **Enums**

```prisma
enum SessionStatus {
  SCHEDULED
  IN_PROGRESS
  COMPLETED
  CANCELLED
}

enum QuestionsStatus {
  NOT_REQUESTED
  REQUESTED_FROM_COORDINATOR
  SAVED_BY_TRAINER
  PENDING_APPROVAL
  SENT_TO_PARTICIPANTS
}

enum FeedbacksStatus {
  NOT_REQUESTED
  REQUESTED_FROM_COORDINATOR
  SAVED_BY_TRAINER
  PENDING_APPROVAL
  SENT_TO_PARTICIPANTS
}
```

---

## 🎨 UI Design

### **Trainer Portal**

**Session Card:**
```
┌─────────────────────────────────────────────────┐
│ Session 3/10                                    │
│ Motivating the Team                             │
│                                                 │
│ Status:    🟢 SCHEDULED                         │
│ Questions: 🟡 REQUESTED_FROM_COORDINATOR        │
│ Feedbacks: ⚪ NOT_REQUESTED                     │
│                                                 │
│ Oct 17, 2025 at 2:00 PM                        │
│                                                 │
│ [Save Questions] [Submit for Approval]          │
└─────────────────────────────────────────────────┘
```

**Questions States:**
- ⚪ NOT_REQUESTED - Grigio
- 🟡 REQUESTED_FROM_COORDINATOR - Giallo (action required)
- 🔵 SAVED_BY_TRAINER - Blu (salvato localmente)
- 🟣 PENDING_APPROVAL - Viola (in attesa)
- 🟢 SENT_TO_PARTICIPANTS - Verde (completato)

---

### **Coordinator Portal**

**Sessions Table:**
```
| Session | Status      | Questions               | Feedbacks              | Actions |
|---------|-------------|-------------------------|------------------------|---------|
| 1/10    | COMPLETED   | SENT_TO_PARTICIPANTS   | SENT_TO_PARTICIPANTS   | View    |
| 2/10    | COMPLETED   | SENT_TO_PARTICIPANTS   | PENDING_APPROVAL       | Review  |
| 3/10    | SCHEDULED   | SAVED_BY_TRAINER       | NOT_REQUESTED          | Review  |
| 4/10    | SCHEDULED   | REQUESTED_FROM_COORD   | NOT_REQUESTED          | -       |
```

---

## 🔧 API Endpoints

### **Trainer - Save Questions (NEW)**
```
POST /api/trainers/me/sessions/:id/questions/save
Body: {
  questions: [
    { question: "Q1" },
    { question: "Q2" },
    { question: "Q3" }
  ]
}
```

**Behavior:**
- Salva domande in database
- questionsStatus → SAVED_BY_TRAINER
- **NON invia notifica al coordinator**
- **FERMA le notifiche GIORNALIERE per questa sessione**
- Trainer può modificare le domande in seguito

---

### **Trainer - Submit Questions**
```
POST /api/trainers/me/sessions/:id/questions/submit
Body: {
  questions: [
    { question: "Q1" },
    { question: "Q2" },
    { question: "Q3" }
  ]
}
```

**Behavior:**
- Salva domande in database
- questionsStatus → PENDING_APPROVAL
- **Invia notifica al coordinator**

---

### **Coordinator - Send Questions**
```
POST /api/sessions/:id/questions/send
```

**Behavior:**
- questionsStatus → SENT_TO_PARTICIPANTS
- Invia email ai partecipanti
- Log audit

---

### **Trainer - Save Feedbacks (NEW)**
```
POST /api/trainers/me/sessions/:id/feedback/save
Body: {
  feedbacks: [
    { participantId: "...", content: "..." },
    ...
  ]
}
```

**Behavior:**
- Salva feedback in database
- feedbacksStatus → SAVED_BY_TRAINER
- **NON invia notifica al coordinator**
- **FERMA le notifiche GIORNALIERE per questa sessione**
- Trainer può modificare i feedback in seguito

---

### **Trainer - Submit Feedbacks**
```
POST /api/trainers/me/sessions/:id/feedback/submit
Body: {
  feedbacks: [...]
}
```

**Behavior:**
- Salva feedback in database
- feedbacksStatus → PENDING_APPROVAL
- **Invia notifica al coordinator**

---

### **Coordinator - Send Feedbacks**
```
POST /api/sessions/:id/feedback/send
```

**Behavior:**
- feedbacksStatus → SENT_TO_PARTICIPANTS
- Invia email ai partecipanti individuali
- Log audit

---

## 🤖 Automated Jobs

### **Job 1: Request Questions (Daily 10:00)**
```javascript
// Runs: Every day at 10:00
// Purpose: Check if any session is 7 days away and needs questions

sessions.filter(s =>
  s.questionsStatus === NOT_REQUESTED &&
  daysUntil(s.scheduledAt) === 7
).forEach(session => {
  session.questionsStatus = REQUESTED_FROM_COORDINATOR
  sendInitialQuestionRequest(session.trainer, session)
})
```

### **Job 2: Daily Questions Reminders (Every Day 09:00)**
```javascript
// Runs: Every day at 09:00
// Purpose: Send reminder for EVERY session that needs questions

sessions.filter(s =>
  s.questionsStatus === REQUESTED_FROM_COORDINATOR &&
  s.scheduledAt > today
).forEach(session => {
  sendDailyQuestionReminder(session.trainer, session)
  // Notification includes: session number, topic, days remaining
})

// STOPS when questionsStatus changes to SAVED_BY_TRAINER or higher
```

### **Job 3: Request Feedback (Hourly check)**
```javascript
// Runs: Every hour
// Purpose: Auto-request feedback when session completes

sessions.filter(s =>
  s.status === COMPLETED &&
  s.feedbacksStatus === NOT_REQUESTED &&
  s.scheduledAt < now
).forEach(session => {
  session.feedbacksStatus = REQUESTED_FROM_COORDINATOR
  sendInitialFeedbackRequest(session.trainer, session)
})
```

### **Job 4: Daily Feedback Reminders (Every Day 18:00)**
```javascript
// Runs: Every day at 18:00
// Purpose: Send reminder for EVERY session that needs feedback

sessions.filter(s =>
  s.feedbacksStatus === REQUESTED_FROM_COORDINATOR &&
  s.status === COMPLETED
).forEach(session => {
  sendDailyFeedbackReminder(session.trainer, session)
  // Notification includes: session number, topic, days since session
})

// STOPS when feedbacksStatus changes to SAVED_BY_TRAINER or higher
```

### **Summary:**
- **10:00**: Check for sessions 7 days away → Request questions
- **09:00**: Send reminders for ALL pending questions
- **Hourly**: Auto-request feedback for completed sessions
- **18:00**: Send reminders for ALL pending feedbacks

---

## ✅ Vantaggi del Nuovo Sistema

### **1. Chiarezza**
- 3 colonne separate = workflow chiaro
- Ogni stato ha significato preciso
- Facile capire cosa manca

### **2. Notifiche Precise e Giornaliere**
- **DAILY reminders** finché trainer non salva
- Stop **IMMEDIATO** quando trainer salva
- Tracking **per-session** indipendente
- Nessun spam (ferma subito dopo salvataggio)

### **3. Flessibilità**
- Trainer può salvare senza submit
- Coordinator controlla prima di inviare
- Workflow adattabile

### **4. Audit Trail**
- Tutti i cambiamenti tracciati
- Chiaro chi ha fatto cosa
- Facile debug

---

## 🔮 Scenario Examples

### **Scenario 1: Trainer Proattivo**
```
T-7 (Lunedì):    Sistema richiede domande (10:00)
T-6 (Martedì):   📧 Reminder giornaliero (09:00)
T-6 (Martedì):   Trainer salva domande (pomeriggio)
                 → questionsStatus: SAVED_BY_TRAINER
                 → ✅ Notifiche giornaliere fermano
T-5 (Mercoledì): Nessuna notifica (già salvato!)
T-4 (Giovedì):   Trainer rivede e modifica
T-3 (Venerdì):   Trainer submit per approvazione
                 → questionsStatus: PENDING_APPROVAL
T-2 (Sabato):    Coordinator approva
T-1 (Domenica):  Coordinator invia ai partecipanti
                 → questionsStatus: SENT_TO_PARTICIPANTS
T=0 (Lunedì):    Sessione si svolge
```

### **Scenario 2: Trainer in Ritardo**
```
T-7 (Lunedì):    Sistema richiede domande (10:00)
T-6 (Martedì):   📧 Reminder giornaliero (09:00) - nessuna azione
T-5 (Mercoledì): 📧 Reminder giornaliero (09:00) - nessuna azione
T-4 (Giovedì):   📧 Reminder giornaliero (09:00) - nessuna azione
T-3 (Venerdì):   📧 Reminder giornaliero (09:00) - nessuna azione
T-2 (Sabato):    📧 Reminder giornaliero (09:00)
T-2 (Sabato):    Trainer finalmente salva (sera)
                 → questionsStatus: SAVED_BY_TRAINER
                 → ✅ Notifiche fermano
T-1 (Domenica):  Nessuna notifica (salvato!)
T-1 (Domenica):  Trainer submit urgente
                 → questionsStatus: PENDING_APPROVAL
T-1 (Domenica):  Coordinator approva e invia urgente
T=0 (Lunedì):    Sessione si svolge
```

### **Scenario 3: Coordinator Blocca**
```
T-7: Sistema richiede domande
T-5: Trainer submit domande
     → questionsStatus: PENDING_APPROVAL
T-4: Coordinator rivede: "Domande non chiare"
T-4: Coordinator richiede revisione
     → questionsStatus: NEEDS_REVISION (future)
T-3: Trainer modifica e re-submit
T-2: Coordinator approva
T-1: Coordinator invia
T=0: Sessione si svolge
```

---

## 📊 Migration Plan

### **Step 1: Update Schema**
✅ Add questionsStatus and feedbacksStatus columns
✅ Create new enums

### **Step 2: Data Migration**
- [ ] Map old SessionStatus to new 3-column structure
- [ ] Update existing sessions

### **Step 3: Update Backend**
- [ ] Update controllers (trainer + coordinator)
- [ ] Add save endpoints (not submit)
- [ ] Update automated jobs

### **Step 4: Update Frontend**
- [ ] Add 3 columns display
- [ ] Add "Save" buttons (separate from "Submit")
- [ ] Update status badges

### **Step 5: Testing**
- [ ] Test save vs submit
- [ ] Test weekly notifications
- [ ] Test stop notifications when saved

---

**Status**: ✅ Schema Ready - Migration Pending
**Date**: 15 Ottobre 2025
**Next Steps**: Create migration and update backend logic
