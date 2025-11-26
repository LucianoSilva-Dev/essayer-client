import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { User, ThumbsUp, ThumbsDown } from 'lucide-react';
import type { Comentario } from '@/apiCalls/types';
import { useAuth } from '@/contexts/auth-context';
import { getProfilePictureLink } from '@/apiCalls/usuario';

interface CommentCardProps {
  comentario: Comentario;
  isAuthorComment?: boolean;
  preloadedPicture?: string | null; // <--- NOVA PROP
}

export function CommentCard({ comentario, isAuthorComment = false, preloadedPicture }: CommentCardProps) {
  // Se vier preloadedPicture, usamos ela direto no estado inicial
  const [authorProfilePictureLink, setAuthorProfilePictureLink] = useState<string | null>(preloadedPicture || null);
  
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

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
          console.error("Erro ao buscar imagem de perfil", error);
        }
      }
    }
    fetchPicture();
  }, [comentario.usuario, preloadedPicture]);

  // ... (Resto do componente igual: handleLike, return, etc)
  const handleLike = () => {
    setLiked(!liked);
    if (disliked) setDisliked(false);
  };

  const handleDislike = () => {
    setDisliked(!disliked);
    if (liked) setLiked(false);
  };

  return (
    <div className="flex gap-3 md:gap-4 py-4 border-b border-gray-200/50 last:border-0">
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
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-sm md:text-base font-bold text-gray-800 font-montserrat">
            {comentario.usuario.nome}
          </span>
          {isAuthorComment && (
            <span className="text-xs md:text-sm text-gray-500 font-opensans">
              Educador autor
            </span>
          )}
        </div>

        <p className="text-gray-600 text-sm md:text-base leading-relaxed font-opensans mb-3">
          {comentario.texto}
        </p>

        <div className="flex items-center gap-4">
          <button onClick={handleLike} className={`transition-colors ${liked ? 'text-teal-600' : 'text-gray-400 hover:text-gray-600'}`}>
            <ThumbsUp size={18} className={liked ? "fill-current" : ""} />
          </button>
          
          <button onClick={handleDislike} className={`transition-colors ${disliked ? 'text-red-500' : 'text-gray-400 hover:text-gray-600'}`}>
            <ThumbsDown size={18} className={disliked ? "fill-current" : ""} />
          </button>
        </div>
      </div>
    </div>
  );
}