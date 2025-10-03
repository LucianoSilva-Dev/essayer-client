import TurmaAbertaPage from "../../../components/turma-aberta-prof/turma-aberta-page";

interface PageProps {
  params: {
    id: string;
  };
}

export default function Page({ params }: PageProps) {
  return <TurmaAbertaPage turmaId={params.id} />;
}
