import { useState } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { format, isToday, isTomorrow, isPast } from 'date-fns'
import { Calendar, Users, BookOpen, Video, SlidersHorizontal, ExternalLink, MapPin, Clock } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { lessonsApi } from '../services/api'
// Button removed - using native buttons for consistent B2B styling
import { LoadingSpinner } from '../components/common/LoadingSpinner'
import { Pagination } from '../components/common/Table'
import clsx from 'clsx'

export function LessonsPage() {
  const { isTeacher } = useAuth()
  const [page, setPage] = useState(1)
  const [statusFilter, setStatusFilter] = useState('')
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list')

  const { data, isLoading } = useQuery(
    ['lessons', page, statusFilter],
    () => lessonsApi.getAll({ page, limit: 20, status: statusFilter || undefined }),
    { keepPreviousData: true }
  )

  const lessons = data?.data || []
  const meta = data?.meta

  // Group lessons by date for better display
  const groupedLessons = lessons.reduce((acc: any, lesson: any) => {
    const date = format(new Date(lesson.scheduledAt), 'yyyy-MM-dd')
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(lesson)
    return acc
  }, {})

  const getDateLabel = (dateStr: string) => {
    const date = new Date(dateStr)
    if (isToday(date)) return 'Today'
    if (isTomorrow(date)) return 'Tomorrow'
    return format(date, 'EEEE, MMMM d')
  }

  const getMeetingTypeBadge = (lesson: any) => {
    if (!lesson.meetingLink) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-gray-50 text-gray-500 border border-gray-100">
          <MapPin className="w-3 h-3" />
          In-Person
        </span>
      )
    }
    const link = (lesson.meetingLink || '').toLowerCase()
    if (link.includes('zoom')) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-gray-50 text-gray-500 border border-gray-100">
          <Video className="w-3 h-3" />
          Zoom
        </span>
      )
    }
    if (link.includes('meet.google') || link.includes('meet')) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-gray-50 text-gray-500 border border-gray-100">
          <Video className="w-3 h-3" />
          Meet
        </span>
      )
    }
    if (link.includes('teams')) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-gray-50 text-gray-500 border border-gray-100">
          <Video className="w-3 h-3" />
          Teams
        </span>
      )
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-gray-50 text-gray-500 border border-gray-100">
        <Video className="w-3 h-3" />
        Online
      </span>
    )
  }

  const statusStyles: Record<string, string> = {
    SCHEDULED: 'bg-gray-100 text-gray-600',
    IN_PROGRESS: 'bg-gray-800 text-white',
    COMPLETED: 'bg-gray-100 text-gray-400',
    CANCELLED: 'bg-gray-50 text-gray-400 line-through',
  }

  const getStatusStyle = (status: string) => statusStyles[status] || 'bg-gray-100 text-gray-600'

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">Lessons</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {isTeacher
              ? 'View and manage your upcoming lessons'
              : 'View your scheduled lessons'}
          </p>
        </div>
        <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-0.5">
          <button
            className={clsx(
              'px-3 py-1.5 text-xs font-medium rounded-md transition-colors',
              viewMode === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            )}
            onClick={() => setViewMode('list')}
          >
            List
          </button>
          <button
            className={clsx(
              'px-3 py-1.5 text-xs font-medium rounded-md transition-colors',
              viewMode === 'calendar' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            )}
            onClick={() => setViewMode('calendar')}
          >
            Calendar
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative">
          <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value)
              setPage(1)
            }}
            className="pl-10 pr-8 py-2.5 text-sm border border-gray-200 rounded-lg bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-300 transition-colors cursor-pointer w-full sm:w-auto"
          >
            <option value="">All Status</option>
            <option value="SCHEDULED">Scheduled</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Lessons List */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      ) : lessons.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl py-16 text-center">
          <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-sm font-semibold text-gray-900 mb-1">
            No lessons found
          </h3>
          <p className="text-sm text-gray-500 max-w-sm mx-auto">
            {statusFilter
              ? 'Try adjusting your filters to see more lessons.'
              : isTeacher
              ? 'No lessons scheduled yet. Lessons will appear here once created for your courses.'
              : 'No lessons scheduled yet. Lessons will appear here once your courses have scheduled sessions.'}
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-6">
            {Object.entries(groupedLessons).map(([date, dayLessons]: [string, any]) => {
              const dateObj = new Date(date)
              const isDateToday = isToday(dateObj)
              const isDatePast = isPast(dateObj) && !isDateToday

              return (
                <div key={date}>
                  {/* Date group header */}
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className={clsx(
                      'text-sm font-semibold uppercase tracking-wide',
                      isDateToday ? 'text-gray-900' : isDatePast ? 'text-gray-300' : 'text-gray-500'
                    )}>
                      {getDateLabel(date)}
                    </h3>
                    <div className="flex-1 h-px bg-gray-100" />
                  </div>

                  {/* Lesson cards for this date */}
                  <div className="space-y-2">
                    {dayLessons.map((lesson: any) => {
                      const isLive = lesson.status === 'IN_PROGRESS'
                      const isCompleted = lesson.status === 'COMPLETED'
                      const isCancelled = lesson.status === 'CANCELLED'
                      const isPastLesson = isCompleted || isCancelled

                      return (
                        <Link key={lesson.id} to={`/lessons/${lesson.id}`}>
                          <div className={clsx(
                            'bg-white border rounded-xl hover:shadow-sm transition-all',
                            isLive ? 'border-gray-300 ring-1 ring-gray-200' : 'border-gray-200',
                            isPastLesson && 'opacity-50'
                          )}>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4">
                              {/* Time block */}
                              <div className="flex-shrink-0 sm:w-20 text-center">
                                <p className={clsx(
                                  'text-lg font-bold',
                                  isPastLesson ? 'text-gray-300' : 'text-gray-900'
                                )}>
                                  {format(new Date(lesson.scheduledAt), 'HH:mm')}
                                </p>
                                <p className="text-xs text-gray-400 flex items-center justify-center gap-0.5">
                                  <Clock className="w-3 h-3" />
                                  {lesson.duration}m
                                </p>
                              </div>

                              {/* Timeline dot */}
                              <div className="hidden sm:flex flex-col items-center">
                                <div className={clsx(
                                  'w-2.5 h-2.5 rounded-full',
                                  isLive ? 'bg-gray-800 ring-4 ring-gray-100' : isPastLesson ? 'bg-gray-200' : 'bg-gray-400'
                                )} />
                                <div className="w-px h-full bg-gray-100 flex-1" />
                              </div>

                              {/* Content */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-3">
                                  <div>
                                    <h4 className={clsx(
                                      'text-sm font-semibold',
                                      isPastLesson ? 'text-gray-400' : 'text-gray-900'
                                    )}>
                                      {lesson.title || `Lesson ${lesson.lessonNumber}`}
                                    </h4>
                                    {lesson.course && (
                                      <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                                        <BookOpen className="h-3 w-3" />
                                        {lesson.course.name}
                                      </p>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-2 flex-shrink-0">
                                    {isLive && (
                                      <span className="flex items-center px-2 py-0.5 bg-gray-800 text-white rounded text-xs font-medium">
                                        <span className="h-1.5 w-1.5 bg-white rounded-full mr-1.5 animate-pulse" />
                                        LIVE
                                      </span>
                                    )}
                                    {!isLive && (
                                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${getStatusStyle(lesson.status)}`}>
                                        {lesson.status.replace(/_/g, ' ')}
                                      </span>
                                    )}
                                  </div>
                                </div>

                                {/* Meta row */}
                                <div className="flex items-center gap-3 mt-2.5 flex-wrap">
                                  {getMeetingTypeBadge(lesson)}
                                  {lesson.teacher?.user && (
                                    <span className="text-xs text-gray-400">
                                      {lesson.teacher.user.name}
                                    </span>
                                  )}
                                  {lesson._count && (
                                    <span className="text-xs text-gray-400 flex items-center gap-1">
                                      <Users className="h-3 w-3" />
                                      {lesson._count.attendance || 0}
                                    </span>
                                  )}
                                  {lesson.module && (
                                    <span className="text-xs text-gray-400">
                                      {lesson.module.title}
                                    </span>
                                  )}
                                </div>
                              </div>

                              {/* Join button for live/upcoming lessons */}
                              {isLive && lesson.meetingLink && (
                                <button
                                  onClick={(e) => {
                                    e.preventDefault()
                                    window.open(lesson.meetingLink, '_blank')
                                  }}
                                  className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
                                >
                                  Join Now
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </button>
                              )}
                              {!isLive && !isPastLesson && lesson.meetingLink && (
                                <button
                                  onClick={(e) => {
                                    e.preventDefault()
                                    window.open(lesson.meetingLink, '_blank')
                                  }}
                                  className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                  Join
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>

          {meta && meta.totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={meta.totalPages}
              totalItems={meta.total}
              itemsPerPage={meta.limit}
              onPageChange={setPage}
            />
          )}
        </>
      )}
    </div>
  )
}
