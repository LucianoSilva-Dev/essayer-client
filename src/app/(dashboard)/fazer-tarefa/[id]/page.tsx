import React from "react";
import { RevisaoRedacaoPage }  from "@/modules/fazer-tarefa/revisar/components/content";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  return <RevisaoRedacaoPage id={resolvedParams.id} />;
}