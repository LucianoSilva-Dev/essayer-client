import { FC } from "react";
import { Trash2, User } from "lucide-react";

interface IntegranteItemProps {
  nome: string;
  onRemove?: () => void;
}

const IntegranteItem: FC<IntegranteItemProps> = ({ nome, onRemove }) => {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-200">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center">
          <User className="w-5 h-5 text-gray-600" />
        </div>
        <span className="text-sm font-medium text-gray-800">{nome}</span>
      </div>
      <button
        onClick={onRemove}
        className="text-gray-500 hover:text-red-600 transition"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
};

export default IntegranteItem;
