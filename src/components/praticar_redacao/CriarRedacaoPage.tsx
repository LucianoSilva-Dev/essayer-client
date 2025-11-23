'use client'; // Necessário para usar hooks como useState

import { useCallback, useEffect, useState } from 'react';
import { CriarRedacaoForm } from './CriarRedacaoForm';
import { RedacoesCriadasList } from './RedacoesCriadasList';
import { createRedacaoLivre, getAllRedacaoLivre } from '@/apiCalls/redacao-livre';
import { RedacaoLivreDoc } from '@/apiCalls/redacao-livre/types';
import { useRouter } from 'next/navigation';

export default function PraticarRedacaoPage() {
  const [redacoes, setRedacoes] = useState<RedacaoLivreDoc[]>([]);
  const router = useRouter()

  useEffect(() => {
    (async () => {
      const response = await getAllRedacaoLivre();
      setRedacoes(response)
    })()
  }, [])

  const addRedacao = async (tema: string, duration: number) => {
    const response = await createRedacaoLivre({tema, duracao: duration * 60});
    router.push(`/praticar_redacao/${response.id}`);
  };

  const handleChange = async (text: string) => {
    const response = await getAllRedacaoLivre(text.trim())
    if (response) setRedacoes(response)
  }
  
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
        <RedacoesCriadasList redacoes={redacoes} handleChange={handleChange}/>
      </main>
    </div>
  );
}