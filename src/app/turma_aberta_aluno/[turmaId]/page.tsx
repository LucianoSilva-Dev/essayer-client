import TurmaAbertaAlunoPage from "@/components/turma-aberta-aluno/turma-aberta-aluno-page";

interface Props {
  params: { turmaId: string };
}

export default function Page({ params }: Props) {
  return <TurmaAbertaAlunoPage turmaId={params.turmaId} />;
}
