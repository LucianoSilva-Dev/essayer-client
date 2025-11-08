"use client";

import React from 'react';
import { useTipoRepertorio, TipoRepertorio } from '../hooks/useTipoRepertorio';
import { TipoRepertorioCard } from './TipoRepertorioCard';
import { BandejaTiposObra } from './BandejaTiposObra';
import { useAdicionarRepertorio } from '../hooks/useAdicionarRepertorio';

export default function AdicionarRepertorioContent() {
  const { dados, avancarEtapa } = useAdicionarRepertorio();

  const {
    tipoSelecionado,
    tipoObraSelecionado,
    bandejaAberta,
    selecionarTipo,
    selecionarTipoObra,
    fecharBandeja
  } = useTipoRepertorio({
    dadosIniciais: {
      tipoRepertorio: dados.tipoRepertorio,
      tipoObra: dados.tipoObra
    },
    onAvancar: (dadosTipo) => {
      avancarEtapa(dadosTipo);
    }
  });

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
          <div>Tipo Obra: {tipoObraSelecionado}</div>
          <div>Bandeja: {bandejaAberta ? 'Aberta' : 'Fechada'}</div>
        </div>
      </div>
    </main>
  );
}