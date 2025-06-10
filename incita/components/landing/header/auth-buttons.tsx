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
            <button
              onClick={handleLogout}
              className="px-6 py-2 rounded-full border border-white/20 hover:bg-gray-800 transition-colors cursor-pointer"
            >
              Sair
            </button>
          ) : (
            <>
              <Link
                href="/login"
                className="px-6 py-2 rounded-full bg-yellow-600 text-white hover:bg-amber-500"
              >
                Entrar
              </Link>
              <Link
                href="/register"
                className="px-6 py-2 rounded-full bg-yellow-600 text-white hover:bg-amber-500"
              >
                Cadastrar-se
              </Link>
            </>
          )}
        </div>
  )
}
