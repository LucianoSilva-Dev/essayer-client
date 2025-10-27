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
    <main className="flex-1 space-y-8 overflow-y-auto bg-[#F1F1F2] p-8">
      
      {/* Container do Grid (Main Col + Side Col) */}
      <div className="grid grid-cols-[1fr_400px] gap-8">
        
        {/* === Coluna Principal (Esquerda) === */}
        <section className="space-y-4">

          {/* REQUISITO 1: Carrossel de Turmas do Aluno */}
      <ListaTurmasAluno
        turmas={turmas}
        loading={loadingTurmas}
        baseUrl="/turma_aberta_aluno" // Rota do Aluno
        titulo="Minhas Turmas"
      />
          
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
