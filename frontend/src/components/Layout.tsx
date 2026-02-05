import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { UserRole } from '../types'
import {
  Menu,
  X,
  Home,
  BookOpen,
  Users,
  GraduationCap,
  Calendar,
  Bell,
  Settings,
  LogOut,
  ChevronDown,
  User,
  CreditCard,
  FileText,
  MessageSquare,
  ClipboardCheck,
  Award,
  BarChart3,
  Bot,
  Key,
} from 'lucide-react'
import clsx from 'clsx'

interface NavItem {
  name: string
  href: string
  icon: React.ElementType
  roles?: UserRole[]
}

const navigation: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Courses', href: '/courses', icon: BookOpen },
  { name: 'Teachers', href: '/teachers', icon: GraduationCap, roles: [UserRole.ADMIN, UserRole.LANGUAGE_SCHOOL] },
  { name: 'Students', href: '/students', icon: Users, roles: [UserRole.ADMIN, UserRole.LANGUAGE_SCHOOL] },
  { name: 'Lessons', href: '/lessons', icon: Calendar },
  { name: 'Assessment', href: '/assessment', icon: ClipboardCheck, roles: [UserRole.STUDENT] },
  { name: 'Certificates', href: '/certificates', icon: Award, roles: [UserRole.STUDENT] },
  { name: 'AI Chat', href: '/chat', icon: Bot, roles: [UserRole.STUDENT] },
  { name: 'Analytics', href: '/analytics', icon: BarChart3, roles: [UserRole.ADMIN, UserRole.LANGUAGE_SCHOOL] },
  { name: 'API Keys', href: '/api-keys', icon: Key, roles: [UserRole.ADMIN, UserRole.LANGUAGE_SCHOOL] },
  { name: 'Feedback', href: '/feedback', icon: MessageSquare, roles: [UserRole.TEACHER, UserRole.STUDENT] },
  { name: 'Payments', href: '/payments', icon: CreditCard, roles: [UserRole.ADMIN, UserRole.LANGUAGE_SCHOOL] },
  { name: 'Reports', href: '/reports', icon: FileText, roles: [UserRole.ADMIN, UserRole.LANGUAGE_SCHOOL] },
]

export function Layout({ children }: { children: React.ReactNode }) {
  const { user, logout, isAdmin, isSchool, isTeacher, isStudent } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const filteredNavigation = navigation.filter((item) => {
    if (!item.roles) return true
    return item.roles.includes(user?.role as UserRole)
  })

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const getRoleBadge = () => {
    if (isAdmin) return { text: 'Admin', color: 'bg-red-100 text-red-800' }
    if (isSchool) return { text: 'School', color: 'bg-blue-100 text-blue-800' }
    if (isTeacher) return { text: 'Teacher', color: 'bg-green-100 text-green-800' }
    if (isStudent) return { text: 'Student', color: 'bg-purple-100 text-purple-800' }
    return { text: 'User', color: 'bg-gray-100 text-gray-800' }
  }

  const roleBadge = getRoleBadge()

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar */}
      <div
        className={clsx(
          'fixed inset-0 z-40 lg:hidden',
          sidebarOpen ? 'block' : 'hidden'
        )}
      >
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75"
          onClick={() => setSidebarOpen(false)}
        />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white">
          <div className="flex h-16 items-center justify-between px-4 border-b">
            <Link to="/dashboard" className="flex items-center">
              <img src="/logo.svg" alt="Maka Language Centre" className="h-8 w-8" />
              <span className="ml-2 text-lg font-bold text-gray-900">
                MAKA LANGUAGE CENTRE
              </span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto p-4">
            {filteredNavigation.map((item) => {
              const isActive = location.pathname === item.href || (item.href === '/dashboard' && location.pathname === '/')
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={clsx(
                    'flex items-center px-4 py-3 mb-1 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  )}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow border-r border-gray-200 bg-white">
          <div className="flex h-16 items-center px-4 border-b">
            <Link to="/dashboard" className="flex items-center">
              <img src="/logo.svg" alt="Maka Language Centre" className="h-8 w-8" />
              <span className="ml-2 text-lg font-bold text-gray-900">
                MAKA LANGUAGE CENTRE
              </span>
            </Link>
          </div>
          <nav className="flex-1 overflow-y-auto p-4">
            {filteredNavigation.map((item) => {
              const isActive = location.pathname === item.href || (item.href === '/dashboard' && location.pathname === '/')
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={clsx(
                    'flex items-center px-4 py-3 mb-1 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  )}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top header */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <Menu className="h-6 w-6" />
            </button>

            <div className="flex items-center gap-4">
              {/* Notifications */}
              <Link
                to="/notifications"
                className="relative p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
              >
                <Bell className="h-6 w-6" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
              </Link>

              {/* User menu */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100"
                >
                  <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary-600" />
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-gray-900">
                      {user?.name}
                    </p>
                    <span
                      className={clsx(
                        'inline-flex text-xs px-2 py-0.5 rounded-full',
                        roleBadge.color
                      )}
                    >
                      {roleBadge.text}
                    </span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </button>

                {userMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0"
                      onClick={() => setUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                      <Link
                        to="/profile"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </Link>
                      <Link
                        to="/settings"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </Link>
                      <hr className="my-1" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
