import React from "react";
import Image from "next/image";
import { User } from "lucide-react";

export interface Integrante {
  id: string;
  nome: string;
  fotoPath?: string | null;
  role?: 'professor' | 'aluno';
}

export default function IntegranteItem({ integrante }: { integrante: Integrante }) {
  const isProfessor = integrante.role === 'professor';

  return (
    <div className={`flex items-center gap-3 p-2 rounded-md ${isProfessor ? 'bg-teal-50 border border-teal-100' : ''}`}>
      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border">
          {integrante.fotoPath ? (
              <Image
                  src={integrante.fotoPath}
                  alt={integrante.nome}
                  width={32}
                  height={32}
                  className="object-cover"
              />
          ) : (
              <User size={18} className="text-gray-500" />
          )}
      </div>
      <div>
          <span className={`text-sm font-medium truncate ${isProfessor ? 'text-teal-800' : 'text-gray-700'}`}>
              {integrante.nome}
          </span>
          {isProfessor && (
              <span className="block text-xs text-teal-600">Professor da turma</span>
          )}
      </div>
    </div>
  );
}
