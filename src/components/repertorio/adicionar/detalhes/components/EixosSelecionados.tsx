"use client";

import React from 'react';
import { Eixo } from '@/contexts/add-repertorio-context'; 

interface EixosSelecionadosProps {
  eixosSelecionados: Eixo[];
  recortesSelecionados: string[];
}

export const EixosSelecionados: React.FC<EixosSelecionadosProps> = ({
  eixosSelecionados,
  recortesSelecionados
}) => {
  if (eixosSelecionados.length === 0) {
    return null;
  }

  return (
    <div className="bg-[#E8E8E8] rounded-[52px] p-12">
      <div className="flex flex-row items-center gap-7">
        
        {/* Eixos selecionados */}
        <div className="flex flex-row items-center bg-[#F1F1F2] rounded-[40px] pr-5 gap-3">
          {/* Aqui viriam os ícones dos eixos */}
          <div className="flex items-center justify-center w-17 h-17 bg-white rounded-[40px]">
            {/* Ícone placeholder */}
            <div className="w-8 h-8 bg-[#075F70] rounded-full"></div>
          </div>
          
          <span 
            className="font-medium text-xl"
            style={{
              color: '#3C3C3C',
              fontFamily: 'Montserrat',
              lineHeight: '29px'
            }}
          >
            {eixosSelecionados.length} eixo(s) selecionado(s)
          </span>
        </div>

        {/* Recortes selecionados */}
        <div className="flex flex-row items-center gap-4 flex-wrap">
          {recortesSelecionados.slice(0, 3).map((recorte, index) => (
            <div
              key={index}
              className="flex items-center bg-[#DCDCDD] rounded-[40px] px-4 py-2"
            >
              <span 
                className="font-medium text-xl"
                style={{
                  color: '#3C3C3C',
                  fontFamily: 'Montserrat',
                  lineHeight: '29px'
                }}
              >
                {recorte}
              </span>
            </div>
          ))}
          
          {recortesSelecionados.length > 3 && (
            <div className="flex items-center bg-[#DCDCDD] rounded-[40px] px-4 py-2">
              <span 
                className="font-medium text-xl"
                style={{
                  color: '#3C3C3C',
                  fontFamily: 'Montserrat',
                  lineHeight: '29px'
                }}
              >
                +{recortesSelecionados.length - 3}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};