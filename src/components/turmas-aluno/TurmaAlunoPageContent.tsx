"use client";

// --- Hooks ---
import { useTurmasAluno } from "@/hooks/useTurmasAluno";
import { useMinhasTarefasAtivas } from "@/hooks/useMinhasTarefasAtivas";

// --- Componentes ---
// O Carrossel (agora refatorado para aceitar props)
import ListaTurmasAluno from "./ListaTurmas"; 
// O Card de Entrar Turma (reutilizado)
import EntrarTurmaCard from "@/components/turmas-professor/EntrarTurmaCard"; 
// O Carrossel de Tarefas (que fizemos antes)
import { TarefasAtivasList } from "./TarefaAtivaList";

/**
 * Componente principal que organiza o layout da página /turmas_aluno.
 * Utiliza o mesmo layout de grid da página /turmas_professor.
 */
export default function TurmasAlunoPageContent() {
  
  // 1. Hook para buscar as turmas do aluno (para o carrossel)
  const { 
    turmas, 
    loading: loadingTurmas 
  } = useTurmasAluno();
  
  // 2. Hook para buscar as tarefas ativas do aluno
  const { 
    tarefas, 
    loading: loadingTarefas, 
    error: errorTarefas 
  } = useMinhasTarefasAtivas();

  return (
    <main className="flex-1 space-y-8 overflow-y-auto bg-gray-50 p-8 h-[89vh]">
      <div className="grid grid-cols-[1fr_400px] gap-8">
        <section className="space-y-4">
          {/* REQUISITO 1: Carrossel de Turmas do Aluno */}
          {!loadingTurmas && (!turmas || turmas.length === 0) ? (
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Você ainda não está em nenhuma turma
              </h3>
              <p className="text-gray-600">
                Use o card ao lado para entrar em uma turma usando um código de acesso
              </p>
            </div>
          ) : (
            <ListaTurmasAluno
              turmas={turmas}
              loading={loadingTurmas}
              baseUrl="/turma_aberta_aluno"
              titulo="Minhas Turmas"
            />
          )}
        </section>

        {/* === Coluna Lateral (Direita) === */}
        <aside className="space-y-8">

          {/* REQUISITO 3: Carrossel de Tarefas Ativas */}
          <TarefasAtivasList
            tarefas={tarefas}
            loading={loadingTarefas}
            error={errorTarefas}
          />

          {/* REQUISITO 2: Card para Entrar em Turma */}
          <EntrarTurmaCard />

        </aside>
      </div>
    </main>
  );
}
