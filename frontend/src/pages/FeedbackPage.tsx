import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { format } from 'date-fns'
import { MessageSquare, Filter, ChevronDown, ChevronUp, Send, CheckCircle } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { feedbackApi } from '../services/api'
import { Card, CardBody } from '../components/common/Card'
import { Button } from '../components/common/Button'
import { Badge, StatusBadge } from '../components/common/Badge'
import { LoadingSpinner } from '../components/common/LoadingSpinner'

export function FeedbackPage() {
  const { isTeacher } = useAuth()

  return isTeacher ? <TeacherFeedbackView /> : <StudentFeedbackView />
}

function TeacherFeedbackView() {
  const queryClient = useQueryClient()
  const [statusFilter, setStatusFilter] = useState('')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const { data, isLoading } = useQuery(
    ['feedback', statusFilter],
    () => feedbackApi.getAll({ status: statusFilter || undefined }),
    { keepPreviousData: true }
  )

  const feedbackList = data?.data || []

  const approveMutation = useMutation(
    (id: string) => feedbackApi.approve(id),
    { onSuccess: () => queryClient.invalidateQueries(['feedback']) }
  )

  const sendMutation = useMutation(
    (id: string) => feedbackApi.send(id),
    { onSuccess: () => queryClient.invalidateQueries(['feedback']) }
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Feedback</h1>
          <p className="text-gray-600 mt-1">Manage feedback you've written for learners</p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-4">
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input pl-10 pr-8 appearance-none"
          >
            <option value="">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="NEEDS_REVISION">Needs Revision</option>
            <option value="SENT">Sent</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      ) : feedbackList.length === 0 ? (
        <Card>
          <CardBody className="py-12 text-center">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No feedback found</h3>
            <p className="text-gray-500">
              {statusFilter ? 'Try adjusting your filters' : 'No feedback written yet'}
            </p>
          </CardBody>
        </Card>
      ) : (
        <div className="space-y-3">
          {feedbackList.map((feedback: any) => {
            const isExpanded = expandedId === feedback.id
            return (
              <Card key={feedback.id}>
                <CardBody>
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => setExpandedId(isExpanded ? null : feedback.id)}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {feedback.lesson?.title || `Lesson ${feedback.lesson?.lessonNumber || ''}`}
                        </p>
                        <StatusBadge status={feedback.status} />
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span>Learner: {feedback.student?.user?.name || 'Unknown'}</span>
                        {feedback.score !== null && feedback.score !== undefined && (
                          <Badge variant="info">Score: {feedback.score}</Badge>
                        )}
                        <span>{format(new Date(feedback.createdAt), 'MMM d, yyyy')}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      {feedback.status === 'PENDING' && (
                        <Button
                          size="sm"
                          variant="outline"
                          leftIcon={<CheckCircle className="h-3.5 w-3.5" />}
                          onClick={(e) => {
                            e.stopPropagation()
                            approveMutation.mutate(feedback.id)
                          }}
                          isLoading={approveMutation.isLoading}
                        >
                          Approve
                        </Button>
                      )}
                      {feedback.status === 'APPROVED' && (
                        <Button
                          size="sm"
                          leftIcon={<Send className="h-3.5 w-3.5" />}
                          onClick={(e) => {
                            e.stopPropagation()
                            sendMutation.mutate(feedback.id)
                          }}
                          isLoading={sendMutation.isLoading}
                        >
                          Send
                        </Button>
                      )}
                      {isExpanded ? (
                        <ChevronUp className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">
                        {feedback.content}
                      </p>
                      {feedback.reviewNotes && (
                        <div className="mt-3 p-3 bg-yellow-50 rounded-md">
                          <p className="text-xs font-medium text-yellow-800 mb-1">
                            Review Notes
                          </p>
                          <p className="text-sm text-yellow-700">{feedback.reviewNotes}</p>
                        </div>
                      )}
                    </div>
                  )}
                </CardBody>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}

function StudentFeedbackView() {
  const { data, isLoading } = useQuery(
    ['feedback'],
    () => feedbackApi.getAll({}),
    { keepPreviousData: true }
  )

  const feedbackList = data?.data || []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Feedback</h1>
        <p className="text-gray-600 mt-1">View feedback from your trainers</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      ) : feedbackList.length === 0 ? (
        <Card>
          <CardBody className="py-12 text-center">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No feedback yet</h3>
            <p className="text-gray-500">
              You'll see feedback from your trainers here once it's been shared.
            </p>
          </CardBody>
        </Card>
      ) : (
        <div className="space-y-4">
          {feedbackList.map((feedback: any) => (
            <Card key={feedback.id}>
              <CardBody>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {feedback.lesson?.title || `Lesson ${feedback.lesson?.lessonNumber || ''}`}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Trainer: {feedback.teacher?.user?.name || 'Unknown'}
                      {' · '}
                      {format(new Date(feedback.createdAt), 'MMM d, yyyy')}
                    </p>
                  </div>
                  {feedback.score !== null && feedback.score !== undefined && (
                    <Badge variant="info" size="md">Score: {feedback.score}</Badge>
                  )}
                </div>
                <p className="text-sm text-gray-700 whitespace-pre-wrap">
                  {feedback.content}
                </p>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
