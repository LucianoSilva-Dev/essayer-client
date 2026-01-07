"use client"
import type React from "react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createRequisicaoSenha } from "../../../../../lib/apiCalls/requisicao-senha"
import { useAuth } from "../../../../../shared/contexts/auth-context"
import { motion } from "framer-motion"

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("")
  const router = useRouter()
  const { isLoggedIn } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const { id } = await createRequisicaoSenha({ email })

      const query = new URLSearchParams({
        id,
        email
      })

      router.push(`/forgot-password/verify-code?${query}`)
    } catch { }
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
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row px-4 md:px-2 py-6 w-full overflow-x-hidden">
      {/* Lado Esquerdo - Conteúdo */}
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
          Insira o endereço do e-mail para receber o código de verificação e prosseguir na redefinição de senha
        </motion.p>

        {/* Formulário */}
        <motion.form
          variants={containerVariants}
          onSubmit={handleSubmit}
          className="w-full max-w-full md:max-w-2xl"
        >
          {/* Campo Email */}
          <motion.div variants={itemVariants} className="mb-10 md:mb-16">
            <label className="block text-xl md:text-2xl font-medium text-[#3C3C3C] pl-1 md:pl-3 mb-2">
              Email
            </label>
            <div className="relative group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 md:px-6 md:py-4 bg-white rounded-2xl md:rounded-3xl 
                  focus:outline-none focus:ring-2 focus:ring-[#075F70] 
                  focus:shadow-lg group-focus-within:-translate-y-0.5 
                  transition-all duration-300 text-base md:text-lg shadow-md"
                placeholder="Digite seu email"
                required
              />
            </div>
          </motion.div>

          {/* Botão Enviar E-mail */}
          <motion.button
            variants={itemVariants}
            type="submit"
            className="w-full bg-[#075F70] hover:bg-[#064c5a] hover:shadow-xl hover:translate-y-[-0.2em] active:translate-y-0 text-white py-3.5 md:py-5 px-6 rounded-2xl md:rounded-3xl text-lg md:text-xl font-medium shadow-lg transition-all duration-300 mb-6 md:mb-8 focus:shadow-xl focus:translate-y-[-0.2em]"
          >
            Enviar e-mail
          </motion.button>

          {/* Links Adicionais */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center space-y-3 md:space-y-4"
          >
            {!isLoggedIn && (
              <Link
                href="/login"
                className="text-md md:text-lg text-[#075F70] hover:text-[#064c5a] transition-colors hover:underline"
              >
                Voltar ao login
              </Link>
            )}

            <div className="flex items-center space-x-2 text-md md:text-lg group">
              <span className="text-gray-600">Não tem uma conta?</span>
              <Link
                href="/register"
                className="text-[#075F70] hover:text-[#064c5a] font-medium transition-colors group-hover:underline"
              >
                Cadastre-se
              </Link>
            </div>
          </motion.div>
        </motion.form>
      </motion.div>

      {/* Lado Direito - Imagem/Visual (oculta em telas pequenas) */}
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
          sizes="(max-width: 768px) 0px, 60vw"
          style={{ objectFit: 'cover' }}
          priority
        />
      </motion.div>
    </div>
  )
}