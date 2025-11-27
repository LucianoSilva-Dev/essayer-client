"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MinhaTarefaAtiva } from "@/apiCalls/tarefas/types";
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

  // --- Estado de Carregamento ---
  if (loading) {
    return <div className="h-[280px] w-full bg-gray-200 rounded-[40px] animate-pulse" />;
  }

  // --- Estado Vazio ou Erro ---
  if (error || !tarefas || tarefas.length === 0) {
    return (
        <div className="h-[280px] w-full bg-white rounded-[40px] border border-dashed border-gray-300 flex items-center justify-center text-gray-400">
            Nenhuma tarefa ativa no momento.
        </div>
    );
  }

  // --- Lógica de Navegação ---
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? tarefas.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === tarefas.length - 1 ? 0 : prev + 1));
  };

  const tarefaAtual = tarefas[currentIndex];
  
  // Próxima tarefa para o efeito visual de "baralho" no fundo
  const proximaTarefa = tarefas.length > 1 
    ? tarefas[(currentIndex + 1) % tarefas.length] 
    : null;

  // Formatador de Data seguro
  const formatDate = (dateString?: string | null) => {
    if (!dateString) return "Sem prazo";
    return format(new Date(dateString), "d, MMMM yyyy", { locale: ptBR });
  };

  return (
    <div className="w-full py-2 flex flex-col gap-2">
      <h3 className="text-lg font-bold text-[#666] ml-2">Tarefas ativas</h3>
      
      <div className="relative flex items-center justify-center w-full h-[300px]">
        
        {/* === Botão Esquerda === */}
        <button 
            onClick={handlePrev} 
            className="absolute left-[-20px] z-30 p-2 hover:bg-gray-100 rounded-full transition-colors hidden md:block"
            disabled={tarefas.length <= 1}
        >
            <ChevronLeft />
        </button>

        {/* === Container do Baralho === */}
        <div className="relative w-full h-full max-w-[650px] mx-auto perspective-1000">
            
            {/* 1. CARD DE FUNDO (Fantasma) */}
            {proximaTarefa && (
                <div 
                    className="absolute top-0 right-[-15px] w-full h-full bg-white rounded-[40px] shadow-sm border border-gray-100 z-0 transform scale-[0.95] translate-x-4 opacity-60 pointer-events-none"
                    aria-hidden="true"
                >
                    {/* Sombra suave para dar volume */}
                    <div className="absolute bottom-0 right-0 h-[150px] w-[60%] bg-gradient-to-tl from-[#075F70]/20 to-transparent rounded-br-[40px] rounded-tl-[100px]" />
                </div>
            )}

            {/* 2. CARD PRINCIPAL (Frente) */}
            <div className="absolute top-0 left-0 w-full h-full bg-white rounded-[40px] shadow-[0_8px_30px_rgba(0,0,0,0.08)] z-10 overflow-hidden border border-gray-50 relative">
                
                {/* --- Conteúdo de Texto (Esquerda) --- */}
                <div className="p-8 pb-0 flex flex-col gap-1 relative z-20 max-w-[55%] h-full justify-between">
                    <div>
                        <h2 className="font-montserrat font-bold text-[#666] text-xl">
                            {tarefaAtual.turma.nome}
                        </h2>
                        
                        <div className="mt-4 flex flex-col gap-1">
                            <span className="font-montserrat font-bold text-[#3C3C3C] text-sm uppercase tracking-wide">
                                {tarefaAtual.tipoAtividade}
                            </span>
                            <h1 className="font-montserrat font-medium text-[#3C3C3C] text-[22px] leading-tight line-clamp-3">
                                {tarefaAtual.titulo}
                            </h1>
                        </div>
                    </div>

                    <div className="pb-8">
                        <p className="font-montserrat font-semibold text-[#3C3C3C] text-sm">
                            Fecha em <span className="text-gray-600">{formatDate(tarefaAtual.dataLimite)}</span>
                        </p>
                    </div>
                </div>

                {/* --- Imagem de Fundo (Onda + Alunos) --- */}
                <div className="absolute bottom-0 right-0 w-[60%] h-full pointer-events-none z-10">
                     <Image
                        src="/ilustracao-tarefa-completa.png" 
                        alt="Ilustração da tarefa"
                        fill
                        // Usa object-contain para não cortar e object-right-bottom para alinhar no canto
                        className="object-contain object-[bottom_right]"
                        priority
                     />
                </div>

                {/* --- Botão Iniciar (Posicionado Absolutamente) --- */}
                {/* Ajuste o 'right-[xxx]' se o botão ficar em cima dos alunos, depende da largura da imagem */}
                <div className="absolute bottom-[35px] right-[200px] z-30 pointer-events-auto font-montserrat">
                    <Link 
                        href={`/fazer_tarefa/${tarefaAtual.id}`}
                        className="bg-[#E5EFF0] hover:bg-white text-[#075F70] font-bold py-2.5 px-6 rounded-full transition-all duration-300 text-sm flex items-center gap-2 transform hover:scale-105 shadow-sm whitespace-nowrap"
                    >
                        Iniciar tarefa
                    </Link>
                </div>

            </div>
        </div>

        {/* === Botão Direita === */}
        <button 
            onClick={handleNext} 
            className="absolute right-[-20px] z-30 p-2 hover:bg-gray-100 rounded-full transition-colors hidden md:block"
            disabled={tarefas.length <= 1}
        >
            <ChevronRight />
        </button>

      </div>
    </div>
  );
}