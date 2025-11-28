"use client";

import React from 'react';
import { TipoObra } from '@/contexts/add-repertorio-context';

interface BandejaTiposObraProps {
  isOpen: boolean;
  onSelect: (tipo: TipoObra) => void;
}

const tiposObra = [
  {
    tipo: 'filme' as TipoObra,
    titulo: 'Filme',
    descricao: 'Obras cinematográficas que retratam questões sociais, morais ou culturais. Podem ilustrar comportamentos, dilemas e críticas relevantes ao tema abordado.'
  },
  {
    tipo: 'livro' as TipoObra,
    titulo: 'Livro', 
    descricao: 'Produções literárias, filosóficas ou científicas que exploram ideias e contextos históricos. Contribuem com reflexões profundas e exemplos conceituais.'
  },
  {
    tipo: 'teatro' as TipoObra, 
    titulo: 'Teatro',
    descricao: 'Peças que dramatizam conflitos humanos e sociais, estimulando a reflexão sobre valores, comportamentos e transformações da sociedade.'
  },
  {
    tipo: 'música' as TipoObra,
    titulo: 'Música',
    descricao: 'Canções que expressam sentimentos, críticas ou narrativas sociais por meio da arte sonora. Servem como referência cultural e simbólica para o tema.'
  }
];

export const BandejaTiposObra: React.FC<BandejaTiposObraProps> = ({
  isOpen,
  onSelect
}) => {
  return (
    <div 
      className={`
        absolute top-0 left-0 h-full 
        transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)]
        bg-white rounded-r-3xl shadow-xl border-t border-r border-b border-gray-100
        flex flex-col justify-center 
        /* AQUI ESTÁ O AJUSTE DO GAP: Aumentamos o padding da esquerda (pl-20) */
        py-8 pr-8 pl-20
        ${isOpen 
          ? 'translate-x-[360px] opacity-100 pointer-events-auto' 
          : 'translate-x-0 opacity-0 pointer-events-none'
        }
      `}
      style={{
         width: '680px',
         zIndex: 10, 
         height: '568px'
      }}
    >
      <div className="grid grid-cols-2 gap-6 h-full content-center">
        {tiposObra.map((item) => (
          <div
            key={item.tipo}
            onClick={() => onSelect(item.tipo)}
            className="
              group flex flex-col gap-2 p-5 rounded-2xl border-2 border-amber-100 
              bg-white hover:border-amber-400 cursor-pointer transition-all duration-300
              hover:shadow-md h-full justify-start
            "
          >
            <h3 className="text-xl font-bold text-amber-600/90 group-hover:text-amber-700">
              {item.titulo}
            </h3>
            <p className="text-gray-500 text-xs leading-relaxed">
              {item.descricao}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};