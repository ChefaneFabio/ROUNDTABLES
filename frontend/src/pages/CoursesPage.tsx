import { useState } from 'react'
import { useQuery } from 'react-query'
import { Link, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { Plus, Search, BookOpen, Users, Calendar, SlidersHorizontal } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { coursesApi } from '../services/api'
import { LoadingSpinner } from '../components/common/LoadingSpinner'
import { Pagination } from '../components/common/Table'

export function CoursesPage() {
  const { isAdmin, isStudent } = useAuth()
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const { data, isLoading } = useQuery(
    ['courses', page, statusFilter],
    () => coursesApi.getAll({ page, limit: 12, status: statusFilter || undefined }),
    { keepPreviousData: true }
  )

  const courses = data?.data || []
  const meta = data?.meta

  const statusStyles: Record<string, string> = {
    DRAFT: 'bg-gray-100 text-gray-600',
    TOPIC_VOTING: 'bg-gray-100 text-gray-600',
    SCHEDULED: 'bg-gray-100 text-gray-700',
    IN_PROGRESS: 'bg-gray-800 text-white',
    COMPLETED: 'bg-gray-100 text-gray-500',
  }

  const getStatusStyle = (status: string) => statusStyles[status] || 'bg-gray-100 text-gray-600'

  const typeStyles: Record<string, string> = {
    GROUP: 'border-l-slate-400',
    INDIVIDUAL: 'border-l-gray-400',
    SELF_PACED: 'border-l-gray-300',
  }

  const getTypeStyle = (type: string) => typeStyles[type] || 'border-l-gray-300'

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">Courses</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {isStudent
              ? 'View your enrolled courses'
              : 'Manage your courses and track progress'}
          </p>
        </div>
        {(isAdmin) && (
          <button
            onClick={() => navigate('/courses/new')}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Create Course
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-300 transition-colors"
          />
        </div>
        <div className="relative">
          <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value)
              setPage(1)
            }}
            className="pl-10 pr-8 py-2.5 text-sm border border-gray-200 rounded-lg bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-300 transition-colors cursor-pointer"
          >
            <option value="">All Status</option>
            <option value="DRAFT">Draft</option>
            <option value="TOPIC_VOTING">Topic Voting</option>
            <option value="SCHEDULED">Scheduled</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>
      </div>

      {/* Course Grid */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      ) : courses.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl py-16 text-center">
          <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-sm font-semibold text-gray-900 mb-1">
            No courses found
          </h3>
          <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto">
            {statusFilter
              ? 'Try adjusting your filters to see more courses.'
              : isAdmin
              ? 'Get started by creating your first course.'
              : isStudent
              ? 'You are not enrolled in any courses yet.'
              : 'No courses available yet.'}
          </p>
          {(isAdmin) && !statusFilter && (
            <button
              onClick={() => navigate('/courses/new')}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Create Your First Course
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course: any) => (
              <Link key={course.id} to={`/courses/${course.id}`}>
                <div className={`bg-white border border-gray-200 rounded-xl hover:shadow-sm transition-all h-full border-l-4 ${getTypeStyle(course.type)}`}>
                  <div className="p-5">
                    {/* Header row */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3 className="text-sm font-semibold text-gray-900 line-clamp-1 flex-1">
                        {course.name}
                      </h3>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium whitespace-nowrap ${getStatusStyle(course.status)}`}>
                        {course.status.replace(/_/g, ' ')}
                      </span>
                    </div>

                    {/* Type badge + language */}
                    <div className="flex items-center gap-2 mb-3">
                      {course.type && (
                        <span className="px-2 py-0.5 bg-gray-50 border border-gray-100 rounded text-xs text-gray-500 font-medium">
                          {course.type.replace(/_/g, ' ')}
                        </span>
                      )}
                      {course.language && (
                        <span className="text-xs text-gray-400">{course.language}</span>
                      )}
                    </div>

                    {course.description && (
                      <p className="text-xs text-gray-500 line-clamp-2 mb-4">
                        {course.description}
                      </p>
                    )}

                    {/* Meta row */}
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <div className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" />
                        {course._count?.enrollments || 0}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {course._count?.lessons || 0} lessons
                      </div>
                    </div>

                    {/* Teacher */}
                    {course.teacher?.user?.name && (
                      <p className="text-xs text-gray-400 mt-2">
                        {course.teacher.user.name}
                      </p>
                    )}

                    {/* Date range */}
                    {course.startDate && (
                      <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-400 flex justify-between">
                        <span>{format(new Date(course.startDate), 'MMM d, yyyy')}</span>
                        {course.endDate && (
                          <span>{format(new Date(course.endDate), 'MMM d, yyyy')}</span>
                        )}
                      </div>
                    )}

                    {/* Progress bar for students */}
                    {course.progress !== undefined && (
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <span className="text-gray-400">Progress</span>
                          <span className="font-medium text-gray-700">
                            {course.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5">
                          <div
                            className="bg-gray-700 h-1.5 rounded-full transition-all"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {course.price !== undefined && course.price > 0 && (
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <span className="text-sm font-semibold text-gray-900">
                          {course.currency || '$'}{course.price}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
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
