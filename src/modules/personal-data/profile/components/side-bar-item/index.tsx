"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
// Importa React, cloneElement e o tipo ReactElement
import React, { cloneElement, type ReactElement } from "react"

interface SidebarItemProps {
  href: string
  icon: React.ReactElement<{ className?: string }>;
  text: string
}

export default function SidebarItem({ href, icon, text }: SidebarItemProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  const activeClasses = "text-brand-teal-dark font-semibold bg-brand-teal-dark/5"
  const inactiveClasses = "text-[#898787] font-medium hover:text-neutral-dark hover:bg-gray-50"

  let iconWithClassName = icon // Define um ícone padrão

  // Verificamos se é um elemento válido antes de clonar
  if (React.isValidElement(icon)) {
    // Corrigido: O nome da variável agora é válido
    iconWithClassName = cloneElement(icon, {
      // Aplicamos as classes de tamanho e cor
      className: `h-6 w-6 sm:h-7 sm:w-7 group-hover:text-neutral-dark ${isActive ? "text-brand-teal-dark" : "text-[#898787]"}`,
    })
  }

  return (
    <Link
      href={href}
      className={`group flex items-center gap-3 sm:gap-5 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-all duration-200 ${isActive ? activeClasses : inactiveClasses}`}
    >
      {iconWithClassName}
      <span className="text-lg sm:text-2xl lg:text-3xl">{text}</span>
    </Link>
  )
}