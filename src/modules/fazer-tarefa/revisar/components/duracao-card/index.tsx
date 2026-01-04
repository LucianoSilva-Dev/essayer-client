import React from 'react';

export default function DuracaoCard({ minutos }: { minutos: number }) {
  return (
    <div className="bg-white rounded-[20px] p-6 shadow-sm">
      <h3 className="text-[#0F5F68] text-lg font-bold mb-1">Duração</h3>
      
      {/* Fonte aumentada para text-base (16px) */}
      <p className="text-gray-600 text-base mb-2">
        Tempo total para terminar a tarefa
      </p>
      
      <div className="flex items-baseline justify-end mt-4">
        <span className="text-5xl font-bold text-gray-800">
          {minutos.toString().padStart(2, '0')}
        </span>
        <span className="text-xl text-gray-500 ml-1">min</span>
      </div>
    </div>
  );
}