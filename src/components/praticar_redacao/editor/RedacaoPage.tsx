// src/components/praticar_redacao/editor/RedacaoPage.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { RedacaoEditorArea } from './RedacaoEditorArea';
import { RedacaoHeader } from './RedacaoHeader';
import { RedacaoFooter } from './RedacaoFooter';
import { corrigirRedacaoLivre, getRedacaoLivre, updateRedacaoLivre } from '@/apiCalls/redacao-livre';
import { createAutoSave } from './helpers/autoSave';
import { useTextHistory } from '@/hooks/useTextHistory';
import { listenCorrecaoRedacao } from '@/apiCalls/redacao';
import { CustomEventSourceMap } from '@/apiCalls/types';
import { GetCorrecaoRedacaoResponse } from '@/apiCalls/redacao/types';

type RedacaoData = {
  id: string;
  duracaoConfigurada: number;
  conteudoSalvo: string;
  tema: string
};

export function RedacaoPage({ id }: { id: string }) {
  const router = useRouter();
  
  // SEU HOOK
  const { texto, setTexto, undo, redo } = useTextHistory(""); 

  const [data, setData] = useState<RedacaoData | null>(null);
  const [contagemPalavras, setContagemPalavras] = useState(0);
  const [tempoRestante, setTempoRestante] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [loadingCorrigir, setLoadingCorrigir] = useState(false); 

  // --- LÓGICA DO AMIGO (Callbacks) ---
  const onError = (data: CustomEventSourceMap['appError']) => {
    toast.error(`error number ${data.data.statusCode}: ${data.data.message}`)
    setLoadingCorrigir(false);
  }

  const onDelay = (_: null) => {
    toast.info('correção em andamento, por favor aguarde!')
  }

  const onSuccess = (_: GetCorrecaoRedacaoResponse) => {
    const redacaoId = data?.id;
    if (!redacaoId) return;
    router.replace(`/praticar_redacao/${redacaoId}/correcao`);
  }
  // -----------------------------------

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updateText = async (txt: string, duracao: number): Promise<void> => {
    const redacaoId = data?.id;
    if (!redacaoId) return;
    await updateRedacaoLivre(redacaoId, { texto: txt, duracao })
  }
  
  const autoSave = createAutoSave(updateText, 2000, 1000)
  const useAutoSave = useCallback(autoSave, [])

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

  // Se o tempo acabar
  useEffect(() => {
    (async () => {
      if (tempoRestante > 0) return
      await executCorrigirRedacao();
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tempoRestante])


  // MISTURA: SUA LÓGICA DE LOADING + A LÓGICA DELE DE LISTEN
  const executCorrigirRedacao = async () => {
    const redacaoId = data?.id;
    if (!redacaoId) return;

    try {
      setLoadingCorrigir(true);
      
      await updateRedacaoLivre(redacaoId, {
        texto,
        finalizada: true,
        dataRealizacao: new Date().toISOString(),
      });

      await corrigirRedacaoLivre(redacaoId, {
        textoRedacao: texto,
        tema: data.tema
      });

      // AQUI ENTRA O CÓDIGO DO AMIGO
      await listenCorrecaoRedacao(redacaoId, onError, onDelay, onSuccess)

    } catch (error) {
      console.error("Erro ao corrigir", error);
      setLoadingCorrigir(false);
      toast.error("Erro ao iniciar correção.");
    }
  }

  const handleFinalizar = async () => {
    const redacaoId = data?.id;
    if (!redacaoId) return;

    await updateRedacaoLivre(redacaoId, {
      texto,
      finalizada: true,
      dataRealizacao: new Date().toISOString(),
    });
    
    alert("Redação salva e finalizada com sucesso!");
  };

  const handleCorrigir = async () => {
    await executCorrigirRedacao();
  };

  const handlePause = async () => {
    setIsPaused(!isPaused);
    if (!isPaused) {
      await updateText(texto, tempoRestante)
    }
  }

  return (
    <div className="relative bg-[#EBEBEB] rounded-[30px] shadow-lg w-full p-6 md:p-10">
      <RedacaoHeader
        tempoRestante={tempoRestante}
        isPaused={isPaused}
        onPauseToggle={handlePause}
      />

      <div className="mt-12">
        <RedacaoEditorArea
          texto={texto}
          onTextoChange={async (txt) => {
            setTexto(txt)
            await useAutoSave(txt, tempoRestante)
          }}
          onUndo={undo}
          onRedo={redo}
        />
      </div>

      <RedacaoFooter
        contagemPalavras={contagemPalavras}
        maxPalavras={400} // Mantido o seu limite
        onFinalizar={handleFinalizar}
        onCorrigir={handleCorrigir}
        isLoading={loadingCorrigir} // Mantido o seu loading
      />
    </div>
  );
}