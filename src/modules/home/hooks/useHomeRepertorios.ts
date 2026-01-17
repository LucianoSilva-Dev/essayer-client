'use client'

import { useEffect, useRef, useState } from "react"
import { useRepertorio } from "@/shared/contexts/repertorio-context"
import { useRepertorioFilters } from "@/shared/hooks/useRepertorioFilters"

export function useHomeRepertorios() {
  const {
    repertorios,
    pesquisarRepertorios,
    totalPages,
    totalRepertorios,
    currentPage,
    setPage,
    isLoadingRepertorios,
  } = useRepertorio()

  const filters = useRepertorioFilters()

  const [tipoVisualizacao, setTipoVisualizacao] =
    useState<"todos" | "salvos">("todos")

  const isInitialMount = useRef(true)

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }

    const timeout = setTimeout(() => {
      pesquisarRepertorios({
        search: filters.termoBusca,
        eixos: filters.eixosAtivos,
        subtopicos: filters.recorteAtivo
          ? [filters.recorteAtivo]
          : [],
        modelo: filters.modeloAtivo
          ? [filters.modeloAtivo]
          : [],
        orderBy: filters.ordenarPor,
        offset: currentPage * 15,
        limit: 15,
        favoritedByCurrentUser:
          tipoVisualizacao === "salvos" ? true : undefined,
      })
    }, 500)

    return () => clearTimeout(timeout)
  }, [
    filters.termoBusca,
    filters.eixosAtivos,
    filters.recorteAtivo,
    filters.modeloAtivo,
    filters.ordenarPor,
    tipoVisualizacao,
    currentPage,
    pesquisarRepertorios,
  ])

  useEffect(() => {
    if (!isInitialMount.current) {
      setPage(0)
    }
  }, [
    filters.termoBusca,
    filters.eixosAtivos,
    filters.recorteAtivo,
    filters.modeloAtivo,
    filters.ordenarPor,
    tipoVisualizacao,
    setPage,
  ])

  return {
    repertorio: {
      repertorios,
      totalPages,
      totalRepertorios,
      currentPage,
      setPage,
      isLoadingRepertorios,
    },
    filters,
    tipoVisualizacao,
    setTipoVisualizacao,
  }
}
