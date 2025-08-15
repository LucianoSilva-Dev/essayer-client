'use client'

import type React from "react"
import { useState, useEffect, useMemo, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRepertorio } from "@/./contexts/repertorio-context"
import RepertorioFilters from "./filters/RepertorioFilters"
import RepertorioGrid from "./RepertorioGrid"
import { EixosTematicos } from "@/constants/eixos"

export default function MainPage() {
  const { repertorios, pesquisarRepertorios, totalPages, currentPage, setPage, isLoadingRepertorios, totalRepertorios } = useRepertorio()

  // 1. Centralização de todo o estado dos filtros
  const [filters, setFilters] = useState({
    termoBusca: "",
    eixosAtivos: [] as string[],
    recorteAtivo: null as string | null,
    modeloAtivo: null as string | null,
    ordenarPor: 'Newest' as 'MaxLikes' | 'MinLikes' | 'Newest' | 'Oldest',
  });
  const [tipoVisualizacao, setTipoVisualizacao] = useState<"todos" | "salvos">("todos");

  // 2. Lógica de busca de dados com debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      const fetchRepertorios = async () => {
        setPage(0); // Reseta a página para a primeira ao aplicar novos filtros
        await pesquisarRepertorios({
          search: filters.termoBusca,
          eixos: filters.eixosAtivos,
          subtopicos: filters.recorteAtivo ? [filters.recorteAtivo] : [],
          modelo: filters.modeloAtivo ? [filters.modeloAtivo] : [],
          orderBy: filters.ordenarPor,
          offset: 0, // Inicia a busca sempre da primeira página
          limit: 15,
          favoritedByCurrentUser: tipoVisualizacao === "salvos"
        });
      }
      fetchRepertorios();
    }, 500); // Aguarda 500ms após a última mudança nos filtros

    return () => {
      clearTimeout(handler);
    };
  }, [filters, tipoVisualizacao, pesquisarRepertorios, setPage]);

  // Efeito separado para buscar dados quando a página muda (sem debounce)
  useEffect(() => {
    const fetchRepertoriosPaginados = async () => {
      await pesquisarRepertorios({
        search: filters.termoBusca,
        eixos: filters.eixosAtivos,
        subtopicos: filters.recorteAtivo ? [filters.recorteAtivo] : [],
        modelo: filters.modeloAtivo ? [filters.modeloAtivo] : [],
        orderBy: filters.ordenarPor,
        offset: currentPage * 15,
        limit: 15,
        favoritedByCurrentUser: tipoVisualizacao === "salvos"
      });
    }
    // Evita a busca inicial duplicada no primeiro carregamento
    if (currentPage > 0) {
      fetchRepertoriosPaginados();
    }
  }, [currentPage, pesquisarRepertorios]);


  const recorteOptions = useMemo(() => {
    if (filters.eixosAtivos.length > 0) {
      const allRecortes = filters.eixosAtivos.flatMap(eixo => EixosTematicos[eixo as keyof typeof EixosTematicos] || []);
      return [...new Set(allRecortes)];
    }
    return Object.values(EixosTematicos).flat();
  }, [filters.eixosAtivos]);

  const activeFilterCount = [filters.termoBusca, filters.eixosAtivos.length > 0, filters.recorteAtivo, filters.modeloAtivo, tipoVisualizacao === 'salvos'].filter(Boolean).length;

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <RepertorioFilters
          termoBusca={filters.termoBusca} setTermoBusca={(value) => setFilters(f => ({...f, termoBusca: value}))}
          eixosAtivos={filters.eixosAtivos} setEixosAtivos={(value) => setFilters(f => ({...f, eixosAtivos: value, recorteAtivo: null}))}
          recorteAtivo={filters.recorteAtivo} setRecorteAtivo={(value) => setFilters(f => ({...f, recorteAtivo: value}))}
          modeloAtivo={filters.modeloAtivo} setModeloAtivo={(value) => setFilters(f => ({...f, modeloAtivo: value}))}
          ordenarPor={filters.ordenarPor} setOrdenarPor={(value) => setFilters(f => ({...f, ordenarPor: value}))}
          recorteOptions={recorteOptions}
          filtrosAtivosCount={activeFilterCount}
          tipoVisualizacao={tipoVisualizacao}
          onTipoVisualizacaoChange={setTipoVisualizacao}
        />

        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {tipoVisualizacao === "salvos" ? "Repertórios salvos" : "Repertórios disponíveis"}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {totalRepertorios} resultado(s) encontrado(s)
              </p>
            </div>
          </div>

          <RepertorioGrid
            isLoading={isLoadingRepertorios}
            repertorios={repertorios}
            tipoVisualizacao={tipoVisualizacao}
            activeFilterCount={activeFilterCount}
          />

          {!isLoadingRepertorios && totalPages > 1 && (
            <div className="flex justify-center items-center mt-8 space-x-2">
              <button
                onClick={() => setPage(currentPage - 1)}
                disabled={currentPage === 0}
                className="p-2 rounded-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={20} />
              </button>
              {Array.from({ length: totalPages }, (_, index) => {
                const isWithinRange = Math.abs(currentPage - index) <= 2 || index === 0 || index === totalPages - 1;
                const isEllipsis = Math.abs(currentPage - index) > 2 && index !== 0 && index !== totalPages - 1;

                if (isWithinRange) {
                  return (
                    <button
                      key={index}
                      onClick={() => setPage(index)}
                      className={`px-4 py-2 rounded-full ${currentPage === index ? "bg-teal-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"}`}
                    >
                      {index + 1}
                    </button>
                  );
                } else if (isEllipsis && (index === currentPage - 3 || index === currentPage + 3)) {
                  return <span key={`ellipsis-${index}`} className="px-2 py-2 text-gray-700">...</span>;
                }
                return null;
              })}
              <button
                onClick={() => setPage(currentPage + 1)}
                disabled={currentPage >= totalPages - 1}
                className="p-2 rounded-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
