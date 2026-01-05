"use client";

import { useState, useEffect } from "react";
import { Montserrat } from "next/font/google";
import { ArrowLeft } from "lucide-react";

// Imports dos Componentes
import { TurmaHeaderSelector } from "../header";
import { TarefaFilters } from "../tarefas-filter";
import { TarefaGrid } from "../tarefas-grid";
import { StudentDrawer } from "../drawer";
import { CentralCorrecoesSkeleton } from "../skeletons";

// Tipos
import {
  TarefaMock,
  StatusTarefa,
} from "../../../../types/centralCorrecaoTarefa";
import { getAtividadesCriador, getTurmasCriadas } from "@/lib/apiCalls/turma";
import {
  AtividadeProfessor,
  TurmaCriadaProfessor,
} from "@/lib/apiCalls/turma/types";
import { useRouter } from "next/navigation";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export function CentralCorrecoesPage() {
  const router = useRouter();

  // --- ESTADOS ---
  const [isLoading, setIsLoading] = useState(true); // Estado de Carregamento
  const [turmas, setTurmas] = useState<TurmaCriadaProfessor[]>([]);
  const [atividades, setAtividades] = useState<
    AtividadeProfessor[] | undefined
  >([]);

  const [selectedTurma, setSelectedTurma] = useState<
    TurmaCriadaProfessor | undefined
  >(turmas[0]);
  const [selectedTarefaId, setSelectedTarefaId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<StatusTarefa>("ativa");
  const [searchTerm, setSearchTerm] = useState("");

  // --- EFEITO DE CARREGAMENTO (SIMULAÇÃO) ---

  useEffect(() => {
    (async () => {
      const response = await getTurmasCriadas();
      setTurmas(response.documentos);
      setSelectedTurma(response.documentos[0]);

      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (!selectedTurma) return;

    (async () => {
      const response = await getAtividadesCriador(
        selectedTurma?.id,
        searchTerm
      );
      setAtividades(response);
    })();
  }, [selectedTurma, searchTerm]);

  const filteredAtividades = atividades?.filter((tarefa) => {
    const status =
      new Date(tarefa.dataLimite || "") < new Date() ? "encerrada" : "ativa";

    return status === statusFilter;
  });

  const handleTurmaChange = (turma: TurmaCriadaProfessor) => {
    // Opcional: Você poderia ativar o loading novamente ao trocar de turma
    // setIsLoading(true); setTimeout(() => setIsLoading(false), 1000);
    setSelectedTurma(turma);
    setSelectedTarefaId(null);
  };

  // --- RENDERIZAÇÃO CONDICIONAL ---

  // 1. Estado de Loading: Mostra o Skeleton
  if (isLoading) {
    return (
      <div
        className={`min-h-screen bg-[#FAFAFA] flex flex-col ${montserrat.className}`}
      >
        <main className="flex-1 p-6 md:p-8 pt-8 max-w-[1600px] mx-auto w-full">
          <CentralCorrecoesSkeleton />
        </main>
      </div>
    );
  }

  // 2. Estado Pronto: Mostra a UI Real
  return (
    <div
      className={`min-h-screen bg-[#FAFAFA] flex flex-col ${montserrat.className}`}
    >
      <main className="flex-1 p-6 md:p-8 pt-8 max-w-[1600px] mx-auto w-full">
        {/* NAVEGAÇÃO DE TOPO */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-gray-700 transition-colors group mb-4"
          >
            <ArrowLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Voltar para Turmas
          </button>

          {/* TÍTULO INTEGRADO */}
          <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-3">
            <h1 className="text-xl md:text-2xl font-medium text-gray-400">
              Central de Correções <span className="mx-2 text-gray-300">/</span>
            </h1>

              <TurmaHeaderSelector
                turmas={turmas}
                selected={selectedTurma}
                onSelect={handleTurmaChange}
              />
          </div>

          <p className="text-gray-500 mt-2 text-sm">
            Gerencie as atividades da turma{" "}
            <strong>{selectedTurma?.escola}</strong>
          </p>
        </div>

        {/* Barra de Filtros (Folder Tabs) */}
        <div className="mt-8">
          <TarefaFilters
            activeTab={statusFilter}
            onTabChange={setStatusFilter}
            onSearch={setSearchTerm}
          />
        </div>

        {/* Grid de Tarefas */}
        <TarefaGrid
          tarefas={filteredAtividades}
          onSelectTarefa={setSelectedTarefaId}
        />
      </main>

      {/* DRAWER LATERAL */}
      <StudentDrawer
        isOpen={!!selectedTarefaId}
        onClose={() => setSelectedTarefaId(null)}
        tarefaId={selectedTarefaId}
      />
    </div>
  );
}
