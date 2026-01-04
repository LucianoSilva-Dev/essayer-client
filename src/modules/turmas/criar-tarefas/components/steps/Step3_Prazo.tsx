"use client";

import React, { useState, useEffect } from "react";
import { useCreateTask } from "../../context";
import { CalendarWidget } from "../../common/CalendarWidget";
import { TimeSelector } from "../../common/TimeSelector";
import { ArrowRight } from "lucide-react";
import { isSameDay, isBefore, setHours, setMinutes } from "date-fns";
import { cn } from "@/shared/utils/cn"; 

export function Step3_Prazo() {
  const { taskData, updateTaskData, nextStep } = useCreateTask();
  const [isTimeInvalid, setIsTimeInvalid] = useState(false);

  // Validação em Tempo Real
  const handleTimeChange = (newTime: string) => {
      updateTaskData({ horaEntrega: newTime });

      if (!taskData.dataEntrega) return;

      const now = new Date();
      
      if (isSameDay(taskData.dataEntrega, now)) {
          const [newH, newM] = newTime.split(":").map(Number);
          const newDateTime = setMinutes(setHours(now, newH), newM);

          if (isBefore(newDateTime, new Date(now.getTime() - 60000))) {
              setIsTimeInvalid(true);
              return;
          }
      }
      setIsTimeInvalid(false);
  };

  const handleDateChange = (date: Date) => {
      updateTaskData({ dataEntrega: date });
      
      const now = new Date();
      if (isSameDay(date, now)) {
           const [h, m] = taskData.horaEntrega.split(":").map(Number);
           const currentSetTime = setMinutes(setHours(now, h), m);
           if (isBefore(currentSetTime, new Date(now.getTime() - 60000))) {
               setIsTimeInvalid(true);
           } else {
               setIsTimeInvalid(false);
           }
      } else {
          setIsTimeInvalid(false);
      }
  }

  const handleNext = () => {
      if (!isTimeInvalid && taskData.dataEntrega) {
          nextStep();
      }
  };

  return (
    <div className="w-full max-w-6xl mx-auto pb-20 relative animate-in fade-in slide-in-from-right-8 duration-500">
      
      <div className="flex flex-col gap-4 mb-8 text-center lg:text-left">
         <h2 className="font-montserrat font-bold text-[35px] text-[#3C3C3C] leading-tight">
            Quando deve ser entregue?
         </h2>
         <p className="text-gray-500 text-lg">
            Defina a data e o horário limite para os alunos enviarem a redação.
         </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Lado Esquerdo: Calendário */}
        <div className="flex-1 w-full">
            <CalendarWidget 
                selectedDate={taskData.dataEntrega}
                onSelectDate={handleDateChange}
                daysWithTasks={[]} // Lista vazia para não mostrar bolinhas
            />
        </div>

        {/* Lado Direito: Horário e Resumo */}
        <div className="w-full lg:w-[380px] flex flex-col gap-6 lg:sticky lg:top-8">
            
            <TimeSelector 
                value={taskData.horaEntrega}
                onChange={handleTimeChange}
                hasError={isTimeInvalid}
            />

            {/* Card de Resumo */}
            <div className={cn(
                "rounded-[30px] p-6 border transition-colors duration-300",
                isTimeInvalid 
                    ? "bg-red-50 border-red-100" 
                    : "bg-[#E5EFF0] border-[#075F70]/10"
            )}>
                <h4 className={cn(
                    "font-montserrat font-bold text-sm uppercase mb-2",
                    isTimeInvalid ? "text-red-500" : "text-[#075F70]"
                )}>
                    {isTimeInvalid ? "Horário Inválido" : "Resumo do Prazo"}
                </h4>
                
                <div className="text-[#3C3C3C] font-medium text-lg">
                    {isTimeInvalid ? (
                        <span className="text-red-600 leading-tight block text-sm">
                            Você não pode definir um prazo no passado. Por favor, escolha um horário futuro.
                        </span>
                    ) : taskData.dataEntrega ? (
                        <>
                           Entregar até <br/>
                           <span className="font-bold text-2xl">
                             {taskData.dataEntrega.toLocaleDateString('pt-BR')}
                           </span>
                           <span className="mx-2">às</span>
                           <span className="font-bold text-2xl">
                             {taskData.horaEntrega}
                           </span>
                        </>
                    ) : (
                        <span className="text-gray-400 italic">Selecione uma data no calendário ao lado.</span>
                    )}
                </div>
            </div>



        </div>
      </div>
    </div>
  );
}