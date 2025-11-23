'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { MotivacionalCard, TextoData } from './MotivacionalCard';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  textos: TextoData[];
}

export function MotivacionalModal({ isOpen, onClose, textos }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Controle de visibilidade do Modal (Fade In/Out do fundo)
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  // Controle da direção da animação dos cards
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);

  // --- EFEITOS DO MODAL (ABRIR/FECHAR) ---
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setTimeout(() => setIsVisible(true), 10); 
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
      setDirection(null); // Sem animação no primeiro render
    }
  }, [isOpen]);

  // --- HANDLERS ---
  const handleNext = () => {
    if (currentIndex < textos.length - 1) {
      setDirection('right');
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection('left');
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const currentTexto = textos[currentIndex];

  if (!shouldRender) return null;

  return (
    <div 
      className={`
        fixed inset-0 z-50 flex items-center justify-center p-4
        transition-opacity duration-300 ease-in-out
        ${isVisible ? 'bg-[#075F70]/60 backdrop-blur-sm opacity-100' : 'bg-transparent backdrop-blur-none opacity-0'}
      `}
      onClick={handleBackdropClick}
    >
      {/* Estilos de Animação Locais para garantir funcionamento sem plugins */}
      <style jsx>{`
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .anim-slide-right {
          animation: slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .anim-slide-left {
          animation: slideInLeft 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* Container do Modal */}
      <div 
        className={`
          relative w-full max-w-4xl h-[80vh] flex items-center gap-4
          transition-all duration-300 ease-out transform
          ${isVisible ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-8 opacity-0'}
        `}
      >
        
        {/* Botão Fechar */}
        <button 
          onClick={onClose}
          className="absolute -top-12 right-0 md:-right-10 text-white hover:text-gray-200 transition-colors p-2 z-50"
        >
          <X size={32} />
        </button>

        {/* Navegação Esquerda */}
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`
            hidden md:flex p-3 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all
            ${currentIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}
          `}
        >
          <ChevronLeft size={32} />
        </button>

        {/* Área do Card Central */}
        <div className="flex-1 h-full shadow-2xl rounded-[20px] overflow-hidden bg-white relative">
          {textos.length > 0 ? (
            // AQUI A MÁGICA ACONTECE:
            // O 'key' força o React a recriar a div.
            // A classe 'anim-slide-...' aplica a animação definida no <style> acima.
            <div
              key={currentIndex}
              className={`
                w-full h-full
                ${direction === 'right' ? 'anim-slide-right' : ''}
                ${direction === 'left' ? 'anim-slide-left' : ''}
                ${direction === null ? 'animate-in fade-in duration-300' : ''} 
              `}
            >
              <MotivacionalCard data={currentTexto} />
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              Nenhum texto disponível.
            </div>
          )}
        </div>

        {/* Navegação Direita */}
        <button
          onClick={handleNext}
          disabled={currentIndex === textos.length - 1}
          className={`
            hidden md:flex p-3 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all
            ${currentIndex === textos.length - 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'}
          `}
        >
          <ChevronRight size={32} />
        </button>

      </div>

      {/* Navegação Mobile */}
      <div 
        className={`
          absolute bottom-6 flex md:hidden items-center gap-6 bg-black/30 px-6 py-2 rounded-full backdrop-blur-md
          transition-all duration-300 delay-100
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
        `}
      >
         <button onClick={handlePrev} disabled={currentIndex === 0} className="text-white disabled:opacity-30">
           <ChevronLeft size={28} />
         </button>
         <span className="text-white font-bold">
           {currentIndex + 1} / {textos.length}
         </span>
         <button onClick={handleNext} disabled={currentIndex === textos.length - 1} className="text-white disabled:opacity-30">
           <ChevronRight size={28} />
         </button>
      </div>
    </div>
  );
}