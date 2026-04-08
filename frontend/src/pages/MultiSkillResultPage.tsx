import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { assessmentApi } from '../services/assessmentApi'
import { useToast } from '../components/common/Toast'
import { useAuth } from '../contexts/AuthContext'
import {
  BookOpen, Headphones, PenTool, Mic, Download, ArrowLeft,
  CheckCircle, BookType, Shuffle, Eraser, FileText, TrendingUp, Lightbulb,
  Edit3, Save, X, XCircle
} from 'lucide-react'

// ─── GSE & CEFR Mapping (from Maka/Versant reference) ───

const CEFR_TO_GSE: Record<string, number> = {
  A1: 22, A2: 33, B1: 46, B2: 59, C1: 76, C2: 85,
}

const CEFR_TO_VERSANT: Record<string, string> = {
  A1: '22-27', A2: '30-36', B1: '43-50', B2: '51-67', C1: '76-84', C2: '85-90',
}

const LEVEL_NAMES: Record<string, string> = {
  A1: 'Beginner', A2: 'Elementary', B1: 'Intermediate',
  B2: 'Upper Intermediate', C1: 'Advanced', C2: 'Proficiency'
}

// ─── Per-skill candidate descriptions (from Versant/Maka chart) ───

const SKILL_DESCRIPTIONS: Record<string, Record<string, string>> = {
  READING: {
    A1: 'Can understand familiar names, words and very simple sentences, for example on notices and posters or in catalogues.',
    A2: 'Can read very short, simple texts. Can find specific, predictable information in simple everyday material such as advertisements and timetables.',
    B1: 'Can understand texts that consist mainly of high frequency everyday or job-related language. Can understand the description of events, feelings and wishes in personal letters.',
    B2: 'Can read articles and reports concerned with contemporary problems. Can understand contemporary literary prose.',
    C1: 'Can understand long and complex factual and literary texts, appreciating distinctions of style. Can understand specialised articles and longer technical instructions.',
    C2: 'Can read with ease virtually all forms of the written language, including abstract, structurally or linguistically complex texts such as manuals, specialised articles and literary works.',
  },
  LISTENING: {
    A1: 'Can recognise familiar words and very basic phrases concerning themselves, their family and immediate concrete surroundings when people speak slowly and clearly.',
    A2: 'Can understand phrases and the highest frequency vocabulary related to areas of most immediate personal relevance. Can catch the main point in short, clear, simple messages and announcements.',
    B1: 'Can understand the main points of clear standard speech on familiar matters regularly encountered in work, school, leisure, etc. Can understand the main point of many radio or TV programmes.',
    B2: 'Can understand extended speech and lectures and follow even complex lines of argument provided the topic is reasonably familiar. Can understand most TV news and current affairs programmes.',
    C1: 'Can understand extended speech even when it is not clearly structured and when relationships are only implied and not signalled explicitly. Can understand television programmes and films without too much effort.',
    C2: 'Has no difficulty in understanding any kind of spoken language, whether live or broadcast, even when delivered at fast native speed, provided they have some time to get familiar with the accent.',
  },
  WRITING: {
    A1: 'Can write short, simple notes and messages. Can write a very simple personal letter, for example thanking someone for something.',
    A2: 'Can write simple connected text on topics which are familiar or of personal interest. Can write personal letters describing experiences and impressions.',
    B1: 'Can write simple connected text on topics which are familiar or of personal interest. Can write personal letters describing experiences and impressions.',
    B2: 'Can write clear, detailed text on a wide range of subjects related to their interests. Can write an essay or report, passing on information or giving reasons in support of or against a particular point of view.',
    C1: 'Can express themselves in clear, well-structured text, expressing points of view at some length. Can write about complex subjects in a letter, an essay or a report, underlining what they consider to be the salient issues.',
    C2: 'Can write clear, smoothly-flowing text in an appropriate style. Can write complex letters, reports or articles which present a case with an effective logical structure which helps the recipient to notice and remember significant points.',
  },
  SPEAKING: {
    A1: 'Can use simple phrases and sentences to describe where they live and people they know.',
    A2: 'Can use a series of phrases and sentences to describe in simple terms their family and other people, living conditions, their educational background and their present or most recent job.',
    B1: 'Can connect phrases in a simple way in order to describe experiences and events, dreams, hopes and ambitions. Can briefly give reasons and explanations for opinions and plans.',
    B2: 'Can present clear, detailed descriptions on a wide range of subjects related to their field of interest. Can explain a viewpoint on a topical issue giving the advantages and disadvantages of various options.',
    C1: 'Can present clear, detailed descriptions of complex subjects integrating sub-themes, developing particular points and rounding off with an appropriate conclusion.',
    C2: 'Can present a clear, smoothly-flowing description or argument in a style appropriate to the context and with an effective logical structure which helps the recipient to notice and remember significant points.',
  },
}

// ─── Tips to improve per skill per level ───

const IMPROVEMENT_TIPS: Record<string, Record<string, string[]>> = {
  READING: {
    A1: ['Practice reading simple signs, menus, and short messages.', 'Use picture dictionaries to build vocabulary.'],
    A2: ['Read short news articles and advertisements.', 'Practice reading entertainment listings and catalogues.'],
    B1: ['Read news and magazine articles, extracting main ideas.', 'Try reading simple short stories or graded readers.'],
    B2: ['Read opinion articles and practice identifying arguments.', 'Explore academic texts in areas of interest.'],
    C1: ['Read complex articles and literary texts for nuance.', 'Practice distinguishing between different writing styles.'],
    C2: ['Read abstract academic papers and professional journals.', 'Analyse complex arguments across different genres.'],
  },
  LISTENING: {
    A1: ['Listen to very simple conversations spoken slowly.', 'Practice with basic greetings and common phrases.'],
    A2: ['Watch short videos on everyday topics with subtitles.', 'Practice listening to announcements and directions.'],
    B1: ['Listen to podcasts on familiar topics without subtitles.', 'Practice following the main points of discussions.'],
    B2: ['Watch news programmes and follow complex arguments.', 'Practice listening to lectures and taking notes.'],
    C1: ['Listen to debates and academic lectures without support.', 'Practice understanding implicit meaning and irony.'],
    C2: ['Listen to fast-paced native speech and regional accents.', 'Practice understanding specialised content without context.'],
  },
  WRITING: {
    A1: ['Practice writing short personal messages and postcards.', 'Fill in forms with personal details.'],
    A2: ['Write short descriptions of daily routine and family.', 'Practice writing simple emails about familiar topics.'],
    B1: ['Write personal letters about experiences and opinions.', 'Practice writing short essays with clear structure.'],
    B2: ['Write argumentative essays with supporting evidence.', 'Practice report writing for workplace situations.'],
    C1: ['Write complex essays integrating multiple perspectives.', 'Practice writing professional reports with clear conclusions.'],
    C2: ['Write sophisticated critical reviews and analyses.', 'Practice writing for different audiences and purposes.'],
  },
  SPEAKING: {
    A1: ['Practice introducing yourself and describing your surroundings.', 'Describe your daily routine in simple sentences.'],
    A2: ['Practice explaining likes, dislikes, and daily activities.', 'Describe your family and educational background.'],
    B1: ['Practice telling stories about past experiences.', 'Give brief explanations for your opinions.'],
    B2: ['Practice debating topics and presenting different viewpoints.', 'Explain complex processes or concepts clearly.'],
    C1: ['Present detailed analyses of complex topics.', 'Practice handling challenging questions spontaneously.'],
    C2: ['Engage in sophisticated discussions on abstract topics.', 'Practice nuanced argumentation and persuasion.'],
  },
}

// ─── Skill visual config ───

interface SkillMeta {
  icon: React.ElementType; label: string; color: string; barColor: string
  gradientFrom: string; gradientTo: string; bg: string; border: string; badgeBg: string
}

const SKILL_META: Record<string, SkillMeta> = {
  READING: { icon: BookOpen, label: 'Reading', color: 'text-blue-700', barColor: 'bg-blue-500', gradientFrom: 'from-blue-500', gradientTo: 'to-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', badgeBg: 'bg-blue-100' },
  LISTENING: { icon: Headphones, label: 'Listening', color: 'text-green-700', barColor: 'bg-green-500', gradientFrom: 'from-green-500', gradientTo: 'to-green-600', bg: 'bg-green-50', border: 'border-green-200', badgeBg: 'bg-green-100' },
  WRITING: { icon: PenTool, label: 'Writing', color: 'text-amber-700', barColor: 'bg-amber-500', gradientFrom: 'from-amber-500', gradientTo: 'to-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', badgeBg: 'bg-amber-100' },
  SPEAKING: { icon: Mic, label: 'Speaking', color: 'text-purple-700', barColor: 'bg-purple-500', gradientFrom: 'from-purple-500', gradientTo: 'to-purple-600', bg: 'bg-purple-50', border: 'border-purple-200', badgeBg: 'bg-purple-100' },
  GRAMMAR: { icon: BookType, label: 'Grammar', color: 'text-indigo-700', barColor: 'bg-indigo-500', gradientFrom: 'from-indigo-500', gradientTo: 'to-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-200', badgeBg: 'bg-indigo-100' },
  VOCABULARY: { icon: FileText, label: 'Vocabulary', color: 'text-teal-700', barColor: 'bg-teal-500', gradientFrom: 'from-teal-500', gradientTo: 'to-teal-600', bg: 'bg-teal-50', border: 'border-teal-200', badgeBg: 'bg-teal-100' },
  ERROR_CORRECTION: { icon: Eraser, label: 'Error Correction', color: 'text-red-700', barColor: 'bg-red-500', gradientFrom: 'from-red-500', gradientTo: 'to-red-600', bg: 'bg-red-50', border: 'border-red-200', badgeBg: 'bg-red-100' },
  SENTENCE_TRANSFORMATION: { icon: Shuffle, label: 'Transformation', color: 'text-orange-700', barColor: 'bg-orange-500', gradientFrom: 'from-orange-500', gradientTo: 'to-orange-600', bg: 'bg-orange-50', border: 'border-orange-200', badgeBg: 'bg-orange-100' },
}

const LEVEL_COLORS: Record<string, { from: string; to: string }> = {
  A1: { from: 'from-gray-400', to: 'to-gray-500' },
  A2: { from: 'from-green-400', to: 'to-green-600' },
  B1: { from: 'from-blue-400', to: 'to-blue-600' },
  B2: { from: 'from-indigo-400', to: 'to-indigo-600' },
  C1: { from: 'from-purple-400', to: 'to-purple-600' },
  C2: { from: 'from-amber-400', to: 'to-amber-600' },
}

const LANGUAGE_FLAGS: Record<string, string> = {
  English: '\u{1F1EC}\u{1F1E7}', Spanish: '\u{1F1EA}\u{1F1F8}',
  French: '\u{1F1EB}\u{1F1F7}', German: '\u{1F1E9}\u{1F1EA}', Italian: '\u{1F1EE}\u{1F1F9}',
}

// ─── Bar chart heights (Versant-style) ───

function gseToBarHeight(gse: number): number {
  return Math.max(8, Math.min(100, ((gse - 10) / 80) * 100))
}

function cefrToGse(level?: string): number {
  return CEFR_TO_GSE[level || 'A1'] || 22
}

// ─── Helpers ───

function formatDate(dateStr: string | undefined): string {
  if (!dateStr) return ''
  try {
    return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  } catch { return '' }
}

// ─── Component ───

export function MultiSkillResultPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const toast = useToast()
  const { isAdmin } = useAuth()
  const [results, setResults] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingSection, setEditingSection] = useState<string | null>(null)
  const [editForm, setEditForm] = useState({ cefrLevel: 'A1', overall: 0, feedback: '' })
  const [saving, setSaving] = useState(false)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    assessmentApi.getMultiSkillResults(id)
      .then(data => { setResults(data); setLoading(false) })
      .catch(err => { setError(err.response?.data?.error || err.message); setLoading(false) })
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

  const reloadResults = () => {
    assessmentApi.getMultiSkillResults(id!)
      .then(data => setResults(data))
      .catch(() => {})
  }

  const handleStartEdit = (section: any) => {
    setEditingSection(section.id)
    setEditForm({
      cefrLevel: section.cefrLevel || 'A1',
      overall: section.percentageScore || 0,
      feedback: section.teacherScore?.feedback || ''
    })
  }

  const handleSaveScore = async (sectionId: string) => {
    try {
      setSaving(true)
      await assessmentApi.submitTeacherScore(id!, sectionId, editForm)
      toast.success('Score updated successfully')
      setEditingSection(null)
      reloadResults()
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Failed to save score')
    } finally {
      setSaving(false)
    }
  }

  const { assessment, sections } = results
  const overallLevel = assessment.cefrLevel || 'N/A'
  const levelStyle = LEVEL_COLORS[overallLevel] || LEVEL_COLORS.B1
  const overallGse = cefrToGse(overallLevel)

  // Get the 4 main skill sections, preferring assessment-level CEFR when available
  const mainSkills = ['READING', 'LISTENING', 'WRITING', 'SPEAKING']
  const assessmentSkillLevels: Record<string, string | null> = {
    READING: assessment.readingLevel,
    LISTENING: assessment.listeningLevel,
    WRITING: assessment.writingLevel,
    SPEAKING: assessment.speakingLevel,
  }
  const skillSections = mainSkills.map(skill => {
    const section = sections.find((s: any) => s.skill === skill)
    if (!section) return null
    // Use the assessment-level skill CEFR if section-level is missing
    const effectiveLevel = section.cefrLevel || assessmentSkillLevels[skill] || null
    return { ...section, cefrLevel: effectiveLevel }
  }).filter(Boolean)

  // For the bar chart
  const barColors = ['bg-blue-500', 'bg-green-500', 'bg-amber-500', 'bg-purple-500']

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* ─── Header Ribbon ─── */}
      <div className="relative rounded-2xl overflow-hidden shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-amber-500 rounded-2xl" />
        <div className="relative m-[2px] bg-white rounded-2xl">
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-8 py-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/favicon.webp" alt="Maka" className="h-8 w-8 rounded-full ring-2 ring-white/20" />
              <CheckCircle className="w-6 h-6 text-emerald-400" />
              <h1 className="text-xl font-bold text-white">Test Complete</h1>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">{LANGUAGE_FLAGS[assessment.language] || ''}</span>
              <span className="text-sm text-slate-300 font-medium">{assessment.language} Placement Test</span>
            </div>
          </div>

          <div className="px-8 py-10">
            {/* ─── Student Info ─── */}
            <div className="text-center mb-8">
              <p className="text-lg text-gray-500 mb-1">Congratulations</p>
              <h2 className="text-3xl font-bold text-gray-900 mb-1">{results.student?.name || 'Student'}</h2>
              {formatDate(assessment.completedAt) && (
                <p className="text-sm text-gray-400">{formatDate(assessment.completedAt)}</p>
              )}
            </div>

            {/* ─── Overall Score Card (Versant-style) ─── */}
            <div className="flex flex-col md:flex-row gap-8 mb-10">
              {/* Left: GSE score + CEFR badge */}
              <div className="flex flex-col items-center md:items-start">
                <p className="text-sm text-gray-500 mb-2">Overall GSE Score</p>
                <div className="flex items-end gap-2 mb-1">
                  <span className="text-6xl font-black text-gray-900">{overallGse}</span>
                  <span className="text-gray-400 text-lg mb-2">/90</span>
                </div>
                <div className={`inline-flex px-4 py-1.5 rounded-full bg-gradient-to-r ${levelStyle.from} ${levelStyle.to} text-white font-bold text-lg shadow-md mb-3`}>
                  CEFR: {overallLevel}
                </div>
                <p className="text-sm text-gray-400">{LEVEL_NAMES[overallLevel] || ''}</p>
                {assessment.score != null && (
                  <p className="text-xs text-gray-400 mt-1">Versant equivalent: {CEFR_TO_VERSANT[overallLevel] || '--'}/80</p>
                )}
              </div>

              {/* Right: Candidate description */}
              <div className="flex-1 bg-gray-50 rounded-xl p-5 border border-gray-100">
                <p className="text-sm text-gray-800 leading-relaxed">
                  {SKILL_DESCRIPTIONS.READING[overallLevel] || 'Results are being evaluated.'}
                </p>
                <p className="text-xs text-gray-400 mt-3">
                  The Overall Score represents the ability to understand spoken and written {assessment.language} and respond appropriately in speaking and writing on everyday and workplace topics. Scores are based on a weighted combination of the four skill scores.
                </p>
              </div>
            </div>

            {/* ─── Versant-style Bar Chart ─── */}
            <div className="mb-10">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Skill Scores</h3>
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                {/* Y-axis labels + bars */}
                <div className="flex items-end gap-1">
                  {/* Y-axis — positioned absolutely to align with grid lines */}
                  <div className="relative h-[240px] w-14 pr-2 pb-8 shrink-0">
                    {[
                      { v: 90, label: 'C2' }, { v: 80, label: 'C1' }, { v: 70, label: 'B2+' },
                      { v: 60, label: 'B2' }, { v: 50, label: 'B1' }, { v: 40, label: 'A2+' },
                      { v: 30, label: 'A2' }, { v: 20, label: 'A1' }, { v: 10, label: '' }
                    ].map(({ v, label }) => (
                      <div
                        key={v}
                        className="absolute right-2 flex items-center gap-1 -translate-y-1/2"
                        style={{ bottom: `${((v - 10) / 80) * 100 * (200 / 240) + (32 / 240) * 100}%` }}
                      >
                        <span className="text-xs text-gray-400 tabular-nums">{v}</span>
                        {label && <span className="text-[10px] text-gray-300">{label}</span>}
                      </div>
                    ))}
                  </div>

                  {/* Bars */}
                  <div className="flex-1 flex items-end justify-around h-[240px] border-l border-b border-gray-200 relative pb-8">
                    {/* Horizontal grid lines */}
                    {[20, 30, 40, 50, 60, 70, 80, 90].map(v => (
                      <div key={v} className="absolute left-0 right-0 border-t border-gray-100" style={{ bottom: `${((v - 10) / 80) * 100 * (200 / 232) + (32 / 232) * 100}%` }} />
                    ))}

                    {skillSections.map((section: any, i: number) => {
                      const level = section.cefrLevel || 'A1'
                      const gse = cefrToGse(level)
                      const height = gseToBarHeight(gse)
                      const meta = SKILL_META[section.skill]
                      return (
                        <div key={section.skill} className="flex flex-col items-center gap-1 relative z-10" style={{ width: '20%' }}>
                          {/* GSE value */}
                          <span className="text-sm font-bold text-gray-700">{gse}</span>
                          {/* CEFR level badge */}
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${meta.badgeBg} ${meta.color}`}>
                            {level}
                          </span>
                          {/* Bar */}
                          <div
                            className={`w-16 ${barColors[i]} rounded-t-lg transition-all duration-700 ease-out shadow-sm`}
                            style={{ height: `${height}%` }}
                          />
                          {/* Skill label */}
                          <div className="flex items-center gap-1 mt-1">
                            <meta.icon className="w-3.5 h-3.5 text-gray-500" />
                            <span className="text-xs text-gray-600 font-medium">{meta.label}</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Overall GSE indicator */}
                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-gray-200">
                  <div className="w-4 h-0.5 bg-red-500" />
                  <span className="text-xs text-gray-500">Overall GSE: <strong className="text-gray-700">{overallGse}</strong>/90</span>
                  <span className="text-xs text-gray-400 ml-2">CEFR: <strong className="text-gray-700">{overallLevel}</strong></span>
                </div>
              </div>
            </div>

            {/* ─── Per-Skill Detail Cards (Versant-style) ─── */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Current Capabilities in Detail</h3>
              {skillSections.map((section: any) => {
                const meta = SKILL_META[section.skill] || SKILL_META.READING
                const Icon = meta.icon
                const level = section.cefrLevel || 'A1'
                const gse = cefrToGse(level)
                const description = SKILL_DESCRIPTIONS[section.skill]?.[level] || ''
                const tips = IMPROVEMENT_TIPS[section.skill]?.[level] || []

                return (
                  <div key={section.id} className={`${meta.bg} border ${meta.border} rounded-xl p-6`}>
                    <div className="flex flex-col md:flex-row md:items-start gap-5">
                      {/* Left: Score info */}
                      <div className="flex items-center gap-4 md:w-64 shrink-0">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${meta.gradientFrom} ${meta.gradientTo} flex items-center justify-center shadow-sm`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className={`text-lg font-bold ${meta.color}`}>{meta.label}</h4>
                            {isAdmin && editingSection !== section.id && (
                              <button
                                onClick={() => handleStartEdit(section)}
                                className="p-1 rounded hover:bg-white/60 transition-colors"
                                title="Edit score"
                              >
                                <Edit3 className="w-3.5 h-3.5 text-gray-400 hover:text-gray-600" />
                              </button>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className={`px-2 py-0.5 rounded-md ${meta.badgeBg} text-xs font-bold ${meta.color}`}>
                              GSE: {gse}/90
                            </span>
                            <span className="text-xs text-gray-500">CEFR: <strong>{level}</strong></span>
                          </div>
                          {section.percentageScore != null && (
                            <p className="text-xs text-gray-400 mt-1">{section.questionsAnswered}/{section.questionsTotal} questions &middot; {section.percentageScore}%</p>
                          )}
                          {section.teacherScore && (
                            <div className="flex items-center gap-1 mt-1">
                              <CheckCircle className="w-3 h-3 text-emerald-500" />
                              <span className="text-xs text-emerald-600 font-medium">Teacher reviewed</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right: Description + Tips */}
                      <div className="flex-1 space-y-3">
                        {editingSection === section.id ? (
                          <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-semibold text-gray-700">Admin Score Override</span>
                              <button onClick={() => setEditingSection(null)} className="p-1 hover:bg-gray-100 rounded">
                                <X className="w-4 h-4 text-gray-400" />
                              </button>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="text-xs text-gray-500 font-medium">CEFR Level</label>
                                <select
                                  value={editForm.cefrLevel}
                                  onChange={(e) => setEditForm(prev => ({ ...prev, cefrLevel: e.target.value }))}
                                  className="w-full p-2 border border-gray-200 rounded-lg text-sm mt-1"
                                >
                                  {['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map(l => (
                                    <option key={l} value={l}>{l} — {LEVEL_NAMES[l]}</option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <label className="text-xs text-gray-500 font-medium">Overall Score (0-100)</label>
                                <input
                                  type="number" min="0" max="100"
                                  value={editForm.overall}
                                  onChange={(e) => setEditForm(prev => ({ ...prev, overall: parseInt(e.target.value) || 0 }))}
                                  className="w-full p-2 border border-gray-200 rounded-lg text-sm mt-1"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="text-xs text-gray-500 font-medium">Feedback (optional)</label>
                              <textarea
                                value={editForm.feedback}
                                onChange={(e) => setEditForm(prev => ({ ...prev, feedback: e.target.value }))}
                                rows={2}
                                placeholder="Add notes about this score adjustment..."
                                className="w-full p-2 border border-gray-200 rounded-lg text-sm mt-1 resize-none"
                              />
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleSaveScore(section.id)}
                                disabled={saving}
                                className="flex items-center gap-1.5 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 disabled:opacity-50 transition-colors"
                              >
                                <Save className="w-3.5 h-3.5" />
                                {saving ? 'Saving...' : 'Save'}
                              </button>
                              <button
                                onClick={() => setEditingSection(null)}
                                className="px-4 py-2 text-gray-600 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <p className="text-sm text-gray-700 leading-relaxed">{description}</p>
                            {tips.length > 0 && (
                              <div>
                                <div className="flex items-center gap-1.5 mb-1.5">
                                  <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                                  <span className="text-xs font-semibold text-amber-700">Tips to improve:</span>
                                </div>
                                <ul className="space-y-1">
                                  {tips.map((tip, i) => (
                                    <li key={i} className="text-xs text-gray-600 flex items-start gap-1.5">
                                      <TrendingUp className="w-3 h-3 text-gray-400 mt-0.5 shrink-0" />
                                      {tip}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>

                    {/* Admin: View All Answers */}
                    {isAdmin && section.answers && section.answers.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-200/60">
                        <button
                          onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                          className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
                        >
                          <FileText className="w-4 h-4" />
                          {expandedSection === section.id ? 'Hide Answers' : `View All Answers (${section.answers.length})`}
                        </button>

                        {expandedSection === section.id && (
                          <div className="mt-3 space-y-2">
                            {section.answers.map((ans: any, idx: number) => (
                              <div key={idx} className={`bg-white rounded-lg border p-3 ${ans.isCorrect ? 'border-green-200' : 'border-red-200'}`}>
                                <div className="flex items-start gap-2">
                                  <div className="flex-shrink-0 mt-0.5">
                                    {ans.isCorrect
                                      ? <CheckCircle className="w-4 h-4 text-green-500" />
                                      : <XCircle className="w-4 h-4 text-red-500" />
                                    }
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className="text-xs font-bold text-gray-400">Q{idx + 1}</span>
                                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 font-medium">{ans.cefrLevel}</span>
                                      <span className="text-[10px] text-gray-400">{ans.questionType?.replace(/_/g, ' ')}</span>
                                    </div>
                                    <p className="text-sm text-gray-800 mb-1">{ans.questionText}</p>
                                    {ans.passage && (
                                      <p className="text-xs text-gray-500 italic mb-1 line-clamp-2">{ans.passage}</p>
                                    )}
                                    {ans.options && Array.isArray(ans.options) ? (
                                      <div className="space-y-1 mt-1">
                                        {ans.options.map((opt: any) => {
                                          const isStudentAnswer = opt.value === ans.studentAnswer
                                          const isCorrectAnswer = opt.value === ans.correctAnswer
                                          return (
                                            <div
                                              key={opt.value}
                                              className={`text-xs px-2 py-1 rounded ${
                                                isCorrectAnswer ? 'bg-green-50 text-green-800 font-medium' :
                                                isStudentAnswer ? 'bg-red-50 text-red-700' :
                                                'text-gray-500'
                                              }`}
                                            >
                                              {isCorrectAnswer && <CheckCircle className="w-3 h-3 inline mr-1 text-green-500" />}
                                              {isStudentAnswer && !isCorrectAnswer && <XCircle className="w-3 h-3 inline mr-1 text-red-400" />}
                                              {opt.label}
                                            </div>
                                          )
                                        })}
                                      </div>
                                    ) : (
                                      <div className="mt-1 space-y-0.5">
                                        <p className="text-xs">
                                          <span className="text-gray-400">Student: </span>
                                          <span className={ans.isCorrect ? 'text-green-700 font-medium' : 'text-red-600'}>{ans.studentAnswer}</span>
                                        </p>
                                        {!ans.isCorrect && ans.correctAnswer && (
                                          <p className="text-xs">
                                            <span className="text-gray-400">Correct: </span>
                                            <span className="text-green-700 font-medium">{ans.correctAnswer}</span>
                                          </p>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Admin: View Writing Responses */}
                    {isAdmin && section.skill === 'WRITING' && results.writingResponses?.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-200/60">
                        <p className="text-sm font-medium text-gray-500 mb-2">Writing Responses</p>
                        {results.writingResponses.map((wr: any) => (
                          <div key={wr.id} className="bg-white rounded-lg border border-gray-200 p-3 mb-2">
                            <p className="text-sm text-gray-800 whitespace-pre-wrap">{wr.responseText}</p>
                            <p className="text-xs text-gray-400 mt-1">{wr.wordCount} words</p>
                            {wr.aiEvaluation && (
                              <div className="mt-2 text-xs space-y-0.5">
                                <p className="font-medium text-blue-600">AI Evaluation: {wr.aiEvaluation.cefrLevel} — {wr.aiEvaluation.overall}/100</p>
                                <p className="text-gray-500">Grammar: {wr.aiEvaluation.grammar} | Vocabulary: {wr.aiEvaluation.vocabulary} | Coherence: {wr.aiEvaluation.coherence} | Spelling: {wr.aiEvaluation.spelling}</p>
                                {wr.aiEvaluation.feedback && <p className="text-gray-600 italic">{wr.aiEvaluation.feedback}</p>}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Admin: View Speaking Responses */}
                    {isAdmin && section.skill === 'SPEAKING' && results.speakingResponses?.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-200/60">
                        <p className="text-sm font-medium text-gray-500 mb-2">Speaking Responses</p>
                        {results.speakingResponses.map((sr: any) => (
                          <div key={sr.id} className="bg-white rounded-lg border border-gray-200 p-3 mb-2">
                            {sr.audioUrl && <audio controls src={sr.audioUrl} className="w-full h-10 mb-2" />}
                            {sr.transcript && <p className="text-sm text-gray-700 italic mb-1">"{sr.transcript}"</p>}
                            <p className="text-xs text-gray-400">{sr.duration ? `${sr.duration}s` : 'No duration'}</p>
                            {sr.aiEvaluation && (
                              <div className="mt-2 text-xs space-y-0.5">
                                <p className="font-medium text-blue-600">AI Evaluation: {sr.aiEvaluation.cefrLevel} — {sr.aiEvaluation.overall}/100</p>
                                <p className="text-gray-500">Pronunciation: {sr.aiEvaluation.pronunciation} | Fluency: {sr.aiEvaluation.fluency} | Grammar: {sr.aiEvaluation.grammar} | Vocabulary: {sr.aiEvaluation.vocabulary}</p>
                                {sr.aiEvaluation.feedback && <p className="text-gray-600 italic">{sr.aiEvaluation.feedback}</p>}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ─── Action Buttons ─── */}
      <div className="flex items-center justify-center gap-4 flex-wrap">
        <button
          onClick={() => navigate('/assessment')}
          className="flex items-center gap-2 px-6 py-2.5 text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all shadow-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Assessments
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
          className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all shadow-sm"
        >
          <Download className="w-4 h-4" /> Download PDF
        </button>
        <button
          onClick={async () => {
            try {
              const blob = await assessmentApi.downloadMultiSkillResultsPdf(id!, true)
              const url = URL.createObjectURL(blob)
              const a = document.createElement('a')
              a.href = url
              a.download = `${assessment.language}-placement-results-detailed.pdf`
              a.click()
              URL.revokeObjectURL(url)
            } catch {
              toast.info('Detailed PDF not available yet.')
            }
          }}
          className="flex items-center gap-2 px-6 py-2.5 text-blue-700 bg-blue-50 border border-blue-200 rounded-xl font-medium hover:bg-blue-100 transition-all shadow-sm"
        >
          <Download className="w-4 h-4" /> Detailed Report
        </button>
      </div>
    </div>
  )
}
