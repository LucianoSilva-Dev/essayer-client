"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import type { UserProfile } from "@/types/profile"
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
      }
      if (userData) {
        getUser(userData?.id)
      }
    }
  }, [getUser, userData, isLoggedIn])

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
