import React from "react";
import { UserMini } from "@/types/user";

export default function IntegranteList({ integrantes }: { integrantes: UserMini[] }) {
  if (!integrantes || integrantes.length === 0)
    return <div className="text-sm text-gray-500">Nenhum integrante.</div>;

  return (
    <div className="space-y-2">
      {integrantes.map((i) => (
        <div key={i.id} className="flex items-center gap-3">
          <img
            src={i.fotoPath ?? "/perfil.png"}
            alt={i.nome}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <div className="font-medium">{i.nome}</div>
            <div className="text-xs text-gray-400">Aluno</div>
          </div>
        </div>
      ))}
    </div>
  );
}
