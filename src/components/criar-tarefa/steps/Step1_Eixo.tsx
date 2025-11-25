// src/components/turmas-professor/criar-tarefa/steps/Step1_Eixo.tsx
"use client";

import React from "react";
import Image from "next/image";
import { useCreateTask } from "../CreateTaskContext";
import { EixoOptions } from "@/constants/eixos";
import { cn } from "@/lib/utils";

export function Step1_Eixo() {
  const { taskData, updateTaskData } = useCreateTask();

  return (
    <div className="flex flex-col lg:flex-row gap-8 relative min-h-[600px]">
      
      {/* ================= ESQUERDA: Textos e Marca d'água ================= */}
      <div className="flex-1 relative lg:pt-20">
        {/* Marca d'água "TEMA" */}
        <h1 
            className="absolute -left-20 top-40 text-[200px] leading-[244px] text-[#898787] opacity-20 font-normal pointer-events-none select-none hidden xl:block"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
            TEMA
        </h1>

        <div className="relative z-10 space-y-6 max-w-lg">
            <h2 
                className="text-[50px] leading-[61px] font-medium text-[#075F70]"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
                Eixo temático
            </h2>
            <p 
                className="text-[35px] leading-[43px] text-[#3C3C3C] font-normal"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
                Escolha o eixo temático que você quer abordar no tema da redação, usaremos sua escolha para filtragem
            </p>
        </div>
      </div>

      {/* ================= DIREITA: Lista de Cards (Carousel Vertical) ================= */}
      <div className="flex-1 flex flex-col gap-6 items-end pb-20">
        {EixoOptions.map((eixo) => {
          const isSelected = taskData.eixoId === eixo.nome;

          return (
            <div
              key={eixo.nome}
              onClick={() => updateTaskData({ eixoId: eixo.nome, recorte: "" })}
              className={cn(
                "relative cursor-pointer transition-all duration-300 group w-full max-w-[440px]",
                // Se selecionado, aplica o shape específico do design
                isSelected 
                    ? "bg-white shadow-lg rounded-tl-[25px] rounded-tr-[25px] rounded-bl-[20px] rounded-br-[25px] z-10 scale-105" 
                    : "bg-white/60 hover:bg-white hover:shadow-md rounded-[22.5px] border border-transparent hover:border-gray-100 opacity-70 hover:opacity-100"
              )}
            >
              
              {/* Badge "Selecionar" (Só aparece se selecionado) */}
              {isSelected && (
                  <div className="absolute -top-[30px] right-0 bg-[#E5EFF0] text-[#075F70] px-6 py-1.5 rounded-t-[15.5px] rounded-bl-none rounded-br-[20px] font-semibold text-[15px] font-montserrat flex items-center gap-2">
                      <span>Selecionado</span>
                      <div className="w-2 h-2 rounded-full bg-[#075F70]" />
                  </div>
              )}

              <div className="p-5 flex items-start gap-4">
                {/* Ícone */}
                <div className="w-[45px] h-[45px] bg-[#E5EFF0] rounded-full flex items-center justify-center shrink-0">
                  {/* Ajuste o path da imagem conforme sua pasta public */}
                  <Image 
                    src={`/${eixo.icon}`} 
                    alt={eixo.nome} 
                    width={24} 
                    height={24} 
                    className="w-6 h-6 object-contain"
                  />
                </div>

                {/* Conteúdo do Card */}
                <div className="flex flex-col gap-1">
                  <span className="text-[18px] font-medium text-[#3C3C3C]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {eixo.nome}
                  </span>
                  
                  {/* Descrição simulada (já que o array original não tem descrição longa, 
                      podemos usar a lista de recortes ou um texto estático por enquanto para visual) */}
                  <p className="text-[13px] leading-[16px] text-[#3C3C3C] italic font-light" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {eixo.recortes.slice(0, 5).join(", ") + "..."}
                  </p>
                </div>
              </div>

              {/* Borda inferior decorativa se selecionado */}
              {isSelected && (
                  <div className="h-2 w-full bg-[#E5EFF0] rounded-b-[25px] absolute bottom-0 left-0" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
