import { FC } from "react";
import Image from "next/image";
import { Trash2, Loader2 } from "lucide-react";

interface IntegranteItemProps {
  nome: string;
  fotoPath: string | null; // ← ADICIONADO
  onRemove?: () => void;
  isRemoving?: boolean;
}

const IntegranteItem: FC<IntegranteItemProps> = ({ nome, fotoPath, onRemove, isRemoving = false }) => {
  return (
    <div
      className={`flex items-center justify-between py-2 border-b border-gray-100 ${
        isRemoving ? "opacity-50" : ""
      }`}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0 pr-2">
        {fotoPath ? (
          <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src={fotoPath}
              alt={nome}
              width={50}
              height={50}
              className="object-cover w-full h-full"
            />
          </div>
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-300 flex-shrink-0 flex items-center justify-center text-gray-700 font-semibold">
            {nome[0]}
          </div>
        )}

        <span className="text-lg font-medium text-gray-800 truncate">{nome}</span>
      </div>

      <button
        onClick={onRemove}
        disabled={isRemoving}
        className="text-gray-400 hover:text-red-600 transition disabled:cursor-not-allowed p-1 rounded focus:outline-none focus:scale-110 focus:ring-2 focus:ring-red-400"
      >
        {isRemoving ? (
          <Loader2 className="w-12 h-12 animate-spin text-red-600" />
        ) : (
          <Trash2 className="w-6 h-6 cursor-pointer hover:scale-110 transition-all duration-300" />
        )}
      </button>
    </div>
  );
};

export default IntegranteItem;
