// import Link from "next/link"
// import { Home, PenTool, Users, UsersRound, Info, Settings, MessageCircleQuestion, SquarePlus } from "lucide-react"
import { UserLoginResponse } from "@/lib/apiCalls/auth/types"

interface SidebarMobileProps {
  isLoggedIn: boolean;
  userData: UserLoginResponse | null;
  pathname: string;
}

// const navigationItems = [
//   {
//     icon: Home,
//     label: "Início",
//     href: "/home",
//     roles: null,
//   },
//   {
//     icon: PenTool,
//     label: "Praticar redação",
//     href: "/praticar_redacao",
//     roles: null
//   },
//   {
//     icon: SquarePlus,
//     label: "Adicionar repertório",
//     href: "/adicionar",
//     roles: ["professor", "admin"],
//   },
//   {
//     icon: Users,
//     label: "Turmas",
//     href: "/admin",
//     roles: ["admin"],
//   },
// ]

// export function SidebarMobile({ isLoggedIn, userData, pathname }: SidebarMobileProps) {
//   const filteredNavItems = navigationItems.filter((item) => {
//     if (item.roles) {
//       return isLoggedIn && userData && item.roles.includes(userData.role)
//     }
//     return true
//   })

//   return (
//     <nav className="fixed bottom-0 left-0 right-0 bg-brand-teal-dark z-50 md:hidden border-t border-white/10">
//       <div className="flex justify-around items-center py-2">
//         {filteredNavItems.slice(0, 3).map((item) => {
//           const Icon = item.icon
//           const isActive = pathname === item.href

//           return (
//             <Link
//               key={item.href}
//               href={item.href}
//               className={`flex flex-col items-center p-2 rounded-lg transition-colors duration-200 ${
//                 isActive ? "text-[#CA9C60]" : "text-white/80"
//               }`}
//             >
//               <Icon size={20} />
//               <span className="text-xs mt-1">{item.label}</span>
//             </Link>
//           )
//         })}
//       </div>
//     </nav>
//   )
// }

export function SidebarMobile() {
  return null
}