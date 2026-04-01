import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { Bell, Check, CheckCheck, Calendar, Award, BookOpen, MessageSquare, AlertCircle } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { notificationsApi } from '../services/api'
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
  LESSON_REMINDER: 'bg-blue-100 text-blue-600',
  TEACHER_REMINDER: 'bg-blue-100 text-blue-600',
  ENROLLMENT_CONFIRMED: 'bg-green-100 text-green-600',
  COURSE_UPDATE: 'bg-green-100 text-green-600',
  FEEDBACK_REQUEST: 'bg-purple-100 text-purple-600',
  QUESTIONS_REQUEST: 'bg-purple-100 text-purple-600',
  ASSESSMENT_ASSIGNED: 'bg-yellow-100 text-yellow-600',
  PAYMENT_REMINDER: 'bg-red-100 text-red-600',
  PAYMENT_RECEIVED: 'bg-green-100 text-green-600',
  VOTING_INVITE: 'bg-indigo-100 text-indigo-600',
  GENERAL: 'bg-gray-100 text-gray-600'
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600">
            {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up!'}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={() => markAllMutation.mutate()}
            disabled={markAllMutation.isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            <CheckCheck className="w-4 h-4" />
            Mark all read
          </button>
        )}
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => { setFilter('all'); setPage(1) }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All
        </button>
        <button
          onClick={() => { setFilter('unread'); setPage(1) }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === 'unread' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Unread
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12"><LoadingSpinner /></div>
      ) : error ? (
        <div className="text-center py-12 bg-white rounded-lg border">
          <AlertCircle className="w-12 h-12 text-red-300 mx-auto mb-4" />
          <p className="text-red-500">Failed to load notifications</p>
        </div>
      ) : notifications.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border">
          <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">{filter === 'unread' ? 'No unread notifications' : 'No notifications yet'}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((notification: any) => {
            const Icon = NOTIFICATION_ICONS[notification.type] || Bell
            const isUnread = !notification.readAt
            return (
              <div
                key={notification.id}
                className={`bg-white rounded-lg border border-gray-200 p-4 transition-all hover:shadow-sm ${
                  isUnread ? 'border-l-4 border-l-blue-500' : ''
                }`}
              >
                <div className="flex gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    NOTIFICATION_COLORS[notification.type] || 'bg-gray-100 text-gray-600'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className={`font-medium ${isUnread ? 'text-gray-900' : 'text-gray-700'}`}>
                          {notification.subject || notification.type}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">{notification.content}</p>
                      </div>
                      <span className="text-xs text-gray-400 whitespace-nowrap">
                        {formatTime(notification.sentAt || notification.createdAt)}
                      </span>
                    </div>
                    {isUnread && (
                      <button
                        onClick={() => markReadMutation.mutate(notification.id)}
                        className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mt-2"
                      >
                        <Check className="w-4 h-4" /> Mark as read
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {meta && meta.totalPages > 1 && (
        <div className="flex justify-center gap-2 pt-4">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page <= 1}
            className="px-3 py-1.5 rounded border text-sm disabled:opacity-50 hover:bg-gray-50"
          >
            Previous
          </button>
          <span className="px-3 py-1.5 text-sm text-gray-600">
            Page {page} of {meta.totalPages}
          </span>
          <button
            onClick={() => setPage(p => p + 1)}
            disabled={page >= meta.totalPages}
            className="px-3 py-1.5 rounded border text-sm disabled:opacity-50 hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default NotificationsPage
