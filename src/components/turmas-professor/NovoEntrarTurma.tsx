"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function NovoEntrarTurmaCard({ className }: { className?: string }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Sincroniza o tempo de loading com os outros cards
    const timer = setTimeout(() => setIsLoading(false), 500); 
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    // --- SKELETON PERSONALIZADO (Formato Pop-out) ---
    return (
      <div className={`relative w-full h-full min-h-[300px] flex flex-col justify-end animate-pulse ${className}`}>
         
         {/* 1. O "Fantasma" da Imagem (Vazando pra cima igual a real) */}
         <div className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 w-[70%] h-[200px] bg-gray-200 rounded-t-[40px] z-0 opacity-50" />

         {/* 2. A Base do Card */}
         <div className="relative w-full h-[82%] rounded-[32px] border border-gray-100 bg-white flex flex-col items-center justify-end pb-8 px-4 z-10">
            {/* Linhas de Texto Fake */}
            <div className="h-8 w-3/4 bg-gray-200 rounded-lg mb-3" />
            <div className="h-4 w-2/3 bg-gray-200 rounded" />
         </div>
      </div>
    );
  }

  return (
    <Link
      href="/entrar_turma"
      // Container Principal
      className={`group/card relative w-full h-full min-h-[300px] flex flex-col justify-end ${className}`}
    >
      
      {/* --- 1. A ILUSTRAÇÃO (Vazando para fora) --- */}
      <div className="absolute top-[-40px] left-1/2 transform -translate-x-1/2 w-[90%] h-[220px] z-20 transition-transform duration-500 group-hover/card:scale-105 group-hover/card:-translate-y-2">
        <Image
            src="/entrarTurmaStudents.png"
            alt="Ilustração de estudantes"
            fill
            className="object-contain object-bottom drop-shadow-lg"
            priority
        />
      </div>

      {/* --- 2. O CARD VISUAL (Fundo Colorido) --- */}
      <div 
        className="relative w-full h-[82%] rounded-[32px] border border-[#E5EFF0] flex flex-col items-center justify-end pb-8 px-4 transition-all duration-300 group-hover/card:shadow-lg group-hover/card:border-[#075F70]/20"
        style={{
            background: "linear-gradient(180deg, #F2F8F9 0%, #E5EFF0 100%)"
        }}
      >
        {/* Efeito de brilho no hover */}
        <div className="absolute inset-0 bg-white opacity-0 group-hover/card:opacity-30 rounded-[32px] transition-opacity duration-300 pointer-events-none" />

        {/* --- 3. CONTEÚDO DE TEXTO --- */}
        <div className="relative z-30 flex flex-col gap-2 text-center max-w-[95%]">
            <h2 className="font-montserrat font-bold text-[24px] leading-tight text-[#075F70]">
                Entre para uma turma
            </h2>
            
            <p className="font-montserrat font-medium text-[16px] leading-[1.4] text-[#3C3C3C]/80">
                Clique aqui para entrar em uma nova turma!
            </p>
        </div>
      </div>
    </Link>
  );
}