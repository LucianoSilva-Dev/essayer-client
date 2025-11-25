"use client";

import { Search, Zap, CheckCircle2 } from "lucide-react"; // Novos ícones
import { StatusTarefa } from "../types";

interface Props {
  activeTab: StatusTarefa;
  onTabChange: (status: StatusTarefa) => void;
  onSearch: (term: string) => void;
}

export function TarefaFilters({ activeTab, onTabChange, onSearch }: Props) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
      
      {/* NOVO CONCEITO: Smart Tabs Independentes 
          Sem container cinza no fundo. Botões livres.
      */}
      <div className="flex items-center gap-3 w-full md:w-auto">
        
        {/* Botão 1: ATIVAS */}
        <button
          onClick={() => onTabChange("ativa")}
          className={`
            relative flex items-center gap-2.5 px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 border
            ${activeTab === "ativa" 
                // Estado ATIVO: Cor sólida, sombra colorida, levemente maior
                ? "bg-[#075F70] text-white border-[#075F70] shadow-lg shadow-[#075F70]/25 scale-105 z-10" 
                // Estado INATIVO: Branco, borda cinza, texto cinza
                : "bg-white text-gray-500 border-gray-200 hover:border-[#075F70]/30 hover:bg-gray-50 hover:text-[#075F70]"
            }
          `}
        >
          <span>Tarefas ativas</span>
        </button>

        {/* Botão 2: ENCERRADAS */}
        <button
          onClick={() => onTabChange("encerrada")}
          className={`
            relative flex items-center gap-2.5 px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 border
            ${activeTab === "encerrada" 
                ? "bg-[#075F70] text-white border-[#075F70] shadow-lg shadow-[#075F70]/25 scale-105 z-10" 
                : "bg-white text-gray-500 border-gray-200 hover:border-[#075F70]/30 hover:bg-gray-50 hover:text-[#075F70]"
            }
          `}
        >
          <span>Tarefas encerradas</span>
        </button>

      </div>

      {/* Barra de Pesquisa */}
      <div className="w-full md:w-96 relative group">
          <input
            type="text"
            placeholder="Pesquise por título..."
            onChange={(e) => onSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-full border-2 border-transparent bg-white text-sm transition-all outline-none font-medium text-gray-700 placeholder:text-gray-400
            focus:border-[#075F70] focus:shadow-lg focus:shadow-[#075F70]/10"
          />
          <Search 
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-[#075F70]" 
            size={20} 
          />
      </div>

    </div>
  );
}