import React from "react";
import IntegranteItem from "./integrante-item";

interface Integrante {
  id: string;
  nome: string;
  fotoPath?: string | null;
}

export default function IntegranteList({
  integrantes,
}: {
  integrantes: Integrante[];
}) {
  if (!integrantes || integrantes.length === 0)
    return (
      <div className="text-sm text-gray-500 bg-gray-50 rounded-lg p-3 text-center">
        Nenhum integrante na turma.
      </div>
    );

  return (
    <div className="space-y-2">
      {integrantes.map((i) => (
        <IntegranteItem key={i.id} integrante={i} />
      ))}
    </div>
  );
}
