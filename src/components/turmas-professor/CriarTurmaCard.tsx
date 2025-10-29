"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function CriarTurmaCard() {
  const router = useRouter();
     const handleCreateTurma = () => {
      router.push(`/criar_turma`);
    }
  
  return (
    <div className="relative w-full h-[280px] z-0 cursor-pointer group/card">
      {/* Container principal com posicionamento relativo */}
      <div className="relative w-full h-full">
        {/* Ellipse 3 - Fundo com blur */}
        <div 
          className="absolute w-[800px] h-[350px] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 group-hover/card/card:scale-105 group-hover/card:opacity-70"
          style={{
            background: 'linear-gradient(180deg, #075F70 -17.9%, #075F70 149.65%)',
            opacity: 0.6,
            filter: 'blur(50px)'
          }}
        />
        
        {/* Card principal */}
        <div onClick={() => handleCreateTurma()} className="absolute w-full h-full max-w-[90%] max-h-[350px] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-start p-[27px_27px_27px_30px] gap-5 isolate bg-white shadow-[0px_0px_11.7px_1.8px_rgba(0,0,0,0.25)] rounded-[27px] transition-all duration-300 group-hover/card:shadow-[0px_0px_20px_3px_rgba(7,95,112,0.3)] group-hover/card:scale-[1.02]">
          {/* Botão "Criar turma" - Agora no canto inferior direito */}
          <Link href="/criar_turma" className="flex items-center justify-center p-[6px_20px] absolute w-[188px] h-[42px] right-[30px] bottom-[30px] bg-white rounded-[50px] z-30 transition-all duration-300 hover:bg-[#075F70] hover:shadow-lg hover:scale-105 active:scale-95 group/button">
            <span 
              className="font-montserrat font-semibold text-[25px] leading-[30px] text-[#075F70] transition-colors duration-300 group-hover/button:text-white"
            >
              Criar turma
            </span>
          </Link>
          
          {/* Título "Criar Turma" */}
          <h2 
            className="w-[195px] h-[39px] font-montserrat font-semibold text-[32px] leading-[39px] text-[#075F70] z-0 transition-colors duration-300 group-hover/card:text-[#054551]"
          >
            Criar Turma
          </h2>
          
          {/* Descrição */}
          <p 
            className="w-[318px] h-[136px] font-montserrat font-medium text-[28px] leading-[34px] text-[#075F70] z-10 transition-colors duration-300 group-hover/card:text-[#054551]"
          >
            Está pronto para aproveitar do que o turmas tem de melhor?
          </p>
          
          {/* Imagem com animação sutil */}
          <div className="absolute w-[60%] h-[140%] right-[-10%] top-[-20%] z-20 flex items-center justify-center transition-transform duration-500 group-hover/card:scale-110 group-hover/card:rotate-2">
            <img
              src="/criarTurmaStudents.png"
              alt="Criar Turma"
              className="w-full h-full object-contain transition-all duration-500 group-hover/card:brightness-110"
            />
          </div>
        </div>
      </div>
    </div>
  );
}