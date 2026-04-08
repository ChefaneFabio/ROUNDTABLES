import { MultiSkillQuestionData } from '../types'

// Italian Reading Questions — ~7 per CEFR level (~82 total)
// Types: READING, MULTIPLE_CHOICE, FILL_BLANK with passages

export const italianReadingQuestions: MultiSkillQuestionData[] = [
  // ============================================================
  // A1 — Beginner (7 questions)
  // ============================================================
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'READING', skill: 'READING',
    passageTitle: 'La mia famiglia',
    passage: 'Mi chiamo Lucia. Ho dieci anni. Ho un fratello. Si chiama Marco. Lui ha otto anni. Abbiamo un gatto. Il gatto è nero. Viviamo in una casa piccola.',
    questionText: 'Quanti anni ha Lucia?',
    options: [{ label: '8', value: '8' }, { label: '10', value: '10' }, { label: '12', value: '12' }, { label: '6', value: '6' }],
    correctAnswer: '10', points: 1, orderIndex: 1, tags: ['famiglia', 'numeri']
  },
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'READING', skill: 'READING',
    passageTitle: 'La mia famiglia',
    passage: 'Mi chiamo Lucia. Ho dieci anni. Ho un fratello. Si chiama Marco. Lui ha otto anni. Abbiamo un gatto. Il gatto è nero. Viviamo in una casa piccola.',
    questionText: 'Di che colore è il gatto?',
    options: [{ label: 'Bianco', value: 'bianco' }, { label: 'Grigio', value: 'grigio' }, { label: 'Nero', value: 'nero' }, { label: 'Marrone', value: 'marrone' }],
    correctAnswer: 'nero', points: 1, orderIndex: 2, tags: ['famiglia', 'colori']
  },
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'READING',
    passageTitle: 'Al negozio',
    passage: 'Vado al negozio. Compro il pane e il latte. Il pane costa due euro. Il latte costa un euro. Pago tre euro.',
    questionText: 'Quanto costa il pane?',
    options: [{ label: 'Un euro', value: 'un euro' }, { label: 'Due euro', value: 'due euro' }, { label: 'Tre euro', value: 'tre euro' }, { label: 'Quattro euro', value: 'quattro euro' }],
    correctAnswer: 'due euro', points: 1, orderIndex: 3, tags: ['spesa', 'numeri']
  },
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'Vado al negozio. Compro il pane e il latte. Il pane costa due euro. Il latte costa un euro. Pago tre euro.',
    questionText: 'Compro il pane e il ___.',
    correctAnswer: 'latte', points: 1, orderIndex: 4, tags: ['spesa']
  },
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'READING', skill: 'READING',
    passageTitle: 'La mia giornata',
    passage: 'Mi sveglio alle sette. Faccio colazione. Poi vado a scuola. La scuola inizia alle otto e mezza. Torno a casa alle tre. Gioco con i miei amici.',
    questionText: 'A che ora inizia la scuola?',
    options: [{ label: '7:00', value: '7:00' }, { label: '8:30', value: '8:30' }, { label: '3:00', value: '3:00' }, { label: '9:00', value: '9:00' }],
    correctAnswer: '8:30', points: 1, orderIndex: 5, tags: ['routine', 'orario']
  },
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'READING', skill: 'READING',
    passageTitle: 'La mia giornata',
    passage: 'Mi sveglio alle sette. Faccio colazione. Poi vado a scuola. La scuola inizia alle otto e mezza. Torno a casa alle tre. Gioco con i miei amici.',
    questionText: 'Cosa fa dopo la scuola?',
    options: [{ label: 'Mangia la cena', value: 'mangia la cena' }, { label: 'Gioca con gli amici', value: 'gioca con gli amici' }, { label: 'Va al negozio', value: 'va al negozio' }, { label: 'Guarda la TV', value: 'guarda la TV' }],
    correctAnswer: 'gioca con gli amici', points: 1, orderIndex: 6, tags: ['routine']
  },
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'Mi sveglio alle sette. Faccio colazione. Poi vado a scuola.',
    questionText: 'Mi sveglio alle ___. (Scrivi la parola mancante)',
    correctAnswer: 'sette', points: 1, orderIndex: 7, tags: ['orario']
  },

  // ============================================================
  // A2 — Elementary (7 questions)
  // ============================================================
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Un viaggio a Roma',
    passage: 'L\'estate scorsa, Sofia ha visitato Roma per la prima volta. Ha alloggiato in un hotel vicino al Colosseo. Ha visitato il Colosseo, la Fontana di Trevi e Piazza Navona. Il tempo era caldo e soleggiato. Ha scattato molte foto e ha comprato dei souvenir per la sua famiglia.',
    questionText: 'Dove ha alloggiato Sofia a Roma?',
    options: [{ label: 'In una casa', value: 'in una casa' }, { label: 'In un hotel vicino al Colosseo', value: 'in un hotel vicino al Colosseo' }, { label: 'Da amici', value: 'da amici' }, { label: 'In un appartamento', value: 'in un appartamento' }],
    correctAnswer: 'in un hotel vicino al Colosseo', points: 1, orderIndex: 8, tags: ['viaggio', 'passato prossimo']
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Un viaggio a Roma',
    passage: 'L\'estate scorsa, Sofia ha visitato Roma per la prima volta. Ha alloggiato in un hotel vicino al Colosseo. Ha visitato il Colosseo, la Fontana di Trevi e Piazza Navona. Il tempo era caldo e soleggiato. Ha scattato molte foto e ha comprato dei souvenir per la sua famiglia.',
    questionText: 'Com\'era il tempo?',
    options: [{ label: 'Freddo e piovoso', value: 'freddo e piovoso' }, { label: 'Caldo e soleggiato', value: 'caldo e soleggiato' }, { label: 'Nuvoloso', value: 'nuvoloso' }, { label: 'Ventoso', value: 'ventoso' }],
    correctAnswer: 'caldo e soleggiato', points: 1, orderIndex: 9, tags: ['viaggio', 'tempo atmosferico']
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'READING', skill: 'READING',
    passageTitle: 'La nuova trattoria',
    passage: 'Una nuova trattoria ha aperto in Via Garibaldi il mese scorso. La trattoria si chiama "Da Nonna Rosa." Serve pasta, pizza e insalate. I prezzi non sono cari. Molte persone ci vanno nei fine settimana. La trattoria è aperta dalle undici alle ventidue tutti i giorni tranne il lunedì.',
    questionText: 'Quando è chiusa la trattoria?',
    options: [{ label: 'Domenica', value: 'domenica' }, { label: 'Sabato', value: 'sabato' }, { label: 'Lunedì', value: 'lunedì' }, { label: 'Martedì', value: 'martedì' }],
    correctAnswer: 'lunedì', points: 1, orderIndex: 10, tags: ['cibo', 'luoghi']
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'Una nuova trattoria ha aperto in Via Garibaldi il mese scorso. La trattoria si chiama "Da Nonna Rosa."',
    questionText: 'La trattoria si chiama "Da Nonna ___."',
    correctAnswer: 'Rosa', points: 1, orderIndex: 11, tags: ['cibo', 'luoghi']
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Email a un amico',
    passage: 'Ciao Paolo, spero che stai bene. Mi sono trasferito in un nuovo appartamento la settimana scorsa. È più grande del vecchio. Ha due camere da letto, una cucina e un bel balcone. Il quartiere è tranquillo e c\'è un parco vicino. Vuoi venire a trovarmi il prossimo fine settimana? A presto, Giulia',
    questionText: 'Perché Giulia ha scritto a Paolo?',
    options: [{ label: 'Per invitarlo a visitarla', value: 'per invitarlo a visitarla' }, { label: 'Per chiedere soldi', value: 'per chiedere soldi' }, { label: 'Per salutarlo', value: 'per salutarlo' }, { label: 'Per lamentarsi', value: 'per lamentarsi' }],
    correctAnswer: 'per invitarlo a visitarla', points: 1, orderIndex: 12, tags: ['comunicazione', 'casa']
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Email a un amico',
    passage: 'Ciao Paolo, spero che stai bene. Mi sono trasferito in un nuovo appartamento la settimana scorsa. È più grande del vecchio. Ha due camere da letto, una cucina e un bel balcone. Il quartiere è tranquillo e c\'è un parco vicino. Vuoi venire a trovarmi il prossimo fine settimana? A presto, Giulia',
    questionText: 'Quante camere da letto ha il nuovo appartamento?',
    options: [{ label: 'Una', value: 'una' }, { label: 'Due', value: 'due' }, { label: 'Tre', value: 'tre' }, { label: 'Quattro', value: 'quattro' }],
    correctAnswer: 'due', points: 1, orderIndex: 13, tags: ['casa']
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'Ciao Paolo, mi sono trasferito in un nuovo appartamento la settimana scorsa. È più grande del vecchio.',
    questionText: 'Il nuovo appartamento è più ___ del vecchio.',
    correctAnswer: 'grande', points: 1, orderIndex: 14, tags: ['comparativi']
  },

  // ============================================================
  // B1 — Intermediate (7 questions)
  // ============================================================
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Il lavoro da casa',
    passage: 'Il numero di persone che lavorano da casa è aumentato notevolmente dal 2020. Molte aziende hanno scoperto che i dipendenti possono essere altrettanto produttivi a casa quanto in ufficio. Tuttavia, alcuni lavoratori riferiscono di sentirsi isolati e di sentire la mancanza dell\'interazione sociale del posto di lavoro. Le aziende stanno cercando un equilibrio, e molte stanno adottando un modello ibrido in cui i dipendenti lavorano da casa due o tre giorni alla settimana.',
    questionText: 'Cos\'è il "modello ibrido" secondo il testo?',
    options: [
      { label: 'Lavorare solo da casa', value: 'lavorare solo da casa' },
      { label: 'Lavorare alcuni giorni a casa e altri in ufficio', value: 'lavorare alcuni giorni a casa e altri in ufficio' },
      { label: 'Lavorare solo in ufficio', value: 'lavorare solo in ufficio' },
      { label: 'Lavorare in uffici diversi', value: 'lavorare in uffici diversi' }
    ],
    correctAnswer: 'lavorare alcuni giorni a casa e altri in ufficio', points: 2, orderIndex: 15, tags: ['lavoro', 'vita moderna']
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Il lavoro da casa',
    passage: 'Il numero di persone che lavorano da casa è aumentato notevolmente dal 2020. Molte aziende hanno scoperto che i dipendenti possono essere altrettanto produttivi a casa quanto in ufficio. Tuttavia, alcuni lavoratori riferiscono di sentirsi isolati e di sentire la mancanza dell\'interazione sociale del posto di lavoro.',
    questionText: 'Quale problema sperimentano alcuni lavoratori da casa?',
    options: [
      { label: 'Guadagnano meno', value: 'guadagnano meno' },
      { label: 'Si sentono isolati', value: 'si sentono isolati' },
      { label: 'Lavorano più ore', value: 'lavorano più ore' },
      { label: 'Hanno problemi tecnici', value: 'hanno problemi tecnici' }
    ],
    correctAnswer: 'si sentono isolati', points: 2, orderIndex: 16, tags: ['lavoro']
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'READING', skill: 'READING',
    passageTitle: 'I benefici dell\'esercizio fisico',
    passage: 'L\'esercizio fisico regolare ha dimostrato di avere numerosi benefici per la salute. Riduce il rischio di malattie cardiache, aiuta a controllare il peso e migliora la salute mentale. Gli studi dimostrano che anche trenta minuti di esercizio moderato, come camminare, cinque volte alla settimana possono fare una differenza significativa. Nonostante ciò, molti adulti non fanno abbastanza esercizio. Le ragioni comuni includono la mancanza di tempo, motivazione o accesso alle strutture.',
    questionText: 'Quanto esercizio settimanale raccomanda il testo?',
    options: [
      { label: '30 minuti una volta alla settimana', value: '30 minuti una volta alla settimana' },
      { label: '30 minuti cinque volte alla settimana', value: '30 minuti cinque volte alla settimana' },
      { label: 'Un\'ora ogni giorno', value: 'un\'ora ogni giorno' },
      { label: 'Due ore tre volte alla settimana', value: 'due ore tre volte alla settimana' }
    ],
    correctAnswer: '30 minuti cinque volte alla settimana', points: 2, orderIndex: 17, tags: ['salute', 'esercizio']
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'L\'esercizio fisico regolare ha dimostrato di avere numerosi benefici per la salute. Riduce il rischio di malattie cardiache, aiuta a controllare il peso e migliora la salute mentale.',
    questionText: 'L\'esercizio migliora la salute ___. (Quale tipo di salute oltre a quella fisica?)',
    correctAnswer: 'mentale', points: 2, orderIndex: 18, tags: ['salute']
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'READING', skill: 'READING',
    passageTitle: 'L\'inquinamento da plastica',
    passage: 'L\'inquinamento da plastica è diventato uno dei problemi ambientali più urgenti. Ogni anno, milioni di tonnellate di rifiuti di plastica finiscono negli oceani, danneggiando la vita marina. Molti Paesi hanno iniziato a vietare la plastica monouso come sacchetti e cannucce. I tassi di riciclaggio sono migliorati, ma gli esperti dicono che dobbiamo ridurre il consumo complessivo di plastica, non solo riciclare di più.',
    questionText: 'Secondo gli esperti, cosa è più importante del riciclaggio?',
    options: [
      { label: 'Produrre più plastica', value: 'produrre più plastica' },
      { label: 'Ridurre il consumo di plastica', value: 'ridurre il consumo di plastica' },
      { label: 'Usare materiali diversi', value: 'usare materiali diversi' },
      { label: 'Costruire più fabbriche', value: 'costruire più fabbriche' }
    ],
    correctAnswer: 'ridurre il consumo di plastica', points: 2, orderIndex: 19, tags: ['ambiente']
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'READING', skill: 'READING',
    passageTitle: 'L\'inquinamento da plastica',
    passage: 'L\'inquinamento da plastica è diventato uno dei problemi ambientali più urgenti. Ogni anno, milioni di tonnellate di rifiuti di plastica finiscono negli oceani, danneggiando la vita marina. Molti Paesi hanno iniziato a vietare la plastica monouso come sacchetti e cannucce.',
    questionText: 'Quali esempi di plastica monouso sono menzionati?',
    options: [
      { label: 'Bottiglie e bicchieri', value: 'bottiglie e bicchieri' },
      { label: 'Sacchetti e cannucce', value: 'sacchetti e cannucce' },
      { label: 'Contenitori e involucri', value: 'contenitori e involucri' },
      { label: 'Piatti e forchette', value: 'piatti e forchette' }
    ],
    correctAnswer: 'sacchetti e cannucce', points: 2, orderIndex: 20, tags: ['ambiente']
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'L\'inquinamento da plastica è diventato uno dei problemi ambientali più urgenti. Ogni anno, milioni di tonnellate di rifiuti di plastica finiscono negli oceani.',
    questionText: 'Milioni di tonnellate di plastica finiscono negli ___.',
    correctAnswer: 'oceani', points: 2, orderIndex: 21, tags: ['ambiente']
  },

  // ============================================================
  // B2 — Upper Intermediate (7 questions)
  // ============================================================
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'READING', skill: 'READING',
    passageTitle: 'La gig economy',
    passage: 'La gig economy ha trasformato il modo in cui milioni di persone lavorano. Piattaforme come Uber, Deliveroo e Fiverr mettono in contatto i lavoratori freelance con i clienti che hanno bisogno di servizi specifici. I sostenitori sostengono che offre flessibilità e indipendenza, permettendo alle persone di lavorare secondo le proprie condizioni. I critici, tuttavia, fanno notare che i lavoratori della gig economy spesso non hanno benefici come l\'assicurazione sanitaria, le ferie pagate e i contributi pensionistici. Il dibattito sulla classificazione dei gig worker come dipendenti o lavoratori autonomi continua nei tribunali di tutto il mondo.',
    questionText: 'Qual è la principale controversia riguardante i gig worker?',
    options: [
      { label: 'Se debbano pagare più tasse', value: 'se debbano pagare più tasse' },
      { label: 'Se debbano essere classificati come dipendenti o lavoratori autonomi', value: 'se debbano essere classificati come dipendenti o lavoratori autonomi' },
      { label: 'Se siano abbastanza qualificati', value: 'se siano abbastanza qualificati' },
      { label: 'Se lavorino troppe ore', value: 'se lavorino troppe ore' }
    ],
    correctAnswer: 'se debbano essere classificati come dipendenti o lavoratori autonomi', points: 2, orderIndex: 22, tags: ['lavoro', 'economia']
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'READING', skill: 'READING',
    passageTitle: 'La gig economy',
    passage: 'I sostenitori sostengono che la gig economy offre flessibilità e indipendenza, permettendo alle persone di lavorare secondo le proprie condizioni. I critici, tuttavia, fanno notare che i lavoratori della gig economy spesso non hanno benefici come l\'assicurazione sanitaria, le ferie pagate e i contributi pensionistici.',
    questionText: 'Quale beneficio NON è menzionato come mancante per i gig worker?',
    options: [
      { label: 'Assicurazione sanitaria', value: 'assicurazione sanitaria' },
      { label: 'Ferie pagate', value: 'ferie pagate' },
      { label: 'Opportunità di formazione', value: 'opportunità di formazione' },
      { label: 'Contributi pensionistici', value: 'contributi pensionistici' }
    ],
    correctAnswer: 'opportunità di formazione', points: 2, orderIndex: 23, tags: ['lavoro', 'economia']
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Sonno e apprendimento',
    passage: 'Recenti ricerche neuroscientifiche hanno rivelato una forte connessione tra il sonno e il consolidamento della memoria. Durante il sonno profondo, il cervello riproduce e rafforza i percorsi neurali formati durante le ore di veglia, trasferendo efficacemente le informazioni dalla memoria a breve termine a quella a lungo termine. Gli studenti che dormono a sufficienza dopo aver studiato ottengono risultati significativamente migliori nei test rispetto a quelli che restano svegli fino a tardi per studiare. Inoltre, la privazione del sonno compromette le funzioni cognitive come l\'attenzione, la risoluzione dei problemi e il pensiero creativo.',
    questionText: 'Secondo il brano, cosa succede durante il sonno profondo?',
    options: [
      { label: 'Il cervello smette di elaborare informazioni', value: 'il cervello smette di elaborare' },
      { label: 'Il cervello riproduce e rafforza i percorsi neurali', value: 'il cervello riproduce e rafforza i percorsi neurali' },
      { label: 'I nuovi ricordi vengono cancellati', value: 'i nuovi ricordi vengono cancellati' },
      { label: 'Il cervello crea nuovi percorsi neurali', value: 'il cervello crea nuovi percorsi neurali' }
    ],
    correctAnswer: 'il cervello riproduce e rafforza i percorsi neurali', points: 2, orderIndex: 24, tags: ['scienza', 'educazione']
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Sonno e apprendimento',
    passage: 'Gli studenti che dormono a sufficienza dopo aver studiato ottengono risultati significativamente migliori nei test rispetto a quelli che restano svegli fino a tardi per studiare. Inoltre, la privazione del sonno compromette le funzioni cognitive come l\'attenzione, la risoluzione dei problemi e il pensiero creativo.',
    questionText: 'Quali funzioni cognitive sono compromesse dalla mancanza di sonno?',
    options: [
      { label: 'Memoria, linguaggio e udito', value: 'memoria, linguaggio e udito' },
      { label: 'Attenzione, risoluzione dei problemi e pensiero creativo', value: 'attenzione, risoluzione dei problemi e pensiero creativo' },
      { label: 'Lettura, scrittura e conversazione', value: 'lettura, scrittura e conversazione' },
      { label: 'Vista, udito ed equilibrio', value: 'vista, udito ed equilibrio' }
    ],
    correctAnswer: 'attenzione, risoluzione dei problemi e pensiero creativo', points: 2, orderIndex: 25, tags: ['scienza']
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'Durante il sonno profondo, il cervello riproduce e rafforza i percorsi neurali formati durante le ore di veglia, trasferendo efficacemente le informazioni dalla memoria a breve termine a quella a lungo termine.',
    questionText: 'Il sonno aiuta a trasferire le informazioni dalla memoria a breve termine a quella a ___ termine.',
    correctAnswer: 'lungo', points: 2, orderIndex: 26, tags: ['scienza']
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'READING', skill: 'READING',
    passageTitle: 'L\'agricoltura urbana',
    passage: 'L\'agricoltura urbana sta guadagnando popolarità nelle città di tutto il mondo come risposta alle preoccupazioni per la sicurezza alimentare e la consapevolezza ambientale. Giardini sui tetti, fattorie verticali e orti comunitari stanno trasformando spazi urbani inutilizzati in fonti alimentari produttive. I sostenitori sostengono che l\'agricoltura urbana riduce i costi e le emissioni di trasporto, fornisce prodotti più freschi e rafforza i legami comunitari. Tuttavia, restano delle sfide, tra cui lo spazio limitato, la contaminazione del suolo nelle ex aree industriali e l\'alto costo di allestimento di strutture di coltivazione al chiuso.',
    questionText: 'Quale sfida dell\'agricoltura urbana è menzionata nel testo?',
    options: [
      { label: 'Troppa acqua', value: 'troppa acqua' },
      { label: 'Contaminazione del suolo', value: 'contaminazione del suolo' },
      { label: 'Troppi agricoltori', value: 'troppi agricoltori' },
      { label: 'Mancanza di interesse', value: 'mancanza di interesse' }
    ],
    correctAnswer: 'contaminazione del suolo', points: 2, orderIndex: 27, tags: ['ambiente', 'urbano']
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'Giardini sui tetti, fattorie verticali e orti comunitari stanno trasformando spazi urbani inutilizzati in fonti alimentari produttive.',
    questionText: 'Le fattorie ___ sono un tipo di agricoltura urbana che sfrutta lo spazio in altezza.',
    correctAnswer: 'verticali', points: 2, orderIndex: 28, tags: ['ambiente']
  },

  // ============================================================
  // C1 — Advanced (7 questions)
  // ============================================================
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'READING', skill: 'READING',
    passageTitle: 'L\'etica dell\'intelligenza artificiale',
    passage: 'Il rapido progresso dell\'intelligenza artificiale ha sollevato profonde questioni etiche con cui la società deve confrontarsi. Il pregiudizio algoritmico, in cui i sistemi di IA perpetuano o amplificano i pregiudizi sociali esistenti, è stato documentato in ambiti che vanno dalla giustizia penale alle pratiche di assunzione. L\'opacità dei modelli di deep learning — spesso definita il problema della "scatola nera" — rende difficile capire perché un sistema di IA prenda determinate decisioni, sollevando questioni di responsabilità. Inoltre, il potenziale spostamento dei lavoratori attraverso l\'automazione pone sfide socioeconomiche significative che richiedono risposte politiche proattive.',
    questionText: 'A cosa si riferisce il problema della "scatola nera" nel contesto dell\'IA?',
    options: [
      { label: 'I sistemi di IA sono costosi', value: 'i sistemi di IA sono costosi' },
      { label: 'I processi decisionali dell\'IA non sono trasparenti', value: 'i processi decisionali dell\'IA non sono trasparenti' },
      { label: 'I sistemi di IA si guastano frequentemente', value: 'i sistemi di IA si guastano frequentemente' },
      { label: 'L\'hardware dell\'IA è difficile da produrre', value: 'l\'hardware dell\'IA è difficile da produrre' }
    ],
    correctAnswer: 'i processi decisionali dell\'IA non sono trasparenti', points: 3, orderIndex: 29, tags: ['tecnologia', 'etica']
  },
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'READING', skill: 'READING',
    passageTitle: 'L\'etica dell\'intelligenza artificiale',
    passage: 'Il pregiudizio algoritmico, in cui i sistemi di IA perpetuano o amplificano i pregiudizi sociali esistenti, è stato documentato in ambiti che vanno dalla giustizia penale alle pratiche di assunzione. L\'opacità dei modelli di deep learning rende difficile capire perché un sistema di IA prenda determinate decisioni, sollevando questioni di responsabilità.',
    questionText: 'La parola "opacità" nel brano è più vicina nel significato a:',
    options: [
      { label: 'Trasparenza', value: 'trasparenza' },
      { label: 'Efficienza', value: 'efficienza' },
      { label: 'Mancanza di trasparenza', value: 'mancanza di trasparenza' },
      { label: 'Complessità', value: 'complessità' }
    ],
    correctAnswer: 'mancanza di trasparenza', points: 3, orderIndex: 30, tags: ['vocabolario', 'tecnologia']
  },
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Lingua e pensiero',
    passage: 'L\'ipotesi di Sapir-Whorf, che postula che la struttura di una lingua influenzi la visione del mondo e la cognizione dei suoi parlanti, è stata oggetto di un considerevole dibattito in linguistica. La versione forte — il determinismo linguistico — suggerisce che la lingua determina il pensiero, mentre la versione più debole — la relatività linguistica — propone che la lingua influenzi semplicemente i modelli di pensiero. La ricerca contemporanea ha in gran parte sostenuto la forma più debole, dimostrando che i parlanti di lingue diverse possono percepire il tempo, lo spazio e i colori in modo diverso, anche se non al punto da non poter concettualizzare idee assenti nella loro lingua.',
    questionText: 'Qual è la differenza tra determinismo linguistico e relatività linguistica?',
    options: [
      { label: 'Il determinismo dice che la lingua determina il pensiero; la relatività dice che lo influenza', value: 'il determinismo determina, la relatività influenza' },
      { label: 'Sono lo stesso concetto con nomi diversi', value: 'stesso concetto' },
      { label: 'Il determinismo riguarda la grammatica; la relatività riguarda il vocabolario', value: 'grammatica vs vocabolario' },
      { label: 'Il determinismo è più recente della relatività', value: 'il determinismo è più recente' }
    ],
    correctAnswer: 'il determinismo determina, la relatività influenza', points: 3, orderIndex: 31, tags: ['linguistica', 'filosofia']
  },
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Lingua e pensiero',
    passage: 'La ricerca contemporanea ha in gran parte sostenuto la forma più debole, dimostrando che i parlanti di lingue diverse possono percepire il tempo, lo spazio e i colori in modo diverso, anche se non al punto da non poter concettualizzare idee assenti nella loro lingua.',
    questionText: 'Cosa ha concluso la ricerca contemporanea sull\'ipotesi di Sapir-Whorf?',
    options: [
      { label: 'La versione forte è corretta', value: 'versione forte corretta' },
      { label: 'Entrambe le versioni sono errate', value: 'entrambe errate' },
      { label: 'La versione più debole è in gran parte sostenuta', value: 'versione debole sostenuta' },
      { label: 'L\'ipotesi è stata interamente smentita', value: 'interamente smentita' }
    ],
    correctAnswer: 'versione debole sostenuta', points: 3, orderIndex: 32, tags: ['linguistica']
  },
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'L\'ipotesi di Sapir-Whorf postula che la struttura di una lingua influenzi la visione del mondo e la cognizione dei suoi parlanti.',
    questionText: 'L\'ipotesi di Sapir-Whorf riguarda la relazione tra lingua e ___.',
    correctAnswer: 'cognizione', points: 3, orderIndex: 33, tags: ['linguistica']
  },
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'READING', skill: 'READING',
    passageTitle: 'L\'economia comportamentale',
    passage: 'La teoria economica tradizionale presuppone che gli individui prendano decisioni razionali per massimizzare la propria utilità. L\'economia comportamentale, sviluppata da ricercatori come Daniel Kahneman e Amos Tversky, mette in discussione questa presupposizione dimostrando pregiudizi cognitivi sistematici che portano a decisioni irrazionali. Il concetto di "avversione alla perdita" — la tendenza delle persone a preferire evitare le perdite piuttosto che ottenere guadagni equivalenti — ha profonde implicazioni per la progettazione delle politiche, il marketing e la pianificazione finanziaria.',
    questionText: 'Cosa significa "avversione alla perdita"?',
    options: [
      { label: 'Le persone preferiscono correre rischi', value: 'preferiscono rischi' },
      { label: 'Le persone sentono le perdite più fortemente dei guadagni equivalenti', value: 'perdite sentite più dei guadagni' },
      { label: 'Le persone evitano qualsiasi decisione finanziaria', value: 'evitano decisioni finanziarie' },
      { label: 'Le persone scelgono sempre l\'opzione più economica', value: 'scelgono l\'opzione più economica' }
    ],
    correctAnswer: 'perdite sentite più dei guadagni', points: 3, orderIndex: 34, tags: ['economia', 'psicologia']
  },
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'L\'economia comportamentale mette in discussione la presupposizione che gli individui prendano decisioni razionali per massimizzare la propria utilità.',
    questionText: 'L\'economia comportamentale dimostra pregiudizi cognitivi ___ che portano a decisioni irrazionali.',
    correctAnswer: 'sistematici', points: 3, orderIndex: 35, tags: ['economia']
  },

  // ============================================================
  // C2 — Proficiency (7 questions)
  // ============================================================
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Post-verità e crisi epistemica',
    passage: 'La proliferazione della disinformazione nell\'era digitale ha precipitato quella che i filosofi definiscono una "crisi epistemica" — un cedimento fondamentale nella capacità della società di stabilire verità condivise. Il fenomeno è esacerbato dalle camere d\'eco algoritmiche che rafforzano le convinzioni esistenti, dalla mercificazione dell\'attenzione che incentiva il sensazionalismo a scapito dell\'accuratezza, e dall\'erosione della fiducia nelle autorità epistemiche tradizionali come le istituzioni scientifiche e il giornalismo di qualità. Alcuni studiosi sostengono che la nozione stessa di verità oggettiva sia stata soppiantata da un paradigma "post-verità" in cui la risonanza emotiva e l\'appartenenza tribale prevalgono sulle prove empiriche nel plasmare il discorso pubblico.',
    questionText: 'Secondo il brano, cosa contribuisce alla "crisi epistemica"?',
    options: [
      { label: 'Sistemi educativi migliorati', value: 'educazione migliorata' },
      { label: 'Camere d\'eco algoritmiche, mercificazione dell\'attenzione ed erosione della fiducia', value: 'camere d\'eco, mercificazione dell\'attenzione, erosione della fiducia' },
      { label: 'Aumento dei finanziamenti per la ricerca scientifica', value: 'aumento finanziamenti ricerca' },
      { label: 'Migliore accesso alle informazioni', value: 'migliore accesso alle informazioni' }
    ],
    correctAnswer: 'camere d\'eco, mercificazione dell\'attenzione, erosione della fiducia', points: 3, orderIndex: 36, tags: ['filosofia', 'media']
  },
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Post-verità e crisi epistemica',
    passage: 'Alcuni studiosi sostengono che la nozione stessa di verità oggettiva sia stata soppiantata da un paradigma "post-verità" in cui la risonanza emotiva e l\'appartenenza tribale prevalgono sulle prove empiriche nel plasmare il discorso pubblico.',
    questionText: 'Cosa significa "soppiantata" in questo contesto?',
    options: [
      { label: 'Sostenuta', value: 'sostenuta' },
      { label: 'Sostituita', value: 'sostituita' },
      { label: 'Messa in discussione', value: 'messa in discussione' },
      { label: 'Migliorata', value: 'migliorata' }
    ],
    correctAnswer: 'sostituita', points: 3, orderIndex: 37, tags: ['vocabolario']
  },
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Coscienza quantistica',
    passage: 'La teoria della Riduzione Oggettiva Orchestrata (Orch-OR), proposta dal fisico Roger Penrose e dall\'anestesiologo Stuart Hameroff, postula che la coscienza derivi da computazioni quantistiche all\'interno dei microtubuli nei neuroni. Questa controversa ipotesi suggerisce che il cervello non sia semplicemente un computer classico, ma operi a un livello fondamentalmente quantistico. I critici sostengono che l\'ambiente caldo e umido del cervello causerebbe una decoerenza quantistica troppo rapida perché tali processi siano biologicamente rilevanti. Tuttavia, recenti esperimenti che rilevano effetti quantistici in sistemi biologici — come la fotosintesi e la navigazione degli uccelli — hanno dato una certa credibilità all\'idea più ampia che la meccanica quantistica possa svolgere un ruolo nei processi biologici.',
    questionText: 'Qual è la critica principale alla teoria Orch-OR?',
    options: [
      { label: 'Manca di fondamenti matematici', value: 'manca di matematica' },
      { label: 'La decoerenza quantistica avverrebbe troppo rapidamente nel cervello', value: 'decoerenza troppo rapida' },
      { label: 'Penrose non è un neuroscienziato', value: 'non è un neuroscienziato' },
      { label: 'I microtubuli non esistono nei neuroni', value: 'i microtubuli non esistono' }
    ],
    correctAnswer: 'decoerenza troppo rapida', points: 3, orderIndex: 38, tags: ['scienza', 'filosofia']
  },
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Coscienza quantistica',
    passage: 'Recenti esperimenti che rilevano effetti quantistici in sistemi biologici — come la fotosintesi e la navigazione degli uccelli — hanno dato una certa credibilità all\'idea più ampia che la meccanica quantistica possa svolgere un ruolo nei processi biologici.',
    questionText: 'Quali processi biologici hanno mostrato evidenze di effetti quantistici?',
    options: [
      { label: 'Digestione e respirazione', value: 'digestione e respirazione' },
      { label: 'Fotosintesi e navigazione degli uccelli', value: 'fotosintesi e navigazione degli uccelli' },
      { label: 'Circolazione sanguigna e risposta immunitaria', value: 'circolazione e risposta immunitaria' },
      { label: 'Divisione cellulare e sintesi proteica', value: 'divisione cellulare e sintesi proteica' }
    ],
    correctAnswer: 'fotosintesi e navigazione degli uccelli', points: 3, orderIndex: 39, tags: ['scienza']
  },
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'La teoria Orch-OR postula che la coscienza derivi da computazioni quantistiche all\'interno dei microtubuli nei neuroni.',
    questionText: 'La teoria Orch-OR suggerisce che la coscienza derivi da computazioni quantistiche all\'interno dei ___.',
    correctAnswer: 'microtubuli', points: 3, orderIndex: 40, tags: ['scienza']
  },
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'READING', skill: 'READING',
    passageTitle: 'La relatività linguistica rivisitata',
    passage: 'Il popolo Kuuk Thaayorre della penisola di Cape York, in Australia, utilizza le direzioni cardinali anziché termini spaziali egocentrici. Invece di dire "la tazza è alla tua sinistra", direbbero "la tazza è a nord-nordest". Notevolmente, questa pratica linguistica correla con un\'eccezionale capacità di orientamento spaziale — i parlanti del Kuuk Thaayorre mantengono una bussola interna accurata in ogni momento, un\'impresa che i parlanti di lingue con sistemi spaziali egocentrici trovano straordinariamente difficile da replicare.',
    questionText: 'Cosa rende unico il sistema spaziale dei Kuuk Thaayorre?',
    options: [
      { label: 'Usano sinistra e destra in modo più preciso', value: 'sinistra e destra' },
      { label: 'Usano le direzioni cardinali invece di termini relativi come sinistra/destra', value: 'direzioni cardinali invece di egocentriche' },
      { label: 'Non hanno parole per le direzioni', value: 'nessuna parola per le direzioni' },
      { label: 'Usano solo i gesti per le direzioni', value: 'solo gesti' }
    ],
    correctAnswer: 'direzioni cardinali invece di egocentriche', points: 3, orderIndex: 41, tags: ['linguistica', 'cultura']
  },
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'Il popolo Kuuk Thaayorre utilizza le direzioni cardinali anziché termini spaziali egocentrici.',
    questionText: 'I Kuuk Thaayorre usano le direzioni ___ anziché termini spaziali egocentrici.',
    correctAnswer: 'cardinali', points: 3, orderIndex: 42, tags: ['linguistica']
  },

  // ============================================================
  // NEW QUESTIONS (43–82) — ~7 per level
  // ============================================================

  // A1 — Menu, cartelli, descrizioni semplici (43–49)
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Menu del Bar',
    passage: 'BAR CENTRALE — MENU\nCaffè espresso: 1,20 €\nCappuccino: 1,80 €\nCornetto: 1,50 €\nSucco d\'arancia: 2,00 €\nPanino al prosciutto: 3,50 €\nAcqua minerale: 1,00 €',
    questionText: 'Quanto costa un cappuccino?',
    options: [{ label: '1,20 €', value: '1,20 €' }, { label: '1,50 €', value: '1,50 €' }, { label: '1,80 €', value: '1,80 €' }, { label: '2,00 €', value: '2,00 €' }],
    correctAnswer: '1,80 €', points: 1, orderIndex: 43, tags: ['menu', 'prezzi']
  },
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Menu del Bar',
    passage: 'BAR CENTRALE — MENU\nCaffè espresso: 1,20 €\nCappuccino: 1,80 €\nCornetto: 1,50 €\nSucco d\'arancia: 2,00 €\nPanino al prosciutto: 3,50 €\nAcqua minerale: 1,00 €',
    questionText: 'Quale è la cosa più costosa nel menu?',
    options: [{ label: 'Cappuccino', value: 'cappuccino' }, { label: 'Succo d\'arancia', value: 'succo d\'arancia' }, { label: 'Panino al prosciutto', value: 'panino al prosciutto' }, { label: 'Cornetto', value: 'cornetto' }],
    correctAnswer: 'panino al prosciutto', points: 1, orderIndex: 44, tags: ['menu', 'comprensione']
  },
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Cartello in un negozio',
    passage: 'ORARIO DI APERTURA\nLunedì - Venerdì: 9:00 - 19:30\nSabato: 9:00 - 13:00\nDomenica: CHIUSO\nPer informazioni: 06-12345678',
    questionText: 'Quando è chiuso il negozio?',
    options: [{ label: 'Lunedì', value: 'lunedì' }, { label: 'Sabato', value: 'sabato' }, { label: 'Domenica', value: 'domenica' }, { label: 'Venerdì', value: 'venerdì' }],
    correctAnswer: 'domenica', points: 1, orderIndex: 45, tags: ['cartelli', 'orari']
  },
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Cartello in un negozio',
    passage: 'ORARIO DI APERTURA\nLunedì - Venerdì: 9:00 - 19:30\nSabato: 9:00 - 13:00\nDomenica: CHIUSO\nPer informazioni: 06-12345678',
    questionText: 'A che ora chiude il negozio il sabato?',
    options: [{ label: '9:00', value: '9:00' }, { label: '13:00', value: '13:00' }, { label: '19:30', value: '19:30' }, { label: '18:00', value: '18:00' }],
    correctAnswer: '13:00', points: 1, orderIndex: 46, tags: ['cartelli', 'orari']
  },
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Il mio amico',
    passage: 'Il mio amico si chiama Luca. Ha dodici anni. È alto e ha i capelli neri. Gli piace giocare a basket. Ha un cane che si chiama Rex. Luca è molto simpatico.',
    questionText: 'Come si chiama il cane di Luca?',
    options: [{ label: 'Max', value: 'Max' }, { label: 'Rex', value: 'Rex' }, { label: 'Fido', value: 'Fido' }, { label: 'Bobby', value: 'Bobby' }],
    correctAnswer: 'Rex', points: 1, orderIndex: 47, tags: ['descrizione', 'animali']
  },
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'Il mio amico si chiama Luca. Ha dodici anni. È alto e ha i capelli neri. Gli piace giocare a basket.',
    questionText: 'A Luca piace giocare a ___.',
    correctAnswer: 'basket', points: 1, orderIndex: 48, tags: ['sport']
  },
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Il mio amico',
    passage: 'Il mio amico si chiama Luca. Ha dodici anni. È alto e ha i capelli neri. Gli piace giocare a basket. Ha un cane che si chiama Rex. Luca è molto simpatico.',
    questionText: 'Quanti anni ha Luca?',
    options: [{ label: '10', value: '10' }, { label: '11', value: '11' }, { label: '12', value: '12' }, { label: '13', value: '13' }],
    correctAnswer: '12', points: 1, orderIndex: 49, tags: ['descrizione', 'numeri']
  },

  // A2 — Email, annunci, descrizioni più lunghe (50–55)
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Annuncio di lavoro',
    passage: 'CERCASI CAMERIERE/A\nRistorante "Il Giardino" cerca cameriere/a part-time. Orario: venerdì, sabato e domenica dalle 18:00 alle 23:00. Richiesta esperienza minima di 1 anno. Stipendio: 800 € al mese. Inviare curriculum a: info@ilgiardino.it',
    questionText: 'Quanti giorni alla settimana bisogna lavorare?',
    options: [{ label: '2', value: '2' }, { label: '3', value: '3' }, { label: '4', value: '4' }, { label: '5', value: '5' }],
    correctAnswer: '3', points: 1, orderIndex: 50, tags: ['lavoro', 'annunci']
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Annuncio di lavoro',
    passage: 'CERCASI CAMERIERE/A\nRistorante "Il Giardino" cerca cameriere/a part-time. Orario: venerdì, sabato e domenica dalle 18:00 alle 23:00. Richiesta esperienza minima di 1 anno. Stipendio: 800 € al mese. Inviare curriculum a: info@ilgiardino.it',
    questionText: 'Quanta esperienza serve per questo lavoro?',
    options: [{ label: 'Nessuna', value: 'nessuna' }, { label: 'Almeno 1 anno', value: 'almeno 1 anno' }, { label: 'Almeno 2 anni', value: 'almeno 2 anni' }, { label: 'Almeno 5 anni', value: 'almeno 5 anni' }],
    correctAnswer: 'almeno 1 anno', points: 1, orderIndex: 51, tags: ['lavoro', 'annunci']
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Il fine settimana di Marco',
    passage: 'Sabato scorso Marco si è alzato tardi. Ha fatto colazione alle dieci. Poi è andato in centro a fare shopping con la sua ragazza. Hanno comprato dei vestiti nuovi. A pranzo hanno mangiato in un ristorante cinese. Il pomeriggio sono andati al cinema a vedere un film d\'avventura. La sera Marco è rimasto a casa e ha guardato la partita di calcio in TV.',
    questionText: 'Cosa hanno fatto Marco e la sua ragazza il pomeriggio?',
    options: [{ label: 'Hanno fatto shopping', value: 'hanno fatto shopping' }, { label: 'Sono andati al cinema', value: 'sono andati al cinema' }, { label: 'Hanno guardato la TV', value: 'hanno guardato la TV' }, { label: 'Hanno mangiato al ristorante', value: 'hanno mangiato al ristorante' }],
    correctAnswer: 'sono andati al cinema', points: 1, orderIndex: 52, tags: ['tempo libero']
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Il fine settimana di Marco',
    passage: 'Sabato scorso Marco si è alzato tardi. Ha fatto colazione alle dieci. Poi è andato in centro a fare shopping con la sua ragazza. Hanno comprato dei vestiti nuovi. A pranzo hanno mangiato in un ristorante cinese. Il pomeriggio sono andati al cinema a vedere un film d\'avventura. La sera Marco è rimasto a casa e ha guardato la partita di calcio in TV.',
    questionText: 'Dove hanno pranzato?',
    options: [{ label: 'A casa', value: 'a casa' }, { label: 'In un ristorante italiano', value: 'in un ristorante italiano' }, { label: 'In un ristorante cinese', value: 'in un ristorante cinese' }, { label: 'In pizzeria', value: 'in pizzeria' }],
    correctAnswer: 'in un ristorante cinese', points: 1, orderIndex: 53, tags: ['tempo libero', 'cibo']
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'Marco è rimasto a casa e ha guardato la partita di calcio in TV.',
    questionText: 'La sera Marco ha guardato la partita di ___ in TV.',
    correctAnswer: 'calcio', points: 1, orderIndex: 54, tags: ['sport']
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Il fine settimana di Marco',
    passage: 'Sabato scorso Marco si è alzato tardi. Ha fatto colazione alle dieci. Poi è andato in centro a fare shopping con la sua ragazza. Hanno comprato dei vestiti nuovi.',
    questionText: 'A che ora ha fatto colazione Marco?',
    options: [{ label: 'Alle otto', value: 'alle otto' }, { label: 'Alle nove', value: 'alle nove' }, { label: 'Alle dieci', value: 'alle dieci' }, { label: 'Alle undici', value: 'alle undici' }],
    correctAnswer: 'alle dieci', points: 1, orderIndex: 55, tags: ['routine', 'orario']
  },

  // B1 — Articoli, storie, opinioni (56–62)
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Il volontariato',
    passage: 'Sempre più giovani italiani scelgono di dedicare parte del loro tempo libero al volontariato. Le attività più comuni includono l\'assistenza agli anziani, la distribuzione di cibo ai senzatetto e la pulizia di parchi e spiagge. Secondo un recente sondaggio, il sessanta per cento dei volontari afferma di sentirsi più soddisfatto della propria vita grazie a questa esperienza. Molti giovani dicono anche che il volontariato li ha aiutati a sviluppare competenze utili per il mondo del lavoro.',
    questionText: 'Quale percentuale di volontari si sente più soddisfatta?',
    options: [
      { label: '40%', value: '40%' },
      { label: '50%', value: '50%' },
      { label: '60%', value: '60%' },
      { label: '70%', value: '70%' }
    ],
    correctAnswer: '60%', points: 1, orderIndex: 56, tags: ['società', 'volontariato']
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Il volontariato',
    passage: 'Le attività più comuni includono l\'assistenza agli anziani, la distribuzione di cibo ai senzatetto e la pulizia di parchi e spiagge. Molti giovani dicono anche che il volontariato li ha aiutati a sviluppare competenze utili per il mondo del lavoro.',
    questionText: 'Quale beneficio aggiuntivo del volontariato è menzionato?',
    options: [
      { label: 'Guadagnare soldi', value: 'guadagnare soldi' },
      { label: 'Sviluppare competenze utili per il lavoro', value: 'sviluppare competenze per il lavoro' },
      { label: 'Viaggiare all\'estero', value: 'viaggiare all\'estero' },
      { label: 'Ottenere un diploma', value: 'ottenere un diploma' }
    ],
    correctAnswer: 'sviluppare competenze per il lavoro', points: 1, orderIndex: 57, tags: ['società', 'lavoro']
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'READING', skill: 'READING',
    passageTitle: 'La dieta mediterranea',
    passage: 'La dieta mediterranea è considerata una delle più salutari al mondo. Si basa sul consumo abbondante di frutta, verdura, legumi, cereali integrali e olio d\'oliva. Il pesce viene consumato due o tre volte alla settimana, mentre la carne rossa è limitata. Numerosi studi scientifici hanno dimostrato che questa dieta riduce il rischio di malattie cardiovascolari e diabete di tipo 2. Nel 2010, l\'UNESCO l\'ha riconosciuta come patrimonio culturale immateriale dell\'umanità.',
    questionText: 'Quanto spesso si mangia pesce nella dieta mediterranea?',
    options: [
      { label: 'Ogni giorno', value: 'ogni giorno' },
      { label: 'Due o tre volte alla settimana', value: 'due o tre volte alla settimana' },
      { label: 'Una volta al mese', value: 'una volta al mese' },
      { label: 'Mai', value: 'mai' }
    ],
    correctAnswer: 'due o tre volte alla settimana', points: 1, orderIndex: 58, tags: ['salute', 'cibo']
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'READING', skill: 'READING',
    passageTitle: 'La dieta mediterranea',
    passage: 'Numerosi studi scientifici hanno dimostrato che questa dieta riduce il rischio di malattie cardiovascolari e diabete di tipo 2. Nel 2010, l\'UNESCO l\'ha riconosciuta come patrimonio culturale immateriale dell\'umanità.',
    questionText: 'In che anno l\'UNESCO ha riconosciuto la dieta mediterranea?',
    options: [
      { label: '2005', value: '2005' },
      { label: '2008', value: '2008' },
      { label: '2010', value: '2010' },
      { label: '2015', value: '2015' }
    ],
    correctAnswer: '2010', points: 1, orderIndex: 59, tags: ['cultura', 'storia']
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'La dieta mediterranea si basa sul consumo abbondante di frutta, verdura, legumi, cereali integrali e olio d\'oliva.',
    questionText: 'L\'olio d\' ___ è un elemento fondamentale della dieta mediterranea.',
    correctAnswer: 'oliva', points: 1, orderIndex: 60, tags: ['cibo']
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Lo sport in Italia',
    passage: 'Il calcio è di gran lunga lo sport più popolare in Italia. Ogni domenica, milioni di italiani guardano le partite di Serie A in televisione o vanno allo stadio. Tuttavia, negli ultimi anni, altri sport come il basket, il tennis e il ciclismo hanno guadagnato sempre più appassionati. Il successo di atleti italiani alle Olimpiadi ha contribuito a questo fenomeno, ispirando molti giovani a praticare sport diversi.',
    questionText: 'Cosa ha contribuito alla popolarità di altri sport in Italia?',
    options: [
      { label: 'La pubblicità in televisione', value: 'la pubblicità' },
      { label: 'Il successo di atleti italiani alle Olimpiadi', value: 'successo alle Olimpiadi' },
      { label: 'L\'apertura di nuovi stadi', value: 'nuovi stadi' },
      { label: 'Il calo di interesse per il calcio', value: 'calo interesse calcio' }
    ],
    correctAnswer: 'successo alle Olimpiadi', points: 1, orderIndex: 61, tags: ['sport', 'cultura']
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'Ogni domenica, milioni di italiani guardano le partite di Serie A in televisione o vanno allo stadio.',
    questionText: 'Il campionato di calcio italiano più importante si chiama Serie ___.',
    correctAnswer: 'A', points: 1, orderIndex: 62, tags: ['sport']
  },

  // B2 — Testi argomentativi, analisi sociale (63–69)
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'READING', skill: 'READING',
    passageTitle: 'I social media e la democrazia',
    passage: 'I social media hanno radicalmente trasformato il panorama politico contemporaneo. Da un lato, hanno democratizzato l\'accesso all\'informazione, consentendo ai cittadini di partecipare attivamente al dibattito pubblico. Dall\'altro, la diffusione di notizie false e la polarizzazione delle opinioni rappresentano minacce concrete al processo democratico. Diversi studi hanno evidenziato come le piattaforme digitali tendano a creare "bolle informative" in cui gli utenti sono esposti prevalentemente a contenuti che confermano le loro convinzioni preesistenti.',
    questionText: 'Cosa sono le "bolle informative" secondo il testo?',
    options: [
      { label: 'Gruppi di discussione aperti', value: 'gruppi aperti' },
      { label: 'Ambienti dove si vedono solo contenuti che confermano le proprie idee', value: 'ambienti con contenuti confermanti' },
      { label: 'Siti web di notizie verificate', value: 'notizie verificate' },
      { label: 'Forum di esperti', value: 'forum di esperti' }
    ],
    correctAnswer: 'ambienti con contenuti confermanti', points: 2, orderIndex: 63, tags: ['tecnologia', 'politica']
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'READING', skill: 'READING',
    passageTitle: 'I social media e la democrazia',
    passage: 'Da un lato, hanno democratizzato l\'accesso all\'informazione, consentendo ai cittadini di partecipare attivamente al dibattito pubblico. Dall\'altro, la diffusione di notizie false e la polarizzazione delle opinioni rappresentano minacce concrete al processo democratico.',
    questionText: 'Qual è il tono dell\'autore rispetto ai social media?',
    options: [
      { label: 'Completamente positivo', value: 'positivo' },
      { label: 'Completamente negativo', value: 'negativo' },
      { label: 'Equilibrato, riconosce vantaggi e svantaggi', value: 'equilibrato' },
      { label: 'Indifferente', value: 'indifferente' }
    ],
    correctAnswer: 'equilibrato', points: 2, orderIndex: 64, tags: ['comprensione', 'tono']
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Il turismo sostenibile',
    passage: 'Il turismo di massa ha generato conseguenze ambientali e sociali significative in molte destinazioni popolari. Città come Venezia, Barcellona e Dubrovnik hanno sperimentato il fenomeno dell\'"overtourism", con l\'afflusso di visitatori che supera la capacità ricettiva del territorio. Il turismo sostenibile propone un approccio alternativo: viaggiare in modo responsabile, rispettando le comunità locali e minimizzando l\'impatto ambientale. Tra le pratiche consigliate vi sono la scelta di alloggi a gestione locale, il consumo di prodotti del territorio e la visita di destinazioni meno conosciute.',
    questionText: 'Cosa si intende per "overtourism"?',
    options: [
      { label: 'Turismo di lusso', value: 'turismo di lusso' },
      { label: 'Un numero di visitatori superiore a ciò che il territorio può sopportare', value: 'visitatori superiori alla capacità' },
      { label: 'Turismo in paesi lontani', value: 'turismo lontano' },
      { label: 'Turismo organizzato da agenzie', value: 'turismo organizzato' }
    ],
    correctAnswer: 'visitatori superiori alla capacità', points: 2, orderIndex: 65, tags: ['turismo', 'ambiente']
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Il turismo sostenibile',
    passage: 'Tra le pratiche consigliate vi sono la scelta di alloggi a gestione locale, il consumo di prodotti del territorio e la visita di destinazioni meno conosciute.',
    questionText: 'Quale pratica NON è menzionata tra quelle del turismo sostenibile?',
    options: [
      { label: 'Scegliere alloggi locali', value: 'alloggi locali' },
      { label: 'Consumare prodotti del territorio', value: 'prodotti locali' },
      { label: 'Viaggiare in aereo meno possibile', value: 'meno aerei' },
      { label: 'Visitare destinazioni meno conosciute', value: 'destinazioni meno note' }
    ],
    correctAnswer: 'meno aerei', points: 2, orderIndex: 66, tags: ['turismo', 'comprensione']
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'Città come Venezia, Barcellona e Dubrovnik hanno sperimentato il fenomeno dell\'"overtourism", con l\'afflusso di visitatori che supera la capacità ricettiva del territorio.',
    questionText: 'L\'afflusso di visitatori supera la capacità ___ del territorio.',
    correctAnswer: 'ricettiva', points: 2, orderIndex: 67, tags: ['turismo', 'vocabolario']
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'READING', skill: 'READING',
    passageTitle: 'L\'invecchiamento della popolazione',
    passage: 'L\'Italia è uno dei Paesi con il tasso di natalità più basso al mondo. Questo, combinato con l\'aumento dell\'aspettativa di vita, sta creando una popolazione sempre più anziana. Le conseguenze economiche sono significative: il sistema pensionistico è sotto pressione crescente, la forza lavoro si riduce e i costi sanitari aumentano. Alcuni economisti propongono di incentivare l\'immigrazione qualificata come soluzione parziale, mentre altri suggeriscono politiche più incisive a sostegno delle famiglie.',
    questionText: 'Quale soluzione propongono alcuni economisti?',
    options: [
      { label: 'Aumentare l\'età pensionabile', value: 'età pensionabile' },
      { label: 'Incentivare l\'immigrazione qualificata', value: 'immigrazione qualificata' },
      { label: 'Ridurre i servizi sanitari', value: 'ridurre sanità' },
      { label: 'Aumentare le tasse', value: 'aumentare tasse' }
    ],
    correctAnswer: 'immigrazione qualificata', points: 2, orderIndex: 68, tags: ['società', 'economia']
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'L\'Italia è uno dei Paesi con il tasso di natalità più basso al mondo. Questo, combinato con l\'aumento dell\'aspettativa di vita, sta creando una popolazione sempre più anziana.',
    questionText: 'L\'aumento dell\'aspettativa di ___ contribuisce all\'invecchiamento della popolazione.',
    correctAnswer: 'vita', points: 2, orderIndex: 69, tags: ['società']
  },

  // C1 — Testi accademici, analisi critiche (70–76)
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Il paradosso della scelta',
    passage: 'Lo psicologo Barry Schwartz ha teorizzato che un eccesso di opzioni, anziché aumentare il benessere, genera ansia decisionale e insoddisfazione cronica. In un celebre esperimento, i consumatori esposti a ventiquattro varietà di marmellata acquistarono meno rispetto a quelli che ne avevano solo sei a disposizione. Schwartz distingue tra "massimizzatori" — individui che cercano ossessivamente la scelta ottimale — e "soddisfazionisti" — coloro che si accontentano di un\'opzione sufficientemente buona. I secondi risultano sistematicamente più felici, suggerendo che la razionalità economica e il benessere psicologico non sempre coincidono.',
    questionText: 'Qual è il "paradosso della scelta" secondo Schwartz?',
    options: [
      { label: 'Più opzioni portano a decisioni migliori', value: 'decisioni migliori' },
      { label: 'Troppe opzioni generano ansia e insoddisfazione', value: 'troppe opzioni generano ansia' },
      { label: 'Le persone scelgono sempre la stessa cosa', value: 'sempre la stessa cosa' },
      { label: 'La scelta non influenza la felicità', value: 'nessuna influenza' }
    ],
    correctAnswer: 'troppe opzioni generano ansia', points: 2, orderIndex: 70, tags: ['psicologia']
  },
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Il paradosso della scelta',
    passage: 'Schwartz distingue tra "massimizzatori" — individui che cercano ossessivamente la scelta ottimale — e "soddisfazionisti" — coloro che si accontentano di un\'opzione sufficientemente buona. I secondi risultano sistematicamente più felici.',
    questionText: 'Chi è più felice secondo la ricerca di Schwartz?',
    options: [
      { label: 'I massimizzatori', value: 'massimizzatori' },
      { label: 'I soddisfazionisti', value: 'soddisfazionisti' },
      { label: 'Entrambi allo stesso livello', value: 'entrambi' },
      { label: 'Nessuno dei due', value: 'nessuno' }
    ],
    correctAnswer: 'soddisfazionisti', points: 2, orderIndex: 71, tags: ['psicologia']
  },
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'READING', skill: 'READING',
    passageTitle: 'La gentrificazione urbana',
    passage: 'La gentrificazione designa il processo attraverso cui quartieri storicamente popolari vengono progressivamente trasformati dall\'arrivo di residenti più abbienti. Se da un lato questo fenomeno porta alla riqualificazione edilizia e alla riduzione della criminalità, dall\'altro causa lo sfollamento delle comunità originarie, incapaci di sostenere l\'aumento degli affitti. Critici come Neil Smith interpretano la gentrificazione come una forma di "colonialismo urbano", in cui il capitale riplasma lo spazio urbano secondo logiche di profitto, a scapito della diversità sociale e culturale che caratterizzava i quartieri originari.',
    questionText: 'Come definisce Neil Smith la gentrificazione?',
    options: [
      { label: 'Un progresso necessario', value: 'progresso' },
      { label: 'Una forma di colonialismo urbano', value: 'colonialismo urbano' },
      { label: 'Un fenomeno naturale', value: 'fenomeno naturale' },
      { label: 'Una politica governativa', value: 'politica governativa' }
    ],
    correctAnswer: 'colonialismo urbano', points: 2, orderIndex: 72, tags: ['urbanistica', 'sociologia']
  },
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'READING', skill: 'READING',
    passageTitle: 'La gentrificazione urbana',
    passage: 'Se da un lato questo fenomeno porta alla riqualificazione edilizia e alla riduzione della criminalità, dall\'altro causa lo sfollamento delle comunità originarie, incapaci di sostenere l\'aumento degli affitti.',
    questionText: 'Quale effetto negativo della gentrificazione è descritto?',
    options: [
      { label: 'Aumento della criminalità', value: 'criminalità' },
      { label: 'Sfollamento delle comunità originarie', value: 'sfollamento comunità' },
      { label: 'Deterioramento degli edifici', value: 'deterioramento' },
      { label: 'Isolamento dei quartieri', value: 'isolamento' }
    ],
    correctAnswer: 'sfollamento comunità', points: 2, orderIndex: 73, tags: ['urbanistica']
  },
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'La gentrificazione designa il processo attraverso cui quartieri storicamente popolari vengono progressivamente trasformati dall\'arrivo di residenti più abbienti.',
    questionText: 'L\'arrivo di residenti più ___ trasforma i quartieri popolari.',
    correctAnswer: 'abbienti', points: 2, orderIndex: 74, tags: ['vocabolario avanzato']
  },
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Il bilinguismo cognitivo',
    passage: 'Le ricerche più recenti sul bilinguismo hanno sfatato il mito secondo cui crescere con due lingue causerebbe confusione cognitiva nei bambini. Al contrario, i bilingui mostrano vantaggi significativi nelle funzioni esecutive, tra cui la capacità di inibire risposte automatiche, passare flessibilmente tra compiti diversi e mantenere informazioni nella memoria di lavoro. Alcuni studi longitudinali suggeriscono inoltre che il bilinguismo possa ritardare l\'insorgenza di malattie neurodegenerative come l\'Alzheimer di quattro-cinque anni.',
    questionText: 'Di quanto il bilinguismo può ritardare l\'Alzheimer?',
    options: [
      { label: '1-2 anni', value: '1-2 anni' },
      { label: '4-5 anni', value: '4-5 anni' },
      { label: '7-8 anni', value: '7-8 anni' },
      { label: '10 anni', value: '10 anni' }
    ],
    correctAnswer: '4-5 anni', points: 2, orderIndex: 75, tags: ['linguistica', 'scienza']
  },
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'I bilingui mostrano vantaggi significativi nelle funzioni esecutive, tra cui la capacità di inibire risposte automatiche e passare flessibilmente tra compiti diversi.',
    questionText: 'I bilingui hanno vantaggi nelle funzioni ___.',
    correctAnswer: 'esecutive', points: 2, orderIndex: 76, tags: ['linguistica', 'vocabolario']
  },

  // C2 — Testi filosofici, letterari, critici (77–82)
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'READING', skill: 'READING',
    passageTitle: 'L\'ontologia del virtuale',
    passage: 'La distinzione tra reale e virtuale, un tempo nitida, si è progressivamente offuscata nell\'era digitale. Il filosofo Pierre Lévy sostiene che il virtuale non si oppone al reale, bensì all\'attuale: il virtuale è reale nella misura in cui produce effetti concreti sulla coscienza e sul comportamento umano. Le relazioni sociali mediate digitalmente, le identità costruite online e le economie interamente digitali suggeriscono che il virtuale abbia acquisito una consistenza ontologica propria, irriducibile alla mera simulazione del mondo fisico.',
    questionText: 'Secondo Lévy, a cosa si oppone il virtuale?',
    options: [
      { label: 'Al reale', value: 'al reale' },
      { label: 'All\'attuale', value: 'all\'attuale' },
      { label: 'Al fisico', value: 'al fisico' },
      { label: 'All\'immaginario', value: 'all\'immaginario' }
    ],
    correctAnswer: 'all\'attuale', points: 2, orderIndex: 77, tags: ['filosofia', 'tecnologia']
  },
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'READING', skill: 'READING',
    passageTitle: 'L\'ontologia del virtuale',
    passage: 'Le relazioni sociali mediate digitalmente, le identità costruite online e le economie interamente digitali suggeriscono che il virtuale abbia acquisito una consistenza ontologica propria, irriducibile alla mera simulazione del mondo fisico.',
    questionText: 'Cosa significa "consistenza ontologica" in questo contesto?',
    options: [
      { label: 'Solidità materiale', value: 'solidità materiale' },
      { label: 'Un\'esistenza reale e autonoma', value: 'esistenza reale e autonoma' },
      { label: 'Una somiglianza con il mondo fisico', value: 'somiglianza' },
      { label: 'Un valore economico', value: 'valore economico' }
    ],
    correctAnswer: 'esistenza reale e autonoma', points: 2, orderIndex: 78, tags: ['filosofia', 'vocabolario']
  },
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Leopardi e il pessimismo cosmico',
    passage: 'Nella fase matura del suo pensiero, Giacomo Leopardi approda a un pessimismo cosmico che trascende la dimensione individuale e storica per investire la condizione stessa dell\'esistenza. Ne "La ginestra", il poeta invita gli uomini ad abbandonare le illusioni di progresso e a riconoscere la propria fragilità di fronte alla natura indifferente. Paradossalmente, è proprio questa consapevolezza della comune miseria a fondare la possibilità di un\'autentica solidarietà umana — una "social catena" che rappresenta l\'unica risposta dignitosa all\'assurdità dell\'esistenza.',
    questionText: 'Cosa rappresenta la "social catena" ne La ginestra?',
    options: [
      { label: 'La catena dell\'oppressione sociale', value: 'oppressione' },
      { label: 'La solidarietà umana di fronte alla sofferenza comune', value: 'solidarietà umana' },
      { label: 'Il progresso tecnologico', value: 'progresso' },
      { label: 'I legami familiari', value: 'legami familiari' }
    ],
    correctAnswer: 'solidarietà umana', points: 2, orderIndex: 79, tags: ['letteratura', 'filosofia']
  },
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Leopardi e il pessimismo cosmico',
    passage: 'Il poeta invita gli uomini ad abbandonare le illusioni di progresso e a riconoscere la propria fragilità di fronte alla natura indifferente. Paradossalmente, è proprio questa consapevolezza della comune miseria a fondare la possibilità di un\'autentica solidarietà umana.',
    questionText: 'Perché il messaggio di Leopardi è definito "paradossale"?',
    options: [
      { label: 'Perché è contraddittorio', value: 'contraddittorio' },
      { label: 'Perché dalla consapevolezza della miseria nasce la solidarietà', value: 'dalla miseria nasce solidarietà' },
      { label: 'Perché il poeta non crede in ciò che scrive', value: 'non ci crede' },
      { label: 'Perché usa un linguaggio allegro per temi tristi', value: 'linguaggio allegro' }
    ],
    correctAnswer: 'dalla miseria nasce solidarietà', points: 2, orderIndex: 80, tags: ['letteratura']
  },
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'Leopardi approda a un pessimismo cosmico che trascende la dimensione individuale e storica per investire la condizione stessa dell\'esistenza.',
    questionText: 'Leopardi approda a un pessimismo ___ che va oltre la dimensione individuale.',
    correctAnswer: 'cosmico', points: 2, orderIndex: 81, tags: ['letteratura']
  },
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Etica dell\'alterità',
    passage: 'Emmanuel Lévinas propone un\'etica fondata sull\'incontro con il Volto dell\'Altro, un\'esperienza che precede ogni categorizzazione concettuale e si configura come appello irrecusabile alla responsabilità. Per Lévinas, l\'Altro non è un alter ego da comprendere per analogia con il sé, ma un\'alterità irriducibile che mette in questione la sovranità del soggetto. La relazione etica, in questa prospettiva, non è un contratto tra eguali ma una risposta asimmetrica alla vulnerabilità dell\'altro, anteriore a qualsiasi scelta deliberata.',
    questionText: 'Secondo Lévinas, la relazione etica è:',
    options: [
      { label: 'Un contratto tra parti uguali', value: 'contratto tra uguali' },
      { label: 'Una risposta asimmetrica alla vulnerabilità dell\'altro', value: 'risposta asimmetrica' },
      { label: 'Una scelta razionale e deliberata', value: 'scelta razionale' },
      { label: 'Un accordo basato sulla reciprocità', value: 'reciprocità' }
    ],
    correctAnswer: 'risposta asimmetrica', points: 2, orderIndex: 82, tags: ['filosofia', 'etica']
  }
]
