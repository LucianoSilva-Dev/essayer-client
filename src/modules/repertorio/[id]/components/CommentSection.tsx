import React from "react";
import { User } from "lucide-react";
import type { Comentario } from "@/types/types";
import { CommentCard } from "./CommentCard";
import { useAuth } from "@/shared/contexts/auth-context";
import { fixarComentario, deleteComentario } from "@/lib/apiCalls/repertorio";
import { toast } from "react-toastify";
import { ConfirmationModal } from "@/shared/components/confirmation-modals/modal-2/ConfirmationModal";

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
  authorId?: string;
}

export function CommentSection({
  comments,
  isLoggedIn,
  userRole,
  newComment,
  setNewComment,
  isSubmittingComment,
  onCommentSubmit,
  onCommentUpdate,
  authorId,
  repertorioId,
}: CommentSectionProps) {
  const { userData } = useAuth();
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const [commentToDelete, setCommentToDelete] = React.useState<string | null>(
    null
  );

  const canPin =
    isLoggedIn && (userData?.id === authorId || userData?.cargo === "admin");
  const canDelete =
    isLoggedIn && (userData?.id === authorId || userData?.cargo === "admin");

  const handlePin = async (commentId: string, currentStatus: boolean) => {
    try {
      await fixarComentario(repertorioId, commentId, !currentStatus);
      toast.success(
        currentStatus ? "Comentário desafixado!" : "Comentário fixado!"
      );
      onCommentUpdate();
    } catch (error) {
      console.error("Erro ao fixar comentário:", error);
      toast.error("Erro ao atualizar status do comentário.");
    }
  };

  const handleDeleteClick = (commentId: string) => {
    setCommentToDelete(commentId);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!commentToDelete) return;

    try {
      await deleteComentario(repertorioId, commentToDelete);
      toast.success("Comentário excluído com sucesso!");
      onCommentUpdate();
    } catch (error) {
      console.error("Erro ao excluir comentário:", error);
      toast.error("Erro ao excluir comentário.");
    } finally {
      setDeleteModalOpen(false);
      setCommentToDelete(null);
    }
  };

  // Ordena comentários: fixados primeiro
  const sortedComments = [...comments].sort((a, b) => {
    if (a.fixado === b.fixado) return 0;
    return a.fixado ? -1 : 1;
  });

  return (
    // Card Container Cinza
    <div className="bg-[#EAEAEA] rounded-[2rem] p-6 md:p-8 shadow-sm">
      {/* HEADER: Título */}
      <div className="mb-6 pb-4 border-b border-gray-300/50">
        <h3 className="text-lg md:text-xl font-bold text-gray-800 font-montserrat">
          {comments.length} comentários
        </h3>
      </div>

      {/* LISTA DE COMENTÁRIOS */}
      <div className="min-h-[100px] mb-6">
        <div className="animate-fadeIn space-y-2">
          {sortedComments.length > 0 ? (
            sortedComments.map((comment) => (
              <CommentCard
                key={comment.id}
                comentario={comment}
                canPin={canPin}
                onPin={handlePin}
                canDelete={canDelete}
                onDelete={handleDeleteClick}
                isAuthorComment={comment.usuario.id === authorId}
              />
            ))
          ) : isLoggedIn && userRole !== "aluno" ? (
            <p className="text-gray-500 font-opensans text-center py-4">
              Seja o primeiro a comentar!
            </p>
          ) : (
            <p className="text-gray-500 font-opensans text-center py-4">
              Nenhum comentário no momento.
            </p>
          )}
        </div>
      </div>

      {/* INPUT AREA */}
      {isLoggedIn && userRole !== "aluno" && (
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
              className="px-6 py-2 bg-white text-brand-teal-secondary font-bold font-montserrat rounded-full text-sm hover:bg-gray-50 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Enviar
            </button>
          </form>
        </div>
      )}

      <ConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Excluir comentário"
        description="Tem certeza que deseja excluir este comentário? Esta ação não pode ser desfeita."
        confirmText="Excluir"
        cancelText="Cancelar"
        variant="danger"
      />
    </div>
  );
}
