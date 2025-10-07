"use client";

import React from "react";
import { useTurmaAbertaAluno } from "@/hooks/useTurmaAbertaAluno";
import TarefaList from "@/components/turma-aberta-aluno/tarefas/tarefa-list";
import CorrecaoList from "@/components/turma-aberta-aluno/correcoes/correcao-list";
import IntegranteList from "@/components/turma-aberta-aluno/comunidade/integrante-list";
import EntrarTurmaCard from "@/components/turma-aberta-aluno/entrar-button/entrar-turma-card";
import { AlertCircle } from "lucide-react";

export default function TurmaAbertaAlunoPage({ turmaId }: { turmaId: string }) {
  const { turma, tarefas, loading, error } = useTurmaAbertaAluno(turmaId);

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
    return <EntrarTurmaCard turmaId={turmaId} />;
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8">
          <div className="bg-white p-6 rounded-2xl shadow mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">{turma?.nome}</h1>
            {turma?.descricao && (
              <p className="text-gray-600 mt-2 leading-relaxed">{turma.descricao}</p>
            )}
          </div>

          <section className="bg-white p-6 rounded-2xl shadow mb-6">
            <h3 className="font-semibold text-lg text-gray-800 mb-4">
              Histórico de tarefas
            </h3>
            <TarefaList tarefas={tarefas} />
          </section>
        </div>

        <aside className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow">
            <h4 className="font-semibold text-gray-800 mb-3">
              Correções disponíveis
            </h4>
            <CorrecaoList turmaId={turmaId} />
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h4 className="font-semibold text-gray-800 mb-3">Comunidade</h4>
            <IntegranteList integrantes={turma?.membros ?? []} />
          </div>
        </aside>
      </div>
    </div>
  );
}
