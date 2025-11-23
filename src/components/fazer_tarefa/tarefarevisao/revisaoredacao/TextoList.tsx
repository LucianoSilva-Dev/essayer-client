"use client";

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TextoCard from './TextoCard';

interface Texto {
  id: number;
  titulo: string;
  tipo: string;
  conteudo: string;
}

export default function TextoList({ textos }: { textos: Texto[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleNext = () => {
    if (currentIndex < textos.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  if (!mounted) return null;

  return (
    <div className="bg-white rounded-[20px] p-8 shadow-sm w-full flex flex-col">
      
      {/* Cabeçalho da Seção */}
      <div className="mb-6">
        <h2 className="text-[#0F5F68] text-lg font-bold mb-2">Textos motivadores</h2>
        <p className="text-gray-600 text-base">
          Abaixo os repertórios escolhidos para servirem de base como textos motivadores
        </p>
      </div>
      
      {/* Área do Carrossel */}
      {/* ALTERAÇÃO AQUI: Mudamos para 'ml-[80px]' para empurrar tudo para a direita */}
      <div className="relative w-full h-[280px] flex items-center ml-[40px] group">
        
        {/* Seta Esquerda */}
        <button 
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`
            absolute left-[-60px] z-[200] bg-white p-2 rounded-full shadow-md border border-gray-100 transition-all duration-300
            ${currentIndex === 0 ? 'opacity-0 pointer-events-none scale-75' : 'opacity-100 scale-100 hover:bg-gray-50 text-[#0F5F68]'}
          `}
        >
          <ChevronLeft size={24} />
        </button>

        {/* Container dos Cards (Baralho) */}
        <div className="relative w-[300px] h-[260px] perspective-1000"> 
          {textos.map((texto, index) => {
            const offset = index - currentIndex;
            const VISIBLE_STACK = 3; 

            if (offset < -1 || offset > VISIBLE_STACK) return null;

            // --- Lógica de Z-Index ---
            let zIndex = 0;
            if (offset === 0) zIndex = 100;
            else if (offset === -1) zIndex = 90;
            else if (offset > 0) zIndex = 50 - offset;

            // --- Classes Visuais ---
            let visualClasses = "";
            if (offset === 0) {
              visualClasses = "opacity-100 blur-0 brightness-100";
            } else if (offset > 0) {
              visualClasses = `opacity-100 blur-[${offset * 2}px] brightness-[${100 - (offset * 5)}%]`;
            } else if (offset === -1) {
              visualClasses = "opacity-0"; 
            }

            // --- Transformação ---
            let transformStyle = "";
            if (offset === 0) {
              transformStyle = "translateX(0px) scale(1) rotate(0deg)";
            } else if (offset > 0) {
              transformStyle = `translateX(${offset * 24}px) scale(${1 - (offset * 0.05)}) rotate(0deg)`;
            } else if (offset === -1) {
              transformStyle = "translateX(-120%) rotate(-10deg) scale(0.9)";
            }

            return (
              <div
                key={texto.id}
                className={`absolute top-0 left-0 w-full h-full transition-all duration-500 ease-in-out ${visualClasses}`}
                style={{
                  transform: transformStyle,
                  zIndex: zIndex
                }}
              >
                 <TextoCard data={texto} />
              </div>
            );
          })}
          
          {textos.length === 0 && (
            <p className="text-gray-500 mt-10">Nenhum texto disponível.</p>
          )}
        </div>

        {/* Seta Direita */}
        <button 
          onClick={handleNext}
          disabled={currentIndex >= textos.length - 1}
          className={`
            absolute left-[360px] z-[200] bg-white p-2 rounded-full shadow-md border border-gray-100 transition-all duration-300
            ${currentIndex >= textos.length - 1 ? 'opacity-0 pointer-events-none scale-75' : 'opacity-100 scale-100 hover:bg-gray-50 text-[#0F5F68]'}
          `}
        >
          <ChevronRight size={24} />
        </button>

      </div>
    </div>
  );
}