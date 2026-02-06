import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import { exerciseApi, Exercise, ExerciseAttempt, ExerciseItem, CompletionResult, AnswerResult } from '../services/exerciseApi'
import FillBlanksExercise from '../components/exercises/player/FillBlanksExercise'
import MultipleChoiceExercise from '../components/exercises/player/MultipleChoiceExercise'
import MatchingExercise from '../components/exercises/player/MatchingExercise'
import ExerciseProgress from '../components/exercises/player/ExerciseProgress'
import ExerciseResult from '../components/exercises/player/ExerciseResult'

const ExerciseTakePage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [exercise, setExercise] = useState<Exercise | null>(null)
  const [attempt, setAttempt] = useState<ExerciseAttempt | null>(null)
  const [currentItemIndex, setCurrentItemIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [answeredItems, setAnsweredItems] = useState<Set<string>>(new Set())
  const [currentResult, setCurrentResult] = useState<AnswerResult | null>(null)
  const [completionResult, setCompletionResult] = useState<CompletionResult | null>(null)
  const [elapsedTime, setElapsedTime] = useState(0)

  // Load exercise and start attempt
  useEffect(() => {
    if (id) {
      startExercise(id)
    }
  }, [id])

  // Timer
  useEffect(() => {
    if (attempt && !completionResult) {
      const interval = setInterval(() => {
        setElapsedTime(prev => prev + 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [attempt, completionResult])

  // Check time limit
  useEffect(() => {
    if (exercise?.timeLimit && elapsedTime >= exercise.timeLimit && attempt) {
      handleComplete()
    }
  }, [elapsedTime, exercise?.timeLimit])

  const startExercise = async (exerciseId: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await exerciseApi.startAttempt(exerciseId)
      setExercise(result.exercise)
      setAttempt(result.attempt)

      // Check for existing answers if resuming
      if (result.attempt.answers && Array.isArray(result.attempt.answers)) {
        const answered = new Set(result.attempt.answers.map((a: any) => a.itemId))
        setAnsweredItems(answered)
      }
    } catch (err) {
      setError('Failed to load exercise')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAnswer = async (answer: any) => {
    if (!attempt || !exercise?.items) return

    const currentItem = exercise.items[currentItemIndex]
    if (!currentItem) return

    try {
      const result = await exerciseApi.submitAnswer(attempt.id, {
        itemId: currentItem.id,
        answer
      })

      setCurrentResult(result)
      setAnsweredItems(prev => new Set([...prev, currentItem.id]))
    } catch (err) {
      setError('Failed to submit answer')
    }
  }

  const handleNext = () => {
    if (!exercise?.items) return

    setCurrentResult(null)

    if (currentItemIndex < exercise.items.length - 1) {
      setCurrentItemIndex(prev => prev + 1)
    } else {
      handleComplete()
    }
  }

  const handleComplete = async () => {
    if (!attempt) return

    try {
      const result = await exerciseApi.completeAttempt(attempt.id)
      setCompletionResult(result)
    } catch (err) {
      setError('Failed to complete exercise')
    }
  }

  const handleRetry = () => {
    if (id) {
      setCompletionResult(null)
      setCurrentItemIndex(0)
      setAnsweredItems(new Set())
      setCurrentResult(null)
      setElapsedTime(0)
      startExercise(id)
    }
  }

  const handleExit = () => {
    navigate('/exercises')
  }

  const renderExerciseComponent = (item: ExerciseItem) => {
    const commonProps = {
      item,
      onAnswer: handleAnswer,
      showResult: !!currentResult,
      result: currentResult || undefined,
      disabled: !!currentResult
    }

    switch (exercise?.type) {
      case 'FILL_BLANKS':
        return <FillBlanksExercise {...commonProps} />
      case 'MULTIPLE_CHOICE':
      case 'TRUE_FALSE':
        return <MultipleChoiceExercise {...commonProps} />
      case 'MATCHING':
        return <MatchingExercise {...commonProps} />
      // Add more exercise types as needed
      default:
        return (
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-700">
              Exercise type "{exercise?.type}" is not yet supported in the player.
            </p>
          </div>
        )
    }
  }

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-64 bg-gray-200 rounded" />
        </div>
      </div>
    )
  }

  if (error || !exercise) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <button
          onClick={handleExit}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Exercises
        </button>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-700">{error || 'Exercise not found'}</p>
        </div>
      </div>
    )
  }

  // Show completion result
  if (completionResult) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
          <ExerciseResult
            result={completionResult}
            onRetry={handleRetry}
            onContinue={handleExit}
          />
        </div>
      </div>
    )
  }

  const currentItem = exercise.items?.[currentItemIndex]
  const totalItems = exercise.items?.length || 0
  const isLastItem = currentItemIndex === totalItems - 1

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">{exercise.title}</h1>
          {exercise.instructions && (
            <p className="text-gray-600 mt-1">{exercise.instructions}</p>
          )}
        </div>
        <button
          onClick={handleExit}
          className="p-2 text-gray-400 hover:text-gray-600"
          title="Exit exercise"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Progress bar */}
      <ExerciseProgress
        currentItem={currentItemIndex}
        totalItems={totalItems}
        answeredItems={answeredItems.size}
        timeLimit={exercise.timeLimit}
        elapsedTime={elapsedTime}
      />

      {/* Exercise content */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
        {/* Question number */}
        <div className="mb-6">
          <span className="text-sm text-gray-500">
            Question {currentItemIndex + 1} of {totalItems}
          </span>
          {currentItem?.points && currentItem.points > 1 && (
            <span className="ml-2 text-sm text-blue-600">
              ({currentItem.points} points)
            </span>
          )}
        </div>

        {/* Exercise component */}
        {currentItem && renderExerciseComponent(currentItem)}

        {/* Navigation */}
        {currentResult && (
          <div className="mt-8 flex justify-end">
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {isLastItem ? 'Finish' : 'Next Question'}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ExerciseTakePage
