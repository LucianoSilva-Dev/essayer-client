"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { GetTurmasCriadasResponse } from "@/apiCalls/turma/types";
import { getTurmasCriadas } from "@/apiCalls/turma";

export default function ListaTurmas() {

  const [turmas, setTurmas] = useState<GetTurmasCriadasResponse>()

  useEffect(() => {
    (async () => {
      
    })()
    const response = await getTurmasCriadas()
  }, [])

  const [paginaAtual, setPaginaAtual] = useState(1);
  const [paginaAnterior, setPaginaAnterior] = useState<number | null>(null);
  const [direcao, setDirecao] = useState(1); // 1 = próximo, -1 = anterior
  const porPagina = 5;

  const totalPaginas = Math.ceil(notificacoes.length / porPagina);
  const inicio = (paginaAtual - 1) * porPagina;
  const fim = inicio + porPagina;
  const notificacoesPagina = notificacoes.slice(inicio, fim);

  const mudarPagina = (nova: number) => {
    setDirecao(nova > paginaAtual ? 1 : -1);
    setPaginaAnterior(paginaAtual); // guarda a página antiga
    setPaginaAtual(nova);
  };

  return (
    <section className="col-span-1 bg-transparent p-6 flex flex-col h-full z-1">
      {/* Aqui vai o botão de ver notificações */}
      <h2 className="text-xl font-bold text-gray-800 pb-3">
        Notificações
      </h2>

      {/* Lista paginada com animação */}
      <div className="flex-1 relative overflow-hidden">
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
              {obterPagina(paginaAnterior).map((n) => (
                <div
                key={n.id}
                className="mb-8 p-4 h-[128px] bg-gradient-to-r from-gray-50 to-white border-t-5 border-[#075F70] rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer group"
              >

                <div className="flex items-center gap-3">
                  <Image width={48} height={48} src={n.icon} alt={n.titulo}></Image>
                <p className="font-semibold text-[#3C3C3C] text-[20px] group-hover:text-blue-700 transition-colors">
                  {n.titulo}
                </p>
                </div>
                <p className="text-[16px] text-gray-600 mt-1">{n.descricao}</p>
              </div>
              ))}
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
            className="absolute w-full space-y-4 z-20"
          >
            {notificacoesPagina.map((n) => (
              <div
                key={n.id}
                className="mb-8 p-4 h-[128px] bg-gradient-to-r from-gray-50 to-white border-t-5 border-[#075F70] rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer group"
              >

                <div className="flex items-center gap-3">
                  <Image width={48} height={48} src={n.icon} alt={n.titulo}></Image>
                <p className="font-semibold text-[#3C3C3C] text-[20px] group-hover:text-blue-700 transition-colors">
                  {n.titulo}
                </p>
                </div>
                <p className="text-[16px] text-gray-600 mt-1">{n.descricao}</p>
              </div>
            ))}
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
