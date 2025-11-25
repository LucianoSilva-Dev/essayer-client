"use client";

import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { TurmaCriadaProfessor } from "@/apiCalls/turma/types";

interface Props {
  turmas: TurmaCriadaProfessor[];
  selected: TurmaCriadaProfessor | undefined;
  onSelect: (t: TurmaCriadaProfessor) => void;
}

export function TurmaHeaderSelector({ turmas, selected, onSelect }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  //TODO: Colocar paginação

  return (
    <div className="relative inline-block">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        // Hover Text na cor principal
        className="flex items-center gap-2 text-xl md:text-2xl font-bold text-gray-800 hover:text-[#075F70] transition-colors focus:outline-none group"
      >
        <span className="border-b-2 border-transparent group-hover:border-[#075F70]/30 border-dashed pb-0.5 transition-all">
            {selected?.nome}
        </span>
        {/* Ícone na cor principal */}
        <ChevronDown size={20} className={`text-[#075F70] transition-transform duration-200 mt-1 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 z-20 py-2 animate-in fade-in zoom-in-95 duration-200">
            <div className="px-4 py-2 border-b border-gray-50 mb-1">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Trocar turma</span>
            </div>
            {turmas.map((turma) => (
              <button
                key={turma.id}
                onClick={() => {
                  onSelect(turma);
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-3 hover:bg-[#075F70]/5 flex items-center justify-between group transition-colors"
              >
                <div>
                    {/* Item Hover Text */}
                    <p className="font-semibold text-gray-700 group-hover:text-[#075F70] text-sm">{turma.nome}</p>
                    <p className="text-xs text-gray-400">{turma.escola}</p>
                </div>
                {selected?.id === turma.id && <Check size={16} className="text-[#075F70]" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}