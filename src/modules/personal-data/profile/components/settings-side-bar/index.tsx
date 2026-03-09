"use client"

import ProfileImageUpload from "../profile-image-upload"
import SidebarItem from "../side-bar-item"
import LogoutButton from "../logout-btn"
import { User, Users, FileText, Delete } from "lucide-react"

export default function SettingsSidebar({ cargo, onItemClick }: {cargo: string; onItemClick?: () => void}) {
  return (
    // O container branco já é definido no layout, este é o conteúdo
    <div className="w-full bg-white rounded-2xl shadow-sm p-4 sm:p-6 lg:p-10 flex flex-col gap-6 sm:gap-8 min-h-auto lg:min-h-175">
      {/* Seção de Alterar Imagem */}
      <ProfileImageUpload />
      
      {/* Divisor */}
      <hr className="border-gray-200" />
      
      {/* Itens de Navegação */}
      <nav className="flex flex-col gap-4 sm:gap-6">
        <div onClick={onItemClick}>
          <SidebarItem
            href="/profile"
            icon={<User className="text-brand-teal-dark" />} // Ícone com cor
            text="Dados pessoais"
          />
        </div>
        {/* <SidebarItem
          href="/profile/social" // Rota de exemplo
          icon={<Users />}
          text="Perfil social"
        />
        <SidebarItem
          href="/profile/solicitacoes" // Rota de exemplo
          icon={<FileText />}
          text="Solicitações"
        /> */}
        {cargo === 'aluno' && (
          <div onClick={onItemClick}>
            <SidebarItem
              href='/profile/become-professor'
              icon={<FileText />}
              text="Tornar-se Professor"
            />
          </div>
        )}
        {/* <SidebarItem
          href='' //criar modal de confirmação
          icon={<Delete />}
          text="Excluir conta"
        /> */}
      </nav>

      {/* Espaçador */}
      <div className="grow hidden lg:block"></div>

      {/* Botão de Sair */}
      <LogoutButton />
    </div>
  )
}