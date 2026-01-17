"use client";

import React from 'react';
import { Tag } from 'lucide-react';

interface RecorteSelectorProps {
  recorteOptions: string[];
  selectedRecortes: string[];
  hasSelectedEixos: boolean;
  onRecorteChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxRecortes: number;
  error?: string;
}

export const RecorteSelector: React.FC<RecorteSelectorProps> = ({ 
  recorteOptions, 
  selectedRecortes, 
  hasSelectedEixos, 
  onRecorteChange,
  maxRecortes,
  error 
}) => {
  
  if (!hasSelectedEixos) {
    return (
      <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center bg-gray-50/50">
        <div className="p-3 bg-gray-100 rounded-full text-gray-400 mb-3">
            <Tag size={20} />
        </div>
        <p className="text-sm font-medium text-gray-500">Selecione um Eixo Temático acima</p>
        <p className="text-xs text-gray-400 mt-1">Os recortes aparecerão aqui.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex justify-between items-end">
        <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 ml-1">
            Recortes / Subtemas
        </label>
        <span className="text-[10px] text-gray-400 font-medium">
            {selectedRecortes.length} de {maxRecortes} selecionados
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {recorteOptions.map((recorte) => {
          const isSelected = selectedRecortes.includes(recorte);
          
          return (
            <label 
              key={recorte}
              className={`
                cursor-pointer inline-flex items-center px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 select-none border
                ${isSelected 
                  ? "bg-brand-teal-dark border-brand-teal-dark text-white shadow-sm" 
                  : "bg-white border-gray-200 text-gray-600 hover:border-gray-400 hover:bg-gray-50"
                }
              `}
            >
              <input
                type="checkbox"
                value={recorte}
                checked={isSelected}
                onChange={onRecorteChange}
                className="hidden"
              />
              {recorte}
            </label>
          );
        })}
      </div>
      
      {recorteOptions.length === 0 && (
         <p className="text-xs text-gray-400 italic ml-1">Nenhum recorte disponível para os eixos selecionados.</p>
      )}

      {error && (
        <p className="mt-1 text-xs font-bold text-red-500 ml-1">
            {error}
        </p>
      )}
    </div>
  );
};