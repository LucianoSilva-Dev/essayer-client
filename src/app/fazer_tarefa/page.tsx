// src/app/fazer_tarefa/revisar/[id]/page.tsx
import React from "react";
// ATENÇÃO: Verifique se este caminho de importação está correto na sua máquina
import RevisaoRedacaoPageContent from "@/components/fazer_tarefa/tarefarevisao/revisaoredacao/RevisaoRedacaoPage";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  return <RevisaoRedacaoPageContent tarefaId={resolvedParams.id} />;
}