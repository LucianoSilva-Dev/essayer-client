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

  const activeClasses = "text-[#075F70] font-semibold"
  const inactiveClasses = "text-[#898787] font-medium hover:text-[#3C3C3C]"

  let iconWithClassName = icon // Define um ícone padrão

  // Verificamos se é um elemento válido antes de clonar
  if (React.isValidElement(icon)) {
    // Corrigido: O nome da variável agora é válido
    iconWithClassName = cloneElement(icon, {
      // Aplicamos as classes de tamanho e cor
      className: `h-8 w-8 group-hover:text-[#3C3C3C] ${isActive ? "text-[#075F70]" : "text-[#898787]"}`,
    })
  }

  return (
    <Link
      href={href}
      className={`group flex items-center gap-5 p-2 rounded-lg transition-colors ${isActive ? activeClasses : inactiveClasses}`}
    >
      {iconWithClassName}
      <span className="text-3xl">{text}</span>
    </Link>
  )
}