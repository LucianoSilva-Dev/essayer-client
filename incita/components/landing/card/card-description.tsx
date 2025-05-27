import type { ReactNode } from "react"

interface CardDescriptionProps {
  children: ReactNode
}

export function CardDescription({ children }: CardDescriptionProps) {
  return <p className="mb-6 text-gray-800">{children}</p>
}
