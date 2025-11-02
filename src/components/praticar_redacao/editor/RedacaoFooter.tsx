// src/components/praticar_redacao/editor/RedacaoFooter.tsx

import { Download } from 'lucide-react';

interface Props {
  contagemPalavras: number;
  maxPalavras: number;
  onFinalizar: () => void;
  onExportar: () => void;
}

export function RedacaoFooter({ contagemPalavras, maxPalavras, onFinalizar, onExportar }: Props) {
  return (
    // ALTERAÇÃO: Requisito 3 - Alinhamento com Flexbox
    // 'relative' para o botão central
    // 'flex justify-between items-center' para alinhar contador e exportar
    <div className="relative w-full flex justify-between items-center mt-9 h-4">
      
      {/* Esquerda: Contador */}
      <span className="text-[#3C3C3C] font-semibold text-lg">
        {contagemPalavras}/{maxPalavras} palavras
      </span>
      
      {/* Centro: Botão Finalizar */}
      <div className="absolute left-1/2 -translate-x-1/2">
        <button
          onClick={onFinalizar}
          className="bg-[#075F70] hover:bg-[#086f80] rounded-full 
                     px-8 py-3 
                     text-white text-lg font-bold
                     transition-colors"
        >
          Finalizar redação
        </button>
      </div>

      {/* Direita: Botão Exportar */}
      <button
        onClick={onExportar}
        className="flex items-center gap-2 
                   text-[#3C3C3C] font-semibold text-lg
                   hover:text-black transition-colors"
      >
        Exportar redação
        <Download size={24} className="text-[#3C3C3C]" />
      </button>
    </div>
  );
}