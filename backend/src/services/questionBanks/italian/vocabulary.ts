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
    questionText: 'L\'azienda ha deciso di ___ 100 nuovi dipendenti quest\'anno.',
    options: [{ label: 'licenziare', value: 'licenziare' }, { label: 'assumere', value: 'assumere' }, { label: 'pensionare', value: 'pensionare' }, { label: 'dimettersi', value: 'dimettersi' }],
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
]
