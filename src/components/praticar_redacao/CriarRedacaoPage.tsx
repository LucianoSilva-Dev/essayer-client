'use client'; // Necessário para usar hooks como useState

import { useState } from 'react';
import { CriarRedacaoForm } from './CriarRedacaoForm';
import { RedacoesCriadasList, RedacaoItem } from './RedacoesCriadasList';

// Mock de dados iniciais com o campo 'duration' adicionado
const initialRedacoes: RedacaoItem[] = [
  { id: '1', tema: 'O impacto das redes sociais na formação da identidade dos jovens', status: 'pendente', finalizada: true, duration: 30 },
  { id: '2', tema: 'O impacto das redes sociais na formação da identidade dos jovens', status: 'completa', finalizada: true, duration: 30 },
  { id: '3', tema: 'O impacto das redes sociais na formação da identidade dos jovens', status: 'sem_correcoes', finalizada: false, duration: 30 },
  { id: '4', tema: 'O impacto das redes sociais na formação da identidade dos jovens', status: 'erro', finalizada: true, duration: 30 },
];

export default function PraticarRedacaoPage() {
  const [redacoes, setRedacoes] = useState<RedacaoItem[]>(initialRedacoes);

  const addRedacao = (tema: string, duration: number) => {
    const newId = (redacoes.length + 1).toString();
    const newRedacao: RedacaoItem = {
      id: newId,
      tema,
      status: 'pendente',
      finalizada: false,
      duration,
    };
    // Adiciona o novo item no início da lista para aparecer primeiro
    setRedacoes(prev => [newRedacao, ...prev]); 
  };
  
  // Mock de temas para o modal
  const mockThemes = [
    'O impacto das redes sociais na formação da identidade dos jovens',
    'A crise hídrica no Brasil: desafios e soluções',
    'A importância da educação financeira para a juventude',
    'Os desafios da inteligência artificial na sociedade moderna'
  ];

  return (
    <div className="flex-1 p-8 md:p-12 lg:p-16 bg-gray-50"> 
      
      <h1 className="mb-8 text-[28px] font-medium text-[#3C3C3C]">
        Crie sua redação e começe a praticar
      </h1>

      <main className="space-y-12">
        {/* Passa a função de adicionar e a lista de temas para o formulário */}
        <CriarRedacaoForm onRedacaoCreated={addRedacao} mockThemes={mockThemes} />
        {/* Passa a lista de redações para a lista */}
        <RedacoesCriadasList redacoes={redacoes} />
      </main>
    </div>
  );
}