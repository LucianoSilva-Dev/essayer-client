"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function NovoEntrarTurmaCard({ className }: { className?: string }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className={`relative w-full h-full min-h-[300px] flex flex-col justify-end animate-pulse ${className}`}>
         {/* Skeleton Image */}
         <div className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 w-[70%] h-[200px] bg-gray-200 rounded-t-[40px] opacity-50" />
         {/* Skeleton Base */}
         <div className="relative w-full h-auto flex-1 mt-[60px] rounded-[32px] border border-gray-100 bg-white flex flex-col items-center justify-end pb-8 px-4 pt-16">
            <div className="h-8 w-3/4 bg-gray-200 rounded-lg mb-3" />
            <div className="h-4 w-2/3 bg-gray-200 rounded" />
         </div>
      </div>
    );
  }

  return (
    <Link
      href="/entrar_turma"
      className={`group/card relative w-full h-full min-h-[300px] flex flex-col justify-end mt-8 ${className}`} // Adicionei mt-8 para garantir espaço visual pro topo da cabeça
    >
      
      {/* --- CARD VISUAL (Base Colorida) --- */}
      {/* Usamos flex-1 para ele ocupar todo o espaço disponível abaixo da imagem */}
      <div 
        className="relative w-full flex-1 rounded-[32px] border border-[#E5EFF0] flex flex-col items-center justify-end pb-8 px-4 pt-12 transition-all duration-300 group-hover/card:shadow-lg group-hover/card:border-[#075F70]/20 z-10"
        style={{
            background: "linear-gradient(180deg, #F2F8F9 0%, #E5EFF0 100%)"
        }}
      >
        {/* ILUSTRAÇÃO (Posicionada Absolutamente em relação ao Card Base) */}
        {/* Top negativo fixo (-80px) garante que sempre vaze a mesma quantidade, independente do zoom */}
        <div className="absolute top-[-80px] left-1/2 transform -translate-x-1/2 w-[90%] h-[240px] z-20 transition-transform duration-500 group-hover/card:scale-105 group-hover/card:-translate-y-2 pointer-events-none">
            <Image
                src="/entrarTurmaStudents.png"
                alt="Ilustração de estudantes"
                fill
                className="object-contain object-bottom drop-shadow-lg"
                priority
            />
        </div>

        {/* Efeito Hover Brilho */}
        <div className="absolute inset-0 bg-white opacity-0 group-hover/card:opacity-30 rounded-[32px] transition-opacity duration-300 pointer-events-none z-0" />

        {/* --- CONTEÚDO DE TEXTO --- */}
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