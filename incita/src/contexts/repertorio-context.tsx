// GeminiContext/Frontend/contexts/repertorio-context.tsx
"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react"
import type { Repertorio, RepertorioFormData } from "@/types/repertorio"
import { RepertorioDocument, GetAllRepertoriosResponse } from "../apiCalls/repertorio/types"
import { isGetAllArtigoDoc, isGetAllCitacaoDoc, isGetAllObraDoc } from "../apiCalls/repertorio/helpers"
import { addFavorito, getAllRepertorios, removeFavorito } from "../apiCalls/repertorio"
import { useAuth } from "./auth-context"

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
      modelo: 'obra',
      titulo: repertorio.titulo,
      autoria: repertorio.autor,
      sinopse: repertorio.sinopse,
      eixos: repertorio.topicos,
      tipoObra: repertorio.tipoObra, // ADICIONADO
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
  adicionarRepertorio: (data: RepertorioFormData) => Promise<Repertorio>
  toggleFavorito: (id: string) => void
  favoritos: string[]
  pesquisarRepertorios: (filters: {
    search?: string,
    eixos?: string[],
    subtopicos?: string[],
    modelo?: string[],
    favoritedByCurrentUser?: boolean,
    likedByCurrentUser?: boolean,
    orderBy?: 'MaxLikes' | 'MinLikes' | 'Newest' | 'Oldest',
    offset?: number,
    limit?: number
  }) => Promise<{
    documents: Repertorio[],
    pagination: {
      offset: number,
      limit: number,
      nextPageUrl: string | null,
      previousPageUrl: string | null,
      totalDocuments: number
    }
  }>
  buscarPorId: (id: string) => Repertorio | undefined
  currentPage: number
  totalPages: number
  totalRepertorios: number
  setPage: (page: number) => void
  isLoadingRepertorios: boolean
}

const RepertorioContext = createContext<RepertorioContextType | undefined>(undefined)

export function RepertorioProvider({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuth();
  const [repertorios, setRepertorios] = useState<Repertorio[]>([])
  const [favoritos, setFavoritos] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [totalRepertorios, setTotalRepertorios] = useState(0)
  const [isLoadingRepertorios, setIsLoadingRepertorios] = useState(true)
  const [currentLimit, setCurrentLimit] = useState(15);

  const setPage = (page: number) => {
    setCurrentPage(page);
  }

  const construirQueryString = (filters: {
    search?: string,
    eixos?: string[],
    subtopicos?: string[],
    modelo?: string[],
    favoritedByCurrentUser?: boolean,
    likedByCurrentUser?: boolean,
    orderBy?: 'MaxLikes' | 'MinLikes' | 'Newest' | 'Oldest',
    offset?: number,
    limit?: number
  }) => {
    const params = new URLSearchParams();
    if (filters.search) params.append('conteudo', filters.search);
    if (filters.eixos && filters.eixos.length > 0) filters.eixos.forEach(e => params.append('topicos', e));
    if (filters.subtopicos && filters.subtopicos.length > 0) filters.subtopicos.forEach(s => params.append('subtopicos', s));
    if (filters.modelo && filters.modelo.length > 0) filters.modelo.forEach(m => params.append('tipoRepertorio', m));

    if (filters.favoritedByCurrentUser !== undefined) params.append('favoritadoPeloUsuario', String(filters.favoritedByCurrentUser));
    if (filters.likedByCurrentUser !== undefined) params.append('likeDoUsuario', String(filters.likedByCurrentUser));
    if (filters.orderBy) params.append('ordenarPor', filters.orderBy);

    params.append('offset', String(filters.offset ?? 0));
    params.append('limit', String(filters.limit ?? currentLimit));
    return params.toString();
  };

  const pesquisarRepertorios = useCallback(async (filters: {
    search?: string,
    eixos?: string[],
    subtopicos?: string[],
    modelo?: string[],
    favoritedByCurrentUser?: boolean,
    likedByCurrentUser?: boolean,
    orderBy?: 'MaxLikes' | 'MinLikes' | 'Newest' | 'Oldest',
    offset?: number,
    limit?: number
  }) => {
    setIsLoadingRepertorios(true);
    try {
      const queryString = construirQueryString(filters);
      const response = await getAllRepertorios(`?${queryString}`);

      if (response) {
        const mappedRepertorios = response.documentos
          .map((repertorio) => mountRepertoire(repertorio))
          .filter((rep): rep is Repertorio => rep !== null);

        setRepertorios(mappedRepertorios);
        setTotalRepertorios(response.paginacao.totalDocuments);
        setTotalPages(Math.ceil(response.paginacao.totalDocuments / response.paginacao.limit));
        setCurrentLimit(response.paginacao.limit);

        if (isLoggedIn) {
          setFavoritos(mappedRepertorios.filter(r => r.favoritadoPeloUsuario).map(r => r.id));
        } else {
          setFavoritos([]);
        }

        return {
          documents: mappedRepertorios,
          pagination: response.paginacao
        };
      }
      return { documents: [], pagination: { offset: 0, limit: 0, nextPageUrl: null, previousPageUrl: null, totalDocuments: 0 } };
    } catch (e) {
      console.error('Context: Erro ao buscar repertórios:', e);
      return { documents: [], pagination: { offset: 0, limit: 0, nextPageUrl: null, previousPageUrl: null, totalDocuments: 0 } };
    } finally {
      setIsLoadingRepertorios(false);
    }
  }, [isLoggedIn, currentLimit]);

  const toggleFavorito = async (id: string) => {
    if (!isLoggedIn) {
      alert("Você precisa estar logado para favoritar repertórios.");
      return;
    }
    const isCurrentlyFavorito = favoritos.includes(id);
    try {
      if (isCurrentlyFavorito) {
        await removeFavorito(id);
        setFavoritos((prev) => prev.filter((favId) => favId !== id));
        setRepertorios(prev => prev.map(rep => rep.id === id ? { ...rep, favoritadoPeloUsuario: false } : rep));
      } else {
        await addFavorito(id);
        setFavoritos((prev) => [...prev, id]);
        setRepertorios(prev => prev.map(rep => rep.id === id ? { ...rep, favoritadoPeloUsuario: true } : rep));
      }
    } catch (e) {
      console.error("Erro ao alternar favorito:", e);
    }
  }

  const adicionarRepertorio = async (data: RepertorioFormData): Promise<Repertorio> => {
    const novoRepertorio: Repertorio = {
      ...data,
      id: Date.now().toString(),
      isPublico: true,
      totalLikes: 0,
      favoritadoPeloUsuario: false,
      likeDoUsuario: false,
      criador: { id: "mock_id", nome: "Mock User" }
    } as Repertorio;
    setRepertorios((prev) => [novoRepertorio, ...prev]);
    return novoRepertorio;
  }

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
        pesquisarRepertorios,
        buscarPorId,
        currentPage,
        totalPages,
        totalRepertorios,
        setPage,
        isLoadingRepertorios,
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
