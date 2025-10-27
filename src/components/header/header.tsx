"use client"

import { AuthButtons } from "./auth-buttons"
import { MobileMenu } from "./mobile-menu"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { useAuth } from "../../contexts/auth-context"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { getProfilePictureLink } from "../../apiCalls/usuario"
import { Redo2 } from 'lucide-react';

interface HeaderProps {
  currentPage?: string
  description?: string | null
  backPage?: string | null
}

export function Header({ currentPage, description, backPage }: HeaderProps) {
  const { isLoggedIn, logout, userData } = useAuth()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [profilePic, setProfilePic] = useState<string | null>(null)
  const pathname = usePathname()

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
  if (pathname === "/landing" || pathname === "/login" || pathname === "/register") {
    return null
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="sticky top-0 px-20 mb-[-30px] w-full bg-transparent z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Lado Esquerdo: Seta de voltar + Nome da página */}
        <div className="flex items-center gap-4">
          {/* Seta de voltar - condicional */}
          {backPage && (
            <Link
              href={backPage}
              className="flex items-center gap-3 group transition-all duration-200"
            >
              <div className="w-11 h-8 flex items-center justify-center">
                <Redo2 
                  size={32} 
                  className="text-[#3C3C3C] transform rotate-180 group-hover:scale-110 transition-transform duration-200" 
                />
              </div>
              <span className="text-[#3C3C3C] text-lg font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                Retornar
              </span>
            </Link>
          )}
          
          {/* Título e Subtítulo */}
          {(currentPage || description) && (
            <div className="flex flex-col">
              {currentPage && (
                <h1 className="text-[#3C3C3C] text-2xl font-medium">
                  {currentPage}
                </h1>
              )}
              {description && (
                <p className="text-[#6B7280] text-sm font-normal mt-1">
                  {description}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Lado Direito: AuthButtons (já lida com usuário logado/não logado) */}
        <div className="hidden md:block">
          <AuthButtons />
        </div>

        {/* Menu Mobile */}
        <MobileMenu onClick={toggleMenu} />

        {/* Menu Mobile Expandido */}
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
                <Link href="/main" className="text-gray-800 text-lg font-medium py-2">
                  Repertórios
                </Link>
                {isLoggedIn && (userData?.cargo === "professor" || userData?.cargo === "admin") && (
                  <Link href="/adicionar" className="text-gray-800 text-lg font-medium py-2">
                    Adicionar Repertório
                  </Link>
                )}
                {isLoggedIn && userData?.cargo === "admin" && (
                  <Link href="/admin" className="text-gray-800 text-lg font-medium py-2">
                    Admin
                  </Link>
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
                      className="px-6 py-3 rounded-[10px] border border-gray-300 text-gray-800 text-[20px] hover:bg-[#CA9C60] hover:border-[#CA9C60] hover:text-white duration-300 transition-colors"
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