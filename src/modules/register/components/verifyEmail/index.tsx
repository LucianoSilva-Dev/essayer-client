"use client"
import type React from "react"
import { useState } from "react"
import { motion, Variants } from "framer-motion"
import { toast } from "react-toastify"

// Props que o register-form passará para este componente
interface VerifyEmailInputsProps {
  email: string
  firstName: string
  lastName: string
  password: string
  itemVariants: Variants
  // Chamado quando o código for verificado com sucesso
  // Chamado para simular o reenvio de código
  onResendEmail: (nome: string, email: string, senha: string) => Promise<void>
}

export const VerifyEmailInputs: React.FC<VerifyEmailInputsProps> = ({
  email,
  firstName,
  lastName,
  password,
  itemVariants,
  onResendEmail,
}) => {
  const [isResending, setIsResending] = useState(false)

  const handleResendEmail = async () => {
    setIsResending(true)
    try {
      await onResendEmail(`${firstName} ${lastName}`, email, password)
      toast.info("Um novo código foi enviado para o seu email.")
    } catch (error) {
      toast.error("Erro ao reenviar o código.")
    } finally {
      setIsResending(false)
    }
  }

  return (
    <motion.div
      // Este componente é animado como um "item"
      variants={itemVariants}
      className="w-full max-w-full md:max-w-2xl"
    >
      {/* Descrição */}
      <motion.p
        className="text-base md:text-[25px] text-neutral-dark mb-6 md:mb-8 max-w-full md:max-w-2xl leading-relaxed"
      >
        Verifique o e-mail que enviamos para <br />
        <span className="font-medium text-brand-teal-dark">{email}</span>
        <br />
        <span className="font-normal text-sm text-red-500">
          (verifique a caixa de spam)
        </span>
      </motion.p>

      {/* Link Reenviar código */}
      <motion.div className="flex flex-col items-center space-y-4">
        <button
          type="button"
          onClick={handleResendEmail}
          disabled={isResending}
          className="text-lg md:text-xl text-neutral-dark hover:text-brand-teal-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed enabled:hover:underline"
        >
          {isResending ? "Reenviando..." : "Não recebeu o código? Reenviar"}
        </button>
      </motion.div>
    </motion.div>
  )
}