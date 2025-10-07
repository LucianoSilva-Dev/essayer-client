import React from "react";
import Image from "next/image";
import { Tarefa } from "@/types/turma";

export default function TarefaItem({ tarefa }: { tarefa: Tarefa }) {
  const dataFormatada = tarefa.dataLimite
    ? new Date(tarefa.dataLimite).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "—";

  const isConcluida = tarefa.status?.toLowerCase() === "concluida";

  return (
    <div
      className={`relative rounded-2xl overflow-hidden transition shadow-sm border ${
        isConcluida
          ? "bg-teal-700 text-white"
          : "bg-white text-gray-800 border-gray-200 hover:shadow-md"
      }`}
    >
      {/* Conteúdo principal */}
      <div
        className={`flex flex-col md:flex-row items-center justify-between p-5 md:p-6 ${
          isConcluida ? "gap-6" : "gap-3"
        }`}
      >
        <div className="flex-1 min-w-0">
          {isConcluida && (
            <p className="text-sm font-medium mb-1 opacity-90">
              Fechou em {dataFormatada}
            </p>
          )}

          <h3
            className={`font-semibold text-lg ${
              isConcluida ? "text-white" : "text-gray-800"
            }`}
          >
            {tarefa.titulo}
          </h3>

          <p
            className={`text-sm mt-1 truncate ${
              isConcluida ? "text-gray-100/90" : "text-gray-600"
            }`}
          >
            {tarefa.descricao}
          </p>

          {!isConcluida && (
            <p className="text-xs text-gray-400 mt-2">
              Fechou em: {dataFormatada}
            </p>
          )}
        </div>

        {/* Botão */}
        <div className="mt-3 md:mt-0 flex-shrink-0">
          {isConcluida ? (
            <button className="px-4 py-2 bg-white text-teal-700 font-medium rounded-lg hover:bg-gray-100 transition">
              Ver correção
            </button>
          ) : (
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
              Ver tarefa
            </button>
          )}
        </div>
      </div>

      {/* Ilustração para tarefas concluídas */}
      {isConcluida && (
        <>
          <div className="absolute top-0 right-0 w-40 md:w-48 h-full opacity-90">
            <Image
              src="/prof.png"
              alt="Professor"
              fill
              className="object-contain object-right-bottom pointer-events-none select-none"
            />
          </div>

          {/* Selo “Tarefa concluída!” */}
          <div className="absolute top-4 left-4 bg-white text-teal-700 px-3 py-1 rounded-full text-sm font-semibold shadow">
            Tarefa concluída!
          </div>
        </>
      )}
    </div>
  );
}
