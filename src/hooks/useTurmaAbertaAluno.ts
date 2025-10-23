// src/hooks/useTurmaAbertaAluno.ts
"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getTurmaById, getAtividadesByTurma, getCorrecoesByTurma } from "@/apiCalls/turma";
import { Correcao } from "@/apiCalls/turma/types";
import { AtividadeBasica, Turma } from "@/apiCalls/turma/types";
import { Atividade } from "@/apiCalls/turma-aberta-prof/types";

export function useTurmaAbertaAluno(turmaId: string) {
  const [turma, setTurma] = useState<Turma | null>(null);
  const [tarefas, setTarefas] = useState<AtividadeBasica[]>([]);
  const [correcoes, setCorrecoes] = useState<Correcao[]>([]); // Mantém o estado para correções
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (!turmaId) return;
    let mounted = true;

    async function loadData() {
      setLoading(true);
      setError(null);
      try {
        // Busca turma, atividades e correções em paralelo
        const [turmaData, atividadesData, correcoesData] = await Promise.all([
          getTurmaById(turmaId),
          getAtividadesByTurma(turmaId),
          getCorrecoesByTurma(turmaId),
        ]);

        if (!mounted) return;

        if (!turmaData) {
          throw new Error("Nenhuma turma encontrada.");
        }

        setTurma(turmaData);
        setTarefas(Array.isArray(atividadesData) ? atividadesData : []);
        setCorrecoes(Array.isArray(correcoesData) ? correcoesData : []); // Define as correções diretamente da API

      } catch (err: any) {
        if (!mounted) return;
        console.error("Erro ao carregar dados da turma:", err);
        const msg = err?.response?.data?.message || err?.message || "Erro ao carregar dados da turma.";
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

  return { turma, tarefas, correcoes, loading, error };
}