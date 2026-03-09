import { Home, PenTool, Users, UsersRound, Settings, SquarePlus } from "lucide-react"


export const navigationItems = [
  {
    icon: Home,
    label: "Início",
    href: "/home",
    roles: null,
  },
  {
    icon: PenTool,
    label: "Praticar redação",
    href: "/praticar_redacao",
    roles: null,
  },
  {
    icon: SquarePlus,
    label: "Adicionar repertório",
    href: "/adicionar",
    roles: ["professor", "admin"],
  },
  {
    icon: UsersRound,
    label: "Turmas membro",
    href: "/turmas_aluno",
    roles: ["student", "professor", "admin"],
  },
  {
    icon: Users,
    label: "Turmas criadas",
    href: "/turmas_professor",
    roles: ["professor", "admin"],
  },
  {
    icon: Settings,
    label: "Admin",
    href: "/admin",
    roles: ["admin"],
  },
]