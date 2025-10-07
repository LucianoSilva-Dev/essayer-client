import React from "react";
import TarefaAtivaCard from "./tarefa-ativa-card";

const mock = [
  { id: "a1", titulo: "Redação: IA e trabalho", descricao: "Tema geral..." , dataLimite: "2025-09-09" },
  { id: "a2", titulo: "Resumo crítico", descricao: "Leia o artigo X...", dataLimite: "2025-09-15" },
];

export default function TarefaList() {
  return (
    <div className="space-y-4">
      {mock.map((t) => (
        <TarefaAtivaCard key={t.id} tarefa={t} />
      ))}
    </div>
  );
}
