'use client';

import { Pause, Play, BookOpen } from 'lucide-react';

interface Props {
  tempoRestante: number;
  isPaused: boolean;
  onPauseToggle: () => void;
  onOpenMotivacional: () => void; 
}

function formatarTempo(segundos: number) {
  const min = Math.floor(segundos / 60);
  const seg = segundos % 60;
  return `${min.toString().padStart(2, '0')}:${seg.toString().padStart(2, '0')}`;
}

export function RedacaoHeader({ tempoRestante, isPaused, onPauseToggle, onOpenMotivacional }: Props) {
  return (
    <div className="w-full flex justify-end items-center gap-6">
      
      {/* --- BOTÃO TEXTOS MOTIVACIONAIS --- */}
      <button 
        onClick={onOpenMotivacional}
        className="flex items-center gap-2 text-[#3C3C3C] font-semibold text-lg hover:text-[#075F70] transition-colors duration-200"
      >
        {/* REMOVIDO: Classes de cor daqui. O ícone agora herda a cor do botão pai. */}
        <BookOpen size={24} />
        <span>Textos motivacionais</span>
      </button>

      {/* Bloco do Timer */}
      <div className="flex items-center gap-[15px]">
        <span 
          className="bg-[#DCDCDD] rounded-[15px] 
                     px-2 py-1 
                     text-[#3C3C3C] font-semibold text-xl"
        >
          {formatarTempo(tempoRestante)}
        </span>

        <button
          onClick={onPauseToggle}
          // Ajustei o hover aqui também conforme seu pedido anterior (#064e5c)
          className="w-11 h-11 bg-[#075F70] hover:bg-[#064e5c] rounded-full 
                     flex items-center justify-center transition-colors shadow-sm"
        >
          {isPaused ? (
            <Play size={20} fill="white" strokeWidth={0} />
          ) : (
            <Pause size={20} fill="white" strokeWidth={0} />
          )}
        </button>
      </div>
    </div>
  );
}