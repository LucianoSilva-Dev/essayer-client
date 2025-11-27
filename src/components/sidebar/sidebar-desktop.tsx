import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Home, PenTool, Users, UsersRound, Info, Settings, MessageCircleQuestion, SquarePlus } from "lucide-react"
import { SidebarLogo } from "./sidebar-logo"
import { SidebarNavigation } from "./sidebar-navigation"
import { SidebarBottomItems } from "./sidebar-bottom-items"

interface SidebarDesktopProps {
  isExpanded: boolean
  setIsExpanded: (expanded: boolean) => void
  isLoggedIn: boolean
  userData: any
  pathname: string
}

const navigationItems = [
  {
    icon: Home,
    label: "Início",
    href: "/main",
    roles: null,
  },
  {
    icon: PenTool,
    label: "Praticar redação",
    href: "/praticar_redacao",
    roles: null,
  },
  {
    icon: SquarePlus,
    label: "Adicionar repertório",
    href: "/adicionar",
    roles: ["professor", "admin"],
  },
  {
    icon: UsersRound,
    label: "Turmas membro",
    href: "/turmas_aluno",
    roles: ["aluno", "professor", "admin"],
  },
  {
    icon: Users,
    label: "Turmas criadas",
    href: "/turmas_professor",
    roles: ["professor", "admin"],
  },
  {
    icon: Settings,
    label: "Admin",
    href: "/admin",
    roles: ["admin"],
  },
]

const bottomItems = [

  {
    icon: MessageCircleQuestion,
    label: "FAQ",
    href: "/faq",
    roles: null,
  }
]

export function SidebarDesktop({
  isExpanded,
  setIsExpanded,
  isLoggedIn,
  userData,
  pathname
}: SidebarDesktopProps) {
  const filteredNavItems = navigationItems.filter((item) => {
    if (item.roles) {
      return isLoggedIn && userData && item.roles.includes(userData.cargo)
    }
    return true
  })

  return (
    <motion.aside
      className="fixed left-4 h-[calc(100vh-40px)] mt-4 mb-5 rounded-[20px] bg-[#FFF] z-50 hidden md:flex flex-col justify-between shadow-lg"
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