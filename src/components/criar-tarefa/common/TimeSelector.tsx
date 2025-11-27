"use client";

import React from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimeSelectorProps {
  value: string; // Formato "HH:mm"
  onChange: (value: string) => void;
  label?: string;
  description?: string;
  className?: string;
}

export function TimeSelector({ 
  value, 
  onChange, 
  label = "Horário Limite", 
  description = "Horário limite para envio no dia selecionado",
  className 
}: TimeSelectorProps) {
  return (
    <div className={cn("bg-white p-8 rounded-[30px] shadow-md border-l-[10px] border-[#075F70] space-y-4", className)}>
        <div className="flex items-center gap-3 text-[#075F70]">
            <Clock size={32} />
            <h3 className="font-montserrat font-semibold text-[24px]">
                {label}
            </h3>
        </div>
        
        {description && (
            <p className="text-gray-500 font-montserrat">
                {description}
            </p>
        )}

        <div className="relative group">
            <input
                type="time"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full text-[40px] font-bold text-[#3C3C3C] bg-gray-50 p-4 rounded-xl text-center border-2 border-transparent focus:border-[#075F70] focus:bg-white outline-none transition-all font-montserrat cursor-pointer hover:bg-gray-100"
            />
            {/* Dica visual para clicar */}
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                ▼
            </span>
        </div>
    </div>
  );
}
