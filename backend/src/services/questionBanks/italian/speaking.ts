import { MultiSkillQuestionData } from '../types'

// Italian Speaking Prompts — 2-3 per CEFR level (14 total)
// Types: Read aloud, describe, opinion, argue

export const italianSpeakingQuestions: MultiSkillQuestionData[] = [
  // A1 — Read aloud + simple question
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Leggi la seguente frase ad alta voce:',
    speakingPrompt: 'Ciao, mi chiamo [il tuo nome]. Sono di [il tuo Paese]. Mi piace [qualcosa che ti piace].',
    correctAnswer: '', points: 1, orderIndex: 1,
    rubric: { criteria: ['pronuncia', 'fluenza di base', 'discorso comprensibile'], maxDuration: 30 },
    tags: ['lettura ad alta voce', 'presentazione'], timeSuggested: 30
  },
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Rispondi alla seguente domanda. Parla per circa 15-20 secondi:',
    speakingPrompt: 'Cosa fai di solito nel fine settimana?',
    correctAnswer: '', points: 1, orderIndex: 2,
    rubric: { criteria: ['risposta comprensibile', 'vocabolario di base', 'contenuto pertinente'], maxDuration: 30 },
    tags: ['domanda semplice', 'vita quotidiana'], timeSuggested: 30
  },
  // A2 — Read aloud + describe
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Leggi il seguente testo ad alta voce in modo chiaro:',
    speakingPrompt: 'Sabato scorso sono andato al parco con i miei amici. Il tempo era soleggiato e caldo. Abbiamo fatto un picnic e giocato a pallone. È stata una bella giornata.',
    correctAnswer: '', points: 1, orderIndex: 3,
    rubric: { criteria: ['pronuncia chiara', 'ritmo appropriato', 'intonazione', 'pronuncia del passato prossimo'], maxDuration: 45 },
    tags: ['lettura ad alta voce', 'passato prossimo'], timeSuggested: 45
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Descrivi il tuo piatto preferito. Qual è? Perché ti piace? Quanto spesso lo mangi? Parla per circa 30 secondi.',
    speakingPrompt: 'Parlami del tuo piatto preferito.',
    correctAnswer: '', points: 1, orderIndex: 4,
    rubric: { criteria: ['vocabolario descrittivo', 'frasi semplici', 'contenuto pertinente', 'fluenza di base'], maxDuration: 45 },
    tags: ['descrizione', 'cibo'], timeSuggested: 45
  },
  // B1 — Describe situation + opinion
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Guarda l\'argomento qui sotto e parla per circa 45-60 secondi. Dai la tua opinione e le tue ragioni.',
    speakingPrompt: 'Pensi che sia importante imparare una lingua straniera? Perché sì o perché no? Dai almeno due ragioni.',
    correctAnswer: '', points: 2, orderIndex: 5,
    rubric: { criteria: ['opinione coerente', 'ragioni a sostegno', 'connettivi', 'vocabolario appropriato', 'fluenza'], maxDuration: 60 },
    tags: ['opinione', 'educazione'], timeSuggested: 60
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Descrivi una situazione e dai la tua opinione. Parla per circa 45-60 secondi.',
    speakingPrompt: 'Racconta di una sfida che hai affrontato e come l\'hai superata. Cosa hai imparato da quell\'esperienza?',
    correctAnswer: '', points: 2, orderIndex: 6,
    rubric: { criteria: ['struttura narrativa', 'tempi passati', 'riflessione', 'coerenza', 'fluenza'], maxDuration: 60 },
    tags: ['narrazione', 'esperienza personale'], timeSuggested: 60
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Confronta due cose ed esprimi la tua preferenza. Parla per circa 45-60 secondi.',
    speakingPrompt: 'Confronta il viaggio in aereo e il viaggio in treno. Quale preferisci e perché?',
    correctAnswer: '', points: 2, orderIndex: 7,
    rubric: { criteria: ['strutture comparative', 'espressione di preferenza', 'ragioni a sostegno', 'ampiezza del vocabolario'], maxDuration: 60 },
    tags: ['confronto', 'viaggio'], timeSuggested: 60
  },
  // B2 — Describe and discuss
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Discuti il seguente argomento per circa 60-90 secondi. Presenta argomenti a favore e contro.',
    speakingPrompt: 'Alcune persone credono che la tecnologia renda la nostra vita più facile, mentre altri pensano che crei nuovi problemi. Discuti entrambi i lati e dai la tua opinione.',
    correctAnswer: '', points: 2, orderIndex: 8,
    rubric: { criteria: ['discussione equilibrata', 'vocabolario sofisticato', 'segnali discorsivi', 'fluenza e coerenza', 'posizione chiara'], maxDuration: 90 },
    tags: ['discussione', 'tecnologia'], timeSuggested: 90
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Descrivi e analizza. Parla per circa 60-90 secondi.',
    speakingPrompt: 'Descrivi come è cambiato il modo in cui le persone comunicano negli ultimi vent\'anni. Quali sono i vantaggi e gli svantaggi di questi cambiamenti?',
    correctAnswer: '', points: 2, orderIndex: 9,
    rubric: { criteria: ['analisi', 'causa ed effetto', 'esempi', 'argomentazione coerente', 'accuratezza della pronuncia'], maxDuration: 90 },
    tags: ['analisi', 'comunicazione'], timeSuggested: 90
  },
  // C1 — Argue a position
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Presenta e difendi una posizione sul seguente argomento. Parla per circa 90-120 secondi.',
    speakingPrompt: 'In che misura i governi dovrebbero regolamentare le piattaforme di social media? Considera le questioni della libertà di espressione, della disinformazione e della privacy nella tua risposta.',
    correctAnswer: '', points: 3, orderIndex: 10,
    rubric: { criteria: ['argomentazione sofisticata', 'posizione sfumata', 'attenuazione e qualificazione', 'vocabolario accademico', 'fluenza sostenuta', 'intonazione naturale'], maxDuration: 120 },
    tags: ['argomentazione', 'politica', 'tecnologia'], timeSuggested: 120
  },
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Analizza e discuti. Parla per circa 90-120 secondi.',
    speakingPrompt: 'Alcuni sostengono che la globalizzazione abbia ridotto la diversità culturale. Altri dicono che l\'abbia arricchita. Qual è la tua opinione? Fornisci esempi specifici.',
    correctAnswer: '', points: 3, orderIndex: 11,
    rubric: { criteria: ['pensiero critico', 'esempi specifici', 'strutture di frasi complesse', 'linguaggio idiomatico', 'discorso esteso coerente'], maxDuration: 120 },
    tags: ['analisi', 'cultura', 'globalizzazione'], timeSuggested: 120
  },
  // C2 — Abstract discussion
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Discuti in profondità il seguente argomento astratto. Parla per circa 2 minuti.',
    speakingPrompt: 'È possibile avere una vera oggettività nel giornalismo, o ogni resoconto è intrinsecamente soggettivo? Esplora le implicazioni filosofiche di questa domanda.',
    correctAnswer: '', points: 3, orderIndex: 12,
    rubric: { criteria: ['profondità filosofica', 'ragionamento astratto', 'fluenza quasi nativa', 'registro sofisticato', 'abilità retorica', 'conclusione sfumata'], maxDuration: 150 },
    tags: ['astratto', 'filosofia', 'media'], timeSuggested: 150
  },
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Presenta un argomento sfumato sul seguente tema. Parla per circa 2 minuti.',
    speakingPrompt: 'In che misura la lingua che parliamo plasma il modo in cui pensiamo e percepiamo il mondo? Se possibile, fai riferimento a esempi provenienti da lingue o culture diverse.',
    correctAnswer: '', points: 3, orderIndex: 13,
    rubric: { criteria: ['profondità intellettuale', 'riferimenti interculturali', 'vocabolario preciso', 'flusso discorsivo naturale', 'espressione elegante'], maxDuration: 150 },
    tags: ['astratto', 'linguistica', 'cultura'], timeSuggested: 150
  },
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'SPEAKING_PROMPT', skill: 'SPEAKING',
    questionText: 'Rispondi al seguente dilemma filosofico. Parla per circa 2 minuti.',
    speakingPrompt: 'Se un\'intelligenza artificiale può produrre opere creative indistinguibili dall\'arte umana, questo sminuisce il valore della creatività umana? Perché sì o perché no?',
    correctAnswer: '', points: 3, orderIndex: 14,
    rubric: { criteria: ['ragionamento filosofico', 'considerazione del controargomento', 'espressione eloquente', 'argomentazione sostenuta', 'prosodia naturale'], maxDuration: 150 },
    tags: ['astratto', 'IA', 'creatività'], timeSuggested: 150
  }
]
