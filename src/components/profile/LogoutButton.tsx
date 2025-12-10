"use client"

import { useAuth } from "@/contexts/auth-context" // Caminho correto
import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"

export default function LogoutButton() {
  const { logout } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push("/login") // Redireciona para o login após sair
  }

  return (
    <button
      onClick={handleLogout}
      className="group flex items-center gap-3 sm:gap-5 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-[#898787] font-medium hover:text-red-600 transition-colors w-full hover:bg-red-50"
    >
      <LogOut className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-[#898787] group-hover:text-red-600" />
      <span className="text-lg sm:text-2xl lg:text-3xl">Sair</span>
    </button>
  )
}