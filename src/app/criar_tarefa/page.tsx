import React from "react";
import CreateTaskWrapper from "@/components/criar-tarefa/CreateTaskWrapper";
// REMOVA ESTA LINHA: import Header from "@/components/header"; 

interface PageProps {
  params: {
    turmaId: string;
  };
}

export default async function CriarTarefaPage({ params }: PageProps) {
  const { turmaId } = await params;

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20"> {/* Ajustei a cor de fundo para o cinza do design */}
      {/* REMOVA ESTA LINHA: <Header /> */}
      
      {/* Adicione padding-top (pt-24 ou mais) se o header fixo do layout cobrir o conteúdo */}
      <main className="container mx-auto pt-8 px-4 max-w-6xl"> 
        <CreateTaskWrapper turmaId={turmaId} />
      </main>
    </div>
  );
}
