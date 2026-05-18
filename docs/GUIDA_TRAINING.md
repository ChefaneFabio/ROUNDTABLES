# Guida training@makaitalia.com

Riepilogo pratico di cosa puoi fare sulla piattaforma ROUNDTABLES e dove
trovi ogni cosa. Pensato come reference rapido — quando hai un dubbio,
cerca qui prima di scrivere a Fabio.

> **Ruolo:** sei Maka Admin. Hai accesso totale a tutto: ogni learner,
> ogni azienda, ogni test. Le HR vedono solo la propria azienda; tu vedi
> tutto.

---

## 1. La tua giornata tipo

Il flusso più frequente è uno di questi due:

### A. Onboardare un'azienda B2B

```
1. /admin/organizations           → vedi tutte le aziende
2. clicca azienda specifica       → /admin/organizations/[id]
3. "Bulk Upload"                  → carichi roster Excel (template scaricabile)
4. Quick Assign nel popup risult. → 1 click → tutti i nuovi learner hanno il test
```

### B. Controllare lo stato dei test in corso

```
1. /admin/assessment-management   → vedi tutti i test (live + completati)
2. la barra sotto le pillole R/L/W/S si aggiorna ogni 15s
3. hover sulla pillola → tooltip con "5/10 questions · 6m elapsed"
4. clicca "Results" → dettaglio completo del singolo test
```

---

## 2. Mappa delle pagine

### People — chi è sulla piattaforma

| Pagina | Cosa fai qui |
|--------|--------------|
| `/admin/users` | Vedi tutti gli utenti (admin, teacher, learner, HR) |
| `/students` (Learners) | Lista globale dei learner, search, filtro per livello |
| `/admin/students/[id]/assessments` | Storico test di UNO specifico learner + progresso nel tempo |
| `/teachers` | Lista trainer |
| `/admin/organizations` | Lista aziende B2B |
| `/admin/organizations/[id]` | Dettaglio azienda: learner, ultimo test di ciascuno, bulk upload, assign test |

### Test e risultati

| Pagina | Cosa fai qui |
|--------|--------------|
| `/admin/assessment-management` | **La pagina centrale per i test**. Tutti i test, search per nome, filtri lingua/status, progress bar live, export XLSX, download PDF test |
| `/assessment/multi-skill/[id]/results` | Dettaglio risultato singolo (CEFR per skill, score, tempo, risposte) |
| `/admin/test-requests` | Coda richieste test (vuota nella maggior parte dei casi — l'approvazione è stata tolta) |
| `/admin/review-queue` | Coda revisione manuale per writing/speaking. Sovrascrivi lo score AI |
| `/admin/assessment-questions` | Question bank — vedi/modifica le domande dei test |
| `/admin/retry-requests` | Richieste di rifare una sezione |

### Aziende e HR

| Pagina | Cosa fai qui |
|--------|--------------|
| `/admin/org-requests` | Coda registrazioni HR in attesa di approvazione |
| `/admin/organizations/[id]` | Lo già citato: dettaglio azienda con bulk upload + assign |

### Audit e impostazioni

| Pagina | Cosa fai qui |
|--------|--------------|
| `/admin/activity` | Feed di tutto quello che è successo (chi ha fatto cosa quando) |
| `/admin/settings` (se esiste) | Impostazioni piattaforma |

---

## 3. Casi d'uso più comuni

### "Voglio assegnare un test a Mario"

**Singolo learner:**
1. `/students` → cerca Mario → clicca riga
2. Clicca **Assign Placement Test**
3. Seleziona lingua → conferma
4. Mario vede subito il test pronto

**Gruppo di learner della stessa azienda:**
1. `/admin/organizations/[id]`
2. Clicca **Assign Placement Test**
3. Spunta i learner → seleziona lingua → assegna

**Tutti i learner appena caricati via Excel:**
1. Dopo il bulk upload, nella stessa modal compare il pannello indigo
2. Scegli la lingua → **"Assign to N learners"**
3. Tutti in un click

### "Voglio vedere il progresso di Mario su un test che sta facendo ora"

1. `/admin/assessment-management`
2. (Cerca Mario nella search box se serve)
3. Trova la riga con status `IN_PROGRESS`
4. Le pillole **R / L / W / S** mostrano un mini-bar di progresso
5. La colonna **Score** mostra `X / Y · NN%` overall
6. Hover sulla pillola per dettaglio (es. "5/10 domande, 6 min elapsed")
7. La pagina si aggiorna automaticamente ogni 15s

### "Voglio vedere se Mario è migliorato rispetto al test precedente"

1. `/students` → cerca Mario → clicca
2. La pagina mostra un card **"Progress over time"** in cima se ha 2+ test completati
3. Vedi: First test → Latest test + badge "+1 level, +12% score" (verde/rosso)
4. Ladder A1→C2 con highlight sui due punti

### "Voglio esportare i risultati per il cliente Inter"

1. `/admin/assessment-management`
2. Filtra per status `COMPLETED`
3. (Opzionale: filtra per nome se l'azienda ha learner specifici)
4. Spunta le righe che ti interessano → **Export to XLSX**
5. Oppure: senza spuntare nulla, clicca **"Export all N completed"**

### "Voglio dare una recensione manuale al writing di Mario"

1. `/admin/review-queue`
2. Vedi tutte le sezioni Writing/Speaking con AI score ma senza teacher score
3. Apri quella di Mario → leggi la risposta + AI feedback
4. Inserisci teacher score → sostituisce l'AI
5. Il CEFR complessivo viene ricalcolato

### "Voglio caricare 50 dipendenti di Mapei in un colpo"

1. `/admin/organizations` → trova o crea Mapei
2. Apri la pagina Mapei → clicca **Bulk Upload**
3. Scarica il template Excel (`mapei_learners_template.xlsx`)
4. Compila: `first_name`, `last_name`, `email`, `language` obbligatori
5. (Opzionale: `phone`, `job_role`, `needs_speaking/reading/writing`, `confidence`, `comments`)
6. Carica il file → vedi il report riga per riga
7. Nel pannello "Assign placement test to N learners?": scegli **English** → click → fatto

---

## 4. Tip e shortcut

### Filtri smart sul dashboard test
- La tabella nasconde di default Demo Student e Load Test per non sporcarsi
- Se servono (debug): spunta **"Show demo/test accounts"** nella riga filtri

### Email automatiche che ricevi
Su `training@makaitalia.com` arrivano automaticamente:
- 🆕 Nuovo learner registrato
- 🆕 Nuova azienda HR registrata (con CTA approvazione)
- 🏁 Test placement avviato (informativo, no azione richiesta)
- ⏸️ Test sospeso / cancellato
- ✅ Test completato (con PDF allegato)

Se non ricevi nulla, vai su `/admin/integrations` e clicca **Test email** —
manda una mail di prova all'indirizzo configurato.

### Drilling rapido
- Riga learner su `/admin/organizations/[id]` → click → vai dritto al suo storico
- Riga azienda su `/admin/organizations` → click → dettaglio completo
- Riga test su `/admin/assessment-management` → click "Results" → singolo test

### Confirm dialog su Approve
Quando approvi una richiesta su `/admin/test-requests` (legacy), si apre un
modal con nome learner + email + azienda + lingua. **Non approvare mai
senza leggere.**

---

## 5. Cosa NON puoi fare (rare cases)

- ❌ **Modificare un test completato** — il risultato è finale (puoi però
  sovrascrivere lo score di una sezione writing/speaking via Review Queue)
- ❌ **Vedere domande in real-time** dei test in corso (vedi solo
  conteggio + score quando finito)
- ❌ **Mandare email custom** ai learner — la piattaforma fa solo le
  email transactional automatiche

Per queste richieste devi passare per Fabio / dev.

---

## 6. In caso di problemi

### Un learner non vede il test che gli hai assegnato
1. Controlla che lo status sia `ASSIGNED` su `/admin/assessment-management`
2. Chiedi al learner di logout/login (a volte il browser ha cache vecchia)
3. Verifica l'email del learner: deve essere quella su `/admin/users`

### Un learner ha perso il testo durante writing
- Adesso il testo viene **autosalvato in locale** (dal commit del 18 May)
- Indicatore verde "Draft saved · safe to reload" sotto la textarea
- Se il learner ha completato il writing prima di questo update, niente da fare
- Per i nuovi: dovrebbe riprendere dove era

### Tabella test piena di Demo Student
- È normale, sono ora **filtrati di default**
- Se ne vedi, controlla che la checkbox "Show demo/test accounts" sia OFF

### Render non risponde
- Vai su https://dashboard.render.com e controlla lo status del backend
- Se è down, mandare un messaggio a Fabio

---

## 7. Riferimenti

- Versione tecnica completa: [`docs/ASSESSMENT_WORKFLOW.md`](./ASSESSMENT_WORKFLOW.md)
- Visione delle utenze: [`docs/UTENZE_E_FLOW.md`](./UTENZE_E_FLOW.md)
- URL pubblico: https://roundtables-frontend-final.vercel.app
- Backend health: https://roundtables.onrender.com/health
