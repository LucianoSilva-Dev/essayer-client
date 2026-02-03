"use client";

import RepertorioFilters from "../../filters/RepertorioFilters";
import RepertorioGrid from "../repertorio-grid";
import Pagination from "../pagination";
import { useHomeRepertorios } from "../../hooks/useContentHomeRepertorios";

export default function HomeContent() {
  const { repertorio, filters, tipoVisualizacao, setTipoVisualizacao } =
    useHomeRepertorios();

  return (
    <main className="min-h-screen bg-gray-50 overflow-x-visible no-scrollbar">
      <div className="container mx-auto px-4 py-8">
        <RepertorioFilters
          {...filters}
          filtrosAtivosCount={
            filters.activeFilterCount + (tipoVisualizacao === "salvos" ? 1 : 0)
          }
          tipoVisualizacao={tipoVisualizacao}
          onTipoVisualizacaoChange={setTipoVisualizacao}
        />

        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {tipoVisualizacao === "salvos"
                  ? "Repertórios salvos"
                  : "Repertórios disponíveis"}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {repertorio.totalRepertorios} resultado(s) encontrado(s)
              </p>
            </div>
          </div>

          <RepertorioGrid
            isLoading={repertorio.isLoadingRepertorios}
            repertorios={repertorio.repertorios}
            tipoVisualizacao={tipoVisualizacao}
            activeFilterCount={filters.activeFilterCount}
          />

          {!repertorio.isLoadingRepertorios && repertorio.totalPages > 1 && (
            <Pagination
              currentPage={repertorio.currentPage}
              totalPages={repertorio.totalPages}
              onPageChange={repertorio.setPage}
            />
          )}
        </div>
      </div>
    </main>
  );
}
