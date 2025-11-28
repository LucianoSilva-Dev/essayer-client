"use client";

import React from 'react';
import { EixosTematicos } from '@/constants/eixos';

interface EixoSelectorProps {
  selectedEixos: string[];
  onEixoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export const EixoSelector: React.FC<EixoSelectorProps> = ({ selectedEixos, onEixoChange, error }) => {
  const eixos = Object.keys(EixosTematicos);

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-end">
        <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 ml-1">
            Eixos Temáticos <span className="text-red-500">*</span>
        </label>
        <span className="text-[10px] text-gray-400 font-medium">Selecione pelo menos um</span>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {eixos.map((eixo) => {
          const isSelected = selectedEixos.includes(eixo);
          
          return (
            <label 
              key={eixo}
              className={`
                relative cursor-pointer group flex items-center justify-center text-center p-3 rounded-xl border-2 transition-all duration-200 select-none h-14
                ${isSelected 
                  /* AQUI ESTÁ A MUDANÇA: bg-gray-800 -> bg-[#075F70] */
                  ? "bg-[#075F70] border-[#075F70] text-white shadow-md shadow-teal-900/10" 
                  : "bg-white border-gray-100 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                }
              `}
            >
              <input
                type="checkbox"
                value={eixo}
                checked={isSelected}
                onChange={onEixoChange}
                className="absolute opacity-0 w-0 h-0"
              />
              <span className="text-xs font-semibold leading-tight">
                {eixo}
              </span>
            </label>
          );
        })}
      </div>
      
      {error && (
        <p className="mt-1 text-xs font-bold text-red-500 ml-1 flex items-center gap-1">
            {error}
        </p>
      )}
    </div>
  );
};