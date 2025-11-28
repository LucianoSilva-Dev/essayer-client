import TurmaAbertaAlunoPage from "@/components/turma-aberta-aluno/turma-aberta-aluno-page";

interface Props {
  params: Promise<{ turmaId: string }>;
}

export default async function Page({ params }: Props) {
  const awaitedParams = await params;
  return <TurmaAbertaAlunoPage turmaId={awaitedParams.turmaId} />;
}
