import TurmaAbertaAlunoPage from "@/modules/turmas/turmas-aberta-aluno/components/content";

interface Props {
  params: Promise<{ turmaId: string }>;
}

export default async function Page({ params }: Props) {
  const awaitedParams = await params;
  return <TurmaAbertaAlunoPage turmaId={awaitedParams.turmaId} />;
}
