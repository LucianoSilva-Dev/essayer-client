"use client";

import TarefaList from "./tarefas/tarefa-list";
import CorrecaoList from "./correcoes/correcao-list";
import IntegranteList from "./integrantes/integrante-list";
import DateSelector from "./ui/date-selector";
interface Props {
  turmaId: string;
}

export default function TurmaAbertaPage({ turmaId }: Props) {
  return (
    <main className="min-h-screen w-full bg-gray-50 px-6 py-8 flex flex-col gap-8">
      {/* ===== Header ===== */}
      <header className="flex flex-wrap justify-between items-center gap-4">
        
      </header>

      {/* ===== Conteúdo principal ===== */}
      <section
        className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 w-full flex-grow"
      >
        {/* Coluna esquerda - Tarefas e Correções */}
        <div className="flex flex-col gap-8">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <TarefaList turmaId={turmaId} />
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Correções da tarefa
            </h2>
            <CorrecaoList turmaId={turmaId} />
          </div>
        </div>

        {/* Coluna direita - Calendário e Integrantes */}
        <div className="flex flex-col gap-8">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Calendário
            </h2>
            <DateSelector deliveryDate={new Date("2025-10-10")} />
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Integrantes
            </h2>
            <IntegranteList turmaId={turmaId} />
          </div>
        </div>
      </section>
    </main>
  );
}
