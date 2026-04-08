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
    options: [{ label: 'hacer', value: 'hacer' }, { label: 'pedir', value: 'pedir' }, { label: 'tomar', value: 'tomar' }, { label: 'dar', value: 'dar' }],
    correctAnswer: 'pedir', points: 1, orderIndex: 1, tags: ['collocations', 'daily life']
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'El supermercado está ___ de mi casa.',
    options: [{ label: 'cerca', value: 'cerca' }, { label: 'junto', value: 'junto' }, { label: 'al lado', value: 'al lado' }, { label: 'próximo', value: 'próximo' }],
    correctAnswer: 'cerca', points: 1, orderIndex: 2, tags: ['location', 'prepositions']
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Mi hermana ___ el piano muy bien.',
    options: [{ label: 'juega', value: 'juega' }, { label: 'toca', value: 'toca' }, { label: 'hace', value: 'hace' }, { label: 'practica', value: 'practica' }],
    correctAnswer: 'toca', points: 1, orderIndex: 3, tags: ['tocar/jugar', 'music']
  },

  // ============================================================
  // B1 — Intermediate (4 questions)
  // ============================================================
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'La empresa decidió ___ a 50 nuevos empleados este año.',
    options: [{ label: 'despedir', value: 'despedir' }, { label: 'contratar', value: 'contratar' }, { label: 'jubilar', value: 'jubilar' }, { label: 'renunciar', value: 'renunciar' }],
    correctAnswer: 'contratar', points: 1, orderIndex: 4, tags: ['business', 'employment']
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Es una persona muy ___; siempre piensa en los demás.',
    options: [{ label: 'generosa', value: 'generosa' }, { label: 'tacaña', value: 'tacaña' }, { label: 'egoísta', value: 'egoísta' }, { label: 'orgullosa', value: 'orgullosa' }],
    correctAnswer: 'generosa', points: 1, orderIndex: 5, tags: ['personality', 'adjectives']
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'El gobierno tomó ___ para reducir la contaminación.',
    options: [{ label: 'medidas', value: 'medidas' }, { label: 'cuentas', value: 'cuentas' }, { label: 'notas', value: 'notas' }, { label: 'pasos', value: 'pasos' }],
    correctAnswer: 'medidas', points: 1, orderIndex: 6, tags: ['government', 'collocations']
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'No me puedo ___ un viaje tan caro ahora mismo.',
    options: [{ label: 'permitir', value: 'permitir' }, { label: 'dejar', value: 'dejar' }, { label: 'ofrecer', value: 'ofrecer' }, { label: 'gastar', value: 'gastar' }],
    correctAnswer: 'permitir', points: 1, orderIndex: 7, tags: ['money', 'verbs']
  },

  // ============================================================
  // B2 — Upper Intermediate (4 questions)
  // ============================================================
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'El documental ___ luz sobre las consecuencias devastadoras del cambio climático.',
    options: [{ label: 'arrojó', value: 'arrojó' }, { label: 'lanzó', value: 'lanzó' }, { label: 'tiró', value: 'tiró' }, { label: 'echó', value: 'echó' }],
    correctAnswer: 'arrojó', points: 1, orderIndex: 8, tags: ['collocations', 'formal']
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'La comisión ___ la propuesta por unanimidad.',
    options: [{ label: 'aprobó', value: 'aprobó' }, { label: 'mejoró', value: 'mejoró' }, { label: 'probó', value: 'probó' }, { label: 'aplicó', value: 'aplicó' }],
    correctAnswer: 'aprobó', points: 1, orderIndex: 9, tags: ['business', 'formal']
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Hay que ___ en cuenta todos los factores antes de tomar una decisión.',
    options: [{ label: 'tener', value: 'tener' }, { label: 'poner', value: 'poner' }, { label: 'dar', value: 'dar' }, { label: 'hacer', value: 'hacer' }],
    correctAnswer: 'tener', points: 1, orderIndex: 10, tags: ['collocations', 'expressions']
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'La crisis económica tuvo un ___ profundo en la sociedad.',
    options: [{ label: 'impacto', value: 'impacto' }, { label: 'golpe', value: 'golpe' }, { label: 'choque', value: 'choque' }, { label: 'encuentro', value: 'encuentro' }],
    correctAnswer: 'impacto', points: 1, orderIndex: 11, tags: ['economics', 'nouns']
  },

  // ============================================================
  // C1 — Advanced (2 questions)
  // ============================================================
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'El discurso del político fue deliberadamente ___ para no comprometerse con ninguna postura.',
    options: [{ label: 'ambiguo', value: 'ambiguo' }, { label: 'ambicioso', value: 'ambicioso' }, { label: 'anónimo', value: 'anónimo' }, { label: 'análogo', value: 'análogo' }],
    correctAnswer: 'ambiguo', points: 1, orderIndex: 12, tags: ['politics', 'advanced adjectives']
  },
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Su ___ atención al detalle la convierte en la candidata ideal.',
    options: [{ label: 'meticulosa', value: 'meticulosa' }, { label: 'maliciosa', value: 'maliciosa' }, { label: 'milagrosa', value: 'milagrosa' }, { label: 'traviesa', value: 'traviesa' }],
    correctAnswer: 'meticulosa', points: 1, orderIndex: 13, tags: ['work', 'advanced adjectives']
  },

  // ============================================================
  // C2 — Proficiency (2 questions)
  // ============================================================
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'La obra del artista es una ___ impecable de tradición e innovación.',
    options: [{ label: 'fusión', value: 'fusión' }, { label: 'confusión', value: 'confusión' }, { label: 'fisión', value: 'fisión' }, { label: 'función', value: 'función' }],
    correctAnswer: 'fusión', points: 1, orderIndex: 14, tags: ['art', 'advanced nouns']
  },
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'La explicación ___ del profesor dejó a los alumnos avanzados sin poder seguir el hilo.',
    options: [{ label: 'enrevesada', value: 'enrevesada' }, { label: 'consolidada', value: 'consolidada' }, { label: 'contemplada', value: 'contemplada' }, { label: 'congregada', value: 'congregada' }],
    correctAnswer: 'enrevesada', points: 1, orderIndex: 15, tags: ['academic', 'advanced adjectives']
  },
]
