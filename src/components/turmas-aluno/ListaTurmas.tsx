"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link"; // Importar Link
import { GetTurmasMatriculadasResponse, TurmaMatriculadaAluno } from "@/apiCalls/turma/types"; // Importar tipos
import { getTurmasAluno } from "@/apiCalls/turma";
import { defaultIcon} from "@/constants/icons";
import { getIconPath } from "@/app/utils";

// Props atualizadas para reutilização
interface ListaTurmasProps {
  turmas: TurmaMatriculadaAluno[];
  loading: boolean;
  baseUrl: string;
  titulo: string;
}

export default function ListaTurmasAluno({ turmas, loading, baseUrl, titulo }: ListaTurmasProps) {
  // Estados para paginação (removidos para simplificar, já que o Figma mostra 4 cards)
  // Se precisar de paginação, a lógica anterior pode ser mantida.
  // Por enquanto, vamos apenas listar os cards.

  // NOTE: O CSS do Figma usa `position: absolute` com `top: calc(...)`
  // indicando uma lista vertical. Vou aplicar o estilo do `cardAluno`
  // a cada item da lista.

  const renderTurmas = () => {
    if (loading) {
      return (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="p-5 bg-white rounded-2xl shadow-sm h-[159px] animate-pulse">
              <div className="flex items-center gap-4">
                <div className="w-[55px] h-[55px] rounded-full bg-gray-200"></div>
                <div className="w-1/2 h-6 bg-gray-200 rounded"></div>
              </div>
              <div className="mt-5 w-3/4 h-10 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      );
    }

    if (!turmas || turmas.length === 0) {
      return <p>Você ainda não entrou em nenhuma turma.</p>;
    }

    return turmas.map((turma) => (
      <Link
        key={turma.id}
        href={`${baseUrl}/${turma.id}`}
        className="block mb-5" // Espaçamento entre os cards
      >
        {/* Estilo do cardAluno aplicado aqui:
          - p-5 (padding: 20px)
          - bg-white
          - border-b-4 border-[#075F70] (box-shadow: 0px -5px 0px #075F70)
          - rounded-2xl (border-radius: 20px)
          - flex flex-col gap-5 (display: flex, direction: column, gap: 25px)
        */}
        <div className="p-5 bg-white border-b-4 border-[#075F70] rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group flex flex-col gap-5">
          {/* content / identificacaoTurma */}
          <div className="flex flex-col gap-2.5"> {/* gap: 10px */}
            {/* nome&IconTurma */}
            <div className="flex items-center gap-4"> {/* gap: 15px */}
              <Image 
                width={55} // figma width: 55px
                height={55} // figma height: 55px
                src={getIconPath(turma.iconeId, defaultIcon.src)} 
                alt={`Icone da turma '${turma.nome}'`}
                className="rounded-full" // figma border-radius: 200px
              />
              <p className="font-medium text-[#3C3C3C] text-2xl line-clamp-1 group-hover:text-[#075F70]"> {/* figma: font-size 26px, weight 500 */}
                {turma.nome}
              </p>
            </div>
            {/* descricaoTurma */}
            <div className="flex">
              <p className="font-normal text-lg text-gray-700 line-clamp-2 h-[54px]"> {/* figma: font-size 22px, weight 400, height 54px */}
                {turma.escola || "Esta turma não possui descrição."}
              </p>
            </div>
          </div>
        </div>
      </Link>
    ));
  };

  return (
    <section className="col-span-1 bg-transparent flex flex-col h-full z-1">
      {/* Título "Notificações" atualizado para "Minhas turmas" e estilizado */}
      <div className="flex items-center gap-3 pb-4">
        <svg width="24" height="28" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 27.0001C13.5323 27.0001 14.7967 25.7356 14.7967 24.2034H9.20334C9.20334 25.7356 10.4677 27.0001 12 27.0001ZM21.9033 19.3391V12.1018C21.9033 7.86371 19.2233 4.31371 15.15 3.59696V2.80289C15.15 1.87464 13.7067 1.1001 12 1.1001C10.2933 1.1001 8.85 1.87464 8.85 2.80289V3.59696C4.77667 4.31371 2.09667 7.86371 2.09667 12.1018V19.3391L0 21.4363V22.3334H24V21.4363L21.9033 19.3391Z" fill="#3C3C3C"/>
            <circle cx="20" cy="4" r="4" fill="#075F70" stroke="white" strokeWidth="2"/>
        </svg>
        <h2 className="text-2xl font-medium text-[#3C3C3C]">
          {titulo}
        </h2>
      </div>

      {/* Lista de turmas (sem a paginação por enquanto) */}
      <div className="flex-1 relative">
        <div className="space-y-0">
          {renderTurmas()}
        </div>
      </div>
      
      {/* A lógica de paginação pode ser readicionada aqui se necessário */}
    </section>
  );
}
