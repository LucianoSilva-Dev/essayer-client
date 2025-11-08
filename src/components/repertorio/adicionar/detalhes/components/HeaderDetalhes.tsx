"use client";

import React from 'react';

interface HeaderDetalhesProps {
  tipoRepertorio: string;
  tipoObra?: string;
  titulo: string;
  autoria: string;
  onTituloChange: (titulo: string) => void;
  onAutoriaChange: (autoria: string) => void;
}

const getTipoConfig = (tipo: string, tipoObra?: string) => {
  const configs = {
    artigo: {
      label: 'Artigo',
      placeholderTitulo: 'Insira o título do artigo aqui',
      placeholderAutoria: 'Autoria do artigo aqui',
      cor: '#2258B6'
    },
    obra: {
      label: tipoObra ? `Obra - ${tipoObra}` : 'Obra',
      placeholderTitulo: 'Insira o título da obra aqui',
      placeholderAutoria: 'Autoria da obra aqui', 
      cor: '#CA9C60'
    },
    citacao: {
      label: 'Citação',
      placeholderTitulo: 'Insira a fonte da citação aqui',
      placeholderAutoria: 'Autor da citação aqui',
      cor: '#0C8462'
    }
  };

  return configs[tipo as keyof typeof configs] || configs.artigo;
};

export const HeaderDetalhes: React.FC<HeaderDetalhesProps> = ({
  tipoRepertorio,
  tipoObra,
  titulo,
  autoria,
  onTituloChange,
  onAutoriaChange
}) => {
  const config = getTipoConfig(tipoRepertorio, tipoObra);

  return (
    <div className="bg-[#E8E8E8] rounded-[88px] px-12 py-4">
      <div className="flex flex-row justify-between items-center gap-4 mb-8">
        {/* Campo Tipo + Título */}
        <div className="flex items-center bg-white rounded-[40px] px-7 py-3 gap-6 flex-1">
          <span 
            className="font-medium text-xl whitespace-nowrap"
            style={{ 
              color: config.cor,
              fontFamily: 'Montserrat'
            }}
          >
            {config.label}
          </span>
          <input
            type="text"
            value={titulo}
            onChange={(e) => onTituloChange(e.target.value)}
            placeholder={config.placeholderTitulo}
            className="flex-1 bg-transparent outline-none text-xl placeholder-opacity-68"
            style={{
              color: config.cor,
              fontFamily: 'Montserrat',
              fontWeight: 400,
              fontSize: '28px',
              lineHeight: '20px'
            }}
          />
        </div>

        {/* Campo Autoria */}
        <div className="flex items-center bg-white rounded-[40px] px-7 py-3 gap-6 flex-1">
          <span 
            className="font-medium text-xl whitespace-nowrap"
            style={{ 
              color: '#3C3C3C',
              fontFamily: 'Montserrat'
            }}
          >
            Autoria
          </span>
          <input
            type="text"
            value={autoria}
            onChange={(e) => onAutoriaChange(e.target.value)}
            placeholder={config.placeholderAutoria}
            className="flex-1 bg-transparent outline-none text-xl placeholder-opacity-60"
            style={{
              color: '#616060',
              fontFamily: 'Montserrat',
              fontWeight: 400,
              fontSize: '28px',
              lineHeight: '20px',
              opacity: autoria ? 1 : 0.6
            }}
          />
        </div>
      </div>
    </div>
  );
};