import { MultiSkillQuestionData } from '../types'

// German Listening Questions — ~7 per CEFR level + 30 additional (~72 total)
// Types: LISTENING (multiple choice after audio), DICTATION
// Each question includes ttsScript for TTS generation

export const germanListeningQuestions: MultiSkillQuestionData[] = [
  // ============================================================
  // A1 — Beginner (7 questions)
  // ============================================================
  {
    language: 'German', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Hallo. Ich heiße Stefan. Ich komme aus Deutschland. Ich bin fünfundzwanzig Jahre alt. Ich mag Fußball.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Woher kommt Stefan?',
    options: [{ label: 'Frankreich', value: 'Frankreich' }, { label: 'Deutschland', value: 'Deutschland' }, { label: 'Österreich', value: 'Österreich' }, { label: 'Schweiz', value: 'Schweiz' }],
    correctAnswer: 'Deutschland', points: 1, orderIndex: 1, tags: ['Vorstellung'], timeSuggested: 30
  },
  {
    language: 'German', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Hallo. Ich heiße Stefan. Ich komme aus Deutschland. Ich bin fünfundzwanzig Jahre alt. Ich mag Fußball.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Wie alt ist Stefan?',
    options: [{ label: '20', value: '20' }, { label: '25', value: '25' }, { label: '30', value: '30' }, { label: '35', value: '35' }],
    correctAnswer: '25', points: 1, orderIndex: 2, tags: ['Vorstellung', 'Zahlen'], timeSuggested: 30
  },
  {
    language: 'German', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Entschuldigung, wo ist die Apotheke? Gehen Sie geradeaus, dann biegen Sie rechts ab. Die Apotheke ist neben dem Supermarkt.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Wo ist die Apotheke?',
    options: [{ label: 'Neben der Schule', value: 'neben der Schule' }, { label: 'Neben dem Supermarkt', value: 'neben dem Supermarkt' }, { label: 'Neben dem Park', value: 'neben dem Park' }, { label: 'Neben dem Krankenhaus', value: 'neben dem Krankenhaus' }],
    correctAnswer: 'neben dem Supermarkt', points: 1, orderIndex: 3, tags: ['Wegbeschreibung'], timeSuggested: 30
  },
  {
    language: 'German', cefrLevel: 'A1', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'Ich esse gern Pizza.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Schreiben Sie genau, was Sie hören.',
    correctAnswer: 'Ich esse gern Pizza.', points: 1, orderIndex: 4, tags: ['Diktat'], timeSuggested: 30
  },
  {
    language: 'German', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Heute ist Montag. Morgen ist Dienstag. Ich habe am Mittwoch Deutschunterricht.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Wann hat die Person Deutschunterricht?',
    options: [{ label: 'Montag', value: 'Montag' }, { label: 'Dienstag', value: 'Dienstag' }, { label: 'Mittwoch', value: 'Mittwoch' }, { label: 'Donnerstag', value: 'Donnerstag' }],
    correctAnswer: 'Mittwoch', points: 1, orderIndex: 5, tags: ['Wochentage'], timeSuggested: 30
  },
  {
    language: 'German', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Kann ich bitte einen Kaffee haben? Natürlich. Das macht zwei Euro fünfzig.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Wie viel kostet der Kaffee?',
    options: [{ label: '1,50 Euro', value: '1,50' }, { label: '2,00 Euro', value: '2,00' }, { label: '2,50 Euro', value: '2,50' }, { label: '3,00 Euro', value: '3,00' }],
    correctAnswer: '2,50', points: 1, orderIndex: 6, tags: ['Einkaufen', 'Zahlen'], timeSuggested: 30
  },
  {
    language: 'German', cefrLevel: 'A1', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'Die Katze liegt auf dem Tisch.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Schreiben Sie genau, was Sie hören.',
    correctAnswer: 'Die Katze liegt auf dem Tisch.', points: 1, orderIndex: 7, tags: ['Diktat'], timeSuggested: 30
  },

  // ============================================================
  // A2 — Elementary (7 questions)
  // ============================================================
  {
    language: 'German', cefrLevel: 'A2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Gestern Abend war ich mit meiner Schwester im Kino. Wir haben eine Komödie gesehen. Es war sehr lustig. Nach dem Film haben wir in einem italienischen Restaurant zu Abend gegessen.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Was für einen Film haben sie gesehen?',
    options: [{ label: 'Actionfilm', value: 'Actionfilm' }, { label: 'Komödie', value: 'Komödie' }, { label: 'Horrorfilm', value: 'Horrorfilm' }, { label: 'Drama', value: 'Drama' }],
    correctAnswer: 'Komödie', points: 1, orderIndex: 8, tags: ['Unterhaltung'], timeSuggested: 40
  },
  {
    language: 'German', cefrLevel: 'A2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Gestern Abend war ich mit meiner Schwester im Kino. Wir haben eine Komödie gesehen. Es war sehr lustig. Nach dem Film haben wir in einem italienischen Restaurant zu Abend gegessen.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Mit wem war die Person im Kino?',
    options: [{ label: 'Mit einem Freund', value: 'mit einem Freund' }, { label: 'Mit ihrer Schwester', value: 'mit ihrer Schwester' }, { label: 'Mit ihrer Mutter', value: 'mit ihrer Mutter' }, { label: 'Allein', value: 'allein' }],
    correctAnswer: 'mit ihrer Schwester', points: 1, orderIndex: 9, tags: ['Unterhaltung'], timeSuggested: 40
  },
  {
    language: 'German', cefrLevel: 'A2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Der Zug nach Hamburg fährt von Gleis drei um neun Uhr fünfzehn ab. Bitte halten Sie Ihre Fahrkarten bereit.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Von welchem Gleis fährt der Zug ab?',
    options: [{ label: 'Gleis 1', value: '1' }, { label: 'Gleis 2', value: '2' }, { label: 'Gleis 3', value: '3' }, { label: 'Gleis 4', value: '4' }],
    correctAnswer: '3', points: 1, orderIndex: 10, tags: ['Verkehr'], timeSuggested: 40
  },
  {
    language: 'German', cefrLevel: 'A2', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'Sie fährt jeden Morgen mit dem Bus zur Arbeit.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Schreiben Sie genau, was Sie hören.',
    correctAnswer: 'Sie fährt jeden Morgen mit dem Bus zur Arbeit.', points: 1, orderIndex: 11, tags: ['Diktat'], timeSuggested: 40
  },
  {
    language: 'German', cefrLevel: 'A2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Willkommen im Museum. Es ist von neun Uhr morgens bis fünf Uhr nachmittags geöffnet. Die Eintrittskarten kosten acht Euro für Erwachsene und vier Euro für Kinder. Im zweiten Stock gibt es ein Café.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Wie viel kostet eine Karte für einen Erwachsenen?',
    options: [{ label: '4 Euro', value: '4' }, { label: '6 Euro', value: '6' }, { label: '8 Euro', value: '8' }, { label: '10 Euro', value: '10' }],
    correctAnswer: '8', points: 1, orderIndex: 12, tags: ['Tourismus'], timeSuggested: 40
  },
  {
    language: 'German', cefrLevel: 'A2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Ich stehe normalerweise um sieben Uhr auf. Zuerst dusche ich und ziehe mich an. Dann frühstücke ich — meistens Brot mit Marmelade und Kaffee. Um halb neun verlasse ich das Haus.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Was frühstückt die Person normalerweise?',
    options: [{ label: 'Müsli und Milch', value: 'Müsli' }, { label: 'Brot mit Marmelade und Kaffee', value: 'Brot mit Marmelade und Kaffee' }, { label: 'Eier und Saft', value: 'Eier' }, { label: 'Nichts', value: 'nichts' }],
    correctAnswer: 'Brot mit Marmelade und Kaffee', points: 1, orderIndex: 13, tags: ['Tagesablauf'], timeSuggested: 40
  },
  {
    language: 'German', cefrLevel: 'A2', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'Wir hatten letztes Jahr einen wunderbaren Urlaub in Italien.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Schreiben Sie genau, was Sie hören.',
    correctAnswer: 'Wir hatten letztes Jahr einen wunderbaren Urlaub in Italien.', points: 1, orderIndex: 14, tags: ['Diktat'], timeSuggested: 40
  },

  // ============================================================
  // B1 — Intermediate (7 questions)
  // ============================================================
  {
    language: 'German', cefrLevel: 'B1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Guten Morgen. Ich möchte bitte einen Termin bei Doktor Müller vereinbaren. Ich habe seit ungefähr einer Woche Kopfschmerzen. Der früheste verfügbare Termin ist nächsten Donnerstag um vierzehn Uhr dreißig. Würde Ihnen das passen?',
    ttsLanguageCode: 'de-DE',
    questionText: 'Warum ruft die Person an?',
    options: [
      { label: 'Um einen Termin abzusagen', value: 'absagen' },
      { label: 'Um einen Arzttermin zu vereinbaren', value: 'Termin vereinbaren' },
      { label: 'Um nach Medikamenten zu fragen', value: 'Medikamente' },
      { label: 'Um sich über den Service zu beschweren', value: 'beschweren' }
    ],
    correctAnswer: 'Termin vereinbaren', points: 2, orderIndex: 15, tags: ['Gesundheit', 'Termine'], timeSuggested: 45
  },
  {
    language: 'German', cefrLevel: 'B1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Guten Morgen. Ich möchte bitte einen Termin bei Doktor Müller vereinbaren. Ich habe seit ungefähr einer Woche Kopfschmerzen. Der früheste verfügbare Termin ist nächsten Donnerstag um vierzehn Uhr dreißig.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Wann ist der früheste verfügbare Termin?',
    options: [
      { label: 'Montag um 14:00', value: 'Montag 14:00' },
      { label: 'Mittwoch um 15:00', value: 'Mittwoch 15:00' },
      { label: 'Donnerstag um 14:30', value: 'Donnerstag 14:30' },
      { label: 'Freitag um 10:00', value: 'Freitag 10:00' }
    ],
    correctAnswer: 'Donnerstag 14:30', points: 2, orderIndex: 16, tags: ['Termine'], timeSuggested: 45
  },
  {
    language: 'German', cefrLevel: 'B1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Laut einer aktuellen Umfrage überprüfen siebzig Prozent der jungen Menschen zwischen achtzehn und fünfundzwanzig ihr Smartphone innerhalb der ersten zehn Minuten nach dem Aufwachen. Experten warnen, dass diese Gewohnheit den Stresslevel erhöhen und die Produktivität im Laufe des Tages verringern kann.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Wie viel Prozent der jungen Leute überprüfen ihr Handy kurz nach dem Aufwachen?',
    options: [{ label: '50%', value: '50' }, { label: '60%', value: '60' }, { label: '70%', value: '70' }, { label: '80%', value: '80' }],
    correctAnswer: '70', points: 2, orderIndex: 17, tags: ['Technologie', 'Gesundheit'], timeSuggested: 45
  },
  {
    language: 'German', cefrLevel: 'B1', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'Das Unternehmen hat beschlossen, ab nächstem Monat flexible Arbeitszeiten für alle Mitarbeiter einzuführen.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Schreiben Sie genau, was Sie hören.',
    correctAnswer: 'Das Unternehmen hat beschlossen, ab nächstem Monat flexible Arbeitszeiten für alle Mitarbeiter einzuführen.', points: 2, orderIndex: 18, tags: ['Diktat', 'Arbeit'], timeSuggested: 60
  },
  {
    language: 'German', cefrLevel: 'B1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Achtung, Fluggäste. Der Flug um zwölf Uhr fünfzehn nach Barcelona hat eine Verspätung von ungefähr fünfundvierzig Minuten wegen schlechten Wetters. Wir entschuldigen uns für die Unannehmlichkeiten. Bitte überprüfen Sie die Anzeigetafel für Aktualisierungen.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Warum hat der Flug Verspätung?',
    options: [
      { label: 'Technische Probleme', value: 'technisch' },
      { label: 'Schlechtes Wetter', value: 'schlechtes Wetter' },
      { label: 'Personalmangel', value: 'Personal' },
      { label: 'Sicherheitskontrolle', value: 'Sicherheit' }
    ],
    correctAnswer: 'schlechtes Wetter', points: 2, orderIndex: 19, tags: ['Reisen'], timeSuggested: 45
  },
  {
    language: 'German', cefrLevel: 'B1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Das neue Gemeindezentrum wird im März eröffnet. Es wird ein Schwimmbad, ein Fitnessstudio und mehrere Besprechungsräume haben. Die Mitgliedschaft kostet dreißig Euro pro Monat für Erwachsene. Es gibt Ermäßigungen für Studenten und Senioren.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Wer kann Ermäßigungen auf die Mitgliedschaft bekommen?',
    options: [
      { label: 'Kinder und Lehrer', value: 'Kinder und Lehrer' },
      { label: 'Studenten und Senioren', value: 'Studenten und Senioren' },
      { label: 'Familien und Paare', value: 'Familien' },
      { label: 'Alle', value: 'alle' }
    ],
    correctAnswer: 'Studenten und Senioren', points: 2, orderIndex: 20, tags: ['Gemeinschaft'], timeSuggested: 45
  },
  {
    language: 'German', cefrLevel: 'B1', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'Obwohl das Wetter schrecklich war, konnten wir unseren Tag am Strand trotzdem genießen.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Schreiben Sie genau, was Sie hören.',
    correctAnswer: 'Obwohl das Wetter schrecklich war, konnten wir unseren Tag am Strand trotzdem genießen.', points: 2, orderIndex: 21, tags: ['Diktat'], timeSuggested: 60
  },

  // ============================================================
  // B2 — Upper Intermediate (7 questions)
  // ============================================================
  {
    language: 'German', cefrLevel: 'B2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Das Forschungsteam der Universität Heidelberg hat Ergebnisse veröffentlicht, die darauf hindeuten, dass regelmäßige Meditation die Struktur des Gehirns physisch verändern kann. Teilnehmer, die acht Wochen lang täglich dreißig Minuten meditierten, zeigten eine erhöhte Dichte der grauen Substanz in Bereichen, die mit Gedächtnis und emotionaler Regulation verbunden sind, während Bereiche, die mit Stress zusammenhängen, eine Abnahme der Dichte zeigten.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Was passierte mit den stressbezogenen Gehirnbereichen?',
    options: [
      { label: 'Sie wurden größer', value: 'größer' },
      { label: 'Sie zeigten eine verringerte Dichte', value: 'verringerte Dichte' },
      { label: 'Sie blieben unverändert', value: 'unverändert' },
      { label: 'Sie verbesserten ihre Funktion', value: 'verbessert' }
    ],
    correctAnswer: 'verringerte Dichte', points: 2, orderIndex: 22, tags: ['Wissenschaft', 'Gesundheit'], timeSuggested: 60
  },
  {
    language: 'German', cefrLevel: 'B2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Das Forschungsteam der Universität Heidelberg hat Ergebnisse veröffentlicht, die darauf hindeuten, dass regelmäßige Meditation die Struktur des Gehirns physisch verändern kann. Teilnehmer, die acht Wochen lang täglich dreißig Minuten meditierten, zeigten eine erhöhte Dichte der grauen Substanz.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Wie lange meditierten die Teilnehmer täglich?',
    options: [{ label: '10 Minuten', value: '10' }, { label: '20 Minuten', value: '20' }, { label: '30 Minuten', value: '30' }, { label: '60 Minuten', value: '60' }],
    correctAnswer: '30', points: 2, orderIndex: 23, tags: ['Wissenschaft'], timeSuggested: 60
  },
  {
    language: 'German', cefrLevel: 'B2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Viele Menschen nehmen an, dass Multitasking sie produktiver macht, aber neurowissenschaftliche Forschung erzählt eine andere Geschichte. Wenn wir zwischen Aufgaben wechseln, braucht unser Gehirn Zeit, sich neu zu orientieren, was die Effizienz tatsächlich verringert. Studien legen nahe, dass das, was wir Multitasking nennen, in Wirklichkeit schnelles Aufgabenwechseln ist, und es kann die Produktivität um bis zu vierzig Prozent reduzieren.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Laut dem Text kann Multitasking die Produktivität um bis zu wie viel Prozent reduzieren?',
    options: [{ label: '10%', value: '10' }, { label: '20%', value: '20' }, { label: '30%', value: '30' }, { label: '40%', value: '40' }],
    correctAnswer: '40', points: 2, orderIndex: 24, tags: ['Produktivität'], timeSuggested: 60
  },
  {
    language: 'German', cefrLevel: 'B2', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'Trotz des wirtschaftlichen Abschwungs gelang es dem Unternehmen, seine Gewinne durch Diversifizierung seines Produktangebots und Expansion in neue Märkte zu steigern.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Schreiben Sie genau, was Sie hören.',
    correctAnswer: 'Trotz des wirtschaftlichen Abschwungs gelang es dem Unternehmen, seine Gewinne durch Diversifizierung seines Produktangebots und Expansion in neue Märkte zu steigern.', points: 2, orderIndex: 25, tags: ['Diktat', 'Wirtschaft'], timeSuggested: 90
  },
  {
    language: 'German', cefrLevel: 'B2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Der Stadtrat hat Pläne angekündigt, die verlassene Fabrik am Flussufer in eine gemischt genutzte Siedlung umzuwandeln. Das Projekt wird bezahlbaren Wohnraum, Einzelhandelsflächen und einen öffentlichen Park umfassen. Der Baubeginn ist für das Frühjahr geplant und soll innerhalb von zwei Jahren abgeschlossen sein. Die Anwohner haben gemischte Gefühle geäußert — einige begrüßen die Entwicklung, während andere über erhöhten Verkehr und Lärm besorgt sind.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Welche Bedenken haben einige Anwohner?',
    options: [
      { label: 'Höhere Steuern', value: 'Steuern' },
      { label: 'Mehr Verkehr und Lärm', value: 'Verkehr und Lärm' },
      { label: 'Verlust von Grünflächen', value: 'Grünflächen' },
      { label: 'Kriminalität', value: 'Kriminalität' }
    ],
    correctAnswer: 'Verkehr und Lärm', points: 2, orderIndex: 26, tags: ['Gemeinschaft', 'Stadt'], timeSuggested: 60
  },
  {
    language: 'German', cefrLevel: 'B2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Das Konzept des bedingungslosen Grundeinkommens hat in den letzten Jahren an Bedeutung gewonnen, insbesondere nach den wirtschaftlichen Verwerfungen durch die Automatisierung. Befürworter argumentieren, dass ein garantiertes Mindesteinkommen für jeden Bürger die Armut verringern und den Menschen die Freiheit geben würde, sich weiterzubilden oder ein Unternehmen zu gründen. Skeptiker sorgen sich um die Kosten und mögliche Auswirkungen auf die Arbeitsmotivation.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Welche Bedenken haben Skeptiker zum bedingungslosen Grundeinkommen?',
    options: [
      { label: 'Es wäre zu kompliziert zu verwalten', value: 'kompliziert' },
      { label: 'Die Kosten und mögliche Auswirkungen auf die Arbeitsmotivation', value: 'Kosten und Arbeitsmotivation' },
      { label: 'Es würde die Ungleichheit erhöhen', value: 'Ungleichheit' },
      { label: 'Es würde die Bildungsstandards senken', value: 'Bildung' }
    ],
    correctAnswer: 'Kosten und Arbeitsmotivation', points: 2, orderIndex: 27, tags: ['Wirtschaft', 'Politik'], timeSuggested: 60
  },
  {
    language: 'German', cefrLevel: 'B2', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'Die Regierung hat zugesagt, in den nächsten zehn Jahren massiv in die Infrastruktur für erneuerbare Energien zu investieren.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Schreiben Sie genau, was Sie hören.',
    correctAnswer: 'Die Regierung hat zugesagt, in den nächsten zehn Jahren massiv in die Infrastruktur für erneuerbare Energien zu investieren.', points: 2, orderIndex: 28, tags: ['Diktat', 'Politik'], timeSuggested: 90
  },

  // ============================================================
  // C1 — Advanced (7 questions)
  // ============================================================
  {
    language: 'German', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Das Phänomen der kognitiven Dissonanz, erstmals von Leon Festinger im Jahr neunzehnhundertsiebenundfünfzig beschrieben, tritt auf, wenn Individuen gleichzeitig zwei widersprüchliche Überzeugungen haben. Anstatt das Unbehagen zu ertragen, neigen Menschen dazu, eine der Überzeugungen zu modifizieren oder die Inkonsistenz zu rationalisieren. Dies hat erhebliche Auswirkungen auf das Verständnis politischer Polarisierung, da Individuen glaubwürdige Beweise ablehnen können, die ihrer bestehenden Weltanschauung widersprechen.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Wie reagieren Menschen typischerweise auf kognitive Dissonanz?',
    options: [
      { label: 'Sie akzeptieren beide widersprüchlichen Überzeugungen', value: 'beide akzeptieren' },
      { label: 'Sie modifizieren eine Überzeugung oder rationalisieren die Inkonsistenz', value: 'modifizieren oder rationalisieren' },
      { label: 'Sie suchen professionelle Hilfe', value: 'Hilfe suchen' },
      { label: 'Sie ignorieren beide Überzeugungen', value: 'beide ignorieren' }
    ],
    correctAnswer: 'modifizieren oder rationalisieren', points: 3, orderIndex: 29, tags: ['Psychologie'], timeSuggested: 75
  },
  {
    language: 'German', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Längsschnittstudien, die Kinder von der frühen Kindheit bis zum Erwachsenenalter begleiten, haben durchweg gezeigt, dass der sozioökonomische Status bei der Geburt einer der stärksten Prädiktoren für den Bildungsabschluss und das Lebenseinkommen ist. Allerdings haben Interventionen wie hochwertige frühkindliche Bildung und Mentoring-Programme vielversprechende Ergebnisse bei der Verringerung dieser Ungleichheiten gezeigt, insbesondere wenn sie vor dem fünften Lebensjahr umgesetzt werden.',
    ttsLanguageCode: 'de-DE',
    questionText: 'In welchem Alter sind Interventionen laut der Forschung am wirksamsten?',
    options: [
      { label: 'Vor dem fünften Lebensjahr', value: 'vor 5' },
      { label: 'Zwischen 5 und 10 Jahren', value: '5 bis 10' },
      { label: 'In der Jugend', value: 'Jugend' },
      { label: 'Im frühen Erwachsenenalter', value: 'frühes Erwachsenenalter' }
    ],
    correctAnswer: 'vor 5', points: 3, orderIndex: 30, tags: ['Bildung', 'Soziologie'], timeSuggested: 75
  },
  {
    language: 'German', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Die Replikationskrise in der Psychologie bezieht sich auf die Entdeckung, dass viele veröffentlichte Befunde in diesem Fach von unabhängigen Forschern nicht repliziert werden können. Eine wegweisende Studie im Jahr zweitausendfünfzehn versuchte, einhundert psychologische Experimente zu reproduzieren, und stellte fest, dass nur neununddreißig Prozent die gleichen Ergebnisse erbrachten. Dies hat zu Forderungen nach größerer methodischer Strenge, Vorregistrierung von Studien und offenem Datenaustausch geführt.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Wie viel Prozent der psychologischen Experimente konnten erfolgreich repliziert werden?',
    options: [{ label: '25%', value: '25' }, { label: '39%', value: '39' }, { label: '50%', value: '50' }, { label: '65%', value: '65' }],
    correctAnswer: '39', points: 3, orderIndex: 31, tags: ['Wissenschaft', 'Forschung'], timeSuggested: 75
  },
  {
    language: 'German', cefrLevel: 'C1', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'Das beispiellose Tempo des technologischen Wandels hat die Natur der Arbeit grundlegend verändert und erfordert kontinuierliche Anpassung und lebenslanges Lernen.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Schreiben Sie genau, was Sie hören.',
    correctAnswer: 'Das beispiellose Tempo des technologischen Wandels hat die Natur der Arbeit grundlegend verändert und erfordert kontinuierliche Anpassung und lebenslanges Lernen.', points: 3, orderIndex: 32, tags: ['Diktat'], timeSuggested: 90
  },
  {
    language: 'German', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Das Konzept der Neuroplastizität — die Fähigkeit des Gehirns, sich durch die Bildung neuer neuronaler Verbindungen selbst zu reorganisieren — hat unser Verständnis der kognitiven Rehabilitation revolutioniert. Patienten, die einen Schlaganfall erlitten haben, können manchmal verlorene Funktionen wiederherstellen, weil gesunde Teile des Gehirns die geschädigten Bereiche kompensieren. Dieser Prozess erfordert jedoch intensive und anhaltende therapeutische Intervention.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Was ist Neuroplastizität?',
    options: [
      { label: 'Die Fähigkeit, mehrere Sprachen zu lernen', value: 'Sprachen' },
      { label: 'Die Fähigkeit des Gehirns, neue neuronale Verbindungen zu bilden', value: 'neue neuronale Verbindungen' },
      { label: 'Eine Art von Gehirnchirurgie', value: 'Chirurgie' },
      { label: 'Gedächtnisverbesserung durch Medikamente', value: 'Medikamente' }
    ],
    correctAnswer: 'neue neuronale Verbindungen', points: 3, orderIndex: 33, tags: ['Wissenschaft'], timeSuggested: 75
  },
  {
    language: 'German', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Das Konzept der Kreislaufwirtschaft stellt einen Paradigmenwechsel gegenüber dem traditionellen linearen Modell von Produktion und Konsum dar. Anstatt einem Nehmen-Herstellen-Entsorgen-Muster zu folgen, zielt die Kreislaufwirtschaft darauf ab, Ressourcen so lange wie möglich in Gebrauch zu halten, den maximalen Wert aus ihnen zu gewinnen und dann Produkte und Materialien am Ende ihrer Nutzungsdauer wiederzugewinnen und zu regenerieren.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Wie wird das traditionelle Wirtschaftsmodell beschrieben?',
    options: [
      { label: 'Kreislaufförmig', value: 'kreislaufförmig' },
      { label: 'Nehmen-Herstellen-Entsorgen', value: 'Nehmen-Herstellen-Entsorgen' },
      { label: 'Nachhaltig', value: 'nachhaltig' },
      { label: 'Regenerativ', value: 'regenerativ' }
    ],
    correctAnswer: 'Nehmen-Herstellen-Entsorgen', points: 3, orderIndex: 34, tags: ['Wirtschaft', 'Umwelt'], timeSuggested: 75
  },
  {
    language: 'German', cefrLevel: 'C1', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'Ungeachtet der beträchtlichen Fortschritte bei den erneuerbaren Energien bleibt der Übergang weg von fossilen Brennstoffen mit wirtschaftlichen und politischen Herausforderungen behaftet.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Schreiben Sie genau, was Sie hören.',
    correctAnswer: 'Ungeachtet der beträchtlichen Fortschritte bei den erneuerbaren Energien bleibt der Übergang weg von fossilen Brennstoffen mit wirtschaftlichen und politischen Herausforderungen behaftet.', points: 3, orderIndex: 35, tags: ['Diktat'], timeSuggested: 90
  },

  // ============================================================
  // C2 — Proficiency (7 questions)
  // ============================================================
  {
    language: 'German', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Die philosophischen Implikationen der Quantenverschränkung sind vielleicht tiefgreifender als ihre physikalischen Eigenschaften. Wenn zwei Teilchen verschränkt werden, bestimmt die Messung des Zustands eines Teilchens augenblicklich den Zustand des anderen, unabhängig von der Entfernung zwischen ihnen. Einstein verspottete dies bekanntlich als „spukhafte Fernwirkung", doch nachfolgende Experimente haben ihre Existenz definitiv bestätigt und stellen unsere grundlegendsten Annahmen über Lokalität und Kausalität infrage.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Wie nannte Einstein die Quantenverschränkung?',
    options: [
      { label: 'Eine schöne Theorie', value: 'schöne Theorie' },
      { label: 'Spukhafte Fernwirkung', value: 'spukhafte Fernwirkung' },
      { label: 'Die Unschärferelation', value: 'Unschärferelation' },
      { label: 'Eine mathematische Kuriosität', value: 'mathematische Kuriosität' }
    ],
    correctAnswer: 'spukhafte Fernwirkung', points: 3, orderIndex: 36, tags: ['Physik'], timeSuggested: 90
  },
  {
    language: 'German', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Die philosophischen Implikationen der Quantenverschränkung sind vielleicht tiefgreifender als ihre physikalischen Eigenschaften. Wenn zwei Teilchen verschränkt werden, bestimmt die Messung des Zustands eines Teilchens augenblicklich den Zustand des anderen. Nachfolgende Experimente haben ihre Existenz definitiv bestätigt und stellen unsere grundlegendsten Annahmen über Lokalität und Kausalität infrage.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Welche grundlegenden Annahmen stellt die Quantenverschränkung infrage?',
    options: [
      { label: 'Gravitation und Magnetismus', value: 'Gravitation und Magnetismus' },
      { label: 'Lokalität und Kausalität', value: 'Lokalität und Kausalität' },
      { label: 'Zeit und Raum', value: 'Zeit und Raum' },
      { label: 'Energie und Materie', value: 'Energie und Materie' }
    ],
    correctAnswer: 'Lokalität und Kausalität', points: 3, orderIndex: 37, tags: ['Physik'], timeSuggested: 90
  },
  {
    language: 'German', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Die Kommodifizierung persönlicher Daten hat eine neue Form des Überwachungskapitalismus hervorgebracht, in der die Extraktion und Monetarisierung von Verhaltensdaten das primäre Erlösmodell vieler Technologieunternehmen darstellt. Shoshana Zuboff argumentiert, dass dies eine beispiellose Asymmetrie von Wissen und Macht darstellt, die grundlegend unvereinbar mit demokratischen Normen ist.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Was erzeugt der Überwachungskapitalismus laut Zuboff?',
    options: [
      { label: 'Gleichen Zugang zu Informationen', value: 'gleicher Zugang' },
      { label: 'Eine beispiellose Asymmetrie von Wissen und Macht', value: 'Asymmetrie von Wissen und Macht' },
      { label: 'Bessere Verbraucherprodukte', value: 'bessere Produkte' },
      { label: 'Effizientere Märkte', value: 'effizientere Märkte' }
    ],
    correctAnswer: 'Asymmetrie von Wissen und Macht', points: 3, orderIndex: 38, tags: ['Technologie', 'Philosophie'], timeSuggested: 90
  },
  {
    language: 'German', cefrLevel: 'C2', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'Die erkenntnistheoretischen Auswirkungen der künstlichen Intelligenz reichen weit über ihre unmittelbaren praktischen Anwendungen hinaus und werfen grundlegende Fragen über das Wesen des Wissens selbst auf.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Schreiben Sie genau, was Sie hören.',
    correctAnswer: 'Die erkenntnistheoretischen Auswirkungen der künstlichen Intelligenz reichen weit über ihre unmittelbaren praktischen Anwendungen hinaus und werfen grundlegende Fragen über das Wesen des Wissens selbst auf.', points: 3, orderIndex: 39, tags: ['Diktat'], timeSuggested: 120
  },
  {
    language: 'German', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Die sogenannte Replikationskrise beschränkt sich nicht auf die Psychologie. Medizin, Wirtschaftswissenschaften und sogar einige Bereiche der Physik sind einer ähnlichen Überprüfung unterzogen worden. Die zugrunde liegenden Ursachen sind vielschichtig: Publikationsbias zugunsten neuartiger und statistisch signifikanter Ergebnisse, unzureichende Stichprobengrößen, Forscherfreiheitsgrade bei der Datenanalyse und perverse Anreizstrukturen innerhalb der Wissenschaft, die Quantität der Veröffentlichungen über Qualität stellen.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Was begünstigt der „Publikationsbias" laut dem Text?',
    options: [
      { label: 'Replizierte Ergebnisse', value: 'repliziert' },
      { label: 'Neuartige und statistisch signifikante Ergebnisse', value: 'neuartig und signifikant' },
      { label: 'Großangelegte Studien', value: 'großangelegte' },
      { label: 'Negative Befunde', value: 'negativ' }
    ],
    correctAnswer: 'neuartig und signifikant', points: 3, orderIndex: 40, tags: ['Wissenschaft', 'Methodik'], timeSuggested: 90
  },
  {
    language: 'German', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Das Konzept der epistemischen Demut, verwurzelt in der sokratischen Philosophie, legt nahe, dass das Eingestehen der Grenzen des eigenen Wissens paradoxerweise eine Voraussetzung für echtes Verständnis ist. In einem Zeitalter der Informationsüberflutung und selbstsicherer Behauptungen in sozialen Medien mag die Pflege solcher Demut wichtiger denn je sein, sowohl für die individuelle Kognition als auch für die kollektive Deliberation.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Worin ist die epistemische Demut verwurzelt?',
    options: [
      { label: 'Moderne Psychologie', value: 'moderne Psychologie' },
      { label: 'Sokratische Philosophie', value: 'sokratische Philosophie' },
      { label: 'Östliche Meditation', value: 'östliche Meditation' },
      { label: 'Wissenschaftliche Methode', value: 'wissenschaftliche Methode' }
    ],
    correctAnswer: 'sokratische Philosophie', points: 3, orderIndex: 41, tags: ['Philosophie'], timeSuggested: 90
  },
  {
    language: 'German', cefrLevel: 'C2', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'Ungeachtet der vermeintlichen Demokratisierung von Informationen durch digitale Technologien bleibt der Zugang zu hochwertigem, verlässlichem Wissen tief entlang sozioökonomischer Linien geschichtet.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Schreiben Sie genau, was Sie hören.',
    correctAnswer: 'Ungeachtet der vermeintlichen Demokratisierung von Informationen durch digitale Technologien bleibt der Zugang zu hochwertigem, verlässlichem Wissen tief entlang sozioökonomischer Linien geschichtet.', points: 3, orderIndex: 42, tags: ['Diktat'], timeSuggested: 120
  },

  // ============================================================
  // NEW QUESTIONS — 30 additional (orderIndex 43–72)
  // 5 per level (A1–C2), ~70% MC + ~30% DICTATION
  // ============================================================

  // --- A1 (43–47) ---
  {
    language: 'German', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Guten Morgen. Ich möchte bitte ein Brötchen und eine Tasse Tee. Das macht drei Euro fünfzig.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Was bestellt die Person?',
    options: [{ label: 'Kaffee und Kuchen', value: 'Kaffee und Kuchen' }, { label: 'Brötchen und Tee', value: 'Brötchen und Tee' }, { label: 'Brot und Milch', value: 'Brot und Milch' }, { label: 'Pizza und Cola', value: 'Pizza und Cola' }],
    correctAnswer: 'Brötchen und Tee', points: 1, orderIndex: 43, tags: ['Einkaufen', 'Essen'], timeSuggested: 30
  },
  {
    language: 'German', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Mein Name ist Anna. Ich wohne in Hamburg. Ich bin Lehrerin. Ich arbeite in einer Schule.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Was ist Anna von Beruf?',
    options: [{ label: 'Ärztin', value: 'Ärztin' }, { label: 'Lehrerin', value: 'Lehrerin' }, { label: 'Verkäuferin', value: 'Verkäuferin' }, { label: 'Köchin', value: 'Köchin' }],
    correctAnswer: 'Lehrerin', points: 1, orderIndex: 44, tags: ['Vorstellung', 'Beruf'], timeSuggested: 30
  },
  {
    language: 'German', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Es ist halb vier. Der Unterricht beginnt um vier Uhr. Wir haben noch dreißig Minuten Zeit.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Wann beginnt der Unterricht?',
    options: [{ label: 'Um drei Uhr', value: 'um drei Uhr' }, { label: 'Um halb vier', value: 'um halb vier' }, { label: 'Um vier Uhr', value: 'um vier Uhr' }, { label: 'Um halb fünf', value: 'um halb fünf' }],
    correctAnswer: 'um vier Uhr', points: 1, orderIndex: 45, tags: ['Uhrzeit'], timeSuggested: 30
  },
  {
    language: 'German', cefrLevel: 'A1', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'Meine Schwester heißt Maria.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Schreiben Sie genau, was Sie hören.',
    correctAnswer: 'Meine Schwester heißt Maria.', points: 1, orderIndex: 46, tags: ['Diktat', 'Familie'], timeSuggested: 30
  },
  {
    language: 'German', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Im Kühlschrank sind Eier, Milch und Käse. Wir brauchen noch Brot und Butter.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Was brauchen sie noch?',
    options: [{ label: 'Eier und Milch', value: 'Eier und Milch' }, { label: 'Käse und Wurst', value: 'Käse und Wurst' }, { label: 'Brot und Butter', value: 'Brot und Butter' }, { label: 'Obst und Gemüse', value: 'Obst und Gemüse' }],
    correctAnswer: 'Brot und Butter', points: 1, orderIndex: 47, tags: ['Einkaufen', 'Essen'], timeSuggested: 30
  },

  // --- A2 (48–52) ---
  {
    language: 'German', cefrLevel: 'A2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Letzten Samstag bin ich mit meiner Familie an den See gefahren. Das Wetter war schön und wir haben ein Picknick gemacht. Mein Bruder ist im See geschwommen. Ich habe lieber ein Buch gelesen.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Was hat der Bruder gemacht?',
    options: [{ label: 'Ein Buch gelesen', value: 'ein Buch gelesen' }, { label: 'Im See geschwommen', value: 'im See geschwommen' }, { label: 'Fußball gespielt', value: 'Fußball gespielt' }, { label: 'Gekocht', value: 'gekocht' }],
    correctAnswer: 'im See geschwommen', points: 1, orderIndex: 48, tags: ['Freizeit', 'Perfekt'], timeSuggested: 40
  },
  {
    language: 'German', cefrLevel: 'A2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Entschuldigung, ich suche die Bibliothek. Gehen Sie hier geradeaus, dann an der Ampel links. Die Bibliothek ist auf der rechten Seite, gegenüber vom Park.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Wo ist die Bibliothek?',
    options: [{ label: 'Neben dem Park', value: 'neben dem Park' }, { label: 'Gegenüber vom Park', value: 'gegenüber vom Park' }, { label: 'Hinter dem Park', value: 'hinter dem Park' }, { label: 'Im Park', value: 'im Park' }],
    correctAnswer: 'gegenüber vom Park', points: 1, orderIndex: 49, tags: ['Wegbeschreibung'], timeSuggested: 40
  },
  {
    language: 'German', cefrLevel: 'A2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Meine Wohnung hat drei Zimmer: ein Schlafzimmer, ein Wohnzimmer und ein Arbeitszimmer. Die Küche ist klein, aber das Bad ist groß. Ich wohne im dritten Stock.',
    ttsLanguageCode: 'de-DE',
    questionText: 'In welchem Stock wohnt die Person?',
    options: [{ label: 'Im ersten Stock', value: 'im ersten Stock' }, { label: 'Im zweiten Stock', value: 'im zweiten Stock' }, { label: 'Im dritten Stock', value: 'im dritten Stock' }, { label: 'Im vierten Stock', value: 'im vierten Stock' }],
    correctAnswer: 'im dritten Stock', points: 1, orderIndex: 50, tags: ['Wohnung'], timeSuggested: 40
  },
  {
    language: 'German', cefrLevel: 'A2', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'Am Wochenende gehen wir oft im Wald spazieren.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Schreiben Sie genau, was Sie hören.',
    correctAnswer: 'Am Wochenende gehen wir oft im Wald spazieren.', points: 1, orderIndex: 51, tags: ['Diktat', 'Freizeit'], timeSuggested: 40
  },
  {
    language: 'German', cefrLevel: 'A2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Ich habe letzte Woche einen Deutschkurs angefangen. Der Kurs ist jeden Dienstag und Donnerstag von achtzehn bis neunzehn Uhr dreißig. Die Lehrerin ist sehr nett und erklärt alles gut.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Wann ist der Deutschkurs?',
    options: [{ label: 'Montag und Mittwoch', value: 'Montag und Mittwoch' }, { label: 'Dienstag und Donnerstag', value: 'Dienstag und Donnerstag' }, { label: 'Mittwoch und Freitag', value: 'Mittwoch und Freitag' }, { label: 'Jeden Tag', value: 'jeden Tag' }],
    correctAnswer: 'Dienstag und Donnerstag', points: 1, orderIndex: 52, tags: ['Bildung', 'Termine'], timeSuggested: 40
  },

  // --- B1 (53–57) ---
  {
    language: 'German', cefrLevel: 'B1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Eine neue Studie der Universität München zeigt, dass Menschen, die regelmäßig Musik hören, weniger unter Stress leiden. Besonders klassische Musik und Naturgeräusche haben einen beruhigenden Effekt. Die Forscher empfehlen, täglich mindestens zwanzig Minuten bewusst Musik zu hören.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Was empfehlen die Forscher?',
    options: [
      { label: 'Täglich Sport treiben', value: 'Sport treiben' },
      { label: 'Täglich mindestens zwanzig Minuten Musik hören', value: 'zwanzig Minuten Musik hören' },
      { label: 'Weniger arbeiten', value: 'weniger arbeiten' },
      { label: 'Mehr schlafen', value: 'mehr schlafen' }
    ],
    correctAnswer: 'zwanzig Minuten Musik hören', points: 1, orderIndex: 53, tags: ['Gesundheit', 'Wissenschaft'], timeSuggested: 45
  },
  {
    language: 'German', cefrLevel: 'B1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Ab nächstem Monat wird die Busfahrkarte teurer. Der Einzelfahrschein kostet dann drei Euro statt zwei Euro fünfzig. Monatskarten steigen von fünfundsechzig auf fünfundsiebzig Euro. Die Verkehrsbetriebe begründen die Erhöhung mit gestiegenen Energiekosten.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Warum werden die Fahrpreise erhöht?',
    options: [
      { label: 'Wegen neuer Busse', value: 'neue Busse' },
      { label: 'Wegen gestiegener Energiekosten', value: 'gestiegene Energiekosten' },
      { label: 'Wegen mehr Fahrgästen', value: 'mehr Fahrgäste' },
      { label: 'Wegen einer neuen Strecke', value: 'neue Strecke' }
    ],
    correctAnswer: 'gestiegene Energiekosten', points: 1, orderIndex: 54, tags: ['Verkehr', 'Wirtschaft'], timeSuggested: 45
  },
  {
    language: 'German', cefrLevel: 'B1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Sehr geehrte Mitarbeiterinnen und Mitarbeiter, wir möchten Sie darauf hinweisen, dass die Kantine ab nächster Woche ein vegetarisches Menü als feste Option anbieten wird. Außerdem werden wir die Öffnungszeiten um eine halbe Stunde verlängern. Die Kantine ist dann bis vierzehn Uhr dreißig geöffnet.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Was ist die neue Änderung in der Kantine?',
    options: [
      { label: 'Sie wird geschlossen', value: 'geschlossen' },
      { label: 'Ein vegetarisches Menü wird angeboten', value: 'vegetarisches Menü' },
      { label: 'Die Preise steigen', value: 'Preise steigen' },
      { label: 'Es gibt nur noch Salate', value: 'nur Salate' }
    ],
    correctAnswer: 'vegetarisches Menü', points: 1, orderIndex: 55, tags: ['Arbeit', 'Essen'], timeSuggested: 45
  },
  {
    language: 'German', cefrLevel: 'B1', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'Seit dem letzten Jahr arbeite ich in einer internationalen Firma und reise oft ins Ausland.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Schreiben Sie genau, was Sie hören.',
    correctAnswer: 'Seit dem letzten Jahr arbeite ich in einer internationalen Firma und reise oft ins Ausland.', points: 1, orderIndex: 56, tags: ['Diktat', 'Arbeit'], timeSuggested: 60
  },
  {
    language: 'German', cefrLevel: 'B1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Das Jugendamt bietet in den Sommerferien ein kostenloses Ferienprogramm für Kinder zwischen sechs und zwölf Jahren an. Auf dem Programm stehen Ausflüge in den Zoo, Bastelworkshops und Sportaktivitäten. Die Anmeldung ist ab dem ersten Mai online möglich.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Für wen ist das Ferienprogramm?',
    options: [
      { label: 'Für Jugendliche ab dreizehn', value: 'Jugendliche ab 13' },
      { label: 'Für Kinder zwischen sechs und zwölf', value: 'Kinder zwischen 6 und 12' },
      { label: 'Für Erwachsene', value: 'Erwachsene' },
      { label: 'Für die ganze Familie', value: 'ganze Familie' }
    ],
    correctAnswer: 'Kinder zwischen 6 und 12', points: 1, orderIndex: 57, tags: ['Kinder', 'Freizeit'], timeSuggested: 45
  },

  // --- B2 (58–62) ---
  {
    language: 'German', cefrLevel: 'B2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Die zunehmende Verbreitung von Homeoffice hat nicht nur die Arbeitswelt verändert, sondern auch den Immobilienmarkt beeinflusst. Immer mehr Menschen ziehen aus den teuren Großstädten in ländlichere Regionen, da der tägliche Weg zur Arbeit entfällt. Dieser Trend hat die Immobilienpreise in Vororten und Kleinstädten deutlich ansteigen lassen, während die Nachfrage nach Büroflächen in den Innenstädten zurückgeht.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Wie hat Homeoffice den Immobilienmarkt beeinflusst?',
    options: [
      { label: 'Preise in Großstädten steigen weiter', value: 'Großstadtpreise steigen' },
      { label: 'Preise in Vororten steigen, Büronachfrage sinkt', value: 'Vorortpreise steigen, Büronachfrage sinkt' },
      { label: 'Alle Preise sinken', value: 'alle Preise sinken' },
      { label: 'Es gibt keinen Einfluss', value: 'kein Einfluss' }
    ],
    correctAnswer: 'Vorortpreise steigen, Büronachfrage sinkt', points: 2, orderIndex: 58, tags: ['Wirtschaft', 'Immobilien'], timeSuggested: 60
  },
  {
    language: 'German', cefrLevel: 'B2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Forscher der Technischen Universität Berlin haben einen neuartigen Werkstoff entwickelt, der sich selbst reparieren kann. Inspiriert von der Selbstheilung biologischer Gewebe, enthält das Material mikroskopische Kapseln mit einem speziellen Klebstoff. Wenn das Material beschädigt wird, platzen die Kapseln auf und der Klebstoff versiegelt den Riss automatisch.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Wie funktioniert der selbstreparierende Werkstoff?',
    options: [
      { label: 'Durch Wärme wird er weich und formt sich neu', value: 'Wärme' },
      { label: 'Kapseln platzen auf und versiegeln Risse mit Klebstoff', value: 'Kapseln versiegeln Risse' },
      { label: 'Roboter reparieren ihn automatisch', value: 'Roboter' },
      { label: 'Er besteht aus Flüssigmetall', value: 'Flüssigmetall' }
    ],
    correctAnswer: 'Kapseln versiegeln Risse', points: 2, orderIndex: 59, tags: ['Wissenschaft', 'Technologie'], timeSuggested: 60
  },
  {
    language: 'German', cefrLevel: 'B2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Die Debatte um ein allgemeines Tempolimit auf deutschen Autobahnen spaltet die Gesellschaft seit Jahrzehnten. Befürworter verweisen auf die Verringerung von Unfällen und CO2-Emissionen. Gegner sehen darin einen Eingriff in die persönliche Freiheit und bezweifeln die tatsächliche Wirksamkeit für den Klimaschutz.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Was sagen die Gegner des Tempolimits?',
    options: [
      { label: 'Es würde die Wirtschaft stärken', value: 'Wirtschaft stärken' },
      { label: 'Es sei ein Eingriff in die Freiheit und die Wirksamkeit sei fraglich', value: 'Eingriff in Freiheit, fraglich wirksam' },
      { label: 'Es sei zu teuer umzusetzen', value: 'zu teuer' },
      { label: 'Es bringe zu viele Vorteile', value: 'zu viele Vorteile' }
    ],
    correctAnswer: 'Eingriff in Freiheit, fraglich wirksam', points: 2, orderIndex: 60, tags: ['Politik', 'Gesellschaft'], timeSuggested: 60
  },
  {
    language: 'German', cefrLevel: 'B2', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'Die Verbraucherzentrale warnt vor betrügerischen Angeboten im Internet, die persönliche Daten abgreifen.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Schreiben Sie genau, was Sie hören.',
    correctAnswer: 'Die Verbraucherzentrale warnt vor betrügerischen Angeboten im Internet, die persönliche Daten abgreifen.', points: 2, orderIndex: 61, tags: ['Diktat', 'Verbraucherschutz'], timeSuggested: 90
  },
  {
    language: 'German', cefrLevel: 'B2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Das Phänomen des sogenannten „Brain Drain" betrifft viele Entwicklungsländer. Hochqualifizierte Fachkräfte wandern in wohlhabendere Länder ab, weil sie dort bessere Arbeitsbedingungen und höhere Gehälter finden. Dies führt in den Herkunftsländern zu einem Mangel an Ärzten, Ingenieuren und Wissenschaftlern, der die wirtschaftliche Entwicklung zusätzlich bremst.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Was verursacht der „Brain Drain" in Entwicklungsländern?',
    options: [
      { label: 'Mehr Arbeitsplätze', value: 'mehr Arbeitsplätze' },
      { label: 'Einen Mangel an Fachkräften', value: 'Mangel an Fachkräften' },
      { label: 'Höhere Löhne', value: 'höhere Löhne' },
      { label: 'Bessere Bildung', value: 'bessere Bildung' }
    ],
    correctAnswer: 'Mangel an Fachkräften', points: 2, orderIndex: 62, tags: ['Wirtschaft', 'Migration'], timeSuggested: 60
  },

  // --- C1 (63–67) ---
  {
    language: 'German', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Die Debatte um die ethischen Grenzen der Genmanipulation hat durch die Entwicklung der CRISPR-Technologie eine neue Dringlichkeit erhalten. Während therapeutische Anwendungen zur Heilung genetischer Erkrankungen weitgehend befürwortet werden, stößt die Möglichkeit sogenannter Keimbahneingriffe — also Veränderungen, die an nachfolgende Generationen weitergegeben werden — auf erheblichen Widerstand. Kritiker warnen vor unvorhersehbaren Langzeitfolgen und der Gefahr einer genetischen Zwei-Klassen-Gesellschaft.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Was sind Keimbahneingriffe?',
    options: [
      { label: 'Eingriffe, die nur den Patienten betreffen', value: 'nur Patient' },
      { label: 'Veränderungen, die an nachfolgende Generationen weitergegeben werden', value: 'an Generationen weitergegeben' },
      { label: 'Kosmetische Veränderungen', value: 'kosmetisch' },
      { label: 'Medikamentöse Behandlungen', value: 'medikamentös' }
    ],
    correctAnswer: 'an Generationen weitergegeben', points: 2, orderIndex: 63, tags: ['Wissenschaft', 'Ethik'], timeSuggested: 75
  },
  {
    language: 'German', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Der Soziologe Hartmut Rosa beschreibt die moderne Gesellschaft als eine „Beschleunigungsgesellschaft", in der technologische, soziale und kulturelle Veränderungen in immer kürzeren Abständen aufeinander folgen. Diese permanente Beschleunigung führt laut Rosa zu einem Verlust an Resonanzerfahrungen — jener tiefen, bedeutungsvollen Verbindung mit der Welt, die entsteht, wenn wir uns von etwas wirklich berühren lassen.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Was geht laut Rosa durch die Beschleunigung verloren?',
    options: [
      { label: 'Wirtschaftliches Wachstum', value: 'Wachstum' },
      { label: 'Resonanzerfahrungen — tiefe Verbindung mit der Welt', value: 'Resonanzerfahrungen' },
      { label: 'Technologischer Fortschritt', value: 'Fortschritt' },
      { label: 'Soziale Kontakte', value: 'soziale Kontakte' }
    ],
    correctAnswer: 'Resonanzerfahrungen', points: 2, orderIndex: 64, tags: ['Soziologie', 'Philosophie'], timeSuggested: 75
  },
  {
    language: 'German', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Die Frage, ob Tiere ein Bewusstsein haben, ist in der Kognitionsforschung umstritten. Während lange argumentiert wurde, dass nur Menschen zu reflexivem Denken fähig seien, deuten neuere Experimente darauf hin, dass zumindest Menschenaffen, Delfine und bestimmte Vogelarten ein rudimentäres Selbstbewusstsein besitzen. Der sogenannte Spiegeltest, bei dem beobachtet wird, ob ein Tier sich im Spiegel erkennt, gilt dabei als klassisches, wenn auch nicht unumstrittenes Kriterium.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Welche Tiere zeigen Hinweise auf Selbstbewusstsein?',
    options: [
      { label: 'Nur Hunde und Katzen', value: 'Hunde und Katzen' },
      { label: 'Menschenaffen, Delfine und bestimmte Vögel', value: 'Menschenaffen, Delfine, Vögel' },
      { label: 'Alle Säugetiere', value: 'alle Säugetiere' },
      { label: 'Nur Primaten', value: 'nur Primaten' }
    ],
    correctAnswer: 'Menschenaffen, Delfine, Vögel', points: 2, orderIndex: 65, tags: ['Wissenschaft', 'Kognition'], timeSuggested: 75
  },
  {
    language: 'German', cefrLevel: 'C1', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'Die zunehmende Ökonomisierung des Bildungswesens hat zu einer Verengung des Bildungsbegriffs auf rein verwertbare Kompetenzen geführt.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Schreiben Sie genau, was Sie hören.',
    correctAnswer: 'Die zunehmende Ökonomisierung des Bildungswesens hat zu einer Verengung des Bildungsbegriffs auf rein verwertbare Kompetenzen geführt.', points: 2, orderIndex: 66, tags: ['Diktat', 'Bildung'], timeSuggested: 90
  },
  {
    language: 'German', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Das Konzept der „negativen Freiheit" — die Abwesenheit äußerer Zwänge — unterscheidet sich fundamental von der „positiven Freiheit", die als Fähigkeit zur Selbstbestimmung und Selbstverwirklichung verstanden wird. Isaiah Berlin argumentierte, dass ein übermäßiger Fokus auf positive Freiheit historisch häufig zur Rechtfertigung autoritärer Regime missbraucht wurde.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Was ist laut Berlin das Risiko eines Fokus auf positive Freiheit?',
    options: [
      { label: 'Er führt zu mehr Demokratie', value: 'mehr Demokratie' },
      { label: 'Er wurde zur Rechtfertigung autoritärer Regime missbraucht', value: 'Rechtfertigung autoritärer Regime' },
      { label: 'Er macht Menschen faul', value: 'Menschen faul' },
      { label: 'Er ist zu abstrakt', value: 'zu abstrakt' }
    ],
    correctAnswer: 'Rechtfertigung autoritärer Regime', points: 2, orderIndex: 67, tags: ['Philosophie', 'Politik'], timeSuggested: 75
  },

  // --- C2 (68–72) ---
  {
    language: 'German', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Adornos berühmte Sentenz, nach Auschwitz ein Gedicht zu schreiben sei barbarisch, wird häufig als Verbot künstlerischer Äußerung missverstanden. Tatsächlich richtete sich Adornos Kritik weniger gegen die Kunst als solche als vielmehr gegen eine Kultur, die nach der Shoah zur Tagesordnung übergehen wollte. Die ästhetische Verarbeitung des Ungeheuerlichen dürfe nicht zur Versöhnung mit dem Unversöhnlichen führen.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Wogegen richtete sich Adornos Kritik tatsächlich?',
    options: [
      { label: 'Gegen alle Formen der Lyrik', value: 'gegen Lyrik' },
      { label: 'Gegen eine Kultur, die zur Tagesordnung übergehen wollte', value: 'Kultur der Tagesordnung' },
      { label: 'Gegen die Philosophie', value: 'gegen Philosophie' },
      { label: 'Gegen moderne Kunst', value: 'gegen moderne Kunst' }
    ],
    correctAnswer: 'Kultur der Tagesordnung', points: 2, orderIndex: 68, tags: ['Philosophie', 'Kultur'], timeSuggested: 90
  },
  {
    language: 'German', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Die Frage, ob mathematische Strukturen entdeckt oder erfunden werden, berührt die Grundlagen der Erkenntnistheorie. Platonisten argumentieren, dass mathematische Objekte unabhängig vom menschlichen Geist existieren und lediglich von Mathematikern entdeckt werden. Konstruktivisten hingegen betrachten Mathematik als ein Produkt menschlicher Kognition und sozialer Konvention. Diese Debatte hat unmittelbare Konsequenzen für unser Verständnis der Beziehung zwischen Mathematik und physikalischer Realität.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Was behaupten Platonisten über mathematische Objekte?',
    options: [
      { label: 'Sie sind menschliche Erfindungen', value: 'menschliche Erfindungen' },
      { label: 'Sie existieren unabhängig vom menschlichen Geist', value: 'unabhängig vom menschlichen Geist' },
      { label: 'Sie sind kulturabhängig', value: 'kulturabhängig' },
      { label: 'Sie haben keine reale Bedeutung', value: 'keine reale Bedeutung' }
    ],
    correctAnswer: 'unabhängig vom menschlichen Geist', points: 2, orderIndex: 69, tags: ['Philosophie', 'Mathematik'], timeSuggested: 90
  },
  {
    language: 'German', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Hannah Arendts Konzept der „Banalität des Bösen", geprägt anlässlich des Eichmann-Prozesses in Jerusalem, beschreibt die Möglichkeit, dass gewöhnliche Menschen ohne erkennbare sadistische Neigungen zu Handlangern systematischen Unrechts werden können. Nicht dämonische Bosheit, sondern Gedankenlosigkeit und blinder Gehorsam gegenüber bürokratischen Strukturen ermöglichten die Mittäterschaft an Verbrechen unvorstellbaren Ausmaßes.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Was ermöglichte laut Arendt die Mittäterschaft?',
    options: [
      { label: 'Ideologische Überzeugung', value: 'ideologische Überzeugung' },
      { label: 'Gedankenlosigkeit und blinder Gehorsam', value: 'Gedankenlosigkeit und Gehorsam' },
      { label: 'Persönliche Grausamkeit', value: 'persönliche Grausamkeit' },
      { label: 'Finanzielle Anreize', value: 'finanzielle Anreize' }
    ],
    correctAnswer: 'Gedankenlosigkeit und Gehorsam', points: 2, orderIndex: 70, tags: ['Philosophie', 'Geschichte'], timeSuggested: 90
  },
  {
    language: 'German', cefrLevel: 'C2', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'Die Verschränkung von ästhetischer Erfahrung und ethischer Reflexion bildet den Kerngedanken einer philosophischen Tradition, die von Kant bis zur Gegenwart reicht.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Schreiben Sie genau, was Sie hören.',
    correctAnswer: 'Die Verschränkung von ästhetischer Erfahrung und ethischer Reflexion bildet den Kerngedanken einer philosophischen Tradition, die von Kant bis zur Gegenwart reicht.', points: 2, orderIndex: 71, tags: ['Diktat', 'Philosophie'], timeSuggested: 120
  },
  {
    language: 'German', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Das Paradoxon der Toleranz, formuliert von Karl Popper, besagt, dass eine unbegrenzt tolerante Gesellschaft letztlich von intoleranten Kräften zerstört werden wird. Wenn eine Gesellschaft tolerant gegenüber denjenigen ist, die die Toleranz selbst abschaffen wollen, wird sie ihre eigene Grundlage untergraben. Popper folgerte daraus, dass eine tolerante Gesellschaft das Recht und die Pflicht habe, die Intoleranz nicht zu tolerieren.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Was besagt das Paradoxon der Toleranz?',
    options: [
      { label: 'Toleranz ist immer gut', value: 'immer gut' },
      { label: 'Unbegrenzte Toleranz führt zur Zerstörung der Toleranz selbst', value: 'unbegrenzte Toleranz zerstört sich selbst' },
      { label: 'Toleranz und Demokratie sind unvereinbar', value: 'unvereinbar' },
      { label: 'Intoleranz ist natürlich', value: 'natürlich' }
    ],
    correctAnswer: 'unbegrenzte Toleranz zerstört sich selbst', points: 2, orderIndex: 72, tags: ['Philosophie', 'Politik'], timeSuggested: 90
  },
]
