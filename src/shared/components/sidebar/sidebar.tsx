"use client"

import { useState } from "react"
import { useAuth } from "../../contexts/auth-context"
import { usePathname } from "next/navigation"
import { SidebarDesktop } from "./sidebar-desktop"

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false)
  const { isLoggedIn, userData } = useAuth()
  const pathname = usePathname()

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