# Architettura Sistema Roundtable

## Overview

Sistema a 3 tier con architettura moderna e scalabile:

- **Frontend**: React SPA con TypeScript
- **Backend**: Node.js REST API con Express + TypeScript  
- **Database**: PostgreSQL con relazioni ottimizzate
- **Scheduler**: Job queue per automazioni
- **Email**: Sistema integrato per notifiche automatiche

## Backend Architecture

### Core Modules
```
/backend
  /src
    /controllers     # REST API endpoints
    /services        # Business logic
    /models          # Database models (Prisma ORM)
    /middleware      # Auth, validation, logging
    /jobs            # Scheduled tasks
    /utils           # Helpers, email templates
    /config          # Database, email configs
```

### Key Services
- **RoundtableService**: Gestione completa roundtable
- **NotificationService**: Email automatiche + Teams integration
- **SchedulerService**: Job scheduling per reminder
- **VotingService**: Sistema voting topic
- **FeedbackService**: Gestione feedback automatizzato

## Database Schema (PostgreSQL)

### Core Entities
```sql
Client → Roundtable → Session → Question/Feedback
     ↘           ↗ Participant
       Topic → Vote
```

### Key Relations
- Un **Client** può avere più **Roundtable**
- Un **Roundtable** ha sempre 10 **Session** + N **Participant**
- Ogni **Participant** vota 8 **Topic** sui 10 proposti
- Ogni **Session** ha 3 **Question** + **Feedback** per partecipante

## Frontend Architecture

### Component Structure
```
/frontend/src
  /components
    /common          # Button, Modal, Table
    /roundtable      # RoundtableCard, SessionCalendar
    /dashboard       # Stats, Charts, Controls
  /pages             # React Router pages  
  /hooks             # Custom hooks (API calls)
  /services          # API client
  /types             # TypeScript interfaces
```

### Key Pages
- **Dashboard**: Overview roundtable attivi
- **RoundtableDetail**: Gestione singolo roundtable
- **ParticipantManager**: Import/gestione partecipanti
- **SessionScheduler**: Calendario e assegnazioni trainer
- **NotificationCenter**: Controllo email/reminder

## Automation Workflows

### 1. Setup Roundtable
1. Carica partecipanti (Excel import)
2. Crea 10 topic proposti HR
3. Genera link voting per partecipanti
4. Setup calendario 10 sessioni

### 2. Pre-Session (1 settimana prima)
1. **Auto reminder** → Trainer via Teams/Email
2. **Raccolta domande** → Form online con deadline
3. **Approvazione** → Notifica Jean/Alessia
4. **Email gruppo** → Domande approvate + intro

### 3. Post-Session (giorno dopo)
1. **Auto reminder** → Trainer per feedback
2. **Review feedback** → Jean/Alessia dashboard
3. **Auto email** → Singoli feedback ai partecipanti

## Email Templates System

Template dinamici per ogni tipo di comunicazione:

- **pre_session.html**: Email con domande pre-sessione
- **feedback.html**: Email feedback individuale
- **reminder_trainer.html**: Reminder per trainer
- **voting_invite.html**: Invito al voting topic

## Technology Stack

- **Backend**: Node.js + Express + TypeScript
- **Database**: PostgreSQL + Prisma ORM  
- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Scheduler**: node-cron per job automatici
- **Email**: Nodemailer + template engine
- **Auth**: JWT tokens
- **Deployment**: Docker containers