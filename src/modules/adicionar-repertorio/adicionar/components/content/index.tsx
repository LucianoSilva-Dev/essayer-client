"use client";

import React, { useState } from 'react';
import { TipoRepertorioCard } from '../repertorio-card';
import { BandejaTiposObra } from '../bandeja-tipos-obra';
import { TipoObra, TipoRepertorio, useAddRepertorio } from '@/shared/contexts/add-repertorio-context';
import { useRouter } from 'next/navigation';

export default function AdicionarRepertorioContent() {
  const [bandejaAberta, setBandejaAberta] = useState(false);
  const [tipoSelecionado, setTipoSelecionado] = useState<TipoRepertorio | null>(null);
  const { setTipos } = useAddRepertorio();
  const router = useRouter()

  const fecharBandeja = () => {
    setBandejaAberta(false);
    setTipoSelecionado(null);
  };

  const selecionarTipo = (tipo: TipoRepertorio) => {
    if (bandejaAberta && tipo === 'obra') return;

    if (tipoSelecionado === tipo) {
      if (tipo === 'obra') {
        setBandejaAberta(true);
      } else {
        setTipos(tipo, undefined);
        router.push('/adicionar/eixos');
      }
    } else {
      setTipoSelecionado(tipo);
      setBandejaAberta(false);
    }
  }

  const selecionarTipoObra = (tipo: TipoObra) => {
    setTipos('obra', tipo);
    router.push('/adicionar/eixos');
  };

  const cardOrder: TipoRepertorio[] = ['obra', 'artigo', 'citacao'];

  return (
    <main className="min-h-[calc(100vh-80px)] bg-gray-50 flex flex-col items-center justify-center overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col items-center">

        {/* Título */}
        <h1
          className={`
            text-3xl font-medium text-gray-800 text-center pt-8 mb-12 transition-all duration-500
            ${bandejaAberta ? 'opacity-0 -translate-y-4 pointer-events-none' : 'opacity-100'}
          `}
        >
          Selecione um tipo de repertório que queira criar
        </h1>

        <div className="flex justify-center items-center h-auto md:h-150 w-full relative">

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 transition-all duration-700 w-full">

            {cardOrder.map((tipo, index) => {
              const isObra = tipo === 'obra';
              const shouldHide = bandejaAberta && !isObra;

              return (
                <div
                  key={tipo}
                  className={`
                    relative transition-all duration-500 ease-in-out flex justify-center w-full md:w-auto
                    ${shouldHide ? 'opacity-0 pointer-events-none' : 'opacity-100'}
                    ${isObra && bandejaAberta ? 'z-40' : 'z-auto'}
                  `}
                >
                  {isObra && (
                    <BandejaTiposObra
                      isOpen={bandejaAberta}
                      onSelect={selecionarTipoObra}
                      onClose={fecharBandeja}
                    />
                  )}

                  <TipoRepertorioCard
                    tipo={tipo}
                    selecionado={tipoSelecionado === tipo}
                    onClick={selecionarTipo}
                    /* Card Obra deve ser maior que a Bandeja (10), então 20 está ótimo */
                    zIndex={isObra ? 20 : (cardOrder.length - index)}
                    showBackButton={bandejaAberta && isObra}
                    onBack={fecharBandeja}
                  />
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </main>
  );
}