'use client';

import { useState, useRef } from 'react'; // Adicionado useRef
import { Play, Sparkles, Timer } from 'lucide-react';
import { TemasProntosModal } from './TemasProntosModal';

interface CriarRedacaoFormProps {
  onRedacaoCreated: (tema: string, duration: number) => void;
  mockThemes: string[];
}

export function CriarRedacaoForm({ onRedacaoCreated, mockThemes }: CriarRedacaoFormProps) {
  const [tema, setTema] = useState('');
  const [duration, setDuration] = useState(30);
  const [key, setKey] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Refs para controlar o intervalo do clique longo
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const isButtonDisabled = tema.trim() === '';

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isButtonDisabled) return;
    onRedacaoCreated(tema, duration);
    setTema('');
    setDuration(30);
  };

  // Função centralizada para atualizar a duração
  const updateDuration = (amount: number) => {
    setDuration(prev => {
      const newDuration = prev + amount;
      // CORREÇÃO: Mínimo ajustado para 30 minutos
      if (newDuration >= 30 && newDuration <= 180) {
        setKey(prevKey => prevKey + 1);
        return newDuration;
      }
      return prev;
    });
  };

  // Inicia a mudança (Clique ou Segurar)
  const startChange = (amount: number) => {
    // Muda imediatamente no primeiro clique
    updateDuration(amount);

    // Aguarda 500ms antes de começar a repetição rápida
    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        updateDuration(amount);
      }, 100); // Velocidade da repetição (100ms)
    }, 500);
  };

  // Para a mudança ao soltar ou sair do botão
  const stopChange = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleThemeSelect = (selectedTema: string) => {
    setTema(selectedTema);
    setIsModalOpen(false);
  };

  const formattedDuration = String(duration).padStart(2, '0');
  const ELEMENT_HEIGHT = "h-[72px]";

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 md:p-12 rounded-[48px] shadow-xl shadow-[#075F70]/5 border border-gray-100 font-montserrat w-full relative z-10"
      >
        <div className="flex flex-col gap-10">
          
          {/* --- SEÇÃO DO TEMA --- */}
          <div className="w-full space-y-3">
            <label htmlFor="tema" className="text-xl font-medium text-[#3C3C3C] ml-2 block">
              Tema da redação
            </label>

            <div 
              className={`
                relative w-full transition-all duration-200 ease-out
                ${isFocused ? 'scale-[1.01]' : 'scale-100'}
              `}
            >
              <input
                type="text"
                id="tema"
                value={tema}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={(e) => setTema(e.target.value)}
                placeholder="Digite o tema aqui..."
                className={`
                  w-full ${ELEMENT_HEIGHT} pl-8 pr-[13rem] 
                  bg-gray-50 border-2 
                  ${isFocused ? 'border-[#075F70] bg-white' : 'border-transparent hover:bg-gray-100'}
                  rounded-[28px] text-lg text-[#3C3C3C] font-medium
                  placeholder:text-gray-400 placeholder:font-normal
                  focus:outline-none transition-all duration-200
                `}
              />
              
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className={`
                  absolute right-3 top-3 bottom-3 px-6 
                  bg-white text-[#075F70] border border-gray-200
                  rounded-[20px] font-medium text-sm
                  flex items-center gap-2
                  hover:border-[#075F70] hover:bg-[#075F70]/5
                  transition-all duration-200 active:scale-95
                `}
              >
                <Sparkles size={16} />
                <span>Temas prontos</span>
              </button>
            </div>
          </div>

          {/* --- SEÇÃO INFERIOR: DURAÇÃO + AÇÃO --- */}
          <div className="flex flex-col lg:flex-row items-end lg:items-center justify-between gap-6">
            
            {/* Controle de Duração */}
            <div className="w-full lg:w-auto space-y-3">
              <label className="text-xl font-medium text-[#3C3C3C] ml-2 block">
                Duração estimada
              </label>

              <div
                className={`
                  flex items-center justify-between bg-gray-50 border-2 border-transparent hover:border-gray-100
                  rounded-[32px] ${ELEMENT_HEIGHT} pl-2 pr-3 w-full lg:w-auto min-w-[300px]
                  transition-all duration-200
                `}
              >
                <div className="flex items-center gap-2">
                  {/* Botão Menos - Com suporte a Long Press */}
                  <button
                    type="button"
                    // Eventos para Desktop e Mobile
                    onMouseDown={() => startChange(-10)}
                    onMouseUp={stopChange}
                    onMouseLeave={stopChange}
                    onTouchStart={() => startChange(-10)}
                    onTouchEnd={stopChange}
                    // Desabilitado se for 30 ou menos
                    disabled={duration <= 30}
                    className={`
                      w-12 h-12 rounded-full flex items-center justify-center
                      text-gray-400 hover:text-[#075F70] hover:bg-white hover:shadow-sm
                      disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-400
                      transition-all duration-200 active:scale-90 select-none
                    `}
                  >
                    <Play size={20} fill='currentColor' className="transform rotate-180" />
                  </button>

                  <div className="flex flex-col items-center justify-center w-20">
                    <span
                      key={key}
                      className="text-3xl font-semibold text-[#3C3C3C] leading-none tracking-tight select-none"
                      style={{ animation: `duration-change 0.3s ease-out forwards` }}
                    >
                      {formattedDuration}
                    </span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5 select-none">min</span>
                  </div>

                  {/* Botão Mais - Com suporte a Long Press */}
                  <button
                    type="button"
                    onMouseDown={() => startChange(10)}
                    onMouseUp={stopChange}
                    onMouseLeave={stopChange}
                    onTouchStart={() => startChange(10)}
                    onTouchEnd={stopChange}
                    disabled={duration >= 180}
                    className={`
                      w-12 h-12 rounded-full flex items-center justify-center
                      text-gray-400 hover:text-[#075F70] hover:bg-white hover:shadow-sm
                      disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-400
                      transition-all duration-200 active:scale-90 select-none
                    `}
                  >
                    <Play size={20} fill='currentColor' />
                  </button>
                </div>

                <div className="w-12 h-12 bg-[#075F70] rounded-full flex items-center justify-center shadow-sm ml-2">
                   <Timer size={22} className="text-white" />
                </div>

              </div>
            </div>

            {/* Botão Principal */}
            <button
              type="submit"
              disabled={isButtonDisabled}
              className={`
                w-full lg:w-auto lg:min-w-[320px] ${ELEMENT_HEIGHT} 
                text-xl font-semibold tracking-wide rounded-[28px]
                flex items-center justify-center
                transition-all duration-200 active:scale-[0.98]
                ${isButtonDisabled
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-[#075F70] text-white hover:bg-[#064e5c] shadow-lg shadow-[#075F70]/20'
                }
              `}
            >
              Praticar redação
            </button>
          </div>
        </div>
      </form>

      <style jsx global>{`
        @keyframes duration-change {
          0% { opacity: 0.5; transform: translateY(3px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <TemasProntosModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleThemeSelect}
        themes={mockThemes}
      />
    </>
  );
}