// src/app/fazer_tarefa/[id]/page.tsx
import React from "react";
import { RedacaoPage } from "@/components/fazer_tarefa/editor/RedacaoPage";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  return <RedacaoPage id={resolvedParams.id} />;
}