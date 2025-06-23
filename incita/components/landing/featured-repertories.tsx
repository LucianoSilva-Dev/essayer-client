'use client'

import { useEffect, useState } from "react"
import { RepertorioDocument } from "../../api/repertorio/types"
import { getAllRepertorios } from "../../api/repertorio"
import { isGetAllArtigoDoc, isGetAllCitacaoDoc, isGetAllObraDoc } from "../../api/repertorio/helpers"
import Link from "next/link"
import type { Repertorio } from "@/../types/repertorio"
import RepertorioCard from "../repertorio/repertorio-card"


const mountFrontendRepertoire = (repertorio: RepertorioDocument): Repertorio | null => {
  if (isGetAllCitacaoDoc(repertorio)) {
    return {
      id: repertorio.id,
      modelo: "citacao",
      autoria: repertorio.autor,
      citacao: repertorio.frase,
      fonte: repertorio.fonte,
      eixos: repertorio.topicos,
      recortes: repertorio.subtopicos,
      isPublico: true,
      totalLikes: repertorio.totalLikes,
      favoritadoPeloUsuario: repertorio.favoritadoPeloUsuario,
      likeDoUsuario: repertorio.likeDoUsuario,
      criador: repertorio.criador
    }
  }
  if (isGetAllObraDoc(repertorio)) {
    return {
      id: repertorio.id,
      modelo: 'obra',
      titulo: repertorio.titulo,
      autoria: repertorio.autor,
      sinopse: repertorio.sinopse,
      eixos: repertorio.topicos,
      tipoObra: repertorio.tipoObra,
      recortes: repertorio.subtopicos,
      isPublico: true,
      totalLikes: repertorio.totalLikes,
      favoritadoPeloUsuario: repertorio.favoritadoPeloUsuario,
      likeDoUsuario: repertorio.likeDoUsuario,
      criador: repertorio.criador
    }
  }
  if (isGetAllArtigoDoc(repertorio)) {
    return {
      id: repertorio.id,
      modelo: "artigo",
      titulo: repertorio.titulo,
      autoria: repertorio.autor,
      sintese: repertorio.resumo,
      fonte: repertorio.fonte,
      eixos: repertorio.topicos,
      recortes: repertorio.subtopicos,
      isPublico: true,
      totalLikes: repertorio.totalLikes,
      favoritadoPeloUsuario: repertorio.favoritadoPeloUsuario,
      likeDoUsuario: repertorio.likeDoUsuario,
      criador: repertorio.criador
    }
  }

  return null
}

export default function FeaturedRepertoires() {
  const [featuredRepertoires, setFeaturedRepertoires] = useState<Repertorio[]>([])
  
  useEffect(() => {
    async function fetchData() {
      const response = await getAllRepertorios('?ordenarPor=MaxLikes&limit=6')
      if (response) {
        const mapped = response.documentos
            .map(doc => mountFrontendRepertoire(doc))
            .filter((rep): rep is Repertorio => rep !== null)
        setFeaturedRepertoires(mapped)
      }
    }
    fetchData()
  }, [])

  return (
    <section className="py-12 px-4 bg-[#F3F4F6] scroll-mt-25" id="repertorios">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 flex-column justify-center">
          <h2 className="text-[45px] font-bold mb-2">Repertórios em destaque</h2>
          <p className="text-[30px] text-gray-600 max-w-4xl justify-self-center">Alguns exemplos do conteúdo que você encontrará em nosso acervo</p>
        </div>

        <div className="grid grid-cols-2 gap-y-8 gap-x-2 lg:gap-x-16 md:grid-cols-2 max-w-7xl mx-auto lg:grid-cols-3">
          {featuredRepertoires.length > 0 ? 
            featuredRepertoires.map((repertorio) => (
                <RepertorioCard key={repertorio.id} repertorio={repertorio} />
            ))
          : <p className="text-[30px] text-gray-600 max-w-4xl justify-self-center">Nenhum repertorio encontrado</p>
          }

        </div>

        <div className="mt-10 text-center">
          <Link
            href="/main"
            className="bg-[#075F70] hover:shadow-xl hover:bg-[#054c59] duration-300 text-white text-[24px] py-3 px-6 rounded-md transition-colors"
          >
              Ver todos os repertórios
          </Link>
        </div>
      </div>
    </section>
  )
}