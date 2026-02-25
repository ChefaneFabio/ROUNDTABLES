import { MultiSkillQuestionData } from '../types'

// Italian Vocabulary-in-Context Questions — 15 questions
// Multiple choice: choose the word that best fits the context

export const italianVocabularyQuestions: MultiSkillQuestionData[] = [
  // ============================================================
  // A2 — Elementary (3 questions)
  // ============================================================
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Devo ___ un appuntamento dal dottore.',
    options: [{ label: 'A', value: 'fare' }, { label: 'B', value: 'prendere' }, { label: 'C', value: 'dare' }, { label: 'D', value: 'mettere' }],
    correctAnswer: 'prendere', points: 1, orderIndex: 1, tags: ['collocazioni', 'vita quotidiana']
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Il tempo era così brutto che abbiamo dovuto ___ la gita.',
    options: [{ label: 'A', value: 'annullare' }, { label: 'B', value: 'fermare' }, { label: 'C', value: 'chiudere' }, { label: 'D', value: 'rompere' }],
    correctAnswer: 'annullare', points: 1, orderIndex: 2, tags: ['tempo', 'vita quotidiana']
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Mi puoi ___ un favore e spedire questa lettera?',
    options: [{ label: 'A', value: 'fare' }, { label: 'B', value: 'dare' }, { label: 'C', value: 'portare' }, { label: 'D', value: 'avere' }],
    correctAnswer: 'fare', points: 1, orderIndex: 3, tags: ['collocazioni', 'richieste']
  },

  // ============================================================
  // B1 — Intermediate (4 questions)
  // ============================================================
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'L\'azienda ha deciso di ___ 100 nuovi dipendenti quest\'anno.',
    options: [{ label: 'A', value: 'licenziare' }, { label: 'B', value: 'assumere' }, { label: 'C', value: 'pensionare' }, { label: 'D', value: 'dimettersi' }],
    correctAnswer: 'assumere', points: 1, orderIndex: 4, tags: ['lavoro', 'verbi']
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'È una persona molto ___ — pensa sempre ai sentimenti degli altri.',
    options: [{ label: 'A', value: 'sensata' }, { label: 'B', value: 'sensibile' }, { label: 'C', value: 'insensata' }, { label: 'D', value: 'sentimentale' }],
    correctAnswer: 'sensibile', points: 1, orderIndex: 5, tags: ['personalità', 'aggettivi']
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'L\'albergo ha ottime ___ — piscina, palestra e spa.',
    options: [{ label: 'A', value: 'strutture' }, { label: 'B', value: 'mobili' }, { label: 'C', value: 'attrezzi' }, { label: 'D', value: 'elettrodomestici' }],
    correctAnswer: 'strutture', points: 1, orderIndex: 6, tags: ['viaggi', 'sostantivi']
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Purtroppo non posso ___ di comprare una macchina nuova adesso.',
    options: [{ label: 'A', value: 'permettermi' }, { label: 'B', value: 'consentire' }, { label: 'C', value: 'offrire' }, { label: 'D', value: 'fornire' }],
    correctAnswer: 'permettermi', points: 1, orderIndex: 7, tags: ['soldi', 'verbi']
  },

  // ============================================================
  // B2 — Upper Intermediate (4 questions)
  // ============================================================
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Il governo ha ___ nuove normative per proteggere l\'ambiente.',
    options: [{ label: 'A', value: 'introdotto' }, { label: 'B', value: 'inventato' }, { label: 'C', value: 'scoperto' }, { label: 'D', value: 'prodotto' }],
    correctAnswer: 'introdotto', points: 1, orderIndex: 8, tags: ['politica', 'formale']
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Il documentario ha fatto luce sulle conseguenze ___ dell\'inquinamento.',
    options: [{ label: 'A', value: 'devastanti' }, { label: 'B', value: 'devote' }, { label: 'C', value: 'dedicate' }, { label: 'D', value: 'sviluppate' }],
    correctAnswer: 'devastanti', points: 1, orderIndex: 9, tags: ['ambiente', 'aggettivi']
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Ha un grande senso dell\' ___ e fa sempre ridere tutti.',
    options: [{ label: 'A', value: 'umorismo' }, { label: 'B', value: 'sentimento' }, { label: 'C', value: 'significato' }, { label: 'D', value: 'gusto' }],
    correctAnswer: 'umorismo', points: 1, orderIndex: 10, tags: ['collocazioni', 'personalità']
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Il comitato ha ___ la proposta all\'unanimità.',
    options: [{ label: 'A', value: 'approvato' }, { label: 'B', value: 'migliorato' }, { label: 'C', value: 'dimostrato' }, { label: 'D', value: 'applicato' }],
    correctAnswer: 'approvato', points: 1, orderIndex: 11, tags: ['lavoro', 'formale']
  },

  // ============================================================
  // C1 — Advanced (2 questions)
  // ============================================================
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Il discorso del politico era volutamente ___ per evitare di prendere posizione.',
    options: [{ label: 'A', value: 'ambiguo' }, { label: 'B', value: 'ambizioso' }, { label: 'C', value: 'anonimo' }, { label: 'D', value: 'analogo' }],
    correctAnswer: 'ambiguo', points: 1, orderIndex: 12, tags: ['politica', 'aggettivi avanzati']
  },
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'La sua ___ attenzione ai dettagli la rende la candidata ideale.',
    options: [{ label: 'A', value: 'meticolosa' }, { label: 'B', value: 'maliziosa' }, { label: 'C', value: 'miracolosa' }, { label: 'D', value: 'meschina' }],
    correctAnswer: 'meticolosa', points: 1, orderIndex: 13, tags: ['lavoro', 'aggettivi avanzati']
  },

  // ============================================================
  // C2 — Proficiency (2 questions)
  // ============================================================
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'L\'opera dell\'artista è una ___ fusione di tradizione e innovazione.',
    options: [{ label: 'A', value: 'impeccabile' }, { label: 'B', value: 'impermeabile' }, { label: 'C', value: 'improbabile' }, { label: 'D', value: 'imperdonabile' }],
    correctAnswer: 'impeccabile', points: 1, orderIndex: 14, tags: ['arte', 'aggettivi avanzati']
  },
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'La spiegazione ___ del professore ha messo in difficoltà anche gli studenti più avanzati.',
    options: [{ label: 'A', value: 'contorta' }, { label: 'B', value: 'consolidata' }, { label: 'C', value: 'contemplata' }, { label: 'D', value: 'congregata' }],
    correctAnswer: 'contorta', points: 1, orderIndex: 15, tags: ['accademico', 'aggettivi avanzati']
  },
]
