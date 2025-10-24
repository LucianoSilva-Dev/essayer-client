// src/components/turma-aberta-prof/header-Turma-prof/turma-header.tsx
"use client"

import Image from "next/image";
import { Settings } from "lucide-react";
// Importa o tipo Turma que inclui iconeId (como string)
import type { Turma } from "@/apiCalls/turma-aberta-prof/types";
// Importa a função utilitária e o ícone padrão
import { getIconPath } from "@/app/utils";
import { defaultIcon } from "@/constants/icons";

interface TurmaHeaderProps {
  turma: Turma | null; // Aceita a turma ou null (para estado de carregamento)
  // Adicione outras props se necessário, como um handler para o botão de configurações
  // onSettingsClick?: () => void;
}

export function TurmaHeader({ turma /*, onSettingsClick */ }: TurmaHeaderProps) {

  // Lida com o estado de carregamento ou erro (turma nula)
  if (!turma) {
    return (
      <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow animate-pulse">
        <div className="w-16 h-16 rounded-full bg-gray-200"></div>
        <div className="flex-1 space-y-2">
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
         <div className="w-10 h-10 rounded-md bg-gray-200"></div>
      </div>
    );
  }

  // Obtém o caminho do ícone usando a função utilitária
  // A API retorna iconeId como string, convertemos para número
  const iconPath = getIconPath(parseInt(turma.iconeId, 10), defaultIcon.src);
  // A descrição não está no tipo Turma da API /turma/{id}. Usaremos escola como fallback.
  // Se 'descricao' for adicionada à API futuramente, ajuste aqui.
  const descricaoOuEscola = turma.escola || "Sem descrição ou escola";


  return (
    <div className="flex items-start gap-3 sm:gap-4 p-4 bg-white rounded-lg shadow">
       {/* Ícone da Turma */}
       <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border border-gray-200">
           <Image
             src={iconPath}
             alt={`Ícone da turma ${turma.nome}`}
             width={64} // Tamanho maior para qualidade
             height={64}
             className="w-full h-full object-cover"
           />
       </div>

      {/* Informações da Turma */}
      <div className="flex-1 min-w-0"> {/* min-w-0 para truncar texto se necessário */}
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 truncate" title={turma.nome}>
            {turma.nome}
        </h1>
        {/* Usando a descrição ou escola */}
        <p className="text-sm text-gray-500 mt-1 truncate" title={descricaoOuEscola}>
            {descricaoOuEscola}
        </p>
      </div>

       {/* Botão de Configurações */}
      <button
        // onClick={onSettingsClick} // Adicionar handler se necessário
        className="ml-auto flex-shrink-0 p-2 rounded-md hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
        aria-label="Configurações da turma"
      >
        <Settings className="h-5 w-5" />
      </button>
    </div>
  );
}