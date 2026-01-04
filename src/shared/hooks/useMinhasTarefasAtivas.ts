"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getMinhasAtividadesAtivas } from "@/lib/apiCalls/tarefas"; // Importa a função da API
import { MinhaTarefaAtiva } from "@/lib/apiCalls/tarefas/types"; // Importa o tipo

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
          const agora = new Date();
          const tarefasFiltradas = tarefasData.filter((tarefa) => {
            // 1. Verificar Status: Apenas 'pendente' é considerada ativa
            // O usuário confirmou que 'concluida' e 'encerrada' não devem aparecer
            const statusOk = tarefa.status?.toLowerCase() === 'pendente';

            // 2. Verificar Prazo: Se houver dataLimite, deve ser maior que agora
            let prazoOk = true;
            if (tarefa.dataLimite) {
              const dataLimite = new Date(tarefa.dataLimite);
              prazoOk = dataLimite > agora;
            }

            return statusOk && prazoOk;
          });

          setTarefas(tarefasFiltradas);
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