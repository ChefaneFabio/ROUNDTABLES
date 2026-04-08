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
    questionText: 'Describe tu equipo de trabajo. ¿Cuántas personas hay en tu equipo? ¿Qué hacen?',
    correctAnswer: '', points: 1, orderIndex: 2,
    rubric: { minWords: 20, maxWords: 50, criteria: ['vocabulario laboral', 'números', 'oraciones simples'] },
    tags: ['trabajo'], timeSuggested: 180
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
  },

  // ============================================================
  // NUEVAS PREGUNTAS — 16 más (orderIndex 15-30)
  // ============================================================

  // A1 (20-50 palabras)
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'SHORT_ANSWER', skill: 'WRITING',
    questionText: 'Escribe una postal corta a un amigo. Dile dónde estás y cómo está el tiempo.',
    correctAnswer: '', points: 1, orderIndex: 15,
    rubric: { minWords: 20, maxWords: 50, criteria: ['fórmula de saludo', 'oraciones simples', 'vocabulario del tiempo'] },
    tags: ['postal', 'tiempo'], timeSuggested: 180
  },
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'SHORT_ANSWER', skill: 'WRITING',
    questionText: 'Describe tu casa o apartamento. ¿Cuántas habitaciones tiene? ¿Cuál es tu habitación favorita?',
    correctAnswer: '', points: 1, orderIndex: 16,
    rubric: { minWords: 20, maxWords: 50, criteria: ['vocabulario de la vivienda', 'hay', 'adjetivos simples'] },
    tags: ['vivienda', 'descripción'], timeSuggested: 180
  },
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'SHORT_ANSWER', skill: 'WRITING',
    questionText: '¿Qué te gusta comer y beber? Escribe sobre tus comidas favoritas.',
    correctAnswer: '', points: 1, orderIndex: 17,
    rubric: { minWords: 20, maxWords: 50, criteria: ['vocabulario de comida', 'gustar/preferir', 'oraciones simples'] },
    tags: ['comida', 'preferencias'], timeSuggested: 180
  },

  // A2 (40-80 palabras)
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'SHORT_ANSWER', skill: 'WRITING',
    questionText: 'Escribe un correo electrónico a un amigo invitándolo a una fiesta. Incluye la fecha, la hora, el lugar y qué debe traer.',
    correctAnswer: '', points: 1, orderIndex: 18,
    rubric: { minWords: 40, maxWords: 80, criteria: ['formato de correo', 'planes futuros', 'lenguaje de invitación', 'detalles'] },
    tags: ['correo', 'invitación'], timeSuggested: 240
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'SHORT_ANSWER', skill: 'WRITING',
    questionText: 'Describe a tu mejor amigo/a. ¿Cómo es físicamente? ¿Qué os gusta hacer juntos?',
    correctAnswer: '', points: 1, orderIndex: 19,
    rubric: { minWords: 40, maxWords: 80, criteria: ['descripción física', 'adjetivos de personalidad', 'presente de indicativo', 'gustar + infinitivo'] },
    tags: ['amigo', 'descripción'], timeSuggested: 240
  },

  // B1 (80-150 palabras)
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'SHORT_ANSWER', skill: 'WRITING',
    questionText: 'Escribe una carta de reclamación al director de un hotel sobre un problema que tuviste durante tu estancia.',
    correctAnswer: '', points: 2, orderIndex: 20,
    rubric: { minWords: 80, maxWords: 150, criteria: ['formato de carta formal', 'lenguaje de reclamación', 'narrativa en pasado', 'peticiones corteses'] },
    tags: ['reclamación', 'carta formal'], timeSuggested: 360
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'SHORT_ANSWER', skill: 'WRITING',
    questionText: '¿Crees que el horario flexible mejora la productividad? Da tu opinión con razones y ejemplos.',
    correctAnswer: '', points: 2, orderIndex: 21,
    rubric: { minWords: 80, maxWords: 150, criteria: ['expresión de opinión', 'razones de apoyo', 'ejemplos', 'estructura de párrafo'] },
    tags: ['opinión', 'educación'], timeSuggested: 360
  },

  // B2 (150-250 palabras)
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'Redacta un informe sobre el impacto del turismo en las comunidades locales. Considera los efectos positivos y negativos y sugiere soluciones.',
    correctAnswer: '', points: 2, orderIndex: 22,
    rubric: { minWords: 150, maxWords: 250, criteria: ['estructura de informe', 'análisis equilibrado', 'recomendaciones', 'registro formal', 'conectores discursivos'] },
    tags: ['informe', 'turismo'], timeSuggested: 480
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'Algunos consideran que los deportes de competición enseñan habilidades importantes para la vida, mientras otros piensan que ejercen demasiada presión sobre los jóvenes. Discute ambas posturas.',
    correctAnswer: '', points: 2, orderIndex: 23,
    rubric: { minWords: 150, maxWords: 250, criteria: ['tesis clara', 'argumento equilibrado', 'ejemplos específicos', 'vocabulario formal', 'estructura lógica'] },
    tags: ['argumentativo', 'deporte'], timeSuggested: 480
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'Escribe un ensayo discutiendo si los influencers de redes sociales tienen un impacto positivo o negativo en la autoestima y los valores de los jóvenes.',
    correctAnswer: '', points: 2, orderIndex: 24,
    rubric: { minWords: 150, maxWords: 250, criteria: ['estructura argumentativa', 'conciencia de contraargumentos', 'ejemplos', 'vocabulario académico'] },
    tags: ['argumentativo', 'redes sociales'], timeSuggested: 480
  },

  // C1 (200-350 palabras)
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'Redacta una propuesta para tu empresa o institución sugiriendo formas de reducir su huella ecológica. Incluye medidas específicas y justifica su viabilidad.',
    correctAnswer: '', points: 3, orderIndex: 25,
    rubric: { minWords: 200, maxWords: 350, criteria: ['formato de propuesta', 'argumentación persuasiva', 'análisis de viabilidad', 'vocabulario sofisticado', 'registro formal'] },
    tags: ['propuesta', 'medio ambiente'], timeSuggested: 600
  },
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'Analiza críticamente el papel de los exámenes estandarizados en la educación. ¿Miden el aprendizaje de forma eficaz o dificultan un auténtico desarrollo intelectual?',
    correctAnswer: '', points: 3, orderIndex: 26,
    rubric: { minWords: 200, maxWords: 350, criteria: ['análisis crítico', 'argumento basado en evidencias', 'posición matizada', 'recursos retóricos', 'registro académico'] },
    tags: ['análisis crítico', 'educación'], timeSuggested: 600
  },

  // C2 (250-400 palabras)
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'Escribe un ensayo filosófico explorando si las verdades morales son hechos objetivos o construcciones sociales. Haz referencia a al menos dos tradiciones filosóficas.',
    correctAnswer: '', points: 3, orderIndex: 27,
    rubric: { minWords: 250, maxWords: 400, criteria: ['profundidad filosófica', 'referencias interdisciplinarias', 'razonamiento abstracto', 'fluidez casi nativa', 'prosa elegante'] },
    tags: ['filosofía', 'ética'], timeSuggested: 720
  },
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'Escribe una crítica literaria de una novela u obra de teatro que hayas leído, analizando sus temas, técnicas narrativas y significado cultural.',
    correctAnswer: '', points: 3, orderIndex: 28,
    rubric: { minWords: 250, maxWords: 400, criteria: ['análisis literario', 'argumentación sofisticada', 'evaluación crítica', 'vocabulario preciso', 'variedad estilística'] },
    tags: ['crítica literaria', 'cultura'], timeSuggested: 720
  },
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'Examina la paradoja de la tolerancia: ¿puede una sociedad verdaderamente tolerante tolerar la intolerancia? Discute con referencia a la filosofía política y ejemplos contemporáneos.',
    correctAnswer: '', points: 3, orderIndex: 29,
    rubric: { minWords: 250, maxWords: 400, criteria: ['razonamiento filosófico', 'conclusión matizada', 'registro académico', 'manejo de contraargumentos', 'coherencia lógica'] },
    tags: ['filosofía', 'política'], timeSuggested: 720
  },
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'ESSAY', skill: 'WRITING',
    questionText: '¿Es la noción de meritocracia un ideal útil o un mito peligroso? Analiza las dimensiones sociológicas y filosóficas de esta cuestión.',
    correctAnswer: '', points: 3, orderIndex: 30,
    rubric: { minWords: 250, maxWords: 400, criteria: ['argumentación sofisticada', 'análisis interdisciplinario', 'razonamiento abstracto', 'expresión elegante', 'posición matizada'] },
    tags: ['sociología', 'filosofía', 'economía'], timeSuggested: 720
  }
]
