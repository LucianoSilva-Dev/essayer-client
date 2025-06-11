"use client"

import { useState } from "react"
import { ThumbsUp, User, Bookmark, BookOpen, FileText, Quote, Eye } from "lucide-react"
import { useRouter } from "next/navigation"
import { useRepertorio } from "@/../contexts/repertorio-context"
import type { Repertorio } from "@/../types/repertorio"

interface RepertorioCardProps {
  repertorio: Repertorio
}

export default function RepertorioCard({ repertorio }: RepertorioCardProps) {
  const router = useRouter()
  const { toggleFavorito, favoritos } = useRepertorio()
  const [likes, setLikes] = useState(200) // Simulando likes
  const [isLiked, setIsLiked] = useState(false)
  const isFavorito = favoritos.includes(repertorio.id)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1))
  }

  const handleViewDetails = () => {
    router.push(`/repertorio/${repertorio.id}`)
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

  const renderContent = () => {
    switch (repertorio.modelo) {
      case "obra":
        return (
          <>
            <h3 className="text-lg font-bold text-gray-900 mb-1">{repertorio.titulo}</h3>
            <p className="text-sm text-gray-600 mb-3">Por {repertorio.autoria}</p>
            <div className="mb-4">
              <p className="text-sm text-gray-700 line-clamp-4">
                {repertorio.sinopse.length > 200 ? `${repertorio.sinopse.substring(0, 200)}...` : repertorio.sinopse}
              </p>
            </div>
            <div className="mb-4">
              <p className="text-xs text-gray-500">
                <span className="font-medium">Fonte:</span> {repertorio.fonte}
              </p>
            </div>
          </>
        )

      case "artigo":
        return (
          <>
            <h3 className="text-lg font-bold text-gray-900 mb-1">{repertorio.titulo}</h3>
            <p className="text-sm text-gray-600 mb-3">Por {repertorio.autoria}</p>
            <div className="mb-4">
              <p className="text-sm text-gray-700 line-clamp-4">
                {repertorio.sintese.length > 200 ? `${repertorio.sintese.substring(0, 200)}...` : repertorio.sintese}
              </p>
            </div>
            <div className="mb-4">
              <p className="text-xs text-gray-500">
                <span className="font-medium">Fonte:</span> {repertorio.fonte}
              </p>
            </div>
          </>
        )

      case "citacao":
        return (
          <>
            <h3 className="text-lg font-bold text-gray-900 mb-1">{repertorio.autoria}</h3>
            <p className="text-sm text-gray-600 mb-3">Citação</p>
            <div className="mb-4">
              <p className="text-sm text-gray-700 italic line-clamp-3 mb-2">"{repertorio.citacao}"</p>
            </div>
            <div className="mb-4">
              <p className="text-xs text-gray-500">
                <span className="font-medium">Fonte:</span> {repertorio.fonte}
              </p>
            </div>
          </>
        )

      default:
        return null
    }
  }

  const ModeloIcon = getModeloIcon(repertorio.modelo)

  return (
    <div className="bg-white rounded-lg border-l-4 border-l-[#CA9C60] shadow-sm hover:shadow-md transition-shadow p-4 cursor-pointer group">
      {/* Cabeçalho do card */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center">
          <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center mr-2">
            <User size={14} className="text-white" />
          </div>
          <span className="text-sm font-medium text-gray-800">Nome</span>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleViewDetails()
            }}
            className="text-gray-400 hover:text-[#CA9C60] transition-colors opacity-0 group-hover:opacity-100"
            title="Ver detalhes"
          >
            <Eye size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              toggleFavorito(repertorio.id)
            }}
            className={`transition-colors ${isFavorito ? "text-blue-500" : "text-gray-400 hover:text-blue-500"}`}
            title={isFavorito ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          >
            <Bookmark size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleLike()
            }}
            className={`flex items-center space-x-1 transition-colors ${
              isLiked ? "text-blue-500" : "text-gray-400 hover:text-blue-500"
            }`}
            title="Curtir"
          >
            <ThumbsUp size={16} />
            <span className="text-sm">{likes}</span>
          </button>
        </div>
      </div>

      {/* Tags da categoria e modelo */}
      <div className="flex gap-2 mb-3">
        <span
          className={`inline-block px-2 py-1 rounded-full text-xs font-medium border bg-gray-100 text-gray-800 border-gray-200`}
        >
          #{repertorio.eixo}
        </span>
        <span
          className={`inline-block px-2 py-1 rounded-full text-xs font-medium border bg-gray-100 text-gray-800 border-gray-200`}
        >
          #{repertorio.recorte}
        </span>
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
          <ModeloIcon size={12} className="mr-1" />
          {getModeloLabel(repertorio.modelo)}
        </span>
      </div>

      {/* Conteúdo específico do modelo - clicável */}
      <div onClick={handleViewDetails}>{renderContent()}</div>


    </div>
  )
}
