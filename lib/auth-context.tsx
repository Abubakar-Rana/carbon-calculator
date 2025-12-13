'use client'

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react'

type AuthUser = {
  role: 'admin' | 'user'
  username: string
  isFirstLogin?: boolean
}

type AuthContextType = {
  user: AuthUser | null
  isLoading: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
  sessionExpired: boolean
  setSessionExpired: (expired: boolean) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const SESSION_TIMEOUT = 30 * 60 * 1000 // 30 minutes

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [sessionExpired, setSessionExpired] = useState(false)
  let timeoutId: NodeJS.Timeout | null = null

  // Session timeout management
  const resetSessionTimer = useCallback(() => {
    if (timeoutId) clearTimeout(timeoutId)
    
    if (user) {
      timeoutId = setTimeout(() => {
        logout()
        setSessionExpired(true)
      }, SESSION_TIMEOUT)
    }
  }, [user])

  // Track user activity
  useEffect(() => {
    if (!user) return

    resetSessionTimer()

    const handleActivity = () => {
      resetSessionTimer()
    }

    const events = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click']
    events.forEach(event => document.addEventListener(event, handleActivity))

    return () => {
      events.forEach(event => document.removeEventListener(event, handleActivity))
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [user, resetSessionTimer])

  // Check if user is already logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('carbonAuth')
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser)
        setUser(parsed)
      } catch (e) {
        localStorage.removeItem('carbonAuth')
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (username: string, password: string) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })

    const data = await res.json()
    if (!res.ok) {
      throw new Error(data?.error || 'Login failed')
    }

    const authUser = { 
      role: data.role as 'admin' | 'user', 
      username,
      isFirstLogin: data.isFirstLogin || false
    }
    setUser(authUser)
    localStorage.setItem('carbonAuth', JSON.stringify(authUser))
    setSessionExpired(false)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('carbonAuth')
    if (timeoutId) clearTimeout(timeoutId)
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, isAuthenticated: !!user, sessionExpired, setSessionExpired }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
