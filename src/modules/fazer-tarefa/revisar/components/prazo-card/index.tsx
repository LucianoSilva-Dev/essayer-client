import React from 'react';

interface DiaSemana {
  dia: number;
  semana: string;
  ativo: boolean;
}

interface PrazoCardProps {
  prazoTexto: string;
  diasSemana: DiaSemana[];
}

export default function PrazoCard({ prazoTexto, diasSemana }: PrazoCardProps) {
  return (
    <div className="bg-white rounded-[20px] p-6 shadow-sm">
      <h3 className="text-[#0F5F68] text-lg font-bold mb-1">Prazo de entrega</h3>
      
      {/* Fonte aumentada para text-base (16px) */}
      <p className="text-gray-600 text-base mb-4">
        A data limite para o estudante completar esta tarefa
      </p>
      
      <p className="font-medium text-gray-800 mb-4">
        {prazoTexto}
      </p>

      <div className="flex justify-between items-center text-center">
        {diasSemana.map((item, index) => (
          <div key={index} className="flex flex-col items-center gap-1">
            <span className="text-xs text-gray-500 font-medium uppercase">
              {item.semana}
            </span>
            <div 
              className={`
                w-8 h-10 flex items-center justify-center rounded-md text-sm font-bold transition-all
                ${item.ativo 
                  ? 'bg-gray-300 text-gray-800 shadow-inner' 
                  : 'text-gray-400 hover:bg-gray-50'
                }
              `}
            >
              {item.dia}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}