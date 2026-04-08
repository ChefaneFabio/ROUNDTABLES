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
    questionText: 'Beschreiben Sie Ihr Team bei der Arbeit. Wie viele Personen gehören zu Ihrem Team? Was machen sie?',
    correctAnswer: '', points: 1, orderIndex: 2,
    rubric: { minWords: 20, maxWords: 50, criteria: ['Berufswortschatz', 'Zahlen', 'einfache Sätze'] },
    tags: ['Arbeit'], timeSuggested: 180
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
  },

  // ============================================================
  // NEUE FRAGEN — 16 weitere (orderIndex 15-30)
  // ============================================================

  // A1 (20-50 Wörter)
  {
    language: 'German', cefrLevel: 'A1', questionType: 'SHORT_ANSWER', skill: 'WRITING',
    questionText: 'Schreiben Sie eine kurze Postkarte an einen Freund. Erzählen Sie, wo Sie sind und wie das Wetter ist.',
    correctAnswer: '', points: 1, orderIndex: 15,
    rubric: { minWords: 20, maxWords: 50, criteria: ['Grußformel', 'einfache Sätze', 'Wetterwortschatz'] },
    tags: ['Postkarte', 'Wetter'], timeSuggested: 180
  },
  {
    language: 'German', cefrLevel: 'A1', questionType: 'SHORT_ANSWER', skill: 'WRITING',
    questionText: 'Beschreiben Sie Ihr Haus oder Ihre Wohnung. Wie viele Zimmer hat es? Welches ist Ihr Lieblingszimmer?',
    correctAnswer: '', points: 1, orderIndex: 16,
    rubric: { minWords: 20, maxWords: 50, criteria: ['Wohnungswortschatz', 'es gibt', 'einfache Adjektive'] },
    tags: ['Wohnung', 'Beschreibung'], timeSuggested: 180
  },
  {
    language: 'German', cefrLevel: 'A1', questionType: 'SHORT_ANSWER', skill: 'WRITING',
    questionText: 'Was essen und trinken Sie gerne? Schreiben Sie über Ihre Lieblingsmahlzeiten.',
    correctAnswer: '', points: 1, orderIndex: 17,
    rubric: { minWords: 20, maxWords: 50, criteria: ['Essenswortschatz', 'mögen/bevorzugen', 'einfache Sätze'] },
    tags: ['Essen', 'Vorlieben'], timeSuggested: 180
  },

  // A2 (40-80 Wörter)
  {
    language: 'German', cefrLevel: 'A2', questionType: 'SHORT_ANSWER', skill: 'WRITING',
    questionText: 'Schreiben Sie eine E-Mail an einen Freund, um ihn zu einer Party einzuladen. Nennen Sie Datum, Uhrzeit, Ort und was er mitbringen soll.',
    correctAnswer: '', points: 1, orderIndex: 18,
    rubric: { minWords: 40, maxWords: 80, criteria: ['E-Mail-Format', 'Zukunftspläne', 'Einladungssprache', 'Details'] },
    tags: ['E-Mail', 'Einladung'], timeSuggested: 240
  },
  {
    language: 'German', cefrLevel: 'A2', questionType: 'SHORT_ANSWER', skill: 'WRITING',
    questionText: 'Beschreiben Sie Ihren besten Freund / Ihre beste Freundin. Wie sieht er/sie aus? Was unternehmen Sie gerne zusammen?',
    correctAnswer: '', points: 1, orderIndex: 19,
    rubric: { minWords: 40, maxWords: 80, criteria: ['physische Beschreibung', 'Persönlichkeitsadjektive', 'Präsens', 'gern + Infinitiv'] },
    tags: ['Freund', 'Beschreibung'], timeSuggested: 240
  },

  // B1 (80-150 Wörter)
  {
    language: 'German', cefrLevel: 'B1', questionType: 'SHORT_ANSWER', skill: 'WRITING',
    questionText: 'Schreiben Sie einen Beschwerdebrief an den Hotelmanager über ein Problem, das Sie während Ihres Aufenthalts hatten.',
    correctAnswer: '', points: 2, orderIndex: 20,
    rubric: { minWords: 80, maxWords: 150, criteria: ['formeller Briefformat', 'Beschwerdesprache', 'Erzählung in der Vergangenheit', 'höfliche Bitten'] },
    tags: ['Beschwerde', 'formeller Brief'], timeSuggested: 360
  },
  {
    language: 'German', cefrLevel: 'B1', questionType: 'SHORT_ANSWER', skill: 'WRITING',
    questionText: 'Verbessern flexible Arbeitszeiten die Produktivität? Geben Sie Ihre Meinung mit Gründen und Beispielen an.',
    correctAnswer: '', points: 2, orderIndex: 21,
    rubric: { minWords: 80, maxWords: 150, criteria: ['Meinungsäußerung', 'Begründung', 'Beispiele', 'Absatzstruktur'] },
    tags: ['Meinung', 'Bildung'], timeSuggested: 360
  },

  // B2 (150-250 Wörter)
  {
    language: 'German', cefrLevel: 'B2', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'Verfassen Sie einen Bericht über die Auswirkungen des Tourismus auf lokale Gemeinschaften. Berücksichtigen Sie positive und negative Effekte und schlagen Sie Lösungen vor.',
    correctAnswer: '', points: 2, orderIndex: 22,
    rubric: { minWords: 150, maxWords: 250, criteria: ['Berichtstruktur', 'ausgewogene Analyse', 'Empfehlungen', 'formelles Register', 'Kohäsionsmittel'] },
    tags: ['Bericht', 'Tourismus'], timeSuggested: 480
  },
  {
    language: 'German', cefrLevel: 'B2', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'Manche meinen, dass Leistungssport wichtige Lebenskompetenzen vermittelt, andere denken, er setzt junge Menschen unter zu großen Druck. Erörtern Sie beide Standpunkte.',
    correctAnswer: '', points: 2, orderIndex: 23,
    rubric: { minWords: 150, maxWords: 250, criteria: ['klare These', 'ausgewogene Argumentation', 'konkrete Beispiele', 'formeller Wortschatz', 'logische Struktur'] },
    tags: ['Erörterung', 'Sport'], timeSuggested: 480
  },
  {
    language: 'German', cefrLevel: 'B2', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'Schreiben Sie einen Aufsatz darüber, ob Social-Media-Influencer einen positiven oder negativen Einfluss auf das Selbstwertgefühl und die Werte junger Menschen haben.',
    correctAnswer: '', points: 2, orderIndex: 24,
    rubric: { minWords: 150, maxWords: 250, criteria: ['argumentative Struktur', 'Bewusstsein für Gegenargumente', 'Beispiele', 'akademischer Wortschatz'] },
    tags: ['Erörterung', 'Social Media'], timeSuggested: 480
  },

  // C1 (200-350 Wörter)
  {
    language: 'German', cefrLevel: 'C1', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'Verfassen Sie einen Vorschlag für Ihr Unternehmen oder Ihre Institution, in dem Sie Möglichkeiten zur Reduzierung des ökologischen Fußabdrucks vorschlagen. Nennen Sie konkrete Maßnahmen und begründen Sie deren Machbarkeit.',
    correctAnswer: '', points: 3, orderIndex: 25,
    rubric: { minWords: 200, maxWords: 350, criteria: ['Vorschlagsformat', 'überzeugende Argumentation', 'Machbarkeitsanalyse', 'anspruchsvoller Wortschatz', 'formelles Register'] },
    tags: ['Vorschlag', 'Umwelt'], timeSuggested: 600
  },
  {
    language: 'German', cefrLevel: 'C1', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'Analysieren Sie kritisch die Rolle standardisierter Tests in der Bildung. Messen sie das Lernen effektiv, oder behindern sie die echte intellektuelle Entwicklung?',
    correctAnswer: '', points: 3, orderIndex: 26,
    rubric: { minWords: 200, maxWords: 350, criteria: ['kritische Analyse', 'evidenzbasierte Argumentation', 'differenzierte Position', 'rhetorische Mittel', 'akademisches Register'] },
    tags: ['kritische Analyse', 'Bildung'], timeSuggested: 600
  },

  // C2 (250-400 Wörter)
  {
    language: 'German', cefrLevel: 'C2', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'Verfassen Sie einen philosophischen Aufsatz darüber, ob moralische Wahrheiten objektive Tatsachen oder soziale Konstrukte sind. Beziehen Sie sich auf mindestens zwei philosophische Traditionen.',
    correctAnswer: '', points: 3, orderIndex: 27,
    rubric: { minWords: 250, maxWords: 400, criteria: ['philosophische Tiefe', 'interdisziplinäre Bezüge', 'abstraktes Denken', 'nahezu muttersprachliche Sprachbeherrschung', 'elegante Prosa'] },
    tags: ['Philosophie', 'Ethik'], timeSuggested: 720
  },
  {
    language: 'German', cefrLevel: 'C2', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'Verfassen Sie eine Literaturkritik zu einem Roman oder Theaterstück, das Sie gelesen haben. Analysieren Sie seine Themen, Erzähltechniken und kulturelle Bedeutung.',
    correctAnswer: '', points: 3, orderIndex: 28,
    rubric: { minWords: 250, maxWords: 400, criteria: ['literarische Analyse', 'differenzierte Argumentation', 'kritische Bewertung', 'präziser Wortschatz', 'stilistische Bandbreite'] },
    tags: ['Literaturkritik', 'Kultur'], timeSuggested: 720
  },
  {
    language: 'German', cefrLevel: 'C2', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'Untersuchen Sie das Paradoxon der Toleranz: Kann eine wirklich tolerante Gesellschaft Intoleranz tolerieren? Diskutieren Sie unter Bezugnahme auf politische Philosophie und zeitgenössische Beispiele.',
    correctAnswer: '', points: 3, orderIndex: 29,
    rubric: { minWords: 250, maxWords: 400, criteria: ['philosophisches Denken', 'nuancierte Schlussfolgerung', 'akademisches Register', 'Umgang mit Gegenargumenten', 'logische Kohärenz'] },
    tags: ['Philosophie', 'Politik'], timeSuggested: 720
  },
  {
    language: 'German', cefrLevel: 'C2', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'Ist der Begriff der Meritokratie ein nützliches Ideal oder ein gefährlicher Mythos? Analysieren Sie die soziologischen und philosophischen Dimensionen dieser Frage.',
    correctAnswer: '', points: 3, orderIndex: 30,
    rubric: { minWords: 250, maxWords: 400, criteria: ['differenzierte Argumentation', 'interdisziplinäre Analyse', 'abstraktes Denken', 'eleganter Ausdruck', 'nuancierte Position'] },
    tags: ['Soziologie', 'Philosophie', 'Wirtschaft'], timeSuggested: 720
  }
]
