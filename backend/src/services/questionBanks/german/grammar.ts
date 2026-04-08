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
    options: [{ label: 'ist', value: 'ist' }, { label: 'sind', value: 'sind' }, { label: 'bin', value: 'bin' }, { label: 'seid', value: 'seid' }],
    correctAnswer: 'ist', points: 1, orderIndex: 1, tags: ['sein', 'present tense']
  },
  {
    language: 'German', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Ich trinke ___ Kaffee.',
    options: [{ label: 'der', value: 'der' }, { label: 'die', value: 'die' }, { label: 'den', value: 'den' }, { label: 'das', value: 'das' }],
    correctAnswer: 'den', points: 1, orderIndex: 2, tags: ['Akkusativ', 'Artikel']
  },
  {
    language: 'German', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '___ Lampe ist neu.',
    options: [{ label: 'Der', value: 'Der' }, { label: 'Die', value: 'Die' }, { label: 'Das', value: 'Das' }, { label: 'Den', value: 'Den' }],
    correctAnswer: 'Die', points: 1, orderIndex: 3, tags: ['Artikel', 'feminin']
  },
  {
    language: 'German', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Er ___ jeden Tag Fußball.',
    options: [{ label: 'spiele', value: 'spiele' }, { label: 'spielst', value: 'spielst' }, { label: 'spielt', value: 'spielt' }, { label: 'spielen', value: 'spielen' }],
    correctAnswer: 'spielt', points: 1, orderIndex: 4, tags: ['Präsens', 'Konjugation']
  },
  {
    language: 'German', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Wir ___ aus Deutschland.',
    options: [{ label: 'komme', value: 'komme' }, { label: 'kommst', value: 'kommst' }, { label: 'kommt', value: 'kommt' }, { label: 'kommen', value: 'kommen' }],
    correctAnswer: 'kommen', points: 1, orderIndex: 5, tags: ['Präsens', 'Konjugation']
  },
  {
    language: 'German', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Heute ___ ich ins Kino.',
    options: [{ label: 'gehen', value: 'gehen' }, { label: 'gehe', value: 'gehe' }, { label: 'gehst', value: 'gehst' }, { label: 'geht', value: 'geht' }],
    correctAnswer: 'gehe', points: 1, orderIndex: 6, tags: ['Wortstellung', 'Präsens']
  },
  {
    language: 'German', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '___ Kind spielt im Garten.',
    options: [{ label: 'Der', value: 'Der' }, { label: 'Die', value: 'Die' }, { label: 'Das', value: 'Das' }, { label: 'Den', value: 'Den' }],
    correctAnswer: 'Das', points: 1, orderIndex: 7, tags: ['Artikel', 'neutrum']
  },
  {
    language: 'German', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '___ du Deutsch?',
    options: [{ label: 'Sprecht', value: 'Sprecht' }, { label: 'Sprichst', value: 'Sprichst' }, { label: 'Spreche', value: 'Spreche' }, { label: 'Sprechen', value: 'Sprechen' }],
    correctAnswer: 'Sprichst', points: 1, orderIndex: 8, tags: ['Präsens', 'Vokalwechsel']
  },

  // ============================================================
  // A2 — Elementary (8 questions)
  // ============================================================
  {
    language: 'German', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Ich ___ gestern einen Film gesehen.',
    options: [{ label: 'bin', value: 'bin' }, { label: 'habe', value: 'habe' }, { label: 'hat', value: 'hat' }, { label: 'ist', value: 'ist' }],
    correctAnswer: 'habe', points: 1, orderIndex: 9, tags: ['Perfekt', 'haben']
  },
  {
    language: 'German', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Er ___ gestern nach Berlin gefahren.',
    options: [{ label: 'hat', value: 'hat' }, { label: 'habe', value: 'habe' }, { label: 'ist', value: 'ist' }, { label: 'sind', value: 'sind' }],
    correctAnswer: 'ist', points: 1, orderIndex: 10, tags: ['Perfekt', 'sein']
  },
  {
    language: 'German', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Ich gebe ___ Freund ein Geschenk.',
    options: [{ label: 'meinen', value: 'meinen' }, { label: 'meinem', value: 'meinem' }, { label: 'mein', value: 'mein' }, { label: 'meiner', value: 'meiner' }],
    correctAnswer: 'meinem', points: 1, orderIndex: 11, tags: ['Dativ', 'Possessivartikel']
  },
  {
    language: 'German', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Sie ___ heute nicht kommen.',
    options: [{ label: 'kann', value: 'kann' }, { label: 'kannst', value: 'kannst' }, { label: 'können', value: 'können' }, { label: 'könnt', value: 'könnt' }],
    correctAnswer: 'kann', points: 1, orderIndex: 12, tags: ['Modalverben', 'können']
  },
  {
    language: 'German', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Das Buch liegt auf ___ Tisch.',
    options: [{ label: 'den', value: 'den' }, { label: 'der', value: 'der' }, { label: 'dem', value: 'dem' }, { label: 'das', value: 'das' }],
    correctAnswer: 'dem', points: 1, orderIndex: 13, tags: ['Dativ', 'Wechselpräposition']
  },
  {
    language: 'German', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Ich stelle die Vase auf ___ Tisch.',
    options: [{ label: 'dem', value: 'dem' }, { label: 'den', value: 'den' }, { label: 'der', value: 'der' }, { label: 'das', value: 'das' }],
    correctAnswer: 'den', points: 1, orderIndex: 14, tags: ['Akkusativ', 'Wechselpräposition']
  },
  {
    language: 'German', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Wir ___ morgen früh aufstehen.',
    options: [{ label: 'muss', value: 'muss' }, { label: 'müsst', value: 'müsst' }, { label: 'müssen', value: 'müssen' }, { label: 'musst', value: 'musst' }],
    correctAnswer: 'müssen', points: 1, orderIndex: 15, tags: ['Modalverben', 'müssen']
  },
  {
    language: 'German', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Er hat mir ___ Buch gegeben.',
    options: [{ label: 'ein', value: 'ein' }, { label: 'einen', value: 'einen' }, { label: 'einem', value: 'einem' }, { label: 'einer', value: 'einer' }],
    correctAnswer: 'ein', points: 1, orderIndex: 16, tags: ['Akkusativ', 'neutrum']
  },

  // ============================================================
  // B1 — Intermediate (8 questions)
  // ============================================================
  {
    language: 'German', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Wenn ich reich ___, würde ich um die Welt reisen.',
    options: [{ label: 'bin', value: 'bin' }, { label: 'wäre', value: 'wäre' }, { label: 'war', value: 'war' }, { label: 'sei', value: 'sei' }],
    correctAnswer: 'wäre', points: 1, orderIndex: 17, tags: ['Konjunktiv II', 'irrealer Konditionalsatz']
  },
  {
    language: 'German', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Das Haus ___ letztes Jahr gebaut.',
    options: [{ label: 'hat', value: 'hat' }, { label: 'ist', value: 'ist' }, { label: 'wurde', value: 'wurde' }, { label: 'wird', value: 'wird' }],
    correctAnswer: 'wurde', points: 1, orderIndex: 18, tags: ['Passiv', 'Präteritum']
  },
  {
    language: 'German', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Der Mann, ___ ich gestern getroffen habe, ist mein Nachbar.',
    options: [{ label: 'der', value: 'der' }, { label: 'den', value: 'den' }, { label: 'dem', value: 'dem' }, { label: 'dessen', value: 'dessen' }],
    correctAnswer: 'den', points: 1, orderIndex: 19, tags: ['Relativsatz', 'Akkusativ']
  },
  {
    language: 'German', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Ich ___ gern mehr Zeit für Hobbys.',
    options: [{ label: 'habe', value: 'habe' }, { label: 'hätte', value: 'hätte' }, { label: 'hatte', value: 'hatte' }, { label: 'hat', value: 'hat' }],
    correctAnswer: 'hätte', points: 1, orderIndex: 20, tags: ['Konjunktiv II', 'Wunsch']
  },
  {
    language: 'German', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Die Frau, ___ Auto gestohlen wurde, rief die Polizei.',
    options: [{ label: 'die', value: 'die' }, { label: 'deren', value: 'deren' }, { label: 'der', value: 'der' }, { label: 'denen', value: 'denen' }],
    correctAnswer: 'deren', points: 1, orderIndex: 21, tags: ['Relativsatz', 'Genitiv']
  },
  {
    language: 'German', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Obwohl es regnete, ___ wir spazieren.',
    options: [{ label: 'gehen', value: 'gehen' }, { label: 'gingen', value: 'gingen' }, { label: 'gegangen', value: 'gegangen' }, { label: 'ging', value: 'ging' }],
    correctAnswer: 'gingen', points: 1, orderIndex: 22, tags: ['Nebensatz', 'obwohl']
  },
  {
    language: 'German', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Er fragte mich, ob ich ihm helfen ___.',
    options: [{ label: 'kann', value: 'kann' }, { label: 'könnte', value: 'könnte' }, { label: 'konnte', value: 'konnte' }, { label: 'können', value: 'können' }],
    correctAnswer: 'könnte', points: 1, orderIndex: 23, tags: ['indirekte Frage', 'Konjunktiv II']
  },
  {
    language: 'German', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Das Fenster ___ jeden Morgen geöffnet.',
    options: [{ label: 'wurde', value: 'wurde' }, { label: 'wird', value: 'wird' }, { label: 'ist', value: 'ist' }, { label: 'hat', value: 'hat' }],
    correctAnswer: 'wird', points: 1, orderIndex: 24, tags: ['Passiv', 'Präsens']
  },

  // ============================================================
  // B2 — Upper Intermediate (8 questions)
  // ============================================================
  {
    language: 'German', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Nachdem er das Studium ___ hatte, fand er sofort eine Stelle.',
    options: [{ label: 'abgeschlossen', value: 'abgeschlossen' }, { label: 'abschließen', value: 'abschließen' }, { label: 'abschloss', value: 'abschloss' }, { label: 'abschließt', value: 'abschließt' }],
    correctAnswer: 'abgeschlossen', points: 1, orderIndex: 25, tags: ['Plusquamperfekt', 'nachdem']
  },
  {
    language: 'German', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Bis morgen ___ ich das Buch gelesen haben.',
    options: [{ label: 'will', value: 'will' }, { label: 'werde', value: 'werde' }, { label: 'würde', value: 'würde' }, { label: 'bin', value: 'bin' }],
    correctAnswer: 'werde', points: 1, orderIndex: 26, tags: ['Futur II']
  },
  {
    language: 'German', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Der ___ Vertrag muss noch unterschrieben werden.',
    options: [{ label: 'vorbereitende', value: 'vorbereitende' }, { label: 'vorbereitete', value: 'vorbereitete' }, { label: 'vorbereiten', value: 'vorbereiten' }, { label: 'vorbereitend', value: 'vorbereitend' }],
    correctAnswer: 'vorbereitete', points: 1, orderIndex: 27, tags: ['Partizip II', 'Adjektivdeklination']
  },
  {
    language: 'German', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Je mehr man übt, ___ besser wird man.',
    options: [{ label: 'so', value: 'so' }, { label: 'desto', value: 'desto' }, { label: 'als', value: 'als' }, { label: 'wie', value: 'wie' }],
    correctAnswer: 'desto', points: 1, orderIndex: 28, tags: ['je...desto', 'Komparativ']
  },
  {
    language: 'German', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Er tat so, als ___ er nichts davon.',
    options: [{ label: 'weiß', value: 'weiß' }, { label: 'wusste', value: 'wusste' }, { label: 'wüsste', value: 'wüsste' }, { label: 'gewusst', value: 'gewusst' }],
    correctAnswer: 'wüsste', points: 1, orderIndex: 29, tags: ['als ob', 'Konjunktiv II']
  },
  {
    language: 'German', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Der ___ Besucher musste draußen warten.',
    options: [{ label: 'zu spät kommende', value: 'zu spät kommende' }, { label: 'zu spät gekommene', value: 'zu spät gekommene' }, { label: 'zu spät kommen', value: 'zu spät kommen' }, { label: 'zu spät kam', value: 'zu spät kam' }],
    correctAnswer: 'zu spät kommende', points: 1, orderIndex: 30, tags: ['Partizip I', 'erweitertes Attribut']
  },
  {
    language: 'German', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Anstatt ___ zu lernen, spielte er Videospiele.',
    options: [{ label: 'für die Prüfung', value: 'für die Prüfung' }, { label: 'die Prüfung', value: 'die Prüfung' }, { label: 'der Prüfung', value: 'der Prüfung' }, { label: 'zur Prüfung', value: 'zur Prüfung' }],
    correctAnswer: 'für die Prüfung', points: 1, orderIndex: 31, tags: ['Infinitivkonstruktion', 'anstatt...zu']
  },
  {
    language: 'German', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Das Problem, ___ wir gesprochen haben, ist gelöst.',
    options: [{ label: 'über das', value: 'über das' }, { label: 'worüber', value: 'worüber' }, { label: 'darüber', value: 'darüber' }, { label: 'über dem', value: 'über dem' }],
    correctAnswer: 'über das', points: 1, orderIndex: 32, tags: ['Relativsatz', 'Präposition']
  },

  // ============================================================
  // C1 — Advanced (4 questions)
  // ============================================================
  {
    language: 'German', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Der Minister sagte, er ___ die Reform unterstützen.',
    options: [{ label: 'wird', value: 'wird' }, { label: 'werde', value: 'werde' }, { label: 'würde', value: 'würde' }, { label: 'will', value: 'will' }],
    correctAnswer: 'werde', points: 1, orderIndex: 33, tags: ['Konjunktiv I', 'indirekte Rede']
  },
  {
    language: 'German', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Die von der Regierung ___ Maßnahmen zeigten Wirkung.',
    options: [{ label: 'ergriffenen', value: 'ergriffenen' }, { label: 'ergreifenden', value: 'ergreifenden' }, { label: 'ergreifen', value: 'ergreifen' }, { label: 'ergriffen', value: 'ergriffen' }],
    correctAnswer: 'ergriffenen', points: 1, orderIndex: 34, tags: ['erweitertes Attribut', 'Partizip II']
  },
  {
    language: 'German', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Er behauptete, er ___ den Unfall nicht verursacht.',
    options: [{ label: 'hat', value: 'hat' }, { label: 'habe', value: 'habe' }, { label: 'hätte', value: 'hätte' }, { label: 'hatte', value: 'hatte' }],
    correctAnswer: 'habe', points: 1, orderIndex: 35, tags: ['Konjunktiv I', 'Perfekt']
  },
  {
    language: 'German', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Nur ___ man die Zusammenhänge versteht, kann man das Problem lösen.',
    options: [{ label: 'wenn', value: 'wenn' }, { label: 'sofern', value: 'sofern' }, { label: 'indem', value: 'indem' }, { label: 'damit', value: 'damit' }],
    correctAnswer: 'sofern', points: 1, orderIndex: 36, tags: ['komplexe Nebensätze', 'Konditional']
  },

  // ============================================================
  // C2 — Proficiency (4 questions)
  // ============================================================
  {
    language: 'German', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Dem sei, wie ihm ___.',
    options: [{ label: 'wolle', value: 'wolle' }, { label: 'will', value: 'will' }, { label: 'wollte', value: 'wollte' }, { label: 'gewollt', value: 'gewollt' }],
    correctAnswer: 'wolle', points: 1, orderIndex: 37, tags: ['Konjunktiv I', 'Redewendung']
  },
  {
    language: 'German', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Die in den letzten Jahren ___ angestiegene Inflation bereitet Sorgen.',
    options: [{ label: 'stetig', value: 'stetig' }, { label: 'dramatisch', value: 'dramatisch' }, { label: 'kontinuierlich', value: 'kontinuierlich' }, { label: 'merklich', value: 'merklich' }],
    correctAnswer: 'kontinuierlich', points: 1, orderIndex: 38, tags: ['erweitertes Attribut', 'Nominalstil']
  },
  {
    language: 'German', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Wie dem auch ___, wir müssen eine Lösung finden.',
    options: [{ label: 'ist', value: 'ist' }, { label: 'sei', value: 'sei' }, { label: 'wäre', value: 'wäre' }, { label: 'war', value: 'war' }],
    correctAnswer: 'sei', points: 1, orderIndex: 39, tags: ['Konjunktiv I', 'konzessive Formel']
  },
  {
    language: 'German', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Nicht nur die Kosten, ___ auch die Qualität spielt eine entscheidende Rolle.',
    options: [{ label: 'aber', value: 'aber' }, { label: 'sondern', value: 'sondern' }, { label: 'jedoch', value: 'jedoch' }, { label: 'dennoch', value: 'dennoch' }],
    correctAnswer: 'sondern', points: 1, orderIndex: 40, tags: ['nicht nur...sondern auch', 'komplexe Satzstruktur']
  },
]
