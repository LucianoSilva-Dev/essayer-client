"use client";

import React, { useEffect, useState } from "react";
import { useCreateTask } from "../CreateTaskContext";
import RepertorioCard from "@/components/repertorio/repertorio-card"; 
import { getAllRepertorios } from "@/apiCalls/repertorio"; 
import { Repertorio } from "@/types/repertorio";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Step2_Detalhes() {
  const { taskData, updateTaskData } = useCreateTask();
  
  const [repertorios, setRepertorios] = useState<Repertorio[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCarousel, setShowCarousel] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await getAllRepertorios('?limit=10'); 
        // Ajuste de segurança caso a API retorne paginado ou array direto
        const docs = Array.isArray(data) ? data : (data?.documentos ?? []);
        setRepertorios(docs as Repertorio[]);
      } catch (error) {
        console.error("Erro ao buscar repertórios:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Filtro corrigido com verificação de tipo
  const filteredRepertorios = repertorios.filter(rep => {
    const search = searchTerm.toLowerCase();
    
    // Verifica o modelo para decidir qual campo usar como "título"
    let tituloBusca = "";
    if (rep.modelo === 'citacao') {
        // Citação não tem título, usamos a autoria ou o começo da citação
        tituloBusca = rep.autoria;
    } else {
        // Obra e Artigo têm título
        tituloBusca = rep.titulo;
    }

    const autoria = rep.autoria || "";
    
    return tituloBusca.toLowerCase().includes(search) || autoria.toLowerCase().includes(search);
  });

  const cardDecorativoEsq = repertorios[0];
  const cardDecorativoDir = repertorios[1];

  // Valores seguros para o input (garantindo que não sejam undefined)
  const tituloValue = taskData.titulo ?? "";
  const temaValue = taskData.tema ?? "";
  const currentRepertorioId = taskData.repertorioId ?? null;

  return (
    <div className="flex flex-col gap-12 max-w-6xl mx-auto pb-20 animate-in fade-in slide-in-from-right-8 duration-500 relative">
      
      {/* ===== Seção 1: Título ===== */}
      <div className="space-y-4">
        <label className="font-montserrat font-semibold text-[35px] text-[#3C3C3C]">
          Adicione um título à tarefa
        </label>
        <input
          type="text"
          value={tituloValue}
          onChange={(e) => updateTaskData({ titulo: e.target.value })}
          placeholder="Ex: Redação - Semana 3"
          className="w-full text-right p-4 text-[20px] text-[#3C3C3C] bg-transparent border-b-[3px] border-[#898787] focus:outline-none focus:border-[#075F70] placeholder:text-gray-300 font-montserrat"
        />
      </div>

      {/* ===== Seção 2: Tema ===== */}
      <div className="space-y-6 relative z-20">
        <label className="font-montserrat font-semibold text-[35px] text-[#3C3C3C]">
          Crie um tema aqui
        </label>
        
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <button 
            type="button"
            className="flex items-center justify-center px-6 py-2 border-[2px] border-[#3C3C3C] rounded-[20px] gap-2 hover:bg-gray-50 transition-colors h-[50px] shrink-0"
            onClick={() => console.log("Lógica futura de Temas Prontos")}
          >
             <span className="font-montserrat font-medium text-[20px] text-[#3C3C3C]">Temas prontos</span>
          </button>

          <input
            type="text"
            value={temaValue}
            onChange={(e) => updateTaskData({ tema: e.target.value })}
            placeholder="Digite o tema da redação..."
            className="w-full text-right p-4 text-[20px] text-[#3C3C3C] bg-transparent border-b-[3px] border-[#898787] focus:outline-none focus:border-[#075F70] font-montserrat"
          />
        </div>
      </div>

      {/* ===== Seção 3: Texto Motivador ===== */}
      <div className="pt-8 relative min-h-[500px] mt-8 flex flex-col items-start transition-all duration-500">
        <h2 className="font-montserrat font-semibold text-[35px] text-[#3C3C3C] mb-4 relative z-30">
          Texto motivador
        </h2>

        <div className="relative z-30 mb-8">
            <p className="font-montserrat font-normal text-[30px] leading-[37px] text-[#3C3C3C] max-w-[500px] mb-8">
            Utilize os repertórios disponíveis em nosso site como textos motivadores! Eles ajudam a compreender melhor o tema.
            </p>

            <div className="flex gap-4 items-center">
                <button
                    type="button"
                    onClick={() => setShowCarousel(!showCarousel)}
                    className={cn(
                        "flex items-center justify-center gap-[10px] rounded-[25px] w-[227px] h-[57px] shadow-lg transition-colors",
                        showCarousel ? "bg-[#898787] hover:bg-[#6e6e6e]" : "bg-[#075F70] hover:bg-[#064d5c]"
                    )}
                >
                    <span className="font-montserrat font-medium text-[30px] leading-[37px] text-[#E5EFF0]">
                        {showCarousel ? "Fechar" : "Ver tudo"}
                    </span>
                </button>

                {showCarousel && (
                     <div className="relative animate-in fade-in slide-in-from-left-4">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input 
                            className="w-[300px] bg-white rounded-full py-3 pl-12 pr-4 outline-none border border-gray-200 focus:border-[#075F70] shadow-sm font-montserrat"
                            placeholder="Filtrar repertórios..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                     </div>
                )}
            </div>
        </div>

        {/* ===== CONTEÚDO (CARROSSEL OU DECORAÇÃO) ===== */}
        {showCarousel ? (
            <div className="w-full relative z-40 animate-in fade-in zoom-in-95 duration-300 mt-4">
                {loading ? (
                    <div className="h-60 flex items-center justify-center text-gray-400 italic">Carregando repertórios...</div>
                ) : (
                    <div className="overflow-x-auto pb-10 pt-5 px-2 -mx-2">
                         <div className="flex gap-8 w-max">
                            {filteredRepertorios.map((rep) => {
                                const isSelected = currentRepertorioId === rep.id;
                                return (
                                    // Wrapper para aplicar estilos externos e click
                                    <div 
                                        key={rep.id} 
                                        onClick={() => updateTaskData({ repertorioId: rep.id })}
                                        className={cn(
                                            "cursor-pointer transition-all duration-300 hover:-translate-y-2 w-[300px]",
                                            isSelected ? "ring-4 ring-[#075F70] rounded-[30px] scale-105" : "hover:scale-105"
                                        )}
                                    >
                                        <div className="pointer-events-none h-full w-full">
                                            {/* Removido className e onClick direto do componente filho */}
                                            <RepertorioCard repertorio={rep} />
                                        </div>
                                    </div>
                                )
                            })}
                            {filteredRepertorios.length === 0 && (
                                <div className="text-gray-500 italic p-4">Nenhum repertório encontrado.</div>
                            )}
                         </div>
                    </div>
                )}
            </div>
        ) : (
            /* MODO DECORAÇÃO */
            !loading && (
            <>
                {cardDecorativoEsq && (
                // Wrapper DIV controla a posição e rotação, pois RepertorioCard não aceita className
                <div className="absolute top-20 right-[350px] opacity-40 transform -rotate-12 scale-90 pointer-events-none hidden xl:block z-10 transition-all duration-700 w-[280px]">
                    <RepertorioCard repertorio={cardDecorativoEsq} />
                </div>
                )}

                {cardDecorativoDir && (
                <div className="absolute top-32 right-0 opacity-40 transform rotate-12 scale-90 pointer-events-none hidden xl:block z-10 transition-all duration-700 w-[280px]">
                    <RepertorioCard repertorio={cardDecorativoDir} />
                </div>
                )}
            </>
            )
        )}
        
        {/* Feedback de seleção */}
        {currentRepertorioId != null && (
             <div className="fixed bottom-10 right-10 bg-[#075F70] text-white px-6 py-3 rounded-full shadow-xl z-50 animate-in slide-in-from-bottom-5 flex items-center gap-3">
                <span>Repertório selecionado!</span>
                <button 
                    type="button"
                    onClick={() => updateTaskData({ repertorioId: null })} 
                    className="bg-white/20 rounded-full p-1 hover:bg-white/30"
                >
                    <X size={14} />
                </button>
             </div>
        )}

      </div>
    </div>
  );
}
