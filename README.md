# Roundtable Management System

Sistema automatizzato per la gestione dei roundtable formativi Maka.

## Funzionalità Principali

- ✅ Gestione clienti e richieste roundtable
- ✅ Sistema di valutazione livello partecipanti (B1 minimo)
- ✅ Gestione topic con sistema di voting
- ✅ Scheduling automatico delle 10 sessioni
- ✅ Notifiche automatiche per trainer e partecipanti
- ✅ Workflow approvazione domande pre-sessione
- ✅ Sistema feedback post-sessione automatizzato
- ✅ Dashboard di monitoraggio e controllo costi
- ✅ Integrazione email (SCS/Outlook) e Teams

## Architettura

- **Backend**: Node.js/Express + TypeScript
- **Database**: PostgreSQL
- **Frontend**: React + TypeScript
- **Notifiche**: Sistema email automatizzato
- **Scheduling**: Job scheduler per notifiche automatiche

## Struttura Progetto

```
/backend          # API REST + business logic
/frontend         # Dashboard web
/database         # Schema e migrations
/templates        # Template email
/docs            # Documentazione
```

## Flusso Automatizzato

1. **Setup Roundtable** → Caricamento partecipanti, definizione topic
2. **Voting Session** → Selezione 8 topic dai 10 proposti  
3. **Auto Scheduling** → Calendario automatico delle 10 sessioni
4. **Pre-Session** → Reminder automatici + raccolta domande
5. **Post-Session** → Raccolta feedback + invio automatico
6. **Monitoring** → Dashboard controllo avanzamento e costi