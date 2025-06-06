import Link from "next/link"
import { cn } from "@/lib/utils"

interface AuthButtonProps {
  href: string
  label: string
  variant: "outline" | "solid"
}

export function AuthButton({ href, label, variant }: AuthButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "px-6 py-2 rounded-xl text-xl font-medium transition-colors duration-400",
        variant === "outline"
          ? "bg-yellow-700 text-white hover:bg-amber-500"
          : "bg-yellow-700 text-white hover:bg-amber-500",
      )}
    >
      {label}
    </Link>
  )
}
