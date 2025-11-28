"use client";

import Image from 'next/image';
import React from 'react';
import { Eixo } from '@/contexts/add-repertorio-context';
import { getIconForEixo } from '@/components/repertorio/[id]/helpers/repertorio-mapper';

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

  console.log(eixosSelecionados);

  return (
    <div className="bg-[#E8E8E8] rounded-[52px] p-12">
      <div className="flex flex-row items-center gap-7">

        {/* Eixos selecionados */}

        {eixosSelecionados.map((eixo, i) => (
          <div key={i} className="bg-white pl-1.5 pr-4 py-1.5 rounded-full flex items-center gap-2 shadow-sm border border-gray-100">
            {/* Aqui viriam os ícones dos eixos */}
            <div className="bg-[#024D4D] w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0">
              {/* Ícone placeholder */}
              <Image
                src={getIconForEixo(eixo.nome)}
                alt={eixo.nome}
                width={16}
                height={16}
                className="w-4 h-4 invert brightness-0 saturate-100 filter-white z-index-0"
              />
            </div>

            <span
              className="font-medium text-xl"
              style={{
                color: '#3C3C3C',
                fontFamily: 'Montserrat',
                lineHeight: '29px'
              }}
            >
              {eixo.nome}
            </span>
          </div>
        ))}

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