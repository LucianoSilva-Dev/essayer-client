import React from 'react';

interface RedacaoFooterProps {
  wordCount: number;
  maxWords: number;
}

export default function RedacaoFooter({ wordCount, maxWords }: RedacaoFooterProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-2 px-2">
      
      <span className="text-gray-700 font-semibold text-base">
        {wordCount}/{maxWords} palavras
      </span>

      {/* Adicionei 'cursor-pointer' aqui também */}
      <button 
        className="cursor-pointer bg-[#0F5F68] hover:bg-[#075F70] text-white font-bold py-3 px-8 rounded-full shadow-sm transition-all duration-300 w-full md:w-auto"
      >
        Finalizar redação
      </button>
    </div>
  );
}