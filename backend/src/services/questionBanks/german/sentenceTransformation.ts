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

  // ============================================================
  // NEUE FRAGEN — 20 weitere (orderIndex 11-30)
  // ============================================================

  // A2 (5 Fragen)
  {
    language: 'German', cefrLevel: 'A2', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Das Buch ist sehr interessant.',
    questionText: 'Schreiben Sie den Satz um mit: so ein',
    correctAnswer: 'Das ist so ein interessantes Buch.|Es ist so ein interessantes Buch.',
    points: 1, orderIndex: 11, tags: ['so ein', 'Adjektive']
  },
  {
    language: 'German', cefrLevel: 'A2', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Sie ist größer als ihr Bruder.',
    questionText: 'Schreiben Sie den Satz um, beginnend mit: Ihr Bruder...',
    correctAnswer: 'Ihr Bruder ist kleiner als sie.|Ihr Bruder ist nicht so groß wie sie.',
    points: 1, orderIndex: 12, tags: ['Komparativ', 'Umkehrung']
  },
  {
    language: 'German', cefrLevel: 'A2', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Man hat dieses Haus 1990 gebaut.',
    questionText: 'Schreiben Sie den Satz im Passiv um.',
    correctAnswer: 'Dieses Haus wurde 1990 gebaut.',
    points: 1, orderIndex: 13, tags: ['Passiv', 'Präteritum']
  },
  {
    language: 'German', cefrLevel: 'A2', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Hier darf man nicht parken.',
    questionText: 'Schreiben Sie den Satz um mit: Es ist verboten...',
    correctAnswer: 'Es ist verboten, hier zu parken.',
    points: 1, orderIndex: 14, tags: ['Verbot', 'Infinitivsatz']
  },
  {
    language: 'German', cefrLevel: 'A2', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Ich mag Tee lieber als Kaffee.',
    questionText: 'Schreiben Sie den Satz um mit: Ich bevorzuge...',
    correctAnswer: 'Ich bevorzuge Tee gegenüber Kaffee.|Ich bevorzuge Tee.',
    points: 1, orderIndex: 15, tags: ['bevorzugen', 'Präferenz']
  },

  // B1 (5 Fragen)
  {
    language: 'German', cefrLevel: 'B1', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Jemand hat gestern meine Brieftasche gestohlen.',
    questionText: 'Schreiben Sie den Satz im Passiv um.',
    correctAnswer: 'Meine Brieftasche wurde gestern gestohlen.|Gestern wurde meine Brieftasche gestohlen.',
    points: 1, orderIndex: 16, tags: ['Passiv', 'Präteritum']
  },
  {
    language: 'German', cefrLevel: 'B1', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: '„Berührt das Gemälde nicht!", sagte uns der Wächter.',
    questionText: 'Schreiben Sie den Satz in indirekter Rede um, beginnend mit: Der Wächter sagte uns...',
    correctAnswer: 'Der Wächter sagte uns, wir sollten das Gemälde nicht berühren.|Der Wächter sagte uns, dass wir das Gemälde nicht berühren sollten.',
    points: 1, orderIndex: 17, tags: ['indirekte Rede', 'Imperativ']
  },
  {
    language: 'German', cefrLevel: 'B1', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Es ist möglich, dass sie zu Hause sind.',
    questionText: 'Schreiben Sie den Satz um mit einem Modalverb.',
    correctAnswer: 'Sie könnten zu Hause sein.|Sie dürften zu Hause sein.',
    points: 1, orderIndex: 18, tags: ['Modalverben', 'Möglichkeit']
  },
  {
    language: 'German', cefrLevel: 'B1', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Er ist zu jung, um Auto zu fahren.',
    questionText: 'Schreiben Sie den Satz um mit: nicht alt genug',
    correctAnswer: 'Er ist nicht alt genug, um Auto zu fahren.',
    points: 1, orderIndex: 19, tags: ['zu/genug']
  },
  {
    language: 'German', cefrLevel: 'B1', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Sie hat vor drei Jahren angefangen, hier zu arbeiten.',
    questionText: 'Schreiben Sie den Satz um, beginnend mit: Sie arbeitet...',
    correctAnswer: 'Sie arbeitet seit drei Jahren hier.',
    points: 1, orderIndex: 20, tags: ['seit', 'Dauer']
  },

  // B2 (5 Fragen)
  {
    language: 'German', cefrLevel: 'B2', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Ich habe ihn zuletzt 2019 gesehen.',
    questionText: 'Schreiben Sie den Satz um, beginnend mit: Ich habe ihn seit...',
    correctAnswer: 'Ich habe ihn seit 2019 nicht mehr gesehen.',
    points: 1, orderIndex: 21, tags: ['seit', 'Negation']
  },
  {
    language: 'German', cefrLevel: 'B2', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Wir konnten nicht an den Strand gehen, weil es regnete.',
    questionText: 'Schreiben Sie den Satz um, beginnend mit: Wenn es nicht...',
    correctAnswer: 'Wenn es nicht geregnet hätte, hätten wir an den Strand gehen können.',
    points: 1, orderIndex: 22, tags: ['Konjunktiv II', 'Plusquamperfekt']
  },
  {
    language: 'German', cefrLevel: 'B2', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Man sagt, dass die Firma nächstes Jahr schließen wird.',
    questionText: 'Schreiben Sie den Satz um, beginnend mit: Die Firma soll...',
    correctAnswer: 'Die Firma soll nächstes Jahr schließen.',
    points: 1, orderIndex: 23, tags: ['Modalverben', 'Hörensagen']
  },
  {
    language: 'German', cefrLevel: 'B2', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Ich würde lieber zu Hause bleiben, als zur Party zu gehen.',
    questionText: 'Schreiben Sie den Satz um mit: Anstatt...',
    correctAnswer: 'Anstatt zur Party zu gehen, würde ich lieber zu Hause bleiben.',
    points: 1, orderIndex: 24, tags: ['anstatt', 'Infinitivsatz']
  },
  {
    language: 'German', cefrLevel: 'B2', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Sie hat nicht genug gelernt, deshalb hat sie die Prüfung nicht bestanden.',
    questionText: 'Schreiben Sie den Satz um, beginnend mit: Hätte sie...',
    correctAnswer: 'Hätte sie genug gelernt, hätte sie die Prüfung bestanden.',
    points: 1, orderIndex: 25, tags: ['Konjunktiv II', 'Plusquamperfekt']
  },

  // C1 (5 Fragen)
  {
    language: 'German', cefrLevel: 'C1', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Ich wusste nicht, dass sie krank war, deshalb habe ich sie nicht besucht.',
    questionText: 'Schreiben Sie den Satz um, beginnend mit: Hätte ich...',
    correctAnswer: 'Hätte ich gewusst, dass sie krank war, hätte ich sie besucht.',
    points: 1, orderIndex: 26, tags: ['Inversion', 'Konjunktiv II']
  },
  {
    language: 'German', cefrLevel: 'C1', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Die Regierung sollte mehr in erneuerbare Energien investieren.',
    questionText: 'Schreiben Sie den Satz um mit: Es wird höchste Zeit, dass...',
    correctAnswer: 'Es wird höchste Zeit, dass die Regierung mehr in erneuerbare Energien investiert.',
    points: 1, orderIndex: 27, tags: ['es wird Zeit', 'Konjunktiv']
  },
  {
    language: 'German', cefrLevel: 'C1', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Er erkannte die Wahrheit erst nach ihrer Abreise.',
    questionText: 'Schreiben Sie den Satz um, beginnend mit: Erst nach...',
    correctAnswer: 'Erst nach ihrer Abreise erkannte er die Wahrheit.',
    points: 1, orderIndex: 28, tags: ['Inversion', 'erst nach']
  },
  {
    language: 'German', cefrLevel: 'C1', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Wir haben nie einen so schweren Sturm erlebt.',
    questionText: 'Schreiben Sie den Satz um, beginnend mit: Nie zuvor...',
    correctAnswer: 'Nie zuvor haben wir einen so schweren Sturm erlebt.',
    points: 1, orderIndex: 29, tags: ['Inversion', 'nie zuvor']
  },
  {
    language: 'German', cefrLevel: 'C1', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Man glaubt, dass die antike Stadt durch ein Erdbeben zerstört wurde.',
    questionText: 'Schreiben Sie den Satz um, beginnend mit: Die antike Stadt...',
    correctAnswer: 'Die antike Stadt soll durch ein Erdbeben zerstört worden sein.',
    points: 1, orderIndex: 30, tags: ['Modalverben', 'Passiv']
  },
]
