"use client"

import { Search } from "lucide-react"

interface SearchBarProps {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
}

export function SearchBar({ placeholder = "Pesquisar...", value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        type="search"
        placeholder={placeholder}
        className="h-9 w-[200px] rounded-md border border-input bg-background pl-8 pr-3 text-sm"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  )
}
