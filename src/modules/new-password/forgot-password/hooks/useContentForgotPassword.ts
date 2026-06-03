"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/betterAuth/auth-client"
import { toast } from "react-toastify"
import axios from "axios"

export function useContentForgotPassword() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    try {
      setIsSubmitting(true)

      const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002"
      await axios.post(`${baseURL}/auth/request-password-reset`, { email })
      toast.success("Enviamos um link de recuperação para o seu email!")
    } catch (error: any) {
      console.error("Erro ao solicitar recuperação de senha", error)
      toast.error(error.response?.data?.message || "Ocorreu um erro inesperado")
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    email,
    setEmail,
    isSubmitting,
    handleSubmit,
  }
}
