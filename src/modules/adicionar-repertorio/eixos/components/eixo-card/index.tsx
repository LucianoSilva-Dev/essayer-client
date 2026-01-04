// EixoCard.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { Eixo } from '@/shared/contexts/add-repertorio-context';
import { Leaf, Brain, HeartPulse, Palette, Scale, BookOpen, Cpu, BarChart3, X } from 'lucide-react';

interface EixoCardProps {
  eixo: Eixo;
  expandido: boolean;
  selecionado: boolean;
  recortesSelecionados: string[];
  onExpandir: () => void;
  onRecolher: () => void;
  onToggleRecorte: (recorte: string) => void;
  onDesselecionar: () => void;
  index: number;
}

const icones = {
  Leaf, Brain, HeartPulse, Palette, Scale, BookOpen, Cpu, BarChart3
};

export const EixoCard: React.FC<EixoCardProps> = ({ 
  eixo, 
  expandido, 
  selecionado, 
  recortesSelecionados,
  onExpandir,
  onRecolher,
  onToggleRecorte,
  onDesselecionar,
  index 
}) => {
  const nomeIcone = eixo.icone.match(/<(\w+)/)?.[1] || 'Leaf';
  const IconeComponente = icones[nomeIcone as keyof typeof icones] || Leaf;

  // Hook para detectar breakpoint
  const [isDesktop, setIsDesktop] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [containerWidth, setContainerWidth] = useState(1168);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      // Detectar se há espaço suficiente para 2 colunas (572px * 2 + 24px gap + margens)
      const availableWidth = window.innerWidth - 32; // 16px padding de cada lado
      const canFitTwoColumns = availableWidth >= 572 * 2 + 24;
      setIsDesktop(canFitTwoColumns);
      setContainerWidth(Math.min(availableWidth, 1168));
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- Lógica de Posição e Animação ---
  const cols = !mounted ? 2 : (isDesktop ? 2 : 1);
  const row = Math.floor(index / cols);
  const col = index % cols;

  const cardWidth = 572;
  const cardHeight = 236;
  const gap = 24;

  const style: React.CSSProperties = {
    transition: 'all 600ms cubic-bezier(0.4, 0.0, 0.2, 1)',
    position: 'absolute',
    top: `${row * (cardHeight + gap)}px`,
    // Lógica de Expansão:
    left: expandido 
      ? '0px' 
      : !mounted 
        ? `${col * (cardWidth + gap)}px`
        : isDesktop 
          ? `${col * (cardWidth + gap)}px`
          : '0px',
    width: expandido 
      ? !mounted || isDesktop
        ? `${cardWidth * 1.7 + gap}px`
        : '100%'
      : !mounted || isDesktop
        ? `${cardWidth}px`
        : '100%',
    minHeight: `${expandido ? '288px' : cardHeight + 'px'}`,
    height: expandido ? 'auto' : `${cardHeight}px`,
    zIndex: expandido ? 50 : 10 + index, 
  };

  const rowDelay = `${row * 150}ms`;

  const recortesParaMostrar = selecionado 
    ? [
        ...eixo.recortes.filter(r => recortesSelecionados.includes(r)),
        ...eixo.recortes.filter(r => !recortesSelecionados.includes(r))
      ].slice(0, 2)
    : eixo.recortes.slice(0, 2);


  return (
    <div
      style={{ ...style, animationDelay: rowDelay }}
      className={`
        rounded-[32px] p-4 md:p-6 shadow-lg
        ${expandido 
          ? `eixo-card-expandido ${selecionado ? 'bg-[#E5EFF0]' : 'bg-[#F1F1F2]'}`
          : `
              ${selecionado ? 'bg-[#E5EFF0]' : 'bg-[#E0E0E0]'}
              cursor-pointer hover:scale-105 transition-all duration-300
              animate-in fade-in slide-in-from-top-4
            `
        }
      `}
      onClick={!expandido ? onExpandir : undefined}
    >
      
      {expandido ? (
        
        // --- CONTEÚDO EXPANDIDO ---
        <div className="animate-in fade-in duration-300 delay-200">
          {/* Header do expandido */}
          <div className="flex items-start gap-7 mb-7">
            <div className="flex items-center justify-between w-full gap-3">
              <div className="flex flex-row items-center gap-3">
              <div className="flex items-center justify-center w-15 h-15 bg-white rounded-[40px]">
                <IconeComponente className="h-7 w-7" style={{ color: '#075F70' }} />
              </div>
              <div>
                <h2 
                  className="font-medium text-2xl mb-2 transition-colors duration-200"
                  style={{ color: selecionado ? '#075F70' : '#2F2F2F', fontFamily: 'Montserrat', lineHeight: '29px' }}
                >
                  {eixo.nome}
                </h2>
                <p 
                  className="text-lg transition-all duration-200"
                  style={{ color: selecionado ? 'rgba(7, 95, 112, 0.6)' : '#3C3C3C', fontFamily: 'Montserrat', fontWeight: 500, lineHeight: '24px' }}
                >
                  {eixo.descricao}
                </p>
              </div>
              </div>
              <div className="ml-auto -mt-3 justify-self-end">
                {selecionado && (<X
                  className="h-7 w-7 cursor-pointer"
                  style={{ color: '#075F70' }}
                  onClick={onDesselecionar} 
                />)}
              </div>
            </div>
          </div>

          {/* Grid de Recortes Expandido */}
          <div className="mb-6">
            <div className="flex flex-row flex-wrap gap-4">
              {eixo.recortes.map((recorte: string, recorteIndex: number) => {
                const recorteSelecionado = recortesSelecionados.includes(recorte);
                return (
                  <button
                    key={recorteIndex}
                    onClick={() => onToggleRecorte(recorte)}
                    className={`
                      flex items-center px-4 py-3 rounded-[40px] transition-all duration-200
                      ${recorteSelecionado
                        ? 'bg-[#075F70] text-white shadow-md'
                        : 'bg-white text-[#3C3C3C] hover:bg-gray-50'
                      }
                    `}
                    style={{
                      fontFamily: 'Montserrat',
                      fontWeight: recorteSelecionado ? 600 : 500,
                      fontSize: '20px',
                      lineHeight: '24px',
                      height: '48px'
                    }}
                  >
                    {recorte}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

      ) : (

        // --- CONTEÚDO COLAPSADO ---
        <div className="flex flex-col items-start gap-3 md:gap-5 w-full">
          {/* Header com ícone, título e X */}
          <div className="flex flex-row items-center justify-between w-full gap-2">
            <div className="flex flex-row items-center gap-2 md:gap-3 flex-1 min-w-0">
              <div className="flex items-center justify-center w-12 h-12 md:w-15 md:h-15 bg-white rounded-[40px] p-2 flex-shrink-0">
                <IconeComponente 
                  className="h-6 w-6 md:h-7 md:w-7" 
                  style={{ color: '#075F70' }}
                />
              </div>
              <h3 
                className="font-medium text-lg md:text-2xl break-words"
                style={{
                  color: selecionado ? '#075F70' : '#2F2F2F',
                  fontFamily: 'Montserrat',
                  lineHeight: '29px'
                }}
              >
                {eixo.nome}
              </h3>
            </div>
            
            {selecionado && (
              <X 
                className="h-6 w-6 md:h-7 md:w-7 cursor-pointer flex-shrink-0"
                style={{ color: '#075F70' }}
                onClick={(e) => {
                  e.stopPropagation();
                  onDesselecionar();
                }}
              />
            )}
          </div>

          {/* Descrição */}
          <p 
            className="text-lg leading-6 break-words"
            style={{
              color: selecionado ? 'rgba(7, 95, 112, 0.6)' : '#3C3C3C',
              fontFamily: 'Montserrat',
              fontWeight: 500,
              maxWidth: 'calc(100% - 60px)'
            }}
          >
            {eixo.descricao}
          </p>

          {/* Recortes (máximo 2 mostrados) */}
          <div className="flex flex-row flex-wrap items-start gap-2 pb-3 w-full">
            {recortesParaMostrar.map((recorte: string, recorteIndex: number) => {
              const recorteSelecionado = recortesSelecionados.includes(recorte);
              const isPrimeiroSelecionado = selecionado && recorteIndex === 0 && recorteSelecionado;
              const isSegundoSelecionado = selecionado && recorteIndex === 1 && recorteSelecionado;
              
              return (
                <div
                  key={recorteIndex}
                  className={`
                    flex items-center px-3 py-2 rounded-[40px] shadow-md whitespace-normal break-words max-w-full
                    ${isPrimeiroSelecionado || isSegundoSelecionado ? 'bg-[#075F70]' : 'bg-white'}
                  `}
                >
                  <span 
                    className={`
                      font-medium text-sm md:text-lg
                      ${isPrimeiroSelecionado || isSegundoSelecionado ? 'text-white font-semibold' : 'text-[#3C3C3C] font-medium'}
                    `}
                    style={{
                      fontFamily: 'Montserrat',
                      lineHeight: '24px'
                    }}
                  >
                    {recorte}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};