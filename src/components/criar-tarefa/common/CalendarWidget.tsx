"use client";

import React, { useState } from "react";
import { 
  format, addMonths, subMonths, startOfMonth, endOfMonth, 
  startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay 
} from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarWidgetProps {
  selectedDate: Date | undefined;
  onSelectDate: (date: Date) => void;
  daysWithTasks?: Date[]; 
}

export function CalendarWidget({ selectedDate, onSelectDate, daysWithTasks = [] }: CalendarWidgetProps) {
  const [viewDate, setViewDate] = useState(new Date());

  const nextMonth = () => setViewDate(prev => addMonths(prev, 1));
  const prevMonth = () => setViewDate(prev => subMonths(prev, 1));

  // Gera os dias da grade (do início da semana do dia 1 até o fim da semana do último dia)
  const monthStart = startOfMonth(viewDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  
  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

  return (
    <div className="bg-white rounded-[30px] p-[30px] w-full shadow-sm border border-gray-100 relative min-h-[650px]">
      
      {/* --- Header (Mês e Navegação) --- */}
      <div className="flex items-center gap-4 mb-8 bg-white border border-gray-200 rounded-[15px] px-4 py-2 w-max shadow-sm absolute top-8 left-8 z-10">
          <button onClick={prevMonth} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
             <ChevronLeft className="text-[#898787]" />
          </button>
          
          <span className="font-montserrat font-semibold text-[22px] text-[#3C3C3C] capitalize min-w-[140px] text-center">
              {format(viewDate, "MMMM", { locale: ptBR })}
          </span>

          <button onClick={nextMonth} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
             <ChevronRight className="text-[#898787]" />
          </button>
      </div>

      {/* Espaço para não cobrir o header */}
      <div className="h-20" />

      {/* --- Dias da Semana --- */}
      <div className="grid grid-cols-7 mb-2 text-center">
        {["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"].map((day) => (
            <span key={day} className="font-montserrat font-medium text-[16px] md:text-[20px] text-[#616060] py-2">
                {day}
            </span>
        ))}
      </div>

      {/* --- Grade do Calendário --- */}
      <div className="w-full border border-black rounded-[10px] overflow-hidden bg-[#E2E2E2] flex flex-wrap">
        {calendarDays.map((day, idx) => {
            const isCurrentMonth = isSameMonth(day, viewDate);
            const isSelected = selectedDate && isSameDay(day, selectedDate);
            
            // Verifica se o dia atual tem tarefa
            const hasTask = daysWithTasks.some(taskDate => isSameDay(taskDate, day));
            
            // Lógica de bordas para simular a tabela (sem borda na direita da última coluna e no fundo da última linha)
            const isLastCol = (idx + 1) % 7 === 0;
            const isLastRow = idx >= calendarDays.length - 7;

            return (
                <div 
                    key={day.toString()}
                    onClick={() => onSelectDate(day)}
                    className={cn(
                        "w-[calc(100%/7)] h-[100px] relative flex flex-col justify-end items-end p-[10px] cursor-pointer transition-colors select-none",
                        isCurrentMonth ? "bg-[#F1F1F1]" : "bg-[#BDB4B4]", // Dias de outros meses mais escuros
                        isSelected && "bg-[#E5EFF0]", // Selecionado
                        !isLastCol && "border-r border-black",
                        !isLastRow && "border-b border-black",
                        "hover:opacity-90"
                    )}
                >
                    {/* Bolinha Vermelha/Verde indicando tarefa */}
                    {hasTask && (
                        <div className="absolute left-[15px] top-[65px] w-[12px] h-[12px] bg-[#075F70] rounded-full" title="Tarefa existente" />
                    )}

                    {/* Número do Dia */}
                    <span className={cn(
                        "font-montserrat text-[22px] leading-none",
                        isSelected ? "text-[#075F70] font-bold" : "text-[#3C3C3C] font-normal"
                    )}>
                        {format(day, "dd")}
                    </span>
                </div>
            );
        })}
      </div>

      {/* --- Legenda --- */}
      <div className="flex items-center gap-3 mt-6 ml-2">
        <div className="w-[15px] h-[15px] bg-[#075F70] rounded-full" />
        <span className="font-montserrat font-normal text-[16px] text-black">
            Tarefas já atribuídas ao dia
        </span>
      </div>

    </div>
  );
}
