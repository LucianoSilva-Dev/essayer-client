import Link from "next/link";
import Image from "next/image";

export default function EntrarTurmaCard() {
  return (
    <Link 
      href={'/entrar_turma'} 
      className="
        relative w-[100%] h-[270px] bg-white rounded-[40px] shadow-lg p-10
        flex flex-col justify-between items-start
        transition-all duration-300 ease-in-out
        hover:scale-105 hover:shadow-xl
        group
        overflow-visible
      "
    >
      {/* Conteúdo de texto */}
      <div className="flex flex-col h-full items-start justify-between z-10">
        <h2 className="font-montserrat font-semibold text-[32px] leading-[39px] text-[#075F70] mb-4">
          Entre para uma turma
        </h2>
        <p className="font-montserrat font-medium text-[16px] leading-[20px] text-[#3C3C3C] max-w-[349px] px-1">
          Explore conteúdos exclusivos, aprimore suas redações e conecte-se com professores e colegas. 
          Clique aqui e comece sua jornada!
        </p>
      </div>

      {/* Imagem com efeito de hover */}
      <div className="
        absolute right-10 top-1/2 transform -translate-y-1/2
        transition-all duration-500 ease-in-out
        group-hover:-translate-y-[55%] group-hover:scale-115
        z-0
      ">
        <Image 
          src="/entrarTurmaStudents.png" 
          alt="Estudantes em turma"
          width={300}
          height={150}
          className="object-contain"
          priority
        />
      </div>
    </Link>
  );
}