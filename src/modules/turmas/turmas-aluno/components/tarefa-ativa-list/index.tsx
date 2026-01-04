"use client";

import { useState } from "react";
import Link from "next/link";
import { MinhaTarefaAtiva } from "@/lib/apiCalls/tarefas/types";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { motion, AnimatePresence, Variants } from "framer-motion";

// --- Ícones ---
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

// --- Arte Visual CSS ---
const CreativeEssayVisual = () => (
  <div className="relative w-full h-full pointer-events-none select-none">
    <div className="absolute bottom-0 right-0 w-[55%] h-full bg-gradient-to-tl from-[#075F70] via-[#5daab5] to-transparent opacity-90 rounded-tl-[100px] rounded-br-[40px]" />
    <div className="absolute bottom-[-10px] right-[-10px] w-56 h-56 bg-white/10 backdrop-blur-sm rounded-full border border-white/20" />
    <div className="absolute bottom-8 right-12 w-32 h-44 bg-white rounded-xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] transform rotate-[-6deg] transition-transform duration-500 group-hover:rotate-0 group-hover:scale-105 border border-gray-50 flex flex-col p-4 gap-2.5 z-10">
        <div className="w-1/2 h-2 bg-[#075F70]/20 rounded-full mb-1"></div>
        <div className="w-full h-1.5 bg-gray-100 rounded-full"></div>
        <div className="w-full h-1.5 bg-gray-100 rounded-full"></div>
        <div className="w-5/6 h-1.5 bg-gray-100 rounded-full"></div>
        <div className="w-full h-1.5 bg-gray-100 rounded-full"></div>
        <div className="w-4/6 h-1.5 bg-gray-100 rounded-full"></div>
        <div className="mt-auto self-end transform rotate-[-15deg] border-2 border-[#075F70]/30 rounded-full w-10 h-10 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#075F70" className="w-5 h-5 opacity-50">
               <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
        </div>
    </div>
    <div className="absolute bottom-36 right-44 text-white opacity-40 text-5xl font-serif font-bold leading-none animate-pulse">“</div>
    <div className="absolute top-1/2 right-6 w-4 h-4 border-2 border-white/30 rounded-full"></div>
  </div>
);

interface TarefasAtivasListProps {
  tarefas: MinhaTarefaAtiva[] | undefined;
  loading: boolean;
  error?: any;
}

export function TarefasAtivasList({ tarefas, loading, error }: TarefasAtivasListProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

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
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? tarefas.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === tarefas.length - 1 ? 0 : prev + 1));
  };

  const tarefaAtual = tarefas[currentIndex];
  const proximaTarefa = tarefas.length > 1 ? tarefas[(currentIndex + 1) % tarefas.length] : null;

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return "Sem prazo";
    return format(new Date(dateString), "d, MMMM yyyy", { locale: ptBR });
  };

  // --- Variants Tipadas Corretamente ---
  const variants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
      rotate: dir > 0 ? 10 : -10,
      zIndex: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotate: 0,
      zIndex: 10,
      transition: {
        duration: 0.4,
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.8,
      rotate: dir > 0 ? -15 : 15,
      zIndex: 0,
      transition: { duration: 0.3 }
    })
  };

  return (
    <div className="w-full py-2 flex flex-col gap-2">
      <h3 className="text-lg font-bold text-[#666] ml-2">Tarefas ativas</h3>
      
      <div className="relative flex items-center justify-center w-full h-[300px]">
        
        {/* Botão Esquerda */}
        <button 
            onClick={handlePrev} 
            className="absolute left-[-20px] z-30 p-2 hover:bg-gray-100 rounded-full transition-colors hidden md:block"
            disabled={tarefas.length <= 1}
        >
            <ChevronLeft />
        </button>

        {/* Container do Baralho */}
        <div className="relative w-full h-full max-w-[650px] mx-auto perspective-1000">
            
            {proximaTarefa && (
                <>
                    <div className="absolute top-0 right-[-15px] w-full h-full bg-white rounded-[40px] shadow-sm border border-gray-100 z-0 transform scale-[0.95] translate-x-4 opacity-60 pointer-events-none" />
                    <div className="absolute top-0 left-[-15px] w-full h-full bg-white rounded-[40px] shadow-sm border border-gray-100 z-0 transform scale-[0.95] -translate-x-4 opacity-60 pointer-events-none" />
                </>
            )}

            <AnimatePresence initial={false} mode="popLayout" custom={direction}>
                <motion.div
                    key={tarefaAtual.id}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    // CORRIGIDO AQUI: Apenas 'absolute', removi 'relative' e 'group'
                    className="absolute top-0 left-0 w-full h-full bg-white rounded-[40px] shadow-[0_8px_30px_rgba(0,0,0,0.08)] z-10 overflow-hidden border border-gray-50 flex flex-row group"
                >
                    
                    {/* Esquerda */}
                    <div className="p-8 flex flex-col justify-between relative z-20 w-[55%] h-full">
                        <div>
                            <h2 className="font-montserrat font-bold text-[#666] text-xl truncate">
                                {tarefaAtual.turma.nome}
                            </h2>
                            <div className="mt-3 flex flex-col gap-1">
                                <span className="font-montserrat font-bold text-[#3C3C3C] text-[12px] uppercase tracking-wider opacity-70">
                                    {tarefaAtual.tipoAtividade}
                                </span>
                                <h1 className="font-montserrat font-medium text-[#3C3C3C] text-[22px] leading-tight line-clamp-3">
                                    {tarefaAtual.titulo}
                                </h1>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 mt-4">
                            <p className="font-montserrat font-medium text-[#666] text-sm">
                                Fecha em <span className="font-bold text-[#3C3C3C]">{formatDate(tarefaAtual.dataLimite)}</span>
                            </p>
                            
                            <Link 
                                href={`/fazer-tarefa/${tarefaAtual.id}`}
                                className="w-fit bg-[#E5EFF0] hover:bg-[#d6e6e8] text-[#075F70] font-bold py-2.5 px-8 rounded-full transition-all duration-300 text-sm flex items-center gap-2 transform hover:scale-105 shadow-sm border border-[#075F70]/10"
                            >
                                Iniciar tarefa
                            </Link>
                        </div>
                    </div>

                    {/* Direita */}
                    <div className="absolute top-0 right-0 w-full h-full pointer-events-none z-10">
                        <CreativeEssayVisual />
                    </div>

                </motion.div>
            </AnimatePresence>
        </div>

        {/* Botão Direita */}
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