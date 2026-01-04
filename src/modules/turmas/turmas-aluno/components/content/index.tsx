"use client";

import { useTurmasAluno } from "@/shared/hooks/useTurmasAluno";
import { useMinhasTarefasAtivas } from "@/shared/hooks/useMinhasTarefasAtivas";

import ListaTurmasAluno from "../turma-lista"; 
import EntrarTurmaCard, { EntrarTurmaSkeleton } from "../entrar-turma-card"; 
import { TarefasAtivasList } from "../tarefa-ativa-list";

export default function TurmasAlunoPageContent() {
  
  const { turmas, loading: loadingTurmas } = useTurmasAluno();
  const { tarefas, loading: loadingTarefas, error: errorTarefas } = useMinhasTarefasAtivas();

  const isLoadingRightSection = loadingTarefas; 

  return (
    <main className="flex-1 bg-gray-50 p-4 md:p-8 min-h-screen overflow-x-hidden">
      {/* ALTERAÇÃO DE GRID:
         - Mobile: 1 coluna
         - Desktop (lg): 3 colunas (1 para lista, 2 para o conteúdo principal)
         Isso remove a largura fixa de 400px e usa proporções.
      */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto items-start">
        
        {/* === Coluna da Esquerda (Lista de Turmas) === */}
        {/* Ocupa 1 coluna no grid de 3 */}
        <section className="bg-transparent relative z-20 lg:col-span-1 w-full">
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

        {/* === Coluna da Direita (Tarefas + Entrar) === */}
        {/* Ocupa 2 colunas no grid de 3 */}
        <aside className="flex flex-col gap-6 md:gap-8 w-full relative z-10 lg:col-span-2">

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
