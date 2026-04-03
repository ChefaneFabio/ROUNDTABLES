import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Pause, Play, RotateCcw } from 'lucide-react'
import { assessmentApi, AssessmentSection } from '../services/assessmentApi'
import { SectionNav } from '../components/assessment/SectionNav'

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

export function MultiSkillAssessmentPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [sections, setSections] = useState<AssessmentSection[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const [actionLoading, setActionLoading] = useState(false)
  const [showIntro, setShowIntro] = useState(false)

  useEffect(() => {
    if (!id) return
    loadSections()
  }, [id])

  const loadSections = async () => {
    try {
      setLoading(true)
      const data = await assessmentApi.getSections(id!)
      setSections(data)
      // Show intro if no sections have been started yet
      const anyStarted = data.some((s: AssessmentSection) => s.status !== 'PENDING')
      if (!anyStarted) setShowIntro(true)
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

  const handleStartSection = async (section: AssessmentSection) => {
    try {
      if (section.status === 'COMPLETED') {
        // Already done, skip
        return
      }

      if (section.status === 'PENDING') {
        await assessmentApi.startSection(id!, section.id)
      }

      navigate(`/assessment/multi-skill/${id}/section/${section.id}`)
    } catch (err: any) {
      setError(err.response?.data?.error || err.message)
    }
  }

  const allCompleted = sections.every(s => s.status === 'COMPLETED' || s.status === 'SKIPPED')

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
        <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Placement Test</h1>
            <p className="text-lg text-gray-500">Test di Posizionamento</p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 space-y-3">
            <h2 className="font-semibold text-blue-900">Before you begin / Prima di iniziare</h2>
            <ul className="space-y-2 text-sm text-blue-800">
              <li>
                <strong>Make sure you have a stable internet connection.</strong><br />
                <span className="text-blue-600">Assicurati di avere una connessione internet stabile.</span>
              </li>
              <li>
                <strong>Find a quiet place with no distractions.</strong><br />
                <span className="text-blue-600">Trova un luogo tranquillo senza distrazioni.</span>
              </li>
              <li>
                <strong>You will need a microphone for the Speaking section.</strong><br />
                <span className="text-blue-600">Avrai bisogno di un microfono per la sezione Speaking.</span>
              </li>
              <li>
                <strong>You can pause and resume the test at any time.</strong><br />
                <span className="text-blue-600">Puoi mettere in pausa e riprendere il test in qualsiasi momento.</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-lg p-5">
            <h2 className="font-semibold text-gray-900 mb-3">Test Structure / Struttura del Test</h2>
            <div className="grid grid-cols-2 gap-3">
              {['READING', 'LISTENING', 'WRITING', 'SPEAKING'].map(skill => {
                const info = SKILL_INFO[skill]
                return (
                  <div key={skill} className={`border rounded-lg p-3 ${info.color}`}>
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{info.icon}</span>
                      <span className="font-medium text-gray-900">{info.title}</span>
                    </div>
                  </div>
                )
              })}
            </div>
            <p className="text-sm text-gray-500 mt-3">
              Estimated time: ~70 minutes / Tempo stimato: ~70 minuti
            </p>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => setShowIntro(false)}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
            >
              Begin Test / Inizia il Test
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Placement Test</h1>
        <p className="text-gray-600">Complete all sections to determine your CEFR level across all language skills.</p>
        <div className="flex justify-center gap-3 mt-4">
          {!isPaused ? (
            <button
              onClick={handlePause}
              disabled={actionLoading || allCompleted}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              <Pause className="w-4 h-4" /> Pause Test
            </button>
          ) : (
            <button
              onClick={handleResume}
              disabled={actionLoading}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              <Play className="w-4 h-4" /> Resume Test
            </button>
          )}
          <button
            onClick={handleRestart}
            disabled={actionLoading}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-700 bg-white border border-red-300 rounded-lg hover:bg-red-50 disabled:opacity-50"
          >
            <RotateCcw className="w-4 h-4" /> Restart Test
          </button>
        </div>
      </div>

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
              className={`border-2 rounded-lg p-6 transition-all ${info.color} ${
                section.status === 'COMPLETED' ? 'opacity-75' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{info.icon}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{info.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{info.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span>{section.timeLimitMin} minutes</span>
                      <span>{section.questionsLimit} questions</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  {section.status === 'COMPLETED' && (
                    <div>
                      <span className="inline-block px-3 py-1 bg-green-500 text-white text-sm font-bold rounded-full">
                        {section.cefrLevel || 'Done'}
                      </span>
                      {section.percentageScore != null && (
                        <p className="text-xs text-gray-500 mt-1">{section.percentageScore}%</p>
                      )}
                    </div>
                  )}

                  {section.status === 'IN_PROGRESS' && (
                    <button
                      onClick={() => handleStartSection(section)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      Continue
                    </button>
                  )}

                  {section.status === 'PENDING' && canStart && (
                    <button
                      onClick={() => handleStartSection(section)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      Start
                    </button>
                  )}

                  {section.status === 'PENDING' && !canStart && (
                    <span className="text-sm text-gray-400">Locked</span>
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
