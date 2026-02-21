import { MultiSkillQuestionData } from '../types'

// Italian Writing Prompts — 2-3 per CEFR level (14 total)
// Progressive complexity: short answer -> paragraph -> essay

export const italianWritingQuestions: MultiSkillQuestionData[] = [
  // A1 — Short answers (20-50 words)
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'SHORT_ANSWER', skill: 'WRITING',
    questionText: 'Scrivi qualcosa su di te. Includi il tuo nome, la tua età, da dove vieni e una cosa che ti piace.',
    correctAnswer: '', points: 1, orderIndex: 1,
    rubric: { minWords: 20, maxWords: 50, criteria: ['informazioni personali di base', 'frasi semplici', 'vocabolario di base'] },
    tags: ['personale', 'presentazione'], timeSuggested: 180
  },
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'SHORT_ANSWER', skill: 'WRITING',
    questionText: 'Descrivi la tua famiglia. Quante persone ci sono nella tua famiglia? Come si chiamano?',
    correctAnswer: '', points: 1, orderIndex: 2,
    rubric: { minWords: 20, maxWords: 50, criteria: ['vocabolario della famiglia', 'numeri', 'frasi semplici'] },
    tags: ['famiglia'], timeSuggested: 180
  },
  // A2 — Short answers (30-60 words)
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'SHORT_ANSWER', skill: 'WRITING',
    questionText: 'Descrivi la tua routine quotidiana. Cosa fai la mattina, il pomeriggio e la sera?',
    correctAnswer: '', points: 1, orderIndex: 3,
    rubric: { minWords: 30, maxWords: 60, criteria: ['espressioni temporali', 'presente indicativo', 'parole di sequenza'] },
    tags: ['routine quotidiana'], timeSuggested: 240
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'SHORT_ANSWER', skill: 'WRITING',
    questionText: 'Scrivi della tua ultima vacanza. Dove sei andato? Cosa hai fatto? Ti è piaciuta?',
    correctAnswer: '', points: 1, orderIndex: 4,
    rubric: { minWords: 30, maxWords: 60, criteria: ['passato prossimo', 'vocabolario del viaggio', 'opinioni'] },
    tags: ['viaggio', 'passato prossimo'], timeSuggested: 240
  },
  // B1 — Paragraph (80-150 words)
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'SHORT_ANSWER', skill: 'WRITING',
    questionText: 'Secondo te, è meglio vivere in città o in campagna? Dai le ragioni della tua opinione.',
    correctAnswer: '', points: 2, orderIndex: 5,
    rubric: { minWords: 80, maxWords: 150, criteria: ['espressione dell\'opinione', 'strutture comparative', 'ragioni a sostegno', 'struttura del paragrafo'] },
    tags: ['opinione', 'comparativi'], timeSuggested: 360
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'SHORT_ANSWER', skill: 'WRITING',
    questionText: 'Scrivi dei vantaggi e degli svantaggi dell\'uso dei social media. Fai degli esempi dalla tua esperienza.',
    correctAnswer: '', points: 2, orderIndex: 6,
    rubric: { minWords: 80, maxWords: 150, criteria: ['struttura vantaggi/svantaggi', 'connettivi', 'esempi', 'argomentazione coerente'] },
    tags: ['tecnologia', 'opinione'], timeSuggested: 360
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'SHORT_ANSWER', skill: 'WRITING',
    questionText: 'Descrivi una persona che ha influenzato la tua vita e spiega perché è importante per te.',
    correctAnswer: '', points: 2, orderIndex: 7,
    rubric: { minWords: 80, maxWords: 150, criteria: ['descrizione di persone', 'narrativa personale', 'passato prossimo/imperfetto', 'vocabolario emotivo'] },
    tags: ['personale', 'descrizione'], timeSuggested: 360
  },
  // B2 — Paragraph (100-200 words)
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'Alcune persone credono che il lavoro da remoto sostituirà il lavoro tradizionale in ufficio in futuro. In che misura sei d\'accordo o in disaccordo? Sostieni il tuo argomento con ragioni specifiche.',
    correctAnswer: '', points: 2, orderIndex: 8,
    rubric: { minWords: 100, maxWords: 200, criteria: ['tesi chiara', 'argomenti a sostegno', 'consapevolezza del controargomento', 'registro formale', 'dispositivi coesivi'] },
    tags: ['lavoro', 'opinione', 'formale'], timeSuggested: 480
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'Scrivi di come la tecnologia ha cambiato il modo in cui le persone imparano le lingue. Includi sia gli effetti positivi che quelli negativi.',
    correctAnswer: '', points: 2, orderIndex: 9,
    rubric: { minWords: 100, maxWords: 200, criteria: ['argomentazione equilibrata', 'esempi specifici', 'causa ed effetto', 'vocabolario accademico'] },
    tags: ['tecnologia', 'educazione'], timeSuggested: 480
  },
  // C1 — Essay (150-250 words)
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'Valuta criticamente l\'affermazione secondo cui i social media hanno fatto più male che bene al discorso democratico. Fornisci prove a sostegno del tuo argomento.',
    correctAnswer: '', points: 3, orderIndex: 10,
    rubric: { minWords: 150, maxWords: 250, criteria: ['analisi critica', 'argomentazione basata su prove', 'posizione sfumata', 'vocabolario sofisticato', 'dispositivi retorici', 'struttura logica'] },
    tags: ['media', 'politica', 'pensiero critico'], timeSuggested: 600
  },
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'Discuti le implicazioni etiche dell\'intelligenza artificiale nella sanità. I sistemi di IA dovrebbero essere autorizzati a prendere decisioni diagnostiche senza supervisione umana?',
    correctAnswer: '', points: 3, orderIndex: 11,
    rubric: { minWords: 150, maxWords: 250, criteria: ['ragionamento etico', 'prospettive multiple', 'registro accademico', 'strutture condizionali', 'linguaggio di attenuazione'] },
    tags: ['tecnologia', 'etica', 'salute'], timeSuggested: 600
  },
  // C2 — Essay (200-300 words)
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'La mercificazione dell\'istruzione superiore ne ha alterato fondamentalmente lo scopo e il valore. Discuti questa affermazione, considerando sia le prospettive economiche che quelle filosofiche.',
    correctAnswer: '', points: 3, orderIndex: 12,
    rubric: { minWords: 200, maxWords: 300, criteria: ['argomentazione sofisticata', 'riferimenti interdisciplinari', 'ragionamento astratto', 'padronanza quasi nativa', 'varietà stilistica', 'conclusione sfumata'] },
    tags: ['educazione', 'filosofia', 'economia'], timeSuggested: 720
  },
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'In che misura la lingua può plasmare la realtà? Discuti con riferimento all\'ipotesi di Sapir-Whorf e alla ricerca contemporanea sulla relatività linguistica.',
    correctAnswer: '', points: 3, orderIndex: 13,
    rubric: { minWords: 200, maxWords: 300, criteria: ['argomentazione accademica', 'conoscenza teorica', 'valutazione critica delle prove', 'struttura coesa del saggio accademico', 'vocabolario preciso e vario'] },
    tags: ['linguistica', 'filosofia'], timeSuggested: 720
  },
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'Analizza la tensione tra privacy individuale e sicurezza collettiva nell\'era digitale. Come dovrebbero le società democratiche affrontare questo dilemma?',
    correctAnswer: '', points: 3, orderIndex: 14,
    rubric: { minWords: 200, maxWords: 300, criteria: ['profondità filosofica', 'analisi equilibrata', 'consapevolezza politica', 'prosa elegante', 'coerenza logica'] },
    tags: ['tecnologia', 'politica', 'etica'], timeSuggested: 720
  }
]
