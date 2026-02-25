import { MultiSkillQuestionData } from '../types'

// Italian Grammar MCQ Questions — 40 questions
// Distributed across A1-C2 levels

export const italianGrammarQuestions: MultiSkillQuestionData[] = [
  // ============================================================
  // A1 — Beginner (8 questions)
  // ============================================================
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Io ___ uno studente.',
    options: [{ label: 'A', value: 'sono' }, { label: 'B', value: 'sei' }, { label: 'C', value: 'è' }, { label: 'D', value: 'essere' }],
    correctAnswer: 'sono', points: 1, orderIndex: 1, tags: ['essere']
  },
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Maria ___ una ragazza simpatica.',
    options: [{ label: 'A', value: 'sono' }, { label: 'B', value: 'sei' }, { label: 'C', value: 'è' }, { label: 'D', value: 'siamo' }],
    correctAnswer: 'è', points: 1, orderIndex: 2, tags: ['essere']
  },
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Noi ___ fame.',
    options: [{ label: 'A', value: 'ha' }, { label: 'B', value: 'abbiamo' }, { label: 'C', value: 'hanno' }, { label: 'D', value: 'avete' }],
    correctAnswer: 'abbiamo', points: 1, orderIndex: 3, tags: ['avere']
  },
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Ho comprato ___ libro interessante.',
    options: [{ label: 'A', value: 'una' }, { label: 'B', value: 'un' }, { label: 'C', value: 'uno' }, { label: 'D', value: 'un\'' }],
    correctAnswer: 'un', points: 1, orderIndex: 4, tags: ['articoli indeterminativi']
  },
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '___ studentesse sono brave.',
    options: [{ label: 'A', value: 'I' }, { label: 'B', value: 'Le' }, { label: 'C', value: 'Gli' }, { label: 'D', value: 'Lo' }],
    correctAnswer: 'Le', points: 1, orderIndex: 5, tags: ['articoli determinativi']
  },
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Marco ___ in un ristorante.',
    options: [{ label: 'A', value: 'lavora' }, { label: 'B', value: 'lavori' }, { label: 'C', value: 'lavoro' }, { label: 'D', value: 'lavorano' }],
    correctAnswer: 'lavora', points: 1, orderIndex: 6, tags: ['presente indicativo', 'prima coniugazione']
  },
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'I bambini ___ al parco ogni giorno.',
    options: [{ label: 'A', value: 'gioca' }, { label: 'B', value: 'giochi' }, { label: 'C', value: 'giocano' }, { label: 'D', value: 'giochiamo' }],
    correctAnswer: 'giocano', points: 1, orderIndex: 7, tags: ['presente indicativo', 'prima coniugazione']
  },
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Tu ___ il giornale ogni mattina?',
    options: [{ label: 'A', value: 'legge' }, { label: 'B', value: 'leggi' }, { label: 'C', value: 'leggono' }, { label: 'D', value: 'leggo' }],
    correctAnswer: 'leggi', points: 1, orderIndex: 8, tags: ['presente indicativo', 'seconda coniugazione']
  },

  // ============================================================
  // A2 — Elementary (8 questions)
  // ============================================================
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Ieri Maria ___ al cinema con le amiche.',
    options: [{ label: 'A', value: 'è andata' }, { label: 'B', value: 'ha andato' }, { label: 'C', value: 'è andato' }, { label: 'D', value: 'ha andata' }],
    correctAnswer: 'è andata', points: 1, orderIndex: 9, tags: ['passato prossimo', 'essere']
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Noi ___ una pizza ieri sera.',
    options: [{ label: 'A', value: 'abbiamo mangiato' }, { label: 'B', value: 'siamo mangiati' }, { label: 'C', value: 'abbiamo mangiata' }, { label: 'D', value: 'siamo mangiato' }],
    correctAnswer: 'abbiamo mangiato', points: 1, orderIndex: 10, tags: ['passato prossimo', 'avere']
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Quando ero piccolo, ___ sempre a calcio.',
    options: [{ label: 'A', value: 'ho giocato' }, { label: 'B', value: 'giocavo' }, { label: 'C', value: 'gioco' }, { label: 'D', value: 'giocai' }],
    correctAnswer: 'giocavo', points: 1, orderIndex: 11, tags: ['imperfetto']
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Il libro è sul tavolo. ___ vedi?',
    options: [{ label: 'A', value: 'Lo' }, { label: 'B', value: 'La' }, { label: 'C', value: 'Li' }, { label: 'D', value: 'Le' }],
    correctAnswer: 'Lo', points: 1, orderIndex: 12, tags: ['pronomi diretti']
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Ho telefonato a Luca e ___ ho detto tutto.',
    options: [{ label: 'A', value: 'lo' }, { label: 'B', value: 'gli' }, { label: 'C', value: 'le' }, { label: 'D', value: 'li' }],
    correctAnswer: 'gli', points: 1, orderIndex: 13, tags: ['pronomi indiretti']
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Mentre io ___, è arrivato Marco.',
    options: [{ label: 'A', value: 'studiavo' }, { label: 'B', value: 'ho studiato' }, { label: 'C', value: 'studio' }, { label: 'D', value: 'studiai' }],
    correctAnswer: 'studiavo', points: 1, orderIndex: 14, tags: ['imperfetto', 'passato prossimo']
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Domani ___ a trovare i nonni.',
    options: [{ label: 'A', value: 'andiamo' }, { label: 'B', value: 'andremo' }, { label: 'C', value: 'andavamo' }, { label: 'D', value: 'siamo andati' }],
    correctAnswer: 'andremo', points: 1, orderIndex: 15, tags: ['futuro semplice']
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Queste scarpe sono ___ delle mie.',
    options: [{ label: 'A', value: 'più belle' }, { label: 'B', value: 'più bella' }, { label: 'C', value: 'bellissime' }, { label: 'D', value: 'più bello' }],
    correctAnswer: 'più belle', points: 1, orderIndex: 16, tags: ['comparativo']
  },

  // ============================================================
  // B1 — Intermediate (8 questions)
  // ============================================================
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Penso che Maria ___ ragione.',
    options: [{ label: 'A', value: 'ha' }, { label: 'B', value: 'abbia' }, { label: 'C', value: 'avrebbe' }, { label: 'D', value: 'avrà' }],
    correctAnswer: 'abbia', points: 1, orderIndex: 17, tags: ['congiuntivo presente']
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'È necessario che voi ___ puntuali.',
    options: [{ label: 'A', value: 'siete' }, { label: 'B', value: 'siate' }, { label: 'C', value: 'sareste' }, { label: 'D', value: 'sarete' }],
    correctAnswer: 'siate', points: 1, orderIndex: 18, tags: ['congiuntivo presente']
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Se avessi più tempo, ___ di più.',
    options: [{ label: 'A', value: 'viaggio' }, { label: 'B', value: 'viaggerò' }, { label: 'C', value: 'viaggerei' }, { label: 'D', value: 'viaggiavo' }],
    correctAnswer: 'viaggerei', points: 1, orderIndex: 19, tags: ['condizionale presente', 'periodo ipotetico']
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '___ piacerebbe venire alla festa?',
    options: [{ label: 'A', value: 'Ti' }, { label: 'B', value: 'Tu' }, { label: 'C', value: 'Te' }, { label: 'D', value: 'Tuo' }],
    correctAnswer: 'Ti', points: 1, orderIndex: 20, tags: ['condizionale presente', 'pronomi indiretti']
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'La ragazza ___ ho conosciuto ieri è molto simpatica.',
    options: [{ label: 'A', value: 'chi' }, { label: 'B', value: 'che' }, { label: 'C', value: 'cui' }, { label: 'D', value: 'quale' }],
    correctAnswer: 'che', points: 1, orderIndex: 21, tags: ['pronomi relativi']
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'La città in ___ sono nato è molto piccola.',
    options: [{ label: 'A', value: 'che' }, { label: 'B', value: 'cui' }, { label: 'C', value: 'quale' }, { label: 'D', value: 'chi' }],
    correctAnswer: 'cui', points: 1, orderIndex: 22, tags: ['pronomi relativi']
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Credo che lui ___ già partito.',
    options: [{ label: 'A', value: 'è' }, { label: 'B', value: 'sia' }, { label: 'C', value: 'sarà' }, { label: 'D', value: 'sarebbe' }],
    correctAnswer: 'sia', points: 1, orderIndex: 23, tags: ['congiuntivo passato']
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Gliel\'ho ___ ieri.',
    options: [{ label: 'A', value: 'detto' }, { label: 'B', value: 'dito' }, { label: 'C', value: 'diceto' }, { label: 'D', value: 'dicuto' }],
    correctAnswer: 'detto', points: 1, orderIndex: 24, tags: ['pronomi combinati', 'participio passato']
  },

  // ============================================================
  // B2 — Upper Intermediate (8 questions)
  // ============================================================
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Dopo che ___ finito di mangiare, siamo usciti.',
    options: [{ label: 'A', value: 'abbiamo' }, { label: 'B', value: 'avevamo' }, { label: 'C', value: 'avremmo' }, { label: 'D', value: 'avremo' }],
    correctAnswer: 'avevamo', points: 1, orderIndex: 25, tags: ['trapassato prossimo']
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'La casa ___ costruita nel 1900.',
    options: [{ label: 'A', value: 'è stata' }, { label: 'B', value: 'ha stata' }, { label: 'C', value: 'è stato' }, { label: 'D', value: 'ha stato' }],
    correctAnswer: 'è stata', points: 1, orderIndex: 26, tags: ['forma passiva']
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Marco ha detto che ___ il giorno dopo.',
    options: [{ label: 'A', value: 'viene' }, { label: 'B', value: 'sarebbe venuto' }, { label: 'C', value: 'verrà' }, { label: 'D', value: 'veniva' }],
    correctAnswer: 'sarebbe venuto', points: 1, orderIndex: 27, tags: ['discorso indiretto']
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Sebbene ___ stanco, ha continuato a lavorare.',
    options: [{ label: 'A', value: 'è' }, { label: 'B', value: 'fosse' }, { label: 'C', value: 'era' }, { label: 'D', value: 'sarà' }],
    correctAnswer: 'fosse', points: 1, orderIndex: 28, tags: ['congiuntivo imperfetto', 'congiunzioni']
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Se avessi studiato, ___ l\'esame.',
    options: [{ label: 'A', value: 'passerei' }, { label: 'B', value: 'avrei passato' }, { label: 'C', value: 'passavo' }, { label: 'D', value: 'ho passato' }],
    correctAnswer: 'avrei passato', points: 1, orderIndex: 29, tags: ['periodo ipotetico terzo tipo']
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Il film ___ da milioni di persone.',
    options: [{ label: 'A', value: 'è stato visto' }, { label: 'B', value: 'ha visto' }, { label: 'C', value: 'è visto' }, { label: 'D', value: 'ha stato visto' }],
    correctAnswer: 'è stato visto', points: 1, orderIndex: 30, tags: ['forma passiva', 'passato prossimo']
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Mi ha chiesto se ___ libera il giorno dopo.',
    options: [{ label: 'A', value: 'sono' }, { label: 'B', value: 'fossi' }, { label: 'C', value: 'sarò' }, { label: 'D', value: 'ero' }],
    correctAnswer: 'fossi', points: 1, orderIndex: 31, tags: ['discorso indiretto', 'congiuntivo imperfetto']
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Nonostante ___ piovendo, siamo usciti lo stesso.',
    options: [{ label: 'A', value: 'sta' }, { label: 'B', value: 'stesse' }, { label: 'C', value: 'stava' }, { label: 'D', value: 'starà' }],
    correctAnswer: 'stesse', points: 1, orderIndex: 32, tags: ['congiuntivo imperfetto', 'nonostante']
  },

  // ============================================================
  // C1 — Advanced (4 questions)
  // ============================================================
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Dante ___ la Divina Commedia nel XIV secolo.',
    options: [{ label: 'A', value: 'scrisse' }, { label: 'B', value: 'ha scritto' }, { label: 'C', value: 'scriveva' }, { label: 'D', value: 'scrivesse' }],
    correctAnswer: 'scrisse', points: 1, orderIndex: 33, tags: ['passato remoto']
  },
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Se lo avessi saputo prima, ___ diversamente.',
    options: [{ label: 'A', value: 'agivo' }, { label: 'B', value: 'avrei agito' }, { label: 'C', value: 'agirei' }, { label: 'D', value: 'agissi' }],
    correctAnswer: 'avrei agito', points: 1, orderIndex: 34, tags: ['periodo ipotetico terzo tipo', 'congiuntivo trapassato']
  },
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Credevo che loro ___ già partiti.',
    options: [{ label: 'A', value: 'erano' }, { label: 'B', value: 'fossero' }, { label: 'C', value: 'sarebbero' }, { label: 'D', value: 'siano' }],
    correctAnswer: 'fossero', points: 1, orderIndex: 35, tags: ['congiuntivo trapassato']
  },
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'I Romani ___ un vasto impero.',
    options: [{ label: 'A', value: 'costruirono' }, { label: 'B', value: 'hanno costruito' }, { label: 'C', value: 'costruivano' }, { label: 'D', value: 'costruissero' }],
    correctAnswer: 'costruirono', points: 1, orderIndex: 36, tags: ['passato remoto']
  },

  // ============================================================
  // C2 — Proficiency (4 questions)
  // ============================================================
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Qualora ___ necessario, vi contatteremo immediatamente.',
    options: [{ label: 'A', value: 'è' }, { label: 'B', value: 'fosse' }, { label: 'C', value: 'sarà' }, { label: 'D', value: 'era' }],
    correctAnswer: 'fosse', points: 1, orderIndex: 37, tags: ['congiuntivo imperfetto', 'qualora']
  },
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Non fosse stato per il suo aiuto, ___ nei guai.',
    options: [{ label: 'A', value: 'sarei stato' }, { label: 'B', value: 'sono stato' }, { label: 'C', value: 'ero' }, { label: 'D', value: 'stavo' }],
    correctAnswer: 'sarei stato', points: 1, orderIndex: 38, tags: ['periodo ipotetico terzo tipo', 'congiuntivo trapassato']
  },
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Per quanto ne ___, la situazione è rimasta invariata.',
    options: [{ label: 'A', value: 'so' }, { label: 'B', value: 'sappia' }, { label: 'C', value: 'saprei' }, { label: 'D', value: 'sapessi' }],
    correctAnswer: 'sappia', points: 1, orderIndex: 39, tags: ['congiuntivo presente', 'per quanto']
  },
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Magari ___ venire alla festa, ma purtroppo devo lavorare.',
    options: [{ label: 'A', value: 'posso' }, { label: 'B', value: 'potessi' }, { label: 'C', value: 'potrei' }, { label: 'D', value: 'potrò' }],
    correctAnswer: 'potessi', points: 1, orderIndex: 40, tags: ['congiuntivo imperfetto', 'magari']
  },
]
