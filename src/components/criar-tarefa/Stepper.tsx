// src/components/turmas-professor/criar-tarefa/Stepper.tsx
import { useCreateTask } from "./CreateTaskContext";
import { cn } from "@/lib/utils";

const STEPS_LABELS = [
  "Eixo temático",
  "Tema e Texto",
  "Prazo de entrega",
  "Duração e descrição",
  "Revisão",
];

export function Stepper() {
  const { currentStep } = useCreateTask();

  return (
    <div className="w-full max-w-[900px] mx-auto mb-16 relative">
      <div className="flex justify-between items-center relative z-10">
        {STEPS_LABELS.map((label, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber <= currentStep;
          const isCompleted = stepNumber < currentStep;

          return (
            <div key={index} className="flex flex-col items-center relative group">
              {/* Círculo do Passo */}
              <div
                className={cn(
                  "w-[50px] h-[50px] rounded-full flex items-center justify-center text-[24px] font-medium transition-all duration-300 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] border-4",
                  isActive
                    ? "bg-[#075F70] border-[#075F70] text-white"
                    : "bg-white border-white text-black"
                )}
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {stepNumber}
              </div>

              {/* Label abaixo */}
              <div
                className={cn(
                  "absolute top-[60px] w-32 text-center text-[15px] font-medium leading-[18px] transition-colors duration-300",
                  isActive ? "text-[#075F70]" : "text-[#898787]"
                )}
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Linhas de conexão (Background) */}
      <div className="absolute top-[25px] left-0 w-full h-0 z-0 flex items-center px-4">
         {/* Renderizamos linhas individuais entre os steps para controlar a cor de cada segmento */}
         {STEPS_LABELS.slice(0, -1).map((_, index) => {
             const stepNumber = index + 1;
             const isLineActive = stepNumber < currentStep;
             
             return (
                 <div 
                    key={index} 
                    className={cn(
                        "h-[5px] flex-1 transition-colors duration-500 mx-2",
                        isLineActive ? "bg-[#075F70]" : "bg-[#898787]"
                    )}
                 />
             )
         })}
      </div>
    </div>
  );
}
