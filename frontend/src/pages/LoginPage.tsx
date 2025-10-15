import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

type UserRole = 'ADMIN' | 'COORDINATOR' | 'TRAINER'

export function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await login(email, password)

      // Get user data from localStorage to check role
      const userData = localStorage.getItem('auth_user')
      if (userData) {
        const user = JSON.parse(userData)

        // Validate that selected role matches actual user role
        // COORDINATOR tab accepts both ADMIN and COORDINATOR roles
        // TRAINER tab only accepts TRAINER role
        const isRoleValid =
          (selectedRole === 'COORDINATOR' && (user.role === 'COORDINATOR' || user.role === 'ADMIN')) ||
          (selectedRole === 'TRAINER' && user.role === 'TRAINER')

        if (!isRoleValid) {
          // Role mismatch - logout and show error
          localStorage.removeItem('auth_token')
          localStorage.removeItem('auth_user')
          setError(`Login Failed: These credentials are for a ${user.role.toLowerCase()}, not a ${selectedRole?.toLowerCase() || 'selected role'}.`)
          setIsLoading(false)
          return
        }

        // Redirect based on role
        if (user.role === 'TRAINER') {
          navigate('/trainer/profile')
        } else {
          navigate('/dashboard')
        }
      } else {
        navigate('/dashboard')
      }
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.')
    } finally {
      setIsLoading(false)
    }
  }

  // Show learner info page
  const [showLearnerInfo, setShowLearnerInfo] = useState(false)

  if (showLearnerInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-6">
              <div className="w-20 h-20 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Learner!</h2>
              <p className="text-gray-600">Access your roundtable materials via email</p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">📧 How to Access</h3>
              <ul className="text-sm text-blue-800 space-y-2">
                <li>• Check your email for voting invitations</li>
                <li>• Click the secure link to vote on topics</li>
                <li>• Receive session questions via email</li>
                <li>• Get feedback after each session</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600">
                <strong>Note:</strong> Learners don't need to login. All materials and voting links are sent directly to your email address.
              </p>
            </div>

            <button
              onClick={() => setShowLearnerInfo(false)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    )
  }

  // If no role selected, show role selection
  if (!selectedRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Maka Roundtables</h1>
            <p className="text-gray-600">Select your role to continue</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Coordinator/Admin Card */}
            <button
              onClick={() => setSelectedRole('COORDINATOR')}
              className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-200 hover:scale-105 text-center group"
            >
              <div className="w-20 h-20 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Coordinator</h3>
              <p className="text-sm text-gray-600 mb-1">Manage roundtables, approve content, monitor progress</p>
              <p className="text-xs text-gray-500 italic">(Includes Administrator access)</p>
            </button>

            {/* Trainer Card */}
            <button
              onClick={() => setSelectedRole('TRAINER')}
              className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-200 hover:scale-105 text-center group"
            >
              <div className="w-20 h-20 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Trainer</h3>
              <p className="text-sm text-gray-600">Submit questions, provide feedback, conduct sessions</p>
            </button>

            {/* Learner Card */}
            <button
              onClick={() => setShowLearnerInfo(true)}
              className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-200 hover:scale-105 text-center group"
            >
              <div className="w-20 h-20 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center group-hover:bg-orange-200 transition">
                <svg className="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Learner</h3>
              <p className="text-sm text-gray-600">Participate in roundtables, vote on topics, receive materials</p>
            </button>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-gray-600">
              © 2025 Maka Italia. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Get role display info
  const getRoleInfo = () => {
    switch (selectedRole) {
      case 'ADMIN':
        return { name: 'Administrator', color: 'purple', icon: '⚙️' }
      case 'COORDINATOR':
        return { name: 'Coordinator', color: 'blue', icon: '✓' }
      case 'TRAINER':
        return { name: 'Trainer', color: 'green', icon: '📚' }
      default:
        return { name: '', color: 'gray', icon: '' }
    }
  }

  const roleInfo = getRoleInfo()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Back Button */}
          <button
            onClick={() => setSelectedRole(null)}
            className="mb-4 text-gray-600 hover:text-gray-900 flex items-center text-sm"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Change role
          </button>

          {/* Logo/Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Maka Roundtables</h1>
            <div className={`inline-flex items-center px-4 py-2 rounded-full bg-${roleInfo.color}-100 text-${roleInfo.color}-800 text-sm font-medium mb-2`}>
              <span className="mr-2">{roleInfo.icon}</span>
              {roleInfo.name} Login
            </div>
            <p className="text-gray-600 text-sm">Enter your credentials</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="admin@makaitalia.com"
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Enter your password"
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Help Text */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Default admin credentials:
            </p>
            <p className="text-xs text-gray-500 mt-1">
              admin@makaitalia.com / Admin123!
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            © 2025 Maka Italia. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}
