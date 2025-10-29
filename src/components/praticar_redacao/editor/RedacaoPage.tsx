'use client';

import { useState, useEffect } from 'react';
import { RedacaoHeader } from './RedacaoHeader';
import { RedacaoEditorArea } from './RedacaoEditorArea';
import { RedacaoFooter } from './RedacaoFooter';

// O tipo de dados que esperamos receber do Server Component
type RedacaoData = {
  id: string;
  tema: string;
  duracaoConfigurada: number;
  conteudoSalvo: string;
};

export function RedacaoPage({ data }: { data: RedacaoData }) {
  // Estados para controlar a UI
  const [texto, setTexto] = useState(data.conteudoSalvo);
  const [contagemPalavras, setContagemPalavras] = useState(0);
  const [tempoRestante, setTempoRestante] = useState(data.duracaoConfigurada);
  const [isPaused, setIsPaused] = useState(false);

  // Efeito para contar palavras
  useEffect(() => {
    const palavras = texto.trim().split(/\s+/).filter(Boolean);
    setContagemPalavras(palavras.length === 1 && palavras[0] === '' ? 0 : palavras.length);
  }, [texto]);

  // Efeito para o Timer (simplificado)
  useEffect(() => {
    if (isPaused || tempoRestante === 0) {
      return;
    }

    const interval = setInterval(() => {
      setTempoRestante((t) => (t > 0 ? t - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, tempoRestante]);

  // ----- PONTO DE INTEGRAÇÃO (PUT/PATCH) -----
  const handleFinalizar = () => {
    // Lógica para salvar a redação
    // ex: await apiClient.put(`/redacoes/${data.id}`, { conteudo: texto })
    alert('API de "Finalizar Redação" seria chamada aqui.');
  };

  // ----- PONTO DE INTEGRAÇÃO (GERAÇÃO DE PDF/DOC) -----
  const handleExportar = () => {
    // Lógica para exportar
    alert('API de "Exportar Redação" seria chamada aqui.');
  };

  return (
    <div className="flex flex-col max-w-4xl mx-auto h-full">
      {/* 1. O Cabeçalho */}
      <RedacaoHeader
        tema={data.tema}
        tempoRestante={tempoRestante}
        isPaused={isPaused}
        onPauseToggle={() => setIsPaused(!isPaused)}
      />

      {/* 2. O Editor e 3. O Rodapé (agrupados no "card" principal) */}
      <div className="relative flex-1 flex flex-col bg-white rounded-3xl shadow-lg overflow-hidden">
        {/* Efeitos de "fade" nas laterais do editor */}
        <div className="absolute top-0 left-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute top-0 right-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10" />
        
        {/* 2. Área de Edição */}
        <RedacaoEditorArea
          texto={texto}
          onTextoChange={setTexto}
        />

        {/* 3. Rodapé */}
        <RedacaoFooter
          contagemPalavras={contagemPalavras}
          maxPalavras={1000}
          onFinalizar={handleFinalizar}
          onExportar={handleExportar}
        />
      </div>
    </div>
  );
}