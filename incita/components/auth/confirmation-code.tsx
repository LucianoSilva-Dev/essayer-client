"use client"
import type React from "react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { redirect, useRouter, useSearchParams } from "next/navigation"
import { validateUser } from "../../apiCalls/requisicao-usuario"
import { createUser } from "../../apiCalls/usuario"
import { toast } from "react-toastify"

export default function VerifyCodeForm() {
  const [code, setCode] = useState("")
  const [isResending, setIsResending] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  const id = searchParams.get('id')
  const email = searchParams.get('email')
  const lattes = searchParams.get('lattes')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (!id) { return }

      await validateUser(id, { codigo: code })

      toast.success("Usuário criado com sucesso")

      router.push(`/login?lattes=${lattes}`)

    } catch { }
  }

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^A-Za-z0-9+/]/g, "")
    if (value.length <= 8) {
      setCode(value)
    }
  }

  const handleResendCode = async () => {
    setIsResending(true)
    try {
      if(!email){
        redirect('/register')
      }
      
      await createUser({
        nome: "placeholder",
        senha: "Placeholder0!",
        email
      })
    } catch { } finally {
      setIsResending(false)
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center shadow-lg px-8 py-8">
      {/* Logo */}
      <div className="mb-6">
        <Image src="/favicon_2d.png" alt="Incita Logo" width={180} height={120} priority />
      </div>

      {/* Título */}
      <h1 className="text-2xl font-medium text-gray-800 mb-4">Confirme que esse e-mail é seu</h1>

      {/* Descrição */}
      <p className="text-sm text-gray-600 text-center mb-8 leading-relaxed">
        Insira o código de 8 caracteres que enviamos para seu email <br/>
        <span className="text-red-500">(Confira a caixa de SPAM)</span>
      </p>

      {/* Formulário */}
      <form onSubmit={handleSubmit} className="w-full">
        <div className="mb-6">
          <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
            Código de verificação
          </label>
          <input
            id="code"
            type="text"
            value={code}
            onChange={handleCodeChange}
            className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600 text-center text-lg font-mono tracking-widest"
            placeholder="XXXXXXXX"
            maxLength={8}
            required
          />
          <p className="text-xs text-gray-500 mt-1 text-center">{code.length}/8 caracteres</p>
        </div>

        <button
          type="submit"
          disabled={code.length !== 8}
          className="w-full bg-teal-800 hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 px-4 rounded-md transition-colors mb-4"
        >
          Verificar código
        </button>

        {/* Opções adicionais */}
        <div className="flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={handleResendCode}
            disabled={isResending}
            className="text-sm text-gray-500 hover:text-teal-600 disabled:opacity-50"
          >
            {isResending ? "Reenviando..." : "Não recebeu o código? Reenviar"}
          </button>

          <Link href="/register" className="text-sm text-gray-500 hover:text-teal-600">
            Voltar
          </Link>
        </div>
      </form>
    </div>
  )
}
