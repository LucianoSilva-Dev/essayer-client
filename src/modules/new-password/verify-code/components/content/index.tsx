"use client"
import type React from "react"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { redirect, useRouter, useSearchParams } from "next/navigation"
import { createRequisicaoSenha, validateRequisicaoSenha } from "../../../../../lib/apiCalls/requisicao-senha"
import { motion } from "framer-motion"

export default function VerifyCodeForm() {
  const [code, setCode] = useState(["", "", "", "", "", "", "", ""])
  const [isResending, setIsResending] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const id = searchParams.get('id')
  const email = searchParams.get('email')

  useEffect(() => {
    const firstInput = inputRefs.current[0]
    if (firstInput) {
      firstInput.focus()
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const fullCode = code.join("")

    if (fullCode.length !== 8) {
      return
    }

    setIsSubmitting(true)

    try {
      if (!id) { return }

      await validateRequisicaoSenha(id, { codigo: fullCode })
      router.push(`/forgot-password/reset-password?id=${id}`)
    } catch {
      // Handle error
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCodeChange = (index: number, value: string) => {
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

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').replace(/[^A-Za-z0-9]/g, "").slice(0, 8)

    if (pastedData) {
      const newCode = [...code]
      for (let i = 0; i < pastedData.length && i < 8; i++) {
        newCode[i] = pastedData[i]
      }
      setCode(newCode)

      const nextIndex = Math.min(pastedData.length, 7)
      inputRefs.current[nextIndex]?.focus()
    }
  }

  const handleResendCode = async () => {
    setIsResending(true)
    try {
      if (!email) {
        redirect('/forgot-password')
      }
      await createRequisicaoSenha({ email })
    } catch {
      // Handle error
    } finally {
      setIsResending(false)
    }
  }

  const isCodeComplete = code.every(digit => digit !== "")

  // Variants para animação
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.06,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -18 } as const,
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.42,
        ease: "easeOut",
      } as const,
    },
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="flex-1 flex flex-col md:flex-row px-4 md:px-2 py-6 w-full overflow-x-hidden">
        {/* Lado Esquerdo - Formulário */}
        <motion.div
          className="flex-1 flex flex-col justify-center pl-6 pr-6 md:pl-10 md:pr-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Cabeçalho */}
          <motion.div variants={itemVariants} className="mt-4 md:mt-5">
            <h1 className="text-3xl md:text-4xl font-semibold text-[#282133]">
              Redefinição de senha
            </h1>
            <div className="w-full h-0.5 bg-[#D3D3D3] mb-4 mt-6"></div>
          </motion.div>

          {/* Descrição */}
          <motion.p
            variants={itemVariants}
            className="text-base md:text-[25px] text-[#3C3C3C] mb-6 md:mb-8 max-w-full md:max-w-2xl leading-relaxed"
          >
            Insira o código de verificação que enviamos no e-mail {email || "email.exemplo@email.com"} <br/><span className="font-medium text-sm text-red-500">(verifique a caixa de spam)</span>
          </motion.p>

          {/* Formulário */}
          <motion.form
            variants={containerVariants}
            onSubmit={handleSubmit}
            className="w-full max-w-full md:max-w-2xl"
          >
            {/* Campo Código de Verificação */}
            <motion.div variants={itemVariants} className="mb-10 md:mb-16">
              <label className="block text-xl md:text-2xl font-medium text-[#3C3C3C] pl-1 md:pl-3 mb-2">
                Código de verificação
              </label>
              <div className="flex justify-center group md:justify-start">
                <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg focus-within:shadow-2xl focus-within:shadow-[#075F70]/50 w-full max-w-2xl transition-shadow duration-300">
                  <div className="flex justify-between items-center gap-4 md:gap-6">
                    {code.map((digit, index) => (
                      <div key={index} className="flex-1 relative">
                        <input
                          ref={(el) => { inputRefs.current[index] = el; }}
                          type="text"
                          value={digit}
                          onChange={(e) => handleCodeChange(index, e.target.value)}
                          onKeyDown={(e) => handleKeyDown(index, e)}
                          onPaste={handlePaste}
                          className="w-full text-center text-4xl md:text-5xl font-medium text-black bg-transparent border-b-2 border-black focus:outline-none focus:border-[#075F70] py-2 transition-colors duration-200"
                          maxLength={1}
                          inputMode="text"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="text-center mt-4">
                    <p className="text-sm text-gray-500">{code.join('').length}/8 caracteres</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Botão Confirmar Código */}
            <motion.button
              variants={itemVariants}
              type="submit"
              disabled={!isCodeComplete || isSubmitting}
              className="w-full bg-white text-[#075F70] py-4 px-6 rounded-3xl text-lg md:text-xl font-medium shadow-lg transition-all duration-300 mb-6 md:mb-8 border-2 border-transparent
              enabled:hover:bg-gray-50 
              enabled:hover:shadow-xl 
              enabled:hover:translate-y-[-0.1em] 
              enabled:hover:border-[#075F70]
              enabled:focus:translate-y-[-0.2em]
              enabled:focus:shadow-xl
              active:translate-y-0

              disabled:bg-gray-200 
              disabled:cursor-not-allowed
              "
            >
              {isSubmitting ? "Verificando..." : "Confirmar código"}
            </motion.button>


            {/* Link Reenviar código */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center space-y-4 md:space-y-6"
            >
              <button
                type="button"
                onClick={handleResendCode}
                disabled={isResending}
                className="text-lg md:text-xl text-[#3C3C3C] hover:text-[#075F70] transition-colors disabled:opacity-50 disabled:cursor-not-allowed enabled:hover:underline"
              >
                {isResending ? "Reenviando..." : "Não recebeu o código? Reenviar"}
              </button>
            </motion.div>
          </motion.form>
        </motion.div>

        {/* Lado Direito - Imagem/Visual */}
        <motion.div
          initial={{ opacity: 0, x: 70 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="hidden md:flex flex-1 relative bg-[#E0E0E0] rounded-[25px] h-[92vh] w-[60vw] overflow-hidden mt-1 md:mr-5"
        >
          <Image
            src="/images/login.jpg"
            alt="Redefinição de senha background"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </motion.div>
      </div>
    </div>
  )
}