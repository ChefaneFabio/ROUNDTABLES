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
    ttsScript: 'In den letzten Jahren haben viele Unternehmen die jährliche Leistungsbeurteilung zugunsten kontinuierlichen Feedbacks aufgegeben: kurze Gespräche alle zwei Wochen zwischen Führungskraft und Mitarbeiter. Die Idee ist nicht, mehr zu reden, sondern früher zu reden. Eine kleine Anpassung im März verhindert, dass ein Problem im Dezember irreparabel wird. Der Wandel verlangt allerdings mehr von den Führungskräften: Sie müssen Fähigkeiten zum aktiven Zuhören entwickeln, die sie oft nie geübt haben.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Was ist das Hauptziel kontinuierlichen Feedbacks?',
    options: [
      { label: 'Kleine Probleme korrigieren, bevor sie ernst werden', value: 'Probleme korrigieren bevor ernst' },
      { label: 'Den Mitarbeitern häufiger Lob aussprechen', value: 'häufigeres Lob' },
      { label: 'Die Rolle der Personalabteilung ersetzen', value: 'HR ersetzen' },
      { label: 'Die Produktivität in Echtzeit überwachen', value: 'Produktivität überwachen' }
    ],
    correctAnswer: 'Probleme korrigieren bevor ernst', points: 3, orderIndex: 31, tags: ['Arbeit', 'Management'], timeSuggested: 75
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
    ttsScript: 'Studien zur Mitarbeiterbindung zeigen, dass die ersten neunzig Tage eines neuen Mitarbeiters im Unternehmen entscheidend sind. In dieser Zeit entstehen Überzeugungen, die das Engagement für Jahre prägen werden: ob man bleibt oder nicht, wie man sich gegenüber Kollegen verhält, wie viel man emotional in Projekte investiert. Dennoch beschränken viele Organisationen das Onboarding auf die erste Woche — Laptop, Handbuch, Termin bei der Personalabteilung — und überlassen die neue Person dann sich selbst.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Warum sind die ersten neunzig Tage so wichtig?',
    options: [
      { label: 'In dieser Zeit entstehen Überzeugungen, die das langfristige Engagement prägen', value: 'Überzeugungen prägen Engagement' },
      { label: 'Weil die meisten Kündigungen in der ersten Woche passieren', value: 'Kündigungen erste Woche' },
      { label: 'Weil Leistungsbeurteilungen nach 90 Tagen beginnen', value: 'Beurteilung nach 90' },
      { label: 'Weil Arbeitserlaubnisse in dieser Zeit ablaufen', value: 'Arbeitserlaubnis abläuft' }
    ],
    correctAnswer: 'Überzeugungen prägen Engagement', points: 3, orderIndex: 33, tags: ['Arbeit', 'HR'], timeSuggested: 75
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
    ttsScript: 'Das Paradox moderner Zusammenarbeit besteht darin, dass wir umso weniger wirklich arbeiten, je mehr wir zusammenarbeiten. Zeitanalysen zeigen, dass Wissensarbeiter im Durchschnitt dreiundzwanzig Stunden pro Woche in Besprechungen verbringen — eine Zahl, die sich in den letzten fünfzehn Jahren verdoppelt hat. Meetings sind zum Mittel geworden, um Engagement zu zeigen, Verantwortung zu teilen und nicht allein entscheiden zu müssen. Doch jede Stunde im Meeting ist eine Stunde weniger für konzentrierte Arbeit, und die Kosten des Kontextwechsels nach jeder Sitzung sind inzwischen gut dokumentiert.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Warum haben sich Besprechungen so stark vermehrt?',
    options: [
      { label: 'Sie dienen dazu, Verantwortung zu teilen und Engagement zu zeigen', value: 'Verantwortung teilen Engagement' },
      { label: 'Weil sie E-Mails vollständig ersetzen', value: 'E-Mails ersetzen' },
      { label: 'Weil Unternehmen Arbeit in Meeting-Stunden messen', value: 'Stunden messen' },
      { label: 'Weil Mitarbeiter lieber in Gruppen arbeiten', value: 'Gruppenarbeit bevorzugt' }
    ],
    correctAnswer: 'Verantwortung teilen Engagement', points: 3, orderIndex: 36, tags: ['Arbeit', 'Management'], timeSuggested: 90
  },
  {
    language: 'German', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Wenn eine Schlüsselkraft kündigt, ist die instinktive Reaktion das Gegenangebot. Die Daten zeigen jedoch, dass diese Strategie kurzfristig funktioniert — die meisten nehmen an —, aber zwei Drittel verlassen das Unternehmen trotzdem innerhalb eines Jahres. Der Grund ist strukturell: Die Entscheidung zu gehen, hat selten mit dem Geld zu tun. Sie betrifft fehlende Entwicklungsperspektiven, Konflikte mit der Führungskraft, das Gefühl, nicht wertgeschätzt zu werden. Das Gegenangebot behandelt das Symptom, nicht die Ursache. Unternehmen, die Talente halten, investieren in Gespräche lange bevor eine Kündigung auf dem Tisch liegt.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Warum scheitern Gegenangebote häufig?',
    options: [
      { label: 'Sie lösen das Symptom, aber nicht die strukturelle Ursache der Unzufriedenheit', value: 'Symptom nicht Ursache' },
      { label: 'Die vorgeschlagenen Gehälter sind zu niedrig', value: 'Gehälter zu niedrig' },
      { label: 'Der Mitarbeiter fordert nach wenigen Monaten mehr', value: 'fordert mehr' },
      { label: 'Das Gesetz erlaubt keine rückwirkenden Angebote', value: 'Gesetz verbietet' }
    ],
    correctAnswer: 'Symptom nicht Ursache', points: 3, orderIndex: 37, tags: ['Arbeit', 'Mitarbeiterbindung'], timeSuggested: 90
  },
  {
    language: 'German', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'In einer umfangreichen internen Studie zur Effektivität von Teams hat Google einen dominanten Faktor identifiziert: psychologische Sicherheit. Damit ist das Gefühl gemeint, Meinungen äußern, Fehler eingestehen oder Fragen stellen zu können, ohne berufliche Konsequenzen befürchten zu müssen. Teams mit hoher psychologischer Sicherheit produzieren mehr Innovation, lernen schneller aus Fehlern und halten ihre Mitarbeiter besser. Aber sie wird nicht durch Unternehmensrichtlinien aufgebaut: Sie entsteht durch das, was eine Führungskraft sagt, wenn jemand einen Fehler einräumt, und durch das, was sie nicht sagt, wenn ein Moment der Stille eintritt.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Wie entsteht psychologische Sicherheit laut dem Text?',
    options: [
      { label: 'Durch das tägliche Verhalten der Führungskraft, nicht durch Richtlinien', value: 'Verhalten der Führungskraft' },
      { label: 'Durch Unternehmensrichtlinien zur Ethik', value: 'Ethikrichtlinien' },
      { label: 'Durch Schulungen neuer Manager in Kommunikationstechniken', value: 'Manager schulen' },
      { label: 'Durch strenge Bewertung von Fehlern zur Vermeidung von Wiederholungen', value: 'strenge Bewertung' }
    ],
    correctAnswer: 'Verhalten der Führungskraft', points: 3, orderIndex: 38, tags: ['Arbeit', 'Team'], timeSuggested: 90
  },
  {
    language: 'German', cefrLevel: 'C2', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'Der wahre Indikator für den Erfolg einer Führungskraft ist nicht die Anzahl der Entscheidungen, die sie täglich trifft, sondern die Qualität der Entscheidungen, die ihre Mitarbeiter eigenständig treffen.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Schreiben Sie genau, was Sie hören.',
    correctAnswer: 'Der wahre Indikator für den Erfolg einer Führungskraft ist nicht die Anzahl der Entscheidungen, die sie täglich trifft, sondern die Qualität der Entscheidungen, die ihre Mitarbeiter eigenständig treffen.', points: 3, orderIndex: 39, tags: ['Diktat', 'Arbeit'], timeSuggested: 120
  },
  {
    language: 'German', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Die Forschung zur kognitiven Arbeit konvergiert auf einer kontraintuitiven Wahrheit: Nicht die Dauer der Arbeit begrenzt die Produktivität, sondern ihre Zersplitterung. Jedes Mal, wenn wir von einer Aufgabe zur nächsten wechseln — eine Benachrichtigung, eine Chat-Nachricht, ein unerwartetes Meeting — braucht das Gehirn zwischen fünfzehn und fünfundzwanzig Minuten, um das vorherige Konzentrationsniveau vollständig wiederzuerlangen. An einem typischen Tag mit dreißig Unterbrechungen bedeutet das wörtlich, dass ein Großteil der gearbeiteten Zeit keinen Wert produziert. Einige Unternehmen haben begonnen, geschützte Blöcke von zwei oder drei Stunden ohne Besprechungen einzuführen.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Warum sind geschützte Zeitblöcke wichtig?',
    options: [
      { label: 'Das Gehirn braucht lange Minuten, um nach jeder Unterbrechung die Konzentration wiederzufinden', value: 'lange Wiederfindung Konzentration' },
      { label: 'Weil Mitarbeiter mehr Pausen fordern', value: 'mehr Pausen' },
      { label: 'Weil lange Besprechungen ermüdend sind', value: 'Besprechungen ermüdend' },
      { label: 'Weil Benachrichtigungen gesetzlich verboten sind', value: 'Benachrichtigungen verboten' }
    ],
    correctAnswer: 'lange Wiederfindung Konzentration', points: 3, orderIndex: 40, tags: ['Arbeit', 'Produktivität'], timeSuggested: 90
  },
  {
    language: 'German', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Feedback in einem internationalen Team zu geben gehört zu den am meisten unterschätzten Aufgaben modernen Managements. Was in manchen Kulturen als direkt und hilfreich gilt — einen Fehler während einer Besprechung anzusprechen, zum Beispiel — wird in anderen Kulturen als öffentlicher Angriff verstanden. Das Gegenteil gilt ebenso: Ein Feedback, das in einer Kultur klar ist, ist für eine andere so weich, dass es nicht einmal als Kritik wahrgenommen wird. Die effektivsten Führungskräfte halten nicht an einem einzigen Stil fest: Sie passen die Art der Übermittlung an den Empfänger an und überprüfen, ob die Botschaft so angekommen ist, wie sie gemeint war.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Was tut eine effektive Führungskraft in einem internationalen Team?',
    options: [
      { label: 'Sie passt den Feedback-Stil an und überprüft, dass er verstanden wurde', value: 'Stil anpassen und überprüfen' },
      { label: 'Sie verwendet immer den möglichst direkten Stil', value: 'immer direkt' },
      { label: 'Sie delegiert Feedback an die lokale Personalabteilung', value: 'an HR delegieren' },
      { label: 'Sie vermeidet schwierige Gespräche', value: 'Gespräche vermeiden' }
    ],
    correctAnswer: 'Stil anpassen und überprüfen', points: 3, orderIndex: 41, tags: ['Arbeit', 'interkulturelle Kommunikation'], timeSuggested: 90
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
    ttsScript: 'Asynchrones Arbeiten — schriftlich kommunizieren, ohne eine sofortige Antwort zu erwarten — ist in vielen verteilten Teams zur Norm geworden. Die Vorteile liegen auf der Hand: Menschen in verschiedenen Zeitzonen arbeiten zusammen, ohne den Schlaf zu verlieren, und das Schreiben zwingt zu klarerem Denken als spontane Besprechungen. Es gibt jedoch einen Preis: Eine in Eile geschriebene Nachricht kann den Tonfall verlieren und ungewollte Spannungen erzeugen. Gut funktionierende Teams investieren Zeit in explizite Kommunikationsregeln: wann der Chat, wann die E-Mail, wann das Video.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Was ist ein Nachteil asynchroner Arbeit?',
    options: [
      { label: 'Der Ton kann missverstanden werden und Spannungen erzeugen', value: 'Ton missverstanden' },
      { label: 'Alle müssen gleichzeitig online sein', value: 'alle gleichzeitig online' },
      { label: 'Dokumente können nicht geteilt werden', value: 'Dokumente nicht teilbar' },
      { label: 'Die Menschen arbeiten weniger Stunden', value: 'weniger Stunden' }
    ],
    correctAnswer: 'Ton missverstanden', points: 2, orderIndex: 63, tags: ['Arbeit', 'Kommunikation'], timeSuggested: 75
  },
  {
    language: 'German', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Das Recht auf Nichterreichbarkeit, in einigen europäischen Ländern bereits Gesetz, legt fest, dass ein Mitarbeiter nicht verpflichtet ist, Nachrichten außerhalb der Arbeitszeit zu lesen oder zu beantworten. Das Prinzip scheint einfach, die Umsetzung ist jedoch komplex: In internationalen Teams ist der Abend für die einen der Morgen für die anderen, und viele Führungskräfte merken nicht, dass sie eine implizite Erwartung setzen, wenn sie um elf Uhr abends schreiben. Manche Unternehmen haben automatische Verzögerungen eingeführt: Nachrichten, die abends gesendet werden, werden erst am nächsten Morgen zugestellt.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Warum ist das Recht auf Nichterreichbarkeit in internationalen Teams schwer umzusetzen?',
    options: [
      { label: 'Der Abend für die einen ist der Morgen für die anderen', value: 'Abend Morgen Zeitzonen' },
      { label: 'Das Gesetz unterscheidet sich von Land zu Land', value: 'Gesetz unterschiedlich' },
      { label: 'Die Führungskräfte weigern sich, es zu respektieren', value: 'Führungskräfte weigern sich' },
      { label: 'Die Technologie lässt es nicht zu', value: 'Technologie verhindert' }
    ],
    correctAnswer: 'Abend Morgen Zeitzonen', points: 2, orderIndex: 64, tags: ['Arbeit', 'Work-Life-Balance'], timeSuggested: 75
  },
  {
    language: 'German', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Die Rolle der modernen Führungskraft hat sich grundlegend gewandelt. Die Zeit der Vorgesetzten, die Anweisungen gaben und deren Ausführung kontrollierten, ist vorbei. Heute agieren die effektivsten Führungskräfte als Coaches: Sie stellen mehr Fragen, als sie Antworten geben, helfen dem Mitarbeiter, selbst die Lösung zu finden, und fördern Talente eher durch Delegation als durch Kontrolle. Für viele, die in hierarchischen Kulturen aufgewachsen sind, ist das eine kontraintuitive Veränderung, und manche Führungskräfte fühlen sich zunächst weniger produktiv — bis sie sehen, wie ihr Team wächst.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Was kennzeichnet die moderne Führungskraft als Coach?',
    options: [
      { label: 'Sie stellt mehr Fragen, als sie Antworten gibt', value: 'mehr Fragen als Antworten' },
      { label: 'Sie kontrolliert jeden Arbeitsschritt', value: 'kontrolliert jeden Schritt' },
      { label: 'Sie arbeitet immer Seite an Seite mit dem Team', value: 'Seite an Seite' },
      { label: 'Sie entscheidet ohne jemanden zu konsultieren', value: 'ohne Konsultation' }
    ],
    correctAnswer: 'mehr Fragen als Antworten', points: 2, orderIndex: 65, tags: ['Arbeit', 'Management'], timeSuggested: 75
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
    ttsScript: 'Der Ausdruck „Quiet Quitting", der im Jahr zweitausendzweiundzwanzig viral ging, beschreibt keine echten Kündigungen, sondern ein konkretes Verhalten: genau das zu tun, was im Vertrag steht, nicht mehr und nicht weniger. E-Mails außerhalb der Arbeitszeit nicht zu lesen, sich nicht freiwillig zu melden, sich emotional nicht in zusätzliche Projekte zu investieren. Das Phänomen wird auf zwei gegensätzliche Arten gedeutet: als gesunde Reaktion auf das verbreitete Burnout oder als Symptom einer tieferen Engagement-Krise. Die Daten sind unbequem: In vielen Unternehmen übersteigt der Anteil der Mitarbeiter, die sich als nicht engagiert bezeichnen, sechzig Prozent.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Wie wird das Phänomen Quiet Quitting interpretiert?',
    options: [
      { label: 'Entweder als gesunde Grenzziehung oder als Zeichen verbreiteter Resignation', value: 'gesund oder Resignation' },
      { label: 'Als echte Massenkündigungen', value: 'Massenkündigungen' },
      { label: 'Als typisch generationsbedingtes Phänomen', value: 'generationsbedingt' },
      { label: 'Als Strategie, um eine Gehaltserhöhung zu erzwingen', value: 'Strategie Gehalt' }
    ],
    correctAnswer: 'gesund oder Resignation', points: 2, orderIndex: 68, tags: ['Arbeit', 'Engagement'], timeSuggested: 90
  },
  {
    language: 'German', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Das hybride Arbeiten ist seit zweitausendzwanzig zum spaltendsten Thema in den Unternehmen geworden. Die Produktivitätsdaten sind widersprüchlich: Einige Studien stellen einen Anstieg fest, andere einen Rückgang, je nach Art der Tätigkeit und Art, wie der Übergang gemanagt wird. Die wirklich interessante Frage ist aber nicht, wo die Menschen arbeiten, sondern wie sie geführt werden. Das Hybrid-Modell legt Schwächen offen, die das physische Büro verdeckte: Führungskräfte, die nach Anwesenheit kontrollierten, Prozesse, die von zufälligen Flurgesprächen abhingen, Entscheidungen, die diejenigen ausschlossen, die nicht im Raum waren.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Warum ist das hybride Modell ein Prüfstein für die Führung?',
    options: [
      { label: 'Es legt Praktiken offen, die nur dank physischer Anwesenheit funktionierten', value: 'Praktiken durch Anwesenheit' },
      { label: 'Es zwingt Führungskräfte, neue Technologien zu lernen', value: 'Technologie lernen' },
      { label: 'Es verdoppelt die tatsächlichen Arbeitsstunden', value: 'verdoppelte Stunden' },
      { label: 'Es erfordert mehr Meetings als die Präsenzarbeit', value: 'mehr Meetings' }
    ],
    correctAnswer: 'Praktiken durch Anwesenheit', points: 2, orderIndex: 69, tags: ['Arbeit', 'Leadership'], timeSuggested: 90
  },
  {
    language: 'German', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'In Organisationen einer gewissen Größe ist das am meisten unterschätzte Problem nicht der Mangel an Talenten oder Strategie: Es ist die Abstimmung zwischen den Funktionen. Der Vertrieb verspricht Eigenschaften, die das Produktteam nicht eingeplant hat, das Produkt baut Dinge, die das Marketing nicht zu positionieren weiß, die Finanzabteilung genehmigt Budgets, die der Betrieb nicht umsetzen kann. Jede Funktion arbeitet für sich genommen rational, aber die Summe individueller Rationalitäten ergibt eine irrationale Organisation. Die Lösung sind nicht mehr Meetings oder mehr Berichte: Es sind kurze, häufige Gespräche zwischen Funktionsverantwortlichen, mit der Freiheit, Zusagen infrage zu stellen, ohne das Gesicht zu verlieren.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Was ist die strukturelle Ursache der Fehlausrichtung zwischen Funktionen?',
    options: [
      { label: 'Jede Funktion ist einzeln rational, aber die Summe erzeugt Inkohärenz', value: 'einzelne Rationalität Inkohärenz' },
      { label: 'Die Menschen lesen die internen Berichte nicht', value: 'Berichte nicht gelesen' },
      { label: 'Das Unternehmen hat nicht genug Manager', value: 'zu wenige Manager' },
      { label: 'Die Technologie teilt die Daten nicht', value: 'Technologie teilt nicht' }
    ],
    correctAnswer: 'einzelne Rationalität Inkohärenz', points: 2, orderIndex: 70, tags: ['Arbeit', 'Organisation'], timeSuggested: 90
  },
  {
    language: 'German', cefrLevel: 'C2', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'Die langfristige Nachhaltigkeit einer Organisation hängt von ihrer Fähigkeit ab, den Druck für kurzfristige Ergebnisse mit Investitionen in Einklang zu bringen, die erst in der Zukunft Wert schaffen werden.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Schreiben Sie genau, was Sie hören.',
    correctAnswer: 'Die langfristige Nachhaltigkeit einer Organisation hängt von ihrer Fähigkeit ab, den Druck für kurzfristige Ergebnisse mit Investitionen in Einklang zu bringen, die erst in der Zukunft Wert schaffen werden.', points: 2, orderIndex: 71, tags: ['Diktat', 'Arbeit'], timeSuggested: 120
  },
  {
    language: 'German', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Das Modell der jährlichen Leistungsbeurteilung — jene Skala von eins bis fünf, mit der Führungskräfte ihre Mitarbeiter klassifizierten — ist vor etwa zehn Jahren in die Krise geraten, und viele Unternehmen haben es aufgegeben. Die Gründe sind dokumentiert: Die Bewertungen demotivieren diejenigen, die niedrige Noten erhalten, sie sind von Recency-Bias beeinflusst (Manager erinnern sich an die letzten drei Monate, nicht an das ganze Jahr) und sie erzeugen ungesunden Wettbewerb unter Kollegen. Was sie ersetzt, ist anspruchsvoller: häufige Entwicklungsgespräche, getrennt von Gehaltsentscheidungen, mit dem Ziel des Wachstums, nicht der Klassifizierung. Für die Führungskraft ist das anstrengender, produziert aber nachhaltigere Ergebnisse.',
    ttsLanguageCode: 'de-DE',
    questionText: 'Warum wurden die jährlichen Leistungsbeurteilungen aufgegeben?',
    options: [
      { label: 'Sie verzerren das Verhalten und spiegeln eher die letzten Monate als das ganze Jahr wider', value: 'verzerren Recency-Bias' },
      { label: 'Sie sind zu teuer in der Umsetzung', value: 'zu teuer' },
      { label: 'Die Gewerkschaft lässt sie nicht mehr zu', value: 'Gewerkschaft verbietet' },
      { label: 'Sie sind in den meisten Ländern illegal', value: 'illegal' }
    ],
    correctAnswer: 'verzerren Recency-Bias', points: 2, orderIndex: 72, tags: ['Arbeit', 'Performance'], timeSuggested: 90
  },

  // ============================================================
  // VARIED SPOKEN CONTEXTS — 12 questions (orderIndex 73-84)
  // ============================================================

  // A1 — Varied Spoken Contexts
  {
    language: 'German', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    questionText: '[Mailboxnachricht] Sie hören eine Nachricht von einem Kollegen. Wann ist das Treffen?',
    ttsScript: 'Hallo, hier ist Thomas aus der Marketingabteilung. Ich rufe an, um unser Treffen morgen um halb zehn zu bestätigen. Bringen Sie bitte den Bericht mit. Bis morgen!',
    ttsLanguageCode: 'de-DE',
    options: [{ label: '9:00', value: '9:00' }, { label: '9:30', value: '9:30' }, { label: '10:00', value: '10:00' }, { label: '10:30', value: '10:30' }],
    correctAnswer: '9:30', points: 1, orderIndex: 73, tags: ['Mailbox', 'Arbeit', 'register-varied'], timeSuggested: 30
  },
  {
    language: 'German', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    questionText: '[Flughafenansage] Sie hören eine Durchsage am Flughafen. Wohin fliegt das Flugzeug?',
    ttsScript: 'Achtung, Fluggäste des Fluges LH vierhundertzwei nach Wien. Ihr Flug wird jetzt am Gate zwölf eingestiegen. Bitte begeben Sie sich sofort zu Gate zwölf.',
    ttsLanguageCode: 'de-DE',
    options: [{ label: 'Berlin', value: 'Berlin' }, { label: 'Wien', value: 'Wien' }, { label: 'Zürich', value: 'Zürich' }, { label: 'München', value: 'München' }],
    correctAnswer: 'Wien', points: 1, orderIndex: 74, tags: ['Flughafen', 'Ansage', 'register-varied'], timeSuggested: 30
  },

  // A2 — Varied Spoken Contexts
  {
    language: 'German', cefrLevel: 'A2', questionType: 'LISTENING', skill: 'LISTENING',
    questionText: '[Restaurantreservierung] Sie hören jemanden im Restaurant reservieren. Für wie viele Personen?',
    ttsScript: 'Guten Abend, ich möchte gern einen Tisch reservieren für Samstagabend. Wir wären sechs Personen, so gegen zwanzig Uhr. Haben Sie vielleicht etwas auf der Terrasse?',
    ttsLanguageCode: 'de-DE',
    options: [{ label: '4 Personen', value: '4 Personen' }, { label: '5 Personen', value: '5 Personen' }, { label: '6 Personen', value: '6 Personen' }, { label: '8 Personen', value: '8 Personen' }],
    correctAnswer: '6 Personen', points: 1, orderIndex: 75, tags: ['Restaurant', 'Reservierung', 'register-varied'], timeSuggested: 40
  },
  {
    language: 'German', cefrLevel: 'A2', questionType: 'LISTENING', skill: 'LISTENING',
    questionText: '[Kundennachricht] Sie hören eine Nachricht für einen Kunden. Was soll verschoben werden?',
    ttsScript: 'Hallo, hier spricht Frau Schneider von der Firma Weber und Partner. Ich rufe wegen unseres Termins am Mittwoch an. Leider muss ich die Lieferung verschieben. Könnten wir sie auf Freitagnachmittag verlegen? Bitte rufen Sie mich zurück.',
    ttsLanguageCode: 'de-DE',
    options: [{ label: 'Ein Meeting', value: 'Ein Meeting' }, { label: 'Eine Lieferung', value: 'Eine Lieferung' }, { label: 'Eine Zahlung', value: 'Eine Zahlung' }, { label: 'Eine Präsentation', value: 'Eine Präsentation' }],
    correctAnswer: 'Eine Lieferung', points: 1, orderIndex: 76, tags: ['Kunde', 'Nachricht', 'register-varied'], timeSuggested: 40
  },

  // B1 — Varied Spoken Contexts
  {
    language: 'German', cefrLevel: 'B1', questionType: 'LISTENING', skill: 'LISTENING',
    questionText: '[Radiowerbung] Sie hören eine Radiowerbung. Was wird beworben?',
    ttsScript: 'Sie möchten endlich fließend Englisch sprechen? Mit LinguaPro, der Online-Sprachschule Nummer eins in Deutschland, schaffen Sie das. Über fünfzigtausend Berufstätige vertrauen uns bereits. Melden Sie sich diese Woche an und erhalten Sie den ersten Monat kostenlos! Besuchen Sie linguapro punkt de.',
    ttsLanguageCode: 'de-DE',
    options: [{ label: 'Ein Übersetzungsbüro', value: 'Ein Übersetzungsbüro' }, { label: 'Eine Online-Sprachschule', value: 'Eine Online-Sprachschule' }, { label: 'Ein Grammatikbuch', value: 'Ein Grammatikbuch' }, { label: 'Eine Geschäftskonferenz', value: 'Eine Geschäftskonferenz' }],
    correctAnswer: 'Eine Online-Sprachschule', points: 1, orderIndex: 77, tags: ['Radio', 'Werbung', 'register-varied'], timeSuggested: 45
  },
  {
    language: 'German', cefrLevel: 'B1', questionType: 'LISTENING', skill: 'LISTENING',
    questionText: '[Bürobesprechung] Sie hören einen Ausschnitt aus einer Teambesprechung. Was ist das Hauptproblem?',
    ttsScript: 'Gut, bevor wir Schluss machen, möchte ich den Zeitplan des Projekts Hartmann ansprechen. Wir liegen derzeit zwei Wochen hinter dem Zeitplan, und der Kunde erwartet die erste Lieferung bis zum fünfzehnten März. Wir müssen die Ressourcen umverteilen. Irgendwelche Vorschläge?',
    ttsLanguageCode: 'de-DE',
    options: [{ label: 'Das Budget ist überschritten', value: 'Das Budget ist überschritten' }, { label: 'Das Projekt liegt im Rückstand', value: 'Das Projekt liegt im Rückstand' }, { label: 'Ein Mitarbeiter hat gekündigt', value: 'Ein Mitarbeiter hat gekündigt' }, { label: 'Der Kunde ist unzufrieden', value: 'Der Kunde ist unzufrieden' }],
    correctAnswer: 'Das Projekt liegt im Rückstand', points: 1, orderIndex: 78, tags: ['Besprechung', 'Büro', 'register-varied'], timeSuggested: 45
  },

  // B2 — Varied Spoken Contexts
  {
    language: 'German', cefrLevel: 'B2', questionType: 'LISTENING', skill: 'LISTENING',
    questionText: '[Podcast] Sie hören einen Podcast über Berufswechsel. Was ist laut dem Sprecher das größte Hindernis?',
    ttsScript: 'Wenn ich Menschen bei ihrer beruflichen Neuorientierung begleite, ist das, was sie am meisten zurückhält, nicht der Mangel an Fähigkeiten oder Qualifikationen. Es ist die Angst. Die Angst vor dem Unbekannten, die Angst vor finanzieller Unsicherheit und ehrlich gesagt, die Angst davor, was andere Leute denken werden. Sobald man das überwindet, fügt sich alles andere zusammen.',
    ttsLanguageCode: 'de-DE',
    options: [{ label: 'Mangel an Fähigkeiten', value: 'Mangel an Fähigkeiten' }, { label: 'Finanzielle Probleme', value: 'Finanzielle Probleme' }, { label: 'Angst', value: 'Angst' }, { label: 'Altersdiskriminierung', value: 'Altersdiskriminierung' }],
    correctAnswer: 'Angst', points: 2, orderIndex: 79, tags: ['Podcast', 'Karriere', 'register-varied'], timeSuggested: 60
  },
  {
    language: 'German', cefrLevel: 'B2', questionType: 'LISTENING', skill: 'LISTENING',
    questionText: '[Nachrichtenbericht] Sie hören einen Wirtschaftsbericht. Was hat die Zentralbank entschieden?',
    ttsScript: 'In einem weitgehend erwarteten Schritt hat die Europäische Zentralbank eine Zinssenkung um einen Viertelpunkt angekündigt, wodurch der Leitzins auf drei Komma fünf Prozent sinkt. Analysten sehen darin ein Zeichen wachsender Sorge über das schwache Wachstum in der Eurozone, insbesondere im verarbeitenden Gewerbe.',
    ttsLanguageCode: 'de-DE',
    options: [{ label: 'Die Zinsen erhöhen', value: 'Die Zinsen erhöhen' }, { label: 'Die Zinsen senken', value: 'Die Zinsen senken' }, { label: 'Die Zinsen einfrieren', value: 'Die Zinsen einfrieren' }, { label: 'Die Zinsen abschaffen', value: 'Die Zinsen abschaffen' }],
    correctAnswer: 'Die Zinsen senken', points: 2, orderIndex: 80, tags: ['Nachrichten', 'Wirtschaft', 'register-varied'], timeSuggested: 60
  },

  // C1 — Varied Spoken Contexts
  {
    language: 'German', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    questionText: '[TED-Vortrag] Sie hören einen Ausschnitt über Innovation. Was ist laut dem Redner der wahre Motor der Innovation?',
    ttsScript: 'Wir neigen dazu, das einsame Genie in seiner Garage zu romantisieren, aber die Daten erzählen eine ganz andere Geschichte. Innovation ist im Grunde ein soziales Phänomen. Sie gedeiht an der Schnittstelle vielfältiger Perspektiven, wo Ideen aufeinanderprallen und sich neu kombinieren. Der wahre Motor ist nicht individuelle Genialität, sondern die Dichte und Qualität menschlicher Verbindungen innerhalb eines Ökosystems.',
    ttsLanguageCode: 'de-DE',
    options: [{ label: 'Individuelle Genialität', value: 'Individuelle Genialität' }, { label: 'Staatliche Förderung', value: 'Staatliche Förderung' }, { label: 'Menschliche Verbindungen im Ökosystem', value: 'Menschliche Verbindungen im Ökosystem' }, { label: 'Wettbewerb zwischen Unternehmen', value: 'Wettbewerb zwischen Unternehmen' }],
    correctAnswer: 'Menschliche Verbindungen im Ökosystem', points: 2, orderIndex: 81, tags: ['TED-Vortrag', 'Innovation', 'register-varied'], timeSuggested: 75
  },
  {
    language: 'German', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    questionText: '[Universitätsvorlesung] Sie hören einen Ausschnitt aus einer Vorlesung. Welches Konzept erklärt der Professor?',
    ttsScript: 'Was wir in der Literatur beobachten, ist eine Verschiebung vom traditionellen Modell der linearen Kausalität hin zu dem, was Wissenschaftler heute als zirkuläre Kausalität bezeichnen. Mit anderen Worten: Die Wirkung wirkt auf die Ursache zurück und erzeugt eine sich selbst verstärkende Schleife. Das zeigt sich besonders deutlich in Klimasystemen, wo die Erwärmung der Ozeane mehr Kohlendioxid freisetzt, was wiederum die Erwärmung beschleunigt.',
    ttsLanguageCode: 'de-DE',
    options: [{ label: 'Lineare Kausalität', value: 'Lineare Kausalität' }, { label: 'Zirkuläre Kausalität', value: 'Zirkuläre Kausalität' }, { label: 'Zufällige Variation', value: 'Zufällige Variation' }, { label: 'Statisches Gleichgewicht', value: 'Statisches Gleichgewicht' }],
    correctAnswer: 'Zirkuläre Kausalität', points: 2, orderIndex: 82, tags: ['Vorlesung', 'akademisch', 'register-varied'], timeSuggested: 75
  },

  // C2 — Varied Spoken Contexts
  {
    language: 'German', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    questionText: '[Philosophische Debatte] Sie hören einen Ausschnitt einer Debatte. Welche Position vertritt der Redner?',
    ttsScript: 'Ich vertrete die Auffassung, dass der moralische Realismus nicht nur vertretbar, sondern notwendig ist. Wenn wir zugestehen, dass ethische Wahrheiten rein konstruiert sind, dann haben wir keinerlei Grundlage, auf der wir Gräueltaten verurteilen können. Der bloße Akt der moralischen Empörung setzt voraus, dass es objektive Maßstäbe gibt, an denen Handlungen gemessen werden können, unabhängig vom kulturellen Konsens.',
    ttsLanguageCode: 'de-DE',
    options: [{ label: 'Moralischer Relativismus', value: 'Moralischer Relativismus' }, { label: 'Moralischer Realismus', value: 'Moralischer Realismus' }, { label: 'Nihilismus', value: 'Nihilismus' }, { label: 'Utilitarismus', value: 'Utilitarismus' }],
    correctAnswer: 'Moralischer Realismus', points: 2, orderIndex: 83, tags: ['Debatte', 'Philosophie', 'register-varied'], timeSuggested: 90
  },
  {
    language: 'German', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    questionText: '[Satirischer Kommentar] Sie hören einen satirischen Kommentar. Was wird eigentlich kritisiert?',
    ttsScript: 'Und in den heutigen Eilmeldungen: Ein multinationaler Konzern hat großzügig versprochen, bis zweitausendfünfundsiebzig klimaneutral zu werden, gerade rechtzeitig zum Wärmetod des Universums. Der Vorstandsvorsitzende versicherte den Aktionären, dass kurzfristige Gewinne zwar die absolute Priorität bleiben, das Unternehmen sich aber zutiefst der Nachhaltigkeit verpflichtet fühle, vorausgesetzt, es kostet nichts.',
    ttsLanguageCode: 'de-DE',
    options: [{ label: 'Umweltvorschriften', value: 'Umweltvorschriften' }, { label: 'Greenwashing von Unternehmen', value: 'Greenwashing von Unternehmen' }, { label: 'Untätigkeit der Regierung', value: 'Untätigkeit der Regierung' }, { label: 'Verbraucherverhalten', value: 'Verbraucherverhalten' }],
    correctAnswer: 'Greenwashing von Unternehmen', points: 2, orderIndex: 84, tags: ['Satire', 'Kommentar', 'register-varied'], timeSuggested: 90
  },

  // ============================================================
  // ALLTAGSDIALOGE — ergänzt auf Feedback von Maka (monotone Roboterstimme,
  // keine Dialoge). Zwei Sprecher mit Markern SPEAKER_A/B aktivieren den
  // TtsService-Parser, der zwischen männlichen/weiblichen Stimmen wechselt.
  // Themen: Alltag + Work-Life (keine Philosophie / Politik / Spezialwissenschaft).
  // ============================================================

  // ---- A1 Dialoge ----
  {
    language: 'German', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Guten Morgen, ich hätte gern einen Kaffee, bitte.
SPEAKER_B: Gerne. Klein oder groß?
SPEAKER_A: Klein, danke. Was kostet er?
SPEAKER_B: Ein Euro zwanzig.`,
    ttsLanguageCode: 'de-DE',
    questionText: 'Was kostet der Kaffee?',
    options: [{ label: '1,00 Euro', value: '1,00' }, { label: '1,20 Euro', value: '1,20' }, { label: '1,50 Euro', value: '1,50' }, { label: '2,00 Euro', value: '2,00' }],
    correctAnswer: '1,20', points: 1, orderIndex: 85, tags: ['Dialog', 'Café', 'Alltag'], timeSuggested: 40
  },
  {
    language: 'German', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Guten Tag. Wann öffnen Sie morgen?
SPEAKER_B: Wir öffnen um neun Uhr morgens.
SPEAKER_A: Und wann schließen Sie?
SPEAKER_B: Um sieben Uhr abends.`,
    ttsLanguageCode: 'de-DE',
    questionText: 'Wann öffnet das Geschäft?',
    options: [{ label: 'Um 7 Uhr', value: '7' }, { label: 'Um 8 Uhr', value: '8' }, { label: 'Um 9 Uhr', value: '9' }, { label: 'Um 10 Uhr', value: '10' }],
    correctAnswer: '9', points: 1, orderIndex: 86, tags: ['Dialog', 'Geschäft', 'Alltag'], timeSuggested: 40
  },
  {
    language: 'German', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Wo können wir uns am Samstag treffen?
SPEAKER_B: Treffen wir uns im Café neben dem Park.
SPEAKER_A: Um wie viel Uhr?
SPEAKER_B: Um drei Uhr nachmittags.`,
    ttsLanguageCode: 'de-DE',
    questionText: 'Wo wollen sie sich treffen?',
    options: [{ label: 'Im Park', value: 'Park' }, { label: 'Im Café', value: 'Café' }, { label: 'Im Kino', value: 'Kino' }, { label: 'Im Büro', value: 'Büro' }],
    correctAnswer: 'Café', points: 1, orderIndex: 87, tags: ['Dialog', 'Pläne', 'Alltag'], timeSuggested: 40
  },
  {
    language: 'German', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Eine Fahrkarte ins Zentrum, bitte.
SPEAKER_B: Einfach oder hin und zurück?
SPEAKER_A: Nur einfach.
SPEAKER_B: Das macht zwei Euro.`,
    ttsLanguageCode: 'de-DE',
    questionText: 'Was kostet die Fahrkarte?',
    options: [{ label: '1 Euro', value: '1' }, { label: '2 Euro', value: '2' }, { label: '3 Euro', value: '3' }, { label: '4 Euro', value: '4' }],
    correctAnswer: '2', points: 1, orderIndex: 88, tags: ['Dialog', 'Verkehr', 'Alltag'], timeSuggested: 40
  },

  // ---- A2 Dialoge ----
  {
    language: 'German', cefrLevel: 'A2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Hast du am Wochenende Zeit? Es läuft ein neuer Film im Kino.
SPEAKER_B: Samstag bin ich beschäftigt, aber Sonntag passt mir gut.
SPEAKER_A: Perfekt. Gehen wir am Sonntagnachmittag?
SPEAKER_B: Einverstanden, bis dann.`,
    ttsLanguageCode: 'de-DE',
    questionText: 'Wann gehen sie ins Kino?',
    options: [{ label: 'Samstagmorgen', value: 'sa-morgen' }, { label: 'Samstagabend', value: 'sa-abend' }, { label: 'Sonntagnachmittag', value: 'so-nachmittag' }, { label: 'Sonntagabend', value: 'so-abend' }],
    correctAnswer: 'so-nachmittag', points: 1, orderIndex: 89, tags: ['Dialog', 'Pläne', 'Alltag'], timeSuggested: 45
  },
  {
    language: 'German', cefrLevel: 'A2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Guten Tag, ich möchte einen Tisch für zwei Personen reservieren.
SPEAKER_B: Für wann, mein Herr?
SPEAKER_A: Freitagabend um acht Uhr, wenn möglich.
SPEAKER_B: In Ordnung. Auf welchen Namen darf ich reservieren?`,
    ttsLanguageCode: 'de-DE',
    questionText: 'Für wie viele Personen ist die Reservierung?',
    options: [{ label: 'Eine', value: '1' }, { label: 'Zwei', value: '2' }, { label: 'Drei', value: '3' }, { label: 'Vier', value: '4' }],
    correctAnswer: '2', points: 1, orderIndex: 90, tags: ['Dialog', 'Restaurant', 'Alltag'], timeSuggested: 45
  },
  {
    language: 'German', cefrLevel: 'A2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Hallo, ich bin neu in der Firma. Ich arbeite im Marketingteam.
SPEAKER_B: Herzlich willkommen! Ich bin im Vertrieb. Komm, ich stelle dir das Team vor.
SPEAKER_A: Vielen Dank. Seit wann arbeitest du hier?
SPEAKER_B: Ich bin seit etwa drei Jahren dabei.`,
    ttsLanguageCode: 'de-DE',
    questionText: 'In welcher Abteilung arbeitet die neue Kollegin?',
    options: [{ label: 'Vertrieb', value: 'vertrieb' }, { label: 'Marketing', value: 'marketing' }, { label: 'Personal', value: 'hr' }, { label: 'IT', value: 'it' }],
    correctAnswer: 'marketing', points: 1, orderIndex: 91, tags: ['Dialog', 'Büro', 'Work-Life'], timeSuggested: 45
  },
  {
    language: 'German', cefrLevel: 'A2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Entschuldigung, wie komme ich zum Bahnhof?
SPEAKER_B: Gehen Sie zwei Straßen geradeaus, dann biegen Sie links ab.
SPEAKER_A: Nach zwei Straßen links. Wie lange dauert es zu Fuß?
SPEAKER_B: Etwa zehn Minuten.`,
    ttsLanguageCode: 'de-DE',
    questionText: 'Wie lange dauert es zu Fuß?',
    options: [{ label: '5 Minuten', value: '5' }, { label: '10 Minuten', value: '10' }, { label: '15 Minuten', value: '15' }, { label: '20 Minuten', value: '20' }],
    correctAnswer: '10', points: 1, orderIndex: 92, tags: ['Dialog', 'Wegbeschreibung', 'Alltag'], timeSuggested: 45
  },

  // ---- B1 Dialoge ----
  {
    language: 'German', cefrLevel: 'B1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Also, ich sehe, dass Sie Erfahrung im Kundenservice haben. Was hat Sie an dieser Position gereizt?
SPEAKER_B: Mich interessiert ein Wechsel in eine strategischere Rolle. Hier könnte ich neben der Kommunikation auch meine analytischen Fähigkeiten einsetzen.
SPEAKER_A: Verstehe. Wie würden Sie einen sehr unzufriedenen Kunden behandeln?
SPEAKER_B: Ich würde aufmerksam zuhören, das Problem anerkennen und bis Tagesende eine konkrete Lösung suchen.`,
    ttsLanguageCode: 'de-DE',
    questionText: 'Warum möchte der Bewerber diese Position?',
    options: [{ label: 'Für ein höheres Gehalt', value: 'gehalt' }, { label: 'Für eine strategischere Rolle', value: 'strategisch' }, { label: 'Um remote zu arbeiten', value: 'remote' }, { label: 'Um die Stadt zu wechseln', value: 'stadt' }],
    correctAnswer: 'strategisch', points: 1, orderIndex: 93, tags: ['Dialog', 'Vorstellungsgespräch', 'Work-Life'], timeSuggested: 60
  },
  {
    language: 'German', cefrLevel: 'B1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Ich möchte ein Zimmer für drei Nächte reservieren, vom fünfzehnten bis zum achtzehnten März.
SPEAKER_B: Für wie viele Personen?
SPEAKER_A: Zwei Erwachsene. Haben Sie Zimmer mit Meerblick?
SPEAKER_B: Ja, wir haben ein Doppelzimmer mit Meerblick für hundertsechzig Euro pro Nacht. Frühstück inklusive.`,
    ttsLanguageCode: 'de-DE',
    questionText: 'Was kostet das Zimmer pro Nacht?',
    options: [{ label: '140 Euro', value: '140' }, { label: '150 Euro', value: '150' }, { label: '160 Euro', value: '160' }, { label: '180 Euro', value: '180' }],
    correctAnswer: '160', points: 1, orderIndex: 94, tags: ['Dialog', 'Hotel', 'Alltag'], timeSuggested: 60
  },
  {
    language: 'German', cefrLevel: 'B1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Guten Tag, Frau Doktor. Ich habe seit drei Tagen Halsschmerzen und fühle mich schwach.
SPEAKER_B: Hatten Sie Fieber?
SPEAKER_A: Ja, gestern hatte ich achtunddreißig fünf. Heute ist es gesunken.
SPEAKER_B: Ich verschreibe Ihnen ein Antibiotikum für sieben Tage. Nehmen Sie zwei Tabletten täglich nach den Mahlzeiten.`,
    ttsLanguageCode: 'de-DE',
    questionText: 'Wie lange muss er das Antibiotikum einnehmen?',
    options: [{ label: '3 Tage', value: '3' }, { label: '5 Tage', value: '5' }, { label: '7 Tage', value: '7' }, { label: '10 Tage', value: '10' }],
    correctAnswer: '7', points: 1, orderIndex: 95, tags: ['Dialog', 'Arzt', 'Alltag'], timeSuggested: 60
  },
  {
    language: 'German', cefrLevel: 'B1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Das Meeting morgen wurde auf zehn Uhr verschoben. Kannst du teilnehmen?
SPEAKER_B: Um zehn habe ich einen Call mit dem Kunden aus München. Kann ich später dazustoßen?
SPEAKER_A: Fang ruhig später an, kein Problem. Wir schicken die Hauptpunkte in den Slack-Kanal.
SPEAKER_B: Perfekt, danke. Ich versuche bis halb elf da zu sein.`,
    ttsLanguageCode: 'de-DE',
    questionText: 'Warum kommt der Kollege zu spät?',
    options: [{ label: 'Er hat einen anderen Termin', value: 'anderer-termin' }, { label: 'Der Zug hat Verspätung', value: 'zug' }, { label: 'Er ist krank', value: 'krank' }, { label: 'Er hat es vergessen', value: 'vergessen' }],
    correctAnswer: 'anderer-termin', points: 1, orderIndex: 96, tags: ['Dialog', 'Meeting', 'Work-Life'], timeSuggested: 60
  },

  // ---- B2 Dialoge ----
  {
    language: 'German', cefrLevel: 'B2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Der Kunde hat die Deadline auf Freitag vorgezogen. Schaffen wir die Lieferung pünktlich?
SPEAKER_B: Es wird knapp. Entwicklung ist Mittwoch fertig, QA braucht mindestens zwei volle Tage.
SPEAKER_A: Können wir den Umfang reduzieren? Der Reporting-Teil kann warten.
SPEAKER_B: Ja, wenn wir das Reporting auf das nächste Release verschieben, schaffen wir es. Ich informiere den PM.`,
    ttsLanguageCode: 'de-DE',
    questionText: 'Wie werden sie die neue Deadline einhalten?',
    options: [{ label: 'Indem sie nachts arbeiten', value: 'nachts' }, { label: 'Indem sie eine Funktion verschieben', value: 'verschieben' }, { label: 'Indem sie Personen zum Team hinzufügen', value: 'personen' }, { label: 'Indem sie eine Fristverlängerung erbitten', value: 'verlaengerung' }],
    correctAnswer: 'verschieben', points: 1, orderIndex: 97, tags: ['Dialog', 'Projekt', 'Work-Life'], timeSuggested: 75
  },
  {
    language: 'German', cefrLevel: 'B2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Guten Tag, ich möchte eine Erstattung. Das Produkt, das ich erhalten habe, ist defekt.
SPEAKER_B: Das tut mir leid. Haben Sie die Rechnung und ein Foto des Defekts?
SPEAKER_A: Ja, ich habe sie vor drei Tagen per E-Mail geschickt, aber niemand hat geantwortet.
SPEAKER_B: Ich prüfe das sofort. Ich bestätige Ihnen: Ich kann die volle Erstattung noch heute freigeben.`,
    ttsLanguageCode: 'de-DE',
    questionText: 'Was macht der Mitarbeiter am Ende?',
    options: [{ label: 'Er lehnt die Erstattung ab', value: 'lehnt-ab' }, { label: 'Er fordert weitere Unterlagen', value: 'unterlagen' }, { label: 'Er genehmigt die volle Erstattung', value: 'genehmigt' }, { label: 'Er leitet das Gespräch weiter', value: 'weiterleiten' }],
    correctAnswer: 'genehmigt', points: 1, orderIndex: 98, tags: ['Dialog', 'Reklamation', 'Work-Life'], timeSuggested: 75
  },
  {
    language: 'German', cefrLevel: 'B2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Ich würde gern mein Vergütungspaket für das nächste Jahr besprechen.
SPEAKER_B: Natürlich. Sie sollten wissen, dass das Budget begrenzt ist, aber ich höre Ihnen gern zu.
SPEAKER_A: In den letzten Monaten habe ich zwei neue Projekte übernommen und das Team während der Abwesenheit der Vorgesetzten geleitet. Ich suche eine Anerkennung dafür.
SPEAKER_B: Sie haben recht, Ihr Beitrag ist gewachsen. Ich kann eine Erhöhung von sechs Prozent plus einen variablen Bonus an die Ergebnisse gekoppelt anbieten.`,
    ttsLanguageCode: 'de-DE',
    questionText: 'Was bietet die Führungskraft an?',
    options: [{ label: 'Nur einen einmaligen Bonus', value: 'bonus' }, { label: 'Nur eine Gehaltserhöhung', value: 'erhoehung' }, { label: 'Erhöhung plus variablen Bonus', value: 'beides' }, { label: 'Eine Beförderung', value: 'befoerderung' }],
    correctAnswer: 'beides', points: 1, orderIndex: 99, tags: ['Dialog', 'Verhandlung', 'Work-Life'], timeSuggested: 75
  },
  {
    language: 'German', cefrLevel: 'B2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Wie war eigentlich die Fortbildung letzte Woche?
SPEAKER_B: Die Inhalte waren nützlich, aber das Tempo war zu schnell für Einsteiger.
SPEAKER_A: Hast du einen konkreten Vorschlag?
SPEAKER_B: Ja. Ich würde eine optionale Einführungssitzung vor dem Aufbaumodul ergänzen, damit alle vom gleichen Stand starten.`,
    ttsLanguageCode: 'de-DE',
    questionText: 'Was schlägt der Mitarbeiter vor?',
    options: [{ label: 'Den Trainer zu wechseln', value: 'trainer' }, { label: 'Eine optionale Einführungssitzung', value: 'einfuehrung' }, { label: 'Die Gesamtdauer zu verlängern', value: 'verlaengern' }, { label: 'Das Aufbaumodul zu streichen', value: 'streichen' }],
    correctAnswer: 'einfuehrung', points: 1, orderIndex: 100, tags: ['Dialog', 'Fortbildung', 'Work-Life'], timeSuggested: 75
  },

  // ---- C1 Dialoge ----
  {
    language: 'German', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Wir verlieren Marktanteile im jungen Segment. Auf dem Tisch liegen zwei Optionen: eine offensive Social-Media-Kampagne oder eine Überarbeitung des Produkts.
SPEAKER_B: Die Kampagne würde uns sofort Sichtbarkeit verschaffen, aber wenn das Produkt nicht überzeugt, verbrennen wir nur das Budget.
SPEAKER_A: Du schlägst also vor, mit der Produktüberarbeitung zu beginnen?
SPEAKER_B: Genau. Drei Monate Tests in einem kleinen Panel, und das Marketing folgt dann mit einer glaubwürdigen Botschaft.`,
    ttsLanguageCode: 'de-DE',
    questionText: 'Womit ist SPEAKER_B einverstanden?',
    options: [{ label: 'Die Social-Kampagne sofort starten', value: 'social' }, { label: 'Das Marketingbudget erhöhen', value: 'budget' }, { label: 'Zuerst das Produkt überarbeiten', value: 'produkt' }, { label: 'Das junge Segment aufgeben', value: 'aufgeben' }],
    correctAnswer: 'produkt', points: 2, orderIndex: 101, tags: ['Dialog', 'Strategie', 'Work-Life'], timeSuggested: 90
  },
  {
    language: 'German', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Wenn ich auf das abgeschlossene Jahr schaue, hast du drei von vier Zielen erreicht. Hervorragende Arbeit beim Projekt Alpha.
SPEAKER_B: Danke. Das einzige Ziel, das ich nicht erreicht habe, war die Reduzierung der Antwortzeiten des Teams.
SPEAKER_A: Ja, und ich möchte ehrlich sein: Das Ergebnis hing auch von Ressourcen ab, die wir dir nicht gegeben haben. Ich werde es dir nicht negativ anrechnen.
SPEAKER_B: Das schätze ich. Für nächstes Jahr möchte ich die Ressourcenplanung selbst übernehmen, damit ich die Erwartungen besser steuern kann.`,
    ttsLanguageCode: 'de-DE',
    questionText: 'Wie steht die Führungskraft zu dem nicht erreichten Ziel?',
    options: [{ label: 'Sie wertet es voll als Misserfolg', value: 'misserfolg' }, { label: 'Sie führt es auf fehlende Ressourcen zurück', value: 'ressourcen' }, { label: 'Sie will den Mitarbeiter ersetzen', value: 'ersetzen' }, { label: 'Sie kürzt das Gehalt', value: 'gehalt' }],
    correctAnswer: 'ressourcen', points: 2, orderIndex: 102, tags: ['Dialog', 'Review', 'Work-Life'], timeSuggested: 90
  },
  {
    language: 'German', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Der Vertragsentwurf hat bei uns Zweifel an der Exklusivklausel ausgelöst, sie ist sehr weit gefasst.
SPEAKER_B: Verstehe. Es ist eine Standardklausel in unseren Enterprise-Verträgen, wir können sie jedoch auf den Sektor begrenzen, in dem Sie direkt tätig sind.
SPEAKER_A: Eine geografische Begrenzung auf Europa könnte für uns funktionieren.
SPEAKER_B: Verbinden wir beides: Exklusivität beschränkt auf Ihren Kernsektor und den europäischen Markt, für die Dauer des ersten Jahres.`,
    ttsLanguageCode: 'de-DE',
    questionText: 'Worauf einigt man sich am Ende?',
    options: [{ label: 'Die Exklusivität streichen', value: 'streichen' }, { label: 'Weltweite Exklusivität für alle Sektoren', value: 'weltweit' }, { label: 'Exklusivität begrenzt auf Sektor + Europa für ein Jahr', value: 'begrenzt' }, { label: 'Die Entscheidung verschieben', value: 'verschieben' }],
    correctAnswer: 'begrenzt', points: 2, orderIndex: 103, tags: ['Dialog', 'Vertrag', 'Work-Life'], timeSuggested: 90
  },
  {
    language: 'German', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Die Zahlen des ersten Quartals zeigen ein Umsatzwachstum von zwölf Prozent, aber die Marge ist gesunken.
SPEAKER_B: Ja, weil wir stark in die Kundenakquise investiert haben. Das ist eine bewusste Entscheidung.
SPEAKER_A: Wann erwarten wir, dass die Marge wieder auf dem Niveau des Vorjahres ist?
SPEAKER_B: Bis zum vierten Quartal, sobald die wiederkehrenden Kunden die Fixkosten decken.`,
    ttsLanguageCode: 'de-DE',
    questionText: 'Wann soll sich die Marge normalisieren?',
    options: [{ label: 'Im zweiten Quartal', value: 'q2' }, { label: 'Im dritten Quartal', value: 'q3' }, { label: 'Im vierten Quartal', value: 'q4' }, { label: 'Im nächsten Jahr', value: 'naechstes-jahr' }],
    correctAnswer: 'q4', points: 2, orderIndex: 104, tags: ['Dialog', 'Finanzen', 'Work-Life'], timeSuggested: 90
  },

  // ---- C2 Dialoge ----
  {
    language: 'German', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Die Due Diligence hat zwei problematische Bereiche aufgedeckt: eine noch offene Steuerrisikoposition und eine konzentrierte Technologieabhängigkeit.
SPEAKER_B: Die Steuerrisikoposition können wir mit einem speziellen Escrow abdecken. Der Technologieteil bereitet mir mehr Sorgen: Wir hängen an einem einzigen Anbieter ohne Ausstiegsplan.
SPEAKER_A: Wir könnten den Kaufpreis an eine Neuverhandlung dieses Vertrags innerhalb von sechs Monaten nach Closing knüpfen.
SPEAKER_B: Das funktioniert, aber ich würde gern eine Earn-out-Klausel ergänzen: Wenn wir nicht neuverhandeln, wird ein Teil des Kaufpreises einbehalten.`,
    ttsLanguageCode: 'de-DE',
    questionText: 'Was schlägt SPEAKER_B für das Technologierisiko vor?',
    options: [{ label: 'Die Transaktion zu annullieren', value: 'annullieren' }, { label: 'Nur ein Escrow', value: 'escrow' }, { label: 'Eine bedingte Earn-out-Klausel', value: 'earn-out' }, { label: 'Den Preis zu erhöhen', value: 'erhoehen' }],
    correctAnswer: 'earn-out', points: 2, orderIndex: 105, tags: ['Dialog', 'M&A', 'Work-Life'], timeSuggested: 100
  },
  {
    language: 'German', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Der Markt belohnt zunehmend Unternehmen, die skalieren können, ohne ihre Kultur zu verwässern. Wie schaffen Sie das?
SPEAKER_B: Ehrlich gesagt, nicht vollständig. Wir wachsen um dreißig Prozent pro Jahr, und jede neue Einstellungswelle verändert das innere Gefüge.
SPEAKER_A: Welche Gegenmaßnahmen haben Sie ergriffen?
SPEAKER_B: Eine kaskadierende Mentoring-Struktur und eine monatliche Einstellungsobergrenze — wir verzichten lieber auf Bewerber, als die Werte zu verwässern. Das ist nicht unendlich skalierbar, aber für den Moment trägt es.`,
    ttsLanguageCode: 'de-DE',
    questionText: 'Was räumt SPEAKER_B ein?',
    options: [{ label: 'Dass die Unternehmenskultur perfekt ist', value: 'perfekt' }, { label: 'Dass ihre Lösung Grenzen hat', value: 'grenzen' }, { label: 'Dass ihn die Kultur nicht interessiert', value: 'keine-kultur' }, { label: 'Dass sie nächstes Jahr weniger einstellen', value: 'weniger' }],
    correctAnswer: 'grenzen', points: 2, orderIndex: 106, tags: ['Dialog', 'Leadership', 'Work-Life'], timeSuggested: 100
  },
  {
    language: 'German', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Ich habe deinen Projektbericht gelesen, und etwas stimmt nicht. Die Zahlen zur Customer Retention wirken selektiv.
SPEAKER_B: Du hast recht, ich habe die Januar-Kohorte ausgeschlossen, weil sie eine ungewöhnliche Promotion hatte.
SPEAKER_A: Ich verstehe die Logik, aber sie ohne Hinweis im Bericht auszuschließen, stellt die gesamte Analyse infrage.
SPEAKER_B: Du hast recht. Ich überarbeite ihn und füge beide Darstellungen sowie eine klare methodische Anmerkung ein.`,
    ttsLanguageCode: 'de-DE',
    questionText: 'Was ist das aufgeworfene Problem?',
    options: [{ label: 'Die Daten sind gefälscht', value: 'gefaelscht' }, { label: 'Der Ausschluss von Daten wird nicht angegeben', value: 'ausschluss' }, { label: 'Der Bericht ist zu lang', value: 'zu-lang' }, { label: 'Die Zahlen sind zu niedrig', value: 'zu-niedrig' }],
    correctAnswer: 'ausschluss', points: 2, orderIndex: 107, tags: ['Dialog', 'Feedback', 'Work-Life'], timeSuggested: 100
  },
  {
    language: 'German', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Die neue europäische Datenschutzverordnung schreibt vierteljährliche Audits für kritische Lieferanten vor.
SPEAKER_B: Das heißt, wir müssen alle bestehenden Verträge überarbeiten. Wie viel Zeit haben wir?
SPEAKER_A: Die Compliance ist ab dem ersten Januar verpflichtend, also sechs Monate.
SPEAKER_B: Okay, ich schlage eine gemeinsame Taskforce mit dem Legal-Team und dem Lieferantenmanagement vor. Soll ich dir einen Detailplan bis Monatsende vorlegen?`,
    ttsLanguageCode: 'de-DE',
    questionText: 'Wie viel Zeit haben sie, um konform zu sein?',
    options: [{ label: 'Drei Monate', value: '3-monate' }, { label: 'Sechs Monate', value: '6-monate' }, { label: 'Ein Jahr', value: '1-jahr' }, { label: 'Zwei Jahre', value: '2-jahre' }],
    correctAnswer: '6-monate', points: 2, orderIndex: 108, tags: ['Dialog', 'Compliance', 'Work-Life'], timeSuggested: 100
  },
]
