"use client"
import type React from "react"
import { useState, useRef, useEffect } from "react"
import { motion, Variants } from "framer-motion"
import { toast } from "react-toastify"
import { validateUser } from "@/apiCalls/requisicao-usuario"
import { VERIFY_CODE_ALLOWED_CHARS_REGEX } from "@/app/constants"
import { createUser } from "@/apiCalls/usuario"
import { CreateUsuarioBody } from "@/apiCalls/usuario/types"

// Props que o register-form passará para este componente
interface VerifyCodeInputsProps {
  email: string
  firstName: string
  lastName: string
  password: string
  itemVariants: Variants
  requestId: string
  // Chamado quando o código for verificado com sucesso
  onVerifySuccess: () => void
  // Chamado para simular o reenvio de código
  onResendCode: (nome: string, email: string, senha: string) => Promise<void>
}

export const VerifyCodeInputs: React.FC<VerifyCodeInputsProps> = ({
  email,
  firstName,
  lastName,
  password,
  requestId,
  itemVariants,
  onVerifySuccess,
  onResendCode,
}) => {
  // --- Estado Local (baseado no seu verify-code.tsx) ---
  const [code, setCode] = useState(["", "", "", "", "", "", "", ""])
  const [isResending, setIsResending] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  console.log("requestID: ", requestId)

  // Foca o primeiro input ao montar
  useEffect(() => {
    const firstInput = inputRefs.current[0]
    if (firstInput) {
      firstInput.focus()
    }
  }, [])

  // --- Lógica de Submissão (simulada) ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const fullCode = code.join("")

    if (fullCode.length !== 8) {
      toast.warn("Por favor, preencha o código completo.")
      return
    }

    setIsSubmitting(true)

    // --- AQUI VOCÊ CHAMARIA A API DE VERIFICAÇÃO ---
    // Ex: await apiVerifyCode({ email, codigo: fullCode })
    console.log("Verificando código:", fullCode, "para o email:", email)

    try {
      await validateUser(requestId, {codigo: fullCode})
      toast.success("Email verificado com sucesso!")
      onVerifySuccess() // Informa o pai (register-form) para redirecionar
    } catch (e) { 
      console.error("Erro ao verificar o código:", e) 
      toast.error("Código incorreto. Tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
    

    // // Simulação de API
    // setTimeout(() => {
    //   // Simulação de sucesso (mude para 'false' para testar erro)
    //   const isSuccess = true

    //   if (isSuccess) {
    //     toast.success("Email verificado com sucesso!")
    //     onVerifySuccess() // Informa o pai (register-form) para redirecionar
    //   } else {
    //     toast.error("Código incorreto. Tente novamente.")
    //     setIsSubmitting(false)
    //   }
    // }, 1000)
  }

  // --- Lógica de Reenvio ---
  const handleResendCode = async () => {
    setIsResending(true)
    try {
      await onResendCode(`${firstName} ${lastName}`, email, password)
      toast.info("Um novo código foi enviado para o seu email.")
    } catch (error) {
      toast.error("Erro ao reenviar o código.")
    } finally {
      setIsResending(false)
    }
  }

  // --- Handlers dos Inputs (do seu verify-code.tsx) ---
  const handleCodeChange = (index: number, value: string) => {
    const sanitizedValue = value.replace(VERIFY_CODE_ALLOWED_CHARS_REGEX, "")
    if (sanitizedValue.length <= 1) {
      const newCode = [...code]
      newCode[index] = sanitizedValue
      setCode(newCode)

      if (sanitizedValue && index < 7) {
        inputRefs.current[index + 1]?.focus()
      }
    }
  }

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData
      .getData("text")
      .replace(VERIFY_CODE_ALLOWED_CHARS_REGEX, "") // Permite letras, números e o sinal de "+"
      .slice(0, 8)

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

  const isCodeComplete = code.every((digit) => digit !== "")

  return (
    <motion.form
      // Este componente é animado como um "item"
      variants={itemVariants}
      onSubmit={handleSubmit}
      className="w-full max-w-full md:max-w-2xl"
    >
      {/* Descrição */}
      <motion.p
        className="text-base md:text-[25px] text-[#3C3C3C] mb-6 md:mb-8 max-w-full md:max-w-2xl leading-relaxed"
      >
        Insira o código de verificação que enviamos para <br />
        <span className="font-medium text-[#075F70]">{email}</span>
        <br />
        <span className="font-normal text-sm text-red-500">
          (verifique a caixa de spam)
        </span>
      </motion.p>

      {/* Campo Código de Verificação */}
      <motion.div className="mb-10 md:mb-16">
        <label className="block text-xl md:text-2xl font-medium text-[#3C3C3C] pl-1 md:pl-3 mb-2">
          Código de verificação
        </label>
        <div className="flex justify-center group md:justify-start">
          <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg focus-within:shadow-2xl focus-within:shadow-[#075F70]/50 w-full max-w-2xl transition-shadow duration-300">
            <div className="flex justify-between items-center gap-2 md:gap-4">
              {code.map((digit, index) => (
                <div key={index} className="flex-1 relative">
                  <input
                    ref={(el) => {
                      inputRefs.current[index] = el
                    }}
                    type="text"
                    value={digit}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className="w-full text-center text-3xl md:text-5xl font-medium text-black bg-transparent border-b-2 border-black focus:outline-none focus:border-[#075F70] py-2 transition-colors duration-200"
                    maxLength={1}
                    inputMode="text"
                  />
                </div>
              ))}
            </div>
            <div className="text-center mt-4">
              <p className="text-sm text-gray-500">
                {code.join("").length}/8 caracteres
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Botão Confirmar Código (estilo do verify-code.tsx) */}
      <motion.button
        type="submit"
        disabled={!isCodeComplete || isSubmitting}
        className="w-full bg-white text-[#075F70] py-4 px-6 rounded-3xl text-lg md:text-xl font-medium shadow-lg transition-all duration-300 mb-6 border-2 border-transparent
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
      <motion.div className="flex flex-col items-center space-y-4">
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
  )
}