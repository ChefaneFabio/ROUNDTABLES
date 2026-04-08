import { MultiSkillQuestionData } from '../types'

// Italian Sentence Transformation Questions — 10 questions
// Student reads the original sentence and rewrites it according to the instruction
// passage = the original sentence
// questionText = the transformation instruction
// correctAnswer = accepted version(s) pipe-separated

export const italianSentenceTransformationQuestions: MultiSkillQuestionData[] = [
  // ============================================================
  // A2 — Elementary (2 questions)
  // ============================================================
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Ho cominciato a studiare italiano tre anni fa.',
    questionText: 'Riscrivi la frase iniziando con: Studio italiano...',
    correctAnswer: 'Studio italiano da tre anni.',
    points: 1, orderIndex: 1, tags: ['presente', 'da/fa']
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Non è necessario portare il passaporto.',
    questionText: 'Riscrivi la frase usando: non dovete',
    correctAnswer: 'Non dovete portare il passaporto.|Non dovete portare il passaporto.',
    points: 1, orderIndex: 2, tags: ['modali', 'obbligo']
  },

  // ============================================================
  // B1 — Intermediate (3 questions)
  // ============================================================
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'La gente dice che lui è molto ricco.',
    questionText: 'Riscrivi la frase iniziando con: Si dice che...',
    correctAnswer: 'Si dice che lui sia molto ricco.|Si dice che sia molto ricco.',
    points: 1, orderIndex: 3, tags: ['si impersonale', 'congiuntivo']
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: '"Ti chiamerò domani," ha detto lei.',
    questionText: 'Riscrivi in discorso indiretto iniziando con: Lei ha detto che...',
    correctAnswer: 'Lei ha detto che mi avrebbe chiamato il giorno dopo.|Lei ha detto che l\'avrebbe chiamato il giorno dopo.',
    points: 1, orderIndex: 4, tags: ['discorso indiretto']
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Mi pento di non aver studiato di più.',
    questionText: 'Riscrivi la frase iniziando con: Magari...',
    correctAnswer: 'Magari avessi studiato di più!',
    points: 1, orderIndex: 5, tags: ['magari', 'congiuntivo trapassato']
  },

  // ============================================================
  // B2 — Upper Intermediate (3 questions)
  // ============================================================
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Credono che i ladri siano entrati dalla finestra sul retro.',
    questionText: 'Riscrivi la frase iniziando con: I ladri...',
    correctAnswer: 'I ladri si crede che siano entrati dalla finestra sul retro.|I ladri sarebbero entrati dalla finestra sul retro.',
    points: 1, orderIndex: 6, tags: ['forma passiva', 'si impersonale']
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Il film era così noioso che siamo usciti a metà.',
    questionText: 'Riscrivi la frase usando: talmente... che',
    correctAnswer: 'Il film era talmente noioso che siamo usciti a metà.',
    points: 1, orderIndex: 7, tags: ['così/talmente']
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Non mi ero reso conto dell\'importanza della riunione, perciò non ho partecipato.',
    questionText: 'Riscrivi la frase iniziando con: Se mi fossi...',
    correctAnswer: 'Se mi fossi reso conto dell\'importanza della riunione, avrei partecipato.',
    points: 1, orderIndex: 8, tags: ['periodo ipotetico terzo tipo']
  },

  // ============================================================
  // C1 — Advanced (2 questions)
  // ============================================================
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Non solo ha finito il rapporto, ma ha anche preparato la presentazione.',
    questionText: 'Riscrivi la frase iniziando con: Oltre ad aver...',
    correctAnswer: 'Oltre ad aver finito il rapporto, ha anche preparato la presentazione.|Oltre ad avere finito il rapporto, ha anche preparato la presentazione.',
    points: 1, orderIndex: 9, tags: ['oltre a', 'infinito passato']
  },
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'È possibile che lei abbia perso il treno.',
    questionText: 'Riscrivi la frase usando: potrebbe',
    correctAnswer: 'Lei potrebbe aver perso il treno.|Potrebbe aver perso il treno.',
    points: 1, orderIndex: 10, tags: ['condizionale', 'deduzione']
  },

  // ============================================================
  // NUOVE DOMANDE — 20 in più (orderIndex 11-30)
  // ============================================================

  // A2 (5 domande)
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Il libro è molto interessante.',
    questionText: 'Riscrivi usando: un libro così',
    correctAnswer: 'È un libro così interessante.|È un libro talmente interessante.',
    points: 1, orderIndex: 11, tags: ['così', 'aggettivi']
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Lei è più alta di suo fratello.',
    questionText: 'Riscrivi iniziando con: Suo fratello...',
    correctAnswer: 'Suo fratello è più basso di lei.|Suo fratello non è alto come lei.',
    points: 1, orderIndex: 12, tags: ['comparativo', 'inversione']
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Hanno costruito questa casa nel 1990.',
    questionText: 'Riscrivi alla forma passiva.',
    correctAnswer: 'Questa casa è stata costruita nel 1990.',
    points: 1, orderIndex: 13, tags: ['forma passiva', 'passato prossimo']
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'È vietato parcheggiare qui.',
    questionText: 'Riscrivi usando: non si deve',
    correctAnswer: 'Non si deve parcheggiare qui.|Qui non si deve parcheggiare.',
    points: 1, orderIndex: 14, tags: ['dovere', 'divieto']
  },
  {
    language: 'Italian', cefrLevel: 'A2', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Preferisco il tè al caffè.',
    questionText: 'Riscrivi usando: piuttosto',
    correctAnswer: 'Bevrei piuttosto tè che caffè.|Prenderei piuttosto il tè che il caffè.',
    points: 1, orderIndex: 15, tags: ['piuttosto', 'preferenza']
  },

  // B1 (5 domande)
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Qualcuno ha rubato il mio portafoglio ieri.',
    questionText: 'Riscrivi alla forma passiva.',
    correctAnswer: 'Il mio portafoglio è stato rubato ieri.',
    points: 1, orderIndex: 16, tags: ['forma passiva', 'passato prossimo']
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: '"Non toccate il quadro," ci ha detto la guardia.',
    questionText: 'Riscrivi in discorso indiretto iniziando con: La guardia ci ha detto...',
    correctAnswer: 'La guardia ci ha detto di non toccare il quadro.',
    points: 1, orderIndex: 17, tags: ['discorso indiretto', 'imperativo']
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'È possibile che siano a casa.',
    questionText: 'Riscrivi usando un avverbio.',
    correctAnswer: 'Forse sono a casa.|Probabilmente sono a casa.',
    points: 1, orderIndex: 18, tags: ['avverbio di modalità', 'possibilità']
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'È troppo giovane per guidare l\'auto.',
    questionText: 'Riscrivi usando: non è abbastanza... per',
    correctAnswer: 'Non è abbastanza grande per guidare l\'auto.',
    points: 1, orderIndex: 19, tags: ['troppo/abbastanza']
  },
  {
    language: 'Italian', cefrLevel: 'B1', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Ha iniziato a lavorare qui tre anni fa.',
    questionText: 'Riscrivi iniziando con: Lavora...',
    correctAnswer: 'Lavora qui da tre anni.',
    points: 1, orderIndex: 20, tags: ['da', 'durata']
  },

  // B2 (5 domande)
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'L\'ultima volta che l\'ho visto è stato nel 2019.',
    questionText: 'Riscrivi iniziando con: Non lo vedo...',
    correctAnswer: 'Non lo vedo dal 2019.',
    points: 1, orderIndex: 21, tags: ['passato prossimo', 'dal']
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Non siamo potuti andare in spiaggia perché pioveva.',
    questionText: 'Riscrivi iniziando con: Se non fosse...',
    correctAnswer: 'Se non fosse piovuto, saremmo potuti andare in spiaggia.|Se non avesse piovuto, saremmo potuti andare in spiaggia.',
    points: 1, orderIndex: 22, tags: ['periodo ipotetico terzo tipo']
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Si dice che l\'azienda chiuderà l\'anno prossimo.',
    questionText: 'Riscrivi iniziando con: L\'azienda...',
    correctAnswer: 'L\'azienda dovrebbe chiudere l\'anno prossimo.|L\'azienda chiuderebbe l\'anno prossimo.',
    points: 1, orderIndex: 23, tags: ['condizionale', 'diceria']
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Preferirei restare a casa piuttosto che andare alla festa.',
    questionText: 'Riscrivi usando: Invece di...',
    correctAnswer: 'Invece di andare alla festa, preferirei restare a casa.',
    points: 1, orderIndex: 24, tags: ['invece di', 'infinito']
  },
  {
    language: 'Italian', cefrLevel: 'B2', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Non ha studiato abbastanza, perciò non ha superato l\'esame.',
    questionText: 'Riscrivi iniziando con: Se avesse...',
    correctAnswer: 'Se avesse studiato abbastanza, avrebbe superato l\'esame.',
    points: 1, orderIndex: 25, tags: ['periodo ipotetico terzo tipo']
  },

  // C1 (5 domande)
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Non sapevo che fosse malata, perciò non l\'ho visitata.',
    questionText: 'Riscrivi iniziando con: Se avessi...',
    correctAnswer: 'Se avessi saputo che era malata, l\'avrei visitata.',
    points: 1, orderIndex: 26, tags: ['periodo ipotetico terzo tipo']
  },
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Il governo dovrebbe investire di più nelle energie rinnovabili.',
    questionText: 'Riscrivi usando: Sarebbe ora che...',
    correctAnswer: 'Sarebbe ora che il governo investisse di più nelle energie rinnovabili.',
    points: 1, orderIndex: 27, tags: ['sarebbe ora che', 'congiuntivo imperfetto']
  },
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Ha capito la verità solo dopo che lei era partita.',
    questionText: 'Riscrivi iniziando con: Solo dopo...',
    correctAnswer: 'Solo dopo la sua partenza ha capito la verità.|Solo dopo che lei era partita ha capito la verità.',
    points: 1, orderIndex: 28, tags: ['solo dopo', 'enfasi']
  },
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Non abbiamo mai vissuto una tempesta così violenta.',
    questionText: 'Riscrivi iniziando con: Mai...',
    correctAnswer: 'Mai abbiamo vissuto una tempesta così violenta.|Mai avevamo vissuto una tempesta così violenta.',
    points: 1, orderIndex: 29, tags: ['enfasi', 'mai']
  },
  {
    language: 'Italian', cefrLevel: 'C1', questionType: 'SENTENCE_TRANSFORMATION', skill: 'SENTENCE_TRANSFORMATION',
    passage: 'Si crede che l\'antica città sia stata distrutta da un terremoto.',
    questionText: 'Riscrivi iniziando con: L\'antica città...',
    correctAnswer: 'L\'antica città sarebbe stata distrutta da un terremoto.',
    points: 1, orderIndex: 30, tags: ['condizionale passato', 'supposizione']
  },
]
