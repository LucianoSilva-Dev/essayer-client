import React from 'react';
import Image from 'next/image';

interface TextoData {
  titulo: string;
  tipo: string;
  conteudo: string;
}

// Configuração de cores e ícones baseada no tipo
const getTypeStyle = (tipo: string) => {
  const tipoNormalized = tipo.toLowerCase();

  switch (tipoNormalized) {
    case 'obra':
      return {
        color: '#CA9C60', // Dourado
        icon: '/coloredObraIcon.svg'
      };
    case 'citação':
    case 'citacao':
      return {
        color: '#0C8462', // Verde
        icon: '/coloredCitacaoIcon.svg'
      };
    case 'artigo':
      return {
        color: '#2258B6', // Azul
        icon: '/coloredArtigoIcon.svg'
      };
    default:
      return {
        color: '#0F5F68', 
        icon: '/coloredObraIcon.svg' 
      };
  }
};

export default function TextoCard({ data }: { data: TextoData }) {
  const style = getTypeStyle(data.tipo);

  return (
    <div className="w-full h-full bg-white rounded-[20px] p-6 shadow-sm border border-gray-200 flex flex-col relative overflow-hidden">
      
      {/* Cabeçalho do Card */}
      <div className="flex justify-between items-start mb-4 gap-2">
        <h3 
          className="font-bold text-gray-800 text-lg line-clamp-2 leading-tight" 
          title={data.titulo}
        >
            {data.titulo}
        </h3>
        
        {/* Badge de Tipo */}
        <div 
          className="flex items-center gap-1.5 shrink-0 bg-opacity-10 rounded-full py-1 px-2"
          style={{ backgroundColor: `${style.color}15` }}
        >
           <div className="w-4 h-4 relative">
             <Image 
               src={style.icon} 
               alt={data.tipo} 
               width={16} 
               height={16}
               className="object-contain"
             />
           </div>
           <span 
             className="text-xs font-bold uppercase tracking-wide"
             style={{ color: style.color }}
           >
             {data.tipo}
           </span>
        </div>
      </div>

      {/* Conteúdo com Fade */}
      <div className="relative flex-1 overflow-hidden">
        <p className="text-gray-600 text-sm leading-relaxed text-justify">
          {data.conteudo}
        </p>
        
        {/* Gradiente reduzido para h-16 conforme solicitado */}
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white via-white/90 to-transparent pointer-events-none" />
      </div>
    </div>
  );
}