"use client"
import type React from "react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { EyeOff, Eye } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { updatePassword } from "../../../apiCalls/usuario"
import { useAuth } from "../../../contexts/auth-context"

export default function ResetPasswordForm() {
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  const {isLoggedIn} = useAuth()

  const passwordsMatch = newPassword === confirmPassword && newPassword.length > 0
  const isFormValid = newPassword.length >= 6 && passwordsMatch
  const id = searchParams.get('id')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isFormValid) return

    setIsSubmitting(true)
    try {
      if(!id) {return}
      await updatePassword(id, {senha: newPassword})

      if(!isLoggedIn){
        router.push("/login?message=password-reset-success")
      } else {
        router.push("/profile?message=password-reset-success")
      }
    } catch { } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center shadow-lg px-8 py-8">
      {/* Logo */}
      <div className="mb-6">
        <Image src="/favicon_2d.png" alt="Incita Logo" width={180} height={120} priority />
      </div>

      {/* Título */}
      <h1 className="text-2xl font-medium text-gray-800 mb-4">Redefina sua senha</h1>

      {/* Descrição */}
      <p className="text-sm text-gray-600 text-center mb-8 leading-relaxed">
        Insira e confirme a nova senha da sua conta
      </p>

      {/* Formulário */}
      <form onSubmit={handleSubmit} className="w-full">
        <div className="mb-4">
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Nova senha
          </label>
          <div className="relative">
            <input
              id="newPassword"
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600"
              placeholder="Digite sua nova senha"
              minLength={6}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {newPassword.length > 0 && newPassword.length < 6 && (
            <p className="text-xs text-red-500 mt-1">A senha deve ter pelo menos 6 caracteres</p>
          )}
        </div>

        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Confirmar nova senha
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600"
              placeholder="Confirme sua nova senha"
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
          {confirmPassword.length > 0 && !passwordsMatch && (
            <p className="text-xs text-red-500 mt-1">As senhas não coincidem</p>
          )}
          {passwordsMatch && confirmPassword.length > 0 && (
            <p className="text-xs text-green-600 mt-1">As senhas coincidem</p>
          )}
        </div>

        <button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className="w-full bg-teal-800 hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 px-4 rounded-md transition-colors mb-4"
        >
          {isSubmitting ? "Redefinindo..." : "Redefinir senha"}
        </button>

        <div className="flex justify-center">
          <Link href="/forgot-password/verify-code" className="text-sm text-gray-500 hover:text-teal-600">
            Voltar
          </Link>
        </div>
      </form>
    </div>
  )
}
