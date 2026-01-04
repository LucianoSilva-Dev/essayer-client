"use client";

import { useState, useCallback } from "react";
import TarefaList from "../tarefa-list";
import ListaEnvios from "../correcao-list";
import IntegranteList from "../integrante-list";
import DateSelector from "../../ui/date-selector";
import CriarTarefaButton from "../criar-tarefa-btn";
import { SearchBar } from "../../ui/search-bar";
import ConvidarEstudante from "../convidar-estudante";
import SolicitacoesList from "../solicitation-list";
import { useTurmaData } from "@/shared/hooks/useTurmaData";
import { AtividadeProfessor } from "@/lib/apiCalls/turma/types";
import { AlertCircle } from "lucide-react";

interface Props {
  turmaId: string;
}

export default function TurmaAbertaPage({ turmaId }: Props) {
  // --- States ---
  const [selectedDeliveryDate, setSelectedDeliveryDate] = useState<Date | undefined>(undefined);
  const [memberSearchTerm, setMemberSearchTerm] = useState("");
  const [selectedAtividadeId, setSelectedAtividadeId] = useState<string | null>(null);
  const [selectedAtividadeTitulo, setSelectedAtividadeTitulo] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'integrantes' | 'solicitacoes'>('integrantes');

  // --- Data Fetching ---
  const { turma, alunos, pedidos, loading, error, refetch, removePedido, addAluno } = useTurmaData(turmaId);

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

  if (loading && !turma) {
    return (
      <main className="min-h-screen w-full bg-gray-50 px-4 sm:px-6 py-8 flex flex-col gap-6 md:gap-8">
        <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow animate-pulse">
          <div className="w-16 h-16 rounded-full bg-gray-200"></div>
          <div className="flex-1 space-y-2">
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
          <div className="w-10 h-10 rounded-md bg-gray-200"></div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full bg-gray-50 px-4 sm:px-6 py-8 flex flex-col gap-6 md:gap-8">
      {/* Grid principal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 flex-grow">

        {/* Coluna Esquerda/Central */}
        <div className="lg:col-span-8 flex flex-col gap-6 md:gap-8 order-2 lg:order-1">
          <section className="bg-white rounded-2xl shadow-md p-4 md:p-6">
            <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 whitespace-nowrap">
                  Tarefas ativas
                </h2>
                {/* CORREÇÃO AQUI: Usando a prop turmaId em vez de params */}
                <CriarTarefaButton turmaId={turmaId} />
              </div>
            </div>
            
            <TarefaList
              turmaId={turmaId}
              onSelectedDateChange={handleSelectedDateChange}
              onSelectedAtividadeChange={handleSelectedAtividadeChange}
            />
          </section>

          <section className="bg-transparent rounded-2xl p-4 md:p-6">
            <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                {selectedAtividadeTitulo
                  ? `Envios para: ${selectedAtividadeTitulo}`
                  : "Envios da tarefa"}
              </h2>
            </div>
            <ListaEnvios
              turmaId={turmaId}
              selectedAtividadeId={selectedAtividadeId}
            />
          </section>
        </div>

        {/* Coluna Direita */}
        <div className="lg:col-span-4 flex flex-col gap-6 md:gap-8 order-1 lg:order-2">
          <section className="rounded-2xl p-4 md:p-6">
            <DateSelector deliveryDate={selectedDeliveryDate} />
          </section>

          <section className="bg-white rounded-2xl shadow-md p-4 md:p-6 flex flex-col flex-grow">
            <div className="flex flex-wrap justify-between items-center gap-4 mb-4 border-b border-gray-100 pb-2">
              <div className="flex gap-4">
                <button
                  onClick={() => setActiveTab('integrantes')}
                  className={`text-lg sm:text-xl font-semibold transition-colors ${
                    activeTab === 'integrantes'
                      ? 'text-gray-800 border-b-2 border-teal-600'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  Integrantes
                </button>
                <button
                  onClick={() => setActiveTab('solicitacoes')}
                  className={`text-lg sm:text-xl font-semibold transition-colors flex items-center gap-2 ${
                    activeTab === 'solicitacoes'
                      ? 'text-gray-800 border-b-2 border-teal-600'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  Solicitações
                  {pedidos && pedidos.length > 0 && (
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {pedidos.length}
                    </span>
                  )}
                </button>
              </div>
              
              <SearchBar
                placeholder="Pesquisar estudante"
                value={memberSearchTerm}
                onChange={setMemberSearchTerm}
              />
            </div>
            
            <div className="flex-grow mb-4 overflow-y-visible">
              {activeTab === 'integrantes' ? (
                <IntegranteList
                  turmaId={turmaId}
                  alunos={alunos}
                  loading={loading}
                  searchTerm={memberSearchTerm}
                  refetch={refetch}
                />
              ) : (
                <SolicitacoesList
                  turmaId={turmaId}
                  pedidos={pedidos}
                  loading={loading}
                  searchTerm={memberSearchTerm}
                  refetch={refetch}
                  onRemovePedido={removePedido}
                  onAddAluno={addAluno}
                />
              )}
            </div>
            
            <ConvidarEstudante idTurma={turmaId}/>
          </section>
        </div>

      </div>
    </main>
  );
}
