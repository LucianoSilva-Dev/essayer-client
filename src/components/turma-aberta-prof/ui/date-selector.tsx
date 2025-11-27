"use client";

import React from "react";

interface DateSelectorProps {
  deliveryDate?: Date; // Data de entrega da tarefa
}

const DateSelector: React.FC<DateSelectorProps> = ({ deliveryDate }) => {
  const today = new Date();
  const currentDay = today.getDate();

  // Gera os próximos 7 dias
  const days = Array.from({ length: 7 }).map((_, i) => {
    const date = new Date();
    date.setDate(today.getDate() + i);

    const weekDay = date.toLocaleDateString("pt-BR", { weekday: "short" });
    const day = date.getDate();

    // ✅ Comparação de data simplificada (ignora horas)
    const isDelivery =
      deliveryDate &&
      date.getDate() === new Date(deliveryDate).getDate() &&
      date.getMonth() === new Date(deliveryDate).getMonth() &&
      date.getFullYear() === new Date(deliveryDate).getFullYear();

    return { weekDay, day, isDelivery };
  });

  return (
    <div className="flex justify-between items-center gap-3 overflow-x-auto no-scrollbar">
      {days.map(({ weekDay, day, isDelivery }) => {
        const isToday = day === currentDay;

        return (
          <div
            key={day}
            className={`flex flex-col items-center justify-center rounded-xl px-2 py-2 transition-all
              ${isToday ? "bg-[#075F70] text-white" : "text-gray-700"}
            `}
          >
            <span className="text-md font-medium capitalize">{weekDay}</span>
            <span className="text-base font-semibold mt-1">{day}</span>

            {/* ✅ Bolinha do dia de entrega */}
            {isDelivery && (
              <span className="w-2 h-2 rounded-full bg-[#075F70] mt-1"></span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default DateSelector;
