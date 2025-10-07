import React from "react";
import { Tarefa } from "@/types/turma";

export default function TarefaItem({ tarefa }: { tarefa: Tarefa }) {
  return (
    <div className="p-3 rounded-lg bg-gray-50 border flex items-center justify-between">
      <div>
        <div className="font-medium">{tarefa.titulo}</div>
        <div className="text-sm text-gray-500">{tarefa.descricao}</div>
        <div className="text-xs text-gray-400 mt-1">Fechou em: {tarefa.dataLimite ?? "—"}</div>
      </div>
      <div>
        {tarefa.status === "Concluida" ? (
          <button className="px-3 py-1 bg-teal-600 text-white rounded">Ver correção</button>
        ) : (
          <button className="px-3 py-1 border rounded">Ver tarefa</button>
        )}
      </div>
    </div>
  );
}
