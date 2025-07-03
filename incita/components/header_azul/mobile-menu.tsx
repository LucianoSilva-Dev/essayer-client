"use client"

import { Menu } from "lucide-react"
import { Button } from "../landing//ui/button"

interface MobileMenuProps {
  onClick: () => void
}

export function MobileMenu({ onClick }: MobileMenuProps) {
  return (
    <Button variant="ghost" size="icon" className="md:hidden" onClick={onClick}>
      <Menu className="h-6 w-6" />
      <span className="sr-only">Abrir menu</span>
    </Button>
  )
}
