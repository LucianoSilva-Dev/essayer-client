'use client'
import { getMe } from '@/lib/apiCalls/auth'
import { UserLoginResponse } from '@/lib/apiCalls/auth/types'
import apiClient from '@/lib/http/api-client'
import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

interface AuthContextType {
  isLoggedIn: boolean
  isLoading: boolean
  userData: UserLoginResponse | null
  login: (user: UserLoginResponse) => void
  logout: () => void
  refreshToken: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  isLoading: true,
  userData: null,
  login: () => {},
  logout: () => {},
  refreshToken: async () => {},
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [userData, setUserData] = useState<UserLoginResponse | null>(null)

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
      // Se der erro no getMe, não necessariamente queremos deslogar se for apenas erro de rede, 
      // mas aqui mantemos o comportamento original de assumir logout.
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
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
      await apiClient.post('/auth/logout');
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

  const refreshToken = async () => {
    try {
      // Força a atualização do token (cookies)
      await apiClient.post('/auth/refresh')
      // Busca os dados atualizados do usuário (com a nova role, se houver)
      await checkUserSession()
    } catch (error) {
      console.error('Erro ao atualizar token:', error)
    }
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, userData, login, logout, refreshToken }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)