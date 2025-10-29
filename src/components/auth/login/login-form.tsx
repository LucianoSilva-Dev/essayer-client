"use client"
import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { EyeOff, Eye } from "lucide-react"
import { toast } from "react-toastify"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from '@/./contexts/auth-context'
import { login as apiLogin } from '../../../apiCalls/auth/index'
import { createProfessorRequest } from "../../../apiCalls/usuario"

export default function LoginForm() {
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
      login(response.token)
      
      if(lattes && lattes !== "null"){
        await createProfessorRequest({lattes})
      }
      
      router.push("/main")
    } catch { }
  }
 
  return (
    <div className="min-h-screen bg-[#F1F1F2] flex px-10 py-10 w-full">
      {/* Lado Esquerdo - Conteúdo */}
      <div className="flex-1 flex flex-col justify-center pl-40 pr-20">
        {/* Cabeçalho */}
        <div className="mb-16">
          <h1 className="text-4xl font-semibold text-[#282133] mb-4">
            Bem vindo ao Incita
          </h1>
          <div className="w-48 h-0.5 bg-[#D3D3D3] mb-4"></div>
          <p className="text-2xl text-[#075F70] font-medium">
            Sua plataforma de repertórios
          </p>
        </div>

        {/* Descrição */}
        <p className="text-xl text-[#3C3C3C] mb-16 max-w-2xl leading-relaxed">
          Preencha os campos para entrar na plataforma.
        </p>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="max-w-2xl">
          {/* Campo Email */}
          <div className="mb-12">
            <label className="block text-xl font-medium text-[#3C3C3C] mb-4">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-6 py-4 bg-white rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#075F70] text-lg"
              placeholder="Seu email"
              required
            />
          </div>

          {/* Campo Senha */}
          <div className="mb-16">
            <label className="block text-xl font-medium text-[#3C3C3C] mb-4">
              Insira uma senha
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-6 py-4 bg-white rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#075F70] text-lg shadow-sm"
                placeholder="Sua senha"
                required
              />
              <button
                type="button"
                className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
              </button>
            </div>
          </div>

          {/* Botão Entrar */}
          <button
            type="submit"
            className="w-full bg-[#075F70] hover:bg-[#064c5a] text-white py-5 px-8 rounded-3xl text-xl font-medium shadow-lg transition-colors duration-200 mb-8"
          >
            Entrar
          </button>

          {/* Links Adicionais */}
          <div className="flex flex-col items-center space-y-4">
            <Link 
              href="/forgot-password" 
              className="text-lg text-[#075F70] hover:text-[#064c5a] transition-colors"
            >
              Esqueceu a senha?
            </Link>
            
            <div className="flex items-center space-x-2 text-lg">
              <span className="text-gray-600">Não tem uma conta?</span>
              <Link 
                href="/register" 
                className="text-[#075F70] hover:text-[#064c5a] font-medium transition-colors"
              >
                Cadastre-se
              </Link>
            </div>
          </div>
        </form>
      </div>

      {/* Lado Direito - Imagem/Visual */}
      <div className="flex-1 relative bg-[#E0E0E0] rounded-[25px] h-[92vh] w-[60vw] overflow-hidden">
        <Image 
          src="/login.jpg"
          alt="Login background"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>
    </div>
  )
}