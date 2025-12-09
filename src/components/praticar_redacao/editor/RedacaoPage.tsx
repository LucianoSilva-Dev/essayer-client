// src/components/praticar_redacao/editor/RedacaoPage.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { RedacaoEditorArea } from './RedacaoEditorArea';
import { RedacaoHeader } from './RedacaoHeader';
import { RedacaoFooter } from './RedacaoFooter';
import { getRedacaoLivre, updateRedacaoLivre } from '@/apiCalls/redacao-livre';
import { createAutoSave } from './helpers/autoSave';
import { useTextHistory } from '@/hooks/useTextHistory';
import { encaminharCorrecaoRedacao, listenCorrecaoRedacao } from '@/apiCalls/redacao';
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
  const [correcaoIniciada, setCorrecaoIniciada] = useState(false);

  // --- LÓGICA DO AMIGO (Callbacks) ---
  const onError = useCallback((data: CustomEventSourceMap['appError']) => {
    toast.error(`error number ${data.data.statusCode}: ${data.data.message}`)
    setLoadingCorrigir(false);
    setCorrecaoIniciada(false);
  }, []);

  const onDelay = useCallback((_: null) => {
    toast.info('correção em andamento, por favor aguarde!')
  }, []);

  const onSuccess = useCallback((_: GetCorrecaoRedacaoResponse) => {
    const redacaoId = data?.id;
    if (!redacaoId) return;
    setLoadingCorrigir(false);
    setCorrecaoIniciada(false);
    router.replace(`/praticar_redacao/${redacaoId}/correcao`);
  }, [data?.id, router]);
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

  // 30s throttle (maxWait), 2s debounce
  const autoSave = createAutoSave(updateText, 20000, 2000)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedAutoSave = useCallback(autoSave, [data?.id])

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

  // CORREÇÃO: Função que retorna Promise e aguarda a correção
  const executCorrigirRedacao = async (): Promise<boolean> => {
    const redacaoId = data?.id;
    if (!redacaoId) return false;

    try {
      setLoadingCorrigir(true);
      setCorrecaoIniciada(true);

      await updateRedacaoLivre(redacaoId, {
        texto,
        finalizada: true,
        dataRealizacao: new Date().toISOString(),
      });

      await encaminharCorrecaoRedacao(redacaoId, texto, data.tema);

      // CORREÇÃO: Aguarda a correção ser concluída
      return new Promise((resolve) => {
        const successWrapper = (response: GetCorrecaoRedacaoResponse) => {
          onSuccess(response);
          resolve(true);
        };

        const errorWrapper = (errorData: CustomEventSourceMap['appError']) => {
          onError(errorData);
          resolve(false);
        };

        listenCorrecaoRedacao(redacaoId, errorWrapper, onDelay, successWrapper);
      });

    } catch (error) {
      console.error("Erro ao corrigir", error);
      setLoadingCorrigir(false);
      setCorrecaoIniciada(false);
      toast.error("Erro ao iniciar correção.");
      return false;
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

    setIsPaused(true)
    toast.info("Redação finalizada.");
    //pode redirecionar, mas ainda a acertar 
  };

  // CORREÇÃO: Aguarda a correção completar antes de redirecionar
  const handleCorrigir = async () => {
    const correcaoConcluida = await executCorrigirRedacao();
    
    // O redirecionamento agora só acontece dentro do onSuccess
    // Se a correção falhar, não redireciona
    if (!correcaoConcluida) {
      toast.error("Falha na correção da redação.");
    }
  };

  const handlePause = async () => {
    setIsPaused(!isPaused);
    if (!isPaused) {
      await updateText(texto, tempoRestante)
    }
  }

  // Função para impedir digitação quando pausado ou corrigindo
  const handleTextoChange = async (txt: string) => {
    // Impede digitação se estiver pausado ou corrigindo
    if (isPaused || loadingCorrigir || correcaoIniciada) {
      return;
    }
    
    setTexto(txt)
    await debouncedAutoSave(txt, tempoRestante)
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
          onTextoChange={handleTextoChange}
          onUndo={undo}
          onRedo={redo}
          disabled={isPaused || loadingCorrigir || correcaoIniciada} 
        />
      </div>

      <RedacaoFooter
        contagemPalavras={contagemPalavras}
        maxPalavras={400}
        onFinalizar={handleFinalizar}
        onCorrigir={handleCorrigir}
        isLoading={loadingCorrigir}
        // Adicione esta prop para desabilitar botões quando necessário
        disabled={isPaused || correcaoIniciada}
      />
    </div>
  );
}