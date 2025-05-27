"use client"

import type React from "react"

import { useState } from "react"
import {
  User,
  Mail,
  School,
  GraduationCap,
  Edit3,
  Camera,
  Trophy,
  BookOpen,
  Heart,
  Quote,
  PenTool,
  Star,
  Calendar,
  Clock,
} from "lucide-react"
import type { AlunoProfile } from "@/../types/profile"

interface AlunoProfileProps {
  profile: AlunoProfile
  onEdit: () => void
  onAvatarUpload: (file: File) => void
  isLoading: boolean
}

export default function AlunoProfileComponent({ profile, onEdit, onAvatarUpload, isLoading }: AlunoProfileProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "stats" | "achievements">("overview")

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onAvatarUpload(file)
    }
  }

  const getNivelColor = (nivel: string) => {
    switch (nivel) {
      case "iniciante":
        return "bg-green-100 text-green-800 border-green-200"
      case "intermediario":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "avancado":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getNivelLabel = (nivel: string) => {
    switch (nivel) {
      case "iniciante":
        return "Iniciante"
      case "intermediario":
        return "Intermediário"
      case "avancado":
        return "Avançado"
      default:
        return "Não definido"
    }
  }

  const getSerieLabel = (serie: string) => {
    const series: Record<string, string> = {
      "6ano": "6º Ano",
      "7ano": "7º Ano",
      "8ano": "8º Ano",
      "9ano": "9º Ano",
      "1medio": "1º Ano - Ensino Médio",
      "2medio": "2º Ano - Ensino Médio",
      "3medio": "3º Ano - Ensino Médio",
      superior: "Ensino Superior",
      pos: "Pós-graduação",
    }
    return series[serie] || serie
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header do Perfil */}
      <div className="bg-white rounded-lg shadow-lg border-l-4 border-l-[#CA9C60] overflow-hidden">
        <div className="bg-gradient-to-r from-[#CA9C60] to-[#B8935A] p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
                  {profile.avatar ? (
                    <img
                      src={profile.avatar || "/placeholder.svg"}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User size={40} className="text-white" />
                  )}
                </div>
                <label className="absolute bottom-0 right-0 bg-white text-gray-700 rounded-full p-2 cursor-pointer hover:bg-gray-100 transition-colors">
                  <Camera size={16} />
                  <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
                </label>
              </div>

              {/* Informações Básicas */}
              <div>
                <h1 className="text-3xl font-bold">
                  {profile.nome} {profile.sobrenome}
                </h1>
                <p className="text-white/80 text-lg">Estudante</p>
                <div className="flex items-center space-x-4 mt-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getNivelColor(profile.nivel)}`}>
                    {getNivelLabel(profile.nivel)}
                  </span>
                  <span className="text-white/80 text-sm">Pontuação: {profile.estatisticas.pontuacao}</span>
                </div>
              </div>
            </div>

            <button
              onClick={onEdit}
              disabled={isLoading}
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
            >
              <Edit3 size={18} />
              <span>Editar Perfil</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: "overview", label: "Visão Geral", icon: User },
              { id: "stats", label: "Estatísticas", icon: Star },
              { id: "achievements", label: "Conquistas", icon: Trophy },
            ].map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? "border-[#CA9C60] text-[#CA9C60]"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Icon size={18} />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Conteúdo das Tabs */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Informações Pessoais */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Informações Pessoais</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Mail className="text-[#CA9C60]" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{profile.email}</p>
                  </div>
                </div>

                {profile.escola && (
                  <div className="flex items-center space-x-3">
                    <School className="text-[#CA9C60]" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">Escola</p>
                      <p className="font-medium">{profile.escola}</p>
                    </div>
                  </div>
                )}

                {profile.serie && (
                  <div className="flex items-center space-x-3">
                    <GraduationCap className="text-[#CA9C60]" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">Série</p>
                      <p className="font-medium">{getSerieLabel(profile.serie)}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-3">
                  <Calendar className="text-[#CA9C60]" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Membro desde</p>
                    <p className="font-medium">{formatDate(profile.dataCadastro)}</p>
                  </div>
                </div>
              </div>

              {profile.bio && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Sobre mim</h3>
                  <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
                </div>
              )}
            </div>

            {/* Metas Mensais */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Metas do Mês</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Repertórios Criados</span>
                    <span className="text-sm text-gray-500">
                      {profile.estatisticas.repertoriosCriados} / {profile.metasMensais.repertorios}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#CA9C60] h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.min((profile.estatisticas.repertoriosCriados / profile.metasMensais.repertorios) * 100, 100)}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Redações Escritas</span>
                    <span className="text-sm text-gray-500">
                      {profile.estatisticas.redacoesEscritas} / {profile.metasMensais.redacoes}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#CA9C60] h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.min((profile.estatisticas.redacoesEscritas / profile.metasMensais.redacoes) * 100, 100)}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar com Estatísticas Rápidas */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Estatísticas Rápidas</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <BookOpen className="text-blue-500" size={20} />
                    <span className="text-sm text-gray-700">Repertórios</span>
                  </div>
                  <span className="font-semibold text-gray-900">{profile.estatisticas.repertoriosCriados}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Heart className="text-red-500" size={20} />
                    <span className="text-sm text-gray-700">Favoritos</span>
                  </div>
                  <span className="font-semibold text-gray-900">{profile.estatisticas.repertoriosFavoritos}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Quote className="text-green-500" size={20} />
                    <span className="text-sm text-gray-700">Citações</span>
                  </div>
                  <span className="font-semibold text-gray-900">{profile.estatisticas.citacoesCriadas}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <PenTool className="text-purple-500" size={20} />
                    <span className="text-sm text-gray-700">Redações</span>
                  </div>
                  <span className="font-semibold text-gray-900">{profile.estatisticas.redacoesEscritas}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Último Acesso</h2>
              <div className="flex items-center space-x-3">
                <Clock className="text-[#CA9C60]" size={20} />
                <div>
                  <p className="text-sm text-gray-500">Última atividade</p>
                  <p className="font-medium">{formatDate(profile.ultimoAcesso)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "stats" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <BookOpen className="mx-auto text-blue-500 mb-3" size={32} />
            <h3 className="text-2xl font-bold text-gray-900">{profile.estatisticas.repertoriosCriados}</h3>
            <p className="text-gray-600">Repertórios Criados</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Heart className="mx-auto text-red-500 mb-3" size={32} />
            <h3 className="text-2xl font-bold text-gray-900">{profile.estatisticas.repertoriosFavoritos}</h3>
            <p className="text-gray-600">Repertórios Favoritos</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Quote className="mx-auto text-green-500 mb-3" size={32} />
            <h3 className="text-2xl font-bold text-gray-900">{profile.estatisticas.citacoesCriadas}</h3>
            <p className="text-gray-600">Citações Criadas</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Star className="mx-auto text-yellow-500 mb-3" size={32} />
            <h3 className="text-2xl font-bold text-gray-900">{profile.estatisticas.pontuacao}</h3>
            <p className="text-gray-600">Pontuação Total</p>
          </div>
        </div>
      )}

      {activeTab === "achievements" && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Conquistas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {profile.conquistas.map((conquista, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg"
              >
                <Trophy className="text-yellow-600" size={24} />
                <span className="font-medium text-gray-900">{conquista}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
