"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getTurmaById, getAtividadesByTurma } from "@/apiCalls/turma";
import { TurmaDetalhada, Tarefa } from "@/types/turma";

export function useTurmaAbertaAluno(turmaId: string) {
  const [turma, setTurma] = useState<TurmaDetalhada | null>(null);
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (!turmaId) return;

    let mounted = true;

    async function loadData() {
      setLoading(true);
      setError(null);

      try {
        const [turmaData, atividadesData] = await Promise.all([
          getTurmaById(turmaId),
          getAtividadesByTurma(turmaId),
        ]);

        if (!mounted) return;

        // Garantir integridade das respostas
        if (!turmaData) {
          throw new Error("Nenhuma turma encontrada.");
        }

        setTurma(turmaData);
        setTarefas(Array.isArray(atividadesData) ? atividadesData : []);
      } catch (err: any) {
        if (!mounted) return;

        console.error("Erro ao carregar dados da turma:", err);

        const msg =
          err?.response?.data?.message ||
          err?.message ||
          "Erro ao carregar dados da turma.";
        toast.error(msg);

        setError(err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadData();

    return () => {
      mounted = false;
    };
  }, [turmaId]);

  return { turma, tarefas, loading, error };
}
