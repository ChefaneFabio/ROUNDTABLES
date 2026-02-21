import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { assessmentApi, AssessmentSection } from '../services/assessmentApi'
import { SectionNav } from '../components/assessment/SectionNav'

const SKILL_INFO: Record<string, { icon: string; title: string; description: string; color: string }> = {
  READING: {
    icon: '📖', title: 'Reading',
    description: 'Read passages and answer comprehension questions.',
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
  }
}

export function MultiSkillAssessmentPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [sections, setSections] = useState<AssessmentSection[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    loadSections()
  }, [id])

  const loadSections = async () => {
    try {
      setLoading(true)
      const data = await assessmentApi.getSections(id!)
      setSections(data)
    } catch (err: any) {
      setError(err.response?.data?.error || err.message)
    } finally {
      setLoading(false)
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

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">4-Skills Placement Test</h1>
        <p className="text-gray-600">Complete all four sections to determine your CEFR level across all language skills.</p>
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
