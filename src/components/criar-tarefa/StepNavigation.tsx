// src/components/turmas-professor/criar-tarefa/StepNavigation.tsx
"use client";

import React from "react";
import { useCreateTask } from "./CreateTaskContext";
import { Button } from "@/components/landing/ui/button"; // Ou seu componente de botão padrão
import { ArrowRight, ArrowLeft } from "lucide-react";

export function StepNavigation() {
  const { currentStep, totalSteps, nextStep, prevStep } = useCreateTask();

  return (
    <div className="flex justify-between mt-12 pt-8 border-t border-gray-200">
      {/* Botão Voltar (Invisível no passo 1) */}
      <Button
        variant="outline"
        onClick={prevStep}
        disabled={currentStep === 1}
        className={`gap-2 font-montserrat ${currentStep === 1 ? "opacity-0 pointer-events-none" : ""}`}
      >
        <ArrowLeft size={18} />
        Voltar
      </Button>

      {/* Botão Próximo ou Finalizar */}
      <Button 
        onClick={nextStep}
        className="bg-[#075F70] hover:bg-[#064d5c] text-white px-8 py-6 rounded-full font-montserrat text-lg gap-2 shadow-lg hover:shadow-xl transition-all"
      >
        {currentStep === totalSteps ? "Publicar Tarefa" : "Próximo"}
        {currentStep !== totalSteps && <ArrowRight size={18} />}
      </Button>
    </div>
  );
}