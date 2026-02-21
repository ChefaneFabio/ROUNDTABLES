import { MultiSkillQuestionData } from '../types'

// German Reading Questions — ~7 per CEFR level (42 total)
// Types: READING, MULTIPLE_CHOICE, FILL_BLANK with passages

export const germanReadingQuestions: MultiSkillQuestionData[] = [
  // ============================================================
  // A1 — Beginner (7 questions)
  // ============================================================
  {
    language: 'German', cefrLevel: 'A1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Meine Familie',
    passage: 'Ich heiße Lisa. Ich bin neun Jahre alt. Ich habe eine Schwester. Sie heißt Marie. Sie ist sechs. Wir haben eine Katze. Die Katze ist schwarz. Wir wohnen in einem kleinen Haus.',
    questionText: 'Wie alt ist Lisa?',
    options: [{ label: '6', value: '6' }, { label: '9', value: '9' }, { label: '12', value: '12' }, { label: '8', value: '8' }],
    correctAnswer: '9', points: 1, orderIndex: 1, tags: ['Familie', 'Zahlen']
  },
  {
    language: 'German', cefrLevel: 'A1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Meine Familie',
    passage: 'Ich heiße Lisa. Ich bin neun Jahre alt. Ich habe eine Schwester. Sie heißt Marie. Sie ist sechs. Wir haben eine Katze. Die Katze ist schwarz. Wir wohnen in einem kleinen Haus.',
    questionText: 'Welche Farbe hat die Katze?',
    options: [{ label: 'Weiß', value: 'weiß' }, { label: 'Braun', value: 'braun' }, { label: 'Schwarz', value: 'schwarz' }, { label: 'Grau', value: 'grau' }],
    correctAnswer: 'schwarz', points: 1, orderIndex: 2, tags: ['Familie', 'Farben']
  },
  {
    language: 'German', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'READING',
    passageTitle: 'Im Supermarkt',
    passage: 'Ich gehe in den Supermarkt. Ich kaufe Brot und Butter. Das Brot kostet zwei Euro. Die Butter kostet ein Euro fünfzig. Ich bezahle drei Euro fünfzig.',
    questionText: 'Wie viel kostet das Brot?',
    options: [{ label: 'Ein Euro', value: 'ein Euro' }, { label: 'Zwei Euro', value: 'zwei Euro' }, { label: 'Drei Euro', value: 'drei Euro' }, { label: 'Ein Euro fünfzig', value: 'ein Euro fünfzig' }],
    correctAnswer: 'zwei Euro', points: 1, orderIndex: 3, tags: ['Einkaufen', 'Zahlen']
  },
  {
    language: 'German', cefrLevel: 'A1', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'Ich gehe in den Supermarkt. Ich kaufe Brot und Butter. Das Brot kostet zwei Euro.',
    questionText: 'Ich kaufe Brot und ___.',
    correctAnswer: 'Butter', points: 1, orderIndex: 4, tags: ['Einkaufen']
  },
  {
    language: 'German', cefrLevel: 'A1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Mein Tag',
    passage: 'Ich stehe um sieben Uhr auf. Ich frühstücke. Dann gehe ich zur Schule. Die Schule beginnt um acht Uhr dreißig. Ich komme um drei Uhr nach Hause. Ich spiele mit meinen Freunden.',
    questionText: 'Wann beginnt die Schule?',
    options: [{ label: '7:00', value: '7:00' }, { label: '8:30', value: '8:30' }, { label: '3:00', value: '3:00' }, { label: '9:00', value: '9:00' }],
    correctAnswer: '8:30', points: 1, orderIndex: 5, tags: ['Tagesablauf', 'Uhrzeit']
  },
  {
    language: 'German', cefrLevel: 'A1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Mein Tag',
    passage: 'Ich stehe um sieben Uhr auf. Ich frühstücke. Dann gehe ich zur Schule. Die Schule beginnt um acht Uhr dreißig. Ich komme um drei Uhr nach Hause. Ich spiele mit meinen Freunden.',
    questionText: 'Was macht die Person nach der Schule?',
    options: [{ label: 'Sie isst Abendessen', value: 'sie isst Abendessen' }, { label: 'Sie spielt mit Freunden', value: 'sie spielt mit Freunden' }, { label: 'Sie geht einkaufen', value: 'sie geht einkaufen' }, { label: 'Sie sieht fern', value: 'sie sieht fern' }],
    correctAnswer: 'sie spielt mit Freunden', points: 1, orderIndex: 6, tags: ['Tagesablauf']
  },
  {
    language: 'German', cefrLevel: 'A1', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'Ich stehe um sieben Uhr auf. Ich frühstücke. Dann gehe ich zur Schule.',
    questionText: 'Ich stehe um sieben ___ auf. (Schreiben Sie das fehlende Wort)',
    correctAnswer: 'Uhr', points: 1, orderIndex: 7, tags: ['Uhrzeit']
  },

  // ============================================================
  // A2 — Elementary (7 questions)
  // ============================================================
  {
    language: 'German', cefrLevel: 'A2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Ein Ausflug nach München',
    passage: 'Letzten Sommer hat Maria München besucht. Sie hat in einem Hotel in der Nähe vom Marienplatz übernachtet. Sie hat den Englischen Garten, das Deutsche Museum und die Frauenkirche besichtigt. Das Wetter war warm und sonnig. Sie hat viele Fotos gemacht und Souvenirs für ihre Familie gekauft.',
    questionText: 'Wo hat Maria in München übernachtet?',
    options: [{ label: 'Bei Freunden', value: 'bei Freunden' }, { label: 'In einem Hotel nahe dem Marienplatz', value: 'in einem Hotel nahe dem Marienplatz' }, { label: 'In einer Wohnung', value: 'in einer Wohnung' }, { label: 'In einer Jugendherberge', value: 'in einer Jugendherberge' }],
    correctAnswer: 'in einem Hotel nahe dem Marienplatz', points: 1, orderIndex: 8, tags: ['Reisen', 'Perfekt']
  },
  {
    language: 'German', cefrLevel: 'A2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Ein Ausflug nach München',
    passage: 'Letzten Sommer hat Maria München besucht. Sie hat in einem Hotel in der Nähe vom Marienplatz übernachtet. Sie hat den Englischen Garten, das Deutsche Museum und die Frauenkirche besichtigt. Das Wetter war warm und sonnig. Sie hat viele Fotos gemacht und Souvenirs für ihre Familie gekauft.',
    questionText: 'Wie war das Wetter?',
    options: [{ label: 'Kalt und regnerisch', value: 'kalt und regnerisch' }, { label: 'Warm und sonnig', value: 'warm und sonnig' }, { label: 'Bewölkt', value: 'bewölkt' }, { label: 'Windig', value: 'windig' }],
    correctAnswer: 'warm und sonnig', points: 1, orderIndex: 9, tags: ['Reisen', 'Wetter']
  },
  {
    language: 'German', cefrLevel: 'A2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Das neue Restaurant',
    passage: 'Ein neues griechisches Restaurant hat letzten Monat in der Hauptstraße eröffnet. Das Restaurant heißt „Akropolis". Es serviert Gyros, Salate und Moussaka. Die Preise sind nicht teuer. Viele Leute gehen am Wochenende dorthin. Das Restaurant ist jeden Tag außer Dienstag von elf bis zweiundzwanzig Uhr geöffnet.',
    questionText: 'Wann ist das Restaurant geschlossen?',
    options: [{ label: 'Sonntag', value: 'Sonntag' }, { label: 'Samstag', value: 'Samstag' }, { label: 'Dienstag', value: 'Dienstag' }, { label: 'Montag', value: 'Montag' }],
    correctAnswer: 'Dienstag', points: 1, orderIndex: 10, tags: ['Essen', 'Orte']
  },
  {
    language: 'German', cefrLevel: 'A2', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'Ein neues griechisches Restaurant hat letzten Monat in der Hauptstraße eröffnet. Das Restaurant heißt „Akropolis".',
    questionText: 'Das Restaurant heißt „___".',
    correctAnswer: 'Akropolis', points: 1, orderIndex: 11, tags: ['Essen', 'Orte']
  },
  {
    language: 'German', cefrLevel: 'A2', questionType: 'READING', skill: 'READING',
    passageTitle: 'E-Mail an einen Freund',
    passage: 'Hallo Tom, ich hoffe, es geht dir gut. Ich bin letzte Woche in eine neue Wohnung umgezogen. Sie ist größer als meine alte Wohnung. Sie hat zwei Schlafzimmer, eine Küche und einen schönen Balkon. Die Nachbarschaft ist ruhig und es gibt einen Park in der Nähe. Möchtest du nächstes Wochenende vorbeikommen? Viele Grüße, Sarah',
    questionText: 'Warum hat Sarah an Tom geschrieben?',
    options: [{ label: 'Um ihn einzuladen', value: 'um ihn einzuladen' }, { label: 'Um Geld zu bitten', value: 'um Geld zu bitten' }, { label: 'Um sich zu verabschieden', value: 'um sich zu verabschieden' }, { label: 'Um sich zu beschweren', value: 'um sich zu beschweren' }],
    correctAnswer: 'um ihn einzuladen', points: 1, orderIndex: 12, tags: ['Kommunikation', 'Wohnung']
  },
  {
    language: 'German', cefrLevel: 'A2', questionType: 'READING', skill: 'READING',
    passageTitle: 'E-Mail an einen Freund',
    passage: 'Hallo Tom, ich hoffe, es geht dir gut. Ich bin letzte Woche in eine neue Wohnung umgezogen. Sie ist größer als meine alte Wohnung. Sie hat zwei Schlafzimmer, eine Küche und einen schönen Balkon. Die Nachbarschaft ist ruhig und es gibt einen Park in der Nähe. Möchtest du nächstes Wochenende vorbeikommen? Viele Grüße, Sarah',
    questionText: 'Wie viele Schlafzimmer hat die neue Wohnung?',
    options: [{ label: 'Eins', value: 'eins' }, { label: 'Zwei', value: 'zwei' }, { label: 'Drei', value: 'drei' }, { label: 'Vier', value: 'vier' }],
    correctAnswer: 'zwei', points: 1, orderIndex: 13, tags: ['Wohnung']
  },
  {
    language: 'German', cefrLevel: 'A2', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'Ich bin letzte Woche in eine neue Wohnung umgezogen. Sie ist größer als meine alte Wohnung.',
    questionText: 'Die neue Wohnung ist ___ als die alte.',
    correctAnswer: 'größer', points: 1, orderIndex: 14, tags: ['Komparativ']
  },

  // ============================================================
  // B1 — Intermediate (7 questions)
  // ============================================================
  {
    language: 'German', cefrLevel: 'B1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Homeoffice',
    passage: 'Die Zahl der Menschen, die von zu Hause aus arbeiten, ist seit 2020 deutlich gestiegen. Viele Unternehmen haben festgestellt, dass ihre Mitarbeiter zu Hause genauso produktiv sein können wie im Büro. Allerdings berichten einige Arbeitnehmer, dass sie sich isoliert fühlen und den sozialen Kontakt am Arbeitsplatz vermissen. Unternehmen versuchen nun, eine Balance zu finden, wobei viele ein hybrides Modell einführen, bei dem die Mitarbeiter zwei oder drei Tage pro Woche von zu Hause aus arbeiten.',
    questionText: 'Was ist ein „hybrides Modell" laut dem Text?',
    options: [
      { label: 'Nur von zu Hause arbeiten', value: 'nur von zu Hause arbeiten' },
      { label: 'Einige Tage zu Hause und einige im Büro arbeiten', value: 'einige Tage zu Hause und einige im Büro arbeiten' },
      { label: 'Nur im Büro arbeiten', value: 'nur im Büro arbeiten' },
      { label: 'In verschiedenen Büros arbeiten', value: 'in verschiedenen Büros arbeiten' }
    ],
    correctAnswer: 'einige Tage zu Hause und einige im Büro arbeiten', points: 2, orderIndex: 15, tags: ['Arbeit', 'modernes Leben']
  },
  {
    language: 'German', cefrLevel: 'B1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Homeoffice',
    passage: 'Die Zahl der Menschen, die von zu Hause aus arbeiten, ist seit 2020 deutlich gestiegen. Viele Unternehmen haben festgestellt, dass ihre Mitarbeiter zu Hause genauso produktiv sein können wie im Büro. Allerdings berichten einige Arbeitnehmer, dass sie sich isoliert fühlen und den sozialen Kontakt am Arbeitsplatz vermissen.',
    questionText: 'Welches Problem haben manche Arbeitnehmer im Homeoffice?',
    options: [
      { label: 'Sie verdienen weniger Geld', value: 'sie verdienen weniger Geld' },
      { label: 'Sie fühlen sich isoliert', value: 'sie fühlen sich isoliert' },
      { label: 'Sie arbeiten zu viele Stunden', value: 'sie arbeiten zu viele Stunden' },
      { label: 'Sie haben technische Probleme', value: 'sie haben technische Probleme' }
    ],
    correctAnswer: 'sie fühlen sich isoliert', points: 2, orderIndex: 16, tags: ['Arbeit']
  },
  {
    language: 'German', cefrLevel: 'B1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Die Vorteile von Bewegung',
    passage: 'Regelmäßige körperliche Bewegung hat nachweislich zahlreiche gesundheitliche Vorteile. Sie verringert das Risiko von Herzerkrankungen, hilft bei der Gewichtskontrolle und verbessert die psychische Gesundheit. Studien zeigen, dass bereits dreißig Minuten moderate Bewegung, wie zum Beispiel Spazierengehen, fünfmal pro Woche einen erheblichen Unterschied machen können. Trotzdem bewegen sich viele Erwachsene nicht genug. Häufige Gründe sind Zeitmangel, fehlende Motivation oder kein Zugang zu Sporteinrichtungen.',
    questionText: 'Wie viel wöchentliche Bewegung empfiehlt der Text?',
    options: [
      { label: 'Dreißig Minuten einmal pro Woche', value: 'dreißig Minuten einmal pro Woche' },
      { label: 'Dreißig Minuten fünfmal pro Woche', value: 'dreißig Minuten fünfmal pro Woche' },
      { label: 'Eine Stunde jeden Tag', value: 'eine Stunde jeden Tag' },
      { label: 'Zwei Stunden dreimal pro Woche', value: 'zwei Stunden dreimal pro Woche' }
    ],
    correctAnswer: 'dreißig Minuten fünfmal pro Woche', points: 2, orderIndex: 17, tags: ['Gesundheit', 'Bewegung']
  },
  {
    language: 'German', cefrLevel: 'B1', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'Regelmäßige körperliche Bewegung hat nachweislich zahlreiche gesundheitliche Vorteile. Sie verringert das Risiko von Herzerkrankungen, hilft bei der Gewichtskontrolle und verbessert die psychische Gesundheit.',
    questionText: 'Bewegung verbessert die ___ Gesundheit. (Welche Art von Gesundheit neben der körperlichen?)',
    correctAnswer: 'psychische', points: 2, orderIndex: 18, tags: ['Gesundheit']
  },
  {
    language: 'German', cefrLevel: 'B1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Plastikverschmutzung',
    passage: 'Plastikverschmutzung ist zu einem der drängendsten Umweltprobleme geworden. Jedes Jahr landen Millionen Tonnen Plastikmüll in den Ozeanen und schaden der Tierwelt im Meer. Viele Länder haben begonnen, Einwegplastik wie Tüten und Strohhalme zu verbieten. Die Recyclingquoten haben sich verbessert, aber Experten sagen, dass wir unseren Plastikverbrauch insgesamt reduzieren müssen, nicht nur mehr recyceln.',
    questionText: 'Was ist laut Experten wichtiger als Recycling?',
    options: [
      { label: 'Mehr Plastik produzieren', value: 'mehr Plastik produzieren' },
      { label: 'Den Plastikverbrauch reduzieren', value: 'den Plastikverbrauch reduzieren' },
      { label: 'Andere Materialien verwenden', value: 'andere Materialien verwenden' },
      { label: 'Mehr Fabriken bauen', value: 'mehr Fabriken bauen' }
    ],
    correctAnswer: 'den Plastikverbrauch reduzieren', points: 2, orderIndex: 19, tags: ['Umwelt']
  },
  {
    language: 'German', cefrLevel: 'B1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Plastikverschmutzung',
    passage: 'Plastikverschmutzung ist zu einem der drängendsten Umweltprobleme geworden. Jedes Jahr landen Millionen Tonnen Plastikmüll in den Ozeanen und schaden der Tierwelt im Meer. Viele Länder haben begonnen, Einwegplastik wie Tüten und Strohhalme zu verbieten.',
    questionText: 'Welche Beispiele für Einwegplastik werden genannt?',
    options: [
      { label: 'Flaschen und Becher', value: 'Flaschen und Becher' },
      { label: 'Tüten und Strohhalme', value: 'Tüten und Strohhalme' },
      { label: 'Behälter und Verpackungen', value: 'Behälter und Verpackungen' },
      { label: 'Teller und Gabeln', value: 'Teller und Gabeln' }
    ],
    correctAnswer: 'Tüten und Strohhalme', points: 2, orderIndex: 20, tags: ['Umwelt']
  },
  {
    language: 'German', cefrLevel: 'B1', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'Plastikverschmutzung ist zu einem der drängendsten Umweltprobleme geworden. Jedes Jahr landen Millionen Tonnen Plastikmüll in den Ozeanen.',
    questionText: 'Millionen Tonnen Plastik landen in den ___.',
    correctAnswer: 'Ozeanen', points: 2, orderIndex: 21, tags: ['Umwelt']
  },

  // ============================================================
  // B2 — Upper Intermediate (7 questions)
  // ============================================================
  {
    language: 'German', cefrLevel: 'B2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Die Gig-Wirtschaft',
    passage: 'Die Gig-Wirtschaft hat die Art und Weise, wie Millionen von Menschen arbeiten, verändert. Plattformen wie Uber, Lieferando und Fiverr verbinden freiberufliche Arbeitnehmer mit Kunden, die bestimmte Dienstleistungen benötigen. Befürworter argumentieren, dass sie Flexibilität und Unabhängigkeit bietet und es den Menschen ermöglicht, nach ihren eigenen Bedingungen zu arbeiten. Kritiker weisen jedoch darauf hin, dass Gig-Arbeiter oft keine Leistungen wie Krankenversicherung, bezahlten Urlaub und Rentenbeiträge erhalten. Die Debatte darüber, ob Gig-Arbeiter als Angestellte oder als unabhängige Auftragnehmer eingestuft werden sollten, dauert weltweit an.',
    questionText: 'Was ist die Hauptkontroverse rund um Gig-Arbeiter?',
    options: [
      { label: 'Ob sie mehr Steuern zahlen sollten', value: 'ob sie mehr Steuern zahlen sollten' },
      { label: 'Ob sie als Angestellte oder Auftragnehmer eingestuft werden sollten', value: 'ob sie als Angestellte oder Auftragnehmer eingestuft werden sollten' },
      { label: 'Ob sie qualifiziert genug sind', value: 'ob sie qualifiziert genug sind' },
      { label: 'Ob sie zu viele Stunden arbeiten', value: 'ob sie zu viele Stunden arbeiten' }
    ],
    correctAnswer: 'ob sie als Angestellte oder Auftragnehmer eingestuft werden sollten', points: 2, orderIndex: 22, tags: ['Arbeit', 'Wirtschaft']
  },
  {
    language: 'German', cefrLevel: 'B2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Die Gig-Wirtschaft',
    passage: 'Befürworter argumentieren, dass die Gig-Wirtschaft Flexibilität und Unabhängigkeit bietet. Kritiker weisen jedoch darauf hin, dass Gig-Arbeiter oft keine Leistungen wie Krankenversicherung, bezahlten Urlaub und Rentenbeiträge erhalten.',
    questionText: 'Welche Leistung wird NICHT als fehlend für Gig-Arbeiter erwähnt?',
    options: [
      { label: 'Krankenversicherung', value: 'Krankenversicherung' },
      { label: 'Bezahlter Urlaub', value: 'bezahlter Urlaub' },
      { label: 'Weiterbildungsmöglichkeiten', value: 'Weiterbildungsmöglichkeiten' },
      { label: 'Rentenbeiträge', value: 'Rentenbeiträge' }
    ],
    correctAnswer: 'Weiterbildungsmöglichkeiten', points: 2, orderIndex: 23, tags: ['Arbeit', 'Wirtschaft']
  },
  {
    language: 'German', cefrLevel: 'B2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Schlaf und Lernen',
    passage: 'Neuere neurowissenschaftliche Forschungen haben einen starken Zusammenhang zwischen Schlaf und Gedächtniskonsolidierung aufgedeckt. Während des Tiefschlafs wiederholt und stärkt das Gehirn neuronale Bahnen, die während der Wachstunden gebildet wurden, und überträgt so Informationen vom Kurzzeit- ins Langzeitgedächtnis. Studierende, die nach dem Lernen ausreichend schlafen, schneiden bei Prüfungen deutlich besser ab als diejenigen, die bis spät in die Nacht pauken. Darüber hinaus beeinträchtigt Schlafmangel kognitive Funktionen wie Aufmerksamkeit, Problemlösung und kreatives Denken.',
    questionText: 'Was passiert laut dem Text im Tiefschlaf?',
    options: [
      { label: 'Das Gehirn hört auf, Informationen zu verarbeiten', value: 'das Gehirn hört auf zu verarbeiten' },
      { label: 'Das Gehirn wiederholt und stärkt neuronale Bahnen', value: 'das Gehirn wiederholt und stärkt neuronale Bahnen' },
      { label: 'Neue Erinnerungen werden gelöscht', value: 'neue Erinnerungen werden gelöscht' },
      { label: 'Das Gehirn schafft neue neuronale Bahnen', value: 'das Gehirn schafft neue neuronale Bahnen' }
    ],
    correctAnswer: 'das Gehirn wiederholt und stärkt neuronale Bahnen', points: 2, orderIndex: 24, tags: ['Wissenschaft', 'Bildung']
  },
  {
    language: 'German', cefrLevel: 'B2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Schlaf und Lernen',
    passage: 'Studierende, die nach dem Lernen ausreichend schlafen, schneiden bei Prüfungen deutlich besser ab als diejenigen, die bis spät in die Nacht pauken. Darüber hinaus beeinträchtigt Schlafmangel kognitive Funktionen wie Aufmerksamkeit, Problemlösung und kreatives Denken.',
    questionText: 'Welche kognitiven Funktionen werden durch Schlafmangel beeinträchtigt?',
    options: [
      { label: 'Gedächtnis, Sprache und Gehör', value: 'Gedächtnis, Sprache und Gehör' },
      { label: 'Aufmerksamkeit, Problemlösung und kreatives Denken', value: 'Aufmerksamkeit, Problemlösung und kreatives Denken' },
      { label: 'Lesen, Schreiben und Sprechen', value: 'Lesen, Schreiben und Sprechen' },
      { label: 'Sehen, Hören und Gleichgewicht', value: 'Sehen, Hören und Gleichgewicht' }
    ],
    correctAnswer: 'Aufmerksamkeit, Problemlösung und kreatives Denken', points: 2, orderIndex: 25, tags: ['Wissenschaft']
  },
  {
    language: 'German', cefrLevel: 'B2', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'Während des Tiefschlafs wiederholt und stärkt das Gehirn neuronale Bahnen und überträgt so Informationen vom Kurzzeit- ins Langzeitgedächtnis.',
    questionText: 'Schlaf hilft, Informationen vom Kurzzeit- ins ___gedächtnis zu übertragen.',
    correctAnswer: 'Langzeit', points: 2, orderIndex: 26, tags: ['Wissenschaft']
  },
  {
    language: 'German', cefrLevel: 'B2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Urbane Landwirtschaft',
    passage: 'Urbane Landwirtschaft gewinnt in Städten weltweit an Beliebtheit als Reaktion auf Ernährungssicherheitsbedenken und Umweltbewusstsein. Dachgärten, vertikale Farmen und Gemeinschaftsgärten verwandeln ungenutzte städtische Flächen in produktive Nahrungsquellen. Befürworter argumentieren, dass urbane Landwirtschaft Transportkosten und Emissionen reduziert, frischere Produkte liefert und die Gemeinschaft stärkt. Es bleiben jedoch Herausforderungen, darunter begrenzter Platz, Bodenkontamination in ehemaligen Industriegebieten und die hohen Kosten für den Aufbau von Indoor-Anbauanlagen.',
    questionText: 'Welche Herausforderung der urbanen Landwirtschaft wird im Text erwähnt?',
    options: [
      { label: 'Zu viel Wasser', value: 'zu viel Wasser' },
      { label: 'Bodenkontamination', value: 'Bodenkontamination' },
      { label: 'Zu viele Landwirte', value: 'zu viele Landwirte' },
      { label: 'Mangelndes Interesse', value: 'mangelndes Interesse' }
    ],
    correctAnswer: 'Bodenkontamination', points: 2, orderIndex: 27, tags: ['Umwelt', 'Stadt']
  },
  {
    language: 'German', cefrLevel: 'B2', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'Dachgärten, vertikale Farmen und Gemeinschaftsgärten verwandeln ungenutzte städtische Flächen in produktive Nahrungsquellen.',
    questionText: '___ Farmen sind eine Art der urbanen Landwirtschaft, die vertikalen Raum nutzt.',
    correctAnswer: 'Vertikale', points: 2, orderIndex: 28, tags: ['Umwelt']
  },

  // ============================================================
  // C1 — Advanced (7 questions)
  // ============================================================
  {
    language: 'German', cefrLevel: 'C1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Die Ethik der KI',
    passage: 'Der rasche Fortschritt der künstlichen Intelligenz hat tiefgreifende ethische Fragen aufgeworfen, mit denen sich die Gesellschaft auseinandersetzen muss. Algorithmische Voreingenommenheit, bei der KI-Systeme bestehende gesellschaftliche Vorurteile fortschreiben oder verstärken, wurde in Bereichen von der Strafjustiz bis zur Einstellungspraxis dokumentiert. Die Undurchsichtigkeit von Deep-Learning-Modellen — oft als „Black-Box"-Problem bezeichnet — macht es schwierig zu verstehen, warum ein KI-System bestimmte Entscheidungen trifft, und wirft Fragen der Verantwortlichkeit auf. Darüber hinaus stellt die potenzielle Verdrängung von Arbeitnehmern durch Automatisierung erhebliche sozioökonomische Herausforderungen dar, die proaktive politische Maßnahmen erfordern.',
    questionText: 'Was bedeutet das „Black-Box"-Problem im Kontext der KI?',
    options: [
      { label: 'KI-Systeme sind teuer', value: 'KI-Systeme sind teuer' },
      { label: 'KI-Entscheidungsprozesse sind nicht transparent', value: 'KI-Entscheidungsprozesse sind nicht transparent' },
      { label: 'KI-Systeme fallen häufig aus', value: 'KI-Systeme fallen häufig aus' },
      { label: 'KI-Hardware ist schwer herzustellen', value: 'KI-Hardware ist schwer herzustellen' }
    ],
    correctAnswer: 'KI-Entscheidungsprozesse sind nicht transparent', points: 3, orderIndex: 29, tags: ['Technologie', 'Ethik']
  },
  {
    language: 'German', cefrLevel: 'C1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Die Ethik der KI',
    passage: 'Algorithmische Voreingenommenheit, bei der KI-Systeme bestehende gesellschaftliche Vorurteile fortschreiben oder verstärken, wurde in Bereichen von der Strafjustiz bis zur Einstellungspraxis dokumentiert. Die Undurchsichtigkeit von Deep-Learning-Modellen macht es schwierig zu verstehen, warum ein KI-System bestimmte Entscheidungen trifft, und wirft Fragen der Verantwortlichkeit auf.',
    questionText: 'Das Wort „Undurchsichtigkeit" im Text bedeutet am ehesten:',
    options: [
      { label: 'Transparenz', value: 'Transparenz' },
      { label: 'Effizienz', value: 'Effizienz' },
      { label: 'Mangel an Transparenz', value: 'Mangel an Transparenz' },
      { label: 'Komplexität', value: 'Komplexität' }
    ],
    correctAnswer: 'Mangel an Transparenz', points: 3, orderIndex: 30, tags: ['Wortschatz', 'Technologie']
  },
  {
    language: 'German', cefrLevel: 'C1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Sprache und Denken',
    passage: 'Die Sapir-Whorf-Hypothese, die besagt, dass die Struktur einer Sprache die Weltanschauung und Kognition ihrer Sprecher beeinflusst, ist in der Linguistik Gegenstand erheblicher Debatten. Die starke Version — der linguistische Determinismus — legt nahe, dass Sprache das Denken bestimmt, während die schwächere Version — die linguistische Relativität — vorschlägt, dass Sprache lediglich Denkmuster beeinflusst. Die zeitgenössische Forschung hat weitgehend die schwächere Form bestätigt und gezeigt, dass Sprecher verschiedener Sprachen Zeit, Raum und Farbe unterschiedlich wahrnehmen können, allerdings nicht in dem Maße, dass sie Konzepte, die in ihrer Sprache fehlen, nicht erfassen könnten.',
    questionText: 'Was ist der Unterschied zwischen linguistischem Determinismus und linguistischer Relativität?',
    options: [
      { label: 'Determinismus sagt, Sprache bestimmt das Denken; Relativität sagt, sie beeinflusst es', value: 'Determinismus bestimmt, Relativität beeinflusst' },
      { label: 'Es sind die gleichen Konzepte mit verschiedenen Namen', value: 'gleiche Konzepte' },
      { label: 'Determinismus betrifft Grammatik; Relativität betrifft Wortschatz', value: 'Grammatik vs. Wortschatz' },
      { label: 'Determinismus ist neuer als Relativität', value: 'Determinismus ist neuer' }
    ],
    correctAnswer: 'Determinismus bestimmt, Relativität beeinflusst', points: 3, orderIndex: 31, tags: ['Linguistik', 'Philosophie']
  },
  {
    language: 'German', cefrLevel: 'C1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Sprache und Denken',
    passage: 'Die zeitgenössische Forschung hat weitgehend die schwächere Form bestätigt und gezeigt, dass Sprecher verschiedener Sprachen Zeit, Raum und Farbe unterschiedlich wahrnehmen können, allerdings nicht in dem Maße, dass sie Konzepte, die in ihrer Sprache fehlen, nicht erfassen könnten.',
    questionText: 'Was hat die zeitgenössische Forschung zur Sapir-Whorf-Hypothese ergeben?',
    options: [
      { label: 'Die starke Version ist korrekt', value: 'starke Version korrekt' },
      { label: 'Beide Versionen sind falsch', value: 'beide falsch' },
      { label: 'Die schwächere Version wird weitgehend bestätigt', value: 'schwächere Version bestätigt' },
      { label: 'Die Hypothese wurde vollständig widerlegt', value: 'vollständig widerlegt' }
    ],
    correctAnswer: 'schwächere Version bestätigt', points: 3, orderIndex: 32, tags: ['Linguistik']
  },
  {
    language: 'German', cefrLevel: 'C1', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'Die Sapir-Whorf-Hypothese besagt, dass die Struktur einer Sprache die Weltanschauung und Kognition ihrer Sprecher beeinflusst.',
    questionText: 'Die Sapir-Whorf-Hypothese betrifft die Beziehung zwischen Sprache und ___.',
    correctAnswer: 'Kognition', points: 3, orderIndex: 33, tags: ['Linguistik']
  },
  {
    language: 'German', cefrLevel: 'C1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Verhaltensökonomie',
    passage: 'Die traditionelle Wirtschaftstheorie geht davon aus, dass Individuen rationale Entscheidungen treffen, um ihren Nutzen zu maximieren. Die Verhaltensökonomie, die von Forschern wie Daniel Kahneman und Amos Tversky begründet wurde, stellt diese Annahme infrage, indem sie systematische kognitive Verzerrungen aufzeigt, die zu irrationalem Entscheidungsverhalten führen. Das Konzept der „Verlustaversion" — die Tendenz, Verluste stärker zu vermeiden als gleichwertige Gewinne anzustreben — hat weitreichende Auswirkungen auf die Gestaltung von Politik, Marketing und Finanzplanung.',
    questionText: 'Was bedeutet „Verlustaversion"?',
    options: [
      { label: 'Menschen nehmen lieber Risiken in Kauf', value: 'Menschen nehmen Risiken in Kauf' },
      { label: 'Menschen empfinden Verluste stärker als gleichwertige Gewinne', value: 'Verluste stärker als Gewinne' },
      { label: 'Menschen vermeiden jede finanzielle Entscheidung', value: 'vermeiden finanzielle Entscheidungen' },
      { label: 'Menschen wählen immer die günstigste Option', value: 'günstigste Option' }
    ],
    correctAnswer: 'Verluste stärker als Gewinne', points: 3, orderIndex: 34, tags: ['Wirtschaft', 'Psychologie']
  },
  {
    language: 'German', cefrLevel: 'C1', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'Die Verhaltensökonomie stellt die Annahme infrage, dass Individuen rationale Entscheidungen treffen, um ihren Nutzen zu maximieren.',
    questionText: 'Die Verhaltensökonomie zeigt systematische kognitive ___ auf, die zu irrationalem Entscheidungsverhalten führen.',
    correctAnswer: 'Verzerrungen', points: 3, orderIndex: 35, tags: ['Wirtschaft']
  },

  // ============================================================
  // C2 — Proficiency (7 questions)
  // ============================================================
  {
    language: 'German', cefrLevel: 'C2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Postfaktisch und epistemische Krise',
    passage: 'Die Verbreitung von Fehlinformationen im digitalen Zeitalter hat das herbeigeführt, was Philosophen als „epistemische Krise" bezeichnen — einen grundlegenden Zusammenbruch der Fähigkeit einer Gesellschaft, gemeinsame Wahrheiten zu etablieren. Das Phänomen wird durch algorithmische Echokammern verschärft, die bestehende Überzeugungen verstärken, durch die Kommodifizierung der Aufmerksamkeit, die Sensationalismus gegenüber Genauigkeit begünstigt, und durch den Vertrauensverlust in traditionelle epistemische Autoritäten wie wissenschaftliche Institutionen und Qualitätsjournalismus. Einige Wissenschaftler argumentieren, dass der Begriff der objektiven Wahrheit durch ein „postfaktisches" Paradigma verdrängt wurde, in dem emotionale Resonanz und Stammeszugehörigkeit empirische Evidenz in der Gestaltung des öffentlichen Diskurses überlagern.',
    questionText: 'Was trägt laut dem Text zur „epistemischen Krise" bei?',
    options: [
      { label: 'Verbesserte Bildungssysteme', value: 'verbesserte Bildung' },
      { label: 'Algorithmische Echokammern, Kommodifizierung der Aufmerksamkeit und Vertrauensverlust', value: 'Echokammern, Aufmerksamkeitskommodifizierung, Vertrauensverlust' },
      { label: 'Erhöhte Forschungsfinanzierung', value: 'erhöhte Forschungsfinanzierung' },
      { label: 'Besserer Zugang zu Informationen', value: 'besserer Zugang zu Informationen' }
    ],
    correctAnswer: 'Echokammern, Aufmerksamkeitskommodifizierung, Vertrauensverlust', points: 3, orderIndex: 36, tags: ['Philosophie', 'Medien']
  },
  {
    language: 'German', cefrLevel: 'C2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Postfaktisch und epistemische Krise',
    passage: 'Einige Wissenschaftler argumentieren, dass der Begriff der objektiven Wahrheit durch ein „postfaktisches" Paradigma verdrängt wurde, in dem emotionale Resonanz und Stammeszugehörigkeit empirische Evidenz in der Gestaltung des öffentlichen Diskurses überlagern.',
    questionText: 'Was bedeutet „verdrängt" in diesem Kontext?',
    options: [
      { label: 'Unterstützt', value: 'unterstützt' },
      { label: 'Ersetzt', value: 'ersetzt' },
      { label: 'Hinterfragt', value: 'hinterfragt' },
      { label: 'Verbessert', value: 'verbessert' }
    ],
    correctAnswer: 'ersetzt', points: 3, orderIndex: 37, tags: ['Wortschatz']
  },
  {
    language: 'German', cefrLevel: 'C2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Quantenbewusstsein',
    passage: 'Die Theorie der orchestrierten objektiven Reduktion (Orch-OR), vorgeschlagen von dem Physiker Roger Penrose und dem Anästhesiologen Stuart Hameroff, postuliert, dass Bewusstsein aus Quantenberechnungen innerhalb von Mikrotubuli in Neuronen entsteht. Diese kontroverse Hypothese legt nahe, dass das Gehirn kein bloß klassischer Computer ist, sondern auf einer fundamental quantenmechanischen Ebene operiert. Kritiker wenden ein, dass die warme, feuchte Umgebung des Gehirns eine Quantendekohärenz viel zu schnell verursachen würde, als dass solche Prozesse biologisch relevant sein könnten. Dennoch haben jüngste Experimente, die Quanteneffekte in biologischen Systemen nachweisen — wie bei der Photosynthese und der Vogelnavigation —, der breiteren Vorstellung, dass Quantenmechanik eine Rolle in biologischen Prozessen spielen könnte, eine gewisse Glaubwürdigkeit verliehen.',
    questionText: 'Was ist die Hauptkritik an der Orch-OR-Theorie?',
    options: [
      { label: 'Sie hat keine mathematischen Grundlagen', value: 'keine mathematischen Grundlagen' },
      { label: 'Quantendekohärenz würde im Gehirn zu schnell eintreten', value: 'Dekohärenz zu schnell' },
      { label: 'Penrose ist kein Neurowissenschaftler', value: 'kein Neurowissenschaftler' },
      { label: 'Mikrotubuli existieren nicht in Neuronen', value: 'Mikrotubuli existieren nicht' }
    ],
    correctAnswer: 'Dekohärenz zu schnell', points: 3, orderIndex: 38, tags: ['Wissenschaft', 'Philosophie']
  },
  {
    language: 'German', cefrLevel: 'C2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Quantenbewusstsein',
    passage: 'Jüngste Experimente, die Quanteneffekte in biologischen Systemen nachweisen — wie bei der Photosynthese und der Vogelnavigation —, haben der breiteren Vorstellung, dass Quantenmechanik eine Rolle in biologischen Prozessen spielen könnte, eine gewisse Glaubwürdigkeit verliehen.',
    questionText: 'Bei welchen biologischen Prozessen wurden Hinweise auf Quanteneffekte gefunden?',
    options: [
      { label: 'Verdauung und Atmung', value: 'Verdauung und Atmung' },
      { label: 'Photosynthese und Vogelnavigation', value: 'Photosynthese und Vogelnavigation' },
      { label: 'Blutkreislauf und Immunreaktion', value: 'Blutkreislauf und Immunreaktion' },
      { label: 'Zellteilung und Proteinsynthese', value: 'Zellteilung und Proteinsynthese' }
    ],
    correctAnswer: 'Photosynthese und Vogelnavigation', points: 3, orderIndex: 39, tags: ['Wissenschaft']
  },
  {
    language: 'German', cefrLevel: 'C2', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'Die Orch-OR-Theorie postuliert, dass Bewusstsein aus Quantenberechnungen innerhalb von Mikrotubuli in Neuronen entsteht.',
    questionText: 'Die Orch-OR-Theorie besagt, dass Bewusstsein aus Quantenberechnungen innerhalb von ___ entsteht.',
    correctAnswer: 'Mikrotubuli', points: 3, orderIndex: 40, tags: ['Wissenschaft']
  },
  {
    language: 'German', cefrLevel: 'C2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Linguistische Relativität revisited',
    passage: 'Die Kuuk Thaayorre, ein indigenes Volk der Kap-York-Halbinsel in Australien, verwenden Himmelsrichtungen anstelle von egozentrischen Raumbegriffen. Anstatt zu sagen „die Tasse ist zu deiner Linken", würden sie sagen „die Tasse ist im Nord-Nordosten". Bemerkenswerterweise korreliert diese sprachliche Praxis mit einer außergewöhnlichen räumlichen Orientierungsfähigkeit — Sprecher des Kuuk Thaayorre behalten jederzeit einen genauen inneren Kompass bei, eine Leistung, die Sprechern von Sprachen mit egozentrischen Raumsystemen außerordentlich schwerfällt.',
    questionText: 'Was macht das Raumsystem der Kuuk Thaayorre einzigartig?',
    options: [
      { label: 'Sie verwenden links und rechts genauer', value: 'links und rechts' },
      { label: 'Sie verwenden Himmelsrichtungen statt relativer Begriffe wie links/rechts', value: 'Himmelsrichtungen statt egozentrischer Begriffe' },
      { label: 'Sie haben keine Wörter für Richtungen', value: 'keine Wörter für Richtungen' },
      { label: 'Sie verwenden nur Gesten für Richtungen', value: 'nur Gesten' }
    ],
    correctAnswer: 'Himmelsrichtungen statt egozentrischer Begriffe', points: 3, orderIndex: 41, tags: ['Linguistik', 'Kultur']
  },
  {
    language: 'German', cefrLevel: 'C2', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'Die Kuuk Thaayorre verwenden Himmelsrichtungen anstelle von egozentrischen Raumbegriffen.',
    questionText: 'Die Kuuk Thaayorre verwenden ___ anstelle von egozentrischen Raumbegriffen.',
    correctAnswer: 'Himmelsrichtungen', points: 3, orderIndex: 42, tags: ['Linguistik']
  }
]
