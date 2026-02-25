import { MultiSkillQuestionData } from '../types'

// German Grammar MCQ Questions — 40 questions
// Distributed across A1-C2 levels

export const germanGrammarQuestions: MultiSkillQuestionData[] = [
  // ============================================================
  // A1 — Beginner (8 questions)
  // ============================================================
  {
    language: 'German', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Das ___ mein Buch.',
    options: [{ label: 'A', value: 'ist' }, { label: 'B', value: 'sind' }, { label: 'C', value: 'bin' }, { label: 'D', value: 'seid' }],
    correctAnswer: 'ist', points: 1, orderIndex: 1, tags: ['sein', 'present tense']
  },
  {
    language: 'German', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Ich trinke ___ Kaffee.',
    options: [{ label: 'A', value: 'der' }, { label: 'B', value: 'die' }, { label: 'C', value: 'den' }, { label: 'D', value: 'das' }],
    correctAnswer: 'den', points: 1, orderIndex: 2, tags: ['Akkusativ', 'Artikel']
  },
  {
    language: 'German', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '___ Lampe ist neu.',
    options: [{ label: 'A', value: 'Der' }, { label: 'B', value: 'Die' }, { label: 'C', value: 'Das' }, { label: 'D', value: 'Den' }],
    correctAnswer: 'Die', points: 1, orderIndex: 3, tags: ['Artikel', 'feminin']
  },
  {
    language: 'German', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Er ___ jeden Tag Fußball.',
    options: [{ label: 'A', value: 'spiele' }, { label: 'B', value: 'spielst' }, { label: 'C', value: 'spielt' }, { label: 'D', value: 'spielen' }],
    correctAnswer: 'spielt', points: 1, orderIndex: 4, tags: ['Präsens', 'Konjugation']
  },
  {
    language: 'German', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Wir ___ aus Deutschland.',
    options: [{ label: 'A', value: 'komme' }, { label: 'B', value: 'kommst' }, { label: 'C', value: 'kommt' }, { label: 'D', value: 'kommen' }],
    correctAnswer: 'kommen', points: 1, orderIndex: 5, tags: ['Präsens', 'Konjugation']
  },
  {
    language: 'German', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Heute ___ ich ins Kino.',
    options: [{ label: 'A', value: 'gehen' }, { label: 'B', value: 'gehe' }, { label: 'C', value: 'gehst' }, { label: 'D', value: 'geht' }],
    correctAnswer: 'gehe', points: 1, orderIndex: 6, tags: ['Wortstellung', 'Präsens']
  },
  {
    language: 'German', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '___ Kind spielt im Garten.',
    options: [{ label: 'A', value: 'Der' }, { label: 'B', value: 'Die' }, { label: 'C', value: 'Das' }, { label: 'D', value: 'Den' }],
    correctAnswer: 'Das', points: 1, orderIndex: 7, tags: ['Artikel', 'neutrum']
  },
  {
    language: 'German', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '___ du Deutsch?',
    options: [{ label: 'A', value: 'Sprecht' }, { label: 'B', value: 'Sprichst' }, { label: 'C', value: 'Spreche' }, { label: 'D', value: 'Sprechen' }],
    correctAnswer: 'Sprichst', points: 1, orderIndex: 8, tags: ['Präsens', 'Vokalwechsel']
  },

  // ============================================================
  // A2 — Elementary (8 questions)
  // ============================================================
  {
    language: 'German', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Ich ___ gestern einen Film gesehen.',
    options: [{ label: 'A', value: 'bin' }, { label: 'B', value: 'habe' }, { label: 'C', value: 'hat' }, { label: 'D', value: 'ist' }],
    correctAnswer: 'habe', points: 1, orderIndex: 9, tags: ['Perfekt', 'haben']
  },
  {
    language: 'German', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Er ___ gestern nach Berlin gefahren.',
    options: [{ label: 'A', value: 'hat' }, { label: 'B', value: 'habe' }, { label: 'C', value: 'ist' }, { label: 'D', value: 'sind' }],
    correctAnswer: 'ist', points: 1, orderIndex: 10, tags: ['Perfekt', 'sein']
  },
  {
    language: 'German', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Ich gebe ___ Freund ein Geschenk.',
    options: [{ label: 'A', value: 'meinen' }, { label: 'B', value: 'meinem' }, { label: 'C', value: 'mein' }, { label: 'D', value: 'meiner' }],
    correctAnswer: 'meinem', points: 1, orderIndex: 11, tags: ['Dativ', 'Possessivartikel']
  },
  {
    language: 'German', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Sie ___ heute nicht kommen.',
    options: [{ label: 'A', value: 'kann' }, { label: 'B', value: 'kannst' }, { label: 'C', value: 'können' }, { label: 'D', value: 'könnt' }],
    correctAnswer: 'kann', points: 1, orderIndex: 12, tags: ['Modalverben', 'können']
  },
  {
    language: 'German', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Das Buch liegt auf ___ Tisch.',
    options: [{ label: 'A', value: 'den' }, { label: 'B', value: 'der' }, { label: 'C', value: 'dem' }, { label: 'D', value: 'das' }],
    correctAnswer: 'dem', points: 1, orderIndex: 13, tags: ['Dativ', 'Wechselpräposition']
  },
  {
    language: 'German', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Ich stelle die Vase auf ___ Tisch.',
    options: [{ label: 'A', value: 'dem' }, { label: 'B', value: 'den' }, { label: 'C', value: 'der' }, { label: 'D', value: 'das' }],
    correctAnswer: 'den', points: 1, orderIndex: 14, tags: ['Akkusativ', 'Wechselpräposition']
  },
  {
    language: 'German', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Wir ___ morgen früh aufstehen.',
    options: [{ label: 'A', value: 'muss' }, { label: 'B', value: 'müsst' }, { label: 'C', value: 'müssen' }, { label: 'D', value: 'musst' }],
    correctAnswer: 'müssen', points: 1, orderIndex: 15, tags: ['Modalverben', 'müssen']
  },
  {
    language: 'German', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Er hat mir ___ Buch gegeben.',
    options: [{ label: 'A', value: 'ein' }, { label: 'B', value: 'einen' }, { label: 'C', value: 'einem' }, { label: 'D', value: 'einer' }],
    correctAnswer: 'ein', points: 1, orderIndex: 16, tags: ['Akkusativ', 'neutrum']
  },

  // ============================================================
  // B1 — Intermediate (8 questions)
  // ============================================================
  {
    language: 'German', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Wenn ich reich ___, würde ich um die Welt reisen.',
    options: [{ label: 'A', value: 'bin' }, { label: 'B', value: 'wäre' }, { label: 'C', value: 'war' }, { label: 'D', value: 'sei' }],
    correctAnswer: 'wäre', points: 1, orderIndex: 17, tags: ['Konjunktiv II', 'irrealer Konditionalsatz']
  },
  {
    language: 'German', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Das Haus ___ letztes Jahr gebaut.',
    options: [{ label: 'A', value: 'hat' }, { label: 'B', value: 'ist' }, { label: 'C', value: 'wurde' }, { label: 'D', value: 'wird' }],
    correctAnswer: 'wurde', points: 1, orderIndex: 18, tags: ['Passiv', 'Präteritum']
  },
  {
    language: 'German', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Der Mann, ___ ich gestern getroffen habe, ist mein Nachbar.',
    options: [{ label: 'A', value: 'der' }, { label: 'B', value: 'den' }, { label: 'C', value: 'dem' }, { label: 'D', value: 'dessen' }],
    correctAnswer: 'den', points: 1, orderIndex: 19, tags: ['Relativsatz', 'Akkusativ']
  },
  {
    language: 'German', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Ich ___ gern mehr Zeit für Hobbys.',
    options: [{ label: 'A', value: 'habe' }, { label: 'B', value: 'hätte' }, { label: 'C', value: 'hatte' }, { label: 'D', value: 'hat' }],
    correctAnswer: 'hätte', points: 1, orderIndex: 20, tags: ['Konjunktiv II', 'Wunsch']
  },
  {
    language: 'German', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Die Frau, ___ Auto gestohlen wurde, rief die Polizei.',
    options: [{ label: 'A', value: 'die' }, { label: 'B', value: 'deren' }, { label: 'C', value: 'der' }, { label: 'D', value: 'denen' }],
    correctAnswer: 'deren', points: 1, orderIndex: 21, tags: ['Relativsatz', 'Genitiv']
  },
  {
    language: 'German', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Obwohl es regnete, ___ wir spazieren.',
    options: [{ label: 'A', value: 'gehen' }, { label: 'B', value: 'gingen' }, { label: 'C', value: 'gegangen' }, { label: 'D', value: 'ging' }],
    correctAnswer: 'gingen', points: 1, orderIndex: 22, tags: ['Nebensatz', 'obwohl']
  },
  {
    language: 'German', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Er fragte mich, ob ich ihm helfen ___.',
    options: [{ label: 'A', value: 'kann' }, { label: 'B', value: 'könnte' }, { label: 'C', value: 'konnte' }, { label: 'D', value: 'können' }],
    correctAnswer: 'könnte', points: 1, orderIndex: 23, tags: ['indirekte Frage', 'Konjunktiv II']
  },
  {
    language: 'German', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Das Fenster ___ jeden Morgen geöffnet.',
    options: [{ label: 'A', value: 'wurde' }, { label: 'B', value: 'wird' }, { label: 'C', value: 'ist' }, { label: 'D', value: 'hat' }],
    correctAnswer: 'wird', points: 1, orderIndex: 24, tags: ['Passiv', 'Präsens']
  },

  // ============================================================
  // B2 — Upper Intermediate (8 questions)
  // ============================================================
  {
    language: 'German', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Nachdem er das Studium ___ hatte, fand er sofort eine Stelle.',
    options: [{ label: 'A', value: 'abgeschlossen' }, { label: 'B', value: 'abschließen' }, { label: 'C', value: 'abschloss' }, { label: 'D', value: 'abschließt' }],
    correctAnswer: 'abgeschlossen', points: 1, orderIndex: 25, tags: ['Plusquamperfekt', 'nachdem']
  },
  {
    language: 'German', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Bis morgen ___ ich das Buch gelesen haben.',
    options: [{ label: 'A', value: 'will' }, { label: 'B', value: 'werde' }, { label: 'C', value: 'würde' }, { label: 'D', value: 'bin' }],
    correctAnswer: 'werde', points: 1, orderIndex: 26, tags: ['Futur II']
  },
  {
    language: 'German', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Der ___ Vertrag muss noch unterschrieben werden.',
    options: [{ label: 'A', value: 'vorbereitende' }, { label: 'B', value: 'vorbereitete' }, { label: 'C', value: 'vorbereiten' }, { label: 'D', value: 'vorbereitend' }],
    correctAnswer: 'vorbereitete', points: 1, orderIndex: 27, tags: ['Partizip II', 'Adjektivdeklination']
  },
  {
    language: 'German', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Je mehr man übt, ___ besser wird man.',
    options: [{ label: 'A', value: 'so' }, { label: 'B', value: 'desto' }, { label: 'C', value: 'als' }, { label: 'D', value: 'wie' }],
    correctAnswer: 'desto', points: 1, orderIndex: 28, tags: ['je...desto', 'Komparativ']
  },
  {
    language: 'German', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Er tat so, als ___ er nichts davon.',
    options: [{ label: 'A', value: 'weiß' }, { label: 'B', value: 'wusste' }, { label: 'C', value: 'wüsste' }, { label: 'D', value: 'gewusst' }],
    correctAnswer: 'wüsste', points: 1, orderIndex: 29, tags: ['als ob', 'Konjunktiv II']
  },
  {
    language: 'German', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Der ___ Besucher musste draußen warten.',
    options: [{ label: 'A', value: 'zu spät kommende' }, { label: 'B', value: 'zu spät gekommene' }, { label: 'C', value: 'zu spät kommen' }, { label: 'D', value: 'zu spät kam' }],
    correctAnswer: 'zu spät kommende', points: 1, orderIndex: 30, tags: ['Partizip I', 'erweitertes Attribut']
  },
  {
    language: 'German', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Anstatt ___ zu lernen, spielte er Videospiele.',
    options: [{ label: 'A', value: 'für die Prüfung' }, { label: 'B', value: 'die Prüfung' }, { label: 'C', value: 'der Prüfung' }, { label: 'D', value: 'zur Prüfung' }],
    correctAnswer: 'für die Prüfung', points: 1, orderIndex: 31, tags: ['Infinitivkonstruktion', 'anstatt...zu']
  },
  {
    language: 'German', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Das Problem, ___ wir gesprochen haben, ist gelöst.',
    options: [{ label: 'A', value: 'über das' }, { label: 'B', value: 'worüber' }, { label: 'C', value: 'darüber' }, { label: 'D', value: 'über dem' }],
    correctAnswer: 'über das', points: 1, orderIndex: 32, tags: ['Relativsatz', 'Präposition']
  },

  // ============================================================
  // C1 — Advanced (4 questions)
  // ============================================================
  {
    language: 'German', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Der Minister sagte, er ___ die Reform unterstützen.',
    options: [{ label: 'A', value: 'wird' }, { label: 'B', value: 'werde' }, { label: 'C', value: 'würde' }, { label: 'D', value: 'will' }],
    correctAnswer: 'werde', points: 1, orderIndex: 33, tags: ['Konjunktiv I', 'indirekte Rede']
  },
  {
    language: 'German', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Die von der Regierung ___ Maßnahmen zeigten Wirkung.',
    options: [{ label: 'A', value: 'ergriffenen' }, { label: 'B', value: 'ergreifenden' }, { label: 'C', value: 'ergreifen' }, { label: 'D', value: 'ergriffen' }],
    correctAnswer: 'ergriffenen', points: 1, orderIndex: 34, tags: ['erweitertes Attribut', 'Partizip II']
  },
  {
    language: 'German', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Er behauptete, er ___ den Unfall nicht verursacht.',
    options: [{ label: 'A', value: 'hat' }, { label: 'B', value: 'habe' }, { label: 'C', value: 'hätte' }, { label: 'D', value: 'hatte' }],
    correctAnswer: 'habe', points: 1, orderIndex: 35, tags: ['Konjunktiv I', 'Perfekt']
  },
  {
    language: 'German', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Nur ___ man die Zusammenhänge versteht, kann man das Problem lösen.',
    options: [{ label: 'A', value: 'wenn' }, { label: 'B', value: 'sofern' }, { label: 'C', value: 'indem' }, { label: 'D', value: 'damit' }],
    correctAnswer: 'sofern', points: 1, orderIndex: 36, tags: ['komplexe Nebensätze', 'Konditional']
  },

  // ============================================================
  // C2 — Proficiency (4 questions)
  // ============================================================
  {
    language: 'German', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Dem sei, wie ihm ___.',
    options: [{ label: 'A', value: 'wolle' }, { label: 'B', value: 'will' }, { label: 'C', value: 'wollte' }, { label: 'D', value: 'gewollt' }],
    correctAnswer: 'wolle', points: 1, orderIndex: 37, tags: ['Konjunktiv I', 'Redewendung']
  },
  {
    language: 'German', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Die in den letzten Jahren ___ angestiegene Inflation bereitet Sorgen.',
    options: [{ label: 'A', value: 'stetig' }, { label: 'B', value: 'dramatisch' }, { label: 'C', value: 'kontinuierlich' }, { label: 'D', value: 'merklich' }],
    correctAnswer: 'kontinuierlich', points: 1, orderIndex: 38, tags: ['erweitertes Attribut', 'Nominalstil']
  },
  {
    language: 'German', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Wie dem auch ___, wir müssen eine Lösung finden.',
    options: [{ label: 'A', value: 'ist' }, { label: 'B', value: 'sei' }, { label: 'C', value: 'wäre' }, { label: 'D', value: 'war' }],
    correctAnswer: 'sei', points: 1, orderIndex: 39, tags: ['Konjunktiv I', 'konzessive Formel']
  },
  {
    language: 'German', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Nicht nur die Kosten, ___ auch die Qualität spielt eine entscheidende Rolle.',
    options: [{ label: 'A', value: 'aber' }, { label: 'B', value: 'sondern' }, { label: 'C', value: 'jedoch' }, { label: 'D', value: 'dennoch' }],
    correctAnswer: 'sondern', points: 1, orderIndex: 40, tags: ['nicht nur...sondern auch', 'komplexe Satzstruktur']
  },
]
