"use client";

import TarefaCard from "./tarefa-card";
import CriarTarefaButton from "./criar-tarefa-button";
import { useTurmaData } from "@/hooks/useTurmaData";

interface Props {
  turmaId: string;
}

export default function TarefaList({ turmaId }: Props) {
  const { atividades, loading, error } = useTurmaData(turmaId);

  if (loading) return <p className="text-gray-500">Carregando tarefas...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!atividades.length) return <p>Nenhuma tarefa encontrada.</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Tarefas ativas</h2>
        <CriarTarefaButton />
      </div>

      <div className="flex gap-4 overflow-x-auto scrollbar-hide">
        {atividades.map((tarefa) => (
          <TarefaCard
            key={tarefa.id}
            tema={tarefa.titulo}
            envios={0}
            total={60}
            alunosExtras={0}
            data={tarefa.dataLimite || "Sem prazo"}
          />
        ))}
      </div>
    </div>
  );
}
