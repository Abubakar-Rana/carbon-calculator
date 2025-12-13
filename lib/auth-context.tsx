'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type AuthUser = {
  role: 'admin' | 'user'
  username: string
}

type AuthContextType = {
  user: AuthUser | null
  isLoading: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check if user is already logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('carbonAuth')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
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

    const authUser = { role: data.role as 'admin' | 'user', username }
    setUser(authUser)
    localStorage.setItem('carbonAuth', JSON.stringify(authUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('carbonAuth')
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, isAuthenticated: !!user }}>
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
