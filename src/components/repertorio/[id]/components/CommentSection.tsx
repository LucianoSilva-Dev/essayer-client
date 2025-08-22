import React from 'react';
import { Send } from 'lucide-react';
import type { Comentario } from '@/apiCalls/types';
import { CommentCard } from './CommentCard';

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
}

export function CommentSection({
  comments, repertorioId, isLoggedIn, userRole, newComment, setNewComment,
  isSubmittingComment, onCommentSubmit, onCommentUpdate, openModal
}: CommentSectionProps) {
  return (
    <div className="mt-8 bg-white rounded-lg shadow-lg p-4 sm:p-6">
      <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Comentários ({comments.length})</h3>

      {isLoggedIn && userRole !== "aluno" && (
        <form onSubmit={onCommentSubmit} className="flex items-start space-x-2 md:space-x-4 mb-6">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Adicione um comentário..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600"
            rows={3}
            disabled={isSubmittingComment}
          />
          <button type="submit" disabled={isSubmittingComment || !newComment.trim()} className="p-2 md:px-4 md:py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 disabled:opacity-50">
            <Send size={20} />
          </button>
        </form>
      )}

      <div className="space-y-4 divide-y divide-gray-200">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <CommentCard 
              key={comment.id} 
              comentario={comment} 
              repertorioId={repertorioId} 
              onCommentUpdate={onCommentUpdate} 
              openModal={openModal} 
            />
          ))
        ) : (
          <div className="text-center py-4 text-gray-500">
            <p>Nenhum comentário ainda. Seja o primeiro a comentar!</p>
          </div>
        )}
      </div>
    </div>
  );
}
