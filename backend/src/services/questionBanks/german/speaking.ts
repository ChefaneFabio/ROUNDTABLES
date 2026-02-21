import { MultiSkillQuestionData } from '../types'

// German Speaking Prompts — 2-3 per CEFR level (14 total)
// Types: Read aloud, describe, opinion, argue

export const germanSpeakingQuestions: MultiSkillQuestionData[] = [
  // A1 — Read aloud + simple question
  {
    language: 'German', cefrLevel: 'A1', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Lesen Sie den folgenden Satz laut vor:',
    speakingPrompt: 'Hallo, ich heiße [Ihr Name]. Ich komme aus [Ihrem Land]. Ich mag [etwas, das Sie mögen].',
    correctAnswer: '', points: 1, orderIndex: 1,
    rubric: { criteria: ['Aussprache', 'grundlegende Flüssigkeit', 'verständliche Rede'], maxDuration: 30 },
    tags: ['Vorlesen', 'Vorstellung'], timeSuggested: 30
  },
  {
    language: 'German', cefrLevel: 'A1', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Beantworten Sie die folgende Frage. Sprechen Sie etwa 15-20 Sekunden:',
    speakingPrompt: 'Was machen Sie normalerweise am Wochenende?',
    correctAnswer: '', points: 1, orderIndex: 2,
    rubric: { criteria: ['verständliche Antwort', 'Grundwortschatz', 'relevanter Inhalt'], maxDuration: 30 },
    tags: ['einfache Frage', 'Alltag'], timeSuggested: 30
  },
  // A2 — Read aloud + describe
  {
    language: 'German', cefrLevel: 'A2', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Lesen Sie den folgenden Text deutlich vor:',
    speakingPrompt: 'Letzten Samstag bin ich mit meinen Freunden in den Park gegangen. Das Wetter war sonnig und warm. Wir haben ein Picknick gemacht und Fußball gespielt. Es war ein toller Tag.',
    correctAnswer: '', points: 1, orderIndex: 3,
    rubric: { criteria: ['deutliche Aussprache', 'angemessenes Tempo', 'Intonation', 'Aussprache der Vergangenheitsformen'], maxDuration: 45 },
    tags: ['Vorlesen', 'Perfekt'], timeSuggested: 45
  },
  {
    language: 'German', cefrLevel: 'A2', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Beschreiben Sie Ihr Lieblingsessen. Was ist es? Warum mögen Sie es? Wie oft essen Sie es? Sprechen Sie etwa 30 Sekunden.',
    speakingPrompt: 'Erzählen Sie mir von Ihrem Lieblingsessen.',
    correctAnswer: '', points: 1, orderIndex: 4,
    rubric: { criteria: ['beschreibender Wortschatz', 'einfache Sätze', 'relevanter Inhalt', 'grundlegende Flüssigkeit'], maxDuration: 45 },
    tags: ['Beschreibung', 'Essen'], timeSuggested: 45
  },
  // B1 — Describe situation + opinion
  {
    language: 'German', cefrLevel: 'B1', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Schauen Sie sich das folgende Thema an und sprechen Sie etwa 45-60 Sekunden. Geben Sie Ihre Meinung und Gründe an.',
    speakingPrompt: 'Finden Sie es wichtig, eine Fremdsprache zu lernen? Warum oder warum nicht? Nennen Sie mindestens zwei Gründe.',
    correctAnswer: '', points: 2, orderIndex: 5,
    rubric: { criteria: ['kohärente Meinung', 'stützende Gründe', 'Verbindungswörter', 'angemessener Wortschatz', 'Flüssigkeit'], maxDuration: 60 },
    tags: ['Meinung', 'Bildung'], timeSuggested: 60
  },
  {
    language: 'German', cefrLevel: 'B1', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Beschreiben Sie eine Situation und geben Sie Ihre Meinung ab. Sprechen Sie etwa 45-60 Sekunden.',
    speakingPrompt: 'Erzählen Sie von einer Herausforderung, vor der Sie standen, und wie Sie damit umgegangen sind. Was haben Sie daraus gelernt?',
    correctAnswer: '', points: 2, orderIndex: 6,
    rubric: { criteria: ['Erzählstruktur', 'Vergangenheitszeiten', 'Reflexion', 'Kohärenz', 'Flüssigkeit'], maxDuration: 60 },
    tags: ['Erzählung', 'persönliche Erfahrung'], timeSuggested: 60
  },
  {
    language: 'German', cefrLevel: 'B1', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Vergleichen Sie zwei Dinge und nennen Sie Ihre Präferenz. Sprechen Sie etwa 45-60 Sekunden.',
    speakingPrompt: 'Vergleichen Sie das Reisen mit dem Flugzeug und das Reisen mit dem Zug. Was bevorzugen Sie und warum?',
    correctAnswer: '', points: 2, orderIndex: 7,
    rubric: { criteria: ['Komparativstrukturen', 'Präferenzausdruck', 'stützende Gründe', 'Wortschatzbreite'], maxDuration: 60 },
    tags: ['Vergleich', 'Reisen'], timeSuggested: 60
  },
  // B2 — Describe and discuss
  {
    language: 'German', cefrLevel: 'B2', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Diskutieren Sie das folgende Thema etwa 60-90 Sekunden. Präsentieren Sie Argumente dafür und dagegen.',
    speakingPrompt: 'Manche Menschen glauben, dass Technologie unser Leben einfacher macht, während andere meinen, dass sie neue Probleme schafft. Diskutieren Sie beide Seiten und geben Sie Ihre eigene Meinung ab.',
    correctAnswer: '', points: 2, orderIndex: 8,
    rubric: { criteria: ['ausgewogene Diskussion', 'anspruchsvoller Wortschatz', 'Diskursmarker', 'Flüssigkeit und Kohärenz', 'klare Position'], maxDuration: 90 },
    tags: ['Diskussion', 'Technologie'], timeSuggested: 90
  },
  {
    language: 'German', cefrLevel: 'B2', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Beschreiben und analysieren Sie. Sprechen Sie etwa 60-90 Sekunden.',
    speakingPrompt: 'Beschreiben Sie, wie sich die Art und Weise, wie Menschen kommunizieren, in den letzten zwanzig Jahren verändert hat. Welche Vor- und Nachteile haben diese Veränderungen?',
    correctAnswer: '', points: 2, orderIndex: 9,
    rubric: { criteria: ['Analyse', 'Ursache und Wirkung', 'Beispiele', 'kohärente Argumentation', 'Aussprachegenauigkeit'], maxDuration: 90 },
    tags: ['Analyse', 'Kommunikation'], timeSuggested: 90
  },
  // C1 — Argue a position
  {
    language: 'German', cefrLevel: 'C1', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Vertreten und verteidigen Sie eine Position zum folgenden Thema. Sprechen Sie etwa 90-120 Sekunden.',
    speakingPrompt: 'Inwieweit sollten Regierungen Social-Media-Plattformen regulieren? Berücksichtigen Sie Fragen der Meinungsfreiheit, Fehlinformation und Privatsphäre in Ihrer Antwort.',
    correctAnswer: '', points: 3, orderIndex: 10,
    rubric: { criteria: ['differenzierte Argumentation', 'nuancierte Position', 'Abschwächung und Einschränkung', 'akademischer Wortschatz', 'anhaltende Flüssigkeit', 'natürliche Intonation'], maxDuration: 120 },
    tags: ['Argumentation', 'Politik', 'Technologie'], timeSuggested: 120
  },
  {
    language: 'German', cefrLevel: 'C1', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Analysieren und diskutieren Sie. Sprechen Sie etwa 90-120 Sekunden.',
    speakingPrompt: 'Manche argumentieren, dass die Globalisierung die kulturelle Vielfalt verringert hat. Andere sagen, sie hat sie bereichert. Wie ist Ihre Meinung? Nennen Sie konkrete Beispiele.',
    correctAnswer: '', points: 3, orderIndex: 11,
    rubric: { criteria: ['kritisches Denken', 'konkrete Beispiele', 'komplexe Satzstrukturen', 'idiomatische Sprache', 'kohärente längere Rede'], maxDuration: 120 },
    tags: ['Analyse', 'Kultur', 'Globalisierung'], timeSuggested: 120
  },
  // C2 — Abstract discussion
  {
    language: 'German', cefrLevel: 'C2', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Diskutieren Sie das folgende abstrakte Thema ausführlich. Sprechen Sie etwa 2 Minuten.',
    speakingPrompt: 'Ist echte Objektivität im Journalismus möglich, oder ist jede Berichterstattung zwangsläufig subjektiv? Erörtern Sie die philosophischen Implikationen dieser Frage.',
    correctAnswer: '', points: 3, orderIndex: 12,
    rubric: { criteria: ['philosophische Tiefe', 'abstraktes Denken', 'nahezu muttersprachliche Flüssigkeit', 'anspruchsvolles Register', 'rhetorisches Geschick', 'nuancierte Schlussfolgerung'], maxDuration: 150 },
    tags: ['abstrakt', 'Philosophie', 'Medien'], timeSuggested: 150
  },
  {
    language: 'German', cefrLevel: 'C2', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Präsentieren Sie ein differenziertes Argument zum folgenden Thema. Sprechen Sie etwa 2 Minuten.',
    speakingPrompt: 'Inwieweit formt die Sprache, die wir sprechen, die Art und Weise, wie wir denken und die Welt wahrnehmen? Beziehen Sie sich, wenn möglich, auf Beispiele aus verschiedenen Sprachen oder Kulturen.',
    correctAnswer: '', points: 3, orderIndex: 13,
    rubric: { criteria: ['intellektuelle Tiefe', 'interkulturelle Bezüge', 'präziser Wortschatz', 'natürlicher Redefluss', 'eleganter Ausdruck'], maxDuration: 150 },
    tags: ['abstrakt', 'Linguistik', 'Kultur'], timeSuggested: 150
  },
  {
    language: 'German', cefrLevel: 'C2', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Reagieren Sie auf das folgende philosophische Dilemma. Sprechen Sie etwa 2 Minuten.',
    speakingPrompt: 'Wenn eine künstliche Intelligenz kreative Werke erzeugen kann, die nicht von menschlicher Kunst zu unterscheiden sind, mindert dies den Wert menschlicher Kreativität? Warum oder warum nicht?',
    correctAnswer: '', points: 3, orderIndex: 14,
    rubric: { criteria: ['philosophisches Denken', 'Berücksichtigung von Gegenargumenten', 'eloquenter Ausdruck', 'durchgehende Argumentation', 'natürliche Prosodie'], maxDuration: 150 },
    tags: ['abstrakt', 'KI', 'Kreativität'], timeSuggested: 150
  }
]
