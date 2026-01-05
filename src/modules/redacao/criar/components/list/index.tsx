"use client";

import { useState, useEffect, useRef } from "react";
import { RedacaoLivreDoc } from "@/lib/apiCalls/redacao-livre/types";
import { RedacaoCard, RedacaoStatus } from "../card";
import { Search, Trash2, X, AlertTriangle } from "lucide-react";
import { deleteRedacaoLivre } from "@/lib/apiCalls/redacao-livre";
import { useInViewOnce } from "@/shared/hooks/useLazyLoading";
import { useDebounce } from "@/shared/hooks/useDebounce";

interface RedacoesCriadasListProps {
  redacoes: RedacaoLivreDoc[];
  handleChange: (text: string) => Promise<void>;
  onDeletion: (val: boolean) => void;
  isLoading?: boolean;
}

/* ---------------- Skeleton (componentizar depois) ---------------- */

export function RedacaoCardSkeleton() {
  return (
    <div className="block bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 relative h-full animate-pulse">
      <div className="flex flex-col justify-between h-full space-y-6">
        <div className="space-y-2">
          <div className="w-16 h-4 bg-gray-200 rounded-full"></div>
          <div className="space-y-2">
            <div className="w-full h-6 bg-gray-200 rounded"></div>
            <div className="w-3/4 h-6 bg-gray-200 rounded"></div>
            <div className="w-1/2 h-6 bg-gray-200 rounded"></div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
          <div className="w-32 h-8 bg-gray-200 rounded-full"></div>
          <div className="w-24 h-6 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- List ---------------- */

export function RedacoesCriadasList({
  redacoes,
  handleChange,
  onDeletion,
  isLoading = false,
}: RedacoesCriadasListProps) {
  const { ref, hasEnteredView } = useInViewOnce<HTMLElement>();

  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [redacaoToDelete, setRedacaoToDelete] =
    useState<RedacaoLivreDoc | null>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue, 1000); // 1 segundo de debounce para pesquisar uma redação :)
  const handleChangeRef = useRef(handleChange);

  useEffect(() => {
    handleChangeRef.current = handleChange;
  }, [handleChange]);
  useEffect(() => {
    if (!hasEnteredView) return;

    handleChangeRef.current(debouncedSearch);
  }, [debouncedSearch, hasEnteredView]);

  useEffect(() => {
    if (redacaoToDelete) {
      setShouldRender(true);
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [redacaoToDelete]);

  const statusRedacao = (redacao: RedacaoLivreDoc): RedacaoStatus => {
    if (redacao.correcoesIA.length === 0) return "sem_correcoes";
    const correcao = redacao.correcoesIA[0];

    switch (correcao.status) {
      case "erro":
        return "erro";
      case "finalizada":
        return "completa";
      case "pendente":
      default:
        return "pendente";
    }
  };

  const confirmDelete = async () => {
    if (!redacaoToDelete) return;

    await deleteRedacaoLivre(redacaoToDelete.id);
    onDeletion(true);

    setRedacaoToDelete(null);
    setIsDeleteMode(false);
  };

  if (!hasEnteredView) {
    return <section ref={ref} className="h-[20rem]" />;
  }

  return (
    <section ref={ref} className="space-y-8 font-montserrat">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <h2 className="text-2xl font-semibold text-[#3C3C3C]">
          Redações criadas
        </h2>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={() => setIsDeleteMode(!isDeleteMode)}
            disabled={isLoading}
            className={`cursor-pointer w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-sm border
              ${
                isDeleteMode
                  ? "bg-red-100 border-red-200 text-red-600 rotate-180"
                  : "bg-white border-gray-200 text-[#898787] hover:bg-red-50 hover:text-red-500"
              }
              ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
            `}
          >
            {isDeleteMode ? <X size={20} /> : <Trash2 size={20} />}
          </button>

          <div className="w-full md:w-[28rem] h-12 flex items-center gap-3 p-1.5 bg-white rounded-full shadow-sm border border-gray-200">
            <button className="w-9 h-9 bg-[#075F70] rounded-full flex items-center justify-center">
              <Search size={18} className="text-white" />
            </button>

            <input
              type="text"
              placeholder="Pesquise por uma redação criada"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              disabled={isDeleteMode || isLoading}
              className="w-full bg-transparent focus:outline-none mr-4"
            />
          </div>
        </div>
      </div>

      {isDeleteMode && !isLoading && (
        <div className="bg-red-50 border border-red-100 text-red-700 px-4 py-2 rounded-xl text-sm text-center animate-pulse">
          Selecione uma redação para excluir
        </div>
      )}

      {/* Content */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <RedacaoCardSkeleton key={i} />
          ))}
        </div>
      ) : redacoes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {redacoes.map((redacao, index) => (
            <RedacaoCard
              key={redacao.id}
              href={`/praticar_redacao/${redacao.id}${
                redacao.finalizada ? "/correcao" : ""
              }`}
              tema={redacao.tema}
              status={statusRedacao(redacao)}
              finalizada={redacao.finalizada}
              isDeleteMode={isDeleteMode}
              onDelete={() => setRedacaoToDelete(redacao)}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-12 text-lg">
          Nenhuma redação encontrada.
        </p>
      )}

      {/* ---------- Modal ---------- */}
      {shouldRender && (
        <div
          className={`fixed inset-0 z-[999] flex items-center justify-center p-4 transition-opacity
            ${isVisible ? "bg-[#075F70]/60 backdrop-blur-sm" : "opacity-0"}
          `}
          onClick={() => setRedacaoToDelete(null)}
        >
          <div
            className={`bg-white p-10 rounded-[40px] shadow-2xl transform transition-all
              ${isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"}
            `}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-semibold mb-4">
              Tem certeza que deseja excluir?
            </h3>

            <p className="mb-8 text-gray-600">"{redacaoToDelete?.tema}"</p>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setRedacaoToDelete(null)}
                className="px-6 py-2 border rounded-xl"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="px-6 py-2 bg-red-600 text-white rounded-xl"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
