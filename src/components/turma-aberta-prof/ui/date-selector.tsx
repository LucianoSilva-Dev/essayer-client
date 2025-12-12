"use client";

import React from "react";

interface DateSelectorProps {
  deliveryDate?: Date;
}

const DateSelector: React.FC<DateSelectorProps> = ({ deliveryDate }) => {
  const today = new Date();
  const currentDay = today.getDate();

  // Gera os próximos 5 dias (ou 7 se preferir manter, mas 5 fica melhor em cards laterais)
  const days = Array.from({ length: 7 }).map((_, i) => {
    const date = new Date();
    date.setDate(today.getDate() + i);

    // Ajuste para pegar sigla de 3 letras e remover o ponto se houver (ex: 'seg.')
    const weekDay = date.toLocaleDateString("pt-BR", { weekday: "short" }).replace('.', '');
    const day = date.getDate();

    const isDelivery =
      deliveryDate &&
      date.getDate() === new Date(deliveryDate).getDate() &&
      date.getMonth() === new Date(deliveryDate).getMonth() &&
      date.getFullYear() === new Date(deliveryDate).getFullYear();

    return { weekDay, day, isDelivery };
  });

  return (
    <div className="grid grid-cols-7 gap-1">
      {days.map(({ weekDay, day, isDelivery }) => {
        const isToday = day === currentDay;

        return (
          <div
            key={day}
            className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all cursor-default
              ${isToday 
                  ? "bg-custom-blue text-white shadow-md shadow-custom-blue/20 transform scale-105" 
                  : "text-gray-500 hover:bg-gray-50"
              }
            `}
          >
            <span className={`text-[10px] font-bold uppercase mb-1 ${isToday ? "text-white/80" : "text-gray-400"}`}>
                {weekDay}
            </span>
            <span className="text-base font-bold font-montserrat">{day}</span>

            {/* Indicador de Entrega ou Ponto vazio para manter alinhamento */}
            <div className="h-1.5 mt-1 flex items-center justify-center">
                {isDelivery ? (
                  <span className={`w-1.5 h-1.5 rounded-full ${isToday ? "bg-white" : "bg-red-400"}`}></span>
                ) : (
                   /* Ponto invisível para manter altura consistente */
                   <span className="w-1 h-1"></span>
                )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DateSelector;