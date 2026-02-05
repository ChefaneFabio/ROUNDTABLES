import { useParams, useNavigate, Link } from 'react-router-dom'
import { useQuery, useMutation } from 'react-query'
import { Award, Download, ChevronRight, BookOpen, MessageCircle } from 'lucide-react'
import { assessmentApi } from '../services/assessmentApi'
import { certificateApi } from '../services/certificateApi'
import { LoadingPage } from '../components/common/LoadingSpinner'
import { Alert } from '../components/common/Alert'
import { Card } from '../components/common/Card'

const CEFR_DESCRIPTIONS: Record<string, { name: string; description: string; color: string }> = {
  A1: {
    name: 'Beginner',
    description: 'You can understand and use familiar everyday expressions and very basic phrases.',
    color: 'bg-green-500'
  },
  A2: {
    name: 'Elementary',
    description: 'You can communicate in simple and routine tasks requiring a simple and direct exchange of information.',
    color: 'bg-green-600'
  },
  B1: {
    name: 'Intermediate',
    description: 'You can deal with most situations likely to arise while traveling. You can produce simple connected text on familiar topics.',
    color: 'bg-blue-500'
  },
  B2: {
    name: 'Upper Intermediate',
    description: 'You can interact with a degree of fluency and spontaneity that makes regular interaction with native speakers possible.',
    color: 'bg-blue-600'
  },
  C1: {
    name: 'Advanced',
    description: 'You can express ideas fluently and spontaneously. You can use language flexibly and effectively for social, academic and professional purposes.',
    color: 'bg-purple-500'
  },
  C2: {
    name: 'Proficiency',
    description: 'You can understand with ease virtually everything heard or read. You can express yourself spontaneously, very fluently and precisely.',
    color: 'bg-purple-600'
  }
}

export function AssessmentResultPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const { data: assessment, isLoading, error } = useQuery(
    ['assessment', id],
    () => assessmentApi.getById(id!),
    { enabled: !!id }
  )

  const generateCertificate = useMutation(
    () => certificateApi.generateAssessmentCertificate(id!),
    {
      onSuccess: (certificate) => {
        navigate(`/certificates/${certificate.id}`)
      }
    }
  )

  if (isLoading) return <LoadingPage />

  if (error || !assessment) {
    return (
      <div className="max-w-4xl mx-auto">
        <Alert type="error" message="Failed to load assessment results" />
      </div>
    )
  }

  if (assessment.status !== 'COMPLETED') {
    navigate(`/assessment/take/${id}`)
    return null
  }

  const cefrInfo = CEFR_DESCRIPTIONS[assessment.cefrLevel || 'B1']
  const answers = (assessment.answers as any[]) || []
  const correctCount = answers.filter(a => a.isCorrect).length

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Result Header */}
      <Card className="text-center relative overflow-hidden">
        <div className={`absolute top-0 left-0 right-0 h-2 ${cefrInfo.color}`} />

        <Award className="w-16 h-16 text-primary-600 mx-auto mb-4 mt-4" />

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Congratulations!</h1>
        <p className="text-gray-600 mb-6">You've completed the {assessment.language} placement test</p>

        <div className="inline-block px-8 py-4 bg-gray-50 rounded-xl mb-6">
          <p className="text-sm text-gray-500 mb-1">Your CEFR Level</p>
          <p className="text-5xl font-bold text-primary-600 mb-1">{assessment.cefrLevel}</p>
          <p className="text-lg font-medium text-gray-700">{cefrInfo.name}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto text-center">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-gray-900">{assessment.score}%</p>
            <p className="text-sm text-gray-500">Score</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-gray-900">
              {correctCount}/{answers.length}
            </p>
            <p className="text-sm text-gray-500">Correct</p>
          </div>
        </div>
      </Card>

      {/* Level Description */}
      <Card>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">What this means</h2>
        <p className="text-gray-600">{cefrInfo.description}</p>
      </Card>

      {/* Level Breakdown */}
      {answers.length > 0 && (
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Performance by Level</h2>
          <div className="space-y-3">
            {(['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const).map((level) => {
              const levelAnswers = answers.filter(a => a.cefrLevel === level)
              if (levelAnswers.length === 0) return null

              const levelCorrect = levelAnswers.filter(a => a.isCorrect).length
              const percentage = Math.round((levelCorrect / levelAnswers.length) * 100)

              return (
                <div key={level}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{level}</span>
                    <span className="text-sm text-gray-500">
                      {levelCorrect}/{levelAnswers.length} ({percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        percentage >= 60 ? 'bg-green-500' : 'bg-red-400'
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </Card>
      )}

      {/* Actions */}
      <Card>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">What's Next?</h2>
        <div className="space-y-3">
          <button
            onClick={() => generateCertificate.mutate()}
            disabled={generateCertificate.isLoading}
            className="w-full flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-all"
          >
            <div className="flex items-center gap-3">
              <Download className="w-5 h-5 text-primary-600" />
              <div className="text-left">
                <p className="font-medium text-gray-900">Get Your Certificate</p>
                <p className="text-sm text-gray-500">Download and share your achievement</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <Link
            to="/courses"
            className="w-full flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-all"
          >
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-primary-600" />
              <div className="text-left">
                <p className="font-medium text-gray-900">Browse Courses</p>
                <p className="text-sm text-gray-500">Find courses for your level</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </Link>

          <Link
            to="/chat"
            className="w-full flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-all"
          >
            <div className="flex items-center gap-3">
              <MessageCircle className="w-5 h-5 text-primary-600" />
              <div className="text-left">
                <p className="font-medium text-gray-900">Practice with AI Coach</p>
                <p className="text-sm text-gray-500">Start a conversation at your level</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </Link>
        </div>
      </Card>

      {/* Back to Assessments */}
      <div className="text-center">
        <Link to="/assessment" className="text-primary-600 hover:text-primary-700 font-medium">
          Back to Assessments
        </Link>
      </div>
    </div>
  )
}
