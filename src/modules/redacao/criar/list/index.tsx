import { useState, useEffect } from 'react';
import { RedacaoLivreDoc } from '@/lib/apiCalls/redacao-livre/types';
import { RedacaoCard, RedacaoStatus } from '../components/card';
import { Search, Trash2, X, AlertTriangle } from 'lucide-react';
import { deleteRedacaoLivre } from '@/lib/apiCalls/redacao-livre';

interface RedacoesCriadasListProps {
  redacoes: RedacaoLivreDoc[];
  handleChange: (text: string) => Promise<void>
  onDeletion: (val: boolean) => void
  isLoading?: boolean; // Nova prop opcional para controlar loading externamente
}

export function RedacaoCardSkeleton() {
  return (
    <div className="block bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 relative h-full animate-pulse">
      <div className="flex flex-col justify-between h-full space-y-6">
        {/* Tema skeleton */}
        <div className="space-y-2">
          <div className="w-16 h-4 bg-gray-200 rounded-full"></div>
          <div className="space-y-2">
            <div className="w-full h-6 bg-gray-200 rounded"></div>
            <div className="w-3/4 h-6 bg-gray-200 rounded"></div>
            <div className="w-1/2 h-6 bg-gray-200 rounded"></div>
          </div>
        </div>

        {/* Status e finalização skeleton */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-gray-50 mt-auto">
          <div className="w-32 h-8 bg-gray-200 rounded-full"></div>
          <div className="w-24 h-6 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
}

export function RedacoesCriadasList({ 
  redacoes, 
  handleChange, 
  onDeletion, 
  isLoading = false 
}: RedacoesCriadasListProps) {
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [redacaoToDelete, setRedacaoToDelete] = useState<RedacaoLivreDoc | null>(null);

  // Estados para Animação do Modal de Exclusão
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  // --- LÓGICA DE ANIMAÇÃO DO MODAL ---
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
    if (redacao.correcoesIA.length === 0) return "sem_correcoes"
    const correcao = redacao.correcoesIA[0]
    switch (correcao.status) {
      case 'erro': return 'erro'
      case 'finalizada': return 'completa'
      case 'pendente': return 'pendente'
      default: return 'pendente'
    }
  }

  const handleDeleteRequest = (redacao: RedacaoLivreDoc) => {
    setRedacaoToDelete(redacao);
  };

  const closeDeleteModal = () => {
    setRedacaoToDelete(null);
  };

  const confirmDelete = async () => {
    if (redacaoToDelete) {
      await deleteRedacaoLivre(redacaoToDelete.id)

      onDeletion(true)

      setRedacaoToDelete(null);
      setIsDeleteMode(false);
    }
  };

  return (
    <section className="space-y-8 font-montserrat">
      <div className={`flex flex-col md:flex-row justify-between items-center gap-6`}>
        <h2 className="text-2xl font-semibold text-[#3C3C3C]">
          Redações criadas
        </h2>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Botão de Lixeira - desabilitado durante loading */}
          <button
            onClick={() => setIsDeleteMode(!isDeleteMode)}
            disabled={isLoading}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm border
              ${isDeleteMode 
                ? 'bg-red-100 border-red-200 text-red-600 rotate-180' 
                : 'bg-white border-gray-200 text-[#898787] hover:bg-red-50 hover:text-red-500 hover:border-red-100'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            title={isDeleteMode ? "Cancelar exclusão" : "Excluir redações"}
          >
            {isDeleteMode ? <X size={20} /> : <Trash2 size={20} />}
          </button>

          {/* Barra de Pesquisa */}
          <div
            className={`w-full md:w-[28rem] h-12 flex items-center gap-3 p-1.5 bg-white rounded-full shadow-sm border border-gray-200 ${
              isLoading ? 'opacity-50' : ''
            }`}
          >
            <button
              className="w-9 h-9 bg-[#075F70] rounded-full flex items-center justify-center flex-shrink-0 transition-transform active:scale-95"
              disabled={isLoading}
            >
              <Search size={18} className="text-white" />
            </button>

            <input
              type="text"
              placeholder="Pesquise por uma redação criada"
              onChange={e => handleChange(e.target.value)}
              disabled={isDeleteMode || isLoading}
              className={`w-full bg-transparent text-[#3C3C3C] placeholder:text-[#898787] text-base font-normal focus:outline-none mr-4 transition-opacity ${
                isDeleteMode || isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            />
          </div>
        </div>
      </div>

      {isDeleteMode && !isLoading && (
        <div className="bg-red-50 border border-red-100 text-red-700 px-4 py-2 rounded-xl text-sm text-center animate-pulse">
          Selecione uma redação para excluir
        </div>
      )}

      {/* Loading State */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="relative"
              style={{
                animation: `fadeInUp 0.5s ease-out forwards`,
                animationDelay: `${index * 0.05}s`,
                opacity: 0,
              }}
            >
              <RedacaoCardSkeleton />
            </div>
          ))}
        </div>
      ) : redacoes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {redacoes.map((redacao, index) => (
            <div
              key={redacao.id}
              className="relative"
              style={{
                animation: `fadeInUp 0.5s ease-out forwards`,
                animationDelay: `${index * 0.05}s`,
                opacity: 0,
              }}
            >
              <RedacaoCard
                href={`/praticar_redacao/${redacao.id}` + (redacao.finalizada ? "/correcao" : "")}
                tema={redacao.tema}
                status={statusRedacao(redacao)}
                finalizada={redacao.finalizada}
                isDeleteMode={isDeleteMode}
                onDelete={() => handleDeleteRequest(redacao)}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-12 text-lg font-light">
          Nenhuma redação criada ainda.
        </p>
      )}

      <style jsx global>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* --- MODAL DE CONFIRMAÇÃO --- */}
      {shouldRender && (
        <div 
            className={`
              fixed inset-0 z-[999] flex items-center justify-center p-4 font-montserrat
              transition-opacity duration-300 ease-in-out
              ${isVisible ? 'bg-[#075F70]/60 backdrop-blur-sm opacity-100' : 'bg-transparent backdrop-blur-none opacity-0'}
            `}
            onClick={closeDeleteModal}
        >
          <div 
            className={`
              relative w-full max-w-3xl bg-white p-10 rounded-[40px] shadow-2xl transform
              transition-all duration-300 ease-out
              ${isVisible ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-8 opacity-0'}
            `}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botão X para fechar */}
            <button 
                onClick={closeDeleteModal}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
            >
                <X size={24} />
            </button>

            <div className="flex flex-col md:flex-row items-start gap-8">
              
              {/* Ícone Pulsante */}
              <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center flex-shrink-0 border border-red-100 shadow-inner">
                <AlertTriangle size={36} className="text-red-600 animate-pulse" />
              </div>

              {/* Conteúdo */}
              <div className="flex-1 w-full flex flex-col justify-between min-h-[5rem]">
                <div className="space-y-4 mb-8">
                  <h3 className="text-2xl font-semibold text-[#3C3C3C]">
                    Tem certeza que deseja excluir?
                  </h3>
                  <p className="text-gray-500 text-lg leading-relaxed">
                    Você está prestes a remover permanentemente a redação:<br/>
                    {redacaoToDelete && (
                      <span className="font-medium text-[#3C3C3C] italic text-xl block mt-2 border-l-4 border-red-200 pl-4 py-1">
                        "{redacaoToDelete.tema}"
                      </span>
                    )}
                  </p>
                </div>

                {/* Botões */}
                <div className="flex flex-row gap-4 justify-end">
                  <button 
                    onClick={closeDeleteModal}
                    className="px-8 py-3 rounded-[24px] border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button 
                    onClick={confirmDelete}
                    className="px-8 py-3 rounded-[24px] bg-red-600 text-white font-medium hover:bg-red-700 shadow-md hover:shadow-lg transition-all active:scale-95"
                  >
                    Sim, excluir
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
}