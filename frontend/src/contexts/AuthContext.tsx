import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { User, UserRole, School, Teacher, Student } from '../types'
import { authApi, clearTokens, getAccessToken } from '../services/api'

interface AuthContextType {
  user: User | null
  profile: School | Teacher | Student | null
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
  refreshUser: () => Promise<void>
  hasRole: (...roles: UserRole[]) => boolean
  isAdmin: boolean
  isTeacher: boolean
  isStudent: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<School | Teacher | Student | null>(null)
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
    // Register as a student under MAKA Language Centre
    const response = await authApi.registerStudent({
      email: data.email,
      password: data.password,
      name: data.name,
      schoolId: 'maka-language-centre', // MAKA's school ID
      bio: data.company ? `Company: ${data.company}` : undefined,
    })
    setUser(response.user)
    setProfile(response.profile)
  }

  const refreshUser = async () => {
    await fetchUser()
  }

  const hasRole = (...roles: UserRole[]) => {
    if (!user) return false
    return roles.includes(user.role)
  }

  const value: AuthContextType = {
    user,
    profile,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    register,
    refreshUser,
    hasRole,
    isAdmin: user?.role === UserRole.ADMIN,
    isTeacher: user?.role === UserRole.TEACHER,
    isStudent: user?.role === UserRole.STUDENT,
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
