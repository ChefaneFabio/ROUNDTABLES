import { MultiSkillQuestionData } from '../types'

// German Vocabulary-in-Context Questions — 15 questions
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
]
