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
    <div className="min-h-screen bg-maka-gray-50">
      {/* Navigation */}
      <nav className="bg-maka-navy shadow-lg sticky top-0 z-50 border-b-4 border-maka-teal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-white">MAKA Roundtables</h1>
              <div className="hidden md:ml-10 md:flex md:items-baseline md:space-x-2">
                {menuItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={`${
                      window.location.pathname === item.path
                        ? 'bg-maka-teal text-white'
                        : 'text-maka-gray-200 hover:bg-maka-darkNavy hover:text-white'
                    } px-3 py-2 rounded-lg text-sm transition-all duration-200`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/roundtables/new')}
                className="bg-maka-teal text-white px-4 py-2 rounded-lg text-sm hover:bg-maka-tealLight flex items-center transition-all duration-200 transform hover:scale-105"
              >
                <Plus className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">New Roundtable</span>
              </button>

              {/* User Info & Logout */}
              <div className="flex items-center space-x-3 border-l border-maka-darkNavy pl-4">
                <div className="hidden sm:flex items-center space-x-2">
                  <div className="bg-maka-teal p-2 rounded-full">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-white">{user?.name || user?.email}</p>
                    <p className="text-xs text-maka-gray-300">{user?.role}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-maka-gray-200 hover:text-red-400 hover:bg-maka-darkNavy p-2 rounded-lg transition-all duration-200"
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
