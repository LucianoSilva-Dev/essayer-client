// src/components/turma-aberta-prof/turma-aberta-page.tsx
"use client";

import { useState, useCallback } from "react";
import TarefaList from "./tarefas/tarefa-list";
import ListaEnvios from "./correcoes/correcao-list";
import IntegranteList from "./integrantes/integrante-list";
import DateSelector from "./ui/date-selector";
import CriarTarefaButton from "./tarefas/criar-tarefa-button";
import { SearchBar } from "./ui/search-bar";
import ConvidarEstudante from "./integrantes/convidar-estudante";
import { useTurmaData } from "@/hooks/useTurmaData";
import { AtividadeProfessor } from "@/apiCalls/turma/types";
// import { TurmaHeader } from "./header-Turma-prof/turma-header"; // Assuming you might use this later
import { TurmaInfo } from "./header-Turma-prof/turma-info"; // Make sure this is correctly imported
import { AlertCircle } from "lucide-react";

// **Define the Props interface HERE, before the component function**
interface Props {
  turmaId: string;
}

// Use the defined interface Props
export default function TurmaAbertaPage({ turmaId }: Props) {
  // --- States ---
  // Ensure all states used below are defined here
  const [selectedDeliveryDate, setSelectedDeliveryDate] = useState<Date | undefined>(undefined);
  const [memberSearchTerm, setMemberSearchTerm] = useState("");
  const [selectedAtividadeId, setSelectedAtividadeId] = useState<string | null>(null);
  const [selectedAtividadeTitulo, setSelectedAtividadeTitulo] = useState<string | null>(null);

  // --- Data Fetching ---
  const { turma, alunos, loading, error, refetch } = useTurmaData(turmaId);

  // --- Callbacks ---
  const handleSelectedDateChange = useCallback((date: Date | undefined) => {
    setSelectedDeliveryDate(date);
  }, []);

  const handleSelectedAtividadeChange = useCallback((atividade: AtividadeProfessor | null) => {
    setSelectedAtividadeId(atividade?.id ?? null);
    setSelectedAtividadeTitulo(atividade?.titulo ?? null);
  }, []);

  // --- Render Logic ---
  if (error && !loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] text-gray-600 p-4">
        <AlertCircle className="w-10 h-10 mb-4 text-red-500" />
        <p className="text-lg font-medium text-center mb-2">Erro ao carregar dados da turma</p>
        <p className="text-sm text-center text-gray-500 mb-6">{error}</p>
        <button
            onClick={refetch}
            className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors"
        >
            Tentar Novamente
        </button>
      </div>
    );
  }

  if (loading && !turma) { // Show skeleton/loading only if turma data isn't available yet
     return (
        <main className="min-h-screen w-full bg-gray-50 px-4 sm:px-6 py-8 flex flex-col gap-6 md:gap-8">
            {/* Skeleton do Header */}
            <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow animate-pulse">
                <div className="w-16 h-16 rounded-full bg-gray-200"></div>
                <div className="flex-1 space-y-2">
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div className="w-10 h-10 rounded-md bg-gray-200"></div>
            </div>
             {/* Add more skeleton loaders for other sections if desired */}
        </main>
     );
  }

  // --- JSX ---
  return (
    <main className="min-h-screen w-full bg-gray-50 px-4 sm:px-6 py-8 flex flex-col gap-6 md:gap-8">
      {/* Header da Turma */}
       <div className="bg-white rounded-lg shadow p-4 md:p-6">
           {/* Render TurmaInfo even if loading is finishing, if turma has data */}
           <TurmaInfo turma={turma} />
       </div>

      {/* Grid principal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 flex-grow">

        {/* Coluna Esquerda/Central (Tarefas e Envios) */}
        <div className="lg:col-span-8 flex flex-col gap-6 md:gap-8 order-2 lg:order-1">
          {/* Seção de Tarefas */}
          <section className="bg-white rounded-2xl shadow-md p-4 md:p-6">
            <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 whitespace-nowrap">
                  Tarefas ativas
                </h2>
                <CriarTarefaButton />
              </div>
              {/* <SearchBar placeholder="Pesquisar tarefas..." value={taskSearchTerm} onChange={setTaskSearchTerm} /> */}
            </div>
            {/* TarefaList rendering */}
            <TarefaList
                turmaId={turmaId}
                onSelectedDateChange={handleSelectedDateChange}
                onSelectedAtividadeChange={handleSelectedAtividadeChange}
            />
          </section>

          {/* Seção de Envios */}
          <section className="bg-white rounded-2xl shadow-md p-4 md:p-6">
             <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
                 <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                    {selectedAtividadeTitulo
                        ? `Envios para: ${selectedAtividadeTitulo}`
                        : "Envios da tarefa"}
                    </h2>
             </div>
            {/* ListaEnvios rendering */}
            <ListaEnvios
                turmaId={turmaId}
                selectedAtividadeId={selectedAtividadeId}
            />
          </section>
        </div>

        {/* Coluna Direita (Calendário e Integrantes) */}
        <div className="lg:col-span-4 flex flex-col gap-6 md:gap-8 order-1 lg:order-2">
          {/* Seção Calendário */}
          <section className="bg-white rounded-2xl shadow-md p-4 md:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
              Calendário
            </h2>
            <DateSelector deliveryDate={selectedDeliveryDate} />
          </section>

          {/* Seção Integrantes */}
          <section className="bg-white rounded-2xl shadow-md p-4 md:p-6 flex flex-col flex-grow">
            <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                Integrantes
              </h2>
              <SearchBar
                placeholder="Pesquisar estudante"
                value={memberSearchTerm}
                onChange={setMemberSearchTerm}
              />
            </div>
            <div className="flex-grow mb-4 overflow-y-auto">
                <IntegranteList
                    turmaId={turmaId}
                    alunos={alunos}
                    loading={loading} // Passa o loading do useTurmaData
                    searchTerm={memberSearchTerm}
                    refetch={refetch}
                />
            </div>
            <ConvidarEstudante />
          </section>
        </div>

      </div>
    </main>
  );
}
