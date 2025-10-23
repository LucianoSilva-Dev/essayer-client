import React from "react";
import TarefaItem from "./tarefa-item";
import { AtividadeBasica } from "@/apiCalls/turma/types";

export default function TarefaList({ tarefas }: { tarefas: AtividadeBasica[] }) {
  if (!tarefas || tarefas.length === 0)
    return (
      <div className="text-sm text-gray-500 bg-gray-50 rounded-lg p-3 text-center">
        Nenhuma tarefa encontrada.
      </div>
    );

  return (
    <div className="space-y-3">
      {tarefas.map((t) => (
        <TarefaItem key={t.id} tarefa={t} />
      ))}
    </div>
  );
}
