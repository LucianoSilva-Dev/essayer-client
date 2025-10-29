// src/components/praticar_redacao/editor/RedacaoHeader.tsx

import { Pause, Play } from 'lucide-react';

interface Props {
  tema: string;
  tempoRestante: number;
  isPaused: boolean;
  onPauseToggle: () => void;
}

// Função helper para formatar o tempo
function formatarTempo(segundos: number) {
  const min = Math.floor(segundos / 60);
  const seg = segundos % 60;
  return `${min.toString().padStart(2, '0')}:${seg.toString().padStart(2, '0')}`;
}

export function RedacaoHeader({ tema, tempoRestante, isPaused, onPauseToggle }: Props) {
  return (
    <header className="flex justify-between items-center w-full mb-4 px-2">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
        {tema}
      </h1>
      <div className="flex items-center gap-3">
        <span className="text-xl font-mono text-gray-700">
          {formatarTempo(tempoRestante)}
        </span>
        <button
          onClick={onPauseToggle}
          className="w-10 h-10 rounded-full bg-[#075F70] text-white flex items-center justify-center
                     hover:bg-opacity-90 transition-colors"
        >
          {isPaused ? <Play size={20} /> : <Pause size={20} />}
        </button>
      </div>
    </header>
  );
}