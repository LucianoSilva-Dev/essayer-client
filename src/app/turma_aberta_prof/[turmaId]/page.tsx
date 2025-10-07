// src/app/turma_aberta_aluno/[turmaId]/page.tsx
import TurmaAbertaPage from "@/components/turma-aberta-prof/turma-aberta-page";

export default function TurmaAbertaProfessorPage({ params }: { params: { turmaId: string } }) {
  return <TurmaAbertaPage turmaId={params.turmaId} />;
}
