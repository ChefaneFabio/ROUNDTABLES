import { MultiSkillQuestionData } from '../types'

// Italian Listening Questions — ~7 per CEFR level (~72 total)
// Types: LISTENING (multiple choice after audio), DICTATION
// Each question includes ttsScript for TTS generation

export const italianListeningQuestions: MultiSkillQuestionData[] = [
  // ============================================================
  // A1 — Beginner (7 questions)
  // ============================================================
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Ciao. Mi chiamo Giovanni. Sono di Roma. Ho venticinque anni. Mi piace il calcio.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Di dove è Giovanni?',
    options: [{ label: 'Milano', value: 'Milano' }, { label: 'Roma', value: 'Roma' }, { label: 'Napoli', value: 'Napoli' }, { label: 'Firenze', value: 'Firenze' }],
    correctAnswer: 'Roma', points: 1, orderIndex: 1, tags: ['presentazione'], timeSuggested: 30
  },
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Ciao. Mi chiamo Giovanni. Sono di Roma. Ho venticinque anni. Mi piace il calcio.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Quanti anni ha Giovanni?',
    options: [{ label: '20', value: '20' }, { label: '25', value: '25' }, { label: '30', value: '30' }, { label: '35', value: '35' }],
    correctAnswer: '25', points: 1, orderIndex: 2, tags: ['presentazione', 'numeri'], timeSuggested: 30
  },
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Scusi, dov\'è la farmacia? Vada dritto, poi giri a sinistra. La farmacia è accanto al supermercato.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Dov\'è la farmacia?',
    options: [{ label: 'Accanto alla scuola', value: 'accanto alla scuola' }, { label: 'Accanto al supermercato', value: 'accanto al supermercato' }, { label: 'Accanto al parco', value: 'accanto al parco' }, { label: 'Accanto all\'ospedale', value: 'accanto all\'ospedale' }],
    correctAnswer: 'accanto al supermercato', points: 1, orderIndex: 3, tags: ['indicazioni'], timeSuggested: 30
  },
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'Mi piace mangiare la pizza.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Scrivi esattamente quello che senti.',
    correctAnswer: 'Mi piace mangiare la pizza.', points: 1, orderIndex: 4, tags: ['dettato'], timeSuggested: 30
  },
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Oggi è lunedì. Domani è martedì. Ho la lezione di italiano mercoledì.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Quando c\'è la lezione di italiano?',
    options: [{ label: 'Lunedì', value: 'Lunedì' }, { label: 'Martedì', value: 'Martedì' }, { label: 'Mercoledì', value: 'Mercoledì' }, { label: 'Giovedì', value: 'Giovedì' }],
    correctAnswer: 'Mercoledì', points: 1, orderIndex: 5, tags: ['giorni'], timeSuggested: 30
  },
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Posso avere un caffè, per favore? Certo. Sono un euro e cinquanta.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Quanto costa il caffè?',
    options: [{ label: '1,00 euro', value: '1.00' }, { label: '1,50 euro', value: '1.50' }, { label: '2,00 euro', value: '2.00' }, { label: '2,50 euro', value: '2.50' }],
    correctAnswer: '1.50', points: 1, orderIndex: 6, tags: ['spesa', 'numeri'], timeSuggested: 30
  },
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'Il gatto è sul tavolo.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Scrivi esattamente quello che senti.',
    correctAnswer: 'Il gatto è sul tavolo.', points: 1, orderIndex: 7, tags: ['dettato'], timeSuggested: 30
  },

  // ============================================================
  // A2 — Elementary (7 questions)
  // ============================================================
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Ieri sera sono andato al cinema con mia sorella. Abbiamo visto una commedia. Era molto divertente. Dopo il film, abbiamo cenato in una pizzeria.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Che tipo di film hanno visto?',
    options: [{ label: 'Azione', value: 'azione' }, { label: 'Commedia', value: 'commedia' }, { label: 'Horror', value: 'horror' }, { label: 'Drammatico', value: 'drammatico' }],
    correctAnswer: 'commedia', points: 1, orderIndex: 8, tags: ['intrattenimento'], timeSuggested: 40
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Ieri sera sono andato al cinema con mia sorella. Abbiamo visto una commedia. Era molto divertente. Dopo il film, abbiamo cenato in una pizzeria.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Con chi è andato al cinema?',
    options: [{ label: 'Con un amico', value: 'con un amico' }, { label: 'Con sua sorella', value: 'con sua sorella' }, { label: 'Con sua madre', value: 'con sua madre' }, { label: 'Da solo', value: 'da solo' }],
    correctAnswer: 'con sua sorella', points: 1, orderIndex: 9, tags: ['intrattenimento'], timeSuggested: 40
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Il treno per Milano parte dal binario tre alle nove e quindici. Per favore, abbiate pronti i biglietti.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Da quale binario parte il treno?',
    options: [{ label: 'Binario 1', value: '1' }, { label: 'Binario 2', value: '2' }, { label: 'Binario 3', value: '3' }, { label: 'Binario 4', value: '4' }],
    correctAnswer: '3', points: 1, orderIndex: 10, tags: ['trasporti'], timeSuggested: 40
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'Lei va al lavoro in autobus ogni mattina.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Scrivi esattamente quello che senti.',
    correctAnswer: 'Lei va al lavoro in autobus ogni mattina.', points: 1, orderIndex: 11, tags: ['dettato'], timeSuggested: 40
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Benvenuti al museo. È aperto dalle nove di mattina alle cinque del pomeriggio. I biglietti costano otto euro per gli adulti e quattro euro per i bambini. C\'è un bar al secondo piano.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Quanto costa un biglietto per un adulto?',
    options: [{ label: '4 euro', value: '4' }, { label: '6 euro', value: '6' }, { label: '8 euro', value: '8' }, { label: '10 euro', value: '10' }],
    correctAnswer: '8', points: 1, orderIndex: 12, tags: ['turismo'], timeSuggested: 40
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Di solito mi sveglio alle sette. Prima faccio la doccia e mi vesto. Poi faccio colazione — di solito un cornetto e un cappuccino. Esco di casa alle otto e mezza.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Cosa mangia di solito a colazione?',
    options: [{ label: 'Cereali e latte', value: 'cereali' }, { label: 'Un cornetto e un cappuccino', value: 'un cornetto e un cappuccino' }, { label: 'Uova e succo', value: 'uova' }, { label: 'Niente', value: 'niente' }],
    correctAnswer: 'un cornetto e un cappuccino', points: 1, orderIndex: 13, tags: ['routine quotidiana'], timeSuggested: 40
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'Abbiamo fatto una bellissima vacanza in Sardegna l\'anno scorso.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Scrivi esattamente quello che senti.',
    correctAnswer: 'Abbiamo fatto una bellissima vacanza in Sardegna l\'anno scorso.', points: 1, orderIndex: 14, tags: ['dettato'], timeSuggested: 40
  },

  // ============================================================
  // B1 — Intermediate (7 questions)
  // ============================================================
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Buongiorno. Vorrei prendere un appuntamento con il Dottor Bianchi, per favore. Ho mal di testa da circa una settimana. Il primo posto disponibile è giovedì prossimo alle due e mezza. Le andrebbe bene?',
    ttsLanguageCode: 'it-IT',
    questionText: 'Perché la persona chiama?',
    options: [
      { label: 'Per cancellare un appuntamento', value: 'cancellare' },
      { label: 'Per fissare un appuntamento dal medico', value: 'fissare appuntamento' },
      { label: 'Per chiedere informazioni sui farmaci', value: 'farmaci' },
      { label: 'Per lamentarsi del servizio', value: 'lamentarsi' }
    ],
    correctAnswer: 'fissare appuntamento', points: 2, orderIndex: 15, tags: ['salute', 'appuntamenti'], timeSuggested: 45
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Buongiorno. Vorrei prendere un appuntamento con il Dottor Bianchi, per favore. Ho mal di testa da circa una settimana. Il primo posto disponibile è giovedì prossimo alle due e mezza.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Quando è il primo appuntamento disponibile?',
    options: [
      { label: 'Lunedì alle 14:00', value: 'lunedì 14:00' },
      { label: 'Mercoledì alle 15:00', value: 'mercoledì 15:00' },
      { label: 'Giovedì alle 14:30', value: 'giovedì 14:30' },
      { label: 'Venerdì alle 10:00', value: 'venerdì 10:00' }
    ],
    correctAnswer: 'giovedì 14:30', points: 2, orderIndex: 16, tags: ['appuntamenti'], timeSuggested: 45
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Secondo un recente sondaggio, il settanta per cento dei giovani tra i diciotto e i venticinque anni controlla il telefono entro i primi dieci minuti dal risveglio. Gli esperti avvertono che questa abitudine può aumentare i livelli di stress e ridurre la produttività durante la giornata.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Quale percentuale di giovani controlla il telefono subito dopo il risveglio?',
    options: [{ label: '50%', value: '50' }, { label: '60%', value: '60' }, { label: '70%', value: '70' }, { label: '80%', value: '80' }],
    correctAnswer: '70', points: 2, orderIndex: 17, tags: ['tecnologia', 'salute'], timeSuggested: 45
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'L\'azienda ha deciso di introdurre orari di lavoro flessibili per tutti i dipendenti a partire dal mese prossimo.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Scrivi esattamente quello che senti.',
    correctAnswer: 'L\'azienda ha deciso di introdurre orari di lavoro flessibili per tutti i dipendenti a partire dal mese prossimo.', points: 2, orderIndex: 18, tags: ['dettato', 'lavoro'], timeSuggested: 60
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Attenzione passeggeri. Il volo delle dodici e quindici per Barcellona è stato ritardato di circa quarantacinque minuti a causa del maltempo. Ci scusiamo per il disagio. Vi preghiamo di controllare il tabellone delle partenze per gli aggiornamenti.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Perché il volo è in ritardo?',
    options: [
      { label: 'Problemi tecnici', value: 'problemi tecnici' },
      { label: 'Maltempo', value: 'maltempo' },
      { label: 'Mancanza di personale', value: 'personale' },
      { label: 'Controllo di sicurezza', value: 'sicurezza' }
    ],
    correctAnswer: 'maltempo', points: 2, orderIndex: 19, tags: ['viaggio'], timeSuggested: 45
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Il nuovo centro sportivo aprirà a marzo. Avrà una piscina, una palestra e diverse sale riunioni. L\'abbonamento costa trenta euro al mese per gli adulti. Ci sono sconti per studenti e anziani.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Chi può avere degli sconti sull\'abbonamento?',
    options: [
      { label: 'Bambini e insegnanti', value: 'bambini e insegnanti' },
      { label: 'Studenti e anziani', value: 'studenti e anziani' },
      { label: 'Famiglie e coppie', value: 'famiglie' },
      { label: 'Tutti', value: 'tutti' }
    ],
    correctAnswer: 'studenti e anziani', points: 2, orderIndex: 20, tags: ['comunità'], timeSuggested: 45
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'Anche se il tempo era brutto, siamo riusciti comunque a goderci la giornata al mare.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Scrivi esattamente quello che senti.',
    correctAnswer: 'Anche se il tempo era brutto, siamo riusciti comunque a goderci la giornata al mare.', points: 2, orderIndex: 21, tags: ['dettato'], timeSuggested: 60
  },

  // ============================================================
  // B2 — Upper Intermediate (7 questions)
  // ============================================================
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Il gruppo di ricerca dell\'Università di Bologna ha pubblicato risultati che suggeriscono che la meditazione regolare può alterare fisicamente la struttura del cervello. I partecipanti che hanno meditato per trenta minuti al giorno per otto settimane hanno mostrato un aumento della densità della materia grigia nelle aree associate alla memoria e alla regolazione emotiva, mentre le aree legate allo stress hanno mostrato una diminuzione della densità.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Cosa è successo alle aree del cervello legate allo stress?',
    options: [
      { label: 'Sono aumentate di dimensione', value: 'aumentate' },
      { label: 'Hanno mostrato una diminuzione della densità', value: 'diminuzione della densità' },
      { label: 'Non sono state influenzate', value: 'non influenzate' },
      { label: 'Sono migliorate nella funzione', value: 'migliorate' }
    ],
    correctAnswer: 'diminuzione della densità', points: 2, orderIndex: 22, tags: ['scienza', 'salute'], timeSuggested: 60
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Il gruppo di ricerca dell\'Università di Bologna ha pubblicato risultati che suggeriscono che la meditazione regolare può alterare fisicamente la struttura del cervello. I partecipanti che hanno meditato per trenta minuti al giorno per otto settimane hanno mostrato un aumento della densità della materia grigia nelle aree associate alla memoria e alla regolazione emotiva.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Per quanto tempo al giorno hanno meditato i partecipanti?',
    options: [{ label: '10 minuti', value: '10' }, { label: '20 minuti', value: '20' }, { label: '30 minuti', value: '30' }, { label: '60 minuti', value: '60' }],
    correctAnswer: '30', points: 2, orderIndex: 23, tags: ['scienza'], timeSuggested: 60
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Molte persone pensano che il multitasking le renda più produttive, ma le ricerche neuroscientifiche raccontano una storia diversa. Quando passiamo da un compito all\'altro, il nostro cervello ha bisogno di tempo per riorientarsi, il che riduce effettivamente l\'efficienza. Gli studi suggeriscono che quello che chiamiamo multitasking è in realtà un rapido passaggio tra compiti, e può ridurre la produttività fino al quaranta per cento.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Secondo il brano, il multitasking può ridurre la produttività fino a:',
    options: [{ label: '10%', value: '10' }, { label: '20%', value: '20' }, { label: '30%', value: '30' }, { label: '40%', value: '40' }],
    correctAnswer: '40', points: 2, orderIndex: 24, tags: ['produttività'], timeSuggested: 60
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'Nonostante la crisi economica, l\'azienda è riuscita ad aumentare i profitti diversificando la gamma di prodotti ed espandendosi in nuovi mercati.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Scrivi esattamente quello che senti.',
    correctAnswer: 'Nonostante la crisi economica, l\'azienda è riuscita ad aumentare i profitti diversificando la gamma di prodotti ed espandendosi in nuovi mercati.', points: 2, orderIndex: 25, tags: ['dettato', 'affari'], timeSuggested: 90
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Il consiglio comunale ha annunciato piani per convertire la fabbrica abbandonata in Viale dei Tigli in un complesso a uso misto. Il progetto includerà alloggi a prezzi accessibili, spazi commerciali e un parco pubblico. I lavori dovrebbero iniziare in primavera e terminare entro due anni. I residenti locali hanno espresso sentimenti contrastanti — alcuni accolgono con favore lo sviluppo, mentre altri sono preoccupati per l\'aumento del traffico e del rumore.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Quale preoccupazione hanno alcuni residenti?',
    options: [
      { label: 'Tasse più alte', value: 'tasse' },
      { label: 'Aumento del traffico e del rumore', value: 'traffico e rumore' },
      { label: 'Perdita di spazi verdi', value: 'spazi verdi' },
      { label: 'Tassi di criminalità', value: 'criminalità' }
    ],
    correctAnswer: 'traffico e rumore', points: 2, orderIndex: 26, tags: ['comunità', 'urbano'], timeSuggested: 60
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Il concetto di reddito di base universale ha guadagnato terreno negli ultimi anni, in particolare a seguito delle perturbazioni economiche causate dall\'automazione. I sostenitori sostengono che fornire a ogni cittadino un reddito minimo garantito ridurrebbe la povertà e darebbe alle persone la libertà di dedicarsi all\'istruzione o all\'imprenditoria. Gli scettici si preoccupano dei costi e dei potenziali effetti sugli incentivi al lavoro.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Quale preoccupazione hanno gli scettici riguardo al reddito di base universale?',
    options: [
      { label: 'Sarebbe troppo complicato da gestire', value: 'complicato' },
      { label: 'I costi e i potenziali effetti sugli incentivi al lavoro', value: 'costi e incentivi al lavoro' },
      { label: 'Aumenterebbe la disuguaglianza', value: 'disuguaglianza' },
      { label: 'Ridurrebbe gli standard educativi', value: 'educazione' }
    ],
    correctAnswer: 'costi e incentivi al lavoro', points: 2, orderIndex: 27, tags: ['economia', 'politica'], timeSuggested: 60
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'Il governo si è impegnato a investire massicciamente nelle infrastrutture per le energie rinnovabili nel prossimo decennio.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Scrivi esattamente quello che senti.',
    correctAnswer: 'Il governo si è impegnato a investire massicciamente nelle infrastrutture per le energie rinnovabili nel prossimo decennio.', points: 2, orderIndex: 28, tags: ['dettato', 'politica'], timeSuggested: 90
  },

  // ============================================================
  // C1 — Advanced (7 questions)
  // ============================================================
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Il fenomeno della dissonanza cognitiva, descritto per la prima volta da Leon Festinger nel millenovecentocinquantasette, si verifica quando gli individui sostengono contemporaneamente due convinzioni contraddittorie. Piuttosto che tollerare il disagio, le persone tendono a modificare una delle convinzioni o a razionalizzare l\'incoerenza. Ciò ha implicazioni significative per la comprensione della polarizzazione politica, poiché gli individui possono rifiutare prove credibili che contraddicono la loro visione del mondo esistente.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Come reagiscono tipicamente le persone alla dissonanza cognitiva?',
    options: [
      { label: 'Accettano entrambe le convinzioni contraddittorie', value: 'accettano entrambe' },
      { label: 'Modificano una convinzione o razionalizzano l\'incoerenza', value: 'modificano o razionalizzano' },
      { label: 'Cercano aiuto professionale', value: 'cercano aiuto' },
      { label: 'Ignorano entrambe le convinzioni', value: 'ignorano entrambe' }
    ],
    correctAnswer: 'modificano o razionalizzano', points: 3, orderIndex: 29, tags: ['psicologia'], timeSuggested: 75
  },
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Studi longitudinali che seguono i bambini dalla prima infanzia all\'età adulta hanno costantemente dimostrato che lo status socioeconomico alla nascita è uno dei più forti predittori del livello di istruzione e del reddito nel corso della vita. Tuttavia, interventi come l\'educazione prescolare di alta qualità e i programmi di mentoring hanno mostrato risultati promettenti nel mitigare queste disparità, in particolare quando attuati prima dei cinque anni.',
    ttsLanguageCode: 'it-IT',
    questionText: 'A quale età gli interventi sono più efficaci secondo la ricerca?',
    options: [
      { label: 'Prima dei 5 anni', value: 'prima dei 5' },
      { label: 'Tra i 5 e i 10 anni', value: 'da 5 a 10' },
      { label: 'Durante l\'adolescenza', value: 'adolescenza' },
      { label: 'Nella prima età adulta', value: 'prima età adulta' }
    ],
    correctAnswer: 'prima dei 5', points: 3, orderIndex: 30, tags: ['educazione', 'sociologia'], timeSuggested: 75
  },
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'La crisi della replicabilità in psicologia si riferisce alla scoperta che molti risultati pubblicati nel campo non possono essere replicati da ricercatori indipendenti. Uno studio fondamentale del duemilaquindici ha tentato di riprodurre cento esperimenti psicologici e ha scoperto che solo il trentanove per cento ha prodotto gli stessi risultati. Ciò ha provocato richieste di maggiore rigore metodologico, pre-registrazione degli studi e condivisione aperta dei dati.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Quale percentuale degli esperimenti di psicologia è stata replicata con successo?',
    options: [{ label: '25%', value: '25' }, { label: '39%', value: '39' }, { label: '50%', value: '50' }, { label: '65%', value: '65' }],
    correctAnswer: '39', points: 3, orderIndex: 31, tags: ['scienza', 'ricerca'], timeSuggested: 75
  },
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'Il ritmo senza precedenti del cambiamento tecnologico ha alterato fondamentalmente la natura del lavoro, richiedendo un adattamento continuo e un apprendimento permanente.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Scrivi esattamente quello che senti.',
    correctAnswer: 'Il ritmo senza precedenti del cambiamento tecnologico ha alterato fondamentalmente la natura del lavoro, richiedendo un adattamento continuo e un apprendimento permanente.', points: 3, orderIndex: 32, tags: ['dettato'], timeSuggested: 90
  },
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Il concetto di neuroplasticità — la capacità del cervello di riorganizzarsi formando nuove connessioni neurali — ha rivoluzionato la nostra comprensione della riabilitazione cognitiva. I pazienti che hanno subito un ictus, ad esempio, a volte possono recuperare le funzioni perdute perché parti sane del cervello compensano le aree danneggiate. Questo processo, tuttavia, richiede un intervento terapeutico intensivo e prolungato.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Cos\'è la neuroplasticità?',
    options: [
      { label: 'La capacità di imparare più lingue', value: 'lingue' },
      { label: 'La capacità del cervello di formare nuove connessioni neurali', value: 'nuove connessioni neurali' },
      { label: 'Un tipo di chirurgia cerebrale', value: 'chirurgia' },
      { label: 'Miglioramento della memoria tramite farmaci', value: 'farmaci' }
    ],
    correctAnswer: 'nuove connessioni neurali', points: 3, orderIndex: 33, tags: ['scienza'], timeSuggested: 75
  },
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Il concetto di economia circolare rappresenta un cambio di paradigma rispetto al modello lineare tradizionale di produzione e consumo. Invece di seguire uno schema prendi-produci-getta, l\'economia circolare mira a mantenere le risorse in uso il più a lungo possibile, estrarre il massimo valore da esse, e poi recuperare e rigenerare prodotti e materiali alla fine della loro vita utile.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Come viene descritto il modello economico tradizionale?',
    options: [
      { label: 'Circolare', value: 'circolare' },
      { label: 'Prendi-produci-getta', value: 'prendi-produci-getta' },
      { label: 'Sostenibile', value: 'sostenibile' },
      { label: 'Rigenerativo', value: 'rigenerativo' }
    ],
    correctAnswer: 'prendi-produci-getta', points: 3, orderIndex: 34, tags: ['economia', 'ambiente'], timeSuggested: 75
  },
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'Nonostante i considerevoli progressi compiuti nel campo delle energie rinnovabili, la transizione dai combustibili fossili resta irta di sfide economiche e politiche.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Scrivi esattamente quello che senti.',
    correctAnswer: 'Nonostante i considerevoli progressi compiuti nel campo delle energie rinnovabili, la transizione dai combustibili fossili resta irta di sfide economiche e politiche.', points: 3, orderIndex: 35, tags: ['dettato'], timeSuggested: 90
  },

  // ============================================================
  // C2 — Proficiency (7 questions)
  // ============================================================
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Le implicazioni filosofiche dell\'entanglement quantistico sono forse più profonde delle sue proprietà fisiche. Quando due particelle diventano entangled, la misurazione dello stato di una determina istantaneamente lo stato dell\'altra, indipendentemente dalla distanza che le separa. Einstein definì notoriamente questo fenomeno come una "spaventosa azione a distanza", eppure esperimenti successivi ne hanno definitivamente confermato l\'esistenza, mettendo in discussione le nostre assunzioni più fondamentali sulla località e la causalità.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Come definì Einstein l\'entanglement quantistico?',
    options: [
      { label: 'Una bella teoria', value: 'bella teoria' },
      { label: 'Spaventosa azione a distanza', value: 'spaventosa azione a distanza' },
      { label: 'Il principio di indeterminazione', value: 'principio di indeterminazione' },
      { label: 'Una curiosità matematica', value: 'curiosità matematica' }
    ],
    correctAnswer: 'spaventosa azione a distanza', points: 3, orderIndex: 36, tags: ['fisica'], timeSuggested: 90
  },
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Le implicazioni filosofiche dell\'entanglement quantistico sono forse più profonde delle sue proprietà fisiche. Quando due particelle diventano entangled, la misurazione dello stato di una determina istantaneamente lo stato dell\'altra. Esperimenti successivi ne hanno definitivamente confermato l\'esistenza, mettendo in discussione le nostre assunzioni più fondamentali sulla località e la causalità.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Quali assunzioni fondamentali mette in discussione l\'entanglement quantistico?',
    options: [
      { label: 'Gravità e magnetismo', value: 'gravità e magnetismo' },
      { label: 'Località e causalità', value: 'località e causalità' },
      { label: 'Tempo e spazio', value: 'tempo e spazio' },
      { label: 'Energia e materia', value: 'energia e materia' }
    ],
    correctAnswer: 'località e causalità', points: 3, orderIndex: 37, tags: ['fisica'], timeSuggested: 90
  },
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'La mercificazione dei dati personali ha generato una nuova forma di capitalismo della sorveglianza, in cui l\'estrazione e la monetizzazione dei dati comportamentali costituiscono il modello di ricavo principale per molte aziende tecnologiche. Shoshana Zuboff sostiene che ciò rappresenta un\'asimmetria senza precedenti di conoscenza e potere, fondamentalmente incompatibile con le norme democratiche.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Secondo Zuboff, cosa crea il capitalismo della sorveglianza?',
    options: [
      { label: 'Accesso uguale alle informazioni', value: 'accesso uguale' },
      { label: 'Un\'asimmetria senza precedenti di conoscenza e potere', value: 'asimmetria di conoscenza e potere' },
      { label: 'Prodotti migliori per i consumatori', value: 'prodotti migliori' },
      { label: 'Mercati più efficienti', value: 'mercati efficienti' }
    ],
    correctAnswer: 'asimmetria di conoscenza e potere', points: 3, orderIndex: 38, tags: ['tecnologia', 'filosofia'], timeSuggested: 90
  },
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'Le ramificazioni epistemologiche dell\'intelligenza artificiale si estendono ben oltre le sue immediate applicazioni pratiche, sollevando questioni fondamentali sulla natura stessa della conoscenza.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Scrivi esattamente quello che senti.',
    correctAnswer: 'Le ramificazioni epistemologiche dell\'intelligenza artificiale si estendono ben oltre le sue immediate applicazioni pratiche, sollevando questioni fondamentali sulla natura stessa della conoscenza.', points: 3, orderIndex: 39, tags: ['dettato'], timeSuggested: 120
  },
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'La cosiddetta "crisi della replicabilità" non si è limitata alla psicologia. Medicina, economia e persino alcune aree della fisica hanno affrontato un esame simile. Le cause sottostanti sono molteplici: il pregiudizio di pubblicazione che favorisce risultati nuovi e statisticamente significativi, campioni insufficienti, gradi di libertà del ricercatore nell\'analisi dei dati e strutture di incentivi perverse nel mondo accademico che privilegiano la quantità delle pubblicazioni rispetto alla qualità.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Cosa favorisce il "pregiudizio di pubblicazione" secondo il brano?',
    options: [
      { label: 'Risultati replicati', value: 'replicati' },
      { label: 'Risultati nuovi e statisticamente significativi', value: 'nuovi e significativi' },
      { label: 'Studi su larga scala', value: 'larga scala' },
      { label: 'Risultati negativi', value: 'negativi' }
    ],
    correctAnswer: 'nuovi e significativi', points: 3, orderIndex: 40, tags: ['scienza', 'metodologia'], timeSuggested: 90
  },
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Il concetto di umiltà epistemica, radicato nella filosofia socratica, suggerisce che riconoscere i limiti della propria conoscenza è paradossalmente un prerequisito per una comprensione autentica. In un\'epoca di sovraccarico informativo e affermazioni sicure sui social media, coltivare tale umiltà può essere più importante che mai sia per la cognizione individuale che per la deliberazione collettiva.',
    ttsLanguageCode: 'it-IT',
    questionText: 'In cosa è radicata l\'umiltà epistemica?',
    options: [
      { label: 'Nella psicologia moderna', value: 'psicologia moderna' },
      { label: 'Nella filosofia socratica', value: 'filosofia socratica' },
      { label: 'Nella meditazione orientale', value: 'meditazione orientale' },
      { label: 'Nel metodo scientifico', value: 'metodo scientifico' }
    ],
    correctAnswer: 'filosofia socratica', points: 3, orderIndex: 41, tags: ['filosofia'], timeSuggested: 90
  },
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'Nonostante l\'apparente democratizzazione dell\'informazione attraverso le tecnologie digitali, l\'accesso a una conoscenza affidabile e di alta qualità resta profondamente stratificato lungo linee socioeconomiche.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Scrivi esattamente quello che senti.',
    correctAnswer: 'Nonostante l\'apparente democratizzazione dell\'informazione attraverso le tecnologie digitali, l\'accesso a una conoscenza affidabile e di alta qualità resta profondamente stratificato lungo linee socioeconomiche.', points: 3, orderIndex: 42, tags: ['dettato'], timeSuggested: 120
  },

  // ============================================================
  // NEW QUESTIONS (43–72) — 5 per level, ~70% MC + ~30% DICTATION
  // ============================================================

  // A1 — Semplici dialoghi, presentazioni (43–47)
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Ciao, io sono Anna. Ho una sorella, si chiama Elena. Elena ha sette anni. Noi abitiamo a Firenze con i nostri genitori.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Dove abita Anna?',
    options: [{ label: 'Roma', value: 'Roma' }, { label: 'Milano', value: 'Milano' }, { label: 'Firenze', value: 'Firenze' }, { label: 'Napoli', value: 'Napoli' }],
    correctAnswer: 'Firenze', points: 1, orderIndex: 43, tags: ['presentazione', 'città'], timeSuggested: 30
  },
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Ciao, io sono Anna. Ho una sorella, si chiama Elena. Elena ha sette anni. Noi abitiamo a Firenze con i nostri genitori.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Quanti anni ha Elena?',
    options: [{ label: '5', value: '5' }, { label: '6', value: '6' }, { label: '7', value: '7' }, { label: '8', value: '8' }],
    correctAnswer: '7', points: 1, orderIndex: 44, tags: ['presentazione', 'numeri'], timeSuggested: 30
  },
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Buongiorno, vorrei un gelato alla fragola e uno al cioccolato. Quanto costa? Sono tre euro in tutto.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Quanto costano i gelati in tutto?',
    options: [{ label: '2 euro', value: '2' }, { label: '3 euro', value: '3' }, { label: '4 euro', value: '4' }, { label: '5 euro', value: '5' }],
    correctAnswer: '3', points: 1, orderIndex: 45, tags: ['spesa', 'cibo'], timeSuggested: 30
  },
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'La mia casa è grande e bella.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Scrivi esattamente quello che senti.',
    correctAnswer: 'La mia casa è grande e bella.', points: 1, orderIndex: 46, tags: ['dettato'], timeSuggested: 30
  },
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Oggi è sabato. Non vado a scuola il sabato. Resto a casa e gioco con il mio gatto. Il mio gatto si chiama Micio.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Come si chiama il gatto?',
    options: [{ label: 'Fufi', value: 'Fufi' }, { label: 'Micio', value: 'Micio' }, { label: 'Leo', value: 'Leo' }, { label: 'Felix', value: 'Felix' }],
    correctAnswer: 'Micio', points: 1, orderIndex: 47, tags: ['animali', 'routine'], timeSuggested: 30
  },

  // A2 — Dialoghi quotidiani, indicazioni (48–52)
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Buongiorno, vorrei prenotare un tavolo per quattro persone per sabato sera alle venti. Va bene, a che nome? Rossi. Perfetto, signor Rossi, a sabato.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Per quante persone è la prenotazione?',
    options: [{ label: '2', value: '2' }, { label: '3', value: '3' }, { label: '4', value: '4' }, { label: '5', value: '5' }],
    correctAnswer: '4', points: 1, orderIndex: 48, tags: ['ristorante', 'prenotazione'], timeSuggested: 40
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Per andare alla stazione, deve prendere la seconda strada a destra, poi continuare dritto per circa duecento metri. La stazione è sulla sinistra, accanto al parco.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Dove si trova la stazione?',
    options: [{ label: 'Accanto alla chiesa', value: 'accanto alla chiesa' }, { label: 'Accanto al parco', value: 'accanto al parco' }, { label: 'Accanto al mercato', value: 'accanto al mercato' }, { label: 'Accanto alla scuola', value: 'accanto alla scuola' }],
    correctAnswer: 'accanto al parco', points: 1, orderIndex: 49, tags: ['indicazioni'], timeSuggested: 40
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Ieri ho comprato un vestito nuovo per il matrimonio di mia cugina. È un vestito blu molto elegante. È costato centocinquanta euro. Il matrimonio è il mese prossimo.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Quanto è costato il vestito?',
    options: [{ label: '100 euro', value: '100' }, { label: '120 euro', value: '120' }, { label: '150 euro', value: '150' }, { label: '200 euro', value: '200' }],
    correctAnswer: '150', points: 1, orderIndex: 50, tags: ['shopping', 'numeri'], timeSuggested: 40
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'Il fine settimana prossimo andremo a visitare i nonni in campagna.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Scrivi esattamente quello che senti.',
    correctAnswer: 'Il fine settimana prossimo andremo a visitare i nonni in campagna.', points: 1, orderIndex: 51, tags: ['dettato', 'famiglia'], timeSuggested: 40
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Il dottore dice che devo riposare per tre giorni e prendere questa medicina due volte al giorno, una la mattina e una la sera, dopo i pasti.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Quante volte al giorno deve prendere la medicina?',
    options: [{ label: 'Una volta', value: '1' }, { label: 'Due volte', value: '2' }, { label: 'Tre volte', value: '3' }, { label: 'Quattro volte', value: '4' }],
    correctAnswer: '2', points: 1, orderIndex: 52, tags: ['salute', 'dottore'], timeSuggested: 40
  },

  // B1 — Notizie, annunci, conversazioni (53–57)
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Buongiorno a tutti. Vi informiamo che la biblioteca comunale resterà chiusa dal quindici al venti agosto per lavori di ristrutturazione. Durante la chiusura, i libri potranno essere restituiti nella cassetta all\'ingresso. La biblioteca riaprirà il ventuno agosto con orario regolare.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Quando riaprirà la biblioteca?',
    options: [
      { label: 'Il 15 agosto', value: '15 agosto' },
      { label: 'Il 18 agosto', value: '18 agosto' },
      { label: 'Il 20 agosto', value: '20 agosto' },
      { label: 'Il 21 agosto', value: '21 agosto' }
    ],
    correctAnswer: '21 agosto', points: 1, orderIndex: 53, tags: ['annunci', 'comunità'], timeSuggested: 45
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Una nuova ricerca dell\'università di Padova ha scoperto che le persone che leggono almeno trenta minuti al giorno hanno livelli di stress più bassi e dormono meglio la notte. I ricercatori consigliano di leggere libri di carta piuttosto che schermi digitali prima di dormire.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Cosa consigliano i ricercatori?',
    options: [
      { label: 'Leggere su tablet', value: 'tablet' },
      { label: 'Leggere libri di carta prima di dormire', value: 'libri di carta' },
      { label: 'Leggere solo la mattina', value: 'solo la mattina' },
      { label: 'Non leggere prima di dormire', value: 'non leggere' }
    ],
    correctAnswer: 'libri di carta', points: 1, orderIndex: 54, tags: ['salute', 'ricerca'], timeSuggested: 45
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Ciao Marco, ti chiamo per dirti che la festa di venerdì è stata spostata a sabato perché il locale non era disponibile. L\'orario rimane lo stesso, alle ventuno. Puoi portare qualcosa da bere? Fammi sapere se puoi venire.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Perché la festa è stata spostata?',
    options: [
      { label: 'Per il maltempo', value: 'maltempo' },
      { label: 'Il locale non era disponibile', value: 'locale non disponibile' },
      { label: 'Marco non poteva venire', value: 'Marco non poteva' },
      { label: 'Mancavano le bevande', value: 'mancavano bevande' }
    ],
    correctAnswer: 'locale non disponibile', points: 1, orderIndex: 55, tags: ['comunicazione', 'eventi'], timeSuggested: 45
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'Secondo gli esperti, imparare una lingua straniera da adulti richiede costanza e motivazione.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Scrivi esattamente quello che senti.',
    correctAnswer: 'Secondo gli esperti, imparare una lingua straniera da adulti richiede costanza e motivazione.', points: 1, orderIndex: 56, tags: ['dettato', 'educazione'], timeSuggested: 60
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Oggi al telegiornale hanno detto che il prezzo della benzina aumenterà di cinque centesimi al litro a partire da lunedì prossimo. Il governo ha dichiarato che l\'aumento è dovuto alla crisi energetica internazionale.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Di quanto aumenterà il prezzo della benzina?',
    options: [
      { label: '3 centesimi', value: '3' },
      { label: '5 centesimi', value: '5' },
      { label: '10 centesimi', value: '10' },
      { label: '15 centesimi', value: '15' }
    ],
    correctAnswer: '5', points: 1, orderIndex: 57, tags: ['notizie', 'economia'], timeSuggested: 45
  },

  // B2 — Discorsi, dibattiti, analisi (58–62)
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Il fenomeno dello spreco alimentare assume proporzioni allarmanti nei Paesi industrializzati. Secondo la FAO, circa un terzo di tutto il cibo prodotto nel mondo viene sprecato. In Italia, ogni famiglia butta via in media circa sessantacinque chili di cibo all\'anno. Per contrastare il fenomeno, il governo ha introdotto una legge che facilita la donazione di cibo invenduto ai bisognosi.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Quanto cibo viene sprecato nel mondo secondo la FAO?',
    options: [
      { label: 'Un quarto', value: 'un quarto' },
      { label: 'Un terzo', value: 'un terzo' },
      { label: 'La metà', value: 'la metà' },
      { label: 'Due terzi', value: 'due terzi' }
    ],
    correctAnswer: 'un terzo', points: 2, orderIndex: 58, tags: ['ambiente', 'cibo'], timeSuggested: 60
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'L\'ascesa del lavoro a distanza ha sollevato un dibattito interessante sul futuro degli spazi ufficio. Alcuni analisti prevedono che entro il duemilatrenta il trenta per cento degli spazi commerciali nelle grandi città verrà convertito in abitazioni o spazi comunitari. Altri sostengono che l\'ufficio fisico rimarrà fondamentale per la collaborazione creativa e la cultura aziendale.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Cosa prevedono alcuni analisti per il 2030?',
    options: [
      { label: 'Tutti lavoreranno da casa', value: 'tutti da casa' },
      { label: 'Il 30% degli spazi commerciali verrà convertito', value: '30% convertito' },
      { label: 'Gli uffici saranno più grandi', value: 'uffici più grandi' },
      { label: 'Il lavoro a distanza sarà vietato', value: 'vietato' }
    ],
    correctAnswer: '30% convertito', points: 2, orderIndex: 59, tags: ['lavoro', 'urbanistica'], timeSuggested: 60
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'La cosiddetta "economia della condivisione" ha profondamente modificato settori tradizionali come i trasporti e l\'ospitalità. Piattaforme come Airbnb e BlaBlaCar permettono ai privati di offrire servizi che un tempo erano prerogativa esclusiva delle imprese. Mentre i consumatori beneficiano di prezzi più bassi e maggiore scelta, le imprese tradizionali lamentano una concorrenza sleale dovuta alla minore regolamentazione.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Di cosa si lamentano le imprese tradizionali?',
    options: [
      { label: 'Della mancanza di clienti', value: 'mancanza clienti' },
      { label: 'Della concorrenza sleale per la minore regolamentazione', value: 'concorrenza sleale' },
      { label: 'Dei prezzi troppo alti', value: 'prezzi alti' },
      { label: 'Della qualità dei servizi', value: 'qualità servizi' }
    ],
    correctAnswer: 'concorrenza sleale', points: 2, orderIndex: 60, tags: ['economia'], timeSuggested: 60
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'La globalizzazione ha reso i mercati più interconnessi, ma ha anche accentuato le disuguaglianze tra i Paesi sviluppati e quelli in via di sviluppo.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Scrivi esattamente quello che senti.',
    correctAnswer: 'La globalizzazione ha reso i mercati più interconnessi, ma ha anche accentuato le disuguaglianze tra i Paesi sviluppati e quelli in via di sviluppo.', points: 2, orderIndex: 61, tags: ['dettato', 'economia'], timeSuggested: 90
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Un nuovo studio condotto dall\'Istituto Superiore di Sanità ha rivelato che il quarantacinque per cento degli adolescenti italiani trascorre più di quattro ore al giorno davanti agli schermi, escludendo il tempo dedicato allo studio. I ricercatori hanno riscontrato una correlazione significativa tra il tempo eccessivo davanti agli schermi e disturbi del sonno, ansia e difficoltà di concentrazione.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Quale percentuale di adolescenti trascorre più di 4 ore al giorno davanti agli schermi?',
    options: [{ label: '35%', value: '35' }, { label: '40%', value: '40' }, { label: '45%', value: '45' }, { label: '50%', value: '50' }],
    correctAnswer: '45', points: 2, orderIndex: 62, tags: ['salute', 'giovani'], timeSuggested: 60
  },

  // C1 — Conferenze, analisi complesse (63–67)
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Il fenomeno dell\'epigenetica ha rivoluzionato la nostra comprensione dell\'ereditarietà. A differenza della genetica classica, l\'epigenetica studia le modificazioni dell\'espressione genica che non alterano la sequenza del DNA stesso. Queste modificazioni possono essere influenzate da fattori ambientali come la dieta, lo stress e l\'esposizione a sostanze tossiche, e in alcuni casi possono essere trasmesse alle generazioni successive, sfidando il dogma secondo cui solo le mutazioni del DNA sono ereditabili.',
    ttsLanguageCode: 'it-IT',
    questionText: 'In cosa differisce l\'epigenetica dalla genetica classica?',
    options: [
      { label: 'Studia le mutazioni del DNA', value: 'mutazioni DNA' },
      { label: 'Studia modificazioni dell\'espressione genica senza alterare il DNA', value: 'espressione genica senza alterare DNA' },
      { label: 'Si occupa solo di malattie ereditarie', value: 'malattie ereditarie' },
      { label: 'Riguarda solo gli animali', value: 'solo animali' }
    ],
    correctAnswer: 'espressione genica senza alterare DNA', points: 2, orderIndex: 63, tags: ['scienza', 'biologia'], timeSuggested: 75
  },
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Il concetto di "decrescita felice", propugnato in Italia dal filosofo Serge Latouche e dal movimento di Maurizio Pallante, contesta il paradigma della crescita economica illimitata come misura del progresso sociale. I sostenitori della decrescita argomentano che il PIL non riflette il benessere reale delle persone e che un\'economia orientata alla qualità della vita, alla sostenibilità ambientale e alla ridistribuzione delle risorse produrrebbe società più eque e resilienti.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Cosa contestano i sostenitori della decrescita?',
    options: [
      { label: 'La libertà di mercato', value: 'libertà di mercato' },
      { label: 'La crescita economica illimitata come misura del progresso', value: 'crescita illimitata come progresso' },
      { label: 'Il sistema democratico', value: 'sistema democratico' },
      { label: 'L\'innovazione tecnologica', value: 'innovazione' }
    ],
    correctAnswer: 'crescita illimitata come progresso', points: 2, orderIndex: 64, tags: ['economia', 'filosofia'], timeSuggested: 75
  },
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'La teoria dell\'attaccamento, formulata dallo psicologo John Bowlby, sostiene che la qualità del legame tra il bambino e la figura di riferimento nei primi anni di vita influenza profondamente lo sviluppo emotivo e relazionale dell\'individuo per tutta l\'esistenza. I bambini con un attaccamento sicuro tendono a sviluppare maggiore autostima, migliori competenze sociali e una maggiore capacità di gestire lo stress in età adulta.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Quali vantaggi hanno i bambini con attaccamento sicuro?',
    options: [
      { label: 'Migliori risultati scolastici', value: 'risultati scolastici' },
      { label: 'Maggiore autostima e migliori competenze sociali', value: 'autostima e competenze sociali' },
      { label: 'Maggiore intelligenza', value: 'intelligenza' },
      { label: 'Migliore salute fisica', value: 'salute fisica' }
    ],
    correctAnswer: 'autostima e competenze sociali', points: 2, orderIndex: 65, tags: ['psicologia'], timeSuggested: 75
  },
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'La complessità delle dinamiche geopolitiche contemporanee richiede un approccio multidisciplinare che integri prospettive economiche, culturali e strategiche.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Scrivi esattamente quello che senti.',
    correctAnswer: 'La complessità delle dinamiche geopolitiche contemporanee richiede un approccio multidisciplinare che integri prospettive economiche, culturali e strategiche.', points: 2, orderIndex: 66, tags: ['dettato'], timeSuggested: 90
  },
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Il fenomeno della fuga dei cervelli rappresenta una delle sfide più significative per l\'Italia contemporanea. Ogni anno, migliaia di giovani laureati e ricercatori altamente qualificati lasciano il Paese alla ricerca di migliori opportunità professionali e retributive all\'estero. Le cause principali includono la scarsità di investimenti nella ricerca, la rigidità del mercato del lavoro e il nepotismo che caratterizza molti ambienti accademici e professionali.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Quale causa della fuga dei cervelli è menzionata?',
    options: [
      { label: 'Il clima sfavorevole', value: 'clima' },
      { label: 'Il nepotismo negli ambienti accademici', value: 'nepotismo' },
      { label: 'La mancanza di università', value: 'mancanza università' },
      { label: 'L\'eccessiva tassazione', value: 'tassazione' }
    ],
    correctAnswer: 'nepotismo', points: 2, orderIndex: 67, tags: ['società', 'lavoro'], timeSuggested: 75
  },

  // C2 — Discorsi accademici, filosofici (68–72)
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Il concetto di "banalità del male", coniato dalla filosofa Hannah Arendt durante il processo ad Adolf Eichmann a Gerusalemme, suggerisce che le atrocità più devastanti non sono necessariamente perpetrate da individui intrinsecamente malvagi, ma da funzionari ordinari che eseguono ordini senza esercitare il pensiero critico. Arendt sostiene che l\'incapacità di pensare autonomamente, di mettersi nei panni dell\'altro e di giudicare le conseguenze delle proprie azioni costituisce una minaccia più insidiosa della malvagità deliberata.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Cosa intende Arendt con "banalità del male"?',
    options: [
      { label: 'Il male è sempre premeditato', value: 'premeditato' },
      { label: 'Le atrocità sono compiute da persone ordinarie che non esercitano pensiero critico', value: 'persone ordinarie senza pensiero critico' },
      { label: 'Il male non esiste veramente', value: 'non esiste' },
      { label: 'Solo i leader sono responsabili del male', value: 'solo leader' }
    ],
    correctAnswer: 'persone ordinarie senza pensiero critico', points: 2, orderIndex: 68, tags: ['filosofia', 'etica'], timeSuggested: 90
  },
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'La cosiddetta "svolta linguistica" nella filosofia del ventesimo secolo ha spostato il focus dell\'indagine filosofica dalla metafisica tradizionale all\'analisi del linguaggio. Wittgenstein, nella sua opera più tarda, abbandona l\'idea che il linguaggio sia uno specchio della realtà e propone invece il concetto di "giochi linguistici": il significato delle parole non risiede in un riferimento fisso al mondo, ma emerge dall\'uso che ne facciamo all\'interno di specifiche forme di vita.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Cosa sono i "giochi linguistici" per Wittgenstein?',
    options: [
      { label: 'Esercizi per imparare le lingue', value: 'esercizi' },
      { label: 'Il significato emerge dall\'uso delle parole in contesti specifici', value: 'significato dall\'uso in contesti' },
      { label: 'Strutture grammaticali universali', value: 'strutture universali' },
      { label: 'Giochi da tavolo basati sulle parole', value: 'giochi da tavolo' }
    ],
    correctAnswer: 'significato dall\'uso in contesti', points: 2, orderIndex: 69, tags: ['filosofia', 'linguistica'], timeSuggested: 90
  },
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Il paradosso di Fermi pone una domanda tanto semplice quanto destabilizzante: se l\'universo è così vasto e antico, e se le condizioni per la vita non sono eccezionalmente rare, dove sono tutti gli altri? La Grande Filtro è una delle risposte più inquietanti: suggerisce che esista un passaggio evolutivo così improbabile o così distruttivo che praticamente nessuna civiltà riesce a superarlo. La questione cruciale è se questo filtro si trovi nel nostro passato, il che significherebbe che siamo straordinariamente fortunati, o nel nostro futuro, il che implicherebbe una prognosi molto meno rassicurante per l\'umanità.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Perché il Grande Filtro nel futuro sarebbe preoccupante?',
    options: [
      { label: 'Significherebbe che l\'universo si sta contraendo', value: 'universo si contrae' },
      { label: 'Implicherebbe che l\'umanità potrebbe non sopravvivere', value: 'umanità potrebbe non sopravvivere' },
      { label: 'Significherebbe che gli alieni ci osservano', value: 'alieni ci osservano' },
      { label: 'Implicherebbe che la fisica è sbagliata', value: 'fisica sbagliata' }
    ],
    correctAnswer: 'umanità potrebbe non sopravvivere', points: 2, orderIndex: 70, tags: ['scienza', 'filosofia'], timeSuggested: 90
  },
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'La tensione irrisolta tra l\'imperativo della crescita economica e la necessità di preservare gli ecosistemi costituisce il dilemma centrale della nostra epoca.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Scrivi esattamente quello che senti.',
    correctAnswer: 'La tensione irrisolta tra l\'imperativo della crescita economica e la necessità di preservare gli ecosistemi costituisce il dilemma centrale della nostra epoca.', points: 2, orderIndex: 71, tags: ['dettato'], timeSuggested: 120
  },
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Il concetto di rizoma, elaborato da Deleuze e Guattari nell\'opera "Mille piani", propone un modello di pensiero alternativo alla struttura arborescente e gerarchica della tradizione filosofica occidentale. Nel rizoma non esiste un punto di origine privilegiato né una struttura verticale: ogni punto può connettersi con qualsiasi altro, creando una rete eterogenea e non gerarchica di relazioni. Questo modello ha trovato applicazione nell\'analisi delle reti digitali, della cultura contemporanea e delle strutture organizzative post-burocratiche.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Qual è la caratteristica principale del modello rizomatico?',
    options: [
      { label: 'Ha una struttura gerarchica chiara', value: 'gerarchica' },
      { label: 'Non ha punto di origine privilegiato e ogni punto si connette con ogni altro', value: 'nessun punto privilegiato, connessione totale' },
      { label: 'Si sviluppa solo in linea retta', value: 'linea retta' },
      { label: 'Ha un unico centro organizzativo', value: 'centro unico' }
    ],
    correctAnswer: 'nessun punto privilegiato, connessione totale', points: 2, orderIndex: 72, tags: ['filosofia'], timeSuggested: 90
  }
]
