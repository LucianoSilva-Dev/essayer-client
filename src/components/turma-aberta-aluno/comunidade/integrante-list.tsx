import React from "react";
import IntegranteItem, {Integrante} from "./integrante-item";
import { Users, LogOut } from "lucide-react"; // Importar LogOut

interface IntegranteListProps {
  professor?: Integrante;
  alunos: Integrante[];  
  totalAlunos: number;   
}

export default function IntegranteList({ professor, alunos, totalAlunos }: IntegranteListProps) {
  const displayAlunos = alunos.slice(0, 3);
  const remainingCount = totalAlunos - (professor ? 1 : 0) - displayAlunos.length;

  return (
    <div className="space-y-3">
        {/* Professor */}
        {professor && (
            <IntegranteItem integrante={{...professor, role: 'professor'}} />
        )}

        {/* Separador */}
        {professor && alunos.length > 0 && <hr className="my-2 border-gray-100"/>}

        {/* Alunos */}
        {displayAlunos.map((aluno) => (
          <IntegranteItem key={aluno.id} integrante={{...aluno, role: 'aluno'}} />
        ))}

        {/* Contagem e Botão Ver Todos */}
        <div className="flex items-center justify-between mt-3 text-sm text-gray-500 pt-2 border-t border-gray-100">
           <div className="flex items-center gap-2">
                <Users size={16}/>
                <span>
                    {professor ? '+ ' : ''}
                    {totalAlunos - (professor ? 1 : 0)} aluno{totalAlunos - (professor ? 1 : 0) !== 1 ? 's' : ''}
                </span>
           </div>
           {/* Adiciona um link/botão para ver todos, se houver mais alunos */}
           {remainingCount > 0 && (
               <button className="flex items-center gap-1 hover:text-teal-600">
                  Ver todos <LogOut size={14} className="transform rotate-180"/> {/* Ícone de seta */}
               </button>
           )}
        </div>
    </div>
  );
}