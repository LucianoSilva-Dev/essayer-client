"use client";

import React from "react";
import { useCreateTask } from "../../context";
import { Minus, Plus, Hourglass, AlignLeft, Info } from "lucide-react";
import { cn } from "@/shared/utils/cn";

// --- Widget do Timer Reformulado ---
function TimerWidget({ value, onChange }: { value: number, onChange: (v: number) => void }) {
  const MIN = 30;
  const MAX = 180;
  const STEP = 10;

  const handleIncrement = () => {
    if (value < MAX) onChange(Math.min(MAX, value + STEP));
  };

  const handleDecrement = () => {
    if (value > MIN) onChange(Math.max(MIN, value - STEP));
  };

  // Cálculo visual de horas e minutos
  const hours = Math.floor(value / 60);
  const minutes = value % 60;
  
  const displayTime = hours > 0 
    ? `${hours}h ${minutes > 0 ? minutes + 'min' : ''}` 
    : `${minutes}min`;

  return (
    <div className="bg-white rounded-[30px] p-8 shadow-lg border border-gray-100 flex flex-col items-center justify-center gap-6 relative overflow-hidden w-full h-[320px] group hover:border-[#075F70]/30 transition-all duration-300">
        
        {/* Cabeçalho do Card */}
        <div className="flex items-center gap-2 text-gray-400 group-hover:text-[#075F70] transition-colors mb-2">
            <Hourglass size={24} />
            <span className="font-montserrat font-bold text-sm uppercase tracking-widest">
                Tempo de Prova
            </span>
        </div>

        {/* Display Digital Central */}
        <div className="flex items-center justify-between w-full px-4 xl:px-8">
            
            {/* Botão Menos */}
            <button 
                onClick={handleDecrement}
                disabled={value <= MIN}
                className={cn(
                    "w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all",
                    value <= MIN 
                        ? "border-gray-100 text-gray-200 cursor-not-allowed" 
                        : "border-gray-200 text-gray-400 hover:border-[#075F70] hover:text-[#075F70] hover:bg-[#075F70]/5 active:scale-95"
                )}
            >
                <Minus size={28} />
            </button>

            {/* Valor */}
            <div className="flex flex-col items-center">
                <span className="font-montserrat font-bold text-[64px] text-[#3C3C3C] leading-none tabular-nums">
                    {value}
                </span>
                <span className="text-sm font-bold text-[#075F70] uppercase tracking-widest mt-2 bg-teal-50 px-4 py-1.5 rounded-full">
                    Minutos
                </span>
                <span className="text-xs text-gray-400 mt-3 font-medium">
                    ({displayTime})
                </span>
            </div>

            {/* Botão Mais */}
            <button 
                onClick={handleIncrement}
                disabled={value >= MAX}
                className={cn(
                    "w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all",
                    value >= MAX 
                        ? "border-gray-100 text-gray-200 cursor-not-allowed" 
                        : "border-gray-200 text-gray-400 hover:border-[#075F70] hover:text-[#075F70] hover:bg-[#075F70]/5 active:scale-95"
                )}
            >
                <Plus size={28} />
            </button>
        </div>

        {/* Barra de Progresso Visual */}
        <div className="w-full max-w-[200px] h-1.5 bg-gray-100 rounded-full mt-4 overflow-hidden">
            <div 
                className="h-full bg-[#075F70] transition-all duration-500 ease-out rounded-full"
                style={{ width: `${((value - MIN) / (MAX - MIN)) * 100}%` }}
            />
        </div>
        
        {/* REMOVIDO: O texto de "Mínimo: 30min..." foi retirado conforme pedido */}
    </div>
  );
}

// --- Componente Principal ---
export function Step4_Info() {
  const { taskData, updateTaskData } = useCreateTask();

  return (
    <div className="w-full max-w-6xl mx-auto pb-20 flex flex-col gap-12 animate-in fade-in slide-in-from-right-8 duration-500 px-4">
      
      <div className="text-center space-y-3 mb-4">
         <h2 className="font-montserrat font-bold text-[35px] text-[#3C3C3C]">
            Detalhes Finais
         </h2>
         <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Defina o tempo de duração da prova e forneça instruções claras para orientar seus alunos.
         </p>
      </div>

      {/* Grid com items-stretch para garantir altura igual */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          
          {/* === COLUNA 1: DURAÇÃO === */}
          <div className="flex flex-col gap-4 h-full">
              <div className="flex flex-col gap-2 min-h-[80px]"> {/* Altura mínima para alinhar textos */}
                  <h3 className="font-montserrat font-bold text-2xl text-[#075F70] flex items-center gap-2">
                      <Hourglass className="w-6 h-6" />
                      Duração da Tarefa
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                      Tempo disponível no cronômetro para o aluno. O envio fecha automaticamente ao término.
                  </p>
              </div>
              
              {/* Widget preenchendo a altura */}
              <div className="flex-1 w-full">
                 <TimerWidget 
                    value={taskData.duracao} 
                    onChange={(v) => updateTaskData({ duracao: v })} 
                 />
              </div>
          </div>

          {/* === COLUNA 2: DESCRIÇÃO === */}
          <div className="flex flex-col gap-4 h-full">
              <div className="flex flex-col gap-2 min-h-[80px]">
                  <h3 className="font-montserrat font-bold text-2xl text-[#075F70] flex items-center gap-2">
                      <AlignLeft className="w-6 h-6" />
                      Descrição e Instruções
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                      Use este espaço para explicar critérios de avaliação, regras específicas ou dicas para a execução.
                  </p>
              </div>

              {/* Textarea com a mesma altura do Timer (h-[320px]) */}
              <div className="bg-white rounded-[30px] p-6 shadow-lg border border-gray-100 relative group focus-within:border-[#075F70] focus-within:ring-4 focus-within:ring-[#075F70]/10 transition-all h-[320px]">
                  <textarea
                      value={taskData.descricao}
                      onChange={(e) => updateTaskData({ descricao: e.target.value })}
                      placeholder="Ex: Prezada turma, para esta redação, foquem na competência 3. Lembrem-se de citar ao menos um repertório sociocultural..."
                      className={cn(
                          "w-full h-full resize-none outline-none bg-transparent",
                          "font-montserrat text-base text-[#3C3C3C] leading-relaxed",
                          "placeholder:text-gray-300 scrollbar-thin scrollbar-thumb-gray-200 pr-2"
                      )}
                  />
                  
                  <div className="absolute bottom-6 right-6 pointer-events-none opacity-50 group-focus-within:opacity-100 transition-opacity">
                      <div className="bg-gray-50 px-3 py-1 rounded-full border border-gray-100 text-xs font-bold text-[#075F70] flex items-center gap-2">
                          <Info size={12} />
                          {taskData.descricao.length} caracteres
                      </div>
                  </div>
              </div>
          </div>

      </div>
    </div>
  );
}