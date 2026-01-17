"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { TurmaMatriculadaAluno } from "@/lib/apiCalls/turma/types"; 
import { defaultIcon } from "@/shared/constants/icons";
import { getIconPath } from "@/shared/utils";
import NotificationBell from "../../../../../shared/components/notification/NotificationBell"; 

interface ListaTurmasAlunoProps {
  turmas: TurmaMatriculadaAluno[] | undefined;
  loading: boolean;
  baseUrl: string;
  titulo?: string;
}

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-brand-teal-dark">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);

export default function ListaTurmasAluno({ 
  turmas = [], 
  loading, 
  baseUrl, 
  titulo = "Minhas Turmas" 
}: ListaTurmasAlunoProps) {
  
  const limit = 3; 
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [direcao, setDirecao] = useState(1);

  const totalItems = turmas?.length || 0;
  const totalPaginas = Math.ceil(totalItems / limit);
  
  const startIndex = (paginaAtual - 1) * limit;
  const endIndex = startIndex + limit;
  const turmasVisiveis = turmas?.slice(startIndex, endIndex) || [];

  const mudarPagina = (nova: number) => {
    setDirecao(nova > paginaAtual ? 1 : -1);
    setPaginaAtual(nova);
  };

  const renderTurmas = () => {
    if (!turmasVisiveis || turmasVisiveis.length === 0) {
      return (
          <div className="w-full h-32 flex flex-col items-center justify-center text-gray-400 font-montserrat bg-gray-50 rounded-[20px] border border-dashed border-gray-200 p-4 text-center">
              <p className="text-sm mb-2">Você não participa de nenhuma turma.</p>
              <Link href="/entrar_turma" className="text-xs text-brand-teal-dark font-bold hover:underline">
                Entrar em uma turma
              </Link>
          </div>
      );
    }

    return turmasVisiveis.map((turma) => (
      <Link
        key={turma.id}
        href={`${baseUrl}/${turma.id}`}
        className="block mb-3 group w-full"
      >
        <div className="p-3 bg-white border border-gray-100 rounded-[20px] shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:border-brand-teal-dark/30 flex items-center gap-3 relative overflow-hidden w-full">
          <div className="h-14 w-14 bg-[#F0F7F8] rounded-xl flex items-center justify-center shrink-0 group-hover:bg-[#E5EFF0] transition-colors">
            <Image
              width={32}
              height={32}
              src={getIconPath(turma.iconeId, defaultIcon.src)}
              alt={`Icone da turma`}
              className="opacity-90 group-hover:opacity-100 transition-opacity group-hover:scale-110 transform duration-300"
            />
          </div>

          <div className="flex flex-col flex-1 min-w-0 gap-0.5">
            <h3 className="font-montserrat font-bold text-base leading-tight text-neutral-dark group-hover:text-brand-teal-dark transition-colors truncate">
              {turma.nome}
            </h3>
            <p className="font-montserrat font-medium text-xs text-gray-500 truncate">
              {turma.escola || "Escola não informada"}
            </p>
          </div>

          <div className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shrink-0">
            <ArrowRightIcon />
          </div>
        </div>
      </Link>
    ));
  };

  return (
    <section className="col-span-1 bg-transparent flex flex-col h-full relative z-0 w-full">
      
      {/* Cabeçalho */}
      <div className="flex justify-between items-center pb-3 mb-2 border-b border-gray-100 gap-2 relative z-30">
        <h2 className="text-lg font-bold text-gray-800 truncate min-w-0">
            {titulo}
        </h2>

        <div className="flex items-center gap-2 shrink-0">
            
            {/* Paginação */}
            {!loading && totalItems > 0 && totalPaginas > 1 && (
                <div className="flex items-center gap-1 bg-gray-50 rounded-full px-2 py-1">
                    <button
                        onClick={() => mudarPagina(Math.max(1, paginaAtual - 1))}
                        disabled={paginaAtual === 1}
                        className="cursor-pointer text-brand-teal-dark hover:bg-gray-200 rounded-full p-0.5 disabled:opacity-30 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    
                    <span className="text-xs font-bold text-brand-teal-dark w-6 text-center">
                        {paginaAtual}/{totalPaginas}
                    </span>
                    
                    <button
                        onClick={() => mudarPagina(Math.min(totalPaginas, paginaAtual + 1))}
                        disabled={paginaAtual === totalPaginas}
                        className="cursor-pointer text-brand-teal-dark hover:bg-gray-200 rounded-full p-0.5 disabled:opacity-30 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                    </button>
                </div>
            )}

            {loading && (
               <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse" />
            )}

            <div className="h-5 w-px bg-gray-200 mx-1"></div>

            <NotificationBell />

        </div>
      </div>

      {/* Lista */}
      <div className="flex-1 relative w-full pt-1"> 
        {loading ? (
          <div className="space-y-3 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-3 bg-white border border-gray-100 rounded-[20px] flex items-center gap-3">
                <div className="h-14 w-14 bg-gray-200 rounded-xl shrink-0" />
                <div className="flex flex-col flex-1 gap-2">
                  <div className="h-4 w-3/4 bg-gray-200 rounded" />
                  <div className="h-3 w-1/2 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <AnimatePresence initial={false} custom={direcao} mode="popLayout">
            <motion.div
              key={`page-${paginaAtual}`}
              custom={direcao}
              initial={{ x: direcao > 0 ? 20 : -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direcao > 0 ? -20 : 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-full space-y-3" 
            >
              {renderTurmas()}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
      
    </section>
  );
}
