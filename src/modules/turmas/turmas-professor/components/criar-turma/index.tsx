"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function NovoCriarTurmaCard() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500); 
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    // Substituído h-[420px] por h-96 (24rem/384px) aprox
    return (
      <div className="w-full mt-6 h-96 bg-white border border-gray-100 rounded-[2rem] p-8 flex items-center relative overflow-hidden animate-pulse">
        <div className="w-3/5 space-y-6 z-10">
            <div className="h-10 w-3/4 bg-gray-200 rounded-lg" />
            <div className="h-6 w-full bg-gray-200 rounded-lg" />
            <div className="h-6 w-2/3 bg-gray-200 rounded-lg" />
            <div className="h-14 w-52 bg-gray-200 rounded-full mt-8" />
        </div>
        <div className="absolute right-0 bottom-0 w-[45%] h-[90%] bg-gray-100 rounded-tl-[100px] opacity-50" />
      </div>
    );
  }

  return (
    <Link 
      href="/criar_turma"
      // Substituído h-[260px] por h-64 (16rem/256px) ou min-h para responsividade
      className="group/card relative w-full mt-6 min-h-[16rem] block overflow-hidden rounded-[2rem] transition-all duration-300 hover:scale-[1.01] hover:shadow-xl shadow-md bg-white"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white via-[#F0F7F8] to-[#E5EFF0] z-0" />
      {/* Background blobs com opacidade - mantido medidas relativas ou ajustadas */}
      <div className="absolute top-[-20%] right-[-10%] w-full h-full max-w-lg max-h-[30rem] bg-brand-teal-dark opacity-[0.08] rounded-full blur-3xl transition-all duration-500 group-hover/card:scale-110 group-hover/card:opacity-[0.12] z-0" />
      
      <div className="relative z-10 h-full grid grid-cols-1 md:grid-cols-5 px-6 md:px-8 pb-4 items-center gap-4">
        
        {/* COLUNA DA ESQUERDA */}
        <div className="col-span-1 md:col-span-3 flex flex-col justify-center items-start gap-6 md:gap-8 pl-2 h-full py-6 md:py-0">
          <div className="space-y-2 md:space-y-4">
            {/* Responsividade no texto: text-3xl mobile -> text-4xl desktop */}
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl leading-[1.1] text-brand-teal-dark transition-colors group-hover/card:text-[#054551]">
              Criar Turma
            </h2>
            <p className="font-montserrat font-medium text-lg md:text-xl leading-[1.3] text-neutral-dark/80 max-w-[95%]">
              Está pronto para aproveitar do que o turmas tem de melhor?
            </p>
          </div>

          <div className="relative inline-flex items-center justify-center w-56 h-14 bg-brand-teal-dark text-white rounded-full font-montserrat font-semibold text-lg shadow-lg transition-all duration-300 group-hover/card:bg-[#054551] group-hover/card:scale-105 overflow-hidden">
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
        <div className="hidden md:flex col-span-2 h-full relative items-end justify-end -mr-6 -mb-0">
             <Image
                src="/images/criarTurmaStudents.png"
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
