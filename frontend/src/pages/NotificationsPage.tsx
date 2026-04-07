import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { Bell, Check, CheckCheck, Calendar, Award, BookOpen, MessageSquare, AlertCircle, Inbox } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { notificationsApi } from '../services/api'
import { assessmentApi } from '../services/assessmentApi'
import { LoadingSpinner } from '../components/common/LoadingSpinner'

const NOTIFICATION_ICONS: Record<string, React.ElementType> = {
  LESSON_REMINDER: Calendar,
  TEACHER_REMINDER: Calendar,
  ENROLLMENT_CONFIRMED: BookOpen,
  COURSE_UPDATE: BookOpen,
  FEEDBACK_REQUEST: MessageSquare,
  QUESTIONS_REQUEST: MessageSquare,
  ASSESSMENT_ASSIGNED: Award,
  PAYMENT_REMINDER: AlertCircle,
  PAYMENT_RECEIVED: Award,
  VOTING_INVITE: BookOpen,
  GENERAL: Bell
}

const NOTIFICATION_COLORS: Record<string, string> = {
  LESSON_REMINDER: 'bg-slate-100 text-slate-600',
  TEACHER_REMINDER: 'bg-slate-100 text-slate-600',
  ENROLLMENT_CONFIRMED: 'bg-gray-100 text-gray-600',
  COURSE_UPDATE: 'bg-gray-100 text-gray-600',
  FEEDBACK_REQUEST: 'bg-slate-100 text-slate-500',
  QUESTIONS_REQUEST: 'bg-slate-100 text-slate-500',
  ASSESSMENT_ASSIGNED: 'bg-gray-100 text-gray-500',
  PAYMENT_REMINDER: 'bg-gray-100 text-gray-500',
  PAYMENT_RECEIVED: 'bg-gray-100 text-gray-600',
  VOTING_INVITE: 'bg-slate-100 text-slate-500',
  GENERAL: 'bg-gray-100 text-gray-500'
}

export const NotificationsPage: React.FC = () => {
  useAuth()
  const queryClient = useQueryClient()
  const [filter, setFilter] = useState<'all' | 'unread'>('all')
  const [page, setPage] = useState(1)

  const { data, isLoading, error } = useQuery(
    ['notifications', page, filter],
    () => notificationsApi.getMyNotifications({
      page,
      limit: 20,
      unreadOnly: filter === 'unread'
    }),
    { keepPreviousData: true }
  )

  const notifications = data?.data || []
  const meta = data?.meta

  const markReadMutation = useMutation(
    (id: string) => notificationsApi.markAsRead(id),
    { onSuccess: () => queryClient.invalidateQueries('notifications') }
  )

  const markAllMutation = useMutation(
    () => notificationsApi.markAllAsRead(),
    { onSuccess: () => queryClient.invalidateQueries('notifications') }
  )

  const [approveStatus, setApproveStatus] = useState<Record<string, 'idle' | 'loading' | 'success' | 'error'>>({})

  const handleApproveRetry = async (notificationId: string, metadata: any) => {
    setApproveStatus(prev => ({ ...prev, [notificationId]: 'loading' }))
    try {
      await assessmentApi.approveSectionRetry(metadata.assessmentId, metadata.sectionId)
      setApproveStatus(prev => ({ ...prev, [notificationId]: 'success' }))
      // Mark notification as read after approval
      await notificationsApi.markAsRead(notificationId)
      queryClient.invalidateQueries('notifications')
    } catch (err) {
      setApproveStatus(prev => ({ ...prev, [notificationId]: 'error' }))
    }
  }

  const unreadCount = notifications.filter((n: any) => !n.readAt).length

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now.getTime() - date.getTime()

    if (diff < 60 * 60 * 1000) {
      const mins = Math.floor(diff / (60 * 1000))
      return `${mins}m ago`
    } else if (diff < 24 * 60 * 60 * 1000) {
      const hours = Math.floor(diff / (60 * 60 * 1000))
      return `${hours}h ago`
    } else {
      const days = Math.floor(diff / (24 * 60 * 60 * 1000))
      return `${days}d ago`
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Notifications</h1>
          <p className="text-sm text-gray-500 mt-1">
            {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up'}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={() => markAllMutation.mutate()}
            disabled={markAllMutation.isLoading}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <CheckCheck className="w-4 h-4" />
            Mark all as read
          </button>
        )}
      </div>

      {/* Filter tabs - underline style */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-6">
          <button
            onClick={() => { setFilter('all'); setPage(1) }}
            className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
              filter === 'all'
                ? 'border-gray-900 text-gray-900'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            All
          </button>
          <button
            onClick={() => { setFilter('unread'); setPage(1) }}
            className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
              filter === 'unread'
                ? 'border-gray-900 text-gray-900'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Unread
            {unreadCount > 0 && (
              <span className="ml-2 px-1.5 py-0.5 text-xs bg-gray-200 text-gray-700 rounded-full">
                {unreadCount}
              </span>
            )}
          </button>
        </nav>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex justify-center py-16"><LoadingSpinner /></div>
      ) : error ? (
        <div className="bg-white rounded-xl border border-gray-200 p-6 text-center py-16">
          <AlertCircle className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-sm text-gray-500">Failed to load notifications</p>
        </div>
      ) : notifications.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-6 text-center py-16">
          <Inbox className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-sm font-medium text-gray-700">
            {filter === 'unread' ? 'No unread notifications' : 'No notifications yet'}
          </p>
          <p className="text-sm text-gray-400 mt-1">
            {filter === 'unread' ? 'You are all caught up.' : 'Notifications will appear here when you receive them.'}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {notifications.map((notification: any) => {
            const Icon = NOTIFICATION_ICONS[notification.type] || Bell
            const isUnread = !notification.readAt
            return (
              <div
                key={notification.id}
                className={`bg-white rounded-xl border border-gray-200 p-4 transition-all hover:border-gray-300 ${
                  isUnread ? 'bg-slate-50/50' : ''
                }`}
              >
                <div className="flex gap-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    NOTIFICATION_COLORS[notification.type] || 'bg-gray-100 text-gray-500'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2">
                        {isUnread && (
                          <span className="mt-1.5 w-2 h-2 bg-slate-500 rounded-full flex-shrink-0" />
                        )}
                        <div>
                          <h3 className={`text-sm ${isUnread ? 'font-semibold text-gray-900' : 'font-medium text-gray-700'}`}>
                            {notification.subject || notification.type}
                          </h3>
                          <p className="text-sm text-gray-500 mt-0.5 leading-relaxed">{notification.content}</p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-400 whitespace-nowrap mt-0.5">
                        {formatTime(notification.sentAt || notification.createdAt)}
                      </span>
                    </div>

                    {/* Retry request actions */}
                    {notification.metadata?.type === 'SECTION_RETRY_REQUEST' && approveStatus[notification.id] !== 'success' && (
                      <div className="flex items-center gap-2 mt-3 ml-4">
                        <button
                          onClick={() => handleApproveRetry(notification.id, notification.metadata)}
                          disabled={approveStatus[notification.id] === 'loading'}
                          className="flex items-center gap-1 px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
                        >
                          {approveStatus[notification.id] === 'loading' ? (
                            <>Processing...</>
                          ) : (
                            <><Check className="w-3.5 h-3.5" /> Approve Retry</>
                          )}
                        </button>
                        <button
                          onClick={() => markReadMutation.mutate(notification.id)}
                          disabled={markReadMutation.isLoading}
                          className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 text-gray-600 text-xs font-medium rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                        >
                          Dismiss
                        </button>
                        {approveStatus[notification.id] === 'error' && (
                          <span className="text-xs text-red-500">Failed to approve. Try again.</span>
                        )}
                      </div>
                    )}
                    {approveStatus[notification.id] === 'success' && (
                      <div className="flex items-center gap-1 mt-3 ml-4 text-xs text-gray-500">
                        <CheckCheck className="w-3.5 h-3.5" /> Retry approved successfully
                      </div>
                    )}

                    {/* Mark as read for non-action notifications */}
                    {isUnread && notification.metadata?.type !== 'SECTION_RETRY_REQUEST' && (
                      <button
                        onClick={() => markReadMutation.mutate(notification.id)}
                        className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 mt-2 ml-4"
                      >
                        <Check className="w-3.5 h-3.5" /> Mark as read
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Pagination */}
      {meta && meta.totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page <= 1}
            className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-700 disabled:opacity-50 hover:bg-gray-50 transition-colors"
          >
            Previous
          </button>
          <span className="text-sm text-gray-500">
            Page {page} of {meta.totalPages}
          </span>
          <button
            onClick={() => setPage(p => p + 1)}
            disabled={page >= meta.totalPages}
            className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-700 disabled:opacity-50 hover:bg-gray-50 transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default NotificationsPage
