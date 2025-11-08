"use client";

import React from 'react';

interface SinteseSectionProps {
  sintese: string;
  onSinteseChange: (sintese: string) => void;
  tipoRepertorio: string;
}

const getLabelSintese = (tipo: string) => {
  const labels = {
    artigo: 'Síntese',
    obra: 'Sinopse', 
    citacao: 'Citação'
  };
  return labels[tipo as keyof typeof labels] || 'Síntese';
};

const getPlaceholderSintese = (tipo: string) => {
  const placeholders = {
    artigo: 'Escreva a síntese do artigo aqui...',
    obra: 'Escreva a sinopse da obra aqui...',
    citacao: 'Escreva a citação aqui...'
  };
  return placeholders[tipo as keyof typeof placeholders] || 'Escreva aqui...';
};

export const SinteseSection: React.FC<SinteseSectionProps> = ({
  sintese,
  onSinteseChange,
  tipoRepertorio
}) => {
  const label = getLabelSintese(tipoRepertorio);
  const placeholder = getPlaceholderSintese(tipoRepertorio);

  return (
    <div className="bg-[#E8E8E8] rounded-[88px] px-12 py-4">
      <div className="space-y-7">
        {/* Label */}
        <h3 
          className="font-medium text-3xl"
          style={{
            color: '#434343',
            fontFamily: 'Montserrat',
            lineHeight: '20px'
          }}
        >
          {label}
        </h3>

        {/* Textarea */}
        <div className="space-y-3">
          <textarea
            value={sintese}
            onChange={(e) => onSinteseChange(e.target.value)}
            placeholder={placeholder}
            rows={4}
            className="w-full bg-transparent outline-none resize-none placeholder-opacity-100"
            style={{
              color: '#898787',
              fontFamily: 'Noto Serif Gujarati',
              fontWeight: 300,
              fontSize: '32px',
              lineHeight: '48px',
              minHeight: '120px'
            }}
          />
          
          {/* Linha divisória */}
          <div className="border-t border-[#BDB4B4] w-full"></div>
        </div>
      </div>
    </div>
  );
};