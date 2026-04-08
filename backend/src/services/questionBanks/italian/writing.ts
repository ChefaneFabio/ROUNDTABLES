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
    questionText: 'Descrivi il tuo team di lavoro. Quante persone ci sono nel tuo team? Cosa fanno?',
    correctAnswer: '', points: 1, orderIndex: 2,
    rubric: { minWords: 20, maxWords: 50, criteria: ['vocabolario lavorativo', 'numeri', 'frasi semplici'] },
    tags: ['lavoro'], timeSuggested: 180
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
  },

  // ============================================================
  // NUOVE DOMANDE — 16 in più (orderIndex 15-30)
  // ============================================================

  // A1 (20-50 parole)
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'SHORT_ANSWER', skill: 'WRITING',
    questionText: 'Scrivi una breve cartolina a un amico. Digli dove sei e com\'è il tempo.',
    correctAnswer: '', points: 1, orderIndex: 15,
    rubric: { minWords: 20, maxWords: 50, criteria: ['formula di saluto', 'frasi semplici', 'vocabolario del meteo'] },
    tags: ['cartolina', 'meteo'], timeSuggested: 180
  },
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'SHORT_ANSWER', skill: 'WRITING',
    questionText: 'Descrivi la tua casa o il tuo appartamento. Quante stanze ha? Qual è la tua stanza preferita?',
    correctAnswer: '', points: 1, orderIndex: 16,
    rubric: { minWords: 20, maxWords: 50, criteria: ['vocabolario della casa', 'c\'è/ci sono', 'aggettivi semplici'] },
    tags: ['casa', 'descrizione'], timeSuggested: 180
  },
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'SHORT_ANSWER', skill: 'WRITING',
    questionText: 'Cosa ti piace mangiare e bere? Scrivi dei tuoi pasti preferiti.',
    correctAnswer: '', points: 1, orderIndex: 17,
    rubric: { minWords: 20, maxWords: 50, criteria: ['vocabolario alimentare', 'piacere/preferire', 'frasi semplici'] },
    tags: ['cibo', 'preferenze'], timeSuggested: 180
  },

  // A2 (40-80 parole)
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'SHORT_ANSWER', skill: 'WRITING',
    questionText: 'Scrivi un\'email a un amico per invitarlo a una festa. Indica la data, l\'ora, il luogo e cosa portare.',
    correctAnswer: '', points: 1, orderIndex: 18,
    rubric: { minWords: 40, maxWords: 80, criteria: ['formato email', 'piani futuri', 'linguaggio di invito', 'dettagli'] },
    tags: ['email', 'invito'], timeSuggested: 240
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'SHORT_ANSWER', skill: 'WRITING',
    questionText: 'Descrivi il tuo migliore amico / la tua migliore amica. Com\'è fisicamente? Cosa vi piace fare insieme?',
    correctAnswer: '', points: 1, orderIndex: 19,
    rubric: { minWords: 40, maxWords: 80, criteria: ['descrizione fisica', 'aggettivi di personalità', 'presente indicativo', 'piacere + infinito'] },
    tags: ['amico', 'descrizione'], timeSuggested: 240
  },

  // B1 (80-150 parole)
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'SHORT_ANSWER', skill: 'WRITING',
    questionText: 'Scrivi una lettera di reclamo al direttore di un albergo riguardo a un problema che hai avuto durante il soggiorno.',
    correctAnswer: '', points: 2, orderIndex: 20,
    rubric: { minWords: 80, maxWords: 150, criteria: ['formato lettera formale', 'linguaggio di reclamo', 'racconto al passato', 'richieste cortesi'] },
    tags: ['reclamo', 'lettera formale'], timeSuggested: 360
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'SHORT_ANSWER', skill: 'WRITING',
    questionText: 'Pensi che l\'orario flessibile migliori la produttività? Dai la tua opinione con ragioni ed esempi.',
    correctAnswer: '', points: 2, orderIndex: 21,
    rubric: { minWords: 80, maxWords: 150, criteria: ['espressione dell\'opinione', 'ragioni a sostegno', 'esempi', 'struttura del paragrafo'] },
    tags: ['opinione', 'lavoro'], timeSuggested: 360
  },

  // B2 (150-250 parole)
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'Scrivi un rapporto sull\'impatto del turismo sulle comunità locali. Considera sia gli effetti positivi che quelli negativi e suggerisci delle soluzioni.',
    correctAnswer: '', points: 2, orderIndex: 22,
    rubric: { minWords: 150, maxWords: 250, criteria: ['struttura del rapporto', 'analisi equilibrata', 'raccomandazioni', 'registro formale', 'dispositivi coesivi'] },
    tags: ['rapporto', 'turismo'], timeSuggested: 480
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'Alcuni ritengono che lo sport agonistico insegni competenze di vita importanti, altri pensano che metta troppa pressione sui giovani. Discuti entrambi i punti di vista.',
    correctAnswer: '', points: 2, orderIndex: 23,
    rubric: { minWords: 150, maxWords: 250, criteria: ['tesi chiara', 'argomentazione equilibrata', 'esempi specifici', 'vocabolario formale', 'struttura logica'] },
    tags: ['argomentativo', 'sport'], timeSuggested: 480
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'Scrivi un saggio discutendo se gli influencer dei social media hanno un impatto positivo o negativo sull\'autostima e sui valori dei giovani.',
    correctAnswer: '', points: 2, orderIndex: 24,
    rubric: { minWords: 150, maxWords: 250, criteria: ['struttura argomentativa', 'consapevolezza del controargomento', 'esempi', 'vocabolario accademico'] },
    tags: ['argomentativo', 'social media'], timeSuggested: 480
  },

  // C1 (200-350 parole)
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'Scrivi una proposta per la tua azienda o istituzione suggerendo modi per ridurre la sua impronta ecologica. Includi misure specifiche e giustifica la loro fattibilità.',
    correctAnswer: '', points: 3, orderIndex: 25,
    rubric: { minWords: 200, maxWords: 350, criteria: ['formato di proposta', 'argomentazione persuasiva', 'analisi di fattibilità', 'vocabolario sofisticato', 'registro formale'] },
    tags: ['proposta', 'ambiente'], timeSuggested: 600
  },
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'Analizza criticamente il ruolo dei test standardizzati nell\'istruzione. Misurano l\'apprendimento in modo efficace, o ostacolano un autentico sviluppo intellettuale?',
    correctAnswer: '', points: 3, orderIndex: 26,
    rubric: { minWords: 200, maxWords: 350, criteria: ['analisi critica', 'argomentazione basata su prove', 'posizione sfumata', 'dispositivi retorici', 'registro accademico'] },
    tags: ['analisi critica', 'educazione'], timeSuggested: 600
  },

  // C2 (250-400 parole)
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'Scrivi un saggio filosofico esplorando se le verità morali sono fatti oggettivi o costruzioni sociali. Fai riferimento ad almeno due tradizioni filosofiche.',
    correctAnswer: '', points: 3, orderIndex: 27,
    rubric: { minWords: 250, maxWords: 400, criteria: ['profondità filosofica', 'riferimenti interdisciplinari', 'ragionamento astratto', 'padronanza quasi nativa', 'prosa elegante'] },
    tags: ['filosofia', 'etica'], timeSuggested: 720
  },
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'Scrivi una critica letteraria di un romanzo o di un\'opera teatrale che hai letto, analizzandone i temi, le tecniche narrative e il significato culturale.',
    correctAnswer: '', points: 3, orderIndex: 28,
    rubric: { minWords: 250, maxWords: 400, criteria: ['analisi letteraria', 'argomentazione sofisticata', 'valutazione critica', 'vocabolario preciso', 'varietà stilistica'] },
    tags: ['critica letteraria', 'cultura'], timeSuggested: 720
  },
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'Esamina il paradosso della tolleranza: una società veramente tollerante può tollerare l\'intolleranza? Discuti con riferimento alla filosofia politica e a esempi contemporanei.',
    correctAnswer: '', points: 3, orderIndex: 29,
    rubric: { minWords: 250, maxWords: 400, criteria: ['ragionamento filosofico', 'conclusione sfumata', 'registro accademico', 'gestione dei controargomenti', 'coerenza logica'] },
    tags: ['filosofia', 'politica'], timeSuggested: 720
  },
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'ESSAY', skill: 'WRITING',
    questionText: 'La nozione di meritocrazia è un ideale utile o un mito pericoloso? Analizza le dimensioni sociologiche e filosofiche di questa domanda.',
    correctAnswer: '', points: 3, orderIndex: 30,
    rubric: { minWords: 250, maxWords: 400, criteria: ['argomentazione sofisticata', 'analisi interdisciplinare', 'ragionamento astratto', 'espressione elegante', 'posizione sfumata'] },
    tags: ['sociologia', 'filosofia', 'economia'], timeSuggested: 720
  }
]
