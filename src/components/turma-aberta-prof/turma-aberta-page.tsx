"use client";

import React from "react";
import { useTurmaAbertaAluno } from "@/hooks/useTurmaAbertaAluno";
import TarefaList from "@/components/turma-aberta-aluno/tarefas/tarefa-list";
import CorrecaoList from "@/components/turma-aberta-aluno/correcoes/correcao-list";
import IntegranteList from "@/components/turma-aberta-aluno/comunidade/integrante-list";
import DateSelector from "@/components/turma-aberta-prof/ui/date-selector";
import EntrarTurmaCard from "@/components/turmas-professor/EntrarTurmaCard";
import { AlertCircle } from "lucide-react";
import Loading from "@/components/loading";
import TarefaItem from "../turma-aberta-aluno/tarefas/tarefa-item";

export default function TurmaAbertaAlunoPage({ turmaId }: { turmaId: string }) {
  // O hook agora retorna 'correcoes' também
  const { turma, tarefas, correcoes, loading, error } = useTurmaAbertaAluno(turmaId);

  // Separa professor dos alunos para a lista de integrantes
  const professor = turma?.membros?.find(m => m.id === turma?.criador?.id);
  const alunos = turma?.membros?.filter(m => m.id !== turma?.criador?.id) ?? [];
  const totalMembros = turma?.membros?.length ?? 0;

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[calc(100vh-100px)] text-gray-600 p-6">
        <AlertCircle className="w-8 h-8 mb-3 text-red-500" />
        <p className="text-center font-medium mb-2">Erro ao carregar informações da turma.</p>
        <p className="text-center text-sm">{error.message || "Tente novamente mais tarde."}</p>
      </div>
    );
  }

  // Se não houver turma, talvez mostrar um estado específico ou redirecionar
  if (!turma) {
     return (
       <div className="flex flex-col justify-center items-center min-h-[calc(100vh-100px)] text-gray-600 p-6">
           <AlertCircle className="w-8 h-8 mb-3 text-yellow-500" />
           <p className="text-center font-medium">Turma não encontrada ou você não tem acesso.</p>
           {/* Considerar adicionar o EntrarTurmaCard aqui se fizer sentido */}
       </div>
     );
  }

  // Separa a primeira tarefa concluída, se houver
  const primeiraTarefaConcluida = tarefas.find(t => t.status?.toLowerCase() === 'concluída');
  const outrasTarefas = tarefas.filter(t => t.id !== primeiraTarefaConcluida?.id);

  return (
    // Layout principal com padding e fundo
    <div className="min-h-screen p-6 bg-gray-50 pt-24 md:pl-[80px]"> {/* Ajuste de padding para sidebar */}
      {/* Grid responsivo */}
      <div className="max-w-full mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Coluna Central (Histórico de Tarefas) - Ocupa mais espaço */}
        <div className="col-span-12 md:col-span-6 lg:col-span-5 order-2 md:order-1">
          {/* Cabeçalho da Turma */}
          <div className="bg-white p-5 rounded-lg shadow mb-6">
            <h1 className="text-xl font-semibold text-gray-800">{turma.nome}</h1>
            {turma.escola && (
              <p className="text-sm text-gray-600 mt-1">{turma.escola}</p>
            )}
          </div>

          {/* Seção Histórico de Tarefas */}
          <section>
            <h3 className="font-semibold text-lg text-gray-800 mb-4">
              Histórico de tarefas
            </h3>
             {/* Renderiza a tarefa concluída destacada, se existir */}
             {primeiraTarefaConcluida && (
                 <div className="mb-4">
                    <TarefaItem tarefa={primeiraTarefaConcluida} />
                 </div>
             )}
             {/* Renderiza o restante das tarefas */}
             <TarefaList tarefas={outrasTarefas} />
          </section>
        </div>

        {/* Coluna Direita 1 (Calendário e Correções) */}
        <aside className="col-span-12 md:col-span-6 lg:col-span-4 order-1 md:order-2 space-y-6">
            {/* Calendário/DateSelector */}
             <div className="bg-white p-4 rounded-lg shadow">
                <DateSelector deliveryDate={undefined} /> {/* Passar a data relevante se houver */}
            </div>

            {/* Central de Correções */}
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
             {/* Card para Entrar em Nova Turma */}
             <div className="mt-4">
               {/* Usando o EntrarTurmaCard do professor que parece mais com a imagem */}
               <EntrarTurmaCard className="!scale-100 min-h-[200px]" />
             </div>
        </aside>

      </div>
    </div>
  );
}