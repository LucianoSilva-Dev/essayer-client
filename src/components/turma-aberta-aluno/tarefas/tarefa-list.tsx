import React from "react";
import TarefaItem from "./tarefa-item";
import { Tarefa } from "@/types/turma";

export default function TarefaList({ tarefas }: { tarefas: Tarefa[] }) {
  if (!tarefas || tarefas.length === 0)
    return <div className="text-sm text-gray-500">Nenhuma tarefa encontrada.</div>;

  return (
    <div className="space-y-3">
      {tarefas.map((t) => (
        <TarefaItem key={t.id} tarefa={t} />
      ))}
    </div>
  );
}
