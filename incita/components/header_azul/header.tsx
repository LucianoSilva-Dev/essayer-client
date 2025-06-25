"use client"

import { Logo } from "./logo"
import { NavLinks } from "./nav-links"
import { AuthButtons } from "./auth-buttons"
import { MobileMenu } from "./mobile-menu"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation" // Importa o hook

export function HeaderAzul() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname() // Obtém o pathname atual

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
              <div className="flex flex-col space-y-4">
                <div className="flex flex-col space-y-2 pt-2">
                  <a
                    href="/login"
                    className="px-6 py-2 rounded-[10px] bg-[transparent] text-base font-medium border-2 border-[#CA9C60] text-[#CA9C60] text-center"
                  >
                    Entrar
                  </a>
                  <a
                    href="/register"
                    className="px-6 py-2 rounded-[10px] text-base font-medium bg-[#CA9C60] text-white text-center"
                  >
                    Cadastrar-se
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}