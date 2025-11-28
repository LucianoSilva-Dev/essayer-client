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
import { ConfirmationModal } from '@/components/ConfirmationModal';
import { toast } from 'react-toastify';

export function RedacaoPage({ id }: { id: string }) {
  const router = useRouter();

  const [texto, setTexto] = useState("");
  const [contagemPalavras, setContagemPalavras] = useState(0);
  const [tempoRestante, setTempoRestante] = useState(0); 
  const [isPaused, setIsPaused] = useState(false);
  const [isSending, setIsSending] = useState(false); // Novo estado para feedback de envio

  // ESTADO DO MODAL
  const [isMotivacionalOpen, setIsMotivacionalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

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

        if (data && data.tempoLimiteEmMinutos) {
          setTempoRestante(data.tempoLimiteEmMinutos * 60);
        }

        setTextosMotivadores([]);

        // Tenta iniciar (ignora erro se já iniciada para não travar a tela)
        try {
            await iniciarRespostaRedacao(id);
        } catch (err) {
            console.warn("Tarefa já iniciada ou erro ao iniciar:", err);
        }

      } catch (error) {
        console.error("Erro ao carregar tarefa:", error);
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
    if (isPaused || isMotivacionalOpen || tempoRestante === 0) return;

    const interval = setInterval(() => {
      setTempoRestante((t) => (t > 0 ? t - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);

  }, [isPaused, tempoRestante, isMotivacionalOpen]);

  // --- LÓGICA DE FINALIZAÇÃO ATUALIZADA ---
  const handleFinalizar = () => {
    if (!texto.trim()) {
      toast.warn("Sua redação está em branco. Escreva algo antes de finalizar.");
      return;
    }
    setIsConfirmModalOpen(true);
  };

  const handleConfirmFinalizar = async () => {
    try {
        setIsSending(true);
        setIsConfirmModalOpen(false);
        
        // Calcula o tempo gasto em minutos
        const tempoTotal = tarefa?.tempoLimiteEmMinutos ? tarefa.tempoLimiteEmMinutos * 60 : 0;
        const tempoGastoSegundos = tempoTotal - tempoRestante;
        const tempoEmMinutos = Math.ceil(tempoGastoSegundos / 60);

        // Envia o texto para a API
        await enviarRespostaRedacao(id, { 
            texto,
            tempoEmMinutos: tempoEmMinutos > 0 ? tempoEmMinutos : 1 // Garante pelo menos 1 minuto
        });
        
        toast.success("Redação enviada com sucesso!");
        
        // Redireciona de volta para a listagem de turmas do aluno
        router.push('/turmas_aluno'); 

    } catch (error) {
        console.error("Erro ao enviar redação:", error);
        toast.error("Ocorreu um erro ao enviar sua redação. Por favor, tente novamente.");
        setIsSending(false);
    }
  };

  const handlePause = () => setIsPaused(!isPaused);
  const handleOpenMotivacional = () => setIsMotivacionalOpen(true);

  if (loading) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-xl text-[#075F70] font-montserrat animate-pulse">Carregando tarefa...</p>
      </main>
    );
  }

  if (!tarefa) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-xl text-red-500">Tarefa não encontrada.</p>
        <button onClick={() => router.back()} className="mt-4 text-[#075F70] underline">Voltar</button>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center min-h-screen py-12 px-4">

      <MotivacionalModal
        isOpen={isMotivacionalOpen}
        onClose={() => setIsMotivacionalOpen(false)}
        textos={textosMotivadores}
      />

      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmFinalizar}
        title="Finalizar Redação"
        description="Tem certeza que deseja finalizar e enviar sua redação? Essa ação não pode ser desfeita."
        confirmText="Sim, enviar"
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
              maxPalavras={400} // Valor padrão, pode vir da API futuramente
              onFinalizar={handleFinalizar}
              // Se quiser desabilitar o botão enquanto envia:
              // disabled={isSending} 
            />
          </div>
        </div>
      </div>
    </main>
  );
}
