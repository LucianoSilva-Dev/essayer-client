// src/components/turma-aberta-aluno/tarefas/tarefa-list.tsx
"use client";

import React, { useState } from "react";
import TarefaItem from "./tarefa-item";
import { AtividadeBasica } from "@/lib/apiCalls/turma/types";
import { Ghost, ChevronDown, ChevronUp } from "lucide-react";

interface TarefaListProps {
    tarefas: AtividadeBasica[];
    isHistoryView?: boolean;
}

export default function TarefaList({ tarefas, isHistoryView = false }: TarefaListProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const ITEMS_TO_SHOW = 3;

  if (!tarefas || tarefas.length === 0) {
    if (isHistoryView) {
        return (
            <div className="flex flex-col items-center justify-center py-8 text-center bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
                <p className="text-xs font-medium text-gray-400 font-opensans">Histórico vazio.</p>
            </div>
        );
    }
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Ghost className="text-gray-200 w-10 h-10 mb-3" />
        <p className="text-sm font-medium text-gray-400 font-opensans">Nada por aqui.</p>
      </div>
    );
  }

  // Lógica para limitar a lista no histórico
  const shouldLimit = isHistoryView && tarefas.length > ITEMS_TO_SHOW;
  const visibleTarefas = shouldLimit && !isExpanded 
    ? tarefas.slice(0, ITEMS_TO_SHOW) 
    : tarefas;
  
  const remainingCount = tarefas.length - ITEMS_TO_SHOW;

  // Renderização da Timeline Criativa
  if (isHistoryView) {
      return (
          <div className="relative space-y-0">
             {/* Linha Vertical Conectora (Ajustada dinamicamente) */}
             <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-gray-200/70 rounded-full z-0"></div>

             {visibleTarefas.map((t) => (
                <div key={t.id} className="relative pl-12 pb-8 last:pb-2 group animate-in fade-in slide-in-from-top-4 duration-300">
                    <TarefaItem tarefa={t} isTimelineItem={true} />
                </div>
             ))}

             {/* Botão de Expandir / Recolher */}
             {shouldLimit && (
                <div className="relative pl-12 pt-2">
                    {/* Conector visual para o botão */}
                    <div className="absolute left-4 top-0 h-full w-0.5 bg-gradient-to-b from-gray-200/70 to-transparent"></div>
                    
                    <button 
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-custom-blue bg-white hover:bg-gray-50 border border-gray-200 px-4 py-2 rounded-full transition-all shadow-sm z-10 relative group"
                    >
                        {isExpanded ? (
                            <>
                                <ChevronUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform" />
                                Recolher histórico
                            </>
                        ) : (
                            <>
                                <ChevronDown className="w-3 h-3 group-hover:translate-y-0.5 transition-transform" />
                                Ver mais {remainingCount} tarefas antigas
                            </>
                        )}
                    </button>
                </div>
             )}
          </div>
      );
  }

  // Renderização Padrão (Grid/Lista de Ativos - sem limite visual inicial, pois são pendências importantes)
  return (
    <div className="space-y-4">
      {tarefas.map((t) => (
        <TarefaItem key={t.id} tarefa={t} />
      ))}
    </div>
  );
}