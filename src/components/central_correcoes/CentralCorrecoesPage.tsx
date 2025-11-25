"use client";

import { useState, useEffect } from "react";
import { Montserrat } from "next/font/google";
import { ArrowLeft } from "lucide-react";

// Imports dos Componentes
import { TurmaHeaderSelector } from "./header/TurmaHeaderSelector";
import { TarefaFilters } from "./tarefas/TarefaFilters";
import { TarefaGrid } from "./tarefas/TarefaGrid";
import { StudentDrawer } from "./drawer/StudentDrawer";
import { CentralCorrecoesSkeleton } from "./skeletons/CentralSkeletons";

// Tipos
import { TurmaMock, TarefaMock, StatusTarefa } from "./types";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

// --- MOCKS DATA ---
const MOCK_TURMAS: TurmaMock[] = [
  { id: "t1", nome: "Redação Intensiva", ano: "3º Ano A" },
  { id: "t2", nome: "Literatura Brasileira", ano: "3º Ano B" },
  { id: "t3", nome: "Gramática Avançada", ano: "2º Ano A" },
];

const MOCK_TAREFAS_ALL: TarefaMock[] = Array.from({ length: 12 }).map((_, i) => ({
  id: `task-${i}`,
  tipo: "Redação",
  titulo: `Os impactos da inteligência artificial no mercado de trabalho`, 
  entregues: i === 0 ? 45 : 20 + i,
  total: 60,
  prazo: "20/05/2025",
  status: i % 3 === 0 ? 'encerrada' : 'ativa',
  tags: [], 
}));

export function CentralCorrecoesPage() {
  // --- ESTADOS ---
  const [isLoading, setIsLoading] = useState(true); // Estado de Carregamento
  
  const [selectedTurma, setSelectedTurma] = useState<TurmaMock>(MOCK_TURMAS[0]);
  const [selectedTarefaId, setSelectedTarefaId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<StatusTarefa>('ativa');
  const [searchTerm, setSearchTerm] = useState("");

  // --- EFEITO DE CARREGAMENTO (SIMULAÇÃO) ---
  useEffect(() => {
    // Simula uma chamada de API de 2 segundos
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Lógica de Filtragem
  const filteredTarefas = MOCK_TAREFAS_ALL.filter(t => {
    const matchesStatus = t.status === statusFilter;
    const matchesSearch = t.titulo.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleTurmaChange = (turma: TurmaMock) => {
    // Opcional: Você poderia ativar o loading novamente ao trocar de turma
    // setIsLoading(true); setTimeout(() => setIsLoading(false), 1000);
    setSelectedTurma(turma);
    setSelectedTarefaId(null);
  };

  // --- RENDERIZAÇÃO CONDICIONAL ---

  // 1. Estado de Loading: Mostra o Skeleton
  if (isLoading) {
    return (
        <div className={`min-h-screen bg-[#FAFAFA] flex flex-col ${montserrat.className}`}>
            <main className="flex-1 p-6 md:p-8 pt-8 max-w-[1600px] mx-auto w-full">
                <CentralCorrecoesSkeleton />
            </main>
        </div>
    );
  }

  // 2. Estado Pronto: Mostra a UI Real
  return (
    <div className={`min-h-screen bg-[#FAFAFA] flex flex-col ${montserrat.className}`}>
      
      <main className="flex-1 p-6 md:p-8 pt-8 max-w-[1600px] mx-auto w-full">
        
        {/* NAVEGAÇÃO DE TOPO */}
        <div className="mb-6">
            <button 
                onClick={() => console.log("Voltar logic")} 
                className="flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-gray-700 transition-colors group mb-4"
            >
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                Voltar para Turmas
            </button>

            {/* TÍTULO INTEGRADO */}
            <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-3">
                <h1 className="text-xl md:text-2xl font-medium text-gray-400">
                    Central de Correções <span className="mx-2 text-gray-300">/</span>
                </h1>
                
                <TurmaHeaderSelector 
                    turmas={MOCK_TURMAS} 
                    selected={selectedTurma} 
                    onSelect={handleTurmaChange} 
                />
            </div>
            
            <p className="text-gray-500 mt-2 text-sm">
                Gerencie as atividades da turma <strong>{selectedTurma.ano}</strong>
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
            tarefas={filteredTarefas} 
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