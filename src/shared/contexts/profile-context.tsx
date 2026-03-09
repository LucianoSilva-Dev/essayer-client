"use client"

import type React from "react"
import { createContext, useContext, useMemo } from "react"
import type { UserProfile } from "@/types/profile"
import { updateUser } from "@/lib/apiCalls/usuario"
import { authClient } from "@/lib/betterAuth/auth-client"

interface ProfileContextType {
  profile: UserProfile | null
  isLoading: boolean
  updateProfile: (data: Partial<UserProfile>) => Promise<void>
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined)

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  // O Better Auth gerencia todo o estado para você
  const { data: session, isPending, error } = authClient.useSession();

  // Adaptamos o objeto do Better Auth para o seu formato UserProfile
  const profile: UserProfile | null = useMemo(() => {
    if (!session?.user) return null;
    
    return {
      id: session.user.id,
      nome: session.user.name,
      email: session.user.email,
      // Campos extras precisam estar configurados no schema do Better Auth
      // O TypeScript pode reclamar aqui se não tivermos tipado, então usamos 'as any' temporariamente
      tipo: (session.user as any).role || 'user', 
      curriculoLattes: (session.user as any).lattes || '',
    };
  }, [session]);

  const updateProfileHandler = async (data: Partial<UserProfile>) => {
    if (!profile) return;

    try {
      // Chamamos a apiCall refatorada
      await updateUser(profile.id, {
        nome: data.nome,
      });
      
      // O Better Auth atualiza a sessão local automaticamente após o update,
      // mas se precisar forçar, existe o session.refetch() no hook original.
    } catch (err) {
      console.error("Erro ao atualizar perfil:", err);
      throw err;
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        isLoading: isPending,
        updateProfile: updateProfileHandler,
      }}
    >
      {children}
    </ProfileContext.Provider>
  )
}

export function useProfile() {
  const context = useContext(ProfileContext)
  if (!context) {
    throw new Error("useProfile deve ser usado dentro de ProfileProvider")
  }
  return context
}