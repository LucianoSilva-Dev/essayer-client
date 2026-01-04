"use client";

import React from "react";
import { useCreateTask } from "../../context";
import { Button } from "@/modules/landing/styles/ui/button"; 
import { ArrowRight, ArrowLeft, Loader2, Check } from "lucide-react";
import { cn } from "@/shared/utils/cn";

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
    <div className="flex justify-between items-center mt-4 pt-6 border-t border-gray-100 max-w-[1165px] mx-auto w-full px-4">
      
      {/* Botão Voltar */}
      <Button
        variant="ghost"
        onClick={prevStep}
        disabled={currentStep === 1 || isSubmitting}
        className={cn(
            "group flex items-center gap-2 font-montserrat font-semibold text-lg rounded-full px-6 py-6 transition-all duration-300",
            "text-gray-400 hover:text-gray-600 hover:bg-gray-50",
             currentStep === 1 ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
      >
        <ArrowLeft 
            size={20} 
            className="transition-transform duration-300 group-hover:-translate-x-1" 
        />
        <span>Voltar</span>
      </Button>

      {/* Botão Próximo / Publicar */}
      <Button 
        onClick={handleNextClick}
        disabled={isSubmitting}
        className={cn(
            "group relative overflow-hidden h-[56px] rounded-full px-8 shadow-md hover:shadow-xl transition-all duration-300",
            "bg-[#075F70] hover:bg-[#054a57] text-white min-w-[160px]",
            "font-montserrat font-bold text-lg tracking-wide"
        )}
      >
        {isSubmitting ? (
             <div className="flex items-center gap-2">
                <Loader2 className="animate-spin" size={20} />
                <span>Processando...</span>
             </div>
        ) : isLastStep ? (
             <div className="flex items-center gap-3">
                <span>Publicar Tarefa</span>
                <Check className="w-5 h-5 transition-transform group-hover:scale-125" />
             </div>
        ) : (
             // Animação Ajustada
             <div className="relative flex items-center justify-center w-full h-full">
                {/* Texto: Desliza para esquerda */}
                <span className="transition-transform duration-300 group-hover:-translate-x-4">
                    Próximo
                </span>
                
                {/* Seta: 
                    - absolute -right-4: Empurra a seta para dentro da área de padding do botão (mais para a direita da pill)
                    - opacity-0: Começa invisível
                    - transition-opacity: Apenas fade-in, fixa no lugar
                */}
                <ArrowRight 
                    size={22} 
                    className="absolute -right-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
             </div>
        )}
      </Button>
    </div>
  );
}