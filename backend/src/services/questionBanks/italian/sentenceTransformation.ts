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
]
