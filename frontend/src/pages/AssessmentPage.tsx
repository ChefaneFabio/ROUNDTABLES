import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { ClipboardCheck, Clock, Award, ChevronRight, Play, AlertTriangle, Timer } from 'lucide-react'
import { assessmentApi, Assessment } from '../services/assessmentApi'
import { LoadingPage } from '../components/common/LoadingSpinner'
import { Alert } from '../components/common/Alert'
import { Button } from '../components/common/Button'
import { Card } from '../components/common/Card'

const LANGUAGES = [
  { code: 'English', name: 'English', flag: '🇬🇧' },
  { code: 'Spanish', name: 'Spanish', flag: '🇪🇸' },
  { code: 'French', name: 'French', flag: '🇫🇷' },
  { code: 'German', name: 'German', flag: '🇩🇪' },
  { code: 'Italian', name: 'Italian', flag: '🇮🇹' }
]

export function AssessmentPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [selectedLanguage, setSelectedLanguage] = useState('')
  const [error, setError] = useState('')

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
      onError: (err: Error) => {
        setError(err.message)
      }
    }
  )

  const startMultiSkillMutation = useMutation(
    (language: string) => assessmentApi.createMultiSkill(language),
    {
      onSuccess: (assessment) => {
        navigate(`/assessment/multi-skill/${assessment.id}`)
      },
      onError: (err: Error) => {
        setError(err.message)
      }
    }
  )

  const startAssignedMutation = useMutation(
    (id: string) => assessmentApi.startAssigned(id),
    {
      onSuccess: (assessment) => {
        queryClient.invalidateQueries('myAssignedAssessments')
        queryClient.invalidateQueries('myAssessments')
        navigate(`/assessment/take/${assessment.id}`)
      },
      onError: (err: Error) => {
        setError(err.message)
      }
    }
  )

  const handleStartAssessment = () => {
    if (!selectedLanguage) {
      setError('Please select a language')
      return
    }
    setError('')
    startMutation.mutate(selectedLanguage)
  }

  const inProgressAssessment = assessments?.find(a => a.status === 'IN_PROGRESS' && !a.isMultiSkill)
  const inProgressMultiSkill = assessments?.find(a => a.status === 'IN_PROGRESS' && a.isMultiSkill)
  const completedAssessments = assessments?.filter(a => a.status === 'COMPLETED') || []

  if (isLoading || loadingAssigned) return <LoadingPage />

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-3 mb-2">
          <ClipboardCheck className="w-8 h-8 text-primary-600" />
          <h1 className="text-2xl font-bold text-gray-900">Language Assessment</h1>
        </div>
        <p className="text-gray-600">
          Take a placement test to determine your CEFR level (A1-C2) and get personalized course recommendations.
        </p>
      </div>

      {error && <Alert type="error" message={error} />}

      {/* Assigned Tests */}
      {assignedAssessments && assignedAssessments.length > 0 && (
        <Card className="border-2 border-amber-300 bg-amber-50">
          <h2 className="text-lg font-semibold text-amber-800 mb-4 flex items-center gap-2">
            <ClipboardCheck className="w-5 h-5" />
            Assigned Tests
          </h2>
          <div className="space-y-3">
            {assignedAssessments.map(a => (
              <div key={a.id} className="bg-white rounded-lg p-4 border border-amber-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{a.language} Placement Test</p>
                    <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Timer className="w-4 h-4" />
                        {a.timeLimitMin} minutes
                      </span>
                      {a.assignedAt && (
                        <span>Assigned: {new Date(a.assignedAt).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                  <Button
                    onClick={() => startAssignedMutation.mutate(a.id)}
                    disabled={startAssignedMutation.isLoading}
                    className="flex items-center gap-2"
                  >
                    {startAssignedMutation.isLoading ? 'Starting...' : 'Begin Test'}
                  </Button>
                </div>
                <div className="mt-3 flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-amber-700">
                    This is a timed test. Once you start, you have {a.timeLimitMin} minutes to complete it.
                    Tab switches, copy attempts, and other violations are monitored.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Continue In-Progress Assessment */}
      {inProgressAssessment && (
        <Card className="border-2 border-primary-200 bg-primary-50">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-primary-700 mb-1">
                <Clock className="w-5 h-5" />
                <span className="font-medium">Assessment In Progress</span>
              </div>
              <p className="text-gray-600">
                Continue your {inProgressAssessment.language} placement test
              </p>
            </div>
            <Button
              onClick={() => navigate(`/assessment/take/${inProgressAssessment.id}`)}
              className="flex items-center gap-2"
            >
              Continue <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      )}

      {/* Continue In-Progress Multi-Skill */}
      {inProgressMultiSkill && (
        <Card className="border-2 border-purple-200 bg-purple-50">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-purple-700 mb-1">
                <ClipboardCheck className="w-5 h-5" />
                <span className="font-medium">4-Skills Assessment In Progress</span>
              </div>
              <p className="text-gray-600">
                Continue your {inProgressMultiSkill.language} 4-skills placement test
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

      {/* Start New Assessment */}
      {!inProgressAssessment && (
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Start a New Placement Test
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setSelectedLanguage(lang.code)}
                className={`p-4 rounded-lg border-2 text-center transition-all ${
                  selectedLanguage === lang.code
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="text-2xl mb-1 block">{lang.flag}</span>
                <span className="text-sm font-medium">{lang.name}</span>
              </button>
            ))}
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-gray-900 mb-2">About the Test</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Adaptive placement test that adjusts to your level (A1-C2)</li>
              <li>• Grammar, vocabulary, and reading comprehension questions</li>
              <li>• Multiple choice, fill-in-the-blank, and passage-based questions</li>
              <li>• Takes approximately 20-30 minutes</li>
              <li>• Get immediate results with your CEFR level</li>
              <li>• Receive a certificate upon completion</li>
            </ul>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={handleStartAssessment}
              disabled={!selectedLanguage || startMutation.isLoading}
              className="flex-1 flex items-center justify-center gap-2"
            >
              {startMutation.isLoading ? (
                'Starting...'
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  Quick Placement Test
                </>
              )}
            </Button>

            <button
              onClick={() => {
                if (!selectedLanguage) {
                  setError('Please select a language')
                  return
                }
                setError('')
                startMultiSkillMutation.mutate(selectedLanguage)
              }}
              disabled={!selectedLanguage || startMultiSkillMutation.isLoading}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {startMultiSkillMutation.isLoading ? (
                'Starting...'
              ) : (
                <>
                  <Award className="w-5 h-5" />
                  4-Skills Assessment
                </>
              )}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            4-Skills: Reading, Listening, Writing, Speaking (~70 min) | Quick: Grammar &amp; Vocabulary (~25 min)
          </p>
        </Card>
      )}

      {/* Previous Assessments */}
      {completedAssessments.length > 0 && (
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Previous Assessments
          </h2>
          <div className="space-y-3">
            {completedAssessments.map((assessment) => (
              <AssessmentCard
                key={assessment.id}
                assessment={assessment}
                onClick={() => navigate(
                  assessment.isMultiSkill
                    ? `/assessment/multi-skill/${assessment.id}/results`
                    : `/assessment/result/${assessment.id}`
                )}
              />
            ))}
          </div>
        </Card>
      )}

      {/* CEFR Level Info */}
      <Card>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Understanding CEFR Levels
        </h2>
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
                4-Skills
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
    C2: 'bg-purple-200 text-purple-900'
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
