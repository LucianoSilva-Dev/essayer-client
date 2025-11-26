'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { RedacaoEditorArea } from './RedacaoEditorArea';
import { RedacaoHeader } from './RedacaoHeader';
import { RedacaoFooter } from './RedacaoFooter';
import { MotivacionalModal } from './MotivacionalModal';
import { getAtividadeRedacaoDetalhes, enviarRespostaRedacao, iniciarRespostaRedacao } from '@/apiCalls/tarefas';
import { AtividadeRedacaoDetalhada } from '@/apiCalls/turma/types';
import { TextoData } from './MotivacionalCard';

export function RedacaoPage({ id }: { id: string }) {
  const router = useRouter();

  const [texto, setTexto] = useState("");
  const [contagemPalavras, setContagemPalavras] = useState(0);
  const [tempoRestante, setTempoRestante] = useState(0); // Inicializa com 0, atualiza após fetch
  const [isPaused, setIsPaused] = useState(false);

  // ESTADO DO MODAL
  const [isMotivacionalOpen, setIsMotivacionalOpen] = useState(false);

  // ESTADOS DE DADOS
  const [tarefa, setTarefa] = useState<AtividadeRedacaoDetalhada | null>(null);
  const [loading, setLoading] = useState(true);
  const [textosMotivadores, setTextosMotivadores] = useState<TextoData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getAtividadeRedacaoDetalhes(id);
        setTarefa(data);

        // Configurar tempo limite (converter minutos para segundos)
        if (data.tempoLimiteEmMinutos) {
          setTempoRestante(data.tempoLimiteEmMinutos * 60);
        }

        // TODO: Buscar textos motivadores usando os IDs em data.repertoriosApoio
        // Por enquanto, deixaremos vazio pois precisamos saber o tipo de cada repertório (Obra, Citação, etc) para buscar corretamente
        // ou de um endpoint que retorne os objetos completos.
        setTextosMotivadores([]);

        // Marcar início da resposta
        await iniciarRespostaRedacao(id);

      } catch (error) {
        console.error("Erro ao carregar tarefa:", error);
        // Tratar erro (ex: redirecionar ou mostrar mensagem)
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

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

  }, [isPaused, tempoRestante, isMotivacionalOpen]);

  const handleFinalizar = async () => {
    if (!texto.trim()) {
      alert("Escreva algo antes de finalizar.");
      return;
    }

    try {
      await enviarRespostaRedacao(id, { texto });
      alert("Redação enviada com sucesso!");
      router.push('/minhas-tarefas'); // Redirecionar para lista de tarefas ou feedback
    } catch (error) {
      console.error("Erro ao enviar redação:", error);
      alert("Erro ao enviar redação. Tente novamente.");
    }
  };

  const handlePause = () => setIsPaused(!isPaused);
  const handleOpenMotivacional = () => setIsMotivacionalOpen(true);

  if (loading) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-xl text-[#075F70]">Carregando tarefa...</p>
      </main>
    );
  }

  if (!tarefa) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-xl text-red-500">Tarefa não encontrada.</p>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center min-h-screen py-12 px-4">

      {/* O Modal vive aqui no topo */}
      <MotivacionalModal
        isOpen={isMotivacionalOpen}
        onClose={() => setIsMotivacionalOpen(false)}
        textos={textosMotivadores}
      />

      <h1 className="text-2xl md:text-3xl font-bold text-[#075F70] text-center mb-12 px-4">
        {tarefa.tema}
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
              maxPalavras={400} // Poderia vir da config da tarefa se existir
              onFinalizar={handleFinalizar}
            />
          </div>
        </div>
      </div>
    </main>
  );
}