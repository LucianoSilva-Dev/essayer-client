"use client"

import { useEffect, useRef, useState } from "react"
import { redirect, useRouter, useSearchParams } from "next/navigation"
import {
  createRequisicaoSenha,
  validateRequisicaoSenha,
} from "@/lib/apiCalls/requisicao-senha"

export function useContentVerifyCode() {
  const [code, setCode] = useState(["", "", "", "", "", "", "", ""])
  const [isResending, setIsResending] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const router = useRouter()
  const searchParams = useSearchParams()

  const id = searchParams.get("id")
  const email = searchParams.get("email")

  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const fullCode = code.join("")
    if (fullCode.length !== 8 || !id) return

    setIsSubmitting(true)
    try {
      await validateRequisicaoSenha(id, { codigo: fullCode })
      router.push(`/forgot-password/reset-password?id=${id}`)
    } catch (error) {
      console.error("Erro ao validar código", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  function handleCodeChange(index: number, value: string) {
    const sanitizedValue = value.replace(/[^A-Za-z0-9+/]/g, "")

    if (sanitizedValue.length <= 1) {
      const newCode = [...code]
      newCode[index] = sanitizedValue
      setCode(newCode)

      if (sanitizedValue && index < 7) {
        inputRefs.current[index + 1]?.focus()
      }
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault()

    const pastedData = e.clipboardData
      .getData("text")
      .replace(/[^A-Za-z0-9]/g, "")
      .slice(0, 8)

    if (!pastedData) return

    const newCode = [...code]
    for (let i = 0; i < pastedData.length; i++) {
      newCode[i] = pastedData[i]
    }
    setCode(newCode)

    inputRefs.current[Math.min(pastedData.length, 7)]?.focus()
  }

  async function handleResendCode() {
    setIsResending(true)
    try {
      if (!email) {
        redirect("/forgot-password")
      }
      await createRequisicaoSenha({ email })
    } catch (error) {
      console.error("Erro ao reenviar código", error)
    } finally {
      setIsResending(false)
    }
  }

  const isCodeComplete = code.every((digit) => digit !== "")

  return {
    code,
    email,
    isSubmitting,
    isResending,
    isCodeComplete,
    inputRefs,
    handleSubmit,
    handleCodeChange,
    handleKeyDown,
    handlePaste,
    handleResendCode,
  }
}
