import React from "react";
import  { useTurmasAluno } from "@/hooks/useTurmasAluno";
import NotificacaoList from "./notificacoes/notificacao-list";
import TarefaList from "./tarefas/tarefa-list";
import CorrecaoList from "./correcoes/correcao-list";
import Link from "next/link";

export default function TurmasAlunoPage() {
  const { turmas, loading } = useTurmasAluno();

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6">
        {/* Left column: list of turmas */}
        <aside className="col-span-4">
          <h2 className="text-xl font-semibold mb-4">Minhas turmas</h2>
          <div className="space-y-3">
            {loading ? (
              <div>Carregando turmas...</div>
            ) : turmas.length === 0 ? (
              <div className="p-4 bg-white rounded shadow">Você não está em nenhuma turma.</div>
            ) : (
              turmas.map((t) => (
                <Link key={t.id} href={`/turma_aberta_aluno/${t.id}`}>
                  <a className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition">
                    <div className="font-medium">{t.nome}</div>
                    <div className="text-sm text-gray-500">{t.criador.nome}</div>
                  </a>
                </Link>
              ))
            )}
          </div>
        </aside>

        {/* Middle: notificações e tarefas ativas */}
        <main className="col-span-5">
          <div className="mb-6">
            <NotificacaoList />
          </div>

          <section className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Tarefas ativas</h3>
            <TarefaList />
          </section>
        </main>

        {/* Right: central de correções */}
        <aside className="col-span-3">
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="font-semibold mb-3">Central de correções</h4>
            <CorrecaoList />
          </div>
        </aside>
      </div>
    </div>
  );
}
