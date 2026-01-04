import { Edit, Trash2, Share2 } from "lucide-react";

interface RepertorioActionsProps {
  canEdit: boolean;
  canDelete: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onShare: () => void;
}

export function RepertorioActions({
  canEdit, canDelete,
  onEdit, onDelete, onShare
}: RepertorioActionsProps) {
  return (
    <div className="flex items-center space-x-2">
      <button 
        onClick={onShare} 
        className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 hover:text-[#CA9C60] transition-colors shadow-sm" 
        title="Compartilhar"
      >
        <Share2 size={16} className="mr-2" />
        <span>Compartilhar</span>
      </button>

      {canEdit && (
        <button 
          onClick={onEdit} 
          className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 hover:text-teal-600 transition-colors shadow-sm" 
          title="Editar"
        >
          <Edit size={16} className="mr-2" />
          <span>Editar</span>
        </button>
      )}

      {canDelete && (
        <button 
          onClick={onDelete} 
          className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 bg-white rounded-lg border border-gray-200 hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-colors shadow-sm" 
          title="Excluir"
        >
          <Trash2 size={16} className="mr-2" />
          <span>Excluir</span>
        </button>
      )}
    </div>
  );
}