import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import {
  ClipboardCheck,
  Clock,
  Award,
  ChevronRight,
  AlertTriangle,
  Timer,
  BookOpen,
  Headphones,
  PenTool,
  Mic,
  CheckCircle,
  Play,
  Pause,
} from 'lucide-react'
import { assessmentApi, Assessment } from '../services/assessmentApi'
import { LoadingPage } from '../components/common/LoadingSpinner'
import { Alert } from '../components/common/Alert'
import { Button } from '../components/common/Button'

const LANGUAGES = [
  { code: 'English', name: 'English', flag: '\u{1F1EC}\u{1F1E7}' },
  { code: 'Spanish', name: 'Spanish', flag: '\u{1F1EA}\u{1F1F8}' },
  { code: 'French', name: 'French', flag: '\u{1F1EB}\u{1F1F7}' },
  { code: 'German', name: 'German', flag: '\u{1F1E9}\u{1F1EA}' },
  { code: 'Italian', name: 'Italian', flag: '\u{1F1EE}\u{1F1F9}' },
]

const SKILL_SECTIONS = [
  { icon: BookOpen, label: 'Reading & Language Use', time: '25 min', color: 'text-blue-600 bg-blue-50' },
  { icon: Headphones, label: 'Listening', time: '15 min', color: 'text-green-600 bg-green-50' },
  { icon: PenTool, label: 'Writing', time: '15 min', color: 'text-amber-600 bg-amber-50' },
  { icon: Mic, label: 'Speaking', time: '15 min', color: 'text-purple-600 bg-purple-50' },
]

export function AssessmentPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [error, setError] = useState('')

  const { data: assessments, isLoading } = useQuery('myAssessments', assessmentApi.getMyAssessments)
  const { data: assignedAssessments, isLoading: loadingAssigned } = useQuery('myAssignedAssessments', assessmentApi.getAssignedAssessments)

  const startMultiSkillMutation = useMutation(
    (language: string) => assessmentApi.createMultiSkill(language),
    {
      onSuccess: (assessment) => navigate(`/assessment/multi-skill/${assessment.id}`),
      onError: (err: Error) => setError(err.message),
    }
  )

  const startAssignedMutation = useMutation(
    (a: Assessment) => a.isMultiSkill ? Promise.resolve(a) : assessmentApi.startAssigned(a.id),
    {
      onSuccess: (assessment) => {
        queryClient.invalidateQueries('myAssignedAssessments')
        queryClient.invalidateQueries('myAssessments')
        navigate(assessment.isMultiSkill ? `/assessment/multi-skill/${assessment.id}` : `/assessment/take/${assessment.id}`)
      },
      onError: (err: Error) => setError(err.message),
    }
  )

  // Merge assigned
  const allAssigned = [...(assignedAssessments || []), ...(assessments?.filter(a => a.status === 'ASSIGNED') || [])]
  const assignedMap = new Map<string, Assessment>()
  allAssigned.forEach(a => assignedMap.set(a.id, a))
  const uniqueAssigned = Array.from(assignedMap.values())

  const inProgressMultiSkill = assessments?.find(a => (a.status === 'IN_PROGRESS' || a.status === 'PAUSED') && a.isMultiSkill)
  const completedAssessments = assessments?.filter(a => a.status === 'COMPLETED' && a.isMultiSkill) || []

  // Latest result per language
  const latestByLang = new Map<string, Assessment>()
  completedAssessments.forEach(a => {
    const existing = latestByLang.get(a.language)
    if (!existing || (a.completedAt && existing.completedAt && a.completedAt > existing.completedAt)) {
      latestByLang.set(a.language, a)
    }
  })

  if (isLoading || loadingAssigned) return <LoadingPage />

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 text-white">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-white/10 backdrop-blur rounded-xl">
              <ClipboardCheck className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold">Placement Test</h1>
          </div>
          <p className="text-gray-300 max-w-xl">
            Determine your CEFR level (A1-C2) with a comprehensive placement test covering all four language skills.
          </p>
          <div className="flex flex-wrap gap-3 mt-5">
            {SKILL_SECTIONS.map(s => (
              <div key={s.label} className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur rounded-lg text-sm">
                <s.icon className="w-4 h-4" />
                <span>{s.label}</span>
                <span className="text-gray-400">{s.time}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-3">Total estimated time: ~70 minutes</p>
        </div>
      </div>

      {error && <Alert type="error" message={error} onClose={() => setError('')} />}

      {/* Assigned Tests (priority) */}
      {uniqueAssigned.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-amber-700 uppercase tracking-wide">Assigned to You</h2>
          {uniqueAssigned.map(a => (
            <div key={a.id} className="bg-amber-50 border-2 border-amber-200 rounded-xl p-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{LANGUAGES.find(l => l.code === a.language)?.flag}</span>
                    <p className="font-semibold text-gray-900">{a.language} Placement Test</p>
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                    <span className="flex items-center gap-1"><Timer className="w-4 h-4" /> ~70 min</span>
                    {a.assignedAt && <span>Assigned {new Date(a.assignedAt).toLocaleDateString()}</span>}
                  </div>
                </div>
                <Button
                  onClick={() => startAssignedMutation.mutate(a)}
                  disabled={startAssignedMutation.isLoading}
                  size="lg"
                >
                  Begin Test
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Continue In-Progress */}
      {inProgressMultiSkill && (
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">{LANGUAGES.find(l => l.code === inProgressMultiSkill.language)?.flag}</span>
                <p className="font-semibold text-gray-900">
                  {inProgressMultiSkill.language} Placement Test
                </p>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  inProgressMultiSkill.status === 'PAUSED'
                    ? 'bg-gray-200 text-gray-700'
                    : 'bg-blue-200 text-blue-700'
                }`}>
                  {inProgressMultiSkill.status === 'PAUSED' ? 'Paused' : 'In Progress'}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">Your progress is saved. Continue where you left off.</p>
            </div>
            <Button
              onClick={() => navigate(`/assessment/multi-skill/${inProgressMultiSkill.id}`)}
              size="lg"
              className="flex items-center gap-2"
            >
              {inProgressMultiSkill.status === 'PAUSED' ? <Play className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              Continue
            </Button>
          </div>
        </div>
      )}

      {/* Start New Test */}
      <div>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Start a New Test</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {LANGUAGES.map(lang => {
            const result = latestByLang.get(lang.code)
            const hasInProgress = inProgressMultiSkill?.language === lang.code

            return (
              <div
                key={lang.code}
                className="bg-white border border-gray-200 rounded-xl p-5 hover:border-primary-300 hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{lang.flag}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">{lang.name}</h3>
                    {result ? (
                      <div className="flex items-center gap-1 text-xs text-green-600">
                        <CheckCircle className="w-3 h-3" />
                        <span>Last result: {result.cefrLevel}</span>
                      </div>
                    ) : (
                      <p className="text-xs text-gray-400">Not taken yet</p>
                    )}
                  </div>
                </div>

                {/* Skill levels if completed */}
                {result && (
                  <div className="grid grid-cols-2 gap-1.5 mb-4">
                    <SkillLevel icon={BookOpen} label="Reading" level={result.readingLevel} />
                    <SkillLevel icon={Headphones} label="Listening" level={result.listeningLevel} />
                    <SkillLevel icon={PenTool} label="Writing" level={result.writingLevel} />
                    <SkillLevel icon={Mic} label="Speaking" level={result.speakingLevel} />
                  </div>
                )}

                <button
                  onClick={() => {
                    setError('')
                    if (hasInProgress) {
                      navigate(`/assessment/multi-skill/${inProgressMultiSkill!.id}`)
                    } else {
                      startMultiSkillMutation.mutate(lang.code)
                    }
                  }}
                  disabled={startMultiSkillMutation.isLoading}
                  className="w-full py-2.5 px-4 text-sm font-semibold rounded-lg bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-50 transition-colors group-hover:bg-primary-600"
                >
                  {hasInProgress ? 'Continue' : result ? 'Retake Test' : 'Start Test'}
                </button>
              </div>
            )
          })}
        </div>
      </div>

      {/* Previous Results */}
      {completedAssessments.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Previous Results</h2>
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Language</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-500">Level</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-500">Score</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-500">R</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-500">L</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-500">W</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-500">S</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {completedAssessments.map(a => (
                  <tr key={a.id} className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer" onClick={() => navigate(`/assessment/multi-skill/${a.id}/results`)}>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span>{LANGUAGES.find(l => l.code === a.language)?.flag}</span>
                        <span className="font-medium text-gray-900">{a.language}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      {a.cefrLevel && (
                        <span className="px-2 py-0.5 bg-primary-100 text-primary-700 rounded font-bold text-xs">
                          {a.cefrLevel}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center font-semibold text-gray-900">
                      {a.score != null ? `${a.score}%` : '--'}
                    </td>
                    <td className="py-3 px-4 text-center text-xs">{a.readingLevel || '--'}</td>
                    <td className="py-3 px-4 text-center text-xs">{a.listeningLevel || '--'}</td>
                    <td className="py-3 px-4 text-center text-xs">{a.writingLevel || '--'}</td>
                    <td className="py-3 px-4 text-center text-xs">{a.speakingLevel || '--'}</td>
                    <td className="py-3 px-4 text-xs text-gray-500">
                      {a.completedAt ? new Date(a.completedAt).toLocaleDateString() : '--'}
                    </td>
                    <td className="py-3 px-4"><ChevronRight className="w-4 h-4 text-gray-400" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CEFR Guide */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">CEFR Scale</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { level: 'A1', name: 'Beginner', color: 'bg-emerald-100 text-emerald-800' },
            { level: 'A2', name: 'Elementary', color: 'bg-emerald-200 text-emerald-900' },
            { level: 'B1', name: 'Intermediate', color: 'bg-blue-100 text-blue-800' },
            { level: 'B2', name: 'Upper Int.', color: 'bg-blue-200 text-blue-900' },
            { level: 'C1', name: 'Advanced', color: 'bg-purple-100 text-purple-800' },
            { level: 'C2', name: 'Proficiency', color: 'bg-purple-200 text-purple-900' },
          ].map(l => (
            <div key={l.level} className={`px-3 py-1.5 rounded-lg text-sm font-medium ${l.color}`}>
              {l.level} {l.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function SkillLevel({ icon: Icon, label, level }: { icon: React.ElementType; label: string; level?: string | null }) {
  return (
    <div className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs ${level ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-400'}`}>
      <Icon className="w-3 h-3" />
      <span>{label}</span>
      {level && <span className="font-bold ml-auto">{level}</span>}
    </div>
  )
}
