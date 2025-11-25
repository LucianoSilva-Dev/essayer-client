"use client"
import { getAtividadesRecentes } from "@/apiCalls/turma";
import { GetAtividadesRecentesReponse } from "@/apiCalls/turma/types";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function CorrecoesCard({ className }: { className?: string }) {
  const [atividadesRecentes, setAtividadesRecentes] = useState<GetAtividadesRecentesReponse[]>([])

  useEffect(() => {
    (async () => {
      const response = await getAtividadesRecentes()
      setAtividadesRecentes(response)
    })()
  }, [])

  return (
    <Link
      href="/central_correcoes"
      // Removido: hover:shadow-2xl
      // Mantido: hover:scale e hover:ring (borda sutil) para feedback tátil
      className={`relative block w-full h-full scale-90 bg-white rounded-[20px] shadow-lg p-5 z-10 cursor-pointer transition-all duration-300 hover:scale-[0.92] hover:ring-2 hover:ring-[#075F70]/20 group ${className}`}
    >
      <h2 className="w-full font-montserrat font-semibold text-[22px] leading-[27px] text-[#3C3C3C] text-center mb-7 group-hover:text-[#075F70] transition-colors">
        Central de correções
      </h2>

      <div className="relative">
        <div className="flex flex-col gap-[10px] max-h-[270px] overflow-y-auto pr-2 scrollbar-thin">
          {atividadesRecentes.map((atividade, index) => (
            <div key={atividade.id} className="relative flex flex-col gap-1 p-0 isolate">
              <div className="flex justify-between items-start">
                <span className="font-montserrat font-medium text-[18px] leading-[22px] text-[#3C3C3C]">
                  {atividade.titulo}
                </span>
                <span className="font-montserrat font-normal text-[14px] leading-[17px] text-[#3C3C3C]">
                  {String(atividade.respostas)} / {String(atividade.totalAlunos)}
                </span>
              </div>
              <p className="font-montserrat font-normal text-[16px] leading-[20px] text-[#3C3C3C] w-full line-clamp-2">
                {atividade.descricao}
              </p>
              {index < atividadesRecentes.length - 1 && (
                <div className="w-full h-[1px] bg-[rgba(217,217,217,0.7)] mt-2" />
              )}
            </div>
          ))}
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, white 100%)',
            opacity: 0.8,
            filter: 'blur(1px)'
          }}
        />
      </div>

      <div className="absolute bottom-5 left-5 flex items-center gap-2">
        <span className="font-montserrat font-medium text-[20px] leading-[24px] text-[#3C3C3C] group-hover:text-[#075F70] transition-colors">
          Todas as Correções
        </span>
        <div className="w-[10px] h-[10px] bg-[#075F70] rounded-full group-hover:scale-150 transition-transform duration-300" />
      </div>
    </Link>
  );
}