import React from "react";

const mock = [
  { id: "r1", tema: "Redação IA", visto: false },
  { id: "r2", tema: "Resumo crítico", visto: true },
];

export default function CorrecaoList() {
  return (
    <div className="space-y-2">
      {mock.map((c) => (
        <div key={c.id} className="flex items-center justify-between p-2 border rounded">
          <div>
            <div className="text-sm font-medium">{c.tema}</div>
            <div className="text-xs text-gray-400">{c.visto ? "Visto" : "Não visto"}</div>
          </div>
          <button className="text-sm text-teal-600">Abrir</button>
        </div>
      ))}
    </div>
  );
}
