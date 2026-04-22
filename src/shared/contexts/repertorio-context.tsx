"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback, useEffect } from "react"
import type { Repertorio, RepertorioFormData } from "@/types/repertorio"
import { RepertoireDocument } from "../../lib/apiCalls/repertorio/types"
import {
  isArticleDoc,
  isCitationDoc,
  isWorkDoc
} from "../../lib/apiCalls/repertorio/helpers"
import {
  addFavorito,
  getAllRepertoires,
  removeFavorito
} from "../../lib/apiCalls/repertorio"
import { useAuth } from "./auth-context"
import { toast } from "react-toastify"

// Mapeador seguro para os tipos de obra do Prisma -> Frontend
const mapTipoObra = (workType: string): "livro" | "filme" | "música" | "teatro" => {
  const map: Record<string, "livro" | "filme" | "música" | "teatro"> = {
    'BOOK': 'livro',
    'MOVIE': 'filme',
    'MUSIC': 'música',
    'THEATER': 'teatro',
    'livro': 'livro',
    'filme': 'filme',
    'musica': 'música',
    'música': 'música',
    'teatro': 'teatro'
  };

  // Retorna o valor mapeado ou 'livro' como fallback de segurança
  return map[workType] || map[workType.toUpperCase()] || 'livro';
}

const mountRepertoire = (repertoire: RepertoireDocument): Repertorio | null => {
  const criadorFormatado = {
    ...repertoire.creator,
    nome: repertoire.creator.name
  }

  if (isCitationDoc(repertoire)) {
    return {
      id: repertoire.id,
      modelo: "citacao",
      autoria: repertoire.author,
      citacao: repertoire.quote,
      fonte: repertoire.source ?? undefined,
      eixos: repertoire.topics,
      recortes: repertoire.subtopics,
      isPublico: true,
      totalLikes: repertoire.totalLikes,
      favoritadoPeloUsuario: repertoire.favourited,
      likeDoUsuario: repertoire.liked,
      criador: criadorFormatado,
      totalComentarios: repertoire.totalComments ?? 0,
      comentarios: repertoire.comments as any ?? []
    }
  }

  if (isWorkDoc(repertoire)) {
    return {
      id: repertoire.id,
      modelo: "obra",
      titulo: repertoire.title,
      autoria: repertoire.author,
      sinopse: repertoire.synopsis,
      eixos: repertoire.topics,
      tipoObra: mapTipoObra(repertoire.workType),
      recortes: repertoire.subtopics,
      isPublico: true,
      totalLikes: repertoire.totalLikes,
      favoritadoPeloUsuario: repertoire.favourited,
      likeDoUsuario: repertoire.liked,
      criador: criadorFormatado,
      totalComentarios: repertoire.totalComments ?? 0,
      comentarios: repertoire.comments as any ?? []
    }
  }

  if (isArticleDoc(repertoire)) {
    return {
      id: repertoire.id,
      modelo: "artigo",
      titulo: repertoire.title,
      autoria: repertoire.author,
      sintese: repertoire.abstract,
      fonte: repertoire.source ?? "",
      eixos: repertoire.topics,
      recortes: repertoire.subtopics,
      isPublico: true,
      totalLikes: repertoire.totalLikes,
      favoritadoPeloUsuario: repertoire.favourited,
      likeDoUsuario: repertoire.liked,
      criador: criadorFormatado,
      totalComentarios: repertoire.totalComments ?? 0,
      comentarios: repertoire.comments as any ?? []
    }
  }

  return null
}

interface RepertorioContextType {
  repertorios: Repertorio[]
  favoritos: string[]
  currentPage: number
  totalPages: number
  totalRepertorios: number
  isLoadingRepertorios: boolean

  pesquisarRepertorios: (filters: any) => Promise<void>
  setPage: (page: number) => void
  toggleFavorito: (id: string) => Promise<void>
  adicionarRepertorio: (data: RepertorioFormData) => Promise<Repertorio>
  buscarPorId: (id: string) => Repertorio | undefined
}

const RepertorioContext = createContext<RepertorioContextType | undefined>(undefined)

export function RepertorioProvider({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, isLoading: isAuthLoading } = useAuth()

  const [repertorios, setRepertorios] = useState<Repertorio[]>([])
  const [favoritos, setFavoritos] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [totalRepertorios, setTotalRepertorios] = useState(0)
  const [isLoadingRepertorios, setIsLoadingRepertorios] = useState(true)

  const setPage = useCallback((page: number) => {
    setCurrentPage(page)
  }, [])

  const construirQueryString = useCallback((filters: any) => {
    const params = new URLSearchParams()

    // Mapeamento para os DTOs do NestJS
    if (filters.search) params.append("content", filters.search)

    if (filters.eixos?.length)
      filters.eixos.forEach((e: string) => params.append("topics", e))

    if (filters.subtopicos?.length)
      filters.subtopicos.forEach((s: string) => params.append("subtopics", s))

    if (filters.modelo?.length) {
      // Traduz os modelos do front para os Enums do backend
      const typeMap: Record<string, string> = {
        obra: 'WORK',
        artigo: 'ARTICLE',
        citacao: 'CITATION'
      }
      filters.modelo.forEach((m: string) =>
        params.append("reperoireType", typeMap[m] || m)
      )
    }

    if (filters.favoritedByCurrentUser !== undefined)
      params.append(
        "favourited",
        String(filters.favoritedByCurrentUser)
      )

    if (filters.likedByCurrentUser !== undefined)
      params.append("liked", String(filters.likedByCurrentUser))

    if (filters.orderBy) params.append("orderBy", filters.orderBy)

    params.append("offset", String(filters.offset ?? 0))
    params.append("limit", String(filters.limit ?? 15))

    return params.toString()
  }, [])

  const pesquisarRepertorios = useCallback(
    async (filters: any) => {
      setIsLoadingRepertorios(true)

      try {
        const queryString = construirQueryString(filters)
        const response = await getAllRepertoires(`?${queryString}`)

        if (!response) {
          setRepertorios([])
          setTotalPages(1)
          setTotalRepertorios(0)
          return
        }

        const mapped = response.documents
          .map(mountRepertoire)
          .filter((r: Repertorio | null): r is Repertorio => r !== null)

        setRepertorios(mapped)
        setTotalRepertorios(response.pagination.totalDocuments)

        const limit = filters.limit ?? 15
        setTotalPages(
          Math.ceil(response.pagination.totalDocuments / limit)
        )

        if (isLoggedIn) {
          setFavoritos(
            // Adicionado o tipo (r: Repertorio) aqui também por garantia
            mapped.filter((r: Repertorio) => r.favoritadoPeloUsuario).map((r: Repertorio) => r.id)
          )
        } else {
          setFavoritos([])
        }
      } catch (e) {
        console.error("Erro ao buscar repertórios:", e)
        setRepertorios([])
        setTotalPages(1)
        setTotalRepertorios(0)
      } finally {
        setIsLoadingRepertorios(false)
      }
    },
    [construirQueryString, isLoggedIn]
  )

  useEffect(() => {
    if (!isAuthLoading) {
      pesquisarRepertorios({
        orderBy: "Newest",
        offset: 0,
        limit: 15
      })
    }
  }, [isAuthLoading, pesquisarRepertorios])


  const toggleFavorito = useCallback(
    async (id: string) => {
      if (!isLoggedIn) {
        toast.error("Você precisa estar logado para favoritar repertórios.")
        return
      }

      const isFavorito = favoritos.includes(id)

      try {
        if (isFavorito) {
          await removeFavorito(id)
          setFavoritos(prev => prev.filter(f => f !== id))
          setRepertorios(prev =>
            prev.map(r =>
              r.id === id
                ? { ...r, favoritadoPeloUsuario: false }
                : r
            )
          )
        } else {
          await addFavorito(id)
          setFavoritos(prev => [...prev, id])
          setRepertorios(prev =>
            prev.map(r =>
              r.id === id
                ? { ...r, favoritadoPeloUsuario: true }
                : r
            )
          )
        }
      } catch {
        toast.error("Erro ao salvar favorito.")
      }
    },
    [isLoggedIn, favoritos]
  )


  const adicionarRepertorio = useCallback(
    async (data: RepertorioFormData) => {
      const novo: Repertorio = {
        ...data,
        id: Date.now().toString(),
        isPublico: true,
        totalLikes: 0,
        favoritadoPeloUsuario: false,
        likeDoUsuario: false,
        criador: { id: "mock_id", nome: "Mock User" }
      } as Repertorio

      setRepertorios(prev => [novo, ...prev])
      return novo
    },
    []
  )

  const buscarPorId = useCallback(
    (id: string) => repertorios.find(r => r.id === id),
    [repertorios]
  )

  return (
    <RepertorioContext.Provider
      value={{
        repertorios,
        favoritos,
        currentPage,
        totalPages,
        totalRepertorios,
        isLoadingRepertorios,
        pesquisarRepertorios,
        setPage,
        toggleFavorito,
        adicionarRepertorio,
        buscarPorId
      }}
    >
      {children}
    </RepertorioContext.Provider>
  )
}

export function useRepertorio() {
  const context = useContext(RepertorioContext)
  if (!context) {
    throw new Error(
      "useRepertorio deve ser usado dentro de um RepertorioProvider"
    )
  }
  return context
}