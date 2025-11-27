import React from "react";
import TurmaAbertaPage from "@/components/turma-aberta-prof/turma-aberta-page";

interface PageProps {
  params: Promise<{
    turmaId: string;
  }>;
}

export default async function TurmaAbertaProfessorPage({ params }: PageProps) {
  // Aguarda a resolução dos parâmetros (obrigatório no Next.js 15)
  const { turmaId } = await params;

  return <TurmaAbertaPage turmaId={turmaId} />;
}
