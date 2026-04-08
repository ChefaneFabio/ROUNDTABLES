import { MultiSkillQuestionData } from '../types'

// Spanish Grammar MCQ Questions — 40 questions
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
]
