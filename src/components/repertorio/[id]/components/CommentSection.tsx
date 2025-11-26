import React, { useState } from 'react';
import { User, ChevronLeft, ChevronRight } from 'lucide-react'; 
import type { Comentario } from '@/apiCalls/types';
import { CommentCard } from './CommentCard';
import { useAuth } from '@/contexts/auth-context';

interface CommentSectionProps {
  comments: Comentario[];
  repertorioId: string;
  isLoggedIn: boolean;
  userRole: string | undefined;
  newComment: string;
  setNewComment: (value: string) => void;
  isSubmittingComment: boolean;
  onCommentSubmit: (e: React.FormEvent) => void;
  onCommentUpdate: () => void;
  openModal: (options: any) => void;
  // Novas props para o Mock e correção do Toast
  authorName?: string;
  authorProfilePicture?: string | null;
  authorId?: string;
}

export function CommentSection({
  comments, isLoggedIn, userRole, newComment, setNewComment,
  isSubmittingComment, onCommentSubmit,
  authorName, authorProfilePicture, authorId
}: CommentSectionProps) {
  
  // Estado para controlar a aba: 'geral' ou 'autor'
  const [viewMode, setViewMode] = useState<'geral' | 'autor'>('geral');
  const { userData } = useAuth(); 

  // --- MOCK DO COMENTÁRIO DO AUTOR ---
  const mockAuthorComment: Comentario = {
    id: "mock-autor-1",
    texto: "Essa obra é fundamental para entender o contexto histórico citado. Recomendo atenção especial ao segundo parágrafo da síntese onde destaco a correlação com a atualidade.",
    usuario: {
      // Usamos o ID real para evitar conflitos, mas se for null usamos um placeholder
      id: authorId || "mock-autor-id", 
      nome: authorName || "Educador Autor"
    }
  };

  return (
    // Card Container Cinza
    <div className="bg-[#EAEAEA] rounded-[2rem] p-6 md:p-8 shadow-sm">
      
      {/* HEADER: Título e Botões de Seleção */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-300/50">
        
        {/* Título Dinâmico */}
        <h3 className="text-lg md:text-xl font-bold text-gray-800 font-montserrat">
          {viewMode === 'geral' 
            ? `${comments.length} comentários` 
            : 'Comentários do educador autor'
          }
        </h3>

        {/* --- TOGGLE DE ABAS --- */}
        <div className="flex flex-row items-center gap-3">
          
          {/* Botão Geral (Esquerda) */}
          <button
            onClick={() => setViewMode('geral')}
            className={`flex items-center justify-center h-6 rounded-full transition-all duration-300 ease-out cursor-pointer
              ${viewMode === 'geral' ? 'w-[63px] bg-[#024D4D]' : 'w-6 bg-[#D9D9D9]'}
            `}
            aria-label="Ver todos os comentários"
          >
            {viewMode === 'geral' && (
              <ChevronLeft className="w-5 h-5 text-white" strokeWidth={3} />
            )}
          </button>

          {/* Botão Autor (Direita) */}
          <button
            onClick={() => setViewMode('autor')}
            className={`flex items-center justify-center h-6 rounded-full transition-all duration-300 ease-out cursor-pointer
              ${viewMode === 'autor' ? 'w-[63px] bg-[#024D4D]' : 'w-6 bg-[#D9D9D9]'}
            `}
            aria-label="Ver comentários do autor"
          >
            {viewMode === 'autor' && (
              <ChevronRight className="w-5 h-5 text-white" strokeWidth={3} />
            )}
          </button>

        </div>
      </div>

      {/* LISTA DE COMENTÁRIOS */}
      <div className="min-h-[100px] mb-6">
        {viewMode === 'autor' ? (
          // --- VISÃO DO AUTOR ---
          <div className="animate-fadeIn">
            <CommentCard 
                comentario={mockAuthorComment} 
                isAuthorComment={true}
                // Passamos a foto pré-carregada para evitar o erro de ID inválido no fetch
                preloadedPicture={authorProfilePicture} 
            />
          </div>
        ) : (
          // --- VISÃO GERAL ---
          <div className="animate-fadeIn space-y-2">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <CommentCard 
                  key={comment.id} 
                  comentario={comment} 
                />
              ))
            ) : (
              <p className="text-gray-500 font-opensans text-center py-4">
                Seja o primeiro a comentar!
              </p>
            )}
          </div>
        )}
      </div>

      {/* INPUT AREA (Apenas na visão geral) */}
      {viewMode === 'geral' && isLoggedIn && userRole !== "aluno" && (
        <div className="flex items-center gap-3 pt-4 border-t border-gray-300/50 mt-2">
          
          {/* Avatar Placeholder (ou foto do user logado se quiser implementar) */}
          <div className="w-10 h-10 bg-white rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden">
             <User size={20} className="text-gray-300" />
          </div>

          {/* Form de Input */}
          <form onSubmit={onCommentSubmit} className="flex-1 flex gap-2 w-full">
            <input 
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Faça um comentário..."
              className="flex-1 bg-transparent text-gray-700 font-opensans placeholder-gray-500 focus:outline-none text-sm md:text-base py-2"
              disabled={isSubmittingComment}
            />
            
            <button 
              type="submit" 
              disabled={isSubmittingComment || !newComment.trim()}
              className="px-6 py-2 bg-white text-[#024D4D] font-bold font-montserrat rounded-full text-sm hover:bg-gray-50 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Enviar
            </button>
          </form>
        </div>
      )}
    </div>
  );
}