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

  // ============================================================
  // NEUE FRAGEN — 20 weitere (orderIndex 11-30)
  // ============================================================

  // A2 (5 Fragen)
  {
    language: 'German', cefrLevel: 'A2', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Ich bin einverstanden mit du.',
    questionText: 'Finden und korrigieren Sie den Fehler in diesem Satz.',
    correctAnswer: 'Ich bin einverstanden mit dir.',
    points: 1, orderIndex: 11, tags: ['Dativ', 'Pronomen']
  },
  {
    language: 'German', cefrLevel: 'A2', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Es gibt viele Leute in den Park.',
    questionText: 'Finden und korrigieren Sie den Fehler in diesem Satz.',
    correctAnswer: 'Es gibt viele Leute in dem Park.|Es gibt viele Leute im Park.',
    points: 1, orderIndex: 12, tags: ['Dativ', 'Präposition in']
  },
  {
    language: 'German', cefrLevel: 'A2', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Sie kann gut zu schwimmen.',
    questionText: 'Finden und korrigieren Sie den Fehler in diesem Satz.',
    correctAnswer: 'Sie kann gut schwimmen.',
    points: 1, orderIndex: 13, tags: ['Modalverben', 'Infinitiv']
  },
  {
    language: 'German', cefrLevel: 'A2', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Ich habe letztes Jahr Paris besuchen.',
    questionText: 'Finden und korrigieren Sie den Fehler in diesem Satz.',
    correctAnswer: 'Ich habe letztes Jahr Paris besucht.',
    points: 1, orderIndex: 14, tags: ['Perfekt', 'Partizip II']
  },
  {
    language: 'German', cefrLevel: 'A2', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Er immer kommt zu spät zum Unterricht.',
    questionText: 'Finden und korrigieren Sie den Fehler in diesem Satz.',
    correctAnswer: 'Er kommt immer zu spät zum Unterricht.',
    points: 1, orderIndex: 15, tags: ['Wortstellung', 'Adverb']
  },

  // B1 (5 Fragen)
  {
    language: 'German', cefrLevel: 'B1', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Ich freue mich auf dich zu sehen.',
    questionText: 'Finden und korrigieren Sie den Fehler in diesem Satz.',
    correctAnswer: 'Ich freue mich darauf, dich zu sehen.|Ich freue mich, dich zu sehen.',
    points: 1, orderIndex: 16, tags: ['sich freuen auf', 'Infinitivsatz']
  },
  {
    language: 'German', cefrLevel: 'B1', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Er hat mir gesagt, dass er morgen kommt.',
    questionText: 'Finden und korrigieren Sie den Fehler in diesem Satz.',
    correctAnswer: 'Er hat mir gesagt, dass er am nächsten Tag kommen werde.|Er sagte mir, dass er am nächsten Tag kommen werde.',
    points: 1, orderIndex: 17, tags: ['indirekte Rede', 'Konjunktiv I']
  },
  {
    language: 'German', cefrLevel: 'B1', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Obwohl es regnete, aber wir sind spazieren gegangen.',
    questionText: 'Finden und korrigieren Sie den Fehler in diesem Satz.',
    correctAnswer: 'Obwohl es regnete, sind wir spazieren gegangen.|Es regnete, aber wir sind spazieren gegangen.',
    points: 1, orderIndex: 18, tags: ['Konjunktionen', 'obwohl/aber']
  },
  {
    language: 'German', cefrLevel: 'B1', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Das ist das Buch, dass ich gelesen habe.',
    questionText: 'Finden und korrigieren Sie den Fehler in diesem Satz.',
    correctAnswer: 'Das ist das Buch, das ich gelesen habe.',
    points: 1, orderIndex: 19, tags: ['Relativpronomen', 'dass/das']
  },
  {
    language: 'German', cefrLevel: 'B1', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Sie hat mich gefragt, ob ich kann ihr helfen.',
    questionText: 'Finden und korrigieren Sie den Fehler in diesem Satz.',
    correctAnswer: 'Sie hat mich gefragt, ob ich ihr helfen kann.',
    points: 1, orderIndex: 20, tags: ['Wortstellung', 'Nebensatz']
  },

  // B2 (5 Fragen)
  {
    language: 'German', cefrLevel: 'B2', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Er hat geleugnet, das Geld zu gestohlen haben.',
    questionText: 'Finden und korrigieren Sie den Fehler in diesem Satz.',
    correctAnswer: 'Er hat geleugnet, das Geld gestohlen zu haben.',
    points: 1, orderIndex: 21, tags: ['Infinitivsatz', 'Wortstellung']
  },
  {
    language: 'German', cefrLevel: 'B2', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Je mehr du übst, du wirst besser.',
    questionText: 'Finden und korrigieren Sie den Fehler in diesem Satz.',
    correctAnswer: 'Je mehr du übst, desto besser wirst du.|Je mehr du übst, umso besser wirst du.',
    points: 1, orderIndex: 22, tags: ['je...desto', 'Komparativ']
  },
  {
    language: 'German', cefrLevel: 'B2', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Ich wünsche, ich kann fließend Französisch sprechen.',
    questionText: 'Finden und korrigieren Sie den Fehler in diesem Satz.',
    correctAnswer: 'Ich wünschte, ich könnte fließend Französisch sprechen.',
    points: 1, orderIndex: 23, tags: ['Konjunktiv II', 'Wunsch']
  },
  {
    language: 'German', cefrLevel: 'B2', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Sie ist eine der nettesten Person, die ich je getroffen habe.',
    questionText: 'Finden und korrigieren Sie den Fehler in diesem Satz.',
    correctAnswer: 'Sie ist eine der nettesten Personen, die ich je getroffen habe.',
    points: 1, orderIndex: 24, tags: ['Plural', 'Superlativ']
  },
  {
    language: 'German', cefrLevel: 'B2', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Trotz er müde war, hat er weitergearbeitet.',
    questionText: 'Finden und korrigieren Sie den Fehler in diesem Satz.',
    correctAnswer: 'Obwohl er müde war, hat er weitergearbeitet.|Trotz seiner Müdigkeit hat er weitergearbeitet.',
    points: 1, orderIndex: 25, tags: ['trotz', 'Konjunktion']
  },

  // C1 (5 Fragen)
  {
    language: 'German', cefrLevel: 'C1', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Kaum er war angekommen, begann die Besprechung.',
    questionText: 'Finden und korrigieren Sie den Fehler in diesem Satz.',
    correctAnswer: 'Kaum war er angekommen, begann die Besprechung.',
    points: 1, orderIndex: 26, tags: ['Inversion', 'kaum']
  },
  {
    language: 'German', cefrLevel: 'C1', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Die Mehrheit der Studenten denkt, dass die Prüfung leicht war.',
    questionText: 'Finden und korrigieren Sie den Fehler in diesem Satz.',
    correctAnswer: 'Die Mehrheit der Studenten denkt, dass die Prüfung leicht gewesen sei.',
    points: 1, orderIndex: 27, tags: ['Konjunktiv I', 'indirekte Rede']
  },
  {
    language: 'German', cefrLevel: 'C1', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Ohne seine Hilfe, hätte ich die Prüfung nicht bestanden gehabt.',
    questionText: 'Finden und korrigieren Sie den Fehler in diesem Satz.',
    correctAnswer: 'Ohne seine Hilfe hätte ich die Prüfung nicht bestanden.',
    points: 1, orderIndex: 28, tags: ['Konjunktiv II', 'Plusquamperfekt']
  },
  {
    language: 'German', cefrLevel: 'C1', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Die Anzahl der Studenten, die sich dieses Jahr eingeschrieben hat, ist gestiegen.',
    questionText: 'Finden und korrigieren Sie den Fehler in diesem Satz.',
    correctAnswer: 'Die Anzahl der Studenten, die sich dieses Jahr eingeschrieben haben, ist gestiegen.',
    points: 1, orderIndex: 29, tags: ['Subjekt-Verb-Kongruenz', 'Relativsatz']
  },
  {
    language: 'German', cefrLevel: 'C1', questionType: 'ERROR_CORRECTION', skill: 'ERROR_CORRECTION',
    passage: 'Es ist unerlässlich, dass jeder Mitarbeiter seinen Bericht bis Freitag einreicht.',
    questionText: 'Finden und korrigieren Sie den Fehler in diesem Satz.',
    correctAnswer: 'Es ist unerlässlich, dass jeder Mitarbeiter seinen Bericht bis Freitag einreiche.',
    points: 1, orderIndex: 30, tags: ['Konjunktiv I', 'Forderung']
  },
]
