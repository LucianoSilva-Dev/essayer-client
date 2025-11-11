"use client"

import ProfileImageUpload from "./ProfileImageUpload"
import SidebarItem from "./SidebarItem"
import LogoutButton from "./LogoutButton"
import { User, Users, FileText } from "lucide-react"

export default function SettingsSidebar() {
  return (
    // O container branco já é definido no layout, este é o conteúdo
    <div className="w-full bg-white rounded-2xl shadow-sm p-10 flex flex-col gap-8 min-h-[700px]">
      {/* Seção de Alterar Imagem */}
      <ProfileImageUpload />
      
      {/* Divisor */}
      <hr className="border-gray-200" />
      
      {/* Itens de Navegação */}
      <nav className="flex flex-col gap-6">
        <SidebarItem
          href="/profile"
          icon={<User className="text-[#075F70]" />} // Ícone com cor
          text="Dados pessoais"
        />
        <SidebarItem
          href="/profile/social" // Rota de exemplo
          icon={<Users />}
          text="Perfil social"
        />
        <SidebarItem
          href="/profile/solicitacoes" // Rota de exemplo
          icon={<FileText />}
          text="Solicitações"
        />
      </nav>

      {/* Espaçador */}
      <div className="flex-grow"></div>

      {/* Botão de Sair */}
      <LogoutButton />
    </div>
  )
}