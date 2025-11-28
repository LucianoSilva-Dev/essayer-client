'use client'

import { useState } from "react";
import { Search } from "lucide-react";
import { EixoOptions } from "@/constants/eixos";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const modelosOptions = [
  { id: "Obra", nome: "Obra", icone: "/coloredObraIcon.svg", cor: "bg-yellow-100 text-yellow-700 border-yellow-200" },
  { id: "Artigo", nome: "Artigo", icone: "/coloredArtigoIcon.svg", cor: "bg-blue-100 text-blue-700 border-blue-200" },
  { id: "Citacao", nome: "Citação", icone: "/coloredCitacaoIcon.svg", cor: "bg-green-100 text-green-700 border-green-200" },
];

interface RepertorioFiltersProps {
  termoBusca: string;
  setTermoBusca: (value: string) => void;
  eixosAtivos: string[];
  setEixosAtivos: (value: string[]) => void;
  recorteAtivo: string | null;
  setRecorteAtivo: (value: string | null) => void;
  modeloAtivo: string | null;
  setModeloAtivo: (value: string | null) => void;
  ordenarPor: string;
  setOrdenarPor: (value: any) => void;
  recorteOptions: string[];
  filtrosAtivosCount: number;
  tipoVisualizacao: "todos" | "salvos";
  onTipoVisualizacaoChange: (tipo: "todos" | "salvos") => void;
}

export default function RepertorioFilters({
  termoBusca, setTermoBusca, eixosAtivos, setEixosAtivos,
  recorteAtivo, setRecorteAtivo, modeloAtivo, setModeloAtivo,
  ordenarPor, setOrdenarPor, recorteOptions, filtrosAtivosCount,
  tipoVisualizacao, onTipoVisualizacaoChange
}: RepertorioFiltersProps) {
  const [showFilters, setShowFilters] = useState(false);

  const handleEixoToggle = (eixo: string) => {
    setEixosAtivos(
      eixosAtivos.includes(eixo)
        ? eixosAtivos.filter(e => e !== eixo)
        : [...eixosAtivos, eixo]
    );
  };

  const handleClearFilters = () => {
    setTermoBusca("");
    setEixosAtivos([]);
    setRecorteAtivo(null);
    setModeloAtivo(null);
    setOrdenarPor('Newest');
    setShowFilters(false);
  };

  return (
    <div className="text-center mb-8 lg:mb-12 mt-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        Pronto para turbinar
        <br />
        suas redações?
      </h1>

      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => onTipoVisualizacaoChange("salvos")}
          className={`w-[330px] h-[54px] rounded-[40px] text-[22px] font-montserrat font-medium italic transition-all duration-500 origin-bottom cursor-pointer px-10 ${tipoVisualizacao === "salvos"
            ? "bg-[#CDDEE2] text-[#075F70] opacity-100"
            : "bg-white text-[#075F70] opacity-40 scale-97"
            }`}
          style={{ boxShadow: "0px 3px 0px #075F70B2" }}
        >
          Repertórios salvos
        </button>
        <button
          onClick={() => onTipoVisualizacaoChange("todos")}
          className={`w-[330px] h-[54px] rounded-[40px] text-[22px] font-montserrat font-medium italic transition-all duration-500 origin-bottom cursor-pointer px-10 ${tipoVisualizacao === "todos"
            ? "bg-[#CDDEE2] text-[#075F70] opacity-100"
            : "bg-white text-[#075F70] opacity-40 scale-97"
            }`}
          style={{ boxShadow: "0px 3px 0px #075F70B2" }}
        >
          Repertórios disponíveis
        </button>
      </div>

      <div className="max-w-2xl mx-auto">
        <form onSubmit={(e) => e.preventDefault()} className="relative">
          {/* DIV PAI - CORREÇÃO 1: Removendo o max-h e transição CSS, Framer Motion controlará a altura */}
          <div
            className={`bg-white rounded-[20px] shadow-lg border border-gray-200 overflow-hidden`}
            // Nota: O 'overflow-hidden' é mantido para garantir que a animação de altura funcione corretamente.
          >
            {/* SearchBar (Sempre visível) */}
            <div className={`flex items-center h-[65px] px-4 shadow-sm rounded-[20px] ${showFilters ? "mb-5" : ""} transition-all duration-300`}>
              <Search className="text-gray-800 mr-3" size={28} />
              <input
                type="text"
                placeholder="Pesquise por palavra-chave, título, autor ou obra"
                className="flex-1 bg-transparent focus:outline-none text-gray-700 placeholder-gray-400"
                value={termoBusca}
                onChange={(e) => setTermoBusca(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="ml-3 font-bold text-gray-800 hover:text-gray-600 transition-colors relative"
              >
                {showFilters ? "Fechar" : "Filtrar"}
                {filtrosAtivosCount > 0 && (
                  <span className="absolute -top-1 -right-3 bg-teal-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {filtrosAtivosCount}
                  </span>
                )}
              </button>
            </div>

            {/* DIV BANDEJA DE FILTROS - CORREÇÃO 2: Usando AnimatePresence e motion.div */}
            <AnimatePresence initial={false}>
              {showFilters && (
                <motion.div
                  key="filter-tray" // Chave obrigatória para AnimatePresence
                  initial={{ opacity: 0, height: 0, paddingBottom: 0 }}
                  animate={{ opacity: 1, height: "auto", paddingBottom: 0 }} // pb-6 é 24px
                  exit={{ opacity: 0, height: 0, paddingBottom: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  
                  // Mantendo px-6, removendo pb-6 (controlado pelo framer-motion)
                  className={`px-6`} 
                >
                  {/* Filtros por tipo */}
                  <div className="mb-6">
                    <h3 className="text-md font-semibold text-gray-700 mb-3 text-left">Filtrar por Tipo</h3>
                    <div className="flex flex-wrap gap-2">
                      {modelosOptions.map((modelo) => (
                        <button
                          key={modelo.id}
                          onClick={() => setModeloAtivo(modeloAtivo === modelo.id ? null : modelo.id)}
                          className={`flex items-center px-3 py-2 text-md rounded-full transition-all duration-500 ${modeloAtivo === modelo.id
                            ? `${modelo.cor} shadow-md scale-105`
                            : "bg-gray-200 text-gray-700 border-gray-200 hover:bg-gray-300"
                            }`}
                        >
                          <Image src={modelo.icone} alt={modelo.nome} width={16} height={16} className="mr-1.5 w-4 h-4 inline-block" />
                          {modelo.nome}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Filtros por eixo */}
                  <div className="mb-6">
                    <h3 className="text-md font-semibold text-gray-700 mb-3 text-left">Filtrar por Eixo Temático</h3>
                    <div className="flex flex-wrap gap-3">
                      {EixoOptions.map((eixo) => (
                        <button
                          key={eixo.nome}
                          onClick={() => handleEixoToggle(eixo.nome)}
                          className={`flex items-center pl-0 pr-4 py-0 text-md rounded-full transition-all duration-300 font-medium ${eixosAtivos.includes(eixo.nome)
                            ? "bg-[#075F70] text-[#F1F1F1] shadow-sm"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                        >
                          <div className={`flex items-center justify-center mr-2 w-10 h-10 rounded-full shadow-inner transition-all duration-300 ${eixosAtivos.includes(eixo.nome) ? "bg-[#075F70] border border-1 border-[#E5EFF0]" : "bg-[#E5EFF0]"}`}>
                            <Image width={24} height={24} src={eixo.icon} alt={eixo.nome} className={`transition-all duration-300 scale-80 ${eixosAtivos.includes(eixo.nome) ? "filter brightness-0 invert" : ""}`} />
                          </div>
                          {eixo.nome}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Filtros por Recorte (Mantenha a lógica de animação interna) */}
                  <div
                    className={`transition-all duration-500 ease-in-out overflow-y-scroll
                      ${eixosAtivos.length > 0 && recorteOptions.length > 0
                        ? 'opacity-100 max-h-[300px] translate-y-0 mb-6'
                        : 'opacity-0 max-h-0 -translate-y-2 pointer-events-none mb-0'
                      }`}
                  >
                    <h3 className="text-md font-semibold text-gray-700 mb-3 text-left">
                      Filtrar por Recorte
                    </h3>

                    <div className="flex flex-wrap gap-2">
                      <AnimatePresence initial={false}>
                        {recorteOptions.map((recorte) => (
                          <motion.button
                            key={recorte}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => setRecorteAtivo(recorteAtivo === recorte ? null : recorte)}
                            className={`px-3 py-2 text-md rounded-[15px] transition-colors duration-200 ${recorte === recorteAtivo
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                              }`}
                          >
                            {recorte}
                          </motion.button>
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>


                  {/* Ordenação */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3 text-left">Ordenar por</h3>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setOrdenarPor("Newest")}
                        className={`px-3 py-2 text-sm rounded-[15px] bg-gray-200 transition-colors ${ordenarPor === "Newest"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-50 text-gray-700 hover:bg-gray-300"
                          }`}
                      >
                        Mais Novos
                      </button>
                      <button
                        onClick={() => setOrdenarPor("Oldest")}
                        className={`px-3 py-2 text-sm rounded-[15px] bg-gray-200 transition-colors duration-300 ${ordenarPor === "Oldest"
                          ? "bg-blue-100 text-blue-700 border-blue-200"
                          : "text-gray-700 border-gray-200 hover:bg-gray-300"
                          }`}
                      >
                        Mais Antigos
                      </button>
                      <button
                        onClick={() => setOrdenarPor("MaxLikes")}
                        className={`px-3 py-2 text-sm rounded-[15px] bg-gray-200 transition-colors ${ordenarPor === "MaxLikes"
                          ? "bg-blue-100 text-blue-700 border-blue-200"
                          : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-300"
                          }`}
                      >
                        Mais Curtidos
                      </button>
                      <button
                        onClick={() => setOrdenarPor("MinLikes")}
                        className={`px-3 py-2 text-sm rounded-[15px] bg-gray-200 transition-colors ${ordenarPor === "MinLikes"
                          ? "bg-blue-100 text-blue-700 border-blue-200"
                          : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-300"
                          }`}
                      >
                        Menos Curtidos
                      </button>
                    </div>
                  </div>

                  {/* Rodapé de filtros */}
                  <div className="flex justify-between items-center pt-4 border-t border-gray-400">
                    <div className="text-sm text-gray-500">
                      {filtrosAtivosCount > 0
                        ? `${filtrosAtivosCount} filtro(s) ativo(s)`
                        : "Nenhum filtro ativo"}
                    </div>
                    {filtrosAtivosCount > 0 && (
                      <button
                        onClick={handleClearFilters}
                        className="text-sm text-teal-600 hover:text-teal-700 font-medium"
                      >
                        Limpar filtros
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </form>
      </div>
    </div>
  );
}