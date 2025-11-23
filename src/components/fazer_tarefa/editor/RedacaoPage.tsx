'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { RedacaoEditorArea } from './RedacaoEditorArea';
import { RedacaoHeader } from './RedacaoHeader';
import { RedacaoFooter } from './RedacaoFooter';
// IMPORTAÇÃO NOVA
import { MotivacionalModal } from './MotivacionalModal';

// --- MOCK DOS TEXTOS (Você substituirá pela API depois) ---
const MOCK_TEXTOS = [
  {
    id: 1,
    titulo: "Vidas Secas - Graciliano Ramos",
    tipo: "Obra",
    conteudo: `O romance Vidas Secas, publicado em 1938, retrata a vida de uma família de retirantes sertanejos obrigada a se deslocar de tempos em tempos para áreas menos castigadas pela seca. A obra pertence à segunda fase do modernismo brasileiro, conhecida como Regionalismo de 30.\n\nO pai, Fabiano, a mãe, Sinha Vitória, os dois filhos e a cadela Baleia formam o núcleo central da narrativa, que expõe de maneira crua e direta a miséria humana e social diante da hostilidade do meio ambiente.`
  },
  {
    id: 2,
    titulo: "Artigo 6º da Constituição Federal",
    tipo: "Citação",
    conteudo: `São direitos sociais a educação, a saúde, a alimentação, o trabalho, a moradia, o transporte, o lazer, a segurança, a previdência social, a proteção à maternidade e à infância, a assistência aos desamparados, na forma desta Constituição.`
  },
  {
    id: 3,
    titulo: "Envelhecimento Populacional",
    tipo: "Artigo",
    conteudo: `O envelhecimento populacional é um fenômeno mundial, mas no Brasil ele ocorre de forma acelerada. Segundo o IBGE, a expectativa de vida do brasileiro aumentou significativamente.\n\nIsso impacta diretamente a previdência e o sistema de saúde.`
  }
];

const MOCK_INITIAL_DATA = {
  id: "mock-123",
  duracaoConfigurada: 3600,
  tema: "Envelhecimento populacional e seus impactos econômicos e sociais"
};

export function RedacaoPage({ id }: { id: string }) {
  const router = useRouter();

  const [texto, setTexto] = useState("");
  const [contagemPalavras, setContagemPalavras] = useState(0);
  const [tempoRestante, setTempoRestante] = useState(MOCK_INITIAL_DATA.duracaoConfigurada);
  const [isPaused, setIsPaused] = useState(false);
  
  // ESTADO DO MODAL
  const [isMotivacionalOpen, setIsMotivacionalOpen] = useState(false);

  useEffect(() => {
    const palavras = texto.trim().split(/\s+/).filter(Boolean);
    setContagemPalavras(palavras.length === 1 && palavras[0] === '' ? 0 : palavras.length);
  }, [texto]);

useEffect(() => {
    // Agora o timer para se:
    // 1. Estiver pausado manualmente (isPaused) OU
    // 2. O modal estiver aberto (isMotivacionalOpen) OU
    // 3. O tempo acabou
    if (isPaused || isMotivacionalOpen || tempoRestante === 0) return;

    const interval = setInterval(() => {
      setTempoRestante((t) => (t > 0 ? t - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
    
    // IMPORTANTE: Adicionar isMotivacionalOpen nas dependências do efeito
  }, [isPaused, tempoRestante, isMotivacionalOpen]);

  const handleFinalizar = () => {
    console.log("Finalizar...");
  };

  const handlePause = () => setIsPaused(!isPaused);
  const handleOpenMotivacional = () => setIsMotivacionalOpen(true);

  return (
    <main className="flex flex-col items-center min-h-screen py-12 px-4">
      
      {/* O Modal vive aqui no topo */}
      <MotivacionalModal 
        isOpen={isMotivacionalOpen}
        onClose={() => setIsMotivacionalOpen(false)}
        textos={MOCK_TEXTOS}
      />

      <h1 className="text-2xl md:text-3xl font-bold text-[#075F70] text-center mb-12 px-4">
        {MOCK_INITIAL_DATA.tema}
      </h1>

      <div className="relative w-full max-w-6xl">
        <div 
          className="absolute w-full left-0 top-8 bottom-10 bg-gradient-to-b from-[#F9FAFB] from-[13.46%] to-[#075F70] to-[72.6%] opacity-65 rounded-[70px]"
        />

        <div className="relative w-full max-w-5xl mx-auto mt-8">
          <div className="relative bg-[#EBEBEB] rounded-[30px] shadow-lg w-full p-6 md:p-8 flex flex-col gap-6">
            
            <RedacaoHeader
              tempoRestante={tempoRestante}
              isPaused={isPaused}
              onPauseToggle={handlePause}
              onOpenMotivacional={handleOpenMotivacional}
            />

            <div className="w-full">
              <RedacaoEditorArea
                texto={texto}
                onTextoChange={setTexto}
              />
            </div>

            <RedacaoFooter
              contagemPalavras={contagemPalavras}
              maxPalavras={400}
              onFinalizar={handleFinalizar}
            />
          </div>
        </div>
      </div>
    </main>
  );
}