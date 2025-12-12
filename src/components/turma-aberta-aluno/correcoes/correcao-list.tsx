// src/components/turma-aberta-aluno/correcoes/correcao-list.tsx
import React from "react";
import CorrecaoItem from "./correcao-item";
import { Correcao } from "@/apiCalls/turma/types";
import { Inbox } from "lucide-react";

interface CorrecaoListProps {
  correcoes: Correcao[];
  loading: boolean;
  error: any;
}

export default function CorrecaoList({ correcoes, loading, error }: CorrecaoListProps) {

  if (loading) return (
    <div className="py-6 text-center">
       <div className="inline-block w-5 h-5 border-2 border-custom-blue border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (error) return null; // Silencioso em caso de erro para não quebrar layout

  if (!correcoes || correcoes.length === 0)
    return (
      <div className="py-10 text-center flex flex-col items-center justify-center text-gray-300">
         <Inbox className="w-8 h-8 mb-2 opacity-50" />
         <p className="text-xs font-medium">Nenhuma correção ainda.</p>
      </div>
    );

  return (
    <div className="divide-y divide-gray-50">
        {correcoes.map((c) => (
            <CorrecaoItem key={c.id} correcao={c} />
        ))}
    </div>
  );
}