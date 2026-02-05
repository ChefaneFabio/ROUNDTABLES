import { useQuery, useMutation, useQueryClient } from 'react-query'
import {
  dashboardApi,
  coursesApi,
  lessonsApi,
  teachersApi,
  studentsApi,
  enrollmentsApi,
  feedbackApi,
  questionsApi,
  notificationsApi,
} from '../services/api'

// Dashboard hooks
export function useDashboard() {
  return useQuery('dashboard', dashboardApi.getDashboard)
}

export function useActivity(limit = 20) {
  return useQuery(['activity', limit], () => dashboardApi.getActivity(limit))
}

// Course hooks
export function useCourses(params?: { page?: number; limit?: number; status?: string }) {
  return useQuery(['courses', params], () => coursesApi.getAll(params), {
    keepPreviousData: true,
  })
}

export function useCourse(id: string) {
  return useQuery(['course', id], () => coursesApi.getById(id), {
    enabled: !!id,
  })
}

export function useCreateCourse() {
  const queryClient = useQueryClient()
  return useMutation(coursesApi.create, {
    onSuccess: () => {
      queryClient.invalidateQueries('courses')
    },
  })
}

export function useUpdateCourse() {
  const queryClient = useQueryClient()
  return useMutation(
    ({ id, data }: { id: string; data: any }) => coursesApi.update(id, data),
    {
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries(['course', variables.id])
        queryClient.invalidateQueries('courses')
      },
    }
  )
}

export function useDeleteCourse() {
  const queryClient = useQueryClient()
  return useMutation(coursesApi.delete, {
    onSuccess: () => {
      queryClient.invalidateQueries('courses')
    },
  })
}

export function useUpdateCourseStatus() {
  const queryClient = useQueryClient()
  return useMutation(
    ({ id, status }: { id: string; status: string }) =>
      coursesApi.updateStatus(id, status),
    {
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries(['course', variables.id])
        queryClient.invalidateQueries('courses')
      },
    }
  )
}

export function useScheduleLessons() {
  const queryClient = useQueryClient()
  return useMutation(
    ({ courseId, data }: { courseId: string; data: any }) =>
      coursesApi.scheduleLessons(courseId, data),
    {
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries(['course', variables.courseId])
        queryClient.invalidateQueries('lessons')
      },
    }
  )
}

// Lesson hooks
export function useLessons(params?: {
  page?: number
  limit?: number
  status?: string
  teacherId?: string
  courseId?: string
}) {
  return useQuery(['lessons', params], () => lessonsApi.getAll(params), {
    keepPreviousData: true,
  })
}

export function useLesson(id: string) {
  return useQuery(['lesson', id], () => lessonsApi.getById(id), {
    enabled: !!id,
  })
}

export function useUpdateLesson() {
  const queryClient = useQueryClient()
  return useMutation(
    ({ id, data }: { id: string; data: any }) => lessonsApi.update(id, data),
    {
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries(['lesson', variables.id])
        queryClient.invalidateQueries('lessons')
      },
    }
  )
}

export function useUpdateLessonStatus() {
  const queryClient = useQueryClient()
  return useMutation(
    ({ id, status }: { id: string; status: string }) =>
      lessonsApi.updateStatus(id, status),
    {
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries(['lesson', variables.id])
        queryClient.invalidateQueries('lessons')
      },
    }
  )
}

export function useRecordAttendance() {
  const queryClient = useQueryClient()
  return useMutation(
    ({ lessonId, data }: { lessonId: string; data: any }) =>
      lessonsApi.recordAttendance(lessonId, data),
    {
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries(['lesson', variables.lessonId])
      },
    }
  )
}

// Teacher hooks
export function useTeachers(params?: { page?: number; limit?: number }) {
  return useQuery(['teachers', params], () => teachersApi.getAll(params), {
    keepPreviousData: true,
  })
}

export function useTeacher(id: string) {
  return useQuery(['teacher', id], () => teachersApi.getById(id), {
    enabled: !!id,
  })
}

// Student hooks
export function useStudents(params?: { page?: number; limit?: number }) {
  return useQuery(['students', params], () => studentsApi.getAll(params), {
    keepPreviousData: true,
  })
}

export function useStudent(id: string) {
  return useQuery(['student', id], () => studentsApi.getById(id), {
    enabled: !!id,
  })
}

// Enrollment hooks
export function useCreateEnrollment() {
  const queryClient = useQueryClient()
  return useMutation(enrollmentsApi.create, {
    onSuccess: () => {
      queryClient.invalidateQueries('courses')
      queryClient.invalidateQueries('students')
    },
  })
}

export function useBulkEnrollment() {
  const queryClient = useQueryClient()
  return useMutation(enrollmentsApi.bulkCreate, {
    onSuccess: () => {
      queryClient.invalidateQueries('courses')
      queryClient.invalidateQueries('students')
    },
  })
}

// Feedback hooks
export function useCreateFeedback() {
  const queryClient = useQueryClient()
  return useMutation(feedbackApi.create, {
    onSuccess: () => {
      queryClient.invalidateQueries('lessons')
      queryClient.invalidateQueries('dashboard')
    },
  })
}

export function useApproveFeedback() {
  const queryClient = useQueryClient()
  return useMutation(feedbackApi.approve, {
    onSuccess: () => {
      queryClient.invalidateQueries('lessons')
      queryClient.invalidateQueries('dashboard')
    },
  })
}

export function useSendFeedback() {
  const queryClient = useQueryClient()
  return useMutation(feedbackApi.send, {
    onSuccess: () => {
      queryClient.invalidateQueries('lessons')
      queryClient.invalidateQueries('dashboard')
    },
  })
}

// Question hooks
export function useCreateQuestion() {
  const queryClient = useQueryClient()
  return useMutation(questionsApi.create, {
    onSuccess: () => {
      queryClient.invalidateQueries('lessons')
      queryClient.invalidateQueries('dashboard')
    },
  })
}

export function useApproveQuestion() {
  const queryClient = useQueryClient()
  return useMutation(questionsApi.approve, {
    onSuccess: () => {
      queryClient.invalidateQueries('lessons')
      queryClient.invalidateQueries('dashboard')
    },
  })
}

// Notification hooks
export function useNotifications(params?: {
  page?: number
  limit?: number
  unreadOnly?: boolean
}) {
  return useQuery(
    ['notifications', params],
    () => notificationsApi.getMyNotifications(params),
    { keepPreviousData: true }
  )
}

export function useUnreadCount() {
  return useQuery('unreadCount', notificationsApi.getUnreadCount, {
    refetchInterval: 30000, // Refetch every 30 seconds
  })
}

export function useMarkAsRead() {
  const queryClient = useQueryClient()
  return useMutation(notificationsApi.markAsRead, {
    onSuccess: () => {
      queryClient.invalidateQueries('notifications')
      queryClient.invalidateQueries('unreadCount')
    },
  })
}

export function useMarkAllAsRead() {
  const queryClient = useQueryClient()
  return useMutation(notificationsApi.markAllAsRead, {
    onSuccess: () => {
      queryClient.invalidateQueries('notifications')
      queryClient.invalidateQueries('unreadCount')
    },
  })
}
