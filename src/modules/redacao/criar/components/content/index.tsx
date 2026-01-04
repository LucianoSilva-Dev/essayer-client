'use client';

import { useEffect, useState } from 'react';
import { CriarRedacaoForm } from '../form';
import { RedacoesCriadasList } from '../../list';
import { createRedacaoLivre, getAllRedacaoLivre } from '@/lib/apiCalls/redacao-livre';
import { RedacaoLivreDoc } from '@/lib/apiCalls/redacao-livre/types';
import { useRouter } from 'next/navigation';

export default function PraticarRedacaoPage() {
  const [redacoes, setRedacoes] = useState<RedacaoLivreDoc[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState<Boolean>(false)
  const router = useRouter()

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await getAllRedacaoLivre();
      setRedacoes(response)
      setIsLoading(false);
      setReload(false)
    })()
  }, [reload])

  const addRedacao = async (tema: string, duration: number) => {
    const response = await createRedacaoLivre({tema, duracao: duration * 60});
    router.push(`/praticar_redacao/${response.id}`);
  };

  const handleChange = async (text: string) => {
    const response = await getAllRedacaoLivre(text.trim())
    if (response) setRedacoes(response)
  }
  
  const mockThemes = [
    'O impacto das redes sociais na formação da identidade dos jovens',
    'A crise hídrica no Brasil: desafios e soluções',
    'A importância da educação financeira para a juventude',
    'Os desafios da inteligência artificial na sociedade moderna'
  ];

  return (
    <div className="flex-1 p-6 md:p-12 bg-gray-50 font-montserrat min-h-screen"> 
      
      <div className="max-w-[1400px] mx-auto space-y-8">
        <h1 className="text-2xl md:text-2xl font-semibold text-[#3C3C3C]">
          Praticar Redação
        </h1>

        {/* ALTERAÇÃO: Aumentei o espaçamento vertical para space-y-24 (96px) para dar respiro */}
        <main className="space-y-16">
          <CriarRedacaoForm onRedacaoCreated={addRedacao} mockThemes={mockThemes} />
          <RedacoesCriadasList redacoes={redacoes} handleChange={handleChange} onDeletion={setReload} isLoading={isLoading}/>
        </main>
      </div>
    </div>
  );
}