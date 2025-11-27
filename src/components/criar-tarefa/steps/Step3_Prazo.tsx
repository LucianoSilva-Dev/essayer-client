"use client";

import React, { useMemo } from "react";
import { useCreateTask } from "../CreateTaskContext";
import { CalendarWidget } from "../common/CalendarWidget";
import { TimeSelector } from "../common/TimeSelector";

export function Step3_Prazo() {
  const { taskData, updateTaskData, nextStep } = useCreateTask();

  // MOCK: Datas ocupadas (Para testar as bolinhas, use dias do MÊS ATUAL)
  const datesWithTasks = useMemo(() => {
      const today = new Date();
      return [
        new Date(today.getFullYear(), today.getMonth(), 10), // Dia 10 deste mês
        new Date(today.getFullYear(), today.getMonth(), 15), // Dia 15 deste mês
        new Date(today.getFullYear(), today.getMonth(), 25), // Dia 25 deste mês
      ];
  }, []);

  return (
    <div className="w-full max-w-[1200px] mx-auto pb-32 relative animate-in fade-in slide-in-from-right-8 duration-500">
      
      <div className="flex flex-col xl:flex-row gap-8 items-start">
        
        {/* Lado Esquerdo: Calendário Customizado */}
        <div className="flex-1 w-full">
            <CalendarWidget 
                selectedDate={taskData.dataEntrega}
                onSelectDate={(date) => updateTaskData({ dataEntrega: date })}
                daysWithTasks={datesWithTasks}
            />
        </div>

        {/* Lado Direito: Controles Flutuantes */}
        <div className="xl:w-auto w-full flex flex-col gap-8 xl:sticky xl:top-10 z-20 items-center xl:items-end">
            
            {/* Seletor de Horário Novo */}
            <TimeSelector 
                value={taskData.horaEntrega}
                onChange={(val) => updateTaskData({ horaEntrega: val })}
            />

            {/* Botão Final de Ação */}
            <button 
                onClick={nextStep}
                disabled={!taskData.dataEntrega} 
                className={`
                    bg-[#075F70] rounded-[30px] px-8 py-4 w-[341px] flex items-center justify-center shadow-lg transition-all transform
                    ${taskData.dataEntrega 
                        ? "hover:bg-[#064d5c] hover:scale-105 cursor-pointer opacity-100" 
                        : "opacity-50 cursor-not-allowed"}
                `}
            >
                <span className="font-montserrat font-medium text-[25px] text-white">
                    Confirmar data e horário
                </span>
            </button>

        </div>
      </div>
    </div>
  );
}
