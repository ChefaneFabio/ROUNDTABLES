import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { format } from 'date-fns'
import {
  ArrowLeft, Clock, BookOpen, Users, Video, FileText,
  Image, Link as LinkIcon, Music, File, ChevronDown,
  Download, ExternalLink, Check, X
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { lessonsApi } from '../services/api'
import { Card, CardBody, CardHeader } from '../components/common/Card'
import { Button } from '../components/common/Button'
import { Badge, StatusBadge } from '../components/common/Badge'
import { LoadingSpinner } from '../components/common/LoadingSpinner'

const materialIcons: Record<string, React.ReactNode> = {
  PDF: <FileText className="h-5 w-5 text-red-500" />,
  VIDEO: <Video className="h-5 w-5 text-blue-500" />,
  LINK: <LinkIcon className="h-5 w-5 text-green-500" />,
  IMAGE: <Image className="h-5 w-5 text-purple-500" />,
  AUDIO: <Music className="h-5 w-5 text-orange-500" />,
  DOCUMENT: <FileText className="h-5 w-5 text-blue-500" />,
  OTHER: <File className="h-5 w-5 text-gray-500" />,
}

export function LessonDetailPage() {
  const { id } = useParams<{ id: string }>()
  const queryClient = useQueryClient()
  const { isAdmin, isTeacher } = useAuth()
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false)

  const { data: lesson, isLoading } = useQuery(
    ['lesson', id],
    () => lessonsApi.getById(id!),
    { enabled: !!id }
  )

  const { data: materials = [] } = useQuery(
    ['lesson-materials', id],
    () => lessonsApi.getMaterials(id!),
    { enabled: !!id }
  )

  const statusMutation = useMutation(
    (status: string) => lessonsApi.updateStatus(id!, status),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['lesson', id])
        setStatusDropdownOpen(false)
      },
    }
  )

  const attendanceMutation = useMutation(
    (data: { records: Array<{ studentId: string; attended: boolean }> }) =>
      lessonsApi.recordAttendance(id!, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['lesson', id])
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

  if (!lesson) {
    return (
      <Card>
        <CardBody className="py-12 text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Lesson not found</h3>
          <Link to="/lessons" className="text-primary-600 hover:text-primary-700">
            Back to lessons
          </Link>
        </CardBody>
      </Card>
    )
  }

  const statuses = ['SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']
  const attendanceList = lesson.attendance || []

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Link
          to="/lessons"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Lessons
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">
              {lesson.title || `Lesson ${lesson.lessonNumber}`}
            </h1>
            <StatusBadge status={lesson.status} />
          </div>

          {(isAdmin || isTeacher) && (
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                rightIcon={<ChevronDown className="h-4 w-4" />}
                onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
              >
                Update Status
              </Button>
              {statusDropdownOpen && (
                <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                  {statuses.map((s) => (
                    <button
                      key={s}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 first:rounded-t-md last:rounded-b-md"
                      onClick={() => statusMutation.mutate(s)}
                      disabled={s === lesson.status}
                    >
                      {s.replace(/_/g, ' ')}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Info Card */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-900">Lesson Information</h2>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="h-4 w-4 mr-2 text-gray-400" />
              <span className="font-medium mr-1">Scheduled:</span>
              {lesson.scheduledAt
                ? format(new Date(lesson.scheduledAt), 'MMM d, yyyy · HH:mm')
                : '—'}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="h-4 w-4 mr-2 text-gray-400" />
              <span className="font-medium mr-1">Duration:</span>
              {lesson.duration} minutes
            </div>
            {lesson.course && (
              <div className="flex items-center text-sm text-gray-600">
                <BookOpen className="h-4 w-4 mr-2 text-gray-400" />
                <span className="font-medium mr-1">Course:</span>
                <Link
                  to={`/courses/${lesson.courseId}`}
                  className="text-primary-600 hover:text-primary-700"
                >
                  {lesson.course.name}
                </Link>
              </div>
            )}
            {lesson.teacher?.user && (
              <div className="flex items-center text-sm text-gray-600">
                <Users className="h-4 w-4 mr-2 text-gray-400" />
                <span className="font-medium mr-1">Teacher:</span>
                {lesson.teacher.user.name}
              </div>
            )}
            {lesson.module && (
              <div className="flex items-center text-sm text-gray-600">
                <BookOpen className="h-4 w-4 mr-2 text-gray-400" />
                <span className="font-medium mr-1">Module:</span>
                {lesson.module.title}
              </div>
            )}
          </div>
        </CardBody>
      </Card>

      {/* Meeting Section */}
      {(lesson.meetingLink || lesson.meetingProvider) && (
        <Card>
          <CardBody>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                  lesson.meetingProvider === 'ZOOM' ? 'bg-blue-100' :
                  lesson.meetingProvider === 'GOOGLE_MEET' ? 'bg-green-100' :
                  lesson.meetingProvider === 'MICROSOFT_TEAMS' ? 'bg-purple-100' : 'bg-gray-100'
                }`}>
                  <Video className={`h-6 w-6 ${
                    lesson.meetingProvider === 'ZOOM' ? 'text-blue-600' :
                    lesson.meetingProvider === 'GOOGLE_MEET' ? 'text-green-600' :
                    lesson.meetingProvider === 'MICROSOFT_TEAMS' ? 'text-purple-600' : 'text-gray-600'
                  }`} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {lesson.meetingProvider === 'ZOOM' ? 'Zoom Meeting' :
                     lesson.meetingProvider === 'GOOGLE_MEET' ? 'Google Meet' :
                     lesson.meetingProvider === 'MICROSOFT_TEAMS' ? 'Microsoft Teams' : 'Meeting'}
                  </p>
                  {lesson.meetingLink && (
                    <p className="text-xs text-gray-500 truncate max-w-md">{lesson.meetingLink}</p>
                  )}
                  {lesson.meetingPassword && (
                    <p className="text-xs text-gray-400 mt-0.5">Password: {lesson.meetingPassword}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {lesson.meetingLink && (
                  <Button
                    leftIcon={<ExternalLink className="h-4 w-4" />}
                    onClick={() => window.open(lesson.meetingLink, '_blank')}
                    className={
                      lesson.meetingProvider === 'ZOOM' ? 'bg-blue-600 hover:bg-blue-700 text-white' :
                      lesson.meetingProvider === 'GOOGLE_MEET' ? 'bg-green-600 hover:bg-green-700 text-white' :
                      lesson.meetingProvider === 'MICROSOFT_TEAMS' ? 'bg-purple-600 hover:bg-purple-700 text-white' : ''
                    }
                  >
                    Join Meeting
                  </Button>
                )}
                {lesson.meetingHostUrl && (isAdmin || isTeacher) && (
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<ExternalLink className="h-4 w-4" />}
                    onClick={() => window.open(lesson.meetingHostUrl, '_blank')}
                  >
                    Host Link
                  </Button>
                )}
              </div>
            </div>
            {lesson.meetingRecordingUrl && (
              <div className="mt-3 pt-3 border-t">
                <a
                  href={lesson.meetingRecordingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  <Download className="h-4 w-4" />
                  View Recording
                </a>
              </div>
            )}
          </CardBody>
        </Card>
      )}

      {/* Description / Notes */}
      {(lesson.description || lesson.notes) && (
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Description & Notes</h2>
          </CardHeader>
          <CardBody>
            {lesson.description && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-1">Description</h3>
                <p className="text-sm text-gray-600 whitespace-pre-wrap">
                  {lesson.description}
                </p>
              </div>
            )}
            {lesson.notes && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-1">Notes</h3>
                <p className="text-sm text-gray-600 whitespace-pre-wrap">{lesson.notes}</p>
              </div>
            )}
          </CardBody>
        </Card>
      )}

      {/* Materials */}
      {materials.length > 0 && (
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">
              Materials ({materials.length})
            </h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-3">
              {materials.map((material: any) => (
                <div
                  key={material.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    {materialIcons[material.type] || materialIcons.OTHER}
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {material.title}
                      </p>
                      {material.description && (
                        <p className="text-xs text-gray-500">{material.description}</p>
                      )}
                      <div className="flex items-center gap-2 mt-0.5">
                        <Badge>{material.type}</Badge>
                        {material.fileSize && (
                          <span className="text-xs text-gray-400">
                            {(material.fileSize / 1024 / 1024).toFixed(1)} MB
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  {material.url && (
                    <a
                      href={material.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700"
                    >
                      <Download className="h-5 w-5" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      )}

      {/* Attendance (Admin/Teacher only) */}
      {(isAdmin || isTeacher) && attendanceList.length > 0 && (
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">
              Attendance ({attendanceList.length})
            </h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-2">
              {attendanceList.map((record: any) => (
                <div
                  key={record.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-600 text-sm font-medium">
                        {record.student?.user?.name?.charAt(0) || 'S'}
                      </span>
                    </div>
                    <span className="text-sm text-gray-900">
                      {record.student?.user?.name || 'Unknown Student'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className={`p-1.5 rounded-full ${
                        record.attended
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-400 hover:bg-green-50 hover:text-green-600'
                      }`}
                      onClick={() =>
                        attendanceMutation.mutate({
                          records: [
                            { studentId: record.studentId, attended: true },
                          ],
                        })
                      }
                      title="Mark as attended"
                    >
                      <Check className="h-4 w-4" />
                    </button>
                    <button
                      className={`p-1.5 rounded-full ${
                        !record.attended
                          ? 'bg-red-100 text-red-700'
                          : 'bg-gray-100 text-gray-400 hover:bg-red-50 hover:text-red-600'
                      }`}
                      onClick={() =>
                        attendanceMutation.mutate({
                          records: [
                            { studentId: record.studentId, attended: false },
                          ],
                        })
                      }
                      title="Mark as absent"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  )
}
