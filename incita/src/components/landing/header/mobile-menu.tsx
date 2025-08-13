"use client"

import { Menu } from "lucide-react"
import { Button } from "../ui/button"

interface MobileMenuProps {
  onClick: () => void
}


export function MobileMenu({ onClick }: MobileMenuProps) {
  return (
    <Button variant="ghost" size="lg" className="md:hidden [&_svg:not([class*='size-'])]:size-8" onClick={onClick}>
      <Menu size={25} className=""/>
      <span className="sr-only">Abrir menu</span>
    </Button>
  )
}
