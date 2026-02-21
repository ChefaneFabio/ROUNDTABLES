import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { assessmentApi } from '../services/assessmentApi'

const SKILL_META: Record<string, { icon: string; label: string; color: string; bg: string }> = {
  READING: { icon: '📖', label: 'Reading', color: 'text-blue-700', bg: 'bg-blue-100' },
  LISTENING: { icon: '🎧', label: 'Listening', color: 'text-green-700', bg: 'bg-green-100' },
  WRITING: { icon: '✍️', label: 'Writing', color: 'text-amber-700', bg: 'bg-amber-100' },
  SPEAKING: { icon: '🎤', label: 'Speaking', color: 'text-purple-700', bg: 'bg-purple-100' }
}

const LEVEL_NAMES: Record<string, string> = {
  A1: 'Beginner', A2: 'Elementary', B1: 'Intermediate',
  B2: 'Upper Intermediate', C1: 'Advanced', C2: 'Proficiency'
}

export function MultiSkillResultPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [results, setResults] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    assessmentApi.getMultiSkillResults(id).then(data => {
      setResults(data)
      setLoading(false)
    }).catch(err => {
      setError(err.response?.data?.error || err.message)
      setLoading(false)
    })
  }, [id])

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error || !results) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
        <p>{error || 'Results not available'}</p>
      </div>
    )
  }

  const { assessment, sections } = results

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Overall result */}
      <div className="text-center bg-white rounded-xl shadow-lg p-8 border">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">4-Skills Placement Test Results</h1>
        <p className="text-gray-500 mb-6">{assessment.language} &middot; {assessment.student?.name}</p>

        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="text-6xl font-bold text-blue-600">{assessment.cefrLevel || 'N/A'}</div>
          <div className="text-left">
            <p className="text-xl font-semibold text-gray-800">
              {LEVEL_NAMES[assessment.cefrLevel] || 'Pending'}
            </p>
            <p className="text-gray-500">Overall Level</p>
          </div>
        </div>

        {assessment.score != null && (
          <div className="inline-block px-4 py-2 bg-gray-100 rounded-lg">
            <span className="text-lg font-bold text-gray-700">{assessment.score}%</span>
            <span className="text-gray-500 ml-1 text-sm">average score</span>
          </div>
        )}
      </div>

      {/* Per-skill breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sections.map((section: any) => {
          const meta = SKILL_META[section.skill]
          const score = section.finalScore || section.aiScore
          const level = score?.cefrLevel || section.cefrLevel

          return (
            <div key={section.id} className={`${meta.bg} rounded-xl p-6 border`}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{meta.icon}</span>
                <div>
                  <h3 className={`text-lg font-bold ${meta.color}`}>{meta.label}</h3>
                  <p className="text-xs text-gray-500">
                    {section.questionsAnswered}/{section.questionsTotal} questions
                  </p>
                </div>
              </div>

              <div className="flex items-baseline gap-2">
                <span className={`text-3xl font-bold ${meta.color}`}>{level || '...'}</span>
                <span className="text-sm text-gray-500">{LEVEL_NAMES[level] || 'Evaluating...'}</span>
              </div>

              {section.percentageScore != null && (
                <div className="mt-3">
                  <div className="w-full bg-white/50 rounded-full h-2">
                    <div
                      className="bg-current rounded-full h-2 transition-all"
                      style={{ width: `${section.percentageScore}%`, color: meta.color.replace('text-', '') }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{section.percentageScore}%</p>
                </div>
              )}

              {section.status === 'COMPLETED' && !level && (
                <p className="mt-2 text-xs text-gray-500 italic">AI evaluation pending...</p>
              )}

              {section.teacherScore && (
                <p className="mt-2 text-xs text-green-700 font-medium">Teacher reviewed</p>
              )}
            </div>
          )
        })}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => navigate('/assessment')}
          className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Back to Assessments
        </button>
        <button
          onClick={async () => {
            try {
              const blob = await assessmentApi.downloadMultiSkillResultsPdf(id!)
              const url = URL.createObjectURL(blob)
              const a = document.createElement('a')
              a.href = url
              a.download = `${assessment.language}-4skills-results.pdf`
              a.click()
              URL.revokeObjectURL(url)
            } catch {
              alert('PDF download not available yet.')
            }
          }}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Download PDF
        </button>
      </div>
    </div>
  )
}
