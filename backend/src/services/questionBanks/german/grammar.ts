import { MultiSkillQuestionData } from '../types'

// German Grammar MCQ Questions — 100 questions
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
    questionText: 'Die in den letzten Jahren ohne Unterbrechung ___ angestiegene Inflation bereitet Sorgen.',
    options: [{ label: 'plötzlich', value: 'plötzlich' }, { label: 'gelegentlich', value: 'gelegentlich' }, { label: 'kontinuierlich', value: 'kontinuierlich' }, { label: 'selten', value: 'selten' }],
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

  // ============================================================
  // NEW QUESTIONS — 60 additional (orderIndex 41–100)
  // 10 per level (A1–C2)
  // ============================================================

  // --- A1 (41–50) ---
  {
    language: 'German', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Ich ___ müde.',
    options: [{ label: 'bin', value: 'bin' }, { label: 'bist', value: 'bist' }, { label: 'ist', value: 'ist' }, { label: 'sind', value: 'sind' }],
    correctAnswer: 'bin', points: 1, orderIndex: 41, tags: ['sein', 'Präsens']
  },
  {
    language: 'German', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '___ du Geschwister?',
    options: [{ label: 'Hast', value: 'Hast' }, { label: 'Hat', value: 'Hat' }, { label: 'Haben', value: 'Haben' }, { label: 'Habt', value: 'Habt' }],
    correctAnswer: 'Hast', points: 1, orderIndex: 42, tags: ['haben', 'Präsens']
  },
  {
    language: 'German', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Die Kinder ___ im Park.',
    options: [{ label: 'spielen', value: 'spielen' }, { label: 'spielt', value: 'spielt' }, { label: 'spiele', value: 'spiele' }, { label: 'spielst', value: 'spielst' }],
    correctAnswer: 'spielen', points: 1, orderIndex: 43, tags: ['Präsens', 'Konjugation']
  },
  {
    language: 'German', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Er ___ einen Hund.',
    options: [{ label: 'habe', value: 'habe' }, { label: 'hast', value: 'hast' }, { label: 'hat', value: 'hat' }, { label: 'haben', value: 'haben' }],
    correctAnswer: 'hat', points: 1, orderIndex: 44, tags: ['haben', 'Präsens']
  },
  {
    language: 'German', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Ich komme ___ Italien.',
    options: [{ label: 'von', value: 'von' }, { label: 'aus', value: 'aus' }, { label: 'in', value: 'in' }, { label: 'nach', value: 'nach' }],
    correctAnswer: 'aus', points: 1, orderIndex: 45, tags: ['Präposition', 'Herkunft']
  },
  {
    language: 'German', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Wir wohnen ___ Berlin.',
    options: [{ label: 'aus', value: 'aus' }, { label: 'in', value: 'in' }, { label: 'nach', value: 'nach' }, { label: 'von', value: 'von' }],
    correctAnswer: 'in', points: 1, orderIndex: 46, tags: ['Präposition', 'Wohnort']
  },
  {
    language: 'German', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Sie ___ gern Musik.',
    options: [{ label: 'höre', value: 'höre' }, { label: 'hörst', value: 'hörst' }, { label: 'hört', value: 'hört' }, { label: 'hören', value: 'hören' }],
    correctAnswer: 'hört', points: 1, orderIndex: 47, tags: ['Präsens', 'Konjugation']
  },
  {
    language: 'German', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Ich sehe ___ Katze.',
    options: [{ label: 'der', value: 'der' }, { label: 'die', value: 'die' }, { label: 'das', value: 'das' }, { label: 'dem', value: 'dem' }],
    correctAnswer: 'die', points: 1, orderIndex: 48, tags: ['Akkusativ', 'Artikel']
  },
  {
    language: 'German', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '___ Hund ist braun.',
    options: [{ label: 'Die', value: 'Die' }, { label: 'Das', value: 'Das' }, { label: 'Der', value: 'Der' }, { label: 'Den', value: 'Den' }],
    correctAnswer: 'Der', points: 1, orderIndex: 49, tags: ['Artikel', 'maskulin']
  },
  {
    language: 'German', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Ihr ___ sehr nett.',
    options: [{ label: 'seid', value: 'seid' }, { label: 'sind', value: 'sind' }, { label: 'bist', value: 'bist' }, { label: 'bin', value: 'bin' }],
    correctAnswer: 'seid', points: 1, orderIndex: 50, tags: ['sein', 'Präsens']
  },

  // --- A2 (51–60) ---
  {
    language: 'German', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Wir ___ gestern ins Museum gegangen.',
    options: [{ label: 'haben', value: 'haben' }, { label: 'sind', value: 'sind' }, { label: 'hat', value: 'hat' }, { label: 'ist', value: 'ist' }],
    correctAnswer: 'sind', points: 1, orderIndex: 51, tags: ['Perfekt', 'sein']
  },
  {
    language: 'German', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Er ___ als Kind viel gelesen.',
    options: [{ label: 'ist', value: 'ist' }, { label: 'hat', value: 'hat' }, { label: 'war', value: 'war' }, { label: 'hatte', value: 'hatte' }],
    correctAnswer: 'hat', points: 1, orderIndex: 52, tags: ['Perfekt', 'haben']
  },
  {
    language: 'German', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Ich gehe ___ Supermarkt.',
    options: [{ label: 'in den', value: 'in den' }, { label: 'in dem', value: 'in dem' }, { label: 'in der', value: 'in der' }, { label: 'in das', value: 'in das' }],
    correctAnswer: 'in den', points: 1, orderIndex: 53, tags: ['Akkusativ', 'Wechselpräposition']
  },
  {
    language: 'German', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Sie ___ heute Abend kochen.',
    options: [{ label: 'will', value: 'will' }, { label: 'wollen', value: 'wollen' }, { label: 'wollt', value: 'wollt' }, { label: 'willst', value: 'willst' }],
    correctAnswer: 'will', points: 1, orderIndex: 54, tags: ['Modalverben', 'wollen']
  },
  {
    language: 'German', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Er hat ___ Mutter Blumen geschenkt.',
    options: [{ label: 'seine', value: 'seine' }, { label: 'seiner', value: 'seiner' }, { label: 'seinen', value: 'seinen' }, { label: 'seinem', value: 'seinem' }],
    correctAnswer: 'seiner', points: 1, orderIndex: 55, tags: ['Dativ', 'Possessivartikel']
  },
  {
    language: 'German', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Ich bin ___ als mein Bruder.',
    options: [{ label: 'groß', value: 'groß' }, { label: 'größer', value: 'größer' }, { label: 'am größten', value: 'am größten' }, { label: 'große', value: 'große' }],
    correctAnswer: 'größer', points: 1, orderIndex: 56, tags: ['Komparativ']
  },
  {
    language: 'German', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Er fährt ___ dem Fahrrad zur Schule.',
    options: [{ label: 'mit', value: 'mit' }, { label: 'von', value: 'von' }, { label: 'aus', value: 'aus' }, { label: 'bei', value: 'bei' }],
    correctAnswer: 'mit', points: 1, orderIndex: 57, tags: ['Präposition', 'Dativ']
  },
  {
    language: 'German', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Das Buch gehört ___ Lehrer.',
    options: [{ label: 'den', value: 'den' }, { label: 'der', value: 'der' }, { label: 'dem', value: 'dem' }, { label: 'das', value: 'das' }],
    correctAnswer: 'dem', points: 1, orderIndex: 58, tags: ['Dativ', 'gehören']
  },
  {
    language: 'German', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Gestern ___ es den ganzen Tag.',
    options: [{ label: 'regnet', value: 'regnet' }, { label: 'regnete', value: 'regnete' }, { label: 'geregnet', value: 'geregnet' }, { label: 'regnen', value: 'regnen' }],
    correctAnswer: 'regnete', points: 1, orderIndex: 59, tags: ['Präteritum']
  },
  {
    language: 'German', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Er ___ gern Fußball spielen.',
    options: [{ label: 'möchte', value: 'möchte' }, { label: 'möchten', value: 'möchten' }, { label: 'möchtest', value: 'möchtest' }, { label: 'möchtet', value: 'möchtet' }],
    correctAnswer: 'möchte', points: 1, orderIndex: 60, tags: ['Modalverben', 'möchten']
  },

  // --- B1 (61–70) ---
  {
    language: 'German', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Er ___ früher oft nach Frankreich.',
    options: [{ label: 'reist', value: 'reist' }, { label: 'reiste', value: 'reiste' }, { label: 'gereist', value: 'gereist' }, { label: 'reisen', value: 'reisen' }],
    correctAnswer: 'reiste', points: 1, orderIndex: 61, tags: ['Präteritum']
  },
  {
    language: 'German', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Die Kinder spielten im Garten, ___ es anfing zu regnen.',
    options: [{ label: 'als', value: 'als' }, { label: 'wenn', value: 'wenn' }, { label: 'wann', value: 'wann' }, { label: 'ob', value: 'ob' }],
    correctAnswer: 'als', points: 1, orderIndex: 62, tags: ['Nebensatz', 'als/wenn']
  },
  {
    language: 'German', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Ich weiß nicht, ___ er morgen kommt.',
    options: [{ label: 'dass', value: 'dass' }, { label: 'ob', value: 'ob' }, { label: 'weil', value: 'weil' }, { label: 'wenn', value: 'wenn' }],
    correctAnswer: 'ob', points: 1, orderIndex: 63, tags: ['indirekte Frage', 'Nebensatz']
  },
  {
    language: 'German', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Die Brücke ___ im letzten Jahr renoviert.',
    options: [{ label: 'wird', value: 'wird' }, { label: 'wurde', value: 'wurde' }, { label: 'ist', value: 'ist' }, { label: 'hat', value: 'hat' }],
    correctAnswer: 'wurde', points: 1, orderIndex: 64, tags: ['Passiv', 'Präteritum']
  },
  {
    language: 'German', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Wenn ich Zeit ___, würde ich dich besuchen.',
    options: [{ label: 'habe', value: 'habe' }, { label: 'hätte', value: 'hätte' }, { label: 'hatte', value: 'hatte' }, { label: 'hat', value: 'hat' }],
    correctAnswer: 'hätte', points: 1, orderIndex: 65, tags: ['Konjunktiv II', 'irrealer Konditionalsatz']
  },
  {
    language: 'German', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Das ist die Stadt, ___ ich geboren bin.',
    options: [{ label: 'in der', value: 'in der' }, { label: 'in die', value: 'in die' }, { label: 'in den', value: 'in den' }, { label: 'in dem', value: 'in dem' }],
    correctAnswer: 'in der', points: 1, orderIndex: 66, tags: ['Relativsatz', 'Präposition']
  },
  {
    language: 'German', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Er arbeitet viel, ___ er seine Familie ernähren kann.',
    options: [{ label: 'weil', value: 'weil' }, { label: 'damit', value: 'damit' }, { label: 'obwohl', value: 'obwohl' }, { label: 'dass', value: 'dass' }],
    correctAnswer: 'damit', points: 1, orderIndex: 67, tags: ['Nebensatz', 'Finalsatz']
  },
  {
    language: 'German', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '___ ich gestern nach Hause kam, war niemand da.',
    options: [{ label: 'Wenn', value: 'Wenn' }, { label: 'Als', value: 'Als' }, { label: 'Wann', value: 'Wann' }, { label: 'Ob', value: 'Ob' }],
    correctAnswer: 'Als', points: 1, orderIndex: 68, tags: ['Nebensatz', 'als/wenn']
  },
  {
    language: 'German', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Die E-Mail ___ schon gestern geschickt.',
    options: [{ label: 'wurde', value: 'wurde' }, { label: 'wird', value: 'wird' }, { label: 'war', value: 'war' }, { label: 'ist', value: 'ist' }],
    correctAnswer: 'wurde', points: 1, orderIndex: 69, tags: ['Passiv', 'Präteritum']
  },
  {
    language: 'German', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Er verließ das Haus, ___ er seinen Mantel anzuziehen.',
    options: [{ label: 'ohne', value: 'ohne' }, { label: 'anstatt', value: 'anstatt' }, { label: 'um', value: 'um' }, { label: 'statt', value: 'statt' }],
    correctAnswer: 'ohne', points: 1, orderIndex: 70, tags: ['Infinitivkonstruktion', 'ohne...zu']
  },

  // --- B2 (71–80) ---
  {
    language: 'German', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Nachdem sie die Prüfung ___ hatte, feierte sie mit Freunden.',
    options: [{ label: 'bestanden', value: 'bestanden' }, { label: 'bestehen', value: 'bestehen' }, { label: 'besteht', value: 'besteht' }, { label: 'bestand', value: 'bestand' }],
    correctAnswer: 'bestanden', points: 2, orderIndex: 71, tags: ['Plusquamperfekt', 'nachdem']
  },
  {
    language: 'German', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Er sprach so, als ___ er alles besser.',
    options: [{ label: 'weiß', value: 'weiß' }, { label: 'wisse', value: 'wisse' }, { label: 'wüsste', value: 'wüsste' }, { label: 'wusste', value: 'wusste' }],
    correctAnswer: 'wüsste', points: 2, orderIndex: 72, tags: ['als ob', 'Konjunktiv II']
  },
  {
    language: 'German', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Das neue Gesetz ___ nächste Woche verabschiedet werden.',
    options: [{ label: 'soll', value: 'soll' }, { label: 'solle', value: 'solle' }, { label: 'sollte', value: 'sollte' }, { label: 'sollen', value: 'sollen' }],
    correctAnswer: 'soll', points: 2, orderIndex: 73, tags: ['Passiv', 'Modalverb']
  },
  {
    language: 'German', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Die Studenten, ___ Arbeit gelobt wurde, erhielten einen Preis.',
    options: [{ label: 'deren', value: 'deren' }, { label: 'denen', value: 'denen' }, { label: 'die', value: 'die' }, { label: 'dessen', value: 'dessen' }],
    correctAnswer: 'deren', points: 2, orderIndex: 74, tags: ['Relativsatz', 'Genitiv']
  },
  {
    language: 'German', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Wäre ich früher aufgestanden, ___ ich den Zug nicht verpasst.',
    options: [{ label: 'habe', value: 'habe' }, { label: 'hätte', value: 'hätte' }, { label: 'hatte', value: 'hatte' }, { label: 'werde', value: 'werde' }],
    correctAnswer: 'hätte', points: 2, orderIndex: 75, tags: ['Konjunktiv II', 'Vergangenheit']
  },
  {
    language: 'German', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Je länger man wartet, ___ schwieriger wird es.',
    options: [{ label: 'umso', value: 'umso' }, { label: 'so', value: 'so' }, { label: 'als', value: 'als' }, { label: 'wie', value: 'wie' }],
    correctAnswer: 'umso', points: 2, orderIndex: 76, tags: ['je...desto/umso', 'Komparativ']
  },
  {
    language: 'German', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Der Vertrag, ___ gestern unterschrieben wurde, tritt sofort in Kraft.',
    options: [{ label: 'der', value: 'der' }, { label: 'den', value: 'den' }, { label: 'dem', value: 'dem' }, { label: 'dessen', value: 'dessen' }],
    correctAnswer: 'der', points: 2, orderIndex: 77, tags: ['Relativsatz', 'Nominativ']
  },
  {
    language: 'German', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Die Aufgabe muss bis Freitag ___ werden.',
    options: [{ label: 'erledigen', value: 'erledigen' }, { label: 'erledigt', value: 'erledigt' }, { label: 'erledigte', value: 'erledigte' }, { label: 'erledigend', value: 'erledigend' }],
    correctAnswer: 'erledigt', points: 2, orderIndex: 78, tags: ['Passiv', 'Partizip II']
  },
  {
    language: 'German', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '___ seiner Krankheit ging er zur Arbeit.',
    options: [{ label: 'Wegen', value: 'Wegen' }, { label: 'Trotz', value: 'Trotz' }, { label: 'Während', value: 'Während' }, { label: 'Aufgrund', value: 'Aufgrund' }],
    correctAnswer: 'Trotz', points: 2, orderIndex: 79, tags: ['Präposition', 'Genitiv']
  },
  {
    language: 'German', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Er hat das Buch gelesen, ___ er sich besser vorbereiten konnte.',
    options: [{ label: 'damit', value: 'damit' }, { label: 'sodass', value: 'sodass' }, { label: 'obwohl', value: 'obwohl' }, { label: 'weil', value: 'weil' }],
    correctAnswer: 'sodass', points: 2, orderIndex: 80, tags: ['Konsekutivsatz', 'Nebensatz']
  },

  // --- C1 (81–90) ---
  {
    language: 'German', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Die Sprecherin betonte, sie ___ den Vorschlag bereits geprüft.',
    options: [{ label: 'hat', value: 'hat' }, { label: 'habe', value: 'habe' }, { label: 'hätte', value: 'hätte' }, { label: 'hatte', value: 'hatte' }],
    correctAnswer: 'habe', points: 2, orderIndex: 81, tags: ['Konjunktiv I', 'indirekte Rede']
  },
  {
    language: 'German', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Die in der Studie ___ Ergebnisse bestätigen die Hypothese.',
    options: [{ label: 'dargestellten', value: 'dargestellten' }, { label: 'darstellenden', value: 'darstellenden' }, { label: 'dargestellt', value: 'dargestellt' }, { label: 'darstellen', value: 'darstellen' }],
    correctAnswer: 'dargestellten', points: 2, orderIndex: 82, tags: ['erweitertes Attribut', 'Partizip II']
  },
  {
    language: 'German', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '___ der steigenden Kosten beschloss man, das Projekt fortzusetzen.',
    options: [{ label: 'Wegen', value: 'Wegen' }, { label: 'Ungeachtet', value: 'Ungeachtet' }, { label: 'Aufgrund', value: 'Aufgrund' }, { label: 'Infolge', value: 'Infolge' }],
    correctAnswer: 'Ungeachtet', points: 2, orderIndex: 83, tags: ['Präposition', 'Genitiv', 'konzessiv']
  },
  {
    language: 'German', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Es wäre besser gewesen, wenn er die Wahrheit ___ hätte.',
    options: [{ label: 'sagt', value: 'sagt' }, { label: 'gesagt', value: 'gesagt' }, { label: 'sagte', value: 'sagte' }, { label: 'sage', value: 'sage' }],
    correctAnswer: 'gesagt', points: 2, orderIndex: 84, tags: ['Konjunktiv II', 'Vergangenheit']
  },
  {
    language: 'German', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Die Entscheidung ist ___ getroffen worden, als wir erwartet hatten.',
    options: [{ label: 'schnell', value: 'schnell' }, { label: 'schneller', value: 'schneller' }, { label: 'am schnellsten', value: 'am schnellsten' }, { label: 'schnelle', value: 'schnelle' }],
    correctAnswer: 'schneller', points: 2, orderIndex: 85, tags: ['Komparativ', 'Passiv']
  },
  {
    language: 'German', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Der Zeuge sagte aus, der Angeklagte ___ zum Tatzeitpunkt nicht anwesend gewesen.',
    options: [{ label: 'ist', value: 'ist' }, { label: 'sei', value: 'sei' }, { label: 'war', value: 'war' }, { label: 'wäre', value: 'wäre' }],
    correctAnswer: 'sei', points: 2, orderIndex: 86, tags: ['Konjunktiv I', 'indirekte Rede']
  },
  {
    language: 'German', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Die noch ___ Probleme müssen schnellstmöglich gelöst werden.',
    options: [{ label: 'bestehende', value: 'bestehende' }, { label: 'bestandene', value: 'bestandene' }, { label: 'bestehend', value: 'bestehend' }, { label: 'bestanden', value: 'bestanden' }],
    correctAnswer: 'bestehende', points: 2, orderIndex: 87, tags: ['Partizip I', 'erweitertes Attribut']
  },
  {
    language: 'German', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '___ man dieses Problem nachhaltig lösen will, muss man die Ursachen analysieren.',
    options: [{ label: 'Wenn', value: 'Wenn' }, { label: 'Insofern', value: 'Insofern' }, { label: 'Sofern', value: 'Sofern' }, { label: 'Falls', value: 'Falls' }],
    correctAnswer: 'Sofern', points: 2, orderIndex: 88, tags: ['komplexe Nebensätze', 'Konditional']
  },
  {
    language: 'German', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Hätte er sich rechtzeitig beworben, ___ er die Stelle bekommen.',
    options: [{ label: 'wird', value: 'wird' }, { label: 'hätte', value: 'hätte' }, { label: 'hat', value: 'hat' }, { label: 'wäre', value: 'wäre' }],
    correctAnswer: 'hätte', points: 2, orderIndex: 89, tags: ['Konjunktiv II', 'irrealer Konditionalsatz']
  },
  {
    language: 'German', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Die Daten werden analysiert, ___ fundierte Entscheidungen getroffen werden können.',
    options: [{ label: 'sodass', value: 'sodass' }, { label: 'damit', value: 'damit' }, { label: 'weil', value: 'weil' }, { label: 'obwohl', value: 'obwohl' }],
    correctAnswer: 'damit', points: 2, orderIndex: 90, tags: ['Finalsatz', 'Nebensatz']
  },

  // --- C2 (91–100) ---
  {
    language: 'German', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Der Redner stellte die These auf, das Phänomen ___ sich nicht allein ökonomisch erklären.',
    options: [{ label: 'lässt', value: 'lässt' }, { label: 'lasse', value: 'lasse' }, { label: 'ließe', value: 'ließe' }, { label: 'lassen', value: 'lassen' }],
    correctAnswer: 'lasse', points: 2, orderIndex: 91, tags: ['Konjunktiv I', 'indirekte Rede']
  },
  {
    language: 'German', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Die der Kommission ___ Unterlagen enthielten gravierende Fehler.',
    options: [{ label: 'vorgelegten', value: 'vorgelegten' }, { label: 'vorlegenden', value: 'vorlegenden' }, { label: 'vorgelegt', value: 'vorgelegt' }, { label: 'vorlegen', value: 'vorlegen' }],
    correctAnswer: 'vorgelegten', points: 2, orderIndex: 92, tags: ['erweitertes Attribut', 'Partizip II']
  },
  {
    language: 'German', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Sei es durch Verhandlung, ___ es durch Kompromiss — eine Lösung muss gefunden werden.',
    options: [{ label: 'oder', value: 'oder' }, { label: 'sei', value: 'sei' }, { label: 'ob', value: 'ob' }, { label: 'und', value: 'und' }],
    correctAnswer: 'sei', points: 2, orderIndex: 93, tags: ['Konjunktiv I', 'konzessive Formel']
  },
  {
    language: 'German', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '___ der Tatsache, dass die Beweise erdrückend waren, plädierte er auf nicht schuldig.',
    options: [{ label: 'Trotz', value: 'Trotz' }, { label: 'Unbeschadet', value: 'Unbeschadet' }, { label: 'Wegen', value: 'Wegen' }, { label: 'Infolge', value: 'Infolge' }],
    correctAnswer: 'Unbeschadet', points: 2, orderIndex: 94, tags: ['Präposition', 'Genitiv', 'gehobener Stil']
  },
  {
    language: 'German', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Die Hypothese, ___ zufolge Sprache das Denken determiniert, gilt als widerlegt.',
    options: [{ label: 'der', value: 'der' }, { label: 'derer', value: 'derer' }, { label: 'deren', value: 'deren' }, { label: 'die', value: 'die' }],
    correctAnswer: 'der', points: 2, orderIndex: 95, tags: ['Relativsatz', 'Dativ', 'Postposition']
  },
  {
    language: 'German', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Es ___ denn, dass er seine Meinung noch ändert, wird der Antrag abgelehnt.',
    options: [{ label: 'ist', value: 'ist' }, { label: 'sei', value: 'sei' }, { label: 'wäre', value: 'wäre' }, { label: 'war', value: 'war' }],
    correctAnswer: 'sei', points: 2, orderIndex: 96, tags: ['Konjunktiv I', 'es sei denn']
  },
  {
    language: 'German', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Der sich über Jahrzehnte ___ Wandel der Gesellschaft ist kaum umkehrbar.',
    options: [{ label: 'vollziehende', value: 'vollziehende' }, { label: 'vollzogene', value: 'vollzogene' }, { label: 'vollzogen', value: 'vollzogen' }, { label: 'vollziehen', value: 'vollziehen' }],
    correctAnswer: 'vollziehende', points: 2, orderIndex: 97, tags: ['Partizip I', 'erweitertes Attribut']
  },
  {
    language: 'German', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Man ___ meinen, die Probleme hätten sich von selbst gelöst.',
    options: [{ label: 'könnte', value: 'könnte' }, { label: 'kann', value: 'kann' }, { label: 'konnte', value: 'konnte' }, { label: 'können', value: 'können' }],
    correctAnswer: 'könnte', points: 2, orderIndex: 98, tags: ['Konjunktiv II', 'modale Verwendung']
  },
  {
    language: 'German', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: 'Die Maßnahmen ___ als unzureichend angesehen worden, hätte man die Lage richtig eingeschätzt.',
    options: [{ label: 'wären', value: 'wären' }, { label: 'würden', value: 'würden' }, { label: 'sind', value: 'sind' }, { label: 'waren', value: 'waren' }],
    correctAnswer: 'wären', points: 2, orderIndex: 99, tags: ['Konjunktiv II', 'Passiv', 'Vergangenheit']
  },
  {
    language: 'German', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'GRAMMAR',
    questionText: '___ dem auch sei — die Diskussion ist hiermit beendet.',
    options: [{ label: 'Was', value: 'Was' }, { label: 'Wie', value: 'Wie' }, { label: 'Wem', value: 'Wem' }, { label: 'Wo', value: 'Wo' }],
    correctAnswer: 'Wie', points: 2, orderIndex: 100, tags: ['Konjunktiv I', 'konzessive Formel']
  },
]
