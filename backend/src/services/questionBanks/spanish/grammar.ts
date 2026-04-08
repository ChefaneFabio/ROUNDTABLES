import { MultiSkillQuestionData } from '../types'

// Spanish Grammar MCQ Questions — 100 questions
// Distributed across A1-C2 levels

export const spanishGrammarQuestions: MultiSkillQuestionData[] = [
  // ============================================================
  // A1 — Beginner (8 questions)
  // ============================================================
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Ella ___ estudiante.',
    options: [{ label: 'soy', value: 'soy' }, { label: 'es', value: 'es' }, { label: 'eres', value: 'eres' }, { label: 'están', value: 'están' }],
    correctAnswer: 'es', points: 1, orderIndex: 1, tags: ['ser', 'present']
  },
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Nosotros ___ en Madrid.',
    options: [{ label: 'somos', value: 'somos' }, { label: 'estamos', value: 'estamos' }, { label: 'son', value: 'son' }, { label: 'están', value: 'están' }],
    correctAnswer: 'estamos', points: 1, orderIndex: 2, tags: ['estar', 'location']
  },
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Yo ___ dos hermanos.',
    options: [{ label: 'tiene', value: 'tiene' }, { label: 'tengo', value: 'tengo' }, { label: 'tienes', value: 'tienes' }, { label: 'tenemos', value: 'tenemos' }],
    correctAnswer: 'tengo', points: 1, orderIndex: 3, tags: ['tener', 'present']
  },
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '___ libros son interesantes.',
    options: [{ label: 'El', value: 'El' }, { label: 'La', value: 'La' }, { label: 'Los', value: 'Los' }, { label: 'Las', value: 'Las' }],
    correctAnswer: 'Los', points: 1, orderIndex: 4, tags: ['articles', 'plural']
  },
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Mi madre ___ en un hospital.',
    options: [{ label: 'trabajo', value: 'trabajo' }, { label: 'trabajas', value: 'trabajas' }, { label: 'trabaja', value: 'trabaja' }, { label: 'trabajan', value: 'trabajan' }],
    correctAnswer: 'trabaja', points: 1, orderIndex: 5, tags: ['present', 'regular -ar verbs']
  },
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '¿Dónde ___ la estación de tren?',
    options: [{ label: 'es', value: 'es' }, { label: 'está', value: 'está' }, { label: 'hay', value: 'hay' }, { label: 'son', value: 'son' }],
    correctAnswer: 'está', points: 1, orderIndex: 6, tags: ['estar', 'location', 'questions']
  },
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Me gusta ___ música.',
    options: [{ label: 'el', value: 'el' }, { label: 'la', value: 'la' }, { label: 'un', value: 'un' }, { label: 'una', value: 'una' }],
    correctAnswer: 'la', points: 1, orderIndex: 7, tags: ['articles', 'gustar']
  },
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Ellos ___ españoles.',
    options: [{ label: 'es', value: 'es' }, { label: 'somos', value: 'somos' }, { label: 'son', value: 'son' }, { label: 'están', value: 'están' }],
    correctAnswer: 'son', points: 1, orderIndex: 8, tags: ['ser', 'nationality']
  },

  // ============================================================
  // A2 — Elementary (8 questions)
  // ============================================================
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Ayer yo ___ al supermercado.',
    options: [{ label: 'voy', value: 'voy' }, { label: 'fui', value: 'fui' }, { label: 'iba', value: 'iba' }, { label: 'iré', value: 'iré' }],
    correctAnswer: 'fui', points: 1, orderIndex: 9, tags: ['preterite', 'ir']
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Cuando era niño, ___ al parque todos los días.',
    options: [{ label: 'fui', value: 'fui' }, { label: 'iba', value: 'iba' }, { label: 'voy', value: 'voy' }, { label: 'iré', value: 'iré' }],
    correctAnswer: 'iba', points: 1, orderIndex: 10, tags: ['imperfect', 'habitual past']
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Madrid es ___ grande ___ Barcelona.',
    options: [{ label: 'más / que', value: 'más / que' }, { label: 'más / de', value: 'más / de' }, { label: 'tan / que', value: 'tan / que' }, { label: 'mejor / que', value: 'mejor / que' }],
    correctAnswer: 'más / que', points: 1, orderIndex: 11, tags: ['comparatives']
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'A ella ___ gustan los gatos.',
    options: [{ label: 'le', value: 'le' }, { label: 'la', value: 'la' }, { label: 'les', value: 'les' }, { label: 'se', value: 'se' }],
    correctAnswer: 'le', points: 1, orderIndex: 12, tags: ['gustar', 'indirect object pronouns']
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Mañana ___ a la playa.',
    options: [{ label: 'vamos', value: 'vamos' }, { label: 'fuimos', value: 'fuimos' }, { label: 'iremos', value: 'iremos' }, { label: 'íbamos', value: 'íbamos' }],
    correctAnswer: 'iremos', points: 1, orderIndex: 13, tags: ['future simple', 'ir']
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Él ___ comiendo cuando llegué.',
    options: [{ label: 'es', value: 'es' }, { label: 'está', value: 'está' }, { label: 'estaba', value: 'estaba' }, { label: 'fue', value: 'fue' }],
    correctAnswer: 'estaba', points: 1, orderIndex: 14, tags: ['imperfect', 'progressive']
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '¿ ___ has viajado a otro país?',
    options: [{ label: 'Nunca', value: 'Nunca' }, { label: 'Alguna vez', value: 'Alguna vez' }, { label: 'Siempre', value: 'Siempre' }, { label: 'Ya', value: 'Ya' }],
    correctAnswer: 'Alguna vez', points: 1, orderIndex: 15, tags: ['present perfect', 'experience']
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Este libro es ___ interesante de todos.',
    options: [{ label: 'más', value: 'más' }, { label: 'el más', value: 'el más' }, { label: 'muy', value: 'muy' }, { label: 'tan', value: 'tan' }],
    correctAnswer: 'el más', points: 1, orderIndex: 16, tags: ['superlatives']
  },

  // ============================================================
  // B1 — Intermediate (8 questions)
  // ============================================================
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Espero que tú ___ a la fiesta.',
    options: [{ label: 'vienes', value: 'vienes' }, { label: 'vengas', value: 'vengas' }, { label: 'vendrás', value: 'vendrás' }, { label: 'viniste', value: 'viniste' }],
    correctAnswer: 'vengas', points: 1, orderIndex: 17, tags: ['present subjunctive', 'esperar que']
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Si tuviera dinero, ___ un coche nuevo.',
    options: [{ label: 'compro', value: 'compro' }, { label: 'compraré', value: 'compraré' }, { label: 'compraría', value: 'compraría' }, { label: 'compré', value: 'compré' }],
    correctAnswer: 'compraría', points: 1, orderIndex: 18, tags: ['conditional', 'si clauses']
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'No creo que él ___ razón.',
    options: [{ label: 'tiene', value: 'tiene' }, { label: 'tenga', value: 'tenga' }, { label: 'tendrá', value: 'tendrá' }, { label: 'tuvo', value: 'tuvo' }],
    correctAnswer: 'tenga', points: 1, orderIndex: 19, tags: ['subjunctive', 'doubt']
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Cuando ___ a casa, te llamaré.',
    options: [{ label: 'llego', value: 'llego' }, { label: 'llegue', value: 'llegue' }, { label: 'llegaré', value: 'llegaré' }, { label: 'llegué', value: 'llegué' }],
    correctAnswer: 'llegue', points: 1, orderIndex: 20, tags: ['subjunctive', 'temporal clauses']
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Ya habíamos ___ cuando empezó a llover.',
    options: [{ label: 'salido', value: 'salido' }, { label: 'salir', value: 'salir' }, { label: 'saliendo', value: 'saliendo' }, { label: 'salimos', value: 'salimos' }],
    correctAnswer: 'salido', points: 1, orderIndex: 21, tags: ['pluperfect', 'past participle']
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Me pidió que le ___ la verdad.',
    options: [{ label: 'digo', value: 'digo' }, { label: 'dijera', value: 'dijera' }, { label: 'diré', value: 'diré' }, { label: 'dije', value: 'dije' }],
    correctAnswer: 'dijera', points: 1, orderIndex: 22, tags: ['imperfect subjunctive', 'reported speech']
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Es importante que los estudiantes ___ todos los días.',
    options: [{ label: 'estudian', value: 'estudian' }, { label: 'estudien', value: 'estudien' }, { label: 'estudiarán', value: 'estudiarán' }, { label: 'estudiaron', value: 'estudiaron' }],
    correctAnswer: 'estudien', points: 1, orderIndex: 23, tags: ['subjunctive', 'impersonal expressions']
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Si llueve, no ___ al parque.',
    options: [{ label: 'vamos', value: 'vamos' }, { label: 'iremos', value: 'iremos' }, { label: 'fuimos', value: 'fuimos' }, { label: 'iríamos', value: 'iríamos' }],
    correctAnswer: 'iremos', points: 1, orderIndex: 24, tags: ['first conditional', 'si + present']
  },

  // ============================================================
  // B2 — Upper Intermediate (8 questions)
  // ============================================================
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Si hubiera estudiado más, ___ el examen.',
    options: [{ label: 'aprobaría', value: 'aprobaría' }, { label: 'habría aprobado', value: 'habría aprobado' }, { label: 'aprobé', value: 'aprobé' }, { label: 'apruebo', value: 'apruebo' }],
    correctAnswer: 'habría aprobado', points: 1, orderIndex: 25, tags: ['past conditional', 'si clauses']
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'El edificio ___ construido en 1920.',
    options: [{ label: 'es', value: 'es' }, { label: 'fue', value: 'fue' }, { label: 'está', value: 'está' }, { label: 'ha', value: 'ha' }],
    correctAnswer: 'fue', points: 1, orderIndex: 26, tags: ['passive voice', 'ser']
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Dudo que ellos ___ terminado el proyecto a tiempo.',
    options: [{ label: 'han', value: 'han' }, { label: 'hayan', value: 'hayan' }, { label: 'habrán', value: 'habrán' }, { label: 'habían', value: 'habían' }],
    correctAnswer: 'hayan', points: 1, orderIndex: 27, tags: ['present perfect subjunctive']
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'No habría venido si ___ que estabas enfermo.',
    options: [{ label: 'sabía', value: 'sabía' }, { label: 'hubiera sabido', value: 'hubiera sabido' }, { label: 'supe', value: 'supe' }, { label: 'sepa', value: 'sepa' }],
    correctAnswer: 'hubiera sabido', points: 1, orderIndex: 28, tags: ['pluperfect subjunctive', 'si clauses']
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Aquí se ___ español.',
    options: [{ label: 'habla', value: 'habla' }, { label: 'hablan', value: 'hablan' }, { label: 'hable', value: 'hable' }, { label: 'hablando', value: 'hablando' }],
    correctAnswer: 'habla', points: 1, orderIndex: 29, tags: ['passive se', 'impersonal']
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Ojalá ___ más tiempo para viajar.',
    options: [{ label: 'tengo', value: 'tengo' }, { label: 'tuviera', value: 'tuviera' }, { label: 'tendré', value: 'tendré' }, { label: 'tenía', value: 'tenía' }],
    correctAnswer: 'tuviera', points: 1, orderIndex: 30, tags: ['ojalá', 'imperfect subjunctive']
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Por mucho que ___, no logró convencerme.',
    options: [{ label: 'insistió', value: 'insistió' }, { label: 'insistiera', value: 'insistiera' }, { label: 'insiste', value: 'insiste' }, { label: 'insistirá', value: 'insistirá' }],
    correctAnswer: 'insistiera', points: 1, orderIndex: 31, tags: ['concessive clauses', 'subjunctive']
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Cuanto más estudias, ___ resultados obtienes.',
    options: [{ label: 'más', value: 'más' }, { label: 'mejores', value: 'mejores' }, { label: 'mejor', value: 'mejor' }, { label: 'los mejores', value: 'los mejores' }],
    correctAnswer: 'mejores', points: 1, orderIndex: 32, tags: ['correlative comparatives']
  },

  // ============================================================
  // C1 — Advanced (4 questions)
  // ============================================================
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'De haberlo sabido, no ___ aceptado el trabajo.',
    options: [{ label: 'había', value: 'había' }, { label: 'hubiera', value: 'hubiera' }, { label: 'habría', value: 'habría' }, { label: 'haya', value: 'haya' }],
    correctAnswer: 'habría', points: 1, orderIndex: 33, tags: ['de + infinitive', 'conditional perfect']
  },
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Sea cual ___ tu decisión, te apoyaré.',
    options: [{ label: 'sea', value: 'sea' }, { label: 'fuera', value: 'fuera' }, { label: 'es', value: 'es' }, { label: 'será', value: 'será' }],
    correctAnswer: 'sea', points: 1, orderIndex: 34, tags: ['reduplicative subjunctive', 'concessive']
  },
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'El informe ___ ser entregado antes del viernes.',
    options: [{ label: 'ha de', value: 'ha de' }, { label: 'ha a', value: 'ha a' }, { label: 'tiene que', value: 'tiene que' }, { label: 'hay de', value: 'hay de' }],
    correctAnswer: 'ha de', points: 1, orderIndex: 35, tags: ['haber de + infinitive', 'obligation']
  },
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'No bien ___ la noticia, salió corriendo.',
    options: [{ label: 'supo', value: 'supo' }, { label: 'sabía', value: 'sabía' }, { label: 'sepa', value: 'sepa' }, { label: 'supiera', value: 'supiera' }],
    correctAnswer: 'supo', points: 1, orderIndex: 36, tags: ['no bien', 'preterite', 'temporal clauses']
  },

  // ============================================================
  // C2 — Proficiency (4 questions)
  // ============================================================
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Quienquiera que ___ la verdad, deberá enfrentar las consecuencias.',
    options: [{ label: 'sabe', value: 'sabe' }, { label: 'sepa', value: 'sepa' }, { label: 'supiera', value: 'supiera' }, { label: 'sabrá', value: 'sabrá' }],
    correctAnswer: 'sepa', points: 1, orderIndex: 37, tags: ['quienquiera que', 'subjunctive']
  },
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Dicho ___ de otro modo, la empresa está en quiebra.',
    options: [{ label: 'esto', value: 'esto' }, { label: 'sea', value: 'sea' }, { label: 'lo', value: 'lo' }, { label: 'así', value: 'así' }],
    correctAnswer: 'sea', points: 1, orderIndex: 38, tags: ['dicho sea', 'fixed expressions']
  },
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Hubiere o no hubiere ___ testigos, la ley debe cumplirse.',
    options: [{ label: 'habido', value: 'habido' }, { label: 'sido', value: 'sido' }, { label: 'tenido', value: 'tenido' }, { label: 'estado', value: 'estado' }],
    correctAnswer: 'habido', points: 1, orderIndex: 39, tags: ['future subjunctive', 'legal register']
  },
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'A no ser que se ___ medidas urgentes, la situación empeorará.',
    options: [{ label: 'toman', value: 'toman' }, { label: 'tomen', value: 'tomen' }, { label: 'tomarán', value: 'tomarán' }, { label: 'tomaron', value: 'tomaron' }],
    correctAnswer: 'tomen', points: 1, orderIndex: 40, tags: ['a no ser que', 'subjunctive', 'formal register']
  },

  // ============================================================
  // NEW QUESTIONS — 60 additional (orderIndex 41–100)
  // ============================================================

  // ── A1 — 10 more questions (41–50) ──────────────────────────
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Yo ___ de México.',
    options: [{ label: 'soy', value: 'soy' }, { label: 'estoy', value: 'estoy' }, { label: 'es', value: 'es' }, { label: 'está', value: 'está' }],
    correctAnswer: 'soy', points: 1, orderIndex: 41, tags: ['ser', 'origin']
  },
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'La manzana ___ roja.',
    options: [{ label: 'es', value: 'es' }, { label: 'está', value: 'está' }, { label: 'son', value: 'son' }, { label: 'están', value: 'están' }],
    correctAnswer: 'es', points: 1, orderIndex: 42, tags: ['ser', 'description']
  },
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '¿Tú ___ café o té?',
    options: [{ label: 'quieres', value: 'quieres' }, { label: 'quiere', value: 'quiere' }, { label: 'quiero', value: 'quiero' }, { label: 'queremos', value: 'queremos' }],
    correctAnswer: 'quieres', points: 1, orderIndex: 43, tags: ['present', 'querer']
  },
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Nosotros ___ en una casa grande.',
    options: [{ label: 'vive', value: 'vive' }, { label: 'vivimos', value: 'vivimos' }, { label: 'viven', value: 'viven' }, { label: 'vives', value: 'vives' }],
    correctAnswer: 'vivimos', points: 1, orderIndex: 44, tags: ['present', 'regular -ir verbs']
  },
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '___ silla es cómoda.',
    options: [{ label: 'El', value: 'El' }, { label: 'La', value: 'La' }, { label: 'Los', value: 'Los' }, { label: 'Las', value: 'Las' }],
    correctAnswer: 'La', points: 1, orderIndex: 45, tags: ['articles', 'gender']
  },
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'María ___ contenta hoy.',
    options: [{ label: 'es', value: 'es' }, { label: 'está', value: 'está' }, { label: 'son', value: 'son' }, { label: 'están', value: 'están' }],
    correctAnswer: 'está', points: 1, orderIndex: 46, tags: ['estar', 'emotions']
  },
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Yo ___ español y francés.',
    options: [{ label: 'hablo', value: 'hablo' }, { label: 'habla', value: 'habla' }, { label: 'hablas', value: 'hablas' }, { label: 'hablan', value: 'hablan' }],
    correctAnswer: 'hablo', points: 1, orderIndex: 47, tags: ['present', 'regular -ar verbs']
  },
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '¿ ___ se llama tu profesor?',
    options: [{ label: 'Cómo', value: 'Cómo' }, { label: 'Dónde', value: 'Dónde' }, { label: 'Cuándo', value: 'Cuándo' }, { label: 'Qué', value: 'Qué' }],
    correctAnswer: 'Cómo', points: 1, orderIndex: 48, tags: ['questions', 'interrogatives']
  },
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'El agua ___ fría.',
    options: [{ label: 'es', value: 'es' }, { label: 'está', value: 'está' }, { label: 'son', value: 'son' }, { label: 'están', value: 'están' }],
    correctAnswer: 'está', points: 1, orderIndex: 49, tags: ['estar', 'temporary states']
  },
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Mis padres ___ en el jardín.',
    options: [{ label: 'es', value: 'es' }, { label: 'está', value: 'está' }, { label: 'son', value: 'son' }, { label: 'están', value: 'están' }],
    correctAnswer: 'están', points: 1, orderIndex: 50, tags: ['estar', 'location', 'plural']
  },

  // ── A2 — 10 more questions (51–60) ──────────────────────────
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'El año pasado ___ mucho.',
    options: [{ label: 'llovió', value: 'llovió' }, { label: 'llovía', value: 'llovía' }, { label: 'llueve', value: 'llueve' }, { label: 'lloverá', value: 'lloverá' }],
    correctAnswer: 'llovió', points: 1, orderIndex: 51, tags: ['preterite', 'weather']
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'De niño, yo ___ mucho helado.',
    options: [{ label: 'comí', value: 'comí' }, { label: 'comía', value: 'comía' }, { label: 'como', value: 'como' }, { label: 'comeré', value: 'comeré' }],
    correctAnswer: 'comía', points: 1, orderIndex: 52, tags: ['imperfect', 'habitual past']
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '___ doy el regalo a mi madre.',
    options: [{ label: 'Le', value: 'Le' }, { label: 'La', value: 'La' }, { label: 'Lo', value: 'Lo' }, { label: 'Les', value: 'Les' }],
    correctAnswer: 'Le', points: 1, orderIndex: 53, tags: ['indirect object pronouns']
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'María es ___ alta ___ su hermana.',
    options: [{ label: 'tan / como', value: 'tan / como' }, { label: 'más / como', value: 'más / como' }, { label: 'tan / que', value: 'tan / que' }, { label: 'más / de', value: 'más / de' }],
    correctAnswer: 'tan / como', points: 1, orderIndex: 54, tags: ['comparatives', 'equality']
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Ya ___ comido cuando llamaste.',
    options: [{ label: 'he', value: 'he' }, { label: 'había', value: 'había' }, { label: 'hemos', value: 'hemos' }, { label: 'habré', value: 'habré' }],
    correctAnswer: 'había', points: 1, orderIndex: 55, tags: ['pluperfect']
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '¿ ___ quién es este libro?',
    options: [{ label: 'De', value: 'De' }, { label: 'A', value: 'A' }, { label: 'En', value: 'En' }, { label: 'Por', value: 'Por' }],
    correctAnswer: 'De', points: 1, orderIndex: 56, tags: ['prepositions', 'possession']
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Estoy ___ a cocinar.',
    options: [{ label: 'aprendiendo', value: 'aprendiendo' }, { label: 'aprendido', value: 'aprendido' }, { label: 'aprender', value: 'aprender' }, { label: 'aprendo', value: 'aprendo' }],
    correctAnswer: 'aprendiendo', points: 1, orderIndex: 57, tags: ['present progressive', 'gerund']
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'El libro ___ compré es muy bueno.',
    options: [{ label: 'que', value: 'que' }, { label: 'quien', value: 'quien' }, { label: 'cual', value: 'cual' }, { label: 'donde', value: 'donde' }],
    correctAnswer: 'que', points: 1, orderIndex: 58, tags: ['relative pronouns']
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Voy ___ estudiar esta noche.',
    options: [{ label: 'a', value: 'a' }, { label: 'de', value: 'de' }, { label: 'en', value: 'en' }, { label: 'por', value: 'por' }],
    correctAnswer: 'a', points: 1, orderIndex: 59, tags: ['ir a + infinitive', 'future']
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Anoche ___ una película muy interesante.',
    options: [{ label: 'vi', value: 'vi' }, { label: 'veía', value: 'veía' }, { label: 'veo', value: 'veo' }, { label: 'veré', value: 'veré' }],
    correctAnswer: 'vi', points: 1, orderIndex: 60, tags: ['preterite', 'irregular verbs']
  },

  // ── B1 — 10 more questions (61–70) ──────────────────────────
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Quiero que ___ la verdad.',
    options: [{ label: 'dices', value: 'dices' }, { label: 'digas', value: 'digas' }, { label: 'dirás', value: 'dirás' }, { label: 'dijiste', value: 'dijiste' }],
    correctAnswer: 'digas', points: 1, orderIndex: 61, tags: ['present subjunctive', 'querer que']
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Si ___ tiempo, iré al gimnasio.',
    options: [{ label: 'tengo', value: 'tengo' }, { label: 'tuviera', value: 'tuviera' }, { label: 'tendré', value: 'tendré' }, { label: 'tenga', value: 'tenga' }],
    correctAnswer: 'tengo', points: 1, orderIndex: 62, tags: ['first conditional', 'si + present']
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Me alegro de que ___ venido.',
    options: [{ label: 'has', value: 'has' }, { label: 'hayas', value: 'hayas' }, { label: 'habías', value: 'habías' }, { label: 'habrás', value: 'habrás' }],
    correctAnswer: 'hayas', points: 1, orderIndex: 63, tags: ['present perfect subjunctive', 'emotions']
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Si fuera rico, ___ por todo el mundo.',
    options: [{ label: 'viajo', value: 'viajo' }, { label: 'viajaría', value: 'viajaría' }, { label: 'viajaré', value: 'viajaré' }, { label: 'viajé', value: 'viajé' }],
    correctAnswer: 'viajaría', points: 1, orderIndex: 64, tags: ['conditional', 'si clauses']
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'El profesor nos dijo que ___ el capítulo tres.',
    options: [{ label: 'leemos', value: 'leemos' }, { label: 'leyéramos', value: 'leyéramos' }, { label: 'leeremos', value: 'leeremos' }, { label: 'leímos', value: 'leímos' }],
    correctAnswer: 'leyéramos', points: 1, orderIndex: 65, tags: ['imperfect subjunctive', 'reported speech']
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '___ lo hice yo solo.',
    options: [{ label: 'Se', value: 'Se' }, { label: 'Me', value: 'Me' }, { label: 'Lo', value: 'Lo' }, { label: 'Le', value: 'Le' }],
    correctAnswer: 'Lo', points: 1, orderIndex: 66, tags: ['direct object pronouns']
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Busco un piso que ___ cerca del centro.',
    options: [{ label: 'está', value: 'está' }, { label: 'esté', value: 'esté' }, { label: 'estará', value: 'estará' }, { label: 'estaba', value: 'estaba' }],
    correctAnswer: 'esté', points: 1, orderIndex: 67, tags: ['subjunctive', 'relative clauses']
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Mientras ___ , sonó el teléfono.',
    options: [{ label: 'cociné', value: 'cociné' }, { label: 'cocinaba', value: 'cocinaba' }, { label: 'cocino', value: 'cocino' }, { label: 'cocinaré', value: 'cocinaré' }],
    correctAnswer: 'cocinaba', points: 1, orderIndex: 68, tags: ['imperfect', 'while']
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Estos documentos deben ___ firmados por el director.',
    options: [{ label: 'ser', value: 'ser' }, { label: 'estar', value: 'estar' }, { label: 'haber', value: 'haber' }, { label: 'tener', value: 'tener' }],
    correctAnswer: 'ser', points: 1, orderIndex: 69, tags: ['passive voice', 'ser']
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Te lo explico ___ que lo entiendas.',
    options: [{ label: 'para', value: 'para' }, { label: 'por', value: 'por' }, { label: 'de', value: 'de' }, { label: 'a', value: 'a' }],
    correctAnswer: 'para', points: 1, orderIndex: 70, tags: ['prepositions', 'para vs por']
  },

  // ── B2 — 10 more questions (71–80) ──────────────────────────
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Si hubieras llegado a tiempo, no ___ perdido el tren.',
    options: [{ label: 'habrías', value: 'habrías' }, { label: 'hubieras', value: 'hubieras' }, { label: 'habías', value: 'habías' }, { label: 'habrás', value: 'habrás' }],
    correctAnswer: 'habrías', points: 2, orderIndex: 71, tags: ['conditional perfect', 'si clauses']
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'La carta ___ escrita por el abogado ayer.',
    options: [{ label: 'fue', value: 'fue' }, { label: 'era', value: 'era' }, { label: 'ha sido', value: 'ha sido' }, { label: 'es', value: 'es' }],
    correctAnswer: 'fue', points: 2, orderIndex: 72, tags: ['passive voice', 'preterite']
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Me dijo que ___ al médico la semana siguiente.',
    options: [{ label: 'va', value: 'va' }, { label: 'iría', value: 'iría' }, { label: 'fue', value: 'fue' }, { label: 'iba', value: 'iba' }],
    correctAnswer: 'iría', points: 2, orderIndex: 73, tags: ['reported speech', 'conditional']
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'La persona ___ hablé ayer es la directora.',
    options: [{ label: 'con la que', value: 'con la que' }, { label: 'que', value: 'que' }, { label: 'la que', value: 'la que' }, { label: 'con que', value: 'con que' }],
    correctAnswer: 'con la que', points: 2, orderIndex: 74, tags: ['relative clauses', 'preposition + relative']
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Es posible que mañana ___ .',
    options: [{ label: 'llueve', value: 'llueve' }, { label: 'llueva', value: 'llueva' }, { label: 'llovió', value: 'llovió' }, { label: 'lloverá', value: 'lloverá' }],
    correctAnswer: 'llueva', points: 2, orderIndex: 75, tags: ['subjunctive', 'impersonal expressions']
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'No habría ido de vacaciones ___ hubiera sabido lo caro que era.',
    options: [{ label: 'si', value: 'si' }, { label: 'cuando', value: 'cuando' }, { label: 'aunque', value: 'aunque' }, { label: 'porque', value: 'porque' }],
    correctAnswer: 'si', points: 2, orderIndex: 76, tags: ['si clauses', 'conditional perfect']
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Se ___ muchos libros en esa librería.',
    options: [{ label: 'vende', value: 'vende' }, { label: 'venden', value: 'venden' }, { label: 'vendió', value: 'vendió' }, { label: 'vendía', value: 'vendía' }],
    correctAnswer: 'venden', points: 2, orderIndex: 77, tags: ['passive se', 'plural agreement']
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Aunque ___ cansado, seguí trabajando.',
    options: [{ label: 'estaba', value: 'estaba' }, { label: 'estuviera', value: 'estuviera' }, { label: 'esté', value: 'esté' }, { label: 'estaré', value: 'estaré' }],
    correctAnswer: 'estaba', points: 2, orderIndex: 78, tags: ['concessive clauses', 'although + indicative']
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Le rogué que ___ pronto.',
    options: [{ label: 'vuelve', value: 'vuelve' }, { label: 'volviera', value: 'volviera' }, { label: 'volverá', value: 'volverá' }, { label: 'volvió', value: 'volvió' }],
    correctAnswer: 'volviera', points: 2, orderIndex: 79, tags: ['imperfect subjunctive', 'reported speech']
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Esta es la ciudad ___ nací.',
    options: [{ label: 'donde', value: 'donde' }, { label: 'que', value: 'que' }, { label: 'cual', value: 'cual' }, { label: 'quien', value: 'quien' }],
    correctAnswer: 'donde', points: 2, orderIndex: 80, tags: ['relative clauses', 'donde']
  },

  // ── C1 — 10 more questions (81–90) ──────────────────────────
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'A no ser que ___ una solución, tendremos que cancelar el evento.',
    options: [{ label: 'encontramos', value: 'encontramos' }, { label: 'encontremos', value: 'encontremos' }, { label: 'encontraremos', value: 'encontraremos' }, { label: 'encontrábamos', value: 'encontrábamos' }],
    correctAnswer: 'encontremos', points: 2, orderIndex: 81, tags: ['subjunctive', 'a no ser que']
  },
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Habría preferido que me lo ___ antes.',
    options: [{ label: 'dijeras', value: 'dijeras' }, { label: 'hubieras dicho', value: 'hubieras dicho' }, { label: 'dirías', value: 'dirías' }, { label: 'digas', value: 'digas' }],
    correctAnswer: 'hubieras dicho', points: 2, orderIndex: 82, tags: ['pluperfect subjunctive', 'preferences']
  },
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Cuanto más lo pienso, menos ___ entiendo.',
    options: [{ label: 'le', value: 'le' }, { label: 'lo', value: 'lo' }, { label: 'la', value: 'la' }, { label: 'se', value: 'se' }],
    correctAnswer: 'lo', points: 2, orderIndex: 83, tags: ['direct object pronouns', 'correlative comparatives']
  },
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'El proyecto se llevó a cabo ___ grandes dificultades.',
    options: [{ label: 'a pesar de', value: 'a pesar de' }, { label: 'gracias a', value: 'gracias a' }, { label: 'en vez de', value: 'en vez de' }, { label: 'a causa de', value: 'a causa de' }],
    correctAnswer: 'a pesar de', points: 2, orderIndex: 84, tags: ['prepositions', 'concessive']
  },
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Se lo explicaré ___ que lo comprenda bien.',
    options: [{ label: 'con tal de', value: 'con tal de' }, { label: 'a fin de', value: 'a fin de' }, { label: 'de modo', value: 'de modo' }, { label: 'siempre y cuando', value: 'siempre y cuando' }],
    correctAnswer: 'a fin de', points: 2, orderIndex: 85, tags: ['purpose clauses', 'prepositions']
  },
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Hizo como si no ___ nada.',
    options: [{ label: 'pasa', value: 'pasa' }, { label: 'pasara', value: 'pasara' }, { label: 'pasó', value: 'pasó' }, { label: 'pasará', value: 'pasará' }],
    correctAnswer: 'pasara', points: 2, orderIndex: 86, tags: ['como si', 'imperfect subjunctive']
  },
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'La reunión fue cancelada ___ a la falta de participantes.',
    options: [{ label: 'debido', value: 'debido' }, { label: 'por culpa', value: 'por culpa' }, { label: 'a causa', value: 'a causa' }, { label: 'gracias', value: 'gracias' }],
    correctAnswer: 'debido', points: 2, orderIndex: 87, tags: ['prepositions', 'cause']
  },
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Quien ___ interesado puede inscribirse antes del viernes.',
    options: [{ label: 'está', value: 'está' }, { label: 'esté', value: 'esté' }, { label: 'estará', value: 'estará' }, { label: 'estuviera', value: 'estuviera' }],
    correctAnswer: 'esté', points: 2, orderIndex: 88, tags: ['subjunctive', 'relative clauses']
  },
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Según ___ informado el periódico, habrá cambios importantes.',
    options: [{ label: 'ha', value: 'ha' }, { label: 'haya', value: 'haya' }, { label: 'hubiera', value: 'hubiera' }, { label: 'habría', value: 'habría' }],
    correctAnswer: 'ha', points: 2, orderIndex: 89, tags: ['reported speech', 'present perfect']
  },
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Por más que ___, no conseguirás convencerla.',
    options: [{ label: 'insistes', value: 'insistes' }, { label: 'insistas', value: 'insistas' }, { label: 'insistirás', value: 'insistirás' }, { label: 'insistías', value: 'insistías' }],
    correctAnswer: 'insistas', points: 2, orderIndex: 90, tags: ['concessive clauses', 'subjunctive']
  },

  // ── C2 — 10 more questions (91–100) ─────────────────────────
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Comoquiera que ___ la cuestión, siempre llegamos a la misma conclusión.',
    options: [{ label: 'abordemos', value: 'abordemos' }, { label: 'abordamos', value: 'abordamos' }, { label: 'abordaremos', value: 'abordaremos' }, { label: 'abordábamos', value: 'abordábamos' }],
    correctAnswer: 'abordemos', points: 2, orderIndex: 91, tags: ['comoquiera que', 'subjunctive']
  },
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Si bien la propuesta ___ aprobada, aún quedan obstáculos.',
    options: [{ label: 'fue', value: 'fue' }, { label: 'fuera', value: 'fuera' }, { label: 'sea', value: 'sea' }, { label: 'sería', value: 'sería' }],
    correctAnswer: 'fue', points: 2, orderIndex: 92, tags: ['si bien', 'concessive', 'indicative']
  },
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'No ya que la solución ___ correcta, sino que además es elegante.',
    options: [{ label: 'es', value: 'es' }, { label: 'sea', value: 'sea' }, { label: 'fuera', value: 'fuera' }, { label: 'será', value: 'será' }],
    correctAnswer: 'sea', points: 2, orderIndex: 93, tags: ['no ya que', 'subjunctive', 'formal register']
  },
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Se las arregla ___ para salir adelante sin ayuda.',
    options: [{ label: 'como puede', value: 'como puede' }, { label: 'como sea', value: 'como sea' }, { label: 'como quiera', value: 'como quiera' }, { label: 'como pueda', value: 'como pueda' }],
    correctAnswer: 'como puede', points: 2, orderIndex: 94, tags: ['como', 'indicative vs subjunctive']
  },
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Diérase el caso de que ___ necesario, acudiríamos al tribunal.',
    options: [{ label: 'fuera', value: 'fuera' }, { label: 'fuese', value: 'fuese' }, { label: 'sea', value: 'sea' }, { label: 'es', value: 'es' }],
    correctAnswer: 'fuese', points: 2, orderIndex: 95, tags: ['literary subjunctive', 'formal register']
  },
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Todo cuanto ___ dicho carece de fundamento jurídico.',
    options: [{ label: 'ha sido', value: 'ha sido' }, { label: 'haya sido', value: 'haya sido' }, { label: 'hubiera sido', value: 'hubiera sido' }, { label: 'habría sido', value: 'habría sido' }],
    correctAnswer: 'ha sido', points: 2, orderIndex: 96, tags: ['relative clauses', 'todo cuanto']
  },
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'La inversión, ___ cuantiosa que parezca, resultará rentable a largo plazo.',
    options: [{ label: 'por', value: 'por' }, { label: 'tan', value: 'tan' }, { label: 'aunque', value: 'aunque' }, { label: 'por más', value: 'por más' }],
    correctAnswer: 'por', points: 2, orderIndex: 97, tags: ['concessive', 'por + adj + que']
  },
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Hubiere quien hubiere cometido el delito, será juzgado con imparcialidad.',
    options: [{ label: 'La frase usa el futuro de subjuntivo correctamente', value: 'La frase usa el futuro de subjuntivo correctamente' }, { label: 'La frase usa el presente de subjuntivo', value: 'La frase usa el presente de subjuntivo' }, { label: 'La frase usa el condicional', value: 'La frase usa el condicional' }, { label: 'La frase usa el pretérito indefinido', value: 'La frase usa el pretérito indefinido' }],
    correctAnswer: 'La frase usa el futuro de subjuntivo correctamente', points: 2, orderIndex: 98, tags: ['future subjunctive', 'legal register', 'metalinguistic']
  },
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Se mostró reacio ___ aceptar las nuevas condiciones.',
    options: [{ label: 'a', value: 'a' }, { label: 'de', value: 'de' }, { label: 'en', value: 'en' }, { label: 'por', value: 'por' }],
    correctAnswer: 'a', points: 2, orderIndex: 99, tags: ['prepositions', 'adjective + preposition']
  },
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Bien ___ verdad que la situación ha mejorado, no podemos cantar victoria.',
    options: [{ label: 'es', value: 'es' }, { label: 'sea', value: 'sea' }, { label: 'será', value: 'será' }, { label: 'fuera', value: 'fuera' }],
    correctAnswer: 'es', points: 2, orderIndex: 100, tags: ['bien es verdad que', 'concessive', 'formal register']
  },

  // ============================================================
  // FILL_BLANK — Gramatica (30 preguntas: 5 por nivel MCER)
  // ============================================================

  // A1 — Conjugacion basica & articulos
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Completar: Yo ___ estudiante. (ser, presente)',
    correctAnswer: 'soy', points: 1, orderIndex: 101, tags: ['ser', 'presente']
  },
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Completar: Nosotros ___ en una casa grande. (vivir, presente)',
    correctAnswer: 'vivimos', points: 1, orderIndex: 102, tags: ['presente', 'verbos regulares -ir']
  },
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Completar: Ella ___ dos hermanos. (tener, presente)',
    correctAnswer: 'tiene', points: 1, orderIndex: 103, tags: ['tener', 'presente']
  },
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Completar: Ellos ___ al parque todos los dias. (ir, presente)',
    correctAnswer: 'van', points: 1, orderIndex: 104, tags: ['ir', 'presente']
  },
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Completar: Me gusta ___ musica. (articulo determinado femenino)',
    correctAnswer: 'la', points: 1, orderIndex: 105, tags: ['articulos', 'gustar']
  },

  // A2 — Preterito & pronombres
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Completar: Ayer ___ al cine con mis amigos. (ir, preterito indefinido, yo)',
    correctAnswer: 'fui', points: 1, orderIndex: 106, tags: ['preterito', 'ir']
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Completar: Cuando era nino, ___ al parque todos los dias. (ir, imperfecto)',
    correctAnswer: 'iba', points: 1, orderIndex: 107, tags: ['imperfecto', 'pasado habitual']
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Completar: A mi hermana ___ gusta el chocolate. (pronombre indirecto)',
    correctAnswer: 'le', points: 1, orderIndex: 108, tags: ['gustar', 'pronombres indirectos']
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Completar: Mi casa es ___ grande que la tuya. (comparativo)',
    correctAnswer: 'más', points: 1, orderIndex: 109, tags: ['comparativos']
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Completar: El proximo verano ___ a la playa. (ir, futuro simple, nosotros)',
    correctAnswer: 'iremos', points: 1, orderIndex: 110, tags: ['futuro simple', 'ir']
  },

  // B1 — Subjuntivo & condicional
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Completar: Espero que tu ___ pronto. (venir, presente de subjuntivo)',
    correctAnswer: 'vengas', points: 1, orderIndex: 111, tags: ['subjuntivo presente', 'esperar que']
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Completar: Si tuviera dinero, ___ un coche. (comprar, condicional)',
    correctAnswer: 'compraría', points: 1, orderIndex: 112, tags: ['condicional', 'si + imperfecto subjuntivo']
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Completar: No creo que ___ razon. (tener, presente de subjuntivo)',
    correctAnswer: 'tenga', points: 1, orderIndex: 113, tags: ['subjuntivo', 'duda']
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Completar: Me pidio que le ___ la verdad. (decir, imperfecto de subjuntivo)',
    correctAnswer: 'dijera', points: 1, orderIndex: 114, tags: ['imperfecto de subjuntivo', 'discurso indirecto']
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Completar: Cuando ___ a casa, te llamo. (llegar, presente de subjuntivo)',
    correctAnswer: 'llegue', points: 1, orderIndex: 115, tags: ['subjuntivo', 'clausulas temporales']
  },

  // B2 — Estructuras complejas
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Completar: Si hubiera estudiado, ___ aprobado el examen. (haber, condicional perfecto)',
    correctAnswer: 'habría', points: 2, orderIndex: 116, tags: ['condicional perfecto', 'si + pluscuamperfecto subjuntivo']
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Completar: El puente ___ construido en 1950. (ser, preterito — voz pasiva)',
    correctAnswer: 'fue', points: 2, orderIndex: 117, tags: ['voz pasiva', 'preterito']
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Completar: Me dijo que ___ al dia siguiente. (venir, condicional — discurso indirecto)',
    correctAnswer: 'vendría', points: 2, orderIndex: 118, tags: ['discurso indirecto', 'condicional']
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Completar: Ojala ___ mas tiempo libre. (tener, imperfecto de subjuntivo)',
    correctAnswer: 'tuviera', points: 2, orderIndex: 119, tags: ['ojala', 'imperfecto de subjuntivo']
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Completar: No creo que ___ terminado a tiempo. (haber, presente perfecto de subjuntivo)',
    correctAnswer: 'hayan', points: 2, orderIndex: 120, tags: ['presente perfecto de subjuntivo']
  },

  // C1 — Formas literarias
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Completar: De haberlo sabido, no ___ actuado asi. (haber, condicional perfecto)',
    correctAnswer: 'habría', points: 2, orderIndex: 121, tags: ['de + infinitivo', 'condicional perfecto']
  },
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Completar: Sea como ___, debemos continuar. (ser, subjuntivo reduplicativo)',
    correctAnswer: 'sea', points: 2, orderIndex: 122, tags: ['subjuntivo reduplicativo', 'concesivo']
  },
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Completar: A no ser que ___ medidas, la situacion empeorara. (tomar, presente de subjuntivo, ellos)',
    correctAnswer: 'tomen', points: 2, orderIndex: 123, tags: ['a no ser que', 'subjuntivo']
  },
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Completar: Por mas que ___, no lo consiguio. (intentar, imperfecto de subjuntivo)',
    correctAnswer: 'intentara', points: 2, orderIndex: 124, tags: ['concesivo', 'por mas que']
  },
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Completar: Dicho ___ de paso, no estoy de acuerdo. (ser, presente de subjuntivo)',
    correctAnswer: 'sea', points: 2, orderIndex: 125, tags: ['dicho sea', 'expresiones fijas']
  },

  // C2 — Distinciones sutiles
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Completar: Quienquiera que ___ responsable, debera responder. (ser, presente de subjuntivo)',
    correctAnswer: 'sea', points: 2, orderIndex: 126, tags: ['quienquiera que', 'subjuntivo']
  },
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Completar: Si bien la economia ___ mejorado, quedan desafios. (haber, indicativo — concesivo)',
    correctAnswer: 'ha', points: 2, orderIndex: 127, tags: ['si bien', 'concesivo', 'indicativo']
  },
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Completar: Comoquiera que ___ el asunto, la verdad prevalecera. (abordar, presente de subjuntivo, nosotros)',
    correctAnswer: 'abordemos', points: 2, orderIndex: 128, tags: ['comoquiera que', 'subjuntivo']
  },
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Completar: Por ___ que parezca, asi sucedio. (adjetivo + que + subjuntivo — concesion)',
    correctAnswer: 'extraño', points: 2, orderIndex: 129, tags: ['concesivo', 'por + adj + que']
  },
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'FILL_BLANK', skill: 'GRAMMAR',
    questionText: 'Completar: No bien ___ la noticia, acudio de inmediato. (saber, preterito indefinido)',
    correctAnswer: 'supo', points: 2, orderIndex: 130, tags: ['no bien', 'preterito', 'clausulas temporales']
  },

  // ============================================================
  // VARIED LANGUAGE REGISTERS — 18 questions (orderIndex 131-148)
  // ============================================================

  // A1 — Varied Registers
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '[Email comercial] "Estimado Sr. Lopez, le ___ para confirmar nuestra reunión del jueves."',
    options: [{ label: 'escribo', value: 'escribo' }, { label: 'escribe', value: 'escribe' }, { label: 'escribir', value: 'escribir' }, { label: 'escribes', value: 'escribes' }],
    correctAnswer: 'escribo', points: 1, orderIndex: 131, tags: ['presente', 'registro formal', 'email']
  },
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '[SMS] "ey, ___ esta noche?"',
    options: [{ label: 'vienes', value: 'vienes' }, { label: 'viene', value: 'viene' }, { label: 'vienen', value: 'vienen' }, { label: 'venir', value: 'venir' }],
    correctAnswer: 'vienes', points: 1, orderIndex: 132, tags: ['presente', 'registro informal', 'SMS']
  },
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '[Oral coloquial] "y ella va y ___ tipo: ¡ni de broma!"',
    options: [{ label: 'dice', value: 'dice' }, { label: 'dijo', value: 'dijo' }, { label: 'decía', value: 'decía' }, { label: 'decir', value: 'decir' }],
    correctAnswer: 'dice', points: 1, orderIndex: 133, tags: ['presente histórico', 'registro coloquial', 'oral']
  },

  // A2 — Varied Registers
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '[Reclamación formal] "Desearía ___ una reclamación sobre el servicio recibido ayer."',
    options: [{ label: 'presentar', value: 'presentar' }, { label: 'hacer', value: 'hacer' }, { label: 'dar', value: 'dar' }, { label: 'poner', value: 'poner' }],
    correctAnswer: 'presentar', points: 1, orderIndex: 134, tags: ['infinitivo', 'registro formal', 'reclamación']
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '[WhatsApp] "acabo de ___ a casa, qué haces?"',
    options: [{ label: 'llegar', value: 'llegar' }, { label: 'llegado', value: 'llegado' }, { label: 'llego', value: 'llego' }, { label: 'llegaba', value: 'llegaba' }],
    correctAnswer: 'llegar', points: 1, orderIndex: 135, tags: ['acabar de + infinitivo', 'registro informal', 'chat']
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '[Llamada telefónica] "¿Podría ___ con el departamento de ventas, por favor?"',
    options: [{ label: 'pasarme', value: 'pasarme' }, { label: 'llevarme', value: 'llevarme' }, { label: 'darme', value: 'darme' }, { label: 'ponerme', value: 'ponerme' }],
    correctAnswer: 'pasarme', points: 1, orderIndex: 136, tags: ['infinitivo', 'registro formal', 'teléfono']
  },

  // B1 — Varied Registers
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '[Presentación corporativa] "Como pueden ver en los datos, las ventas ___ un 15% este trimestre."',
    options: [{ label: 'han aumentado', value: 'han aumentado' }, { label: 'aumentaban', value: 'aumentaban' }, { label: 'aumentan', value: 'aumentan' }, { label: 'habían aumentado', value: 'habían aumentado' }],
    correctAnswer: 'han aumentado', points: 1, orderIndex: 137, tags: ['pretérito perfecto', 'registro formal', 'presentación']
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '[Redes sociales] "No me lo puedo creer, ¡otra vez ___ subido el precio! #inflación"',
    options: [{ label: 'han', value: 'han' }, { label: 'habían', value: 'habían' }, { label: 'habrán', value: 'habrán' }, { label: 'hubieron', value: 'hubieron' }],
    correctAnswer: 'han', points: 1, orderIndex: 138, tags: ['pretérito perfecto', 'registro informal', 'redes sociales']
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '[Titular de prensa] "El ministro, ___ a dimitir tras el escándalo"',
    options: [{ label: 'obligado', value: 'obligado' }, { label: 'es obligado', value: 'es obligado' }, { label: 'obliga', value: 'obliga' }, { label: 'obligaba', value: 'obligaba' }],
    correctAnswer: 'obligado', points: 1, orderIndex: 139, tags: ['participio', 'registro periodístico', 'titular']
  },

  // B2 — Varied Registers
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '[Contrato legal] "El arrendatario ___ por la presente aceptar los términos y condiciones establecidos en el presente contrato."',
    options: [{ label: 'se compromete a', value: 'se compromete a' }, { label: 'compromete', value: 'compromete' }, { label: 'comprometerá', value: 'comprometerá' }, { label: 'comprometería', value: 'comprometería' }],
    correctAnswer: 'se compromete a', points: 2, orderIndex: 140, tags: ['presente', 'registro jurídico', 'contrato']
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '[Periodismo] "De no ___ sido por la intervención de última hora, el acuerdo se habría desmoronado."',
    options: [{ label: 'haber', value: 'haber' }, { label: 'ser', value: 'ser' }, { label: 'estar', value: 'estar' }, { label: 'tener', value: 'tener' }],
    correctAnswer: 'haber', points: 2, orderIndex: 141, tags: ['infinitivo compuesto', 'registro periodístico', 'condicional']
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '[Irónico/Sarcástico] "Sí claro, ___ a todos nos encantan las reuniones del lunes por la mañana."',
    options: [{ label: 'obviamente', value: 'obviamente' }, { label: 'aparentemente', value: 'aparentemente' }, { label: 'supuestamente', value: 'supuestamente' }, { label: 'ciertamente', value: 'ciertamente' }],
    correctAnswer: 'obviamente', points: 2, orderIndex: 142, tags: ['adverbios', 'registro sarcástico', 'oral']
  },

  // C1 — Varied Registers
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '[Artículo académico] "Los hallazgos ___ corroborados por tres estudios posteriores revisados por pares."',
    options: [{ label: 'fueron', value: 'fueron' }, { label: 'eran', value: 'eran' }, { label: 'han sido', value: 'han sido' }, { label: 'serían', value: 'serían' }],
    correctAnswer: 'fueron', points: 2, orderIndex: 143, tags: ['voz pasiva', 'registro académico', 'investigación']
  },
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '[Diplomático] "La delegación ___ expresar sus reservas respecto a la enmienda propuesta."',
    options: [{ label: 'desea', value: 'desea' }, { label: 'quiere', value: 'quiere' }, { label: 'prefiere', value: 'prefiere' }, { label: 'necesita', value: 'necesita' }],
    correctAnswer: 'desea', points: 2, orderIndex: 144, tags: ['presente', 'registro diplomático', 'política']
  },
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '[Literario] "Apenas ___ pronunciado esas palabras cuando el cielo se oscureció."',
    options: [{ label: 'hubo', value: 'hubo' }, { label: 'había', value: 'había' }, { label: 'ha', value: 'ha' }, { label: 'fue', value: 'fue' }],
    correctAnswer: 'hubo', points: 2, orderIndex: 145, tags: ['pretérito anterior', 'registro literario', 'narración']
  },

  // C2 — Varied Registers
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '[Jurídico arcaico] "No obstante lo anteriormente expuesto, la parte ___ considerada responsable de cualquier daño."',
    options: [{ label: 'será', value: 'será' }, { label: 'sería', value: 'sería' }, { label: 'es', value: 'es' }, { label: 'fuere', value: 'fuere' }],
    correctAnswer: 'será', points: 2, orderIndex: 146, tags: ['futuro simple', 'registro jurídico arcaico', 'responsabilidad']
  },
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '[Jerga/Coloquial] "Tío, ese pavo se ha ___ sin pagar, ¡qué morro!"',
    options: [{ label: 'pirado', value: 'pirado' }, { label: 'ido', value: 'ido' }, { label: 'largado', value: 'largado' }, { label: 'marchado', value: 'marchado' }],
    correctAnswer: 'pirado', points: 2, orderIndex: 147, tags: ['pretérito perfecto', 'registro coloquial', 'jerga española']
  },
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '[Retórico/Oratorio] "No solo ___ fracasado, sino que hemos fracasado de manera espectacular y sin remordimiento."',
    options: [{ label: 'hemos', value: 'hemos' }, { label: 'habíamos', value: 'habíamos' }, { label: 'hubiéramos', value: 'hubiéramos' }, { label: 'habremos', value: 'habremos' }],
    correctAnswer: 'hemos', points: 2, orderIndex: 148, tags: ['pretérito perfecto', 'registro oratorio', 'retórica']
  },
]
