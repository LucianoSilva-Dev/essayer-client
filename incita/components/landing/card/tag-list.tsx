import type { ReactNode } from "react"

interface TagListProps {
  children: ReactNode
}

export function TagList({ children }: TagListProps) {
  return <div className="flex flex-wrap gap-2">{children}</div>
}
