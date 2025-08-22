import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { User, Edit, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import type { Comentario } from '@/apiCalls/types';
import { useAuth } from '@/contexts/auth-context';
import { getProfilePictureLink } from '@/apiCalls/usuario';
import { updateComentario, deleteComentario } from '@/apiCalls/repertorio';

interface CommentCardProps {
  comentario: Comentario;
  repertorioId: string;
  onCommentUpdate: () => void;
  openModal: (options: { title: string; message: string; onConfirm: () => Promise<void> }) => void;
}

export function CommentCard({ comentario, repertorioId, onCommentUpdate, openModal }: CommentCardProps) {
  const { userData, isLoggedIn } = useAuth();
  const [authorProfilePictureLink, setAuthorProfilePictureLink] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(comentario.texto);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canEdit = isLoggedIn && (userData?.id === comentario.usuario.id);
  const canDelete = isLoggedIn && (userData?.id === comentario.usuario.id || userData?.cargo === 'admin');

  useEffect(() => {
    async function fetchPicture() {
      if (comentario.usuario?.id) {
        const link = await getProfilePictureLink(comentario.usuario.id);
        setAuthorProfilePictureLink(link);
      }
    }
    fetchPicture();
  }, [comentario.usuario]);

  const handleSave = async () => {
    if (!editedText.trim()) return toast.error("O comentário não pode ficar vazio.");
    setIsSubmitting(true);
    try {
      await updateComentario(repertorioId, comentario.id, { texto: editedText });
      toast.success("Comentário atualizado!");
      setIsEditing(false);
      onCommentUpdate();
    } catch (e) {
      toast.error("Erro ao atualizar o comentário.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = () => {
    openModal({
      title: 'Excluir Comentário',
      message: 'Tem certeza que deseja excluir este comentário? Esta ação é permanente.',
      onConfirm: async () => {
        await deleteComentario(repertorioId, comentario.id);
        toast.success("Comentário excluído!");
        onCommentUpdate();
      },
    });
  };

  return (
    <div className="flex items-start space-x-3 md:space-x-4 py-4">
      <div className="w-9 h-9 md:w-10 md:h-10 bg-gray-200 rounded-full flex-shrink-0 overflow-hidden">
        {authorProfilePictureLink ? (
          <Image width={40} height={40} src={authorProfilePictureLink} alt={`Foto de ${comentario.usuario.nome}`} className="w-full h-full object-cover" />
        ) : (
          <User size={24} className="text-gray-500 m-2" />
        )}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-semibold text-gray-800 text-sm md:text-base">{comentario.usuario.nome}</p>
            {!isEditing ? (
              <p className="text-gray-600 whitespace-pre-wrap text-sm md:text-base">{comentario.texto}</p>
            ) : (
              <div className="w-full mt-2">
                <textarea
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  rows={3}
                  disabled={isSubmitting}
                />
                <div className="flex space-x-2 mt-2">
                  <button onClick={handleSave} disabled={isSubmitting} className="px-3 py-1 bg-teal-600 text-white text-sm rounded-md">
                    {isSubmitting ? 'Salvando...' : 'Salvar'}
                  </button>
                  <button onClick={() => setIsEditing(false)} className="px-3 py-1 bg-gray-200 text-sm rounded-md">Cancelar</button>
                </div>
              </div>
            )}
          </div>
          <div className="flex space-x-2 text-gray-500 flex-shrink-0 ml-2">
            {canEdit && !isEditing && (
              <button onClick={() => setIsEditing(true)} className="hover:text-teal-600"><Edit size={16} /></button>
            )}
            {canDelete && !isEditing && (
              <button onClick={handleDelete} className="hover:text-red-600"><Trash2 size={16} /></button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
