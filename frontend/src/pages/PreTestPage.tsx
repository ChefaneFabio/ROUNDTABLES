import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import {
  Mic, BookOpen, PenTool, Briefcase, MessageSquare, Loader2, CheckCircle2, ChevronRight, Sparkles
} from 'lucide-react'
import { assessmentApi, AvailabilityGrid, AvailabilitySlot, PreTestData } from '../services/assessmentApi'
import { useAuth } from '../contexts/AuthContext'
import { Alert } from '../components/common/Alert'
import { HelpHint } from '../components/common/HelpHint'

const DAYS: { key: keyof AvailabilityGrid; label: string }[] = [
  { key: 'monday', label: 'Mon' },
  { key: 'tuesday', label: 'Tue' },
  { key: 'wednesday', label: 'Wed' },
  { key: 'thursday', label: 'Thu' },
  { key: 'friday', label: 'Fri' },
  { key: 'saturday', label: 'Sat' },
  { key: 'sunday', label: 'Sun' },
]
const SLOTS: { key: AvailabilitySlot; label: string }[] = [
  { key: 'AM', label: 'AM' },
  { key: 'LUNCH', label: 'Lunch' },
  { key: 'PM', label: 'PM' },
  { key: 'EVENING', label: 'Evening' },
]

const CONFIDENCE_OPTIONS: { value: PreTestData['confidence']; label: string; description: string }[] = [
  { value: 'LOW', label: 'Low', description: 'I struggle with most conversations' },
  { value: 'MEDIUM', label: 'Medium', description: 'I can handle everyday situations' },
  { value: 'HIGH', label: 'High', description: 'I feel confident in most contexts' },
]

export function PreTestPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { user } = useAuth()

  const { data: existing, isLoading } = useQuery('myPreTest', assessmentApi.getPreTest, {
    enabled: !!user,
  })

  const [needsSpeaking, setNeedsSpeaking] = useState(true)
  const [needsReading, setNeedsReading] = useState(true)
  const [needsWriting, setNeedsWriting] = useState(true)
  const [confidence, setConfidence] = useState<PreTestData['confidence']>('MEDIUM')
  const [availability, setAvailability] = useState<AvailabilityGrid>({})
  const [jobRole, setJobRole] = useState('')
  const [comments, setComments] = useState('')
  const [error, setError] = useState('')

  // Pre-fill from existing answers (e.g. learner re-opening the form)
  useEffect(() => {
    if (existing?.data) {
      setNeedsSpeaking(existing.data.needsSpeaking ?? true)
      setNeedsReading(existing.data.needsReading ?? true)
      setNeedsWriting(existing.data.needsWriting ?? true)
      setConfidence(existing.data.confidence ?? 'MEDIUM')
      setAvailability(existing.data.availability ?? {})
      setJobRole(existing.data.jobRole ?? '')
      setComments(existing.data.comments ?? '')
    }
  }, [existing])

  const toggleSlot = (day: keyof AvailabilityGrid, slot: AvailabilitySlot) => {
    setAvailability(prev => {
      const current = prev[day] ?? []
      const next = current.includes(slot)
        ? current.filter(s => s !== slot)
        : [...current, slot]
      const out = { ...prev }
      if (next.length === 0) delete out[day]
      else out[day] = next
      return out
    })
  }

  const saveMutation = useMutation(
    (data: PreTestData) => assessmentApi.savePreTest(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('myPreTest')
        navigate('/assessment')
      },
      onError: (err: any) => setError(err.response?.data?.error || 'Failed to save'),
    }
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!needsSpeaking && !needsReading && !needsWriting) {
      setError('Please select at least one skill you want to focus on.')
      return
    }
    saveMutation.mutate({
      needsSpeaking,
      needsReading,
      needsWriting,
      confidence,
      availability,
      jobRole: jobRole.trim() || undefined,
      comments: comments.trim() || undefined,
    })
  }

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="flex items-center justify-center py-16 text-gray-400">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      </div>
    )
  }

  const alreadyCompleted = !!existing?.completed

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl text-white p-6 mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Before we start</h1>
          <div className="text-white/80">
            <HelpHint title="Why we ask this" triggerClass="text-white/80 hover:text-white" iconClass="w-5 h-5">
              <p>Your answers help Maka:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Pick the right placement test for your needs</li>
                <li>Match you with other learners at a similar level whose schedule overlaps</li>
                <li>Tailor lesson content (e.g. focus on Speaking if that's your priority)</li>
              </ul>
              <p>Only Maka and your HR contact (if you're a B2B learner) see these answers.</p>
            </HelpHint>
          </div>
        </div>
        <p className="text-indigo-100 text-sm">
          A few quick questions help us pick the right placement test and match you
          with the right learning group. Takes about 2 minutes.
        </p>
        {alreadyCompleted && (
          <div className="mt-3 inline-flex items-center gap-1.5 text-xs bg-white/20 px-3 py-1 rounded-full">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Already completed — you can update your answers below
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Skills needed */}
        <section className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="font-semibold text-gray-900 mb-1">Which skills do you want to improve?</h2>
          <p className="text-xs text-gray-500 mb-4">Pick everything that applies.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <SkillToggle icon={<Mic className="h-4 w-4" />} label="Speaking" checked={needsSpeaking} onChange={setNeedsSpeaking} />
            <SkillToggle icon={<BookOpen className="h-4 w-4" />} label="Reading" checked={needsReading} onChange={setNeedsReading} />
            <SkillToggle icon={<PenTool className="h-4 w-4" />} label="Writing" checked={needsWriting} onChange={setNeedsWriting} />
          </div>
        </section>

        {/* Confidence */}
        <section className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="font-semibold text-gray-900 mb-1">How confident do you feel right now?</h2>
          <p className="text-xs text-gray-500 mb-4">Your honest self-evaluation. The placement test will refine this.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {CONFIDENCE_OPTIONS.map(opt => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setConfidence(opt.value)}
                className={`text-left p-3 rounded-lg border-2 transition-all ${confidence === opt.value
                  ? 'border-indigo-600 bg-indigo-50'
                  : 'border-gray-200 hover:border-gray-300'
                  }`}
              >
                <p className="font-medium text-sm text-gray-900">{opt.label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{opt.description}</p>
              </button>
            ))}
          </div>
        </section>

        {/* Availability */}
        <section className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-1">
            <h2 className="font-semibold text-gray-900">When are you generally available?</h2>
            <HelpHint title="How we use availability">
              <p>Each green cell tells Maka one of your usable lesson slots.</p>
              <p>We try to put learners with similar CEFR levels into the same cohort — your availability is the second filter we apply when forming those groups.</p>
              <p>This isn't a commitment to a specific time; it's a "could work" map.</p>
            </HelpHint>
          </div>
          <p className="text-xs text-gray-500 mb-4">
            Used to group you with other learners at a similar level whose schedule overlaps.
            Tap any time slot to toggle it.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr>
                  <th className="text-left text-gray-500 font-medium pb-2"></th>
                  {SLOTS.map(s => (
                    <th key={s.key} className="text-center text-gray-500 font-medium pb-2">{s.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {DAYS.map(d => (
                  <tr key={d.key}>
                    <td className="py-1 pr-2 font-medium text-gray-700">{d.label}</td>
                    {SLOTS.map(s => {
                      const checked = availability[d.key]?.includes(s.key) ?? false
                      return (
                        <td key={s.key} className="px-1 py-1">
                          <button
                            type="button"
                            onClick={() => toggleSlot(d.key, s.key)}
                            className={`w-full py-1.5 rounded text-xs transition-colors ${checked
                              ? 'bg-indigo-600 text-white'
                              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                              }`}
                          >
                            {checked ? '✓' : '·'}
                          </button>
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Job + comments */}
        <section className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1.5">
              <Briefcase className="h-4 w-4" /> Job role <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <input
              type="text"
              value={jobRole}
              onChange={e => setJobRole(e.target.value)}
              placeholder="e.g. Sales Manager, Engineer"
              maxLength={200}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1.5">
              <MessageSquare className="h-4 w-4" /> Anything else? <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <textarea
              value={comments}
              onChange={e => setComments(e.target.value)}
              placeholder="Special needs, learning goals, scheduling constraints..."
              maxLength={2000}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </section>

        {error && <Alert type="error" message={error} />}

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/assessment')}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saveMutation.isLoading}
            className="inline-flex items-center gap-1.5 px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            {saveMutation.isLoading ? 'Saving...' : alreadyCompleted ? 'Update' : 'Save and continue'}
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  )
}

function SkillToggle({ icon, label, checked, onChange }: {
  icon: React.ReactNode
  label: string
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`flex items-center gap-2 p-3 rounded-lg border-2 transition-all ${checked
        ? 'border-indigo-600 bg-indigo-50 text-indigo-900'
        : 'border-gray-200 text-gray-700 hover:border-gray-300'
        }`}
    >
      <div className={`h-7 w-7 rounded-full flex items-center justify-center ${checked ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
        {icon}
      </div>
      <span className="font-medium text-sm">{label}</span>
    </button>
  )
}
