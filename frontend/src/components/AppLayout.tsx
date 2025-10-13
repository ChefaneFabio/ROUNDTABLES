import { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOut, User, Plus } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

interface AppLayoutProps {
  children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Roundtables', path: '/roundtables' },
    { name: 'Clients', path: '/clients' },
    { name: 'Participants', path: '/participants' },
    { name: 'Sessions', path: '/sessions' },
    { name: 'Questions', path: '/questions' },
    { name: 'Feedback', path: '/feedback' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Maka Roundtables</h1>
              <div className="hidden md:ml-10 md:flex md:items-baseline md:space-x-4">
                {menuItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={`${
                      window.location.pathname === item.path
                        ? 'text-gray-900 font-medium'
                        : 'text-gray-600 hover:text-gray-900'
                    } px-3 py-2 rounded-md text-sm transition-colors`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/roundtables/new')}
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 flex items-center transition-colors"
              >
                <Plus className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">New Roundtable</span>
              </button>

              {/* User Info & Logout */}
              <div className="flex items-center space-x-3 border-l pl-4">
                <div className="hidden sm:flex items-center space-x-2">
                  <div className="bg-gray-100 p-2 rounded-full">
                    <User className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900">{user?.name || user?.email}</p>
                    <p className="text-xs text-gray-500">{user?.role}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-red-600 hover:bg-red-50 p-2 rounded-md transition-colors"
                  title="Sign out"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      {children}
    </div>
  )
}
