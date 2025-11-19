import { FazerTarefaContent } from "@/components/fazer_tarefa/fazertarefa/redacao/RedacaoTarefaPage";

interface Props {
  params: { id: string };
}

export default function FazerTarefa({ params }: Props) {
  const awaitedParams = params;
  return <FazerTarefaContent id={awaitedParams.id} />;
}