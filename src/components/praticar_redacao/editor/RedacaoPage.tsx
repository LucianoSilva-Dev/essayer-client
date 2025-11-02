'use client';

import { useState, useEffect } from 'react';
import { RedacaoEditorArea } from './RedacaoEditorArea';
import { RedacaoHeader } from './RedacaoHeader';
// ALTERAÇÃO: Importando o novo componente de Rodapé
import { RedacaoFooter } from './RedacaoFooter';

type RedacaoData = {
  id: string;
  duracaoConfigurada: number;
  conteudoSalvo: string;
};

export function RedacaoPage({ data }: { data: Omit<RedacaoData, 'tema'> }) {
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

  // --- Handlers (sem mudança) ---
  const handleFinalizar = () => alert('API de "Finalizar Redação" seria chamada aqui.');
  const handleExportar = () => alert('API de "Exportar Redação" seria chamada aqui.');

  return (
    // ALTERAÇÃO: Este é o "contentEssay" (Revestimento)
    // Sem 'max-w' (controlado pelo pai) e com padding responsivo
    <div 
      className="relative bg-[#EBEBEB] rounded-[30px] shadow-lg w-full 
                 p-6 md:p-10" // Padding normal
    >
      {/* 1. O Cabeçalho (Timer) - absoluto, relativo a este card */}
      <RedacaoHeader
        tempoRestante={tempoRestante}
        isPaused={isPaused}
        onPauseToggle={() => setIsPaused(!isPaused)}
      />

      {/* 2. A Área de Edição (Branca) 
         'mt-12' para dar espaço ao header
      */}
      <div className="mt-12">
        <RedacaoEditorArea
          texto={texto}
          onTextoChange={setTexto}
        />
      </div>


      {/* 3. Rodapé (Requisito 3) 
          Substituindo todos os 'absolute' por um componente flex
      */}
      <RedacaoFooter
        contagemPalavras={contagemPalavras}
        maxPalavras={1000}
        onFinalizar={handleFinalizar}
        onExportar={handleExportar}
      />
    </div>
  );
}