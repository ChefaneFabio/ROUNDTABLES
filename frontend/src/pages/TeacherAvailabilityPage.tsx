import { useState, useEffect, useCallback } from 'react'
import { availabilityApi, BulkSlot } from '../services/availabilityApi'
import { Clock, Save, Plus, Trash2, CheckCircle } from 'lucide-react'

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const DAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const STATUS_COLORS: Record<string, string> = {
  AVAILABLE: 'bg-green-200 border-green-400 text-green-800',
  BUSY: 'bg-red-200 border-red-400 text-red-800',
  TENTATIVE: 'bg-yellow-200 border-yellow-400 text-yellow-800',
  VACATION: 'bg-purple-200 border-purple-400 text-purple-800',
  SICK_LEAVE: 'bg-gray-200 border-gray-400 text-gray-800',
}

interface LocalSlot {
  id?: string
  dayOfWeek: number
  startTime: string
  endTime: string
  status: string
}

export default function TeacherAvailabilityPage() {
  const [slots, setSlots] = useState<LocalSlot[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [editDay, setEditDay] = useState<number | null>(null)
  const [newSlot, setNewSlot] = useState({ startTime: '09:00', endTime: '17:00', status: 'AVAILABLE' })

  useEffect(() => {
    loadSlots()
  }, [])

  const loadSlots = async () => {
    try {
      const data = await availabilityApi.getMy()
      setSlots(data.map(s => ({
        id: s.id,
        dayOfWeek: s.dayOfWeek,
        startTime: s.startTime,
        endTime: s.endTime,
        status: s.status,
      })))
    } catch (err) {
      console.error('Failed to load availability:', err)
    } finally {
      setLoading(false)
    }
  }

  const addSlot = (dayOfWeek: number) => {
    setSlots(prev => [...prev, { dayOfWeek, ...newSlot }])
    setEditDay(null)
    setSaved(false)
  }

  const removeSlot = (index: number) => {
    setSlots(prev => prev.filter((_, i) => i !== index))
    setSaved(false)
  }

  const saveAll = async () => {
    setSaving(true)
    try {
      const bulkSlots: BulkSlot[] = slots.map(s => ({
        dayOfWeek: s.dayOfWeek,
        startTime: s.startTime,
        endTime: s.endTime,
        status: s.status,
      }))
      const result = await availabilityApi.bulkSet(bulkSlots)
      setSlots(result.map(s => ({
        id: s.id,
        dayOfWeek: s.dayOfWeek,
        startTime: s.startTime,
        endTime: s.endTime,
        status: s.status,
      })))
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  const getSlotsForDay = useCallback((day: number) => {
    return slots
      .map((s, i) => ({ ...s, _index: i }))
      .filter(s => s.dayOfWeek === day)
      .sort((a, b) => a.startTime.localeCompare(b.startTime))
  }, [slots])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Clock className="w-7 h-7 text-primary-600" />
          <h1 className="text-2xl font-bold text-gray-900">My Availability</h1>
        </div>
        <button
          onClick={saveAll}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 font-medium"
        >
          {saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Schedule'}
        </button>
      </div>

      <p className="text-gray-500 mb-6">
        Set your weekly recurring availability. Admins will see this when scheduling lessons.
      </p>

      {/* Weekly grid */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
        {DAYS.map((_dayName, dayIdx) => {
          const daySlots = getSlotsForDay(dayIdx)
          const isWeekend = dayIdx === 0 || dayIdx === 6

          return (
            <div
              key={dayIdx}
              className={`rounded-xl border p-3 min-h-[180px] ${
                isWeekend ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-sm text-gray-700">{DAYS_SHORT[dayIdx]}</h3>
                <button
                  onClick={() => setEditDay(editDay === dayIdx ? null : dayIdx)}
                  className="p-1 text-gray-400 hover:text-primary-600 rounded"
                  title="Add slot"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Existing slots */}
              <div className="space-y-1.5">
                {daySlots.map(slot => (
                  <div
                    key={slot._index}
                    className={`flex items-center justify-between px-2 py-1.5 rounded-lg border text-xs ${STATUS_COLORS[slot.status]}`}
                  >
                    <span className="font-medium">{slot.startTime}-{slot.endTime}</span>
                    <button
                      onClick={() => removeSlot(slot._index)}
                      className="p-0.5 hover:bg-white/50 rounded"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>

              {daySlots.length === 0 && editDay !== dayIdx && (
                <p className="text-xs text-gray-400 mt-4 text-center">No slots</p>
              )}

              {/* Add slot form */}
              {editDay === dayIdx && (
                <div className="mt-2 p-2 bg-blue-50 rounded-lg border border-blue-200 space-y-2">
                  <div className="flex gap-1">
                    <input
                      type="time"
                      value={newSlot.startTime}
                      onChange={e => setNewSlot(s => ({ ...s, startTime: e.target.value }))}
                      className="w-full px-1.5 py-1 text-xs border rounded"
                    />
                    <input
                      type="time"
                      value={newSlot.endTime}
                      onChange={e => setNewSlot(s => ({ ...s, endTime: e.target.value }))}
                      className="w-full px-1.5 py-1 text-xs border rounded"
                    />
                  </div>
                  <select
                    value={newSlot.status}
                    onChange={e => setNewSlot(s => ({ ...s, status: e.target.value }))}
                    className="w-full px-1.5 py-1 text-xs border rounded"
                  >
                    <option value="AVAILABLE">Available</option>
                    <option value="BUSY">Busy</option>
                    <option value="TENTATIVE">Tentative</option>
                  </select>
                  <button
                    onClick={() => addSlot(dayIdx)}
                    className="w-full py-1 bg-primary-600 text-white text-xs rounded font-medium hover:bg-primary-700"
                  >
                    Add
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-6 text-xs">
        {Object.entries(STATUS_COLORS).map(([status, color]) => (
          <div key={status} className="flex items-center gap-1.5">
            <span className={`w-3 h-3 rounded border ${color}`} />
            <span className="text-gray-600 capitalize">{status.replace('_', ' ').toLowerCase()}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
