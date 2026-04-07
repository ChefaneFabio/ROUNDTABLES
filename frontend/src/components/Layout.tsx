import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import { useAuth } from '../contexts/AuthContext'
import { notificationsApi } from '../services/api'
import { UserRole } from '../types'
import {
  Menu, X, Home, BookOpen, Users, GraduationCap, Calendar, Bell,
  Settings, LogOut, ChevronDown, ChevronRight, User, CreditCard,
  FileText, MessageSquare, ClipboardCheck, Award, BarChart3,
  Key, Video, PenTool, Mic, Building2, Ticket, Clock, Route,
  Timer, DollarSign, Zap, Layers, Wallet
} from 'lucide-react'
import clsx from 'clsx'

interface NavItem {
  name: string
  href: string
  icon: React.ElementType
  roles?: UserRole[]
}

interface NavGroup {
  title: string
  icon: React.ElementType
  roles?: UserRole[]
  items: NavItem[]
  defaultOpen?: boolean
}

// Grouped navigation structure
const navGroups: NavGroup[] = [
  // ─── ALL ROLES: Dashboard ───
  {
    title: 'Overview',
    icon: Home,
    defaultOpen: true,
    items: [
      { name: 'Dashboard', href: '/dashboard', icon: Home },
    ]
  },

  // ─── ADMIN: People ───
  {
    title: 'People',
    icon: Users,
    roles: [UserRole.ADMIN],
    defaultOpen: true,
    items: [
      { name: 'Teachers', href: '/teachers', icon: GraduationCap, roles: [UserRole.ADMIN] },
      { name: 'Students', href: '/students', icon: Users, roles: [UserRole.ADMIN] },
      { name: 'Organizations', href: '/admin/organizations', icon: Building2, roles: [UserRole.ADMIN] },
    ]
  },

  // ─── ADMIN + TEACHER: Teaching ───
  {
    title: 'Teaching',
    icon: BookOpen,
    roles: [UserRole.ADMIN, UserRole.TEACHER],
    defaultOpen: true,
    items: [
      { name: 'Courses', href: '/courses', icon: BookOpen, roles: [UserRole.ADMIN, UserRole.TEACHER] },
      { name: 'Lessons', href: '/lessons', icon: Calendar, roles: [UserRole.ADMIN, UserRole.TEACHER] },
      { name: 'Calendar', href: '/admin/calendar', icon: Calendar, roles: [UserRole.ADMIN, UserRole.TEACHER] },
      { name: 'Teacher Availability', href: '/admin/teacher-availability', icon: Clock, roles: [UserRole.ADMIN] },
      { name: 'Feedback', href: '/feedback', icon: MessageSquare, roles: [UserRole.TEACHER] },
    ]
  },

  // ─── TEACHER: My Work ───
  {
    title: 'My Work',
    icon: Timer,
    roles: [UserRole.TEACHER],
    defaultOpen: true,
    items: [
      { name: 'My Calendar', href: '/admin/calendar', icon: Calendar, roles: [UserRole.TEACHER] },
      { name: 'My Hours', href: '/my-hours', icon: Timer, roles: [UserRole.TEACHER] },
      { name: 'My Earnings', href: '/my-earnings', icon: DollarSign, roles: [UserRole.TEACHER] },
      { name: 'My Availability', href: '/availability', icon: Clock, roles: [UserRole.TEACHER] },
    ]
  },

  // ─── ADMIN + TEACHER: Content ───
  {
    title: 'Content',
    icon: Layers,
    roles: [UserRole.ADMIN, UserRole.TEACHER],
    items: [
      { name: 'Videos', href: '/admin/videos/libraries', icon: Video, roles: [UserRole.ADMIN, UserRole.TEACHER] },
      { name: 'Exercises', href: '/admin/exercises', icon: PenTool, roles: [UserRole.ADMIN, UserRole.TEACHER] },
      { name: 'Assessments', href: '/admin/assessments', icon: ClipboardCheck, roles: [UserRole.ADMIN, UserRole.TEACHER] },
      { name: 'Question Bank', href: '/admin/assessment-questions', icon: ClipboardCheck, roles: [UserRole.ADMIN, UserRole.TEACHER] },
    ]
  },

  // ─── ADMIN: Finance ───
  {
    title: 'Finance',
    icon: Wallet,
    roles: [UserRole.ADMIN],
    items: [
      { name: 'Payments', href: '/payments', icon: CreditCard, roles: [UserRole.ADMIN] },
      { name: 'Reports', href: '/reports', icon: FileText, roles: [UserRole.ADMIN] },
      { name: 'Analytics', href: '/analytics', icon: BarChart3, roles: [UserRole.ADMIN] },
    ]
  },

  // ─── ADMIN: Settings ───
  {
    title: 'Settings',
    icon: Settings,
    roles: [UserRole.ADMIN],
    items: [
      { name: 'API Keys', href: '/api-keys', icon: Key, roles: [UserRole.ADMIN] },
      { name: 'Integrations', href: '/admin/integrations', icon: Zap, roles: [UserRole.ADMIN] },
      { name: 'Notifications', href: '/admin/notification-settings', icon: Bell, roles: [UserRole.ADMIN] },
      { name: 'Users', href: '/admin/users', icon: Users, roles: [UserRole.ADMIN] },
      { name: 'Platform', href: '/admin/settings', icon: Settings, roles: [UserRole.ADMIN] },
    ]
  },

  // ─── STUDENT: Learning ───
  {
    title: 'Learning',
    icon: BookOpen,
    roles: [UserRole.STUDENT],
    defaultOpen: true,
    items: [
      { name: 'Courses', href: '/courses', icon: BookOpen, roles: [UserRole.STUDENT] },
      { name: 'Lessons', href: '/lessons', icon: Calendar, roles: [UserRole.STUDENT] },
      { name: 'Learning Paths', href: '/learning-paths', icon: Route, roles: [UserRole.STUDENT] },
      { name: 'My Calendar', href: '/my-calendar', icon: Calendar, roles: [UserRole.STUDENT] },
    ]
  },

  // ─── STUDENT: Practice ───
  {
    title: 'Practice',
    icon: PenTool,
    roles: [UserRole.STUDENT],
    items: [
      { name: 'Assessment', href: '/assessment', icon: ClipboardCheck, roles: [UserRole.STUDENT] },
      { name: 'Exercises', href: '/exercises', icon: PenTool, roles: [UserRole.STUDENT] },
      { name: 'Videos', href: '/videos', icon: Video, roles: [UserRole.STUDENT] },
      { name: 'Speaking', href: '/speaking', icon: Mic, roles: [UserRole.STUDENT] },
      // { name: 'AI Chat', href: '/chat', icon: Bot, roles: [UserRole.STUDENT] }, // Hidden from nav — feature remains in code
    ]
  },

  // ─── STUDENT: Progress ───
  {
    title: 'Progress',
    icon: Award,
    roles: [UserRole.STUDENT],
    items: [
      { name: 'Certificates', href: '/certificates', icon: Award, roles: [UserRole.STUDENT] },
      { name: 'Feedback', href: '/feedback', icon: MessageSquare, roles: [UserRole.STUDENT] },
    ]
  },

  // ─── ORG ADMIN ───
  {
    title: 'Organization',
    icon: Building2,
    roles: [UserRole.ORG_ADMIN],
    defaultOpen: true,
    items: [
      { name: 'Dashboard', href: '/org/dashboard', icon: Home, roles: [UserRole.ORG_ADMIN] },
      { name: 'Employees', href: '/org/employees', icon: Users, roles: [UserRole.ORG_ADMIN] },
      { name: 'Assessments', href: '/org/assessments', icon: ClipboardCheck, roles: [UserRole.ORG_ADMIN] },
      { name: 'Seat Licenses', href: '/org/seats', icon: Ticket, roles: [UserRole.ORG_ADMIN] },
      { name: 'Purchase Seats', href: '/org/purchase', icon: CreditCard, roles: [UserRole.ORG_ADMIN] },
    ]
  },
  {
    title: 'Billing',
    icon: Wallet,
    roles: [UserRole.ORG_ADMIN],
    items: [
      { name: 'Invoices', href: '/org/invoices', icon: FileText, roles: [UserRole.ORG_ADMIN] },
      { name: 'Reports', href: '/org/reports', icon: BarChart3, roles: [UserRole.ORG_ADMIN] },
      { name: 'Settings', href: '/org/settings', icon: Settings, roles: [UserRole.ORG_ADMIN] },
    ]
  },
]

function NavSection({ group, isActive, isTestInProgress, onNavigate }: {
  group: NavGroup
  isActive: (href: string) => boolean
  isTestInProgress: boolean
  onNavigate?: () => void
}) {
  const [open, setOpen] = useState(group.defaultOpen ?? false)
  const hasActiveItem = group.items.some(item => isActive(item.href))

  // Auto-open if an item is active
  React.useEffect(() => {
    if (hasActiveItem) setOpen(true)
  }, [hasActiveItem])

  return (
    <div className="mb-1">
      <button
        onClick={() => setOpen(!open)}
        className={clsx(
          'w-full flex items-center justify-between px-3 py-2 rounded-lg text-[11px] font-bold uppercase tracking-widest transition-colors',
          hasActiveItem ? 'text-gray-700 bg-gray-100/60' : 'text-gray-400 hover:text-gray-700 hover:bg-gray-50'
        )}
      >
        <div className="flex items-center gap-2">
          <group.icon className="h-4 w-4" />
          {group.title}
        </div>
        <ChevronRight className={clsx('h-3.5 w-3.5 transition-transform', open && 'rotate-90')} />
      </button>

      {open && (
        <div className="mt-0.5 ml-2 space-y-0.5">
          {group.items.map(item => {
            const active = isActive(item.href)
            const disabled = isTestInProgress && !active
            return (
              <Link
                key={item.href}
                to={disabled ? '#' : item.href}
                onClick={(e) => {
                  if (disabled) { e.preventDefault(); return }
                  onNavigate?.()
                }}
                className={clsx(
                  'flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative',
                  disabled
                    ? 'text-gray-300 cursor-not-allowed'
                    : active
                    ? 'bg-gray-100 text-gray-900 border-l-[3px] border-gray-500 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-l-[3px] border-transparent hover:border-gray-300'
                )}
              >
                <item.icon className="h-4 w-4 flex-shrink-0" />
                {item.name}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { user, logout, isAdmin, isTeacher, isStudent } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const isTestInProgress = location.pathname.startsWith('/assessment/take/')

  const { data: unreadCount = 0 } = useQuery(
    'notifications-unread-count',
    () => notificationsApi.getUnreadCount(),
    { enabled: !isTestInProgress, refetchInterval: 60000, staleTime: 30000 }
  )

  const isActive = (href: string) =>
    location.pathname === href || (href === '/dashboard' && location.pathname === '/')

  // Filter groups by user role
  const visibleGroups = navGroups.filter(group => {
    if (!group.roles) return true
    return group.roles.includes(user?.role as UserRole)
  }).map(group => ({
    ...group,
    items: group.items.filter(item => {
      if (!item.roles) return true
      return item.roles.includes(user?.role as UserRole)
    })
  })).filter(group => group.items.length > 0)

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const getRoleBadge = () => {
    if (isAdmin) return { text: 'Admin', color: 'bg-red-100 text-red-800' }
    if (isTeacher) return { text: 'Teacher', color: 'bg-green-100 text-green-800' }
    if (isStudent) return { text: 'Student', color: 'bg-purple-100 text-purple-800' }
    if (user?.role === UserRole.ORG_ADMIN) return { text: 'Org Admin', color: 'bg-blue-100 text-blue-800' }
    return { text: 'User', color: 'bg-gray-100 text-gray-800' }
  }

  const roleBadge = getRoleBadge()

  const sidebarContent = (
    <>
      <div className="flex h-16 items-center px-4 border-b border-gray-700 bg-gradient-to-r from-gray-900 to-gray-800">
        <Link to="/dashboard" className="flex items-center gap-3">
          <img src="/favicon.webp" alt="Maka" className="h-9 w-9 rounded-xl shadow-lg shadow-gray-900/30" />
          <div>
            <span className="text-sm font-bold text-white block leading-tight">MAKA LMS</span>
            <span className="text-[10px] text-gray-400 leading-tight">Language Consulting</span>
          </div>
        </Link>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5">
        {visibleGroups.map(group => (
          <NavSection
            key={group.title}
            group={group}
            isActive={isActive}
            isTestInProgress={isTestInProgress}
            onNavigate={() => setSidebarOpen(false)}
          />
        ))}
      </nav>
    </>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className={clsx('fixed inset-0 z-40 lg:hidden', sidebarOpen ? 'block' : 'hidden')}>
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white shadow-xl">
          <div className="flex items-center justify-between px-4 h-16 border-b border-gray-700 bg-gradient-to-r from-gray-900 to-gray-800">
            <Link to="/dashboard" className="flex items-center gap-3">
              <img src="/favicon.webp" alt="Maka" className="h-9 w-9 rounded-xl shadow-lg shadow-gray-900/30" />
              <span className="text-sm font-bold text-white">MAKA LMS</span>
            </Link>
            <button onClick={() => setSidebarOpen(false)} className="p-1 rounded-lg hover:bg-gray-700">
              <X className="h-5 w-5 text-gray-300" />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5">
            {visibleGroups.map(group => (
              <NavSection
                key={group.title}
                group={group}
                isActive={isActive}
                isTestInProgress={isTestInProgress}
                onNavigate={() => setSidebarOpen(false)}
              />
            ))}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-60 lg:flex-col">
        <div className="flex flex-col flex-grow border-r border-gray-200 bg-white">
          {sidebarContent}
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-60">
        {/* Top header */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
          <div className="flex h-14 items-center justify-between px-4 sm:px-6">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100">
              <Menu className="h-5 w-5 text-gray-600" />
            </button>

            <div className="flex-1" />

            <div className="flex items-center gap-2">
              {/* Notifications */}
              {isTestInProgress ? (
                <span className="p-2 text-gray-300 cursor-not-allowed"><Bell className="h-5 w-5" /></span>
              ) : (
                <Link to="/notifications" className="relative p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100">
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-white bg-red-500 rounded-full leading-none">
                      {unreadCount > 99 ? '99+' : unreadCount}
                    </span>
                  )}
                </Link>
              )}

              {/* User menu */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100"
                >
                  <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary-700">
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </span>
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-gray-900 leading-tight">{user?.name}</p>
                    <span className={clsx('inline-flex text-[10px] px-1.5 py-0.5 rounded-full font-medium', roleBadge.color)}>
                      {roleBadge.text}
                    </span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-400 hidden sm:block" />
                </button>

                {userMenuOpen && (
                  <>
                    <div className="fixed inset-0" onClick={() => setUserMenuOpen(false)} />
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-50">
                      <Link to="/profile" onClick={() => setUserMenuOpen(false)}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        <User className="h-4 w-4 mr-2.5 text-gray-400" /> Profile
                      </Link>
                      <Link to="/settings" onClick={() => setUserMenuOpen(false)}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        <Settings className="h-4 w-4 mr-2.5 text-gray-400" /> Settings
                      </Link>
                      <hr className="my-1" />
                      {isTestInProgress ? (
                        <span className="flex items-center px-4 py-2 text-sm text-gray-300 cursor-not-allowed">
                          <LogOut className="h-4 w-4 mr-2.5" /> Logout
                        </span>
                      ) : (
                        <button onClick={handleLogout}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                          <LogOut className="h-4 w-4 mr-2.5" /> Logout
                        </button>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 sm:p-6">{children}</main>
      </div>
    </div>
  )
}
