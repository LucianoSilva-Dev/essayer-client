'use client';

import { useState, useEffect } from 'react';
// ALTERAÇÃO: Importar o 'useRouter' para navegação
import { useRouter } from 'next/navigation';
import { RedacaoEditorArea } from './RedacaoEditorArea';
import { RedacaoHeader } from './RedacaoHeader';
import { RedacaoFooter } from './RedacaoFooter';

type RedacaoData = {
  id: string;
  duracaoConfigurada: number;
  conteudoSalvo: string;
};

// Vou assumir que a prop 'data' é do tipo RedacaoData,
// já que a definição do tipo está aqui.
export function RedacaoPage({ data }: { data: RedacaoData }) {
  // ALTERAÇÃO: Instanciar o router
  const router = useRouter();

  // --- Estados (sem mudança) ---
  const [texto, setTexto] = useState(data.conteudoSalvo);
  const [contagemPalavras, setContagemPalavras] = useState(0);
  const [tempoRestante, setTempoRestante] = useState(data.duracaoConfigurada);
  const [isPaused, setIsPaused] = useState(false);

  // --- Efeitos (sem mudança) ---
  useEffect(() => {
    const palavras = texto.trim().split(/\s+/).filter(Boolean);
    setContagemPalavras(palavras.length === 1 && palavras[0] === '' ? 0 : palavras.length);
  }, [texto]);

  useEffect(() => {
    if (isPaused || tempoRestante === 0) return;
    const interval = setInterval(() => {
      setTempoRestante((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isPaused, tempoRestante]);

  // --- Handlers (ALTERAÇÃO) ---
  const handleFinalizar = () => {
    // 1. Pegamos o ID da prop 'data'
    const redacaoID = data.id;
    console.log('Finalizando e submetendo redação:', redacaoID);
    
    // 2. (FUTURO) Aqui você fará a chamada à API (mutation)
    //    para salvar o `texto` e solicitar a correção.
    // ex: mutation.mutate({ redacaoID, texto })

    // 3. Após o sucesso da API, navegue para a página de correção
    router.push(`/praticar_redacao/${redacaoID}/correcao`);
  };

  const handleExportar = () => alert('API de "Exportar Redação" seria chamada aqui.');

  return (
    <div 
      className="relative bg-[#EBEBEB] rounded-[30px] shadow-lg w-full 
                 p-6 md:p-10"
    >
      {/* 1. O Cabeçalho (Timer) */}
      <RedacaoHeader
        tempoRestante={tempoRestante}
        isPaused={isPaused}
        onPauseToggle={() => setIsPaused(!isPaused)}
      />

      {/* 2. A Área de Edição (Branca) */}
      <div className="mt-12">
        <RedacaoEditorArea
          texto={texto}
          onTextoChange={setTexto}
        />
      </div>


      {/* 3. Rodapé (Conectado) */}
      <RedacaoFooter
        contagemPalavras={contagemPalavras}
        maxPalavras={1000}
        onFinalizar={handleFinalizar} // <-- Agora chama a função com a navegação
        onExportar={handleExportar}
      />
    </div>
  );
}