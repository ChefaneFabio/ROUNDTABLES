import { MultiSkillQuestionData } from '../types'

// Spanish Vocabulary-in-Context Questions — 60 questions
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

  // ============================================================
  // NEW QUESTIONS — 45 additional (orderIndex 16–60)
  // ============================================================

  // ── A1 — Basic words (8 questions, 16–23) ───────────────────
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'El ___ es amarillo.',
    options: [{ label: 'sol', value: 'sol' }, { label: 'agua', value: 'agua' }, { label: 'nieve', value: 'nieve' }, { label: 'cielo', value: 'cielo' }],
    correctAnswer: 'sol', points: 1, orderIndex: 16, tags: ['nature', 'colors']
  },
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Los niños juegan en el ___.',
    options: [{ label: 'parque', value: 'parque' }, { label: 'oficina', value: 'oficina' }, { label: 'hospital', value: 'hospital' }, { label: 'banco', value: 'banco' }],
    correctAnswer: 'parque', points: 1, orderIndex: 17, tags: ['places', 'basic']
  },
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Necesito un ___ de agua, por favor.',
    options: [{ label: 'vaso', value: 'vaso' }, { label: 'plato', value: 'plato' }, { label: 'cuchillo', value: 'cuchillo' }, { label: 'tenedor', value: 'tenedor' }],
    correctAnswer: 'vaso', points: 1, orderIndex: 18, tags: ['food', 'objects']
  },
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Mi color favorito es el ___.',
    options: [{ label: 'azul', value: 'azul' }, { label: 'rápido', value: 'rápido' }, { label: 'grande', value: 'grande' }, { label: 'lejos', value: 'lejos' }],
    correctAnswer: 'azul', points: 1, orderIndex: 19, tags: ['colors', 'basic']
  },
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'El perro tiene cuatro ___.',
    options: [{ label: 'patas', value: 'patas' }, { label: 'manos', value: 'manos' }, { label: 'alas', value: 'alas' }, { label: 'ruedas', value: 'ruedas' }],
    correctAnswer: 'patas', points: 1, orderIndex: 20, tags: ['animals', 'body']
  },
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Hoy hace mucho ___; necesito mi abrigo.',
    options: [{ label: 'frío', value: 'frío' }, { label: 'calor', value: 'calor' }, { label: 'viento', value: 'viento' }, { label: 'sol', value: 'sol' }],
    correctAnswer: 'frío', points: 1, orderIndex: 21, tags: ['weather', 'clothing']
  },
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Me duele la ___.',
    options: [{ label: 'cabeza', value: 'cabeza' }, { label: 'mesa', value: 'mesa' }, { label: 'puerta', value: 'puerta' }, { label: 'ventana', value: 'ventana' }],
    correctAnswer: 'cabeza', points: 1, orderIndex: 22, tags: ['body', 'health']
  },
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Para desayunar como pan con ___.',
    options: [{ label: 'mantequilla', value: 'mantequilla' }, { label: 'silla', value: 'silla' }, { label: 'lápiz', value: 'lápiz' }, { label: 'reloj', value: 'reloj' }],
    correctAnswer: 'mantequilla', points: 1, orderIndex: 23, tags: ['food', 'breakfast']
  },

  // ── A2 — Daily life (8 questions, 24–31) ────────────────────
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'El autobús llega a la ___ a las ocho.',
    options: [{ label: 'parada', value: 'parada' }, { label: 'tienda', value: 'tienda' }, { label: 'playa', value: 'playa' }, { label: 'cocina', value: 'cocina' }],
    correctAnswer: 'parada', points: 1, orderIndex: 24, tags: ['transport', 'daily life']
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'No encuentro mis ___; no puedo abrir la puerta.',
    options: [{ label: 'llaves', value: 'llaves' }, { label: 'gafas', value: 'gafas' }, { label: 'guantes', value: 'guantes' }, { label: 'zapatos', value: 'zapatos' }],
    correctAnswer: 'llaves', points: 1, orderIndex: 25, tags: ['objects', 'daily life']
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Me gusta ___ por el parque los domingos.',
    options: [{ label: 'pasear', value: 'pasear' }, { label: 'conducir', value: 'conducir' }, { label: 'volar', value: 'volar' }, { label: 'nadar', value: 'nadar' }],
    correctAnswer: 'pasear', points: 1, orderIndex: 26, tags: ['leisure', 'verbs']
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Tengo que ___ la ropa antes de salir.',
    options: [{ label: 'planchar', value: 'planchar' }, { label: 'cocinar', value: 'cocinar' }, { label: 'barrer', value: 'barrer' }, { label: 'fregar', value: 'fregar' }],
    correctAnswer: 'planchar', points: 1, orderIndex: 27, tags: ['housework', 'daily life']
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'El ___ de mi apartamento es muy caro.',
    options: [{ label: 'alquiler', value: 'alquiler' }, { label: 'balcón', value: 'balcón' }, { label: 'tejado', value: 'tejado' }, { label: 'jardín', value: 'jardín' }],
    correctAnswer: 'alquiler', points: 1, orderIndex: 28, tags: ['housing', 'money']
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Voy a la ___ a comprar medicinas.',
    options: [{ label: 'farmacia', value: 'farmacia' }, { label: 'panadería', value: 'panadería' }, { label: 'carnicería', value: 'carnicería' }, { label: 'librería', value: 'librería' }],
    correctAnswer: 'farmacia', points: 1, orderIndex: 29, tags: ['shops', 'health']
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Por favor, ¿me puede dar la ___? Quiero pagar.',
    options: [{ label: 'cuenta', value: 'cuenta' }, { label: 'carta', value: 'carta' }, { label: 'mesa', value: 'mesa' }, { label: 'propina', value: 'propina' }],
    correctAnswer: 'cuenta', points: 1, orderIndex: 30, tags: ['restaurant', 'daily life']
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'No me encuentro bien; creo que tengo ___.',
    options: [{ label: 'fiebre', value: 'fiebre' }, { label: 'hambre', value: 'hambre' }, { label: 'sueño', value: 'sueño' }, { label: 'prisa', value: 'prisa' }],
    correctAnswer: 'fiebre', points: 1, orderIndex: 31, tags: ['health', 'symptoms']
  },

  // ── B1 — Work & travel (7 questions, 32–38) ─────────────────
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Necesito ___ mi currículum antes de enviar la solicitud.',
    options: [{ label: 'actualizar', value: 'actualizar' }, { label: 'cancelar', value: 'cancelar' }, { label: 'devolver', value: 'devolver' }, { label: 'retirar', value: 'retirar' }],
    correctAnswer: 'actualizar', points: 1, orderIndex: 32, tags: ['work', 'verbs']
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'El vuelo tuvo un ___ de dos horas por la tormenta.',
    options: [{ label: 'retraso', value: 'retraso' }, { label: 'adelanto', value: 'adelanto' }, { label: 'cambio', value: 'cambio' }, { label: 'descuento', value: 'descuento' }],
    correctAnswer: 'retraso', points: 1, orderIndex: 33, tags: ['travel', 'transport']
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'La empresa ofrece un buen ___ con seguro médico incluido.',
    options: [{ label: 'sueldo', value: 'sueldo' }, { label: 'precio', value: 'precio' }, { label: 'gasto', value: 'gasto' }, { label: 'coste', value: 'coste' }],
    correctAnswer: 'sueldo', points: 1, orderIndex: 34, tags: ['work', 'money']
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Vamos a ___ una habitación en el hotel para tres noches.',
    options: [{ label: 'reservar', value: 'reservar' }, { label: 'alquilar', value: 'alquilar' }, { label: 'comprar', value: 'comprar' }, { label: 'vender', value: 'vender' }],
    correctAnswer: 'reservar', points: 1, orderIndex: 35, tags: ['travel', 'hotel']
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'El jefe convocó una ___ urgente para las cuatro.',
    options: [{ label: 'reunión', value: 'reunión' }, { label: 'fiesta', value: 'fiesta' }, { label: 'excursión', value: 'excursión' }, { label: 'ceremonia', value: 'ceremonia' }],
    correctAnswer: 'reunión', points: 1, orderIndex: 36, tags: ['work', 'meetings']
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Antes de viajar al extranjero, hay que ___ el pasaporte.',
    options: [{ label: 'renovar', value: 'renovar' }, { label: 'devolver', value: 'devolver' }, { label: 'perder', value: 'perder' }, { label: 'romper', value: 'romper' }],
    correctAnswer: 'renovar', points: 1, orderIndex: 37, tags: ['travel', 'documents']
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'El ___ de desempleo ha bajado este trimestre.',
    options: [{ label: 'índice', value: 'índice' }, { label: 'precio', value: 'precio' }, { label: 'grupo', value: 'grupo' }, { label: 'número', value: 'número' }],
    correctAnswer: 'índice', points: 1, orderIndex: 38, tags: ['work', 'economics']
  },

  // ── B2 — Abstract concepts (7 questions, 39–45) ─────────────
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'La falta de transparencia ___ la confianza de los ciudadanos.',
    options: [{ label: 'socava', value: 'socava' }, { label: 'apoya', value: 'apoya' }, { label: 'celebra', value: 'celebra' }, { label: 'construye', value: 'construye' }],
    correctAnswer: 'socava', points: 2, orderIndex: 39, tags: ['politics', 'abstract verbs']
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Es fundamental ___ la brecha entre ricos y pobres.',
    options: [{ label: 'reducir', value: 'reducir' }, { label: 'ampliar', value: 'ampliar' }, { label: 'ignorar', value: 'ignorar' }, { label: 'duplicar', value: 'duplicar' }],
    correctAnswer: 'reducir', points: 2, orderIndex: 40, tags: ['society', 'abstract']
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'La investigación ___ datos reveladores sobre el cambio climático.',
    options: [{ label: 'arrojó', value: 'arrojó' }, { label: 'escondió', value: 'escondió' }, { label: 'destruyó', value: 'destruyó' }, { label: 'ignoró', value: 'ignoró' }],
    correctAnswer: 'arrojó', points: 2, orderIndex: 41, tags: ['science', 'collocations']
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'El debate ___ una reflexión profunda entre los asistentes.',
    options: [{ label: 'suscitó', value: 'suscitó' }, { label: 'suprimió', value: 'suprimió' }, { label: 'sustituyó', value: 'sustituyó' }, { label: 'suspendió', value: 'suspendió' }],
    correctAnswer: 'suscitó', points: 2, orderIndex: 42, tags: ['debate', 'formal verbs']
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Las nuevas medidas ___ a mejorar la calidad del aire.',
    options: [{ label: 'contribuyen', value: 'contribuyen' }, { label: 'contradicen', value: 'contradicen' }, { label: 'confunden', value: 'confunden' }, { label: 'compiten', value: 'compiten' }],
    correctAnswer: 'contribuyen', points: 2, orderIndex: 43, tags: ['environment', 'formal verbs']
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Su comportamiento fue ___ inaceptable.',
    options: [{ label: 'rotundamente', value: 'rotundamente' }, { label: 'levemente', value: 'levemente' }, { label: 'parcialmente', value: 'parcialmente' }, { label: 'ligeramente', value: 'ligeramente' }],
    correctAnswer: 'rotundamente', points: 2, orderIndex: 44, tags: ['adverbs', 'emphasis']
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'El acuerdo supone un ___ significativo en las relaciones diplomáticas.',
    options: [{ label: 'avance', value: 'avance' }, { label: 'retroceso', value: 'retroceso' }, { label: 'fracaso', value: 'fracaso' }, { label: 'abandono', value: 'abandono' }],
    correctAnswer: 'avance', points: 2, orderIndex: 45, tags: ['diplomacy', 'abstract nouns']
  },

  // ── C1 — Idiomatic expressions (8 questions, 46–53) ─────────
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'El proyecto se quedó en ___ de borrajas; nunca se realizó.',
    options: [{ label: 'agua', value: 'agua' }, { label: 'humo', value: 'humo' }, { label: 'polvo', value: 'polvo' }, { label: 'nada', value: 'nada' }],
    correctAnswer: 'agua', points: 2, orderIndex: 46, tags: ['idioms', 'expressions']
  },
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'No me vengas con ___; quiero la verdad.',
    options: [{ label: 'rodeos', value: 'rodeos' }, { label: 'cuentos', value: 'cuentos' }, { label: 'chistes', value: 'chistes' }, { label: 'canciones', value: 'canciones' }],
    correctAnswer: 'rodeos', points: 2, orderIndex: 47, tags: ['idioms', 'communication']
  },
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Está lloviendo a ___; mejor nos quedamos en casa.',
    options: [{ label: 'cántaros', value: 'cántaros' }, { label: 'mares', value: 'mares' }, { label: 'ríos', value: 'ríos' }, { label: 'chorros', value: 'chorros' }],
    correctAnswer: 'cántaros', points: 2, orderIndex: 48, tags: ['idioms', 'weather']
  },
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Las negociaciones han llegado a un punto ___; ninguna parte quiere ceder.',
    options: [{ label: 'muerto', value: 'muerto' }, { label: 'vivo', value: 'vivo' }, { label: 'final', value: 'final' }, { label: 'medio', value: 'medio' }],
    correctAnswer: 'muerto', points: 2, orderIndex: 49, tags: ['idioms', 'negotiation']
  },
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'La situación es muy ___; debemos actuar con cautela.',
    options: [{ label: 'espinosa', value: 'espinosa' }, { label: 'plana', value: 'plana' }, { label: 'dulce', value: 'dulce' }, { label: 'ligera', value: 'ligera' }],
    correctAnswer: 'espinosa', points: 2, orderIndex: 50, tags: ['advanced adjectives', 'figurative']
  },
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'La medida ha sido objeto de una gran ___; muchos la critican abiertamente.',
    options: [{ label: 'polémica', value: 'polémica' }, { label: 'solución', value: 'solución' }, { label: 'celebración', value: 'celebración' }, { label: 'admiración', value: 'admiración' }],
    correctAnswer: 'polémica', points: 2, orderIndex: 51, tags: ['media', 'abstract nouns']
  },
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'El escritor hizo ___ de sus conocimientos de historia en la novela.',
    options: [{ label: 'gala', value: 'gala' }, { label: 'caso', value: 'caso' }, { label: 'falta', value: 'falta' }, { label: 'cola', value: 'cola' }],
    correctAnswer: 'gala', points: 2, orderIndex: 52, tags: ['idioms', 'literature']
  },
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'La empresa ha ___ una reestructuración profunda este año.',
    options: [{ label: 'acometido', value: 'acometido' }, { label: 'abandonado', value: 'abandonado' }, { label: 'aplazado', value: 'aplazado' }, { label: 'anulado', value: 'anulado' }],
    correctAnswer: 'acometido', points: 2, orderIndex: 53, tags: ['business', 'formal verbs']
  },

  // ── C2 — Literary & highly formal (7 questions, 54–60) ──────
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'La novela es una ___ del materialismo contemporáneo.',
    options: [{ label: 'diatriba', value: 'diatriba' }, { label: 'alabanza', value: 'alabanza' }, { label: 'imitación', value: 'imitación' }, { label: 'traducción', value: 'traducción' }],
    correctAnswer: 'diatriba', points: 2, orderIndex: 54, tags: ['literary', 'advanced nouns']
  },
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'El poeta recurre a la ___ para evocar el paso del tiempo.',
    options: [{ label: 'prosopopeya', value: 'prosopopeya' }, { label: 'anáfora', value: 'anáfora' }, { label: 'hipérbole', value: 'hipérbole' }, { label: 'sinécdoque', value: 'sinécdoque' }],
    correctAnswer: 'prosopopeya', points: 2, orderIndex: 55, tags: ['literary', 'rhetoric']
  },
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Su discurso fue de una ___ admirable; cada palabra estaba perfectamente elegida.',
    options: [{ label: 'concisión', value: 'concisión' }, { label: 'confusión', value: 'confusión' }, { label: 'contradicción', value: 'contradicción' }, { label: 'convulsión', value: 'convulsión' }],
    correctAnswer: 'concisión', points: 2, orderIndex: 56, tags: ['rhetoric', 'advanced nouns']
  },
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'La ___ de aquella época se caracterizaba por un profundo escepticismo.',
    options: [{ label: 'cosmovisión', value: 'cosmovisión' }, { label: 'costumbre', value: 'costumbre' }, { label: 'constitución', value: 'constitución' }, { label: 'controversia', value: 'controversia' }],
    correctAnswer: 'cosmovisión', points: 2, orderIndex: 57, tags: ['philosophy', 'literary']
  },
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'El autor adopta un tono ___ para criticar la hipocresía social.',
    options: [{ label: 'mordaz', value: 'mordaz' }, { label: 'amable', value: 'amable' }, { label: 'neutro', value: 'neutro' }, { label: 'jovial', value: 'jovial' }],
    correctAnswer: 'mordaz', points: 2, orderIndex: 58, tags: ['literary', 'tone']
  },
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Las palabras del filósofo poseen una ___ que trasciende su época.',
    options: [{ label: 'vigencia', value: 'vigencia' }, { label: 'violencia', value: 'violencia' }, { label: 'vaguedad', value: 'vaguedad' }, { label: 'vanidad', value: 'vanidad' }],
    correctAnswer: 'vigencia', points: 2, orderIndex: 59, tags: ['philosophy', 'advanced nouns']
  },
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'El manuscrito fue hallado en un estado de ___ avanzado.',
    options: [{ label: 'deterioro', value: 'deterioro' }, { label: 'desarrollo', value: 'desarrollo' }, { label: 'despliegue', value: 'despliegue' }, { label: 'desempeño', value: 'desempeño' }],
    correctAnswer: 'deterioro', points: 2, orderIndex: 60, tags: ['literary', 'conservation']
  },
]
