// src/components/turma-aberta-aluno/comunidade/integrante-item.tsx
import React from "react";
import Image from "next/image";
import { User } from "lucide-react";

export interface Integrante {
  id: string;
  nome: string;
  fotoPath?: string | null;
  role?: "professor" | "student";
}

export default function IntegranteItem({
  integrante,
}: {
  integrante: Integrante;
}) {
  const isProfessor = integrante.role === "professor";

  return (
    <div
      className={`flex items-center gap-3 p-2 rounded-xl transition-colors ${
        isProfessor ? "bg-white" : "hover:bg-gray-50"
      }`}
    >
      <div
        className={`relative w-9 h-9 rounded-full flex items-center justify-center overflow-hidden border-2 ${
          isProfessor
            ? "border-custom-blue p-0.5"
            : "border-transparent bg-gray-100"
        }`}
      >
        {integrante.fotoPath ? (
          <div className="relative w-full h-full rounded-full overflow-hidden">
            <Image
              src={integrante.fotoPath}
              alt={integrante.nome}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ) : (
          <User
            size={16}
            className={isProfessor ? "text-custom-blue" : "text-gray-400"}
          />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between">
          <span
            className={`text-sm font-bold truncate ${
              isProfessor ? "text-gray-900" : "text-gray-600"
            }`}
          >
            {integrante.nome}
          </span>
        </div>
        {isProfessor && (
          <p className="text-[10px] text-custom-blue font-medium truncate">
            Responsável
          </p>
        )}
      </div>
    </div>
  );
}
