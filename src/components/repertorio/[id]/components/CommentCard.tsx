import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { User, ThumbsUp, ThumbsDown, Pin, Trash2 } from 'lucide-react';
import type { Comentario } from '@/apiCalls/types';
import { useAuth } from '@/contexts/auth-context';
import { getProfilePictureLink } from '@/apiCalls/usuario';

interface CommentCardProps {
  comentario: Comentario;
  isAuthorComment?: boolean;
  preloadedPicture?: string | null;
  canPin?: boolean;
  onPin?: (id: string, currentStatus: boolean) => Promise<void>;
  canDelete?: boolean;
  onDelete?: (id: string) => void;
}

export function CommentCard({ comentario, isAuthorComment = false, preloadedPicture, canPin, onPin, canDelete, onDelete }: CommentCardProps) {
  // Se vier preloadedPicture, usamos ela direto no estado inicial
  const [authorProfilePictureLink, setAuthorProfilePictureLink] = useState<string | null>(preloadedPicture || null);
  
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [isActionLoading, setIsActionLoading] = useState(false);

  useEffect(() => {
    // Se já temos a imagem pré-carregada, NÃO buscamos na API
    if (preloadedPicture !== undefined) return;

    // Se o ID for o do mock ("autor-id"), NÃO buscamos na API
    if (comentario.usuario?.id === "autor-id") return;

    async function fetchPicture() {
      if (comentario.usuario?.id) {
        try {
          const link = await getProfilePictureLink(comentario.usuario.id);
          setAuthorProfilePictureLink(link);
        } catch (error) {
          // Silencia erro de imagem não encontrada para evitar toast desnecessário em listas
        }
      }
    }
    fetchPicture();
  }, [comentario.usuario, preloadedPicture]);

  // const handleLike = async () => {
  //   if (isActionLoading) return;
  //   setIsActionLoading(true);
  //   try {
  //     // Simula delay de rede ou chamada real se houvesse
  //     // await addLike(comentario.id); 
  //     setLiked(!liked);
  //     if (disliked) setDisliked(false);
  //   } finally {
  //     setIsActionLoading(false);
  //   }
  // };

  // const handleDislike = async () => {
  //   if (isActionLoading) return;
  //   setIsActionLoading(true);
  //   try {
  //     setDisliked(!disliked);
  //     if (liked) setLiked(false);
  //   } finally {
  //     setIsActionLoading(false);
  //   }
  // };

  const handlePinClick = async () => {
    if (isActionLoading || !onPin) return;
    setIsActionLoading(true);
    try {
      await onPin(comentario.id, !!comentario.fixado);
    } finally {
      setIsActionLoading(false);
    }
  }

  return (
    <div className={`flex gap-3 md:gap-4 py-4 border-b border-gray-200/50 last:border-0 ${comentario.fixado ? 'bg-gray-50/50 -mx-4 px-4 rounded-lg' : ''}`}>
      <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex-shrink-0 overflow-hidden border border-gray-100 shadow-sm">
        {authorProfilePictureLink ? (
          <Image width={48} height={48} src={authorProfilePictureLink} alt={comentario.usuario.nome} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-50">
             <User size={20} className="text-gray-300" />
          </div>
        )}
      </div>

      <div className="flex-1">
        <div className="flex items-baseline justify-between mb-1">
          <div className="flex items-baseline gap-2">
            <span className="text-sm md:text-base font-bold text-gray-800 font-montserrat">
              {comentario.usuario.nome}
            </span>
            {isAuthorComment && (
              <span className="text-xs md:text-sm text-gray-500 font-opensans">
                Educador autor
              </span>
            )}
            {comentario.fixado && (
              <span className="flex items-center gap-1 text-xs text-[#024D4D] font-bold bg-[#024D4D]/10 px-2 py-0.5 rounded-full">
                <Pin size={12} className="fill-current" />
                Fixado
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {canPin && onPin && (
              <button 
                onClick={handlePinClick}
                disabled={isActionLoading}
                className={`p-1.5 rounded-full transition-colors ${comentario.fixado ? 'text-[#024D4D] bg-[#024D4D]/10 hover:bg-[#024D4D]/20' : 'text-gray-400 hover:text-[#024D4D] hover:bg-gray-100'} ${isActionLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                title={comentario.fixado ? "Desafixar comentário" : "Fixar comentário"}
              >
                <Pin size={16} className={comentario.fixado ? "fill-current" : ""} />
              </button>
            )}

            {canDelete && onDelete && (
              <button 
                onClick={() => onDelete(comentario.id)}
                disabled={isActionLoading}
                className="p-1.5 rounded-full transition-colors text-gray-400 hover:text-red-600 hover:bg-red-50"
                title="Excluir comentário"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        </div>

        <p className="text-gray-600 text-sm md:text-base leading-relaxed font-opensans mb-3">
          {comentario.texto}
        </p>

        {/* <div className="flex items-center gap-4">
          <button onClick={handleLike} disabled={isActionLoading} className={`transition-colors ${liked ? 'text-teal-600' : 'text-gray-400 hover:text-gray-600'} ${isActionLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
            <ThumbsUp size={18} className={liked ? "fill-current" : ""} />
          </button>
          
          <button onClick={handleDislike} disabled={isActionLoading} className={`transition-colors ${disliked ? 'text-red-500' : 'text-gray-400 hover:text-gray-600'} ${isActionLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
            <ThumbsDown size={18} className={disliked ? "fill-current" : ""} />
          </button>
        </div> */}
      </div>
    </div>
  );
}