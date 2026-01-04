"use client";

import React from "react";
import { useCreateTask } from "../../context";
import { cn } from "@/shared/utils/cn";
import { MousePointerClick, Lock } from "lucide-react"; // Importei o Lock para dar um charme extra

const steps = [
  { id: 1, label: "Eixo temático" },
  { id: 2, label: "Tema e Texto motivacional" },
  { id: 3, label: "Prazo de entrega" },
  { id: 4, label: "Duração e descrição" },
  { id: 5, label: "Revisão" },
];

export function Stepper() {
  const { currentStep, setStep, canNavigateToStep } = useCreateTask();

  return (
    <div className="w-full max-w-[1165px] mx-auto mb-4 px-4 flex flex-col gap-6">
      
      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="font-montserrat font-normal text-[24px] md:text-[26px] text-[#616060] leading-tight">
          Complete a trilha para publicar a tarefa
        </h2>
        
        <div className="flex items-center gap-2 bg-teal-50 border border-teal-100 px-4 py-1.5 rounded-full self-start md:self-auto transition-colors hover:bg-teal-100/80">
          <MousePointerClick className="w-4 h-4 text-[#075F70]" />
          <span className="text-xs font-medium text-[#075F70] uppercase tracking-wide">
            Navegação interativa disponível
          </span>
        </div>
      </div>

      {/* Linha do Tempo */}
      <div className="relative flex items-center justify-between w-full mt-4">
        {steps.map((step, index) => {
          const isCompleted = step.id < currentStep;
          const isActive = step.id === currentStep;
          
          // Verifica se o passo está "Destravado"
          // O passo 1 está sempre destravado.
          // Os outros dependem da validação dos anteriores.
          const isUnlocked = canNavigateToStep ? canNavigateToStep(step.id) : true;
          
          // Se não estiver destravado, consideramos bloqueado
          const isLocked = !isUnlocked;

          return (
            <React.Fragment key={step.id}>
              {/* Passo Clicável */}
              <button
                onClick={() => setStep(step.id)}
                className={cn(
                  "flex flex-col items-center relative z-10 group focus:outline-none transition-all duration-300",
                  // Se estiver bloqueado, reduz a opacidade geral do botão
                  isLocked ? "opacity-40 hover:opacity-60 cursor-not-allowed" : "cursor-pointer"
                )}
                type="button"
                title={isLocked ? `Complete os passos anteriores para acessar ${step.label}` : `Ir para ${step.label}`}
              >
                
                {/* O Círculo */}
                <div
                  className={cn(
                    "w-[50px] h-[50px] rounded-full flex items-center justify-center transition-all duration-300 shadow-md border-2 relative",
                    
                    // ESTADO 1: ATIVO (Destaque total)
                    isActive 
                      ? "bg-[#075F70] border-[#075F70] text-white ring-4 ring-[#075F70]/20 scale-110 z-20" 
                      : "",

                    // ESTADO 2: COMPLETADO (Verde sólido)
                    isCompleted 
                      ? "bg-[#075F70] border-[#075F70] text-white hover:bg-[#064b57]" 
                      : "",

                    // ESTADO 3: FUTURO ACESSÍVEL (Branco, mas interativo)
                    !isActive && !isCompleted && !isLocked
                      ? "bg-white border-gray-300 text-gray-500 group-hover:border-[#075F70] group-hover:text-[#075F70] group-hover:bg-teal-50"
                      : "",

                    // ESTADO 4: BLOQUEADO (Cinza travado)
                    isLocked
                      ? "bg-gray-100 border-gray-200 text-gray-300"
                      : ""
                  )}
                >
                  {/* Se estiver bloqueado, mostra um cadeado sutil em vez do número? 
                      Ou apenas o número cinza? Vou deixar o número para manter a consistência, 
                      mas se quiser o cadeado, é só descomentar a lógica abaixo. */}
                  
                  {isLocked ? (
                     <span className="font-montserrat font-bold text-[20px] md:text-[24px]">
                        {step.id} 
                     </span>
                     // <Lock className="w-5 h-5" /> // Opção com ícone de cadeado
                  ) : (
                    <span className="font-montserrat font-bold text-[20px] md:text-[24px]">
                      {step.id}
                    </span>
                  )}

                  {/* Badge de Cadeado Flutuante (Opcional, dá um toque bem 'gamefication') */}
                  {isLocked && (
                    <div className="absolute -top-1 -right-1 bg-gray-200 rounded-full p-1 border border-white">
                        <Lock className="w-3 h-3 text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Label (Texto abaixo) */}
                <span
                  className={cn(
                    "absolute top-[60px] text-center font-montserrat text-[13px] md:text-[14px] font-medium leading-tight w-[140px] transition-all duration-300",
                    isActive 
                      ? "text-[#075F70] font-bold translate-y-1" 
                      : isLocked 
                        ? "text-gray-300" // Texto bem apagado se bloqueado
                        : "text-[#898787] group-hover:text-[#075F70]"
                  )}
                  style={{ 
                    left: "50%", 
                    transform: isActive ? "translateX(-50%) translateY(4px)" : "translateX(-50%)" 
                  }}
                >
                  {step.label}
                </span>
              </button>

              {/* Linha Conectora */}
              {index < steps.length - 1 && (
                <div className="flex-1 mx-2 md:mx-4 relative h-[2px] bg-gray-200 rounded-full overflow-hidden">
                    <div 
                        className={cn(
                            "absolute top-0 left-0 h-full w-full transition-transform duration-500 origin-left bg-[#075F70]",
                            // A linha só preenche se o passo foi completado
                            step.id < currentStep ? "scale-x-100" : "scale-x-0"
                        )}
                    />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
      
      <div className="h-6" />
    </div>
  );
}