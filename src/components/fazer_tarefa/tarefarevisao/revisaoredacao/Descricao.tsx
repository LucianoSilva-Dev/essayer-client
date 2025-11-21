import React from 'react';

export default function Descricao({ texto }: { texto: string }) {
  return (
    <div className="flex flex-col w-full">
      <h3 className="text-[#0F5F68] text-lg font-bold mb-2">
        Descrição
      </h3>
      
      {/* Fonte aumentada para text-base (16px) */}
      <p className="text-gray-600 text-base leading-relaxed mb-6">
        {texto}
      </p>
      
      <hr className="border-t border-gray-300 w-full opacity-60" />
    </div>
  );
}