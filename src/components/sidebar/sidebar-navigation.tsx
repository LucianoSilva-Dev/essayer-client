import Link from "next/link"
import { motion } from "framer-motion"

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
          <li key={item.href}>
            <Link
              href={item.href}
              className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${
                isActive ? "bg-[#075F70] text-white" : "text-[#898787] hover:bg-gray-400/40 hover:text-gray-500"
              }`}
            >
              <Icon size={24} className="flex-shrink-0" />
              <motion.span
                className="ml-3 whitespace-nowrap overflow-hidden"
                initial={{ opacity: 0, width: 0 }}
                animate={{
                  opacity: isExpanded ? 1 : 0,
                  width: isExpanded ? "auto" : 0,
                }}
                transition={{ duration: 0.3, delay: isExpanded ? 0.1 : 0 }}
              >
                {item.label}
              </motion.span>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}