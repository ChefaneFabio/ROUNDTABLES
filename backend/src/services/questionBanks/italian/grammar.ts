import { MultiSkillQuestionData } from '../types'

// Italian Grammar MCQ Questions — 100 questions
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

  // ============================================================
  // NEW QUESTIONS (41–100) — 10 per level
  // ============================================================

  // A1 — Presente, articoli, preposizioni (41–50)
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Io ___ italiano e inglese.',
    options: [{ label: 'parlo', value: 'parlo' }, { label: 'parli', value: 'parli' }, { label: 'parla', value: 'parla' }, { label: 'parlano', value: 'parlano' }],
    correctAnswer: 'parlo', points: 1, orderIndex: 41, tags: ['presente indicativo', 'prima coniugazione']
  },
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Tu ___ in un appartamento grande?',
    options: [{ label: 'vive', value: 'vive' }, { label: 'vivi', value: 'vivi' }, { label: 'vivono', value: 'vivono' }, { label: 'viviamo', value: 'viviamo' }],
    correctAnswer: 'vivi', points: 1, orderIndex: 42, tags: ['presente indicativo', 'terza coniugazione']
  },
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'La mattina bevo ___ caffè.',
    options: [{ label: 'il', value: 'il' }, { label: 'lo', value: 'lo' }, { label: 'la', value: 'la' }, { label: 'i', value: 'i' }],
    correctAnswer: 'il', points: 1, orderIndex: 43, tags: ['articoli determinativi']
  },
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Abito ___ Roma.',
    options: [{ label: 'in', value: 'in' }, { label: 'a', value: 'a' }, { label: 'da', value: 'da' }, { label: 'di', value: 'di' }],
    correctAnswer: 'a', points: 1, orderIndex: 44, tags: ['preposizioni']
  },
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'I ragazzi ___ a scuola ogni giorno.',
    options: [{ label: 'va', value: 'va' }, { label: 'vai', value: 'vai' }, { label: 'vanno', value: 'vanno' }, { label: 'andiamo', value: 'andiamo' }],
    correctAnswer: 'vanno', points: 1, orderIndex: 45, tags: ['presente indicativo', 'verbi irregolari']
  },
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Noi ___ la televisione la sera.',
    options: [{ label: 'guardo', value: 'guardo' }, { label: 'guardi', value: 'guardi' }, { label: 'guardiamo', value: 'guardiamo' }, { label: 'guardano', value: 'guardano' }],
    correctAnswer: 'guardiamo', points: 1, orderIndex: 46, tags: ['presente indicativo', 'prima coniugazione']
  },
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Questi ___ sono molto buoni.',
    options: [{ label: 'dolce', value: 'dolce' }, { label: 'dolci', value: 'dolci' }, { label: 'dolca', value: 'dolca' }, { label: 'dolco', value: 'dolco' }],
    correctAnswer: 'dolci', points: 1, orderIndex: 47, tags: ['concordanza', 'aggettivi']
  },
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Il libro è ___ tavolo.',
    options: [{ label: 'sul', value: 'sul' }, { label: 'nel', value: 'nel' }, { label: 'dal', value: 'dal' }, { label: 'al', value: 'al' }],
    correctAnswer: 'sul', points: 1, orderIndex: 48, tags: ['preposizioni articolate']
  },
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Mia sorella ___ molto bene.',
    options: [{ label: 'cucino', value: 'cucino' }, { label: 'cucina', value: 'cucina' }, { label: 'cucini', value: 'cucini' }, { label: 'cucinano', value: 'cucinano' }],
    correctAnswer: 'cucina', points: 1, orderIndex: 49, tags: ['presente indicativo', 'prima coniugazione']
  },
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Voi ___ il treno delle otto?',
    options: [{ label: 'prende', value: 'prende' }, { label: 'prendete', value: 'prendete' }, { label: 'prendiamo', value: 'prendiamo' }, { label: 'prendono', value: 'prendono' }],
    correctAnswer: 'prendete', points: 1, orderIndex: 50, tags: ['presente indicativo', 'seconda coniugazione']
  },

  // A2 — Passato prossimo, imperfetto, futuro, pronomi (51–60)
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'I ragazzi ___ al parco ieri pomeriggio.',
    options: [{ label: 'sono andati', value: 'sono andati' }, { label: 'hanno andato', value: 'hanno andato' }, { label: 'sono andato', value: 'sono andato' }, { label: 'è andati', value: 'è andati' }],
    correctAnswer: 'sono andati', points: 1, orderIndex: 51, tags: ['passato prossimo', 'essere']
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Da bambina, ___ sempre con le bambole.',
    options: [{ label: 'ho giocato', value: 'ho giocato' }, { label: 'giocavo', value: 'giocavo' }, { label: 'gioco', value: 'gioco' }, { label: 'giocherò', value: 'giocherò' }],
    correctAnswer: 'giocavo', points: 1, orderIndex: 52, tags: ['imperfetto']
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'L\'anno prossimo ___ un viaggio in Spagna.',
    options: [{ label: 'faccio', value: 'faccio' }, { label: 'facevo', value: 'facevo' }, { label: 'farò', value: 'farò' }, { label: 'ho fatto', value: 'ho fatto' }],
    correctAnswer: 'farò', points: 1, orderIndex: 53, tags: ['futuro semplice']
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Hai visto le chiavi? Non ___ trovo più.',
    options: [{ label: 'li', value: 'li' }, { label: 'le', value: 'le' }, { label: 'lo', value: 'lo' }, { label: 'la', value: 'la' }],
    correctAnswer: 'le', points: 1, orderIndex: 54, tags: ['pronomi diretti']
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Quando ___ piccoli, ___ al mare ogni estate.',
    options: [{ label: 'eravamo / andavamo', value: 'eravamo / andavamo' }, { label: 'siamo stati / siamo andati', value: 'siamo stati / siamo andati' }, { label: 'eravamo / siamo andati', value: 'eravamo / siamo andati' }, { label: 'siamo / andiamo', value: 'siamo / andiamo' }],
    correctAnswer: 'eravamo / andavamo', points: 1, orderIndex: 55, tags: ['imperfetto']
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Ho scritto a Maria e ___ ho mandato un regalo.',
    options: [{ label: 'gli', value: 'gli' }, { label: 'le', value: 'le' }, { label: 'lo', value: 'lo' }, { label: 'la', value: 'la' }],
    correctAnswer: 'le', points: 1, orderIndex: 56, tags: ['pronomi indiretti']
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Ieri ___ molto freddo e ___ tanto.',
    options: [{ label: 'faceva / nevicava', value: 'faceva / nevicava' }, { label: 'ha fatto / ha nevicato', value: 'ha fatto / ha nevicato' }, { label: 'fa / nevica', value: 'fa / nevica' }, { label: 'farà / nevicherà', value: 'farà / nevicherà' }],
    correctAnswer: 'faceva / nevicava', points: 1, orderIndex: 57, tags: ['imperfetto', 'tempo atmosferico']
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Il treno è partito ___ stazione centrale.',
    options: [{ label: 'dalla', value: 'dalla' }, { label: 'nella', value: 'nella' }, { label: 'alla', value: 'alla' }, { label: 'sulla', value: 'sulla' }],
    correctAnswer: 'dalla', points: 1, orderIndex: 58, tags: ['preposizioni articolate']
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Questa gonna è ___ bella ___ quella.',
    options: [{ label: 'tanto / quanto', value: 'tanto / quanto' }, { label: 'più / di', value: 'più / di' }, { label: 'così / che', value: 'così / che' }, { label: 'meno / come', value: 'meno / come' }],
    correctAnswer: 'tanto / quanto', points: 1, orderIndex: 59, tags: ['comparativo']
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Stamattina mi ___ svegliata alle sei.',
    options: [{ label: 'ho', value: 'ho' }, { label: 'sono', value: 'sono' }, { label: 'ha', value: 'ha' }, { label: 'è', value: 'è' }],
    correctAnswer: 'sono', points: 1, orderIndex: 60, tags: ['passato prossimo', 'verbi riflessivi']
  },

  // B1 — Congiuntivo, condizionale, pronomi relativi, periodo ipotetico (61–70)
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Spero che domani ___ bel tempo.',
    options: [{ label: 'fa', value: 'fa' }, { label: 'faccia', value: 'faccia' }, { label: 'farà', value: 'farà' }, { label: 'farebbe', value: 'farebbe' }],
    correctAnswer: 'faccia', points: 1, orderIndex: 61, tags: ['congiuntivo presente']
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Se fossi ricco, ___ una villa al mare.',
    options: [{ label: 'compro', value: 'compro' }, { label: 'comprerei', value: 'comprerei' }, { label: 'comprerò', value: 'comprerò' }, { label: 'compravo', value: 'compravo' }],
    correctAnswer: 'comprerei', points: 1, orderIndex: 62, tags: ['condizionale presente', 'periodo ipotetico']
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'L\'uomo ___ parla con Maria è mio zio.',
    options: [{ label: 'chi', value: 'chi' }, { label: 'che', value: 'che' }, { label: 'cui', value: 'cui' }, { label: 'il quale', value: 'il quale' }],
    correctAnswer: 'che', points: 1, orderIndex: 63, tags: ['pronomi relativi']
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Bisogna che tutti ___ le regole.',
    options: [{ label: 'rispettano', value: 'rispettano' }, { label: 'rispettino', value: 'rispettino' }, { label: 'rispetteranno', value: 'rispetteranno' }, { label: 'rispetterebbero', value: 'rispetterebbero' }],
    correctAnswer: 'rispettino', points: 1, orderIndex: 64, tags: ['congiuntivo presente']
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Il motivo ___ cui ti ho chiamato è importante.',
    options: [{ label: 'di', value: 'di' }, { label: 'per', value: 'per' }, { label: 'a', value: 'a' }, { label: 'da', value: 'da' }],
    correctAnswer: 'per', points: 1, orderIndex: 65, tags: ['pronomi relativi', 'preposizioni']
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '___ piacerebbe un caffè? — Sì, grazie.',
    options: [{ label: 'Le', value: 'Le' }, { label: 'La', value: 'La' }, { label: 'Lo', value: 'Lo' }, { label: 'Lei', value: 'Lei' }],
    correctAnswer: 'Le', points: 1, orderIndex: 66, tags: ['condizionale presente', 'pronomi indiretti', 'formale']
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Se piove, ___ a casa.',
    options: [{ label: 'resto', value: 'resto' }, { label: 'resterei', value: 'resterei' }, { label: 'restassi', value: 'restassi' }, { label: 'restavo', value: 'restavo' }],
    correctAnswer: 'resto', points: 1, orderIndex: 67, tags: ['periodo ipotetico primo tipo']
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Me l\'ha regalato mio fratello. ___ ha comprato in centro.',
    options: [{ label: 'Lo', value: 'Lo' }, { label: 'La', value: 'La' }, { label: 'Li', value: 'Li' }, { label: 'Le', value: 'Le' }],
    correctAnswer: 'Lo', points: 1, orderIndex: 68, tags: ['pronomi combinati']
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Vorrei che tu ___ più attenzione in classe.',
    options: [{ label: 'presti', value: 'presti' }, { label: 'prestassi', value: 'prestassi' }, { label: 'presterai', value: 'presterai' }, { label: 'presteresti', value: 'presteresti' }],
    correctAnswer: 'prestassi', points: 1, orderIndex: 69, tags: ['congiuntivo imperfetto']
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Non so se Marco ___ ancora qui.',
    options: [{ label: 'è', value: 'è' }, { label: 'sia', value: 'sia' }, { label: 'sarà', value: 'sarà' }, { label: 'fosse', value: 'fosse' }],
    correctAnswer: 'sia', points: 1, orderIndex: 70, tags: ['congiuntivo presente']
  },

  // B2 — Passivo, discorso indiretto, congiuntivo imperfetto, concordanza (71–80)
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Il ponte ___ nel 1890 da un ingegnere francese.',
    options: [{ label: 'fu costruito', value: 'fu costruito' }, { label: 'è costruito', value: 'è costruito' }, { label: 'ha costruito', value: 'ha costruito' }, { label: 'venne costruire', value: 'venne costruire' }],
    correctAnswer: 'fu costruito', points: 2, orderIndex: 71, tags: ['forma passiva', 'passato remoto']
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Mi disse che ___ a trovarmi la settimana successiva.',
    options: [{ label: 'viene', value: 'viene' }, { label: 'sarebbe venuto', value: 'sarebbe venuto' }, { label: 'verrà', value: 'verrà' }, { label: 'venisse', value: 'venisse' }],
    correctAnswer: 'sarebbe venuto', points: 2, orderIndex: 72, tags: ['discorso indiretto']
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Benché ___ molti sforzi, non è riuscito a superare l\'esame.',
    options: [{ label: 'fa', value: 'fa' }, { label: 'facesse', value: 'facesse' }, { label: 'faceva', value: 'faceva' }, { label: 'farebbe', value: 'farebbe' }],
    correctAnswer: 'facesse', points: 2, orderIndex: 73, tags: ['congiuntivo imperfetto', 'congiunzioni']
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Se l\'avessi saputo, non ___ mai accettato.',
    options: [{ label: 'ho', value: 'ho' }, { label: 'avrei', value: 'avrei' }, { label: 'abbia', value: 'abbia' }, { label: 'avevo', value: 'avevo' }],
    correctAnswer: 'avrei', points: 2, orderIndex: 74, tags: ['periodo ipotetico terzo tipo']
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Le lettere ___ spedite ieri dall\'ufficio.',
    options: [{ label: 'sono state', value: 'sono state' }, { label: 'hanno state', value: 'hanno state' }, { label: 'è stata', value: 'è stata' }, { label: 'sono stati', value: 'sono stati' }],
    correctAnswer: 'sono state', points: 2, orderIndex: 75, tags: ['forma passiva', 'concordanza']
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Ha ammesso di ___ sbagliato.',
    options: [{ label: 'avere', value: 'avere' }, { label: 'essere', value: 'essere' }, { label: 'aver', value: 'aver' }, { label: 'ha', value: 'ha' }],
    correctAnswer: 'avere', points: 2, orderIndex: 76, tags: ['infinito passato']
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'A meno che non ___ un contrattempo, arriverò in orario.',
    options: [{ label: 'c\'è', value: 'c\'è' }, { label: 'ci sia', value: 'ci sia' }, { label: 'ci sarà', value: 'ci sarà' }, { label: 'ci fosse', value: 'ci fosse' }],
    correctAnswer: 'ci sia', points: 2, orderIndex: 77, tags: ['congiuntivo presente', 'congiunzioni']
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Mi chiese dove ___ il giorno prima.',
    options: [{ label: 'sono stato', value: 'sono stato' }, { label: 'fossi stato', value: 'fossi stato' }, { label: 'ero stato', value: 'ero stato' }, { label: 'sarò stato', value: 'sarò stato' }],
    correctAnswer: 'fossi stato', points: 2, orderIndex: 78, tags: ['discorso indiretto', 'congiuntivo trapassato']
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Prima che lui ___, vorrei dirgli una cosa.',
    options: [{ label: 'parte', value: 'parte' }, { label: 'parta', value: 'parta' }, { label: 'partirà', value: 'partirà' }, { label: 'partirebbe', value: 'partirebbe' }],
    correctAnswer: 'parta', points: 2, orderIndex: 79, tags: ['congiuntivo presente', 'congiunzioni']
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Quella è la ragazza ___ padre lavora con me.',
    options: [{ label: 'che il', value: 'che il' }, { label: 'il cui', value: 'il cui' }, { label: 'di cui il', value: 'di cui il' }, { label: 'la cui', value: 'la cui' }],
    correctAnswer: 'il cui', points: 2, orderIndex: 80, tags: ['pronomi relativi']
  },

  // C1 — Passato remoto, congiuntivo trapassato, forme implicite, passivo avanzato (81–90)
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Michelangelo ___ la Cappella Sistina tra il 1508 e il 1512.',
    options: [{ label: 'dipinse', value: 'dipinse' }, { label: 'ha dipinto', value: 'ha dipinto' }, { label: 'dipingeva', value: 'dipingeva' }, { label: 'dipingesse', value: 'dipingesse' }],
    correctAnswer: 'dipinse', points: 2, orderIndex: 81, tags: ['passato remoto']
  },
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Se avessimo prenotato prima, ___ posti migliori.',
    options: [{ label: 'avremmo avuto', value: 'avremmo avuto' }, { label: 'avremo avuto', value: 'avremo avuto' }, { label: 'abbiamo avuto', value: 'abbiamo avuto' }, { label: 'avevamo avuto', value: 'avevamo avuto' }],
    correctAnswer: 'avremmo avuto', points: 2, orderIndex: 82, tags: ['periodo ipotetico terzo tipo']
  },
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '___ a casa, mi accorsi di aver dimenticato il portafoglio.',
    options: [{ label: 'Tornando', value: 'Tornando' }, { label: 'Tornato', value: 'Tornato' }, { label: 'Per tornare', value: 'Per tornare' }, { label: 'Tornare', value: 'Tornare' }],
    correctAnswer: 'Tornando', points: 2, orderIndex: 83, tags: ['gerundio']
  },
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Il contratto ___ firmato da entrambe le parti entro venerdì.',
    options: [{ label: 'va', value: 'va' }, { label: 'viene', value: 'viene' }, { label: 'andrà', value: 'andrà' }, { label: 'verrà', value: 'verrà' }],
    correctAnswer: 'andrà', points: 2, orderIndex: 84, tags: ['forma passiva', 'dovere']
  },
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Non sapevo che tu ___ già trasferito a Milano.',
    options: [{ label: 'ti sei', value: 'ti sei' }, { label: 'ti fossi', value: 'ti fossi' }, { label: 'ti eri', value: 'ti eri' }, { label: 'ti saresti', value: 'ti saresti' }],
    correctAnswer: 'ti fossi', points: 2, orderIndex: 85, tags: ['congiuntivo trapassato', 'verbi riflessivi']
  },
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '___ il lavoro, uscì dall\'ufficio senza salutare nessuno.',
    options: [{ label: 'Finendo', value: 'Finendo' }, { label: 'Finito', value: 'Finito' }, { label: 'Avendo finito', value: 'Avendo finito' }, { label: 'Dopo finire', value: 'Dopo finire' }],
    correctAnswer: 'Avendo finito', points: 2, orderIndex: 86, tags: ['gerundio composto']
  },
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Garibaldi ___ in Sicilia nel 1860 con i Mille.',
    options: [{ label: 'sbarcò', value: 'sbarcò' }, { label: 'è sbarcato', value: 'è sbarcato' }, { label: 'sbarcava', value: 'sbarcava' }, { label: 'sbarcherebbe', value: 'sbarcherebbe' }],
    correctAnswer: 'sbarcò', points: 2, orderIndex: 87, tags: ['passato remoto']
  },
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Temevo che il treno ___ già partito.',
    options: [{ label: 'è', value: 'è' }, { label: 'fosse', value: 'fosse' }, { label: 'sia', value: 'sia' }, { label: 'sarebbe', value: 'sarebbe' }],
    correctAnswer: 'fosse', points: 2, orderIndex: 88, tags: ['congiuntivo trapassato']
  },
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Pur ___ ragione, preferì non insistere.',
    options: [{ label: 'ha', value: 'ha' }, { label: 'avendo', value: 'avendo' }, { label: 'avere', value: 'avere' }, { label: 'avuto', value: 'avuto' }],
    correctAnswer: 'avendo', points: 2, orderIndex: 89, tags: ['gerundio', 'concessivo']
  },
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Si dice che la decisione ___ presa all\'unanimità.',
    options: [{ label: 'è stata', value: 'è stata' }, { label: 'sia stata', value: 'sia stata' }, { label: 'fu', value: 'fu' }, { label: 'fosse stata', value: 'fosse stata' }],
    correctAnswer: 'sia stata', points: 2, orderIndex: 90, tags: ['congiuntivo passato', 'forma passiva']
  },

  // C2 — Congiuntivo raro, periodo ipotetico misto, passivo complesso, registro letterario (91–100)
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Quand\'anche ___ vero, non cambierebbe nulla.',
    options: [{ label: 'è', value: 'è' }, { label: 'fosse', value: 'fosse' }, { label: 'sarà', value: 'sarà' }, { label: 'sia', value: 'sia' }],
    correctAnswer: 'fosse', points: 2, orderIndex: 91, tags: ['congiuntivo imperfetto', 'quand\'anche']
  },
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Se avesse avuto più coraggio, ora ___ in una posizione migliore.',
    options: [{ label: 'è', value: 'è' }, { label: 'sarebbe', value: 'sarebbe' }, { label: 'fosse', value: 'fosse' }, { label: 'sarà', value: 'sarà' }],
    correctAnswer: 'sarebbe', points: 2, orderIndex: 92, tags: ['periodo ipotetico misto']
  },
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'La proposta, ___ approvata dal consiglio, entrerà in vigore a gennaio.',
    options: [{ label: 'qualora venga', value: 'qualora venga' }, { label: 'qualora viene', value: 'qualora viene' }, { label: 'se verrà', value: 'se verrà' }, { label: 'quando viene', value: 'quando viene' }],
    correctAnswer: 'qualora venga', points: 2, orderIndex: 93, tags: ['congiuntivo presente', 'qualora']
  },
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'L\'articolo andrebbe ___ prima della pubblicazione.',
    options: [{ label: 'rivisitato', value: 'rivisitato' }, { label: 'rivisto', value: 'rivisto' }, { label: 'riveduto', value: 'riveduto' }, { label: 'rivedere', value: 'rivedere' }],
    correctAnswer: 'rivisto', points: 2, orderIndex: 94, tags: ['condizionale', 'participio passato']
  },
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Lungi dall\'___ un problema, la diversità è una risorsa.',
    options: [{ label: 'essere', value: 'essere' }, { label: 'essendo', value: 'essendo' }, { label: 'è', value: 'è' }, { label: 'era', value: 'era' }],
    correctAnswer: 'essere', points: 2, orderIndex: 95, tags: ['registro formale', 'infinito']
  },
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Per quanto la questione ___ complessa, non ci si può sottrarre ad affrontarla.',
    options: [{ label: 'è', value: 'è' }, { label: 'sia', value: 'sia' }, { label: 'sarà', value: 'sarà' }, { label: 'fosse', value: 'fosse' }],
    correctAnswer: 'sia', points: 2, orderIndex: 96, tags: ['congiuntivo presente', 'per quanto']
  },
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Posto che le premesse ___ corrette, la conclusione è inevitabile.',
    options: [{ label: 'sono', value: 'sono' }, { label: 'siano', value: 'siano' }, { label: 'fossero', value: 'fossero' }, { label: 'saranno', value: 'saranno' }],
    correctAnswer: 'siano', points: 2, orderIndex: 97, tags: ['congiuntivo presente', 'posto che']
  },
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Il manoscritto ___ rinvenuto in circostanze del tutto fortuite.',
    options: [{ label: 'venne', value: 'venne' }, { label: 'fu', value: 'fu' }, { label: 'è stato', value: 'è stato' }, { label: 'veniva', value: 'veniva' }],
    correctAnswer: 'venne', points: 2, orderIndex: 98, tags: ['forma passiva', 'passato remoto', 'registro letterario']
  },
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Avesse anche solo ___ prima, avrebbe potuto evitare il disastro.',
    options: [{ label: 'agire', value: 'agire' }, { label: 'agito', value: 'agito' }, { label: 'agendo', value: 'agendo' }, { label: 'agisse', value: 'agisse' }],
    correctAnswer: 'agito', points: 2, orderIndex: 99, tags: ['congiuntivo trapassato', 'periodo ipotetico']
  },
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Non v\'è chi non ___ l\'importanza di tale scoperta.',
    options: [{ label: 'vede', value: 'vede' }, { label: 'veda', value: 'veda' }, { label: 'vedrebbe', value: 'vedrebbe' }, { label: 'vedesse', value: 'vedesse' }],
    correctAnswer: 'veda', points: 2, orderIndex: 100, tags: ['congiuntivo presente', 'registro letterario']
  },

  // ============================================================
  // FILL_BLANK — Grammatica (30 domande: 5 per livello QCER)
  // ============================================================

  // A1 — Coniugazione di base & articoli
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Completare: Io ___ italiano. (parlare, presente indicativo)',
    correctAnswer: 'parlo', points: 1, orderIndex: 101, tags: ['presente indicativo', 'prima coniugazione']
  },
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Completare: Noi ___ a Roma. (abitare, presente indicativo)',
    correctAnswer: 'abitiamo', points: 1, orderIndex: 102, tags: ['presente indicativo', 'prima coniugazione']
  },
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Completare: Lei ___ un gatto. (avere, presente indicativo)',
    correctAnswer: 'ha', points: 1, orderIndex: 103, tags: ['avere', 'presente indicativo']
  },
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Completare: Tu ___ molti libri. (leggere, presente indicativo)',
    correctAnswer: 'leggi', points: 1, orderIndex: 104, tags: ['presente indicativo', 'seconda coniugazione']
  },
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Completare: Ho comprato ___ libro. (articolo indeterminativo maschile)',
    correctAnswer: 'un', points: 1, orderIndex: 105, tags: ['articoli indeterminativi']
  },

  // A2 — Passato prossimo & pronomi
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Completare: Ieri Maria ___ andata al cinema. (essere, passato prossimo)',
    correctAnswer: 'è', points: 1, orderIndex: 106, tags: ['passato prossimo', 'essere']
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Completare: Noi abbiamo ___ una pizza. (mangiare, participio passato)',
    correctAnswer: 'mangiato', points: 1, orderIndex: 107, tags: ['passato prossimo', 'participio passato']
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Completare: ___ telefono domani. (pronome indiretto, a lui)',
    correctAnswer: 'Gli', points: 1, orderIndex: 108, tags: ['pronomi indiretti']
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Completare: Da bambino ___ sempre al parco. (andare, imperfetto)',
    correctAnswer: 'andavo', points: 1, orderIndex: 109, tags: ['imperfetto']
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Completare: Domani ___ al mare. (andare, futuro semplice, noi)',
    correctAnswer: 'andremo', points: 1, orderIndex: 110, tags: ['futuro semplice']
  },

  // B1 — Congiuntivo & condizionale
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Completare: Penso che lui ___ ragione. (avere, congiuntivo presente)',
    correctAnswer: 'abbia', points: 1, orderIndex: 111, tags: ['congiuntivo presente']
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Completare: Se avessi soldi, ___ una casa. (comprare, condizionale)',
    correctAnswer: 'comprerei', points: 1, orderIndex: 112, tags: ['condizionale presente', 'periodo ipotetico']
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Completare: Il libro ___ ho letto è interessante. (pronome relativo)',
    correctAnswer: 'che', points: 1, orderIndex: 113, tags: ['pronomi relativi']
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Completare: Dubito che Maria ___ la verità. (dire, congiuntivo presente)',
    correctAnswer: 'dica', points: 1, orderIndex: 114, tags: ['congiuntivo presente', 'dubitare']
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Completare: L\'amico di ___ ti ho parlato si chiama Marco. (pronome relativo)',
    correctAnswer: 'cui', points: 1, orderIndex: 115, tags: ['pronomi relativi', 'di cui']
  },

  // B2 — Strutture complesse
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Completare: Se avessi studiato, ___ superato l\'esame. (avere, condizionale passato)',
    correctAnswer: 'avrei', points: 2, orderIndex: 116, tags: ['periodo ipotetico terzo tipo']
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Completare: La casa ___ costruita nel 1800. (essere, passato prossimo passivo)',
    correctAnswer: 'è stata', points: 2, orderIndex: 117, tags: ['forma passiva', 'passato prossimo']
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Completare: Mi ha detto che ___ venuto il giorno dopo. (essere, condizionale — discorso indiretto)',
    correctAnswer: 'sarebbe', points: 2, orderIndex: 118, tags: ['discorso indiretto', 'condizionale']
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Completare: Nonostante ___ tardi, ha continuato a lavorare. (essere, congiuntivo imperfetto)',
    correctAnswer: 'fosse', points: 2, orderIndex: 119, tags: ['congiuntivo imperfetto', 'nonostante']
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Completare: Dopo ___ mangiato, siamo usciti. (avere, infinito passato)',
    correctAnswer: 'avere', points: 2, orderIndex: 120, tags: ['infinito passato']
  },

  // C1 — Forme letterarie
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Completare: Dante ___ la Divina Commedia nel XIV secolo. (scrivere, passato remoto)',
    correctAnswer: 'scrisse', points: 2, orderIndex: 121, tags: ['passato remoto']
  },
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Completare: Qualora ___ necessario, vi contatteremo. (essere, congiuntivo imperfetto)',
    correctAnswer: 'fosse', points: 2, orderIndex: 122, tags: ['congiuntivo imperfetto', 'qualora']
  },
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Completare: Per quanto ne ___, la situazione è migliorata. (sapere, congiuntivo presente)',
    correctAnswer: 'sappia', points: 2, orderIndex: 123, tags: ['congiuntivo presente', 'per quanto']
  },
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Completare: ___ finito il lavoro, andò a casa. (avere, gerundio composto)',
    correctAnswer: 'Avendo', points: 2, orderIndex: 124, tags: ['gerundio composto']
  },
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Completare: Magari ___ venire con voi! (potere, congiuntivo imperfetto)',
    correctAnswer: 'potessi', points: 2, orderIndex: 125, tags: ['congiuntivo imperfetto', 'magari']
  },

  // C2 — Distinzioni sottili
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Completare: Quand\'anche ___ vero, non cambierebbe nulla. (essere, congiuntivo imperfetto)',
    correctAnswer: 'fosse', points: 2, orderIndex: 126, tags: ['congiuntivo imperfetto', 'quand\'anche']
  },
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Completare: Colombo ___ in America nel 1492. (sbarcare, passato remoto)',
    correctAnswer: 'sbarcò', points: 2, orderIndex: 127, tags: ['passato remoto']
  },
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Completare: Posto che ___ vere le accuse, bisogna agire. (essere, congiuntivo presente, plurale)',
    correctAnswer: 'siano', points: 2, orderIndex: 128, tags: ['congiuntivo presente', 'posto che']
  },
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Completare: La legge ___ approvata dal Senato ieri. (venire, passato remoto — passivo letterario)',
    correctAnswer: 'venne', points: 2, orderIndex: 129, tags: ['forma passiva', 'passato remoto', 'registro letterario']
  },
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Completare: Non v\'è chi non ___ quanto sia importante. (vedere, congiuntivo presente)',
    correctAnswer: 'veda', points: 2, orderIndex: 130, tags: ['congiuntivo presente', 'registro letterario']
  },

  // ============================================================
  // VARIED LANGUAGE REGISTERS — 18 questions (orderIndex 131-148)
  // ============================================================

  // A1 — Varied Registers
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '[Email aziendale] "Gentile Sig. Rossi, Le ___ per confermare il nostro incontro di giovedì."',
    options: [{ label: 'scrivo', value: 'scrivo' }, { label: 'scrive', value: 'scrive' }, { label: 'scrivere', value: 'scrivere' }, { label: 'scrivi', value: 'scrivi' }],
    correctAnswer: 'scrivo', points: 1, orderIndex: 131, tags: ['presente indicativo', 'registro formale', 'email']
  },
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '[SMS] "ciao, ___ stasera?"',
    options: [{ label: 'vieni', value: 'vieni' }, { label: 'viene', value: 'viene' }, { label: 'venite', value: 'venite' }, { label: 'venire', value: 'venire' }],
    correctAnswer: 'vieni', points: 1, orderIndex: 132, tags: ['presente indicativo', 'registro informale', 'SMS']
  },
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '[Parlato colloquiale] "e lei tipo ___ fatto: ma dai, scherzi!"',
    options: [{ label: 'ha', value: 'ha' }, { label: 'è', value: 'è' }, { label: 'fa', value: 'fa' }, { label: 'aveva', value: 'aveva' }],
    correctAnswer: 'ha', points: 1, orderIndex: 133, tags: ['passato prossimo', 'registro colloquiale', 'parlato']
  },

  // A2 — Varied Registers
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '[Reclamo formale] "Desidero ___ un reclamo riguardo al servizio ricevuto ieri."',
    options: [{ label: 'presentare', value: 'presentare' }, { label: 'fare', value: 'fare' }, { label: 'dare', value: 'dare' }, { label: 'mettere', value: 'mettere' }],
    correctAnswer: 'presentare', points: 1, orderIndex: 134, tags: ['infinito', 'registro formale', 'reclamo']
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '[WhatsApp] "appena ___ a casa, che fai?"',
    options: [{ label: 'arrivato', value: 'arrivato' }, { label: 'arrivo', value: 'arrivo' }, { label: 'arrivare', value: 'arrivare' }, { label: 'arrivavo', value: 'arrivavo' }],
    correctAnswer: 'arrivato', points: 1, orderIndex: 135, tags: ['passato prossimo', 'registro informale', 'chat']
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '[Telefonata] "Potrebbe ___ all\'ufficio commerciale, per favore?"',
    options: [{ label: 'passarmi', value: 'passarmi' }, { label: 'portarmi', value: 'portarmi' }, { label: 'darmi', value: 'darmi' }, { label: 'prendermi', value: 'prendermi' }],
    correctAnswer: 'passarmi', points: 1, orderIndex: 136, tags: ['infinito', 'registro formale', 'telefono']
  },

  // B1 — Varied Registers
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '[Presentazione aziendale] "Come potete vedere dai dati, le vendite ___ del 15% in questo trimestre."',
    options: [{ label: 'sono aumentate', value: 'sono aumentate' }, { label: 'aumentavano', value: 'aumentavano' }, { label: 'aumentano', value: 'aumentano' }, { label: 'erano aumentate', value: 'erano aumentate' }],
    correctAnswer: 'sono aumentate', points: 1, orderIndex: 137, tags: ['passato prossimo', 'registro formale', 'presentazione']
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '[Social Media] "Non ci credo, ___ aumentato di nuovo il prezzo!! #inflazione"',
    options: [{ label: 'hanno', value: 'hanno' }, { label: 'avevano', value: 'avevano' }, { label: 'avranno', value: 'avranno' }, { label: 'ebbero', value: 'ebbero' }],
    correctAnswer: 'hanno', points: 1, orderIndex: 138, tags: ['passato prossimo', 'registro informale', 'social media']
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '[Titolo di giornale] "Il ministro ___ a dimettersi dopo lo scandalo"',
    options: [{ label: 'costretto', value: 'costretto' }, { label: 'è costretto', value: 'è costretto' }, { label: 'costringe', value: 'costringe' }, { label: 'costringeva', value: 'costringeva' }],
    correctAnswer: 'costretto', points: 1, orderIndex: 139, tags: ['participio passato', 'registro giornalistico', 'titolo']
  },

  // B2 — Varied Registers
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '[Contratto legale] "L\'inquilino ___ con la presente di accettare i termini e le condizioni stabiliti nel presente contratto."',
    options: [{ label: 'si impegna', value: 'si impegna' }, { label: 'impegna', value: 'impegna' }, { label: 'impegnerà', value: 'impegnerà' }, { label: 'impegnerebbe', value: 'impegnerebbe' }],
    correctAnswer: 'si impegna', points: 2, orderIndex: 140, tags: ['presente indicativo', 'registro giuridico', 'contratto']
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '[Giornalismo] "Non ___ stato per l\'intervento dell\'ultimo minuto, l\'accordo sarebbe crollato."',
    options: [{ label: 'fosse', value: 'fosse' }, { label: 'era', value: 'era' }, { label: 'sarebbe', value: 'sarebbe' }, { label: 'è', value: 'è' }],
    correctAnswer: 'fosse', points: 2, orderIndex: 141, tags: ['congiuntivo imperfetto', 'registro giornalistico', 'condizionale']
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '[Ironico/Sarcastico] "Ma certo, ___ tutti adorano le riunioni del lunedì mattina."',
    options: [{ label: 'ovviamente', value: 'ovviamente' }, { label: 'apparentemente', value: 'apparentemente' }, { label: 'presumibilmente', value: 'presumibilmente' }, { label: 'sicuramente', value: 'sicuramente' }],
    correctAnswer: 'ovviamente', points: 2, orderIndex: 142, tags: ['avverbi', 'registro sarcastico', 'parlato']
  },

  // C1 — Varied Registers
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '[Articolo accademico] "I risultati ___ confermati da tre studi successivi sottoposti a revisione paritaria."',
    options: [{ label: 'sono stati', value: 'sono stati' }, { label: 'erano', value: 'erano' }, { label: 'furono', value: 'furono' }, { label: 'sarebbero', value: 'sarebbero' }],
    correctAnswer: 'sono stati', points: 2, orderIndex: 143, tags: ['forma passiva', 'registro accademico', 'ricerca']
  },
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '[Diplomatico] "La delegazione ___ esprimere le proprie riserve riguardo all\'emendamento proposto."',
    options: [{ label: 'desidera', value: 'desidera' }, { label: 'vuole', value: 'vuole' }, { label: 'preferisce', value: 'preferisce' }, { label: 'deve', value: 'deve' }],
    correctAnswer: 'desidera', points: 2, orderIndex: 144, tags: ['presente indicativo', 'registro diplomatico', 'politica']
  },
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '[Letterario] "Non appena ___ pronunciato quelle parole, il cielo si oscurò."',
    options: [{ label: 'ebbe', value: 'ebbe' }, { label: 'aveva', value: 'aveva' }, { label: 'ha', value: 'ha' }, { label: 'fu', value: 'fu' }],
    correctAnswer: 'ebbe', points: 2, orderIndex: 145, tags: ['trapassato remoto', 'registro letterario', 'narrazione']
  },

  // C2 — Varied Registers
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '[Giuridico arcaico] "Fermo restando quanto sopra esposto, la parte ___ ritenuta responsabile per qualsiasi danno."',
    options: [{ label: 'sarà', value: 'sarà' }, { label: 'sarebbe', value: 'sarebbe' }, { label: 'è', value: 'è' }, { label: 'verrà', value: 'verrà' }],
    correctAnswer: 'sarà', points: 2, orderIndex: 146, tags: ['futuro semplice', 'registro giuridico arcaico', 'responsabilità']
  },
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '[Gergo/Dialettale] "Quello se n\'è proprio ___ senza manco salutare, ammazza!"',
    options: [{ label: 'andato', value: 'andato' }, { label: 'ito', value: 'ito' }, { label: 'partito', value: 'partito' }, { label: 'scappato', value: 'scappato' }],
    correctAnswer: 'andato', points: 2, orderIndex: 147, tags: ['passato prossimo', 'registro dialettale', 'romanesco']
  },
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '[Retorico/Oratorio] "Non solo abbiamo ___, ma abbiamo fallito in modo spettacolare e senza rimorso."',
    options: [{ label: 'fallito', value: 'fallito' }, { label: 'fallire', value: 'fallire' }, { label: 'fallendo', value: 'fallendo' }, { label: 'falliti', value: 'falliti' }],
    correctAnswer: 'fallito', points: 2, orderIndex: 148, tags: ['participio passato', 'registro oratorio', 'retorica']
  },
]
