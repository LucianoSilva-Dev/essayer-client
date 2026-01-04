"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useAuth } from "../../contexts/auth-context"
import { usePathname } from "next/navigation"
import { SidebarDesktop } from "./sidebar-desktop"
import { SidebarMobile } from "./sidebar-mobile"

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false)
  const { isLoggedIn, userData } = useAuth()
  const pathname = usePathname()

  // Não renderiza a sidebar na landing page
  if (pathname === "/landing") {
    return null
  }

  return (
    <>
      <SidebarDesktop 
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        isLoggedIn={isLoggedIn}
        userData={userData}
        pathname={pathname}
      />
    </>
  )
}