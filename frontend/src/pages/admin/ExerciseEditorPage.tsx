import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Plus, Edit, Trash2, Save, GripVertical } from 'lucide-react'
import { exerciseApi, ExerciseItem, ExerciseType } from '../../services/exerciseApi'

const EXERCISE_TYPES: { value: ExerciseType; label: string }[] = [
  { value: 'MULTIPLE_CHOICE', label: 'Multiple Choice' },
  { value: 'TRUE_FALSE', label: 'True/False' },
  { value: 'FILL_BLANKS', label: 'Fill in the Blanks' },
  { value: 'MATCHING', label: 'Matching' },
  { value: 'DRAG_DROP', label: 'Drag & Drop' },
  { value: 'REORDER', label: 'Reorder' },
  { value: 'LISTENING', label: 'Listening' },
]

const CEFR_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']

interface ExerciseForm {
  title: string
  description: string
  type: ExerciseType
  language: string
  cefrLevel: string
  instructions: string
  timeLimit: string
  passingScore: string
  isPublished: boolean
}

const defaultForm: ExerciseForm = {
  title: '',
  description: '',
  type: 'MULTIPLE_CHOICE',
  language: 'en',
  cefrLevel: '',
  instructions: '',
  timeLimit: '',
  passingScore: '70',
  isPublished: false,
}

interface ItemFormData {
  questionText: string
  points: string
  hint: string
  explanation: string
  audioUrl: string
  imageUrl: string
  // MULTIPLE_CHOICE
  options: { label: string; value: string }[]
  correctValue: string
  // TRUE_FALSE
  statement: string
  trueFalseAnswer: string
  // FILL_BLANKS
  fillText: string
  blanks: string[]
  // MATCHING
  leftItems: string[]
  rightItems: string[]
  // DRAG_DROP
  zones: string[]
  dragItems: { text: string; zone: string }[]
  // REORDER
  orderedItems: string[]
  // LISTENING
  listeningAudioUrl: string
  listeningType: string
  listeningAnswer: string
}

const defaultItemForm: ItemFormData = {
  questionText: '',
  points: '1',
  hint: '',
  explanation: '',
  audioUrl: '',
  imageUrl: '',
  options: [{ label: '', value: '' }, { label: '', value: '' }],
  correctValue: '',
  statement: '',
  trueFalseAnswer: 'true',
  fillText: '',
  blanks: [''],
  leftItems: ['', ''],
  rightItems: ['', ''],
  zones: [''],
  dragItems: [{ text: '', zone: '' }],
  orderedItems: ['', ''],
  listeningAudioUrl: '',
  listeningType: 'multiple_choice',
  listeningAnswer: '',
}

function buildItemPayload(type: ExerciseType, form: ItemFormData) {
  const base = {
    questionText: form.questionText || undefined,
    points: parseInt(form.points) || 1,
    hint: form.hint || undefined,
    explanation: form.explanation || undefined,
    audioUrl: form.audioUrl || undefined,
    imageUrl: form.imageUrl || undefined,
  }

  switch (type) {
    case 'MULTIPLE_CHOICE':
      return {
        ...base,
        content: { options: form.options.filter(o => o.label && o.value) },
        correctAnswer: { value: form.correctValue },
      }
    case 'TRUE_FALSE':
      return {
        ...base,
        content: { statement: form.statement || form.questionText },
        correctAnswer: { value: form.trueFalseAnswer === 'true' },
      }
    case 'FILL_BLANKS':
      return {
        ...base,
        content: { text: form.fillText },
        correctAnswer: { blanks: form.blanks.filter(b => b) },
      }
    case 'MATCHING':
      return {
        ...base,
        content: {
          leftItems: form.leftItems.filter(i => i),
          rightItems: form.rightItems.filter(i => i),
        },
        correctAnswer: {
          pairs: form.leftItems
            .map((l, i) => ({ left: l, right: form.rightItems[i] || '' }))
            .filter(p => p.left && p.right),
        },
      }
    case 'DRAG_DROP':
      return {
        ...base,
        content: {
          zones: form.zones.filter(z => z),
          items: form.dragItems.filter(i => i.text),
        },
        correctAnswer: {
          zones: form.dragItems.reduce((acc, item) => {
            if (item.zone && item.text) {
              if (!acc[item.zone]) acc[item.zone] = []
              acc[item.zone].push(item.text)
            }
            return acc
          }, {} as Record<string, string[]>),
        },
      }
    case 'REORDER':
      return {
        ...base,
        content: { items: form.orderedItems.filter(i => i) },
        correctAnswer: { order: form.orderedItems.filter(i => i) },
      }
    case 'LISTENING':
      return {
        ...base,
        audioUrl: form.listeningAudioUrl || form.audioUrl || undefined,
        content: { audioUrl: form.listeningAudioUrl || form.audioUrl, type: form.listeningType },
        correctAnswer: { value: form.listeningAnswer },
      }
    default:
      return {
        ...base,
        content: {},
        correctAnswer: {},
      }
  }
}

function parseItemToForm(type: ExerciseType, item: ExerciseItem): ItemFormData {
  const base: ItemFormData = {
    ...defaultItemForm,
    questionText: item.questionText || '',
    points: String(item.points || 1),
    hint: item.hint || '',
    explanation: item.explanation || '',
    audioUrl: item.audioUrl || '',
    imageUrl: item.imageUrl || '',
  }

  const content = item.content || {}
  const answer = item.correctAnswer || {}

  switch (type) {
    case 'MULTIPLE_CHOICE':
      return {
        ...base,
        options: content.options?.length ? content.options : defaultItemForm.options,
        correctValue: answer.value || '',
      }
    case 'TRUE_FALSE':
      return {
        ...base,
        statement: content.statement || '',
        trueFalseAnswer: String(answer.value ?? 'true'),
      }
    case 'FILL_BLANKS':
      return {
        ...base,
        fillText: content.text || '',
        blanks: answer.blanks?.length ? answer.blanks : [''],
      }
    case 'MATCHING':
      return {
        ...base,
        leftItems: content.leftItems?.length ? content.leftItems : ['', ''],
        rightItems: content.rightItems?.length ? content.rightItems : ['', ''],
      }
    case 'DRAG_DROP':
      return {
        ...base,
        zones: content.zones?.length ? content.zones : [''],
        dragItems: content.items?.length ? content.items : [{ text: '', zone: '' }],
      }
    case 'REORDER':
      return {
        ...base,
        orderedItems: content.items?.length ? content.items : ['', ''],
      }
    case 'LISTENING':
      return {
        ...base,
        listeningAudioUrl: content.audioUrl || item.audioUrl || '',
        listeningType: content.type || 'multiple_choice',
        listeningAnswer: answer.value || answer.text || '',
      }
    default:
      return base
  }
}

const ExerciseEditorPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isNew = !id || id === 'new'

  const [form, setForm] = useState<ExerciseForm>(defaultForm)
  const [exerciseId, setExerciseId] = useState<string | null>(isNew ? null : id!)
  const [items, setItems] = useState<ExerciseItem[]>([])
  const [isLoading, setIsLoading] = useState(!isNew)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Item modal state
  const [showItemModal, setShowItemModal] = useState(false)
  const [editingItem, setEditingItem] = useState<ExerciseItem | null>(null)
  const [itemForm, setItemForm] = useState<ItemFormData>(defaultItemForm)
  const [itemSaving, setItemSaving] = useState(false)

  useEffect(() => {
    if (!isNew && id) {
      loadExercise(id)
    }
  }, [id])

  const loadExercise = async (exerciseId: string) => {
    setIsLoading(true)
    try {
      const exercise = await exerciseApi.getExercise(exerciseId)
      setForm({
        title: exercise.title,
        description: exercise.description || '',
        type: exercise.type,
        language: exercise.language || 'en',
        cefrLevel: exercise.cefrLevel || '',
        instructions: exercise.instructions || '',
        timeLimit: exercise.timeLimit ? String(exercise.timeLimit) : '',
        passingScore: String(exercise.passingScore || 70),
        isPublished: exercise.isPublished,
      })
      setItems(exercise.items || [])
      setExerciseId(exercise.id)
    } catch (err) {
      console.error('Failed to load exercise:', err)
      setError('Failed to load exercise')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    if (!form.title.trim()) {
      setError('Title is required')
      return
    }
    setIsSaving(true)
    setError('')
    setSuccess('')

    try {
      const payload = {
        title: form.title,
        description: form.description || undefined,
        type: form.type,
        language: form.language,
        cefrLevel: form.cefrLevel || undefined,
        instructions: form.instructions || undefined,
        timeLimit: form.timeLimit ? parseInt(form.timeLimit) : undefined,
        passingScore: parseInt(form.passingScore) || 70,
        isPublished: form.isPublished,
      }

      if (exerciseId) {
        await exerciseApi.updateExercise(exerciseId, payload)
        setSuccess('Exercise updated successfully')
      } else {
        const created = await exerciseApi.createExercise(payload)
        setExerciseId(created.id)
        setSuccess('Exercise created successfully')
        navigate(`/admin/exercises/${created.id}`, { replace: true })
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save exercise')
    } finally {
      setIsSaving(false)
    }
  }

  const openAddItem = () => {
    setEditingItem(null)
    setItemForm(defaultItemForm)
    setShowItemModal(true)
  }

  const openEditItem = (item: ExerciseItem) => {
    setEditingItem(item)
    setItemForm(parseItemToForm(form.type, item))
    setShowItemModal(true)
  }

  const handleSaveItem = async () => {
    if (!exerciseId) return
    setItemSaving(true)
    try {
      const payload = buildItemPayload(form.type, itemForm)
      if (editingItem) {
        await exerciseApi.updateItem(exerciseId, editingItem.id, payload)
      } else {
        await exerciseApi.addItem(exerciseId, {
          ...payload,
          orderIndex: items.length,
        })
      }
      const exercise = await exerciseApi.getExercise(exerciseId)
      setItems(exercise.items || [])
      setShowItemModal(false)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save item')
    } finally {
      setItemSaving(false)
    }
  }

  const handleDeleteItem = async (itemId: string) => {
    if (!exerciseId || !confirm('Delete this item?')) return
    try {
      await exerciseApi.deleteItem(exerciseId, itemId)
      setItems(prev => prev.filter(i => i.id !== itemId))
    } catch (err) {
      console.error('Failed to delete item:', err)
    }
  }

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3" />
          <div className="h-64 bg-gray-200 rounded" />
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/admin/exercises')}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">
          {isNew ? 'New Exercise' : 'Edit Exercise'}
        </h1>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          {success}
        </div>
      )}

      {/* Metadata Form */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Exercise Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
            <input
              type="text"
              value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Exercise title"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Brief description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select
              value={form.type}
              onChange={e => setForm(f => ({ ...f, type: e.target.value as ExerciseType }))}
              disabled={!!exerciseId && items.length > 0}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
            >
              {EXERCISE_TYPES.map(t => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
            {exerciseId && items.length > 0 && (
              <p className="text-xs text-gray-500 mt-1">Type cannot be changed after items are added</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
            <input
              type="text"
              value={form.language}
              onChange={e => setForm(f => ({ ...f, language: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. en, es, fr"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CEFR Level</label>
            <select
              value={form.cefrLevel}
              onChange={e => setForm(f => ({ ...f, cefrLevel: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select level</option>
              {CEFR_LEVELS.map(l => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Time Limit (seconds)</label>
            <input
              type="number"
              value={form.timeLimit}
              onChange={e => setForm(f => ({ ...f, timeLimit: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="No limit"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Passing Score (%)</label>
            <input
              type="number"
              value={form.passingScore}
              onChange={e => setForm(f => ({ ...f, passingScore: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              min="0"
              max="100"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Instructions</label>
            <textarea
              value={form.instructions}
              onChange={e => setForm(f => ({ ...f, instructions: e.target.value }))}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Instructions for students"
            />
          </div>

          <div className="md:col-span-2 flex items-center gap-3">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={form.isPublished}
                onChange={e => setForm(f => ({ ...f, isPublished: e.target.checked }))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
            </label>
            <span className="text-sm font-medium text-gray-700">
              {form.isPublished ? 'Published' : 'Draft'}
            </span>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            <Save className="w-4 h-4" />
            {isSaving ? 'Saving...' : exerciseId ? 'Update Exercise' : 'Create Exercise'}
          </button>
        </div>
      </div>

      {/* Items Section */}
      {exerciseId && (
        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Items ({items.length})
            </h2>
            <button
              onClick={openAddItem}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Item
            </button>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No items yet. Click "Add Item" to create questions.
            </div>
          ) : (
            <div className="space-y-2">
              {items
                .sort((a, b) => a.orderIndex - b.orderIndex)
                .map((item, idx) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <GripVertical className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-sm font-medium text-gray-500 w-6">{idx + 1}.</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 truncate">
                        {item.questionText || getItemPreview(form.type, item)}
                      </p>
                      <p className="text-xs text-gray-500">{item.points} pt{item.points !== 1 ? 's' : ''}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openEditItem(item)}
                        className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}

      {/* Item Modal */}
      {showItemModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {editingItem ? 'Edit Item' : 'Add Item'}
            </h3>

            {/* Common fields */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Question Text</label>
              <input
                type="text"
                value={itemForm.questionText}
                onChange={e => setItemForm(f => ({ ...f, questionText: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter question text"
              />
            </div>

            {/* Type-specific fields */}
            {renderTypeFields(form.type, itemForm, setItemForm)}

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Points</label>
                <input
                  type="number"
                  value={itemForm.points}
                  onChange={e => setItemForm(f => ({ ...f, points: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min="1"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Hint</label>
                <input
                  type="text"
                  value={itemForm.hint}
                  onChange={e => setItemForm(f => ({ ...f, hint: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Optional hint"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Explanation</label>
              <textarea
                value={itemForm.explanation}
                onChange={e => setItemForm(f => ({ ...f, explanation: e.target.value }))}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Explanation shown after answering"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowItemModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveItem}
                disabled={itemSaving}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {itemSaving ? 'Saving...' : editingItem ? 'Update Item' : 'Add Item'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function getItemPreview(type: ExerciseType, item: ExerciseItem): string {
  const content = item.content || {}
  switch (type) {
    case 'TRUE_FALSE':
      return content.statement || '(no statement)'
    case 'FILL_BLANKS':
      return content.text?.substring(0, 60) || '(no text)'
    case 'MATCHING':
      return `${content.leftItems?.length || 0} pairs`
    case 'DRAG_DROP':
      return `${content.zones?.length || 0} zones, ${content.items?.length || 0} items`
    case 'REORDER':
      return `${content.items?.length || 0} items to reorder`
    case 'LISTENING':
      return content.audioUrl || '(no audio)'
    default:
      return `${content.options?.length || 0} options`
  }
}

function renderTypeFields(
  type: ExerciseType,
  form: ItemFormData,
  setForm: React.Dispatch<React.SetStateAction<ItemFormData>>
) {
  switch (type) {
    case 'MULTIPLE_CHOICE':
      return (
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">Options</label>
          {form.options.map((opt, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                type="radio"
                name="correctOption"
                checked={form.correctValue === opt.value}
                onChange={() => setForm(f => ({ ...f, correctValue: opt.value }))}
                className="text-blue-600"
              />
              <input
                type="text"
                value={opt.label}
                onChange={e => {
                  const options = [...form.options]
                  options[i] = { ...options[i], label: e.target.value }
                  setForm(f => ({ ...f, options }))
                }}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                placeholder={`Option ${i + 1} label`}
              />
              <input
                type="text"
                value={opt.value}
                onChange={e => {
                  const options = [...form.options]
                  options[i] = { ...options[i], value: e.target.value }
                  setForm(f => ({ ...f, options }))
                }}
                className="w-24 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                placeholder="Value"
              />
              {form.options.length > 2 && (
                <button
                  onClick={() => {
                    const options = form.options.filter((_, idx) => idx !== i)
                    setForm(f => ({ ...f, options }))
                  }}
                  className="p-1 text-red-500 hover:bg-red-50 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
          <button
            onClick={() => setForm(f => ({ ...f, options: [...f.options, { label: '', value: '' }] }))}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            + Add option
          </button>
        </div>
      )

    case 'TRUE_FALSE':
      return (
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Statement</label>
            <input
              type="text"
              value={form.statement}
              onChange={e => setForm(f => ({ ...f, statement: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter statement to evaluate"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Correct Answer</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="true"
                  checked={form.trueFalseAnswer === 'true'}
                  onChange={e => setForm(f => ({ ...f, trueFalseAnswer: e.target.value }))}
                  className="text-blue-600"
                />
                <span className="text-sm">True</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="false"
                  checked={form.trueFalseAnswer === 'false'}
                  onChange={e => setForm(f => ({ ...f, trueFalseAnswer: e.target.value }))}
                  className="text-blue-600"
                />
                <span className="text-sm">False</span>
              </label>
            </div>
          </div>
        </div>
      )

    case 'FILL_BLANKS':
      return (
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Text (use ___ for blanks)
            </label>
            <textarea
              value={form.fillText}
              onChange={e => setForm(f => ({ ...f, fillText: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="The ___ jumped over the ___ dog."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Blank Answers (in order)</label>
            {form.blanks.map((b, i) => (
              <div key={i} className="flex items-center gap-2 mb-2">
                <span className="text-sm text-gray-500 w-6">{i + 1}.</span>
                <input
                  type="text"
                  value={b}
                  onChange={e => {
                    const blanks = [...form.blanks]
                    blanks[i] = e.target.value
                    setForm(f => ({ ...f, blanks }))
                  }}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  placeholder={`Answer for blank ${i + 1}`}
                />
                {form.blanks.length > 1 && (
                  <button
                    onClick={() => setForm(f => ({ ...f, blanks: f.blanks.filter((_, idx) => idx !== i) }))}
                    className="p-1 text-red-500 hover:bg-red-50 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={() => setForm(f => ({ ...f, blanks: [...f.blanks, ''] }))}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              + Add blank
            </button>
          </div>
        </div>
      )

    case 'MATCHING':
      return (
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">Matching Pairs</label>
          {form.leftItems.map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                type="text"
                value={form.leftItems[i]}
                onChange={e => {
                  const leftItems = [...form.leftItems]
                  leftItems[i] = e.target.value
                  setForm(f => ({ ...f, leftItems }))
                }}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                placeholder={`Left ${i + 1}`}
              />
              <span className="text-gray-400">&harr;</span>
              <input
                type="text"
                value={form.rightItems[i] || ''}
                onChange={e => {
                  const rightItems = [...form.rightItems]
                  rightItems[i] = e.target.value
                  setForm(f => ({ ...f, rightItems }))
                }}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                placeholder={`Right ${i + 1}`}
              />
              {form.leftItems.length > 2 && (
                <button
                  onClick={() => setForm(f => ({
                    ...f,
                    leftItems: f.leftItems.filter((_, idx) => idx !== i),
                    rightItems: f.rightItems.filter((_, idx) => idx !== i),
                  }))}
                  className="p-1 text-red-500 hover:bg-red-50 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
          <button
            onClick={() => setForm(f => ({
              ...f,
              leftItems: [...f.leftItems, ''],
              rightItems: [...f.rightItems, ''],
            }))}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            + Add pair
          </button>
        </div>
      )

    case 'DRAG_DROP':
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Drop Zones</label>
            {form.zones.map((z, i) => (
              <div key={i} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={z}
                  onChange={e => {
                    const zones = [...form.zones]
                    zones[i] = e.target.value
                    setForm(f => ({ ...f, zones }))
                  }}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  placeholder={`Zone ${i + 1}`}
                />
                {form.zones.length > 1 && (
                  <button
                    onClick={() => setForm(f => ({ ...f, zones: f.zones.filter((_, idx) => idx !== i) }))}
                    className="p-1 text-red-500 hover:bg-red-50 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={() => setForm(f => ({ ...f, zones: [...f.zones, ''] }))}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              + Add zone
            </button>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Draggable Items</label>
            {form.dragItems.map((item, i) => (
              <div key={i} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={item.text}
                  onChange={e => {
                    const dragItems = [...form.dragItems]
                    dragItems[i] = { ...dragItems[i], text: e.target.value }
                    setForm(f => ({ ...f, dragItems }))
                  }}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  placeholder="Item text"
                />
                <select
                  value={item.zone}
                  onChange={e => {
                    const dragItems = [...form.dragItems]
                    dragItems[i] = { ...dragItems[i], zone: e.target.value }
                    setForm(f => ({ ...f, dragItems }))
                  }}
                  className="w-32 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="">Zone...</option>
                  {form.zones.filter(z => z).map(z => (
                    <option key={z} value={z}>{z}</option>
                  ))}
                </select>
                {form.dragItems.length > 1 && (
                  <button
                    onClick={() => setForm(f => ({ ...f, dragItems: f.dragItems.filter((_, idx) => idx !== i) }))}
                    className="p-1 text-red-500 hover:bg-red-50 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={() => setForm(f => ({ ...f, dragItems: [...f.dragItems, { text: '', zone: '' }] }))}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              + Add item
            </button>
          </div>
        </div>
      )

    case 'REORDER':
      return (
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Items (in correct order)
          </label>
          {form.orderedItems.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-sm text-gray-500 w-6">{i + 1}.</span>
              <input
                type="text"
                value={item}
                onChange={e => {
                  const orderedItems = [...form.orderedItems]
                  orderedItems[i] = e.target.value
                  setForm(f => ({ ...f, orderedItems }))
                }}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                placeholder={`Item ${i + 1}`}
              />
              {form.orderedItems.length > 2 && (
                <button
                  onClick={() => setForm(f => ({ ...f, orderedItems: f.orderedItems.filter((_, idx) => idx !== i) }))}
                  className="p-1 text-red-500 hover:bg-red-50 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
          <button
            onClick={() => setForm(f => ({ ...f, orderedItems: [...f.orderedItems, ''] }))}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            + Add item
          </button>
        </div>
      )

    case 'LISTENING':
      return (
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Audio URL</label>
            <input
              type="text"
              value={form.listeningAudioUrl}
              onChange={e => setForm(f => ({ ...f, listeningAudioUrl: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="https://example.com/audio.mp3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Question Type</label>
            <select
              value={form.listeningType}
              onChange={e => setForm(f => ({ ...f, listeningType: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="multiple_choice">Multiple Choice</option>
              <option value="short_answer">Short Answer</option>
              <option value="true_false">True/False</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Correct Answer</label>
            <input
              type="text"
              value={form.listeningAnswer}
              onChange={e => setForm(f => ({ ...f, listeningAnswer: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Correct answer"
            />
          </div>
        </div>
      )

    default:
      return null
  }
}

export default ExerciseEditorPage
