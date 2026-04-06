import { useState, useEffect } from 'react'
import { Bell, Plus, Trash2, Save, Clock } from 'lucide-react'
import api from '../../services/api'
import { useAuth } from '../../contexts/AuthContext'
import { Card } from '../../components/common/Card'
import { Alert } from '../../components/common/Alert'
import { Button } from '../../components/common/Button'

const PRESET_OPTIONS = [
  { label: '15 minutes', value: 15 },
  { label: '30 minutes', value: 30 },
  { label: '1 hour', value: 60 },
  { label: '2 hours', value: 120 },
  { label: '24 hours', value: 1440 },
  { label: '48 hours', value: 2880 },
]

function formatMinutes(min: number): string {
  if (min < 60) return `${min} min`
  if (min < 1440) return `${Math.floor(min / 60)}h${min % 60 > 0 ? ` ${min % 60}m` : ''}`
  const days = Math.floor(min / 1440)
  const hours = Math.floor((min % 1440) / 60)
  return `${days}d${hours > 0 ? ` ${hours}h` : ''}`
}

export default function NotificationSettingsPage() {
  const { profile } = useAuth()
  const schoolId = (profile as any)?.id || ''
  const [intervals, setIntervals] = useState<number[]>([60])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (!schoolId) return
    loadSettings()
  }, [schoolId])

  const loadSettings = async () => {
    try {
      setLoading(true)
      const res = await api.get(`/schools/${schoolId}/notification-settings`)
      const data = res.data?.data
      if (data?.lessonReminderMinutes && Array.isArray(data.lessonReminderMinutes)) {
        setIntervals(data.lessonReminderMinutes.sort((a: number, b: number) => b - a))
      }
    } catch {
      // Default is fine
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      setError('')
      setSuccess('')
      await api.put(`/schools/${schoolId}/notification-settings`, {
        lessonReminderMinutes: intervals.sort((a, b) => b - a)
      })
      setSuccess('Settings saved. Reminders will be sent at the configured times before each lesson.')
      setTimeout(() => setSuccess(''), 5000)
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  const addInterval = (minutes: number) => {
    if (intervals.includes(minutes)) return
    if (intervals.length >= 5) {
      setError('Maximum 5 reminder intervals')
      return
    }
    setIntervals(prev => [...prev, minutes].sort((a, b) => b - a))
  }

  const removeInterval = (minutes: number) => {
    setIntervals(prev => prev.filter(m => m !== minutes))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Bell className="w-8 h-8 text-primary-600" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notification Settings</h1>
          <p className="text-sm text-gray-500">Configure when lesson reminders are sent to students and teachers</p>
        </div>
      </div>

      {error && <Alert type="error" message={error} onClose={() => setError('')} />}
      {success && <Alert type="success" message={success} />}

      <Card>
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Lesson Reminder Timing</h2>
        <p className="text-sm text-gray-500 mb-4">
          Emails with the meeting link (Zoom/Meet/Teams) will be sent automatically at each configured time before the lesson starts.
        </p>

        {/* Current intervals */}
        <div className="space-y-2 mb-6">
          {intervals.length === 0 ? (
            <p className="text-sm text-gray-400 italic">No reminders configured. Add at least one.</p>
          ) : (
            intervals.map(min => (
              <div key={min} className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3 border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{formatMinutes(min)} before lesson</p>
                    <p className="text-xs text-gray-400">
                      {min === 60 ? 'Recommended default' : min < 60 ? 'Short notice' : min >= 1440 ? 'Advance notice' : 'Standard reminder'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeInterval(min)}
                  className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Add preset */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Add reminder</p>
          <div className="flex flex-wrap gap-2">
            {PRESET_OPTIONS.map(opt => (
              <button
                key={opt.value}
                onClick={() => addInterval(opt.value)}
                disabled={intervals.includes(opt.value)}
                className={`px-3 py-1.5 text-sm rounded-lg border transition-all ${
                  intervals.includes(opt.value)
                    ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-primary-400 hover:bg-primary-50'
                }`}
              >
                <Plus className="w-3 h-3 inline mr-1" />
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t flex justify-end">
          <Button onClick={handleSave} disabled={saving} className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save Settings'}
          </Button>
        </div>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold text-gray-900 mb-1">How it works</h2>
        <div className="text-sm text-gray-600 space-y-2">
          <p>The system checks every 15 minutes for lessons approaching their scheduled time.</p>
          <p>When a lesson is within one of your configured reminder windows, emails are automatically sent to:</p>
          <ul className="list-disc list-inside ml-2 space-y-1">
            <li><strong>Students</strong> — with a "Join Lesson" button and the meeting link</li>
            <li><strong>Teachers</strong> — with a "Start Lesson" button and the host URL</li>
            <li><strong>HR contacts</strong> — if the student belongs to an organization</li>
          </ul>
          <p>Each reminder is sent only once per interval (no duplicates).</p>
          <p className="text-gray-400">If you need to send a meeting link immediately, use the "Send Link" button on the lesson detail page.</p>
        </div>
      </Card>
    </div>
  )
}
