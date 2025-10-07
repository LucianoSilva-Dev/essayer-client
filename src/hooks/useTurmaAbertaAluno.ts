import { useEffect, useState } from "react";
import { getTurmaById, getAtividadesByTurma } from "@/apiCalls/turma";
import { Turma, Tarefa } from "@/types/turma";

export function useTurmaAbertaAluno(turmaId: string) {
  const [turma, setTurma] = useState<Turma | null>(null);
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (!turmaId) return;
    let mounted = true;
    async function load() {
      try {
        const [tData, atividades] = await Promise.all([
          getTurmaById(turmaId),
          getAtividadesByTurma(turmaId),
        ]);
        if (mounted) {
          setTurma(tData);
          setTarefas(atividades ?? []);
        }
      } catch (err) {
        if (mounted) setError(err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [turmaId]);

  return { turma, tarefas, loading, error };
}
