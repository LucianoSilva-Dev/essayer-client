// EixosRepertorioContent.tsx
"use client";

import React, { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useEixosRepertorio } from '../hooks/useEixosRepertorio';
import { EixoCard } from './EixoCard';
import { useAdicionarRepertorio } from '../hooks/useAdicionarRepertorio';

export default function EixosRepertorioContent() {
  const searchParams = useSearchParams();
  const tipoRepertorio = searchParams.get('tipo') as string;
  const tipoObra = searchParams.get('tipoObra') as string;

  const { dados: dadosCompletos, avancarEtapa, voltarEtapa } = useAdicionarRepertorio();

  const {
    eixos,
    eixoExpandido,
    eixosSelecionados,
    recortesSelecionados,
    expandirEixo,
    recolherEixo,
    toggleRecorte,
    desselecionarEixo,
    avancarParaDetalhes,
    voltarParaTipos
  } = useEixosRepertorio({
    dadosIniciais: {
      eixosSelecionados: dadosCompletos.eixosSelecionados,
      recortesSelecionados: dadosCompletos.recortesSelecionados
    },
    onAvancar: (dadosEixos) => {
      avancarEtapa(dadosEixos);
    },
    onVoltar: voltarEtapa
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        eixoExpandido &&
        !(event.target as Element).closest('.eixo-card-expandido')
      ) {
        recolherEixo();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [eixoExpandido, recolherEixo]);

  return (
    <main className="min-h-[calc(100vh-64px)] bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        
        {/* Header com animação de entrada */}
        <div className="mb-8 animate-in slide-in-from-top duration-500">
          <h1 className="text-2xl font-medium text-gray-800 mb-2">
            Selecione um eixo temático para ver os recortes relacionados
          </h1>
          <div className="text-gray-600">
            Criando {tipoRepertorio} {tipoObra && `- ${tipoObra}`}
          </div>
        </div>

        {/* Container dos cartões de eixos */}
        <div 
          className="relative max-w-[1168px] mx-auto"
          style={{
            height: 'calc(4 * 260px)' 
          }}
        >
          {eixos.map((eixo, index) => (
            <EixoCard
              key={eixo.id}
              eixo={eixo}
              expandido={eixoExpandido?.id === eixo.id}
              selecionado={eixosSelecionados.includes(eixo.id)}
              recortesSelecionados={recortesSelecionados}
              onExpandir={() => expandirEixo(eixo)}
              onRecolher={recolherEixo}
              onToggleRecorte={(recorte) => toggleRecorte(recorte, eixo.id)}
              onDesselecionar={() => desselecionarEixo(eixo.id)}
              index={index}
            />
          ))}
        </div>

        {/* Botão Avançar */}
        <div className="fixed bottom-8 right-8 animate-in fade-in duration-500 delay-1000 z-20">
          <button
            onClick={avancarParaDetalhes}
            disabled={eixosSelecionados.length === 0 || recortesSelecionados.length === 0}
            className={`
              px-8 py-4 rounded-2xl font-medium text-lg transition-all duration-300
              ${eixosSelecionados.length > 0 && recortesSelecionados.length > 0
                ? 'bg-[#075F70] text-white hover:bg-[#064c58] shadow-lg hover:shadow-xl'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }
            `}
            style={{
              fontFamily: 'Montserrat'
            }}
          >
            Avançar
          </button>
        </div>

        {/* Debug */}
        <div className="fixed bottom-4 left-4 bg-black text-white p-2 rounded text-sm">
          <div>Eixos: {eixosSelecionados.length}</div>
          <div>Recortes: {recortesSelecionados.length}</div>
        </div>
      </div>
    </main>
  );
}