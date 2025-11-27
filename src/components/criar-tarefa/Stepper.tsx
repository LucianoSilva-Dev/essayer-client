"use client";

import React from "react";
import { useCreateTask } from "./CreateTaskContext";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, label: "Eixo temático" },
  { id: 2, label: "Tema e Texto motivacional" }, // Texto ajustado conforme imagem
  { id: 3, label: "Prazo de entrega" },
  { id: 4, label: "Duração e descrição" },
  { id: 5, label: "Revisão" },
];

export function Stepper() {
  const { currentStep } = useCreateTask();

  return (
    <div className="w-full max-w-[1165px] mx-auto mb-12 px-4 flex flex-col gap-10">
      
      {/* Título do Stepper conforme Figma */}
      <h2 className="font-montserrat font-normal text-[25px] leading-[30px] text-[#616060]">
        Complete a trilha para publicar a tarefa
      </h2>

      <div className="relative flex items-center justify-between w-full">
        {steps.map((step, index) => {
          // Lógica de Ativo/Inativo
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep;
          // No design, se está completado ou ativo, usa a cor Teal. Se futuro, usa Branco/Cinza.
          const isActiveOrCompleted = step.id <= currentStep;

          return (
            <React.Fragment key={step.id}>
              {/* O Passo (Círculo + Label) */}
              <div className="flex flex-col items-center relative z-10 group">
                
                {/* Círculo */}
                <div
                  className={cn(
                    "w-[50px] h-[50px] rounded-full flex items-center justify-center transition-all duration-300 shadow-[0px_4px_4px_rgba(0,0,0,0.25)]",
                    // Estilo Ativo/Completado (Figma State 1)
                    isActiveOrCompleted
                      ? "bg-[#075F70] text-[#E5EFF0]"
                      : "bg-white text-black", // Figma State 2
                  )}
                >
                  <span className="font-montserrat font-medium text-[35px] leading-[43px]">
                    {step.id}
                  </span>
                </div>

                {/* Label (Texto abaixo) */}
                <span
                  className={cn(
                    "absolute -bottom-10 text-center font-montserrat font-medium text-[15px] leading-[18px] whitespace-nowrap w-[150px]",
                    isActiveOrCompleted ? "text-[#075F70]" : "text-[#898787]"
                  )}
                  style={{ 
                    // Ajuste fino para labels longas ficarem centralizadas
                    left: "50%", 
                    transform: "translateX(-50%)" 
                  }}
                >
                  {step.label}
                </span>
              </div>

              {/* Linha Conectora (Não renderiza após o último passo) */}
              {index < steps.length - 1 && (
                <div 
                    className={cn(
                        "flex-1 h-0 border-t-[5px] transition-colors duration-300 mx-2",
                        // Se o PRÓXIMO passo já foi alcançado, a linha é colorida.
                        // Ex: Se estou no passo 2, a linha entre 1 e 2 é colorida.
                        step.id < currentStep 
                            ? "border-[#075F70]" 
                            : "border-[#898787]"
                    )} 
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
      
      {/* Espaço extra para as labels não cortarem */}
      <div className="h-6" />
    </div>
  );
}
