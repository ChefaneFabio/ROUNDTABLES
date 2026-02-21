import { MultiSkillQuestionData } from '../types'

// Spanish Writing Prompts — 2-3 per CEFR level (14 total)
// Progressive complexity: short answer -> paragraph -> essay

export const spanishWritingQuestions: MultiSkillQuestionData[] = [
  // A1 — Short answers (20-50 words)
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'SHORT_ANSWER', skill: 'WRITING',
    questionText: 'Escribe sobre ti. Incluye tu nombre, tu edad, de dónde eres y una cosa que te gusta.',
    correctAnswer: '', points: 1, orderIndex: 1,
    rubric: { minWords: 20, maxWords: 50, criteria: ['información personal básica', 'oraciones simples', 'vocabulario básico'] },
    tags: ['personal', 'presentación'], timeSuggested: 180
  },
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'SHORT_ANSWER', skill: 'WRITING',
    questionText: 'Describe a tu familia. ¿Cuántas personas hay en tu familia? ¿Cómo se llaman?',
    correctAnswer: '', points: 1, orderIndex: 2,
    rubric: { minWords: 20, maxWords: 50, criteria: ['vocabulario de familia', 'números', 'oraciones simples'] },
    tags: ['familia'], timeSuggested: 180
  },
  // A2 — Short answers (30-60 words)
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'SHORT_ANSWER', skill: 'WRITING',
    questionText: 'Describe tu rutina diaria. ¿Qué haces por la mañana, por la tarde y por la noche?',
    correctAnswer: '', points: 1, orderIndex: 3,
    rubric: { minWords: 30, maxWords: 60, criteria: ['expresiones de tiempo', 'presente de indicativo', 'conectores de secuencia'] },
    tags: ['rutina diaria'], timeSuggested: 240
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'SHORT_ANSWER', skill: 'WRITING',
    questionText: 'Escribe sobre tus últimas vacaciones. ¿Adónde fuiste? ¿Qué hiciste? ¿Te gustó?',
    correctAnswer: '', points: 1, orderIndex: 4,
    rubric: { minWords: 30, maxWords: 60, criteria: ['pretérito indefinido', 'vocabulario de viajes', 'opiniones'] },
    tags: ['viajes', 'pasado'], timeSuggested: 240
  },
  // B1 — Paragraph (80-150 words)
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'SHORT_ANSWER', skill: 'WRITING',
    questionText: '¿Crees que es mejor vivir en una ciudad o en el campo? Da razones para tu opinión.',
    correctAnswer: '', points: 2, orderIndex: 5,
    rubric: { minWords: 80, maxWords: 150, criteria: ['expresión de opinión', 'estructuras comparativas', 'razones de apoyo', 'estructura de párrafo'] },
    tags: ['opinión', 'comparativos'], timeSuggested: 360
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'SHORT_ANSWER', skill: 'WRITING',
    questionText: 'Escribe sobre las ventajas y desventajas de usar las redes sociales. Da ejemplos de tu experiencia.',
    correctAnswer: '', points: 2, orderIndex: 6,
    rubric: { minWords: 80, maxWords: 150, criteria: ['estructura ventajas/desventajas', 'conectores', 'ejemplos', 'argumento coherente'] },
    tags: ['tecnología', 'opinión'], timeSuggested: 360
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'SHORT_ANSWER', skill: 'WRITING',
    questionText: 'Describe a una persona que ha influido en tu vida y explica por qué es importante para ti.',
    correctAnswer: '', points: 2, orderIndex: 7,
    rubric: { minWords: 80, maxWords: 150, criteria: ['descripción de personas', 'narrativa personal', 'pretérito perfecto/indefinido', 'vocabulario emocional'] },
    tags: ['personal', 'descripción'], timeSuggested: 360
  },
  // B2 — Paragraph (100-200 words)
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'Algunas personas creen que el teletrabajo sustituirá al trabajo tradicional en oficinas en el futuro. ¿En qué medida estás de acuerdo o en desacuerdo? Apoya tu argumento con razones específicas.',
    correctAnswer: '', points: 2, orderIndex: 8,
    rubric: { minWords: 100, maxWords: 200, criteria: ['tesis clara', 'argumentos de apoyo', 'conciencia de contraargumentos', 'registro formal', 'conectores discursivos'] },
    tags: ['trabajo', 'opinión', 'formal'], timeSuggested: 480
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'Escribe sobre cómo la tecnología ha cambiado la forma en que las personas aprenden idiomas. Incluye tanto efectos positivos como negativos.',
    correctAnswer: '', points: 2, orderIndex: 9,
    rubric: { minWords: 100, maxWords: 200, criteria: ['argumento equilibrado', 'ejemplos específicos', 'causa y efecto', 'vocabulario académico'] },
    tags: ['tecnología', 'educación'], timeSuggested: 480
  },
  // C1 — Essay (150-250 words)
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'Evalúa críticamente la afirmación de que las redes sociales han causado más daño que beneficio al discurso democrático. Aporta evidencias para respaldar tu argumento.',
    correctAnswer: '', points: 3, orderIndex: 10,
    rubric: { minWords: 150, maxWords: 250, criteria: ['análisis crítico', 'argumento basado en evidencias', 'posición matizada', 'vocabulario sofisticado', 'recursos retóricos', 'estructura lógica'] },
    tags: ['medios', 'política', 'pensamiento crítico'], timeSuggested: 600
  },
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'Analiza las implicaciones éticas de la inteligencia artificial en la sanidad. ¿Deberían los sistemas de IA tomar decisiones diagnósticas sin supervisión humana?',
    correctAnswer: '', points: 3, orderIndex: 11,
    rubric: { minWords: 150, maxWords: 250, criteria: ['razonamiento ético', 'múltiples perspectivas', 'registro académico', 'estructuras condicionales', 'lenguaje de atenuación'] },
    tags: ['tecnología', 'ética', 'salud'], timeSuggested: 600
  },
  // C2 — Essay (200-300 words)
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'La mercantilización de la educación superior ha alterado fundamentalmente su propósito y su valor. Discute esta afirmación considerando tanto perspectivas económicas como filosóficas.',
    correctAnswer: '', points: 3, orderIndex: 12,
    rubric: { minWords: 200, maxWords: 300, criteria: ['argumentación sofisticada', 'referencias interdisciplinarias', 'razonamiento abstracto', 'fluidez casi nativa', 'variedad estilística', 'conclusión matizada'] },
    tags: ['educación', 'filosofía', 'economía'], timeSuggested: 720
  },
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'ESSAY', skill: 'WRITING',
    questionText: '¿Hasta qué punto puede el lenguaje moldear la realidad? Discute con referencia a la hipótesis de Sapir-Whorf y la investigación contemporánea sobre la relatividad lingüística.',
    correctAnswer: '', points: 3, orderIndex: 13,
    rubric: { minWords: 200, maxWords: 300, criteria: ['argumentación académica', 'conocimiento teórico', 'evaluación crítica de evidencias', 'estructura de ensayo académico cohesivo', 'vocabulario preciso y variado'] },
    tags: ['lingüística', 'filosofía'], timeSuggested: 720
  },
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'Analiza la tensión entre la privacidad individual y la seguridad colectiva en la era digital. ¿Cómo deberían las sociedades democráticas abordar este dilema?',
    correctAnswer: '', points: 3, orderIndex: 14,
    rubric: { minWords: 200, maxWords: 300, criteria: ['profundidad filosófica', 'análisis equilibrado', 'conciencia de políticas públicas', 'prosa elegante', 'coherencia lógica'] },
    tags: ['tecnología', 'política', 'ética'], timeSuggested: 720
  }
]
