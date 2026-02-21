import { MultiSkillQuestionData } from '../types'

// German Writing Prompts — 2-3 per CEFR level (14 total)
// Progressive complexity: short answer -> paragraph -> essay

export const germanWritingQuestions: MultiSkillQuestionData[] = [
  // A1 — Short answers (20-50 words)
  {
    language: 'German', cefrLevel: 'A1', questionType: 'SHORT_ANSWER', skill: 'WRITING',
    questionText: 'Schreiben Sie über sich selbst. Nennen Sie Ihren Namen, Ihr Alter, woher Sie kommen und eine Sache, die Sie mögen.',
    correctAnswer: '', points: 1, orderIndex: 1,
    rubric: { minWords: 20, maxWords: 50, criteria: ['grundlegende persönliche Informationen', 'einfache Sätze', 'Grundwortschatz'] },
    tags: ['persönlich', 'Vorstellung'], timeSuggested: 180
  },
  {
    language: 'German', cefrLevel: 'A1', questionType: 'SHORT_ANSWER', skill: 'WRITING',
    questionText: 'Beschreiben Sie Ihre Familie. Wie viele Personen gehören zu Ihrer Familie? Wie heißen sie?',
    correctAnswer: '', points: 1, orderIndex: 2,
    rubric: { minWords: 20, maxWords: 50, criteria: ['Familienwortschatz', 'Zahlen', 'einfache Sätze'] },
    tags: ['Familie'], timeSuggested: 180
  },
  // A2 — Short answers (30-60 words)
  {
    language: 'German', cefrLevel: 'A2', questionType: 'SHORT_ANSWER', skill: 'WRITING',
    questionText: 'Beschreiben Sie Ihren Tagesablauf. Was machen Sie morgens, nachmittags und abends?',
    correctAnswer: '', points: 1, orderIndex: 3,
    rubric: { minWords: 30, maxWords: 60, criteria: ['Zeitangaben', 'Präsens', 'Reihenfolgewörter'] },
    tags: ['Tagesablauf'], timeSuggested: 240
  },
  {
    language: 'German', cefrLevel: 'A2', questionType: 'SHORT_ANSWER', skill: 'WRITING',
    questionText: 'Schreiben Sie über Ihren letzten Urlaub. Wohin sind Sie gefahren? Was haben Sie gemacht? Hat es Ihnen gefallen?',
    correctAnswer: '', points: 1, orderIndex: 4,
    rubric: { minWords: 30, maxWords: 60, criteria: ['Perfekt', 'Reisewortschatz', 'Meinungsäußerung'] },
    tags: ['Reisen', 'Perfekt'], timeSuggested: 240
  },
  // B1 — Paragraph (80-150 words)
  {
    language: 'German', cefrLevel: 'B1', questionType: 'SHORT_ANSWER', skill: 'WRITING',
    questionText: 'Glauben Sie, dass es besser ist, in einer Stadt oder auf dem Land zu leben? Nennen Sie Gründe für Ihre Meinung.',
    correctAnswer: '', points: 2, orderIndex: 5,
    rubric: { minWords: 80, maxWords: 150, criteria: ['Meinungsäußerung', 'Komparativstrukturen', 'Begründung', 'Absatzstruktur'] },
    tags: ['Meinung', 'Komparativ'], timeSuggested: 360
  },
  {
    language: 'German', cefrLevel: 'B1', questionType: 'SHORT_ANSWER', skill: 'WRITING',
    questionText: 'Schreiben Sie über die Vor- und Nachteile der Nutzung sozialer Medien. Geben Sie Beispiele aus Ihrer Erfahrung.',
    correctAnswer: '', points: 2, orderIndex: 6,
    rubric: { minWords: 80, maxWords: 150, criteria: ['Vor-/Nachteile-Struktur', 'Verbindungswörter', 'Beispiele', 'kohärente Argumentation'] },
    tags: ['Technologie', 'Meinung'], timeSuggested: 360
  },
  {
    language: 'German', cefrLevel: 'B1', questionType: 'SHORT_ANSWER', skill: 'WRITING',
    questionText: 'Beschreiben Sie eine Person, die Ihr Leben beeinflusst hat, und erklären Sie, warum sie wichtig für Sie ist.',
    correctAnswer: '', points: 2, orderIndex: 7,
    rubric: { minWords: 80, maxWords: 150, criteria: ['Personenbeschreibung', 'persönliche Erzählung', 'Perfekt/Präteritum', 'emotionaler Wortschatz'] },
    tags: ['persönlich', 'Beschreibung'], timeSuggested: 360
  },
  // B2 — Paragraph (100-200 words)
  {
    language: 'German', cefrLevel: 'B2', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'Manche Menschen glauben, dass Homeoffice die traditionelle Büroarbeit in Zukunft ersetzen wird. Inwieweit stimmen Sie zu oder nicht? Begründen Sie Ihre Argumentation mit konkreten Gründen.',
    correctAnswer: '', points: 2, orderIndex: 8,
    rubric: { minWords: 100, maxWords: 200, criteria: ['klare These', 'stützende Argumente', 'Bewusstsein für Gegenargumente', 'formelles Register', 'Kohäsionsmittel'] },
    tags: ['Arbeit', 'Meinung', 'formell'], timeSuggested: 480
  },
  {
    language: 'German', cefrLevel: 'B2', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'Schreiben Sie darüber, wie die Technologie die Art und Weise verändert hat, wie Menschen Sprachen lernen. Nennen Sie sowohl positive als auch negative Auswirkungen.',
    correctAnswer: '', points: 2, orderIndex: 9,
    rubric: { minWords: 100, maxWords: 200, criteria: ['ausgewogene Argumentation', 'konkrete Beispiele', 'Ursache und Wirkung', 'akademischer Wortschatz'] },
    tags: ['Technologie', 'Bildung'], timeSuggested: 480
  },
  // C1 — Essay (150-250 words)
  {
    language: 'German', cefrLevel: 'C1', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'Bewerten Sie kritisch die Behauptung, dass soziale Medien dem demokratischen Diskurs mehr geschadet als genutzt haben. Liefern Sie Belege für Ihre Argumentation.',
    correctAnswer: '', points: 3, orderIndex: 10,
    rubric: { minWords: 150, maxWords: 250, criteria: ['kritische Analyse', 'evidenzbasierte Argumentation', 'differenzierte Position', 'anspruchsvoller Wortschatz', 'rhetorische Mittel', 'logische Struktur'] },
    tags: ['Medien', 'Politik', 'kritisches Denken'], timeSuggested: 600
  },
  {
    language: 'German', cefrLevel: 'C1', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'Erörtern Sie die ethischen Implikationen von künstlicher Intelligenz im Gesundheitswesen. Sollten KI-Systeme diagnostische Entscheidungen ohne menschliche Aufsicht treffen dürfen?',
    correctAnswer: '', points: 3, orderIndex: 11,
    rubric: { minWords: 150, maxWords: 250, criteria: ['ethische Argumentation', 'multiple Perspektiven', 'akademisches Register', 'Konjunktivstrukturen', 'vorsichtige Formulierungen'] },
    tags: ['Technologie', 'Ethik', 'Gesundheit'], timeSuggested: 600
  },
  // C2 — Essay (200-300 words)
  {
    language: 'German', cefrLevel: 'C2', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'Die Kommodifizierung der Hochschulbildung hat ihren Zweck und Wert grundlegend verändert. Diskutieren Sie diese Aussage unter Berücksichtigung sowohl ökonomischer als auch philosophischer Perspektiven.',
    correctAnswer: '', points: 3, orderIndex: 12,
    rubric: { minWords: 200, maxWords: 300, criteria: ['differenzierte Argumentation', 'interdisziplinäre Bezüge', 'abstraktes Denken', 'nahezu muttersprachliche Sprachbeherrschung', 'stilistische Bandbreite', 'nuancierte Schlussfolgerung'] },
    tags: ['Bildung', 'Philosophie', 'Wirtschaft'], timeSuggested: 720
  },
  {
    language: 'German', cefrLevel: 'C2', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'Inwieweit kann Sprache die Realität formen? Diskutieren Sie unter Bezugnahme auf die Sapir-Whorf-Hypothese und zeitgenössische Forschung zur linguistischen Relativität.',
    correctAnswer: '', points: 3, orderIndex: 13,
    rubric: { minWords: 200, maxWords: 300, criteria: ['akademische Argumentation', 'theoretisches Wissen', 'kritische Bewertung von Evidenz', 'kohäsive akademische Aufsatzstruktur', 'präziser und vielfältiger Wortschatz'] },
    tags: ['Linguistik', 'Philosophie'], timeSuggested: 720
  },
  {
    language: 'German', cefrLevel: 'C2', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'Analysieren Sie das Spannungsverhältnis zwischen individueller Privatsphäre und kollektiver Sicherheit im digitalen Zeitalter. Wie sollten demokratische Gesellschaften mit diesem Dilemma umgehen?',
    correctAnswer: '', points: 3, orderIndex: 14,
    rubric: { minWords: 200, maxWords: 300, criteria: ['philosophische Tiefe', 'ausgewogene Analyse', 'politisches Bewusstsein', 'elegante Prosa', 'logische Kohärenz'] },
    tags: ['Technologie', 'Politik', 'Ethik'], timeSuggested: 720
  }
]
