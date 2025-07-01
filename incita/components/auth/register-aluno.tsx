"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { EyeOff, Eye } from "lucide-react"
import type { UserRegistration } from "@/../types/user"
import type { Dispatch, SetStateAction } from "react"
import { createUser } from "../../api/usuario"
import { CreateUsuarioBody } from "../../api/usuario/types"

interface FormAlunoProps {
  onSubmit: (userData: UserRegistration) => Promise<void>
  isSubmitting: boolean
  showPassword: boolean
  setShowPassword: Dispatch<SetStateAction<boolean>>
}

export default function FormAluno({
  onSubmit,
  isSubmitting,
  showPassword,
  setShowPassword,
}: FormAlunoProps) {
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    aceitouTermos: false,
  })
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    // Verificar se as senhas coincidem
    if (formData.password !== formData.confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: "As senhas não coincidem" }))
      return
    }

    try {
      const { name, email, password } = formData
      const usuario: CreateUsuarioBody = {
        nome: name,
        senha: password,
        email
      }
      const { id } = await createUser(usuario)

      const query = new URLSearchParams({
        id,
        email
      })

      window.location.href = `/register/confirmation?${query}`
    } catch {}
  }

  return (
    <div className="w-full max-w-auto mx-auto flex flex-col items-center">
      <h1 className="text-2xl font-medium text-gray-800 mb-8">Crie sua conta</h1>
      <button className="flex items-center justify-center gap-2 w-full border border-gray-300 rounded-md py-3 px-4 mb-8 hover:bg-gray-50 transition-colors">
        <Image src="/google-icon.svg" alt="Google" width={20} height={20} />
        <span className="text-gray-700">Continuar com o Google</span>
      </button>
      <div className="w-full flex items-center mb-8">
        <div className="flex-grow h-px bg-gray-200"></div>
      </div>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Nome completo
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Senha
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-3 py-3 border ${errors.password ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600`}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
          <p className="mt-1 text-xs text-gray-500">A senha deve ter pelo menos 8 caracteres</p>
        </div>
        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Confirmar senha
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-3 py-3 border ${errors.confirmPassword ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600`}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-teal-800 hover:bg-teal-700 text-white py-3 px-4 rounded-md transition-colors mb-4"
        >
          Criar conta
        </button>
        <div className="text-center text-sm text-gray-600">
          Já tem uma conta?{" "}
          <Link href="/login" className="text-teal-600 hover:text-teal-700">
            Faça login
          </Link>
        </div>
      </form>
    </div>
  )
}
