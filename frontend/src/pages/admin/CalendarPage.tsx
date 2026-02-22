import { useState, useEffect, useMemo } from 'react'
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  addWeeks,
  subWeeks,
  isSameMonth,
  isToday,
  getHours,
  getMinutes,
  parseISO,
} from 'date-fns'
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  X,
  ExternalLink,
  Clock,
  Users,
  Video,
} from 'lucide-react'
import { lessonsApi, teachersApi, coursesApi } from '../../services/api'
import { useAuth } from '../../contexts/AuthContext'
import clsx from 'clsx'

type ViewMode = 'month' | 'week'

interface Lesson {
  id: string
  title?: string
  scheduledAt: string
  duration: number
  status: string
  meetingProvider?: string
  meetingLink?: string
  meetingHostUrl?: string
  teacherId?: string
  courseId?: string
  course?: { id: string; name: string }
  teacher?: { id: string; user: { name: string } }
}

const STATUS_COLORS: Record<string, string> = {
  SCHEDULED: 'bg-blue-100 text-blue-800 border-blue-200',
  IN_PROGRESS: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  COMPLETED: 'bg-green-100 text-green-800 border-green-200',
  CANCELLED: 'bg-gray-100 text-gray-500 border-gray-200',
}

const PROVIDER_COLORS: Record<string, string> = {
  ZOOM: 'bg-blue-500',
  GOOGLE_MEET: 'bg-green-500',
  MICROSOFT_TEAMS: 'bg-purple-500',
}

const PROVIDER_LABELS: Record<string, string> = {
  ZOOM: 'Zoom',
  GOOGLE_MEET: 'Google Meet',
  MICROSOFT_TEAMS: 'Teams',
}

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const HOURS = Array.from({ length: 14 }, (_, i) => i + 8) // 8am to 9pm

export default function CalendarPage() {
  const { user } = useAuth()
  const [viewMode, setViewMode] = useState<ViewMode>('month')
  const [currentDate, setCurrentDate] = useState(new Date())
  const [lessons, setLessons] = useState<Record<string, Lesson[]>>({})
  const [loading, setLoading] = useState(true)
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)

  // Filters
  const [teachers, setTeachers] = useState<any[]>([])
  const [courses, setCourses] = useState<any[]>([])
  const [filterTeacherId, setFilterTeacherId] = useState('')
  const [filterCourseId, setFilterCourseId] = useState('')

  // Load filter options
  useEffect(() => {
    async function loadFilters() {
      try {
        const [teacherRes, courseRes] = await Promise.all([
          teachersApi.getAll({ limit: 100 }),
          coursesApi.getAll({ limit: 100 }),
        ])
        setTeachers(teacherRes.data || [])
        setCourses(courseRes.data || [])
      } catch {
        // Filters are optional
      }
    }
    loadFilters()
  }, [])

  // Load calendar data
  useEffect(() => {
    async function loadCalendar() {
      setLoading(true)
      try {
        const year = currentDate.getFullYear()
        const month = currentDate.getMonth() + 1
        const data = await lessonsApi.getCalendar(year, month)
        setLessons(data.lessons || {})
      } catch (err) {
        console.error('Failed to load calendar:', err)
        setLessons({})
      } finally {
        setLoading(false)
      }
    }
    loadCalendar()
  }, [currentDate])

  // Filter lessons
  const filteredLessons = useMemo(() => {
    const result: Record<string, Lesson[]> = {}
    for (const [date, dayLessons] of Object.entries(lessons)) {
      const filtered = dayLessons.filter((l) => {
        if (filterTeacherId && l.teacherId !== filterTeacherId) return false
        if (filterCourseId && l.courseId !== filterCourseId) return false
        return true
      })
      if (filtered.length > 0) result[date] = filtered
    }
    return result
  }, [lessons, filterTeacherId, filterCourseId])

  // Navigation
  const goToToday = () => setCurrentDate(new Date())
  const goPrev = () =>
    setCurrentDate((d) => (viewMode === 'month' ? subMonths(d, 1) : subWeeks(d, 1)))
  const goNext = () =>
    setCurrentDate((d) => (viewMode === 'month' ? addMonths(d, 1) : addWeeks(d, 1)))

  // Month view calendar days
  const monthDays = useMemo(() => {
    const monthStart = startOfMonth(currentDate)
    const monthEnd = endOfMonth(currentDate)
    const calStart = startOfWeek(monthStart, { weekStartsOn: 1 })
    const calEnd = endOfWeek(monthEnd, { weekStartsOn: 1 })

    const days: Date[] = []
    let day = calStart
    while (day <= calEnd) {
      days.push(day)
      day = addDays(day, 1)
    }
    return days
  }, [currentDate])

  // Week view days
  const weekDays = useMemo(() => {
    const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 })
    return Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))
  }, [currentDate])

  const getLessonsForDay = (date: Date): Lesson[] => {
    const key = format(date, 'yyyy-MM-dd')
    return filteredLessons[key] || []
  }

  const headerTitle =
    viewMode === 'month'
      ? format(currentDate, 'MMMM yyyy')
      : `${format(weekDays[0], 'MMM d')} - ${format(weekDays[6], 'MMM d, yyyy')}`

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <CalendarIcon className="h-6 w-6 text-primary-600" />
            <h1 className="text-2xl font-bold text-gray-900">Lesson Calendar</h1>
          </div>

          <div className="flex items-center gap-2">
            {/* View toggle */}
            <div className="flex rounded-lg border border-gray-300 overflow-hidden">
              <button
                onClick={() => setViewMode('week')}
                className={clsx(
                  'px-3 py-1.5 text-sm font-medium',
                  viewMode === 'week'
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                )}
              >
                Week
              </button>
              <button
                onClick={() => setViewMode('month')}
                className={clsx(
                  'px-3 py-1.5 text-sm font-medium',
                  viewMode === 'month'
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                )}
              >
                Month
              </button>
            </div>

            {/* Navigation */}
            <button
              onClick={goPrev}
              className="p-1.5 rounded-lg border border-gray-300 hover:bg-gray-50"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={goToToday}
              className="px-3 py-1.5 text-sm font-medium rounded-lg border border-gray-300 hover:bg-gray-50"
            >
              Today
            </button>
            <button
              onClick={goNext}
              className="p-1.5 rounded-lg border border-gray-300 hover:bg-gray-50"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <span className="text-lg font-semibold text-gray-900 ml-2 hidden sm:inline">
              {headerTitle}
            </span>
          </div>
        </div>

        {/* Mobile title */}
        <p className="text-lg font-semibold text-gray-900 mt-2 sm:hidden">{headerTitle}</p>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mt-4">
          <select
            value={filterTeacherId}
            onChange={(e) => setFilterTeacherId(e.target.value)}
            className="rounded-lg border border-gray-300 text-sm py-1.5 px-3 bg-white"
          >
            <option value="">All Teachers</option>
            {teachers.map((t: any) => (
              <option key={t.id} value={t.id}>
                {t.user?.name || t.name || 'Unknown'}
              </option>
            ))}
          </select>

          <select
            value={filterCourseId}
            onChange={(e) => setFilterCourseId(e.target.value)}
            className="rounded-lg border border-gray-300 text-sm py-1.5 px-3 bg-white"
          >
            <option value="">All Courses</option>
            {courses.map((c: any) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          {(filterTeacherId || filterCourseId) && (
            <button
              onClick={() => {
                setFilterTeacherId('')
                setFilterCourseId('')
              }}
              className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
            >
              <X className="h-4 w-4" /> Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Calendar grid */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-96">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
          </div>
        ) : viewMode === 'month' ? (
          <MonthView
            days={monthDays}
            currentDate={currentDate}
            getLessonsForDay={getLessonsForDay}
            onSelectLesson={setSelectedLesson}
            currentUserId={user?.teacherProfile?.id}
          />
        ) : (
          <WeekView
            days={weekDays}
            getLessonsForDay={getLessonsForDay}
            onSelectLesson={setSelectedLesson}
            currentUserId={user?.teacherProfile?.id}
          />
        )}
      </div>

      {/* Lesson detail panel */}
      {selectedLesson && (
        <LessonDetail lesson={selectedLesson} onClose={() => setSelectedLesson(null)} />
      )}
    </div>
  )
}

// ---- Month View ----
function MonthView({
  days,
  currentDate,
  getLessonsForDay,
  onSelectLesson,
  currentUserId,
}: {
  days: Date[]
  currentDate: Date
  getLessonsForDay: (d: Date) => Lesson[]
  onSelectLesson: (l: Lesson) => void
  currentUserId?: string
}) {
  return (
    <div>
      {/* Weekday headers */}
      <div className="grid grid-cols-7 border-b">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="py-2 text-center text-xs font-semibold text-gray-500 uppercase"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7">
        {days.map((day, i) => {
          const dayLessons = getLessonsForDay(day)
          const inMonth = isSameMonth(day, currentDate)
          const today = isToday(day)

          return (
            <div
              key={i}
              className={clsx(
                'min-h-[100px] border-b border-r p-1',
                !inMonth && 'bg-gray-50'
              )}
            >
              <div
                className={clsx(
                  'text-xs font-medium mb-1 w-6 h-6 flex items-center justify-center rounded-full',
                  today
                    ? 'bg-primary-600 text-white'
                    : inMonth
                    ? 'text-gray-900'
                    : 'text-gray-400'
                )}
              >
                {format(day, 'd')}
              </div>
              <div className="space-y-0.5">
                {dayLessons.slice(0, 3).map((lesson) => (
                  <LessonPill
                    key={lesson.id}
                    lesson={lesson}
                    onClick={() => onSelectLesson(lesson)}
                    isOwn={currentUserId === lesson.teacherId}
                  />
                ))}
                {dayLessons.length > 3 && (
                  <button
                    onClick={() => onSelectLesson(dayLessons[3])}
                    className="text-xs text-gray-500 hover:text-gray-700 pl-1"
                  >
                    +{dayLessons.length - 3} more
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ---- Week View ----
function WeekView({
  days,
  getLessonsForDay,
  onSelectLesson,
  currentUserId,
}: {
  days: Date[]
  getLessonsForDay: (d: Date) => Lesson[]
  onSelectLesson: (l: Lesson) => void
  currentUserId?: string
}) {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[800px]">
        {/* Day headers */}
        <div className="grid grid-cols-[60px_repeat(7,1fr)] border-b">
          <div className="border-r" />
          {days.map((day, i) => (
            <div
              key={i}
              className={clsx(
                'py-2 text-center border-r',
                isToday(day) && 'bg-primary-50'
              )}
            >
              <div className="text-xs text-gray-500">{format(day, 'EEE')}</div>
              <div
                className={clsx(
                  'text-sm font-semibold',
                  isToday(day) ? 'text-primary-600' : 'text-gray-900'
                )}
              >
                {format(day, 'd')}
              </div>
            </div>
          ))}
        </div>

        {/* Time grid */}
        <div className="relative">
          {HOURS.map((hour) => (
            <div key={hour} className="grid grid-cols-[60px_repeat(7,1fr)] h-16 border-b">
              <div className="border-r text-xs text-gray-400 pr-2 text-right pt-1">
                {hour === 12 ? '12 PM' : hour > 12 ? `${hour - 12} PM` : `${hour} AM`}
              </div>
              {days.map((day, di) => {
                const dayLessons = getLessonsForDay(day)
                const hourLessons = dayLessons.filter((l) => {
                  const dt = parseISO(l.scheduledAt)
                  return getHours(dt) === hour
                })

                return (
                  <div
                    key={di}
                    className={clsx('border-r relative', isToday(day) && 'bg-primary-50/30')}
                  >
                    {hourLessons.map((lesson) => {
                      const dt = parseISO(lesson.scheduledAt)
                      const minuteOffset = getMinutes(dt)
                      const topPx = (minuteOffset / 60) * 64
                      const heightPx = Math.max(((lesson.duration || 60) / 60) * 64, 24)

                      return (
                        <button
                          key={lesson.id}
                          onClick={() => onSelectLesson(lesson)}
                          style={{ top: `${topPx}px`, height: `${heightPx}px` }}
                          className={clsx(
                            'absolute left-0.5 right-0.5 rounded px-1 text-left overflow-hidden border text-xs cursor-pointer transition-opacity hover:opacity-80',
                            currentUserId === lesson.teacherId && 'ring-2 ring-primary-400',
                            STATUS_COLORS[lesson.status] || STATUS_COLORS.SCHEDULED
                          )}
                        >
                          <div className="font-medium truncate">
                            {lesson.course?.name || 'Lesson'}
                          </div>
                          <div className="truncate text-[10px] opacity-75">
                            {lesson.teacher?.user?.name}
                            {lesson.meetingProvider && (
                              <span
                                className={clsx(
                                  'inline-block w-1.5 h-1.5 rounded-full ml-1 align-middle',
                                  PROVIDER_COLORS[lesson.meetingProvider] || 'bg-gray-400'
                                )}
                              />
                            )}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ---- Lesson Pill (Month view) ----
function LessonPill({
  lesson,
  onClick,
  isOwn,
}: {
  lesson: Lesson
  onClick: () => void
  isOwn: boolean
}) {
  const time = format(parseISO(lesson.scheduledAt), 'HH:mm')

  return (
    <button
      onClick={onClick}
      className={clsx(
        'w-full text-left text-[11px] leading-tight px-1.5 py-0.5 rounded border truncate cursor-pointer transition-opacity hover:opacity-80',
        isOwn && 'ring-1 ring-primary-400',
        STATUS_COLORS[lesson.status] || STATUS_COLORS.SCHEDULED
      )}
    >
      <span className="font-semibold">{time}</span>{' '}
      <span className="truncate">
        {lesson.teacher?.user?.name?.split(' ')[0]} - {lesson.course?.name}
      </span>
      {lesson.meetingProvider && (
        <span
          className={clsx(
            'inline-block w-1.5 h-1.5 rounded-full ml-1 align-middle',
            PROVIDER_COLORS[lesson.meetingProvider] || 'bg-gray-400'
          )}
        />
      )}
    </button>
  )
}

// ---- Lesson Detail Panel ----
function LessonDetail({ lesson, onClose }: { lesson: Lesson; onClose: () => void }) {
  const scheduledAt = parseISO(lesson.scheduledAt)

  return (
    <div className="bg-white rounded-lg shadow-sm border p-5">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            {lesson.course?.name || 'Lesson'}
          </h2>
          <p className="text-sm text-gray-500">
            {format(scheduledAt, 'EEEE, MMMM d, yyyy')}
          </p>
        </div>
        <button onClick={onClose} className="p-1 rounded hover:bg-gray-100">
          <X className="h-5 w-5 text-gray-400" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-gray-400" />
          <span>
            {format(scheduledAt, 'h:mm a')} ({lesson.duration || 60} min)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-gray-400" />
          <span>{lesson.teacher?.user?.name || 'Unassigned'}</span>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={clsx(
              'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border',
              STATUS_COLORS[lesson.status] || STATUS_COLORS.SCHEDULED
            )}
          >
            {lesson.status}
          </span>
        </div>

        {lesson.meetingProvider && (
          <div className="flex items-center gap-2">
            <Video className="h-4 w-4 text-gray-400" />
            <span className="flex items-center gap-1.5">
              <span
                className={clsx(
                  'w-2 h-2 rounded-full',
                  PROVIDER_COLORS[lesson.meetingProvider] || 'bg-gray-400'
                )}
              />
              {PROVIDER_LABELS[lesson.meetingProvider] || lesson.meetingProvider}
            </span>
          </div>
        )}
      </div>

      {/* Meeting join button */}
      {lesson.meetingLink && lesson.status !== 'CANCELLED' && (
        <div className="mt-4 pt-4 border-t">
          <a
            href={lesson.meetingLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm font-medium"
          >
            <ExternalLink className="h-4 w-4" />
            Join Meeting
          </a>
          {lesson.meetingHostUrl && (
            <a
              href={lesson.meetingHostUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 ml-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium"
            >
              <ExternalLink className="h-4 w-4" />
              Host Meeting
            </a>
          )}
        </div>
      )}
    </div>
  )
}
