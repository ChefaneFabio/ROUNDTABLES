import { MultiSkillQuestionData } from '../types'

// Italian Vocabulary-in-Context Questions — 60 questions
// Multiple choice: choose the word that best fits the context

export const italianVocabularyQuestions: MultiSkillQuestionData[] = [
  // ============================================================
  // A2 — Elementary (3 questions)
  // ============================================================
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Devo ___ un appuntamento dal dottore.',
    options: [{ label: 'fare', value: 'fare' }, { label: 'prendere', value: 'prendere' }, { label: 'dare', value: 'dare' }, { label: 'mettere', value: 'mettere' }],
    correctAnswer: 'prendere', points: 1, orderIndex: 1, tags: ['collocazioni', 'vita quotidiana']
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Il tempo era così brutto che abbiamo dovuto ___ la gita.',
    options: [{ label: 'annullare', value: 'annullare' }, { label: 'fermare', value: 'fermare' }, { label: 'chiudere', value: 'chiudere' }, { label: 'rompere', value: 'rompere' }],
    correctAnswer: 'annullare', points: 1, orderIndex: 2, tags: ['tempo', 'vita quotidiana']
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Mi puoi ___ un favore e spedire questa lettera?',
    options: [{ label: 'fare', value: 'fare' }, { label: 'dare', value: 'dare' }, { label: 'portare', value: 'portare' }, { label: 'avere', value: 'avere' }],
    correctAnswer: 'fare', points: 1, orderIndex: 3, tags: ['collocazioni', 'richieste']
  },

  // ============================================================
  // B1 — Intermediate (4 questions)
  // ============================================================
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'L\'azienda è in crescita e ha deciso di ___ 100 nuovi dipendenti quest\'anno.',
    options: [{ label: 'assumere', value: 'assumere' }, { label: 'trasferire', value: 'trasferire' }, { label: 'pensionare', value: 'pensionare' }, { label: 'dimettersi', value: 'dimettersi' }],
    correctAnswer: 'assumere', points: 1, orderIndex: 4, tags: ['lavoro', 'verbi']
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'È una persona molto ___ — pensa sempre ai sentimenti degli altri.',
    options: [{ label: 'sensata', value: 'sensata' }, { label: 'sensibile', value: 'sensibile' }, { label: 'insensata', value: 'insensata' }, { label: 'sentimentale', value: 'sentimentale' }],
    correctAnswer: 'sensibile', points: 1, orderIndex: 5, tags: ['personalità', 'aggettivi']
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'L\'albergo ha ottime ___ — piscina, palestra e spa.',
    options: [{ label: 'strutture', value: 'strutture' }, { label: 'mobili', value: 'mobili' }, { label: 'attrezzi', value: 'attrezzi' }, { label: 'elettrodomestici', value: 'elettrodomestici' }],
    correctAnswer: 'strutture', points: 1, orderIndex: 6, tags: ['viaggi', 'sostantivi']
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Purtroppo non posso ___ di comprare una macchina nuova adesso.',
    options: [{ label: 'permettermi', value: 'permettermi' }, { label: 'consentire', value: 'consentire' }, { label: 'offrire', value: 'offrire' }, { label: 'fornire', value: 'fornire' }],
    correctAnswer: 'permettermi', points: 1, orderIndex: 7, tags: ['soldi', 'verbi']
  },

  // ============================================================
  // B2 — Upper Intermediate (4 questions)
  // ============================================================
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Il governo ha ___ nuove normative per proteggere l\'ambiente.',
    options: [{ label: 'introdotto', value: 'introdotto' }, { label: 'inventato', value: 'inventato' }, { label: 'scoperto', value: 'scoperto' }, { label: 'prodotto', value: 'prodotto' }],
    correctAnswer: 'introdotto', points: 1, orderIndex: 8, tags: ['politica', 'formale']
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Il documentario ha fatto luce sulle conseguenze ___ dell\'inquinamento.',
    options: [{ label: 'devastanti', value: 'devastanti' }, { label: 'devote', value: 'devote' }, { label: 'dedicate', value: 'dedicate' }, { label: 'sviluppate', value: 'sviluppate' }],
    correctAnswer: 'devastanti', points: 1, orderIndex: 9, tags: ['ambiente', 'aggettivi']
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Ha un grande senso dell\' ___ e fa sempre ridere tutti.',
    options: [{ label: 'umorismo', value: 'umorismo' }, { label: 'sentimento', value: 'sentimento' }, { label: 'significato', value: 'significato' }, { label: 'gusto', value: 'gusto' }],
    correctAnswer: 'umorismo', points: 1, orderIndex: 10, tags: ['collocazioni', 'personalità']
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Il comitato ha ___ la proposta all\'unanimità.',
    options: [{ label: 'approvato', value: 'approvato' }, { label: 'migliorato', value: 'migliorato' }, { label: 'dimostrato', value: 'dimostrato' }, { label: 'applicato', value: 'applicato' }],
    correctAnswer: 'approvato', points: 1, orderIndex: 11, tags: ['lavoro', 'formale']
  },

  // ============================================================
  // C1 — Advanced (2 questions)
  // ============================================================
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Il discorso del politico era volutamente ___ per evitare di prendere posizione.',
    options: [{ label: 'ambiguo', value: 'ambiguo' }, { label: 'ambizioso', value: 'ambizioso' }, { label: 'anonimo', value: 'anonimo' }, { label: 'analogo', value: 'analogo' }],
    correctAnswer: 'ambiguo', points: 1, orderIndex: 12, tags: ['politica', 'aggettivi avanzati']
  },
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'La sua ___ attenzione ai dettagli la rende la candidata ideale.',
    options: [{ label: 'meticolosa', value: 'meticolosa' }, { label: 'maliziosa', value: 'maliziosa' }, { label: 'miracolosa', value: 'miracolosa' }, { label: 'meschina', value: 'meschina' }],
    correctAnswer: 'meticolosa', points: 1, orderIndex: 13, tags: ['lavoro', 'aggettivi avanzati']
  },

  // ============================================================
  // C2 — Proficiency (2 questions)
  // ============================================================
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'L\'opera dell\'artista è una ___ fusione di tradizione e innovazione.',
    options: [{ label: 'impeccabile', value: 'impeccabile' }, { label: 'impermeabile', value: 'impermeabile' }, { label: 'improbabile', value: 'improbabile' }, { label: 'imperdonabile', value: 'imperdonabile' }],
    correctAnswer: 'impeccabile', points: 1, orderIndex: 14, tags: ['arte', 'aggettivi avanzati']
  },
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'La spiegazione ___ del professore ha messo in difficoltà anche gli studenti più avanzati.',
    options: [{ label: 'contorta', value: 'contorta' }, { label: 'consolidata', value: 'consolidata' }, { label: 'contemplata', value: 'contemplata' }, { label: 'congregata', value: 'congregata' }],
    correctAnswer: 'contorta', points: 1, orderIndex: 15, tags: ['accademico', 'aggettivi avanzati']
  },

  // ============================================================
  // NEW QUESTIONS (16–60) — ~8 per level
  // ============================================================

  // A1 — Parole base: famiglia, cibo, colori (16–23)
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Il ___ di Maria si chiama Paolo. Sono sposati da dieci anni.',
    options: [{ label: 'marito', value: 'marito' }, { label: 'fratello', value: 'fratello' }, { label: 'figlio', value: 'figlio' }, { label: 'padre', value: 'padre' }],
    correctAnswer: 'marito', points: 1, orderIndex: 16, tags: ['famiglia']
  },
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'A colazione mangio il pane con la ___.',
    options: [{ label: 'marmellata', value: 'marmellata' }, { label: 'pasta', value: 'pasta' }, { label: 'carne', value: 'carne' }, { label: 'insalata', value: 'insalata' }],
    correctAnswer: 'marmellata', points: 1, orderIndex: 17, tags: ['cibo', 'colazione']
  },
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Il cielo è ___.',
    options: [{ label: 'azzurro', value: 'azzurro' }, { label: 'rosso', value: 'rosso' }, { label: 'nero', value: 'nero' }, { label: 'verde', value: 'verde' }],
    correctAnswer: 'azzurro', points: 1, orderIndex: 18, tags: ['colori']
  },
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Mia ___ è la mamma di mia mamma.',
    options: [{ label: 'nonna', value: 'nonna' }, { label: 'zia', value: 'zia' }, { label: 'sorella', value: 'sorella' }, { label: 'cugina', value: 'cugina' }],
    correctAnswer: 'nonna', points: 1, orderIndex: 19, tags: ['famiglia']
  },
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Bevo un ___ d\'acqua perché ho sete.',
    options: [{ label: 'bicchiere', value: 'bicchiere' }, { label: 'piatto', value: 'piatto' }, { label: 'cucchiaio', value: 'cucchiaio' }, { label: 'coltello', value: 'coltello' }],
    correctAnswer: 'bicchiere', points: 1, orderIndex: 20, tags: ['cibo', 'oggetti']
  },
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Le banane sono ___.',
    options: [{ label: 'gialle', value: 'gialle' }, { label: 'blu', value: 'blu' }, { label: 'viola', value: 'viola' }, { label: 'grigie', value: 'grigie' }],
    correctAnswer: 'gialle', points: 1, orderIndex: 21, tags: ['colori', 'cibo']
  },
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'I figli di mio zio sono i miei ___.',
    options: [{ label: 'cugini', value: 'cugini' }, { label: 'fratelli', value: 'fratelli' }, { label: 'nipoti', value: 'nipoti' }, { label: 'nonni', value: 'nonni' }],
    correctAnswer: 'cugini', points: 1, orderIndex: 22, tags: ['famiglia']
  },
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Per cena preparo la ___ con il sugo di pomodoro.',
    options: [{ label: 'pasta', value: 'pasta' }, { label: 'torta', value: 'torta' }, { label: 'frutta', value: 'frutta' }, { label: 'verdura', value: 'verdura' }],
    correctAnswer: 'pasta', points: 1, orderIndex: 23, tags: ['cibo']
  },

  // A2 — Vita quotidiana (24–31)
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Ogni mattina mi ___ i denti con lo spazzolino dopo colazione.',
    options: [{ label: 'lavo', value: 'lavo' }, { label: 'asciugo', value: 'asciugo' }, { label: 'cambio', value: 'cambio' }, { label: 'prendo', value: 'prendo' }],
    correctAnswer: 'lavo', points: 1, orderIndex: 24, tags: ['routine quotidiana', 'igiene']
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Il supermercato è ___ tra la farmacia e la banca.',
    options: [{ label: 'vicino', value: 'vicino' }, { label: 'lontano', value: 'lontano' }, { label: 'in mezzo', value: 'in mezzo' }, { label: 'dietro', value: 'dietro' }],
    correctAnswer: 'in mezzo', points: 1, orderIndex: 25, tags: ['indicazioni', 'luoghi']
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Non posso uscire stasera perché devo ___ per l\'esame di domani.',
    options: [{ label: 'studiare', value: 'studiare' }, { label: 'dormire', value: 'dormire' }, { label: 'giocare', value: 'giocare' }, { label: 'cucinare', value: 'cucinare' }],
    correctAnswer: 'studiare', points: 1, orderIndex: 26, tags: ['scuola', 'vita quotidiana']
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Ho preso il ___ perché pioveva molto forte.',
    options: [{ label: 'ombrello', value: 'ombrello' }, { label: 'cappello', value: 'cappello' }, { label: 'guanto', value: 'guanto' }, { label: 'zaino', value: 'zaino' }],
    correctAnswer: 'ombrello', points: 1, orderIndex: 27, tags: ['tempo atmosferico', 'oggetti']
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Vorrei ___ un conto corrente in questa banca.',
    options: [{ label: 'aprire', value: 'aprire' }, { label: 'chiudere', value: 'chiudere' }, { label: 'trovare', value: 'trovare' }, { label: 'comprare', value: 'comprare' }],
    correctAnswer: 'aprire', points: 1, orderIndex: 28, tags: ['banca', 'vita quotidiana']
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Una ___ in treno da Roma a Milano costa circa venti euro con il regionale.',
    options: [{ label: 'corsa', value: 'corsa' }, { label: 'fermata', value: 'fermata' }, { label: 'partenza', value: 'partenza' }, { label: 'stazione', value: 'stazione' }],
    correctAnswer: 'corsa', points: 1, orderIndex: 29, tags: ['trasporti']
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Mi fa male la ___ perché ho mangiato troppo.',
    options: [{ label: 'pancia', value: 'pancia' }, { label: 'mano', value: 'mano' }, { label: 'schiena', value: 'schiena' }, { label: 'gamba', value: 'gamba' }],
    correctAnswer: 'pancia', points: 1, orderIndex: 30, tags: ['corpo', 'salute']
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'D\'inverno mi piace bere una ___ calda prima di dormire.',
    options: [{ label: 'tisana', value: 'tisana' }, { label: 'bibita', value: 'bibita' }, { label: 'spremuta', value: 'spremuta' }, { label: 'birra', value: 'birra' }],
    correctAnswer: 'tisana', points: 1, orderIndex: 31, tags: ['bevande', 'vita quotidiana']
  },

  // B1 — Lavoro e viaggio (32–39)
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Ha presentato il suo ___ per la posizione di responsabile marketing.',
    options: [{ label: 'curriculum', value: 'curriculum' }, { label: 'contratto', value: 'contratto' }, { label: 'diploma', value: 'diploma' }, { label: 'documento', value: 'documento' }],
    correctAnswer: 'curriculum', points: 1, orderIndex: 32, tags: ['lavoro']
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'L\'aereo ha avuto un ___ di due ore a causa della nebbia.',
    options: [{ label: 'ritardo', value: 'ritardo' }, { label: 'anticipo', value: 'anticipo' }, { label: 'arrivo', value: 'arrivo' }, { label: 'guasto', value: 'guasto' }],
    correctAnswer: 'ritardo', points: 1, orderIndex: 33, tags: ['viaggio', 'trasporti']
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Il direttore ha ___ una riunione urgente per domani mattina.',
    options: [{ label: 'convocato', value: 'convocato' }, { label: 'cancellato', value: 'cancellato' }, { label: 'dimenticato', value: 'dimenticato' }, { label: 'completato', value: 'completato' }],
    correctAnswer: 'convocato', points: 1, orderIndex: 34, tags: ['lavoro', 'verbi']
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Vorrei prenotare una camera ___ per tre notti, per favore.',
    options: [{ label: 'singola', value: 'singola' }, { label: 'sola', value: 'sola' }, { label: 'unica', value: 'unica' }, { label: 'prima', value: 'prima' }],
    correctAnswer: 'singola', points: 1, orderIndex: 35, tags: ['viaggio', 'albergo']
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Il mio ___ mensile non è sufficiente per affittare un appartamento in centro.',
    options: [{ label: 'stipendio', value: 'stipendio' }, { label: 'prezzo', value: 'prezzo' }, { label: 'costo', value: 'costo' }, { label: 'debito', value: 'debito' }],
    correctAnswer: 'stipendio', points: 1, orderIndex: 36, tags: ['lavoro', 'soldi']
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Il treno si è fermato alla ___ di Bologna Centrale.',
    options: [{ label: 'stazione', value: 'stazione' }, { label: 'fermata', value: 'fermata' }, { label: 'tappa', value: 'tappa' }, { label: 'sosta', value: 'sosta' }],
    correctAnswer: 'stazione', points: 1, orderIndex: 37, tags: ['viaggio', 'trasporti']
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Per questo lavoro è necessaria una buona ___ della lingua inglese, sia scritta che parlata.',
    options: [{ label: 'conoscenza', value: 'conoscenza' }, { label: 'coscienza', value: 'coscienza' }, { label: 'coincidenza', value: 'coincidenza' }, { label: 'confidenza', value: 'confidenza' }],
    correctAnswer: 'conoscenza', points: 1, orderIndex: 38, tags: ['lavoro', 'lingue']
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Abbiamo fatto un\'___ organizzata con la guida turistica.',
    options: [{ label: 'escursione', value: 'escursione' }, { label: 'uscita', value: 'uscita' }, { label: 'entrata', value: 'entrata' }, { label: 'esperienza', value: 'esperienza' }],
    correctAnswer: 'escursione', points: 1, orderIndex: 39, tags: ['viaggio', 'turismo']
  },

  // B2 — Concetti astratti (40–47)
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'La ___ economica e sociale tra ricchi e poveri continua ad aumentare in molti Paesi.',
    options: [{ label: 'disuguaglianza', value: 'disuguaglianza' }, { label: 'dimenticanza', value: 'dimenticanza' }, { label: 'diplomazia', value: 'diplomazia' }, { label: 'divisione', value: 'divisione' }],
    correctAnswer: 'disuguaglianza', points: 2, orderIndex: 40, tags: ['società', 'concetti astratti']
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Il suo comportamento ___ e contrario alle regole ha deluso tutti i colleghi.',
    options: [{ label: 'scorretto', value: 'scorretto' }, { label: 'scorso', value: 'scorso' }, { label: 'scortese', value: 'scortese' }, { label: 'scontento', value: 'scontento' }],
    correctAnswer: 'scorretto', points: 2, orderIndex: 41, tags: ['etica', 'aggettivi']
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Il progetto mira a promuovere la ___ sociale tra i giovani del quartiere.',
    options: [{ label: 'coesione', value: 'coesione' }, { label: 'confusione', value: 'confusione' }, { label: 'collisione', value: 'collisione' }, { label: 'conclusione', value: 'conclusione' }],
    correctAnswer: 'coesione', points: 2, orderIndex: 42, tags: ['società', 'concetti astratti']
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'È fondamentale che i leader agiscano con ___ e trasparenza.',
    options: [{ label: 'integrità', value: 'integrità' }, { label: 'intensità', value: 'intensità' }, { label: 'interiorità', value: 'interiorità' }, { label: 'intimità', value: 'intimità' }],
    correctAnswer: 'integrità', points: 2, orderIndex: 43, tags: ['etica', 'valori']
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'La sua argomentazione era così ___ che nessuno ha potuto contestarla.',
    options: [{ label: 'convincente', value: 'convincente' }, { label: 'convivente', value: 'convivente' }, { label: 'convergente', value: 'convergente' }, { label: 'conveniente', value: 'conveniente' }],
    correctAnswer: 'convincente', points: 2, orderIndex: 44, tags: ['comunicazione', 'aggettivi']
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'La crisi ha avuto ___ negative sull\'economia di tutto il Paese.',
    options: [{ label: 'ripercussioni', value: 'ripercussioni' }, { label: 'riproduzioni', value: 'riproduzioni' }, { label: 'ripetizioni', value: 'ripetizioni' }, { label: 'ripartizioni', value: 'ripartizioni' }],
    correctAnswer: 'ripercussioni', points: 2, orderIndex: 45, tags: ['economia', 'concetti astratti']
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Dopo anni di sfruttamento, i lavoratori hanno chiesto condizioni più ___ e giuste.',
    options: [{ label: 'eque', value: 'eque' }, { label: 'estreme', value: 'estreme' }, { label: 'esterne', value: 'esterne' }, { label: 'esigue', value: 'esigue' }],
    correctAnswer: 'eque', points: 2, orderIndex: 46, tags: ['lavoro', 'diritti']
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'La tecnologia ha reso ___ la comunicazione tra persone di tutto il mondo.',
    options: [{ label: 'agevole', value: 'agevole' }, { label: 'ardua', value: 'ardua' }, { label: 'ambigua', value: 'ambigua' }, { label: 'assurda', value: 'assurda' }],
    correctAnswer: 'agevole', points: 2, orderIndex: 47, tags: ['tecnologia', 'aggettivi']
  },

  // C1 — Modi di dire e linguaggio avanzato (48–55)
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Non fidarti di lui: ha sempre un ___ nella manica.',
    options: [{ label: 'asso', value: 'asso' }, { label: 're', value: 're' }, { label: 'cuore', value: 'cuore' }, { label: 'jolly', value: 'jolly' }],
    correctAnswer: 'asso', points: 2, orderIndex: 48, tags: ['modi di dire']
  },
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Ha fatto di tutta l\'erba un ___: ha giudicato tutti allo stesso modo.',
    options: [{ label: 'fascio', value: 'fascio' }, { label: 'fiore', value: 'fiore' }, { label: 'campo', value: 'campo' }, { label: 'prato', value: 'prato' }],
    correctAnswer: 'fascio', points: 2, orderIndex: 49, tags: ['modi di dire']
  },
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'L\'indagine ha portato alla luce un sistema di corruzione ___.',
    options: [{ label: 'capillare', value: 'capillare' }, { label: 'capitolare', value: 'capitolare' }, { label: 'caparbio', value: 'caparbio' }, { label: 'capriccioso', value: 'capriccioso' }],
    correctAnswer: 'capillare', points: 2, orderIndex: 50, tags: ['politica', 'aggettivi avanzati']
  },
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Non serve piangere sul latte ___: ormai è fatta.',
    options: [{ label: 'versato', value: 'versato' }, { label: 'bevuto', value: 'bevuto' }, { label: 'perso', value: 'perso' }, { label: 'scaduto', value: 'scaduto' }],
    correctAnswer: 'versato', points: 2, orderIndex: 51, tags: ['modi di dire']
  },
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Il suo intervento è stato ___ e ha colpito nel segno.',
    options: [{ label: 'incisivo', value: 'incisivo' }, { label: 'inclusivo', value: 'inclusivo' }, { label: 'intrusivo', value: 'intrusivo' }, { label: 'invasivo', value: 'invasivo' }],
    correctAnswer: 'incisivo', points: 2, orderIndex: 52, tags: ['comunicazione', 'aggettivi avanzati']
  },
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Ha le mani in ___ — è coinvolto in troppi affari.',
    options: [{ label: 'pasta', value: 'pasta' }, { label: 'tasca', value: 'tasca' }, { label: 'gioco', value: 'gioco' }, { label: 'aria', value: 'aria' }],
    correctAnswer: 'pasta', points: 2, orderIndex: 53, tags: ['modi di dire']
  },
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'La proposta è stata accolta con ___ entusiasmo da parte del pubblico.',
    options: [{ label: 'tiepido', value: 'tiepido' }, { label: 'timido', value: 'timido' }, { label: 'tenero', value: 'tenero' }, { label: 'torbido', value: 'torbido' }],
    correctAnswer: 'tiepido', points: 2, orderIndex: 54, tags: ['comunicazione', 'aggettivi avanzati']
  },
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Il problema è stato ___ per troppo tempo; ora bisogna affrontarlo.',
    options: [{ label: 'eluso', value: 'eluso' }, { label: 'escluso', value: 'escluso' }, { label: 'esposto', value: 'esposto' }, { label: 'esteso', value: 'esteso' }],
    correctAnswer: 'eluso', points: 2, orderIndex: 55, tags: ['verbi avanzati']
  },

  // C2 — Registro letterario e colto (56–60)
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'L\'autore adotta uno stile volutamente ___, ricco di metafore e allusioni.',
    options: [{ label: 'ermetico', value: 'ermetico' }, { label: 'erratico', value: 'erratico' }, { label: 'eroico', value: 'eroico' }, { label: 'estetico', value: 'estetico' }],
    correctAnswer: 'ermetico', points: 2, orderIndex: 56, tags: ['letteratura', 'aggettivi avanzati']
  },
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Il suo ragionamento, per quanto ___, non regge a un esame approfondito.',
    options: [{ label: 'specioso', value: 'specioso' }, { label: 'spazioso', value: 'spazioso' }, { label: 'speculativo', value: 'speculativo' }, { label: 'spettacolare', value: 'spettacolare' }],
    correctAnswer: 'specioso', points: 2, orderIndex: 57, tags: ['accademico', 'aggettivi letterari']
  },
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Il critico ha definito il romanzo un\'opera di rara ___, capace di sondare le profondità dell\'animo umano.',
    options: [{ label: 'perspicacia', value: 'perspicacia' }, { label: 'perseveranza', value: 'perseveranza' }, { label: 'pertinenza', value: 'pertinenza' }, { label: 'permanenza', value: 'permanenza' }],
    correctAnswer: 'perspicacia', points: 2, orderIndex: 58, tags: ['letteratura', 'sostantivi avanzati']
  },
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'La ___ del potere nelle mani di pochi rappresenta una minaccia per la democrazia.',
    options: [{ label: 'concentrazione', value: 'concentrazione' }, { label: 'concatenazione', value: 'concatenazione' }, { label: 'conciliazione', value: 'conciliazione' }, { label: 'condensazione', value: 'condensazione' }],
    correctAnswer: 'concentrazione', points: 2, orderIndex: 59, tags: ['politica', 'concetti astratti']
  },
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Il filosofo ___ la tesi con argomentazioni di straordinaria lucidità.',
    options: [{ label: 'suffragò', value: 'suffragò' }, { label: 'suggellò', value: 'suggellò' }, { label: 'soppiantò', value: 'soppiantò' }, { label: 'sovvenne', value: 'sovvenne' }],
    correctAnswer: 'suffragò', points: 2, orderIndex: 60, tags: ['accademico', 'verbi letterari']
  },

  // ============================================================
  // FILL_BLANK — Vocabolario (20 domande: 3-4 per livello QCER)
  // ============================================================

  // A1 — Contrari e definizioni di base
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'FILL_BLANK', skill: 'VOCABULARY',
    questionText: 'Il contrario di "grande" è ___.',
    correctAnswer: 'piccolo', points: 1, orderIndex: 61, tags: ['contrari', 'aggettivi']
  },
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'FILL_BLANK', skill: 'VOCABULARY',
    questionText: 'Il contrario di "caldo" è ___.',
    correctAnswer: 'freddo', points: 1, orderIndex: 62, tags: ['contrari', 'aggettivi']
  },
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'FILL_BLANK', skill: 'VOCABULARY',
    questionText: 'La mamma di mio padre è mia ___.',
    correctAnswer: 'nonna', points: 1, orderIndex: 63, tags: ['famiglia', 'definizioni']
  },

  // A2 — Collocazioni e famiglie di parole
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'FILL_BLANK', skill: 'VOCABULARY',
    questionText: 'Si compra il pane al ___.',
    correctAnswer: 'panificio', points: 1, orderIndex: 64, tags: ['negozi', 'vita quotidiana']
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'FILL_BLANK', skill: 'VOCABULARY',
    questionText: 'Il contrario di "comprare" è ___.',
    correctAnswer: 'vendere', points: 1, orderIndex: 65, tags: ['contrari', 'verbi']
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'FILL_BLANK', skill: 'VOCABULARY',
    questionText: 'Quando piove, si usa l\' ___.',
    correctAnswer: 'ombrello', points: 1, orderIndex: 66, tags: ['tempo atmosferico', 'oggetti']
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'FILL_BLANK', skill: 'VOCABULARY',
    questionText: 'La mattina faccio ___. (pasto del mattino)',
    correctAnswer: 'colazione', points: 1, orderIndex: 67, tags: ['pasti', 'vita quotidiana']
  },

  // B1 — Sinonimi e collocazioni
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'FILL_BLANK', skill: 'VOCABULARY',
    questionText: 'Un sinonimo di "iniziare" è ___.',
    correctAnswer: 'cominciare', points: 1, orderIndex: 68, tags: ['sinonimi', 'verbi']
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'FILL_BLANK', skill: 'VOCABULARY',
    questionText: 'Per candidarsi a un lavoro si invia il ___. (documento con i dati personali)',
    correctAnswer: 'curriculum', points: 1, orderIndex: 69, tags: ['lavoro', 'documenti']
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'FILL_BLANK', skill: 'VOCABULARY',
    questionText: 'L\'aggettivo derivato da "pericolo" è ___.',
    correctAnswer: 'pericoloso', points: 1, orderIndex: 70, tags: ['famiglie di parole', 'aggettivi']
  },

  // B2 — Vocabolario astratto e sostenuto
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'FILL_BLANK', skill: 'VOCABULARY',
    questionText: 'La ___ tra ricchi e poveri continua ad aumentare. (differenza sociale — nome astratto)',
    correctAnswer: 'disuguaglianza', points: 2, orderIndex: 71, tags: ['società', 'concetti astratti']
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'FILL_BLANK', skill: 'VOCABULARY',
    questionText: 'Il nome derivato da "resiliente" è la ___.',
    correctAnswer: 'resilienza', points: 2, orderIndex: 72, tags: ['famiglie di parole', 'nomi astratti']
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'FILL_BLANK', skill: 'VOCABULARY',
    questionText: 'Un argomento ___ è convincente e ben strutturato. (aggettivo)',
    correctAnswer: 'convincente', points: 2, orderIndex: 73, tags: ['comunicazione', 'aggettivi']
  },

  // C1 — Vocabolario nuancé
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'FILL_BLANK', skill: 'VOCABULARY',
    questionText: 'Le decisioni del governo hanno avuto gravi ___ sull\'economia. (conseguenze — nome sostenuto)',
    correctAnswer: 'ripercussioni', points: 2, orderIndex: 74, tags: ['economia', 'concetti astratti']
  },
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'FILL_BLANK', skill: 'VOCABULARY',
    questionText: 'Un discorso ___ colpisce e lascia il segno. (efficace — aggettivo sostenuto)',
    correctAnswer: 'incisivo', points: 2, orderIndex: 75, tags: ['comunicazione', 'aggettivi avanzati']
  },
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'FILL_BLANK', skill: 'VOCABULARY',
    questionText: 'Ha ___ le normative fiscali con astuzia. (evitare/aggirare — verbo avanzato)',
    correctAnswer: 'eluso', points: 2, orderIndex: 76, tags: ['verbi avanzati', 'diritto']
  },

  // C2 — Vocabolario letterario
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'FILL_BLANK', skill: 'VOCABULARY',
    questionText: 'Un testo ___ è oscuro e difficile da interpretare. (aggettivo letterario)',
    correctAnswer: 'ermetico', points: 2, orderIndex: 77, tags: ['letteratura', 'aggettivi avanzati']
  },
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'FILL_BLANK', skill: 'VOCABULARY',
    questionText: 'La ___ dell\'autore rivela una mente brillante. (acutezza intellettuale — nome sostenuto)',
    correctAnswer: 'perspicacia', points: 2, orderIndex: 78, tags: ['letteratura', 'sostantivi avanzati']
  },
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'FILL_BLANK', skill: 'VOCABULARY',
    questionText: 'Un argomento ___ è apparentemente convincente ma fondamentalmente falso. (aggettivo letterario)',
    correctAnswer: 'specioso', points: 2, orderIndex: 79, tags: ['accademico', 'aggettivi letterari']
  },
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'FILL_BLANK', skill: 'VOCABULARY',
    questionText: 'Il filosofo ___ la tesi con prove inconfutabili. (sostenere/confermare — verbo letterario)',
    correctAnswer: 'suffragò', points: 2, orderIndex: 80, tags: ['accademico', 'verbi letterari']
  },
]
