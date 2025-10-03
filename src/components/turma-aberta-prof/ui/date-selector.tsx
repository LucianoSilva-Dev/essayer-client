'use client'

import React from "react";
import { useState } from "react";

interface Day {
  weekDay: string;
  day: number;
  hasEvent?: boolean;
}

const DateSelector: React.FC = () => {
  const days: Day[] = [
    { weekDay: "Dom", day: 12 },
    { weekDay: "Seg", day: 13 },
    { weekDay: "Ter", day: 14 },
    { weekDay: "Qua", day: 15 },
    { weekDay: "Qui", day: 16, hasEvent: true },
    { weekDay: "Sex", day: 17 },
    { weekDay: "Sáb", day: 18 },
  ];

  const [selectedDay, setSelectedDay] = useState<number>(13);

  return (
    <div
      className="absolute left-[964px] top-[215px] w-[453px] h-[84px] 
                 flex flex-row justify-center items-center gap-2"
    >
      {days.map(({ weekDay, day, hasEvent }) => {
        const isSelected = selectedDay === day;

        return (
          <div
            key={day}
            onClick={() => setSelectedDay(day)}
            className="flex flex-col items-center cursor-pointer"
          >
            {/* Dia da semana */}
            <span
              className={`text-sm font-medium ${
                isSelected ? "text-white" : "text-gray-700"
              } ${isSelected ? "bg-teal-700 px-3 py-1 rounded-full" : ""}`}
            >
              {weekDay}
            </span>

            {/* Número do dia */}
            <span
              className={`mt-1 text-base font-semibold ${
                isSelected ? "text-white bg-teal-700 px-3 py-1 rounded-full" : "text-gray-800"
              }`}
            >
              {day}
            </span>

            {/* Pontinho de evento */}
            {hasEvent && !isSelected && (
              <span className="w-2 h-2 rounded-full bg-teal-700 mt-1"></span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default DateSelector;
