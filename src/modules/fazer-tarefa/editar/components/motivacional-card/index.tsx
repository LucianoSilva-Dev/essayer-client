import React from 'react';
import Image from 'next/image';

export interface TextoData {
  id: string | number;
  titulo: string;
  tipo: string;
  conteudo: string;
}

const getTypeStyle = (tipo: string) => {
  const tipoNormalized = tipo.toLowerCase();
  switch (tipoNormalized) {
    case 'obra':
      return { color: '#CA9C60', icon: '/icons/coloredObraIcon.svg' };
    case 'citação':
    case 'citacao':
      return { color: '#0C8462', icon: '/icons/coloredCitacaoIcon.svg' };
    case 'artigo':
      return { color: '#2258B6', icon: '/icons/coloredArtigoIcon.svg' };
    default:
      return { color: '#0F5F68', icon: '/icons/coloredObraIcon.svg' };
  }
};

interface Props {
  data: TextoData;
}

export function MotivacionalCard({ data }: Props) {
  const style = getTypeStyle(data.tipo);

  return (
    <div className="w-full h-full bg-white rounded-[20px] p-6 md:p-8 flex flex-col overflow-hidden">
      
      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6 border-b border-gray-100 pb-4">
        <h3 className="font-bold text-neutral-dark text-xl md:text-2xl leading-tight">
          {data.titulo}
        </h3>
        
        {/* Badge */}
        <div 
          className="flex items-center gap-2 shrink-0 bg-opacity-10 rounded-full py-1.5 px-3"
          style={{ backgroundColor: `${style.color}15` }}
        >
          <div className="w-5 h-5 relative">
            <Image 
              src={style.icon} 
              alt={data.tipo} 
              width={20} 
              height={20}
              className="object-contain"
            />
          </div>
          <span 
            className="text-sm font-bold uppercase tracking-wide"
            style={{ color: style.color }}
          >
            {data.tipo}
          </span>
        </div>
      </div>

      {/* Conteúdo com Scroll */}
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <p className="text-gray-600 text-base md:text-lg leading-relaxed text-justify whitespace-pre-line">
          {data.conteudo}
        </p>
      </div>
    </div>
  );
}