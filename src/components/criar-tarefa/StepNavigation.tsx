// src/components/criar-tarefa/StepNavigation.tsx
"use client";

import React from "react";
import { useCreateTask } from "./CreateTaskContext";
import { Button } from "@/components/landing/ui/button"; 
import { ArrowRight, ArrowLeft, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function StepNavigation() {
  const { currentStep, totalSteps, nextStep, prevStep, submitTask, isSubmitting } = useCreateTask();

  const isLastStep = currentStep === totalSteps;

  const handleNextClick = () => {
    if (isLastStep) {
      submitTask();
    } else {
      nextStep();
    }
  };

  return (
    <div className="flex justify-between mt-8 pt-8 border-t border-gray-200 max-w-6xl mx-auto w-full">
      {/* Botão Voltar */}
      <Button
        variant="outline"
        onClick={prevStep}
        disabled={currentStep === 1 || isSubmitting}
        className={cn(
            "gap-2 font-montserrat transition-opacity duration-300",
             currentStep === 1 ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
      >
        <ArrowLeft size={18} />
        Voltar
      </Button>

      {/* Botão Próximo / Publicar */}
      <Button 
        onClick={handleNextClick}
        disabled={isSubmitting}
        className={cn(
            "px-8 py-6 rounded-full font-montserrat text-lg gap-2 shadow-lg hover:shadow-xl transition-all min-w-[160px]",
            isLastStep 
                ? "bg-[#075F70] hover:bg-[#064d5c] text-white" // Estilo do botão Publicar
                : "bg-[#075F70] hover:bg-[#064d5c] text-white"  // Estilo do botão Próximo
        )}
      >
        {isSubmitting ? (
             <>
                <Loader2 className="animate-spin" size={20} />
                Publicando...
             </>
        ) : isLastStep ? (
             <>
                Publicar Tarefa
                <Check size={20} />
             </>
        ) : (
             <>
                Próximo
                <ArrowRight size={20} />
             </>
        )}
      </Button>
    </div>
  );
}
