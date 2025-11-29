"use client";

import React, { useState, useEffect } from "react";
import { 
  format, addMonths, subMonths, startOfMonth, endOfMonth, 
  startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, isToday,
  isBefore, startOfToday 
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
  const today = startOfToday(); 

  useEffect(() => {
    if (selectedDate) {
      setViewDate(selectedDate);
    }
  }, [selectedDate]);

  // Verifica se o mês visível é o mês atual para bloquear o "voltar"
  const isCurrentViewMonth = isSameMonth(viewDate, today);

  const nextMonth = () => setViewDate(prev => addMonths(prev, 1));
  
  const prevMonth = () => {
      // Só volta se não for o mês atual
      if (!isCurrentViewMonth) {
          setViewDate(prev => subMonths(prev, 1));
      }
  };

  const monthStart = startOfMonth(viewDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  
  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });
  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  const handleDayClick = (day: Date, isPast: boolean) => {
      if (isPast) return;

      if (!isSameMonth(day, viewDate)) {
          setViewDate(day);
      }
      onSelectDate(day);
  };

  return (
    <div className="bg-white rounded-[40px] p-8 shadow-xl border border-gray-100 w-full h-full flex flex-col min-h-[500px]">
      
      <div className="flex items-center justify-between mb-8 px-2">
        <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                Mês de Referência
            </span>
            <h2 className="text-3xl font-bold text-[#3C3C3C] capitalize font-montserrat">
                {format(viewDate, "MMMM yyyy", { locale: ptBR })}
            </h2>
        </div>

        <div className="flex gap-2">
            {/* Botão Voltar: Desabilitado se for o mês atual */}
            <button 
                onClick={prevMonth} 
                disabled={isCurrentViewMonth}
                className={cn(
                    "p-3 rounded-full border border-gray-200 transition-all group",
                    isCurrentViewMonth 
                        ? "opacity-30 cursor-not-allowed bg-gray-50" 
                        : "hover:bg-gray-50 hover:border-[#075F70] hover:text-[#075F70]"
                )}
            >
                <ChevronLeft size={24} className={isCurrentViewMonth ? "text-gray-300" : "text-gray-400 group-hover:text-[#075F70]"} />
            </button>

            <button onClick={nextMonth} className="p-3 hover:bg-gray-50 rounded-full border border-gray-200 hover:border-[#075F70] hover:text-[#075F70] transition-all group">
                <ChevronRight size={24} className="text-gray-400 group-hover:text-[#075F70]" />
            </button>
        </div>
      </div>

      <div className="grid grid-cols-7 mb-4">
        {weekDays.map((day) => (
            <div key={day} className="text-center font-montserrat font-bold text-gray-400 text-sm uppercase tracking-wider py-2">
                {day}
            </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2 md:gap-4 flex-1">
        {calendarDays.map((day) => {
            const isCurrentMonth = isSameMonth(day, viewDate);
            const isSelected = selectedDate && isSameDay(day, selectedDate);
            const isDayToday = isToday(day);
            const hasTask = daysWithTasks.some(taskDate => isSameDay(taskDate, day));
            
            const isPast = isBefore(day, today);

            return (
                <button 
                    key={day.toString()}
                    onClick={() => handleDayClick(day, isPast)}
                    disabled={isPast}
                    className={cn(
                        "aspect-square relative flex flex-col items-center justify-center rounded-[20px] transition-all duration-300 group",
                        
                        isPast && "text-gray-300 bg-gray-50/30 cursor-not-allowed font-normal",
                        
                        !isCurrentMonth && !isPast && "text-gray-400 opacity-70 hover:opacity-100",

                        isSelected && !isPast
                            ? "bg-[#075F70] text-white shadow-lg shadow-[#075F70]/30 scale-105 z-10 font-bold" 
                            : !isPast && !isSelected && "hover:bg-gray-50 text-[#3C3C3C] font-medium",

                        isDayToday && !isSelected && !isPast && "border-2 border-[#075F70]/30 text-[#075F70]"
                    )}
                >
                    <span className="font-montserrat text-lg md:text-xl">
                        {format(day, "d")}
                    </span>

                    {hasTask && !isPast && (
                        <span className={cn(
                            "absolute bottom-2 md:bottom-3 w-1.5 h-1.5 rounded-full",
                            isSelected ? "bg-white" : "bg-[#075F70]"
                        )} />
                    )}
                </button>
            );
        })}
      </div>
    </div>
  );
}