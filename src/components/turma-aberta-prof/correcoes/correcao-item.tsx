import { FC } from "react";
import { UserCircle2 } from "lucide-react";

interface CorrecaoItemProps {
  nome: string;
  tema: string;
  tempo: string;
}

const CorrecaoItem: FC<CorrecaoItemProps> = ({ nome, tema, tempo }) => {
  return (
    <div className="flex flex-row justify-between items-center w-[776px] h-[86px] px-6 py-4 bg-white shadow-md rounded-[30px]">
      {/* Nome do aluno */}
      <div className="flex items-center gap-3">
        <UserCircle2 className="w-8 h-8 text-gray-600" />
        <span className="text-gray-700 font-medium">{nome}</span>
      </div>

      {/* Tema */}
      <div className="flex flex-col items-center">
        <span className="font-semibold text-gray-800">Tema</span>
        <span className="text-gray-600 truncate max-w-[200px]">{tema}</span>
      </div>

      {/* Tempo */}
      <div className="flex flex-col items-end">
        <span className="font-semibold text-gray-800">Feito em</span>
        <span className="text-gray-600">{tempo}</span>
      </div>
    </div>
  );
};

export default CorrecaoItem;
