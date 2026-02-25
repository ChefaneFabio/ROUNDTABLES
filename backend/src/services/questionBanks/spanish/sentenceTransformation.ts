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
]
