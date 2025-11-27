"use client";
import Link from "next/link";
import Image from "next/image";

// === SKELETON EXPORTADO ===
export function EntrarTurmaSkeleton() {
  return (
    <div className="w-full min-h-[220px] bg-white rounded-[40px] border border-gray-100 p-8 flex flex-row items-center overflow-hidden relative">
      <div className="flex-1 flex flex-col gap-4 animate-pulse">
        {/* Título Skeleton */}
        <div className="h-8 w-3/4 bg-gray-200 rounded-lg" />
        {/* Texto Skeleton */}
        <div className="space-y-2 max-w-[60%]">
             <div className="h-4 w-full bg-gray-100 rounded-md" />
             <div className="h-4 w-5/6 bg-gray-100 rounded-md" />
        </div>
      </div>
      {/* Imagem Skeleton */}
      <div className="absolute right-[-20px] bottom-[-20px] w-40 h-40 bg-gray-100 rounded-full opacity-50 animate-pulse" />
    </div>
  );
}

// === COMPONENTE PRINCIPAL ===
export default function EntrarTurmaCard() {
  return (
    <Link
      href="/entrar_turma"
      className="block w-full group cursor-pointer"
    >
      <div className="relative w-full min-h-[220px] bg-white rounded-[40px] shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-row items-center p-8 border border-transparent hover:border-[#075F70]/10">
        
        {/* Conteúdo Texto (Esquerda) */}
        <div className="flex-1 z-10 flex flex-col gap-4 max-w-[60%]">
            <h2 className="font-montserrat font-bold text-[28px] leading-tight text-[#075F70]">
                Entre para uma turma
            </h2>
            
            <p className="font-montserrat font-medium text-[14px] leading-relaxed text-[#555]">
                Explore conteúdos exclusivos, aprimore suas redações e conecte-se com professores e colegas. Clique aqui e comece sua jornada!
            </p>
        </div>

        {/* Ilustração (Direita) */}
        <div className="absolute right-0 top-0 bottom-0 w-[40%] h-full">
            <Image
                src="/entrarTurmaStudents.png" 
                alt="Estudantes celebrando"
                fill
                className="object-contain object-right-bottom scale-110 translate-y-2 group-hover:scale-115 transition-transform duration-500"
                priority
            />
        </div>
      </div>
    </Link>
  );
}