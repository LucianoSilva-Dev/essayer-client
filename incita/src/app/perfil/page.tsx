"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/../contexts/auth-context"
import { useProfile } from "@/../contexts/profile-context"
import AlunoProfileComponent from "@/../components/profile/UserAccount"
import ProfessorProfileComponent from "@/../components/profile/ProfAccount"
import Loading from "./loading"

export default function PerfilPage() {
  const router = useRouter()
  const { isLoggedIn, isLoading: isAuthLoading } = useAuth()
  const { profile, uploadAvatar, isLoading: isProfileLoading } = useProfile()

  useEffect(() => {
    // Apenas redireciona quando a verificação de autenticação terminar e o usuário não estiver logado
    if (!isAuthLoading && !isLoggedIn) {
      router.push("/login")
    }
  }, [isLoggedIn, isAuthLoading, router])

  const handleEdit = () => {
    router.push("/perfil/editar")
  }

  const handleAvatarUpload = async (file: File) => {
    try {
      await uploadAvatar(file)
    } catch (error) {
      console.error("Erro ao fazer upload do avatar:", error)
      alert("Erro ao fazer upload do avatar. Tente novamente.")
    }
  }

  // Mostra a tela de carregamento enquanto a autenticação ou o perfil estão sendo carregados
  if (isAuthLoading || !profile) {
    return <Loading />
  }

  // Medida de segurança extra, embora o useEffect já vá redirecionar
  if (!isLoggedIn) {
    return <Loading />
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {profile.tipo === "aluno" ? (
          <AlunoProfileComponent
            profile={profile}
            onEdit={handleEdit}
            onAvatarUpload={handleAvatarUpload}
            isLoading={isProfileLoading}
          />
        ) : (
          <ProfessorProfileComponent
            profile={profile}
            onEdit={handleEdit}
            onAvatarUpload={handleAvatarUpload}
            isLoading={isProfileLoading}
          />
        )}
      </div>
    </main>
  )
}