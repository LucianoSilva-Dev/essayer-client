'use client';

import { useState, useEffect, useCallback } from 'react';
// ALTERAÇÃO: Importar o 'useRouter' para navegação
import { useRouter } from 'next/navigation';
import { RedacaoEditorArea } from './RedacaoEditorArea';
import { RedacaoHeader } from './RedacaoHeader';
import { RedacaoFooter } from './RedacaoFooter';
import { corrigirRedacaoLivre, getRedacaoLivre, updateRedacaoLivre } from '@/apiCalls/redacao-livre';

type RedacaoData = {
  id: string;
  duracaoConfigurada: number;
  conteudoSalvo: string;
  tema: string
};

export function RedacaoPage({ id }: { id: string }) {
  // ALTERAÇÃO: Instanciar o router
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const response = await getRedacaoLivre(id);
      setData({
        id: response.id,
        duracaoConfigurada: response.duracao || 0,
        conteudoSalvo: response.texto || "",
        tema: response.tema
      })
      setTexto(response.texto || "");
      setTempoRestante(response.duracao || 30);
    })()
  }, [])

  // --- Estados (sem mudança) ---
  const [data, setData] = useState<RedacaoData | null>(null)
  const [texto, setTexto] = useState("");
  const [contagemPalavras, setContagemPalavras] = useState(0);
  const [tempoRestante, setTempoRestante] = useState(0);
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
  const handleFinalizar = async () => {
    const redacaoId = data?.id;
    if (!redacaoId) return;

    await updateRedacaoLivre(redacaoId, {
      texto,
      finalizada: true,
      dataRealizacao: new Date().toISOString(),
    });

    await corrigirRedacaoLivre(redacaoId, {
      textoRedacao: texto,
      tema: data.tema
    })

    router.push(`/praticar_redacao/${redacaoId}/correcao`);
  };

  const handlePause = async () => {
    setIsPaused(!isPaused);

    const redacaoId = data?.id;
    if (!redacaoId) return;

    if(!isPaused) {
      console.log(texto);
      await updateRedacaoLivre(redacaoId, {texto, duracao: tempoRestante})
    }
  }

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
        onPauseToggle={handlePause}
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