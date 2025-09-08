"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import RepertorioForm from "../repertorio-form"
import { useAuth } from "@/contexts/auth-context" // 1. Importar o useAuth
import { toast } from "react-toastify"
import Loading from "../../loading" // Pode criar um componente de loading simples se não tiver

export default function AdicionarRepertorioPage() {
  const router = useRouter()
  const { userData, isLoading, isLoggedIn } = useAuth() // 2. Obter dados de autenticação

  // 3. Efeito para verificar permissão e redirecionar
  useEffect(() => {
    // Só executa a lógica depois que a autenticação for verificada
    if (!isLoading) {
      const isAuthorized = isLoggedIn && (userData?.cargo === 'professor' || userData?.cargo === 'admin');
      
      if (!isAuthorized) {
        toast.error("Você não tem permissão para acessar esta página.");
        router.push("/main"); // Redireciona para a página principal
      }
    }
  }, [isLoading, isLoggedIn, userData, router])


  const handleSubmit = async () => {
    router.push("/main")
  }

  const handleCancel = () => {
    router.push("/main")
  }

  const isAuthorized = isLoggedIn && (userData?.cargo === 'professor' || userData?.cargo === 'admin');
  if (isLoading || !isAuthorized) {
    return <Loading />; 
  }

  return (
    <main className="min-h-[calc(100vh-64px)] bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <RepertorioForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </div>
    </main>
  )
}
