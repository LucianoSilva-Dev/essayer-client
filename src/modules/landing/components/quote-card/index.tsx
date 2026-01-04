"use client"

import { useEffect, useState } from "react"
import { PerfilUsuario } from "../../../../types/types"
import { getProfilePictureLink } from "../../../../lib/apiCalls/usuario"
import Image from "next/image"

type QuoteCardProps = {
  id: string
  type: string
  title: string
  content: string
  eixo: string
  recortes: string[]
  source?: string
  author?: PerfilUsuario
  likedByUser: boolean
  savedByUser: boolean
}

export default function QuoteCard({
  type,
  title,
  content,
  eixo,
  recortes,
  source,
  author,
}: QuoteCardProps) {
  const [authorProfilePictureLink, setAuthorProfilePictureLink] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      const data = await getProfilePictureLink(author?.id)
      if (data) setAuthorProfilePictureLink(data)
    }
    if (author) fetchData()
  }, [author])

  return (
    <div className="relative w-full hover:scale-105 duration-150">
      <div className="relative h-full rounded-xl bg-white border-t-[0.1rem] border-l-4 border-b-[0.1rem] border-yellow-600 overflow-hidden w-full hover:shadow-xl duration-150">
        <div className="p-4 flex flex-col h-full justify-between">
          {/* Header com nome do autor */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                {
                  authorProfilePictureLink ? (
                    <Image
                      src={authorProfilePictureLink}
                      alt="Foto de perfil do autor"
                      width={24}
                      height={24}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xs">👤</span>
                  )
                }
              </div>
              <span className="text-sm text-gray-600">{author?.nome ?? "Autor desconhecido"}</span>
            </div>
            {/* Botões removidos pois não são usados */}
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
            <p className="text-l text-gray-700 pr-12 leading-relaxed">&quot;{content}&quot;</p>
          </div>

          {/* Botões de Tópico/Subtópico */}
          <div className="flex items-center gap-2 mb-3">
            {source && <p className="text-xs text-gray-500 mt-1">Fonte: {source}</p>}
            <div className="flex flex-wrap gap-2 mt-3">
              <button className="flex-3 py-1 px-4 bg-blue-100 text-sky-700 text-xs rounded-full text-center">
                {eixo}
              </button>
              {recortes.map(recorte => (
                <button key={recorte} className="flex-1 py-1 px-4 bg-blue-100 text-sky-700 text-xs rounded-full text-center">
                  {recorte}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}