"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { GetTurmasCriadasResponse } from "@/apiCalls/turma/types";
import { getTurmasCriadas } from "@/apiCalls/turma";
import { defaultIcon } from "@/constants/icons";
import { getIconPath } from "@/app/utils";
import NotificationBell from "../shared/NotificationBell"; 

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-[#075F70]">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);

export default function ListaTurmas() {
  const limit = 3; 
  const initialQuery = `limit=${limit}`;
  
  // Inicialize como TRUE para o skeleton aparecer na hora que a página abre
  const [isLoading, setIsLoading] = useState(true);
  const [turmas, setTurmas] = useState<GetTurmasCriadasResponse>();
  const [query, setQuery] = useState(initialQuery);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [paginaAnterior, setPaginaAnterior] = useState<number | null>(null);
  const [direcao, setDirecao] = useState(1);
  const totalPaginas = turmas?.paginacao.pagesUrl.length ?? 1;

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await getTurmasCriadas(query);
      setTurmas(response);
      setIsLoading(false);
    })();
  }, [query]);

  // ... (Funções mudarPagina e renderTurmas continuam iguais, omiti para poupar espaço) ...
  const mudarPagina = async (nova: number) => {
    if (isLoading) return;
    const novaDirecao = nova > paginaAtual ? 1 : -1;
    setIsLoading(true);
    const novaQuery = turmas?.paginacao.pagesUrl[nova - 1] ?? `limit=${limit}&page=${nova}`;
    const response = await getTurmasCriadas(novaQuery);
    setDirecao(novaDirecao);
    setPaginaAnterior(paginaAtual);
    setPaginaAtual(nova);
    setTurmas(response);
    setIsLoading(false);
  };

  const renderTurmas = (turmasData?: GetTurmasCriadasResponse) => {
    if (!turmasData?.documentos || turmasData.documentos.length === 0) {
      return (
          <div className="w-full h-32 flex items-center justify-center text-gray-400 font-montserrat bg-gray-50 rounded-[20px] border border-dashed border-gray-200">
              Nenhuma turma encontrada.
          </div>
      );
    }
    return turmasData.documentos.map((turma) => (
      <Link key={turma.id} href={`/turma_aberta_prof/${turma.id}`} className="block mb-3 group">
        <div className="p-3 bg-white border border-gray-100 rounded-[20px] shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:border-[#075F70]/30 flex items-center gap-3 relative overflow-hidden">
          <div className="h-14 w-14 bg-[#F0F7F8] rounded-xl flex items-center justify-center shrink-0 group-hover:bg-[#E5EFF0] transition-colors">
            <Image width={32} height={32} src={getIconPath(turma.iconeId, defaultIcon.src)} alt={`Icone`} className="opacity-90 group-hover:opacity-100 transition-opacity group-hover:scale-110 transform duration-300" />
          </div>
          <div className="flex flex-col flex-1 min-w-0 gap-0.5">
            <h3 className="font-montserrat font-bold text-[16px] leading-tight text-[#3C3C3C] group-hover:text-[#075F70] transition-colors truncate">{turma.nome}</h3>
            <p className="font-montserrat font-medium text-[13px] text-gray-500 truncate">{turma.escola || "Escola não informada"}</p>
          </div>
          <div className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shrink-0"><ArrowRightIcon /></div>
        </div>
      </Link>
    ));
  };

  return (
    <section className="col-span-1 bg-transparent p-2 md:p-6 flex flex-col h-full relative">
      
      {/* Cabeçalho */}
      <div className="flex justify-between items-center pb-3 mb-2 border-b border-gray-100 gap-2 relative z-30">
        <h2 className="text-[18px] font-bold text-gray-800 truncate min-w-0">
            Minhas Turmas
        </h2>

        <div className="flex items-center gap-2 shrink-0">
            {/* Controles de Paginação (Só mostra se não estiver carregando e tiver dados) */}
            {!isLoading && turmas && totalPaginas > 1 && (
                <div className="flex items-center gap-1 bg-gray-50 rounded-full px-2 py-1">
                    <button onClick={() => mudarPagina(Math.max(1, paginaAtual - 1))} disabled={paginaAtual === 1} className="text-[#075F70] hover:bg-gray-200 rounded-full p-0.5 disabled:opacity-30 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <span className="text-[12px] font-bold text-[#075F70] w-6 text-center">{paginaAtual}/{totalPaginas}</span>
                    <button onClick={() => mudarPagina(Math.min(totalPaginas, paginaAtual + 1))} disabled={paginaAtual === totalPaginas} className="text-[#075F70] hover:bg-gray-200 rounded-full p-0.5 disabled:opacity-30 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                    </button>
                </div>
            )}
            
            {/* Skeleton da Paginação (Quando carregando) */}
            {isLoading && (
               <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse" />
            )}

            <div className="h-5 w-[1px] bg-gray-200 mx-1"></div>
            <NotificationBell />
        </div>
      </div>

      {/* Lista ou Skeleton */}
      <div className="flex-1 relative w-full pt-1"> 
        {isLoading ? (
          // --- SKELETON LOADING DA LISTA ---
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
          // --- LISTA REAL ---
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
              {renderTurmas(turmas)}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}