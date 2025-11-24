// src/components/praticar_redacao/editor/RedacaoPage.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { RedacaoEditorArea } from './RedacaoEditorArea';
import { RedacaoHeader } from './RedacaoHeader';
import { RedacaoFooter } from './RedacaoFooter';
import { corrigirRedacaoLivre, getRedacaoLivre, updateRedacaoLivre } from '@/apiCalls/redacao-livre';
import { createAutoSave } from './helpers/autoSave';
import { useTextHistory } from '@/hooks/useTextHistory';

// ... (Tipos e interfaces mantêm-se iguais) ...

type RedacaoData = {
  id: string;
  duracaoConfigurada: number;
  conteudoSalvo: string;
  tema: string
};

export function RedacaoPage({ id }: { id: string }) {
  const router = useRouter();
  
  // Hook de histórico
  const { texto, setTexto, undo, redo } = useTextHistory(""); 

  const [data, setData] = useState<RedacaoData | null>(null);
  const [contagemPalavras, setContagemPalavras] = useState(0);
  const [tempoRestante, setTempoRestante] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [loadingCorrigir, setLoadingCorrigir] = useState(false); // Estado de loading para feedback

  // ... (useEffects de carregamento, contador e timer iguais ao anterior) ...

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

  // ... (Demais useEffects iguais) ...

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

  // Se o tempo acabar, forçamos a correção (comportamento original)
  useEffect(() => {
    (async () => {
      if (tempoRestante > 0) return
      await executCorrigirRedacao();
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tempoRestante])


  const handleChange = async (txt: string) => {
    setTexto(txt)
    await useAutoSave(txt, tempoRestante)
  }

  // --- LÓGICA REORGANIZADA ---

  // Função centralizada para não repetir código
  const executCorrigirRedacao = async () => {
    const redacaoId = data?.id;
    if (!redacaoId) return;

    try {
      setLoadingCorrigir(true);
      // 1. Salva estado final
      await updateRedacaoLivre(redacaoId, {
        texto,
        finalizada: true,
        dataRealizacao: new Date().toISOString(),
      });

      // 2. Chama a IA
      await corrigirRedacaoLivre(redacaoId, {
        textoRedacao: texto,
        tema: data.tema
      });

      // 3. Navega
      router.replace(`/praticar_redacao/${redacaoId}/correcao`);
    } catch (error) {
      console.error("Erro ao corrigir", error);
      setLoadingCorrigir(false);
    }
  }

  // Botão 1: Apenas Finalizar (Salva e marca como finalizada, mas fica na tela ou volta pro menu)
  const handleFinalizar = async () => {
    const redacaoId = data?.id;
    if (!redacaoId) return;

    await updateRedacaoLivre(redacaoId, {
      texto,
      finalizada: true,
      dataRealizacao: new Date().toISOString(),
    });
    
    alert("Redação salva e finalizada com sucesso!");
    // Aqui você poderia redirecionar para a lista de redações, se quiser:
    // router.push('/praticar_redacao');
  };

  // Botão 2: Corrigir (Faz tudo que o finalizar fazia antes + redireciona)
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
      
      {/* 1. Timer (Absolute no canto direito) */}
      <RedacaoHeader
        tempoRestante={tempoRestante}
        isPaused={isPaused}
        onPauseToggle={handlePause}
      />

      {/* --- REMOVIDO O BLOCO DE TÍTULO AQUI --- */}
      {/* O título agora está no arquivo page.tsx, do lado de fora */}

      {/* 2. Área de Edição */}
      {/* Adicionei mt-8 para dar um espacinho do topo do card até o papel, já que não tem mais título aqui */}
      <div className="mt-12">
        <RedacaoEditorArea
          texto={texto}
          onTextoChange={handleChange}
          onUndo={undo}
          onRedo={redo}
        />
      </div>

      {/* 3. Rodapé */}
{/* ALTERAÇÃO AQUI: Passamos o estado de loading para o footer */}
      <RedacaoFooter
        contagemPalavras={contagemPalavras}
        maxPalavras={400}
        onFinalizar={handleFinalizar}
        onCorrigir={handleCorrigir}
        isLoading={loadingCorrigir} // <--- NOVA PROP
      />
    </div>

  );
}