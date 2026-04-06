import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { lessonsApi } from '../services/api'
import { Calendar, ChevronLeft, ChevronRight, Video, Clock, User, ExternalLink, Download, Filter } from 'lucide-react'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

interface CalendarLesson {
  id: string
  title?: string
  scheduledAt: string
  duration: number
  status: string
  meetingProvider?: string
  meetingLink?: string
  location?: string
  locationDetails?: string
  course?: { id: string; name: string }
  teacher?: { id: string; user: { name: string } }
}

const STATUS_DOT: Record<string, string> = {
  SCHEDULED: 'bg-blue-500',
  REMINDER_SENT: 'bg-blue-500',
  IN_PROGRESS: 'bg-yellow-500 animate-pulse',
  COMPLETED: 'bg-green-500',
  CANCELLED: 'bg-gray-400',
}

const PROVIDER_LABELS: Record<string, string> = {
  ZOOM: 'Zoom',
  GOOGLE_MEET: 'Google Meet',
  MICROSOFT_TEAMS: 'Teams',
}

export default function StudentCalendarPage() {
  const navigate = useNavigate()
  const now = new Date()
  const [year, setYear] = useState(now.getFullYear())
  const [month, setMonth] = useState(now.getMonth() + 1)
  const [lessons, setLessons] = useState<Record<string, CalendarLesson[]>>({})
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [view, setView] = useState<'month' | 'week'>('month')
  const [courseFilter, setCourseFilter] = useState<string>('all')

  useEffect(() => {
    loadCalendar()
  }, [year, month])

  const loadCalendar = async () => {
    setLoading(true)
    try {
      const data = await lessonsApi.getCalendar(year, month)
      setLessons(data.lessons || {})
    } catch (err) {
      console.error('Failed to load calendar:', err)
    } finally {
      setLoading(false)
    }
  }

  // Extract unique courses from all lessons for the filter dropdown
  const availableCourses = useMemo(() => {
    const courseMap = new Map<string, string>()
    Object.values(lessons).flat().forEach((l: CalendarLesson) => {
      if (l.course?.id && l.course?.name) {
        courseMap.set(l.course.id, l.course.name)
      }
    })
    return Array.from(courseMap.entries()).sort((a, b) => a[1].localeCompare(b[1]))
  }, [lessons])

  // Filter lessons by selected course
  const filteredLessons = useMemo(() => {
    if (courseFilter === 'all') return lessons
    const filtered: Record<string, CalendarLesson[]> = {}
    for (const [date, dateLessons] of Object.entries(lessons)) {
      const matching = dateLessons.filter(l => l.course?.id === courseFilter)
      if (matching.length > 0) filtered[date] = matching
    }
    return filtered
  }, [lessons, courseFilter])

  const prevMonth = () => {
    if (month === 1) { setMonth(12); setYear(y => y - 1) }
    else setMonth(m => m - 1)
  }

  const nextMonth = () => {
    if (month === 12) { setMonth(1); setYear(y => y + 1) }
    else setMonth(m => m + 1)
  }

  const goToday = () => {
    setYear(now.getFullYear())
    setMonth(now.getMonth() + 1)
  }

  // Build calendar grid
  const firstDay = new Date(year, month - 1, 1).getDay()
  const daysInMonth = new Date(year, month, 0).getDate()
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`

  const calendarDays: Array<{ day: number; dateStr: string } | null> = []
  for (let i = 0; i < firstDay; i++) calendarDays.push(null)
  for (let d = 1; d <= daysInMonth; d++) {
    calendarDays.push({
      day: d,
      dateStr: `${year}-${String(month).padStart(2, '0')}-${String(d).padStart(2, '0')}`,
    })
  }

  const selectedLessons = selectedDate ? (filteredLessons[selectedDate] || []) : []

  const exportIcal = () => {
    const token = localStorage.getItem('accessToken')
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
    window.open(`${baseUrl}/lessons/calendar/ical?token=${token}`, '_blank')
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Calendar className="w-7 h-7 text-primary-600" />
          <h1 className="text-2xl font-bold text-gray-900">My Schedule</h1>
        </div>
        <div className="flex items-center gap-2">
          {availableCourses.length > 1 && (
            <div className="flex items-center gap-1.5">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={courseFilter}
                onChange={e => setCourseFilter(e.target.value)}
                className="text-sm border border-gray-300 rounded-lg px-2 py-2 bg-white focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">All Courses</option>
                {availableCourses.map(([id, name]) => (
                  <option key={id} value={id}>{name}</option>
                ))}
              </select>
            </div>
          )}
          <button
            onClick={exportIcal}
            className="flex items-center gap-1.5 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
            title="Export to calendar app"
          >
            <Download className="w-4 h-4" />
            Export .ics
          </button>
          <div className="flex bg-gray-100 rounded-lg p-0.5">
            <button
              onClick={() => setView('month')}
              className={`px-3 py-1.5 text-sm rounded-md ${view === 'month' ? 'bg-white shadow text-gray-900' : 'text-gray-500'}`}
            >
              Month
            </button>
            <button
              onClick={() => setView('week')}
              className={`px-3 py-1.5 text-sm rounded-md ${view === 'week' ? 'bg-white shadow text-gray-900' : 'text-gray-500'}`}
            >
              Week
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-lg">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-semibold text-gray-900 min-w-[180px] text-center">
            {MONTHS[month - 1]} {year}
          </h2>
          <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-lg">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        <button onClick={goToday} className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
          Today
        </button>
      </div>

      <div className="flex gap-6">
        {/* Calendar grid */}
        <div className="flex-1">
          {/* Day headers */}
          <div className="grid grid-cols-7 mb-1">
            {DAYS.map(d => (
              <div key={d} className="text-center text-xs font-medium text-gray-500 py-2">{d}</div>
            ))}
          </div>

          {/* Days */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
            </div>
          ) : (
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((cell, i) => {
                if (!cell) return <div key={i} className="h-24 bg-gray-50 rounded-lg" />

                const dayLessons = filteredLessons[cell.dateStr] || []
                const isToday = cell.dateStr === todayStr
                const isSelected = cell.dateStr === selectedDate
                const hasLive = dayLessons.some(l => l.status === 'IN_PROGRESS')

                return (
                  <button
                    key={i}
                    onClick={() => setSelectedDate(isSelected ? null : cell.dateStr)}
                    className={`h-24 p-1.5 rounded-lg border text-left transition-all hover:shadow-sm ${
                      isSelected
                        ? 'border-primary-500 bg-primary-50 ring-1 ring-primary-300'
                        : isToday
                          ? 'border-primary-300 bg-blue-50'
                          : 'border-gray-100 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-medium ${isToday ? 'text-primary-600' : 'text-gray-700'}`}>
                        {cell.day}
                      </span>
                      {hasLive && <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />}
                    </div>
                    <div className="mt-1 space-y-0.5">
                      {dayLessons.slice(0, 3).map(l => (
                        <div key={l.id} className="flex items-center gap-1">
                          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${STATUS_DOT[l.status] || 'bg-gray-400'}`} />
                          <span className="text-[10px] text-gray-600 truncate">
                            {new Date(l.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} {l.course?.name}
                          </span>
                        </div>
                      ))}
                      {dayLessons.length > 3 && (
                        <span className="text-[10px] text-gray-400">+{dayLessons.length - 3} more</span>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* Selected day detail panel */}
        <div className="w-80 flex-shrink-0">
          {selectedDate ? (
            <div className="bg-white rounded-xl border border-gray-200 p-4 sticky top-4">
              <h3 className="font-semibold text-gray-900 mb-3">
                {new Date(selectedDate + 'T12:00:00').toLocaleDateString(undefined, {
                  weekday: 'long', month: 'long', day: 'numeric'
                })}
              </h3>
              {selectedLessons.length === 0 ? (
                <p className="text-sm text-gray-500">No lessons scheduled</p>
              ) : (
                <div className="space-y-3">
                  {selectedLessons.map(lesson => {
                    const time = new Date(lesson.scheduledAt)
                    const endTime = new Date(time.getTime() + lesson.duration * 60000)
                    const isLive = lesson.status === 'IN_PROGRESS'

                    return (
                      <div
                        key={lesson.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-colors hover:bg-gray-50 ${
                          isLive ? 'border-yellow-300 bg-yellow-50' : 'border-gray-200'
                        }`}
                        onClick={() => navigate(`/lessons/${lesson.id}`)}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium text-sm text-gray-900">
                              {lesson.title || lesson.course?.name}
                            </p>
                            {lesson.course?.name && lesson.title && (
                              <p className="text-xs text-gray-500">{lesson.course.name}</p>
                            )}
                          </div>
                          {isLive && (
                            <span className="px-2 py-0.5 bg-yellow-500 text-white text-[10px] font-bold rounded-full animate-pulse">
                              LIVE
                            </span>
                          )}
                        </div>

                        <div className="mt-2 space-y-1 text-xs text-gray-500">
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            <span className="text-gray-400">({lesson.duration}min)</span>
                          </div>
                          {lesson.teacher?.user?.name && (
                            <div className="flex items-center gap-1.5">
                              <User className="w-3.5 h-3.5" />
                              {lesson.teacher.user.name}
                            </div>
                          )}
                          {lesson.meetingProvider && (
                            <div className="flex items-center gap-1.5">
                              <Video className="w-3.5 h-3.5" />
                              {PROVIDER_LABELS[lesson.meetingProvider] || lesson.meetingProvider}
                            </div>
                          )}
                        </div>

                        {lesson.meetingProvider === 'IN_PERSON' && lesson.location ? (
                          <a
                            href={`https://maps.google.com/?q=${encodeURIComponent(lesson.location)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={e => e.stopPropagation()}
                            className="mt-2 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-500 text-white hover:bg-amber-600"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            {lesson.location}
                          </a>
                        ) : lesson.meetingLink && (isLive || lesson.status === 'SCHEDULED' || lesson.status === 'REMINDER_SENT') ? (
                          <a
                            href={lesson.meetingLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={e => e.stopPropagation()}
                            className={`mt-2 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ${
                              isLive
                                ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                                : 'bg-primary-600 text-white hover:bg-primary-700'
                            }`}
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            {isLive ? 'Join Now' : 'Join Meeting'}
                          </a>
                        ) : null}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 text-center">
              <Calendar className="w-10 h-10 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Select a day to see lesson details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
