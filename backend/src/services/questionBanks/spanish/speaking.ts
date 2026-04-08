import { MultiSkillQuestionData } from '../types'

// Spanish Speaking Prompts — 2-3 per CEFR level (14 total)
// Types: Read aloud, describe, opinion, argue

export const spanishSpeakingQuestions: MultiSkillQuestionData[] = [
  // A1 — Read aloud + simple question
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Lee la siguiente oración en voz alta:',
    speakingPrompt: 'Hola, me llamo [tu nombre]. Soy de [tu país]. Me gusta [algo que te gusta].',
    correctAnswer: '', points: 1, orderIndex: 1,
    rubric: { criteria: ['pronunciación', 'fluidez básica', 'habla comprensible'], maxDuration: 30 },
    tags: ['lectura en voz alta', 'presentación'], timeSuggested: 30
  },
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Contesta la siguiente pregunta. Habla durante unos 15-20 segundos:',
    speakingPrompt: '¿Qué haces normalmente los fines de semana?',
    correctAnswer: '', points: 1, orderIndex: 2,
    rubric: { criteria: ['respuesta comprensible', 'vocabulario básico', 'contenido relevante'], maxDuration: 30 },
    tags: ['pregunta simple', 'vida diaria'], timeSuggested: 30
  },
  // A2 — Read aloud + describe
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Lee el siguiente texto en voz alta con claridad:',
    speakingPrompt: 'El sábado pasado fui a una conferencia con mis compañeros de trabajo. El hotel era moderno y cómodo. Asistimos a tres talleres y conocimos a nuevos clientes. Fue un día muy productivo.',
    correctAnswer: '', points: 1, orderIndex: 3,
    rubric: { criteria: ['pronunciación clara', 'ritmo adecuado', 'entonación', 'pronunciación del pasado'], maxDuration: 45 },
    tags: ['lectura en voz alta', 'pasado'], timeSuggested: 45
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Describe tu comida favorita. ¿Cuál es? ¿Por qué te gusta? ¿Con qué frecuencia la comes? Habla durante unos 30 segundos.',
    speakingPrompt: 'Háblame de tu comida favorita.',
    correctAnswer: '', points: 1, orderIndex: 4,
    rubric: { criteria: ['vocabulario descriptivo', 'oraciones simples', 'contenido relevante', 'fluidez básica'], maxDuration: 45 },
    tags: ['descripción', 'comida'], timeSuggested: 45
  },
  // B1 — Describe situation + opinion
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Mira el tema de abajo y habla durante 45-60 segundos. Da tu opinión y razones.',
    speakingPrompt: '¿Crees que es importante aprender un idioma extranjero? ¿Por qué sí o por qué no? Da al menos dos razones.',
    correctAnswer: '', points: 2, orderIndex: 5,
    rubric: { criteria: ['opinión coherente', 'razones de apoyo', 'conectores', 'vocabulario adecuado', 'fluidez'], maxDuration: 60 },
    tags: ['opinión', 'educación'], timeSuggested: 60
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Describe una situación y da tu opinión. Habla durante 45-60 segundos.',
    speakingPrompt: 'Cuéntame un reto al que te enfrentaste y cómo lo superaste. ¿Qué aprendiste de la experiencia?',
    correctAnswer: '', points: 2, orderIndex: 6,
    rubric: { criteria: ['estructura narrativa', 'tiempos del pasado', 'reflexión', 'coherencia', 'fluidez'], maxDuration: 60 },
    tags: ['narrativa', 'experiencia personal'], timeSuggested: 60
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Compara dos cosas y expresa tu preferencia. Habla durante 45-60 segundos.',
    speakingPrompt: 'Compara viajar en avión y viajar en tren. ¿Cuál prefieres y por qué?',
    correctAnswer: '', points: 2, orderIndex: 7,
    rubric: { criteria: ['estructuras comparativas', 'expresión de preferencia', 'razones de apoyo', 'variedad de vocabulario'], maxDuration: 60 },
    tags: ['comparación', 'viajes'], timeSuggested: 60
  },
  // B2 — Describe and discuss
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Discute el siguiente tema durante 60-90 segundos. Presenta argumentos a favor y en contra.',
    speakingPrompt: 'Algunas personas creen que la tecnología nos facilita la vida, mientras que otras piensan que crea nuevos problemas. Discute ambas perspectivas y da tu propia opinión.',
    correctAnswer: '', points: 2, orderIndex: 8,
    rubric: { criteria: ['discusión equilibrada', 'vocabulario sofisticado', 'marcadores discursivos', 'fluidez y coherencia', 'posición clara'], maxDuration: 90 },
    tags: ['discusión', 'tecnología'], timeSuggested: 90
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Describe y analiza. Habla durante 60-90 segundos.',
    speakingPrompt: 'Describe cómo ha cambiado la forma de comunicarse de las personas en los últimos 20 años. ¿Cuáles son las ventajas y desventajas de estos cambios?',
    correctAnswer: '', points: 2, orderIndex: 9,
    rubric: { criteria: ['análisis', 'causa y efecto', 'ejemplos', 'argumento coherente', 'precisión en la pronunciación'], maxDuration: 90 },
    tags: ['análisis', 'comunicación'], timeSuggested: 90
  },
  // C1 — Argue a position
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Presenta y defiende una posición sobre el siguiente tema. Habla durante 90-120 segundos.',
    speakingPrompt: '¿Hasta qué punto deberían los gobiernos regular las plataformas de redes sociales? Considera cuestiones de libertad de expresión, desinformación y privacidad en tu respuesta.',
    correctAnswer: '', points: 3, orderIndex: 10,
    rubric: { criteria: ['argumentación sofisticada', 'posición matizada', 'atenuación y cualificación', 'vocabulario académico', 'fluidez sostenida', 'entonación natural'], maxDuration: 120 },
    tags: ['argumentación', 'política', 'tecnología'], timeSuggested: 120
  },
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Analiza y discute. Habla durante 90-120 segundos.',
    speakingPrompt: 'Algunos sostienen que la globalización ha reducido la diversidad cultural. Otros dicen que la ha enriquecido. ¿Cuál es tu punto de vista? Proporciona ejemplos específicos.',
    correctAnswer: '', points: 3, orderIndex: 11,
    rubric: { criteria: ['pensamiento crítico', 'ejemplos específicos', 'estructuras oracionales complejas', 'lenguaje idiomático', 'discurso extenso coherente'], maxDuration: 120 },
    tags: ['análisis', 'cultura', 'globalización'], timeSuggested: 120
  },
  // C2 — Abstract discussion
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Discute el siguiente tema abstracto en profundidad. Habla durante unos 2 minutos.',
    speakingPrompt: '¿Es posible una verdadera objetividad en el periodismo, o toda información publicada es inherentemente subjetiva? Explora las implicaciones filosóficas de esta cuestión.',
    correctAnswer: '', points: 3, orderIndex: 12,
    rubric: { criteria: ['profundidad filosófica', 'razonamiento abstracto', 'fluidez casi nativa', 'registro sofisticado', 'habilidad retórica', 'conclusión matizada'], maxDuration: 150 },
    tags: ['abstracto', 'filosofía', 'medios'], timeSuggested: 150
  },
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Presenta un argumento matizado sobre el siguiente tema. Habla durante unos 2 minutos.',
    speakingPrompt: '¿En qué medida la lengua que hablamos moldea nuestra forma de pensar y percibir el mundo? Recurre a ejemplos de diferentes lenguas o culturas si es posible.',
    correctAnswer: '', points: 3, orderIndex: 13,
    rubric: { criteria: ['profundidad intelectual', 'referencias interculturales', 'vocabulario preciso', 'flujo discursivo natural', 'expresión elegante'], maxDuration: 150 },
    tags: ['abstracto', 'lingüística', 'cultura'], timeSuggested: 150
  },
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Responde al siguiente dilema filosófico. Habla durante unos 2 minutos.',
    speakingPrompt: 'Si una inteligencia artificial puede producir obras creativas indistinguibles del arte humano, ¿disminuye esto el valor de la creatividad humana? ¿Por qué sí o por qué no?',
    correctAnswer: '', points: 3, orderIndex: 14,
    rubric: { criteria: ['razonamiento filosófico', 'consideración de contraargumentos', 'expresión elocuente', 'argumento sostenido', 'prosodia natural'], maxDuration: 150 },
    tags: ['abstracto', 'IA', 'creatividad'], timeSuggested: 150
  },

  // ============================================================
  // NUEVAS PREGUNTAS — 16 más (orderIndex 15-30)
  // ============================================================

  // A1
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Mira la imagen y describe lo que ves. Usa palabras sencillas.',
    speakingPrompt: 'Describe la imagen: hay una familia en la cocina. ¿Qué están haciendo?',
    correctAnswer: '', points: 1, orderIndex: 15,
    rubric: { criteria: ['vocabulario básico', 'oraciones simples', 'habla comprensible'], maxDuration: 30 },
    tags: ['describir imagen', 'familia'], timeSuggested: 30
  },
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Habla sobre ti mismo. Habla durante unos 15-20 segundos.',
    speakingPrompt: '¿Cuál es tu trabajo? ¿Dónde trabajas? ¿Te gusta tu trabajo?',
    correctAnswer: '', points: 1, orderIndex: 16,
    rubric: { criteria: ['respuesta comprensible', 'vocabulario básico', 'contenido relevante'], maxDuration: 30 },
    tags: ['presentación', 'trabajo'], timeSuggested: 30
  },
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Contesta la siguiente pregunta. Habla durante unos 15-20 segundos:',
    speakingPrompt: '¿Cuál es tu color favorito? ¿Qué cosas tienes de ese color?',
    correctAnswer: '', points: 1, orderIndex: 17,
    rubric: { criteria: ['vocabulario básico', 'oraciones simples', 'habla comprensible'], maxDuration: 30 },
    tags: ['pregunta simple', 'colores'], timeSuggested: 30
  },

  // A2
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Describe tu rutina de la mañana. Habla durante unos 30 segundos.',
    speakingPrompt: '¿Qué haces cada mañana? Cuéntame desde que te despiertas hasta que sales de casa.',
    correctAnswer: '', points: 1, orderIndex: 18,
    rubric: { criteria: ['expresiones de tiempo', 'presente de indicativo', 'conectores de secuencia', 'pronunciación clara'], maxDuration: 45 },
    tags: ['rutina', 'vida diaria'], timeSuggested: 45
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Cuenta una historia corta sobre algo que te pasó recientemente. Habla durante unos 30 segundos.',
    speakingPrompt: 'Cuéntame algo gracioso o interesante que te pasó la semana pasada.',
    correctAnswer: '', points: 1, orderIndex: 19,
    rubric: { criteria: ['pretérito indefinido', 'secuencia narrativa', 'fluidez básica', 'contenido relevante'], maxDuration: 45 },
    tags: ['relato', 'pasado'], timeSuggested: 45
  },

  // B1
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Habla sobre el siguiente tema durante 45-60 segundos. Da tu opinión.',
    speakingPrompt: '¿Crees que los empleados deberían poder teletrabajar? ¿Cuántos días por semana? ¿Por qué sí o por qué no?',
    correctAnswer: '', points: 1, orderIndex: 20,
    rubric: { criteria: ['opinión coherente', 'razones de apoyo', 'conectores', 'fluidez'], maxDuration: 60 },
    tags: ['opinión', 'tecnología'], timeSuggested: 60
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Explica tus planes para el futuro. Habla durante 45-60 segundos.',
    speakingPrompt: '¿Cuáles son tus planes para los próximos cinco años? ¿Qué te gustaría lograr y por qué?',
    correctAnswer: '', points: 1, orderIndex: 21,
    rubric: { criteria: ['futuro simple', 'estructuras condicionales', 'plan coherente', 'vocabulario adecuado'], maxDuration: 60 },
    tags: ['planes', 'futuro'], timeSuggested: 60
  },

  // B2
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Discute el siguiente tema durante 60-90 segundos. Presenta varias perspectivas.',
    speakingPrompt: '¿Debería la educación universitaria ser gratuita para todos? ¿Cuáles son las implicaciones económicas y sociales?',
    correctAnswer: '', points: 2, orderIndex: 22,
    rubric: { criteria: ['discusión equilibrada', 'vocabulario sofisticado', 'marcadores discursivos', 'fluidez y coherencia'], maxDuration: 90 },
    tags: ['debate', 'educación'], timeSuggested: 90
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Analiza la siguiente situación. Habla durante 60-90 segundos.',
    speakingPrompt: 'Muchas empresas están adoptando la semana laboral de cuatro días. Analiza los posibles efectos en la productividad, el bienestar de los empleados y la economía.',
    correctAnswer: '', points: 2, orderIndex: 23,
    rubric: { criteria: ['análisis', 'causa y efecto', 'ejemplos', 'argumento coherente', 'precisión en la pronunciación'], maxDuration: 90 },
    tags: ['análisis', 'trabajo'], timeSuggested: 90
  },

  // C1
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Presenta y defiende una posición. Habla durante 90-120 segundos.',
    speakingPrompt: '¿Es el crecimiento económico compatible con la sostenibilidad ambiental, o hay que sacrificar uno por el otro? Justifica tu posición con evidencias.',
    correctAnswer: '', points: 2, orderIndex: 24,
    rubric: { criteria: ['argumentación sofisticada', 'posición matizada', 'atenuación y cualificación', 'vocabulario académico', 'fluidez sostenida'], maxDuration: 120 },
    tags: ['argumentación', 'medio ambiente', 'economía'], timeSuggested: 120
  },
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Discute la siguiente idea abstracta. Habla durante 90-120 segundos.',
    speakingPrompt: '¿Qué papel desempeña la empatía en un liderazgo eficaz? ¿Se puede enseñar la empatía o es una cualidad innata?',
    correctAnswer: '', points: 2, orderIndex: 25,
    rubric: { criteria: ['pensamiento crítico', 'razonamiento abstracto', 'estructuras oracionales complejas', 'lenguaje idiomático', 'discurso extenso coherente'], maxDuration: 120 },
    tags: ['abstracto', 'liderazgo'], timeSuggested: 120
  },
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Analiza y discute. Habla durante 90-120 segundos.',
    speakingPrompt: '¿En qué medida la revolución digital ha ampliado o reducido la brecha entre los países desarrollados y los países en desarrollo? Proporciona ejemplos concretos.',
    correctAnswer: '', points: 2, orderIndex: 26,
    rubric: { criteria: ['análisis crítico', 'ejemplos específicos', 'registro académico', 'argumentación sostenida', 'entonación natural'], maxDuration: 120 },
    tags: ['análisis', 'tecnología', 'desigualdad'], timeSuggested: 120
  },

  // C2
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Discute en profundidad la siguiente cuestión filosófica. Habla durante unos 2 minutos.',
    speakingPrompt: '¿Puede una sociedad que prioriza la libertad individual alcanzar alguna vez una verdadera igualdad? Explora las tensiones inherentes entre libertad e igualdad.',
    correctAnswer: '', points: 2, orderIndex: 27,
    rubric: { criteria: ['profundidad filosófica', 'razonamiento abstracto', 'fluidez casi nativa', 'registro sofisticado', 'habilidad retórica'], maxDuration: 150 },
    tags: ['filosofía', 'política', 'abstracto'], timeSuggested: 150
  },
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Presenta un argumento matizado sobre el siguiente tema. Habla durante unos 2 minutos.',
    speakingPrompt: '¿Es el concepto de "progreso" culturalmente relativo, o existen medidas universales para juzgar si la humanidad avanza?',
    correctAnswer: '', points: 2, orderIndex: 28,
    rubric: { criteria: ['profundidad intelectual', 'referencias interculturales', 'vocabulario preciso', 'flujo discursivo natural', 'expresión elegante'], maxDuration: 150 },
    tags: ['abstracto', 'cultura', 'filosofía'], timeSuggested: 150
  },
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Responde al siguiente dilema ético. Habla durante unos 2 minutos.',
    speakingPrompt: '¿Deberían existir límites a la investigación científica en campos como la ingeniería genética y la mejora humana? ¿Dónde deberían estar esos límites y quién debería establecerlos?',
    correctAnswer: '', points: 2, orderIndex: 29,
    rubric: { criteria: ['razonamiento ético', 'consideración de contraargumentos', 'expresión elocuente', 'argumento sostenido', 'prosodia natural'], maxDuration: 150 },
    tags: ['ética', 'ciencia', 'abstracto'], timeSuggested: 150
  },
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Discute el siguiente tema con profundidad filosófica. Habla durante unos 2 minutos.',
    speakingPrompt: '¿La búsqueda de la felicidad como meta vital conduce a una existencia significativa, o el sentido se encuentra en el sufrimiento y el sacrificio? Discute haciendo referencia a tradiciones filosóficas.',
    correctAnswer: '', points: 2, orderIndex: 30,
    rubric: { criteria: ['razonamiento filosófico', 'referencias literarias/filosóficas', 'registro sofisticado', 'fluidez sostenida', 'conclusión matizada'], maxDuration: 150 },
    tags: ['filosofía', 'abstracto', 'existencialismo'], timeSuggested: 150
  }
]
