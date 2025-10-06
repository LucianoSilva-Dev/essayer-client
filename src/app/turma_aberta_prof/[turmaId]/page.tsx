"use client";

import { useParams } from "next/navigation";
import TurmaAbertaPage from "@/components/turma-aberta-prof/turma-aberta-page";

export default function TurmaAbertaProfPage() {
  const { turmaId } = useParams();

  if (!turmaId) {
    return <div>Carregando turma...</div>;
  }

  return <TurmaAbertaPage turmaId={turmaId as string} />;
}
