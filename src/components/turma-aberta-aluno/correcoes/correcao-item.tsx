// src/components/turma-aberta-aluno/correcoes/correcao-item.tsx
import React from "react";
import { Correcao } from "@/apiCalls/turma/types";
import { ExternalLink } from "lucide-react";

interface CorrecaoItemProps {
  correcao: Correcao;
}

export default function CorrecaoItem({ correcao }: CorrecaoItemProps) {
  return (
    <div
      className="group flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer border border-transparent hover:border-gray-100"
    >
      <div className="min-w-0 pr-2">
          <div className="flex items-center gap-2">
            {!correcao.visto && (
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
            )}
            <p className="text-sm font-bold font-montserrat truncate text-gray-700">
                {correcao.atividade.tipoAtividade}
            </p>
          </div>
          {correcao.atividade.titulo && (
             <p className="text-[11px] text-gray-400 font-opensans truncate pl-3.5">
                 {correcao.atividade.titulo}
             </p>
          )}
      </div>
      <ExternalLink className="w-3 h-3 text-gray-300 group-hover:text-custom-blue transition-colors" />
    </div>
  );
}