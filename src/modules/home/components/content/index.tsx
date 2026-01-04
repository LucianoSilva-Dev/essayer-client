'use client'

import { useState, useEffect, useRef } from "react";
import { useRepertorio } from "@/shared/contexts/repertorio-context";
import RepertorioFilters from "../../filters/RepertorioFilters";
import RepertorioGrid from "../repertorio-grid";
import Pagination from "../pagination";
import { useRepertorioFilters } from "@/shared/hooks/useRepertorioFilters";

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
    termoBusca, setTermoBusca,
    eixosAtivos, setEixosAtivos,
    recorteAtivo, setRecorteAtivo,
    modeloAtivo, setModeloAtivo,
    ordenarPor, setOrdenarPor,
    recorteOptions,
    activeFilterCount
  } = useRepertorioFilters();
  
  const [tipoVisualizacao, setTipoVisualizacao] = useState<"todos" | "salvos">("todos");
  
  const isInitialMount = useRef(true);

  // Efeito para buscar os dados sempre que um filtro ou a página mudar
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const handler = setTimeout(() => {
      pesquisarRepertorios({
        search: termoBusca,
        eixos: eixosAtivos,
        subtopicos: recorteAtivo ? [recorteAtivo] : [],
        modelo: modeloAtivo ? [modeloAtivo] : [],
        orderBy: ordenarPor,
        offset: currentPage * 15,
        limit: 15,
        favoritedByCurrentUser: tipoVisualizacao === "salvos" ? true : undefined
      });
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [termoBusca, eixosAtivos, recorteAtivo, modeloAtivo, ordenarPor, tipoVisualizacao, currentPage, pesquisarRepertorios]);

  // CORREÇÃO AQUI:
  // Removi 'currentPage' das dependências. Agora ele só reseta se os FILTROS mudarem.
  useEffect(() => {
    // Verificamos se não é a montagem inicial para evitar reset desnecessário no load
    if (!isInitialMount.current) {
        setPage(0);
    }
  }, [termoBusca, eixosAtivos, recorteAtivo, modeloAtivo, ordenarPor, tipoVisualizacao, setPage]); 


  return (
    <main className="min-h-screen bg-gray-50 overflow-x-visible no-scrollbar">
      <div className="container mx-auto px-4 py-8">
        <RepertorioFilters
          termoBusca={termoBusca}
          setTermoBusca={setTermoBusca}
          eixosAtivos={eixosAtivos}
          setEixosAtivos={setEixosAtivos}
          recorteAtivo={recorteAtivo}
          setRecorteAtivo={setRecorteAtivo}
          modeloAtivo={modeloAtivo}
          setModeloAtivo={setModeloAtivo}
          ordenarPor={ordenarPor}
          setOrdenarPor={setOrdenarPor}
          recorteOptions={recorteOptions}
          filtrosAtivosCount={activeFilterCount + (tipoVisualizacao === 'salvos' ? 1 : 0)}
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