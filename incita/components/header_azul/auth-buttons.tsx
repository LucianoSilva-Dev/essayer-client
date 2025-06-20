import { useAuth } from '@/../contexts/auth-context'
import { useRouter, usePathname } from 'next/navigation'
import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react"


export function AuthButtons() {
  const pathname = usePathname()
  const router = useRouter()
  const { isLoggedIn, logout } = useAuth()

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  const isActive = (path: string) => pathname === path

  return (
    <div className="flex items-center space-x-4">
      {isLoggedIn ? (
        <>
          <Link 
            href="/profile"
            className={`flex items-center ${isActive("/profile") ? "text-white" : "text-gray-300 hover:text-white transition-colors"}`}>
              Ver Perfil  {/* Aqui vai a foto de perfil */}
          </Link>
          <button
            onClick={handleLogout}
            className="px-6 py-2 rounded-full border border-white/20 hover:bg-gray-800 transition-colors cursor-pointer"
          >
            Sair
          </button>
        </>

      ) : (
        <>
          <Link
            href="/login"
            className="px-6 py-3 rounded-[10px] border border-white/30 text-white text-[20px] hover:bg-[#CA9C60] hover:border-[#CA9C60] duration-300 transition-colors"
          >
            Entrar
          </Link>
          <Link
            href="/register"
            className="px-6 py-3 rounded-[10px] bg-[#CA9C60] text-white text-[20px] hover:bg-[#a68050] duration-300 transition-colors"
          >
            Cadastrar-se
          </Link>
        </>
      )}
    </div>
  )
}
