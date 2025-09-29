// carrossel-imagens.tsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CarrosselImagens() {
  const imagens = [
    "/turmaFluxo.png", 
    "/turmaLamp.png", 
    "/turmaLapis.png",
    "/turmaPc.png",
    "/turmaPrancheta.png"
  ];
  const [index, setIndex] = useState(0);

  const nextImage = () => {
    setIndex((current) => (current + 1) % imagens.length);
  };

  const prevImage = () => {
    setIndex((current) => (current - 1 + imagens.length) % imagens.length);
  };

  // Variantes de animação SIMPLIFICADAS - sem funções complexas
  const imageVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      x: 100
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeInOut" as const
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      x: -100,
      transition: {
        duration: 0.3
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.1,
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      {/* Título acima do carrossel */}
      <motion.h2 
        className="text-2xl font-semibold text-[#3C3C3C]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Foto da turma
      </motion.h2>

      {/* Container do carrossel */}
      <div className="flex items-center justify-center space-x-4 md:space-x-6">
        {/* Botão anterior */}
        <motion.button 
          onClick={prevImage}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-[#3C3C3C] text-[#3C3C3C] hover:bg-[#3C3C3C] hover:text-white transition-colors"
          aria-label="Imagem anterior"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>

        {/* Imagem com animação SIMPLIFICADA */}
        <div className="relative w-24 h-24 md:w-32 md:h-32">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute inset-0"
            >
              <img 
                src={imagens[index]} 
                alt={`Foto da turma ${index + 1}`} 
                className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg"
              />
              
              {/* Indicador de posição */}
              <motion.div 
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-[#3C3C3C] text-white px-3 py-1 rounded-full text-xs font-medium"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {index + 1}/{imagens.length}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Botão próximo */}
        <motion.button 
          onClick={nextImage}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-[#3C3C3C] text-[#3C3C3C] hover:bg-[#3C3C3C] hover:text-white transition-colors"
          aria-label="Próxima imagem"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      </div>

      {/* Navegação por pontos */}
      <motion.div 
        className="flex space-x-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {imagens.map((_, dotIndex) => (
          <button
            key={dotIndex}
            onClick={() => setIndex(dotIndex)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              dotIndex === index ? "bg-[#3C3C3C] scale-125" : "bg-gray-300"
            }`}
            aria-label={`Ir para imagem ${dotIndex + 1}`}
          />
        ))}
      </motion.div>
    </div>
  );
}