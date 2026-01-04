"use client"

import { Logo } from "./logo"
import { NavLinks } from "./nav-links"
import { AuthButtons } from "./auth-buttons"
import { MobileMenu } from "./mobile-menu"
import { useAuth } from '@/shared/contexts/auth-context'
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useRouter, usePathname } from 'next/navigation'
  
  

export function HeaderLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  const pathname = usePathname()
  const router = useRouter()
  const { isLoggedIn, logout } = useAuth()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  
  const isActive = (path: string) => pathname === path

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="fixed top-0 w-full max-w-[100vw] bg-white z-50 border-b border-white rounded-b-[2em] shadow-sm"
    >
      <div className="container mx-auto px-4 py-0 flex items-center justify-between">
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
              className="absolute top-24 left-0 right-0 bg-white z-40 p-4 shadow-md md:hidden"
            >
              <div className="absolute left-0 right-0 bg-white z-50 p-4 shadow-md md:hidden">
            <div className="flex flex-col space-y-4">
              <a href="#inicio" className="text-gray-800 text-lg font-medium">
                Início
              </a>
              <a href="#repertorios" className="text-gray-800 text-lg font-medium">
                Repertórios
              </a>
              <a href="#como-funciona" className="text-gray-800 text-lg font-medium">
                Como Funciona
              </a>
              {isLoggedIn ? (
                        <>
                        <Link
                          href="/main"
                          className={`px-6 py-3 rounded-[10px] bg-[transparent] border-solid border-2 border-[#CA9C60] text-center ${isActive("/main") ? "text-black" : "text-[#CA9C60] text-[20px] hover:text-white hover:bg-[#CA9C60] transition-colors duration-300 cursor-pointer"}`}
                        >
                          Acessar
                        </Link>
                          <button
                            onClick={handleLogout}
                            className="px-6 py-3 rounded-[10px] bg-[#CA9C60] text-white text-[20px] hover:bg-[#a68050] duration-200 cursor-pointer"
                          >
                            Sair
                          </button>
                        </>
                        ) : (
                          <>
                            <Link
                              href="/login"
                              className="px-6 py-3 rounded-[10px] bg-[transparent] border-solid border-2 border-[#CA9C60] text-[#CA9C60] text-[20px] hover:bg-[#CA9C60] text-center hover:text-white duration-200 cursor-pointer"
                            >
                              Entrar
                            </Link>
                            <Link
                              href="/register"
                              className="px-6 py-3 rounded-[10px] bg-[#CA9C60] text-white text-[20px] text-center hover:bg-[#a68050] duration-200 cursor-pointer"
                            >
                              Cadastrar-se
                            </Link>
                          </>
                        )}
            </div>
          </div> 
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
