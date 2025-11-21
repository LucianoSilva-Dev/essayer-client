// src/app/fazer_tarefa/tarefa/[id]/page.tsx
import React from "react";
// ATENÇÃO: Verifique se este caminho aponta para onde você criou o componente do Editor
import RedacaoTarefaPageContent from "@/components/fazer_tarefa/fazertarefa/redacao/RedacaoTarefaPage";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  return <RedacaoTarefaPageContent tarefaId={resolvedParams.id} />;
}