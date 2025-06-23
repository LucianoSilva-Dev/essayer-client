"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/../contexts/auth-context"
import { useProfile } from "@/../contexts/profile-context"
import AlunoProfileComponent from "@/../components/profile/UserAccount"
import ProfessorProfileComponent from "@/../components/profile/ProfAccount"

export default function PerfilPage() {
  const router = useRouter()
  const { isLoggedIn } = useAuth()
  const { profile, updateProfile, uploadAvatar, isLoading } = useProfile()

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login")
    }
  }, [isLoggedIn, router])

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

  if (!isLoggedIn || !profile) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Carregando perfil...</div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {profile.tipo === "aluno" ? (
          <AlunoProfileComponent
            profile={profile}
            onEdit={handleEdit}
            onAvatarUpload={handleAvatarUpload}
            isLoading={isLoading}
          />
        ) : (
          <ProfessorProfileComponent
            profile={profile}
            onEdit={handleEdit}
            onAvatarUpload={handleAvatarUpload}
            isLoading={isLoading}
          />
        )}
      </div>
    </main>
  )
}
