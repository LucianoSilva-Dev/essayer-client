import type { ReactNode } from "react"

interface CardTitleProps {
  children: ReactNode
}

export function CardTitle({ children }: CardTitleProps) {
  return <h2 className="mb-2 text-2xl font-bold text-black">{children}</h2>
}
