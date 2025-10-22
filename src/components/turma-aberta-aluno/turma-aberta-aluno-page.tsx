"use client";

import React from "react";
import { useTurmaAbertaAluno } from "@/hooks/useTurmaAbertaAluno";
import TarefaList from "@/components/turma-aberta-aluno/tarefas/tarefa-list";
import CorrecaoList from "@/components/turma-aberta-aluno/correcoes/correcao-list"; //
import IntegranteList from "@/components/turma-aberta-aluno/comunidade/integrante-list";
import DateSelector from "@/components/turma-aberta-prof/ui/date-selector";
import EntrarTurmaCardForm from "./entrar-button/entrar-turma-card";
import EntrarTurmaCard from "../turmas-professor/EntrarTurmaCard";
import { AlertCircle } from "lucide-react";
import TarefaItem from "./tarefas/tarefa-item";

export default function TurmaAbertaAlunoPage({ turmaId }: { turmaId: string }) {
  const { turma, tarefas, correcoes, loading, error } = useTurmaAbertaAluno(turmaId); //

  const professor = turma?.membros?.find(m => m.id === turma?.criador?.id);
  const alunos = turma?.membros?.filter(m => m.id !== turma?.criador?.id) ?? [];
  const totalMembros = turma?.membros?.length ?? 0;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-gray-500">
        Carregando turma...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] text-gray-600">
        <AlertCircle className="w-6 h-6 mb-2 text-red-500" />
        <p>Erro ao carregar informações da turma.</p>
      </div>
    );
  }

  if (!turma) {
    return <EntrarTurmaCardForm turmaId={turmaId} />;
  }

  const primeiraTarefaConcluida = tarefas.find(t => t.status?.toLowerCase() === 'concluída');
  const outrasTarefas = tarefas.filter(t => t.id !== primeiraTarefaConcluida?.id);

  return (
    <div className="min-h-screen p-6 bg-gray-50 pt-24">
      <div className="max-w-full mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Coluna Central (Histórico de Tarefas) */}
        <div className="col-span-12 md:col-span-6 lg:col-span-5 order-2 md:order-1">
          <div className="bg-white p-5 rounded-lg shadow mb-6">
            <h1 className="text-xl font-semibold text-gray-800">{turma!.nome}</h1>
            {turma!.descricao && (
              <p className="text-sm text-gray-600 mt-1">{turma!.descricao}</p>
            )}
          </div>
          <section>
            <h3 className="font-semibold text-lg text-gray-800 mb-4">
              Histórico de tarefas
            </h3>
             {primeiraTarefaConcluida && (
                 <div className="mb-4">
                    <TarefaItem tarefa={primeiraTarefaConcluida} />
                 </div>
             )}
             <TarefaList tarefas={outrasTarefas} />
          </section>
        </div>

        {/* Coluna Direita 1 (Calendário e Correções) */}
        <aside className="col-span-12 md:col-span-6 lg:col-span-4 order-1 md:order-2 space-y-6">
            <div className="bg-white p-4 rounded-lg shadow">
                <DateSelector deliveryDate={undefined} />
            </div>
            {/* Passa o array 'correcoes', 'loading' e 'error' diretamente */}
           <div className="bg-white p-4 rounded-lg shadow">
             <CorrecaoList correcoes={correcoes} loading={loading} error={error} />
           </div>
        </aside>

        {/* Coluna Direita 2 (Comunidade) */}
        <aside className="col-span-12 md:col-span-12 lg:col-span-3 order-3 md:order-3 space-y-6">
             <div className="bg-white p-4 rounded-lg shadow">
                 <h4 className="font-semibold text-gray-800 mb-3">Comunidade</h4>
                 <IntegranteList
                    professor={professor}
                    alunos={alunos}
                    totalAlunos={totalMembros}
                 />
             </div>
             <div className="mt-4">
               <EntrarTurmaCard className="!scale-100 min-h-[200px]" />
             </div>
        </aside>

      </div>
    </div>
  );
}