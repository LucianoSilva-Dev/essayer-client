import React from "react";
import { RevisaoRedacaoPage }  from "@/modules/fazer-tarefa/revisar/components/content";

export const metadata = {
  title: 'Revisar Redação',
};

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  return <RevisaoRedacaoPage id={resolvedParams.id} />;
}