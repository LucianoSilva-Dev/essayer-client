// src/components/fazer_tarefa/tarefarevisao/revisaoredacao/TemaCard.tsx
import React from 'react';

export default function TemaCard({ tema }: { tema: string }) {
  return (
    <div className="bg-white rounded-[20px] p-8 shadow-sm w-full">
      <h2 className="text-[#0F5F68] text-lg font-bold mb-2">Tema</h2>
      
      {/* Ajuste de Tamanho: Diminuído levemente */}
      <p className="text-gray-800 text-xl md:text-2xl font-normal leading-snug">
        {tema}
      </p>
    </div>
  );
}