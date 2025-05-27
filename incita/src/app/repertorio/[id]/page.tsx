"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Bookmark, ThumbsUp, Share2, BookOpen, FileText, Quote, User } from "lucide-react"
import { useRepertorio } from "@/../contexts/repertorio-context"
import type { Repertorio } from "@/../types/repertorio"

export default function RepertorioDetalhes() {
  const params = useParams()
  const router = useRouter()
  const { repertorios, toggleFavorito, favoritos } = useRepertorio()
  const [repertorio, setRepertorio] = useState<Repertorio | null>(null)
  const [likes, setLikes] = useState(200)
  const [isLiked, setIsLiked] = useState(false)
  const [loading, setLoading] = useState(true)

  const id = params.id as string

  useEffect(() => {
    const rep = repertorios.find((r) => r.id === id)
    if (rep) {
      setRepertorio(rep)
    } else {
      // Repertório não encontrado, redirecionar para a página inicial
      router.push("/")
    }
    setLoading(false)
  }, [id, repertorios, router])

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1))
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: getTitle(),
          text: getDescription(),
          url: window.location.href,
        })
      } catch (error) {
        console.log("Erro ao compartilhar:", error)
      }
    } else {
      // Fallback: copiar URL para clipboard
      navigator.clipboard.writeText(window.location.href)
      alert("Link copiado para a área de transferência!")
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Carregando...</div>
      </main>
    )
  }

  if (!repertorio) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Repertório não encontrado</p>
          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
          >
            Voltar ao início
          </button>
        </div>
      </main>
    )
  }

  const isFavorito = favoritos.includes(repertorio.id)

  const getCategoryColor = (categoria: string) => {
    const colors = {
      Filosofia: "bg-blue-100 text-blue-800 border-blue-200",
      Sociologia: "bg-green-100 text-green-800 border-green-200",
      História: "bg-purple-100 text-purple-800 border-purple-200",
      Literatura: "bg-orange-100 text-orange-800 border-orange-200",
      Ciência: "bg-cyan-100 text-cyan-800 border-cyan-200",
      Tecnologia: "bg-gray-100 text-gray-800 border-gray-200",
      Atualidades: "bg-red-100 text-red-800 border-red-200",
      Outro: "bg-yellow-100 text-yellow-800 border-yellow-200",
    }
    return colors[categoria as keyof typeof colors] || colors["Outro"]
  }

  const getModeloIcon = (modelo: string) => {
    switch (modelo) {
      case "obra":
        return BookOpen
      case "artigo":
        return FileText
      case "citacao":
        return Quote
      default:
        return BookOpen
    }
  }

  const getModeloLabel = (modelo: string) => {
    switch (modelo) {
      case "obra":
        return "Obra"
      case "artigo":
        return "Artigo"
      case "citacao":
        return "Citação"
      default:
        return "Obra"
    }
  }

  const getTitle = () => {
    switch (repertorio.modelo) {
      case "obra":
        return repertorio.titulo
      case "artigo":
        return repertorio.titulo
      case "citacao":
        return `Citação de ${repertorio.autoria}`
      default:
        return "Repertório"
    }
  }

  const getDescription = () => {
    switch (repertorio.modelo) {
      case "obra":
        return repertorio.sinopse.substring(0, 150) + "..."
      case "artigo":
        return repertorio.sintese.substring(0, 150) + "..."
      case "citacao":
        return repertorio.citacao.substring(0, 150) + "..."
      default:
        return ""
    }
  }

  const renderContent = () => {
    const ModeloIcon = getModeloIcon(repertorio.modelo)

    switch (repertorio.modelo) {
      case "obra":
        return (
          <div className="space-y-6">
            {/* Cabeçalho */}
            <div className="text-center border-b border-[#CA9C60] pb-6">
              <div className="flex items-center justify-center mb-4">
                <ModeloIcon size={32} className="text-[#CA9C60] mr-3" />
                <span className="text-lg font-medium text-[#CA9C60]">{getModeloLabel(repertorio.modelo)}</span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{repertorio.titulo}</h1>
              <p className="text-xl text-gray-600">Por {repertorio.autoria}</p>
            </div>

            {/* Sinopse */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Sinopse</h2>
              <p className="text-gray-700 leading-relaxed text-lg">{repertorio.sinopse}</p>
            </div>

            {/* Fonte */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Fonte</h2>
              <p className="text-gray-600 italic">{repertorio.fonte}</p>
            </div>
          </div>
        )

      case "artigo":
        return (
          <div className="space-y-6">
            {/* Cabeçalho */}
            <div className="text-center border-b border-[#CA9C60] pb-6">
              <div className="flex items-center justify-center mb-4">
                <ModeloIcon size={32} className="text-[#CA9C60] mr-3" />
                <span className="text-lg font-medium text-[#CA9C60]">{getModeloLabel(repertorio.modelo)}</span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{repertorio.titulo}</h1>
              <p className="text-xl text-gray-600">Por {repertorio.autoria}</p>
            </div>

            {/* Síntese */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Síntese</h2>
              <p className="text-gray-700 leading-relaxed text-lg">{repertorio.sintese}</p>
            </div>

            {/* Fonte */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Fonte</h2>
              <p className="text-gray-600 italic">{repertorio.fonte}</p>
            </div>
          </div>
        )

      case "citacao":
        return (
          <div className="space-y-6">
            {/* Cabeçalho */}
            <div className="text-center border-b border-[#CA9C60] pb-6">
              <div className="flex items-center justify-center mb-4">
                <ModeloIcon size={32} className="text-[#CA9C60] mr-3" />
                <span className="text-lg font-medium text-[#CA9C60]">{getModeloLabel(repertorio.modelo)}</span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{repertorio.autoria}</h1>
            </div>

            {/* Citação */}
            <div className="bg-gray-50 border-l-4 border-[#CA9C60] p-8 rounded-r-lg">
              <blockquote className="text-2xl text-gray-800 italic leading-relaxed">"{repertorio.citacao}"</blockquote>
            </div>

            {/* Fonte */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Fonte</h2>
              <p className="text-gray-600 italic">{repertorio.fonte}</p>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header fixo */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              Voltar
            </button>

            <div className="flex items-center space-x-4">
              <button
                onClick={handleShare}
                className="flex items-center px-3 py-2 text-gray-600 hover:text-[#CA9C60] transition-colors"
                title="Compartilhar"
              >
                <Share2 size={18} className="mr-1" />
                Compartilhar
              </button>
              <button
                onClick={() => toggleFavorito(repertorio.id)}
                className={`flex items-center px-3 py-2 transition-colors ${
                  isFavorito ? "text-blue-600 hover:text-blue-700" : "text-gray-600 hover:text-blue-600"
                }`}
                title={isFavorito ? "Remover dos favoritos" : "Adicionar aos favoritos"}
              >
                <Bookmark size={18} className="mr-1" />
                {isFavorito ? "Favoritado" : "Favoritar"}
              </button>
              <button
                onClick={handleLike}
                className={`flex items-center px-3 py-2 transition-colors ${
                  isLiked ? "text-blue-600 hover:text-blue-700" : "text-gray-600 hover:text-blue-600"
                }`}
                title="Curtir"
              >
                <ThumbsUp size={18} className="mr-1" />
                {likes}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Card principal */}
          <div className="bg-white rounded-lg shadow-lg border-l-4 border-l-[#CA9C60] overflow-hidden">
            {/* Informações do autor */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center mr-3">
                    <User size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Nome do Usuário</p>
                    <p className="text-sm text-gray-600">Publicado em {new Date().toLocaleDateString("pt-BR")}</p>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex gap-2">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(repertorio.categoria)}`}
                  >
                    #{repertorio.categoria}
                  </span>
                </div>
              </div>
            </div>

            {/* Conteúdo */}
            <div className="p-8">
              {renderContent()}

              {/* Tags do repertório */}
              {repertorio.tags && repertorio.tags.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {repertorio.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Estatísticas */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center space-x-6">
                    <span className="flex items-center">
                      <ThumbsUp size={16} className="mr-1" />
                      {likes} curtidas
                    </span>
                    <span className="flex items-center">
                      <Bookmark size={16} className="mr-1" />
                      {repertorio.comentarios} comentários
                    </span>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      repertorio.isPublico ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {repertorio.isPublico ? "Público" : "Privado"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Seção de comentários (placeholder) */}
          <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Comentários ({repertorio.comentarios})</h3>
            <div className="text-center py-8 text-gray-500">
              <p>Seção de comentários em desenvolvimento</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
