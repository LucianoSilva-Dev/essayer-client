import { Edit, Trash2, Share2, Bookmark, ThumbsUp } from "lucide-react";

interface RepertorioActionsProps {
  canEdit: boolean;
  canDelete: boolean;
  isFavorito: boolean;
  isLiked: boolean;
  likes: number;
  onEdit: () => void;
  onDelete: () => void;
  onShare: () => void;
  onToggleFavorito: () => void;
  onLike: () => void;
}

export function RepertorioActions({
  canEdit, canDelete, isFavorito, isLiked, likes,
  onEdit, onDelete, onShare, onToggleFavorito, onLike
}: RepertorioActionsProps) {
  return (
    <div className="flex items-center space-x-1 sm:space-x-2 flex-wrap">
      {canEdit && (
        <button onClick={onEdit} className="flex items-center px-2 py-2 text-sm text-gray-600 hover:text-teal-600 transition-colors" title="Editar">
          <Edit size={16} className="mr-1" /><span className="hidden sm:inline">Editar</span>
        </button>
      )}
      {canDelete && (
        <button onClick={onDelete} className="flex items-center px-2 py-2 text-sm text-gray-600 hover:text-red-600 transition-colors" title="Excluir">
          <Trash2 size={16} className="mr-1" /><span className="hidden sm:inline">Excluir</span>
        </button>
      )}
      <button onClick={onShare} className="flex items-center px-2 py-2 text-sm text-gray-600 hover:text-[#CA9C60] transition-colors" title="Compartilhar">
        <Share2 size={16} className="mr-1" /><span className="hidden sm:inline">Compartilhar</span>
      </button>
      <button onClick={onToggleFavorito} className={`flex items-center px-2 py-2 text-sm transition-colors ${isFavorito ? "text-blue-600" : "text-gray-600 hover:text-blue-600"}`} title="Favoritar">
        <Bookmark size={16} className="mr-1" /><span className="hidden sm:inline">{isFavorito ? "Salvo" : "Salvar"}</span>
      </button>
      <button onClick={onLike} className={`flex items-center px-2 py-2 text-sm transition-colors ${isLiked ? "text-blue-600" : "text-gray-600 hover:text-blue-600"}`} title="Curtir">
        <ThumbsUp size={16} className="mr-1" />
        <span>{likes}</span>
      </button>
    </div>
  );
}
