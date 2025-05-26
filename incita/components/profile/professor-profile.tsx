"use client"

import type React from "react"

import { useState } from "react"
import {
  User,
  Mail,
  Building,
  GraduationCap,
  Edit3,
  Camera,
  Award,
  Users,
  BookOpen,
  Star,
  Calendar,
  Clock,
  ExternalLink,
  CheckCircle,
  XCircle,
  Globe,
} from "lucide-react"
import type { ProfessorProfile } from "@/../types/profile"

interface ProfessorProfileProps {
  profile: ProfessorProfile
  onEdit: () => void
  onAvatarUpload: (file: File) => void
  isLoading: boolean
}

export default function ProfessorProfileComponent({
  profile,
  onEdit,
  onAvatarUpload,
  isLoading,
}: ProfessorProfileProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "stats" | "expertise">("overview")

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onAvatarUpload(file)
    }
  }

  const getTitulacaoLabel = (titulacao: string) => {
    const titulacoes: Record<string, string> = {
      graduacao: "Graduação",
      especializacao: "Especialização",
      mestrado: "Mestrado",
      doutorado: "Doutorado",
      "pos-doutorado": "Pós-Doutorado",
    }
    return titulacoes[titulacao] || titulacao
  }

  const getAreaLabel = (area: string) => {
    const areas: Record<string, string> = {
      linguagens: "Linguagens e suas Tecnologias",
      matematica: "Matemática e suas Tecnologias",
      natureza: "Ciências da Natureza e suas Tecnologias",
      humanas: "Ciências Humanas e Sociais Aplicadas",
      redacao: "Redação e Produção Textual",
      filosofia: "Filosofia",
      sociologia: "Sociologia",
      historia: "História",
      geografia: "Geografia",
      literatura: "Literatura",
      outros: "Outros",
    }
    return areas[area] || area
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} size={16} className={i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"} />
    ))
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
                  Prof. {profile.nome} {profile.sobrenome}
                </h1>
                <p className="text-white/80 text-lg">{getTitulacaoLabel(profile.titulacao)}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-1">
                    {renderStars(profile.estatisticas.notaMedia)}
                    <span className="text-white/80 text-sm ml-2">
                      {profile.estatisticas.notaMedia.toFixed(1)} ({profile.estatisticas.avaliacoes} avaliações)
                    </span>
                  </div>
                </div>
                <p className="text-white/80 text-sm mt-1">{profile.experiencia} anos de experiência</p>
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
              { id: "expertise", label: "Especialidades", icon: Award },
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
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Informações Profissionais</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Mail className="text-[#CA9C60]" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{profile.email}</p>
                  </div>
                </div>

                {profile.instituicao && (
                  <div className="flex items-center space-x-3">
                    <Building className="text-[#CA9C60]" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">Instituição</p>
                      <p className="font-medium">{profile.instituicao}</p>
                    </div>
                  </div>
                )}

                {profile.areaAtuacao && (
                  <div className="flex items-center space-x-3">
                    <GraduationCap className="text-[#CA9C60]" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">Área de Atuação</p>
                      <p className="font-medium">{getAreaLabel(profile.areaAtuacao)}</p>
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

              {/* Currículo Lattes */}
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Currículo Lattes</h3>
                <a
                  href={profile.curriculoLattes}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-[#CA9C60] hover:text-[#B8935A] transition-colors"
                >
                  <Globe size={16} className="mr-2" />
                  Visualizar Currículo Lattes
                  <ExternalLink size={14} className="ml-1" />
                </a>
              </div>

              {profile.bio && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Sobre mim</h3>
                  <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
                </div>
              )}
            </div>

            {/* Disponibilidade */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Disponibilidade</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3">
                  {profile.disponibilidade.orientacao ? (
                    <CheckCircle className="text-green-500" size={20} />
                  ) : (
                    <XCircle className="text-red-500" size={20} />
                  )}
                  <div>
                    <p className="font-medium">Orientação</p>
                    <p className="text-sm text-gray-500">
                      {profile.disponibilidade.orientacao ? "Disponível" : "Indisponível"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  {profile.disponibilidade.consultoria ? (
                    <CheckCircle className="text-green-500" size={20} />
                  ) : (
                    <XCircle className="text-red-500" size={20} />
                  )}
                  <div>
                    <p className="font-medium">Consultoria</p>
                    <p className="text-sm text-gray-500">
                      {profile.disponibilidade.consultoria ? "Disponível" : "Indisponível"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  {profile.disponibilidade.aulas ? (
                    <CheckCircle className="text-green-500" size={20} />
                  ) : (
                    <XCircle className="text-red-500" size={20} />
                  )}
                  <div>
                    <p className="font-medium">Aulas Particulares</p>
                    <p className="text-sm text-gray-500">
                      {profile.disponibilidade.aulas ? "Disponível" : "Indisponível"}
                    </p>
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
                  <span className="font-semibold text-gray-900">{profile.estatisticas.repertoriosCompartilhados}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Users className="text-green-500" size={20} />
                    <span className="text-sm text-gray-700">Alunos</span>
                  </div>
                  <span className="font-semibold text-gray-900">{profile.estatisticas.alunosOrientados}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Award className="text-purple-500" size={20} />
                    <span className="text-sm text-gray-700">Materiais</span>
                  </div>
                  <span className="font-semibold text-gray-900">{profile.estatisticas.materiaisPublicados}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Star className="text-yellow-500" size={20} />
                    <span className="text-sm text-gray-700">Avaliação</span>
                  </div>
                  <span className="font-semibold text-gray-900">{profile.estatisticas.notaMedia.toFixed(1)}</span>
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
            <h3 className="text-2xl font-bold text-gray-900">{profile.estatisticas.repertoriosCompartilhados}</h3>
            <p className="text-gray-600">Repertórios Compartilhados</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Users className="mx-auto text-green-500 mb-3" size={32} />
            <h3 className="text-2xl font-bold text-gray-900">{profile.estatisticas.alunosOrientados}</h3>
            <p className="text-gray-600">Alunos Orientados</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Award className="mx-auto text-purple-500 mb-3" size={32} />
            <h3 className="text-2xl font-bold text-gray-900">{profile.estatisticas.materiaisPublicados}</h3>
            <p className="text-gray-600">Materiais Publicados</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Star className="mx-auto text-yellow-500 mb-3" size={32} />
            <h3 className="text-2xl font-bold text-gray-900">{profile.estatisticas.notaMedia.toFixed(1)}</h3>
            <p className="text-gray-600">Avaliação Média</p>
          </div>
        </div>
      )}

      {activeTab === "expertise" && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Especialidades</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {profile.especialidades.map((especialidade, index) => (
              <div key={index} className="flex items-center space-x-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <Award className="text-blue-600" size={24} />
                <span className="font-medium text-gray-900">{especialidade}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
