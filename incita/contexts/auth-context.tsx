'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { Usuario } from '../api/usuario/types'
import { jwtDecode } from 'jwt-decode'
import { toast } from 'react-toastify'

interface AuthContextType {
  isLoggedIn: boolean
  isLoading: boolean
  userData: Usuario | null // Adicionei o userData ao tipo do contexto
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  isLoading: true,
  userData: null,
  login: () => {},
  logout: () => {}
})

function defineUserData(token: string): Usuario | null {
  try {
    const payload: Usuario = jwtDecode(token)
    return payload
  } catch (e) {
    console.error("Erro ao decodificar o token:", e);
    toast.error('Sessão inválida. Por favor, faça login novamente.')
    return null
  }
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [userData, setUserData] = useState<Usuario | null>(null)

  useEffect(() => {
    try {
      const token = localStorage.getItem('userToken')
      if (token) {
        const decodedData = defineUserData(token)
        if (decodedData) {
          setIsLoggedIn(true)
          setUserData(decodedData)
        } else {
          // O token era inválido, então deslogue
          localStorage.removeItem('userToken');
          setIsLoggedIn(false)
          setUserData(null)
        }
      } else {
        setIsLoggedIn(false)
        setUserData(null)
      }
    } finally {
      setIsLoading(false)
    }
  }, [])

  const login = (token: string) => {
    localStorage.setItem('userToken', token)
    const decodedData = defineUserData(token)
    setUserData(decodedData)
    setIsLoggedIn(true)
  }

  const logout = () => {
    localStorage.removeItem('userToken')
    localStorage.removeItem('userProfile')
    setUserData(null)
    setIsLoggedIn(false)
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, userData, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)