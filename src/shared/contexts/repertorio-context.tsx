"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback, useEffect } from "react"
import type { Repertorio, RepertorioFormData } from "@/types/repertorio"
import { RepertorioDocument } from "../../lib/apiCalls/repertorio/types"
import {
  isGetAllArtigoDoc,
  isGetAllCitacaoDoc,
  isGetAllObraDoc
} from "../../lib/apiCalls/repertorio/helpers"
import {
  addFavorito,
  getAllRepertorios,
  removeFavorito
} from "../../lib/apiCalls/repertorio"
import { useAuth } from "./auth-context"
import { toast } from "react-toastify"

const mountRepertoire = (repertorio: RepertorioDocument): Repertorio | null => {
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
      criador: repertorio.criador,
      totalComentarios: repertorio.totalComentarios ?? 0,
      comentarios: repertorio.comentarios ?? []
    }
  }

  if (isGetAllObraDoc(repertorio)) {
    return {
      id: repertorio.id,
      modelo: "obra",
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
      criador: repertorio.criador,
      totalComentarios: repertorio.totalComentarios ?? 0,
      comentarios: repertorio.comentarios ?? []
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
      criador: repertorio.criador,
      totalComentarios: repertorio.totalComentarios ?? 0,
      comentarios: repertorio.comentarios ?? []
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

    if (filters.search) params.append("conteudo", filters.search)
    if (filters.eixos?.length)
      filters.eixos.forEach((e: string) => params.append("topicos", e))
    if (filters.subtopicos?.length)
      filters.subtopicos.forEach((s: string) => params.append("subtopicos", s))
    if (filters.modelo?.length)
      filters.modelo.forEach((m: string) =>
        params.append("tipoRepertorio", m)
      )

    if (filters.favoritedByCurrentUser !== undefined)
      params.append(
        "favoritadoPeloUsuario",
        String(filters.favoritedByCurrentUser)
      )

    if (filters.likedByCurrentUser !== undefined)
      params.append("likeDoUsuario", String(filters.likedByCurrentUser))

    if (filters.orderBy) params.append("ordenarPor", filters.orderBy)

    params.append("offset", String(filters.offset ?? 0))
    params.append("limit", String(filters.limit ?? 15))

    return params.toString()
  }, [])

  const pesquisarRepertorios = useCallback(
    async (filters: any) => {
      setIsLoadingRepertorios(true)

      try {
        const queryString = construirQueryString(filters)
        const response = await getAllRepertorios(`?${queryString}`)

        if (!response) {
          setRepertorios([])
          setTotalPages(1)
          setTotalRepertorios(0)
          return
        }

        const mapped = response.documentos
          .map(mountRepertoire)
          .filter((r): r is Repertorio => r !== null)

        setRepertorios(mapped)
        setTotalRepertorios(response.paginacao.totalDocuments)

        const limit = filters.limit ?? 15
        setTotalPages(
          Math.ceil(response.paginacao.totalDocuments / limit)
        )

        if (isLoggedIn) {
          setFavoritos(
            mapped.filter(r => r.favoritadoPeloUsuario).map(r => r.id)
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
