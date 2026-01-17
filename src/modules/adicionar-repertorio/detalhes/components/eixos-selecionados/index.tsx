"use client";

import Image from 'next/image';
import React from 'react';
import { Eixo } from '@/shared/contexts/add-repertorio-context';
import { getIconForEixo } from '@/modules/repertorio/[id]/helpers/repertorio-mapper';

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
    <div className="bg-surface-light rounded-[52px] p-6 md:p-12 space-y-6 md:space-y-8">
      {/* Seção de Eixos */}
      <div>
        <h3 className="text-sm md:text-base font-bold uppercase tracking-wider text-gray-600 mb-3 md:mb-4 ml-2">
          Eixos Selecionados
        </h3>
        <div className="flex flex-wrap gap-2 md:gap-3">
          {eixosSelecionados.map((eixo, i) => (
            <div 
              key={i} 
              className="bg-white pl-1.5 md:pl-2 pr-3 md:pr-4 py-1.5 md:py-2 rounded-full flex items-center gap-2 shadow-sm border border-gray-100 flex-shrink-0"
            >
              <div className="bg-brand-teal-secondary w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center flex-shrink-0">
                <Image
                  src={getIconForEixo(eixo.nome)}
                  alt={eixo.nome}
                  width={16}
                  height={16}
                  className="w-4 h-4 invert brightness-0 saturate-100 filter-white"
                />
              </div>

              <span
                className="font-medium text-xs md:text-lg whitespace-nowrap"
                style={{
                  color: '#3C3C3C',
                  fontFamily: 'Montserrat',
                  lineHeight: '24px'
                }}
              >
                {eixo.nome}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Seção de Recortes */}
      {recortesSelecionados.length > 0 && (
        <div>
          <h3 className="text-sm md:text-base font-bold uppercase tracking-wider text-gray-600 mb-3 md:mb-4 ml-2">
            Recortes / Subtemas
          </h3>
          <div className="flex flex-wrap gap-2 md:gap-3">
            {recortesSelecionados.map((recorte, index) => (
              <div
                key={index}
                className="flex items-center bg-[#DCDCDD] rounded-[40px] px-3 md:px-4 py-1.5 md:py-2 flex-shrink-0"
              >
                <span
                  className="font-medium text-xs md:text-lg"
                  style={{
                    color: '#3C3C3C',
                    fontFamily: 'Montserrat',
                    lineHeight: '24px'
                  }}
                >
                  {recorte}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
