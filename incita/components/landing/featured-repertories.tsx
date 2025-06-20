'use client'

import { useEffect, useState } from "react"
import { GetAllRepertoriosResponse, RepertorioDocument } from "../../api/repertorio/types"
import QuoteCard from "./quote-card"
import { getAllRepertorios } from "../../api/repertorio"
import { isGetAllArtigoDoc, isGetAllCitacaoDoc, isGetAllObraDoc } from "../../api/repertorio/helpers"
import Link from "next/link"

export function mountRepertoire(repertorio: RepertorioDocument) {
  if(isGetAllCitacaoDoc(repertorio)) {
    return (<QuoteCard
    key={repertorio.id}
    id={repertorio.id}
    type={repertorio.tipoRepertorio}
    title={repertorio.autor}
    content={repertorio.frase}
    eixo={repertorio.topico}
    recortes={repertorio.subtopicos}
    source={repertorio.fonte}
    author={repertorio.criador}
    likesQTD={repertorio.totalLikes}
    likedByUser={repertorio.likeDoUsuario}
    savedByUser={repertorio.favoritadoPeloUsuario} />)
  }

  if(isGetAllArtigoDoc(repertorio)) {
    return (<QuoteCard
    key={repertorio.id}
    id={repertorio.id}
    type={repertorio.tipoRepertorio}
    title={repertorio.titulo}
    content={repertorio.resumo}
    eixo={repertorio.topico}
    recortes={repertorio.subtopicos}
    source={repertorio.fonte}
    author={repertorio.criador}
    likesQTD={repertorio.totalLikes}
    likedByUser={repertorio.likeDoUsuario}
    savedByUser={repertorio.favoritadoPeloUsuario} />)
  }

  if(isGetAllObraDoc(repertorio)) {
    return (<QuoteCard
    key={repertorio.id}
    id={repertorio.id}
    type={repertorio.tipoRepertorio}
    title={repertorio.autor}
    content={repertorio.sinopse}
    eixo={repertorio.topico}
    recortes={repertorio.subtopicos}
    author={repertorio.criador}
    likesQTD={repertorio.totalLikes}
    likedByUser={repertorio.likeDoUsuario}
    savedByUser={repertorio.favoritadoPeloUsuario} />)
  }
}

export default function FeaturedRepertoires() {
  const [featuredRepertoires, setFeaturedRepertoires] = useState<GetAllRepertoriosResponse | null>(null)
  
  useEffect(() => {
    async function fetchData() {
      const response = await getAllRepertorios('?ordenarPor=MaxLikes&limit=6')
      console.log(response)
      if (response) setFeaturedRepertoires(response)
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

        <div className="grid grid-cols-3 gap-y-8 gap-x-16 sm:grid-cols-1 md:grid-cols-2 max-w-7xl mx-auto lg:grid-cols-3">
          {featuredRepertoires?.documentos.length! > 0 ? 
          featuredRepertoires!.documentos.map((repertorio) => (
            mountRepertoire(repertorio)
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
