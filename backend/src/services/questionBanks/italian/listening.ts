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
    ttsScript: 'Negli ultimi anni molte aziende hanno abbandonato la valutazione annuale a favore del feedback continuo: brevi conversazioni ogni due settimane tra il responsabile e il collaboratore. L\'idea non è parlare di più, ma parlare prima. Un piccolo aggiustamento a marzo evita che un problema diventi irreparabile a dicembre. Il cambiamento richiede però più impegno ai manager, che devono sviluppare capacità di ascolto attivo che spesso non hanno mai esercitato.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Qual è l\'obiettivo principale del feedback continuo?',
    options: [
      { label: 'Correggere piccoli problemi prima che diventino gravi', value: 'correggere prima che diventino gravi' },
      { label: 'Dare elogi più frequenti ai dipendenti', value: 'elogi frequenti' },
      { label: 'Sostituire il ruolo delle Risorse Umane', value: 'sostituire HR' },
      { label: 'Monitorare la produttività in tempo reale', value: 'monitorare produttività' }
    ],
    correctAnswer: 'correggere prima che diventino gravi', points: 3, orderIndex: 31, tags: ['lavoro', 'management'], timeSuggested: 75
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
    ttsScript: 'Le ricerche sulla retention dei talenti mostrano che i primi novanta giorni di un dipendente in azienda sono decisivi. In quel periodo si formano convinzioni che influenzeranno l\'impegno per anni: se restare o no, come comportarsi con i colleghi, quanto investire emotivamente sui progetti. Eppure molte organizzazioni limitano l\'onboarding alla prima settimana — consegna del computer, manuale, riunione con HR — e poi lasciano la nuova persona a sé stessa.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Perché i primi novanta giorni sono così importanti?',
    options: [
      { label: 'Si formano convinzioni che incidono sull\'impegno a lungo termine', value: 'convinzioni che incidono sull\'impegno' },
      { label: 'Perché la maggior parte delle dimissioni avviene nella prima settimana', value: 'dimissioni prima settimana' },
      { label: 'Perché le valutazioni di performance iniziano a 90 giorni', value: 'valutazioni a 90 giorni' },
      { label: 'Perché i permessi di lavoro scadono in quel periodo', value: 'permessi scadono' }
    ],
    correctAnswer: 'convinzioni che incidono sull\'impegno', points: 3, orderIndex: 33, tags: ['lavoro', 'HR'], timeSuggested: 75
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
    ttsScript: 'Il paradosso della collaborazione moderna è che più collaboriamo, meno lavoriamo davvero. Le ricerche sull\'uso del tempo mostrano che chi lavora con la conoscenza passa in media ventitré ore alla settimana in riunione: una cifra raddoppiata negli ultimi quindici anni. Le riunioni sono diventate il modo per dimostrare impegno, condividere responsabilità ed evitare di decidere da soli. Ma ogni ora in riunione è un\'ora sottratta al lavoro concentrato, e il costo del cambio di contesto dopo ogni incontro è ormai ben documentato.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Perché le riunioni si sono moltiplicate così tanto?',
    options: [
      { label: 'Servono a condividere responsabilità e a dimostrare impegno', value: 'condividere responsabilità e impegno' },
      { label: 'Perché sostituiscono completamente l\'email', value: 'sostituiscono email' },
      { label: 'Perché le aziende misurano il lavoro in ore di riunione', value: 'misurano in ore' },
      { label: 'Perché i dipendenti preferiscono lavorare in gruppo', value: 'preferenza gruppo' }
    ],
    correctAnswer: 'condividere responsabilità e impegno', points: 3, orderIndex: 36, tags: ['lavoro', 'management'], timeSuggested: 90
  },
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Quando un dipendente chiave si dimette, la reazione istintiva è la controfferta. I dati però mostrano che questa strategia funziona nel breve termine — la maggior parte accetta — ma due terzi se ne vanno comunque entro un anno. Il motivo è strutturale: la decisione di andarsene raramente riguarda i soldi. Riguarda la mancanza di prospettive di crescita, il conflitto con un responsabile, la sensazione di non essere valorizzati. La controfferta cura il sintomo, non la causa. Le aziende che trattengono i talenti investono in conversazioni molto prima che ci sia una lettera di dimissioni.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Perché la controfferta spesso fallisce?',
    options: [
      { label: 'Risolve il sintomo ma non la causa strutturale dell\'insoddisfazione', value: 'risolve sintomo non causa' },
      { label: 'Gli stipendi proposti sono insufficienti', value: 'stipendi bassi' },
      { label: 'Il dipendente chiede di più dopo pochi mesi', value: 'chiede di più' },
      { label: 'La legge non permette offerte retroattive', value: 'legge non permette' }
    ],
    correctAnswer: 'risolve sintomo non causa', points: 3, orderIndex: 37, tags: ['lavoro', 'retention'], timeSuggested: 90
  },
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'In una grande ricerca interna su cosa rende efficaci i team, Google ha individuato un fattore dominante: la sicurezza psicologica. Vale a dire, la sensazione di poter esprimere opinioni, ammettere errori o porre domande senza temere conseguenze professionali. I team con alta sicurezza psicologica producono più innovazione, imparano più rapidamente dagli sbagli e trattengono meglio le persone. Ma non si costruisce con le policy aziendali: si costruisce con quello che il responsabile dice quando qualcuno ammette un errore, e con quello che non dice quando c\'è un momento di silenzio.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Come si costruisce la sicurezza psicologica secondo il brano?',
    options: [
      { label: 'Con il comportamento quotidiano del responsabile, non con le policy', value: 'comportamento del responsabile' },
      { label: 'Con regolamenti aziendali sull\'etica', value: 'regolamenti etici' },
      { label: 'Formando i nuovi manager su tecniche di comunicazione', value: 'formando nuovi manager' },
      { label: 'Valutando gli errori con severità per evitarne il ripetersi', value: 'valutare errori con severità' }
    ],
    correctAnswer: 'comportamento del responsabile', points: 3, orderIndex: 38, tags: ['lavoro', 'team'], timeSuggested: 90
  },
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'Il vero indicatore del successo di un manager non è il numero di decisioni che prende ogni giorno, ma la qualità delle decisioni che i suoi collaboratori riescono a prendere in autonomia.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Scrivi esattamente quello che senti.',
    correctAnswer: 'Il vero indicatore del successo di un manager non è il numero di decisioni che prende ogni giorno, ma la qualità delle decisioni che i suoi collaboratori riescono a prendere in autonomia.', points: 3, orderIndex: 39, tags: ['dettato', 'lavoro'], timeSuggested: 120
  },
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Le ricerche sul lavoro cognitivo convergono su una verità controintuitiva: non è la durata del lavoro a limitare la produttività, ma la sua frammentazione. Ogni volta che passiamo da un compito all\'altro — una notifica, un messaggio in chat, una riunione imprevista — il cervello impiega tra i quindici e i venticinque minuti per recuperare pienamente il livello di concentrazione precedente. In una giornata tipica con trenta interruzioni, questo significa letteralmente che gran parte del tempo lavorato non produce valore. Alcune aziende hanno iniziato a introdurre blocchi protetti di due o tre ore senza riunioni.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Perché i blocchi di tempo protetti sono importanti?',
    options: [
      { label: 'Il cervello impiega lunghi minuti a recuperare concentrazione dopo ogni interruzione', value: 'recupero concentrazione lungo' },
      { label: 'Perché i dipendenti chiedono più pause', value: 'più pause' },
      { label: 'Perché le riunioni lunghe sono stancanti', value: 'riunioni stancanti' },
      { label: 'Perché le notifiche sono vietate dalla legge', value: 'notifiche vietate' }
    ],
    correctAnswer: 'recupero concentrazione lungo', points: 3, orderIndex: 40, tags: ['lavoro', 'produttività'], timeSuggested: 90
  },
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Dare feedback in un team internazionale è uno dei compiti più sottovalutati del management moderno. Quello che in alcune culture è considerato diretto e utile — segnalare un errore durante una riunione, per esempio — in altre culture viene letto come un attacco pubblico. È vero anche il contrario: un feedback che per una cultura è chiaro, per un\'altra è così morbido da non essere nemmeno percepito come critica. I responsabili più efficaci non adottano un unico stile: adattano la modalità di consegna al destinatario e verificano che il messaggio sia arrivato come previsto.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Cosa fa un manager efficace in un team internazionale?',
    options: [
      { label: 'Adatta lo stile del feedback e verifica che sia stato compreso', value: 'adatta stile e verifica' },
      { label: 'Usa sempre lo stile più diretto possibile', value: 'stile diretto' },
      { label: 'Delega il feedback alle HR locali', value: 'delega HR' },
      { label: 'Evita le conversazioni difficili', value: 'evita conversazioni' }
    ],
    correctAnswer: 'adatta stile e verifica', points: 3, orderIndex: 41, tags: ['lavoro', 'comunicazione interculturale'], timeSuggested: 90
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
    ttsScript: 'Il lavoro asincrono — comunicare per iscritto, senza aspettarsi una risposta immediata — è diventato la norma in molti team distribuiti. I vantaggi sono evidenti: persone in fusi orari diversi collaborano senza perdere il sonno, e scrivere costringe a un pensiero più chiaro rispetto alle riunioni improvvisate. C\'è però un costo: un messaggio scritto in fretta può perdere il tono e creare tensioni indesiderate. I team che funzionano bene investono tempo in regole di comunicazione esplicite: quando usare la chat, quando l\'email, quando il video.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Qual è uno svantaggio del lavoro asincrono?',
    options: [
      { label: 'Il tono può essere frainteso e creare tensioni', value: 'tono frainteso' },
      { label: 'Tutti devono essere online contemporaneamente', value: 'tutti online' },
      { label: 'I documenti non possono essere condivisi', value: 'documenti non condivisi' },
      { label: 'Le persone lavorano meno ore', value: 'meno ore' }
    ],
    correctAnswer: 'tono frainteso', points: 2, orderIndex: 63, tags: ['lavoro', 'comunicazione'], timeSuggested: 75
  },
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Il diritto alla disconnessione, già legge in alcuni paesi europei, stabilisce che un dipendente non è obbligato a leggere o rispondere a messaggi fuori dall\'orario di lavoro. Il principio sembra semplice, ma l\'applicazione è complessa: nei team internazionali, la sera per qualcuno è il mattino per qualcun altro, e molti responsabili non si rendono conto che stanno fissando un\'aspettativa implicita quando scrivono alle undici di sera. Alcune aziende hanno introdotto ritardi automatici: i messaggi inviati la sera vengono consegnati il mattino seguente.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Perché il diritto alla disconnessione è difficile da applicare nei team internazionali?',
    options: [
      { label: 'La sera per qualcuno è il mattino per qualcun altro', value: 'sera per uno mattino per altri' },
      { label: 'La legge cambia da paese a paese', value: 'legge diversa' },
      { label: 'I responsabili rifiutano di rispettarla', value: 'responsabili rifiutano' },
      { label: 'La tecnologia non lo permette', value: 'tecnologia non permette' }
    ],
    correctAnswer: 'sera per uno mattino per altri', points: 2, orderIndex: 64, tags: ['lavoro', 'work-life balance'], timeSuggested: 75
  },
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Il ruolo del manager moderno è profondamente cambiato. L\'epoca del responsabile che dava ordini e verificava l\'esecuzione è finita. Oggi i manager più efficaci agiscono come allenatori: fanno più domande di quante diano risposte, aiutano il collaboratore a trovare la soluzione da sé, e fanno crescere il talento attraverso la delega più che attraverso il controllo. È un cambio controintuitivo per chi è cresciuto in culture gerarchiche, e molti manager all\'inizio si sentono meno produttivi — fino a quando vedono il proprio team crescere.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Cosa caratterizza il manager moderno come allenatore?',
    options: [
      { label: 'Fa più domande di quante dia risposte', value: 'più domande che risposte' },
      { label: 'Controlla ogni passaggio del lavoro', value: 'controlla ogni passaggio' },
      { label: 'Lavora sempre fianco a fianco con il team', value: 'fianco a fianco' },
      { label: 'Decide senza consultare nessuno', value: 'decide senza consultare' }
    ],
    correctAnswer: 'più domande che risposte', points: 2, orderIndex: 65, tags: ['lavoro', 'management'], timeSuggested: 75
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

  // C2 — Discorsi su temi lavorativi avanzati (68–72)
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'L\'espressione "quiet quitting", diventata virale nel duemilaventidue, non descrive dimissioni vere ma un comportamento preciso: fare esattamente quello che è scritto nel contratto, né più né meno. Rifiutare di leggere email fuori orario, non offrirsi volontari, non investire emotivamente in progetti extra. Il fenomeno è letto in due modi opposti: come reazione sana al burnout diffuso, o come sintomo di una crisi più profonda dell\'engagement. I dati sono scomodi: in molte aziende la quota di dipendenti che si dichiara disingaggiata supera il sessanta per cento.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Come viene interpretato il fenomeno del quiet quitting?',
    options: [
      { label: 'O come reazione sana ai limiti, o come segno di disingaggio diffuso', value: 'sana o disingaggio' },
      { label: 'Come vere dimissioni di massa', value: 'dimissioni di massa' },
      { label: 'Come un fenomeno tipicamente generazionale', value: 'fenomeno generazionale' },
      { label: 'Come una strategia per ottenere un aumento', value: 'strategia aumento' }
    ],
    correctAnswer: 'sana o disingaggio', points: 2, orderIndex: 68, tags: ['lavoro', 'engagement'], timeSuggested: 90
  },
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Il lavoro ibrido è diventato il tema più divisivo nelle aziende dopo il duemilaventi. I dati sulla produttività sono contraddittori: alcuni studi rilevano un aumento, altri una diminuzione, a seconda del tipo di attività e di come viene gestita la transizione. Ma la domanda davvero interessante non è dove le persone lavorano, ma come vengono guidate. La modalità ibrida espone debolezze che l\'ufficio fisico nascondeva: responsabili che controllavano per presenza, processi che dipendevano da conversazioni casuali in corridoio, decisioni che escludevano chi non era nella stanza.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Perché la modalità ibrida è un banco di prova per la leadership?',
    options: [
      { label: 'Espone pratiche che funzionavano solo grazie alla presenza fisica', value: 'espone pratiche legate alla presenza' },
      { label: 'Costringe i responsabili a imparare nuove tecnologie', value: 'imparare tecnologie' },
      { label: 'Raddoppia le ore di lavoro effettive', value: 'raddoppia ore' },
      { label: 'Richiede più riunioni del lavoro in presenza', value: 'più riunioni' }
    ],
    correctAnswer: 'espone pratiche legate alla presenza', points: 2, orderIndex: 69, tags: ['lavoro', 'leadership'], timeSuggested: 90
  },
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Nelle organizzazioni di una certa dimensione, il problema più sottovalutato non è la mancanza di talento o di strategia: è l\'allineamento tra le funzioni. Le vendite promettono caratteristiche che il team di prodotto non ha previsto, il prodotto costruisce cose che il marketing non sa come posizionare, la finanza approva budget che le operazioni non riescono a eseguire. Ogni funzione opera in modo razionale presa da sola, ma la somma di razionalità individuali produce un\'organizzazione irrazionale. La soluzione non sono più riunioni o più report: sono conversazioni brevi e frequenti tra responsabili di funzione, con la libertà di mettere in discussione gli impegni senza perdere la faccia.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Qual è la causa strutturale del disallineamento tra funzioni?',
    options: [
      { label: 'Ogni funzione è razionale singolarmente ma la somma produce incoerenza', value: 'razionalità singola incoerenza globale' },
      { label: 'Le persone non leggono i report interni', value: 'non leggono report' },
      { label: 'L\'azienda non ha abbastanza manager', value: 'mancanza manager' },
      { label: 'La tecnologia non condivide i dati', value: 'tecnologia non condivide' }
    ],
    correctAnswer: 'razionalità singola incoerenza globale', points: 2, orderIndex: 70, tags: ['lavoro', 'organizzazione'], timeSuggested: 90
  },
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'La sostenibilità a lungo termine di un\'organizzazione dipende dalla sua capacità di bilanciare la pressione per i risultati a breve termine con investimenti che produrranno valore soltanto nel futuro.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Scrivi esattamente quello che senti.',
    correctAnswer: 'La sostenibilità a lungo termine di un\'organizzazione dipende dalla sua capacità di bilanciare la pressione per i risultati a breve termine con investimenti che produrranno valore soltanto nel futuro.', points: 2, orderIndex: 71, tags: ['dettato', 'lavoro'], timeSuggested: 120
  },
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Il modello della valutazione annuale — quella scala da uno a cinque con cui i responsabili classificavano i collaboratori — è entrato in crisi una decina di anni fa, e molte aziende l\'hanno abbandonato. Le ragioni sono documentate: i rating producono demotivazione in chi riceve voti bassi, sono influenzati da bias recenti (i manager ricordano gli ultimi tre mesi, non l\'anno intero) e creano competizione malsana tra colleghi. Quello che li sostituisce è più impegnativo: conversazioni di sviluppo frequenti, separate dalle decisioni sulla retribuzione, dove l\'obiettivo è la crescita, non la classificazione. Per il responsabile è più faticoso, ma produce risultati più duraturi.',
    ttsLanguageCode: 'it-IT',
    questionText: 'Perché le valutazioni annuali sono state abbandonate?',
    options: [
      { label: 'Distorcono i comportamenti e riflettono bias recenti più dell\'anno intero', value: 'distorcono e riflettono bias recenti' },
      { label: 'Sono troppo costose da implementare', value: 'costose' },
      { label: 'Il sindacato non le consente più', value: 'sindacato non consente' },
      { label: 'Sono illegali nella maggior parte dei paesi', value: 'illegali' }
    ],
    correctAnswer: 'distorcono e riflettono bias recenti', points: 2, orderIndex: 72, tags: ['lavoro', 'performance'], timeSuggested: 90
  },

  // ============================================================
  // VARIED SPOKEN CONTEXTS — 12 questions (orderIndex 73-84)
  // ============================================================

  // A1 — Varied Spoken Contexts
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    questionText: '[Segreteria telefonica] Ascolti un messaggio di un collega. A che ora è la riunione?',
    ttsScript: 'Ciao, sono Marco dell\'ufficio vendite. Ti chiamo per confermare la riunione di domani alle dieci. Per favore porta il documento. A domani!',
    ttsLanguageCode: 'it-IT',
    options: [{ label: '9:00', value: '9:00' }, { label: '10:00', value: '10:00' }, { label: '11:00', value: '11:00' }, { label: '14:00', value: '14:00' }],
    correctAnswer: '10:00', points: 1, orderIndex: 73, tags: ['segreteria', 'lavoro', 'register-varied'], timeSuggested: 30
  },
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    questionText: '[Annuncio aeroporto] Ascolti un annuncio in aeroporto. A quale gate devono andare i passeggeri?',
    ttsScript: 'Attenzione, passeggeri del volo Alitalia trecentoquindici per Barcellona. L\'imbarco è ora in corso al gate sedici. Si prega di recarsi immediatamente al gate sedici.',
    ttsLanguageCode: 'it-IT',
    options: [{ label: 'Gate 6', value: 'Gate 6' }, { label: 'Gate 15', value: 'Gate 15' }, { label: 'Gate 16', value: 'Gate 16' }, { label: 'Gate 3', value: 'Gate 3' }],
    correctAnswer: 'Gate 16', points: 1, orderIndex: 74, tags: ['aeroporto', 'annuncio', 'register-varied'], timeSuggested: 30
  },

  // A2 — Varied Spoken Contexts
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'LISTENING', skill: 'LISTENING',
    questionText: '[Prenotazione telefonica] Ascolti qualcuno prenotare al ristorante. Per quante persone?',
    ttsScript: 'Buonasera, vorrei prenotare un tavolo per sabato sera, per favore. Saremo in quattro, verso le venti. Avete qualcosa disponibile in terrazza?',
    ttsLanguageCode: 'it-IT',
    options: [{ label: '2 persone', value: '2 persone' }, { label: '4 persone', value: '4 persone' }, { label: '6 persone', value: '6 persone' }, { label: '8 persone', value: '8 persone' }],
    correctAnswer: '4 persone', points: 1, orderIndex: 75, tags: ['ristorante', 'prenotazione', 'register-varied'], timeSuggested: 40
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'LISTENING', skill: 'LISTENING',
    questionText: '[Messaggio per un cliente] Ascolti un messaggio lasciato a un cliente. Cosa vuole posticipare?',
    ttsScript: 'Buongiorno, sono la signora Bianchi della ditta Verdi e associati. La chiamo riguardo al nostro appuntamento di mercoledì. Purtroppo devo posticipare la consegna. Sarebbe possibile spostarla a venerdì pomeriggio? La prego di richiamarmi appena possibile.',
    ttsLanguageCode: 'it-IT',
    options: [{ label: 'Una riunione', value: 'Una riunione' }, { label: 'Una consegna', value: 'Una consegna' }, { label: 'Un pagamento', value: 'Un pagamento' }, { label: 'Una presentazione', value: 'Una presentazione' }],
    correctAnswer: 'Una consegna', points: 1, orderIndex: 76, tags: ['cliente', 'messaggio', 'register-varied'], timeSuggested: 40
  },

  // B1 — Varied Spoken Contexts
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'LISTENING', skill: 'LISTENING',
    questionText: '[Pubblicità radio] Ascolti una pubblicità alla radio. Cosa viene offerto?',
    ttsScript: 'Sogni di parlare inglese con sicurezza? Con LinguaPro, la scuola di lingue online numero uno in Italia, è possibile. Più di cinquantamila professionisti si fidano già di noi. Iscriviti questa settimana e ottieni il primo mese gratis! Visita linguapro punto it.',
    ttsLanguageCode: 'it-IT',
    options: [{ label: 'Un viaggio gratis', value: 'Un viaggio gratis' }, { label: 'Il primo mese gratis', value: 'Il primo mese gratis' }, { label: 'Uno sconto del 50%', value: 'Uno sconto del 50%' }, { label: 'Un libro gratis', value: 'Un libro gratis' }],
    correctAnswer: 'Il primo mese gratis', points: 1, orderIndex: 77, tags: ['radio', 'pubblicità', 'register-varied'], timeSuggested: 45
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'LISTENING', skill: 'LISTENING',
    questionText: '[Riunione d\'ufficio] Ascolti un estratto di una riunione di team. Qual è il problema principale?',
    ttsScript: 'Bene, prima di chiudere, vorrei affrontare la questione dei tempi del progetto Martini. Siamo attualmente in ritardo di due settimane, e il cliente si aspetta la prima consegna entro il quindici marzo. Dobbiamo ridistribuire le risorse. Qualche suggerimento?',
    ttsLanguageCode: 'it-IT',
    options: [{ label: 'Il budget è sforato', value: 'Il budget è sforato' }, { label: 'Il progetto è in ritardo', value: 'Il progetto è in ritardo' }, { label: 'Un dipendente si è dimesso', value: 'Un dipendente si è dimesso' }, { label: 'Il cliente è insoddisfatto', value: 'Il cliente è insoddisfatto' }],
    correctAnswer: 'Il progetto è in ritardo', points: 1, orderIndex: 78, tags: ['riunione', 'ufficio', 'register-varied'], timeSuggested: 45
  },

  // B2 — Varied Spoken Contexts
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'LISTENING', skill: 'LISTENING',
    questionText: '[Podcast] Ascolti un podcast sul cambio di carriera. Qual è il principale ostacolo secondo il relatore?',
    ttsScript: 'Quando accompagno le persone nella riconversione professionale, la cosa che le blocca di più non è la mancanza di competenze o qualifiche. È la paura. La paura dell\'ignoto, la paura dell\'instabilità finanziaria e, onestamente, la paura del giudizio degli altri. Una volta superato questo, tutto il resto si sistema da solo.',
    ttsLanguageCode: 'it-IT',
    options: [{ label: 'La mancanza di competenze', value: 'La mancanza di competenze' }, { label: 'I problemi finanziari', value: 'I problemi finanziari' }, { label: 'La paura', value: 'La paura' }, { label: 'La discriminazione per età', value: 'La discriminazione per età' }],
    correctAnswer: 'La paura', points: 2, orderIndex: 79, tags: ['podcast', 'carriera', 'register-varied'], timeSuggested: 60
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'LISTENING', skill: 'LISTENING',
    questionText: '[Notiziario] Ascolti un servizio sull\'economia. Cosa ha deciso la banca centrale?',
    ttsScript: 'Con una mossa ampiamente attesa, la Banca Centrale Europea ha annunciato un taglio dei tassi di interesse di un quarto di punto, portando il tasso di riferimento al tre virgola cinque per cento. Gli analisti ritengono che ciò rifletta una crescente preoccupazione per la crescita debole nella zona euro, in particolare nel settore manifatturiero.',
    ttsLanguageCode: 'it-IT',
    options: [{ label: 'Aumentare i tassi', value: 'Aumentare i tassi' }, { label: 'Tagliare i tassi', value: 'Tagliare i tassi' }, { label: 'Congelare i tassi', value: 'Congelare i tassi' }, { label: 'Eliminare i tassi', value: 'Eliminare i tassi' }],
    correctAnswer: 'Tagliare i tassi', points: 2, orderIndex: 80, tags: ['notiziario', 'economia', 'register-varied'], timeSuggested: 60
  },

  // C1 — Varied Spoken Contexts
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    questionText: '[Conferenza TED] Ascolti un estratto di conferenza sull\'innovazione. Secondo il relatore, qual è il vero motore dell\'innovazione?',
    ttsScript: 'Tendiamo a romanticizzare il genio solitario nel suo garage, ma i dati raccontano una storia molto diversa. L\'innovazione è fondamentalmente un fenomeno sociale. Prospera all\'intersezione di prospettive diverse, dove le idee si scontrano e si ricombinano. Il vero motore non è la genialità individuale, ma la densità e la qualità delle connessioni umane all\'interno di un ecosistema.',
    ttsLanguageCode: 'it-IT',
    options: [{ label: 'La genialità individuale', value: 'La genialità individuale' }, { label: 'Il finanziamento pubblico', value: 'Il finanziamento pubblico' }, { label: 'Le connessioni umane nell\'ecosistema', value: 'Le connessioni umane nell\'ecosistema' }, { label: 'La competizione tra aziende', value: 'La competizione tra aziende' }],
    correctAnswer: 'Le connessioni umane nell\'ecosistema', points: 2, orderIndex: 81, tags: ['conferenza TED', 'innovazione', 'register-varied'], timeSuggested: 75
  },
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    questionText: '[Lezione universitaria] Ascolti un estratto di una lezione. Quale concetto spiega il professore?',
    ttsScript: 'Ciò che osserviamo nella letteratura è un passaggio dal modello tradizionale di causalità lineare a quello che gli studiosi chiamano ormai causalità circolare. In altre parole, l\'effetto retroagisce sulla causa, creando un ciclo che si auto-rinforza. Questo è particolarmente evidente nei sistemi climatici, dove il riscaldamento degli oceani libera più anidride carbonica, che a sua volta accelera il riscaldamento.',
    ttsLanguageCode: 'it-IT',
    options: [{ label: 'Causalità lineare', value: 'Causalità lineare' }, { label: 'Causalità circolare', value: 'Causalità circolare' }, { label: 'Variazione casuale', value: 'Variazione casuale' }, { label: 'Equilibrio statico', value: 'Equilibrio statico' }],
    correctAnswer: 'Causalità circolare', points: 2, orderIndex: 82, tags: ['lezione', 'accademico', 'register-varied'], timeSuggested: 75
  },

  // C2 — Varied Spoken Contexts
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    questionText: '[Dibattito filosofico] Ascolti un estratto di un dibattito. Quale posizione difende il relatore?',
    ttsScript: 'Sostengo che il realismo morale non sia soltanto difendibile, ma necessario. Se ammettiamo che le verità etiche sono puramente costruite, allora non abbiamo alcun fondamento su cui condannare le atrocità. L\'atto stesso dell\'indignazione morale presuppone l\'esistenza di standard oggettivi rispetto ai quali le azioni possono essere misurate, indipendentemente dal consenso culturale.',
    ttsLanguageCode: 'it-IT',
    options: [{ label: 'Relativismo morale', value: 'Relativismo morale' }, { label: 'Realismo morale', value: 'Realismo morale' }, { label: 'Nichilismo', value: 'Nichilismo' }, { label: 'Utilitarismo', value: 'Utilitarismo' }],
    correctAnswer: 'Realismo morale', points: 2, orderIndex: 83, tags: ['dibattito', 'filosofia', 'register-varied'], timeSuggested: 90
  },
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    questionText: '[Commento satirico] Ascolti un commento satirico. Cosa viene realmente criticato?',
    ttsScript: 'E nelle notizie di oggi, una multinazionale ha generosamente promesso di raggiungere la neutralità carbonica entro il duemilasettantacinque, giusto in tempo per la morte termica dell\'universo. L\'amministratore delegato ha rassicurato gli azionisti che, sebbene i profitti a breve termine rimangano la priorità assoluta, l\'azienda è profondamente impegnata nella sostenibilità, a patto che non costi nulla.',
    ttsLanguageCode: 'it-IT',
    options: [{ label: 'Le normative ambientali', value: 'Le normative ambientali' }, { label: 'Il greenwashing aziendale', value: 'Il greenwashing aziendale' }, { label: 'L\'inazione del governo', value: 'L\'inazione del governo' }, { label: 'Il comportamento dei consumatori', value: 'Il comportamento dei consumatori' }],
    correctAnswer: 'Il greenwashing aziendale', points: 2, orderIndex: 84, tags: ['satira', 'commento', 'register-varied'], timeSuggested: 90
  },

  // ============================================================
  // DIALOGHI QUOTIDIANI — aggiunti su feedback Maka (voce robotica
  // monotona, no dialoghi). Due interlocutori con marker SPEAKER_A/B
  // attivano il parser di TtsService che ruota voci maschili/femminili.
  // Temi everyday + work-life (no filosofia / politica / scienza specialistica).
  // ============================================================

  // ---- A1 dialoghi ----
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Buongiorno, vorrei un caffè per favore.
SPEAKER_B: Certo. Piccolo o grande?
SPEAKER_A: Piccolo, grazie. Quanto costa?
SPEAKER_B: Un euro e venti.`,
    ttsLanguageCode: 'it-IT',
    questionText: 'Quanto costa il caffè?',
    options: [{ label: '1,00 euro', value: '1,00' }, { label: '1,20 euro', value: '1,20' }, { label: '1,50 euro', value: '1,50' }, { label: '2,00 euro', value: '2,00' }],
    correctAnswer: '1,20', points: 1, orderIndex: 85, tags: ['dialogo', 'caffè', 'everyday'], timeSuggested: 40
  },
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Buongiorno. A che ora aprite domani?
SPEAKER_B: Apriamo alle nove di mattina.
SPEAKER_A: E quando chiudete?
SPEAKER_B: Alle sette di sera.`,
    ttsLanguageCode: 'it-IT',
    questionText: 'A che ora apre il negozio?',
    options: [{ label: 'Alle 7', value: '7' }, { label: 'Alle 8', value: '8' }, { label: 'Alle 9', value: '9' }, { label: 'Alle 10', value: '10' }],
    correctAnswer: '9', points: 1, orderIndex: 86, tags: ['dialogo', 'negozio', 'everyday'], timeSuggested: 40
  },
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Dove possiamo vederci sabato?
SPEAKER_B: Vediamoci al bar vicino al parco.
SPEAKER_A: A che ora?
SPEAKER_B: Alle tre del pomeriggio.`,
    ttsLanguageCode: 'it-IT',
    questionText: 'Dove si vogliono incontrare?',
    options: [{ label: 'Al parco', value: 'parco' }, { label: 'Al bar', value: 'bar' }, { label: 'Al cinema', value: 'cinema' }, { label: 'In ufficio', value: 'ufficio' }],
    correctAnswer: 'bar', points: 1, orderIndex: 87, tags: ['dialogo', 'piani', 'everyday'], timeSuggested: 40
  },
  {
    language: 'Italian', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Un biglietto per il centro, per favore.
SPEAKER_B: Solo andata o andata e ritorno?
SPEAKER_A: Solo andata.
SPEAKER_B: Sono due euro.`,
    ttsLanguageCode: 'it-IT',
    questionText: 'Quanto costa il biglietto?',
    options: [{ label: '1 euro', value: '1' }, { label: '2 euro', value: '2' }, { label: '3 euro', value: '3' }, { label: '4 euro', value: '4' }],
    correctAnswer: '2', points: 1, orderIndex: 88, tags: ['dialogo', 'trasporti', 'everyday'], timeSuggested: 40
  },

  // ---- A2 dialoghi ----
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Sei libero questo fine settimana? C'è un film nuovo al cinema.
SPEAKER_B: Sabato sono occupato, ma domenica va bene.
SPEAKER_A: Perfetto. Andiamo domenica pomeriggio?
SPEAKER_B: Va bene, ci vediamo allora.`,
    ttsLanguageCode: 'it-IT',
    questionText: 'Quando andranno al cinema?',
    options: [{ label: 'Sabato mattina', value: 'sab-mat' }, { label: 'Sabato sera', value: 'sab-sera' }, { label: 'Domenica pomeriggio', value: 'dom-pom' }, { label: 'Domenica sera', value: 'dom-sera' }],
    correctAnswer: 'dom-pom', points: 1, orderIndex: 89, tags: ['dialogo', 'piani', 'everyday'], timeSuggested: 45
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Buongiorno, vorrei prenotare un tavolo per due.
SPEAKER_B: Per quando, signore?
SPEAKER_A: Venerdì sera alle otto, se possibile.
SPEAKER_B: Va bene. Posso avere un nome per la prenotazione?`,
    ttsLanguageCode: 'it-IT',
    questionText: 'Per quante persone è la prenotazione?',
    options: [{ label: 'Una', value: '1' }, { label: 'Due', value: '2' }, { label: 'Tre', value: '3' }, { label: 'Quattro', value: '4' }],
    correctAnswer: '2', points: 1, orderIndex: 90, tags: ['dialogo', 'ristorante', 'everyday'], timeSuggested: 45
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Ciao, sono nuova in azienda. Lavoro nel team marketing.
SPEAKER_B: Benvenuta! Io sono in commerciale. Vieni, ti faccio conoscere il team.
SPEAKER_A: Grazie mille. Da quanto tempo lavori qui?
SPEAKER_B: Sono qui da circa tre anni.`,
    ttsLanguageCode: 'it-IT',
    questionText: 'In quale reparto lavora la nuova collega?',
    options: [{ label: 'Commerciale', value: 'commerciale' }, { label: 'Marketing', value: 'marketing' }, { label: 'Risorse umane', value: 'hr' }, { label: 'IT', value: 'it' }],
    correctAnswer: 'marketing', points: 1, orderIndex: 91, tags: ['dialogo', 'ufficio', 'work-life'], timeSuggested: 45
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Scusi, come arrivo alla stazione?
SPEAKER_B: Vada dritto per due isolati, poi giri a sinistra.
SPEAKER_A: A sinistra dopo due isolati. Quanto ci vuole a piedi?
SPEAKER_B: Circa dieci minuti.`,
    ttsLanguageCode: 'it-IT',
    questionText: 'Quanto tempo ci vuole a piedi?',
    options: [{ label: '5 minuti', value: '5' }, { label: '10 minuti', value: '10' }, { label: '15 minuti', value: '15' }, { label: '20 minuti', value: '20' }],
    correctAnswer: '10', points: 1, orderIndex: 92, tags: ['dialogo', 'indicazioni', 'everyday'], timeSuggested: 45
  },

  // ---- B1 dialoghi ----
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Allora, vedo che hai esperienza nel servizio clienti. Cosa ti ha attratto di questa posizione?
SPEAKER_B: Sono interessato a passare a un ruolo più strategico. Qui potrei usare le mie competenze analitiche oltre alla comunicazione.
SPEAKER_A: Capisco. Come gestiresti un cliente molto insoddisfatto?
SPEAKER_B: Lo ascolterei con attenzione, riconoscerei il problema e cercherei una soluzione concreta entro la fine della giornata.`,
    ttsLanguageCode: 'it-IT',
    questionText: 'Perché il candidato vuole questa posizione?',
    options: [{ label: 'Per uno stipendio più alto', value: 'stipendio' }, { label: 'Per un ruolo più strategico', value: 'strategico' }, { label: 'Per lavorare da remoto', value: 'remoto' }, { label: 'Per cambiare città', value: 'città' }],
    correctAnswer: 'strategico', points: 1, orderIndex: 93, tags: ['dialogo', 'colloquio', 'work-life'], timeSuggested: 60
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Vorrei prenotare una camera per tre notti, dal quindici al diciotto marzo.
SPEAKER_B: Per quante persone?
SPEAKER_A: Due adulti. Avete camere con vista sul mare?
SPEAKER_B: Sì, abbiamo una doppia con vista a centosessanta euro a notte. Colazione inclusa.`,
    ttsLanguageCode: 'it-IT',
    questionText: 'Quanto costa la camera per notte?',
    options: [{ label: '140 euro', value: '140' }, { label: '150 euro', value: '150' }, { label: '160 euro', value: '160' }, { label: '180 euro', value: '180' }],
    correctAnswer: '160', points: 1, orderIndex: 94, tags: ['dialogo', 'hotel', 'everyday'], timeSuggested: 60
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Buongiorno dottoressa. Ho mal di gola da tre giorni e mi sento debole.
SPEAKER_B: Ha avuto febbre?
SPEAKER_A: Sì, ieri ho avuto trentotto e mezzo. Oggi è scesa.
SPEAKER_B: Le prescrivo un antibiotico per sette giorni. Prenda due compresse al giorno dopo i pasti.`,
    ttsLanguageCode: 'it-IT',
    questionText: 'Per quanti giorni deve prendere l\'antibiotico?',
    options: [{ label: '3 giorni', value: '3' }, { label: '5 giorni', value: '5' }, { label: '7 giorni', value: '7' }, { label: '10 giorni', value: '10' }],
    correctAnswer: '7', points: 1, orderIndex: 95, tags: ['dialogo', 'medico', 'everyday'], timeSuggested: 60
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: La riunione di domani è stata spostata alle dieci. Riusciresti a venire?
SPEAKER_B: Alle dieci ho una call con il cliente di Milano. Posso unirmi dopo?
SPEAKER_A: Inizia tu in ritardo, va bene. Manderemo i punti principali nel canale Slack.
SPEAKER_B: Perfetto, grazie. Cercherò di arrivare entro le dieci e trenta.`,
    ttsLanguageCode: 'it-IT',
    questionText: 'Perché il collega arriverà in ritardo?',
    options: [{ label: 'Ha un altro impegno', value: 'altro' }, { label: 'Il treno è in ritardo', value: 'treno' }, { label: 'È malato', value: 'malato' }, { label: 'Si è dimenticato', value: 'dimenticato' }],
    correctAnswer: 'altro', points: 1, orderIndex: 96, tags: ['dialogo', 'riunione', 'work-life'], timeSuggested: 60
  },

  // ---- B2 dialoghi ----
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Il cliente ha anticipato la deadline al venerdì. Riusciamo a consegnare in tempo?
SPEAKER_B: Sarà stretta. Sviluppo finisce mercoledì, QA ha bisogno di almeno due giorni completi.
SPEAKER_A: Possiamo ridurre lo scope? La parte di reporting può aspettare.
SPEAKER_B: Sì, se rimandiamo il reporting alla prossima release, ce la facciamo. Avviso il PM.`,
    ttsLanguageCode: 'it-IT',
    questionText: 'Come faranno a rispettare la nuova deadline?',
    options: [{ label: 'Lavorando di notte', value: 'notte' }, { label: 'Rimandando una funzionalità', value: 'rimandando' }, { label: 'Aggiungendo persone al team', value: 'persone' }, { label: 'Chiedendo una proroga', value: 'proroga' }],
    correctAnswer: 'rimandando', points: 1, orderIndex: 97, tags: ['dialogo', 'progetto', 'work-life'], timeSuggested: 75
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Buongiorno, vorrei un rimborso. Il prodotto che ho ricevuto è difettoso.
SPEAKER_B: Mi dispiace. Ha la ricevuta e una foto del difetto?
SPEAKER_A: Sì, le ho già inviate per email tre giorni fa, ma nessuno mi ha ancora risposto.
SPEAKER_B: Verifico subito. Le confermo: posso autorizzare il rimborso completo entro oggi.`,
    ttsLanguageCode: 'it-IT',
    questionText: 'Cosa fa l\'operatore alla fine?',
    options: [{ label: 'Rifiuta il rimborso', value: 'rifiuta' }, { label: 'Chiede altri documenti', value: 'documenti' }, { label: 'Autorizza il rimborso completo', value: 'autorizza' }, { label: 'Trasferisce la chiamata', value: 'trasferisce' }],
    correctAnswer: 'autorizza', points: 1, orderIndex: 98, tags: ['dialogo', 'reclamo', 'work-life'], timeSuggested: 75
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Vorrei discutere il mio pacchetto retributivo per il prossimo anno.
SPEAKER_B: Certo. Sappi che il budget è limitato, ma sono disponibile ad ascoltare.
SPEAKER_A: Negli ultimi mesi ho preso in carico due nuovi progetti e ho gestito il team durante l'assenza del responsabile. Cerco un riconoscimento di questo.
SPEAKER_B: Hai ragione, il tuo contributo è cresciuto. Posso offrire un aumento del sei percento più un bonus variabile legato ai risultati.`,
    ttsLanguageCode: 'it-IT',
    questionText: 'Cosa offre il manager?',
    options: [{ label: 'Solo un bonus una tantum', value: 'bonus' }, { label: 'Solo un aumento di stipendio', value: 'aumento' }, { label: 'Aumento più bonus variabile', value: 'entrambi' }, { label: 'Una promozione', value: 'promozione' }],
    correctAnswer: 'entrambi', points: 1, orderIndex: 99, tags: ['dialogo', 'negoziazione', 'work-life'], timeSuggested: 75
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Allora, come è andato il corso di formazione la scorsa settimana?
SPEAKER_B: I contenuti erano utili, ma il ritmo era troppo veloce per chi parte da zero.
SPEAKER_A: Hai qualche suggerimento concreto?
SPEAKER_B: Sì. Aggiungerei una sessione introduttiva opzionale prima del modulo avanzato, così tutti partono dalla stessa base.`,
    ttsLanguageCode: 'it-IT',
    questionText: 'Cosa suggerisce il dipendente?',
    options: [{ label: 'Cambiare formatore', value: 'formatore' }, { label: 'Una sessione introduttiva opzionale', value: 'introduttiva' }, { label: 'Allungare la durata totale', value: 'allungare' }, { label: 'Eliminare il modulo avanzato', value: 'eliminare' }],
    correctAnswer: 'introduttiva', points: 1, orderIndex: 100, tags: ['dialogo', 'formazione', 'work-life'], timeSuggested: 75
  },

  // ---- C1 dialoghi ----
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Stiamo perdendo quote di mercato nel segmento giovani. Le opzioni sul tavolo sono due: una campagna social aggressiva oppure rivedere il prodotto.
SPEAKER_B: La campagna ci darebbe visibilità immediata, ma se il prodotto non risponde alle aspettative bruciamo il budget e basta.
SPEAKER_A: Quindi proponi di partire dalla revisione del prodotto?
SPEAKER_B: Esatto. Tre mesi di test su un panel ridotto, e poi il marketing arriva di conseguenza con un messaggio credibile.`,
    ttsLanguageCode: 'it-IT',
    questionText: 'Su cosa è d\'accordo SPEAKER_B?',
    options: [{ label: 'Lanciare subito la campagna social', value: 'social' }, { label: 'Aumentare il budget marketing', value: 'budget' }, { label: 'Rivedere prima il prodotto', value: 'prodotto' }, { label: 'Abbandonare il segmento giovani', value: 'abbandonare' }],
    correctAnswer: 'prodotto', points: 2, orderIndex: 101, tags: ['dialogo', 'strategia', 'work-life'], timeSuggested: 90
  },
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Guardando l'anno appena chiuso, hai centrato tre obiettivi su quattro. Ottimo lavoro sul progetto Alfa.
SPEAKER_B: Grazie. L'unico obiettivo che non ho centrato è stata la riduzione dei tempi di risposta del team.
SPEAKER_A: Sì, e voglio essere onesto: quel risultato dipendeva anche da risorse che non ti abbiamo dato. Non lo conto contro di te.
SPEAKER_B: Lo apprezzo. Per il prossimo anno vorrei farmi carico io della pianificazione delle risorse, così posso gestire meglio le aspettative.`,
    ttsLanguageCode: 'it-IT',
    questionText: 'Qual è la posizione del manager sull\'obiettivo non centrato?',
    options: [{ label: 'Conta interamente come un fallimento', value: 'fallimento' }, { label: 'Lo attribuisce alla mancanza di risorse', value: 'risorse' }, { label: 'Vuole sostituire il dipendente', value: 'sostituire' }, { label: 'Riduce lo stipendio', value: 'stipendio' }],
    correctAnswer: 'risorse', points: 2, orderIndex: 102, tags: ['dialogo', 'review', 'work-life'], timeSuggested: 90
  },
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: La proposta di contratto ci ha lasciato perplessi sulla clausola di esclusiva, è davvero estesa.
SPEAKER_B: Capisco. È una clausola standard nei nostri accordi enterprise, però possiamo restringerla al settore in cui operate direttamente.
SPEAKER_A: Restringerla geograficamente all'Europa potrebbe funzionare per noi.
SPEAKER_B: Combiniamo le due: esclusiva limitata al vostro settore principale e al mercato europeo, per la durata del primo anno.`,
    ttsLanguageCode: 'it-IT',
    questionText: 'Su cosa si accordano alla fine?',
    options: [{ label: 'Eliminare l\'esclusiva', value: 'elimina' }, { label: 'Esclusiva mondiale per tutti i settori', value: 'mondiale' }, { label: 'Esclusiva limitata a settore + Europa per un anno', value: 'limitata' }, { label: 'Rimandare la decisione', value: 'rimanda' }],
    correctAnswer: 'limitata', points: 2, orderIndex: 103, tags: ['dialogo', 'contratto', 'work-life'], timeSuggested: 90
  },
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Dai dati del primo trimestre vediamo una crescita del fatturato del dodici percento, ma il margine è calato.
SPEAKER_B: Sì, perché abbiamo investito molto nell'acquisizione clienti. È una scelta voluta.
SPEAKER_A: Quando ci aspettiamo che il margine torni in linea con l'anno scorso?
SPEAKER_B: Entro il quarto trimestre, una volta che la base clienti ricorrenti coprirà i costi fissi.`,
    ttsLanguageCode: 'it-IT',
    questionText: 'Quando il margine dovrebbe normalizzarsi?',
    options: [{ label: 'Nel secondo trimestre', value: 'q2' }, { label: 'Nel terzo trimestre', value: 'q3' }, { label: 'Nel quarto trimestre', value: 'q4' }, { label: 'L\'anno prossimo', value: 'anno-prossimo' }],
    correctAnswer: 'q4', points: 2, orderIndex: 104, tags: ['dialogo', 'finanza', 'work-life'], timeSuggested: 90
  },

  // ---- C2 dialoghi ----
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: La diligenza ha sollevato due aree problematiche: una contingenza fiscale ancora aperta e una dipendenza tecnologica concentrata.
SPEAKER_B: La contingenza fiscale possiamo affrontarla con un escrow dedicato. Sulla parte tecnologica, mi preoccupa di più: dipendiamo da un singolo fornitore senza piano di uscita.
SPEAKER_A: Potremmo subordinare il prezzo alla rinegoziazione di quel contratto entro sei mesi dal closing.
SPEAKER_B: Funziona, ma vorrei aggiungere una clausola di earn-out: se non rinegoziamo, una quota del corrispettivo viene trattenuta.`,
    ttsLanguageCode: 'it-IT',
    questionText: 'Cosa propone SPEAKER_B per il rischio tecnologico?',
    options: [{ label: 'Annullare la transazione', value: 'annulla' }, { label: 'Solo un escrow', value: 'escrow' }, { label: 'Una clausola di earn-out condizionata', value: 'earn-out' }, { label: 'Aumentare il prezzo', value: 'aumenta' }],
    correctAnswer: 'earn-out', points: 2, orderIndex: 105, tags: ['dialogo', 'M&A', 'work-life'], timeSuggested: 100
  },
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Il mercato premia sempre più le aziende capaci di scalare senza diluire la cultura. Voi come ci riuscite?
SPEAKER_B: Onestamente, non ci riusciamo del tutto. Cresciamo del trenta percento all'anno, e ogni nuova ondata di assunzioni cambia il tessuto interno.
SPEAKER_A: Quali contromisure avete adottato?
SPEAKER_B: Una struttura di mentorship a cascata e una soglia mensile di assunzioni — preferiamo perdere candidati che diluire i valori. Non è scalabile all'infinito, ma per ora regge.`,
    ttsLanguageCode: 'it-IT',
    questionText: 'Cosa ammette SPEAKER_B?',
    options: [{ label: 'Che la cultura aziendale è perfetta', value: 'perfetta' }, { label: 'Che la loro soluzione ha dei limiti', value: 'limiti' }, { label: 'Che non gli interessa la cultura', value: 'no-cultura' }, { label: 'Che assumeranno di meno l\'anno prossimo', value: 'meno' }],
    correctAnswer: 'limiti', points: 2, orderIndex: 106, tags: ['dialogo', 'leadership', 'work-life'], timeSuggested: 100
  },
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Ho letto il tuo report sul progetto e c'è qualcosa che non torna. I dati sulla customer retention sembrano selezionati.
SPEAKER_B: Hai ragione, ho escluso la coorte di gennaio perché aveva una promozione anomala.
SPEAKER_A: Capisco la logica, ma escluderla senza segnalarlo nel report mette in dubbio l'intera analisi.
SPEAKER_B: Hai ragione. Lo riscrivo includendo entrambe le visualizzazioni e una nota metodologica chiara.`,
    ttsLanguageCode: 'it-IT',
    questionText: 'Qual è il problema sollevato?',
    options: [{ label: 'I dati sono falsi', value: 'falsi' }, { label: 'L\'esclusione di dati non è dichiarata', value: 'esclusione' }, { label: 'Il report è troppo lungo', value: 'lungo' }, { label: 'I numeri sono troppo bassi', value: 'bassi' }],
    correctAnswer: 'esclusione', points: 2, orderIndex: 107, tags: ['dialogo', 'feedback', 'work-life'], timeSuggested: 100
  },
  {
    language: 'Italian', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: La nuova normativa europea sulla protezione dei dati impone audit trimestrali per i fornitori critici.
SPEAKER_B: Significa che dovremo rivedere tutti i contratti in essere. Quanto tempo abbiamo?
SPEAKER_A: La compliance è obbligatoria dal primo gennaio, quindi sei mesi.
SPEAKER_B: Ok, proporrò una task force congiunta con il team legale e il vendor management. Devo darti un piano dettagliato entro fine mese?`,
    ttsLanguageCode: 'it-IT',
    questionText: 'Quanto tempo hanno per essere conformi?',
    options: [{ label: 'Tre mesi', value: '3-mesi' }, { label: 'Sei mesi', value: '6-mesi' }, { label: 'Un anno', value: '1-anno' }, { label: 'Due anni', value: '2-anni' }],
    correctAnswer: '6-mesi', points: 2, orderIndex: 108, tags: ['dialogo', 'compliance', 'work-life'], timeSuggested: 100
  },
]
