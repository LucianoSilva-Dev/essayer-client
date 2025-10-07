import React from "react";

interface Integrante {
  id: string;
  nome: string;
  fotoPath?: string | null;
}

export default function IntegranteItem({ integrante }: { integrante: Integrante }) {
  return (
    <div className="flex items-center gap-3">
      <img
        src={integrante.fotoPath || "/default-avatar.png"}
        alt={integrante.nome}
        className="w-8 h-8 rounded-full object-cover border"
      />
      <span className="text-sm text-gray-700 font-medium truncate">
        {integrante.nome}
      </span>
    </div>
  );
}
