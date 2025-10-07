import React from "react";
import NotificacaoCard from "./notificacao-card";

const mockNotificacoes = [
  { id: "1", title: "Nova tarefa disponível", text: "Redação: Os impactos da IA..." },
  { id: "2", title: "Prazo prorrogado", text: "Prazo de entrega estendido até 12/09." },
  { id: "3", title: "Correção liberada", text: "Sua redação foi corrigida." },
];

export default function NotificacaoList() {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold">Notificações</h4>
        <button className="text-sm text-teal-600">Ver todas</button>
      </div>
      <div className="space-y-3">
        {mockNotificacoes.map((n) => (
          <NotificacaoCard key={n.id} title={n.title} text={n.text} />
        ))}
      </div>
    </div>
  );
}
