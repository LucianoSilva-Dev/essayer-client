// src/components/praticar_redacao/editor/RedacaoFooter.tsx
'use client'; // Necessário pois agora usamos useState e useEffect

import { Sparkles, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Props {
  contagemPalavras: number;
  maxPalavras: number;
  onFinalizar: () => void;
  onCorrigir: () => void;
  isLoading: boolean; // Nova prop recebida
}

// As mensagens que vão rotacionar para acalmar o usuário
const LOADING_MESSAGES = [
  "Iniciando análise inteligente...",
  "Lendo seus argumentos...",
  "Verificando competências do ENEM...",
  "Gerando feedback detalhado...",
  "Quase lá, finalizando os ajustes..."
];

export function RedacaoFooter({ 
  contagemPalavras, 
  maxPalavras, 
  onFinalizar, 
  onCorrigir,
  isLoading 
}: Props) {
  // Estado para controlar qual mensagem mostrar
  const [messageIndex, setMessageIndex] = useState(0);

  // Efeito para trocar a mensagem a cada 2.5 segundos enquanto estiver carregando
  useEffect(() => {
    if (!isLoading) {
      setMessageIndex(0); // Reseta se não estiver carregando
      return;
    }

    const interval = setInterval(() => {
      setMessageIndex((current) => (current + 1) % LOADING_MESSAGES.length);
    }, 2500);

    return () => clearInterval(interval); // Limpa o intervalo ao desmontar
  }, [isLoading]);


  // --- RENDERIZAÇÃO CONDICIONAL ---

  // SE ESTIVER CARREGANDO: Mostra a barra de progresso da IA
  if (isLoading) {
    return (
      // Usamos h-14 e mt-9 para manter exatamente a mesma altura do footer normal, evitando pulos no layout
      <div className="w-full flex justify-center items-center mt-9 h-14 bg-[#075F70]/10 rounded-full px-4 transition-all">
        <div className="flex items-center gap-3 text-[#075F70]">
          {/* Ícone de IA girando e pulsando */}
          <div className="relative">
             {/* Um loader circular girando atrás */}
            <Loader2 className="animate-spin absolute inset-0 opacity-50" size={24}/>
             {/* O ícone de IA pulsando na frente */}
            <Sparkles size={24} className="animate-pulse z-10 relative" />
          </div>
          
          {/* A mensagem que muda dinamicamente */}
          <span className="text-lg font-semibold animate-fade-in" key={messageIndex}>
            {LOADING_MESSAGES[messageIndex]}
          </span>
        </div>
      </div>
    );
  }

  // SE NÃO ESTIVER CARREGANDO: Mostra o rodapé normal (Botões e Contador)
  return (
    <div className="w-full flex justify-between items-center mt-9 h-14 transition-all">
      
      {/* Esquerda: Contador */}
      <span className="text-[#3C3C3C] font-semibold text-lg">
        {contagemPalavras}/{maxPalavras} palavras
      </span>
      
      {/* Direita: Grupo de Botões */}
      <div className="flex items-center gap-4">
        
        {/* Botão Finalizar */}
        <button
          onClick={onFinalizar}
          className="border-2 border-[#075F70] text-[#075F70]
                     bg-transparent hover:bg-[#075F70]/10 
                     rounded-full 
                     px-6 py-3 
                     text-lg font-bold
                     transition-all duration-300
                     box-border"
        >
          Finalizar redação
        </button>

        {/* Botão Corrigir */}
        <button
          onClick={onCorrigir}
          className="bg-[#075F70] hover:bg-[#086f80] 
                     text-white 
                     rounded-full 
                     px-8 py-3 
                     text-lg font-bold
                     transition-all duration-300
                     flex items-center gap-2
                     shadow-md hover:shadow-lg"
        >
          Corrigir redação
          <Sparkles size={20} className="text-white" />
        </button>

      </div>
    </div>
  );
}