'use client';

import { useEffect, useState } from 'react';
import { getRedacaoLivre } from '@/lib/apiCalls/redacao-livre';

export function RedacaoTema({ id }: { id: string }) {
  const [tema, setTema] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await getRedacaoLivre(id);
        setTema(response.tema);
      } catch (error) {
        console.error("Erro ao buscar tema", error);
      } finally {
        setLoading(false);
      }
    })()
  }, [id]);

  if (loading) {
    // Um esqueleto simples centralizado enquanto carrega
    return <div className="h-10 w-2/3 bg-gray-200 animate-pulse rounded mx-auto mb-8" />;
  }

  return (
    <h1 className="text-3xl md:text-4xl font-bold text-brand-teal-dark text-center mb-8 px-4">
      {tema}
    </h1>
  );
}