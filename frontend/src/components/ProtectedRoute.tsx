import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { AppLayout } from './AppLayout'

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: ('ADMIN' | 'COORDINATOR' | 'TRAINER')[]
  useLayout?: boolean
}

export function ProtectedRoute({ children, allowedRoles, useLayout = true }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // Role-based access control
  if (allowedRoles && user) {
    const hasAccess = allowedRoles.includes(user.role as any)

    if (!hasAccess) {
      // Redirect trainers to their portal, coordinators to dashboard
      if (user.role === 'TRAINER') {
        return <Navigate to="/trainer/profile" replace />
      } else {
        return <Navigate to="/dashboard" replace />
      }
    }
  }

  // TrainerProfilePage has its own layout, so skip AppLayout
  if (!useLayout) {
    return <>{children}</>
  }

  return <AppLayout>{children}</AppLayout>
}
