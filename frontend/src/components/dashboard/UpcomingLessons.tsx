import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { Card, CardHeader, CardBody } from '../common/Card'
import { StatusBadge } from '../common/Badge'

interface Lesson {
  id: string
  title?: string
  lessonNumber: number
  scheduledAt: string
  duration: number
  status: string
  course?: {
    name: string
  }
  teacher?: {
    user?: {
      name: string
    }
  }
  _count?: {
    attendance: number
  }
}

interface UpcomingLessonsProps {
  lessons: Lesson[]
  showCourse?: boolean
  showTeacher?: boolean
}

export function UpcomingLessons({
  lessons,
  showCourse = true,
  showTeacher = false,
}: UpcomingLessonsProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Upcoming Lessons
          </h3>
          <Link
            to="/lessons"
            className="text-sm text-primary-600 hover:text-primary-700 flex items-center"
          >
            View all <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </CardHeader>
      <CardBody className="p-0">
        {lessons.length === 0 ? (
          <div className="px-6 py-8 text-center text-gray-500">
            No upcoming lessons scheduled
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {lessons.map((lesson) => (
              <li key={lesson.id}>
                <Link
                  to={`/lessons/${lesson.id}`}
                  className="block px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {lesson.title || `Lesson ${lesson.lessonNumber}`}
                      </p>
                      {showCourse && lesson.course && (
                        <p className="text-sm text-gray-500 truncate">
                          {lesson.course.name}
                        </p>
                      )}
                      {showTeacher && lesson.teacher?.user && (
                        <p className="text-sm text-gray-500">
                          {lesson.teacher.user.name}
                        </p>
                      )}
                    </div>
                    <StatusBadge status={lesson.status} />
                  </div>
                  <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {format(new Date(lesson.scheduledAt), 'MMM d, yyyy')}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {format(new Date(lesson.scheduledAt), 'HH:mm')}
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-400">{lesson.duration} min</span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </CardBody>
    </Card>
  )
}
