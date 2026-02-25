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
]
