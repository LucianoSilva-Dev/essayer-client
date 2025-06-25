//Precisa ser adicionada a fonte poppins
import { useAuth } from "@/../contexts/auth-context" // 1. Importar o hook
import { NavItem } from "./nav-item"

export function NavLinks() {
  const { isLoggedIn, userData } = useAuth() // 2. Obter os dados de autenticação e do usuário

  const allLinks = [
    { href: "/main", label: "Início" },
    { href: "/main", label: "Repertórios" },
      //Condição adicionada com base nas roles do usuário
    { href: "/adicionar", label: "Adicionar Repertório", roles: ['professor', 'admin'] },
    { href: "/admin", label: "Admin", roles: 'admin' },
  ]

  // 3. Filtrar os links com base no cargo do usuário
  const filteredLinks = allLinks.filter(link => {
    if (link.roles) {
      // Se o link tem roles, o usuário precisa estar logado e ter um cargo compatível
      return isLoggedIn && userData && link.roles.includes(userData.cargo)
    }
    // Se o link não tem roles, ele é público
    return true
  })

  return (
    <nav className="hidden md:flex items-center space-x-8">
      {/* 4. Mapear os links filtrados */}
      {filteredLinks.map((link) => (
        <NavItem href={link.href} label={link.label} />
      ))}
    </nav>
  )
}