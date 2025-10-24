// src/components/turma-aberta-prof/correcoes/correcao-item.tsx
import React, { FC } from "react";
// Add ChevronRight here
import { UserCircle2, CheckCircle, Clock, ChevronRight } from "lucide-react";

interface RespostaItemProps {
  nome: string;
  tema: string; // Status
  tempo: string; // Envio time/date
  onClick?: () => void;
}

const RespostaItem: FC<RespostaItemProps> = ({ nome, tema, tempo, onClick }) => {
  const isCorrigido = tema.toLowerCase().includes('corrigido');

  return (
    <div
      className={`flex flex-row justify-between items-center w-full px-4 py-3 bg-white shadow rounded-lg border-l-4 ${
        isCorrigido ? 'border-green-500' : 'border-yellow-500'
      } ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}`}
      onClick={onClick}
    >
      {/* Nome do aluno */}
      <div className="flex items-center gap-3 flex-1 min-w-0 pr-2">
        <UserCircle2 className="w-6 h-6 text-gray-500 flex-shrink-0" />
        <span className="text-gray-700 font-medium text-sm truncate">{nome}</span>
      </div>

      {/* Status */}
      <div className="flex flex-col items-center mx-2 flex-shrink-0">
        <span className="text-xs font-semibold text-gray-500 mb-1">Status</span>
        <span className={`flex items-center text-xs font-medium px-2 py-0.5 rounded ${
            isCorrigido ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
        }`}>
          {isCorrigido ? <CheckCircle size={12} className="mr-1"/> : <Clock size={12} className="mr-1"/>}
          {isCorrigido ? 'Corrigido' : 'Pendente'}
        </span>
      </div>

      {/* Tempo de Envio */}
      <div className="flex flex-col items-end text-right flex-shrink-0 min-w-[100px]">
        <span className="text-xs font-semibold text-gray-500 mb-1">Envio</span>
        <span className="text-gray-600 text-xs">{tempo}</span>
      </div>

      {/* Indicador de Navegação */}
      {onClick && (
          <ChevronRight size={16} className="text-gray-400 ml-2 flex-shrink-0" />
      )}
    </div>
  );
};

export default RespostaItem;