"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useCreateTask } from "../CreateTaskContext";
import { cn } from "@/lib/utils";
import { EixoOptions } from "@/constants/eixos";
import { motion, PanInfo } from "framer-motion";
import { ChevronUp, ChevronDown, Info, MousePointerClick } from "lucide-react";

// Dicionário expandido para cobrir todas as variações possíveis de nomes
const descricoesEixos: Record<string, string> = {
  // Nomes compostos (Padrão ENEM)
  "Ciência e Tecnologia": "Impactos da inovação, ética digital e avanços científicos.",
  "Cultura e Artes": "Identidade, patrimônio histórico e manifestações artísticas.",
  "Direito e Cidadania": "Direitos humanos, inclusão, legislação e democracia.",
  "Meio Ambiente": "Sustentabilidade, recursos naturais e mudanças climáticas.",
  
  // Variações simples (caso estejam separados no banco)
  "Saúde": "Bem-estar, saúde pública e desafios sanitários.",
  "Economia": "Trabalho, consumo sustentável e desigualdade social.",
  "Educação": "Ensino transformador, alfabetização e pensamento crítico.",
  "Ciência": "Descobertas científicas, bioética e pesquisa.",
  "Tecnologia": "Transformação digital, IA e impacto na sociedade.",
  "Questões Sociais": "Desigualdade, minorias e desafios da convivência coletiva.",
  "Direitos": "Garantias fundamentais e deveres cívicos.",
  "Cidadania": "Participação política e inclusão social."
};

export function Step1_Eixo() {
  const { taskData, updateTaskData } = useCreateTask();
  
  const initialIndex = EixoOptions.findIndex(e => e.nome === taskData.eixoId);
  const [activeIndex, setActiveIndex] = useState(initialIndex >= 0 ? initialIndex : 0);

  useEffect(() => {
    const eixoSelecionado = EixoOptions[activeIndex];
    if (eixoSelecionado && taskData.eixoId !== eixoSelecionado.nome) {
      updateTaskData({ eixoId: eixoSelecionado.nome });
    }
  }, [activeIndex, updateTaskData, taskData.eixoId]);

  const changeIndex = (newIndex: number) => {
    if (newIndex >= 0 && newIndex < EixoOptions.length) {
      setActiveIndex(newIndex);
    }
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 30;
    if (info.offset.y > threshold) {
      changeIndex(activeIndex - 1);
    } else if (info.offset.y < -threshold) {
      changeIndex(activeIndex + 1);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center py-4 px-4 lg:px-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      {/* --- COLUNA DA ESQUERDA: Texto Informativo --- */}
      <div className="flex flex-col gap-6 order-2 lg:order-1">
        <div className="space-y-3">
          <h3 className="text-3xl lg:text-4xl font-bold text-[#3C3C3C] leading-tight">
            Qual é o <br/>
            <span className="text-[#075F70]">Eixo Temático?</span>
          </h3>
          <p className="text-gray-500 text-lg font-medium">
            Defina o contexto da sua proposta de redação.
          </p>
        </div>

        <div className="bg-[#F8FAFC] border-l-4 border-[#075F70] p-6 rounded-r-xl shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-[#075F70] font-bold text-sm uppercase tracking-wider">
            <Info className="w-4 h-4" />
            <span>Por que selecionar?</span>
          </div>
          <p className="text-gray-600 text-[15px] leading-relaxed">
            A escolha do eixo temático é fundamental para direcionar o repertório sociocultural dos alunos. Ao selecionar um eixo, você define a "lente" através da qual o problema será analisado.
          </p>
        </div>

        <div className="hidden lg:flex items-center gap-2 text-gray-400 text-sm font-medium mt-4">
          <MousePointerClick className="w-4 h-4" />
          <span>Use as setas ou arraste os cards ao lado</span>
        </div>
      </div>


      {/* --- COLUNA DA DIREITA: Carrossel Compacto (3 ITENS) --- */}
      <div className="relative w-full h-[450px] flex flex-col justify-center items-center order-1 lg:order-2">
        
        {/* Botão Cima */}
        <button
          onClick={() => changeIndex(activeIndex - 1)}
          disabled={activeIndex === 0}
          className="absolute top-2 z-30 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white disabled:opacity-0 transition-all transform hover:-translate-y-1"
        >
          <ChevronUp className="w-6 h-6 text-[#075F70]" />
        </button>

        {/* Area do Deck */}
        <div className="relative w-full h-full flex justify-center items-center overflow-visible touch-none cursor-grab active:cursor-grabbing perspective-1000">
          {EixoOptions.map((eixo, index) => {
            const offset = index - activeIndex;
            
            // CORREÇÃO: Mostra apenas 1 pra cima (offset -1), o atual (0) e 1 pra baixo (offset 1)
            // Totalizando 3 cards visíveis.
            if (Math.abs(offset) > 1) return null;

            return (
              <motion.div
                key={eixo.nome}
                drag="y"
                dragConstraints={{ top: 0, bottom: 0 }}
                onDragEnd={handleDragEnd}
                onClick={() => changeIndex(index)}
                
                animate={{
                  // Aumentei um pouco o espaçamento (95px) para os 3 cards respirarem melhor
                  top: `calc(50% + ${offset * 95}px)`, 
                  scale: offset === 0 ? 1 : 0.9, 
                  opacity: offset === 0 ? 1 : 0.4, // Opacidade menor para focar bem no meio
                  zIndex: 50 - Math.abs(offset),
                  rotateX: offset * -8,
                  y: "-50%" 
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                
                style={{ position: "absolute" }}
                
                className={cn(
                  "w-[340px] h-[180px] rounded-[20px]",
                  "flex flex-row items-center p-5 gap-5",
                  "bg-white shadow-[0px_8px_25px_rgba(0,0,0,0.1)] border-2",
                  "select-none transition-colors duration-300",
                  offset === 0 
                    ? "border-[#075F70] bg-white" 
                    : "border-gray-100 bg-gray-50/80"
                )}
              >
                {/* Ícone */}
                <div 
                  className={cn(
                    "w-16 h-16 rounded-xl flex-shrink-0 flex items-center justify-center transition-colors duration-300",
                    offset === 0 ? "bg-[#075F70]/10" : "bg-gray-100"
                  )}
                >
                  <div className="relative w-9 h-9">
                    <Image
                      src={`/${eixo.icon}`}
                      alt={eixo.nome}
                      fill
                      className={cn(
                          "object-contain",
                          offset !== 0 && "grayscale opacity-50"
                      )}
                      draggable={false}
                    />
                  </div>
                </div>

                {/* Texto */}
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-1">
                    Eixo Temático
                  </span>
                  <span 
                    className={cn(
                      "font-montserrat font-bold text-lg leading-tight truncate transition-colors",
                      offset === 0 ? "text-[#075F70]" : "text-gray-400"
                    )}
                  >
                    {eixo.nome}
                  </span>
                  
                  {/* Descrição - Fallback adicionado para evitar texto vazio */}
                  <p 
                    className={cn(
                      "font-montserrat text-xs text-gray-500 mt-2 leading-tight line-clamp-2 transition-opacity duration-300",
                      offset === 0 ? "opacity-100" : "opacity-0"
                    )}
                  >
                    {descricoesEixos[eixo.nome] || "Descrição do eixo temático indisponível."}
                  </p>
                </div>

                {/* Check Flutuante */}
                {offset === 0 && (
                  <div className="absolute top-3 right-3 animate-in zoom-in duration-300">
                     <div className="w-5 h-5 bg-[#075F70] rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-white"><polyline points="20 6 9 17 4 12" /></svg>
                     </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Botão Baixo */}
        <button
          onClick={() => changeIndex(activeIndex + 1)}
          disabled={activeIndex === EixoOptions.length - 1}
          className="absolute bottom-2 z-30 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white disabled:opacity-0 transition-all transform hover:translate-y-1"
        >
          <ChevronDown className="w-6 h-6 text-[#075F70]" />
        </button>

      </div>
    </div>
  );
}