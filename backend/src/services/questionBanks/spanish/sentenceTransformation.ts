import { MultiSkillQuestionData } from '../types'

// Spanish Sentence Transformation Questions — 10 questions
// Student reads the original sentence and rewrites it according to the instruction
// passage = the original sentence
// questionText = the transformation instruction
// correctAnswer = accepted version(s) pipe-separated

export const spanishSentenceTransformationQuestions: MultiSkillQuestionData[] = [
  // ============================================================
  // A2 — Elementary (2 questions)
  // ============================================================
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Empecé a estudiar español hace tres años.',
    questionText: 'Reescribe comenzando con: Llevo...',
    correctAnswer: 'Llevo tres años estudiando español.|Llevo tres años estudiando español.',
    points: 1, orderIndex: 1, tags: ['llevar + gerund', 'duration']
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'No es necesario que vengas mañana.',
    questionText: 'Reescribe usando: no tienes que',
    correctAnswer: 'No tienes que venir mañana.',
    points: 1, orderIndex: 2, tags: ['obligation', 'tener que']
  },

  // ============================================================
  // B1 — Intermediate (3 questions)
  // ============================================================
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'La gente dice que él es muy inteligente.',
    questionText: 'Reescribe comenzando con: Se dice...',
    correctAnswer: 'Se dice que él es muy inteligente.|Se dice que es muy inteligente.',
    points: 1, orderIndex: 3, tags: ['impersonal se', 'passive']
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: '"Te llamaré mañana", me dijo.',
    questionText: 'Reescribe en estilo indirecto comenzando con: Me dijo que...',
    correctAnswer: 'Me dijo que me llamaría al día siguiente.|Me dijo que me llamaría mañana.',
    points: 1, orderIndex: 4, tags: ['reported speech', 'conditional']
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Lamento no haber estudiado más.',
    questionText: 'Reescribe comenzando con: Ojalá...',
    correctAnswer: 'Ojalá hubiera estudiado más.|Ojalá hubiese estudiado más.',
    points: 1, orderIndex: 5, tags: ['ojalá', 'pluperfect subjunctive']
  },

  // ============================================================
  // B2 — Upper Intermediate (3 questions)
  // ============================================================
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Creen que los ladrones entraron por la ventana trasera.',
    questionText: 'Reescribe comenzando con: Se cree que...',
    correctAnswer: 'Se cree que los ladrones entraron por la ventana trasera.',
    points: 1, orderIndex: 6, tags: ['impersonal se', 'passive']
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'La película era tan aburrida que nos fuimos a la mitad.',
    questionText: 'Reescribe usando: tal...que',
    correctAnswer: 'La película era de tal aburrimiento que nos fuimos a la mitad.|Era tal el aburrimiento de la película que nos fuimos a la mitad.',
    points: 1, orderIndex: 7, tags: ['tal...que', 'intensifiers']
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'No sabía la importancia de la reunión, así que no asistí.',
    questionText: 'Reescribe comenzando con: De haber...',
    correctAnswer: 'De haber sabido la importancia de la reunión, habría asistido.|De haber sabido la importancia de la reunión, hubiera asistido.',
    points: 1, orderIndex: 8, tags: ['de + infinitive', 'conditional']
  },

  // ============================================================
  // C1 — Advanced (2 questions)
  // ============================================================
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'No solo terminó el informe, sino que también preparó la presentación.',
    questionText: 'Reescribe comenzando con: Además de...',
    correctAnswer: 'Además de terminar el informe, preparó la presentación.|Además de haber terminado el informe, preparó la presentación.',
    points: 1, orderIndex: 9, tags: ['además de', 'infinitive clauses']
  },
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Es posible que ella haya perdido el tren.',
    questionText: 'Reescribe usando un verbo modal: Puede que...',
    correctAnswer: 'Puede que ella haya perdido el tren.|Puede que haya perdido el tren.',
    points: 1, orderIndex: 10, tags: ['puede que', 'subjunctive', 'deduction']
  },

  // ============================================================
  // NUEVAS PREGUNTAS — 20 más (orderIndex 11-30)
  // ============================================================

  // A2 (5 preguntas)
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'El libro es muy interesante.',
    questionText: 'Reescribe usando: un libro tan',
    correctAnswer: 'Es un libro tan interesante.',
    points: 1, orderIndex: 11, tags: ['tan', 'adjetivos']
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Ella es más alta que su hermano.',
    questionText: 'Reescribe comenzando con: Su hermano...',
    correctAnswer: 'Su hermano es más bajo que ella.|Su hermano no es tan alto como ella.',
    points: 1, orderIndex: 12, tags: ['comparativo', 'inversión']
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Construyeron esta casa en 1990.',
    questionText: 'Reescribe en voz pasiva.',
    correctAnswer: 'Esta casa fue construida en 1990.',
    points: 1, orderIndex: 13, tags: ['voz pasiva', 'pretérito indefinido']
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Está prohibido aparcar aquí.',
    questionText: 'Reescribe usando: no se debe',
    correctAnswer: 'No se debe aparcar aquí.|Aquí no se debe aparcar.',
    points: 1, orderIndex: 14, tags: ['deber', 'prohibición']
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Prefiero el té al café.',
    questionText: 'Reescribe usando: me gusta más',
    correctAnswer: 'Me gusta más el té que el café.',
    points: 1, orderIndex: 15, tags: ['gustar más', 'preferencia']
  },

  // B1 (5 preguntas)
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Alguien robó mi cartera ayer.',
    questionText: 'Reescribe en voz pasiva.',
    correctAnswer: 'Mi cartera fue robada ayer.',
    points: 1, orderIndex: 16, tags: ['voz pasiva', 'pretérito indefinido']
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: '"No toquéis el cuadro", nos dijo el guardia.',
    questionText: 'Reescribe en estilo indirecto comenzando con: El guardia nos dijo...',
    correctAnswer: 'El guardia nos dijo que no tocáramos el cuadro.|El guardia nos dijo que no tocásemos el cuadro.',
    points: 1, orderIndex: 17, tags: ['estilo indirecto', 'imperativo']
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Es posible que estén en casa.',
    questionText: 'Reescribe usando un adverbio.',
    correctAnswer: 'Quizás estén en casa.|Tal vez estén en casa.|Probablemente estén en casa.',
    points: 1, orderIndex: 18, tags: ['adverbio de modalidad', 'posibilidad']
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Es demasiado joven para conducir un coche.',
    questionText: 'Reescribe usando: no tiene suficiente edad para',
    correctAnswer: 'No tiene suficiente edad para conducir un coche.',
    points: 1, orderIndex: 19, tags: ['demasiado/suficiente']
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Empezó a trabajar aquí hace tres años.',
    questionText: 'Reescribe comenzando con: Trabaja...',
    correctAnswer: 'Trabaja aquí desde hace tres años.|Lleva tres años trabajando aquí.',
    points: 1, orderIndex: 20, tags: ['desde hace', 'duración']
  },

  // B2 (5 preguntas)
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'La última vez que lo vi fue en 2019.',
    questionText: 'Reescribe comenzando con: No lo he visto...',
    correctAnswer: 'No lo he visto desde 2019.',
    points: 1, orderIndex: 21, tags: ['pretérito perfecto', 'desde']
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'No pudimos ir a la playa porque estaba lloviendo.',
    questionText: 'Reescribe comenzando con: Si no hubiera...',
    correctAnswer: 'Si no hubiera llovido, habríamos podido ir a la playa.|Si no hubiese llovido, habríamos podido ir a la playa.',
    points: 1, orderIndex: 22, tags: ['condicional compuesto', 'hipótesis irreal']
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Dicen que la empresa cerrará el año que viene.',
    questionText: 'Reescribe comenzando con: La empresa...',
    correctAnswer: 'La empresa cerraría el año que viene.|La empresa debería cerrar el año que viene.',
    points: 1, orderIndex: 23, tags: ['condicional', 'rumor']
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Preferiría quedarme en casa en vez de ir a la fiesta.',
    questionText: 'Reescribe usando: En lugar de...',
    correctAnswer: 'En lugar de ir a la fiesta, preferiría quedarme en casa.',
    points: 1, orderIndex: 24, tags: ['en lugar de', 'infinitivo']
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'No estudió lo suficiente, por eso no aprobó el examen.',
    questionText: 'Reescribe comenzando con: Si hubiera...',
    correctAnswer: 'Si hubiera estudiado lo suficiente, habría aprobado el examen.|Si hubiese estudiado lo suficiente, habría aprobado el examen.',
    points: 1, orderIndex: 25, tags: ['condicional compuesto', 'hipótesis irreal']
  },

  // C1 (5 preguntas)
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'No sabía que estaba enferma, por eso no la visité.',
    questionText: 'Reescribe comenzando con: De haber...',
    correctAnswer: 'De haber sabido que estaba enferma, la habría visitado.|De haber sabido que estaba enferma, la hubiera visitado.',
    points: 1, orderIndex: 26, tags: ['de + infinitivo compuesto', 'condicional']
  },
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'El gobierno debería invertir más en energías renovables.',
    questionText: 'Reescribe usando: Ya es hora de que...',
    correctAnswer: 'Ya es hora de que el gobierno invierta más en energías renovables.|Ya es hora de que el gobierno invirtiera más en energías renovables.',
    points: 1, orderIndex: 27, tags: ['ya es hora de que', 'subjuntivo']
  },
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Solo se dio cuenta de la verdad después de que ella se fue.',
    questionText: 'Reescribe comenzando con: No fue hasta...',
    correctAnswer: 'No fue hasta después de que ella se fue cuando se dio cuenta de la verdad.|No fue hasta que ella se fue cuando se dio cuenta de la verdad.',
    points: 1, orderIndex: 28, tags: ['no fue hasta', 'énfasis']
  },
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Nunca hemos vivido una tormenta tan violenta.',
    questionText: 'Reescribe comenzando con: Jamás...',
    correctAnswer: 'Jamás hemos vivido una tormenta tan violenta.|Jamás habíamos vivido una tormenta tan violenta.',
    points: 1, orderIndex: 29, tags: ['énfasis', 'jamás']
  },
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Se cree que la antigua ciudad fue destruida por un terremoto.',
    questionText: 'Reescribe comenzando con: La antigua ciudad...',
    correctAnswer: 'La antigua ciudad habría sido destruida por un terremoto.',
    points: 1, orderIndex: 30, tags: ['condicional compuesto', 'suposición']
  },
]
