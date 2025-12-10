"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context" 
import { AnimatePresence } from "framer-motion"
import SettingsSidebar from "@/components/profile/SettingsSidebar" 
import Loading from "./loading"
import { Menu, X } from "lucide-react"

export default function ProfileSettingsLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { userData, isLoading: isAuthLoading } = useAuth()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

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
    <main className="min-h-[calc(100vh-80px)] bg-gray-50">
      {/* Layout Desktop e Mobile */}
      <div className="flex flex-col lg:flex-row gap-0 lg:gap-8 h-full">
        
        {/* Header Mobile com Botão Menu */}
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between sticky top-0 z-30">
          <h1 className="text-2xl font-semibold text-[#3C3C3C]">Perfil</h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Abrir menu"
          >
            {isSidebarOpen ? (
              <X className="w-6 h-6 text-[#3C3C3C]" />
            ) : (
              <Menu className="w-6 h-6 text-[#3C3C3C]" />
            )}
          </button>
        </div>

        {/* Overlay Mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 lg:hidden z-20"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar: Desktop Fixo, Mobile Drawer */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 top-[80px] w-full sm:w-80 lg:w-[464px] 
          bg-white z-20 transform transition-transform duration-300 lg:transform-none
          lg:top-0 lg:relative overflow-y-auto flex-shrink-0
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}>
          <div className="p-4 sm:p-6 lg:p-10">
            <SettingsSidebar cargo={userData.cargo} onItemClick={() => setIsSidebarOpen(false)} />
          </div>
        </aside>

        {/* Conteúdo Principal */}
        <section className="flex-1 w-full overflow-y-auto">
          <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              {children}
            </AnimatePresence>
          </div>
        </section>
      </div>
    </main>
  )
}