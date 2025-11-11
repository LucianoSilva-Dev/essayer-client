"use client";

import React, { useState } from 'react';
import { TipoRepertorioCard } from './TipoRepertorioCard';
import { BandejaTiposObra } from './BandejaTiposObra';
import { TipoObra, TipoRepertorio, useAddRepertorio } from '@/contexts/add-repertorio-context';
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
    if (tipoSelecionado === tipo) {
      // Segundo clique - confirmar seleção
      if (tipo === 'obra') {
        setBandejaAberta(true);
      } else {
        // Artigo ou citação - avançar diretamente
        setTipos(tipo, undefined);
        router.push('/adicionar/eixos');
      }
    } else {
      // Primeiro clique - destacar
      setTipoSelecionado(tipo);
      setBandejaAberta(false);
    }
  }

  const selecionarTipoObra = (tipo: TipoObra) => {
    setTipos('obra', tipo);
    setBandejaAberta(false);
    // Avançar para próxima etapa após selecionar tipo de obra
    router.push('/adicionar/eixos');
  };

  // Ordem de entrada dos cards (z-index)
  const cardOrder: TipoRepertorio[] = ['obra', 'artigo', 'citacao'];

  return (
    <main className="min-h-[calc(100vh-80px)] bg-gray-50">
      <div className="container mx-auto px-4">

        {/* Título */}
        <h1 className="text-3xl font-medium text-gray-800 text-center mb-8">
          Selecione um tipo de repertório que queira criar
        </h1>

        {/* Container dos Cards */}
        <div className="flex justify-center items-center">
          <div className="flex flex-row items-center justify-center gap-10 relative">
            {cardOrder.map((tipo, index) => (
              <TipoRepertorioCard
                key={tipo}
                tipo={tipo}
                selecionado={tipoSelecionado === tipo}
                onClick={selecionarTipo}
                zIndex={cardOrder.length - index} // Artigo tem z-index maior
              />
            ))}
          </div>
        </div>

        {/* Bandeja de Tipos de Obra */}
        <BandejaTiposObra
          isOpen={bandejaAberta}
          onSelect={selecionarTipoObra}
          onClose={fecharBandeja}
        />

        {/* Debug (remover na produção) */}
        <div className="fixed bottom-4 left-24 bg-black text-white p-2 rounded text-sm">
          <div>Selecionado: {tipoSelecionado}</div>
          <div>Bandeja: {bandejaAberta ? 'Aberta' : 'Fechada'}</div>
        </div>
      </div>
    </main>
  );
}