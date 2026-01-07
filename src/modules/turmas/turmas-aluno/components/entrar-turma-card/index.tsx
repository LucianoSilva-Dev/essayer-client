"use client";
import Link from "next/link";
import Image from "next/image";

export function EntrarTurmaSkeleton() {
  return (
    <div className="w-full min-h-[220px] bg-white rounded-[40px] border border-gray-100 p-8 flex flex-row items-center overflow-hidden relative">
      <div className="flex-1 flex flex-col gap-4 animate-pulse">
        <div className="h-8 w-3/4 bg-gray-200 rounded-lg" />
        <div className="space-y-2 max-w-[60%]">
          <div className="h-4 w-full bg-gray-100 rounded-md" />
          <div className="h-4 w-5/6 bg-gray-100 rounded-md" />
        </div>
      </div>
      <div className="absolute right-[-20px] bottom-[-20px] w-40 h-40 bg-gray-100 rounded-full opacity-50 animate-pulse" />
    </div>
  );
}

export default function EntrarTurmaCard() {
  return (
    <Link href="/entrar_turma" className="block w-full group cursor-pointer">
      <div className="relative w-full min-h-[220px] bg-white rounded-[40px] shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col md:flex-row items-center p-6 md:p-8 border border-transparent hover:border-[#075F70]/10 gap-4 md:gap-0">
        {/* Conteúdo Texto */}
        <div className="flex-1 z-10 flex flex-col gap-2 md:gap-4 w-full md:max-w-[60%] text-center md:text-left">
          <h2 className="font-montserrat font-bold text-2xl md:text-[28px] leading-tight text-[#075F70]">
            Entre para uma turma
          </h2>

          <p className="font-montserrat font-medium text-sm md:text-[14px] leading-relaxed text-[#555]">
            Explore conteúdos exclusivos, aprimore suas redações e conecte-se
            com professores e colegas. Clique aqui e comece sua jornada!
          </p>
        </div>

        {/* Ilustração */}
        {/* Mobile: Relative height. Desktop: Absolute positioning. */}
        <div className="relative md:absolute md:right-0 md:top-0 md:bottom-0 w-full h-40 md:w-[40%] md:h-full mt-4 md:mt-0">
          <Image
            src="/images/entrarTurmaStudents.png"
            alt="Estudantes celebrando"
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-contain object-center md:object-right-bottom md:scale-110 md:translate-y-2 group-hover:scale-105 md:group-hover:scale-115 transition-transform duration-500"
            priority
          />
        </div>
      </div>
    </Link>
  );
}
