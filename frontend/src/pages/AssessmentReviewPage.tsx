import { useParams, Link } from 'react-router-dom'
import { useQuery, useMutation } from 'react-query'
import { ArrowLeft, CheckCircle, XCircle, Download, BookOpen, Filter } from 'lucide-react'
import { useState } from 'react'
import { assessmentApi } from '../services/assessmentApi'
import { useAuth } from '../contexts/AuthContext'
import { LoadingPage } from '../components/common/LoadingSpinner'
import { Alert } from '../components/common/Alert'
import { Card } from '../components/common/Card'

const LEVEL_COLORS: Record<string, string> = {
  A1: 'bg-green-100 text-green-700 border-green-200',
  A2: 'bg-green-50 text-green-700 border-green-200',
  B1: 'bg-blue-100 text-blue-700 border-blue-200',
  B2: 'bg-blue-50 text-blue-700 border-blue-200',
  C1: 'bg-purple-100 text-purple-700 border-purple-200',
  C2: 'bg-purple-50 text-purple-700 border-purple-200'
}

type FilterMode = 'all' | 'wrong' | 'correct'

export function AssessmentReviewPage() {
  const { id } = useParams<{ id: string }>()
  const { user } = useAuth()
  const [filter, setFilter] = useState<FilterMode>('all')
  const [levelFilter, setLevelFilter] = useState<string | null>(null)

  const { data, isLoading, error } = useQuery(
    ['assessment-detailed', id],
    () => assessmentApi.getDetailedResults(id!),
    { enabled: !!id }
  )

  const downloadPdf = useMutation(
    () => assessmentApi.downloadResultsPdf(id!),
    {
      onSuccess: (blob) => {
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${data?.assessment.language || 'placement'}-results.pdf`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      }
    }
  )

  if (isLoading) return <LoadingPage />

  if (error || !data) {
    return (
      <div className="max-w-4xl mx-auto">
        <Alert type="error" message="Failed to load assessment details" />
      </div>
    )
  }

  const { assessment, student, levelBreakdown, answers } = data
  const isAdmin = user?.role === 'ADMIN'

  const filteredAnswers = answers.filter(a => {
    const matchesFilter = filter === 'all' || (filter === 'wrong' && !a.isCorrect) || (filter === 'correct' && a.isCorrect)
    const matchesLevel = !levelFilter || a.cefrLevel === levelFilter
    return matchesFilter && matchesLevel
  })

  const wrongCount = answers.filter(a => !a.isCorrect).length
  const levelsInTest = [...new Set(answers.map(a => a.cefrLevel))].sort()

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back link */}
      <Link
        to={isAdmin ? `/admin/student/${student.id}/assessments` : '/assessment'}
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-4 h-4" />
        {isAdmin ? 'Back to Student Assessments' : 'Back to Assessments'}
      </Link>

      {/* Header Card */}
      <Card className="relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-2 bg-primary-600" />

        <div className="flex items-start justify-between mt-2">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {assessment.language} Placement Test Review
            </h1>
            {isAdmin && (
              <p className="text-gray-500 mt-1">
                Student: <strong>{student.name}</strong> ({student.email})
              </p>
            )}
            <p className="text-sm text-gray-400 mt-1">
              Completed: {assessment.completedAt ? new Date(assessment.completedAt).toLocaleDateString() : 'N/A'}
            </p>
          </div>

          <button
            onClick={() => downloadPdf.mutate()}
            disabled={downloadPdf.isLoading}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
          >
            <Download className="w-4 h-4" />
            {downloadPdf.isLoading ? 'Generating...' : 'Download PDF'}
          </button>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-4 gap-4 mt-6">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-primary-600">{assessment.cefrLevel}</p>
            <p className="text-xs text-gray-500">{assessment.cefrName}</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-gray-900">{assessment.score}%</p>
            <p className="text-xs text-gray-500">Score</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-green-600">{assessment.correctAnswers}</p>
            <p className="text-xs text-gray-500">Correct</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-red-500">{wrongCount}</p>
            <p className="text-xs text-gray-500">Mistakes</p>
          </div>
        </div>
      </Card>

      {/* Level Breakdown */}
      <Card>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Performance by Level</h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {(['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const).map(level => {
            const data = levelBreakdown[level]
            if (!data) return (
              <div key={level} className="text-center p-3 bg-gray-50 rounded-lg opacity-40">
                <p className="font-bold text-gray-400">{level}</p>
                <p className="text-xs text-gray-400">-</p>
              </div>
            )
            const pct = Math.round((data.correct / data.total) * 100)
            return (
              <div key={level} className={`text-center p-3 rounded-lg border ${pct >= 60 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                <p className="font-bold text-gray-900">{level}</p>
                <p className={`text-lg font-bold ${pct >= 60 ? 'text-green-600' : 'text-red-500'}`}>{pct}%</p>
                <p className="text-xs text-gray-500">{data.correct}/{data.total}</p>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Filters */}
      <Card>
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filter:</span>
          </div>

          <div className="flex gap-2">
            {([
              { key: 'all' as FilterMode, label: 'All', count: answers.length },
              { key: 'wrong' as FilterMode, label: 'Mistakes', count: wrongCount },
              { key: 'correct' as FilterMode, label: 'Correct', count: assessment.correctAnswers }
            ]).map(f => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  filter === f.key
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {f.label} ({f.count})
              </button>
            ))}
          </div>

          <div className="h-6 w-px bg-gray-200" />

          <div className="flex gap-1.5">
            <button
              onClick={() => setLevelFilter(null)}
              className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                !levelFilter ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All Levels
            </button>
            {levelsInTest.map(level => (
              <button
                key={level}
                onClick={() => setLevelFilter(level)}
                className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                  levelFilter === level ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredAnswers.map((answer) => {
          const globalIndex = answers.indexOf(answer) + 1

          return (
            <Card
              key={answer.questionId}
              className={`border-l-4 ${answer.isCorrect ? 'border-l-green-500' : 'border-l-red-500'}`}
            >
              {/* Question header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {answer.isCorrect ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                  <span className="text-sm font-medium text-gray-500">Question {globalIndex}</span>
                  <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${LEVEL_COLORS[answer.cefrLevel] || 'bg-gray-100'}`}>
                    {answer.cefrLevel}
                  </span>
                  <span className="text-xs text-gray-400 capitalize">
                    {answer.questionType.replace('_', ' ').toLowerCase()}
                  </span>
                </div>
                <span className="text-xs text-gray-400">
                  {answer.points > 0 ? `+${answer.points} pts` : '0 pts'}
                </span>
              </div>

              {/* Passage if READING */}
              {answer.passage && (
                <div className="mb-3 p-3 bg-blue-50 border-l-4 border-blue-300 rounded-r-lg">
                  {answer.passageTitle && (
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-blue-800 text-sm">{answer.passageTitle}</span>
                    </div>
                  )}
                  <p className="text-sm text-blue-900 leading-relaxed">{answer.passage}</p>
                </div>
              )}

              {/* Question text */}
              <p className="text-gray-900 font-medium mb-3">{answer.questionText}</p>

              {/* Options display for MC/READING */}
              {answer.options && (
                <div className="space-y-2 mb-3">
                  {(answer.options as { label: string; value: string }[]).map(opt => {
                    const isStudentChoice = opt.value === answer.studentAnswer
                    const isCorrectOption = opt.value === answer.correctAnswer

                    let optionStyle = 'bg-gray-50 border-gray-200 text-gray-700'
                    if (isCorrectOption) {
                      optionStyle = 'bg-green-50 border-green-300 text-green-800'
                    }
                    if (isStudentChoice && !answer.isCorrect) {
                      optionStyle = 'bg-red-50 border-red-300 text-red-800'
                    }

                    return (
                      <div
                        key={opt.value}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm ${optionStyle}`}
                      >
                        {isCorrectOption && <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />}
                        {isStudentChoice && !answer.isCorrect && <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />}
                        {!isCorrectOption && !(isStudentChoice && !answer.isCorrect) && (
                          <div className="w-4 h-4 flex-shrink-0" />
                        )}
                        <span>{opt.label}</span>
                        {isStudentChoice && !answer.isCorrect && (
                          <span className="ml-auto text-xs text-red-500 font-medium">Student's answer</span>
                        )}
                        {isCorrectOption && (
                          <span className="ml-auto text-xs text-green-600 font-medium">Correct answer</span>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}

              {/* For FILL_BLANK: show text answers */}
              {!answer.options && (
                <div className="space-y-2">
                  <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm ${
                    answer.isCorrect ? 'bg-green-50 border-green-300 text-green-800' : 'bg-red-50 border-red-300 text-red-800'
                  }`}>
                    {answer.isCorrect ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-500" />
                    )}
                    <span>Student's answer: <strong>{answer.studentAnswer}</strong></span>
                  </div>
                  {!answer.isCorrect && (
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg border bg-green-50 border-green-300 text-green-800 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Correct answer: <strong>{answer.correctAnswer}</strong></span>
                    </div>
                  )}
                </div>
              )}
            </Card>
          )
        })}
      </div>

      {filteredAnswers.length === 0 && (
        <Card className="text-center py-8">
          <p className="text-gray-500">
            {filter === 'wrong' ? 'No mistakes found — great job!' : 'No questions match the current filter.'}
          </p>
        </Card>
      )}
    </div>
  )
}

export default AssessmentReviewPage
