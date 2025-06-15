"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { Repertorio, RepertorioFormData } from "@/../types/repertorio"
import { RepertorioDocument } from "../api/repertorio/types"
import { isGetAllArtigoDoc, isGetAllCitacaoDoc, isGetAllObraDoc } from "../api/repertorio/helpers"
import { getAllRepertorios } from "../api/repertorio"

const mountRepertoire = (repertorio: RepertorioDocument): Repertorio | null => {
  if (isGetAllCitacaoDoc(repertorio)) {
    return {
      id: repertorio.id,
      modelo: "citacao",
      autoria: repertorio.autor,
      citacao: repertorio.frase,
      fonte: repertorio.fonte,
      eixo: repertorio.topico,
      recorte: repertorio.subtopicos[0],
      isPublico: true,
    }
  }
  if (isGetAllObraDoc(repertorio)) {
    return {
      id: repertorio.id,
      modelo: 'obra',
      titulo: repertorio.titulo,
      autoria: repertorio.autor,
      sinopse: repertorio.sinopse,
      eixo: repertorio.topico,
      recorte: repertorio.subtopicos[0],
      isPublico: true,
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
      eixo: repertorio.topico,
      recorte: repertorio.subtopicos[0],
      isPublico: true,
    }
  }

  return null
}

interface RepertorioContextType {
  repertorios: Repertorio[]
  adicionarRepertorio: (data: RepertorioFormData) => Promise<Repertorio>
  toggleFavorito: (id: string) => void
  favoritos: string[]
  filtrarPorRecorte: (recorte: string | null) => Repertorio[]
  filtrarPorEixo: (eixo: string | null) => Repertorio[]
  filtrarPorModelo: (modelo: string | null) => Repertorio[]
  pesquisar: (termo: string) => Repertorio[]
  buscarPorId: (id: string) => Repertorio | undefined
}

const RepertorioContext = createContext<RepertorioContextType | undefined>(undefined)

export function RepertorioProvider({ children }: { children: React.ReactNode }) {
  const [repertorios, setRepertorios] = useState<Repertorio[]>([])
  const [favoritos, setFavoritos] = useState<string[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Carregar dados do localStorage na inicialização
  useEffect(() => {
    async function fetchRepData() {
      try {
        const repertorios = await getAllRepertorios('?ordenarPor=MaxLikes')
        const mappedRepertorios = repertorios!.documentos.map((repertorio) => mountRepertoire(repertorio))
        setRepertorios(mappedRepertorios as Repertorio[])
      } catch (e) {
        console.error('Erro ao carregar repertórios:', e)
      }
    }

    async function fetchFavRepData() {
      try {
        const favRepertorios = await getAllRepertorios('?favoritadoPeloUsuario=true')
        setFavoritos(favRepertorios!.documentos.map(repertorio => repertorio.id))
      } catch (e) {
        console.error('Erro ao carregar repertórios favoritos:', e)
      }
    }

    fetchRepData()
    fetchFavRepData()
    setIsLoaded(true)
  }, [])

// // Salvar dados no localStorage quando houver mudanças
// useEffect(() => {
//   if (isLoaded) {
//     localStorage.setItem("repertorios", JSON.stringify(repertorios))
//     localStorage.setItem("favoritos", JSON.stringify(favoritos))
//   }
// }, [repertorios, favoritos, isLoaded])

// Adicionar novo repertório
const adicionarRepertorio = async (data: RepertorioFormData): Promise<Repertorio> => {
  const novoRepertorio: Repertorio = {
    ...data,
    id: Date.now().toString(),
    comentarios: 0,
  } as Repertorio
  
  setRepertorios((prev) => [novoRepertorio, ...prev])
  return novoRepertorio
}

// Adicionar/remover dos favoritos
const toggleFavorito = (id: string) => {
  setFavoritos((prev) => (prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]))
}

// Filtrar por Eixo Temático
const filtrarPorRecorte = (recorte: string | null): Repertorio[] => {
  if (!recorte) return repertorios
  return repertorios.filter((rep) => rep.recorte === recorte)
}
const filtrarPorEixo = (eixo: string | null): Repertorio[] => {
  if (!eixo) return repertorios
  return repertorios.filter((rep) => rep.eixo === eixo)
}

// Filtrar por modelo
const filtrarPorModelo = (modelo: string | null): Repertorio[] => {
  if (!modelo) return repertorios
  return repertorios.filter((rep) => rep.modelo === modelo)
}

// Pesquisar por termo
const pesquisar = (termo: string): Repertorio[] => {
  if (!termo.trim()) return repertorios

  const termoBusca = termo.toLowerCase().trim()
  return repertorios.filter((rep) => {
    // Busca comum em todos os modelos
    const buscaComum =
      rep.eixo.toLowerCase().includes(termoBusca) ||
      rep.recorte.toLowerCase().includes(termoBusca)

    // Busca específica por modelo
    switch (rep.modelo) {
      case "obra":
        return (
          buscaComum ||
          rep.titulo.toLowerCase().includes(termoBusca) ||
          rep.autoria.toLowerCase().includes(termoBusca) ||
          rep.sinopse.toLowerCase().includes(termoBusca) ||
          rep.fonte.toLowerCase().includes(termoBusca)
        )

      case "artigo":
        return (
          buscaComum ||
          rep.titulo.toLowerCase().includes(termoBusca) ||
          rep.autoria.toLowerCase().includes(termoBusca) ||
          rep.sintese.toLowerCase().includes(termoBusca) ||
          rep.fonte.toLowerCase().includes(termoBusca)
        )

      case "citacao":
        return (
          buscaComum ||
          rep.autoria.toLowerCase().includes(termoBusca) ||
          rep.citacao.toLowerCase().includes(termoBusca) ||
          rep.fonte.toLowerCase().includes(termoBusca)
        )

      default:
        return buscaComum
    }
  })
}

// Buscar repertório por ID
const buscarPorId = (id: string): Repertorio | undefined => {
  return repertorios.find((rep) => rep.id === id)
}

return (
  <RepertorioContext.Provider
    value={{
      repertorios,
      adicionarRepertorio,
      toggleFavorito,
      favoritos,
      filtrarPorEixo,
      filtrarPorRecorte,
      filtrarPorModelo,
      pesquisar,
      buscarPorId,
    }}
  >
    {children}
  </RepertorioContext.Provider>
)
}

export function useRepertorio() {
  const context = useContext(RepertorioContext)
  if (context === undefined) {
    throw new Error("useRepertorio deve ser usado dentro de um RepertorioProvider")
  }
  return context
}
