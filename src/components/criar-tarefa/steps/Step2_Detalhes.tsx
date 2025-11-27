"use client";

import React, { useEffect, useState } from "react";
import { useCreateTask } from "../CreateTaskContext";
import RepertorioCard from "@/components/repertorio/repertorio-card";
import { getAllRepertorios } from "@/apiCalls/repertorio";
import { Repertorio } from "@/types/repertorio";
import { Search, X, Check, Plus, Loader2, ChevronDown, BookOpen, Quote, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "react-toastify";

// --- FUNÇÃO DE MAPEAMENTO (Mesma da versão anterior) ---
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

// --- MODAL DE SELEÇÃO (Mantido igual, apenas minimizado para focar no layout principal) ---
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
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const LIMIT = 15;

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
      let query = `?limit=${LIMIT}&offset=${currentOffset}`;
      if (eixoFilter) {
        query += `&topicos=${encodeURIComponent(eixoFilter)}`;
      }

      const response = await getAllRepertorios(query);
      // @ts-ignore
      const rawList: any[] = Array.isArray(response) ? response : (response?.documentos || []);
      const paginacao = (response as any)?.paginacao;
      const mappedList = rawList.map(mapToFrontendRepertorio);

      setRepertorios(prev => isReset ? mappedList : [...prev, ...mappedList]);

      if (mappedList.length < LIMIT) {
        setHasMore(false);
      } else if (paginacao && paginacao.total) {
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
        <div className="p-4 bg-gray-50 border-b">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              className="w-full bg-white rounded-xl py-3 pl-12 pr-4 outline-none border border-gray-200 focus:border-[#075F70] focus:ring-1 focus:ring-[#075F70] transition-all font-montserrat"
              placeholder="Pesquisar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
          </div>
        </div>
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
              {displayList.length > 0 && hasMore && (
                <div className="mt-8 flex justify-center pb-4">
                  <button
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    className="flex items-center gap-2 px-6 py-2 bg-white border border-gray-300 rounded-full text-gray-600 hover:bg-gray-50 hover:border-[#075F70] hover:text-[#075F70] transition-all shadow-sm disabled:opacity-50"
                  >
                    {loadingMore ? <Loader2 className="animate-spin" size={18} /> : <ChevronDown size={18} />}
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

// --- CARD DECORATIVO (Componente Visual para o fundo) ---
const DecorativeCard = ({ type, rotation, opacity, zIndex, className }: { type: 'citacao' | 'obra' | 'artigo', rotation: string, opacity: number, zIndex: number, className?: string }) => {
  return (
    <div
      className={cn("absolute bg-white rounded-[24px] p-[20px] flex flex-col gap-3 overflow-hidden select-none border border-gray-100", className)}
      style={{
        width: type === 'artigo' ? '350px' : '280px',
        height: type === 'artigo' ? '325px' : '260px',
        transform: rotation,
        opacity: opacity,
        zIndex: zIndex,
        boxShadow: type === 'artigo' ? '0px 0px 20px rgba(0, 0, 0, 0.25)' : 'none'
      }}
    >
      {/* Header do Card (Badge) */}
      <div className="flex items-center gap-2 self-center bg-gray-50 px-3 py-1 rounded-lg">
        {type === 'artigo' && <FileText size={16} className="text-[#2258B6]" />}
        {type === 'obra' && <BookOpen size={16} className="text-[#2258B6]" />}
        {type === 'citacao' && <Quote size={16} className="text-[#2258B6]" />}
        <span className="font-montserrat font-medium italic text-[14px] text-[#2258B6]/70 capitalize">
          {type}
        </span>
      </div>

      {/* Conteúdo Mock */}
      <div className="font-montserrat font-semibold text-[20px] text-[#3C3C3C] mt-2">
        Título aqui
      </div>
      <div className="font-open-sans font-normal text-[16px] text-[#3C3C3C] leading-[22px] flex-1">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...
      </div>
    </div>
  )
}

// --- COMPONENTE PRINCIPAL ---
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

  const hasSelection = taskData.repertorios.length > 0;

  return (
    <div className="flex flex-col gap-12 max-w-[1165px] mx-auto pb-40 animate-in fade-in slide-in-from-right-8 duration-500 relative">

      {/* 1. Título */}
      <div className="space-y-4">
        <label className="font-montserrat font-semibold text-[35px] text-[#3C3C3C] leading-[43px]">
          Adicione um título à tarefa
        </label>
        <input
          type="text"
          value={taskData.titulo}
          onChange={(e) => updateTaskData({ titulo: e.target.value })}
          placeholder="Digite o título..."
          className="w-full pb-4 text-[20px] text-[#3C3C3C] bg-transparent border-b-[3px] border-[#898787] focus:outline-none focus:border-[#075F70] placeholder:text-gray-300 font-montserrat"
        />
      </div>

      {/* 2. Tema */}
      <div className="space-y-4">
        <label className="font-montserrat font-semibold text-[35px] text-[#3C3C3C] leading-[43px]">
          Crie um tema aqui
        </label>
        <div className="relative flex items-end gap-4 border-b-[3px] border-[#898787] pb-4">
          <textarea
            rows={1}
            value={taskData.tema}
            onChange={(e) => updateTaskData({ tema: e.target.value })}
            placeholder="Digite o tema completo..."
            className="flex-1 text-[20px] text-[#3C3C3C] bg-transparent focus:outline-none font-montserrat resize-none overflow-hidden placeholder:text-gray-300 h-[40px] pt-1"
          />
          
          {/* Botão Temas Prontos */}
          <button
            type="button"
            className="flex items-center justify-center px-5 py-2 border-[2px] border-[#3C3C3C] rounded-[20px] gap-2 hover:bg-gray-100 transition-colors shrink-0 mb-1"
            onClick={() => console.log("Lógica futura")}
          >
            <span className="font-montserrat font-medium text-[20px] text-[#3C3C3C]">Temas prontos</span>
          </button>
        </div>
      </div>

      {/* 3. Texto Motivador & Cards Decorativos */}
      <div className="relative mt-8 min-h-[400px]">
        
        {/* Lado Esquerdo: Texto e Botão */}
        <div className="relative z-20 max-w-[500px]">
          <h2 className="font-montserrat font-semibold text-[35px] leading-[43px] text-[#3C3C3C] mb-6">
            Texto motivador
          </h2>
          <p className="font-montserrat font-normal text-[30px] leading-[37px] text-[#3C3C3C] mb-10">
            Utilize os repertórios disponíveis em nosso site como textos motivadores! Eles ajudam a compreender melhor o tema.
          </p>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-[10px] w-[227px] h-[57px] bg-[#075F70] rounded-[25px] shadow-lg hover:bg-[#064d5c] transition-all hover:scale-105 active:scale-95"
          >
            <span className="font-montserrat font-medium text-[30px] leading-[37px] text-[#E5EFF0]">
              Ver tudo
            </span>
          </button>
        </div>

        {/* Lado Direito: Decoração ou Carrossel de Selecionados */}
        <div className="absolute top-0 right-0 w-[600px] h-full pointer-events-none xl:pointer-events-auto">
          {hasSelection ? (
            // === ESTADO SELECIONADO: Mostra os escolhidos ===
            <div className="relative z-30 pt-10 pl-10 animate-in fade-in zoom-in duration-500">
               <div className="overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-300">
                  <div className="flex gap-4 w-max">
                     {taskData.repertorios.map(rep => (
                        <div key={rep.id} className="w-[280px] pointer-events-auto relative group">
                             <button 
                                onClick={() => toggleRepertorio(rep)}
                                className="absolute -top-3 -right-3 z-50 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:scale-110"
                             >
                                <X size={16} />
                             </button>
                             <div className="scale-90 origin-top-left shadow-xl rounded-[24px]">
                                <RepertorioCard repertorio={rep} />
                             </div>
                        </div>
                     ))}
                  </div>
               </div>
               <p className="text-right text-gray-400 font-montserrat text-sm mt-2 italic pr-4">
                  {taskData.repertorios.length} texto(s) selecionado(s)
               </p>
            </div>
          ) : (
             // === ESTADO INICIAL: Cards Decorativos (Figma) ===
             <div className="relative w-full h-full hidden lg:block">
                {/* Card Esquerdo (Artigo - Roxo no Figma, aqui Citacao/Generic) */}
                <DecorativeCard 
                    type="citacao"
                    rotation="rotate(-10deg)"
                    opacity={0.5}
                    zIndex={0}
                    className="top-[20px] left-[50px]"
                />
                
                {/* Card Direito (Obra) */}
                <DecorativeCard 
                    type="obra"
                    rotation="rotate(10deg)"
                    opacity={0.5}
                    zIndex={0}
                    className="top-[20px] right-[20px]"
                />

                {/* Card Central (Em destaque) */}
                <DecorativeCard 
                    type="artigo"
                    rotation="rotate(0deg)"
                    opacity={1}
                    zIndex={10}
                    className="top-[0px] left-[160px]"
                />
             </div>
          )}
        </div>

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
