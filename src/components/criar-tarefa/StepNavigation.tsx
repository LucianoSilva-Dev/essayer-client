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
    <div className="flex justify-between mt-8 pt-8 border-t border-gray-200 max-w-[1165px] mx-auto w-full px-4">
      {/* Botão Voltar */}
      <Button
        variant="outline"
        onClick={prevStep}
        disabled={currentStep === 1 || isSubmitting}
        className={cn(
            "gap-2 font-montserrat font-bold text-[20px] rounded-[25px] h-[44px] px-[15px] border-none shadow-none text-[#898787] hover:text-[#434343] hover:bg-gray-100 transition-all",
             currentStep === 1 ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
      >
        <ArrowLeft size={24} />
        Voltar
      </Button>

      {/* Botão Próximo / Publicar (Estilo Figma) */}
      <Button 
        onClick={handleNextClick}
        disabled={isSubmitting}
        className={cn(
            "h-[44px] rounded-[25px] px-[20px] gap-2 shadow-lg transition-all flex items-center justify-center min-w-[185px]",
            // Tipografia Figma
            "font-montserrat font-bold text-[20px] leading-[24px]",
            
            // Cores:
            // Se for o último passo (Publicar), usa o estilo verde forte.
            // Se for passos intermediários, também mantive verde para consistência de "ação primária",
            // mas você pode mudar para cinza se preferir que o botão "Próximo" seja neutro.
            "bg-[#075F70] hover:bg-[#064d5c] text-[#E5EFF0]"
        )}
      >
        {isSubmitting ? (
             <>
                <Loader2 className="animate-spin" size={20} />
                Publicando...
             </>
        ) : isLastStep ? (
             <>
                Publicar tarefa
                {/* O ícone não está no Figma, mas é boa prática de UX. Se quiser idêntico ao Figma, remova a linha abaixo */}
                {/* <Check size={20} /> */} 
             </>
        ) : (
             <>
                Próximo
                <ArrowRight size={24} />
             </>
        )}
      </Button>
    </div>
  );
}
