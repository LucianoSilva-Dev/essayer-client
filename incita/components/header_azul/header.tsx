"use client"

import { Logo } from "./logo"
import { NavLinks } from "./nav-links"
import { AuthButtons } from "./auth-buttons"
import { MobileMenu } from "./mobile-menu"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation" // Importa o hook
import { Link } from "lucide-react"
import { useAuth } from "../../contexts/auth-context"
import { useRouter } from "next/navigation"

export function HeaderAzul() {
  const { isLoggedIn, logout } = useAuth()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname() // Obtém o pathname atual

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  const isActive = (path: string) => pathname === path

  // Não renderiza o header na landing page
  if (pathname === "/landing") {
    return null
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="fixed top-0 w-full bg-[#075F70] z-50 border-b rounded-b-[2em]">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <Logo />

        <div className="hidden md:flex items-center justify-between flex-1 ml-8">
          <NavLinks />
          <AuthButtons />
        </div>

        <MobileMenu onClick={toggleMenu} />

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="absolute top-23 left-0 right-0 bg-white z-50 p-4 shadow-md md:hidden"
            >
              <div className="flex items-center space-x-4">
                {isLoggedIn ? (
                  <>
                    <Link 
                      href="/perfil"
                      className={`flex items-center ${isActive("/perfil") ? "text-white" : "text-gray-300 hover:text-white transition-colors"}`}>
                        Ver Perfil  {/* Aqui vai a foto de perfil */}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="px-6 py-3 rounded-[20px] bg-[#CA9C60] text-white text-[20px] hover:bg-[#a68050] duration-200 cursor-pointer"
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
              
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}