import React from "react";
import { Users } from "lucide-react";

interface TarefaCardProps {
  tema: string;
  envios: number;
  total: number;
  alunosExtras: number;
  data: string;
}

const TarefaCard: React.FC<TarefaCardProps> = ({
  tema,
  envios,
  total,
  alunosExtras,
  data,
}) => {
  const temEnvios = envios > 0;

  return (
    <div
      className={`w-[270px] min-h-[260px] rounded-2xl p-5 shadow-sm flex flex-col justify-between 
      ${temEnvios ? "bg-white" : "bg-gray-300"}`}
    >
      {/* Tema */}
      <div>
        <h2 className="text-sm font-semibold text-gray-800 mb-2">Tema</h2>
        <p className="text-base text-gray-800">{tema}</p>
      </div>

      {/* Linha divisória */}
      <hr className="my-3 border-gray-300" />

      {/* Envios */}
      <div>
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-800">Envios</span>
          <span className="font-medium text-gray-800">
            {String(envios).padStart(2, "0")}/{total}
          </span>
        </div>

        {/* Status */}
        {temEnvios ? (
          <div className="flex items-center gap-2 mt-2">
            <Users size={22} className="text-gray-700" />
            <span className="text-sm text-gray-800 font-medium">
              +{alunosExtras} alunos
            </span>
          </div>
        ) : (
          <p className="text-sm text-gray-500 mt-2">Nenhum envio feito ainda</p>
        )}
      </div>

      {/* Data */}
      <p className="text-sm font-semibold text-gray-700 mt-4">
        Fecha em {data}
      </p>
    </div>
  );
};

export default TarefaCard;
