"use client"

import React from "react"
import { ArrowLeft, Edit3, EyeOff, Eye, User, HelpCircle, LogOut } from "lucide-react"
import { useState } from "react"

export default function Component() {
  const [isEditing, setIsEditing] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen bg-[#f1f1f2]">
      {/* Header */}
      <header className="bg-[#075f70] text-white px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-8">
            <div className="w-12 h-12 bg-[#e5eff0] rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-[#075f70] rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-[#e5eff0] rounded-full"></div>
              </div>
            </div>
            <nav className="flex space-x-8">
              <a href="#" className="text-white hover:text-[#e5eff0] transition-colors">
                Início
              </a>
              <a href="#" className="text-white hover:text-[#e5eff0] transition-colors">
                Adicionar repertório
              </a>
              <a href="#" className="text-white hover:text-[#e5eff0] transition-colors">
                Praticar redação
              </a>
            </nav>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-white">Olá, Nome</span>
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-[#075f70]" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Top Section */}
        <div className="flex items-center justify-between mb-8">
          <button className="flex items-center space-x-2 text-[#616060] hover:text-[#363535] transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-lg font-medium">Voltar</span>
          </button>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <HelpCircle className="w-5 h-5 text-[#616060]" />
              <span className="text-[#363535] font-medium">Status atual da conta</span>
              <span className="bg-[#ca9c60] text-white px-3 py-1 rounded-md text-sm font-medium">Reprovado</span>
            </div>
            <button className="text-[#616060] hover:text-[#363535] transition-colors text-sm">
              Ver mensagem de retorno
            </button>
          </div>
        </div>

        {/* Edit Profile Section */}
        <div className="bg-white rounded-lg p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <Edit3 className="w-6 h-6 text-[#363535]" />
              <h1 className="text-2xl font-semibold text-[#363535]">{isEditing ? "Editando dados" : "Editar dados"}</h1>
            </button>

            {isEditing && (
              <button
                className="bg-[#075f70] hover:bg-[#075f70]/90 text-white px-6 py-2 rounded-md font-medium"
                onClick={() => setIsEditing(false)}
              >
                Salvar
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Profile Image */}
            <div className="flex justify-center lg:justify-start">
              <div className="w-80 h-80 bg-[#dcdcdd] rounded-full"></div>
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="nome" className="text-[#363535] font-medium text-lg">
                    Nome
                  </label>
                  <input
                    id="nome"
                    placeholder="Nome"
                    className={`bg-[#e5eff0] border-0 text-[#616060] h-12 rounded-md ${!isEditing ? "cursor-not-allowed" : ""}`}
                    readOnly={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="curriculo" className="text-[#363535] font-medium text-lg">
                    Currículo Lattes
                  </label>
                  <input
                    id="curriculo"
                    defaultValue="link.com"
                    className="bg-[#e5eff0] border-0 text-[#616060] h-12 rounded-md cursor-not-allowed"
                    readOnly
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="sobrenome" className="text-[#363535] font-medium text-lg">
                    Sobrenome
                  </label>
                  <input
                    id="sobrenome"
                    placeholder="Sobrenome"
                    className={`bg-[#e5eff0] border-0 text-[#616060] h-12 rounded-md ${!isEditing ? "cursor-not-allowed" : ""}`}
                    readOnly={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-[#363535] font-medium text-lg">
                    Email
                  </label>
                  <input
                    id="email"
                    defaultValue="xablaueusoouomagopa@gmail.com"
                    className="bg-[#e5eff0] border-0 text-[#616060] h-12 rounded-md cursor-not-allowed"
                    readOnly
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="senha" className="text-[#363535] font-medium text-lg">
                    Senha
                  </label>
                  <div className="relative">
                    <input
                      id="senha"
                      type={showPassword ? "text" : "password"}
                      value={showPassword ? "minhasenhasecreta" : "••••••••••••"}
                      className="bg-[#e5eff0] border-0 text-[#616060] h-12 rounded-md pr-12 cursor-not-allowed"
                      readOnly
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:opacity-70 transition-opacity"
                    >
                      {showPassword ? (
                        <Eye className="w-5 h-5 text-[#616060]" />
                      ) : (
                        <EyeOff className="w-5 h-5 text-[#616060]" />
                      )}
                    </button>
                  </div>
                </div>
                <button className="bg-[#075f70] hover:bg-[#075f70]/90 text-white px-6 py-3 rounded-md font-medium">
                  Redefinir Senha
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Exit button */}
        <div className="flex justify-end mt-8">
          <button className="bg-[#ca9c60] hover:bg-[#ca9c60]/90 text-white px-8 py-3 rounded-md font-medium flex items-center space-x-2">
            <span>Sair</span>
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
