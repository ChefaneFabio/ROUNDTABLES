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
    options: [{ label: 'A', value: 'soy' }, { label: 'B', value: 'es' }, { label: 'C', value: 'eres' }, { label: 'D', value: 'están' }],
    correctAnswer: 'es', points: 1, orderIndex: 1, tags: ['ser', 'present']
  },
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Nosotros ___ en Madrid.',
    options: [{ label: 'A', value: 'somos' }, { label: 'B', value: 'estamos' }, { label: 'C', value: 'son' }, { label: 'D', value: 'están' }],
    correctAnswer: 'estamos', points: 1, orderIndex: 2, tags: ['estar', 'location']
  },
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Yo ___ dos hermanos.',
    options: [{ label: 'A', value: 'tiene' }, { label: 'B', value: 'tengo' }, { label: 'C', value: 'tienes' }, { label: 'D', value: 'tenemos' }],
    correctAnswer: 'tengo', points: 1, orderIndex: 3, tags: ['tener', 'present']
  },
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '___ libros son interesantes.',
    options: [{ label: 'A', value: 'El' }, { label: 'B', value: 'La' }, { label: 'C', value: 'Los' }, { label: 'D', value: 'Las' }],
    correctAnswer: 'Los', points: 1, orderIndex: 4, tags: ['articles', 'plural']
  },
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Mi madre ___ en un hospital.',
    options: [{ label: 'A', value: 'trabajo' }, { label: 'B', value: 'trabajas' }, { label: 'C', value: 'trabaja' }, { label: 'D', value: 'trabajan' }],
    correctAnswer: 'trabaja', points: 1, orderIndex: 5, tags: ['present', 'regular -ar verbs']
  },
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '¿Dónde ___ la estación de tren?',
    options: [{ label: 'A', value: 'es' }, { label: 'B', value: 'está' }, { label: 'C', value: 'hay' }, { label: 'D', value: 'son' }],
    correctAnswer: 'está', points: 1, orderIndex: 6, tags: ['estar', 'location', 'questions']
  },
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Me gusta ___ música.',
    options: [{ label: 'A', value: 'el' }, { label: 'B', value: 'la' }, { label: 'C', value: 'un' }, { label: 'D', value: 'una' }],
    correctAnswer: 'la', points: 1, orderIndex: 7, tags: ['articles', 'gustar']
  },
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Ellos ___ españoles.',
    options: [{ label: 'A', value: 'es' }, { label: 'B', value: 'somos' }, { label: 'C', value: 'son' }, { label: 'D', value: 'están' }],
    correctAnswer: 'son', points: 1, orderIndex: 8, tags: ['ser', 'nationality']
  },

  // ============================================================
  // A2 — Elementary (8 questions)
  // ============================================================
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Ayer yo ___ al supermercado.',
    options: [{ label: 'A', value: 'voy' }, { label: 'B', value: 'fui' }, { label: 'C', value: 'iba' }, { label: 'D', value: 'iré' }],
    correctAnswer: 'fui', points: 1, orderIndex: 9, tags: ['preterite', 'ir']
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Cuando era niño, ___ al parque todos los días.',
    options: [{ label: 'A', value: 'fui' }, { label: 'B', value: 'iba' }, { label: 'C', value: 'voy' }, { label: 'D', value: 'iré' }],
    correctAnswer: 'iba', points: 1, orderIndex: 10, tags: ['imperfect', 'habitual past']
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Madrid es ___ grande ___ Barcelona.',
    options: [{ label: 'A', value: 'más / que' }, { label: 'B', value: 'más / de' }, { label: 'C', value: 'tan / que' }, { label: 'D', value: 'mejor / que' }],
    correctAnswer: 'más / que', points: 1, orderIndex: 11, tags: ['comparatives']
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'A ella ___ gustan los gatos.',
    options: [{ label: 'A', value: 'le' }, { label: 'B', value: 'la' }, { label: 'C', value: 'les' }, { label: 'D', value: 'se' }],
    correctAnswer: 'le', points: 1, orderIndex: 12, tags: ['gustar', 'indirect object pronouns']
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Mañana ___ a la playa.',
    options: [{ label: 'A', value: 'vamos' }, { label: 'B', value: 'fuimos' }, { label: 'C', value: 'iremos' }, { label: 'D', value: 'íbamos' }],
    correctAnswer: 'iremos', points: 1, orderIndex: 13, tags: ['future simple', 'ir']
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Él ___ comiendo cuando llegué.',
    options: [{ label: 'A', value: 'es' }, { label: 'B', value: 'está' }, { label: 'C', value: 'estaba' }, { label: 'D', value: 'fue' }],
    correctAnswer: 'estaba', points: 1, orderIndex: 14, tags: ['imperfect', 'progressive']
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '¿ ___ has viajado a otro país?',
    options: [{ label: 'A', value: 'Nunca' }, { label: 'B', value: 'Alguna vez' }, { label: 'C', value: 'Siempre' }, { label: 'D', value: 'Ya' }],
    correctAnswer: 'Alguna vez', points: 1, orderIndex: 15, tags: ['present perfect', 'experience']
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Este libro es ___ interesante de todos.',
    options: [{ label: 'A', value: 'más' }, { label: 'B', value: 'el más' }, { label: 'C', value: 'muy' }, { label: 'D', value: 'tan' }],
    correctAnswer: 'el más', points: 1, orderIndex: 16, tags: ['superlatives']
  },

  // ============================================================
  // B1 — Intermediate (8 questions)
  // ============================================================
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Espero que tú ___ a la fiesta.',
    options: [{ label: 'A', value: 'vienes' }, { label: 'B', value: 'vengas' }, { label: 'C', value: 'vendrás' }, { label: 'D', value: 'viniste' }],
    correctAnswer: 'vengas', points: 1, orderIndex: 17, tags: ['present subjunctive', 'esperar que']
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Si tuviera dinero, ___ un coche nuevo.',
    options: [{ label: 'A', value: 'compro' }, { label: 'B', value: 'compraré' }, { label: 'C', value: 'compraría' }, { label: 'D', value: 'compré' }],
    correctAnswer: 'compraría', points: 1, orderIndex: 18, tags: ['conditional', 'si clauses']
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'No creo que él ___ razón.',
    options: [{ label: 'A', value: 'tiene' }, { label: 'B', value: 'tenga' }, { label: 'C', value: 'tendrá' }, { label: 'D', value: 'tuvo' }],
    correctAnswer: 'tenga', points: 1, orderIndex: 19, tags: ['subjunctive', 'doubt']
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Cuando ___ a casa, te llamaré.',
    options: [{ label: 'A', value: 'llego' }, { label: 'B', value: 'llegue' }, { label: 'C', value: 'llegaré' }, { label: 'D', value: 'llegué' }],
    correctAnswer: 'llegue', points: 1, orderIndex: 20, tags: ['subjunctive', 'temporal clauses']
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Ya habíamos ___ cuando empezó a llover.',
    options: [{ label: 'A', value: 'salido' }, { label: 'B', value: 'salir' }, { label: 'C', value: 'saliendo' }, { label: 'D', value: 'salimos' }],
    correctAnswer: 'salido', points: 1, orderIndex: 21, tags: ['pluperfect', 'past participle']
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Me pidió que le ___ la verdad.',
    options: [{ label: 'A', value: 'digo' }, { label: 'B', value: 'dijera' }, { label: 'C', value: 'diré' }, { label: 'D', value: 'dije' }],
    correctAnswer: 'dijera', points: 1, orderIndex: 22, tags: ['imperfect subjunctive', 'reported speech']
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Es importante que los estudiantes ___ todos los días.',
    options: [{ label: 'A', value: 'estudian' }, { label: 'B', value: 'estudien' }, { label: 'C', value: 'estudiarán' }, { label: 'D', value: 'estudiaron' }],
    correctAnswer: 'estudien', points: 1, orderIndex: 23, tags: ['subjunctive', 'impersonal expressions']
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Si llueve, no ___ al parque.',
    options: [{ label: 'A', value: 'vamos' }, { label: 'B', value: 'iremos' }, { label: 'C', value: 'fuimos' }, { label: 'D', value: 'iríamos' }],
    correctAnswer: 'iremos', points: 1, orderIndex: 24, tags: ['first conditional', 'si + present']
  },

  // ============================================================
  // B2 — Upper Intermediate (8 questions)
  // ============================================================
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Si hubiera estudiado más, ___ el examen.',
    options: [{ label: 'A', value: 'aprobaría' }, { label: 'B', value: 'habría aprobado' }, { label: 'C', value: 'aprobé' }, { label: 'D', value: 'apruebo' }],
    correctAnswer: 'habría aprobado', points: 1, orderIndex: 25, tags: ['past conditional', 'si clauses']
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'El edificio ___ construido en 1920.',
    options: [{ label: 'A', value: 'es' }, { label: 'B', value: 'fue' }, { label: 'C', value: 'está' }, { label: 'D', value: 'ha' }],
    correctAnswer: 'fue', points: 1, orderIndex: 26, tags: ['passive voice', 'ser']
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Dudo que ellos ___ terminado el proyecto a tiempo.',
    options: [{ label: 'A', value: 'han' }, { label: 'B', value: 'hayan' }, { label: 'C', value: 'habrán' }, { label: 'D', value: 'habían' }],
    correctAnswer: 'hayan', points: 1, orderIndex: 27, tags: ['present perfect subjunctive']
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'No habría venido si ___ que estabas enfermo.',
    options: [{ label: 'A', value: 'sabía' }, { label: 'B', value: 'hubiera sabido' }, { label: 'C', value: 'supe' }, { label: 'D', value: 'sepa' }],
    correctAnswer: 'hubiera sabido', points: 1, orderIndex: 28, tags: ['pluperfect subjunctive', 'si clauses']
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Aquí se ___ español.',
    options: [{ label: 'A', value: 'habla' }, { label: 'B', value: 'hablan' }, { label: 'C', value: 'hable' }, { label: 'D', value: 'hablando' }],
    correctAnswer: 'habla', points: 1, orderIndex: 29, tags: ['passive se', 'impersonal']
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Ojalá ___ más tiempo para viajar.',
    options: [{ label: 'A', value: 'tengo' }, { label: 'B', value: 'tuviera' }, { label: 'C', value: 'tendré' }, { label: 'D', value: 'tenía' }],
    correctAnswer: 'tuviera', points: 1, orderIndex: 30, tags: ['ojalá', 'imperfect subjunctive']
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Por mucho que ___, no logró convencerme.',
    options: [{ label: 'A', value: 'insistió' }, { label: 'B', value: 'insistiera' }, { label: 'C', value: 'insiste' }, { label: 'D', value: 'insistirá' }],
    correctAnswer: 'insistiera', points: 1, orderIndex: 31, tags: ['concessive clauses', 'subjunctive']
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Cuanto más estudias, ___ resultados obtienes.',
    options: [{ label: 'A', value: 'más' }, { label: 'B', value: 'mejores' }, { label: 'C', value: 'mejor' }, { label: 'D', value: 'los mejores' }],
    correctAnswer: 'mejores', points: 1, orderIndex: 32, tags: ['correlative comparatives']
  },

  // ============================================================
  // C1 — Advanced (4 questions)
  // ============================================================
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'De haberlo sabido, no ___ aceptado el trabajo.',
    options: [{ label: 'A', value: 'había' }, { label: 'B', value: 'hubiera' }, { label: 'C', value: 'habría' }, { label: 'D', value: 'haya' }],
    correctAnswer: 'habría', points: 1, orderIndex: 33, tags: ['de + infinitive', 'conditional perfect']
  },
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Sea cual ___ tu decisión, te apoyaré.',
    options: [{ label: 'A', value: 'sea' }, { label: 'B', value: 'fuera' }, { label: 'C', value: 'es' }, { label: 'D', value: 'será' }],
    correctAnswer: 'sea', points: 1, orderIndex: 34, tags: ['reduplicative subjunctive', 'concessive']
  },
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'El informe ___ ser entregado antes del viernes.',
    options: [{ label: 'A', value: 'ha de' }, { label: 'B', value: 'ha a' }, { label: 'C', value: 'tiene que' }, { label: 'D', value: 'hay de' }],
    correctAnswer: 'ha de', points: 1, orderIndex: 35, tags: ['haber de + infinitive', 'obligation']
  },
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'No bien ___ la noticia, salió corriendo.',
    options: [{ label: 'A', value: 'supo' }, { label: 'B', value: 'sabía' }, { label: 'C', value: 'sepa' }, { label: 'D', value: 'supiera' }],
    correctAnswer: 'supo', points: 1, orderIndex: 36, tags: ['no bien', 'preterite', 'temporal clauses']
  },

  // ============================================================
  // C2 — Proficiency (4 questions)
  // ============================================================
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Quienquiera que ___ la verdad, deberá enfrentar las consecuencias.',
    options: [{ label: 'A', value: 'sabe' }, { label: 'B', value: 'sepa' }, { label: 'C', value: 'supiera' }, { label: 'D', value: 'sabrá' }],
    correctAnswer: 'sepa', points: 1, orderIndex: 37, tags: ['quienquiera que', 'subjunctive']
  },
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Dicho ___ de otro modo, la empresa está en quiebra.',
    options: [{ label: 'A', value: 'esto' }, { label: 'B', value: 'sea' }, { label: 'C', value: 'lo' }, { label: 'D', value: 'así' }],
    correctAnswer: 'sea', points: 1, orderIndex: 38, tags: ['dicho sea', 'fixed expressions']
  },
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Hubiere o no hubiere ___ testigos, la ley debe cumplirse.',
    options: [{ label: 'A', value: 'habido' }, { label: 'B', value: 'sido' }, { label: 'C', value: 'tenido' }, { label: 'D', value: 'estado' }],
    correctAnswer: 'habido', points: 1, orderIndex: 39, tags: ['future subjunctive', 'legal register']
  },
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'A no ser que se ___ medidas urgentes, la situación empeorará.',
    options: [{ label: 'A', value: 'toman' }, { label: 'B', value: 'tomen' }, { label: 'C', value: 'tomarán' }, { label: 'D', value: 'tomaron' }],
    correctAnswer: 'tomen', points: 1, orderIndex: 40, tags: ['a no ser que', 'subjunctive', 'formal register']
  },
]
