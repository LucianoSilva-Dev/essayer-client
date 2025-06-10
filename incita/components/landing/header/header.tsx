"use client"

import { Logo } from "./logo"
import { NavLinks } from "./nav-links"
import { AuthButtons } from "./auth-buttons"
import { MobileMenu } from "./mobile-menu"
import { useState } from "react"

export function HeaderLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="fixed top-0 w-full bg-white z-50 border-b rounded-b-[2em]">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Logo />

        <div className="hidden md:flex items-center justify-between flex-1 ml-8">
          <NavLinks />
          <AuthButtons />
        </div>

        <MobileMenu onClick={toggleMenu} />

        {isMenuOpen && (
          <div className="absolute top-20 left-0 right-0 bg-white z-50 p-4 shadow-md md:hidden">
            <div className="flex flex-col space-y-4">
              <a href="/" className="text-gray-800 text-lg font-medium">
                Início
              </a>
              <a href="/repertorio" className="text-gray-800 text-lg font-medium">
                Repertórios
              </a>
              <a href="/como-funciona" className="text-gray-800 text-lg font-medium">
                Adicionar Repertório
              </a>
              <div className="flex flex-col space-y-2 pt-2">
                <a
                  href="/login"
                  className="px-6 py-2 rounded-full text-base font-medium border border-amber-400 text-amber-400 text-center"
                >
                  Entrar
                </a>
                <a
                  href="/register"
                  className="px-6 py-2 rounded-full text-base font-medium bg-amber-400 text-white text-center"
                >
                  Cadastrar-se
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
