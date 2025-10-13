import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Bell,
  CheckCircle,
  AlertTriangle,
  Info,
  Clock,
  Mail,
  Users,
  Calendar,
  MessageSquare,
  Trash2,
  MailOpen,
  Search
} from 'lucide-react'

interface Notification {
  id: string
  type: 'INFO' | 'WARNING' | 'SUCCESS' | 'ERROR'
  title: string
  message: string
  category: 'EMAIL' | 'SESSION' | 'PARTICIPANT' | 'SYSTEM' | 'FEEDBACK'
  isRead: boolean
  createdAt: string
  actionUrl?: string
  actionText?: string
}

export function NotificationsPage() {
  const navigate = useNavigate()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchNotifications()
  }, [])

  const fetchNotifications = async () => {
    try {
      setLoading(true)
      // Simulate API call
      const mockNotifications: Notification[] = [
        {
          id: '1',
          type: 'WARNING',
          title: 'Trainer Questions Overdue',
          message: 'Marco Rossi has not submitted questions for tomorrow\'s session on "The Art of Negotiation"',
          category: 'SESSION',
          isRead: false,
          createdAt: '2024-01-21T08:30:00Z',
          actionUrl: '/sessions/1',
          actionText: 'View Session'
        },
        {
          id: '2',
          type: 'SUCCESS',
          title: 'Feedback Approved',
          message: '5 feedback items have been reviewed and sent to participants',
          category: 'FEEDBACK',
          isRead: false,
          createdAt: '2024-01-21T07:15:00Z',
          actionUrl: '/feedback',
          actionText: 'View Feedback'
        },
        {
          id: '3',
          type: 'INFO',
          title: 'New Participant Added',
          message: 'Anna Bianchi has been added to Leadership Training Q1',
          category: 'PARTICIPANT',
          isRead: true,
          createdAt: '2024-01-20T16:45:00Z',
          actionUrl: '/participants',
          actionText: 'View Participants'
        },
        {
          id: '4',
          type: 'WARNING',
          title: 'Low Attendance Alert',
          message: 'Session #3 has only 3 confirmed attendees out of 6 participants',
          category: 'SESSION',
          isRead: false,
          createdAt: '2024-01-20T14:20:00Z',
          actionUrl: '/sessions/3',
          actionText: 'Check Attendance'
        },
        {
          id: '5',
          type: 'SUCCESS',
          title: 'Email Campaign Delivered',
          message: 'Question email successfully sent to 6 participants for tomorrow\'s session',
          category: 'EMAIL',
          isRead: true,
          createdAt: '2024-01-20T12:00:00Z'
        },
        {
          id: '6',
          type: 'ERROR',
          title: 'Email Delivery Failed',
          message: 'Failed to send reminder email to giuseppe.verde@fastweb.it',
          category: 'EMAIL',
          isRead: false,
          createdAt: '2024-01-20T10:30:00Z',
          actionUrl: '/email-templates',
          actionText: 'Check Templates'
        },
        {
          id: '7',
          type: 'INFO',
          title: 'Voting Period Ended',
          message: 'Topic voting for Innovation Workshop has concluded with 100% participation',
          category: 'PARTICIPANT',
          isRead: true,
          createdAt: '2024-01-19T23:59:00Z',
          actionUrl: '/roundtables/3/voting',
          actionText: 'View Results'
        }
      ]
      setNotifications(mockNotifications)
    } catch (error) {
      console.error('Error fetching notifications:', error)
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = (notificationId: string) => {
    setNotifications(notifications.map(n => 
      n.id === notificationId ? { ...n, isRead: true } : n
    ))
  }

  const markAsUnread = (notificationId: string) => {
    setNotifications(notifications.map(n => 
      n.id === notificationId ? { ...n, isRead: false } : n
    ))
  }

  const deleteNotification = (notificationId: string) => {
    setNotifications(notifications.filter(n => n.id !== notificationId))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'SUCCESS': return CheckCircle
      case 'WARNING': return AlertTriangle
      case 'ERROR': return AlertTriangle
      case 'INFO': return Info
      default: return Bell
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'EMAIL': return Mail
      case 'SESSION': return Calendar
      case 'PARTICIPANT': return Users
      case 'FEEDBACK': return MessageSquare
      case 'SYSTEM': return Bell
      default: return Bell
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'SUCCESS': return 'border-green-200 bg-green-50'
      case 'WARNING': return 'border-yellow-200 bg-yellow-50'
      case 'ERROR': return 'border-red-200 bg-red-50'
      case 'INFO': return 'border-blue-200 bg-blue-50'
      default: return 'border-gray-200 bg-gray-50'
    }
  }

  const getIconColor = (type: string) => {
    switch (type) {
      case 'SUCCESS': return 'text-green-600'
      case 'WARNING': return 'text-yellow-600'
      case 'ERROR': return 'text-red-600'
      case 'INFO': return 'text-blue-600'
      default: return 'text-gray-600'
    }
  }

  const filteredNotifications = notifications.filter(notification => {
    const matchesFilter = 
      filter === 'all' ||
      (filter === 'unread' && !notification.isRead) ||
      (filter === 'read' && notification.isRead) ||
      notification.category === filter

    const matchesSearch = 
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesFilter && matchesSearch
  })

  const unreadCount = notifications.filter(n => !n.isRead).length

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Maka Roundtables</h1>
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="/dashboard" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Dashboard</a>
                <a href="/roundtables" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Roundtables</a>
                <a href="/participants" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Participants</a>
                <a href="/sessions" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Sessions</a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Bell className="h-8 w-8 mr-3" />
              Notifications
              {unreadCount > 0 && (
                <span className="ml-3 bg-red-500 text-white rounded-full px-2 py-1 text-sm">
                  {unreadCount}
                </span>
              )}
            </h1>
            <p className="text-gray-600 mt-2">Stay updated with important system alerts and reminders</p>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Mark All Read
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search notifications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Notifications</option>
                <option value="unread">Unread ({unreadCount})</option>
                <option value="read">Read</option>
                <option value="EMAIL">Email</option>
                <option value="SESSION">Sessions</option>
                <option value="PARTICIPANT">Participants</option>
                <option value="FEEDBACK">Feedback</option>
                <option value="SYSTEM">System</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => {
              const NotificationIcon = getNotificationIcon(notification.type)
              const CategoryIcon = getCategoryIcon(notification.category)
              
              return (
                <div
                  key={notification.id}
                  className={`border rounded-lg p-4 ${getNotificationColor(notification.type)} ${
                    !notification.isRead ? 'border-l-4 border-l-blue-500' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start flex-1">
                      <div className="flex-shrink-0 mr-4">
                        <div className="flex items-center">
                          <NotificationIcon className={`h-6 w-6 ${getIconColor(notification.type)} mr-2`} />
                          <CategoryIcon className="h-4 w-4 text-gray-500" />
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center">
                          <h3 className={`text-lg font-semibold ${!notification.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                            {notification.title}
                          </h3>
                          {!notification.isRead && (
                            <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full"></span>
                          )}
                        </div>
                        
                        <p className="text-gray-600 mt-1">{notification.message}</p>
                        
                        <div className="flex items-center mt-2 text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{new Date(notification.createdAt).toLocaleString()}</span>
                          <span className="mx-2">•</span>
                          <span className="capitalize">{notification.category.toLowerCase()}</span>
                        </div>
                        
                        {notification.actionUrl && (
                          <div className="mt-3">
                            <button
                              onClick={() => {
                                markAsRead(notification.id)
                                navigate(notification.actionUrl!)
                              }}
                              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                              {notification.actionText} →
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      {notification.isRead ? (
                        <button
                          onClick={() => markAsUnread(notification.id)}
                          className="text-gray-400 hover:text-gray-600"
                          title="Mark as unread"
                        >
                          <MailOpen className="h-4 w-4" />
                        </button>
                      ) : (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="text-blue-500 hover:text-blue-700"
                          title="Mark as read"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </button>
                      )}
                      
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="text-red-400 hover:text-red-600"
                        title="Delete notification"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm || filter !== 'all' ? 'No matching notifications' : 'No notifications'}
              </h3>
              <p className="text-gray-600">
                {searchTerm || filter !== 'all' 
                  ? 'Try adjusting your search or filter criteria'
                  : 'You\'re all caught up! New notifications will appear here.'
                }
              </p>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        {notifications.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{notifications.length}</p>
                <p className="text-sm text-gray-600">Total</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{unreadCount}</p>
                <p className="text-sm text-gray-600">Unread</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-600">
                  {notifications.filter(n => n.type === 'WARNING').length}
                </p>
                <p className="text-sm text-gray-600">Warnings</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-red-600">
                  {notifications.filter(n => n.type === 'ERROR').length}
                </p>
                <p className="text-sm text-gray-600">Errors</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}