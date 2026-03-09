import { motion } from "framer-motion"
import { SidebarLogo } from "./sidebar-logo"
import { SidebarNavigation } from "./sidebar-navigation"
import { SidebarBottomItems } from "./sidebar-bottom-items"
import { navigationItems } from "./constants/navigationItems"
import { bottomItems } from "./constants/bottomItems"
import { UserLoginResponse } from "@/lib/apiCalls/auth/types"

interface SidebarDesktopProps {
  isExpanded: boolean
  setIsExpanded: (expanded: boolean) => void
  isLoggedIn: boolean
  userData: UserLoginResponse | null
  pathname: string
}

export function SidebarDesktop({
  isExpanded,
  setIsExpanded,
  isLoggedIn,
  userData,
  pathname
}: SidebarDesktopProps) {
  const filteredNavItems = navigationItems.filter(( item) => {
    if (item.roles) {
      return isLoggedIn && userData && item.roles.includes(userData.role)
    }
    return true
  })

  return (
    <motion.aside
      className="fixed left-4 h-[calc(100vh-40px)] mt-4 mb-5 rounded-[20px] bg-[#FFF] z-50 hidden md:flex flex-col justify-between shadow-lg select-none"
      initial={{ width: 70 }}
      animate={{ width: isExpanded ? 240 : 70 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <SidebarLogo />

      <nav className="flex-1 px-2">
        <SidebarNavigation
          items={filteredNavItems}
          isExpanded={isExpanded}
          pathname={pathname}
        />
      </nav>

      <div className="p-2">
        <SidebarBottomItems
          items={bottomItems}
          isExpanded={isExpanded}
        />
      </div>
    </motion.aside>
  )
}