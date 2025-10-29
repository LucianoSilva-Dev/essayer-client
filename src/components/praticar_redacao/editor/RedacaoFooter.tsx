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
    <footer className="flex justify-between items-center p-6 bg-white border-t border-gray-100 z-20">
      <span className="text-base font-medium text-gray-600">
        {contagemPalavras}/{maxPalavras} palavras
      </span>
      <div className="flex items-center gap-4">
        <button
          onClick={onExportar}
          className="flex items-center gap-2 text-base font-medium text-gray-700
                     hover:text-black transition-colors"
        >
          Exportar redação
          <Download size={18} />
        </button>
        <button
          onClick={onFinalizar}
          className="px-6 py-3 bg-[#075F70] text-white rounded-full font-semibold
                     hover:bg-opacity-90 transition-colors shadow-sm"
        >
          Finalizar redação
        </button>
      </div>
    </footer>
  );
}