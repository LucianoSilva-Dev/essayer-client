"use client";

import React from "react";
import Link from "next/link";
import { Plus } from "lucide-react";

interface CriarTarefaButtonProps {
  turmaId: string;
}

const CriarTarefaButton: React.FC<CriarTarefaButtonProps> = ({ turmaId }) => {
  return (
    <Link 
      href={`/turma_aberta_prof/${turmaId}/criar_tarefa`}
      className="no-underline"
    >
      <button
        className="cursor-pointer flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#075F70] hover:bg-[#064d5c] shadow-md hover:shadow-lg transition-all duration-300 group"
      >
        <Plus size={20} className="text-white group-hover:scale-110 transition-transform" />
        <span className="text-sm font-semibold text-white font-montserrat">
          Criar tarefa
        </span>
      </button>
    </Link>
  );
};

export default CriarTarefaButton;
