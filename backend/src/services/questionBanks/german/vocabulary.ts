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
    options: [{ label: 'A', value: 'Termin' }, { label: 'B', value: 'Platz' }, { label: 'C', value: 'Moment' }, { label: 'D', value: 'Punkt' }],
    correctAnswer: 'Termin', points: 1, orderIndex: 1, tags: ['Alltag', 'Nomen']
  },
  {
    language: 'German', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Das Wetter ist heute sehr ___. Wir sollten drinnen bleiben.',
    options: [{ label: 'A', value: 'schlecht' }, { label: 'B', value: 'langsam' }, { label: 'C', value: 'leer' }, { label: 'D', value: 'dunkel' }],
    correctAnswer: 'schlecht', points: 1, orderIndex: 2, tags: ['Wetter', 'Adjektive']
  },
  {
    language: 'German', cefrLevel: 'A2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Können Sie mir bitte ___? Ich finde den Bahnhof nicht.',
    options: [{ label: 'A', value: 'helfen' }, { label: 'B', value: 'geben' }, { label: 'C', value: 'sagen' }, { label: 'D', value: 'bringen' }],
    correctAnswer: 'helfen', points: 1, orderIndex: 3, tags: ['Höflichkeit', 'Verben']
  },

  // ============================================================
  // B1 — Intermediate (4 questions)
  // ============================================================
  {
    language: 'German', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Die Firma hat beschlossen, 50 neue Mitarbeiter ___.',
    options: [{ label: 'A', value: 'einzustellen' }, { label: 'B', value: 'abzubauen' }, { label: 'C', value: 'auszubilden' }, { label: 'D', value: 'umzuziehen' }],
    correctAnswer: 'einzustellen', points: 1, orderIndex: 4, tags: ['Arbeitswelt', 'trennbare Verben']
  },
  {
    language: 'German', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Sie ist sehr ___ — sie denkt immer an die Gefühle anderer.',
    options: [{ label: 'A', value: 'einfühlsam' }, { label: 'B', value: 'empfindlich' }, { label: 'C', value: 'eingebildet' }, { label: 'D', value: 'eigenartig' }],
    correctAnswer: 'einfühlsam', points: 1, orderIndex: 5, tags: ['Persönlichkeit', 'Adjektive']
  },
  {
    language: 'German', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Das Hotel verfügt über hervorragende ___ — Schwimmbad, Fitnessstudio und Sauna.',
    options: [{ label: 'A', value: 'Einrichtungen' }, { label: 'B', value: 'Möbel' }, { label: 'C', value: 'Geräte' }, { label: 'D', value: 'Werkzeuge' }],
    correctAnswer: 'Einrichtungen', points: 1, orderIndex: 6, tags: ['Reisen', 'Nomen']
  },
  {
    language: 'German', cefrLevel: 'B1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Ich kann es mir leider nicht ___, ein neues Auto zu kaufen.',
    options: [{ label: 'A', value: 'leisten' }, { label: 'B', value: 'erlauben' }, { label: 'C', value: 'bieten' }, { label: 'D', value: 'schaffen' }],
    correctAnswer: 'leisten', points: 1, orderIndex: 7, tags: ['Geld', 'Verben']
  },

  // ============================================================
  // B2 — Upper Intermediate (4 questions)
  // ============================================================
  {
    language: 'German', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Die Regierung hat neue Vorschriften zum Schutz der Umwelt ___.',
    options: [{ label: 'A', value: 'erlassen' }, { label: 'B', value: 'erfunden' }, { label: 'C', value: 'entdeckt' }, { label: 'D', value: 'erzeugt' }],
    correctAnswer: 'erlassen', points: 1, orderIndex: 8, tags: ['Politik', 'formell']
  },
  {
    language: 'German', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Die Dokumentation beleuchtete die ___ Folgen der Umweltverschmutzung.',
    options: [{ label: 'A', value: 'verheerenden' }, { label: 'B', value: 'verehrenden' }, { label: 'C', value: 'verwaltenden' }, { label: 'D', value: 'vermeidenden' }],
    correctAnswer: 'verheerenden', points: 1, orderIndex: 9, tags: ['Umwelt', 'Adjektive']
  },
  {
    language: 'German', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Sie hat einen ausgezeichneten Sinn für ___.',
    options: [{ label: 'A', value: 'Humor' }, { label: 'B', value: 'Gefühl' }, { label: 'C', value: 'Bedeutung' }, { label: 'D', value: 'Geschmack' }],
    correctAnswer: 'Humor', points: 1, orderIndex: 10, tags: ['Kollokationen', 'Persönlichkeit']
  },
  {
    language: 'German', cefrLevel: 'B2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Der Ausschuss hat den Vorschlag einstimmig ___.',
    options: [{ label: 'A', value: 'gebilligt' }, { label: 'B', value: 'verbessert' }, { label: 'C', value: 'bewiesen' }, { label: 'D', value: 'beantragt' }],
    correctAnswer: 'gebilligt', points: 1, orderIndex: 11, tags: ['Geschäftsleben', 'formell']
  },

  // ============================================================
  // C1 — Advanced (2 questions)
  // ============================================================
  {
    language: 'German', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Die Rede des Politikers war bewusst ___, um sich nicht festlegen zu müssen.',
    options: [{ label: 'A', value: 'mehrdeutig' }, { label: 'B', value: 'ehrgeizig' }, { label: 'C', value: 'anonym' }, { label: 'D', value: 'gleichwertig' }],
    correctAnswer: 'mehrdeutig', points: 1, orderIndex: 12, tags: ['Politik', 'gehobene Adjektive']
  },
  {
    language: 'German', cefrLevel: 'C1', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Ihre ___ Aufmerksamkeit für Details macht sie zur idealen Kandidatin.',
    options: [{ label: 'A', value: 'akribische' }, { label: 'B', value: 'arglistige' }, { label: 'C', value: 'anmutige' }, { label: 'D', value: 'argwöhnische' }],
    correctAnswer: 'akribische', points: 1, orderIndex: 13, tags: ['Arbeit', 'gehobene Adjektive']
  },

  // ============================================================
  // C2 — Proficiency (2 questions)
  // ============================================================
  {
    language: 'German', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Das Werk des Künstlers ist eine ___ Verbindung von Tradition und Innovation.',
    options: [{ label: 'A', value: 'nahtlose' }, { label: 'B', value: 'nahende' }, { label: 'C', value: 'nüchterne' }, { label: 'D', value: 'nachteilige' }],
    correctAnswer: 'nahtlose', points: 1, orderIndex: 14, tags: ['Kunst', 'gehobene Adjektive']
  },
  {
    language: 'German', cefrLevel: 'C2', questionType: 'MULTIPLE_CHOICE', skill: 'VOCABULARY',
    questionText: 'Die ___ Erklärung des Professors ließ selbst die fortgeschrittenen Studenten ratlos zurück.',
    options: [{ label: 'A', value: 'verschlungene' }, { label: 'B', value: 'verschlossene' }, { label: 'C', value: 'verschwundene' }, { label: 'D', value: 'verschmähte' }],
    correctAnswer: 'verschlungene', points: 1, orderIndex: 15, tags: ['Akademisch', 'gehobene Adjektive']
  },
]
