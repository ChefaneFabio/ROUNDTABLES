import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import {
  ClipboardCheck,
  Clock,
  Award,
  ChevronRight,
  Play,
  AlertTriangle,
  Timer,
  BookOpen,
  Headphones,
  PenTool,
  Mic,
  CheckCircle,
} from 'lucide-react'
import { assessmentApi, Assessment } from '../services/assessmentApi'
import { LoadingPage } from '../components/common/LoadingSpinner'
import { Alert } from '../components/common/Alert'
import { Button } from '../components/common/Button'
import { Card } from '../components/common/Card'

const LANGUAGES = [
  { code: 'English', name: 'English', flag: '\u{1F310}' },
  { code: 'Spanish', name: 'Spanish', flag: '\u{1F1EA}\u{1F1F8}' },
  { code: 'French', name: 'French', flag: '\u{1F1EB}\u{1F1F7}' },
  { code: 'German', name: 'German', flag: '\u{1F1E9}\u{1F1EA}' },
  { code: 'Italian', name: 'Italian', flag: '\u{1F1EE}\u{1F1F9}' },
]

export function AssessmentPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [error, setError] = useState('')
  const [filterLanguage, setFilterLanguage] = useState('')

  const { data: assessments, isLoading } = useQuery(
    'myAssessments',
    assessmentApi.getMyAssessments
  )

  const { data: assignedAssessments, isLoading: loadingAssigned } = useQuery(
    'myAssignedAssessments',
    assessmentApi.getAssignedAssessments
  )

  const startMutation = useMutation(
    (language: string) => assessmentApi.startAssessment(language, 'PLACEMENT'),
    {
      onSuccess: (assessment) => {
        navigate(`/assessment/take/${assessment.id}`)
      },
      onError: (err: Error) => setError(err.message),
    }
  )

  const startMultiSkillMutation = useMutation(
    (language: string) => assessmentApi.createMultiSkill(language),
    {
      onSuccess: (assessment) => {
        navigate(`/assessment/multi-skill/${assessment.id}`)
      },
      onError: (err: Error) => setError(err.message),
    }
  )

  const startAssignedMutation = useMutation(
    (a: Assessment) => {
      if (a.isMultiSkill) {
        // For multi-skill assigned tests, navigate directly to the assessment hub
        return Promise.resolve(a)
      }
      return assessmentApi.startAssigned(a.id)
    },
    {
      onSuccess: (assessment) => {
        queryClient.invalidateQueries('myAssignedAssessments')
        queryClient.invalidateQueries('myAssessments')
        if (assessment.isMultiSkill) {
          navigate(`/assessment/multi-skill/${assessment.id}`)
        } else {
          navigate(`/assessment/take/${assessment.id}`)
        }
      },
      onError: (err: Error) => setError(err.message),
    }
  )

  const allAssigned = [
    ...(assignedAssessments || []),
    ...(assessments?.filter(a => a.status === 'ASSIGNED') || []),
  ]
  // Deduplicate by id
  const assignedMap = new Map<string, Assessment>()
  allAssigned.forEach(a => assignedMap.set(a.id, a))
  const uniqueAssigned = Array.from(assignedMap.values())

  const inProgressQuick = assessments?.find(a => a.status === 'IN_PROGRESS' && !a.isMultiSkill)
  const inProgressMultiSkill = assessments?.find(a => (a.status === 'IN_PROGRESS' || a.status === 'PAUSED') && a.isMultiSkill)
  const completedAssessments = assessments?.filter(a => a.status === 'COMPLETED') || []

  // Build a map of completed results by language+type for the catalog
  const completedMap = new Map<string, Assessment>()
  completedAssessments.forEach(a => {
    const key = `${a.language}-${a.isMultiSkill ? '4skill' : 'quick'}`
    const existing = completedMap.get(key)
    if (!existing || (a.completedAt && existing.completedAt && a.completedAt > existing.completedAt)) {
      completedMap.set(key, a)
    }
  })

  // Derive languages the student has interacted with (taken or assigned)
  const allStudentAssessments = [...(assessments || []), ...uniqueAssigned]
  const studentLanguages = [...new Set(allStudentAssessments.map(a => a.language))].sort()

  // Filter catalog languages — show all if no filter, or only the selected language
  const visibleLanguages = filterLanguage
    ? LANGUAGES.filter(l => l.code === filterLanguage)
    : LANGUAGES

  // Filter completed results by language
  const filteredCompleted = filterLanguage
    ? completedAssessments.filter(a => a.language === filterLanguage)
    : completedAssessments

  if (isLoading || loadingAssigned) return <LoadingPage />

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-purple-600 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <ClipboardCheck className="w-8 h-8" />
          <h1 className="text-2xl font-bold">Language Assessment Center</h1>
        </div>
        <p className="text-primary-100">
          Take a standardized placement test to determine your CEFR level (A1-C2). Choose a quick grammar test or a comprehensive placement test.
        </p>
      </div>

      {error && <Alert type="error" message={error} />}

      {/* Language filter */}
      {studentLanguages.length > 0 && (
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">Filter by language:</span>
          <select
            value={filterLanguage}
            onChange={e => setFilterLanguage(e.target.value)}
            className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500"
          >
            <option value="">All Languages</option>
            {studentLanguages.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>
      )}

      {/* Assigned Tests */}
      {uniqueAssigned.length > 0 && (
        <Card className="border-2 border-amber-300 bg-amber-50">
          <h2 className="text-lg font-semibold text-amber-800 mb-4 flex items-center gap-2">
            <ClipboardCheck className="w-5 h-5" />
            Assigned Tests
          </h2>
          <div className="space-y-3">
            {uniqueAssigned.map(a => (
              <div key={a.id} className="bg-white rounded-lg p-4 border border-amber-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-900">
                        {a.language} {a.isMultiSkill ? 'Placement Test' : 'Placement Test'}
                      </p>
                      {a.isMultiSkill && (
                        <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                          Placement
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Timer className="w-4 h-4" />
                        {a.isMultiSkill ? '~90 min' : `${a.timeLimitMin || 30} minutes`}
                      </span>
                      {a.assignedAt && (
                        <span>Assigned: {new Date(a.assignedAt).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                  <Button
                    onClick={() => startAssignedMutation.mutate(a)}
                    disabled={startAssignedMutation.isLoading}
                    className="flex items-center gap-2"
                  >
                    {startAssignedMutation.isLoading ? 'Starting...' : 'Begin Test'}
                  </Button>
                </div>
                {!a.isMultiSkill && (
                  <div className="mt-3 flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-amber-700">
                      This is a timed test. Once you start, you have {a.timeLimitMin || 30} minutes to complete it.
                      Tab switches, copy attempts, and other violations are monitored.
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Continue In-Progress */}
      {(inProgressQuick || inProgressMultiSkill) && (
        <div className="space-y-3">
          {inProgressQuick && (
            <Card className="border-2 border-primary-200 bg-primary-50">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 text-primary-700 mb-1">
                    <Clock className="w-5 h-5" />
                    <span className="font-medium">Quick Placement In Progress</span>
                  </div>
                  <p className="text-gray-600">
                    Continue your {inProgressQuick.language} placement test
                  </p>
                </div>
                <Button
                  onClick={() => navigate(`/assessment/take/${inProgressQuick.id}`)}
                  className="flex items-center gap-2"
                >
                  Continue <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          )}

          {inProgressMultiSkill && (
            <Card className="border-2 border-purple-200 bg-purple-50">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 text-purple-700 mb-1">
                    <ClipboardCheck className="w-5 h-5" />
                    <span className="font-medium">Placement Test In Progress</span>
                  </div>
                  <p className="text-gray-600">
                    Continue your {inProgressMultiSkill.language} placement test
                  </p>
                </div>
                <Button
                  onClick={() => navigate(`/assessment/multi-skill/${inProgressMultiSkill.id}`)}
                  className="flex items-center gap-2"
                >
                  Continue <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          )}
        </div>
      )}

      {/* Test Catalog */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Available Tests</h2>
        <div className="grid gap-4">
          {visibleLanguages.map(lang => {
            const quickResult = completedMap.get(`${lang.code}-quick`)
            const multiResult = completedMap.get(`${lang.code}-4skill`)
            const hasQuickInProgress = inProgressQuick?.language === lang.code
            const hasMultiInProgress = inProgressMultiSkill?.language === lang.code

            return (
              <Card key={lang.code} className="hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  {/* Language header */}
                  <div className="text-3xl">{lang.flag}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900">{lang.name}</h3>
                    <div className="mt-3 grid md:grid-cols-2 gap-3">
                      {/* Quick Placement Card */}
                      <div className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Play className="w-4 h-4 text-primary-600" />
                            <span className="font-medium text-sm text-gray-900">Quick Placement</span>
                          </div>
                          {quickResult && (
                            <span className="flex items-center gap-1 text-xs text-green-600">
                              <CheckCircle className="w-3 h-3" />
                              {quickResult.cefrLevel}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mb-3">
                          Grammar & Vocabulary (~25 min). Adaptive multiple-choice and fill-in-the-blank questions.
                        </p>
                        <button
                          onClick={() => {
                            setError('')
                            if (hasQuickInProgress) {
                              navigate(`/assessment/take/${inProgressQuick!.id}`)
                            } else {
                              startMutation.mutate(lang.code)
                            }
                          }}
                          disabled={startMutation.isLoading}
                          className="w-full py-2 px-3 text-sm font-medium rounded-lg bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50 transition-colors"
                        >
                          {hasQuickInProgress ? 'Continue' : quickResult ? 'Retake' : 'Start'}
                        </button>
                      </div>

                      {/* Placement Card */}
                      <div className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Award className="w-4 h-4 text-purple-600" />
                            <span className="font-medium text-sm text-gray-900">Placement Test</span>
                          </div>
                          {multiResult && (
                            <span className="flex items-center gap-1 text-xs text-green-600">
                              <CheckCircle className="w-3 h-3" />
                              {multiResult.cefrLevel}
                            </span>
                          )}
                        </div>
                        <div className="flex gap-2 mb-2">
                          <SkillBadge icon={BookOpen} label="Read" result={multiResult?.readingLevel} />
                          <SkillBadge icon={Headphones} label="Listen" result={multiResult?.listeningLevel} />
                          <SkillBadge icon={PenTool} label="Write" result={multiResult?.writingLevel} />
                          <SkillBadge icon={Mic} label="Speak" result={multiResult?.speakingLevel} />
                        </div>
                        <p className="text-xs text-gray-500 mb-3">
                          Comprehensive placement test (~70 min). Reading, Listening, Writing, Speaking.
                        </p>
                        <button
                          onClick={() => {
                            setError('')
                            if (hasMultiInProgress) {
                              navigate(`/assessment/multi-skill/${inProgressMultiSkill!.id}`)
                            } else {
                              startMultiSkillMutation.mutate(lang.code)
                            }
                          }}
                          disabled={startMultiSkillMutation.isLoading}
                          className="w-full py-2 px-3 text-sm font-medium rounded-lg bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50 transition-colors"
                        >
                          {hasMultiInProgress ? 'Continue' : multiResult ? 'Retake' : 'Start'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Previous Results */}
      {filteredCompleted.length > 0 && (
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Previous Results</h2>
          <div className="space-y-3">
            {filteredCompleted.map(assessment => (
              <AssessmentCard
                key={assessment.id}
                assessment={assessment}
                onClick={() =>
                  navigate(
                    assessment.isMultiSkill
                      ? `/assessment/multi-skill/${assessment.id}/results`
                      : `/assessment/result/${assessment.id}`
                  )
                }
              />
            ))}
          </div>
        </Card>
      )}

      {/* CEFR Level Info */}
      <Card>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Understanding CEFR Levels</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <LevelCard level="A1" name="Beginner" description="Can understand basic phrases" />
          <LevelCard level="A2" name="Elementary" description="Can communicate in simple tasks" />
          <LevelCard level="B1" name="Intermediate" description="Can deal with most travel situations" />
          <LevelCard level="B2" name="Upper Intermediate" description="Can interact with fluency" />
          <LevelCard level="C1" name="Advanced" description="Can express ideas fluently" />
          <LevelCard level="C2" name="Proficiency" description="Can understand virtually everything" />
        </div>
      </Card>
    </div>
  )
}

function SkillBadge({
  icon: Icon,
  label,
  result,
}: {
  icon: React.ElementType
  label: string
  result?: string | null
}) {
  return (
    <div
      className={`flex items-center gap-1 px-2 py-1 rounded text-xs ${
        result ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-500'
      }`}
      title={result ? `${label}: ${result}` : label}
    >
      <Icon className="w-3 h-3" />
      <span>{result || label}</span>
    </div>
  )
}

function AssessmentCard({ assessment, onClick }: { assessment: Assessment; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-all"
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-primary-600" />
            <span className="font-medium text-gray-900">{assessment.language}</span>
            {assessment.isMultiSkill && (
              <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                Placement
              </span>
            )}
            {assessment.cefrLevel && (
              <span className="px-2 py-0.5 bg-primary-100 text-primary-700 rounded text-sm font-medium">
                {assessment.cefrLevel}
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {assessment.completedAt
              ? `Completed on ${new Date(assessment.completedAt).toLocaleDateString()}`
              : 'In progress'}
          </p>
        </div>
        <div className="text-right">
          {assessment.score !== undefined && (
            <span className="text-2xl font-bold text-primary-600">{assessment.score}%</span>
          )}
          <ChevronRight className="w-5 h-5 text-gray-400 mt-1" />
        </div>
      </div>
    </button>
  )
}

function LevelCard({ level, name, description }: { level: string; name: string; description: string }) {
  const colors: Record<string, string> = {
    A1: 'bg-green-100 text-green-800',
    A2: 'bg-green-200 text-green-900',
    B1: 'bg-blue-100 text-blue-800',
    B2: 'bg-blue-200 text-blue-900',
    C1: 'bg-purple-100 text-purple-800',
    C2: 'bg-purple-200 text-purple-900',
  }

  return (
    <div className="p-3 rounded-lg bg-gray-50">
      <span className={`inline-block px-2 py-0.5 rounded text-sm font-bold ${colors[level]}`}>
        {level}
      </span>
      <p className="font-medium text-gray-900 mt-1">{name}</p>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
  )
}
