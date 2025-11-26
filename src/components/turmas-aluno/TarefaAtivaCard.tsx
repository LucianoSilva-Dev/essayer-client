// src/components/turmas-aluno/tarefas-ativas/TarefaAtivaCard.tsx
import Image from "next/image";
import Link from "next/link";
// Importe o tipo correto
import { MinhaTarefaAtiva } from "@/apiCalls/tarefas/types";
import { format } from 'date-fns'; // Para formatar a data
import { ptBR } from 'date-fns/locale'; // Para formato brasileiro

// Interface atualizada
interface TarefaAtivaCardProps {
  tarefa: MinhaTarefaAtiva;
}

export function TarefaAtivaCard({ tarefa }: TarefaAtivaCardProps) {
  // Formatar dataLimite
  const dataFormatada = tarefa.dataLimite
    ? format(new Date(tarefa.dataLimite), "d, MMMM yyyy", { locale: ptBR })
    : "Sem prazo";

  return (
    <div className="relative flex max-h-[311px] w-[692px] flex-col gap-[25px] rounded-[40px] bg-white p-[30px] shadow-[0px_0px_13px_2px_rgba(0,0,0,0.25)] isolate scale-95 hover:shadow-[0px_0px_15px_4px_rgba(7,95,112,0.6)] transition-all duration-300">
      {/* Imagem de fundo opcional */}
      {/* Ajuste a lógica da imagem se necessário */}
      {/* Exemplo: <Image src={tarefa.turma.imagemUrl || "/placeholder.png"} ... /> */}
      <Image
          src={"/turmaPrancheta.png"} // Usando placeholder por enquanto
          alt="background design"
          width={100}
          height={100}
          className="absolute right-10 top-5 -z-10 rounded-[40px]"
        />

      {/* Nome da turma - Usando tarefa.turma.nome */}
      <h2 className="font-montserrat z-10 text-[26px] font-semibold text-[#616060]">
        {tarefa.turma.nome}
      </h2>

      {/* Conteúdo principal */}
      <div className="z-20 flex flex-col gap-[40px]">
        <div className="flex flex-col gap-[5px]">
          {/* Tipo - Usando tarefa.tipoAtividade */}
          <span className="font-montserrat text-[20px] font-semibold text-[#3C3C3C]">
            {tarefa.tipoAtividade} {/* Ajustado */}
          </span>
          {/* Título - Usando tarefa.titulo */}
          <p className="font-montserrat w-[362px] text-[24px] font-medium leading-[29px] text-[#3C3C3C]">
            {tarefa.titulo}
          </p>
        </div>

        {/* Data de entrega - Usando dataFormatada */}
        <div className="flex flex-col gap-[10px]">
          <span className="font-montserrat text-[18px] font-semibold text-[#3C3C3C]">
            Fecha em {dataFormatada}
          </span>
        </div>
      </div>

      {/* Botão Iniciar */}
      <Link
        href={`/fazer_tarefa/${tarefa.id}`} // Ajuste a rota se o tipo de atividade influenciar
        className="absolute bottom-[30px] right-[30px] z-30 flex rounded-full bg-[#E5EFF0] px-[20px] py-[6px] transition-colors hover:bg-opacity-80"
      >
        <span className="font-montserrat text-[21px] font-semibold text-[#075F70]">
          Iniciar tarefa
        </span>
      </Link>
    </div>
  );
}