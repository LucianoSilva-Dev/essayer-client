import Link from "next/link";

export default function EntrarTurmaCard({ className }: { className?: string }) {
  return (
    <div className={`relative w-full h-full min-h-[312px] bg-[#E5EFF0] rounded-[40px] p-4 cursor-pointer group scale-95 hover:scale-100 transition-all duration-300 ${className}`}>
      <div className="absolute w-[100%] h-[100%] right-[2%] top-[-14%] z-0">
        <img
          src="/entrarTurmaStudents.png"
          alt="Entrar Turma"
          className="w-full h-full object-contain transition-all duration-500 group-hover:brightness-110"
        />
      </div>

      <div className="absolute w-[calc(100%-20px)] h-[95px] left-1/2 bottom-8 transform -translate-x-1/2 flex flex-col justify-center items-center gap-1 bg-[#E5EFF0] shadow-[0px_0px_8px_7px_#E5EFF0] z-10 transition-all duration-300 group-hover:shadow-[0px_0px_12px_10px_#E5EFF0]">
        <h2 className="font-montserrat font-semibold text-[26px] leading-[32px] text-[#075F70] text-center w-full transition-colors duration-300 group-hover:text-[#054551]">
          Entre para uma turma
        </h2>
        <p className="font-montserrat font-medium text-[22px] leading-[27px] text-[#075F70] text-center w-full transition-colors duration-300 group-hover:text-[#054551]">
          Clique aqui para entrar em uma nova turma!
        </p>
      </div>

      <Link 
        href="/entrar_turma" 
        className="absolute inset-0 z-20 rounded-[40px] transition-all duration-300 hover:bg-opacity-10"
      />
    </div>
  );
}
