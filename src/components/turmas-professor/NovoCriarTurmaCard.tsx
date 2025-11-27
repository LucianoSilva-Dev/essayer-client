"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function NovoCriarTurmaCard() {
  // Estado para controlar o Skeleton
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula um pequeno delay para sincronizar visualmente com os outros cards
    // ou apenas para garantir que o componente montou antes de renderizar a imagem pesada
    const timer = setTimeout(() => setIsLoading(false), 500); 
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="w-full mt-6 h-[420px] bg-white border border-gray-100 rounded-[32px] p-8 flex items-center relative overflow-hidden animate-pulse">
        <div className="w-3/5 space-y-6 z-10">
            {/* Título */}
            <div className="h-10 w-3/4 bg-gray-200 rounded-lg" />
            {/* Descrição */}
            <div className="h-6 w-full bg-gray-200 rounded-lg" />
            <div className="h-6 w-2/3 bg-gray-200 rounded-lg" />
            {/* Botão */}
            <div className="h-14 w-52 bg-gray-200 rounded-full mt-8" />
        </div>
        {/* Espaço da Imagem */}
        <div className="absolute right-0 bottom-0 w-[45%] h-[90%] bg-gray-100 rounded-tl-[100px] opacity-50" />
      </div>
    );
  }

  return (
    <Link 
      href="/criar_turma"
      className="group/card relative w-full mt-6 h-[260px] block overflow-hidden rounded-[32px] transition-all duration-300 hover:scale-[1.01] hover:shadow-xl shadow-md bg-white"
    >
      {/* --- FUNDO --- */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-[#F0F7F8] to-[#E5EFF0] z-0" />
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#075F70] opacity-[0.08] rounded-full blur-3xl transition-all duration-500 group-hover/card:scale-110 group-hover/card:opacity-[0.12] z-0" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[250px] h-[250px] bg-[#075F70] opacity-[0.05] rounded-full blur-2xl z-0" />

      {/* --- CONTEÚDO --- */}
      <div className="relative z-10 h-full grid grid-cols-5 px-8 pb-4 items-center">
        
        {/* COLUNA DA ESQUERDA */}
        <div className="col-span-3 flex flex-col justify-center items-start gap-8 pl-2 h-full">
          <div className="space-y-4">
            <h2 className="font-montserrat font-bold text-[40px] leading-[1.1] text-[#075F70] transition-colors group-hover/card:text-[#054551]">
              Criar Turma
            </h2>
            <p className="font-montserrat font-medium text-[22px] leading-[1.3] text-[#3C3C3C]/80 max-w-[95%]">
              Está pronto para aproveitar do que o turmas tem de melhor?
            </p>
          </div>

          {/* BOTÃO */}
          <div className="relative inline-flex items-center justify-center w-[220px] h-[54px] bg-[#075F70] text-white rounded-full font-montserrat font-semibold text-[19px] shadow-[0_4px_15px_rgba(7,95,112,0.2)] transition-all duration-300 group-hover/card:bg-[#054551] group-hover/card:shadow-[0_6px_20px_rgba(7,95,112,0.3)] group-hover/card:scale-105 overflow-hidden">
            <span className="relative z-10 transition-transform duration-300 group-hover/card:-translate-x-3">
              Criar turma
            </span>
            <div className="absolute right-5 opacity-0 translate-x-4 transition-all duration-300 group-hover/card:opacity-100 group-hover/card:translate-x-0 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </div>
        </div>

        {/* COLUNA DA DIREITA */}
        <div className="col-span-2 h-full relative flex items-end justify-end -mr-6 -mb-0">
             <Image
                src="/criarTurmaStudents.png"
                alt="Ilustração de professores e alunos"
                width={450} 
                height={400}
                className="object-contain max-h-[105%] w-auto drop-shadow-lg transition-transform duration-500 group-hover/card:scale-[1.02] origin-bottom"
                priority
            />
        </div>
      </div>
    </Link>
  );
}