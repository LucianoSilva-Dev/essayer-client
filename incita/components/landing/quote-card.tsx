"use client"

import { useState } from "react"
import { Bookmark, ThumbsUp } from "lucide-react"
import { addFavorito, addLike, removeFavorito, removeLike } from "../../api/repertorio"

type QuoteCardProps = {
  id: string
  type: string
  title: string
  content: string
  eixo: string
  recorte: string
  source?: string
  author?: string
  likesQTD: number
  likedByUser: boolean
  savedByUser: boolean
}

export default function QuoteCard({
  id,
  type,
  title,
  content,
  eixo,
  recorte,
  source,
  author,
  likesQTD,
  likedByUser,
  savedByUser,

}: QuoteCardProps) {
  const [liked, setLiked] = useState(likedByUser)
  const [saved, setSaved] = useState(savedByUser)

  const handleLike = async () => {
    if (liked) {
      try {
        await removeLike(id)
        setLiked(false)
      } catch (e) { }

    }
    else {
      try {
        await addLike(id)
        setLiked(true)
      } catch (e) { }
    }
  }

  const handleSave = async () => {
    if (saved) {
      try {
        await removeFavorito(id)
        setSaved(false)
      } catch (e) { }

    }
    else {
      try {
        await addFavorito(id)
        setSaved(true)
      } catch (e) { }

    }
  }

  return (
    <div className="relative w-full hover:scale-105 duration-150">
      <div className="relative h-full rounded-xl bg-white border-t-[0.1rem] border-l-4 border-b-[0.1rem] border-yellow-600 overflow-hidden w-full hover:shadow-xl duration-150">
        <div className="p-4 flex flex-col h-full justify-between">
          {/* Header com nome do autor */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-xs">👤</span>
              </div>
              <span className="text-sm text-gray-600">{author ?? "Autor desconhecido"}</span>
            </div>
            <div className="flex items-center gap-2">
              {/* <button
                onClick={handleSave}
                className={`p-1 rounded-full transition-colors ${saved ? "border-yellow-600" : "border-gray-300 hover:border-yellow-600"}`}
              >
                <Bookmark className={`h-4 w-4 ${saved ? "text-yellow-600 fill-current" : "text-gray-400"}`} />
              </button>
              <button
                onClick={handleLike}
                className={`p-1 rounded-full transition-colors ${liked ? "border-yellow-600" : "border-gray-300 hover:border-yellow-600"}`}
              >
                <ThumbsUp className={`h-4 w-4 ${liked ? "text-yellow-600 fill-current" : "text-gray-400"}`} />
              </button> 
              <span className="text-xs text-gray-500">{likesQTD}</span>*/}
            </div>
          </div>

          {/* Tag com tipo (ex: #citação) */}
          <div className="group/citacao mb-3 relative inline-block w-fit">
            <div className="absolute top-0.5 right-0.5 bg-blue-700 rounded-md w-full h-full group-hover/citacao:translate-x-[0.07em] group-hover/citacao:translate-y-[-0.06em] duration-100"></div>
            <div className="relative bg-white px-3 py-1 rounded-md border border-gray-200 text-xs">#{type}</div>
          </div>

          {/* Título */}
          <div className="mb-2">
            <p className="text-sm font-medium">{title}</p>
          </div>

          {/* Conteúdo */}
          <div className="mb-3">
            <p className="text-l text-gray-700 pr-12 leading-relaxed">"{content}"</p>
            
          </div>

          {/* Botões de Tópico/Subtópico (pode ajustar depois se quiser deixar dinâmico também) */}
          <div className="flex items-center gap-2 mb-3">
            {source && <p className="text-xs text-gray-500 mt-1">Fonte: {source}</p>}
          <div className="flex gap-2 mt-3">
            <button className="flex-3 py-1 px-4 bg-blue-100 text-sky-700 text-xs rounded-full text-center">
              {eixo}
            </button>
            <button className="flex-1 py-1 px-4 bg-blue-100 text-sky-700 text-xs rounded-full text-center">
              {recorte}
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
