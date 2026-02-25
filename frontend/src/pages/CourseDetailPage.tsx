import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { format } from 'date-fns'
import {
  ArrowLeft, BookOpen, Users, Calendar, Clock, Globe,
  DollarSign, Play, ChevronDown
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { coursesApi } from '../services/api'
import { Card, CardBody, CardHeader } from '../components/common/Card'
import { Button } from '../components/common/Button'
import { Badge, StatusBadge } from '../components/common/Badge'
import { LoadingSpinner } from '../components/common/LoadingSpinner'

export function CourseDetailPage() {
  const { id } = useParams<{ id: string }>()
  const queryClient = useQueryClient()
  const { isAdmin, isTeacher, isStudent } = useAuth()
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false)

  const { data: course, isLoading } = useQuery(
    ['course', id],
    () => coursesApi.getById(id!),
    { enabled: !!id }
  )

  const { data: lessons = [] } = useQuery(
    ['course-lessons', id],
    () => coursesApi.getLessons(id!),
    { enabled: !!id }
  )

  const { data: enrollments = [] } = useQuery(
    ['course-enrollments', id],
    () => coursesApi.getEnrollments(id!),
    { enabled: !!id && (isAdmin || isTeacher) }
  )

  const statusMutation = useMutation(
    (status: string) => coursesApi.updateStatus(id!, status),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['course', id])
        setStatusDropdownOpen(false)
      },
    }
  )

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!course) {
    return (
      <Card>
        <CardBody className="py-12 text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Course not found</h3>
          <Link to="/courses" className="text-primary-600 hover:text-primary-700">
            Back to courses
          </Link>
        </CardBody>
      </Card>
    )
  }

  const modules = course.modules || []
  const teachers = course.courseTeachers || []
  const statuses = ['DRAFT', 'TOPIC_VOTING', 'SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'ARCHIVED']

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Link
          to="/courses"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Courses
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">{course.name}</h1>
            <StatusBadge status={course.status} />
            <Badge variant={course.courseType === 'SELF_PACED' ? 'info' : 'primary'}>
              {course.courseType === 'SELF_PACED' ? 'Self-Paced' : 'Live'}
            </Badge>
          </div>

          {isAdmin && (
            <div className="flex items-center gap-2">
              <div className="relative">
                <Button
                  variant="outline"
                  size="sm"
                  rightIcon={<ChevronDown className="h-4 w-4" />}
                  onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
                >
                  Change Status
                </Button>
                {statusDropdownOpen && (
                  <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                    {statuses.map((s) => (
                      <button
                        key={s}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 first:rounded-t-md last:rounded-b-md"
                        onClick={() => statusMutation.mutate(s)}
                        disabled={s === course.status}
                      >
                        {s.replace(/_/g, ' ')}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <Link to={`/courses/${id}/schedule`}>
                <Button variant="outline" size="sm">
                  Schedule Lessons
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Student progress */}
      {isStudent && course.progress !== undefined && (
        <Card>
          <CardBody>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Your Progress</span>
              <span className="text-sm font-bold text-primary-600">{course.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-primary-600 h-3 rounded-full transition-all"
                style={{ width: `${course.progress}%` }}
              />
            </div>
            {course.courseType === 'SELF_PACED' && (
              <div className="mt-4">
                <Link to={`/courses/${id}/learn`}>
                  <Button leftIcon={<Play className="h-4 w-4" />}>
                    Start Learning
                  </Button>
                </Link>
              </div>
            )}
          </CardBody>
        </Card>
      )}

      {/* Info Card */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-900">Course Information</h2>
        </CardHeader>
        <CardBody>
          {course.description && (
            <p className="text-gray-600 mb-6">{course.description}</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {course.language && (
              <div className="flex items-center text-sm text-gray-600">
                <Globe className="h-4 w-4 mr-2 text-gray-400" />
                <span className="font-medium mr-1">Language:</span> {course.language}
              </div>
            )}
            {course.startDate && (
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                <span className="font-medium mr-1">Starts:</span>
                {format(new Date(course.startDate), 'MMM d, yyyy')}
              </div>
            )}
            {course.endDate && (
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                <span className="font-medium mr-1">Ends:</span>
                {format(new Date(course.endDate), 'MMM d, yyyy')}
              </div>
            )}
            {course.price !== undefined && course.price > 0 && (
              <div className="flex items-center text-sm text-gray-600">
                <DollarSign className="h-4 w-4 mr-2 text-gray-400" />
                <span className="font-medium mr-1">Price:</span>
                {course.currency || '$'}{course.price}
              </div>
            )}
            <div className="flex items-center text-sm text-gray-600">
              <Users className="h-4 w-4 mr-2 text-gray-400" />
              <span className="font-medium mr-1">Max Students:</span> {course.maxStudents}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <BookOpen className="h-4 w-4 mr-2 text-gray-400" />
              <span className="font-medium mr-1">Lessons:</span> {course._count?.lessons || lessons.length}
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Teachers */}
      {teachers.length > 0 && (
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Teachers</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-3">
              {teachers.map((ct: any) => (
                <div key={ct.id} className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-primary-700 font-medium text-sm">
                      {ct.teacher?.user?.name?.charAt(0) || 'T'}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {ct.teacher?.user?.name || 'Unknown Teacher'}
                    </p>
                    {ct.teacher?.user?.email && (
                      <p className="text-xs text-gray-500">{ct.teacher.user.email}</p>
                    )}
                  </div>
                  {ct.isPrimary && (
                    <Badge variant="primary">Primary</Badge>
                  )}
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      )}

      {/* Modules */}
      {modules.length > 0 && (
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Modules</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-3">
              {modules
                .sort((a: any, b: any) => a.orderIndex - b.orderIndex)
                .map((mod: any, index: number) => (
                  <div
                    key={mod.id}
                    className="flex items-start gap-3 p-3 rounded-lg bg-gray-50"
                  >
                    <span className="flex-shrink-0 h-7 w-7 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{mod.title}</p>
                      {mod.description && (
                        <p className="text-xs text-gray-500 mt-1">{mod.description}</p>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </CardBody>
        </Card>
      )}

      {/* Lessons */}
      {lessons.length > 0 && (
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Lessons</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-2">
              {lessons.map((lesson: any) => (
                <Link
                  key={lesson.id}
                  to={`/lessons/${lesson.id}`}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 text-center w-16">
                      <p className="text-sm font-bold text-gray-900">
                        {lesson.scheduledAt
                          ? format(new Date(lesson.scheduledAt), 'MMM d')
                          : '—'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {lesson.scheduledAt
                          ? format(new Date(lesson.scheduledAt), 'HH:mm')
                          : ''}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {lesson.title || `Lesson ${lesson.lessonNumber}`}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        {lesson.teacher?.user?.name && (
                          <span className="text-xs text-gray-500">
                            {lesson.teacher.user.name}
                          </span>
                        )}
                        {lesson.duration && (
                          <span className="text-xs text-gray-400 flex items-center">
                            <Clock className="h-3 w-3 mr-0.5" />
                            {lesson.duration}min
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <StatusBadge status={lesson.status} />
                </Link>
              ))}
            </div>
          </CardBody>
        </Card>
      )}

      {/* Enrollments (Admin/Teacher only) */}
      {(isAdmin || isTeacher) && enrollments.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Enrollments ({enrollments.length})
              </h2>
            </div>
          </CardHeader>
          <CardBody>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Student
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Enrollment Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Payment Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Enrolled
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {enrollments.map((enrollment: any) => (
                    <tr key={enrollment.id}>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {enrollment.student?.user?.name || 'Unknown Student'}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={enrollment.status} />
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={enrollment.paymentStatus} />
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {format(new Date(enrollment.enrolledAt), 'MMM d, yyyy')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  )
}
