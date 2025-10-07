import React from "react";

interface T {
  id: string;
  titulo: string;
  descricao?: string;
  dataLimite?: string;
}

export default function TarefaAtivaCard({ tarefa }: { tarefa: T }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow flex items-center justify-between">
      <div>
        <div className="font-semibold">{tarefa.titulo}</div>
        <div className="text-sm text-gray-500">{tarefa.descricao}</div>
        <div className="text-xs text-gray-400 mt-1">Fecha em: {tarefa.dataLimite}</div>
      </div>
      <div>
        <button className="px-3 py-1 bg-teal-600 text-white rounded">Iniciar tarefa</button>
      </div>
    </div>
  );
}
