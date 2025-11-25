"use client";

import React from "react";
import { CreateTaskProvider, useCreateTask } from "./CreateTaskContext";
import { Stepper } from "./Stepper";
import { StepNavigation } from "./StepNavigation";

// Importação dos seus passos (Componentes que criamos)
import { Step1_Eixo } from "./steps/Step1_Eixo";
import { Step2_Detalhes } from "./steps/Step2_Detalhes";

// Componente interno que gerencia qual tela mostrar
function StepContentManager() {
  const { currentStep } = useCreateTask();

  // Esta função escolhe o que renderizar baseado no número do passo
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <Step1_Eixo />;
      case 2:
        return <Step2_Detalhes />;
      case 3:
        return (
          <div className="h-64 flex items-center justify-center bg-white rounded-3xl shadow-sm border">
            <p className="text-gray-500 font-montserrat">Passo 3: Prazo de entrega (Em construção)</p>
          </div>
        );
      case 4:
        return (
          <div className="h-64 flex items-center justify-center bg-white rounded-3xl shadow-sm border">
            <p className="text-gray-500 font-montserrat">Passo 4: Duração e descrição (Em construção)</p>
          </div>
        );
      case 5:
        return (
          <div className="h-64 flex items-center justify-center bg-white rounded-3xl shadow-sm border">
            <p className="text-gray-500 font-montserrat">Passo 5: Revisão (Em construção)</p>
          </div>
        );
      default:
        return <Step1_Eixo />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto w-full">
      {/* 1. O Stepper fica fixo no topo */}
      <h1 className="text-3xl font-bold text-[#3C3C3C] mb-8 font-montserrat pl-4">
        Criar nova tarefa
      </h1>
      
      <Stepper />

      {/* 2. A ÁREA DINÂMICA: Aqui é onde a "página" muda */}
      <div className="mt-12 min-h-[600px]">
        {renderStepContent()}
      </div>

      {/* 3. A Navegação (Botões Voltar/Próximo) fica fixa embaixo */}
      <StepNavigation />
    </div>
  );
}

// Componente Principal exportado para a page.tsx
export default function CreateTaskWrapper({ turmaId }: { turmaId: string }) {
  return (
    // O Provider envolve tudo para que todos os passos acessem os dados
    <CreateTaskProvider>
      <StepContentManager />
    </CreateTaskProvider>
  );
}
