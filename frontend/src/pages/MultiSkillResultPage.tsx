import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { assessmentApi } from '../services/assessmentApi'
import { useToast } from '../components/common/Toast'
import {
  BookOpen,
  Headphones,
  PenTool,
  Mic,
  Award,
  Download,
  ArrowLeft,
  CheckCircle,
  BookType,
  Shuffle,
  Eraser,
  FileText
} from 'lucide-react'

interface SkillMeta {
  icon: React.ElementType
  label: string
  color: string
  barColor: string
  gradientFrom: string
  gradientTo: string
  bg: string
  border: string
  badgeBg: string
}

const SKILL_META: Record<string, SkillMeta> = {
  READING: {
    icon: BookOpen,
    label: 'Reading',
    color: 'text-blue-700',
    barColor: 'bg-blue-500',
    gradientFrom: 'from-blue-500',
    gradientTo: 'to-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    badgeBg: 'bg-blue-100'
  },
  LISTENING: {
    icon: Headphones,
    label: 'Listening',
    color: 'text-green-700',
    barColor: 'bg-green-500',
    gradientFrom: 'from-green-500',
    gradientTo: 'to-green-600',
    bg: 'bg-green-50',
    border: 'border-green-200',
    badgeBg: 'bg-green-100'
  },
  WRITING: {
    icon: PenTool,
    label: 'Writing',
    color: 'text-amber-700',
    barColor: 'bg-amber-500',
    gradientFrom: 'from-amber-500',
    gradientTo: 'to-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    badgeBg: 'bg-amber-100'
  },
  SPEAKING: {
    icon: Mic,
    label: 'Speaking',
    color: 'text-purple-700',
    barColor: 'bg-purple-500',
    gradientFrom: 'from-purple-500',
    gradientTo: 'to-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    badgeBg: 'bg-purple-100'
  },
  GRAMMAR: {
    icon: BookType,
    label: 'Grammar',
    color: 'text-indigo-700',
    barColor: 'bg-indigo-500',
    gradientFrom: 'from-indigo-500',
    gradientTo: 'to-indigo-600',
    bg: 'bg-indigo-50',
    border: 'border-indigo-200',
    badgeBg: 'bg-indigo-100'
  },
  VOCABULARY: {
    icon: FileText,
    label: 'Vocabulary',
    color: 'text-teal-700',
    barColor: 'bg-teal-500',
    gradientFrom: 'from-teal-500',
    gradientTo: 'to-teal-600',
    bg: 'bg-teal-50',
    border: 'border-teal-200',
    badgeBg: 'bg-teal-100'
  },
  ERROR_CORRECTION: {
    icon: Eraser,
    label: 'Error Correction',
    color: 'text-red-700',
    barColor: 'bg-red-500',
    gradientFrom: 'from-red-500',
    gradientTo: 'to-red-600',
    bg: 'bg-red-50',
    border: 'border-red-200',
    badgeBg: 'bg-red-100'
  },
  SENTENCE_TRANSFORMATION: {
    icon: Shuffle,
    label: 'Transformation',
    color: 'text-orange-700',
    barColor: 'bg-orange-500',
    gradientFrom: 'from-orange-500',
    gradientTo: 'to-orange-600',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    badgeBg: 'bg-orange-100'
  }
}

const LEVEL_NAMES: Record<string, string> = {
  A1: 'Beginner',
  A2: 'Elementary',
  B1: 'Intermediate',
  B2: 'Upper Intermediate',
  C1: 'Advanced',
  C2: 'Proficiency'
}

const LEVEL_COLORS: Record<string, { from: string; to: string; text: string }> = {
  A1: { from: 'from-gray-400', to: 'to-gray-500', text: 'text-gray-700' },
  A2: { from: 'from-green-400', to: 'to-green-600', text: 'text-green-700' },
  B1: { from: 'from-blue-400', to: 'to-blue-600', text: 'text-blue-700' },
  B2: { from: 'from-indigo-400', to: 'to-indigo-600', text: 'text-indigo-700' },
  C1: { from: 'from-purple-400', to: 'to-purple-600', text: 'text-purple-700' },
  C2: { from: 'from-amber-400', to: 'to-amber-600', text: 'text-amber-700' }
}

const LANGUAGE_FLAGS: Record<string, string> = {
  English: '\u{1F1EC}\u{1F1E7}',
  Spanish: '\u{1F1EA}\u{1F1F8}',
  French: '\u{1F1EB}\u{1F1F7}',
  German: '\u{1F1E9}\u{1F1EA}',
  Italian: '\u{1F1EE}\u{1F1F9}',
}

const CEFR_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']

const CEFR_BAR_COLORS: Record<string, string> = {
  A1: 'bg-emerald-400',
  A2: 'bg-green-500',
  B1: 'bg-blue-500',
  B2: 'bg-indigo-500',
  C1: 'bg-purple-500',
  C2: 'bg-amber-500',
}

function CefrLevelBar({ level }: { level: string }) {
  const idx = CEFR_LEVELS.indexOf(level)
  if (idx === -1) return null
  const pct = ((idx + 0.5) / CEFR_LEVELS.length) * 100
  return (
    <div className="w-full mt-6 mb-2">
      <div className="flex justify-between text-xs text-gray-400 mb-1.5 px-0.5">
        <span>A1</span>
        <span>A2</span>
        <span>B1</span>
        <span>B2</span>
        <span>C1</span>
        <span>C2</span>
      </div>
      <div className="relative w-full h-3 bg-gray-100 rounded-full overflow-hidden">
        {/* Gradient track */}
        <div className="absolute inset-0 flex">
          {CEFR_LEVELS.map((l, i) => (
            <div key={l} className={`flex-1 ${i <= idx ? (CEFR_BAR_COLORS[l] || 'bg-gray-300') : 'bg-gray-100'} ${i === 0 ? 'rounded-l-full' : ''} ${i === CEFR_LEVELS.length - 1 ? 'rounded-r-full' : ''}`} />
          ))}
        </div>
        {/* Level dividers */}
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="absolute top-0 bottom-0 w-px bg-white/60" style={{ left: `${(i / 6) * 100}%` }} />
        ))}
      </div>
      {/* Indicator arrow */}
      <div className="relative w-full h-4 mt-0.5">
        <div className="absolute flex flex-col items-center" style={{ left: `${pct}%`, transform: 'translateX(-50%)' }}>
          <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[6px] border-b-gray-700 rotate-180" />
          <span className="text-xs font-bold text-gray-700">{level}</span>
        </div>
      </div>
    </div>
  )
}

function formatDate(dateStr: string | undefined): string {
  if (!dateStr) return ''
  try {
    return new Date(dateStr).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  } catch {
    return ''
  }
}

export function MultiSkillResultPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const toast = useToast()
  const [results, setResults] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    assessmentApi
      .getMultiSkillResults(id)
      .then((data) => {
        setResults(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.response?.data?.error || err.message)
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return (
      <div className="flex items-center justify-center p-20">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-10 w-10 border-[3px] border-blue-200 border-t-blue-600" />
          <p className="text-sm text-gray-500 font-medium">Loading results...</p>
        </div>
      </div>
    )
  }

  if (error || !results) {
    return (
      <div className="max-w-lg mx-auto mt-12">
        <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-xl shadow-sm">
          <p className="font-medium">{error || 'Results not available'}</p>
        </div>
      </div>
    )
  }

  const { assessment, sections } = results
  const overallLevel = assessment.cefrLevel || 'N/A'
  const levelStyle = LEVEL_COLORS[overallLevel] || LEVEL_COLORS.B1
  const studentName = assessment.student?.name || 'Student'
  const completedDate = formatDate(assessment.completedAt || assessment.updatedAt)

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Certificate-style result card */}
      <div className="relative rounded-2xl overflow-hidden shadow-xl">
        {/* Gradient border effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-amber-500 rounded-2xl" />
        <div className="relative m-[2px] bg-white rounded-2xl">
          {/* Header ribbon */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-8 py-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-emerald-400" />
              <h1 className="text-xl font-bold text-white tracking-wide">
                Test Complete
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">{LANGUAGE_FLAGS[assessment.language] || ''}</span>
              <Award className="w-5 h-5 text-amber-400" />
              <span className="text-sm text-slate-300 font-medium">
                {assessment.language} Placement Test
              </span>
            </div>
          </div>

          {/* Main content */}
          <div className="px-8 py-10">
            {/* Student info and date */}
            <div className="text-center mb-8">
              <p className="text-lg text-gray-500 mb-1">Congratulations</p>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{studentName}</h2>
              {completedDate && (
                <p className="text-sm text-gray-400">{completedDate}</p>
              )}
            </div>

            {/* Overall CEFR level badge */}
            <div className="flex flex-col items-center mb-10">
              <div
                className={`w-32 h-32 rounded-full bg-gradient-to-br ${levelStyle.from} ${levelStyle.to} flex items-center justify-center shadow-lg mb-4`}
              >
                <span className="text-5xl font-extrabold text-white tracking-tight">
                  {overallLevel}
                </span>
              </div>
              <p className="text-xl font-semibold text-gray-800">
                {LEVEL_NAMES[overallLevel] || 'Pending'}
              </p>
              <p className="text-sm text-gray-400 mt-1">Overall Level</p>
              {assessment.score != null && (
                <div className="mt-3 px-5 py-2 bg-gray-50 border border-gray-100 rounded-full">
                  <span className="text-lg font-bold text-gray-700">{assessment.score}%</span>
                  <span className="text-gray-400 ml-1.5 text-sm">average score</span>
                </div>
              )}

              {/* CEFR Level Comparison Bar */}
              {overallLevel !== 'N/A' && (
                <div className="w-full max-w-md mt-4">
                  <CefrLevelBar level={overallLevel} />
                </div>
              )}
            </div>

            {/* Skill breakdown cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {sections.map((section: any) => {
                const meta = SKILL_META[section.skill] || SKILL_META.READING
                const Icon = meta.icon
                const score = section.finalScore || section.aiScore
                const level = score?.cefrLevel || section.cefrLevel
                const pct = section.percentageScore

                return (
                  <div
                    key={section.id}
                    className={`${meta.bg} border ${meta.border} rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow`}
                  >
                    {/* Skill header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`w-10 h-10 rounded-lg bg-gradient-to-br ${meta.gradientFrom} ${meta.gradientTo} flex items-center justify-center shadow-sm`}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className={`text-sm font-bold ${meta.color}`}>{meta.label}</h3>
                        <p className="text-xs text-gray-400">
                          {section.questionsAnswered}/{section.questionsTotal} questions
                        </p>
                      </div>
                    </div>

                    {/* Level display */}
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className={`text-3xl font-extrabold ${meta.color}`}>
                        {level || '...'}
                      </span>
                      <span className="text-xs text-gray-500">
                        {LEVEL_NAMES[level] || 'Evaluating...'}
                      </span>
                    </div>

                    {/* Progress bar */}
                    {pct != null && (
                      <div className="relative w-full bg-white/70 rounded-full h-6 overflow-hidden border border-white/50">
                        <div
                          className={`${meta.barColor} h-full rounded-full transition-all duration-700 ease-out flex items-center justify-end`}
                          style={{ width: `${Math.max(pct, 12)}%` }}
                        >
                          <span className="text-xs font-bold text-white pr-2 drop-shadow-sm">
                            {pct}%
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Status labels */}
                    {section.status === 'COMPLETED' && !level && (
                      <p className="mt-3 text-xs text-gray-400 italic">AI evaluation pending...</p>
                    )}
                    {section.teacherScore && (
                      <div className="mt-3 flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                        <p className="text-xs text-emerald-600 font-medium">Teacher reviewed</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => navigate('/assessment')}
          className="flex items-center gap-2 px-6 py-2.5 text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Assessments
        </button>
        <button
          onClick={async () => {
            try {
              const blob = await assessmentApi.downloadMultiSkillResultsPdf(id!)
              const url = URL.createObjectURL(blob)
              const a = document.createElement('a')
              a.href = url
              a.download = `${assessment.language}-placement-results.pdf`
              a.click()
              URL.revokeObjectURL(url)
            } catch {
              toast.info('PDF download not available yet.')
            }
          }}
          className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all shadow-sm shadow-blue-200"
        >
          <Download className="w-4 h-4" />
          Download PDF
        </button>
      </div>
    </div>
  )
}
