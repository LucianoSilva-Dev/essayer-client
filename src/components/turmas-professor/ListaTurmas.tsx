"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { GetTurmasCriadasResponse } from "@/apiCalls/turma/types";
import { getTurmasCriadas } from "@/apiCalls/turma";
import { defaultIcon, IconsMap } from "@/constants/icons";
import { getIconPath } from "@/app/utils";

export default function ListaTurmas() {
  const limit = 4 // numeros de turmas por pagina
  const initialQuery = `limit=${limit}`
  const [isLoading, setIsLoading] = useState(false);
  const [turmas, setTurmas] = useState<GetTurmasCriadasResponse>()
  const [query, setQuery] = useState(initialQuery)
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [paginaAnterior, setPaginaAnterior] = useState<number | null>(null);
  const [direcao, setDirecao] = useState(1); // 1 = próximo, -1 = anterior
  const totalPaginas = turmas?.paginacao.pagesUrl.length ?? 1;
  console.log(totalPaginas)

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await getTurmasCriadas(query);
      setTurmas(response);
      setIsLoading(false);
    })()
  }, [query])

  const mudarPagina = async (nova: number) => {
    if (isLoading) return;
    
    const novaDirecao = nova > paginaAtual ? 1 : -1;
    setDirecao(novaDirecao);
    setPaginaAnterior(paginaAtual);
    setPaginaAtual(nova);
    
    const novaQuery = turmas?.paginacao.pagesUrl[nova - 1] ?? '';
    setQuery(novaQuery);
  };

  const renderTurmas = (turmasData?: GetTurmasCriadasResponse) => {
    if (!turmasData?.documentos) {
      return <p>Você ainda não criou nenhuma turma</p>;
    }

    return turmasData.documentos.map((turma) => (
      <Link
        key={turma.id}
        href={`/turma_aberta_prof/${turma.id}`}
        className="block mb-4 hover:scale-105 transition-transform"
      >
        <div className="p-4 h-[128px] bg-gradient-to-r from-gray-50 to-white border-t-5 border-[#075F70] rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer group">
          <div className="flex items-center gap-3">
            <Image 
              width={48} 
              height={48} 
              src={getIconPath(turma.iconeId, defaultIcon.src)} 
              alt={`Icone da turma '${turma.nome}'`}
            />
            <p className="font-semibold text-[#3C3C3C] text-[20px] group-hover:text-[#075F70] transition-colors">
              {turma.nome}
            </p>
          </div>
          <p className="text-[16px] text-gray-600 mt-1">{turma.escola}</p>
        </div>
      </Link>
    ));
  };

  return (
    <section className="col-span-1 bg-transparent p-6 flex flex-col h-full z-1">
      {/* Aqui vai o botão de ver notificações */}
      <h2 className="text-xl font-bold text-gray-800 pb-3">
        Notificações
      </h2>

      {/* Lista paginada com animação */}
      <div className="flex-1 relative overflow-x-visible">
        <AnimatePresence initial={false} custom={direcao}>
          {/* Página antiga */}
          {paginaAnterior && paginaAnterior !== paginaAtual && (
            <motion.div
              key={`old-${paginaAnterior}`}
              custom={direcao}
              initial={{ x: 0, opacity: 1 }}
              animate={{ x: direcao > 0 ? -60 : 60, opacity: 0 }}
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.25 }
              }}
              className="absolute w-full space-y-4 z-10"
              onAnimationComplete={() => setPaginaAnterior(null)}
            >
              {renderTurmas(turmas)}
            </motion.div>
          )}

          {/* Página nova */}
          <motion.div
            key={`new-${paginaAtual}`}
            custom={direcao}
            initial={{ x: direcao > 0 ? 60 : -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direcao > 0 ? -60 : 60, opacity: 0 }}
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.25 }
            }}
            className="absolute w-full space-y-4 overflow-x-visible z-20"
          >
            {renderTurmas(turmas)}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Paginação com bolinhas */}
      <div className="flex justify-center items-center gap-4 mt-4">
        {/* Seta esquerda */}
        <button
          onClick={() => mudarPagina(Math.max(1, paginaAtual - 1))}
          disabled={paginaAtual === 1}
          className="disabled:opacity-40"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke={paginaAtual === 1 ? "#D9D9D9" : "#075F70"}
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Bolinhas */}
        <div className="flex gap-2">
          {Array.from({ length: totalPaginas }, (_, i) => (
            <button
              key={i}
              onClick={() => mudarPagina(i + 1)}
              className={`w-3 h-3 rounded-full transition-colors ${paginaAtual === i + 1 ? "bg-[#075F70]" : "bg-[#D9D9D9]"
                }`}
            />
          ))}
        </div>

        {/* Seta direita */}
        <button
          onClick={() => mudarPagina(Math.min(totalPaginas, paginaAtual + 1))}
          disabled={paginaAtual === totalPaginas}
          className="disabled:opacity-40"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke={paginaAtual === totalPaginas ? "#D9D9D9" : "#075F70"}
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}

