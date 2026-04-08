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
    speakingPrompt: 'Letzten Samstag bin ich mit meinen Kollegen zu einer Konferenz gefahren. Das Hotel war modern und komfortabel. Wir haben an drei Workshops teilgenommen und neue Kunden kennengelernt. Es war ein produktiver Tag.',
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
  },

  // ============================================================
  // NEUE FRAGEN — 16 weitere (orderIndex 15-30)
  // ============================================================

  // A1
  {
    language: 'German', cefrLevel: 'A1', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Schauen Sie sich das Bild an und beschreiben Sie, was Sie sehen. Verwenden Sie einfache Wörter.',
    speakingPrompt: 'Beschreiben Sie das Bild: Eine Familie ist in der Küche. Was machen sie?',
    correctAnswer: '', points: 1, orderIndex: 15,
    rubric: { criteria: ['Grundwortschatz', 'einfache Sätze', 'verständliche Rede'], maxDuration: 30 },
    tags: ['Bild beschreiben', 'Familie'], timeSuggested: 30
  },
  {
    language: 'German', cefrLevel: 'A1', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Erzählen Sie von sich selbst. Sprechen Sie etwa 15-20 Sekunden.',
    speakingPrompt: 'Was ist Ihr Beruf? Wo arbeiten Sie? Gefällt Ihnen Ihre Arbeit?',
    correctAnswer: '', points: 1, orderIndex: 16,
    rubric: { criteria: ['verständliche Antwort', 'Grundwortschatz', 'relevanter Inhalt'], maxDuration: 30 },
    tags: ['Vorstellung', 'Arbeit'], timeSuggested: 30
  },
  {
    language: 'German', cefrLevel: 'A1', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Beantworten Sie die folgende Frage. Sprechen Sie etwa 15-20 Sekunden:',
    speakingPrompt: 'Was ist Ihre Lieblingsfarbe? Welche Dinge haben Sie in dieser Farbe?',
    correctAnswer: '', points: 1, orderIndex: 17,
    rubric: { criteria: ['Grundwortschatz', 'einfache Sätze', 'verständliche Rede'], maxDuration: 30 },
    tags: ['einfache Frage', 'Farben'], timeSuggested: 30
  },

  // A2
  {
    language: 'German', cefrLevel: 'A2', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Beschreiben Sie Ihre Morgenroutine. Sprechen Sie etwa 30 Sekunden.',
    speakingPrompt: 'Was machen Sie jeden Morgen? Erzählen Sie vom Aufwachen bis zum Verlassen des Hauses.',
    correctAnswer: '', points: 1, orderIndex: 18,
    rubric: { criteria: ['Zeitangaben', 'Präsens', 'Reihenfolgewörter', 'deutliche Aussprache'], maxDuration: 45 },
    tags: ['Routine', 'Alltag'], timeSuggested: 45
  },
  {
    language: 'German', cefrLevel: 'A2', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Erzählen Sie eine kurze Geschichte über etwas, das Ihnen kürzlich passiert ist. Sprechen Sie etwa 30 Sekunden.',
    speakingPrompt: 'Erzählen Sie mir von etwas Lustigem oder Interessantem, das Ihnen letzte Woche passiert ist.',
    correctAnswer: '', points: 1, orderIndex: 19,
    rubric: { criteria: ['Perfekt', 'Erzählsequenz', 'grundlegende Flüssigkeit', 'relevanter Inhalt'], maxDuration: 45 },
    tags: ['Erzählung', 'Perfekt'], timeSuggested: 45
  },

  // B1
  {
    language: 'German', cefrLevel: 'B1', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Sprechen Sie über das folgende Thema etwa 45-60 Sekunden. Geben Sie Ihre Meinung ab.',
    speakingPrompt: 'Sollten Kinder ein Handy haben? Ab welchem Alter? Warum oder warum nicht?',
    correctAnswer: '', points: 1, orderIndex: 20,
    rubric: { criteria: ['kohärente Meinung', 'stützende Gründe', 'Verbindungswörter', 'Flüssigkeit'], maxDuration: 60 },
    tags: ['Meinung', 'Technologie'], timeSuggested: 60
  },
  {
    language: 'German', cefrLevel: 'B1', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Erklären Sie Ihre Zukunftspläne. Sprechen Sie etwa 45-60 Sekunden.',
    speakingPrompt: 'Was sind Ihre Pläne für die nächsten fünf Jahre? Was möchten Sie erreichen und warum?',
    correctAnswer: '', points: 1, orderIndex: 21,
    rubric: { criteria: ['Futur', 'Konjunktivstrukturen', 'kohärenter Plan', 'angemessener Wortschatz'], maxDuration: 60 },
    tags: ['Pläne', 'Zukunft'], timeSuggested: 60
  },

  // B2
  {
    language: 'German', cefrLevel: 'B2', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Diskutieren Sie das folgende Thema etwa 60-90 Sekunden. Präsentieren Sie mehrere Perspektiven.',
    speakingPrompt: 'Sollte die Hochschulbildung für alle kostenlos sein? Welche wirtschaftlichen und sozialen Auswirkungen hätte das?',
    correctAnswer: '', points: 2, orderIndex: 22,
    rubric: { criteria: ['ausgewogene Diskussion', 'anspruchsvoller Wortschatz', 'Diskursmarker', 'Flüssigkeit und Kohärenz'], maxDuration: 90 },
    tags: ['Debatte', 'Bildung'], timeSuggested: 90
  },
  {
    language: 'German', cefrLevel: 'B2', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Analysieren Sie die folgende Situation. Sprechen Sie etwa 60-90 Sekunden.',
    speakingPrompt: 'Viele Unternehmen führen die Vier-Tage-Woche ein. Analysieren Sie die möglichen Auswirkungen auf die Produktivität, das Wohlbefinden der Mitarbeiter und die Wirtschaft.',
    correctAnswer: '', points: 2, orderIndex: 23,
    rubric: { criteria: ['Analyse', 'Ursache und Wirkung', 'Beispiele', 'kohärente Argumentation', 'Aussprachegenauigkeit'], maxDuration: 90 },
    tags: ['Analyse', 'Arbeit'], timeSuggested: 90
  },

  // C1
  {
    language: 'German', cefrLevel: 'C1', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Vertreten und verteidigen Sie eine Position. Sprechen Sie etwa 90-120 Sekunden.',
    speakingPrompt: 'Ist Wirtschaftswachstum mit ökologischer Nachhaltigkeit vereinbar, oder muss eines für das andere geopfert werden? Begründen Sie Ihre Position mit Belegen.',
    correctAnswer: '', points: 2, orderIndex: 24,
    rubric: { criteria: ['differenzierte Argumentation', 'nuancierte Position', 'Abschwächung und Einschränkung', 'akademischer Wortschatz', 'anhaltende Flüssigkeit'], maxDuration: 120 },
    tags: ['Argumentation', 'Umwelt', 'Wirtschaft'], timeSuggested: 120
  },
  {
    language: 'German', cefrLevel: 'C1', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Diskutieren Sie die folgende abstrakte Idee. Sprechen Sie etwa 90-120 Sekunden.',
    speakingPrompt: 'Welche Rolle spielt Empathie bei effektiver Führung? Kann Empathie gelehrt werden, oder ist sie eine angeborene Eigenschaft?',
    correctAnswer: '', points: 2, orderIndex: 25,
    rubric: { criteria: ['kritisches Denken', 'abstraktes Denken', 'komplexe Satzstrukturen', 'idiomatische Sprache', 'kohärente längere Rede'], maxDuration: 120 },
    tags: ['abstrakt', 'Führung'], timeSuggested: 120
  },
  {
    language: 'German', cefrLevel: 'C1', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Analysieren und diskutieren Sie. Sprechen Sie etwa 90-120 Sekunden.',
    speakingPrompt: 'Inwieweit hat die digitale Revolution die Kluft zwischen Industrie- und Entwicklungsländern vergrößert oder verringert? Nennen Sie konkrete Beispiele.',
    correctAnswer: '', points: 2, orderIndex: 26,
    rubric: { criteria: ['kritische Analyse', 'konkrete Beispiele', 'akademisches Register', 'anhaltende Argumentation', 'natürliche Intonation'], maxDuration: 120 },
    tags: ['Analyse', 'Technologie', 'Ungleichheit'], timeSuggested: 120
  },

  // C2
  {
    language: 'German', cefrLevel: 'C2', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Diskutieren Sie die folgende philosophische Frage ausführlich. Sprechen Sie etwa 2 Minuten.',
    speakingPrompt: 'Kann eine Gesellschaft, die individuelle Freiheit priorisiert, jemals echte Gleichheit erreichen? Erörtern Sie die inhärenten Spannungen zwischen Freiheit und Gleichheit.',
    correctAnswer: '', points: 2, orderIndex: 27,
    rubric: { criteria: ['philosophische Tiefe', 'abstraktes Denken', 'nahezu muttersprachliche Flüssigkeit', 'anspruchsvolles Register', 'rhetorisches Geschick'], maxDuration: 150 },
    tags: ['Philosophie', 'Politik', 'abstrakt'], timeSuggested: 150
  },
  {
    language: 'German', cefrLevel: 'C2', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Präsentieren Sie ein differenziertes Argument zum folgenden Thema. Sprechen Sie etwa 2 Minuten.',
    speakingPrompt: 'Ist das Konzept des „Fortschritts" kulturell relativ, oder gibt es universelle Maßstäbe, anhand derer wir beurteilen können, ob die Menschheit vorankommt?',
    correctAnswer: '', points: 2, orderIndex: 28,
    rubric: { criteria: ['intellektuelle Tiefe', 'interkulturelle Bezüge', 'präziser Wortschatz', 'natürlicher Redefluss', 'eleganter Ausdruck'], maxDuration: 150 },
    tags: ['abstrakt', 'Kultur', 'Philosophie'], timeSuggested: 150
  },
  {
    language: 'German', cefrLevel: 'C2', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Reagieren Sie auf das folgende ethische Dilemma. Sprechen Sie etwa 2 Minuten.',
    speakingPrompt: 'Sollte es Grenzen für die wissenschaftliche Forschung in Bereichen wie Gentechnik und menschliche Verbesserung geben? Wo sollten diese Grenzen liegen und wer sollte sie setzen?',
    correctAnswer: '', points: 2, orderIndex: 29,
    rubric: { criteria: ['ethisches Denken', 'Berücksichtigung von Gegenargumenten', 'eloquenter Ausdruck', 'durchgehende Argumentation', 'natürliche Prosodie'], maxDuration: 150 },
    tags: ['Ethik', 'Wissenschaft', 'abstrakt'], timeSuggested: 150
  },
  {
    language: 'German', cefrLevel: 'C2', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Diskutieren Sie das folgende Thema mit philosophischer Tiefe. Sprechen Sie etwa 2 Minuten.',
    speakingPrompt: 'Führt das Streben nach Glück als Lebensziel zu einer sinnvollen Existenz, oder findet man Sinn durch Leiden und Aufopferung? Diskutieren Sie unter Bezugnahme auf philosophische Traditionen.',
    correctAnswer: '', points: 2, orderIndex: 30,
    rubric: { criteria: ['philosophisches Denken', 'literarische/philosophische Bezüge', 'anspruchsvolles Register', 'anhaltende Flüssigkeit', 'nuancierte Schlussfolgerung'], maxDuration: 150 },
    tags: ['Philosophie', 'abstrakt', 'Existentialismus'], timeSuggested: 150
  }
]
