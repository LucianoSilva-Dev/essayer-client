"use client"

import { Logo } from "./logo"
import { NavItem } from "./nav-item"
import { AuthButtons } from "./auth-buttons"
import { MobileMenu } from "./mobile-menu"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation" // Importa o hook
import Link from "next/link"
import { useAuth } from "../../contexts/auth-context"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { getProfilePictureLink } from "../../apiCalls/usuario"
import { NavLinks } from "./nav-links"

export function HeaderAzul() {
  const { isLoggedIn, logout, userData } = useAuth()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [profilePic, setProfilePic] = useState<string | null>(null)
  const pathname = usePathname() // Obtém o pathname atual

  useEffect(() => {
    const fetchProfilePic = async () => {
      if (isLoggedIn && userData?.id) {
        const url = await getProfilePictureLink(userData.id)
        setProfilePic(url)
      } else {
        setProfilePic(null)
      }
    }
    fetchProfilePic()
  }, [isLoggedIn, userData])

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  // Não renderiza o header na landing page
  if (pathname === "/landing") {
    return null
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="fixed top-0 w-full bg-[#075F70] z-50 border-b rounded-b-[2em]">
      <div className="container mx-auto px-4 py-0 flex items-center justify-between">
        <Logo />

        <div className="hidden md:flex items-center justify-between flex-1 ml-8">
          <NavLinks/>
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
              <div className="flex flex-col space-y-4 mb-4">
                {/* <NavItem href="/main" label="Início" /> */}
                <NavItem href="/main" label="Repertórios" />
                {isLoggedIn && (userData?.cargo === "professor" || userData?.cargo === "admin") && (
                  <NavItem href="/adicionar" label="Adicionar Repertório" />
                )}
                {isLoggedIn && userData?.cargo === "admin" && (
                  <NavItem href="/admin" label="Admin" />
                )}
              </div>
              <div className="flex items-center space-x-4">
                {isLoggedIn ? (
                  <>
                    <button
                      onClick={() => router.push("/profile")}
                      className="flex items-center focus:outline-none"
                      title="Ver perfil"
                      type="button"
                    >
                      {profilePic ? (
                        <span className="w-9 h-9 rounded-full cursor-pointer overflow-hidden border-1 border-[#CA9C60] flex items-center justify-center">
                          <Image
                            src={profilePic}
                            alt="Foto de perfil"
                            width={36}
                            height={36}
                            className="object-cover w-full h-full"
                          />
                        </span>
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold">
                          {userData?.nome?.[0] || "U"}
                        </div>
                      )}
                    </button>
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
                      className="px-6 py-3 rounded-[10px] border border-white/30 text-[#075F70] text-[20px] hover:bg-[#CA9C60] hover:border-[#CA9C60] hover:text-white duration-300 transition-colors"
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