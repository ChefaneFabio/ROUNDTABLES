import { useState } from 'react'
import { useQuery } from 'react-query'
import { Link, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { Plus, Search, Filter, BookOpen, Users, Calendar } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { coursesApi } from '../services/api'
import { Card, CardBody } from '../components/common/Card'
import { Button } from '../components/common/Button'
import { StatusBadge } from '../components/common/Badge'
import { LoadingSpinner } from '../components/common/LoadingSpinner'
import { Pagination } from '../components/common/Table'

export function CoursesPage() {
  const { isSchool, isAdmin, isStudent } = useAuth()
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Courses</h1>
          <p className="text-gray-600 mt-1">
            {isStudent
              ? 'View your enrolled courses'
              : 'Manage your courses and track progress'}
          </p>
        </div>
        {(isSchool || isAdmin) && (
          <Button
            leftIcon={<Plus className="h-5 w-5" />}
            onClick={() => navigate('/courses/new')}
          >
            Create Course
          </Button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input pl-10"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value)
              setPage(1)
            }}
            className="input pl-10 pr-8 appearance-none"
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
        <Card>
          <CardBody className="py-12 text-center">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No courses found
            </h3>
            <p className="text-gray-500 mb-4">
              {statusFilter
                ? 'Try adjusting your filters'
                : isSchool || isAdmin
                ? 'Get started by creating your first course'
                : 'No courses available yet'}
            </p>
            {(isSchool || isAdmin) && !statusFilter && (
              <Button onClick={() => navigate('/courses/new')}>
                Create Course
              </Button>
            )}
          </CardBody>
        </Card>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course: any) => (
              <CourseCard key={course.id} course={course} />
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

function CourseCard({ course }: { course: any }) {
  return (
    <Link to={`/courses/${course.id}`}>
      <Card className="h-full hover:shadow-lg transition-shadow">
        {course.thumbnailUrl ? (
          <img
            src={course.thumbnailUrl}
            alt={course.name}
            className="w-full h-40 object-cover"
          />
        ) : (
          <div className="w-full h-40 bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
            <BookOpen className="h-16 w-16 text-white opacity-50" />
          </div>
        )}
        <CardBody>
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
              {course.name}
            </h3>
            <StatusBadge status={course.status} />
          </div>

          {course.description && (
            <p className="text-sm text-gray-600 line-clamp-2 mb-4">
              {course.description}
            </p>
          )}

          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              {course._count?.enrollments || 0} students
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {course._count?.lessons || 0} lessons
            </div>
          </div>

          {course.startDate && (
            <div className="mt-4 pt-4 border-t border-gray-100 text-sm text-gray-500">
              <div className="flex justify-between">
                <span>Starts</span>
                <span>{format(new Date(course.startDate), 'MMM d, yyyy')}</span>
              </div>
            </div>
          )}

          {course.price !== undefined && course.price > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <span className="text-lg font-bold text-gray-900">
                {course.currency || '$'}{course.price}
              </span>
            </div>
          )}

          {/* Progress bar for students */}
          {course.progress !== undefined && (
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-500">Progress</span>
                <span className="font-medium text-primary-600">
                  {course.progress}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary-600 h-2 rounded-full transition-all"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>
          )}
        </CardBody>
      </Card>
    </Link>
  )
}
