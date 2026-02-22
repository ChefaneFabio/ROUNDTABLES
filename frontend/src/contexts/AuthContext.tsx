import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { User, UserRole, School, Teacher, Student, OrgAdmin, RegisterOrganizationRequest } from '../types'
import { authApi, clearTokens, getAccessToken } from '../services/api'

interface AuthContextType {
  user: User | null
  profile: School | Teacher | Student | OrgAdmin | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  register: (data: {
    email: string
    password: string
    name: string
    phone?: string
    company?: string
  }) => Promise<void>
  registerOrganization: (data: RegisterOrganizationRequest) => Promise<void>
  refreshUser: () => Promise<void>
  hasRole: (...roles: UserRole[]) => boolean
  isAdmin: boolean
  isTeacher: boolean
  isStudent: boolean
  isOrgAdmin: boolean
  organizationId: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<School | Teacher | Student | OrgAdmin | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchUser = useCallback(async () => {
    const token = getAccessToken()
    if (!token) {
      setIsLoading(false)
      return
    }

    try {
      const userData = await authApi.getMe()
      setUser(userData)
      // Set the appropriate profile based on role
      if (userData.schoolProfile) setProfile(userData.schoolProfile)
      else if (userData.teacherProfile) setProfile(userData.teacherProfile)
      else if (userData.studentProfile) setProfile(userData.studentProfile)
      else if (userData.orgAdminProfile) setProfile(userData.orgAdminProfile)
    } catch (error) {
      console.error('Failed to fetch user:', error)
      clearTokens()
      setUser(null)
      setProfile(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  const login = async (email: string, password: string) => {
    const response = await authApi.login(email, password)
    setUser(response.user)
    setProfile(response.profile)
  }

  const logout = async () => {
    try {
      await authApi.logout()
    } finally {
      setUser(null)
      setProfile(null)
    }
  }

  const register = async (data: {
    email: string
    password: string
    name: string
    phone?: string
    company?: string
  }) => {
    // Register as a student under Maka Learning Management Centre
    const response = await authApi.registerStudent({
      email: data.email,
      password: data.password,
      name: data.name,
      schoolId: 'maka-language-centre', // Maka LMC's school ID
      bio: data.company ? `Company: ${data.company}` : undefined,
    })
    setUser(response.user)
    setProfile(response.profile)
  }

  const registerOrganization = async (data: RegisterOrganizationRequest) => {
    const response = await authApi.registerOrganization(data)
    setUser(response.user)
    if (response.user.orgAdminProfile) setProfile(response.user.orgAdminProfile)
  }

  const refreshUser = async () => {
    await fetchUser()
  }

  const hasRole = (...roles: UserRole[]) => {
    if (!user) return false
    return roles.includes(user.role)
  }

  const orgAdminProfile = user?.role === UserRole.ORG_ADMIN ? (profile as OrgAdmin | null) : null

  const value: AuthContextType = {
    user,
    profile,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    register,
    registerOrganization,
    refreshUser,
    hasRole,
    isAdmin: user?.role === UserRole.ADMIN,
    isTeacher: user?.role === UserRole.TEACHER,
    isStudent: user?.role === UserRole.STUDENT,
    isOrgAdmin: user?.role === UserRole.ORG_ADMIN,
    organizationId: orgAdminProfile?.organizationId || null,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
