'use client'

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { Search, Filter, Plus, BookOpen, FileText, Quote, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useRepertorio } from "@/../contexts/repertorio-context"
import RepertorioCard from "@/../components/repertorio/repertorio-card"
import { EixosTematicos, EixoOptions } from "@/../constants/eixos"
import { useAuth } from "@/../contexts/auth-context" // 1. Importar o hook useAuth

const modelosOptions = [
  {
    id: "Obra",
    nome: "Obra",
    icone: BookOpen,
    cor: "bg-blue-100 text-blue-700 border-blue-200",
  },
  {
    id: "Artigo",
    nome: "Artigo",
    icone: FileText,
    cor: "bg-green-100 text-green-700 border-green-200",
  },
  {
    id: "Citacao",
    nome: "Citação",
    icone: Quote,
    cor: "bg-purple-100 text-purple-700 border-purple-200",
  },
]

export default function Main() {
  const { userData } = useAuth() // 2. Obter os dados do usuário
  const { repertorios, pesquisarRepertorios, totalPages, currentPage, setPage, isLoadingRepertorios, totalRepertorios } = useRepertorio()
  const [termoBusca, setTermoBusca] = useState("")
  const [eixosAtivos, setEixosAtivos] = useState<string[]>([])
  const [recorteAtivo, setRecorteAtivo] = useState<string | null>(null)
  const [modeloAtivo, setModeloAtivo] = useState<string | null>(null)
  const [tipoVisualizacao, setTipoVisualizacao] = useState<"todos" | "salvos">("todos")
  const [showFilters, setShowFilters] = useState(false)
  const [ordenarPor, setOrdenarPor] = useState<'MaxLikes' | 'MinLikes' | 'Newest' | 'Oldest'>('Newest');
  const [recorteOptions, setRecorteOptions] = useState<string[]>([]);

  useEffect(() => {
    if (eixosAtivos.length > 0) {
      const allRecortes = eixosAtivos.flatMap( (eixo: string) => EixosTematicos[eixo as keyof typeof EixosTematicos] || [])
      const uniqueRecortes = [...new Set(allRecortes)]
      setRecorteOptions(uniqueRecortes);
    } else {
      setRecorteOptions(Object.values(EixosTematicos).flat());
    }
    setRecorteAtivo(null); // Reseta o recorte quando o eixo muda
  }, [eixosAtivos]);

  const memoizedFetchRepertorios = useCallback(async () => {
    console.log("Main: fetchRepertorios disparado.");
    const filters: Parameters<typeof pesquisarRepertorios>[0] = {
      offset: currentPage * 15,
      limit: 15,
      orderBy: ordenarPor,
    };

    if (termoBusca) {
      filters.search = termoBusca;
    }
    if (eixosAtivos.length > 0) {
      filters.eixos = eixosAtivos;
    }
    if (recorteAtivo) {
      filters.subtopicos = [recorteAtivo];
    }
    if (modeloAtivo) {
      filters.modelo = [modeloAtivo];
    }
    if (tipoVisualizacao === "salvos") {
      filters.favoritedByCurrentUser = true;
    }

    await pesquisarRepertorios(filters);
  }, [
    currentPage,
    termoBusca,
    eixosAtivos,
    recorteAtivo,
    modeloAtivo,
    tipoVisualizacao,
    ordenarPor,
    pesquisarRepertorios,
  ]);

  useEffect(() => {
    memoizedFetchRepertorios();
  }, [memoizedFetchRepertorios]);
  
  const handleEixoToggle = (eixo: string) => {
    setEixosAtivos(prev => 
      prev.includes(eixo) ? prev.filter(e => e !== eixo) : [...prev, eixo]
    )
    setPage(0)
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(0);
  };

  const handlePageChange = (newPage: number) => {
    console.log("Main: handlePageChange clicado, nova página:", newPage);
    setPage(newPage);
  };

  const handleClearFilters = () => {
    setEixosAtivos([]);
    setRecorteAtivo(null);
    setModeloAtivo(null);
    setTermoBusca("");
    setOrdenarPor('Newest');
    setPage(0);
    setShowFilters(false);
  };

  const countActiveFilters = () => {
    let count = 0;
    if (eixosAtivos.length > 0) count++;
    if (recorteAtivo) count++;
    if (modeloAtivo) count++;
    if (termoBusca) count++;
    if (tipoVisualizacao === "salvos") count++;
    return count;
  };

  const filtrosAtivosCount = countActiveFilters();

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            Pronto para turbinar
            <br />
            suas redações?
          </h1>

          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => { setTipoVisualizacao("salvos"); setPage(0); }}
              className={`px-6 py-3 rounded-full border-2 transition-colors cursor-pointer ${tipoVisualizacao === "salvos"
                ? "bg-teal-600 text-white border-teal-600"
                : "bg-white text-teal-600 border-teal-600 hover:bg-teal-50"
                }`}
            >
              Repertórios salvos
            </button>
            <button
              onClick={() => { setTipoVisualizacao("todos"); setPage(0); }}
              className={`px-6 py-3 rounded-full border-2 transition-colors cursor-pointer ${tipoVisualizacao === "todos"
                ? "bg-teal-600 text-white border-teal-600"
                : "bg-white text-teal-600 border-teal-600 hover:bg-teal-50"
                }`}
            >
              Repertórios
            </button>
          </div>

          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className="flex items-center bg-white rounded-full border border-gray-300 shadow-sm">
                <div className="pl-4">
                  <Search className="text-gray-400" size={20} />
                </div>
                <input
                  type="text"
                  placeholder="Pesquise por palavra-chave, título, autor ou obra"
                  className="flex-1 py-4 px-4 bg-transparent focus:outline-none text-gray-700"
                  value={termoBusca}
                  onChange={(e) => setTermoBusca(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowFilters(!showFilters)}
                  className={`pr-4 transition-colors relative ${showFilters ? "text-teal-600" : "text-gray-400 hover:text-gray-600"
                    }`}
                >
                  <Filter size={20} />
                  {filtrosAtivosCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-teal-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {filtrosAtivosCount}
                    </span>
                  )}
                </button>
              </div>
            </form>

            {showFilters && (
              <div className="mt-4 p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Filtrar por Tipo</h3>
                  <div className="flex flex-wrap gap-2">
                    {modelosOptions.map((modelo) => {
                      const IconeModelo = modelo.icone
                      const isActive = modeloAtivo === modelo.id
                      return (
                        <button
                          key={modelo.id}
                          onClick={() => { setModeloAtivo(isActive ? null : modelo.id); setPage(0); }}
                          className={`flex items-center px-3 py-2 text-sm rounded-full border transition-colors ${isActive ? modelo.cor : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                            }`}
                        >
                          <IconeModelo size={14} className="mr-1.5" />
                          {modelo.nome}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Filtrar por Eixo Temático</h3>
                  <div className="flex flex-wrap gap-2">
                    {EixoOptions.map((eixo) => (
                      <button
                        key={eixo}
                        onClick={() => handleEixoToggle(eixo)}
                        className={`px-3 py-2 text-sm rounded-full border transition-colors ${eixosAtivos.includes(eixo)
                          ? "bg-teal-100 text-teal-700 border-teal-200"
                          : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                          }`}
                      >
                        {eixo}
                      </button>
                    ))}
                  </div>
                </div>

                {eixosAtivos.length > 0 && recorteOptions.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Filtrar por Recorte</h3>
                    <div className="flex flex-wrap gap-2">
                      {recorteOptions.map((recorte) => (
                        <button
                          key={recorte}
                          onClick={() => { setRecorteAtivo(recorteAtivo === recorte ? null : recorte); setPage(0); }}
                          className={`px-3 py-2 text-sm rounded-full border transition-colors ${recorte === recorteAtivo
                            ? "bg-teal-100 text-teal-700 border-teal-200"
                            : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                            }`}
                        >
                          {recorte}
                        </button>
                      ))}
                    </div>
                  </div>
                )}


                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Ordenar por</h3>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => { setOrdenarPor('Newest'); setPage(0); }}
                      className={`px-3 py-2 text-sm rounded-full border transition-colors ${ordenarPor === 'Newest'
                        ? "bg-blue-100 text-blue-700 border-blue-200"
                        : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                        }`}
                    >
                      Mais Novos
                    </button>
                    <button
                      onClick={() => { setOrdenarPor('Oldest'); setPage(0); }}
                      className={`px-3 py-2 text-sm rounded-full border transition-colors ${ordenarPor === 'Oldest'
                        ? "bg-blue-100 text-blue-700 border-blue-200"
                        : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                        }`}
                    >
                      Mais Antigos
                    </button>
                    <button
                      onClick={() => { setOrdenarPor('MaxLikes'); setPage(0); }}
                      className={`px-3 py-2 text-sm rounded-full border transition-colors ${ordenarPor === 'MaxLikes'
                        ? "bg-blue-100 text-blue-700 border-blue-200"
                        : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                        }`}
                    >
                      Mais Curtidos
                    </button>
                    <button
                      onClick={() => { setOrdenarPor('MinLikes'); setPage(0); }}
                      className={`px-3 py-2 text-sm rounded-full border transition-colors ${ordenarPor === 'MinLikes'
                        ? "bg-blue-100 text-blue-700 border-blue-200"
                        : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                        }`}
                    >
                      Menos Curtidos
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <div className="text-sm text-gray-500">
                    {filtrosAtivosCount > 0 ? `${filtrosAtivosCount} filtro(s) ativo(s)` : "Nenhum filtro ativo"}
                  </div>
                  {filtrosAtivosCount > 0 && (
                    <button onClick={handleClearFilters} className="text-sm text-teal-600 hover:text-teal-700 font-medium">
                      Limpar filtros
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {tipoVisualizacao === "salvos" ? "Repertórios salvos" : "Repertórios disponíveis"}
              </h2>
              {filtrosAtivosCount > 0 && (
                <p className="text-sm text-gray-600 mt-1">
                  {totalRepertorios} resultado(s) encontrado(s)
                  {modeloAtivo && (
                    <span className="ml-1">
                      • Tipo: <span className="font-medium">{modelosOptions.find((m) => m.id === modeloAtivo)?.nome}</span>
                    </span>
                  )}
                  {eixosAtivos.length > 0 && (
                    <span className="ml-1">
                      • Eixo(s): <span className="font-medium">{eixosAtivos.join(', ')}</span>
                    </span>
                  )}
                  {recorteAtivo && (
                    <span className="ml-1">
                      • Recorte: <span className="font-medium">{recorteAtivo}</span>
                    </span>
                  )}
                  {ordenarPor && (
                    <span className="ml-1">
                      • Ordenação: <span className="font-medium">
                        {ordenarPor === 'MaxLikes' ? 'Mais Curtidos' :
                          ordenarPor === 'MinLikes' ? 'Menos Curtidos' :
                            ordenarPor === 'Newest' ? 'Mais Novos' : 'Mais Antigos'}
                      </span>
                    </span>
                  )}
                </p>
              )}
            </div>
          </div>

          {isLoadingRepertorios ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Carregando repertórios...</p>
            </div>
          ) : repertorios.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-white rounded-lg shadow-sm p-8">
                <p className="text-gray-500 mb-4">
                  {filtrosAtivosCount > 0
                    ? "Nenhum repertório encontrado com os filtros aplicados."
                    : tipoVisualizacao === "salvos"
                      ? "Você ainda não tem repertórios salvos."
                      : "Nenhum repertório disponível. Comece adicionando um!"}
                </p>
                
                {/* 3. Apenas professores e admins podem ver os botões de ação */}
                {(userData?.cargo === 'professor' || userData?.cargo === 'admin') && (
                  <>
                    {filtrosAtivosCount > 0 ? (
                      <button
                        onClick={handleClearFilters}
                        className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors mr-3"
                      >
                        Limpar filtros
                      </button>
                    ) : null}
                    <Link
                      href="/adicionar"
                      className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
                    >
                      <Plus size={18} className="mr-2" />
                      Adicionar novo repertório
                    </Link>
                  </>
                )}
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {repertorios.map((repertorio) => (
                  <RepertorioCard key={repertorio.id} repertorio={repertorio} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center items-center mt-8 space-x-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
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
                          onClick={() => handlePageChange(index)}
                          className={`px-4 py-2 rounded-full ${currentPage === index ? "bg-teal-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
                            }`}
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
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages - 1}
                    className="p-2 rounded-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  )
}