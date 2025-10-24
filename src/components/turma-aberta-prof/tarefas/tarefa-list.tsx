// src/components/turma-aberta-prof/tarefas/tarefa-list.tsx
"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { getAtividadesCriador, getTurmaById } from "@/apiCalls/turma";
import { AtividadeProfessor, Turma } from "@/apiCalls/turma/types";
import { toast } from "react-toastify";
import TarefaCard from "./tarefa-card";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Importar ícones

interface TarefaListProps {
  turmaId: string;
  onSelectedDateChange: (date: Date | undefined) => void;
  onSelectedAtividadeChange: (atividade: AtividadeProfessor | null) => void;
}

// Largura estimada do card selecionado + gap (ajuste se necessário)
const CARD_WIDTH_PLUS_GAP = 268 + 16; // 284

export default function TarefaList({
    turmaId,
    onSelectedDateChange,
    onSelectedAtividadeChange
}: TarefaListProps) {
  const [atividadesProfessor, setAtividadesProfessor] = useState<AtividadeProfessor[]>([]);
  const [turma, setTurma] = useState<Turma | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isScrollingProgrammatically = useRef(false); // Flag para evitar loop de scroll/state update

  // --- Busca de Dados ---
  const fetchData = useCallback(async () => {
    // ... (código de busca de dados - sem alterações) ...
     if (!turmaId) {
        setLoading(false);
        setError("ID da turma não fornecido.");
        return;
    }
    setLoading(true);
    setError(null);
    let mounted = true;
    try {
        const [atividadesData, turmaData] = await Promise.all([
            getAtividadesCriador(turmaId),
            getTurmaById(turmaId)
        ]);

        if (mounted) {
            setAtividadesProfessor(Array.isArray(atividadesData) ? atividadesData : []);
            setTurma(turmaData);
            // Reset selectedIndex if data reloads (optional)
            // setSelectedIndex(0);
        }
    } catch (err: any) {
        console.error("Erro ao buscar dados para TarefaList:", err);
        const msg = err?.response?.data?.error || err.message || "Erro ao carregar dados da lista de tarefas.";
        if (mounted) {
            setError(msg);
            toast.error(msg);
            setAtividadesProfessor([]);
            setTurma(null);
        }
    } finally {
        if (mounted) setLoading(false);
    }
     return () => {
        mounted = false;
    };
  }, [turmaId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const totalAlunosNaTurma = turma?.membros?.length ? Math.max(0, turma.membros.length - 1) : 0;

  // --- Atualiza Componente Pai ---
  useEffect(() => {
    // ... (código de atualização do pai - sem alterações) ...
     let selectedDate: Date | undefined = undefined;
    let selectedAtividade: AtividadeProfessor | null = null;

    if (atividadesProfessor && atividadesProfessor.length > 0 && selectedIndex < atividadesProfessor.length) {
       selectedAtividade = atividadesProfessor[selectedIndex];
       const dateString = selectedAtividade?.dataLimite;
       if (dateString) {
        const date = new Date(dateString);
        if (!isNaN(date.getTime())) {
          selectedDate = date;
        }
      }
    }
    onSelectedDateChange(selectedDate);
    onSelectedAtividadeChange(selectedAtividade);
  }, [selectedIndex, atividadesProfessor, onSelectedDateChange, onSelectedAtividadeChange]);

  // --- Lógica de Scroll ---
  const handleScroll = useCallback(() => {
    // Se o scroll foi iniciado pelos botões, ignora a detecção automática
    if (isScrollingProgrammatically.current || !scrollRef.current || !atividadesProfessor || atividadesProfessor.length === 0) return;

    const container = scrollRef.current;
    const scrollLeft = container.scrollLeft;

    // Calcula o índice mais próximo do centro (baseado na estimativa)
    let closestIndex = Math.round(scrollLeft / CARD_WIDTH_PLUS_GAP);
    closestIndex = Math.max(0, Math.min(atividadesProfessor.length - 1, closestIndex));

    if (closestIndex !== selectedIndex) {
      setSelectedIndex(closestIndex);
    }
  }, [atividadesProfessor, selectedIndex]);

  // --- Funções de Navegação ---
  const scrollToSelectedIndex = (index: number) => {
    if (!scrollRef.current || index < 0 || index >= atividadesProfessor.length) return;

    const targetScrollLeft = index * CARD_WIDTH_PLUS_GAP;
    isScrollingProgrammatically.current = true; // Ativa a flag

    scrollRef.current.scrollTo({
      left: targetScrollLeft,
      behavior: 'smooth'
    });

    // Atualiza o estado APÓS iniciar o scroll para refletir a nova seleção
    setSelectedIndex(index);

    // Reseta a flag após a animação (timeout estimado)
    // Pode ser necessário ajustar a duração ou usar eventos de scrollend (mais complexo)
    setTimeout(() => {
      isScrollingProgrammatically.current = false;
    }, 500); // Duração um pouco maior que a animação de scroll
  };

  const handlePrev = () => {
    scrollToSelectedIndex(selectedIndex - 1);
  };

  const handleNext = () => {
    scrollToSelectedIndex(selectedIndex + 1);
  };

  // --- Renderização ---
  if (loading) return <div className="text-center p-4 text-gray-500">Carregando tarefas...</div>;
  if (error) return <div className="text-center p-4 text-red-600">{error}</div>;
  if (!atividadesProfessor || atividadesProfessor.length === 0) return <div className="text-center p-4 text-gray-500">Nenhuma tarefa criada nesta turma.</div>;

  const canGoPrev = selectedIndex > 0;
  const canGoNext = selectedIndex < atividadesProfessor.length - 1;

  return (
    <div className="relative w-full"> {/* Container relativo para os botões */}
      {/* Botão Anterior */}
      <button
        onClick={handlePrev}
        disabled={!canGoPrev || loading}
        aria-label="Tarefa anterior"
        className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md border border-gray-200 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-opacity -ml-3`} // Posicionamento e estilo
      >
        <ChevronLeft size={20} className="text-gray-600" />
      </button>

      {/* Container do Carrossel */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-4 py-4"
        style={{ scrollPadding: '0 50%' }}
      >
        {atividadesProfessor.map((tarefa, index) => {
          const enviosCount = tarefa.usuariosResponderam?.length ?? 0;
          const alunosExtrasCount = Math.max(0, enviosCount - 3);

          return (
            <div key={tarefa.id} className={`snap-center flex-shrink-0`}>
              <TarefaCard
                tema={tarefa.titulo}
                data={tarefa.dataLimite || "Sem prazo"}
                envios={enviosCount}
                total={totalAlunosNaTurma}
                alunosExtras={alunosExtrasCount}
                isSelected={index === selectedIndex}
              />
            </div>
          );
        })}
      </div>

      {/* Botão Próximo */}
      <button
        onClick={handleNext}
        disabled={!canGoNext || loading}
        aria-label="Próxima tarefa"
        className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md border border-gray-200 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-opacity -mr-3`} // Posicionamento e estilo
      >
        <ChevronRight size={20} className="text-gray-600" />
      </button>
    </div>
  );
}
