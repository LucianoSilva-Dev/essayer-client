"use client";

import React from 'react';
import { TipoObra } from '@/contexts/add-repertorio-context';

interface BandejaTiposObraProps {
  isOpen: boolean;
  onSelect: (tipo: TipoObra) => void;
  onClose?: () => void;
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
  onSelect,
  onClose
}) => {
  return (
    <>
      {/* Mobile modal overlay */}
      <div className={`md:hidden ${isOpen ? 'fixed inset-0 z-50 flex items-center justify-center' : 'hidden'}`}>
        <div className="absolute inset-0 bg-black/50" onClick={() => onClose?.()} />
        <div className="relative w-full max-w-md mx-4 bg-white rounded-2xl shadow-xl z-10 p-6">
          <button
            onClick={() => onClose?.()}
            className="absolute left-4 top-4 p-2 rounded-full hover:bg-gray-100"
            aria-label="Voltar"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 19L5 12L12 5" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div className="grid mt-6 grid-cols-1 sm:grid-cols-2 gap-4">
            {tiposObra.map((item) => (
              <div
                key={item.tipo}
                onClick={() => onSelect(item.tipo)}
                className="group flex flex-col gap-2 p-4 rounded-2xl border-2 border-amber-100 bg-white hover:border-amber-400 cursor-pointer transition-all duration-300"
              >
                <h3 className="text-lg font-bold text-amber-600/90 group-hover:text-amber-700">
                  {item.titulo}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed">
                  {item.descricao}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop / md+ bandeja drawer */}
      <div 
        className={`
          hidden md:block md:absolute md:top-0 md:left-0
          transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)]
          bg-white md:rounded-r-3xl md:shadow-xl md:border-t md:border-r md:border-b border-gray-100
          flex flex-col justify-center
          md:py-8 md:pr-8 md:pl-20
          md:w-[680px] md:h-[568px]
          ${isOpen ? 'md:opacity-100 md:pointer-events-auto md:translate-x-[360px]' : 'md:opacity-0 md:pointer-events-none md:translate-x-0'}
        `}
        style={{ zIndex: 10 }}
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
    </>
  );
};