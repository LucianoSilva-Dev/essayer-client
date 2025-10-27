// src/components/turmas-aluno/tarefas-ativas/TarefasAtivasCarousel.tsx
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { TarefaAtivaCard } from "./TarefaAtivaCard";
// Importe o tipo correto
import { MinhaTarefaAtiva } from "@/apiCalls/tarefas/types";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Interface atualizada
interface TarefasAtivasListProps {
  tarefas: MinhaTarefaAtiva[]; // Recebe o tipo correto
  loading: boolean; // Adicionado para feedback
  error: any; // Adicionado para feedback
}

export function TarefasAtivasList({
  tarefas,
  loading,
  error,
}: TarefasAtivasListProps) {

  // Feedback de carregamento e erro
  if (loading) {
    return (
      <section className="relative w-full max-w-[1400px] px-4">
        <h2 className="mb-6 font-montserrat text-[24px] font-medium text-[#3C3C3C]">
          Tarefas ativas
        </h2>
        <div className="flex justify-center items-center h-[311px] bg-gray-100 rounded-lg">
          <p className="text-gray-500">Carregando tarefas...</p>
        </div>
      </section>
    );
  }

  if (error) {
     return (
      <section className="relative w-full max-w-[1400px] px-4">
        <h2 className="mb-6 font-montserrat text-[24px] font-medium text-[#3C3C3C]">
          Tarefas ativas
        </h2>
        <div className="flex justify-center items-center h-[311px] bg-red-50 rounded-lg border border-red-200">
          <p className="text-red-600">Erro ao carregar tarefas.</p>
        </div>
      </section>
    );
  }

   if (tarefas.length === 0) {
     return (
       <section className="relative w-full max-w-[1400px] px-4">
         <h2 className="mb-6 font-montserrat text-[24px] font-medium text-[#3C3C3C]">
           Tarefas ativas
         </h2>
         <div className="flex justify-center items-center h-[311px] bg-gray-50 rounded-lg">
           <p className="text-gray-500">Nenhuma tarefa ativa no momento.</p>
         </div>
       </section>
     );
   }

  return (
    <section className="relative w-full max-w-[1400px] px-4">
      <h2 className="mb-6 font-montserrat text-[24px] font-medium text-[#3C3C3C]">
        Tarefas ativas
      </h2>

      <Swiper
        modules={[Navigation]}
        spaceBetween={30}
        slidesPerView={'auto'} // Deixa o Swiper calcular quantos cabem
        navigation={{
          nextEl: ".swiper-button-next-tarefas",
          prevEl: ".swiper-button-prev-tarefas",
        }}
        className="!pb-4"
      >
        {/* Mapeia as tarefas recebidas via props */}
        {tarefas.map((tarefa) => (
          // Ajuste a largura do SwiperSlide se necessário ou deixe 'auto'
          <SwiperSlide key={tarefa.id} style={{ width: '692px' }}>
            <TarefaAtivaCard tarefa={tarefa} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Botões de Navegação */}
      <div className="swiper-button-prev-tarefas absolute left-[-60px] top-1/2 -translate-y-1/2 cursor-pointer p-2">
        <ChevronLeft
          className="h-[60px] w-[60px] text-[#019DA3] transition-transform hover:scale-110"
          strokeWidth={3}
        />
      </div>
      <div className="swiper-button-next-tarefas absolute right-[-60px] top-1/2 -translate-y-1/2 cursor-pointer p-2">
        <ChevronRight
          className="h-[60px] w-[60px] text-[#019DA3] transition-transform hover:scale-110"
          strokeWidth={3}
        />
      </div>
    </section>
  );
}