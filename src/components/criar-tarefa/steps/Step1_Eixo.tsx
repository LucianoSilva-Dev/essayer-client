"use client";

import React from "react";
import Image from "next/image";
import { useCreateTask } from "../CreateTaskContext";
import { EixoOptions } from "@/constants/eixos";
import { cn } from "@/lib/utils";

export function Step1_Eixo() {
  const { taskData, updateTaskData } = useCreateTask();

  return (
    <div className="flex flex-col lg:flex-row gap-8 relative min-h-[600px] animate-in fade-in duration-500">
      
      {/* Esquerda: Textos */}
      <div className="flex-1 relative lg:pt-20 px-4">
        <h1 
            className="absolute -left-20 top-40 text-[200px] leading-[244px] text-[#898787] opacity-20 font-normal pointer-events-none select-none hidden xl:block font-montserrat"
        >
            TEMA
        </h1>

        <div className="relative z-10 space-y-6 max-w-lg">
            <h2 className="text-[40px] md:text-[50px] leading-tight font-medium text-[#075F70] font-montserrat">
                Eixo temático
            </h2>
            <p className="text-[24px] md:text-[35px] leading-tight text-[#3C3C3C] font-normal font-montserrat">
                Escolha o eixo temático que você quer abordar no tema da redação.
            </p>
        </div>
      </div>

      {/* Direita: Lista de Cards */}
      <div className="flex-1 flex flex-col gap-4 items-end pb-20 px-4">
        {EixoOptions.map((eixo) => {
          const isSelected = taskData.eixoId === eixo.nome;

          return (
            <div
              key={eixo.nome}
              onClick={() => updateTaskData({ eixoId: eixo.nome })}
              className={cn(
                "relative cursor-pointer transition-all duration-300 group w-full max-w-[440px] flex items-center",
                isSelected 
                    ? "bg-white shadow-xl rounded-tl-[25px] rounded-tr-[25px] rounded-bl-[20px] rounded-br-[25px] z-10 scale-105 border-l-8 border-[#075F70]" 
                    : "bg-white/80 hover:bg-white hover:shadow-md rounded-[22.5px] border border-transparent opacity-80 hover:opacity-100"
              )}
            >
              <div className="p-4 flex items-center gap-4 w-full">
                {/* Ícone */}
                <div className={cn(
                    "w-[45px] h-[45px] rounded-full flex items-center justify-center shrink-0 transition-colors",
                    isSelected ? "bg-[#E5EFF0]" : "bg-gray-100 group-hover:bg-[#E5EFF0]"
                )}>
                  <Image 
                    src={`/${eixo.icon}`} 
                    alt={eixo.nome} 
                    width={24} 
                    height={24} 
                    className="w-6 h-6 object-contain"
                  />
                </div>

                <div className="flex flex-col">
                  <span className="text-[18px] font-medium text-[#3C3C3C] font-montserrat">
                    {eixo.nome}
                  </span>
                </div>
                
                {isSelected && (
                    <div className="ml-auto text-[#075F70]">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
