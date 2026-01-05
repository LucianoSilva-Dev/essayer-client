import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

interface SidebarLogoProps {
  isExpanded: boolean
}

export function SidebarLogo() {
  return (
    <div className="p-4">
      <Link href="/home" className="flex items-center justify-center w-9">
        <div className="relative h-20 w-20 flex-shrink-0">
          <Image src="/icons/favicon.ico" alt="Logo" fill className="object-contain" priority />
        </div>
      </Link>
    </div>
  )
}