import { MultiSkillQuestionData } from '../types'

// German Vocabulary-in-Context Questions — 60 questions
// Multiple choice: choose the word that best fits the context

export const germanVocabularyQuestions: MultiSkillQuestionData[] = [
  // ============================================================
  // A2 — Elementary (3 questions)
  // ============================================================
  {
    language: 'German', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Ich muss einen ___ beim Arzt machen.',
    options: [{ label: 'Termin', value: 'Termin' }, { label: 'Platz', value: 'Platz' }, { label: 'Moment', value: 'Moment' }, { label: 'Punkt', value: 'Punkt' }],
    correctAnswer: 'Termin', points: 1, orderIndex: 1, tags: ['Alltag', 'Nomen']
  },
  {
    language: 'German', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Das Wetter ist heute sehr ___. Wir sollten drinnen bleiben.',
    options: [{ label: 'schlecht', value: 'schlecht' }, { label: 'langsam', value: 'langsam' }, { label: 'leer', value: 'leer' }, { label: 'dunkel', value: 'dunkel' }],
    correctAnswer: 'schlecht', points: 1, orderIndex: 2, tags: ['Wetter', 'Adjektive']
  },
  {
    language: 'German', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Können Sie mir bitte ___? Ich finde den Bahnhof nicht.',
    options: [{ label: 'helfen', value: 'helfen' }, { label: 'geben', value: 'geben' }, { label: 'sagen', value: 'sagen' }, { label: 'bringen', value: 'bringen' }],
    correctAnswer: 'helfen', points: 1, orderIndex: 3, tags: ['Höflichkeit', 'Verben']
  },

  // ============================================================
  // B1 — Intermediate (4 questions)
  // ============================================================
  {
    language: 'German', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Die Firma hat beschlossen, 50 neue Mitarbeiter ___.',
    options: [{ label: 'einzustellen', value: 'einzustellen' }, { label: 'abzubauen', value: 'abzubauen' }, { label: 'auszubilden', value: 'auszubilden' }, { label: 'umzuziehen', value: 'umzuziehen' }],
    correctAnswer: 'einzustellen', points: 1, orderIndex: 4, tags: ['Arbeitswelt', 'trennbare Verben']
  },
  {
    language: 'German', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Sie ist sehr ___ — sie denkt immer an die Gefühle anderer.',
    options: [{ label: 'einfühlsam', value: 'einfühlsam' }, { label: 'empfindlich', value: 'empfindlich' }, { label: 'eingebildet', value: 'eingebildet' }, { label: 'eigenartig', value: 'eigenartig' }],
    correctAnswer: 'einfühlsam', points: 1, orderIndex: 5, tags: ['Persönlichkeit', 'Adjektive']
  },
  {
    language: 'German', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Das Hotel verfügt über hervorragende ___ — Schwimmbad, Fitnessstudio und Sauna.',
    options: [{ label: 'Einrichtungen', value: 'Einrichtungen' }, { label: 'Möbel', value: 'Möbel' }, { label: 'Geräte', value: 'Geräte' }, { label: 'Werkzeuge', value: 'Werkzeuge' }],
    correctAnswer: 'Einrichtungen', points: 1, orderIndex: 6, tags: ['Reisen', 'Nomen']
  },
  {
    language: 'German', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Ich kann es mir leider nicht ___, ein neues Auto zu kaufen.',
    options: [{ label: 'leisten', value: 'leisten' }, { label: 'erlauben', value: 'erlauben' }, { label: 'bieten', value: 'bieten' }, { label: 'schaffen', value: 'schaffen' }],
    correctAnswer: 'leisten', points: 1, orderIndex: 7, tags: ['Geld', 'Verben']
  },

  // ============================================================
  // B2 — Upper Intermediate (4 questions)
  // ============================================================
  {
    language: 'German', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Die Regierung hat neue Vorschriften zum Schutz der Umwelt ___.',
    options: [{ label: 'erlassen', value: 'erlassen' }, { label: 'erfunden', value: 'erfunden' }, { label: 'entdeckt', value: 'entdeckt' }, { label: 'erzeugt', value: 'erzeugt' }],
    correctAnswer: 'erlassen', points: 1, orderIndex: 8, tags: ['Politik', 'formell']
  },
  {
    language: 'German', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Die Dokumentation beleuchtete die ___ Folgen der Umweltverschmutzung.',
    options: [{ label: 'verheerenden', value: 'verheerenden' }, { label: 'verehrenden', value: 'verehrenden' }, { label: 'verwaltenden', value: 'verwaltenden' }, { label: 'vermeidenden', value: 'vermeidenden' }],
    correctAnswer: 'verheerenden', points: 1, orderIndex: 9, tags: ['Umwelt', 'Adjektive']
  },
  {
    language: 'German', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Sie hat einen ausgezeichneten Sinn für ___.',
    options: [{ label: 'Humor', value: 'Humor' }, { label: 'Gefühl', value: 'Gefühl' }, { label: 'Bedeutung', value: 'Bedeutung' }, { label: 'Geschmack', value: 'Geschmack' }],
    correctAnswer: 'Humor', points: 1, orderIndex: 10, tags: ['Kollokationen', 'Persönlichkeit']
  },
  {
    language: 'German', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Der Ausschuss hat den Vorschlag einstimmig ___.',
    options: [{ label: 'gebilligt', value: 'gebilligt' }, { label: 'verbessert', value: 'verbessert' }, { label: 'bewiesen', value: 'bewiesen' }, { label: 'beantragt', value: 'beantragt' }],
    correctAnswer: 'gebilligt', points: 1, orderIndex: 11, tags: ['Geschäftsleben', 'formell']
  },

  // ============================================================
  // C1 — Advanced (2 questions)
  // ============================================================
  {
    language: 'German', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Die Rede des Politikers war bewusst ___, um sich nicht festlegen zu müssen.',
    options: [{ label: 'mehrdeutig', value: 'mehrdeutig' }, { label: 'ehrgeizig', value: 'ehrgeizig' }, { label: 'anonym', value: 'anonym' }, { label: 'gleichwertig', value: 'gleichwertig' }],
    correctAnswer: 'mehrdeutig', points: 1, orderIndex: 12, tags: ['Politik', 'gehobene Adjektive']
  },
  {
    language: 'German', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Ihre ___ Aufmerksamkeit für Details macht sie zur idealen Kandidatin.',
    options: [{ label: 'akribische', value: 'akribische' }, { label: 'arglistige', value: 'arglistige' }, { label: 'anmutige', value: 'anmutige' }, { label: 'argwöhnische', value: 'argwöhnische' }],
    correctAnswer: 'akribische', points: 1, orderIndex: 13, tags: ['Arbeit', 'gehobene Adjektive']
  },

  // ============================================================
  // C2 — Proficiency (2 questions)
  // ============================================================
  {
    language: 'German', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Das Werk des Künstlers ist eine ___ Verbindung von Tradition und Innovation.',
    options: [{ label: 'nahtlose', value: 'nahtlose' }, { label: 'nahende', value: 'nahende' }, { label: 'nüchterne', value: 'nüchterne' }, { label: 'nachteilige', value: 'nachteilige' }],
    correctAnswer: 'nahtlose', points: 1, orderIndex: 14, tags: ['Kunst', 'gehobene Adjektive']
  },
  {
    language: 'German', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Die ___ Erklärung des Professors ließ selbst die fortgeschrittenen Studenten ratlos zurück.',
    options: [{ label: 'verschlungene', value: 'verschlungene' }, { label: 'verschlossene', value: 'verschlossene' }, { label: 'verschwundene', value: 'verschwundene' }, { label: 'verschmähte', value: 'verschmähte' }],
    correctAnswer: 'verschlungene', points: 1, orderIndex: 15, tags: ['Akademisch', 'gehobene Adjektive']
  },

  // ============================================================
  // NEW QUESTIONS — 45 additional (orderIndex 16–60)
  // ~8 per level (A1–C2)
  // ============================================================

  // --- A1 — Grundwortschatz (16–23) ---
  {
    language: 'German', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Das ist mein ___. Er heißt Paul.',
    options: [{ label: 'Bruder', value: 'Bruder' }, { label: 'Schwester', value: 'Schwester' }, { label: 'Mutter', value: 'Mutter' }, { label: 'Tante', value: 'Tante' }],
    correctAnswer: 'Bruder', points: 1, orderIndex: 16, tags: ['Familie', 'Nomen']
  },
  {
    language: 'German', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Die Tomate ist ___.',
    options: [{ label: 'blau', value: 'blau' }, { label: 'grün', value: 'grün' }, { label: 'rot', value: 'rot' }, { label: 'gelb', value: 'gelb' }],
    correctAnswer: 'rot', points: 1, orderIndex: 17, tags: ['Farben', 'Adjektive']
  },
  {
    language: 'German', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Zum Frühstück esse ich ___ mit Butter.',
    options: [{ label: 'Brot', value: 'Brot' }, { label: 'Stuhl', value: 'Stuhl' }, { label: 'Buch', value: 'Buch' }, { label: 'Schuh', value: 'Schuh' }],
    correctAnswer: 'Brot', points: 1, orderIndex: 18, tags: ['Essen', 'Nomen']
  },
  {
    language: 'German', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Im Winter ist es ___.',
    options: [{ label: 'heiß', value: 'heiß' }, { label: 'kalt', value: 'kalt' }, { label: 'nass', value: 'nass' }, { label: 'trocken', value: 'trocken' }],
    correctAnswer: 'kalt', points: 1, orderIndex: 19, tags: ['Wetter', 'Adjektive']
  },
  {
    language: 'German', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Meine ___ kocht sehr gut.',
    options: [{ label: 'Mutter', value: 'Mutter' }, { label: 'Tisch', value: 'Tisch' }, { label: 'Auto', value: 'Auto' }, { label: 'Lampe', value: 'Lampe' }],
    correctAnswer: 'Mutter', points: 1, orderIndex: 20, tags: ['Familie', 'Nomen']
  },
  {
    language: 'German', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Ich trinke gern ___ zum Frühstück.',
    options: [{ label: 'Milch', value: 'Milch' }, { label: 'Salz', value: 'Salz' }, { label: 'Mehl', value: 'Mehl' }, { label: 'Stein', value: 'Stein' }],
    correctAnswer: 'Milch', points: 1, orderIndex: 21, tags: ['Essen', 'Nomen']
  },
  {
    language: 'German', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Der Himmel ist ___.',
    options: [{ label: 'blau', value: 'blau' }, { label: 'rot', value: 'rot' }, { label: 'schwarz', value: 'schwarz' }, { label: 'braun', value: 'braun' }],
    correctAnswer: 'blau', points: 1, orderIndex: 22, tags: ['Farben', 'Adjektive']
  },
  {
    language: 'German', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Mein ___ arbeitet in einer Fabrik.',
    options: [{ label: 'Vater', value: 'Vater' }, { label: 'Schule', value: 'Schule' }, { label: 'Küche', value: 'Küche' }, { label: 'Garten', value: 'Garten' }],
    correctAnswer: 'Vater', points: 1, orderIndex: 23, tags: ['Familie', 'Nomen']
  },

  // --- A2 — Alltag (24–31) ---
  {
    language: 'German', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Ich muss meine Wäsche ___.',
    options: [{ label: 'waschen', value: 'waschen' }, { label: 'kochen', value: 'kochen' }, { label: 'lesen', value: 'lesen' }, { label: 'fahren', value: 'fahren' }],
    correctAnswer: 'waschen', points: 1, orderIndex: 24, tags: ['Alltag', 'Verben']
  },
  {
    language: 'German', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Die ___ fährt alle zehn Minuten zum Hauptbahnhof.',
    options: [{ label: 'Straßenbahn', value: 'Straßenbahn' }, { label: 'Treppe', value: 'Treppe' }, { label: 'Brücke', value: 'Brücke' }, { label: 'Tür', value: 'Tür' }],
    correctAnswer: 'Straßenbahn', points: 1, orderIndex: 25, tags: ['Verkehr', 'Nomen']
  },
  {
    language: 'German', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Am Wochenende gehe ich gern im Park ___.',
    options: [{ label: 'spazieren', value: 'spazieren' }, { label: 'schlafen', value: 'schlafen' }, { label: 'arbeiten', value: 'arbeiten' }, { label: 'putzen', value: 'putzen' }],
    correctAnswer: 'spazieren', points: 1, orderIndex: 26, tags: ['Freizeit', 'Verben']
  },
  {
    language: 'German', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Die ___ ist heute geschlossen. Wir können morgen einkaufen.',
    options: [{ label: 'Bäckerei', value: 'Bäckerei' }, { label: 'Bibliothek', value: 'Bibliothek' }, { label: 'Kirche', value: 'Kirche' }, { label: 'Schule', value: 'Schule' }],
    correctAnswer: 'Bäckerei', points: 1, orderIndex: 27, tags: ['Einkaufen', 'Nomen']
  },
  {
    language: 'German', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Ich habe ___, weil ich nichts gegessen habe.',
    options: [{ label: 'Hunger', value: 'Hunger' }, { label: 'Durst', value: 'Durst' }, { label: 'Angst', value: 'Angst' }, { label: 'Glück', value: 'Glück' }],
    correctAnswer: 'Hunger', points: 1, orderIndex: 28, tags: ['Alltag', 'Nomen']
  },
  {
    language: 'German', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Bitte ___ Sie das Formular aus und unterschreiben Sie hier.',
    options: [{ label: 'füllen', value: 'füllen' }, { label: 'werfen', value: 'werfen' }, { label: 'brechen', value: 'brechen' }, { label: 'schließen', value: 'schließen' }],
    correctAnswer: 'füllen', points: 1, orderIndex: 29, tags: ['Amt', 'Verben']
  },
  {
    language: 'German', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Unsere ___ sind sehr freundlich. Wir verstehen uns gut.',
    options: [{ label: 'Nachbarn', value: 'Nachbarn' }, { label: 'Möbel', value: 'Möbel' }, { label: 'Fenster', value: 'Fenster' }, { label: 'Schuhe', value: 'Schuhe' }],
    correctAnswer: 'Nachbarn', points: 1, orderIndex: 30, tags: ['Wohnen', 'Nomen']
  },
  {
    language: 'German', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Ich habe Kopfschmerzen. Ich brauche eine ___.',
    options: [{ label: 'Tablette', value: 'Tablette' }, { label: 'Brille', value: 'Brille' }, { label: 'Jacke', value: 'Jacke' }, { label: 'Zeitung', value: 'Zeitung' }],
    correctAnswer: 'Tablette', points: 1, orderIndex: 31, tags: ['Gesundheit', 'Nomen']
  },

  // --- B1 — Arbeit/Reise (32–39) ---
  {
    language: 'German', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Er hat sich um die ___ als Projektmanager beworben.',
    options: [{ label: 'Stelle', value: 'Stelle' }, { label: 'Stufe', value: 'Stufe' }, { label: 'Strecke', value: 'Strecke' }, { label: 'Stärke', value: 'Stärke' }],
    correctAnswer: 'Stelle', points: 1, orderIndex: 32, tags: ['Arbeit', 'Nomen']
  },
  {
    language: 'German', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Für die Reise nach Spanien brauche ich einen gültigen ___.',
    options: [{ label: 'Reisepass', value: 'Reisepass' }, { label: 'Führerschein', value: 'Führerschein' }, { label: 'Hausschlüssel', value: 'Hausschlüssel' }, { label: 'Lebenslauf', value: 'Lebenslauf' }],
    correctAnswer: 'Reisepass', points: 1, orderIndex: 33, tags: ['Reisen', 'Nomen']
  },
  {
    language: 'German', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Die ___ für die Übernachtung im Hotel war sehr angemessen — nur 70 Euro pro Nacht.',
    options: [{ label: 'Gebühr', value: 'Gebühr' }, { label: 'Strafe', value: 'Strafe' }, { label: 'Schuld', value: 'Schuld' }, { label: 'Prämie', value: 'Prämie' }],
    correctAnswer: 'Gebühr', points: 1, orderIndex: 34, tags: ['Reisen', 'Nomen']
  },
  {
    language: 'German', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'In seinem ___ stehen alle wichtigen Berufserfahrungen.',
    options: [{ label: 'Lebenslauf', value: 'Lebenslauf' }, { label: 'Tagebuch', value: 'Tagebuch' }, { label: 'Vertrag', value: 'Vertrag' }, { label: 'Zeugnis', value: 'Zeugnis' }],
    correctAnswer: 'Lebenslauf', points: 1, orderIndex: 35, tags: ['Arbeit', 'Nomen']
  },
  {
    language: 'German', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Wir haben unser ___ im Hotel an der Rezeption abgegeben.',
    options: [{ label: 'Gepäck', value: 'Gepäck' }, { label: 'Geschirr', value: 'Geschirr' }, { label: 'Besteck', value: 'Besteck' }, { label: 'Werkzeug', value: 'Werkzeug' }],
    correctAnswer: 'Gepäck', points: 1, orderIndex: 36, tags: ['Reisen', 'Nomen']
  },
  {
    language: 'German', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Sie hat die Besprechung ___, weil sie krank war.',
    options: [{ label: 'abgesagt', value: 'abgesagt' }, { label: 'angemeldet', value: 'angemeldet' }, { label: 'aufgebaut', value: 'aufgebaut' }, { label: 'ausgedruckt', value: 'ausgedruckt' }],
    correctAnswer: 'abgesagt', points: 1, orderIndex: 37, tags: ['Arbeit', 'trennbare Verben']
  },
  {
    language: 'German', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Ich muss noch die Flugtickets ___, bevor wir abreisen.',
    options: [{ label: 'buchen', value: 'buchen' }, { label: 'backen', value: 'backen' }, { label: 'bügeln', value: 'bügeln' }, { label: 'bauen', value: 'bauen' }],
    correctAnswer: 'buchen', points: 1, orderIndex: 38, tags: ['Reisen', 'Verben']
  },
  {
    language: 'German', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Der Chef hat den Mitarbeitern eine ___ gegeben, weil sie so hart gearbeitet haben.',
    options: [{ label: 'Gehaltserhöhung', value: 'Gehaltserhöhung' }, { label: 'Kündigung', value: 'Kündigung' }, { label: 'Abmahnung', value: 'Abmahnung' }, { label: 'Versetzung', value: 'Versetzung' }],
    correctAnswer: 'Gehaltserhöhung', points: 1, orderIndex: 39, tags: ['Arbeit', 'Nomen']
  },

  // --- B2 — abstrakte Begriffe (40–47) ---
  {
    language: 'German', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Die ___ zwischen den beiden Abteilungen hat zu erheblichen Verzögerungen geführt.',
    options: [{ label: 'Reibung', value: 'Reibung' }, { label: 'Verbindung', value: 'Verbindung' }, { label: 'Bereicherung', value: 'Bereicherung' }, { label: 'Einigung', value: 'Einigung' }],
    correctAnswer: 'Reibung', points: 2, orderIndex: 40, tags: ['Arbeitswelt', 'abstrakte Begriffe']
  },
  {
    language: 'German', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Der Forscher hat einen wichtigen ___ zur Debatte geleistet.',
    options: [{ label: 'Beitrag', value: 'Beitrag' }, { label: 'Betrieb', value: 'Betrieb' }, { label: 'Beweis', value: 'Beweis' }, { label: 'Bezug', value: 'Bezug' }],
    correctAnswer: 'Beitrag', points: 2, orderIndex: 41, tags: ['Wissenschaft', 'Nomen']
  },
  {
    language: 'German', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Seine Argumente waren sehr ___ und überzeugten das Publikum.',
    options: [{ label: 'stichhaltig', value: 'stichhaltig' }, { label: 'stiefmütterlich', value: 'stiefmütterlich' }, { label: 'stürmisch', value: 'stürmisch' }, { label: 'sträflich', value: 'sträflich' }],
    correctAnswer: 'stichhaltig', points: 2, orderIndex: 42, tags: ['Argumentation', 'Adjektive']
  },
  {
    language: 'German', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Die wirtschaftliche ___ des Landes hat sich in den letzten Jahren verbessert.',
    options: [{ label: 'Lage', value: 'Lage' }, { label: 'Liege', value: 'Liege' }, { label: 'Lehre', value: 'Lehre' }, { label: 'Leere', value: 'Leere' }],
    correctAnswer: 'Lage', points: 2, orderIndex: 43, tags: ['Wirtschaft', 'Nomen']
  },
  {
    language: 'German', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Es besteht ein enger ___ zwischen Bildung und sozialem Aufstieg.',
    options: [{ label: 'Zusammenhang', value: 'Zusammenhang' }, { label: 'Zusammenbruch', value: 'Zusammenbruch' }, { label: 'Zusammenschluss', value: 'Zusammenschluss' }, { label: 'Zusammenstoß', value: 'Zusammenstoß' }],
    correctAnswer: 'Zusammenhang', points: 2, orderIndex: 44, tags: ['Gesellschaft', 'Nomen']
  },
  {
    language: 'German', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Die Maßnahme erwies sich im Nachhinein als völlig ___ — sie war gar nicht nötig gewesen.',
    options: [{ label: 'überflüssig', value: 'überflüssig' }, { label: 'überlegen', value: 'überlegen' }, { label: 'übertrieben', value: 'übertrieben' }, { label: 'üblich', value: 'üblich' }],
    correctAnswer: 'überflüssig', points: 2, orderIndex: 45, tags: ['abstrakte Begriffe', 'Adjektive']
  },
  {
    language: 'German', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Der Vertrag wurde nach langen Verhandlungen endlich ___.',
    options: [{ label: 'abgeschlossen', value: 'abgeschlossen' }, { label: 'abgebrochen', value: 'abgebrochen' }, { label: 'abgelehnt', value: 'abgelehnt' }, { label: 'abgeschafft', value: 'abgeschafft' }],
    correctAnswer: 'abgeschlossen', points: 2, orderIndex: 46, tags: ['Geschäftsleben', 'Verben']
  },
  {
    language: 'German', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Die ___ der Bevölkerung unterstützt die neue Reform.',
    options: [{ label: 'Mehrheit', value: 'Mehrheit' }, { label: 'Minderheit', value: 'Minderheit' }, { label: 'Menschheit', value: 'Menschheit' }, { label: 'Mannschaft', value: 'Mannschaft' }],
    correctAnswer: 'Mehrheit', points: 2, orderIndex: 47, tags: ['Politik', 'Nomen']
  },

  // --- C1 — Redewendungen (48–55) ---
  {
    language: 'German', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Er hat den Nagel auf den ___ getroffen — seine Analyse war perfekt.',
    options: [{ label: 'Kopf', value: 'Kopf' }, { label: 'Punkt', value: 'Punkt' }, { label: 'Tisch', value: 'Tisch' }, { label: 'Boden', value: 'Boden' }],
    correctAnswer: 'Kopf', points: 2, orderIndex: 48, tags: ['Redewendungen']
  },
  {
    language: 'German', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Die Fusion der beiden Unternehmen hat eine heftige ___ in der Branche ausgelöst.',
    options: [{ label: 'Kontroverse', value: 'Kontroverse' }, { label: 'Konferenz', value: 'Konferenz' }, { label: 'Konsequenz', value: 'Konsequenz' }, { label: 'Konkurrenz', value: 'Konkurrenz' }],
    correctAnswer: 'Kontroverse', points: 2, orderIndex: 49, tags: ['Geschäftsleben', 'gehobene Nomen']
  },
  {
    language: 'German', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Die Verhandlungen stehen auf ___ — ein Scheitern ist durchaus möglich.',
    options: [{ label: 'der Kippe', value: 'der Kippe' }, { label: 'dem Spiel', value: 'dem Spiel' }, { label: 'der Stelle', value: 'der Stelle' }, { label: 'dem Prüfstand', value: 'dem Prüfstand' }],
    correctAnswer: 'der Kippe', points: 2, orderIndex: 50, tags: ['Redewendungen']
  },
  {
    language: 'German', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Er hat sich bereit erklärt, die ___ für das Projekt zu übernehmen.',
    options: [{ label: 'Verantwortung', value: 'Verantwortung' }, { label: 'Verachtung', value: 'Verachtung' }, { label: 'Verbreitung', value: 'Verbreitung' }, { label: 'Verdächtigung', value: 'Verdächtigung' }],
    correctAnswer: 'Verantwortung', points: 2, orderIndex: 51, tags: ['Arbeit', 'gehobene Nomen']
  },
  {
    language: 'German', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Die Studie liefert ___ Erkenntnisse über das Konsumverhalten.',
    options: [{ label: 'aufschlussreiche', value: 'aufschlussreiche' }, { label: 'aufsässige', value: 'aufsässige' }, { label: 'aufdringliche', value: 'aufdringliche' }, { label: 'aufwendige', value: 'aufwendige' }],
    correctAnswer: 'aufschlussreiche', points: 2, orderIndex: 52, tags: ['Wissenschaft', 'gehobene Adjektive']
  },
  {
    language: 'German', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Das Problem ist ___ — es hat viele verborgene Ebenen und es gibt keine einfache Lösung.',
    options: [{ label: 'vielschichtig', value: 'vielschichtig' }, { label: 'vielseitig', value: 'vielseitig' }, { label: 'vielleicht', value: 'vielleicht' }, { label: 'vielfältig', value: 'vielfältig' }],
    correctAnswer: 'vielschichtig', points: 2, orderIndex: 53, tags: ['abstrakte Begriffe', 'Adjektive']
  },
  {
    language: 'German', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Er hat seine Meinung ___, nachdem er neue Informationen erhalten hatte.',
    options: [{ label: 'revidiert', value: 'revidiert' }, { label: 'redigiert', value: 'redigiert' }, { label: 'reduziert', value: 'reduziert' }, { label: 'reflektiert', value: 'reflektiert' }],
    correctAnswer: 'revidiert', points: 2, orderIndex: 54, tags: ['gehobene Verben']
  },
  {
    language: 'German', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Die ___ des neuen Gesetzes ist noch unklar.',
    options: [{ label: 'Tragweite', value: 'Tragweite' }, { label: 'Tragödie', value: 'Tragödie' }, { label: 'Tragfähigkeit', value: 'Tragfähigkeit' }, { label: 'Trachten', value: 'Trachten' }],
    correctAnswer: 'Tragweite', points: 2, orderIndex: 55, tags: ['Politik', 'gehobene Nomen']
  },

  // --- C2 — literarisch/hochsprachlich (56–60) ---
  {
    language: 'German', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Sein Schaffen zeichnet sich durch eine ___ Verschmelzung von Realismus und Symbolismus aus.',
    options: [{ label: 'sublime', value: 'sublime' }, { label: 'subtile', value: 'subtile' }, { label: 'subversive', value: 'subversive' }, { label: 'subsidiäre', value: 'subsidiäre' }],
    correctAnswer: 'subtile', points: 2, orderIndex: 56, tags: ['Literatur', 'gehobene Adjektive']
  },
  {
    language: 'German', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Die ___ Analyse des Autors legt verborgene Strukturen im Text offen.',
    options: [{ label: 'hermeneutische', value: 'hermeneutische' }, { label: 'hermetische', value: 'hermetische' }, { label: 'heroische', value: 'heroische' }, { label: 'hedonistische', value: 'hedonistische' }],
    correctAnswer: 'hermeneutische', points: 2, orderIndex: 57, tags: ['Literaturwissenschaft', 'Fachsprache']
  },
  {
    language: 'German', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Das ___ Gedicht entfaltet eine meditative Reflexion über Vergänglichkeit.',
    options: [{ label: 'elegische', value: 'elegische' }, { label: 'epische', value: 'epische' }, { label: 'ekstatische', value: 'ekstatische' }, { label: 'elliptische', value: 'elliptische' }],
    correctAnswer: 'elegische', points: 2, orderIndex: 58, tags: ['Literatur', 'gehobene Adjektive']
  },
  {
    language: 'German', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Der philosophische Diskurs ___ sich einer klaren Definition.',
    options: [{ label: 'entzieht', value: 'entzieht' }, { label: 'entlehnt', value: 'entlehnt' }, { label: 'entspricht', value: 'entspricht' }, { label: 'entstammt', value: 'entstammt' }],
    correctAnswer: 'entzieht', points: 2, orderIndex: 59, tags: ['Philosophie', 'gehobene Verben']
  },
  {
    language: 'German', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Die ___ seiner Argumentation zeugt von tiefer intellektueller Redlichkeit.',
    options: [{ label: 'Stringenz', value: 'Stringenz' }, { label: 'Streitigkeit', value: 'Streitigkeit' }, { label: 'Strenge', value: 'Strenge' }, { label: 'Strapaze', value: 'Strapaze' }],
    correctAnswer: 'Stringenz', points: 2, orderIndex: 60, tags: ['Akademisch', 'Fachsprache']
  },
]
