"use client";

import React from 'react';
import { TipoRepertorio } from '@/shared/contexts/add-repertorio-context';
import Image from 'next/image';

interface TipoRepertorioCardProps {
  tipo: TipoRepertorio;
  selecionado: boolean;
  onClick: (tipo: TipoRepertorio) => void;
  zIndex: number;
  showBackButton?: boolean; // Nova prop
  onBack?: (e: React.MouseEvent) => void; // Nova prop
}

const tipoConfig = {
  obra: {
    icone: "/icons/obraIcon.svg",
    titulo: "Obra",
    descricao: "Filmes, músicas, séries, pinturas, peças teatrais ou livros que expressam uma visão sobre o tema. São usados como referência artística ou simbólica na construção da argumentação.",
    cor: "#CA9C60",
    corClara: "#FDF6EC",
  },
  artigo: {
    icone: "/icons/artigoIcon.svg",
    titulo: "Artigo",
    descricao: "Textos informativos, notícias ou análises que abordam fatos, ideias ou reflexões sobre temas sociais e culturais. Servem para embasar argumentos com dados e interpretações da realidade.",
    cor: "#2258B6",
    corClara: "#E6EFFF",
  },
  citacao: {
    icone: "/icons/citacaoIcon.svg",
    titulo: "Citação",
    descricao: "Frases ou trechos ditos por pensadores, autores ou personalidades que sintetizam uma ideia relevante sobre o tema. Ajudam a iniciar ou reforçar o ponto de vista na redação.",
    cor: "#0C8462",
    corClara: "#E6F7F2",
  }
};

export const TipoRepertorioCard: React.FC<TipoRepertorioCardProps> = ({
  tipo,
  selecionado,
  onClick,
  zIndex,
  showBackButton,
  onBack
}) => {
  const config = tipoConfig[tipo];

  const widthClass = selecionado ? 'w-full md:w-[380px]' : 'w-full md:w-[340px]';
  const heightClass = selecionado ? 'h-auto md:h-[568px]' : 'h-auto md:h-[459px]';

  return (
    <div
      className={`
        relative flex flex-col items-center p-7 gap-8
        rounded-2xl transition-all duration-500 cursor-pointer
        ${selecionado ? `shadow-2xl scale-105` : 'bg-white hover:shadow-lg hover:scale-102'}
        ${widthClass} ${heightClass}
      `}
      style={{
        zIndex: zIndex,
        backgroundColor: selecionado ? config.cor : '#FFFFFF',
        color: selecionado ? '#FFFFFF' : '#898787',
        // Se estiver selecionado e for Obra (bandeja aberta), removemos arredondamento da direita para "colar" na bandeja
        borderTopRightRadius: (selecionado && showBackButton) ? '0px' : '1rem',
        borderBottomRightRadius: (selecionado && showBackButton) ? '0px' : '1rem',
      }}
      onClick={() => onClick(tipo)}
    >
      {/* Botão Voltar (Aparece apenas quando solicitado) */}
      {showBackButton && (
        <button 
          onClick={(e) => {
            e.stopPropagation(); // Impede que o clique propague para o card
            onBack?.(e);
          }}
          className="absolute top-6 left-6 p-2 rounded-full hover:bg-white/10 transition-colors"
        >
          {/* Ícone de seta simples */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 19L5 12L12 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}

      {/* Ícone */}
      <div 
        className="flex flex-col items-center gap-4 mt-8"
        style={{ color: selecionado ? config.corClara : '#898787' }}
      >
        <div className="w-12 h-12 flex items-center justify-center">
          <Image 
            src={config.icone}
            alt={`${config.titulo} ícone`}
            width={48}
            height={48}
          />
        </div>
        <h3 
          className={`font-semibold ${
            selecionado ? 'text-2xl' : 'text-xl'
          }`}
        >
          {config.titulo}
        </h3>
      </div>

      {/* Descrição */}
      <p 
        className={`text-center leading-relaxed ${
          selecionado ? 'text-xl' : 'text-lg'
        }`}
        style={{ color: selecionado ? config.corClara : '#898787' }}
      >
        {config.descricao}
      </p>
    </div>
  );
};