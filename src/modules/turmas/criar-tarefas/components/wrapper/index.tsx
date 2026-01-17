"use client";

import React from "react";
import { CreateTaskProvider, useCreateTask } from "../../context";
import { Stepper } from "../stepper";
import { StepNavigation } from "../step-navigation";

import { Step1_Eixo } from "../steps/Step1_Eixo";
import { Step2_Detalhes } from "../steps/Step2_Detalhes";
import { Step3_Prazo } from "../steps/Step3_Prazo";
import { Step4_Info } from "../steps/Step4_Info";
import { Step5_Revisao } from "../steps/Step5_Revisao";

function StepContentManager() {
  const { currentStep } = useCreateTask();

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: return <Step1_Eixo />;
      case 2: return <Step2_Detalhes />;
      case 3: return <Step3_Prazo />;
      case 4: return <Step4_Info />;
      case 5: return <Step5_Revisao />;
      default: return <Step1_Eixo />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto w-full flex flex-col min-h-screen">
      
      {/* 1. Header Fixo: Título + Stepper */}
      <div className="pt-8 px-4 mb-0">
        <h1 className="text-3xl font-bold text-neutral-dark mb-4 font-montserrat pl-4">
          Criar nova tarefa
        </h1>
        <Stepper />
      </div>

      {/* 2. Área de Conteúdo Dinâmica */}
      {/* AJUSTE: Aumentado de mt-2 para mt-10 para dar mais respiro */}
      <div className="flex-1 px-4 mt-12 min-h-[500px]">
        {renderStepContent()}
      </div>

      {/* 3. Rodapé de Navegação */}
      <div className="pb-12 px-4">
        <StepNavigation />
      </div>
    </div>
  );
}

export default function CreateTaskWrapper({ turmaId }: { turmaId: string }) {
  return (
    <CreateTaskProvider turmaId={turmaId}>
      <StepContentManager />
    </CreateTaskProvider>
  );
}