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
      className="group flex items-center gap-5 p-2 rounded-lg text-[#898787] font-medium hover:text-red-600 transition-colors w-full"
    >
      <LogOut className="h-8 w-8 text-[#898787] group-hover:text-red-600" />
      <span className="text-3xl">Sair</span>
    </button>
  )
}