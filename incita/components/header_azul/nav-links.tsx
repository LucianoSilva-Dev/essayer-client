//Precisa ser adicionada a fonte poppins
import { NavItem } from "./nav-item"

export function NavLinks() {
  const links = [
    { href: "/main", label: "Início" },
    { href: "/main?", label: "Repertórios" },
    { href: "/adicionar", label: "Adicionar Repertório" },
  ]

  return (
    <nav className="hidden md:flex items-center space-x-8">
      {links.map((link) => (
        <NavItem key={link.href} href={link.href} label={link.label} />
      ))}
    </nav>
  )
}
