"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createRequisicaoSenha } from "@/lib/apiCalls/requisicao-senha"

export function useContentForgotPassword() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    try {
      setIsSubmitting(true)

      const { id } = await createRequisicaoSenha({ email })

      const query = new URLSearchParams({
        id,
        email,
      })

      router.push(`/forgot-password/verify-code?${query}`)
    } catch (error) {
      console.error("Erro ao criar requisição de senha", error)
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
