import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useMutation, useQuery } from 'react-query'
import { Clock, CheckCircle, XCircle, ChevronRight, AlertCircle, BookOpen, ShieldAlert, Timer } from 'lucide-react'
import { assessmentApi, AssessmentQuestion } from '../services/assessmentApi'
import { useTestSecurity } from '../hooks/useTestSecurity'
import { LoadingPage } from '../components/common/LoadingSpinner'
import { Alert } from '../components/common/Alert'
import { Button } from '../components/common/Button'
import { Card } from '../components/common/Card'

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
}

export function AssessmentTakePage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [currentQuestion, setCurrentQuestion] = useState<AssessmentQuestion | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [fillAnswer, setFillAnswer] = useState('')
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; correctAnswer: string } | null>(null)
  const [progress, setProgress] = useState({ answered: 0, total: 30, currentLevel: 'B1' })
  const [isComplete, setIsComplete] = useState(false)

  // Get assessment details
  const { data: assessment, isLoading: assessmentLoading } = useQuery(
    ['assessment', id],
    () => assessmentApi.getById(id!),
    { enabled: !!id }
  )

  // Complete assessment
  const completeAssessment = useMutation(
    () => assessmentApi.completeAssessment(id!),
    {
      onSuccess: () => {
        navigate(`/assessment/result/${id}`)
      }
    }
  )

  // Handle auto-submit on timer expiry
  const handleExpired = useCallback(() => {
    setIsComplete(true)
    completeAssessment.mutate()
  }, [id])

  // Test security hook
  const { violationCount, remainingSeconds, requestFullscreen, isTimed } = useTestSecurity({
    assessmentId: id || '',
    expiresAt: assessment?.expiresAt || null,
    onExpired: handleExpired
  })

  // Request fullscreen on mount for timed tests
  useEffect(() => {
    if (isTimed && assessment?.status === 'IN_PROGRESS') {
      requestFullscreen()
    }
  }, [isTimed, assessment?.status])

  // Get next question
  const fetchNextQuestion = useMutation(
    () => assessmentApi.getNextQuestion(id!),
    {
      onSuccess: (data) => {
        if (data.isComplete) {
          setIsComplete(true)
          if (data.expired) {
            completeAssessment.mutate()
          }
        } else {
          setCurrentQuestion(data.question || null)
          if (data.progress) {
            setProgress(data.progress)
          }
        }
        setFeedback(null)
        setSelectedAnswer('')
        setFillAnswer('')
      }
    }
  )

  // Submit answer
  const submitAnswer = useMutation(
    (answer: string) => assessmentApi.submitAnswer(id!, currentQuestion!.id, answer),
    {
      onSuccess: (data) => {
        if (data.expired) {
          setIsComplete(true)
          return
        }
        setFeedback(data)
        if (data.shouldAutoComplete) {
          setIsComplete(true)
        }
      }
    }
  )

  // Initial load
  useEffect(() => {
    if (id && assessment?.status === 'IN_PROGRESS') {
      fetchNextQuestion.mutate()
    }
  }, [id, assessment?.status])

  const handleSubmitAnswer = () => {
    const answer = currentQuestion?.questionType === 'FILL_BLANK' ? fillAnswer : selectedAnswer
    if (answer) {
      submitAnswer.mutate(answer)
    }
  }

  const handleNextQuestion = () => {
    fetchNextQuestion.mutate()
  }

  const handleComplete = () => {
    completeAssessment.mutate()
  }

  if (assessmentLoading) return <LoadingPage />

  if (assessment?.status === 'COMPLETED') {
    navigate(`/assessment/result/${id}`)
    return null
  }

  // Determine if submit should be disabled based on question type
  const isSubmitDisabled = () => {
    if (submitAnswer.isLoading) return true
    if (!currentQuestion) return true
    const qType = currentQuestion.questionType
    if (qType === 'FILL_BLANK') return !fillAnswer
    return !selectedAnswer
  }

  const isLowTime = remainingSeconds !== null && remainingSeconds < 300

  return (
    <div className={`max-w-2xl mx-auto space-y-6 ${isTimed ? 'select-none' : ''}`} style={isTimed ? { userSelect: 'none' } : undefined}>
      {/* Progress Header */}
      <Card className="!p-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm text-gray-500">
              Question {progress.answered + 1} of {progress.total}
            </span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-lg font-semibold text-gray-900">{assessment?.language} Assessment</span>
              <span className="px-2 py-0.5 bg-primary-100 text-primary-700 rounded text-xs font-medium">
                Level: {progress.currentLevel}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isTimed && remainingSeconds !== null ? (
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono text-lg font-bold ${
                isLowTime
                  ? 'bg-red-100 text-red-700 animate-pulse'
                  : 'bg-gray-100 text-gray-700'
              }`}>
                <Timer className="w-5 h-5" />
                <span>{formatTime(remainingSeconds)}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-gray-500">
                <Clock className="w-5 h-5" />
                <span className="text-sm">Adaptive Test</span>
              </div>
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all"
              style={{ width: `${Math.min((progress.answered / progress.total) * 100, 100)}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {progress.answered} / {progress.total} questions answered
          </p>
        </div>
      </Card>

      {/* Violations banner */}
      {violationCount > 0 && (
        <div className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
          violationCount >= 3 ? 'bg-red-100 border border-red-300' : 'bg-amber-100 border border-amber-300'
        }`}>
          <ShieldAlert className={`w-5 h-5 ${violationCount >= 3 ? 'text-red-600' : 'text-amber-600'}`} />
          <span className={`text-sm font-medium ${violationCount >= 3 ? 'text-red-700' : 'text-amber-700'}`}>
            {violationCount} violation{violationCount !== 1 ? 's' : ''} detected. Test integrity is monitored.
          </span>
        </div>
      )}

      {/* Loading state */}
      {fetchNextQuestion.isLoading && (
        <Card className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading next question...</p>
        </Card>
      )}

      {/* Complete state */}
      {isComplete && !fetchNextQuestion.isLoading && (
        <Card className="text-center py-12">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Assessment Complete!</h2>
          <p className="text-gray-600 mb-6">
            {remainingSeconds === 0
              ? "Time's up! Your answers have been submitted."
              : "You've answered all the questions. Click below to see your results."}
          </p>
          <Button onClick={handleComplete} disabled={completeAssessment.isLoading}>
            {completeAssessment.isLoading ? 'Calculating...' : 'View Results'}
          </Button>
        </Card>
      )}

      {/* Question Card */}
      {currentQuestion && !isComplete && !fetchNextQuestion.isLoading && (
        <Card>
          {/* Reading Passage */}
          {currentQuestion.questionType === 'READING' && currentQuestion.passage && (
            <div className="mb-6 border-l-4 border-blue-400 bg-blue-50 rounded-r-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-700">
                  {currentQuestion.passageTitle || 'Reading Passage'}
                </span>
              </div>
              <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-line">
                {currentQuestion.passage}
              </p>
            </div>
          )}

          {/* Question */}
          <div className="mb-6">
            <p className="text-lg font-medium text-gray-900">{currentQuestion.questionText}</p>
            {currentQuestion.imageUrl && (
              <img
                src={currentQuestion.imageUrl}
                alt="Question"
                className="mt-4 rounded-lg max-w-full"
              />
            )}
          </div>

          {/* Multiple Choice / Reading Options */}
          {(currentQuestion.questionType === 'MULTIPLE_CHOICE' || currentQuestion.questionType === 'READING') && currentQuestion.options && (
            <div className="space-y-3 mb-6">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedAnswer(option.value)}
                  disabled={!!feedback}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                    selectedAnswer === option.value
                      ? feedback
                        ? feedback.isCorrect || option.value === feedback.correctAnswer
                          ? 'border-green-500 bg-green-50'
                          : 'border-red-500 bg-red-50'
                        : 'border-primary-500 bg-primary-50'
                      : feedback && option.value === feedback.correctAnswer
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{option.label}</span>
                    {feedback && option.value === feedback.correctAnswer && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                    {feedback && selectedAnswer === option.value && !feedback.isCorrect && option.value !== feedback.correctAnswer && (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Fill in the Blank */}
          {currentQuestion.questionType === 'FILL_BLANK' && (
            <div className="mb-6">
              <input
                type="text"
                value={fillAnswer}
                onChange={(e) => setFillAnswer(e.target.value)}
                disabled={!!feedback}
                placeholder="Type your answer..."
                className={`w-full p-4 border-2 rounded-lg text-lg ${
                  feedback
                    ? feedback.isCorrect
                      ? 'border-green-500 bg-green-50'
                      : 'border-red-500 bg-red-50'
                    : 'border-gray-200 focus:border-primary-500'
                }`}
                autoFocus
              />
              {feedback && !feedback.isCorrect && (
                <p className="mt-2 text-green-600">
                  Correct answer: <strong>{feedback.correctAnswer}</strong>
                </p>
              )}
            </div>
          )}

          {/* Feedback */}
          {feedback && (
            <Alert
              type={feedback.isCorrect ? 'success' : 'error'}
              message={feedback.isCorrect ? 'Correct!' : 'Incorrect'}
              className="mb-6"
            />
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3">
            {!feedback ? (
              <Button
                onClick={handleSubmitAnswer}
                disabled={isSubmitDisabled()}
              >
                {submitAnswer.isLoading ? 'Submitting...' : 'Submit Answer'}
              </Button>
            ) : (
              <Button onClick={handleNextQuestion} className="flex items-center gap-2">
                Next Question <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </Card>
      )}

      {/* Help Info — conditional based on timed vs untimed */}
      <Card className="!p-4 bg-gray-50">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-gray-400 mt-0.5" />
          <div className="text-sm text-gray-600">
            <p className="font-medium text-gray-700">{isTimed ? 'Test Rules:' : 'Tips:'}</p>
            <ul className="mt-1 space-y-1">
              {isTimed ? (
                <>
                  <li>• Do not switch tabs or leave this window</li>
                  <li>• Copy, cut, and right-click are disabled</li>
                  <li>• The test auto-submits when time runs out</li>
                  <li>• All violations are recorded and visible to your school</li>
                </>
              ) : (
                <>
                  <li>• The test adapts to your level - don't worry if questions get harder</li>
                  <li>• You can complete the test at any time</li>
                  <li>• Take your time - there's no time limit</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </Card>
    </div>
  )
}
