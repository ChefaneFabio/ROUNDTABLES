import { MultiSkillQuestionData } from '../types'

// Spanish Error Correction Questions — 10 questions
// Student reads an erroneous sentence and must type the corrected version
// passage = the sentence with the error
// questionText = instruction
// correctAnswer = the corrected sentence (pipe-separated alternatives)

export const spanishErrorCorrectionQuestions: MultiSkillQuestionData[] = [
  // ============================================================
  // A2 — Elementary (2 questions)
  // ============================================================
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Yo soy de acuerdo contigo.',
    questionText: 'Encuentra y corrige el error en esta oración.',
    correctAnswer: 'Yo estoy de acuerdo contigo.|Estoy de acuerdo contigo.',
    points: 1, orderIndex: 1, tags: ['ser/estar', 'expressions']
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Ayer yo sé la respuesta.',
    questionText: 'Encuentra y corrige el error en esta oración.',
    correctAnswer: 'Ayer yo supe la respuesta.|Ayer supe la respuesta.',
    points: 1, orderIndex: 2, tags: ['preterite', 'irregular verbs']
  },

  // ============================================================
  // B1 — Intermediate (3 questions)
  // ============================================================
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Espero que vienes a la fiesta mañana.',
    questionText: 'Encuentra y corrige el error en esta oración.',
    correctAnswer: 'Espero que vengas a la fiesta mañana.',
    points: 1, orderIndex: 3, tags: ['subjunctive', 'esperar que']
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Cuando llegaré a casa, te llamaré.',
    questionText: 'Encuentra y corrige el error en esta oración.',
    correctAnswer: 'Cuando llegue a casa, te llamaré.',
    points: 1, orderIndex: 4, tags: ['subjunctive', 'temporal clauses']
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'A mí me gustan el chocolate.',
    questionText: 'Encuentra y corrige el error en esta oración.',
    correctAnswer: 'A mí me gusta el chocolate.',
    points: 1, orderIndex: 5, tags: ['gustar', 'subject-verb agreement']
  },

  // ============================================================
  // B2 — Upper Intermediate (3 questions)
  // ============================================================
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Si tendría más tiempo, viajaría por el mundo.',
    questionText: 'Encuentra y corrige el error en esta oración.',
    correctAnswer: 'Si tuviera más tiempo, viajaría por el mundo.|Si tuviese más tiempo, viajaría por el mundo.',
    points: 1, orderIndex: 6, tags: ['conditional', 'si clauses']
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Le dije que no viene tarde.',
    questionText: 'Encuentra y corrige el error en esta oración.',
    correctAnswer: 'Le dije que no viniera tarde.|Le dije que no viniese tarde.',
    points: 1, orderIndex: 7, tags: ['imperfect subjunctive', 'reported speech']
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Es necesario que los alumnos hacen sus deberes.',
    questionText: 'Encuentra y corrige el error en esta oración.',
    correctAnswer: 'Es necesario que los alumnos hagan sus deberes.',
    points: 1, orderIndex: 8, tags: ['subjunctive', 'impersonal expressions']
  },

  // ============================================================
  // C1 — Advanced (2 questions)
  // ============================================================
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Si lo habría sabido antes, no habría aceptado.',
    questionText: 'Encuentra y corrige el error en esta oración.',
    correctAnswer: 'Si lo hubiera sabido antes, no habría aceptado.|Si lo hubiese sabido antes, no habría aceptado.',
    points: 1, orderIndex: 9, tags: ['pluperfect subjunctive', 'si clauses']
  },
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Busco a una secretaria que habla tres idiomas.',
    questionText: 'Encuentra y corrige el error en esta oración.',
    correctAnswer: 'Busco una secretaria que hable tres idiomas.',
    points: 1, orderIndex: 10, tags: ['subjunctive', 'relative clauses', 'personal a']
  },

  // ============================================================
  // NUEVAS PREGUNTAS — 20 más (orderIndex 11-30)
  // ============================================================

  // A2 (5 preguntas)
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Hay mucho personas en el parque.',
    questionText: 'Encuentra y corrige el error en esta oración.',
    correctAnswer: 'Hay muchas personas en el parque.',
    points: 1, orderIndex: 11, tags: ['concordancia', 'mucho/muchas']
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Ella puede a nadar muy bien.',
    questionText: 'Encuentra y corrige el error en esta oración.',
    correctAnswer: 'Ella puede nadar muy bien.|Ella sabe nadar muy bien.',
    points: 1, orderIndex: 12, tags: ['poder + infinitivo', 'preposición']
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'He visitado París el año pasado.',
    questionText: 'Encuentra y corrige el error en esta oración.',
    correctAnswer: 'Visité París el año pasado.',
    points: 1, orderIndex: 13, tags: ['pretérito perfecto vs indefinido']
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Él siempre está llegar tarde a clase.',
    questionText: 'Encuentra y corrige el error en esta oración.',
    correctAnswer: 'Él siempre llega tarde a clase.',
    points: 1, orderIndex: 14, tags: ['presente de indicativo', 'construcción verbal']
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'A mí me gusta los gatos.',
    questionText: 'Encuentra y corrige el error en esta oración.',
    correctAnswer: 'A mí me gustan los gatos.',
    points: 1, orderIndex: 15, tags: ['gustar', 'concordancia sujeto-verbo']
  },

  // B1 (5 preguntas)
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Me acuerdo de su nombre.',
    questionText: 'Encuentra y corrige el error en esta oración.',
    correctAnswer: 'Recuerdo su nombre.|Me acuerdo de su nombre.',
    points: 1, orderIndex: 16, tags: ['acordarse/recordar', 'régimen verbal']
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Me dijo que viene mañana.',
    questionText: 'Encuentra y corrige el error en esta oración.',
    correctAnswer: 'Me dijo que vendría al día siguiente.|Me dijo que vendría mañana.',
    points: 1, orderIndex: 17, tags: ['concordancia temporal', 'estilo indirecto']
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Aunque llovía, pero salimos a pasear.',
    questionText: 'Encuentra y corrige el error en esta oración.',
    correctAnswer: 'Aunque llovía, salimos a pasear.|Llovía, pero salimos a pasear.',
    points: 1, orderIndex: 18, tags: ['conjunciones', 'aunque/pero']
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Este es el libro que tengo necesidad.',
    questionText: 'Encuentra y corrige el error en esta oración.',
    correctAnswer: 'Este es el libro que necesito.|Este es el libro del que tengo necesidad.',
    points: 1, orderIndex: 19, tags: ['pronombre relativo', 'construcción verbal']
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Me pidió que le ayudo con la mudanza.',
    questionText: 'Encuentra y corrige el error en esta oración.',
    correctAnswer: 'Me pidió que le ayudara con la mudanza.|Me pidió que le ayudase con la mudanza.',
    points: 1, orderIndex: 20, tags: ['subjuntivo imperfecto', 'pedir que']
  },

  // B2 (5 preguntas)
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Negó de haber robado el dinero.',
    questionText: 'Encuentra y corrige el error en esta oración.',
    correctAnswer: 'Negó haber robado el dinero.',
    points: 1, orderIndex: 21, tags: ['negar', 'infinitivo compuesto']
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Cuanto más practicas, más mejoras más.',
    questionText: 'Encuentra y corrige el error en esta oración.',
    correctAnswer: 'Cuanto más practicas, más mejoras.',
    points: 1, orderIndex: 22, tags: ['comparativo progresivo', 'redundancia']
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Ojalá puedo hablar francés con fluidez.',
    questionText: 'Encuentra y corrige el error en esta oración.',
    correctAnswer: 'Ojalá pudiera hablar francés con fluidez.|Ojalá pudiese hablar francés con fluidez.',
    points: 1, orderIndex: 23, tags: ['ojalá', 'subjuntivo imperfecto']
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Ella es una de las persona más amable que he conocido.',
    questionText: 'Encuentra y corrige el error en esta oración.',
    correctAnswer: 'Ella es una de las personas más amables que he conocido.',
    points: 1, orderIndex: 24, tags: ['plural', 'superlativo', 'concordancia']
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'A pesar que estaba cansado, siguió trabajando.',
    questionText: 'Encuentra y corrige el error en esta oración.',
    correctAnswer: 'A pesar de que estaba cansado, siguió trabajando.',
    points: 1, orderIndex: 25, tags: ['a pesar de', 'preposición']
  },

  // C1 (5 preguntas)
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Apenas él había llegado, empezó la reunión.',
    questionText: 'Encuentra y corrige el error en esta oración.',
    correctAnswer: 'Apenas hubo llegado, empezó la reunión.|Apenas llegó, empezó la reunión.',
    points: 1, orderIndex: 26, tags: ['pretérito anterior', 'apenas']
  },
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'La mayoría de los estudiantes piensa que el examen fue fácil.',
    questionText: 'Encuentra y corrige el error en esta oración.',
    correctAnswer: 'La mayoría de los estudiantes piensan que el examen fue fácil.',
    points: 1, orderIndex: 27, tags: ['concordancia sujeto-verbo', 'la mayoría']
  },
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Sin su ayuda, habría sido suspendido del examen.',
    questionText: 'Encuentra y corrige el error en esta oración.',
    correctAnswer: 'Sin su ayuda, habría suspendido el examen.',
    points: 1, orderIndex: 28, tags: ['condicional compuesto', 'construcción verbal']
  },
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'El número de estudiantes que se ha matriculado este año ha aumentado.',
    questionText: 'Encuentra y corrige el error en esta oración.',
    correctAnswer: 'El número de estudiantes que se han matriculado este año ha aumentado.',
    points: 1, orderIndex: 29, tags: ['concordancia sujeto-verbo', 'cláusula relativa']
  },
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Es imprescindible que cada empleado entrega su informe el viernes.',
    questionText: 'Encuentra y corrige el error en esta oración.',
    correctAnswer: 'Es imprescindible que cada empleado entregue su informe el viernes.',
    points: 1, orderIndex: 30, tags: ['subjuntivo presente', 'es imprescindible que']
  },
]
