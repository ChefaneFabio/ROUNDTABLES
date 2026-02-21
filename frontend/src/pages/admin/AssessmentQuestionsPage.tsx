import React, { useState, useEffect, useCallback } from 'react'
import {
  Search, Plus, Eye, Edit, Trash2, X, ChevronLeft, ChevronRight,
  BookOpen, Headphones, PenTool, Mic, Database
} from 'lucide-react'
import { assessmentApi } from '../../services/assessmentApi'

const SKILLS = ['READING', 'LISTENING', 'WRITING', 'SPEAKING'] as const
const CEFR_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
const QUESTION_TYPES = [
  'MULTIPLE_CHOICE', 'FILL_BLANK', 'SHORT_ANSWER', 'READING',
  'LISTENING', 'DICTATION', 'WRITING', 'ESSAY', 'SPEAKING_PROMPT'
]

const SKILL_COLORS: Record<string, string> = {
  READING: 'bg-blue-100 text-blue-700',
  LISTENING: 'bg-purple-100 text-purple-700',
  WRITING: 'bg-green-100 text-green-700',
  SPEAKING: 'bg-orange-100 text-orange-700',
  GENERAL: 'bg-gray-100 text-gray-700'
}

const SKILL_ICONS: Record<string, React.ElementType> = {
  READING: BookOpen,
  LISTENING: Headphones,
  WRITING: PenTool,
  SPEAKING: Mic
}

interface QuestionForm {
  language: string
  cefrLevel: string
  questionType: string
  questionText: string
  correctAnswer: string
  skill: string
  options: { label: string; value: string }[]
  passage: string
  passageTitle: string
  points: number
  ttsScript: string
  ttsLanguageCode: string
  speakingPrompt: string
  rubric: string
  tags: string
  timeSuggested: number | ''
}

const emptyForm: QuestionForm = {
  language: 'English',
  cefrLevel: 'B1',
  questionType: 'MULTIPLE_CHOICE',
  questionText: '',
  correctAnswer: '',
  skill: 'READING',
  options: [{ label: 'A', value: '' }, { label: 'B', value: '' }, { label: 'C', value: '' }, { label: 'D', value: '' }],
  passage: '',
  passageTitle: '',
  points: 1,
  ttsScript: '',
  ttsLanguageCode: '',
  speakingPrompt: '',
  rubric: '',
  tags: '',
  timeSuggested: ''
}

const AssessmentQuestionsPage: React.FC = () => {
  const [summary, setSummary] = useState<Record<string, Record<string, Record<string, number>>>>({})
  const [questions, setQuestions] = useState<any[]>([])
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [seeding, setSeeding] = useState<string | null>(null)

  // Filters
  const [filterLanguage, setFilterLanguage] = useState<string>('')
  const [filterSkill, setFilterSkill] = useState<string>('')
  const [filterLevel, setFilterLevel] = useState<string>('')
  const [searchText, setSearchText] = useState<string>('')

  // Modals
  const [previewQuestion, setPreviewQuestion] = useState<any | null>(null)
  const [editModal, setEditModal] = useState<{ open: boolean; questionId?: string }>({ open: false })
  const [form, setForm] = useState<QuestionForm>({ ...emptyForm })
  const [saving, setSaving] = useState(false)

  const loadSummary = useCallback(async () => {
    try {
      const data = await assessmentApi.getQuestionBankSummary()
      setSummary(data)
    } catch (err) {
      console.error('Failed to load summary:', err)
    }
  }, [])

  const loadQuestions = useCallback(async () => {
    setIsLoading(true)
    try {
      const result = await assessmentApi.getQuestionBank({
        language: filterLanguage || undefined,
        skill: filterSkill || undefined,
        cefrLevel: filterLevel || undefined,
        search: searchText || undefined,
        page,
        limit: 20
      })
      setQuestions(result.questions)
      setTotal(result.total)
      setTotalPages(result.totalPages)
    } catch (err) {
      console.error('Failed to load questions:', err)
    } finally {
      setIsLoading(false)
    }
  }, [filterLanguage, filterSkill, filterLevel, searchText, page])

  useEffect(() => { loadSummary() }, [loadSummary])
  useEffect(() => { loadQuestions() }, [loadQuestions])

  const handleSeed = async (language: string) => {
    setSeeding(language)
    try {
      await assessmentApi.seedMultiSkillQuestions(language)
      await Promise.all([loadSummary(), loadQuestions()])
    } catch (err) {
      console.error('Failed to seed:', err)
    } finally {
      setSeeding(null)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this question?')) return
    try {
      await assessmentApi.deleteQuestion(id)
      await Promise.all([loadSummary(), loadQuestions()])
    } catch (err) {
      console.error('Failed to delete:', err)
    }
  }

  const openCreateModal = () => {
    setForm({ ...emptyForm })
    setEditModal({ open: true })
  }

  const openEditModal = async (id: string) => {
    try {
      const q = await assessmentApi.getQuestion(id)
      setForm({
        language: q.language,
        cefrLevel: q.cefrLevel,
        questionType: q.questionType,
        questionText: q.questionText,
        correctAnswer: q.correctAnswer || '',
        skill: q.skill || '',
        options: q.options || [{ label: 'A', value: '' }, { label: 'B', value: '' }, { label: 'C', value: '' }, { label: 'D', value: '' }],
        passage: q.passage || '',
        passageTitle: q.passageTitle || '',
        points: q.points,
        ttsScript: q.ttsScript || '',
        ttsLanguageCode: q.ttsLanguageCode || '',
        speakingPrompt: q.speakingPrompt || '',
        rubric: q.rubric ? JSON.stringify(q.rubric, null, 2) : '',
        tags: (q.tags || []).join(', '),
        timeSuggested: q.timeSuggested || ''
      })
      setEditModal({ open: true, questionId: id })
    } catch (err) {
      console.error('Failed to load question:', err)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const payload: any = {
        language: form.language,
        cefrLevel: form.cefrLevel,
        questionType: form.questionType,
        questionText: form.questionText,
        correctAnswer: form.correctAnswer,
        skill: form.skill || null,
        points: form.points,
        tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
        timeSuggested: form.timeSuggested ? Number(form.timeSuggested) : null
      }
      if (form.options.some(o => o.value)) payload.options = form.options.filter(o => o.value)
      if (form.passage) payload.passage = form.passage
      if (form.passageTitle) payload.passageTitle = form.passageTitle
      if (form.ttsScript) payload.ttsScript = form.ttsScript
      if (form.ttsLanguageCode) payload.ttsLanguageCode = form.ttsLanguageCode
      if (form.speakingPrompt) payload.speakingPrompt = form.speakingPrompt
      if (form.rubric) {
        try { payload.rubric = JSON.parse(form.rubric) } catch { /* ignore parse errors */ }
      }

      if (editModal.questionId) {
        await assessmentApi.updateQuestion(editModal.questionId, payload)
      } else {
        await assessmentApi.createQuestion(payload)
      }
      setEditModal({ open: false })
      await Promise.all([loadSummary(), loadQuestions()])
    } catch (err) {
      console.error('Failed to save question:', err)
    } finally {
      setSaving(false)
    }
  }

  const languages = Object.keys(summary)

  const getLanguageTotal = (lang: string) => {
    const skills = summary[lang] || {}
    let total = 0
    for (const skill of Object.values(skills)) {
      for (const count of Object.values(skill)) total += count
    }
    return total
  }

  const getSkillCount = (lang: string, skill: string) => {
    const levels = summary[lang]?.[skill] || {}
    return Object.values(levels).reduce((a, b) => a + b, 0)
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Question Bank</h1>
          <p className="text-gray-600">Manage assessment questions across all skills and levels</p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          New Question
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {(languages.length > 0 ? languages : ['English']).map(lang => (
          <div key={lang} className="bg-white rounded-lg border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">{lang}</h3>
              <span className="text-sm text-gray-500">{getLanguageTotal(lang)} questions</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              {SKILLS.map(skill => {
                const Icon = SKILL_ICONS[skill]
                const count = getSkillCount(lang, skill)
                return (
                  <div key={skill} className="flex items-center gap-2 text-sm text-gray-600">
                    <Icon className="w-4 h-4" />
                    <span>{skill.charAt(0) + skill.slice(1).toLowerCase()}: {count}</span>
                  </div>
                )
              })}
            </div>
            <button
              onClick={() => handleSeed(lang)}
              disabled={seeding === lang}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 transition-colors"
            >
              <Database className="w-4 h-4" />
              {seeding === lang ? 'Seeding...' : 'Seed Questions'}
            </button>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={filterLanguage}
            onChange={e => { setFilterLanguage(e.target.value); setPage(1) }}
            className="px-3 py-2 border rounded-lg text-sm"
          >
            <option value="">All Languages</option>
            <option value="English">English</option>
            <option value="Italian">Italian</option>
            <option value="Spanish">Spanish</option>
          </select>

          <div className="flex gap-1">
            <button
              onClick={() => { setFilterSkill(''); setPage(1) }}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                !filterSkill ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Skills
            </button>
            {SKILLS.map(skill => (
              <button
                key={skill}
                onClick={() => { setFilterSkill(skill); setPage(1) }}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  filterSkill === skill ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {skill.charAt(0) + skill.slice(1).toLowerCase()}
              </button>
            ))}
          </div>

          <select
            value={filterLevel}
            onChange={e => { setFilterLevel(e.target.value); setPage(1) }}
            className="px-3 py-2 border rounded-lg text-sm"
          >
            <option value="">All Levels</option>
            {CEFR_LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
          </select>

          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchText}
              onChange={e => { setSearchText(e.target.value); setPage(1) }}
              className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm"
            />
          </div>
        </div>
      </div>

      {/* Questions Table */}
      {isLoading ? (
        <div className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => <div key={i} className="h-16 bg-gray-100 rounded" />)}
          </div>
        </div>
      ) : questions.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No questions found</p>
          <p className="text-sm text-gray-400 mt-1">Try adjusting filters or seed questions for a language</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Skill</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Level</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Question</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pts</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {questions.map(q => (
                <tr key={q.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${SKILL_COLORS[q.skill || 'GENERAL']}`}>
                      {q.skill || 'General'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs font-medium">
                      {q.cefrLevel}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {q.questionType.replace(/_/g, ' ')}
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm text-gray-900 line-clamp-2 max-w-md">
                      {q.questionText}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{q.points}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setPreviewQuestion(q)}
                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                        title="View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openEditModal(q.id)}
                        className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(q.id)}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-white rounded-lg border border-gray-200 px-4 py-3">
          <span className="text-sm text-gray-600">
            Showing {(page - 1) * 20 + 1}-{Math.min(page * 20, total)} of {total}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm text-gray-700">Page {page} of {totalPages}</span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewQuestion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={() => setPreviewQuestion(null)}>
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Question Preview</h3>
              <button onClick={() => setPreviewQuestion(null)} className="p-1 hover:bg-gray-100 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex gap-2">
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${SKILL_COLORS[previewQuestion.skill || 'GENERAL']}`}>
                  {previewQuestion.skill || 'General'}
                </span>
                <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs font-medium">{previewQuestion.cefrLevel}</span>
                <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                  {previewQuestion.questionType.replace(/_/g, ' ')}
                </span>
                <span className="px-2 py-0.5 bg-yellow-50 text-yellow-700 rounded text-xs font-medium">{previewQuestion.points} pts</span>
              </div>

              {previewQuestion.passage && (
                <div className="bg-gray-50 rounded-lg p-4">
                  {previewQuestion.passageTitle && (
                    <h4 className="font-medium text-gray-900 mb-2">{previewQuestion.passageTitle}</h4>
                  )}
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">{previewQuestion.passage}</p>
                </div>
              )}

              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Question</h4>
                <p className="text-gray-900">{previewQuestion.questionText}</p>
              </div>

              {previewQuestion.options && previewQuestion.options.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Options</h4>
                  <div className="space-y-1">
                    {previewQuestion.options.map((opt: any, i: number) => (
                      <div
                        key={i}
                        className={`px-3 py-2 rounded text-sm ${
                          opt.value === previewQuestion.correctAnswer ? 'bg-green-50 text-green-800 font-medium' : 'bg-gray-50 text-gray-700'
                        }`}
                      >
                        {opt.label}. {opt.value}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Correct Answer</h4>
                <p className="text-green-700 font-medium">{previewQuestion.correctAnswer}</p>
              </div>

              {previewQuestion.ttsScript && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">TTS Script</h4>
                  <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">{previewQuestion.ttsScript}</p>
                </div>
              )}

              {previewQuestion.speakingPrompt && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Speaking Prompt</h4>
                  <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">{previewQuestion.speakingPrompt}</p>
                </div>
              )}

              {previewQuestion.rubric && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Rubric</h4>
                  <pre className="text-xs text-gray-700 bg-gray-50 p-3 rounded overflow-x-auto">
                    {JSON.stringify(previewQuestion.rubric, null, 2)}
                  </pre>
                </div>
              )}

              {previewQuestion.tags && previewQuestion.tags.length > 0 && (
                <div className="flex gap-1 flex-wrap">
                  {previewQuestion.tags.map((tag: string, i: number) => (
                    <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">{tag}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Create/Edit Modal */}
      {editModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={() => setEditModal({ open: false })}>
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">{editModal.questionId ? 'Edit Question' : 'Create Question'}</h3>
              <button onClick={() => setEditModal({ open: false })} className="p-1 hover:bg-gray-100 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              {/* Row 1: Language, Skill, Level, Type */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Language</label>
                  <select value={form.language} onChange={e => setForm(f => ({ ...f, language: e.target.value }))} className="w-full px-3 py-2 border rounded-lg text-sm">
                    <option>English</option>
                    <option>Italian</option>
                    <option>Spanish</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Skill</label>
                  <select value={form.skill} onChange={e => setForm(f => ({ ...f, skill: e.target.value }))} className="w-full px-3 py-2 border rounded-lg text-sm">
                    <option value="">General</option>
                    {SKILLS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">CEFR Level</label>
                  <select value={form.cefrLevel} onChange={e => setForm(f => ({ ...f, cefrLevel: e.target.value }))} className="w-full px-3 py-2 border rounded-lg text-sm">
                    {CEFR_LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Question Type</label>
                  <select value={form.questionType} onChange={e => setForm(f => ({ ...f, questionType: e.target.value }))} className="w-full px-3 py-2 border rounded-lg text-sm">
                    {QUESTION_TYPES.map(t => <option key={t} value={t}>{t.replace(/_/g, ' ')}</option>)}
                  </select>
                </div>
              </div>

              {/* Question Text */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Question Text *</label>
                <textarea
                  value={form.questionText}
                  onChange={e => setForm(f => ({ ...f, questionText: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                  placeholder="Enter the question text..."
                />
              </div>

              {/* Correct Answer */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Correct Answer *</label>
                <input
                  type="text"
                  value={form.correctAnswer}
                  onChange={e => setForm(f => ({ ...f, correctAnswer: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                />
              </div>

              {/* Options (for MC) */}
              {(form.questionType === 'MULTIPLE_CHOICE' || form.questionType === 'READING' || form.questionType === 'LISTENING') && (
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Options</label>
                  <div className="space-y-2">
                    {form.options.map((opt, i) => (
                      <div key={i} className="flex gap-2 items-center">
                        <span className="text-sm font-medium text-gray-500 w-6">{opt.label}.</span>
                        <input
                          type="text"
                          value={opt.value}
                          onChange={e => {
                            const newOpts = [...form.options]
                            newOpts[i] = { ...newOpts[i], value: e.target.value }
                            setForm(f => ({ ...f, options: newOpts }))
                          }}
                          className="flex-1 px-3 py-2 border rounded-lg text-sm"
                          placeholder={`Option ${opt.label}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Passage (Reading) */}
              {(form.skill === 'READING' || form.questionType === 'READING') && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Passage Title</label>
                    <input
                      type="text"
                      value={form.passageTitle}
                      onChange={e => setForm(f => ({ ...f, passageTitle: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Passage</label>
                    <textarea
                      value={form.passage}
                      onChange={e => setForm(f => ({ ...f, passage: e.target.value }))}
                      rows={4}
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                    />
                  </div>
                </>
              )}

              {/* TTS Script (Listening) */}
              {(form.skill === 'LISTENING' || form.questionType === 'LISTENING' || form.questionType === 'DICTATION') && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">TTS Script</label>
                    <textarea
                      value={form.ttsScript}
                      onChange={e => setForm(f => ({ ...f, ttsScript: e.target.value }))}
                      rows={3}
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">TTS Language Code</label>
                    <input
                      type="text"
                      value={form.ttsLanguageCode}
                      onChange={e => setForm(f => ({ ...f, ttsLanguageCode: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                      placeholder="e.g. en-US"
                    />
                  </div>
                </>
              )}

              {/* Speaking Prompt */}
              {(form.skill === 'SPEAKING' || form.questionType === 'SPEAKING_PROMPT') && (
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Speaking Prompt</label>
                  <textarea
                    value={form.speakingPrompt}
                    onChange={e => setForm(f => ({ ...f, speakingPrompt: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
              )}

              {/* Rubric (Writing/Speaking) */}
              {(form.skill === 'WRITING' || form.skill === 'SPEAKING' || form.questionType === 'WRITING' || form.questionType === 'ESSAY') && (
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Rubric (JSON)</label>
                  <textarea
                    value={form.rubric}
                    onChange={e => setForm(f => ({ ...f, rubric: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border rounded-lg text-sm font-mono"
                    placeholder='{"criteria": "..."}'
                  />
                </div>
              )}

              {/* Points + Time */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Points</label>
                  <input
                    type="number"
                    value={form.points}
                    onChange={e => setForm(f => ({ ...f, points: parseInt(e.target.value) || 1 }))}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                    min={1}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Time (sec)</label>
                  <input
                    type="number"
                    value={form.timeSuggested}
                    onChange={e => setForm(f => ({ ...f, timeSuggested: e.target.value ? parseInt(e.target.value) : '' }))}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Tags</label>
                  <input
                    type="text"
                    value={form.tags}
                    onChange={e => setForm(f => ({ ...f, tags: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                    placeholder="tag1, tag2"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 p-4 border-t">
              <button
                onClick={() => setEditModal({ open: false })}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !form.questionText || !form.correctAnswer}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {saving ? 'Saving...' : editModal.questionId ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AssessmentQuestionsPage
