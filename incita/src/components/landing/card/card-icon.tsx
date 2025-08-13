import type { ReactNode } from "react"

interface CardIconProps {
  children: ReactNode
  backgroundColor?: string
}

export function CardIcon({ children, backgroundColor = "bg-[#e8f1f1]" }: CardIconProps) {
  return (
    <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${backgroundColor}`}>{children}</div>
  )
}
