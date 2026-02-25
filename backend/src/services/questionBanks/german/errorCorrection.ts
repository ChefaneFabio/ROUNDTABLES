import { MultiSkillQuestionData } from '../types'

// German Error Correction Questions — 10 questions
// Student reads an erroneous sentence and must type the corrected version
// passage = the sentence with the error
// questionText = instruction
// correctAnswer = the corrected sentence (pipe-separated alternatives)

export const germanErrorCorrectionQuestions: MultiSkillQuestionData[] = [
  // ============================================================
  // A2 — Elementary (2 questions)
  // ============================================================
  {
    language: 'German', cefrLevel: 'A2', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Ich habe gestern ins Kino gegangen.',
    questionText: 'Finden und korrigieren Sie den Fehler in diesem Satz.',
    correctAnswer: 'Ich bin gestern ins Kino gegangen.',
    points: 1, orderIndex: 1, tags: ['Perfekt', 'sein/haben']
  },
  {
    language: 'German', cefrLevel: 'A2', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Er habe ein neues Auto.',
    questionText: 'Finden und korrigieren Sie den Fehler in diesem Satz.',
    correctAnswer: 'Er hat ein neues Auto.',
    points: 1, orderIndex: 2, tags: ['Präsens', 'haben']
  },

  // ============================================================
  // B1 — Intermediate (3 questions)
  // ============================================================
  {
    language: 'German', cefrLevel: 'B1', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Ich wohne hier für fünf Jahre und fühle mich wohl.',
    questionText: 'Finden und korrigieren Sie den Fehler in diesem Satz.',
    correctAnswer: 'Ich wohne hier seit fünf Jahren und fühle mich wohl.',
    points: 1, orderIndex: 3, tags: ['seit/für', 'Präsens']
  },
  {
    language: 'German', cefrLevel: 'B1', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Trotz er krank war, ging er zur Arbeit.',
    questionText: 'Finden und korrigieren Sie den Fehler in diesem Satz.',
    correctAnswer: 'Obwohl er krank war, ging er zur Arbeit.|Trotzdem er krank war, ging er zur Arbeit.',
    points: 1, orderIndex: 4, tags: ['trotz', 'Konjunktionen']
  },
  {
    language: 'German', cefrLevel: 'B1', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Wenn ich würde reich sein, würde ich ein Haus kaufen.',
    questionText: 'Finden und korrigieren Sie den Fehler in diesem Satz.',
    correctAnswer: 'Wenn ich reich wäre, würde ich ein Haus kaufen.',
    points: 1, orderIndex: 5, tags: ['Konjunktiv II', 'Wortstellung']
  },

  // ============================================================
  // B2 — Upper Intermediate (3 questions)
  // ============================================================
  {
    language: 'German', cefrLevel: 'B2', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Die Informationen, die er mir gab, war sehr nützlich.',
    questionText: 'Finden und korrigieren Sie den Fehler in diesem Satz.',
    correctAnswer: 'Die Informationen, die er mir gab, waren sehr nützlich.',
    points: 1, orderIndex: 6, tags: ['Subjekt-Verb-Kongruenz', 'Plural']
  },
  {
    language: 'German', cefrLevel: 'B2', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Er hat mich vorgeschlagen, einen anderen Weg zu nehmen.',
    questionText: 'Finden und korrigieren Sie den Fehler in diesem Satz.',
    correctAnswer: 'Er hat mir vorgeschlagen, einen anderen Weg zu nehmen.|Er hat vorgeschlagen, dass ich einen anderen Weg nehme.',
    points: 1, orderIndex: 7, tags: ['vorschlagen', 'Dativ/Akkusativ']
  },
  {
    language: 'German', cefrLevel: 'B2', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Ich bin gewöhnt, früh aufzustehen.',
    questionText: 'Finden und korrigieren Sie den Fehler in diesem Satz.',
    correctAnswer: 'Ich bin es gewohnt, früh aufzustehen.|Ich bin daran gewöhnt, früh aufzustehen.',
    points: 1, orderIndex: 8, tags: ['gewohnt sein', 'Infinitivkonstruktion']
  },

  // ============================================================
  // C1 — Advanced (2 questions)
  // ============================================================
  {
    language: 'German', cefrLevel: 'C1', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Weder der Lehrer noch die Schüler war über die Änderung informiert.',
    questionText: 'Finden und korrigieren Sie den Fehler in diesem Satz.',
    correctAnswer: 'Weder der Lehrer noch die Schüler waren über die Änderung informiert.',
    points: 1, orderIndex: 9, tags: ['Subjekt-Verb-Kongruenz', 'weder...noch']
  },
  {
    language: 'German', cefrLevel: 'C1', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Die Forschung, zusammen mit ihren Ergebnissen, haben große Aufmerksamkeit erregt.',
    questionText: 'Finden und korrigieren Sie den Fehler in diesem Satz.',
    correctAnswer: 'Die Forschung, zusammen mit ihren Ergebnissen, hat große Aufmerksamkeit erregt.',
    points: 1, orderIndex: 10, tags: ['Subjekt-Verb-Kongruenz', 'Einschub']
  },
]
