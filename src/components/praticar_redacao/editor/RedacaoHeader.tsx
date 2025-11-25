// src/components/praticar_redacao/editor/RedacaoHeader.tsx
'use client';

import { Pause, Play } from 'lucide-react';

interface Props {
  tempoRestante: number;
  isPaused: boolean;
  onPauseToggle: () => void;
}

function formatarTempo(segundos: number) {
  const min = Math.floor(segundos / 60);
  const seg = segundos % 60;
  return `${min.toString().padStart(2, '0')}:${seg.toString().padStart(2, '0')}`;
}

export function RedacaoHeader({ tempoRestante, isPaused, onPauseToggle }: Props) {
  return (
    // Posicionado no canto do 'revestimento'
    <div className="absolute top-6 right-8 flex items-center gap-[15px] z-10">
      {/* Timer com fundo */}
      <span
        className="bg-[#DCDCDD] rounded-[15px] 
                   px-2 py-1 
                   text-[#3C3C3C] font-semibold text-xl" // Fonte reduzida
      >
        {formatarTempo(tempoRestante)}
      </span>

      {/* Botão de Pausar/Play */}
      <button
        onClick={onPauseToggle}
        className="w-11 h-11 bg-[#075F70] hover:bg-[#086f80] rounded-full 
                   flex items-center justify-center transition-colors"
      >
        {/* Ícones preenchidos de branco */}
        {isPaused ? (
          <Play size={20} fill="white" strokeWidth={0} />
        ) : (
          <Pause size={20} fill="white" strokeWidth={0} />
        )}
      </button>
    </div>
  );
}