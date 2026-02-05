import React from 'react'
import { format, formatDistanceToNow } from 'date-fns'
import {
  Bell,
  BookOpen,
  Users,
  GraduationCap,
  CreditCard,
  MessageSquare,
  Calendar,
} from 'lucide-react'
import { Card, CardHeader, CardBody } from '../common/Card'
import clsx from 'clsx'

interface Activity {
  id: string
  type: string
  subject: string
  sentAt?: string
  readAt?: string
}

interface RecentActivityProps {
  activities: Activity[]
}

const activityIcons: Record<string, React.ElementType> = {
  TEACHER_REMINDER: GraduationCap,
  QUESTIONS_REQUEST: MessageSquare,
  FEEDBACK_REQUEST: MessageSquare,
  ENROLLMENT_CONFIRMED: Users,
  LESSON_REMINDER: Calendar,
  VOTING_INVITE: BookOpen,
  PAYMENT_REMINDER: CreditCard,
  PAYMENT_RECEIVED: CreditCard,
  COURSE_UPDATE: BookOpen,
  GENERAL: Bell,
}

const activityColors: Record<string, string> = {
  TEACHER_REMINDER: 'bg-green-100 text-green-600',
  QUESTIONS_REQUEST: 'bg-blue-100 text-blue-600',
  FEEDBACK_REQUEST: 'bg-purple-100 text-purple-600',
  ENROLLMENT_CONFIRMED: 'bg-primary-100 text-primary-600',
  LESSON_REMINDER: 'bg-yellow-100 text-yellow-600',
  VOTING_INVITE: 'bg-indigo-100 text-indigo-600',
  PAYMENT_REMINDER: 'bg-red-100 text-red-600',
  PAYMENT_RECEIVED: 'bg-green-100 text-green-600',
  COURSE_UPDATE: 'bg-blue-100 text-blue-600',
  GENERAL: 'bg-gray-100 text-gray-600',
}

export function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
      </CardHeader>
      <CardBody className="p-0">
        {activities.length === 0 ? (
          <div className="px-6 py-8 text-center text-gray-500">
            No recent activity
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {activities.map((activity) => {
              const Icon = activityIcons[activity.type] || Bell
              const colorClass = activityColors[activity.type] || 'bg-gray-100 text-gray-600'

              return (
                <li
                  key={activity.id}
                  className={clsx(
                    'px-6 py-4',
                    !activity.readAt && 'bg-primary-50'
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className={clsx('p-2 rounded-full flex-shrink-0', colorClass)}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">{activity.subject}</p>
                      {activity.sentAt && (
                        <p className="text-xs text-gray-500 mt-1">
                          {formatDistanceToNow(new Date(activity.sentAt), {
                            addSuffix: true,
                          })}
                        </p>
                      )}
                    </div>
                    {!activity.readAt && (
                      <span className="h-2 w-2 bg-primary-600 rounded-full flex-shrink-0" />
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </CardBody>
    </Card>
  )
}
