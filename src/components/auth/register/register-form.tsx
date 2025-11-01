"use client"
import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { toast } from "react-toastify"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from '@/./contexts/auth-context'
import { login as apiLogin } from '../../../apiCalls/auth/index'
import { createProfessorRequest } from "../../../apiCalls/usuario"
import { motion } from "framer-motion"
import UserTypeCard from "./steps/UserTypeCard"
export default function RegisterForm() {
  const { login, isLoggedIn } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()
  const [alreadyLogged, setAlreadylogged] = useState(true)

  // Redireciona se já estiver logado
  React.useEffect(() => {
    if (isLoggedIn && alreadyLogged) {
      toast.info("Você já está logado.")
      router.replace("/profile")
    }
  }, [isLoggedIn, router, alreadyLogged])

  const searchParams = useSearchParams()
  const lattes = searchParams.get('lattes')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setAlreadylogged(false)
      const response = await apiLogin({ email, senha: password })
      login(response)

      if (lattes && lattes !== "null") {
        await createProfessorRequest({ lattes })
      }

      router.push("/main")
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
            Bem vindo ao Incita
          </h1>
          <p className="text-lg md:text-2xl text-[#075F70] font-medium mt-2 mb-4">
            Sua plataforma de repertórios
          </p>
          <div className="w-full h-0.5 bg-[#D3D3D3] mb-4"></div>
        </motion.div>

        {/* InputCard */}
          <motion.div variants={itemVariants} className="mb-6 md:mb-8">
            <UserTypeCard />
          </motion.div>

        {/* Descrição */}
        <motion.p
          variants={itemVariants}
          className="text-base md:text-[25px] text-[#3C3C3C] mb-6 md:mb-8 max-w-full md:max-w-2xl leading-relaxed"
        >
          Selecione o valor que se encaixa com você
        </motion.p>


        {/* Links Adicionais */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center space-y-3 md:space-y-4"
        >
          <div className="flex items-center space-x-2 text-md md:text-lg group">
            <span className="text-gray-600">Já tem uma conta?</span>
            <Link
              href="/login"
              className="text-[#075F70] hover:text-[#064c5a] font-medium transition-colors group-hover:underline"
            >
              Entrar
            </Link>
          </div>
        </motion.div>
      </motion.div>

      {/* Lado Direito - Imagem/Visual (oculta em telas pequenas) */}
      <motion.div
        initial={{ opacity: 0, x: 70 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="hidden md:flex flex-1 relative bg-[#E0E0E0] rounded-[25px] h-[92vh] w-[60vw] overflow-hidden mt-1"
      >
        <Image
          src="/login.jpg"
          alt="Login background"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </motion.div>
    </div>
  )
}