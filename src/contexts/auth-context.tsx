'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { getMe, logout as apiLogout } from '../apiCalls/auth' // Importa as novas funções
import apiClient from '../apiCalls/api-client' // Importa o apiClient para limpar o cache
import { UserLoginBody, UserLoginResponse } from '@/apiCalls/auth/types'

interface AuthContextType {
  isLoggedIn: boolean
  isLoading: boolean
  userData: UserLoginResponse | null
  login: (user: UserLoginResponse) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  isLoading: true,
  userData: null,
  login: () => {},
  logout: () => {}
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [userData, setUserData] = useState<UserLoginResponse | null>(null)

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const data = await getMe()
        if (data) {
          setIsLoggedIn(true)
          setUserData(data)
        } else {
          setIsLoggedIn(false)
          setUserData(null)
        }
      } catch (error) {
        setIsLoggedIn(false)
        setUserData(null)
      } finally {
        setIsLoading(false)
      }
    }

    checkUserSession()

    // Adiciona um listener para o evento de sessão expirada (disparado pelo api-client)
    const handleSessionExpired = () => {
      // toast.error('Sua sessão expirou. Por favor, faça login novamente.')
      logout()
    }

    window.addEventListener('auth:sessionExpired', handleSessionExpired)

    return () => {
      window.removeEventListener('auth:sessionExpired', handleSessionExpired)
    }
  }, [])

  const login = (user: UserLoginResponse) => {
    setUserData(user)
    setIsLoggedIn(true)
  }

  const logout = async () => {
    try {
      await apiLogout()
    } catch (error) {
      console.error('Erro ao fazer logout na API:', error)
    } finally {
      // desloga o usuario mesmo com erro na API
      setUserData(null)
      setIsLoggedIn(false)

      // Limpa qualquer item legado do localStorage
      localStorage.removeItem('userToken')
      localStorage.removeItem('userProfile')
      localStorage.removeItem('repertorios')

      if (apiClient.storage.clear) await apiClient.storage.clear()
    }
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, userData, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)