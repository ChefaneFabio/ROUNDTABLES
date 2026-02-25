import { MultiSkillQuestionData } from '../types'

// Spanish Vocabulary-in-Context Questions — 15 questions
// Multiple choice: choose the word that best fits the context

export const spanishVocabularyQuestions: MultiSkillQuestionData[] = [
  // ============================================================
  // A2 — Elementary (3 questions)
  // ============================================================
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Necesito ___ una cita con el médico.',
    options: [{ label: 'A', value: 'hacer' }, { label: 'B', value: 'pedir' }, { label: 'C', value: 'tomar' }, { label: 'D', value: 'dar' }],
    correctAnswer: 'pedir', points: 1, orderIndex: 1, tags: ['collocations', 'daily life']
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'El supermercado está ___ de mi casa.',
    options: [{ label: 'A', value: 'cerca' }, { label: 'B', value: 'junto' }, { label: 'C', value: 'al lado' }, { label: 'D', value: 'próximo' }],
    correctAnswer: 'cerca', points: 1, orderIndex: 2, tags: ['location', 'prepositions']
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Mi hermana ___ el piano muy bien.',
    options: [{ label: 'A', value: 'juega' }, { label: 'B', value: 'toca' }, { label: 'C', value: 'hace' }, { label: 'D', value: 'practica' }],
    correctAnswer: 'toca', points: 1, orderIndex: 3, tags: ['tocar/jugar', 'music']
  },

  // ============================================================
  // B1 — Intermediate (4 questions)
  // ============================================================
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'La empresa decidió ___ a 50 nuevos empleados este año.',
    options: [{ label: 'A', value: 'despedir' }, { label: 'B', value: 'contratar' }, { label: 'C', value: 'jubilar' }, { label: 'D', value: 'renunciar' }],
    correctAnswer: 'contratar', points: 1, orderIndex: 4, tags: ['business', 'employment']
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Es una persona muy ___; siempre piensa en los demás.',
    options: [{ label: 'A', value: 'generosa' }, { label: 'B', value: 'tacaña' }, { label: 'C', value: 'egoísta' }, { label: 'D', value: 'orgullosa' }],
    correctAnswer: 'generosa', points: 1, orderIndex: 5, tags: ['personality', 'adjectives']
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'El gobierno tomó ___ para reducir la contaminación.',
    options: [{ label: 'A', value: 'medidas' }, { label: 'B', value: 'cuentas' }, { label: 'C', value: 'notas' }, { label: 'D', value: 'pasos' }],
    correctAnswer: 'medidas', points: 1, orderIndex: 6, tags: ['government', 'collocations']
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'No me puedo ___ un viaje tan caro ahora mismo.',
    options: [{ label: 'A', value: 'permitir' }, { label: 'B', value: 'dejar' }, { label: 'C', value: 'ofrecer' }, { label: 'D', value: 'gastar' }],
    correctAnswer: 'permitir', points: 1, orderIndex: 7, tags: ['money', 'verbs']
  },

  // ============================================================
  // B2 — Upper Intermediate (4 questions)
  // ============================================================
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'El documental ___ luz sobre las consecuencias devastadoras del cambio climático.',
    options: [{ label: 'A', value: 'arrojó' }, { label: 'B', value: 'lanzó' }, { label: 'C', value: 'tiró' }, { label: 'D', value: 'echó' }],
    correctAnswer: 'arrojó', points: 1, orderIndex: 8, tags: ['collocations', 'formal']
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'La comisión ___ la propuesta por unanimidad.',
    options: [{ label: 'A', value: 'aprobó' }, { label: 'B', value: 'mejoró' }, { label: 'C', value: 'probó' }, { label: 'D', value: 'aplicó' }],
    correctAnswer: 'aprobó', points: 1, orderIndex: 9, tags: ['business', 'formal']
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Hay que ___ en cuenta todos los factores antes de tomar una decisión.',
    options: [{ label: 'A', value: 'tener' }, { label: 'B', value: 'poner' }, { label: 'C', value: 'dar' }, { label: 'D', value: 'hacer' }],
    correctAnswer: 'tener', points: 1, orderIndex: 10, tags: ['collocations', 'expressions']
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'La crisis económica tuvo un ___ profundo en la sociedad.',
    options: [{ label: 'A', value: 'impacto' }, { label: 'B', value: 'golpe' }, { label: 'C', value: 'choque' }, { label: 'D', value: 'encuentro' }],
    correctAnswer: 'impacto', points: 1, orderIndex: 11, tags: ['economics', 'nouns']
  },

  // ============================================================
  // C1 — Advanced (2 questions)
  // ============================================================
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'El discurso del político fue deliberadamente ___ para no comprometerse con ninguna postura.',
    options: [{ label: 'A', value: 'ambiguo' }, { label: 'B', value: 'ambicioso' }, { label: 'C', value: 'anónimo' }, { label: 'D', value: 'análogo' }],
    correctAnswer: 'ambiguo', points: 1, orderIndex: 12, tags: ['politics', 'advanced adjectives']
  },
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Su ___ atención al detalle la convierte en la candidata ideal.',
    options: [{ label: 'A', value: 'meticulosa' }, { label: 'B', value: 'maliciosa' }, { label: 'C', value: 'milagrosa' }, { label: 'D', value: 'traviesa' }],
    correctAnswer: 'meticulosa', points: 1, orderIndex: 13, tags: ['work', 'advanced adjectives']
  },

  // ============================================================
  // C2 — Proficiency (2 questions)
  // ============================================================
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'La obra del artista es una ___ impecable de tradición e innovación.',
    options: [{ label: 'A', value: 'fusión' }, { label: 'B', value: 'confusión' }, { label: 'C', value: 'fisión' }, { label: 'D', value: 'función' }],
    correctAnswer: 'fusión', points: 1, orderIndex: 14, tags: ['art', 'advanced nouns']
  },
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'La explicación ___ del profesor dejó a los alumnos avanzados sin poder seguir el hilo.',
    options: [{ label: 'A', value: 'enrevesada' }, { label: 'B', value: 'consolidada' }, { label: 'C', value: 'contemplada' }, { label: 'D', value: 'congregada' }],
    correctAnswer: 'enrevesada', points: 1, orderIndex: 15, tags: ['academic', 'advanced adjectives']
  },
]
