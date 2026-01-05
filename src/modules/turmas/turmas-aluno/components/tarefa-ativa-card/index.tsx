"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MinhaTarefaAtiva } from "@/lib/apiCalls/tarefas/types";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// --- Ícones de Seta ---
const ChevronLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-8 h-8 text-[#075F70]">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

const ChevronRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-8 h-8 text-[#075F70]">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);

interface TarefasAtivasListProps {
  tarefas: MinhaTarefaAtiva[] | undefined;
  loading: boolean;
  error?: any;
}

export function TarefasAtivasList({ tarefas, loading, error }: TarefasAtivasListProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (loading) {
    return <div className="h-[280px] w-full bg-gray-200 rounded-[40px] animate-pulse" />;
  }

  if (error || !tarefas || tarefas.length === 0) {
    return (
        <div className="h-[280px] w-full bg-white rounded-[40px] border border-dashed border-gray-300 flex items-center justify-center text-gray-400">
            Nenhuma tarefa ativa no momento.
        </div>
    );
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? tarefas.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === tarefas.length - 1 ? 0 : prev + 1));
  };

  const tarefaAtual = tarefas[currentIndex];
  
  const proximaTarefa = tarefas.length > 1 
    ? tarefas[(currentIndex + 1) % tarefas.length] 
    : null;

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return "Sem prazo";
    return format(new Date(dateString), "d, MMMM yyyy", { locale: ptBR });
  };

  return (
    <div className="w-full py-2 flex flex-col gap-2">
      <h3 className="text-lg font-bold text-[#666] ml-2">Tarefas ativas</h3>
      
      {/* RESPONSIVIDADE:
         - h-[300px] fixo -> min-h-[300px] para crescer se precisar.
         - Flex container principal.
      */}
      <div className="relative flex items-center justify-center w-full min-h-[300px]">
        
        {/* Botões de Navegação (Hidden no mobile para não sobrepor) */}
        <button 
            onClick={handlePrev} 
            className="absolute left-[-15px] xl:left-[-25px] z-30 p-2 hover:bg-gray-100 rounded-full transition-colors hidden md:block"
            disabled={tarefas.length <= 1}
        >
            <ChevronLeft />
        </button>

        {/* === Container do Baralho === */}
        <div className="relative w-full h-full md:max-w-[95%] lg:max-w-[650px] mx-auto perspective-1000">
            
            {/* 1. CARD DE FUNDO (Fantasma) */}
            {proximaTarefa && (
                <div 
                    className="absolute top-0 right-[-10px] md:right-[-15px] w-full h-full bg-white rounded-[40px] shadow-sm border border-gray-100 z-0 transform scale-[0.95] translate-x-2 md:translate-x-4 opacity-60 pointer-events-none"
                    aria-hidden="true"
                >
                    <div className="absolute bottom-0 right-0 h-[150px] w-[60%] bg-gradient-to-tl from-[#075F70]/20 to-transparent rounded-br-[40px] rounded-tl-[100px]" />
                </div>
            )}

            {/* 2. CARD PRINCIPAL (Frente) */}
            <div className="relative w-full min-h-[300px] h-full bg-white rounded-[40px] shadow-[0_8px_30px_rgba(0,0,0,0.08)] z-10 overflow-hidden border border-gray-50 flex flex-col justify-between">
                
                {/* --- Conteúdo de Texto --- */}
                {/* Ajustado: w-full no mobile, md:max-w-[55%] no desktop */}
                <div className="p-6 md:p-8 flex flex-col gap-2 relative z-20 w-full md:max-w-[55%] h-full justify-between">
                    <div>
                        <h2 className="font-montserrat font-bold text-[#666] text-lg md:text-xl">
                            {tarefaAtual.turma.nome}
                        </h2>
                        
                        <div className="mt-2 md:mt-4 flex flex-col gap-1">
                            <span className="font-montserrat font-bold text-[#3C3C3C] text-xs md:text-sm uppercase tracking-wide">
                                {tarefaAtual.tipoAtividade}
                            </span>
                            <h1 className="font-montserrat font-medium text-[#3C3C3C] text-xl md:text-[22px] leading-tight line-clamp-3">
                                {tarefaAtual.titulo}
                            </h1>
                        </div>
                    </div>

                    <div className="pt-4 md:pb-8">
                        <p className="font-montserrat font-semibold text-[#3C3C3C] text-xs md:text-sm">
                            Fecha em <span className="text-gray-600">{formatDate(tarefaAtual.dataLimite)}</span>
                        </p>
                    </div>

                    {/* Botão para Mobile (aparece aqui no fluxo normal) */}
                    <div className="md:hidden mt-4">
                        <Link 
                            href={`/fazer-tarefa/${tarefaAtual.id}`}
                            className="bg-[#E5EFF0] hover:bg-gray-100 text-[#075F70] font-bold py-3 px-6 rounded-full transition-all duration-300 text-sm flex items-center justify-center gap-2 shadow-sm w-full"
                        >
                            Iniciar tarefa
                        </Link>
                    </div>
                </div>

                {/* --- Imagem de Fundo (Onda + Alunos) --- */}
                {/* No mobile, opacidade reduzida ou atrás do texto. No desktop, lado direito. */}
                <div className="absolute bottom-0 right-0 w-[80%] md:w-[60%] h-full pointer-events-none z-10 opacity-30 md:opacity-100">
                     <Image
                        src="/images/ilustracao-tarefa-completa.png" 
                        alt="Ilustração da tarefa"
                        fill
                        className="object-contain object-bottom md:object-[bottom_right]"
                        priority
                     />
                </div>

                {/* --- Botão Iniciar (Desktop: Posicionado Absolutamente) --- */}
                {/* Hidden no mobile (usamos o do fluxo acima), block no md */}
                <div className="hidden md:block absolute bottom-[35px] right-[40%] lg:right-[200px] z-30 pointer-events-auto font-montserrat">
                    <Link 
                        href={`/fazer-tarefa/${tarefaAtual.id}`}
                        className="bg-[#E5EFF0] hover:bg-white text-[#075F70] font-bold py-2.5 px-6 rounded-full transition-all duration-300 text-sm flex items-center gap-2 transform hover:scale-105 shadow-sm whitespace-nowrap"
                    >
                        Iniciar tarefa
                    </Link>
                </div>

            </div>
        </div>

        <button 
            onClick={handleNext} 
            className="absolute right-[-15px] xl:right-[-25px] z-30 p-2 hover:bg-gray-100 rounded-full transition-colors hidden md:block"
            disabled={tarefas.length <= 1}
        >
            <ChevronRight />
        </button>

      </div>
    </div>
  );
}
