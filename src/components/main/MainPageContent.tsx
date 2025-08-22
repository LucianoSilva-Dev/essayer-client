'use client'

import { useState, useEffect, useRef } from "react";
import { useRepertorio } from "@/contexts/repertorio-context";
import RepertorioFilters from "./filters/RepertorioFilters";
import RepertorioGrid from "./RepertorioGrid";
import Pagination from "./Pagination"; // Importe o novo componente
import { useRepertorioFilters } from "@/hooks/useRepertorioFilters"; // Importe o hook

export default function MainPage() {
  const {
    repertorios,
    pesquisarRepertorios,
    totalPages,
    currentPage,
    setPage,
    isLoadingRepertorios,
    totalRepertorios,
  } = useRepertorio();

  const {
    filters,
    handleFilterChange,
    recorteOptions,
    activeFilterCount,
  } = useRepertorioFilters();

  const [tipoVisualizacao, setTipoVisualizacao] = useState<"todos" | "salvos">("todos");
  
  const isInitialMount = useRef(true);

  // Efeito para resetar a página quando qualquer filtro (exceto a própria página) mudar.
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      setPage(0);
    }
  }, [filters, tipoVisualizacao, setPage]);

  // Efeito unificado que busca os dados, com debounce para evitar chamadas excessivas.
  useEffect(() => {
    const handler = setTimeout(() => {
      pesquisarRepertorios({
        search: filters.termoBusca,
        eixos: filters.eixosAtivos,
        subtopicos: filters.recorteAtivo ? [filters.recorteAtivo] : [],
        modelo: filters.modeloAtivo ? [filters.modeloAtivo] : [],
        orderBy: filters.ordenarPor,
        offset: currentPage * 15,
        limit: 15,
        favoritedByCurrentUser: tipoVisualizacao === "salvos"
      });
    }, 500); // Debounce de 500ms

    return () => {
      clearTimeout(handler);
    };
  }, [filters, tipoVisualizacao, currentPage, pesquisarRepertorios]);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <RepertorioFilters
          termoBusca={filters.termoBusca}
          setTermoBusca={(value) => handleFilterChange("termoBusca", value)}
          eixosAtivos={filters.eixosAtivos}
          setEixosAtivos={(value) => handleFilterChange("eixosAtivos", value)}
          recorteAtivo={filters.recorteAtivo}
          setRecorteAtivo={(value) => handleFilterChange("recorteAtivo", value)}
          modeloAtivo={filters.modeloAtivo}
          setModeloAtivo={(value) => handleFilterChange("modeloAtivo", value)}
          ordenarPor={filters.ordenarPor}
          setOrdenarPor={(value) => handleFilterChange("ordenarPor", value)}
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

          {!isLoadingRepertorios && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          )}
        </div>
      </div>
    </main>
  );
}
