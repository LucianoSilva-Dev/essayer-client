"use client";

import React from 'react';
import { TipoRepertorio } from './hooks/useTipoRepertorio';
import Image from 'next/image';

interface TipoRepertorioCardProps {
  tipo: TipoRepertorio;
  selecionado: boolean;
  onClick: (tipo: TipoRepertorio) => void;
  zIndex: number;
}

const tipoConfig = {
  obra: {
    icone: "/obraIcon.svg",
    titulo: "Obra",
    descricao: "Filmes, músicas, séries, pinturas, peças teatrais ou livros que expressam uma visão sobre o tema. São usados como referência artística ou simbólica na construção da argumentação.",
    cor: "#CA9C60",
    corClara: "#FDF6EC",
    z: 1
  },
  artigo: {
    icone: "/artigoIcon.svg",
    titulo: "Artigo", 
    descricao: "Textos informativos, notícias ou análises que abordam fatos, ideias ou reflexões sobre temas sociais e culturais. Servem para embasar argumentos com dados e interpretações da realidade.",
    cor: "#2258B6",
    corClara: "#E6EFFF",
    z: 2
  },
  citacao: {
    icone: "/citacaoIcon.svg",
    titulo: "Citação",
    descricao: "Frases ou trechos ditos por pensadores, autores ou personalidades que sintetizam uma ideia relevante sobre o tema. Ajudam a iniciar ou reforçar o ponto de vista na redação.",
    cor: "#0C8462", 
    corClara: "#E6F7F2",
    z: 1
  }
};

export const TipoRepertorioCard: React.FC<TipoRepertorioCardProps> = ({
  tipo,
  selecionado,
  onClick,
  zIndex
}) => {
  const config = tipoConfig[tipo];

  return (
    <div
      className={`
        flex flex-col items-center p-7 gap-8
        rounded-2xl transition-all duration-300 cursor-pointer
        ${selecionado 
          ? `shadow-2xl scale-105`
          : 'bg-white hover:shadow-lg hover:scale-102'
        }
      `}
      style={{
        zIndex: config.z,
        backgroundColor: selecionado ? config.cor : '#FFFFFF',
        color: selecionado ? '#FFFFFF' : '#898787',
        width: selecionado ? '380px' : '340px',
        height: selecionado ? '568px' : '459px',
        boxShadow: selecionado ? `10px 15px 20px ${config.cor}80` : undefined
      }}
      onClick={() => onClick(tipo)}
    >
      {/* Ícone - vamos usar placeholders por enquanto */}
      <div 
        className="flex flex-col items-center gap-4"
        style={{ color: selecionado ? config.corClara : '#898787' }}
      >
        <div className="w-12 h-12 flex items-center justify-center">
          {/* Ícone placeholder - substituir pelo SVG real depois */}
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
          selecionado ? 'text-2xl' : 'text-xl'
        }`}
        style={{ color: selecionado ? config.corClara : '#898787' }}
      >
        {config.descricao}
      </p>
    </div>
  );
};