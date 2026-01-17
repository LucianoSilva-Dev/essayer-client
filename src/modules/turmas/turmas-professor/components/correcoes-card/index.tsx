"use client"
import { getAtividadesRecentes } from "@/lib/apiCalls/turma";
import { GetAtividadesRecentesReponse } from "@/lib/apiCalls/turma/types";
import { useEffect, useState } from "react";
import Link from "next/link";

const ClipboardIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.375a3.75 3.75 0 0 1 7.5 0h.375c1.036 0 1.875.84 1.875 1.875v1.5a1.5 1.5 0 0 1-1.5 1.5h-12a1.5 1.5 0 0 1-1.5 1.5v-1.5Zm-4.5 4.5a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3h-12a3 3 0 0 1-3-3V7.875Z" />
  </svg>
);

const ArrowRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 ml-1">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
);

export default function ModernCorrecoesCard({ className }: { className?: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const [atividadesRecentes, setAtividadesRecentes] = useState<GetAtividadesRecentesReponse[]>([])

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await getAtividadesRecentes()
      setAtividadesRecentes(response.slice(0, 3)) 
      setIsLoading(false);
    })()
  }, [])

  return (
    <Link
      href="/central_correcoes"
      // Substituído min-h-[250px] por min-h-[16rem] (256px)
      className={`relative flex flex-col w-full h-full min-h-[16rem] bg-white rounded-[2rem] shadow-sm transition-all duration-300 overflow-hidden group border border-gray-100 hover:shadow-xl hover:border-brand-teal-dark/30 hover:-translate-y-1 ${className}`}
    >
      <div className="flex items-center gap-3 p-5 pb-3 border-b border-gray-50 bg-gray-50/30">
        {isLoading ? (
            <div className="flex items-center gap-3 animate-pulse w-full">
                <div className="w-10 h-10 bg-gray-200 rounded-xl shrink-0" />
                <div className="h-6 w-48 bg-gray-200 rounded-lg" />
            </div>
        ) : (
            <>
                <div className="p-2 bg-[#E5EFF0] text-brand-teal-dark rounded-xl scale-90 transition-colors duration-300 group-hover:bg-brand-teal-dark group-hover:text-white group-hover:scale-100">
                    <ClipboardIcon className="w-5 h-5" />
                </div>
                {/* Substituído text-[20px] por text-xl */}
                <h2 className="font-montserrat font-bold text-xl text-neutral-dark group-hover:text-brand-teal-dark transition-colors">
                    Central de Correções
                </h2>
            </>
        )}
      </div>

      <div className="flex-1 flex flex-col p-2 overflow-hidden">
        {isLoading ? (
            <div className="space-y-2 animate-pulse">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="p-3 border-b border-gray-50 flex flex-col gap-2">
                        <div className="flex justify-between">
                            <div className="h-4 w-1/2 bg-gray-200 rounded" />
                            <div className="h-5 w-12 bg-gray-200 rounded-full" />
                        </div>
                        <div className="h-3 w-3/4 bg-gray-200 rounded" />
                    </div>
                ))}
            </div>
        ) : (
            atividadesRecentes.length > 0 ? (
                atividadesRecentes.map((atividade) => (
                <div key={atividade.id} className="p-3 border-b border-gray-100 last:border-0 hover:bg-[#F0F7F8] hover:border-brand-teal-dark/20 hover:rounded-xl hover:translate-x-1 transition-all duration-200 cursor-pointer flex flex-col gap-2">
                    <div className="flex justify-between items-center gap-4">
                    {/* Substituído text-[15px] por text-sm */}
                    <h3 className="font-montserrat font-semibold text-sm text-neutral-dark line-clamp-1 flex-1">{atividade.titulo}</h3>
                    <div className="flex items-center gap-1 bg-[#F0F7F8] group-hover/item:bg-white px-2 py-1 rounded-md border border-[#E5EFF0] shrink-0 transition-colors">
                        <span className="font-montserrat font-bold text-xs text-brand-teal-dark">{String(atividade.respostas)}</span>
                        <span className="font-montserrat text-xs text-gray-400">/</span>
                        <span className="font-montserrat font-medium text-xs text-gray-500">{String(atividade.totalAlunos)}</span>
                    </div>
                    </div>
                    <p className="font-montserrat font-medium text-xs leading-relaxed text-gray-400 line-clamp-1">{atividade.descricao}</p>
                </div>
                ))
            ) : (
                <div className="flex-1 flex items-center justify-center text-gray-400 font-montserrat text-sm py-4">
                    Nenhuma atividade recente.
                </div>
            )
        )}
      </div>

      <div className="p-3 mt-auto bg-gray-50/30 border-t border-gray-50 flex justify-center relative overflow-hidden">
         {isLoading ? (
             <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
         ) : (
             <div className="flex items-center font-montserrat font-semibold text-sm text-brand-teal-dark transition-transform duration-300 group-hover:translate-x-2">
                Todas as Correções
                <div className="transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRightIcon />
                </div>
             </div>
         )}
      </div>
    </Link>
  );
}
