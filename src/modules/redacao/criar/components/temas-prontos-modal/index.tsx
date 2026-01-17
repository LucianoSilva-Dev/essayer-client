'use client';

import { useEffect, useState } from 'react';
import { X, Sparkles, PenTool, ChevronRight } from 'lucide-react';

interface TemasProntosModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (tema: string) => void;
  themes: string[];
}

export function TemasProntosModal({ isOpen, onClose, onSelect, themes }: TemasProntosModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Aumentei para 50ms para garantir que o navegador pinte o estado invisível antes de transicionar
      const timer = setTimeout(() => setIsVisible(true), 50);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <div
      // z-[9999] e fixed inset-0 garantem cobertura total
      className={`
        fixed inset-0 z-[9999] h-[100dvh] w-screen flex items-center justify-center p-4 font-montserrat
        transition-opacity duration-300 ease-in-out
        ${isVisible ? 'bg-brand-teal-dark/60 backdrop-blur-md opacity-100' : 'bg-transparent backdrop-blur-none opacity-0'}
      `}
      onClick={onClose}
    >
      <div
        className={`
          relative w-full max-w-3xl bg-white rounded-[40px] shadow-2xl flex flex-col max-h-[85vh]
          transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] transform
          ${isVisible ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-8 opacity-0'}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-8 pb-6 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center text-brand-teal-dark">
              <Sparkles size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-neutral-dark">Sugestões de Temas</h2>
              <p className="text-sm text-gray-400">Selecione um tema para começar</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all"
          >
            <X size={24} />
          </button>
        </div>

        {/* Lista Interativa */}
        <div className="overflow-y-auto py-2 px-4 flex-1">
          <ul className="space-y-1">
            {themes.map((theme, index) => (
              <li key={index} style={{ transitionDelay: `${index * 30}ms` }}>
                <button
                  type="button"
                  onClick={() => onSelect(theme)}
                  className={`
                    group w-full flex items-center justify-between p-5 rounded-2xl text-left
                    border border-transparent hover:bg-teal-50/50 hover:border-teal-100
                    transition-all duration-500 ease-out
                    ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}
                  `}
                >
                  <div className="flex items-center gap-4 flex-1 pr-4">
                    <div className="text-gray-300 group-hover:text-brand-teal-dark transition-colors duration-300">
                      <PenTool size={20} className="group-hover:scale-110 transition-transform" />
                    </div>

                    <span className="text-lg font-medium text-neutral-dark group-hover:text-brand-teal-dark transition-colors line-clamp-2">
                      {theme}
                    </span>
                  </div>

                  <div className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-brand-teal-dark">
                    <ChevronRight size={24} />
                  </div>
                </button>

                {index < themes.length - 1 && (
                  <div className="mx-6 h-[1px] bg-gray-50" />
                )}
              </li>
            ))}
          </ul>

          {themes.length === 0 && (
            <div className="text-center py-16 flex flex-col items-center gap-4 text-gray-400">
              <Sparkles size={48} className="text-gray-200" />
              <p>Nenhum tema disponível no momento.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-50 bg-gray-50/30 rounded-b-[40px] text-center flex-shrink-0">
          <p className="text-xs text-gray-400 font-medium tracking-wide uppercase">Banco de temas Incita</p>
        </div>
      </div>
    </div>
  );
}