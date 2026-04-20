import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { assessmentApi, AssessmentSection } from '../services/assessmentApi'
import { useLanguage } from '../contexts/LanguageContext'
import { LanguageToggle } from '../components/LanguageToggle'
import { useTestSecurity } from '../hooks/useTestSecurity'
import { SectionTimer } from '../components/assessment/SectionTimer'
import { ReadingQuestion } from '../components/assessment/ReadingQuestion'
import { ListeningQuestion } from '../components/assessment/ListeningQuestion'
import { WritingQuestion } from '../components/assessment/WritingQuestion'
import { SpeakingQuestion } from '../components/assessment/SpeakingQuestion'
import { ErrorCorrectionQuestion } from '../components/assessment/ErrorCorrectionQuestion'
import { SentenceTransformationQuestion } from '../components/assessment/SentenceTransformationQuestion'
import { TrueFalseQuestion } from '../components/assessment/TrueFalseQuestion'
import { MatchingQuestion } from '../components/assessment/MatchingQuestion'
import { ReorderQuestion } from '../components/assessment/ReorderQuestion'
import { WordFormationQuestion } from '../components/assessment/WordFormationQuestion'
import {
  BookOpen,
  Headphones,
  PenTool,
  Mic,
  FileText,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Flag,
  Clock,
  Info,
  Shield,
  Award,
  Pause,
} from 'lucide-react'

const SKILL_LABELS: Record<string, string> = {
  GRAMMAR: 'Grammar', VOCABULARY: 'Vocabulary', READING: 'Reading & Language Use',
  ERROR_CORRECTION: 'Error Correction', SENTENCE_TRANSFORMATION: 'Sentence Transformation',
  WRITING: 'Writing', LISTENING: 'Listening', SPEAKING: 'Speaking'
}

const SKILL_ICONS: Record<string, React.ElementType> = {
  GRAMMAR: FileText, VOCABULARY: BookOpen, READING: BookOpen,
  ERROR_CORRECTION: PenTool, SENTENCE_TRANSFORMATION: PenTool,
  WRITING: PenTool, LISTENING: Headphones, SPEAKING: Mic,
}

const LANGUAGE_FLAGS: Record<string, string> = {
  English: '\u{1F1EC}\u{1F1E7}',
  Spanish: '\u{1F1EA}\u{1F1F8}',
  French: '\u{1F1EB}\u{1F1F7}',
  German: '\u{1F1E9}\u{1F1EA}',
  Italian: '\u{1F1EE}\u{1F1F9}',
}

const INSTRUCTION_ICONS = [BookOpen, Info, Shield, AlertCircle]

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
  const { t } = useLanguage()

  const [section, setSection] = useState<AssessmentSection | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState<any>(null)
  const [progress, setProgress] = useState<{ answered: number; total: number; currentLevel: string } | null>(null)
  // feedback removed — students should not see if answers are correct
  const [isComplete, setIsComplete] = useState(false)
  const [answeredCount, setAnsweredCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showSectionIntro, setShowSectionIntro] = useState(true)
  const [sectionMeta, setSectionMeta] = useState<{ skill: string; timeLimitMin: number; questionsLimit: number } | null>(null)
  const [assessmentLanguage, setAssessmentLanguage] = useState<string>('')
  const [testSettings, setTestSettings] = useState({
    allowPause: true, showTimer: true, autoSubmitOnExpiry: true,
    blockTabSwitch: true, blockCopyPaste: true, requireFullscreen: false, warnOnLeave: true
  })

  // Anti-cheating: configurable via admin settings
  const { violationCount, showWarning, dismissWarning } = useTestSecurity({
    assessmentId: assessmentId || '',
    expiresAt: section?.expiresAt || null,
    onExpired: () => {
      if (testSettings.autoSubmitOnExpiry) {
        handleCompleteSection()
      }
    },
    blockTabSwitch: testSettings.blockTabSwitch,
    blockCopyPaste: testSettings.blockCopyPaste,
    requireFullscreen: testSettings.requireFullscreen,
    warnOnLeave: testSettings.warnOnLeave,
    maxViolations: 2,
    onMaxViolations: () => {
      handleCompleteSection('INTERRUPTED')
    },
  })

  useEffect(() => {
    // Fetch section metadata without starting the timer
    loadSectionMeta()
  }, [assessmentId, sectionId])

  const loadSectionMeta = async () => {
    try {
      setLoading(true)
      const [sections, assessment, settings] = await Promise.all([
        assessmentApi.getSections(assessmentId!),
        assessmentApi.getById(assessmentId!).catch(() => null),
        assessmentApi.getAssessmentSettings().catch(() => null),
      ])
      if (assessment) setAssessmentLanguage(assessment.language || '')
      if (settings) setTestSettings(s => ({ ...s, ...settings }))
      const current = sections.find((s: AssessmentSection) => s.id === sectionId)
      if (current) {
        setSectionMeta({ skill: current.skill, timeLimitMin: current.timeLimitMin, questionsLimit: current.questionsLimit })
        if (current.status === 'COMPLETED') {
          // Section already done — show completion screen
          setShowSectionIntro(false)
          setSection(current)
          setIsComplete(true)
        } else if (current.status === 'IN_PROGRESS') {
          // Resume in progress
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

      const result = await assessmentApi.submitSectionAnswer(
        assessmentId!, sectionId!, currentQuestion.id, answer
      )

      if (result.shouldAutoComplete || result.expired) {
        setAnsweredCount(prev => prev + 1)
        try {
          await assessmentApi.completeSection(assessmentId!, sectionId!)
        } catch { /* May already be completed */ }
        setIsComplete(true)
        setSubmitting(false)
      } else {
        await fetchNextQuestion()
        setSubmitting(false)
      }
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

  const handleSpeakingSubmit = async (audioBlob: Blob, duration: number, transcript?: string) => {
    if (!currentQuestion || submitting) return

    try {
      setSubmitting(true)

      // Upload audio first
      const uploadResult = await assessmentApi.uploadAudio(audioBlob)

      // Submit speaking response with transcript
      await assessmentApi.submitSpeakingResponse(
        assessmentId!, sectionId!, currentQuestion.id, uploadResult.audioUrl, duration, transcript
      )

      // Move to next question
      await fetchNextQuestion()
      setSubmitting(false)
    } catch (err: any) {
      setError(err.response?.data?.error || err.message)
      setSubmitting(false)
    }
  }

  const handleCompleteSection = useCallback(async (reason?: string) => {
    try {
      await assessmentApi.completeSection(assessmentId!, sectionId!, reason)
      setIsComplete(true)
    } catch (err: any) {
      // May already be completed
      setIsComplete(true)
    }
  }, [assessmentId, sectionId])

  const handleTimerExpired = useCallback(() => {
    if (testSettings.autoSubmitOnExpiry) {
      handleCompleteSection('EXPIRED')
    }
  }, [handleCompleteSection, testSettings.autoSubmitOnExpiry])

  const handlePauseAndSave = async () => {
    try {
      await assessmentApi.pauseAssessment(assessmentId!)
      navigate(`/assessment`)
    } catch {
      // If pause fails, still navigate back
      navigate(`/assessment/multi-skill/${assessmentId}`)
    }
  }

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
    const SkillIcon = SKILL_ICONS[sectionMeta.skill] || BookOpen
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 space-y-6">
          <div className="flex justify-end">
            <LanguageToggle />
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gray-100 mb-4">
              <SkillIcon className="w-6 h-6 text-gray-700" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              {assessmentLanguage && (
                <span className="text-gray-500 font-medium">
                  {LANGUAGE_FLAGS[assessmentLanguage] && <span className="mr-1.5 text-lg">{LANGUAGE_FLAGS[assessmentLanguage]}</span>}
                  {assessmentLanguage} —{' '}
                </span>
              )}
              {label}
            </h1>
            <div className="flex items-center justify-center gap-3 mt-2">
              <span className="inline-flex items-center gap-1.5 text-sm text-gray-500">
                <FileText className="w-3.5 h-3.5" />
                {sectionMeta.questionsLimit} questions
              </span>
              <span className="text-gray-300">&middot;</span>
              <span className="inline-flex items-center gap-1.5 text-sm text-gray-500">
                <Clock className="w-3.5 h-3.5" />
                {sectionMeta.timeLimitMin} minutes
              </span>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
            <h2 className="font-semibold text-gray-800 mb-3">{t('Instructions', 'Istruzioni')}</h2>
            <div className="space-y-3">
              {instructions.en.map((line, i) => {
                const InstrIcon = INSTRUCTION_ICONS[i] || Info
                return (
                  <div key={i} className="flex gap-3 text-sm">
                    <div className="flex-shrink-0 mt-0.5">
                      <InstrIcon className="w-4 h-4 text-gray-500" />
                    </div>
                    <p className="text-gray-800">{t(line, instructions.it[i])}</p>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="bg-gray-100 border border-gray-200 rounded-xl p-4 flex gap-3 items-start">
            <AlertCircle className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-gray-700 font-medium">
              {t(
                `The timer will start when you click "${section?.status === 'IN_PROGRESS' ? 'Continue' : 'Start Section'}".`,
                `Il timer partira quando clicchi "${section?.status === 'IN_PROGRESS' ? 'Continua' : 'Inizia Sezione'}".`
              )}
            </p>
          </div>

          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => navigate(`/assessment/multi-skill/${assessmentId}`)}
              className="inline-flex items-center gap-2 px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('Back', 'Indietro')}
            </button>
            <button
              onClick={handleStartSection}
              className="inline-flex items-center gap-2 px-8 py-3 bg-gray-900 text-white rounded-xl font-semibold text-lg hover:bg-gray-800 transition-all"
            >
              {section?.status === 'IN_PROGRESS'
                ? t('Continue', 'Continua')
                : t('Start Section', 'Inizia Sezione')}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (isComplete) {
    const SkillIcon = SKILL_ICONS[section?.skill || ''] || CheckCircle
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        {/* Subtle gradient background */}
        <div className="relative">
          <div className="absolute inset-0 -top-12 bg-gradient-to-b from-green-50/50 via-blue-50/30 to-transparent rounded-3xl -z-10" />

          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 border-4 border-white shadow-lg mb-5">
            <SkillIcon className="w-9 h-9 text-green-600" />
          </div>

          <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-amber-100 to-yellow-100 border-2 border-white shadow-sm -ml-4 -mt-8 mb-2">
            <Award className="w-4 h-4 text-amber-600" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {SKILL_LABELS[section?.skill || '']} {t('Section Complete', 'Sezione Completata')}
          </h2>
          <p className="text-gray-600 mb-8">
            {answeredCount === 0
              ? t('This section has been completed.', 'Questa sezione è stata completata.')
              : t('Your responses have been submitted successfully.', 'Le tue risposte sono state inviate con successo.')}
          </p>
          <button
            onClick={handleContinue}
            className="inline-flex items-center gap-2 px-10 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg shadow-blue-500/25"
          >
            {t('Continue to Next Section', 'Continua alla Prossima Sezione')}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Tab switch warning overlay */}
      {showWarning && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md text-center space-y-4 shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-full bg-red-100 flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">{t('Tab Switch Detected', 'Cambio Scheda Rilevato')}</h2>
            <p className="text-gray-600">
              {t(
                'You left the test window. Switching tabs during the test is not allowed and has been recorded.',
                'Hai lasciato la finestra del test. Il cambio di scheda durante il test non è consentito ed è stato registrato.'
              )}
            </p>
            <p className="text-sm text-red-600 font-medium">
              {t(
                `Violations: ${violationCount}/2 — the test will be automatically submitted after 2 violations.`,
                `Violazioni: ${violationCount}/2 — il test verrà inviato automaticamente dopo 2 violazioni.`
              )}
            </p>
            <button
              onClick={dismissWarning}
              className="px-8 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors"
            >
              {t('Return to Test', 'Torna al Test')}
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          {assessmentLanguage && <span className="text-2xl">{LANGUAGE_FLAGS[assessmentLanguage]}</span>}
          {(() => {
            const HeaderIcon = SKILL_ICONS[section?.skill || ''] || BookOpen
            return <HeaderIcon className="w-5 h-5 text-indigo-500" />
          })()}
          <div>
          <h2 className="text-xl font-bold text-gray-900">
            {SKILL_LABELS[section?.skill || '']} Section
          </h2>
          {progress && (
            <p className="text-sm text-gray-500">
              Question {progress.answered + 1} of {progress.total}
            </p>
          )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {testSettings.showTimer && section?.expiresAt && (
            <SectionTimer
              expiresAt={section.expiresAt}
              onExpired={handleTimerExpired}
            />
          )}
          {testSettings.allowPause && (
            <button
              onClick={handlePauseAndSave}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-xl hover:bg-amber-100 transition-all"
            >
              <Pause className="w-3.5 h-3.5" />
              Pause & Save
            </button>
          )}
          {progress && progress.answered >= progress.total - 1 && (
            <button
              onClick={() => handleCompleteSection()}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-xl hover:bg-green-700 transition-all"
            >
              <Flag className="w-3.5 h-3.5" />
              Finish Section & Save
            </button>
          )}
        </div>
      </div>

      {/* Gradient separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-4" />

      {/* Progress bar */}
      {progress && (
        <div className="w-full bg-gray-200 rounded-full h-3 mb-6 overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full h-3 transition-all duration-500 ease-out"
            style={{ width: `${(progress.answered / progress.total) * 100}%` }}
          />
        </div>
      )}

      {currentQuestion && (() => {
        const qType = currentQuestion.questionType
        const skill = section?.skill

        // Writing section
        if (skill === 'WRITING' || qType === 'WRITING' || qType === 'ESSAY') {
          return <WritingQuestion question={currentQuestion} onSubmit={handleWritingSubmit} disabled={submitting} language={assessmentLanguage} />
        }
        // Speaking section
        if (skill === 'SPEAKING' || qType === 'SPEAKING_PROMPT') {
          return <SpeakingQuestion question={currentQuestion} onSubmit={handleSpeakingSubmit} disabled={submitting} language={assessmentLanguage} />
        }
        // Listening section
        if (skill === 'LISTENING' || qType === 'LISTENING' || qType === 'DICTATION' || qType === 'LISTENING_FILL_BLANK') {
          return <ListeningQuestion question={{ ...currentQuestion, language: assessmentLanguage || 'English' }} onSubmit={handleReadingListeningAnswer} disabled={submitting} />
        }
        // True/False
        if (qType === 'TRUE_FALSE') {
          return <TrueFalseQuestion question={currentQuestion} onSubmit={handleReadingListeningAnswer} disabled={submitting} language={assessmentLanguage} />
        }
        // Matching
        if (qType === 'MATCHING') {
          return <MatchingQuestion question={currentQuestion} onSubmit={handleReadingListeningAnswer} disabled={submitting} language={assessmentLanguage} />
        }
        // Reorder
        if (qType === 'REORDER') {
          return <ReorderQuestion question={currentQuestion} onSubmit={handleReadingListeningAnswer} disabled={submitting} language={assessmentLanguage} />
        }
        // Word formation
        if (qType === 'WORD_FORMATION') {
          return <WordFormationQuestion question={currentQuestion} onSubmit={handleReadingListeningAnswer} disabled={submitting} language={assessmentLanguage} />
        }
        // Error correction (can appear in Reading section)
        if (qType === 'ERROR_CORRECTION') {
          return <ErrorCorrectionQuestion question={currentQuestion} onSubmit={handleReadingListeningAnswer} disabled={submitting} language={assessmentLanguage} />
        }
        // Sentence transformation (can appear in Reading section)
        if (qType === 'SENTENCE_TRANSFORMATION') {
          return <SentenceTransformationQuestion question={currentQuestion} onSubmit={handleReadingListeningAnswer} disabled={submitting} language={assessmentLanguage} />
        }
        // Default: Reading / MC / Fill-blank / Grammar / Vocabulary
        return <ReadingQuestion question={currentQuestion} onSubmit={handleReadingListeningAnswer} disabled={submitting} language={assessmentLanguage} />
      })()}

      {submitting && (
        <div className="flex items-center gap-2 mt-4 text-gray-500">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          <span className="text-sm">Submitting...</span>
        </div>
      )}
    </div>
  )
}
