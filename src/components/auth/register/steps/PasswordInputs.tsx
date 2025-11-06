"use client"
import React, { useState } from "react"
import { motion, Variants } from "framer-motion"
import { Eye, EyeOff } from "lucide-react"

// Definimos as props para este componente
interface PasswordInputsProps {
  password: string
  confirmPassword: string
  onFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  itemVariants: Variants
  passwordsMatch: boolean
  passwordRegex: RegExp
}

export const PasswordInputs: React.FC<PasswordInputsProps> = ({
  password,
  confirmPassword,
  onFormChange,
  itemVariants,
  passwordsMatch,
  passwordRegex,
}) => {
  // Estado local apenas para visibilidade da senha
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const isPasswordEmpty = password.length === 0
  const isPasswordValid = passwordRegex.test(password)

  return (
    <motion.div
      className="flex flex-col gap-8"
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      {/* Campo "Insira uma senha" */}
      <motion.div variants={itemVariants}>
        <label
          htmlFor="password"
          // Estilos do Figma
          className="block text-2xl md:text-[35px] font-medium text-[#3C3C3C] pl-3 mb-2"
        >
          Insira uma senha
        </label>
        <div className="relative group">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password" // Importante para o onFormChange
            value={password}
            onChange={onFormChange}
            // Estilos do Figma + Interação
            className="w-full max-w-[640px] px-6 py-4 bg-white rounded-[32px] 
              text-lg md:text-xl
              shadow-[0px_0px_15px_-6px_rgba(0,0,0,0.25)]
              focus:outline-none focus:ring-2 focus:ring-[#075F70] 
              focus:shadow-lg group-focus-within:-translate-y-[0.5em]
              transition-all duration-300"
            required
            minLength={8}
          />
          <button
            type="button"
            className="absolute right-4 md:right-6 top-1/2 transform -translate-y-1/2 
              text-gray-500 hover:text-gray-700
              group-focus-within:-translate-y-[calc(50%+0.5em)] group-focus-within:text-[#075F70]
              transition-all duration-300 z-10"
            onClick={() => setShowPassword(!showPassword)}
            aria-label="Alternar visibilidade da senha"
          >
            {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
          </button>
        </div>
        {/* Mensagem de Validação do Regex (do reset-password.tsx) */}
        <p
          className={`text-xs mt-1 ml-3 transition-colors duration-300 ${
            isPasswordEmpty
              ? "text-zinc-700" // estado inicial
              : isPasswordValid
              ? "text-green-600" // senha válida
              : "text-red-500" // senha inválida
          }`}
        >
          A senha precisa ter de 8 a 24 caracteres, ao menos uma letra minúscula e um número.
        </p>
      </motion.div>

      {/* Campo "Confirme a senha" */}
      <motion.div variants={itemVariants}>
        <label
          htmlFor="confirmPassword"
          // Estilos do Figma
          className="block text-2xl md:text-[35px] font-medium text-[#3C3C3C] pl-3 mb-2"
        >
          Confirme a senha
        </label>
        <div className="relative group">
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword" // Importante para o onFormChange
            value={confirmPassword}
            onChange={onFormChange}
            // Estilos do Figma + Interação
            className="w-full max-w-[640px] px-6 py-4 bg-white rounded-[32px] 
              text-lg md:text-xl
              shadow-[0px_0px_15px_-6px_rgba(0,0,0,0.25)]
              focus:outline-none focus:ring-2 focus:ring-[#075F70] 
              focus:shadow-lg group-focus-within:-translate-y-[0.5em]
              transition-all duration-300"
            required
          />
          <button
            type="button"
            className="absolute right-4 md:right-6 top-1/2 transform -translate-y-1/2 
              text-gray-500 hover:text-gray-700
              group-focus-within:-translate-y-[calc(50%+0.5em)] group-focus-within:text-[#075F70]
              transition-all duration-300 z-10"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            aria-label="Alternar visibilidade da senha"
          >
            {showConfirmPassword ? <EyeOff size={22} /> : <Eye size={22} />}
          </button>
        </div>
        {/* Mensagem de Coincidência de Senha (do reset-password.tsx) */}
        <p
          className={`text-xs mt-1 ml-3 transition-all duration-300 ${
            confirmPassword.length === 0
              ? "opacity-0" // Oculto se vazio
              : passwordsMatch
              ? "opacity-100 text-green-600"
              : "opacity-100 text-red-500"
          }`}
        >
          {passwordsMatch ? "As senhas coincidem" : "As senhas não coincidem"}
        </p>
      </motion.div>
    </motion.div>
  )
}