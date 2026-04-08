import { MultiSkillQuestionData } from '../types'

// Italian Error Correction Questions — 10 questions
// Student reads an erroneous sentence and must type the corrected version
// passage = the sentence with the error
// questionText = instruction
// correctAnswer = the corrected sentence (pipe-separated alternatives)

export const italianErrorCorrectionQuestions: MultiSkillQuestionData[] = [
  // ============================================================
  // A2 — Elementary (2 questions)
  // ============================================================
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Ieri ho andato al cinema.',
    questionText: 'Trova e correggi l\'errore in questa frase.',
    correctAnswer: 'Ieri sono andato al cinema.|Ieri sono andata al cinema.',
    points: 1, orderIndex: 1, tags: ['passato prossimo', 'ausiliare essere']
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Lui ha quindici anno.',
    questionText: 'Trova e correggi l\'errore in questa frase.',
    correctAnswer: 'Lui ha quindici anni.',
    points: 1, orderIndex: 2, tags: ['plurale', 'sostantivi']
  },

  // ============================================================
  // B1 — Intermediate (3 questions)
  // ============================================================
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Penso che lui ha ragione.',
    questionText: 'Trova e correggi l\'errore in questa frase.',
    correctAnswer: 'Penso che lui abbia ragione.',
    points: 1, orderIndex: 3, tags: ['congiuntivo presente']
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Malgrado il pioggia, siamo usciti.',
    questionText: 'Trova e correggi l\'errore in questa frase.',
    correctAnswer: 'Malgrado la pioggia, siamo usciti.',
    points: 1, orderIndex: 4, tags: ['articoli', 'genere']
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Se avrei tempo, verrei alla festa.',
    questionText: 'Trova e correggi l\'errore in questa frase.',
    correctAnswer: 'Se avessi tempo, verrei alla festa.',
    points: 1, orderIndex: 5, tags: ['periodo ipotetico', 'congiuntivo imperfetto']
  },

  // ============================================================
  // B2 — Upper Intermediate (3 questions)
  // ============================================================
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Le informazione che mi hai dato erano molto utili.',
    questionText: 'Trova e correggi l\'errore in questa frase.',
    correctAnswer: 'Le informazioni che mi hai dato erano molto utili.',
    points: 1, orderIndex: 6, tags: ['plurale', 'sostantivi femminili']
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Mi ha suggerito di prendere un\'altra strada.',
    questionText: 'Trova e correggi l\'errore in questa frase.',
    correctAnswer: 'Mi ha consigliato di prendere un\'altra strada.|Mi ha suggerito di prendere un\'altra strada.',
    points: 1, orderIndex: 7, tags: ['suggerire', 'reggenza verbale']
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Nonostante è stanco, ha continuato a lavorare.',
    questionText: 'Trova e correggi l\'errore in questa frase.',
    correctAnswer: 'Nonostante fosse stanco, ha continuato a lavorare.|Nonostante sia stanco, ha continuato a lavorare.',
    points: 1, orderIndex: 8, tags: ['congiuntivo', 'nonostante']
  },

  // ============================================================
  // C1 — Advanced (2 questions)
  // ============================================================
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Se lo avrei saputo prima, avrei agito diversamente.',
    questionText: 'Trova e correggi l\'errore in questa frase.',
    correctAnswer: 'Se lo avessi saputo prima, avrei agito diversamente.',
    points: 1, orderIndex: 9, tags: ['periodo ipotetico terzo tipo', 'congiuntivo trapassato']
  },
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Benché piove, usciremo lo stesso.',
    questionText: 'Trova e correggi l\'errore in questa frase.',
    correctAnswer: 'Benché piova, usciremo lo stesso.',
    points: 1, orderIndex: 10, tags: ['congiuntivo presente', 'benché']
  },

  // ============================================================
  // NUOVE DOMANDE — 20 in più (orderIndex 11-30)
  // ============================================================

  // A2 (5 domande)
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Io sono d\'accordo con te.',
    questionText: 'Trova e correggi l\'errore in questa frase.',
    correctAnswer: 'Sono d\'accordo con te.',
    points: 1, orderIndex: 11, tags: ['pronome soggetto ridondante']
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'C\'è molte persone nel parco.',
    questionText: 'Trova e correggi l\'errore in questa frase.',
    correctAnswer: 'Ci sono molte persone nel parco.',
    points: 1, orderIndex: 12, tags: ['c\'è/ci sono', 'accordo']
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Lei sa nuotare molto buono.',
    questionText: 'Trova e correggi l\'errore in questa frase.',
    correctAnswer: 'Lei sa nuotare molto bene.',
    points: 1, orderIndex: 13, tags: ['avverbio', 'buono/bene']
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Ho visitato Parigi l\'anno scorsa.',
    questionText: 'Trova e correggi l\'errore in questa frase.',
    correctAnswer: 'Ho visitato Parigi l\'anno scorso.',
    points: 1, orderIndex: 14, tags: ['accordo aggettivo', 'genere']
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Lui sempre arriva in ritardo a lezione.',
    questionText: 'Trova e correggi l\'errore in questa frase.',
    correctAnswer: 'Lui arriva sempre in ritardo a lezione.',
    points: 1, orderIndex: 15, tags: ['posizione avverbio', 'frequenza']
  },

  // B1 (5 domande)
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Mi sono ricordato del suo nome.',
    questionText: 'Trova e correggi l\'errore in questa frase.',
    correctAnswer: 'Mi sono ricordato il suo nome.|Ho ricordato il suo nome.',
    points: 1, orderIndex: 16, tags: ['ricordare/ricordarsi', 'reggenza verbale']
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Mi ha detto che viene domani.',
    questionText: 'Trova e correggi l\'errore in questa frase.',
    correctAnswer: 'Mi ha detto che sarebbe venuto il giorno dopo.|Mi ha detto che sarebbe venuto domani.',
    points: 1, orderIndex: 17, tags: ['concordanza dei tempi', 'discorso indiretto']
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Sebbene pioveva, siamo usciti lo stesso.',
    questionText: 'Trova e correggi l\'errore in questa frase.',
    correctAnswer: 'Sebbene piovesse, siamo usciti lo stesso.',
    points: 1, orderIndex: 18, tags: ['congiuntivo', 'sebbene']
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Questo è il libro che ho bisogno.',
    questionText: 'Trova e correggi l\'errore in questa frase.',
    correctAnswer: 'Questo è il libro di cui ho bisogno.',
    points: 1, orderIndex: 19, tags: ['pronome relativo', 'di cui']
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Mi ha chiesto se posso aiutarla.',
    questionText: 'Trova e correggi l\'errore in questa frase.',
    correctAnswer: 'Mi ha chiesto se potevo aiutarla.|Mi ha chiesto se potessi aiutarla.',
    points: 1, orderIndex: 20, tags: ['concordanza dei tempi', 'discorso indiretto']
  },

  // B2 (5 domande)
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Ha negato di avere rubato i soldi.',
    questionText: 'Trova e correggi l\'errore in questa frase.',
    correctAnswer: 'Ha negato di aver rubato i soldi.',
    points: 1, orderIndex: 21, tags: ['infinito passato', 'troncamento']
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Più pratichi, più migliori di più.',
    questionText: 'Trova e correggi l\'errore in questa frase.',
    correctAnswer: 'Più pratichi, più migliori.',
    points: 1, orderIndex: 22, tags: ['comparativo progressivo', 'ridondanza']
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Vorrei che tu puoi venire alla festa.',
    questionText: 'Trova e correggi l\'errore in questa frase.',
    correctAnswer: 'Vorrei che tu potessi venire alla festa.',
    points: 1, orderIndex: 23, tags: ['congiuntivo imperfetto', 'volere']
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Lei è una delle persona più gentili che abbia mai conosciuto.',
    questionText: 'Trova e correggi l\'errore in questa frase.',
    correctAnswer: 'Lei è una delle persone più gentili che abbia mai conosciuto.|Lei è una delle persone più gentili che abbia mai conosciuto.',
    points: 1, orderIndex: 24, tags: ['plurale', 'superlativo']
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Nonostante che era stanco, ha continuato a lavorare.',
    questionText: 'Trova e correggi l\'errore in questa frase.',
    correctAnswer: 'Nonostante fosse stanco, ha continuato a lavorare.',
    points: 1, orderIndex: 25, tags: ['nonostante', 'congiuntivo']
  },

  // C1 (5 domande)
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Appena lui era arrivato, la riunione è iniziata.',
    questionText: 'Trova e correggi l\'errore in questa frase.',
    correctAnswer: 'Appena fu arrivato, la riunione iniziò.|Non appena arrivò, la riunione iniziò.',
    points: 1, orderIndex: 26, tags: ['passato remoto', 'appena']
  },
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'La maggior parte degli studenti pensa che l\'esame era facile.',
    questionText: 'Trova e correggi l\'errore in questa frase.',
    correctAnswer: 'La maggior parte degli studenti pensa che l\'esame fosse facile.|La maggior parte degli studenti pensa che l\'esame sia stato facile.',
    points: 1, orderIndex: 27, tags: ['concordanza dei tempi', 'congiuntivo']
  },
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Senza il suo aiuto, avrei stato bocciato all\'esame.',
    questionText: 'Trova e correggi l\'errore in questa frase.',
    correctAnswer: 'Senza il suo aiuto, sarei stato bocciato all\'esame.',
    points: 1, orderIndex: 28, tags: ['condizionale passato', 'ausiliare']
  },
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Il numero di studenti che si è iscritto quest\'anno è aumentato.',
    questionText: 'Trova e correggi l\'errore in questa frase.',
    correctAnswer: 'Il numero di studenti che si sono iscritti quest\'anno è aumentato.',
    points: 1, orderIndex: 29, tags: ['accordo soggetto-verbo', 'pronome relativo']
  },
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'È indispensabile che ogni dipendente consegna il suo rapporto entro venerdì.',
    questionText: 'Trova e correggi l\'errore in questa frase.',
    correctAnswer: 'È indispensabile che ogni dipendente consegni il suo rapporto entro venerdì.',
    points: 1, orderIndex: 30, tags: ['congiuntivo presente', 'è indispensabile che']
  },
]
