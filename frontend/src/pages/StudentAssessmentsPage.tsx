import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { ArrowLeft, ClipboardCheck, Clock, CheckCircle, XCircle, Plus, ShieldAlert } from 'lucide-react'
import { assessmentApi } from '../services/assessmentApi'
import { studentsApi } from '../services/api'
import { LoadingPage } from '../components/common/LoadingSpinner'
import { Alert } from '../components/common/Alert'
import { Card } from '../components/common/Card'

const LEVEL_COLORS: Record<string, string> = {
  A1: 'bg-green-100 text-green-700',
  A2: 'bg-green-200 text-green-800',
  B1: 'bg-blue-100 text-blue-700',
  B2: 'bg-blue-200 text-blue-800',
  C1: 'bg-purple-100 text-purple-700',
  C2: 'bg-purple-200 text-purple-800'
}

const STATUS_STYLES: Record<string, { bg: string; icon: typeof CheckCircle }> = {
  COMPLETED: { bg: 'bg-green-100 text-green-700', icon: CheckCircle },
  IN_PROGRESS: { bg: 'bg-yellow-100 text-yellow-700', icon: Clock },
  ASSIGNED: { bg: 'bg-amber-100 text-amber-700', icon: ClipboardCheck },
  EXPIRED: { bg: 'bg-red-100 text-red-700', icon: XCircle }
}

const LANGUAGES = [
  { code: 'English', name: 'English' },
  { code: 'Italian', name: 'Italian' },
  { code: 'Spanish', name: 'Spanish' },
  { code: 'French', name: 'French' },
  { code: 'German', name: 'German' }
]

const TIME_OPTIONS = [
  { value: 30, label: '30 minutes' },
  { value: 45, label: '45 minutes' },
  { value: 60, label: '60 minutes' },
  { value: 90, label: '90 minutes' }
]

export function StudentAssessmentsPage() {
  const { studentId } = useParams<{ studentId: string }>()
  const queryClient = useQueryClient()
  const [showAssignModal, setShowAssignModal] = useState(false)
  const [assignLanguage, setAssignLanguage] = useState('English')
  const [assignTimeLimit, setAssignTimeLimit] = useState(60)

  const { data: student, isLoading: loadingStudent } = useQuery(
    ['student', studentId],
    () => studentsApi.getById(studentId!),
    { enabled: !!studentId }
  )

  const { data: assessments, isLoading: loadingAssessments, error } = useQuery(
    ['student-assessments', studentId],
    () => assessmentApi.getStudentAssessments(studentId!),
    { enabled: !!studentId }
  )

  const assignMutation = useMutation(
    () => assessmentApi.assignAssessment({
      studentIds: [studentId!],
      language: assignLanguage,
      timeLimitMin: assignTimeLimit
    }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['student-assessments', studentId])
        setShowAssignModal(false)
      }
    }
  )

  if (loadingStudent || loadingAssessments) return <LoadingPage />

  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <Alert type="error" message="Failed to load student assessments" />
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Back link */}
      <Link to="/students" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900">
        <ArrowLeft className="w-4 h-4" />
        Back to Students
      </Link>

      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-xl font-bold text-blue-600">
            {student?.user?.name?.charAt(0)?.toUpperCase() || '?'}
          </span>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{student?.user?.name || 'Student'}</h1>
          <p className="text-gray-500">{student?.user?.email}</p>
        </div>
        {student?.languageLevel && (
          <span className={`ml-auto px-3 py-1.5 rounded-lg text-sm font-semibold ${LEVEL_COLORS[student.languageLevel] || 'bg-gray-100 text-gray-700'}`}>
            Current Level: {student.languageLevel}
          </span>
        )}
        <button
          onClick={() => setShowAssignModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Assign Placement Test
        </button>
      </div>

      {/* Assessments List */}
      <Card>
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <ClipboardCheck className="w-5 h-5 text-primary-600" />
          Placement Tests ({assessments?.length || 0})
        </h2>

        {!assessments || assessments.length === 0 ? (
          <p className="text-gray-500 text-center py-8">This student has not taken any assessments yet.</p>
        ) : (
          <div className="space-y-3">
            {assessments.map((a: any) => {
              const statusStyle = STATUS_STYLES[a.status] || STATUS_STYLES.EXPIRED
              const StatusIcon = statusStyle.icon
              const answers = (a.answers as any[]) || []
              const correctCount = answers.filter((ans: any) => ans.isCorrect).length
              const violations = (a.violations as any[]) || []

              return (
                <div key={a.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-primary-200 hover:bg-gray-50 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-center">
                      <span className="text-sm font-semibold text-gray-900">{a.language}</span>
                      <span className="text-xs text-gray-500 capitalize">{a.type?.toLowerCase()}</span>
                    </div>

                    <div className="h-10 w-px bg-gray-200" />

                    <div>
                      {a.status === 'COMPLETED' ? (
                        <div className="flex items-center gap-3">
                          <span className={`px-2 py-1 rounded text-sm font-bold ${LEVEL_COLORS[a.cefrLevel] || 'bg-gray-100'}`}>
                            {a.cefrLevel}
                          </span>
                          <span className="text-sm text-gray-600">
                            Score: <strong>{a.score}%</strong> ({correctCount}/{answers.length} correct)
                          </span>
                        </div>
                      ) : (
                        <span className={`px-2 py-1 rounded text-xs font-medium ${statusStyle.bg}`}>
                          <StatusIcon className="w-3 h-3 inline mr-1" />
                          {a.status.replace('_', ' ')}
                        </span>
                      )}
                      <p className="text-xs text-gray-400 mt-1">
                        {a.assignedAt ? `Assigned: ${new Date(a.assignedAt).toLocaleDateString()}` : ''}
                        {a.startedAt ? ` | Started: ${new Date(a.startedAt).toLocaleDateString()}` : ''}
                        {a.completedAt ? ` | Completed: ${new Date(a.completedAt).toLocaleDateString()}` : ''}
                        {a.timeLimitMin ? ` | Time limit: ${a.timeLimitMin} min` : ''}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {violations.length > 0 && (
                      <span className="flex items-center gap-1 px-2 py-1 bg-red-50 text-red-600 rounded text-xs font-medium" title={`${violations.length} violations recorded`}>
                        <ShieldAlert className="w-3 h-3" />
                        {violations.length}
                      </span>
                    )}
                    {a.status === 'COMPLETED' && (
                      <Link
                        to={`/admin/assessment/${a.id}/review`}
                        className="px-3 py-1.5 text-sm font-medium text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
                      >
                        View Details
                      </Link>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </Card>

      {/* Assign Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Assign Placement Test</h2>
            <p className="text-sm text-gray-600 mb-4">
              Assign a timed placement test to {student?.user?.name || 'this student'}.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                <select
                  value={assignLanguage}
                  onChange={e => setAssignLanguage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {LANGUAGES.map(l => (
                    <option key={l.code} value={l.code}>{l.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time Limit</label>
                <select
                  value={assignTimeLimit}
                  onChange={e => setAssignTimeLimit(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {TIME_OPTIONS.map(t => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowAssignModal(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => assignMutation.mutate()}
                disabled={assignMutation.isLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {assignMutation.isLoading ? 'Assigning...' : 'Assign Test'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default StudentAssessmentsPage
