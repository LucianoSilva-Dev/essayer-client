import React from "react";
import { useTurmaAbertaAluno } from "@/hooks/useTurmaAbertaAluno";
import TarefaList from "./tarefas/tarefa-list";
import CorrecaoList from "./correcoes/correcao-list";
import IntegranteList from "./comunidade/integrante-list";

export default function TurmaAbertaAlunoPage({ turmaId }: { turmaId: string }) {
  const { turma, tarefas, loading } = useTurmaAbertaAluno(turmaId);

  if (loading) {
    return <div className="p-6">Carregando turma...</div>;
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6">
        <div className="col-span-8">
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h1 className="text-2xl font-semibold">{turma?.nome}</h1>
            {turma?.descricao && <p className="text-gray-600 mt-2">{turma.descricao}</p>}
          </div>

          <section className="bg-white p-4 rounded-lg shadow mb-6">
            <h3 className="font-semibold mb-3">Histórico de tarefas</h3>
            <TarefaList tarefas={tarefas} />
          </section>

        </div>

        <aside className="col-span-4 space-y-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="font-semibold mb-3">Correções disponíveis</h4>
            <CorrecaoList />
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="font-semibold mb-3">Comunidade</h4>
            <IntegranteList integrantes={turma?. ?? []} />
          </div>
        </aside>
      </div>
    </div>
  );
}
