import Image from 'next/image';
import { EixoComRecortes, getIconForEixo } from '../helpers/repertorio-mapper'; // Ajuste o import conforme onde criou o arquivo

interface RepertorioFooterProps {
  dados: EixoComRecortes[];
}

export function RepertorioFooter({ dados }: RepertorioFooterProps) {
  if (!dados || dados.length === 0) return null;

  return (
    <div className="mt-12 pt-6 border-t border-gray-300/50 flex flex-col gap-6">
      {dados.map((grupo, index) => (
        <div key={index} className="flex flex-wrap items-center gap-y-3 gap-x-3">
          
          {/* --- EIXO (Pill Branca) --- */}
          <div className="bg-white pl-1.5 pr-4 py-1.5 rounded-full flex items-center gap-2 shadow-sm border border-gray-100">
            <div className="bg-brand-teal-secondary w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0">
               <Image 
                 src={getIconForEixo(grupo.nome)} 
                 alt={grupo.nome} 
                 width={16} 
                 height={16} 
                 className="w-4 h-4 invert brightness-0 saturate-100 filter-white"
               />
            </div>
            {/* Fonte Montserrat Medium */}
            <span className="text-sm font-montserrat font-medium text-gray-800 whitespace-nowrap">
              {grupo.nome}
            </span>
          </div>

          {/* --- RECORTES (Pills Cinzas) --- */}
          {grupo.recortes.map((recorte, idx) => (
            <span 
              key={idx} 
              // Fonte Montserrat Normal (Regular)
              className="px-4 py-2 bg-[#D9D9D9] rounded-full text-sm text-gray-700 font-montserrat font-normal hover:bg-gray-300 transition-colors cursor-default"
            >
              {recorte}
            </span>
          ))}

        </div>
      ))}
    </div>
  );
}