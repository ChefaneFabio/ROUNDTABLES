# 🧪 Testing del Sistema Roundtable

## Setup Rapido

### 1. Database Setup
```bash
# Installa PostgreSQL se non presente
# Windows: Scarica da postgresql.org
# Mac: brew install postgresql
# Ubuntu: sudo apt install postgresql

# Crea database
createdb roundtables

# Copia configurazione
cd backend
cp .env.example .env
# Modifica DATABASE_URL in .env
```

### 2. Installa Dipendenze
```bash
# Backend
cd backend
npm install

# Frontend  
cd ../frontend
npm install

# Root (per sviluppo concorrente)
cd ..
npm install
```

### 3. Database Migration
```bash
cd backend
npx prisma generate
npx prisma db push
```

### 4. Test Setup
```bash
# Crea dati di test
cd backend
npx tsx src/test-setup.ts
```

## 🎯 Test Disponibili

### **Test 1: API Endpoints**
```bash
# Avvia backend
cd backend && npm run dev

# Test endpoints (nuovo terminale)
curl http://localhost:5000/health
curl http://localhost:5000/api/clients
```

### **Test 2: Voting System** 
Il test setup crea un URL di voting:
```
http://localhost:3000/vote/[roundtable-id]?email=giulia.ferrari@fastweb.it
```

### **Test 3: Email Templates**
```bash
cd backend
npx tsx -e "
import { EmailTemplateService } from './src/services/EmailTemplateService';
const service = new EmailTemplateService();
service.renderTemplate('trainer_reminder', {
  trainerName: 'Jean',
  sessionDate: '2024-01-15'
}).then(r => console.log(r.subject));
"
```

### **Test 4: Job Scheduler**
```bash
# Il scheduler si avvia automaticamente con il backend
# Verifica logs per:
# 🕐 Job scheduler initialized
# 🔔 Checking for trainer reminders...
```

## 📊 Dashboard Test

### **Dati di Test Creati:**
- ✅ 1 Cliente (Fastweb)
- ✅ 1 Roundtable (Leadership Skills) 
- ✅ 4 Partecipanti attivi
- ✅ 3 Trainer disponibili
- ✅ 10 Topic per voting

### **Flusso Completo Testabile:**
1. **Setup** ✅ (già fatto)
2. **Voting** 🗳️ (URL generato)
3. **Scheduling** 📅 (API ready)
4. **Notifiche** 📧 (Templates ready)
5. **Dashboard** 📊 (Endpoint ready)

## 🚀 Quick Start Commands

```bash
# Avvia tutto in sviluppo
npm run dev

# Solo backend
cd backend && npm run dev

# Solo frontend  
cd frontend && npm run dev

# Reset database
cd backend && npx tsx -e "
import { cleanupTestData } from './src/test-setup';
cleanupTestData().then(() => console.log('✅ Cleaned'));
"
```

## 🔍 API Test Endpoints

```bash
# Health check
curl http://localhost:5000/health

# Clients
curl http://localhost:5000/api/clients

# Roundtables
curl http://localhost:5000/api/roundtables

# Voting data
curl "http://localhost:5000/api/topics/vote/[ID]?email=test@test.com"

# Sessions
curl http://localhost:5000/api/sessions/upcoming

# Questions dashboard  
curl http://localhost:5000/api/questions/dashboard
```

## 📧 Email Preview

I template email sono in `/templates/email/`:
- `trainer_reminder.html` - Reminder per trainer
- `pre_session.html` - Email pre-sessione con domande  
- `feedback.html` - Feedback individuale
- `voting_invite.html` - Invito al voting

**Sistema pronto per test end-to-end!** 🎉