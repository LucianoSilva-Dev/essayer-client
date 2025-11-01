"use client"

import React from "react"
import { useState } from "react"
import Link from "next/link"
import { EyeOff, Eye } from "lucide-react"
import { useRouter } from "next/navigation"
import { CreateUsuarioBody } from "../../../apiCalls/usuario/types"
import { createUser } from "../../../apiCalls/usuario"
import { useAuth } from "../../../contexts/auth-context"
import { toast } from "react-toastify"
import { motion } from "framer-motion"

export default function FormProfessor() {
  const router = useRouter()
  const { isLoggedIn } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    curriculoLattes: "",
  })
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  })

  // Redireciona se já estiver logado
  React.useEffect(() => {
    if (isLoggedIn) {
      toast.info("Você já está logado.")
      router.replace("/profile")
    }
  }, [isLoggedIn, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Validação de senha
    if (name === "password") {
      const passwordRegex = /^(?=.*[a-z])(?=.*\d).{8,24}$/
      if (!passwordRegex.test(value)) {
        setErrors((prev) => ({ ...prev, password: "A senha precisa ter de 8 a 24 caracteres, ao menos uma letra minúscula e um número." }))
      } else {
        setErrors((prev) => ({ ...prev, password: "" }))
      }
    }

    // Validação de confirmação de senha
    if (name === "confirmPassword" || name === "password") {
      if (name === "confirmPassword" && value !== formData.password) {
        setErrors((prev) => ({ ...prev, confirmPassword: "As senhas não coincidem" }))
      } else if (name === "password" && value !== formData.confirmPassword && formData.confirmPassword) {
        setErrors((prev) => ({ ...prev, confirmPassword: "As senhas não coincidem" }))
      } else {
        setErrors((prev) => ({ ...prev, confirmPassword: "" }))
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Verificar se as senhas coincidem
    if (formData.password !== formData.confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: "As senhas não coincidem" }))
      setIsSubmitting(false)
      return
    }

    try {
      const { name, email, password, curriculoLattes } = formData
      const usuario: CreateUsuarioBody = {
        nome: name,
        senha: password,
        email
      }
      const { id } = await createUser(usuario)

      const query = new URLSearchParams({
        id,
        lattes: curriculoLattes,
        email
      })

      router.push(`/register/confirmation?${query}`)
    } catch (error) {
      console.error("Erro ao criar conta:", error)
      toast.error("Erro ao criar conta. Tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputVariants = {
    focus: {
      scale: 1.02,
      y: -2,
      transition: { duration: 0.2 }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <h1 className="text-2xl md:text-3xl font-semibold text-[#282133] mb-6 text-center">
        Crie sua conta
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Campo Nome */}
        <div className="space-y-2">
          <label htmlFor="name" className="block text-lg font-medium text-[#3C3C3C] pl-1">
            Nome completo
          </label>
          <motion.div whileFocus="focus" variants={inputVariants}>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#075F70] focus:shadow-lg transition-all duration-300 text-base shadow-md border border-gray-200"
              required
              placeholder="Digite seu nome completo"
            />
          </motion.div>
        </div>

        {/* Campo Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-lg font-medium text-[#3C3C3C] pl-1">
            Email
          </label>
          <motion.div whileFocus="focus" variants={inputVariants}>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#075F70] focus:shadow-lg transition-all duration-300 text-base shadow-md border border-gray-200"
              required
              placeholder="seu@email.com"
            />
          </motion.div>
        </div>

        {/* Campo Lattes */}
        <div className="space-y-2">
          <label htmlFor="curriculoLattes" className="block text-lg font-medium text-[#3C3C3C] pl-1">
            Link do Currículo Lattes
          </label>
          <motion.div whileFocus="focus" variants={inputVariants}>
            <input
              type="url"
              id="curriculoLattes"
              name="curriculoLattes"
              value={formData.curriculoLattes}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#075F70] focus:shadow-lg transition-all duration-300 text-base shadow-md border border-gray-200"
              required
              placeholder="https://lattes.cnpq.br/..."
            />
          </motion.div>
        </div>

        {/* Campo Senha */}
        <div className="space-y-2">
          <label htmlFor="password" className="block text-lg font-medium text-[#3C3C3C] pl-1">
            Senha
          </label>
          <motion.div whileFocus="focus" variants={inputVariants} className="relative group">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#075F70] focus:shadow-lg transition-all duration-300 text-base shadow-md border ${
                errors.password ? "border-red-500" : "border-gray-200"
              }`}
              required
              placeholder="Crie uma senha segura"
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors group-focus-within:text-[#075F70]"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
            </button>
          </motion.div>
          {errors.password && (
            <p className="text-sm text-red-500 pl-1">{errors.password}</p>
          )}
          <p className="text-sm text-gray-500 pl-1">
            A senha deve ter pelo menos 8 caracteres, uma letra minúscula e um número
          </p>
        </div>

        {/* Campo Confirmar Senha */}
        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="block text-lg font-medium text-[#3C3C3C] pl-1">
            Confirmar senha
          </label>
          <motion.div whileFocus="focus" variants={inputVariants} className="relative group">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#075F70] focus:shadow-lg transition-all duration-300 text-base shadow-md border ${
                errors.confirmPassword ? "border-red-500" : "border-gray-200"
              }`}
              required
              placeholder="Confirme sua senha"
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors group-focus-within:text-[#075F70]"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={22} /> : <Eye size={22} />}
            </button>
          </motion.div>
          {errors.confirmPassword && (
            <p className="text-sm text-red-500 pl-1">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Botão de Submit */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-[#075F70] hover:bg-[#064c5a] disabled:bg-gray-400 text-white py-4 px-6 rounded-2xl text-lg font-medium shadow-lg transition-all duration-300 focus:shadow-xl focus:translate-y-[-0.1em]"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              <span className="ml-2">Criando conta...</span>
            </div>
          ) : (
            "Criar conta"
          )}
        </motion.button>

        {/* Link para Login */}
        <div className="text-center pt-4">
          <p className="text-gray-600">
            Já tem uma conta?{" "}
            <Link
              href="/login"
              className="text-[#075F70] hover:text-[#064c5a] font-medium transition-colors hover:underline"
            >
              Faça login
            </Link>
          </p>
        </div>
      </form>
    </motion.div>
  )
}