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
      <div className={`relative w-full h-full min-h-[18rem] flex flex-col justify-end animate-pulse ${className}`}>
         <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8 w-[70%] h-48 bg-gray-200 rounded-t-[2.5rem] opacity-50" />
         <div className="relative w-full h-auto flex-1 mt-16 rounded-[2rem] border border-gray-100 bg-white flex flex-col items-center justify-end pb-8 px-4 pt-16">
            <div className="h-8 w-3/4 bg-gray-200 rounded-lg mb-3" />
            <div className="h-4 w-2/3 bg-gray-200 rounded" />
         </div>
      </div>
    );
  }

  return (
    <Link
      href="/entrar_turma"
      className={`group/card relative w-full h-full min-h-[18rem] flex flex-col justify-end mt-8 ${className}`} 
    >
      <div 
        className="relative w-full flex-1 rounded-[2rem] border border-[#E5EFF0] flex flex-col items-center justify-end pb-8 px-4 pt-12 transition-all duration-300 group-hover/card:shadow-lg group-hover/card:border-[#075F70]/20 z-10"
        style={{
            background: "linear-gradient(180deg, #F2F8F9 0%, #E5EFF0 100%)"
        }}
      >
        {/* ALTERAÇÃO AQUI: Mudado de -top-20 para -top-8 para descer a imagem */}
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-[90%] h-60 z-20 transition-transform duration-500 group-hover/card:scale-105 group-hover/card:-translate-y-2 pointer-events-none">
            <Image
                src="/images/entrarTurmaStudents.png"
                alt="Ilustração de estudantes"
                fill
                className="object-contain object-bottom drop-shadow-lg"
                priority
            />
        </div>

        <div className="absolute inset-0 bg-white opacity-0 group-hover/card:opacity-30 rounded-[2rem] transition-opacity duration-300 pointer-events-none z-0" />

        <div className="relative z-30 flex flex-col gap-2 text-center max-w-[95%]">
            <h2 className="font-montserrat font-bold text-2xl leading-tight text-[#075F70]">
                Entre para uma turma
            </h2>
            <p className="font-montserrat font-medium text-base leading-[1.4] text-[#3C3C3C]/80">
                Clique aqui para entrar em uma nova turma!
            </p>
        </div>
      </div>
    </Link>
  );
}
