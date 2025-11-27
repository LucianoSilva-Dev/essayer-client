// Exemplo de como ficará o Step3_Prazo.tsx importando os novos componentes
"use client";

import React from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { useCreateTask } from "../CreateTaskContext";
import { CalendarWidget } from "../common/CalendarWidget";
import { TimeSelector } from "../common/TimeSelector";

export function Step3_Prazo() {
  const { taskData, updateTaskData } = useCreateTask();

  // Mock de datas ocupadas
  const datesWithTasks = [
    new Date(new Date().setDate(new Date().getDate() + 2)),
    new Date(new Date().setDate(new Date().getDate() + 5)),
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto pb-20 animate-in fade-in slide-in-from-right-8 duration-500 min-h-[500px]">
      
      {/* ===== LADO ESQUERDO: CALENDÁRIO ===== */}
      <div className="flex-1 bg-white p-6 rounded-[30px] shadow-lg border border-gray-100 flex flex-col items-center justify-center relative">
        <h3 className="font-montserrat font-semibold text-[24px] text-[#3C3C3C] mb-6 self-start pl-4">
            Selecione a data de entrega
        </h3>
        
        {/* Componente Novo */}
        <CalendarWidget 
            selectedDate={taskData.dataEntrega}
            onSelect={(date) => updateTaskData({ dataEntrega: date })}
            bookedDates={datesWithTasks}
        />
      </div>

      {/* ===== LADO DIREITO: HORÁRIO E RESUMO ===== */}
      <div className="flex-1 flex flex-col justify-center gap-8">
        
        {/* Componente Novo */}
        <TimeSelector 
            value={taskData.horaEntrega}
            onChange={(val) => updateTaskData({ horaEntrega: val })}
        />

        {/* Card de Feedback Visual (Mantido aqui pois é específico da tela, não um widget genérico) */}
        <div className="bg-[#E5EFF0] p-8 rounded-[30px] relative overflow-hidden">
             <CalendarIcon className="absolute -right-6 -bottom-6 text-[#075F70] opacity-10 w-40 h-40" />
             
             <h4 className="font-montserrat font-semibold text-[20px] text-[#3C3C3C] mb-2 relative z-10">
                Data final definida:
             </h4>
             
             {taskData.dataEntrega ? (
                 <div className="relative z-10">
                    <p className="text-[32px] font-bold text-[#075F70] font-montserrat leading-none">
                        {format(taskData.dataEntrega, "dd 'de' MMMM", { locale: ptBR })}
                    </p>
                    <p className="text-[24px] font-medium text-[#3C3C3C]/80 font-montserrat mt-1">
                        às {taskData.horaEntrega}
                    </p>
                    <p className="text-sm text-gray-500 mt-4 font-montserrat capitalize">
                        {format(taskData.dataEntrega, "EEEE", { locale: ptBR })}
                    </p>
                 </div>
             ) : (
                 <p className="text-gray-400 italic font-montserrat relative z-10">
                    Selecione uma data no calendário ao lado.
                 </p>
             )}
        </div>
      </div>
    </div>
  );
}
