"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context" 
import { AnimatePresence } from "framer-motion"
import SettingsSidebar from "@/components/profile/SettingsSidebar" 
import Loading from "./loading"

export default function ProfileSettingsLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { userData, isLoading: isAuthLoading } = useAuth()

  // O layout precisa dos dados do usuário para o cabeçalho
  if (isAuthLoading) {
    return <Loading /> // Usa o skeleton da própria página
  }

  // Se não houver usuário, não mostra o layout de perfil
  if (!userData) {
    router.push("/login")
    return null
  }

  return (
    <main className="h-[calc(100vh-80px)] bg-gray-50 p-8 overflow-y-auto">

      {/* Layout de Duas Colunas */}
      <div className="flex gap-8 max-w-7xl mx-auto">
        {/* Coluna 1: Sidebar de Configurações */}
        <aside className="w-[464px] flex-shrink-0">
          <SettingsSidebar cargo={userData.cargo} />
        </aside>

        {/* Coluna 2: Conteúdo da Página (com Animação) */}
        <section className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            {children}
          </AnimatePresence>
        </section>
      </div>
    </main>
  )
}