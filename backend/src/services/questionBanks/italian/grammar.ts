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
    options: [{ label: 'sono', value: 'sono' }, { label: 'sei', value: 'sei' }, { label: 'è', value: 'è' }, { label: 'essere', value: 'essere' }],
    correctAnswer: 'sono', points: 1, orderIndex: 1, tags: ['essere']
  },
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Maria ___ una ragazza simpatica.',
    options: [{ label: 'sono', value: 'sono' }, { label: 'sei', value: 'sei' }, { label: 'è', value: 'è' }, { label: 'siamo', value: 'siamo' }],
    correctAnswer: 'è', points: 1, orderIndex: 2, tags: ['essere']
  },
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Noi ___ fame.',
    options: [{ label: 'ha', value: 'ha' }, { label: 'abbiamo', value: 'abbiamo' }, { label: 'hanno', value: 'hanno' }, { label: 'avete', value: 'avete' }],
    correctAnswer: 'abbiamo', points: 1, orderIndex: 3, tags: ['avere']
  },
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Ho comprato ___ libro interessante.',
    options: [{ label: 'una', value: 'una' }, { label: 'un', value: 'un' }, { label: 'uno', value: 'uno' }, { label: 'un\'', value: 'un\'' }],
    correctAnswer: 'un', points: 1, orderIndex: 4, tags: ['articoli indeterminativi']
  },
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '___ studentesse sono brave.',
    options: [{ label: 'I', value: 'I' }, { label: 'Le', value: 'Le' }, { label: 'Gli', value: 'Gli' }, { label: 'Lo', value: 'Lo' }],
    correctAnswer: 'Le', points: 1, orderIndex: 5, tags: ['articoli determinativi']
  },
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Marco ___ in un ristorante.',
    options: [{ label: 'lavora', value: 'lavora' }, { label: 'lavori', value: 'lavori' }, { label: 'lavoro', value: 'lavoro' }, { label: 'lavorano', value: 'lavorano' }],
    correctAnswer: 'lavora', points: 1, orderIndex: 6, tags: ['presente indicativo', 'prima coniugazione']
  },
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'I bambini ___ al parco ogni giorno.',
    options: [{ label: 'gioca', value: 'gioca' }, { label: 'giochi', value: 'giochi' }, { label: 'giocano', value: 'giocano' }, { label: 'giochiamo', value: 'giochiamo' }],
    correctAnswer: 'giocano', points: 1, orderIndex: 7, tags: ['presente indicativo', 'prima coniugazione']
  },
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Tu ___ il giornale ogni mattina?',
    options: [{ label: 'legge', value: 'legge' }, { label: 'leggi', value: 'leggi' }, { label: 'leggono', value: 'leggono' }, { label: 'leggo', value: 'leggo' }],
    correctAnswer: 'leggi', points: 1, orderIndex: 8, tags: ['presente indicativo', 'seconda coniugazione']
  },

  // ============================================================
  // A2 — Elementary (8 questions)
  // ============================================================
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Ieri Maria ___ al cinema con le amiche.',
    options: [{ label: 'è andata', value: 'è andata' }, { label: 'ha andato', value: 'ha andato' }, { label: 'è andato', value: 'è andato' }, { label: 'ha andata', value: 'ha andata' }],
    correctAnswer: 'è andata', points: 1, orderIndex: 9, tags: ['passato prossimo', 'essere']
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Noi ___ una pizza ieri sera.',
    options: [{ label: 'abbiamo mangiato', value: 'abbiamo mangiato' }, { label: 'siamo mangiati', value: 'siamo mangiati' }, { label: 'abbiamo mangiata', value: 'abbiamo mangiata' }, { label: 'siamo mangiato', value: 'siamo mangiato' }],
    correctAnswer: 'abbiamo mangiato', points: 1, orderIndex: 10, tags: ['passato prossimo', 'avere']
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Quando ero piccolo, ___ sempre a calcio.',
    options: [{ label: 'ho giocato', value: 'ho giocato' }, { label: 'giocavo', value: 'giocavo' }, { label: 'gioco', value: 'gioco' }, { label: 'giocai', value: 'giocai' }],
    correctAnswer: 'giocavo', points: 1, orderIndex: 11, tags: ['imperfetto']
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Il libro è sul tavolo. ___ vedi?',
    options: [{ label: 'Lo', value: 'Lo' }, { label: 'La', value: 'La' }, { label: 'Li', value: 'Li' }, { label: 'Le', value: 'Le' }],
    correctAnswer: 'Lo', points: 1, orderIndex: 12, tags: ['pronomi diretti']
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Ho telefonato a Luca e ___ ho detto tutto.',
    options: [{ label: 'lo', value: 'lo' }, { label: 'gli', value: 'gli' }, { label: 'le', value: 'le' }, { label: 'li', value: 'li' }],
    correctAnswer: 'gli', points: 1, orderIndex: 13, tags: ['pronomi indiretti']
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Mentre io ___, è arrivato Marco.',
    options: [{ label: 'studiavo', value: 'studiavo' }, { label: 'ho studiato', value: 'ho studiato' }, { label: 'studio', value: 'studio' }, { label: 'studiai', value: 'studiai' }],
    correctAnswer: 'studiavo', points: 1, orderIndex: 14, tags: ['imperfetto', 'passato prossimo']
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Domani ___ a trovare i nonni.',
    options: [{ label: 'andiamo', value: 'andiamo' }, { label: 'andremo', value: 'andremo' }, { label: 'andavamo', value: 'andavamo' }, { label: 'siamo andati', value: 'siamo andati' }],
    correctAnswer: 'andremo', points: 1, orderIndex: 15, tags: ['futuro semplice']
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Queste scarpe sono ___ delle mie.',
    options: [{ label: 'più belle', value: 'più belle' }, { label: 'più bella', value: 'più bella' }, { label: 'bellissime', value: 'bellissime' }, { label: 'più bello', value: 'più bello' }],
    correctAnswer: 'più belle', points: 1, orderIndex: 16, tags: ['comparativo']
  },

  // ============================================================
  // B1 — Intermediate (8 questions)
  // ============================================================
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Penso che Maria ___ ragione.',
    options: [{ label: 'ha', value: 'ha' }, { label: 'abbia', value: 'abbia' }, { label: 'avrebbe', value: 'avrebbe' }, { label: 'avrà', value: 'avrà' }],
    correctAnswer: 'abbia', points: 1, orderIndex: 17, tags: ['congiuntivo presente']
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'È necessario che voi ___ puntuali.',
    options: [{ label: 'siete', value: 'siete' }, { label: 'siate', value: 'siate' }, { label: 'sareste', value: 'sareste' }, { label: 'sarete', value: 'sarete' }],
    correctAnswer: 'siate', points: 1, orderIndex: 18, tags: ['congiuntivo presente']
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Se avessi più tempo, ___ di più.',
    options: [{ label: 'viaggio', value: 'viaggio' }, { label: 'viaggerò', value: 'viaggerò' }, { label: 'viaggerei', value: 'viaggerei' }, { label: 'viaggiavo', value: 'viaggiavo' }],
    correctAnswer: 'viaggerei', points: 1, orderIndex: 19, tags: ['condizionale presente', 'periodo ipotetico']
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '___ piacerebbe venire alla festa?',
    options: [{ label: 'Ti', value: 'Ti' }, { label: 'Tu', value: 'Tu' }, { label: 'Te', value: 'Te' }, { label: 'Tuo', value: 'Tuo' }],
    correctAnswer: 'Ti', points: 1, orderIndex: 20, tags: ['condizionale presente', 'pronomi indiretti']
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'La ragazza ___ ho conosciuto ieri è molto simpatica.',
    options: [{ label: 'chi', value: 'chi' }, { label: 'che', value: 'che' }, { label: 'cui', value: 'cui' }, { label: 'quale', value: 'quale' }],
    correctAnswer: 'che', points: 1, orderIndex: 21, tags: ['pronomi relativi']
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'La città in ___ sono nato è molto piccola.',
    options: [{ label: 'che', value: 'che' }, { label: 'cui', value: 'cui' }, { label: 'quale', value: 'quale' }, { label: 'chi', value: 'chi' }],
    correctAnswer: 'cui', points: 1, orderIndex: 22, tags: ['pronomi relativi']
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Credo che lui ___ già partito.',
    options: [{ label: 'è', value: 'è' }, { label: 'sia', value: 'sia' }, { label: 'sarà', value: 'sarà' }, { label: 'sarebbe', value: 'sarebbe' }],
    correctAnswer: 'sia', points: 1, orderIndex: 23, tags: ['congiuntivo passato']
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Gliel\'ho ___ ieri.',
    options: [{ label: 'detto', value: 'detto' }, { label: 'dito', value: 'dito' }, { label: 'diceto', value: 'diceto' }, { label: 'dicuto', value: 'dicuto' }],
    correctAnswer: 'detto', points: 1, orderIndex: 24, tags: ['pronomi combinati', 'participio passato']
  },

  // ============================================================
  // B2 — Upper Intermediate (8 questions)
  // ============================================================
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Dopo che ___ finito di mangiare, siamo usciti.',
    options: [{ label: 'abbiamo', value: 'abbiamo' }, { label: 'avevamo', value: 'avevamo' }, { label: 'avremmo', value: 'avremmo' }, { label: 'avremo', value: 'avremo' }],
    correctAnswer: 'avevamo', points: 1, orderIndex: 25, tags: ['trapassato prossimo']
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'La casa ___ costruita nel 1900.',
    options: [{ label: 'è stata', value: 'è stata' }, { label: 'ha stata', value: 'ha stata' }, { label: 'è stato', value: 'è stato' }, { label: 'ha stato', value: 'ha stato' }],
    correctAnswer: 'è stata', points: 1, orderIndex: 26, tags: ['forma passiva']
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Marco ha detto che ___ il giorno dopo.',
    options: [{ label: 'viene', value: 'viene' }, { label: 'sarebbe venuto', value: 'sarebbe venuto' }, { label: 'verrà', value: 'verrà' }, { label: 'veniva', value: 'veniva' }],
    correctAnswer: 'sarebbe venuto', points: 1, orderIndex: 27, tags: ['discorso indiretto']
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Sebbene ___ stanco, ha continuato a lavorare.',
    options: [{ label: 'è', value: 'è' }, { label: 'fosse', value: 'fosse' }, { label: 'era', value: 'era' }, { label: 'sarà', value: 'sarà' }],
    correctAnswer: 'fosse', points: 1, orderIndex: 28, tags: ['congiuntivo imperfetto', 'congiunzioni']
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Se avessi studiato, ___ l\'esame.',
    options: [{ label: 'passerei', value: 'passerei' }, { label: 'avrei passato', value: 'avrei passato' }, { label: 'passavo', value: 'passavo' }, { label: 'ho passato', value: 'ho passato' }],
    correctAnswer: 'avrei passato', points: 1, orderIndex: 29, tags: ['periodo ipotetico terzo tipo']
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Il film ___ da milioni di persone.',
    options: [{ label: 'è stato visto', value: 'è stato visto' }, { label: 'ha visto', value: 'ha visto' }, { label: 'è visto', value: 'è visto' }, { label: 'ha stato visto', value: 'ha stato visto' }],
    correctAnswer: 'è stato visto', points: 1, orderIndex: 30, tags: ['forma passiva', 'passato prossimo']
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Mi ha chiesto se ___ libera il giorno dopo.',
    options: [{ label: 'sono', value: 'sono' }, { label: 'fossi', value: 'fossi' }, { label: 'sarò', value: 'sarò' }, { label: 'ero', value: 'ero' }],
    correctAnswer: 'fossi', points: 1, orderIndex: 31, tags: ['discorso indiretto', 'congiuntivo imperfetto']
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Nonostante ___ piovendo, siamo usciti lo stesso.',
    options: [{ label: 'sta', value: 'sta' }, { label: 'stesse', value: 'stesse' }, { label: 'stava', value: 'stava' }, { label: 'starà', value: 'starà' }],
    correctAnswer: 'stesse', points: 1, orderIndex: 32, tags: ['congiuntivo imperfetto', 'nonostante']
  },

  // ============================================================
  // C1 — Advanced (4 questions)
  // ============================================================
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Dante ___ la Divina Commedia nel XIV secolo.',
    options: [{ label: 'scrisse', value: 'scrisse' }, { label: 'ha scritto', value: 'ha scritto' }, { label: 'scriveva', value: 'scriveva' }, { label: 'scrivesse', value: 'scrivesse' }],
    correctAnswer: 'scrisse', points: 1, orderIndex: 33, tags: ['passato remoto']
  },
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Se lo avessi saputo prima, ___ diversamente.',
    options: [{ label: 'agivo', value: 'agivo' }, { label: 'avrei agito', value: 'avrei agito' }, { label: 'agirei', value: 'agirei' }, { label: 'agissi', value: 'agissi' }],
    correctAnswer: 'avrei agito', points: 1, orderIndex: 34, tags: ['periodo ipotetico terzo tipo', 'congiuntivo trapassato']
  },
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Credevo che loro ___ già partiti.',
    options: [{ label: 'erano', value: 'erano' }, { label: 'fossero', value: 'fossero' }, { label: 'sarebbero', value: 'sarebbero' }, { label: 'siano', value: 'siano' }],
    correctAnswer: 'fossero', points: 1, orderIndex: 35, tags: ['congiuntivo trapassato']
  },
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'I Romani ___ un vasto impero.',
    options: [{ label: 'costruirono', value: 'costruirono' }, { label: 'hanno costruito', value: 'hanno costruito' }, { label: 'costruivano', value: 'costruivano' }, { label: 'costruissero', value: 'costruissero' }],
    correctAnswer: 'costruirono', points: 1, orderIndex: 36, tags: ['passato remoto']
  },

  // ============================================================
  // C2 — Proficiency (4 questions)
  // ============================================================
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Qualora ___ necessario, vi contatteremo immediatamente.',
    options: [{ label: 'è', value: 'è' }, { label: 'fosse', value: 'fosse' }, { label: 'sarà', value: 'sarà' }, { label: 'era', value: 'era' }],
    correctAnswer: 'fosse', points: 1, orderIndex: 37, tags: ['congiuntivo imperfetto', 'qualora']
  },
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Non fosse stato per il suo aiuto, ___ nei guai.',
    options: [{ label: 'sarei stato', value: 'sarei stato' }, { label: 'sono stato', value: 'sono stato' }, { label: 'ero', value: 'ero' }, { label: 'stavo', value: 'stavo' }],
    correctAnswer: 'sarei stato', points: 1, orderIndex: 38, tags: ['periodo ipotetico terzo tipo', 'congiuntivo trapassato']
  },
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Per quanto ne ___, la situazione è rimasta invariata.',
    options: [{ label: 'so', value: 'so' }, { label: 'sappia', value: 'sappia' }, { label: 'saprei', value: 'saprei' }, { label: 'sapessi', value: 'sapessi' }],
    correctAnswer: 'sappia', points: 1, orderIndex: 39, tags: ['congiuntivo presente', 'per quanto']
  },
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Magari ___ venire alla festa, ma purtroppo devo lavorare.',
    options: [{ label: 'posso', value: 'posso' }, { label: 'potessi', value: 'potessi' }, { label: 'potrei', value: 'potrei' }, { label: 'potrò', value: 'potrò' }],
    correctAnswer: 'potessi', points: 1, orderIndex: 40, tags: ['congiuntivo imperfetto', 'magari']
  },
]
