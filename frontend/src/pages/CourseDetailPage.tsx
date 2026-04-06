import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { format } from 'date-fns'
import {
  ArrowLeft, BookOpen, Users, Calendar, Clock, Globe,
  DollarSign, Play, ChevronDown, Bell, BellOff, Tag, MessageSquare,
  BookKey, Send, Plus, Trash2, Upload
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { coursesApi, feedbackApi, materialCodesApi, assignmentsApi } from '../services/api'
import { Card, CardBody, CardHeader } from '../components/common/Card'
import { Button } from '../components/common/Button'
import { Badge, StatusBadge } from '../components/common/Badge'
import { LoadingSpinner } from '../components/common/LoadingSpinner'

export function CourseDetailPage() {
  const { id } = useParams<{ id: string }>()
  const queryClient = useQueryClient()
  const { isAdmin, isTeacher, isStudent } = useAuth()
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false)
  const [showAddCode, setShowAddCode] = useState(false)
  const [codeForm, setCodeForm] = useState({ codeType: 'BOOK', materialName: '', code: '', isGroupCode: false })
  const [codeSending, setCodeSending] = useState(false)
  const [codeSendResult, setCodeSendResult] = useState('')

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

  const { data: courseFeedback } = useQuery(
    ['course-feedback', id],
    () => feedbackApi.getAll({ courseId: id!, limit: 50 }),
    { enabled: !!id && (isAdmin || isTeacher) }
  )

  const { data: materialCodes = [] } = useQuery(
    ['course-material-codes', id],
    () => materialCodesApi.getForCourse(id!),
    { enabled: !!id && isAdmin }
  )

  const { data: courseAssignments = [] } = useQuery(
    ['course-assignments', id],
    () => assignmentsApi.getForCourse(id!),
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

  const updateCourseMutation = useMutation(
    (data: Record<string, any>) => coursesApi.update(id!, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['course', id])
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
            <Badge variant={course.courseType === 'SELF_PACED' ? 'info' : course.courseType === 'ROUNDTABLE' ? 'warning' : 'primary'}>
              {course.courseType === 'SELF_PACED' ? 'Self-Paced' : course.courseType === 'ROUNDTABLE' ? 'Roundtable' : 'Live Lesson'}
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

      {/* Automations & Settings (Admin only) */}
      {isAdmin && (
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Automations & Settings</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {course.automationsEnabled ? (
                    <Bell className="h-5 w-5 text-green-600" />
                  ) : (
                    <BellOff className="h-5 w-5 text-gray-400" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Automated Notifications
                    </p>
                    <p className="text-xs text-gray-500">
                      {course.automationsEnabled
                        ? 'Lesson reminders and notifications are active for this course'
                        : 'No automated notifications will be sent for this course'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => updateCourseMutation.mutate({ automationsEnabled: !course.automationsEnabled })}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                    course.automationsEnabled ? 'bg-green-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      course.automationsEnabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center gap-3">
                <Tag className="h-5 w-5 text-gray-400" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 mb-1">Course Category</p>
                  <select
                    value={course.courseCategory || ''}
                    onChange={(e) => updateCourseMutation.mutate({ courseCategory: e.target.value || null })}
                    className="block w-full sm:w-64 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-sm"
                  >
                    <option value="">No category</option>
                    <option value="regular">Regular</option>
                    <option value="workshop">Workshop</option>
                    <option value="intensive">Intensive</option>
                    <option value="one-to-one">One-to-One</option>
                    <option value="group">Group</option>
                  </select>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      )}

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

      {/* Feedback (Admin/Teacher only) */}
      {(isAdmin || isTeacher) && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-gray-400" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Feedback ({courseFeedback?.data?.length || 0})
                </h2>
              </div>
              <Link to={`/feedback?courseId=${id}`}>
                <Button variant="outline" size="sm">
                  Manage Feedback
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardBody>
            {(!courseFeedback?.data || courseFeedback.data.length === 0) ? (
              <p className="text-sm text-gray-500 text-center py-4">No feedback for this course yet</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lesson</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Score</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {courseFeedback.data.slice(0, 10).map((fb: any) => (
                      <tr key={fb.id}>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {fb.lesson?.title || `Lesson ${fb.lesson?.lessonNumber}`}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {fb.student?.user?.name || 'Unknown'}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {fb.score !== null ? `${fb.score}/100` : '—'}
                        </td>
                        <td className="px-4 py-3">
                          <StatusBadge status={fb.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {courseFeedback.data.length > 10 && (
                  <p className="text-xs text-gray-500 text-center py-2">
                    Showing 10 of {courseFeedback.data.length} —
                    <Link to={`/feedback?courseId=${id}`} className="text-primary-600 hover:underline ml-1">
                      View all
                    </Link>
                  </p>
                )}
              </div>
            )}
          </CardBody>
        </Card>
      )}

      {/* Assignments (Admin/Teacher) */}
      {(isAdmin || isTeacher) && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-gray-400" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Assignments ({courseAssignments.length})
                </h2>
              </div>
            </div>
          </CardHeader>
          <CardBody>
            {courseAssignments.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">No assignments for this course yet</p>
            ) : (
              <div className="space-y-2">
                {courseAssignments.map((a: any) => {
                  const isPastDue = new Date(a.dueDate) < new Date()
                  const submissionCount = a.submissions?.length || 0
                  return (
                    <div key={a.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {a.title || a.exercise?.title || 'Untitled'}
                        </p>
                        <div className="flex items-center gap-3 mt-0.5 text-xs text-gray-500">
                          <span>Due: {format(new Date(a.dueDate), 'MMM d, yyyy')}</span>
                          <span>{submissionCount} submission{submissionCount !== 1 ? 's' : ''}</span>
                          {a.allowFileUpload && (
                            <span className="flex items-center gap-0.5">
                              <Upload className="h-3 w-3" /> File upload
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {isPastDue ? (
                          <Badge variant="danger">Past Due</Badge>
                        ) : a.isPublished ? (
                          <Badge variant="success">Published</Badge>
                        ) : (
                          <Badge variant="warning">Draft</Badge>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </CardBody>
        </Card>
      )}

      {/* Material Codes (Admin only) */}
      {isAdmin && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookKey className="h-5 w-5 text-gray-400" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Material Codes ({materialCodes.length})
                </h2>
              </div>
              <div className="flex items-center gap-2">
                {materialCodes.length > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<Send className="h-4 w-4" />}
                    disabled={codeSending}
                    onClick={async () => {
                      setCodeSending(true)
                      setCodeSendResult('')
                      try {
                        const result = await materialCodesApi.sendAll(id!)
                        setCodeSendResult(`Sent to ${result.sentToStudents} student(s) and ${result.sentToTeachers} teacher(s)`)
                        queryClient.invalidateQueries(['course-material-codes', id])
                      } catch (err) {
                        setCodeSendResult('Failed to send codes')
                      } finally {
                        setCodeSending(false)
                      }
                    }}
                  >
                    {codeSending ? 'Sending...' : 'Send All Codes'}
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Plus className="h-4 w-4" />}
                  onClick={() => setShowAddCode(!showAddCode)}
                >
                  Add Code
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardBody>
            {codeSendResult && (
              <div className={`mb-4 p-3 rounded-lg text-sm ${
                codeSendResult.includes('Failed') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
              }`}>
                {codeSendResult}
              </div>
            )}

            {/* Add Code Form */}
            {showAddCode && (
              <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <select
                    value={codeForm.codeType}
                    onChange={e => setCodeForm({ ...codeForm, codeType: e.target.value })}
                    className="rounded-md border-gray-300 text-sm"
                  >
                    <option value="BOOK">Book Code</option>
                    <option value="MEL">My English Lab</option>
                    <option value="PLATFORM_ACCESS">Platform Access</option>
                    <option value="OTHER">Other</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Material name"
                    value={codeForm.materialName}
                    onChange={e => setCodeForm({ ...codeForm, materialName: e.target.value })}
                    className="rounded-md border-gray-300 text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Code value"
                    value={codeForm.code}
                    onChange={e => setCodeForm({ ...codeForm, code: e.target.value })}
                    className="rounded-md border-gray-300 text-sm font-mono"
                  />
                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-1.5 text-sm text-gray-600">
                      <input
                        type="checkbox"
                        checked={codeForm.isGroupCode}
                        onChange={e => setCodeForm({ ...codeForm, isGroupCode: e.target.checked })}
                        className="rounded border-gray-300 text-blue-600"
                      />
                      Group
                    </label>
                    <Button
                      size="sm"
                      disabled={!codeForm.materialName || !codeForm.code}
                      onClick={async () => {
                        try {
                          await materialCodesApi.create({
                            courseId: id!,
                            codeType: codeForm.codeType,
                            materialName: codeForm.materialName,
                            code: codeForm.code,
                            isGroupCode: codeForm.isGroupCode
                          })
                          setCodeForm({ codeType: 'BOOK', materialName: '', code: '', isGroupCode: false })
                          queryClient.invalidateQueries(['course-material-codes', id])
                        } catch (err) {
                          console.error('Failed to create code:', err)
                        }
                      }}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {materialCodes.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">No material codes for this course yet</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Material</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Assigned To</th>
                      <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase">Sent</th>
                      <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {materialCodes.map((mc: any) => (
                      <tr key={mc.id}>
                        <td className="px-3 py-2 text-sm">
                          <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                            mc.codeType === 'MEL' ? 'bg-purple-100 text-purple-700'
                            : mc.codeType === 'BOOK' ? 'bg-blue-100 text-blue-700'
                            : 'bg-gray-100 text-gray-700'
                          }`}>
                            {mc.codeType}
                            {mc.isGroupCode && ' (Group)'}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-sm text-gray-900">{mc.materialName}</td>
                        <td className="px-3 py-2 text-sm font-mono text-gray-600">{mc.code}</td>
                        <td className="px-3 py-2 text-sm text-gray-600">
                          {mc.isGroupCode ? (
                            <span className="text-gray-400 italic">All students</span>
                          ) : mc.student?.user?.name ? (
                            mc.student.user.name
                          ) : (
                            <span className="text-orange-500">Unassigned</span>
                          )}
                        </td>
                        <td className="px-3 py-2 text-center">
                          {mc.sentToStudent ? (
                            <span className="text-green-600 text-xs font-medium">Sent</span>
                          ) : (
                            <span className="text-gray-400 text-xs">Pending</span>
                          )}
                        </td>
                        <td className="px-3 py-2 text-center">
                          <button
                            onClick={async () => {
                              if (confirm('Delete this code?')) {
                                await materialCodesApi.delete(mc.id)
                                queryClient.invalidateQueries(['course-material-codes', id])
                              }
                            }}
                            className="p-1 text-gray-400 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
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
