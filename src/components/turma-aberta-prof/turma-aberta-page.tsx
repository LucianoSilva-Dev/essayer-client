"use client";

import TarefaList from "./tarefas/tarefa-list";
import CorrecaoList from "./correcoes/correcao-list";
import IntegranteList from "./integrantes/integrante-list";
import DateSelector from "./ui/date-selector";

interface Props {
  turmaId: string;
}

export default function TurmaAbertaPage({ turmaId }: Props) {
  console.log("TurmaAbertaPage recebeu turmaId:", turmaId);

  return (
    <main className="relative w-[94vw] h-[100vh] bg-grey-50 gap-8">
      <div className="grid grid-cols-6 grid-rows-5 w-full h-full gap-6">
        {/* Calendário */}
        <div className="col-start-5 col-end-7 row-start-1 row-end-2">
          <DateSelector />
        </div>

        {/* Integrantes */}
        <div className="col-start-5 col-end-7 row-start-2 row-end-6">
          <IntegranteList turmaId={turmaId} />
        </div>

        {/* Tarefas */}
        <div className="col-start-1 col-end-5 row-start-1 row-end-3">
          <TarefaList turmaId={turmaId} />
        </div>

        {/* Correções */}
        <div className="col-start-1 col-end-5 row-start-3 row-end-6">
          <CorrecaoList turmaId={turmaId} />
        </div>
      </div>
    </main>
  );
}
