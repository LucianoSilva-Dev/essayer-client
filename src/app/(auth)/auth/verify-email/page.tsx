'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { authClient } from '@/lib/betterAuth/auth-client'
import { toast } from 'react-toastify'

export default function VerifyEmailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')

  useEffect(() => {
    if (!token) {
      setStatus('error')
      toast.error("Link inválido.")
      return
    }

    const verify = async () => {
      try {
        const { error } = await authClient.verifyEmail({
          query: {
            token: token
          }
        })

        if (error) {
          setStatus('error')
          toast.error("Erro ao verificar e-mail: " + error.message)
        } else {
          setStatus('success')
          toast.success("E-mail verificado com sucesso!")
          setTimeout(() => {
            router.push('/login')
          }, 2000)
        }
      } catch (err) {
        setStatus('error')
        console.error(err)
      }
    }

    verify()
  }, [token, router])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4">Verificação de E-mail</h1>
        
        {status === 'loading' && <p>Verificando seu token...</p>}
        
        {status === 'success' && (
          <div className="text-green-600">
            <p className="mb-2">Sucesso! Seu e-mail foi confirmado.</p>
            <p className="text-sm text-gray-500">Redirecionando...</p>
          </div>
        )}
        
        {status === 'error' && (
          <div className="text-red-600">
            <p>Falha na verificação. O link pode ter expirado ou ser inválido.</p>
            <button 
              onClick={() => router.push('/login')}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Voltar para Login
            </button>
          </div>
        )}
      </div>
    </div>
  )
}