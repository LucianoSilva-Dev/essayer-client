// src/components/turma-aberta-aluno/correcoes/correcao-item.tsx
import React from "react";
import { Correcao } from "@/types/turma"; // Importe o tipo Correcao

interface CorrecaoItemProps {
  correcao: Correcao;
}

export default function CorrecaoItem({ correcao }: CorrecaoItemProps) {
  return (
    <div
      className="flex items-center justify-between p-3 border-b border-gray-100 hover:bg-gray-50 transition cursor-pointer rounded-md"
    >
      <div>
        {/* Usar 'titulo' da Correcao */}
        <div className="text-sm font-medium text-gray-800">{correcao.titulo}</div>
        {/* Usar 'descricao' da Correcao, se disponível */}
        {correcao.descricao && (
             <div className="text-xs text-gray-500 mt-1">
                 {correcao.descricao}
             </div>
        )}
      </div>
      <span className={`text-xs font-medium ${correcao.visto ? "text-gray-400" : "text-red-600"}`}>
        {correcao.visto ? "Visto" : "Não visto"}
      </span>
      {/* Botão para abrir a correção (pode levar a uma página de detalhes) */}
       <button className="text-xs text-teal-600 hover:underline ml-2">
         Abrir
       </button>
    </div>
  );
}