import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

interface NavigationItem {
  icon: any
  label: string
  href: string
  roles: string[] | null
}

interface SidebarNavigationProps {
  items: NavigationItem[]
  isExpanded: boolean
  pathname: string
}

export function SidebarNavigation({ items, isExpanded, pathname }: SidebarNavigationProps) {
  return (
    <ul className="space-y-2">
      {items.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href

        return (
          <li key={item.href} className="relative">
            <Link
              href={item.href}
              className={`relative flex items-center p-3 rounded-lg transition-colors duration-200 ${
                isActive
                  ? "text-[#075F70]"
                  : "text-[#898787] hover:bg-gray-400/40 hover:text-gray-500"
              }`}
            >
              {/* barra lateral animada */}
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute left-0 top-0 bottom-0 w-1 bg-[#075F70] rounded-r-full"
                  transition={{ type: "spring", stiffness: 500, damping: 40 }}
                />
              )}

              {/* ícone sempre fixo */}
              <Icon size={24} className="flex-shrink-0" />

              {/* texto com AnimatePresence */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.span
                    key="label"
                    className="ml-3 whitespace-nowrap"
                    initial={{ opacity: 0, x: -30, width: 0 }}
                    animate={{ opacity: 1, x: 0, width: "auto" }}
                    exit={{ opacity: 0, x: -30, width: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
