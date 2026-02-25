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
]
