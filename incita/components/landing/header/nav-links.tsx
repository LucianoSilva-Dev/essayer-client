//Precisa ser adicionada a fonte poppins
import { NavItem } from "./nav-item"

export function NavLinks() {
  const links = [
    { href: "#inicio", label: "Início" },
    { href: "#topicos", label: "Tópicos" },
    { href: "#repertorios", label: "Repertórios" },
    { href: "#como-funciona", label: "Como funciona" },
    { href: "#sobre", label: "Sobre" },
  ]

  return (
    <nav className="hidden md:flex items-center space-x-8">
      {links.map((link) => (
        <NavItem key={link.href} href={link.href} label={link.label} />
      ))}
    </nav>
  )
}
