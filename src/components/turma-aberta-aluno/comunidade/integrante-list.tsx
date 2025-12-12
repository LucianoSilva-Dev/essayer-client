// src/components/turma-aberta-aluno/comunidade/integrante-list.tsx
import React from "react";
import IntegranteItem, { Integrante } from "./integrante-item";
import { ArrowRight, Crown } from "lucide-react";

interface IntegranteListProps {
  professor?: Integrante;
  alunos: Integrante[];  
  totalAlunos: number;   
}

export default function IntegranteList({ professor, alunos, totalAlunos }: IntegranteListProps) {
  const displayAlunos = alunos.slice(0, 4);
  const remainingCount = Math.max(0, totalAlunos - (professor ? 1 : 0) - displayAlunos.length);

  return (
    <div className="space-y-4">
        {professor && (
            <div className="mb-4">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1 ml-1">
                   <Crown className="w-3 h-3 text-yellow-500" /> Educador
                </p>
                <IntegranteItem integrante={{...professor, role: 'professor'}} />
            </div>
        )}

        <div>
             {alunos.length > 0 && (
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">
                   Colegas
                </p>
             )}
             <div className="space-y-1">
                {displayAlunos.map((aluno) => (
                  <IntegranteItem key={aluno.id} integrante={{...aluno, role: 'aluno'}} />
                ))}
             </div>
        </div>

        {remainingCount > 0 && (
           <button className="w-full mt-2 py-2 flex items-center justify-center gap-2 text-xs font-bold text-gray-500 hover:text-custom-blue hover:bg-gray-50 rounded-lg transition-all group">
              Ver mais {remainingCount} participantes
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
           </button>
        )}
    </div>
  );
}