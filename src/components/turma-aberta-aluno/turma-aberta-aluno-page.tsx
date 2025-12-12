"use client";

import React from "react";
import { useTurmaAbertaAluno } from "@/hooks/useTurmaAbertaAluno";
import TarefaList from "@/components/turma-aberta-aluno/tarefas/tarefa-list";
import CorrecaoList from "@/components/turma-aberta-aluno/correcoes/correcao-list";
import IntegranteList from "@/components/turma-aberta-aluno/comunidade/integrante-list";
import DateSelector from "@/components/turma-aberta-prof/ui/date-selector";
import EntrarTurmaCardForm from "./entrar-button/entrar-turma-card";
import { 
  AlertCircle, 
  CalendarDays,
  Users,
  Layout,
  History,
  MessageSquare,
  Coffee
} from "lucide-react";

export default function TurmaAbertaAlunoPage({ turmaId }: { turmaId: string }) {
  const { turma, tarefas, correcoes, loading, error } = useTurmaAbertaAluno(turmaId);

  const professor = turma?.membros?.find(m => m.id === turma?.criador?.id);
  const alunos = turma?.membros?.filter(m => m.id !== turma?.criador?.id) ?? [];
  const totalMembros = turma?.membros?.length ?? 0;

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[80vh] bg-[#FAFAFA]">
        <div className="animate-bounce mb-4">
           {/* Loader em azul para manter consistência */}
           <div className="w-8 h-8 rounded-full border-4 border-custom-blue border-t-transparent animate-spin"></div>
        </div>
        <p className="text-sm font-medium text-gray-400 font-montserrat tracking-wide">Carregando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[80vh] bg-[#FAFAFA] text-gray-600">
        <AlertCircle className="w-10 h-10 mb-3 text-red-400 opacity-80" />
        <p className="font-medium">Turma indisponível.</p>
      </div>
    );
  }

  if (!turma) {
    return <EntrarTurmaCardForm turmaId={turmaId} />;
  }

  // --- LÓGICA DE FILTRO SIMPLIFICADA ---
  const tarefasPendentes = tarefas.filter(t => 
      t.status?.toLowerCase() !== 'concluída' && 
      t.status?.toLowerCase() !== 'encerrada'
  );

  const historicoTarefas = tarefas.filter(t => !tarefasPendentes.includes(t));

  return (
    <div className="min-h-screen bg-[#FAFAFA] p-6 lg:p-12 font-opensans text-gray-800">
      <div className="max-w-7xl mx-auto">
        
        {/* Grid Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* COLUNA ESQUERDA (Conteúdo Principal) */}
          <main className="lg:col-span-8 space-y-6 order-2 lg:order-1">
            
            {/* 1. Em andamento */}
            <section>
                <div className="flex items-center justify-between mb-4 px-1">
                    <h2 className="text-lg font-bold text-gray-800 font-montserrat flex items-center gap-2">
                        <Layout className="w-5 h-5 text-custom-blue" />
                        Em andamento
                    </h2>
                </div>

                {/* Lista de Pendências ou Estado Vazio "Clean" */}
                <div className="space-y-4">
                   {tarefasPendentes.length > 0 ? (
                      <TarefaList tarefas={tarefasPendentes} />
                   ) : (
                      // --- AQUI ESTÁ A CORREÇÃO DO CARD VAZIO ---
                      <div className="bg-white rounded-3xl p-8 text-center border border-dashed border-gray-200 flex flex-col items-center justify-center min-h-[160px]">
                          <div className="p-3 bg-gray-50 rounded-full mb-3 text-gray-400">
                             <Coffee className="w-6 h-6" />
                          </div>
                          <p className="text-gray-500 font-medium text-sm">
                            Tudo em dia! Aproveite sua pausa.
                          </p>
                      </div>
                      // ------------------------------------------
                   )}
                </div>
            </section>
            
            {/* 2. Seção Inferior: Histórico e Devolutivas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-gray-100 pt-6">
                
                {/* Linha do Tempo */}
                <section>
                   <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-gray-100 rounded-lg text-gray-500">
                        <History className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-800 font-montserrat">Linha do Tempo</h3>
                   </div>
                   
                   <div className="relative pl-2">
                      <TarefaList tarefas={historicoTarefas} isHistoryView={true} />
                   </div>
                </section>

                {/* Devolutivas */}
                <section>
                   <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-blue-50 rounded-lg text-custom-blue">
                        <MessageSquare className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-800 font-montserrat">Devolutivas</h3>
                   </div>
                   <div className="bg-white rounded-3xl border border-gray-100 p-2 shadow-sm h-fit">
                      <CorrecaoList correcoes={correcoes} loading={loading} error={error} />
                   </div>
                </section>

            </div>
          </main>

          {/* COLUNA DIREITA (Sidebar) */}
          <aside className="lg:col-span-4 space-y-6 order-1 lg:order-2 lg:sticky lg:top-8">
            
            {/* 1. Calendário */}
            <div className="bg-white rounded-[20px] shadow-[0_2px_20px_-5px_rgba(0,0,0,0.05)] border border-gray-50 p-6">
                <div className="flex items-center justify-between mb-4">
                     <div className="flex items-center gap-2 text-gray-700">
                        <CalendarDays className="w-4 h-4 text-custom-blue" />
                        <span className="font-bold text-sm font-montserrat">Semana Atual</span>
                     </div>
                     <span className="text-[10px] uppercase font-bold text-gray-400 bg-gray-50 px-2 py-0.5 rounded-md">
                        {new Date().toLocaleString('pt-BR', { month: 'long' })}
                     </span>
                </div>
                <div className="w-full">
                    <DateSelector deliveryDate={undefined} />
                </div>
            </div>

            {/* 2. Participantes */}
            <div className="bg-white rounded-[20px] shadow-[0_2px_20px_-5px_rgba(0,0,0,0.05)] border border-gray-50 overflow-hidden">
                <div className="p-5 border-b border-gray-50 bg-gray-50/30 flex items-center justify-between">
                    <h3 className="font-bold text-gray-800 text-sm flex items-center gap-2 font-montserrat">
                        <Users className="w-4 h-4 text-custom-blue" />
                        Participantes
                    </h3>
                    <span className="text-[10px] font-bold bg-custom-blue/10 text-custom-blue px-2.5 py-1 rounded-full">
                        {totalMembros}
                    </span>
                </div>
                <div className="p-4 max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-100">
                    <IntegranteList
                       professor={professor}
                       alunos={alunos}
                       totalAlunos={totalMembros}
                    />
                </div>
            </div>

          </aside>

        </div>
      </div>
    </div>
  );
}