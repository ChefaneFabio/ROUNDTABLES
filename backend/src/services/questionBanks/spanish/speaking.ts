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
    speakingPrompt: 'El sábado pasado fui al parque con mis amigos. El tiempo estaba soleado y cálido. Hicimos un picnic y jugamos al fútbol. Fue un día estupendo.',
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
  }
]
