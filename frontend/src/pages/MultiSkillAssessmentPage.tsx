import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Pause, Play, RotateCcw, BookOpen, Headphones, PenTool, Mic, CheckCircle, Lock, Wifi, Volume2, Clock, Circle } from 'lucide-react'
import { assessmentApi, AssessmentSection } from '../services/assessmentApi'
import { SectionNav } from '../components/assessment/SectionNav'

const LANGUAGE_FLAGS: Record<string, string> = {
  English: '\u{1F1EC}\u{1F1E7}',
  Spanish: '\u{1F1EA}\u{1F1F8}',
  French: '\u{1F1EB}\u{1F1F7}',
  German: '\u{1F1E9}\u{1F1EA}',
  Italian: '\u{1F1EE}\u{1F1F9}',
}

// Versant-style 4 sections — Reading includes grammar, vocabulary, and error correction questions
const SKILL_INFO: Record<string, { icon: string; title: string; description: string; color: string }> = {
  READING: {
    icon: '📖', title: 'Reading & Language Use',
    description: 'Reading comprehension, grammar, vocabulary, and language structure questions.',
    color: 'border-blue-300 bg-blue-50'
  },
  LISTENING: {
    icon: '🎧', title: 'Listening',
    description: 'Listen to audio clips and answer questions. You can play each audio up to 2 times.',
    color: 'border-green-300 bg-green-50'
  },
  WRITING: {
    icon: '✍️', title: 'Writing',
    description: 'Write responses to prompts. Your writing will be evaluated by AI and reviewed by a teacher.',
    color: 'border-amber-300 bg-amber-50'
  },
  SPEAKING: {
    icon: '🎤', title: 'Speaking',
    description: 'Record spoken responses. You will need microphone access. You get up to 2 attempts per question.',
    color: 'border-purple-300 bg-purple-50'
  },
  // Legacy section types — kept for viewing old 8-section assessments
  GRAMMAR: { icon: '📝', title: 'Grammar', description: 'Grammar questions.', color: 'border-indigo-300 bg-indigo-50' },
  VOCABULARY: { icon: '📚', title: 'Vocabulary', description: 'Vocabulary questions.', color: 'border-teal-300 bg-teal-50' },
  ERROR_CORRECTION: { icon: '✏️', title: 'Error Correction', description: 'Error correction questions.', color: 'border-red-300 bg-red-50' },
  SENTENCE_TRANSFORMATION: { icon: '🔄', title: 'Sentence Transformation', description: 'Sentence transformation questions.', color: 'border-orange-300 bg-orange-50' },
}

const SKILL_ICONS: Record<string, { Icon: React.ComponentType<any>; bg: string; fg: string }> = {
  READING: { Icon: BookOpen, bg: 'bg-blue-100', fg: 'text-blue-600' },
  LISTENING: { Icon: Headphones, bg: 'bg-green-100', fg: 'text-green-600' },
  WRITING: { Icon: PenTool, bg: 'bg-amber-100', fg: 'text-amber-600' },
  SPEAKING: { Icon: Mic, bg: 'bg-purple-100', fg: 'text-purple-600' },
}

export function MultiSkillAssessmentPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [sections, setSections] = useState<AssessmentSection[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const [actionLoading, setActionLoading] = useState(false)
  const [showIntro, setShowIntro] = useState(false)
  const [showPreTestForm, setShowPreTestForm] = useState(false)
  const [retryMessage, setRetryMessage] = useState<string | null>(null)
  const [assessmentInfo, setAssessmentInfo] = useState<{ language: string; type: string; targetLevel?: string } | null>(null)
  const [preTestData, setPreTestData] = useState({
    jobRole: '', phoneNumber: '', company: '',
    needForWork: true,
    needSpeaking: true, needReading: true, needWriting: true,
    availability: {} as Record<string, string[]>,
    selfConfidence: 'medium' as 'low' | 'medium' | 'high',
    comments: ''
  })

  useEffect(() => {
    if (!id) return
    loadSections()
  }, [id])

  const loadSections = async () => {
    try {
      setLoading(true)
      const [data, assessment] = await Promise.all([
        assessmentApi.getSections(id!),
        assessmentApi.getById(id!).catch(() => null),
      ])
      setSections(data)
      // Store assessment info
      if (assessment) {
        setAssessmentInfo({ language: assessment.language, type: assessment.type, targetLevel: assessment.targetLevel })
        setIsPaused(assessment.status === 'PAUSED')
      }
      // Show intro if no sections have been started yet
      const anyStarted = data.some((s: AssessmentSection) => s.status !== 'PENDING')
      setShowIntro(!anyStarted)
    } catch (err: any) {
      setError(err.response?.data?.error || err.message)
    } finally {
      setLoading(false)
    }
  }

  const handlePause = async () => {
    try {
      setActionLoading(true)
      await assessmentApi.pauseAssessment(id!)
      setIsPaused(true)
    } catch (err: any) {
      setError(err.response?.data?.error || err.message)
    } finally {
      setActionLoading(false)
    }
  }

  const handleResume = async () => {
    try {
      setActionLoading(true)
      await assessmentApi.resumeAssessment(id!)
      setIsPaused(false)
      await loadSections()
    } catch (err: any) {
      setError(err.response?.data?.error || err.message)
    } finally {
      setActionLoading(false)
    }
  }

  const handleRestart = async () => {
    if (!confirm('This will abandon your current progress and start a fresh test. Continue?')) return
    try {
      setActionLoading(true)
      const newAssessment = await assessmentApi.restartAssessment(id!)
      navigate(`/assessment/multi-skill/${newAssessment.id}`, { replace: true })
    } catch (err: any) {
      setError(err.response?.data?.error || err.message)
    } finally {
      setActionLoading(false)
    }
  }

  const handleResetSection = async (sectionId: string) => {
    if (!confirm('This will clear your progress on this section. Continue?')) return
    try {
      setActionLoading(true)
      await assessmentApi.resetSection(id!, sectionId)
      await loadSections()
    } catch (err: any) {
      setError(err.response?.data?.error || err.message)
    } finally {
      setActionLoading(false)
    }
  }

  const handleRequestRetry = async (sectionId: string) => {
    try {
      setActionLoading(true)
      await assessmentApi.requestSectionRetry(id!, sectionId)
      setRetryMessage('Retry request sent to your administrator / Richiesta di ripetizione inviata al tuo amministratore')
      setTimeout(() => setRetryMessage(null), 5000)
    } catch (err: any) {
      setError(err.response?.data?.error || err.message)
    } finally {
      setActionLoading(false)
    }
  }

  const handleStartSection = async (section: AssessmentSection) => {
    try {
      if (isPaused) {
        await handleResume()
      }

      if (section.status === 'COMPLETED') {
        return
      }

      // Navigate to the section page — it will show the intro screen
      // and only start the timer when the student clicks "Start Section"
      navigate(`/assessment/multi-skill/${id}/section/${section.id}`)
    } catch (err: any) {
      setError(err.response?.data?.error || err.message)
    }
  }

  const allCompleted = sections.length > 0 && sections.every(s => s.status === 'COMPLETED' || s.status === 'SKIPPED')

  // Auto-redirect to results when all sections are done
  useEffect(() => {
    if (allCompleted && !showIntro) {
      navigate(`/assessment/multi-skill/${id}/results`, { replace: true })
    }
  }, [allCompleted, showIntro])

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
        <p className="font-medium">Error</p>
        <p className="text-sm">{error}</p>
      </div>
    )
  }

  if (showIntro) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/40 rounded-xl shadow-lg p-10 space-y-8">
          <div className="text-center space-y-2">
            <div className="flex justify-center items-center gap-3 mb-3">
              <img src="/favicon.webp" alt="Maka" className="h-10 w-10 rounded-full shadow-md" />
              <span className="text-5xl">{LANGUAGE_FLAGS[assessmentInfo?.language || ''] || ''}</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              {assessmentInfo?.language || ''} {assessmentInfo?.type === 'PROGRESS' ? `Level ${assessmentInfo.targetLevel} Test` : 'Placement Test'}
            </h1>
            <p className="text-lg text-gray-500">Test di Posizionamento</p>
            <div className="mx-auto mt-3 w-16 h-1 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500" />
          </div>

          <div className="bg-white/80 backdrop-blur border border-blue-200 rounded-xl p-6 space-y-4">
            <h2 className="font-semibold text-blue-900 text-base">Before you begin / Prima di iniziare</h2>
            <ul className="space-y-3 text-sm text-blue-800">
              <li className="flex items-start gap-3">
                <Wifi className="w-4 h-4 mt-0.5 text-blue-500 shrink-0" />
                <div>
                  <strong>Make sure you have a stable internet connection.</strong><br />
                  <span className="text-blue-600">Assicurati di avere una connessione internet stabile.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Volume2 className="w-4 h-4 mt-0.5 text-blue-500 shrink-0" />
                <div>
                  <strong>Find a quiet place with no distractions.</strong><br />
                  <span className="text-blue-600">Trova un luogo tranquillo senza distrazioni.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mic className="w-4 h-4 mt-0.5 text-blue-500 shrink-0" />
                <div>
                  <strong>You will need a microphone for the Speaking section.</strong><br />
                  <span className="text-blue-600">Avrai bisogno di un microfono per la sezione Speaking.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Pause className="w-4 h-4 mt-0.5 text-blue-500 shrink-0" />
                <div>
                  <strong>You can pause and resume the test at any time.</strong><br />
                  <span className="text-blue-600">Puoi mettere in pausa e riprendere il test in qualsiasi momento.</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-white/60 backdrop-blur rounded-xl p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Test Structure / Struttura del Test</h2>
            <div className="grid grid-cols-2 gap-3">
              {([
                { skill: 'READING', questions: 60, time: 18 },
                { skill: 'LISTENING', questions: 12, time: 10 },
                { skill: 'WRITING', questions: 6, time: 7 },
                { skill: 'SPEAKING', questions: 6, time: 5 },
              ]).map(({ skill, questions, time }) => {
                const info = SKILL_INFO[skill]
                const iconData = SKILL_ICONS[skill]
                const SkillIcon = iconData?.Icon
                return (
                  <div key={skill} className={`border rounded-xl p-4 ${info.color} hover:shadow-md hover:-translate-y-0.5 transition-all`}>
                    <div className="flex items-center gap-3">
                      {SkillIcon ? (
                        <div className={`w-9 h-9 rounded-full ${iconData.bg} flex items-center justify-center`}>
                          <SkillIcon className={`w-4.5 h-4.5 ${iconData.fg}`} />
                        </div>
                      ) : (
                        <span className="text-xl">{info.icon}</span>
                      )}
                      <div>
                        <span className="font-medium text-gray-900 block">{info.title}</span>
                        <span className="text-xs text-gray-500">{questions} questions &middot; {time} min</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>Estimated time: ~40 minutes / Tempo stimato: ~40 minuti</span>
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => { setShowIntro(false); setShowPreTestForm(true) }}
              className="px-10 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all"
            >
              Begin Test / Inizia il Test
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ─── Pre-test information form ───
  if (showPreTestForm) {
    const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    const SLOTS = ['AM', 'Lunch', 'PM', 'Evening']
    const toggleAvail = (day: string, slot: string) => {
      setPreTestData(prev => {
        const current = prev.availability[day] || []
        const updated = current.includes(slot)
          ? current.filter(s => s !== slot)
          : [...current, slot]
        return { ...prev, availability: { ...prev.availability, [day]: updated } }
      })
    }

    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 space-y-6">
          <div className="text-center">
            <span className="text-4xl">{LANGUAGE_FLAGS[assessmentInfo?.language || ''] || ''}</span>
            <h1 className="text-2xl font-bold text-gray-900 mt-2">Before We Start</h1>
            <p className="text-gray-500 text-sm">Please fill in a few details to help us personalise your experience.</p>
          </div>

          {/* Professional info */}
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Professional Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Role</label>
                <input type="text" value={preTestData.jobRole} onChange={e => setPreTestData(p => ({ ...p, jobRole: e.target.value }))}
                  placeholder="e.g. Marketing Manager" className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-blue-400 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                <input type="text" value={preTestData.company} onChange={e => setPreTestData(p => ({ ...p, company: e.target.value }))}
                  placeholder="e.g. Acme Corp" className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-blue-400 outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input type="tel" value={preTestData.phoneNumber} onChange={e => setPreTestData(p => ({ ...p, phoneNumber: e.target.value }))}
                placeholder="+39 ..." className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-blue-400 outline-none" />
            </div>
          </div>

          {/* Language needs */}
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Language Needs</h2>
            <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
              <input type="checkbox" checked={preTestData.needForWork} onChange={e => setPreTestData(p => ({ ...p, needForWork: e.target.checked }))}
                className="w-4 h-4 rounded border-gray-300 text-blue-600" />
              <span className="text-sm text-gray-800">I need {assessmentInfo?.language || 'this language'} for work</span>
            </label>
            <p className="text-xs text-gray-500">Which skills do you need most?</p>
            <div className="flex gap-3">
              {[
                { key: 'needSpeaking', label: 'Speaking' },
                { key: 'needReading', label: 'Reading' },
                { key: 'needWriting', label: 'Writing' },
              ].map(({ key, label }) => (
                <label key={key} className={`flex-1 text-center py-2 px-3 border-2 rounded-lg cursor-pointer transition-all text-sm font-medium ${
                  (preTestData as any)[key] ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-500 hover:border-gray-300'
                }`}>
                  <input type="checkbox" className="sr-only" checked={(preTestData as any)[key]}
                    onChange={e => setPreTestData(p => ({ ...p, [key]: e.target.checked }))} />
                  {label}
                </label>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Availability for Lessons</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr>
                    <th className="p-1"></th>
                    {DAYS.map(d => <th key={d} className="p-1 text-center text-gray-500 font-medium">{d}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {SLOTS.map(slot => (
                    <tr key={slot}>
                      <td className="p-1 text-gray-500 font-medium">{slot}</td>
                      {DAYS.map(day => {
                        const active = (preTestData.availability[day] || []).includes(slot)
                        return (
                          <td key={day} className="p-1 text-center">
                            <button type="button" onClick={() => toggleAvail(day, slot)}
                              className={`w-8 h-8 rounded-lg transition-all ${active ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}>
                              {active ? '✓' : ''}
                            </button>
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Self-evaluation */}
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Self-Evaluation</h2>
            <p className="text-xs text-gray-500">How confident do you feel in {assessmentInfo?.language || 'this language'}?</p>
            <div className="flex gap-3">
              {(['low', 'medium', 'high'] as const).map(level => (
                <button key={level} type="button" onClick={() => setPreTestData(p => ({ ...p, selfConfidence: level }))}
                  className={`flex-1 py-2.5 px-4 border-2 rounded-lg text-sm font-medium transition-all capitalize ${
                    preTestData.selfConfidence === level
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 text-gray-500 hover:border-gray-300'
                  }`}>
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Comments */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Comments (optional)</label>
            <textarea value={preTestData.comments} onChange={e => setPreTestData(p => ({ ...p, comments: e.target.value }))}
              rows={2} placeholder="Anything else we should know..."
              className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-blue-400 outline-none resize-none" />
          </div>

          <button
            onClick={() => {
              // Save pre-test data to assessment metadata
              assessmentApi.updatePreTestData(id!, preTestData).catch(() => {})
              setShowPreTestForm(false)
            }}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 shadow-md transition-all"
          >
            Start Test / Inizia il Test
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-2">
          <span className="text-3xl">{LANGUAGE_FLAGS[assessmentInfo?.language || ''] || ''}</span>
          <h1 className="text-2xl font-bold text-gray-900">
            {assessmentInfo?.language || ''} {assessmentInfo?.type === 'PROGRESS' ? `Level ${assessmentInfo.targetLevel} Test` : 'Placement Test'}
          </h1>
        </div>
        <p className="text-gray-600">
          {assessmentInfo?.type === 'PROGRESS'
            ? `All questions at ${assessmentInfo.targetLevel} level. Complete all sections to verify your competency.`
            : 'Complete all sections to determine your CEFR level across all language skills.'}
        </p>

        {/* Step progress indicator */}
        {sections.length > 0 && (
          <div className="flex items-center justify-center gap-2 mt-4">
            {sections.map((s, i) => {
              const done = s.status === 'COMPLETED' || s.status === 'SKIPPED'
              const active = s.status === 'IN_PROGRESS'
              const iconData = SKILL_ICONS[s.skill]
              const SkillIcon = iconData?.Icon || Circle
              return (
                <div key={s.id} className="flex items-center gap-2">
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                    done
                      ? 'bg-green-100 border-green-300 text-green-700'
                      : active
                        ? 'bg-blue-100 border-blue-300 text-blue-700 ring-2 ring-blue-200'
                        : 'bg-gray-50 border-gray-200 text-gray-400'
                  }`}>
                    {done ? (
                      <CheckCircle className="w-3.5 h-3.5" />
                    ) : (
                      <SkillIcon className="w-3.5 h-3.5" />
                    )}
                    <span>{i + 1}/{sections.length}</span>
                  </div>
                  {i < sections.length - 1 && (
                    <div className={`w-6 h-0.5 rounded-full ${done ? 'bg-green-300' : 'bg-gray-200'}`} />
                  )}
                </div>
              )
            })}
          </div>
        )}
        <div className="flex justify-center gap-3 mt-4">
          {!isPaused ? (
            <button
              onClick={handlePause}
              disabled={actionLoading || allCompleted}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl shadow-sm hover:bg-gray-50 hover:shadow-md transition-all disabled:opacity-50"
            >
              <Pause className="w-4 h-4" /> Pause Test
            </button>
          ) : (
            <button
              onClick={handleResume}
              disabled={actionLoading}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-sm hover:shadow-md transition-all disabled:opacity-50"
            >
              <Play className="w-4 h-4" /> Resume Test
            </button>
          )}
          <button
            onClick={handleRestart}
            disabled={actionLoading}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-red-600 bg-white border border-red-200 rounded-xl shadow-sm hover:bg-red-50 hover:border-red-300 hover:shadow-md transition-all disabled:opacity-50"
          >
            <RotateCcw className="w-4 h-4" /> Restart Test
          </button>
        </div>
      </div>

      {retryMessage && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-sm">
          {retryMessage}
        </div>
      )}

      {/* Section progress nav */}
      <SectionNav
        sections={sections}
        onSectionClick={handleStartSection}
      />

      {/* Section cards */}
      <div className="grid gap-4">
        {sections.map((section, index) => {
          const info = SKILL_INFO[section.skill]
          const canStart = index === 0 || sections[index - 1]?.status === 'COMPLETED' || sections[index - 1]?.status === 'SKIPPED'

          return (
            <div
              key={section.id}
              className={`border-2 rounded-xl p-6 hover:shadow-md hover:-translate-y-0.5 transition-all ${info.color} ${
                section.status === 'COMPLETED' ? 'opacity-80' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  {(() => {
                    const iconData = SKILL_ICONS[section.skill]
                    if (iconData) {
                      const SkillIcon = iconData.Icon
                      return (
                        <div className={`w-12 h-12 rounded-full ${iconData.bg} flex items-center justify-center shrink-0`}>
                          <SkillIcon className={`w-6 h-6 ${iconData.fg}`} />
                        </div>
                      )
                    }
                    return <span className="text-3xl">{info.icon}</span>
                  })()}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{info.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{info.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{section.timeLimitMin} minutes</span>
                      <span>{section.questionsLimit} questions</span>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0 ml-4">
                  {section.status === 'COMPLETED' && (
                    <div className="space-y-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-500 text-white text-sm font-bold rounded-full shadow-sm">
                        <CheckCircle className="w-4 h-4" />
                        Done
                      </span>
                      <button
                        onClick={() => handleRequestRetry(section.id)}
                        disabled={actionLoading}
                        className="block text-xs text-amber-700 hover:text-amber-900 underline disabled:opacity-50"
                      >
                        Request Retry
                      </button>
                    </div>
                  )}

                  {(section.status === 'IN_PROGRESS' || (section.status === 'PENDING' && canStart && (section as any).answers?.length > 0)) && (
                    <div className="space-y-2 text-right">
                      <button
                        onClick={() => handleStartSection(section)}
                        className="px-5 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 shadow-sm hover:shadow-md transition-all"
                      >
                        Continue
                      </button>
                      <button
                        onClick={() => handleResetSection(section.id)}
                        disabled={actionLoading}
                        className="block text-xs text-gray-500 hover:text-gray-700 underline disabled:opacity-50 ml-auto"
                      >
                        Reset Section
                      </button>
                    </div>
                  )}

                  {section.status === 'PENDING' && canStart && !((section as any).answers?.length > 0) && (
                    <button
                      onClick={() => handleStartSection(section)}
                      className="px-5 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 shadow-sm hover:shadow-md transition-all"
                    >
                      Start
                    </button>
                  )}

                  {section.status === 'PENDING' && !canStart && (
                    <span className="inline-flex items-center gap-1.5 text-sm text-gray-400">
                      <Lock className="w-4 h-4" /> Locked
                    </span>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Results button */}
      {allCompleted && (
        <div className="text-center mt-8">
          <button
            onClick={() => navigate(`/assessment/multi-skill/${id}/results`)}
            className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors"
          >
            View Results
          </button>
        </div>
      )}
    </div>
  )
}
