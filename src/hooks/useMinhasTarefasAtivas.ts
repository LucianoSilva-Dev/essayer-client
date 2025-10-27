// src/hooks/useMinhasTarefasAtivas.ts
"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getMinhasAtividadesAtivas } from "@/apiCalls/tarefas"; // Importa a função da API
import { MinhaTarefaAtiva } from "@/apiCalls/tarefas/types"; // Importa o tipo

export function useMinhasTarefasAtivas() {
  const [tarefas, setTarefas] = useState<MinhaTarefaAtiva[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    let mounted = true;

    async function loadTarefas() {
      setLoading(true);
      setError(null);
      try {
        const tarefasData = await getMinhasAtividadesAtivas();

        if (mounted) {
          setTarefas(tarefasData);
        }
      } catch (err: any) {
        if (mounted) {
          console.error("Erro no hook useMinhasTarefasAtivas:", err);
          const msg = err?.response?.data?.message || err?.message || "Erro ao carregar tarefas ativas.";
          // Evitar toast duplicado se o apiClient já mostra
          // toast.error(msg);
          setError(err);
          setTarefas([]); // Define como vazio em caso de erro
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadTarefas();

    return () => {
      mounted = false; // Cleanup para evitar set state em componente desmontado
    };
  }, []); // Executa apenas uma vez no mount

  return { tarefas, loading, error };
}