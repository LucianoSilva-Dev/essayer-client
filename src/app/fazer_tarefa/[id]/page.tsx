// src/app/fazer_tarefa/[id]/page.tsx
import React from "react";
import { RevisaoRedacaoPage }  from "@/components/fazer_tarefa/tarefarevisao/revisaoredacao/RevisaoRedacaoPage";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  return <RevisaoRedacaoPage id={resolvedParams.id} />;
}