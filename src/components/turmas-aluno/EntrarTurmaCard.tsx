import Link from "next/link";

export default function EntrarTurmaCard({ className }: { className?: string }) {
  return (
    <div className={`relative w-full h-full min-h-[312px] scale-90 bg-white rounded-[40px] p-4 cursor-pointer group transition-all duration-300 ${className}`}> {/* bg-[#E5EFF0] alterado para bg-white */}
      <div className="absolute w-[100%] h-[100%] right-[2%] top-[-14%] z-0">
        <img
          src="/entrarTurmaStudents.png"
          alt="Entrar Turma"
          className="w-full h-full object-contain transition-all duration-500 group-hover:brightness-110 group-hover:scale-105"
        />
      </div>

      {/* Container do texto:
        - bg-[#E5EFF0] alterado para bg-white
        - sombras atualizadas para bg-white
      */}
      <div className={`absolute w-[calc(100%-20px)] h-auto min-h-[95px] left-1/2 bottom-8 transform -translate-x-1/2 flex flex-col justify-center items-center gap-2 p-4 bg-white shadow-[0px_0px_8px_7px_white] z-10 transition-all duration-300 group-hover:shadow-[0px_0px_12px_10px_white]`}>
        <h2 className="font-montserrat font-semibold text-3xl leading-tight text-[#075F70] text-center w-full transition-colors duration-300 group-hover:text-[#054551]"> {/* figma: 32px -> text-3xl */}
          Entre para uma turma
        </h2>
        <p className="font-montserrat font-medium text-base text-[#3C3C3C] text-center w-full transition-colors duration-300 group-hover:text-black"> {/* figma: 16px, #3C3C3C -> text-base text-[#3C3C3C] */}
          Explore conteúdos exclusivos, aprimore suas redações e conecte-se com professores e colegas. Clique aqui e comece sua jornada!
        </p>
      </div>

      <Link 
        href="/entrar_turma" 
        className="absolute inset-0 z-20 rounded-[40px] transition-all duration-300 hover:bg-opacity-10"
      />
    </div>
  );
}
