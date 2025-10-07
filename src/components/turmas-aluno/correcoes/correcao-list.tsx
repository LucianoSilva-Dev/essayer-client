import React from "react";

const mock = [
  { id: "c1", tema: "Redação IA", status: "Visto" },
  { id: "c2", tema: "Resumo crítico", status: "Não visto" },
];

export default function CorrecaoList() {
  return (
    <div className="space-y-3">
      {mock.map((c) => (
        <div key={c.id} className="p-2 border rounded">
          <div className="text-sm font-medium">{c.tema}</div>
          <div className="text-xs text-gray-500">{c.status}</div>
        </div>
      ))}
    </div>
  );
}
