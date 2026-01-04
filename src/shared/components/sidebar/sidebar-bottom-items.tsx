import Link from "next/link"
import { motion } from "framer-motion"

interface BottomItem {
  icon: any
  label: string
  href: string
  roles: string[] | null
}

interface SidebarBottomItemsProps {
  items: BottomItem[]
  isExpanded: boolean
}

export function SidebarBottomItems({ items, isExpanded }: SidebarBottomItemsProps) {
  return (
    <ul className="space-y-2">
      {items.map((item) => {
        const Icon = item.icon

        return (
          <li key={item.href}>
            <Link
              href={item.href}
              className="flex items-center p-3 rounded-lg text-[#898787] hover:bg-gray-400/30 hover:text-gray-500 transition-colors duration-200"
            >
              <Icon size={20} className="flex-shrink-0" />
              <motion.span
                className="ml-3 text-sm whitespace-nowrap overflow-hidden"
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