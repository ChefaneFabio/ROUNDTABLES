import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { format, isToday, isTomorrow, isPast, addDays } from 'date-fns'
import { Calendar, Clock, Users, BookOpen, Video, Filter } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { lessonsApi } from '../services/api'
import { Card, CardBody, CardHeader } from '../components/common/Card'
import { Button } from '../components/common/Button'
import { StatusBadge } from '../components/common/Badge'
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Lessons</h1>
          <p className="text-gray-600 mt-1">
            {isTeacher
              ? 'View and manage your upcoming lessons'
              : 'View your scheduled lessons'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'list' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            List
          </Button>
          <Button
            variant={viewMode === 'calendar' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setViewMode('calendar')}
          >
            Calendar
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value)
              setPage(1)
            }}
            className="input pl-10 pr-8 appearance-none w-full sm:w-auto"
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
        <Card>
          <CardBody className="py-12 text-center">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No lessons found
            </h3>
            <p className="text-gray-500">
              {statusFilter
                ? 'Try adjusting your filters'
                : 'No lessons scheduled yet'}
            </p>
          </CardBody>
        </Card>
      ) : (
        <>
          <div className="space-y-6">
            {Object.entries(groupedLessons).map(([date, dayLessons]: [string, any]) => (
              <div key={date}>
                <h3 className="text-sm font-medium text-gray-500 mb-3">
                  {getDateLabel(date)}
                </h3>
                <div className="space-y-3">
                  {dayLessons.map((lesson: any) => (
                    <LessonCard key={lesson.id} lesson={lesson} />
                  ))}
                </div>
              </div>
            ))}
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

function LessonCard({ lesson }: { lesson: any }) {
  const isPastLesson = isPast(new Date(lesson.scheduledAt))
  const isLive = lesson.status === 'IN_PROGRESS'

  return (
    <Link to={`/lessons/${lesson.id}`}>
      <Card
        className={clsx(
          'hover:shadow-lg transition-shadow',
          isLive && 'ring-2 ring-green-500'
        )}
      >
        <CardBody>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            {/* Time */}
            <div className="flex-shrink-0 text-center sm:w-24">
              <p className="text-2xl font-bold text-gray-900">
                {format(new Date(lesson.scheduledAt), 'HH:mm')}
              </p>
              <p className="text-sm text-gray-500">{lesson.duration} min</p>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-16 bg-gray-200" />

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {lesson.title || `Lesson ${lesson.lessonNumber}`}
                  </h3>
                  {lesson.course && (
                    <p className="text-sm text-gray-600 flex items-center mt-1">
                      <BookOpen className="h-4 w-4 mr-1" />
                      {lesson.course.name}
                    </p>
                  )}
                  {lesson.module && (
                    <p className="text-sm text-gray-500 mt-1">
                      Topic: {lesson.module.title}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {isLive && (
                    <span className="flex items-center px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      <span className="h-2 w-2 bg-green-500 rounded-full mr-1 animate-pulse" />
                      LIVE
                    </span>
                  )}
                  <StatusBadge status={lesson.status} />
                </div>
              </div>

              {/* Meta info */}
              <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                {lesson.teacher?.user && (
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {lesson.teacher.user.name}
                  </div>
                )}
                {lesson._count && (
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {lesson._count.attendance || 0} attendees
                  </div>
                )}
                {lesson.meetingLink && (
                  <div className="flex items-center text-primary-600">
                    <Video className="h-4 w-4 mr-1" />
                    Meeting link available
                  </div>
                )}
              </div>
            </div>

            {/* Join button for live lessons */}
            {isLive && lesson.meetingLink && (
              <Button
                size="sm"
                onClick={(e) => {
                  e.preventDefault()
                  window.open(lesson.meetingLink, '_blank')
                }}
              >
                Join Now
              </Button>
            )}
          </div>
        </CardBody>
      </Card>
    </Link>
  )
}
