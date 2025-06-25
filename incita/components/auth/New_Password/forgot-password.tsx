"use client"
import type React from "react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createRequisicaoSenha } from "../../../api/requisicao-senha"

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const {id} = await createRequisicaoSenha({email})

      const query = new URLSearchParams({
        id, 
        email
      })

      router.push(`/forgot-password/verify-code?${query}`)
    } catch (e) { }
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
        Insira o endereço do e-mail vinculado à sua conta para te enviarmos um código
      </p>

      {/* Formulário */}
      <form onSubmit={handleSubmit} className="w-full">
        <div className="mb-6">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600"
            placeholder="Digite seu email"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-teal-800 hover:bg-teal-700 text-white py-3 px-4 rounded-md transition-colors mb-4"
        >
          Enviar código
        </button>

        <div className="flex justify-center">
          <Link href="/login" className="text-sm text-gray-500 hover:text-teal-600">
            Voltar ao login
          </Link>
        </div>
      </form>
    </div>
  )
}
