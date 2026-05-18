# Utenze e Flussi di Lavoro — ROUNDTABLES (Maka LMS)

Riferimento rapido in italiano per capire chi sono gli utenti della
piattaforma, cosa può fare ciascuno, e i flussi principali. La versione
tecnica/completa è in [`ASSESSMENT_WORKFLOW.md`](./ASSESSMENT_WORKFLOW.md).

---

## 1. Le 4 utenze in breve

| Utenza | Chi è | Come ottiene l'account |
|--------|-------|------------------------|
| **Learner** (Studente) | Persona che fa il test di placement e segue i corsi. Dipendente di un'azienda B2B o utente individuale. | Si registra da solo (`/register`), oppure è invitato/caricato da Maka |
| **HR / Org Admin** | Referente HR di un'azienda B2B (es. Inter, Mapei). Monitora i propri dipendenti. | Registra l'azienda (`/register/organization`), Maka approva l'account |
| **Maka Admin** | Staff di Maka Language Consulting (`training@makaitalia.com`). Controllo totale della piattaforma. | Creato internamente da Maka. **Non** registrabile dal pubblico |
| **Trainer** (Teacher) | Insegnante/revisore opzionale di writing e speaking. | Creato da Maka |

> **Una sola scuola**: ROUNDTABLES serve esclusivamente Maka Language
> Consulting. Le "organizzazioni" B2B (Inter, Mapei…) sono **clienti** di
> Maka, non scuole separate.

---

## 2. Cosa può fare ogni utenza

### 2.1 Learner

**Può fare:**
- Registrarsi da solo o accettare l'invito di Maka
- Compilare il questionario pre-test (skills, disponibilità, autovalutazione)
- Richiedere un test di placement (Inglese, Spagnolo, Francese, Tedesco, Italiano)
- Eseguire il test (4 sezioni, ~60 min realistici, ~50 min di timer)
- Mettere in pausa e riprendere
- Vedere i propri risultati (CEFR per skill + livello complessivo)
- Aggiornare il questionario pre-test in qualunque momento

**Non può fare:**
- Iniziare un test senza l'approvazione di Maka (se auto-richiesto)
- Rifare una sezione già completata (deve chiedere a Maka)
- Rifare un test completato (no retake lato learner)
- Vedere i risultati di altri learner

**Chi vede i suoi dati:**
- Maka admin (sempre)
- Il proprio HR se è learner B2B (read-only)

---

### 2.2 HR / Org Admin

**Può fare:**
- Vedere i learner della **propria azienda** (read-only)
- Vedere risultati dei test dei propri dipendenti (per skill + complessivo)
- Esportare report Excel/PDF dei propri dipendenti
- Gestire seat license e fatturazione della propria azienda
- Aggiornare il profilo della propria azienda

**Non può fare:**
- Invitare o rimuovere learner (lo fa Maka)
- Assegnare test di placement (lo fa Maka)
- Vedere learner o dati di **altre** aziende
- Approvare richieste di test

**Per richieste operative** (invitare/rimuovere/assegnare) → email a
`training@makaitalia.com`.

---

### 2.3 Maka Admin (`training@makaitalia.com`)

**Può fare:**
- **Gestire learner**: invitare uno alla volta, **caricare in bulk via Excel**, rimuovere
- **Gestire test**: assegnare placement test, approvare/rifiutare richieste self-started, vedere tutti i test di tutte le aziende
- **Esportare risultati**: XLSX con score per sezione e complessivo, PDF singoli
- **Gestire aziende**: vedere/modificare tutte le organizzazioni, approvare nuove registrazioni HR
- **Revisionare**: sovrascrivere lo score AI di writing/speaking
- **Configurare**: question bank, impostazioni test, pre-generazione audio TTS
- **Audit**: vedere il feed di attività cross-utente (chi ha fatto cosa)

**Non può fare:**
- (Praticamente nessun limite — è il super-admin della piattaforma)

**Riceve email su:**
- Nuova richiesta di test (approval needed)
- Nuova registrazione HR
- Nuovo learner registrato
- Test sospeso/cancellato
- Test completato (con report PDF allegato)

---

### 2.4 Trainer

**Può fare:**
- Vedere la coda di writing e speaking in attesa di revisione
- Inserire uno score finale che sovrascrive il punteggio AI

**Non può fare:**
- Vedere learner di corsi a cui non è assegnato
- Gestire aziende o invitare learner

> Ruolo opzionale: oggi la maggior parte dello scoring è automatica (AI +
> Whisper). Il trainer interviene solo per casi che richiedono giudizio umano.

---

## 3. Le relazioni — chi fa cosa a chi

```
┌─────────────────────────────────────────────────────────────────┐
│                       Maka Admin (training@)                    │
│                       super-utente di tutto                     │
└─────────────────────────────────────────────────────────────────┘
       │            │                  │                  │
       │ approva    │ invita/carica    │ approva HR       │ assegna/
       │ richieste  │ learner          │                  │ revisiona
       │ di test    │                  │                  │
       ▼            ▼                  ▼                  ▼
┌──────────────────────────┐   ┌──────────────────┐   ┌──────────┐
│   Learner (Studente)     │   │   HR / Org Admin │   │ Trainer  │
│                          │   │                  │   │          │
│ - fa il test             │◄──┤ - VEDE i propri  │   │ revisiona│
│ - vede i propri risultati│   │   learner        │   │ writing/ │
│ - aggiorna pre-test      │   │ - esporta report │   │ speaking │
└──────────────────────────┘   └──────────────────┘   └──────────┘
```

**Regola d'oro**: il flusso operativo è sempre **Maka → Learner**. HR
osserva ma non interviene. Il Trainer interviene solo sui contenuti
soggettivi (writing/speaking).

---

## 4. Flussi di lavoro principali

### Flow 1 — Onboarding di un singolo learner (B2B)

```
Maka (su /admin/organizations/[Azienda])
    ↓ click "Invite Learner"
    ↓ inserisce nome + email + livello iniziale (best guess)
    ↓
Backend crea User + Student + invia email con password temporanea
    ↓
Learner riceve email → /login → cambia password
    ↓
Learner vede /assessment ma deve prima compilare il pre-test
```

### Flow 2 — Onboarding bulk di un'azienda intera

```
Maka (su /admin/organizations/[Azienda])
    ↓ click "Bulk Upload"
    ↓ scarica template Excel
    ↓ riempie il file (first_name, last_name, email, language obbligatori
    ↓ + opzionali: phone, job_role, needs_speaking, needs_reading,
    ↓ needs_writing, confidence, comments)
    ↓ carica il file (drag-drop)
    ↓
Backend valida riga per riga, crea User + Student per ogni riga valida
    ↓
Email di invito inviate a ogni learner (checkbox attiva di default)
    ↓
Maka vede report: "X creati, Y skipped, Z errori" con dettaglio riga per riga
    ↓
Le righe con campi pre-test compilati saltano il gate del questionario
```

### Flow 3 — Richiesta self-started di un test di placement

```
Learner si logga → /assessment
    ↓
Se non ha completato il pre-test:
    → banner "Finish your pre-test questionnaire first"
    → click → /assessment/pretest → compila e salva
    ↓
Click "Request Test" sulla lingua scelta
    ↓
Backend crea Assessment(status=REQUESTED)
Maka riceve email "Placement Test Requested — Approval Needed"
    ↓
Maka apre /admin/test-requests
    ↓ vede nome, email, azienda, lingua del learner
    ↓ click "Approve" → modal di conferma con TUTTI i dati
    ↓ click "Approve" definitivo
    ↓
Backend: status REQUESTED → ASSIGNED
Email al learner "Your test is ready"
    ↓
Learner ricarica /assessment → card cambia da "Awaiting Approval" a "Begin Test"
```

### Flow 4 — Test assegnato direttamente da Maka (bypass approvazione)

```
Maka (su /admin/organizations/[Azienda])
    ↓ click "Assign Placement Test"
    ↓ seleziona learner + lingua
    ↓ click "Assign"
    ↓
Backend crea Assessment(status=ASSIGNED) — salta la coda di approvazione
    ↓
Email al learner "Your test is ready"
    ↓
Learner vede subito "Begin Test" sulla propria pagina /assessment
```

### Flow 5 — Esecuzione del test (lato learner)

```
Learner clicca "Begin Test" → /assessment/multi-skill/[id]
    ↓
Schermata di intro con istruzioni (EN + IT)
    ↓
Sezione 1: Reading & Language Use (18 min, 28 domande)
    ↓ timer parte; difficoltà adattiva (parte da A2)
    ↓ alla fine: punteggio + CEFR per skill calcolati
    ↓
Sezione 2: Listening (12 min, 10 domande)
    ↓ stesso pattern, audio TTS con voci diverse per speaker
    ↓
Sezione 3: Writing (10 min, 6 domande)
    ↓ risposte testuali → scoring AI in background
    ↓
Sezione 4: Speaking (10 min, 6 domande)
    ↓ registrazione audio → Whisper trascrive + AI scora
    ↓
Test completato → status COMPLETED
    ↓
Email a learner con risultati + email interna a training@ con PDF
```

**Recupero** in caso di problemi:
- Cambio tab: solo avviso, il test continua
- JWT scaduto: redirect a login, dopo login torna esattamente dove era
- Network blip: retry singolo dopo 1s

### Flow 6 — Revisione manuale (Trainer / Maka)

```
Test completato → Writing + Speaking hanno un aiScore ma non un finalScore
    ↓
Trainer (o Maka) apre /admin/review-queue
    ↓ vede tutte le sezioni in attesa
    ↓ apre una risposta, ascolta l'audio / legge il testo
    ↓ inserisce teacherScore
    ↓
Backend: finalScore = teacherScore (sovrascrive aiScore)
    ↓
Il CEFR complessivo viene ricalcolato
```

### Flow 7 — Registrazione di una nuova azienda HR

```
HR apre /register/organization
    ↓
Step 1: dati azienda (nome, settore, dimensione, ...)
Step 2: dati account admin (nome, email, password)
Step 3: dati fatturazione (opzionali, fattibili dopo)
    ↓
Submit → POST /auth/register/organization
Backend crea:
  - User(role=ORG_ADMIN, isActive=FALSE)
  - Organization
  - OrgAdmin (link User ↔ Organization)
Email a training@ "Organization Registration — Approval Needed"
    ↓
HR vede schermata "Registration received — awaiting approval"
    ↓
Maka apre /admin/org-requests
    ↓ vede dettagli azienda (settore, dimensione, sito, ...)
    ↓ click "Approve" (o "Deny" con motivo opzionale)
    ↓
Backend: User.isActive = TRUE
Email a HR "Your Maka LMS account is ready"
    ↓
HR si logga → redirect a /org/dashboard (vede solo la propria azienda)
```

### Flow 8 — Export risultati per HR

```
HR su /org/dashboard
    ↓ apre /org/assessments → vede tutti i test dei propri dipendenti
    ↓ apre /org/reports → export Excel o PDF
    ↓
Excel scaricato: una riga per learner, colonne per ogni skill
(Reading / Listening / Writing / Speaking) + livello complessivo
```

Oppure, lato Maka, sulla pagina `/admin/assessment-management`:

```
Maka filtra per azienda/lingua/status
    ↓ click "Export all completed" (oppure spunta singoli learner)
    ↓
File .xlsx con score per sezione + CEFR complessivo
```

---

## 5. Vincoli importanti da ricordare

- **Una sola scuola**: tutto appartiene a Maka. Le organizzazioni B2B sono clienti, non scuole.
- **Un solo super-admin**: solo `training@makaitalia.com` è ADMIN. Altri account Maka (info@, alessia@...) sono disattivati.
- **Isolamento tenant**: HR vede solo la propria azienda, garantito lato server (non solo UI).
- **No registrazione pubblica per ADMIN**: il form pubblico accetta solo TEACHER/STUDENT.
- **Pre-test obbligatorio** per test self-started; bypassato per test assegnati da Maka.
- **No gamification**: niente badge/streak/XP. Focus su placement + lesson planning reale.
- **Durata test**: ~50 min di timer + intro/transizioni ≈ ~60 min realistici (vedi `SECTION_CONFIG_V3` nel codice come fonte di verità).
- **Anti-cheating "soft"**: cambio tab = solo warning, copy/paste e tasto destro permessi (richiesta esplicita di Maka).

---

## 6. Dove ogni utenza trova le cose

| Vuoi… | Vai su… | Chi può accedere |
|-------|---------|------------------|
| Vedere i miei test | `/assessment` | Learner |
| Fare il questionario pre-test | `/assessment/pretest` | Learner |
| Continuare un test in pausa | `/assessment/multi-skill/[id]` | Learner |
| Vedere i learner della mia azienda | `/org/employees` | HR |
| Vedere i test dei miei dipendenti | `/org/assessments` | HR |
| Esportare report | `/org/reports` | HR |
| Approvare richieste di test | `/admin/test-requests` | Maka |
| Approvare nuove aziende HR | `/admin/org-requests` | Maka |
| Vedere/gestire tutti i learner | `/admin/users` (o per azienda) | Maka |
| Gestire un'azienda + invitare in bulk | `/admin/organizations/[id]` | Maka |
| Vedere tutti i test | `/admin/assessment-management` | Maka |
| Revisionare writing/speaking | `/admin/review-queue` | Maka / Trainer |
| Question bank | `/admin/assessment-questions` | Maka |
| Activity log cross-utente | `/admin/activity` | Maka |
