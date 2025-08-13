"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import type { UserProfile, AlunoProfile } from "@/types/profile"
import { useAuth } from "./auth-context"
import { getUserById, updateUser } from "../apiCalls/usuario"

interface ProfileContextType {
  profile: UserProfile | null
  updateProfile: (data: Partial<UserProfile>) => Promise<void>
  uploadAvatar: (file: File) => Promise<string>
  isLoading: boolean
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined)


export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, userData } = useAuth()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const getUser = useCallback(async (id: string) => {
    try {

      console.log("getting user:");

      const user = await getUserById(id)

      console.log(user);

      setProfile({
        id: user.id,
        nome: user.nome,
        tipo: user.cargo,
        email: user.email,
        dataCadastro: user.createdAt,
        curriculoLattes: user.lattes
      })

    } catch (e) {
      console.log(e);
    }
  }, [])

  // Carregar perfil do localStorage
  useEffect(() => {
    if (isLoggedIn) {
      const storedProfile = localStorage.getItem("userProfile")
      if (storedProfile) {
        setProfile(JSON.parse(storedProfile))
      } else {
        // Criar perfil padrão (exemplo)
        const defaultProfile: AlunoProfile = {
          id: "1",
          tipo: "aluno",
          nome: "João",
          sobrenome: "Silva",
          email: "joao.silva@email.com",
          escola: "Colégio Exemplo",
          serie: "3medio",
          nivel: "intermediario",
          bio: "Estudante dedicado, apaixonado por literatura e redação. Sempre buscando melhorar minhas habilidades de escrita.",
          dataCadastro: "2024-01-15",
          ultimoAcesso: new Date().toISOString(),
          estatisticas: {
            repertoriosCriados: 12,
            repertoriosFavoritos: 25,
            citacoesCriadas: 8,
            pontuacao: 1250,
            redacoesEscritas: 15,
          },
          conquistas: ["Primeiro Repertório", "10 Repertórios", "Escritor Dedicado"],
          metasMensais: {
            repertorios: 5,
            redacoes: 3,
          },
        }
        if (userData) {
          getUser(userData?.id)
        }
      }
    } else {
      setProfile(null)
    }
  }, [isLoggedIn])

  // Salvar perfil no localStorage
  useEffect(() => {
    if (profile) {
      localStorage.setItem("userProfile", JSON.stringify(profile))
    }
  }, [profile])

  const updateProfile = async (data: Partial<UserProfile>) => {
    setIsLoading(true)
    try {
      if (profile) {
        await updateUser(profile?.id, data)
      }
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error)
      throw error
    } finally {
      setIsLoading(false)
      if (profile) {
        getUser(profile.id)
      }
    }
  }

  const uploadAvatar = async (file: File): Promise<string> => {
    setIsLoading(true)
    try {
      // Simular upload de avatar
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simular URL do avatar
      const avatarUrl = URL.createObjectURL(file)

      if (profile) {
        setProfile({ ...profile, avatar: avatarUrl })
      }

      return avatarUrl
    } catch (error) {
      console.error("Erro ao fazer upload do avatar:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ProfileContext.Provider
      value={{
        profile,
        updateProfile,
        uploadAvatar,
        isLoading,
      }}
    >
      {children}
    </ProfileContext.Provider>
  )
}

export function useProfile() {
  const context = useContext(ProfileContext)
  if (context === undefined) {
    throw new Error("useProfile deve ser usado dentro de um ProfileProvider")
  }
  return context
}
