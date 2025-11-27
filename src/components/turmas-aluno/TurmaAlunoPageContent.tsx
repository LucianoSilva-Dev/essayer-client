"use client";

import { useTurmasAluno } from "@/hooks/useTurmasAluno";
import { useMinhasTarefasAtivas } from "@/hooks/useMinhasTarefasAtivas";

import ListaTurmasAluno from "./ListaTurmas"; 
import EntrarTurmaCard, { EntrarTurmaSkeleton } from "./EntrarTurmaCard"; 
import { TarefasAtivasList } from "./TarefaAtivaList";

export default function TurmasAlunoPageContent() {
  
  const { turmas, loading: loadingTurmas } = useTurmasAluno();
  const { tarefas, loading: loadingTarefas, error: errorTarefas } = useMinhasTarefasAtivas();

  const isLoadingRightSection = loadingTarefas; 

  return (
    <main className="flex-1 bg-gray-50 p-8 min-h-screen overflow-x-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-8 max-w-[1200px] mx-auto items-start">
        
        {/* === Coluna da Esquerda === */}
        {/* CORREÇÃO AQUI: Mudei de z-50 para z-20. */}
        {/* z-20 ganha do z-10 da direita (para o menu funcionar), mas perde para a Sidebar (que costuma ser z-30/40/50) */}
        <section className="bg-transparent relative z-20">
          {!loadingTurmas && (!turmas || turmas.length === 0) ? (
            <div className="bg-white p-8 rounded-[30px] shadow-sm text-center border border-dashed border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Você ainda não está em nenhuma turma
              </h3>
              <p className="text-gray-600 text-sm">
                Use o card ao lado para entrar em uma turma.
              </p>
            </div>
          ) : (
            <ListaTurmasAluno
              turmas={turmas}
              loading={loadingTurmas}
              baseUrl="/turma_aberta_aluno"
              titulo="Minhas turmas"
            />
          )}
        </section>

        {/* === Coluna da Direita === */}
        {/* Mantive z-10 */}
        <aside className="flex flex-col gap-8 w-full relative z-10">

          <TarefasAtivasList
            tarefas={tarefas}
            loading={loadingTarefas}
            error={errorTarefas}
          />

          {isLoadingRightSection ? (
             <EntrarTurmaSkeleton />
          ) : (
             <EntrarTurmaCard />
          )}

        </aside>
      </div>
    </main>
  );
}