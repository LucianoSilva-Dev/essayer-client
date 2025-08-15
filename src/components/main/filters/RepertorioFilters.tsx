'use client'

import { useState } from "react";
import { Search, Filter, BookOpen, FileText, Quote } from "lucide-react";
import { EixoOptions } from "@/constants/eixos";

const modelosOptions = [
  { id: "Obra", nome: "Obra", icone: BookOpen, cor: "bg-blue-100 text-blue-700 border-blue-200" },
  { id: "Artigo", nome: "Artigo", icone: FileText, cor: "bg-green-100 text-green-700 border-green-200" },
  { id: "Citacao", nome: "Citação", icone: Quote, cor: "bg-purple-100 text-purple-700 border-purple-200" },
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
          className={`px-6 py-3 rounded-full border-2 transition-colors cursor-pointer ${tipoVisualizacao === "salvos" ? "bg-teal-600 text-white border-teal-600" : "bg-white text-teal-600 border-teal-600 hover:bg-teal-50"}`}
        >
          Repertórios salvos
        </button>
        <button
          onClick={() => onTipoVisualizacaoChange("todos")}
          className={`px-6 py-3 rounded-full border-2 transition-colors cursor-pointer ${tipoVisualizacao === "todos" ? "bg-teal-600 text-white border-teal-600" : "bg-white text-teal-600 border-teal-600 hover:bg-teal-50"}`}
        >
          Repertórios
        </button>
      </div>

      <div className="max-w-2xl mx-auto">
        <form onSubmit={(e) => e.preventDefault()} className="relative">
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
              className={`pr-4 transition-colors relative ${showFilters ? "text-teal-600" : "text-gray-400 hover:text-gray-600"}`}
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
                {modelosOptions.map((modelo) => (
                  <button
                    key={modelo.id}
                    onClick={() => setModeloAtivo(modeloAtivo === modelo.id ? null : modelo.id)}
                    className={`flex items-center px-3 py-2 text-sm rounded-full border transition-colors ${modeloAtivo === modelo.id ? modelo.cor : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"}`}
                  >
                    <modelo.icone size={14} className="mr-1.5" />
                    {modelo.nome}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Filtrar por Eixo Temático</h3>
              <div className="flex flex-wrap gap-2">
                {EixoOptions.map((eixo) => (
                  <button
                    key={eixo}
                    onClick={() => handleEixoToggle(eixo)}
                    className={`px-3 py-2 text-sm rounded-full border transition-colors ${eixosAtivos.includes(eixo) ? "bg-teal-100 text-teal-700 border-teal-200" : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"}`}
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
                      onClick={() => setRecorteAtivo(recorteAtivo === recorte ? null : recorte)}
                      className={`px-3 py-2 text-sm rounded-full border transition-colors ${recorte === recorteAtivo ? "bg-teal-100 text-teal-700 border-teal-200" : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"}`}
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
                <button onClick={() => setOrdenarPor('Newest')} className={`px-3 py-2 text-sm rounded-full border transition-colors ${ordenarPor === 'Newest' ? "bg-blue-100 text-blue-700 border-blue-200" : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"}`}>Mais Novos</button>
                <button onClick={() => setOrdenarPor('Oldest')} className={`px-3 py-2 text-sm rounded-full border transition-colors ${ordenarPor === 'Oldest' ? "bg-blue-100 text-blue-700 border-blue-200" : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"}`}>Mais Antigos</button>
                <button onClick={() => setOrdenarPor('MaxLikes')} className={`px-3 py-2 text-sm rounded-full border transition-colors ${ordenarPor === 'MaxLikes' ? "bg-blue-100 text-blue-700 border-blue-200" : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"}`}>Mais Curtidos</button>
                <button onClick={() => setOrdenarPor('MinLikes')} className={`px-3 py-2 text-sm rounded-full border transition-colors ${ordenarPor === 'MinLikes' ? "bg-blue-100 text-blue-700 border-blue-200" : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"}`}>Menos Curtidos</button>
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
  );
}