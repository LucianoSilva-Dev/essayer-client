// src/components/turma-aberta-prof/integrantes/integrante-item.tsx
import { FC } from "react";
// Adiciona Loader2 para indicar loading
import { Trash2, User, Loader2 } from "lucide-react";

interface IntegranteItemProps {
  nome: string;
  onRemove?: () => void;
  isRemoving?: boolean; // Nova prop
}

const IntegranteItem: FC<IntegranteItemProps> = ({ nome, onRemove, isRemoving = false }) => {
  return (
    <div className={`flex items-center justify-between py-2 border-b border-gray-100 ${isRemoving ? 'opacity-50' : ''}`}> {/* Reduz padding e muda borda */}
      <div className="flex items-center gap-3 flex-1 min-w-0 pr-2"> {/* Permite truncar nome */}
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
          <User className="w-4 h-4 text-gray-600" />
        </div>
        <span className="text-sm font-medium text-gray-800 truncate">{nome}</span>
      </div>
      {/* Mostra loader ou botão de remover */}
      <button
        onClick={onRemove}
        disabled={isRemoving} // Desabilita botão durante remoção
        className="text-gray-400 hover:text-red-600 transition disabled:cursor-not-allowed p-1 rounded hover:bg-red-50" // Adiciona padding e hover bg
      >
        {isRemoving ? (
            <Loader2 className="w-4 h-4 animate-spin text-red-600" /> // Ícone de loading
        ) : (
            <Trash2 className="w-4 h-4" /> // Ícone de lixeira
        )}
      </button>
    </div>
  );
};

export default IntegranteItem;
