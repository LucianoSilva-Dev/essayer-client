'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { useAuth } from '@/shared/contexts/auth-context'
import { login as apiLogin } from '@/lib/apiCalls/auth'

export function useContentLogin() {
  const { login, isLoading } = useAuth()
  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (isLoading) return
  }, [isLoading])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    try {
      const user = await apiLogin({ email, password })
      login(user)
      toast.success('Login realizado com sucesso!')
      router.push('/home')
    } catch (error) {
      toast.error('Erro ao fazer login. Verifique suas credenciais.')
      console.error(error)
    }
  }

  return {
    state: {
      showPassword,
      email,
      password,
    },
    actions: {
      setShowPassword,
      setEmail,
      setPassword,
      handleSubmit,
    },
  }
}
