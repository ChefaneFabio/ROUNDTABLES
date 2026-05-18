import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import {
  ClipboardCheck,
  Clock,
  ChevronRight,
  Timer,
  BookOpen,
  Headphones,
  PenTool,
  Mic,
  CheckCircle,
  Play,
  Hourglass,
  Send,
} from 'lucide-react'
import { assessmentApi, Assessment } from '../services/assessmentApi'
import { LoadingPage } from '../components/common/LoadingSpinner'
import { Alert } from '../components/common/Alert'
import { Button } from '../components/common/Button'
import { HelpHint, HelpRole, HelpRow } from '../components/common/HelpHint'

const LANGUAGES = [
  { code: 'English', name: 'English', flag: '\u{1F1EC}\u{1F1E7}', accent: 'from-blue-500 to-red-500' },
  { code: 'Spanish', name: 'Spanish', flag: '\u{1F1EA}\u{1F1F8}', accent: 'from-red-500 to-yellow-500' },
  { code: 'French', name: 'French', flag: '\u{1F1EB}\u{1F1F7}', accent: 'from-blue-500 to-red-500' },
  { code: 'German', name: 'German', flag: '\u{1F1E9}\u{1F1EA}', accent: 'from-gray-900 to-yellow-500' },
  { code: 'Italian', name: 'Italian', flag: '\u{1F1EE}\u{1F1F9}', accent: 'from-green-500 to-red-500' },
]

const SKILL_SECTIONS = [
  { icon: BookOpen, label: 'Reading & Language Use', time: '25 min', color: 'text-blue-600 bg-blue-50' },
  { icon: Headphones, label: 'Listening', time: '15 min', color: 'text-green-600 bg-green-50' },
  { icon: PenTool, label: 'Writing', time: '15 min', color: 'text-amber-600 bg-amber-50' },
  { icon: Mic, label: 'Speaking', time: '15 min', color: 'text-purple-600 bg-purple-50' },
]

const RESULTS_LIMIT = 10

export function AssessmentPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { isAdmin } = useAuth()
  const [error, setError] = useState('')
  const [showAllResults, setShowAllResults] = useState(false)

  const { data: assessments, isLoading } = useQuery('myAssessments', assessmentApi.getMyAssessments)
  const { data: assignedAssessments, isLoading: loadingAssigned } = useQuery('myAssignedAssessments', assessmentApi.getAssignedAssessments)
  const { data: preTest } = useQuery('myPreTest', assessmentApi.getPreTest, { enabled: !isAdmin })
  const preTestRequired = !isAdmin && !preTest?.completed

  // For admin/teacher users, creating a multi-skill assessment still goes
  // straight to the test (they can also pre-assign for others).
  // For students, the same endpoint now creates a REQUESTED record awaiting
  // Maka approval — we surface that explicitly in the UI.
  const startMultiSkillMutation = useMutation(
    (language: string) => assessmentApi.createMultiSkill(language),
    {
      onSuccess: (assessment) => {
        queryClient.invalidateQueries('myAssessments')
        queryClient.invalidateQueries('myAssignedAssessments')
        if (assessment.status === 'REQUESTED') {
          // Stay on this page; the card will now show "Awaiting approval"
          return
        }
        navigate(`/assessment/multi-skill/${assessment.id}`)
      },
      onError: (err: any) => {
        // Backend returns 412 PRETEST_REQUIRED when the learner hasn't filled
        // the questionnaire yet. Bounce them to the form instead of an error.
        if (err?.response?.status === 412 || err?.response?.data?.code === 'PRETEST_REQUIRED') {
          navigate('/assessment/pretest')
          return
        }
        setError(err?.message || 'Failed to request test')
      },
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
  // Tests the learner has requested but Maka has not yet approved
  const requestedByLang = new Map<string, Assessment>()
  ;(assessments || [])
    .filter(a => a.status === 'REQUESTED' && a.isMultiSkill)
    .forEach(a => requestedByLang.set(a.language, a))
  const assignedByLang = new Map<string, Assessment>()
  uniqueAssigned.forEach(a => { if (a.language) assignedByLang.set(a.language, a) })

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
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-900 to-slate-800 rounded-2xl p-8 text-white">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-slate-500/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-gray-500/10 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-primary-500/5 rounded-full" />
        <div className="absolute -bottom-4 right-12 w-24 h-24 border border-white/5 rounded-full" />
        <div className="absolute top-8 right-1/3 w-16 h-16 border border-white/5 rounded-full" />
        {/* Subtle dot pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

        <div className="relative">
          <div className="flex items-center gap-3 mb-3">
            <img src="/favicon.webp" alt="Maka" className="h-8 w-8 rounded-full ring-2 ring-white/10" />
            <div className="p-2.5 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10">
              <ClipboardCheck className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Placement Test</h1>
            <div className="text-gray-200">
              <HelpHint title="How the placement test works" triggerClass="text-white/70 hover:text-white" iconClass="w-5 h-5">
                <HelpRole role="learner" />
                <HelpRow label="The test">4 timed sections — Reading 18m, Listening 12m, Writing 10m, Speaking 10m. ~60 min realistic.</HelpRow>
                <HelpRow label="You can">pause between sections, recover from a session timeout, see your CEFR per skill at the end.</HelpRow>
                <HelpRow label="Maka">receives your results automatically and can override AI-graded sections (Writing, Speaking).</HelpRow>
                <HelpRow label="Your HR" tone="good">if you're a B2B learner, your HR contact sees your results too.</HelpRow>
                <HelpRow label="You can't" tone="warn">redo a finished section without asking Maka to reopen it.</HelpRow>
              </HelpHint>
            </div>
          </div>
          <p className="text-gray-300 max-w-xl leading-relaxed">
            Determine your CEFR level (A1-C2) with a comprehensive placement test covering all four language skills.
          </p>
          <div className="flex flex-wrap gap-2.5 mt-5">
            {SKILL_SECTIONS.map(s => (
              <div key={s.label} className="flex items-center gap-2 px-3 py-1.5 bg-white/[0.07] backdrop-blur-sm rounded-lg text-sm border border-white/[0.06]">
                <s.icon className="w-4 h-4 text-gray-400" />
                <span className="text-gray-200">{s.label}</span>
                <span className="text-gray-400 text-xs">{s.time}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 bg-slate-500/20 backdrop-blur-sm rounded-full border border-slate-400/20 text-sm">
            <Clock className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-gray-300 font-medium">~50 min timed &middot; ~60 min total &middot; 4 sections</span>
          </div>
        </div>
      </div>

      {error && (
        <div className="text-center py-12">
          <Alert type="error" message="Failed to load assessments. Please try again." />
          <p className="text-sm text-gray-500 mt-2">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {preTestRequired && (
        <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-5 flex items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-amber-900">Finish your pre-test questionnaire first</p>
            <p className="text-sm text-amber-700 mt-1">
              A 2-minute form helps us pick the right placement and match you with the right learning group.
            </p>
          </div>
          <button
            onClick={() => navigate('/assessment/pretest')}
            className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 font-medium text-sm"
          >
            Start questionnaire
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}

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
                    <span className="flex items-center gap-1"><Timer className="w-4 h-4" /> ~60 min</span>
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
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
            {isAdmin ? 'Start a New Test' : 'Available Tests'}
          </h2>
          {!isAdmin && (
            <HelpHint title="Requesting a test">
              <HelpRole role="learner" />
              <HelpRow label="You">click Request Test → request enters Maka's approval queue.</HelpRow>
              <HelpRow label="Maka">reviews and approves (usually within hours). You get an email; the card flips to Begin Test.</HelpRow>
              <HelpRow label="Already done">a test in this language? The card shows View Results — no retakes from your side.</HelpRow>
              <HelpRow label="You can't" tone="warn">start the test yourself without Maka's approval, or retake a completed test.</HelpRow>
            </HelpHint>
          )}
        </div>
        {!isAdmin && (
          <p className="text-sm text-gray-500 mb-4">
            Request the placement test you want to take. Maka Language Consulting will approve your request,
            and you will receive an email when your test is ready.
          </p>
        )}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {LANGUAGES.map(lang => {
            const result = latestByLang.get(lang.code)
            const hasInProgress = inProgressMultiSkill?.language === lang.code
            const requested = requestedByLang.get(lang.code)
            const assigned = assignedByLang.get(lang.code)

            // Pick the dominant state for the action button.
            // Completed-only state is special: learners can ONLY view results
            // (no retake), admins can also retake from here.
            let state: 'inProgress' | 'assigned' | 'requested' | 'completed' | 'idle'
            if (hasInProgress) state = 'inProgress'
            else if (assigned) state = 'assigned'
            else if (requested) state = 'requested'
            else if (result) state = 'completed'
            else state = 'idle'

            const handleClick = () => {
              setError('')
              if (state === 'inProgress') {
                navigate(`/assessment/multi-skill/${inProgressMultiSkill!.id}`)
              } else if (state === 'assigned') {
                startAssignedMutation.mutate(assigned!)
              } else if (state === 'requested') {
                // No-op; learners cannot start until Maka approves
              } else if (state === 'completed') {
                navigate(`/assessment/multi-skill/${result!.id}/results`)
              } else {
                startMultiSkillMutation.mutate(lang.code)
              }
            }

            const buttonLabel =
              state === 'inProgress' ? 'Continue'
              : state === 'assigned' ? 'Begin Test'
              : state === 'requested' ? 'Awaiting Approval'
              : state === 'completed' ? 'View Results'
              : isAdmin ? 'Start Test'
              : 'Request Test'

            const buttonDisabled =
              state === 'requested' ||
              startMultiSkillMutation.isLoading ||
              startAssignedMutation.isLoading

            const buttonClass = state === 'requested'
              ? 'w-full py-2.5 px-4 text-sm font-semibold rounded-xl bg-amber-50 text-amber-700 border border-amber-200 cursor-not-allowed'
              : 'w-full py-2.5 px-4 text-sm font-semibold rounded-xl bg-gradient-to-r from-gray-900 to-gray-800 text-white hover:from-gray-800 hover:to-primary-600 disabled:opacity-50 transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center gap-2'

            return (
              <div
                key={lang.code}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group hover:border-primary-300"
              >
                {/* Flag-colored accent stripe */}
                <div className={`h-1.5 bg-gradient-to-r ${lang.accent}`} />

                <div className="p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{lang.flag}</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">{lang.name}</h3>
                      {state === 'requested' ? (
                        <div className="flex items-center gap-1 text-xs text-amber-700">
                          <Hourglass className="w-3.5 h-3.5" />
                          <span className="font-medium">Awaiting Maka approval</span>
                        </div>
                      ) : state === 'assigned' ? (
                        <div className="flex items-center gap-1 text-xs text-blue-600">
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span className="font-medium">Approved &mdash; ready to begin</span>
                        </div>
                      ) : result ? (
                        <div className="flex items-center gap-1 text-xs text-green-600">
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span className="font-medium">{isAdmin ? `Level: ${result.cefrLevel}` : 'Completed'}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-xs text-gray-400">
                          <Clock className="w-3 h-3" />
                          <span>Not taken yet</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Skill levels — admin only */}
                  {isAdmin && (
                    <div className="grid grid-cols-2 gap-1.5 mb-4">
                      <SkillLevel icon={BookOpen} label="Reading" level={result?.readingLevel} />
                      <SkillLevel icon={Headphones} label="Listening" level={result?.listeningLevel} />
                      <SkillLevel icon={PenTool} label="Writing" level={result?.writingLevel} />
                      <SkillLevel icon={Mic} label="Speaking" level={result?.speakingLevel} />
                    </div>
                  )}

                  <button
                    onClick={handleClick}
                    disabled={buttonDisabled}
                    className={buttonClass}
                  >
                    {state === 'requested' && <Hourglass className="w-4 h-4" />}
                    {state === 'idle' && !isAdmin && <Send className="w-4 h-4" />}
                    {state === 'inProgress' && <ChevronRight className="w-4 h-4" />}
                    {state === 'assigned' && <Play className="w-4 h-4" />}
                    {state === 'completed' && <CheckCircle className="w-4 h-4" />}
                    {buttonLabel}
                  </button>

                  {/* Admin-only retake link under the View Results button */}
                  {state === 'completed' && isAdmin && (
                    <button
                      onClick={e => {
                        e.stopPropagation()
                        setError('')
                        startMultiSkillMutation.mutate(lang.code)
                      }}
                      disabled={startMultiSkillMutation.isLoading}
                      className="mt-2 w-full text-xs text-gray-500 hover:text-primary-600 underline"
                    >
                      Retake test
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Previous Results — admin/teacher only */}
      {isAdmin && completedAssessments.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Previous Results</h2>
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-gray-50/80">
                    <th className="text-left py-3.5 px-4 font-medium text-gray-500">Language</th>
                    <th className="text-center py-3.5 px-4 font-medium text-gray-500">Level</th>
                    <th className="text-center py-3.5 px-4 font-medium text-gray-500">Score</th>
                    <th className="text-center py-3.5 px-4 font-medium text-gray-500 hidden sm:table-cell">R</th>
                    <th className="text-center py-3.5 px-4 font-medium text-gray-500 hidden sm:table-cell">L</th>
                    <th className="text-center py-3.5 px-4 font-medium text-gray-500 hidden sm:table-cell">W</th>
                    <th className="text-center py-3.5 px-4 font-medium text-gray-500 hidden sm:table-cell">S</th>
                    <th className="text-left py-3.5 px-4 font-medium text-gray-500">Date</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {completedAssessments
                    .slice(0, showAllResults ? completedAssessments.length : RESULTS_LIMIT)
                    .map(a => (
                    <tr key={a.id} className="border-b border-gray-100 even:bg-gray-50/50 hover:bg-primary-50/40 cursor-pointer transition-colors" onClick={() => navigate(`/assessment/multi-skill/${a.id}/results`)}>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <span>{LANGUAGES.find(l => l.code === a.language)?.flag}</span>
                          <span className="font-medium text-gray-900">{a.language}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        {a.cefrLevel && (
                          <span className="px-2.5 py-1 bg-primary-100 text-primary-700 rounded-md font-bold text-xs">
                            {a.cefrLevel}
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-center font-semibold text-gray-900">
                        {a.score != null ? `${a.score}%` : '--'}
                      </td>
                      <td className="py-3.5 px-4 text-center text-xs hidden sm:table-cell">{a.readingLevel || '--'}</td>
                      <td className="py-3.5 px-4 text-center text-xs hidden sm:table-cell">{a.listeningLevel || '--'}</td>
                      <td className="py-3.5 px-4 text-center text-xs hidden sm:table-cell">{a.writingLevel || '--'}</td>
                      <td className="py-3.5 px-4 text-center text-xs hidden sm:table-cell">{a.speakingLevel || '--'}</td>
                      <td className="py-3.5 px-4 text-xs text-gray-500">
                        {a.completedAt ? new Date(a.completedAt).toLocaleDateString() : '--'}
                      </td>
                      <td className="py-3.5 px-4"><ChevronRight className="w-4 h-4 text-gray-400" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {completedAssessments.length > RESULTS_LIMIT && (
              <div className="border-t border-gray-100 px-4 py-3 text-center">
                <button
                  onClick={() => setShowAllResults(!showAllResults)}
                  className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
                >
                  {showAllResults
                    ? 'Show less'
                    : `Show all ${completedAssessments.length} results`}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CEFR Guide */}
      <div className="bg-gradient-to-r from-gray-50 via-slate-50/30 to-gray-50/30 rounded-xl p-6 border border-gray-100">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">CEFR Scale</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { level: 'A1', name: 'Beginner', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
            { level: 'A2', name: 'Elementary', color: 'bg-emerald-200 text-emerald-900 border-emerald-300' },
            { level: 'B1', name: 'Intermediate', color: 'bg-blue-100 text-blue-800 border-blue-200' },
            { level: 'B2', name: 'Upper Int.', color: 'bg-blue-200 text-blue-900 border-blue-300' },
            { level: 'C1', name: 'Advanced', color: 'bg-purple-100 text-purple-800 border-purple-200' },
            { level: 'C2', name: 'Proficiency', color: 'bg-purple-200 text-purple-900 border-purple-300' },
          ].map(l => (
            <div key={l.level} className={`px-4 py-2 rounded-xl text-sm font-semibold border ${l.color} shadow-sm`}>
              <span className="font-bold">{l.level}</span> {l.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function SkillLevel({ icon: Icon, label, level }: { icon: React.ElementType; label: string; level?: string | null }) {
  return (
    <div className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs ${level ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-gray-50 text-gray-400 border border-gray-100'}`}>
      <Icon className={`w-3.5 h-3.5 ${level ? 'text-green-500' : 'text-gray-300'}`} />
      <span>{label}</span>
      <span className="font-bold ml-auto">{level || '--'}</span>
    </div>
  )
}
