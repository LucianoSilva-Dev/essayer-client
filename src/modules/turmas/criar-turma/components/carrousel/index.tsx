"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IconsMap } from "@/shared/constants/icons";
import Image from "next/image";

interface CarrosselImagensProps {
  onIconSelect: (id: number) => void;
}

export default function CarrosselImagens({ onIconSelect }: CarrosselImagensProps) {
  const [index, setIndex] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(1);

  // Efeito para chamar onIconSelect quando o index muda
  useEffect(() => {
    onIconSelect(IconsMap[index].id);
  }, [index, onIconSelect]);

  // Ajusta quantos slides aparecem conforme largura da tela
  useEffect(() => {
    const updateSlides = () => {
      const width = window.innerWidth;
      setVisibleSlides(width >= 1024 ? 3 : width >= 768 ? 3 : 1);
    };
    updateSlides();
    window.addEventListener("resize", updateSlides);
    return () => window.removeEventListener("resize", updateSlides);
  }, []);

  const paginate = (dir: number) => {
    setIndex((prev) => (prev + dir + IconsMap.length) % IconsMap.length);
  };

  const slideWidth = 200;
  const gap = 20;

  return (
    <div className="flex flex-col items-center space-y-6">
      <h2 className="text-2xl font-semibold text-[#3C3C3C]">Foto da turma</h2>

      <div className="flex items-center justify-center w-full max-w-5xl relative">
        <button
          onClick={() => paginate(-1)}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow z-30 absolute left-0 top-1/2 -translate-y-1/2 opacity-70 focus:scale-105 focus:opacity-100 hover:scale-105 hover:opacity-100 transition"
          style={{ zIndex: 30 }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="relative flex items-center justify-center overflow-visible w-full h-[310px]">
          {IconsMap.map((imagem, i) => {
            let offset = i - index;
            if (offset < -Math.floor(IconsMap.length / 2))
              offset += IconsMap.length;
            if (offset > Math.floor(IconsMap.length / 2))
              offset -= IconsMap.length;

            const xPos = offset * (slideWidth + gap);
            const isActive = offset === 0;
            const showEffects = visibleSlides > 1;
            return (
              <motion.div
                key={imagem.id}
                className="absolute flex flex-col items-center transition-all duration-50"
                animate={{
                  x: xPos,
                  scale: isActive ? 1 : 0.8,
                  opacity: isActive ? 1 : showEffects ? 0.4 : 0,
                  filter: isActive ? 'none' : showEffects ? 'blur(2px)' : 'none',
                  zIndex: isActive ? 10 : 5 - Math.abs(offset),
                  y: isActive ? -10 : 0
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{
                  width: slideWidth,
                  pointerEvents: isActive ? "auto" : "none"
                }}
              >
                <div
                  className={`rounded-full overflow-hidden border-4 ${isActive ? "border-white shadow-lg" : "border-transparent"
                    }`}
                  style={{
                    width: slideWidth,
                    height: slideWidth
                  }}
                >
                  <Image
                    width={100}
                    height={100}
                    src={imagem.src}
                    alt={`Foto da turma ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                {isActive && (
                  <motion.span
                    className="mt-2 text-sm text-gray-700"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {index + 1}/{IconsMap.length}
                  </motion.span>
                )}
              </motion.div>
            );
          })}
        </div>

        <button
          onClick={() => paginate(1)}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow z-30 absolute right-0 top-1/2 -translate-y-1/2 opacity-70 focus:scale-105 focus:opacity-100 hover:scale-105 hover:opacity-100 transition"
          style={{ zIndex: 30 }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}