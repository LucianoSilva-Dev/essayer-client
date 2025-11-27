"use client";

import React, { useEffect, useState } from "react";
import { useCreateTask } from "../CreateTaskContext";
import RepertorioCard from "@/components/repertorio/repertorio-card"; 
import { getAllRepertorios } from "@/apiCalls/repertorio"; 
import { Repertorio } from "@/types/repertorio"; 
import { Search, X, Check, Plus, Loader2, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "react-toastify";

// --- FUNÇÃO DE MAPEAMENTO ---
function mapToFrontendRepertorio(doc: any): Repertorio {
    const eixos = doc.topicos || [];
    const recortes = doc.subtopicos || [];
    const base = {
        id: doc.id,
        isPublico: true,
        totalLikes: doc.totalLikes || 0,
        favoritadoPeloUsuario: doc.favoritadoPeloUsuario || false,
        likeDoUsuario: doc.likeDoUsuario || false,
        criador: doc.criador,
        totalComentarios: doc.totalComentarios || 0,
        comentarios: doc.comentarios || [],
        eixos,
        recortes,
    };

    if (doc.tipoRepertorio === 'Obra' || doc.modelo === 'obra') {
        return {
            ...base,
            modelo: 'obra',
            titulo: doc.titulo,
            autoria: doc.autor || doc.autoria,
            sinopse: doc.sinopse,
            tipoObra: doc.tipoObra || 'livro',
        } as Repertorio;
    } 
    
    if (doc.tipoRepertorio === 'Artigo' || doc.modelo === 'artigo') {
        return {
            ...base,
            modelo: 'artigo',
            titulo: doc.titulo,
            autoria: doc.autor || doc.autoria,
            sintese: doc.resumo || doc.sintese,
            fonte: doc.fonte,
        } as Repertorio;
    }

    if (doc.tipoRepertorio === 'Citacao' || doc.modelo === 'citacao') {
        return {
            ...base,
            modelo: 'citacao',
            autoria: doc.autor || doc.autoria,
            citacao: doc.frase || doc.citacao,
            fonte: doc.fonte,
        } as Repertorio;
    }

    return {
        ...base,
        modelo: 'citacao',
        autoria: doc.autor || "Desconhecido",
        citacao: "Erro ao carregar conteúdo",
    } as Repertorio;
}

// --- Modal de Seleção com Paginação ---
function RepertoireSelectorModal({ 
    isOpen, 
    onClose, 
    eixoFilter, 
    selectedIds, 
    onToggleSelect 
}: { 
    isOpen: boolean; 
    onClose: () => void; 
    eixoFilter: string;
    selectedIds: string[];
    onToggleSelect: (rep: Repertorio) => void;
}) {
    const [repertorios, setRepertorios] = useState<Repertorio[]>([]);
    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    
    // Estados de Paginação
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const LIMIT = 15; // Limite imposto pela API

    // Reset ao abrir ou mudar filtro
    useEffect(() => {
        if (isOpen) {
            setRepertorios([]);
            setOffset(0);
            setHasMore(true);
            fetchRepertorios(0, true);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, eixoFilter]);

    async function fetchRepertorios(currentOffset: number, isReset: boolean) {
        if (isReset) setLoading(true);
        else setLoadingMore(true);

        try {
            // Construção da Query String
            let query = `?limit=${LIMIT}&offset=${currentOffset}`;
            
            // Tenta filtrar por eixo na API para otimizar os 15 itens retornados
            if (eixoFilter) {
                // Ajuste o nome do parâmetro 'eixos' ou 'topicos' conforme sua API espera
                query += `&eixos=${encodeURIComponent(eixoFilter)}`;
            }

            const response = await getAllRepertorios(query);
            
            // @ts-ignore
            const rawList: any[] = Array.isArray(response) ? response : (response?.documentos || []);
            const paginacao = (response as any)?.paginacao;

            const mappedList = rawList.map(mapToFrontendRepertorio);
            
            setRepertorios(prev => isReset ? mappedList : [...prev, ...mappedList]);
            
            // Verifica se tem mais itens baseado na resposta ou no tamanho da lista retornada
            if (mappedList.length < LIMIT) {
                setHasMore(false);
            } else if (paginacao && paginacao.total) {
                // Se a API retornar o total, podemos comparar
                const totalLoaded = isReset ? mappedList.length : repertorios.length + mappedList.length;
                setHasMore(totalLoaded < paginacao.total);
            }

        } catch (error) {
            console.error("Erro ao buscar repertórios:", error);
            toast.error("Não foi possível carregar os repertórios.");
            setHasMore(false);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    }

    const handleLoadMore = () => {
        if (!loadingMore && hasMore) {
            const nextOffset = offset + LIMIT;
            setOffset(nextOffset);
            fetchRepertorios(nextOffset, false);
        }
    };

    // Filtro Client-Side (Aplica-se apenas aos itens já carregados)
    const displayList = repertorios.filter(rep => {
        const search = searchTerm.toLowerCase();
        const autor = (rep.autoria || "").toLowerCase();

        switch (rep.modelo) {
            case "obra":
            case "artigo":
                return (rep.titulo || "").toLowerCase().includes(search) || autor.includes(search);
            case "citacao":
                return (rep.citacao || "").toLowerCase().includes(search) || autor.includes(search);
            default:
                return false;
        }
    });

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl w-full max-w-5xl h-[85vh] flex flex-col shadow-2xl overflow-hidden">
                
                {/* Header */}
                <div className="p-6 border-b flex justify-between items-center bg-white">
                    <div>
                        <h3 className="text-2xl font-bold font-montserrat text-[#075F70]">Selecionar Textos Motivadores</h3>
                        <p className="text-gray-500 text-sm font-montserrat">
                            {eixoFilter ? `Filtrando por: ${eixoFilter}` : "Todos os eixos"}
                        </p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X size={24} className="text-gray-500" />
                    </button>
                </div>

                {/* Busca */}
                <div className="p-4 bg-gray-50 border-b">
                    <div className="relative max-w-2xl mx-auto">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input 
                            className="w-full bg-white rounded-xl py-3 pl-12 pr-4 outline-none border border-gray-200 focus:border-[#075F70] focus:ring-1 focus:ring-[#075F70] transition-all font-montserrat"
                            placeholder="Pesquisar nos itens carregados..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            autoFocus
                        />
                    </div>
                </div>

                {/* Lista com Scroll Infinito / Load More */}
                <div className="flex-1 overflow-y-auto p-6 bg-[#F8F9FA]">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-4">
                            <Loader2 className="animate-spin" size={40} />
                            <p className="font-montserrat">Carregando repertórios...</p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {displayList.map((rep) => {
                                    const isSelected = selectedIds.includes(rep.id);
                                    return (
                                        <div 
                                            key={rep.id}
                                            onClick={() => onToggleSelect(rep)}
                                            className={cn(
                                                "cursor-pointer relative transition-all duration-200 group",
                                                isSelected ? "ring-2 ring-[#075F70] rounded-[20px] scale-[1.02] shadow-md" : "hover:scale-[1.01]"
                                            )}
                                        >
                                            <div className="pointer-events-none select-none">
                                                <RepertorioCard repertorio={rep} />
                                            </div>
                                            
                                            <div className={cn(
                                                "absolute inset-0 rounded-[20px] transition-colors flex items-center justify-center",
                                                isSelected ? "bg-[#075F70]/10" : "group-hover:bg-black/5"
                                            )}>
                                                {isSelected && (
                                                    <div className="absolute top-3 right-3 bg-[#075F70] text-white p-1.5 rounded-full shadow-lg animate-in zoom-in">
                                                        <Check size={16} strokeWidth={3} />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                            {/* Botão Carregar Mais */}
                            {displayList.length > 0 && hasMore && (
                                <div className="mt-8 flex justify-center pb-4">
                                    <button
                                        onClick={handleLoadMore}
                                        disabled={loadingMore}
                                        className="flex items-center gap-2 px-6 py-2 bg-white border border-gray-300 rounded-full text-gray-600 hover:bg-gray-50 hover:border-[#075F70] hover:text-[#075F70] transition-all shadow-sm disabled:opacity-50"
                                    >
                                        {loadingMore ? (
                                            <Loader2 className="animate-spin" size={18} />
                                        ) : (
                                            <ChevronDown size={18} />
                                        )}
                                        {loadingMore ? "Carregando..." : "Carregar mais"}
                                    </button>
                                </div>
                            )}

                            {!loading && displayList.length === 0 && (
                                <div className="col-span-full text-center py-20 text-gray-400 font-montserrat">
                                    Nenhum repertório encontrado.
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 border-t bg-white flex justify-between items-center">
                    <span className="text-gray-500 font-montserrat ml-2">
                        {selectedIds.length} selecionado(s)
                    </span>
                    <button 
                        onClick={onClose}
                        className="bg-[#075F70] text-white px-8 py-3 rounded-full font-bold font-montserrat hover:bg-[#064d5c] transition-colors shadow-lg"
                    >
                        Concluir Seleção
                    </button>
                </div>
            </div>
        </div>
    );
}

// --- Componente Principal do Passo 2 ---
export function Step2_Detalhes() {
  const { taskData, updateTaskData } = useCreateTask();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleRepertorio = (rep: Repertorio) => {
      const exists = taskData.repertorios.find(r => r.id === rep.id);
      let newList;
      if (exists) {
          newList = taskData.repertorios.filter(r => r.id !== rep.id);
      } else {
          newList = [...taskData.repertorios, rep];
      }
      updateTaskData({ repertorios: newList });
  };

  return (
    <div className="flex flex-col gap-10 max-w-5xl mx-auto pb-20 animate-in fade-in slide-in-from-right-8 duration-500">
      
      {/* Inputs de Título e Tema */}
      <div className="space-y-8 bg-white p-8 rounded-[30px] shadow-sm border border-gray-100">
          <div className="space-y-2">
            <label className="font-montserrat font-semibold text-[20px] text-[#3C3C3C] pl-2">
              Dê um título para sua tarefa
            </label>
            <input
              type="text"
              value={taskData.titulo}
              onChange={(e) => updateTaskData({ titulo: e.target.value })}
              placeholder="Ex: Redação Semana 1 - Enem"
              className="w-full p-4 text-[18px] text-[#3C3C3C] bg-gray-50 rounded-xl border-2 border-transparent focus:border-[#075F70] focus:bg-white transition-all outline-none font-montserrat"
            />
          </div>

          <div className="space-y-2">
            <label className="font-montserrat font-semibold text-[20px] text-[#3C3C3C] pl-2">
              Qual é o tema da redação?
            </label>
            <textarea
              rows={2}
              value={taskData.tema}
              onChange={(e) => updateTaskData({ tema: e.target.value })}
              placeholder="Digite o tema completo aqui..."
              className="w-full p-4 text-[18px] text-[#3C3C3C] bg-gray-50 rounded-xl border-2 border-transparent focus:border-[#075F70] focus:bg-white transition-all outline-none font-montserrat resize-none"
            />
          </div>
      </div>

      {/* Área de Textos Motivadores */}
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="space-y-1">
                <h2 className="font-montserrat font-semibold text-[28px] text-[#3C3C3C]">
                    Textos Motivadores
                </h2>
                <p className="text-gray-500 font-montserrat">
                    Selecione repertórios do banco de dados para auxiliar seus alunos.
                </p>
            </div>
            
            <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 bg-[#075F70] hover:bg-[#064d5c] text-white px-6 py-3 rounded-full font-medium transition-all shadow-lg hover:shadow-xl active:scale-95 font-montserrat"
            >
                <Plus size={20} />
                <span>Escolher Repertórios</span>
            </button>
        </div>

        {/* Carrossel Horizontal de Selecionados */}
        {taskData.repertorios.length > 0 ? (
            <div className="overflow-x-auto pb-8 -mx-4 px-4 scrollbar-thin scrollbar-thumb-gray-200 hover:scrollbar-thumb-gray-300">
                <div className="flex gap-6 w-max">
                    {taskData.repertorios.map((rep) => (
                        <div key={rep.id} className="w-[300px] relative group animate-in fade-in zoom-in duration-300">
                            <button 
                                onClick={() => toggleRepertorio(rep)}
                                className="absolute -top-2 -right-2 z-10 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-md hover:bg-red-600 hover:scale-110"
                                title="Remover"
                            >
                                <X size={16} />
                            </button>
                            <div className="pointer-events-none scale-[0.95] origin-top-left transition-transform group-hover:scale-[0.97]">
                                <RepertorioCard repertorio={rep} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ) : (
            <div className="h-40 border-2 border-dashed border-gray-300 rounded-[30px] flex items-center justify-center bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer group" onClick={() => setIsModalOpen(true)}>
                <p className="text-gray-400 font-montserrat font-medium group-hover:text-[#075F70] transition-colors flex items-center gap-2">
                    <Plus size={20} /> Nenhum texto selecionado. Clique para adicionar.
                </p>
            </div>
        )}
      </div>

      {/* Modal de Seleção */}
      <RepertoireSelectorModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        eixoFilter={taskData.eixoId}
        selectedIds={taskData.repertorios.map(r => r.id)}
        onToggleSelect={toggleRepertorio}
      />
    </div>
  );
}
