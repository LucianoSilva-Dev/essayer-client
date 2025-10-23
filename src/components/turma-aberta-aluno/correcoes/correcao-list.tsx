// src/components/turma-aberta-aluno/correcoes/correcao-list.tsx
import React from "react";
import { AlertCircle, ChevronDown } from "lucide-react";
import CorrecaoItem from "./correcao-item";
import { Correcao } from "@/apiCalls/turma/types";

interface CorrecaoListProps {
  correcoes: Correcao[];
  loading: boolean;
  error: any;
}

export default function CorrecaoList({ correcoes, loading, error }: CorrecaoListProps) {

  if (loading) return <div className="text-sm text-gray-500 text-center py-4">Carregando correções...</div>;

  if (error)
    return (
      <div className="flex flex-col items-center gap-2 text-sm text-red-500 bg-red-50 p-4 rounded-lg">
        <AlertCircle className="w-5 h-5" />
        {/* Mensagem de erro pode vir do hook/pai se necessário */}
        Erro ao carregar correções.
      </div>
    );

  if (!correcoes || correcoes.length === 0)
    return (
      <div className="text-sm text-gray-500 bg-gray-50 rounded-lg p-4 text-center">
        Nenhuma correção disponível.
      </div>
    );

  return (
    <div>
       {/* Header com título e ordenação */}
       <div className="flex justify-between items-center mb-4">
            <h4 className="font-semibold text-gray-800">
              Correções disponíveis
            </h4>
            <button className="flex items-center text-xs text-gray-500 hover:text-gray-700">
                Ordenar por
                <ChevronDown size={14} className="ml-1" />
            </button>
       </div>
        {/* Lista de correções */}
        <div className="space-y-1">
            {/* Mapeia o array recebido via props */}
            {correcoes.map((c) => (
                <CorrecaoItem key={c.id} correcao={c} />
            ))}
        </div>
    </div>
  );
}