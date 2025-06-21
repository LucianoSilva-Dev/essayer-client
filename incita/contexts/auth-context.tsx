'use client'
import { createContext, useContext, useEffect, useState } from 'react'

interface AuthContextType {
  isLoggedIn: boolean
  isLoading: boolean
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  isLoading: true,
  login: () => {},
  logout: () => {}
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Verifica o token quando o componente for montado ou re-renderizado
  useEffect(() => {
    try {
      const token = localStorage.getItem('userToken')
      setIsLoggedIn(!!token)
    } finally {
      setIsLoading(false)
    }
  }, []) // Só roda quando o componente for montado

  const login = (token: string) => {
    localStorage.setItem('userToken', token)
    setIsLoggedIn(true)
  }

  const logout = () => {
    localStorage.removeItem('userToken')
    setIsLoggedIn(false)
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)