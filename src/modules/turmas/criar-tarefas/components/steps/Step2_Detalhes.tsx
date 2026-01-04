"use client";

import React, { useEffect, useState } from "react";
import { useCreateTask } from "../../context";
import { getAllRepertorios } from "@/lib/apiCalls/repertorio";
import { Repertorio } from "@/types/repertorio";
import { 
  Search, X, Check, Loader2, BookOpen, Quote, FileText, 
  Type, AlignLeft, Sparkles, ChevronDown 
} from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { toast } from "react-toastify";
import { TemasProntosModal } from "@/modules/redacao/criar/components/temas-prontos-modal";
import RepertorioCard from "@/modules/repertorio/repertorio-card";

const DEMO_CARDS = {
  citacao: {
    titulo: "Jean-Jacques Rousseau",
    texto: "O homem nasce livre, e por toda a parte encontra-se a ferros. Aquele que se crê senhor dos outros não deixa de ser mais escravo que eles.",
    tipo: "Filosofia"
  },
  obra: {
    titulo: "Vidas Secas",
    texto: "A obra de Graciliano Ramos narra a trajetória de uma família de retirantes sertanejos fugindo da seca e da miséria no sertão nordestino.",
    tipo: "Literatura"
  },
  artigo: {
    titulo: "Modernidade Líquida",
    texto: "Zygmunt Bauman define a modernidade líquida como um momento histórico em que as instituições, relações e valores se tornam fluidos e instáveis.",
    tipo: "Sociologia"
  }
};

const MOCK_THEMES = [
  "Os desafios do combate à obesidade infantil no Brasil",
  "A democratização do acesso ao cinema no Brasil",
  "Manipulação do comportamento do usuário pelo controle de dados na internet",
  "Caminhos para combater a intolerância religiosa no Brasil",
  "A persistência da violência contra a mulher na sociedade brasileira",
  "Desafios para a formação educacional de surdos no Brasil",
  "Publicidade infantil em questão no Brasil",
  "Efeitos da implantação da Lei Seca no Brasil",
  "O trabalho na construção da dignidade humana",
  "O estigma associado às doenças mentais na sociedade brasileira"
];

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
    return { ...base, modelo: 'obra', titulo: doc.titulo, autoria: doc.autor || doc.autoria, sinopse: doc.sinopse, tipoObra: doc.tipoObra || 'livro' } as Repertorio;
  }
  if (doc.tipoRepertorio === 'Artigo' || doc.modelo === 'artigo') {
    return { ...base, modelo: 'artigo', titulo: doc.titulo, autoria: doc.autor || doc.autoria, sintese: doc.resumo || doc.sintese, fonte: doc.fonte } as Repertorio;
  }
  if (doc.tipoRepertorio === 'Citacao' || doc.modelo === 'citacao') {
    return { ...base, modelo: 'citacao', autoria: doc.autor || doc.autoria, citacao: doc.frase || doc.citacao, fonte: doc.fonte } as Repertorio;
  }
  return { ...base, modelo: 'citacao', autoria: doc.autor || "Desconhecido", citacao: "Erro ao carregar conteúdo" } as Repertorio;
}

// --- MODAL DE SELEÇÃO ---
function RepertoireSelectorModal({ isOpen, onClose, eixoFilter, selectedIds, onToggleSelect }: any) {
  const [repertorios, setRepertorios] = useState<Repertorio[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const LIMIT = 15;

  useEffect(() => {
    if (isOpen) {
        setIsVisible(true);
        setRepertorios([]);
        setOffset(0);
        setHasMore(true);
        fetchRepertorios(0, true);
    } else {
        setIsVisible(false);
        setSearchTerm(""); 
    }
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
      toast.error("Erro ao carregar repertórios.");
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
    if (rep.modelo === 'citacao') {
        const conteudo = (rep.citacao || "").toLowerCase();
        return conteudo.includes(search) || autor.includes(search);
    } else {
        const titulo = (rep.titulo || "").toLowerCase();
        return titulo.includes(search) || autor.includes(search);
    }
  });

  if (!isOpen) return null;

  return (
    <div 
      className={cn(
        "fixed inset-0 z-[9999] flex items-center justify-center p-4 transition-all duration-300",
        isVisible ? "bg-[#075F70]/60 backdrop-blur-md opacity-100" : "bg-transparent opacity-0"
      )}
      onClick={onClose}
    >
      <div 
        className={cn(
            "bg-white w-full max-w-6xl h-[90vh] flex flex-col shadow-2xl overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
            "rounded-[40px] border border-white/20",
            isVisible ? "scale-100 translate-y-0 opacity-100" : "scale-95 translate-y-8 opacity-0"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-8 py-6 border-b border-gray-100 bg-white flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center text-[#075F70]">
               <BookOpen size={24} />
            </div>
            <div>
               <h3 className="text-2xl font-bold font-montserrat text-[#3C3C3C]">Biblioteca de Repertórios</h3>
               <div className="flex items-center gap-2">
                 <p className="text-sm text-gray-400 font-medium">Selecione textos para apoiar sua tarefa</p>
                 {eixoFilter && (
                    <span className="text-xs font-bold text-[#075F70] bg-teal-50 px-2 py-0.5 rounded-full border border-teal-100">
                        {eixoFilter}
                    </span>
                 )}
               </div>
            </div>
          </div>
          <div className="relative w-full md:max-w-md">
             <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Search size={20} />
             </div>
             <input 
                className="w-full h-[56px] bg-gray-50/80 hover:bg-gray-100 focus:bg-white rounded-full pl-12 pr-4 outline-none border-2 border-transparent focus:border-[#075F70]/30 transition-all font-montserrat text-[#3C3C3C] placeholder:text-gray-400"
                placeholder="Pesquisar nos itens carregados..." 
                value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
             />
          </div>
          <button 
            onClick={onClose} 
            className="w-12 h-12 flex items-center justify-center hover:bg-red-50 rounded-full transition-colors group"
            title="Fechar"
          >
            <X size={28} className="text-gray-400 group-hover:text-red-500 transition-colors" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 bg-[#F8F9FA] scrollbar-thin scrollbar-thumb-gray-300">
            {loading ? (
                <div className="flex flex-col justify-center h-full items-center text-[#075F70] gap-4">
                    <Loader2 className="animate-spin" size={48} />
                    <p className="font-montserrat font-medium opacity-70">
                        {eixoFilter ? `Buscando repertórios sobre ${eixoFilter}...` : "Carregando acervo..."}
                    </p>
                </div>
            ) : (
                <>
                    {displayList.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                            {displayList.map(rep => {
                                const isSelected = selectedIds.includes(rep.id);
                                return (
                                    <div 
                                        key={rep.id} 
                                        onClick={() => onToggleSelect(rep)} 
                                        className={cn(
                                            "cursor-pointer relative transition-all duration-300 group rounded-[24px]",
                                            isSelected 
                                                ? "ring-4 ring-[#075F70] shadow-[0px_10px_30px_rgba(7,95,112,0.2)] scale-[1.02] bg-white z-10" 
                                                : "hover:scale-[1.01] hover:shadow-xl border border-transparent hover:border-gray-200"
                                        )}
                                    >
                                        <div className="pointer-events-none select-none h-full">
                                            <div className="rounded-[20px] overflow-hidden h-full">
                                                <RepertorioCard repertorio={rep} />
                                            </div>
                                        </div>
                                        {isSelected && (
                                            <div className="absolute inset-0 bg-[#075F70]/5 rounded-[24px] pointer-events-none border-4 border-[#075F70] flex items-start justify-end p-4">
                                                <div className="bg-[#075F70] text-white p-2 rounded-full shadow-lg animate-in zoom-in duration-300">
                                                    <Check size={20} strokeWidth={3} />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-2">
                            <BookOpen size={48} className="opacity-20" />
                            <p className="font-montserrat text-lg">Nenhum repertório encontrado.</p>
                            {eixoFilter && <p className="text-sm">Tente limpar o filtro de busca ou escolha outro eixo.</p>}
                        </div>
                    )}
                    {!loading && hasMore && (
                        <div className="mt-8 flex justify-center pb-4">
                            <button
                                onClick={handleLoadMore}
                                disabled={loadingMore}
                                className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-full text-gray-600 hover:bg-gray-50 hover:border-[#075F70] hover:text-[#075F70] transition-all shadow-sm disabled:opacity-50 font-montserrat font-medium"
                            >
                                {loadingMore ? <Loader2 className="animate-spin" size={18} /> : <ChevronDown size={18} />}
                                {loadingMore ? "Carregando mais..." : "Carregar mais repertórios"}
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
        <div className="p-6 border-t border-gray-100 bg-white flex justify-between items-center">
            <div className="flex items-center gap-2 text-gray-500 font-medium">
                <span className="bg-teal-50 text-[#075F70] px-3 py-1 rounded-full text-sm font-bold">
                    {selectedIds.length}
                </span>
                <span>selecionados</span>
            </div>
            <button 
                onClick={onClose} 
                className="bg-[#075F70] text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-[#064d5c] hover:shadow-lg hover:-translate-y-1 transition-all active:translate-y-0"
            >
                Confirmar Seleção
            </button>
        </div>
      </div>
    </div>
  );
}

const DecorativeCard = ({ 
  type, 
  rotation, 
  opacity, 
  zIndex, 
  className 
}: { 
  type: 'citacao' | 'obra' | 'artigo', 
  rotation: string, 
  opacity: number, 
  zIndex: number, 
  className?: string 
}) => {
  const content = DEMO_CARDS[type];
  const cardWidth = type === 'artigo' ? '340px' : '280px';

  return (
    <div
      className={cn(
        "absolute bg-white rounded-[24px] p-[24px] flex flex-col gap-4 overflow-hidden select-none border border-gray-100 shadow-xl transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl", 
        className
      )}
      style={{
        width: cardWidth,
        height: "fit-content",
        transform: rotation,
        opacity: opacity,
        zIndex: zIndex
      }}
    >
      <div className="flex items-center gap-2 self-start bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-100">
        {type === 'artigo' && <FileText size={14} className="text-[#075F70]" />}
        {type === 'obra' && <BookOpen size={14} className="text-[#075F70]" />}
        {type === 'citacao' && <Quote size={14} className="text-[#075F70]" />}
        <span className="font-montserrat font-semibold italic text-[11px] text-[#075F70] capitalize tracking-wide">
          {content.tipo}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <h4 className="font-montserrat font-bold text-[16px] text-[#3C3C3C] leading-tight">
          {content.titulo}
        </h4>
        <div className="relative">
          <p className="font-open-sans font-normal text-[13px] text-gray-600 leading-[1.5] line-clamp-4">
            {type === 'citacao' && <span className="text-[#075F70] font-bold mr-1">“</span>}
            {content.texto}
            {type === 'citacao' && <span className="text-[#075F70] font-bold ml-1">”</span>}
          </p>
        </div>
      </div>
    </div>
  )
}

export function Step2_Detalhes() {
  const { taskData, updateTaskData } = useCreateTask();
  const [isRepertorioModalOpen, setIsRepertorioModalOpen] = useState(false);
  const [isTemasModalOpen, setIsTemasModalOpen] = useState(false);

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

  const handleThemeSelect = (temaSelecionado: string) => {
    updateTaskData({ tema: temaSelecionado });
    setIsTemasModalOpen(false);
  };

  const hasSelection = taskData.repertorios.length > 0;

  return (
    <div className="flex flex-col gap-10 max-w-[1165px] mx-auto pb-8 animate-in fade-in slide-in-from-right-8 duration-500 relative">

      {/* 1. Título e Tema */}
      <div className="grid grid-cols-1 gap-8">
        <div className="relative group w-full">
          <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#075F70] transition-colors duration-300">
            <Type size={24} />
          </div>
          <input
            id="titulo"
            type="text"
            value={taskData.titulo}
            onChange={(e) => updateTaskData({ titulo: e.target.value })}
            className="peer w-full h-[80px] bg-white rounded-[24px] border-2 border-gray-100 pl-16 pr-6 pt-6 pb-2 font-montserrat font-bold text-[22px] text-[#3C3C3C] placeholder-transparent focus:border-[#075F70]/20 focus:ring-4 focus:ring-[#075F70]/5 outline-none shadow-sm hover:shadow-md transition-all duration-300"
            placeholder="Titulo"
          />
          <label
            htmlFor="titulo"
            className="absolute left-16 top-3 text-xs font-bold text-[#075F70] uppercase tracking-wider transition-all peer-placeholder-shown:top-7 peer-placeholder-shown:text-[18px] peer-placeholder-shown:text-gray-400 peer-placeholder-shown:font-medium peer-placeholder-shown:normal-case peer-focus:top-3 peer-focus:text-xs peer-focus:text-[#075F70] peer-focus:font-bold peer-focus:uppercase cursor-text"
          >
            Título da Tarefa
          </label>
        </div>

        <div className="relative group w-full">
          <div className="absolute left-6 top-6 text-gray-300 group-focus-within:text-[#075F70] transition-colors duration-300">
            <AlignLeft size={24} />
          </div>
          <textarea
            id="tema"
            value={taskData.tema}
            onChange={(e) => updateTaskData({ tema: e.target.value })}
            rows={4}
            className="peer w-full min-h-[160px] bg-white rounded-[24px] border-2 border-gray-100 pl-16 pr-6 pt-10 pb-16 font-montserrat font-medium text-[18px] text-[#3C3C3C] leading-relaxed placeholder-transparent focus:border-[#075F70]/20 focus:ring-4 focus:ring-[#075F70]/5 outline-none shadow-sm hover:shadow-md resize-none transition-all duration-300 scrollbar-thin scrollbar-thumb-gray-200"
            placeholder="Tema"
          />
          <label
            htmlFor="tema"
            className="absolute left-16 top-4 text-xs font-bold text-[#075F70] uppercase tracking-wider transition-all peer-placeholder-shown:top-8 peer-placeholder-shown:text-[18px] peer-placeholder-shown:text-gray-400 peer-placeholder-shown:font-medium peer-placeholder-shown:normal-case peer-focus:top-4 peer-focus:text-xs peer-focus:text-[#075F70] peer-focus:font-bold peer-focus:uppercase cursor-text"
          >
            Tema da Redação
          </label>

          <div className="absolute bottom-4 right-4 left-16 flex items-center justify-between border-t border-gray-100 pt-3">
             <span className="text-xs text-gray-300 font-montserrat pl-1 opacity-0 peer-focus:opacity-100 transition-opacity">
                {taskData.tema.length} caracteres
             </span>
             
             <button
                type="button"
                onClick={() => setIsTemasModalOpen(true)}
                className="flex items-center gap-2 bg-gray-50 border border-gray-200 text-gray-600 px-4 py-2 rounded-full transition-all hover:bg-[#075F70] hover:text-white hover:border-[#075F70] hover:shadow-lg group/btn active:scale-95"
             >
                <Sparkles size={16} className="text-[#075F70] group-hover/btn:text-white transition-colors" />
                <span className="text-sm font-bold">Temas Prontos</span>
             </button>
          </div>
        </div>
      </div>

      {/* 3. Texto Motivador & Cards Decorativos */}
      {/* CORREÇÃO AQUI: Layout alterado para Grid para evitar que o conteúdo absoluto "atravesse" o footer */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8 min-h-[400px] relative">
        
        {/* Lado Esquerdo */}
        <div className="relative z-20 flex flex-col justify-center">
          <h2 className="font-montserrat font-bold text-[32px] leading-tight text-[#3C3C3C] mb-4">
            Textos de Apoio
          </h2>
          <p className="font-montserrat text-lg text-gray-500 mb-8 leading-relaxed">
            Enriqueça a proposta selecionando repertórios da nossa base como textos motivadores.
          </p>

          <button
            onClick={() => setIsRepertorioModalOpen(true)}
            className="flex items-center justify-center gap-3 px-8 py-4 bg-[#075F70] text-white rounded-full shadow-xl hover:bg-[#064d5c] hover:scale-105 active:scale-95 transition-all group w-fit"
          >
            <Search className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
            <span className="font-montserrat font-bold text-lg">
              Buscar Repertórios
            </span>
          </button>
        </div>

        {/* Lado Direito: Decoração ou Carrossel */}
        {/* Agora é um container relativo dentro do grid, ocupando espaço físico */}
        <div className="relative w-full min-h-[400px] pointer-events-none xl:pointer-events-auto">
          {hasSelection ? (
            <div className="relative z-30 pt-4 pl-0 lg:pl-10 animate-in fade-in zoom-in duration-500">
               <div className="overflow-x-auto pb-6 pt-6 scrollbar-thin scrollbar-thumb-gray-200 px-4 -mx-4">
                  <div className="flex gap-4 w-max">
                     {taskData.repertorios.map(rep => (
                        <div key={rep.id} className="w-[280px] pointer-events-auto relative group">
                             <button 
                                onClick={() => toggleRepertorio(rep)}
                                className="absolute -top-3 -right-3 z-50 bg-white border border-gray-200 text-red-500 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-lg hover:bg-red-50 hover:scale-110"
                                title="Remover"
                             >
                                <X size={18} />
                             </button>
                             <div className="scale-95 hover:scale-100 transition-transform duration-300 origin-center shadow-lg hover:shadow-2xl rounded-[24px]">
                                <RepertorioCard repertorio={rep} />
                             </div>
                        </div>
                     ))}
                  </div>
               </div>
               <p className="text-right text-gray-400 font-montserrat text-xs mt-0 font-medium uppercase tracking-wider pr-4">
                  {taskData.repertorios.length} texto(s) selecionado(s)
               </p>
            </div>
          ) : (
             <div className="relative w-full h-full min-h-[400px] hidden lg:block opacity-90 hover:opacity-100 transition-opacity duration-500">
                <DecorativeCard 
                    type="citacao"
                    rotation="rotate(-12deg)" 
                    opacity={0.8}
                    zIndex={0}
                    className="top-[40px] left-[60px] scale-90 blur-[0.5px]" 
                />
                <DecorativeCard 
                    type="obra"
                    rotation="rotate(12deg)" 
                    opacity={0.85}
                    zIndex={5}
                    className="top-[50px] left-[280px] scale-95" 
                />
                <DecorativeCard 
                    type="artigo"
                    rotation="rotate(-3deg)" 
                    opacity={1}
                    zIndex={10} 
                    className="top-[80px] left-[160px] shadow-2xl border-none"
                />
             </div>
          )}
        </div>
      </div>

      <RepertoireSelectorModal
        isOpen={isRepertorioModalOpen}
        onClose={() => setIsRepertorioModalOpen(false)}
        eixoFilter={taskData.eixoId}
        selectedIds={taskData.repertorios.map(r => r.id)}
        onToggleSelect={toggleRepertorio}
      />

      <TemasProntosModal
        isOpen={isTemasModalOpen}
        onClose={() => setIsTemasModalOpen(false)}
        onSelect={handleThemeSelect}
        themes={MOCK_THEMES}
      />
    </div>
  );
}