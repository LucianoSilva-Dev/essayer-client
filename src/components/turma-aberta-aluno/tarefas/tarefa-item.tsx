import React from "react";
import Image from "next/image";
import { AtividadeBasica } from "@/apiCalls/turma/types";
import { useRouter } from "next/navigation";

export default function TarefaItem({ tarefa }: { tarefa: AtividadeBasica}) {
  const router = useRouter();
  const dataFormatada = tarefa.dataLimite
    ? new Date(tarefa.dataLimite).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "Sem prazo";

  const isConcluida = tarefa.status?.toLowerCase() === 'concluída';
  const isEncerrada = tarefa.status?.toLowerCase() === 'encerrada';
  const isPendente =  tarefa.status?.toLowerCase() === 'pendente' || !tarefa.status;

  const getStatusClasses = () => {
    if (isConcluida) return "text-green-600 font-medium";
    if (isEncerrada) return "text-red-600 font-medium";
    return "text-gray-500 font-medium";
  };

  const getContainerClasses = () => {
    if (isConcluida) return "bg-teal-700 text-white shadow-lg border-teal-800";
    return "bg-white text-gray-800 border border-gray-200 hover:shadow-md";
  };

  return (
    <div
      className={`relative rounded-lg overflow-hidden transition shadow-sm ${getContainerClasses()} p-4`}
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">

        <div className="flex-1 min-w-0 text-left w-full sm:w-auto">
          <h3 className={`font-semibold text-base leading-tight ${isConcluida ? "text-white" : "text-gray-900"}`}>
            {tarefa.titulo}
          </h3>
          {tarefa.descricao && (
            <p className={`text-sm mt-1 truncate ${isConcluida ? "text-gray-100/90" : "text-gray-500"}`}>
              {tarefa.descricao}
            </p>
          )}
        </div>

        <div className="flex-shrink-0 text-center sm:text-left w-full sm:w-auto sm:min-w-[100px]">
          <span className={`text-xs ${isConcluida ? "text-gray-200" : "text-gray-400"}`}>Fechou em</span>
          <br />
          <span className={`text-sm ${isConcluida ? "text-white" : "text-gray-700"}`}>{dataFormatada}</span>
        </div>

        <div className="flex-shrink-0 text-right w-full sm:w-auto sm:min-w-[100px] flex flex-col items-end">
          <span className={`text-xs ${isConcluida ? "text-gray-200" : "text-gray-400"}`}>Status</span>
          <br />
          <span className={`text-sm -mt-1 ${getStatusClasses()}`}>{tarefa.status || 'Pendente'}</span>

          {isPendente && (
             <button onClick={() => router.push(`/fazer_tarefa/${tarefa.id}`)} className="mt-2 px-3 py-1 border border-gray-300 text-gray-700 text-xs font-medium rounded-md hover:bg-gray-50 transition">
               Ver tarefa
             </button>
           )}
           {isConcluida && (
              <button className="mt-2 px-3 py-1 bg-white text-teal-700 text-xs font-medium rounded-md hover:bg-gray-100 transition">
                Ver correção
              </button>
           )}
        </div>
      </div>

       {isConcluida && (
        <>
          <div className="absolute top-0 right-0 w-32 h-full opacity-90 pointer-events-none -mt-4 -mr-2">
            <Image
              src="/prof.png"
              alt="Professor Ilustração"
              width={128}
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