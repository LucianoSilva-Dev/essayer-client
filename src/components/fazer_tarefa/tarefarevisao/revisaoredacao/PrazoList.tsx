import React from 'react';
import TextoCard from './TextoCard';

interface Texto {
  id: number;
  titulo: string;
  tipo: string;
  conteudo: string;
}

export default function TextoList({ textos }: { textos: Texto[] }) {
  return (
    <div className="w-full">
      <div className="mb-4">
        <h2 className="text-[#0F5F68] text-lg font-bold">Textos motivacionais</h2>
        <p className="text-gray-600 text-sm">
          Abaixo os repertórios escolhidos para servirem de base como textos motivacionais
        </p>
      </div>
      
      {/* Container com scroll horizontal caso tenha muitos, ou wrap */}
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {textos.map((texto) => (
          <TextoCard key={texto.id} data={texto} />
        ))}
      </div>
    </div>
  );
}