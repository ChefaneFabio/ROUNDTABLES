import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { format } from 'date-fns'
import {
  ArrowLeft, Clock, Video, FileText,
  Image, Link as LinkIcon, Music, File, ChevronDown,
  Download, ExternalLink, Check, X, Send
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { lessonsApi } from '../services/api'
// Card components not used — page uses custom card styling
import { Button } from '../components/common/Button'
import { StatusBadge } from '../components/common/Badge'
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
  const [sendingLink, setSendingLink] = useState(false)
  const [sendLinkMsg, setSendLinkMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

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
      <div className="bg-white rounded-xl border border-gray-200 py-12 text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Lesson not found</h3>
        <Link to="/lessons" className="text-sm text-gray-600 hover:text-gray-900 underline">
          Back to lessons
        </Link>
      </div>
    )
  }

  const statuses = ['SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']
  const attendanceList = lesson.attendance || []

  const providerConfig: Record<string, { label: string; bg: string; text: string; icon: string }> = {
    ZOOM: { label: 'Zoom Meeting', bg: 'bg-blue-50', text: 'text-blue-700', icon: 'text-blue-600' },
    GOOGLE_MEET: { label: 'Google Meet', bg: 'bg-green-50', text: 'text-green-700', icon: 'text-green-600' },
    MICROSOFT_TEAMS: { label: 'Microsoft Teams', bg: 'bg-purple-50', text: 'text-purple-700', icon: 'text-purple-600' },
    IN_PERSON: { label: 'In-Person', bg: 'bg-amber-50', text: 'text-amber-700', icon: 'text-amber-600' },
  }

  const provider = providerConfig[lesson.meetingProvider] || { label: 'Meeting', bg: 'bg-gray-50', text: 'text-gray-700', icon: 'text-gray-600' }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Link
        to="/lessons"
        className="inline-flex items-center text-sm text-gray-400 hover:text-gray-600 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Lessons
      </Link>

      {/* Header Card */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-5">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl font-bold text-gray-900">
                  {lesson.title || `Lesson ${lesson.lessonNumber}`}
                </h1>
                <StatusBadge status={lesson.status} />
              </div>
              {lesson.course && (
                <p className="text-sm text-gray-500">
                  Part of{' '}
                  <Link
                    to={`/courses/${lesson.courseId}`}
                    className="text-gray-700 hover:text-gray-900 font-medium underline underline-offset-2"
                  >
                    {lesson.course.name}
                  </Link>
                </p>
              )}
              <div className="flex items-center gap-4 flex-wrap text-sm text-gray-500">
                {lesson.scheduledAt && (
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-gray-400" />
                    {format(new Date(lesson.scheduledAt), 'EEEE, MMM d, yyyy')} at {format(new Date(lesson.scheduledAt), 'HH:mm')}
                  </span>
                )}
                {lesson.duration && (
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-gray-400" />
                    {lesson.duration} min
                  </span>
                )}
              </div>
            </div>

            {(isAdmin || isTeacher) && (
              <div className="relative flex-shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  rightIcon={<ChevronDown className="h-4 w-4" />}
                  onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
                >
                  Update Status
                </Button>
                {statusDropdownOpen && (
                  <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10 py-1">
                    {statuses.map((s) => (
                      <button
                        key={s}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 disabled:text-gray-300 disabled:cursor-not-allowed"
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
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {lesson.teacher?.user && (
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Trainer</span>
            <div className="mt-2 flex items-center gap-2">
              <div className="h-7 w-7 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                <span className="text-gray-600 text-xs font-medium">
                  {lesson.teacher.user.name?.charAt(0) || 'T'}
                </span>
              </div>
              <p className="text-sm font-medium text-gray-900 truncate">{lesson.teacher.user.name}</p>
            </div>
          </div>
        )}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Attendance</span>
          <p className="text-2xl font-bold text-gray-900 mt-1">{attendanceList.length}</p>
          <p className="text-xs text-gray-400">learners</p>
        </div>
        {lesson.module && (
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Module</span>
            <p className="text-sm font-medium text-gray-900 mt-2">{lesson.module.title}</p>
          </div>
        )}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Materials</span>
          <p className="text-2xl font-bold text-gray-900 mt-1">{materials.length}</p>
          <p className="text-xs text-gray-400">files</p>
        </div>
      </div>

      {/* Meeting Section */}
      {(lesson.meetingLink || lesson.meetingProvider) && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Meeting</h3>
          </div>
          <div className="px-6 py-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${provider.bg}`}>
                  <Video className={`h-5 w-5 ${provider.icon}`} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-md text-xs font-semibold ${provider.bg} ${provider.text}`}>
                      {provider.label}
                    </span>
                  </div>
                  {lesson.meetingProvider === 'IN_PERSON' && lesson.location ? (
                    <div>
                      <p className="text-sm text-gray-700">{lesson.location}</p>
                      {lesson.locationDetails && (
                        <p className="text-xs text-gray-400 mt-0.5">{lesson.locationDetails}</p>
                      )}
                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(lesson.location)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 mt-1"
                      >
                        <ExternalLink className="h-3 w-3" /> Open in Maps
                      </a>
                    </div>
                  ) : (
                    <>
                      {lesson.meetingLink && (
                        <p className="text-xs text-gray-400 truncate max-w-md">{lesson.meetingLink}</p>
                      )}
                      {lesson.meetingPassword && (
                        <p className="text-xs text-gray-400 mt-0.5">
                          Password: <span className="font-mono">{lesson.meetingPassword}</span>
                        </p>
                      )}
                    </>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {lesson.meetingLink && (
                  <Button
                    leftIcon={<ExternalLink className="h-4 w-4" />}
                    onClick={() => window.open(lesson.meetingLink, '_blank')}
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
                {lesson.meetingLink && isAdmin && (
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<Send className="h-4 w-4" />}
                    disabled={sendingLink}
                    onClick={async () => {
                      try {
                        setSendingLink(true)
                        setSendLinkMsg(null)
                        const { default: api } = await import('../services/api')
                        await api.post(`/lessons/${id}/send-reminder`)
                        setSendLinkMsg({ type: 'success', text: 'Meeting link sent to all learners and trainers' })
                        setTimeout(() => setSendLinkMsg(null), 5000)
                      } catch (err: any) {
                        setSendLinkMsg({ type: 'error', text: err.response?.data?.error || 'Failed to send' })
                      } finally {
                        setSendingLink(false)
                      }
                    }}
                  >
                    {sendingLink ? 'Sending...' : 'Send Link Now'}
                  </Button>
                )}
              </div>
            </div>
            {sendLinkMsg && (
              <div className={`mt-4 px-4 py-2.5 rounded-lg text-sm ${
                sendLinkMsg.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                {sendLinkMsg.text}
              </div>
            )}
            {lesson.meetingRecordingUrl && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <a
                  href={lesson.meetingRecordingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 font-medium"
                >
                  <Download className="h-4 w-4" />
                  View Recording
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Description & Notes */}
      {(lesson.description || lesson.notes) && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Description & Notes</h3>
          <div className="space-y-4">
            {lesson.description && (
              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">Description</p>
                <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {lesson.description}
                </p>
              </div>
            )}
            {lesson.notes && (
              <div className={lesson.description ? 'pt-4 border-t border-gray-100' : ''}>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">Notes</p>
                <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{lesson.notes}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Materials */}
      {materials.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
              Materials ({materials.length})
            </h3>
          </div>
          <div className="divide-y divide-gray-50">
            {materials.map((material: any) => (
              <div
                key={material.id}
                className="flex items-center justify-between px-6 py-4 hover:bg-gray-50/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                    {materialIcons[material.type] || materialIcons.OTHER}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {material.title}
                    </p>
                    <div className="flex items-center gap-3 mt-0.5">
                      {material.description && (
                        <p className="text-xs text-gray-400">{material.description}</p>
                      )}
                      <span className="text-xs text-gray-400 font-medium">{material.type}</span>
                      {material.fileSize && (
                        <span className="text-xs text-gray-300">
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
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <Download className="h-4 w-4" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Attendance */}
      {(isAdmin || isTeacher) && attendanceList.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
              Attendance ({attendanceList.length})
            </h3>
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-green-500"></span> Present
              </span>
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-red-400"></span> Absent
              </span>
            </div>
          </div>
          <div className="divide-y divide-gray-50">
            {attendanceList.map((record: any) => (
              <div
                key={record.id}
                className="flex items-center justify-between px-6 py-3"
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-600 text-xs font-medium">
                      {record.student?.user?.name?.charAt(0) || 'S'}
                    </span>
                  </div>
                  <span className="text-sm text-gray-900 font-medium">
                    {record.student?.user?.name || 'Unknown Learner'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    className={`p-1.5 rounded-lg transition-colors ${
                      record.attended
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-50 text-gray-300 hover:bg-green-50 hover:text-green-600'
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
                    className={`p-1.5 rounded-lg transition-colors ${
                      !record.attended
                        ? 'bg-red-100 text-red-700'
                        : 'bg-gray-50 text-gray-300 hover:bg-red-50 hover:text-red-600'
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
        </div>
      )}
    </div>
  )
}
