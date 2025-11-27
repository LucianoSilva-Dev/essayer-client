"use client";

import React from "react";
import { DayPicker } from "react-day-picker";
import { ptBR } from "date-fns/locale";
import "react-day-picker/dist/style.css"; 

// Estilos isolados do componente
const customCalendarStyles = `
  .rdp { 
    --rdp-cell-size: 50px; 
    --rdp-accent-color: #075F70; 
    margin: 0; 
  }
  .rdp-button:hover:not([disabled]):not(.rdp-day_selected) { 
    background-color: #E5EFF0; 
    color: #075F70; 
  }
  .rdp-day_selected { 
    background-color: #075F70; 
    color: white; 
    font-weight: bold; 
  }
  .rdp-day_today { 
    color: #075F70; 
    font-weight: bold; 
  }
  .rdp-caption_label { 
    font-family: var(--font-montserrat); 
    color: #3C3C3C; 
    font-size: 1.2rem; 
  }
  .rdp-head_cell { 
    font-family: var(--font-montserrat); 
    color: #898787; 
    font-weight: 500; 
  }
  
  /* Indicador de tarefa existente (bolinha) */
  .has-task::after {
    content: '';
    display: block;
    width: 6px;
    height: 6px;
    background-color: #FF6B6B;
    border-radius: 50%;
    margin: 2px auto 0;
  }
`;

interface CalendarWidgetProps {
  selectedDate: Date | undefined;
  onSelect: (date: Date | undefined) => void;
  bookedDates?: Date[]; // Datas que já têm tarefas (para mostrar a bolinha)
}

export function CalendarWidget({ selectedDate, onSelect, bookedDates = [] }: CalendarWidgetProps) {
  
  const modifiers = { hasTask: bookedDates };
  const modifiersClassNames = { hasTask: "has-task" };

  return (
    <div className="flex flex-col items-center">
      <style>{customCalendarStyles}</style>
      
      <DayPicker
        mode="single"
        selected={selectedDate}
        onSelect={onSelect}
        locale={ptBR}
        modifiers={modifiers}
        modifiersClassNames={modifiersClassNames}
        className="font-sans"
      />

      {/* Legenda Opcional Integrada */}
      <div className="flex items-center gap-2 mt-6 text-sm text-gray-500 font-montserrat bg-gray-50 px-4 py-2 rounded-full">
         <div className="w-2 h-2 rounded-full bg-[#FF6B6B]" />
         <span>Dias com tarefas já agendadas</span>
      </div>
    </div>
  );
}
