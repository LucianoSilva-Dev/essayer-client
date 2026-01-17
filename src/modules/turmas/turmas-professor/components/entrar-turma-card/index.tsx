import Link from "next/link";
import Image from "next/image";

export default function EntrarTurmaCard({ className }: { className?: string }) {
  return (
    <div
      className={`relative w-full h-full min-h-[20rem] bg-[#E5EFF0] rounded-[2.5rem] overflow-hidden cursor-pointer group transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${className}`}
    >
      {/* --- IMAGEM --- */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-[85%] transform transition-transform duration-500 group-hover:scale-105 origin-bottom">
          <Image
            src="/images/entrarTurmaStudents.png"
            alt="Ilustração de estudantes"
            fill
            sizes="100vw"
            className="object-contain object-top p-6"
            priority
          />
        </div>
      </div>

      {/* --- CONTEÚDO DE TEXTO --- */}
      {/* O gradiente cria o efeito de fade suave sobre a imagem se ela descer muito */}
      <div className="absolute bottom-0 left-0 right-0 flex flex-col justify-end items-center pb-8 pt-16 px-4 z-10 bg-gradient-to-t from-[#E5EFF0] via-[#E5EFF0] to-transparent">
        <h2 className="font-montserrat font-semibold text-2xl leading-tight text-brand-teal-dark text-center transition-colors duration-300 group-hover:text-[#054551]">
          Entre para uma turma
        </h2>
        <p className="font-montserrat font-medium text-lg leading-snug text-brand-teal-dark/80 text-center mt-1 transition-colors duration-300 group-hover:text-[#054551]">
          Clique aqui para entrar em uma nova turma!
        </p>
      </div>

      {/* Link Overlay (Cobre todo o card) */}
      <Link
        href="/entrar_turma"
        className="absolute inset-0 z-20"
        aria-label="Ir para página de entrar em turma"
      />
    </div>
  );
}
