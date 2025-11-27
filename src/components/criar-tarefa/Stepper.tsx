"use client";

import React from "react";
import { useCreateTask } from "./CreateTaskContext";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const steps = [
  { id: 1, label: "Eixo" },
  { id: 2, label: "Detalhes" },
  { id: 3, label: "Prazo" },
  { id: 4, label: "Instruções" },
  { id: 5, label: "Revisão" },
];

export function Stepper() {
  const { currentStep, setStep } = useCreateTask();

  return (
    <div className="w-full max-w-5xl mx-auto mb-8 px-4">
      <div className="relative flex items-center justify-between">
        
        {/* Linha de Conexão de Fundo */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 rounded-full -z-10" />
        
        {/* Linha de Progresso Ativa (Calculada dinamicamente) */}
        <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#075F70] rounded-full -z-10 transition-all duration-500 ease-in-out"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step) => {
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep;
          const isClickable = step.id < currentStep; // Permite voltar apenas para passos já visitados

          return (
            <div 
                key={step.id} 
                className="flex flex-col items-center gap-2 relative group"
            >
                {/* Círculo do Passo */}
                <button
                    onClick={() => isClickable && setStep(step.id)}
                    disabled={!isClickable}
                    className={cn(
                        "w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border-[3px] transition-all duration-300 bg-white",
                        isActive 
                            ? "border-[#075F70] scale-110 shadow-lg" 
                            : isCompleted 
                                ? "border-[#075F70] bg-[#075F70] text-white" 
                                : "border-gray-300 text-gray-300",
                        isClickable && "cursor-pointer hover:scale-105"
                    )}
                >
                    {isCompleted ? (
                        <Check size={20} strokeWidth={3} />
                    ) : (
                        <span className={cn(
                            "text-sm md:text-lg font-bold font-montserrat",
                            isActive ? "text-[#075F70]" : "text-gray-300"
                        )}>
                            {step.id}
                        </span>
                    )}
                </button>

                {/* Label do Passo */}
                <span className={cn(
                    "absolute -bottom-8 text-xs md:text-sm font-medium font-montserrat whitespace-nowrap transition-colors duration-300",
                    isActive ? "text-[#075F70] font-bold" : "text-gray-400"
                )}>
                    {step.label}
                </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
