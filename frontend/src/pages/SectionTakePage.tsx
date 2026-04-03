import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { assessmentApi, AssessmentSection } from '../services/assessmentApi'
import { SectionTimer } from '../components/assessment/SectionTimer'
import { ReadingQuestion } from '../components/assessment/ReadingQuestion'
import { ListeningQuestion } from '../components/assessment/ListeningQuestion'
import { WritingQuestion } from '../components/assessment/WritingQuestion'
import { SpeakingQuestion } from '../components/assessment/SpeakingQuestion'
import { ErrorCorrectionQuestion } from '../components/assessment/ErrorCorrectionQuestion'
import { SentenceTransformationQuestion } from '../components/assessment/SentenceTransformationQuestion'

const SKILL_LABELS: Record<string, string> = {
  GRAMMAR: 'Grammar', VOCABULARY: 'Vocabulary', READING: 'Reading & Language Use',
  ERROR_CORRECTION: 'Error Correction', SENTENCE_TRANSFORMATION: 'Sentence Transformation',
  WRITING: 'Writing', LISTENING: 'Listening', SPEAKING: 'Speaking'
}

const SECTION_INSTRUCTIONS: Record<string, { en: string[]; it: string[] }> = {
  READING: {
    en: [
      'This section includes reading comprehension, grammar, vocabulary, and language structure questions.',
      'Read each passage or question carefully before selecting your answer.',
      'Some questions may ask you to correct errors or transform sentences.',
      'You cannot go back to previous questions.',
    ],
    it: [
      'Questa sezione include comprensione del testo, grammatica, vocabolario e strutture linguistiche.',
      'Leggi attentamente ogni brano o domanda prima di selezionare la risposta.',
      'Alcune domande potrebbero chiederti di correggere errori o trasformare frasi.',
      'Non puoi tornare alle domande precedenti.',
    ],
  },
  LISTENING: {
    en: [
      'You will listen to audio clips and answer questions.',
      'You can play each audio up to 2 times.',
      'Make sure your speakers or headphones are working before starting.',
      'You cannot go back to previous questions.',
    ],
    it: [
      'Ascolterai clip audio e risponderai alle domande.',
      'Puoi riprodurre ogni audio fino a 2 volte.',
      'Assicurati che gli altoparlanti o le cuffie funzionino prima di iniziare.',
      'Non puoi tornare alle domande precedenti.',
    ],
  },
  WRITING: {
    en: [
      'You will write responses to prompts in the target language.',
      'Write clearly and completely. Spelling and grammar matter.',
      'Your writing will be evaluated by AI and may be reviewed by a teacher.',
      'Take your time to plan before writing.',
    ],
    it: [
      'Scriverai risposte a tracce nella lingua di destinazione.',
      'Scrivi in modo chiaro e completo. Ortografia e grammatica contano.',
      'La tua scrittura sara valutata dall\'AI e potrebbe essere rivista da un insegnante.',
      'Prenditi il tempo per pianificare prima di scrivere.',
    ],
  },
  SPEAKING: {
    en: [
      'You will record spoken responses using your microphone.',
      'Make sure your microphone is working and you are in a quiet environment.',
      'You get up to 2 recording attempts per question.',
      'Speak clearly and at a natural pace.',
    ],
    it: [
      'Registrerai risposte parlate usando il microfono.',
      'Assicurati che il microfono funzioni e di essere in un ambiente silenzioso.',
      'Hai fino a 2 tentativi di registrazione per domanda.',
      'Parla chiaramente e a un ritmo naturale.',
    ],
  },
}

export function SectionTakePage() {
  const { id: assessmentId, sectionId } = useParams<{ id: string; sectionId: string }>()
  const navigate = useNavigate()

  const [section, setSection] = useState<AssessmentSection | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState<any>(null)
  const [progress, setProgress] = useState<{ answered: number; total: number; currentLevel: string } | null>(null)
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; correctAnswer: string } | null>(null)
  const [isComplete, setIsComplete] = useState(false)
  const [answeredCount, setAnsweredCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showSectionIntro, setShowSectionIntro] = useState(true)
  const [sectionMeta, setSectionMeta] = useState<{ skill: string; timeLimitMin: number; questionsLimit: number } | null>(null)

  useEffect(() => {
    // Fetch section metadata without starting the timer
    loadSectionMeta()
  }, [assessmentId, sectionId])

  const loadSectionMeta = async () => {
    try {
      setLoading(true)
      const sections = await assessmentApi.getSections(assessmentId!)
      const current = sections.find((s: AssessmentSection) => s.id === sectionId)
      if (current) {
        setSectionMeta({ skill: current.skill, timeLimitMin: current.timeLimitMin, questionsLimit: current.questionsLimit })
        // If already in progress, skip intro
        if (current.status === 'IN_PROGRESS') {
          setShowSectionIntro(false)
          setSection(current)
          await fetchNextQuestion()
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.error || err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleStartSection = async () => {
    try {
      setLoading(true)
      setShowSectionIntro(false)
      // NOW start the section (this starts the timer)
      const startedSection = await assessmentApi.startSection(assessmentId!, sectionId!)
      setSection(startedSection)
      await fetchNextQuestion()
    } catch (err: any) {
      const msg = err.response?.data?.error || err.message || ''
      if (msg.includes('already completed')) {
        setError('This section was already marked as completed. Please start a new assessment to retake it.')
      } else {
        setError(msg)
      }
    } finally {
      setLoading(false)
    }
  }

  const fetchNextQuestion = async () => {
    try {
      const result = await assessmentApi.getSectionNextQuestion(assessmentId!, sectionId!)
      if (result.isComplete) {
        const answered = result.totalAnswered || 0
        setAnsweredCount(answered)
        if (answered === 0) {
          // No questions were served — don't mark as completed
          setError('No questions are available for this section yet. Please try again later or contact your teacher.')
          return
        }
        // Mark section as completed in the backend so next sections unlock
        try {
          await assessmentApi.completeSection(assessmentId!, sectionId!)
        } catch {
          // May already be completed
        }
        setIsComplete(true)
        setCurrentQuestion(null)
      } else {
        setCurrentQuestion(result.question)
        setProgress(result.progress || null)
      }
    } catch (err: any) {
      setError(err.response?.data?.error || err.message)
    }
  }

  const handleReadingListeningAnswer = async (answer: string) => {
    if (!currentQuestion || submitting) return

    try {
      setSubmitting(true)
      setFeedback(null)

      const result = await assessmentApi.submitSectionAnswer(
        assessmentId!, sectionId!, currentQuestion.id, answer
      )

      setFeedback({ isCorrect: result.isCorrect, correctAnswer: result.correctAnswer })

      // Show feedback briefly then move to next question
      setTimeout(async () => {
        setFeedback(null)
        if (result.shouldAutoComplete || result.expired) {
          setAnsweredCount(prev => prev + 1)
          // Mark section as completed in the backend so next sections unlock
          try {
            await assessmentApi.completeSection(assessmentId!, sectionId!)
          } catch {
            // May already be completed
          }
          setIsComplete(true)
        } else {
          await fetchNextQuestion()
        }
        setSubmitting(false)
      }, 1500)
    } catch (err: any) {
      setError(err.response?.data?.error || err.message)
      setSubmitting(false)
    }
  }

  const handleWritingSubmit = async (responseText: string) => {
    if (!currentQuestion || submitting) return

    try {
      setSubmitting(true)
      await assessmentApi.submitWritingResponse(assessmentId!, sectionId!, currentQuestion.id, responseText)

      // Move to next question
      await fetchNextQuestion()
      setSubmitting(false)
    } catch (err: any) {
      setError(err.response?.data?.error || err.message)
      setSubmitting(false)
    }
  }

  const handleSpeakingSubmit = async (audioBlob: Blob, duration: number) => {
    if (!currentQuestion || submitting) return

    try {
      setSubmitting(true)

      // Upload audio first
      const uploadResult = await assessmentApi.uploadAudio(audioBlob)

      // Submit speaking response
      await assessmentApi.submitSpeakingResponse(
        assessmentId!, sectionId!, currentQuestion.id, uploadResult.audioUrl, duration
      )

      // Move to next question
      await fetchNextQuestion()
      setSubmitting(false)
    } catch (err: any) {
      setError(err.response?.data?.error || err.message)
      setSubmitting(false)
    }
  }

  const handleCompleteSection = useCallback(async () => {
    try {
      await assessmentApi.completeSection(assessmentId!, sectionId!)
      setIsComplete(true)
    } catch (err: any) {
      // May already be completed
      setIsComplete(true)
    }
  }, [assessmentId, sectionId])

  const handleTimerExpired = useCallback(() => {
    handleCompleteSection()
  }, [handleCompleteSection])

  const handleContinue = () => {
    navigate(`/assessment/multi-skill/${assessmentId}`)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
          <p className="font-medium">Error</p>
          <p className="text-sm">{error}</p>
          <button
            onClick={() => navigate(`/assessment/multi-skill/${assessmentId}`)}
            className="mt-3 text-sm text-red-700 underline"
          >
            Back to sections
          </button>
        </div>
      </div>
    )
  }

  if (showSectionIntro && sectionMeta) {
    const instructions = SECTION_INSTRUCTIONS[sectionMeta.skill] || SECTION_INSTRUCTIONS['READING']
    const label = SKILL_LABELS[sectionMeta.skill] || sectionMeta.skill
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">{label} Section</h1>
            <p className="text-sm text-gray-500 mt-1">
              {sectionMeta.questionsLimit} questions &middot; {sectionMeta.timeLimitMin} minutes
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-5">
            <h2 className="font-semibold text-amber-900 mb-3">Instructions / Istruzioni</h2>
            <div className="space-y-3">
              {instructions.en.map((line, i) => (
                <div key={i} className="text-sm">
                  <p className="text-gray-800">{line}</p>
                  <p className="text-amber-700">{instructions.it[i]}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-800 font-medium">
              The timer will start when you click "Start Section".
            </p>
            <p className="text-sm text-red-600">
              Il timer partira quando clicchi "Inizia Sezione".
            </p>
          </div>

          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => navigate(`/assessment/multi-skill/${assessmentId}`)}
              className="px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg font-medium hover:bg-gray-50"
            >
              Back / Indietro
            </button>
            <button
              onClick={handleStartSection}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
            >
              Start Section / Inizia Sezione
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (isComplete) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="text-6xl mb-4">
          {({ GRAMMAR: '📝', VOCABULARY: '📚', READING: '📖', ERROR_CORRECTION: '✏️', SENTENCE_TRANSFORMATION: '🔄', WRITING: '✍️', LISTENING: '🎧', SPEAKING: '🎤' } as Record<string, string>)[section?.skill || ''] || '✅'}
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {SKILL_LABELS[section?.skill || '']} Section Complete
        </h2>
        <p className="text-gray-600 mb-6">
          {answeredCount === 0
            ? 'This section has been completed.'
            : section?.skill === 'WRITING' || section?.skill === 'SPEAKING'
              ? 'Your responses will be evaluated by AI and may be reviewed by a teacher.'
              : `Your ${answeredCount} answer${answeredCount !== 1 ? 's have' : ' has'} been scored.`}
        </p>
        <button
          onClick={handleContinue}
          className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Continue to Next Section
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            {SKILL_LABELS[section?.skill || '']} Section
          </h2>
          {progress && (
            <p className="text-sm text-gray-500">
              Question {progress.answered + 1} of {progress.total} &middot; Level: {progress.currentLevel}
            </p>
          )}
        </div>

        <div className="flex items-center gap-4">
          {section?.expiresAt && (
            <SectionTimer
              expiresAt={section.expiresAt}
              onExpired={handleTimerExpired}
            />
          )}
          <button
            onClick={handleCompleteSection}
            className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Finish Section
          </button>
        </div>
      </div>

      {/* Progress bar */}
      {progress && (
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div
            className="bg-blue-600 rounded-full h-2 transition-all duration-300"
            style={{ width: `${(progress.answered / progress.total) * 100}%` }}
          />
        </div>
      )}

      {/* Feedback overlay */}
      {feedback && (
        <div className={`mb-4 p-3 rounded-lg text-sm font-medium ${
          feedback.isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {feedback.isCorrect ? 'Correct!' : `Incorrect. The correct answer is: ${feedback.correctAnswer}`}
        </div>
      )}

      {/* Question rendering — routes by questionType so the Reading section
          can serve grammar, vocabulary, error-correction, and sentence-transformation questions */}
      {currentQuestion && (() => {
        const qType = currentQuestion.questionType
        const skill = section?.skill

        // Writing section
        if (skill === 'WRITING' || qType === 'WRITING' || qType === 'ESSAY') {
          return <WritingQuestion question={currentQuestion} onSubmit={handleWritingSubmit} disabled={submitting} />
        }
        // Speaking section
        if (skill === 'SPEAKING' || qType === 'SPEAKING_PROMPT') {
          return <SpeakingQuestion question={currentQuestion} onSubmit={handleSpeakingSubmit} disabled={submitting} />
        }
        // Listening section
        if (skill === 'LISTENING' || qType === 'LISTENING' || qType === 'DICTATION') {
          return <ListeningQuestion question={{ ...currentQuestion, language: 'English' }} onSubmit={handleReadingListeningAnswer} disabled={submitting} />
        }
        // Error correction (can appear in Reading section)
        if (qType === 'ERROR_CORRECTION') {
          return <ErrorCorrectionQuestion question={currentQuestion} onSubmit={handleReadingListeningAnswer} disabled={submitting} />
        }
        // Sentence transformation (can appear in Reading section)
        if (qType === 'SENTENCE_TRANSFORMATION') {
          return <SentenceTransformationQuestion question={currentQuestion} onSubmit={handleReadingListeningAnswer} disabled={submitting} />
        }
        // Default: Reading / MC / Fill-blank / Grammar / Vocabulary
        return <ReadingQuestion question={currentQuestion} onSubmit={handleReadingListeningAnswer} disabled={submitting} />
      })()}

      {submitting && !feedback && (
        <div className="flex items-center gap-2 mt-4 text-gray-500">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          <span className="text-sm">Submitting...</span>
        </div>
      )}
    </div>
  )
}
