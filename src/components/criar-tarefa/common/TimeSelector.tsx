"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface TimeSelectorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function TimeSelector({ value, onChange, className }: TimeSelectorProps) {
  const timeString = value || "23:59";
  const [hour, minute] = timeString.split(":");

  // Helpers para visualização (H1 H2 : M1 M2)
  const h1 = hour?.[0] || "0";
  const h2 = hour?.[1] || "0";
  const m1 = minute?.[0] || "0";
  const m2 = minute?.[1] || "0";

  return (
    <div className={cn("bg-white rounded-[30px] rounded-bl-[5px] p-6 shadow-xl border border-gray-100 w-[350px] relative flex flex-col", className)}>
      
      <span className="font-montserrat font-medium text-[20px] text-[#3C3C3C] mb-2 pl-2">
          Horário do prazo de entrega
      </span>

      <div className="relative flex items-center justify-center gap-4 py-4 pr-6">
          
          {/* HORA */}
          <div className="flex gap-[4px]">
              <div className="w-[36px] h-[60px] bg-[#ECECEC] rounded-[8px] flex items-center justify-center shadow-inner">
                  <span className="font-montserrat font-bold text-[32px] text-[#3C3C3C]">{h1}</span>
              </div>
              <div className="w-[36px] h-[60px] bg-[#ECECEC] rounded-[8px] flex items-center justify-center shadow-inner">
                  <span className="font-montserrat font-bold text-[32px] text-[#3C3C3C]">{h2}</span>
              </div>
          </div>

          <span className="font-montserrat font-bold text-[32px] text-[#3C3C3C] pb-2">:</span>

          {/* MINUTO */}
          <div className="flex gap-[4px]">
              <div className="w-[36px] h-[60px] bg-[#ECECEC] rounded-[8px] flex items-center justify-center shadow-inner">
                  <span className="font-montserrat font-bold text-[32px] text-[#3C3C3C]">{m1}</span>
              </div>
              <div className="w-[36px] h-[60px] bg-[#ECECEC] rounded-[8px] flex items-center justify-center shadow-inner">
                  <span className="font-montserrat font-bold text-[32px] text-[#3C3C3C]">{m2}</span>
              </div>
          </div>

          {/* Setas Decorativas */}
          <div className="absolute right-0 flex flex-col gap-3 pointer-events-none opacity-60">
              <div className="w-[14px] h-[14px] border-l-[3px] border-t-[3px] border-[#898787] rotate-45 translate-y-1" />
              <div className="w-[14px] h-[14px] border-l-[3px] border-b-[3px] border-[#898787] -rotate-45 -translate-y-1" />
          </div>

          {/* Input Invisível para Funcionalidade */}
          <input 
            type="time"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
            value={timeString}
            onChange={(e) => onChange(e.target.value)}
          />
      </div>
      
    </div>
  );
}
