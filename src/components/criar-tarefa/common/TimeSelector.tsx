"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Clock, AlertCircle, ChevronUp, ChevronDown } from "lucide-react";

interface TimeSelectorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  hasError?: boolean;
}

export function TimeSelector({ value, onChange, className, hasError }: TimeSelectorProps) {
  const timeString = value || "23:59";
  const [hourStr, minuteStr] = timeString.split(":");

  const updateTime = (newHour: number, newMinute: number) => {
    const h = Math.max(0, Math.min(23, newHour)).toString().padStart(2, "0");
    const m = Math.max(0, Math.min(59, newMinute)).toString().padStart(2, "0");
    onChange(`${h}:${m}`);
  };

  const adjustHour = (amount: number) => {
    let newH = parseInt(hourStr) + amount;
    if (newH > 23) newH = 0;
    if (newH < 0) newH = 23;
    updateTime(newH, parseInt(minuteStr));
  };

  const adjustMinute = (amount: number) => {
    let newM = parseInt(minuteStr) + amount;
    if (newM > 59) newM = 0;
    if (newM < 0) newM = 59;
    updateTime(parseInt(hourStr), newM);
  };

  return (
    <div className={cn("w-full select-none", className)}>
      <div 
        // Adicionamos 'group' para usar 'group-focus-within'
        // Removemos o estado 'isFocused' manual
        className={cn(
            "bg-white rounded-[30px] p-6 shadow-lg border flex flex-col items-center gap-4 relative overflow-hidden transition-all duration-300 group",
            hasError 
                ? "border-red-300 shadow-red-100" 
                : "border-gray-100 hover:border-[#075F70]/30 group-focus-within:border-[#075F70] group-focus-within:ring-4 group-focus-within:ring-[#075F70]/10 group-focus-within:shadow-xl"
        )}
      >
          {/* Header */}
          <div className={cn(
              "flex items-center gap-2 mb-1 transition-colors", 
              hasError 
                ? "text-red-500" 
                : "text-gray-400 group-focus-within:text-[#075F70]"
          )}>
             {hasError ? <AlertCircle size={18} /> : <Clock size={18} />}
             <span className="font-montserrat font-bold text-xs uppercase tracking-widest">
                {hasError ? "Horário Inválido" : "Horário Limite"}
             </span>
          </div>

          {/* CONTROLES MANUAIS */}
          <div className="flex items-center gap-2 relative z-20">
            
            {/* Coluna HORA */}
            <div className="flex flex-col items-center gap-1">
                <button 
                    onClick={(e) => { e.stopPropagation(); adjustHour(1); }} 
                    className="p-1 text-gray-300 hover:text-[#075F70] hover:bg-gray-50 rounded-full transition-colors focus:outline-none focus:text-[#075F70]"
                >
                    <ChevronUp size={24} />
                </button>
                
                <div className={cn(
                    "w-20 h-20 flex items-center justify-center rounded-2xl border-2 transition-all",
                    hasError 
                        ? "border-red-100 bg-red-50 text-red-600" 
                        : "border-gray-100 bg-[#F5F7F8] text-[#3C3C3C] group-focus-within:border-[#075F70] group-focus-within:bg-[#075F70]/5 group-focus-within:text-[#075F70]"
                )}>
                    <span className="font-montserrat font-bold text-4xl">{hourStr}</span>
                </div>

                <button 
                    onClick={(e) => { e.stopPropagation(); adjustHour(-1); }} 
                    className="p-1 text-gray-300 hover:text-[#075F70] hover:bg-gray-50 rounded-full transition-colors focus:outline-none focus:text-[#075F70]"
                >
                    <ChevronDown size={24} />
                </button>
            </div>

            <span className={cn(
                "text-2xl font-bold pb-8 transition-colors", 
                hasError ? "text-red-300" : "text-gray-300 group-focus-within:text-[#075F70]"
            )}>:</span>

            {/* Coluna MINUTO */}
            <div className="flex flex-col items-center gap-1">
                <button 
                    onClick={(e) => { e.stopPropagation(); adjustMinute(5); }} 
                    className="p-1 text-gray-300 hover:text-[#075F70] hover:bg-gray-50 rounded-full transition-colors focus:outline-none focus:text-[#075F70]"
                >
                    <ChevronUp size={24} />
                </button>
                
                <div className={cn(
                    "w-20 h-20 flex items-center justify-center rounded-2xl border-2 transition-all",
                    hasError 
                        ? "border-red-100 bg-red-50 text-red-600" 
                        : "border-gray-100 bg-[#F5F7F8] text-[#3C3C3C] group-focus-within:border-[#075F70] group-focus-within:bg-[#075F70]/5 group-focus-within:text-[#075F70]"
                )}>
                    <span className="font-montserrat font-bold text-4xl">{minuteStr}</span>
                </div>

                <button 
                    onClick={(e) => { e.stopPropagation(); adjustMinute(-5); }} 
                    className="p-1 text-gray-300 hover:text-[#075F70] hover:bg-gray-50 rounded-full transition-colors focus:outline-none focus:text-[#075F70]"
                >
                    <ChevronDown size={24} />
                </button>
            </div>

          </div>

          {/* Mensagem de Ajuda */}
          <p className={cn(
              "text-center text-xs font-medium max-w-[200px] mt-2 transition-colors", 
              hasError ? "text-red-400" : "text-gray-400 group-focus-within:text-[#075F70]"
          )}>
             {hasError 
                ? "O horário não pode ser anterior ao atual." 
                : "Use as setas ou clique para digitar."}
          </p>

          {/* Input Nativo Invisível */}
          <input 
            type="time"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            value={timeString}
            onChange={(e) => onChange(e.target.value)}
          />
      </div>
    </div>
  );
}