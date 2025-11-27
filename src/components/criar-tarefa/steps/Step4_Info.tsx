"use client";

import React from "react";
import { useCreateTask } from "../CreateTaskContext";
import { Minus, Plus, Check } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Widget do Timer (Estilo Figma) ---
function TimerWidget({ value, onChange }: { value: number, onChange: (v: number) => void }) {
  const handleIncrement = () => onChange(value + 5);
  const handleDecrement = () => onChange(Math.max(5, value - 5));

  return (
    <div className="relative group">
        {/* Card Principal */}
        <div className="bg-white rounded-[30px] rounded-br-[10px] w-[460px] h-[160px] flex items-center justify-center gap-8 shadow-xl border border-gray-100 relative z-0">
            
            {/* Botão Menos */}
            <button 
                onClick={handleDecrement}
                className="w-[50px] h-[50px] flex items-center justify-center hover:bg-gray-50 rounded-full transition-colors active:scale-95"
                type="button"
            >
                <Minus size={50} className="text-[#3C3C3C]" strokeWidth={2.5} />
            </button>

            {/* Display de Tempo */}
            <div className="flex flex-col items-center justify-center w-[122px]">
                <span className="font-montserrat font-semibold text-[90px] leading-[90px] text-[#3C3C3C] select-none">
                    {value.toString().padStart(2, '0')}
                </span>
                <span className="font-montserrat font-semibold text-[40px] leading-[40px] text-[#616060] select-none">
                    min
                </span>
            </div>

            {/* Botão Mais */}
            <button 
                onClick={handleIncrement}
                className="w-[50px] h-[50px] flex items-center justify-center hover:bg-gray-50 rounded-full transition-colors active:scale-95"
                type="button"
            >
                <Plus size={50} className="text-[#3C3C3C]" strokeWidth={2.5} />
            </button>
        </div>

        {/* Botão de Confirmação (Check Verde Flutuante) */}
        <div className="absolute top-[100px] left-[385px] z-10">
           <div className="w-[40px] h-[40px] bg-[#075F70] rounded-full flex items-center justify-center shadow-md">
               <Check size={20} className="text-white" strokeWidth={4} />
           </div>
        </div>
    </div>
  );
}

// --- Componente Principal ---
export function Step4_Info() {
  const { taskData, updateTaskData } = useCreateTask();

  return (
    <div className="w-full max-w-[1300px] mx-auto pb-32 flex flex-col gap-16 items-center relative animate-in fade-in slide-in-from-right-8 duration-500">
      
      {/* === LINHA 1: DURAÇÃO === */}
      <div className="flex flex-col xl:flex-row items-center justify-between w-full gap-10 xl:px-10">
          
          {/* Texto Esquerda */}
          <div className="flex flex-col gap-4 max-w-[550px] text-center xl:text-left">
              <h2 className="font-montserrat font-medium text-[50px] text-[#075F70] leading-[61px]">
                  Duração
              </h2>
              <p className="font-montserrat font-normal text-[30px] md:text-[35px] text-[#3C3C3C] leading-[43px]">
                  Configure o tempo de duração que a tarefa terá para ser concluída.
              </p>
          </div>

          {/* Widget Direita */}
          <div className="xl:mr-10">
              <TimerWidget 
                  value={taskData.duracao} 
                  onChange={(v) => updateTaskData({ duracao: v })} 
              />
          </div>
      </div>

      {/* === LINHA 2: DESCRIÇÃO === */}
      <div className="flex flex-col-reverse xl:flex-row items-center justify-between w-full gap-10 xl:px-10">
          
          {/* Widget Esquerda (Textarea) */}
          <div className="xl:ml-10">
              <div className="bg-white rounded-[30px] rounded-tr-[10px] w-[500px] h-[200px] p-6 shadow-xl border border-gray-100 relative group focus-within:ring-2 ring-[#075F70]/20 transition-all">
                  <textarea
                      value={taskData.descricao}
                      onChange={(e) => updateTaskData({ descricao: e.target.value })}
                      placeholder="Descreva algo aqui"
                      className={cn(
                          "w-full h-full resize-none outline-none bg-transparent",
                          "font-montserrat font-light text-[20px] text-[#3C3C3C]",
                          "placeholder:text-[#898787] placeholder:italic placeholder:font-light",
                          // Centraliza o texto se estiver vazio (placeholder), senão alinha topo-esquerda
                          !taskData.descricao ? "text-center pt-[60px]" : "text-left pt-2"
                      )}
                  />
              </div>
          </div>

          {/* Texto Direita */}
          <div className="flex flex-col gap-4 max-w-[510px] text-center xl:text-right items-center xl:items-end">
              <h2 className="font-montserrat font-medium text-[50px] text-[#075F70] leading-[61px]">
                  Descrição
              </h2>
              <p className="font-montserrat font-normal text-[30px] text-[#3C3C3C] leading-[37px]">
                  Use a descrição para explicar os objetivos, instruções e critérios de avaliação da tarefa que será realizada pelos alunos.
              </p>
          </div>

      </div>

    </div>
  );
}
