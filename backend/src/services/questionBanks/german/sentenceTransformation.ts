import { MultiSkillQuestionData } from '../types'

// German Sentence Transformation Questions — 10 questions
// Student reads the original sentence and rewrites it according to the instruction
// passage = the original sentence
// questionText = the transformation instruction
// correctAnswer = accepted version(s) pipe-separated

export const germanSentenceTransformationQuestions: MultiSkillQuestionData[] = [
  // ============================================================
  // A2 — Elementary (2 questions)
  // ============================================================
  {
    language: 'German', cefrLevel: 'A2', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Ich habe vor drei Jahren angefangen, Deutsch zu lernen.',
    questionText: 'Schreiben Sie den Satz um, beginnend mit: Ich lerne...',
    correctAnswer: 'Ich lerne seit drei Jahren Deutsch.',
    points: 1, orderIndex: 1, tags: ['seit', 'Zeitangaben']
  },
  {
    language: 'German', cefrLevel: 'A2', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Es ist nicht nötig, eine Uniform zu tragen.',
    questionText: 'Schreiben Sie den Satz um mit: müssen...nicht',
    correctAnswer: 'Man muss keine Uniform tragen.|Sie müssen keine Uniform tragen.|Wir müssen keine Uniform tragen.',
    points: 1, orderIndex: 2, tags: ['Modalverben', 'Notwendigkeit']
  },

  // ============================================================
  // B1 — Intermediate (3 questions)
  // ============================================================
  {
    language: 'German', cefrLevel: 'B1', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Man sagt, dass er sehr reich ist.',
    questionText: 'Schreiben Sie den Satz um, beginnend mit: Er soll...',
    correctAnswer: 'Er soll sehr reich sein.',
    points: 1, orderIndex: 3, tags: ['Modalverben', 'Hörensagen']
  },
  {
    language: 'German', cefrLevel: 'B1', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: '„Ich rufe dich morgen an", sagte sie.',
    questionText: 'Schreiben Sie den Satz in indirekter Rede um, beginnend mit: Sie sagte...',
    correctAnswer: 'Sie sagte, sie werde mich am nächsten Tag anrufen.|Sie sagte, dass sie mich am nächsten Tag anrufen werde.',
    points: 1, orderIndex: 4, tags: ['indirekte Rede', 'Konjunktiv I']
  },
  {
    language: 'German', cefrLevel: 'B1', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Ich bedaure, dass ich in der Schule nicht fleißiger gelernt habe.',
    questionText: 'Schreiben Sie den Satz um, beginnend mit: Ich wünschte...',
    correctAnswer: 'Ich wünschte, ich hätte in der Schule fleißiger gelernt.',
    points: 1, orderIndex: 5, tags: ['Konjunktiv II', 'Wunsch']
  },

  // ============================================================
  // B2 — Upper Intermediate (3 questions)
  // ============================================================
  {
    language: 'German', cefrLevel: 'B2', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Man glaubt, dass die Diebe durch ein Hinterfenster eingestiegen sind.',
    questionText: 'Schreiben Sie den Satz im Passiv um, beginnend mit: Die Diebe sollen...',
    correctAnswer: 'Die Diebe sollen durch ein Hinterfenster eingestiegen sein.',
    points: 1, orderIndex: 6, tags: ['Modalverben', 'Passiversatz']
  },
  {
    language: 'German', cefrLevel: 'B2', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Der Film war so langweilig, dass wir in der Mitte gegangen sind.',
    questionText: 'Schreiben Sie den Satz um mit: derart...dass',
    correctAnswer: 'Der Film war derart langweilig, dass wir in der Mitte gegangen sind.',
    points: 1, orderIndex: 7, tags: ['Konsekutivsatz', 'so...dass']
  },
  {
    language: 'German', cefrLevel: 'B2', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Ich hatte die Bedeutung der Besprechung nicht erkannt und bin deshalb nicht hingegangen.',
    questionText: 'Schreiben Sie den Satz um, beginnend mit: Hätte ich...',
    correctAnswer: 'Hätte ich die Bedeutung der Besprechung erkannt, wäre ich hingegangen.',
    points: 1, orderIndex: 8, tags: ['Konjunktiv II', 'Plusquamperfekt']
  },

  // ============================================================
  // C1 — Advanced (2 questions)
  // ============================================================
  {
    language: 'German', cefrLevel: 'C1', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Er hat nicht nur den Bericht fertiggestellt, sondern auch die Präsentation vorbereitet.',
    questionText: 'Schreiben Sie den Satz um, beginnend mit: Nicht nur...',
    correctAnswer: 'Nicht nur hat er den Bericht fertiggestellt, sondern auch die Präsentation vorbereitet.|Nicht nur hat er den Bericht fertiggestellt, er hat auch die Präsentation vorbereitet.',
    points: 1, orderIndex: 9, tags: ['Inversion', 'nicht nur...sondern auch']
  },
  {
    language: 'German', cefrLevel: 'C1', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Es ist möglich, dass sie den Zug verpasst hat.',
    questionText: 'Schreiben Sie den Satz um mit einem Modalverb der Vermutung.',
    correctAnswer: 'Sie könnte den Zug verpasst haben.|Sie dürfte den Zug verpasst haben.|Sie mag den Zug verpasst haben.',
    points: 1, orderIndex: 10, tags: ['Modalverben', 'Vermutung']
  },
]
