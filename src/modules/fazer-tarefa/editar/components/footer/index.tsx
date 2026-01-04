interface Props {
  contagemPalavras: number;
  maxPalavras: number;
  onFinalizar: () => void;
}

export function RedacaoFooter({ contagemPalavras, maxPalavras, onFinalizar }: Props) {
  return (
    // ALTERAÇÕES FEITAS:
    // 1. Removido 'mt-9' e 'h-14' (Isso removia o espaço extra indesejado)
    // 2. Trocado Flex por Grid de 3 colunas (garante centralização perfeita do botão)
    <div className="w-full grid grid-cols-3 items-center">
      
      {/* Coluna 1: Contador (Alinhado à esquerda) */}
      <div className="flex justify-start">
        <span className="text-[#3C3C3C] font-semibold text-lg">
          {contagemPalavras}/{maxPalavras} palavras
        </span>
      </div>
      
      {/* Coluna 2: Botão (Centralizado automaticamente pelo Grid) */}
      <div className="flex justify-center">
        <button
          onClick={onFinalizar}
          className="cursor-pointer bg-[#075F70] hover:bg-[#086f80] rounded-full 
                     px-8 py-3 
                     text-white text-lg font-bold
                     transition-colors shadow-md whitespace-nowrap"
        >
          Finalizar redação
        </button>
      </div>

      {/* Coluna 3: Vazia (Para equilibrar o Grid) */}
      <div className="flex justify-end">
        {/* Espaço reservado para futuros botões se necessário */}
      </div>

    </div>
  );
}