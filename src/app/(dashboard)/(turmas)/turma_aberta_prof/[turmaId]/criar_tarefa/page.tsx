import React from "react";
import CreateTaskWrapper from "@/modules/turmas/criar-tarefas/components/wrapper";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    turmaId: string;
  }>;
}

export default async function CriarTarefaPage({ params }: PageProps) {
  // Captura o ID da URL automaticamente
  const { turmaId } = await params;

  if (!turmaId) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      <main className="container mx-auto pt-8 px-4 max-w-6xl"> 
        {/* Passamos o ID da turma diretamente para o Wrapper */}
        <CreateTaskWrapper turmaId={turmaId} />
      </main>
    </div>
  );
}
