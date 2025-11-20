// src/app/praticar_redacao/[redacaoID]/page.tsx

import { RedacaoPage } from '@/components/praticar_redacao/editor/RedacaoPage';

export default async function PraticarRedacaoIdPage({
  params,
}: {
  params: { redacaoID: string };
}) {
  return (
    // Fundo da página (sem cor, como pedido)
    <main 
      className="flex flex-col items-center min-h-screen py-12 px-4"
    >
      {/* 1. TEMA */}
      <h1 
        className="text-3xl md:text-3xl font-bold text-[#075F70] text-center mb-12"
      >
        {/* 
          Mudar o tema para uma página 'use client'
        
        */} 
        {/* {redacaoData.tema} */}
      </h1>

      {/* 2. CONTAINER RELATIVO (Define a largura máxima e a altura) */}
      <div className="relative w-full max-w-6xl">
        
        {/* 3. CAMADA DE GRADIENTE (Atrás) */}
        {/*
          ALTERAÇÃO:
          - O card (abaixo) tem 'mt-8'.
          - O gradiente terá 'top-12' (começa 16px *abaixo* do card).
          - O gradiente terá 'bottom-4' (termina 16px *acima* do fundo).
          - Isso o torna 32px mais baixo que o container do card.
        */}
        <div 
          className="absolute w-full left-0 
                     top-8 bottom-10
                     bg-gradient-to-b from-[#F9FAFB] from-[13.46%] to-[#075F70] to-[72.6%] 
                     opacity-65 rounded-[70px]"
        />

        {/* 4. O "REVESTIMENTO" (Card, na frente) */}
        {/* 'mt-8' define o topo do card.
          Como 'top-12' do gradiente é > 'mt-8', o card vai "vazar" para cima.
          Como 'bottom-4' do gradiente é > 0, o card vai "vazar" para baixo.
        */}
        <div className="relative w-full max-w-5xl mx-auto mt-8">
          <RedacaoPage id={params.redacaoID} />
        </div>
      </div>
    </main>
  );
}