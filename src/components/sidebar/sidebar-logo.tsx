import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

interface SidebarLogoProps {
  isExpanded: boolean
}

export function SidebarLogo({ isExpanded }: SidebarLogoProps) {
  return (
    <div className="p-4">
      <Link href="/main" className="flex items-center justify-center">
        <div className="relative h-20 w-20 flex-shrink-0">
          <Image src="/favicon.ico" alt="Logo" fill className="object-contain" priority />
        </div>
        <motion.span
          className="ml-3 text-gray-500 font-bold text-lg whitespace-nowrap overflow-hidden"
          initial={{ opacity: 0, width: 0 }}
          animate={{
            opacity: isExpanded ? 1 : 0,
            width: isExpanded ? "auto" : 0,
          }}
          transition={{ duration: 0.3, delay: isExpanded ? 0.1 : 0 }}
        >
          Incita
        </motion.span>
      </Link>
    </div>
  )
}