// src/app/turma_aberta_aluno/[turmaId]/page.tsx
import TurmaAbertaPage from "@/components/turma-aberta-prof/turma-aberta-page";

export default async function TurmaAbertaProfessorPage({ params }: { params: { turmaId: string } }) {
  const resolvedParams = await params;
  return <TurmaAbertaPage turmaId={resolvedParams.turmaId} />;
}
