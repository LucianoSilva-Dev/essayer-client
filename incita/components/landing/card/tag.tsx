import type { ReactNode } from "react"

interface TagProps {
  children: ReactNode
}

export function Tag({ children }: TagProps) {
  return (
    <span className="rounded-full bg-gray-200 px-4 py-1 text-sm text-gray-800 transition-colors hover:bg-gray-300">
      {children}
    </span>
  )
}
