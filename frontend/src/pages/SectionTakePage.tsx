import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { assessmentApi, AssessmentSection } from '../services/assessmentApi'
import { SectionTimer } from '../components/assessment/SectionTimer'
import { ReadingQuestion } from '../components/assessment/ReadingQuestion'
import { ListeningQuestion } from '../components/assessment/ListeningQuestion'
import { WritingQuestion } from '../components/assessment/WritingQuestion'
import { SpeakingQuestion } from '../components/assessment/SpeakingQuestion'

const SKILL_LABELS: Record<string, string> = {
  READING: 'Reading', LISTENING: 'Listening', WRITING: 'Writing', SPEAKING: 'Speaking'
}

export function SectionTakePage() {
  const { id: assessmentId, sectionId } = useParams<{ id: string; sectionId: string }>()
  const navigate = useNavigate()

  const [section, setSection] = useState<AssessmentSection | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState<any>(null)
  const [progress, setProgress] = useState<{ answered: number; total: number; currentLevel: string } | null>(null)
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; correctAnswer: string } | null>(null)
  const [isComplete, setIsComplete] = useState(false)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadSection()
  }, [assessmentId, sectionId])

  const loadSection = async () => {
    try {
      setLoading(true)
      // Start section if not already started
      const startedSection = await assessmentApi.startSection(assessmentId!, sectionId!)
      setSection(startedSection)
      await fetchNextQuestion()
    } catch (err: any) {
      setError(err.response?.data?.error || err.message)
    } finally {
      setLoading(false)
    }
  }

  const fetchNextQuestion = async () => {
    try {
      const result = await assessmentApi.getSectionNextQuestion(assessmentId!, sectionId!)
      if (result.isComplete) {
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

  if (isComplete) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="text-6xl mb-4">
          {section?.skill === 'READING' ? '📖' : section?.skill === 'LISTENING' ? '🎧' : section?.skill === 'WRITING' ? '✍️' : '🎤'}
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {SKILL_LABELS[section?.skill || '']} Section Complete
        </h2>
        <p className="text-gray-600 mb-6">
          {section?.skill === 'WRITING' || section?.skill === 'SPEAKING'
            ? 'Your responses will be evaluated by AI and may be reviewed by a teacher.'
            : 'Your answers have been scored.'}
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

      {/* Question rendering by section type */}
      {currentQuestion && section?.skill === 'READING' && (
        <ReadingQuestion
          question={currentQuestion}
          onSubmit={handleReadingListeningAnswer}
          disabled={submitting}
        />
      )}

      {currentQuestion && section?.skill === 'LISTENING' && (
        <ListeningQuestion
          question={{ ...currentQuestion, language: 'English' }}
          onSubmit={handleReadingListeningAnswer}
          disabled={submitting}
        />
      )}

      {currentQuestion && section?.skill === 'WRITING' && (
        <WritingQuestion
          question={currentQuestion}
          onSubmit={handleWritingSubmit}
          disabled={submitting}
        />
      )}

      {currentQuestion && section?.skill === 'SPEAKING' && (
        <SpeakingQuestion
          question={currentQuestion}
          onSubmit={handleSpeakingSubmit}
          disabled={submitting}
        />
      )}

      {submitting && !feedback && (
        <div className="flex items-center gap-2 mt-4 text-gray-500">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          <span className="text-sm">Submitting...</span>
        </div>
      )}
    </div>
  )
}
