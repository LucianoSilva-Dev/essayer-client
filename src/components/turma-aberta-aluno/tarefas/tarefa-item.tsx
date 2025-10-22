import React from "react";
import Image from "next/image";
import { Tarefa } from "@/types/turma"; //

export default function TarefaItem({ tarefa }: { tarefa: Tarefa }) {
  const dataFormatada = tarefa.dataLimite
    ? new Date(tarefa.dataLimite).toLocaleDateString("pt-BR", {
        day: "numeric",
        month: "numeric", // Usando 'numeric' para dd/mm/yyyy
        year: "numeric",
      })
    : "Sem prazo";

  // Verifica se a tarefa está 'Concluída' (case-insensitive)
  const isConcluida = tarefa.status?.toLowerCase() === "concluída"; // Ajustado para 'concluída'
  // Adiciona verificação para 'Encerrada'
  const isEncerrada = tarefa.status?.toLowerCase() === "encerrada";

  const getStatusClasses = () => {
    if (isConcluida) return "text-green-600 font-medium";
    if (isEncerrada) return "text-red-600 font-medium";
    return "text-gray-500"; // Status padrão ou pendente
  };

  const getContainerClasses = () => {
    if (isConcluida) return "bg-teal-700 text-white shadow-lg border-teal-800";
    return "bg-white text-gray-800 border-gray-200 hover:shadow-md";
  };

  return (
    <div
      className={`relative rounded-lg overflow-hidden transition shadow-sm border ${getContainerClasses()}`}
    >
      {/* Conteúdo principal */}
      <div
        className={`flex flex-col md:flex-row items-start md:items-center justify-between p-4 ${
          isConcluida ? "gap-6" : "gap-3"
        }`}
      >
        {/* Coluna Esquerda: Título e Descrição */}
        <div className="flex-1 min-w-0 mb-3 md:mb-0">
          <h3 className={`font-semibold text-base ${isConcluida ? "text-white" : "text-gray-800"}`}>
            {tarefa.titulo}
          </h3>
          {/* Descrição opcional, se houver */}
          {tarefa.descricao && (
            <p className={`text-sm mt-1 truncate ${isConcluida ? "text-gray-100/90" : "text-gray-600"}`}>
              {tarefa.descricao}
            </p>
          )}
        </div>

        {/* Coluna Meio: Data */}
        <div className="flex-shrink-0 text-sm text-center md:text-left w-full md:w-auto mb-3 md:mb-0">
           <span className={`${isConcluida ? "text-gray-200" : "text-gray-500"}`}>Fechou em</span>
           <br />
           <span className={`font-medium ${isConcluida ? "text-white" : "text-gray-700"}`}>{dataFormatada}</span>
        </div>

        {/* Coluna Direita: Status e Botão */}
        <div className="flex-shrink-0 flex flex-col items-end w-full md:w-auto text-sm text-right">
           <span className={`${isConcluida || isEncerrada ? "" : "text-gray-500"}`}>Status</span>
           <br />
           <span className={getStatusClasses()}>{tarefa.status || 'Pendente'}</span>
           {isConcluida && (
              <button className="mt-2 px-3 py-1 bg-white text-teal-700 text-xs font-medium rounded-md hover:bg-gray-100 transition">
                Ver correção
              </button>
           )}
           {/* Adicionar botão para "Ver tarefa" se não estiver concluída/encerrada, se necessário */}
           {!isConcluida && !isEncerrada && (
             <button className="mt-2 px-3 py-1 border border-gray-300 text-gray-700 text-xs font-medium rounded-md hover:bg-gray-50 transition">
               Ver tarefa
             </button>
           )}
        </div>
      </div>

      {/* Ilustração e Selo para tarefas concluídas */}
      {isConcluida && (
        <>
          <div className="absolute top-0 right-0 w-32 h-full opacity-90 pointer-events-none -mt-4 -mr-2">
            <Image
              src="/prof.png" //
              alt="Professor Ilustração"
              width={128} // Defina largura e altura explícitas
              height={128}
              className="object-contain object-right-bottom select-none"
            />
          </div>
          <div className="absolute top-[-10px] left-4 bg-white text-teal-700 px-3 py-1 rounded-full text-xs font-semibold shadow-md transform -rotate-6">
            Tarefa concluída!
          </div>
        </>
      )}
    </div>
  );
}