import React, { useState, useEffect } from 'react'
import { Bell, Check, CheckCheck, Trash2, Calendar, Award, BookOpen, MessageSquare, AlertCircle } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

interface Notification {
  id: string
  type: 'lesson' | 'certificate' | 'course' | 'message' | 'system'
  title: string
  message: string
  isRead: boolean
  createdAt: string
  link?: string
}

const NOTIFICATION_ICONS: Record<string, React.ElementType> = {
  lesson: Calendar,
  certificate: Award,
  course: BookOpen,
  message: MessageSquare,
  system: AlertCircle
}

const NOTIFICATION_COLORS: Record<string, string> = {
  lesson: 'bg-blue-100 text-blue-600',
  certificate: 'bg-yellow-100 text-yellow-600',
  course: 'bg-green-100 text-green-600',
  message: 'bg-purple-100 text-purple-600',
  system: 'bg-gray-100 text-gray-600'
}

export const NotificationsPage: React.FC = () => {
  useAuth() // Ensure user is authenticated
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'unread'>('all')

  useEffect(() => {
    // Simulated data - replace with actual API call
    setTimeout(() => {
      setNotifications([
        {
          id: '1',
          type: 'lesson',
          title: 'Upcoming Lesson Reminder',
          message: 'Your English conversation class starts in 1 hour',
          isRead: false,
          createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
          link: '/lessons'
        },
        {
          id: '2',
          type: 'certificate',
          title: 'Certificate Earned!',
          message: 'Congratulations! You earned the B1 English Certificate',
          isRead: false,
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          link: '/certificates'
        },
        {
          id: '3',
          type: 'course',
          title: 'New Course Available',
          message: 'Business English Advanced is now available for enrollment',
          isRead: true,
          createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          link: '/courses'
        },
        {
          id: '4',
          type: 'message',
          title: 'New Message from Teacher',
          message: 'Your teacher left feedback on your latest assignment',
          isRead: true,
          createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
          link: '/feedback'
        },
        {
          id: '5',
          type: 'system',
          title: 'System Maintenance',
          message: 'Scheduled maintenance on Sunday 2AM-4AM UTC',
          isRead: true,
          createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString()
        }
      ])
      setIsLoading(false)
    }, 500)
  }, [])

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, isRead: true } : n
    ))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id))
  }

  const clearAll = () => {
    if (confirm('Are you sure you want to clear all notifications?')) {
      setNotifications([])
    }
  }

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

  const filteredNotifications = filter === 'unread'
    ? notifications.filter(n => !n.isRead)
    : notifications

  const unreadCount = notifications.filter(n => !n.isRead).length

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600">
            {unreadCount > 0 ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
          </p>
        </div>
        <div className="flex gap-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <CheckCheck className="w-4 h-4" />
              Mark all read
            </button>
          )}
          {notifications.length > 0 && (
            <button
              onClick={clearAll}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Clear all
            </button>
          )}
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All ({notifications.length})
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === 'unread'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Unread ({unreadCount})
        </button>
      </div>

      {/* Notifications list */}
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-gray-200 rounded-lg" />
                <div className="flex-1">
                  <div className="h-5 bg-gray-200 rounded w-1/3 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredNotifications.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">
            {filter === 'unread' ? 'No unread notifications' : 'No notifications yet'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredNotifications.map(notification => {
            const Icon = NOTIFICATION_ICONS[notification.type]
            return (
              <div
                key={notification.id}
                className={`bg-white rounded-lg border border-gray-200 p-4 transition-all hover:shadow-sm ${
                  !notification.isRead ? 'border-l-4 border-l-blue-500' : ''
                }`}
              >
                <div className="flex gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    NOTIFICATION_COLORS[notification.type]
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className={`font-medium ${!notification.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                          {notification.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">{notification.message}</p>
                      </div>
                      <span className="text-xs text-gray-400 whitespace-nowrap">
                        {formatTime(notification.createdAt)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      {notification.link && (
                        <a
                          href={notification.link}
                          className="text-sm text-blue-600 hover:text-blue-700"
                        >
                          View details
                        </a>
                      )}
                      {!notification.isRead && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
                        >
                          <Check className="w-4 h-4" />
                          Mark as read
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-600 ml-auto"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default NotificationsPage
