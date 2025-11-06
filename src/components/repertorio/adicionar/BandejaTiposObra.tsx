"use client";

import React from 'react';
import { TipoObra } from './hooks/useTipoRepertorio';

interface BandejaTiposObraProps {
  isOpen: boolean;
  onSelect: (tipo: TipoObra) => void;
  onClose: () => void;
}

const tiposObra = [
  {
    tipo: 'filme' as TipoObra,
    titulo: 'Filme',
    descricao: 'Obras cinematográficas que retratam questões sociais, morais ou culturais. Podem ilustrar comportamentos, dilemas e críticas relevantes ao tema abordado.'
  },
  {
    tipo: 'teatro' as TipoObra, 
    titulo: 'Teatro',
    descricao: 'Peças que dramatizam conflitos humanos e sociais, estimulando a reflexão sobre valores, comportamentos e transformações da sociedade.'
  },
  {
    tipo: 'livro' as TipoObra,
    titulo: 'Livro', 
    descricao: 'Produções literárias, filosóficas ou científicas que exploram ideias e contextos históricos. Contribuem com reflexões profundas e exemplos conceituais.'
  },
  {
    tipo: 'musica' as TipoObra,
    titulo: 'Música',
    descricao: 'Canções que expressam sentimentos, críticas ou narrativas sociais por meio da arte sonora. Servem como referência cultural e simbólica para o tema.'
  }
];

export const BandejaTiposObra: React.FC<BandejaTiposObraProps> = ({
  isOpen,
  onSelect,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div 
        className="bg-white rounded-2xl p-8 max-w-4xl mx-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Selecione o tipo de obra
          </h2>
          <p className="text-gray-600">
            Filmes, músicas, séries, pinturas, peças teatrais ou livros que expressam uma visão sobre o tema.
          </p>
        </div>

        {/* Grid de tipos */}
        <div className="grid grid-cols-2 gap-6">
          {tiposObra.map((item, index) => (
            <div
              key={item.tipo}
              className="bg-gray-50 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 hover:rotate-1 border-2 border-transparent hover:border-amber-200"
              onClick={() => onSelect(item.tipo)}
            >
              <h3 className="font-semibold text-lg text-gray-800 mb-3">
                {item.titulo}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.descricao}
              </p>
            </div>
          ))}
        </div>

        {/* Botão fechar */}
        <button
          onClick={onClose}
          className="mt-6 px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Voltar
        </button>
      </div>
    </div>
  );
};