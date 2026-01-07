"use client"
import type React from "react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { EyeOff, Eye } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { updatePassword } from "../../../../../lib/apiCalls/usuario"
import { useAuth } from "../../../../../shared/contexts/auth-context"
import { motion } from "framer-motion"

export default function ResetPasswordForm() {
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const passwordRegex = /^(?=.*[a-z])(?=.*\d).{8,24}$/

  const { isLoggedIn } = useAuth()

  const passwordsMatch = newPassword === confirmPassword && newPassword.length > 0
  const isFormValid = newPassword.length >= 6 && passwordsMatch
  const id = searchParams.get('id')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isFormValid) return

    setIsSubmitting(true)
    try {
      if (!id) { return }
      await updatePassword(id, { senha: newPassword })

      if (!isLoggedIn) {
        router.push("/login?message=password-reset-success")
      } else {
        router.push("/profile?message=password-reset-success")
      }
    } catch { } finally {
      setIsSubmitting(false)
    }
  }

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
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row px-4 md:px-10 py-6 w-full overflow-x-hidden">
      {/* Lado Esquerdo - Conteúdo */}
      <motion.div
        className="flex-1 flex flex-col justify-center pl-6 pr-6 md:pl-20 md:pr-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Cabeçalho */}
        <motion.div variants={itemVariants} className="mt-4 md:mt-5">
          <h1 className="text-3xl md:text-4xl font-semibold text-[#282133]">
            Redefinição de senha
          </h1>
          <div className="w-full h-0.5 bg-[#D3D3D3] mb-4 mt-2"></div>
        </motion.div>

        {/* Descrição */}
        <motion.p
          variants={itemVariants}
          className="text-base md:text-[25px] text-[#3C3C3C] mb-6 md:mb-8 max-w-full md:max-w-2xl leading-relaxed"
        >
          Insira e confirme a nova senha da sua conta
        </motion.p>

        {/* Formulário */}
        <motion.form
          variants={containerVariants}
          onSubmit={handleSubmit}
          className="w-full max-w-full md:max-w-2xl"
        >
          {/* Campo Nova Senha */}
          <motion.div variants={itemVariants} className="mb-8 md:mb-12">
            <label className="block text-xl md:text-2xl font-medium text-[#3C3C3C] pl-1 md:pl-3 mb-2">
              Nova senha
            </label>
            <div className="relative group">
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 md:px-6 md:py-4 bg-white rounded-2xl md:rounded-3xl 
                focus:outline-none focus:ring-2 focus:ring-[#075F70] 
                focus:shadow-lg group-focus-within:-translate-y-[0.5em]
                transition-all duration-300 text-base md:text-lg shadow-md"
                placeholder="Digite sua nova senha"
                minLength={6}
                required
              />
              <button
                type="button"
                className="absolute right-4 md:right-6 top-1/2 transform -translate-y-1/2 
                text-gray-500 hover:text-gray-700
                group-focus-within:-translate-y-[calc(50%+0.5em)] group-focus-within:text-[#075F70]
                transition-all duration-300"
                onClick={() => setShowNewPassword(!showNewPassword)}
                aria-label="Alternar visibilidade da senha"
              >
                {showNewPassword ? <EyeOff size={22} /> : <Eye size={22} />}
              </button>
            </div>
            <p
              className={`text-xs mt-1 ml-3 transition-colors duration-300 ${newPassword.length === 0
                ? "text-zinc-700" // estado inicial
                : passwordRegex.test(newPassword)
                  ? "text-green-600" // senha válida
                  : "text-red-500"   // senha inválida
                }`}
            >
              A senha precisa ter de 8 a 24 caracteres, ao menos uma letra minúscula e um número.
            </p>
          </motion.div>

          {/* Campo Confirmar Senha */}
          <motion.div variants={itemVariants} className="mb-10 md:mb-16">
            <label className="block text-xl md:text-2xl font-medium text-[#3C3C3C] pl-1 md:pl-3 mb-2">
              Insira a senha novamente
            </label>
            <div className="relative group">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 md:px-6 md:py-4 bg-white rounded-2xl md:rounded-3xl 
                focus:outline-none focus:ring-2 focus:ring-[#075F70] 
                focus:shadow-lg group-focus-within:-translate-y-[0.5em]
                transition-all duration-300 text-base md:text-lg shadow-md"
                placeholder="Confirme sua nova senha"
                required
              />
              <button
                type="button"
                className="absolute right-4 md:right-6 top-1/2 transform -translate-y-1/2 
                text-gray-500 hover:text-gray-700
                group-focus-within:-translate-y-[calc(50%+0.5em)] group-focus-within:text-[#075F70]
                transition-all duration-300"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label="Alternar visibilidade da senha"
              >
                {showConfirmPassword ? <EyeOff size={22} /> : <Eye size={22} />}
              </button>
            </div>
            <p
              className={`text-xs mt-1 ml-3 transition-all duration-300 ${confirmPassword.length === 0
                  ? "opacity-0"
                  : passwordsMatch
                    ? "opacity-100 text-green-600"
                    : "opacity-100 text-red-500"
                }`}
            >
              {passwordsMatch ? "As senhas coincidem" : "As senhas não coincidem"}
            </p>
          </motion.div>

          {/* Botão Redefinir Senha */}
          <motion.button
            variants={itemVariants}
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className="w-full bg-[#075F70] hover:bg-[#064c5a] hover:shadow-xl hover:translate-y-[-0.2em] 
            active:translate-y-0 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:translate-y-0
            disabled:hover:shadow-lg text-white py-3.5 md:py-5 px-6 rounded-2xl md:rounded-3xl 
            text-lg md:text-xl font-medium shadow-lg transition-all duration-300 mb-6 md:mb-8 
            focus:shadow-xl focus:translate-y-[-0.2em]"
          >
            {isSubmitting ? "Redefinindo..." : "Redefinir senha"}
          </motion.button>

          {/* Link Voltar */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center"
          >
            <Link
              href="/forgot-password/verify-code"
              className="text-md md:text-lg text-[#075F70] hover:text-[#064c5a] transition-colors hover:underline"
            >
              Voltar
            </Link>
          </motion.div>
        </motion.form>
      </motion.div>

      {/* Lado Direito - Imagem/Visual (oculta em telas pequenas) */}
      <motion.div
        initial={{ opacity: 0, x: 70 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="hidden md:flex flex-1 relative bg-[#E0E0E0] rounded-[25px] h-[92vh] w-[60vw] overflow-hidden mt-1"
      >
        <Image
          src="/images/login.jpg"
          alt="Redefinir senha background"
          fill
          sizes="(max-width: 768px) 0px, 60vw"
          style={{ objectFit: 'cover' }}
          priority
        />
      </motion.div>
    </div>
  )
}